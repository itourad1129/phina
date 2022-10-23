<?php

/*
PayPalにてユーザの決済処理(Checkout)が完了した際にリダイレクトされて呼ばれるファイル
PayPalに対してCapture処理(完了受付)を行い決済を完了させる
PayPalからの返答のstatusがCOMPLETEDになれば元の記事にリダイレクトさせる
元の記事のURLはSESSION変数(キーはOrderID)に入れておく
*/
// paypal.comもしくはanalogstd.comとそのサブドメイン以外からのアクセスは拒否する
// $referer = isset($_SERVER['HTTP_REFERER']) ? $_SERVER['HTTP_REFERER'] : null;
// if(!preg_match('/^https:\/\/[a-zA-Z0-9-\.]+\.(paypal\.com|analogstd\.com)/', $referer)){
// 	header('HTTP', true, 403);
// 	exit;
// }
// セッションを開始する
// PayPal関係の情報は$_SESSION['paypal']に保存する
if(!isset($_SESSION)){
  session_start();
}
//宣言クラスを取得
include_once '../../module/define/index.php';
// セッションが空の場合は終了する
$appDefine = new AppDefine($ENV);
if(empty($_SESSION['paypal'])){
	exit(
		'<p>セッションが切れています。</p>'.
		'<p>もう一度はじめからやり直してください。</p>'.
    '<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
}
else{
	include_once '../../module/dbConnect/index.php';
	include_once '../../module/sessionCheck/index.php';
}

if(!isset($RESULT_JSON['session_status']) || $RESULT_JSON['session_status'] != 0){
	exit(
		'<p>ユーザーの認証に失敗しました。</p>'.
		'<p>ログイン後、もう一度はじめからやり直してください。</p>'.
    '<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
}
else{
	include_once '../../module/playerData/index.php';
	include_once '../../module/item/index.php';
	include_once '../../module/billingShop/index.php';
}

if(!isset($PLAYER_INFO) || $PLAYER_INFO == false){
	exit(
		'<p>プレイヤーデータの取得に失敗しました。</p>'.
		'<p>ログイン後、もう一度はじめからやり直してください。</p>'.
    '<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
}

$billingSuccess = array(); //購入完了時に格納するデータ
$billingSuccess['billing_status'] = "";
$billingSuccess['billing_code'] = "";

// OrderIDを取得する
$order_id = filter_input(INPUT_GET, 'token') ?: filter_input(INPUT_GET, 'order_id');
// PayPalクラスを読み込む
include_once '../../module/paypal/index.php';
//宣言情報を取得
$mode = $ENV == 1 ? 'live' : 'sandbox';
// PayPalを宣言する
//ペイパル決済処理を開始
$paypal = new PayPalOrder(array(
  'client_id' => $appDefine->PAYPAL_CLIENT_ID,
  'secret'    => $appDefine->PAYPAL_SECRET,
  'mode'      => $mode,
  'lang'      => 'ja-JP',
));

// 決済の詳細を取得する
$detail  = $paypal->getDetail($order_id, (empty($_SESSION['paypal']['access_token']) ? null : $_SESSION['paypal']['access_token']));
// アクセストークンをセッションに保存する
if(!empty($detail['token'])){
	$_SESSION['paypal']['access_token'] = $detail['token'];
}
// 結果を返す
if(empty($detail['status'])){
	exit(
		'<p>PayPalとの接続に失敗しました。通信環境を確認してもう一度お試し下さい。</p>'.
		'<p><a href="?token='. $order_id. '">状態を確認する</a></p>'
	);
} else if($detail['status'] === 'COMPLETED'){
	exit(
		'<p>すでに決済処理が完了しています。</p>'.
		'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
} else if($detail['status'] !== 'APPROVED'){
	exit(
		'<p>決済処理が正常に完了できませんでした。もう一度はじめからお試し下さい。</p>'.
		'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
} else{
	// DBなどに保存する場合はここで処理する
	$resultUpdate = $paypal->updatePlayerPayPalPurchase($pdo,$PLAYER_INFO['player_index_id'],$detail['id'],$detail['status']);
  if(isset($resultUpdate['billing_code'])){ //リカバリーが発生した購入した商品コード
    //プレイヤーに購入したアイテムの付与
    $getBillingShopMasterData = selectBillingShopMasterData($pdo,$resultUpdate['billing_code'],false);
    if($getBillingShopMasterData != false){
      addPlayerItem($pdo,$PLAYER_INFO['player_index_id'],$getBillingShopMasterData['item_id'],$getBillingShopMasterData['num']);
      $billingSuccess['billing_status'] = "success";
      $billingSuccess['billing_code'] = $resultUpdate['billing_code'];
    }
    else{
      exit(
        '<p>商品データの取得に失敗しました。</p>'.
        '<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
      );
    }
  }
}
// 決済の完了処理(capture)をする
$beforStatus = $detail['status']; //成功の時は「APPROVED」が入る(ユーザー決済完了)
$detail  = $paypal->setCaptured($order_id, (empty($_SESSION['paypal']['access_token']) ? null : $_SESSION['paypal']['access_token']));
// アクセストークンをセッションに保存する
if(!empty($detail['token'])){
	$_SESSION['paypal']['access_token'] = $detail['token'];
}
// 結果を返す
if(empty($detail['status']) && $detail['status'] !== 'COMPLETED'){
	exit(
		'<p>PayPalとの接続に失敗しました。通信環境を確認してもう一度お試し下さい。</p>'.
		'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
	);
} else{
	$afterStatus = $detail['status']; //成功の時は「COMPLETED」が入る(入金完了)
	$resultCheckOut = $paypal->checkOutPlayerPayPalPurchase($pdo,$PLAYER_INFO['player_index_id'],$detail['id'],$beforStatus,$afterStatus);
	if(isset($resultCheckOut['error']) && isset($resultCheckOut['error_comment'])){
		if($resultCheckOut['error'] != 0){ //エラー
			exit(
				'<p>通信エラーが発生しました。通信環境を確認してもう一度お試し下さい。</p>'.
				'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
			);
		}
		else{
			if(isset($resultCheckOut['billing_code'])){ //購入した商品コード
				//プレイヤーに購入したアイテムの付与
				$getBillingShopMasterData = selectBillingShopMasterData($pdo,$resultCheckOut['billing_code'],false);
				if($getBillingShopMasterData != false){
					addPlayerItem($pdo,$PLAYER_INFO['player_index_id'],$getBillingShopMasterData['item_id'],$getBillingShopMasterData['num']);
          $billingSuccess['billing_status'] = "success";
          $billingSuccess['billing_code'] = $resultCheckOut['billing_code'];
				}
				else{
					exit(
						'<p>商品データの取得に失敗しました。</p>'.
            '<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
					);
				}
			}
			else{
				exit(
					'<p>通信エラーが発生しました。通信環境を確認してもう一度お試し下さい。</p>'.
					'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
				);
			}
		}
	}
	else{
		exit(
			'<p>通信エラーが発生しました。通信環境を確認してもう一度お試し下さい。</p>'.
			'<p><a href='.$appDefine->PAYPAL_CANCEL_URL.'>ゲームに戻る</a></p>'
		);
	}
	// セッションIDを再取得する (CSRF対策)
	session_regenerate_id(true);
  //カスタムスタートオプションを作成
  $postParam = array();
  $postParam['custom_start_param'] = array(
    'start_scene' => 'billingShop',
    'billing_status' => $billingSuccess['billing_status'],
    'billing_code' => $resultCheckOut['billing_code'],
  );
  $request_url = $appDefine->PAYPAL_FINISH_REDIRECT_URL;
  //購入結果があればパラメーターを付与
  if($billingSuccess['billing_status'] != "" && $billingSuccess['billing_code'] != "") $request_url .= '?'.http_build_query($postParam);
  // 元記事にリダイレクトする
	header("Location: ".$request_url); /* ブラウザをリダイレクトします */
	exit;
}
