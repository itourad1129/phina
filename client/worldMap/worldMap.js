//============================================
//  ワールドマップシーン
//============================================
//パブリック変数定義
var WORLD_MAP_SCENE_INSTANCE = null;//ワールドマップのシーンインスタンス
var WORLD_MAP_SCENE_BASE = null; //ワールドマップの親
var WORLD_MAP_UI_LAYER = null; //UIレイヤー
var WORLD_MAP_WINDOW_LAYER = null; //ウィンドウ表示用レイヤー
var WORLD_MAP_PLANET_LAYER = null; //惑星表示レイヤー
var WORLD_MAP_SWIPE_START_POS = 0; //スワイプスタート位置
var WORLD_MAP_SWIPE_MOVE_POS = 0; //スワイプ中の位置
var WORLD_MAP_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
var WORLD_MAP_SELECT_PLANET_INDEX = 0; //選択中の惑星のindex
var WORLD_MAP_PLANET_IMAGE_LIST = new Array(); //惑星のイメージリスト
var WORLD_MAP_PLANET_ANIM_FLAG = false; //惑星選択のアニメーション中か
var WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE = null; //プレイヤーの現在居るエリア(ワールドのマスターデータを含む)
var WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE_ALL = null; //プレイヤーの解放した全てのエリアインスタンス
var WORLD_MAP_SCENE_INIT_FLAG = -1; //シーンの初期通信が完了したか 1:通信前 2:通信完了 1:初期化処理完了
var WORLD_MAP_SELECT_AREA_LIST = new Array(); //選択中のエリアリスト
var WORLD_MAP_SELECT_MARKER_SPRITE = null; //選択中のマーカー
var WORLD_MAP_SELECT_PLANET_IMAGE = null; //選択中の惑星イメージ
var WORLD_MAP_MY_AREA_NAME_LABEL = null; //現在地のエリア名
var WORLD_MAP_MY_WORLD_NAME_LABEL = null; //現在地のワールぢ名
var WORLD_MAP_MOVE_AREA_NAME_LABEL = null; //移動先のエリア名
var WORLD_MAP_MOVE_WORLD_NAME_LABEL = null; //移動先のワールド名
var WORLD_MAP_MOVE_TIME_LABEL = null; //移動時間表示ラベル
var WORLD_MAP_MOVE_POINT = 0; //移動に必要な時間
var WORLD_MAP_MOVE_BUTTON = null; //移動ボタン
var WORLD_MAP_MOVE_CANCEL_BUTTON = null; //移動の取り消しボタン
var WORLD_MAP_SCENE_UPDATE_FLAG = 1; //シーンの更新フラグ
var WORLD_MAP_REPLACE_AREA_MASTER_DATAS = new Array(); //整形後のエリアマスターデータ
var WORLD_MAP_PLAYER_SELECT_MOUNT_DATA = null; //プレイヤーが選択中のマウント
var WORLD_MAP_PLANET_PLAYER_KARMA_EFFECT_DATAS = null; //プレイヤーのカルマエフェクトデータ
var WORLD_MAP_TRAVEL_START_BUTTON = null; //旅or探索開始ボタン
var WORLD_MAP_PVP_TRAVEL_BUTTON = null; //プレイヤー奇襲開始ボタン
var WORLD_MAP_STG_PLAYER_SEARCH_DATA = null; //プレイヤー索敵データ

phina.define("WorldMap", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "worldMap";
    //メンバー初期化
    WORLD_MAP_SCENE_INSTANCE = null;//ワールドマップのシーンインスタンス
    WORLD_MAP_UI_LAYER = null; //UIレイヤー
    WORLD_MAP_WINDOW_LAYER = null; //ウィンドウ表示用レイヤー
    WORLD_MAP_SCENE_BASE = null; //ワールドマップのベース
    WORLD_MAP_PLANET_LAYER = null; //惑星表示レイヤー
    WORLD_MAP_SWIPE_START_POS = 0; //スワイプスタート位置
    WORLD_MAP_SWIPE_MOVE_POS = 0; //スワイプ中の位置
    WORLD_MAP_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
    WORLD_MAP_SELECT_PLANET_INDEX = 0; //選択中の惑星のindex
    WORLD_MAP_PLANET_IMAGE_LIST = new Array(); //惑星のイメージリスト
    WORLD_MAP_PLANET_ANIM_FLAG = false; //惑星選択のアニメーション中か
    WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE = null; //プレイヤーの現在居るエリア(ワールドのマスターデータを含む)
    WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE_ALL = null; //プレイヤーの解放した全てのエリアインスタンス
    WORLD_MAP_SCENE_INIT_FLAG = -1; //シーンの初期通信が完了したか -1:通信前 0:通信完了 1:初期化処理完了
    WORLD_MAP_SELECT_AREA_LIST = new Array(); //選択中のエリアリスト
    WORLD_MAP_SELECT_PLANET_IMAGE = null; //選択中の惑星イメージ
    WORLD_MAP_MY_AREA_NAME_LABEL = null; //現在地のエリア名
    WORLD_MAP_MY_WORLD_NAME_LABEL = null; //現在地のワールぢ名
    WORLD_MAP_MOVE_AREA_NAME_LABEL = null; //移動先のエリア名
    WORLD_MAP_MOVE_WORLD_NAME_LABEL = null; //移動先のワールド名
    WORLD_MAP_MOVE_TIME_LABEL = null; //移動時間表示ラベル
    WORLD_MAP_MOVE_POINT = 0; //移動に必要な時間
    WORLD_MAP_MOVE_BUTTON = null; //移動ボタン
    WORLD_MAP_MOVE_CANCEL_BUTTON = null; //移動の取り消しボタン
    WORLD_MAP_SCENE_UPDATE_FLAG = 1; //シーンの更新フラグ
    WORLD_MAP_REPLACE_AREA_MASTER_DATAS = new Array(); //整形後のエリアマスターデータ
    WORLD_MAP_PLAYER_SELECT_MOUNT_DATA = null; //プレイヤーが選択中のマウント
    WORLD_MAP_PLANET_PLAYER_KARMA_EFFECT_DATAS = null; //プレイヤーのカルマエフェクトデータ
    WORLD_MAP_TRAVEL_START_BUTTON = null; //旅or探索開始ボタン
    WORLD_MAP_PVP_TRAVEL_BUTTON = null; //プレイヤー奇襲開始ボタン
    WORLD_MAP_STG_PLAYER_SEARCH_DATA = null; //プレイヤー索敵データ

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    WORLD_MAP_SCENE_INSTANCE = this;

    //エリアマスターデータの整形を行う
    if(MASTER_DATA_AREA_MASTER != null){
      for (var i = 0; i < MASTER_DATA_AREA_MASTER.length; i++) {
        if(MASTER_DATA_AREA_MASTER[i]['parent_world_id'] == 0 && MASTER_DATA_AREA_MASTER[i]['parent_area_id'] == ""){
          //サブエリアではなく、通常のエリアのため、挿入
          WORLD_MAP_REPLACE_AREA_MASTER_DATAS[WORLD_MAP_REPLACE_AREA_MASTER_DATAS.length] = MASTER_DATA_AREA_MASTER[i];
        }
      }
    }

    WORLD_MAP_SCENE_BASE = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //ウィンドウ表示レイヤー
    WORLD_MAP_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //惑星レイヤー
    WORLD_MAP_PLANET_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(WORLD_MAP_SCENE_BASE);
    //UIレイヤー
    WORLD_MAP_UI_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(WORLD_MAP_SCENE_BASE);
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(WORLD_MAP_UI_LAYER);
    //headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.y - ((SCREEN_HEIGHT / 2) - (headerSptite.height / 2));

    var headerLabel = Label({
      text: 'ワールドマップ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    //移動時間ラベル
    var moveTimeLabel = Label({
      text: '移動時間',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_UI_LAYER);
    moveTimeLabel.y = moveTimeLabel.y + (moveTimeLabel.height / 2);

    //移動時間表示背景
    var moveTimeBgImage = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
    moveTimeBgImage.setPosition(moveTimeLabel.x,moveTimeLabel.y);
    moveTimeBgImage.y = moveTimeBgImage.y + moveTimeBgImage.height;

    //移動時間の時間ラベル
    WORLD_MAP_MOVE_TIME_LABEL = Label({
      text: '00分',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(moveTimeBgImage);

    //移動ボタン
    WORLD_MAP_MOVE_BUTTON = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    WORLD_MAP_MOVE_BUTTON.setPosition(moveTimeBgImage.x,moveTimeBgImage.y);
    WORLD_MAP_MOVE_BUTTON.y = WORLD_MAP_MOVE_BUTTON.y + (moveTimeBgImage.height * 1.25);
    WORLD_MAP_MOVE_BUTTON['label'] = Label({
      text: '移動',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_MOVE_BUTTON);
    WORLD_MAP_MOVE_BUTTON['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(WORLD_MAP_MOVE_BUTTON);
    WORLD_MAP_MOVE_BUTTON['btn']['active_flag'] = true;
    WORLD_MAP_MOVE_BUTTON['btn']['area_open_flag'] = false;
    WORLD_MAP_MOVE_BUTTON['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(this['active_flag'] == false) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(this['area_open_flag'] == false){
        G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エリアを移動","未解放エリアのため、移動出来ません",2,"areaLockWindow");
        return;
      }
      G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エリアを移動","エリアの移動を開始します。到着まで\n" + WORLD_MAP_MOVE_POINT + "分で着きます。",1,"checkAreaMoveWindow");
    };
    WORLD_MAP_MOVE_BUTTON['btn'].visible = false;

    //移動の取り消しボタン
    WORLD_MAP_MOVE_CANCEL_BUTTON = Sprite('ASSET_35').addChildTo(WORLD_MAP_UI_LAYER);
    WORLD_MAP_MOVE_CANCEL_BUTTON.setPosition(WORLD_MAP_MOVE_BUTTON.x,WORLD_MAP_MOVE_BUTTON.y);
    WORLD_MAP_MOVE_CANCEL_BUTTON['label'] = Label({
      text: '移動の取消し',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_MOVE_CANCEL_BUTTON);
    WORLD_MAP_MOVE_CANCEL_BUTTON['btn'] = Button({
      width: 320,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(WORLD_MAP_MOVE_CANCEL_BUTTON);
    WORLD_MAP_MOVE_CANCEL_BUTTON['btn']['active_flag'] = false;
    WORLD_MAP_MOVE_CANCEL_BUTTON['btn'].onpointend = function(e){
      if(this['active_flag'] == false) return;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"移動の取消し","移動を取消します。\nよろしいですか？",1,"checkAreaMoveCancelWindow");
    };
    WORLD_MAP_MOVE_CANCEL_BUTTON['btn'].visible = false;
    WORLD_MAP_MOVE_CANCEL_BUTTON.visible = false;

    //選択変更ボタン←前
    var selectChangeBtnPrev = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    selectChangeBtnPrev.setPosition(WORLD_MAP_MOVE_BUTTON.x,WORLD_MAP_MOVE_BUTTON.y);
    selectChangeBtnPrev.x = selectChangeBtnPrev.x - (selectChangeBtnPrev.width * 1.5);
    selectChangeBtnPrev['label'] = Label({
      text: '←前',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(selectChangeBtnPrev);
    selectChangeBtnPrev['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(selectChangeBtnPrev);
    selectChangeBtnPrev['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      G_WORLD_MAP_MARKER_ANIM_INIT(WORLD_MAP_SELECT_PLANET_IMAGE,WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,2);
      G_WORLD_MAP_POS_NAME_LABEL_INIT(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,WORLD_MAP_SELECT_MARKER_SPRITE);
    };
    selectChangeBtnPrev['btn'].visible = false;

    //選択変更ボタン次→
    var selectChangeBtnNext = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    selectChangeBtnNext.setPosition(WORLD_MAP_MOVE_BUTTON.x,WORLD_MAP_MOVE_BUTTON.y);
    selectChangeBtnNext.x = selectChangeBtnNext.x + (selectChangeBtnNext.width * 1.5);
    selectChangeBtnNext['label'] = Label({
      text: '次→',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(selectChangeBtnNext);
    selectChangeBtnNext['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(selectChangeBtnNext);
    selectChangeBtnNext['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      G_WORLD_MAP_MARKER_ANIM_INIT(WORLD_MAP_SELECT_PLANET_IMAGE,WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,1);
      G_WORLD_MAP_POS_NAME_LABEL_INIT(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,WORLD_MAP_SELECT_MARKER_SPRITE);
    };
    selectChangeBtnNext['btn'].visible = false;

    //現在地のエリア名表示背景
    var myAreaNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
    myAreaNameDispBg.width = myAreaNameDispBg.width * 0.9;
    myAreaNameDispBg.height = myAreaNameDispBg.height * 0.9;
    myAreaNameDispBg.y = myAreaNameDispBg.y + ((SCREEN_HEIGHT / 2) - (myAreaNameDispBg.height / 2));
    myAreaNameDispBg.x = myAreaNameDispBg.x - ((SCREEN_WIDTH / 2) - (myAreaNameDispBg.width / 2));

    //現在地のエリア名ラベル
    WORLD_MAP_MY_AREA_NAME_LABEL = Label({
      text: '・・・',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(myAreaNameDispBg);

    //移動先のエリア名表示背景
    var moveAreaNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
    moveAreaNameDispBg.width = moveAreaNameDispBg.width * 0.9;
    moveAreaNameDispBg.height = moveAreaNameDispBg.height * 0.9;
    moveAreaNameDispBg.y = myAreaNameDispBg.y
    moveAreaNameDispBg.x = moveAreaNameDispBg.x + ((SCREEN_WIDTH / 2) - (moveAreaNameDispBg.width / 2));

    //移動先のエリア名ラベル
    WORLD_MAP_MOVE_AREA_NAME_LABEL = Label({
      text: '・・・',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(moveAreaNameDispBg);

    //黄色三角(左)
    var yellowTriangleLeft = Sprite('ASSET_415').addChildTo(WORLD_MAP_UI_LAYER);
    yellowTriangleLeft.setPosition(myAreaNameDispBg.x,myAreaNameDispBg.y);
    yellowTriangleLeft.y = yellowTriangleLeft.y - (myAreaNameDispBg.height * 1.1);

    //黄色三角(右)
    var yellowTriangleRight = Sprite('ASSET_415').addChildTo(WORLD_MAP_UI_LAYER);
    yellowTriangleRight.setPosition(moveAreaNameDispBg.x,moveAreaNameDispBg.y);
    yellowTriangleRight.y = yellowTriangleRight.y - (moveAreaNameDispBg.height * 1.1);

    //現在地のワールド名表示背景
    var myWorldNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
    myWorldNameDispBg.width = myWorldNameDispBg.width * 0.9;
    myWorldNameDispBg.height = myWorldNameDispBg.height * 0.9;
    myWorldNameDispBg.setPosition(yellowTriangleLeft.x,yellowTriangleLeft.y);
    myWorldNameDispBg.y = myWorldNameDispBg.y - (myWorldNameDispBg.height * 1.1);

    //現在地のワールド名ラベル
    WORLD_MAP_MY_WORLD_NAME_LABEL = Label({
      text: '・・・',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(myWorldNameDispBg);

    //移動先のワールド名表示背景
    var moveWorldNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
    moveWorldNameDispBg.width = moveWorldNameDispBg.width * 0.9;
    moveWorldNameDispBg.height = moveWorldNameDispBg.height * 0.9;
    moveWorldNameDispBg.setPosition(yellowTriangleRight.x,yellowTriangleRight.y);
    moveWorldNameDispBg.y = moveWorldNameDispBg.y - (moveWorldNameDispBg.height * 1.1);

    //移動先のワールド名ラベル
    WORLD_MAP_MOVE_WORLD_NAME_LABEL = Label({
      text: '・・・',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(moveWorldNameDispBg);

    //現在地ラベル
    var myPositionLabel = Label({
      text: '現在地',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_UI_LAYER);
    myPositionLabel.setPosition(myWorldNameDispBg.x,myWorldNameDispBg.y);
    myPositionLabel.y = myPositionLabel.y - myWorldNameDispBg.height * 1.1;

    //移動先ラベル
    var movePositionLabel = Label({
      text: '移動先',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_UI_LAYER);
    movePositionLabel.setPosition(moveWorldNameDispBg.x,moveWorldNameDispBg.y);
    movePositionLabel.y = movePositionLabel.y - moveWorldNameDispBg.height * 1.1;

    //惑星表示(テスト)
    var planetList = MASTER_DATA_WORLD_MASTER;
    //スワイプ領域
    var swipeAreaButton = Button({
      width: 640,         // 横サイズ
      height: 640,        // 縦サイズ
    }).addChildTo(WORLD_MAP_UI_LAYER);
    swipeAreaButton.y = swipeAreaButton.y - (swipeAreaButton.height / 2);
    swipeAreaButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
      WORLD_MAP_SWIPE_START_POS = e.pointer.x;
    };
    swipeAreaButton.onpointmove = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
      WORLD_MAP_SWIPE_MOVE_POS = e.pointer.x;
      var diffPos = WORLD_MAP_SWIPE_START_POS - WORLD_MAP_SWIPE_MOVE_POS;
      if(150 < diffPos) WORLD_MAP_SWIPE_CHECK = 1;
      if(diffPos < -150) WORLD_MAP_SWIPE_CHECK = 2;
    };
    swipeAreaButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
      WORLD_MAP_SWIPE_START_POS = 0;
      WORLD_MAP_SWIPE_MOVE_POS = 0;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(WORLD_MAP_SWIPE_CHECK != 0){
        if(WORLD_MAP_SWIPE_CHECK == 1){//左
          WORLD_MAP_SELECT_PLANET_INDEX ++;
          G_WORLD_MAP_PLANET_CHANGE_ANIM_START(2,planetList,WORLD_MAP_PLANET_IMAGE_LIST);
        }
        if(WORLD_MAP_SWIPE_CHECK == 2){//右
          WORLD_MAP_SELECT_PLANET_INDEX --;
          G_WORLD_MAP_PLANET_CHANGE_ANIM_START(1,planetList,WORLD_MAP_PLANET_IMAGE_LIST);
        }
        WORLD_MAP_SWIPE_CHECK = 0;
      }
    };
    swipeAreaButton.visible = false;

    //戻るボタン
    var backButton = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
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
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      var prevSceneName = SCENE_MANAGER['prev_scene'];
      SCENE_MANAGER['prev_scene'] = "worldMap";
      WORLD_MAP_SCENE_INSTANCE.exit("myPage");
    };
    backButton['btn'].visible = false;

    //探索or旅開始 ボタン
    WORLD_MAP_TRAVEL_START_BUTTON = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    WORLD_MAP_TRAVEL_START_BUTTON.y = backButton.y;
    WORLD_MAP_TRAVEL_START_BUTTON.x = WORLD_MAP_TRAVEL_START_BUTTON.x - ((SCREEN_WIDTH / 2) - (WORLD_MAP_TRAVEL_START_BUTTON.width / 2));
    WORLD_MAP_TRAVEL_START_BUTTON['label'] = Label({
      text: '探索を開始',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WORLD_MAP_TRAVEL_START_BUTTON);
    WORLD_MAP_TRAVEL_START_BUTTON['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(WORLD_MAP_TRAVEL_START_BUTTON);
    WORLD_MAP_TRAVEL_START_BUTTON['btn']['travel_flag'] = false;
    WORLD_MAP_TRAVEL_START_BUTTON['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE == null) return;
      if(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA != null){ //マウントが選択されているか。
        if(parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['use_fuel']) <= parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel'])){ //燃料が足りている。
          if(this['travel_flag'] == false){ //移動中ではない場合：探索を開始
            var nowFuel = WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel'];
            var afterFuel = parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel']) - parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['use_fuel']);
            var text = "探索を開始します\n消費される燃料\n" + nowFuel + " → " + afterFuel;
            G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"探索の開始",text,1,"startTravelSearchWindow");
          }
          else{ //移動中の場合：旅を開始
            var typeCheck = false;
            var nowWorldId = -1;
            var afterWorldId = -1;
            for (var i = 0; i < MASTER_DATA_AREA_MASTER.length; i++) {
              if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['area_id'] == MASTER_DATA_AREA_MASTER[i]['area_id']){
                nowWorldId = MASTER_DATA_AREA_MASTER[i]['world_id'];
              }
              if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['destination_area_id'] == MASTER_DATA_AREA_MASTER[i]['area_id']){
                afterWorldId = MASTER_DATA_AREA_MASTER[i]['world_id'];
              }
              if(nowWorldId != -1 && afterWorldId != -1) break;
            }

            if(nowWorldId == -1 || afterWorldId == -1){ //不正なエリアが選択されている。
              G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー","エリアデータの取得に失敗しました。",2,"errorTravelSelectAreaWindow");
              return;
            }

            if(nowWorldId != afterWorldId && parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['mount_type']) != 3){ //ワールド間の移動中に宇宙タイプ以外が選択されていた場合
              G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"旅の開始","ワールド間の旅には、「宇宙船」タイプの\nマウントを選択する必要があります。\nマウント画面に移動しますか？",1,"errorTravelSelectMountWindow");
              return;
            }
            var nowTimeStamp = moment().unix();
            console.log("時間表示");
            console.log(nowTimeStamp);
            var arrivalDateTimeStamp = moment(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['arrival_time']).unix();
            console.log(arrivalDateTimeStamp);

            var diffTimeStamp = parseInt(arrivalDateTimeStamp) - parseInt(nowTimeStamp);
            if(diffTimeStamp <= 0){ //既に到着時刻だった場合
              G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー","既に目的地に到着しています。",2,"errorArraivalTimeFinishWindow");
              return;
            }

            var resultArrivalDateTime = parseInt(arrivalDateTimeStamp) - (parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['skip_time']) * 60);
            console.log(resultArrivalDateTime);

            var nowFuel = WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel'];
            var afterFuel = parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel']) - parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['use_fuel']);

            var beforeDate = moment(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['arrival_time'], "YYYY-MM-DD HH:mm:ss"); // 第一引数：日時、第二引数：フォーマット形式
            var nowArraivalTime = beforeDate.format('YYYY年MM月DD日 HH:mm:ss');

            var parseDate = moment.unix(resultArrivalDateTime); //unix 指定でミリ秒を取り除く
            console.log(parseDate);
            var afterArrivalTime = parseDate.format('YYYY年MM月DD日 HH:mm:ss');
            var text = "旅を開始します\n消費される燃料:" + nowFuel + " → " + afterFuel + "\n移動時間(短縮前):" + nowArraivalTime + "\n↓\n移動時間(短縮後):" + afterArrivalTime;
            G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"旅の開始",text,1,"startTravelWindow");

          }
        }
        else{ //燃料不足
          var wndTitle = "探索の開始";
          if(this['travel_flag'] == true) wndTitle = "旅の開始";
          var wndText = "燃料が不足しています。\n必要な燃料:" + WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['use_fuel'] + "\n現在の燃料:" + WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel'] + "\n燃料補給のため、マウント画面に移動しますか?";
          G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,wndTitle,wndText,1,"errorUseFuelWindow");
        }
      }
      else{ //マウントが選択されていない。
        G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"旅の開始","使用可能なマウント、またはマウント\nタイプが選択されていません。\nマウント選択画面に移動しますか？",1,"errorStartTravelWindow");
      }
    };
    WORLD_MAP_TRAVEL_START_BUTTON['btn'].visible = false;

    //マウント画面移動ボタン
    var mountButton = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    mountButton.x = WORLD_MAP_TRAVEL_START_BUTTON.x;
    mountButton.y = WORLD_MAP_TRAVEL_START_BUTTON.y;
    mountButton.y = mountButton.y + mountButton.height;
    mountButton['label'] = Label({
      text: 'マウント',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(mountButton);
    mountButton['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(mountButton);
    mountButton['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      var postParamGotoMountScene = new Object();
      postParamGotoMountScene['go_to_mount_scene'] = 0;
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoMountScene); //非同期通信開始

      //var prevSceneName = SCENE_MANAGER['prev_scene'];
      //SCENE_MANAGER['prev_scene'] = "worldMap";
      //WORLD_MAP_SCENE_INSTANCE.exit("mount"); //マウント画面に移動
    };
    mountButton['btn'].visible = false;

    //プレイヤー奇襲ボタン
    WORLD_MAP_PVP_TRAVEL_BUTTON = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
    WORLD_MAP_PVP_TRAVEL_BUTTON.x = mountButton.x;
    WORLD_MAP_PVP_TRAVEL_BUTTON.y = mountButton.y
    WORLD_MAP_PVP_TRAVEL_BUTTON.y = WORLD_MAP_PVP_TRAVEL_BUTTON.y + WORLD_MAP_PVP_TRAVEL_BUTTON.height;
    WORLD_MAP_PVP_TRAVEL_BUTTON['label'] = Label({
      text: 'プレイヤー索敵',
      fontSize: 20,
      fill: 'white',
    }).addChildTo(WORLD_MAP_PVP_TRAVEL_BUTTON);
    WORLD_MAP_PVP_TRAVEL_BUTTON['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(WORLD_MAP_PVP_TRAVEL_BUTTON);
    WORLD_MAP_PVP_TRAVEL_BUTTON['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WORLD_MAP_SCENE_INIT_FLAG != 1) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(WORLD_MAP_PVP_TRAVEL_BUTTON.visible == false) return;
      if(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA == null){
        G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー","マウントデータの取得に失敗しました。",2,"errorGetMountDataWindow");
        return;
      }

      if(WORLD_MAP_STG_PLAYER_SEARCH_DATA != null){ //プレイヤー索敵中の場合
        //索敵キャンセル確認ウィンドウを表示
        G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"索敵のキャンセル","プレイヤーの索敵をキャンセルします。",1,"stgPlayerSearchCancelWnd");
      }
      else{
        //索敵開始確認ウィンドウを表示
        var useFuel = parseInt(parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['max_fuel']) / 10);
        var nowFuel = parseInt(WORLD_MAP_PLAYER_SELECT_MOUNT_DATA['fuel']);
        //燃料が足りている
        if(useFuel <= nowFuel){
          G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"プレイヤーの索敵を開始","プレイヤーの索敵を開始し、プレイヤーの\n所持している燃料やアイテムを奪いに行きます。\n消費する燃料：" + useFuel,1,"stgPlayerSearchStartWnd");
        }
        else{ //燃料不足
          G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"燃料不足","プレイヤーの索敵に必要\nな燃料が不足しています。\n必要な燃料：" + useFuel + "\n現在の燃料：" + nowFuel,2,"errorStgPlayerSearchFuelWnd");
        }
      }

    };
    WORLD_MAP_PVP_TRAVEL_BUTTON['btn'].visible = false;
    WORLD_MAP_PVP_TRAVEL_BUTTON.visible = false;



    //初期通信処理
    var postParam = new Object();
    postParam['world_map_init'] = 0;
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/worldMap/worldMap.php",postParam); //非同期通信開始
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
          if(isset(json['result_world_map_init'])){ //プレイヤーの現在居るエリアを取得
            var resultInit = json['result_world_map_init'];
            if(isset(resultInit['player_area_instance'])) WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE = resultInit['player_area_instance'];
            if(isset(resultInit['player_area_instance_all'])) WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE_ALL = resultInit['player_area_instance_all'];
            if(isset(resultInit['player_select_mount_data']) && resultInit['player_select_mount_data'] != false && resultInit['player_select_mount_data'] != null) WORLD_MAP_PLAYER_SELECT_MOUNT_DATA = resultInit['player_select_mount_data'];
            if(isset(resultInit['player_karma_effect_datas'])) WORLD_MAP_PLANET_PLAYER_KARMA_EFFECT_DATAS = resultInit['player_karma_effect_datas'];
            if(isset(resultInit['player_stg_search_data'])) WORLD_MAP_STG_PLAYER_SEARCH_DATA = resultInit['player_stg_search_data'];
            WORLD_MAP_SCENE_INIT_FLAG = 0; //初期通信完了
          }
          if(isset(json['result_update_player_area_instance'])){
            WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE = json['result_update_player_area_instance'];
          }
          if(isset(json['result_update_player_area_instance_all'])){
            WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE_ALL = json['result_update_player_area_instance_all'];
          }
          if(isset(json['result_move_start_area'])){ //エリアの移動を開始した
            var resultMoveStartArea = json['result_move_start_area'];
            if(isset(resultMoveStartArea['error']) && isset(resultMoveStartArea['error_comment'])){
              if(resultMoveStartArea['error'] == 0){ //エラーなし
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エリアの移動","エリアの移動を開始しました。",2,"areaMoveStartWindow");
                WORLD_MAP_SCENE_UPDATE_FLAG = 0; //更新開始
              }
              else{ //エラーあり
                var errorComment = resultMoveStartArea['error_comment'];
                var errorCode = resultMoveStartArea['error'];
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー",errorComment + "\nエラーコード:" + errorCode,2,"areaMoveStartWindow");
              }
            }
          }
          if(isset(json['result_area_move_cancel'])){
            if(json['result_area_move_cancel'] == 0){
              G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エリア移動の取消し","エリアの移動を取消しました。",2,"resultAreaMoveCanceWindow");
              WORLD_MAP_SCENE_UPDATE_FLAG = 0; //更新開始
            }
          }
          if(isset(json['result_add_mount_asset_datas'])){ //マウント画面に移動したため、追加読み込みのマウントアセットデータを取得
            LOAD_NEXT_SCENE = "mount";
            G_ASSET_ADD_LOAD_ASSET_DATA(WORLD_MAP_SCENE_INSTANCE,"worldMap","mount",json["result_add_mount_asset_datas"]); //アセットを追加読み込みする
          }
          if(isset(json['result_stg_scene_add_asset_datas'])){ //STG画面に移動したため、追加読み込みのマウントアセットデータを取得
            LOAD_NEXT_SCENE = "shootingGame";
            G_ASSET_ADD_LOAD_ASSET_DATA(WORLD_MAP_SCENE_INSTANCE,"worldMap","shootingGame",json["result_stg_scene_add_asset_datas"]); //アセットを追加読み込みする
          }
          if(isset(json['result_start_stg_player_search'])){ //プレイヤーの索敵を開始した。
            var resultStartStgPlayerSearch = json['result_start_stg_player_search'];
            if(isset(resultStartStgPlayerSearch['error']) && isset(resultStartStgPlayerSearch['error_comment'])){
              if(resultStartStgPlayerSearch['error'] == 0){ //エラーなし
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"プレイヤーの索敵","プレイヤーの索敵を開始しました。",2,"successStartStgPlayerSearchWnd");
                if(isset(json['update_start_stg_player_search'])){ //更新データを取得
                  WORLD_MAP_STG_PLAYER_SEARCH_DATA = json['update_start_stg_player_search'];
                }
                if(isset(json['update_player_select_mount_data'])){
                  WORLD_MAP_PLAYER_SELECT_MOUNT_DATA = json['update_player_select_mount_data'];
                }
                WORLD_MAP_SCENE_UPDATE_FLAG = 0; //更新開始
              }
              else{ //エラーあり
                var errorComment = resultStartStgPlayerSearch['error_comment'];
                var errorCode = resultStartStgPlayerSearch['error'];
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー",errorComment + "\nエラーコード:" + errorCode,2,"errorStartStgPlayerSearchWnd");
              }
            }
          }
          if(isset(json['cancel_stg_player_search'])){ //プレイヤーの索敵をキャンセルした。
            var resultCancelStgPlayerSearch = json['cancel_stg_player_search'];
            if(isset(resultCancelStgPlayerSearch['error']) && isset(resultCancelStgPlayerSearch['error_comment'])){
              if(resultCancelStgPlayerSearch['error'] == 0){ //エラーなし
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"プレイヤーの索敵","プレイヤーの索敵をキャンセルしました。",2,"successCancelStgPlayerSearchWnd");
                WORLD_MAP_STG_PLAYER_SEARCH_DATA = null;
                WORLD_MAP_SCENE_UPDATE_FLAG = 0; //更新開始
              }
              else{ //エラーあり
                var errorComment = resultCancelStgPlayerSearch['error_comment'];
                var errorCode = resultCancelStgPlayerSearch['error'];
                G_NORMAL_WINDOW_CREATE(WORLD_MAP_WINDOW_LAYER,"エラー",errorComment + "\nエラーコード:" + errorCode,2,"errorCancelStgPlayerSearchWnd");
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

    //初期通信完了後の処理
    if(WORLD_MAP_SCENE_INIT_FLAG == 0){
      G_WRLD_MAP_PLANET_DISP_INIT(MASTER_DATA_WORLD_MASTER,WORLD_MAP_PLANET_IMAGE_LIST);
      G_WORLD_MAP_AREA_MARKER_CREATE(WORLD_MAP_SELECT_PLANET_INDEX,WORLD_MAP_PLANET_IMAGE_LIST,WORLD_MAP_REPLACE_AREA_MASTER_DATAS);
      G_WORLD_MAP_POS_NAME_LABEL_INIT(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,WORLD_MAP_SELECT_MARKER_SPRITE);
      G_WORLD_MAP_CHECK_PLAYER_MOVE_AREA();
      G_WORLD_MAP_CHECK_PLAYER_KARMA(WORLD_MAP_PLANET_PLAYER_KARMA_EFFECT_DATAS);
      WORLD_MAP_SCENE_INIT_FLAG = 1; //初期化処理完了
    }

    //更新フラグ
    if(WORLD_MAP_SCENE_UPDATE_FLAG == 0){
      G_WRLD_MAP_PLANET_DISP_INIT(MASTER_DATA_WORLD_MASTER,WORLD_MAP_PLANET_IMAGE_LIST);
      G_WORLD_MAP_AREA_MARKER_CREATE(WORLD_MAP_SELECT_PLANET_INDEX,WORLD_MAP_PLANET_IMAGE_LIST,WORLD_MAP_REPLACE_AREA_MASTER_DATAS);
      G_WORLD_MAP_POS_NAME_LABEL_INIT(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,WORLD_MAP_SELECT_MARKER_SPRITE);
      G_WORLD_MAP_CHECK_PLAYER_MOVE_AREA();
      G_WORLD_MAP_CHECK_PLAYER_KARMA(WORLD_MAP_PLANET_PLAYER_KARMA_EFFECT_DATAS);
      WORLD_MAP_SCENE_UPDATE_FLAG = 1; //更新完了
    }

    //マーカーアニメーション制御
    if(WORLD_MAP_SELECT_MARKER_SPRITE != null){
      if(isset(WORLD_MAP_SELECT_MARKER_SPRITE['anim_switch'])){
        if(WORLD_MAP_SELECT_MARKER_SPRITE['anim_switch'] == false){ //減算
          WORLD_MAP_SELECT_MARKER_SPRITE.alpha = WORLD_MAP_SELECT_MARKER_SPRITE.alpha - 0.05;
          if(WORLD_MAP_SELECT_MARKER_SPRITE.alpha < 0){
            WORLD_MAP_SELECT_MARKER_SPRITE.alpha = 0;
            WORLD_MAP_SELECT_MARKER_SPRITE['anim_switch'] = true;
          }
        }
        else{ //加算
          WORLD_MAP_SELECT_MARKER_SPRITE.alpha = WORLD_MAP_SELECT_MARKER_SPRITE.alpha + 0.05;
          if(1 < WORLD_MAP_SELECT_MARKER_SPRITE.alpha){
            WORLD_MAP_SELECT_MARKER_SPRITE.alpha = 1;
            WORLD_MAP_SELECT_MARKER_SPRITE['anim_switch'] = false;
          }
        }
      }
    }

    //ウィンドウに返り値があった場合
    if(WINDOW_RETURN_VAL != null){
      if(isset(WINDOW_RETURN_VAL['checkAreaMoveWindow']) && WINDOW_RETURN_VAL['checkAreaMoveWindow'] == "yes"){ //移動を行った
        if(WORLD_MAP_SELECT_MARKER_SPRITE != null && isset(WORLD_MAP_SELECT_MARKER_SPRITE['area_id'])){
          var areaMoveStart = new Object();
          areaMoveStart['move_start_area_id'] = WORLD_MAP_SELECT_MARKER_SPRITE['area_id'];
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/worldMap/worldMap.php",areaMoveStart); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['checkAreaMoveCancelWindow']) && WINDOW_RETURN_VAL['checkAreaMoveCancelWindow'] == "yes"){ //移動の取消しを行った
        var areaMoveCancel = new Object();
        areaMoveCancel['area_move_cancel'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",areaMoveCancel); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['errorStartTravelWindow']) && WINDOW_RETURN_VAL['errorStartTravelWindow'] == "yes"){ //マウント選択画面表示を行った。
        var postParamGotoMountScene = new Object();
        postParamGotoMountScene['go_to_mount_scene'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoMountScene); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['errorUseFuelWindow']) && WINDOW_RETURN_VAL['errorUseFuelWindow'] == "yes"){ //燃料不足のため、マウント画面移動を選択した。
        var postParamGotoMountScene = new Object();
        postParamGotoMountScene['go_to_mount_scene'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoMountScene); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['errorTravelSelectMountWindow']) && WINDOW_RETURN_VAL['errorTravelSelectMountWindow'] == "yes"){ //マウント選択のため、マウント画面移動を選択した。
        var postParamGotoMountScene = new Object();
        postParamGotoMountScene['go_to_mount_scene'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoMountScene); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['startTravelSearchWindow']) && WINDOW_RETURN_VAL['startTravelSearchWindow'] == "yes"){ //探索を開始した。
        console.log("探索を開始した");
        var postParamGotoStgScene = new Object();
        postParamGotoStgScene['go_to_stg_scene'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoStgScene); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['startTravelWindow']) && WINDOW_RETURN_VAL['startTravelWindow'] == "yes"){ //旅を開始した。
        console.log("旅を開始した");
        var postParamGotoStgScene = new Object();
        postParamGotoStgScene['go_to_stg_scene'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParamGotoStgScene); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['errorArraivalTimeFinishWindow']) && WINDOW_RETURN_VAL['errorArraivalTimeFinishWindow'] == "ok"){ //既に移動済みだった場合エラーでマイページへ
        SCENE_MANAGER['prev_scene'] = "worldMap";
        WORLD_MAP_SCENE_INSTANCE.exit("myPage"); //マイページ画面に移動
      }
      if(isset(WINDOW_RETURN_VAL['stgPlayerSearchStartWnd']) && WINDOW_RETURN_VAL['stgPlayerSearchStartWnd'] == "yes"){ //プレイヤーの索敵を開始した。
        var postParam = new Object();
        postParam['stgStartPlayerSearch'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParam); //非同期通信開始
      }
      if(isset(WINDOW_RETURN_VAL['stgPlayerSearchCancelWnd']) && WINDOW_RETURN_VAL['stgPlayerSearchCancelWnd'] == "yes"){ //プレイヤー索敵をキャンセルした。
        var postParam = new Object();
        postParam['stgCancelPlayerSearch'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/worldMap/worldMap.php",postParam); //非同期通信開始
      }
      WINDOW_RETURN_VAL = null;
    }
  },
});

//1アニメ開始(visible trueのやつだけアニメ移動)
//2アニメ終了時に以下の関数を呼ぶ
function G_WRLD_MAP_PLANET_DISP_INIT(planetList,planetImageList){ //惑星の初期表示
  for (var i = 0; i < 5; i++) {
    if(isset(planetImageList[i]) && planetImageList[i] != null) planetImageList[i].remove();
  }
  var maxIndex = (planetList.length - 1);

  if(WORLD_MAP_SELECT_PLANET_INDEX < 0) WORLD_MAP_SELECT_PLANET_INDEX = maxIndex;
  if(maxIndex < WORLD_MAP_SELECT_PLANET_INDEX) WORLD_MAP_SELECT_PLANET_INDEX = 0;
  var planetData = planetList[WORLD_MAP_SELECT_PLANET_INDEX];
  planetImageList[2] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
  planetImageList[2].y = planetImageList[2].y - (planetImageList[2].height / 2.25);
  planetImageList[2].setScale(0.9,0.9);
  planetImageList[2]['world_id'] = planetData['world_id'];
  planetImageList[2]['index'] = 2;
  planetImageList[2].visible = true;

  var right1Index = WORLD_MAP_SELECT_PLANET_INDEX + 1;
  if(maxIndex < right1Index) right1Index = 0;
  planetData = planetList[right1Index];
  planetImageList[3] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
  planetImageList[3].y = planetImageList[3].y - (planetImageList[3].height / 2.25);
  planetImageList[3].x = planetImageList[3].x + (planetImageList[3].width * 1.1);
  planetImageList[3].setScale(0.8,0.8);
  planetImageList[3]['world_id'] = planetData['world_id'];
  planetImageList[3]['index'] = 3;
  planetImageList[3].visible = true;

  var right2Index = WORLD_MAP_SELECT_PLANET_INDEX + 2;
  if((maxIndex + 1) < right2Index){
    if(maxIndex < 1) right2Index = 0;
    else right2Index = 1;
  }
  else if(maxIndex < right2Index) right2Index = 0;
  planetData = planetList[right2Index];
  planetImageList[4] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
  planetImageList[4].y = planetImageList[4].y - (planetImageList[4].height / 2.25);
  planetImageList[4].x = planetImageList[3].x;
  planetImageList[4].x = planetImageList[4].x + (planetImageList[4].width * 1.1);
  planetImageList[4].setScale(0.8,0.8);
  planetImageList[4]['world_id'] = planetData['world_id'];
  planetImageList[4]['index'] = 4;
  planetImageList[4].visible = true;

  var left1Index = WORLD_MAP_SELECT_PLANET_INDEX - 1;
  if(left1Index < 0) left1Index = maxIndex;
  planetData = planetList[left1Index];
  planetImageList[1] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
  planetImageList[1].y = planetImageList[1].y - (planetImageList[1].height / 2.25);
  planetImageList[1].x = planetImageList[1].x - (planetImageList[1].width * 1.1);
  planetImageList[1].setScale(0.8,0.8);
  planetImageList[1]['world_id'] = planetData['world_id'];
  planetImageList[1]['index'] = 1;
  planetImageList[1].visible = true;

  var left2Index = WORLD_MAP_SELECT_PLANET_INDEX - 2;
  if(left2Index < 0) left2Index = maxIndex - 1;
  if(left2Index < 0) left2Index = maxIndex;
  planetData = planetList[left2Index];
  planetImageList[0] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
  planetImageList[0].y = planetImageList[0].y - (planetImageList[0].height / 2.25);
  planetImageList[0].x = planetImageList[1].x;
  planetImageList[0].x = planetImageList[1].x - (planetImageList[0].width * 1.1);
  planetImageList[0].setScale(0.8,0.8);
  planetImageList[0]['world_id'] = planetData['world_id'];
  planetImageList[0]['index'] = 0;
  planetImageList[0].visible = true;
}

function G_WORLD_MAP_PLANET_CHANGE_ANIM_START(direction,planetList,planetImageList){ //惑星変更アニメーションを開始 direction 1:左 2:右
  WORLD_MAP_PLANET_ANIM_FLAG = true;
  var movePosX = planetImageList[0].width * 1.1;
  if(direction == 2) movePosX = movePosX * -1;
  for (var i = 0; i < planetImageList.length; i++) {
    var planetScale = 1.0;
    if(direction == 1){
      if(i == 0) planetScale = 0.8;
      if(i == 1) planetScale = 0.9;
      if(i == 2) planetScale = 0.8;
      if(i == 3) planetScale = 0.8;
      if(i == 4) planetScale = 0.8;
    }
    else if(direction == 2){
      if(i == 0) planetScale = 0.8;
      if(i == 1) planetScale = 0.8;
      if(i == 2) planetScale = 0.8;
      if(i == 3) planetScale = 0.9;
      if(i == 4) planetScale = 0.8;
    }

    planetImageList[i].tweener.to({
      x: (planetImageList[i].x + movePosX), y: planetImageList[i].y,
      scaleX: planetScale,
      scaleY: planetScale,
    }, 500).play();
    planetImageList[i].tweener.call(function(){
      if(this.target['index'] == (planetImageList.length - 1)){
        G_WRLD_MAP_PLANET_DISP_INIT(planetList,planetImageList);
        G_WORLD_MAP_AREA_MARKER_CREATE(WORLD_MAP_SELECT_PLANET_INDEX,WORLD_MAP_PLANET_IMAGE_LIST,WORLD_MAP_REPLACE_AREA_MASTER_DATAS);
        G_WORLD_MAP_POS_NAME_LABEL_INIT(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE,WORLD_MAP_SELECT_MARKER_SPRITE);
        WORLD_MAP_PLANET_ANIM_FLAG = false;
      }
      this.target.remove();
      this.target = null;
    });
  }
}

function G_WORLD_MAP_AREA_MARKER_CREATE(selectIndex,planetImageList,areaList){ //惑星に表示するエリアマーカーを作成
  for (var i = 0; i < planetImageList.length; i++) {
    if(i == 2){
      if(WORLD_MAP_SELECT_AREA_LIST.length != 0) WORLD_MAP_SELECT_AREA_LIST = new Array();
      for (var a = 0; a < areaList.length; a++) {
        if(areaList[a]['world_id'] == planetImageList[i]['world_id']){
          WORLD_MAP_SELECT_AREA_LIST[WORLD_MAP_SELECT_AREA_LIST.length] = areaList[a];
        }
      }
      if(WORLD_MAP_SELECT_AREA_LIST.length != 0){
        planetImageList[i]['area_marker_list'] = new Array();
        for (var m = 0; m < WORLD_MAP_SELECT_AREA_LIST.length; m++) {
          planetImageList[i]['area_marker_list'][m] = Sprite('ASSET_421').addChildTo(planetImageList[i]);
          planetImageList[i]['area_marker_list'][m].x = WORLD_MAP_SELECT_AREA_LIST[m]['planet_pos_x'];
          planetImageList[i]['area_marker_list'][m].y = WORLD_MAP_SELECT_AREA_LIST[m]['planet_pos_y'];
          planetImageList[i]['area_marker_list'][m]['area_id'] = WORLD_MAP_SELECT_AREA_LIST[m]['area_id'];
          planetImageList[i]['area_marker_list'][m]['world_id'] = WORLD_MAP_SELECT_AREA_LIST[m]['world_id'];
          planetImageList[i]['area_marker_list'][m]['anim_flag'] = false;
          planetImageList[i]['area_marker_list'][m]['anim_switch'] = false;
          planetImageList[i]['area_marker_list'][m]['my_pos_marker'] = Sprite('ASSET_422').addChildTo(planetImageList[i]);
          planetImageList[i]['area_marker_list'][m]['my_pos_marker'].x = WORLD_MAP_SELECT_AREA_LIST[m]['planet_pos_x'];
          planetImageList[i]['area_marker_list'][m]['my_pos_marker'].y = WORLD_MAP_SELECT_AREA_LIST[m]['planet_pos_y'];
          planetImageList[i]['area_marker_list'][m]['my_pos_marker'].visible = false;
          WORLD_MAP_SELECT_PLANET_IMAGE = planetImageList[i];
          G_WORLD_MAP_MARKER_SELECT_INIT(planetImageList[i]['area_marker_list'][m],WORLD_MAP_SELECT_AREA_LIST[m]['area_id'],WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE);
        }
        //選択中の項目を決定
        for (var sa = 0; sa < planetImageList[i]['area_marker_list'].length; sa++) {
          if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['area_id'] != planetImageList[i]['area_marker_list'][sa]['area_id']){
            if(WORLD_MAP_SELECT_MARKER_SPRITE != null){
              WORLD_MAP_SELECT_MARKER_SPRITE.alpha = 1.0;
            }
            planetImageList[i]['area_marker_list'][sa]['anim_flag'] = true;
            WORLD_MAP_SELECT_MARKER_SPRITE = planetImageList[i]['area_marker_list'][sa];
            break;
          }
        }
      }
    }
  }
}

function G_WORLD_MAP_MARKER_SELECT_INIT(markerSprite,areaId,playerAreaInstance){ //選択位置変更時マップマーカーのアニメを開始 direction 1:次 2:前
  if(playerAreaInstance != null && areaId == playerAreaInstance['area_id']){
    markerSprite['my_pos_marker'].visible = true;
  }
}

function G_WORLD_MAP_MARKER_ANIM_INIT(selectPlanetImage,playerAreaInstance,direction){
  if(selectPlanetImage != null && isset(selectPlanetImage['area_marker_list'])){
    if(selectPlanetImage['area_marker_list'].length <= 1) return;
    var selectIndex = -1;
    for (var i = 0; i < selectPlanetImage['area_marker_list'].length; i++) {
      if(selectPlanetImage['area_marker_list'][i]['anim_flag'] == true){
        selectPlanetImage['area_marker_list'][i]['anim_flag'] = false;
        selectIndex = i;
        break;
      }
    }
    if(selectIndex != -1){
      if(direction == 1){ //次
        var nextIndex = selectIndex + 1;
        if((selectPlanetImage['area_marker_list'].length - 1) < nextIndex) nextIndex = 0; //最大Indexを超えた場合は0に戻す
        if(selectPlanetImage['area_marker_list'][nextIndex]['area_id'] == playerAreaInstance['area_id']) nextIndex = nextIndex + 1;
        selectPlanetImage['area_marker_list'][nextIndex]['anim_flag'] = true;
        if(WORLD_MAP_SELECT_MARKER_SPRITE != null) WORLD_MAP_SELECT_MARKER_SPRITE.alpha = 1.0;
        WORLD_MAP_SELECT_MARKER_SPRITE = selectPlanetImage['area_marker_list'][nextIndex];
      }
      else if(direction == 2){ //前
        var nextIndex = selectIndex - 1;
        if(nextIndex < 0) nextIndex = (selectPlanetImage['area_marker_list'].length - 1); //最小Indexを超えた場合は最大にする
        if(selectPlanetImage['area_marker_list'][nextIndex]['area_id'] == playerAreaInstance['area_id']){
          nextIndex = nextIndex - 1;
          if(nextIndex < 0) nextIndex = (selectPlanetImage['area_marker_list'].length - 1); //最小Indexを超えた場合は最大にする
        }
        selectPlanetImage['area_marker_list'][nextIndex]['anim_flag'] = true;
        if(WORLD_MAP_SELECT_MARKER_SPRITE != null) WORLD_MAP_SELECT_MARKER_SPRITE.alpha = 1.0;
        WORLD_MAP_SELECT_MARKER_SPRITE = selectPlanetImage['area_marker_list'][nextIndex];
      }
    }
  }
}

function G_WORLD_MAP_POS_NAME_LABEL_INIT(playerAreaInstance,selectMarkerSprite){ //現在地名 移動先名のラベル表示お更新する
  if(playerAreaInstance != null && selectMarkerSprite != null){
    var myPosX = 0;
    var myPosY = 0;
    var movePosX = 0;
    var movePosY = 0;
    var myWorldId = -1;
    var moveWorldId = -1;
    var moveAreaId = -1;
    for (var i = 0; i < WORLD_MAP_REPLACE_AREA_MASTER_DATAS.length; i++) {
      if(WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['area_id'] == playerAreaInstance['area_id']){
        WORLD_MAP_MY_AREA_NAME_LABEL.text = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['area_name'];
        myPosX = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['planet_pos_x'];
        myPosY = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['planet_pos_y'];
      }
      if(WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['area_id'] == selectMarkerSprite['area_id']){
        moveAreaId = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['area_id'];
        WORLD_MAP_MOVE_AREA_NAME_LABEL.text = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['area_name'];
        movePosX = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['planet_pos_x'];
        movePosY = WORLD_MAP_REPLACE_AREA_MASTER_DATAS[i]['planet_pos_y'];
      }
    }
    for (var i = 0; i < MASTER_DATA_WORLD_MASTER.length; i++) {
      if(MASTER_DATA_WORLD_MASTER[i]['world_id'] == playerAreaInstance['world_id']){
        WORLD_MAP_MY_WORLD_NAME_LABEL.text = MASTER_DATA_WORLD_MASTER[i]['world_name'];
        myWorldId = MASTER_DATA_WORLD_MASTER[i]['world_id'];
      }
      if(MASTER_DATA_WORLD_MASTER[i]['world_id'] == selectMarkerSprite['world_id']){
        WORLD_MAP_MOVE_WORLD_NAME_LABEL.text = MASTER_DATA_WORLD_MASTER[i]['world_name'];
        moveWorldId = MASTER_DATA_WORLD_MASTER[i]['world_id'];
      }
    }
    //移動距離ラベルを更新
    var resultPoint = 0;
    if(myWorldId == moveWorldId){
      resultPoint = G_WORLD_MAP_TRAVEL_TIME_SET_MOVE_AREA(myPosX,myPosY,movePosX,movePosY);
    }
    else{
      resultPoint = myWorldId - moveWorldId;
      if(resultPoint < 0) resultPoint = resultPoint * -1;
      resultPoint = resultPoint + 100;
    }
    WORLD_MAP_MOVE_TIME_LABEL.text = resultPoint + "分";
    WORLD_MAP_MOVE_POINT = resultPoint;
    //解放済みのエリアかチェック
    var openAreaFlag = G_WORLD_MAP_CHECK_PLAYER_OPEN_AREA(moveAreaId,WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE_ALL);
    if(openAreaFlag == true){ //解放済み
      WORLD_MAP_MOVE_BUTTON['btn']['area_open_flag'] = true; //解放済み
      WORLD_MAP_MOVE_BUTTON['label'].text = "移動";
    }
    else{ //未解放
      WORLD_MAP_MOVE_BUTTON['btn']['area_open_flag'] = false; //解放済み
      WORLD_MAP_MOVE_BUTTON['label'].text = "未解放";
    }
  }
}

function G_WORLD_MAP_TRAVEL_TIME_SET_MOVE_AREA(myPosX,myPosY,movePosX,movePosY){ //現在地と移動先のエリア位置から移動時間を計算
  var diffX = myPosX - movePosX;
  var diffY = myPosY - movePosY;
  if(diffX < 0) diffX = diffX * -1;
  if(diffY < 0) diffY = diffY * -1;
  var pointX = parseInt(diffX / 10);
  var pointY = parseInt(diffY / 10);
  return (pointX + pointY);
}

function G_WORLD_MAP_CHECK_PLAYER_OPEN_AREA(areaId,playerAreaInstanceAll){ //解放済みのエリアかチェック
  var result = false;
  for (var i = 0; i < playerAreaInstanceAll.length; i++) {
    if(playerAreaInstanceAll[i]['area_id'] == areaId && playerAreaInstanceAll[i]['area_open_flag'] == 1){
      result = true;
      break;
    }
  }
  return result;
}

function G_WORLD_MAP_CHECK_PLAYER_MOVE_AREA(){ //プレイヤーが移動中かチェックを行う
  if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE != false && WORLD_MAP_MOVE_CANCEL_BUTTON != null && WORLD_MAP_MOVE_BUTTON != null && WORLD_MAP_TRAVEL_START_BUTTON != null){
    if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['visible'] == 1){ //移動中ではない
      WORLD_MAP_MOVE_CANCEL_BUTTON['btn']['active_flag'] = false;
      WORLD_MAP_MOVE_CANCEL_BUTTON.visible = false;
      WORLD_MAP_MOVE_BUTTON.visible = true;
      WORLD_MAP_MOVE_BUTTON['btn']['active_flag'] = true;
      WORLD_MAP_TRAVEL_START_BUTTON['label'].text = "探索を開始";
      WORLD_MAP_TRAVEL_START_BUTTON['btn']['travel_flag'] = false;
    }
    else if(WORLD_MAP_PLANET_PLAYER_AREA_INSTANCE['visible'] == 2){ //移動中
      WORLD_MAP_MOVE_CANCEL_BUTTON.visible = true;
      WORLD_MAP_MOVE_CANCEL_BUTTON['btn']['active_flag'] = true;
      WORLD_MAP_MOVE_BUTTON['btn']['active_flag'] = false;
      WORLD_MAP_MOVE_BUTTON.visible = false;
      WORLD_MAP_TRAVEL_START_BUTTON['label'].text = "旅を開始";
      WORLD_MAP_TRAVEL_START_BUTTON['btn']['travel_flag'] = true;
    }
  }
}

function G_WORLD_MAP_CHECK_PLAYER_KARMA(karmaEffectDatas){ //プレイヤーのカルマをチェックし、ゲーム画面のUIを更新
  if(karmaEffectDatas != null){
    for (var i = 0; i < karmaEffectDatas.length; i++) {
      if(parseInt(karmaEffectDatas[i]['effect_id']) == 21){ //プレイヤー索敵コマンドが解放されていた。
        WORLD_MAP_PVP_TRAVEL_BUTTON.visible = true;
        if(WORLD_MAP_STG_PLAYER_SEARCH_DATA != null){ //プレイヤーの索敵を開始済みの場合
          WORLD_MAP_PVP_TRAVEL_BUTTON['label'].text = "索敵をキャンセル";
        }
        else{ //プレイヤーの索敵を開始していない場合
          WORLD_MAP_PVP_TRAVEL_BUTTON['label'].text = "プレイヤー索敵";
        }
      }
      if(parseInt(karmaEffectDatas[i]['effect_id']) == 22){ //プレイヤー救援コマンドが解放されていた。

      }
    }
  }
}
