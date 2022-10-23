//============================================
//  ポイントランキングシーン
//============================================
//パブリック変数定義
var POINT_RANKING_INSTANCE = null; //ポイントランキングシーンのインスタンス
var POINT_RANKING_HEADER = null; //ヘッダー
var POINT_RANKING_MASTER_DATA = null; //マスターデータ
var POINT_RANKING_DURATION_DATA = null; //期間データ
var POINT_RANKING_INIT_STEP = 0; //初期化処理進行状態 0:初期化 1:初期化後
var POINT_RANKING_SCENE_BASE = null; //ベースレイヤー
var POINT_RANKING_UI_LAYER = null; //UIレイヤー
var POINT_RANKING_WINDOW_LAYER = null; //ウィンドウ表示レイヤー
var POINT_RANKING_BACK_BTN = null; //戻るボタン
var POINT_RANKING_DESCRIPTION_BTN = null; //説明ボタン
var POINT_RANKING_MYPAGE_BTN = null; //マイページ移動ボタン
var POINT_RANKING_RANKING_LIST_LAYER = null; //ランキングリストレイヤー
var POINT_RANKING_BG_LAYER = null; //背景レイヤー
var POINT_RANKING_BG_SPRITE = null; //背景 スプライト
var POINT_RANKING_TMP_DURATION_ID = -1; //シーン保存用の期限ID
var POINT_RANKING_RANKING_POINT_BG = null; //ランキングに投票したポイント表示の背景
var POINT_RANKING_MY_POINT_BG = null; //自分の手持ちポイント表示の背景
var POINT_RANKING_ADD_POINT_BTN = null; //ポイント送信ボタン
var POINT_RANKING_PLAYER_ITEM_DATA = null; //プレイヤーのポイントアイテム所持状態
var POINT_RANKING_RANKING_DATAS = null; //ランキングデータ
var POINT_RANKING_PLAYER_RANKING_DATA_ONE = null; //自分のランキングデータ
var POINT_RANKING_LIST_CELLS = new Array(); //ランキングリストのセルデータ配列
var POINT_RANKING_ARROW_BTN_UP = null; //リスト表示切り替えボタン↑
var POINT_RANKING_ARROW_BTN_DOWN = null; //リスト表示切り替えボタン↓
var POINT_RANKING_LIST_MIN_RANK = 0; //表示中のリストの最低ランク
var POINT_RANKING_LIST_MAX_RANK = 0; //表示中のリストの最高ランク
var POINT_RANKING_TOP_WINDOW_TYPE = 0; //トップ画面のタイプ 0:UI非表示&トップランカーの一覧表示 1:UI表示&自分の順位中心のリスト表示
var POINT_RANKING_TOP_RANKER_DATAS = null; //トップランカー
var POINT_RANKING_PLAYER_RANKING_DATAS = null; //自分の順位にフォーカスしたランキングデータ
var POINT_RANKING_USE_ADD_POINT_NUM = 0; //送信するポイント数
var POINT_RANKING_ADD_POINT_GAUGE_WINDOW = null; //ポイント送信ゲージウィンドウ実体
var POINT_RANKING_DURATION_STEP = 0; //ランキングの期間ステップ 0:イベント期間外 1:開催中&ポイント送信 2:結果発表&報酬受け取り期間
var POINT_RANKING_MY_RANK_DISP_NODE = null; //自分のランキングを表示するノード
var POINT_RANKING_REWARD_DATAS = null; //ランキング報酬のリスト
var POINT_RANKING_REWARD_LIST_BTN  = null; //景品リスト表示ボタン
var POINT_RANKING_GET_REWARD_BTN = null; //報酬獲得ボタン
var POINT_RANKING_GET_REWARD_FLAG = 0; //報酬獲得可能 0:不可能 1:可能
var POINT_RANKING_GET_REWARD_ERROR_COMMENT = ""; //報酬を獲得できないエラー内容
var POINT_RANKING_GET_REWARD_DROP_LIST = new Array(); //獲得した報酬のリスト
var POINT_RANKING_OPEN_REWARD_WINDOW_COUNT = 0; //報酬獲得画面を開いた回数

phina.define("PointRanking", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "pointRanking";
    //メンバー初期化
    POINT_RANKING_INSTANCE = null; //ポイントランキングシーンのインスタンス
    POINT_RANKING_HEADER = null; //ヘッダー
    POINT_RANKING_MASTER_DATA = null; //マスターデータ
    POINT_RANKING_DURATION_DATA = null; //期間データ
    POINT_RANKING_INIT_STEP = 0; //初期化処理進行状態
    POINT_RANKING_SCENE_BASE = null; //ベースレイヤー
    POINT_RANKING_UI_LAYER = null; //UIレイヤー
    POINT_RANKING_BACK_BTN = null; //戻るボタン
    POINT_RANKING_DESCRIPTION_BTN = null; //説明ボタン
    POINT_RANKING_MYPAGE_BTN = null; //マイページ移動ボタン
    POINT_RANKING_RANKING_LIST_LAYER = null; //ランキングリストレイヤー
    POINT_RANKING_BG_LAYER = null; //背景レイヤー
    POINT_RANKING_BG_SPRITE = null; //背景 スプライト
    POINT_RANKING_TMP_DURATION_ID = -1; //シーン保存用の期限ID
    POINT_RANKING_RANKING_POINT_BG = null; //ランキングに投票したポイント表示の背景
    POINT_RANKING_MY_POINT_BG = null; //自分の手持ちポイント表示の背景
    POINT_RANKING_ADD_POINT_BTN = null; //ポイント送信ボタン
    POINT_RANKING_PLAYER_ITEM_DATA = null; //プレイヤーのポイントアイテム所持状態
    POINT_RANKING_RANKING_DATAS = null; //ランキングデータ
    POINT_RANKING_PLAYER_RANKING_DATA_ONE = null; //自分のランキングデータ
    POINT_RANKING_LIST_CELLS = new Array(); //ランキングリストのセルデータ配列
    POINT_RANKING_ARROW_BTN_UP = null; //リスト表示切り替えボタン↑
    POINT_RANKING_ARROW_BTN_DOWN = null; //リスト表示切り替えボタン↓
    POINT_RANKING_LIST_MIN_RANK = 0; //表示中のリストの最低ランク
    POINT_RANKING_LIST_MAX_RANK = 0; //表示中のリストの最高ランク
    POINT_RANKING_TOP_WINDOW_TYPE = 0; //トップ画面のタイプ 0:UI非表示&トップランカーの一覧表示 1:UI表示&自分の順位中心のリスト表示
    POINT_RANKING_TOP_RANKER_DATAS = null; //トップランカー
    POINT_RANKING_PLAYER_RANKING_DATAS = null; //自分の順位にフォーカスしたランキングデータ
    POINT_RANKING_USE_ADD_POINT_NUM = 0; //送信するポイント数
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW = null; //ポイント送信ゲージウィンドウ実体
    POINT_RANKING_DURATION_STEP = 0; //ランキングの期間ステップ 0:イベント期間外 1:開催中&ポイント送信 2:結果発表&報酬受け取り期間
    POINT_RANKING_MY_RANK_DISP_NODE = null; //自分のランキングを表示するノード
    POINT_RANKING_REWARD_DATAS = null; //ランキング報酬のリスト
    POINT_RANKING_REWARD_LIST_BTN  = null; //景品リスト表示ボタン
    POINT_RANKING_GET_REWARD_BTN = null; //報酬獲得ボタン
    POINT_RANKING_GET_REWARD_FLAG = 0; //報酬獲得可能 0:不可能 1:可能
    POINT_RANKING_GET_REWARD_ERROR_COMMENT = ""; //報酬を獲得できないエラー内容
    POINT_RANKING_GET_REWARD_DROP_LIST = new Array(); //獲得した報酬のリスト
    POINT_RANKING_OPEN_REWARD_WINDOW_COUNT = 0; //報酬獲得画面を開いた回数

    // 親クラス初期化
    this.superInit();

    POINT_RANKING_INSTANCE = this;

    // 背景色
    this.backgroundColor = 'black';

    //ベースレイヤー
    POINT_RANKING_SCENE_BASE = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    //ランキングリストレイヤー
    POINT_RANKING_RANKING_LIST_LAYER = PlainElement({
     width: this.gridX.width,
     height: this.gridY.height,
    }).addChildTo(POINT_RANKING_SCENE_BASE);

    //背景レイヤー
    POINT_RANKING_BG_LAYER = PlainElement({
     width: this.gridX.width,
     height: this.gridY.height,
    }).addChildTo(POINT_RANKING_SCENE_BASE);

    //UIレイヤー
    POINT_RANKING_UI_LAYER = PlainElement({
     width: this.gridX.width,
     height: this.gridY.height,
    }).addChildTo(POINT_RANKING_SCENE_BASE);

    //ウィンドウ表示レイヤー
    POINT_RANKING_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    //ヘッダー表示
    POINT_RANKING_HEADER = Sprite('ASSET_34').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_HEADER.y = POINT_RANKING_HEADER.y - ((SCREEN_HEIGHT / 2) - (POINT_RANKING_HEADER.height / 2));

    //説明ボタン
    POINT_RANKING_DESCRIPTION_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_DESCRIPTION_BTN.y = POINT_RANKING_HEADER.y;
    POINT_RANKING_DESCRIPTION_BTN.y = POINT_RANKING_DESCRIPTION_BTN.y + POINT_RANKING_HEADER.height;
    POINT_RANKING_DESCRIPTION_BTN.x = POINT_RANKING_DESCRIPTION_BTN.x + ((SCREEN_WIDTH / 2) - (POINT_RANKING_DESCRIPTION_BTN.width / 2));
    POINT_RANKING_DESCRIPTION_BTN['btn_label'] = Label({
      text: '説明',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_DESCRIPTION_BTN);
    POINT_RANKING_DESCRIPTION_BTN['btn'] = Button({
      width: POINT_RANKING_DESCRIPTION_BTN.width,         // 横サイズ
      height: POINT_RANKING_DESCRIPTION_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_DESCRIPTION_BTN);
    POINT_RANKING_DESCRIPTION_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.parent.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
    };
    POINT_RANKING_DESCRIPTION_BTN['btn'].visible = false;

    //景品リストボタン
    POINT_RANKING_REWARD_LIST_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_REWARD_LIST_BTN.x = POINT_RANKING_DESCRIPTION_BTN.x;
    POINT_RANKING_REWARD_LIST_BTN.y = POINT_RANKING_DESCRIPTION_BTN.y;
    POINT_RANKING_REWARD_LIST_BTN.y = POINT_RANKING_REWARD_LIST_BTN.y + POINT_RANKING_REWARD_LIST_BTN.height;
    POINT_RANKING_REWARD_LIST_BTN['btn_label'] = Label({
      text: '景品リスト',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_REWARD_LIST_BTN);
    POINT_RANKING_REWARD_LIST_BTN['btn'] = Button({
      width: POINT_RANKING_REWARD_LIST_BTN.width,         // 横サイズ
      height: POINT_RANKING_REWARD_LIST_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_REWARD_LIST_BTN);
    POINT_RANKING_REWARD_LIST_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.parent.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      G_POINT_RANKING_CREATE_REWARD_LIST(POINT_RANKING_REWARD_DATAS);
    };
    POINT_RANKING_REWARD_LIST_BTN['btn'].visible = false;

    //蓄積ポイント背景
    POINT_RANKING_RANKING_POINT_BG = Sprite("ASSET_789").addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_RANKING_POINT_BG.y = POINT_RANKING_HEADER.y;
    POINT_RANKING_RANKING_POINT_BG.y = POINT_RANKING_RANKING_POINT_BG.y + POINT_RANKING_HEADER.height;
    POINT_RANKING_RANKING_POINT_BG.x = POINT_RANKING_RANKING_POINT_BG.x - POINT_RANKING_RANKING_POINT_BG.width * 0.45;
    POINT_RANKING_RANKING_POINT_BG['label'] = Label({
      text: '-----pt',
      fontSize: 34,
      fill: 'white',
      align: 'right',
    }).addChildTo(POINT_RANKING_RANKING_POINT_BG);
    POINT_RANKING_RANKING_POINT_BG['label'].x = POINT_RANKING_RANKING_POINT_BG['label'].x + (POINT_RANKING_RANKING_POINT_BG.width * 0.45);

    //現在のポイント背景
    POINT_RANKING_MY_POINT_BG = Sprite("ASSET_789").addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_MY_POINT_BG.y = POINT_RANKING_RANKING_POINT_BG.y;
    POINT_RANKING_MY_POINT_BG.y = POINT_RANKING_MY_POINT_BG.y + ((POINT_RANKING_MY_POINT_BG.height * 4) + (POINT_RANKING_MY_POINT_BG.height / 2));
    POINT_RANKING_MY_POINT_BG.x = POINT_RANKING_MY_POINT_BG.x + POINT_RANKING_MY_POINT_BG.width * 0.45;
    POINT_RANKING_MY_POINT_BG['label'] = Label({
      text: '-----pt',
      fontSize: 34,
      fill: 'white',
      align: 'right',
    }).addChildTo(POINT_RANKING_MY_POINT_BG);
    POINT_RANKING_MY_POINT_BG['label'].x = POINT_RANKING_MY_POINT_BG['label'].x + (POINT_RANKING_MY_POINT_BG.width * 0.15);

    //マイページボタン
    POINT_RANKING_MYPAGE_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_MYPAGE_BTN.y = POINT_RANKING_MY_POINT_BG.y;
    POINT_RANKING_MYPAGE_BTN.y = POINT_RANKING_MYPAGE_BTN.y + POINT_RANKING_MY_POINT_BG.height;
    POINT_RANKING_MYPAGE_BTN['btn_label'] = Label({
      text: 'マイページ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_MYPAGE_BTN);
    POINT_RANKING_MYPAGE_BTN['btn'] = Button({
      width: POINT_RANKING_MYPAGE_BTN.width,         // 横サイズ
      height: POINT_RANKING_MYPAGE_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_MYPAGE_BTN);
    POINT_RANKING_MYPAGE_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.parent.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      SCENE_MANAGER['prev_scene'] = "pointRanking";
      SCENE_MANAGER['point_ranking_duration_id'] = POINT_RANKING_TMP_DURATION_ID;
      POINT_RANKING_INSTANCE.exit("myPage");
    };
    POINT_RANKING_MYPAGE_BTN['btn'].visible = false;

    //戻るボタン
    POINT_RANKING_BACK_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_BACK_BTN.y = POINT_RANKING_MYPAGE_BTN.y;
    POINT_RANKING_BACK_BTN.x = POINT_RANKING_BACK_BTN.x + ((SCREEN_WIDTH / 2) - (POINT_RANKING_BACK_BTN.width / 2));
    POINT_RANKING_BACK_BTN['btn_label'] = Label({
      text: '戻る',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_BACK_BTN);
    POINT_RANKING_BACK_BTN['btn'] = Button({
      width: POINT_RANKING_BACK_BTN.width,         // 横サイズ
      height: POINT_RANKING_BACK_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_BACK_BTN);
    POINT_RANKING_BACK_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.parent.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      var prevSceneName = SCENE_MANAGER['prev_scene'];
      SCENE_MANAGER['prev_scene'] = "pointRanking";
      SCENE_MANAGER['point_ranking_duration_id'] = POINT_RANKING_TMP_DURATION_ID;
      POINT_RANKING_INSTANCE.exit(prevSceneName);
    };
    POINT_RANKING_BACK_BTN['btn'].visible = false;

    //ポイント確認 or イベントTOPボタン
    POINT_RANKING_CHECK_POINT_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_CHECK_POINT_BTN.x = POINT_RANKING_CHECK_POINT_BTN.x - ((SCREEN_WIDTH / 2) - (POINT_RANKING_CHECK_POINT_BTN.width / 2));
    POINT_RANKING_CHECK_POINT_BTN.y = POINT_RANKING_MYPAGE_BTN.y;
    POINT_RANKING_CHECK_POINT_BTN['btn_label'] = Label({
      text: 'ポイント確認',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_CHECK_POINT_BTN);
    POINT_RANKING_CHECK_POINT_BTN['btn'] = Button({
      width: POINT_RANKING_CHECK_POINT_BTN.width,         // 横サイズ
      height: POINT_RANKING_CHECK_POINT_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_CHECK_POINT_BTN);
    POINT_RANKING_CHECK_POINT_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.parent.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      if(POINT_RANKING_TOP_WINDOW_TYPE == 0){
        G_POINT_RANKING_CHANGE_TOP_WINDOW(1);
        this.parent['btn_label'].text = "イベントTOP";
      }
      else{
        G_POINT_RANKING_CHANGE_TOP_WINDOW(0);
        this.parent['btn_label'].text = "ポイント確認";
        if(POINT_RANKING_DURATION_STEP == 2) this.parent['btn_label'].text = "結果を確認";
      }
    };
    POINT_RANKING_CHECK_POINT_BTN['btn'].visible = false;


    //ポイント送信ボタン
    POINT_RANKING_ADD_POINT_BTN = Sprite("ASSET_790").addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_ADD_POINT_BTN.y = ((POINT_RANKING_MY_POINT_BG.y - POINT_RANKING_RANKING_POINT_BG.y) / 2) + POINT_RANKING_RANKING_POINT_BG.y;
    POINT_RANKING_ADD_POINT_BTN['btn'] = Button({
      width: POINT_RANKING_ADD_POINT_BTN.width,         // 横サイズ
      height: POINT_RANKING_ADD_POINT_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_ADD_POINT_BTN);
    POINT_RANKING_ADD_POINT_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(POINT_RANKING_ADD_POINT_BTN.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_INIT_STEP == 0) return;
      if(POINT_RANKING_ADD_POINT_GAUGE_WINDOW == null){
        if(POINT_RANKING_PLAYER_ITEM_DATA != false && isset(POINT_RANKING_PLAYER_ITEM_DATA['item_val']) && 0 < POINT_RANKING_PLAYER_ITEM_DATA['item_val']){
          G_POINT_RANKING_CREATE_ADD_POINT_GAUGE_WINDOW(POINT_RANKING_WINDOW_LAYER,POINT_RANKING_PLAYER_ITEM_DATA,POINT_RANKING_PLAYER_RANKING_DATA_ONE);
        }
        else{ //ポイントがない
          G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"エラー","ポイントを所持していません",2,"ErrorAddPointWindow");
        }
      }
    };
    POINT_RANKING_ADD_POINT_BTN['btn'].visible = false;

    //自分の順位
    POINT_RANKING_MY_RANK_DISP_NODE = PlainElement({
    }).addChildTo(POINT_RANKING_UI_LAYER).setPosition(POINT_RANKING_ADD_POINT_BTN.x, POINT_RANKING_ADD_POINT_BTN.y);
    //背景などがあればここに追記(一位二位3位に分けるなど)
    //POINT_RANKING_MY_RANK_DISP_NODE['rank_bg']
    POINT_RANKING_MY_RANK_DISP_NODE['rank_label'] = Label({
      text: '--位',
      fontSize: 64,
      fill: 'white',
    }).addChildTo(POINT_RANKING_MY_RANK_DISP_NODE);
    //リスト表示切り替え矢印ボタン↑
    POINT_RANKING_ARROW_BTN_UP = Sprite("ASSET_792").addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_ARROW_BTN_UP.x = POINT_RANKING_ARROW_BTN_UP.x + (POINT_RANKING_ARROW_BTN_UP.width * 3);
    POINT_RANKING_ARROW_BTN_UP.y = POINT_RANKING_ARROW_BTN_UP.y + (POINT_RANKING_ARROW_BTN_UP.height / 2);
    G_HELPER_ADD_FLICKER_ANIM(POINT_RANKING_ARROW_BTN_UP);
    POINT_RANKING_ARROW_BTN_UP['btn'] = Button({
      width: POINT_RANKING_ARROW_BTN_UP.width,         // 横サイズ
      height: POINT_RANKING_ARROW_BTN_UP.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_ARROW_BTN_UP);
    POINT_RANKING_ARROW_BTN_UP['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(POINT_RANKING_ARROW_BTN_UP.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_INIT_STEP == 0 || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      NETWORK_IS_CONNECTING = true;
      var postParam = new Object();
      postParam['point_ranking_duration_id'] = POINT_RANKING_TMP_DURATION_ID;
      postParam['get_point_ranking_datas'] = new Object();
      console.log("↑");
      console.log(POINT_RANKING_LIST_MIN_RANK);
      var postMaxRank = POINT_RANKING_LIST_MIN_RANK - 1;
      console.log(postMaxRank);
      if(postMaxRank < 0) postMaxRank = 0;
      var postMinRank = postMaxRank - 4;
      if(postMinRank < 0){ postMinRank = 0; postMaxRank = postMaxRank + 1}
      console.log(postMaxRank);
      console.log("MIN:" + postMinRank);
      console.log("MAX:" + postMaxRank);
      postParam['get_point_ranking_datas']['min_rank'] = postMinRank;
      postParam['get_point_ranking_datas']['max_rank'] = postMaxRank;
      ajaxStart("post","json","../../client/pointRanking/pointRanking.php",postParam); //非同期通信開始
    };
    POINT_RANKING_ARROW_BTN_UP['btn'].visible = false;

    //報酬獲得ボタン
    POINT_RANKING_GET_REWARD_BTN = Sprite('ASSET_79').addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_GET_REWARD_BTN.y = POINT_RANKING_MYPAGE_BTN.y;
    POINT_RANKING_GET_REWARD_BTN.y = POINT_RANKING_GET_REWARD_BTN.y - POINT_RANKING_GET_REWARD_BTN.height * 1.5;
    POINT_RANKING_GET_REWARD_BTN['get_reward_flag'] = false;
    POINT_RANKING_GET_REWARD_BTN['get_reward_error_comment'] = "";
    POINT_RANKING_GET_REWARD_BTN['btn_label'] = Label({
      text: '報酬獲得',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_GET_REWARD_BTN);
    POINT_RANKING_GET_REWARD_BTN['btn'] = Button({
      width: POINT_RANKING_GET_REWARD_BTN.width,         // 横サイズ
      height: POINT_RANKING_GET_REWARD_BTN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_GET_REWARD_BTN);
    POINT_RANKING_GET_REWARD_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(POINT_RANKING_ARROW_BTN_DOWN.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_INIT_STEP == 0 || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      if(this.parent['get_reward_flag'] == true){
        //報酬獲得を実行
        var postParam = new Object();
        postParam['get_point_ranking_reward'] = 0;
        postParam['point_ranking_duration_id'] = POINT_RANKING_DURATION_DATA['point_ranking_duration_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/pointRanking/pointRanking.php",postParam); //非同期通信開始
      }
      else{ //報酬を入手できない理由をウィンドウに表示
        G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"エラー",this.parent['get_reward_error_comment'],2,"pointRankingGetRewardErrorWindow");
      }
    };
    POINT_RANKING_GET_REWARD_BTN['btn'].visible = false;

    //リスト表示切り替え矢印ボタン↓
    POINT_RANKING_ARROW_BTN_DOWN = Sprite("ASSET_792").addChildTo(POINT_RANKING_UI_LAYER);
    POINT_RANKING_ARROW_BTN_DOWN.setRotation(180);
    POINT_RANKING_ARROW_BTN_DOWN.x = POINT_RANKING_ARROW_BTN_UP.x;
    POINT_RANKING_ARROW_BTN_DOWN.y = POINT_RANKING_ARROW_BTN_UP.y;
    POINT_RANKING_ARROW_BTN_DOWN.y = POINT_RANKING_ARROW_BTN_DOWN.y + (POINT_RANKING_ARROW_BTN_DOWN.height * 4);
    G_HELPER_ADD_FLICKER_ANIM(POINT_RANKING_ARROW_BTN_DOWN);
    POINT_RANKING_ARROW_BTN_DOWN['btn'] = Button({
      width: POINT_RANKING_ARROW_BTN_DOWN.width,         // 横サイズ
      height: POINT_RANKING_ARROW_BTN_DOWN.height,        // 縦サイズ
    }).addChildTo(POINT_RANKING_ARROW_BTN_DOWN);
    POINT_RANKING_ARROW_BTN_DOWN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(POINT_RANKING_ARROW_BTN_DOWN.visible == false) return;
      if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || POINT_RANKING_INIT_STEP == 0 || POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null) return;
      NETWORK_IS_CONNECTING = true;
      var postParam = new Object();
      postParam['point_ranking_duration_id'] = POINT_RANKING_TMP_DURATION_ID;
      postParam['get_point_ranking_datas'] = new Object();
      console.log("↓");
      console.log(POINT_RANKING_LIST_MAX_RANK);
      var postMinRank = POINT_RANKING_LIST_MAX_RANK + 1;
      console.log(postMinRank);
      if(postMinRank < 0) postMinRank = 0;
      var postMaxRank = postMinRank + 4;
      if(postMaxRank < 0) postMaxRank = 0;
      console.log(postMinRank);
      console.log("MIN:" + postMinRank);
      console.log("MAX:" + postMaxRank);
      postParam['get_point_ranking_datas']['min_rank'] = postMinRank;
      postParam['get_point_ranking_datas']['max_rank'] = postMaxRank;
      ajaxStart("post","json","../../client/pointRanking/pointRanking.php",postParam); //非同期通信開始
    };
    POINT_RANKING_ARROW_BTN_DOWN['btn'].visible = false;



    POINT_RANKING_HEADER['label'] = Label({ //ヘッダー
      text: '',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(POINT_RANKING_HEADER);
    NETWORK_IS_CONNECTING = true;
    //初期通信処理
    var postParam = new Object();
    postParam['point_ranking_init'] = new Object;
    postParam['point_ranking_init']['point_ranking_duration_id'] = -1;
    postParam['get_player_item'] = 0;
    if(isset(SCENE_MANAGER['point_ranking_duration_id']) && SCENE_MANAGER['point_ranking_duration_id'] != -1){
      postParam['point_ranking_init']['point_ranking_duration_id'] = SCENE_MANAGER['point_ranking_duration_id'];
      POINT_RANKING_TMP_DURATION_ID = SCENE_MANAGER['point_ranking_duration_id'];
      SCENE_MANAGER['point_ranking_duration_id'] = -1;
    }
    else if(isset(EVENT_TOP_SELECT_DURATION_ID) && EVENT_TOP_SELECT_DURATION_ID != -1){ //イベントTOPから選択されて遷移した場合
      postParam['point_ranking_init']['point_ranking_duration_id'] = EVENT_TOP_SELECT_DURATION_ID;
      POINT_RANKING_TMP_DURATION_ID = EVENT_TOP_SELECT_DURATION_ID;
      SCENE_MANAGER['point_ranking_duration_id'] = -1;
      EVENT_TOP_SELECT_DURATION_ID = -1;
    }
    ajaxStart("post","json","../../client/pointRanking/pointRanking.php",postParam); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['result_point_ranking_duration_error'])){ //イベントは期間外だった
            G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"ポイントランキング","こちらのイベントは既に終了しました。",2,"pointRankingDurationErrorWindow");
          }
          if(isset(json['result_point_ranking_duration_step'])){ //期間ステップ
            var prevStep = POINT_RANKING_DURATION_STEP;
            POINT_RANKING_DURATION_STEP = json['result_point_ranking_duration_step'];
            if(prevStep == 1 && POINT_RANKING_DURATION_STEP == 2){ //ステップが開催中から結果に変わっていた場合、シーンを再読み込み
              this.exit("pointRanking");
            }
          }
          if(isset(json['result_point_ranking_init'])){ //シーン初期化処理が実行された
            var init = json['result_point_ranking_init'];
            if(isset(init['point_ranking_master_data'])){
              POINT_RANKING_MASTER_DATA = init['point_ranking_master_data']; //マスターデータをセット
            }
            if(isset(init['point_ranking_duration_data'])){
              POINT_RANKING_DURATION_DATA = init['point_ranking_duration_data']; //期限データをセット
            }
            if(isset(init['point_ranking_reward_data'])){
              POINT_RANKING_REWARD_DATAS = init['point_ranking_reward_data']; //報酬リストデータセット
            }
            if(isset(init['get_point_ranking_reward_flag'])){
              POINT_RANKING_GET_REWARD_FLAG = init['get_point_ranking_reward_flag']; //報酬獲得可能か
            }
            if(isset(init['get_point_ranking_reward_error_comment'])){ //報酬獲得できないエラーコメント
              POINT_RANKING_GET_REWARD_ERROR_COMMENT = init['get_point_ranking_reward_error_comment'];
            }
          }
          if(isset(json['result_player_item_data'])){ //ポイントアイテム所持数を設定
            POINT_RANKING_PLAYER_ITEM_DATA = json['result_player_item_data'];
          }
          if(isset(json['result_player_point_ranking_datas'])){ //プレイヤーのランキングデータを設定
            POINT_RANKING_PLAYER_RANKING_DATAS = null;
            POINT_RANKING_PLAYER_RANKING_DATAS = json['result_player_point_ranking_datas'];
          }
          if(isset(json['result_player_point_ranking_data_one'])){ //プレイヤーのランキングデータだけを取得
            POINT_RANKING_PLAYER_RANKING_DATA_ONE = json['result_player_point_ranking_data_one'];
          }
          if(isset(json['result_top_ranker_datas'])){ //トップランカー5人を取得
            POINT_RANKING_TOP_RANKER_DATAS = null;
            POINT_RANKING_TOP_RANKER_DATAS = json['result_top_ranker_datas'];
          }
          if(isset(json['result_point_ranking_datas'])){ //ポイントランキングのリストを更新
            if(POINT_RANKING_INIT_STEP == 1){
              POINT_RANKING_RANKING_DATAS = null;
              POINT_RANKING_RANKING_DATAS = json['result_point_ranking_datas'];
              G_POINT_RANKING_UPDATE_RANKING_LIST(POINT_RANKING_RANKING_DATAS);
            }
          }
          if(isset(json['result_add_point'])){ //ポイントの送信を行った
            G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"ポイント送信","ポイントの送信が完了しました",2,"pointRankingAddPointWindow");
          }
          if(isset(json['result_get_player_point_ranking_reward'])){ //報酬獲得結果
            var resultGetReward = json['result_get_player_point_ranking_reward'];
            if(resultGetReward['error'] == 0){
              POINT_RANKING_GET_REWARD_BTN.alpha = 0.5;
              POINT_RANKING_GET_REWARD_FLAG = 0;
              POINT_RANKING_GET_REWARD_ERROR_COMMENT = "既に報酬を受け取った";
              POINT_RANKING_GET_REWARD_DROP_LIST = resultGetReward['drop_list'];
              if(POINT_RANKING_GET_REWARD_DROP_LIST != null && POINT_RANKING_GET_REWARD_DROP_LIST.length != 0){
                G_POINT_RANKING_CREATEREWARD_WINDOW(POINT_RANKING_GET_REWARD_DROP_LIST[0]); //報酬ウィンドウを全て作成して表示
              }
            }
            else{
              G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"エラー",resultGetReward['error_comment'],2,"ErrorGetPlayerRewardWindow");
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

    //ウィンドウに返し値があった。
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_RETURN_VAL['pointRankingAddPointWindow'] == "ok"){ //ギルドの設立を実行した。
        //リストを更新
        G_POINT_RANKING_UPDATE_RANKING_LIST(POINT_RANKING_PLAYER_RANKING_DATAS);
      }
      if(WINDOW_RETURN_VAL['pointRankingDurationErrorWindow'] == "ok"){ //期間外のイベントだった
        //イベント一覧画面に戻る。
        SCENE_MANAGER['prev_scene'] = "myPage";
        this.exit("eventTop");
      }
      if(POINT_RANKING_OPEN_REWARD_WINDOW_COUNT != 0 && POINT_RANKING_GET_REWARD_DROP_LIST.length != 0){
        var index = (POINT_RANKING_OPEN_REWARD_WINDOW_COUNT - 1);
        if(isset(WINDOW_RETURN_VAL['getRewardWindow_' + index])){
          if(isset(POINT_RANKING_GET_REWARD_DROP_LIST[POINT_RANKING_OPEN_REWARD_WINDOW_COUNT])){
            G_POINT_RANKING_CREATEREWARD_WINDOW(POINT_RANKING_GET_REWARD_DROP_LIST[POINT_RANKING_OPEN_REWARD_WINDOW_COUNT]);
          }
          else POINT_RANKING_OPEN_REWARD_WINDOW_COUNT = 0;
        }
      }
      WINDOW_RETURN_VAL = null;
    }

    //初期化処理の開始
    if(POINT_RANKING_INIT_STEP == 0 && POINT_RANKING_MASTER_DATA != null && POINT_RANKING_DURATION_DATA != null
      && POINT_RANKING_PLAYER_ITEM_DATA != null && POINT_RANKING_PLAYER_RANKING_DATA_ONE != null){
      G_POINT_RANKING_INIT();
      POINT_RANKING_INIT_STEP = 1;
    }
  },
});

function G_POINT_RANKING_INIT(){ //シーン初期化処理を開始
  //ヘッダーラベルのセット
  POINT_RANKING_HEADER['label'].text = POINT_RANKING_MASTER_DATA['point_ranking_name'];
  //背景スプライトのセット
  POINT_RANKING_BG_SPRITE = Sprite("ASSET_" + POINT_RANKING_MASTER_DATA['back_ground_asset_id']);
  if(POINT_RANKING_BG_SPRITE != null){
    POINT_RANKING_BG_SPRITE.addChildTo(POINT_RANKING_BG_LAYER);
    POINT_RANKING_BG_SPRITE.y = POINT_RANKING_BG_SPRITE.y - (POINT_RANKING_BG_SPRITE.height / 2);
  }
  //蓄積ポイントラベルのセット
  if(isset(POINT_RANKING_PLAYER_RANKING_DATA_ONE['score'])){
    var initPlayerScore = 0;
    if(POINT_RANKING_PLAYER_RANKING_DATA_ONE['score'] != -1){ //スコアが存在する場合
      POINT_RANKING_RANKING_POINT_BG['label'].text = parseInt(POINT_RANKING_PLAYER_RANKING_DATA_ONE['score']) + "pt";
    }
  }
  //所持ポイントラベルのセット
  if(POINT_RANKING_PLAYER_ITEM_DATA != false && isset(POINT_RANKING_PLAYER_ITEM_DATA['item_val'])){
    POINT_RANKING_MY_POINT_BG['label'].text = parseInt(POINT_RANKING_PLAYER_ITEM_DATA['item_val']) + "pt";
  }
  //期間STEPなどによるUI表示変更
  if(POINT_RANKING_DURATION_STEP == 2){ //結果発表中の場合
    POINT_RANKING_CHECK_POINT_BTN['btn_label'].text = "結果を確認";
  }
  //自分のランクが存在すれば、自分の順位テキストを更新
  if(POINT_RANKING_PLAYER_RANKING_DATA_ONE != null && isset(POINT_RANKING_PLAYER_RANKING_DATA_ONE['rank']) && POINT_RANKING_PLAYER_RANKING_DATA_ONE['rank'] != -1)
  {
    var myRank = parseInt(POINT_RANKING_PLAYER_RANKING_DATA_ONE['rank']) + 1;
    POINT_RANKING_MY_RANK_DISP_NODE['rank_label'].text = myRank + "位";
  }
  //報酬獲得フラグを更新
  POINT_RANKING_GET_REWARD_BTN['get_reward_flag'] = POINT_RANKING_GET_REWARD_FLAG == 1 ? true : false;
  POINT_RANKING_GET_REWARD_BTN['get_reward_error_comment'] = POINT_RANKING_GET_REWARD_ERROR_COMMENT;
  //最初に表示するランキングリスト
  G_POINT_RANKING_UPDATE_RANKING_LIST(POINT_RANKING_TOP_RANKER_DATAS);
  //TOP画面切り替え
  G_POINT_RANKING_CHANGE_TOP_WINDOW(0);
}

function G_POINT_RANKING_UPDATE_RANKING_LIST(rankingDatas){ //ランキングリストの更新
  var posY = 0;
  if(isset(rankingDatas['ranking_data'])){
    if(POINT_RANKING_LIST_CELLS != null){
      for (var i = 0; i < POINT_RANKING_LIST_CELLS.length; i++) {
        POINT_RANKING_LIST_CELLS[i].remove();
        POINT_RANKING_LIST_CELLS[i] = null;
      }
      POINT_RANKING_LIST_CELLS.length = 0;
      POINT_RANKING_LIST_CELLS = null;
    }
    POINT_RANKING_LIST_CELLS = new Array();
    for (var i = 0; i < rankingDatas['ranking_data'].length; i++) {
      var rank = (parseInt(rankingDatas['ranking_data'][i]['point_ranking_rank']) + 1);
      var score = parseInt(rankingDatas['ranking_data'][i]['point_ranking_score']);
      var playerName = rankingDatas['ranking_data'][i]['player_name'];
      if(i == 0) {
        POINT_RANKING_LIST_MIN_RANK = parseInt(rankingDatas['ranking_data'][i]['point_ranking_rank']);
        POINT_RANKING_LIST_MAX_RANK = parseInt(rankingDatas['ranking_data'][i]['point_ranking_rank']);
      }
      else POINT_RANKING_LIST_MAX_RANK = parseInt(rankingDatas['ranking_data'][i]['point_ranking_rank']);
      //セル背景
      POINT_RANKING_LIST_CELLS[i] = Sprite("ASSET_791").addChildTo(POINT_RANKING_RANKING_LIST_LAYER);
      if(posY == 0){
        POINT_RANKING_LIST_CELLS[i].y = POINT_RANKING_LIST_CELLS[i].y + (POINT_RANKING_LIST_CELLS[i].height / 2);
        posY = POINT_RANKING_LIST_CELLS[i].y;
      }
      else{
        posY = posY + POINT_RANKING_LIST_CELLS[i].height;
        POINT_RANKING_LIST_CELLS[i].y = POINT_RANKING_LIST_CELLS[i].y + posY;
      }
      //順位ラベル
      POINT_RANKING_LIST_CELLS[i]['rank_label'] = Label({
       text: '',
       fontSize: 36,
       fill: 'yellow',
       align: 'left',
      }).addChildTo(POINT_RANKING_LIST_CELLS[i]);
      POINT_RANKING_LIST_CELLS[i]['rank_label'].x = POINT_RANKING_LIST_CELLS[i]['rank_label'].x - ((POINT_RANKING_LIST_CELLS[i].width / 2) - (POINT_RANKING_LIST_CELLS[i].width * 0.05));
      POINT_RANKING_LIST_CELLS[i]['rank_label'].text = rank;
      //スコアラベル
      POINT_RANKING_LIST_CELLS[i]['score_label'] = Label({
       text: '',
       fontSize: 32,
       fill: 'white',
       align: 'left',
      }).addChildTo(POINT_RANKING_LIST_CELLS[i]);
      POINT_RANKING_LIST_CELLS[i]['score_label'].text = score + "pt";
      POINT_RANKING_LIST_CELLS[i]['score_label'].x = POINT_RANKING_LIST_CELLS[i]['score_label'].x - ((POINT_RANKING_LIST_CELLS[i].width / 2) - (POINT_RANKING_LIST_CELLS[i].width * 0.25));

      //プレイヤー名ラベル
      POINT_RANKING_LIST_CELLS[i]['player_name_label'] = Label({
       text: '',
       fontSize: 32,
       fill: 'white',
       align: 'left',
      }).addChildTo(POINT_RANKING_LIST_CELLS[i]);
      POINT_RANKING_LIST_CELLS[i]['player_name_label'].text = playerName;
      POINT_RANKING_LIST_CELLS[i]['player_name_label'].x = POINT_RANKING_LIST_CELLS[i]['player_name_label'].x + ((POINT_RANKING_LIST_CELLS[i].width / 2) - (POINT_RANKING_LIST_CELLS[i].width * 0.3));
    }
  }
  if(isset(rankingDatas['option'])){ //表示切り替えボタンの表示オンオフ
    POINT_RANKING_ARROW_BTN_UP.visible = false;
    POINT_RANKING_ARROW_BTN_DOWN.visible = false;
    switch (parseInt(rankingDatas['option'])) {
      case 0: //通常
      {
        POINT_RANKING_ARROW_BTN_UP.visible = true;
        POINT_RANKING_ARROW_BTN_DOWN.visible = true;
      }
      case 1: //最低順位
      {
        POINT_RANKING_ARROW_BTN_UP.visible = true;
      }
      break;
      case 2: //最高順位
      {
        POINT_RANKING_ARROW_BTN_DOWN.visible = true;
      }
      break;
      case 3: //両方
      {
        POINT_RANKING_ARROW_BTN_UP.visible = false;
        POINT_RANKING_ARROW_BTN_DOWN.visible = false;
      }
      break;
      default:
      break;
    }
  }
}

function G_POINT_RANKING_CHANGE_TOP_WINDOW(type){
  POINT_RANKING_TOP_WINDOW_TYPE = type; //ウィンドウタイプ更新
  switch (parseInt(type)) {
    case 0: //UI非表示&トップランカーの一覧表示
    {
      POINT_RANKING_REWARD_LIST_BTN.visible = false;
      POINT_RANKING_DESCRIPTION_BTN.visible = false;
      POINT_RANKING_RANKING_POINT_BG.visible = false;
      POINT_RANKING_MY_POINT_BG.visible = false;
      POINT_RANKING_ADD_POINT_BTN.visible = false;
      G_POINT_RANKING_UPDATE_RANKING_LIST(POINT_RANKING_TOP_RANKER_DATAS);
      //結果発表期間の場合
      if(POINT_RANKING_DURATION_STEP == 2){
        POINT_RANKING_MY_RANK_DISP_NODE.visible = false;
        POINT_RANKING_GET_REWARD_BTN.visible = false;
      }
    }
    break;
    case 1: //UI表示&自分の順位中心のリスト表示
    {
      POINT_RANKING_REWARD_LIST_BTN.visible = true;
      POINT_RANKING_DESCRIPTION_BTN.visible = true;
      POINT_RANKING_RANKING_POINT_BG.visible = true;
      POINT_RANKING_MY_POINT_BG.visible = true;
      POINT_RANKING_ADD_POINT_BTN.visible = true;
      G_POINT_RANKING_UPDATE_RANKING_LIST(POINT_RANKING_PLAYER_RANKING_DATAS);
      //結果発表期間の場合
      if(POINT_RANKING_DURATION_STEP == 2){
        POINT_RANKING_MY_RANK_DISP_NODE.visible = true;
        POINT_RANKING_GET_REWARD_BTN.visible = true;
        if(POINT_RANKING_GET_REWARD_BTN['get_reward_flag'] == true) POINT_RANKING_GET_REWARD_BTN.alpha = 1;
        else POINT_RANKING_GET_REWARD_BTN.alpha = 0.5;
        POINT_RANKING_RANKING_POINT_BG.visible = false;
        POINT_RANKING_MY_POINT_BG.visible = false;
        POINT_RANKING_ADD_POINT_BTN.visible = false;
      }
    }
    break;
    default:
  }
}

function G_POINT_RANKING_CREATE_ADD_POINT_GAUGE_WINDOW(parentBase,playerItemData,playerPointRankingDataOne){ //ポイント送信ゲージウィンドウを作成
  POINT_RANKING_USE_ADD_POINT_NUM = 0; //消費燃料数を初期化
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW = Sprite('ASSET_64').addChildTo(parentBase);//マスクを表示
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite'] = Sprite('ASSET_62').addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['title_label'] = Label({
    text: "ポイントの送信",
    fontSize: 36,
    fill: 'white',
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['title_label'].y = parentBase.y * -0.27;

  //燃料ゲージ
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'] = Gauge({ //送信するポイントゲージを表示
    x: 0, y: 0,// x,y座標
    width: 432,            // 横サイズ
    height: 30,            // 縦サイズ
    maxValue: 100,         // ゲージ最大値
    value: 0,         // ゲージ初期値
    fill: 'white',         // 後ろの色
    gaugeColor: 'red', // ゲージ色
    stroke: 'blue',      // 枠色
    strokeWidth: 10,        // 枠太さ
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);

  //メインテキスト
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'] = Label({
    text: "送信するアイテム[？？？]所持数:？？？",
    fontSize: 24,
    fill: 'black',
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].y;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].y - (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].height * 1.5);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] = 0;

  //決定ボタン
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'] = Sprite('ASSET_63').addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].y;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].y + (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].height * 1.5);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].x = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].x - (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].width * 0.5);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']['btn'] = Button({
   text: '',
   width: 256,         // 横サイズ
   height: 64,        // 縦サイズ
   alpha: 0,
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']['btn'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    if(POINT_RANKING_USE_ADD_POINT_NUM != 0){ //消費燃料が設定されている
      G_POINT_RANKING_DELETE_ADD_POINT_GAUGE_WINDOW();
      var postParam = new Object();
      postParam['point_ranking_duration_id'] = POINT_RANKING_DURATION_DATA['point_ranking_duration_id'];
      postParam['add_point_num'] = POINT_RANKING_USE_ADD_POINT_NUM;
      postParam['point_item_id'] = playerItemData['item_id'];
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/pointRanking/pointRanking.php",postParam); //非同期通信開始
    }
  };
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']['btn'].visible = false;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']['btn_label'] = Label({
    text: "決定",
    fontSize: 24,
    fill: 'white',
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].alpha = 0.5;

  //キャンセルボタン
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'] = Sprite('ASSET_63').addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].y;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].y;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].x = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].x + (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].width * 0.5);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']['btn'] = Button({
   text: '',
   width: 256,         // 横サイズ
   height: 64,        // 縦サイズ
   alpha: 0,
 }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']['btn'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    G_POINT_RANKING_DELETE_ADD_POINT_GAUGE_WINDOW();
  };
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']['btn'].visible = false;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']['btn_label'] = Label({
    text: "キャンセル",
    fontSize: 24,
    fill: 'white',
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn']);

  //補給前燃料→補給後燃料表示ラベル
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'] = Label({
    text: "送信ポイント ??? → ??? (最大:???)",
    fontSize: 24,
    fill: 'black',
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].y;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'].y = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'].y + (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].height * 1.5);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['add_point_befor'] = 0;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['add_point_after'] = 0;

  //←ボタン
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'] = Sprite('ASSET_462').addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'].x = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'].x - ((POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].width / 2) + (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'].width / 1.5));
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn'] = Button({
   text: '',
   width: 64,         // 横サイズ
   height: 64,        // 縦サイズ
 }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']);
 POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn']['stay_count'] = 0;
 POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn'].onpointstart = function(e){
   if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
   if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
   G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,1);
 };
 POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn'].onpointstay = function(e){
   if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
   if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
   this['stay_count'] ++;
   if(125 <= this['stay_count']){
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,2000);
     console.log("連続" + 2000);
   }
   if(100 <= this['stay_count']){
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,1000);
     console.log("連続" + 1000);
   }
   if(75 <= this['stay_count']){
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,500);
     console.log("連続" + 500);
   }
   else if(50 <= this['stay_count']){
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,100);
     console.log("連続" + 100);
   }
   else if(25 <= this['stay_count']){
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,10);
     console.log("連続" + 10);
   }
   else {
     G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(false,1);
   }
   console.log("stay_count:" + this['stay_count']);
 };
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    this['stay_count'] = 0;
  };
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left']['btn'].visible = false;

    //→ボタン
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'] = Sprite('ASSET_462').addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite']);
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'].x = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'].x + ((POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].width / 2) + (POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'].width / 1.5));
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'].scaleX *= -1;
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn'] = Button({
    text: '',
    width: 64,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn']['stay_count'] = 0;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn'].onpointstart = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,1);
  };
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn'].onpointstay = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    this['stay_count'] ++;
    if(125 <= this['stay_count']){
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,2000);
      console.log("連続" + 2000);
    }
    if(100 <= this['stay_count']){
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,1000);
      console.log("連続" + 1000);
    }
    if(75 <= this['stay_count']){
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,500);
      console.log("連続" + 500);
    }
    else if(50 <= this['stay_count']){
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,100);
      console.log("連続" + 100);
    }
    else if(25 <= this['stay_count']){
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,10);
      console.log("連続" + 10);
    }
    else {
      G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(true,1);
    }
    console.log("stay_count:" + this['stay_count']);
  };
   POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_LIST != null || WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
     this['stay_count'] = 0;
   };
   POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right']['btn'].visible = false;


  //データ反映処理
  //燃料アイテム名を取得
  var playerItemNum = parseInt(playerItemData['item_val']);
  var itemMasterDatas = MASTER_DATA_ITEM_MASTER;
  if(itemMasterDatas != null){
    for (var i = 0; i < itemMasterDatas.length; i++) {
      if(itemMasterDatas[i]['id'] == playerItemData['item_id']){ //アイテムと一致
        var pointItemName = itemMasterDatas[i]['item_name'];
        POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].text = "使用するアイテム["+ pointItemName +"]所持数:" + playerItemNum;
        POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_name'] = pointItemName;
        POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] = parseInt(playerItemNum);
        break;
      }
    }
  }
  //現在ポイント、送信可能ポイントを取得
  var pointBefor = parseInt(playerPointRankingDataOne['score']);
  var pointMax = playerItemNum;
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_befor'] = parseInt(pointBefor);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] = parseInt(pointBefor);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max'] = parseInt(pointMax);
  var maxPointNum = parseInt(pointMax) + parseInt(pointBefor);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'].text = "合計ポイント " + pointBefor + " → " + pointBefor + " (最大:" + maxPointNum + ")";

  //ゲージの初期値を設定
  var gaugeInitValue = ((POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_befor'] / POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max']) * 100);
  POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].value = gaugeInitValue;
}

function G_POINT_RANKING_UPDATE_ADD_POINT_GAUGE_WINDOW(upOrDown,num){ //燃料が変更された際呼ばれる関数 upOrDown true up false down
  if(POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null && isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']) && isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']) && isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'])){
    //所持燃料以上の燃料をチャージしようとした場合
    //if(upOrDown == true && POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] <= 0) return false;
    //最大蓄積燃料を超えてしまう場合
    //if(upOrDown == true && POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max'] <= POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after']) return false;
    //現在の燃料を下回る場合
    //if(upOrDown == false && POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] <= POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_befor']) return false;
    //燃料が0以下で減らそうとした場合
    //if(upOrDown == false && POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] <= 0) return false;

    if(upOrDown == true){
      var resultPoint = POINT_RANKING_USE_ADD_POINT_NUM + num;
      if(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max'] <= resultPoint){
        var pointDiff = resultPoint - POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max'];
        num = num - pointDiff;
      }
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] + num;
      POINT_RANKING_USE_ADD_POINT_NUM = POINT_RANKING_USE_ADD_POINT_NUM + num;
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] - num;
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].text = "使用するアイテム["+ POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_name'] +"]所持数:" + POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'];
    }
    else{
      var resultPoint = POINT_RANKING_USE_ADD_POINT_NUM - num;
      if(resultPoint <= 0){
        num = POINT_RANKING_USE_ADD_POINT_NUM;
      }
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] - num;
      POINT_RANKING_USE_ADD_POINT_NUM = POINT_RANKING_USE_ADD_POINT_NUM - num;
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] = POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'] + num;
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label'].text = "使用するアイテム["+ POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_name'] +"]所持数:" + POINT_RANKING_ADD_POINT_GAUGE_WINDOW['main_text_label']['item_val'];
    }

    //ゲージのパーセンテージを更新
    var updateFuelVal = ((POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after'] / POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max']) * 100);
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].value = updateFuelVal;
    console.log(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_gauge'].value);
    console.log(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after']);
    var maxPointNum = parseInt(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_befor']) + parseInt(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_max']);
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label'].text = "燃料 "
    + POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_befor']
    + " → " + POINT_RANKING_ADD_POINT_GAUGE_WINDOW['fuel_change_label']['point_after']
    + " (最大:" + maxPointNum + ")";

    //決定ボタンが有効か。
    if(POINT_RANKING_USE_ADD_POINT_NUM == 0) POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].alpha = 0.5;
    else POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].alpha = 1;

    return true;
  }
  else{
    return false;
  }
}

function G_POINT_RANKING_DELETE_ADD_POINT_GAUGE_WINDOW(){ //ポイント送信ウィンドウを削除する。
  if(POINT_RANKING_ADD_POINT_GAUGE_WINDOW != null){
    if(isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'])){
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'].remove();
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_right'] = null;
    }
    if(isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'])){
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'].remove();
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['arrow_btn_left'] = null;
    }
    if(isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'])){
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'].remove();
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['no_btn'] = null;
    }
    if(isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'])){
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'].remove();
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['yes_btn'] = null;
    }
    if(isset(POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite'])){
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite'].remove();
      POINT_RANKING_ADD_POINT_GAUGE_WINDOW['window_sprite'] = null;
    }
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW.remove();
    POINT_RANKING_ADD_POINT_GAUGE_WINDOW = null;
  }
}

function G_POINT_RANKING_CREATE_REWARD_LIST(rankingRewardDatas){ //景品リストを生成
  var listObj = PlainElement({});
  var listObjHeightSize = 0;
  var listStartPos = 0;
  var listEndPos = 0;
  if(rankingRewardDatas == null || rankingRewardDatas.length == 0) return null;
  for (var i = 0; i < rankingRewardDatas.length; i++) {
    var rrData = rankingRewardDatas[i]['ranking_reward'];
    if(rrData['rank_ed'] == 0 || rrData['rank_st'] == 0) continue;
    var dropList = rankingRewardDatas[i]['list'];
    //●位
    var rankText = rrData['rank_st'] == rrData['rank_ed'] ? rrData['rank_st'] + "位" : rrData['rank_st'] + "位 〜 " + rrData['rank_ed'] + "位";
    var rankNoLabel = LabelArea({
      width: SCREEN_WIDTH,
      height: SCREEN_WIDTH * 0.1,
      text: rankText,
      fontSize: 64,
      fill: 'white',
      align: 'center',
      verticalAlign: 'top',
    }).addChildTo(listObj);
    var iconPosX = 0;
    if(i != 0) {
      rankNoLabel.y = listEndPos;
      rankNoLabel.y = rankNoLabel.y + rankNoLabel.height * 1.5;
    }
    var iconPosY = rankNoLabel.y + rankNoLabel.height * 1.5;
    listEndPos = iconPosY;
    var iconIncrementCount = 0;
    //報酬アイコン
    for (var d = 0; d < dropList.length; d++) {
      var icon = null;
      switch (dropList[d]['type']) {
        case "exp":
        {
          console.log("経験値アイコン表示");
          icon = G_ITEM_ICON_CREATE(3,null,0.2);
          if(icon != null){
            console.log("経験値アイコンあった");
            icon.addChildTo(listObj);
          }
        }
        break;
        case "card":
        {
          var cardMasterData = null;
          for (var cm = 0; cm < MASTER_DATA_CARD_MASTER.length; cm++) {
            if(MASTER_DATA_CARD_MASTER[cm]['id'] == dropList[d]['target_id']) {cardMasterData = MASTER_DATA_CARD_MASTER[cm];break;}
          }
          if(cardMasterData != null){
            icon = G_ITEM_ICON_CREATE(2,cardMasterData,0.2,parseInt(dropList[d]['drop_val']));
            if(icon != null){
              icon.addChildTo(listObj);
              //アイコンボタン作成
              icon['button'] = Button({
                width: icon['get_size_width'] * 4,         // 横サイズ
                height: icon['get_size_height'] * 4,        // 縦サイズ
              }).addChildTo(icon);
              icon['button']['master_data'] = cardMasterData;
              icon['button']['list_pos_y'] = 0;
              icon['button'].onpointstart = function(e){
                if(WINDOW_LIST != null) this['list_pos_y'] = WINDOW_LIST['list_base'].y;
              };
              icon['button'].onpointend = function(e){
                if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST != null && this['list_pos_y'] != WINDOW_LIST['list_base'].y) return;
                if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST != null){
                  var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(2,this['master_data'],true); //アイテム詳細ウィンドウ
                  itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
                }
              };
              icon['button'].visible = false;
            }
          }
        }
        break;
        case "item":
        {
          var itemMasterData = null;
          for (var im = 0; im < MASTER_DATA_ITEM_MASTER.length; im++) {
            if(MASTER_DATA_ITEM_MASTER[im]['id'] == dropList[d]['target_id']) {itemMasterData = MASTER_DATA_ITEM_MASTER[im];break;}
          }
          if(itemMasterData != null){
            icon = G_ITEM_ICON_CREATE(0,itemMasterData,0.2,parseInt(dropList[d]['drop_val']));
            if(icon != null){
              icon.addChildTo(listObj);
              //アイコンボタン作成
              icon['button'] = Button({
                width: icon['get_size_width'] * 4,         // 横サイズ
                height: icon['get_size_height'] * 4,        // 縦サイズ
              }).addChildTo(icon);
              icon['button']['master_data'] = itemMasterData;
              icon['button']['list_pos_y'] = 0;
              icon['button'].onpointstart = function(e){
                if(WINDOW_LIST != null) this['list_pos_y'] = WINDOW_LIST['list_base'].y;
              };
              icon['button'].onpointend = function(e){
                if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST != null && this['list_pos_y'] != WINDOW_LIST['list_base'].y) return;
                if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST != null){
                  var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(0,this['master_data'],true); //アイテム詳細ウィンドウ
                  itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
                }
              };
              icon['button'].visible = false;
            }
          }
        }
        break;
        case "equip_item":
        {
          var equipItemMasterData = null;
          for (var im = 0; im < MASTER_DATA_EQUIP_ITEM_MASTER.length; im++) {
            if(MASTER_DATA_EQUIP_ITEM_MASTER[im]['id'] == dropList[d]['target_id']) {equipItemMasterData = MASTER_DATA_EQUIP_ITEM_MASTER[im];break;}
          }
          if(equipItemMasterData != null){
            icon = G_ITEM_ICON_CREATE(1,equipItemMasterData,0.2,parseInt(dropList[d]['drop_val']));
            if(icon != null){
              icon.addChildTo(listObj);
              //アイコンボタン作成
              icon['button'] = Button({
                width: icon['get_size_width'] * 4,         // 横サイズ
                height: icon['get_size_height'] * 4,        // 縦サイズ
              }).addChildTo(icon);
              icon['button']['master_data'] = equipItemMasterData;
              icon['button']['list_pos_y'] = 0;
              icon['button'].onpointstart = function(e){
                if(WINDOW_LIST != null) this['list_pos_y'] = WINDOW_LIST['list_base'].y;
              };
              icon['button'].onpointend = function(e){
                if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
                if(WINDOW_LIST != null && this['list_pos_y'] != WINDOW_LIST['list_base'].y) return;
                if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST != null){
                  var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(1,this['master_data'],true); //アイテム詳細ウィンドウ
                  itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
                }
              };
              icon['button'].visible = false;
            }
          }
        }
        break;
        default:
        break;
      }
      if(icon != null){ //共通処理
        icon.y = iconPosY;
        if(d == 0 || iconIncrementCount == 0) {
          iconPosX = -1 * ((parseFloat(icon['get_size_width']) * 2) - (parseFloat(icon['get_size_width']) * 0.2));
          icon.x = icon.x + iconPosX;
        }
        else{
          iconPosX = iconPosX + (parseFloat(icon['get_size_width']) + (parseFloat(icon['get_size_width']) * 0.2));
          icon.x = icon.x + iconPosX;
        }
        iconIncrementCount = iconIncrementCount + 1;
        if(4 <= iconIncrementCount){
          iconIncrementCount = 0;
          iconPosY = iconPosY + (parseFloat(icon['get_size_height']) * 1.2);
        }
      }
      listEndPos = iconPosY;
    }
  }
  listObjHeightSize = (listEndPos - listStartPos) + 256;
  listObj.y = listObj.y - ((listObjHeightSize / 2) - 128);
  var checkList = new Array();
  checkList[checkList.length] = "close_item_info_window";
  G_UI_CREATE_LIST(POINT_RANKING_WINDOW_LAYER,listObj,listObjHeightSize,"ランキング報酬","閉じる",checkList);
}


//報酬獲得ウィンドウを作成
function G_POINT_RANKING_CREATEREWARD_WINDOW(dropData){
  //エフェクト背景を表示
  var dropItemBg = G_ASSET_GET_SPRITE_ANIM("ui_effect_1",15,true,false,512,512,false,-1,0);
  dropItemBg.loopStartFrameIndex(15);
  //アイテムアイコン表示
  switch (dropData['type']) {
    case "exp":
    {
      icon = G_ITEM_ICON_CREATE(3,null,0.3);
      if(icon != null){
        icon.addChildTo(dropItemBg);
      }
    }
    break;
    case "card":
    {
      var cardMasterData = null;
      for (var cm = 0; cm < MASTER_DATA_CARD_MASTER.length; cm++) {
        if(MASTER_DATA_CARD_MASTER[cm]['id'] == dropData['target_id']) {cardMasterData = MASTER_DATA_CARD_MASTER[cm];break;}
      }
      if(cardMasterData != null){
        icon = G_ITEM_ICON_CREATE(2,cardMasterData,0.25,parseInt(dropData['drop_val']));
        if(icon != null){
          icon.addChildTo(dropItemBg);
          //アイコンボタン作成
          icon['button'] = Button({
            width: icon['get_size_width'] * 4,         // 横サイズ
            height: icon['get_size_height'] * 4,        // 縦サイズ
          }).addChildTo(icon);
          icon['button']['master_data'] = cardMasterData;
          icon['button']['list_pos_y'] = 0;
          icon['button'].onpointend = function(e){
            if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
            if(NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST == null){
              var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(2,this['master_data'],true); //アイテム詳細ウィンドウ
              itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
            }
          };
          icon['button'].visible = false;
        }
      }
    }
    break;
    case "item":
    {
      var itemMasterData = null;
      for (var im = 0; im < MASTER_DATA_ITEM_MASTER.length; im++) {
        if(MASTER_DATA_ITEM_MASTER[im]['id'] == dropData['target_id']) {itemMasterData = MASTER_DATA_ITEM_MASTER[im];break;}
      }
      if(itemMasterData != null){
        icon = G_ITEM_ICON_CREATE(0,itemMasterData,0.25,parseInt(dropData['drop_val']));
        if(icon != null){
          icon.addChildTo(dropItemBg);
          //アイコンボタン作成
          icon['button'] = Button({
            width: icon['get_size_width'] * 4,         // 横サイズ
            height: icon['get_size_height'] * 4,        // 縦サイズ
          }).addChildTo(icon);
          icon['button']['master_data'] = itemMasterData;
          icon['button']['list_pos_y'] = 0;
          icon['button'].onpointend = function(e){
            if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
            if(NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST == null){
              var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(0,this['master_data'],true); //アイテム詳細ウィンドウ
              itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
            }
          };
          icon['button'].visible = false;
        }
      }
    }
    break;
    case "equip_item":
    {
      var equipItemMasterData = null;
      for (var im = 0; im < MASTER_DATA_EQUIP_ITEM_MASTER.length; im++) {
        if(MASTER_DATA_EQUIP_ITEM_MASTER[im]['id'] == dropData['target_id']) {equipItemMasterData = MASTER_DATA_EQUIP_ITEM_MASTER[im];break;}
      }
      if(equipItemMasterData != null){
        icon = G_ITEM_ICON_CREATE(1,equipItemMasterData,0.25,parseInt(dropData['drop_val']));
        if(icon != null){
          icon.addChildTo(dropItemBg);
          //アイコンボタン作成
          icon['button'] = Button({
            width: icon['get_size_width'] * 4,         // 横サイズ
            height: icon['get_size_height'] * 4,        // 縦サイズ
          }).addChildTo(icon);
          icon['button']['master_data'] = equipItemMasterData;
          icon['button']['list_pos_y'] = 0;
          icon['button'].onpointend = function(e){
            if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
            if(NETWORK_IS_CONNECTING == false && ITEM_INFO_WINDOW == null && WINDOW_LIST == null){
              var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(1,this['master_data'],true); //アイテム詳細ウィンドウ
              itemInfoWIndow.addChildTo(POINT_RANKING_WINDOW_LAYER);
            }
          };
          icon['button'].visible = false;
        }
      }
    }
    break;
    default:
    break;
  }
  G_NORMAL_WINDOW_CREATE(POINT_RANKING_WINDOW_LAYER,"報酬獲得","",2,"getRewardWindow_" + POINT_RANKING_OPEN_REWARD_WINDOW_COUNT,1);
  dropItemBg.addChildTo(WINDOW_NORMAL);
  POINT_RANKING_OPEN_REWARD_WINDOW_COUNT = POINT_RANKING_OPEN_REWARD_WINDOW_COUNT + 1;
}
