//============================================
//  ギルド検索シーン
//============================================
//パブリック変数定義
var GUILD_PLAYER_INFO = null; //プレイヤー情報
var GUILD_LIST_OBJ = null; //パーティ表示用リスト
var GUILD_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
var GUILD_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
var GUILD_HEADER_SPRITE = null; //ヘッダーのスプライト
var GUILD_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var GUILD_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var GUILD_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var GUILD_LIST_HOME_POS_Y = 0; //リストの初期Y座標
var GUILD_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
var GUILD_LIST_LAYER = null; //リスト用レイヤー
var GUILD_UI_LAYER = null; //UI用レイヤー
var GUILD_RIGHT_BUTTON_PUSH_NUMBER = -1; //押した右ボタンの番号
var GUILD_SCENE_INIT_FLAG = false; //シーン初期化判定
var GUILD_MY_GUILD_DATAS = null; //オススメパーティデータ
var GUILD_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
var GUILD_AVATAR_DATAS = null; //表示するアバターデータ
var GUILD_AVATAR_ANIM_FRAME_TIME = 0; //アバターアニメフレーム更新用時間
var GUILD_SELECT_GUILD_INFO_ID = -1; //パーティ情報選択時のパーティID
var GUILD_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
var GUILD_UPDATE_GUILD_DATAS = null; //パーティリスト更新用パーティデータ
var GUILD_SELECT_GUILD_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
var GUILD_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
var GUILD_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
phina.define("Friend", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "guildSearch";
    //メンバー初期化
    GUILD_LIST_TOUCH_AREA = null; //リストタッチ範囲
    GUILD_LIST_OBJ = null; //パーティ表示用リスト
    GUILD_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
    GUILD_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
    GUILD_HEADER_SPRITE = null; //ヘッダーのスプライト
    GUILD_LIST_SCROLLE_START = 0;//スクロールのスタート位置
    GUILD_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    GUILD_LIST_HOME_POS_Y = 0; //リストの初期Y座標
    GUILD_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
    GUILD_LIST_LAYER = null; //リスト用レイヤー
    GUILD_UI_LAYER = null; //UI用レイヤー
    GUILD_SCENE_INIT_FLAG = false; //シーン初期化判定
    RIEND_MY_GUILD_DATAS = null; //オススメパーティデータ
    GUILD_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
    GUILD_AVATAR_DATAS = null; //表示するアバターデータ
    GUILD_AVATAR_ANIM_FRAME_TIME = 0; //アバターアニメフレーム更新用時間
    GUILD_SELECT_GUILD_INFO_ID = -1; //パーティ情報選択時のパーティID
    GUILD_PLAYER_INFO = null; //プレイヤー情報
    GUILD_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
    GUILD_UPDATE_GUILD_DATAS = null; //パーティリスト更新用パーティデータ
    GUILD_SELECT_GUILD_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
    GUILD_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
    GUILD_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    GUILD_LIST_LAYER = PlainElement({
    }).addChildTo(this);

    GUILD_LIST_TOUCH_AREA = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(GUILD_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    GUILD_LIST_TOUCH_AREA.setInteractive(true);

    GUILD_LIST_OBJ = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(GUILD_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    GUILD_LIST_OBJ_Y_POS_INIT = GUILD_LIST_OBJ.y;

    GUILD_UI_LAYER = PlainElement({
    }).addChildTo(this);

    GUILD_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    //リストが0の時表示するラベル
    GUILD_LIST_COUNT_ZERO_LABEL = Label({
      text: '条件に当てはまる\nプレイヤーは存在しません。',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(GUILD_LIST_LAYER);

    GUILD_LIST_COUNT_ZERO_LABEL.y = this.gridY.center();
    GUILD_LIST_COUNT_ZERO_LABEL.x = this.gridX.center();
    GUILD_LIST_COUNT_ZERO_LABEL.y = GUILD_LIST_COUNT_ZERO_LABEL.y - (SCREEN_HEIGHT / 5);
    GUILD_LIST_COUNT_ZERO_LABEL.x = GUILD_LIST_COUNT_ZERO_LABEL.x - (SCREEN_WIDTH / 5);
    GUILD_LIST_COUNT_ZERO_LABEL.visible = false;

    //ヘッダー表示
    GUILD_HEADER_SPRITE = Sprite('ASSET_34').addChildTo(GUILD_UI_LAYER);
    GUILD_HEADER_SPRITE.x = this.gridX.center();
    GUILD_HEADER_SPRITE.y = GUILD_HEADER_SPRITE.height / 2;

    Label({
      text: 'フレンド',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(GUILD_HEADER_SPRITE);

    //ボタンを生
    var rightBtnPosY = 0;
    for (var btn = 0; btn < 5; btn++) {
      //ボタン画像生成
      GUILD_RIGHT_BUTTONS[btn] = Sprite('ASSET_163').addChildTo(GUILD_UI_LAYER);
      if(btn == 0) rightBtnPosY = (GUILD_HEADER_SPRITE.y + GUILD_HEADER_SPRITE.height);
      else rightBtnPosY = (rightBtnPosY + ((GUILD_RIGHT_BUTTONS[btn].height) * 1.05));
      GUILD_RIGHT_BUTTONS[btn].y = rightBtnPosY;
      GUILD_RIGHT_BUTTONS[btn].x = this.gridX.center();
      GUILD_RIGHT_BUTTONS[btn].x = (GUILD_RIGHT_BUTTONS[btn].x + (SCREEN_WIDTH / 2)) - (GUILD_RIGHT_BUTTONS[btn].width / 2);
      //ボタンテキスト生成
      GUILD_RIGHT_BUTTONS[btn]['btn_text'] = Label({
        text: '',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_RIGHT_BUTTONS[btn]);
      //ボタン本体生成
      GUILD_RIGHT_BUTTONS[btn]['btn'] = Button({
        width: 240,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_RIGHT_BUTTONS[btn]);
      GUILD_RIGHT_BUTTONS[btn]['btn']['btn_number'] = btn;
      GUILD_RIGHT_BUTTONS[btn]['btn']['btn_active_flag'] = true;
      GUILD_RIGHT_BUTTONS[btn]['btn'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null
          && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(!this['btn_active_flag']) return;
          GUILD_RIGHT_BUTTON_PUSH_NUMBER = this['btn_number'];
        }
      };
      GUILD_RIGHT_BUTTONS[btn]['btn'].visible = false;
    }
    //各ボタンのテキストを更新
    G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(0,"戻る");
    G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(1,"マイフレンド");
    G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(2,"フレンド申請承認");
    G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(3,"フレンド申請削除");
    G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(4,"ブラックリスト管理");

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['guild_search_scene_init'] = 1; //自分のIDを設定
    ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
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
          if(isset(json['player_info'])){
            GUILD_PLAYER_INFO = json['player_info'];
          }
          if(isset(json['avatar_datas'])){
            GUILD_AVATAR_DATAS = json['avatar_datas']; //アバターデータを取得
          }
          if(isset(json['result_guild_search_scene_init'])){ //シーン初期化処理
            if(isset(json['result_guild_search_scene_init']['my_friend_datas']))
            GUILD_UPDATE_GUILD_DATAS = json['result_friend_scene_init']['my_friend_datas'];
            GUILD_MY_GUILD_DATAS = json['result_friend_scene_init']['my_friend_datas'];
          }
          if(isset(json['result_my_friend_datas'])){ //フレンドリストを取得
            GUILD_UPDATE_GUILD_DATAS = json['result_my_friend_datas'];
            GUILD_MY_GUILD_DATAS = json['result_my_friend_datas'];
            if(GUILD_SCENE_INIT_FLAG == true){
              G_GUILD_LIST_DELETE();
              G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
            }
          }
          if(isset(json['result_friend_request_datas'])){ //フレンド申請一覧を取得
            GUILD_UPDATE_GUILD_DATAS = json['result_friend_request_datas'];
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_send_friend_request_datas'])){ //送信したフレンド申請一覧を取得
            GUILD_UPDATE_GUILD_DATAS = json['result_send_friend_request_datas'];
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_player_black_list'])){ //ブラックリストを取得
            GUILD_UPDATE_GUILD_DATAS = json['result_player_black_list'];
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_delete_friend_list'])){ //フレンドの解除が行われた
            var resultFriendDelete = json['result_delete_friend_list'];
            if(resultFriendDelete == 1){
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンドの解除","フレンドを解除しました。",0,"resultFriendDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンドの解除に失敗しました。\nまたは既にフレンドになっていません。";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンドの解除",errorText,0,"resultFriendDeleteWindowError");
            }
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_friend_application'])){ //フレンド申請を承認した。
            var resultFriendApplication = json['result_friend_application'];
            if(resultFriendApplication['error'] == 0){
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の承認","フレンド申請を承認しました。",0,"resultFriendApplicationWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の承認に失敗しました。\n■エラー内容\n" + resultFriendApplication['error_comment'];
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の承認",errorText,0,"resultFriendApplicationWindowError");
            }
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_delete_friend_application'])){ //フレンド申請の削除が行われた
            var resultFriendApplicationDelete = json['result_delete_friend_application'];
            if(resultFriendApplicationDelete == 1){
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の削除","フレンド申請を削除しました。",0,"resultFriendApplicationDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の削除に失敗しました。\nまたは既に削除されています。";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の削除",errorText,0,"resultFriendApplicationDeleteWindowError");
            }
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_delete_send_friend_application'])){ //フレンド申請を取り消した
            var resultSendFriendApplicationDelete = json['result_delete_send_friend_application'];
            if(resultSendFriendApplicationDelete == 1){
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の取り消し","フレンド申請を取り消しました。",0,"resultSendFriendApplicationDeleteWindowSuccess");
            }
            else
            {
              var errorText = "フレンド申請の取り消しに失敗しました。\nまたは既に削除されています。";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の取り消し",errorText,0,"resultSendFriendApplicationDeleteWindowError");
            }
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
          }
          if(isset(json['result_delete_black_list'])){ //ブラックリストの解除が行われた
            var resultDeleteBlackList = json['result_delete_black_list'];
            if(resultDeleteBlackList == 1){
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"ブラックリストの解除","ブラックリストを解除しました。",0,"resultDeleteBlackListWindowSuccess");
            }
            else
            {
              var errorText = "ブラックリストの解除に失敗しました。\nまたは既に解除されています。";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"ブラックリストの解除",errorText,0,"resultDeleteBlackListWindowError");
            }
            G_GUILD_LIST_DELETE();
            G_GUILD_LIST_CREATE(GUILD_UPDATE_GUILD_DATAS);
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
    if(GUILD_SCENE_INIT_FLAG == false && GUILD_MY_GUILD_DATAS != null && GUILD_AVATAR_DATAS != null && GUILD_PLAYER_INFO != null){
      G_GUILD_LIST_CREATE(GUILD_MY_GUILD_DATAS); //初期パーティリスト生成
      GUILD_SCENE_INIT_FLAG = true;
    }
    //右ボタンのイベント
    if(GUILD_RIGHT_BUTTON_PUSH_NUMBER != -1){ //ボタンを押した場合
      GUILD_SELECT_GUILD_LIST_TYPE = GUILD_RIGHT_BUTTON_PUSH_NUMBER; //選択したパーティリストタイプを設定
      switch (GUILD_RIGHT_BUTTON_PUSH_NUMBER) {
        case 0: //戻る
        {
          var prevSceneName = SCENE_MANAGER['prev_scene'];
          SCENE_MANAGER['prev_scene'] = "friend";
          this.exit(prevSceneName);
        }
        break;
        case 1: //マイフレンド
        {
          G_GUILD_LIST_UPDATE("get_my_friend_datas");
        }
        break;
        case 2: //フレンド承認リスト
        {
          G_GUILD_LIST_UPDATE("get_friend_request_datas");
        }
        break;
        case 3: //送信したフレンド申請一覧
        {
          G_GUILD_LIST_UPDATE("get_send_friend_request_datas");
        }
        break;
        case 4: //ブラックリストを取得
        {
          G_GUILD_LIST_UPDATE("get_player_black_list");
        }
        break;
        default:
        {

        }
        break;
      }
      GUILD_RIGHT_BUTTON_PUSH_NUMBER = -1;
    }
    //アバターアニメ更新処理
    if(GUILD_SCENE_INIT_FLAG == true){
      GUILD_AVATAR_ANIM_FRAME_TIME += PHINA_APP.deltaTime;
      //0.15秒でアニメフレーム変更
      if(150 < GUILD_AVATAR_ANIM_FRAME_TIME){
        GUILD_AVATAR_ANIM_FRAME_TIME = 0;
        if(GUILD_CELL_SPRITE_ARRAY != null && Array.isArray(GUILD_CELL_SPRITE_ARRAY)){
          for (var i = 0; i < GUILD_CELL_SPRITE_ARRAY.length; i++) {
            if(isset(GUILD_CELL_SPRITE_ARRAY[i]['avatar'])){
              var startFrame = GUILD_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_frame_data']['start_frame_index'];
              var endFrame = GUILD_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_frame_data']['end_frame_index'];
              var playFrameNow = GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'];
              if(startFrame <= playFrameNow && playFrameNow < endFrame){
                GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'] = parseInt(playFrameNow) + 1;
                GUILD_CELL_SPRITE_ARRAY[i]['avatar'].setFrameIndex(GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index']);
              }
              else{ //最大フレームを過ぎて居た場合
                GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'] = startFrame;
                GUILD_CELL_SPRITE_ARRAY[i]['avatar'].setFrameIndex(startFrame);
              }
            }
          }
        }
      }
    }
    //ウィンドウに返し値があった。
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_RETURN_VAL['friendApplicationWindow'] == "yes"){ //フレンド申請を承認した。
        if(NETWORK_IS_CONNECTING == false){
          var postParam = new Object();
          postParam['set_application_friend_id'] = GUILD_SELECT_GUILD_INFO_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
        }
      }
      if(WINDOW_RETURN_VAL['partyApplicationCancelWindow'] == "yes"){ //パーティ参加申請を無効にした。
        var postParam = new Object();
        postParam['set_application_cancel'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationCancelWindow'] == "yes"){ //パーティ招待を無効にした。
        var postParam = new Object();
        postParam['set_invitation_cancel'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyApplicationApprovalWindow'] == "yes"){ //パーティ参加申請を承認した。
        var postParam = new Object();
        postParam['set_application_approval'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyInvitationApprovalWindow'] == "yes"){ //パーティの招待から参加した。
        var postParam = new Object();
        postParam['set_invitation_approval'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyMemberExpulsionWindow'] == "yes"){ //パーティメンバーを追放した。
        var postParam = new Object();
        postParam['set_party_member_expulsion'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['partyCheckOutWindow'] == "yes"){ //パーティ離脱処理を実行した。
        var postParam = new Object();
        postParam['set_party_check_out'] = 1;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/party/party.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['friendDeleteWindow'] == "yes"){ //フレンドを解除した
        var postParam = new Object();
        postParam['set_delete_friend_list'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['friendApplicationDeleteWindow'] == "yes"){ //フレンド申請の削除を行った
        var postParam = new Object();
        postParam['set_delete_friend_application'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['deleteSendFriendApplicationWindow'] == "yes"){ //フレンド申請の取り消しが行われた
        var postParam = new Object();
        postParam['set_delete_send_friend_application'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['deleteBlackListWindow'] == "yes"){ //ブラックリストの解除が行われた
        var postParam = new Object();
        postParam['set_delete_black_list'] = GUILD_SELECT_GUILD_INFO_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/friend/friend.php",postParam); //非同期通信開始
      }
      WINDOW_RETURN_VAL = null;
    }
  },
});

//ボタンのテキストを変更する
function G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(GUILD_RIGHT_BUTTONS) && isset(GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_GUILD_LIST_UPDATE(postParamName){ //パーティリストの更新を行う(データをを取得してリストを更新)
  if(NETWORK_IS_CONNECTING == false){
    var friendListUpdateParam = new Object();
    friendListUpdateParam[postParamName] = GUILD_PLAYER_INFO['player_index_id']; //自分のIDを設定
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/friend/friend.php",friendListUpdateParam); //非同期通信開始
  }
}

//ボタンのテキストを変更する
function G_GUILD_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(GUILD_RIGHT_BUTTONS) && isset(GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    GUILD_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_GUILD_LIST_CREATE(partyDatas){ //パーティ表示用リストを生成
  var updatePosY = 0;
  var listObjHeightSize = 0;
  if(partyDatas != null && Array.isArray(partyDatas) && isset(partyDatas) && partyDatas.length != 0){ //1つ以上のパーティが存在した場合
    GUILD_LIST_COUNT_ZERO_LABEL.visible = false;
    for (var i = 0; i < partyDatas.length; i++) {
      //セル本体スプライト
      GUILD_CELL_SPRITE_ARRAY[i] = Sprite('ASSET_162').addChildTo(GUILD_LIST_OBJ);
      GUILD_CELL_SPRITE_ARRAY[i]['player_index_id'] = partyDatas[i]['player_index_id'];
      //パーティ名
      GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'] = Label({
        text: '',
        fontSize: 18,
        fill: 'black',
        align: 'left',
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
      if(isset(partyDatas[i]['player_name'])) GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].text = partyDatas[i]['player_name'];
      GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].x = GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].x - (GUILD_CELL_SPRITE_ARRAY[i].width / 2.2);
      GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].y = GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].y - (GUILD_CELL_SPRITE_ARRAY[i].height / 3);
      //アバター
      if(isset(partyDatas[i]['player_avatar_id'])){
        var avatarData = null;
        if(GUILD_AVATAR_DATAS != null && Array.isArray(GUILD_AVATAR_DATAS)){
          for (var a = 0; a < GUILD_AVATAR_DATAS.length; a++) {
            if(isset(GUILD_AVATAR_DATAS[a]['avatar_master_data']['avatar_asset_id'])){
              if(GUILD_AVATAR_DATAS[a]['avatar_master_data']['id'] == partyDatas[i]['player_avatar_id']){
                avatarData = GUILD_AVATAR_DATAS[a];
              }
            }
          }
        }
        if(avatarData != null){ //アバターが表示可能
          GUILD_CELL_SPRITE_ARRAY[i]['avatar'] = Sprite('ASSET_' + avatarData['avatar_master_data']['avatar_asset_id'],256,256).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
          GUILD_CELL_SPRITE_ARRAY[i]['avatar'].setFrameIndex(0);
          GUILD_CELL_SPRITE_ARRAY[i]['avatar'].x = GUILD_CELL_SPRITE_ARRAY[i]['avatar'].x - (GUILD_CELL_SPRITE_ARRAY[i].width / 3.2);
          GUILD_CELL_SPRITE_ARRAY[i]['avatar'].y = GUILD_CELL_SPRITE_ARRAY[i]['avatar'].y - (GUILD_CELL_SPRITE_ARRAY[i].height / 2.5);
          GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_data'] = avatarData; //アバターデータを挿入
          GUILD_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'] = 0; //再生中のフレームを挿入
          GUILD_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_category_id'] = 1; //再生中のアニメカテゴリーを挿入
          if(isset(avatarData['avatar_anim_datas']) && Array.isArray(avatarData['avatar_anim_datas'])){
            for (var f = 0; f < avatarData['avatar_anim_datas'].length; f++) {
              if(avatarData['avatar_anim_datas'][f]['anim_category_id'] == 1){ //立ちアニメーションの場合
                GUILD_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_frame_data'] = avatarData['avatar_anim_datas'][f];
                break;
              }
            }
          }
        }
      }
      //プレイヤープロフィールボタン(アバター画像の上)
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'] = Button({
        width: 140,         // 横サイズ
        height: 140,        // 縦サイズ
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'].x = GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'].x - (GUILD_CELL_SPRITE_ARRAY[i].width / 3);
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      //タップ開始位置を記録
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointstart = function(e){
        GUILD_LIST_START_TAP_POS_X = e.pointer.x;
        GUILD_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(GUILD_LIST_START_TAP_POS_X != e.pointer.x || GUILD_LIST_START_TAP_POS_Y != e.pointer.y) return;
          G_UI_CREATE_PLAYER_PROFILE(GUILD_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        }
      };
      GUILD_CELL_SPRITE_ARRAY[i]['player_profile_button'].visible = false;
      // パーティリーダーレベル
      GUILD_CELL_SPRITE_ARRAY[i]['level_label'] = Label({
        text: '',
        fontSize: 24,
        fill: 'black',
        align: 'right',
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
      //PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x = PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 2.2);
      GUILD_CELL_SPRITE_ARRAY[i]['level_label'].y = GUILD_CELL_SPRITE_ARRAY[i]['level_label'].y + (GUILD_CELL_SPRITE_ARRAY[i].height / 3);
      if(isset(partyDatas[i]['player_level'])) GUILD_CELL_SPRITE_ARRAY[i]['level_label'].text = "LV." + partyDatas[i]['player_level'];

      //ボタン上
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'] = Sprite('ASSET_79').addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x = GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x + (GUILD_CELL_SPRITE_ARRAY[i].width / 3.7);
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y = GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y - (GUILD_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン上　テキスト
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_text'] = Label({
        text: 'プレイヤー情報',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      //ボタン上本体
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper']['player_name'] = partyDatas[i]['player_name'];
      //タップ開始位置を記録
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper'].onpointstart = function(e){
        GUILD_LIST_START_TAP_POS_X = e.pointer.x;
        GUILD_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
          if(GUILD_LIST_START_TAP_POS_X != e.pointer.x || GUILD_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (GUILD_SELECT_GUILD_LIST_TYPE) {
            case 1: //マイフレンド
            {
              G_UI_CREATE_PLAYER_PROFILE(GUILD_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            case 2: //フレンド申請承認
            {
              //フレンド申請の削除
              GUILD_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を削除しますか?";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の削除",windowMainText,1,"friendApplicationDeleteWindow");
            }
            break;
            case 3:
            {
              G_UI_CREATE_PLAYER_PROFILE(GUILD_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            case 4: //フレンド申請削除
            {
              G_UI_CREATE_PLAYER_PROFILE(GUILD_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
            }
            break;
            default:
            break;
          }
        }
      };
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper'].visible = false;

      //ボタン下
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'] = Sprite('ASSET_79').addChildTo(GUILD_CELL_SPRITE_ARRAY[i]);
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x = GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x + (GUILD_CELL_SPRITE_ARRAY[i].width / 3.7);
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y = GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y + (GUILD_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン下　テキスト
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'] = Label({
        text: 'フレンド解除',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      //ボタン下本体
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom']['player_name'] = partyDatas[i]['player_name'];
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom']['party_name'] = GUILD_CELL_SPRITE_ARRAY[i]['party_name_label'].text;
      //タップ開始位置を記録
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointstart = function(e){
        GUILD_LIST_START_TAP_POS_X = e.pointer.x;
        GUILD_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
          if(GUILD_LIST_START_TAP_POS_X != e.pointer.x || GUILD_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (GUILD_SELECT_GUILD_LIST_TYPE) {
            case 1: //マイフレンド
            {
              //フレンド除外確認ウィンドウを表示
              GUILD_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //解除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンドを解除しますか?";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンドの解除",windowMainText,1,"friendDeleteWindow");
            }
            break;
            case 2: //フレンド申請承認
            {
              //申請承認用ウィンドウを生成
              GUILD_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //承認するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を承認しますか?";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の承認",windowMainText,1,"friendApplicationWindow");
            }
            break;
            case 3: //フレンド申請の取り消し
            {
              //フレンド申請取り消し用ウィンドウを生成
              GUILD_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nフレンド申請を取り消しますか?";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"フレンド申請の取り消し",windowMainText,1,"deleteSendFriendApplicationWindow");
            }
            break;
            case 4: //ブレックリスト管理
            {
              //ブレックリスト管理用ウィンドウを生成
              GUILD_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
              var windowMainText = this['player_name'] + "\nブラックリストを解除しますか?";
              G_NORMAL_WINDOW_CREATE(GUILD_WINDOW_LAYER,"ブラックリストの解除",windowMainText,1,"deleteBlackListWindow");
            }
            break;
            default:
            break;
          }
        }
      };
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom'].visible = false;
      //パーツの初期化
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].alpha = 1;
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_text'].fontSize = 20;
      GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 18;
      GUILD_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].alpha = 1;
      //パーティ情報セル更新処理
      switch (GUILD_SELECT_GUILD_LIST_TYPE) {
        case 1: //マイフレンド
        {
        }
        break;
        case 2://フレンド申請承認
        {
          GUILD_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "申請削除";
          GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請承認";
        }
        break;
        case 3: //フレンド申請削除
        {
          GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請削除";
        }
        break;
        case 4: //ブラックリスト管理
        {
          GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "ブラックリスト解除";
          GUILD_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 16;
        }
        break;
        default:
        {

        }
        break;
      }
      //リストスワイプ処理
      if(i== 0){ GUILD_CELL_SPRITE_ARRAY[i].y = (GUILD_CELL_SPRITE_ARRAY[i].y - (SCREEN_HEIGHT / 2)) + ((GUILD_CELL_SPRITE_ARRAY[i].height / 2) + GUILD_HEADER_SPRITE.height);
        updatePosY = GUILD_CELL_SPRITE_ARRAY[i].y;
      }
      else updatePosY = updatePosY + GUILD_CELL_SPRITE_ARRAY[i].height;
      GUILD_CELL_SPRITE_ARRAY[i].y = updatePosY;
      listObjHeightSize = listObjHeightSize + GUILD_CELL_SPRITE_ARRAY[i].height;
    }
    if(GUILD_CELL_SPRITE_ARRAY.length != 0){ //パーティが存在した場合
      //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
      GUILD_LIST_HOME_POS_Y = GUILD_LIST_OBJ.y; //初期座標を更新
      var listTopPos = (SCREEN_HEIGHT / 2) + GUILD_HEADER_SPRITE.height; //リストの頂点を取得;
      GUILD_LIST_TOUCH_AREA.update = function() {
        GUILD_LIST_TOUCH_AREA.onpointstart = function(e){
          GUILD_LIST_SCROLLE_START = e.pointer.y;
        };
        GUILD_LIST_TOUCH_AREA.onpointmove = function(e){
          GUILD_LIST_SCROLLE_MOVE = e.pointer.y;
          if(GUILD_LIST_SCROLLE_START < GUILD_LIST_SCROLLE_MOVE){//下
            GUILD_LIST_OBJ.y += e.pointer.dy;
            if(GUILD_LIST_HOME_POS_Y < GUILD_LIST_OBJ.y) GUILD_LIST_OBJ.y = GUILD_LIST_HOME_POS_Y;
          }
          if(GUILD_LIST_SCROLLE_START > GUILD_LIST_SCROLLE_MOVE){//上
            var nowYPos = GUILD_LIST_OBJ.y;
            GUILD_LIST_OBJ.y += e.pointer.dy;
            var lastCellPosY = GUILD_LIST_OBJ.y + GUILD_CELL_SPRITE_ARRAY[GUILD_CELL_SPRITE_ARRAY.length - 1].y; //最後のセルのポジションを取得
            var swipeMaxAreaPosY = SCREEN_HEIGHT - (GUILD_CELL_SPRITE_ARRAY[GUILD_CELL_SPRITE_ARRAY.length - 1].height / 2);
            if(swipeMaxAreaPosY > lastCellPosY) GUILD_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
          }
        };
        GUILD_LIST_TOUCH_AREA.onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          GUILD_LIST_SCROLLE_START = 0;
          GUILD_LIST_SCROLLE_MOVE = 0;
        };
      }
    }
  }
  else{ //表示可能なパーティが存在しなかった。
    if(GUILD_LIST_COUNT_ZERO_LABEL != null){
      GUILD_LIST_COUNT_ZERO_LABEL.visible = true;
    }
  }
}

function G_GUILD_LIST_DELETE(){ //フレンドリストを削除する。
  if(GUILD_CELL_SPRITE_ARRAY.length != 0){
    for (var i = 0; i < GUILD_CELL_SPRITE_ARRAY.length; i++) {
      GUILD_CELL_SPRITE_ARRAY[i].remove();
      GUILD_CELL_SPRITE_ARRAY[i] = null;
    }
    GUILD_CELL_SPRITE_ARRAY = new Array();
  }
  GUILD_LIST_OBJ.y = GUILD_LIST_OBJ_Y_POS_INIT; //Y座標を初期位置に戻す
}
