//============================================
//  シューティングゲームシーン
//============================================
//パブリック変数定義
var STG_SCENE_INSTANCE = null;//シューティングゲームのシーンインスタンス
var STG_SCENE_INIT_FLAG = 0; //初期化が完了したか。 0:初期化前 1:初期通信完了 2:初期化処理完了
var STG_SCENE_BASE = null; //シューティングシーンの親
var STG_WINDOW_LAYER = null; //シューティングシーンのウィンドウ表示レイヤー
var STG_OBJECT_LAYER = null; //STGオブジェクト表示レイヤー
var STG_BG_LAYER_1 = null; //STG背景表示レイヤー1
var STG_BG_LAYER_2 = null; //STG背景表示レイヤー2
var STG_ANIM_UI_LAYER = null; //UIアニメーション表示レイヤー
var STG_UI_LAYER = null; //UI表示レイヤー
var STG_PLAYER_AREA_INSTANCE = null; //プレイヤーのエリアインスタンス
var STG_PLAYER_MOUNT_DATA = null; //プレイヤーのマウントデータ
var STG_HEADER = null; //ヘッダー
var STG_CONTROLE_PANEL = null; //コントロールパネル
var STG_FIRE_BTN = null; //攻撃ボタン
var STG_BOMB_BTN = null; //爆弾ボタン
var STG_MY_HP_GAUGE = null; //自機の体力ゲージ
var STG_LEFT_BTN = null; //左ボタン
var STG_RIGHT_BTN = null; //右ボタン
var STG_BG_ASSET_ID_ARRAY = new Array(); //背景画像のアセットID配列
var STG_BG_SPRITE_LAYER_1 = null; //レイヤー1の背景セット
var STG_BG_SPRITE_LAYER_2 = null; //レイヤー2の背景セット
var STG_BG_ANIM_FRAME_COUNT = 0; //背景画像アニメーションのフレーム
var STG_BG_ANIM_SPEED = 0; //背景画像アニメーションのスピード
var STG_MY_SHIP = null; //実機
var STG_MASTER_DATA = null; //現在プレイ中のSTGマスターデータ
var STG_SET_ENEMY_MASTER_DATAS = new Array(); //敵機出現設定
var STG_ENEMY_MASTER_DATAS = new Array(); //使用する敵機マスターデータ
var STG_POP_ENEMY_SHIP_LIST = new Array(); //出現済みの敵機ユニークIDのリスト
var STG_TIME_DELTA = 0; //ステージ経過時間(delta)
var STG_TIME_SECOND = 0; //ステージ経過時間(秒)
var STG_ENEMY_SHIP_INSTANCE_ARRAY = new Array(); //出現した敵機情報格納配列
var STG_SCORE_LABEL = null; //スコア表示ラベル
var STG_STARGE_START_ANIM = null; //ステージ開始アニメーション実体
var STG_STAGE_LIMIT_TIME = 0; //残りステージ時間
var STG_STAGE_LIMIT_TIME_DELTA = 0; //残りステージ時間(delta)
var STG_STAGE_CLEAR_FLAG = false; //ステージをクリアしたか。
var STG_MAX_SCORE = 0; //最大スコア
var STG_DROP_DATAS = null; //ドロップアイテム配列
var STG_RESULT_WINDOW = null; //ステージ結果画面
var STG_CLEAR_STEP = 0; //クリア後の制御番号
var STG_RESULT_STG_CLEAR = null; //クリア結果のサーバーレスポンスデータ
var STG_STOP_STAGE_TIME = false; //tureの場合、ステージ進行時間を停止させる
var STG_MY_SHIP_CONTROLE_FLAG = true; //falseの場合、自機の操作を不能にする
var STG_GAME_OVER_FLAG = false; //trueの場合、ゲームオーバー状態
var STG_MOUNT_BOMB_MASTER_DATA = null; //マウントに装備されているボムマスターデータ
var STG_PVP_MATCHING_DATA = null; //PVPのマッチングが成立した場合、格納される変数
var STG_PVP_FLAG = false; //PVP中であるか。
var STG_SCHECK_BOX = null; //敵機確認用当たり判定BOX
var STG_START_ANIM_VISIBLE = false; //スタートアニメーション再生中か
var STG_CHECK_AREA_ENEMY = false; //ゲーム画面内に敵が居るか、居ないか
var STG_PVP_START_TIME = 0; //PVP開始時間
var STG_PVP_STEP = 0; //PVPシーンのステップ
var STG_ENEMY_PLAYER_SHIP = null; //敵プレイヤーの自機
var STG_ESCAPE_GAUGE = null; //回避ゲージ
var STG_PVP_ROTATION = 0; //0:敵プレイヤー攻撃 1:プレイヤー攻撃
var STG_PVP_ENEMY_PLAYER_WIN = null; //敵プレイヤー勝利データ
var STG_PVP_CLEAR = false; //PVPをクリアしたか。

phina.define("ShootingGame", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "shootingGame";
    //メンバー初期化
    STG_SCENE_INSTANCE = null;//シューティングゲームのシーンインスタンス
    STG_SCENE_INIT_FLAG = 0; //初期化が完了したか。 0:初期化前 1:初期通信完了 2:初期化処理完了
    STG_SCENE_BASE = null; //シューティングシーンの親
    STG_WINDOW_LAYER = null; //シューティングシーンのウィンドウ表示
    STG_OBJECT_LAYER = null; //STGオブジェクト表示レイヤー
    STG_BG_LAYER_1 = null; //STG背景表示レイヤー1
    STG_BG_LAYER_2 = null; //STG背景表示レイヤー2
    STG_ANIM_UI_LAYER = null; //UIアニメーション表示レイヤー
    STG_UI_LAYER = null; //UI表示レイヤー
    STG_PLAYER_AREA_INSTANCE = null; //プレイヤーのエリアインスタンス
    STG_PLAYER_MOUNT_DATA = null; //プレイヤーのマウントデータ
    STG_HEADER = null; //ヘッダー
    STG_CONTROLE_PANEL = null; //コントロールパネル
    STG_FIRE_BTN = null; //攻撃ボタン
    STG_BOMB_BTN = null; //爆弾ボタン
    STG_MY_HP_GAUGE = null; //自機の体力ゲージ
    STG_LEFT_BTN = null; //左ボタン
    STG_RIGHT_BTN = null; //右ボタン
    STG_BG_ASSET_ID_ARRAY = new Array(); //背景画像のアセット配列
    STG_BG_SPRITE_LAYER_1 = null; //レイヤー1の背景セット
    STG_BG_SPRITE_LAYER_2 = null; //レイヤー2の背景セット
    STG_BG_ANIM_FRAME_COUNT = 0; //背景画像アニメーションのフレーム
    STG_BG_ANIM_SPEED = 0; //背景画像アニメーションのスピード
    STG_MY_SHIP = null; //実機
    STG_MASTER_DATA = null; //現在プレイ中のSTGマスターデータ
    STG_SET_ENEMY_MASTER_DATAS = new Array(); //敵機出現設定
    STG_ENEMY_MASTER_DATAS = new Array(); //使用する敵機マスターデータ
    STG_POP_ENEMY_SHIP_LIST = new Array(); //出現済みの敵機ユニークIDのリスト
    STG_TIME_DELTA = 0; //ステージ経過時間(delta)
    STG_TIME_SECOND = 0; //ステージ経過時間(秒)
    STG_ENEMY_SHIP_INSTANCE_ARRAY = new Array(); //出現した敵機情報格納配列
    STG_SCORE_LABEL = null; //スコア表示ラベル
    STG_STARGE_START_ANIM = null; //ステージ開始アニメーション実体
    STG_STAGE_LIMIT_TIME = 0; //残りステージ時間
    STG_STAGE_LIMIT_TIME_DELTA = 0; //残りステージ時間(delta)
    STG_STAGE_CLEAR_FLAG = false; //ステージをクリアしたか。
    STG_MAX_SCORE = 0; //最大スコア
    STG_DROP_DATAS = null; //ドロップアイテム配列
    STG_RESULT_WINDOW = null; //ステージ結果画面
    STG_CLEAR_STEP = 0; //クリア後の制御番号
    STG_RESULT_STG_CLEAR = null; //クリア結果のサーバーレスポンスデータ
    STG_STOP_STAGE_TIME = false; //tureの場合、ステージ進行時間を停止させる
    STG_MY_SHIP_CONTROLE_FLAG = true; //falseの場合、自機の操作を不能にする
    STG_GAME_OVER_FLAG = false; //trueの場合、ゲームオーバー状態
    STG_MOUNT_BOMB_MASTER_DATA = null; //マウントに装備されているボムマスターデータ
    STG_PVP_MATCHING_DATA = null; //PVPのマッチングが成立した場合、格納される変数
    STG_PVP_FLAG = false; //PVP中であるか。
    STG_SCHECK_BOX = null; //敵機確認用当たり判定BOX
    STG_START_ANIM_VISIBLE = false; //スタートアニメーション再生中か
    STG_CHECK_AREA_ENEMY = false; //ゲーム画面内に敵が居るか、居ないか
    STG_PVP_START_TIME = 0; //PVP開始時間
    STG_PVP_STEP = 0; //PVPシーンのステップ
    STG_ENEMY_PLAYER_SHIP = null; //敵プレイヤーの自機
    STG_ESCAPE_GAUGE = null; //回避ゲージ
    STG_PVP_ROTATION = 0; //0:敵プレイヤー攻撃 1:プレイヤー攻撃
    STG_PVP_ENEMY_PLAYER_WIN = null; //敵プレイヤー勝利データ
    STG_PVP_CLEAR = false; //PVPをクリアしたか。
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    STG_SCENE_INSTANCE = this;

    //シーンの親ノード生成
    STG_SCENE_BASE = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //ウィンドウ表示レイヤー
    STG_WINDOW_LAYER = PlainElement({
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
    //STG背景レイヤー1
    STG_BG_LAYER_1 = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(STG_SCENE_BASE);
    //STGオブジェクトレイヤー
    STG_OBJECT_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(STG_SCENE_BASE);
    //STG背景レイヤー2
    STG_BG_LAYER_2 = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(STG_SCENE_BASE);
    //UIアニメレイヤー
    STG_ANIM_UI_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(STG_SCENE_BASE);

    //UIレイヤー
    STG_UI_LAYER = PlainElement({
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(STG_SCENE_BASE);

    //ヘッダー表示
    STG_HEADER = Sprite('ASSET_34').addChildTo(STG_UI_LAYER);
    STG_HEADER.y = - ((SCREEN_HEIGHT / 2) - (STG_HEADER.height / 2));

    STG_HEADER['label'] = Label({
      text: 'エリア名【?????】残り時間:??:??',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(STG_HEADER);

    //スコアラベル
    STG_SCORE_LABEL = Label({
      text: 'SCORE:0',
      fontSize: 32,
      fill: 'white',
      stroke: 'black',      // 枠色
      strokeWidth: 5,        // 枠太さ
      align: 'left',
    }).addChildTo(STG_UI_LAYER);
    STG_SCORE_LABEL['score'] = 0;
    STG_SCORE_LABEL.x = STG_SCORE_LABEL.x - ((SCREEN_WIDTH / 2) - STG_SCORE_LABEL.width / 1.5);
    STG_SCORE_LABEL.y = STG_HEADER.y;
    STG_SCORE_LABEL.y = STG_SCORE_LABEL.y + STG_HEADER.height;

    //コントロールパネル
    STG_CONTROLE_PANEL = Sprite('ASSET_493').addChildTo(STG_UI_LAYER);
    STG_CONTROLE_PANEL.y = STG_CONTROLE_PANEL.y + ((SCREEN_HEIGHT / 2) - (STG_CONTROLE_PANEL.height / 2));

    //攻撃ボタン
    STG_FIRE_BTN = Sprite('ASSET_492').addChildTo(STG_CONTROLE_PANEL);
    STG_FIRE_BTN['label'] = Label({
      text: 'STOP',
      fontSize: 32,
      fill: 'black',
    }).addChildTo(STG_FIRE_BTN);
    STG_FIRE_BTN['btn'] = Button({
      width: 90,         // 横サイズ
      height: 90,        // 縦サイズ
    }).addChildTo(STG_FIRE_BTN);
    STG_FIRE_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(STG_MY_SHIP == null) return;
      if(STG_MY_SHIP['main_weapon_visible'] == true) //射撃モード中
      {
        STG_MY_SHIP['main_weapon_visible'] = false;
        STG_FIRE_BTN['label'].text = "STOP";
      }
      else{ //射撃中止中
        STG_MY_SHIP['main_weapon_visible'] = true;
        STG_FIRE_BTN['label'].text = "FIRE";
      }
    };
    STG_FIRE_BTN['btn'].visible = false;

    //回避ゲージ
    STG_ESCAPE_GAUGE = Gauge({
      x: STG_FIRE_BTN.x, y: STG_FIRE_BTN.y,// x,y座標
      width: STG_FIRE_BTN.width,            // 横サイズ
      height: STG_FIRE_BTN.height,            // 縦サイズ
      maxValue: 1000,         // ゲージ最大値
      value: 0,         // ゲージ初期値
      fill: 'black',         // 後ろの色
      gaugeColor: 'yellow', // ゲージ色
      stroke: 'black',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(STG_CONTROLE_PANEL);
    //回避ゲージテキスト
    STG_ESCAPE_GAUGE['text'] = Label({
      text: 'ESCAPE!!!',
      fontSize: 24,
      fill: 'red',
    }).addChildTo(STG_ESCAPE_GAUGE);
    STG_ESCAPE_GAUGE.visible = false;

    //爆弾ボタン
    STG_BOMB_BTN = Sprite('ASSET_491').addChildTo(STG_CONTROLE_PANEL);
    STG_BOMB_BTN.x = STG_BOMB_BTN.x - ((SCREEN_WIDTH / 2) - (STG_BOMB_BTN.width * 0.75));
    //爆弾ボタン残弾数テキスト
    STG_BOMB_BTN['momb_num_label'] = Label({
      text: 'x0',
      fontSize: 24,
      fill: 'white',
      align: 'left',
    }).addChildTo(STG_BOMB_BTN);
    STG_BOMB_BTN['momb_num_label'].x = STG_BOMB_BTN['momb_num_label'].x + (STG_BOMB_BTN.width / 2);
    STG_BOMB_BTN['momb_num_label'].y = STG_BOMB_BTN['momb_num_label'].y + (STG_BOMB_BTN.height / 2);
    //爆弾ボタン本体
    STG_BOMB_BTN['btn'] = Button({
      width: 90,         // 横サイズ
      height: 90,        // 縦サイズ
    }).addChildTo(STG_BOMB_BTN);
    STG_BOMB_BTN['btn']['bomb_num'] = 0;
    STG_BOMB_BTN['btn']['interval_time'] = 0; //再射撃可能時間
    STG_BOMB_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      if(STG_MY_SHIP['weapon_controle_flag'] == false) return;
      if(this['bomb_num'] <= 0) return;
      if(this['interval_time'] != 0) return;
      STG_BOMB_BTN['btn']['bomb_num'] = parseInt(STG_BOMB_BTN['btn']['bomb_num']) - 1;
      STG_BOMB_BTN['momb_num_label'].text = "x" + parseInt(STG_BOMB_BTN['btn']['bomb_num']);
      G_STG_CREATE_BOMB(PHINA_APP,STG_MY_SHIP,STG_OBJECT_LAYER,STG_MY_SHIP['player_mount_data']['status_atk'],0,STG_MOUNT_BOMB_MASTER_DATA);
      this['interval_time'] = parseInt(STG_MOUNT_BOMB_MASTER_DATA['interval_time']); //連続発射時間を設定
    };
    STG_BOMB_BTN['btn'].update = function(app) {
      if(0 < this['interval_time']){
         this['interval_time'] -= app.deltaTime;
      }
      else{
        this['interval_time'] = 0;
      }
    };
    STG_BOMB_BTN['btn'].visible = false;

    //自機のHPゲージ
    STG_MY_HP_GAUGE = Gauge({
      x: 0, y: 0,// x,y座標
      width: 100,            // 横サイズ
      height: 100,            // 縦サイズ
      maxValue: 100,         // ゲージ最大値
      value: 100,         // ゲージ初期値
      fill: 'black',         // 後ろの色
      gaugeColor: 'blue', // ゲージ色
      stroke: 'white',      // 枠色
      strokeWidth: 10,        // 枠太さ
    }).addChildTo(STG_CONTROLE_PANEL);
    STG_MY_HP_GAUGE.x = STG_MY_HP_GAUGE.x + ((SCREEN_WIDTH / 2) - (STG_MY_HP_GAUGE.width * 0.75));
    STG_MY_HP_GAUGE.rotation -= 90;
    STG_MY_HP_GAUGE['label'] = Label({
      text: '装甲',
      fontSize: 32,
      fill: 'white',
    }).addChildTo(STG_MY_HP_GAUGE);
    STG_MY_HP_GAUGE['label'].rotation += 90;

    //左ボタン
    STG_LEFT_BTN = Sprite('ASSET_462').addChildTo(STG_CONTROLE_PANEL);
    STG_LEFT_BTN.setScale(1.25);
    STG_LEFT_BTN.x = STG_LEFT_BTN.x - ((STG_FIRE_BTN.width / 2) + STG_LEFT_BTN.width);
    STG_LEFT_BTN['btn'] = Button({
      width: 86,         // 横サイズ
      height: 86,        // 縦サイズ
    }).addChildTo(STG_LEFT_BTN);
    STG_LEFT_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    };
    STG_LEFT_BTN['btn'].onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || STG_MY_SHIP_CONTROLE_FLAG == false) return;
      if(STG_MY_SHIP == null) return;
      if(STG_MY_SHIP['controle_flag'] == false) return;
      if(STG_MY_SHIP.x < -((SCREEN_WIDTH / 2) - (STG_MY_SHIP.width / 2))) return;
      STG_MY_SHIP.x -= (5 + parseInt(STG_MY_SHIP['player_mount_data']['status_controle'] / 10));
    };
    STG_LEFT_BTN['btn'].visible = false;

    //右ボタン
    STG_RIGHT_BTN = Sprite('ASSET_462').addChildTo(STG_CONTROLE_PANEL);
    STG_RIGHT_BTN.setScale(1.25);
    STG_RIGHT_BTN.x = STG_RIGHT_BTN.x + ((STG_FIRE_BTN.width / 2) + STG_RIGHT_BTN.width);
    STG_RIGHT_BTN.scaleX *= -1;
    STG_RIGHT_BTN['btn'] = Button({
      width: 86,         // 横サイズ
      height: 86,        // 縦サイズ
    }).addChildTo(STG_RIGHT_BTN);
    STG_RIGHT_BTN['btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    };
    STG_RIGHT_BTN['btn'].onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true || STG_MY_SHIP_CONTROLE_FLAG == false) return;
      if(STG_MY_SHIP == null) return;
      if(STG_MY_SHIP['controle_flag'] == false) return;
      if(((SCREEN_WIDTH / 2) - (STG_MY_SHIP.width / 2)) < STG_MY_SHIP.x) return;
      STG_MY_SHIP.x += (5 + parseInt(STG_MY_SHIP['player_mount_data']['status_controle'] / 10));
    };
    STG_RIGHT_BTN['btn'].visible = false;

    //敵機確認用当たり判定ボックスを生成
    STG_SCHECK_BOX = Sprite('ASSET_106').addChildTo(STG_OBJECT_LAYER);
    STG_SCHECK_BOX.update = function(app) {
      var hitFlag = false;
      for (var i = 0; i < STG_ENEMY_SHIP_INSTANCE_ARRAY.length; i++) {
        if(STG_ENEMY_SHIP_INSTANCE_ARRAY[i] != null){
          if(this.hitTestElement(STG_ENEMY_SHIP_INSTANCE_ARRAY[i])){
            hitFlag = true;
            break;
          }
        }
      }
      STG_CHECK_AREA_ENEMY = hitFlag;
    }


    //初期通信処理
    var postParam = new Object();
    postParam['shooting_game_init'] = 0;
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/shootingGame/shootingGame.php",postParam); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function(app) {
    if(RESULT_DATA != ""){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['result_shooting_game_init'])){ //STG初期通信結果
            var resultShootingGameInit = json['result_shooting_game_init'];
            if(isset(resultShootingGameInit['result_start_shooting_game'])){ //プレイヤーが所持しているマウントデータを取得
              if(resultShootingGameInit['result_start_shooting_game']['error'] == 0){ //正常
                var scheneInit = resultShootingGameInit['result_start_shooting_game'];
                STG_PLAYER_AREA_INSTANCE = scheneInit['result_player_area_instance'];
                STG_PLAYER_MOUNT_DATA = scheneInit['result_player_mount_data'];
                if(isset(resultShootingGameInit['result_stg_pvp_matching'])){
                  var resultPvpMatching = resultShootingGameInit['result_stg_pvp_matching'];
                  if(resultPvpMatching['error'] == 0){
                    if(resultPvpMatching['result_player_stg_search'] != null){ //対戦相手が存在した場合。
                      STG_PVP_MATCHING_DATA = resultPvpMatching['result_player_stg_search']; //対戦相手のデータを設定
                      STG_PVP_MATCHING_DATA['player_name'] = resultPvpMatching['result_player_name']; //対戦相手名を設定
                      console.log("対戦相手情報");
                      console.log(STG_PVP_MATCHING_DATA);
                    }
                  }
                  else{ //PVPマッチングエラー
                    G_NORMAL_WINDOW_CREATE(STG_WINDOW_LAYER,"エラー",resultPvpMatching['error_comment'],2,"errorStgResultPvpMatchingWindow");
                  }
                }

                STG_SCENE_INIT_FLAG = 1;//初期化通信完了
              }
              else{ //初期化通信でエラー
                G_NORMAL_WINDOW_CREATE(STG_WINDOW_LAYER,"エラー",resultShootingGameInit['result_start_shooting_game']['error_comment'],2,"errorStgInitWindow");
              }
            }
          }
          if(isset(json['result_shooting_game_clear'])){ //STGクリア処理
            if(isset(json['result_shooting_game_clear']['error']) && isset(json['result_shooting_game_clear']['error_comment'])){
              if(json['result_shooting_game_clear']['error'] == 0){
                STG_RESULT_STG_CLEAR = json['result_shooting_game_clear'];
                STG_CLEAR_STEP = 1;
              }
              else{ //エラーがあった
                G_NORMAL_WINDOW_CREATE(STG_WINDOW_LAYER,"エラー",json['result_shooting_game_clear']['error_comment'],2,"errorStgClearWindow");
              }
            }
          }
          if(isset(json['result_stg_pvp_enemy_player_win'])){ //PVPで相手が勝利
            STG_PVP_ENEMY_PLAYER_WIN = json['result_stg_pvp_enemy_player_win'];
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

    //ウィンドウに返り値があった場合
    if(WINDOW_RETURN_VAL != null){
      if(isset(WINDOW_RETURN_VAL['errorStgInitWindow']) && WINDOW_RETURN_VAL['errorStgInitWindow'] == "ok"){ //初期通信エラーを閉じた
        var prevSceneName = SCENE_MANAGER['prev_scene'];
        MOUNT_SCENE_INSTANCE.exit(prevSceneName);
      }
      WINDOW_RETURN_VAL = null;
    }

    //初期化通信完了
    if(STG_SCENE_INIT_FLAG == 1 && MASTER_DATA_STG_ENEMY_SET_MASTER != null && MASTER_DATA_STG_MASTER != null && MASTER_DATA_STG_ENEMY_MASTER != null){
      var stgId = G_STG_GET_STG_ID(parseInt(STG_PLAYER_MOUNT_DATA['mount_type']),STG_PLAYER_AREA_INSTANCE['stg_ids']);
      //現在プレイ中のSTGマスターデータを取得
      if(MASTER_DATA_STG_MASTER != null){
        for (var i = 0; i < MASTER_DATA_STG_MASTER.length; i++) {
          if(parseInt(MASTER_DATA_STG_MASTER[i]['stg_id']) == parseInt(stgId)){
            STG_MASTER_DATA = Object.create(MASTER_DATA_STG_MASTER[i]);
            break;
          }
        }
      }

      //敵機出現設定を作成
      if(MASTER_DATA_STG_ENEMY_SET_MASTER != null && STG_MASTER_DATA != null){
        for (var i = 0; i < MASTER_DATA_STG_ENEMY_SET_MASTER.length; i++) {
          if(parseInt(MASTER_DATA_STG_ENEMY_SET_MASTER[i]['stg_enemy_set_id']) == parseInt(STG_MASTER_DATA['stg_enemy_set_id'])){
            STG_SET_ENEMY_MASTER_DATAS[STG_SET_ENEMY_MASTER_DATAS.length] = Object.create(MASTER_DATA_STG_ENEMY_SET_MASTER[i]);
          }
        }
      }

      //使用する敵機マスターデータを取得
      for (var i = 0; i < STG_SET_ENEMY_MASTER_DATAS.length; i++) {
        var addEnemeyFlag = true;
        for (var e = 0; e < STG_ENEMY_MASTER_DATAS.length; e++) {
          if(parseInt(STG_ENEMY_MASTER_DATAS[e]['stg_enemy_id']) == parseInt(STG_SET_ENEMY_MASTER_DATAS[i]['stg_enemy_id'])){
            addEnemeyFlag = false;
            break;
          }
        }
        //敵機マスターデータが追加されていない場合、追加
        if(addEnemeyFlag == true){
          for (var e = 0; e < MASTER_DATA_STG_ENEMY_MASTER.length; e++) {
            if(parseInt(MASTER_DATA_STG_ENEMY_MASTER[e]['stg_enemy_id']) == parseInt(STG_SET_ENEMY_MASTER_DATAS[i]['stg_enemy_id'])){
              STG_ENEMY_MASTER_DATAS[STG_ENEMY_MASTER_DATAS.length] = Object.create(MASTER_DATA_STG_ENEMY_MASTER[e]);
            }
          }
        }
      }

      //最大スコアを取得
      STG_MAX_SCORE = 0; //最大スコア
      for (var i = 0; i < STG_SET_ENEMY_MASTER_DATAS.length; i++) {
        for (var s = 0; s < STG_ENEMY_MASTER_DATAS.length; s++) {
          if(STG_ENEMY_MASTER_DATAS[s]['stg_enemy_id'] == STG_SET_ENEMY_MASTER_DATAS[i]['stg_enemy_id']){
            STG_MAX_SCORE = STG_MAX_SCORE + parseInt(STG_ENEMY_MASTER_DATAS[s]['stg_enemy_score']);
            break;
          }
        }
      }


      G_STG_SET_BG_SCROOL_SPRITES(stgId);
      G_STG_SCROLLE_BG_INIT(STG_BG_ASSET_ID_ARRAY);
      G_STG_CREATE_MY_SHIP(STG_PLAYER_MOUNT_DATA['mount_asset_id'],STG_PLAYER_MOUNT_DATA);
      //背景アニメーションスピードをマウントタイプにより分岐
      switch (parseInt(STG_PLAYER_MOUNT_DATA['mount_type'])) {
        case 1: //地上
        STG_BG_ANIM_SPEED = 5;
        break;
        case 2: //上空
        STG_BG_ANIM_SPEED = 10;
        break;
        case 3: //宇宙
        STG_BG_ANIM_SPEED = 5;
        break;
        default:
        break;
      }
      G_STG_CREATE_STAGE_START_ANIM(STG_ANIM_UI_LAYER); //シューティングゲーム開始アニメーションを作成して再生
      G_STG_STAGE_START_ANIM_START(); //ステージ開始アニメーションを開始

      //ヘッダーの文字を更新
      STG_HEADER['label'].text = "エリア名【 " + STG_MASTER_DATA['stage_name'] + "】残り時間:" + G_STG_CHANGE_STAGE_TIME_LIMIT_TEXT(parseInt(STG_MASTER_DATA['stage_time_limit']));
      STG_STAGE_LIMIT_TIME = parseInt(STG_MASTER_DATA['stage_time_limit']);

      //PVP情報があれば、開始時間を設定
      if(STG_PVP_MATCHING_DATA != null){
        var maxTime = parseInt(STG_MASTER_DATA['stage_time_limit'] * 0.9);
        var minTime = parseInt(STG_MASTER_DATA['stage_time_limit'] * 0.8);
        STG_PVP_START_TIME = Math.floor( Math.random() * (maxTime + 1 - minTime) ) + minTime ;
        console.log("PVP開始時間:" + STG_PVP_START_TIME);
      }
      STG_SCENE_INIT_FLAG = 2;

      //ボム数を設定
      for (var i = 0; i < MASTER_DATA_MOUNT_BOMB_MASTER.length; i++) {
        if(parseInt(STG_PLAYER_MOUNT_DATA['bomb_id']) == parseInt(MASTER_DATA_MOUNT_BOMB_MASTER[i]['mount_bomb_id'])){
          STG_MOUNT_BOMB_MASTER_DATA = Object.create(MASTER_DATA_MOUNT_BOMB_MASTER[i]);
          STG_BOMB_BTN['btn']['bomb_num'] = parseInt(STG_MOUNT_BOMB_MASTER_DATA['mount_bomb_num']);
          STG_BOMB_BTN['momb_num_label'].text = "x" + parseInt(STG_MOUNT_BOMB_MASTER_DATA['mount_bomb_num']);
          break;
        }
      }
    }

    if(STG_SCENE_INIT_FLAG == 2){ //初期化後毎回呼び出される必要がある処理
      STG_TIME_DELTA += app.deltaTime;
      STG_TIME_SECOND = Math.floor(STG_TIME_DELTA / 1000);
      if(STG_PVP_FLAG == false){ //PVP中ではない。
        G_STG_CHECK_POP_ENEMY(STG_OBJECT_LAYER,MASTER_DATA_STG_MASTER,STG_ENEMY_MASTER_DATAS,STG_SET_ENEMY_MASTER_DATAS,STG_TIME_SECOND);
      }
      STG_BG_ANIM_FRAME_COUNT += app.deltaTime;
      if(0.01 <= STG_BG_ANIM_FRAME_COUNT){
        STG_BG_ANIM_FRAME_COUNT = 0;
        G_STG_ADD_RANDOM_BG_ASSET(STG_BG_ASSET_ID_ARRAY,STG_BG_ANIM_SPEED);
      }
      if(STG_STOP_STAGE_TIME == false){ //カウントダウンが有効か
        //カウントダウン
        STG_STAGE_LIMIT_TIME_DELTA += app.deltaTime;
        STG_STAGE_LIMIT_TIME = (parseInt(STG_MASTER_DATA['stage_time_limit']) - Math.floor(STG_STAGE_LIMIT_TIME_DELTA / 1000));
        if(STG_STAGE_LIMIT_TIME <= 0) {
          STG_STAGE_LIMIT_TIME = 0;
          if(STG_STAGE_CLEAR_FLAG == false && STG_GAME_OVER_FLAG == false){ //ステージクリア時の処理を実行
            STG_STAGE_CLEAR_FLAG = true;
            //ステージクリア処理
            var postParam = new Object();
            postParam['shooting_game_clear'] = new Object;
            postParam['shooting_game_clear']['rank'] = G_STG_GET_CLEAR_RANK(parseInt(STG_SCORE_LABEL['score']),STG_MAX_SCORE); //ランクを取得
            if(STG_PVP_MATCHING_DATA != null && isset(STG_PVP_MATCHING_DATA['player_index_id'])){
              postParam['shooting_game_clear']['pvp_clear_flag'] = STG_PVP_CLEAR ? 1 : 0;
              postParam['shooting_game_clear']['enemy_player_index_id'] = STG_PVP_MATCHING_DATA['player_index_id'];
            }
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/shootingGame/shootingGame.php",postParam); //非同期通信開始
          }
        }
        STG_HEADER['label'].text = "エリア名【 " + STG_MASTER_DATA['stage_name'] + "】残り時間:" + G_STG_CHANGE_STAGE_TIME_LIMIT_TEXT(parseInt(STG_STAGE_LIMIT_TIME));
      }
      //PVP開始チェック
      if(STG_STAGE_LIMIT_TIME <= STG_PVP_START_TIME){
        G_STG_PVP_START();
        G_STG_PVP_UPDATE(app);
      }
    }

    //メインウェポン攻撃処理
    if(STG_SCENE_INIT_FLAG == 2 && STG_MY_SHIP != null && STG_MY_SHIP['main_weapon_visible'] == true && STG_MY_SHIP['weapon_controle_flag'] == true){
      STG_MY_SHIP['main_weapon_frame'] += app.deltaTime;
      var resultCreateBullet = G_STG_CREATE_BULLET(app,STG_MY_SHIP,STG_OBJECT_LAYER,STG_MY_SHIP['main_weapon_frame'],STG_MY_SHIP['main_weapon_combo'],STG_MY_SHIP['player_mount_data']['status_atk'],0,STG_MY_SHIP['player_mount_data']['weapon_id']);
      STG_MY_SHIP['main_weapon_frame'] = resultCreateBullet['result_frame_count'];
      STG_MY_SHIP['main_weapon_combo'] = resultCreateBullet['result_combo_count'];
    }

    //メインウェポン攻撃処理(敵プレイヤー)
    if(STG_SCENE_INIT_FLAG == 2 && STG_PVP_FLAG == true && STG_ENEMY_PLAYER_SHIP != null && STG_ENEMY_PLAYER_SHIP['main_weapon_visible'] == true && STG_ENEMY_PLAYER_SHIP['weapon_controle_flag']){
      STG_ENEMY_PLAYER_SHIP['main_weapon_frame'] += app.deltaTime;
      var resultCreateBullet = G_STG_CREATE_BULLET(app,STG_ENEMY_PLAYER_SHIP,STG_OBJECT_LAYER,STG_ENEMY_PLAYER_SHIP['main_weapon_frame'],STG_ENEMY_PLAYER_SHIP['main_weapon_combo'],STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_atk'],0,STG_ENEMY_PLAYER_SHIP['player_mount_data']['weapon_id'],1);
      STG_ENEMY_PLAYER_SHIP['main_weapon_frame'] = resultCreateBullet['result_frame_count'];
      STG_ENEMY_PLAYER_SHIP['main_weapon_combo'] = resultCreateBullet['result_combo_count'];
    }

    //クリア後のリザルト処理
    G_STG_CLEAR_STEP(STG_CLEAR_STEP);
  },
});

function G_STG_SET_BG_SCROOL_SPRITES(bgId){ //シューティング背景のスプライトを取得し、設定する。
  if(STG_BG_ASSET_ID_ARRAY.length != 0) STG_BG_ASSET_ID_ARRAY = new Array();
  STG_BG_ASSET_ID_ARRAY['layer_1'] = new Array();
  STG_BG_ASSET_ID_ARRAY['layer_2'] = new Array();
  //レイヤー1を生成
  var i = 0;
  while (1) {
    var tag = "stg_stage_bg_" + bgId + "_layer_1_" + i;
    var getBgAssetId = G_ASSET_GET_ASSET_ID(tag)
    if(getBgAssetId != -1)
    {
      STG_BG_ASSET_ID_ARRAY['layer_1'][i] = getBgAssetId;
    }
    else{
      break;
    }
    i ++;
  }
  //レイヤー2を生成
  var i = 0;
  while (1) {
    var tag = "stg_stage_bg_" + bgId + "_layer_2_" + i;
    var getBgAssetId = G_ASSET_GET_ASSET_ID(tag)
    if(getBgAssetId != -1)
    {
      STG_BG_ASSET_ID_ARRAY['layer_2'][i] = getBgAssetId;
    }
    else{
      break;
    }
    i ++;
  }
}

function G_STG_SCROLLE_BG_INIT(bgAssetIdArray){ //背景を初期化
  //レイヤー1
  if(isset(bgAssetIdArray['layer_1'])){
    STG_BG_SPRITE_LAYER_1 = new Array();
    var min = 0;
    var max = (bgAssetIdArray['layer_1'].length - 1);
    if(max < 0) max = 0;
    var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    STG_BG_SPRITE_LAYER_1[0] = Sprite('ASSET_' + bgAssetIdArray['layer_1'][rot]).addChildTo(STG_BG_LAYER_1);
    if(SCREEN_HEIGHT < STG_BG_SPRITE_LAYER_1[0].height)
    {
      var movePosY = STG_BG_SPRITE_LAYER_1[0].height - SCREEN_HEIGHT;
      movePosY = (movePosY / 2);
      STG_BG_SPRITE_LAYER_1[0].y = STG_BG_SPRITE_LAYER_1[0].y - movePosY;
    }
    rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    STG_BG_SPRITE_LAYER_1[1] = Sprite('ASSET_' + bgAssetIdArray['layer_1'][rot]).addChildTo(STG_BG_LAYER_1);
    STG_BG_SPRITE_LAYER_1[1].y = STG_BG_SPRITE_LAYER_1[0].y;
    STG_BG_SPRITE_LAYER_1[1].y = STG_BG_SPRITE_LAYER_1[1].y - ((STG_BG_SPRITE_LAYER_1[0].height / 2) + (STG_BG_SPRITE_LAYER_1[1].height / 2));
  }

  //レイヤー2
  if(isset(bgAssetIdArray['layer_2'])){
    STG_BG_SPRITE_LAYER_2 = new Array();
    var min = 0;
    var max = (bgAssetIdArray['layer_2'].length - 1);
    if(max < 0) max = 0;
    var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;

    STG_BG_SPRITE_LAYER_2[0] = Sprite('ASSET_' + bgAssetIdArray['layer_2'][rot]).addChildTo(STG_BG_LAYER_2);
    if(SCREEN_HEIGHT < STG_BG_SPRITE_LAYER_2[0].height)
    {
      var movePosY = STG_BG_SPRITE_LAYER_2[0].height - SCREEN_HEIGHT;
      movePosY = (movePosY / 2);
      STG_BG_SPRITE_LAYER_2[0].y = STG_BG_SPRITE_LAYER_2[0].y - movePosY;
    }
    rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    STG_BG_SPRITE_LAYER_2[1] = Sprite('ASSET_' + bgAssetIdArray['layer_2'][rot]).addChildTo(STG_BG_LAYER_2);
    STG_BG_SPRITE_LAYER_2[1].y = STG_BG_SPRITE_LAYER_2[0].y;
    STG_BG_SPRITE_LAYER_2[1].y = STG_BG_SPRITE_LAYER_2[1].y - ((STG_BG_SPRITE_LAYER_2[0].height / 2) + (STG_BG_SPRITE_LAYER_2[1].height / 2));
  }
}

function G_STG_ADD_RANDOM_BG_ASSET(bgAssetIdArray,speed){ //背景画像をランダムで追加する。
  //レイヤー1
  if(STG_BG_SPRITE_LAYER_1[0] != null){
    var diffPosY = ((STG_BG_SPRITE_LAYER_1[0].height / 2) / 2);
    var outPosY = (STG_BG_SPRITE_LAYER_1[0].height / 2);
    var resultOutPosY = diffPosY + outPosY;
    if(resultOutPosY <= STG_BG_SPRITE_LAYER_1[0].y){ //最大まで画像が移動した
      STG_BG_SPRITE_LAYER_1[0].remove();
      STG_BG_SPRITE_LAYER_1[0] = null;
      var min = 0;
      var max = (bgAssetIdArray['layer_1'].length - 1);
      if(max < 0) max = 0;
      var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      STG_BG_SPRITE_LAYER_1[0] = Sprite('ASSET_' + bgAssetIdArray['layer_1'][rot]).addChildTo(STG_BG_LAYER_1);
      STG_BG_SPRITE_LAYER_1[0].y = STG_BG_SPRITE_LAYER_1[1].y;
      STG_BG_SPRITE_LAYER_1[0].y = STG_BG_SPRITE_LAYER_1[0].y - ((STG_BG_SPRITE_LAYER_1[1].height / 2) + (STG_BG_SPRITE_LAYER_1[0].height / 2));
    }

    diffPosY = ((STG_BG_SPRITE_LAYER_1[1].height / 2) / 2);
    outPosY = (STG_BG_SPRITE_LAYER_1[1].height / 2);
    resultOutPosY = diffPosY + outPosY;
    if(resultOutPosY <= STG_BG_SPRITE_LAYER_1[1].y){ //最大まで画像が移動した
      STG_BG_SPRITE_LAYER_1[1].remove();
      STG_BG_SPRITE_LAYER_1[1] = null;
      var min = 0;
      var max = (bgAssetIdArray['layer_1'].length - 1);
      if(max < 0) max = 0;
      var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      STG_BG_SPRITE_LAYER_1[1] = Sprite('ASSET_' + bgAssetIdArray['layer_1'][rot]).addChildTo(STG_BG_LAYER_1);
      STG_BG_SPRITE_LAYER_1[1].y = STG_BG_SPRITE_LAYER_1[0].y;
      STG_BG_SPRITE_LAYER_1[1].y = STG_BG_SPRITE_LAYER_1[1].y - ((STG_BG_SPRITE_LAYER_1[0].height / 2) + (STG_BG_SPRITE_LAYER_1[1].height / 2));
    }
  }

  //レイヤー2
  if(STG_BG_SPRITE_LAYER_2[0] != null){
    var diffPosY = ((STG_BG_SPRITE_LAYER_2[0].height / 2) / 2);
    var outPosY = (STG_BG_SPRITE_LAYER_2[0].height / 2);
    var resultOutPosY = diffPosY + outPosY;
    if(resultOutPosY <= STG_BG_SPRITE_LAYER_2[0].y){ //最大まで画像が移動した
      STG_BG_SPRITE_LAYER_2[0].remove();
      STG_BG_SPRITE_LAYER_2[0] = null;
      var min = 0;
      var max = (bgAssetIdArray['layer_2'].length - 1);
      if(max < 0) max = 0;
      var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      STG_BG_SPRITE_LAYER_2[0] = Sprite('ASSET_' + bgAssetIdArray['layer_2'][rot]).addChildTo(STG_BG_LAYER_2);
      STG_BG_SPRITE_LAYER_2[0].y = STG_BG_SPRITE_LAYER_2[1].y;
      STG_BG_SPRITE_LAYER_2[0].y = STG_BG_SPRITE_LAYER_2[0].y - ((STG_BG_SPRITE_LAYER_2[1].height / 2) + (STG_BG_SPRITE_LAYER_2[0].height / 2));
    }

    diffPosY = ((STG_BG_SPRITE_LAYER_2[1].height / 2) / 2);
    outPosY = (STG_BG_SPRITE_LAYER_2[1].height / 2);
    resultOutPosY = diffPosY + outPosY;
    if(resultOutPosY <= STG_BG_SPRITE_LAYER_2[1].y){ //最大まで画像が移動した
      STG_BG_SPRITE_LAYER_2[1].remove();
      STG_BG_SPRITE_LAYER_2[1] = null;
      var min = 0;
      var max = (bgAssetIdArray['layer_2'].length - 1);
      if(max < 0) max = 0;
      var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
      STG_BG_SPRITE_LAYER_2[1] = Sprite('ASSET_' + bgAssetIdArray['layer_2'][rot]).addChildTo(STG_BG_LAYER_2);
      STG_BG_SPRITE_LAYER_2[1].y = STG_BG_SPRITE_LAYER_2[0].y;
      STG_BG_SPRITE_LAYER_2[1].y = STG_BG_SPRITE_LAYER_2[1].y - ((STG_BG_SPRITE_LAYER_2[0].height / 2) + (STG_BG_SPRITE_LAYER_2[1].height / 2));
    }
  }
  //移動
  STG_BG_SPRITE_LAYER_1[0].y = STG_BG_SPRITE_LAYER_1[0].y + speed;
  STG_BG_SPRITE_LAYER_1[1].y = STG_BG_SPRITE_LAYER_1[1].y + speed;
  STG_BG_SPRITE_LAYER_2[0].y = STG_BG_SPRITE_LAYER_2[0].y + speed;
  STG_BG_SPRITE_LAYER_2[1].y = STG_BG_SPRITE_LAYER_2[1].y + speed;
}

function G_STG_GET_STG_ID(mountType,stgIds){ //area_masterテーブルの stg_ids と使用中のマウントタイプから、stg_idを特定する。
  var resultStgId = -1;
  var stgIdsArray = stgIds.split(",");
  if(stgIdsArray.length != 0){
    switch (parseInt(mountType)) {
      case 1: //地上StgId
      resultStgId = stgIdsArray[0];
      break;
      case 2: //空中StgId
      resultStgId = stgIdsArray[1];
      break;
      case 3: //宇宙StgId
      resultStgId = stgIdsArray[2];
      break;
      default:
      break;
    }
  }
  return resultStgId;
}

function G_STG_CREATE_MY_SHIP(mountAssetId,playerMountData){ //実機を表示
  STG_MY_SHIP = G_ASSET_GET_SPRITE_ANIM("mount_stg_anim_" + playerMountData['mount_asset_id'],150);
  STG_MY_SHIP.addChildTo(STG_OBJECT_LAYER);
  STG_MY_SHIP.y = STG_MY_SHIP.y + (SCREEN_HEIGHT / 3.75);
  STG_MY_SHIP['ship_init_pos_y'] = STG_MY_SHIP.y;
  STG_MY_SHIP['hit_box'] = Sprite('ASSET_245').addChildTo(STG_OBJECT_LAYER);
  var cntPoint = (100 - parseInt(playerMountData['status_controle']));
  if(cntPoint <= 10) cntPoint = 10;
  var cntResult = (parseInt(cntPoint) * 0.01);
  STG_MY_SHIP['hit_box'].width = parseInt(STG_MY_SHIP.width * cntResult);
  STG_MY_SHIP['hit_box'].height = parseInt(STG_MY_SHIP.height * cntResult);
  console.log("回避サイズ");
  console.log(STG_MY_SHIP['hit_box'].width);
  console.log(STG_MY_SHIP['hit_box'].height);
  STG_MY_SHIP['hit_box'].update = function() {
    this.x = STG_MY_SHIP.x;
    this.y = STG_MY_SHIP.y;
  };
  STG_MY_SHIP['main_weapon_visible'] = false;
  STG_MY_SHIP['player_mount_data'] = playerMountData;
  STG_MY_SHIP['main_weapon_frame'] = 0;
  STG_MY_SHIP['main_weapon_combo'] = 0;
  STG_MY_SHIP['now_hp'] = parseInt(playerMountData['status_hp']);
  STG_MY_SHIP['damage_anim_step'] = -1; //-1:停止 0:再生開始
  STG_MY_SHIP['controle_flag'] = true; //false:操作不能
  STG_MY_SHIP['weapon_controle_flag'] = true; //false:攻撃禁止
  STG_MY_SHIP.update = function() {
    //ダメージアニメーション
    if(this['damage_anim_step'] == 0){
      this['damage_anim_step'] = 1; //ダメージアニメーションを停止
      var tween1 = Tweener().fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).call(function(){
        this.target['damage_anim_step'] = 2;
      });
      tween1.attachTo(STG_MY_SHIP);
    }
  };
}

function G_STG_CREATE_BULLET(app,parentPos,parentBase,weaponFrameCount,weaponComboCount,mountAtk,direction,weaponId,target = 0){ //弾丸を作成 direction = 向き 0:上1:下 target = 0 :敵と敵プレイヤー 1:プレイヤー
  var result = new Array();
  result['result_frame_count'] = weaponFrameCount;
  result['result_combo_count'] = weaponComboCount;
  switch (parseInt(weaponId)) {
    case 1: //通常弾
    if(500 <= weaponFrameCount){
      result['result_frame_count'] = 0;
      var bulletLeft = Sprite('ASSET_490').addChildTo(parentBase);
      bulletLeft.setPosition(parentPos.x,parentPos.y);
      bulletLeft.x = bulletLeft.x - (bulletLeft.width * 2);
      bulletLeft['frame_count'] = 0;
      bulletLeft['bullet_damage'] = parseInt(mountAtk * 0.25);

      bulletLeft.update = function() {


        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 50;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this);
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this);
        else G_STG_BULLET_HIT_PLAYER(this);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
          this.remove();
        }

      };

      var bulletRight = Sprite('ASSET_490').addChildTo(parentBase);
      bulletRight.setPosition(parentPos.x,parentPos.y);
      bulletRight.x = bulletRight.x + (bulletRight.width * 2);
      bulletRight['frame_count'] = 0;
      bulletRight['bullet_damage'] = parseInt(mountAtk * 0.25);

      bulletRight.update = function() {

        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 50;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this);
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this);
        else G_STG_BULLET_HIT_PLAYER(this);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
          this.remove();
        }
      };
    }
    break;
    case 2: //通常弾(3連射)
    if(500 <= weaponFrameCount){
      result['result_frame_count'] = 0;
      //3連射分
      if(weaponComboCount == 0 || weaponComboCount == 1 || weaponComboCount == 2) result['result_frame_count'] = 400;
      result['result_combo_count'] ++;
      if(3 <= weaponComboCount) {
        result['result_frame_count'] = 0;
        result['result_combo_count'] = 0;
      }
      var bulletLeft = Sprite('ASSET_490').addChildTo(parentBase);
      bulletLeft.setPosition(parentPos.x,parentPos.y);
      bulletLeft.x = bulletLeft.x - (bulletLeft.width * 2);
      bulletLeft['frame_count'] = 0;
      bulletLeft['bullet_damage'] = parseInt(mountAtk * 0.25);

      bulletLeft.update = function() {

        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 50;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this);
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this);
        else G_STG_BULLET_HIT_PLAYER(this);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
          this.remove();
        }
      };
      var bulletRight = Sprite('ASSET_490').addChildTo(parentBase);
      bulletRight.setPosition(parentPos.x,parentPos.y);
      bulletRight.x = bulletRight.x + (bulletRight.width * 2);
      bulletRight['frame_count'] = 0;
      bulletRight['bullet_damage'] = parseInt(mountAtk * 0.25);

      bulletRight.update = function() {

        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 50;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this);
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this);
        else G_STG_BULLET_HIT_PLAYER(this);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
          this.remove();
        }
      };
    }
    break;
    default:
    break;
  }
  return result;
}

function G_STG_CREATE_BOMB(app,parentPos,parentBase,mountAtk,direction,bombMasterData,target = 0){ //爆弾を生成する。target=0:敵、敵プレイヤー 1:プレイヤー
  switch (parseInt(bombMasterData['mount_bomb_id'])) {
    case 1: //通常ミサイル
    {
      var bomb = Sprite('ASSET_245').addChildTo(parentBase);
      bomb['anim'] = G_ASSET_GET_SPRITE_ANIM("stg_bomb_anim_1",150);
      bomb.width = bomb['anim'].width;
      bomb.height = bomb['anim'].height;
      bomb['anim'].addChildTo(bomb);
      bomb['frame_count'] = 0;
      bomb['bullet_damage'] = parseInt(mountAtk * 1.5);
      bomb.setPosition(parentPos.x,parentPos.y);
      bomb.update = function() {

        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 5;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this,true,true); //削除時 エフェクトを有効
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this,true,true);
        else G_STG_BULLET_HIT_PLAYER(this,true,true);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
          this.remove();
        }
      };
    }
    break;
    case 2: //クラスターミサイル
    {
      var lastBombPos = null;
      var bomb = Sprite('ASSET_245').addChildTo(parentBase);
      bomb['anim'] = G_ASSET_GET_SPRITE_ANIM("stg_bomb_anim_1",150);
      bomb.width = bomb['anim'].width;
      bomb.height = bomb['anim'].height;
      bomb['anim'].addChildTo(bomb);
      bomb['frame_count'] = 0;
      bomb['bullet_damage'] = parseInt(mountAtk * 1.5);
      bomb.setPosition(parentPos.x,parentPos.y);
      bomb.update = function() {

        this['frame_count'] += app.deltaTime;
        if(0.01 <= this['frame_count']){
          this.y = this.y - 5;
          this['frame_count'] = 0;
        }

        // ヒット判定
        G_STG_BULLET_HIT_ENEMY(this,true,true); //削除時 エフェクトを有効
        if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this,true,true);
        else G_STG_BULLET_HIT_PLAYER(this,true,true);

        //範囲を超えていた場合、削除
        if(this != null && this.y <= (SCREEN_HEIGHT / 5)){
          lastBombPos = Vector2(this.x, this.y);
          this.remove();
          //クラスターミサイルを生成
          var moveX = -320;
          for (var i = 0; i < 5; i++) {
            var miniBomb = Sprite('ASSET_245').addChildTo(parentBase);
            miniBomb['anim'] = G_ASSET_GET_SPRITE_ANIM("stg_bomb_anim_1",150);
            miniBomb.width = miniBomb['anim'].width;
            miniBomb.height = miniBomb['anim'].height;
            miniBomb['anim'].addChildTo(miniBomb);
            miniBomb['bullet_damage'] = parseInt(mountAtk * 1.5);
            miniBomb.setPosition(lastBombPos.x,lastBombPos.y);
            //移動場所を指定
            var moveY = -SCREEN_HEIGHT;
            var miniBombPos = Vector2(moveX, moveY); //ベクトル取得
            miniBomb.rotation = G_HELPER_GET_DEGREE(miniBomb, miniBombPos); //2点の位置から角度を求める

            miniBomb.tweener.moveTo(moveX, moveY, 3000).play();
            moveX = moveX + 160;
            miniBomb.update = function() {
              // ヒット判定
              G_STG_BULLET_HIT_ENEMY(this,true,true); //削除時 エフェクトを有効
              if(target == 0) G_STG_BULLET_HIT_PLAYER_ENEMY(this,true,true);
              else G_STG_BULLET_HIT_PLAYER(this,true,true);
              //範囲を超えていた場合、削除
              if(this != null && this.y <= -(SCREEN_HEIGHT / 1.25)){
                this.remove();
              }
            };
          }
        }
      };
    }
    break;
    default:
    {

    }
    break;
  }
}

function G_STG_CHECK_POP_ENEMY(parentBase,stgMasterData,stgEnemyMasterDatas,stgSetEnemyMasterDatas,time){ //敵機の生成時間かチェックを行う。 time:ステージの経過時間
  for (var i = 0; i < stgSetEnemyMasterDatas.length; i++) {
    if(parseInt(stgSetEnemyMasterDatas[i]['pop_time']) <= parseInt(time)){ //出現時間と同じか超えている場合
      var enemyPopFlag = true;
      for (var p = 0; p < STG_POP_ENEMY_SHIP_LIST.length; p++) {
        if(parseInt(STG_POP_ENEMY_SHIP_LIST[p]) == parseInt(stgSetEnemyMasterDatas[i]['unique_id'])){
          enemyPopFlag = false;
          break;
        }
      }
      if(enemyPopFlag == true){ //見出現の敵機の場合、敵機を生成
        STG_POP_ENEMY_SHIP_LIST[STG_POP_ENEMY_SHIP_LIST.length] = stgSetEnemyMasterDatas[i]['unique_id'];
        var stgEnemyMasterData = null;
        for (var e = 0; e < stgEnemyMasterDatas.length; e++) {
          if(parseInt(stgEnemyMasterDatas[e]['stg_enemy_id']) == stgSetEnemyMasterDatas[i]['stg_enemy_id']){
            stgEnemyMasterData = stgEnemyMasterDatas[e];
            break;
          }
        }
        if(stgEnemyMasterData != null) G_STG_CREATE_ENEMY_SHIPS(parentBase,stgMasterData,stgEnemyMasterData,stgSetEnemyMasterDatas[i]['pop_pos_x']);
      }
    }
    //ボス演出チェック
    if(parseInt(stgSetEnemyMasterDatas[i]['stg_enemy_type']) == 1){
      if(parseInt(stgSetEnemyMasterDatas[i]['pop_time'] - 10) <= parseInt(time)){ //発生10秒前の場合
        if(!isset(stgSetEnemyMasterDatas[i]['boss_anim'])){ //ボスアニメーション開始前の場合
          stgSetEnemyMasterDatas[i]['boss_anim'] = 1; //配列作成のため、適当な数値を挿入
          if(STG_STARGE_START_ANIM['stage_start_boss_font'].visible == false) G_STG_STAGE_BOSS_START_ANIM_START(); //ボスアニメを開始
        }
      }
    }
  }
}

function G_STG_CREATE_ENEMY_SHIPS(parentBase,stgMasterData,stgEnemyMasterData,popPosX){ //敵機を作成
  var enemyShip = null;
  //敵機IDにより、処理を分岐
  switch (parseInt(stgEnemyMasterData['stg_enemy_id'])) {
    case 1:
    {
      enemyShip = G_ASSET_GET_SPRITE_ANIM("mount_stg_enemy_anim_1",150);
      enemyShip['stg_enemy_id'] = parseInt(stgEnemyMasterData['stg_enemy_id']);
      enemyShip['stg_enemy_score'] = parseInt(stgEnemyMasterData['stg_enemy_score']);
      enemyShip['enemy_ship_max_hp'] = stgEnemyMasterData['stg_enemy_hp'];
      enemyShip['enemy_ship_now_hp'] = stgEnemyMasterData['stg_enemy_hp'];
      enemyShip['enemy_atk'] = stgEnemyMasterData['stg_enemy_atk'];
      enemyShip['enemy_weapon_max_frame'] = 1000; //発射待機時間
      enemyShip['enemy_weapon_frame'] = 0;
      enemyShip['hp_gauge'] = Gauge({
        x: 0, y: 0,// x,y座標
        width: 100,            // 横サイズ
        height: 10,            // 縦サイズ
        maxValue: 100,         // ゲージ最大値
        value: 100,         // ゲージ初期値
        fill: 'white',         // 後ろの色
        gaugeColor: 'red', // ゲージ色
        stroke: 'black',      // 枠色
        strokeWidth: 4,        // 枠太さ
      }).addChildTo(enemyShip);
      enemyShip['hp_gauge'].x = enemyShip['hp_gauge'].x + ((enemyShip.width / 2) + (enemyShip['hp_gauge'].width / 2));
      enemyShip['hp_gauge'].y = enemyShip['hp_gauge'].y + ((enemyShip.height / 2) + (enemyShip['hp_gauge'].height / 2));
      enemyShip['hp_gauge'].visible = false;
      enemyShip['hp_gauge']['active_anim_flag'] = false;
      enemyShip['hp_gauge']['active_gauge_frame'] = 0;
      enemyShip.addChildTo(parentBase);
      if(enemyShip != null){
        enemyShip.x = parseInt(popPosX);
        enemyShip.y = enemyShip.y - (SCREEN_HEIGHT / 2);
        enemyShip.tweener.moveBy(0, 200, 200).wait(5000).moveBy(0, 1000, 1500).call(function(){
          this.target.visible = false;
          this.target.x = -9999;
          this.target.y = -9999;
          this.target.remove();
        });
      }
      enemyShip.update = function(app) {
        //HPゲージ表示アニメーションを開始する条件だった場合
        if(this['hp_gauge'].visible == true && this['hp_gauge']['active_anim_flag'] == false){
          this['hp_gauge']['active_anim_flag'] = true;
        }
        if(this['hp_gauge']['active_anim_flag'] == true){ //フレームを更新
          if(1000 <= this['hp_gauge']['active_gauge_frame']){ //リミットに達した場合、ゲージを非表示
            this['hp_gauge'].visible = false;
            this['hp_gauge']['active_anim_flag'] = false;
            this['hp_gauge']['active_gauge_frame'] = 0;
          }
          else this['hp_gauge']['active_gauge_frame'] += app.deltaTime;
        }
        //体当たり
        if(0 < this['enemy_ship_now_hp']){
          //当たり判定
          if(this.hitTestElement(STG_MY_SHIP['hit_box'])){
            //自滅
            G_STG_ENEMY_SHIP_DIE(STG_OBJECT_LAYER,this);
            //自機へのダメージ
            G_STG_MY_SHIP_DAMAGE(parseInt(this['enemy_atk']));
          }
        }
        //通常攻撃開始判定
        this['enemy_weapon_frame'] += app.deltaTime;
        if(this['enemy_weapon_max_frame'] <= this['enemy_weapon_frame']){
          this['enemy_weapon_frame'] = 0;
          //通常攻撃開始
          G_STG_CREATE_ENEMY_BULLET(parentBase,this,STG_MY_SHIP,1);
        }
      };
    }
    break;
    case 2: //テストボス
    {
      enemyShip = G_ASSET_GET_SPRITE_ANIM("mount_stg_enemy_anim_2",150);
      enemyShip['stg_enemy_id'] = parseInt(stgEnemyMasterData['stg_enemy_id']);
      enemyShip['stg_enemy_score'] = parseInt(stgEnemyMasterData['stg_enemy_score']);
      enemyShip['enemy_ship_max_hp'] = stgEnemyMasterData['stg_enemy_hp'];
      enemyShip['enemy_ship_now_hp'] = stgEnemyMasterData['stg_enemy_hp'];
      enemyShip['enemy_atk'] = stgEnemyMasterData['stg_enemy_atk'];
      enemyShip['enemy_weapon_max_frame'] = 1000; //発射待機時間
      enemyShip['enemy_weapon_frame'] = 0;
      enemyShip['hp_gauge'] = Gauge({
        x: 0, y: 0,// x,y座標
        width: 100,            // 横サイズ
        height: 10,            // 縦サイズ
        maxValue: 100,         // ゲージ最大値
        value: 100,         // ゲージ初期値
        fill: 'white',         // 後ろの色
        gaugeColor: 'red', // ゲージ色
        stroke: 'black',      // 枠色
        strokeWidth: 4,        // 枠太さ
      }).addChildTo(enemyShip);
      enemyShip['hp_gauge'].x = enemyShip['hp_gauge'].x;
      enemyShip['hp_gauge'].y = enemyShip['hp_gauge'].y;
      enemyShip['hp_gauge'].visible = false;
      enemyShip['hp_gauge']['active_anim_flag'] = false;
      enemyShip['hp_gauge']['active_gauge_frame'] = 0;
      enemyShip.addChildTo(parentBase);
      if(enemyShip != null){
        enemyShip.x = parseInt(popPosX);
        enemyShip.y = enemyShip.y - (SCREEN_HEIGHT / 2);
        enemyShip.tweener.moveBy(0, 200, 1000).wait(10000).moveBy(0, 1000, 1500).call(function(){
          this.target.visible = false;
          this.target.x = -9999;
          this.target.y = -9999;
          this.target.remove();
        });
      }
      enemyShip.update = function(app) {
        //HPゲージ表示アニメーションを開始する条件だった場合
        if(this['hp_gauge'].visible == true && this['hp_gauge']['active_anim_flag'] == false){
          this['hp_gauge']['active_anim_flag'] = true;
        }
        if(this['hp_gauge']['active_anim_flag'] == true){ //フレームを更新
          if(1000 <= this['hp_gauge']['active_gauge_frame']){ //リミットに達した場合、ゲージを非表示
            this['hp_gauge'].visible = false;
            this['hp_gauge']['active_anim_flag'] = false;
            this['hp_gauge']['active_gauge_frame'] = 0;
          }
          else this['hp_gauge']['active_gauge_frame'] += app.deltaTime;
        }
        //体当たり
        if(0 < this['enemy_ship_now_hp']){
          //当たり判定
          if(this.hitTestElement(STG_MY_SHIP['hit_box'])){
            //自滅
            G_STG_ENEMY_SHIP_DIE(STG_OBJECT_LAYER,this);
            //自機へのダメージ
            G_STG_MY_SHIP_DAMAGE(parseInt(this['enemy_atk']));
          }
        }
        //通常攻撃開始判定
        this['enemy_weapon_frame'] += app.deltaTime;
        if(this['enemy_weapon_max_frame'] <= this['enemy_weapon_frame']){
          this['enemy_weapon_frame'] = 0;
          //通常攻撃開始
          G_STG_CREATE_ENEMY_BULLET(parentBase,this,STG_MY_SHIP,1);
        }
      };
    }
    break;
    case 3:
    break;
    default:
    break;
  }

  if(enemyShip != null) STG_ENEMY_SHIP_INSTANCE_ARRAY[STG_ENEMY_SHIP_INSTANCE_ARRAY.length] = enemyShip;
}

function G_STG_BULLET_HIT_ENEMY(bullet,bulletDelete = true,effect = false){ //敵に弾が当たったか、判定を行う。delete:当たった時に弾を削除するか effect:削除時のエフェクトアニメ
  // ヒット判定
  console.log(STG_ENEMY_SHIP_INSTANCE_ARRAY);
  for (var i = 0; i < STG_ENEMY_SHIP_INSTANCE_ARRAY.length; i++) {
    if (bullet.hitTestElement(STG_ENEMY_SHIP_INSTANCE_ARRAY[i])) {
      STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['hp_gauge'].visible = true;
      STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_now_hp'] = parseInt(STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_now_hp'] - bullet['bullet_damage']);
      if(STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_now_hp'] <= 0){
        STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_now_hp'] = 0;
        //エネミー消滅処理
        G_STG_ENEMY_SHIP_DIE(STG_OBJECT_LAYER,STG_ENEMY_SHIP_INSTANCE_ARRAY[i]);
      }
      STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['hp_gauge'].value = parseInt(STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_now_hp'] / STG_ENEMY_SHIP_INSTANCE_ARRAY[i]['enemy_ship_max_hp'] * 100);
      if(bulletDelete == true){
        if(effect == true){ //削除時のエフェクトが有効か
          var getEffectSize = bullet.width;
          if(getEffectSize < bullet.height) getEffectSize = bullet.height;
          var bulletEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,getEffectSize,getEffectSize);
          if(bulletEffect != null){
            bulletEffect.addChildTo(STG_OBJECT_LAYER);
            bulletEffect.x = bullet.x;
            bulletEffect.y = bullet.y;
          }
        }
        bullet.remove();
        bullet = null;
        break;
      }
    }
  }
}

function G_STG_ENEMY_SHIP_DIE(parentBase,enemyShip){ //敵機を倒した場合呼ばれる関数
  if(enemyShip == null || !isset(enemyShip['stg_enemy_id'])) return;
  //スコア加算
  if(isset(enemyShip['stg_enemy_score']) && STG_SCORE_LABEL != null) {
    var nowScore = parseInt(STG_SCORE_LABEL['score']);
    nowScore = nowScore + parseInt(enemyShip['stg_enemy_score']);
    STG_SCORE_LABEL['score'] = nowScore;
    STG_SCORE_LABEL.text = "SCORE:" + STG_SCORE_LABEL['score'];
  }
  //敵のIDにより、処理を分岐
  switch (parseInt(enemyShip['stg_enemy_id'])) {
    case 9999:
    {

    }
    break;
    default: //特に指定されていない場合は、デフォルト爆発
    {
      var dieEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,enemyShip.width,enemyShip.height);
      if(dieEffect != null){
        dieEffect.addChildTo(parentBase);
        dieEffect.x = enemyShip.x;
        dieEffect.y = enemyShip.y;
      }
      enemyShip.visible = false;
      enemyShip.x = -9999;
      enemyShip.y = -9999;
      enemyShip.remove();
      enemyShip = null;
    }
    break;
  }
}

function G_STG_ENEMY_PLAYER_DIE(parentBase,enemyPlayerShip){ //敵プレイヤー消滅処理
  if(enemyPlayerShip != null){
    //スコア加算
    if(STG_SCORE_LABEL != null) {
      var nowScore = parseInt(STG_SCORE_LABEL['score']);
      nowScore = nowScore + parseInt(STG_MAX_SCORE);
      STG_SCORE_LABEL['score'] = nowScore;
      STG_SCORE_LABEL.text = "SCORE:" + STG_SCORE_LABEL['score'];
    }
    var dieEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,enemyPlayerShip.width,enemyPlayerShip.height);
    if(dieEffect != null){
      dieEffect.addChildTo(parentBase);
      dieEffect.x = enemyPlayerShip.x;
      dieEffect.y = enemyPlayerShip.y;
    }
    enemyPlayerShip.visible = false;
    enemyPlayerShip.x = -9999;
    enemyPlayerShip.y = -9999;
    enemyPlayerShip.remove();
    enemyPlayerShip = null;
    //PVPステップを変更
    STG_PVP_STEP = 7;
  }
}

function G_STG_MY_SHIP_DAMAGE(damage){ //自機がダメージを受けた時に呼ばれる関数
  //STG_MY_HP_GAUGE
  var maxHp = parseInt(STG_MY_SHIP['player_mount_data']['status_hp']);
  var nowHp = parseInt(STG_MY_SHIP['now_hp']);
  nowHp = nowHp - damage;
  //HPが0か0以下になった。
  if(nowHp <= 0){
    nowHp = 0;
    if(STG_GAME_OVER_FLAG == false && STG_STAGE_CLEAR_FLAG == false){
      STG_GAME_OVER_FLAG = true;
      //ゲームオーバー処理をここに記載
      G_STG_GAME_OVER(PHINA_APP);
      //PVPで負けた場合、相手に燃料を付与
      if(STG_PVP_FLAG == true){
        STG_PVP_STEP = 8;
      }
    }
  }

  var updateGaugeVal = parseInt((nowHp / maxHp) * 100);
  STG_MY_SHIP['now_hp'] = nowHp;
  STG_MY_HP_GAUGE.value = updateGaugeVal;
  if(STG_MY_SHIP['damage_anim_step'] == -1 || STG_MY_SHIP['damage_anim_step'] == 2) STG_MY_SHIP['damage_anim_step'] = 0; //ダーメージアニメーションを開始
}

function G_STG_CREATE_ENEMY_BULLET(parentBase,enemyShip,myShip,bulletType){ //敵機の銃弾を作成
  switch (parseInt(bulletType)) { //弾タイプにより処理を分岐
    case 1:
    {
      var bullet = Sprite('ASSET_489').addChildTo(parentBase);
      bullet.x = enemyShip.x;
      bullet.y = enemyShip.y;
      bullet.tweener.moveTo(myShip.x, myShip.y + 200, 2000).call(function(){
        this.target.visible = false;
        this.target.x = -9999;
        this.target.y = -9999;
        this.target.remove();
      });
      bullet.update = function(app) {
        if(this.hitTestElement(myShip['hit_box'])){
          //自機へのダメージ
          this.x = -9999;
          this.y = -9999;
          this.remove();
          G_STG_MY_SHIP_DAMAGE(parseInt(enemyShip['enemy_atk']));
        }
      };
    }
    break;
    default:
    break;
  }
}

function G_STG_CREATE_STAGE_START_ANIM(parentBase){ //ステージ開始アニメーションを作成し、開始する。
  STG_STARGE_START_ANIM = PlainElement({}).addChildTo(parentBase);
  STG_STARGE_START_ANIM['delta_frame'] = 0;
  STG_STARGE_START_ANIM['start_anim_visible'] = false;

  //背景赤半透明
  STG_STARGE_START_ANIM['bg_red'] = RectangleShape().addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['bg_red']['alpha_switch'] = 0; //0:加算 1:減算
  STG_STARGE_START_ANIM['bg_red'].width = 640;
  STG_STARGE_START_ANIM['bg_red'].height = 960;
  STG_STARGE_START_ANIM['bg_red'].fill = 'red'; // 塗りつぶし色を変更
  STG_STARGE_START_ANIM['bg_red'].strokeWidth = 0; // ストローク幅を変更
  STG_STARGE_START_ANIM['bg_red'].alpha = 0.5;

  //背景キャプション上
  STG_STARGE_START_ANIM['top_caption'] = new Array();

  STG_STARGE_START_ANIM['top_caption'][0] = Sprite('ASSET_505').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['top_caption'][0].y = STG_HEADER.y;
  STG_STARGE_START_ANIM['top_caption'][0].y = STG_STARGE_START_ANIM['top_caption'][0].y + ((STG_HEADER.height / 2) + (STG_STARGE_START_ANIM['top_caption'][0].height / 2));

  STG_STARGE_START_ANIM['top_caption'][1] = Sprite('ASSET_505').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['top_caption'][1].y = STG_STARGE_START_ANIM['top_caption'][0].y;
  STG_STARGE_START_ANIM['top_caption'][1].x = STG_STARGE_START_ANIM['top_caption'][1].x + SCREEN_WIDTH;

  //背景キャプションフォント上
  STG_STARGE_START_ANIM['top_caption_font'] = Sprite('ASSET_506').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['top_caption_font'].y = STG_STARGE_START_ANIM['top_caption'][0].y;


  //背景キャプション下
  STG_STARGE_START_ANIM['bottom_caption'] = new Array();

  STG_STARGE_START_ANIM['bottom_caption'][0] = Sprite('ASSET_505').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['bottom_caption'][0].y = STG_CONTROLE_PANEL.y;
  STG_STARGE_START_ANIM['bottom_caption'][0].y = STG_STARGE_START_ANIM['bottom_caption'][0].y - ((STG_CONTROLE_PANEL.height / 2) + (STG_STARGE_START_ANIM['bottom_caption'][0].height / 2));

  STG_STARGE_START_ANIM['bottom_caption'][1] = Sprite('ASSET_505').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['bottom_caption'][1].y = STG_STARGE_START_ANIM['bottom_caption'][0].y;
  STG_STARGE_START_ANIM['bottom_caption'][1].x = STG_STARGE_START_ANIM['bottom_caption'][1].x - SCREEN_WIDTH;

  //背景キャプションフォント下
  STG_STARGE_START_ANIM['bottom_caption_font'] = Sprite('ASSET_506').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['bottom_caption_font'].y = STG_STARGE_START_ANIM['bottom_caption'][0].y;

  //敵機接近文字画像
  STG_STARGE_START_ANIM['stage_start_font'] = Sprite('ASSET_507').addChildTo(STG_STARGE_START_ANIM);

  //ボス接近中文字画像
  STG_STARGE_START_ANIM['stage_start_boss_font'] = Sprite('ASSET_773').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['stage_start_boss_font'].visible = false;

  //PVP開始文字画像
  STG_STARGE_START_ANIM['stage_start_pvp_font'] = Sprite('ASSET_780').addChildTo(STG_STARGE_START_ANIM);
  STG_STARGE_START_ANIM['stage_start_pvp_font'].visible = false;


  G_STG_STAGE_START_ANIM_VISIBLE(false);

  STG_STARGE_START_ANIM.update = function() {
    if(this['start_anim_visible'] == false) return;
    this['delta_frame'] += PHINA_APP.deltaTime;
    if(0.01 <= this['delta_frame']){
      this['delta_frame'] = 0;
      STG_STARGE_START_ANIM['top_caption'][0].x = STG_STARGE_START_ANIM['top_caption'][0].x - 4;
      if(STG_STARGE_START_ANIM['top_caption'][0].x <= -SCREEN_WIDTH){
        STG_STARGE_START_ANIM['top_caption'][0].x = SCREEN_WIDTH;
      }
      STG_STARGE_START_ANIM['top_caption'][1].x = STG_STARGE_START_ANIM['top_caption'][1].x - 4;
      if(STG_STARGE_START_ANIM['top_caption'][1].x <= -SCREEN_WIDTH){
        STG_STARGE_START_ANIM['top_caption'][1].x = SCREEN_WIDTH;
      }
      STG_STARGE_START_ANIM['bottom_caption'][0].x = STG_STARGE_START_ANIM['bottom_caption'][0].x + 4;
      if(SCREEN_WIDTH <= STG_STARGE_START_ANIM['bottom_caption'][0].x){
        STG_STARGE_START_ANIM['bottom_caption'][0].x = (-1 * SCREEN_WIDTH);
      }
      STG_STARGE_START_ANIM['bottom_caption'][1].x = STG_STARGE_START_ANIM['bottom_caption'][1].x + 4;
      if(SCREEN_WIDTH <= STG_STARGE_START_ANIM['bottom_caption'][1].x){
        STG_STARGE_START_ANIM['bottom_caption'][1].x = (-1 * SCREEN_WIDTH);
      }
      //背景赤
      if(this['bg_red']['alpha_switch'] == 0) {
        this['bg_red'].alpha = this['bg_red'].alpha + 0.05;
        if(0.5 <= this['bg_red'].alpha) this['bg_red']['alpha_switch'] = 1; //減算に切り替え
      }
      else{
        this['bg_red'].alpha = this['bg_red'].alpha - 0.05;
        if(this['bg_red'].alpha <= 0) this['bg_red']['alpha_switch'] = 0; //加算に切り替え
      }
    }
  };
}

function G_STG_STAGE_START_ANIM_VISIBLE(visible){ //ステージ開始シーンアニメーションが有効か
  if(STG_STARGE_START_ANIM != null){
    STG_START_ANIM_VISIBLE = visible;
    STG_STARGE_START_ANIM['stage_start_font'].visible = visible;
    STG_STARGE_START_ANIM['bg_red'].alpha = 0;
    STG_STARGE_START_ANIM['bg_red']['alpha_switch'] = 0;
    STG_STARGE_START_ANIM['top_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['top_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['top_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['start_anim_visible'] = visible;
  }
}

function G_STG_STAGE_START_ANIM_START(){ //ステージ開始アニメーションを開始する。
  if(STG_STARGE_START_ANIM != null){
    G_STG_STAGE_START_ANIM_VISIBLE(true);
    STG_STARGE_START_ANIM['stage_start_font'].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['top_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['stage_start_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['stage_start_font'].tweener.call(function(){
      G_STG_STAGE_START_ANIM_VISIBLE(false);
    });
  }
}

function G_STG_STAGE_BOSS_ANIM_VISIBLE(visible){ //BOSS開始シーンアニメーションが有効か
  if(STG_STARGE_START_ANIM != null){
    STG_START_ANIM_VISIBLE = visible;
    STG_STARGE_START_ANIM['stage_start_boss_font'].visible = visible;
    STG_STARGE_START_ANIM['bg_red'].alpha = 0;
    STG_STARGE_START_ANIM['bg_red']['alpha_switch'] = 0;
    STG_STARGE_START_ANIM['top_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['top_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['top_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['start_anim_visible'] = visible;
  }
}

function G_STG_STAGE_BOSS_START_ANIM_START(){ //ボス開始アニメーションを開始する。
  if(STG_STARGE_START_ANIM != null){
    G_STG_STAGE_BOSS_ANIM_VISIBLE(true);
    STG_STARGE_START_ANIM['stage_start_boss_font'].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['top_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['stage_start_boss_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['stage_start_boss_font'].tweener.call(function(){
      G_STG_STAGE_BOSS_ANIM_VISIBLE(false);
    });
  }
}

function G_STG_STAGE_PVP_ANIM_VISIBLE(visible){ //BOSS開始シーンアニメーションが有効か
  if(STG_STARGE_START_ANIM != null){
    STG_START_ANIM_VISIBLE = visible;
    STG_STARGE_START_ANIM['stage_start_pvp_font'].visible = visible;
    STG_STARGE_START_ANIM['bg_red'].alpha = 0;
    STG_STARGE_START_ANIM['bg_red']['alpha_switch'] = 0;
    STG_STARGE_START_ANIM['top_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['top_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['top_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][0].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption'][1].visible = visible;
    STG_STARGE_START_ANIM['bottom_caption_font'].visible = visible;
    STG_STARGE_START_ANIM['start_anim_visible'] = visible;
  }
}

function G_STG_STAGE_PVP_START_ANIM_START(){ //PVP開始アニメーションを開始する。
  if(STG_STARGE_START_ANIM != null){
    G_STG_STAGE_PVP_ANIM_VISIBLE(true);
    STG_STARGE_START_ANIM['stage_start_pvp_font'].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['top_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['top_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][0].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption'][1].alpha = 0;
    STG_STARGE_START_ANIM['bottom_caption_font'].alpha = 0;
    STG_STARGE_START_ANIM['stage_start_pvp_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['top_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][0].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption'][1].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['bottom_caption_font'].tweener.fadeIn(2000).wait(3000).fadeOut(2000).play();
    STG_STARGE_START_ANIM['stage_start_pvp_font'].tweener.call(function(){
      G_STG_STAGE_PVP_ANIM_VISIBLE(false);
    });
  }
}

function G_STG_CHANGE_STAGE_TIME_LIMIT_TEXT(limitTime){ //ステージ秒数をテキスト形式に変換
  var result = "00:00";
  var sec = (limitTime % 60) % 60;
  var min = Math.floor(limitTime / 60) % 60;
  result = G_HELPER_ZERO_PADDING(min,2) + ":" + G_HELPER_ZERO_PADDING(sec,2);
  return result;
}

function G_STG_GET_CLEAR_RANK(score,maxScore){ //愛大スコアと獲得スコアから、ランクを取得する。
  console.log("スコア");
  console.log(score);
  console.log(maxScore);
  var rank = 1;
  var parcentage = parseInt((score / maxScore) * 100);
  if(100 <= parcentage) rank = 5; //S
  else if(80 <= parcentage) rank = 4; //A
  else if(60 <= parcentage) rank = 3; //B
  else if(40 <= parcentage) rank = 2; //c
  else rank = 1; //D
  return rank;
}

function G_STG_CREATE_STG_DROP_LIST(parentBase,dropDatas){ //ドロップリストを表示
  //ドロップアイテム表示処理
  var resultText = "";
  for (var i = 0; i < dropDatas.length; i++) {
    resultText = resultText + "\n・" + dropDatas[i]['drop_item_name'] + " x " + dropDatas[i]['drop_val'];
  }
  var dropListLabel = Label({
    text: resultText,
    fontSize: 36,
    fill: 'white',
  });
  console.log("ドロップリスト表示");
  G_UI_CREATE_LIST(parentBase,dropListLabel,dropListLabel.calcCanvasHeight(),"ドロップリスト","閉じる"); //リストを表示
}

function G_STG_CREATE_RESULT_WINDOW(parentBase,score,maxScore){ //リザルト画面を表示する
  var rank = G_STG_GET_CLEAR_RANK(score,maxScore);
  if(STG_RESULT_WINDOW != null){
    G_STG_DELETE_RESULT_WINDOW();
  }
  //マスクを生成
  STG_RESULT_WINDOW = Sprite('ASSET_64').addChildTo(parentBase);
  //ウィンドウ背景を表示
  STG_RESULT_WINDOW['window_bg'] = Sprite('ASSET_599').addChildTo(parentBase);
  STG_RESULT_WINDOW['window_bg'].y = STG_RESULT_WINDOW['window_bg'].y - (STG_RESULT_WINDOW['window_bg'].height * 0.1);
  //エリア名+エリアタイプ表示ラベル
  STG_RESULT_WINDOW['title_label'] = Label({
    text: '',
    fontSize: 32,
    fill: 'black',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['title_label'].y = STG_RESULT_WINDOW['title_label'].y - (STG_RESULT_WINDOW['window_bg'].height * 0.35);
  if(STG_MASTER_DATA != null) STG_RESULT_WINDOW['title_label'].text = STG_MASTER_DATA['stage_name'];

  //スコアラベル
  STG_RESULT_WINDOW['score_label'] = Label({
    text: 'SCORE：',
    fontSize: 48,
    fill: 'white',
    align: 'left',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['score_label'].x = STG_RESULT_WINDOW['score_label'].x - (STG_RESULT_WINDOW['window_bg'].width / 2.5);
  STG_RESULT_WINDOW['score_label'].y = STG_RESULT_WINDOW['score_label'].y - (STG_RESULT_WINDOW['window_bg'].height * 0.2);
  //スコア数値ラベル
  STG_RESULT_WINDOW['score_val_label'] = Label({
    text: '0',
    fontSize: 48,
    fill: 'white',
    align: 'right',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['score_val_label'].x = STG_RESULT_WINDOW['score_val_label'].x + (STG_RESULT_WINDOW['window_bg'].width / 2.5);
  STG_RESULT_WINDOW['score_val_label'].y = STG_RESULT_WINDOW['score_label'].y;
  //クリアランクラベル
  STG_RESULT_WINDOW['clear_rank_label'] = Label({
    text: 'CLEAR RANK：',
    fontSize: 48,
    fill: 'white',
    align: 'left',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['clear_rank_label'].x = STG_RESULT_WINDOW['score_label'].x;
  STG_RESULT_WINDOW['clear_rank_label'].y = STG_RESULT_WINDOW['clear_rank_label'].y + (STG_RESULT_WINDOW['window_bg'].height * 0.05);
  //ボーナスラベル
  STG_RESULT_WINDOW['bonus_label'] = Label({
    text: 'RANK BONUS：',
    fontSize: 40,
    fill: 'white',
    align: 'left',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['bonus_label'].x = STG_RESULT_WINDOW['score_label'].x;
  STG_RESULT_WINDOW['bonus_label'].y = STG_RESULT_WINDOW['bonus_label'].y + (STG_RESULT_WINDOW['window_bg'].height * 0.25);
  //ボーナス内容ラベル
  STG_RESULT_WINDOW['bonus_val_label'] = Label({
    text: '',
    fontSize: 40,
    fill: 'white',
    align: 'right',
  }).addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['bonus_val_label'].x = STG_RESULT_WINDOW['score_val_label'].x;
  STG_RESULT_WINDOW['bonus_val_label'].y = STG_RESULT_WINDOW['bonus_label'].y;
  STG_RESULT_WINDOW['bonus_val_label'].y = STG_RESULT_WINDOW['bonus_val_label'].y + STG_RESULT_WINDOW['bonus_val_label'].height;
  STG_RESULT_WINDOW['bonus_val_label'].alpha = 0;
  var rankBonusText = "なし";
  switch (rank) {
    case 1:
    case 2:
    break;
    case 3:
    rankBonusText = "移動時間短縮 1.1倍";
    break;
    case 4:
    rankBonusText = "移動時間短縮 1.3倍";
    break;
    case 5:
    rankBonusText = "移動時間短縮 1.5倍";
    break;
    default:
    break;
  }
  STG_RESULT_WINDOW['bonus_val_label'].text = rankBonusText;
  //閉じるボタン
  STG_RESULT_WINDOW['close_btn'] = Sprite('ASSET_79').addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['close_btn'].y = STG_RESULT_WINDOW['close_btn'].y + ((STG_RESULT_WINDOW['window_bg'].height / 2) + (STG_RESULT_WINDOW['close_btn'].height / 2));
  STG_RESULT_WINDOW['close_btn']['label'] = Label({
    text: '閉じる',
    fontSize: 32,
    fill: 'white',
  }).addChildTo(STG_RESULT_WINDOW['close_btn']);
  STG_RESULT_WINDOW['close_btn']['btn'] = Button({
    width: 86,         // 横サイズ
    height: 86,        // 縦サイズ
  }).addChildTo(STG_RESULT_WINDOW['close_btn']);
  STG_RESULT_WINDOW['close_btn']['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
    if(STG_RESULT_WINDOW != null){
      G_STG_DELETE_RESULT_WINDOW(); //結果画面を削除
      STG_CLEAR_STEP = 3; //ドロップリスト表示ステップへ
    }
  };
  STG_RESULT_WINDOW['close_btn']['btn'].visible = false;
  //スコアカウントアップ用のダミースプライト
  STG_RESULT_WINDOW['dummy_spr'] = Sprite('ASSET_245').addChildTo(STG_RESULT_WINDOW['window_bg']);
  STG_RESULT_WINDOW['dummy_spr'].x = 0;
  STG_RESULT_WINDOW['dummy_spr']['rank'] = rank;
  STG_RESULT_WINDOW['dummy_spr'].tweener.wait(1000).moveBy(score, 0, 3000).wait(500).call(function(){
    //スコアランク表示アニメーションを開始
    var tag = "";
    switch (parseInt(this.target['rank'])) {
      case 1:
      tag = "stg_ui_anim_6";
      break;
      case 2:
      tag = "stg_ui_anim_5";
      break;
      case 3:
      tag = "stg_ui_anim_4";
      break;
      case 4:
      tag = "stg_ui_anim_2";
      break;
      case 5:
      tag = "stg_ui_anim_3";
      break;
      default:
      break;
    }
    var rankAnim = G_ASSET_GET_SPRITE_ANIM(tag,50,false,false);
    rankAnim.addChildTo(STG_RESULT_WINDOW['window_bg']);
    rankAnim.x = rankAnim.x + ((STG_RESULT_WINDOW['window_bg'].width / 2) - rankAnim.width);
    rankAnim.y = STG_RESULT_WINDOW['clear_rank_label'].y;
    rankAnim.y = rankAnim.y - (rankAnim.height / 3);
  }).wait(1500).call(function(){
    STG_RESULT_WINDOW['bonus_val_label'].tweener.to({ alpha: 1 },750).play();
  });
  STG_RESULT_WINDOW['score_val_label']['update_score'] = 0;
  STG_RESULT_WINDOW['score_val_label'].update = function() {
    //カウントアップ確認アニメーション
    if(STG_RESULT_WINDOW != null && this['update_score'] != parseInt(STG_RESULT_WINDOW['dummy_spr'].x)){
      this['update_score'] = parseInt(STG_RESULT_WINDOW['dummy_spr'].x);
      STG_RESULT_WINDOW['score_val_label'].text = parseInt(STG_RESULT_WINDOW['dummy_spr'].x);
    }
  };
}

function G_STG_CLEAR_STEP(step){ //クリア後の制御処理
  switch (step) {
    case 0: //リザルト表示前
    break;
    case 1: //制圧完了アニメーションを開始
    {
      var getSpr = Sprite('ASSET_598'); //大きさ取得のためだけに使用
      getSpr.width = getSpr.width * 2;
      getSpr.height = getSpr.height * 2;
      var clearAnim = G_ASSET_GET_SPRITE_ANIM("stg_ui_anim_1",10,false,true,getSpr.width,getSpr.height);
      clearAnim.addChildTo(STG_ANIM_UI_LAYER);
      clearAnim.y = clearAnim.y - (SCREEN_HEIGHT / 4);
      //アニメーション完了後、ドロップリストを表示
      if(isset(STG_RESULT_STG_CLEAR['drop_datas'])) STG_DROP_DATAS = STG_RESULT_STG_CLEAR['drop_datas']; //ドロップアイテム情報をセット
      STG_SCENE_INSTANCE.tweener.wait(3000).call(function(){
        G_STG_CREATE_RESULT_WINDOW(STG_UI_LAYER,STG_SCORE_LABEL['score'],STG_MAX_SCORE);
      });
      STG_CLEAR_STEP = 2;
    }
    break;
    case 2: //クリア演出終了待ち
    break;
    case 3: //ドロップリストを表示
    {
      if(STG_DROP_DATAS != null) {
        G_STG_CREATE_STG_DROP_LIST(STG_UI_LAYER,STG_DROP_DATAS);
        STG_CLEAR_STEP = 4;
      }
      else{
        STG_CLEAR_STEP = 4;
      }
    }
    break;
    case 4:
    {
      if(WINDOW_LIST == null){
        console.log("STGシーン終了処理へ");
        STG_SCENE_INSTANCE.exit("myPage");
        STG_CLEAR_STEP = 5;
      }
    }
    break;
    case 5:
    {

    }
    break;
    default:
    break;
  }
}

function G_STG_DELETE_RESULT_WINDOW(){ //STG結果ウィンドウを削除する
  if(STG_RESULT_WINDOW != null){
    if(isset(STG_RESULT_WINDOW['title_label']) && STG_RESULT_WINDOW['title_label'] != null){
      STG_RESULT_WINDOW['title_label'].remove();
      STG_RESULT_WINDOW['title_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['score_label']) && STG_RESULT_WINDOW['score_label'] != null){
      STG_RESULT_WINDOW['score_label'].remove();
      STG_RESULT_WINDOW['score_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['score_val_label']) && STG_RESULT_WINDOW['score_val_label'] != null){
      STG_RESULT_WINDOW['score_val_label'].remove();
      STG_RESULT_WINDOW['score_val_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['clear_rank_label']) && STG_RESULT_WINDOW['clear_rank_label'] != null){
      STG_RESULT_WINDOW['clear_rank_label'].remove();
      STG_RESULT_WINDOW['clear_rank_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['bonus_label']) && STG_RESULT_WINDOW['bonus_label'] != null){
      STG_RESULT_WINDOW['bonus_label'].remove();
      STG_RESULT_WINDOW['bonus_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['bonus_val_label']) && STG_RESULT_WINDOW['bonus_val_label'] != null){
      STG_RESULT_WINDOW['bonus_val_label'].remove();
      STG_RESULT_WINDOW['bonus_val_label'] = null;
    }
    if(isset(STG_RESULT_WINDOW['close_btn']) && STG_RESULT_WINDOW['close_btn'] != null){
      STG_RESULT_WINDOW['close_btn'].remove();
      STG_RESULT_WINDOW['close_btn'] = null;
    }
    if(isset(STG_RESULT_WINDOW['dummy_spr']) && STG_RESULT_WINDOW['dummy_spr'] != null){
      STG_RESULT_WINDOW['dummy_spr'].remove();
      STG_RESULT_WINDOW['dummy_spr'] = null;
    }
    if(isset(STG_RESULT_WINDOW['window_bg']) && STG_RESULT_WINDOW['window_bg'] != null){
      STG_RESULT_WINDOW['window_bg'].remove();
      STG_RESULT_WINDOW['window_bg'] = null;
    }
    STG_RESULT_WINDOW.remove();
    STG_RESULT_WINDOW = null;
  }
}

function G_STG_GAME_OVER(app){ //ゲームオーバー処理を実行
  //進行時間を停止させる
  STG_STOP_STAGE_TIME = true;
  //自機の操作を不能にする
  STG_MY_SHIP_CONTROLE_FLAG = false;
  //自機を自爆させる
  var dieEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,STG_MY_SHIP.width,STG_MY_SHIP.height);
  if(dieEffect != null){
    dieEffect.addChildTo(STG_OBJECT_LAYER);
    dieEffect.x = STG_MY_SHIP.x;
    dieEffect.y = STG_MY_SHIP.y;
  }
  STG_MY_SHIP.visible = false;
  //画面を暗くする
  var maskSpr = Sprite('ASSET_64').addChildTo(STG_UI_LAYER); //大きさ取得のためだけに使用
  maskSpr.alpha = 0;
  maskSpr.tweener.to({ alpha: 1 },500).call(function(){
    //ゲームオーバーアニメーションを再生
    var getSpr = Sprite('ASSET_681');
    var clearAnim = G_ASSET_GET_SPRITE_ANIM("stg_ui_anim_7",10,false,true,getSpr.width,getSpr.height);
    clearAnim.addChildTo(STG_UI_LAYER);
    console.log("ゲームオーバーアニメーション開始");
  }).wait(3000).call(function(){
    //タップしてシーン移動可能にする処理
    var tapToMypageLabel = Label({
      text: 'タップしてマイページに戻る',
      fontSize: 36,
      fill: 'white',
    }).addChildTo(STG_UI_LAYER);
    //ラベルを点滅させる
    tapToMypageLabel.alpha = 0;
    tapToMypageLabel['alpha_switch'] = false;
    tapToMypageLabel['delta_frame'] = 0;
    tapToMypageLabel.update = function(app) {
      this['delta_frame'] += app.deltaTime;
      if(1 <= this['delta_frame']){
        this['delta_frame'] = 0;
        if(this['alpha_switch'] == false){
          this.alpha = this.alpha + 0.05;
          if(1 <= this.alpha){
            this['alpha_switch'] = true;
          }
        }
        else{
          this.alpha = this.alpha - 0.05;
          if(this.alpha <= 0){
            this['alpha_switch'] = false;
          }
        }
      }
    };
    //ボタン
    var moveMyPageBtn = STG_FIRE_BTN['btn'] = Button({
      width: 640,         // 横サイズ
      height: 960,        // 縦サイズ
    }).addChildTo(STG_UI_LAYER);
    moveMyPageBtn.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING == true) return;
      STG_SCENE_INSTANCE.exit("myPage");
    };
    moveMyPageBtn.visible = false;
  });
}

function G_STG_PVP_START(){ //PVPを開始
  if(STG_PVP_FLAG == false && STG_CHECK_AREA_ENEMY == false && STG_START_ANIM_VISIBLE == false && STG_STAGE_CLEAR_FLAG == false && STG_PVP_CLEAR == false){
    STG_PVP_FLAG = true; //フラグをオン
    G_STG_STAGE_PVP_START_ANIM_START(); //開始アニメーションを再生
  }
}

function G_STG_PVP_UPDATE(delta){ //PVPのアップデート関数
  if(STG_PVP_FLAG == true){
    switch (STG_PVP_STEP) {
      case 0: //開始アニメーション再生前。
      {
        if(STG_START_ANIM_VISIBLE == false){
          STG_PVP_STEP = 1;
        }
      }
      break;
      case 1:
      {
        G_CREATE_ENEMY_PLAYER_SHIP();
        if(STG_ENEMY_PLAYER_SHIP != null){
          G_STG_PVP_START_SCENE_START();
          STG_PVP_STEP = 2;
        }
        else{
          console.log("敵生成失敗");
        }
      }
      break;
      case 2:
      {
        //先頭開始待ち
      }
      break;
      case 3: //戦闘中(敵プレイヤー攻撃)
      {
        G_STG_ENEMY_PLAYER_ACTION(delta); //敵プレイヤーの行動
        G_STG_PVP_ESCAPE_GAUGE_UPDATE(delta); //回避ゲージ更新処理
      }
      break;
      case 4: //攻守交代
      {
        if(STG_MY_SHIP != null && STG_ENEMY_PLAYER_SHIP != null){
          STG_MY_SHIP['controle_flag'] = false;
          if(STG_PVP_ROTATION == 0) STG_PVP_ROTATION = 1;
          else STG_PVP_ROTATION = 0;
          G_STG_PVP_START_ROTATION_CHANGE(STG_PVP_ROTATION); //攻守を交代する。
          STG_PVP_STEP = 5;
        }
      }
      break;
      case 5: //攻守交代待ち
      {

      }
      break;
      case 6: //戦闘中(プレイヤー攻撃)
      {

        G_STG_ENEMY_PLAYER_ESCAPE_ACTION(); //敵プレイヤー回避行動
        G_STG_PVP_ESCAPE_GAUGE_UPDATE(delta); //回避ゲージ更新処理
      }
      break;
      case 7: //PVP終了 自分の勝ち
      {
        //PVP終了処理を実行
        G_STG_PVP_FINISH();
        STG_PVP_STEP = -1;
      }
      break;
      case 8: //PVP終了 相手の勝ち
      {
        console.log("abc1");
        STG_PVP_FLAG = false; //通信前にPVP状態を切る
        //敵プレイヤーに報酬を付与
        var postParam = new Object();
        postParam['pvp_win_enemy_player'] = new Object;
        postParam['pvp_win_enemy_player']['player_index_id'] = STG_PVP_MATCHING_DATA['player_index_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/shootingGame/shootingGame.php",postParam); //非同期通信開始
        STG_PVP_STEP = 9; //通信とゲームオーバーアニメ終了待ちステップへ
      }
      break;
      case 9:
      {
        console.log("abc2");
        if(STG_PVP_ENEMY_PLAYER_WIN != null){ //演出終了&結果取得完了
          if(isset(STG_PVP_ENEMY_PLAYER_WIN['error'])){
            if(STG_PVP_ENEMY_PLAYER_WIN['error'] == 0){
              var enemyPlayerName = "";
              if(isset(STG_PVP_ENEMY_PLAYER_WIN['enemy_player_name'])) enemyPlayerName = STG_PVP_ENEMY_PLAYER_WIN['enemy_player_name'];
              G_NORMAL_WINDOW_CREATE(STG_WINDOW_LAYER,enemyPlayerName + "に撃墜された。","移動に消費する燃料を" + enemyPlayerName + "\nに奪われました。",2,"successStgResultPvpEnemyPlayerWinWindow");
            }
            else{ //エラー
              G_NORMAL_WINDOW_CREATE(STG_WINDOW_LAYER,"エラー",STG_PVP_ENEMY_PLAYER_WIN['error_comment'],2,"errorStgResultPvpEnemyPlayerWinWindow");
            }
          }
          STG_PVP_STEP = -1; //PVPステップ終了
        }
      }
      break;
      default:
      break;
    }
  }
}

function G_CREATE_ENEMY_PLAYER_SHIP(){ //敵プレイヤーの自機を生成
  if(STG_PVP_MATCHING_DATA != null){
    if(MASTER_DATA_MOUNT_MASTER != null){
      for (var i = 0; i < MASTER_DATA_MOUNT_MASTER.length; i++) {
        if(parseInt(MASTER_DATA_MOUNT_MASTER[i]['mount_id']) == parseInt(STG_PVP_MATCHING_DATA['mount_id'])){
          mountMasterData = Object.create(MASTER_DATA_MOUNT_MASTER[i]);
          break;
        }
      }
    }
    if(mountMasterData != null){
      STG_ENEMY_PLAYER_SHIP = G_ASSET_GET_SPRITE_ANIM("mount_stg_anim_" + mountMasterData['mount_asset_id'],150);
      STG_ENEMY_PLAYER_SHIP.addChildTo(STG_OBJECT_LAYER);
      STG_ENEMY_PLAYER_SHIP.y = STG_ENEMY_PLAYER_SHIP.y + (SCREEN_HEIGHT / 3.75);
      STG_ENEMY_PLAYER_SHIP.y = STG_ENEMY_PLAYER_SHIP.y + (SCREEN_HEIGHT / 3.75);
      STG_ENEMY_PLAYER_SHIP['player_mount_data'] =  mountMasterData;
      STG_ENEMY_PLAYER_SHIP['hit_box'] = Sprite('ASSET_245').addChildTo(STG_OBJECT_LAYER);
      var cntPoint = (100 - parseInt(mountMasterData['status_controle']));
      if(cntPoint <= 10) cntPoint = 10;
      var cntResult = (parseInt(cntPoint) * 0.01);
      STG_ENEMY_PLAYER_SHIP['hit_box'].width = parseInt(STG_ENEMY_PLAYER_SHIP.width * cntResult);
      STG_ENEMY_PLAYER_SHIP['hit_box'].height = parseInt(STG_ENEMY_PLAYER_SHIP.height * cntResult);
      STG_ENEMY_PLAYER_SHIP['hit_box'].update = function() {
        this.x = STG_ENEMY_PLAYER_SHIP.x;
        this.y = STG_ENEMY_PLAYER_SHIP.y;
      };
      STG_ENEMY_PLAYER_SHIP['main_weapon_visible'] = false;
      STG_ENEMY_PLAYER_SHIP['weapon_controle_flag'] = true; //false:攻撃禁止
      STG_ENEMY_PLAYER_SHIP['main_weapon_frame'] = 0;
      STG_ENEMY_PLAYER_SHIP['main_weapon_combo'] = 0;
      STG_ENEMY_PLAYER_SHIP['now_hp'] = parseInt(mountMasterData['status_hp']);
      STG_ENEMY_PLAYER_SHIP['max_hp'] = parseInt(mountMasterData['status_hp']);
      var bombIntervalTime = 0;
      var bombNum = 0;
      for (var i = 0; i < MASTER_DATA_MOUNT_BOMB_MASTER.length; i++) {
        if(parseInt(MASTER_DATA_MOUNT_BOMB_MASTER[i]['mount_bomb_id']) == parseInt(mountMasterData['bomb_id'])){
          console.log("オブジェクト作成");
          console.log(MASTER_DATA_MOUNT_BOMB_MASTER[i]);
          STG_ENEMY_PLAYER_SHIP['bomb_master_data'] = Object.create(MASTER_DATA_MOUNT_BOMB_MASTER[i]);
          console.log(STG_ENEMY_PLAYER_SHIP['bomb_master_data']);
          console.log("なぜコピーされない");
          console.log(MASTER_DATA_MOUNT_BOMB_MASTER[i]);
          bombIntervalTime = parseInt(MASTER_DATA_MOUNT_BOMB_MASTER[i]['interval_time']);
          bombNum = parseInt(MASTER_DATA_MOUNT_BOMB_MASTER[i]['mount_bomb_num']);
          break;
        }
      }
      STG_ENEMY_PLAYER_SHIP['damage_anim_step'] = -1; //-1:停止 0:再生開始
      STG_ENEMY_PLAYER_SHIP['bomb_interval_time'] = bombIntervalTime;
      STG_ENEMY_PLAYER_SHIP['bomb_interval_now'] = 0;
      STG_ENEMY_PLAYER_SHIP['bomb_num_max'] = bombNum;
      STG_ENEMY_PLAYER_SHIP['bomb_num'] = bombNum;
      //移動中
      STG_ENEMY_PLAYER_SHIP['move_flag'] = false;

      //敵プレイヤーHPゲージ
      STG_ENEMY_PLAYER_SHIP['hp_gauge'] = Gauge({
        x: 0, y: 0,// x,y座標
        width: 100,            // 横サイズ
        height: 10,            // 縦サイズ
        maxValue: 100,         // ゲージ最大値
        value: 100,         // ゲージ初期値
        fill: 'white',         // 後ろの色
        gaugeColor: 'red', // ゲージ色
        stroke: 'black',      // 枠色
        strokeWidth: 4,        // 枠太さ
      }).addChildTo(STG_ENEMY_PLAYER_SHIP);
      STG_ENEMY_PLAYER_SHIP['hp_gauge'].x = STG_ENEMY_PLAYER_SHIP['hp_gauge'].x + ((STG_ENEMY_PLAYER_SHIP.width / 2) + (STG_ENEMY_PLAYER_SHIP['hp_gauge'].width / 2));
      STG_ENEMY_PLAYER_SHIP['hp_gauge'].y = STG_ENEMY_PLAYER_SHIP['hp_gauge'].y + ((STG_ENEMY_PLAYER_SHIP.height / 2) + (STG_ENEMY_PLAYER_SHIP['hp_gauge'].height / 2));
      STG_ENEMY_PLAYER_SHIP['hp_gauge'].visible = false;
      STG_ENEMY_PLAYER_SHIP['hp_gauge']['active_anim_flag'] = false;
      STG_ENEMY_PLAYER_SHIP['hp_gauge']['active_gauge_frame'] = 0;

      //回避ゲージ
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'] = Gauge({
        x: 0, y: 0,// x,y座標
        width: 100,            // 横サイズ
        height: 10,            // 縦サイズ
        maxValue: 1000,         // ゲージ最大値
        value: 0,         // ゲージ初期値
        fill: 'black',         // 後ろの色
        gaugeColor: 'yellow', // ゲージ色
        stroke: 'black',      // 枠色
        strokeWidth: 4,        // 枠太さ
      }).addChildTo(STG_ENEMY_PLAYER_SHIP);
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].x = STG_ENEMY_PLAYER_SHIP['hp_gauge'].x;
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].y = STG_ENEMY_PLAYER_SHIP['hp_gauge'].y;
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].y = STG_ENEMY_PLAYER_SHIP['hp_gauge'].y + STG_ENEMY_PLAYER_SHIP['hp_gauge'].height;
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].visible = false;

      STG_ENEMY_PLAYER_SHIP.update = function(app) {
        //ダメージアニメーション
        if(this['damage_anim_step'] == 0){
          this['damage_anim_step'] = 1; //ダメージアニメーションを停止
          var tween1 = Tweener().fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).fadeOut(250).fadeIn(250).call(function(){
            this.target['damage_anim_step'] = 2;
          });
          tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
        }
        //HPゲージ表示アニメーションを開始する条件だった場合
        if(this['hp_gauge'].visible == true && this['hp_gauge']['active_anim_flag'] == false){
          this['hp_gauge']['active_anim_flag'] = true;
        }
        if(this['hp_gauge']['active_anim_flag'] == true){ //フレームを更新
          if(1000 <= this['hp_gauge']['active_gauge_frame']){ //リミットに達した場合、ゲージを非表示
            this['hp_gauge'].visible = false;
            this['hp_gauge']['active_anim_flag'] = false;
            this['hp_gauge']['active_gauge_frame'] = 0;
          }
          else this['hp_gauge']['active_gauge_frame'] += app.deltaTime;
        }
      };
    }
  }
}

function G_STG_BULLET_HIT_PLAYER_ENEMY(bullet,bulletDelete = true,effect = false){ //敵に弾が当たったか、判定を行う。(敵プレイヤーに対して)delete:当たった時に弾を削除するか effect:削除時のエフェクトアニメ
  // ヒット判定
  if(STG_PVP_FLAG == false) return;
  if(STG_ENEMY_PLAYER_SHIP == null) return;
  if (bullet.hitTestElement(STG_ENEMY_PLAYER_SHIP['hit_box'])) {
    if(STG_ENEMY_PLAYER_SHIP['damage_anim_step'] == -1 || STG_ENEMY_PLAYER_SHIP['damage_anim_step'] == 2) STG_ENEMY_PLAYER_SHIP['damage_anim_step'] = 0; //ダーメージアニメーションを開始
    STG_ENEMY_PLAYER_SHIP['hp_gauge'].visible = true;
    STG_ENEMY_PLAYER_SHIP['now_hp'] = parseInt(STG_ENEMY_PLAYER_SHIP['now_hp'] - bullet['bullet_damage']);
    if(STG_ENEMY_PLAYER_SHIP['now_hp'] <= 0){
      STG_ENEMY_PLAYER_SHIP['now_hp'] = 0;
    }
    STG_ENEMY_PLAYER_SHIP['hp_gauge'].value = parseInt(STG_ENEMY_PLAYER_SHIP['now_hp'] / STG_ENEMY_PLAYER_SHIP['max_hp'] * 100);
    if(bulletDelete == true){
      if(effect == true){ //削除時のエフェクトが有効か
        var getEffectSize = bullet.width;
        if(getEffectSize < bullet.height) getEffectSize = bullet.height;
        var bulletEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,getEffectSize,getEffectSize);
        if(bulletEffect != null){
          bulletEffect.addChildTo(STG_OBJECT_LAYER);
          bulletEffect.x = bullet.x;
          bulletEffect.y = bullet.y;
        }
      }
      bullet.remove();
      bullet = null;
    }

    if(STG_ENEMY_PLAYER_SHIP['now_hp'] <= 0){
      //エネミー消滅処理
      G_STG_ENEMY_PLAYER_DIE(STG_OBJECT_LAYER,STG_ENEMY_PLAYER_SHIP);
    }
  }
}

function G_STG_BULLET_HIT_PLAYER(bullet,bulletDelete = true,effect = false){ //敵に弾が当たったか、判定を行う。(プレイヤーに対して)delete:当たった時に弾を削除するか effect:削除時のエフェクトアニメ
  // ヒット判定
  if(STG_PVP_FLAG == false) return;
  if(STG_ENEMY_PLAYER_SHIP == null) return;
  if (bullet.hitTestElement(STG_MY_SHIP['hit_box'])) {
    G_STG_MY_SHIP_DAMAGE(parseInt(bullet['bullet_damage']));
    if(bulletDelete == true){
      if(effect == true){ //削除時のエフェクトが有効か
        var getEffectSize = bullet.width;
        if(getEffectSize < bullet.height) getEffectSize = bullet.height;
        var bulletEffect = G_ASSET_GET_SPRITE_ANIM("stg_effect_anim_1",75,false,true,getEffectSize,getEffectSize);
        if(bulletEffect != null){
          bulletEffect.addChildTo(STG_OBJECT_LAYER);
          bulletEffect.x = bullet.x;
          bulletEffect.y = bullet.y;
        }
      }
      bullet.remove();
      bullet = null;
    }
  }
}

function G_STG_PVP_START_SCENE_START(){ //PVPのスタートシーンを開始する
  //自機を前に移動。
  STG_MY_SHIP['controle_flag'] = false; //自機操作不能にする
  var enemyMoveX = 0;
  var enemyMoveY = STG_MY_SHIP.y;
  var moveX = 0;
  var moveY = -SCREEN_HEIGHT * 0.4;
  STG_MY_SHIP.tweener.moveTo(moveX, moveY, 2000).call(function(){
    this.target['controle_flag'] = true;
    this.target['weapon_controle_flag'] = false;
    STG_PVP_STEP = 3;
  }).play();
  //敵プレイヤーを移動
  STG_ENEMY_PLAYER_SHIP.tweener.moveTo(enemyMoveX, enemyMoveY, 2000).play();
}

function G_STG_ENEMY_PLAYER_ACTION(delta){ //敵機の動作
  if(STG_ENEMY_PLAYER_SHIP != null){
    //通常攻撃
    if(STG_ENEMY_PLAYER_SHIP['main_weapon_visible'] == false) STG_ENEMY_PLAYER_SHIP['main_weapon_visible'] = true;
    //ボム
    if(0 < STG_ENEMY_PLAYER_SHIP['bomb_interval_now']){
       STG_ENEMY_PLAYER_SHIP['bomb_interval_now'] -= delta.deltaTime;
    }
    else{
      STG_ENEMY_PLAYER_SHIP['bomb_interval_now'] = STG_ENEMY_PLAYER_SHIP['bomb_interval_time'];
      if(STG_ENEMY_PLAYER_SHIP['weapon_controle_flag'] == true){
        G_STG_CREATE_BOMB(PHINA_APP,STG_ENEMY_PLAYER_SHIP,STG_OBJECT_LAYER,STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_atk'],0,STG_ENEMY_PLAYER_SHIP['bomb_master_data'],1);
      }
    }
    //追尾
    if(STG_ENEMY_PLAYER_SHIP['move_flag'] == false){
      var actionMin = 0;
      var actionMax = 100;
      var rot = Math.floor( Math.random() * (actionMax + 1 - actionMin) ) + actionMin;
      if(rot <= 70){
        STG_ENEMY_PLAYER_SHIP['move_flag'] = true;
        var myPos = Vector2(STG_MY_SHIP.x, STG_MY_SHIP.y);
        var enemyPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
        var distance = Vector2.distance(myPos, enemyPos); //距離を取得
        var speed = parseInt(STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_controle']) * 0.01; //10が標準
        var time = parseInt(distance / speed);
        var tween1 = Tweener().moveTo(STG_MY_SHIP.x, STG_ENEMY_PLAYER_SHIP.y, time).call(function(){
          STG_ENEMY_PLAYER_SHIP['move_flag'] = false;
        });
        tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
      }
      else { //一定時間停止
        STG_ENEMY_PLAYER_SHIP['move_flag'] = true;
        var maxTime = 200;
        maxTime = maxTime - parseInt(STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_controle']);
        if(maxTime < 100) maxTime = 100;
        maxTime = maxTime * 10;
        var waitTime = Math.floor( Math.random() * (maxTime + 1 - 500) ) + 500;
        var tween1 = Tweener().wait(waitTime).call(function(){
          STG_ENEMY_PLAYER_SHIP['move_flag'] = false;
        });
        tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
      }
    }
  }
}

function G_STG_PVP_ESCAPE_GAUGE_UPDATE(delta){ //回避ゲージの更新
  //640 850
  if(STG_PVP_ROTATION == 0){ //敵が攻撃の時
    if(STG_ESCAPE_GAUGE.visible == false) STG_ESCAPE_GAUGE.visible = true;
    var myPos = Vector2(STG_MY_SHIP.x, STG_MY_SHIP.y);
    var enemyPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
    var distance = Vector2.distance(myPos, enemyPos); //距離を取得
    var upVal = 0;
    if(800 <= distance) upVal = 10;
    else if(750 <= distance) upVal = 6;
    else if(650 <= distance) upVal = 3;
    else upVal = 0;
    STG_ESCAPE_GAUGE.value = STG_ESCAPE_GAUGE.value + upVal;
    if(STG_ESCAPE_GAUGE.maxValue <= STG_ESCAPE_GAUGE.value){
      STG_ESCAPE_GAUGE.value = 0;
      STG_ESCAPE_GAUGE.visible = false;
      STG_PVP_STEP = 4; //攻守交代シーンへ
    }
  }else{ //自分が攻撃の時
    if(STG_ENEMY_PLAYER_SHIP['escape_gasuge'].visible == false) STG_ENEMY_PLAYER_SHIP['escape_gasuge'].visible = true;
    var myPos = Vector2(STG_MY_SHIP.x, STG_MY_SHIP.y);
    var enemyPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
    var distance = Vector2.distance(myPos, enemyPos); //距離を取得
    var upVal = 0;
    if(800 <= distance) upVal = 10;
    else if(750 <= distance) upVal = 6;
    else if(650 <= distance) upVal = 3;
    else upVal = 0;
    STG_ENEMY_PLAYER_SHIP['escape_gasuge'].value = STG_ENEMY_PLAYER_SHIP['escape_gasuge'].value + upVal;
    if(STG_ENEMY_PLAYER_SHIP['escape_gasuge'].maxValue <= STG_ENEMY_PLAYER_SHIP['escape_gasuge'].value){
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].value = 0;
      STG_ENEMY_PLAYER_SHIP['escape_gasuge'].visible = false;
      STG_PVP_STEP = 4; //攻守交代シーンへ
    }
  }
}

function G_STG_PVP_START_ROTATION_CHANGE(rotation){
  if(rotation == 0){ //敵を攻撃にする。
    var enemyPlayerMoveY = STG_MY_SHIP.y;
    var playerMoveY = STG_ENEMY_PLAYER_SHIP.y;
    var movePlayerX = SCREEN_WIDTH * 0.3;
    var moveEnemyPlayerX = SCREEN_WIDTH * -0.3;

    STG_ENEMY_PLAYER_SHIP['move_flag'] = false;

    var tween1 = Tweener().to({x: movePlayerX, y: playerMoveY},1000).to({
      x: movePlayerX, y: (enemyPlayerMoveY / 2),
      scaleX: 2.0, scaleY: 2.0,
    }, 1000).to({
      x: movePlayerX, y: enemyPlayerMoveY,
      scaleX: 1.0, scaleY: 1.0,
    }, 1000).call(function(){
      STG_ENEMY_PLAYER_SHIP['weapon_controle_flag'] = true;
      STG_MY_SHIP['weapon_controle_flag'] = false;
      STG_MY_SHIP['controle_flag'] = true;
    });
    tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
    var tween2 = Tweener().to({x: moveEnemyPlayerX,y: enemyPlayerMoveY},1000).to({x: moveEnemyPlayerX, y: playerMoveY}, 2000).call(function(){
      STG_MY_SHIP.tweener.clear();
      STG_ENEMY_PLAYER_SHIP.tweener.clear();
      STG_PVP_STEP = 3; //敵プレイヤー攻撃シーンへ
    });
    tween2.attachTo(STG_MY_SHIP);
  }
  else{ //味方を攻撃にする
    var enemyPlayerMoveY = STG_MY_SHIP.y;
    var playerMoveY = STG_ENEMY_PLAYER_SHIP.y;
    var movePlayerX = SCREEN_WIDTH * 0.3;
    var moveEnemyPlayerX = SCREEN_WIDTH * -0.3;

    STG_ENEMY_PLAYER_SHIP['move_flag'] = false;

    var tween1 = Tweener().to({x: movePlayerX,y: enemyPlayerMoveY},1000).to({
      x: movePlayerX, y: (playerMoveY / 2),
      scaleX: 2.0, scaleY: 2.0,
    }, 1000).to({
      x: movePlayerX, y: playerMoveY,
      scaleX: 1.0, scaleY: 1.0,
    }, 1000).call(function(){
      STG_ENEMY_PLAYER_SHIP['weapon_controle_flag'] = false;
      STG_MY_SHIP['weapon_controle_flag'] = true;
      STG_MY_SHIP['controle_flag'] = true;
    });
    tween1.attachTo(STG_MY_SHIP);
    var tween2 = Tweener().to({x: moveEnemyPlayerX,y: playerMoveY},1000).to({x: moveEnemyPlayerX, y: enemyPlayerMoveY}, 2000).call(function(){
      STG_MY_SHIP.tweener.clear();
      STG_ENEMY_PLAYER_SHIP.tweener.clear();
      STG_PVP_STEP = 6; //プレイヤー攻撃シーンへ
    });
    tween2.attachTo(STG_ENEMY_PLAYER_SHIP);
  }
}

function G_STG_ENEMY_PLAYER_ESCAPE_ACTION(){ //敵プレイヤーの回避処理
  if(STG_ENEMY_PLAYER_SHIP != null && STG_ENEMY_PLAYER_SHIP['move_flag'] == false){
    var minAction = 1;
    var maxAction = 3;
    var randAction = Math.floor( Math.random() * (maxAction + 1 - minAction) ) + minAction;
    console.log(randAction);
    switch (randAction) {
      case 1: //回避行動1
      {
        if(STG_ENEMY_PLAYER_SHIP.x == 0) break;
        var myPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
        var movePos = Vector2(0, myPos.y);
        var distance = Vector2.distance(myPos, movePos); //距離を取得
        var speed = parseInt(STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_controle']) * 0.01; //10が標準
        var time = parseInt(distance / speed);
        STG_ENEMY_PLAYER_SHIP['move_flag'] = true;
        console.log("実行開始");
        //STG_ENEMY_PLAYER_SHIP.tweener.clear();
        var tween1 = Tweener().moveTo(0,movePos.y,time).call(function(){
          STG_ENEMY_PLAYER_SHIP['move_flag'] = false;
          console.log("実行完了");
        });
        tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
      }
      break;
      case 2:
      {
        if(STG_ENEMY_PLAYER_SHIP.x == SCREEN_WIDTH * 0.3) break;
        var myPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
        var movePos = Vector2(SCREEN_WIDTH * 0.3, myPos.y);
        var distance = Vector2.distance(myPos, movePos); //距離を取得
        var speed = parseInt(STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_controle']) * 0.01; //10が標準
        var time = parseInt(distance / speed);
        STG_ENEMY_PLAYER_SHIP['move_flag'] = true;
        console.log("実行開始");
        //STG_ENEMY_PLAYER_SHIP.tweener.clear();
        var tween1 = Tweener().moveTo(movePos.x,movePos.y,time).call(function(){
          STG_ENEMY_PLAYER_SHIP['move_flag'] = false;
          console.log("実行完了");
        });
        tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
      }
      break;
      case 3:
      {
        if(STG_ENEMY_PLAYER_SHIP.x == -SCREEN_WIDTH * 0.3) break;
        var myPos = Vector2(STG_ENEMY_PLAYER_SHIP.x, STG_ENEMY_PLAYER_SHIP.y);
        var movePos = Vector2(-SCREEN_WIDTH * 0.3, myPos.y);
        var distance = Vector2.distance(myPos, movePos); //距離を取得
        var speed = parseInt(STG_ENEMY_PLAYER_SHIP['player_mount_data']['status_controle']) * 0.01; //10が標準
        var time = parseInt(distance / speed);
        STG_ENEMY_PLAYER_SHIP['move_flag'] = true;
        console.log("実行開始");
        //STG_ENEMY_PLAYER_SHIP.tweener.clear();
        var tween1 = Tweener().moveTo(movePos.x,movePos.y,time).call(function(){
          STG_ENEMY_PLAYER_SHIP['move_flag'] = false;
          console.log("実行完了");
        });
        tween1.attachTo(STG_ENEMY_PLAYER_SHIP);
      }
      break;
      default:
      break;
    }

  }
  else if(STG_ENEMY_PLAYER_SHIP['move_flag'] == true){
    console.log("回避実行中");
  }
}

function G_STG_PVP_FINISH(){ //PVPを終了
  //プレイヤーを元の位置に戻す
  STG_MY_SHIP['controle_flag'] = false;
  STG_MY_SHIP['weapon_controle_flag'] = false;
  var tween1 = Tweener().moveTo(0,STG_MY_SHIP['ship_init_pos_y'],2000).call(function(){
    STG_MY_SHIP['controle_flag'] = true;
    STG_MY_SHIP['weapon_controle_flag'] = true;
    STG_PVP_CLEAR = true;
    STG_PVP_FLAG = false;
  });
  tween1.attachTo(STG_MY_SHIP);
}
