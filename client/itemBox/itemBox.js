//============================================
// アイテムボックス
//============================================
var ITEMBOX_USER_STATUS_DISP = null;//ユーザーステータス表示用
var ITEMBOX_USER_STATUS_CHECK = false;//表示するステータスが全て揃ったかのチェック
var ITEMBOX_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品表示用データ
var ITEMBOX_PLAYER_STAMINA_DATA = null; //プレイヤーの現在のスタミナ
var ITEMBOX_PLAYER_VITALITY_DATA = null; //プレイヤーの現在の生命力
var ITEMBOX_PLAYER_VITALITY_PENALTY = null; //生命力ペナルティー
var ITEMBOX_STATUS_LABEL = null; //ステータス表示用ラベル
var IETMBOX_EQUIP_ITEM_LABEL = null; //装備品表示用ラベル
var ITEMBOX_PLAYER_CLASS_DATA = null; //プレイヤークラスデータ
var ITEMBOX_EQUIP_ITEM_TEXT_OBJ = null; //装備品のテキスト表示用オブジェクト
var ITEMBOX_CATEGORY_TAB_BASE = null; //カテゴリータブの親
var ITEMBOX_CATEGORY_TAB = new Array(); //カテゴリータブのスプライト配列
var ITEMBOX_CATEGORY_TAB_BUTTON = new Array(); //カテゴリータブのボタン
var ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = -1; //カテゴリーボタンの押された番号
var ITEMBOX_BOX_FRAME_BASE = null; //アイテムボックスフレームの親
var ITEMBOX_BOX_FRAME = new Array(); //アイテムボックスフレームのスプライト配列
var ITEMBOX_EQUIP_CATEGORY_BUTTON = new Array(); //装備品カテゴリー切り替え用ボタン
var ITEMBOX_CATEGORY_TAB_SWITCH = 0; //選択中のタブ番号
var ITEMBOX_EQUIP_CATEGORY_FRAMES = new Array(); //装備品切り替え用ボックスフレームの配列
var ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH = 1; //選択中の装備カテゴリーのequipCategoryId
var ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS = null; //アイテムボックスに入っている装備品を取得
var ITEMBOX_START_TAB_INIT = false; //最初に表示されるタブの初期化完了フラグ
var ITEMBOX_COLUMN_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラム
var ITEMBOX_COLUMN_TEXT_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラムのテキスト
var ITEMBOX_COLUMN_ICON_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラムのアイコン
var ITEMBOX_COLUMN_NONE_TEXT = null; //表示物が無かった場合のラベル
var ITEMBOX_PAGE_CONTROLLER_BUTTON = null; //ページ切り替え操作用ボタン
var ITEMBOX_PAGE_NEXT_BUTTON = null; //次のページに進むボタン
var ITEMBOX_PAGE_BACK_BUTTON = null; //前のページに戻るボタン
var ITEMBOX_PAGE_CONTROLLER_TEXT = null; //ページ数を表示するテキスト
var ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON = new Array(); //カラムに配置される「装備」ボタン
var ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
var ITEMBOX_EQUIP_ITEM_SELL_BUTTON = new Array(); //カラムに配置される「売却」ボタン
var ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
var ITEMBOX_ITEM_BOX_PAGE_NUMBER = 1;//選択中のページ
var ITEMBOX_WINDOW_NODE = null;//ウィンドウ表示用ノード
var ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = 0; //選択中のプレイヤー装備品のマスターID
var ITEMBOX_RELOAD_FLAG = false; //再通信が起こった時のリロードフラグ
var ITEMBOX_EQUIP_INFO_RELOAD_FLAG = false; //再通信が起こった時の装備情報リロードフラグ
var ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = false; //再通信が起こった時の装備品ボックスのリロードフラグ
var ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = false; //再通信が起こった時の装備品装備情報のリロードフラグ
var ITEMBOX_COLUMN_NORMAL = new Array(); //通常カラム、通貨のカラムなどに使用
var ITEMBOX_COLUMN_TEXT_NORMAL = new Array(); //通常カラムのテキスト
var ITEMBOX_COLUMN_ICON = new Array(); //通常カラムのアイコン
var ITEMBOX_PLAYER_ITEM_DATAS = null;//プレイヤーのアイテムデータを取得
var ITEMBOX_CARD_CATEGORY_BUTTON = new Array(); //ロールカテゴリー切り替え用ボタン
var ITEMBOX_CARD_CATEGORY_FRAMES = new Array(); //ロール切り替え用ボックスフレームの配列
var ITEMBOX_CARD_CATEGORY_TAB_SWITCH = 1; //選択中のロールカテゴリーのweaponCategoryId
var ITEMBOX_CARD_INVENTORY_DATAS = null; //アイテムボックスに入っているロールを取得
var ITEMBOX_COLUMN_CARD_ITEM = new Array(); //アイテムボックスに表示されるカラム
var ITEMBOX_COLUMN_TEXT_CARD_ITEM = new Array(); //アイテムボックスに表示されるカラムのテキスト
var ITEMBOX_COLUMN_ITEM = new Array(); //消費アイテム専用カラム
var ITEMBOX_COLUMN_ITEM_TEXT = new Array(); //消費アイテムカラムのテキスト
var ITEMBOX_COLUMN_ITEM_ICON = new Array(); //消費アイテムカラムのアイコン
var ITEMBOX_PLAYER_MONEY_ITEM_DATAS = null; //プレイヤーの通貨アイテムデータを取得
var ITEMBOX_ITEM_USE_BUTTON = new Array(); //カラムに配置される「使用」ボタン
var ITEMBOX_ITEM_USE_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
var ITEMBOX_ITEM_SELL_BUTTON = new Array(); //カラムに配置される「売却」ボタン
var ITEMBOX_ITEM_SELL_BUTTON_NUMBER = -1; //売却 ボタンが押されたボタンの番号
var ITEMBOX_SELECT_ITEM_MASTER_ID = 0; //選択中のプレイヤー消費アイテムID
var ITEMBOX_COLUMN_IMPORTANT_ITEM = new Array(); //重要アイテム専用カラム
var ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM = new Array(); //重要アイテムのテキスト
var ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM = new Array(); //重要アイテムのアイコン
var ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS = null; //プレイヤーの重要アイテムデータを取得
var ITEMBOX_UI_BTN_NUMBER = -1; //通常に使用するボタン
var ITEMBOX_PLAYER_AVATAR_DATA = null; //ユーザーが所持しているアバターアイテム
var ITEMBOX_COLUMN_AVATAR_ITEM = new Array(); //アバター専用カラム
var ITEMBOX_PLAYER_AVATAR_MASTER_DATA = null; //プレイヤーアバターのマスターデータ
var ITEMBOX_PLAYER_AVATAR_SPRITE = null; //プレイヤーのアバター装備画像
var ITEMBOX_PLAYER_PLAY_ANIM_FLAG = false; //選択アニメーション再生中か
var ITEMBOX_SELECT_EQUIP_AVATAR_ITEM_MASTER_ID = 0; //選択中のアバターのマスターID
var ITEMBOX_COLUMN_EQUIP_ITEM_UNSET = new Array(); //装備品解除可能用アイテムカラム
var ITEMBOX_AVATAR_WINDOW = null; //アバターを表示するウィンドウ
var ITEMBOX_AVATAR_LOAD = false; //アバター非同期読み込みフラグ
var ITEMBOX_PLAYER_AVATAR_ITEM_DATA = null; //プレイヤーが所持しているアバター

phina.define("ItemBox", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {//パラメーター初期化
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "itemBox";
    ITEMBOX_USER_STATUS_DISP = null;//ユーザーステータス表示用
    ITEMBOX_USER_STATUS_CHECK = false;//表示するステータスが全て揃ったかのチェック
    ITEMBOX_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品表示用データ
    ITEMBOX_PLAYER_STAMINA_DATA = null; //プレイヤーの現在のスタミナ
    ITEMBOX_PLAYER_VITALITY_DATA = null; //プレイヤーの現在の生命力
    ITEMBOX_PLAYER_VITALITY_PENALTY = null; //生命力ペナルティー
    ITEMBOX_STATUS_LABEL = null; //ステータス表示用ラベル
    IETMBOX_EQUIP_ITEM_LABEL = null; //装備品表示用ラベル
    ITEMBOX_PLAYER_CLASS_DATA = null; //プレイヤークラスデータ
    ITEMBOX_EQUIP_ITEM_TEXT_OBJ = null; //装備品のテキスト表示用オブジェクト
    ITEMBOX_CATEGORY_TAB_BASE = null; //カテゴリータブの親
    ITEMBOX_CATEGORY_TAB = new Array(); //カテゴリータブのスプライト配列
    ITEMBOX_CATEGORY_TAB_BUTTON = new Array(); //カテゴリータブのボタン
    ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = -1; //カテゴリーボタンの押された番号
    ITEMBOX_BOX_FRAME_BASE = null; //アイテムボックスフレームの親
    ITEMBOX_BOX_FRAME = new Array(); //アイテムボックスフレームのスプライト配列
    ITEMBOX_EQUIP_CATEGORY_BUTTON = new Array(); //装備品カテゴリー切り替え用ボタン
    ITEMBOX_CATEGORY_TAB_SWITCH = 0; //選択中のタブ番号
    ITEMBOX_EQUIP_CATEGORY_FRAMES = new Array(); //装備品切り替え用ボックスフレームの配列
    ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH = 1; //選択中の装備カテゴリーのequipCategoryId
    ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS = null; //アイテムボックスに入っている装備品を取得
    ITEMBOX_START_TAB_INIT = false; //最初に表示されるタブの初期化完了フラグ
    ITEMBOX_COLUMN_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラム
    ITEMBOX_COLUMN_TEXT_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラムのテキスト
    ITEMBOX_COLUMN_ICON_EQUIP_ITEM = new Array(); //アイテムボックスに表示されるカラムのアイコン
    ITEMBOX_COLUMN_NONE_TEXT = null; //表示物が無かった場合のラベル
    ITEMBOX_PAGE_CONTROLLER_BUTTON = null; //ページ切り替え操作用ボタン
    ITEMBOX_PAGE_NEXT_BUTTON = null; //次のページに進むボタン
    ITEMBOX_PAGE_BACK_BUTTON = null; //前のページに戻るボタン
    ITEMBOX_PAGE_CONTROLLER_TEXT = null; //ページ数を表示するテキスト
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON = new Array(); //カラムに配置される「装備」ボタン
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON = new Array(); //カラムに配置される「売却」ボタン
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
    ITEMBOX_ITEM_BOX_PAGE_NUMBER = 1;//選択中のページ
    ITEMBOX_WINDOW_NODE = null;//ウィンドウ表示用ノード
    ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = 0; //選択中のプレイヤー装備品のマスターID
    ITEMBOX_RELOAD_FLAG = false; //再通信が起こった時のリロードフラグ
    ITEMBOX_EQUIP_INFO_RELOAD_FLAG = false; //再通信が起こった時の装備情報リロードフラグ
    ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = false; //再通信が起こった時の装備品ボックスのリロードフラグ
    ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = false; //再通信が起こった時の装備品装備情報のリロードフラグ
    ITEMBOX_COLUMN_NORMAL = new Array(); //通常カラム、通貨のカラムなどに使用
    ITEMBOX_COLUMN_TEXT_NORMAL = new Array(); //通常カラムのテキスト
    ITEMBOX_COLUMN_ICON = new Array(); //通常カラムのアイコン
    ITEMBOX_PLAYER_ITEM_DATAS = null;//プレイヤーのアイテムデータを取得
    ITEMBOX_CARD_CATEGORY_BUTTON = new Array(); //ロールカテゴリー切り替え用ボタン
    ITEMBOX_CARD_CATEGORY_FRAMES = new Array(); //ロール切り替え用ボックスフレームの配列
    ITEMBOX_CARD_CATEGORY_TAB_SWITCH = 1; //選択中のロールカテゴリーのweaponCategoryId
    ITEMBOX_CARD_INVENTORY_DATAS = null; //アイテムボックスに入っているロールを取得
    ITEMBOX_COLUMN_CARD_ITEM = new Array(); //アイテムボックスに表示されるカラム
    ITEMBOX_COLUMN_TEXT_CARD_ITEM = new Array(); //アイテムボックスに表示されるカラムのテキスト
    ITEMBOX_COLUMN_ITEM = new Array(); //消費アイテム専用カラム
    ITEMBOX_COLUMN_ITEM_TEXT = new Array(); //消費アイテムカラムのテキスト
    ITEMBOX_COLUMN_ITEM_ICON = new Array(); //消費アイテムカラムのアイコン
    ITEMBOX_PLAYER_MONEY_ITEM_DATAS = null;//プレイヤーの通貨アイテムデータを取得
    ITEMBOX_ITEM_USE_BUTTON = new Array(); //カラムに配置される「使用」ボタン
    ITEMBOX_ITEM_USE_BUTTON_NUMBER = -1; //装備 ボタンが押されたボタンの番号
    ITEMBOX_ITEM_SELL_BUTTON = new Array(); //カラムに配置される「売却」ボタン
    ITEMBOX_ITEM_SELL_BUTTON_NUMBER = -1; //売却 ボタンが押されたボタンの番号
    ITEMBOX_SELECT_ITEM_MASTER_ID = 0; //選択中のプレイヤー消費アイテムID
    ITEMBOX_COLUMN_IMPORTANT_ITEM = new Array(); //重要アイテム専用カラム
    ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM = new Array(); //重要アイテムのテキスト
    ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM = new Array(); //重要アイテムのアイコン
    ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS = null; //プレイヤーの重要アイテムデータを取得
    ITEMBOX_UI_BTN_NUMBER = -1; //通常に使用するボタン
    ITEMBOX_PLAYER_AVATAR_DATA = null; //ユーザーが所持しているアバターアイテム
    ITEMBOX_COLUMN_AVATAR_ITEM = new Array(); //アバター表示用カラム
    ITEMBOX_PLAYER_AVATAR_MASTER_DATA = null; //プレイヤーアバターのマスターデータ
    ITEMBOX_PLAYER_AVATAR_SPRITE = null; //プレイヤーアバターを表示するスプライト
    ITEMBOX_PLAYER_PLAY_ANIM_FLAG = false; //選択アニメーション再生中か
    ITEMBOX_SELECT_EQUIP_AVATAR_ITEM_MASTER_ID = 0; //選択中のアバターのマスターID
    ITEMBOX_AVATAR_WINDOW = null; //アバターを表示するウィンドウ
    ITEMBOX_AVATAR_LOAD = false; //アバター非同期読み込みフラグ
    ITEMBOX_PLAYER_AVATAR_ITEM_DATA = null; //プレイヤーが所持しているアバター
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(this);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'アイテムボックス',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    //戻るボタン表示
    var backBtnSprite = Sprite('ASSET_79').addChildTo(this);
    backBtnSprite.x = (this.gridX.center() * 2) - (backBtnSprite.width / 2);
    backBtnSprite.y = backBtnSprite.height * 1.5;

    Label({
      text: '戻る',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(backBtnSprite);

    var backBtn = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(backBtnSprite);
    backBtn.visible = false;

    backBtn.onpointend = function(e){// 戻るボタンが押された時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_UI_BTN_NUMBER = 1;
      }
    };

    ITEMBOX_CATEGORY_TAB_BASE = Sprite('ASSET_41').addChildTo(this);
    ITEMBOX_CATEGORY_TAB_BASE.x = this.gridX.center();
    ITEMBOX_CATEGORY_TAB_BASE.y = this.gridY.center() * 0.95;
    //アイテムボックスカテゴリータブ表示
    var categoryCount = 42;
    var buttonPosXInit = 0.2;
    if(ITEMBOX_CATEGORY_TAB_BASE != null){
      for (var i = 0; i < 5; i++) {
        ITEMBOX_CATEGORY_TAB[i] = Sprite("ASSET_" + categoryCount).addChildTo(ITEMBOX_CATEGORY_TAB_BASE);
        if(i != 0){//表示しないタブは透明にしておく
          ITEMBOX_CATEGORY_TAB[i].visible = false;
          ITEMBOX_CATEGORY_TAB[i].visible = false;
        }
        categoryCount = categoryCount + 1;
      }
      for (var i = 0; i < 5; i++) {
        //タブのボタン生成
        ITEMBOX_CATEGORY_TAB_BUTTON[i] = Button({
          width: 100,         // 横サイズ
          height: 50,        // 縦サイズ
        }).addChildTo(ITEMBOX_CATEGORY_TAB_BASE);
        ITEMBOX_CATEGORY_TAB_BUTTON[i].x = (this.gridX.center() * buttonPosXInit) - this.gridX.center();
        buttonPosXInit = buttonPosXInit + 0.4;
        ITEMBOX_CATEGORY_TAB_BUTTON[i].visible = false;
      }

      ITEMBOX_CATEGORY_TAB_BUTTON[0].onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = 0;
        }
      };
      ITEMBOX_CATEGORY_TAB_BUTTON[1].onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = 1;
        }
      };
      ITEMBOX_CATEGORY_TAB_BUTTON[2].onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = 2;
        }
      };
      ITEMBOX_CATEGORY_TAB_BUTTON[3].onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = 3;
        }
      };
      ITEMBOX_CATEGORY_TAB_BUTTON[4].onpointend = function(e){// カテゴリーボタンが押されたときの処理
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = 4;
        }
      };
    }

    //アイテムボックス装備品(武器1)表示
    ITEMBOX_BOX_FRAME_BASE = Sprite('ASSET_60').addChildTo(this); //初期表示は普通のフレームにする
    ITEMBOX_BOX_FRAME_BASE.x = this.gridX.center();
    ITEMBOX_BOX_FRAME_BASE.y = this.gridY.center() * 1.5;

    var itemBoxFrameAssetIndex = new Array();//フレーム種類のアセット判別用
    itemBoxFrameAssetIndex[0] = 48; //装備品ボックスフレーム
    itemBoxFrameAssetIndex[1] = 60; //通貨ボックスフレーム
    itemBoxFrameAssetIndex[2] = 68; //カードボックスフレーム
    itemBoxFrameAssetIndex[3] = 60; //アイテムボックスフレーム
    itemBoxFrameAssetIndex[4] = 60; //その他ボックスフレーム
    //初期ボックスフレーム生成
    for (var i = 0; i < itemBoxFrameAssetIndex.length; i++) {
      ITEMBOX_BOX_FRAME[i] = Sprite('ASSET_' + itemBoxFrameAssetIndex[i]).addChildTo(ITEMBOX_BOX_FRAME_BASE);
      if(i != 0){
        ITEMBOX_BOX_FRAME[i].visible = false;
      }
    }

    //装備品切り替えボタン
    var equipTabPosXInit = 0.1;
    var equipBoxFrameAssetCountInit = 48;
    for (var i = 0; i < 10; i++) {
      ITEMBOX_EQUIP_CATEGORY_BUTTON[i] = Button({
        text: '',
        width: 50,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_BOX_FRAME[0]);
      ITEMBOX_EQUIP_CATEGORY_BUTTON[i].y = this.gridY.center() * -0.43;
      ITEMBOX_EQUIP_CATEGORY_BUTTON[i].x = (this.gridX.center() * equipTabPosXInit) - this.gridX.center();
      equipTabPosXInit = equipTabPosXInit + 0.2;
      ITEMBOX_EQUIP_CATEGORY_BUTTON[i].visible = false;

      //フレーム画像生成
      ITEMBOX_EQUIP_CATEGORY_FRAMES[i] = Sprite('ASSET_' + equipBoxFrameAssetCountInit).addChildTo(ITEMBOX_BOX_FRAME[0]);//装備品フレームを親に指定。
      ITEMBOX_EQUIP_CATEGORY_FRAMES[i].visible = false;
      equipBoxFrameAssetCountInit = equipBoxFrameAssetCountInit + 1;

    }
    ITEMBOX_EQUIP_CATEGORY_BUTTON[0].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(0,1,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[1].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(1,2,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[2].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(2,3,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[3].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(3,4,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[4].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(4,5,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[5].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(5,6,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[6].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(6,7,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[7].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(7,8,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[8].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(8,9,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_EQUIP_CATEGORY_BUTTON[9].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(9,10,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_CATEGORY_FRAMES);
      }
    };

    //ロールカテゴリー切り替えボタン
    var cardTabPosXInit = 0.1;
    var cardBoxFrameAssetCountInit = 68;
    for (var i = 0; i < 10; i++) {
      ITEMBOX_CARD_CATEGORY_BUTTON[i] = Button({
        text: '',
        width: 50,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_BOX_FRAME[2]);
      ITEMBOX_CARD_CATEGORY_BUTTON[i].y = this.gridY.center() * -0.43;
      ITEMBOX_CARD_CATEGORY_BUTTON[i].x = (this.gridX.center() * cardTabPosXInit) - this.gridX.center();
      cardTabPosXInit = cardTabPosXInit + 0.2;
      ITEMBOX_CARD_CATEGORY_BUTTON[i].visible = false;

      //フレーム画像生成
      ITEMBOX_CARD_CATEGORY_FRAMES[i] = Sprite('ASSET_' + cardBoxFrameAssetCountInit).addChildTo(ITEMBOX_BOX_FRAME[2]);//ロールフレームを親に指定。
      ITEMBOX_CARD_CATEGORY_FRAMES[i].visible = false;
      cardBoxFrameAssetCountInit = cardBoxFrameAssetCountInit + 1;

    }
    ITEMBOX_CARD_CATEGORY_BUTTON[0].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(0,1,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[1].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(1,2,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[2].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(2,3,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[3].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(3,4,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[4].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(4,5,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[5].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(5,6,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[6].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(6,7,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[7].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(7,8,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };
    ITEMBOX_CARD_CATEGORY_BUTTON[8].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(8,9,ITEMBOX_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_CATEGORY_FRAMES);
      }
    };


    //ページ切り替えボタンを表示
    var pageControllerBtnPosYInit = 1.2;
    ITEMBOX_PAGE_CONTROLLER_BUTTON = Sprite('ASSET_59').addChildTo(this);
    ITEMBOX_PAGE_CONTROLLER_BUTTON.x = this.gridX.center();
    ITEMBOX_PAGE_CONTROLLER_BUTTON.y = this.gridY.center() * pageControllerBtnPosYInit;
    //次のページに進むボタン
    ITEMBOX_PAGE_NEXT_BUTTON = Button({
      text: '',
      width: 100,         // 横サイズ
      height: 50,        // 縦サイズ
    }).addChildTo(ITEMBOX_PAGE_CONTROLLER_BUTTON);
    ITEMBOX_PAGE_NEXT_BUTTON.x = ITEMBOX_PAGE_CONTROLLER_BUTTON.x * 0.25;
    ITEMBOX_PAGE_NEXT_BUTTON.visible = false;
    ITEMBOX_PAGE_NEXT_BUTTON.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_PAGE_CONTROLLER(true);
      }
    };

    //前のページに戻るボタン
    ITEMBOX_PAGE_BACK_BUTTON = Button({
      text: '',
      width: 100,         // 横サイズ
      height: 50,        // 縦サイズ
    }).addChildTo(ITEMBOX_PAGE_CONTROLLER_BUTTON);
    ITEMBOX_PAGE_BACK_BUTTON.x = ITEMBOX_PAGE_CONTROLLER_BUTTON.x * -0.25;
    ITEMBOX_PAGE_BACK_BUTTON.visible = false;
    ITEMBOX_PAGE_BACK_BUTTON.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        G_ITEMBOX_PAGE_CONTROLLER(false);
      }
    };

    //ページ数のテキスト初期化
    ITEMBOX_PAGE_CONTROLLER_TEXT = Label({
      text: '1/1',
      fontSize: 20,
      fill: 'black',
    }).addChildTo(ITEMBOX_PAGE_CONTROLLER_BUTTON);

    //装備品カラム表示処理
    var columnMaxCount = 5;//カラム最大数
    var equipColumnPosYInit = 1.33;
    for (var i = 0; i < columnMaxCount; i++) {
      ITEMBOX_COLUMN_EQUIP_ITEM[i] = Sprite('ASSET_144').addChildTo(this);
      ITEMBOX_COLUMN_EQUIP_ITEM[i].x = this.gridX.center();
      ITEMBOX_COLUMN_EQUIP_ITEM[i].y = this.gridY.center() * equipColumnPosYInit;
      equipColumnPosYInit = equipColumnPosYInit + 0.13;
      //アバター用カラム
      ITEMBOX_COLUMN_AVATAR_ITEM[i] = Sprite('ASSET_143').addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_COLUMN_AVATAR_ITEM[i].visible = false;
      //装備解除用カラム
      ITEMBOX_COLUMN_EQUIP_ITEM_UNSET[i] = Sprite('ASSET_146').addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_COLUMN_EQUIP_ITEM_UNSET[i].visible = false;

      ITEMBOX_COLUMN_TEXT_EQUIP_ITEM[i] = Label({
        text: 'null null null null null null \nnull null null null null null',
        fontSize: 20,
        fill: 'black',
        align: 'left',
      }).addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_COLUMN_TEXT_EQUIP_ITEM[i].x = this.gridX.center() * -0.8;
      //ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;
      //装備品のアイコン画像初期化
      ITEMBOX_COLUMN_ICON_EQUIP_ITEM[i] = Sprite('ASSET_61').addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_COLUMN_ICON_EQUIP_ITEM[i].x = this.gridX.center() * -0.89;
      ITEMBOX_COLUMN_ICON_EQUIP_ITEM[i].setScale(0.5);

      //装備ボタンの初期化
      ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[i] = Button({
        text: '',
        width: 115,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[i].x = this.gridX.center() * 0.415;
      ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[i].visible = false;

      //売却ボタンの初期化
      ITEMBOX_EQUIP_ITEM_SELL_BUTTON[i] = Button({
        text: '',
        width: 115,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_COLUMN_EQUIP_ITEM[i]);
      ITEMBOX_EQUIP_ITEM_SELL_BUTTON[i].x = this.gridX.center() * 0.79;
      ITEMBOX_EQUIP_ITEM_SELL_BUTTON[i].visible = false;

    }
    //装備ボタンコールバック
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[0].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = 0;
      }
    };
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[1].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = 1;
      }
    };
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[2].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = 2;
      }
    };
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[3].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = 3;
      }
    };
    ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON[4].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = 4;
      }
    };

    //売却ボタンコールバック
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON[0].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = 0;
      }
    };
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON[1].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = 1;
      }
    };
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON[2].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = 2;
      }
    };
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON[3].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = 3;
      }
    };
    ITEMBOX_EQUIP_ITEM_SELL_BUTTON[4].onpointend = function(e){// 装備ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = 4;
      }
    };

    //ロールカラム表示処理
    var columnMaxCount = 5;//カラム最大数
    var cardColumnPosYInit = 1.33;
    for (var i = 0; i < columnMaxCount; i++) {
      ITEMBOX_COLUMN_CARD_ITEM[i] = Sprite('ASSET_58').addChildTo(this);
      ITEMBOX_COLUMN_CARD_ITEM[i].x = this.gridX.center();
      ITEMBOX_COLUMN_CARD_ITEM[i].y = this.gridY.center() * cardColumnPosYInit;
      cardColumnPosYInit = cardColumnPosYInit + 0.13;

      ITEMBOX_COLUMN_TEXT_CARD_ITEM[i] = Label({
        text: 'null null null null null null \nnull null null null null null',
        fontSize: 20,
        fill: 'black',
        align: 'left',
      }).addChildTo(ITEMBOX_COLUMN_CARD_ITEM[i]);
      ITEMBOX_COLUMN_TEXT_CARD_ITEM[i].x = this.gridX.center() * -0.8;
      //ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;

    }

    //通常カラムの初期化
    var normalColumnPosYInit = 1.33;
    for (var i = 0; i < columnMaxCount; i++) {
      ITEMBOX_COLUMN_NORMAL[i] = Sprite('ASSET_58').addChildTo(this);
      ITEMBOX_COLUMN_NORMAL[i].x = this.gridX.center();
      ITEMBOX_COLUMN_NORMAL[i].y = this.gridY.center() * normalColumnPosYInit;
      normalColumnPosYInit = normalColumnPosYInit + 0.13;

      ITEMBOX_COLUMN_TEXT_NORMAL[i] = Label({
        text: 'null null null null null null \nnull null null null null null',
        fontSize: 20,
        fill: 'black',
        align: 'left',
      }).addChildTo(ITEMBOX_COLUMN_NORMAL[i]);
      ITEMBOX_COLUMN_TEXT_NORMAL[i].x = this.gridX.center() * -0.8;
      //ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;
      //アイコン画像初期化
      ITEMBOX_COLUMN_ICON[i] = Sprite('ASSET_61').addChildTo(ITEMBOX_COLUMN_NORMAL[i]);
      ITEMBOX_COLUMN_ICON[i].x = this.gridX.center() * -0.89;
      ITEMBOX_COLUMN_ICON[i].setScale(0.5);
    }

    //重要アイテムカラムの初期化
    var importantColumnPosYInit = 1.33;
    for (var i = 0; i < columnMaxCount; i++) {
      ITEMBOX_COLUMN_IMPORTANT_ITEM[i] = Sprite('ASSET_58').addChildTo(this);
      ITEMBOX_COLUMN_IMPORTANT_ITEM[i].x = this.gridX.center();
      ITEMBOX_COLUMN_IMPORTANT_ITEM[i].y = this.gridY.center() * importantColumnPosYInit;
      importantColumnPosYInit = importantColumnPosYInit + 0.13;

      ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM[i] = Label({
        text: 'null null null null null null \nnull null null null null null',
        fontSize: 20,
        fill: 'black',
        align: 'left',
      }).addChildTo(ITEMBOX_COLUMN_IMPORTANT_ITEM[i]);
      ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM[i].x = this.gridX.center() * -0.8;
      //ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;
      //アイコン画像初期化
      ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM[i] = Sprite('ASSET_61').addChildTo(ITEMBOX_COLUMN_IMPORTANT_ITEM[i]);
      ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM[i].x = this.gridX.center() * -0.89;
      ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM[i].setScale(0.5);
    }

    //アイテムカラム表示処理
    var itemColumnPosYInit = 1.33;
    for (var i = 0; i < columnMaxCount; i++) {
      ITEMBOX_COLUMN_ITEM[i] = Sprite('ASSET_78').addChildTo(this);
      ITEMBOX_COLUMN_ITEM[i].x = this.gridX.center();
      ITEMBOX_COLUMN_ITEM[i].y = this.gridY.center() * itemColumnPosYInit;
      itemColumnPosYInit = itemColumnPosYInit + 0.13;

      ITEMBOX_COLUMN_ITEM_TEXT[i] = Label({
        text: 'null null null null null null \nnull null null null null null',
        fontSize: 20,
        fill: 'black',
        align: 'left',
      }).addChildTo(ITEMBOX_COLUMN_ITEM[i]);
      ITEMBOX_COLUMN_ITEM_TEXT[i].x = this.gridX.center() * -0.8;
      //ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;
      //装備品のアイコン画像初期化
      ITEMBOX_COLUMN_ITEM_ICON[i] = Sprite('ASSET_61').addChildTo(ITEMBOX_COLUMN_ITEM[i]);
      ITEMBOX_COLUMN_ITEM_ICON[i].x = this.gridX.center() * -0.89;
      ITEMBOX_COLUMN_ITEM_ICON[i].setScale(0.5);

      //使用ボタンの初期化
      ITEMBOX_ITEM_USE_BUTTON[i] = Button({
        text: '',
        width: 115,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_COLUMN_ITEM[i]);
      ITEMBOX_ITEM_USE_BUTTON[i].x = this.gridX.center() * 0.415;
      ITEMBOX_ITEM_USE_BUTTON[i].visible = false;

      //売却ボタンの初期化
      ITEMBOX_ITEM_SELL_BUTTON[i] = Button({
        text: '',
        width: 115,         // 横サイズ
        height: 50,        // 縦サイズ
      }).addChildTo(ITEMBOX_COLUMN_ITEM[i]);
      ITEMBOX_ITEM_SELL_BUTTON[i].x = this.gridX.center() * 0.79;
      ITEMBOX_ITEM_SELL_BUTTON[i].visible = false;

    }
    //使用ボタンコールバック
    ITEMBOX_ITEM_USE_BUTTON[0].onpointend = function(e){// 使用ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_USE_BUTTON_NUMBER = 0;
      }
    };
    ITEMBOX_ITEM_USE_BUTTON[1].onpointend = function(e){// 使用ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_USE_BUTTON_NUMBER = 1;
      }
    };
    ITEMBOX_ITEM_USE_BUTTON[2].onpointend = function(e){// 使用ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_USE_BUTTON_NUMBER = 2;
      }
    };
    ITEMBOX_ITEM_USE_BUTTON[3].onpointend = function(e){// 使用ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_USE_BUTTON_NUMBER = 3;
      }
    };
    ITEMBOX_ITEM_USE_BUTTON[4].onpointend = function(e){// 使用ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_USE_BUTTON_NUMBER = 4;
      }
    };

    //売却ボタンコールバック
    ITEMBOX_ITEM_SELL_BUTTON[0].onpointend = function(e){// 売却ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_SELL_BUTTON_NUMBER = 0;
      }
    };
    ITEMBOX_ITEM_SELL_BUTTON[1].onpointend = function(e){// 売却ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_SELL_BUTTON_NUMBER = 1;
      }
    };
    ITEMBOX_ITEM_SELL_BUTTON[2].onpointend = function(e){// 売却ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_SELL_BUTTON_NUMBER = 2;
      }
    };
    ITEMBOX_ITEM_SELL_BUTTON[3].onpointend = function(e){// 売却ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_SELL_BUTTON_NUMBER = 3;
      }
    };
    ITEMBOX_ITEM_SELL_BUTTON[4].onpointend = function(e){// 売却ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false){
        ITEMBOX_ITEM_SELL_BUTTON_NUMBER = 4;
      }
    };

    //表示物が無かった場合のテキスト
    ITEMBOX_COLUMN_NONE_TEXT = Label({
      text: '表示する項目はありません。',
      fontSize: 24,
      fill: 'black',
    }).addChildTo(this);
    ITEMBOX_COLUMN_NONE_TEXT.x = this.gridX.center();
    ITEMBOX_COLUMN_NONE_TEXT.y = this.gridX.center() * 2.0;
    ITEMBOX_COLUMN_NONE_TEXT.visible = false;

    //キャラ表示用背景ウィンドウ
    ITEMBOX_AVATAR_WINDOW = Sprite('ASSET_33').addChildTo(this);
    ITEMBOX_AVATAR_WINDOW.x = this.gridX.center();
    ITEMBOX_AVATAR_WINDOW.y = this.gridY.center() * 0.5;
    //キャラ表示切り替えボタン
    ITEMBOX_AVATAR_WINDOW['btn'] = Button({
      width: ITEMBOX_AVATAR_WINDOW.width,         // 横サイズ
      height: ITEMBOX_AVATAR_WINDOW.height,        // 縦サイズ
    }).addChildTo(ITEMBOX_AVATAR_WINDOW);
    ITEMBOX_AVATAR_WINDOW['btn'].onpointend = function(e){
      console.log("btnpush");
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false && isset(ITEMBOX_PLAYER_AVATAR_SPRITE['type'])){
        if(ITEMBOX_PLAYER_AVATAR_SPRITE['type'] == 0){
          ITEMBOX_PLAYER_AVATAR_SPRITE['type'] = 1;
          ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].visible = false;
          ITEMBOX_PLAYER_AVATAR_SPRITE['use'].visible = true;
        }
        else{
          ITEMBOX_PLAYER_AVATAR_SPRITE['type'] = 0;
          ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].visible = true;
          ITEMBOX_PLAYER_AVATAR_SPRITE['use'].visible = false;
        }
      }
    };
    ITEMBOX_AVATAR_WINDOW['btn'].visible = false;

    ITEMBOX_STATUS_LABEL = Label({
      text: '',
      fontSize: 18,
      fill: 'white',
      align: 'left',
    }).addChildTo(this);
    ITEMBOX_STATUS_LABEL.x = this.gridX.center() * 1.3;
    ITEMBOX_STATUS_LABEL.y = this.gridY.center() * 0.5;
    var statudLabelDisp = false
    ITEMBOX_STATUS_LABEL.update = function(){
      if(PLAYER_STATUS != null && ITEMBOX_PLAYER_STAMINA_DATA != null && ITEMBOX_PLAYER_VITALITY_DATA != null && statudLabelDisp == false){
        var playerStatusObj = G_GET_PLAYER_STATUS_OBJ(PLAYER_STATUS,ITEMBOX_PLAYER_STAMINA_DATA,ITEMBOX_PLAYER_VITALITY_DATA);
        for (key in playerStatusObj) {
          ITEMBOX_STATUS_LABEL.text = (ITEMBOX_STATUS_LABEL.text + "\n") + (key + ":" + playerStatusObj[key]);
        }
        statudLabelDisp = true;
      }

      if(ITEMBOX_EQUIP_INFO_RELOAD_FLAG == true && ITEMBOX_RELOAD_FLAG == false){ //再読込の場合
        ITEMBOX_STATUS_LABEL.text = "";
        var playerStatusObj = G_GET_PLAYER_STATUS_OBJ(PLAYER_STATUS,ITEMBOX_PLAYER_STAMINA_DATA,ITEMBOX_PLAYER_VITALITY_DATA);
        for (key in playerStatusObj) {
          ITEMBOX_STATUS_LABEL.text = (ITEMBOX_STATUS_LABEL.text + "\n") + (key + ":" + playerStatusObj[key]);
        }
        ITEMBOX_EQUIP_INFO_RELOAD_FLAG = false;
      }
    }

    ITEMBOX_EQUIP_ITEM_LABEL = Label({
      text: '',
      fontSize: 17,
      fill: 'white',
      align: 'left',
    }).addChildTo(this);
    ITEMBOX_EQUIP_ITEM_LABEL.x = this.gridX.center() * 0.05;
    ITEMBOX_EQUIP_ITEM_LABEL.y = this.gridY.center() * 0.5;
    var equipItemLabelDisp = false
    ITEMBOX_EQUIP_ITEM_LABEL.update = function(){
      if(PLAYER_STATUS != null && ITEMBOX_PLAYER_STAMINA_DATA != null && ITEMBOX_PLAYER_VITALITY_DATA != null && equipItemLabelDisp == false &&
      ITEMBOX_PLAYER_CLASS_DATA != null){
        ITEMBOX_EQUIP_ITEM_TEXT_OBJ = null;
        ITEMBOX_EQUIP_ITEM_TEXT_OBJ = new Object();//表示するテキストオブジェクトの配列
        if(isset(ITEMBOX_PLAYER_CLASS_DATA["class_name"])){
          ITEMBOX_EQUIP_ITEM_TEXT_OBJ["クラス:"] = ITEMBOX_PLAYER_CLASS_DATA["class_name"];
        }
        if(isset(PLAYER_INFO["player_level"])){
          ITEMBOX_EQUIP_ITEM_TEXT_OBJ["レベル:"] = PLAYER_INFO["player_level"];
        }
        if(Array.isArray(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS)){
          for(var i=0; i < MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS.length; i++){
            var equipCategoryFlag = false;
            var keyName = MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['equip_name'] + ":";
            for (key in ITEMBOX_PLAYER_EQUIP_ITEM_DISP) {
              if(isset(ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['item_name']) && isset(ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id'])){
                if(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['id'] == ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id']){
                  ITEMBOX_EQUIP_ITEM_TEXT_OBJ[keyName] = ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['item_name'];
                  equipCategoryFlag = true;
                }
              }
            }
            if(equipCategoryFlag == false){ //何も装備されていなかった場合
              ITEMBOX_EQUIP_ITEM_TEXT_OBJ[keyName] = "なし";
            }
          }
        }
        for (key in ITEMBOX_EQUIP_ITEM_TEXT_OBJ) {
          ITEMBOX_EQUIP_ITEM_LABEL.text = (ITEMBOX_EQUIP_ITEM_LABEL.text + "\n") + (key + ITEMBOX_EQUIP_ITEM_TEXT_OBJ[key]);
        }
        equipItemLabelDisp = true;
      }

      if(ITEMBOX_EQUIP_ITEM_LABEL_RELOAD == true && ITEMBOX_RELOAD_FLAG == false){ //再読込の場合
        if(PLAYER_STATUS != null && ITEMBOX_PLAYER_STAMINA_DATA != null && ITEMBOX_PLAYER_VITALITY_DATA != null &&
        ITEMBOX_PLAYER_CLASS_DATA != null){
          ITEMBOX_EQUIP_ITEM_LABEL.text = "";
          ITEMBOX_EQUIP_ITEM_TEXT_OBJ = null;
          ITEMBOX_EQUIP_ITEM_TEXT_OBJ = new Object();//表示するテキストオブジェクトの配列
          if(isset(ITEMBOX_PLAYER_CLASS_DATA["class_name"])){
            ITEMBOX_EQUIP_ITEM_TEXT_OBJ["クラス:"] = ITEMBOX_PLAYER_CLASS_DATA["class_name"];
          }
          if(isset(PLAYER_INFO["player_level"])){
            ITEMBOX_EQUIP_ITEM_TEXT_OBJ["レベル:"] = PLAYER_INFO["player_level"];
          }
          if(Array.isArray(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS)){
            for(var i=0; i < MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS.length; i++){
              var equipCategoryFlag = false;
              var keyName = MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['equip_name'] + ":";
              for (key in ITEMBOX_PLAYER_EQUIP_ITEM_DISP) {
                if(isset(ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['item_name']) && isset(ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id'])){
                  if(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['id'] == ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id']){
                    ITEMBOX_EQUIP_ITEM_TEXT_OBJ[keyName] = ITEMBOX_PLAYER_EQUIP_ITEM_DISP[key]['item_name'];
                    equipCategoryFlag = true;
                  }
                }
              }
              if(equipCategoryFlag == false){ //何も装備されていなかった場合
                ITEMBOX_EQUIP_ITEM_TEXT_OBJ[keyName] = "なし";
              }
            }
          }
          for (key in ITEMBOX_EQUIP_ITEM_TEXT_OBJ) {
            ITEMBOX_EQUIP_ITEM_LABEL.text = (ITEMBOX_EQUIP_ITEM_LABEL.text + "\n") + (key + ITEMBOX_EQUIP_ITEM_TEXT_OBJ[key]);
          }
          equipItemLabelDisp = true;
        }
        ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = false;
      }
    }
    //タブがトリガーのアップデート関数
    ITEMBOX_CATEGORY_TAB_BASE.update = function(){
      if(ITEMBOX_CATEGORY_TAB_BASE != null){
        //初期に表示されるタブの初期化
        if(ITEMBOX_START_TAB_INIT == false && ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS != null && ITEMBOX_PLAYER_ITEM_DATAS != null
          && ITEMBOX_CARD_INVENTORY_DATAS != null && ITEMBOX_PLAYER_MONEY_ITEM_DATAS != null && ITEMBOX_PLAYER_AVATAR_ITEM_DATA != null){ //装備品タブのため、装備品情報が取得出来ているかチェック
          //初期は武器1のカテゴリーを表示
          G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(1,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
            ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//装備品カラムを生成
          //他のタブは非表示にしておく
          G_ITEM_COLUMN_CREATE(-1,ITEMBOX_COLUMN_NORMAL,ITEMBOX_COLUMN_TEXT_NORMAL,ITEMBOX_COLUMN_ICON,ITEMBOX_PLAYER_MONEY_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //通常カラムを表示

          G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(-1,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_CARD_ITEM,
            ITEMBOX_COLUMN_TEXT_CARD_ITEM,ITEMBOX_CARD_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//ロールカラムを非表示

          G_ITEM_COLUMN_CREATE(-1,ITEMBOX_COLUMN_ITEM,ITEMBOX_COLUMN_ITEM_TEXT,ITEMBOX_COLUMN_ITEM_ICON,ITEMBOX_PLAYER_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//アイテムカラム非表示

          G_IMPORTANT_ITEM_COLUMN_CREATE(-1,ITEMBOX_COLUMN_IMPORTANT_ITEM,ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM,ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM,
            ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//その他カラムを非表示
          ITEMBOX_START_TAB_INIT = true;
          //ページ数の更新
          var getEquipItemPageInit = G_GET_ITEMBOX_EQUIP_ITEM_MAX_PAGE(1,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = "1/" + getEquipItemPageInit;

        }
        if(ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER != -1){
          var tabIndex = ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER;
          G_SELECT_OPTION_BUTTON_INIT(); //ボタンによって更新された値を初期化
          ITEMBOX_CATEGORY_TAB_SWITCH = tabIndex; //選択中のタブ更新
          for (var i = 0; i < ITEMBOX_CATEGORY_TAB.length; i++) {
            if(tabIndex != i){
              ITEMBOX_CATEGORY_TAB[i].visible = false;
              ITEMBOX_BOX_FRAME[i].visible = false;
            }
            else{
              ITEMBOX_CATEGORY_TAB[i].visible = true;
              ITEMBOX_BOX_FRAME[i].visible = true;
            }
          }
          G_ITEMBOX_RESET_SWITCH(tabIndex);//タブ切替のため、各アイテムボックスの初期化
          ITEMBOX_CATEGORY_TAB_BUTTON_NUMBER = -1;
        }

        //タブ選択中の処理------------------------------------------------
        switch (ITEMBOX_CATEGORY_TAB_SWITCH) {
          case 0: //装備タブ選択中
          {
            //装備ボタンを押した時
            if(ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER != -1){
              if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外の場合
                var itemIndexId = G_CREATE_EQUIP_ITEM_WINDOW(
                  ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
              }
              else{ //アバターの場合
                var itemIndexId = G_CREATE_EQUIP_AVATAR_ITEM_WINDOW(
                  ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_PLAYER_AVATAR_ITEM_DATA);
              }
              ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = -1;
            }
            //売却ボタンを押した時
            if(ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER != -1){
              if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外の場合
                var itemIndexId = G_CREATE_EQUIP_ITEM_SELL_WINDOW(
                  ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
              }
              else{ //アバターの場合
                if(WINDOW_NORMAL == null) G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"警告","アバターは売却できません",2,"windowAvatarSell");
              }
              ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = -1;
            }
          }
          break;
          case 1: //通貨タブ選択中
            break;
          case 2: //ロールタブ選択中
            break;
          case 3: //アイテムタブ
          {
            //使用ボタンを押した時
            if(ITEMBOX_ITEM_USE_BUTTON_NUMBER != -1){
              G_CREATE_ITEM_USE_WINDOW(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_PLAYER_ITEM_DATAS);
              ITEMBOX_ITEM_USE_BUTTON_NUMBER = -1;
            }
            //売却ボタンを押した時
            if(ITEMBOX_ITEM_SELL_BUTTON_NUMBER != -1){
              G_CREATE_ITEM_SELL_WINDOW(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_PLAYER_ITEM_DATAS);
              ITEMBOX_ITEM_SELL_BUTTON_NUMBER = -1;
            }
          }
          break;
          case 4: //その他タブ
            break;
          default:
            break;
        }

        if(ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG == true && ITEMBOX_RELOAD_FLAG == false){ //リロード後ん表示するアイテムボックス
          switch (ITEMBOX_CATEGORY_TAB_SWITCH) {
            case 0:
            if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外
              G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
                ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
            }
            else{ //アバターの場合
              G_ITEMBOX_AVATAR_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
                ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_PLAYER_AVATAR_ITEM_DATA,ITEMBOX_COLUMN_NONE_TEXT); //カラムを生成
            }
              break;
            case 1:
              break;
            case 2:
              break;
            case 3:
            G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_ITEM,ITEMBOX_COLUMN_ITEM_TEXT,
                ITEMBOX_COLUMN_ITEM_ICON,ITEMBOX_PLAYER_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);
              break
            case 4:
              break;
            default:
              break;
          }
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = false;
        }
      }
    }

    //ウィンドウ表示用ノード
    ITEMBOX_WINDOW_NODE = Label({
      text: '',
    }).addChildTo(this);
    ITEMBOX_WINDOW_NODE.x = this.gridX.center();
    ITEMBOX_WINDOW_NODE.y = this.gridY.center();
    NETWORK_IS_CONNECTING = true;//通信開始
    ajaxStart("post","json","../../client/itemBox/itemBox.php",null); //非同期通信開始
  },
  update: function() {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["player_master"])){
            PLAYER_MASTER = json["player_master"];//プレイヤーマスターデータを更新
          }
          if(isset(json["player_info"])){
            PLAYER_INFO = json["player_info"];//プレイヤー情報を更新
          }
          if(isset(json["player_status"])){
            PLAYER_STATUS = json["player_status"];//プレイヤーステータスを更新
          }
          if(isset(json["player_equip_item_disp"])){
            ITEMBOX_PLAYER_EQUIP_ITEM_DISP = json["player_equip_item_disp"];//プレイヤーの装備品表示用データ
          }
          if(isset(json['player_avatar_data'])){ //プレイヤーが所持しているアバターデータ
            ITEMBOX_PLAYER_AVATAR_DATA = json['player_avatar_data'];
          }
          if(isset(json["player_stamina_data"])){
            ITEMBOX_PLAYER_STAMINA_DATA = json["player_stamina_data"];//プレイヤーの現在のスタミナ
          }
          if(isset(json["player_vitality_data"])){
            ITEMBOX_PLAYER_VITALITY_DATA = json["player_vitality_data"];//プレイヤーの現在の生命力
          }
          if(isset(json["vitality_penalty"])){
            ITEMBOX_PLAYER_VITALITY_PENALTY = json["vitality_penalty"];//生命力ペナルティー
          }
          if(isset(json["player_class_data"])){
            ITEMBOX_PLAYER_CLASS_DATA = json["player_class_data"];
          }
          if(isset(json['player_equip_item_inventory_disp'])){
            ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS = json['player_equip_item_inventory_disp'];
          }
          if(isset(json['player_card_data'])){
            ITEMBOX_CARD_INVENTORY_DATAS = json['player_card_data'];
          }
          if(isset(json['player_money_item_data'])){
            console.log("通貨データ");
            console.log(json['player_money_item_data']);
            ITEMBOX_PLAYER_MONEY_ITEM_DATAS = json['player_money_item_data']; //通貨データ
          }
          if(isset(json['player_item_data'])){
            ITEMBOX_PLAYER_ITEM_DATAS = json['player_item_data']; //消費アイテムデータ
          }
          if(isset(json['player_important_item_data'])){
            ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS = json['player_important_item_data']; //重要アイテムデータ
          }
          if(isset(json['player_avatar_items'])){ //アバターアイテムデータ
            ITEMBOX_PLAYER_AVATAR_ITEM_DATA = json['player_avatar_items'];
          }
          if(isset(json['result_change_avatar']) && isset(json['result_change_avatar']['error'])){ //アバター着せ替え結果
            if(json['result_change_avatar']['error'] != 0){ //エラーが発生
              G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"エラー",json['result_change_avatar']['error_comment'],0,"windowResultChangeAvatarError");
            }
          }
          //表示アバターは毎回更新する
          if(ITEMBOX_PLAYER_EQUIP_ITEM_DISP != null && ITEMBOX_PLAYER_AVATAR_DATA != null){
            ITEMBOX_AVATAR_LOAD = true;
          }
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "itemBox";
        this.exit("title");
      }
      if(ITEMBOX_RELOAD_FLAG == true){
        ITEMBOX_RELOAD_FLAG = false;
      }
      NETWORK_IS_CONNECTING = false;//通信終了
      RESULT_DATA = "";//通信結果を初期化
    }
    //シーン初期化判定
    if(ITEMBOX_AVATAR_LOAD == true && ASSET_LOADING == false){
      ITEMBOX_AVATAR_LOAD = false;
      G_ITEM_BOX_AVATAR_DISP(ITEMBOX_AVATAR_WINDOW,ITEMBOX_PLAYER_AVATAR_DATA,ITEMBOX_PLAYER_EQUIP_ITEM_DISP);
    }
    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(isset(WINDOW_RETURN_VAL['windowEquipAvatarItemSelect'])){
        if(WINDOW_RETURN_VAL['windowEquipAvatarItemSelect'] == "yes"){ //装備するを選択した場合
          var postParamVal = new Object();
          postParamVal['equip_select_equip_avatar_item_master_id'] = ITEMBOX_SELECT_EQUIP_AVATAR_ITEM_MASTER_ID;
          ITEMBOX_EQUIP_INFO_RELOAD_FLAG = true; //再通信が起こった時の装備情報リロードフラグ
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = true; //再通信が起こった時の装備品ボックスのリロードフラグ
          ITEMBOX_RELOAD_FLAG = true;
          ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = true;
          RESULT_DATA = "";
          NETWORK_IS_CONNECTING = true;//通信開始
          ajaxStart("post","json","../../client/itemBox/itemBox.php",postParamVal); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowEquipItemSelect'])){
        if(WINDOW_RETURN_VAL['windowEquipItemSelect'] == "yes"){ //装備するを選択した場合
          var postParamVal = new Object();
          postParamVal['equip_select_equip_item_master_id'] = ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID;
          ITEMBOX_EQUIP_INFO_RELOAD_FLAG = true; //再通信が起こった時の装備情報リロードフラグ
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = true; //再通信が起こった時の装備品ボックスのリロードフラグ
          ITEMBOX_RELOAD_FLAG = true;
          ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = true;
          RESULT_DATA = "";
          NETWORK_IS_CONNECTING = true;//通信開始
          ajaxStart("post","json","../../client/itemBox/itemBox.php",postParamVal); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowSellEquipItemSelect'])){
        if(WINDOW_RETURN_VAL['windowSellEquipItemSelect'] == "yes"){ //売却するを選択した場合
          var postParamVal = new Object();
          postParamVal['sell_select_equip_item_master_id'] = ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID;
          ITEMBOX_EQUIP_INFO_RELOAD_FLAG = true; //再通信が起こった時の装備情報リロードフラグ
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = true; //再通信が起こった時の装備品ボックスのリロードフラグ
          ITEMBOX_RELOAD_FLAG = true;
          ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = true;
          RESULT_DATA = "";
          NETWORK_IS_CONNECTING = true;//通信開始
          ajaxStart("post","json","../../client/itemBox/itemBox.php",postParamVal); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowAvatarSell'])){
        if(WINDOW_RETURN_VAL['windowAvatarSell'] == "ok"){
          //アバター売却警告
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowUseItemSelect'])){
        if(WINDOW_RETURN_VAL['windowUseItemSelect'] == "yes"){ //使用するを選択した場合
          var postParamVal = new Object();
          postParamVal['use_item_master_id'] = ITEMBOX_SELECT_ITEM_MASTER_ID;
          ITEMBOX_EQUIP_INFO_RELOAD_FLAG = true; //再通信が起こった時の装備情報リロードフラグ
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = true; //再通信が起こった時の装備品ボックスのリロードフラグ
          ITEMBOX_RELOAD_FLAG = true;
          ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = true;
          RESULT_DATA = "";
          NETWORK_IS_CONNECTING = true;//通信開始
          ajaxStart("post","json","../../client/itemBox/itemBox.php",postParamVal); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowSellItemSelect'])){
        if(WINDOW_RETURN_VAL['windowSellItemSelect'] == "yes"){ //使用するを選択した場合
          var postParamVal = new Object();
          postParamVal['sell_item_master_id'] = ITEMBOX_SELECT_ITEM_MASTER_ID;
          ITEMBOX_EQUIP_INFO_RELOAD_FLAG = true; //再通信が起こった時の装備情報リロードフラグ
          ITEMBOX_EQUIP_ITEM_BOX_RELOAD_FLAG = true; //再通信が起こった時の装備品ボックスのリロードフラグ
          ITEMBOX_RELOAD_FLAG = true;
          ITEMBOX_EQUIP_ITEM_LABEL_RELOAD = true;
          RESULT_DATA = "";
          NETWORK_IS_CONNECTING = true;//通信開始
          ajaxStart("post","json","../../client/itemBox/itemBox.php",postParamVal); //非同期通信開始
        }
      }
      WINDOW_RETURN_VAL = null;
    }
    if(ITEMBOX_UI_BTN_NUMBER != -1){ //通常ボタンの何かが押された場合
      switch (ITEMBOX_UI_BTN_NUMBER) {
        case 1: //戻るボタン
        SCENE_MANAGER['prev_scene'] = "itemBox";
        this.exit("myPage");
          break;
        case 2: //???
          break;
        default:

      }
      UI_BTN_NUMBER = -1;
    }
  },
});

function G_ITEMBOX_EQUIP_CATEGORY_BTN_PUSH(btnIndex,equipCategoryId,categoryTabSwitch,boxFrames){ //装備カテゴリーボタンを押した時の処理
  if(categoryTabSwitch == 0){ //装備品タブ選択中の場合のみ
    ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH = equipCategoryId;
    for (var i = 0; i < boxFrames.length; i++) {
      if(btnIndex != i){
        boxFrames[i].visible = false;
      }
      else{
        boxFrames[i].visible = true;
      }
    }
    ITEMBOX_ITEM_BOX_PAGE_NUMBER = 1;//ページを初期化
    if(equipCategoryId != 10){ //アバター以外
      //最大ページ数更新
      var updateEquipItemMaxPage = G_GET_ITEMBOX_EQUIP_ITEM_MAX_PAGE(equipCategoryId,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
      ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + updateEquipItemMaxPage;
      //カラム更新
      G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(equipCategoryId,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
        ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
    }
    else{ //アバターの場合
      //最大ページ数更新
      var updateAvatarItemMaxPage = G_GET_ITEMBOX_AVATAR_ITEM_MAX_PAGE(ITEMBOX_PLAYER_AVATAR_ITEM_DATA);
      ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + updateAvatarItemMaxPage;
      //カラム更新
      G_ITEMBOX_AVATAR_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
        ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_PLAYER_AVATAR_ITEM_DATA,ITEMBOX_COLUMN_NONE_TEXT); //カラムを生成
    }
  }
}

function G_ITEMBOX_CARD_CATEGORY_BTN_PUSH(btnIndex,weaponCategoryId,categoryTabSwitch,boxFrames){ //ロールカテゴリーボタンを押した時の処理
  if(categoryTabSwitch == 2){ //装備品タブ選択中の場合のみ
    ITEMBOX_CARD_CATEGORY_TAB_SWITCH = weaponCategoryId;
    for (var i = 0; i < boxFrames.length; i++) {
      if(btnIndex != i){
        boxFrames[i].visible = false;
      }
      else{
        boxFrames[i].visible = true;
      }
    }
    ITEMBOX_ITEM_BOX_PAGE_NUMBER = 1;//ページを初期化
    //最大ページ数更新
    var updateCardMaxPage = G_GET_ITEMBOX_CARD_ITEM_MAX_PAGE(weaponCategoryId,ITEMBOX_CARD_INVENTORY_DATAS);
    ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + updateCardMaxPage;
    //カラム更新
    G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(weaponCategoryId,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_CARD_ITEM,
      ITEMBOX_COLUMN_TEXT_CARD_ITEM,ITEMBOX_CARD_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
  }
}

function G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(equipCategoryId,pageNumber,columnSprite,avatarColumnSprite,columnEquipUnsetSprite,columnText,columnIcon,equipItemInventorys,columnTextNone){ //装備品情報のカラムを表示
  if(columnSprite != null){
    //カラム初期化
    for (var i = 0; i < columnSprite.length; i++) {
      columnSprite[i].visible = false;
      avatarColumnSprite[i].visible = false;
      columnEquipUnsetSprite[i].visible = false;
      columnText[i].visible = false;
      columnIcon[i].remove();
    }
    var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
    var loopCount = 0; //whileのカウント
    var columnCount = 0; //カラムが表示可能になった数
    while (columnCount < columnSprite.length) {
      if(isset(equipItemInventorys[loopCount]) && pageStartCountInit <= loopCount){
        if(equipItemInventorys[loopCount]['equip_category_id'] == equipCategoryId){
          columnSprite[columnCount].visible = true;
          columnText[columnCount].visible = true;
          if(equipItemInventorys[loopCount]['equip_status'] == 2) columnEquipUnsetSprite[columnCount].visible = true; //装備中の場合
          var replaceParamText = "";
          replaceParamText = "所持数:" + equipItemInventorys[loopCount]['num'];
          if(isset(equipItemInventorys[loopCount]['equip_item_params'])){
            for (var j = 0; j < equipItemInventorys[loopCount]['equip_item_params'].length; j++) {
              var paramData = equipItemInventorys[loopCount]['equip_item_params'][j];
              var paramPoint = paramData['point_val'];
              var statusName = G_HELPER_GET_STATUS_NAME(paramData['status_id'],1);//ステータスIDを取得
              replaceParamText = replaceParamText + "[" + statusName + ":" + paramPoint + "]";
            }
          }
          columnText[columnCount].text = equipItemInventorys[loopCount]['item_name'] + ":" + "\n" + replaceParamText;
          //アイコン画像更新
          columnIcon[columnCount] = G_EQUIP_ITEM_GET_EQUIP_ITEM_ICON_SPRITE(equipItemInventorys[loopCount]['rank'],
          equipItemInventorys[loopCount]['weapon_category_id'],
          equipItemInventorys[loopCount]['sub_weapon_category_id'],
          equipItemInventorys[loopCount]['armor_category_id']);
          columnIcon[columnCount].addChildTo(columnSprite[columnCount]);
          columnIcon[columnCount].x = columnSprite[columnCount].x * -0.89;
          columnIcon[columnCount].setScale(0.5);
          columnCount = columnCount + 1;
        }
      }
      loopCount = loopCount + 1;
      if(equipItemInventorys.length < loopCount){
        break;
      }
    }
    if(columnCount == 0){ //カラムが何も無かった場合
      columnTextNone.visible = true;//表示する物がない場合、表示
    }
    else{
      columnTextNone.visible = false;
    }
  }
}

function G_ITEMBOX_AVATAR_COLUMN_CREATE(pageNumber,columnSprite,avatarColumnSprite,columnEquipUnsetSprite,columnText,columnIcon,playerAvatarItems,columnTextNone){ //アバター情報のカラムを追加
  if(columnSprite != null){
    //カラム初期化
    for (var i = 0; i < columnSprite.length; i++) {
      columnSprite[i].visible = false;
      avatarColumnSprite[i].visible = false;
      columnEquipUnsetSprite[i].visible = false;
      columnText[i].visible = false;
      columnIcon[i].remove();
    }
    var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
    var loopCount = 0; //whileのカウント
    var columnCount = 0; //カラムが表示可能になった数
    while (columnCount < columnSprite.length) {
      if(isset(playerAvatarItems[loopCount]) && pageStartCountInit <= loopCount){
        columnSprite[columnCount].visible = true;
        avatarColumnSprite[columnCount].visible = true;
        columnText[columnCount].visible = true;
        columnText[columnCount].text = playerAvatarItems[loopCount]['avatar_name'];
        //アイコン画像更新
        // columnIcon[columnCount] = Sprite('ASSET_' + playerAvatarItems[loopCount]['avatar_asset_id'],256,256).addChildTo(columnSprite[columnCount]);
        // columnIcon[columnCount].setFrameIndex(0);
        // columnIcon[columnCount].x = columnSprite[columnCount].x * -0.89;
        // columnIcon[columnCount].y = columnIcon[columnCount].y - ((columnIcon[columnCount].height * 0.5) / 3);
        // columnIcon[columnCount].setScale(0.5);
        columnCount = columnCount + 1;
      }
      loopCount = loopCount + 1;
      if(playerAvatarItems.length < loopCount){
        break;
      }
    }
    if(columnCount == 0){ //カラムが何も無かった場合
      columnTextNone.visible = true;//表示する物がない場合、表示
    }
    else{
      columnTextNone.visible = false;
    }
  }
}

function G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(weaponCategoryId,pageNumber,columnSprite,columnText,cardInventorys,columnTextNone){ //装備品情報のカラムを表示
  if(columnSprite != null){
    //カラム初期化
    for (var i = 0; i < columnSprite.length; i++) {
      columnSprite[i].visible = false;
      columnText[i].visible = false;
    }
    if(weaponCategoryId != -1){ //非表示ではない場合
      var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
      var loopCount = 0; //whileのカウント
      var columnCount = 0; //カラムが表示可能になった数
      while (columnCount < columnSprite.length) {
        if(isset(cardInventorys[loopCount]) && pageStartCountInit <= loopCount){
          if(cardInventorys[loopCount]['weapon_category_id'] == weaponCategoryId){
            columnSprite[columnCount].visible = true;
            columnText[columnCount].visible = true;
            var replaceParamText = "";
            if(isset(cardInventorys[loopCount]['card_rank']) && isset(cardInventorys[loopCount]['stamina_point'])){
              replaceParamText = "ランク:" + cardInventorys[loopCount]['card_rank'] + ":消費スタミナ:" + cardInventorys[loopCount]['stamina_point'];
            }
            columnText[columnCount].text = cardInventorys[loopCount]['card_name'] + ":" + "\n" + replaceParamText;
            columnCount = columnCount + 1;
          }
        }
        loopCount = loopCount + 1;
        if(cardInventorys.length < loopCount){
          break;
        }
      }
      if(columnCount == 0){ //カラムが何も無かった場合
        columnTextNone.visible = true;//表示する物がない場合、表示
      }
      else{
        columnTextNone.visible = false;
      }
    }
  }
}

function G_ITEM_COLUMN_CREATE(pageNumber,columnSprite,columnText,columnIcon,itemInventorys,columnTextNone){ //消費アイテムのカラムを表示
  //カラム初期化
  for (var i = 0; i < columnSprite.length; i++) {
    columnSprite[i].visible = false;
    columnText[i].visible = false;
    columnIcon[i].remove();
  }
  if(columnSprite != null && pageNumber != -1){
    var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
    var loopCount = 0; //whileのカウント
    var columnCount = 0; //カラムが表示可能になった数
    while (columnCount < columnSprite.length) {
      if(isset(itemInventorys[loopCount]) && pageStartCountInit <= loopCount){
        columnSprite[columnCount].visible = true;
        columnText[columnCount].visible = true;
        columnText[columnCount].text = itemInventorys[loopCount]['item_name'] + ":" + "\n" + "所持数：" + itemInventorys[loopCount]['item_val'];
        //アイコン画像更新
        columnIcon[columnCount] = Sprite('ASSET_' + itemInventorys[loopCount]['asset_id']).addChildTo(columnSprite[columnCount]);
        columnIcon[columnCount].x = columnSprite[columnCount].x * -0.89;
        columnIcon[columnCount].setScale(0.5);
        columnCount = columnCount + 1;
      }
      loopCount = loopCount + 1;
      if(itemInventorys.length < loopCount){
        break;
      }
    }
    if(columnCount == 0){ //カラムが何も無かった場合
      columnTextNone.visible = true;//表示する物がない場合、表示
    }
    else{
      columnTextNone.visible = false;
    }
  }
}

function G_CREATE_EQUIP_ITEM_WINDOW(equipCategoryId,pageNumber,equipItemInventorys){//装備するウィンドウを表示
  ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = 0; //選択アイテム変数を初期化
  var resultIndexId = 0;
  var pageStartCountInit = ((pageNumber - 1) * 5);
  var columnCount = 0; //カラムが表示可能になった数
  var loopCount = 0; //whileのカウント
  while (columnCount < 5) {
    if(isset(equipItemInventorys[loopCount]) && pageStartCountInit <= loopCount){
      if(equipItemInventorys[loopCount]['equip_category_id'] == equipCategoryId){
        if(ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER == columnCount){ //選択したボタンと一緒のインデックスか
          resultIndexId = equipItemInventorys[loopCount]['id']; //装備品のマスターIDを代入
          ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = resultIndexId; //選択中のプレイヤー装備品IDを更新
          var changeWindowText = "を装備しますか？";
          var changeWindowTitleText = "アイテム装備";
          if(equipItemInventorys[loopCount]['equip_status'] == 2){ //装備しているアイテムの場合
            changeWindowText = "を外しますか？";
            changeWindowTitleText = "アイテム装備解除";
          }
          var windowMainText = "「" + equipItemInventorys[loopCount]['item_name'] + "」" + changeWindowText;
          G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,changeWindowTitleText,windowMainText,1,"windowEquipItemSelect");
        }
        columnCount = columnCount + 1;
      }
    }
    loopCount = loopCount + 1;
    if(equipItemInventorys.length < loopCount){
      break;
    }
  }
  return resultIndexId;
}

function G_CREATE_EQUIP_AVATAR_ITEM_WINDOW(equipCategoryId,pageNumber,playerAvatarDatas){//装備するウィンドウを表示
  ITEMBOX_SELECT_EQUIP_AVATAR_ITEM_MASTER_ID = 0; //選択アイテム変数を初期化
  var resultIndexId = 0;
  var pageStartCountInit = ((pageNumber - 1) * 5);
  var columnCount = 0; //カラムが表示可能になった数
  var loopCount = 0; //whileのカウント
  while (columnCount < 5) {
    if(isset(playerAvatarDatas[loopCount]) && pageStartCountInit <= loopCount){
      if(ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER == columnCount){ //選択したボタンと一緒のインデックスか
        resultIndexId = playerAvatarDatas[loopCount]['u_id']; //装備品のマスターIDを代入
        ITEMBOX_SELECT_EQUIP_AVATAR_ITEM_MASTER_ID = resultIndexId; //選択中のプレイヤーアバターIDを更新
        var windowMainText = "「" + playerAvatarDatas[loopCount]['avatar_name'] + "」を装備しますか？"
        G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"アバター装備",windowMainText,1,"windowEquipAvatarItemSelect");
      }
      columnCount = columnCount + 1;
    }
    loopCount = loopCount + 1;
    if(playerAvatarDatas.length < loopCount){
      break;
    }
  }
  return resultIndexId;
}

function G_CREATE_EQUIP_ITEM_SELL_WINDOW(equipCategoryId,pageNumber,equipItemInventorys){//売却するウィンドウを取得
  ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = 0; //選択アイテム変数を初期化
  var resultIndexId = 0;
  var pageStartCountInit = ((pageNumber - 1) * 5);
  var columnCount = 0; //カラムが表示可能になった数
  var loopCount = 0; //whileのカウント
  while (columnCount < 5) {
    if(isset(equipItemInventorys[loopCount]) && pageStartCountInit <= loopCount){
      if(equipItemInventorys[loopCount]['equip_category_id'] == equipCategoryId){
        if(ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER == columnCount){ //選択したボタンと一緒のインデックスか
          resultIndexId = equipItemInventorys[loopCount]['id']; //装備品のマスターIDを代入
          ITEMBOX_SELECT_EQUIP_ITEM_MASTER_ID = resultIndexId; //選択中のプレイヤー装備品IDを更新
          var windowMainText = "「" + equipItemInventorys[loopCount]['item_name'] + "」を売却しますか？"
          G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"アイテム売却",windowMainText,1,"windowSellEquipItemSelect");
        }
        columnCount = columnCount + 1;
      }
    }
    loopCount = loopCount + 1;
    if(equipItemInventorys.length < loopCount){
      break;
    }
  }
  return resultIndexId;
}

function G_CREATE_ITEM_USE_WINDOW(pageNumber,itemInventorys){//アイテム使用するウィンドウを表示
  ITEMBOX_SELECT_ITEM_MASTER_ID = 0; //選択アイテム変数を初期化
  var resultIndexId = 0;
  var pageStartCountInit = ((pageNumber - 1) * 5);
  var columnCount = 0; //カラムが表示可能になった数
  var loopCount = 0; //whileのカウント
  while (columnCount < 5) {
    if(isset(itemInventorys[loopCount]) && pageStartCountInit <= loopCount){
      if(ITEMBOX_ITEM_USE_BUTTON_NUMBER == columnCount){ //選択したボタンと一緒のインデックスか
        resultIndexId = itemInventorys[loopCount]['id']; //アイテムのマスターIDを代入
        ITEMBOX_SELECT_ITEM_MASTER_ID = itemInventorys[loopCount]['id']; //選択中のアイテムIDを更新
        var windowMainText = "「" + itemInventorys[loopCount]['item_name'] + "」を使用しますか？"
        G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"アイテム使用",windowMainText,1,"windowUseItemSelect");
      }
      columnCount = columnCount + 1;
    }
    loopCount = loopCount + 1;
    if(itemInventorys.length < loopCount){
      break;
    }
  }
  return resultIndexId;
}

function G_CREATE_ITEM_SELL_WINDOW(pageNumber,itemInventorys){//アイテム売却するウィンドウを取得
  ITEMBOX_SELECT_ITEM_MASTER_ID = 0; //選択アイテム変数を初期化
  var resultIndexId = 0;
  var pageStartCountInit = ((pageNumber - 1) * 5);
  var columnCount = 0; //カラムが表示可能になった数
  var loopCount = 0; //whileのカウント
  while (columnCount < 5) {
    if(isset(itemInventorys[loopCount]) && pageStartCountInit <= loopCount){
      if(ITEMBOX_ITEM_SELL_BUTTON_NUMBER == columnCount){ //選択したボタンと一緒のインデックスか
        resultIndexId = itemInventorys[loopCount]['id']; //装備品のマスターIDを代入
        ITEMBOX_SELECT_ITEM_MASTER_ID = itemInventorys[loopCount]['id']; //選択中のアイテムIDを更新
        var windowMainText = "「" + itemInventorys[loopCount]['item_name'] + "」を売却しますか？"
        G_NORMAL_WINDOW_CREATE(ITEMBOX_WINDOW_NODE,"アイテム売却",windowMainText,1,"windowSellItemSelect");
      }
      columnCount = columnCount + 1;
    }
    loopCount = loopCount + 1;
    if(itemInventorys.length < loopCount){
      break;
    }
  }
  return resultIndexId;
}

function G_GET_ITEMBOX_EQUIP_ITEM_MAX_PAGE(equipCategoryId,equipItemInventorys){ //選択中の装備品カテゴリーの最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < equipItemInventorys.length; i++) {
    if(equipItemInventorys[i]['equip_category_id'] == equipCategoryId){
      count = count + 1;
    }
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_GET_ITEMBOX_AVATAR_ITEM_MAX_PAGE(playerAvatarDatas){ //アバターカテゴリーの最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < playerAvatarDatas.length; i++) {
      count = count + 1;
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_GET_ITEMBOX_CARD_ITEM_MAX_PAGE(weaponCategoryId,cardInventorys){ //選択中のロールカテゴリーの最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < cardInventorys.length; i++) {
    if(cardInventorys[i]['weapon_category_id'] == weaponCategoryId){
      count = count + 1;
    }
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_ITEMBOX_PAGE_CONTROLLER(pageSwitch){ //ページ切替が行われた時に呼び出される
  if(WINDOW_NORMAL == null){
    switch (ITEMBOX_CATEGORY_TAB_SWITCH) {
      case 0: //装備品タブ
      {
        if(ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS != null){
          var maxPage = 1;
          if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外の場合
            maxPage = G_GET_ITEMBOX_EQUIP_ITEM_MAX_PAGE(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
          }
          else{ //アバターの場合
            maxPage = G_GET_ITEMBOX_AVATAR_ITEM_MAX_PAGE(ITEMBOX_PLAYER_AVATAR_ITEM_DATA);
          }
          var newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
          if(pageSwitch == true){ //進む
            newPage = newPage + 1;
            if(maxPage < newPage){
              newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
            }
          }
          else{ //戻る
            newPage = newPage - 1;
            if(newPage < 1){
              newPage = 1;
            }
          }

          if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外の場合
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
              ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
          }
          else{ //アバターの場合
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEMBOX_AVATAR_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
              ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_PLAYER_AVATAR_ITEM_DATA,ITEMBOX_COLUMN_NONE_TEXT);
          }
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
        }
      }
        break;
      case 1: //通貨タブ
      {
        if(ITEMBOX_PLAYER_ITEM_DATAS != null){
          var maxPage = G_GET_PLAYER_ITEM_MAX_PAGE(ITEMBOX_PLAYER_ITEM_DATAS);
          var newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
          if(pageSwitch == true){ //進む
            newPage = newPage + 1;
            if(maxPage < newPage){
              newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_NORMAL,
              ITEMBOX_COLUMN_TEXT_NORMAL,ITEMBOX_COLUMN_ICON,ITEMBOX_PLAYER_MONEY_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //通常カラムを表示
          }
          else{ //戻る
            newPage = newPage - 1;
            if(newPage < 1){
              newPage = 1;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_NORMAL,
              ITEMBOX_COLUMN_TEXT_NORMAL,ITEMBOX_COLUMN_ICON,ITEMBOX_PLAYER_MONEY_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //通常カラムを表示
          }
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
        }
      }
        break;
      case 2: //ロール
      {
        if(ITEMBOX_CARD_INVENTORY_DATAS != null){
          var maxPage = G_GET_ITEMBOX_CARD_ITEM_MAX_PAGE(ITEMBOX_CARD_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_INVENTORY_DATAS);
          var newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
          if(pageSwitch == true){ //進む
            newPage = newPage + 1;
            if(maxPage < newPage){
              newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(ITEMBOX_CARD_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_CARD_ITEM,
              ITEMBOX_COLUMN_TEXT_CARD_ITEM,ITEMBOX_CARD_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
          }
          else{ //戻る
            newPage = newPage - 1;
            if(newPage < 1){
              newPage = 1;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(ITEMBOX_CARD_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_CARD_ITEM,
              ITEMBOX_COLUMN_TEXT_CARD_ITEM,ITEMBOX_CARD_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
          }
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
        }
      }
        break;
      case 3: //アイテム
      {
        if(ITEMBOX_PLAYER_ITEM_DATAS != null){
          var maxPage = G_GET_ITEMBOX_ITEM_MAX_PAGE(ITEMBOX_PLAYER_ITEM_DATAS);
          var newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
          if(pageSwitch == true){ //進む
            newPage = newPage + 1;
            if(maxPage < newPage){
              newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_ITEM,ITEMBOX_COLUMN_ITEM_TEXT,
              ITEMBOX_COLUMN_ITEM_ICON,ITEMBOX_PLAYER_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);
          }
          else{ //戻る
            newPage = newPage - 1;
            if(newPage < 1){
              newPage = 1;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_ITEM,ITEMBOX_COLUMN_ITEM_TEXT,
              ITEMBOX_COLUMN_ITEM_ICON,ITEMBOX_PLAYER_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);
          }
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
        }
      }
        break;
      case 4: //その他タブ
      {
        if(ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS != null){
          var maxPage = G_GET_PLAYER_IMPORTANT_ITEM_MAX_PAGE(ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS);
          var newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
          if(pageSwitch == true){ //進む
            newPage = newPage + 1;
            if(maxPage < newPage){
              newPage = ITEMBOX_ITEM_BOX_PAGE_NUMBER;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_IMPORTANT_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_IMPORTANT_ITEM,
              ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM,ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM,ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //重要アイテムカラムを表示
          }
          else{ //戻る
            newPage = newPage - 1;
            if(newPage < 1){
              newPage = 1;
            }
            ITEMBOX_ITEM_BOX_PAGE_NUMBER = newPage;
            G_IMPORTANT_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_IMPORTANT_ITEM,
              ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM,ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM,ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //重要アイテムカラムを表示
          }
          ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
        }
      }
        break;
      default:
        break;
    }
  }
}

function G_ITEMBOX_RESET_SWITCH(selectTabIndex){ //選択されたタブ以外のボックスを消し、選択されたタブのボックスには初期化を行う
  if(selectTabIndex != 0){
    for (var i = 0; i < ITEMBOX_COLUMN_EQUIP_ITEM.length; i++) {
      ITEMBOX_COLUMN_EQUIP_ITEM[i].visible = false;
      ITEMBOX_COLUMN_TEXT_EQUIP_ITEM[i].text = "";
      ITEMBOX_COLUMN_TEXT_EQUIP_ITEM[i].visible = false;
      ITEMBOX_COLUMN_ICON_EQUIP_ITEM[i].remove();
    }
  }
  else{
    if(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH != 10){ //アバター以外
      //最大ページ数更新
      var maxPage = G_GET_ITEMBOX_EQUIP_ITEM_MAX_PAGE(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS);
      if(maxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = maxPage; //最大ページ数を超えていた場合修正
      ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;

      G_ITEMBOX_EQUIP_CATEGORY_COLUMN_CREATE(ITEMBOX_EQUIP_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
        ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_EQUIP_ITEM_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
    }
    else{ //アバターの場合
      //最大ページ数更新
      var updateAvatarItemMaxPage = G_GET_ITEMBOX_AVATAR_ITEM_MAX_PAGE(ITEMBOX_PLAYER_AVATAR_ITEM_DATA);
      if(updateAvatarItemMaxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = updateAvatarItemMaxPage; //最大ページ数を超えていた場合修正
      ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + updateAvatarItemMaxPage;

      G_ITEMBOX_AVATAR_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_EQUIP_ITEM,ITEMBOX_COLUMN_AVATAR_ITEM,ITEMBOX_COLUMN_EQUIP_ITEM_UNSET,
        ITEMBOX_COLUMN_TEXT_EQUIP_ITEM,ITEMBOX_COLUMN_ICON_EQUIP_ITEM,ITEMBOX_PLAYER_AVATAR_ITEM_DATA,ITEMBOX_COLUMN_NONE_TEXT); //カラムを生成
    }
  }
  if(selectTabIndex != 1){
    for(var i = 0; i < ITEMBOX_COLUMN_NORMAL.length; i++){
      ITEMBOX_COLUMN_NORMAL[i].visible = false;
      ITEMBOX_COLUMN_TEXT_NORMAL[i].text = "";
      ITEMBOX_COLUMN_TEXT_NORMAL[i].visible = false;
      ITEMBOX_COLUMN_ICON[i].remove();
    }
  }
  else{
    var maxPage = G_GET_PLAYER_ITEM_MAX_PAGE(ITEMBOX_PLAYER_ITEM_DATAS);
    if(maxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = maxPage; //最大ページ数を超えていた場合修正
    ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;

    G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_NORMAL,ITEMBOX_COLUMN_TEXT_NORMAL,
      ITEMBOX_COLUMN_ICON,ITEMBOX_PLAYER_MONEY_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //通常カラムを表示
  }
  if(selectTabIndex != 2){
    for (var i = 0; i < ITEMBOX_COLUMN_CARD_ITEM.length; i++) {
      ITEMBOX_COLUMN_CARD_ITEM[i].visible = false;
      ITEMBOX_COLUMN_TEXT_CARD_ITEM[i].text = "";
      ITEMBOX_COLUMN_TEXT_CARD_ITEM[i].visible = false;
    }
  }
  else{
    //ページ更新
    var maxPage = G_GET_ITEMBOX_CARD_ITEM_MAX_PAGE(ITEMBOX_CARD_CATEGORY_TAB_SWITCH,ITEMBOX_CARD_INVENTORY_DATAS);
    if(maxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = maxPage; //最大ページ数を超えていた場合修正
    ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;

    G_ITEMBOX_CARD_CATEGORY_COLUMN_CREATE(ITEMBOX_CARD_CATEGORY_TAB_SWITCH,ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_CARD_ITEM,
      ITEMBOX_COLUMN_TEXT_CARD_ITEM,ITEMBOX_CARD_INVENTORY_DATAS,ITEMBOX_COLUMN_NONE_TEXT);//カラムを生成
  }
  if(selectTabIndex != 3){
    for (var i = 0; i < ITEMBOX_COLUMN_ITEM.length; i++) {
      ITEMBOX_COLUMN_ITEM[i].visible = false;
      ITEMBOX_COLUMN_ITEM_TEXT[i].text = "";
      ITEMBOX_COLUMN_ITEM_TEXT[i].visible = false;
      ITEMBOX_COLUMN_ITEM_ICON[i].remove();
    }
  }
  else{
    var maxPage = G_GET_ITEMBOX_ITEM_MAX_PAGE(ITEMBOX_PLAYER_ITEM_DATAS);
    if(maxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = maxPage; //最大ページ数を超えていた場合修正
    ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;
    G_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_ITEM,ITEMBOX_COLUMN_ITEM_TEXT,
      ITEMBOX_COLUMN_ITEM_ICON,ITEMBOX_PLAYER_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT);
  }
  if(selectTabIndex != 4){ //重要アイテムカラム
    for(var i = 0; i < ITEMBOX_COLUMN_IMPORTANT_ITEM.length; i++){
      ITEMBOX_COLUMN_IMPORTANT_ITEM[i].visible = false;
      ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM[i].text = "";
      ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM[i].visible = false;
      ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM[i].remove();
    }
  }
  else{
    var maxPage = G_GET_PLAYER_ITEM_MAX_PAGE(ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS);
    if(maxPage < ITEMBOX_ITEM_BOX_PAGE_NUMBER) ITEMBOX_ITEM_BOX_PAGE_NUMBER = maxPage; //最大ページ数を超えていた場合修正
    ITEMBOX_PAGE_CONTROLLER_TEXT.text = ITEMBOX_ITEM_BOX_PAGE_NUMBER + "/" + maxPage;

    G_IMPORTANT_ITEM_COLUMN_CREATE(ITEMBOX_ITEM_BOX_PAGE_NUMBER,ITEMBOX_COLUMN_IMPORTANT_ITEM,
      ITEMBOX_COLUMN_TEXT_IMPORTANT_ITEM,ITEMBOX_COLUMN_ICON_IMPORTANT_ITEM,ITEMBOX_PLAYER_IMPORTANT_ITEM_DATAS,ITEMBOX_COLUMN_NONE_TEXT); //重要アイテムカラムを表示
  }
}

function G_ITEM_COLUMN_CREATE(pageNumber,columnSprite,columnText,columnIcon,playerItemDatas,columnTextNone){ //装備品情報のカラムを表示 pageNumberが「-1」の場合は全削除
  if(columnSprite != null){
    //カラム初期化
    for (var i = 0; i < columnSprite.length; i++) {
      columnSprite[i].visible = false;
      columnText[i].visible = false;
      columnIcon[i].remove();
    }
    if(pageNumber != -1){ //全削除のページではない場合
      var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
      var loopCount = 0; //whileのカウント
      var columnCount = 0; //カラムが表示可能になった数
      while (columnCount < columnSprite.length) {
        if(isset(playerItemDatas[loopCount]) && pageStartCountInit <= loopCount){
          columnSprite[columnCount].visible = true;
          columnText[columnCount].visible = true;
          columnText[columnCount].text = playerItemDatas[loopCount]['item_name'] + ":" + "\n" + playerItemDatas[loopCount]['item_val'];
          //アイコン画像更新
          columnIcon[columnCount] = Sprite('ASSET_' + playerItemDatas[loopCount]['asset_id']).addChildTo(columnSprite[columnCount]);
          columnIcon[columnCount].x = columnSprite[columnCount].x * -0.89;
          columnIcon[columnCount].setScale(0.5);
          columnCount = columnCount + 1;
        }
        loopCount = loopCount + 1;
        if(playerItemDatas.length < loopCount){
          break;
        }
      }
      if(columnCount == 0){ //カラムが何も無かった場合
        columnTextNone.visible = true;//表示する物がない場合、表示
      }
      else{
        columnTextNone.visible = false;
      }
    }
  }
}

function G_IMPORTANT_ITEM_COLUMN_CREATE(pageNumber,columnSprite,columnText,columnIcon,playerImportantItemDatas,columnTextNone){ //装備品情報のカラムを表示 pageNumberが「-1」の場合は全削除
  if(columnSprite != null){
    //カラム初期化
    for (var i = 0; i < columnSprite.length; i++) {
      columnSprite[i].visible = false;
      columnText[i].visible = false;
      columnIcon[i].remove();
    }
    if(pageNumber != -1){ //全削除のページではない場合
      var pageStartCountInit = ((pageNumber - 1) * columnSprite.length);
      var loopCount = 0; //whileのカウント
      var columnCount = 0; //カラムが表示可能になった数
      while (columnCount < columnSprite.length) {
        if(isset(playerImportantItemDatas[loopCount]) && pageStartCountInit <= loopCount){
          columnSprite[columnCount].visible = true;
          columnText[columnCount].visible = true;
          columnText[columnCount].text = playerImportantItemDatas[loopCount]['item_name'];
          //アイコン画像更新
          columnIcon[columnCount] = Sprite('ASSET_' + playerImportantItemDatas[loopCount]['asset_id']).addChildTo(columnSprite[columnCount]);
          columnIcon[columnCount].x = columnSprite[columnCount].x * -0.89;
          columnIcon[columnCount].setScale(0.5);
          columnCount = columnCount + 1;
        }
        loopCount = loopCount + 1;
        if(playerImportantItemDatas.length < loopCount){
          break;
        }
      }
      if(columnCount == 0){ //カラムが何も無かった場合
        columnTextNone.visible = true;//表示する物がない場合、表示
      }
      else{
        columnTextNone.visible = false;
      }
    }
  }
}

function G_GET_PLAYER_ITEM_MAX_PAGE(playerItemDatas){ //通貨の最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < playerItemDatas.length; i++) {
      count = count + 1;
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_GET_PLAYER_IMPORTANT_ITEM_MAX_PAGE(playerImportantItemDatas){ //通貨の最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < playerImportantItemDatas.length; i++) {
      count = count + 1;
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_GET_ITEMBOX_ITEM_MAX_PAGE(playerItemDatas){ //消費アイテムの最大ページ数を取得
  var resultMaxPage = 1;
  var maxColumnCount = 5;
  var count = 0;
  for (var i = 0; i < playerItemDatas.length; i++) {
      count = count + 1;
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_SELECT_OPTION_BUTTON_INIT(){ //カラムのボタンによって更新された値を初期化
  ITEMBOX_EQUIP_ITEM_EQUIP_BUTTON_NUMBER = -1;
  ITEMBOX_EQUIP_ITEM_SELL_BUTTON_NUMBER = -1;
  ITEMBOX_ITEM_USE_BUTTON_NUMBER = -1;
  ITEMBOX_ITEM_SELL_BUTTON_NUMBER = -1;
}

function G_ITEM_BOX_AVATAR_DISP(parentBase,playerAvatarData,playerEquipItemData){ //アバターを表示
  if(ITEMBOX_PLAYER_AVATAR_SPRITE != null){
    ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].remove();
    ITEMBOX_PLAYER_AVATAR_SPRITE['equip'] = null;
    ITEMBOX_PLAYER_AVATAR_SPRITE['use'].remove();
    ITEMBOX_PLAYER_AVATAR_SPRITE['use'] = null;
  }
  else{
    ITEMBOX_PLAYER_AVATAR_SPRITE = new Array();
    ITEMBOX_PLAYER_AVATAR_SPRITE['type'] = 0;
  }
  var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(playerAvatarData,playerEquipItemData);
  var equipAvaSpr = G_AVATAR_DISP(getConvertAvatarData, "equip", "right", 0.5, 0.5, playerAvatarData['visible_head_equip_item']);
  ITEMBOX_PLAYER_AVATAR_SPRITE['equip'] = equipAvaSpr['sprites'][0];
  ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].addChildTo(parentBase); //アバターを表示
  ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].y = ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].y - ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].width;
  ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].visible = false;
  var useAvaSpr = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.5, 0.5, playerAvatarData['visible_head_equip_item']);
  ITEMBOX_PLAYER_AVATAR_SPRITE['use'] = useAvaSpr['sprites'][0];
  ITEMBOX_PLAYER_AVATAR_SPRITE['use'].addChildTo(parentBase); //アバターを表示
  ITEMBOX_PLAYER_AVATAR_SPRITE['use'].y = ITEMBOX_PLAYER_AVATAR_SPRITE['use'].y - ITEMBOX_PLAYER_AVATAR_SPRITE['use'].width;
  ITEMBOX_PLAYER_AVATAR_SPRITE['use'].visible = false;

  if(ITEMBOX_PLAYER_AVATAR_SPRITE['type'] == 0) ITEMBOX_PLAYER_AVATAR_SPRITE['equip'].visible = true;
  else ITEMBOX_PLAYER_AVATAR_SPRITE['use'].visible = true;
}
