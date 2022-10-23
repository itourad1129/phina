//ショートメニューウィンドウ

var SHORT_MENU_WINDOW = null; //ショートメニューウィンドウ本体
var SHORT_MENU_WINDOW_MASK = null; //ショートメニューウィンドウマスク
var SHORT_MENU_TITLE_TEXT_LABEL = null; //ウィンドウタイトルのラベル
var SHORT_MENU_BUTTONS = new Array(); //ショートメニューに表示するボタンの配列
var SHORT_MENU_BUTTON_MAX_COUNT = 18; //ボタンの最大個数
var SHORT_MENU_CLOSE_BUTTON = null; //ショートメニューの閉じるボタン
var SHOT_MENU_SELECT_BTN_INDEX = -1; //選択したボタンインデックス

function G_CREATE_SHORT_MENU_WINDOW(sceneObj,parentBase){ //ショートメニューウィンドウを生成
  SHORT_MENU_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase);//マスクを表示
  SHORT_MENU_WINDOW = Sprite('ASSET_160').addChildTo(SHORT_MENU_WINDOW_MASK);//ウィンドウ本体を表示
  //タイトルラベルを表示
  SHORT_MENU_TITLE_TEXT_LABEL = Label({
    text: "ショートメニュー",
    fontSize: 42,
    fill: 'white',
  }).addChildTo(SHORT_MENU_WINDOW);
  SHORT_MENU_TITLE_TEXT_LABEL.y = SHORT_MENU_TITLE_TEXT_LABEL.y - (SCREEN_HEIGHT / 2.75);
  var btnPosY = 0; //ボタンY座標
  var btnPosX = 0; //ボタンX座標
  //ボタンを生成
  for (var i = 0; i < SHORT_MENU_BUTTON_MAX_COUNT; i++) {
    SHORT_MENU_BUTTONS[i] = Sprite('ASSET_173').addChildTo(SHORT_MENU_WINDOW);//ボタン画像を表示
    if(i % 6 == 0) btnPosY = SHORT_MENU_TITLE_TEXT_LABEL.y + (SHORT_MENU_BUTTONS[i].height * 1.25);
    else btnPosY = btnPosY + (SHORT_MENU_BUTTONS[i].height * 1.25);
    if(i == 0) btnPosX = SHORT_MENU_BUTTONS[i].x = (SHORT_MENU_BUTTONS[i].x - (SHORT_MENU_BUTTONS[i].width * 1.1));
    if(i == 6) btnPosX = 0;
    if(i == 12) btnPosX = SHORT_MENU_BUTTONS[i].x = (SHORT_MENU_BUTTONS[i].x + (SHORT_MENU_BUTTONS[i].width * 1.1));
    SHORT_MENU_BUTTONS[i].x = btnPosX;
    SHORT_MENU_BUTTONS[i].y = btnPosY;
    //ボタンラベルを生成
    SHORT_MENU_BUTTONS[i]['btn_label'] = Label({
      text: "",
      fontSize: 32,
      fill: 'white',
    }).addChildTo(SHORT_MENU_BUTTONS[i]);
    //ボタン本体を生成
    SHORT_MENU_BUTTONS[i]['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(SHORT_MENU_BUTTONS[i]);
    SHORT_MENU_BUTTONS[i]['btn']['btn_index'] = i;
    SHORT_MENU_BUTTONS[i]['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null){
        if(SHOT_MENU_SELECT_BTN_INDEX == -1){
          SHOT_MENU_SELECT_BTN_INDEX = this['btn_index'];
        }
      }
    };
    SHORT_MENU_BUTTONS[i]['btn'].visible = false;
    //ボタンのラベルを更新
    G_UPDATE_SHORT_MENU_WINDOW_BTN_LABEL(SHORT_MENU_BUTTONS[i]['btn'],SHORT_MENU_BUTTONS[i]['btn_label']);
  }
  //ショートメニュー閉じるボタンを表示
  SHORT_MENU_CLOSE_BUTTON = Sprite('ASSET_120').addChildTo(SHORT_MENU_WINDOW);//ボタン画像を表示
  SHORT_MENU_CLOSE_BUTTON.y = SHORT_MENU_CLOSE_BUTTON.y + (SCREEN_HEIGHT / 2.75);
  //閉じるボタンラベル
  SHORT_MENU_CLOSE_BUTTON['btn_label'] = Label({
    text: "閉じる",
    fontSize: 32,
    fill: 'black',
  }).addChildTo(SHORT_MENU_CLOSE_BUTTON);
  //閉じるボタン本体
  SHORT_MENU_CLOSE_BUTTON['btn'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(SHORT_MENU_CLOSE_BUTTON);
  SHORT_MENU_CLOSE_BUTTON['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null){
      G_CLOSE_SHORT_MENU_WINDOW(); //ショートメニューウィンドウを閉じる
    }
  };
  SHORT_MENU_CLOSE_BUTTON['btn'].visible = false;
  //アップデート関数
  SHORT_MENU_WINDOW.update = function(){
    if(SHOT_MENU_SELECT_BTN_INDEX != -1){
      if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
      switch (parseInt(SHOT_MENU_SELECT_BTN_INDEX)) {
        case 0: //マイページ
        {
          G_CLOSE_SHORT_MENU_WINDOW(); //ショートメニューウィンドウを閉じる
          SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
          sceneObj.exit("myPage");
        }
        break;
        case 1: //チャット
        {
            G_CLOSE_SHORT_MENU_WINDOW(); //ショートメニューウィンドウを閉じる
            var chatWindowType = 0;
            var chatNode = parentBase;
            if(SCENE_MANAGER['now_scene'] == "map"){
              chatWindowType = 1; //マップの場合は半透明のチャットウィンドウを表示
              chatNode = MAP_CHAT_WINDOW_NODE; //表示ノードを変更
            }
            G_CHAT_CREATE_CHAT_WINDOW(parentBase,chatNode,chatWindowType,ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID,ACTIVE_GUILD_ROOM_GUILD_ID); //チャットウィンドウを生成
        }
        break;
        case 2: //カードデッキ編成
        {
          G_CLOSE_SHORT_MENU_WINDOW(); //ショートメニューウィンドウを閉じる
          SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
          sceneObj.exit("deckEdit");
        }
        break;
        case 3: //カルマメニュー
        {
          G_CLOSE_SHORT_MENU_WINDOW(); //ショートメニューウィンドウを閉じる
          G_KARMA_MENU_CREATE(parentBase,sceneObj);
        }
        break;
        default:
        break;
      }
      SHOT_MENU_SELECT_BTN_INDEX = -1;
    }
  }
}

function G_UPDATE_SHORT_MENU_WINDOW_BTN_LABEL(button,buttonLabel){ //ボタンに表示させるラベルを更新
  if(button != null && isset(button['btn_index']) && buttonLabel != null){
    switch (parseInt(button['btn_index'])) {
      case 0: //チャットボタン
      {
        buttonLabel.fontSize = 28;
        buttonLabel.text = "マイページ";
      }
      break;
      case 1:
      {
        buttonLabel.text = "チャット";
      }
      break;
      case 2:
      {
        buttonLabel.fontSize = 20;
        buttonLabel.text = "カードデッキ編成";
      }
      break;
      case 3:
      {
        buttonLabel.fontSize = 28;
        buttonLabel.text = "カルマ";
      }
      break;
      default:
      break;
    }
  }
}

function G_CLOSE_SHORT_MENU_WINDOW(){ //チャットウィンドウを閉じる
  if(SHORT_MENU_BUTTONS != null && Array.isArray(SHORT_MENU_BUTTONS)){
    for (var i = 0; i < SHORT_MENU_BUTTONS.length; i++) {
      if(SHORT_MENU_BUTTONS[i] != null){
        SHORT_MENU_BUTTONS[i].remove();
        SHORT_MENU_BUTTONS[i] = null;
      }
    }
    SHORT_MENU_BUTTONS = new Array();
  }
  if(SHORT_MENU_TITLE_TEXT_LABEL != null){
    SHORT_MENU_TITLE_TEXT_LABEL.remove();
    SHORT_MENU_TITLE_TEXT_LABEL = null;
  }
  if(SHORT_MENU_CLOSE_BUTTON != null){
    SHORT_MENU_CLOSE_BUTTON.remove();
    SHORT_MENU_CLOSE_BUTTON = null;
  }
  if(SHORT_MENU_WINDOW != null){
    SHORT_MENU_WINDOW.remove();
    SHORT_MENU_WINDOW = null;
  }
  if(SHORT_MENU_WINDOW_MASK != null){
    SHORT_MENU_WINDOW_MASK.remove();
    SHORT_MENU_WINDOW_MASK = null;
  }
  SHOT_MENU_SELECT_BTN_INDEX = -1;
}
