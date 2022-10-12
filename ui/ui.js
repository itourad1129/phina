//UI制御
var WINDOW_MASK_SPRITE = null; //ウィンドウに表示するマスク用画像
var WINDOW_LIST_MASK_SPRITE = null; //ウィンドウリストに表示するマスク用画像
var WINDOW_NORMAL = null; //ウィンドウの実体
var WINDOW_TITLE = null; //ウィンドウに表示するタイトル
var WINDOW_MAIN_TEXT = null; //ウィンドウに表示するメインテキスト
var WINDOW_NORMAL_CONTENTS = null; //ウィンドウに表示するコンテンツ
var WINDOW_YES_BUTTON = null; //ウィンドウに表示する「はい」ボタン
var WINDOW_NO_BUTTON = null; //ウィンドウに表示する「いいえ」ボタン
var WINDOW_YES_BUTTON_SPRITE = null; //ウィンドウに表示する「はい」ボタンの画像
var WINDOW_YES_BUTTON_TEXT = null; //ウィンドウに表示する「はい」ボタンの文字
var WINDOW_NO_BUTTON_SPRITE = null; //ウィンドウに表示する「いいえ」ボタンの画像
var WINDOW_NO_BUTTON_TEXT = null; //ウィンドウに表示する「いいえ」ボタンの文字
var WINDOW_OK_BUTTON = null; //ウィンドウに表示する「OK」ボタン
var WINDOW_OK_BUTTON_SPRITE = null; //ウィンドウに表示する「OK」ボタンの画像
var WINDOW_OK_BUTTON_TEXT = null; //ウィンドウに表示する「OK」ボタンの文字
var WINDOW_RETURN_VAL = null; //ウィンドウを閉じた時に更新されるオブジェクト
var LOADING_MASK = null; //読み込み中のマスク
var TRANS_SCREEN_ANIM = null; //画面切り替え用のアニメーション
var TRANS_SCREEN_ANIM_PARTS = null; //画面切り替え用のアニメーションのパーツ
var WINDOW_LIST = null; //リスト用ウィンドウ
var WINDOW_LIST_TITLE = null; //リストのタイトル
var WINDOW_LIST_CLOSE_BUTTON_TEXT = null; //リスト閉じるボタンテキスト
var WINDOW_LIST_CLOSE_BUTTON = null; //リスト閉じるボタン
var WINDOW_LIST_TITLE_AND_BUTTON = null; //リストに表示するタイトルとボタン
var WINDOW_LIST_FRAME = null; //リスト用フレーム
var WINDOW_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var WINDOW_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var WINDOW_PARTY_INFO_MASK = null; //パーティ情報ウィンドウのマスク
var WINDOW_PARTY_INFO = null; //パーティ情報ウィンドウ
var WINDOW_PARTY_INFO_RESULT_DATA = null; //パーティ情報の通信結果
var WINDOW_PARTY_INFO_PARTY_NAME_LABEL = null; //パーティ名表示用ラベル
var WINDOW_PARTY_INFO_AVATAR_NODE = null; //アバター表示用ノード
var WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL = null; //パーティ人数ラベル
var WINDOW_PARTY_INFO_MEMEBR_BUTTONS = new Array(); //パーティメンバー表示ボタン
var WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN = null; //パーティ申請ボタン
var WINDOW_PARTY_INFO_PARTY_CLOSE_BTN = null; //閉じるボタン
var WINDOW_PARTY_INFO_RETURN_VAL = null; //パーティ情報用のウィンドウ返し値
var WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON = null; //パーティ情報ウィンドウのコメント表示ボタン
var WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK = null; //パーティ情報ウィンドウ、コメントウィンドウのマスク
var WINDOW_PARTY_INFO_COMMENT_WINDOW = null; //パーティ情報ウィンドウ、コメントウィンドウ
var WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL = null; //パーティ情報ウィンドウ、コメントウィンドウタイトルラベル
var WINDOW_PARTY_INFO_COMMENT_WINDOW_LABEL = null; //パーティ情報ウィンドウ、コメントウィンドウラベル
var WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON = null; //パーティ情報ウィンドウ、コメントウィンドウ閉じるボタン
var WINDOW_PLAYER_PROFILE = null; //プレイヤープロフィール本体
var WINDOW_PLAYER_PROFILE_MASK = null; //レイヤープロフィールのマスク
var WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE = null; //プレイヤープロフィール自己紹介テキスト画像
var WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL = null; //プレイヤープロフィール自己紹介テキストラベル
var WINDOW_PLAYER_PROFILE_HEADER = null; //プレイヤープロフィールヘッダー画像
var WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL = null; //プレイヤープロフィールヘッダーテキストラベル
var WINDOW_PLAYER_PROFILE_MENU_BUTTONS = new Array(); //プレイヤープロフィールボタン配列
var WINDOW_PLAYER_PROFILE_CLOSE_BUTTON = null; //レイヤープロフィール閉じるボタン
var WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE = null; //プレイヤープロフィールアバター表示背景
var WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL = null; //プレイヤープロフィール装備品表示ラベル
var WINDOW_PLAYER_PROFILE_RESULT_DATA = null; //プレイヤープロフィールの通信結果
var WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO = null; //自分のプレイヤー情報
var WINDOW_PLAYER_PROFILE_DATA = null; //プレイヤープロフィールの通信結果保存用
var WINDOW_PLAYER_PROFILE_AVATAR = null; //プレイヤープロフィールのアバター
var WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID = -1; //パーティに招待するプレイヤーID
var WINDOW_PLAYER_PROFILE_RETURN_VAL = null; //プレイヤープロフィール用のウィンドウ返し値
var WINDOW_DISP_LAYERS = new Array(); //ウィンドウを表示するレイヤー
var WINDOW_SELECT_RETURN_VAL = null; //選択ウィンドウを閉じた時に更新されるオブジェクト

//ボタンチェック時のNullチェック
Button.prototype.nullCheckList = function(list){
  var result = true;
  for (var i = 0; i < list.length; i++) {
    if(list[i] != "") {
      switch (list[i]) {
        case 'close_item_info_window': //アイテム詳細ウィンドウが閉じられたかチェック
        {
          if(ITEM_CLOSE_ITEM_INFO_WINDOW == true) {result = false;ITEM_CLOSE_ITEM_INFO_WINDOW = false;}
        }
        break;
        default:
        break;
      }
    }
  }
  return result;
}


function G_NORMAL_WINDOW_CREATE(parentNode,windowTitleText,mainText,windowType,windowName,sizeType=0){ //通常ウィンドウを表示
  if(WINDOW_NORMAL == null){
    WINDOW_MASK_SPRITE = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
    var buttonYpos = 0.22;
    var windowAssetId = 62;
    if(sizeType == 1) windowAssetId = 972; //640x640
    WINDOW_NORMAL = Sprite('ASSET_' + windowAssetId).addChildTo(WINDOW_MASK_SPRITE);
    WINDOW_TITLE = Label({
      text: windowTitleText,
      fontSize: 36,
      fill: 'white',
    }).addChildTo(WINDOW_NORMAL);
    //if(sizeType == 0) WINDOW_TITLE.y = parentNode.y * -0.27;
    //else if(sizeType == 1)
    WINDOW_TITLE.y = WINDOW_TITLE.y - ((WINDOW_NORMAL.height / 2) - (WINDOW_TITLE.height * 0.6));

    WINDOW_MAIN_TEXT = Label({
      text: mainText,
      fontSize: 24,
      fill: 'black',
    }).addChildTo(WINDOW_NORMAL);

    if(windowType == 1){ //はい,いいえ ボタン
      WINDOW_YES_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_YES_BUTTON.y = WINDOW_YES_BUTTON.y + ((WINDOW_NORMAL.height / 2) - (WINDOW_YES_BUTTON.height * 0.7));
      WINDOW_YES_BUTTON.x = WINDOW_YES_BUTTON.x - (WINDOW_YES_BUTTON.width * 0.55);
      WINDOW_YES_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_YES_BUTTON);
      WINDOW_YES_BUTTON_TEXT = Label({
        text: "はい",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_YES_BUTTON_SPRITE);
      WINDOW_YES_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(ITEM_INFO_WINDOW != null) return;
        if(WINDOW_PLAYER_PROFILE != null){
          console.log("w1");
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "yes";
        }
        else if(WINDOW_PARTY_INFO != null){
          console.log("w2");
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "yes";
        }
        else if(MESSAGE_WINDOW_OBJ != null){
          console.log("w3");
          MESSAGE_WINDOW_RETURN_VAL = new Object();
          MESSAGE_WINDOW_RETURN_VAL[windowName] = "yes";
        }
        else if(KARMA_MENU_OBJ != null){
          console.log("yesを答えた");
          KARMA_MENU_WINDOW_RETURN_VAL = new Object();
          KARMA_MENU_WINDOW_RETURN_VAL[windowName] = "yes";
        }
        else if(GUILD_SETTING_WINDOW != null){
          console.log("ギルド設定ウィンドウがNULLじゃない");
          GUILD_SETTING_WINDOW_RETURN_VAL = new Object();
          GUILD_SETTING_WINDOW_RETURN_VAL[windowName] = "yes";
        }
        else{
          console.log("w4");
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "yes";
        }
        G_NORMAL_WINDOW_DELETE();
      };

      WINDOW_NO_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_NO_BUTTON.y = WINDOW_YES_BUTTON.y;
      WINDOW_NO_BUTTON.x = WINDOW_NO_BUTTON.x + (WINDOW_NO_BUTTON.width * 0.55);
      WINDOW_NO_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_NO_BUTTON);
      WINDOW_NO_BUTTON_TEXT = Label({
        text: "いいえ",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_NO_BUTTON_SPRITE);
      WINDOW_NO_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(ITEM_INFO_WINDOW != null) return;
        if(WINDOW_PLAYER_PROFILE != null){
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "no";
        }
        else if(WINDOW_PARTY_INFO != null){
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "no";
        }
        else if(MESSAGE_WINDOW_OBJ != null){
          MESSAGE_WINDOW_RETURN_VAL = new Object();
          MESSAGE_WINDOW_RETURN_VAL[windowName] = "no";
        }
        else if(KARMA_MENU_OBJ != null){
          KARMA_MENU_WINDOW_RETURN_VAL = new Object();
          KARMA_MENU_WINDOW_RETURN_VAL[windowName] = "no";
        }
        else if(GUILD_SETTING_WINDOW != null){
          console.log("ギルド設定ウィンドウがNULLじゃない");
          GUILD_SETTING_WINDOW_RETURN_VAL = new Object();
          GUILD_SETTING_WINDOW_RETURN_VAL[windowName] = "no";
        }
        else{
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "no";
        }
        G_NORMAL_WINDOW_DELETE();
      };

    }
    else{ //OKボタン
      WINDOW_OK_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_OK_BUTTON.y = WINDOW_OK_BUTTON.y + ((WINDOW_NORMAL.height / 2) - (WINDOW_OK_BUTTON.height * 0.7));
      WINDOW_OK_BUTTON.x = 0;
      WINDOW_OK_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_OK_BUTTON);
      WINDOW_OK_BUTTON_TEXT = Label({
        text: "OK",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_OK_BUTTON_SPRITE);
      WINDOW_OK_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(ITEM_INFO_WINDOW != null) return;
        if(WINDOW_PLAYER_PROFILE != null){
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "ok";
        }
        else if(WINDOW_PARTY_INFO != null){
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "ok";
        }
        else if(MESSAGE_WINDOW_OBJ != null){
          MESSAGE_WINDOW_RETURN_VAL = new Object();
          MESSAGE_WINDOW_RETURN_VAL[windowName] = "ok";
        }
        else if(KARMA_MENU_OBJ != null){
          KARMA_MENU_WINDOW_RETURN_VAL = new Object();
          KARMA_MENU_WINDOW_RETURN_VAL[windowName] = "ok";
        }
        else if(GUILD_SETTING_WINDOW != null){
          console.log("ギルド設定ウィンドウがNULLじゃない");
          GUILD_SETTING_WINDOW_RETURN_VAL = new Object();
          GUILD_SETTING_WINDOW_RETURN_VAL[windowName] = "ok";
        }
        else{
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "ok";
        }
        G_NORMAL_WINDOW_DELETE();
      };
    }
  }
}

function G_NORMAL_WINDOW_640_640_CREATE(parentNode,windowTitleText,mainText,windowType,windowName,contents = null){ //通常ウィンドウを表示
  if(WINDOW_NORMAL == null){
    WINDOW_MASK_SPRITE = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
    var buttonYpos = 0.22;
    WINDOW_NORMAL = Sprite('ASSET_168').addChildTo(WINDOW_MASK_SPRITE);
    WINDOW_TITLE = Label({
      text: windowTitleText,
      fontSize: 36,
      fill: 'white',
    }).addChildTo(WINDOW_NORMAL);
    WINDOW_TITLE.y = WINDOW_TITLE.y - (WINDOW_NORMAL.height / 2.75);

    WINDOW_MAIN_TEXT = LabelArea({
      height: 384,
      width: 512,
      text: mainText,
      fontSize: 24,
      fill: 'black',
      align: 'left',
      baseline: 'top',
    }).addChildTo(WINDOW_NORMAL);

    //表示コンテンツがあれば、表示を行う
    if(contents != null){
      WINDOW_NORMAL_CONTENTS = contents;
      WINDOW_NORMAL_CONTENTS.addChildTo(WINDOW_NORMAL);
      WINDOW_NORMAL_CONTENTS.y = WINDOW_NORMAL_CONTENTS.y + (WINDOW_NORMAL.height * 0.15);
    }

    if(windowType == 1){ //はい,いいえ ボタン
      WINDOW_YES_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_YES_BUTTON.y = WINDOW_YES_BUTTON.y + (WINDOW_NORMAL.height / 2.25);
      WINDOW_YES_BUTTON.x = parentNode.x * -0.5;
      WINDOW_YES_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_YES_BUTTON);
      WINDOW_YES_BUTTON_TEXT = Label({
        text: "はい",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_YES_BUTTON_SPRITE);
      WINDOW_YES_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_PLAYER_PROFILE != null){
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "yes";
        }
        else if(WINDOW_PARTY_INFO != null){
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "yes";
        }
        else{
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "yes";
        }
        G_NORMAL_WINDOW_DELETE();
      };

      WINDOW_NO_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_NO_BUTTON.y = WINDOW_NO_BUTTON.y + (WINDOW_NORMAL.height / 2.25);
      WINDOW_NO_BUTTON.x = parentNode.x * 0.5;
      WINDOW_NO_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_NO_BUTTON);
      WINDOW_NO_BUTTON_TEXT = Label({
        text: "いいえ",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_NO_BUTTON_SPRITE);
      WINDOW_NO_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_PLAYER_PROFILE != null){
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "no";
        }
        else if(WINDOW_PARTY_INFO != null){
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "no";
        }
        else{
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "no";
        }
        G_NORMAL_WINDOW_DELETE();
      };

    }
    else{ //OKボタン
      WINDOW_OK_BUTTON = Button({
       text: '',
       width: 256,         // 横サイズ
       height: 64,        // 縦サイズ
      }).addChildTo(WINDOW_NORMAL);
      WINDOW_OK_BUTTON.y = WINDOW_OK_BUTTON.y + (WINDOW_NORMAL.height / 2.25);
      WINDOW_OK_BUTTON.x = 0;
      WINDOW_OK_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_OK_BUTTON);
      WINDOW_OK_BUTTON_TEXT = Label({
        text: "OK",
        fontSize: 24,
        fill: 'white',
      }).addChildTo(WINDOW_OK_BUTTON_SPRITE);
      WINDOW_OK_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_PLAYER_PROFILE != null){
          WINDOW_PLAYER_PROFILE_RETURN_VAL = new Object();
          WINDOW_PLAYER_PROFILE_RETURN_VAL[windowName] = "ok";
        }
        else if(WINDOW_PARTY_INFO != null){
          WINDOW_PARTY_INFO_RETURN_VAL = new Object();
          WINDOW_PARTY_INFO_RETURN_VAL[windowName] = "ok";
        }
        else{
          WINDOW_RETURN_VAL = new Object();
          WINDOW_RETURN_VAL[windowName] = "ok";
        }
        G_NORMAL_WINDOW_DELETE();
      };
    }
  }
}

function G_ITEM_INFO_WINDOW_CREATE(parentNode,selectItemData,itemCategory){ //アイテムの説明ウィンドウを表示 0:カード 1:装備アイテム 2:通貨アイテム
  if(WINDOW_NORMAL == null && selectItemData != null){
    var iconAssetId = 125; //nullアイコン
    var itemComment = ""; //アイテムの説明
    WINDOW_MASK_SPRITE = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
    WINDOW_NORMAL = Sprite('ASSET_128').addChildTo(WINDOW_MASK_SPRITE);
    switch (itemCategory) {
      case 0: //カード
      {
        //iconAssetId = selectItemData['asset_id'];
        itemComment = selectItemData['comment'];
      }
      break;
      case 1: //装備アイテム
      {
        iconAssetId = selectItemData['icon_asset_id'];
        itemComment = selectItemData['comment'];
      }
      break;
      case 2: //通貨アイテム
      {
        iconAssetId = selectItemData['icon_asset_id'];
        itemComment = selectItemData['comment'];
      }
      break;
      default:
      break;
    }
    var itemIcon = Sprite('ASSET_' + iconAssetId).addChildTo(WINDOW_NORMAL);//アイテムアイコンを表示
    itemIcon.y = itemIcon.y - (itemIcon.height * 1.66);
    var itemCommentLabel = Label({
      text: "",
      fontSize: 27,
      fill: 'white',
      align: 'left',
    }).addChildTo(WINDOW_NORMAL);
    itemCommentLabel.x = itemCommentLabel.x - (SCREEN_WIDTH * 0.45);
    itemCommentLabel.y = itemCommentLabel.y + (SCREEN_HEIGHT * 0.225);
    itemCommentLabel.text = itemComment;
    //削除用タッチ判定
    var deleteButton = Button({
      width: WINDOW_NORMAL.width,         // 横サイズ
      height: WINDOW_NORMAL.height,        // 縦サイズ
    }).addChildTo(WINDOW_NORMAL);
    deleteButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null && WINDOW_MASK_SPRITE != null){
        G_ITEM_INFO_WINDOW_DELETE();
      }
    };
    deleteButton.visible = false;
  }
}

function G_UI_SELECT_WINDOW(parentNode,selectType,selectDatas,windowTitleText,mainText,windowName,defaultIndex = 0){ //項目選択ウィンドウを表示
  if(WINDOW_NORMAL == null){
    var defaultText = "";
    var maxIndex = 0;
    if(selectDatas != null && selectDatas.length != 0){
      maxIndex = parseInt(selectDatas.length - 1);
      for (var i = 0; i < selectDatas.length; i++) {
        if(defaultIndex == i){
          defaultText = selectDatas[i];
        }
      }
    }
    if(defaultText == "") defaultText = "※選択項目が見つかりません";
    WINDOW_MASK_SPRITE = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
    WINDOW_NORMAL = Sprite('ASSET_62').addChildTo(WINDOW_MASK_SPRITE);
    WINDOW_NORMAL['select_index'] = parseInt(defaultIndex);
    WINDOW_NORMAL['select_datas'] = selectDatas;
    //タイトル
    WINDOW_TITLE = Label({
      text: windowTitleText,
      fontSize: 36,
      fill: 'white',
    }).addChildTo(WINDOW_NORMAL);
    WINDOW_TITLE.y = WINDOW_TITLE.y - ((WINDOW_NORMAL.height / 2) - (WINDOW_TITLE.height * 0.6));
    //説明(mainText)
    WINDOW_MAIN_TEXT = Label({
      text: mainText,
      fontSize: 28,
      fill: 'black',
    }).addChildTo(WINDOW_NORMAL);
    WINDOW_MAIN_TEXT.y = WINDOW_TITLE.y;
    WINDOW_MAIN_TEXT.y = WINDOW_MAIN_TEXT.y + WINDOW_TITLE.height;
    //選択中の項目テキスト
    WINDOW_NORMAL['select_text'] = Label({
      text: defaultText,
      fontSize: 36,
      fill: 'black',
    }).addChildTo(WINDOW_NORMAL);
    //ラベルを点滅
    G_HELPER_ADD_FLICKER_ANIM(WINDOW_NORMAL['select_text']);
    //選択矢印(left)
    WINDOW_NORMAL['arrow_left'] = Sprite('ASSET_262').addChildTo(WINDOW_NORMAL);//マスクを表示
    WINDOW_NORMAL['arrow_left'].width *= 2;
    WINDOW_NORMAL['arrow_left'].height *= 2;
    WINDOW_NORMAL['arrow_left'].y = WINDOW_NORMAL['select_text'].y;
    WINDOW_NORMAL['arrow_left'].x = WINDOW_NORMAL['arrow_left'].x - ((WINDOW_NORMAL.width / 2) - WINDOW_NORMAL['arrow_left'].width);
    WINDOW_NORMAL['arrow_left'].scaleX *= -1;
    WINDOW_NORMAL['arrow_left']['button'] = Button({
     width: WINDOW_NORMAL['arrow_left'].width,         // 横サイズ
     height: WINDOW_NORMAL['arrow_left'].height,       // 縦サイズ
    }).addChildTo(WINDOW_NORMAL['arrow_left']);
    WINDOW_NORMAL['arrow_left']['button']['max_index'] = maxIndex;
    WINDOW_NORMAL['arrow_left']['button'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['max_index'] == 0) return;
      if(isset(this.parent.parent['select_index'])){
        var parentObj = this.parent.parent;
        var nowIndex = parentObj['select_index'];
        if(nowIndex <= 0) nowIndex = this['max_index'];
        else nowIndex = nowIndex - 1;
        parentObj['select_index'] = nowIndex;
        if(isset(parentObj['select_text']) && isset(parentObj['select_datas'])){
          parentObj['select_text'].text = parentObj['select_datas'][nowIndex];
        }
      }
    };
    WINDOW_NORMAL['arrow_left']['button'].visible = false;

    //選択矢印(right)
    WINDOW_NORMAL['arrow_right'] = Sprite('ASSET_262').addChildTo(WINDOW_NORMAL);//マスクを表示
    WINDOW_NORMAL['arrow_right'].width *= 2;
    WINDOW_NORMAL['arrow_right'].height *= 2;
    WINDOW_NORMAL['arrow_right'].y = WINDOW_NORMAL['select_text'].y;
    WINDOW_NORMAL['arrow_right'].x = WINDOW_NORMAL['arrow_right'].x + ((WINDOW_NORMAL.width / 2) - WINDOW_NORMAL['arrow_right'].width);
    WINDOW_NORMAL['arrow_right']['button'] = Button({
     width: WINDOW_NORMAL['arrow_right'].width,         // 横サイズ
     height: WINDOW_NORMAL['arrow_right'].height,       // 縦サイズ
    }).addChildTo(WINDOW_NORMAL['arrow_right']);
    WINDOW_NORMAL['arrow_right']['button']['max_index'] = maxIndex;
    WINDOW_NORMAL['arrow_right']['button'].onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['max_index'] == 0) return;
      if(isset(this.parent.parent['select_index'])){
        var parentObj = this.parent.parent;
        var nowIndex = parentObj['select_index'];
        if(this['max_index'] <= nowIndex) nowIndex = 0;
        else nowIndex = nowIndex + 1;
        parentObj['select_index'] = nowIndex;
        if(isset(parentObj['select_text']) && isset(parentObj['select_datas'])){
          parentObj['select_text'].text = parentObj['select_datas'][nowIndex];
        }
      }
    };
    WINDOW_NORMAL['arrow_right']['button'].visible = false;
    //選択項目なない場合ボタンを半透明に
    if(maxIndex == 0) {
      WINDOW_NORMAL['arrow_right'].alpha = 0.5;
      WINDOW_NORMAL['arrow_left'].alpha = 0.5;
    }
    //決定ボタン
    WINDOW_YES_BUTTON = Button({
     width: 256,         // 横サイズ
     height: 64,        // 縦サイズ
    }).addChildTo(WINDOW_NORMAL);
    WINDOW_YES_BUTTON.y = WINDOW_YES_BUTTON.y + ((WINDOW_NORMAL.height / 2) - (WINDOW_YES_BUTTON.height * 0.7));
    WINDOW_YES_BUTTON.x = WINDOW_YES_BUTTON.x - (WINDOW_YES_BUTTON.width * 0.55);
    WINDOW_YES_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_YES_BUTTON);
    WINDOW_YES_BUTTON_TEXT = Label({
      text: "決定",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WINDOW_YES_BUTTON_SPRITE);
    WINDOW_YES_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      WINDOW_SELECT_RETURN_VAL = new Object();
      WINDOW_SELECT_RETURN_VAL[windowName] = parseInt(this.parent['select_index']);
      G_UI_SELECT_WINDOW_DELETE();
    };
    //キャンセル
    WINDOW_NO_BUTTON = Button({
     width: 256,         // 横サイズ
     height: 64,        // 縦サイズ
    }).addChildTo(WINDOW_NORMAL);
    WINDOW_NO_BUTTON.y = WINDOW_YES_BUTTON.y;
    WINDOW_NO_BUTTON.x = WINDOW_NO_BUTTON.x + (WINDOW_NO_BUTTON.width * 0.55);
    WINDOW_NO_BUTTON_SPRITE = Sprite('ASSET_63').addChildTo(WINDOW_NO_BUTTON);
    WINDOW_NO_BUTTON_TEXT = Label({
      text: "キャンセル",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(WINDOW_NO_BUTTON_SPRITE);
    WINDOW_NO_BUTTON.onpointend = function(e){// カテゴリーボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      G_UI_SELECT_WINDOW_DELETE();
    };
  }
}

function G_NORMAL_WINDOW_DELETE(){//ウィンドウを削除する
  if(WINDOW_MASK_SPRITE != null){
    WINDOW_MASK_SPRITE.remove();
    WINDOW_MASK_SPRITE = null;
  }
  if(WINDOW_NORMAL != null){
    WINDOW_NORMAL.remove();
    WINDOW_NORMAL = null;
  }
  if(WINDOW_TITLE != null){
    WINDOW_TITLE.remove();
    WINDOW_TITLE = null;
  }
  if(WINDOW_MAIN_TEXT != null){
    WINDOW_MAIN_TEXT.remove();
    WINDOW_MAIN_TEXT = null;
  }
  if(WINDOW_NORMAL_CONTENTS != null){
    WINDOW_NORMAL_CONTENTS.remove();
    WINDOW_NORMAL_CONTENTS = null;
  }
  if(WINDOW_YES_BUTTON != null){
    WINDOW_YES_BUTTON.remove();
    WINDOW_YES_BUTTON = null;
  }
  if(WINDOW_NO_BUTTON != null){
    WINDOW_NO_BUTTON.remove();
    WINDOW_NO_BUTTON = null;
  }
  if(WINDOW_YES_BUTTON_SPRITE != null){
    WINDOW_YES_BUTTON_SPRITE.remove();
    WINDOW_YES_BUTTON_SPRITE = null;
  }
  if(WINDOW_YES_BUTTON_TEXT != null){
    WINDOW_YES_BUTTON_TEXT.remove();
    WINDOW_YES_BUTTON_TEXT = null;
  }
  if(WINDOW_NO_BUTTON_SPRITE != null){
    WINDOW_NO_BUTTON_SPRITE.remove();
    WINDOW_NO_BUTTON_SPRITE = null;
  }
  if(WINDOW_NO_BUTTON_TEXT != null){
    WINDOW_NO_BUTTON_TEXT.remove();
    WINDOW_NO_BUTTON_TEXT = null;
  }
  if(WINDOW_OK_BUTTON != null){
    WINDOW_OK_BUTTON.remove();
    WINDOW_OK_BUTTON = null;
  }
  if(WINDOW_OK_BUTTON_SPRITE != null){
    WINDOW_OK_BUTTON_SPRITE.remove();
    WINDOW_OK_BUTTON_SPRITE = null;
  }
  if(WINDOW_OK_BUTTON_TEXT != null){
    WINDOW_OK_BUTTON_TEXT.remove();
    WINDOW_OK_BUTTON_TEXT = null;
  }
}

function G_ITEM_INFO_WINDOW_DELETE(){ //アイテム情報ウィンドウを削除する。
  if(WINDOW_MASK_SPRITE != null){
    WINDOW_MASK_SPRITE.remove();
    WINDOW_MASK_SPRITE = null;
  }
  if(WINDOW_NORMAL != null){
    WINDOW_NORMAL.remove();
    WINDOW_NORMAL = null;
  }
}

function G_UI_SELECT_WINDOW_DELETE(){//選択ウィンドウを削除する
  if(WINDOW_MASK_SPRITE != null){
    WINDOW_MASK_SPRITE.remove();
    WINDOW_MASK_SPRITE = null;
  }
  if(WINDOW_NORMAL != null){
    WINDOW_NORMAL.remove();
    WINDOW_NORMAL = null;
  }
  if(WINDOW_TITLE != null){
    WINDOW_TITLE.remove();
    WINDOW_TITLE = null;
  }
  if(WINDOW_MAIN_TEXT != null){
    WINDOW_MAIN_TEXT.remove();
    WINDOW_MAIN_TEXT = null;
  }
  if(WINDOW_YES_BUTTON != null){
    WINDOW_YES_BUTTON.remove();
    WINDOW_YES_BUTTON = null;
  }
  if(WINDOW_NO_BUTTON != null){
    WINDOW_NO_BUTTON.remove();
    WINDOW_NO_BUTTON = null;
  }
  if(WINDOW_YES_BUTTON_SPRITE != null){
    WINDOW_YES_BUTTON_SPRITE.remove();
    WINDOW_YES_BUTTON_SPRITE = null;
  }
  if(WINDOW_YES_BUTTON_TEXT != null){
    WINDOW_YES_BUTTON_TEXT.remove();
    WINDOW_YES_BUTTON_TEXT = null;
  }
  if(WINDOW_NO_BUTTON_SPRITE != null){
    WINDOW_NO_BUTTON_SPRITE.remove();
    WINDOW_NO_BUTTON_SPRITE = null;
  }
  if(WINDOW_NO_BUTTON_TEXT != null){
    WINDOW_NO_BUTTON_TEXT.remove();
    WINDOW_NO_BUTTON_TEXT = null;
  }
}

function G_LOADING_MASK_CREATE(parentNode){ //読み込み用マスクを生成する
  if(LOADING_MASK == null){
    LOADING_MASK = Sprite('ASSET_64').addChildTo(parentNode);//読み込み用マスクを生成
  }
}

function G_DELETE_LOADING_MASK(){ //読み込み用マスクを削除
  if(LOADING_MASK != null){
    LOADING_MASK.remove();
    LOADING_MASK = null;
  }
}

function G_CREATE_TRANS_SCREEN_ANIM(parentNode,mode){ //シーン切り替え用のニメーションを作成 引数 mode 0:切り替え開始の演出 1:切り替え終了の演出
  if(TRANS_SCREEN_ANIM == null && TRANS_SCREEN_ANIM_PARTS == null){
    //プレーンノードにする
    // TRANS_SCREEN_ANIM = Sprite('ASSET_130').addChildTo(parentNode);
    // TRANS_SCREEN_ANIM.alpha = 0; //初期状態は透明

    TRANS_SCREEN_ANIM = PlainElement({ //シーンの親ノード生成
   }).addChildTo(parentNode);

    TRANS_SCREEN_ANIM_PARTS = new Array();
    TRANS_SCREEN_ANIM_PARTS[0] = Sprite('ASSET_129').addChildTo(TRANS_SCREEN_ANIM);
    TRANS_SCREEN_ANIM_PARTS[0].x = TRANS_SCREEN_ANIM_PARTS[0].x - (TRANS_SCREEN_ANIM_PARTS[0].width);
    TRANS_SCREEN_ANIM_PARTS[0].y = TRANS_SCREEN_ANIM_PARTS[0].y - (TRANS_SCREEN_ANIM_PARTS[0].height * 1.5);

    TRANS_SCREEN_ANIM_PARTS[1] = Sprite('ASSET_129').addChildTo(TRANS_SCREEN_ANIM);
    TRANS_SCREEN_ANIM_PARTS[1].x = TRANS_SCREEN_ANIM_PARTS[1].x + (TRANS_SCREEN_ANIM_PARTS[1].width);
    TRANS_SCREEN_ANIM_PARTS[1].y = TRANS_SCREEN_ANIM_PARTS[1].y - (TRANS_SCREEN_ANIM_PARTS[1].height / 2);

    TRANS_SCREEN_ANIM_PARTS[2] = Sprite('ASSET_129').addChildTo(TRANS_SCREEN_ANIM);
    TRANS_SCREEN_ANIM_PARTS[2].x = TRANS_SCREEN_ANIM_PARTS[2].x - (TRANS_SCREEN_ANIM_PARTS[2].width);
    TRANS_SCREEN_ANIM_PARTS[2].y = TRANS_SCREEN_ANIM_PARTS[2].y + (TRANS_SCREEN_ANIM_PARTS[2].height / 2);

    TRANS_SCREEN_ANIM_PARTS[3] = Sprite('ASSET_129').addChildTo(TRANS_SCREEN_ANIM);
    TRANS_SCREEN_ANIM_PARTS[3].x = TRANS_SCREEN_ANIM_PARTS[3].x + (TRANS_SCREEN_ANIM_PARTS[3].width);
    TRANS_SCREEN_ANIM_PARTS[3].y = TRANS_SCREEN_ANIM_PARTS[3].y + (TRANS_SCREEN_ANIM_PARTS[3].height * 1.5);

    TRANS_SCREEN_ANIM['back_ground_image'] = Sprite('ASSET_130').addChildTo(TRANS_SCREEN_ANIM);
    TRANS_SCREEN_ANIM['back_ground_image'].alpha = 0;

    if(mode == 1){
      TRANS_SCREEN_ANIM_PARTS[0].x = 0;
      TRANS_SCREEN_ANIM_PARTS[1].x = 0;
      TRANS_SCREEN_ANIM_PARTS[2].x = 0;
      TRANS_SCREEN_ANIM_PARTS[3].x = 0;
    }

  }
}

function G_TRANS_SCREEN_ANIM_PLAY(mode){ //シーン切り替えアニメを再生 (返し値 true:アニメ再生中 false:アニメ再生完了 (引数 0:切り替え開始 1:切り替え終了
  var animFlag = true;
  var animSpeed = 40; //アニメーションのスピード
  if(TRANS_SCREEN_ANIM == null && TRANS_SCREEN_ANIM_PARTS == null){ //アニメパーツが存在しなかった。
    animFlag = false;
    return animFlag;
  }

  switch (mode) {
    case 0: //切り替え開始
    {
      if(TRANS_SCREEN_ANIM_PARTS[0].x < 0){
        TRANS_SCREEN_ANIM_PARTS[0].x = TRANS_SCREEN_ANIM_PARTS[0].x + animSpeed;
        TRANS_SCREEN_ANIM_PARTS[3].x = TRANS_SCREEN_ANIM_PARTS[3].x - animSpeed;
      }
      else{
        if(0 < TRANS_SCREEN_ANIM_PARTS[1].x){
          TRANS_SCREEN_ANIM_PARTS[1].x = TRANS_SCREEN_ANIM_PARTS[1].x - animSpeed;
          TRANS_SCREEN_ANIM_PARTS[2].x = TRANS_SCREEN_ANIM_PARTS[2].x + animSpeed;
        }
        else{
          animFlag = false;
        }
      }
    }
    break;
    case 1: //切り替え終了
    {
      if(TRANS_SCREEN_ANIM_PARTS[0].x < TRANS_SCREEN_ANIM_PARTS[1].width){
        TRANS_SCREEN_ANIM_PARTS[0].x = TRANS_SCREEN_ANIM_PARTS[0].x + animSpeed;
        TRANS_SCREEN_ANIM_PARTS[3].x = TRANS_SCREEN_ANIM_PARTS[3].x - animSpeed;
      }
      else{
        if(-TRANS_SCREEN_ANIM_PARTS[1].width < TRANS_SCREEN_ANIM_PARTS[1].x){
          TRANS_SCREEN_ANIM_PARTS[1].x = TRANS_SCREEN_ANIM_PARTS[1].x - animSpeed;
          TRANS_SCREEN_ANIM_PARTS[2].x = TRANS_SCREEN_ANIM_PARTS[2].x + animSpeed;
        }
        else{
          animFlag = false;
        }
      }
    }
    break;
    default:
    break;
  }
  return animFlag;
}

function G_DELETE_TARNS_SCREEN_ANIM(){ //シーン切り替え演出の削除
  if(TRANS_SCREEN_ANIM != null && TRANS_SCREEN_ANIM_PARTS != null){ //アニメパーツが存在しなかった。
    TRANS_SCREEN_ANIM_PARTS[0].remove();
    TRANS_SCREEN_ANIM_PARTS[0] = null;
    TRANS_SCREEN_ANIM_PARTS[1].remove();
    TRANS_SCREEN_ANIM_PARTS[1] = null;
    TRANS_SCREEN_ANIM_PARTS[2].remove();
    TRANS_SCREEN_ANIM_PARTS[2] = null;
    TRANS_SCREEN_ANIM_PARTS[3].remove();
    TRANS_SCREEN_ANIM_PARTS[3] = null;
    TRANS_SCREEN_ANIM_PARTS = null;
    TRANS_SCREEN_ANIM['back_ground_image'].remove();
    TRANS_SCREEN_ANIM = null;
  }
}

function G_UI_CREATE_LIST(parentNode,listObj,listObjHeightSize,listTitleText,listCloseButtonText,btnNullCheck = new Array()){ //縦スライド可能なリストを生成
  WINDOW_LIST_MASK_SPRITE = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
  WINDOW_LIST = Sprite('ASSET_155').addChildTo(WINDOW_LIST_MASK_SPRITE); //リスト用ウィンドウを生成
  var scrolleSizeHeight = 768; //スクロール範囲の高さ
  var moveListPosYBottom = 0; //スクロール可能な距離(下)
  var moveListPosYTop = 0; //スクロール可能な距離(上)
  var moveListPosYHeight = 0; //移動可能な距離
  //リストの内容生成
  if(listObj != null){
    var uiBase = WINDOW_LIST['list_base'] = RectangleShape({
      width: 500,
      height: listObjHeightSize,
      fill: '#0E449A',
      strokeWidth: 0, // 外線太さ
    }).addChildTo(WINDOW_LIST);
    uiBase.setInteractive(true);
    listObj.addChildTo(uiBase);
    var listTopPosition = (uiBase.height / 2);
    var listBgTopPosition = ((WINDOW_LIST.height / 2) - (WINDOW_LIST.height * 0.1));
    if(listBgTopPosition < listTopPosition){
      var moveY = listTopPosition - listBgTopPosition;
      uiBase.y = uiBase.y + moveY;
    }
    else{
      var moveY = listBgTopPosition - listTopPosition;
      uiBase.y = uiBase.y - moveY;
    }
    //スクロール可能な距離を計算
    moveListPosYTop = uiBase.y;
    if(scrolleSizeHeight < uiBase.height){
      moveListPosYHeight = uiBase.height - scrolleSizeHeight;
      moveListPosYBottom = moveListPosYTop - moveListPosYHeight;
    }
    uiBase.update = function() {
      if(listBgTopPosition < listTopPosition){
        uiBase.onpointstart = function(e){
          WINDOW_LIST_SCROLLE_START = e.pointer.y;
        };
        uiBase.onpointmove = function(e){
          WINDOW_LIST_SCROLLE_MOVE = e.pointer.y;
          if(WINDOW_LIST_SCROLLE_START < WINDOW_LIST_SCROLLE_MOVE){//下
            uiBase.y += e.pointer.dy;
          }
          if(WINDOW_LIST_SCROLLE_START > WINDOW_LIST_SCROLLE_MOVE){//上
            uiBase.y += e.pointer.dy;
          }
        };
        uiBase.onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          WINDOW_LIST_SCROLLE_START = 0;
          WINDOW_LIST_SCROLLE_MOVE = 0;
        };
        if(moveListPosYTop < uiBase.y){
          uiBase.y = moveListPosYTop;
        }
        if(uiBase.y < moveListPosYBottom){
          uiBase.y = moveListPosYBottom;
        }
      }
    }
  }
  //リスト用フレームを生成
  WINDOW_LIST_FRAME = Sprite('ASSET_157').addChildTo(WINDOW_LIST);
  //リストのボタンと背景
  WINDOW_LIST_TITLE_AND_BUTTON = Sprite('ASSET_156').addChildTo(WINDOW_LIST);
  //リストのタイトル
  WINDOW_LIST_TITLE = Label({
    text: listTitleText,
    fontSize: 36,
    fill: 'white',
  }).addChildTo(WINDOW_LIST);
  WINDOW_LIST_TITLE.y = WINDOW_LIST_TITLE.y - ((WINDOW_LIST.height / 2) - (WINDOW_LIST.height * 0.05));
  //リストの閉じるボタンに表示する文字
  WINDOW_LIST_CLOSE_BUTTON_TEXT = Label({
    text: listCloseButtonText,
    fontSize: 36,
    fill: 'black',
  }).addChildTo(WINDOW_LIST);
  WINDOW_LIST_CLOSE_BUTTON_TEXT.y = WINDOW_LIST_CLOSE_BUTTON_TEXT.y + ((WINDOW_LIST.height / 2) - (WINDOW_LIST.height * 0.05));

  //閉じるボタン
  WINDOW_LIST_CLOSE_BUTTON = Button({
    width: 512,         // 横サイズ
    height: 96,        // 縦サイズ
  }).addChildTo(WINDOW_LIST);
  WINDOW_LIST_CLOSE_BUTTON.y = WINDOW_LIST_CLOSE_BUTTON.y + ((WINDOW_LIST.height / 2) - (WINDOW_LIST.height * 0.05));
  WINDOW_LIST_CLOSE_BUTTON['null_check_list'] = btnNullCheck;
  WINDOW_LIST_CLOSE_BUTTON.onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(!this.nullCheckList(this['null_check_list'])) return;
    if(ITEM_INFO_WINDOW != null && ITEM_INFO_WINDOW['card_info_btn']['button'].hitTest(e.pointer.x,e.pointer.y)) return;
    if(ITEM_INFO_WINDOW != null && ITEM_INFO_WINDOW['close_button']['button'].hitTest(e.pointer.x,e.pointer.y)) return;
    //ボタンNullチェック
    if(WINDOW_LIST != null && WINDOW_LIST_MASK_SPRITE != null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
      G_UI_WINDOW_LIST_DELETE();
      //個別で消す必要があるオブジェクトがあれば削除
      if(MESSAGE_WINDOW_OBJ != null){ //メッセージが表示されていれば削除
        MESSAGE_WINDOW_OBJ.remove();
        MESSAGE_WINDOW_OBJ = null;
      }
    }
  };
  WINDOW_LIST_CLOSE_BUTTON.visible = false;
}

function G_UI_WINDOW_LIST_DELETE(){ //リスト削除
  if(WINDOW_LIST_MASK_SPRITE != null){
    WINDOW_LIST_MASK_SPRITE.remove();
    WINDOW_LIST_MASK_SPRITE = null;
  }
  if(WINDOW_LIST != null){
    WINDOW_LIST.remove();
    WINDOW_LIST = null;
  }
  if(WINDOW_LIST_TITLE != null){
    WINDOW_LIST_TITLE.remove();
    WINDOW_LIST_TITLE = null;
  }
  if(WINDOW_LIST_CLOSE_BUTTON_TEXT != null){
    WINDOW_LIST_CLOSE_BUTTON_TEXT.remove();
    WINDOW_LIST_CLOSE_BUTTON_TEXT = null;
  }
  if(WINDOW_LIST_CLOSE_BUTTON != null){
    WINDOW_LIST_CLOSE_BUTTON.remove();
    WINDOW_LIST_CLOSE_BUTTON = null;
  }
  if(WINDOW_LIST_TITLE_AND_BUTTON != null){
    WINDOW_LIST_TITLE_AND_BUTTON.remove();
    WINDOW_LIST_TITLE_AND_BUTTON = null;
  }
  if(WINDOW_LIST_FRAME != null){
    WINDOW_LIST_FRAME.remove();
    WINDOW_LIST_FRAME = null;
  }
}

//G_UI_CREATE_PARTY_INFO_WINDOW(parentNode,playerInfo,selectPlayerParty,partyMemberData,avatarMasterData,avatarAnimMasterData)
function G_UI_CREATE_PARTY_INFO_WINDOW(parentNode,partyIndexId){ //パーティ情報ウィンドウを生成
  if(NETWORK_IS_CONNECTING == true) return;
  if(WINDOW_PARTY_INFO_MASK != null && WINDOW_PARTY_INFO != null) return;
  PARTY_INFO_RESULT_DATA = -1; //通信待機中にする
  WINDOW_PARTY_INFO_MASK = Sprite('ASSET_64').addChildTo(parentNode);//マスクを表示
  WINDOW_PARTY_INFO = Sprite('ASSET_160').addChildTo(WINDOW_PARTY_INFO_MASK);//ウィンドウを表示
  //パーティ名表示
  WINDOW_PARTY_INFO_PARTY_NAME_LABEL  = Label({
    text: '',
    fontSize: 36,
    fill: 'white',
    align: 'center',
  }).addChildTo(WINDOW_PARTY_INFO);
  WINDOW_PARTY_INFO_PARTY_NAME_LABEL.y = WINDOW_PARTY_INFO_PARTY_NAME_LABEL.y - (WINDOW_PARTY_INFO.height / 2.75);
  //パーティメンバー(参加人数)表示
  WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL = Label({
    text: 'パーティメンバー ( 0/5 )',
    fontSize: 24,
    fill: 'white',
    align: 'center',
  }).addChildTo(WINDOW_PARTY_INFO);
  WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL.y = WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL.y - (WINDOW_PARTY_INFO.height * 0.1);
  //パーティ参加申請ボタン画像
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN = Sprite('ASSET_79').addChildTo(WINDOW_PARTY_INFO);
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.y = WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.y + (WINDOW_PARTY_INFO.height /2) - (WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.height * 1.5);
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.x = WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.x + (WINDOW_PARTY_INFO.width / 2) - (WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.width * 1.0);
  //パーティ参加申請ボタンラベル
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn_label'] = Label({
    text: '参加する',
    fontSize: 24,
    fill: 'white',
    align: 'center',
    }).addChildTo(WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN);
  //パーティ参加申請ボタン本体
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN);
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn']['btn_active_flag'] = true;
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn']['party_name'] = "";
  WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn'].visible = false;
  //募集内容ボタン
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON = Sprite('ASSET_79').addChildTo(WINDOW_PARTY_INFO);
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON.y = WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.y;
  //募集内容ボタンラベル
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn_label'] = Label({
    text: '募集内容',
    fontSize: 24,
    fill: 'white',
    align: 'center',
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON);
  //募集内容ボタン本体
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON);
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn']['party_name'] = "";
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn']['party_comment'] = "";
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null
       && WINDOW_PARTY_INFO_COMMENT_WINDOW == null){
      G_UI_CREATE_PARTY_COMMENT_WINDOW(parentNode,this['party_name'],this['party_comment']);
    }
  };
  WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn'].visible = false;

  //閉じるボタン画像
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN = Sprite('ASSET_79').addChildTo(WINDOW_PARTY_INFO);
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.y = WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.y + (WINDOW_PARTY_INFO.height / 2) - (WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.height * 1.5);
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.x = WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.x - (WINDOW_PARTY_INFO.width / 2) + (WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.width * 1.0);
  //閉じるボタンラベル
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN['btn_label'] = Label({
    text: '閉じる',
    fontSize: 24,
    fill: 'white',
    align: 'center',
    }).addChildTo(WINDOW_PARTY_INFO_PARTY_CLOSE_BTN);
  //閉じるボタン本体
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN['btn'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(WINDOW_PARTY_INFO_PARTY_CLOSE_BTN);
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null
       && WINDOW_PARTY_INFO_COMMENT_WINDOW == null){
      G_UI_DELETE_PARTY_INFO_WINDOW(); //パーティ詳細ウィンドウを削除
    }
  };
  WINDOW_PARTY_INFO_PARTY_CLOSE_BTN['btn'].visible = false;
  //update
  WINDOW_PARTY_INFO.update = function(){
    if(PARTY_INFO_RESULT_DATA != -1 && PARTY_INFO_RESULT_DATA != "" && G_ASSET_LOADER(PARTY_INFO_RESULT_DATA)){
      var json = JSON.parse(PARTY_INFO_RESULT_DATA);//jsonをパース
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["result_party_info_datas"])){ //パーティ情報を取得
            WINDOW_PARTY_INFO_RESULT_DATA = json["result_party_info_datas"];
          }
          if(isset(json['result_party_application'])){ //パーティ参加申請結果を取得
            var resultPartyApplication = json['result_party_application'];
            if(resultPartyApplication == true) G_NORMAL_WINDOW_CREATE(parentNode,"パーティ参加申請","パーティ参加申請を行いました。",0,"resultPartyApplicationWindowSuccess");
            else G_NORMAL_WINDOW_CREATE(parentNode,"パーティ参加申請","パーティ参加申請に失敗しました。",0,"resultPartyApplicationWindowError");
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
      PARTY_INFO_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    if(WINDOW_PARTY_INFO_RESULT_DATA != null){ //パーティ通信結果を取得できた。
      var selectPlayerParty = WINDOW_PARTY_INFO_RESULT_DATA['player_party'];
      var playerAvatarData = WINDOW_PARTY_INFO_RESULT_DATA['player_avatar_data'];
      var playerEquipItemDatas = WINDOW_PARTY_INFO_RESULT_DATA['player_equip_item_datas'];
      var partyMemberData = WINDOW_PARTY_INFO_RESULT_DATA['party_member'];
      var myPlayerInfo = WINDOW_PARTY_INFO_RESULT_DATA['my_player_info'];
      //募集内容ボタンの更新
      if(isset(selectPlayerParty['party_name']) && isset(selectPlayerParty['party_comment'])){
        WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn']['party_name'] = selectPlayerParty['party_name'];
        WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON['btn']['party_comment'] = selectPlayerParty['party_comment'];
      }
      //自分の所属しているパーティか調べる
      var isMyParty = false;
      if(Array.isArray(partyMemberData)){
        for (var i = 0; i < partyMemberData.length; i++) {
          if(partyMemberData[i]['player_index_id'] == myPlayerInfo['player_index_id']){
            isMyParty = true; //自分の所属しているパーティだった。
            break;
          }
        }
      }
      if(isset(selectPlayerParty['party_name'])) WINDOW_PARTY_INFO_PARTY_NAME_LABEL.text = selectPlayerParty['party_name'];
      //アバター表示
      var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(playerAvatarData,playerEquipItemDatas);
      WINDOW_PARTY_INFO_AVATAR_NODE = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.45, 0.45, playerAvatarData['visible_head_equip_item']);
      if(WINDOW_PARTY_INFO_AVATAR_NODE != null){
        WINDOW_PARTY_INFO_AVATAR_NODE['sprites'][0].addChildTo(WINDOW_PARTY_INFO);
        WINDOW_PARTY_INFO_AVATAR_NODE['sprites'][0].y = WINDOW_PARTY_INFO_AVATAR_NODE['sprites'][0].y - (WINDOW_PARTY_INFO.height / 3);
      }
      //パーティメンバーボタン表示
      var btnPosY = 0;
      for (var i = 0; i < partyMemberData.length; i++) {
        //パーティメンバーボタン画像
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i] = Sprite('ASSET_164').addChildTo(WINDOW_PARTY_INFO);
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i].y = btnPosY;
        btnPosY = btnPosY + (WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i].height * 1.25);
        //パーティメンバー名とレベル
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn_label'] = Label({
          text: '',
          fontSize: 24,
          fill: 'white',
          align: 'center',
        }).addChildTo(WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]);
        if(isset(partyMemberData[i]['player_name'])){
          WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn_label'].text = partyMemberData[i]['player_name'] + " Lv." + partyMemberData[i]['player_level'];
        }
        //パーティメンバーボタン本体
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn'] = Button({
          width: 320,         // 横サイズ
          height: 64,        // 縦サイズ
        }).addChildTo(WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]);
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn']['player_index_id'] = partyMemberData[i]['player_index_id'];
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn'].onpointend = function(e){
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null
             && WINDOW_PARTY_INFO_COMMENT_WINDOW == null){
            G_UI_DELETE_PARTY_INFO_WINDOW(); //パーティ詳細ウィンドウを削除
            G_UI_CREATE_PLAYER_PROFILE(parentNode,this['player_index_id']);
          }
        };
        WINDOW_PARTY_INFO_MEMEBR_BUTTONS[i]['btn'].visible = false;
      }
      if(Array.isArray(partyMemberData)){
        WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL.text = "パーティメンバー ( " + partyMemberData.length + "/4 )"
      }
      //パーティ参加ボタンの処理
      //自分の所属パーティだった場合はボタンを非アクティブにする
      if(isMyParty == true){
        WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn']['btn_active_flag'] = false;
        WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.alpha = 0.5;
      }
      WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn']['party_name'] = selectPlayerParty['party_name'];
      WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN['btn'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(this['btn_active_flag'] == false) return;
        if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null
           && WINDOW_PARTY_INFO_COMMENT_WINDOW == null){
          //パーティ参加確認ウィンドウ
          var windowMainText = this['party_name'] + "\n参加申請を行いますか？";
          G_NORMAL_WINDOW_CREATE(parentNode,"パーティ参加申請",windowMainText,1,"partyApplicationWindow");
        }
      };
      WINDOW_PARTY_INFO_RESULT_DATA = null;
    }
    //ウィンドウに返し値があった
    if(WINDOW_PARTY_INFO_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_PARTY_INFO_RETURN_VAL['partyApplicationWindow'] == "yes"){ //パーティの招待を行った
        if(NETWORK_IS_CONNECTING == false){
          PARTY_INFO_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['set_application_party_index_id'] = partyIndexId;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/partyInfo/partyInfo.php",postParam); //非同期通信開始
        }
      }
      WINDOW_PARTY_INFO_RETURN_VAL = null;
    }
  }
  //通信開始
  var postParamVal = new Object();
  postParamVal['get_player_party_info_data'] = partyIndexId;
  ajaxStart("post","json","../../client/partyInfo/partyInfo.php",postParamVal); //非同期通信開始
}

function G_UI_CREATE_PARTY_COMMENT_WINDOW(parentNode,partyName,partyComment){ //パーティ募集文を表示するウィンドウを生成する。
  //マスクを表示
  WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentNode);
  //ウィンドウ本体生成
  WINDOW_PARTY_INFO_COMMENT_WINDOW = Sprite('ASSET_167').addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK);
  //タイトル表示
  WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL = Label({
    text: partyName,
    fontSize: 48,
    fill: 'white',
    align: 'center',
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW);
  WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL.y = WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL.y - (WINDOW_PARTY_INFO_COMMENT_WINDOW.height / 1.8);
  //本文表示
  WINDOW_PARTY_INFO_COMMENT_WINDOW_LABEL = LabelArea({
    text: partyComment,
    height: 512,
    width: 512,
    fontSize: 32,
    fill: 'white',
    align: 'left',
    baseline: 'top',
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW);
  //閉じるボタン
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON = Sprite('ASSET_79').addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW);
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON.y = WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON.y + ((WINDOW_PARTY_INFO_COMMENT_WINDOW.height / 1.85));
  //閉じるボタンラベル
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON['label'] = Label({
    text: '閉じる',
    fontSize: 24,
    fill: 'white',
    align: 'center',
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON);
  //閉じるボタン本体
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON['btn'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON);
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null && WINDOW_NORMAL == null && LOADING_MASK == null){
      G_UI_DELETE_PARTY_COMMENT_WINDOW();
    }
  };
  WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON['btn'].visible = false;
}

function G_UI_DELETE_PARTY_COMMENT_WINDOW(){ //パーティ募集分ウィンドウを削除する
  if(WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON != null){
    WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON.remove();
    WINDOW_PARTY_INFO_COMMENT_WINDOW_CLOSE_BUTTON = null;
  }
  if(WINDOW_PARTY_INFO_COMMENT_WINDOW_LABEL != null){
    WINDOW_PARTY_INFO_COMMENT_WINDOW_LABEL.remove();
    WINDOW_PARTY_INFO_COMMENT_WINDOW_LABEL = null;
  }
  if(WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL != null){
    WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL.remove();
    WINDOW_PARTY_INFO_COMMENT_WINDOW_TITLE_LABEL = null;
  }
  if(WINDOW_PARTY_INFO_COMMENT_WINDOW != null){
    WINDOW_PARTY_INFO_COMMENT_WINDOW.remove();
    WINDOW_PARTY_INFO_COMMENT_WINDOW = null;
  }
  if(WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK != null){
    WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK.remove();
    WINDOW_PARTY_INFO_COMMENT_WINDOW_MASK = null;
  }
}

function G_UI_DELETE_PARTY_INFO_WINDOW(){ //パーティ情報ウィンドウを削除する。
  if(WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON != null){
    WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON.remove();
    WINDOW_PARTY_INFO_COMMENT_DISP_BUTTON = null;
  }
  if(WINDOW_PARTY_INFO_MEMEBR_BUTTONS != null){
    WINDOW_PARTY_INFO_MEMEBR_BUTTONS = null;
    WINDOW_PARTY_INFO_MEMEBR_BUTTONS = new Array();
  }
  if(WINDOW_PARTY_INFO_PARTY_CLOSE_BTN != null){
    WINDOW_PARTY_INFO_PARTY_CLOSE_BTN.remove();
    WINDOW_PARTY_INFO_PARTY_CLOSE_BTN = null;
  }
  if(WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN != null){
    WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN.remove();
    WINDOW_PARTY_INFO_PARTY_APPLICATION_BTN = null;
  }
  if(WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL != null){
    WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL.remove();
    WINDOW_PARTY_INFO_MEMBER_COUNT_LABEL = null;
  }
  if(WINDOW_PARTY_INFO_AVATAR_NODE != null){
    WINDOW_PARTY_INFO_AVATAR_NODE['sprites'][0].remove();
    WINDOW_PARTY_INFO_AVATAR_NODE = null;
  }
  if(WINDOW_PARTY_INFO_PARTY_NAME_LABEL != null){
    WINDOW_PARTY_INFO_PARTY_NAME_LABEL.remove();
    WINDOW_PARTY_INFO_PARTY_NAME_LABEL = null;
  }
  if(WINDOW_PARTY_INFO != null){
    WINDOW_PARTY_INFO.remove();
    WINDOW_PARTY_INFO = null;
  }
  if(WINDOW_PARTY_INFO_MASK != null){
    WINDOW_PARTY_INFO_MASK.remove();
    WINDOW_PARTY_INFO_MASK = null;
  }
  if(WINDOW_PARTY_INFO_RETURN_VAL != null){
    WINDOW_PARTY_INFO_RETURN_VAL = null;
  }
}

function G_UI_CREATE_PLAYER_PROFILE(parentBase,playerIndexId){ //プレイヤープロフィールを生成する。
  if(NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE_MASK == null && WINDOW_PLAYER_PROFILE == null){
    PLAYER_PROFILE_RESULT_DATA = -1; //通信待機中に変更
    //マスク表示
    WINDOW_PLAYER_PROFILE_MASK = Sprite('ASSET_64').addChildTo(parentBase);
    //ウィンドウ本体表示
    WINDOW_PLAYER_PROFILE = Sprite('ASSET_165').addChildTo(WINDOW_PLAYER_PROFILE_MASK);
    //自己紹介表示領域
    WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE = Sprite('ASSET_166').addChildTo(WINDOW_PLAYER_PROFILE);
    //自己紹介テキストラベル表示
    WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL = LabelArea({
      width:512,
      height:112,
      text: '',
      fontSize: 24,
      fill: 'white',
      align: 'left',
      baseline: 'top',
    }).addChildTo(WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE);
    //WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.x = WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.x - (WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE.width / 2.5);
    WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.y = WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.y + (WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE.height * 0.075);
    //ヘッダー表示
    WINDOW_PLAYER_PROFILE_HEADER = Sprite('ASSET_34').addChildTo(WINDOW_PLAYER_PROFILE);
    WINDOW_PLAYER_PROFILE_HEADER.setScale(0.9,0.9);
    WINDOW_PLAYER_PROFILE_HEADER.y = WINDOW_PLAYER_PROFILE_HEADER.y - ((WINDOW_PLAYER_PROFILE.height / 2) - (WINDOW_PLAYER_PROFILE_HEADER.height * 1.25));
    //ヘッダータイトル
    WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL = Label({
      text: '??????',
      fontSize: 24,
      fill: 'white',
      align: 'center',
    }).addChildTo(WINDOW_PLAYER_PROFILE_HEADER);
    //アバター表示背景
    WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE = Sprite('ASSET_33').addChildTo(WINDOW_PLAYER_PROFILE);
    WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.x = WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.x - (WINDOW_PLAYER_PROFILE.width / 4.5);
    WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.y = WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.y - (WINDOW_PLAYER_PROFILE.height / 4.5);
    //プレイヤー装備品テキストラベル
    WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL = Label({
      text: '',
      fontSize: 20,
      fill: 'white',
      align: 'left',
    }).addChildTo(WINDOW_PLAYER_PROFILE);
    //WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.x = WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.x + (WINDOW_PLAYER_PROFILE.width / 4.5);
    WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.y = WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.y - (WINDOW_PLAYER_PROFILE.height / 4.75);

    var btnPosY = 0;
    for (var i = 0; i < 6; i++) {
      //ボタン画像表示
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i] = Sprite('ASSET_34').addChildTo(WINDOW_PLAYER_PROFILE);
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].width = (WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].width / 2);
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].setScale(0.9,0.9);
      if(btnPosY == 0){
        btnPosY = btnPosY + (WINDOW_PLAYER_PROFILE.height / 5.15);
      }
      else{
        btnPosY = btnPosY + (WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].height * 0.8);
      }
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].y = btnPosY;
      if(i == 2) btnPosY = 0;
      if(i < 3){
        WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].x = WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].x - (WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].width / 2.35);
      }
      else{
        WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].x = WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].x + (WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].width / 2.35);
      }
      //ボタンラベルを表示
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn_label'] = Label({
        text: '',
        fontSize: 24,
        fill: 'white',
        align: 'center',
        }).addChildTo(WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]);
      var btnText = "";
      var btnAvtiveFlag = true;
      if(i == 0){
        btnText = "パーティを見る";
        if(WINDOW_PARTY_INFO != null){ //既にパーティ情報が表示されていた場合
          WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].alpha = 0.5;
          btnAvtiveFlag = false;
        }
      }
      if(i == 1) btnText = "パーティに招待";
      if(i == 2) btnText = "フレンド申請";
      if(i == 3) btnText = "ブラックリスト登録";
      if(i == 4) btnText = "ボタン4";
      if(i == 5) btnText = "ボタン5";
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn_label'].text = btnText;
      //ボタン本体を生成
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn'] = Button({
        width: WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].width,         // 横サイズ
        height: WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].height,        // 縦サイズ
      }).addChildTo(WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]);
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn']['btn_active_flag'] = btnAvtiveFlag;
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn']['btn_index'] = i;
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn']['player_index_id'] = playerIndexId;
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn'].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false &&
          WINDOW_PARTY_INFO == null){
          if(!this['btn_active_flag']) return;
          if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
          switch (parseInt(this['btn_index'])) {
            case 0: //パーティを見る
            {
              G_UI_CREATE_PARTY_INFO_WINDOW(parentBase,this['player_party_index_id']);
              G_UI_DELETE_PLAYER_PROFILE();
            }
            break;
            case 1: //パーティに招待
            {
              //招待確認ウィンドウを生成
              WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID = this['player_index_id']; //招待するプレイヤーIDを設定
              var windowMainText = WINDOW_PLAYER_PROFILE_DATA['player_name'] + "\nパーティに招待しますか?";
              G_NORMAL_WINDOW_CREATE(parentBase,"パーティ招待の確認",windowMainText,1,"partyInvitationWindow");
            }
            break;
            case 2: //フレンド申請
            {
              //フレンド申請確認ウィンドウを生成
              WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID = this['player_index_id']; //招待するプレイヤーIDを設定
              var windowMainText = WINDOW_PLAYER_PROFILE_DATA['player_name'] + "\nフレンド申請を行いますか?";
              G_NORMAL_WINDOW_CREATE(parentBase,"フレンド申請の確認",windowMainText,1,"friendApplicationWindow");
            }
            break;
            case 3: //ブラックリストに登録
            {
              //フレンド申請確認ウィンドウを生成
              WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID = this['player_index_id']; //招待するプレイヤーIDを設定
              var windowMainText = WINDOW_PLAYER_PROFILE_DATA['player_name'] + "\nブラックリストに登録しますか?";
              G_NORMAL_WINDOW_CREATE(parentBase,"ブラックリスト登録の確認",windowMainText,1,"playerBlackListWindow");
            }
            break;
            case 4:
            {

            }
            break;
            case 5:
            {

            }
            break;
            default:
            {

            }
            break;
          }
        }
      };
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i]['btn'].visible = false;
    }
    //閉じるボタン
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON = Sprite('ASSET_79').addChildTo(WINDOW_PLAYER_PROFILE);
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON.y = WINDOW_PLAYER_PROFILE_CLOSE_BUTTON.y + ((WINDOW_PLAYER_PROFILE.height / 2) - (WINDOW_PLAYER_PROFILE_HEADER.height * 1.5));
    //閉じるボタンラベル
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON['btn_label'] = Label({
      text: '閉じる',
      fontSize: 24,
      fill: 'white',
      align: 'center',
    }).addChildTo(WINDOW_PLAYER_PROFILE_CLOSE_BUTTON);
    //閉じるボタン本体
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON['btn'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(WINDOW_PLAYER_PROFILE_CLOSE_BUTTON);
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false &&
        WINDOW_PARTY_INFO == null){
          G_UI_DELETE_PLAYER_PROFILE();
      }
    };
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON['btn'].visible = false;
  }
  WINDOW_PLAYER_PROFILE.update = function(){
    if(PLAYER_PROFILE_RESULT_DATA != -1 && PLAYER_PROFILE_RESULT_DATA != "" && G_ASSET_LOADER(PLAYER_PROFILE_RESULT_DATA)){
      var json = JSON.parse(PLAYER_PROFILE_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['player_info'])){
            WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO = json['player_info'];
          }
          if(isset(json["result_player_profile_data"])){
            WINDOW_PLAYER_PROFILE_RESULT_DATA = json["result_player_profile_data"];
          }
          if(isset(json["result_send_invitation_party"])){ //招待実行結果を取得
            var resultSendInvitationPartyData = json["result_send_invitation_party"];
            if(resultSendInvitationPartyData['error'] == 0){ //正常
              G_NORMAL_WINDOW_CREATE(parentBase,"パーティ招待","パーティに招待しました",0,"resultPartyInvitationWindowSuccess");
            }
            else{
              var errorText = "パーティの招待に失敗しました。\n■エラー内容\n" + resultSendInvitationPartyData['error_comment'];
              G_NORMAL_WINDOW_CREATE(parentBase,"パーティ招待",errorText,0,"resultPartyInvitationWindowError");
            }
          }
          if(isset(json["result_friend_application"])){ //フレンド申請実行結果を取得
            var resultFriendApplicationData = json["result_friend_application"];
            if(resultFriendApplicationData['error'] == 0){ //正常
              G_NORMAL_WINDOW_CREATE(parentBase,"フレンド申請","フレンド申請を行いました",0,"resultFriendApplicationWindowSuccess");
            }
            else{
              var errorText = "フレンド申請に失敗しました。\n■エラー内容\n" + resultFriendApplicationData['error_comment'];
              G_NORMAL_WINDOW_CREATE(parentBase,"フレンド申請",errorText,0,"resultFriendApplicationWindowError");
            }
          }
          if(isset(json["result_player_black_list"])){ //ブラックリストに登録した
            var resultPlayerBlackListData = json["result_player_black_list"];
            if(resultPlayerBlackListData['error'] == 0){ //正常
              G_NORMAL_WINDOW_CREATE(parentBase,"ブラックリスト登録","ブラックリストに登録しました",0,"resultPlayerBlackListWindowSuccess");
            }
            else{
              var errorText = "ブラックリストの登録に失敗しました。\n■エラー内容\n" + resultPlayerBlackListData['error_comment'];
              G_NORMAL_WINDOW_CREATE(parentBase,"ブラックリスト登録",errorText,0,"resultPlayerBlackListWindowError");
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
      PLAYER_PROFILE_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    //通信結果取得後の処理
    if(WINDOW_PLAYER_PROFILE_RESULT_DATA != null){
      WINDOW_PLAYER_PROFILE_DATA = WINDOW_PLAYER_PROFILE_RESULT_DATA; //通信結果を保存
      //アバターの表示
      var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_avatar_data'],WINDOW_PLAYER_PROFILE_RESULT_DATA['player_equip_item_datas']);
      WINDOW_PLAYER_PROFILE_AVATAR = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.45, 0.45, WINDOW_PLAYER_PROFILE_RESULT_DATA['player_avatar_data']['visible_head_equip_item']);
      WINDOW_PLAYER_PROFILE_AVATAR['sprites'][0].addChildTo(WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE);
      WINDOW_PLAYER_PROFILE_AVATAR['sprites'][0].y = WINDOW_PLAYER_PROFILE_AVATAR['sprites'][0].y - WINDOW_PLAYER_PROFILE_AVATAR['sprites'][0].width;
      //WINDOW_PLAYER_PROFILE_AVATAR.y = WINDOW_PLAYER_PROFILE_AVATAR.y - (WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.height / 2);
      //プレイヤーデータの表示
      if(isset(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_info']) && isset(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_equip_items'])
      && isset(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_name'])){
        //ヘッダーテキストの更新
        WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL.text = WINDOW_PLAYER_PROFILE_RESULT_DATA['player_name'] + "のプロフィール";
        var resultPlayerProfText = "";
        //クラス名のテキスト変更
        resultPlayerProfText = "クラス：???";
        for (var c = 0; c < MASTER_DATA_CLASS_IDS.length; c++) {
          if(MASTER_DATA_CLASS_IDS[c]['id'] == WINDOW_PLAYER_PROFILE_RESULT_DATA['player_info']['player_class_id']){
            resultPlayerProfText = "クラス：" + MASTER_DATA_CLASS_IDS[c]['class_name'] + "\n";
            break;
          }
        }
        //装備品名のテキスト変更
        var equipCategoryName = "???:???" + "\n";
        for (var ec = 0; ec < MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS.length; ec++) {
          var hitFlag = false;
          equipCategoryName = MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[ec]['equip_name'];
          for (var pe = 0; pe < WINDOW_PLAYER_PROFILE_RESULT_DATA['player_equip_items'].length; pe++) {
            if(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_equip_items'][pe]['equip_category_id'] == MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[ec]['id']){
              hitFlag = true;
              resultPlayerProfText = resultPlayerProfText + equipCategoryName + "：" + WINDOW_PLAYER_PROFILE_RESULT_DATA['player_equip_items'][pe]['item_name'] + "\n";
              break;
            }
          }
          if(hitFlag == false){
            resultPlayerProfText = resultPlayerProfText + equipCategoryName + "：装備なし\n";
          }
        }
        WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.text = resultPlayerProfText;
        //自己紹介コメントを更新
        WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.text = WINDOW_PLAYER_PROFILE_RESULT_DATA['player_info']['player_comment'];
      }
      //フレンドになっているか調べる
      if(isset(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_friend_datas']) && Array.isArray(WINDOW_PLAYER_PROFILE_RESULT_DATA['player_friend_datas'])){
        var friendDatas = WINDOW_PLAYER_PROFILE_RESULT_DATA['player_friend_datas'];
        for (var i = 0; i < friendDatas.length; i++) {
          if(friendDatas[i]['player_index_id'] == WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO['player_index_id']){ //自分とフレンドになっていた。
            if(WINDOW_PLAYER_PROFILE_MENU_BUTTONS != null){
              //フレンドになっているため、フレンド申請ボタンを非アクティブにする。
              WINDOW_PLAYER_PROFILE_MENU_BUTTONS[2]['btn']['btn_active_flag'] = false;
              WINDOW_PLAYER_PROFILE_MENU_BUTTONS[2].alpha = 0.5;
            }
            break;
          }
        }
      }
      //パーティを見るボタンの更新
      if(isset(WINDOW_PLAYER_PROFILE_DATA['player_info'])){
        WINDOW_PLAYER_PROFILE_MENU_BUTTONS[0]['btn']['player_party_index_id'] = WINDOW_PLAYER_PROFILE_DATA['player_info']['player_party_index_id'];
      }
      WINDOW_PLAYER_PROFILE_RESULT_DATA = null;
      WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO = null;
    }
    //ウィンドウに返し値があった
    if(WINDOW_PLAYER_PROFILE_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(WINDOW_PLAYER_PROFILE_RETURN_VAL['partyInvitationWindow'] == "yes"){ //パーティの招待を行った
        if(NETWORK_IS_CONNECTING == false){
          PLAYER_PROFILE_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['set_invitation_player_index_id'] = WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/playerProfile/playerProfile.php",postParam); //非同期通信開始
        }
      }
      if(WINDOW_PLAYER_PROFILE_RETURN_VAL['friendApplicationWindow'] == "yes"){ //フレンド申請を行った。
        if(NETWORK_IS_CONNECTING == false){
          PLAYER_PROFILE_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['set_friend_application_player_index_id'] = WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/playerProfile/playerProfile.php",postParam); //非同期通信開始
        }
      }
      if(WINDOW_PLAYER_PROFILE_RETURN_VAL['playerBlackListWindow'] == "yes"){
        if(NETWORK_IS_CONNECTING == false){
          PLAYER_PROFILE_RESULT_DATA = -1; //通信待機中にする。
          var postParam = new Object();
          postParam['set_black_list_player_index_id'] = WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/playerProfile/playerProfile.php",postParam); //非同期通信開始
        }
      }
      WINDOW_PLAYER_PROFILE_RETURN_VAL = null;
    }
  }
  //通信開始
  var postParamVal = new Object();
  postParamVal['get_player_profile_data'] = playerIndexId;
  ajaxStart("post","json","../../client/playerProfile/playerProfile.php",postParamVal); //非同期通信開始
}

function G_UI_DELETE_PLAYER_PROFILE(){ //プレイヤープロフィールを削除する
  if(WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID != -1){
    WINDOW_PLAYER_SELECT_PLAYER_INDEX_ID = -1;
  }
  if(WINDOW_PLAYER_PROFILE_AVATAR != null){
    WINDOW_PLAYER_PROFILE_AVATAR['sprites'][0].remove();
    WINDOW_PLAYER_PROFILE_AVATAR = null;
  }
  if(WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO != null){
    WINDOW_PLAYER_PROFILE_MY_PLAYER_INFO = null;
  }
  if(WINDOW_PLAYER_PROFILE_RESULT_DATA != null){
    WINDOW_PLAYER_PROFILE_RESULT_DATA = null;
  }
  if(WINDOW_PLAYER_PROFILE_DATA != null){
    WINDOW_PLAYER_PROFILE_DATA = null;
  }
  if(WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL != null){
    WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL.remove();
    WINDOW_PLAYER_PROFILE_EQUIP_ITEM_LABEL = null;
  }
  if(WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE != null){
    WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE.remove();
    WINDOW_PLAYER_PROFILE_AVATAR_DISP_BG_IMAGE = null;
  }
  if(WINDOW_PLAYER_PROFILE_CLOSE_BUTTON != null){
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON.remove();
    WINDOW_PLAYER_PROFILE_CLOSE_BUTTON = null;
  }
  for (var i = 0; i < WINDOW_PLAYER_PROFILE_MENU_BUTTONS.length; i++) {
    if(WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i] != null){
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i].remove();
      WINDOW_PLAYER_PROFILE_MENU_BUTTONS[i] = null;
    }
  }
  WINDOW_PLAYER_PROFILE_MENU_BUTTONS = new Array();
  if(WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL != null){
    WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL.remove();
    WINDOW_PLAYER_PROFILE_HEADER_TEXT_LABEL = null;
  }
  if(WINDOW_PLAYER_PROFILE_HEADER != null){
    WINDOW_PLAYER_PROFILE_HEADER.remove();
    WINDOW_PLAYER_PROFILE_HEADER = null;
  }
  if(WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL != null){
    WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL.remove();
    WINDOW_PLAYER_PROFILE_PROF_TEXT_LABEL = null;
  }
  if(WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE != null){
    WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE.remove();
    WINDOW_PLAYER_PROFILE_PROF_TEXT_IMAGE = null;
  }
  if(WINDOW_PLAYER_PROFILE != null){
    WINDOW_PLAYER_PROFILE.remove();
    WINDOW_PLAYER_PROFILE = null;
  }
  if(WINDOW_PLAYER_PROFILE_MASK != null){
    WINDOW_PLAYER_PROFILE_MASK.remove();
    WINDOW_PLAYER_PROFILE_MASK = null;
  }
}

function G_UI_CREATE_MESSAGE_WINDOW(text,stampId = 0){ //チャットなどで使用するメッセージ(吹き出し)を表示
  var messageWindow = null;
  if(text != "" || stampId != 0){
    var messageWindowWidth = 0;
    var messageWindowHeight = 0;
    var textAreaWidth = 0;
    var textAreaHeight = 0;
    var textCount = text.length;
    if(stampId != 0){
      messageWindowWidth = 128;
      messageWindowHeight = 128;
      text = "";
    }
    else if(18 < textCount){
      messageWindowWidth = 256;
      messageWindowHeight = 128;
      textAreaWidth = 225;
      textAreaHeight = 82;
    }
    else if(9 < textCount){
      messageWindowWidth = 256;
      messageWindowHeight = 86;
      textAreaWidth = 225;
      textAreaHeight = 54;
    }
    else if(5 <= textCount){
      messageWindowWidth = 256;
      messageWindowHeight = 43;
      textAreaWidth = 225;
      textAreaHeight = 27;
    }
    else {
      messageWindowWidth = 128;
      messageWindowHeight = 43;
      textAreaWidth = 112;
      textAreaHeight = 27;
    }
    var messageWindow = Sprite('ASSET_181');
    messageWindow['window'] = RectangleShape({
      width: messageWindowWidth,
      height: messageWindowHeight,
      fill:"white",
      stroke:"black",
      strokeWidth:8,
      cornerRadius:25,
    }).addChildTo(messageWindow);
    messageWindow['window'].y = messageWindow['window'].y - (messageWindow['window'].height / 2);
    messageWindow['textArea'] = LabelArea({
       width: textAreaWidth,
       height: textAreaHeight,
       text: text,
       fontSize: 25,
       fill: 'black',
        align: 'center',
      //  verticalAlign: 'top',
    }).addChildTo(messageWindow['window']);
    messageWindow['stamp_sprite'] = null;
    if(stampId != 0){
      var assetName = "";
      for (var j = 0; j < MASTER_DATA_CHAT_STAMP_MASTER.length; j++) {
        if(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_id'] == stampId){
          assetName = "ASSET_" + String(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_asset_id']);
          break;
        }
      }
      if(assetName != ""){
        messageWindow['stamp_sprite'] = Sprite(assetName).addChildTo(messageWindow['window']);
      }
    }
  }
  return messageWindow;
}

function G_UI_UPDATE_MESSAGE_WINDOW(messageWndObj,text,stampId = 0){ //メッセージウィンドウのメッセージを更新する。
  if(messageWndObj != null){
    if(text != "" || stampId != 0){
      if(messageWndObj['stamp_sprite'] != null) messageWndObj['stamp_sprite'].remove();
      var messageWindowWidth = 0;
      var messageWindowHeight = 0;
      var textAreaWidth = 0;
      var textAreaHeight = 0;
      var textCount = text.length;
      if(stampId != 0){
        messageWindowWidth = 128;
        messageWindowHeight = 128;
        var assetName = "";
        for (var j = 0; j < MASTER_DATA_CHAT_STAMP_MASTER.length; j++) {
          if(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_id'] == stampId){
            assetName = "ASSET_" + String(MASTER_DATA_CHAT_STAMP_MASTER[j]['stamp_asset_id']);
            break;
          }
        }
        if(assetName != ""){
          messageWndObj['stamp_sprite'] = Sprite(assetName).addChildTo(messageWndObj['window']);
        }
      }
      else if(18 < textCount){
        messageWindowWidth = 256;
        messageWindowHeight = 128;
        textAreaWidth = 225;
        textAreaHeight = 82;
      }
      else if(9 < textCount){
        messageWindowWidth = 256;
        messageWindowHeight = 86;
        textAreaWidth = 225;
        textAreaHeight = 54;
      }
      else if(5 <= textCount){
        messageWindowWidth = 256;
        messageWindowHeight = 43;
        textAreaWidth = 225;
        textAreaHeight = 27;
      }
      else {
        messageWindowWidth = 128;
        messageWindowHeight = 43;
        textAreaWidth = 112;
        textAreaHeight = 27;
      }
      messageWndObj['window'].width = messageWindowWidth;
      messageWndObj['window'].height = messageWindowHeight;
      messageWndObj['window'].y = 0;
      messageWndObj['window'].y = messageWndObj['window'].y - (messageWndObj['window'].height / 2);
      messageWndObj['textArea'].width = textAreaWidth;
      messageWndObj['textArea'].height = textAreaHeight;
      messageWndObj['textArea'].text = text;
    }
  }
}
