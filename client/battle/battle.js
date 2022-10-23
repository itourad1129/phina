//============================================
//  バトルシーン
//============================================
//パブリック変数定義
var BATTLE_SCENE_INSTANCE = null; //シーンのインスタンス
var BATTLE_BATTLE_SCENE_BASE = null; //バトルシーンベース
var BATTLE_BATTLE_SCREEN_LAYER = null; //戦闘画面レイヤー
var BATTLE_BACK_GROUND_LAYER = null; //背景レイヤー
var BATTLE_TILES_LAYER = null; //タイル表示レイヤー
var BATTLE_TILES_SUB_LAYER = null; //タイル表示のサブレイヤー
var BATTLE_CHARACTER_LAYER = null; //キャラクター表示レイヤー
var BATTLE_EFFECT_LAYER = null; //シーンの戦闘エフェクトレイヤー
var BATTLE_BATTLE_SCENE_UI_LAYER = null; //UI表示レイヤー
var BATTLE_UI_WINDOW_LAYER = null; //ウィンドウ表示用ノード
var BATTLE_BATTLE_SCENE_MAIN_MENU_LAYER = null; //メインメニューレイヤー
var BATTLE_BATTLE_SCENE_MAIN_MENU_MASK_LAYER = null; //メインメニューのマスクレイヤー
var BATTLE_SCENE_STEP = 0; //シーンのステップ
var BATTLE_BACK_GROUND_ASSET_ID = 132; //戦闘画面背景のアセットID 初期値はデフォルト
var BATTLE_FIELDS = null; //戦闘フィールド 7 x 7
var BATTLE_FIELDS_MAX_WIDTH = 7;
var BATTLE_FIELDS_MAX_HEIGHT = 7;
var BATTLE_MAIN_MENU_BG = null; //メインメニュー画面背景
var BATTLE_MAIN_MENU_MASK_BG = null; //メインメニュー画面背景のマスク
var BATTLE_COMMAND_WINDOW_BTNS = new Array(); //コマンドウィンドウに表示されるボタン
var BATTLE_COMMAND_WINDOW_BTN_PUSH = -1; //コマンドウィンドウボタンが押された時の数値
var BATTLE_COMMAND_WINDOW_CAPTION = null; //キャプション
var BATTLE_CAPTION_TEXT_LIST = new Array(); //キャプションに登録されたテキスト
var BATTLE_DIRECTION = -1; //戦闘の進行状態 0:戦闘開始前 1:戦闘中 2:戦闘終了状態
var BATTLE_PLAYER_PERMISSION = new Array(); //プレイヤーのパーミッション
var BATTLE_PERMISSION_DATAS = new Array(); //全員のパーミッションデータ
var BATTLE_PLAYER_ENTRY_DATA = null; //プレイヤーのエントリーデータ
var BATTLE_ENTRY_DATAS = new Array(); //エントリーデータ
var BATTLE_MASTER_DATAS = new Array(); //バトルインスタンスから取得したマスターデータ
var BATTLE_CHARACTER_IMAGES = new Array(); //キャラクターイメージ
var BATTLE_HOST_UNIQUE_NO = -1; //ホストのユニークNo
var BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //コマンドメニュー操作中か
var BATTLE_MOVE_AREAS = new Array(); //移動範囲
var BATTLE_PLAYER_SET_COMMAND_DATAS = new Array(); //プレイヤーが設定したコマンドデータ
var BATTLE_COMMAND_SET_UNIQUE_NO = -1; //コマンド設定中のユニークNoを取得
var BATTLE_SELECT_COMMAND_TYPE = -1; //進行中のコマンドタイプ 0:移動 1:カード 2:移動&カード 3:待機
var BATTLE_DECK_DATAS = new Array(); //デッキデータ
var BATTLE_DECK_ANIM = false; //デッキアニメ再生中か
var BATTLE_CARD_SELECT_STEP = 0; //カード選択ステップ 1:デッキ選択中 2:カード選択中
var BATTLE_PLAYER_SELECT_CARD_DATA = null; //プレイヤーがカードリストから選択中のカードマスターデータ
var BATTLE_SET_UI_PREV_BTN = null; //UIを元に戻すボタン
var BATTLE_CARD_TABLE_WINDOW = null; //カードテーブルウィンドウ
var BATTLE_LOG = new Array(); //戦闘ログ
var BATTLE_TURN = 0; //現在進行中のターン
var BATTLE_BEFOR_TURN = -1; //前回まで再生したターン
var BATTLE_PLAY_LOG = new Array(); //アニメーションなどを実行するプレイログ
var BATTLE_PLAY_ANIM_LIST = new Array(); //再生するアニメ
var BATTLE_PLAY_BUFF_ANIM_LIST = new Array(); //再生するバフアニメ
var BATTLE_GAME_RESULT_ANIM = null; //ゲーム結果アニメ
var BATTLE_ACTION_LIST_UNIQUE_NOS = new Array(); //行動順のユニークNoが入った配列
var BATTLE_ANIM_WAIT_TIME = 0; //戦闘アニメウェイトタイム
var BATTLE_TAB_BTNS = new Array(); //タブボタン
var BATTLE_CARD_USE_LOG = new Array(); //カード使用ログ
var BATTLE_LOG = new Array(); //戦闘ログ
var BATTLE_LOG_LAYER = null; //戦闘ログレイヤー
var BATTLE_LOG_MASK_LAYER = null; //戦闘ログのマスクレイヤー
var BATTLE_MAX_HPS = new Array(); //各エントリーデータの最大HP
var BATTLE_ANIM_COUNTER = 0; //アニメーション終了判定用のカウンター
var BATTLE_ANIM_FINISH = false; //アニメーションが完了したか
var BATTLE_ANIM_PLAY = false; //アニメーション再生中か
var BATTLE_FIELD_STATUS_MAX = 0; //フィールドステータスの最大値
var BATTLE_COMMAND_WINDOW_TYPE = -1; //コマンドウィンドウ表示タイプ
var BATTLE_MAIN_MENU_ANIM = false; //メインメニューアニメ中か
var BATTLE_CARD_SET_ANIM = false; //カードセットアニメーション中か
var BATTLE_GAME_RESULT = null; //戦闘結果(ゲーム終了)
var BATTLE_GAME_RESULT_SETTING  = null; //戦闘結果設定
var BATTLE_MOVE_COMMAND_BTNS = new Array(); //移動コマンドボタン(操作制限用)
var BATTLE_COMMAND_CONTROLE_FINISH = false; //コマンド操作が終了しているか
var BATTLE_RESULT_WINDOW_VISIBLE = false; //戦闘結果ウィンドウアクティブか
var BATTLE_RESULT_ENTRY_DATAS = new Array(); //全ターンのエントリーデータ
var BATTLE_RESULT_ACTION_LIST_UNIQUE_NOS = new Array(); //全ターンの行動順のユニークNoが入った配列
var BATTLE_REPLAY = 0; //戦闘シーンの再生が行われた
var BATTLE_ANIM_PLAY_COUNT = 0; //バトルアニメーションが再生された回数
var BATTLE_RESULT_BATTLE_LOG = new Array(); //全ての戦闘ログ
var BATTLE_SPRITE_LIST = new Array(); //削除チェック用に保存しておくスプライトデータ
var BATTLE_RESULT_WINDOW_DROP_DATA = null; //戦闘で得た、ドロップデータ
var BATTLE_RESULT_NEXT_EVENT_DATA = -1; //次のイベントデータ -1:イベントなし(デフォルトで前のシーンに戻る) 0:ステージクリア event_data: event_countで次のイベントへ
var BATTLE_BEFOR_POST_PARAM = null; //前回通信したポストパラメーター
var BATTLE_RECONNECT_FLAG = false; //再通信中か
var BATTLE_RESULT_BEFOR_ENTRY_DATAS = new Array(); //1ターン前のエントリーデータ
var BATTLE_MULTI_PLAYER_MODE = false; //マルチプレイヤーモードか
var BATTLE_MULTIPLAYER_INSTANCE = new Array(); //マルチプレイヤーモードのインスタンス
var BATTLE_MULTIPLAYER_MODE_UI = new Array(); //マルチプレイヤーモード時に表示するUI
var BATTLE_ANIM_SPEED = 1; //アニメーションスピード
var BATTLE_GAME_RESULT_OBJ = null; //ゲーム結果オブジェクト
var BATTLE_AUTO_CONNECTION_OBJ = null; //自動通信オブジェクト
var BATTLE_MY_STANDBY_ADD_ACTIONS = new Array(); //自分が登録した反映待ちAddActionの配列

phina.define("Battle", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "battle";
    //メンバー初期化
    BATTLE_SCENE_INSTANCE = null; //シーンのインスタンス
    BATTLE_BATTLE_SCENE_BASE = null; //バトルシーンベース
    BATTLE_BATTLE_SCENE_MAIN_MENU_LAYER = null; //メインメニューレイヤー
    BATTLE_BATTLE_SCENE_MAIN_MENU_MASK_LAYER = null; //メインメニューのマスクレイヤー
    BATTLE_BACK_GROUND_LAYER = null; //背景レイヤー
    BATTLE_TILES_LAYER = null; //タイル表示レイヤー
    BATTLE_TILES_SUB_LAYER = null; //タイル表示のサブレイヤー
    BATTLE_CHARACTER_LAYER = null; //キャラクター表示レイヤー
    BATTLE_EFFECT_LAYER = null; //シーンの戦闘エフェクトレイヤー
    BATTLE_BATTLE_SCENE_UI_LAYER = null; //UI表示レイヤー
    BATTLE_UI_WINDOW_LAYER = null; //ウィンドウ表示用ノード
    BATTLE_SCENE_STEP = 0; //シーンのステップ
    BATTLE_BACK_GROUND_ASSET_ID = 132; //戦闘画面背景のアセットID
    BATTLE_FIELDS = null; //戦闘フィールド 7 x 7
    BATTLE_FIELDS_MAX_WIDTH = 7;
    BATTLE_FIELDS_MAX_HEIGHT = 7;
    BATTLE_MAIN_MENU_BG = null; //メインメニュー画面背景
    BATTLE_MAIN_MENU_MASK_BG = null; //メインメニュー画面背景のマスク
    BATTLE_COMMAND_WINDOW_BTNS = new Array(); //コマンドウィンドウに表示されるボタン
    BATTLE_COMMAND_WINDOW_BTN_PUSH = -1; //コマンドウィンドウボタンが押された時の数値
    BATTLE_COMMAND_WINDOW_CAPTION = null; //キャプション
    BATTLE_CAPTION_TEXT_LIST = new Array(); //キャプションに登録されたテキスト
    BATTLE_DIRECTION = -1; //戦闘の進行状態 0:戦闘開始前 1:戦闘中 2:戦闘終了状態
    BATTLE_PLAYER_PERMISSION = new Array(); //プレイヤーのパーミッション
    BATTLE_PERMISSION_DATAS = new Array(); //全員のパーミッションデータ
    BATTLE_PLAYER_ENTRY_DATA = null; //プレイヤーのエントリーデータ
    BATTLE_ENTRY_DATAS = new Array(); //エントリーデータ
    BATTLE_MASTER_DATAS = new Array(); //バトルインスタンスから取得したマスターデータ
    BATTLE_CHARACTER_IMAGES = new Array(); //キャラクターイメージ
    BATTLE_HOST_UNIQUE_NO = -1; //ホストのユニークNo
    BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //コマンドメニュー操作中か
    BATTLE_MOVE_AREAS = new Array(); //移動範囲
    BATTLE_PLAYER_SET_COMMAND_DATAS = new Array(); //プレイヤーが設定したコマンドデータ
    BATTLE_COMMAND_SET_UNIQUE_NO = -1; //コマンド設定中のユニークNoを取得
    BATTLE_SELECT_COMMAND_TYPE = -1; //進行中のコマンドタイプ 0:移動 1:カード 2:移動&カード 3:待機
    BATTLE_DECK_DATAS = new Array(); //デッキデータ
    BATTLE_DECK_ANIM = false; //デッキアニメ再生中か
    BATTLE_CARD_SELECT_STEP = 0; //カード選択ステップ 1:デッキ選択中 2:カード選択中
    BATTLE_PLAYER_SELECT_CARD_DATA = null; //プレイヤーがカードリストから選択中のカードマスターデータ
    BATTLE_SET_UI_PREV_BTN = null; //UIを元に戻すボタン
    BATTLE_CARD_TABLE_WINDOW = null; //カードテーブルウィンドウ
    BATTLE_LOG = new Array(); //戦闘ログ
    BATTLE_TURN = 0; //現在進行中のターン
    BATTLE_BEFOR_TURN = -1; //前回まで再生したターン
    BATTLE_PLAY_LOG = new Array(); //アニメーションなどを実行するプレイログ
    BATTLE_PLAY_ANIM_LIST = new Array(); //再生するアニメ
    BATTLE_PLAY_BUFF_ANIM_LIST = new Array(); //再生するバフアニメ
    BATTLE_GAME_RESULT_ANIM = null; //ゲーム結果アニメ
    BATTLE_ACTION_LIST_UNIQUE_NOS = new Array(); //行動順のユニークNoが入った配列
    BATTLE_ANIM_WAIT_TIME = 0; //戦闘アニメウェイトタイム
    BATTLE_TAB_BTNS = new Array(); //タブボタン
    BATTLE_CARD_USE_LOG = new Array(); //カード使用ログ
    BATTLE_LOG = new Array(); //戦闘ログ
    BATTLE_LOG_LAYER = null; //戦闘ログレイヤー
    BATTLE_LOG_MASK_LAYER = null; //戦闘ログのマスクレイヤー
    BATTLE_MAX_HPS = new Array(); //各エントリーデータの最大HP
    BATTLE_ANIM_COUNTER = 0; //アニメーション終了判定用のカウンター
    BATTLE_ANIM_FINISH = false; //アニメーションが完了したか
    BATTLE_ANIM_PLAY = false; //アニメーション再生中か
    BATTLE_FIELD_STATUS_MAX = 0; //フィールドステータスの最大値
    BATTLE_COMMAND_WINDOW_TYPE = -1; //コマンドウィンドウ表示タイプ
    BATTLE_MAIN_MENU_ANIM = false; //メインメニューアニメ中か
    BATTLE_CARD_SET_ANIM = false; //カードセットアニメーション中か
    BATTLE_GAME_RESULT = null; //戦闘結果(ゲーム終了)
    BATTLE_GAME_RESULT_SETTING  = null; //戦闘結果設定
    BATTLE_MOVE_COMMAND_BTNS = new Array(); //移動コマンドボタン(操作制限用)
    BATTLE_COMMAND_CONTROLE_FINISH = false; //コマンド操作が終了しているか
    BATTLE_RESULT_WINDOW_VISIBLE = false; //戦闘結果ウィンドウアクティブか
    BATTLE_RESULT_ENTRY_DATAS = new Array(); //全ターンのエントリーデータ
    BATTLE_RESULT_ACTION_LIST_UNIQUE_NOS = new Array(); //全ターンの行動順のユニークNoが入った配列
    BATTLE_REPLAY = 0; //戦闘シーンの再生が行われた
    BATTLE_ANIM_PLAY_COUNT = 0; //バトルアニメーションが再生された回数
    BATTLE_RESULT_BATTLE_LOG = new Array(); //全ての戦闘ログ
    BATTLE_SPRITE_LIST = new Array(); //削除チェック用に保存しておくスプライトデータ
    BATTLE_RESULT_WINDOW_DROP_DATA = null; //戦闘で得た、ドロップデータ
    BATTLE_RESULT_NEXT_EVENT_DATA = -1; //次のイベントデータ -1:イベントなし(デフォルトで前のシーンに戻る) 0:ステージクリア event_data: event_countで次のイベントへ
    BATTLE_BEFOR_POST_PARAM = null; //前回通信したポストパラメーター
    BATTLE_RECONNECT_FLAG = false; //再通信中か
    BATTLE_RESULT_BEFOR_ENTRY_DATAS = new Array(); //1ターン前のエントリーデータ
    BATTLE_MULTI_PLAYER_MODE = false; //マルチプレイヤーモードか
    BATTLE_MULTIPLAYER_INSTANCE = new Array(); //マルチプレイヤーモードのインスタンス
    BATTLE_MULTIPLAYER_MODE_UI = new Array(); //マルチプレイヤーモード時に表示するUI
    BATTLE_ANIM_SPEED = 1; //アニメーションスピード
    BATTLE_GAME_RESULT_OBJ = null; //ゲーム結果オブジェクト
    BATTLE_AUTO_CONNECTION_OBJ = null; //自動通信オブジェクト
    BATTLE_MY_STANDBY_ADD_ACTIONS = new Array(); //自分が登録した反映待ちAddActionの配列

    // 親クラス初期化
    this.superInit();
    G_DELETE_TARNS_SCREEN_ANIM();
    // 背景色
    this.backgroundColor = 'black';
    BATTLE_SCENE_INSTANCE = this;

    BATTLE_BATTLE_SCENE_BASE = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    BATTLE_LOG_LAYER = PlainElement({ //戦闘ログレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_LOG_MASK_LAYER = PlainElement({ //戦闘ログのマスクレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_BACK_GROUND_LAYER = PlainElement({ //シーンの戦闘画面背景レイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);


    BATTLE_TILES_LAYER = PlainElement({ //シーンの戦闘画面タイルレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_TILES_SUB_LAYER = PlainElement({ //シーンの戦闘画面タイルサブレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_CHARACTER_LAYER = PlainElement({ //シーンのキャラクター表示レイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_EFFECT_LAYER = PlainElement({ //シーンの戦闘エフェクトレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_BATTLE_SCENE_MAIN_MENU_LAYER = PlainElement({ //メインメニューレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_BATTLE_SCENE_MAIN_MENU_MASK_LAYER = PlainElement({ //メインメニューのマスクレイヤー
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    BATTLE_BATTLE_SCENE_UI_LAYER = PlainElement({ //シーンのUI用レイヤー生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(BATTLE_BATTLE_SCENE_BASE);

    //ウィンドウ表示用ノード
    BATTLE_UI_WINDOW_LAYER = PlainElement({
    }).addChildTo(this);
    BATTLE_UI_WINDOW_LAYER.x = this.gridX.center();
    BATTLE_UI_WINDOW_LAYER.y = this.gridY.center();

    G_CREATE_TRANS_SCREEN_ANIM(BATTLE_BATTLE_SCENE_UI_LAYER,1); //シーン開始の演出アニメーションを作成

    //メインメニュー背景の表示
    BATTLE_MAIN_MENU_BG = Sprite('ASSET_111').addChildTo(BATTLE_BATTLE_SCENE_MAIN_MENU_LAYER);
    BATTLE_MAIN_MENU_BG.y = BATTLE_MAIN_MENU_BG.y + BATTLE_MAIN_MENU_BG.height;

    //メインメニューマスクの表示
    BATTLE_MAIN_MENU_MASK_BG = Sprite('ASSET_806').addChildTo(BATTLE_BATTLE_SCENE_MAIN_MENU_MASK_LAYER);
    BATTLE_MAIN_MENU_MASK_BG.y = BATTLE_MAIN_MENU_BG.y

    //戦闘ログ背景の表示
    BATTLE_LOG_BG = Sprite('ASSET_111').addChildTo(BATTLE_LOG_LAYER);
    BATTLE_LOG_BG.y = BATTLE_LOG_BG.y + BATTLE_LOG_BG.height;
    BATTLE_LOG_BG.visible = false;

    //戦闘ログ背景マスクの表示
    BATTLE_LOG_MASK_BG = Sprite('ASSET_806').addChildTo(BATTLE_LOG_MASK_LAYER);
    BATTLE_LOG_MASK_BG.y = BATTLE_LOG_BG.y
    BATTLE_LOG_MASK_BG.visible = false;

    //タブボタンを生成
    var tabBtnNum = 4;
    var tabBtnPosX = 0;
    for (var i = 0; i < tabBtnNum; i++) {
      BATTLE_TAB_BTNS[i] = Sprite('ASSET_847').addChildTo(BATTLE_BATTLE_SCENE_MAIN_MENU_LAYER);
      BATTLE_TAB_BTNS[i].y = BATTLE_TAB_BTNS[i].y + 145;
      if(i == 0) BATTLE_TAB_BTNS[i].x = BATTLE_TAB_BTNS[i].x - ((SCREEN_WIDTH / 2) - (BATTLE_TAB_BTNS[i].width / 2));
      else {BATTLE_TAB_BTNS[i].x = tabBtnPosX; BATTLE_TAB_BTNS[i].x = BATTLE_TAB_BTNS[i].x + BATTLE_TAB_BTNS[i].width;}
      tabBtnPosX = BATTLE_TAB_BTNS[i].x;
      var labelText = "";
      var fontSize = 32;
      if(i == 0) {labelText = "操作"; fontSize = 32};
      if(i == 1) {labelText = "カードログ"; fontSize = 26};
      if(i == 2) {labelText = "戦闘ログ"; fontSize = 26};
      if(i == 3) {labelText = "リザルト"; fontSize = 26};
      BATTLE_TAB_BTNS[i]['label'] = Label({ text: labelText,
      fontSize: fontSize,fill: 'white'}).addChildTo(BATTLE_TAB_BTNS[i]);
      BATTLE_TAB_BTNS[i]['button'] = Button({
        width: BATTLE_TAB_BTNS[i].width,         // 横サイズ
        height: BATTLE_TAB_BTNS[i].height,        // 縦サイズ
      }).addChildTo(BATTLE_TAB_BTNS[i]);
      BATTLE_TAB_BTNS[i]['button']['index'] = i;
      BATTLE_TAB_BTNS[i]['button'].onpointend = function(e){
        if(this.parent.visible == false) return;
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          if(this['index'] == 0) G_BATTLE_COMMAND_WINDOW_DISP(0); //コマンドウィンドウ
          if(this['index'] == 1) G_BATTLE_COMMAND_WINDOW_DISP(3); //カード使用ログウィンドウ
          if(this['index'] == 2) G_BATTLE_COMMAND_WINDOW_DISP(4); //戦闘ログウィンドウ
          if(this['index'] == 3) G_BATTLE_COMMAND_WINDOW_DISP(5); //リザルトログウィンドウ
          //透明度の切り替え
          for (var cb = 0; cb < BATTLE_TAB_BTNS.length; cb++) {
            if(cb == this['index']) BATTLE_TAB_BTNS[cb].alpha = 0.7;
            else BATTLE_TAB_BTNS[cb].alpha = 0.35;
          }
        }
      };
      BATTLE_TAB_BTNS[i]['button'].visible = false;
      if(i == 0) BATTLE_TAB_BTNS[i].alpha = 0.7;
      else if(i == 3){ BATTLE_TAB_BTNS[i].alpha = 0.35; BATTLE_TAB_BTNS[i].visible = false;}
      else BATTLE_TAB_BTNS[i].alpha = 0.35;
    }

    //メインメニューのタイトルテキストを表示
    BATTLE_MAIN_MENU_BG['tite_text'] = Label({ text: "",
    fontSize: 48,fill: 'white'}).addChildTo(BATTLE_MAIN_MENU_BG);
    BATTLE_MAIN_MENU_BG['tite_text'].visible = false;

    //コマンドウィンドウボタンの表示
    var commandWindowBtnNum = 6; //ボタンの個数
    var commandWindowBtnPosX = 0;
    for (var i = 0; i < commandWindowBtnNum; i++) {
      BATTLE_COMMAND_WINDOW_BTNS[i] = Sprite('ASSET_805').addChildTo(BATTLE_MAIN_MENU_BG);
      if(i <= 2){
        BATTLE_COMMAND_WINDOW_BTNS[i].y = BATTLE_COMMAND_WINDOW_BTNS[i].y - (BATTLE_COMMAND_WINDOW_BTNS[i].height / 2) + 20;
      }
      else{
        BATTLE_COMMAND_WINDOW_BTNS[i].y = BATTLE_COMMAND_WINDOW_BTNS[i].y + ((BATTLE_COMMAND_WINDOW_BTNS[i].height / 2) + 40);
      }
      BATTLE_COMMAND_WINDOW_BTNS[i].x = BATTLE_COMMAND_WINDOW_BTNS[i].x - (BATTLE_COMMAND_WINDOW_BTNS[i].width + 20);
      BATTLE_COMMAND_WINDOW_BTNS[i].x = BATTLE_COMMAND_WINDOW_BTNS[i].x + commandWindowBtnPosX;
      commandWindowBtnPosX = commandWindowBtnPosX + (BATTLE_COMMAND_WINDOW_BTNS[i].width + 20);
      if(i == 2) commandWindowBtnPosX = 0;
      //BATTLE_COMMAND_WINDOW_BTNS[i].visible = false;
      BATTLE_COMMAND_WINDOW_BTNS[i]['button'] = Button({
        width: 180,         // 横サイズ
        height: 100,        // 縦サイズ
      }).addChildTo(BATTLE_COMMAND_WINDOW_BTNS[i]);
      BATTLE_COMMAND_WINDOW_BTNS[i]['button']['no'] = i;
      BATTLE_COMMAND_WINDOW_BTNS[i]['button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(BATTLE_COMMAND_WINDOW_BTNS[this['no']].visible == false) return;
        if(BATTLE_ANIM_PLAY == false && WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          BATTLE_COMMAND_WINDOW_BTN_PUSH = this['no'];
        }
      };
      BATTLE_COMMAND_WINDOW_BTNS[i]['button'].visible = false;
    }

    //キャプションの表示
    BATTLE_COMMAND_WINDOW_CAPTION = Sprite('ASSET_803').addChildTo(BATTLE_MAIN_MENU_BG);
    BATTLE_COMMAND_WINDOW_CAPTION.y = BATTLE_COMMAND_WINDOW_CAPTION.y - ((BATTLE_MAIN_MENU_BG.height / 2) - 40);
    BATTLE_COMMAND_WINDOW_CAPTION['play_index'] = 0; //再生index
    BATTLE_COMMAND_WINDOW_CAPTION['play_now'] = false; //キャプションアニメ再生中か

    //キャプション初期化
    G_BATTLE_ADD_CAPTION_LIST("キャラクタータップでコマンドメニュー表示。",'black',"set_action");
    G_BATTLE_ADD_CAPTION_LIST("コマンド入力後、決定ボタンを押して下さい。",'black',"set_action");
    G_BATTLE_ADD_CAPTION_LIST("オートアタック選択で、操作をスキップ可能。",'black',"set_action");

    G_BATTLE_ADD_CAPTION_LIST("使用するデッキを選択して下さい",'black',"set_deck");
    G_BATTLE_ADD_CAPTION_LIST("プライズドロー選択でランダムカードを引く",'black',"set_deck");
    G_BATTLE_ADD_CAPTION_LIST("デッキの登録はカード編集で行う",'black',"set_deck");

    G_BATTLE_ADD_CAPTION_LIST("使用するカードを選択した下さい",'black',"set_card");
    G_BATTLE_ADD_CAPTION_LIST("カード長押しで、カード詳細を表示可能",'black',"set_card");

    G_BATTLE_ADD_CAPTION_LIST("戦闘ログを再生して、戦術を分析しよう",'black',"set_result");
    G_BATTLE_ADD_CAPTION_LIST("『終了』ボタン選択で、戦闘画面から離脱する",'black',"set_result");
    G_BATTLE_ADD_CAPTION_LIST("『ドロップ』ボタン選択で、報酬を再確認する",'black',"set_result");


    //戦闘開始前に最低限必要な情報があるかチェック
    if(PLAYER_BATTLE_INSTANCE != null && isset(PLAYER_BATTLE_INSTANCE['battle_instance_id']))
    {
       //背景の表示
       BATTLE_BACK_GROUND_LAYER['bg_sprite'] = Sprite('ASSET_' + BATTLE_BACK_GROUND_ASSET_ID).addChildTo(BATTLE_BACK_GROUND_LAYER);
       BATTLE_BACK_GROUND_LAYER['bg_sprite'].y = BATTLE_BACK_GROUND_LAYER['bg_sprite'].y - (BATTLE_BACK_GROUND_LAYER['bg_sprite'].height / 4);
       //フィールドの生成
       BATTLE_FIELDS = new Array();
       var fieldLimit = -1; //１列中に設置するフィールドの最大数
       var posY = -9999; //現在配置中のY座標
       var posX = -9999; //現在配置中のX座標
       for (var h = 0; h < BATTLE_FIELDS_MAX_HEIGHT; h++) {
         var startIndex = h * BATTLE_FIELDS_MAX_WIDTH;
         var endIndex = startIndex + BATTLE_FIELDS_MAX_WIDTH ;
         //indexに変換
         var fieldLimit3Indexs = new Array();
         var fieldLimit4Indexs = new Array();
         var xIndex = 0;
         for (var index = startIndex; index < endIndex; index++) {
           if(h % 2 == 0){
             if(index % 2 != 0) fieldLimit3Indexs[fieldLimit3Indexs.length] = xIndex;
             if(index % 2 == 0) fieldLimit4Indexs[fieldLimit4Indexs.length] = xIndex;
           }
           else{
             if(index % 2 == 0) fieldLimit3Indexs[fieldLimit3Indexs.length] = xIndex;
             if(index % 2 != 0) fieldLimit4Indexs[fieldLimit4Indexs.length] = xIndex;
           }
           xIndex++;
         }
         fieldLimit = 3;
         for (var i = 0; i < fieldLimit; i++) {
           var sprIndex = BATTLE_FIELDS.length;
           BATTLE_FIELDS[sprIndex] = Sprite('ASSET_793').addChildTo(BATTLE_TILES_LAYER);
           BATTLE_FIELDS[sprIndex]['field_x'] = fieldLimit3Indexs[i];
           BATTLE_FIELDS[sprIndex]['field_y'] = h;
           BATTLE_FIELDS[sprIndex]['pos_label'] =  Label({ text: BATTLE_FIELDS[sprIndex]['field_x'] + "-" + BATTLE_FIELDS[sprIndex]['field_y'],
           fontSize: 12,fill: 'white'}).addChildTo(BATTLE_FIELDS[sprIndex]);
           //以下テストコード
           // BATTLE_FIELDS[sprIndex]['button'] = Button({
           //   text: "",
           //   width: 100,         // 横サイズ
           //   height: 60,        // 縦サイズ
           // }).addChildTo(BATTLE_FIELDS[sprIndex]);
           // BATTLE_FIELDS[sprIndex]['button'].onpointend = function(e){
           //      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
           //      if(this.visible == false) this.visible = true;
           //      else this.visible = false;
           //
           // };
           // BATTLE_FIELDS[sprIndex]['button'].visible = false;
           // BATTLE_FIELDS[sprIndex]['button'].alpha = 0.5;

           //上記テストコード
           if(i == 0) {
             BATTLE_FIELDS[sprIndex].x =  BATTLE_FIELDS[sprIndex].x - (BATTLE_FIELDS[sprIndex].width * 1.4);
             //BATTLE_FIELDS[sprIndex].x =  BATTLE_FIELDS[sprIndex].x - (BATTLE_FIELDS[sprIndex].width * 0.2);
             posX = BATTLE_FIELDS[sprIndex].x;
           }
           else {
             BATTLE_FIELDS[sprIndex].x = posX + (BATTLE_FIELDS[sprIndex].width * 1.4);
             posX = BATTLE_FIELDS[sprIndex].x;
           }
           if(i == 0){
             if(posY == -9999){
               BATTLE_FIELDS[sprIndex].y = BATTLE_FIELDS[sprIndex].y - (BATTLE_FIELDS[sprIndex].height * 4);
               posY = BATTLE_FIELDS[sprIndex].y;
             }
             else posY = posY + (BATTLE_FIELDS[sprIndex].height * 0.9);
           }
           BATTLE_FIELDS[sprIndex].y = posY;
           //フィールド共通処理は以下に記載。2つあるので、この関数以外で追記はしないよう注意
           G_BATTLE_SET_FIELD(BATTLE_FIELDS[sprIndex]);
         }
         fieldLimit = 4;
         for (var i = 0; i < fieldLimit; i++) {
           var sprIndex = BATTLE_FIELDS.length;
           BATTLE_FIELDS[sprIndex] = Sprite('ASSET_793').addChildTo(BATTLE_TILES_LAYER);
           BATTLE_FIELDS[sprIndex]['field_x'] = fieldLimit4Indexs[i];
           BATTLE_FIELDS[sprIndex]['field_y'] = h;
           BATTLE_FIELDS[sprIndex]['pos_label'] =  Label({ text: BATTLE_FIELDS[sprIndex]['field_x'] + "-" + BATTLE_FIELDS[sprIndex]['field_y'],
           fontSize: 12,fill: 'white'}).addChildTo(BATTLE_FIELDS[sprIndex]);
           //以下テストコード
           // BATTLE_FIELDS[sprIndex]['button'] = Button({
           //   text: "",
           //   width: 100,         // 横サイズ
           //   height: 60,        // 縦サイズ
           // }).addChildTo(BATTLE_FIELDS[sprIndex]);
           // BATTLE_FIELDS[sprIndex]['button'].onpointend = function(e){
           //      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
           //      if(this.visible == false) this.visible = true;
           //      else this.visible = false;
           //
           // };
           // BATTLE_FIELDS[sprIndex]['button'].visible = false;
           // BATTLE_FIELDS[sprIndex]['button'].alpha = 0.5;

           //上記テストコード
           if(i == 0) {
             BATTLE_FIELDS[sprIndex].x = BATTLE_FIELDS[sprIndex].x - (BATTLE_FIELDS[sprIndex].width * 2.1);
             //BATTLE_FIELDS[sprIndex].x =  BATTLE_FIELDS[sprIndex].x - (BATTLE_FIELDS[sprIndex].width / 2);
             //BATTLE_FIELDS[sprIndex].x = BATTLE_FIELDS[sprIndex].x - (BATTLE_FIELDS[sprIndex].width / 1.6);
             posX = BATTLE_FIELDS[sprIndex].x;
           }
           else {
             BATTLE_FIELDS[sprIndex].x = posX + (BATTLE_FIELDS[sprIndex].width * 1.4);
             posX = BATTLE_FIELDS[sprIndex].x;
           }
           BATTLE_FIELDS[sprIndex].y = (posY + BATTLE_FIELDS[sprIndex].height / 2);
           //フィールド共通処理は以下に記載。2つあるので、この関数以外で追記はしないよう注意
           G_BATTLE_SET_FIELD(BATTLE_FIELDS[sprIndex]);
         }
       }
       NETWORK_IS_CONNECTING = true;
       var postParam = new Object();
       postParam['battle_instance_id'] = new Object();
       postParam['battle_instance_id'] = PLAYER_BATTLE_INSTANCE['battle_instance_id'];
       postParam['battle_scene_init'] = 0;
       G_BATTLE_SET_BEFOR_POST_PARAM(postParam);
       ajaxStart("post","json","../../client/battle/battle.php",postParam); //非同期通信開始
    }
    else{
      alert("シーンの初期化に失敗しました。タイトルに戻ります。");
      this.exit("title");
    }
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function(app) {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["result_battle"])){
            if(json["result_battle"]['error'] == 0){ //エラーなし
              var resultBattle = json["result_battle"];
              if(isset(resultBattle['battle_direction']) && isset(resultBattle['entry_datas'])
              && isset(resultBattle['permission_datas']) && isset(resultBattle['master_datas'])
              && isset(resultBattle['battle_turn'])){
                //現在のターンを更新
                BATTLE_BEFOR_TURN = BATTLE_TURN;
                console.log("前回のターン");
                console.log(BATTLE_BEFOR_TURN);
                BATTLE_TURN = parseInt(resultBattle['battle_turn']);
                console.log("今回のターン");
                console.log(BATTLE_TURN);
                var turnNotChange = BATTLE_BEFOR_TURN == BATTLE_TURN ? true : false;
                var turnDiff = BATTLE_TURN - BATTLE_BEFOR_TURN;
                var turnChangeDiff =  1 < turnDiff ? true : false;
                BATTLE_HOST_UNIQUE_NO = parseInt(resultBattle['host_unique_no']);
                BATTLE_PLAYER_ENTRY_DATA = G_BATTLE_GET_PLAYER_ENTRY_DATA(json['player_info']['player_index_id'],resultBattle['entry_datas']);
                BATTLE_ENTRY_DATAS = resultBattle['entry_datas'];
                G_BATTLE_SET_PLAYER_PERMISSION(BATTLE_PLAYER_ENTRY_DATA,resultBattle['permission_datas']);
                G_BATTLE_SET_PERMISSION(resultBattle['entry_datas'],resultBattle['permission_datas']);
                G_BATTLE_PLAYER_SET_COMMAND_INIT(BATTLE_PERMISSION_DATAS);
                BATTLE_DIRECTION = resultBattle['battle_direction'];
                BATTLE_MASTER_DATAS = resultBattle['master_datas'];
                BATTLE_MOVE_AREAS = resultBattle['move_areas'];
                console.log(BATTLE_MOVE_AREAS); //移動範囲
                BATTLE_DECK_DATAS = resultBattle['deck_datas'];
                BATTLE_ACTION_LIST_UNIQUE_NOS = resultBattle['action_list_unique_nos'];
                BATTLE_MAX_HPS = resultBattle['status_hp'];
                BATTLE_RESULT_BEFOR_ENTRY_DATAS = resultBattle['result_befor_entry_datas'];
                BATTLE_MY_STANDBY_ADD_ACTIONS = resultBattle['my_standby_add_actions'];
                //リプレイ用データの存在確認
                if(isset(resultBattle['battle_replay'])) BATTLE_REPLAY = resultBattle['battle_replay'];
                if(isset(resultBattle['result_entry_datas'])){ BATTLE_RESULT_ENTRY_DATAS = resultBattle['result_entry_datas'];}
                if(isset(resultBattle['result_action_list_unique_nos'])){ BATTLE_RESULT_ACTION_LIST_UNIQUE_NOS = resultBattle['result_action_list_unique_nos'];}
                if(isset(resultBattle['battle_log'])) BATTLE_RESULT_BATTLE_LOG = resultBattle['battle_log'];
                if(isset(resultBattle['multi_player_instance'])) BATTLE_MULTIPLAYER_INSTANCE = resultBattle['multi_player_instance'];
                //マルチプレイ判定
                var beforMultiPlayerMode = BATTLE_MULTI_PLAYER_MODE;
                if(BATTLE_MULTIPLAYER_INSTANCE.length != 0) BATTLE_MULTI_PLAYER_MODE = true;

                console.log("デッキデータ");
                console.log(BATTLE_DECK_DATAS);
                //デッキデータを設定
                G_BATTLE_SET_CARD_DECK_DATA();
                console.log("デッキデータ設定後");
                console.log(BATTLE_DECK_DATAS);

                if(isset(json['battle_scene_init'])){ //戦闘シーン開始
                  //キャラクター表示処理
                  G_BATTLE_SET_CHARACTER_POSITION(resultBattle['entry_datas']);
                  console.log("初期化通信突破");
                  BATTLE_SCENE_STEP = 1; //バトルシーン切り替え演出を開始
                }

                //マルチプレイモードに切り替わった。
                if(beforMultiPlayerMode == false && BATTLE_MULTI_PLAYER_MODE == true){
                  G_BATTLE_TRANCE_MULTI_PLAYER_MODE();
                }
                else if(BATTLE_MULTI_PLAYER_MODE == true){
                  var gemeEnd = resultBattle['battle_direction'] == 2 ? true : false;
                  G_BATTLE_UPDATE_MULTI_PLAYERMODE_UI(gemeEnd);
                }

                if(BATTLE_REPLAY == 1){ //戦闘シーンの再生
                  G_BATTLE_REPLAY_START(); //再生開始
                }
                else if(resultBattle['battle_direction'] == 1 && turnNotChange == false){ //ゲーム中
                  if(isset(resultBattle['battle_log'])){
                    console.log("バトルログ");
                    console.log(resultBattle['battle_log']);
                    if(turnChangeDiff == true){
                      // //キャラクター表示リセット
                      G_BATTLE_DELETE_CHARACTER_POSITION();
                      //強制削除
                      G_BATTLE_FORCE_DELETE_CHARACTER_SPRITE();
                      //フィールドステータス強制非表示
                      G_BATTLE_FORCE_DELETE_FIELD_STATUS();
                      //キャラクター表示処理
                      G_BATTLE_SET_CHARACTER_POSITION(BATTLE_RESULT_BEFOR_ENTRY_DATAS);
                    }
                    //戦闘ログを設定
                    G_BATTLE_SET_BATTLE_LOG(resultBattle['battle_log']);
                    //戦闘アニメーション設定
                    G_BATTLE_SET_BATTLE_ANIM();
                    //戦闘アニメーション開始
                    G_BATTLE_START_BATTLE_ANIM();
                  }
                }
                else if(resultBattle['battle_direction'] == 2 && turnNotChange == false){ //ゲーム終了
                  BATTLE_GAME_RESULT = resultBattle['game_result'];
                  BATTLE_GAME_RESULT_SETTING = resultBattle['game_result_setting'];
                  console.log("ゲーム結果設定");
                  console.log(BATTLE_GAME_RESULT_SETTING);
                  if(turnChangeDiff == true){
                    // //キャラクター表示リセット
                    G_BATTLE_DELETE_CHARACTER_POSITION();
                    //強制削除
                    G_BATTLE_FORCE_DELETE_CHARACTER_SPRITE();
                    //フィールドステータス強制非表示
                    G_BATTLE_FORCE_DELETE_FIELD_STATUS();
                    //キャラクター表示処理
                    G_BATTLE_SET_CHARACTER_POSITION(BATTLE_RESULT_BEFOR_ENTRY_DATAS);
                  }
                  //戦闘ログを設定
                  G_BATTLE_SET_BATTLE_LOG(resultBattle['battle_log']);
                  //戦闘アニメーション設定
                  G_BATTLE_SET_BATTLE_ANIM();
                  //戦闘アニメーション開始
                  G_BATTLE_START_BATTLE_ANIM();
                }
                //共通処理
              }
            }
            else{ //戦闘通信結果エラー処理
              switch (parseInt(json["result_battle"]['error'])) {
                case 100: //トランザクションに失敗した。
                {
                  //前回のポストを送信
                  G_BATTLE_START_RECONNECT();
                }
                break;
                default:
                {
                  G_NORMAL_WINDOW_CREATE(BATTLE_UI_WINDOW_LAYER,"通信エラー","通信エラーが発生しました。\nエラーコード:"
                  + json["result_battle"]['error'] + "\n"
                  + json["result_battle"]['error_comment'],0,"battleResultResponseErrorWnd");
                }
                break;
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
      if(BATTLE_RECONNECT_FLAG == false) NETWORK_IS_CONNECTING = false;
      else BATTLE_RECONNECT_FLAG = false;
    }

    G_BATTLE_SCENE_STEP(BATTLE_SCENE_STEP);
    G_BATTLE_PUSH_COMMAND_WINDOW_BTN();
    G_BATTLE_CAPTION_ANIM_EXE();

    //ウィンドウに返り値があった場合
    if(WINDOW_RETURN_VAL != null){
      if(isset(WINDOW_RETURN_VAL['deleteCardCommandWnd'])){
        if(WINDOW_RETURN_VAL['deleteCardCommandWnd'] == "yes"){ //デッキ選択警告ウィンドウを閉じた場合
          //カードコマンド設定取り消し
          G_BATTLE_RESET_PLAYER_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO,3);
          //ボタンを非表示に
          if(BATTLE_CARD_TABLE_WINDOW != null && isset(BATTLE_CARD_TABLE_WINDOW['buttons']) && isset(BATTLE_CARD_TABLE_WINDOW['buttons'][2])){
            BATTLE_CARD_TABLE_WINDOW['buttons'][2].visible = false;
          }
        }
      }

      WINDOW_RETURN_VAL = null;
    }
    //アニメーション終了判定
    if(BATTLE_ANIM_COUNTER != 0){
      //アニメーション中の共通処理
      BATTLE_CHARACTER_LAYER.children.sort(function(a,b){
        if(a.position.y < b.position.y) return -1;
        if(a.position.y > b.position.y) return 1;
        return 0;
      });
      // 経過時間更新
      BATTLE_ANIM_COUNTER -= app.deltaTime;
      if(BATTLE_ANIM_COUNTER <= 0){ BATTLE_ANIM_COUNTER = 0; BATTLE_ANIM_FINISH = true;}
    }
    //戦闘アニメーション終了処理
    if(BATTLE_ANIM_FINISH == true){
      BATTLE_ANIM_FINISH = false;
      //キャラクター表示リセット
      G_BATTLE_DELETE_CHARACTER_POSITION();
      //キャラクター表示処理
      G_BATTLE_SET_CHARACTER_POSITION(BATTLE_ENTRY_DATAS);
      //フィールドステータス強制非表示
      G_BATTLE_FORCE_DELETE_FIELD_STATUS();
      BATTLE_ANIM_PLAY_COUNT = BATTLE_ANIM_PLAY_COUNT + 1;
      console.log("戦闘アニメーション終了");
      BATTLE_ANIM_PLAY = false;
    }
    //戦闘結果ウィンドウ表示中
    if(BATTLE_RESULT_WINDOW_VISIBLE == true){
      if(WINDOW_LIST == null) { //ウィンドウが閉じられた
        BATTLE_RESULT_WINDOW_VISIBLE = false;
        console.log("結果ウィンドウ閉じられた");
        //レベルアップ演出があれば実行
        G_BATTLE_CHECK_LEVEL_UP_ANIM(BATTLE_GAME_RESULT_SETTING);
        //ステージクリアであれば、演出を実行
        G_BATTLE_CHECK_STAGE_CLEAR_ANIM(BATTLE_RESULT_NEXT_EVENT_DATA);
      }
    }
    //自動通信処理
    if(BATTLE_AUTO_CONNECTION_OBJ != null && BATTLE_AUTO_CONNECTION_OBJ['visible'] == true){
      if(BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] != 0){
        G_BATTLE_CHANGE_CONNECTION_BTN_VISIBLE(true);
        BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] -= PHINA_APP.deltaTime;
        if(BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] <= 0) {
          G_BATTLE_CHANGE_CONNECTION_BTN_VISIBLE(false);
          BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] = 0;
          BATTLE_AUTO_CONNECTION_OBJ['next_connection_count_down'] = BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge']['time_limit'];
        }
      }
      else{
        BATTLE_AUTO_CONNECTION_OBJ['next_connection_count_down'] -= PHINA_APP.deltaTime;
        if(BATTLE_AUTO_CONNECTION_OBJ['next_connection_count_down'] <= 0){
          BATTLE_AUTO_CONNECTION_OBJ['next_connection_count_down'] = 61000;
          //再通信処理を実行
          console.log("自動通信を実行");
          G_BATTLE_SYNC_BATTLE_INSTANCE();
        }
      }
    }
  },
});

//決定ボタン等を押していいかどうかの状態を取得
function G_BATTLE_GET_CONNECTION_VISIBLE(){
  if(BATTLE_AUTO_CONNECTION_OBJ == null) return true;
  if(BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] == 0) return true;
  else return false;
}

//決定ボタン等の一部のボタンを非アクティブにする
function G_BATTLE_CHANGE_CONNECTION_BTN_VISIBLE(bool){
  if(bool == false){
    if(BATTLE_COMMAND_WINDOW_TYPE == 0){
      if(isset(BATTLE_COMMAND_WINDOW_BTNS[0]) && isset(BATTLE_COMMAND_WINDOW_BTNS[1]))
      BATTLE_COMMAND_WINDOW_BTNS[0].alpha = 1;
      BATTLE_COMMAND_WINDOW_BTNS[1].alpha = 1;
    }
  }
  else{
    if(BATTLE_COMMAND_WINDOW_TYPE == 0){
      if(isset(BATTLE_COMMAND_WINDOW_BTNS[0]) && isset(BATTLE_COMMAND_WINDOW_BTNS[1]))
      BATTLE_COMMAND_WINDOW_BTNS[0].alpha = 0.5;
      BATTLE_COMMAND_WINDOW_BTNS[1].alpha = 0.5;
    }
  }
}

//通信を実行するボタンの禁止制限時間を開始
function G_BATTLE_START_CONNECTION_BTN_VISIBLE(){
  if(BATTLE_AUTO_CONNECTION_OBJ == null) return 0;
  if(!isset(BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'])) return 0;
  BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] = 5000; //5秒間押せない
}

//ユニークNoから、エントリーデータを取得
function G_BATTLE_GET_ENTRY_DATA(uniqueNo){
  var result = null;
  for (var i = 0; i < BATTLE_ENTRY_DATAS.length; i++) {
    if(BATTLE_ENTRY_DATAS[i]['unique_no'] == uniqueNo) {result = BATTLE_ENTRY_DATAS[i]; break;}
  }
  return result;
}

//ユニークNoから、最大HPを取得
function G_BATTLE_GET_MAX_HP(uniqueNo){
  var result = 0;
  for (var i = 0; i < BATTLE_MAX_HPS.length; i++) {
    if(BATTLE_MAX_HPS[i]['unique_no'] == uniqueNo){ result = BATTLE_MAX_HPS[i]['status_val']; break;}
  }
  return result;
}

//フィールド生成後に実行される共通処理はこの関数に記載
function G_BATTLE_SET_FIELD(field){
  BATTLE_FIELD_STATUS_MAX = 0 //ステータス種類の最大値↓に追加した場合、加算すること
  field['field_status'] = 0; //1:選択状態(赤明滅) 2:ハイライト(黄色表示)
  field['field_status_1'] = Sprite('ASSET_809').addChildTo(field);
  BATTLE_FIELD_STATUS_MAX = BATTLE_FIELD_STATUS_MAX + 1;
  field['field_status_1']['select_active'] = false;
  field['field_status_1']['select_direction'] = 0;
  field['field_status_1']['alpha_speed'] = 0.05;
  field['field_status_1'].alpha = 0;
  field['field_status_1'].update = function() {
    if(this['select_active'] == true){
      if(this['select_direction'] == 0){ //加算
        this.alpha = this.alpha + this['alpha_speed'];
        if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
      }
      else if(this['select_direction'] == 1){
        this.alpha = this.alpha - this['alpha_speed'];
        if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
      }
    }
    if(this.parent['field_status'] != 0){
      if(this.parent['field_status'] == 1 && this['select_active'] == false){
        //選択を有効する前に全ての選択をリセット
        for (var i = 1; i < BATTLE_FIELD_STATUS_MAX + 1; i++) {
          var keyName = "field_status_" + i;
          if(isset(field[keyName]) && isset(field[keyName]['select_active'])) field[keyName]['select_active'] = false;
        }
        this['select_active'] = true;
      }
    }
    else if(this['select_active'] == true){ //明滅終了
      this['select_active'] = false;
      this.alpha = 0;
    }
  };
  //移動範囲ハイライト(黄)
  field['field_status_2'] = Sprite('ASSET_811').addChildTo(field);
  BATTLE_FIELD_STATUS_MAX = BATTLE_FIELD_STATUS_MAX + 1;
  field['field_status_2']['select_active'] = false;
  field['field_status_2']['select_direction'] = 0;
  field['field_status_2']['alpha_speed'] = 0.05;
  field['field_status_2'].alpha = 0;
  field['field_status_2'].update = function() {
    if(this['select_active'] == true){
        if(this['select_direction'] == 0){ //加算
          this.alpha = this.alpha + this['alpha_speed'];
          if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
        }
        else if(this['select_direction'] == 1){
          this.alpha = this.alpha - this['alpha_speed'];
          if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
        }
    }
    if(this.parent['field_status'] != 0){
      if(this.parent['field_status'] == 2 && this['select_active'] == false){
        //選択を有効する前に全ての選択をリセット
        for (var i = 1; i < BATTLE_FIELD_STATUS_MAX + 1; i++) {
          var keyName = "field_status_" + i;
          if(isset(field[keyName]) && isset(field[keyName]['select_active'])) field[keyName]['select_active'] = false;
        }
        this['select_active'] = true;
      }
    }
    else if(this['select_active'] == true){ //明滅終了
      this['select_active'] = false;
      this.alpha = 0;
    }
  };
  //コマンド決定済みステータス(緑)
  field['field_status_3'] = Sprite('ASSET_817').addChildTo(field);
  BATTLE_FIELD_STATUS_MAX = BATTLE_FIELD_STATUS_MAX + 1;
  field['field_status_3'].visible = false;
  //効果範囲表示(黄)
  field['field_status_4'] = Sprite('ASSET_811').addChildTo(field);
  BATTLE_FIELD_STATUS_MAX = BATTLE_FIELD_STATUS_MAX + 1;
  field['field_status_4']['select_active'] = false;
  field['field_status_4']['select_direction'] = 0;
  field['field_status_4']['alpha_speed'] = 0.05;
  field['field_status_4'].alpha = 0;
  field['field_status_4'].update = function() {
    if(this['select_active'] == true){
      if(this['select_direction'] == 0){ //加算
        this.alpha = this.alpha + this['alpha_speed'];
        if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
      }
      else if(this['select_direction'] == 1){
        this.alpha = this.alpha - this['alpha_speed'];
        if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
      }
    }
    if(this.parent['field_status'] != 0){
      if(this.parent['field_status'] == 4 && this['select_active'] == false){
        //選択を有効する前に全ての選択をリセット
        for (var i = 1; i < BATTLE_FIELD_STATUS_MAX + 1; i++) {
          var keyName = "field_status_" + i;
          if(isset(field[keyName]) && isset(field[keyName]['select_active'])) field[keyName]['select_active'] = false;
        }
        this['select_active'] = true;
      }
    }
    else if(this['select_active'] == true){ //明滅終了
      this['select_active'] = false;
      this.alpha = 0;
    }
  };

  //戦闘アニメ中、効果範囲表示(赤)
  field['field_status_5'] = Sprite('ASSET_809').addChildTo(field);
  BATTLE_FIELD_STATUS_MAX = BATTLE_FIELD_STATUS_MAX + 1;
  field['field_status_5']['select_active'] = false;
  field['field_status_5']['select_direction'] = 0;
  field['field_status_5']['alpha_speed'] = 0.05;
  field['field_status_5'].alpha = 0;
  field['field_status_5'].update = function() {
    if(this['select_active'] == true){
      if(this['select_direction'] == 0){ //加算
        this.alpha = this.alpha + this['alpha_speed'];
        if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
      }
      else if(this['select_direction'] == 1){
        this.alpha = this.alpha - this['alpha_speed'];
        if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
      }
    }
    if(this.parent['field_status'] != 0){
      if(this.parent['field_status'] == 5 && this['select_active'] == false){
        //選択を有効する前に全ての選択をリセット
        for (var i = 1; i < BATTLE_FIELD_STATUS_MAX + 1; i++) {
          var keyName = "field_status_" + i;
          if(isset(field[keyName]) && isset(field[keyName]['select_active'])) field[keyName]['select_active'] = false;
        }
        this['select_active'] = true;
      }
    }
    else if(this['select_active'] == true){ //明滅終了
      this['select_active'] = false;
      this.alpha = 0;
    }
  };

  //位置選択中に表示する赤枠
  field['select_red_ring'] = Sprite('ASSET_812').addChildTo(BATTLE_TILES_SUB_LAYER);
  field['select_red_ring'].x = field.x;
  field['select_red_ring'].y = field.y;
  field['select_red_ring'].visible = false;
  //フィールドの真上に設置するボタン
  field['button'] = Button({
    width: field.width * 0.7,         // 横サイズ
    height: field.height * 0.7,        // 縦サイズ
  }).addChildTo(field);
  field['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(BATTLE_ANIM_PLAY == false && WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      var fieldStatus = this.parent['field_status'];
      switch (fieldStatus) {
        case 2: //移動位置選択中
        {
          //完了ボタンと重なっていたら、操作無効
          if(BATTLE_MOVE_COMMAND_BTNS['done_btn'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['left_btn'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['right_btn'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['hold_btn'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['change_direction_btn_0'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['change_direction_btn_1'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['change_direction_btn_2'].hitTest(e.pointer.x,e.pointer.y)) return;
          if(BATTLE_MOVE_COMMAND_BTNS['change_direction_btn_3'].hitTest(e.pointer.x,e.pointer.y)) return;
          console.log("位置決定処理");
          //選択した位置にリングを表示
          if(this.parent['select_red_ring'].visible == false){
            G_BATTLE_RESET_POS_SELECT_SWITCH(false); //選択状態をリセット
            this.parent['select_red_ring'].visible = true;
            var setPos = new Array();
            setPos['x'] = this.parent['field_x'];
            setPos['y'] = this.parent['field_y'];
            //コマンドを設定
            G_BATTLE_SET_COMMAND_DATA(BATTLE_COMMAND_SET_UNIQUE_NO,setPos);
          }
          else{ //選択済みを選択した場合は、選択取り消し
            this.parent['select_red_ring'].visible = false;
            G_BATTLE_RESET_PLAYER_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO,1);
          }
        }
        break;
        default:
        break;
      }
    }
  };
  field['button'].visible = false;
  //方向矢印
  field['direction_arrow'] = new Array();
  field['direction_arrow']['0'] = Sprite('ASSET_815').addChildTo(field); //上
  field['direction_arrow']['0'].visible = false;
  field['direction_arrow']['1'] = Sprite('ASSET_813').addChildTo(field); //右
  field['direction_arrow']['1'].scaleX *= -1;
  field['direction_arrow']['1'].visible = false;
  field['direction_arrow']['2'] = Sprite('ASSET_815').addChildTo(field); //下
  field['direction_arrow']['2'].scaleY *= -1;
  field['direction_arrow']['2'].visible = false;
  field['direction_arrow']['3'] = Sprite('ASSET_813').addChildTo(field); //左
  field['direction_arrow']['3'].visible = false;
}

function G_BATTLE_SCENE_STEP(step){ //戦闘シーンステップ
  switch (step) {
    case 0: //初期状態
    break;
    case 1: //シーン切り替えアニメーション
    {
      var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(1);
      if(transAnimFlag == false){ //アニメ再生が完了した場合
        G_DELETE_TARNS_SCREEN_ANIM();
        //アクション登録権限が存在すれば、操作用コマンドメニューを表示
        if(BATTLE_PLAYER_PERMISSION != null && isset(BATTLE_PLAYER_PERMISSION['add_action']) && BATTLE_PLAYER_PERMISSION['add_action'] == true) G_BATTLE_COMMAND_WINDOW_DISP(0); //初期コマンド画面を表示
        else if(isset(BATTLE_PLAYER_PERMISSION['add_action']) && BATTLE_PLAYER_PERMISSION['add_action'] == false){
          //バトル操作権限なしの閲覧用の画面表示処理は此処に記載
        }
        BATTLE_SCENE_STEP = 2; //バトルシーン切り替え演出を開始
      }
    }
    break;
    case 2: //戦闘開始処理
    {

    }
    break;
  }
}

function G_BATTLE_SETUP(){ //戦闘開始処理

}

function G_BATTLE_COMMAND_WINDOW_DISP(type,param_0 = -1){ //コマンドウィンドウを表示 type 0:操作側で戦闘開始時、キャラ未選択,1:操作側でカードテーブル表示中
  //表示されているボタンを初期状態にする
  BATTLE_COMMAND_WINDOW_TYPE = type;
  for (var i = 0; i < BATTLE_COMMAND_WINDOW_BTNS.length; i++) {
    if(isset(BATTLE_COMMAND_WINDOW_BTNS[i]['icon'])) BATTLE_COMMAND_WINDOW_BTNS[i]['icon'].remove();
    BATTLE_COMMAND_WINDOW_BTNS[i].alpha = 1;
    BATTLE_COMMAND_WINDOW_BTNS[i].visible = false;
  }
  //カードログを非表示に
  if(isset(BATTLE_CARD_USE_LOG[0])) BATTLE_CARD_USE_LOG[0].visible = false;
  //タイトル初期化
  BATTLE_MAIN_MENU_BG['tite_text'].text = "";
  BATTLE_MAIN_MENU_BG['tite_text'].visible = false;
  //キャプションを非表示
  BATTLE_COMMAND_WINDOW_CAPTION.visible = false;
  //メインメニュー非表示
  BATTLE_MAIN_MENU_BG.visible = false;
  BATTLE_MAIN_MENU_MASK_BG.visible = false;
  //ログ背景非表示
  BATTLE_LOG_BG.visible = false;
  BATTLE_LOG_MASK_BG.visible = false;
  //戦闘ログを非表示に
  if(isset(BATTLE_LOG[0])) BATTLE_LOG[0].visible = false;

  switch (type) {
    case 0: //操作側で戦闘開始時、キャラ未選択
    {
      BATTLE_MAIN_MENU_BG.visible = true;
      BATTLE_MAIN_MENU_MASK_BG.visible = true;
      //オートアタックアイコン
      BATTLE_COMMAND_WINDOW_BTNS[0].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[0]['icon'] = Sprite('ASSET_807').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[0]);
      //決定アイコン
      BATTLE_COMMAND_WINDOW_BTNS[1].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[1]['icon'] = Sprite('ASSET_808').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[1]);
      //アニメーションスピード変更アイコン
      BATTLE_COMMAND_WINDOW_BTNS[2].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[2]['icon'] = Sprite('ASSET_967').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[2]);
      //キャプション
      BATTLE_COMMAND_WINDOW_CAPTION.visible = true;
      G_BATTLE_CAPTION_SWITCH("set_action");
    }
    break;
    case 1:
    {
      //タイトルを表示
      BATTLE_MAIN_MENU_BG.visible = true;
      BATTLE_MAIN_MENU_MASK_BG.visible = true;

      BATTLE_MAIN_MENU_BG['tite_text'].text = "デッキを選択して下さい。";
      BATTLE_MAIN_MENU_BG['tite_text'].visible = true;
      BATTLE_COMMAND_WINDOW_CAPTION.visible = true;
    }
    break;
    case 2:
    {
      //タイトルを表示
      BATTLE_MAIN_MENU_BG.visible = true;
      BATTLE_MAIN_MENU_MASK_BG.visible = true;

      BATTLE_MAIN_MENU_BG['tite_text'].text = "カードを選択して下さい。";
      BATTLE_MAIN_MENU_BG['tite_text'].visible = true;
      BATTLE_COMMAND_WINDOW_CAPTION.visible = true;
    }
    break;
    case 3: //カード使用ログ
    {
      BATTLE_MAIN_MENU_BG.visible = true;
      BATTLE_MAIN_MENU_MASK_BG.visible = true;

      if(isset(BATTLE_CARD_USE_LOG[0])) BATTLE_CARD_USE_LOG[0].visible = true;
      // var testLog = new Array();
      // testLog['unique_no'] = 0;
      // testLog['card_id'] = 1;
      // G_BATTLE_ADD_CARD_USE_LOG(testLog);
      // G_BATTLE_ADD_CARD_USE_LOG(testLog);
      // testLog['unique_no'] = 1;
      // testLog['card_id'] = 2;
      // G_BATTLE_ADD_CARD_USE_LOG(testLog);
      // G_BATTLE_ADD_CARD_USE_LOG(testLog);
      // testLog['unique_no'] = 2;
      // testLog['card_id'] = 3;
      // G_BATTLE_ADD_CARD_USE_LOG(testLog);
      // G_BATTLE_ANIM_CARD_USE_LOG();
    }
    break;
    case 4: //戦闘ログ
    {
      BATTLE_LOG_BG.visible = true;
      BATTLE_LOG_MASK_BG.visible = true;
      if(isset(BATTLE_LOG[0])) BATTLE_LOG[0].visible = true;
      // G_BATTLE_ADD_BATTLE_LOG(new Array());
      // G_BATTLE_ADD_BATTLE_LOG(new Array());
      // G_BATTLE_ADD_BATTLE_LOG(new Array());
      // G_BATTLE_ADD_BATTLE_LOG(new Array());
      // G_BATTLE_ADD_BATTLE_LOG(new Array());
      // G_BATTLE_ANIM_BATTLE_LOG();
    }
    break;
    case 5: //リザルトウィンドウ
    {
      BATTLE_MAIN_MENU_BG.visible = true;
      BATTLE_MAIN_MENU_MASK_BG.visible = true;
      //戦闘終了アイコン
      BATTLE_COMMAND_WINDOW_BTNS[1].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[1]['icon'] = Sprite('ASSET_963').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[1]);
      //戦闘ログ再生アイコン
      BATTLE_COMMAND_WINDOW_BTNS[3].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[3]['icon'] = Sprite('ASSET_961').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[3]);
      //ドロップアイコン
      BATTLE_COMMAND_WINDOW_BTNS[5].visible = true;
      BATTLE_COMMAND_WINDOW_BTNS[5]['icon'] = Sprite('ASSET_962').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[5]);
      //キャプション
      BATTLE_COMMAND_WINDOW_CAPTION.visible = true;
      G_BATTLE_CAPTION_SWITCH("set_result");
    }
    break;
    default:
    break;
  }
}

function G_BATTLE_PUSH_COMMAND_WINDOW_BTN(){ //コマンドウィンドウボタンが押された時の処理
  if(BATTLE_COMMAND_WINDOW_BTN_PUSH != -1){
    if(BATTLE_SELECT_COMMAND_TYPE == -1){ //コマンド入力中は操作無効にする
      if(BATTLE_COMMAND_WINDOW_TYPE == 0){ //コマンドウィンドウタイプ
        switch (BATTLE_COMMAND_WINDOW_BTN_PUSH) {
          case 0:
          {
            if(G_BATTLE_GET_CONNECTION_VISIBLE() == false) break;
            console.log("オートアタック処理を開始");
          }
          break;
          case 1:
          {
            if(G_BATTLE_GET_CONNECTION_VISIBLE() == false) break;
            console.log("コマンド決定処理を開始");
            G_BATTLE_COMMAND_DECISION(); //コマンドの決定が行われた
          }
          break;
          case 2:
          {
            console.log("アニメーションスピード変更処理を開始");
            G_BATTLE_ANIM_SPEED_UPDATE();
          }
          break;
          case 3:
          {

          }
          break;
          default:
          break;
        }
      }
      if(BATTLE_COMMAND_WINDOW_TYPE == 5){ //リザルトウィンドウタイプ
        switch (BATTLE_COMMAND_WINDOW_BTN_PUSH) {
          case 0:
          {
          }
          break;
          case 1: //戦闘画面終了処理
          {
            G_BATTLE_SCENE_EXE();
          }
          break;
          case 2:
          {

          }
          break;
          case 3: //戦闘ログを再生
          {
            //リプレイを開始
            NETWORK_IS_CONNECTING = true;
            var postParam = new Object();
            postParam['battle_instance_id'] = new Object();
            postParam['battle_instance_id'] = PLAYER_BATTLE_INSTANCE['battle_instance_id'];
            postParam['battle_replay'] = 1;
            G_BATTLE_SET_BEFOR_POST_PARAM(postParam);
            ajaxStart("post","json","../../client/battle/battle.php",postParam); //非同期通信開始
          }
          break;
          case 4:
          {

          }
          break;
          case 5: //ドロップリストを表示
          {
            if(BATTLE_RESULT_WINDOW_DROP_DATA == null) break;
            var listObj = G_BATTLE_CREATE_BATTLE_RESULT_WINDOW(BATTLE_RESULT_WINDOW_DROP_DATA);
            var checkList = new Array();
            checkList[checkList.length] = "close_item_info_window";
            G_UI_CREATE_LIST(BATTLE_UI_WINDOW_LAYER,listObj,listObj['list_height_size'],"戦闘結果","閉じる",checkList);
          }
          break;
          default:
          break;
        }
      }
    }
    console.log(BATTLE_COMMAND_WINDOW_BTN_PUSH);
    BATTLE_COMMAND_WINDOW_BTN_PUSH = -1;
  }
}

function G_BATTLE_DELETE_CHARACTER_POSITION(pos = null){ //戦闘参加者の配置を全て削除
  G_BATTLE_PLAYER_SET_COMMAND_INIT(BATTLE_PERMISSION_DATAS);
  G_BATTLE_RESET_FIELD_STATUS();
  for (var i = 0; i < BATTLE_FIELDS.length; i++) {
    var posCheck = false;
    if(pos != null){
      //位置指定の場合は座標チェック
      if(BATTLE_FIELDS['field_x'] != pos['x'] || BATTLE_FIELDS['field_y'] != pos['y']) continue;
      else posCheck = true;
    }
    if(isset(BATTLE_FIELDS[i]['direction_arrow'])
    && BATTLE_FIELDS[i]['direction_arrow'] != null){
      for (var da = 0; da < BATTLE_FIELDS[i]['direction_arrow'].length; da++) {
        if(BATTLE_FIELDS[i]['direction_arrow'][da] != null) {
          BATTLE_FIELDS[i]['direction_arrow'][da].visible = false;;
        }
      }
    }
    if(isset(BATTLE_FIELDS[i]['button'])
    && isset(BATTLE_FIELDS[i]['button']['unique_no'])){
      delete BATTLE_FIELDS[i]['button']['unique_no'];
    }
    if(isset(BATTLE_FIELDS[i]['hp_gauge'])
    && BATTLE_FIELDS[i]['hp_gauge'] != null){
      BATTLE_FIELDS[i]['hp_gauge'].remove();
      BATTLE_FIELDS[i]['hp_gauge'] = null;
    }
    if(isset(BATTLE_FIELDS[i]['move_image'])
    && BATTLE_FIELDS[i]['move_image'] != null){
      BATTLE_FIELDS[i]['move_image'].remove();
      BATTLE_FIELDS[i]['move_image'] = null;
      delete BATTLE_FIELDS[i]['move_image'];
    }
    if(isset(BATTLE_FIELDS[i]['use_avatar_image']) && BATTLE_FIELDS[i]['use_avatar_image'] != null){
      BATTLE_FIELDS[i]['use_avatar_image'].remove();
      BATTLE_FIELDS[i]['use_avatar_image'] = null;
      delete BATTLE_FIELDS[i]['use_avatar_image'];
    }
    if(isset(BATTLE_FIELDS[i]['equip_avatar_image']) && BATTLE_FIELDS[i]['equip_avatar_image'] != null){
      BATTLE_FIELDS[i]['equip_avatar_image'].remove();
      BATTLE_FIELDS[i]['equip_avatar_image'] = null;
      delete BATTLE_FIELDS[i]['equip_avatar_image'];
    }
    if(isset(BATTLE_FIELDS[i]['enemy_image']) && BATTLE_FIELDS[i]['enemy_image'] != null){
      BATTLE_FIELDS[i]['enemy_image'].remove();
      BATTLE_FIELDS[i]['enemy_image'] = null;
      delete BATTLE_FIELDS[i]['enemy_image'];
    }
    if(isset(BATTLE_FIELDS[i]['button']['entry_type'])){
      delete BATTLE_FIELDS[i]['button']['entry_type'];
    }


    if(posCheck == true) break;
  }
  console.log("キャラクターポジション削除");
}

function G_BATTLE_FORCE_DELETE_CHARACTER_SPRITE(){ //キャラクタースプライトを強制削除
  //全てのスプライトが本当に削除されていたかチェック
  for (var bsl = 0; bsl < BATTLE_SPRITE_LIST.length; bsl++) {
    if(BATTLE_SPRITE_LIST[bsl] != null) {
      BATTLE_SPRITE_LIST[bsl].remove();
      BATTLE_SPRITE_LIST[bsl] = null;
      delete BATTLE_SPRITE_LIST[bsl];
    }
  }
  BATTLE_SPRITE_LIST.length = 0;
}

function G_BATTLE_SET_CHARACTER_POSITION(entryDatas,uniqueNo = -1){ //戦闘参加者をタイルの上に設置
  for (var i = 0; i < entryDatas.length; i++) {
    if(uniqueNo != -1 && entryDatas[i]['unique_no'] != uniqueNo) continue;
    if(entryDatas[i]['is_dead'] == true) continue;
    var entryData = entryDatas[i];
    var field = G_BATTLE_GET_FIELD(entryData['pos']['x'],entryData['pos']['y']);
    //方向矢印
    if(entryData['direction'] == 0) field['direction_arrow']['0'].visible = true;
    else if(entryData['direction'] == 1) field['direction_arrow']['1'].visible = true;
    else if(entryData['direction'] == 2) field['direction_arrow']['2'].visible = true;
    else if(entryData['direction'] == 3) field['direction_arrow']['3'].visible = true;
    //キャラ画像表示
    if(entryData['entry_type']['type'] == 0){ //プレイヤータイプ
      G_BATTLE_CREATE_PLAYER_AVATAR(BATTLE_CHARACTER_LAYER,entryData,0.25,field.x,field.y,field);
    }
    else if(entryData['entry_type']['type'] == 1){ //エネミータイプ
      G_BATTLE_CREATE_ENEMY_IMAGE(BATTLE_CHARACTER_LAYER,entryData,0.25,field.x,field.y,field);
    }
    //共通処理
    //ボタン
    field['button'] = Button({
      width: (field.width / 2),         // 横サイズ
      height: field.height,        // 縦サイズ
    }).addChildTo(field);
    field['button'].y = field['button'].y - (field.height / 2);
    field['button']['entry_type'] = new Array();
    field['button']['entry_type']['type'] = entryData['entry_type']['type'];
    field['button']['entry_type']['id'] = entryData['entry_type']['id'];
    field['button']['team_no'] = entryData['party_instance']['team_no'];
    field['button']['unique_no'] = entryData['unique_no'];
    field['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(BATTLE_ANIM_PLAY == false && WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        if(isset(this['entry_type'])){
          if(this['entry_type']['type'] == 0){ //プレイヤー処理
            //コマンドメニュー表示処理
            if(BATTLE_PLAYER_ENTRY_DATA != null && BATTLE_PLAYER_ENTRY_DATA['party_instance']['team_no'] != this['team_no']) return; //チームが違う
            if(BATTLE_COMMAND_MENU_CONTROLE_FLAG == true) return; //今は押せない状態
            if(BATTLE_COMMAND_CONTROLE_FINISH == true) return; //戦闘が終了していた。
            this.parent['field_status'] = 1; //フィールドステータスを選択状態にする。
            this.parent['command_menu'] = G_BATTLE_CREATE_COMMAND_MENU(this['entry_type'],this['unique_no']);
            this.parent['command_menu'].addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
            this.parent['command_menu'].x = this.parent.x;
            this.parent['command_menu'].y = this.parent.y;
            if(this.parent['field_x'] < 3){
              this.parent['command_menu'].x = this.parent['command_menu'].x + this.parent['command_menu'].width;
            }
            else{
              this.parent['command_menu'].x = this.parent['command_menu'].x - this.parent['command_menu'].width;
            }
            if(1 < this.parent['field_y']){
              this.parent['command_menu'].y = this.parent['command_menu'].y - (this.parent['command_menu'].height / 2);
            }
            else{
              this.parent['command_menu'].y = this.parent['command_menu'].y + (this.parent['command_menu'].height / 2);
            }
          }
          else if(this['entry_type']['type'] == 1){ //エネミー処理

          }
        }
      }
    };
    field['button'].visible = false;
    //HPゲージ表示
    var maxHp = G_BATTLE_GET_MAX_HP(entryData['unique_no']);
    var nowHp = entryData['hp'];
    var hpPercentage = ((nowHp / maxHp) * 100);
    field['hp_gauge'] = Gauge({
      width: 64,            // 横サイズ
      height: 4,            // 縦サイズ
      cornerRadius: 10,      // 角丸み
      maxValue: 100,         // ゲージ最大値
      value: hpPercentage,   // ゲージ初期値
      fill: 'white',         // 後ろの色
      gaugeColor: 'red', // ゲージ色
      stroke: 'silver',      // 枠色
      strokeWidth: 2,        // 枠太さ
    }).addChildTo(field);
    field['hp_gauge'].y = field['hp_gauge'].y - field.height;
    field['hp_gauge'].visible = false;
  }

  //表示順を整形
  BATTLE_CHARACTER_LAYER.children.sort(function(a,b){
    if(a.position.y < b.position.y) return -1;
    if(a.position.y > b.position.y) return 1;
    return 0;
  });
}

function G_BATTLE_ADD_CAPTION_LIST(text, color = 'black', key = ""){ //キャプションテキストを追加
  var addCaptionLabel = Label({
    text: text,
    fontSize: 26,
    fill: color,
  });
  addCaptionLabel['disp_visible'] = true;
  addCaptionLabel['key'] = key;
  addCaptionLabel.addChildTo(BATTLE_COMMAND_WINDOW_CAPTION);
  addCaptionLabel.x = addCaptionLabel.x - SCREEN_WIDTH;
  addCaptionLabel['init_pos_x'] = addCaptionLabel.x;
  BATTLE_CAPTION_TEXT_LIST[BATTLE_CAPTION_TEXT_LIST.length] = addCaptionLabel;
}

function G_BATTLE_CAPTION_ANIM_EXE(){ //キャプションアニメを開始
  if(BATTLE_COMMAND_WINDOW_CAPTION != null && BATTLE_COMMAND_WINDOW_CAPTION['play_now'] == false && BATTLE_CAPTION_TEXT_LIST.length != 0){
    for (var i = 0; i < BATTLE_CAPTION_TEXT_LIST.length; i++) {
      if(BATTLE_COMMAND_WINDOW_CAPTION['play_index'] == i){
        if(BATTLE_CAPTION_TEXT_LIST[i]['disp_visible'] == true){
          BATTLE_COMMAND_WINDOW_CAPTION['play_now'] = true;
          BATTLE_CAPTION_TEXT_LIST[i].tweener.by({
            x:SCREEN_WIDTH,
          },1000,"swing").wait(3000).by({
            x:SCREEN_WIDTH,
          },1000,"swing").call(function(){
            this.target.x = this.target['init_pos_x'];
            BATTLE_COMMAND_WINDOW_CAPTION['play_now'] = false;
            BATTLE_COMMAND_WINDOW_CAPTION['play_index'] = BATTLE_COMMAND_WINDOW_CAPTION['play_index'] + 1;
            if(BATTLE_CAPTION_TEXT_LIST.length - 1 < BATTLE_COMMAND_WINDOW_CAPTION['play_index']) BATTLE_COMMAND_WINDOW_CAPTION['play_index'] = 0;
          }).play();
          break;
        }
        else{ //再生スキップの場合
          BATTLE_COMMAND_WINDOW_CAPTION['play_index'] = BATTLE_COMMAND_WINDOW_CAPTION['play_index'] + 1;
          if(BATTLE_CAPTION_TEXT_LIST.length - 1 < BATTLE_COMMAND_WINDOW_CAPTION['play_index']) BATTLE_COMMAND_WINDOW_CAPTION['play_index'] = 0;
        }
      }
    }
  }
}

//指定したキーのキャプションに切り替える
function G_BATTLE_CAPTION_SWITCH(key){
  for (var i = 0; i < BATTLE_CAPTION_TEXT_LIST.length; i++) {
    if(BATTLE_CAPTION_TEXT_LIST[i]['key'] == key) {BATTLE_CAPTION_TEXT_LIST[i]['disp_visible'] = true;}
    else {BATTLE_CAPTION_TEXT_LIST[i]['disp_visible'] = false;}
  }
}

function G_BATTLE_SET_PLAYER_PERMISSION(playerEntryData,permissionDatas){ //プレイヤーのパーミッションデータを設定
  console.log(playerEntryData);
  for(key in permissionDatas){
    BATTLE_PLAYER_PERMISSION[key] = false;
    if(playerEntryData == null) continue;
    for (var i = 0; i < permissionDatas[key].length; i++) {
      if(permissionDatas[key][i] == playerEntryData['unique_no']) BATTLE_PLAYER_PERMISSION[key] = true;
    }
    console.log(key + ":" + BATTLE_PLAYER_PERMISSION[key]);
  }
}

function G_BATTLE_SET_PERMISSION(entryDatas,permissionDatas){ //全員のパーミッションデータを設定
  BATTLE_PERMISSION_DATAS = new Array();
  for (var i = 0; i < entryDatas.length; i++) {
    var addData = new Array();
    addData['unique_no'] = entryDatas[i]['unique_no'];
    for(key in permissionDatas){
      addData[key] = false;
      for (var j = 0; j < permissionDatas[key].length; j++) {
        if(permissionDatas[key][j] == entryDatas[i]['unique_no']) addData[key] = true;
      }
    }
    BATTLE_PERMISSION_DATAS[BATTLE_PERMISSION_DATAS.length] = addData;
  }
  console.log("パーミッション");
  console.log(BATTLE_PERMISSION_DATAS);
}

function G_BATTLE_GET_FIELD(x,y){ //フィールドレイヤーを取得
  for (var i = 0; i < BATTLE_FIELDS.length; i++) {
    if(BATTLE_FIELDS[i]['field_x'] == x && BATTLE_FIELDS[i]['field_y'] == y){
      return BATTLE_FIELDS[i];
      break;
    }
  }
}

function G_BATTLE_CREATE_PLAYER_AVATAR(parentBase,entryData,scale = 1.0,posX = 0,posY = 0,setField = null){ //プレイヤーアバターを生成
  var sprites = new Array();
  var equipItemDatas = new Array();
  var equipItemIds = entryData['equip_items'].split(',');
  for (var i = 0; i < equipItemIds.length; i++) {
    for (var j = 0; j < BATTLE_MASTER_DATAS['equip_item_master_datas'].length; j++) {
      if(BATTLE_MASTER_DATAS['equip_item_master_datas'][j]['id'] == equipItemIds[i]){
        equipItemDatas[equipItemDatas.length] = BATTLE_MASTER_DATAS['equip_item_master_datas'][j];
        break;
      }
    }
  }

  var addData = new Array();
  addData['type'] = 0; //プレイヤータイプを指定 (エントリータイプクラスと同じ)
  addData['id'] = 0; //playerIndexIdを指定 (エントリータイプクラスと同じ)
  addData['avatar'] = new Array();
  var setScale = 1;
  if(entryData['direction_disp'] == 0) setScale = -1;
  var convertAvatarData = G_HELPER_CONVERT_AVATART_DATA(entryData['avatar_data'],equipItemDatas);
  var equipAvaSpr = G_AVATAR_DISP(convertAvatarData, "equip", "right", scale * setScale, scale, entryData['avatar_data']['visible_head_equip_item']);
  BATTLE_SPRITE_LIST[BATTLE_SPRITE_LIST.length] = equipAvaSpr['sprites'][0];
  if(parentBase != null){
    if(setField == null) addData['avatar']['equip'] = parentBase['equip_avatar_image'] = equipAvaSpr['sprites'][0];
    else addData['avatar']['equip'] = setField['equip_avatar_image'] = equipAvaSpr['sprites'][0];
    addData['avatar']['equip'].addChildTo(parentBase);
    addData['avatar']['equip'].x = posX;
    addData['avatar']['equip'].y = posY;
    if(setField != null) addData['avatar']['equip'].y = addData['avatar']['equip'].y - (setField.height * 1.5);
    addData['avatar']['equip'].visible = false;
  }
  else{
    sprites[0] = equipAvaSpr['sprites'][0];
  }

  var useAvaSpr = G_AVATAR_DISP(convertAvatarData, "use", "right", scale * setScale, scale, entryData['avatar_data']['visible_head_equip_item']);
  BATTLE_SPRITE_LIST[BATTLE_SPRITE_LIST.length] = useAvaSpr['sprites'][0];
  if(parentBase != null){
    if(setField == null) addData['avatar']['use'] = parentBase['use_avatar_image'] = useAvaSpr['sprites'][0];
    else addData['avatar']['use'] = setField['use_avatar_image'] = useAvaSpr['sprites'][0];
    addData['avatar']['use'].addChildTo(parentBase);
    addData['avatar']['use'].x = posX;
    addData['avatar']['use'].y = posY;
    if(setField != null) addData['avatar']['use'].y = addData['avatar']['use'].y - (setField.height * 1.5);
    BATTLE_CHARACTER_IMAGES[BATTLE_CHARACTER_IMAGES.length] = addData;
  }
  else{
    sprites[1] = useAvaSpr['sprites'][0];
  }

  //親がnullの場合はスプライトだけを返す
  if(parentBase == null) return sprites;
  else return addData['avatar'];
}

function G_BATTLE_CREATE_ENEMY_IMAGE(parentBase,entryData,scale = 1.0,posX = 0,posY = 0,setField = null){ //敵イメージを生成
  var assetType = entryData['enemy_asset_master']['enemy_asset_type'];
  var enemySpr = null;
  switch (parseInt(assetType)) {
    case 0: //アセットタグID直接指定
    {
      var tag = "enemy_image_"+ entryData['enemy_asset_master']['param_0'];
      enemySpr = G_ASSET_GET_SPRITE(tag);
      BATTLE_SPRITE_LIST[BATTLE_SPRITE_LIST.length] = enemySpr;
      console.log(tag);
      //enemySpr.height = enemySpr.height * (entryData['enemy_asset_master']['size'] * scale);
      //enemySpr.width = enemySpr.width * (entryData['enemy_asset_master']['size'] * scale);
      enemySpr.setScale(scale, scale);
      if(entryData['direction_disp'] == 0){
        enemySpr.scaleX = enemySpr.scaleX * -1;
        console.log("ディレクションディスプ0");
      }
      if(parentBase != null){
        if(setField == null) parentBase['enemy_image'] = enemySpr;
        else setField['enemy_image'] = enemySpr;
        enemySpr.addChildTo(parentBase);
        enemySpr.y = posY;
        enemySpr.x = posX;
        if(setField != null) enemySpr.y = enemySpr.y - (setField.height * 1.5);
      }
    }
    break;
    case 1:
    break;
    case 2:
    break;
    default:
    break;
  }
  return enemySpr;
}

//コマンドメニューを作成
function G_BATTLE_CREATE_COMMAND_MENU(entryTypeData,uniqueNo){
  BATTLE_COMMAND_MENU_CONTROLE_FLAG = true;
  if(!isset(entryTypeData['type']) || !isset(entryTypeData['id'])) return null;
  var result = null;
  var btnMaxCount = 4;

  //背景
  result = Sprite('ASSET_804');
  result['buttons'] = new Array();
  result['select_comamnd_btn_index'] = -1;
  result.update = function() {
    if(this['select_comamnd_btn_index'] != -1){
      var btnIndex = this['select_comamnd_btn_index'];
      console.log("押されたコマンドボタン:" + btnIndex);
      G_BATTLE_PUSH_COMMAND_BTN(entryTypeData,uniqueNo,btnIndex);
      this['select_comamnd_btn_index'] = -1;
    }
  };
  //コマンドボタン背景
  var btnYPos = 0;
  for (var i = 0; i < btnMaxCount; i++) {
    var commandBtn = Sprite('ASSET_799').addChildTo(result);
    if(i == 0) commandBtn.y = btnYPos = commandBtn.y - ((result.height / 2) - ((commandBtn.height / 2) + 6));
    else commandBtn.y = btnYPos = btnYPos + commandBtn.height;
    //ボタン本体
    commandBtn['button'] = Button({
      width: commandBtn.width,         // 横サイズ
      height: commandBtn.height,        // 縦サイズ
    }).addChildTo(commandBtn);
    commandBtn['button']['index'] = i;
    commandBtn['button']['btn_visible'] = true;
    commandBtn['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['btn_visible'] == false) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        this.parent.parent['select_comamnd_btn_index'] = this['index'];
      }
    };
    commandBtn['button'].visible = false;
    //ボタンラベル
    var text = "";
    var size = 32;
    var color = "black";
    var btnVisible = true;
    if(entryTypeData['type'] == 0){ //プレイヤー処理
      if(i == 0) {
        text = "移動";
        btnVisible = G_BATTLE_CHECK_PERMISSION(uniqueNo,"add_action");
      }
      if(i == 1){
        text = "カード";
        btnVisible = G_BATTLE_CHECK_PERMISSION(uniqueNo,"add_action");
      }
      if(i == 2){
        size = 16;
        text = "移動&カード";
        btnVisible = G_BATTLE_CHECK_PERMISSION(uniqueNo,"add_action");
      }
      if(i == 3){
        text = "待機";
        btnVisible = G_BATTLE_CHECK_PERMISSION(uniqueNo,"add_action");
        if(btnVisible == true){
          //既に待機状態になっているか、チェック
          var commandData = G_BATTLE_GET_COMMAND_DATA(uniqueNo);
          if(commandData != null){
            if(commandData['is_stay'] != -1) text = "待機取消";
          }
        }
      }
    }
    else if(entryTypeData['type'] == 1){ //エネミー処理

    }
    //ラベル
    commandBtn['label'] = Label({text: text,fontSize: size,fill: color}).addChildTo(commandBtn);
    //ボタンの有効状態を確認
    if(btnVisible == false){
      commandBtn['button']['btn_visible'] = btnVisible;
      commandBtn.alpha = 0.5; //半透明にする。
    }
    result['buttons'][result['buttons'].length] = commandBtn;
  }
  //閉じるボタン
  result['close_button'] = Sprite('ASSET_801').addChildTo(result);
  result['close_button'].x = result['close_button'].x + ((result.width / 2) + result['close_button'].width);
  result['close_button'].y = result['close_button'].y - ((result.height / 2) + result['close_button'].height);
  //閉じるボタン本体
  result['close_button']['button'] = Button({
    width: result['close_button'].width,         // 横サイズ
    height: result['close_button'].height,        // 縦サイズ
  }).addChildTo(result['close_button']);
  result['close_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      G_BATTLE_RESET_FIELD_STATUS();
      BATTLE_COMMAND_MENU_CONTROLE_FLAG = false;
      this.parent.parent.remove();
      this.parent.parent = null;
    }
  };
  result['close_button']['button'].visible = false;
  //ホールドボタン
  result['hold_button'] = Sprite('ASSET_802').addChildTo(result);
  result['hold_button'].y = result['hold_button'].y - ((result.height / 2) + result['hold_button'].height);
  result['hold_button'].alpha = 0.5;
  //ホールドボタン本体
  result['hold_button']['button'] = Button({
    width: result['hold_button'].width,         // 横サイズ
    height: result['hold_button'].height,        // 縦サイズ
  }).addChildTo(result['hold_button']);
  result['hold_button']['button']['start_pos_x'] = 0;
  result['hold_button']['button']['start_pos_y'] = 0;
  result['hold_button']['button'].onpointstart = function(e){
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      this['start_pos_x'] = e.pointer.x;
      this['start_pos_y'] = e.pointer.y;
    }
  };
  result['hold_button']['button'].onpointmove = function(e){
    if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      var moveX = 0; //X移動量
      var moveY = 0; //Y移動量
      if(e.pointer.x != this['start_pos_x']){
        if(this['start_pos_x'] < e.pointer.x) moveX = e.pointer.x - this['start_pos_x'];
        else moveX = (this['start_pos_x'] - e.pointer.x) * -1;
      }
      if(e.pointer.y != this['start_pos_y']){
        if(this['start_pos_y'] < e.pointer.y) moveY = e.pointer.y - this['start_pos_y'];
        else moveY = (this['start_pos_y'] - e.pointer.y) * -1;
      }
      //移動制限区域
      //上
      if(e.pointer.y < this.height) moveY = 0;
      //下
      if(400 < e.pointer.y) moveY = 0;
      //右
      if(e.pointer.x < (this.parent.parent.width / 2)) moveX = 0;
      //左
      if((SCREEN_WIDTH - (this.parent.parent.width / 2)) < e.pointer.x) moveX = 0;

      //移動量によってUIを移動
      this.parent.parent.x = this.parent.parent.x + moveX;
      this.parent.parent.y = this.parent.parent.y + moveY;

      this['start_pos_x'] = e.pointer.x;
      this['start_pos_y'] = e.pointer.y;
    }
  };
  result['hold_button']['button'].visible = false;

  return result;
}

//コマンドボタンが押された時の処理
function G_BATTLE_PUSH_COMMAND_BTN(entryTypeData,uniqueNo,btnIndex){
  BATTLE_COMMAND_SET_UNIQUE_NO = uniqueNo; //コマンド設定中のユニーク番号を更新
  if(entryTypeData['type'] == 0){ //プレイヤーに対しての処理
    switch (parseInt(btnIndex)) {
      case 0: //移動
      {
        BATTLE_SELECT_COMMAND_TYPE = btnIndex;
        G_BATTLE_CREATE_MOVE_COMMAND_BTNS(uniqueNo);
      }
      break;
      case 1: //カード
      {
        BATTLE_SELECT_COMMAND_TYPE = btnIndex;
        BATTLE_CARD_SELECT_STEP = 1;//デッキ選択ステップに移行
        G_BATTLE_SELECT_CARD_START(uniqueNo);
      }
      break;
      case 2: //移動&カード
      {
        BATTLE_SELECT_COMMAND_TYPE = btnIndex;
        G_BATTLE_CREATE_MOVE_COMMAND_BTNS(uniqueNo);
      }
      break;
      case 3: //待機
      {
        BATTLE_SELECT_COMMAND_TYPE = btnIndex;
        G_BATTLE_SET_WAIT_COMMAND(uniqueNo); //待機コマンドを設定
      }
      break;
      default:
      break;
    }
  }
}

//自分のエントリーデータを取得

function G_BATTLE_GET_PLAYER_ENTRY_DATA(playerIndexId,entryDatas){
  var result = null;
  for (var i = 0; i < entryDatas.length; i++) {
    if(entryDatas[i]['entry_type']['type'] == 0 && entryDatas[i]['entry_type']['id'] == playerIndexId){
      result = entryDatas[i];
      break;
    }
  }
  return result;
}

//パーミッションが有効か確認する。
function G_BATTLE_CHECK_PERMISSION(uniqueNo,name){
  var result = false;
  for (var i = 0; i < BATTLE_PERMISSION_DATAS.length; i++) {
    if(isset(BATTLE_PERMISSION_DATAS[i][name]) && BATTLE_PERMISSION_DATAS[i]['unique_no'] == uniqueNo) result = BATTLE_PERMISSION_DATAS[i][name];
  }
  return result;
}

//フィールドステータスをリセット 引数:リセット対象のステータス値を指定 0の場合は全てリセット
function G_BATTLE_RESET_FIELD_STATUS(status = 0){
  for (var i = 0; i <  BATTLE_FIELDS.length; i++) {
    if(status == 0) {
      BATTLE_FIELDS[i]['field_status'] = 0;
      if(isset(BATTLE_FIELDS[i]['button']) && isset(BATTLE_FIELDS[i]['button']['unique_no']) && BATTLE_FIELDS[i]['button']['unique_no'] != -1){
        console.log(BATTLE_FIELDS[i]['button']['unique_no']);
        var checkAddCommand = G_BATTLE_CHECK_ADD_COMMAND(BATTLE_FIELDS[i]['button']['unique_no']);
        if(checkAddCommand == false){ BATTLE_FIELDS[i]['field_status_3'].visible = false;}
        else {BATTLE_FIELDS[i]['field_status_3'].visible = true; BATTLE_FIELDS[i]['field_status_3'].alpha = 1;}
        console.log(BATTLE_FIELDS[i]['button']['unique_no']);
      }
    }
    else if(BATTLE_FIELDS[i]['field_status'] == status) BATTLE_FIELDS[i]['field_status'] = 0;
    if(status == 3){
      if(isset(BATTLE_FIELDS[i]['button']) && isset(BATTLE_FIELDS[i]['button']['unique_no']) && BATTLE_FIELDS[i]['button']['unique_no'] != -1){
        console.log(BATTLE_FIELDS[i]['button']['unique_no']);
        if(false == G_BATTLE_CHECK_ADD_COMMAND(BATTLE_FIELDS[i]['button']['unique_no'])){ BATTLE_FIELDS[i]['field_status_3'].visible = false;}
        else {BATTLE_FIELDS[i]['field_status_3'].visible = true; BATTLE_FIELDS[i]['field_status_3'].alpha = 1;}
      }
    }
  }
}

//移動コマンドボタン一式を生成
function G_BATTLE_CREATE_MOVE_COMMAND_BTNS(uniqueNo){
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo); //エントリーデータを取得。
  var field = null;
  //フィールドを検索。
  for (var i = 0; i <  BATTLE_FIELDS.length; i++) {
    if(isset(BATTLE_FIELDS[i]['button'])
    && isset(BATTLE_FIELDS[i]['button']['unique_no'])
    && BATTLE_FIELDS[i]['button']['unique_no'] != -1
    && BATTLE_FIELDS[i]['button']['unique_no'] == uniqueNo){field = BATTLE_FIELDS[i]; break;}
  }
  //フィールドの位置を基にボタンを表示し、コマンドメニューが表示されていれば削除
  if(field != null){
    console.log(field);
    if(isset(field['command_menu']) && field['command_menu'] != null) {field['command_menu'].remove(); field['command_menu'] = null;}
    field['move_command_btns'] = Sprite('ASSET_810').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
    field['move_command_btns'].x = field.x;
    field['move_command_btns'].y = field.y;

    if(this.parent['field_x'] < 3){
      field['move_command_btns'].x = field['move_command_btns'].x + (field['move_command_btns'].width * 2);
    }
    if(this.parent['field_x'] == 6){
      console.log("表示変更");
      field['move_command_btns'].x = field['move_command_btns'].x - field['move_command_btns'].width;
    }
    if(4 < this.parent['field_y']){
      field['move_command_btns'].y = field['move_command_btns'].y - (field['move_command_btns'].height * 5);
    }
    // field['move_command_btns'].x = field['move_command_btns'].x + (field['move_command_btns'].width * 0.75);
    // field['move_command_btns'].y = field['move_command_btns'].y - (field['move_command_btns'].height * 5);

    //左ボタン
    field['move_command_btns']['left_btn'] = BATTLE_MOVE_COMMAND_BTNS['left_btn'] = Button({
      width: (field['move_command_btns'].width / 3),         // 横サイズ
      height: field['move_command_btns'].height,        // 縦サイズ
    }).addChildTo(field['move_command_btns']);
    field['move_command_btns']['left_btn'].x = field['move_command_btns']['left_btn'].x - (field['move_command_btns']['left_btn'].width);
    field['move_command_btns']['left_btn'].visible = false;
    //左ボタン選択キューブ
    field['move_command_btns']['left_btn_select'] = RectangleShape({width:field['move_command_btns']['left_btn'].width,
    height:field['move_command_btns']['left_btn'].height,fill:"red"}).addChildTo(field['move_command_btns']);
    field['move_command_btns']['left_btn_select'].x = field['move_command_btns']['left_btn'].x;
    field['move_command_btns']['left_btn_select'].alpha = 0;
    field['move_command_btns']['left_btn_select']['select_active'] = true; //初期は有効
    field['move_command_btns']['left_btn_select']['select_direction'] = -1;
    field['move_command_btns']['left_btn_select']['anim_speed'] = 0.05;
    field['move_command_btns']['left_btn_select'].update = function() {
      if(this['select_active'] == true){
        if(this['select_direction'] == 0){
          this.alpha = this.alpha + this['anim_speed'];
          if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
        }
        else if(this['select_direction'] == 1){
          this.alpha = this.alpha - this['anim_speed'];
          if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
        }
        else if(this['select_direction'] == -1){this['select_direction'] = 0;}
      }
      else if(this['select_direction'] != -1){ //再生停止していない場合
        this['select_direction'] = -1;
        this.alpha = 0;
      }
    };
    field['move_command_btns']['left_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        if(this.parent['left_btn_select']['select_active'] == true) return;
        else{ //位置モードでなければ、位置モードを実行
          this.parent['left_btn_select']['select_active'] = true;
          this.parent['right_btn_select']['select_active'] = false;
          //方向選択ボタンを非表示に
          var getEntrydata = G_BATTLE_GET_ENTRY_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
          G_BATTLE_SWITCH_DIRECTION_BTNS(field['move_command_btns'],false,getEntrydata['direction']);
          //移動モードを開始
          G_BATTLE_POS_SELECT_MODE_START(BATTLE_COMMAND_SET_UNIQUE_NO,BATTLE_MOVE_AREAS);
        }
      }
    };
    //左ボタンラベル
    field['move_command_btns']['left_btn_label'] = Label({ text: "位置",fontSize: 16,fill: 'black'}).addChildTo(field['move_command_btns']);
    field['move_command_btns']['left_btn_label'].x = field['move_command_btns']['left_btn'].x;

    //右ボタン
    field['move_command_btns']['right_btn'] = BATTLE_MOVE_COMMAND_BTNS['right_btn'] = Button({
      width: (field['move_command_btns'].width / 3),         // 横サイズ
      height: field['move_command_btns'].height,        // 縦サイズ
    }).addChildTo(field['move_command_btns']);
    field['move_command_btns']['right_btn'].visible = false;
    //右ボタン選択キューブ
    field['move_command_btns']['right_btn_select'] = RectangleShape({width:field['move_command_btns']['right_btn'].width,
    height:field['move_command_btns']['right_btn'].height,fill:"red"}).addChildTo(field['move_command_btns']);
    field['move_command_btns']['right_btn_select'].x = field['move_command_btns']['right_btn'].x;
    field['move_command_btns']['right_btn_select'].alpha = 0;
    field['move_command_btns']['right_btn_select']['select_active'] = false;
    field['move_command_btns']['right_btn_select']['select_direction'] = -1;
    field['move_command_btns']['right_btn_select']['anim_speed'] = 0.05;
    field['move_command_btns']['right_btn_select'].update = function() {
      if(this['select_active'] == true){
        if(this['select_direction'] == 0){
          this.alpha = this.alpha + this['anim_speed'];
          if(1 < this.alpha){this.alpha = 1; this['select_direction'] = 1;}
        }
        else if(this['select_direction'] == 1){
          this.alpha = this.alpha - this['anim_speed'];
          if(this.alpha < 0){this.alpha = 0; this['select_direction'] = 0;}
        }
        else if(this['select_direction'] == -1){this['select_direction'] = 0;}
      }
      else if(this['select_direction'] != -1){ //再生停止していない場合
        this['select_direction'] = -1;
        this.alpha = 0;
      }
    };
    field['move_command_btns']['right_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        if(this.parent['right_btn_select']['select_active'] == true) return;
        else{ //方向モードでなければ、方向モードを実行
          this.parent['right_btn_select']['select_active'] = true;
          this.parent['left_btn_select']['select_active'] = false;
          //方向ボタンを表示
          var getEntrydata = G_BATTLE_GET_ENTRY_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
          G_BATTLE_SWITCH_DIRECTION_BTNS(field['move_command_btns'],true,getEntrydata['direction']);
          G_BATTLE_RESET_FIELD_STATUS(2); //位置モードのハイライトをリセット
          G_BATTLE_RESET_POS_SELECT_SWITCH(false); //位置選択位置を非表示
        }
      }
    };
    //左ボタンラベル
    field['move_command_btns']['right_btn_label'] = Label({ text: "方向",fontSize: 16,fill: 'black'}).addChildTo(field['move_command_btns']);
    field['move_command_btns']['right_btn_label'].x = field['move_command_btns']['right_btn'].x;

    //完了ボタン
    field['move_command_btns']['done_btn'] = BATTLE_MOVE_COMMAND_BTNS['done_btn'] = Button({
      width: (field['move_command_btns'].width / 3),         // 横サイズ
      height: field['move_command_btns'].height,        // 縦サイズ
    }).addChildTo(field['move_command_btns']);
    field['move_command_btns']['done_btn'].x = field['move_command_btns']['done_btn'].x + (field['move_command_btns']['done_btn'].width);
    field['move_command_btns']['done_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        //コマンドが設定されているかチェック
        console.log(BATTLE_COMMAND_SET_UNIQUE_NO);
        var checkAddCommand = G_BATTLE_CHECK_ADD_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO);
        if(checkAddCommand == true){ field['field_status_3'].visible = true; field['field_status_3'].alpha = 1;} //コマンドが設定されている
        else{ field['field_status_3'].visible = false;}

        var getEntrydata = G_BATTLE_GET_ENTRY_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
        G_BATTLE_RESET_FIELD_STATUS(2); //位置モードのハイライトをリセット
        G_BATTLE_RESET_FIELD_STATUS(1); //選択モードのハイライトをリセット
        G_BATTLE_RESET_POS_SELECT_SWITCH(false); //選択位置の印を非表示に
        G_BATTLE_SWITCH_DIRECTION_BTNS(field['move_command_btns'],false,getEntrydata['direction']);
        field['move_command_btns'].remove();
        //コマンドタイプをチェック
        if(BATTLE_SELECT_COMMAND_TYPE == 2){ //移動&カードの場合はカードモードに切り替え
          //カードモードを開始
          BATTLE_CARD_SELECT_STEP = 1;//デッキ選択ステップに移行
          G_BATTLE_SELECT_CARD_START(uniqueNo);
        }
        else{
          BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //操作状態を解除
          BATTLE_SELECT_COMMAND_TYPE = -1;
        }
      }
    };
    field['move_command_btns']['done_btn'].visible = false;
    //完了ボタンラベル
    field['move_command_btns']['done_btn_label'] = Label({ text: "完了",fontSize: 16,fill: 'black'}).addChildTo(field['move_command_btns']);
    field['move_command_btns']['done_btn_label'].x = field['move_command_btns']['done_btn'].x;

    //方向変更ボタン
    field['move_command_btns']['change_direction_btns'] = new Array();
    var directionTopBtn = field['move_command_btns']['change_direction_btns'][0] = Sprite('ASSET_814').addChildTo(field['move_command_btns']); //上
    directionTopBtn.y = directionTopBtn.y + directionTopBtn.height * 1.2;
    var directionRightBtn = field['move_command_btns']['change_direction_btns'][1] = Sprite('ASSET_814').addChildTo(field['move_command_btns']); //右
    directionRightBtn.y = directionTopBtn.y + directionRightBtn.height;
    directionRightBtn.x = directionRightBtn.x + directionRightBtn.width;
    directionRightBtn.rotation = directionRightBtn.rotation + 90;
    var directionBottomBtn = field['move_command_btns']['change_direction_btns'][2] = Sprite('ASSET_814').addChildTo(field['move_command_btns']); //下
    directionBottomBtn.y = directionRightBtn.y + directionBottomBtn.height;
    directionBottomBtn.rotation = directionBottomBtn.rotation - 180;
    var directionLeftBtn = field['move_command_btns']['change_direction_btns'][3] = Sprite('ASSET_814').addChildTo(field['move_command_btns']); //左
    directionLeftBtn.y = directionRightBtn.y;
    directionLeftBtn.x = directionLeftBtn.x - directionLeftBtn.width;
    directionLeftBtn.rotation = directionLeftBtn.rotation + 270;
    //方向変更ボタン共通処理
    for (var i = 0; i < field['move_command_btns']['change_direction_btns'].length; i++) {
      var sprite = field['move_command_btns']['change_direction_btns'][i];

      //選択中画像を表示
      var selectCube = sprite['select_cube'] = Sprite('ASSET_816').addChildTo(sprite);
      selectCube['flash_visible'] = false; //明滅アニメーションフラグ
      selectCube['anim_direction'] = 0;
      selectCube['anim_speed'] = 0.05;
      selectCube.update = function() {
        if(this['flash_visible'] == true){
          if(this['anim_direction'] == 0){
            this.alpha = this.alpha + this['anim_speed'];
            if(1 < this.alpha) {this.alpha = 1; this['anim_direction'] = 1}
          }
          else{
            this.alpha = this.alpha - this['anim_speed'];
            if(this.alpha < 0) {this.alpha = 0; this['anim_direction'] = 0}
          }
        }
        else if(this.alpha != 0){
          this.alpha = 0;
          this['anim_direction'] = 0;
        }
      };
      //ボタン本体生成
      var button = sprite['button'] = BATTLE_MOVE_COMMAND_BTNS['change_direction_btn_' + i] = Button({
        width: sprite.width,         // 横サイズ
        height: sprite.height,        // 縦サイズ
      }).addChildTo(sprite);
      button['direction'] = i;
      button.onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(this.parent.visible == false) return;
        if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          if(this.parent['select_cube']['flash_visible'] == true){ //選択中の内容を選択した場合
            //登録した方向コマンドを取り消し
            this.parent['select_cube']['flash_visible'] = false;
            G_BATTLE_RESET_PLAYER_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO,2);
          }
          else{
            //既に選択中の内容があればリセット
            var changeDirectionBtns = this.parent.parent;
            for (var j = 0; j < changeDirectionBtns['change_direction_btns'].length; j++) {
              var getSpr = changeDirectionBtns['change_direction_btns'][j];
              getSpr['select_cube']['flash_visible'] = false;
            }
            this.parent['select_cube']['flash_visible'] = true;
            //方向位置を設定
            G_BATTLE_SET_COMMAND_DATA(BATTLE_COMMAND_SET_UNIQUE_NO,null,this['direction']);
          }
        }
      };
      button.visible = false;
    }

    //閉じるボタン(完了とほぼ同じ)
    field['move_command_btns']['close_button'] = Sprite('ASSET_801').addChildTo(field['move_command_btns']);
    field['move_command_btns']['close_button'].x = field['move_command_btns']['close_button'].x +
    ((field['move_command_btns'].width / 2) + field['move_command_btns']['close_button'].width);
    field['move_command_btns']['close_button'].y = field['move_command_btns']['close_button'].y - field['move_command_btns'].height;
    field['move_command_btns']['close_button']['button'] = Button({
      width: field['move_command_btns']['close_button'].width,         // 横サイズ
      height:field['move_command_btns']['close_button'].height,        // 縦サイズ
    }).addChildTo(field['move_command_btns']['close_button']);
    field['move_command_btns']['close_button']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        var getEntrydata = G_BATTLE_GET_ENTRY_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
        G_BATTLE_RESET_FIELD_STATUS(2); //位置モードのハイライトをリセット
        G_BATTLE_RESET_FIELD_STATUS(1); //選択モードのハイライトをリセット
        G_BATTLE_RESET_FIELD_STATUS(3); //コマンド編集済みの表示をリセット
        G_BATTLE_RESET_POS_SELECT_SWITCH(false); //選択位置の印を非表示に
        G_BATTLE_SWITCH_DIRECTION_BTNS(field['move_command_btns'],false,getEntrydata['direction']);
        BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //操作状態を解除
        BATTLE_SELECT_COMMAND_TYPE = -1;
        field['move_command_btns'].remove();
        G_BATTLE_RESET_PLAYER_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO,1);//コマンドをリセット
        G_BATTLE_RESET_PLAYER_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO,2);//コマンドをリセット
      }
    };
    field['move_command_btns']['close_button']['button'].visible = false;

    //ホールドボタン
    var holdBtn = field['move_command_btns']['hold_button'] = Sprite('ASSET_802').addChildTo(field['move_command_btns']);
    holdBtn.y = holdBtn.y - (field['move_command_btns'].height * 3);
    holdBtn.alpha = 0.5;
    //ホールドボタン本体
    holdBtn['button'] = BATTLE_MOVE_COMMAND_BTNS['hold_btn'] = Button({
      width: holdBtn.width,         // 横サイズ
      height: holdBtn.height,        // 縦サイズ
    }).addChildTo(holdBtn);
    holdBtn['button']['start_pos_x'] = 0;
    holdBtn['button']['start_pos_y'] = 0;
    holdBtn['button'].onpointstart = function(e){
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        this['start_pos_x'] = e.pointer.x;
        this['start_pos_y'] = e.pointer.y;
      }
    };
    holdBtn['button'].onpointmove = function(e){
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        var moveX = 0; //X移動量
        var moveY = 0; //Y移動量
        if(e.pointer.x != this['start_pos_x']){
          if(this['start_pos_x'] < e.pointer.x) moveX = e.pointer.x - this['start_pos_x'];
          else moveX = (this['start_pos_x'] - e.pointer.x) * -1;
        }
        if(e.pointer.y != this['start_pos_y']){
          if(this['start_pos_y'] < e.pointer.y) moveY = e.pointer.y - this['start_pos_y'];
          else moveY = (this['start_pos_y'] - e.pointer.y) * -1;
        }
        //移動制限区域
        //上
        if(e.pointer.y < this.height) moveY = 0;
        //下
        if(400 < e.pointer.y) moveY = 0;
        //右
        if(e.pointer.x < (this.parent.parent.width / 2)) moveX = 0;
        //左
        if((SCREEN_WIDTH - (this.parent.parent.width / 2)) < e.pointer.x) moveX = 0;

        //移動量によってUIを移動
        this.parent.parent.x = this.parent.parent.x + moveX;
        this.parent.parent.y = this.parent.parent.y + moveY;

        this['start_pos_x'] = e.pointer.x;
        this['start_pos_y'] = e.pointer.y;
      }
    };
    holdBtn['button'].visible = false;

    //方向選択ボタンを非表示に
    G_BATTLE_SWITCH_DIRECTION_BTNS(field['move_command_btns'],false,entryData['direction']);
    //移動モードを開始
    G_BATTLE_POS_SELECT_MODE_START(uniqueNo,BATTLE_MOVE_AREAS);
  }
}

function G_BATTLE_SWITCH_DIRECTION_BTNS(moveCommandBtns,visible,direction){ //方向選択ボタンの表示切り替え
  if(visible == false){
    for (var i = 0; i < moveCommandBtns['change_direction_btns'].length; i++) {
      var directionBtn = moveCommandBtns['change_direction_btns'][i];
      directionBtn['select_cube']['flash_visible'] = false;
      directionBtn.visible = false;
    }
  }
  if(visible == true){
    var commandDirection = G_BATTLE_GET_COMMAND_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
    for (var i = 0; i < moveCommandBtns['change_direction_btns'].length; i++) {
      var directionBtn = moveCommandBtns['change_direction_btns'][i];
      directionBtn.visible = true;
      if(commandDirection['change_direction'] != -1){
        if(commandDirection['change_direction'] == i) {directionBtn['select_cube']['flash_visible'] = true;}
      }
      else if(i == direction) {directionBtn['select_cube']['flash_visible'] = true;}
    }
  }
}

function G_BATTLE_MOVE_AREA_DISP(uniqueNo,moveAreas){ //移動可能範囲をハイライト
  G_BATTLE_RESET_FIELD_STATUS(2);
  var positions = null;
  for (var i = 0; i < moveAreas.length; i++) {
    if(moveAreas[i]['unique_no'] == uniqueNo) {positions = moveAreas[i]['positions']; break;}
  }
  if(positions != null){
    for (var i = 0; i < positions.length; i++) {
      var field = G_BATTLE_GET_FIELD(positions[i]['x'],positions[i]['y']);
      if(field != null){
        field['field_status'] = 2;
      }
    }
  }
}

//位置選択モードを開始
function G_BATTLE_POS_SELECT_MODE_START(uniqueNo,moveAreas){
  //移動選択範囲をハイライト
  G_BATTLE_MOVE_AREA_DISP(uniqueNo,moveAreas);
  var getEntrydata = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  G_BATTLE_RESET_POS_SELECT_SWITCH(true,uniqueNo); //編集中が残っていれば、位置選択位置を表示
}

//位置選択の印を表示非表示の切り替え
function G_BATTLE_RESET_POS_SELECT_SWITCH(visible,uniqueNo){
  var commandData = G_BATTLE_GET_COMMAND_DATA(uniqueNo);
  for (var i = 0; i < BATTLE_FIELDS.length; i++) {
    if(visible == true){
      if(commandData['move_pos']['x'] == BATTLE_FIELDS[i]['field_x']
      && commandData['move_pos']['y'] == BATTLE_FIELDS[i]['field_y']){
        BATTLE_FIELDS[i]['select_red_ring'].visible = visible;
      }
    }
    else{BATTLE_FIELDS[i]['select_red_ring'].visible = visible;}
  }
}

//プレイヤーの設定するコマンドデータを初期化
function G_BATTLE_PLAYER_SET_COMMAND_INIT(permissionDatas){
  BATTLE_PLAYER_SET_COMMAND_DATAS = new Array();
  for (var i = 0; i < permissionDatas.length; i++) {
    var teamCheck = G_BATTLE_TEAM_CHECK(permissionDatas[i]['unique_no']);
    if(permissionDatas[i]['add_action'] == true && teamCheck == true){ //コマンド追加権限がある。自分のチーム
      var addData = new Array();
      addData['unique_no'] = permissionDatas[i]['unique_no'];
      addData['move_pos'] = new Array();
      addData['move_pos']['x'] = -1;
      addData['move_pos']['y'] = -1;
      addData['change_direction'] = -1;
      addData['use_card_id'] = -1;
      addData['auto_action'] = -1;
      addData['is_stay'] = -1;
      BATTLE_PLAYER_SET_COMMAND_DATAS[BATTLE_PLAYER_SET_COMMAND_DATAS.length] = addData;
    }
  }
}

//ユニークNoのエントリーデータが同じチームかチェック
function G_BATTLE_TEAM_CHECK(uniqueNo){
  var result = false;
  if(BATTLE_PLAYER_ENTRY_DATA == null) return false;
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  if(entryData != null){
    if(BATTLE_PLAYER_ENTRY_DATA['party_instance']['team_no'] == entryData['party_instance']['team_no']) result = true;
  }
  return result;
}

//コマンドデータを設定する。
function G_BATTLE_SET_COMMAND_DATA(uniqueNo,movePos = null,changeDirection = -1,useCardId = -1,autoAction = -1, isStay = -1){
  for (var i = 0; i < BATTLE_PLAYER_SET_COMMAND_DATAS.length; i++) {
    if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['unique_no'] == uniqueNo){
      if(movePos != null && isset(movePos['x']) && isset(movePos['y'])){BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos'] = movePos;}
      if(changeDirection != -1) BATTLE_PLAYER_SET_COMMAND_DATAS[i]['change_direction'] = changeDirection;
      if(useCardId != -1) BATTLE_PLAYER_SET_COMMAND_DATAS[i]['use_card_id'] = useCardId;
      if(autoAction != -1) BATTLE_PLAYER_SET_COMMAND_DATAS[i]['auto_action'] = autoAction;
      if(isStay != -1) BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] = isStay;
      break;
    }
    //行動が1つでも指定されていれば、待機コマンドをリセット
    if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['x'] != -1
    || BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['y'] != -1
    || BATTLE_PLAYER_SET_COMMAND_DATAS[i]['change_direction'] != -1
    || BATTLE_PLAYER_SET_COMMAND_DATAS[i]['use_card_id'] != -1
    || BATTLE_PLAYER_SET_COMMAND_DATAS[i]['auto_action'] != -1) BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] = -1;
  }
  console.log("設定後のデータ");
  console.log(BATTLE_PLAYER_SET_COMMAND_DATAS);
}

//ユニークNoから指定したコマンドを初期化 commandType = 1:移動位置 2:方向 3:カードID 4:オートアクション 5:待機
function G_BATTLE_RESET_PLAYER_COMMAND(uniqueNo,commandType){
  for (var i = 0; i < BATTLE_PLAYER_SET_COMMAND_DATAS.length; i++) {
    if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['unique_no'] == uniqueNo){
      switch (commandType) {
        case 1: //移動位置を初期化
        {
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos'] = new Array();
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['x'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['y'] = -1;
        }
        break;
        case 2: //方向
        {
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['change_direction'] = -1;
        }
        break;
        case 3: //カードID
        {
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['use_card_id'] = -1;
        }
        break;
        case 4: //オートアクション
        {
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['auto_action'] = -1;
        }
        break;
        case 5: //待機
        {
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] = -1;
        }
        break;
        default:
        break;
      }
      break;
    }
  }
  console.log("設定後のデータ");
  console.log(BATTLE_PLAYER_SET_COMMAND_DATAS);
}

//待機コマンドを設定する。
function G_BATTLE_SET_WAIT_COMMAND(uniqueNo){
  var field = null;
  //フィールドを検索。
  for (var i = 0; i <  BATTLE_FIELDS.length; i++) {
    if(isset(BATTLE_FIELDS[i]['button'])
    && isset(BATTLE_FIELDS[i]['button']['unique_no'])
    && BATTLE_FIELDS[i]['button']['unique_no'] != -1
    && BATTLE_FIELDS[i]['button']['unique_no'] == uniqueNo){field = BATTLE_FIELDS[i]; break;}
  }
  if(field != null){
    field['field_status_3'].visible = true;
    field['field_status_3'].alpha = 1;
    for (var i = 0; i < BATTLE_PLAYER_SET_COMMAND_DATAS.length; i++) {
      if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['unique_no'] == uniqueNo){
        //既に待機が設定されて入れば、待機取消
        if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] != -1){
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] = -1;
        }
        else{
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['x'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['y'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['change_direction'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['use_card_id'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['auto_action'] = -1;
          BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'] = 1;
        }
      }
    }
    if(isset(field['command_menu']) && field['command_menu'] != null) {field['command_menu'].remove(); field['command_menu'] = null;}
    G_BATTLE_RESET_FIELD_STATUS();
    BATTLE_COMMAND_MENU_CONTROLE_FLAG = false;
    BATTLE_SELECT_COMMAND_TYPE = -1;
  }
}

//ユニークNoからコマンドデータを取得
function G_BATTLE_GET_COMMAND_DATA(uniqueNo){
  var result = null;
  for (var i = 0; i < BATTLE_PLAYER_SET_COMMAND_DATAS.length; i++) {
    if(BATTLE_PLAYER_SET_COMMAND_DATAS[i]['unique_no'] == uniqueNo){result = BATTLE_PLAYER_SET_COMMAND_DATAS[i];}
  }
  return result;
}

function G_BATTLE_CHECK_ADD_COMMAND(uniqueNo){ //コマンドが設定されているかチェック
  var result = false;
  var commandData = G_BATTLE_GET_COMMAND_DATA(uniqueNo);
  if(commandData != null){
  if(commandData['move_pos']['x'] != -1 ||
    commandData['move_pos']['y'] != -1 ||
    commandData['change_direction'] != -1 ||
    commandData['use_card_id'] != -1 ||
    commandData['auto_action'] != -1 ||
    commandData['is_stay'] != -1) result = true;
  }
  return result;
}

//idからカードマスターデータを取得
function G_BATTLE_GET_CARD_MASTER_DATA(id){
  var result = null;
  for (var i = 0; i < BATTLE_MASTER_DATAS['card_master_datas'].length; i++) {
    var cardMasterData = BATTLE_MASTER_DATAS['card_master_datas'][i];
    if(cardMasterData['id'] == id){result = cardMasterData; break;}
  }
  return result;
}

//カード選択モードを開始
function G_BATTLE_SELECT_CARD_START(uniqueNo){
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo); //エントリーデータを取得。
  var field = null;
  //フィールドを検索。
  for (var i = 0; i <  BATTLE_FIELDS.length; i++) {
    if(isset(BATTLE_FIELDS[i]['button'])
    && isset(BATTLE_FIELDS[i]['button']['unique_no'])
    && BATTLE_FIELDS[i]['button']['unique_no'] != -1
    && BATTLE_FIELDS[i]['button']['unique_no'] == uniqueNo){field = BATTLE_FIELDS[i]; break;}
  }
  //カードテーブル背景を表示
  if(field != null){
    if(isset(field['command_menu']) && field['command_menu'] != null) {field['command_menu'].remove(); field['command_menu'] = null;}
    var wnd = BATTLE_CARD_TABLE_WINDOW = Sprite('ASSET_819').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
    wnd.y = wnd.y + ((wnd.height / 4) + wnd.height);
    wnd['buttons'] = new Array(); //ウィンドウ上部に表示するボタン配列
    wnd['button_push_index'] = -1;
    wnd.update = function() {
      if(this['button_push_index'] != -1){
        //カードテーブルボタン処理
        var btnIndex = this['button_push_index'];
        console.log("カードテーブルボタンindex:" + btnIndex);
        switch (btnIndex) {
          case 0: //範囲表示ボタン
          {
            if(BATTLE_CARD_SELECT_STEP == 2){ //カード選択中
              G_BATTLE_EFFECT_AREA_DISP_SWITCH(wnd);
            }
          }
          break;
          case 1: //キャンセルボタン
          {
            switch (BATTLE_CARD_SELECT_STEP) {
              case 1: //デッキ選択中
              {
                //コマンドウィンドウを元に戻す
                G_BATTLE_COMMAND_WINDOW_DISP(0);
                //メインメニューの位置を戻す
                G_BATTLE_SWITCH_MAIN_MENU_POS("bottom");
                G_BATTLE_RESET_FIELD_STATUS();
                BATTLE_SELECT_COMMAND_TYPE = -1;
                BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //操作状態を解除
              }
              break;
              case 2: //カード選択中
              {
                if(BATTLE_SET_UI_PREV_BTN != null) return null; //範囲表示中は無効
                BATTLE_CARD_SELECT_STEP = 1; //デッキ選択に戻る
                //カードテーブル削除
                G_BATTLE_DELETE_CARD_TABLE(wnd);
                G_BATTLE_RESET_FIELD_STATUS();
                G_BATTLE_COMMAND_WINDOW_DISP(1); //デッキ用メインメニューに切り替え
                G_BATTLE_CAPTION_SWITCH("set_deck"); //キャプションを切り替え
                //デッキ選択テーブルを表示
                G_BATTLE_CREATE_DECK_TABLE(wnd,uniqueNo);
              }
              break;
              default:
              break;
            }
          }
          break;
          case 2: //設定取り消し or 決定ボタン
          {
            switch (BATTLE_CARD_SELECT_STEP) {
              case 1: //デッキ選択中
              {
                //設定取り消し処理を実行
                G_NORMAL_WINDOW_CREATE(BATTLE_UI_WINDOW_LAYER,"コマンドの取り消し","設定したカードコマンドを取り消します",1,"deleteCardCommandWnd");
              }
              break;
              case 2: //カード選択中
              {
                //選択中のカードがある場合
                if(BATTLE_PLAYER_SELECT_CARD_DATA != null){
                  //コマンドを設定
                  G_BATTLE_SET_COMMAND_DATA(BATTLE_COMMAND_SET_UNIQUE_NO,null,-1,BATTLE_PLAYER_SELECT_CARD_DATA['master_data']['id']);
                  //選択アニメーションを開始
                  G_BATTLE_SELECT_CARD_ANIM_START(BATTLE_PLAYER_SELECT_CARD_DATA['sprite_base'],BATTLE_PLAYER_SELECT_CARD_DATA['master_data']);
                  //メインメニューの位置を戻す
                  G_BATTLE_SWITCH_MAIN_MENU_POS("bottom");
                  //コマンドウィンドウを元に戻す
                  G_BATTLE_COMMAND_WINDOW_DISP(0);
                  //ハイライト中のフィールドが存在すれば、リセット
                  G_BATTLE_RESET_FIELD_STATUS(4);
                  BATTLE_SELECT_COMMAND_TYPE = -1;
                  BATTLE_COMMAND_MENU_CONTROLE_FLAG = false; //操作状態を解除
                }
              }
              break;
              default:
              break;
            }
          }
          break;
          default:
          break;
        }
        this['button_push_index'] = -1;
      }
    };
    var buttonXpos = 0;
    for (var i = 0; i < 3; i++) {
      var button = wnd['buttons'][i] = Sprite('ASSET_818').addChildTo(wnd);
      button.y = button.y - ((wnd.height / 2) + (button.height / 2));
      if(buttonXpos == 0) buttonXpos = button.x - ((wnd.width / 2) -  (button.width / 2));
      else buttonXpos = buttonXpos + button.width + 6;
      button.x = buttonXpos;
      //ボタン本体を表示
      button['btn'] = Button({
        width: button.width,         // 横サイズ
        height: button.height,        // 縦サイズ
      }).addChildTo(button);
      button['btn']['index'] = i;
      button['btn'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(this.parent.visible == false) return;
        if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          this.parent.parent['button_push_index'] = this['index'];
        }
      };
      button['btn'].visible = false;
      //ボタンラベル
      var btnText = "";
      button['label'] = Label({ text: btnText, fontSize: 26,fill: 'black'}).addChildTo(button);
    }
    G_BATTLE_COMMAND_WINDOW_DISP(1); //デッキ用メインメニューに切り替え
    G_BATTLE_CAPTION_SWITCH("set_deck"); //キャプションを切り替え
    //デッキ選択テーブルを表示
    G_BATTLE_CREATE_DECK_TABLE(wnd,uniqueNo);
    //メインメニューの位置を変更
    G_BATTLE_SWITCH_MAIN_MENU_POS("top");
  }
}


//カード決定アニメーションを開始
function G_BATTLE_SELECT_CARD_ANIM_START(spriteBase,cardMasterData,playLog){
  var setScale = 0.25;
  var selectCardSpr = G_CARD_DISP(cardMasterData);
  selectCardSpr.addChildTo(BATTLE_TILES_SUB_LAYER);
  selectCardSpr.width = selectCardSpr.width * setScale;
  selectCardSpr.height = selectCardSpr.height * setScale;
  G_CARD_SET_SIZE(selectCardSpr,setScale);
  var movePosX = 0;
  var movePosY = 0;
  for (var i = 0; i <  BATTLE_FIELDS.length; i++) {
    if(isset(BATTLE_FIELDS[i]['button'])
    && isset(BATTLE_FIELDS[i]['button']['unique_no'])
    && BATTLE_FIELDS[i]['button']['unique_no'] != -1
    && BATTLE_FIELDS[i]['button']['unique_no'] == BATTLE_COMMAND_SET_UNIQUE_NO){
      movePosX = BATTLE_FIELDS[i].x;
      movePosY = BATTLE_FIELDS[i].y;
      //コマンドがあれば決定済みを反映
      console.log(BATTLE_COMMAND_SET_UNIQUE_NO);
      var checkAddCommand = G_BATTLE_CHECK_ADD_COMMAND(BATTLE_COMMAND_SET_UNIQUE_NO);
      if(checkAddCommand == true){ BATTLE_FIELDS[i]['field_status_3'].visible = true; BATTLE_FIELDS[i]['field_status_3'].alpha = 1;} //コマンドが設定されている
      else{BATTLE_FIELDS[i]['field_status_3'].visible = false;}
      break;
    }
  }
  selectCardSpr.tweener.wait(1000).to({
    x:movePosX,
    y:movePosY,
    rotation: 360,
    scaleX: 0.1, scaleY: 0.1,
    alpha: 0,
  },500,"swing").play();
}

//デッキ選択テーブルを生成
function G_BATTLE_CREATE_DECK_TABLE(parentBase,uniqueNo,sort = null){
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  if(entryData != null){
    //デッキ一覧を表示
    if(sort == null) sort = new Array();
    sort[0] = "prize_cards";
    sort[1] = "main_deck";
    sort[2] = "party_deck";
    sort[3] = "pvp_deck";
    sort[4] = "pvp_party_deck";
    //デッキデータを取得
    deckDatas = null;
    for (var i = 0; i < BATTLE_DECK_DATAS.length; i++) {
      if(BATTLE_DECK_DATAS[i]['unique_no'] == entryData['unique_no']) {deckDatas = BATTLE_DECK_DATAS[i]; break;}
    }
    if(deckDatas != null) G_BATTLE_SET_DECK_TABLE(parentBase,deckDatas,sort,0);
  }
}

//メインメニューの位置を切り替える displayMode = 0:メインメニューボタン()
function G_BATTLE_SWITCH_MAIN_MENU_POS(pos = "bottom",displayMode = 0){
  if(pos == "bottom"){ //下に表示
    //BATTLE_MAIN_MENU_BG.y = 0;
    //BATTLE_MAIN_MENU_BG.y = BATTLE_MAIN_MENU_BG.y + BATTLE_MAIN_MENU_BG.height;
    //BATTLE_MAIN_MENU_MASK_BG.y = BATTLE_MAIN_MENU_BG.y;
    var speed = 500;
    var movePosY = BATTLE_MAIN_MENU_BG.height * 2;
    BATTLE_MAIN_MENU_ANIM = true;
    BATTLE_MAIN_MENU_BG.tweener.by({
      y:movePosY,
    },speed,"swing").play();
    BATTLE_MAIN_MENU_MASK_BG.tweener.by({
      y:movePosY,
    },speed,"swing").play();
    //BATTLE_MAIN_MENU_BG.y = BATTLE_MAIN_MENU_BG.y - BATTLE_MAIN_MENU_BG.height;
    //BATTLE_MAIN_MENU_MASK_BG.y = BATTLE_MAIN_MENU_BG.y;
    if(BATTLE_CARD_TABLE_WINDOW != null){ //テーブルウィンドウがあれば、上に引き上げる
      BATTLE_CARD_TABLE_WINDOW.tweener.by({
        y:movePosY,
      },speed,"swing").call(function(){
        //カードテーブル等を削除
        G_BATTLE_DELETE_DECK_TABLE(BATTLE_CARD_TABLE_WINDOW);
        G_BATTLE_DELETE_CARD_TABLE(BATTLE_CARD_TABLE_WINDOW);
        BATTLE_MAIN_MENU_ANIM = false;
      }).play();
    }
  }
  else if(pos == "top"){ //上に表示
    //BATTLE_MAIN_MENU_BG.y = 0;
    var speed = 500;
    var movePosY = -1 * (BATTLE_MAIN_MENU_BG.height * 2);
    BATTLE_MAIN_MENU_BG.tweener.by({
      y:movePosY,
    },speed,"swing").play();
    BATTLE_MAIN_MENU_MASK_BG.tweener.by({
      y:movePosY,
    },speed,"swing").play();
    //BATTLE_MAIN_MENU_BG.y = BATTLE_MAIN_MENU_BG.y - BATTLE_MAIN_MENU_BG.height;
    //BATTLE_MAIN_MENU_MASK_BG.y = BATTLE_MAIN_MENU_BG.y;
    if(BATTLE_CARD_TABLE_WINDOW != null){ //テーブルウィンドウがあれば、上に引き上げる
      BATTLE_CARD_TABLE_WINDOW.tweener.by({
        y:movePosY,
      },speed,"swing").play();
    }
  }
}

//テーブルにカードを並べる
function G_BATTLE_SET_CARD_TABLE(parentBase,cardIds,page){
  //選択状態をリセット
  BATTLE_PLAYER_SELECT_CARD_DATA = null;
  //表示ボタンの設定
  if(parentBase != null && isset(parentBase['buttons'])){
    //ボタン状態をリセット
    for (var i = 0; i < parentBase['buttons'].length; i++) {
      var btn =　parentBase['buttons'][i];
      btn.visible = false;
    }
    //範囲表示ボタン表示
    parentBase['buttons'][0].visible = true;
    parentBase['buttons'][0]['label'].text = "範囲表示";
    //キャンセルボタン表示
    parentBase['buttons'][1].visible = true;
    parentBase['buttons'][1]['label'].text = "キャンセル";
    //決定ボタン表示
    parentBase['buttons'][2].visible = true;
    parentBase['buttons'][2]['label'].text = "決定";
  }
  var setMax = 6; //最大設置数
  var setIndex = 0; //現在のセット数
  var setPosY = 0;
  var setPosX = 0;
  var checkIndex = 0; //ページ表示開始場所特定用
  var setScale = 0.25;
  //最大ページ数を取得
  console.log(cardIds);
  cardIdsArray = cardIds.split(',');
  var cardNum = cardIdsArray.length;
  var maxPage = 0;
  while (true) {
    cardNum = cardNum - setMax;
    if(0 < cardNum) maxPage = maxPage + 1;
    if(cardNum < setMax) break;
  }
  //デッキカードが残っていれば削除
  if(isset(parentBase['decks'])){
    for (var i = 0; i < parentBase['decks'].length; i++) {
      if(parentBase['decks'][i] != null){
        parentBase['decks'][i].remove();
        parentBase['decks'][i] = null;
      }
    }
  }
  //既にカード一覧が表示されていた場合、初期化
  if(isset(parentBase['cards'])){
    for (var i = 0; i < parentBase['cards'].length; i++) {
      if(parentBase['cards'][i] != null){
        parentBase['cards'][i].remove();
        parentBase['cards'][i] = null;
      }
    }
  }
  //移動カードがあれば削除
  if(isset(parentBase['move_cards'])){
    for (var i = 0; i < parentBase['move_cards'].length; i++) {
      if(parentBase['move_cards'][i] != null){
        parentBase['move_cards'][i].remove();
        parentBase['move_cards'][i] = null;
      }
    }
  }
  //既にUIが表示されていたら削除
  if(isset(parentBase['page_prev_btn'])){
    if(parentBase['page_prev_btn'] != null){
      parentBase['page_prev_btn'].remove();
      parentBase['page_prev_btn'] = null;
    }
  }
  if(isset(parentBase['page_next_btn'])){
    if(parentBase['page_next_btn'] != null){
      parentBase['page_next_btn'].remove();
      parentBase['page_next_btn'] = null;
    }
  }
  if(isset(parentBase['page_disp_label'])){
    if(parentBase['page_disp_label'] != null){
      parentBase['page_disp_label'].remove();
      parentBase['page_disp_label'] = null;
    }
  }
  parentBase['cards'] = new Array();
  for (var j = 0; j < cardIdsArray.length; j++) {
    checkIndex = checkIndex + 1;
    if((checkIndex - 1) < (page * setMax)) continue;
    var spriteBase = null;
    var cardMasterData = null;
    for (var cm = 0; cm < BATTLE_MASTER_DATAS['card_master_datas'].length; cm++) {
      if(cardIdsArray[j] == BATTLE_MASTER_DATAS['card_master_datas'][cm]['id']) {
        cardMasterData = BATTLE_MASTER_DATAS['card_master_datas'][cm];
        break;
      }
    }
    if(cardMasterData != null){
      spriteBase = G_CARD_DISP(cardMasterData);
      spriteBase.width = spriteBase.width * setScale;
      spriteBase.height = spriteBase.height * setScale;
      G_CARD_SET_SIZE(spriteBase,setScale);
      spriteBaseIndex = parentBase['cards'].length;
      parentBase['cards'][spriteBaseIndex] = spriteBase;
      spriteBase['base_index'] = spriteBaseIndex;
      spriteBase.addChildTo(parentBase);
    }
    if(spriteBase != null){ //設置可能
      //ボタンを生成
      var button = Button({
        width: spriteBase.width,         // 横サイズ
        height: spriteBase.height,        // 縦サイズ
      }).addChildTo(spriteBase);
      button['card_master_data'] = cardMasterData;
      button['stay_count'] = 0;
      button['stay_reset'] = false;
      button.onpointstay = function(e){
        if(CARD_INFO_WINDOW != null) return;
        if(30 < this['stay_count']){
          if(this['stay_reset'] == false){
            this['stay_reset'] = true;
            //カード詳細を表示
            G_CARD_INFO_WINDOW_DISP(this.parent.parent,this['card_master_data']);
            if(CARD_INFO_WINDOW != null) CARD_INFO_WINDOW.y = CARD_INFO_WINDOW.y - (SCREEN_HEIGHT / 6);
          }
        }
        else{this['stay_count'] = this['stay_count'] + 1;}
      };
      button.onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        this['stay_reset'] = false;
        this['stay_count'] = 0;
        if(BATTLE_DECK_ANIM == true) return;
        if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          //効果範囲をハイライト
          G_BATTLE_CARD_EFFECT_AREA_DISP(BATTLE_COMMAND_SET_UNIQUE_NO,this['card_master_data']['id']);
          var isSelected = false;
          //既に選択中の場合
          if(this.parent['select_anim'] != null) isSelected = true;
          //選択アニメーションを生成
          //他の選択アニメーションが再生中の場合は削除
          for (var cd = 0; cd < this.parent.parent['cards'].length; cd++) {
            var getSpriteBase = this.parent.parent['cards'][cd];
            if(getSpriteBase['select_anim'] != null) {getSpriteBase['select_anim'].remove(); getSpriteBase['select_anim'] = null;}
          }
          if(isSelected == false){
            this.parent['select_anim'] = G_ASSET_GET_SPRITE_ANIM("select_card_1",40,true,false,this.parent.width,this.parent.height);
            this.parent['select_anim'].addChildTo(this.parent);
            BATTLE_PLAYER_SELECT_CARD_DATA = new Array();
            BATTLE_PLAYER_SELECT_CARD_DATA['master_data'] = this['card_master_data'];
            BATTLE_PLAYER_SELECT_CARD_DATA['sprite_base'] = this.parent;
          }
          else{ //選択中だった場合は、選択状態を削除
            BATTLE_PLAYER_SELECT_CARD_DATA = null;
          }

        }
      };
      button.visible = false;
      if(setIndex == 0){ //初回設置
        spriteBase.y = spriteBase.y - (spriteBase.height * 0.75);
        spriteBase.x = spriteBase.x - (spriteBase.width * 1.4);
        setPosX = spriteBase.x;
        setPosY = spriteBase.y;
      }
      else{
        if((setMax / 2)  == setIndex){ //下段に移動した時
          setPosY = setPosY + (spriteBase.height * 1.3);
          setPosX = spriteBase.x - (spriteBase.width * 1.4);
        }
        else{
          setPosX = setPosX + (spriteBase.width * 1.3);
        }
        spriteBase.y = setPosY;
        spriteBase.x = setPosX;
      }
      console.log("index:" + setIndex + "posx:" + spriteBase.x + "posy:" + spriteBase.y);
      setIndex = setIndex + 1;
      if((setMax - 1) < setIndex) break;
    }
  }
  //ページ切り替えボタンの生成
  parentBase['page_prev_btn'] = Sprite('ASSET_462').addChildTo(parentBase);
  parentBase['page_prev_btn'].x = parentBase['page_prev_btn'].x - ((SCREEN_WIDTH / 2) - (parentBase['page_prev_btn'].width / 2));
  parentBase['page_prev_btn']['button'] =  Button({
    width: parentBase['page_prev_btn'].width,         // 横サイズ
    height: parentBase['page_prev_btn'].height,        // 縦サイズ
  }).addChildTo(parentBase['page_prev_btn']);
  parentBase['page_prev_btn']['button']['page_now'] = page;
  parentBase['page_prev_btn']['button']['max_page'] = maxPage;
  parentBase['page_prev_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      if(this['page_now'] == 0){ //最小ページの場合は、最大ページに切り替える
        G_BATTLE_SET_CARD_TABLE(this.parent.parent,cardIds,this['max_page']);
      }
      else{
        G_BATTLE_SET_CARD_TABLE(this.parent.parent,cardIds,parseInt(this['page_now']) - 1);
      }
    }
  };
  parentBase['page_prev_btn']['button'].visible = false;

  parentBase['page_next_btn'] = Sprite('ASSET_462').addChildTo(parentBase);
  parentBase['page_next_btn'].x = parentBase['page_next_btn'].x + ((SCREEN_WIDTH / 2) - (parentBase['page_next_btn'].width / 2));
  parentBase['page_next_btn'].scaleX *= -1;
  parentBase['page_next_btn']['button'] =  Button({
    width: parentBase['page_next_btn'].width,         // 横サイズ
    height: parentBase['page_next_btn'].height,        // 縦サイズ
  }).addChildTo(parentBase['page_next_btn']);
  parentBase['page_next_btn']['button']['page_now'] = page;
  parentBase['page_next_btn']['button']['max_page'] = maxPage;
  parentBase['page_next_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      if(this['page_now'] == maxPage){ //最大ページの場合は、最小ページに切り替える
        G_BATTLE_SET_CARD_TABLE(this.parent.parent,cardIds,0);
      }
      else{
        G_BATTLE_SET_CARD_TABLE(this.parent.parent,cardIds,parseInt(this['page_now']) + 1);
      }
    }
  };
  parentBase['page_next_btn']['button'].visible = false;

  parentBase['page_disp_label'] = Label({ text: (page + 1) + "/" + (maxPage + 1),fontSize: 32,fill: 'white'}).addChildTo(parentBase);
  parentBase['page_disp_label'].y = parentBase['page_disp_label'].y + ((parentBase.height / 2) - (parentBase['page_disp_label'].height / 2));
}

//テーブルにデッキを並べる sort = デッキ種類をキー名の配列で指定 例 Array(0 => 'main_deck', 1 => 'party_deck')
function G_BATTLE_SET_DECK_TABLE(parentBase,deckDatas,sort,page){
  //表示ボタンの設定
  if(parentBase != null && isset(parentBase['buttons'])){
    //ボタン状態をリセット
    for (var i = 0; i < parentBase['buttons'].length; i++) {
      var btn =　parentBase['buttons'][i];
      btn.visible = false;
    }
    //キャンセルボタン表示
    parentBase['buttons'][1].visible = true;
    parentBase['buttons'][1]['label'].text = "キャンセル";
    //設定取り消しボタン処理
    btnText = "設定取り消し";
    var commandCheck = false;
    //カードIDガ既に設定してあれば、設定取り消しボタンを表示
    var commandData = G_BATTLE_GET_COMMAND_DATA(BATTLE_COMMAND_SET_UNIQUE_NO);
    if(commandData['use_card_id'] != -1) {
      //設定があればボタン表示
      parentBase['buttons'][2].visible = true;
      parentBase['buttons'][2]['label'].text = "設定取り消し";
    }
  }
  var setMax = 6; //最大設置数
  var setIndex = 0; //現在のセット数
  var setPosY = 0;
  var setPosX = 0;
  var deckCardDispMaxCount = 5; //デッキカードを重ねる最大枚数
  var checkIndex = 0; //ページ表示開始場所特定用
  //最大ページ数を取得
  var deckNum = 0;
  for (var i = 0; i < sort.length; i++) {
    var categoryName = sort[i];
    if(isset(deckDatas['deck_datas'][categoryName])){
      deckNum = deckNum + deckDatas['deck_datas'][categoryName].length;
    }
  }
  var maxPage = 0;
  while (true) {
    deckNum = deckNum - setMax;
    if(0 < deckNum) maxPage = maxPage + 1;
    if(deckNum < setMax) break;
  }
  //既にデッキ一覧が表示されていた場合、初期化
  if(isset(parentBase['decks'])){
    for (var i = 0; i < parentBase['decks'].length; i++) {
      if(parentBase['decks'][i] != null){
        parentBase['decks'][i].remove();
        parentBase['decks'][i] = null;
      }
    }
  }
  //既に移動カードがあれば削除
  if(isset(parentBase['move_cards'])){
    for (var i = 0; i < parentBase['move_cards'].length; i++) {
      if(parentBase['move_cards'][i] != null){
        parentBase['move_cards'][i].remove();
        parentBase['move_cards'][i] = null;
      }
    }
  }
  //既にUIが表示されていたら削除
  if(isset(parentBase['page_prev_btn'])){
    if(parentBase['page_prev_btn'] != null){
      parentBase['page_prev_btn'].remove();
      parentBase['page_prev_btn'] = null;
    }
  }
  if(isset(parentBase['page_next_btn'])){
    if(parentBase['page_next_btn'] != null){
      parentBase['page_next_btn'].remove();
      parentBase['page_next_btn'] = null;
    }
  }
  if(isset(parentBase['page_disp_label'])){
    if(parentBase['page_disp_label'] != null){
      parentBase['page_disp_label'].remove();
      parentBase['page_disp_label'] = null;
    }
  }
  parentBase['decks'] = new Array();
  parentBase['move_cards'] = new Array();
  for (var i = 0; i < sort.length; i++) {
    var categoryName = sort[i];
    if(isset(deckDatas['deck_datas'][categoryName])){
      for (var j = 0; j < deckDatas['deck_datas'][categoryName].length; j++) {
        checkIndex = checkIndex + 1;
        if((checkIndex - 1) < (page * setMax)) continue;
        var deckData = deckDatas['deck_datas'][categoryName][j];
        var cardIds = deckData['card_deck'].split(',');
        var cardSprCount = 0;
        var spriteBase = null;
        for (var ci = 0; ci < cardIds.length; ci++) {
          var cardMasterData = null;
          for (var cm = 0; cm < BATTLE_MASTER_DATAS['card_master_datas'].length; cm++) {
            if(cardIds[ci] == BATTLE_MASTER_DATAS['card_master_datas'][cm]['id']) {
              cardMasterData = BATTLE_MASTER_DATAS['card_master_datas'][cm];
              break;
            }
          }
          if(cardMasterData != null){
            var cardSpr = G_CARD_DISP(cardMasterData);
            cardSpr['card_master_data'] = cardMasterData;
            var setScale = 0.25;
            cardSpr.width = cardSpr.width * setScale;
            cardSpr.height = cardSpr.height * setScale;
            G_CARD_SET_SIZE(cardSpr,setScale); //サイズを調整
            if(spriteBase == null) {
              var spriteBaseIndex = parentBase['decks'].length;
              parentBase['decks'][spriteBaseIndex] = spriteBase = cardSpr;
              spriteBase['base_index'] = spriteBaseIndex;
              spriteBase['child_cards'] = new Array();
            }
            else {
              spriteBase['child_cards'][spriteBase['child_cards'].length] = cardSpr;
              cardSpr.addChildTo(spriteBase);
              cardSpr.x = cardSpr.x + (cardSpr.width * 0.05) * cardSprCount;
              cardSpr.y = cardSpr.y + (cardSpr.height * 0.05) * cardSprCount;
            }
            cardSprCount = cardSprCount + 1;
            if(deckCardDispMaxCount < cardSprCount) break;
          }
        }
        if(spriteBase != null){ //設置可能
          //デッキ名枠を表示
          var deckNameFrame = spriteBase['deck_name_frame'] = Sprite('ASSET_820').addChildTo(spriteBase);
          deckNameFrame.setScale(0.75,0.75);
          deckNameFrame.y = deckNameFrame.y - ((spriteBase.height / 2) - (deckNameFrame.height / 2));
          deckNameFrame['label'] = Label({ text:deckData['deck_name'],fontSize: 26,fill: 'black'}).addChildTo(deckNameFrame);
          spriteBase.addChildTo(parentBase);
          //ボタンを生成
          var button = spriteBase['button'] = Button({
            width: spriteBase.width,         // 横サイズ
            height: spriteBase.height,        // 縦サイズ
          }).addChildTo(spriteBase);
          button['card_ids'] = deckData['card_deck'];
          button.onpointend = function(e){
            if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
            if(BATTLE_DECK_ANIM == true) return;
            if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
              //デッキアニメ再生中にする
              BATTLE_DECK_ANIM = true;
              //選択以外のデッキを消す
              for (var pd = 0; pd < this.parent.parent['decks'].length; pd++) {
                if(this.parent.parent['decks'][pd]['base_index'] != this.parent['base_index']){
                  this.parent.parent['decks'][pd].remove();
                }
              }
              var waitTime = 100;
              //子カードの移動
              var movePosX = 204;
              var movePosY = 132;
              var moveCount = 0;
              var setScale = 0.25;
              var setCount = setMax - (this.parent['child_cards'].length + 1);
              if(0 < this.parent['child_cards'].length){
                BATTLE_CARD_SET_ANIM = true;
                for (var cc = (this.parent['child_cards'].length - 1); 0 <= cc; cc--) {
                  switch (setCount) {
                    case 5:{movePosX = -224;movePosY = -180;}
                    break;
                    case 4:{movePosX = -16;movePosY = -180;}
                    break;
                    case 3:{movePosX = 192;movePosY = -180;}
                    break;
                    case 2:{movePosX = -224;movePosY = 132;}
                    break;
                    case 1:{movePosX = -16;movePosY = 132;}
                    break;
                    case 0:{movePosX = 192;movePosY = 132;}
                    break;
                    default:
                    break;
                  }
                  var moveCard = this.parent.parent['move_cards'][this.parent.parent['move_cards'].length] = G_CARD_DISP(this.parent['child_cards'][cc]['card_master_data']);
                  moveCard['move_pos_x'] = movePosX;
                  moveCard['move_pos_y'] = movePosY;
                  moveCard.width = moveCard.width * setScale;
                  moveCard.height = moveCard.height * setScale;
                  G_CARD_SET_SIZE(moveCard,setScale);
                  moveCard.addChildTo(this.parent.parent);
                  moveCard.x = this.parent.x;
                  moveCard.y = this.parent.y;
                  moveCard.x = moveCard.x + (moveCard.width * 0.05) * cc;
                  moveCard.y = moveCard.y + (moveCard.height * 0.05) * cc;
                  moveCard.visible = false;
                  moveCard['delete_card'] = this.parent['child_cards'][cc];
                  moveCard.tweener.wait(waitTime).call(function(){
                    this.target.visible = true;
                    this.target['delete_card'].remove();
                    this.target['delete_card'] = null;
                  }).to({x:moveCard['move_pos_x'],y:moveCard['move_pos_y']},300,"swing").wait(300).play();
                  waitTime = waitTime + 200;
                  setCount = setCount + 1;
                }
              }
              //親カードの移動
              switch (setCount) {
                case 5:{movePosX = -224;movePosY = -180;}
                break;
                case 4:{movePosX = -16;movePosY = -180;}
                break;
                case 3:{movePosX = 192;movePosY = -180;}
                break;
                case 2:{movePosX = -224;movePosY = 132;}
                break;
                case 1:{movePosX = -16;movePosY = 132;}
                break;
                case 0:{movePosX = 192;movePosY = 132;}
                break;
                default:
                break;
              }
              this.parent.tweener.wait(waitTime).call(function(){
                this.target['deck_name_frame'].remove();
              }).to({x:movePosX,y:movePosY},400,"swing").call(function(){
                BATTLE_DECK_ANIM = false;
                G_BATTLE_SET_CARD_TABLE(this.target['button'].parent.parent,this.target['button']['card_ids'],0);
                G_BATTLE_COMMAND_WINDOW_DISP(2); //カード用メインメニューに切り替え
                G_BATTLE_CAPTION_SWITCH("set_card"); //キャプションを切り替え
                BATTLE_CARD_SELECT_STEP = 2; //カード選択モードに切り替え
                BATTLE_CARD_SET_ANIM = false;
              }).play();
            }
          };
          button.visible = false;
          if(setIndex == 0){ //初回設置
            spriteBase.y = spriteBase.y - (spriteBase.height * 0.75);
            spriteBase.x = spriteBase.x - (spriteBase.width * 1.4);
            setPosX = spriteBase.x;
            setPosY = spriteBase.y;
          }
          else{
            if((setMax / 2)  == setIndex){ //下段に移動した時
              setPosY = setPosY + (spriteBase.height * 1.3);
              setPosX = spriteBase.x - (spriteBase.width * 1.4);
            }
            else{
              setPosX = setPosX + (spriteBase.width * 1.3);
            }
            spriteBase.y = setPosY;
            spriteBase.x = setPosX;
          }
          console.log("index:" + setIndex + "posx:" + spriteBase.x + "posy:" + spriteBase.y);
          setIndex = setIndex + 1;
          if((setMax - 1) < setIndex) break;
        }
      }
    }
  }
  //ページ切り替えボタンの生成
  parentBase['page_prev_btn'] = Sprite('ASSET_462').addChildTo(parentBase);
  parentBase['page_prev_btn'].x = parentBase['page_prev_btn'].x - ((SCREEN_WIDTH / 2) - (parentBase['page_prev_btn'].width / 2));
  parentBase['page_prev_btn']['button'] =  Button({
    width: parentBase['page_prev_btn'].width,         // 横サイズ
    height: parentBase['page_prev_btn'].height,        // 縦サイズ
  }).addChildTo(parentBase['page_prev_btn']);
  parentBase['page_prev_btn']['button']['page_now'] = page;
  parentBase['page_prev_btn']['button']['max_page'] = maxPage;
  parentBase['page_prev_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      if(this['page_now'] == 0){ //最小ページの場合は、最大ページに切り替える
        G_BATTLE_SET_DECK_TABLE(this.parent.parent,deckDatas,sort,this['max_page']);
      }
      else{
        G_BATTLE_SET_DECK_TABLE(this.parent.parent,deckDatas,sort,parseInt(this['page_now']) - 1);
      }
    }
  };
  parentBase['page_prev_btn']['button'].visible = false;

  parentBase['page_next_btn'] = Sprite('ASSET_462').addChildTo(parentBase);
  parentBase['page_next_btn'].x = parentBase['page_next_btn'].x + ((SCREEN_WIDTH / 2) - (parentBase['page_next_btn'].width / 2));
  parentBase['page_next_btn'].scaleX *= -1;
  parentBase['page_next_btn']['button'] =  Button({
    width: parentBase['page_next_btn'].width,         // 横サイズ
    height: parentBase['page_next_btn'].height,        // 縦サイズ
  }).addChildTo(parentBase['page_next_btn']);
  parentBase['page_next_btn']['button']['page_now'] = page;
  parentBase['page_next_btn']['button']['max_page'] = maxPage;
  parentBase['page_next_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
      if(this['page_now'] == maxPage){ //最大ページの場合は、最小ページに切り替える
        G_BATTLE_SET_DECK_TABLE(this.parent.parent,deckDatas,sort,0);
      }
      else{
        G_BATTLE_SET_DECK_TABLE(this.parent.parent,deckDatas,sort,parseInt(this['page_now']) + 1);
      }
    }
  };
  parentBase['page_next_btn']['button'].visible = false;

  parentBase['page_disp_label'] = Label({ text: (page + 1) + "/" + (maxPage + 1),fontSize: 32,fill: 'white'}).addChildTo(parentBase);
  parentBase['page_disp_label'].y = parentBase['page_disp_label'].y + ((parentBase.height / 2) - (parentBase['page_disp_label'].height / 2));
}

function G_BATTLE_DELETE_DECK_TABLE(wnd){ //デッキテーブルを削除
  //既にデッキ一覧が表示されていた場合、初期化
  if(isset(wnd['decks'])){
    for (var i = 0; i < wnd['decks'].length; i++) {
      if(wnd['decks'][i] != null){
        wnd['decks'][i].remove();
        wnd['decks'][i] = null;
      }
    }
  }
  //既にUIが表示されていたら削除
  if(isset(wnd['page_prev_btn'])){
    if(wnd['page_prev_btn'] != null){
      wnd['page_prev_btn'].remove();
      wnd['page_prev_btn'] = null;
    }
  }
  if(isset(wnd['page_next_btn'])){
    if(wnd['page_next_btn'] != null){
      wnd['page_next_btn'].remove();
      wnd['page_next_btn'] = null;
    }
  }
  if(isset(wnd['page_disp_label'])){
    if(wnd['page_disp_label'] != null){
      wnd['page_disp_label'].remove();
      wnd['page_disp_label'] = null;
    }
  }
  if(wnd != null) {wnd.remove(); wnd = null;}
}

function G_BATTLE_DELETE_CARD_TABLE(wnd){ //カードテーブルを削除
  //既にデッキ一覧が表示されていた場合、初期化
  if(isset(wnd['cards'])){
    for (var i = 0; i < wnd['cards'].length; i++) {
      if(wnd['cards'][i] != null){
        wnd['cards'][i].remove();
        wnd['cards'][i] = null;
      }
    }
  }
  //既にUIが表示されていたら削除
  if(isset(wnd['page_prev_btn'])){
    if(wnd['page_prev_btn'] != null){
      wnd['page_prev_btn'].remove();
      wnd['page_prev_btn'] = null;
    }
  }
  if(isset(wnd['page_next_btn'])){
    if(wnd['page_next_btn'] != null){
      wnd['page_next_btn'].remove();
      wnd['page_next_btn'] = null;
    }
  }
  if(isset(wnd['page_disp_label'])){
    if(wnd['page_disp_label'] != null){
      wnd['page_disp_label'].remove();
      wnd['page_disp_label'] = null;
    }
  }
}

//デッキデータにプライズカードデータを追加
function G_BATTLE_SET_PRIZE_CARD_DECK_DATA(deckDatas,prizeCards){
  var addData = new Object();
  addData['card_deck'] = prizeCards;
  addData['deck_name'] = "プライズドロー";
  deckDatas['prize_cards'] = new Array();
  deckDatas['prize_cards'][0] = addData;
}

//デッキデータの設定を適応
function G_BATTLE_SET_CARD_DECK_DATA(){
  for (var i = 0; i < BATTLE_DECK_DATAS.length; i++) {
    var uniqueNo = BATTLE_DECK_DATAS[i]['unique_no'];
    var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
    if(entryData != null){
      //プライズカードデータをデッキに追加
      G_BATTLE_SET_PRIZE_CARD_DECK_DATA(BATTLE_DECK_DATAS[i]['deck_datas'],entryData['prize_cards']);
    }
  }
}

//効果範囲表示切り替え
function G_BATTLE_EFFECT_AREA_DISP_SWITCH(wnd){
  //UI元に戻すボタンを設置
  if(BATTLE_SET_UI_PREV_BTN == null){ //半透明にする
    //背景を半透明に
    var setAlpha = 0.25;
    wnd.alpha = setAlpha;
    BATTLE_MAIN_MENU_BG.visible = false;
    BATTLE_MAIN_MENU_MASK_BG.visible = false;

    BATTLE_SET_UI_PREV_BTN = Sprite('ASSET_120').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
    BATTLE_SET_UI_PREV_BTN.y = BATTLE_SET_UI_PREV_BTN.y - (SCREEN_HEIGHT / 3);
    BATTLE_SET_UI_PREV_BTN['btn'] = Button({
      width: BATTLE_SET_UI_PREV_BTN.width,         // 横サイズ
      height: BATTLE_SET_UI_PREV_BTN.height,        // 縦サイズ
    }).addChildTo(BATTLE_SET_UI_PREV_BTN);
    BATTLE_SET_UI_PREV_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        G_BATTLE_EFFECT_AREA_DISP_SWITCH(wnd);
      }
    };
    BATTLE_SET_UI_PREV_BTN['btn'].visible = false;
    BATTLE_SET_UI_PREV_BTN['label'] = Label({ text: "元に戻す",
    fontSize: 32,fill: 'black'}).addChildTo(BATTLE_SET_UI_PREV_BTN);
  }
  else { //元に戻す
    wnd.alpha = 1;
    BATTLE_MAIN_MENU_BG.visible = true;
    BATTLE_MAIN_MENU_MASK_BG.visible = true;
    BATTLE_SET_UI_PREV_BTN.remove();
    BATTLE_SET_UI_PREV_BTN = null;
  }
}

//フィールドステータスの強制非表示
function G_BATTLE_FORCE_DELETE_FIELD_STATUS(){
  for (var i = 0; i < BATTLE_FIELDS.length; i++) {
    for (var fs = 1; fs < BATTLE_FIELD_STATUS_MAX; fs++) {
      var fieldStatusName = 'field_status_' + fs;
      BATTLE_FIELDS[i][fieldStatusName]['select_active'] = false;
      BATTLE_FIELDS[i][fieldStatusName].alpha = 0;
    }
    BATTLE_FIELDS[i]['field_status_3'].visible = false;
  }
}

//選択したカードの効果範囲をフィールドに表示
function G_BATTLE_CARD_EFFECT_AREA_DISP(uniqueNo,cardId){
  //既にハイライト中のフィールドが存在すれば、リセット
  G_BATTLE_RESET_FIELD_STATUS(4);
  //すぐに切り替わるので、強制非表示
  for (var i = 0; i < BATTLE_FIELDS.length; i++) {
    if(BATTLE_FIELDS[i]['field_status_4']['select_active'] == true){
      BATTLE_FIELDS[i]['field_status_4']['select_active'] = false;
      BATTLE_FIELDS[i]['field_status_4'].alpha = 0;
      console.log("削除処理");

    }
  }
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  if(isset(BATTLE_MASTER_DATAS['card_master_datas']) && entryData != null){
    for (var i = 0; i < BATTLE_MASTER_DATAS['card_master_datas'].length; i++) {
      var cardData = BATTLE_MASTER_DATAS['card_master_datas'][i];
      if(cardData['id'] == cardId){
        var positions = G_EFFECT_AREA_GET_AREA(cardData['effect_area_type'],entryData['pos'],entryData['direction']);
        console.log(cardData['effect_area_type']);
        console.log("位置達");
        console.log(positions);
        for (var p = 0; p < positions.length; p++) {
          for (var f = 0; f < BATTLE_FIELDS.length; f++) {
            if(BATTLE_FIELDS[f]['field_x'] == positions[p]['x']
            && BATTLE_FIELDS[f]['field_y'] == positions[p]['y']) {
              BATTLE_FIELDS[f]['field_status'] = 4; //効果範囲ハイライト(黄)
              console.log("ハイライト指定");
              break;
            };
          }
        }
        break;
      }
    }
  }
}

//コマンド決定が行われた
function G_BATTLE_COMMAND_DECISION(){
  if(G_BATTLE_GET_CONNECTION_VISIBLE() == false) return 0; //通信が出来ない場合は、処理を中止
  //行動が設定されていないデータは、自動コマンドを設定する。
  for (var i = 0; i < BATTLE_ENTRY_DATAS.length; i++) {
    console.log(BATTLE_ENTRY_DATAS[i]['unique_no']);
    if(G_BATTLE_CHECK_ADD_COMMAND(BATTLE_ENTRY_DATAS[i]['unique_no']) == false){
      G_BATTLE_SET_COMMAND_DATA(BATTLE_ENTRY_DATAS[i]['unique_no'],null,-1,-1,1);
    }
  }
  //サーバーに送信するアクションを登録
  NETWORK_IS_CONNECTING = true;
  var postParam = new Object();
  postParam['battle_instance_id'] = new Object();
  postParam['battle_instance_id'] = PLAYER_BATTLE_INSTANCE['battle_instance_id'];
  postParam['turn_check'] = BATTLE_TURN;
  var addCommandData = new Object();
  for (var i = 0; i < BATTLE_PLAYER_SET_COMMAND_DATAS.length; i++) {
    var addData = new Object();
    addData['unique_no'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['unique_no'];
    addData['move_pos'] = new Object();
    addData['move_pos']['x'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['x'];
    addData['move_pos']['y'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['move_pos']['y'];
    addData['change_direction'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['change_direction'];
    addData['use_card_id'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['use_card_id'];
    addData['auto_action'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['auto_action'];
    addData['is_stay'] = BATTLE_PLAYER_SET_COMMAND_DATAS[i]['is_stay'];
    addCommandData[i] = addData;
  }
  console.log("送信したデータ");
  console.log(addCommandData);
  postParam['add_actions'] = addCommandData;
  G_BATTLE_SET_BEFOR_POST_PARAM(postParam);
  G_BATTLE_START_CONNECTION_BTN_VISIBLE();
  ajaxStart("post","json","../../client/battle/battle.php",postParam); //非同期通信開始
}

//戦闘ログをセット
function G_BATTLE_SET_BATTLE_LOG(battleLog){
  BATTLE_PLAY_LOG = new Array(); //プレイログを初期化
  console.log("元データ全てのバトルログ");
  console.log(battleLog);
  if(BATTLE_TURN != 0){
    for (var i = 0; i < battleLog.length; i++) {
      //現在のターンのログをプレイログに挿入
      if(isset(battleLog[i]['turn']) && battleLog[i]['turn'] == BATTLE_TURN){
        BATTLE_PLAY_LOG[BATTLE_PLAY_LOG.length] = battleLog[i];
      }
    }
  }
}

//戦闘アニメーションを開始
function G_BATTLE_START_BATTLE_ANIM(){
  BATTLE_ANIM_FINISH = false;
  BATTLE_ANIM_PLAY = true;
  BATTLE_ANIM_COUNTER = BATTLE_ANIM_WAIT_TIME; //カウンタースタート
  console.log("アニメ個数");
  console.log(BATTLE_PLAY_ANIM_LIST.length);
  //バフアニメを再生
  for (var i = 0; i < BATTLE_PLAY_BUFF_ANIM_LIST.length; i++) {
    BATTLE_PLAY_BUFF_ANIM_LIST[i].tweener.play();
  }
  for (var i = 0; i < BATTLE_PLAY_ANIM_LIST.length; i++) {
    // //バフ発動アニメがあれば、再生
    if(BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'].length != 0){
      console.log("バフ発動アニメ再生");
      for (var bal = 0; bal < BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'].length; bal++) {
        console.log(BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'][bal]);
        BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'][bal].tweener.play();
      }
    }
    //移動アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['move_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['move_anim'].tweener.play();
    }
    //カード使用アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['card_use_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['card_use_anim'].tweener.play();
    }
    //アクション実行アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['action_exe_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['action_exe_anim'].tweener.play();
    }
    //ヘッダーアニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['header_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['header_anim'].tweener.play();
    }
    //行動アニメがあれば、再生
    if(BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'].length != 0){
      console.log("戦闘エフェクト再生");
      for (var aal = 0; aal < BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'].length; aal++) {
        console.log(BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'][aal]);
        BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'][aal].tweener.play();
      }
    }
  }
  //ゲーム結果アニメがあれば再生してゲーム結果処理を実行
  if(BATTLE_GAME_RESULT_ANIM != null){
    BATTLE_GAME_RESULT_ANIM.tweener.play();
    console.log("ゲーム結果アニメ再生");
  }
}

//戦闘アニメーションを設定
function G_BATTLE_SET_BATTLE_ANIM(){
  BATTLE_PLAY_BUFF_ANIM_LIST = new Array();
  BATTLE_PLAY_ANIM_LIST = new Array(); //挿入後、アニメを順番に再生するプレイリスト
  BATTLE_ANIM_WAIT_TIME = 500;
  console.log("行動順リスト");
  console.log(BATTLE_ACTION_LIST_UNIQUE_NOS);
  //バフアニメを登録
  var buffWaitTime = 0;
  for (var i = 0; i < BATTLE_PLAY_LOG.length; i++) {
    if(!isset(BATTLE_PLAY_LOG[i]['log_type'])) continue;
    if(BATTLE_PLAY_LOG[i]['log_type'] != 4) continue; //バフ発動以外除外
    var resultAnim = G_BATTLE_ACTION_ANIM_START(BATTLE_PLAY_LOG[i],BATTLE_ANIM_WAIT_TIME);
    if(resultAnim != null && isset(resultAnim['wait_time'])) { //ウェイトタイムが以前のものより長ければ、更新
      BATTLE_PLAY_BUFF_ANIM_LIST[BATTLE_PLAY_BUFF_ANIM_LIST.length] = resultAnim;
      if(buffWaitTime < resultAnim['wait_time']){
        buffWaitTime = resultAnim['wait_time'];
      }
    }
  }
  //ウェイトタイムを更新
  BATTLE_ANIM_WAIT_TIME = BATTLE_ANIM_WAIT_TIME + buffWaitTime;

  for (var balu = 0; balu < BATTLE_ACTION_LIST_UNIQUE_NOS.length; balu++) {
    var rowUniqueNo = BATTLE_ACTION_LIST_UNIQUE_NOS[balu];
    var entryData = G_BATTLE_GET_ENTRY_DATA(rowUniqueNo);
    console.log("取った座標");
    console.log("x:" + entryData['pos']['x']);
    console.log("y:" + entryData['pos']['y']);
    BATTLE_PLAY_ANIM_LIST[balu] = new Array();
    BATTLE_PLAY_ANIM_LIST[balu]['unique_no'] = rowUniqueNo;
    BATTLE_PLAY_ANIM_LIST[balu]['move_anim'] = null;
    BATTLE_PLAY_ANIM_LIST[balu]['card_use_anim'] = null;
    BATTLE_PLAY_ANIM_LIST[balu]['action_exe_anim'] = null;
    BATTLE_PLAY_ANIM_LIST[balu]['header_anim'] = null;
    BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'] = new Array();
    BATTLE_PLAY_ANIM_LIST[balu]['buff_anim_list'] = new Array();
    BATTLE_PLAY_ANIM_LIST[balu]['set_direction'] = -1; //更新する方向
    BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] = 0; //行動に要するウェイトタイム
    //移動アニメーション
    //移動が行われているかチェック
    for (var i = 0; i < BATTLE_FIELDS.length; i++) {
      if(isset(BATTLE_FIELDS[i]['button'])
      && isset(BATTLE_FIELDS[i]['button']['unique_no'])
      && BATTLE_FIELDS[i]['button']['unique_no'] != -1
      && rowUniqueNo == BATTLE_FIELDS[i]['button']['unique_no']){
        if(BATTLE_FIELDS[i]['field_x'] != entryData['pos']['x'] || BATTLE_FIELDS[i]['field_y'] != entryData['pos']['y']){ //移動が行われている
          console.log("移動したキャラ");
          console.log(BATTLE_FIELDS[i]['button']['unique_no']);
          //移動アニメーションを登録
          //移動先のフィールド取得
          var moveField = G_BATTLE_GET_FIELD(entryData['pos']['x'],entryData['pos']['y']);
          //移動用キャラクターイメージを作成
          if(isset(BATTLE_FIELDS[i]['move_character_image']) && BATTLE_FIELDS[i]['move_character_image'] != null){
            BATTLE_FIELDS[i]['move_character_image'].remove();
            BATTLE_FIELDS[i]['move_character_image'] = null;
          }
          //エントリータイプによって表示する画像を切り替え
          var charaSpr = null;
          if(entryData['entry_type']['type'] == 0){ var tmpSpr = G_BATTLE_CREATE_PLAYER_AVATAR(null,entryData,0.25); charaSpr = tmpSpr[1];} //プレイヤータイプ
          if(entryData['entry_type']['type'] == 1) charaSpr = G_BATTLE_CREATE_ENEMY_IMAGE(null,entryData,0.25); //エネミータイプ
          if(charaSpr != null){
            BATTLE_FIELDS[i]['move_image'] = charaSpr;
            //表示と表示位置の調整
            var movePosX = 0;
            var movePosY = 0;
            charaSpr.addChildTo(BATTLE_CHARACTER_LAYER);
            charaSpr.x = BATTLE_FIELDS[i].x;
            charaSpr.y = BATTLE_FIELDS[i].y;
            if(entryData['entry_type']['type'] == 0){
              charaSpr.y = charaSpr.y - (BATTLE_FIELDS[i].height * 1.5);
              //charaSpr.x = charaSpr.x + BATTLE_FIELDS[i]['use_avatar_image'].x;
              //charaSpr.y = charaSpr.y + BATTLE_FIELDS[i]['use_avatar_image'].y;
              movePosX = moveField.x;
              movePosY = moveField.y;
              movePosY = moveField.y - (BATTLE_FIELDS[i].height * 1.5);
              //movePosX = movePosX + BATTLE_FIELDS[i]['use_avatar_image'].x;
              //movePosY = movePosY + BATTLE_FIELDS[i]['use_avatar_image'].y;
            }
            if(entryData['entry_type']['type'] == 1){
              charaSpr.y = charaSpr.y - (BATTLE_FIELDS[i].height * 1.5);
              //charaSpr.x = charaSpr.x + BATTLE_FIELDS[i]['enemy_image'].x;
              //charaSpr.y = charaSpr.y + BATTLE_FIELDS[i]['enemy_image'].y;
              movePosX = moveField.x;
              movePosY = moveField.y;
              movePosY = moveField.y - (BATTLE_FIELDS[i].height * 1.5);
              //movePosY = moveField.y - (BATTLE_FIELDS[i].height / 2);
              //movePosX = movePosX + BATTLE_FIELDS[i]['enemy_image'].x;
              //movePosY = movePosY + BATTLE_FIELDS[i]['enemy_image'].y;
            }
            BATTLE_FIELDS[i]['move_image'].visible = false;
            BATTLE_FIELDS[i]['move_image']['entry_data'] = entryData;
            BATTLE_FIELDS[i]['move_image']['entry_type'] = entryData['entry_type'];
            BATTLE_FIELDS[i]['move_image']['start_field'] = BATTLE_FIELDS[i];
            BATTLE_FIELDS[i]['move_image']['move_field'] = moveField;
            BATTLE_FIELDS[i]['move_image']['move_pos'] = new Array();
            BATTLE_FIELDS[i]['move_image']['move_pos']['x'] = movePosX;
            BATTLE_FIELDS[i]['move_image']['move_pos']['y'] = movePosY;
            //アニメーション作成
            var k = G_HELPER_GET_DISTANCE(charaSpr.x,charaSpr.y,movePosX,movePosY);
            var time = parseInt(k / G_BATTLE_CHANGE_ANIM_SPEED(0.3,0,1));
            BATTLE_FIELDS[i]['move_image'].tweener.wait(BATTLE_ANIM_WAIT_TIME).call(function(){
              if(this.target['entry_type']['type'] == 0){
                this.target['start_field']['use_avatar_image'].visible = false;
                this.target['start_field']['equip_avatar_image'].visible = false;
                var getSpr = G_BATTLE_CREATE_PLAYER_AVATAR(BATTLE_CHARACTER_LAYER,this.target['entry_data'],0.25,this.target['move_field'].x,this.target['move_field'].y,this.target['move_field']);
                getSpr['use'].visible = false;
              }
              if(this.target['entry_type']['type'] == 1){
                this.target['start_field']['enemy_image'].visible = false;
                var getSpr = G_BATTLE_CREATE_ENEMY_IMAGE(BATTLE_CHARACTER_LAYER,this.target['entry_data'],0.25,this.target['move_field'].x,this.target['move_field'].y,this.target['move_field']);
                getSpr.visible = false;
              }
              this.target.visible = true;
            }).to({
              x:movePosX,
              y:movePosY,
            },time,"swing").call(function(){
              this.target.visible = false;
              if(this.target['entry_type']['type'] == 0){
                this.target['move_field']['use_avatar_image'].visible = true;
              }
              if(this.target['entry_type']['type'] == 1){
                this.target['move_field']['enemy_image'].visible = true;
              }
            });
            //waitTimeを更新
            BATTLE_ANIM_WAIT_TIME = time + BATTLE_ANIM_WAIT_TIME;
            //移動アニメに設定
            BATTLE_PLAY_ANIM_LIST[balu]['move_anim'] = BATTLE_FIELDS[i]['move_image'];
            //playList[balu]['anim_list'][playList[balu]['anim_list'].length] = BATTLE_FIELDS[i]['move_image'];
          }
        }
        break;
      }
    }
    //カード使用アニメーションとアクション実行アニメーション
    for (var i = 0; i < BATTLE_PLAY_LOG.length; i++) {
      var playLog = BATTLE_PLAY_LOG[i];
      if(!isset(playLog['log_type'])) continue;
      if(!isset(playLog['unique_no'])) continue;
      if(!isset(playLog['card_id'])) continue;
      if(playLog['unique_no'] == BATTLE_ACTION_LIST_UNIQUE_NOS[balu]){
        var resultWaitTime = 0;
        //カード使用アニメを生成
        var resultCardUseAnim = G_BATTLE_CREATE_CARD_USE_ANIM(playLog['unique_no'],playLog['card_id'],BATTLE_ANIM_WAIT_TIME,playLog);
        if(isset(resultCardUseAnim['wait_time'])) resultWaitTime = parseInt(resultCardUseAnim['wait_time']);
        //アクション実行アニメーションも同時に実行
        var resultActionExeAnim = G_BATTLE_ACTION_EXE_ANIM(BATTLE_ANIM_WAIT_TIME,playLog);
        if(isset(resultActionExeAnim['wait_time']) && resultWaitTime < parseInt(resultActionExeAnim['wait_time'])) resultWaitTime = parseInt(resultActionExeAnim['wait_time']);
        //ヘッダーアニメーションも同時に実行
        var resultHeaderAnim = G_BATTLE_CREATE_HEADER_ANIM(BATTLE_ANIM_WAIT_TIME,playLog);
        if(isset(resultHeaderAnim['wait_time']) && resultWaitTime < parseInt(resultHeaderAnim['wait_time'])) resultWaitTime = parseInt(resultHeaderAnim['wait_time']);
        if(resultActionExeAnim != null){
          BATTLE_PLAY_ANIM_LIST[balu]['action_exe_anim'] = resultActionExeAnim;
        }
        if(resultHeaderAnim != null){
          BATTLE_PLAY_ANIM_LIST[balu]['header_anim'] = resultHeaderAnim;
        }
        if(resultCardUseAnim != null) {
          console.log("カード使用アニメ待ち時間");
          console.log(resultCardUseAnim['wait_time']);
          BATTLE_PLAY_ANIM_LIST[balu]['card_use_anim'] = resultCardUseAnim;
        }
        else{
          console.log("アニメない");
        }
        BATTLE_ANIM_WAIT_TIME = BATTLE_ANIM_WAIT_TIME + resultWaitTime;
        break;
      }
    }
    //行動アニメーション(バトルログに登録されたアニメ)
    console.log("全てのプレイログ");
    console.log(BATTLE_PLAY_LOG);
    for (var i = 0; i < BATTLE_PLAY_LOG.length; i++) {
      var playLog = BATTLE_PLAY_LOG[i];
      console.log("プレイログ");
      console.log(playLog);
      if(!isset(playLog['log_type'])) continue;
      if(!isset(playLog['unique_no'])) continue;
      if(playLog['unique_no'] == BATTLE_ACTION_LIST_UNIQUE_NOS[balu]){ //現在の行動順のユニークNoか
        console.log(BATTLE_ACTION_LIST_UNIQUE_NOS[balu]);
        console.log("アクションアニメ実行したユニークNo");
        switch (parseInt(playLog['log_type'])) {
          case 1: //攻撃アクションログ
          {
            var resultAnim = G_BATTLE_ACTION_ANIM_START(playLog,BATTLE_ANIM_WAIT_TIME);
            if(resultAnim != null && isset(resultAnim['wait_time'])) { //ウェイトタイムが以前のものより長ければ、更新
              BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'][BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'].length] = resultAnim;
              if(BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] < resultAnim['wait_time']){
                BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] = resultAnim['wait_time'];
              }
            }
          }
          break;
          case 2: //回復アクションログ
          {
            console.log("回復アクション開始");
            var resultAnim = G_BATTLE_ACTION_ANIM_START(playLog,BATTLE_ANIM_WAIT_TIME);
            if(resultAnim != null && isset(resultAnim['wait_time'])) { //ウェイトタイムが以前のものより長ければ、更新
              BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'][BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'].length] = resultAnim;
              if(BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] < resultAnim['wait_time']){
                BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] = resultAnim['wait_time'];
              }
            }
          }
          break;
          case 3: //バフ追加ログ
          {
            var resultAnim = G_BATTLE_ACTION_ANIM_START(playLog,BATTLE_ANIM_WAIT_TIME);
            if(resultAnim != null && isset(resultAnim['wait_time'])) { //ウェイトタイムが以前のものより長ければ、更新
              BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'][BATTLE_PLAY_ANIM_LIST[balu]['action_anim_list'].length] = resultAnim;
              if(BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] < resultAnim['wait_time']){
                BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time'] = resultAnim['wait_time'];
              }
            }
          }
          break;
          //--------------------------バフアニメは移動前に行なっている----------------------------------------
          // case 4: //挿入禁止バフ発動ログ
          // {
          //
          // }
          // break;
          default:
          break;
        }
      }
    }
    //ウェイトタイムが決定したため、加算
    BATTLE_ANIM_WAIT_TIME = BATTLE_ANIM_WAIT_TIME + parseInt(BATTLE_PLAY_ANIM_LIST[balu]['action_wait_time']);
  }

  if(BATTLE_GAME_RESULT != null){ //ゲーム結果が出ている場合は、結果演出を登録
    console.log("ゲーム結果出ている");
    var playLog = null;
    for (var i = 0; i < BATTLE_PLAY_LOG.length; i++) {
      if(BATTLE_PLAY_LOG[i]['log_type'] == 6) playLog = BATTLE_PLAY_LOG[i];
    }
    var resultAnim = G_BATTLE_SET_GAME_RESULT_ANIM(BATTLE_GAME_RESULT,BATTLE_ANIM_WAIT_TIME,playLog); //ゲーム結果アニメを設定
    if(resultAnim != null && isset(resultAnim['wait_time'])) { //ウェイトタイムが以前のものより長ければ、更新
      BATTLE_GAME_RESULT_ANIM = resultAnim;
      console.log("ゲーム結果アニメ設定完了");
      BATTLE_ANIM_WAIT_TIME = BATTLE_ANIM_WAIT_TIME + resultAnim['wait_time'];
      //ゲーム結果処理を設定
      G_BATTLE_SET_GAME_RESULT(BATTLE_ANIM_WAIT_TIME,BATTLE_GAME_RESULT,BATTLE_GAME_RESULT_SETTING);
    }
  }
}

//行動アニメーションを開始
function G_BATTLE_ACTION_ANIM_START(playLog,waitTime){
  var animData = null; //挿入されるアニメーションデータ
  var myField = null; //使用者の居るフィールド
  var myEntryData = null; //使用者のエントリーデータ
  if(isset(playLog['unique_no'])){
    myEntryData = G_BATTLE_GET_ENTRY_DATA(playLog['unique_no']);
    if(myEntryData != null){ myField = G_BATTLE_GET_FIELD(playLog['my_pos_x'],playLog['my_pos_y']); }
  }

  var targetField = null; //ターゲットのフィールド
  var targetEntryData = null; //ターゲットのエントリーデータ
  if(isset(playLog['target_unique_no'])){
    targetEntryData = G_BATTLE_GET_ENTRY_DATA(playLog['target_unique_no']);
    if(targetEntryData != null){ targetField = G_BATTLE_GET_FIELD(playLog['target_pos_x'],playLog['target_pos_y']); }
  }

  if(isset(playLog['effect_image_id'])){
    //アニメーションが決定したら、アニメーションを登録
    var list = playLog;
    list['battle_effect_layer'] = BATTLE_EFFECT_LAYER;
    list['my_field'] = myField;
    list['target_field'] = targetField;
    animData = G_BATTLE_EFFECT_CREATE_ANIM(parseInt(playLog['effect_image_id']),list,waitTime,playLog);
  }
  return animData;
}

//カード使用ログを追加する
function G_BATTLE_ADD_CARD_USE_LOG(playLog){
  var cardId = -1;
  var uniqueNo = -1;
  if(isset(playLog['card_id'])) cardId = parseInt(playLog['card_id']);
  if(isset(playLog['unique_no'])) uniqueNo = parseInt(playLog['unique_no']);
  if(cardId == -1 || uniqueNo == -1) return null;
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  //初回追加
  var cardMasterData = G_BATTLE_GET_CARD_MASTER_DATA(cardId);
  var setScale = 0.225;
  var cardSpr = G_CARD_DISP(cardMasterData);
  cardSpr.width = cardSpr.width * setScale;
  cardSpr.height = cardSpr.height * setScale;
  G_CARD_SET_SIZE(cardSpr,setScale);
  if(BATTLE_CARD_USE_LOG.length == 0){
    cardSpr.addChildTo(BATTLE_MAIN_MENU_BG);
    cardSpr.x = cardSpr.x - ((SCREEN_WIDTH / 2) - ((cardSpr.width / 2) + (cardSpr.width * 0.25)));
    cardSpr.y = cardSpr.y - (cardSpr.height * 0.2);
    var maxLeftPos = 0;
    maxLeftPos = cardSpr.x;
    BATTLE_CARD_USE_LOG[0] = cardSpr;
    //スクロール領域を生成
    BATTLE_CARD_USE_LOG[0]['scrolle_area'] = Button({
      width: BATTLE_MAIN_MENU_BG.width,         // 横サイズ
      height: BATTLE_MAIN_MENU_BG.height,        // 縦サイズ
    }).addChildTo(BATTLE_MAIN_MENU_BG);
    BATTLE_CARD_USE_LOG[0]['scrolle_area']['max_left_pos'] = maxLeftPos;
    BATTLE_CARD_USE_LOG[0]['scrolle_area']['max_right_pos'] = 0;
    BATTLE_CARD_USE_LOG[0]['scrolle_area']['start_pos'] = 0;
    BATTLE_CARD_USE_LOG[0]['scrolle_area']['prev_pos'] = 0;
    BATTLE_CARD_USE_LOG[0]['scrolle_area'].onpointstart = function(e){
      this['start_pos'] = BATTLE_CARD_USE_LOG[0].x;
      this['prev_pos'] = e.pointer.x;
    }
    BATTLE_CARD_USE_LOG[0]['scrolle_area'].onpointmove = function(e){
      if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
        var movePos = 0;
        if(this['prev_pos'] < e.pointer.x){
          movePos = e.pointer.x - this['prev_pos'];
        }
        else if(e.pointer.x < this['prev_pos']){
          movePos = -1 * (this['prev_pos'] -  e.pointer.x);
        }
        var afterPos = (this['start_pos'] += movePos);
        if((this['max_left_pos']) < afterPos) return 0;
        if(afterPos < (-1 * this['max_right_pos'])) return 0;
        BATTLE_CARD_USE_LOG[0].x = afterPos;
      }
      this['prev_pos'] = e.pointer.x;
    };
    BATTLE_CARD_USE_LOG[0]['scrolle_area'].visible = false;
  }
  else{
    cardSpr.addChildTo(BATTLE_CARD_USE_LOG[parseInt(BATTLE_CARD_USE_LOG.length) - 1]);
    cardSpr.x = cardSpr.x + cardSpr.width * 1.25;
    var maxRightPos = cardSpr.x;
    maxRightPos = maxRightPos * (BATTLE_CARD_USE_LOG.length - 1);
    BATTLE_CARD_USE_LOG[BATTLE_CARD_USE_LOG.length] = cardSpr;
    BATTLE_CARD_USE_LOG[0]['scrolle_area']['max_right_pos'] = maxRightPos;
  }
  //使用者のイメージと名前を表示
  if(entryData['entry_type']['type'] == 0){ //プレイヤータイプ
    var tmpSpr = G_BATTLE_CREATE_PLAYER_AVATAR(cardSpr,entryData,0.16); charaSpr = tmpSpr['use'];
    if(charaSpr != null){
      charaSpr.y = charaSpr.y + (cardSpr.height * 0.5);
    }
  }
  if(entryData['entry_type']['type'] == 1) { //エネミータイプ
    charaSpr = G_BATTLE_CREATE_ENEMY_IMAGE(cardSpr,entryData,0.16);
    if(charaSpr != null){
      charaSpr.y = charaSpr.y + (cardSpr.height * 0.5);
    }
  }
  //カードログ表示中でない場合は非表示に
  if(BATTLE_COMMAND_WINDOW_TYPE == 3) BATTLE_CARD_USE_LOG[0].visible = true;
  else BATTLE_CARD_USE_LOG[0].visible = false;
}

function G_BATTLE_ANIM_CARD_USE_LOG(){ //カード追加ログのアニメーションを開始
  if(BATTLE_CARD_USE_LOG.length < 3) return null;
  var startPos = BATTLE_CARD_USE_LOG[0].x;
  var moveDistance = G_HELPER_GET_DISTANCE((-1 * BATTLE_CARD_USE_LOG[0]['scrolle_area']['max_right_pos']),0,startPos,0);
  BATTLE_CARD_USE_LOG[0].tweener.by({
    x:(-1 * moveDistance),
  },1000,"swing").play();
}

function G_BATTLE_ADD_BATTLE_LOG(playLog){ //戦闘ログを追加
  var text = "";

  switch (parseInt(playLog['log_type'])) {
    case 1: //攻撃アクションログ
    {
      var myEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['unique_no']));
      var targetEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['target_unique_no']));
      if(myEntryData != null && targetEntryData != null){
        var myName = myEntryData['name'];
        var targetName = targetEntryData['name'];
        text = myName + " の " + playLog['skill_name'] + "! " + targetName + " は " + playLog['hit_point'] + " のダメージを受けた";
      }
    }
    break;
    case 2: //回復アクションログ
    {
      var myEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['unique_no']));
      var targetEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['target_unique_no']));
      if(myEntryData != null && targetEntryData != null){
        var myName = myEntryData['name'];
        var targetName = targetEntryData['name'];
        text = myName + " の " + playLog['skill_name'] + "! " + targetName + " は " + playLog['hit_point'] + " ポイントのHPが回復";
      }
    }
    break;
    case 3: //バフ追加ログ
    {
      var myEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['unique_no']));
      var targetEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['target_unique_no']));
      if(myEntryData != null && targetEntryData != null){
        var myName = myEntryData['name'];
        var targetName = targetEntryData['name'];
        text = myName + " の " + playLog['skill_name'] + "! " + targetName + " に " + playLog['buff_name'] + " の効果";
      }
    }
    break;
    case 4: //バフ定期実行ログ
    {
      var myEntryData = G_BATTLE_GET_ENTRY_DATA(parseInt(playLog['unique_no']));
      if(myEntryData != null){
        var myName = myEntryData['name'];
        var hitPoint = parseInt(playLog['hit_point']);
        var healOrDamage = 0 < hitPoint ? "ポイントのHPが回復" : "のダメージを受けた";
        var afterPoint = hitPoint < 0 ? (-1 * hitPoint) : hitPoint;
        text = myName + " は " + playLog['buff_name'] + " の効果により "  + afterPoint + healOrDamage;
      }
    }
    break;
    default:
    break;
  }
  //ログが正常であれば挿入
  if(text != ""){
    var labelArea = LabelArea({
      text: text,
      height: 100,
      width: 600,
      fontSize: 20,
      fill: 'white',
      align: 'left',
      baseline: 'top',
    });
    labelArea['prev_text'] = text;
    labelArea['log_line'] = Sprite('ASSET_152').addChildTo(labelArea);
    labelArea['log_line'].y = labelArea['log_line'].y - (labelArea.height * 0.9);
    if(BATTLE_LOG.length == 0){
      labelArea.addChildTo(BATTLE_LOG_BG);
      labelArea.x = labelArea.x + 10;
      labelArea.y = labelArea.y - (labelArea.height * 0.2);
      var maxTopPos = 0;
      maxTopPos = labelArea.x;
      BATTLE_LOG[0] = labelArea;
      BATTLE_LOG[0]['scrolle_area'] = Button({
        width: BATTLE_LOG_BG.width,         // 横サイズ
        height: BATTLE_LOG_BG.height,        // 縦サイズ
      }).addChildTo(BATTLE_LOG_BG);
      BATTLE_LOG[0]['scrolle_area']['max_top_pos'] = maxTopPos;
      BATTLE_LOG[0]['scrolle_area']['max_bottom_pos'] = 0;
      BATTLE_LOG[0]['scrolle_area']['start_pos'] = 0;
      BATTLE_LOG[0]['scrolle_area']['prev_pos'] = 0;
      BATTLE_LOG[0]['scrolle_area']['prev_check_index'] = -1;
      BATTLE_LOG[0]['scrolle_area'].onpointstart = function(e){
        this['start_pos'] = BATTLE_LOG[0].y;
        this['prev_pos'] = e.pointer.y;
      }
      BATTLE_LOG[0]['scrolle_area'].onpointmove = function(e){
        if(WINDOW_LIST == null && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null && BATTLE_MAIN_MENU_ANIM == false && BATTLE_CARD_SET_ANIM == false){
          var movePos = 0;
          if(this['prev_pos'] < e.pointer.y){
            movePos = e.pointer.y - this['prev_pos'];
          }
          else if(e.pointer.y < this['prev_pos']){
            movePos = -1 * (this['prev_pos'] -  e.pointer.y);
          }
          var afterPos = (this['start_pos'] += movePos);
          if((this['max_top_pos']) < afterPos) return 0;
          if(afterPos < (-1 * this['max_bottom_pos'])) return 0;
          BATTLE_LOG[0].y = afterPos;
        }
        this['prev_pos'] = e.pointer.y;
      };
      BATTLE_LOG[0]['scrolle_area'].visible = false;
    }
    else{
      labelArea.addChildTo(BATTLE_LOG[parseInt(BATTLE_LOG.length) - 1]);
      labelArea.y = labelArea.y + labelArea.height * 1.2;
      var maxBottomPos = labelArea.y;
      maxBottomPos = maxBottomPos * (BATTLE_LOG.length - 1);
      BATTLE_LOG[BATTLE_LOG.length] = labelArea;
      BATTLE_LOG[0]['scrolle_area']['max_bottom_pos'] = maxBottomPos;
    }
  }
}

function G_BATTLE_ANIM_BATTLE_LOG(){ //戦闘ログのアニメーションを開始
  if(BATTLE_LOG.length < 3) return null;
  var startPos = BATTLE_LOG[0].y;
  var moveDistance = G_HELPER_GET_DISTANCE((-1 * BATTLE_LOG[0]['scrolle_area']['max_bottom_pos']),0,startPos,0);
  BATTLE_LOG[0].tweener.by({
    y:(-1 * moveDistance),
  },1000,"swing").play();
}

function G_BATTLE_HP_GAUGE_ANIM_START(uniqueNo,parentBase,posX,posY,maxHp,prevHp,nowHp,animTime,deadAnimTime){ //HPゲージアニメーションを開始
  console.log("HP");
  console.log(uniqueNo);
  console.log(prevHp);
  console.log(nowHp);
  var keyName = "battle_hp_gauge" + uniqueNo;
  parentBase[keyName] = Gauge({
    width: 64,            // 横サイズ
    height: 4,            // 縦サイズ
    cornerRadius: 10,      // 角丸み
    maxValue: 100,         // ゲージ最大値
    value: parseInt((parseInt(prevHp) / parseInt(maxHp)) * 100),   // ゲージ初期値
    fill: 'white',         // 後ろの色
    gaugeColor: 'red', // ゲージ色
    stroke: 'silver',      // 枠色
    strokeWidth: 2,        // 枠太さ
  }).addChildTo(parentBase);
  if(BATTLE_ANIM_SPEED != 1) parentBase[keyName].animation = false;
  parentBase[keyName]['now_hp'] = parseInt(nowHp);
  parentBase[keyName]['max_hp'] = parseInt(maxHp);
  parentBase[keyName]['unique_no'] = uniqueNo;
  parentBase[keyName].x = posX;
  parentBase[keyName].y = posY;
  parentBase[keyName].y = parentBase[keyName].y - parentBase[keyName].width;
  parentBase[keyName].tweener.wait(parseInt(animTime * 0.33)).call(function(){
    this.target.value = parseInt((this.target['now_hp'] / this.target['max_hp']) * 100);
    this.target.tweener.wait(parseInt(animTime * 0.33)).call(function(){
      if(this.target['now_hp'] <= 0){
        G_BATTLE_DEAD(uniqueNo,deadAnimTime); //死亡処理
        console.log("死亡処理を実行");
      }
      this.target.visible = false;
      delete this.target.parent['battle_hp_gauge'];
    }).play();
  }).play();
}

function G_BATTLE_HIT_POINT_ANIM_START(parentBase,logType,posX,posY,critical,miss,backAttack,hitPoint){ //ヒットポイントアニメーションを開始
  var fontColor = critical == 1 ? "yellow" : "white";
  if(logType == 2) fontColor = "green"; //回復の場合
  var fontSize = critical  == 1 ? 36 : 25;
  var text = miss == 1 ? "MISS!!" : hitPoint;
  if(isset(parentBase['hit_point_text']) && parentBase['hit_point_text'] != null) {parentBase['hit_point_text'] = null}
  parentBase['hit_point_text'] = Label({ text: text,
  fontSize: fontSize, fill: fontColor, stroke: "black", strokeWidth:10}).addChildTo(parentBase);
  parentBase['hit_point_text'].x = posX;
  parentBase['hit_point_text'].y = posY;
  var randX = Math.randint(-10,10);
  var randY = Math.randint(-10,10);
  var randTime = Math.randint(500,1000);
  parentBase['hit_point_text'].tweener.to({
    x: randX, y: randY,
    alpha: 0,
  }, randTime).call(function(){
    this.target = null;
    delete this.target;
  }).play();
  if(miss == 0 && backAttack != 0){
    parentBase['back_attack_text'] = Label({ text: "Back Attack!!",
    fontSize: fontSize, fill: "red", stroke: "black", strokeWidth:10}).addChildTo(parentBase);
    parentBase['back_attack_text'].x = posX;
    parentBase['back_attack_text'].y = posY;
    var randX = Math.randint(-10,10);
    var randY = Math.randint(-10,10);
    var randTime = Math.randint(500,1000);
    parentBase['back_attack_text'].tweener.to({
      x: randX, y: randY,
      alpha: 0,
    }, randTime).call(function(){
      this.target = null;
      delete this.target;
    }).play();
  }
}

function G_BATTLE_CREATE_CARD_USE_ANIM(uniqueNo,cardId,waitTime,playLog){ //カード使用アニメを生成
  //カードマスターデータ取得
  var resultAnim = null;
  var cardMasterData = G_BATTLE_GET_CARD_MASTER_DATA(cardId);
  var setScale = 0.2;
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  if(cardMasterData != null && entryData != null){
    //アニメーション用のスプライトを生成
    BATTLE_EFFECT_LAYER['card_use_anim'] = G_CARD_DISP(cardMasterData);
    BATTLE_EFFECT_LAYER['card_use_anim'].addChildTo(BATTLE_EFFECT_LAYER);
    BATTLE_EFFECT_LAYER['card_use_anim'].width = BATTLE_EFFECT_LAYER['card_use_anim'].width * setScale;
    BATTLE_EFFECT_LAYER['card_use_anim'].height = BATTLE_EFFECT_LAYER['card_use_anim'].height * setScale;
    G_CARD_SET_SIZE(BATTLE_EFFECT_LAYER['card_use_anim'],setScale);
    BATTLE_EFFECT_LAYER['card_use_anim'].y = BATTLE_EFFECT_LAYER['card_use_anim'].y - (SCREEN_HEIGHT / 3);
    //アニメーションを生成
    BATTLE_EFFECT_LAYER['card_use_anim'].alpha = 0;
    var addWaitTime = 0;
    var step1Time = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
    addWaitTime = addWaitTime + step1Time;
    var step2Time = G_BATTLE_CHANGE_ANIM_SPEED(1000,1,0);
    addWaitTime = addWaitTime + step2Time;
    var step3Time = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
    addWaitTime = addWaitTime + step3Time;
    //点滅させるフィールド座標を設定
    var positions = G_EFFECT_AREA_GET_AREA(cardMasterData['effect_area_type'],entryData['pos'],entryData['direction']);
    BATTLE_EFFECT_LAYER['card_use_anim']['positions'] = positions;
    BATTLE_EFFECT_LAYER['card_use_anim']['play_log'] = playLog;
    BATTLE_EFFECT_LAYER['card_use_anim'].tweener.wait(waitTime).to({
      alpha:1,
    },step1Time).call(function(){
      G_BATTLE_ADD_CARD_USE_LOG(this.target['play_log']);
      G_BATTLE_ANIM_CARD_USE_LOG();
      for (var i = 0; i < this.target['positions'].length; i++) {
        var pos = this.target['positions'][i];
        for (var f = 0; f < BATTLE_FIELDS.length; f++) {
          if(BATTLE_FIELDS[f]['field_x'] == pos['x'] && BATTLE_FIELDS[f]['field_y'] == pos['y']){
            BATTLE_FIELDS[f]['field_status'] = 5;
          }
        }
      }
      this.target.tweener.wait(step2Time).call(function(){
        for (var i = 0; i < this.target['positions'].length; i++) {
          var pos = this.target['positions'][i];
          for (var f = 0; f < BATTLE_FIELDS.length; f++) {
            if(BATTLE_FIELDS[f]['field_x'] == pos['x'] && BATTLE_FIELDS[f]['field_y'] == pos['y']){
              BATTLE_FIELDS[f]['field_status'] = 0;
            }
          }
        }
        this.target.tweener.to({alpha:0},step3Time).call(function(){
          //フィールドステータス強制非表示
          G_BATTLE_FORCE_DELETE_FIELD_STATUS();
          this.target.remove();
          delete this.target;
        });
      });
    });
    BATTLE_EFFECT_LAYER['card_use_anim']['wait_time'] = addWaitTime;
    resultAnim = BATTLE_EFFECT_LAYER['card_use_anim'];
  }
  return resultAnim;
}

function G_BATTLE_ACTION_EXE_ANIM(waitTime,playLog){ //アクション実行アニメーションを再生
  var resultAnim = null;
  if(isset(playLog['my_pos_x']) && isset(playLog['my_pos_y'])){
    var getMyField = G_BATTLE_GET_FIELD(playLog['my_pos_x'],playLog['my_pos_y']);
    var list = new Array();
    list['battle_effect_layer'] = BATTLE_EFFECT_LAYER;
    list['my_field'] = getMyField;
    resultAnim = G_BATTLE_EFFECT_CREATE_ANIM(37,list,waitTime,playLog);
  }
  return resultAnim;
}

//ゲーム結果演出アニメを登録
function G_BATTLE_SET_GAME_RESULT_ANIM(gameResult,waitTime,playLog){
  var result = null;
  var resultType = 0; // 0:通常(finish) 1:自分(今この戦闘見ている人)がチームメンバーにいる
  var list = new Array();
  list['battle_effect_layer'] = BATTLE_EFFECT_LAYER;
  //他人の戦闘画面
  if(BATTLE_PLAYER_ENTRY_DATA == null){ //他人の戦闘画面
    result = G_BATTLE_EFFECT_CREATE_ANIM(34,list,waitTime,playLog);
  }
  else{ //自分が参加している戦闘画面
    if(gameResult['win_team'] == BATTLE_PLAYER_ENTRY_DATA['party_instance']['team_no']){
      //勝利演出を再生
      result = G_BATTLE_EFFECT_CREATE_ANIM(35,list,waitTime,playLog);
    }
    else{
      //負け演出を再生
      result = G_BATTLE_EFFECT_CREATE_ANIM(36,list,waitTime,playLog);
    }
  }
  return result;
}

//ゲーム結果処理を設定
function G_BATTLE_SET_GAME_RESULT(waitTime,gameResult,gameResultSetting){
  //ゲーム結果オブジェクトを設定
  G_BATTLE_CREATE_GAME_RESULT_OBJ(waitTime,gameResult,gameResultSetting);
  //tweener用にプレーンオブジェクトを生成
  if(BATTLE_GAME_RESULT_OBJ != null){
    BATTLE_GAME_RESULT_OBJ.tweener.wait(BATTLE_GAME_RESULT_OBJ['wait_time']).call(function(){
      G_BATTLE_START_GAME_RESULT();
    });
  }
  //演出スキップボタンを生成
  var skipBtn = Button({
    width: SCREEN_WIDTH,         // 横サイズ
    height: SCREEN_WIDTH,        // 縦サイズ
  }).addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
  skipBtn.onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    G_BATTLE_RESULT_ANIM_SKIP();
  };
  skipBtn.visible = false;
}

//ゲーム結果処理本体
function G_BATTLE_CREATE_GAME_RESULT_OBJ(waitTime,gameResult,gameResultSetting){
  if(BATTLE_GAME_RESULT_OBJ == null){
    BATTLE_GAME_RESULT_OBJ = PlainElement({}).addChildTo(BATTLE_UI_WINDOW_LAYER);
    BATTLE_GAME_RESULT_OBJ['game_result'] = gameResult;
    BATTLE_GAME_RESULT_OBJ['game_result_setting'] = gameResultSetting;
    BATTLE_GAME_RESULT_OBJ['wait_time'] = waitTime;
    BATTLE_GAME_RESULT_OBJ['is_exe'] = false;
  }
}

//ゲーム結果処理を開始
function G_BATTLE_START_GAME_RESULT(){
  if(BATTLE_GAME_RESULT_OBJ != null){
    BATTLE_COMMAND_CONTROLE_FINISH = true; //コマンド操作を終了させる
    console.log("ゲーム結果処理を実行する");
    if(BATTLE_GAME_RESULT_OBJ['is_exe'] == false) BATTLE_GAME_RESULT_OBJ['is_exe'] = true;
    else return 0; //既に実行済み
    //リザルトタブを出現させて、戦闘コマンドウィンドウを非表示に
    BATTLE_TAB_BTNS[0].visible = false;
    BATTLE_TAB_BTNS[3].visible = true;
    //透明度の切り替え
    for (var cb = 0; cb < BATTLE_TAB_BTNS.length; cb++) {
      BATTLE_TAB_BTNS[cb].alpha = 0.35;
    }
    BATTLE_TAB_BTNS[3].alpha = 0.7;
    G_BATTLE_COMMAND_WINDOW_DISP(5); //リザルトウィンドウを表示

    var gResult = BATTLE_GAME_RESULT_OBJ['game_result'];
    var gResultSetting = BATTLE_GAME_RESULT_OBJ['game_result_setting'];
    //他人の戦闘画面
    if(BATTLE_PLAYER_ENTRY_DATA == null){ //他人の戦闘画面

    }
    else{ //自分が参加している戦闘画面
      if(gResult['win_team'] == BATTLE_PLAYER_ENTRY_DATA['party_instance']['team_no']){
        //勝利
        if(isset(gResultSetting['drop_datas']) && isset(gResultSetting['drop_datas'][BATTLE_PLAYER_ENTRY_DATA['unique_no']])){ //報酬獲得があった。
          var dropData = gResultSetting['drop_datas'][BATTLE_PLAYER_ENTRY_DATA['unique_no']];
          var nextEvent = -1; //デフォルト
          if(isset(gResultSetting['next_events']) && isset(gResultSetting['next_events'][BATTLE_PLAYER_ENTRY_DATA['unique_no']])){
            nextEvent = gResultSetting['next_events'][BATTLE_PLAYER_ENTRY_DATA['unique_no']];
          }
          var listObj = G_BATTLE_CREATE_BATTLE_RESULT_WINDOW(dropData);
          var checkList = new Array();
          checkList[checkList.length] = "close_item_info_window";
          G_UI_CREATE_LIST(BATTLE_UI_WINDOW_LAYER,listObj,listObj['list_height_size'],"戦闘結果","閉じる",checkList);
          BATTLE_RESULT_WINDOW_VISIBLE = true; //結果ウィンドウアクティブ
          BATTLE_RESULT_WINDOW_DROP_DATA = dropData;
          BATTLE_RESULT_NEXT_EVENT_DATA = nextEvent;
        }
      }
      else{
        //負け

      }
    }
  }
}

//戦闘結果画面を作成
function G_BATTLE_CREATE_BATTLE_RESULT_WINDOW(dropDatas){
  var expNum = 0;
  for (var i = 0; i < dropDatas.length; i++) {
    if(dropDatas[i]['type'] == "exp"){
      expNum = expNum + parseInt(dropDatas[i]['drop_val']);
    }
  }
  var result = null;
  result = Sprite('ASSET_106');
  result['base'] = Sprite('ASSET_106').addChildTo(result);
  result['start_pos'] = 0;
  result['end_pos'] = 0;
  result['list_height_size'] = 0;
  //入手経験値
  result['exp_name'] = Label({
    text: "経験値",
    fontSize: 36,
    fill: 'white',
    align: 'left',
  }).addChildTo(result['base']);
  result['exp_name'].x = result['exp_name'].x - (result.width * 0.3);
  result['exp_name'].y = result['exp_name'].y - (result.height * 0.3);

  result['exp_num'] = Label({
    text: "+" + expNum,
    fontSize: 36,
    fill: 'white',
    align: 'right',
  }).addChildTo(result['base']);
  result['exp_num'].x = result['exp_num'].x + (result.width * 0.3);
  result['exp_num'].y = result['exp_name'].y;

  result['start_pos'] = parseFloat(result['exp_num'].y);
  result['end_pos'] = parseFloat(result['exp_num'].y);

  result['drop_item_titile'] = Label({
    text: "---入手アイテム---",
    fontSize: 36,
    fill: 'white',
  }).addChildTo(result['base']);
  result['drop_item_titile'].y = result['exp_name'].y;
  result['drop_item_titile'].y = result['drop_item_titile'].y + result['drop_item_titile'].height * 1.25;

  result['list_height_size'] = result.height * 0.75;

  result['end_pos'] = result['drop_item_titile'].y;

  result['drop_item_icons'] = new Array();
  var iconPosX = 0;
  var iconPosY = result['drop_item_titile'].y + result['drop_item_titile'].height * 1.25;
  var iconIncrementCount = 0;
  var increment = 0;
  for (var i = 0; i < dropDatas.length; i++) {
    var icon = null;
    switch (dropDatas[i]['type']) {
      case "item":
      {
        var itemMasterData = null;
        for (var im = 0; im < MASTER_DATA_ITEM_MASTER.length; im++) {
          if(MASTER_DATA_ITEM_MASTER[im]['id'] == dropDatas[i]['target_id']) {itemMasterData = MASTER_DATA_ITEM_MASTER[im];break;}
        }
        if(itemMasterData != null){
          icon = G_ITEM_ICON_CREATE(0,itemMasterData,0.2,parseInt(dropDatas[i]['drop_val']));
          if(icon != null){
            icon.addChildTo(result['base']);
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
                itemInfoWIndow.addChildTo(BATTLE_UI_WINDOW_LAYER);
              }
            };
            icon['button'].visible = false;
          }
        }
      }
      break;
      case "equip_item":
      {
        var itemMasterData = null;
        for (var im = 0; im < MASTER_DATA_EQUIP_ITEM_MASTER.length; im++) {
          if(MASTER_DATA_EQUIP_ITEM_MASTER[im]['id'] == dropDatas[i]['target_id']) {itemMasterData = MASTER_DATA_EQUIP_ITEM_MASTER[im];break;}
        }
        if(itemMasterData != null){
          icon = G_ITEM_ICON_CREATE(1,itemMasterData,0.2,parseInt(dropDatas[i]['drop_val']));
          if(icon != null){
            icon.addChildTo(result['base']);
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
                var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(1,this['master_data'],true); //アイテム詳細ウィンドウ
                itemInfoWIndow.addChildTo(BATTLE_UI_WINDOW_LAYER);
              }
            };
            icon['button'].visible = false;
          }
        }
      }
      break;
      case "card":
      {
        var itemMasterData = null;
        for (var im = 0; im < MASTER_DATA_CARD_MASTER.length; im++) {
          if(MASTER_DATA_CARD_MASTER[im]['id'] == dropDatas[i]['target_id']) {itemMasterData = MASTER_DATA_CARD_MASTER[im];break;}
        }
        if(itemMasterData != null){
          icon = G_ITEM_ICON_CREATE(2,itemMasterData,0.2,parseInt(dropDatas[i]['drop_val']));
          if(icon != null){
            icon.addChildTo(result['base']);
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
                var itemInfoWIndow = G_ITEM_CREATE_ITEM_INFO_WINDOW(2,this['master_data'],true); //アイテム詳細ウィンドウ
                itemInfoWIndow.addChildTo(BATTLE_UI_WINDOW_LAYER);
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
      if(i == 0 || iconIncrementCount == 0) {
        iconPosX = -1 * ((parseFloat(icon['get_size_width']) * 2) - (parseFloat(icon['get_size_width']) * 0.2));
        icon.x = icon.x + iconPosX;
        result['end_pos'] = result['end_pos'] + parseFloat(icon['get_size_height']);
      }
      else {
        iconPosX = iconPosX + (parseFloat(icon['get_size_width']) + (parseFloat(icon['get_size_width']) * 0.2));
        icon.x = icon.x + iconPosX;
      }
      iconIncrementCount = iconIncrementCount + 1;
      if(4 <= iconIncrementCount){
        //result['end_pos'] = result['end_pos'] + parseFloat(icon['get_size_height']);
        iconIncrementCount = 0;
        increment = increment + 1;
        if(5 <= increment){
          //result['list_height_size'] = result['list_height_size'] + parseFloat(icon['get_size_height'] * 2);
          //result['base'].y = result['base'].y - (parseFloat(icon['get_size_height']) - (parseFloat(icon['get_size_height']) * 0.25));
        }
        iconPosY = iconPosY + (parseFloat(icon['get_size_height']) * 1.2);
      }
    }
    result['end_pos'] = iconPosY;
  }

  var moveY = result['end_pos'] - result['start_pos'];
  result['list_height_size'] = moveY + (64 + (parseFloat(icon['get_size_height']) * 1.2));
  result['base'].y = result['base'].y - (moveY / 2);
  result['base'].y  = result['base'].y + ((SCREEN_HEIGHT / 2) - (64 + (parseFloat(icon['get_size_height']) * 1.2)));
  return result;
}

//死亡状態を取得(クライアントデータ)
function G_BATTLE_CHECK_DEAD_ENTRY_DATA(uniqueNo){
  var result = false;
  for (var i = 0; i < BATTLE_ENTRY_DATAS.length; i++) {
    if(BATTLE_ENTRY_DATAS[i]['unique_no'] == uniqueNo) {
      if(isset(BATTLE_ENTRY_DATAS[i]['set_dead']) && BATTLE_ENTRY_DATAS[i]['set_dead'] == true) result = true;
      break;
    }
  }
  return result;
}

//死亡状態を設定(クライアントデータ)
function G_BATTLE_SET_DEAD_ENTRY_DATA(uniqueNo){
  for (var i = 0; i < BATTLE_ENTRY_DATAS.length; i++) {
    if(BATTLE_ENTRY_DATAS[i]['unique_no'] == uniqueNo) {
      BATTLE_ENTRY_DATAS[i]['set_dead'] = true;
      break;
    }
  }
}

function G_BATTLE_DEAD(uniqueNo,animTime){ //死亡処理を実行
  console.log("死亡処理実行");
  console.log(uniqueNo);
  G_BATTLE_SET_DEAD_ENTRY_DATA(uniqueNo); //死亡状態をセット
  var entryData = G_BATTLE_GET_ENTRY_DATA(uniqueNo);
  if(entryData != null){
    var field = G_BATTLE_GET_FIELD(entryData['pos']['x'],entryData['pos']['y']);
    if(field != null){
      //キャラクター死亡アニメ再生
      if(isset(field['equip_avatar_image'])){
        if(field['equip_avatar_image'].visible == true){

          field['equip_avatar_image'].tweener.to({alpha: 0},parseInt(animTime * 0.5)).call(function(){
            var pos = new Array();
            pos['x'] = this.target.parent['field_x'];
            pos['y'] = this.target.parent['field_y'];
            console.log("削除座標");
            console.log("x:" + pos['x']);
            console.log("y:" + pos['y']);
            G_BATTLE_DELETE_CHARACTER_POSITION(pos);
          });
        }
      }
      if(isset(field['use_avatar_image'])){
        if(field['use_avatar_image'].visible == true){
          field['use_avatar_image'].tweener.to({alpha: 0},parseInt(animTime * 0.5)).call(function(){
            var pos = new Array();
            pos['x'] = this.target.parent['field_x'];
            pos['y'] = this.target.parent['field_y'];
            console.log("削除座標");
            console.log("x:" + pos['x']);
            console.log("y:" + pos['y']);
            G_BATTLE_DELETE_CHARACTER_POSITION(pos);
          });
        }
      }
      if(isset(field['enemy_image'])){
        if(field['enemy_image'].visible == true){
          field['enemy_image'].tweener.to({alpha: 0},parseInt(animTime * 0.5)).call(function(){
            var pos = new Array();
            pos['x'] = this.target.parent['field_x'];
            pos['y'] = this.target.parent['field_y'];
            console.log("削除座標");
            console.log("x:" + pos['x']);
            console.log("y:" + pos['y']);
            G_BATTLE_DELETE_CHARACTER_POSITION(pos);
          });
        }
      }
    }
  }
  //equip_avatar_image
  //use_avatar_image
  //enemy_image
}

function G_BATTLE_CREATE_HEADER_ANIM(waitTime,playLog){ //ヘッダーアニメーションを作成
  var resultAnim = null;
  var cardMasterData = null;
  var addWaitTime = 0;
  var step1Time = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
  addWaitTime = addWaitTime + step1Time;
  var step2Time = G_BATTLE_CHANGE_ANIM_SPEED(1000,1,0);
  addWaitTime = addWaitTime + step2Time;
  var step3Time = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
  addWaitTime = addWaitTime + step3Time;
  if(isset(playLog['card_id'])) cardMasterData = G_BATTLE_GET_CARD_MASTER_DATA(playLog['card_id']);
  if(cardMasterData != null){
    resultAnim = Sprite('ASSET_34').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
    resultAnim.y = resultAnim.y - ((SCREEN_HEIGHT / 2) - (resultAnim.height / 2));
    resultAnim['header_label'] = Label({
      text: cardMasterData['skill_name'],
      fontSize: 24,
      fill: 'white',
    }).addChildTo(resultAnim);
    resultAnim.alpha = 0;
    resultAnim.tweener.wait(waitTime).to({alpha: 1},step1Time).wait(step2Time).to({alpha: 0},step3Time);
    resultAnim['wait_time'] = addWaitTime;
  }
  return resultAnim;
}

function G_BATTLE_CHECK_LEVEL_UP_ANIM(gameResultSetting){ //レベルアップ演出のチェックと実行
  if(isset(gameResultSetting['drop_datas'])){
    for (var ed = 0; ed < BATTLE_ENTRY_DATAS.length; ed++) {
      if(BATTLE_ENTRY_DATAS[ed]['is_dead'] == false){
        var uniqueNo = BATTLE_ENTRY_DATAS[ed]['unique_no'];
        if(isset(gameResultSetting['drop_datas'][uniqueNo])){ //ドロップデータが存在するか
          for (var dd = 0; dd < gameResultSetting['drop_datas'][uniqueNo].length; dd++) {
            var dropData = gameResultSetting['drop_datas'][uniqueNo][dd];
            if(dropData['type'] == "exp" && dropData['level_up_flag'] == 1){ //レベルアップしていた。
              var getMyField = G_BATTLE_GET_FIELD(BATTLE_ENTRY_DATAS[ed]['pos']['x'],BATTLE_ENTRY_DATAS[ed]['pos']['y']);
              var list = new Array();
              list['battle_effect_layer'] = BATTLE_EFFECT_LAYER;
              list['my_field'] = getMyField;
              var resultAnim = G_BATTLE_EFFECT_CREATE_ANIM(38,list,0,null);
              break;
            }
          }
        }
      }
    }
  }
}

function G_BATTLE_CHECK_STAGE_CLEAR_ANIM(nextEventData){ //ステージクリア演出を実行するかのチェック
  if(nextEventData == 0){ //ステージをクリアした
    var list = new Array();
    list['battle_effect_layer'] = BATTLE_EFFECT_LAYER;
    var resultAnim = G_BATTLE_EFFECT_CREATE_ANIM(39,list,0,null);
  }
}

function G_BATTLE_REPLAY_START(){ //戦闘シーンの再生開始
  G_BATTLE_DELETE_ANIM_LIST(); //残っているアニメーションを削除
  BATTLE_ANIM_PLAY_COUNT = 0;
  BATTLE_GAME_RESULT = null;
  var replay = PlainElement({}).addChildTo(BATTLE_BATTLE_SCENE_BASE); //リプレイ用プレーンオブジェクト
  replay['now_play_count'] = -1;
  replay['max_turn'] = BATTLE_TURN;
  BATTLE_TURN = 0; //ターンをリセット
  //キャラクター表示リセット
  G_BATTLE_DELETE_CHARACTER_POSITION();
  //強制削除
  G_BATTLE_FORCE_DELETE_CHARACTER_SPRITE();
  //フィールドステータス強制非表示
  G_BATTLE_FORCE_DELETE_FIELD_STATUS();
  //エントリーデータ初期化
  BATTLE_ENTRY_DATAS = BATTLE_RESULT_ENTRY_DATAS[BATTLE_TURN];
  //アクションリスト初期化
  //キャラクター表示処理
  G_BATTLE_SET_CHARACTER_POSITION(BATTLE_ENTRY_DATAS);

  replay.update = function() {
    console.log("継続チェック");
    if(this['now_play_count'] != BATTLE_ANIM_PLAY_COUNT){ //アニメーションが終了
      this['now_play_count'] = BATTLE_ANIM_PLAY_COUNT;
      console.log("継続アニメチェック");
      //次のアニメーションがあれば、アニメを再生
      BATTLE_TURN = BATTLE_TURN + 1;
      if(BATTLE_TURN <= this['max_turn']){
        console.log("継続アニメ開始");
        //エントリーデータ初期化
        BATTLE_ENTRY_DATAS = BATTLE_RESULT_ENTRY_DATAS[BATTLE_TURN];
        console.log();
        //アクションリスト初期化
        BATTLE_ACTION_LIST_UNIQUE_NOS = BATTLE_RESULT_ACTION_LIST_UNIQUE_NOS[BATTLE_TURN];
        //戦闘ログを設定
        G_BATTLE_SET_BATTLE_LOG(BATTLE_RESULT_BATTLE_LOG);
        //戦闘アニメーション設定
        G_BATTLE_SET_BATTLE_ANIM();
        //戦闘アニメーション開始
        G_BATTLE_START_BATTLE_ANIM();
      }
      else{
        this.remove();
      }
    }
  };
}

function G_BATTLE_DELETE_ANIM_LIST(){ //アニメーションリストのアニメを削除
  for (var i = 0; i < BATTLE_PLAY_ANIM_LIST.length; i++) {
    // //バフ発動アニメがあれば削除
    if(BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'].length != 0){
      for (var bal = 0; bal < BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'].length; bal++) {
        if(BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'][bal] != null){
          BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'][bal].tweener.clear();
          delete BATTLE_PLAY_ANIM_LIST[i]['buff_anim_list'][bal];
        }
      }
    }
    //移動アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['move_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['move_anim'].tweener.clear();
      delete BATTLE_PLAY_ANIM_LIST[i]['move_anim'];
    }
    //カード使用アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['card_use_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['card_use_anim'].tweener.clear();
      delete BATTLE_PLAY_ANIM_LIST[i]['card_use_anim'];
    }
    //アクション実行アニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['action_exe_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['action_exe_anim'].tweener.clear();
      delete BATTLE_PLAY_ANIM_LIST[i]['action_exe_anim'];
    }
    //ヘッダーアニメがあれば再生
    if(BATTLE_PLAY_ANIM_LIST[i]['header_anim'] != null){
      BATTLE_PLAY_ANIM_LIST[i]['header_anim'].tweener.clear();
      delete BATTLE_PLAY_ANIM_LIST[i]['header_anim'];
    }
    //行動アニメがあれば、再生
    if(BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'].length != 0){
      console.log("戦闘エフェクト再生");
      for (var aal = 0; aal < BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'].length; aal++) {
        console.log(BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'][aal]);
        BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'][aal].tweener.clear();
        delete BATTLE_PLAY_ANIM_LIST[i]['action_anim_list'][aal];
      }
    }
  }
  BATTLE_PLAY_ANIM_LIST.length = 0;
}

function G_BATTLE_SCENE_EXE(){
  console.log(BATTLE_RESULT_NEXT_EVENT_DATA);
  if(BATTLE_RESULT_NEXT_EVENT_DATA == -1){ //デフォルト移動
    var prevScene = SCENE_MANAGER['prev_scene'];
    SCENE_MANAGER['prev_scene'] = "battle";
    BATTLE_SCENE_INSTANCE.exit(prevScene);
  }
  else if(BATTLE_RESULT_NEXT_EVENT_DATA == 0){ //ストーリークリア
    //終了した場合、ストーリー画面に戻る。
    SCENE_MANAGER['prev_scene'] = "battle";
    BATTLE_SCENE_INSTANCE.exit("story");
  }
  else if(isset(BATTLE_RESULT_NEXT_EVENT_DATA['event_count'])){ //次のイベントデータがあった場合
    STORY_SELECT_MAIN_STORY_HASH['player_event_count'] = (BATTLE_RESULT_NEXT_EVENT_DATA['event_count'] - 1); //イベント進行度を更新
    var nextEventCategoryId = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][STORY_SELECT_MAIN_STORY_HASH['player_event_count']]['event_category_id'];
    switch (nextEventCategoryId) {
      case "1":
      SCENE_MANAGER['prev_scene'] = "battle";
      BATTLE_SCENE_INSTANCE.exit("comm");
        break;
      case "2":
      SCENE_MANAGER['prev_scene'] = "battle";
      BATTLE_SCENE_INSTANCE.exit("map");
        break;
      case "3":
        break;
      default:
      console.log("カテゴリーが見つからなかった");
        break;
    }
  }
}

//前回通信したposパラメーターを保存
function G_BATTLE_SET_BEFOR_POST_PARAM(postParam){
  BATTLE_BEFOR_POST_PARAM = null;
  BATTLE_BEFOR_POST_PARAM = postParam;
}

//再通信を開始
function G_BATTLE_START_RECONNECT(){
  BATTLE_RECONNECT_FLAG = true;
  NETWORK_IS_CONNECTING = true;
  var postParam = BATTLE_BEFOR_POST_PARAM;
  ajaxStart("post","json","../../client/battle/battle.php",postParam); //非同期通信開始
}

//最新の戦闘情報を取得
function G_BATTLE_SYNC_BATTLE_INSTANCE(){
  NETWORK_IS_CONNECTING = true;
  var postParam = new Object();
  postParam['battle_instance_id'] = new Object();
  postParam['battle_instance_id'] = PLAYER_BATTLE_INSTANCE['battle_instance_id'];
  G_BATTLE_SET_BEFOR_POST_PARAM(postParam);
  ajaxStart("post","json","../../client/battle/battle.php",postParam); //非同期通信開始
}

//マルチプレイモードに切り替わった。
function G_BATTLE_TRANCE_MULTI_PLAYER_MODE(){
  if(BATTLE_MULTIPLAYER_INSTANCE.length == 0) return null;
  if(!BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit'] || BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit'] == -1) return null;
  //ヘッダー表示
  BATTLE_MULTIPLAYER_MODE_UI['header'] = Sprite('ASSET_966').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
  BATTLE_MULTIPLAYER_MODE_UI['header'].y = BATTLE_MULTIPLAYER_MODE_UI['header'].y - ((SCREEN_HEIGHT / 2) - (BATTLE_MULTIPLAYER_MODE_UI['header'].height / 2));
  BATTLE_MULTIPLAYER_MODE_UI['header'].tweener.to({alpha: 0},1500).to({alpha: 1},1500).setLoop(true).play();
  //残り時間ゲージ
  var timePercentage = parseInt(BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit']) / 60 * 1000;
  BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'] = Gauge({
    width: 512,            // 横サイズ
    height: 16,            // 縦サイズ
    cornerRadius: 10,      // 角丸み
    maxValue: 60000,         // ゲージ最大値
    value: timePercentage,   // ゲージ初期値
    fill: 'blue',         // 後ろの色
    gaugeColor: 'red', // ゲージ色
    stroke: 'silver',      // 枠色
    strokeWidth: 2,        // 枠太さ
  }).addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
  BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge']['time_limit'] = BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit'] * 1000;
  BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].y = BATTLE_MULTIPLAYER_MODE_UI['header'].y;
  BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].y = BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].y + BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].height * 1.5;
  BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].update = function() {
    if(this['time_limit'] <= 0) return null;
    this['time_limit'] -= PHINA_APP.deltaTime;
    this.value = this['time_limit'];
  }
  //時計背景
  BATTLE_MULTIPLAYER_MODE_UI['watch_bg'] = Sprite('ASSET_964').addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
  BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].y = BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].y;
  BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].x = BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].x - (SCREEN_WIDTH / 2);
  BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].x = BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].x + (BATTLE_MULTIPLAYER_MODE_UI['watch_bg'].width / 2);
  //時計針
  BATTLE_MULTIPLAYER_MODE_UI['watch_arrow'] = Sprite('ASSET_965').addChildTo(BATTLE_MULTIPLAYER_MODE_UI['watch_bg']);
  BATTLE_MULTIPLAYER_MODE_UI['watch_arrow'].tweener.rotateBy(360,500).setLoop(true).play();
  //自動通信モードオン
  G_BATTLE_AUTO_CONNECTION(true);
}


//マルチプレイモードUIを最新の状態に更新
function G_BATTLE_UPDATE_MULTI_PLAYERMODE_UI(gameEnd){
  if(gameEnd == false){ //戦闘が終わっていない
    BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge']['time_limit'] = BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit'] * 1000;
    //残り時間ゲージ
    var timePercentage = parseInt(BATTLE_MULTIPLAYER_INSTANCE['wait_time_limit']) / 60 * 1000;
    BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].value = timePercentage;
    //自動更新処理
    G_BATTLE_AUTO_CONNECTION(true);
    //反映待ちアクション追加済みか確認
    if(G_BATTLE_CHECK_SET_STANDBY_ADD_ACTION() == true){
      //決定等のボタンを更新ボタンに更新
      G_BATTLE_CHANGE_UPDATE_ICON_BUTTON(true);
    }
    else{
      G_BATTLE_CHANGE_UPDATE_ICON_BUTTON(false);
    }
  }
  else{ //戦闘が終わった
    //自動更新処理
    BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge']['time_limit'] = 0;
    BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge'].value = 0;
    G_BATTLE_AUTO_CONNECTION(false);
  }
}

//アニメーション速度を変更 // flag 0:掛け算 1:割り算 2:BATTLE_ANIM_SPEED parse 0:int 1:float
function G_BATTLE_CHANGE_ANIM_SPEED(base,flag,parse){
  if(flag == 2) return BATTLE_ANIM_SPEED;
  if(parse == 0){
    switch (parseInt(BATTLE_ANIM_SPEED)) {
      case 1:
      { return flag == 0 ? parseInt(base * 1) : parseInt(base / 1); }
      break;
      case 2:
      { return flag == 0 ? parseInt(base * 2) : parseInt(base / 2); }
      break;
      case 3:
      { return flag == 0 ? parseInt(base * 3) : parseInt(base / 3); }
      break;
      default:
      break;
    }
  }
  else{
    switch (parseInt(BATTLE_ANIM_SPEED)) {
      case 1:
      { return flag == 0 ? parseFloat(base * 1) : parseFloat(base / 1); }
      break;
      case 2:
      { return flag == 0 ? parseFloat(base * 2) : parseFloat(base / 2); }
      break;
      case 3:
      { return flag == 0 ? parseFloat(base * 3) : parseFloat(base / 3); }
      break;
      default:
      break;
    }
  }
  return base;
}

//アニメーションスピードの更新が行われた(ボタンが押された)
function G_BATTLE_ANIM_SPEED_UPDATE(){
  if(isset(BATTLE_COMMAND_WINDOW_BTNS[2]) && isset(BATTLE_COMMAND_WINDOW_BTNS[2]['icon']) && BATTLE_COMMAND_WINDOW_BTNS[2].visible == true){
    var changeAssetId = -1;
    switch (parseInt(BATTLE_ANIM_SPEED)) {
      case 1:{changeAssetId = 968;BATTLE_ANIM_SPEED = 2}
      break;
      case 2:{changeAssetId = 969;BATTLE_ANIM_SPEED = 3}
      break;
      case 3:{changeAssetId = 967;BATTLE_ANIM_SPEED = 1}
      break;
      default:
      break
    }
    if(changeAssetId != -1){
      BATTLE_COMMAND_WINDOW_BTNS[2]['icon'].remove();
      BATTLE_COMMAND_WINDOW_BTNS[2]['icon'] = null;
      BATTLE_COMMAND_WINDOW_BTNS[2]['icon'] = Sprite('ASSET_' + changeAssetId).addChildTo(BATTLE_COMMAND_WINDOW_BTNS[2]);
    }
  }
}

//コマンドが既にセットされていた場合、決定ボタン等のボタンを更新ボタンにする
function G_BATTLE_CHANGE_UPDATE_ICON_BUTTON(bool){
  if(BATTLE_COMMAND_WINDOW_TYPE != 0) return 0;
  if(!isset(BATTLE_COMMAND_WINDOW_BTNS[0]) || !isset(BATTLE_COMMAND_WINDOW_BTNS[1])) return 0;
  if(bool == true){
    BATTLE_COMMAND_WINDOW_BTNS[0]['icon'].remove();
    BATTLE_COMMAND_WINDOW_BTNS[0]['icon'] = Sprite('ASSET_970').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[0]);
    BATTLE_COMMAND_WINDOW_BTNS[1]['icon'].remove();
    BATTLE_COMMAND_WINDOW_BTNS[1]['icon'] = Sprite('ASSET_970').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[1]);
  }
  else{ //更新ボタンにしない場合h元に戻す
    BATTLE_COMMAND_WINDOW_BTNS[0]['icon'].remove();
    BATTLE_COMMAND_WINDOW_BTNS[0]['icon'] = Sprite('ASSET_807').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[0]);
    BATTLE_COMMAND_WINDOW_BTNS[1]['icon'].remove();
    BATTLE_COMMAND_WINDOW_BTNS[1]['icon'] = Sprite('ASSET_808').addChildTo(BATTLE_COMMAND_WINDOW_BTNS[1]);
  }
}

function G_BATTLE_CHECK_SET_STANDBY_ADD_ACTION(){ //現在のターンに反映待ち追加アクションが設定されているか、確認する。
  console.log("反映待ちアクションチェック");
  console.log("ターン:" + BATTLE_TURN);
  console.log(BATTLE_MY_STANDBY_ADD_ACTIONS);
  for (var i = 0; i < BATTLE_MY_STANDBY_ADD_ACTIONS.length; i++) {
    if(BATTLE_MY_STANDBY_ADD_ACTIONS[i]['exe_turn'] == BATTLE_TURN) return true;
  }
  return false;
}

//結果演出のスキップ
function G_BATTLE_RESULT_ANIM_SKIP(){
  if(BATTLE_GAME_RESULT_ANIM != null && BATTLE_GAME_RESULT_OBJ != null && isset(BATTLE_GAME_RESULT_ANIM['is_play']) && BATTLE_GAME_RESULT_ANIM['is_play'] == true){
    if(BATTLE_GAME_RESULT_OBJ['is_exe'] == false) {
      //アニメーション削除
      console.log("バトルリザルト演出削除");
      BATTLE_GAME_RESULT_ANIM.tweener.clear();
      BATTLE_GAME_RESULT_ANIM.remove();
      BATTLE_GAME_RESULT_ANIM = null;
      BATTLE_ANIM_PLAY = false;
      G_BATTLE_START_GAME_RESULT();
    }
  }
}

//自動通信処理
function G_BATTLE_AUTO_CONNECTION(visible){
  if(visible == true){
    if(BATTLE_AUTO_CONNECTION_OBJ == null){
      //自動通信オブジェクトを生成
      BATTLE_AUTO_CONNECTION_OBJ = PlainElement({}).addChildTo(BATTLE_BATTLE_SCENE_BASE);
      BATTLE_AUTO_CONNECTION_OBJ['visible'] = true;
      BATTLE_AUTO_CONNECTION_OBJ['connection_off_time'] = 0; //決定ボタン等が押せない時間
      BATTLE_AUTO_CONNECTION_OBJ['next_connection_count_down'] = BATTLE_MULTIPLAYER_MODE_UI['time_limit_gauge']['time_limit']; //次に通信する時間 0で通信
    }
  }
  else{ //自動通信OFF
    if(BATTLE_AUTO_CONNECTION_OBJ != null) BATTLE_AUTO_CONNECTION_OBJ['visible'] = false;
  }
}
