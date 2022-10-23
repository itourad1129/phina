//============================================
//  ギルド検索シーン
//============================================
//パブリック変数定義
var GUILD_SEARCH_PLAYER_INFO = null; //プレイヤー情報
var GUILD_SEARCH_LIST_OBJ = null; //パーティ表示用リスト
var GUILD_SEARCH_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
var GUILD_SEARCH_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
var GUILD_SEARCH_HEADER_SPRITE = null; //ヘッダーのスプライト
var GUILD_SEARCH_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var GUILD_SEARCH_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var GUILD_SEARCH_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var GUILD_SEARCH_LIST_HOME_POS_Y = 0; //リストの初期Y座標
var GUILD_SEARCH_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
var GUILD_SEARCH_LIST_LAYER = null; //リスト用レイヤー
var GUILD_SEARCH_UI_LAYER = null; //UI用レイヤー
var GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER = -1; //押した右ボタンの番号
var GUILD_SEARCH_SCENE_INIT_FLAG = false; //シーン初期化判定
var GUILD_SEARCH_RECOMMENDED_GUILD_DATAS = null; //オススメパーティデータ
var GUILD_SEARCH_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
var GUILD_SEARCH_AVATAR_DATAS = null; //表示するアバターデータ
var GUILD_SEARCH_AVATAR_ANIM_FRAME_TIME = 0; //アバターアニメフレーム更新用時間
var GUILD_SEARCH_SELECT_GUILD_INFO_ID = -1; //パーティ情報選択時のパーティID
var GUILD_SEARCH_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
var GUILD_SEARCH_UPDATE_GUILD_DATAS = null; //パーティリスト更新用パーティデータ
var GUILD_SEARCH_SELECT_GUILD_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
var GUILD_SEARCH_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
var GUILD_SEARCH_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
var GUILD_SEARCH_WINDOW = null; //ギルド検索ウィンドウ
var GUILD_SEARCH_WINDOW_MASK = null; //ギルド検索ウィンドウマスク
var GUILD_SEARCH_WINDOW_TITLE_LABEL = null; //ギルド検索ウィンド、タイトルウラベル
var GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //ギルド検索ウィンドウメインテキストラベル
var GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null; //ギルド検索ウィンドウテキスト挿入ボタン
var GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //ギルド検索ウィンドウで入力した検索ワードの文字列
var GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //検索文で検索するボタン
var GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //フレンドから検索用ボタン
var GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //おすすめから検索するボタン
var GUILD_SEARCH_SELECT_GUILD_ID = -1; //リスト選択中のギルドID
var GUILD_SEARCH_RESULT_CREATE_GUILD = null; //ギルド作成
var GUILD_SEARCH_JOIN_GUILD_ID = -1; //加入したギルドID

phina.define("GuildSearch", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "guildSearch";
    //メンバー初期化
    GUILD_SEARCH_LIST_TOUCH_AREA = null; //リストタッチ範囲
    GUILD_SEARCH_LIST_OBJ = null; //パーティ表示用リスト
    GUILD_SEARCH_LIST_OBJ_Y_POS_INIT = null; //パーティ表示リストの初期Y座標
    GUILD_SEARCH_CELL_SPRITE_ARRAY = new Array(); //リストに表示されるセルスプライトの配列
    GUILD_SEARCH_HEADER_SPRITE = null; //ヘッダーのスプライト
    GUILD_SEARCH_LIST_SCROLLE_START = 0;//スクロールのスタート位置
    GUILD_SEARCH_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    GUILD_SEARCH_LIST_HOME_POS_Y = 0; //リストの初期Y座標
    GUILD_SEARCH_RIGHT_BUTTONS = new Array(); //右に表示されるボタン
    GUILD_SEARCH_LIST_LAYER = null; //リスト用レイヤー
    GUILD_SEARCH_UI_LAYER = null; //UI用レイヤー
    GUILD_SEARCH_SCENE_INIT_FLAG = false; //シーン初期化判定
    GUILD_SEARCH_RECOMMENDED_GUILD_DATAS = null; //オススメパーティデータ
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL = null; //表示可能なパーティが居ない場合表示得るラベル
    GUILD_SEARCH_AVATAR_DATAS = null; //表示するアバターデータ
    GUILD_SEARCH_AVATAR_ANIM_FRAME_TIME = 0; //アバターアニメフレーム更新用時間
    GUILD_SEARCH_SELECT_GUILD_INFO_ID = -1; //パーティ情報選択時のパーティID
    GUILD_SEARCH_PLAYER_INFO = null; //プレイヤー情報
    GUILD_SEARCH_WINDOW_LAYER = null;// ウィンドウ表示用レイヤー
    GUILD_SEARCH_UPDATE_GUILD_DATAS = null; //パーティリスト更新用パーティデータ
    GUILD_SEARCH_SELECT_GUILD_LIST_TYPE = 1; //選択したパーティリスト (初期はマイパーティ)
    GUILD_SEARCH_LIST_START_TAP_POS_X = 0; //最初にタップした位置を記録
    GUILD_SEARCH_LIST_START_TAP_POS_Y = 0; //最初にタップした位置を記録
    GUILD_SEARCH_WINDOW = null; //ギルド検索ウィンドウ
    GUILD_SEARCH_WINDOW_MASK = null; //ギルド検索ウィンドウマスク
    GUILD_SEARCH_WINDOW_TITLE_LABEL = null; //ギルド検索ウィンド、タイトルウラベル
    GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL = null; //ギルド検索ウィンドウメインテキストラベル
    GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD = ""; //ギルド検索ウィンドウで入力した検索ワードの文字列
    GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null; //検索文で検索するボタン
    GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null; //フレンドから検索用ボタン
    GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null; //おすすめから検索するボタン
    GUILD_SEARCH_SELECT_GUILD_ID = -1; //リスト選択中のギルドID
    GUILD_SEARCH_JOIN_GUILD_ID = -1; //加入したギルドID

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    GUILD_SEARCH_LIST_LAYER = PlainElement({
    }).addChildTo(this);

    GUILD_SEARCH_LIST_TOUCH_AREA = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(GUILD_SEARCH_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    GUILD_SEARCH_LIST_TOUCH_AREA.setInteractive(true);

    GUILD_SEARCH_LIST_OBJ = PlainElement({
      width: 400,
      height: 960,
    }).addChildTo(GUILD_SEARCH_LIST_LAYER).setPosition(this.gridX.center() - (SCREEN_WIDTH / 5.35), this.gridY.center());
    GUILD_SEARCH_LIST_OBJ_Y_POS_INIT = GUILD_SEARCH_LIST_OBJ.y;

    GUILD_SEARCH_UI_LAYER = PlainElement({
    }).addChildTo(this);

    GUILD_SEARCH_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    //リストが0の時表示するラベル
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL = Label({
      text: '条件に当てはまる\nプレイヤーは存在しません。',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(GUILD_SEARCH_LIST_LAYER);

    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.y = this.gridY.center();
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.x = this.gridX.center();
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.y = GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.y - (SCREEN_HEIGHT / 5);
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.x = GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.x - (SCREEN_WIDTH / 5);
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.visible = false;

    //ヘッダー表示
    GUILD_SEARCH_HEADER_SPRITE = Sprite('ASSET_34').addChildTo(GUILD_SEARCH_UI_LAYER);
    GUILD_SEARCH_HEADER_SPRITE.x = this.gridX.center();
    GUILD_SEARCH_HEADER_SPRITE.y = GUILD_SEARCH_HEADER_SPRITE.height / 2;

    GUILD_SEARCH_HEADER_SPRITE['label'] = Label({
      text: 'ギルドサーチ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(GUILD_SEARCH_HEADER_SPRITE);

    //ボタンを生
    var rightBtnPosY = 0;
    for (var btn = 0; btn < 5; btn++) {
      //ボタン画像生成
      GUILD_SEARCH_RIGHT_BUTTONS[btn] = Sprite('ASSET_163').addChildTo(GUILD_SEARCH_UI_LAYER);
      if(btn == 0) rightBtnPosY = (GUILD_SEARCH_HEADER_SPRITE.y + GUILD_SEARCH_HEADER_SPRITE.height);
      else rightBtnPosY = (rightBtnPosY + ((GUILD_SEARCH_RIGHT_BUTTONS[btn].height) * 1.05));
      GUILD_SEARCH_RIGHT_BUTTONS[btn].y = rightBtnPosY;
      GUILD_SEARCH_RIGHT_BUTTONS[btn].x = this.gridX.center();
      GUILD_SEARCH_RIGHT_BUTTONS[btn].x = (GUILD_SEARCH_RIGHT_BUTTONS[btn].x + (SCREEN_WIDTH / 2)) - (GUILD_SEARCH_RIGHT_BUTTONS[btn].width / 2);
      //ボタンテキスト生成
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn_text'] = Label({
        text: '',
        fontSize: 24,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_SEARCH_RIGHT_BUTTONS[btn]);
      //ボタン本体生成
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn'] = Button({
        width: 240,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_SEARCH_RIGHT_BUTTONS[btn]);
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn']['btn_number'] = btn;
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn']['btn_active_flag'] = true;
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null
          && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(!this['btn_active_flag']) return;
          GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER = this['btn_number'];
        }
      };
      GUILD_SEARCH_RIGHT_BUTTONS[btn]['btn'].visible = false;
    }
    //各ボタンのテキストを更新
    G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(0,"戻る");
    G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(1,"おすすめギルド");
    G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(2,"ギルド検索");
    G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(3,"ギルドランキングTOP");
    G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(4,"自分のギルドを作る");

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['guild_search_scene_init'] = 1; //初期通信を開始
    ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
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
            GUILD_SEARCH_PLAYER_INFO = json['player_info'];
          }
          if(isset(json['avatar_datas'])){
            GUILD_SEARCH_AVATAR_DATAS = json['avatar_datas']; //アバターデータを取得
          }
          if(isset(json['result_guild_search_scene_init'])){ //シーン初期化処理
            if(isset(json['result_guild_search_scene_init']['recommended_guild_datas']))
            GUILD_SEARCH_UPDATE_GUILD_DATAS = json['result_guild_search_scene_init']['recommended_guild_datas'];
            GUILD_SEARCH_RECOMMENDED_GUILD_DATAS = json['result_guild_search_scene_init']['recommended_guild_datas'];
          }
          if(isset(json['result_recommended_guild_datas'])){ //おすすめギルドを取得
            GUILD_SEARCH_UPDATE_GUILD_DATAS = json['result_recommended_guild_datas'];
            GUILD_SEARCH_RECOMMENDED_GUILD_DATAS = json['result_recommended_guild_datas'];
            if(GUILD_SEARCH_SCENE_INIT_FLAG == true){
              G_GUILD_SEARCH_LIST_DELETE();
              G_GUILD_SEARCH_LIST_CREATE(GUILD_SEARCH_UPDATE_GUILD_DATAS);
            }
          }
          if(isset(json['result_search_player_friend_guild_datas'])){ //フレンド所属のギルドを取得
            GUILD_SEARCH_UPDATE_GUILD_DATAS = json['result_search_player_friend_guild_datas'];
            if(GUILD_SEARCH_SCENE_INIT_FLAG == true){
              G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(); //ギルド検索ウィンドウを閉じる
              G_GUILD_SEARCH_LIST_DELETE();
              G_GUILD_SEARCH_LIST_CREATE(GUILD_SEARCH_UPDATE_GUILD_DATAS);
            }
          }
          if(isset(json['result_search_guild_name_guild_datas'])){ //ギルド名でギルド検索した結果
            GUILD_SEARCH_UPDATE_GUILD_DATAS = json['result_search_guild_name_guild_datas'];
            if(GUILD_SEARCH_SCENE_INIT_FLAG == true){
              G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(); //ギルド検索ウィンドウを閉じる
              G_GUILD_SEARCH_LIST_DELETE();
              G_GUILD_SEARCH_LIST_CREATE(GUILD_SEARCH_UPDATE_GUILD_DATAS);
            }
          }
          if(isset(json['result_check_create_my_guild'])){ //ギルドの設立を選択した(設立チェック)
            var checkCreateGuild = json['result_check_create_my_guild'];
            if(isset(checkCreateGuild['error']) && isset(checkCreateGuild['error_comment']) && isset(checkCreateGuild['item_data'])){
              var itemData = checkCreateGuild['item_data'];
              var errorComment = checkCreateGuild['error_comment'].replace(/¥n/g,'\n');
              if(parseInt(checkCreateGuild['error']) == 0){ //エラーなし
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルドの設立","個人ギルドを設立します\n消費アイテム：" + itemData['item_name'] + " x 1",1,"resultCheckCreateMyGuildWindowSuccess");
              }
              else{ //エラーで設立不可
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルドの設立",errorComment,0,"resultCheckCreateMyGuildWindowError");
              }
            }
          }
          if(isset(json['result_create_my_guild'])){ //ギルドの設立を実行した。
            var resultCreateGuild = json['result_create_my_guild'];
            if(isset(resultCreateGuild['error']) && isset(resultCreateGuild['error_comment'])){
              if(resultCreateGuild['error'] == 0){ //エラーなし
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルドの設立","ギルドを設立しました\nギルドルームに移動します。",0,"resultCreateGuildWindowSuccess");
              }
              else{ //エラー
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"エラー",resultCreateGuild['error_comment'],0,"resultCreateGuildWindowError");
              }
            }
          }
          if(isset(json['result_post_guild_join_application'])){ //ギルド加入申請を送信した
            var resultJoinApp = json['result_post_guild_join_application'];
            if(isset(resultJoinApp['error']) && isset(resultJoinApp['error_comment'])){
              if(resultJoinApp['error'] == 0){ //送信成功
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"加入申請を送信","ギルド加入申請を送信しました",0,"resultPostGuildJoinApplicationSuccess");
              }
              else{ //送信エラー
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"エラー",resultJoinApp['error_comment'],0,"resultPostGuildJoinApplicationError");
              }
            }
          }
          if(isset(json['result_guild_join_for_no_application_required'])){ //承認不要のギルドに加入した
            var resultJoinGuild = json['result_guild_join_for_no_application_required'];
            if(isset(resultJoinGuild['error']) && isset(resultJoinGuild['error_comment'])){
              if(resultJoinGuild['error'] == 0){ //送信成功
                GUILD_SEARCH_JOIN_GUILD_ID = resultJoinGuild['join_guild_id'];
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルド加入","ギルドに加入しました",0,"resultGuildJoinSuccess");
              }
              else{ //送信エラー
                G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"エラー",resultJoinGuild['error_comment'],0,"resultGuildJoinError");
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
    if(GUILD_SEARCH_SCENE_INIT_FLAG == false && GUILD_SEARCH_RECOMMENDED_GUILD_DATAS != null){
      G_GUILD_SEARCH_LIST_CREATE(GUILD_SEARCH_RECOMMENDED_GUILD_DATAS); //初期パーティリスト生成
      GUILD_SEARCH_SCENE_INIT_FLAG = true;
    }
    //右ボタンのイベント
    if(GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER != -1){ //ボタンを押した場合
      GUILD_SEARCH_SELECT_GUILD_LIST_TYPE = GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER; //選択したパーティリストタイプを設定
      switch (GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER) {
        case 0: //戻る
        {
          var prevSceneName = SCENE_MANAGER['prev_scene'];
          SCENE_MANAGER['prev_scene'] = "guildSearch";
          this.exit(prevSceneName);
        }
        break;
        case 1: //おすすめギルド
        {
          G_GUILD_SEARCH_LIST_UPDATE("get_recommended_guild_datas");
        }
        break;
        case 2: //ギルド検索
        {
          G_GUILD_SEARCH_CREATE_GUILD_SEARCH_WINDOW(GUILD_SEARCH_WINDOW_LAYER);
        }
        break;
        case 3: //ギルドランキングTOP
        {
          //G_GUILD_SEARCH_LIST_UPDATE("get_send_friend_request_datas");
          var prevSceneName = SCENE_MANAGER['prev_scene'];
          SCENE_MANAGER['prev_scene'] = "guildSearch";
          this.exit("eventTop", {start_event_category: 1}); //テストでポイントランキング表示中
        }
        break;
        case 4: //自分のギルドを立てる
        {
          G_GUILD_SEARCH_LIST_UPDATE("create_my_guild");
        }
        break;
        case 100: //フレンドの所属しているギルドを表示
        {
          G_GUILD_SEARCH_LIST_UPDATE("get_guild_search_friend");
        }
        break;
        default:
        {

        }
        break;
      }
      GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER = -1;
    }
    //アバターアニメ更新処理
    if(GUILD_SEARCH_SCENE_INIT_FLAG == true){
      GUILD_SEARCH_AVATAR_ANIM_FRAME_TIME += PHINA_APP.deltaTime;
      //0.15秒でアニメフレーム変更
      if(150 < GUILD_SEARCH_AVATAR_ANIM_FRAME_TIME){
        GUILD_SEARCH_AVATAR_ANIM_FRAME_TIME = 0;
        if(GUILD_SEARCH_CELL_SPRITE_ARRAY != null && Array.isArray(GUILD_SEARCH_CELL_SPRITE_ARRAY)){
          for (var i = 0; i < GUILD_SEARCH_CELL_SPRITE_ARRAY.length; i++) {
            if(isset(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar'])){
              var startFrame = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_frame_data']['start_frame_index'];
              var endFrame = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['play_anim_frame_data']['end_frame_index'];
              var playFrameNow = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'];
              if(startFrame <= playFrameNow && playFrameNow < endFrame){
                GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'] = parseInt(playFrameNow) + 1;
                GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar'].setFrameIndex(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index']);
              }
              else{ //最大フレームを過ぎて居た場合
                GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar']['avatar_frame_index'] = startFrame;
                GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['avatar'].setFrameIndex(startFrame);
              }
            }
          }
        }
      }
    }
    //ウィンドウに返し値があった。
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_RETURN_VAL['resultCheckCreateMyGuildWindowSuccess'] == "yes"){ //ギルドの設立を実行した。
        var postParam = new Object();
        postParam['exe_create_my_guild'] = 0;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['resultCreateGuildWindowSuccess'] == "ok"){ //ギルド設立完了のため、マイギルド画面に移動
        var prevScene = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "guildSearch";
        AREA_MODE = 2; //ギルド共有エリアに設定
        this.exit("map",{go_to_guild_home: GUILD_SEARCH_RESULT_CREATE_GUILD['my_guild_data']['guild_id']});
      }
      if(WINDOW_RETURN_VAL['startPostGuildJoinApplication'] == "yes"){ //ギルド加入申請を実行した
        var postParam = new Object();
        postParam['exe_post_guild_join_application'] = GUILD_SEARCH_SELECT_GUILD_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['startGuildJoin'] == "yes"){ //承認不要のギルドに加入を行った
        var postParam = new Object();
        postParam['exe_guild_join_for_no_application_required'] = GUILD_SEARCH_SELECT_GUILD_ID;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['resultGuildJoinSuccess'] == "ok"){ //ギルド加入後の処理
        var prevScene = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "guildSearch";
        AREA_MODE = 2; //ギルド共有エリアに設定
        this.exit("map",{go_to_guild_home: GUILD_SEARCH_JOIN_GUILD_ID});
      }
      WINDOW_RETURN_VAL = null;
    }
    //検索ワードが入力された
    if(GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD != ""){
      if(GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null){
        GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text = GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD;
        GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD = "";
      }
    }

  },
});

//ボタンのテキストを変更する
function G_GUILD_SEARCH_RIGHT_BUTTON_TEXT_UPDATE(btnIndex,btnText,btnTextSize = 24){
  if(Array.isArray(GUILD_SEARCH_RIGHT_BUTTONS) && isset(GUILD_SEARCH_RIGHT_BUTTONS[btnIndex]['btn_text'])){
    GUILD_SEARCH_RIGHT_BUTTONS[btnIndex]['btn_text'].fontSize = btnTextSize;
    GUILD_SEARCH_RIGHT_BUTTONS[btnIndex]['btn_text'].text = btnText;
  }
}

function G_GUILD_SEARCH_LIST_UPDATE(postParamName){ //パーティリストの更新を行う(データをを取得してリストを更新)
  if(NETWORK_IS_CONNECTING == false){
    var guildListUpdateParam = new Object();
    guildListUpdateParam[postParamName] = GUILD_SEARCH_PLAYER_INFO['player_index_id']; //自分のIDを設定
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/guildSearch/guildSearch.php",guildListUpdateParam); //非同期通信開始
  }
}

function G_GUILD_SEARCH_LIST_CREATE(guildDatas){ //パーティ表示用リストを生成
  var updatePosY = 0;
  var listObjHeightSize = 0;
  if(guildDatas != null && Array.isArray(guildDatas) && isset(guildDatas) && guildDatas.length != 0){ //1つ以上のパーティが存在した場合
    GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.visible = false;
    for (var i = 0; i < guildDatas.length; i++) {
      //セル本体スプライト
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i] = Sprite('ASSET_162').addChildTo(GUILD_SEARCH_LIST_OBJ);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_id'] = guildDatas[i]['guild_id'];
      //パーティ名
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'] = Label({
        text: '',
        fontSize: 18,
        fill: 'black',
        align: 'left',
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
      if(isset(guildDatas[i]['guild_name'])) GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'].text = guildDatas[i]['guild_name'];
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'].x = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'].x - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].width / 2.2);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'].y = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['guild_name_label'].y - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 3);
      //アバター
      if(isset(guildDatas[i]['emblem_sprite_ids'])){
        GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'] = G_ASSET_CREATE_GUILD_EMBLEM(guildDatas[i]['emblem_sprite_ids'],256);
        GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'].addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
        GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'].x = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'].x - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].width / 3.2);
        GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'].y = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['emblem'].y - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 2.5);
      }
      //プレイヤープロフィールボタン(アバター画像の上)
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'] = Button({
      //   width: 140,         // 横サイズ
      //   height: 140,        // 縦サイズ
      // }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'].x = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'].x - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].width / 3);
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button']['select_party_index_id'] = partyDatas[i]['player_index_id'];
      // //タップ開始位置を記録
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointstart = function(e){
      //   GUILD_SEARCH_LIST_START_TAP_POS_X = e.pointer.x;
      //   GUILD_SEARCH_LIST_START_TAP_POS_Y = e.pointer.y;
      // };
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'].onpointend = function(e){
      //   if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
      //     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      //     if(GUILD_SEARCH_LIST_START_TAP_POS_X != e.pointer.x || GUILD_SEARCH_LIST_START_TAP_POS_Y != e.pointer.y) return;
      //     G_UI_CREATE_PLAYER_PROFILE(GUILD_SEARCH_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
      //   }
      // };
      // GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['player_profile_button'].visible = false;
      // ギルドレベル
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['level_label'] = Label({
        text: '',
        fontSize: 24,
        fill: 'black',
        align: 'right',
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
      //PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x = PARTY_CELL_SPRITE_ARRAY[i]['level_label'].x + (PARTY_CELL_SPRITE_ARRAY[i].width / 2.2);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['level_label'].y = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['level_label'].y + (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 3);
      if(isset(guildDatas[i]['exp'])) {
        var getGuildLevelMatser = G_GUILD_GET_GUILD_LEVEL_MASTER_DATA(guildDatas[i]['exp'],MASTER_DATA_GUILD_LEVEL_MASTER);
        var guildLevel = 1;
        if(getGuildLevelMatser != null){ guildLevel = getGuildLevelMatser['level']; }
        GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['level_label'].text = "LV." + getGuildLevel;
      }

      //ボタン上
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'] = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].x + (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].width / 3.7);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].y - (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン上　テキスト
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_text'] = Label({
        text: '詳細',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      //ボタン上本体
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite']);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper']['guild_id'] = guildDatas[i]['guild_id'];
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper']['guild_name'] = guildDatas[i]['guild_name'];
      //タップ開始位置を記録
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper'].onpointstart = function(e){
        GUILD_SEARCH_LIST_START_TAP_POS_X = e.pointer.x;
        GUILD_SEARCH_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && GUILD_SEARCH_WINDOW == null){
        //   if(GUILD_SEARCH_LIST_START_TAP_POS_X != e.pointer.x || GUILD_SEARCH_LIST_START_TAP_POS_Y != e.pointer.y) return;
        //   if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        //   switch (GUILD_SEARCH_SELECT_GUILD_LIST_TYPE) {
        //     case 1: //マイフレンド
        //     {
        //       G_UI_CREATE_PLAYER_PROFILE(GUILD_SEARCH_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        //     }
        //     break;
        //     case 2: //フレンド申請承認
        //     {
        //       //フレンド申請の削除
        //       GUILD_SEARCH_SELECT_GUILD_INFO_ID = this['select_party_index_id']; //削除するプレイヤーIDを設定
        //       var windowMainText = this['player_name'] + "\nフレンド申請を削除しますか?";
        //       G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"フレンド申請の削除",windowMainText,1,"friendApplicationDeleteWindow");
        //     }
        //     break;
        //     case 3:
        //     {
        //       G_UI_CREATE_PLAYER_PROFILE(GUILD_SEARCH_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        //     }
        //     break;
        //     case 4: //フレンド申請削除
        //     {
        //       G_UI_CREATE_PLAYER_PROFILE(GUILD_SEARCH_WINDOW_LAYER,this['select_party_index_id']); //プレイヤープロフィールを生成
        //     }
        //     break;
        //     default:
        //     break;
        //   }
        }
      };
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper'].visible = false;

      //ボタン下
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'] = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].x + (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].width / 3.7);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].y + (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 4.75);
      //ボタン下　テキスト
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'] = Label({
        text: '加入申請',
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      //ボタン下本体
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite']);
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom']['guild_id'] = guildDatas[i]['guild_id'];
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom']['guild_name'] = guildDatas[i]['guild_name'];
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom']['guild_scout_status'] = guildDatas[i]['guild_scout_status'];
      //GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom']['party_name'] = GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['party_name_label'].text;
      //ボタン状態の更新
      if(guildDatas[i]['guild_scout_status'] == 1) GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "加入";
      if(guildDatas[i]['guild_scout_status'] == 2) GUILD_SEARCH_CELL_SPRITE_ARRAY[i].alpha = 0.5;
      //タップ開始位置を記録
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointstart = function(e){
        GUILD_SEARCH_LIST_START_TAP_POS_X = e.pointer.x;
        GUILD_SEARCH_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom'].onpointend = function(e){
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && GUILD_SEARCH_WINDOW == null){
          if(GUILD_SEARCH_LIST_START_TAP_POS_X != e.pointer.x || GUILD_SEARCH_LIST_START_TAP_POS_Y != e.pointer.y) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (parseInt(this['guild_scout_status'])) {
            case 0:
            {
              GUILD_SEARCH_SELECT_GUILD_ID = this['guild_id'];
              G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"加入申請送信","ギルド加入申請を送信します。",1,"startPostGuildJoinApplication");
            }
            break;
            case 1:
            {
              GUILD_SEARCH_SELECT_GUILD_ID = this['guild_id'];
              G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルド加入","ギルド\n「" + this['guild_name'] + "」\nに加入します。",1,"startGuildJoin");
            }
            break;
            case 2:
            {
              GUILD_SEARCH_SELECT_GUILD_ID = this['guild_id'];
              G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"エラー","こちらのギルドは現在、\nメンバーを募集していません",0,"errorGuildNotScout");
            }
            break;
            default:
            break;
          }
        }
      };
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom'].visible = false;
      //パーツの初期化
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_sprite'].alpha = 1;
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_text'].fontSize = 20;
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 18;
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_sprite'].alpha = 1;
      //パーティ情報セル更新処理
      switch (GUILD_SEARCH_SELECT_GUILD_LIST_TYPE) {
        case 1: //マイフレンド
        {
        }
        break;
        case 2://フレンド申請承認
        {
          GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_upper_text'].text = "申請削除";
          GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請承認";
        }
        break;
        case 3: //フレンド申請削除
        {
          GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "申請削除";
        }
        break;
        case 4: //ブラックリスト管理
        {
          GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].text = "ブラックリスト解除";
          GUILD_SEARCH_CELL_SPRITE_ARRAY[i]['button_bottom_text'].fontSize = 16;
        }
        break;
        default:
        {

        }
        break;
      }
      //リストスワイプ処理
      if(i== 0){ GUILD_SEARCH_CELL_SPRITE_ARRAY[i].y = (GUILD_SEARCH_CELL_SPRITE_ARRAY[i].y - (SCREEN_HEIGHT / 2)) + ((GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height / 2) + GUILD_SEARCH_HEADER_SPRITE.height);
        updatePosY = GUILD_SEARCH_CELL_SPRITE_ARRAY[i].y;
      }
      else updatePosY = updatePosY + GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height;
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i].y = updatePosY;
      listObjHeightSize = listObjHeightSize + GUILD_SEARCH_CELL_SPRITE_ARRAY[i].height;
    }
    if(GUILD_SEARCH_CELL_SPRITE_ARRAY.length != 0){ //パーティが存在した場合
      //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
      GUILD_SEARCH_LIST_HOME_POS_Y = GUILD_SEARCH_LIST_OBJ.y; //初期座標を更新
      var listTopPos = (SCREEN_HEIGHT / 2) + GUILD_SEARCH_HEADER_SPRITE.height; //リストの頂点を取得;
      GUILD_SEARCH_LIST_TOUCH_AREA.update = function() {
        GUILD_SEARCH_LIST_TOUCH_AREA.onpointstart = function(e){
          GUILD_SEARCH_LIST_SCROLLE_START = e.pointer.y;
        };
        GUILD_SEARCH_LIST_TOUCH_AREA.onpointmove = function(e){
          GUILD_SEARCH_LIST_SCROLLE_MOVE = e.pointer.y;
          if(GUILD_SEARCH_LIST_SCROLLE_START < GUILD_SEARCH_LIST_SCROLLE_MOVE){//下
            GUILD_SEARCH_LIST_OBJ.y += e.pointer.dy;
            if(GUILD_SEARCH_LIST_HOME_POS_Y < GUILD_SEARCH_LIST_OBJ.y) GUILD_SEARCH_LIST_OBJ.y = GUILD_SEARCH_LIST_HOME_POS_Y;
          }
          if(GUILD_SEARCH_LIST_SCROLLE_START > GUILD_SEARCH_LIST_SCROLLE_MOVE){//上
            var nowYPos = GUILD_SEARCH_LIST_OBJ.y;
            GUILD_SEARCH_LIST_OBJ.y += e.pointer.dy;
            var lastCellPosY = GUILD_SEARCH_LIST_OBJ.y + GUILD_SEARCH_CELL_SPRITE_ARRAY[GUILD_SEARCH_CELL_SPRITE_ARRAY.length - 1].y; //最後のセルのポジションを取得
            var swipeMaxAreaPosY = SCREEN_HEIGHT - (GUILD_SEARCH_CELL_SPRITE_ARRAY[GUILD_SEARCH_CELL_SPRITE_ARRAY.length - 1].height / 2);
            if(swipeMaxAreaPosY > lastCellPosY) GUILD_SEARCH_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
          }
        };
        GUILD_SEARCH_LIST_TOUCH_AREA.onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          GUILD_SEARCH_LIST_SCROLLE_START = 0;
          GUILD_SEARCH_LIST_SCROLLE_MOVE = 0;
        };
      }
    }
  }
  else{ //表示可能なパーティが存在しなかった。
    if(GUILD_SEARCH_LIST_COUNT_ZERO_LABEL != null){
      GUILD_SEARCH_LIST_COUNT_ZERO_LABEL.visible = true;
    }
  }
}

function G_GUILD_SEARCH_LIST_DELETE(){ //フレンドリストを削除する。
  if(GUILD_SEARCH_CELL_SPRITE_ARRAY.length != 0){
    for (var i = 0; i < GUILD_SEARCH_CELL_SPRITE_ARRAY.length; i++) {
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i].remove();
      GUILD_SEARCH_CELL_SPRITE_ARRAY[i] = null;
    }
    GUILD_SEARCH_CELL_SPRITE_ARRAY = new Array();
  }
  GUILD_SEARCH_LIST_OBJ.y = GUILD_SEARCH_LIST_OBJ_Y_POS_INIT; //Y座標を初期位置に戻す
}

function G_GUILD_SEARCH_CREATE_GUILD_SEARCH_WINDOW(parentBase){ //ギルド検索ウィンドウを表示
  if(GUILD_SEARCH_WINDOW != null || GUILD_SEARCH_WINDOW_MASK != null) return;
  GUILD_SEARCH_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase); //マスクを表示
  GUILD_SEARCH_WINDOW = Sprite('ASSET_160').addChildTo(GUILD_SEARCH_WINDOW_MASK); //ウィンドウを表示
  //タイトル
  GUILD_SEARCH_WINDOW_TITLE_LABEL = Label({
    text: 'ギルド検索',
    fontSize: 42,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_TITLE_LABEL.y = GUILD_SEARCH_WINDOW_TITLE_LABEL.y - (GUILD_SEARCH_WINDOW.height / 2.5);
  //本文
  GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL = Label({
    text: 'ギルド名から検索\n\n\n\n\n\nフレンドから検索\n\n\nオススメから検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL.y = GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL.y - (GUILD_SEARCH_WINDOW.height * 0.1);
  //検索文入力用ボタン(画像)
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = Sprite('ASSET_34').addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.setScale(0.85,0.85);
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y = GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y - (GUILD_SEARCH_WINDOW.height * 0.225);
  //検索文入力用ボタン(テキスト)
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'] = Label({
    text: '検索ワードを入力...',
    fontSize: 30,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON);
  //検索文入力用ボタン(本体)
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'] = Button({
    width: 526,         // 横サイズ
    height: 60,        // 縦サイズ
  }).addChildTo(GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON);
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'].visible = false;
  GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD = window.prompt("検索するワードを入力", "");
    }
  };
  //検索文用検索ボタン
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y = GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.y;
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y = GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.y + (GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.height * 1.4);
  //検索文用検索ボタン(ラベル)
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON);
  //検索文用検索ボタン(ボタン)
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON);
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null && GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text != ""
      && GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text != "検索ワードを入力..."){
        var postParam = new Object();
        postParam['set_guild_search_name'] = GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON['label'].text;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guildSearch/guildSearch.php",postParam); //非同期通信開始
      }
      else{ //検索ワードが空の場合
        G_NORMAL_WINDOW_CREATE(GUILD_SEARCH_WINDOW_LAYER,"ギルド検索","検索ワードを入力して下さい",0,"guildSearchWindowError");
      }
    }
  };
  GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON['button'].visible = false;
  //フレンド検索用検索ボタン(画像)
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.y = GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.y + (GUILD_SEARCH_WINDOW.height * 0.05);
  //フレンド検索用検索ボタン(ラベル)
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON);
  //フレンド検索用検索ボタン(ボタン本体)
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON);
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER = 100; //フレンドギルドの表示形式にする
      G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(); //ギルド検索ウィンドウを閉じる
    }
  };
  GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON['button'].visible = false;
  //オススメ検索用検索ボタン(画像)
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.y = GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.y + (GUILD_SEARCH_WINDOW.height * 0.2);
  //オススメ検索用検索ボタン(ラベル)
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['label'] = Label({
    text: '検索',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON);
  //オススメ検索用検索ボタン(ボタン本体)
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON);
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      GUILD_SEARCH_RIGHT_BUTTON_PUSH_NUMBER = 1; //おすすめの表示形式にする
      G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(); //ギルド検索ウィンドウを閉じる
    }
  };
  GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON['button'].visible = false;
  //閉じるボタン(画像)
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON = Sprite('ASSET_79').addChildTo(GUILD_SEARCH_WINDOW);
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON.y = GUILD_SEARCH_WINDOW_CLOSE_BUTTON.y + (GUILD_SEARCH_WINDOW.height / 2.75);
  //閉じるボタン(テキスト)
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON['label'] = Label({
    text: '閉じる',
    fontSize: 38,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_SEARCH_WINDOW_CLOSE_BUTTON);
  //閉じるボタン(ボタン本体)
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_SEARCH_WINDOW_CLOSE_BUTTON);
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(); //ギルド検索ウィンドウを閉じる
    }
  };
  GUILD_SEARCH_WINDOW_CLOSE_BUTTON['button'].visible = false;
}

function G_GUILD_CLOSE_GUILD_SEARCH_WINDOW(){ //ギルド検索ウィンドウを閉じる
  if(GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD != ""){
    GUILD_SEARCH_WINDOW_INPUT_SEARCH_WORD = "";
  }
  if(GUILD_SEARCH_WINDOW_CLOSE_BUTTON != null){
    GUILD_SEARCH_WINDOW_CLOSE_BUTTON.remove();
    GUILD_SEARCH_WINDOW_CLOSE_BUTTON = null;
  }
  if(GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON != null){
    GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON.remove();
    GUILD_SEARCH_WINDOW_RECOMMENDATION_START_SEARCH_BUTTON = null;
  }
  if(GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON != null){
    GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON.remove();
    GUILD_SEARCH_WINDOW_FRIEND_START_SEARCH_BUTTON = null;
  }
  if(GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON != null){
    GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON.remove();
    GUILD_SEARCH_WINDOW_TEXT_START_SEARCH_BUTTON = null;
  }
  if(GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON != null){
    GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON.remove();
    GUILD_SEARCH_WINDOW_TEXT_INPUT_BOX_BUTTON = null;
  }
  if(GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL != null){
    GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL.remove();
    GUILD_SEARCH_WINDOW_MAIN_TEXT_LABEL = null;
  }
  if(GUILD_SEARCH_WINDOW_TITLE_LABEL != null){
    GUILD_SEARCH_WINDOW_TITLE_LABEL.remove();
    GUILD_SEARCH_WINDOW_TITLE_LABEL = null;
  }
  if(GUILD_SEARCH_WINDOW != null){
    GUILD_SEARCH_WINDOW.remove();
    GUILD_SEARCH_WINDOW = null;
  }
  if(GUILD_SEARCH_WINDOW_MASK != null){
    GUILD_SEARCH_WINDOW_MASK.remove();
    GUILD_SEARCH_WINDOW_MASK = null;
  }
}
