//============================================
//  隊形変更シーン
//============================================
//パブリック変数定義
var FORMATION_FORMATION_SCENE_BASE = null; //最下層レイヤー
var FORMATION_FORMATION_SCENE_UI_LAYER = null; //UI用レイヤー
var FORMATION_SCENE_CHANGE_ANIM_STEP = -1; //シーン開始切り替え演出
var FORMATION_FORMATION_SCENE_BATTLE_LAYER = null; //戦闘シーン用レイヤー
var FORMATION_FORMATION_SCENE_LIST_LAYER = null; //隊形リスト用レイヤー
var FORMATION_FORMATION_SCENE_CHARA_LAYER = null; //キャラクター表示レイヤー
var FORMATION_BATTLE_SCREEN_BACK_GROUND = null; //戦闘画面の背景
var FORMATION_SCENE_INIT_FLAG = false; //シーン通信初期化完了フラグ
var FORMATION_RESULT_FORMATION_DATAS = null; //使用可能な隊形データの通信結果
var FORMATION_LIST_DATAS = new Array(); //隊形リストのデータ配列
var FORMATION_PARTY_MEMBER_MAX_COUNT = 5; //パーティに参加出来る最大人数(固定)
var FORMATION_PLAYER_POS_ARRAY = new Array(); //プレイヤー達が表示される座標ノード
var FORMATION_RESULT_MY_PARTY_FORMATION_DATA = null; //自分のパーティに設定sれている隊形情報を取得
var FORMATION_PARTY_AVATAR_DATAS = null; //パーティメンバーのアバター情報を取得
var FORMATION_PARTY_MEMBER_DATAS = null; //パーティメンバーのデータを取得
var FORMATION_AVATARS = new Array(); //アバター本体
var FORMATION_SELECT_FORMATION_ID = -1; //選択中の隊形ID
var FORMATION_BEFOR_PARTY_MEMBER_DATAS = null; //更新前のプレイヤーメンバーデータ
var FORMATION_BEFOR_MY_PARTY_FORMATION_DATA = null; //更新前のパーティの情報
var FORMATION_LIST_START_TAP_POS_X = 0; //最初にタップしたボタンのX座標
var FORMATION_LIST_START_TAP_POS_Y = 0; //最初にタップしたボタンのY座標
var FORMATION_AVATAR_MOVE_ANIM_FLAG = false; //アバターが移動中か
var FORMATION_SCENE_END_FLAG = false; //シーン終了判定
var FORMATION_DRAG_TARGET_ICONS = new Array(); //ドラッグ可能位置を指定するマーカー配列
var FORMATION_DRAG_TARGET_ANIM_FLAG = false; //ターゲットアニメーションが有効か
var FORMATION_DRAG_TARGET_ANIM_FRAME_COUNT = 0; //ターゲットアニメーションフレームカウント用
var FORMATION_DRAG_TARGET_ANIM_FRAME_DELTA = 100; //ターゲットアニメーションのフレーム切替速度
var FORMATION_DRAG_BUTTONS = new Array(); //ドラッグ用タッチボタン
var FORMATION_DRAG_SELECT_INDEX = -1; //ドラッグ選択中のindex
var FORMATION_WINDOW_LAYER = null; //隊形のウィンドウ表示レイヤー
var FORMATION_BACK_BTN = null; //戻るボタン
var FORMATION_DECISION_BTN = null; //決定ボタン
var FORMATION_COMMENT_LABEL = null; //隊形コメント表示領域
var FORMATION_LIST_CELL_ANIM_FRAME_COUNT = 0; //リストセルの明滅アニメーションフレームカウント
var FORMATION_POSITION_CHANGE_BTN = null; //配置変更ボタン

phina.define("Formation", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "formation";
    //メンバー初期化
    FORMATION_FORMATION_SCENE_BASE = null; //最下層レイヤー
    FORMATION_FORMATION_SCENE_UI_LAYER = null; //UI用レイヤー
    FORMATION_SCENE_CHANGE_ANIM_STEP = -1; //シーン開始切り替え演出
    FORMATION_FORMATION_SCENE_BATTLE_LAYER = null; //戦闘シーン用レイヤー
    FORMATION_FORMATION_SCENE_CHARA_LAYER = null; //キャラクター表示レイヤー
    FORMATION_BATTLE_SCREEN_BACK_GROUND = null; //戦闘画面の背景
    FORMATION_SCENE_INIT_FLAG = false; //シーン通信初期化完了フラグ
    FORMATION_RESULT_FORMATION_DATAS = null; //使用可能な隊形データの通信結果
    FORMATION_LIST_DATAS = new Array(); //隊形リストのデータ配列
    FORMATION_PARTY_MEMBER_MAX_COUNT = 5; //パーティに参加出来る最大人数(固定)
    FORMATION_PLAYER_POS_ARRAY = new Array(); //プレイヤー達が表示される座標ノード
    FORMATION_RESULT_MY_PARTY_FORMATION_DATA = null; //自分のパーティに設定sれている隊形情報を取得
    FORMATION_PARTY_AVATAR_DATAS = null; //パーティメンバーのアバター情報を取得
    FORMATION_PARTY_MEMBER_DATAS = null; //パーティメンバーのデータを取得
    FORMATION_AVATARS = new Array(); //アバター本体
    FORMATION_SELECT_FORMATION_ID = -1; //選択中の隊形ID
    FORMATION_BEFOR_PARTY_MEMBER_DATAS = null; //更新前のプレイヤーメンバーデータ
    FORMATION_BEFOR_MY_PARTY_FORMATION_DATA = null; //更新前のパーティの情報
    FORMATION_LIST_START_TAP_POS_X = 0; //最初にタップしたボタンのX座標
    FORMATION_LIST_START_TAP_POS_Y = 0; //最初にタップしたボタンのY座標
    FORMATION_AVATAR_MOVE_ANIM_FLAG = false; //アバターが移動中か
    FORMATION_SCENE_END_FLAG = false; //シーン終了判定
    FORMATION_DRAG_TARGET_ICONS = new Array(); //ドラッグ可能位置を指定するマーカー配列
    FORMATION_DRAG_TARGET_ANIM_FLAG = false; //ターゲットアニメーションが有効か
    FORMATION_DRAG_TARGET_ANIM_FRAME_COUNT = 0; //アニメーションフレームカウント用
    FORMATION_DRAG_TARGET_ANIM_FRAME_DELTA = 100; //ターゲットアニメーションのフレーム切替速度
    FORMATION_DRAG_BUTTONS = new Array(); //ドラッグ用タッチボタン
    FORMATION_DRAG_SELECT_INDEX = -1; //ドラッグ選択中のindex
    FORMATION_WINDOW_LAYER = null; //隊形のウィンドウ表示レイヤー
    FORMATION_BACK_BTN = null; //戻るボタン
    FORMATION_DECISION_BTN = null; //決定ボタン
    FORMATION_COMMENT_LABEL = null; //隊形コメント表示領域
    FORMATION_LIST_CELL_ANIM_FRAME_COUNT = 0; //リストセルの明滅アニメーションフレームカウント
    FORMATION_POSITION_CHANGE_BTN = null; //配置変更ボタン

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';

    FORMATION_FORMATION_SCENE_BASE = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    FORMATION_FORMATION_SCENE_LIST_LAYER = PlainElement({ //シーンの隊形リスト用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(FORMATION_FORMATION_SCENE_BASE);
    FORMATION_FORMATION_SCENE_LIST_LAYER.y = FORMATION_FORMATION_SCENE_LIST_LAYER.y + (SCREEN_HEIGHT / 3);
    //var testObj = Sprite('ASSET_79').addChildTo(FORMATION_FORMATION_SCENE_LIST_LAYER);

    FORMATION_FORMATION_SCENE_BATTLE_LAYER = PlainElement({ //シーンの戦闘用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(FORMATION_FORMATION_SCENE_BASE);
    FORMATION_FORMATION_SCENE_BATTLE_LAYER.y = FORMATION_FORMATION_SCENE_BATTLE_LAYER.y - (SCREEN_HEIGHT / 6);

    FORMATION_FORMATION_SCENE_CHARA_LAYER = PlainElement({ //シーンのキャラクター表示レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(FORMATION_FORMATION_SCENE_BASE);

    FORMATION_BATTLE_SCREEN_BACK_GROUND = Sprite('ASSET_132').addChildTo(FORMATION_FORMATION_SCENE_BATTLE_LAYER); //戦闘用背景を表示
    FORMATION_FORMATION_SCENE_UI_LAYER = PlainElement({ //シーンのUI用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(FORMATION_FORMATION_SCENE_BASE);

    //キャラクター表示用ノードを生成
    for (var plPos = 0; plPos < FORMATION_PARTY_MEMBER_MAX_COUNT; plPos++) {
      FORMATION_PLAYER_POS_ARRAY[plPos] = PlainElement({ //シーンのUI用レイヤー生成
      }).addChildTo(FORMATION_FORMATION_SCENE_CHARA_LAYER);
    }
    //ドラッグ範囲指定アイコンを生成
    for (var i = 0; i < FORMATION_PARTY_MEMBER_MAX_COUNT; i++) {
      FORMATION_DRAG_TARGET_ICONS[i] = Sprite('ASSET_118',64,64).addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
      FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index'] = 0;
      FORMATION_DRAG_TARGET_ICONS[i]['end_frame_index'] = 8;
      FORMATION_DRAG_TARGET_ICONS[i].setScale(2.0,2.0);
      FORMATION_DRAG_TARGET_ICONS[i].setFrameIndex(0);
      FORMATION_DRAG_TARGET_ICONS[i].visible = false;
    }
    //ドラッグ用ボタン
    for (var i = 0; i < FORMATION_PARTY_MEMBER_MAX_COUNT; i++) {
      FORMATION_DRAG_BUTTONS[i] = Button({
        width: 60,
        height: 60,
      }).addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
      FORMATION_DRAG_BUTTONS[i]['btn_index'] = i;
      FORMATION_DRAG_BUTTONS[i]['befor_avatar_pos_x'] = 0;
      FORMATION_DRAG_BUTTONS[i]['befor_avatar_pos_y'] = 0;
      FORMATION_DRAG_BUTTONS[i].onpointstart = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
          if(FORMATION_PARTY_MEMBER_DATAS.length < (this['btn_index'] + 1)) return;
          this['befor_avatar_pos_x'] = FORMATION_AVATARS[this['btn_index']]['avatar'].x;
          this['befor_avatar_pos_y'] = FORMATION_AVATARS[this['btn_index']]['avatar'].y;
          for(var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++){
            if(i != this['btn_index']){
              FORMATION_AVATARS[i]['avatar'].alpha = 0.25; //アバターを半透明に
            }
          }
          FORMATION_DRAG_SELECT_INDEX = this['btn_index']; //indexを指定
          FORMATION_DRAG_TARGET_ANIM_FLAG = true; //ターゲットの表示を開始
        }
      };
      FORMATION_DRAG_BUTTONS[i].onpointmove = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
          if(FORMATION_PARTY_MEMBER_DATAS.length < (this['btn_index'] + 1)) return;
          FORMATION_AVATARS[this['btn_index']]['avatar'].x = e.pointer.x - (FORMATION_PLAYER_POS_ARRAY[this['btn_index']].x + (FORMATION_AVATARS[this['btn_index']]['avatar'].width * 1.25));
          FORMATION_AVATARS[this['btn_index']]['avatar'].y = e.pointer.y - (FORMATION_PLAYER_POS_ARRAY[this['btn_index']].y + (FORMATION_AVATARS[this['btn_index']]['avatar'].height * 2.25));
        }
      };
      FORMATION_DRAG_BUTTONS[i].onpointend = function(e){
        if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
          if(FORMATION_PARTY_MEMBER_DATAS.length < (this['btn_index'] + 1)) return;
          var resultPosIndex = -1;
          if(!FORMATION_DRAG_BUTTONS[this['btn_index']].hitTest(e.pointer.x,e.pointer.y)){
            for(var b = 0; b < FORMATION_PARTY_MEMBER_MAX_COUNT; b++){
              if(FORMATION_DRAG_BUTTONS[b].hitTest(e.pointer.x,e.pointer.y)){
                resultPosIndex = b;
                break;
              }
            }
          }
          if(resultPosIndex != -1){ //変更対象のポジションインデックスが存在した。
            var changeResultPosPlayerIndexId = -1;
            var changeBtnIndexPlayerIndexId = -1;
            for (var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++) {
              if(FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'] == resultPosIndex){
                changeResultPosPlayerIndexId = FORMATION_PARTY_MEMBER_DATAS[i]['player_index_id'];
              }
              if(FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'] == this['btn_index']){
                changeBtnIndexPlayerIndexId = FORMATION_PARTY_MEMBER_DATAS[i]['player_index_id'];
              }
            }
            //入れ替え対象が正常な場合
            if(changeResultPosPlayerIndexId != -1 && changeBtnIndexPlayerIndexId != -1 && changeResultPosPlayerIndexId != changeBtnIndexPlayerIndexId){
              var changeBtnPlayerData = null;
              var changeResultPlayerData = null;
              var tmpChangeBtnPlayerPos = null;
              var tmpChangeResultPlayerPos = null;
              for (var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++) {
                if(i == resultPosIndex) changeBtnPlayerData = FORMATION_PARTY_MEMBER_DATAS[i];
                if(i == this['btn_index']) changeResultPlayerData = FORMATION_PARTY_MEMBER_DATAS[i];
              }
              if(changeBtnPlayerData != null && changeResultPlayerData != null){
                tmpChangeBtnPlayerPos = changeBtnPlayerData['player_pos_index'];
                tmpChangeResultPlayerPos = changeResultPlayerData['player_pos_index'];
                FORMATION_PARTY_MEMBER_DATAS[resultPosIndex] = changeResultPlayerData;
                FORMATION_PARTY_MEMBER_DATAS[this['btn_index']] = changeBtnPlayerData;
                FORMATION_PARTY_MEMBER_DATAS[resultPosIndex]['player_pos_index'] = tmpChangeBtnPlayerPos;
                FORMATION_PARTY_MEMBER_DATAS[this['btn_index']]['player_pos_index'] = tmpChangeResultPlayerPos;
                for (var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++) {
                  if(i == resultPosIndex){
                    for (var ava = 0; ava < FORMATION_PARTY_AVATAR_DATAS.length; ava++) {
                      if(FORMATION_PARTY_AVATAR_DATAS[ava]['avatar_master_data']['id'] == FORMATION_PARTY_MEMBER_DATAS[i]['player_avatar_id']){
                        var avatarData = FORMATION_PARTY_AVATAR_DATAS[ava];
                        var resultAnimData = null;
                        for (var ad = 0; ad < avatarData['avatar_anim_datas'].length; ad++) {
                          if(avatarData['avatar_anim_datas'][ad]['anim_category_id'] == 1){
                            resultAnimData = avatarData['avatar_anim_datas'][ad];
                            break;
                          }
                        }
                        FORMATION_AVATARS[i]['avatar_anim_datas'] = avatarData['avatar_anim_datas'];
                        FORMATION_AVATARS[i]['avatar_reflect'] = false;
                        FORMATION_AVATARS[i]['avatar_index'] = i;
                        FORMATION_AVATARS[i]['avatar'].remove();
                        FORMATION_AVATARS[i]['avatar'] = G_AVATAR_ANIM_DISP(avatarData['avatar_master_data'],resultAnimData,1);
                        if(FORMATION_AVATARS[i]['avatar'] != null) {
                          FORMATION_AVATARS[i]['avatar'].addChildTo(FORMATION_AVATARS[i]);
                        }
                      }
                    }
                  }
                  if(i == this['btn_index']){
                    for (var ava = 0; ava < FORMATION_PARTY_AVATAR_DATAS.length; ava++) {
                      if(FORMATION_PARTY_AVATAR_DATAS[ava]['avatar_master_data']['id'] == FORMATION_PARTY_MEMBER_DATAS[i]['player_avatar_id']){
                        var avatarData = FORMATION_PARTY_AVATAR_DATAS[ava];
                        var resultAnimData = null;
                        for (var ad = 0; ad < avatarData['avatar_anim_datas'].length; ad++) {
                          if(avatarData['avatar_anim_datas'][ad]['anim_category_id'] == 1){
                            resultAnimData = avatarData['avatar_anim_datas'][ad];
                            break;
                          }
                        }
                        FORMATION_AVATARS[i]['avatar_anim_datas'] = avatarData['avatar_anim_datas'];
                        FORMATION_AVATARS[i]['avatar_reflect'] = false;
                        FORMATION_AVATARS[i]['avatar_index'] = i;
                        FORMATION_AVATARS[i]['avatar'].remove();
                        FORMATION_AVATARS[i]['avatar'] = G_AVATAR_ANIM_DISP(avatarData['avatar_master_data'],resultAnimData,1);
                        if(FORMATION_AVATARS[i]['avatar'] != null) {
                          FORMATION_AVATARS[i]['avatar'].addChildTo(FORMATION_AVATARS[i]);
                        }
                      }
                    }
                  }
                }
              }
            }
          }
          else{ //変更対象のポジションは存在しなかった。

          }
          for(var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++){
            FORMATION_AVATARS[i]['avatar'].alpha = 1; //アバターの透明度を元に戻す
          }
          FORMATION_DRAG_TARGET_ANIM_FLAG = false;
          FORMATION_DRAG_SELECT_INDEX = -1;
          FORMATION_AVATARS[this['btn_index']]['avatar'].x = this['befor_avatar_pos_x'];
          FORMATION_AVATARS[this['btn_index']]['avatar'].y = this['befor_avatar_pos_y'];
        }
      };
      FORMATION_DRAG_BUTTONS[i].visible = false;
    }

    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
    headerSptite.y = headerSptite.y - ((SCREEN_HEIGHT / 2) - (headerSptite.height / 2));
    Label({
      text: '隊形変更',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    //隊形コメント表示ラベル
    FORMATION_COMMENT_LABEL = LabelArea({
      text: "",
      height: 120,
      width: 512,
      fontSize: 24,
      fill: 'black',
      align: 'left',
      baseline: 'top',
    }).addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
    FORMATION_COMMENT_LABEL.y = headerSptite.y + (headerSptite.height * 1.75);

    //戻るボタン
    FORMATION_BACK_BTN = Sprite('ASSET_79').addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
    FORMATION_BACK_BTN.x = FORMATION_BACK_BTN.x + ((SCREEN_WIDTH / 2) - (FORMATION_BACK_BTN.width / 2));
    FORMATION_BACK_BTN.y = FORMATION_BACK_BTN.y + (FORMATION_BACK_BTN.height * 2);
    FORMATION_BACK_BTN['label'] = Label({
      text: "戻る",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FORMATION_BACK_BTN);
    FORMATION_BACK_BTN['button'] = Button({
      width: 160,
      height: 64,
    }).addChildTo(FORMATION_BACK_BTN);
    FORMATION_BACK_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
        FORMATION_SCENE_END_FLAG = true;
      }
    };
    FORMATION_BACK_BTN['button'].visible = false;

    //決定ボタン
    FORMATION_DECISION_BTN = Sprite('ASSET_79').addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
    FORMATION_DECISION_BTN.y = FORMATION_BACK_BTN.y;
    FORMATION_DECISION_BTN.x = FORMATION_BACK_BTN.x;
    FORMATION_DECISION_BTN.x = FORMATION_DECISION_BTN.x - FORMATION_DECISION_BTN.width;
    FORMATION_DECISION_BTN['label'] = Label({
      text: "決定",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FORMATION_DECISION_BTN);
    FORMATION_DECISION_BTN['button'] = Button({
      width: 160,
      height: 64,
    }).addChildTo(FORMATION_DECISION_BTN);
    FORMATION_DECISION_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
        var updateFormationData = null;
        var updatePartyMemberData = new Array();
        var updateFlag = false;
        if(FORMATION_BEFOR_MY_PARTY_FORMATION_DATA['party_formation_id'] != FORMATION_RESULT_MY_PARTY_FORMATION_DATA['party_formation_id']){
          updateFlag = true;
          updateFormationData = FORMATION_RESULT_MY_PARTY_FORMATION_DATA;
        }
        for (var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++) {
          if(FORMATION_PARTY_MEMBER_DATAS[i]['player_index_id'] != FORMATION_BEFOR_PARTY_MEMBER_DATAS[i]['player_index_id']){
            updateFlag = true;
            updatePartyMemberData[updatePartyMemberData.length] = FORMATION_PARTY_MEMBER_DATAS[i];
          }
        }
        if(updateFlag == true){ //更新対象のデータが存在した
          NETWORK_IS_CONNECTING = true;
          var postParam = new Object();
          if(updateFormationData != null){
            postParam['set_update_formation_data'] = updateFormationData;
          }
          if(updatePartyMemberData.length != 0){ //更新が発生した場合
            postParam['set_update_party_member_datas'] = FORMATION_PARTY_MEMBER_DATAS;
          }
          ajaxStart("post","json","../../client/formation/formation.php",postParam); //非同期通信開始
        }
        else{ //更新対象が存在しない
          G_NORMAL_WINDOW_CREATE(FORMATION_WINDOW_LAYER,"隊形の設定変更","隊形の設定を変更しました。",0,"resultFormationSettingWindowSuccess");
        }
      }
    };
    FORMATION_DECISION_BTN['button'].visible = false;
    //配置変更ボタンを表示
    FORMATION_POSITION_CHANGE_BTN = Sprite('ASSET_79').addChildTo(FORMATION_FORMATION_SCENE_UI_LAYER);
    FORMATION_POSITION_CHANGE_BTN.y = FORMATION_DECISION_BTN.y;
    FORMATION_POSITION_CHANGE_BTN.x = FORMATION_DECISION_BTN.x;
    FORMATION_POSITION_CHANGE_BTN.x = FORMATION_POSITION_CHANGE_BTN.x - FORMATION_POSITION_CHANGE_BTN.width;
    //配置変更ボタン(ラベル)
    FORMATION_POSITION_CHANGE_BTN['label'] = Label({
      text: "配置変更",
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FORMATION_POSITION_CHANGE_BTN);
    //配置変更ボタン(ボタン本体)
    FORMATION_POSITION_CHANGE_BTN['button'] = Button({
      width: 160,
      height: 64,
    }).addChildTo(FORMATION_POSITION_CHANGE_BTN);
    FORMATION_POSITION_CHANGE_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
        var contentsImg = Sprite('ASSET_111');
        contentsImg.setScale(0.75,0.75);
        G_NORMAL_WINDOW_640_640_CREATE(FORMATION_WINDOW_LAYER,"","キャラクター配置の入れ替えはキャラクターのドラッグ＆ドロップで行えます。",0,"testNormalWindow",contentsImg);
      }
    };
    FORMATION_POSITION_CHANGE_BTN['button'].visible = false;

    //ウィンドウ表示用レイヤー表示
    FORMATION_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

    G_DELETE_TARNS_SCREEN_ANIM();//シーン開始の演出アニメーションの削除
    G_CREATE_TRANS_SCREEN_ANIM(FORMATION_FORMATION_SCENE_UI_LAYER,1); //シーン開始の演出アニメーションを作成
    NETWORK_IS_CONNECTING = true;
    var postParam = new Object();
    postParam['formation_scene_init'] = 1;
    ajaxStart("post","json","../../client/formation/formation.php",postParam); //非同期通信開始
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
          if(isset(json["result_formation_datas"])){
            FORMATION_RESULT_FORMATION_DATAS = json["result_formation_datas"]; //使用可能な隊形データを取得
          }
          if(isset(json["result_my_party_formation_data"])){
            FORMATION_RESULT_MY_PARTY_FORMATION_DATA = json["result_my_party_formation_data"]; //パーティに設定されている隊形データを取得
            FORMATION_BEFOR_MY_PARTY_FORMATION_DATA = JSON.stringify(FORMATION_RESULT_MY_PARTY_FORMATION_DATA); // JSON文字列化
            FORMATION_BEFOR_MY_PARTY_FORMATION_DATA = JSON.parse(FORMATION_BEFOR_MY_PARTY_FORMATION_DATA); // JSON文字列化したものを戻す
            if(isset(FORMATION_RESULT_MY_PARTY_FORMATION_DATA['party_formation_id'])){
              FORMATION_SELECT_FORMATION_ID = FORMATION_RESULT_MY_PARTY_FORMATION_DATA['party_formation_id']; //選択中の隊形IDを更新
              //選択中の隊形説明を更新
              FORMATION_COMMENT_LABEL.text = FORMATION_RESULT_MY_PARTY_FORMATION_DATA['formation_name'] + ":" + FORMATION_RESULT_MY_PARTY_FORMATION_DATA['formation_comment'];
            }
          }
          if(isset(json["avatar_datas"])){
            FORMATION_PARTY_AVATAR_DATAS = json["avatar_datas"]; //パーティメンバーが使用しているアバターデータを取得
          }
          if(isset(json["result_party_member_datas"])){
            FORMATION_PARTY_MEMBER_DATAS = json["result_party_member_datas"]; //パーティメンバーデータを取得
            FORMATION_BEFOR_PARTY_MEMBER_DATAS = JSON.stringify(FORMATION_PARTY_MEMBER_DATAS); // JSON文字列化
            FORMATION_BEFOR_PARTY_MEMBER_DATAS = JSON.parse(FORMATION_BEFOR_PARTY_MEMBER_DATAS); // JSON文字列化したものを戻す
          }
          if(isset(json["result_update_formation_setting"])){ //隊形の設定変更結果
            var resultSettingFormation = json["result_update_formation_setting"];
            if(isset(resultSettingFormation['error'])){
              if(resultSettingFormation['error'] != 0){ //エラーが発生した
                var errorText = "隊形の設定変更に失敗しました。\n■エラー内容\n" + resultSettingFormation['error_comment'];
                G_NORMAL_WINDOW_CREATE(FORMATION_WINDOW_LAYER,"隊形の設定変更",errorText,0,"resultFormationSettingWindowError");
              }
              else{ //正常終了
                G_NORMAL_WINDOW_CREATE(FORMATION_WINDOW_LAYER,"隊形の設定変更","隊形の設定を変更しました。",0,"resultFormationSettingWindowSuccess");
              }
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          this.exit("title");
          SCENE_MANAGER['prev_scene'] = "formation";
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        this.exit("title");
        SCENE_MANAGER['prev_scene'] = "formation";
      }
      RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    //シーン初期化チェック
    if(FORMATION_SCENE_INIT_FLAG == false && FORMATION_RESULT_FORMATION_DATAS != null && FORMATION_RESULT_MY_PARTY_FORMATION_DATA != null){
      FORMATION_SCENE_INIT_FLAG = true;
      if(FORMATION_SCENE_CHANGE_ANIM_STEP == -1){
        FORMATION_SCENE_CHANGE_ANIM_STEP = 1; //シーン開始演出開始
        G_FORMATION_CREATE_FORMATION_LIST(FORMATION_FORMATION_SCENE_LIST_LAYER,FORMATION_RESULT_FORMATION_DATAS); //隊形選択リストをを生成
        //プレイヤー達の初期位置を更新
        for (var plPos = 0; plPos < FORMATION_PARTY_MEMBER_MAX_COUNT; plPos++) {
          var getPos = null;
          getPos = G_FORMATION_GET_CHARACTER_POS(0,-200,plPos,FORMATION_RESULT_MY_PARTY_FORMATION_DATA,true);
          FORMATION_PLAYER_POS_ARRAY[plPos].x = getPos['pos_x'];
          FORMATION_PLAYER_POS_ARRAY[plPos].y = getPos['pos_y'];
          FORMATION_DRAG_TARGET_ICONS[plPos].x = FORMATION_PLAYER_POS_ARRAY[plPos].x;
          FORMATION_DRAG_TARGET_ICONS[plPos].y = (FORMATION_PLAYER_POS_ARRAY[plPos].y + FORMATION_DRAG_TARGET_ICONS[plPos].height);
          FORMATION_DRAG_BUTTONS[plPos].x = FORMATION_DRAG_TARGET_ICONS[plPos].x;
          FORMATION_DRAG_BUTTONS[plPos].y = FORMATION_DRAG_TARGET_ICONS[plPos].y;
        }
        //アバターを表示
        if(Array.isArray(FORMATION_PARTY_MEMBER_DATAS)){
          for(var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++){
            var posIndex = -1;
            var avatarData = null;
            if(Array.isArray(FORMATION_PARTY_AVATAR_DATAS)){
              for (var ava = 0; ava < FORMATION_PARTY_AVATAR_DATAS.length; ava++) {
                if(isset(FORMATION_PARTY_AVATAR_DATAS[ava]['avatar_master_data']['id'])){
                  if(FORMATION_PARTY_AVATAR_DATAS[ava]['avatar_master_data']['id'] == FORMATION_PARTY_MEMBER_DATAS[i]['player_avatar_id']){
                    avatarData = FORMATION_PARTY_AVATAR_DATAS[ava];
                  }
                }
              }
            }
            if(isset(FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'])) posIndex = FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'];
            if(posIndex != -1 && avatarData != null){
              FORMATION_AVATARS[i] = PlainElement({}).addChildTo(FORMATION_FORMATION_SCENE_CHARA_LAYER);
              FORMATION_AVATARS[i].x = FORMATION_PLAYER_POS_ARRAY[posIndex].x;
              FORMATION_AVATARS[i].y = FORMATION_PLAYER_POS_ARRAY[posIndex].y;
              FORMATION_AVATARS[i]['avatar_anim_datas'] = avatarData['avatar_anim_datas'];
              FORMATION_AVATARS[i]['avatar_reflect'] = false;
              FORMATION_AVATARS[i]['avatar_index'] = i;
              var resultAnimData = null;
              for (var ad = 0; ad < FORMATION_AVATARS[i]['avatar_anim_datas'].length; ad++) {
                if(FORMATION_AVATARS[i]['avatar_anim_datas'][ad]['anim_category_id'] == 1){
                  resultAnimData = FORMATION_AVATARS[i]['avatar_anim_datas'][ad];
                  break;
                }
              }
              if(resultAnimData != null){
                FORMATION_AVATARS[i]['avatar'] = G_AVATAR_ANIM_DISP(avatarData['avatar_master_data'],resultAnimData,1);
                if(FORMATION_AVATARS[i]['avatar'] != null) {
                  FORMATION_AVATARS[i]['avatar'].addChildTo(FORMATION_AVATARS[i]);
                }
              }
            }
          }
        }
        console.log("------");
        for (var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++) {
          console.log(FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index']);
        }
        console.log("------");
      }
    }
    //シーン切り替え(シーンスタート)演出
    if(FORMATION_SCENE_CHANGE_ANIM_STEP != -1){
      switch (parseInt(FORMATION_SCENE_CHANGE_ANIM_STEP)) {
        case 1:
        {
          var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(1);
          if(transAnimFlag == false){ //アニメ再生が完了した場合
            G_DELETE_TARNS_SCREEN_ANIM();
            FORMATION_SCENE_CHANGE_ANIM_STEP = 2; //待機
          }
        }
        break;
        case 2:
        break;
        default:
        break;
      }
    }
    //シーン終了判定
    if(FORMATION_SCENE_END_FLAG == true){
      FORMATION_SCENE_END_FLAG = false;
      //prev禁止
      this.exit("party");
    }
    //ターゲットマーカーのアニメーション制御
    if(FORMATION_DRAG_TARGET_ANIM_FLAG == true){
      FORMATION_DRAG_TARGET_ANIM_FRAME_COUNT += PHINA_APP.deltaTime;
      if(FORMATION_DRAG_TARGET_ANIM_FRAME_DELTA <= FORMATION_DRAG_TARGET_ANIM_FRAME_COUNT){
        FORMATION_DRAG_TARGET_ANIM_FRAME_COUNT = 0; //フレームカウントをリセット
        //ドラッグ範囲指定アイコンを生成
        for (var i = 0; i < FORMATION_PARTY_MEMBER_MAX_COUNT; i++) {
          if(FORMATION_DRAG_SELECT_INDEX == i) continue;
          if(FORMATION_DRAG_TARGET_ICONS[i].visible == false && i < FORMATION_PARTY_MEMBER_DATAS.length){
            FORMATION_DRAG_TARGET_ICONS[i].visible = true;
            FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index'] = 0;
            FORMATION_DRAG_TARGET_ICONS[i].setFrameIndex(0);
          }
          else{
            FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index'] = parseInt(FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index']) + 1;
            if(FORMATION_DRAG_TARGET_ICONS[i]['end_frame_index'] < FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index']){
              FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index'] = 0;
            }
            FORMATION_DRAG_TARGET_ICONS[i].setFrameIndex(FORMATION_DRAG_TARGET_ICONS[i]['now_frame_index']);
          }
        }
      }
    }
    else{ //マーカー非表示チェック
      for (var i = 0; i < FORMATION_PARTY_MEMBER_MAX_COUNT; i++) {
        if(isset(FORMATION_DRAG_TARGET_ICONS[i]) && FORMATION_DRAG_TARGET_ICONS[i].visible == true){ //非表示ではなかったら非表示に
          FORMATION_DRAG_TARGET_ICONS[i].visible = false;
        }
      }
    }
    //セルの明滅アニメーション
    if(FORMATION_SCENE_INIT_FLAG == true){
      FORMATION_LIST_CELL_ANIM_FRAME_COUNT += PHINA_APP.deltaTime;
      if(50 <= FORMATION_LIST_CELL_ANIM_FRAME_COUNT){
        FORMATION_LIST_CELL_ANIM_FRAME_COUNT = 0;
        for (var i = 0; i < FORMATION_LIST_DATAS.length; i++) {
          if(isset(FORMATION_LIST_DATAS[i]['button']['formation_id'])){
            if(FORMATION_LIST_DATAS[i]['button']['formation_id'] == FORMATION_SELECT_FORMATION_ID){
              if(FORMATION_LIST_DATAS[i]['alpha_switch'] == true){
                FORMATION_LIST_DATAS[i].alpha = FORMATION_LIST_DATAS[i].alpha + 0.05;
                if(1 <= FORMATION_LIST_DATAS[i].alpha){
                  FORMATION_LIST_DATAS[i].alpha = 1;
                  FORMATION_LIST_DATAS[i]['alpha_switch'] = false;
                }
              }
              else{
                FORMATION_LIST_DATAS[i].alpha = FORMATION_LIST_DATAS[i].alpha - 0.05;
                if(FORMATION_LIST_DATAS[i].alpha <= 0.5){
                  FORMATION_LIST_DATAS[i].alpha = 0.5;
                  FORMATION_LIST_DATAS[i]['alpha_switch'] = true;
                }
              }
            }
            else{
              if(FORMATION_LIST_DATAS[i].alpha != 1) FORMATION_LIST_DATAS[i].alpha = 1;
            }
          }
        }
      }
    }
  },
});

function G_FORMATION_CREATE_FORMATION_LIST(parentBase,formationData){ //隊形リストを表示する
  if(formationData == null || !Array.isArray(formationData) || formationData.length == 0) return;
  var listTouchObj = Button({
    width: 640,
    height: SCREEN_HEIGHT - SCREEN_WIDTH,
  }).addChildTo(parentBase);
  listTouchObj.visible = false;
  var listObj = PlainElement({
  }).addChildTo(parentBase);
  var listPosY = 0;
  var listHeightSize = 0;
  for (var i = 0; i < formationData.length; i++) {
    FORMATION_LIST_DATAS[i] = Sprite('ASSET_34').addChildTo(listObj); //リストセル背景を表示
    FORMATION_LIST_DATAS[i]['alpha_switch'] = false;
    if(i == 0) listPosY = FORMATION_LIST_DATAS[i].y - (((SCREEN_HEIGHT - FORMATION_BATTLE_SCREEN_BACK_GROUND.height) * 0.5) - (FORMATION_LIST_DATAS[i].height / 2));
    else listPosY = (listPosY + FORMATION_LIST_DATAS[i].height);
    listHeightSize = listHeightSize + FORMATION_LIST_DATAS[i].height;
    FORMATION_LIST_DATAS[i].y = listPosY;
    //隊形名表示
    FORMATION_LIST_DATAS[i]['text'] = Label({
      text: formationData[i]['formation_name'],
      fontSize: 24,
      fill: 'white',
    }).addChildTo(FORMATION_LIST_DATAS[i]);
    //ボタン本体
    FORMATION_LIST_DATAS[i]['button'] = Button({
      width: 640,
      height: 64,
    }).addChildTo(FORMATION_LIST_DATAS[i]);
    FORMATION_LIST_DATAS[i]['button'].onpointstart = function(e){
      FORMATION_LIST_START_TAP_POS_X = e.pointer.x;
      FORMATION_LIST_START_TAP_POS_Y = e.pointer.y;
    };
    FORMATION_LIST_DATAS[i]['button']['formation_id'] = formationData[i]['id'];
    FORMATION_LIST_DATAS[i]['button']['formation_name'] = formationData[i]['formation_name'];
    FORMATION_LIST_DATAS[i]['button']['formation_comment'] = formationData[i]['formation_comment']
    FORMATION_LIST_DATAS[i]['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(FORMATION_DECISION_BTN['button'].hitTest(e.pointer.x,e.pointer.y)) return;
      if(FORMATION_BACK_BTN['button'].hitTest(e.pointer.x,e.pointer.y)) return;
      if(FORMATION_LIST_START_TAP_POS_X != e.pointer.x || FORMATION_LIST_START_TAP_POS_Y != e.pointer.y) return;
      if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && FORMATION_AVATAR_MOVE_ANIM_FLAG == false){
        if(FORMATION_SELECT_FORMATION_ID != this['formation_id']){ //選択中の隊形IDと違った場合
          FORMATION_SELECT_FORMATION_ID = this['formation_id']; //選択中の隊形IDを設定
          FORMATION_COMMENT_LABEL.text = this['formation_name'] + ":" + this['formation_comment'];
          FORMATION_RESULT_MY_PARTY_FORMATION_DATA['party_formation_id'] = FORMATION_SELECT_FORMATION_ID;
          G_FORMATION_CHANGE_SELECT_FORMATION(FORMATION_SELECT_FORMATION_ID,FORMATION_RESULT_FORMATION_DATAS);
        }
      }
    };
    FORMATION_LIST_DATAS[i]['button'].visible = false;
  }
  var maxTopPos = 0;
  listTouchObj.onpointmove = function(e){
    var tmpObjPos = listObj.y;
    listObj.y += e.pointer.dy;
    //0以下にしてはいけない数値
    var maxBottomPos = (listObj.y + FORMATION_LIST_DATAS[FORMATION_LIST_DATAS.length - 1].y) - ((listTouchObj.height / 2) - (FORMATION_LIST_DATAS[FORMATION_LIST_DATAS.length - 1].height / 2));
    if(maxBottomPos < 0) listObj.y = tmpObjPos;
    if(0 < listObj.y) listObj.y = tmpObjPos;
  };
}

function G_FORMATION_GET_CHARACTER_POS(nodePosX,nodePosY,characterNo,formationData,playerOrEnemy){ //キャラクターの位置を取得 playerOrEnemy true:player false:enemy
  var resultPos = new Array();
  resultPos['pos_x'] = 0;
  resultPos['pos_y'] = 0;
  var posGrid = (SCREEN_WIDTH / 10);
  var posXList = new Array();
  if(playerOrEnemy == true){ //プレイヤー
    posXList[0] = nodePosX - (posGrid * 1.2);
    posXList[1] = nodePosX;
    posXList[2] = nodePosX + (posGrid * 1.2);
  }
  else{ //敵
    posXList[0] = nodePosX + (posGrid * 1.2);
    posXList[1] = nodePosX;
    posXList[2] = nodePosX - (posGrid * 1.2);
  }
  var posYList = new Array();
  posYList[0] = nodePosY - (posGrid * 2);
  posYList[1] = nodePosY - posGrid;
  posYList[2] = nodePosY;
  posYList[3] = nodePosY + posGrid;
  posYList[4] = nodePosY + (posGrid * 2);
  var formationPosXList = formationData['positions'].split(',');
  if(Array.isArray(formationPosXList)){
    for (var i = 0; i < formationPosXList.length; i++) {
      if(i == characterNo) {
        resultPos['pos_x'] = posXList[parseInt(formationPosXList[i])];
      }
    }
  }
  resultPos['pos_y'] = posYList[parseInt(characterNo)];
  return resultPos;
}

function G_FORMATION_CHANGE_SELECT_FORMATION(changeFormationId,formationDatas){ //隊形変更を開始する
  //選択中の隊形データを取得
  var selectFormationData = null;
  for (var i = 0; i < formationDatas.length; i++) {
    if(formationDatas[i]['id'] == changeFormationId){
      selectFormationData = formationDatas[i];
      break;
    }
  }
  if(selectFormationData != null){
    //プレイヤー達の移動位置を更新
    for (var plPos = 0; plPos < FORMATION_PARTY_MEMBER_MAX_COUNT; plPos++) {
      var getPos = null;
      getPos = G_FORMATION_GET_CHARACTER_POS(0,-200,plPos,selectFormationData,true);
      FORMATION_PLAYER_POS_ARRAY[plPos].x = getPos['pos_x'];
      FORMATION_PLAYER_POS_ARRAY[plPos].y = getPos['pos_y'];
      FORMATION_DRAG_TARGET_ICONS[plPos].x = FORMATION_PLAYER_POS_ARRAY[plPos].x;
      FORMATION_DRAG_TARGET_ICONS[plPos].y = (FORMATION_PLAYER_POS_ARRAY[plPos].y + FORMATION_DRAG_TARGET_ICONS[plPos].height);
      FORMATION_DRAG_BUTTONS[plPos].x = FORMATION_DRAG_TARGET_ICONS[plPos].x;
      FORMATION_DRAG_BUTTONS[plPos].y = FORMATION_DRAG_TARGET_ICONS[plPos].y;
    }
    //アバターの移動開始
    for(var i = 0; i < FORMATION_PARTY_MEMBER_DATAS.length; i++){
      var posIndex = -1;
      if(isset(FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'])) posIndex = FORMATION_PARTY_MEMBER_DATAS[i]['player_pos_index'];
      if(posIndex != -1){
        var newPosX = FORMATION_PLAYER_POS_ARRAY[posIndex].x;
        var newPosY = FORMATION_PLAYER_POS_ARRAY[posIndex].y;
        if(newPosX != FORMATION_AVATARS[i].x){
          var avatarAnimData = null;
          for(var ad = 0; ad < FORMATION_AVATARS[i]['avatar_anim_datas'].length; ad++){
            if(FORMATION_AVATARS[i]['avatar_anim_datas'][ad]['anim_category_id'] == 2){ //走り
              avatarAnimData = FORMATION_AVATARS[i]['avatar_anim_datas'][ad];
              break;
            }
          }
          if(avatarAnimData != null){
            //移動先が後ろの場合、アバターの向きを変転
            if(newPosX < FORMATION_AVATARS[i].x && FORMATION_AVATARS[i]['avatar_reflect'] == false) {
              FORMATION_AVATARS[i]['avatar'].scaleX *= -1;
              FORMATION_AVATARS[i]['avatar_reflect'] = true;
            }
            FORMATION_AVATARS[i]['avatar'].changeAnimData(avatarAnimData);
            FORMATION_AVATARS[i].tweener.moveTo(newPosX, newPosY, 1000).play();
            FORMATION_AVATAR_MOVE_ANIM_FLAG = true; //アニメーション中
            FORMATION_AVATARS[i].tweener.call(function(){
              if(this.target['avatar_reflect'] == true){ //反転していた場合元に戻す
                this.target['avatar'].scaleX *= -1;
                this.target['avatar_reflect'] = false;
              }
              for(var ad = 0; ad < this.target['avatar_anim_datas'].length; ad++){
                if(this.target['avatar_anim_datas'][ad]['anim_category_id'] == 1){ //立ち
                  this.target['avatar'].changeAnimData(this.target['avatar_anim_datas'][ad]); //立ちアニメーションに変更
                  break;
                }
              }
              FORMATION_AVATAR_MOVE_ANIM_FLAG = false; //アニメーション終了
            });
          }
        }
      }
    }
  }
}
