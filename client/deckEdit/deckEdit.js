//============================================
//  デッキ編集シーン
//============================================
//パブリック変数定義
var DECK_EDIT_SCENE_INIT_FLAG = false; //シーンの初期化フラグ
var DECK_EDIT_PLAYER_INFO = null; //プレイヤー情報
var DECK_EDIT_DECK_CATEGORY_NAME_LIST = new Array(); //カテゴリー名を定義したリスト
var DECK_EDIT_DECK_CATEGORY_BUTTONS = new Array(); //カテゴリーボタンの配列
var DECK_EDIT_BASE_LAYER = null; //デッキシーンのベースレイヤー
var DECK_EDIT_UI_LAYER = null; //デッキシーンのUIレイヤー
var DECK_EDIT_WINDOW_LAYER = null; //ウィンドウレイヤー
var DECK_EDIT_BACK_BTN = null; //戻るボタン
var DECK_EDIT_HEADER = null; //ヘッダー
var DECK_EDIT_CARD_LIST_SPRITE = new Array(); //カードリストに表示するスプライト配列
var DECK_EDIT_CARD_LIST_OBJ = null; //カードリスト表示用リスト
var DECK_EDIT_CARD_LIST_LAYER = null; //カードリスト用レイヤー
var DECK_EDIT_CARD_LIST_OBJ_Y_POS_INIT = null; //リストの初期Y座標
var DECK_EDIT_CARD_LIST_HOME_POS_Y = 0; //リストの初期Y座標
var DECK_EDIT_CARD_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
var DECK_EDIT_CARD_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var DECK_EDIT_CARD_LIST_SCROLLE_START = 0;//スクロールのスタート位置
var DECK_EDIT_CARD_LIST_DATAS = new Array(); //カードリストに表示中のカードデータ
var DECK_EDIT_PLAYER_CARD_DATAS = new Array(); //プレイヤーの所持カード情報
var DECK_EDIT_PLAYER_CARD_DECK_PRESET = new Array(); //プレイヤーのプリセットデータ
var DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = new Array(); //編集中のプリセットデッキデータ
var DECK_EDIT_PLAYER_CARD_DECK_MAIN = new Array(); //プレイヤーのメインデッキデータ
var DECK_EDIT_PLAYER_CARD_DECK_PARTY = new Array(); //プレイヤーのパーティデッキデータ
var DECK_EDIT_PLAYER_CARD_DECK_PVP = new Array(); //プレイヤーのPVPデッキデータ
var DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY = new Array(); //プレイヤーのPVPパーティデッキデータ
var DECK_EDIT_CARD_CATEGORY_WINDOW_ACTIVE = true; //カードカテゴリー画面が表示中か
var DECK_EDIT_PLAYER_MAX_DECK_NUM = 5; //プレイヤーの最大デッキカード組み込み枚数
var DECK_EDIT_SET_LIST_INDEX = -1; //最後に選択したindex
var DECK_EDIT_SET_LIST_TARGET_ID = -1; //最後に選択したリストのID
var DECK_EDIT_CARD_LIST_TOUCH_START_POS_X = null; //カードリストをタッチした最初のポジション
var DECK_EDIT_CARD_LIST_TOUCH_START_POS_Y = null; //カードリストをタッチした最初のポジション
var DECK_EDIT_EDIT_FLAG = false; //デッキの編集が行われている状態か
var DECK_EDIT_FOOTER = null; //フッター
var DECK_EDIT_FOOTER_STATUS = new Array(); //フッターのステータス
var DECK_EDIT_CARD_LIST_STATUS = new Array(); //カードリストの現在のステータス
var DECK_EDIT_LIST_MAX_POS_Y = 0; //リストの最大位置
var DECK_EDIT_SORT_BUTTONS = null; //ソートボタンの実体
var DECK_EDIT_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
var DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
var DECK_EDIT_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
var DECK_EDIT_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
var DECK_EDIT_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
var DECK_EDIT_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
var DECK_EDIT_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
var DECK_EDIT_SELECT_CARD_CATEGORY_ID = -1; //選択中のカードカテゴリー
var DECK_EDIT_LIST_CELL_BTN_HOLD = 0; //リストセルボタンの長押しした数値

phina.define("DeckEdit", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "deckEdit";
    //メンバー初期化
    DECK_EDIT_SCENE_INIT_FLAG = false; //シーンの初期化フラグ
    DECK_EDIT_PLAYER_INFO = null; //プレイヤー情報
    DECK_EDIT_DECK_CATEGORY_NAME_LIST = new Array(); //カテゴリー名を定義したリスト
    DECK_EDIT_DECK_CATEGORY_BUTTONS = new Array(); //カテゴリーボタンの配列
    DECK_EDIT_BASE_LAYER = null; //デッキシーンのベースレイヤー
    DECK_EDIT_UI_LAYER = null; //デッキシーンのUIレイヤー
    DECK_EDIT_WINDOW_LAYER = null; //ウィンドウレイヤー
    DECK_EDIT_BACK_BTN = null; //戻るボタン
    DECK_EDIT_HEADER = null; //ヘッダー
    DECK_EDIT_CARD_LIST_SPRITE = new Array(); //カードリストに表示するスプライト配列
    DECK_EDIT_CARD_LIST_OBJ = null; //カードリスト表示用リスト
    DECK_EDIT_CARD_LIST_LAYER = null; //カードリスト用レイヤー
    DECK_EDIT_CARD_LIST_OBJ_Y_POS_INIT = null; //リストの初期Y座標
    DECK_EDIT_CARD_LIST_HOME_POS_Y = 0; //リストの初期Y座標
    DECK_EDIT_CARD_LIST_TOUCH_AREA = null; //リスト表示用レイヤー
    DECK_EDIT_CARD_LIST_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    DECK_EDIT_CARD_LIST_SCROLLE_START = 0;//スクロールのスタート位置
    DECK_EDIT_CARD_LIST_DATAS = new Array(); //カードリストに表示中のカードデータ
    DECK_EDIT_PLAYER_CARD_DATAS = new Array(); //プレイヤーの所持カード情報
    DECK_EDIT_PLAYER_CARD_DECK_PRESET = new Array(); //プレイヤーのプリセットデータ
    DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = new Array(); //編集中のプリセットデッキデータ
    DECK_EDIT_PLAYER_CARD_DECK_MAIN = new Array(); //プレイヤーのメインデッキデータ
    DECK_EDIT_PLAYER_CARD_DECK_PARTY = new Array(); //プレイヤーのパーティデッキデータ
    DECK_EDIT_PLAYER_CARD_DECK_PVP = new Array(); //プレイヤーのPVPデッキデータ
    DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY = new Array(); //プレイヤーのPVPパーティデッキデータ
    DECK_EDIT_CARD_CATEGORY_WINDOW_ACTIVE = true; //カードカテゴリー画面が表示中か
    DECK_EDIT_PLAYER_MAX_DECK_NUM = 5; //プレイヤーの最大デッキカード組み込み枚数
    DECK_EDIT_SET_LIST_INDEX = -1; //最後に選択したindex
    DECK_EDIT_SET_LIST_TARGET_ID = -1; //最後に選択したリストのID
    DECK_EDIT_CARD_LIST_TOUCH_START_POS_X = null; //カードリストをタッチした最初のポジション
    DECK_EDIT_CARD_LIST_TOUCH_START_POS_Y = null; //カードリストをタッチした最初のポジション
    DECK_EDIT_EDIT_FLAG = false; //デッキの編集が行われている状態か
    DECK_EDIT_FOOTER = null; //フッター
    DECK_EDIT_FOOTER_STATUS = new Array(); //フッターのステータス
    DECK_EDIT_CARD_LIST_STATUS = new Array(); //カードリストの現在のステータス
    DECK_EDIT_LIST_MAX_POS_Y = 0; //リストの最大位置
    DECK_EDIT_SORT_BUTTONS = null; //ソートボタンの実体
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA = null; //ソートボタンのスワイプタッチエリア
    DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE = 0; //スクロールの移動中の位置
    DECK_EDIT_SORT_BUTTONS_SCROLLE_START = 0;//スクロールのスタート位置
    DECK_EDIT_SORT_BUTTONS_HOME_POS_X = 0; //ソートボタンリストの初期X座標
    DECK_EDIT_SORT_BUTTONS_MAX_POS_X = 0; //ソートボタンリストの最大位置
    DECK_EDIT_SORT_BUTTONS_MIN_POS_X = 0; //ソートボタンリストの最小位置
    DECK_EDIT_SORT_BUTTONS_X_POS_INIT = null; //ソートボタンリストの初期X座標
    DECK_EDIT_SELECT_CARD_CATEGORY_ID = -1; //選択中のカードカテゴリー
    DECK_EDIT_LIST_CELL_BTN_HOLD = 0; //リストセルボタンの長押しした数値

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    var phinaInstance = this;

    //カードリスト用レイヤーを生成
    DECK_EDIT_CARD_LIST_LAYER = PlainElement({
    }).addChildTo(this);

    //カードリストステータスを初期化
    DECK_EDIT_CARD_LIST_STATUS['category_id'] = -1;
    DECK_EDIT_CARD_LIST_STATUS['option_id'] = -1;
    DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] = -1;

    //リストタッチエリアを生成
    DECK_EDIT_CARD_LIST_TOUCH_AREA = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(DECK_EDIT_CARD_LIST_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    DECK_EDIT_CARD_LIST_TOUCH_AREA.setInteractive(true);

    //カードリスト用オブジェクトを生成
    DECK_EDIT_CARD_LIST_OBJ = PlainElement({
      width: 640,
      height: 960,
    }).addChildTo(DECK_EDIT_CARD_LIST_LAYER).setPosition(this.gridX.center(), this.gridY.center());
    DECK_EDIT_CARD_LIST_OBJ_Y_POS_INIT = DECK_EDIT_CARD_LIST_OBJ.y;

    //ベースレイヤーを生成
    DECK_EDIT_BASE_LAYER = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    //UIレイヤーを生成
    DECK_EDIT_UI_LAYER = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(DECK_EDIT_BASE_LAYER);

    //ウィンドウレイヤー
    DECK_EDIT_WINDOW_LAYER = PlainElement({ //ウィンドウレイヤー
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    //ヘッダー表示
    DECK_EDIT_HEADER = Sprite('ASSET_34').addChildTo(DECK_EDIT_UI_LAYER);
    DECK_EDIT_HEADER.y = DECK_EDIT_HEADER.y - ((SCREEN_HEIGHT / 2) - (DECK_EDIT_HEADER.height / 2));
    //ヘッダーラベルを表示
    DECK_EDIT_HEADER['header_label'] = Label({
      text: 'カードデッキ編成',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(DECK_EDIT_HEADER);
    //ソートボタン
    DECK_EDIT_SORT_BUTTONS = PlainElement({ //シーンの親ノード生成
    }).addChildTo(DECK_EDIT_UI_LAYER);
    DECK_EDIT_SORT_BUTTONS['buttons'] = null;
    DECK_EDIT_SORT_BUTTONS_X_POS_INIT = DECK_EDIT_SORT_BUTTONS.x; //ソートボタンリストの初期X座標
    //ソートボタンタッチエリアを生成
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA = PlainElement({
      width: 640,
      height: 64,
    }).addChildTo(DECK_EDIT_UI_LAYER);
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.y = DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.y - ((SCREEN_HEIGHT / 2) - (DECK_EDIT_HEADER.height + (DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.height / 2)));
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.setInteractive(true);

    //ヘッダーボタン
    DECK_EDIT_HEADER['header_button'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(DECK_EDIT_HEADER);
    DECK_EDIT_HEADER['header_button'].alpha = 0;
    DECK_EDIT_HEADER['header_button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null){
        if(DECK_EDIT_CARD_LIST_STATUS['category_id'] == 0 && DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] == 1){
          //デッキ名を入力
          var inputText = window.prompt("デッキ名を変更", DECK_EDIT_HEADER['header_label'].text);
          if(String(inputText).length < 10){ //10文字以内か
            DECK_EDIT_HEADER['header_label'].text = inputText;
            DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['deck_name'] = inputText;
            G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_CARD_LIST_STATUS['category_id'],1); //フッターとボタンを表示(変更決定とキャンセルボタン)
          }
          else{ //文字数オーバー
            G_NORMAL_WINDOW_CREATE(DECK_EDIT_WINDOW_LAYER,"テキスト入力エラー","文字数制限を超えました",0,"inputMessageErrorWIndow");
          }
        }
      }
    };


    //フッター表示
    DECK_EDIT_FOOTER = Sprite('ASSET_34').addChildTo(DECK_EDIT_UI_LAYER);
    DECK_EDIT_FOOTER.y = DECK_EDIT_FOOTER.y + ((SCREEN_HEIGHT / 2) - (DECK_EDIT_FOOTER.height / 2));
    DECK_EDIT_FOOTER.visible = false;

    //フッターのステータス配列を初期化
    DECK_EDIT_FOOTER_STATUS['category_type'] = -1;
    DECK_EDIT_FOOTER_STATUS['option_type'] = 0;

    //フッターボタンの表示(左)
    DECK_EDIT_FOOTER['button_left'] = Sprite('ASSET_120').addChildTo(DECK_EDIT_FOOTER);
    DECK_EDIT_FOOTER['button_left'].x = DECK_EDIT_FOOTER['button_left'].x - ((SCREEN_WIDTH / 2) - DECK_EDIT_FOOTER['button_left'].width / 2);
    DECK_EDIT_FOOTER['button_left']['button_label'] = Label({
      text: "左ボタン",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(DECK_EDIT_FOOTER['button_left']);
    DECK_EDIT_FOOTER['button_left']['button'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(DECK_EDIT_FOOTER['button_left']);
    DECK_EDIT_FOOTER['button_left']['button'].alpha = 0;
    DECK_EDIT_FOOTER['button_left']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.visible == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
        console.log("左ボタンタップ");
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 0 && DECK_EDIT_FOOTER_STATUS['option_type'] == 1){ //変更決定
          var checkCardMasterIds = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'].split(',');
          var checkActiveCard = false; //設定可能なカードが1枚でも存在するか
          for (var i = 0; i < checkCardMasterIds.length; i++) {
            if(checkCardMasterIds[i] != -1){
              checkActiveCard = true;
              break;
            }
          }
          if(checkActiveCard == false) return;
          //プリセットデッキ変更通信処理を開始
          var postParam = new Object();
          postParam['preset_card_deck_update'] = new Object;
          postParam['preset_card_deck_update']['preset_card_deck_id'] = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['preset_card_deck_id'];
          postParam['preset_card_deck_update']['deck_name'] = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['deck_name'];
          postParam['preset_card_deck_update']['card_deck'] = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'];
          console.log(postParam);
          ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
        }
      }
    };
    //フッターボタンの表示(中央)
    DECK_EDIT_FOOTER['button_center'] = Sprite('ASSET_120').addChildTo(DECK_EDIT_FOOTER);
    DECK_EDIT_FOOTER['button_center']['button_label'] = Label({
      text: "中央ボタン",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(DECK_EDIT_FOOTER['button_center']);
    DECK_EDIT_FOOTER['button_center']['button'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(DECK_EDIT_FOOTER['button_center']);
    DECK_EDIT_FOOTER['button_center']['button'].alpha = 0;
    DECK_EDIT_FOOTER['button_center']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.visible == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
        console.log("中央ボタンタップ");
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 0 && DECK_EDIT_FOOTER_STATUS['option_type'] == 0){
          console.log("戻るボタンタップ");
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(true); //カテゴリーを表示に
          G_DECK_EDIT_CARD_LIST_DISP(false); //カードリスト非表示
          G_DECK_EDIT_FOOTER_DISP(false); //フッターを非表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
          DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK.length = 0;
          DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = new Array();
          //カテゴリーが表示されていれば削除
          if(isset(DECK_EDIT_SORT_BUTTONS['buttons'])){
            if(DECK_EDIT_SORT_BUTTONS['buttons'] != null){
              for (var i = 0; i < DECK_EDIT_SORT_BUTTONS['buttons'].length; i++) {
                DECK_EDIT_SORT_BUTTONS['buttons'][i].remove();
              }
              DECK_EDIT_SORT_BUTTONS['buttons'].length = 0;
            }
          }
        }
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 1 && DECK_EDIT_FOOTER_STATUS['option_type'] == 0){
          console.log("戻るボタンタップ");
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(true); //カテゴリーを表示に
          G_DECK_EDIT_CARD_LIST_DISP(false); //カードリスト非表示
          G_DECK_EDIT_FOOTER_DISP(false); //フッターを非表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
        }
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 2 && DECK_EDIT_FOOTER_STATUS['option_type'] == 0){
          console.log("戻るボタンタップ");
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(true); //カテゴリーを表示に
          G_DECK_EDIT_CARD_LIST_DISP(false); //カードリスト非表示
          G_DECK_EDIT_FOOTER_DISP(false); //フッターを非表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
        }
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 3 && DECK_EDIT_FOOTER_STATUS['option_type'] == 0){
          console.log("戻るボタンタップ");
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(true); //カテゴリーを表示に
          G_DECK_EDIT_CARD_LIST_DISP(false); //カードリスト非表示
          G_DECK_EDIT_FOOTER_DISP(false); //フッターを非表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
        }
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 4 && DECK_EDIT_FOOTER_STATUS['option_type'] == 0){
          console.log("戻るボタンタップ");
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(true); //カテゴリーを表示に
          G_DECK_EDIT_CARD_LIST_DISP(false); //カードリスト非表示
          G_DECK_EDIT_FOOTER_DISP(false); //フッターを非表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
        }
      }
    };
    //フッターボタンの表示(右)
    DECK_EDIT_FOOTER['button_right'] = Sprite('ASSET_120').addChildTo(DECK_EDIT_FOOTER);
    DECK_EDIT_FOOTER['button_right'].x = DECK_EDIT_FOOTER['button_right'].x + ((SCREEN_WIDTH / 2) - DECK_EDIT_FOOTER['button_right'].width / 2);
    DECK_EDIT_FOOTER['button_right']['button_label'] = Label({
      text: "右ボタン",
      fontSize: 24,
      fill: 'black',
    }).addChildTo(DECK_EDIT_FOOTER['button_right']);
    DECK_EDIT_FOOTER['button_right']['button'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(DECK_EDIT_FOOTER['button_right']);
    DECK_EDIT_FOOTER['button_right']['button'].alpha = 0;
    DECK_EDIT_FOOTER['button_right']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this.visible == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
        console.log("右ボタンタップ");
        if(DECK_EDIT_FOOTER_STATUS['category_type'] == 0 && DECK_EDIT_FOOTER_STATUS['option_type'] == 1){ //変更キャンセル
          G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
          G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
          //編集中のデッキデータがあればリセット
          DECK_EDIT_EDIT_FLAG = false;
          DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK.length = 0;
          DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = new Array();
        }
      }
    };

    //戻るボタンの作成
    DECK_EDIT_BACK_BTN = Sprite('ASSET_79').addChildTo(DECK_EDIT_UI_LAYER);
    DECK_EDIT_BACK_BTN['button_label'] = Label({
      text: "戻る",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(DECK_EDIT_BACK_BTN);
    DECK_EDIT_BACK_BTN['button'] = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(DECK_EDIT_BACK_BTN);
    DECK_EDIT_BACK_BTN['button'].visible = false;
    DECK_EDIT_BACK_BTN.x = DECK_EDIT_BACK_BTN.x + ((SCREEN_WIDTH / 2) - (DECK_EDIT_BACK_BTN.width / 2));
    DECK_EDIT_BACK_BTN.y = DECK_EDIT_HEADER.y + DECK_EDIT_BACK_BTN.height;
    DECK_EDIT_BACK_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(DECK_EDIT_CARD_CATEGORY_WINDOW_ACTIVE == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        SCENE_MANAGER['prev_scene'] = "deckEdit";
        phinaInstance.exit(prevSceneName);
      }
    };

    //カテゴリー名を設定
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[0] = new Array();
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[0]['category_id'] = 0;
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[0]['category_name'] = "プリセット";
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[1] = new Array();
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[1]['category_id'] = 1;
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[1]['category_name'] = "マイデッキ";
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[2] = new Array();
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[2]['category_id'] = 2;
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[2]['category_name'] = "パーティデッキ";
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[3] = new Array();
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[3]['category_id'] = 3;
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[3]['category_name'] = "PVPデッキ";
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[4] = new Array();
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[4]['category_id'] = 4;
    DECK_EDIT_DECK_CATEGORY_NAME_LIST[4]['category_name'] = "PVPパーティデッキ";

    //カテゴリーボタンの作成
    var categoryBtnPosY = 0;
    for (var i = 0; i < DECK_EDIT_DECK_CATEGORY_NAME_LIST.length; i++) {
      var categoryName = DECK_EDIT_DECK_CATEGORY_NAME_LIST[i]['category_name'];
      var categoryId = DECK_EDIT_DECK_CATEGORY_NAME_LIST[i]['category_id'];
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i] = Sprite('ASSET_163').addChildTo(DECK_EDIT_UI_LAYER);
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i]['button_label'] = Label({
        text: categoryName,
        fontSize: 24,
        fill: 'white',
      }).addChildTo(DECK_EDIT_DECK_CATEGORY_BUTTONS[i]);
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i]['button'] = Button({
        width: 240,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(DECK_EDIT_DECK_CATEGORY_BUTTONS[i]);
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i]['button'].visible = false;
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i]['button']['category_id'] = categoryId;
      DECK_EDIT_DECK_CATEGORY_BUTTONS[i]['button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(DECK_EDIT_SCENE_INIT_FLAG == false) return;
        if(DECK_EDIT_CARD_CATEGORY_WINDOW_ACTIVE == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
          //デッキリストを表示する
          G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(false); //カテゴリーを非表示に
          G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id']);
        }
      };
      if(i == 0){ //Y座標の初期位置を指定
        DECK_EDIT_DECK_CATEGORY_BUTTONS[i].y = DECK_EDIT_DECK_CATEGORY_BUTTONS[i].y - (SCREEN_HEIGHT / 3);
        categoryBtnPosY = DECK_EDIT_DECK_CATEGORY_BUTTONS[i].y;
      }
      else{
        categoryBtnPosY = categoryBtnPosY + (DECK_EDIT_DECK_CATEGORY_BUTTONS[i].height * 2);
        DECK_EDIT_DECK_CATEGORY_BUTTONS[i].y = DECK_EDIT_DECK_CATEGORY_BUTTONS[i].y + categoryBtnPosY;
      }
    }
    //G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(false); //テストコード
    //カードリストを生成
    G_DECK_EDIT_CARD_LIST_CREATE(-1);
    //カードリストを非表示にする
    G_DECK_EDIT_CARD_LIST_DISP(false);

    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['deck_edit_scene_init'] = 1;
    ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
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
          if(isset(json['result_add_load_asset_datas'])){ //追加読み込みアセット
            G_ASSET_START_ASSET_LODER(json['result_add_load_asset_datas']); //アセットを追加読み込みする(非同期)
          }
          if(isset(json["player_info"])){
            DECK_EDIT_PLAYER_INFO = json["player_info"];
          }
          if(isset(json["result_deck_edit_init"])){
            if(isset(json["result_deck_edit_init"]['player_card_datas'])){ //プレイヤーの所持カードを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_datas']) && json["result_deck_edit_init"]['player_card_datas'].length != 0){
                DECK_EDIT_PLAYER_CARD_DATAS = json["result_deck_edit_init"]['player_card_datas']; //プレイヤーの所持カードを設定
              }
            }
            if(isset(json["result_deck_edit_init"]['player_card_deck_preset'])){ //プレイヤーのプリセットデータを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_deck_preset']) && json["result_deck_edit_init"]['player_card_deck_preset'].length != 0){
                DECK_EDIT_PLAYER_CARD_DECK_PRESET = json["result_deck_edit_init"]['player_card_deck_preset'];
              }
            }
            if(isset(json["result_deck_edit_init"]['player_card_deck_main'])){ //プレイヤーのメインデッキデータを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_deck_main']) && json["result_deck_edit_init"]['player_card_deck_main'].length != 0){
                DECK_EDIT_PLAYER_CARD_DECK_MAIN = json["result_deck_edit_init"]['player_card_deck_main'];
              }
            }
            if(isset(json["result_deck_edit_init"]['player_card_deck_party'])){ //プレイヤーのパーティデッキデータを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_deck_party']) && json["result_deck_edit_init"]['player_card_deck_party'].length != 0){
                DECK_EDIT_PLAYER_CARD_DECK_PARTY = json["result_deck_edit_init"]['player_card_deck_party'];
              }
            }
            if(isset(json["result_deck_edit_init"]['player_card_deck_pvp'])){ //プレイヤーのPVPデッキデータを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_deck_pvp']) && json["result_deck_edit_init"]['player_card_deck_pvp'].length != 0){
                DECK_EDIT_PLAYER_CARD_DECK_PVP = json["result_deck_edit_init"]['player_card_deck_pvp'];
              }
            }
            if(isset(json["result_deck_edit_init"]['player_card_deck_pvp_party'])){ //プレイヤーのPVPパーティデッキデータを取得
              if(Array.isArray(json["result_deck_edit_init"]['player_card_deck_pvp_party']) && json["result_deck_edit_init"]['player_card_deck_pvp_party'].length != 0){
                DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY = json["result_deck_edit_init"]['player_card_deck_pvp_party'];
              }
            }
            if(isset(json["result_deck_edit_init"]['player_max_deck_num'])){ //プレイヤーの最大デッキカード組み込み枚数を取得
              DECK_EDIT_PLAYER_MAX_DECK_NUM = json["result_deck_edit_init"]['player_max_deck_num'];
              console.log("デッキ組み込み枚数");
              console.log(DECK_EDIT_PLAYER_MAX_DECK_NUM);
            }
            DECK_EDIT_SCENE_INIT_FLAG = true; //シーンの初期通信及び初期化完了
          }
          if(isset(json["result_update_preset_card_deck"])){ //プリセットデッキの変更が行われた
            if(isset(json["result_update_preset_card_deck"]['player_card_deck_preset'])){
              DECK_EDIT_PLAYER_CARD_DECK_PRESET = new Array();
              DECK_EDIT_PLAYER_CARD_DECK_PRESET.length = 0;
              DECK_EDIT_PLAYER_CARD_DECK_PRESET = json["result_update_preset_card_deck"]['player_card_deck_preset']; //プリセットデッキを更新
            }
            if(isset(json["result_update_preset_card_deck"]['check_update'])){
              var checkUpdate = json["result_update_preset_card_deck"]['check_update'];
              if(checkUpdate == true){
                console.log("プリセット変更完了");
                G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
                G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
                //編集中のデッキデータがあればリセット
                DECK_EDIT_EDIT_FLAG = false;
                DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK.length = 0;
                DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = new Array();
              }
              else{
                alert("通信エラーが発生しました。タイトルに戻ります。");
                this.exit("title");
              }
            }
          }
          if(isset(json["result_update_main_card_deck"])){
            if(isset(json["result_update_main_card_deck"]['player_card_deck_main'])){
              DECK_EDIT_PLAYER_CARD_DECK_MAIN = new Array();
              DECK_EDIT_PLAYER_CARD_DECK_MAIN.length = 0;
              DECK_EDIT_PLAYER_CARD_DECK_MAIN = json["result_update_main_card_deck"]['player_card_deck_main']; //メインデッキを更新
            }
            if(isset(json["result_update_main_card_deck"]['check_update'])){
              var checkUpdate = json["result_update_main_card_deck"]['check_update'];
              if(checkUpdate == true){
                console.log("メインデッキ変更完了");
                G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
                G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
                DECK_EDIT_EDIT_FLAG = false;
              }
              else{
                alert("通信エラーが発生しました。タイトルに戻ります。");
                this.exit("title");
              }
            }
          }
          if(isset(json["result_update_party_card_deck"])){
            if(isset(json["result_update_party_card_deck"]['player_card_deck_party'])){
              DECK_EDIT_PLAYER_CARD_DECK_PARTY = new Array();
              DECK_EDIT_PLAYER_CARD_DECK_PARTY.length = 0;
              DECK_EDIT_PLAYER_CARD_DECK_PARTY = json["result_update_party_card_deck"]['player_card_deck_party']; //メインデッキを更新
            }
            if(isset(json["result_update_party_card_deck"]['check_update'])){
              var checkUpdate = json["result_update_party_card_deck"]['check_update'];
              if(checkUpdate == true){
                console.log("パーティデッキ変更完了");
                G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
                G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
                DECK_EDIT_EDIT_FLAG = false;
              }
              else{
                alert("通信エラーが発生しました。タイトルに戻ります。");
                this.exit("title");
              }
            }
          }
          if(isset(json["result_update_pvp_card_deck"])){
            if(isset(json["result_update_pvp_card_deck"]['player_card_deck_pvp'])){
              DECK_EDIT_PLAYER_CARD_DECK_PVP = new Array();
              DECK_EDIT_PLAYER_CARD_DECK_PVP.length = 0;
              DECK_EDIT_PLAYER_CARD_DECK_PVP = json["result_update_pvp_card_deck"]['player_card_deck_pvp']; //PVPデッキを更新
            }
            if(isset(json["result_update_pvp_card_deck"]['check_update'])){
              var checkUpdate = json["result_update_pvp_card_deck"]['check_update'];
              if(checkUpdate == true){
                console.log("PVPデッキ変更完了");
                G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
                G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
                DECK_EDIT_EDIT_FLAG = false;
              }
              else{
                alert("通信エラーが発生しました。タイトルに戻ります。");
                this.exit("title");
              }
            }
          }
          if(isset(json["result_update_pvp_party_card_deck"])){
            if(isset(json["result_update_pvp_party_card_deck"]['player_card_deck_pvp_party'])){
              DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY = new Array();
              DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY.length = 0;
              DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY = json["result_update_pvp_party_card_deck"]['player_card_deck_pvp_party']; //メインデッキを更新
            }
            if(isset(json["result_update_pvp_party_card_deck"]['check_update'])){
              var checkUpdate = json["result_update_pvp_party_card_deck"]['check_update'];
              if(checkUpdate == true){
                console.log("PVPパーティデッキ変更完了");
                G_DECK_EDIT_CARD_LIST_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type']); //カードリスト表示
                G_DECK_EDIT_FOOTER_DISP(true,DECK_EDIT_FOOTER_STATUS['category_type'],0); //フッターを表示
                DECK_EDIT_EDIT_FLAG = false;
              }
              else{
                alert("通信エラーが発生しました。タイトルに戻ります。");
                this.exit("title");
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
  },
});

function G_DECK_EDIT_SWITCH_CARD_CATEGORY_WINDOW(activeFlag){ //カードカテゴリー画面の表示を切り替える
  DECK_EDIT_CARD_CATEGORY_WINDOW_ACTIVE = activeFlag;
  DECK_EDIT_HEADER['header_label'].text = "カードデッキ編成";
  for (var i = 0; i < DECK_EDIT_DECK_CATEGORY_BUTTONS.length; i++) {
    DECK_EDIT_DECK_CATEGORY_BUTTONS[i].visible = activeFlag;
  }
  DECK_EDIT_BACK_BTN.visible = activeFlag;
}

function G_DECK_EDIT_CARD_LIST_CREATE(categoryId = -1,optionId = -1,optionSubId = -1){ //カードリストを生成する
  var updatePosY = 0;
  var initPosX = 0;
  var listObjHeightSize = 0;
  var incrementCount = 0;
  var incrementMaxCount = 2; //列の最大数
  var oneLineFlag = false;
  var cardSelectFlag = false;
  //プリセット編集中の場合
  if(DECK_EDIT_CARD_LIST_STATUS['category_id'] == 0 && DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] == 1){
    oneLineFlag = true; //1行表示有効
  }
  //カード選択の場合
  if(DECK_EDIT_CARD_LIST_STATUS['category_id'] == 0 && DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] == 2){
    cardSelectFlag = true; //ソートボタン表示機能を有効
  }
  DECK_EDIT_CARD_LIST_OBJ.y = DECK_EDIT_CARD_LIST_OBJ_Y_POS_INIT; //y座標を初期化
  //ソートカテゴリーを初期化
  if(isset(DECK_EDIT_SORT_BUTTONS['buttons'])){
    if(DECK_EDIT_SORT_BUTTONS['buttons'] != null){
      for (var i = 0; i < DECK_EDIT_SORT_BUTTONS['buttons'].length; i++) {
        DECK_EDIT_SORT_BUTTONS['buttons'][i].remove();
      }
      DECK_EDIT_SORT_BUTTONS['buttons'].length = 0;
    }
  }
  //ソートカテゴリーを表示
  if(cardSelectFlag == true){
    console.log("カテゴリー表示");
    G_DECK_EDIT_SORT_BUTTONS_CREATE(DECK_EDIT_SORT_BUTTONS);
  }
  //リスト初期化
  for (var d = 0; d < DECK_EDIT_CARD_LIST_SPRITE.length; d++) {
    if(DECK_EDIT_CARD_LIST_SPRITE[d] != null) DECK_EDIT_CARD_LIST_SPRITE[d].remove();
  }
  //リストセルを生成
  for (var i = 0; i < DECK_EDIT_CARD_LIST_DATAS.length; i++) {
    var newCreateFlag = false;
    var cardMasterData = -1;
    var deckData = null;
    var cardData = null;
    var cardName = "";
    var deckName = "";
    var carrMasterIds = null;
    var setOptionId = -1;
    if(optionId == -1 && optionSubId == -1) { //デッキリスト
      deckData = DECK_EDIT_CARD_LIST_DATAS[i];
      switch (categoryId) {
        case 0: //プリセットデッキリスト
        setOptionId = deckData['preset_card_deck_id'];
        break;
        case 1: //メインデッキリスト
        setOptionId = deckData['deck_number'];
        break;
        case 2: //パーティデッキリスト
        setOptionId = deckData['deck_number'];
        break;
        case 3: //PVPデッキリスト
        setOptionId = deckData['deck_number'];
        break;
        case 4: //PVPパーティデッキリスト
        setOptionId = deckData['deck_number'];
        break;
        default:
        break;
      }
      deckName = deckData['deck_name'];
      carrMasterIds = deckData['card_deck'].split(',');
      if(carrMasterIds[0] == -1) newCreateFlag = true; //新規作成のカードだった
      if(newCreateFlag == false){ //通常
        for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
          if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == carrMasterIds[0]){
            cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
            break;
          }
        }
      }
      else{ //新規作成の場合
        deckName = "++新規作成++";
        cardMasterData = 182; //新規作成用カード画像
      }
    }
    else{ //デッキ以外のリストを表示
      switch (categoryId) {
        case 0: //プリセット => プリセット作成用カードデッキ編成リスト
        {
          if(optionSubId == -1 || optionSubId == 1){
            cardData = DECK_EDIT_CARD_LIST_DATAS[i];
            setOptionId = cardData; //カードマスターIDを取得
            if(cardData == -1){ //未設定カード
              cardMasterData = 182; //新規作成用カード画像
              cardName = "未設定";
            }
            else{ //通常カード
              for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
                if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == cardData){
                  cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
                  cardName = DECK_EDIT_PLAYER_CARD_DATAS[pc]['card_name'];
                  break;
                }
              }
            }
          }
          else{ //プレイヤーの所持しているカードリスト
            cardData = DECK_EDIT_CARD_LIST_DATAS[i];
            cardName = cardData['card_name'];
            setOptionId = cardData['id']; //カードマスターIDを取得
            cardMasterData = cardData;
          }
        }
        break;
        case 1: //メインデッキ
        {
          if(optionSubId == 1){ //変更するメインデッキのプリセットを選択
            deckData = DECK_EDIT_CARD_LIST_DATAS[i];
            deckName = deckData['deck_name'];
            carrMasterIds = deckData['card_deck'].split(',');
            setOptionId = deckData['preset_card_deck_id'];
            for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
              if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == carrMasterIds[0]){
                cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
              }
            }
          }
        }
        break;
        case 2: //パーティデッキ
        {
          if(optionSubId == 1){ //変更するパーティデッキのプリセットを選択
            deckData = DECK_EDIT_CARD_LIST_DATAS[i];
            deckName = deckData['deck_name'];
            carrMasterIds = deckData['card_deck'].split(',');
            setOptionId = deckData['preset_card_deck_id'];
            for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
              if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == carrMasterIds[0]){
                cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
              }
            }
          }
        }
        break;
        case 3: //PVPデッキ
        {
          if(optionSubId == 1){ //変更するPVPデッキのプリセットを選択
            deckData = DECK_EDIT_CARD_LIST_DATAS[i];
            deckName = deckData['deck_name'];
            carrMasterIds = deckData['card_deck'].split(',');
            setOptionId = deckData['preset_card_deck_id'];
            for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
              if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == carrMasterIds[0]){
                cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
              }
            }
          }
        }
        break;
        case 4: //PVPパーティデッキ
        {
          if(optionSubId == 1){ //変更するPVPパーティデッキのプリセットを選択
            deckData = DECK_EDIT_CARD_LIST_DATAS[i];
            deckName = deckData['deck_name'];
            carrMasterIds = deckData['card_deck'].split(',');
            setOptionId = deckData['preset_card_deck_id'];
            for (var pc = 0; pc < DECK_EDIT_PLAYER_CARD_DATAS.length; pc++) {
              if(DECK_EDIT_PLAYER_CARD_DATAS[pc]['id'] == carrMasterIds[0]){
                cardMasterData = DECK_EDIT_PLAYER_CARD_DATAS[pc];
              }
            }
          }
        }
        break;
        default:
        break;
      }
    }
    //セル本体スプライト
    console.log("アセットID");
    console.log(cardMasterData);
    if(cardMasterData == 182){ //新規作成
      DECK_EDIT_CARD_LIST_SPRITE[i] = Sprite('ASSET_' + cardMasterData).addChildTo(DECK_EDIT_CARD_LIST_OBJ);
    }
    else{
      DECK_EDIT_CARD_LIST_SPRITE[i] = G_CARD_DISP(cardMasterData);
      DECK_EDIT_CARD_LIST_SPRITE[i].addChildTo(DECK_EDIT_CARD_LIST_OBJ);
    }
    DECK_EDIT_CARD_LIST_SPRITE[i].width = (DECK_EDIT_CARD_LIST_SPRITE[i].width * 0.2);
    DECK_EDIT_CARD_LIST_SPRITE[i].height = (DECK_EDIT_CARD_LIST_SPRITE[i].height * 0.2);
    G_CARD_SET_SIZE(DECK_EDIT_CARD_LIST_SPRITE[i],0.2); //サイズを調整
    DECK_EDIT_CARD_LIST_SPRITE[i]['number'] = Label({
      text: i,
      fontSize: 64,
      fill: 'white',
    }).addChildTo(DECK_EDIT_CARD_LIST_SPRITE[i]);
    //セル上部のラベル
    DECK_EDIT_CARD_LIST_SPRITE[i]['top_label'] = Label({
     text: '',
     fontSize: 18,
     fill: 'white',
    }).addChildTo(DECK_EDIT_CARD_LIST_SPRITE[i]);
    DECK_EDIT_CARD_LIST_SPRITE[i]['top_label'].y = DECK_EDIT_CARD_LIST_SPRITE[i]['top_label'].y - (DECK_EDIT_CARD_LIST_SPRITE[i].height / 1.8);
    if(cardName != ""){ //カード名が設定されていた場合
      DECK_EDIT_CARD_LIST_SPRITE[i]['top_label'].text = cardName;
    }
    else if(deckName != ""){ //デッキ名が設定されていた場合
      DECK_EDIT_CARD_LIST_SPRITE[i]['top_label'].text = deckName;
    }
    //セル左のラベル
    DECK_EDIT_CARD_LIST_SPRITE[i]['left_label'] = Label({
     text: '',
     fontSize: 24,
     fill: 'white',
    }).addChildTo(DECK_EDIT_CARD_LIST_SPRITE[i]);
    DECK_EDIT_CARD_LIST_SPRITE[i]['left_label'].x = DECK_EDIT_CARD_LIST_SPRITE[i]['left_label'].x - (DECK_EDIT_CARD_LIST_SPRITE[i].width * 1.5);
    if(oneLineFlag == true){
      DECK_EDIT_CARD_LIST_SPRITE[i]['left_label'].text = "スロット" + (i + 1);
    }
    //セルボタン
    DECK_EDIT_CARD_LIST_SPRITE[i]['button'] = Button({
      width: DECK_EDIT_CARD_LIST_SPRITE[i].width,         // 横サイズ
      height: DECK_EDIT_CARD_LIST_SPRITE[i].height,        // 縦サイズ
    }).addChildTo(DECK_EDIT_CARD_LIST_SPRITE[i]);
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['new_create_flag'] = newCreateFlag;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['option_sub_id'] = optionSubId;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['category_id'] = categoryId;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['set_option_id'] = setOptionId;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['card_master_data'] = cardMasterData;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button']['index'] = i;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button'].visible = false;
    DECK_EDIT_CARD_LIST_SPRITE[i]['button'].onpointstart = function(e){
      DECK_EDIT_CARD_LIST_TOUCH_START_POS_X = e.pointer.x;
      DECK_EDIT_CARD_LIST_TOUCH_START_POS_Y = e.pointer.y;
      DECK_EDIT_LIST_CELL_BTN_HOLD = 0;
    };
    //長押し判定
    DECK_EDIT_CARD_LIST_SPRITE[i]['button'].onpointstay = function(e){
      if(DECK_EDIT_CARD_LIST_STATUS['category_id'] == 0 && DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] == 2){
        if(DECK_EDIT_LIST_CELL_BTN_HOLD == -1) return;
        if(DECK_EDIT_LIST_CELL_BTN_HOLD > 10){
          DECK_EDIT_LIST_CELL_BTN_HOLD = -1;
          if(e.pointer.x != DECK_EDIT_CARD_LIST_TOUCH_START_POS_X || e.pointer.y != DECK_EDIT_CARD_LIST_TOUCH_START_POS_Y) return;
          //長押し完了
          console.log("長押し確認");
          if(CARD_INFO_WINDOW == null){
            G_CARD_INFO_WINDOW_DISP(DECK_EDIT_UI_LAYER,this['card_master_data']);
            console.log("詳細表示");
          }
        }
        else{
          DECK_EDIT_LIST_CELL_BTN_HOLD ++;
        }
      }
    };
    DECK_EDIT_CARD_LIST_SPRITE[i]['button'].onpointend = function(e){
      DECK_EDIT_LIST_CELL_BTN_HOLD = -1;
      if(DECK_EDIT_CARD_LIST_OBJ.visible == false) return;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(DECK_EDIT_FOOTER['button_left']['button'].hitTest(e.pointer.x,e.pointer.y)) return;
      if(DECK_EDIT_FOOTER['button_center']['button'].hitTest(e.pointer.x,e.pointer.y)) return;
      if(DECK_EDIT_FOOTER['button_right']['button'].hitTest(e.pointer.x,e.pointer.y)) return;
      if(!this.hitTest(DECK_EDIT_CARD_LIST_TOUCH_START_POS_X,DECK_EDIT_CARD_LIST_TOUCH_START_POS_Y)) return;
      if(DECK_EDIT_SCENE_INIT_FLAG == false) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && SHORT_MENU_WINDOW == null && CARD_INFO_WINDOW == null){
        switch (this['category_id']) {
          case 0: //プリセット
          {
            if(isset(DECK_EDIT_SORT_BUTTONS['buttons']) && Array.isArray(DECK_EDIT_SORT_BUTTONS['buttons'])){ //ソートボタンが表示されていた場合
              for (var b = 0; b < DECK_EDIT_SORT_BUTTONS['buttons'].length; b++) { //ソートボタンと重なっていた場合無効
                if(DECK_EDIT_SORT_BUTTONS['buttons'][b]['button'].hitTest(e.pointer.x,e.pointer.y)) return;
              }
            }
            if(this['option_sub_id'] == -1){ //編集するプリセットを選択
              DECK_EDIT_SET_LIST_TARGET_ID = this['set_option_id'];
              if(DECK_EDIT_SET_LIST_TARGET_ID == -1){ //新規に作成するプリセットだった場合
                var newPresetDeck = new Array(); //新規作成用のプリセットを追加
                newPresetDeck['preset_card_deck_id'] = -1;
                newPresetDeck['deck_name'] = "新規プリセット" + this['index'];
                newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
                newPresetDeck['card_deck'] = "-1";
                for (var j = 0; j < (DECK_EDIT_PLAYER_MAX_DECK_NUM - 1); j++) {
                  newPresetDeck['card_deck'] = newPresetDeck['card_deck'] + ",-1"; //最大デッキ枚数分カード情報をセット
                }
                DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = newPresetDeck;
              }
              else{ //既存のプリセットを編集する場合
                if(isset(DECK_EDIT_CARD_LIST_DATAS[this['index']])){
                  DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK = DECK_EDIT_CARD_LIST_DATAS[this['index']];
                }
                else{
                  console.log("該当するデッキが見つかりませんでした。");
                }
              }
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],1);
            }
            else if(this['option_sub_id'] == 1){ //プリセットデッキに選択するカードを選択するリストを表示
              DECK_EDIT_SET_LIST_INDEX = this['index']; //選択したindexを保存
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],2);
            }
            else if(this['option_sub_id'] == 2){ //プリセットに設定するカードを決定
              DECK_EDIT_EDIT_FLAG = true; //編集状態を有効にする
              var selectPresetDeckId = DECK_EDIT_SET_LIST_TARGET_ID; //設定するプリセットデッキID (-1)は新規
              var selectPresetDeckIndex = DECK_EDIT_SET_LIST_INDEX; //カード変更を行うデッキ中身のスロット番号
              var selectPresetDeckCardId = this['set_option_id']; //選択したカードIDを保存
              console.log(selectPresetDeckId);
              console.log(selectPresetDeckIndex);
              console.log(selectPresetDeckCardId);
              console.log("カードを設定");
              //編集選択中のデッキの中身を変更
              if(isset(DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'])){
                console.log("入れ替え前");
                console.log(DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck']);
                var cardDeckCardIds = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'].split(',');
                for (var pc = 0; pc < DECK_EDIT_PLAYER_MAX_DECK_NUM; pc++) {
                  if(!isset(cardDeckCardIds[pc])){
                    cardDeckCardIds[pc] = -1; //最大枚数分の情報が不足していた場合
                  }
                }
                if(isset(cardDeckCardIds[selectPresetDeckIndex])){
                  cardDeckCardIds[selectPresetDeckIndex] = selectPresetDeckCardId; //カードIDを変更
                  DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'] = cardDeckCardIds.join();//元の形式に戻す
                  console.log("入れ替え後");
                  console.log(DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck']);
                  G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],selectPresetDeckId,1);
                  G_DECK_EDIT_FOOTER_DISP(true,this['category_id'],1); //フッターとボタンを表示(変更決定とキャンセルボタン)
                }
                else{
                  console.log("選択されたカードIndexがデッキに存在しません。");
                }
              }
            }
          }
          break;
          case 1: //メインデッキ
          {
            if(this['option_sub_id'] == -1){ //変更するメインデッキを選択
              DECK_EDIT_SET_LIST_TARGET_ID = this['set_option_id'];
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],1); //プリセットリストを表示
            }
            else if(this['option_sub_id'] == 1){ //変更するプリセットデッキを選択
              //メインデッキ変更通信処理を開始
              var changePresetDeckData = null;
              for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
                if(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['preset_card_deck_id'] == this['set_option_id']){ //変更に該当するプリセットデッキデータ
                  changePresetDeckData = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
                  break;
                }
              }
              if(changePresetDeckData != null){
                var postParam = new Object();
                postParam['main_card_deck_update'] = new Object;
                postParam['main_card_deck_update']['deck_number'] = DECK_EDIT_SET_LIST_TARGET_ID;
                postParam['main_card_deck_update']['deck_name'] = changePresetDeckData['deck_name'];
                postParam['main_card_deck_update']['card_deck'] = changePresetDeckData['card_deck'];
                console.log(postParam);
                ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
              }
              else{
                console.log("選択されたプリセットデッキが存在しません。");
              }
            }
          }
          break;
          case 2: //パーティデッキ
          {
            if(this['option_sub_id'] == -1){ //変更するパーティデッキを選択
              DECK_EDIT_SET_LIST_TARGET_ID = this['set_option_id'];
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],1); //プリセットリストを表示
            }
            else if(this['option_sub_id'] == 1){ //変更するプリセットデッキを選択
              //パーティデッキ変更通信処理を開始
              var changePresetDeckData = null;
              for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
                if(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['preset_card_deck_id'] == this['set_option_id']){ //変更に該当するプリセットデッキデータ
                  changePresetDeckData = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
                  break;
                }
              }
              if(changePresetDeckData != null){
                var postParam = new Object();
                postParam['party_card_deck_update'] = new Object;
                postParam['party_card_deck_update']['deck_number'] = DECK_EDIT_SET_LIST_TARGET_ID;
                postParam['party_card_deck_update']['deck_name'] = changePresetDeckData['deck_name'];
                postParam['party_card_deck_update']['card_deck'] = changePresetDeckData['card_deck'];
                console.log(postParam);
                ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
              }
              else{
                console.log("選択されたプリセットデッキが存在しません。");
              }
            }
          }
          break;
          case 3: //PVPデッキ
          {
            if(this['option_sub_id'] == -1){ //変更するPVPデッキを選択
              DECK_EDIT_SET_LIST_TARGET_ID = this['set_option_id'];
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],1); //プリセットリストを表示
            }
            else if(this['option_sub_id'] == 1){ //変更するプリセットデッキを選択
              //PVPデッキ変更通信処理を開始
              var changePresetDeckData = null;
              for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
                if(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['preset_card_deck_id'] == this['set_option_id']){ //変更に該当するプリセットデッキデータ
                  changePresetDeckData = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
                  break;
                }
              }
              if(changePresetDeckData != null){
                var postParam = new Object();
                postParam['pvp_card_deck_update'] = new Object;
                postParam['pvp_card_deck_update']['deck_number'] = DECK_EDIT_SET_LIST_TARGET_ID;
                postParam['pvp_card_deck_update']['deck_name'] = changePresetDeckData['deck_name'];
                postParam['pvp_card_deck_update']['card_deck'] = changePresetDeckData['card_deck'];
                console.log(postParam);
                ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
              }
              else{
                console.log("選択されたプリセットデッキが存在しません。");
              }
            }
          }
          break;
          case 4: //PVPパーティデッキ
          {
            if(this['option_sub_id'] == -1){ //変更するPVPパーティデッキを選択
              DECK_EDIT_SET_LIST_TARGET_ID = this['set_option_id'];
              G_DECK_EDIT_CARD_LIST_DISP(true,this['category_id'],this['set_option_id'],1); //プリセットリストを表示
            }
            else if(this['option_sub_id'] == 1){ //変更するプリセットデッキを選択
              //PVPパーティデッキ変更通信処理を開始
              var changePresetDeckData = null;
              for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
                if(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['preset_card_deck_id'] == this['set_option_id']){ //変更に該当するプリセットデッキデータ
                  changePresetDeckData = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
                  break;
                }
              }
              if(changePresetDeckData != null){
                var postParam = new Object();
                postParam['pvp_party_card_deck_update'] = new Object;
                postParam['pvp_party_card_deck_update']['deck_number'] = DECK_EDIT_SET_LIST_TARGET_ID;
                postParam['pvp_party_card_deck_update']['deck_name'] = changePresetDeckData['deck_name'];
                postParam['pvp_party_card_deck_update']['card_deck'] = changePresetDeckData['card_deck'];
                console.log(postParam);
                ajaxStart("post","json","../../client/deckEdit/deckEdit.php",postParam); //非同期通信開始
              }
              else{
                console.log("選択されたプリセットデッキが存在しません。");
              }
            }
          }
          break;
          default:
          break;
        }
      }
    };
    //リストスワイプ処理
    //Y座標を調整
    if(i== 0){
      DECK_EDIT_CARD_LIST_SPRITE[i].y = (DECK_EDIT_CARD_LIST_SPRITE[i].y - (SCREEN_HEIGHT / 2)) + ((DECK_EDIT_CARD_LIST_SPRITE[i].height / 2) + (DECK_EDIT_HEADER.height * 2));
      if(cardSelectFlag == true) DECK_EDIT_CARD_LIST_SPRITE[i].y = DECK_EDIT_CARD_LIST_SPRITE[i].y + DECK_EDIT_HEADER.height;
      updatePosY = DECK_EDIT_CARD_LIST_SPRITE[i].y;
      initPosX = DECK_EDIT_CARD_LIST_SPRITE[i].x - ((SCREEN_WIDTH / 2) - (DECK_EDIT_CARD_LIST_SPRITE[i].width / 1.1));
      DECK_EDIT_LIST_MAX_POS_Y = updatePosY;
    }
    else if(incrementMaxCount < incrementCount || oneLineFlag == true){ //改行を行う
      updatePosY = updatePosY + (DECK_EDIT_CARD_LIST_SPRITE[i].height * 1.25);
      listObjHeightSize = listObjHeightSize + (DECK_EDIT_CARD_LIST_SPRITE[i].height * 1.25);
      incrementCount = 0;
    }
    DECK_EDIT_CARD_LIST_SPRITE[i].y = updatePosY;
    DECK_EDIT_LIST_MAX_POS_Y = updatePosY;
    //X座標を調整
    DECK_EDIT_CARD_LIST_SPRITE[i].x = initPosX;
    if(incrementCount == 1 || oneLineFlag == true) DECK_EDIT_CARD_LIST_SPRITE[i].x = DECK_EDIT_CARD_LIST_SPRITE[i].x + (DECK_EDIT_CARD_LIST_SPRITE[i].width * 1.5);
    if(incrementCount == 2) {
      DECK_EDIT_CARD_LIST_SPRITE[i].x = DECK_EDIT_CARD_LIST_SPRITE[i].x + (DECK_EDIT_CARD_LIST_SPRITE[i].width * 1.5);
      DECK_EDIT_CARD_LIST_SPRITE[i].x = DECK_EDIT_CARD_LIST_SPRITE[i].x + (DECK_EDIT_CARD_LIST_SPRITE[i].width * 1.5);
    }
    incrementCount ++;
  }
  if(DECK_EDIT_CARD_LIST_SPRITE.length != 0){ //配列の要素が存在した場合
    //PARTY_LIST_OBJ.height = listObjHeightSize; //リストの最大サイズを取得
    DECK_EDIT_CARD_LIST_HOME_POS_Y = DECK_EDIT_CARD_LIST_OBJ.y; //初期座標を更新
    var listTopPos = (SCREEN_HEIGHT / 2) + (DECK_EDIT_HEADER.height * 2); //リストの頂点を取得;
    DECK_EDIT_CARD_LIST_TOUCH_AREA.update = function() {
      DECK_EDIT_CARD_LIST_TOUCH_AREA.onpointstart = function(e){
        DECK_EDIT_CARD_LIST_SCROLLE_START = e.pointer.y;
      };
      DECK_EDIT_CARD_LIST_TOUCH_AREA.onpointmove = function(e){
        DECK_EDIT_CARD_LIST_SCROLLE_MOVE = e.pointer.y;
        if(DECK_EDIT_CARD_LIST_SCROLLE_START < DECK_EDIT_CARD_LIST_SCROLLE_MOVE){//下
          DECK_EDIT_CARD_LIST_OBJ.y += e.pointer.dy;
          if(DECK_EDIT_CARD_LIST_HOME_POS_Y < DECK_EDIT_CARD_LIST_OBJ.y) DECK_EDIT_CARD_LIST_OBJ.y = DECK_EDIT_CARD_LIST_HOME_POS_Y;
        }
        if(DECK_EDIT_CARD_LIST_SCROLLE_START > DECK_EDIT_CARD_LIST_SCROLLE_MOVE){//上
          var nowYPos = DECK_EDIT_CARD_LIST_OBJ.y;
          DECK_EDIT_CARD_LIST_OBJ.y += e.pointer.dy;
          var lastCellPosY = 0;
          lastCellPosY = DECK_EDIT_CARD_LIST_OBJ.y + (DECK_EDIT_LIST_MAX_POS_Y + 128); //最後のセルのポジションを取得
          var swipeMaxAreaPosY = SCREEN_HEIGHT - (DECK_EDIT_CARD_LIST_SPRITE[DECK_EDIT_CARD_LIST_SPRITE.length - 1].height / 2);
          if(swipeMaxAreaPosY > lastCellPosY) DECK_EDIT_CARD_LIST_OBJ.y = nowYPos;//最大にスワイプできる領域を超えた
        }
      };
      DECK_EDIT_CARD_LIST_TOUCH_AREA.onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        DECK_EDIT_CARD_LIST_SCROLLE_START = 0;
        DECK_EDIT_CARD_LIST_SCROLLE_MOVE = 0;
      };
    }
  }
}

function G_DECK_EDIT_CARD_LIST_DISP(activeFlag,categoryId = -1,optionId = -1,optionSubId = -1){ //カードリストの表示を切り替える
  DECK_EDIT_CARD_LIST_OBJ.visible = activeFlag;
  DECK_EDIT_CARD_LIST_STATUS['category_id'] = categoryId;
  DECK_EDIT_CARD_LIST_STATUS['option_id'] = optionId;
  DECK_EDIT_CARD_LIST_STATUS['option_sub_id'] = optionSubId;

  if(activeFlag == true && categoryId != -1){ //カテゴリーIDが設定されていた場合
    if(DECK_EDIT_CARD_LIST_DATAS.length != 0) {
      DECK_EDIT_CARD_LIST_DATAS.length = 0;
    }
    switch (categoryId) {
      case 0: //プリセット
      {
        if(optionId == -1 && optionSubId == -1){ //プリセット選択
          DECK_EDIT_HEADER['header_label'].text = "プリセット一覧";
          var newPresetDeck = new Array(); //新規作成用のプリセットを追加
          newPresetDeck['preset_card_deck_id'] = -1;
          newPresetDeck['deck_name'] = "";
          newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
          newPresetDeck['card_deck'] = "-1";
          for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
            var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
            DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
          }
          if(DECK_EDIT_CARD_LIST_DATAS.length <= 99) DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = newPresetDeck;
          G_DECK_EDIT_CARD_LIST_CREATE(categoryId);
          G_DECK_EDIT_FOOTER_DISP(true,categoryId,0); //フッターとボタンを表示(戻るボタンだけ表示)
        }
        else{ //プリセット作成 optionIdはプリセットID
          if(optionSubId == 1){ //プリセット編集
            var newPresetFlag = true; //新規に作成するカードか
            if(DECK_EDIT_EDIT_FLAG == false){ //編集が既に行われているか
              for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
                if(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['preset_card_deck_id'] == optionId){
                  DECK_EDIT_HEADER['header_label'].text = DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['deck_name'];
                  newPresetFlag = false;
                  var cardMasterIds = DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]['card_deck'].split(',');
                  console.log("挿入前");
                  console.log(DECK_EDIT_CARD_LIST_DATAS);
                  for (var j = 0; j < DECK_EDIT_PLAYER_MAX_DECK_NUM; j++) { //最大デッキ枚数分カード情報をセット
                    var addCardMasterId = -1;
                    if(!isset(cardMasterIds[j])) addCardMasterId = -1;//未設定カードを作成
                    else addCardMasterId = parseInt(cardMasterIds[j]);//通常
                    DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = addCardMasterId;
                  }
                  console.log("挿入後");
                  console.log(DECK_EDIT_CARD_LIST_DATAS);
                  G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
                  break;
                }
              }
            }
            else{ //既に編集が行われていた
              console.log("デッキ作成リスト再表示");
              DECK_EDIT_HEADER['header_label'].text = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['deck_name'];
              newPresetFlag = false;
              var cardMasterIds = DECK_EDIT_PLAYER_CARD_EDIT_PRESET_DECK['card_deck'].split(',');
              for (var i = 0; i < DECK_EDIT_PLAYER_MAX_DECK_NUM; i++) { //最大デッキ枚数分カード情報をセット
                var addCardMasterId = -1;
                if(!isset(cardMasterIds[i])) addCardMasterId = -1;//未設定カードを作成
                else addCardMasterId = parseInt(cardMasterIds[i]);//通常
                DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = addCardMasterId;
              }
              G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
            }
            //登録中のプリセットが見つからなかった場合
            if(newPresetFlag == true){
              for (var j = 0; j < DECK_EDIT_PLAYER_MAX_DECK_NUM; j++) { //最大デッキ枚数分カード情報をセット
                DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = -1;
              }
              G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
              G_DECK_EDIT_FOOTER_DISP(true,categoryId,1); //フッターとボタンを表示(変更決定とキャンセルボタン)
            }
          }
          else if(optionSubId == 2){ //プリセットにセットするカードを選択するリスト
            DECK_EDIT_HEADER['header_label'].text = "カードを選択";
            for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DATAS.length; i++) {
              var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DATAS[i]));
              //カテゴリー選別
              switch (DECK_EDIT_SELECT_CARD_CATEGORY_ID) {
                case 0: //カテゴリー0(全表示)
                {
                  DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
                }
                break;
                case 1: //カテゴリー1(スキル)
                {
                  if(arrayCopy['card_category_id'] == 1) DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
                }
                break;
                case 2: //カテゴリー2(英雄)
                {
                  if(arrayCopy['card_category_id'] == 2) DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
                }
                break;
                case 3: //カテゴリー3
                break;
                case 4: //カテゴリー4
                break;
                case 5: //カテゴリー5
                break;
                default: //全表示
                DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
                break;
              }
            }
            G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
          }
        }
      }
      break;
      case 1: //メインデッキ
      {
        if(optionId == -1 && optionSubId == -1){ //メインデッキ一覧表示
          DECK_EDIT_HEADER['header_label'].text = "メインデッキ一覧";
          var newPresetDeck = new Array(); //新規作成用のプリセットを追加
          newPresetDeck['deck_number'] = (DECK_EDIT_PLAYER_CARD_DECK_MAIN.length + 1);
          newPresetDeck['deck_name'] = "メインデッキ" + newPresetDeck['deck_number'];
          newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
          newPresetDeck['card_deck'] = "-1";
          for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_MAIN.length; i++) {
            var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_MAIN[i]));
            DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
          }
          if(DECK_EDIT_CARD_LIST_DATAS.length <= 9) DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = newPresetDeck;
          G_DECK_EDIT_CARD_LIST_CREATE(categoryId);
          G_DECK_EDIT_FOOTER_DISP(true,categoryId,0); //フッターとボタンを表示(戻るボタンだけ表示)
        }
        else{
          if(optionSubId == 1){ //メインデッキを変更するプリセットを選択
            DECK_EDIT_HEADER['header_label'].text = "メインデッキにするプリセットを選択";
            for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
              var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
              DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
            }
            G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
          }
        }
      }
      break;
      case 2: //パーティデッキ
      {
        if(optionId == -1 && optionSubId == -1){ //パーティデッキ一覧表示
          DECK_EDIT_HEADER['header_label'].text = "パーティデッキ一覧";
          var newPresetDeck = new Array(); //新規作成用のプリセットを追加
          newPresetDeck['deck_number'] = (DECK_EDIT_PLAYER_CARD_DECK_PARTY.length + 1);
          newPresetDeck['deck_name'] = "パーティデッキ" + newPresetDeck['deck_number'];
          newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
          newPresetDeck['card_deck'] = "-1";
          for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PARTY.length; i++) {
            var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PARTY[i]));
            DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
          }
          if(DECK_EDIT_CARD_LIST_DATAS.length <= 9) DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = newPresetDeck;
          G_DECK_EDIT_CARD_LIST_CREATE(categoryId);
          G_DECK_EDIT_FOOTER_DISP(true,categoryId,0); //フッターとボタンを表示(戻るボタンだけ表示)
        }
        else{
          if(optionSubId == 1){ //パーティデッキを変更するプリセットを選択
            DECK_EDIT_HEADER['header_label'].text = "パーティデッキにするプリセットを選択";
            for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
              var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
              DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
            }
            G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
          }
        }
      }
      break;
      case 3: //PVPデッキ
      {
        if(optionId == -1 && optionSubId == -1){ //PVPデッキ一覧表示
          DECK_EDIT_HEADER['header_label'].text = "PVPデッキ一覧";
          var newPresetDeck = new Array(); //新規作成用のプリセットを追加
          newPresetDeck['deck_number'] = (DECK_EDIT_PLAYER_CARD_DECK_PVP.length + 1);
          newPresetDeck['deck_name'] = "PVPデッキ" + newPresetDeck['deck_number'];
          newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
          newPresetDeck['card_deck'] = "-1";
          for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PVP.length; i++) {
            var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PVP[i]));
            DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
          }
          if(DECK_EDIT_CARD_LIST_DATAS.length <= 0) DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = newPresetDeck;
          G_DECK_EDIT_CARD_LIST_CREATE(categoryId);
          G_DECK_EDIT_FOOTER_DISP(true,categoryId,0); //フッターとボタンを表示(戻るボタンだけ表示)
        }
        else{
          if(optionSubId == 1){ //PVPデッキを変更するプリセットを選択
            DECK_EDIT_HEADER['header_label'].text = "PVPデッキにするプリセットを選択";
            for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
              var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
              DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
            }
            G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
          }
        }
      }
      break;
      case 4: //PVPパーティ
      {
        if(optionId == -1 && optionSubId == -1){ //PVPパーティデッキ一覧表示
          DECK_EDIT_HEADER['header_label'].text = "PVPパーティデッキ一覧";
          var newPresetDeck = new Array(); //新規作成用のプリセットを追加
          newPresetDeck['deck_number'] = (DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY.length + 1);
          newPresetDeck['deck_name'] = "PVPパーティデッキ" + newPresetDeck['deck_number'];
          newPresetDeck['player_index_id'] = DECK_EDIT_PLAYER_INFO['player_index_id'];
          newPresetDeck['card_deck'] = "-1";
          for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY.length; i++) {
            var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PVP_PARTY[i]));
            DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
          }
          if(DECK_EDIT_CARD_LIST_DATAS.length <= 0) DECK_EDIT_CARD_LIST_DATAS[DECK_EDIT_CARD_LIST_DATAS.length] = newPresetDeck;
          G_DECK_EDIT_CARD_LIST_CREATE(categoryId);
          G_DECK_EDIT_FOOTER_DISP(true,categoryId,0); //フッターとボタンを表示(戻るボタンだけ表示)
        }
        else{
          if(optionSubId == 1){ //PVPパーティデッキを変更するプリセットを選択
            DECK_EDIT_HEADER['header_label'].text = "PVPパーティデッキにするプリセットを選択";
            for (var i = 0; i < DECK_EDIT_PLAYER_CARD_DECK_PRESET.length; i++) {
              var arrayCopy = JSON.parse(JSON.stringify(DECK_EDIT_PLAYER_CARD_DECK_PRESET[i]));
              DECK_EDIT_CARD_LIST_DATAS.push(arrayCopy);
            }
            G_DECK_EDIT_CARD_LIST_CREATE(categoryId,optionId,optionSubId);
          }
        }
      }
      break;
      default:
      break;
    }
  }
}

function G_DECK_EDIT_FOOTER_DISP(activeFlag,categoryType = -1,optionType = 0){ //フッターの表示形式選択か、非表示を行う
  DECK_EDIT_FOOTER.visible = activeFlag;
  if(activeFlag == false) return;
  //フッターのステータスを記録
  DECK_EDIT_FOOTER_STATUS['category_type'] = categoryType;
  DECK_EDIT_FOOTER_STATUS['option_type'] = optionType;
  switch (categoryType) {
    case 0: //プリセット
    {
      switch (optionType) {
        case 0:
        {
          DECK_EDIT_FOOTER['button_left'].visible = false;
          DECK_EDIT_FOOTER['button_left']['button'].visible = false;
          DECK_EDIT_FOOTER['button_right'].visible = false;
          DECK_EDIT_FOOTER['button_right']['button'].visible = false;
          DECK_EDIT_FOOTER['button_center'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button_label'].text = "戻る";
        }
        break;
        case 1:
        {
          DECK_EDIT_FOOTER['button_center'].visible = false;
          DECK_EDIT_FOOTER['button_center']['button'].visible = false;
          DECK_EDIT_FOOTER['button_left'].visible = true;
          DECK_EDIT_FOOTER['button_left']['button'].visible = true;
          DECK_EDIT_FOOTER['button_right'].visible = true;
          DECK_EDIT_FOOTER['button_right']['button'].visible = true;
          DECK_EDIT_FOOTER['button_left']['button_label'].text = "変更の決定";
          DECK_EDIT_FOOTER['button_right']['button_label'].text = "キャンセル";
        }
        break;
        default:
        break;
      }
    }
    break;
    case 1: //メインデッキ
    {
      switch (optionType) {
        case 0:
        {
          DECK_EDIT_FOOTER['button_left'].visible = false;
          DECK_EDIT_FOOTER['button_left']['button'].visible = false;
          DECK_EDIT_FOOTER['button_right'].visible = false;
          DECK_EDIT_FOOTER['button_right']['button'].visible = false;
          DECK_EDIT_FOOTER['button_center'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button_label'].text = "戻る";
        }
        break;
        case 1:
        break;
        default:
        break;
      }
    }
    break;
    case 2: //パーティデッキ
    {
      switch (optionType) {
        case 0:
        {
          DECK_EDIT_FOOTER['button_left'].visible = false;
          DECK_EDIT_FOOTER['button_left']['button'].visible = false;
          DECK_EDIT_FOOTER['button_right'].visible = false;
          DECK_EDIT_FOOTER['button_right']['button'].visible = false;
          DECK_EDIT_FOOTER['button_center'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button_label'].text = "戻る";
        }
        break;
        case 1:
        break;
        default:
        break;
      }
    }
    break;
    case 3: //PVPデッキ
    {
      switch (optionType) {
        case 0:
        {
          DECK_EDIT_FOOTER['button_left'].visible = false;
          DECK_EDIT_FOOTER['button_left']['button'].visible = false;
          DECK_EDIT_FOOTER['button_right'].visible = false;
          DECK_EDIT_FOOTER['button_right']['button'].visible = false;
          DECK_EDIT_FOOTER['button_center'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button_label'].text = "戻る";
        }
        break;
        case 1:
        break;
        default:
        break;
      }
    }
    break;
    case 4:
    {
      switch (optionType) {
        case 0:
        {
          DECK_EDIT_FOOTER['button_left'].visible = false;
          DECK_EDIT_FOOTER['button_left']['button'].visible = false;
          DECK_EDIT_FOOTER['button_right'].visible = false;
          DECK_EDIT_FOOTER['button_right']['button'].visible = false;
          DECK_EDIT_FOOTER['button_center'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button'].visible = true;
          DECK_EDIT_FOOTER['button_center']['button_label'].text = "戻る";
        }
        break;
        case 1:
        break;
        default:
        break;
      }
    }
    break;
    default:
    break;
  }
}

//カードリストに表示するソートボタンを作成する
function G_DECK_EDIT_SORT_BUTTONS_CREATE(parentBase){
  var sortButtonNames = new Array();
  sortButtonNames[0] = new Array();
  sortButtonNames[0]['category_id'] = 0;
  sortButtonNames[0]['category_name'] = "カテゴリー0";
  sortButtonNames[1] = new Array();
  sortButtonNames[1]['category_id'] = 1;
  sortButtonNames[1]['category_name'] = "カテゴリー1";
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
  DECK_EDIT_SORT_BUTTONS['buttons'] = new Array();
  var posX = 0;
  for (var i = 0; i < sortButtonNames.length; i++) {
    if(DECK_EDIT_SELECT_CARD_CATEGORY_ID != i) DECK_EDIT_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_183').addChildTo(parentBase);
    else DECK_EDIT_SORT_BUTTONS['buttons'][i] = Sprite('ASSET_184').addChildTo(parentBase); //選択中のカテゴリーはオレンジにする。
    DECK_EDIT_SORT_BUTTONS['buttons'][i].y = DECK_EDIT_SORT_BUTTONS['buttons'][i].y - (SCREEN_HEIGHT / 2) + ((DECK_EDIT_SORT_BUTTONS['buttons'][i].height / 2) + (DECK_EDIT_HEADER.height));
    if(i == 0){
      posX = DECK_EDIT_SORT_BUTTONS['buttons'][i].x - ((SCREEN_WIDTH / 2) + (DECK_EDIT_SORT_BUTTONS['buttons'][i].width / 2));
      posX = posX + DECK_EDIT_SORT_BUTTONS['buttons'][i].width;
      DECK_EDIT_SORT_BUTTONS['buttons'][i].x = posX;
      DECK_EDIT_SORT_BUTTONS_MIN_POS_X = posX;
      DECK_EDIT_SORT_BUTTONS_MAX_POS_X = posX;
    }
    else{
      posX = (posX + DECK_EDIT_SORT_BUTTONS['buttons'][i].width);
      DECK_EDIT_SORT_BUTTONS['buttons'][i].x = posX;
      DECK_EDIT_SORT_BUTTONS_MAX_POS_X = posX;
    }
    //ラベルを生成
    var labelFill = 'white';
    if(DECK_EDIT_SELECT_CARD_CATEGORY_ID == i) labelFill = 'black'; //選択中のカテゴリーはフォントカラーを変更
    DECK_EDIT_SORT_BUTTONS['buttons'][i]['label'] = Label({
      text: sortButtonNames[i]['category_name'],
      fontSize: 24,
      fill: labelFill,
    }).addChildTo(DECK_EDIT_SORT_BUTTONS['buttons'][i]);
    //ボタン処理
    DECK_EDIT_SORT_BUTTONS['buttons'][i]['button'] = Button({
     width: 192,         // 横サイズ
     height: 64,        // 縦サイズ
   }).addChildTo(DECK_EDIT_SORT_BUTTONS['buttons'][i]);
   DECK_EDIT_SORT_BUTTONS['buttons'][i]['button'].visible = false;
   DECK_EDIT_SORT_BUTTONS['buttons'][i]['button']['index'] = i;
   DECK_EDIT_SORT_BUTTONS['buttons'][i]['button'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null){
       console.log("カテゴリー");
       console.log(this['index']);
       DECK_EDIT_SELECT_CARD_CATEGORY_ID = this['index'];
       if(DECK_EDIT_CARD_LIST_STATUS['category_id'] == 0){ //表示するカテゴリーIDがプリセットの場合
         G_DECK_EDIT_CARD_LIST_DISP(true,0,this['set_option_id'],2); //カテゴリー変更後、カードリストを再表示
       }
     }
   };
  }
  //スワイプ処理
  if(DECK_EDIT_SORT_BUTTONS['buttons'].length != 0) {
    DECK_EDIT_SORT_BUTTONS.x = DECK_EDIT_SORT_BUTTONS_HOME_POS_X; //位置をを初期化
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.onpointstart = function(e){
      DECK_EDIT_SORT_BUTTONS_SCROLLE_START = e.pointer.x;
    };
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.onpointmove = function(e){
      DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE = e.pointer.x;
      if(DECK_EDIT_SORT_BUTTONS_SCROLLE_START > DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE){//右
        var nowXPos = DECK_EDIT_SORT_BUTTONS.x;
        DECK_EDIT_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = DECK_EDIT_SORT_BUTTONS.x + (DECK_EDIT_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        //移動領域調整処理
        var diff = DECK_EDIT_SORT_BUTTONS_MAX_POS_X - DECK_EDIT_SORT_BUTTONS_MIN_POS_X;
        diff = SCREEN_WIDTH - diff;
        diff = diff + SCREEN_WIDTH;
        diff = diff - (DECK_EDIT_SORT_BUTTONS['buttons'][DECK_EDIT_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(lastCellPosX < diff){
          DECK_EDIT_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
        }
      }
      else if(DECK_EDIT_SORT_BUTTONS_SCROLLE_START < DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE){//左
        var nowXPos = DECK_EDIT_SORT_BUTTONS.x;
        DECK_EDIT_SORT_BUTTONS.x += e.pointer.dx;
        var lastCellPosX = 0;
        lastCellPosX = DECK_EDIT_SORT_BUTTONS.x + (DECK_EDIT_SORT_BUTTONS_MAX_POS_X); //最後のセルのポジションを取得
        var swipeMaxAreaPosX = SCREEN_WIDTH - (DECK_EDIT_SORT_BUTTONS['buttons'][DECK_EDIT_SORT_BUTTONS['buttons'].length - 1].width / 2);
        if(swipeMaxAreaPosX < lastCellPosX) DECK_EDIT_SORT_BUTTONS.x = nowXPos;//最大にスワイプできる領域を超えた
      }
    };
    DECK_EDIT_SORT_BUTTONS_TOUCH_AREA.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false){
        DECK_EDIT_SORT_BUTTONS_SCROLLE_START = 0;
        DECK_EDIT_SORT_BUTTONS_SCROLLE_MOVE = 0;
      }
    };
  }
}
