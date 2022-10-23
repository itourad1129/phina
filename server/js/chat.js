//チャット機能
var CHAT_WINDOW = null; //チャットウィンドウ
var CHAT_WINDOW_MASK = null; //チャットウィンドウマスク
var CHAT_WINDOW_BUTTON_LAYER = null; //チャットウィンドウボタンレイヤー
var CHAT_WINDOW_LIST_TOUCH_AREA = null; //リストタッチエリア
var CHAT_WINDOW_LIST_OBJ = null; //チャットウィンドウテキストリストオブジェクト
var CHAT_WINDOW_LIST_CELLS = new Array(); //チャットウィンドのリストセルを生成
var CHAT_WINDOW_LIST_SCROLLE_START = 0; //スクロールスタート位置
var CHAT_WINDOW_LIST_SCROLLE_MOVE = 0; //スクロール中の位置
var CHAT_WINDOW_LIST_SCROLLE_MAX_BOTTOM = 0; //スクロール最下層位置
var CHAT_WINDOW_PLAYER_AREA_INSTANCE = null; //プレイヤーが現在居るエリアインスタンスを取得
var CHAT_WINDOW_PLAYER_AREA_MASTER_DATA = null; //プレイヤーが現在居るエリアのマスターデータを取得
var CHAT_WINDOW_PLAYER_WORLD_INSTANCE = null; //プレイヤーが現在居るワールドインスタンスを取得
var CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA = null; //プレイヤーが現在居るワールドのマスターデータ
var CHAT_WINDOW_AREA_CHAT_LOGS = null; //エリアのチャットログ
var CHAT_WINDOW_WORLD_CHAT_LOGS = null; //ワールドのチャットログ
var CHAT_WINDOW_PARTY_CHAT_LOGS = null; //パーティのチャットログ
var CHAT_WINDOW_PLAYER_CHAT_LOGS = null; //プレイヤーのチャットログ
var CHAT_WINDOW_GUILD_CHAT_LOGS = null; //ギルドのチャットログ
var CHAT_WINDOW_LIST_TAP_START_POS = 0; //リストタップ開始位置
var CHAT_WINDOW_LIST_TAP_END_POS = 0; //リストタップ終了位置
var CHAT_WINDOW_INPUT_TEXT = ""; //入力したメッセージ
var CHAT_WINDOW_SEND_TEXT = ""; //送信するテキスト
var CHAT_WINDOW_CHAT_TYPE = 1; //1:エリアチャット,2:ワールドチャット,3:パーティチャット,4:プレイヤーチャット
var CHAT_WINDOW_INPUT_TMP_TEXT = ""; //入力途中のテキスト
var CHAT_WINDOW_PLAYER_PARTY_DATA = null; //プレイヤーのパーティ情報
var CHAT_WINDOW_PLAYER_GUILD_DATA = null; //所属ギルド情報
var CHAT_WINDOW_CHAT_SEND_PLAYER_NAME = ""; //チャット送信先のプレイヤー名
var CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID = -1; //チャット送信先のプレイヤーID
var CHAT_WINDOW_PLAYER_FRIEND_LIST = null; //フレンドリスト
var CHAT_WINDOW_FRIEND_LIST_CELL = new Array(); //フレンドリストのセル
var CHAT_WINDOW_FRIEND_LIST_TAP_POS_X = 0; //フレンドリストを最初にタップした位置X
var CHAT_WINDOW_FRIEND_LIST_TAP_POS_Y = 0; //フレンドリストを最初にタップした位置Y
var CHAT_WINDOW_PLAYER_STAMP_DATAS = null; //プレイヤーが所持しているスタンプリストのデータ
var CHAT_WINDOW_STAMP_LIST_CELL = new Array(); //スタンプリストのセル
var CHAT_WINDOW_STAMP_LIST_TAP_POS_Y = 0; //スタンプリストを最初にタップした位置Y
var CHAT_WINDOW_SELECT_STAMP_ID = -1; //選択中のスタンプID
var CHAT_WINDOW_AUTO_CHAT_UPDATE_DELTA = 0; //チャット更新時間判定用
var CHAT_WINDOW_CHAT_SCENE_INIT = false; //チャットシーン初期化判定用
var CHAT_WINDOW_TYPE = -1;//チャットウィンドウのタイプ -1:非表示 0:デフォルト 1:半透明
var CHAT_WINDOW_PLAYER_ROOM_ID = -1; //プレイヤールームID
var CHAT_WINDOW_PLAYER_GUILD_ID = -1; //所属しているギルドID
var CHAT_WINDOW_PLAYER_ROOM_DATA = null; //プレイヤーが現在居るルームデータを取得
var CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS = null; //プレイヤールームのチャットログ

function G_CHAT_CREATE_CHAT_WINDOW(parentBase,chatListNode,windowType = 0,roomId = -1,guildId = -1){ //チャットウィンドウを生成 windowType 0:デフォルト 1:半透明
  CHAT_WINDOW_TYPE = windowType; //ウィンドウタイプを更新
  CHAT_WINDOW_PLAYER_ROOM_ID = roomId;
  CHAT_WINDOW_PLAYER_GUILD_ID = guildId;
  if(CHAT_WINDOW_PLAYER_GUILD_ID != -1) CHAT_WINDOW_PLAYER_ROOM_ID = -1; //ギルドルームの場合はプレイヤールーム除外
  CHAT_WINDOW_CHAT_SCENE_INIT = false;
  if(CHAT_WINDOW_TYPE == 1){
    CHAT_WINDOW_MASK = Sprite('ASSET_106').addChildTo(chatListNode);//マスクを表示
    CHAT_WINDOW_MASK.setScale(0.625,0.625);
    CHAT_WINDOW_MASK.x = CHAT_WINDOW_MASK.x + (SCREEN_WIDTH * 0.18);
    CHAT_WINDOW_MASK.y = CHAT_WINDOW_MASK.y - (SCREEN_HEIGHT * 0.145);
    CHAT_WINDOW = Sprite('ASSET_106').addChildTo(CHAT_WINDOW_MASK);//チャットウィンドウのテキストレイヤーを生成
  }
  else{
    CHAT_WINDOW_MASK = Sprite('ASSET_64').addChildTo(chatListNode);//マスクを表示
    CHAT_WINDOW = Sprite('ASSET_170').addChildTo(CHAT_WINDOW_MASK);//チャットウィンドウのテキストレイヤーを生成
  }
  //テキストリスト生成
  //タッチエリアを生成
  CHAT_WINDOW_LIST_TOUCH_AREA = PlainElement({
    width: 440,
    height: 768,
  }).addChildTo(CHAT_WINDOW);
  CHAT_WINDOW_LIST_TOUCH_AREA.setInteractive(true);
  //リストオブジェクトを生成
  CHAT_WINDOW_LIST_OBJ = PlainElement({
  }).addChildTo(CHAT_WINDOW);
  CHAT_WINDOW_LIST_SCROLLE_MAX_BOTTOM = CHAT_WINDOW_LIST_OBJ.y;
  //スクロール処理
  CHAT_WINDOW_LIST_TOUCH_AREA.onpointstart = function(e){
    if(CHAT_WINDOW_LIST_CELLS.length == 0) return;
    if(WINDOW_NORMAL != null && NETWORK_IS_CONNECTING != false) return;
    CHAT_WINDOW_LIST_TAP_START_POS = e.pointer.y;
  }
  CHAT_WINDOW_LIST_TOUCH_AREA.onpointmove = function(e){
    if(CHAT_WINDOW_LIST_CELLS.length == 0) return;
    CHAT_WINDOW_LIST_SCROLLE_START = CHAT_WINDOW_LIST_OBJ.y;
    CHAT_WINDOW_LIST_OBJ.y += e.pointer.dy;
    CHAT_WINDOW_LIST_SCROLLE_MOVE = CHAT_WINDOW_LIST_OBJ.y;
    if(CHAT_WINDOW_LIST_SCROLLE_START > CHAT_WINDOW_LIST_SCROLLE_MOVE){ //上
      if(CHAT_WINDOW_LIST_SCROLLE_MAX_BOTTOM > CHAT_WINDOW_LIST_OBJ.y){
        CHAT_WINDOW_LIST_OBJ.y -= e.pointer.dy;
      }
    }
    if(CHAT_WINDOW_LIST_SCROLLE_START < CHAT_WINDOW_LIST_SCROLLE_MOVE){ //下
      var nowYPos = CHAT_WINDOW_LIST_OBJ.y;
      var lastCellPosY = CHAT_WINDOW_LIST_OBJ.y + (CHAT_WINDOW_LIST_CELLS[CHAT_WINDOW_LIST_CELLS.length - 1].y - CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].height); //最後のセルのポジションを取得
      var swipeMaxAreaPosY = -(SCREEN_HEIGHT / 2) + (CHAT_WINDOW_LIST_CELLS[CHAT_WINDOW_LIST_CELLS.length - 1].height / 2);
      if(swipeMaxAreaPosY > lastCellPosY){
      }
      else{
        CHAT_WINDOW_LIST_OBJ.y -= e.pointer.dy;//最大にスワイプできる領域を超えた
      }
    }
  };
  CHAT_WINDOW_LIST_TOUCH_AREA.onpointend = function(e){
    if(CHAT_WINDOW_LIST_CELLS.length == 0) return;
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    CHAT_WINDOW_LIST_TAP_END_POS = e.pointer.y;
  };
  //ボタンレイヤー生成
  CHAT_WINDOW_BUTTON_LAYER = Sprite('ASSET_169').addChildTo(CHAT_WINDOW);//チャットウィンドウのボタンレイヤーを生成
  //閉じるボタン生成
  CHAT_WINDOW_BUTTON_LAYER['close_btn'] = Button({
    width: 192,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['close_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    G_CHAT_WINDOW_DELETE(); //チャットウィンドウを閉じる
  };
  CHAT_WINDOW_BUTTON_LAYER['close_btn'].x = CHAT_WINDOW_BUTTON_LAYER['close_btn'].x + ((SCREEN_WIDTH / 2) - (CHAT_WINDOW_BUTTON_LAYER['close_btn'].width / 2));
  CHAT_WINDOW_BUTTON_LAYER['close_btn'].y = CHAT_WINDOW_BUTTON_LAYER['close_btn'].y - ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['close_btn'].height / 2));
  CHAT_WINDOW_BUTTON_LAYER['close_btn'].visible = false;
  //チャットタイプ変更ボタンの表示
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'] = Button({
    width: 192,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].x = CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].x - ((SCREEN_WIDTH / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].width / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].y = CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].y - ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].height / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn']['type_index'] = CHAT_WINDOW_CHAT_TYPE;
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    switch (parseInt(this['type_index'])) {
      case 1: //エリアチャット → ワールドチャット
      {
        CHAT_WINDOW_CHAT_TYPE = 2;
        this['type_index'] = 2;
        if(CHAT_WINDOW_WORLD_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA == null){
          CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
        }
        else{ //既に読み込み済みの場合、ログを切り替える
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ワールド";
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA['world_name'];
          G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_WORLD_CHAT_LOGS);
        }
      }
      break;
      case 2: //ワールドチャット → パーティチャット
      {
        CHAT_WINDOW_CHAT_TYPE = 3;
        this['type_index'] = 3;
        if(CHAT_WINDOW_PARTY_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_PARTY_DATA == null){
          CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
        }
        else{ //既に読み込み済みの場合、ログを切り替える
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 20; //フォントサイズ初期化
          var dispText = CHAT_WINDOW_PLAYER_PARTY_DATA['party_name'];
          if(8 < String(dispText).length){
            dispText = dispText.slice(0,7);
            dispText = dispText + "...";
          }
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = dispText;
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "パーティ";
          G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PARTY_CHAT_LOGS);
        }
      }
      break;
      case 3: //パーティチャット → プレイヤーチャット
      {
        CHAT_WINDOW_CHAT_TYPE = 4;
        this['type_index'] = 4;
        if(CHAT_WINDOW_PLAYER_CHAT_LOGS == null || CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID == -1){
          CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
          postParam['set_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
        }
        else{ //既に読み込み済みの場合、ログを切り替える
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
          var dispText = CHAT_WINDOW_CHAT_SEND_PLAYER_NAME;
          if(8 < String(dispText).length){
            dispText = dispText.slice(0,7);
            dispText = dispText + "...";
          }
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = dispText;
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 36;
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "プレイヤー";
          G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_CHAT_LOGS);
        }
      }
      break;
      case 4: //プレイヤーチャット → ルームチャット(※ルームに居ない場合はスキップしてギルドチャット) ギルドに居ない場合、スキップしてエリアチャット
      {
        console.log("ルーム->ギルド->エリア");
        console.log("CHAT_WINDOW_PLAYER_ROOM_ID->" + CHAT_WINDOW_PLAYER_ROOM_ID);
        console.log("CHAT_WINDOW_PLAYER_GUILD_ID->" + CHAT_WINDOW_PLAYER_GUILD_ID);
        if(CHAT_WINDOW_PLAYER_ROOM_ID == -1){ //ルームに居ない場合
          if(CHAT_WINDOW_PLAYER_GUILD_ID == -1){ //ギルドに居ない場合
            CHAT_WINDOW_CHAT_TYPE = 1;
            this['type_index'] = 1;
            if(CHAT_WINDOW_AREA_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_AREA_MASTER_DATA == null){
              CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
              var postParam = new Object();
              postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
              NETWORK_IS_CONNECTING = true;
              ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
            }
            else{ //既に読み込み済みの場合、ログを切り替える
              CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
              CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
              CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "エリア";
              CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_AREA_MASTER_DATA['area_name'];
              G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_AREA_CHAT_LOGS);
            }
          }
          else{
            CHAT_WINDOW_CHAT_TYPE = 6;
            this['type_index'] = 6;
            if(CHAT_WINDOW_GUILD_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_GUILD_DATA == null){
              CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
              var postParam = new Object();
              postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
              NETWORK_IS_CONNECTING = true;
              ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
            }
            else{ //既に読み込み済みの場合、ログを切り替える
              CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
              CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
              CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ギルド";
              CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = "ギルド";
              G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_GUILD_CHAT_LOGS);
            }
          }
        }
        else{
          CHAT_WINDOW_CHAT_TYPE = 5;
          this['type_index'] = 5;
          if(CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_ROOM_DATA == null){
            CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
            var postParam = new Object();
            postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
            postParam['map_event_trigger_id'] = roomId;
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
            console.log("ルームチャット通信開始");
          }
          else{ //既に読み込み済みの場合、ログを切り替える
            console.log("ルームチャット切りかえ表示");
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ルーム";
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = "ルーム";
            G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS);
          }
        }
      }
      break;
      case 5: //ルームチャット → ギルドチャット (※ギルドに居ない場合はスキップしてエリアチャット)
      {
        console.log("ルーム->ギルド");
        console.log("CHAT_WINDOW_PLAYER_ROOM_ID->" + CHAT_WINDOW_PLAYER_ROOM_ID);
        console.log("CHAT_WINDOW_PLAYER_GUILD_ID->" + CHAT_WINDOW_PLAYER_GUILD_ID);
        if(CHAT_WINDOW_PLAYER_GUILD_ID == -1){ //ギルドに居ない場合
          CHAT_WINDOW_CHAT_TYPE = 1;
          this['type_index'] = 1;
          if(CHAT_WINDOW_AREA_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_AREA_MASTER_DATA == null){
            CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
            var postParam = new Object();
            postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
          }
          else{ //既に読み込み済みの場合、ログを切り替える
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "エリア";
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_AREA_MASTER_DATA['area_name'];
            G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_AREA_CHAT_LOGS);
          }
        }else{
          CHAT_WINDOW_CHAT_TYPE = 6;
          this['type_index'] = 6;
          if(CHAT_WINDOW_GUILD_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_GUILD_DATA == null){
            CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
            var postParam = new Object();
            postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
          }
          else{ //既に読み込み済みの場合、ログを切り替える
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ギルド";
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = "ギルド";
            G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_GUILD_CHAT_LOGS);
          }
        }
      }
      break;
      case 6: //ギルドチャット → エリアチャット
      {
        CHAT_WINDOW_CHAT_TYPE = 1;
        this['type_index'] = 1;
        if(CHAT_WINDOW_AREA_CHAT_LOGS == null || CHAT_WINDOW_PLAYER_AREA_MASTER_DATA == null){
          CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
        }
        else{ //既に読み込み済みの場合、ログを切り替える
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
          CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "エリア";
          CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_AREA_MASTER_DATA['area_name'];
          G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_AREA_CHAT_LOGS);
        }
      }
      break;
      default:
      break;
    }
  };
  CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].visible = false;
  //チャットタイプ変更ボタンのラベルを生成
  CHAT_WINDOW_BUTTON_LAYER['chat_type_label'] = Label({
    text: "?????",
    fontSize: 42,
    fill: 'white',
    align: 'center',
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].x = CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].x;
  CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].y = CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].y;
  //チャット送信先名ボタン生成
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'] = Button({
    width: 192,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    switch (parseInt(CHAT_WINDOW_CHAT_TYPE)) {
      case 1: //エリアチャット
      {

      }
      break;
      case 2: //ワールドチャット
      {

      }
      break;
      case 3: //パーティチャット
      {

      }
      break;
      case 4: //プレイヤーチャット
      {
        CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
        var postParam = new Object();
        postParam['chat_window_get_player_friend_list'] = 1;
        postParam['set_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
        postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
      }
      break;
      case 5: //ルームチャット
      {

      }
      break;
      default:
      break;
    }
  };
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].x = CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].x - ((SCREEN_WIDTH / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].width / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].y = CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].y + ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].height / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].visible = false;
  //チャット送信先名ボタンのラベル生成
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'] = Label({
    text: "??????",
    fontSize: 26,
    fill: 'white',
    align: 'center',
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].x = CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].x;
  CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].y = CHAT_WINDOW_BUTTON_LAYER['chat_send_name_btn'].y;
  //テキスト入力ボタンを生成
  CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'] = Button({
    width: 258,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].y = CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].y + ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].height / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    CHAT_WINDOW_INPUT_TEXT = window.prompt("メッセージを入力", CHAT_WINDOW_INPUT_TMP_TEXT);
  };
  CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].visible = false;
  //テキスト入力ラベル
  CHAT_WINDOW_BUTTON_LAYER['chat_message_label'] = Label({
    text: "",
    fontSize: 28,
    fill: 'black',
    align: 'left',
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].x = CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].x;
  CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].y = CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].y;
  CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].x = CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].x - (CHAT_WINDOW_BUTTON_LAYER['chat_message_input_btn'].width / 2.25);
  //送信ボタンの表示
  CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'] = Button({
    width: 96,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].x = CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].x + ((SCREEN_WIDTH / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].width / 2));
  CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].y = CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].y + ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].height / 2))
  CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    if(CHAT_WINDOW_SEND_TEXT != ""){
      CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
      var postParam = new Object();
      postParam['set_chat_send_message'] = CHAT_WINDOW_SEND_TEXT;
      if(CHAT_WINDOW_SELECT_STAMP_ID != -1){ //スタンプIDが設定されていた場合
        postParam['set_chat_send_stamp_id'] = CHAT_WINDOW_SELECT_STAMP_ID;
      }
      postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
      postParam['set_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
      if(roomId != -1) postParam['map_event_trigger_id'] = roomId;
      CHAT_WINDOW_SEND_TEXT = "";
      CHAT_WINDOW_SELECT_STAMP_ID = -1;
      CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].text = "";
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
    }
    else{
      G_NORMAL_WINDOW_CREATE(parentBase,"エラー","メッセージが入力されていません",0,"inputMessageEmptyErrorWIndow");
    }
  };
  CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].visible = false;
  //スタンプボタンの表示
  CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'] = Button({
    width: 96,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(CHAT_WINDOW_BUTTON_LAYER);
  CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'].y = CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].y;
  CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'].x = (CHAT_WINDOW_BUTTON_LAYER['chat_send_btn'].x - CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'].width);
  CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'].visible = false;
  CHAT_WINDOW_BUTTON_LAYER['chat_stamp_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
    //スタンプリスト生成処理
    CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
    var postParam = new Object();
    postParam['get_player_stamp_list'] = 1;
    postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
  };

  //初期通信開始
  CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
  var postParam = new Object();
  postParam['chat_window_init'] = 1;
  postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
  postParam['init_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
  NETWORK_IS_CONNECTING = true;
  ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
  //アップデート処理
  CHAT_WINDOW.update = function() {
    if(CHAT_WINDOW_RESULT_DATA != -1 && CHAT_WINDOW_RESULT_DATA != "" && G_ASSET_LOADER(CHAT_WINDOW_RESULT_DATA)){
      var json = JSON.parse(CHAT_WINDOW_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          var resultChatType = -1;
          if(isset(json['result_chat_type'])){
            resultChatType = parseInt(json['result_chat_type']);
            CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 26; //フォントサイズ初期化
            CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 42; //フォントサイズ初期化
          }
          //初期化オブジェクト処理
          if(isset(json["result_chat_scene_init"])){
            var initObject = json["result_chat_scene_init"];
            //プレイヤーチャットの初期化が必要な場合
            if(isset(initObject['set_init_chat_target_player']) && isset(initObject['set_init_chat_target_player_name'])){
              CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID = initObject['set_init_chat_target_player'];
              CHAT_WINDOW_CHAT_SEND_PLAYER_NAME = initObject['set_init_chat_target_player_name'];
            }
          }
          //チャットレスポンス処理
          switch (resultChatType) {
            case 1: //エリアチャット
            {
              if(isset(json["player_area_instance"])){ //エリアチャットの更新が行われた
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "エリア";
                CHAT_WINDOW_PLAYER_AREA_INSTANCE = json["player_area_instance"];
                if(isset(CHAT_WINDOW_PLAYER_AREA_INSTANCE['area_id'])){ //エリアマスターデータを取得
                  if(MASTER_DATA_AREA_MASTER != null){
                    for (var i = 0; i < MASTER_DATA_AREA_MASTER.length; i++) {
                      if(MASTER_DATA_AREA_MASTER[i]['area_id'] == CHAT_WINDOW_PLAYER_AREA_INSTANCE['area_id']){
                        CHAT_WINDOW_PLAYER_AREA_MASTER_DATA = MASTER_DATA_AREA_MASTER[i]; //ワールドエリアマスターデータを設定
                        CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_AREA_MASTER_DATA['area_name'];
                        break;
                      }
                    }
                  }
                }
              }
              if(isset(json["area_chat_logs"])){ //ワールドエリアのチャットログ
                CHAT_WINDOW_AREA_CHAT_LOGS = json["area_chat_logs"];
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_AREA_CHAT_LOGS);
              }
            }
            break;
            case 2: //ワールドチャット
            {
              if(isset(json["player_world_instance"])){ //エリアチャットの更新が行われた
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ワールド";
                CHAT_WINDOW_PLAYER_WORLD_INSTANCE = json["player_world_instance"];
                if(isset(CHAT_WINDOW_PLAYER_WORLD_INSTANCE['world_id'])){ //エリアマスターデータを取得
                  if(MASTER_DATA_WORLD_MASTER != null){
                    for (var i = 0; i < MASTER_DATA_WORLD_MASTER.length; i++) {
                      if(MASTER_DATA_WORLD_MASTER[i]['world_id'] == CHAT_WINDOW_PLAYER_WORLD_INSTANCE['world_id']){
                        CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA = MASTER_DATA_WORLD_MASTER[i]; //ワールドマスターデータを設定
                        CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA['world_name'];
                        break;
                      }
                    }
                  }
                }
              }
              if(isset(json["world_chat_logs"])){ //ワールドのチャットログ
                CHAT_WINDOW_WORLD_CHAT_LOGS = json["world_chat_logs"];
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_WORLD_CHAT_LOGS);
              }
            }
            break;
            case 3: //パーティチャット
            {
              if(isset(json["result_player_party"]) && isset(json["result_player_party"]['party_name'])){ //所属しているパーティ情報
                CHAT_WINDOW_PLAYER_PARTY_DATA = json["result_player_party"];
                CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].fontSize = 20; //フォントサイズ初期化
                var dispText = CHAT_WINDOW_PLAYER_PARTY_DATA['party_name'];
                if(8 < String(dispText).length){
                  dispText = dispText.slice(0,7);
                  dispText = dispText + "...";
                }
                CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = dispText;
              }
              CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "パーティ";
              if(isset(json["party_chat_logs"])){ //パーティのチャットログ
                CHAT_WINDOW_PARTY_CHAT_LOGS = json["party_chat_logs"];
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PARTY_CHAT_LOGS);
              }
            }
            break;
            case 4: //プレイヤーチャット
            {
              if(isset(json["result_chat_player_name"]) && json["result_chat_player_name"] != "" && isset(json["result_chat_player_index_id"])){
                CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID = json["result_chat_player_index_id"];
                CHAT_WINDOW_CHAT_SEND_PLAYER_NAME = json["result_chat_player_name"];
                var dispText = CHAT_WINDOW_CHAT_SEND_PLAYER_NAME;
                if(8 < String(dispText).length){
                  dispText = dispText.slice(0,7);
                  dispText = dispText + "...";
                }
                CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = dispText;
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].fontSize = 36;
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "プレイヤー";
                if(isset(json["player_chat_logs"])){ //パーティのチャットログ
                  CHAT_WINDOW_PLAYER_CHAT_LOGS = json["player_chat_logs"];
                  G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_CHAT_LOGS);
                }
              }
              //フレンドリストの取得が行われた
              if(isset(json['result_player_friend_list'])){
                CHAT_WINDOW_PLAYER_FRIEND_LIST = json['result_player_friend_list'];
                G_CHAT_WINDOW_CREATE_SELECT_FRIEND_LIST(parentBase,CHAT_WINDOW_PLAYER_FRIEND_LIST); //フレンドリストを生成
              }
            }
            break;
            case 5: //ルームチャット
            {
              if(isset(json["player_room_data"])){ //ルームチャットの更新が行われた
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ルーム";
                CHAT_WINDOW_PLAYER_ROOM_DATA = json["player_room_data"];
                CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = "ルーム";
              }
              //送信されたチャットメッセージが存在した。(クライアント確認用)
              if(isset(json["result_send_chat_player_room"])){
                LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'] = json["result_send_chat_player_room"]['chat_text'];
                LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id'] = json["result_send_chat_player_room"]['stamp_id'];
              }
              if(isset(json["player_room_chat_logs"])){ //ワールドエリアのチャットログ
                CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS = json["player_room_chat_logs"];
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS);
              }
            }
            break;
            case 6: //ギルドチャット
            {
              console.log("ギルドチャットレスポンス");
              if(isset(json["result_player_guild"])){ //所属しているギルド情報
                CHAT_WINDOW_BUTTON_LAYER['chat_type_label'].text = "ギルド";
                CHAT_WINDOW_PLAYER_GUILD_DATA = json["result_player_guild"];
                CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = "ギルド";
              }
              //送信されたチャットメッセージが存在した。(クライアント確認用)
              if(isset(json["result_send_chat_guild_room"])){
                LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'] = json["result_send_chat_guild_room"]['chat_text'];
                LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id'] = json["result_send_chat_guild_room"]['stamp_id'];
              }
              if(isset(json["guild_chat_logs"])){ //ギルドのチャットログ
                CHAT_WINDOW_GUILD_CHAT_LOGS = json["guild_chat_logs"];
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_GUILD_CHAT_LOGS);
              }
            }
            break;
            default:
            break;
          }
          //スタンプリストの取得が行われた
          if(isset(json['result_player_stamp_list'])){
            CHAT_WINDOW_PLAYER_STAMP_DATAS = json['result_player_stamp_list']; //スタンプデータを設定
            G_CHAT_WINDOW_CREATE_STAMP_LIST(parentBase,CHAT_WINDOW_PLAYER_STAMP_DATAS);
          }
          //チャット自動更新が行われた
          if(isset(json['result_update_chat_logs'])){
            var resultUpdateChatLogs = json['result_update_chat_logs'];
            if(isset(resultUpdateChatLogs['update_area_chat'])){ //エリアチャット
              CHAT_WINDOW_AREA_CHAT_LOGS = resultUpdateChatLogs['update_area_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 1){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_AREA_CHAT_LOGS,true);
              }
            }
            if(isset(resultUpdateChatLogs['update_world_chat'])){ //ワールドチャット
              CHAT_WINDOW_WORLD_CHAT_LOGS = resultUpdateChatLogs['update_world_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 2){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_WORLD_CHAT_LOGS,true);
              }
            }
            if(isset(resultUpdateChatLogs['update_party_chat'])){ //パーティチャット
              CHAT_WINDOW_PARTY_CHAT_LOGS = resultUpdateChatLogs['update_party_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 3){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PARTY_CHAT_LOGS,true);
              }
            }
            if(isset(resultUpdateChatLogs['update_player_chat'])){ //プレイヤーチャット
              CHAT_WINDOW_PLAYER_CHAT_LOGS = resultUpdateChatLogs['update_player_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 4){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_CHAT_LOGS,true);
              }
            }
            if(isset(resultUpdateChatLogs['update_player_room_chat'])){ //プレイヤールームチャット
              CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS = resultUpdateChatLogs['update_player_room_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 5){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS,true);
              }
            }
            if(isset(resultUpdateChatLogs['update_guild_chat'])){ //ギルドチャット
              console.log("ギルドチャット更新");
              CHAT_WINDOW_GUILD_CHAT_LOGS = resultUpdateChatLogs['update_guild_chat'];
              if(CHAT_WINDOW_CHAT_TYPE == 6){
                G_CHAT_WINDOW_LIST_CREATE(CHAT_WINDOW_GUILD_CHAT_LOGS,true);
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
      CHAT_WINDOW_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    //チャットのテキストが入力された
    if(CHAT_WINDOW_INPUT_TEXT != "" && CHAT_WINDOW_INPUT_TEXT != null){
      if(String(CHAT_WINDOW_INPUT_TEXT).length < 31){
        CHAT_WINDOW_SEND_TEXT = CHAT_WINDOW_INPUT_TEXT;
        CHAT_WINDOW_SELECT_STAMP_ID = -1;
        var dispText = CHAT_WINDOW_SEND_TEXT;
        if(8 < String(dispText).length){
          dispText = dispText.slice(0,7);
          dispText = dispText + "...";
        }
        CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].text = dispText;
        CHAT_WINDOW_INPUT_TEXT = "";
        CHAT_WINDOW_INPUT_TMP_TEXT = "";
      }
      else{ //文字数オーバー
        G_NORMAL_WINDOW_CREATE(parentBase,"テキスト入力エラー","文字数制限を超えました",0,"inputMessageErrorWIndow");
        CHAT_WINDOW_INPUT_TMP_TEXT = CHAT_WINDOW_INPUT_TEXT;
        CHAT_WINDOW_INPUT_TEXT = "";
      }
    }
    //チャット自動更新処理
    if(CHAT_WINDOW_CHAT_SCENE_INIT == true){ //初期化完了後か
      if(NETWORK_IS_CONNECTING != false) return; //通信中ではない
      CHAT_WINDOW_AUTO_CHAT_UPDATE_DELTA += PHINA_APP.deltaTime;
      if(5000 < CHAT_WINDOW_AUTO_CHAT_UPDATE_DELTA){
        CHAT_WINDOW_AUTO_CHAT_UPDATE_DELTA = 0;
        //チャットログ自動更新
        CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
        var postParam = new Object();
        postParam['set_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
        if(roomId != -1) postParam['map_event_trigger_id'] = roomId;
        postParam['chat_log_update'] = 1;
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
      }
    }
  }
}

function G_CHAT_WINDOW_LIST_CREATE(chatLogDatas,autoUpdate = false){ //チャットウィンドウのリストを生成する。
  //リストセルの生成
  var listPosY = 0;
  //リスト初期化
  for (var i = 0; i < CHAT_WINDOW_LIST_CELLS.length; i++) {
    if(CHAT_WINDOW_LIST_CELLS[i] != null) CHAT_WINDOW_LIST_CELLS[i].remove();
  }
  CHAT_WINDOW_LIST_CELLS = new Array();
  if(autoUpdate == false) CHAT_WINDOW_LIST_OBJ.y = 0; //リスト位置を初期化
  for (var i = 0; i < chatLogDatas.length; i++) {
    //セル画像を表示
    var stampId = chatLogDatas[i]['stamp_id'];
    var assetName = "ASSET_171";
    if(CHAT_WINDOW_TYPE == 1) assetName = "ASSET_176"; //透明のセル
    if(stampId != 0){
      for (var j = 0; j < MASTER_DATA_CHAT_STAMP_MASTER.length; j++) {
        if(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_id'] == stampId){
          assetName = "ASSET_" + String(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_asset_id']);
          break;
        }
      }
    }
    CHAT_WINDOW_LIST_CELLS[i] = Sprite(assetName).addChildTo(CHAT_WINDOW_LIST_OBJ);//セル背景
    if(stampId != 0 && assetName != "ASSET_171" && assetName != "ASSET_176") CHAT_WINDOW_LIST_CELLS[i].x = CHAT_WINDOW_LIST_CELLS[i].x + (CHAT_WINDOW_LIST_CELLS[i].width / 2);
    if(i == 0) listPosY = CHAT_WINDOW_LIST_CELLS[i].y + ((SCREEN_HEIGHT / 2) - (CHAT_WINDOW_BUTTON_LAYER['chat_type_btn'].height + (CHAT_WINDOW_LIST_CELLS[i].height / 2)));
    else {
      listPosY = listPosY - ((CHAT_WINDOW_LIST_CELLS[i - 1].height / 2) + (CHAT_WINDOW_LIST_CELLS[i].height / 2));
    }
    CHAT_WINDOW_LIST_CELLS[i].y = listPosY;
    //セルボタン
    CHAT_WINDOW_LIST_CELLS[i]['button'] = Button({
      width: CHAT_WINDOW_LIST_CELLS[i].width,         // 横サイズ
      height: CHAT_WINDOW_LIST_CELLS[i].height,        // 縦サイズ
    }).addChildTo(CHAT_WINDOW_LIST_CELLS[i]);
    CHAT_WINDOW_LIST_CELLS[i]['button']['player_index_id'] = chatLogDatas[i]['player_index_id'];
    CHAT_WINDOW_LIST_CELLS[i]['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
      if(CHAT_WINDOW_LIST_TAP_END_POS != CHAT_WINDOW_LIST_TAP_START_POS) return;
    };
    CHAT_WINDOW_LIST_CELLS[i]['button'].visible = false;
    //セルテキストを表示
    var textColor = 'white';
    if(CHAT_WINDOW_TYPE == 1) textColor = 'black';
    if(stampId != 0 && assetName != "ASSET_171" && assetName != "ASSET_176"){ //スタンプの場合、テキスト情報を変更する
      CHAT_WINDOW_LIST_CELLS[i]['label'] = Label({
        text: chatLogDatas[i]['player_name'] + ":",
        fontSize: 26,
        fill: textColor,
        align: 'left',
      }).addChildTo(CHAT_WINDOW_LIST_CELLS[i]);
      CHAT_WINDOW_LIST_CELLS[i]['label'].x = CHAT_WINDOW_LIST_CELLS[i]['label'].x - (CHAT_WINDOW_LIST_CELLS[i].width * 1.5)
    }
    else{
      CHAT_WINDOW_LIST_CELLS[i]['label'] = LabelArea({
        text: chatLogDatas[i]['player_name'] + " :\n" + chatLogDatas[i]['chat_text'],
        height: 86,
        width: 420,
        fontSize: 26,
        fill: textColor,
        align: 'left',
        baseline: 'top',
      }).addChildTo(CHAT_WINDOW_LIST_CELLS[i]);
    }
  }
  CHAT_WINDOW_CHAT_SCENE_INIT = true; //初期化完了
}

function G_CHAT_WINDOW_CREATE_SELECT_FRIEND_LIST(parentBase,friendDatas){ //チャット送信先を指定するフレンド一覧を取得
  for (var i = 0; i < CHAT_WINDOW_FRIEND_LIST_CELL.length; i++) {
    CHAT_WINDOW_FRIEND_LIST_CELL[i].remove();
  }
  CHAT_WINDOW_FRIEND_LIST_CELL = new Array(); //セル情報をを初期化
  var listObj = PlainElement({});
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  for (var i = 0; i < friendDatas.length; i++) {
    CHAT_WINDOW_FRIEND_LIST_CELL[i] = Sprite('ASSET_174').addChildTo(listObj);//セル画像
    CHAT_WINDOW_FRIEND_LIST_CELL[i].y = CHAT_WINDOW_FRIEND_LIST_CELL[i].y - listObjHeightSize;
    listObjHeightSize += CHAT_WINDOW_FRIEND_LIST_CELL[i].height;
    cellSizeHeight = CHAT_WINDOW_FRIEND_LIST_CELL[i].height;
    //フレンド名表示
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_name_label'] = Label({
      text: friendDatas[i]['player_name'],
      fontSize: 32,
      fill: 'black',
      align: 'left',
    }).addChildTo(CHAT_WINDOW_FRIEND_LIST_CELL[i]);
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_name_label'].x = CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_name_label'].x - (CHAT_WINDOW_FRIEND_LIST_CELL[i].width / 2.25);
    //選択ボタンを表示
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'] = Sprite('ASSET_79').addChildTo(CHAT_WINDOW_FRIEND_LIST_CELL[i]);
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'].x = CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'].x + ((CHAT_WINDOW_FRIEND_LIST_CELL[i].width / 2) - (CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'].width / 2));
    //選択ボタンラベル
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn_label'] = Label({
      text: "選択",
      fontSize: 32,
      fill: 'white',
      align: 'center',
    }).addChildTo(CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']);
    //選択ボタン本体
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn'] = Button({
      width: CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'].width,   // 横サイズ
      height: CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn'].height, // 縦サイズ
    }).addChildTo(CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']);
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn']['player_index_id'] = friendDatas[i]['player_index_id']; //ボタンのプレイヤーIDを指定
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn']['player_name'] = friendDatas[i]['player_name'];
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn'].onpointstart = function(e){
      CHAT_WINDOW_FRIEND_LIST_TAP_POS_X = e.pointer.x;
      CHAT_WINDOW_FRIEND_LIST_TAP_POS_Y = e.pointer.y;
    };
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
      if(CHAT_WINDOW_FRIEND_LIST_TAP_POS_X != e.pointer.x || CHAT_WINDOW_FRIEND_LIST_TAP_POS_Y != e.pointer.y) return;
      //送信先のプレイヤー名を更新
      CHAT_WINDOW_CHAT_SEND_PLAYER_NAME = this['player_name'];
      var dispText = CHAT_WINDOW_CHAT_SEND_PLAYER_NAME;
      if(8 < String(dispText).length){
        dispText = dispText.slice(0,7);
        dispText = dispText + "...";
      }
      CHAT_WINDOW_BUTTON_LAYER['chat_send_name_label'].text = dispText;
      //送信先のプレイヤーIDを更新
      CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID = this['player_index_id'];
      //フレンドリストを閉じる
      for (var i = 0; i < CHAT_WINDOW_FRIEND_LIST_CELL.length; i++) {
        CHAT_WINDOW_FRIEND_LIST_CELL[i].remove();
      }
      CHAT_WINDOW_FRIEND_LIST_CELL = new Array(); //セル情報をを初期化
      G_UI_WINDOW_LIST_DELETE();
      //ログを更新
      CHAT_WINDOW_RESULT_DATA = -1; //通信待機中にする。
      var postParam = new Object();
      postParam['chat_type'] = CHAT_WINDOW_CHAT_TYPE;
      postParam['set_chat_target_player'] = CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID;
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/chat/chat.php",postParam); //非同期通信開始
    };
    CHAT_WINDOW_FRIEND_LIST_CELL[i]['friend_select_btn']['btn'].visible = false;
  }
  listObj.y = listObj.y + ((listObjHeightSize / 2) - (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,listObj,listObjHeightSize,"チャットするフレンドを選択","閉じる"); //リストを表示
}

function G_CHAT_WINDOW_CREATE_STAMP_LIST(parentBase,playerStampDatas){ //スタンプリストを表示
  for (var i = 0; i < CHAT_WINDOW_STAMP_LIST_CELL.length; i++) {
    CHAT_WINDOW_STAMP_LIST_CELL[i].remove();
  }
  CHAT_WINDOW_STAMP_LIST_CELL = new Array(); //セル情報をを初期化
  var listObj = PlainElement({});
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  var countColumn = 0;
  var nowPosY = 0;
  for (var i = 0; i < playerStampDatas.length; i++) {
    CHAT_WINDOW_STAMP_LIST_CELL[i] = PlainElement({
      height: 146,
      width: 440,
    }).addChildTo(listObj);//セル画像
    var updateYFlag = false;
    if(i % 3 == 0) updateYFlag = true;
    if(updateYFlag == true){
      listObjHeightSize += CHAT_WINDOW_STAMP_LIST_CELL[i].height;
      nowPosY = CHAT_WINDOW_STAMP_LIST_CELL[i].y - listObjHeightSize;
    }
    CHAT_WINDOW_STAMP_LIST_CELL[i].y = nowPosY;
    cellSizeHeight = CHAT_WINDOW_STAMP_LIST_CELL[i].height;
    //スタンプ画像表示
    CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'] = Sprite('ASSET_' + playerStampDatas[i]['stamp_asset_id']).addChildTo(CHAT_WINDOW_STAMP_LIST_CELL[i]);//セル画像
    CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].width = CHAT_WINDOW_STAMP_LIST_CELL[i].height;
    CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].height = CHAT_WINDOW_STAMP_LIST_CELL[i].height;
    //スタンプボタンをを生成
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button'] = Button({
      width: CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].width,   // 横サイズ
      height: CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].height, // 縦サイズ
    }).addChildTo(CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp']);
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button']['stamp_id'] = playerStampDatas[i]['stamp_id'];
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button']['stamp_name'] = playerStampDatas[i]['stamp_name'];
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button'].onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
      CHAT_WINDOW_STAMP_LIST_TAP_POS_Y = e.pointer.y;
    };
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return; //閉じるボタンと重なって居た場合反応させない
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
      if(CHAT_WINDOW_STAMP_LIST_TAP_POS_Y != e.pointer.y) return;
      CHAT_WINDOW_SELECT_STAMP_ID = this['stamp_id'];
      CHAT_WINDOW_SEND_TEXT = this['stamp_name'];
      var dispText = CHAT_WINDOW_SEND_TEXT;
      if(8 < String(dispText).length){
        dispText = dispText.slice(0,7);
        dispText = dispText + "...";
      }
      CHAT_WINDOW_BUTTON_LAYER['chat_message_label'].text = dispText;
      for (var i = 0; i < CHAT_WINDOW_STAMP_LIST_CELL.length; i++) {
        CHAT_WINDOW_STAMP_LIST_CELL[i].remove();
      }
      CHAT_WINDOW_STAMP_LIST_CELL = new Array(); //セル情報をを初期化
      G_UI_WINDOW_LIST_DELETE();
    };
    CHAT_WINDOW_STAMP_LIST_CELL[i]['button'].visible = false;
    switch (countColumn) {
      case 0:
      CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].x = CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].x - CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].width;
      break;
      case 1:
      break;
      case 2:
      CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].x = CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].x + CHAT_WINDOW_STAMP_LIST_CELL[i]['stamp'].width;
      break;
      default:
      break;
    }
    countColumn = countColumn + 1;
    if(2 < countColumn){
      countColumn = 0;
    }
  }
  listObj.y = listObj.y + ((listObjHeightSize / 2) + (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,listObj,listObjHeightSize,"スタンプを選択","閉じる"); //リストを表示
}

function G_CHAT_WINDOW_DELETE(){ //チャットウィンドウを閉じる
  CHAT_WINDOW_TYPE = -1;
  CHAT_WINDOW_CHAT_SCENE_INIT = false;
  CHAT_WINDOW_AUTO_CHAT_UPDATE_DELTA = 0;
  CHAT_WINDOW_SELECT_STAMP_ID = -1;
  CHAT_WINDOW_STAMP_LIST_TAP_POS_Y = 0;
  for (var i = 0; i < CHAT_WINDOW_STAMP_LIST_CELL.length; i++) {
    if(CHAT_WINDOW_STAMP_LIST_CELL[i] != null) CHAT_WINDOW_STAMP_LIST_CELL[i].remove();
  }
  CHAT_WINDOW_STAMP_LIST_CELL = new Array();
  CHAT_WINDOW_PLAYER_STAMP_DATAS = null;
  CHAT_WINDOW_FRIEND_LIST_TAP_POS_Y = 0;
  CHAT_WINDOW_FRIEND_LIST_TAP_POS_X = 0;
  for (var i = 0; i < CHAT_WINDOW_FRIEND_LIST_CELL.length; i++) {
    if(CHAT_WINDOW_FRIEND_LIST_CELL[i] != null) CHAT_WINDOW_FRIEND_LIST_CELL[i].remove();
  }
  CHAT_WINDOW_FRIEND_LIST_CELL = new Array();
  CHAT_WINDOW_PLAYER_FRIEND_LIST = null;
  CHAT_WINDOW_CHAT_SEND_PLAYER_INDEX_ID = -1;
  CHAT_WINDOW_CHAT_SEND_PLAYER_NAME = "";
  CHAT_WINDOW_PLAYER_PARTY_DATA = null;
  CHAT_WINDOW_PLAYER_GUILD_DATA = null;
  CHAT_WINDOW_INPUT_TMP_TEXT = "";
  CHAT_WINDOW_SEND_TEXT = "";
  CHAT_WINDOW_INPUT_TEXT = "";
  CHAT_WINDOW_LIST_TAP_END_POS = 0;
  CHAT_WINDOW_LIST_TAP_START_POS = 0;
  CHAT_WINDOW_PLAYER_CHAT_LOGS = null;
  CHAT_WINDOW_AREA_CHAT_LOGS = null;
  CHAT_WINDOW_WORLD_CHAT_LOGS = null;
  CHAT_WINDOW_PARTY_CHAT_LOGS = null;
  CHAT_WINDOW_GUILD_CHAT_LOGS = null;
  CHAT_WINDOW_PLAYER_AREA_INSTANCE = null;
  CHAT_WINDOW_PLAYER_AREA_MASTER_DATA = null;
  CHAT_WINDOW_PLAYER_WORLD_INSTANCE = null;
  CHAT_WINDOW_PLAYER_WORLD_MASTER_DATA = null;
  CHAT_WINDOW_LIST_SCROLLE_START = 0;
  CHAT_WINDOW_LIST_SCROLLE_MOVE = 0;
  CHAT_WINDOW_LIST_SCROLLE_MAX_BOTTOM = 0;
  CHAT_WINDOW_PLAYER_ROOM_ID = -1;
  CHAT_WINDOW_PLAYER_ROOM_DATA = null;
  CHAT_WINDOW_PLAYER_ROOM_CHAT_LOGS = null;
  for (var i = 0; i < CHAT_WINDOW_LIST_CELLS.length; i++) {
    if(CHAT_WINDOW_LIST_CELLS[i] != null) CHAT_WINDOW_LIST_CELLS[i].remove();
  }
  CHAT_WINDOW_LIST_CELLS = new Array();
  if(CHAT_WINDOW_LIST_OBJ != null){
    CHAT_WINDOW_LIST_OBJ.remove();
    CHAT_WINDOW_LIST_OBJ = null;
  }
  if(CHAT_WINDOW_LIST_TOUCH_AREA != null){
    CHAT_WINDOW_LIST_TOUCH_AREA.remove();
    CHAT_WINDOW_LIST_TOUCH_AREA = null;
  }
  if(CHAT_WINDOW_BUTTON_LAYER != null){
    CHAT_WINDOW_BUTTON_LAYER.remove();
    CHAT_WINDOW_BUTTON_LAYER = null;
  }
  if(CHAT_WINDOW != null){
    CHAT_WINDOW.remove();
    CHAT_WINDOW = null;
  }
  if(CHAT_WINDOW_MASK != null){
    CHAT_WINDOW_MASK.remove();
    CHAT_WINDOW_MASK = null;
  }
}
