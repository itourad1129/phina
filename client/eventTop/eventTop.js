//============================================
//  イベントTOPシーン
//============================================
//パブリック変数定義
var EVENT_TOP_INSTANCE = null; //ショップTOP
var EVENT_TOP_HEADER = null; //ヘッダー
var EVENT_TOP_BASE_LAYER = null; //ベースレイヤー
var EVENT_TOP_UI_LAYER = null; //UIレイヤー
var EVENT_TOP_SORT_BUTTONS = null; //ソートボタンの実体
var EVENT_TOP_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
var EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var EVENT_TOP_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
var EVENT_TOP_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
var EVENT_TOP_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
var EVENT_TOP_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
var EVENT_TOP_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
var EVENT_TOP_SELECT_CATEGORY_ID = 0; //選択中のカテゴリーID
var EVENT_TOP_BANNER_LIST_OBJ = null; //バナーリスト
var EVENT_TOP_BANNER_LIST_HOME_POS_Y = 0;//リスト初期位置
var EVENT_TOP_BANNER_LIST_SPRITE = new Array(); //バナーリストの画像
var EVENT_TOP_BANNER_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var EVENT_TOP_BANNER_LIST_SCROLLE_START = 0; //スクロールスタート位置
var EVENT_TOP_BANNER_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var EVENT_TOP_INIT_STEP = 0; //初期化進行状態
var EVENT_TOP_RESULT_INIT_DATA = null; //初期通信結果
var EVENT_TOP_BANNER_LIST_MAX_POS_Y = 0; //リストの最大Y座標
var EVENT_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = 0; //バナーリストの初期Y座標
var EVENT_TOP_BACK_BTN = null; //戻るボタン
var EVENT_TOP_GO_TO_MYPAGE_BTN = null; //マイページボタン
var EVENT_TOP_SELECT_DURATION_ID = -1; //選択したイベントの期間ID

phina.define("EventTop", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function(param) {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "eventTop";
    //メンバー初期化
    EVENT_TOP_INSTANCE = null; //ショップTOP
    EVENT_TOP_HEADER = null; //ヘッダー
    EVENT_TOP_BASE_LAYER = null; //ベースレイヤー
    EVENT_TOP_UI_LAYER = null; //UIレイヤー
    EVENT_TOP_SORT_BUTTONS = null; //ソートボタンの実体
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
    EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    EVENT_TOP_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
    EVENT_TOP_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
    EVENT_TOP_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
    EVENT_TOP_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
    EVENT_TOP_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
    EVENT_TOP_SELECT_CATEGORY_ID = 0; //選択中のカテゴリーID
    EVENT_TOP_BANNER_LIST_OBJ = null; //バナーリスト
    EVENT_TOP_BANNER_LIST_HOME_POS_Y = 0;//リスト初期位置
    EVENT_TOP_BANNER_LIST_SPRITE = new Array(); //バナーリストの画像
    EVENT_TOP_BANNER_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
    EVENT_TOP_BANNER_LIST_SCROLLE_START = 0; //スクロールスタート位置
    EVENT_TOP_BANNER_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    EVENT_TOP_INIT_STEP = 0; //初期化進行状態
    EVENT_TOP_RESULT_INIT_DATA = null; //初期通信結果
    EVENT_TOP_BANNER_LIST_MAX_POS_Y = 0; //リストの最大Y座標
    EVENT_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = 0; //バナーリストの初期Y座標
    EVENT_TOP_BACK_BTN = null; //戻るボタン
    EVENT_TOP_GO_TO_MYPAGE_BTN = null; //マイページボタン
    EVENT_TOP_SELECT_DURATION_ID = -1; //選択したイベントの期間ID

    // 親クラス初期化
    this.superInit(param);
    EVENT_TOP_INSTANCE = this;
    if(isset(param.start_event_category)){ EVENT_TOP_SELECT_CATEGORY_ID = param.start_event_category;}
    // 背景色
    this.backgroundColor = 'black';

    //ベースレイヤーを生成
    EVENT_TOP_BASE_LAYER = PlainElement({ //シーンの親ノード生成
    }).addChildTo(this);

    //リストタッチエリアを生成
    EVENT_TOP_BANNER_LIST_TOUCH_AREA = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(EVENT_TOP_BASE_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    EVENT_TOP_BANNER_LIST_TOUCH_AREA.setInteractive(true);

    //リスト用オブジェクトを生成
    EVENT_TOP_BANNER_LIST_OBJ = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(EVENT_TOP_BASE_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    EVENT_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y = EVENT_TOP_BANNER_LIST_OBJ.y;

    //UIレイヤーを生成
    EVENT_TOP_UI_LAYER = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(EVENT_TOP_BASE_LAYER).setPosition(this.gridX.center(),this.gridY.center());

    //ヘッダー表示
    EVENT_TOP_HEADER = Sprite('ASSET_34').addChildTo(EVENT_TOP_UI_LAYER);
    EVENT_TOP_HEADER.y = EVENT_TOP_HEADER.y - ((SCREEN_HEIGHT / 2) - (EVENT_TOP_HEADER.height / 2));
    EVENT_TOP_HEADER['header_label'] = Label({
      text: 'イベント',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(EVENT_TOP_HEADER);

    //戻るボタン表示
    EVENT_TOP_BACK_BTN = Sprite('ASSET_79').addChildTo(EVENT_TOP_UI_LAYER);
    EVENT_TOP_BACK_BTN['button_label'] = Label({
      text: "戻る",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(EVENT_TOP_BACK_BTN);
    EVENT_TOP_BACK_BTN['button'] = Button({
      width: EVENT_TOP_BACK_BTN.width,         // 横サイズ
      height: EVENT_TOP_BACK_BTN.height,        // 縦サイズ
    }).addChildTo(EVENT_TOP_BACK_BTN);
    EVENT_TOP_BACK_BTN.x = EVENT_TOP_BACK_BTN.x - ((SCREEN_WIDTH / 2) - (EVENT_TOP_BACK_BTN.width / 2));
    EVENT_TOP_BACK_BTN.y = EVENT_TOP_BACK_BTN.y + ((SCREEN_HEIGHT / 2) - (EVENT_TOP_BACK_BTN.height / 2));
    EVENT_TOP_BACK_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "eventTop";
        EVENT_TOP_INSTANCE.exit(prevSceneName);
      }
    };
    EVENT_TOP_BACK_BTN['button'].visible = false;
    //マイページボタン
    EVENT_TOP_GO_TO_MYPAGE_BTN = Sprite('ASSET_79').addChildTo(EVENT_TOP_UI_LAYER);
    EVENT_TOP_GO_TO_MYPAGE_BTN['button_label'] = Label({
      text: "マイページ",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(EVENT_TOP_GO_TO_MYPAGE_BTN);
    EVENT_TOP_GO_TO_MYPAGE_BTN['button'] = Button({
      width: EVENT_TOP_GO_TO_MYPAGE_BTN.width,         // 横サイズ
      height: EVENT_TOP_GO_TO_MYPAGE_BTN.height,        // 縦サイズ
    }).addChildTo(EVENT_TOP_GO_TO_MYPAGE_BTN);
    EVENT_TOP_GO_TO_MYPAGE_BTN.x = EVENT_TOP_GO_TO_MYPAGE_BTN.x + ((SCREEN_WIDTH / 2) - (EVENT_TOP_GO_TO_MYPAGE_BTN.width / 2));
    EVENT_TOP_GO_TO_MYPAGE_BTN.y = EVENT_TOP_GO_TO_MYPAGE_BTN.y + ((SCREEN_HEIGHT / 2) - (EVENT_TOP_GO_TO_MYPAGE_BTN.height / 2));
    EVENT_TOP_GO_TO_MYPAGE_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "eventTop";
        EVENT_TOP_INSTANCE.exit("myPage");
      }
    };
    EVENT_TOP_GO_TO_MYPAGE_BTN['button'].visible = false;


    //ソートボタン
    EVENT_TOP_SORT_BUTTONS = PlainElement({ //シーンの親ノード生成
    }).addChildTo(EVENT_TOP_UI_LAYER);
    EVENT_TOP_SORT_BUTTONS['buttons'] = null;
    EVENT_TOP_SORT_BUTTONS_X_POS_INIT = EVENT_TOP_SORT_BUTTONS.x; //ソートボタンリストの初期X座標
    //ソートボタンタッチエリアを生成
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA = PlainElement({
      width: 640,
      height: 64,
    }).addChildTo(EVENT_TOP_UI_LAYER);
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.y = EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.y - ((SCREEN_HEIGHT / 2) - (EVENT_TOP_HEADER.height + (EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.height / 2)));
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.setInteractive(true);

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['event_top_init'] = 0;
    ajaxStart("post","json","../../client/eventTop/eventTop.php",postParam); //非同期通信開始
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
          if(isset(json['result_event_top_init'])){ //初期通信
            EVENT_TOP_RESULT_INIT_DATA = json['result_event_top_init'];
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
    if(EVENT_TOP_INIT_STEP == 0){
      if(EVENT_TOP_RESULT_INIT_DATA != null && isset(EVENT_TOP_RESULT_INIT_DATA['event_top_banner_datas'])){
        G_EVENT_TOP_SORT_BUTTONS_CREATE(EVENT_TOP_SORT_BUTTONS,EVENT_TOP_SELECT_CATEGORY_ID);
        G_EVENT_TOP_CREATE_BANNER_LIST(EVENT_TOP_RESULT_INIT_DATA['event_top_banner_datas'],EVENT_TOP_SELECT_CATEGORY_ID);
        EVENT_TOP_INIT_STEP = 1; //初期化完了
      }
    }
  },
});

//ソートボタンを作成する
function G_EVENT_TOP_SORT_BUTTONS_CREATE(parentBase,category){
  //既にボタンが作成されている場合はリセット
  if(EVENT_TOP_SORT_BUTTONS != null && isset(EVENT_TOP_SORT_BUTTONS['buttons']) && EVENT_TOP_SORT_BUTTONS['buttons'] != null && EVENT_TOP_SORT_BUTTONS['buttons'].length != 0){
    for (var i = 0; i < EVENT_TOP_SORT_BUTTONS['buttons'].length; i++) {
      EVENT_TOP_SORT_BUTTONS['buttons'][i].remove();
      EVENT_TOP_SORT_BUTTONS['buttons'][i] = null;
    }
    EVENT_TOP_SORT_BUTTONS['buttons'].length = 0;
  }
  var sortButtonNames = new Array();
  sortButtonNames[0] = new Array();
  sortButtonNames[0]['category_id'] = 0;
  sortButtonNames[0]['category_name'] = "全て表示";
  sortButtonNames[1] = new Array();
  sortButtonNames[1]['category_id'] = 1;
  sortButtonNames[1]['category_name'] = "ランキング";
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
  EVENT_TOP_SORT_BUTTONS['buttons'] = new Array();
  var posX = 0;
  for (var i = 0; i < sortButtonNames.length; i++) {
    if(category != i) EVENT_TOP_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_183').addChildTo(parentBase);
    else EVENT_TOP_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_184').addChildTo(parentBase); //選択中のカテゴリーはオレンジにする。
    EVENT_TOP_SORT_BUTTONS['buttons'][i].y = EVENT_TOP_SORT_BUTTONS['buttons'][i].y - (SCREEN_HEIGHT / 2) + ((EVENT_TOP_SORT_BUTTONS['buttons'][i].height / 2) + (EVENT_TOP_HEADER.height));
    if(i == 0){
      posX = EVENT_TOP_SORT_BUTTONS['buttons'][i].x - ((SCREEN_WIDTH / 2) + (EVENT_TOP_SORT_BUTTONS['buttons'][i].width / 2));
      posX = posX + EVENT_TOP_SORT_BUTTONS['buttons'][i].width;
      EVENT_TOP_SORT_BUTTONS['buttons'][i].x = posX;
      EVENT_TOP_SORT_BUTTONS_MIN_POS_X = posX;
      EVENT_TOP_SORT_BUTTONS_MAX_POS_X = posX;
    }
    else{
      posX = (posX + EVENT_TOP_SORT_BUTTONS['buttons'][i].width);
      EVENT_TOP_SORT_BUTTONS['buttons'][i].x = posX;
      EVENT_TOP_SORT_BUTTONS_MAX_POS_X = posX;
    }
    //ラベルを生成
    var labelFill = 'white';
    if(category == i) labelFill = 'black'; //選択中のカテゴリーはフォントカラーを変更
    EVENT_TOP_SORT_BUTTONS['buttons'][i]['label'] = Label({
      text: sortButtonNames[i]['category_name'],
      fontSize: 24,
      fill: labelFill,
    }).addChildTo(EVENT_TOP_SORT_BUTTONS['buttons'][i]);
    //ボタン処理
    EVENT_TOP_SORT_BUTTONS['buttons'][i]['button'] = Button({
     width: 192,         // 横サイズ
     height: 64,        // 縦サイズ
   }).addChildTo(EVENT_TOP_SORT_BUTTONS['buttons'][i]);
   EVENT_TOP_SORT_BUTTONS['buttons'][i]['button'].visible = false;
   EVENT_TOP_SORT_BUTTONS['buttons'][i]['button']['index'] = i;
   EVENT_TOP_SORT_BUTTONS['buttons'][i]['button'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
       console.log("カテゴリー");
       console.log(this['index']);
       EVENT_TOP_SELECT_CATEGORY_ID = this['index'];
       //ボタンを表示
       G_EVENT_TOP_SORT_BUTTONS_CREATE(EVENT_TOP_SORT_BUTTONS,EVENT_TOP_SELECT_CATEGORY_ID);
       //バナーリストを表示
       G_EVENT_TOP_CREATE_BANNER_LIST(EVENT_TOP_RESULT_INIT_DATA['event_top_banner_datas'],EVENT_TOP_SELECT_CATEGORY_ID);
     }
   };
  }
  //スワイプ処理
  if(EVENT_TOP_SORT_BUTTONS['buttons'].length != 0) {
    EVENT_TOP_SORT_BUTTONS.x = EVENT_TOP_SORT_BUTTONS_HOME_POS_X; //位置をを初期化
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.onpointstart = function(e){
      EVENT_TOP_SORT_BUTTONS_SCROLLE_START = e.pointer.x;
    };
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.onpointmove = function(e){
      EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE = e.pointer.x;
      if(EVENT_TOP_SORT_BUTTONS_SCROLLE_START > EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE){//右
        var nowXPos = EVENT_TOP_SORT_BUTTONS.x;
        EVENT_TOP_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = EVENT_TOP_SORT_BUTTONS.x + (EVENT_TOP_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        //移動領域調整処理
        var diff = EVENT_TOP_SORT_BUTTONS_MAX_POS_X - EVENT_TOP_SORT_BUTTONS_MIN_POS_X;
        diff = SCREEN_WIDTH - diff;
        diff = diff + SCREEN_WIDTH;
        diff = diff - (EVENT_TOP_SORT_BUTTONS['buttons'][EVENT_TOP_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(lastCellPosX < diff){
          EVENT_TOP_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
        }
      }
      else if(EVENT_TOP_SORT_BUTTONS_SCROLLE_START < EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE){//左
        var nowXPos = EVENT_TOP_SORT_BUTTONS.x;
        EVENT_TOP_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = EVENT_TOP_SORT_BUTTONS.x + (EVENT_TOP_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        var swipeMaxAreaPosX = SCREEN_WIDTH - (EVENT_TOP_SORT_BUTTONS['buttons'][EVENT_TOP_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(swipeMaxAreaPosX < lastCellPosX) EVENT_TOP_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
      }
    };
    EVENT_TOP_SORT_BUTTONS_TOUCH_AREA.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        EVENT_TOP_SORT_BUTTONS_SCROLLE_START = 0;
        EVENT_TOP_SORT_BUTTONS_SCROLLE_MOVE = 0;
      }
    };
  }
}

function G_EVENT_TOP_CREATE_BANNER_LIST(bannerDatas,category){ //バナーリストを作成
  //既に作成済みの場合はリセット
  if(EVENT_TOP_BANNER_LIST_SPRITE != null && EVENT_TOP_BANNER_LIST_SPRITE.length != 0){
    EVENT_TOP_BANNER_LIST_OBJ.y = EVENT_TOP_BANNER_LIST_OBJ_DEFAULT_POS_Y;
    EVENT_TOP_BANNER_LIST_HOME_POS_Y = 0;
    EVENT_TOP_BANNER_LIST_SCROLLE_MOVE = 0;
    EVENT_TOP_BANNER_LIST_SCROLLE_START = 0;
    for (var i = 0; i < EVENT_TOP_BANNER_LIST_SPRITE.length; i++) {
      EVENT_TOP_BANNER_LIST_SPRITE[i].remove();
      EVENT_TOP_BANNER_LIST_SPRITE[i] = null;
    }
    EVENT_TOP_BANNER_LIST_SPRITE.length = 0;
    EVENT_TOP_BANNER_LIST_SPRITE = new Array();
  }
  var updatePosY = 0;
  var rowBannerDatas = new Array();
  for (var i = 0; i < bannerDatas.length; i++) {
    if(category == 0){ //全て表示の時は必ず挿入
      rowBannerDatas[rowBannerDatas.length] = Object.create(bannerDatas[i]);
    }
    else if(parseInt(bannerDatas[i]['event_top_category']) == parseInt(category)){ //カテゴリーが一致すれば挿入
      rowBannerDatas[rowBannerDatas.length] = Object.create(bannerDatas[i]);
    }
  }
  for (var i = 0; i < rowBannerDatas.length; i++) {
    var index = EVENT_TOP_BANNER_LIST_SPRITE.length;
    EVENT_TOP_BANNER_LIST_SPRITE[index] = Sprite('ASSET_' + rowBannerDatas[i]['banner_asset_id']).addChildTo(EVENT_TOP_BANNER_LIST_OBJ);
    EVENT_TOP_BANNER_LIST_SPRITE[index]['btn'] = Button({
     width: EVENT_TOP_BANNER_LIST_SPRITE[index].width,         // 横サイズ
     height: EVENT_TOP_BANNER_LIST_SPRITE[index].height,        // 縦サイズ
     }).addChildTo(EVENT_TOP_BANNER_LIST_SPRITE[index]);
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['event_type'] = rowBannerDatas[i]['event_type'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['duration_id'] = rowBannerDatas[i]['duration_id'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['param_1'] = rowBannerDatas[i]['param_1'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['param_2'] = rowBannerDatas[i]['param_2'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['param_3'] = rowBannerDatas[i]['param_3'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn']['param_4'] = rowBannerDatas[i]['param_4'];
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn'].onpointend = function(e){
       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
       if(EVENT_TOP_BACK_BTN['button'].hitTest(e.pointer.x,e.pointer.y)) return;
       if(EVENT_TOP_SORT_BUTTONS != null && isset(EVENT_TOP_SORT_BUTTONS['buttons']) && EVENT_TOP_SORT_BUTTONS['buttons'] != null){
         for (var j = 0; j < EVENT_TOP_SORT_BUTTONS['buttons'].length; j++) {
           if(EVENT_TOP_SORT_BUTTONS['buttons'][j].hitTest(e.pointer.x,e.pointer.y)) return;
         }
       }
       if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
         var moveScene = "";
         switch (parseInt(this['event_type'])) { //イベントタイプにより、処理を分岐
           case 1: //ポイントランキング
           {
             if(this['duration_id'] != null && this['duration_id'] != ""){ //ポイントランキングIDをセット
               EVENT_TOP_SELECT_DURATION_ID = parseInt(this['duration_id']);
               moveScene = "pointRanking"; //異動先を決定
             }
           }
           break;
           case 2:
           {

           }
           break;
           default:
           break;
         }
         if(moveScene != ""){ //移動先が存在すれば移動
           SCENE_MANAGER['prev_scene'] = "eventTop";
           EVENT_TOP_INSTANCE.exit(moveScene);
         }
       }
     };
     EVENT_TOP_BANNER_LIST_SPRITE[index]['btn'].visible = false;
    if(index == 0){
      EVENT_TOP_BANNER_LIST_SPRITE[index].y = EVENT_TOP_BANNER_LIST_SPRITE[index].y - (EVENT_TOP_BANNER_LIST_SPRITE[index].height * 0.875);
      updatePosY = EVENT_TOP_BANNER_LIST_SPRITE[index].y;
    }
    else{
      EVENT_TOP_BANNER_LIST_SPRITE[index].y = EVENT_TOP_BANNER_LIST_SPRITE[index - 1].y;
      EVENT_TOP_BANNER_LIST_SPRITE[index].y = EVENT_TOP_BANNER_LIST_SPRITE[index].y + EVENT_TOP_BANNER_LIST_SPRITE[index].height;
      updatePosY = updatePosY + EVENT_TOP_BANNER_LIST_SPRITE[index].height;
    }
    EVENT_TOP_BANNER_LIST_SPRITE[index].y = updatePosY;
    EVENT_TOP_BANNER_LIST_MAX_POS_Y = updatePosY;
  }
  if(EVENT_TOP_BANNER_LIST_SPRITE.length != 0){ //配列の要素が存在した場合
    //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
    EVENT_TOP_BANNER_LIST_HOME_POS_Y = EVENT_TOP_BANNER_LIST_OBJ.y; //初期座標を更新
    var listTopPos = (SCREEN_HEIGHT / 2) + (EVENT_TOP_HEADER.height * 2); //リストの頂点を取得;
    EVENT_TOP_BANNER_LIST_TOUCH_AREA.update = function() {
      if(EVENT_TOP_BANNER_LIST_SPRITE.length <= 0) return;
      EVENT_TOP_BANNER_LIST_TOUCH_AREA.onpointstart = function(e){
        EVENT_TOP_BANNER_LIST_SCROLLE_START = e.pointer.y;
      };
      EVENT_TOP_BANNER_LIST_TOUCH_AREA.onpointmove = function(e){
        if(EVENT_TOP_BANNER_LIST_SPRITE.length <= 0) return;
        EVENT_TOP_BANNER_LIST_SCROLLE_MOVE = e.pointer.y;
        if(EVENT_TOP_BANNER_LIST_SCROLLE_START < EVENT_TOP_BANNER_LIST_SCROLLE_MOVE){//下
          EVENT_TOP_BANNER_LIST_OBJ.y += e.pointer.dy;
          if(EVENT_TOP_BANNER_LIST_HOME_POS_Y < EVENT_TOP_BANNER_LIST_OBJ.y) EVENT_TOP_BANNER_LIST_OBJ.y = EVENT_TOP_BANNER_LIST_HOME_POS_Y;
        }
        if(EVENT_TOP_BANNER_LIST_SCROLLE_START > EVENT_TOP_BANNER_LIST_SCROLLE_MOVE){//上
          var nowYPos = EVENT_TOP_BANNER_LIST_OBJ.y;
          EVENT_TOP_BANNER_LIST_OBJ.y += e.pointer.dy;
          var lastCellPosY = 0;
          lastCellPosY = EVENT_TOP_BANNER_LIST_OBJ.y + (EVENT_TOP_BANNER_LIST_MAX_POS_Y + EVENT_TOP_HEADER.height); //最後のセルのポジションを取得
          console.log(EVENT_TOP_BANNER_LIST_SPRITE.length - 1);
          var swipeMaxAreaPosY = SCREEN_HEIGHT - (EVENT_TOP_BANNER_LIST_SPRITE[EVENT_TOP_BANNER_LIST_SPRITE.length - 1].height / 2);
          if(swipeMaxAreaPosY > lastCellPosY) EVENT_TOP_BANNER_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
        }
      };
      EVENT_TOP_BANNER_LIST_TOUCH_AREA.onpointend = function(e){
        if(EVENT_TOP_BANNER_LIST_SPRITE.length <= 0) return;
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        EVENT_TOP_BANNER_LIST_SCROLLE_START = 0;
        EVENT_TOP_BANNER_LIST_SCROLLE_MOVE = 0;
      };
    }
  }

}
