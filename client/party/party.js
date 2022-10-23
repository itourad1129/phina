//============================================
//  パーティシーン
//============================================
//パブリック変数定義
var PARTY_PLAYER_INFO = null; //プレイヤー情報
var PARTY_LIST_OBJ = null; //パーティ表示用リスト
var PARTY_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
var PARTY_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
var PARTY_HEADER_SPRITE = null; //ヘッダーのスプライト
var PARTY_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var PARTY_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var PARTY_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var PARTY_LIST_HOME_POS_Y = 0; //リストの初期Y座標
var PARTY_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
var PARTY_LIST_LAYER = null; //リスト用レイヤー
var PARTY_UI_LAYER = null; //UI用レイヤー
var PARTY_RIGHT_BUTTON_PUSH_NUMBER = -1; //押した右ボタンの番号
var PARTY_SCENE_INIT_FLAG = false; //シーン初期化判定
var PARTY_RECOMMENDATION_PARTY_DATAS = null; //オススメパーティデータ
var PARTY_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
var PARTY_SELECT_PARTY_INFO_ID = -1; //パーティ情報選択時のパーティID
var PARTY_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
var PARTY_UPDATE_PARTY_DATAS = null; //パーティリスト更新用パーティデータ
var PARTY_SELECT_PARTY_LIST_TYPE = 2; //選択したパーティリスト (初期はオススメパーティ)
var PARTY_SELECT_APPLICATION_PARTY_ID = -1;//選択中の申請を行うパーティID
var PARTY_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
var PARTY_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
var PARTY_SEARCH_WINDOW_MASK = null; //パーティ検索ウィンドウマスク
var PARTY_SEARCH_WINDOW = null; //パーティ検索ウィンドウ
var PARTY_SEARCH_WINDOW_TITLE_LABEL = null; //パーティ検索ウィンドウタイトルラベル
var PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //パーティ検索ウィンドウ本文ラベル
var PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null; //パーティ検索テキスト入力用BOXボタン
var PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //パーティ検索テキスト入力用検索実行ボタン
var PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //パーティ検索フレンド検索実行ボタン
var PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //パーティ検索オススメ検索実行ボタン
var PARTY_SEARCH_WINDOW_CLOSE_BUTTON = null; //パーティ検索ウィンドウ閉じるボタン
var PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //パーティ検索ウィンドウで入力した検索ワードの文字列
var PARTY_SETTING_WINDOW = null; //パーティ設定ウィンドウ本体
var PARTY_SETTING_WINDOW_MASK = null; //パーティ設定ウィンドウマスク
var PARTY_SETTING_WINDOW_TITLE_LABEL = null; //パーティ設定ウィンドウタイトルラベル
var PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL = null; //パーティ設定ウィンドウ項目本文ラベル
var PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON = null; //パーティ設定ウィンドウ、パーティー募集切り替えボタン
var PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON = null; //パーティ設定ウィンドウ、リーダー変更ボタン
var PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON = null; //パーティ設定ウィンドウ、隊形変更ボタン
var PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最低レベル変更ボタン
var PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最大レベル変更ボタン
var PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON = null; //パーティ設定ウィンドウ、募集文変更コメントボタン
var PARTY_SETTING_WINDOW_DECISION_BUTTON = null; //パーティ設定ウィンドウ、決定ボタン
var PARTY_SETTING_WINDOW_CLOSE_BUTTON = null; //パーティ設定ウィンドウ、閉じるボタン
var PARTY_COMMENT_EDIT_WINDOW_MASK = null; //コメント編集ウィンドウのマスク
var PARTY_COMMENT_EDIT_WINDOW = null; //コメント編集ウィンドウ
var PARTY_COMMENT_EDIT_WINDOW_TEXT = null; //コメント編集ウィンドウテキスト
var PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN = null; //コメント編集ウィンドウ閉じるボタン
var PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN = null; //コメント編集ウィンドウ編集ボタン
var PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN = null; //コメント編集ウィンドウ決定ボタン
var PARTY_SCENE_CHANGE_ANIM_STEP = -1; //シーン切り替え時のアニメステップ
var PARTY_PLAYER_LIST_AVATAR_ASSET_DATA = null; //アバターの読み込みに必要なアセット情報

phina.define("Party", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "party";
    //メンバー初期化
    PARTY_LIST_TOUCH_AREA = null; //リストタッチ範囲
    PARTY_LIST_OBJ = null; //パーティ表示用リスト
    PARTY_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
    PARTY_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
    PARTY_HEADER_SPRITE = null; //ヘッダーのスプライト
    PARTY_LIST_SCROLLE_START = 0;//スクロールのスタート位置
    PARTY_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    PARTY_LIST_HOME_POS_Y = 0; //リストの初期Y座標
    PARTY_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
    PARTY_LIST_LAYER = null; //リスト用レイヤー
    PARTY_UI_LAYER = null; //UI用レイヤー
    PARTY_SCENE_INIT_FLAG = false; //シーン初期化判定
    PARTY_RECOMMENDATION_PARTY_DATAS = null; //オススメパーティデータ
    PARTY_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
    PARTY_SELECT_PARTY_INFO_ID = -1; //パーティ情報選択時のパーティID
    PARTY_PLAYER_INFO = null; //プレイヤー情報
    PARTY_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
    PARTY_UPDATE_PARTY_DATAS = null; //パーティリスト更新用パーティデータ
    PARTY_SELECT_PARTY_LIST_TYPE = 2; //選択したパーティリスト (初期はオススメパーティ)
    PARTY_SELECT_APPLICATION_PARTY_ID = -1;//選択中の申請を行うパーティID
    PARTY_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
    PARTY_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
    PARTY_SEARCH_WINDOW_MASK = null; //パーティ検索ウィンドウマスク
    PARTY_SEARCH_WINDOW = null; //パーティ検索ウィンドウ
    PARTY_SEARCH_WINDOW_TITLE_LABEL = null; //パーティ検索ウィンドウタイトルラベル
    PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //パーティ検索ウィンドウ本文ラベル
    PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null; //パーティ検索テキスト入力用BOXボタン
    PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //パーティ検索テキスト入力用検索実行ボタン
    PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //パーティ検索フレンド検索実行ボタン
    PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //パーティ検索オススメ検索実行ボタン
    PARTY_SEARCH_WINDOW_CLOSE_BUTTON = null; //パーティ検索ウィンドウ閉じるボタン
    PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //パーティ検索ウィンドウで入力した検索ワードの文字列
    PARTY_SETTING_WINDOW_TITLE_LABEL = null; //パーティ設定ウィンドウタイトルラベル
    PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL = null; //パーティ設定ウィンドウ項目本文ラベル
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON = null; //パーティ設定ウィンドウ、パーティー募集切り替えボタン
    PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON = null; //パーティ設定ウィンドウ、リーダー変更ボタン
    PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON = null; //パーティ設定ウィンドウ、隊形変更ボタン
    PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最低レベル変更ボタン
    PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON = null; //パーティ設定ウィンドウ、最大レベル変更ボタン
    PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON = null; //パーティ設定ウィンドウ、募集文変更コメントボタン
    PARTY_SETTING_WINDOW_DECISION_BUTTON = null; //パーティ設定ウィンドウ、決定ボタン
    PARTY_SETTING_WINDOW_CLOSE_BUTTON = null; //パーティ設定ウィンドウ、閉じるボタン
    PARTY_COMMENT_EDIT_WINDOW_MASK = null; //コメント編集ウィンドウのマスク
    PARTY_COMMENT_EDIT_WINDOW = null; //コメント編集ウィンドウ
    PARTY_COMMENT_EDIT_WINDOW_TEXT = null; //コメント編集ウィンドウテキスト
    PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN = null; //コメント編集ウィンドウ閉じるボタン
    PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN = null; //コメント編集ウィンドウ編集ボタン
    PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN = null; //コメント編集ウィンドウ決定ボタン
    PARTY_SCENE_CHANGE_ANIM_STEP = -1; //シーン切り替え時のアニメステップ
    PARTY_PLAYER_LIST_AVATAR_ASSET_DATA = null; //アバターの読み込みに必要なアセット情報

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    PARTY_LIST_LAYER = PlainElement({
    }).addChildTo(this);

    PARTY_LIST_TOUCH_AREA = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(PARTY_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    PARTY_LIST_TOUCH_AREA.setInteractive(true);

    PARTY_LIST_OBJ = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(PARTY_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    PARTY_LIST_OBJ_Y_POS_INIT = PARTY_LIST_OBJ.y;

    PARTY_UI_LAYER = PlainElement({
    }).addChildTo(this);

    PARTY_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    //リストが0の時表示するラベル
    PARTY_LIST_COUNT_ZERO_LABEL = Label({
      text: '条件に当てはまる\nパーティは存在しません。',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(PARTY_LIST_LAYER);

    PARTY_LIST_COUNT_ZERO_LABEL.y = this.gridY.center();
    PARTY_LIST_COUNT_ZERO_LABEL.x = this.gridX.center();
    PARTY_LIST_COUNT_ZERO_LABEL.y = PARTY_LIST_COUNT_ZERO_LABEL.y - (SCREEN_HEIGHT / 5);
    PARTY_LIST_COUNT_ZERO_LABEL.x = PARTY_LIST_COUNT_ZERO_LABEL.x - (SCREEN_WIDTH / 5);
    PARTY_LIST_COUNT_ZERO_LABEL.visible = false;

    //ヘッダー表示
    PARTY_HEADER_SPRITE = Sprite('ASSET_34').addChildTo(PARTY_UI_LAYER);
    PARTY_HEADER_SPRITE.x = this.gridX.center();
    PARTY_HEADER_SPRITE.y = PARTY_HEADER_SPRITE.height / 2;

    Label({
      text: 'パーティ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(PARTY_HEADER_SPRITE);

    //ボタンを生
    var rightBtnPosY = 0;
    for (var btn = 0; btn < 8; btn++) {
      //ボタン画像生成
      PARTY_RIGHT_BUTTONS[btn] = Sprite('ASSET_163').addChildTo(PARTY_UI_LAYER);
      if(btn == 0) rightBtnPosY = (PARTY_HEADER_SPRITE.y + PARTY_HEADER_SPRITE.height);
      else rightBtnPosY = (rightBtnPosY + ((PARTY_RIGHT_BUTTONS[btn].height) * 1.05));
      PARTY_RIGHT_BUTTONS[btn].y = rightBtnPosY;
      PARTY_RIGHT_BUTTONS[btn].x = this.gridX.center();
      PARTY_RIGHT_BUTTONS[btn].x = (PARTY_RIGHT_BUTTONS[btn].x + (SCREEN_WIDTH / 2)) - (PARTY_RIGHT_BUTTONS[btn].width / 2);
      //ボタンテキスト生成
      PARTY_RIGHT_BUTTONS[btn]['btn_text'] = Label({
        text: '',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(PARTY_RIGHT_BUTTONS[btn]);
      //ボタン本体生成
      PARTY_RIGHT_BUTTONS[btn]['btn'] = Button({
        width: 240,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(PARTY_RIGHT_BUTTONS[btn]);
      PARTY_RIGHT_BUTTONS[btn]['btn']['btn_number'] = btn;
      PARTY_RIGHT_BUTTONS[btn]['btn']['btn_active_flag'] = true;
      PARTY_RIGHT_BUTTONS[btn]['btn'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null
          && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
          && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SEARCH_WINDOW == null && PARTY_SETTING_WINDOW == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(!this['btn_active_flag']) return;
          PARTY_RIGHT_BUTTON_PUSH_NUMBER = this['btn_number'];
        }
      };
      PARTY_RIGHT_BUTTONS[btn]['btn'].visible = false;
    }
    //各ボタンのテキストを更新
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(0,"戻る");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(1,"パーティメンバー");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(2,"おすすめのパーティ");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(3,"パーティ検索");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(4,"パーティを抜ける");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(5,"パーティ設定変更");
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(6,"招待されているパーティ",20);
    G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(7,"パーティ参加申請承認");
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/party/party.php",null); //非同期通信開始
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
          if(isset(json['player_info'])){
            PARTY_PLAYER_INFO = json['player_info'];
            //パーティ設定ボタンの確認
            if(PARTY_RIGHT_BUTTONS != null){
              if(PARTY_PLAYER_INFO['player_index_id'] != PARTY_PLAYER_INFO['player_party_index_id']){ //リーダーではなかった
                PARTY_RIGHT_BUTTONS[5]['btn']['btn_active_flag'] = false;
                PARTY_RIGHT_BUTTONS[5].alpha = 0.5;
              }
              else{
                PARTY_RIGHT_BUTTONS[5]['btn']['btn_active_flag'] = true;
                PARTY_RIGHT_BUTTONS[5].alpha = 1;
              }
            }
          }
          if(isset(json['result_player_list_avatar_asset_datas'])){ //アバター表示に必要なプレイヤーデータ
            PARTY_PLAYER_LIST_AVATAR_ASSET_DATA = json['result_player_list_avatar_asset_datas'];
          }
          if(isset(json['recommendation_party_datas'])){
            PARTY_UPDATE_PARTY_DATAS = json['recommendation_party_datas'];
            PARTY_RECOMMENDATION_PARTY_DATAS = json['recommendation_party_datas'];
          }
          if(isset(json['result_invitation_party_datas'])){
            PARTY_UPDATE_PARTY_DATAS = json['result_invitation_party_datas']; //パーティリスト更新用データを取得(招待されているパーティ)
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_my_party_member_datas'])){ //自分のパーティメンバーを取得
            PARTY_UPDATE_PARTY_DATAS = json['result_my_party_member_datas']; //パーティリスト更新用データを取得(自分パーティ)
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_recommendation_party_datas'])){ //オススメのパーティメンバーを取得
            PARTY_UPDATE_PARTY_DATAS = json['result_recommendation_party_datas']; //パーティリスト更新用データを取得(おすすめパーティ)
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_search_comment_party_datas'])){ //コメント検索のパーティメンバーを取得
            PARTY_SELECT_PARTY_LIST_TYPE = 2; //おすすめの表示形式にする
            PARTY_UPDATE_PARTY_DATAS = json['result_search_comment_party_datas']; //パーティリスト更新用データを取得(コメント検索)
            G_PARTY_CLOSE_PARTY_SEARCH_WINDOW(); //パーティ検索ウィンドウを閉じる
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_search_friend_party_datas'])){ //フレンド検索のパーティメンバーを取得
            PARTY_SELECT_PARTY_LIST_TYPE = 2; //おすすめの表示形式にする
            PARTY_UPDATE_PARTY_DATAS = json['result_search_friend_party_datas']; //パーティリスト更新用データを取得(コメント検索)
            G_PARTY_CLOSE_PARTY_SEARCH_WINDOW(); //パーティ検索ウィンドウを閉じる
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_application_party_datas'])){
            PARTY_UPDATE_PARTY_DATAS = json['result_application_party_datas']; //パーティリスト更新用データを取得(受信した申請一覧)
            G_PARTY_LIST_DELETE();
            G_PARTY_LIST_CREATE(PARTY_UPDATE_PARTY_DATAS);
          }
          if(isset(json['result_party_application'])){ //パーティ参加申請結果を取得
            var resultPartyApplication = json['result_party_application'];
            if(resultPartyApplication == true) G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請","パーティ参加申請を行いました。",0,"resultPartyApplicationWindowSuccess");
            else G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請","パーティ参加申請に失敗しました。",0,"resultPartyApplicationWindowError");
          }
          if(isset(json['result_party_application_cancel'])){ //パーティ参加申請の無効
            var resultPartyApplicationCancel = json['result_party_application_cancel'];
            if(resultPartyApplicationCancel != 0) G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の無効","パーティ参加申請を無効にしました。",0,"resultPartyApplicationCancelWindowSuccess");
            else G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の無効","パーティ参加申請の無効に失敗しました。",0,"resultPartyApplicationCancelWindowError");
          }
          if(isset(json['result_check_out_party'])){ //パーティを抜ける
            var resultCheckOutParty = json['result_check_out_party'];
            if(resultCheckOutParty['error'] == 0){
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティの離脱","パーティを離脱しました。",0,"resultCheckOutPartySuccess");
              //パーティ設定ボタンの更新
              if(PARTY_RIGHT_BUTTONS != null){
                PARTY_RIGHT_BUTTONS[5]['btn']['btn_active_flag'] = true;
                PARTY_RIGHT_BUTTONS[5].alpha = 1;
              }
            }
            else{
              var errorText = "パーティの離脱に失敗しました。\n■エラー内容\n" + resultCheckOutParty['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティの離脱",errorText,0,"resultCheckOutPartyError");
            }
          }
          if(isset(json['result_party_application_approval'])){ //パーティ参加申請の承認
            var resultPartyApplicationApproval = json['result_party_application_approval'];
            if(resultPartyApplicationApproval['error'] == 0){
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の承認","パーティの参加を承認しました。",0,"resultPartyApplicationApprovalWindowSuccess");
            }
            else
            {
              var errorText = "パーティ参加申請の承認に失敗しました。\n■エラー内容\n" + resultPartyApplicationApproval['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の承認",errorText,0,"resultPartyApplicationApprovalWindowError");
            }
          }
          if(isset(json['result_party_invitation_approval'])){ //パーティ参加申請の承認
            var resultPartyInvitationApproval = json['result_party_invitation_approval'];
            if(resultPartyInvitationApproval['error'] == 0){
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加","パーティに参加しました。",0,"resultPartyInvitationApprovalWindowSuccess");
            }
            else
            {
              var errorText = "パーティの参加に失敗しました。\n■エラー内容\n" + resultPartyInvitationApproval['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加",errorText,0,"resultPartyInvitationApprovalWindowError");
            }
          }
          if(isset(json['result_party_member_expulsion'])){ //パーティメンバーの追放
            var resultPartyMemberExpulsion = json['result_party_member_expulsion'];
            if(resultPartyMemberExpulsion['error'] == 0) G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"プレイヤーの追放","プレイヤーを追放しました。",0,"resultPartyMemberExpusionWindowSuccess");
            else {
              var errorText = "プレイヤーの追放に失敗しました。\n■エラー内容\n" + resultPartyMemberExpulsion['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"プレイヤーの追放",errorText,0,"resultPartyMemberExpusionWindowError");
            }
          }
          if(isset(json['result_party_setting_data'])){ //パーティ設定データを取得した。
            var getPartySettingData = json['result_party_setting_data'];
            if(getPartySettingData['error'] == 0){ //正常
              G_PARTY_CREATE_SETTING_WINDOW(PARTY_WINDOW_LAYER,getPartySettingData);
            }
            else{ //エラー
              var errorText = "パーティ設定の取得に失敗しました\n■エラー内容\n" + getPartySettingData['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ設定変更",errorText,0,"resultPartySettingWindowError");
            }
          }
          if(isset(json['result_change_party_setting'])){ //パーティ設定に変更があった。
            var getPartyChangeSettingData = json['result_change_party_setting'];
            if(getPartyChangeSettingData['error'] == 0){ //正常
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ設定変更","パーティ設定を変更しました",0,"resultPartyChangeSettingSuccess");
            }
            else{ //エラー
              var errorText = "パーティ設定の変更に失敗しました\n■エラー内容\n" + getPartyChangeSettingData['error_comment'];
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ設定変更",errorText,0,"resultPartyChangeSettingError");
            }
            G_PARTY_CLOSE_SETTING_WINDOW();
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          SCENE_MANAGER['prev_scene'] = "party";
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "party";
        this.exit("title");
      }
      NETWORK_IS_CONNECTING = false;
      RESULT_DATA = "";//通信結果を初期化
    }
    //シーン初期化処理
    if(PARTY_SCENE_INIT_FLAG == false && PARTY_RECOMMENDATION_PARTY_DATAS != null && PARTY_PLAYER_INFO != null){
      G_PARTY_LIST_CREATE(PARTY_RECOMMENDATION_PARTY_DATAS); //初期パーティリスト生成
      PARTY_SCENE_INIT_FLAG = true;
      console.log("check1");
    }
    //右ボタンのイベント
    if(PARTY_RIGHT_BUTTON_PUSH_NUMBER != -1){ //ボタンを押した場合
      //パーティリストに関連ない物は更新しない
      if(PARTY_RIGHT_BUTTON_PUSH_NUMBER != 5 && PARTY_RIGHT_BUTTON_PUSH_NUMBER != 4 && PARTY_RIGHT_BUTTON_PUSH_NUMBER != 3){
        PARTY_SELECT_PARTY_LIST_TYPE = PARTY_RIGHT_BUTTON_PUSH_NUMBER; //選択したパーティリストタイプを設定
      }
      switch (PARTY_RIGHT_BUTTON_PUSH_NUMBER) {
        case 0: //戻る
        {
          if(SCENE_MANAGER['prev_scene'] == "myPage"){ //前のシーンがマイページだった場合

          }
          if(SCENE_MANAGER['prev_scene'] == "map"){

          }
          var prevSceneName = SCENE_MANAGER['prev_scene'];
          SCENE_MANAGER['prev_scene'] = "party";
          this.exit(prevSceneName);
        }
        break;
        case 1: //パーティメンバー
        {
          G_PARTY_LIST_UPDATE("get_my_party_member");
        }
        break;
        case 2: //オススメのパーティ
        {
          G_PARTY_LIST_UPDATE("get_recommendation_party");
        }
        break;
        case 3: //パーティを探す
        {
          G_PARTY_CREATE_PARTY_SEARCH_WINDOW(PARTY_WINDOW_LAYER,PARTY_PLAYER_INFO['player_index_id']);
        }
        break;
        case 4: //パーティを抜ける
        {
          //パーティ離脱確認ウィンドウ表示
          G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ招待の削除","現在のパーティから離脱します",1,"partyCheckOutWindow");
        }
        break;
        case 5: //パーティ設定変更
        {
          //G_PARTY_SETTING_WINDOW(PARTY_WINDOW_LAYER);
          var postParam = new Object();
          postParam['get_party_setting_data'] = 1; //パーティ設定情報を取得
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
        }
        break;
        case 6: //招待されているパーティ
        {
          G_PARTY_LIST_UPDATE("get_invitation_party");
        }
        break;
        case 7: //受信した申請一覧
        {
          G_PARTY_LIST_UPDATE("get_application_party");
        }
        break;
        default:
        {

        }
        break;
      }
      PARTY_RIGHT_BUTTON_PUSH_NUMBER = -1;
    }
    //ウィンドウに返し値があった。
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_RETURN_VAL['partyApplicationWindow'] == "yes"){ //クエストの受注を確定した。
        if(NETWORK_IS_CONNECTING == false){
          var postParam = new Object();
          postParam['set_application_party_id'] = PARTY_SELECT_APPLICATION_PARTY_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
        }
      }
      if(WINDOW_RETURN_VAL['partyApplicationCancelWindow'] == "yes"){ //パーティ参加申請を無効にした。
        var postParam = new Object();
        postParam['set_application_cancel'] = PARTY_SELECT_PARTY_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationCancelWindow'] == "yes"){ //パーティ招待を無効にした。
        var postParam = new Object();
        postParam['set_invitation_cancel'] = PARTY_SELECT_PARTY_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyApplicationApprovalWindow'] == "yes"){ //パーティ参加申請を承認した。
        var postParam = new Object();
        postParam['set_application_approval'] = PARTY_SELECT_PARTY_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationApprovalWindow'] == "yes"){ //パーティの招待から参加した。
        var postParam = new Object();
        postParam['set_invitation_approval'] = PARTY_SELECT_PARTY_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyMemberExpulsionWindow'] == "yes"){ //パーティメンバーを追放した。
        var postParam = new Object();
        postParam['set_party_member_expulsion'] = PARTY_SELECT_PARTY_INFO_ID;
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
        PARTY_SCENE_CHANGE_ANIM_STEP = 0; //シーン切り替えアニメーションを開始
      }
      WINDOW_RETURN_VAL = null;
    }
    //検索ワードが入力された
    if(PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD != ""){
      if(PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null){
        PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text = PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD;
        PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD = "";
      }
    }
    //シーン切り替えアニメが開始した
    if(PARTY_SCENE_CHANGE_ANIM_STEP != -1){
      switch (parseInt(PARTY_SCENE_CHANGE_ANIM_STEP)) {
        case 0:
        {
          G_CREATE_TRANS_SCREEN_ANIM(PARTY_WINDOW_LAYER,0);
          PARTY_SCENE_CHANGE_ANIM_STEP = 1;
        }
        break;
        case 1:
        {
          var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(0);
          if(transAnimFlag == false){ //アニメ再生が完了した場合
            PARTY_SCENE_CHANGE_ANIM_STEP = 2; //隊形シーンに移動
          }
        }
        break;
        case 2:
        {
          PARTY_SCENE_CHANGE_ANIM_STEP = -1;
          G_PARTY_CLOSE_SETTING_WINDOW();
          //prev禁止
          this.exit("formation"); //バトルシーンへ
        }
        break;
        default:
        {

        }
        break;
      }
    }
  },
});

//ボタンのテキストを変更する
function G_PARTY_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(PARTY_RIGHT_BUTTONS) && isset(PARTY_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    PARTY_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    PARTY_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_PARTY_LIST_CREATE(partyDatas){ //パーティ表示用リストを生成
  var updatePosY = 0;
  var listObjHeightSize = 0;
  if(partyDatas != null && Array.isArray(partyDatas) && isset(partyDatas) && partyDatas.length != 0){ //1つ以上のパーティが存在した場合
    PARTY_LIST_COUNT_ZERO_LABEL.visible = false;
    for (var i = 0; i < partyDatas.length; i++) {
      //セル本体スプライト
      PARTY_CELL_SPRITE_ARRAY[i] = Sprite('ASSET_162').addChildTo(PARTY_LIST_OBJ);
      PARTY_CELL_SPRITE_ARRAY[i]['player_index_id'] = partyDatas[i]['player_index_id'];
      //パーティ名
      PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'] = Label({
        text: '',
        fontSize: 18,
        fill: 'black',
        align: 'left',
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
      if(isset(partyDatas[i]['player_name'])) PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].text = partyDatas[i]['party_name'];
      PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].x = PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].x - (PARTY_CELL_SPRITE_ARRAY[i].width / 2.2);
      PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].y = PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].y - (PARTY_CELL_SPRITE_ARRAY[i].height / 3);
      //アバター
      if(isset(partyDatas[i]['player_avatar_id'])){
        //アバター
        if(isset(PARTY_PLAYER_LIST_AVATAR_ASSET_DATA[partyDatas[i]['player_index_id']])) {
          var avatarData = PARTY_PLAYER_LIST_AVATAR_ASSET_DATA[partyDatas[i]['player_index_id']];
          var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(avatarData['player_avatar_data'],avatarData['player_equip_item_data']);
          PARTY_CELL_SPRITE_ARRAY[i]['avatar'] = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.225, 0.225, avatarData['player_avatar_data']['visible_head_equip_item']);
          PARTY_CELL_SPRITE_ARRAY[i]['avatar']['sprites'][0].addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
          PARTY_CELL_SPRITE_ARRAY[i]['avatar']['sprites'][0].x = PARTY_CELL_SPRITE_ARRAY[i]['avatar']['sprites'][0].x - (PARTY_CELL_SPRITE_ARRAY[i].width * 0.33);
          PARTY_CELL_SPRITE_ARRAY[i]['avatar']['sprites'][0].y = PARTY_CELL_SPRITE_ARRAY[i]['avatar']['sprites'][0].y - (PARTY_CELL_SPRITE_ARRAY[i].height * 0.2);
        }
      }
      //プレイヤープロフィールボタン(アバター画像の上)
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'] = Button({
        width: 140,         // 横サイズ
        height: 140,        // 縦サイズ
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'].x = PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'].x - (PARTY_CELL_SPRITE_ARRAY[i].width / 3);
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      //タップ開始位置を記録
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointstart = function(e){
        PARTY_LIST_START_TAP_POS_X = e.pointer.x;
        PARTY_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
          && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SEARCH_WINDOW == null && PARTY_SETTING_WINDOW == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(PARTY_LIST_START_TAP_POS_X != e.pointer.x || PARTY_LIST_START_TAP_POS_Y != e.pointer.y) return;
          G_UI_CREATE_PLAYER_PROFILE(PARTY_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        }
      };
      PARTY_CELL_SPRITE_ARRAY[i]['player_profile_button'].visible = false;
      // パーティリーダーレベル
      PARTY_CELL_SPRITE_ARRAY[i]['level_label'] = Label({
        text: '',
        fontSize: 24,
        fill: 'black',
        align: 'right',
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
      //PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x = PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 2.2);
      PARTY_CELL_SPRITE_ARRAY[i]['level_label'].y = PARTY_CELL_SPRITE_ARRAY[i]['level_label'].y + (PARTY_CELL_SPRITE_ARRAY[i].height / 3);
      if(isset(partyDatas[i]['player_level'])) PARTY_CELL_SPRITE_ARRAY[i]['level_label'].text = "LV." + partyDatas[i]['player_level'];

      //ボタン上
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'] = Sprite('ASSET_79').addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x = PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 3.7);
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y = PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y - (PARTY_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン上　テキスト
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'] = Label({
        text: 'パーティ情報',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      //ボタン上本体
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper']['player_name'] = partyDatas[i]['player_name'];
      //タップ開始位置を記録
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper'].onpointstart = function(e){
        PARTY_LIST_START_TAP_POS_X = e.pointer.x;
        PARTY_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false &&
          WINDOW_PARTY_INFO == null && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SEARCH_WINDOW == null && PARTY_SETTING_WINDOW == null){
          if(PARTY_LIST_START_TAP_POS_X != e.pointer.x || PARTY_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (PARTY_SELECT_PARTY_LIST_TYPE) {
            case 1: //自分のパーティメンバー
            {
              G_UI_CREATE_PLAYER_PROFILE(PARTY_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            case 2: //オススメのパーティ
            {
              G_UI_CREATE_PARTY_INFO_WINDOW(PARTY_WINDOW_LAYER,this['select_party_index_id']);
            }
            break;
            case 6: //招待されているパーティ
            {
              //招待削除処理
              PARTY_SELECT_PARTY_INFO_ID = this['select_party_index_id']; //選択したリーダーのID(パーティIDを設定)
              var windowMainText = this['player_name'] + "\nプレイヤーの招待を無効にしますか？";
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ招待の削除",windowMainText,1,"partyInvitationCancelWindow");
            }
            break;
            case 7: //受信中の申請リスト
            {
              //参加否定処理
              PARTY_SELECT_PARTY_INFO_ID = this['select_party_index_id']; //選択したリーダーのID(パーティIDを設定)
              var windowMainText = this['player_name'] + "\nプレイヤーの参加申請を無効にしますか？";
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"参加申請の無効",windowMainText,1,"partyApplicationCancelWindow");
            }
            break;
            default:
            break;
          }
        }
      };
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper'].visible = false;

      //ボタン下
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'] = Sprite('ASSET_79').addChildTo(PARTY_CELL_SPRITE_ARRAY[i]);
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x = PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 3.7);
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y = PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y + (PARTY_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン下　テキスト
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'] = Label({
        text: '参加申請',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      //ボタン下本体
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom']['player_name'] = partyDatas[i]['player_name'];
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom']['party_name'] = PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].text;
      //タップ開始位置を記録
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointstart = function(e){
        PARTY_LIST_START_TAP_POS_X = e.pointer.x;
        PARTY_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false
          && WINDOW_PARTY_INFO == null && WINDOW_PARTY_INFO == null
          && WINDOW_PLAYER_PROFILE == null && PARTY_SEARCH_WINDOW == null && PARTY_SETTING_WINDOW == null){
          if(PARTY_LIST_START_TAP_POS_X != e.pointer.x || PARTY_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          console.log(this['select_party_index_id']);
          switch (PARTY_SELECT_PARTY_LIST_TYPE) {
            case 1: //自分のパーティメンバー
            {
              //リーダーの場合で自分自身ではない場合
              if(PARTY_PLAYER_INFO['player_index_id'] == PARTY_PLAYER_INFO['player_party_index_id']
              && PARTY_PLAYER_INFO['player_index_id'] != this['select_party_index_id']){
                //メンバー除外確認ウィンドウを表示
                PARTY_SELECT_PARTY_INFO_ID = this['select_party_index_id']; //参加申請するパーティIDを設定
                var windowMainText = this['player_name'] + "\n指定したメンバーを追放しますか?";
                G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティメンバーの追放",windowMainText,1,"partyMemberExpulsionWindow");
              }
            }
            break;
            case 2: //オススメのパーティ
            {
              //申請確認用ウィンドウを生成
              PARTY_SELECT_APPLICATION_PARTY_ID = this['select_party_index_id']; //参加申請するパーティIDを設定
              var windowMainText = this['party_name'] + "\n参加申請を行いますか?";
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の確認",windowMainText,1,"partyApplicationWindow");
            }
            break;
            case 6: //招待されているパーティ
            {
              //招待確認用ウィンドウを生成
              PARTY_SELECT_PARTY_INFO_ID = this['select_party_index_id']; //招待され参加するパーティIDを設定
              var windowMainText = this['party_name'] + "\nパーティに参加します";
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"招待されたパーティ",windowMainText,1,"partyInvitationApprovalWindow");
            }
            break;
            case 7: //受信中の申請リスト
            {
              //参加承認処理
              PARTY_SELECT_PARTY_INFO_ID = this['select_party_index_id']; //申請承認する(パーティID)プレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nパーティ参加申請を承認しますか?";
              G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ参加申請の承認",windowMainText,1,"partyApplicationApprovalWindow");
            }
            break;
            default:
            break;
          }
        }
      };
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom'].visible = false;
      //パーツの初期化
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].alpha = 1;
      PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 24;
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].alpha = 1;
      PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'].fontSize = 24;
      //パーティ情報セル更新処理
      switch (PARTY_SELECT_PARTY_LIST_TYPE) {
        case 1: //自分のパーティメンバー
        {
          //パーティ名をプレイヤー名に変更
          PARTY_CELL_SPRITE_ARRAY[i]['party_name_label'].text = partyDatas[i]['player_name'];
          PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "プレイヤー情報";
          PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'].fontSize = 20;
          PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "プレイヤーを追放";
          PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 18;
          if(PARTY_PLAYER_INFO['player_index_id'] != PARTY_PLAYER_INFO['player_party_index_id']
           || PARTY_PLAYER_INFO['player_index_id'] == partyDatas[i]['player_index_id']){ //リーダーではない、または自分自身
            PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].alpha = 0.5;
          }
        }
        break;
        case 6: //招待されたパーティ
        {
          PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "参加する";
          PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "招待を削除";
        }
        break;
        case 7: //受信した申請リスト
        {
          PARTY_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "参加承認";
          PARTY_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "参加否定";
        }
        break;
        default:
        {

        }
        break;
      }
      //リストスワイプ処理
      if(i== 0){ PARTY_CELL_SPRITE_ARRAY[i].y = (PARTY_CELL_SPRITE_ARRAY[i].y - (SCREEN_HEIGHT / 2)) + ((PARTY_CELL_SPRITE_ARRAY[i].height / 2) + PARTY_HEADER_SPRITE.height);
        updatePosY = PARTY_CELL_SPRITE_ARRAY[i].y;
      }
      else updatePosY = updatePosY + PARTY_CELL_SPRITE_ARRAY[i].height;
      PARTY_CELL_SPRITE_ARRAY[i].y = updatePosY;
      listObjHeightSize = listObjHeightSize + PARTY_CELL_SPRITE_ARRAY[i].height;
    }
    if(PARTY_CELL_SPRITE_ARRAY.length != 0){ //パーティが存在した場合
      //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
      PARTY_LIST_HOME_POS_Y = PARTY_LIST_OBJ.y; //初期座標を更新
      var listTopPos = (SCREEN_HEIGHT / 2) + PARTY_HEADER_SPRITE.height; //リストの頂点を取得;
      PARTY_LIST_TOUCH_AREA.update = function() {
        PARTY_LIST_TOUCH_AREA.onpointstart = function(e){
        };
        PARTY_LIST_TOUCH_AREA.onpointmove = function(e){
          PARTY_LIST_SCROLLE_START = PARTY_LIST_OBJ.y;
          PARTY_LIST_OBJ.y += e.pointer.dy;
          PARTY_LIST_SCROLLE_MOVE = PARTY_LIST_OBJ.y;
          if(PARTY_LIST_SCROLLE_START < PARTY_LIST_SCROLLE_MOVE){//下
            if(PARTY_LIST_HOME_POS_Y < PARTY_LIST_OBJ.y) PARTY_LIST_OBJ.y -= e.pointer.dy;
          }
          if(PARTY_LIST_SCROLLE_START > PARTY_LIST_SCROLLE_MOVE){//上
            var nowYPos = PARTY_LIST_OBJ.y;
            var lastCellPosY = PARTY_LIST_OBJ.y + PARTY_CELL_SPRITE_ARRAY[PARTY_CELL_SPRITE_ARRAY.length - 1].y; //最後のセルのポジションを取得
            var swipeMaxAreaPosY = SCREEN_HEIGHT - (PARTY_CELL_SPRITE_ARRAY[PARTY_CELL_SPRITE_ARRAY.length - 1].height / 2);
            if(swipeMaxAreaPosY > lastCellPosY) PARTY_LIST_OBJ.y -= e.pointer.dy;//最大にスワイプできる領域を超えた
          }
        };
        PARTY_LIST_TOUCH_AREA.onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          PARTY_LIST_SCROLLE_START = 0;
          PARTY_LIST_SCROLLE_MOVE = 0;
        };
      }
    }
  }
  else{ //表示可能なパーティが存在しなかった。
    if(PARTY_LIST_COUNT_ZERO_LABEL != null){
      PARTY_LIST_COUNT_ZERO_LABEL.visible = true;
    }
  }
}

function G_PARTY_LIST_DELETE(){ //パーティリストを削除する。
  if(PARTY_CELL_SPRITE_ARRAY.length != 0){
    for (var i = 0; i < PARTY_CELL_SPRITE_ARRAY.length; i++) {
      PARTY_CELL_SPRITE_ARRAY[i].remove();
      PARTY_CELL_SPRITE_ARRAY[i] = null;
    }
    PARTY_CELL_SPRITE_ARRAY = new Array();
  }
  PARTY_LIST_OBJ.y = PARTY_LIST_OBJ_Y_POS_INIT; //Y座標を初期位置に戻す
}

function G_PARTY_LIST_UPDATE(postParamName){ //パーティリストの更新を行う(データをを取得してリストを更新)
  if(NETWORK_IS_CONNECTING == false){
    var partyListUpdateParam = new Object();
    partyListUpdateParam[postParamName] = PARTY_PLAYER_INFO['player_index_id']; //自分のIDを設定
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/party/party.php",partyListUpdateParam); //非同期通信開始
  }
}

function G_PARTY_CREATE_PARTY_SEARCH_WINDOW(parentBase,playerIndexId){ //パーティを探すウィンドウを表示
  if(PARTY_SEARCH_WINDOW != null || PARTY_SEARCH_WINDOW_MASK != null) return;
  PARTY_SEARCH_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase); //マスクを表示
  PARTY_SEARCH_WINDOW = Sprite('ASSET_160').addChildTo(PARTY_SEARCH_WINDOW_MASK); //ウィンドウを表示
  //タイトル
  PARTY_SEARCH_WINDOW_TITLE_LABEL = Label({
    text: 'パーティ検索',
    fontSize: 42,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_TITLE_LABEL.y = PARTY_SEARCH_WINDOW_TITLE_LABEL.y - (PARTY_SEARCH_WINDOW.height / 2.5);
  //本文
  PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL = Label({
    text: '募集文から検索\n\n\n\n\n\nフレンドから検索\n\n\nオススメから検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL.y = PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL.y - (PARTY_SEARCH_WINDOW.height * 0.1);
  //PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL.x = PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL.x - (PARTY_SEARCH_WINDOW.width / 3);
  //検索文入力用ボタン(画像)
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = Sprite('ASSET_34').addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.setScale(0.85,0.85);
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y = PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y - (PARTY_SEARCH_WINDOW.height * 0.225);
  //検索文入力用ボタン(テキスト)
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'] = Label({
    text: '検索ワードを入力...',
    fontSize: 30,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON);
  //検索文入力用ボタン(本体)
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'] = Button({
    width: 526,         // 横サイズ
    height: 60,        // 縦サイズ
  }).addChildTo(PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON);
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'].visible = false;
  PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SETTING_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD = window.prompt("検索するワードを入力", "");
    }
  };
  //検索文用検索ボタン
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y = PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y;
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y = PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y + (PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.height * 1.4);
  //検索文用検索ボタン(ラベル)
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON);
  //検索文用検索ボタン(ボタン)
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON);
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SETTING_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null && PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text != ""
      && PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text != "検索ワードを入力..."){
        var postParam = new Object();
        postParam['set_party_search_comment'] = PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      else{ //検索ワードが空の場合
        G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ検索","検索ワードを入力して下さい",0,"partySearchWindowError");
      }
    }
  };
  PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'].visible = false;
  //フレンド検索用検索ボタン(画像)
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.y = PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.y + (PARTY_SEARCH_WINDOW.height * 0.05);
  //フレンド検索用検索ボタン(ラベル)
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON);
  //フレンド検索用検索ボタン(ボタン本体)
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON);
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SETTING_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      var postParam = new Object();
      postParam['set_party_search_friend'] = 1;
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
    }
  };
  PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'].visible = false;
  //オススメ検索用検索ボタン(画像)
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.y = PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.y + (PARTY_SEARCH_WINDOW.height * 0.2);
  //オススメ検索用検索ボタン(ラベル)
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON);
  //オススメ検索用検索ボタン(ボタン本体)
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON);
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SETTING_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      PARTY_RIGHT_BUTTON_PUSH_NUMBER = 2; //おすすめの表示形式にする
      G_PARTY_CLOSE_PARTY_SEARCH_WINDOW();
    }
  };
  PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'].visible = false;
  //閉じるボタン(画像)
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SEARCH_WINDOW);
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON.y = PARTY_SEARCH_WINDOW_CLOSE_BUTTON.y + (PARTY_SEARCH_WINDOW.height / 2.75);
  //閉じるボタン(テキスト)
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON['label'] = Label({
    text: '閉じる',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SEARCH_WINDOW_CLOSE_BUTTON);
  //閉じるボタン(ボタン本体)
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SEARCH_WINDOW_CLOSE_BUTTON);
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_SETTING_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_PARTY_CLOSE_PARTY_SEARCH_WINDOW(); //パーティ検索ウィンドウを閉じる
    }
  };
  PARTY_SEARCH_WINDOW_CLOSE_BUTTON['button'].visible = false;
}

function G_PARTY_CLOSE_PARTY_SEARCH_WINDOW(){ //パーティ検索ウィンドウを閉じる

  if(PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD != ""){
    PARTY_SEARCH_WINDOW_INPUT_SEARCH_WORD = "";
  }
  if(PARTY_SEARCH_WINDOW_CLOSE_BUTTON != null){
    PARTY_SEARCH_WINDOW_CLOSE_BUTTON.remove();
    PARTY_SEARCH_WINDOW_CLOSE_BUTTON = null;
  }
  if(PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON != null){
    PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.remove();
    PARTY_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null;
  }
  if(PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON != null){
    PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.remove();
    PARTY_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null;
  }
  if(PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON != null){
    PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.remove();
    PARTY_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null;
  }
  if(PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null){
    PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.remove();
    PARTY_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null;
  }
  if(PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL != null){
    PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL.remove();
    PARTY_SEARCH_WINDOW_MAIN_TEXT_LABEL = null;
  }
  if(PARTY_SEARCH_WINDOW_TITLE_LABEL != null){
    PARTY_SEARCH_WINDOW_TITLE_LABEL.remove();
    PARTY_SEARCH_WINDOW_TITLE_LABEL = null;
  }
  if(PARTY_SEARCH_WINDOW != null){
    PARTY_SEARCH_WINDOW.remove();
    PARTY_SEARCH_WINDOW = null;
  }
  if(PARTY_SEARCH_WINDOW_MASK != null){
    PARTY_SEARCH_WINDOW_MASK.remove();
    PARTY_SEARCH_WINDOW_MASK = null;
  }
}

function G_PARTY_CREATE_SETTING_WINDOW(parentBase,partySettingData){ //パーティ設定画面を表示
  PARTY_SETTING_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase); //マスクを表示
  PARTY_SETTING_WINDOW = Sprite('ASSET_160').addChildTo(PARTY_SETTING_WINDOW_MASK); //ウィンドウを表示
  //タイトル表示
  PARTY_SETTING_WINDOW_TITLE_LABEL = Label({
    text: 'パーティ設定変更',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_TITLE_LABEL.y = PARTY_SETTING_WINDOW_TITLE_LABEL.y - (PARTY_SETTING_WINDOW.height / 2.5); //+ (PARTY_SETTING_WINDOW.height * 0.2));
  //項目表示
  PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL = Label({
    text: 'パーティ募集\n\nリーダー変更\n\n隊形変更\n\n推奨最低レベル\n\n推奨最大レベル\n\n募集文変更',
    fontSize: 32,
    fill: 'white',
    align: 'left',
  }).addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL.y = PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL.y - (PARTY_SETTING_WINDOW.height * 0.1);
  PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL.x = PARTY_SETTING_WINDOW_MAIN_TEXT_LABEL.x - (PARTY_SETTING_WINDOW.width / 2.75);
  //パーティ募集切り替えボタン表示
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.y - (PARTY_SETTING_WINDOW.height / 3.35);
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.x + (PARTY_SETTING_WINDOW.width / 4);
  //パーティ募集切り替えボタン(ラベル)
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON);
  //パーティ募集切り替えボタン(ボタン本体)
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON);
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['init_party_scout'] = -1; //設定変更前
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['update_party_scout'] = -1; //設定変更後
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['update_party_scout'] == 0){
        this['update_party_scout'] = 1;
        PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['label'].text = "OFF";
        return;
      }
      if(this['update_party_scout'] == 1){
        this['update_party_scout'] = 0;
        PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['label'].text = "ON";
        return;
      }
    }
  };
  PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button'].visible = false;
  //パーティ募集の設定処理
  var initPartyScout = -1;
  if(isset(partySettingData['player_party']['party_scout_status'])){ //パーティ募集設定を取得
    initPartyScout = partySettingData['player_party']['party_scout_status'];
    var resultText = "";
    if(partySettingData['player_party']['party_scout_status'] == 0){
      resultText = "ON";
    }
    if(partySettingData['player_party']['party_scout_status'] == 1){
      resultText = "OFF";
    }
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['label'].text = resultText;
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['init_party_scout'] = initPartyScout;
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['update_party_scout'] = initPartyScout;
  }
  //リーダー変更ボタン表示
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON = Sprite('ASSET_163').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.y + (PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.height * 1.2);
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.x + (PARTY_SETTING_WINDOW.width / 5.25);
  //リーダー変更ボタン(ラベル)
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON);
  var setInitPartyLeaderIndexId = -1; //初期設定するパーティのリーダーIDを設定
  var setPartyMemberIndex = -1; //パーティメンバー配列のindexを保存
  if(isset(partySettingData['player_party']['leader_player_index_id']) && isset(partySettingData['party_member_datas'])){
    var partyMemberDatas = partySettingData['party_member_datas'];
    if(Array.isArray(partyMemberDatas)){
      for (var i = 0; i < partyMemberDatas.length; i++) {
        if(partyMemberDatas[i]['player_index_id'] == partySettingData['player_party']['leader_player_index_id']){
          PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['label'].text = partyMemberDatas[i]['player_name'];
          setInitPartyLeaderIndexId = partyMemberDatas[i]['player_index_id'];
          setPartyMemberIndex = i;
          break;
        }
      }
    }
  }
  //リーダー変更ボタン(ボタン本体)
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button'] = Button({
    width: 240,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON);
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['party_member_index'] = setPartyMemberIndex;
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['init_leader_player_index_id'] = setInitPartyLeaderIndexId;
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['update_leader_player_index_id'] = setInitPartyLeaderIndexId;
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['party_member_index'] != -1 && isset(partySettingData['party_member_datas']) && Array.isArray(partySettingData['party_member_datas'])){ //インデックスは正常な数値か、パーティメンバーデータが存在するか
        var partyMemberDatas = partySettingData['party_member_datas'];
        this['party_member_index'] = parseInt(this['party_member_index']) + 1;
        if(partyMemberDatas.length < (parseInt(this['party_member_index']) + 1)) this['party_member_index'] = 0;
        for (var i = 0; i < partyMemberDatas.length; i++) {
          if(i == this['party_member_index']){
            this['update_leader_player_index_id'] = partyMemberDatas[i]['player_index_id'];
            PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['label'].text = partyMemberDatas[i]['player_name'];
            break;
          }
        }
      }
    }
  };
  PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button'].visible = false;
  //隊形変更ボタン表示
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON = Sprite('ASSET_163').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.y + (PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.height * 1.2);
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.x;
  //隊形変更ボタンラベル
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON['label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON);
  if(isset(partySettingData['player_party']['party_formation_id']) && MASTER_DATA_FORMATION_MASTER != null){
    if(Array.isArray(MASTER_DATA_FORMATION_MASTER)){
      for (var i = 0; i < MASTER_DATA_FORMATION_MASTER.length; i++) {
        if(MASTER_DATA_FORMATION_MASTER[i]['id'] == partySettingData['player_party']['party_formation_id']){
          PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON['label'].text = MASTER_DATA_FORMATION_MASTER[i]['formation_name'];
          break;
        }
      }
    }
  }
  //隊形変更ボタン(ボタン本体)
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON['button'] = Button({
    width: 240,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON);
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_NORMAL_WINDOW_CREATE(parentBase,"隊形変更","隊形変更画面に移動します",1,"moveFormationSceneWindow");
    }
  };
  PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON['button'].visible = false;
  //推薦最低レベルボタン表示
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.x;
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.y + (PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.height * 1.2);
  //推薦最低レベルボタン(ラベル)
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON);
  var initMinLevel = -1;
  if(isset(partySettingData['player_party']['party_level_min'])){
    PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['label'].text = partySettingData['player_party']['party_level_min'];
    initMinLevel = partySettingData['player_party']['party_level_min'];
  }
  //推薦最低レベルボタン(ボタン本体)
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON);
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['init_min_level'] = initMinLevel;
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['update_min_level'] = initMinLevel;
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['input_min_level'] = initMinLevel;
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      this['input_min_level'] = window.prompt("推奨最低レベルを入力", "1");
    }
  };
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button'].update = function() {
    if(this['input_min_level'] != this['update_min_level']){
      var reg = new RegExp(/^[0-9]*$/);
      var res = reg.test(this['input_min_level']);
      if(res == true){ //数字だけで構成されたテキストか
        if(1 <= parseInt(this['input_min_level']) && parseInt(this['input_min_level']) <= 999){
          this['update_min_level'] = this['input_min_level'];
          PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['label'].text = this['update_min_level'];
        }
        else{ //設定可能な数字ではない
          G_NORMAL_WINDOW_CREATE(parentBase,"エラー","1〜999までの数字を設定してください",0,"inputPartyLevelMinWindowError");
          this['input_min_level'] = this['update_min_level'];
        }
      }
      else{ //数字以外の文字が混ざっていた。
        G_NORMAL_WINDOW_CREATE(parentBase,"エラー","数字以外の文字が含まれています。",0,"inputPartyLevelMinWindowError");
        this['input_min_level'] = this['update_min_level'];
      }
    }
  }
  PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button'].visible = false;
  //推薦最大レベルボタン表示
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.x;
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.y + (PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.height * 1.2);
  //推薦最大レベルボタン(ラベル)
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON);
  var initMaxLevel = -1;
  if(isset(partySettingData['player_party']['party_level_max'])){
    PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['label'].text = partySettingData['player_party']['party_level_max'];
  }
  //推薦最大レベルボタン(ボタン本体)
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON);
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['init_max_level'] = initMaxLevel;
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['update_max_level'] = initMaxLevel;
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['input_max_level'] = initMaxLevel;
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      this['input_max_level'] = window.prompt("推奨最大レベルを入力", "999");
    }
  };
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button'].update = function() {
    if(this['input_max_level'] != this['update_max_level']){
      var reg = new RegExp(/^[0-9]*$/);
      var res = reg.test(this['input_max_level']);
      if(res == true){ //数字だけで構成されたテキストか
        if(1 <= parseInt(this['input_max_level']) && parseInt(this['input_max_level']) <= 999){
          this['update_max_level'] = this['input_max_level'];
          PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['label'].text = this['update_max_level'];
        }
        else{ //設定可能な数字ではない
          G_NORMAL_WINDOW_CREATE(parentBase,"エラー","1〜999までの数字を設定してください",0,"inputPartyLevelMaxWindowError");
          this['input_max_level'] = this['update_max_level'];
        }
      }
      else{ //数字以外の文字が混ざっていた。
        G_NORMAL_WINDOW_CREATE(parentBase,"エラー","数字以外の文字が含まれています。",0,"inputPartyLevelMaxWindowError");
        this['input_max_level'] = this['update_max_level'];
      }
    }
  }
  PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button'].visible = false;
  //募集文変更ボタン表示
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON = Sprite('ASSET_163').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON.x = PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.x;
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON.y = PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON.y + (PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON.height * 1.2);
  //募集文変更ボタン(ラベル)
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['label'] = Label({
    text: '編集する',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON);
  //募集文変更ボタン(ボタン本体)

  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'] = Button({
    width: 240,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON);
  var initPartyComment = "";
  if(isset(partySettingData['player_party']['party_comment'])){
    initPartyComment = partySettingData['player_party']['party_comment'];
  }
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['init_party_comment'] = initPartyComment;
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment'] = initPartyComment;
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['input_party_comment'] = initPartyComment;
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(isset(partySettingData['player_party']['party_comment'])){
        G_PARTY_CREATE_COMMENT_EDIT_WINDOW(parentBase,this['update_party_comment']);
      }
    }
  };
  PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'].visible = false;
  //決定ボタン表示
  PARTY_SETTING_WINDOW_DECISION_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_DECISION_BUTTON.x = PARTY_SETTING_WINDOW_DECISION_BUTTON.x + (PARTY_SETTING_WINDOW.width / 4);
  PARTY_SETTING_WINDOW_DECISION_BUTTON.y = PARTY_SETTING_WINDOW_DECISION_BUTTON.y + (PARTY_SETTING_WINDOW.height / 3);
  //決定ボタン(ラベル)
  PARTY_SETTING_WINDOW_DECISION_BUTTON['label'] = Label({
    text: '決定',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_DECISION_BUTTON);
  //決定ボタン(ボタン本体)
  PARTY_SETTING_WINDOW_DECISION_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_DECISION_BUTTON);
  PARTY_SETTING_WINDOW_DECISION_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      //設定変更決定処理
      var postParam = new Object();
      var updateFlag = false; //設定変更があり、通信処理の必要があるか。
      if(PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['init_party_scout']
      != PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['update_party_scout']){
        postParam['setting_update_party_scout'] = PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON['button']['update_party_scout'];
        updateFlag = true;
      }
      if(PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['init_leader_player_index_id']
      != PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['update_leader_player_index_id']){
        if(PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['update_leader_player_index_id'] != -1){
          postParam['setting_update_leader_player_index_id'] = PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON['button']['update_leader_player_index_id'];
          updateFlag = true;
        }
      }
      if(PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['init_min_level']
      != PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['update_min_level']){
        postParam['setting_update_min_level'] = PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON['button']['update_min_level'];
        updateFlag = true;
      }
      if(PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['init_max_level']
      != PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['update_max_level']){
        postParam['setting_update_max_level'] = PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON['button']['update_max_level'];
        updateFlag = true;
      }
      if(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['init_party_comment']
      != PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment']){
        postParam['setting_update_party_comment'] = PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment'];
        updateFlag = true;
      }
      if(updateFlag == true){
        NETWORK_IS_CONNECTING = true;
        console.log(postParam);
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      else{
        G_NORMAL_WINDOW_CREATE(PARTY_WINDOW_LAYER,"パーティ設定変更","パーティ設定を変更しました",0,"resultPartyChangeSettingSuccess");
        G_PARTY_CLOSE_SETTING_WINDOW();
      }
    }
  };
  PARTY_SETTING_WINDOW_DECISION_BUTTON['button'].visible = false;
  //閉じるボタン表示
  PARTY_SETTING_WINDOW_CLOSE_BUTTON = Sprite('ASSET_79').addChildTo(PARTY_SETTING_WINDOW);
  PARTY_SETTING_WINDOW_CLOSE_BUTTON.x = PARTY_SETTING_WINDOW_CLOSE_BUTTON.x - (PARTY_SETTING_WINDOW.width / 4);
  PARTY_SETTING_WINDOW_CLOSE_BUTTON.y = PARTY_SETTING_WINDOW_CLOSE_BUTTON.y + (PARTY_SETTING_WINDOW.height / 3);
  //決定ボタン(ラベル)
  PARTY_SETTING_WINDOW_CLOSE_BUTTON['label'] = Label({
    text: '閉じる',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_SETTING_WINDOW_CLOSE_BUTTON);
  //決定ボタン(ボタン本体)
  PARTY_SETTING_WINDOW_CLOSE_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_SETTING_WINDOW_CLOSE_BUTTON);
  PARTY_SETTING_WINDOW_CLOSE_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && PARTY_COMMENT_EDIT_WINDOW == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_PARTY_CLOSE_SETTING_WINDOW(); //パーティ設定ウィンドウを閉じる
    }
  };
  PARTY_SETTING_WINDOW_CLOSE_BUTTON['button'].visible = false;
}

function G_PARTY_CREATE_COMMENT_EDIT_WINDOW(parentBase,comment){ //募集文編集画面を表示する
  // //マスクを表示
  PARTY_COMMENT_EDIT_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase);
  //ウィンドウ本体表示
  PARTY_COMMENT_EDIT_WINDOW = Sprite('ASSET_167').addChildTo(PARTY_COMMENT_EDIT_WINDOW_MASK);
  //募集文表示
  PARTY_COMMENT_EDIT_WINDOW_TEXT = LabelArea({
    text: comment,
    height: 512,
    width: 512,
    fontSize: 32,
    fill: 'white',
    align: 'left',
    baseline: 'top',
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW);
  //閉じるボタン表示
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN = Sprite('ASSET_79').addChildTo(PARTY_COMMENT_EDIT_WINDOW);
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN.y = PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN.y + ((PARTY_COMMENT_EDIT_WINDOW.height / 1.85));
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN.x = PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN.x - ((PARTY_COMMENT_EDIT_WINDOW.width / 3));
  //閉じるボタンラベル
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN['label'] = Label({
    text: '閉じる',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN);
  //閉じるボタン(本体)
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN);
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN['button']['init_edit_comment'] = comment; //編集前のコメントを保存
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(isset(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'])){
        //テキストを編集していた場合は保存しない
        if(this['init_edit_comment'] != PARTY_COMMENT_EDIT_WINDOW_TEXT.text){
          PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['input_party_comment'] = this['init_edit_comment'];
          PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment'] = this['init_edit_comment'];
        }
      }
      G_PARTY_CLOSE_COMMENT_EDIT_WINDOW(); //募集文編集画面を閉じる
    }
  };
  PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'].visible = false;
  //編集ボタン表示
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN = Sprite('ASSET_79').addChildTo(PARTY_COMMENT_EDIT_WINDOW);
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN.y = PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN.y + ((PARTY_COMMENT_EDIT_WINDOW.height / 1.85));
  //編集ボタン(ラベル)
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN['label'] = Label({
    text: '編集',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN);
  //編集ボタン(ボタン本体)
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN['button']= Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN);
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(isset(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'])){
        PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['input_party_comment'] = window.prompt("募集文を入力", PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment']);
      }
    }
  };
  PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN['button'].visible = false;
  //決定ボタン表示
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN = Sprite('ASSET_79').addChildTo(PARTY_COMMENT_EDIT_WINDOW);
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN.y = PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN.y + ((PARTY_COMMENT_EDIT_WINDOW.height / 1.85));
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN.x = PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN.x + ((PARTY_COMMENT_EDIT_WINDOW.width / 3));
  //決定ボタンラベル
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN['label'] = Label({
    text: '決定',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN);
  //決定ボタン(本体)
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN);
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PARTY_INFO == null
      && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_PARTY_CLOSE_COMMENT_EDIT_WINDOW(); //募集文編集画面を閉じる
    }
  };
  PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN['button'].visible = false;
  if(isset(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button'])){
    PARTY_COMMENT_EDIT_WINDOW.update = function() {
      var updateText = PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment'];
      var inputText = PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['input_party_comment'];
      if(updateText != inputText && inputText != null && inputText != ""){ //テキストの入力があった。
        if(Array.from(inputText).length <= 100){ //100文字以内か
          PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['update_party_comment'] = inputText;
          PARTY_COMMENT_EDIT_WINDOW_TEXT.text = inputText;
        }
        else{
          G_NORMAL_WINDOW_CREATE(parentBase,"エラー","募集文は100文字以内で入力してください。",0,"inputPartyCommentWindowError");
          PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON['button']['input_party_comment'] = updateText;
        }
      }
    }
  }
}

function G_PARTY_CLOSE_COMMENT_EDIT_WINDOW(){ //募集文編集画面を閉じる
  if(PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN != null){
    PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN.remove();
    PARTY_COMMENT_EDIT_WINDOW_EDIT_BTN = null;
  }
  if(PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN != null){
    PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN.remove();
    PARTY_COMMENT_EDIT_WINDOW_DECISION_BTN = null;
  }
  if(PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN != null){
    PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN.remove();
    PARTY_COMMENT_EDIT_WINDOW_CLOSE_BTN = null;
  }
  if(PARTY_COMMENT_EDIT_WINDOW_TEXT != null){
    PARTY_COMMENT_EDIT_WINDOW_TEXT.remove();
    PARTY_COMMENT_EDIT_WINDOW_TEXT = null;
  }
  if(PARTY_COMMENT_EDIT_WINDOW != null){
    PARTY_COMMENT_EDIT_WINDOW.remove();
    PARTY_COMMENT_EDIT_WINDOW = null;
  }
  if(PARTY_COMMENT_EDIT_WINDOW_MASK != null){
    PARTY_COMMENT_EDIT_WINDOW_MASK.remove();
    PARTY_COMMENT_EDIT_WINDOW_MASK = null;
  }
}

function G_PARTY_CLOSE_SETTING_WINDOW(){ //パーティ設定画面を閉じる
  if(PARTY_SETTING_WINDOW_DECISION_BUTTON != null){
    PARTY_SETTING_WINDOW_DECISION_BUTTON.remove();
    PARTY_SETTING_WINDOW_DECISION_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_CHANGE_COMMENT_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_MAX_LEVEL_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_MIN_LEVEL_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_CLOSE_BUTTON != null){
    PARTY_SETTING_WINDOW_CLOSE_BUTTON.remove();
    PARTY_SETTING_WINDOW_CLOSE_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_CHANGE_FORMATION_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_LEADER_CHANGE_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON != null){
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON.remove();
    PARTY_SETTING_WINDOW_PARTY_SCOUT_VISIBLE_BUTTON = null;
  }
  if(PARTY_SETTING_WINDOW_TITLE_LABEL != null){
    PARTY_SETTING_WINDOW_TITLE_LABEL.remove();
    PARTY_SETTING_WINDOW_TITLE_LABEL = null;
  }
  if(PARTY_SETTING_WINDOW != null){
    PARTY_SETTING_WINDOW.remove();
    PARTY_SETTING_WINDOW = null;
  }
  if(PARTY_SETTING_WINDOW_MASK != null){
    PARTY_SETTING_WINDOW_MASK.remove();
    PARTY_SETTING_WINDOW_MASK = null;
  }
}
