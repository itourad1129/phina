//============================================
//  課金ショップシーン
//============================================
//パブリック変数定義
var BILLING_SHOP_INSTANCE = null; //課金ショップシーンのインスタンス
var BILLING_SHOP_BASE_LAYER = null; //ベースレイヤー
var BILLING_SHOP_WINDOW_LAYER = null; //ウィンドウレイヤー
var BILLING_SHOP_UI_LAYER = null; //UIレイヤー
var BILLING_SHOP_MASTER_DATAS = null; //課金ショップのマスターデータ
var BILLING_SHOP_INIT_STEP = 0; //0:初期化前 1:初期化中 2:初期化完了
var BILLING_SHOP_ITEM_BTN_ARRAY = new Array(); //商品ボタン配列
var BILLING_SHOP_PAYPAL_ORDER = null; //作成された決済情報
var BILLING_SHOP_RESULT_BILLING_MESSAGE = null; //購入結果があり、一時的に表示する
phina.define("BillingShop", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化

  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "billingShop";
    //メンバー初期化
    BILLING_SHOP_INSTANCE = null; //課金ショップシーンのインスタンス
    BILLING_SHOP_BASE_LAYER = null; //ベースレイヤー
    BILLING_SHOP_WINDOW_LAYER = null; //ウィンドウレイヤー
    BILLING_SHOP_UI_LAYER = null; //UIレイヤー
    BILLING_SHOP_MASTER_DATAS = null; //課金ショップのマスターデータ
    BILLING_SHOP_INIT_STEP = 0; //0:初期化前 1:初期化通信中 2:初期化通信完了 3:初期化処理完了
    BILLING_SHOP_ITEM_BTN_ARRAY = new Array(); //商品ボタン配列
    BILLING_SHOP_PAYPAL_ORDER = null; //作成された決済情報
    // 親クラス初期化
    this.superInit();
    BILLING_SHOP_INSTANCE = this;
    // 背景色
    this.backgroundColor = 'black';

    //シーンの親ノード生成
    BILLING_SHOP_BASE_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //ウィンドウ表示レイヤー
    BILLING_SHOP_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //UIレイヤー
    BILLING_SHOP_UI_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BILLING_SHOP_BASE_LAYER);

    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(BILLING_SHOP_UI_LAYER);
    headerSptite.y = headerSptite.y - ((SCREEN_HEIGHT / 2) - (headerSptite.height / 2));

    //戻るボタン
    var backBtn = Sprite('ASSET_79').addChildTo(BILLING_SHOP_UI_LAYER);
    backBtn.x = backBtn.x + ((SCREEN_WIDTH / 2) - (backBtn.width / 2))
    backBtn.y = headerSptite.y;
    backBtn.y = backBtn.y + backBtn.height;
    backBtn['label'] = Label({
      text: '戻る',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(backBtn);
    backBtn['btn'] = Button({
      width: backBtn.width,         // 横サイズ
      height: backBtn.height,        // 縦サイズ
    }).addChildTo(backBtn);
    backBtn['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      //前のシーンに戻る。
      var prevSceneName = SCENE_MANAGER['prev_scene'];
      SCENE_MANAGER['prev_scene'] = "billingShop";
      BILLING_SHOP_INSTANCE.exit(prevSceneName);
    };
    backBtn['btn'].visible = false;

    Label({
      text: 'データストア',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);
    NETWORK_IS_CONNECTING = true;
    BILLING_SHOP_INIT_STEP = 1; //初期化通信開始
    var postParam = new Object();
    postParam['billinng_shop_init'] = 0;
    //初回DLの再DLが必要あるかチェック
    if(CUSTOM_START_GAME != null && isset(CUSTOM_START_GAME['start_scene']) && CUSTOM_START_GAME['start_scene'] == "billingShop"){
      postParam['exe_init_dl'] = 0;
    }
    ajaxStart("post","json","../../client/billingShop/billingShop.php",postParam); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != ""){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['result_add_load_asset_datas'])){
            G_ASSET_START_ASSET_LODER(json['result_add_load_asset_datas']); //アセットを追加読み込みする(非同期)
          }
          if(isset(json['result_billing_shop_init'])){
            var resultInit = json['result_billing_shop_init'];
            if(isset(resultInit['billing_shop_master_datas'])){ //ショップの商品マスターデータを取得
              console.log(resultInit['billing_shop_master_datas']);
              BILLING_SHOP_MASTER_DATAS = resultInit['billing_shop_master_datas'];
            }
            BILLING_SHOP_INIT_STEP = 2; //初期化通信完了
          }
          if(isset(json['result_create_order'])){ //paypalの決済の作成に成功した。
            console.log(json['result_create_order']);
            var order = json['result_create_order'];
            if(isset(order['error']) && isset(order['error_comment'])){
              if(order['error'] == 0){ //正常終了
                if(!isset(order['login_url']) && !isset(order['card_url'])){
                  G_NORMAL_WINDOW_CREATE(BILLING_SHOP_WINDOW_LAYER,"エラー","PayPalにて、決済情報の\n取得に失敗しました。",2,"ErrorResultCreateOrder1Window");
                }
                else{
                  BILLING_SHOP_PAYPAL_ORDER = order; //オーダー情報を更新
                  var cardPayBtnText = "";
                  var loginPayBtnText = "";
                  if(isset(BILLING_SHOP_PAYPAL_ORDER['card_url'])) cardPayBtnText = "クレジットカード払い";
                  if(isset(BILLING_SHOP_PAYPAL_ORDER['login_url'])) loginPayBtnText = "PayPalにログイン";
                  G_NORMAL_WINDOW_CREATE(BILLING_SHOP_WINDOW_LAYER,"PayPalで支払い方法を選択","支払い方法を選択して下さい。\nお支払いはクレジットカード、\nまたはPayPalにログインで行えます。",1,"SelectPayPalBillingWindow");
                  if(WINDOW_NO_BUTTON_TEXT != null) WINDOW_NO_BUTTON_TEXT.text = cardPayBtnText;
                  if(WINDOW_YES_BUTTON_TEXT != null) WINDOW_YES_BUTTON_TEXT.text = loginPayBtnText;
                }
              }
              else{ //決済作成エラー
                G_NORMAL_WINDOW_CREATE(BILLING_SHOP_WINDOW_LAYER,"エラー",order['error_comment'],2,"ErrorResultCreateOrder2Window");
              }
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        this.exit("title");
      }
      RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }

    if(BILLING_SHOP_INIT_STEP == 2){ //初期化処理を実行
      G_BILLING_SHOP_SALE_ITEM_BTN_CREATE(BILLING_SHOP_UI_LAYER,BILLING_SHOP_MASTER_DATAS); //商品ボタンを生成
      G_BILLING_SHOP_CREATE_RESULT_BILLING_MSG(BILLING_SHOP_UI_LAYER,BILLING_SHOP_MASTER_DATAS); //購入結果があれば表示
      BILLING_SHOP_INIT_STEP = 3; //初期化処理完了
    }

    //ウィンドウに返り値があった場合
    if(WINDOW_RETURN_VAL != null){
      if(isset(WINDOW_RETURN_VAL['SelectPayPalBillingWindow']) && WINDOW_RETURN_VAL['SelectPayPalBillingWindow'] == "yes"){ //PayPalにログインして支払い
        if(BILLING_SHOP_PAYPAL_ORDER != null && isset(BILLING_SHOP_PAYPAL_ORDER['login_url'])) {
          if(window.open(BILLING_SHOP_PAYPAL_ORDER['login_url'],"_blank")){

          }else{
            window.location.href = BILLING_SHOP_PAYPAL_ORDER['login_url'];
          }
        }
      }
      if(isset(WINDOW_RETURN_VAL['SelectPayPalBillingWindow']) && WINDOW_RETURN_VAL['SelectPayPalBillingWindow'] == "no"){ //カード払いで支払い
        if(BILLING_SHOP_PAYPAL_ORDER != null && isset(BILLING_SHOP_PAYPAL_ORDER['card_url'])) {
          if(window.open(BILLING_SHOP_PAYPAL_ORDER['card_url'],"_blank")){

          }else{
            window.location.href = BILLING_SHOP_PAYPAL_ORDER['card_url'];
          }
        }
      }

      WINDOW_RETURN_VAL = null;
    }
  },
});

function G_BILLING_SHOP_SALE_ITEM_BTN_CREATE(parentBase,billingShopMasterdatas){ //商品ボタンを生成する
  if(billingShopMasterdatas != null){
    for (var i = 0; i < billingShopMasterdatas.length; i++) {
      var masterData = billingShopMasterdatas[i];
      BILLING_SHOP_ITEM_BTN_ARRAY[i] = Sprite('ASSET_63').addChildTo(parentBase);
      if(i == 0) BILLING_SHOP_ITEM_BTN_ARRAY[i].y = BILLING_SHOP_ITEM_BTN_ARRAY[i].y - SCREEN_HEIGHT * 0.3;
      else {
        BILLING_SHOP_ITEM_BTN_ARRAY[i].y = BILLING_SHOP_ITEM_BTN_ARRAY[i - 1].y;
        BILLING_SHOP_ITEM_BTN_ARRAY[i].y = BILLING_SHOP_ITEM_BTN_ARRAY[i].y + BILLING_SHOP_ITEM_BTN_ARRAY[i].height * 1.25;
      }
      BILLING_SHOP_ITEM_BTN_ARRAY[i]['btn_label'] = Label({
        text: masterData['item_name'],
        fontSize: 24,
        fill: 'white',
      }).addChildTo(BILLING_SHOP_ITEM_BTN_ARRAY[i]);
      BILLING_SHOP_ITEM_BTN_ARRAY[i]['btn'] = Button({
        width: BILLING_SHOP_ITEM_BTN_ARRAY[i].width,         // 横サイズ
        height: BILLING_SHOP_ITEM_BTN_ARRAY[i].height,        // 縦サイズ
      }).addChildTo(BILLING_SHOP_ITEM_BTN_ARRAY[i]);
      BILLING_SHOP_ITEM_BTN_ARRAY[i]['btn']['billing_shop_master_data'] = masterData;
      BILLING_SHOP_ITEM_BTN_ARRAY[i]['btn'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
        console.log(this['billing_shop_master_data']['item_name']);
        NETWORK_IS_CONNECTING = true;
        var postParam = new Object();
        postParam['billinng_start_purchase'] = 0;
        postParam['billing_code'] = this['billing_shop_master_data']['billing_code'];
        ajaxStart("post","json","../../client/billingShop/billingShop.php",postParam); //非同期通信開始
      };
      BILLING_SHOP_ITEM_BTN_ARRAY[i]['btn'].visible = false;
    }
  }
}

function G_BILLING_SHOP_CREATE_RESULT_BILLING_MSG(parentBase,billingItemMasterDatas){ //購入結果を表示
  //カスタムスタートの処理がある場合は表示
  if(CUSTOM_START_GAME != null && isset(CUSTOM_START_GAME['start_scene']) && CUSTOM_START_GAME['start_scene'] == "billingShop"){
    if(SCENE_MANAGER['prev_scene'] == "") SCENE_MANAGER['prev_scene'] = "myPage";
    //課金購入処理(完了)
    if(CUSTOM_START_GAME['billing_status'] == "success"){
      var itemName = "";
      for (var i = 0; i < billingItemMasterDatas.length; i++) {
        if(billingItemMasterDatas[i]['billing_code'] == CUSTOM_START_GAME['billing_code']){
          itemName = billingItemMasterDatas[i]['item_name'];
          break;
        }
      }
      var msgText = "お買い上げありがとうございます。\n購入した商品\n" + itemName;
      G_NORMAL_WINDOW_CREATE(BILLING_SHOP_WINDOW_LAYER,"購入完了",msgText,2,"ResultBillingMsgSuccessWindow");
    }//課金購入処理(キャンセル)
    else if(CUSTOM_START_GAME['billing_status'] == "cancel"){
      var msgText = "商品の購入をキャンセルしました。";
      G_NORMAL_WINDOW_CREATE(BILLING_SHOP_WINDOW_LAYER,"購入キャンセル",msgText,2,"ResultBillingMsgCancelWindow");
    }
    CUSTOM_START_GAME = null;
  }
}
