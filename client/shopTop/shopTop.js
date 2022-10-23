//============================================
//  サンプルーシーン
//============================================
//パブリック変数定義
var SHOP_TOP_INSTANCE = null; //ショップTOP
var SHOP_TOP_HEADER = null; //ヘッダー
var SHOP_TOP_BASE_LAYER = null; //ベースレイヤー
var SHOP_TOP_UI_LAYER = null; //UIレイヤー
var SHOP_TOP_SORT_BUTTONS = null; //ソートボタンの実体
var SHOP_TOP_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
var SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var SHOP_TOP_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
var SHOP_TOP_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
var SHOP_TOP_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
var SHOP_TOP_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
var SHOP_TOP_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
var SHOP_TOP_SELECT_CATEGORY_ID = 0; //選択中のカテゴリーID
var SHOP_TOP_BANNER_LIST_OBJ = null; //バナーリスト
var SHOP_TOP_BANNER_LIST_HOME_POS_Y = 0;//リスト初期位置
var SHOP_TOP_BANNER_LIST_SPRITE = new Array(); //バナーリストの画像
var SHOP_TOP_BANNER_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var SHOP_TOP_BANNER_LIST_SCROLLE_START = 0; //スクロールスタート位置
var SHOP_TOP_BANNER_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var SHOP_TOP_INIT_STEP = 0; //初期化進行状態
var SHOP_TOP_RESULT_INIT_DATA = null; //初期通信結果
var SHOP_TOP_BANNER_LIST_MAX_POS_Y = 0; //リストの最大Y座標
var SHOP_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = 0; //バナーリストの初期Y座標
var SHOP_TOP_BACK_BTN = null; //戻るボタン
var SHOP_GO_TO_MYPAGE_BTN = null; //マイページボタン

phina.define("ShopTop", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "shopTop";
    //メンバー初期化
    SHOP_TOP_INSTANCE = null; //ショップTOP
    SHOP_TOP_HEADER = null; //ヘッダー
    SHOP_TOP_BASE_LAYER = null; //ベースレイヤー
    SHOP_TOP_UI_LAYER = null; //UIレイヤー
    SHOP_TOP_SORT_BUTTONS = null; //ソートボタンの実体
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
    SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    SHOP_TOP_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
    SHOP_TOP_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
    SHOP_TOP_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
    SHOP_TOP_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
    SHOP_TOP_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
    SHOP_TOP_SELECT_CATEGORY_ID = 0; //選択中のカテゴリーID
    SHOP_TOP_BANNER_LIST_OBJ = null; //バナーリスト
    SHOP_TOP_BANNER_LIST_HOME_POS_Y = 0;//リスト初期位置
    SHOP_TOP_BANNER_LIST_SPRITE = new Array(); //バナーリストの画像
    SHOP_TOP_BANNER_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
    SHOP_TOP_BANNER_LIST_SCROLLE_START = 0; //スクロールスタート位置
    SHOP_TOP_BANNER_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    SHOP_TOP_INIT_STEP = 0; //初期化進行状態
    SHOP_TOP_RESULT_INIT_DATA = null; //初期通信結果
    SHOP_TOP_BANNER_LIST_MAX_POS_Y = 0; //リストの最大Y座標
    SHOP_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = 0; //バナーリストの初期Y座標
    SHOP_TOP_BACK_BTN = null; //戻るボタン
    SHOP_GO_TO_MYPAGE_BTN = null; //マイページボタン

    // 親クラス初期化
    this.superInit();
    SHOP_TOP_INSTANCE = this;
    // 背景色
    this.backgroundColor = 'black';

    //ベースレイヤーを生成
    SHOP_TOP_BASE_LAYER = PlainElement({ //シーンの親ノード生成
    }).addChildTo(this);

    //リストタッチエリアを生成
    SHOP_TOP_BANNER_LIST_TOUCH_AREA = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(SHOP_TOP_BASE_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    SHOP_TOP_BANNER_LIST_TOUCH_AREA.setInteractive(true);

    //リスト用オブジェクトを生成
    SHOP_TOP_BANNER_LIST_OBJ = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(SHOP_TOP_BASE_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    SHOP_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = SHOP_TOP_BANNER_LIST_OBJ.y;

    //UIレイヤーを生成
    SHOP_TOP_UI_LAYER = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(SHOP_TOP_BASE_LAYER).setPosition(this.gridX.center(),this.gridY.center());

    //ヘッダー表示
    SHOP_TOP_HEADER = Sprite('ASSET_34').addChildTo(SHOP_TOP_UI_LAYER);
    SHOP_TOP_HEADER.y = SHOP_TOP_HEADER.y - ((SCREEN_HEIGHT / 2) - (SHOP_TOP_HEADER.height / 2));
    SHOP_TOP_HEADER['header_label'] = Label({
      text: 'ショップ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(SHOP_TOP_HEADER);

    //戻るボタン表示
    SHOP_TOP_BACK_BTN = Sprite('ASSET_79').addChildTo(SHOP_TOP_UI_LAYER);
    SHOP_TOP_BACK_BTN['button_label'] = Label({
      text: "戻る",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(SHOP_TOP_BACK_BTN);
    SHOP_TOP_BACK_BTN['button'] = Button({
      width: SHOP_TOP_BACK_BTN.width,         // 横サイズ
      height: SHOP_TOP_BACK_BTN.height,        // 縦サイズ
    }).addChildTo(SHOP_TOP_BACK_BTN);
    SHOP_TOP_BACK_BTN.x = SHOP_TOP_BACK_BTN.x - ((SCREEN_WIDTH / 2) - (SHOP_TOP_BACK_BTN.width / 2));
    SHOP_TOP_BACK_BTN.y = SHOP_TOP_BACK_BTN.y + ((SCREEN_HEIGHT / 2) - (SHOP_TOP_BACK_BTN.height / 2));
    SHOP_TOP_BACK_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "shopTop";
        SHOP_TOP_INSTANCE.exit(prevSceneName);
      }
    };
    SHOP_TOP_BACK_BTN['button'].visible = false;
    //マイページボタン
    SHOP_GO_TO_MYPAGE_BTN = Sprite('ASSET_79').addChildTo(SHOP_TOP_UI_LAYER);
    SHOP_GO_TO_MYPAGE_BTN['button_label'] = Label({
      text: "マイページ",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(SHOP_GO_TO_MYPAGE_BTN);
    SHOP_GO_TO_MYPAGE_BTN['button'] = Button({
      width: SHOP_GO_TO_MYPAGE_BTN.width,         // 横サイズ
      height: SHOP_GO_TO_MYPAGE_BTN.height,        // 縦サイズ
    }).addChildTo(SHOP_GO_TO_MYPAGE_BTN);
    SHOP_GO_TO_MYPAGE_BTN.x = SHOP_GO_TO_MYPAGE_BTN.x + ((SCREEN_WIDTH / 2) - (SHOP_GO_TO_MYPAGE_BTN.width / 2));
    SHOP_GO_TO_MYPAGE_BTN.y = SHOP_GO_TO_MYPAGE_BTN.y + ((SCREEN_HEIGHT / 2) - (SHOP_GO_TO_MYPAGE_BTN.height / 2));
    SHOP_GO_TO_MYPAGE_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "shopTop";
        SHOP_TOP_INSTANCE.exit("myPage");
      }
    };
    SHOP_GO_TO_MYPAGE_BTN['button'].visible = false;


    //ソートボタン
    SHOP_TOP_SORT_BUTTONS = PlainElement({ //シーンの親ノード生成
    }).addChildTo(SHOP_TOP_UI_LAYER);
    SHOP_TOP_SORT_BUTTONS['buttons'] = null;
    SHOP_TOP_SORT_BUTTONS_X_POS_INIT = SHOP_TOP_SORT_BUTTONS.x; //ソートボタンリストの初期X座標
    //ソートボタンタッチエリアを生成
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA = PlainElement({
      width: 640,
      height: 64,
    }).addChildTo(SHOP_TOP_UI_LAYER);
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.y = SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.y - ((SCREEN_HEIGHT / 2) - (SHOP_TOP_HEADER.height + (SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.height / 2)));
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.setInteractive(true);

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['shop_top_init'] = 0;
    ajaxStart("post","json","../../client/shopTop/shopTop.php",postParam); //非同期通信開始
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
          if(isset(json['result_shop_top_init'])){ //初期通信
            SHOP_TOP_RESULT_INIT_DATA = json['result_shop_top_init'];
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

    //初期化状態
    if(SHOP_TOP_INIT_STEP == 0){
      if(SHOP_TOP_RESULT_INIT_DATA != null && isset(SHOP_TOP_RESULT_INIT_DATA['shop_top_banner_datas'])){
        G_SHOP_TOP_SORT_BUTTONS_CREATE(SHOP_TOP_SORT_BUTTONS,SHOP_TOP_SELECT_CATEGORY_ID);
        G_SHOP_TOP_CREATE_BANNER_LIST(SHOP_TOP_RESULT_INIT_DATA['shop_top_banner_datas'],SHOP_TOP_SELECT_CATEGORY_ID);
        SHOP_TOP_INIT_STEP = 1; //初期化完了
      }
    }
  },
});

//ソートボタンを作成する
function G_SHOP_TOP_SORT_BUTTONS_CREATE(parentBase,category){
  //既にボタンが作成されている場合はリセット
  if(SHOP_TOP_SORT_BUTTONS != null && isset(SHOP_TOP_SORT_BUTTONS['buttons']) && SHOP_TOP_SORT_BUTTONS['buttons'] != null && SHOP_TOP_SORT_BUTTONS['buttons'].length != 0){
    for (var i = 0; i < SHOP_TOP_SORT_BUTTONS['buttons'].length; i++) {
      SHOP_TOP_SORT_BUTTONS['buttons'][i].remove();
      SHOP_TOP_SORT_BUTTONS['buttons'][i] = null;
    }
    SHOP_TOP_SORT_BUTTONS['buttons'].length = 0;
  }
  var sortButtonNames = new Array();
  sortButtonNames[0] = new Array();
  sortButtonNames[0]['category_id'] = 0;
  sortButtonNames[0]['category_name'] = "全て表示";
  sortButtonNames[1] = new Array();
  sortButtonNames[1]['category_id'] = 1;
  sortButtonNames[1]['category_name'] = "トークン";
  sortButtonNames[2] = new Array();
  sortButtonNames[2]['category_id'] = 2;
  sortButtonNames[2]['category_name'] = "カテゴリー2";
  sortButtonNames[3] = new Array();
  sortButtonNames[3]['category_id'] = 3;
  sortButtonNames[3]['category_name'] = "カテゴリー3";
  sortButtonNames[4] = new Array();
  sortButtonNames[4]['category_id'] = 4;
  sortButtonNames[4]['category_name'] = "カテゴリー4";
  //ボタン設置
  SHOP_TOP_SORT_BUTTONS['buttons'] = new Array();
  var posX = 0;
  for (var i = 0; i < sortButtonNames.length; i++) {
    if(category != i) SHOP_TOP_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_183').addChildTo(parentBase);
    else SHOP_TOP_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_184').addChildTo(parentBase); //選択中のカテゴリーはオレンジにする。
    SHOP_TOP_SORT_BUTTONS['buttons'][i].y = SHOP_TOP_SORT_BUTTONS['buttons'][i].y - (SCREEN_HEIGHT / 2) + ((SHOP_TOP_SORT_BUTTONS['buttons'][i].height / 2) + (SHOP_TOP_HEADER.height));
    if(i == 0){
      posX = SHOP_TOP_SORT_BUTTONS['buttons'][i].x - ((SCREEN_WIDTH / 2) + (SHOP_TOP_SORT_BUTTONS['buttons'][i].width / 2));
      posX = posX + SHOP_TOP_SORT_BUTTONS['buttons'][i].width;
      SHOP_TOP_SORT_BUTTONS['buttons'][i].x = posX;
      SHOP_TOP_SORT_BUTTONS_MIN_POS_X = posX;
      SHOP_TOP_SORT_BUTTONS_MAX_POS_X = posX;
    }
    else{
      posX = (posX + SHOP_TOP_SORT_BUTTONS['buttons'][i].width);
      SHOP_TOP_SORT_BUTTONS['buttons'][i].x = posX;
      SHOP_TOP_SORT_BUTTONS_MAX_POS_X = posX;
    }
    //ラベルを生成
    var labelFill = 'white';
    if(category == i) labelFill = 'black'; //選択中のカテゴリーはフォントカラーを変更
    SHOP_TOP_SORT_BUTTONS['buttons'][i]['label'] = Label({
      text: sortButtonNames[i]['category_name'],
      fontSize: 24,
      fill: labelFill,
    }).addChildTo(SHOP_TOP_SORT_BUTTONS['buttons'][i]);
    //ボタン処理
    SHOP_TOP_SORT_BUTTONS['buttons'][i]['button'] = Button({
     width: 192,         // 横サイズ
     height: 64,        // 縦サイズ
   }).addChildTo(SHOP_TOP_SORT_BUTTONS['buttons'][i]);
   SHOP_TOP_SORT_BUTTONS['buttons'][i]['button'].visible = false;
   SHOP_TOP_SORT_BUTTONS['buttons'][i]['button']['index'] = i;
   SHOP_TOP_SORT_BUTTONS['buttons'][i]['button'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
       console.log("カテゴリー");
       console.log(this['index']);
       SHOP_TOP_SELECT_CATEGORY_ID = this['index'];
       //ボタンを表示
       G_SHOP_TOP_SORT_BUTTONS_CREATE(SHOP_TOP_SORT_BUTTONS,SHOP_TOP_SELECT_CATEGORY_ID);
       //バナーリストを表示
       G_SHOP_TOP_CREATE_BANNER_LIST(SHOP_TOP_RESULT_INIT_DATA['shop_top_banner_datas'],SHOP_TOP_SELECT_CATEGORY_ID);
     }
   };
  }
  //スワイプ処理
  if(SHOP_TOP_SORT_BUTTONS['buttons'].length != 0) {
    SHOP_TOP_SORT_BUTTONS.x = SHOP_TOP_SORT_BUTTONS_HOME_POS_X; //位置をを初期化
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.onpointstart = function(e){
      SHOP_TOP_SORT_BUTTONS_SCROLLE_START = e.pointer.x;
    };
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.onpointmove = function(e){
      SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE = e.pointer.x;
      if(SHOP_TOP_SORT_BUTTONS_SCROLLE_START > SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE){//右
        var nowXPos = SHOP_TOP_SORT_BUTTONS.x;
        SHOP_TOP_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = SHOP_TOP_SORT_BUTTONS.x + (SHOP_TOP_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        //移動領域調整処理
        var diff = SHOP_TOP_SORT_BUTTONS_MAX_POS_X - SHOP_TOP_SORT_BUTTONS_MIN_POS_X;
        diff = SCREEN_WIDTH - diff;
        diff = diff + SCREEN_WIDTH;
        diff = diff - (SHOP_TOP_SORT_BUTTONS['buttons'][SHOP_TOP_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(lastCellPosX < diff){
          SHOP_TOP_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
        }
      }
      else if(SHOP_TOP_SORT_BUTTONS_SCROLLE_START < SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE){//左
        var nowXPos = SHOP_TOP_SORT_BUTTONS.x;
        SHOP_TOP_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = SHOP_TOP_SORT_BUTTONS.x + (SHOP_TOP_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        var swipeMaxAreaPosX = SCREEN_WIDTH - (SHOP_TOP_SORT_BUTTONS['buttons'][SHOP_TOP_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(swipeMaxAreaPosX < lastCellPosX) SHOP_TOP_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
      }
    };
    SHOP_TOP_SORT_BUTTONS_TOUCH_AREA.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        SHOP_TOP_SORT_BUTTONS_SCROLLE_START = 0;
        SHOP_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0;
      }
    };
  }
}

function G_SHOP_TOP_CREATE_BANNER_LIST(bannerDatas,category){ //バナーリストを作成
  //既に作成済みの場合はリセット
  if(SHOP_TOP_BANNER_LIST_SPRITE != null && SHOP_TOP_BANNER_LIST_SPRITE.length != 0){
    SHOP_TOP_BANNER_LIST_OBJ.y = SHOP_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y;
    SHOP_TOP_BANNER_LIST_HOME_POS_Y = 0;
    SHOP_TOP_BANNER_LIST_SCROLLE_MOVE = 0;
    SHOP_TOP_BANNER_LIST_SCROLLE_START = 0;
    for (var i = 0; i < SHOP_TOP_BANNER_LIST_SPRITE.length; i++) {
      SHOP_TOP_BANNER_LIST_SPRITE[i].remove();
      SHOP_TOP_BANNER_LIST_SPRITE[i] = null;
    }
    SHOP_TOP_BANNER_LIST_SPRITE.length = 0;
    SHOP_TOP_BANNER_LIST_SPRITE = new Array();
  }
  var updatePosY = 0;
  var rowBannerDatas = new Array();
  for (var i = 0; i < bannerDatas.length; i++) {
    if(category == 0){ //全て表示の時は必ず挿入
      rowBannerDatas[rowBannerDatas.length] = Object.create(bannerDatas[i]);
    }
    else if(parseInt(bannerDatas[i]['shop_top_category']) == parseInt(category)){ //カテゴリーが一致すれば挿入
      rowBannerDatas[rowBannerDatas.length] = Object.create(bannerDatas[i]);
    }
  }
  for (var i = 0; i < rowBannerDatas.length; i++) {
    var index = SHOP_TOP_BANNER_LIST_SPRITE.length;
    SHOP_TOP_BANNER_LIST_SPRITE[index] = Sprite('ASSET_' + rowBannerDatas[i]['banner_asset_id']).addChildTo(SHOP_TOP_BANNER_LIST_OBJ);
    SHOP_TOP_BANNER_LIST_SPRITE[index]['btn'] = Button({
     width: SHOP_TOP_BANNER_LIST_SPRITE[index].width,         // 横サイズ
     height: SHOP_TOP_BANNER_LIST_SPRITE[index].height,        // 縦サイズ
     }).addChildTo(SHOP_TOP_BANNER_LIST_SPRITE[index]);
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn']['param_1'] = rowBannerDatas[i]['param_1'];
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn']['param_2'] = rowBannerDatas[i]['param_2'];
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn']['param_3'] = rowBannerDatas[i]['param_3'];
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn']['param_4'] = rowBannerDatas[i]['param_4'];
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn'].onpointend = function(e){
       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
       if(SHOP_TOP_BACK_BTN['button'].hitTest(e.pointer.x,e.pointer.y)) return;
       if(SHOP_TOP_SORT_BUTTONS != null && isset(SHOP_TOP_SORT_BUTTONS['buttons']) && SHOP_TOP_SORT_BUTTONS['buttons'] != null){
         for (var j = 0; j < SHOP_TOP_SORT_BUTTONS['buttons'].length; j++) {
           if(SHOP_TOP_SORT_BUTTONS['buttons'][j].hitTest(e.pointer.x,e.pointer.y)) return;
         }
       }
       if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
         var moveScene = "";
         if(this['param_1'] != null && this['param_1'] != ""){
           //シーン遷移先が存在する
           moveScene = this['param_1'];
         }
         //他に何か処理があれば、ここに追記





         if(moveScene != ""){ //移動先が存在すれば移動
           SCENE_MANAGER['prev_scene'] = "shopTop";
           SHOP_TOP_INSTANCE.exit(moveScene);
         }
       }
     };
     SHOP_TOP_BANNER_LIST_SPRITE[index]['btn'].visible = false;
    if(index == 0){
      SHOP_TOP_BANNER_LIST_SPRITE[index].y = SHOP_TOP_BANNER_LIST_SPRITE[index].y - (SHOP_TOP_BANNER_LIST_SPRITE[index].height * 0.875);
      updatePosY = SHOP_TOP_BANNER_LIST_SPRITE[index].y;
    }
    else{
      SHOP_TOP_BANNER_LIST_SPRITE[index].y = SHOP_TOP_BANNER_LIST_SPRITE[index - 1].y;
      SHOP_TOP_BANNER_LIST_SPRITE[index].y = SHOP_TOP_BANNER_LIST_SPRITE[index].y + SHOP_TOP_BANNER_LIST_SPRITE[index].height;
      updatePosY = updatePosY + SHOP_TOP_BANNER_LIST_SPRITE[index].height;
    }
    SHOP_TOP_BANNER_LIST_SPRITE[index].y = updatePosY;
    SHOP_TOP_BANNER_LIST_MAX_POS_Y = updatePosY;
  }
  if(SHOP_TOP_BANNER_LIST_SPRITE.length != 0){ //配列の要素が存在した場合
    //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
    SHOP_TOP_BANNER_LIST_HOME_POS_Y = SHOP_TOP_BANNER_LIST_OBJ.y; //初期座標を更新
    var listTopPos = (SCREEN_HEIGHT / 2) + (SHOP_TOP_HEADER.height * 2); //リストの頂点を取得;
    SHOP_TOP_BANNER_LIST_TOUCH_AREA.update = function() {
      SHOP_TOP_BANNER_LIST_TOUCH_AREA.onpointstart = function(e){
        if(SHOP_TOP_BANNER_LIST_SPRITE.length <= 0) return;
        SHOP_TOP_BANNER_LIST_SCROLLE_START = e.pointer.y;
      };
      SHOP_TOP_BANNER_LIST_TOUCH_AREA.onpointmove = function(e){
        if(SHOP_TOP_BANNER_LIST_SPRITE.length <= 0) return;
        SHOP_TOP_BANNER_LIST_SCROLLE_MOVE = e.pointer.y;
        if(SHOP_TOP_BANNER_LIST_SCROLLE_START < SHOP_TOP_BANNER_LIST_SCROLLE_MOVE){//下
          SHOP_TOP_BANNER_LIST_OBJ.y += e.pointer.dy;
          if(SHOP_TOP_BANNER_LIST_HOME_POS_Y < SHOP_TOP_BANNER_LIST_OBJ.y) SHOP_TOP_BANNER_LIST_OBJ.y = SHOP_TOP_BANNER_LIST_HOME_POS_Y;
        }
        if(SHOP_TOP_BANNER_LIST_SCROLLE_START > SHOP_TOP_BANNER_LIST_SCROLLE_MOVE){//上
          var nowYPos = SHOP_TOP_BANNER_LIST_OBJ.y;
          SHOP_TOP_BANNER_LIST_OBJ.y += e.pointer.dy;
          var lastCellPosY = 0;
          lastCellPosY = SHOP_TOP_BANNER_LIST_OBJ.y + (SHOP_TOP_BANNER_LIST_MAX_POS_Y + SHOP_TOP_HEADER.height); //最後のセルのポジションを取得
          var swipeMaxAreaPosY = SCREEN_HEIGHT - (SHOP_TOP_BANNER_LIST_SPRITE[SHOP_TOP_BANNER_LIST_SPRITE.length - 1].height / 2);
          if(swipeMaxAreaPosY > lastCellPosY) SHOP_TOP_BANNER_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
        }
      };
      SHOP_TOP_BANNER_LIST_TOUCH_AREA.onpointend = function(e){
        if(SHOP_TOP_BANNER_LIST_SPRITE.length <= 0) return;
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        SHOP_TOP_BANNER_LIST_SCROLLE_START = 0;
        SHOP_TOP_BANNER_LIST_SCROLLE_MOVE = 0;
      };
    }
  }

}
