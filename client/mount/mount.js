//============================================
//  マウントシーン
//============================================
//パブリック変数定義
var MOUNT_SCENE_INSTANCE = null;//マウントのシーンインスタンス
var MOUNT_SCENE_BASE = null; //マウントシーンの親
var MOUNT_WINDOW_LAYER = null; //ウィンドウ表示レイヤー
var MOUNT_BACK_GROUND_LAYER = null; //マウントシーンの背景レイヤー
var MOUNT_UI_LAYER = null; //UIレイヤー
var MOUNT_ITEM_LAYER = null; //惑星表示レイヤー
var MOUNT_SWIPE_START_POS = 0; //スワイプスタート位置
var MOUNT_SWIPE_MOVE_POS = 0; //スワイプ中の位置
var MOUNT_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
var MOUNT_SELECT_ITEM_INDEX = 0; //選択中の惑星のindex
var MOUNT_ITEM_IMAGE_LIST = new Array(); //惑星のイメージリスト
var MOUNT_ITEM_ANIM_FLAG = false; //惑星選択のアニメーション中か
var MOUNT_PLAYER_MOUNT_DATAS = new Array(); //プレイヤーが解放済みのマウントデータ
var MOUNT_SCENE_INIT_FLAG = 0; //初期化が完了したか。 0:初期化前 1:初期通信完了 2:初期化処理完了
var MOUNT_PLAYER_OPEN_FLAG = null; //プレイヤーの解放フラグデータ
var MOUNT_SELECT_MOUNT_BTN = null; //マウント選択ボタン
var MOUNT_CONTROLE_PANEL_MAIN_TEXT = null; //コントロールパネルに表示するメインテキスト
var MOUNT_CONTROLE_PANEL_SUB_TEXT = null; //コントロールパネルに表示するサブテキスト
var MOUNT_CHARGE_BTN = null; //補充ボタン
var MOUNT_SELECT_MOUNT_DATA = new Array(); //選択中のマウントデータ(マスターデータとユーザーデータ)
var MOUNT_FUEL_CHARGE_WINDOW = null; //燃料補充ウィンドウ
var MOUNT_PLAYER_ITEM_DATAS = new Array(); //ユーザーのアイテム所持状態
var MOUNT_USE_CHARGE_FUEL_NUM = 0; //燃料の補給に消費する燃料アイテムの個数
var MOUNT_STATSU_GAUGE_ATK = null; //ゲージ1
var MOUNT_STATSU_GAUGE_HP = null; //ゲージ2
var MOUNT_STATSU_GAUGE_CONTROLE = null; //ゲージ3
var MOUNT_STATSU_LABEL = null; //マウントステータス


phina.define("Mount", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "mount";
    //メンバー初期化
    MOUNT_SCENE_INSTANCE = null;//ワールドマップのシーンインスタンス
    MOUNT_UI_LAYER = null; //UIレイヤー
    MOUNT_SCENE_BASE = null; //ワールドマップのベース
    MOUNT_WINDOW_LAYER = null; //ウィンドウ表示レイヤー
    MOUNT_BACK_GROUND_LAYER = null; //マウントシーンの背景レイヤー
    MOUNT_ITEM_LAYER = null; //惑星表示レイヤー
    MOUNT_SWIPE_START_POS = 0; //スワイプスタート位置
    MOUNT_SWIPE_MOVE_POS = 0; //スワイプ中の位置
    MOUNT_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
    MOUNT_SELECT_ITEM_INDEX = 0; //選択中の惑星のindex
    MOUNT_ITEM_IMAGE_LIST = new Array(); //惑星のイメージリスト
    MOUNT_ITEM_ANIM_FLAG = false; //惑星選択のアニメーション中か
    MOUNT_PLAYER_MOUNT_DATAS = new Array(); //プレイヤーが解放済みのマウントデータ
    MOUNT_SCENE_INIT_FLAG = 0; //初期化が完了したか。 0:初期化前 1:初期通信完了 2:初期化処理完了
    MOUNT_PLAYER_OPEN_FLAG = null; //プレイヤーの解放フラグデータ
    MOUNT_SELECT_MOUNT_BTN = null; //マウント選択ボタン
    MOUNT_CONTROLE_PANEL_MAIN_TEXT = null; //コントロールパネルに表示するメインテキスト
    MOUNT_CONTROLE_PANEL_SUB_TEXT = null; //コントロールパネルに表示するサブテキスト
    MOUNT_CHARGE_BTN = null; //補充ボタン
    MOUNT_SELECT_MOUNT_DATA = new Array(); //洗濯中のマウントデータ(マスターデータとユーザーデータ)
    MOUNT_FUEL_CHARGE_WINDOW = null; //燃料補充ウィンドウ
    MOUNT_PLAYER_ITEM_DATAS = new Array(); //ユーザーのアイテム所持状態
    MOUNT_USE_CHARGE_FUEL_NUM = 0; //燃料の補給に消費する燃料アイテムの個数
    MOUNT_STATSU_GAUGE_ATK = null; //ゲージ1
    MOUNT_STATSU_GAUGE_HP = null; //ゲージ2
    MOUNT_STATSU_GAUGE_CONTROLE = null; //ゲージ3


    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    MOUNT_SCENE_INSTANCE = this;

    MOUNT_SCENE_BASE = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //ウィンドウ表示レイヤー
    MOUNT_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //シーン背景表示レイヤー
    MOUNT_BACK_GROUND_LAYER = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(MOUNT_SCENE_BASE);
    //UIレイヤー
    MOUNT_UI_LAYER = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(MOUNT_SCENE_BASE);
    //マウントレイヤー
    MOUNT_ITEM_LAYER = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(MOUNT_SCENE_BASE);

    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(MOUNT_UI_LAYER);
    //headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.y - ((SCREEN_HEIGHT / 2) - (headerSptite.height / 2));

    var headerLabel = Label({
      text: 'マウント',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);
    NETWORK_IS_CONNECTING = true;


    //シーン背景
    var mountSceneBackGround = Sprite('ASSET_460').addChildTo(MOUNT_BACK_GROUND_LAYER);
    mountSceneBackGround.y = mountSceneBackGround.y - (mountSceneBackGround.height / 2);

    //コントロールパネル背景
    var mountControlePanelBackGround = Sprite('ASSET_461').addChildTo(MOUNT_UI_LAYER);
    mountControlePanelBackGround.y = mountControlePanelBackGround.y + (mountControlePanelBackGround.height / 2);

    //選択ボタン
    MOUNT_SELECT_MOUNT_BTN = Sprite('ASSET_120').addChildTo(MOUNT_UI_LAYER);
    MOUNT_SELECT_MOUNT_BTN.y = MOUNT_SELECT_MOUNT_BTN.y + MOUNT_SELECT_MOUNT_BTN.height;
    MOUNT_SELECT_MOUNT_BTN['label'] = Label({
      text: '選択',
      fontSize: 24,
      fill: 'Black',
    }).addChildTo(MOUNT_SELECT_MOUNT_BTN);
    MOUNT_SELECT_MOUNT_BTN['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MOUNT_SELECT_MOUNT_BTN);
    MOUNT_SELECT_MOUNT_BTN['btn']['btn_status_id'] = -1;
    MOUNT_SELECT_MOUNT_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(MOUNT_SCENE_INIT_FLAG != 2) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      switch (this['btn_status_id']) {
        case 0: //未解放
        {
          //解放フラグマスターデータ、マウントマスターデータが存在するか
          if(MASTER_DATA_OPEN_FLAG_MASTER != null && MOUNT_SELECT_MOUNT_DATA != null && isset(MOUNT_SELECT_MOUNT_DATA['mount_master_data'])){
            for (var i = 0; i < MASTER_DATA_OPEN_FLAG_MASTER.length; i++) {
              if(MASTER_DATA_OPEN_FLAG_MASTER[i]['id'] == MOUNT_SELECT_MOUNT_DATA['mount_master_data']['open_flag_id']){
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"解放条件",MASTER_DATA_OPEN_FLAG_MASTER[i]['comment'],2,"MountOpenFlagWindow");
                break;
              }
            }
          }
        }
        break;
        case 1: //解放、未購入
        {
          if(MOUNT_SELECT_MOUNT_DATA != null && isset(MOUNT_SELECT_MOUNT_DATA['mount_master_data'])){
            var playerPurchaseMoney = 0;
            var price = MOUNT_SELECT_MOUNT_DATA['mount_master_data']['price'];
            for (var i = 0; i < MOUNT_PLAYER_ITEM_DATAS.length; i++) {
              if(MOUNT_PLAYER_ITEM_DATAS[i]['id'] == MOUNT_SELECT_MOUNT_DATA['mount_master_data']['price_item_id']){
                playerPurchaseMoney = MOUNT_PLAYER_ITEM_DATAS[i]['item_val'];
                break;
              }
            }
            if(parseInt(price) <= parseInt(playerPurchaseMoney)){ //購入確認ウィンドウの表示
              var mountName = MOUNT_SELECT_MOUNT_DATA['mount_master_data']['mount_name'];
              var price = MOUNT_SELECT_MOUNT_DATA['mount_master_data']['price'];
              var afterItemVal = parseInt(playerPurchaseMoney) - parseInt(price);
              G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"購入の確認",mountName + "を購入します。\nよろしいですか？\n購入後の金額\n" + playerPurchaseMoney + "->" + afterItemVal,1,"checkPlayerPurchaseMountWindow");
            }
            else{ //所持金額が不足している。
              G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー","所持金が不足しています。",2,"ErrorMountPurchaseWindow");
            }
          }
        }
        break;
        case 2: //解放済み、購入済み
        {
          if(MOUNT_SELECT_MOUNT_DATA != null && isset(MOUNT_SELECT_MOUNT_DATA['user_mount_data']) && MOUNT_SELECT_MOUNT_DATA['user_mount_data']['visible'] == 0){
            //使用中のマウントではない場合、使用処理を開始
            var postParam = new Object();
            postParam['player_mount_select'] = MOUNT_SELECT_MOUNT_DATA['user_mount_data']['mount_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/mount/mount.php",postParam); //非同期通信開始
          }
        }
        break;
        default:
        break;
      }
    };
    MOUNT_SELECT_MOUNT_BTN['btn'].visible = false;

    //コントロールパネルテキスト
    MOUNT_CONTROLE_PANEL_MAIN_TEXT = Label({
      text: '',
      fontSize: 32,
      fill: 'white',
      align: 'right',
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_CONTROLE_PANEL_MAIN_TEXT.y = MOUNT_SELECT_MOUNT_BTN.y;
    MOUNT_CONTROLE_PANEL_MAIN_TEXT.y = MOUNT_CONTROLE_PANEL_MAIN_TEXT.y + (MOUNT_SELECT_MOUNT_BTN.height);
    MOUNT_CONTROLE_PANEL_MAIN_TEXT.x = MOUNT_CONTROLE_PANEL_MAIN_TEXT.x + (SCREEN_WIDTH * 0.2);

    //コントロールパネルサブテキスト
    MOUNT_CONTROLE_PANEL_SUB_TEXT = Label({
      text: '',
      fontSize: 28,
      fill: 'white',
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_CONTROLE_PANEL_SUB_TEXT.y = MOUNT_CONTROLE_PANEL_MAIN_TEXT.y;
    MOUNT_CONTROLE_PANEL_SUB_TEXT.y = MOUNT_CONTROLE_PANEL_SUB_TEXT.y + (MOUNT_SELECT_MOUNT_BTN.height * 1.25);

    //補充ボタン
    MOUNT_CHARGE_BTN = Sprite('ASSET_120').addChildTo(MOUNT_UI_LAYER);
    MOUNT_CHARGE_BTN.y = MOUNT_CONTROLE_PANEL_MAIN_TEXT.y;
    MOUNT_CHARGE_BTN.x = MOUNT_CHARGE_BTN.x + ((SCREEN_WIDTH / 2) - (MOUNT_CHARGE_BTN.width / 1.75));
    MOUNT_CHARGE_BTN['label'] = Label({
      text: '補充',
      fontSize: 24,
      fill: 'Black',
    }).addChildTo(MOUNT_CHARGE_BTN);
    MOUNT_CHARGE_BTN['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MOUNT_CHARGE_BTN);
    MOUNT_CHARGE_BTN['btn']['btn_visible'] = false
    MOUNT_CHARGE_BTN['btn']['fuel_max_flag'] = false;
    MOUNT_CHARGE_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(MOUNT_SCENE_INIT_FLAG != 2) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || MOUNT_FUEL_CHARGE_WINDOW != null) return;
      if(this['btn_visible'] == true){
        if(this['fuel_max_flag'] == false){
          var fuelItemName = "";
          if(MASTER_DATA_ITEM_MASTER != null && MOUNT_SELECT_MOUNT_DATA != null && isset(MOUNT_SELECT_MOUNT_DATA['mount_master_data'])){
            for (var i = 0; i < MASTER_DATA_ITEM_MASTER.length; i++) {
               if(MASTER_DATA_ITEM_MASTER[i]['id'] == MOUNT_SELECT_MOUNT_DATA['mount_master_data']['fuel_item_id']){
                 fuelItemName = MASTER_DATA_ITEM_MASTER[i]['item_name'];
                 break;
               }
            }
          }
          G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"燃料の補充","燃料の補充を行いますか？\n消費する燃料：" + fuelItemName,1,"chargeFuelWindow");
        }
        else{ //燃料が満タン
           G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー","燃料は満タンです。",2,"errorChargeIsFull");
        }
      }
    };
    MOUNT_CHARGE_BTN['btn'].visible = false;

    //マウントステータスラベル
    MOUNT_STATSU_LABEL = Label({
      text: 'マウント名:??? \nマウントタイプ:??? \n メインウェポン:??? \nサブウェポン:???',
      fontSize: 20,
      fill: 'white',
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_STATSU_LABEL.y = MOUNT_CONTROLE_PANEL_MAIN_TEXT.y;
    MOUNT_STATSU_LABEL.y = MOUNT_STATSU_LABEL.y + (MOUNT_CONTROLE_PANEL_MAIN_TEXT.height * 1.2);

    //マウントステータスゲージ:攻撃力
    MOUNT_STATSU_GAUGE_ATK = Gauge({
      x: 0, y: 0,// x,y座標
      width: 432,            // 横サイズ
      height: 30,            // 縦サイズ
      maxValue: 100,         // ゲージ最大値
      value: 100,         // ゲージ初期値
      fill: 'white',         // 後ろの色
      gaugeColor: 'red', // ゲージ色
      stroke: 'blue',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_STATSU_GAUGE_ATK.y = (MOUNT_STATSU_GAUGE_ATK.y + (SCREEN_HEIGHT / 3.5));
    MOUNT_STATSU_GAUGE_ATK.x = MOUNT_STATSU_GAUGE_ATK.x + (SCREEN_WIDTH / 9);

    MOUNT_STATSU_GAUGE_ATK['status_name_label'] = Label({
      text: '火力',
      fontSize: 32,
      fill: 'white',
    }).addChildTo(MOUNT_STATSU_GAUGE_ATK);
    MOUNT_STATSU_GAUGE_ATK['status_name_label'].x = MOUNT_STATSU_GAUGE_ATK['status_name_label'].x - (MOUNT_STATSU_GAUGE_ATK.width / 1.4);

    //マウントステータスゲージ:装甲
    MOUNT_STATSU_GAUGE_HP = Gauge({
      x: 0, y: 0,// x,y座標
      width: 432,            // 横サイズ
      height: 30,            // 縦サイズ
      maxValue: 100,         // ゲージ最大値
      value: 100,         // ゲージ初期値
      fill: 'white',         // 後ろの色
      gaugeColor: 'green', // ゲージ色
      stroke: 'blue',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_STATSU_GAUGE_HP.y = MOUNT_STATSU_GAUGE_ATK.y;
    MOUNT_STATSU_GAUGE_HP.y = MOUNT_STATSU_GAUGE_HP.y + MOUNT_STATSU_GAUGE_HP.height * 2;
    MOUNT_STATSU_GAUGE_HP.x = MOUNT_STATSU_GAUGE_ATK.x;

    MOUNT_STATSU_GAUGE_HP['status_name_label'] = Label({
      text: '装甲',
      fontSize: 32,
      fill: 'white',
    }).addChildTo(MOUNT_STATSU_GAUGE_HP);
    MOUNT_STATSU_GAUGE_HP['status_name_label'].x = MOUNT_STATSU_GAUGE_HP['status_name_label'].x - (MOUNT_STATSU_GAUGE_HP.width / 1.4);

    //マウントステータスゲージ:攻撃力
    MOUNT_STATSU_GAUGE_CONTROLE = Gauge({
      x: 0, y: 0,// x,y座標
      width: 432,            // 横サイズ
      height: 30,            // 縦サイズ
      maxValue: 100,         // ゲージ最大値
      value: 100,         // ゲージ初期値
      fill: 'white',         // 後ろの色
      gaugeColor: 'yellow', // ゲージ色
      stroke: 'blue',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(MOUNT_UI_LAYER);
    MOUNT_STATSU_GAUGE_CONTROLE.y = MOUNT_STATSU_GAUGE_HP.y;
    MOUNT_STATSU_GAUGE_CONTROLE.y = MOUNT_STATSU_GAUGE_CONTROLE.y + MOUNT_STATSU_GAUGE_CONTROLE.height * 2;
    MOUNT_STATSU_GAUGE_CONTROLE.x = MOUNT_STATSU_GAUGE_HP.x;

    MOUNT_STATSU_GAUGE_CONTROLE['status_name_label'] = Label({
      text: '機動',
      fontSize: 32,
      fill: 'white',
    }).addChildTo(MOUNT_STATSU_GAUGE_CONTROLE);
    MOUNT_STATSU_GAUGE_CONTROLE['status_name_label'].x = MOUNT_STATSU_GAUGE_CONTROLE['status_name_label'].x - (MOUNT_STATSU_GAUGE_CONTROLE.width / 1.4);


    //スワイプ領域
    var swipeAreaButton = Button({
      width: 640,         // 横サイズ
      height: 640,        // 縦サイズ
    }).addChildTo(MOUNT_UI_LAYER);
    swipeAreaButton.y = swipeAreaButton.y - (swipeAreaButton.height / 2);
    swipeAreaButton.onpointstart = function(e){
      if(MOUNT_ITEM_ANIM_FLAG == true) return;
      MOUNT_SWIPE_START_POS = e.pointer.x;
    };
    swipeAreaButton.onpointmove = function(e){
      if(MOUNT_ITEM_ANIM_FLAG == true) return;
      MOUNT_SWIPE_MOVE_POS = e.pointer.x;
      var diffPos = MOUNT_SWIPE_START_POS - MOUNT_SWIPE_MOVE_POS;
      if(150 < diffPos) MOUNT_SWIPE_CHECK = 1;
      if(diffPos < -150) MOUNT_SWIPE_CHECK = 2;
    };
    swipeAreaButton.onpointend = function(e){
      if(MOUNT_ITEM_ANIM_FLAG == true) return;
      MOUNT_SWIPE_START_POS = 0;
      MOUNT_SWIPE_MOVE_POS = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(MOUNT_SWIPE_CHECK != 0){
        if(MOUNT_SWIPE_CHECK == 1){//左
          MOUNT_SELECT_ITEM_INDEX ++;
          G_MOUNT_ITEM_CHANGE_ANIM_START(2,MOUNT_PLAYER_MOUNT_DATAS,MOUNT_ITEM_IMAGE_LIST);
        }
        if(MOUNT_SWIPE_CHECK == 2){//右
          MOUNT_SELECT_ITEM_INDEX --;
          G_MOUNT_ITEM_CHANGE_ANIM_START(1,MOUNT_PLAYER_MOUNT_DATAS,MOUNT_ITEM_IMAGE_LIST);
        }
        MOUNT_SWIPE_CHECK = 0;
      }
    };
    swipeAreaButton.visible = false;

    //戻るボタン
    var backButton = Sprite('ASSET_79').addChildTo(MOUNT_UI_LAYER);
    backButton.y = backButton.y - ((SCREEN_HEIGHT / 2) - ((backButton.height / 2) + headerSptite.height));
    backButton.x = backButton.x + ((SCREEN_WIDTH / 2) - (backButton.width / 2));
    backButton['label'] = Label({
      text: '戻る',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(backButton);
    backButton['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(backButton);
    backButton['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      var prevSceneName = SCENE_MANAGER['prev_scene'];
      SCENE_MANAGER['prev_scene'] = "mount";
      MOUNT_SCENE_INSTANCE.exit(prevSceneName);
    };
    backButton['btn'].visible = false;
    //初期通信処理
    var postParam = new Object();
    postParam['mount_scene_init'] = 0;
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/mount/mount.php",postParam); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != ""){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['result_mount_scene_init'])){ //マウントシーン初期通信結果
            var resultMountSceneInit = json['result_mount_scene_init'];
            if(isset(resultMountSceneInit['player_mount_datas'])){ //プレイヤーが所持しているマウントデータを取得
              MOUNT_PLAYER_MOUNT_DATAS = resultMountSceneInit['player_mount_datas'];
            }
            if(isset(resultMountSceneInit['player_open_flag_datas'])){ //プレイヤーの解放フラグデータ配列を取得
              MOUNT_PLAYER_OPEN_FLAG = resultMountSceneInit['player_open_flag_datas'];
            }
            if(isset(resultMountSceneInit['player_item_datas'])){ //プレイヤーのアイテムデータを取得
              MOUNT_PLAYER_ITEM_DATAS = resultMountSceneInit['player_item_datas'];
            }
            MOUNT_SCENE_INIT_FLAG = 1;
          }
          if(isset(json['update_player_mount_datas'])){ //プレイヤーマウント更新情報が存在した。
            MOUNT_PLAYER_MOUNT_DATAS = new Array();
            MOUNT_PLAYER_MOUNT_DATAS = json['update_player_mount_datas'];
          }
          if(isset(json['update_player_item_datas'])){ //プレイヤーアイテム更新情報が存在した。
            MOUNT_PLAYER_ITEM_DATAS = new Array();
            MOUNT_PLAYER_ITEM_DATAS = json['update_player_item_datas'];
          }
          if(isset(json['result_charge_mount_fuel'])){ //燃料の補給が行われた。
            if(isset(json['result_charge_mount_fuel']['error'])){
              if(json['result_charge_mount_fuel']['error'] != 0){
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー",json['result_charge_mount_fuel']['error_comment'],2,"errorChargeFuelUpdateWindow");
              }
              else{
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"燃料の補給","燃料を補給しました。",2,"successChargeFuelUpdateWindow");
              }
            }
          }
          if(isset(json['result_mount_purchase'])){ //マウントの購入を行った。
            if(isset(json['result_mount_purchase']['error'])){
              if(json['result_mount_purchase']['error'] != 0){
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー",json['result_mount_purchase']['error_comment'],2,"errorResultMountPurchaseWindow");
              }
              else{
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"マウントの購入","マウントを購入しました。",2,"successResultMountPurchaseWindow");
              }
            }
          }
          if(isset(json['result_player_mount_select'])){ //マウントの選択を行った
            if(isset(json['result_player_mount_select']['error'])){
              if(json['result_player_mount_select']['error'] != 0){
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー",json['result_player_mount_select']['error_comment'],2,"errorResultMountSelectWindow");
              }
              else{
                G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"マウントの選択","マウントを選択しました。",2,"successResultMountSelectWindow");
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

    //シーン初期化処理
    if(MOUNT_SCENE_INIT_FLAG == 1){

      var resultMountItemInit = G_MOUNT_ITEM_DISP_INIT(MOUNT_PLAYER_MOUNT_DATAS,MOUNT_ITEM_IMAGE_LIST); //マウントアイコンリスト画像の表示
      //1つも解放していない場合、エラーダイアログを表示
      if(resultMountItemInit == false) G_NORMAL_WINDOW_CREATE(MOUNT_WINDOW_LAYER,"エラー","マウントデータの取得に失敗しました",2,"errorMountDataWindow");

      MOUNT_SCENE_INIT_FLAG = 2;
    }

    //ウィンドウに返り値があった場合
    if(WINDOW_RETURN_VAL != null){
      if(isset(WINDOW_RETURN_VAL['errorMountDataWindow']) && WINDOW_RETURN_VAL['errorMountDataWindow'] == "ok"){ //移動の取消しを行った
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "mount";
        MOUNT_SCENE_INSTANCE.exit(prevSceneName);
      }
      if(isset(WINDOW_RETURN_VAL['chargeFuelWindow']) && WINDOW_RETURN_VAL['chargeFuelWindow'] == "yes"){ //マウントの燃料チャージを行う
        //燃料補給ウィンドウを表示
        G_MOUNT_CREATE_CHARGE_FUEL_WINDOW(MOUNT_WINDOW_LAYER,MOUNT_SELECT_MOUNT_DATA);
      }
      if(isset(WINDOW_RETURN_VAL['successChargeFuelUpdateWindow']) && WINDOW_RETURN_VAL['successChargeFuelUpdateWindow'] == "ok"){ //燃料の補給を行った。
        //データの変更があったため、マウント画面の更新
        for (var i = 0; i < MOUNT_PLAYER_MOUNT_DATAS.length; i++) {
          if(MOUNT_PLAYER_MOUNT_DATAS[i]['mount_id'] == MOUNT_SELECT_MOUNT_DATA['user_mount_data']['mount_id']){
            MOUNT_CONTROLE_PANEL_MAIN_TEXT.text = "燃料:" + MOUNT_PLAYER_MOUNT_DATAS[i]['fuel'] + "/" + MOUNT_SELECT_MOUNT_DATA['mount_master_data']['max_fuel'];
            MOUNT_SELECT_MOUNT_DATA['user_mount_data'] = MOUNT_PLAYER_MOUNT_DATAS[i];
            break;
          }
        }
      }
      if(isset(WINDOW_RETURN_VAL['checkPlayerPurchaseMountWindow']) && WINDOW_RETURN_VAL['checkPlayerPurchaseMountWindow'] == "yes"){ //マウント購入の確認が行われた
        if(MOUNT_SELECT_MOUNT_DATA != null && isset(MOUNT_SELECT_MOUNT_DATA['mount_master_data'])){
          var postParam = new Object();
          postParam['player_mount_purchase'] = MOUNT_SELECT_MOUNT_DATA['mount_master_data']['mount_id'];
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/mount/mount.php",postParam); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['successResultMountPurchaseWindow']) && WINDOW_RETURN_VAL['successResultMountPurchaseWindow'] == "ok"){ //マウント購入結果ウィンドウを閉じた。
        G_MOUNT_ITEM_DISP_INIT(MOUNT_PLAYER_MOUNT_DATAS,MOUNT_ITEM_IMAGE_LIST);
      }
      if(isset(WINDOW_RETURN_VAL['successResultMountSelectWindow']) && WINDOW_RETURN_VAL['successResultMountSelectWindow'] == "ok"){ //マウント選択結果ウィンドウを閉じた。
        G_MOUNT_ITEM_DISP_INIT(MOUNT_PLAYER_MOUNT_DATAS,MOUNT_ITEM_IMAGE_LIST);
      }

      WINDOW_RETURN_VAL = null;
    }
  },
});

//1アニメ開始(visible trueのやつだけアニメ移動)
//2アニメ終了時に以下の関数を呼ぶ
function G_MOUNT_ITEM_DISP_INIT(playerMountList,mountImageList){ //惑星の初期表示
  for (var i = 0; i < 5; i++) {
    if(isset(mountImageList[i]) && mountImageList[i] != null) mountImageList[i].remove();
  }
  if(MASTER_DATA_MOUNT_MASTER == null || MASTER_DATA_MOUNT_MASTER.length == 0) return false;
  var maxIndex = (MASTER_DATA_MOUNT_MASTER.length - 1);

  if(MOUNT_SELECT_ITEM_INDEX < 0) MOUNT_SELECT_ITEM_INDEX = maxIndex;
  if(maxIndex < MOUNT_SELECT_ITEM_INDEX) MOUNT_SELECT_ITEM_INDEX = 0;
  var mountData = MASTER_DATA_MOUNT_MASTER[MOUNT_SELECT_ITEM_INDEX];
  mountImageList[2] = G_ASSET_GET_SPRITE_ANIM("mount_icon_anim_" + mountData['mount_asset_id'],15); //マウントのアセットタグを指定
  mountImageList[2].addChildTo(MOUNT_ITEM_LAYER);
  mountImageList[2].y = mountImageList[2].y - (mountImageList[2].height / 3);
  mountImageList[2].setScale(0.6,0.6);
  mountImageList[2]['index'] = 2;
  mountImageList[2]['user_mount_data'] = null;
  mountImageList[2]['mount_master_data'] = mountData;
  mountImageList[2].visible = true;
  //ユーザーが開放済みのマウントかチェックして、あればデータを追加
  for (var i = 0; i < playerMountList.length; i++) {
    if(playerMountList[i]['mount_id'] == mountImageList[2]['mount_master_data']['mount_id']){ //所持しているマウントだった
      mountImageList[2]['user_mount_data'] = playerMountList[i];
      break;
    }
  }
  MOUNT_SELECT_MOUNT_DATA['user_mount_data'] = mountImageList[2]['user_mount_data'];
  MOUNT_SELECT_MOUNT_DATA['mount_master_data'] = mountImageList[2]['mount_master_data'];

  G_MOUNT_CONTROLE_PANEL_UPDATE(mountImageList[2]); //選択中のマウントコントロールパネルを更新

  var right1Index = MOUNT_SELECT_ITEM_INDEX + 1;
  if(maxIndex < right1Index) right1Index = 0;
  mountData = MASTER_DATA_MOUNT_MASTER[right1Index];
  mountImageList[3] = G_ASSET_GET_SPRITE_ANIM("mount_icon_anim_" + mountData['mount_asset_id'],15); //マウントのアセットタグを指定
  mountImageList[3].addChildTo(MOUNT_ITEM_LAYER);
  mountImageList[3].y = mountImageList[3].y - (mountImageList[3].height / 2);
  mountImageList[3].x = mountImageList[3].x + (mountImageList[3].width / 2);
  mountImageList[3].setScale(0.3,0.3);
  mountImageList[3]['index'] = 3;
  mountImageList[3]['user_mount_data'] = null;
  mountImageList[3]['mount_master_data'] = mountData;
  mountImageList[3].visible = true;
  //ユーザーが開放済みのマウントかチェックして、あればデータを追加
  for (var i = 0; i < playerMountList.length; i++) {
    if(playerMountList[i]['mount_id'] == mountImageList[3]['mount_master_data']['mount_id']){ //所持しているマウントだった
      mountImageList[3]['user_mount_data'] = playerMountList[i];
      break;
    }
  }

  var right2Index = MOUNT_SELECT_ITEM_INDEX + 2;
  if((maxIndex + 1) < right2Index){
    if(maxIndex < 1) right2Index = 0;
    else right2Index = 1;
  }
  else if(maxIndex < right2Index) right2Index = 0;
  mountData = MASTER_DATA_MOUNT_MASTER[right2Index];
  mountImageList[4] = G_ASSET_GET_SPRITE_ANIM("mount_icon_anim_" + mountData['mount_asset_id'],15); //マウントのアセットタグを指定
  mountImageList[4].addChildTo(MOUNT_ITEM_LAYER);
  mountImageList[4].y = mountImageList[3].y;
  mountImageList[4].y = mountImageList[4].y - (mountImageList[4].height / 2);
  mountImageList[4].x = mountImageList[3].x;
  mountImageList[4].x = mountImageList[4].x + (mountImageList[4].width / 2);
  mountImageList[4].setScale(0.3,0.3);
  mountImageList[4]['index'] = 4;
  mountImageList[4]['user_mount_data'] = null;
  mountImageList[4]['mount_master_data'] = mountData;
  mountImageList[4].visible = true;
  //ユーザーが開放済みのマウントかチェックして、あればデータを追加
  for (var i = 0; i < playerMountList.length; i++) {
    if(playerMountList[i]['mount_id'] == mountImageList[4]['mount_master_data']['mount_id']){ //所持しているマウントだった
      mountImageList[4]['user_mount_data'] = playerMountList[i];
      break;
    }
  }

  var left1Index = MOUNT_SELECT_ITEM_INDEX - 1;
  if(left1Index < 0) left1Index = maxIndex;
  mountData = MASTER_DATA_MOUNT_MASTER[left1Index];
  mountImageList[1] = G_ASSET_GET_SPRITE_ANIM("mount_icon_anim_" + mountData['mount_asset_id'],15); //マウントのアセットタグを指定
  mountImageList[1].addChildTo(MOUNT_ITEM_LAYER);
  mountImageList[1].y = mountImageList[1].y - (mountImageList[1].height / 2);
  mountImageList[1].x = mountImageList[1].x - (mountImageList[1].width / 2);
  mountImageList[1].setScale(0.3,0.3);
  mountImageList[1]['index'] = 1;
  mountImageList[1]['user_mount_data'] = null;
  mountImageList[1]['mount_master_data'] = mountData;
  mountImageList[1].visible = true;
  //ユーザーが開放済みのマウントかチェックして、あればデータを追加
  for (var i = 0; i < playerMountList.length; i++) {
    if(playerMountList[i]['mount_id'] == mountImageList[1]['mount_master_data']['mount_id']){ //所持しているマウントだった
      mountImageList[1]['user_mount_data'] = playerMountList[i];
      break;
    }
  }

  var left2Index = MOUNT_SELECT_ITEM_INDEX - 2;
  if(left2Index < 0) left2Index = maxIndex - 1;
  if(left2Index < 0) left2Index = maxIndex;
  mountData = MASTER_DATA_MOUNT_MASTER[left2Index];
  mountImageList[0] = G_ASSET_GET_SPRITE_ANIM("mount_icon_anim_" + mountData['mount_asset_id'],15); //マウントのアセットタグを指定
  mountImageList[0].addChildTo(MOUNT_ITEM_LAYER);
  mountImageList[0].y = mountImageList[1].y;
  mountImageList[0].y = mountImageList[0].y - (mountImageList[0].height / 2);
  mountImageList[0].x = mountImageList[1].x;
  mountImageList[0].x = mountImageList[1].x - (mountImageList[0].width / 2);
  mountImageList[0].setScale(0.3,0.3);
  mountImageList[0]['index'] = 0;
  mountImageList[0]['user_mount_data'] = null;
  mountImageList[0]['mount_master_data'] = mountData;
  mountImageList[0].visible = true;
  //ユーザーが開放済みのマウントかチェックして、あればデータを追加
  for (var i = 0; i < playerMountList.length; i++) {
    if(playerMountList[i]['mount_id'] == mountImageList[0]['mount_master_data']['mount_id']){ //所持しているマウントだった
      mountImageList[0]['user_mount_data'] = playerMountList[i];
      break;
    }
  }
  return true;
}

function G_MOUNT_ITEM_CHANGE_ANIM_START(direction,playerMountList,planetImageList){ //惑星変更アニメーションを開始 direction 1:左 2:右
  MOUNT_ITEM_ANIM_FLAG = true;
  console.log(direction);
  var movePosY = 0;
  var movePosX = planetImageList[0].width / 2;
  if(direction == 2) movePosX = movePosX * -1;
  for (var i = 0; i < planetImageList.length; i++) {
    var planetScale = 1.0;
    if(direction == 1){
      if(i == 0){
        planetScale = 0.3;
        movePosY = planetImageList[0].height / 1;
      }
      if(i == 1){
        planetScale = 0.6;
        movePosY = planetImageList[1].height / 3;
      }
      if(i == 2){
        planetScale = 0.3;
        movePosY = -planetImageList[2].height / 2;
      }
      if(i == 3){
        planetScale = 0.3;
        movePosY = -planetImageList[3].height / 2;
      }
      if(i == 4) {
        planetScale = 0.3;
        movePosY = -planetImageList[4].height / 1;
      }
    }
    else if(direction == 2){
      if(i == 0){
        planetScale = 0.3;
        movePosY = -planetImageList[0].height / 1;
      }
      if(i == 1){
        planetScale = 0.3;
        movePosY = -planetImageList[1].height / 2;
      }
      if(i == 2){
        planetScale = 0.3;
        movePosY = -planetImageList[2].height / 2;
      }
      if(i == 3){
        planetScale = 0.6;
        movePosY = planetImageList[3].height / 3;
      }
      if(i == 4){
        planetScale = 0.3;
        movePosY = planetImageList[4].height / 1;
      }
    }

    planetImageList[i].tweener.to({
      x: (planetImageList[i].x + movePosX), y: (planetImageList[i].y + (movePosY / 2)),
      scaleX: planetScale,
      scaleY: planetScale,
    }, 500).play();
    planetImageList[i].tweener.call(function(){
      if(this.target['index'] == (planetImageList.length - 1)){
        G_MOUNT_ITEM_DISP_INIT(playerMountList,planetImageList);
        MOUNT_ITEM_ANIM_FLAG = false;
      }
      this.target.remove();
      this.target = null;
    });
  }
}

function G_MOUNT_CONTROLE_PANEL_UPDATE(mountImageData){ //現在選択中のマウントのコントロールパネルを更新
  if(mountImageData != null && isset(mountImageData['user_mount_data']) && isset(mountImageData['mount_master_data'])){
    console.log(mountImageData['user_mount_data']);
    console.log(mountImageData['mount_master_data']['mount_name']);
    var btnStatusId = 0; //0:見解放 1:解放済み未購入 2:解放済み購入済み
    var openFlagCheck = false;
    if(MOUNT_PLAYER_OPEN_FLAG != null && Array.isArray(MOUNT_PLAYER_OPEN_FLAG)){
      for (var i = 0; i < MOUNT_PLAYER_OPEN_FLAG.length; i++) {
        if(MOUNT_PLAYER_OPEN_FLAG[i]['open_flag_id'] == mountImageData['mount_master_data']['open_flag_id']){ //解放フラグIDが一致
          openFlagCheck = true;
        }
      }
    }

    if(openFlagCheck == true){
      btnStatusId = 1;
      if(MOUNT_PLAYER_MOUNT_DATAS != null){
        for (var i = 0; i < MOUNT_PLAYER_MOUNT_DATAS.length; i++) {
          //解放済みで所持済みの場合、ボタンステータスを変更
          if(MOUNT_PLAYER_MOUNT_DATAS[i]['mount_id'] == mountImageData['mount_master_data']['mount_id']){
            btnStatusId = 2;
            break;
          }
        }
      }
    }

    MOUNT_CHARGE_BTN.alpha = 1.0;
    MOUNT_SELECT_MOUNT_BTN.alpha = 1.0;
    switch (btnStatusId) { //ボタンステータスにより、ボタンの挙動を変更
      case 0: //未解放
      {
        MOUNT_SELECT_MOUNT_BTN['label'].text = "未解放";
        MOUNT_CONTROLE_PANEL_MAIN_TEXT.text = "この機体は未解放です";
        MOUNT_CHARGE_BTN['btn']['btn_visible'] = false;
        MOUNT_CHARGE_BTN['btn']['fuel_max_flag'] = false;
        MOUNT_CHARGE_BTN.visible = false;
      }
      break;
      case 1:　//解放、未購入
      {
        MOUNT_SELECT_MOUNT_BTN['label'].text = "購入";
        var price = mountImageData['mount_master_data']['price'];
        var priceItemName = G_HELPER_GET_ITEM_UNIT_TEXT(mountImageData['mount_master_data']['price_item_id']);
        var playerItemVal = 0;
        if(MOUNT_PLAYER_ITEM_DATAS != null){
          for (var i = 0; i < MOUNT_PLAYER_ITEM_DATAS.length; i++) {
            if(MOUNT_PLAYER_ITEM_DATAS[i]['item_id'] == mountImageData['mount_master_data']['price_item_id']){
              playerItemVal = MOUNT_PLAYER_ITEM_DATAS[i]['item_val'];
              break;
            }
          }
        }
        MOUNT_CONTROLE_PANEL_MAIN_TEXT.text = "価格：" + price + priceItemName + "\n所持数：" + playerItemVal;
        MOUNT_CHARGE_BTN['btn']['btn_visible'] = false;
        MOUNT_CHARGE_BTN['btn']['fuel_max_flag'] = false;
        MOUNT_CHARGE_BTN.visible = false;
      }
      break;
      case 2: //解放、購入済み
      {
        MOUNT_SELECT_MOUNT_BTN['label'].text = "選択";
        for (var i = 0; i < MOUNT_PLAYER_MOUNT_DATAS.length; i++) {
          if(MOUNT_PLAYER_MOUNT_DATAS[i]['visible'] == 1 && MOUNT_PLAYER_MOUNT_DATAS[i]['mount_id'] == mountImageData['mount_master_data']['mount_id']){
            //選択済みの場合はボタンを半透明にする
            MOUNT_SELECT_MOUNT_BTN.alpha = 0.5;
          }
        }
        if(mountImageData['user_mount_data'] != null){
          MOUNT_CONTROLE_PANEL_MAIN_TEXT.text = "燃料:" + mountImageData['user_mount_data']['fuel'] + "/" + mountImageData['mount_master_data']['max_fuel'];
          MOUNT_CHARGE_BTN['btn']['btn_visible'] = true;
          MOUNT_CHARGE_BTN['btn']['fuel_max_flag'] = false;
          MOUNT_CHARGE_BTN.visible = true;
          if(parseInt(mountImageData['mount_master_data']['max_fuel']) <= parseInt(mountImageData['user_mount_data']['fuel'])){ //燃料が満タンな場合、補充ボタンを半透明にする。
            MOUNT_CHARGE_BTN.alpha = 0.5;
            MOUNT_CHARGE_BTN['btn']['fuel_max_flag'] = true;
          }
        }
      }
      break;
      default:
      break;
    }
    if(btnStatusId != 0){ //機体のステータスバー、ステータスラベルを更新
      MOUNT_STATSU_GAUGE_ATK.alpha = 1.0;
      var atkValue = parseInt(mountImageData['mount_master_data']['status_atk']);
      if(100 < atkValue) atkValue = 100;
      MOUNT_STATSU_GAUGE_ATK.value = atkValue;
      MOUNT_STATSU_GAUGE_HP.alpha = 1.0;
      var hpValue = parseInt(mountImageData['mount_master_data']['status_hp']);
      if(100 < hpValue) hpValue = 100;
      MOUNT_STATSU_GAUGE_HP.value = hpValue;
      MOUNT_STATSU_GAUGE_CONTROLE.alpha = 1.0;
      var controleValue = parseInt(mountImageData['mount_master_data']['status_controle']);
      if(100 < controleValue) controleValue = 100;
      MOUNT_STATSU_GAUGE_CONTROLE.value = controleValue;

      var mountName = mountImageData['mount_master_data']['mount_name'];
      var mountType = "???";
      switch (parseInt(mountImageData['mount_master_data']['mount_type'])) {
        case 1: //地上
        mountType = "地上";
        break;
        case 2: //空中
        mountType = "空中";
        break;
        case 3: //宇宙
        mountType = "宇宙";
        break;
        default:
        break;
      }
      var mainWeapon = "???";
      if(MASTER_DATA_MOUNT_WEAPON_MASTER != null){
        for (var i = 0; i < MASTER_DATA_MOUNT_WEAPON_MASTER.length; i++) {
          if(MASTER_DATA_MOUNT_WEAPON_MASTER[i]['mount_weapon_id'] == mountImageData['mount_master_data']['weapon_id']){
            mainWeapon = MASTER_DATA_MOUNT_WEAPON_MASTER[i]['mount_weapon_name'];
            break;
          }
        }
      }
      var bombWeapon = "???";
      if(MASTER_DATA_MOUNT_BOMB_MASTER != null){
        for (var i = 0; i < MASTER_DATA_MOUNT_BOMB_MASTER.length; i++) {
          if(MASTER_DATA_MOUNT_BOMB_MASTER[i]['mount_bomb_id'] == mountImageData['mount_master_data']['bomb_id']){
            bombWeapon = MASTER_DATA_MOUNT_BOMB_MASTER[i]['mount_bomb_name'];
            break;
          }
        }
      }

      MOUNT_STATSU_LABEL.text = "マウント名:" + mountName + "\n マウントタイプ:" + mountType + " \n メインウェポン:" + mainWeapon + "\n サブウェポン:" + bombWeapon;
    }
    else{ //未解放時は0%で半透明
      MOUNT_STATSU_GAUGE_ATK.alpha = 0.5;
      MOUNT_STATSU_GAUGE_ATK.value = 0;
      MOUNT_STATSU_GAUGE_HP.alpha = 0.5;
      MOUNT_STATSU_GAUGE_HP.value = 0;
      MOUNT_STATSU_GAUGE_CONTROLE.alpha = 0.5;
      MOUNT_STATSU_GAUGE_CONTROLE.value = 0;
      MOUNT_STATSU_LABEL.text = "マウント名:???\n マウントタイプ:??? \n メインウェポン:???\n サブウェポン:???";
    }
    MOUNT_SELECT_MOUNT_BTN['btn']['btn_status_id'] = btnStatusId; //ボタンステータスを更新
  }
}

function G_MOUNT_CREATE_CHARGE_FUEL_WINDOW(parentBase,selectMountData){ //マウント燃料補給ウィンドウを
  MOUNT_USE_CHARGE_FUEL_NUM = 0; //消費燃料数を初期化
  if(isset(selectMountData['mount_master_data']) && selectMountData['mount_master_data'] != null
  && isset(selectMountData['user_mount_data']) && selectMountData['user_mount_data'] != null){ //有効なマウントデータか
    MOUNT_FUEL_CHARGE_WINDOW = Sprite('ASSET_64').addChildTo(parentBase);//マスクを表示
    MOUNT_FUEL_CHARGE_WINDOW['window_sprite'] = Sprite('ASSET_62').addChildTo(MOUNT_FUEL_CHARGE_WINDOW);
    MOUNT_FUEL_CHARGE_WINDOW['title_label'] = Label({
      text: "燃料の補充",
      fontSize: 36,
      fill: 'white',
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['title_label'].y = parentBase.y * -0.27;

    //燃料ゲージ
    MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'] = Gauge({ //敵勢力ゲージを表示
      x: 0, y: 0,// x,y座標
      width: 432,            // 横サイズ
      height: 30,            // 縦サイズ
      maxValue: 100,         // ゲージ最大値
      value: 0,         // ゲージ初期値
      fill: 'white',         // 後ろの色
      gaugeColor: 'red', // ゲージ色
      stroke: 'blue',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);

    //メインテキスト
    MOUNT_FUEL_CHARGE_WINDOW['main_text_label'] = Label({
      text: "使用するアイテム[？？？]所持数:？？？",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].y = MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].y;
    MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].y = MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].y - (MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].height * 1.5);
    MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] = 0;

    //決定ボタン
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn'] = Sprite('ASSET_63').addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].y = MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].y;
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].y = MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].y + (MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].height * 1.5);
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].x = MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].x - (MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].width * 0.5);
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn']['btn'] = Button({
     text: '',
     width: 256,         // 横サイズ
     height: 64,        // 縦サイズ
     alpha: 0,
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['yes_btn']);
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn']['btn'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(MOUNT_USE_CHARGE_FUEL_NUM != 0){ //消費燃料が設定されている
        G_MOUNT_DELETE_CHARGE_FUEL_WINDOW();
        var postParam = new Object();
        postParam['use_charge_fuel_num'] = MOUNT_USE_CHARGE_FUEL_NUM;
        postParam['mount_id'] = MOUNT_SELECT_MOUNT_DATA['user_mount_data']['mount_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/mount/mount.php",postParam); //非同期通信開始
      }
    };
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn']['btn'].visible = false;
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn']['btn_label'] = Label({
      text: "決定",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['yes_btn']);
    MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].alpha = 0.5;

    //キャンセルボタン
    MOUNT_FUEL_CHARGE_WINDOW['no_btn'] = Sprite('ASSET_63').addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['no_btn'].y = MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].y;
    MOUNT_FUEL_CHARGE_WINDOW['no_btn'].y = MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].y;
    MOUNT_FUEL_CHARGE_WINDOW['no_btn'].x = MOUNT_FUEL_CHARGE_WINDOW['no_btn'].x + (MOUNT_FUEL_CHARGE_WINDOW['no_btn'].width * 0.5);
    MOUNT_FUEL_CHARGE_WINDOW['no_btn']['btn'] = Button({
     text: '',
     width: 256,         // 横サイズ
     height: 64,        // 縦サイズ
     alpha: 0,
   }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['no_btn']);
    MOUNT_FUEL_CHARGE_WINDOW['no_btn']['btn'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      G_MOUNT_DELETE_CHARGE_FUEL_WINDOW();
    };
    MOUNT_FUEL_CHARGE_WINDOW['no_btn']['btn'].visible = false;
    MOUNT_FUEL_CHARGE_WINDOW['no_btn']['btn_label'] = Label({
      text: "キャンセル",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['no_btn']);

    //補給前燃料→補給後燃料表示ラベル
    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'] = Label({
      text: "燃料 ??? → ??? (最大:???)",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'].y = MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].y;
    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'].y = MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'].y + (MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].height * 1.5);
    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_befor'] = 0;
    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] = 0;

    //←ボタン
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'] = Sprite('ASSET_462').addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'].x = MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'].x - ((MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].width / 2) + (MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'].width / 1.5));
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn'] = Button({
     text: '',
     width: 64,         // 横サイズ
     height: 64,        // 縦サイズ
   }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']);
   MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn']['stay_count'] = 0;
   MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn'].onpointstart = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
     G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(false);
   };
   MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn'].onpointstay = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
     this['stay_count'] ++;
     if(50 <= this['stay_count']){
        for(var i=0; i < 100; i++){
          if(G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(false) == false) break;
          console.log("連続" + i);
        }
     }
     else if(25 <= this['stay_count']){
       for(var i=0; i < 10; i++){
         if(G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(false) == false) break;
         console.log("連続" + i);
       }
     }
     else {
       G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(false);
     }
     console.log("stay_count:" + this['stay_count']);
   };
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      this['stay_count'] = 0;
    };
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left']['btn'].visible = false;

    //→ボタン
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'] = Sprite('ASSET_462').addChildTo(MOUNT_FUEL_CHARGE_WINDOW['window_sprite']);
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'].x = MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'].x + ((MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].width / 2) + (MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'].width / 1.5));
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'].scaleX *= -1;
    MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn'] = Button({
    text: '',
    width: 64,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']);
  MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn']['stay_count'] = 0;
  MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn'].onpointstart = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(true);
  };
  MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn'].onpointstay = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    this['stay_count'] ++;
    if(50 <= this['stay_count']){
      for(var i=0; i < 100; i++){
        if(G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(true) == false) break;
        console.log("連続" + i);
      }
    }
    else if(25 <= this['stay_count']){
      for(var i=0; i < 10; i++){
        if(G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(true) == false) break;
        console.log("連続" + i);
      }
    }
    else {
      G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(true);
    }
    console.log("stay_count:" + this['stay_count']);
  };
   MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
     this['stay_count'] = 0;
   };
   MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right']['btn'].visible = false;
  }

  //データ反映処理
  //燃料アイテム名を取得
  var itemMasterDatas = MASTER_DATA_ITEM_MASTER;
  if(itemMasterDatas != null){
    for (var i = 0; i < itemMasterDatas.length; i++) {
      if(itemMasterDatas[i]['id'] == selectMountData['mount_master_data']['fuel_item_id']){ //燃料アイテムと一致
        var fuelItemName = itemMasterDatas[i]['item_name'];
        var playerItemNum = 0;
        if(MOUNT_PLAYER_ITEM_DATAS != null){
          console.log("i2");
          for (var ui = 0; ui < MOUNT_PLAYER_ITEM_DATAS.length; ui++) {
            if(MOUNT_PLAYER_ITEM_DATAS[ui]['item_id'] == itemMasterDatas[i]['id']){
              playerItemNum = MOUNT_PLAYER_ITEM_DATAS[ui]['item_val'];
            }
          }
        }
        MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].text = "使用するアイテム["+ fuelItemName +"]所持数:" + playerItemNum;
        MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_name'] = fuelItemName;
        MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] = parseInt(playerItemNum);
        break;
      }
    }
  }
  //マウントの燃料を取得
  var mountFuelBefor = selectMountData['user_mount_data']['fuel'];
  var mountFuelMax = selectMountData['mount_master_data']['max_fuel'];
  MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_befor'] = parseInt(mountFuelBefor);
  MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] = parseInt(mountFuelBefor);
  MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_max'] = parseInt(mountFuelMax);
  MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'].text = "燃料 " + mountFuelBefor + " → " + mountFuelBefor + " (最大:" + mountFuelMax + ")";

  //ゲージの初期値を設定
  var gaugeInitValue = ((MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_befor'] / MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_max']) * 100);
  MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].value = gaugeInitValue;

}

function G_MOUNT_DELETE_CHARGE_FUEL_WINDOW(){ //マウント燃料補給ウィンドウを削除する。
  if(MOUNT_FUEL_CHARGE_WINDOW != null){
    if(isset(MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'])){
      MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'].remove();
      MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_right'] = null;
    }
    if(isset(MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'])){
      MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'].remove();
      MOUNT_FUEL_CHARGE_WINDOW['arrow_btn_left'] = null;
    }
    if(isset(MOUNT_FUEL_CHARGE_WINDOW['no_btn'])){
      MOUNT_FUEL_CHARGE_WINDOW['no_btn'].remove();
      MOUNT_FUEL_CHARGE_WINDOW['no_btn'] = null;
    }
    if(isset(MOUNT_FUEL_CHARGE_WINDOW['yes_btn'])){
      MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].remove();
      MOUNT_FUEL_CHARGE_WINDOW['yes_btn'] = null;
    }
    if(isset(MOUNT_FUEL_CHARGE_WINDOW['window_sprite'])){
      MOUNT_FUEL_CHARGE_WINDOW['window_sprite'].remove();
      MOUNT_FUEL_CHARGE_WINDOW['window_sprite'] = null;
    }


    MOUNT_FUEL_CHARGE_WINDOW.remove();
    MOUNT_FUEL_CHARGE_WINDOW = null;
  }
}

function G_MOUNT_UPDATE_GAUGE_FUEL_WINDOW(upOrDown){ //燃料が変更された際呼ばれる関数 upOrDown true up false down
  if(MOUNT_FUEL_CHARGE_WINDOW != null && isset(MOUNT_FUEL_CHARGE_WINDOW['main_text_label']) && isset(MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']) && isset(MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'])){
    //所持燃料以上の燃料をチャージしようとした場合
    if(upOrDown == true && MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] <= 0) return false;
    //最大蓄積燃料を超えてしまう場合
    if(upOrDown == true && MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_max'] <= MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after']) return false;
    //現在の燃料を下回る場合
    if(upOrDown == false && MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] <= MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_befor']) return false;
    //燃料が0以下で減らそうとした場合
    if(upOrDown == false && MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] <= 0) return false;

    if(upOrDown == true){
      MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] = MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] + 1;
      MOUNT_USE_CHARGE_FUEL_NUM = MOUNT_USE_CHARGE_FUEL_NUM + 1;
      MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] = MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] - 1;
      MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].text = "使用するアイテム["+ MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_name'] +"]所持数:" + MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'];
    }
    else{
      MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] = MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] - 1;
      MOUNT_USE_CHARGE_FUEL_NUM = MOUNT_USE_CHARGE_FUEL_NUM - 1;
      MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] = MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'] + 1;
      MOUNT_FUEL_CHARGE_WINDOW['main_text_label'].text = "使用するアイテム["+ MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_name'] +"]所持数:" + MOUNT_FUEL_CHARGE_WINDOW['main_text_label']['item_val'];
    }

    //ゲージのパーセンテージを更新
    var updateFuelVal = ((MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after'] / MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_max']) * 100);
    MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].value = updateFuelVal;
    console.log(MOUNT_FUEL_CHARGE_WINDOW['fuel_gauge'].value);
    console.log(MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after']);

    MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label'].text = "燃料 "
    + MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_befor']
    + " → " + MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_after']
    + " (最大:" + MOUNT_FUEL_CHARGE_WINDOW['fuel_change_label']['mount_fuel_max'] + ")";

    //決定ボタンが有効か。
    if(MOUNT_USE_CHARGE_FUEL_NUM == 0) MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].alpha = 0.5;
    else MOUNT_FUEL_CHARGE_WINDOW['yes_btn'].alpha = 1;

    return true;
  }
  else{
    return false;
  }
}
