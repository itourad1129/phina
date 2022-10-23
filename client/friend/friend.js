//============================================
//  フレンドシーン
//============================================
//パブリック変数定義
var FRIEND_PLAYER_INFO = null; //プレイヤー情報
var FRIEND_LIST_OBJ = null; //パーティ表示用リスト
var FRIEND_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
var FRIEND_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
var FRIEND_HEADER_SPRITE = null; //ヘッダーのスプライト
var FRIEND_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var FRIEND_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var FRIEND_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var FRIEND_LIST_HOME_POS_Y = 0; //リストの初期Y座標
var FRIEND_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
var FRIEND_LIST_LAYER = null; //リスト用レイヤー
var FRIEND_UI_LAYER = null; //UI用レイヤー
var FRIEND_RIGHT_BUTTON_PUSH_NUMBER = -1; //押した右ボタンの番号
var FRIEND_SCENE_INIT_FLAG = false; //シーン初期化判定
var FRIEND_MY_FRIEND_DATAS = null; //オススメパーティデータ
var FRIEND_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
var FRIEND_SELECT_FRIEND_INFO_ID = -1; //パーティ情報選択時のパーティID
var FRIEND_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
var FRIEND_UPDATE_FRIEND_DATAS = null; //パーティリスト更新用パーティデータ
var FRIEND_SELECT_FRIEND_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
var FRIEND_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
var FRIEND_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
var FRIEND_SEARCH_WINDOW_MASK = null; //パーティ検索ウィンドウマスク
var FRIEND_SEARCH_WINDOW = null; //パーティ検索ウィンドウ
var FRIEND_SEARCH_WINDOW_TITLE_LABEL = null; //パーティ検索ウィンドウタイトルラベル
var FRIEND_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //パーティ検索ウィンドウ本文ラベル
var FRIEND_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null; //パーティ検索テキスト入力用BOXボタン
var FRIEND_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //パーティ検索テキスト入力用検索実行ボタン
var FRIEND_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //パーティ検索フレンド検索実行ボタン
var FRIEND_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //パーティ検索オススメ検索実行ボタン
var FRIEND_SEARCH_WINDOW_CLOSE_BUTTON = null; //パーティ検索ウィンドウ閉じるボタン
var FRIEND_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //パーティ検索ウィンドウで入力した検索ワードの文字列
var FRIEND_SETTING_WINDOW = null; //パーティ設定ウィンドウ本体
var FRIEND_SETTING_WINDOW_MASK = null; //パーティ設定ウィンドウマスク
var FRIEND_SETTING_WINDOW_TITLE_LABEL = null; //パーティ設定ウィンドウタイトルラベル
var FRIEND_SETTING_WINDOW_MAIN_TEXT_LABEL = null; //パーティ設定ウィンドウ項目本文ラベル
var FRIEND_SETTING_WINDOW_FRIEND_SCOUT_VISIBLE_BUTTON = null; //パーティ設定ウィンドウ、パーティー募集切り替えボタン
var FRIEND_SETTING_WINDOW_FRIEND_LEADER_CHANGE_BUTTON = null; //パーティ設定ウィンドウ、リーダー変更ボタン
var FRIEND_SETTING_WINDOW_FRIEND_CHANGE_FORMATION_BUTTON = null; //パーティ設定ウィンドウ、隊形変更ボタン
var FRIEND_SETTING_WINDOW_FRIEND_MIN_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最低レベル変更ボタン
var FRIEND_SETTING_WINDOW_FRIEND_MAX_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最大レベル変更ボタン
var FRIEND_SETTING_WINDOW_FRIEND_CHANGE_COMMENT_BUTTON = null; //パーティ設定ウィンドウ、募集文変更コメントボタン
var FRIEND_SETTING_WINDOW_DECISION_BUTTON = null; //パーティ設定ウィンドウ、決定ボタン
var FRIEND_SETTING_WINDOW_CLOSE_BUTTON = null; //パーティ設定ウィンドウ、閉じるボタン
var FRIEND_COMMENT_EDIT_WINDOW_MASK = null; //コメント編集ウィンドウのマスク
var FRIEND_COMMENT_EDIT_WINDOW = null; //コメント編集ウィンドウ
var FRIEND_COMMENT_EDIT_WINDOW_TEXT = null; //コメント編集ウィンドウテキスト
var FRIEND_COMMENT_EDIT_WINDOW_CLOSE_BTN = null; //コメント編集ウィンドウ閉じるボタン
var FRIEND_COMMENT_EDIT_WINDOW_EDIT_BTN = null; //コメント編集ウィンドウ編集ボタン
var FRIEND_COMMENT_EDIT_WINDOW_DECISION_BTN = null; //コメント編集ウィンドウ決定ボタン
var FRIEND_SCENE_CHANGE_ANIM_STEP = -1; //シーン切り替え時のアニメステップ
var FRIEND_PLAYER_LIST_AVATAR_ASSET_DATA = null; //アバターの読み込みに必要なアセット情報
phina.define("Friend", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "friend";
    //メンバー初期化
    FRIEND_LIST_TOUCH_AREA = null; //リストタッチ範囲
    FRIEND_LIST_OBJ = null; //パーティ表示用リスト
    FRIEND_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
    FRIEND_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
    FRIEND_HEADER_SPRITE = null; //ヘッダーのスプライト
    FRIEND_LIST_SCROLLE_START = 0;//スクロールのスタート位置
    FRIEND_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    FRIEND_LIST_HOME_POS_Y = 0; //リストの初期Y座標
    FRIEND_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
    FRIEND_LIST_LAYER = null; //リスト用レイヤー
    FRIEND_UI_LAYER = null; //UI用レイヤー
    FRIEND_SCENE_INIT_FLAG = false; //シーン初期化判定
    RIEND_MY_FRIEND_DATAS = null; //オススメパーティデータ
    FRIEND_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
    FRIEND_SELECT_FRIEND_INFO_ID = -1; //パーティ情報選択時のパーティID
    FRIEND_PLAYER_INFO = null; //プレイヤー情報
    FRIEND_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
    FRIEND_UPDATE_FRIEND_DATAS = null; //パーティリスト更新用パーティデータ
    FRIEND_SELECT_FRIEND_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
    FRIEND_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
    FRIEND_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
    FRIEND_SEARCH_WINDOW_MASK = null; //パーティ検索ウィンドウマスク
    FRIEND_SEARCH_WINDOW = null; //パーティ検索ウィンドウ
    FRIEND_SEARCH_WINDOW_TITLE_LABEL = null; //パーティ検索ウィンドウタイトルラベル
    FRIEND_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //パーティ検索ウィンドウ本文ラベル
    FRIEND_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null; //パーティ検索テキスト入力用BOXボタン
    FRIEND_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //パーティ検索テキスト入力用検索実行ボタン
    FRIEND_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //パーティ検索フレンド検索実行ボタン
    FRIEND_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //パーティ検索オススメ検索実行ボタン
    FRIEND_SEARCH_WINDOW_CLOSE_BUTTON = null; //パーティ検索ウィンドウ閉じるボタン
    FRIEND_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //パーティ検索ウィンドウで入力した検索ワードの文字列
    FRIEND_SETTING_WINDOW_TITLE_LABEL = null; //パーティ設定ウィンドウタイトルラベル
    FRIEND_SETTING_WINDOW_MAIN_TEXT_LABEL = null; //パーティ設定ウィンドウ項目本文ラベル
    FRIEND_SETTING_WINDOW_FRIEND_SCOUT_VISIBLE_BUTTON = null; //パーティ設定ウィンドウ、パーティー募集切り替えボタン
    FRIEND_SETTING_WINDOW_FRIEND_LEADER_CHANGE_BUTTON = null; //パーティ設定ウィンドウ、リーダー変更ボタン
    FRIEND_SETTING_WINDOW_FRIEND_CHANGE_FORMATION_BUTTON = null; //パーティ設定ウィンドウ、隊形変更ボタン
    FRIEND_SETTING_WINDOW_FRIEND_MIN_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最低レベル変更ボタン
    FRIEND_SETTING_WINDOW_FRIEND_MAX_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最大レベル変更ボタン
    FRIEND_SETTING_WINDOW_FRIEND_CHANGE_COMMENT_BUTTON = null; //パーティ設定ウィンドウ、募集文変更コメントボタン
    FRIEND_SETTING_WINDOW_DECISION_BUTTON = null; //パーティ設定ウィンドウ、決定ボタン
    FRIEND_SETTING_WINDOW_CLOSE_BUTTON = null; //パーティ設定ウィンドウ、閉じるボタン
    FRIEND_COMMENT_EDIT_WINDOW_MASK = null; //コメント編集ウィンドウのマスク
    FRIEND_COMMENT_EDIT_WINDOW = null; //コメント編集ウィンドウ
    FRIEND_COMMENT_EDIT_WINDOW_TEXT = null; //コメント編集ウィンドウテキスト
    FRIEND_COMMENT_EDIT_WINDOW_CLOSE_BTN = null; //コメント編集ウィンドウ閉じるボタン
    FRIEND_COMMENT_EDIT_WINDOW_EDIT_BTN = null; //コメント編集ウィンドウ編集ボタン
    FRIEND_COMMENT_EDIT_WINDOW_DECISION_BTN = null; //コメント編集ウィンドウ決定ボタン
    FRIEND_SCENE_CHANGE_ANIM_STEP = -1; //シーン切り替え時のアニメステップ
    FRIEND_PLAYER_LIST_AVATAR_ASSET_DATA = null; //アバターの読み込みに必要なアセット情報
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    FRIEND_LIST_LAYER = PlainElement({
    }).addChildTo(this);

    FRIEND_LIST_TOUCH_AREA = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(FRIEND_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    FRIEND_LIST_TOUCH_AREA.setInteractive(true);

    FRIEND_LIST_OBJ = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(FRIEND_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    FRIEND_LIST_OBJ_Y_POS_INIT = FRIEND_LIST_OBJ.y;

    FRIEND_UI_LAYER = PlainElement({
    }).addChildTo(this);

    FRIEND_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    //リストが0の時表示するラベル
    FRIEND_LIST_COUNT_ZERO_LABEL = Label({
      text: '条件に当てはまる\nプレイヤーは存在しません。',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FRIEND_LIST_LAYER);

    FRIEND_LIST_COUNT_ZERO_LABEL.y = this.gridY.center();
    FRIEND_LIST_COUNT_ZERO_LABEL.x = this.gridX.center();
    FRIEND_LIST_COUNT_ZERO_LABEL.y = FRIEND_LIST_COUNT_ZERO_LABEL.y - (SCREEN_HEIGHT / 5);
    FRIEND_LIST_COUNT_ZERO_LABEL.x = FRIEND_LIST_COUNT_ZERO_LABEL.x - (SCREEN_WIDTH / 5);
    FRIEND_LIST_COUNT_ZERO_LABEL.visible = false;

    //ヘッダー表示
    FRIEND_HEADER_SPRITE = Sprite('ASSET_34').addChildTo(FRIEND_UI_LAYER);
    FRIEND_HEADER_SPRITE.x = this.gridX.center();
    FRIEND_HEADER_SPRITE.y = FRIEND_HEADER_SPRITE.height / 2;

    Label({
      text: 'フレンド',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FRIEND_HEADER_SPRITE);

    //ボタンを生
    var rightBtnPosY = 0;
    for (var btn = 0; btn < 5; btn++) {
      //ボタン画像生成
      FRIEND_RIGHT_BUTTONS[btn] = Sprite('ASSET_163').addChildTo(FRIEND_UI_LAYER);
      if(btn == 0) rightBtnPosY = (FRIEND_HEADER_SPRITE.y + FRIEND_HEADER_SPRITE.height);
      else rightBtnPosY = (rightBtnPosY + ((FRIEND_RIGHT_BUTTONS[btn].height) * 1.05));
      FRIEND_RIGHT_BUTTONS[btn].y = rightBtnPosY;
      FRIEND_RIGHT_BUTTONS[btn].x = this.gridX.center();
      FRIEND_RIGHT_BUTTONS[btn].x = (FRIEND_RIGHT_BUTTONS[btn].x + (SCREEN_WIDTH / 2)) - (FRIEND_RIGHT_BUTTONS[btn].width / 2);
      //ボタンテキスト生成
      FRIEND_RIGHT_BUTTONS[btn]['btn_text'] = Label({
        text: '',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(FRIEND_RIGHT_BUTTONS[btn]);
      //ボタン本体生成
      FRIEND_RIGHT_BUTTONS[btn]['btn'] = Button({
        width: 240,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(FRIEND_RIGHT_BUTTONS[btn]);
      FRIEND_RIGHT_BUTTONS[btn]['btn']['btn_number'] = btn;
      FRIEND_RIGHT_BUTTONS[btn]['btn']['btn_active_flag'] = true;
      FRIEND_RIGHT_BUTTONS[btn]['btn'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null
          && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && FRIEND_SEARCH_WINDOW == null && FRIEND_SETTING_WINDOW == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(!this['btn_active_flag']) return;
          FRIEND_RIGHT_BUTTON_PUSH_NUMBER = this['btn_number'];
        }
      };
      FRIEND_RIGHT_BUTTONS[btn]['btn'].visible = false;
    }
    //各ボタンのテキストを更新
    G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(0,"戻る");
    G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(1,"マイフレンド");
    G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(2,"フレンド申請承認");
    G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(3,"フレンド申請削除");
    G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(4,"ブラックリスト管理");

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['friend_scene_init'] = 1; //自分のIDを設定
    ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
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
        if(json["session_status"] == 0 ){ //セッションチェック完了
          if(isset(json['player_info'])){
            FRIEND_PLAYER_INFO = json['player_info'];
          }
          if(isset(json['result_player_list_avatar_asset_datas'])){ //アバター表示に必要なプレイヤーデータ
            FRIEND_PLAYER_LIST_AVATAR_ASSET_DATA = json['result_player_list_avatar_asset_datas'];
          }
          if(isset(json['result_friend_scene_init'])){ //シーン初期化処理
            if(isset(json['result_friend_scene_init']['my_friend_datas']))
            FRIEND_UPDATE_FRIEND_DATAS = json['result_friend_scene_init']['my_friend_datas'];
            FRIEND_MY_FRIEND_DATAS = json['result_friend_scene_init']['my_friend_datas'];
          }
          if(isset(json['result_my_friend_datas'])){ //フレンドリストを取得
            FRIEND_UPDATE_FRIEND_DATAS = json['result_my_friend_datas'];
            FRIEND_MY_FRIEND_DATAS = json['result_my_friend_datas'];
            if(FRIEND_SCENE_INIT_FLAG == true){
              G_FRIEND_LIST_DELETE();
              G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
            }
          }
          if(isset(json['result_friend_request_datas'])){ //フレンド申請一覧を取得
            FRIEND_UPDATE_FRIEND_DATAS = json['result_friend_request_datas'];
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_send_friend_request_datas'])){ //送信したフレンド申請一覧を取得
            FRIEND_UPDATE_FRIEND_DATAS = json['result_send_friend_request_datas'];
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_player_black_list'])){ //ブラックリストを取得
            FRIEND_UPDATE_FRIEND_DATAS = json['result_player_black_list'];
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_delete_friend_list'])){ //フレンドの解除が行われた
            var resultFriendDelete = json['result_delete_friend_list'];
            if(resultFriendDelete == 1){
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンドの解除","フレンドを解除しました。",0,"resultFriendDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンドの解除に失敗しました。\nまたは既にフレンドになっていません。";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンドの解除",errorText,0,"resultFriendDeleteWindowError");
            }
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_friend_application'])){ //フレンド申請を承認した。
            var resultFriendApplication = json['result_friend_application'];
            if(resultFriendApplication['error'] == 0){
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の承認","フレンド申請を承認しました。",0,"resultFriendApplicationWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の承認に失敗しました。\n■エラー内容\n" + resultFriendApplication['error_comment'];
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の承認",errorText,0,"resultFriendApplicationWindowError");
            }
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_delete_friend_application'])){ //フレンド申請の削除が行われた
            var resultFriendApplicationDelete = json['result_delete_friend_application'];
            if(resultFriendApplicationDelete == 1){
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の削除","フレンド申請を削除しました。",0,"resultFriendApplicationDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の削除に失敗しました。\nまたは既に削除されています。";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の削除",errorText,0,"resultFriendApplicationDeleteWindowError");
            }
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_delete_send_friend_application'])){ //フレンド申請を取り消した
            var resultSendFriendApplicationDelete = json['result_delete_send_friend_application'];
            if(resultSendFriendApplicationDelete == 1){
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の取り消し","フレンド申請を取り消しました。",0,"resultSendFriendApplicationDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の取り消しに失敗しました。\nまたは既に削除されています。";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の取り消し",errorText,0,"resultSendFriendApplicationDeleteWindowError");
            }
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
          }
          if(isset(json['result_delete_black_list'])){ //ブラックリストの解除が行われた
            var resultDeleteBlackList = json['result_delete_black_list'];
            if(resultDeleteBlackList == 1){
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"ブラックリストの解除","ブラックリストを解除しました。",0,"resultDeleteBlackListWindowSuccess");
            }
            else
            {
              var errorText = "ブラックリストの解除に失敗しました。\nまたは既に解除されています。";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"ブラックリストの解除",errorText,0,"resultDeleteBlackListWindowError");
            }
            G_FRIEND_LIST_DELETE();
            G_FRIEND_LIST_CREATE(FRIEND_UPDATE_FRIEND_DATAS);
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
    if(FRIEND_SCENE_INIT_FLAG == false && FRIEND_MY_FRIEND_DATAS != null && FRIEND_PLAYER_INFO != null){
      G_FRIEND_LIST_CREATE(FRIEND_MY_FRIEND_DATAS); //初期パーティリスト生成
      FRIEND_SCENE_INIT_FLAG = true;
    }
    //右ボタンのイベント
    if(FRIEND_RIGHT_BUTTON_PUSH_NUMBER != -1){ //ボタンを押した場合
      FRIEND_SELECT_FRIEND_LIST_TYPE = FRIEND_RIGHT_BUTTON_PUSH_NUMBER; //選択したパーティリストタイプを設定
      switch (FRIEND_RIGHT_BUTTON_PUSH_NUMBER) {
        case 0: //戻る
        {
          var prevSceneName = SCENE_MANAGER['prev_scene'];
          SCENE_MANAGER['prev_scene'] = "friend";
          this.exit(prevSceneName);
        }
        break;
        case 1: //マイフレンド
        {
          G_FRIEND_LIST_UPDATE("get_my_friend_datas");
        }
        break;
        case 2: //フレンド承認リスト
        {
          G_FRIEND_LIST_UPDATE("get_friend_request_datas");
        }
        break;
        case 3: //送信したフレンド申請一覧
        {
          G_FRIEND_LIST_UPDATE("get_send_friend_request_datas");
        }
        break;
        case 4: //ブラックリストを取得
        {
          G_FRIEND_LIST_UPDATE("get_player_black_list");
        }
        break;
        default:
        {

        }
        break;
      }
      FRIEND_RIGHT_BUTTON_PUSH_NUMBER = -1;
    }
    //ウィンドウに返し値があった。
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_RETURN_VAL['friendApplicationWindow'] == "yes"){ //フレンド申請を承認した。
        if(NETWORK_IS_CONNECTING == false){
          var postParam = new Object();
          postParam['set_application_friend_id'] = FRIEND_SELECT_FRIEND_INFO_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
        }
      }
      if(WINDOW_RETURN_VAL['partyApplicationCancelWindow'] == "yes"){ //パーティ参加申請を無効にした。
        var postParam = new Object();
        postParam['set_application_cancel'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationCancelWindow'] == "yes"){ //パーティ招待を無効にした。
        var postParam = new Object();
        postParam['set_invitation_cancel'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyApplicationApprovalWindow'] == "yes"){ //パーティ参加申請を承認した。
        var postParam = new Object();
        postParam['set_application_approval'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationApprovalWindow'] == "yes"){ //パーティの招待から参加した。
        var postParam = new Object();
        postParam['set_invitation_approval'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyMemberExpulsionWindow'] == "yes"){ //パーティメンバーを追放した。
        var postParam = new Object();
        postParam['set_party_member_expulsion'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyCheckOutWindow'] == "yes"){ //パーティ離脱処理を実行した。
        var postParam = new Object();
        postParam['set_party_check_out'] = 1;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['moveFormationSceneWindow'] == "yes"){
        FRIEND_SCENE_CHANGE_ANIM_STEP = 0; //シーン切り替えアニメーションを開始
      }
      if(WINDOW_RETURN_VAL['friendDeleteWindow'] == "yes"){ //フレンドを解除した
        var postParam = new Object();
        postParam['set_delete_friend_list'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['friendApplicationDeleteWindow'] == "yes"){ //フレンド申請の削除を行った
        var postParam = new Object();
        postParam['set_delete_friend_application'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['deleteSendFriendApplicationWindow'] == "yes"){ //フレンド申請の取り消しが行われた
        var postParam = new Object();
        postParam['set_delete_send_friend_application'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['deleteBlackListWindow'] == "yes"){ //ブラックリストの解除が行われた
        var postParam = new Object();
        postParam['set_delete_black_list'] = FRIEND_SELECT_FRIEND_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      WINDOW_RETURN_VAL = null;
    }
  },
});

//ボタンのテキストを変更する
function G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(FRIEND_RIGHT_BUTTONS) && isset(FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_FRIEND_LIST_UPDATE(postParamName){ //パーティリストの更新を行う(データをを取得してリストを更新)
  if(NETWORK_IS_CONNECTING == false){
    var friendListUpdateParam = new Object();
    friendListUpdateParam[postParamName] = FRIEND_PLAYER_INFO['player_index_id']; //自分のIDを設定
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/friend/friend.php",friendListUpdateParam); //非同期通信開始
  }
}

//ボタンのテキストを変更する
function G_FRIEND_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(FRIEND_RIGHT_BUTTONS) && isset(FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    FRIEND_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_FRIEND_LIST_CREATE(partyDatas){ //パーティ表示用リストを生成
  var updatePosY = 0;
  var listObjHeightSize = 0;
  if(partyDatas != null && Array.isArray(partyDatas) && isset(partyDatas) && partyDatas.length != 0){ //1つ以上のパーティが存在した場合
    FRIEND_LIST_COUNT_ZERO_LABEL.visible = false;
    for (var i = 0; i < partyDatas.length; i++) {
      //セル本体スプライト
      FRIEND_CELL_SPRITE_ARRAY[i] = Sprite('ASSET_162').addChildTo(FRIEND_LIST_OBJ);
      FRIEND_CELL_SPRITE_ARRAY[i]['player_index_id'] = partyDatas[i]['player_index_id'];
      //パーティ名
      FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'] = Label({
        text: '',
        fontSize: 18,
        fill: 'black',
        align: 'left',
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
      if(isset(partyDatas[i]['player_name'])) FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].text = partyDatas[i]['player_name'];
      FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].x = FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].x - (FRIEND_CELL_SPRITE_ARRAY[i].width / 2.2);
      FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].y = FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].y - (FRIEND_CELL_SPRITE_ARRAY[i].height / 3);
      //アバター
      if(isset(FRIEND_PLAYER_LIST_AVATAR_ASSET_DATA[partyDatas[i]['player_index_id']])) {
        var avatarData = FRIEND_PLAYER_LIST_AVATAR_ASSET_DATA[partyDatas[i]['player_index_id']];
        var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(avatarData['player_avatar_data'],avatarData['player_equip_item_data']);
        FRIEND_CELL_SPRITE_ARRAY[i]['avatar'] = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.225, 0.225, avatarData['player_avatar_data']['visible_head_equip_item']);
        FRIEND_CELL_SPRITE_ARRAY[i]['avatar'].addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
        FRIEND_CELL_SPRITE_ARRAY[i]['avatar'].x = FRIEND_CELL_SPRITE_ARRAY[i]['avatar'].x - (FRIEND_CELL_SPRITE_ARRAY[i].width * 0.33);
        FRIEND_CELL_SPRITE_ARRAY[i]['avatar'].y = FRIEND_CELL_SPRITE_ARRAY[i]['avatar'].y - (FRIEND_CELL_SPRITE_ARRAY[i].height * 0.2);
      }
      //プレイヤープロフィールボタン(アバター画像の上)
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'] = Button({
        width: 140,         // 横サイズ
        height: 140,        // 縦サイズ
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'].x = FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'].x - (FRIEND_CELL_SPRITE_ARRAY[i].width / 3);
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      //タップ開始位置を記録
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointstart = function(e){
        FRIEND_LIST_START_TAP_POS_X = e.pointer.x;
        FRIEND_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && FRIEND_SEARCH_WINDOW == null && FRIEND_SETTING_WINDOW == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(FRIEND_LIST_START_TAP_POS_X != e.pointer.x || FRIEND_LIST_START_TAP_POS_Y != e.pointer.y) return;
          G_UI_CREATE_PLAYER_PROFILE(FRIEND_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        }
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['player_profile_button'].visible = false;
      // パーティリーダーレベル
      FRIEND_CELL_SPRITE_ARRAY[i]['level_label'] = Label({
        text: '',
        fontSize: 24,
        fill: 'black',
        align: 'right',
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
      //PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x = PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 2.2);
      FRIEND_CELL_SPRITE_ARRAY[i]['level_label'].y = FRIEND_CELL_SPRITE_ARRAY[i]['level_label'].y + (FRIEND_CELL_SPRITE_ARRAY[i].height / 3);
      if(isset(partyDatas[i]['player_level'])) FRIEND_CELL_SPRITE_ARRAY[i]['level_label'].text = "LV." + partyDatas[i]['player_level'];

      //ボタン上
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'] = Sprite('ASSET_79').addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x = FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x + (FRIEND_CELL_SPRITE_ARRAY[i].width / 3.7);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y = FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y - (FRIEND_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン上　テキスト
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_text'] = Label({
        text: 'プレイヤー情報',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      //ボタン上本体
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper']['player_name'] = partyDatas[i]['player_name'];
      //タップ開始位置を記録
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper'].onpointstart = function(e){
        FRIEND_LIST_START_TAP_POS_X = e.pointer.x;
        FRIEND_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && FRIEND_SEARCH_WINDOW == null && FRIEND_SETTING_WINDOW == null){
          if(FRIEND_LIST_START_TAP_POS_X != e.pointer.x || FRIEND_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (FRIEND_SELECT_FRIEND_LIST_TYPE) {
            case 1: //マイフレンド
            {
              G_UI_CREATE_PLAYER_PROFILE(FRIEND_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            case 2: //フレンド申請承認
            {
              //フレンド申請の削除
              FRIEND_SELECT_FRIEND_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を削除しますか?";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の削除",windowMainText,1,"friendApplicationDeleteWindow");
            }
            break;
            case 3:
            {
              G_UI_CREATE_PLAYER_PROFILE(FRIEND_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            case 4: //フレンド申請削除
            {
              G_UI_CREATE_PLAYER_PROFILE(FRIEND_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            default:
            break;
          }
        }
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper'].visible = false;

      //ボタン下
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'] = Sprite('ASSET_79').addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x = FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x + (FRIEND_CELL_SPRITE_ARRAY[i].width / 3.7);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y = FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y + (FRIEND_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン下　テキスト
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'] = Label({
        text: 'フレンド解除',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      //ボタン下本体
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom']['player_name'] = partyDatas[i]['player_name'];
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom']['party_name'] = FRIEND_CELL_SPRITE_ARRAY[i]['party_name_label'].text;
      //タップ開始位置を記録
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointstart = function(e){
        FRIEND_LIST_START_TAP_POS_X = e.pointer.x;
        FRIEND_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && FRIEND_SEARCH_WINDOW == null && FRIEND_SETTING_WINDOW == null){
          if(FRIEND_LIST_START_TAP_POS_X != e.pointer.x || FRIEND_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (FRIEND_SELECT_FRIEND_LIST_TYPE) {
            case 1: //マイフレンド
            {
              //フレンド除外確認ウィンドウを表示
              FRIEND_SELECT_FRIEND_INFO_ID = this['select_party_index_id']; //解除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンドを解除しますか?";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンドの解除",windowMainText,1,"friendDeleteWindow");
            }
            break;
            case 2: //フレンド申請承認
            {
              //申請承認用ウィンドウを生成
              FRIEND_SELECT_FRIEND_INFO_ID = this['select_party_index_id']; //承認するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を承認しますか?";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の承認",windowMainText,1,"friendApplicationWindow");
            }
            break;
            case 3: //フレンド申請の取り消し
            {
              //フレンド申請取り消し用ウィンドウを生成
              FRIEND_SELECT_FRIEND_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を取り消しますか?";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"フレンド申請の取り消し",windowMainText,1,"deleteSendFriendApplicationWindow");
            }
            break;
            case 4: //ブレックリスト管理
            {
              //ブレックリスト管理用ウィンドウを生成
              FRIEND_SELECT_FRIEND_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nブラックリストを解除しますか?";
              G_NORMAL_WINDOW_CREATE(FRIEND_WINDOW_LAYER,"ブラックリストの解除",windowMainText,1,"deleteBlackListWindow");
            }
            break;
            default:
            break;
          }
        }
      };
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom'].visible = false;
      //パーツの初期化
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].alpha = 1;
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_text'].fontSize = 20;
      FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 18;
      FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].alpha = 1;
      //パーティ情報セル更新処理
      switch (FRIEND_SELECT_FRIEND_LIST_TYPE) {
        case 1: //マイフレンド
        {
        }
        break;
        case 2://フレンド申請承認
        {
          FRIEND_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "申請削除";
          FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請承認";
        }
        break;
        case 3: //フレンド申請削除
        {
          FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請削除";
        }
        break;
        case 4: //ブラックリスト管理
        {
          FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "ブラックリスト解除";
          FRIEND_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 16;
        }
        break;
        default:
        {

        }
        break;
      }
      //リストスワイプ処理
      if(i== 0){ FRIEND_CELL_SPRITE_ARRAY[i].y = (FRIEND_CELL_SPRITE_ARRAY[i].y - (SCREEN_HEIGHT / 2)) + ((FRIEND_CELL_SPRITE_ARRAY[i].height / 2) + FRIEND_HEADER_SPRITE.height);
        updatePosY = FRIEND_CELL_SPRITE_ARRAY[i].y;
      }
      else updatePosY = updatePosY + FRIEND_CELL_SPRITE_ARRAY[i].height;
      FRIEND_CELL_SPRITE_ARRAY[i].y = updatePosY;
      listObjHeightSize = listObjHeightSize + FRIEND_CELL_SPRITE_ARRAY[i].height;
    }
    if(FRIEND_CELL_SPRITE_ARRAY.length != 0){ //パーティが存在した場合
      //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
      FRIEND_LIST_HOME_POS_Y = FRIEND_LIST_OBJ.y; //初期座標を更新
      var listTopPos = (SCREEN_HEIGHT / 2) + FRIEND_HEADER_SPRITE.height; //リストの頂点を取得;
      FRIEND_LIST_TOUCH_AREA.update = function() {
        FRIEND_LIST_TOUCH_AREA.onpointstart = function(e){
          FRIEND_LIST_SCROLLE_START = e.pointer.y;
        };
        FRIEND_LIST_TOUCH_AREA.onpointmove = function(e){
          FRIEND_LIST_SCROLLE_MOVE = e.pointer.y;
          if(FRIEND_LIST_SCROLLE_START < FRIEND_LIST_SCROLLE_MOVE){//下
            FRIEND_LIST_OBJ.y += e.pointer.dy;
            if(FRIEND_LIST_HOME_POS_Y < FRIEND_LIST_OBJ.y) FRIEND_LIST_OBJ.y = FRIEND_LIST_HOME_POS_Y;
          }
          if(FRIEND_LIST_SCROLLE_START > FRIEND_LIST_SCROLLE_MOVE){//上
            var nowYPos = FRIEND_LIST_OBJ.y;
            FRIEND_LIST_OBJ.y += e.pointer.dy;
            var lastCellPosY = FRIEND_LIST_OBJ.y + FRIEND_CELL_SPRITE_ARRAY[FRIEND_CELL_SPRITE_ARRAY.length - 1].y; //最後のセルのポジションを取得
            var swipeMaxAreaPosY = SCREEN_HEIGHT - (FRIEND_CELL_SPRITE_ARRAY[FRIEND_CELL_SPRITE_ARRAY.length - 1].height / 2);
            if(swipeMaxAreaPosY > lastCellPosY) FRIEND_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
          }
        };
        FRIEND_LIST_TOUCH_AREA.onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          FRIEND_LIST_SCROLLE_START = 0;
          FRIEND_LIST_SCROLLE_MOVE = 0;
        };
      }
    }
  }
  else{ //表示可能なパーティが存在しなかった。
    if(FRIEND_LIST_COUNT_ZERO_LABEL != null){
      FRIEND_LIST_COUNT_ZERO_LABEL.visible = true;
    }
  }
}

function G_FRIEND_LIST_DELETE(){ //フレンドリストを削除する。
  if(FRIEND_CELL_SPRITE_ARRAY.length != 0){
    for (var i = 0; i < FRIEND_CELL_SPRITE_ARRAY.length; i++) {
      FRIEND_CELL_SPRITE_ARRAY[i].remove();
      FRIEND_CELL_SPRITE_ARRAY[i] = null;
    }
    FRIEND_CELL_SPRITE_ARRAY = new Array();
  }
  FRIEND_LIST_OBJ.y = FRIEND_LIST_OBJ_Y_POS_INIT; //Y座標を初期位置に戻す
}
