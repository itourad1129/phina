<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/billingShop/index.php';
include_once '../../module/paypal/index.php';
include_once '../../module/asset/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['billinng_shop_init'])){ //シーン初期化通信を実行した。
    //現在販売中の課金ショップ商品データを取得
    $resultInit = array();
    $resultInit['billing_shop_master_datas'] = getBillingShopMasterDatas($pdo,true);
    $RESULT_JSON = $RESULT_JSON + array('result_billing_shop_init' => $resultInit);
  }
  if(isset($_POST['billinng_start_purchase']) && isset($_POST['billing_code'])){ //商品の購入が選択された。
    $resultCreateOrder = array();
    $resultCreateOrder['error'] = 1;
    $resultCreateOrder['error_comment'] = "通信エラーが発生しました。";

    $appDefine = new AppDefine($ENV);
    $mode = 'sandbox';
    if($ENV == 1) $mode = 'live';
    //ペイパル決済処理を開始
    $paypal = new PayPalOrder(array(
      'client_id' => $appDefine->PAYPAL_CLIENT_ID,
      'secret'    => $appDefine->PAYPAL_SECRET,
      'mode'      => $mode,
      'lang'      => 'ja-JP',
    ));
    // セッションがない場合はログインしていない状態で始める
    if(empty($_SESSION['paypal'])){
	    $_SESSION['paypal'] = array('login' => false);
    }
    //アクセストークンを取得
    $token = $paypal->getToken(true);
  	// 結果を返す
  	if(empty($token['access_token'])){
      $resultCreateOrder['error'] = 10;
      $resultCreateOrder['error_comment'] = "アクセストークンの取得に失敗しました";
  	} else{
  		$_SESSION['paypal']['access_token'] = $token['access_token'];
  	}

    $shopMasterData = selectBillingShopMasterData($pdo,$_POST['billing_code']);
    if($shopMasterData != false){  //商品データを見つけた
      // 決済情報を作成する
      $fieldData = array(
        'item' => array(
          'name'        => $shopMasterData['item_name'],
          'description' => '「'. $shopMasterData['item_name']. '」を購入します。',
          //'sku'         => 'as-'. time(). '-'. substr(base_convert(md5(session_id()), 16, 36), 0, 6),
          'unit_amount' => array(
            'currency_code' => 'JPY',
            'value'         => (int)$shopMasterData['price'],
          ),
          'quantity'    => 1,
          'category'    => 'use_item',
          'tax'         => array(
            'currency_code' => 'JPY',
            'value'         => ceil((float)$shopMasterData['price'] * 0.1),
          ),
        ),
        'url' => array(
          'completed_url' => $appDefine->PAYPAL_COMPLETE_URL,
          'canceled_url'  => $appDefine->PAYPAL_CANCEL_URL,
        ),
        'shopinfo' => array(
          'name'     => $shopMasterData['item_name'],
          'shipment' => false,
        ),
      );
    	$order = $paypal->createOrder($fieldData,(empty($_SESSION['paypal']['access_token']) ? null : $_SESSION['paypal']['access_token'])
    	);
      // 結果を返す
    	if(empty($order)){
        $resultCreateOrder['error'] = 2;
        $resultCreateOrder['error_comment'] = "PayPalにて決済の作成に失敗しました";
    	} else{
    		// セッションに保存する
    		// $_SESSION['paypal'][$order['id']] = array(
    		// 	'referer' => $referer,
    		// 	/* オーダIDごとに保存しておきたい情報があれば追加する */
    		// );

        //DBに決済状態を保存
        if(isset($order['id']) && isset($order['status'])){
          $paypal->insertPlayerPayPalPurchase($pdo,$PLAYER_INFO['player_index_id'],$order['id'],$order['status'],$shopMasterData['billing_code']);
        }
    		$_SESSION['paypal']['access_token'] = $order['token'];
    		// 結果を返す (決済作成の成功)
        $resultCreateOrder['error'] = 0;
        $resultCreateOrder['error_comment'] = "";
        if(isset($order['login'])){
          $resultCreateOrder['login_url'] = $order['login'];
        }
        if(isset($order['card'])){
          $resultCreateOrder['card_url'] = $order['card'];
        }
        if(isset($order['id'])){
          $resultCreateOrder['order_id'] = $order['id'];
        }
    	}
    }

    $RESULT_JSON = $RESULT_JSON + array('result_create_order' => $resultCreateOrder); //決済
  }
  if(isset($_POST['exe_init_dl'])){ //初回DLの再DLを実行
    $initDlTags = getInitLoadAssetTags($pdo);
    if($addLoadAssetTags == "") $addLoadAssetTags = $initDlTags;
    else $addLoadAssetTags = $addLoadAssetTags.",".$initDlTags;
  }
  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
