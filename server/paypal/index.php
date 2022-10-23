<?php
/*--------------
* PayPalで決済だけを行う各処理クラス
*
* Class名  : PayPalOrder
* 引数     : { 'client_id' => [[ClientID]], 'secret' => [[Secretキー]], 'mode' => [[sandbox or live]], 'lang' => [[使用言語]] }
*             ClientIDとSecretキーはPayPalで作成したアプリID、Secretを設定する
*             modeには開発用のsandboxか本番用のliveを設定 (値が無効の場合はsandbox)
*             langには使用する言語を設定 (日本語 : ja-JP、英語 : en-US、値が無効の場合はen-US)
*
* 宣言方法 : $paypal = new PayPalOrder(array(
*                                        'client_id' => '**********( PayPalで作成したAppのクライアントID )**********',
*                                        'secret'    => '**********(   PayPalで作成したAppのsecretキー   )**********',
*                                        'mode'      => 'sandbox' or 'live',
*                                        'lang'      => 'ja-JP' や 'en-US' など,
*                                      ));
*
*/
/*--------------
* メソッド
*
* 1. getToken(boolrn $all = false)
*    アクセストークンを取得します
*    引数にtrueを渡すと取得したJSON形式のデータを配列に変換して返します
*
* 2. createOrder(array $data, string $token = null, boolern $all = false)
*    決済を作成します
*    必要なデータを以下の配列形式で渡すと決済用アドレスを取得します
*    {
*        'items'    => [ { PayPalのAPI用 商品情報object }, … ],
*        'shipping' => { 'address' => PayPalのAPI用 配送先object, 'cost' => [[配送料]] },
*        'url'      => { 'completed_url' => [[決済後のリダイレクト先URL]], 'canceled_url' => [[キャンセル時の戻りURL]] },
*        'shopinfo' => { 'name' => [[ショップ名(サイト名)]], 'shipment' => true/false(配送ありのBoolern値) }
*    }
*    PayPal API の object については https://developer.paypal.com/docs/api/orders/v2/#definitions を参照
*    第2引数にアクセストークンを渡すとトークンを再取得せずに処理を実施します
*    ※トークンが期限切れの場合は再取得して決済を作成し、返り値にトークンを含めます
*    第3引数にtrueを渡すと取得したJSON形式のデータを配列に変換して返します
*    ※デフォルトはPayPalログインページが表示されますが、決済用アドレスのGETに"fundingSource=card"を追加すればクレジットカード決済ページが表示されます
*
* 3. setCaptured(string $orderID, string $token = null)
*    ユーザが決済処理を完了したことを確定する
*    $orderIDは決済作成時に取得するか、決済完了後にGETで"token"キーから取得する
*    戻り値は決済の詳細情報 (getDetailと同じ)
*    第2引数にアクセストークンを渡すとトークンを再取得せずに処理を実施します
*    ※トークンが期限切れの場合は再取得して決済を作成し、返り値にトークンを含めます
*
* 4. getDetail(string $orderID, string $token = null)
*    作成した決済の詳細を取得します
*    createOrderで作成した決済の詳細を表示する
*    $orderIDは決済作成時に取得するか、決済完了後にGETで"token"キーから取得する
*    第2引数にアクセストークンを渡すとトークンを再取得せずに処理を実施します
*    ※トークンが期限切れの場合は再取得して決済を作成し、返り値にトークンを含めます
*
*/
/*--------------
* プロパティ
*
* 使用可能なプロパティは無い
* 上記メソッドのみ利用可能
*
*/
class PayPalOrder{
	// 変数宣言
	private $appid;
	private $secret;
	private $mode;
	private $lang;
	// 宣言時のオプションチェック
	public function __construct($opt){
		if(gettype($opt) !== 'array'){
			return false;
		}
		$this->appid  = $opt['client_id'];
		$this->secret = $opt['secret'];
		$this->mode   = $opt['mode'] === 'live';
		$this->lang   = empty($opt['lang']) ? 'en-US' : $opt['lang'];
		//var_dump($this->appid);
		//var_dump($this->secret);
		//var_dump($this->mode);
		//var_dump($this->lang);
	}
	// アクセストークンを取得する
	// 引数にtrueを渡すと応答したJSON全てを配列にしたものを返す
	public function getToken($all = false){
		// APIのリクエストURL
		$url = $this->mode ? 'https://api.paypal.com/v1/oauth2/token' : 'https://api.sandbox.paypal.com/v1/oauth2/token';
		// 送信メソッド
		//var_dump($url);
		$method = 'POST';
		// ヘッダ
		$header = array(
			'Content-Type: application/json',
			'Accept: application/json',
			'Accept-Language: en_US',
			'Authorization: Basic '. base64_encode("{$this->appid}:{$this->secret}"),
		);
		// 送信データ
		$data = array(
			'grant_type' => 'client_credentials',
		);
		// file_get_contens関数でPOST送信する準備
		$options = array(
			'http' => array(
				'method'           => $method,
				'header'           => implode("\r\n", $header),
				'content'          => http_build_query($data, '', '&'),
				'ignore_errors'    => true,   // エラー発生時でも結果を受け取れるようにするフラグ
				'protocol_version' => '1.1',
			)
		);
		// 結果を返す
		//var_dump($options);
		$json = json_decode(file_get_contents($url, false, stream_context_create($options)), true);
		if($all){
			return $json;
		} else{
			return empty($json['access_token']) ? null : $json['access_token'];
		}
	}
	// PayPalで決済する注文を作成する
	// 引数には注文内容の配列
	// $dataには {
	//              'items'    => [ { PayPalのAPI用 商品情報object }, … ],
	//              'shipping' => { 'address' => PayPalのAPI用 配送先object, 'cost' => [[配送料]] },
	//              'url'      => { 'completed_url' => [[決済後のリダイレクト先URL]], 'canceled_url' => [[キャンセル時の戻りURL]] },
	//              'shopinfo' => { 'name' => [[ショップ名(サイト名)]], 'shipment' => true/false(配送ありのBoolern値) }
	//            }
	public function createOrder($data = array(), $token = null, $all = false){
		// APIのリクエストURL
		$url = $this->mode ? 'https://api.paypal.com/v2/checkout/orders' : 'https://api.sandbox.paypal.com/v2/checkout/orders';
		// 送信メソッド
		$method = 'POST';
		// アクセストークン取得
		if(empty($token)){
			$token = $this->getToken();
			$old   = array(
				'token' => null,
				'data'  => $data,
			);
		} else{
			$old = array(
				'token' => $token,
				'data'  => $data,
			);
		}
		// 合計金額を計算する
		$tax = (int)$data['item']['tax']['value'];
		$amount_money = (int)$data['item']['unit_amount']['value'] + $tax;
		$amount = 1;
		// ヘッダ
		$header = array(
			'Accept: application/json',
			'Accept-language: en_US',
			'Content-Type: application/json',
			'Authorization: Bearer '. $token,
		//	'Authorization: Basic '. base64_encode("{$this->appid}:{$this->secret}"),  // Basic認証でもOK
		);
		// 送信データ
		$data = array(
			'intent'         => 'CAPTURE',
			'purchase_units' => array(
				array(
					'amount'       => array(
						'currency_code' => 'JPY',
						'value'         => (string)$amount_money,
					),
				),
			),
			'application_context' => array(
				'return_url'          => empty($data['url']['completed_url']) ? '' : $data['url']['completed_url'],
				'cancel_url'          => empty($data['url']['canceled_url'])  ? '' : $data['url']['canceled_url'],
				'brand_name'          => empty($data['shopinfo']['name'])     ? '' : $data['shopinfo']['name'],
				'locale'              => $this->lang,
				'landing_page'        => 'LOGIN',   // デフォルトでクレジットカード決済にする場合は 'BILLING',
				'user_action'         => 'PAY_NOW',
				'shipping_preference' => 'NO_SHIPPING',
			),
		);
		// file_get_contens関数でPOST送信する準備
		$options = array(
			'http' => array(
				'method'           => $method,
				'header'           => implode("\r\n", $header),
				'content'          => json_encode($data),
				'ignore_errors'    => true,   // エラー発生時でも結果を受け取れるようにするフラグ
				'protocol_version' => '1.1',
			)
		);
		// APIにリクエストする
		$json = json_decode(file_get_contents($url, false, stream_context_create($options)), true);
		// トークンが使用できずにエラーが返ってきた場合はトークンを再取得して決済を作成する
		if(isset($json['error']) && !empty($old['token'])){
			if($json['error'] === 'invalid_token'){
				$json  = $this->createOrder($old['data'], null, true);
				$token = $json['token'];
			}
		}
		// 結果を返す
		if($all){
			$json['token'] = $token;
			return $json;
		} else{
			if(isset($json['links'])){
				$status = "";
				if(isset($json['status'])) $status = $json['status'];
				foreach($json['links'] as $link){
					if($link['rel'] === 'approve'){
						return array(
							'login' => $link['href'],
							'card'  => $link['href']. '&fundingSource=card',
							'id'    => preg_replace('/.*?\?token=([^&=]+)(&.*)*/', '$1', $link['href']),
							'token' => $token,
							'status' => $status,
						);
					}
				}
			}
			return null;
		}
	}
	// ユーザの決済処理が完了したOrderを確定する (Capture)
	public function setCaptured($orderID = null, $token = null){
		if(empty($orderID) || preg_match('/[^0-9a-zA-Z]/', $orderID)){
			return null;
		}
		// APIのリクエストURL
		$url = ($this->mode ? 'https://api.paypal.com/v2/checkout/orders/' : 'https://api.sandbox.paypal.com/v2/checkout/orders/'). $orderID. '/capture';
		// 送信メソッド
		$method = 'POST';
		// アクセストークン取得
		if(empty($token)){
			$token = $this->getToken();
			$old   = array(
				'token' => null,
			);
		} else{
			$old = array(
				'token' => $token,
			);
		}
		// ヘッダ
		$header = array(
			'Accept: application/json',
			'Accept-language: en_US',
			'Content-Type: application/json',
			'Authorization: Bearer '. $token,
		//	'Authorization: Basic '. base64_encode("{$this->appid}:{$this->secret}"),  // Basic認証でもOK
		);
		// file_get_contens関数でPOST送信する準備
		$options = array(
			'http' => array(
				'method'           => $method,
				'header'           => implode("\r\n", $header),
				'content'          => '',
				'ignore_errors'    => true,   // エラー発生時でも結果を受け取れるようにするフラグ
				'protocol_version' => '1.1',
			)
		);
		// APIにリクエストする
		$json = json_decode(file_get_contents($url, false, stream_context_create($options)), true);
		// トークンが使用できずにエラーが返ってきた場合はトークンを再取得して決済を作成する
		if(isset($json['error']) && !empty($old['token'])){
			if($json['error'] === 'invalid_token'){
				$json  = $this->setCaptured($orderID);
				$token = $json['token'];
			}
		}
		// 結果を返す
		$json['token'] = $token;
		return $json;
	}
	// 作成した決済の詳細を取得する
	// 返り値はAPIから取得したJSONを配列にデコードしたもの
	public function getDetail($orderID = null, $token = null){
		if(empty($orderID) || preg_match('/[^0-9a-zA-Z]/', $orderID)){
			return null;
		}
		// APIのリクエストURL
		$url = ($this->mode ? 'https://api.paypal.com/v2/checkout/orders/' : 'https://api.sandbox.paypal.com/v2/checkout/orders/'). $orderID;
		// 送信メソッド
		$method = 'GET';
		// アクセストークン取得
		if(empty($token)){
			$token = $this->getToken();
			$old   = array(
				'token' => null,
			);
		} else{
			$old = array(
				'token' => $token,
			);
		}
		// ヘッダ
		$header = array(
			'Accept: application/json',
			'Accept-language: en_US',
			'Content-Type: application/json',
			'Authorization: Bearer '. $token,
		//	'Authorization: Basic '. base64_encode("{$this->appid}:{$this->secret}"),  // Basic認証でもOK
		);
		// file_get_contens関数でPOST送信する準備
		$options = array(
			'http' => array(
				'method'           => $method,
				'header'           => implode("\r\n", $header),
				'content'          => '',
				'ignore_errors'    => true,   // エラー発生時でも結果を受け取れるようにするフラグ
				'protocol_version' => '1.1',
			)
		);
		// APIにリクエストする
		$json = json_decode(file_get_contents($url, false, stream_context_create($options)), true);
		// トークンが使用できずにエラーが返ってきた場合はトークンを再取得して決済を作成する
		if(isset($json['error']) && !empty($old['token'])){
			if($json['error'] === 'invalid_token'){
				$json  = $this->getDetail($orderID);
				$token = $json['token'];
			}
		}
		// 結果を返す
		$json['token'] = $token;
		return $json;
	}
	// Capture済みの決済 (status=COMPLETED) に対して全額返金処理する
	public function refundPayment($paymentID = null, $token = null){
		if(empty($paymentID) || preg_match('/[^0-9a-zA-Z]/', $paymentID)){
			return null;
		}
		// APIのリクエストURL
		$url = ($this->mode ? "https://api.paypal.com/v2/payments/captures/{$paymentID}/refund" : "https://api.sandbox.paypal.com/v2/payments/captures/{$paymentID}/refund");
		// 送信メソッド
		$method = 'POST';
		// アクセストークン取得
		if(empty($token)){
			$token = $this->getToken();
			$old   = array(
				'token' => null,
			);
		} else{
			$old = array(
				'token' => $token,
			);
		}
		// ヘッダ
		$header = array(
			'Accept: application/json',
			'Accept-language: en_US',
			'Content-Type: application/json',
			'Authorization: Bearer '. $token,
		//	'Authorization: Basic '. base64_encode("{$this->appid}:{$this->secret}"),  // Basic認証でもOK
		);
		// file_get_contens関数でPOST送信する準備
		$options = array(
			'http' => array(
				'method'           => $method,
				'header'           => implode("\r\n", $header),
				'content'          => '',
				'ignore_errors'    => true,   // エラー発生時でも結果を受け取れるようにするフラグ
				'protocol_version' => '1.1',
			)
		);
		// APIにリクエストする
		$json = json_decode(file_get_contents($url, false, stream_context_create($options)), true);
		// トークンが使用できずにエラーが返ってきた場合はトークンを再取得して決済を作成する
		if(isset($json['error']) && !empty($old['token'])){
			if($json['error'] === 'invalid_token'){
				$json  = $this->refundPayment($paymentID);
				$token = $json['token'];
			}
		}
		// 結果を返す
		$json['token'] = $token;
		return $json;
	}

	//購入状態を挿入
	public function insertPlayerPayPalPurchase($conn,$playerIndexId,$orderId,$status,$billingCode){
		$stmt = $conn -> prepare("INSERT INTO player_paypal_purchase (player_index_id, order_id, status, billing_code)
	  VALUES (:player_index_id, :order_id, :status, :billing_code)");
	  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
	  $stmt->bindParam(':order_id',$orderId, PDO::PARAM_STR);
	  $stmt->bindParam(':status', $status, PDO::PARAM_STR);
		$stmt->bindParam(':billing_code', $billingCode, PDO::PARAM_STR);
	  $stmt->execute();
	}

	//購入状態を更新
	public function updatePlayerPayPalPurchase($conn,$playerIndexId,$orderId,$status){
		$result = array();
		$result['error'] = 0;
		$result['error_comment'] = "";
		try{
			$conn->beginTransaction(); //トランザクション開始
			$sql = "SELECT * FROM player_paypal_purchase WHERE player_index_id=? AND order_id=? AND status!=? FOR UPDATE";
			$stmt = $conn->prepare($sql);
			$stmt->execute(array($playerIndexId,$orderId,$status));
			$selectUpdateData = $stmt->fetch(PDO::FETCH_ASSOC);
			if($selectUpdateData != false){
				$sql = "UPDATE player_paypal_purchase SET status=? WHERE player_index_id=? AND order_id=? AND status!=?";
				$stmt = $conn->prepare($sql);
				$stmt->execute(array($status,$playerIndexId,$orderId,$status));
				$updateCount = $stmt->rowCount();
				if($updateCount != 0){ //更新が正常に実行された。
					if($status == "COMPLETED" && $selectUpdateData['status'] == "APPROVED"){ //リカバリーが発生
						$result['billing_code'] = $selectUpdateData['billing_code']; //購入が完了した商品コードを設定
					}
				}
			}
			$conn->commit(); //トランザクション終了
		}
		catch(Exception $e){
			$conn->rollBack();
			$result['error'] = 1;
			$result['error_comment'] = "通信エラーが発生しました。";
		}
		return $result;
	}

	//購入完了処理
	public function checkOutPlayerPayPalPurchase($conn,$playerIndexId,$orderId,$beforStatus,$afterStatus){
		$result = array();
		$result['error'] = 1;
		$result['error_comment'] = "エラーが発生しました。";
		if($beforStatus == "APPROVED" && $afterStatus == "COMPLETED"){ //決済完了して入金完了状態
			try{
	      $conn->beginTransaction(); //トランザクション開始

				$sql = "SELECT * FROM player_paypal_purchase WHERE player_index_id=? AND order_id=? AND status=? FOR UPDATE";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$orderId,$beforStatus));
				$selectUpdateData = $stmt->fetch(PDO::FETCH_ASSOC);
				if($selectUpdateData != false){
	        $sql = "UPDATE player_paypal_purchase SET status=? WHERE player_index_id=? AND order_id=? AND status=?";
	        $stmt = $conn->prepare($sql);
	        $stmt->execute(array($afterStatus,$playerIndexId,$orderId,$beforStatus));
					$updateCount = $stmt->rowCount();
		      if($updateCount != 0){ //更新が正常に実行された。
						//購入アイテムの付与
						$billingCode = $selectUpdateData['billing_code'];
						$result['error'] = 0;
						$result['error_comment'] = "購入処理に失敗しました。";
						$result['billing_code'] = $billingCode; //購入が完了した商品コードを設定
					}
				}
				else{ //エラー(該当する課金情報が存在しない)
					$result['error'] = 2;
					$result['error_comment'] = "購入処理に失敗しました。";
				}

	      $conn->commit(); //トランザクション終了
	    }
	    catch(Exception $e){
	      $conn->rollBack();
				$result['error'] = 3;
				$result['error_comment'] = "通信エラーが発生しました。";
	    }
		}
		return $result;
	}

	//課金チェック(リカバリー)
	public function playerPaypalBillingCheck($conn,$playerIndexId,$token=null){
		$result = array();
		$result['error'] = 0;
		$result['error_comment'] = "";
		$result['billing_codes'] = array();
		try{
			$conn->beginTransaction(); //トランザクション開始
			$checkStatus = "APPROVED"; //ユーザーの決済が完了(だけどアイテム未配布)
			$sql = "SELECT * FROM player_paypal_purchase WHERE player_index_id=? AND status=? FOR UPDATE";
			$stmt = $conn->prepare($sql);
			$stmt->execute(array($playerIndexId,$checkStatus));
			$selectUpdateDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);

			//未配布の課金情報を完了にして、アイテムを付与
			foreach ($selectUpdateDatas as $purchase) {
				if(isset($purchase['order_id'])){
					$resultCapture = $this->setCaptured($purchase['order_id'],$token);
					if(isset($resultCapture['status'])){
						if(!empty($resultCapture['token'])){
							$token = $resultCapture['token'];
						}
						// 結果を返す
						if(empty($resultCapture['status']) && $resultCapture['status'] !== 'COMPLETED'){ //完了に失敗

						}
						else{ //完了に成功
							//購入状態を保存
							$sql = "UPDATE player_paypal_purchase SET status=? WHERE player_index_id=? AND order_id=? AND status=?";
							$stmt = $conn->prepare($sql);
							$stmt->execute(array($resultCapture['status'],$playerIndexId,$purchase['order_id'],$purchase['status']));
							$updateCount = $stmt->rowCount();
							if($updateCount != 0){ //更新が正常に実行された。
								if($resultCapture['status'] == "COMPLETED" && $purchase['status'] == "APPROVED"){ //リカバリーが発生
									$result['billing_codes'][count($result['billing_codes'])] = $purchase['billing_code'];
								}
							}
						}
					}
					else{ //キャプチャーが無効だった場合
						$getDetail = $this->getDetail($purchase['order_id'],$token);
						if(isset($getDetail['status'])){
							if(!empty($getDetail['token'])){
								$token = $getDetail['token'];
							}
							if($getDetail['status'] === 'COMPLETED'){ //既に決済済みの場合
								//購入状態を保存
								$sql = "UPDATE player_paypal_purchase SET status=? WHERE player_index_id=? AND order_id=? AND status=?";
								$stmt = $conn->prepare($sql);
								$stmt->execute(array($getDetail['status'],$playerIndexId,$purchase['order_id'],$purchase['status']));
								$updateCount = $stmt->rowCount();
								if($updateCount != 0){ //更新が正常に実行された。
									if($getDetail['status'] == "COMPLETED" && $purchase['status'] == "APPROVED"){ //リカバリーが発生
										$result['billing_codes'][count($result['billing_codes'])] = $purchase['billing_code'];
									}
								}
							}
						}
					}
				}
			}

			$conn->commit(); //トランザクション終了
		}
		catch(Exception $e){
			$conn->rollBack();
			$result['error'] = 1;
			$result['error_comment'] = "通信エラーが発生しました。";
		}
		return $result;
	}





}
?>
