//============================================
// マイページシーン
//============================================
var MYPAGE_USER_INFO_DISP = null;//ユーザーステータス表示用
var MYPAGE_PLAYER_CLASS_DATA = null;//プレイヤークラスのマスターデータ
var MYPAGE_PLAYER_LEVEL_STAGE_DATA = null;//プレイヤーレベルステージ
var MYPAGE_USER_STATUS_CHECK = false;//表示するステータスが全て揃ったかのチェック
var MYPAGE_STATUS_SPRITE = new Array(); //ステータス表示用のスプライト
var MYPAGE_STATUS_VAL_SPRITE = new Array(); //ステータス値表示用スプライト
var MYPAGE_STATUS_LABELS = new Array(); //ステータス表示用のラベル
var MYPAGE_STATUS_VAL_LABELS = new Array(); //ステータス値表示用のラベル
var MYPAGE_SCREEN_SENTER_X = null; //スクリーン座標の中心
var MYPAGE_SCREEN_SENTER_Y = null; //スクリーン座標の中心
var MYPAGE_PLAYER_STAMINA_DATA = null; //プレイヤーの現在のスタミナ
var MYPAGE_PLAYER_VITALITY_DATA = null; //プレイヤーの現在の生命力
var MYPAGE_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品表示用データ
var MYPAGE_PLAYER_VITALITY_PENALTY = null; //生命力低下ペナルティー
var MYPAGE_MENU_BUTTON = new Array(); //マイページのメニューボタン用配列
var MYPAGE_MENU_BUTTON_NUMBER = 0; //メニューボタンが押された場合に数値が変わる
var MYPAGE_MENU_BUTTON_LABEL = new Array(); //メニューボタンに表示するテキスト
var MYPAGE_PLAYER_PLAY_ANIM_FLAG = false; //選択アニメーション再生中か
var MYPAGE_PLAYER_AREA_MASTER_DATA = null; //プレイヤーが現在居る、エリアのマスターデータ
var MYPAGE_STORY_SCHENE_CHANGE = false; //ストーリー移動が有効か
var MYPAGE_AVATAR_DISP_WINDOW = null; //アバター表示用の窓
var MYPAGE_PLAYER_AVATAR_DATA = null; //プレイヤーアバターデータ
var MYPAGE_AVATAR_DISP_FLAG = false; //アバター表示済みか。
var MYPAGE_SCENE_INIT = false; //マイページの初期化通信が終了したか true = 初期化済み
var MYPAGE_PLAYER_AVATAR_SPRITE = new Array(); //マイページに表示するプレイヤーアバター画像 use equipの2つ
var MYPAGE_PLAYER_MY_GUILD_DATA = null; //自分が所属しているギルドデータ
phina.define("MyPage", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "myPage";
    //メンバー初期化
    PLAYER_MASTER = null;
    PLAYER_STATUS = null;
    PLAYER_INFO = null;
    MYPAGE_USER_INFO_DISP = null;//ユーザーステータス表示用
    MYPAGE_PLAYER_CLASS_DATA = null;//プレイヤークラスのマスターデータ
    MYPAGE_PLAYER_LEVEL_STAGE_DATA = null;//プレイヤーレベルステージ
    MYPAGE_USER_STATUS_CHECK = false;//表示するステータスが全て揃ったかのチェック
    MYPAGE_STATUS_SPRITE = new Array(); //ステータス表示用のスプライト
    MYPAGE_STATUS_VAL_SPRITE = new Array(); //ステータス値表示用スプライト
    MYPAGE_STATUS_LABELS = new Array(); //ステータス表示用のラベル
    MYPAGE_STATUS_VAL_LABELS = new Array(); //ステータス値表示用のラベル
    MYPAGE_SCREEN_SENTER_X = null; //スクリーン座標の中心
    MYPAGE_SCREEN_SENTER_Y = null; //スクリーン座標の中心
    MYPAGE_PLAYER_STAMINA_DATA = null; //プレイヤーの現在のスタミナ
    MYPAGE_PLAYER_VITALITY_DATA = null; //プレイヤーの現在の生命力
    MYPAGE_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品表示用データ
    MYPAGE_PLAYER_VITALITY_PENALTY = null; //生命力低下ペナルティー
    MYPAGE_MENU_BUTTON = new Array(); //マイページのメニューボタン用配列
    MYPAGE_MENU_BUTTON_NUMBER = 0; //メニューボタンが押された場合に数値が変わる
    MYPAGE_MENU_BUTTON_LABEL = new Array(); //メニューボタンに表示するテキスト
    MYPAGE_PLAYER_PLAY_ANIM_FLAG = false; //選択アニメーション再生中か
    MYPAGE_PLAYER_AREA_MASTER_DATA = null; //プレイヤーが現在居る、エリアのマスターデータ
    STORY_SELECT_MAIN_STORY_HASH = null; //ストーリー情報を初期化
    STORY_START_STORY_CATEGORY_ID = 0;//ストーリー情報を初期化
    MYPAGE_STORY_SCHENE_CHANGE = false; //ストーリー移動が有効か
    MYPAGE_AVATAR_DISP_WINDOW = null; //アバター表示用の窓
    MYPAGE_PLAYER_AVATAR_DATA = null; //プレイヤーアバターデータ
    MYPAGE_AVATAR_DISP_FLAG = false; //アバター表示済みか。
    MYPAGE_SCENE_INIT = false; //マイページの初期化通信が終了したか true = 初期化済み
    MYPAGE_PLAYER_AVATAR_SPRITE = new Array(); //マイページに表示するプレイヤーアバター画像 use equipの2つ
    MYPAGE_PLAYER_MY_GUILD_DATA = null; //自分が所属しているギルドデータ

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    // ラベル
    MYPAGE_SCREEN_SENTER_X = this.gridX.center();
    MYPAGE_SCREEN_SENTER_Y = this.gridX.center();
    MYPAGE_USER_INFO_DISP = Label({
      text: '',
      fontSize: 18,
      fill: 'white',
      align: 'left',
    }).addChildTo(this).setPosition(this.gridX.center() * 1.0, this.gridY.center() * 0.5);
    for (var i = 0; i < 10; i++) {
      MYPAGE_STATUS_SPRITE[i] = Sprite('ASSET_31').addChildTo(this); //タイトル背景画像
      MYPAGE_STATUS_SPRITE[i].x = -9999;
      MYPAGE_STATUS_SPRITE[i].y = -9999;
      MYPAGE_STATUS_VAL_SPRITE[i] = Sprite('ASSET_31').addChildTo(this); //タイトル背景画像
      MYPAGE_STATUS_VAL_SPRITE[i].x = -9999;
      MYPAGE_STATUS_VAL_SPRITE[i].y = -9999;
    }

    for (var i = 0; i < 10; i++) {
      MYPAGE_STATUS_LABELS[i] = Label({
        text: '',
        fontSize: 16,
        fill: 'black',
      }).addChildTo(MYPAGE_STATUS_SPRITE[i]);
      MYPAGE_STATUS_VAL_LABELS[i] = Label({
        text: '',
        fontSize: 16,
        fill: 'black',
      }).addChildTo(MYPAGE_STATUS_VAL_SPRITE[i]);
    }
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(this);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'マイページ',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    //キャラ表示用背景ウィンドウ
    MYPAGE_AVATAR_DISP_WINDOW = Sprite('ASSET_33').addChildTo(this);
    MYPAGE_AVATAR_DISP_WINDOW.x = this.gridX.center() * 0.5;
    MYPAGE_AVATAR_DISP_WINDOW.y  = this.gridY.center() * 0.5;

    //キャラ背景ボタン
    MYPAGE_AVATAR_DISP_WINDOW['btn'] = Button({
      width: MYPAGE_AVATAR_DISP_WINDOW.width,         // 横サイズ
      height: MYPAGE_AVATAR_DISP_WINDOW.height,        // 縦サイズ
    }).addChildTo(MYPAGE_AVATAR_DISP_WINDOW);
    MYPAGE_AVATAR_DISP_WINDOW['btn'].onpointend = function(e){
      console.log("btnpush");
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false && MYPAGE_SCENE_INIT == true && isset(MYPAGE_PLAYER_AVATAR_SPRITE['type'])){
        if(MYPAGE_PLAYER_AVATAR_SPRITE['type'] == 0){
          MYPAGE_PLAYER_AVATAR_SPRITE['type'] = 1;
          MYPAGE_PLAYER_AVATAR_SPRITE['equip'].visible = false;
          MYPAGE_PLAYER_AVATAR_SPRITE['use'].visible = true;
        }
        else{
          MYPAGE_PLAYER_AVATAR_SPRITE['type'] = 0;
          MYPAGE_PLAYER_AVATAR_SPRITE['equip'].visible = true;
          MYPAGE_PLAYER_AVATAR_SPRITE['use'].visible = false;
        }
      }
    };
    MYPAGE_AVATAR_DISP_WINDOW['btn'].visible = false;


    //メニュー表示用ノードを生成
    var menuNode = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    menuNode.y = menuNode.y + SCREEN_HEIGHT * 0.055;

    var buttonLabelText = new Array();
    buttonLabelText[1] = "ストーリー";
    buttonLabelText[2] = "エリアに移動";
    buttonLabelText[3] = "アイテムボックス";
    buttonLabelText[4] = "ショップ";
    buttonLabelText[5] = "ワールドマップ";
    buttonLabelText[6] = "パーティ";
    buttonLabelText[7] = "フレンド";
    buttonLabelText[8] = "ギルド";
    buttonLabelText[9] = "イベント";
    buttonLabelText[10] = "その他";
    var j = 1;
    var column = 1; //ボタンの段数
    for (var i = 1; i < buttonLabelText.length; i++) {
      MYPAGE_MENU_BUTTON[i] = Button({
        text: '',
        width: 320,         // 横サイズ
        height: 64,        // 縦サイズ
        fill: 'none',   // ボタン色
        stroke: 'none',    // 枠色
      }).addChildTo(menuNode);
      if( i % 2 == 0){
        MYPAGE_MENU_BUTTON[i].x = MYPAGE_MENU_BUTTON[i].width / 2;
        MYPAGE_MENU_BUTTON[i].y = (((MYPAGE_MENU_BUTTON[i].height / 2) * column) - (MYPAGE_MENU_BUTTON[i].height / 2)) + (MYPAGE_MENU_BUTTON[i].height / 2);
      }
      else{
        MYPAGE_MENU_BUTTON[i].x = MYPAGE_MENU_BUTTON[i].x - (MYPAGE_MENU_BUTTON[i].width / 2);
        MYPAGE_MENU_BUTTON[i].y = ((MYPAGE_MENU_BUTTON[i].height / 2) * column) + (MYPAGE_MENU_BUTTON[i].height / 2);
      }
      var buttonSprite = Sprite('ASSET_35').addChildTo(MYPAGE_MENU_BUTTON[i]);
      MYPAGE_MENU_BUTTON_LABEL[i] = Label({
        text: buttonLabelText[i],
        fontSize: 24,
        fill: 'white',
        //align: 'right',
      }).addChildTo(buttonSprite);
      j = j + 1;
      if(2 <= j){
        column = column + 1;
      }
    }
    MYPAGE_MENU_BUTTON[1].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 1;//ストーリー
      }
    };
    console.log(MYPAGE_MENU_BUTTON[1]);
    MYPAGE_MENU_BUTTON[2].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        AREA_MODE = 1; //オープンエリアに設定
        if(PLAYER_BATTLE_INSTANCE != null) PLAYER_BATTLE_INSTANCE = null; //インスタンス情報があれば削除
        MYPAGE_MENU_BUTTON_NUMBER = 2;//ワールドエリア
      }
    };
    MYPAGE_MENU_BUTTON[3].onpointend = function(e){ //アイテムボックスボタン押した時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 3;//アイテムボックスに移動
      }
    };
    MYPAGE_MENU_BUTTON[4].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 4;//ショップ
      }
    };
    MYPAGE_MENU_BUTTON[5].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 5;//ワールドマップ
      }
    };
    MYPAGE_MENU_BUTTON[6].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 6;//パーティ
      }
    };
    MYPAGE_MENU_BUTTON[7].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 7;//フレンド
      }
    };
    MYPAGE_MENU_BUTTON[8].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 8;//ギルド
      }
    };
    MYPAGE_MENU_BUTTON[9].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 9;//イベント
      }
    };
    MYPAGE_MENU_BUTTON[10].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false){
        MYPAGE_MENU_BUTTON_NUMBER = 10;//その他
      }
    };
    NETWORK_IS_CONNECTING = true;
    var postParamVal = new Object();
    postParamVal['client_master_data_versions'] = G_MASTER_DATA_GET_CLIENT_MASTER_DATA_VERSIONS();
    postParamVal['area_move_check'] = 0;
    postParamVal['paypal_billing_check'] = 0;
    postParamVal['my_page_init'] = 0;
    ajaxStart("post","json","../../client/myPage/myPage.php",postParamVal); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      if(isset(json["session_status"])){
        console.log(json,"結果");
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["sever_master_datas"])){
            G_MASTER_DATA_SET_CLIENT_MASTER_DATA(json["sever_master_datas"]); //マスターデータをセット
          }
          if(isset(json['result_add_load_asset_datas'])){ //追加読み込みアセット
            G_ASSET_START_ASSET_LODER(json['result_add_load_asset_datas']); //アセットを追加読み込みする(非同期)
          }
          if(isset(json['player_avatar_data'])){ //プレイヤーアバターデータ
             MYPAGE_PLAYER_AVATAR_DATA = json['player_avatar_data'];
          }
          if(isset(json["player_master"])){
            PLAYER_MASTER = json["player_master"];//プレイヤーマスターデータを更新
          }
          if(isset(json["player_info"])){
            PLAYER_INFO = json["player_info"];//プレイヤー情報を更新
          }
          if(isset(json["player_status"])){
            PLAYER_STATUS = json["player_status"];//プレイヤーステータスを更新
          }
          if(isset(json["player_class_data"])){
            MYPAGE_PLAYER_CLASS_DATA = json["player_class_data"];
          }
          if(isset(json["player_level_stage_data"])){
            MYPAGE_PLAYER_LEVEL_STAGE_DATA = json["player_level_stage_data"];//レベルステージを更新
          }
          if(isset(json["player_stamina_data"])){
            MYPAGE_PLAYER_STAMINA_DATA = json["player_stamina_data"];//プレイヤーの現在のスタミナ
          }
          if(isset(json["player_vitality_data"])){
            MYPAGE_PLAYER_VITALITY_DATA = json["player_vitality_data"];//プレイヤーの現在の生命力
          }
          if(isset(json["player_equip_item_disp"])){
            MYPAGE_PLAYER_EQUIP_ITEM_DISP = json["player_equip_item_disp"];//プレイヤーの装備品表示用データ
          }
          if(isset(json["vitality_penalty"])){
            MYPAGE_PLAYER_VITALITY_PENALTY = json["vitality_penalty"];//生命力ペナルティー
          }
          if(isset(json["player_area_master"])){
            MYPAGE_PLAYER_AREA_MASTER_DATA = json["player_area_master"]; //プレイヤーが居るエリア情報をセット
          }
          if(isset(json["result_continue_player_event_count"]) && isset(json['check_main_story'])){ //ストーリー情報の結果を取得
            STORY_SELECT_MAIN_STORY_HASH = json['check_main_story'];
            console.log(json["result_continue_player_event_count"]);
            console.log(STORY_SELECT_MAIN_STORY_HASH);
            var resultPlayerEventCount = json["result_continue_player_event_count"];
            STORY_SELECT_MAIN_STORY_HASH['player_event_count'] = (resultPlayerEventCount - 1);
            STORY_START_STORY_CATEGORY_ID = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][resultPlayerEventCount - 1]['event_category_id']; //開始のストーリーカテゴリーを更新
            MYPAGE_STORY_SCHENE_CHANGE = true;
            console.log(STORY_START_STORY_CATEGORY_ID);
          }
          if(isset(json["result_my_guild_data"])){ //自分が所属しているギルドデータ 所属していない場合はこの値を取得できない
            MYPAGE_PLAYER_MY_GUILD_DATA = json["result_my_guild_data"];
          }
          if(isset(json["result_my_page_init"])){ //マイページの初期化が実行されたか
            if(json["result_my_page_init"] == 1){
              MYPAGE_SCENE_INIT = true;
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "myPage";
        this.exit("title");
      }
      NETWORK_IS_CONNECTING = false;
      RESULT_DATA = "";//通信結果を初期化
    }

    if(MYPAGE_AVATAR_DISP_FLAG == false && ASSET_LOADING == false && MYPAGE_SCENE_INIT == true){ //アバターアセットの表示が可能か。
      var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(MYPAGE_PLAYER_AVATAR_DATA,MYPAGE_PLAYER_EQUIP_ITEM_DISP);
      MYPAGE_PLAYER_AVATAR_SPRITE['type'] = 0; //0:equip 1:use
      var equipAvaSpr = G_AVATAR_DISP(getConvertAvatarData, "equip", "right", 0.5, 0.5, MYPAGE_PLAYER_AVATAR_DATA['visible_head_equip_item']);
      MYPAGE_PLAYER_AVATAR_SPRITE['equip'] = equipAvaSpr['sprites'][0];
      MYPAGE_PLAYER_AVATAR_SPRITE['equip'].addChildTo(MYPAGE_AVATAR_DISP_WINDOW); //アバターを表示
      MYPAGE_PLAYER_AVATAR_SPRITE['equip'].y = MYPAGE_PLAYER_AVATAR_SPRITE['equip'].y - MYPAGE_PLAYER_AVATAR_SPRITE['equip'].width;
      var useAvaSpr = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.5, 0.5, MYPAGE_PLAYER_AVATAR_DATA['visible_head_equip_item']);
      MYPAGE_PLAYER_AVATAR_SPRITE['use'] = useAvaSpr['sprites'][0];
      MYPAGE_PLAYER_AVATAR_SPRITE['use'].addChildTo(MYPAGE_AVATAR_DISP_WINDOW); //アバターを表示
      MYPAGE_PLAYER_AVATAR_SPRITE['use'].y = MYPAGE_PLAYER_AVATAR_SPRITE['use'].y - MYPAGE_PLAYER_AVATAR_SPRITE['use'].width;
      MYPAGE_PLAYER_AVATAR_SPRITE['use'].visible = false;
      MYPAGE_AVATAR_DISP_FLAG = true;
    }

    if(MYPAGE_USER_STATUS_CHECK == false && MYPAGE_SCENE_INIT == true){ //ステータス表示用ラベルにステータスを更新
      MYPAGE_USER_STATUS_CHECK = true;
      var dispPlayerInfo = new Object();//表示するテキストオブジェクトの配列
      if(isset(PLAYER_MASTER["player_name"])){
        dispPlayerInfo["名前："] = PLAYER_MASTER["player_name"];
      }
      if(isset(MYPAGE_PLAYER_CLASS_DATA["class_name"])){
        dispPlayerInfo["クラス："] = MYPAGE_PLAYER_CLASS_DATA["class_name"];
      }
      if(isset(PLAYER_INFO["player_level"])){
        dispPlayerInfo["レベル："] = PLAYER_INFO["player_level"];
      }
      if(isset(PLAYER_INFO["player_exp"]) && isset(MYPAGE_PLAYER_LEVEL_STAGE_DATA["level_up_exp"])){
        dispPlayerInfo["経験値："] = PLAYER_INFO["player_exp"] + "/" + MYPAGE_PLAYER_LEVEL_STAGE_DATA["level_up_exp"];
      }
      if(isset(PLAYER_INFO["player_karma"])){
        dispPlayerInfo["カルマ："] = G_HELPER_GET_PLAYER_KARMA_NAME(PLAYER_INFO["player_karma"]);
      }
      if(!Array.isArray(MYPAGE_PLAYER_EQUIP_ITEM_DISP)) MYPAGE_PLAYER_EQUIP_ITEM_DISP = new Array();
      if(Array.isArray(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS)){
        for(var i=0; i < MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS.length; i++){
          //アバターカテゴリーは表示しない
          if(100 <= MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['id']) break;
          var equipCategoryFlag = false;
          var keyName = MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['equip_name'] + ":";
          for (key in MYPAGE_PLAYER_EQUIP_ITEM_DISP) {
            if(isset(MYPAGE_PLAYER_EQUIP_ITEM_DISP[key]['item_name']) && isset(MYPAGE_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id'])){
              if(MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS[i]['id'] == MYPAGE_PLAYER_EQUIP_ITEM_DISP[key]['equip_category_id']){
                dispPlayerInfo[keyName] = MYPAGE_PLAYER_EQUIP_ITEM_DISP[key]['item_name'];
                equipCategoryFlag = true;
              }
            }
          }
          if(equipCategoryFlag == false){ //何も装備されていなかった場合
            dispPlayerInfo[keyName] = "なし";
          }
        }
      }
      if(MYPAGE_USER_INFO_DISP != null){ //最終的にユーザーステータスをまとめて表示
        Object.keys(dispPlayerInfo).forEach(function (key) {
          MYPAGE_USER_INFO_DISP.text = (MYPAGE_USER_INFO_DISP.text + "\n") + (key + dispPlayerInfo[key]);
        });
      }

      //各ステータスの表示
      var dispPlayerStatus = G_GET_PLAYER_STATUS_OBJ(PLAYER_STATUS,MYPAGE_PLAYER_STAMINA_DATA,MYPAGE_PLAYER_VITALITY_DATA);
      //var statusImage = null;
      var loop = 0;
      var tmpStatusImage = null;
      Object.keys(dispPlayerStatus).forEach(function (key) {
        //console.log(key + "は" + obj[key] + "と鳴いた！");
        //var statusImage = MYPAGE_STATUS_SPRITE;//スプライトをコピー
        if(loop < 5){
          if(loop == 0){
            MYPAGE_STATUS_SPRITE[loop].x = (0 + MYPAGE_STATUS_SPRITE[loop].width) - (MYPAGE_STATUS_SPRITE[loop].width / 2);
            MYPAGE_STATUS_SPRITE[loop].y = MYPAGE_SCREEN_SENTER_Y * 1.4;

            MYPAGE_STATUS_VAL_SPRITE[loop].x = (0 + MYPAGE_STATUS_VAL_SPRITE[loop].width) - (MYPAGE_STATUS_VAL_SPRITE[loop].width / 2);
            MYPAGE_STATUS_VAL_SPRITE[loop].y = MYPAGE_SCREEN_SENTER_Y * 1.5;
          }
          else{
            MYPAGE_STATUS_SPRITE[loop].x = (MYPAGE_STATUS_SPRITE[loop - 1].x + MYPAGE_STATUS_SPRITE[loop].width);
            MYPAGE_STATUS_SPRITE[loop].y = MYPAGE_STATUS_SPRITE[loop - 1].y;

            MYPAGE_STATUS_VAL_SPRITE[loop].x = (MYPAGE_STATUS_VAL_SPRITE[loop - 1].x + MYPAGE_STATUS_VAL_SPRITE[loop].width);
            MYPAGE_STATUS_VAL_SPRITE[loop].y = MYPAGE_STATUS_VAL_SPRITE[loop - 1].y;
          }
        }
        else{
          if(loop == 5){
            MYPAGE_STATUS_SPRITE[loop].x = (0 + MYPAGE_STATUS_SPRITE[loop].width) - (MYPAGE_STATUS_SPRITE[loop].width / 2);
            MYPAGE_STATUS_SPRITE[loop].y = MYPAGE_SCREEN_SENTER_Y * 1.6;

            MYPAGE_STATUS_VAL_SPRITE[loop].x = (0 + MYPAGE_STATUS_VAL_SPRITE[loop].width) - (MYPAGE_STATUS_VAL_SPRITE[loop].width / 2);
            MYPAGE_STATUS_VAL_SPRITE[loop].y = MYPAGE_SCREEN_SENTER_Y * 1.7;
          }
          else{
            MYPAGE_STATUS_SPRITE[loop].x = (MYPAGE_STATUS_SPRITE[loop - 1].x + MYPAGE_STATUS_SPRITE[loop].width);
            MYPAGE_STATUS_SPRITE[loop].y = MYPAGE_STATUS_SPRITE[loop - 1].y;

            MYPAGE_STATUS_VAL_SPRITE[loop].x = (MYPAGE_STATUS_VAL_SPRITE[loop - 1].x + MYPAGE_STATUS_VAL_SPRITE[loop].width);
            MYPAGE_STATUS_VAL_SPRITE[loop].y = MYPAGE_STATUS_VAL_SPRITE[loop - 1].y;
          }
        }
        MYPAGE_STATUS_LABELS[loop].text = key;
        MYPAGE_STATUS_VAL_LABELS[loop].text = dispPlayerStatus[key];
        loop = loop + 1;
      });
      //生命力ペナルティーの場合、ラベルの色を変更
      if(MYPAGE_PLAYER_VITALITY_PENALTY == "1"){
        for (var i = 0; i < 10; i++) {
          MYPAGE_STATUS_VAL_LABELS[i].fill = 'blue';
        }
      }
      //エリア名ラベルを更新
      if(MYPAGE_MENU_BUTTON_LABEL[2] != null){
        MYPAGE_MENU_BUTTON_LABEL[2].text = MYPAGE_PLAYER_AREA_MASTER_DATA['area_name'] + "に移動";
      }
    }
    if(MYPAGE_MENU_BUTTON_NUMBER != 0){//メニューボタンが押された場合
      switch (MYPAGE_MENU_BUTTON_NUMBER) {
        case 1:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("story");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 2:
        {
          if(MYPAGE_PLAYER_AREA_MASTER_DATA != null){
            NETWORK_IS_CONNECTING = true;
            var postParamVal = new Object();
            postParamVal['area_move_check'] = 0; //エリア移動チェック
            postParamVal['player_area_instance'] = new Object();
            postParamVal['player_area_instance'] = MYPAGE_PLAYER_AREA_MASTER_DATA;
            console.log(postParamVal['player_area_instance']);
            ajaxStart("post","json","../../client/myPage/myPage.php",postParamVal); //非同期通信開始
          }
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 3:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("itemBox");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 4:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("shopTop");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 5:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("worldMap");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 6:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("party");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 7:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("friend");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 8:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          if(PLAYER_INFO['player_guild_index_id'] != 0 && MYPAGE_PLAYER_MY_GUILD_DATA != null){
            if(MYPAGE_PLAYER_MY_GUILD_DATA != null){
              AREA_MODE = 2; //ギルド共有エリアに設定
              this.exit("map",{go_to_guild_home: MYPAGE_PLAYER_MY_GUILD_DATA['guild_id']});
            }
          }
          else{ //ギルド未加入の場合はギルドサーチ画面に飛ばす
            this.exit("guildSearch");
          }
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 9:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          this.exit("eventTop");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
        break;
        case 10:
        {
          SCENE_MANAGER['prev_scene'] = "myPage";
          //テストデータ作成
          //PLAYER_BATTLE_INSTANCE = new Object();
          //PLAYER_BATTLE_INSTANCE['back_ground_asset_id'] = 132;
          //PLAYER_BATTLE_INSTANCE['team_1_creature_type'] = 1;
          //PLAYER_BATTLE_INSTANCE['team_1_party_id'] = 1;
          this.exit("testRoom");
          MYPAGE_MENU_BUTTON_NUMBER = 0;
        }
          break;
        default:
          break;
      }
    }
    //ストーリー情報があった場合
    if(STORY_START_STORY_CATEGORY_ID != 0 && STORY_SELECT_MAIN_STORY_HASH != null && MYPAGE_STORY_SCHENE_CHANGE == true){
      MYPAGE_STORY_SCHENE_CHANGE = false;
      switch (STORY_START_STORY_CATEGORY_ID) {
        case "1":
        SCENE_MANAGER['prev_scene'] = "myPage";
        this.exit("comm");
          break;
        case "2":
        SCENE_MANAGER['prev_scene'] = "myPage";
        this.exit("map");
          break;
        case "3":
          break;
        default:
        console.log("カテゴリーが見つからなかった");
          break;
      }
    }
  },
});
