// //============================================
// //  バトルシーン
// //============================================
// //パブリック変数定義
// var BATTLE_BATTLE_SCENE_BASE = null; //バトルシーンベース
// var BATTLE_BATTLE_SCENE_UI_LAYER = null; //バトルシーンUIレイヤー
// var BATTLE_CONTROLE_PAD_LAYER = null; //コントロールパッドのレイヤー
// var BATTLE_BATTLE_SCENE_CHARA_LAYER = null; //バトルシーンキャラクターレイヤー
// var BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER = null; //戦闘g
// var BATTLE_WINDOW_NODE = null; //ダイアログ表示用レイヤー
// var BATTLE_SCENE_STEP = -1; //バトルシーン制御用ステップ
// var BATTLE_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品データ
// var BATTLE_PLAYER_POS_ARRAY = new Array(); //プレイヤー達が表示される座標ノード
// var BATTLE_ENEMY_POS_ARRAY = new Array(); //敵プレイヤー達が表示される座標ノード
// var BATTLE_PARTY_MEMBER_DATA = null; //パーティーメンバーの情報を取得
// var BATTLE_PARTY_MEMBER_CARD_DECK = new Array(); //パーティーメンバーのカードデッキ
// var BATTLE_ENEMYS_DATA = new Array(); //敵パーティのデータ
// var BATTLE_PARTY_MEMBER_MAX_COUNT = 5; //パーティに参加出来る最大人数(固定)
// var BATTLE_PARTY_MEMBER_COUNT = 0; //所属しているユーザーのパーティーメンバーの人数
// var BATTLE_CARD_DECK_IMAGE_ARRAY = new Array(); //カードデッキ用イメージ格納用配列
// var BATTLE_CARD_MOVE_CONTROLE = 0; //カード移動用のボタン 1:左 2:右
// var BATTLE_CARD_DECK_INIT = false; //カードデッキの表示が完了したか。
// var BATTLE_CARD_DECK_IMAGE_POS_ARRAY = new Array(); //アニメーション終了位置記録用の配列
// var BATTLE_SELECT_DECK_INDEX = 0; //選択中のデッキインデックス
// var BATTLE_SORT_DECK_MAX_INDEX = 0; //整形後のデッキの最大インデックスを取得
// var BATTLE_CONTROLE_ENABLE = false; //ユーザー操作可能か
// var BATTLE_CARD_TOUCH_START_POSITION_Y = 0; //カードをスワイプした初期座標(Y)
// var BATTLE_CARD_TOUCH_SWIPE_POSITION_Y = 0; //カードをスワイプ中の座標(Y)
// var BATTLE_CARD_SWIPE_ENABLE = false;
// var BATTLE_ARROW_ANIM_FRAME_INDEX = 0; //選択中のキャラクターに表示される矢印アニメのフレーム
// var BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = 0; //透明度アニメーションのフレーム用カウント
// var BATTLE_ALPHA_EFFECT_ANIME_FRAME_DIRECTION = true; //透明度アニメーションのフレーム加算方向 true 進む false 戻る
// var BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX = 0;　//選択中のパーティーメンバーデッキのインデックス
// var BATTLE_PLAYER_SELECT_DECK_DATAS = new Array(); //ユーザー操作によって実行された、選択されたデッキ一覧
// var BATTLE_USER_SELECT_ENEMY_INDEX = 0; //ユーザーが選択した敵のindex
// var BATTLE_PLAYER_SELECT_TARGET_NUMBERS = new Array(); //プレイヤーが選択したターゲット番号
// var BATTLE_BATTLE_RESULT_DATA = null; //戦闘結果データ
// var BATTLE_PARTY_MEMBER_AVATAR_DATA = null; //パーティメンバーのアバターデータ
// var BATTLE_PARTY_MEMBER_AVATAR_IMAGE = new Array(); //パーティメンバーのアバター画像
// var BATTLE_AVATAR_ANIM_FRAME_COUNT = 0; //アバターアニメーションフレームカウント用
// var BATTLE_ENEMY_MEMBER_AVATAR_DATA = null; //敵メンバーのアバターデータ
// var BATTLE_ENEMY_MEMBER_AVATAR_IMAGE = new Array(); //敵メンバーのアバター画像
// var BATTLE_BATTLE_TURN = 1; //現在進行中の戦闘ターン
// var BATTLE_BATTLE_TURN_END_STEP = -1; //ターン終了時のアクション実行進行度
// var BATTLE_ANIM_PLAY_STACK = 0; //再生完了待機中のアニメ数
// var BATTLE_BATTLE_SCENE_CARD_SPRITE = null; //戦闘演出中に表示されるカードスプライト
// var BATTLE_BATLE_LOG_DISP_LAYER = null; //バトルログ表示用レイヤー
// var BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY = new Array(); //戦闘ログのテキストデータ配列
// var BATTLE_BATTLE_LOG_TEXT_PARENT = null; //戦闘ログのスライド用親ノード
// var BATTLE_BATTLE_RESULT_EFFECT_OBJ = new Array(); //戦闘結果表示用ロゴのオブジェクト
// var BATTLE_BATTLE_MAX_TURN = 0; //戦闘が行われた最大ターン数
// var BATTLE_LOG_LIST_SCROLLE_START = 0; //ログをスワイプした最初の位置
// var BATTLE_LOG_LIST_SCROLLE_MOVE = 0; //ログをスワイプ中の位置
// var BATTLE_LOG_SCROLLE_MAX_HEIGHT = 0; //バトルログのスクロール可能な縦サイズ
// var BATTLE_BATTLE_LOG_SLIDE_HEIGHT = 0; //移動量の合計
// var BATTLE_TAP_TO_BACK_TEXT = null; //「タップして戻る」表示テキスト
// var BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT = null; //「スクロールしてバトルログを見る」表示テキスト
// var BATTLE_BATTLE_SCENE_EXIT_BUTTON = null; //戦闘画面終了ボタン
// var BATTLE_RESULT_BATTLE_CLEAR = null; //マップクリアデータ(ボス撃破)
// var BATTLE_PLAYER_PARTY_FORMATION_DATA = null; //パーティで設定されている隊形データ
// var BATTLE_ENEMY_PARTY_FORMATION_DATA = null; //敵パーティで設定されている隊形データ
// var BATTLE_BATTLE_TYPE = -1; //0:通常 1:PVP
// phina.define("Battle", {
//   // 継承
//   superClass: 'DisplayScene',
//   // 初期化
//   init: function() {
//     G_SCENE_INIT();
//     SCENE_MANAGER['now_scene'] = "battle";
//     //メンバー初期化
//     BATTLE_BATTLE_SCENE_BASE = null; //バトルシーンベース
//     BATTLE_BATTLE_SCENE_UI_LAYER = null; //バトルシーンUIレイヤー
//     BATTLE_CONTROLE_PAD_LAYER = null; //コントロールパッドのレイヤー
//     BATTLE_BATTLE_SCENE_CHARA_LAYER = null; //バトルシーンキャラクターレイヤー
//     BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER = null; //戦闘g
//     BATTLE_WINDOW_NODE = null; //ダイアログ表示用レイヤー
//     BATTLE_SCENE_STEP = -1; //バトルシーン制御用ステップ
//     BATTLE_PLAYER_EQUIP_ITEM_DISP = null; //プレイヤーの装備品データ
//     BATTLE_PLAYER_POS_ARRAY = new Array(); //プレイヤー達が表示される座標ノード
//     BATTLE_ENEMY_POS_ARRAY = new Array(); //敵プレイヤー達が表示される座標ノード
//     BATTLE_PARTY_MEMBER_DATA = null; //パーティーメンバーの情報を取得
//     BATTLE_PARTY_MEMBER_CARD_DECK = new Array(); //パーティーメンバーのカードデッキ
//     BATTLE_ENEMYS_DATA = new Array(); //敵パーティのデータ
//     BATTLE_PARTY_MEMBER_MAX_COUNT = 5; //パーティに参加出来る最大人数(固定)
//     BATTLE_PARTY_MEMBER_COUNT = 0; //所属しているユーザーのパーティーメンバーの人数
//     BATTLE_CARD_DECK_IMAGE_ARRAY = new Array(); //カードデッキ用イメージ格納用配列
//     BATTLE_CARD_MOVE_CONTROLE = 0; //カード移動用のボタン 1:左 2:右
//     BATTLE_CARD_DECK_INIT = false; //カードデッキの表示が完了したか。
//     BATTLE_CARD_DECK_IMAGE_POS_ARRAY = new Array(); //アニメーション終了位置記録用の配列
//     BATTLE_SELECT_DECK_INDEX = 0; //選択中のデッキインデックス
//     BATTLE_SORT_DECK_MAX_INDEX = 0; //整形後のデッキの最大インデックスを取得
//     BATTLE_CONTROLE_ENABLE = false; //ユーザー操作可能か
//     BATTLE_CARD_TOUCH_START_POSITION_Y = 0; //カードをスワイプした初期座標(Y)
//     BATTLE_CARD_TOUCH_SWIPE_POSITION_Y = 0; //カードをスワイプ中の座標(Y)
//     BATTLE_CARD_SWIPE_ENABLE = false;
//     BATTLE_ARROW_ANIM_FRAME_INDEX = 0; //選択中のキャラクターに表示される矢印アニメのフレーム
//     BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = 0; //透明度アニメーションのフレーム用カウント
//     BATTLE_ALPHA_EFFECT_ANIME_FRAME_DIRECTION = true; //透明度アニメーションのフレーム加算方向 true 進む false 戻る
//     BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX = 0;　//選択中のパーティーメンバーデッキのインデックス
//     BATTLE_PLAYER_SELECT_DECK_DATAS = new Array(); //ユーザー操作によって実行された、選択されたデッキ一覧
//     BATTLE_USER_SELECT_ENEMY_INDEX = 0; //ユーザーが選択した敵のindex
//     BATTLE_PLAYER_SELECT_TARGET_NUMBERS = new Array(); //プレイヤーが選択したターゲット番号
//     BATTLE_BATTLE_RESULT_DATA = null; //戦闘結果データ
//     BATTLE_PARTY_MEMBER_AVATAR_DATA = null; //パーティメンバーのアバターデータ
//     BATTLE_PARTY_MEMBER_AVATAR_IMAGE = new Array(); //パーティメンバーのアバター画像
//     BATTLE_AVATAR_ANIM_FRAME_COUNT = 0; //アバターアニメーションフレームカウント用
//     BATTLE_ENEMY_MEMBER_AVATAR_DATA = null; //敵メンバーのアバターデータ
//     BATTLE_ENEMY_MEMBER_AVATAR_IMAGE = new Array(); //敵メンバーのアバター画像
//     BATTLE_BATTLE_TURN = 1; //現在進行中の戦闘ターン
//     BATTLE_BATTLE_TURN_END_STEP = -1; //ターン終了時のアクション実行進行度
//     BATTLE_ANIM_PLAY_STACK = 0; //再生完了待機中のアニメ数
//     BATTLE_BATTLE_SCENE_CARD_SPRITE = null; //戦闘演出中に表示されるカードスプライト
//     BATTLE_BATLE_LOG_DISP_LAYER = null; //バトルログ表示用レイヤー
//     BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY = new Array(); //戦闘ログのテキストデータ配列
//     BATTLE_BATTLE_LOG_TEXT_PARENT = null; //戦闘ログのスライド用親ノード
//     BATTLE_BATTLE_RESULT_EFFECT_OBJ = new Array(); //戦闘結果表示用ロゴのオブジェクト
//     BATTLE_BATTLE_MAX_TURN = 0; //戦闘が行われた最大ターン数
//     BATTLE_LOG_LIST_SCROLLE_START = 0; //ログをスワイプした最初の位置
//     BATTLE_LOG_LIST_SCROLLE_MOVE = 0; //ログをスワイプ中の位置
//     BATTLE_LOG_SCROLLE_MAX_HEIGHT = 0; //バトルログのスクロール可能な縦サイズ
//     BATTLE_BATTLE_LOG_SLIDE_HEIGHT = 0; //移動量の合計
//     BATTLE_TAP_TO_BACK_TEXT = null; //「タップして戻る」表示テキスト
//     BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT = null; //「スクロールしてバトルログを見る」表示テキスト
//     BATTLE_BATTLE_SCENE_EXIT_BUTTON = null; //戦闘画面終了ボタン
//     BATTLE_RESULT_BATTLE_CLEAR = null; //マップクリアデータ(ボス撃破)
//     BATTLE_PLAYER_PARTY_FORMATION_DATA = null; //パーティで設定されている隊形データ
//     BATTLE_ENEMY_PARTY_FORMATION_DATA = null; //敵パーティで設定されている隊形データ
//     BATTLE_BATTLE_TYPE = -1; //0:通常 1:PVP
//     // 親クラス初期化
//     this.superInit();
//     // 背景色
//     G_DELETE_TARNS_SCREEN_ANIM();
//     this.backgroundColor = 'gray';
//
//     BATTLE_BATTLE_SCENE_BASE = PlainElement({ //シーンの親ノード生成
//     width: this.gridX.width,
//     height: this.gridY.height,
//   }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
//
//   BATTLE_BATLE_LOG_DISP_LAYER = PlainElement({ //バトルログ表示用レイヤー
//   width: this.gridX.width,
//   height: this.gridY.height,
//   }).addChildTo(BATTLE_BATTLE_SCENE_BASE);
//
//   BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER = PlainElement({ //シーンの戦闘画面背景用レイヤー生成
//   width: this.gridX.width,
//   height: this.gridY.height,
//   }).addChildTo(BATTLE_BATTLE_SCENE_BASE);
//
//   BATTLE_BATLE_LOG_DISP_LAYER.y = BATTLE_BATLE_LOG_DISP_LAYER.y + (SCREEN_HEIGHT / 3);
//
//   BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER.y = BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER.y - (SCREEN_HEIGHT / 6);
//
//   G_BATTLE_BACK_GROUND_DISP(BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER,PLAYER_BATTLE_INSTANCE,null); //戦闘画面背景を表示
//
//   BATTLE_BATTLE_SCENE_CHARA_LAYER = PlainElement({ //シーンのキャラクター用レイヤー生成
//   width: this.gridX.width,
//   height: this.gridY.height,
//   }).addChildTo(BATTLE_BATTLE_SCENE_BASE);
//
//   //キャラクター表示用ノードを生成
//   for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//     BATTLE_PLAYER_POS_ARRAY[plPos] = PlainElement({ //シーンのUI用レイヤー生成
//     //width: this.gridX.width,
//     //height: this.gridY.height,
//     }).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//   }
//
//   //敵表示用ノードを生成
//   for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//     BATTLE_ENEMY_POS_ARRAY[plPos] = PlainElement({ //シーンのUI用レイヤー生成
//     //width: this.gridX.width,
//     //height: this.gridY.height,
//     }).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//   }
//
//   BATTLE_BATTLE_SCENE_UI_LAYER = PlainElement({ //シーンのUI用レイヤー生成
//   width: this.gridX.width,
//   height: this.gridY.height,
//   }).addChildTo(BATTLE_BATTLE_SCENE_BASE);
//
//   G_BATTLE_CREATE_UI(BATTLE_BATTLE_SCENE_UI_LAYER); //戦闘画面に必要なUIパーツを生成
//
//   G_BATTLE_BATTLE_RESULT_EFFECT_CREATE(BATTLE_BATTLE_SCENE_UI_LAYER,BATTLE_BATTLE_RESULT_EFFECT_OBJ); //戦闘結果表示用エフェクトを生成
//
//   BATTLE_CONTROLE_PAD_LAYER = PlainElement({ //コントロールパッド用レイヤー生成
//   width: this.gridX.width,
//   height: this.gridY.height,
//   }).addChildTo(BATTLE_BATTLE_SCENE_UI_LAYER);
//
//   G_BATTLE_CREATE_BATTLE_CONTROLE_PAD_LAYER(BATTLE_CONTROLE_PAD_LAYER); //コントロールパッドを生成
//
//   BATTLE_CONTROLE_PAD_LAYER.y = BATTLE_CONTROLE_PAD_LAYER.y + (SCREEN_HEIGHT / 3);
//
//   G_BATTLE_CREATE_CARD_CONTROLE_BUTTON(BATTLE_CONTROLE_PAD_LAYER); //カード切り替え制御用ボタンを生成する
//
//     G_CREATE_TRANS_SCREEN_ANIM(BATTLE_BATTLE_SCENE_UI_LAYER,1); //シーン開始の演出アニメーションを作成
//     BATTLE_SCENE_STEP = 0;
//     var battleParamVal = new Object();
//     console.log("戦闘画面で使用されているバトルインスタンスデータ");
//     console.log(PLAYER_BATTLE_INSTANCE['battle_event_data']);
//     if(isset(PLAYER_BATTLE_INSTANCE['battle_event_data'])){
//       BATTLE_BATTLE_TYPE = 0;
//       battleParamVal['battle_event_data'] = PLAYER_BATTLE_INSTANCE['battle_event_data']; //戦闘イベントデータを設定
//     }
//     else if(isset(PLAYER_BATTLE_INSTANCE['pvp_battle_event_data'])){
//       BATTLE_BATTLE_TYPE = 1;
//       battleParamVal['pvp_battle_event_data'] = PLAYER_BATTLE_INSTANCE['pvp_battle_event_data']; //PVP戦 闘イベントデータを設定
//     }
//     //ウィンドウ表示用ノード
//     BATTLE_WINDOW_NODE = PlainElement({
//     }).addChildTo(this);
//     BATTLE_WINDOW_NODE.x = this.gridX.center();
//     BATTLE_WINDOW_NODE.y = this.gridY.center();
//     ajaxStart("post","json","../../client/battle/battle.php",battleParamVal); //非同期通信開始
//   },
//   // タッチで次のシーンへ
//   onpointstart: function() {
//     //this.exit();
//   },
//   update: function() {
//     if(RESULT_DATA != ""){
//       var json = JSON.parse(RESULT_DATA);//jsonをパース
//       console.log(json);
//       if(isset(json["session_status"])){
//         if(json["session_status"] == 0){ //セッションチェック完了
//           if(isset(json['result_add_load_asset_datas'])){
//             G_ASSET_START_ASSET_LODER(json['result_add_load_asset_datas']); //アセットを追加読み込みする(非同期)
//           }
//           if(isset(json['enemy_party_master_datas'])){ //敵パーティのマスターデータを取得
//             for (var enemyPt = 0; enemyPt < Object.keys(json['enemy_party_master_datas']).length; enemyPt++) {
//               BATTLE_ENEMYS_DATA[enemyPt] = json['enemy_party_master_datas'][enemyPt];
//             }
//           }
//           if(isset(json["player_member_card_deck"])){ //パーティメンバーのカードデッキを取得
//             BATTLE_PARTY_MEMBER_CARD_DECK = json["player_member_card_deck"];
//           }
//           if(isset(json["player_party_master_datas"]) || isset(json["player_party_member"])){ //パーティメンバーを取得
//             if(isset(json["player_party_master_datas"])){
//               BATTLE_PARTY_MEMBER_DATA = json["player_party_master_datas"];
//             }
//             else{
//               BATTLE_PARTY_MEMBER_DATA = json["player_party_member"];
//             }
//             if(Array.isArray(BATTLE_PARTY_MEMBER_DATA)){
//               BATTLE_PARTY_MEMBER_COUNT = BATTLE_PARTY_MEMBER_DATA.length;
//             }
//           }
//           if(isset(json["player_member_avatar_data"])){ //パーティメンバーのアバターデータ取得
//             console.log("パーティアバターデータ");
//             console.log(json["player_member_avatar_data"]);
//             if(BATTLE_PARTY_MEMBER_AVATAR_DATA == null) BATTLE_PARTY_MEMBER_AVATAR_DATA = json["player_member_avatar_data"];
//           }
//           if(isset(json["enemy_member_avatar_datas"])){ //パーティメンバーのアバターデータ取得
//             if(BATTLE_ENEMY_MEMBER_AVATAR_DATA == null) BATTLE_ENEMY_MEMBER_AVATAR_DATA = json["enemy_member_avatar_datas"];
//           }
//           if(isset(json["result_battle_data"])){ //戦闘結果を取得
//             BATTLE_BATTLE_RESULT_DATA = json["result_battle_data"];
//             console.log("戦闘結果");
//             console.log(BATTLE_BATTLE_RESULT_DATA);
//             //ストーリーイベントクリア情報があった
//             if(isset(json["result_battle_data"]['main_story_clear_flag'])) BATTLE_RESULT_BATTLE_CLEAR = json["result_battle_data"]['main_story_clear_flag'];
//             console.log("クリア情報");
//             console.log(BATTLE_BATTLE_RESULT_DATA['map_stage_clear_flag']);
//           }
//           if(isset(json['result_pvp_battle_data'])){ //PVP戦闘結果を取得
//             if(json['result_pvp_battle_data']['error'] == 0){
//               BATTLE_BATTLE_RESULT_DATA = json['result_pvp_battle_data']['pvp_battle_log_data'];
//               //jsonをパース
//               if(isset(BATTLE_BATTLE_RESULT_DATA['battle_log'])) BATTLE_BATTLE_RESULT_DATA['battle_log'] = JSON.parse(BATTLE_BATTLE_RESULT_DATA['battle_log']);
//               if(isset(BATTLE_BATTLE_RESULT_DATA['battle_anim_log'])) BATTLE_BATTLE_RESULT_DATA['battle_anim_log'] = JSON.parse(BATTLE_BATTLE_RESULT_DATA['battle_anim_log']);
//             }
//             else{
//               G_NORMAL_WINDOW_CREATE(BATTLE_WINDOW_NODE,"エラー",json['result_pvp_battle_data']['error_comment'],2,"pvpBattleErrorWindow");
//             }
//           }
//           if(isset(json['player_party_formation_data'])){ //隊形データを取得
//             BATTLE_PLAYER_PARTY_FORMATION_DATA = json['player_party_formation_data'];
//           }
//           if(isset(json['enemy_party_formation_data'])){ //敵隊形データを取得
//             BATTLE_ENEMY_PARTY_FORMATION_DATA = json['enemy_party_formation_data'];
//           }
//           if(isset(json['result_map_master_data'])){
//             var mapMasterData = json['result_map_master_data'];
//             //戦闘背景をセット(PVP時)
//             if(mapMasterData != null && isset(mapMasterData['battle_map_asset_id'])) G_BATTLE_BACK_GROUND_DISP(BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER,null,mapMasterData['battle_map_asset_id']); //戦闘画面背景を表示
//           }
//           if(isset(json["error"])){ //エラー
//             ERROR_DISP_ERROR_DATAS = json["error"];
//             if(ERROR_DISP_ERROR_DATAS.length != 0){
//               var errorAlertText = "";
//               for (var i = 0; i < ERROR_DISP_ERROR_DATAS.length; i++) {
//                 var addErrorText = G_ERROR_DISP_GET_ERROR_TEXT(ERROR_DISP_ERROR_DATAS[i]);
//                 errorAlertText = errorAlertText + addErrorText + "\n";
//               }
//               alert(errorAlertText);
//             }
//           }
//         }
//         else{
//           alert("セッションが切れました。タイトルに戻ります。");
//           SCENE_MANAGER['prev_scene'] = "battle";
//           this.exit("title");
//         }
//       }
//       else{
//         alert("不正な通信情報が検出されました。タイトルに戻ります。");
//         SCENE_MANAGER['prev_scene'] = "battle";
//         this.exit("title");
//       }
//       NETWORK_IS_CONNECTING = false;//通信終了
//       RESULT_DATA = "";//通信結果を初期化
//     }
//     console.log(BATTLE_SCENE_STEP);
//     if(BATTLE_BATTLE_TYPE == 0) G_BATTLE_CHANGE_BATTLE_STEP(BATTLE_SCENE_STEP); //バトルシーンのステップ
//     if(BATTLE_BATTLE_TYPE == 1) G_BATTLE_CHANGE_PVP_BATTLE_STEP(BATTLE_SCENE_STEP); //バトルシーンのステップ
//     if(BATTLE_SCENE_STEP == 10){ //マップに戻るステップの場合
//       if(BATTLE_RESULT_BATTLE_CLEAR != null){ //マップクリアのデータがあった場合
//         if(BATTLE_RESULT_BATTLE_CLEAR != true){ //続きのイベントがある場合
//           STORY_SELECT_MAIN_STORY_HASH['player_event_count'] = (BATTLE_RESULT_BATTLE_CLEAR['event_count'] - 1); //イベント進行度を更新
//           var nextEventCategoryId = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][STORY_SELECT_MAIN_STORY_HASH['player_event_count']]['event_category_id'];
//           switch (nextEventCategoryId) {
//             case "1":
//             SCENE_MANAGER['prev_scene'] = "battle";
//             this.exit("comm");
//               break;
//             case "2":
//             SCENE_MANAGER['prev_scene'] = "battle";
//             this.exit("map");
//               break;
//             case "3":
//               break;
//             default:
//             console.log("カテゴリーが見つからなかった");
//               break;
//           }
//         }
//         else{ //終了した場合、ストーリー画面に戻る。
//           SCENE_MANAGER['prev_scene'] = "battle";
//           this.exit("story");
//         }
//         PLAYER_BATTLE_INSTANCE = null; //マップクリアのため、バトルインスタンスを削除
//         COMM_RESULT_COMM_CLEAR = null;
//       }
//       else{ //まだクリアになっていない
//         SCENE_MANAGER['prev_scene'] = "battle";
//         this.exit("map");
//       }
//       BATTLE_SCENE_STEP = 11;//シーン終了
//     }
//     if(BATTLE_CARD_MOVE_CONTROLE != 0){ //カード移動用ボタンが押された場合
//       if(BATTLE_CARD_MOVE_CONTROLE == 1){
//         BATTLE_SELECT_DECK_INDEX = BATTLE_SELECT_DECK_INDEX + 1;
//         if(BATTLE_SORT_DECK_MAX_INDEX < BATTLE_SELECT_DECK_INDEX){
//           BATTLE_SELECT_DECK_INDEX = 0;
//         }
//         //デッキ切り替えアニメーション開始
//         G_BATTLE_START_DECK_CHANGE_ANIM(BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_CARD_DECK_IMAGE_POS_ARRAY,250,0,BATTLE_CONTROLE_PAD_LAYER,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX],null,BATTLE_SELECT_DECK_INDEX,BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE);
//       }
//       else{
//         BATTLE_SELECT_DECK_INDEX = BATTLE_SELECT_DECK_INDEX - 1;
//         if(BATTLE_SELECT_DECK_INDEX < 0){
//           BATTLE_SELECT_DECK_INDEX = BATTLE_SORT_DECK_MAX_INDEX;
//         }
//       //デッキ切り替えアニメーション開始
//       G_BATTLE_START_DECK_CHANGE_ANIM(BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_CARD_DECK_IMAGE_POS_ARRAY,250,1,BATTLE_CONTROLE_PAD_LAYER,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX],null,BATTLE_SELECT_DECK_INDEX,BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE);
//       }
//       BATTLE_CARD_MOVE_CONTROLE = 0;
//     }
//
//     if(BATTLE_CARD_DECK_INIT == true){ //初期化完了後に矢印のアニメーションを開始
//       for (var aa = 0; aa < BATTLE_PARTY_MEMBER_AVATAR_IMAGE.length; aa++) {
//         if(isset(BATTLE_PARTY_MEMBER_AVATAR_IMAGE[aa]['select_image'])){
//           if(BATTLE_PARTY_MEMBER_AVATAR_IMAGE[aa]['select_image'] == true){
//             BATTLE_PARTY_MEMBER_AVATAR_IMAGE[aa].alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//           }
//         }
//       }
//       for (var ea = 0; ea < BATTLE_ENEMY_MEMBER_AVATAR_IMAGE.length; ea++) {
//         if(isset(BATTLE_ENEMY_MEMBER_AVATAR_IMAGE[ea]['select_image'])){
//           if(BATTLE_ENEMY_MEMBER_AVATAR_IMAGE[ea]['select_image'] == true){
//             BATTLE_ENEMY_MEMBER_AVATAR_IMAGE[ea].alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//           }
//         }
//       }
//     }
//
//     //アニメーションフレームカウント用
//     if(100 <= BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT){
//       BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = 100;
//       BATTLE_ALPHA_EFFECT_ANIME_FRAME_DIRECTION = false;
//     }
//     if(BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT <= 0){
//       BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = 0;
//       BATTLE_ALPHA_EFFECT_ANIME_FRAME_DIRECTION = true;
//     }
//     //透明度アニメーションフレームを更新
//     if(BATTLE_ALPHA_EFFECT_ANIME_FRAME_DIRECTION) BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT + 5;
//     else BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT = BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT - 5;
//
//     //アバターフレーム処理
//     if(4 < BATTLE_AVATAR_ANIM_FRAME_COUNT && 3 <= BATTLE_SCENE_STEP){
//       //パーティプレイヤーアバターアニメ更新
//       G_BATTLE_PLAY_AVATAR_ANIM(BATTLE_PARTY_MEMBER_AVATAR_DATA,BATTLE_PARTY_MEMBER_AVATAR_IMAGE);
//       //敵メンバーアバターアニメ更新
//       G_BATTLE_PLAY_AVATAR_ANIM(BATTLE_ENEMY_MEMBER_AVATAR_DATA,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE);
//       BATTLE_AVATAR_ANIM_FRAME_COUNT = 0;
//     }
//     BATTLE_AVATAR_ANIM_FRAME_COUNT = BATTLE_AVATAR_ANIM_FRAME_COUNT + 1;
//
//     //ウィンドウに返り値があった場合
//     if(WINDOW_RETURN_VAL != null){
//       if(isset(WINDOW_RETURN_VAL['dengerWindow'])){
//         if(WINDOW_RETURN_VAL['dengerWindow'] == "ok"){ //デッキ選択警告ウィンドウを閉じた場合
//           BATTLE_CONTROLE_ENABLE = true;
//           BATTLE_CARD_SWIPE_ENABLE = true;
//         }
//       }
//
//
//       WINDOW_RETURN_VAL = null;
//     }
//   },
// });
//
// function G_BATTLE_PLAY_AVATAR_ANIM(getAvatarDatas,getAvatarImageDatas){
//   for (var i = 0; i < getAvatarDatas.length; i++) {
//     var avatarData = getAvatarDatas[i];
//     var avatarAnimDatas = getAvatarDatas[i]['avatar_anim_data'];
//     var avatarImage = getAvatarImageDatas[i];
//     var animData = null;
//     var animDataIndex = -1;
//     for (var j = 0; j < avatarAnimDatas.length; j++) {
//       if(avatarAnimDatas[j]['anim_category_id'] == avatarData['anim_category_id']){ //再生中のアニメカテゴリー
//         animData = avatarAnimDatas[j];
//         animDataIndex = j;
//         break;
//       }
//     }
//     if(animData != null){ //アニメデータが見つかった
//       if(avatarData['anim_frame_controle'] == false){ //フレームコントロールが無効の場合
//         if(avatarData['loop_flag'] == false){ //ループ無しのアニメの場合
//           if(avatarData['anim_direction'] == 0){
//             avatarData['frame_count_now'] = parseInt(animData['start_frame_index'], 10);
//             avatarData['anim_direction'] = 1;
//           }
//           else if(avatarData['anim_direction'] == 1 && animData['end_frame_index'] <= avatarData['frame_count_now']){ //アニメが終了した
//             avatarData['anim_direction'] = 2; //アニメ再生完了状態にする。
//           }
//         }
//         if(animData['start_frame_index'] <= avatarData['frame_count_now'] && avatarData['frame_count_now'] < animData['end_frame_index']){
//           avatarData['frame_count_now'] = parseInt(avatarData['frame_count_now'],10) + 1;
//         }
//         else{//再生するアニメのフレーム範囲を超えていた場合
//           if(avatarData['loop_flag'] == false && avatarData['anim_category_id'] != 10) { //ループフラグが有効では無く死亡ではない場合、通常の立ちアニメに変更
//             avatarData['anim_category_id'] = 1;
//             avatarData['loop_flag'] = true;
//             avatarData['anim_direction'] = 0;
//           }
//           if(avatarData['anim_direction'] != 2) avatarData['frame_count_now'] = parseInt(animData['start_frame_index'], 10);
//         }
//         avatarImage.setFrameIndex(avatarData['frame_count_now']);
//         if(avatarImage.scaleX == 1.5 && avatarData['refrect_flag'] == true) avatarImage.scaleX *= -1; //向き反転の場合
//       }
//     }
//   }
// }
//
// function G_BATTLE_CHANGE_BATTLE_STEP(step){ //バトルシーンのステップ
//   switch (step) {
//     case 0:
//     {
//       if(BATTLE_ENEMYS_DATA != null && BATTLE_PARTY_MEMBER_CARD_DECK != null && BATTLE_PARTY_MEMBER_DATA != null && BATTLE_PARTY_MEMBER_AVATAR_DATA != null && BATTLE_PLAYER_PARTY_FORMATION_DATA != null && BATTLE_ENEMY_PARTY_FORMATION_DATA != null && ASSET_LOADING == false){ //必要な通信情報が取得できた場合
//
//         //プレイヤー達の初期位置を更新
//         for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//           var getPos = null;
//           getPos = G_BATTLE_GET_CHARACTER_POS(-160,-200,plPos,BATTLE_PLAYER_PARTY_FORMATION_DATA,true);
//           BATTLE_PLAYER_POS_ARRAY[plPos].x = getPos['pos_x'];
//           BATTLE_PLAYER_POS_ARRAY[plPos].y = getPos['pos_y'];
//         }
//         //敵パーティの初期位置を更新
//         for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//           var getPos = null;
//           getPos = G_BATTLE_GET_CHARACTER_POS(160,-200,plPos,BATTLE_ENEMY_PARTY_FORMATION_DATA,false);
//           BATTLE_ENEMY_POS_ARRAY[plPos].x = getPos['pos_x'];
//           BATTLE_ENEMY_POS_ARRAY[plPos].y = getPos['pos_y'];
//         }
//
//         //初期描画を開始
//         G_BATTLE_CREATE_USER_ANIM(BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_PARTY_MEMBER_AVATAR_DATA); //プレイヤーキャラクターを表示
//         G_BATTLE_CREATE_ENEMY_ANIM(BATTLE_ENEMY_POS_ARRAY,BATTLE_ENEMYS_DATA,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_MEMBER_AVATAR_DATA,BATTLE_BATTLE_TYPE); //敵キャラクターを表示
//         //引数はテスト--------------------
//         BATTLE_SORT_DECK_MAX_INDEX = G_GET_SORT_CARD_DECK_MAX_INDEX(BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]); //整形後のデッキデータの最大インデックスを取得
//         G_BATTLE_PLAYER_CARD_DECK_DISP(BATTLE_CONTROLE_PAD_LAYER,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX],null,BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_CARD_DECK_IMAGE_POS_ARRAY,BATTLE_SELECT_DECK_INDEX,BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE); //カードデッキを表示
//         G_BATTLE_CONTROLE_PAD_PLAYER_NAME_DISP(BATTLE_CONTROLE_PAD_LAYER['player_name_label'],BATTLE_PARTY_MEMBER_DATA,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id']); //デッキ所有者のプレイヤー名を更新
//         G_BATTLE_DENGER_ICON_ANIM(BATTLE_CARD_DECK_IMAGE_ARRAY[2],750,0); //!アイコンアニメ開始
//         G_BATTLE_DENGER_ICON_ANIM(BATTLE_CARD_DECK_IMAGE_ARRAY[1],750,0); //!アイコンアニメ開始
//         G_BATTLE_DENGER_ICON_ANIM(BATTLE_CARD_DECK_IMAGE_ARRAY[3],750,0); //!アイコンアニメ開始
//         BATTLE_CARD_DECK_INIT = true; //カードデッキ表示の初期化が完了
//         BATTLE_SCENE_STEP = 1;
//       }
//     }
//     break;
//     case 1: //シーン切り替え演出(開始)
//     {
//       var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(1);
//       if(transAnimFlag == false){ //アニメ再生が完了した場合
//         G_DELETE_TARNS_SCREEN_ANIM();
//         BATTLE_SCENE_STEP = 2; //バトルシーン切り替え演出を開始
//       }
//     }
//     break;
//     case 2: //シーン切り替え演出完了
//     {
//       BATTLE_CONTROLE_ENABLE = true;
//       BATTLE_CARD_SWIPE_ENABLE = true;
//       BATTLE_SCENE_STEP = 3;
//     }
//     break;
//     case 3: //戦闘コマンド送信待ち
//     {
//       if(BATTLE_BATTLE_RESULT_DATA != null){
//         BATTLE_SCENE_STEP = 4; //戦闘結果を取得出来た
//         BATTLE_CONTROLE_PAD_LAYER.visible = false; //ログ表示のため、コントロールパッドレイヤーを非表示にする。
//         BATTLE_BATTLE_MAX_TURN = G_BATTLE_GET_BATTLE_MAX_TURN(BATTLE_BATTLE_RESULT_DATA['battle_anim_log']); //戦闘の最大ターン数を取得
//         G_BATTLE_BATTLE_LOG_CREATE(BATTLE_BATLE_LOG_DISP_LAYER,BATTLE_BATTLE_RESULT_DATA['battle_log'],BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY); //ログを生成
//         G_BATTLE_CHARACTER_STATUS_INIT(BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_POS_ARRAY); //バトル開始のため、キャラクターの状態を初期化
//       }
//     }
//     break;
//     case 4: //戦闘アニメーション、戦闘ログ、初期化
//     {
//       if(isset(BATTLE_BATTLE_RESULT_DATA['battle_anim_log']) && isset(BATTLE_BATTLE_RESULT_DATA['battle_log'])){
//         var resultAnim = -1;
//         if(BATTLE_ANIM_PLAY_STACK == 0) resultAnim = G_BATTLE_BATTLE_ANIM_START(BATTLE_BATTLE_RESULT_DATA['battle_anim_log'],BATTLE_PARTY_MEMBER_AVATAR_DATA,
//         BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_PLAYER_POS_ARRAY,BATTLE_ENEMY_MEMBER_AVATAR_DATA,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_POS_ARRAY,BATTLE_BATTLE_TURN,BATTLE_BATTLE_TURN_END_STEP); //戦闘演出を開始
//         if(resultAnim == 2){
//           BATTLE_SCENE_STEP = 5; //戦闘演出終了
//           break;
//         }
//         if(resultAnim == 0) BATTLE_BATTLE_TURN++; //通常終了
//       }
//     }
//     break;
//     case 5: //戦闘演出終了待ち
//     {
//       if(BATTLE_ANIM_PLAY_STACK == 0){
//         var battleFinishResult = G_BATTLE_BATTLE_FINISH_ANIM_START(BATTLE_BATTLE_RESULT_DATA['battle_anim_log'],BATTLE_BATTLE_RESULT_EFFECT_OBJ,BATTLE_BATTLE_TYPE); //戦闘終了演出開始
//         if(battleFinishResult == 1){ //勝ちの時はドロップリストに移動
//           BATTLE_SCENE_STEP = 6;
//         }
//         else if(battleFinishResult == 2){ //負けの時はシーン終了処理に移動
//           BATTLE_LOG_SCROLLE_MAX_HEIGHT = BATTLE_BATTLE_LOG_TEXT_PARENT.y;
//           BATTLE_SCENE_STEP = 8;
//         }
//       }
//     }
//     break;
//     case 6:
//     {
//       if(BATTLE_ANIM_PLAY_STACK == 0){
//         G_BATTLE_PARTY_DROP_ANIM_START(BATTLE_BATTLE_SCENE_UI_LAYER,BATTLE_BATTLE_RESULT_DATA['battle_anim_log']); //ドロップリストを表示
//         BATTLE_LOG_SCROLLE_MAX_HEIGHT = BATTLE_BATTLE_LOG_TEXT_PARENT.y;
//         BATTLE_SCENE_STEP = 7;
//       }
//     }
//     break;
//     case 7:
//     {
//       if(WINDOW_LIST != null){ //ドロップリスト生成街待ち
//         BATTLE_SCENE_STEP = 8;
//       }
//     }
//     break;
//     case 8:
//     {
//       if(WINDOW_LIST == null){ //ドロップリスト閉じ待ち
//         BATTLE_TAP_TO_BACK_TEXT.visible = true;
//         BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.visible = true;
//         BATTLE_TAP_TO_BACK_TEXT['alpha_anim'] = true;
//         BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] = true;
//         BATTLE_SCENE_STEP = 9;
//       }
//     }
//     break;
//     case 9: //シーン終了待ち
//     {
//       if(BATTLE_TAP_TO_BACK_TEXT['alpha_anim'] == true) BATTLE_TAP_TO_BACK_TEXT.alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//       if(BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] == true) BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//     }
//     break;
//     case 10: //MAPシーン移動開始
//     {
//
//     }
//     break;
//     case 11: //このシーン終了
//     {
//
//     }
//     break;
//     default:
//     {
//
//     }
//     break;
//   }
// }
//
// function G_BATTLE_CHANGE_PVP_BATTLE_STEP(step){ //PVPの戦闘シーン制御関数
//   switch (step) {
//     case 0:
//     {
//       if(BATTLE_ENEMYS_DATA != null && BATTLE_PARTY_MEMBER_AVATAR_DATA != null && BATTLE_ENEMY_MEMBER_AVATAR_DATA != null && BATTLE_PLAYER_PARTY_FORMATION_DATA != null && BATTLE_ENEMY_PARTY_FORMATION_DATA != null && ASSET_LOADING == false){ //必要な通信情報が取得できた場合
//
//         //プレイヤー達の初期位置を更新
//         for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//           var getPos = null;
//           getPos = G_BATTLE_GET_CHARACTER_POS(-160,-200,plPos,BATTLE_PLAYER_PARTY_FORMATION_DATA,true);
//           BATTLE_PLAYER_POS_ARRAY[plPos].x = getPos['pos_x'];
//           BATTLE_PLAYER_POS_ARRAY[plPos].y = getPos['pos_y'];
//         }
//         //敵パーティの初期位置を更新
//         for (var plPos = 0; plPos < BATTLE_PARTY_MEMBER_MAX_COUNT; plPos++) {
//           var getPos = null;
//           getPos = G_BATTLE_GET_CHARACTER_POS(160,-200,plPos,BATTLE_ENEMY_PARTY_FORMATION_DATA,false);
//           BATTLE_ENEMY_POS_ARRAY[plPos].x = getPos['pos_x'];
//           BATTLE_ENEMY_POS_ARRAY[plPos].y = getPos['pos_y'];
//         }
//         //初期描画を開始
//         G_BATTLE_CREATE_USER_ANIM(BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_PARTY_MEMBER_AVATAR_DATA); //プレイヤーキャラクターを表示
//         G_BATTLE_CREATE_ENEMY_ANIM(BATTLE_ENEMY_POS_ARRAY,BATTLE_ENEMYS_DATA,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_MEMBER_AVATAR_DATA,BATTLE_BATTLE_TYPE); //敵キャラクターを表示
//         BATTLE_CARD_DECK_INIT = true; //カードデッキ表示の初期化が完了
//         BATTLE_SCENE_STEP = 1;
//       }
//     }
//     break;
//     case 1: //シーン切り替え演出(開始)
//     {
//       var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(1);
//       if(transAnimFlag == false){ //アニメ再生が完了した場合
//         G_DELETE_TARNS_SCREEN_ANIM();
//         BATTLE_SCENE_STEP = 2; //バトルシーン切り替え演出を開始
//       }
//     }
//     break;
//     case 2: //シーン切り替え演出完了
//     {
//       BATTLE_CONTROLE_ENABLE = true;
//       BATTLE_CARD_SWIPE_ENABLE = true;
//       BATTLE_SCENE_STEP = 3;
//     }
//     break;
//     case 3: //戦闘コマンド送信待ち
//     {
//       if(BATTLE_BATTLE_RESULT_DATA != null){
//         BATTLE_SCENE_STEP = 4; //戦闘結果を取得出来た
//         BATTLE_CONTROLE_PAD_LAYER.visible = false; //ログ表示のため、コントロールパッドレイヤーを非表示にする。
//         BATTLE_BATTLE_MAX_TURN = G_BATTLE_GET_BATTLE_MAX_TURN(BATTLE_BATTLE_RESULT_DATA['battle_anim_log']); //戦闘の最大ターン数を取得
//         G_BATTLE_BATTLE_LOG_CREATE(BATTLE_BATLE_LOG_DISP_LAYER,BATTLE_BATTLE_RESULT_DATA['battle_log'],BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY); //ログを生成
//         G_BATTLE_CHARACTER_STATUS_INIT(BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_POS_ARRAY); //バトル開始のため、キャラクターの状態を初期化
//       }
//     }
//     break;
//     case 4: //戦闘アニメーション、戦闘ログ、初期化
//     {
//       if(isset(BATTLE_BATTLE_RESULT_DATA['battle_anim_log']) && isset(BATTLE_BATTLE_RESULT_DATA['battle_log'])){
//         var resultAnim = -1;
//         if(BATTLE_ANIM_PLAY_STACK == 0) resultAnim = G_BATTLE_BATTLE_ANIM_START(BATTLE_BATTLE_RESULT_DATA['battle_anim_log'],BATTLE_PARTY_MEMBER_AVATAR_DATA,
//         BATTLE_PARTY_MEMBER_AVATAR_IMAGE,BATTLE_PLAYER_POS_ARRAY,BATTLE_ENEMY_MEMBER_AVATAR_DATA,BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_POS_ARRAY,BATTLE_BATTLE_TURN,BATTLE_BATTLE_TURN_END_STEP); //戦闘演出を開始
//         if(resultAnim == 2){
//           BATTLE_SCENE_STEP = 5; //戦闘演出終了
//           break;
//         }
//         if(resultAnim == 0) BATTLE_BATTLE_TURN++; //通常終了
//       }
//     }
//     break;
//     case 5: //戦闘演出終了待ち
//     {
//       if(BATTLE_ANIM_PLAY_STACK == 0){
//         var battleFinishResult = G_BATTLE_BATTLE_FINISH_ANIM_START(BATTLE_BATTLE_RESULT_DATA['battle_anim_log'],BATTLE_BATTLE_RESULT_EFFECT_OBJ,BATTLE_BATTLE_TYPE); //戦闘終了演出開始
//         if(battleFinishResult == 1 || battleFinishResult == 2 || battleFinishResult == 3){ //勝ちの時はドロップリストに移動
//           BATTLE_LOG_SCROLLE_MAX_HEIGHT = BATTLE_BATTLE_LOG_TEXT_PARENT.y;
//           BATTLE_SCENE_STEP = 8;
//         }
//       }
//     }
//     break;
//     case 6:
//     {
//       if(BATTLE_ANIM_PLAY_STACK == 0){
//         G_BATTLE_PARTY_DROP_ANIM_START(BATTLE_BATTLE_SCENE_UI_LAYER,BATTLE_BATTLE_RESULT_DATA['battle_anim_log']); //ドロップリストを表示
//         BATTLE_LOG_SCROLLE_MAX_HEIGHT = BATTLE_BATTLE_LOG_TEXT_PARENT.y;
//         BATTLE_SCENE_STEP = 7;
//       }
//     }
//     break;
//     case 7:
//     {
//       if(WINDOW_LIST != null){ //ドロップリスト生成街待ち
//         BATTLE_SCENE_STEP = 8;
//       }
//     }
//     break;
//     case 8:
//     {
//       if(WINDOW_LIST == null){ //ドロップリスト閉じ待ち
//         BATTLE_TAP_TO_BACK_TEXT.visible = true;
//         BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.visible = true;
//         BATTLE_TAP_TO_BACK_TEXT['alpha_anim'] = true;
//         BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] = true;
//         BATTLE_SCENE_STEP = 9;
//       }
//     }
//     break;
//     case 9: //シーン終了待ち
//     {
//       if(BATTLE_TAP_TO_BACK_TEXT['alpha_anim'] == true) BATTLE_TAP_TO_BACK_TEXT.alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//       if(BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] == true) BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.alpha = (BATTLE_ALPHA_EFFECT_ANIME_FRAME_COUNT * 0.01);
//     }
//     break;
//     case 10: //MAPシーン移動開始
//     {
//
//     }
//     break;
//     case 11: //このシーン終了
//     {
//
//     }
//     break;
//     default:
//     {
//
//     }
//     break;
//   }
// }
//
// function G_BATTLE_CHARACTER_STATUS_INIT(partyMemberAvatarImage,enemyMemberAvatarImage,enemyMemberPosArray){ //戦闘アニメ開始前にキャラクターの状態を初期化
//   for (var i = 0; i < partyMemberAvatarImage.length; i++) {
//     if(partyMemberAvatarImage[i]['select_image'] == true){
//       partyMemberAvatarImage[i]['select_image'] = false;
//       partyMemberAvatarImage[i].alpha = 1;
//     }
//   }
//
//   for (var i = 0; i < enemyMemberAvatarImage.length; i++) {
//     if(enemyMemberAvatarImage[i]['select_image'] == true){
//       enemyMemberAvatarImage[i]['select_image'] = false;
//       enemyMemberAvatarImage[i].alpha = 1;
//     }
//     if(enemyMemberPosArray[i]['select_target_bg'].visible == true){
//       enemyMemberPosArray[i]['select_target_bg'].visible = false;
//     }
//   }
// }
//
// function G_BATTLE_CREATE_ENEMY_ANIM(parentNodeArray,enemyMasterDatas,enemyMemberAvatarImage,enemyMemberAvatarDatas,battleType){ //敵のキャラクターアニメーションを生成する。
//   var charaScale = 1.5;
//   for (var i = 0; i < enemyMasterDatas.length; i++) {
//     G_BATTLE_ENEMY_DISP(parentNodeArray[i], charaScale, i, enemyMemberAvatarImage, enemyMemberAvatarDatas);
//     if(battleType == 0) parentNodeArray[i]['enemy_master_id'] = enemyMasterDatas[i]['enemy_index_id'];
//     else if(battleType == 1) parentNodeArray[i]['player_index_id'] = enemyMasterDatas[i]['player_index_id'];
//
//     parentNodeArray[i]['select_target_bg'] = CircleShape().addChildTo(enemyMemberAvatarImage[i]);
//     parentNodeArray[i]['select_target_bg'].fill = 'white';
//     parentNodeArray[i]['select_target_bg'].radius = 16;
//     parentNodeArray[i]['select_target_bg'].stroke = 'black';
//     parentNodeArray[i]['select_target_bg'].strokeWidth = 6;
//     //parentNodeArray[i]['select_target_bg'].y = parentNodeArray[i]['select_target_bg'].y + (enemyMemberAvatarImage[i].height / 4);
//     parentNodeArray[i]['select_target_bg'].visible = false;
//     parentNodeArray[i]['select_target_bg'].scaleX = parentNodeArray[i]['select_target_bg'].scaleX * -1;
//     parentNodeArray[i]['select_target_number'] = Label({ //デッキ所有者プレイヤー名表示用ラベルを生成
//       text: "",
//       fontSize: 32,
//       fill: 'black',
//       fontFamily: "'Consolas', 'Monaco', 'ＭＳ ゴシック'",
//     }).addChildTo(parentNodeArray[i]['select_target_bg']);
//     //残像用キャラクター生成
//     var afterAlpha = 0.6;
//     for(var j=0; j < 2; j++){
//       enemyMemberAvatarImage[i]['after_images'][j] = Sprite('ASSET_' + enemyMemberAvatarDatas[i]['avatar_asset_id'],256,256).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//       var afterImage = enemyMemberAvatarImage[i]['after_images'][j];
//       afterImage.setFrameIndex(0);
//       afterImage.setScale(1.5,1.5);
//       //afterImage.y = afterImage.y - (afterImage.height / 2);
//       afterImage.x = parentNodeArray[i].x;
//       afterImage.y = parentNodeArray[i].y;
//       afterImage.alpha = afterAlpha;
//       afterAlpha = afterAlpha - 0.15;
//       afterImage.scaleX *= -1; //敵残像のため、向きを反転
//       afterImage.visible = false;
//     }
//     //戦闘用エフェクトを生成
//     G_BATTLE_CREATE_CHARACTER_EFFECT(enemyMemberAvatarImage[i]);
//   }
// }
//
// function G_BATTLE_CREATE_USER_ANIM(parentNodeArray,partyMemberAvatarImage,partyMemberAvatarData){ //ユーザーのイメージを生成する。
//   var charaScale = 1.2;
//   for (var i = 0; i < partyMemberAvatarData.length; i++) {
//     //G_AVATAR_DISP(parentNodeArray[i], partyPlayersData[i], charaScale);
//     partyMemberAvatarImage[i] = Sprite('ASSET_' + partyMemberAvatarData[i]['avatar_asset_id'],256,256).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//     partyMemberAvatarImage[i].setScale(1.5,1.5);
//     partyMemberAvatarImage[i].x = parentNodeArray[i].x;
//     partyMemberAvatarImage[i].y = parentNodeArray[i].y;
//     //partyMemberAvatarImage[i].y = partyMemberAvatarImage[i].y - (partyMemberAvatarImage[i].height / 2);
//     partyMemberAvatarImage[i]['after_images'] = new Array(); //残像表示用画像配列
//     partyMemberAvatarImage[i]['player_index_id'] = partyMemberAvatarData[i]['player_index_id'];
//     partyMemberAvatarImage[i]['select_image'] = false; //画像を選択中か
//     partyMemberAvatarImage[i]['frame_index'] = 0;
//     partyMemberAvatarData[i]['frame_count_now'] = 0; //現在再生されているアニメフレーム番号
//     partyMemberAvatarData[i]['anim_category_id'] = 1; //現在再生中のアニメーションカテゴリー
//     partyMemberAvatarData[i]['loop_flag'] = true; //アニメーションループが有効か
//     partyMemberAvatarData[i]['anim_direction'] = 0; //再生中のアニメの進行度 0:停止 1:再生中 2:終了(ループフラグ有効時は無効)
//     partyMemberAvatarData[i]['refrect_flag'] = false; //向きを反転させる必要があるか。
//     partyMemberAvatarData[i]['anim_frame_controle'] = false;
//     parentNodeArray[i]['player_index_id'] = partyMemberAvatarData[i]['player_index_id'];
//
//     //ダメージ表示用テキストを生成
//     partyMemberAvatarImage[i]['hit_point_text'] = G_BATTLE_CREATE_HIT_POINT_TEXT(BATTLE_BATTLE_SCENE_UI_LAYER,parentNodeArray[i]);
//     //HPゲージを表示
//     partyMemberAvatarImage[i]['hit_point_gauge'] = G_BATTLE_CREATE_HIT_POINT_GAUGE(BATTLE_BATTLE_SCENE_UI_LAYER,parentNodeArray[i],partyMemberAvatarImage[i]);
//
//     //残像用キャラクター生成
//     var afterAlpha = 0.6;
//     for(var j=0; j < 2; j++){
//       partyMemberAvatarImage[i]['after_images'][j] = Sprite('ASSET_' + partyMemberAvatarData[i]['avatar_asset_id'],256,256).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//       var afterImage = partyMemberAvatarImage[i]['after_images'][j];
//       afterImage.setFrameIndex(0);
//       afterImage.setScale(1.5,1.5);
//       afterImage.x = parentNodeArray[i].x;
//       afterImage.y = parentNodeArray[i].y;
//       //afterImage.y = afterImage.y - (afterImage.height / 2);
//       afterImage.alpha = afterAlpha;
//       afterAlpha = afterAlpha - 0.15;
//       afterImage.visible = false;
//     }
//
//     //戦闘用エフェクトを生成
//     G_BATTLE_CREATE_CHARACTER_EFFECT(partyMemberAvatarImage[i]);
//   }
// }
//
// function G_BATTLE_GET_CHARACTER_POS(nodePosX,nodePosY,characterNo,formationData,playerOrEnemy){ //キャラクターの位置を取得 playerOrEnemy true:player false:enemy
//   var resultPos = new Array();
//   resultPos['pos_x'] = 0;
//   resultPos['pos_y'] = 0;
//   var posGrid = (SCREEN_WIDTH / 10);
//   var posXList = new Array();
//   if(playerOrEnemy == true){ //プレイヤー
//     posXList[0] = nodePosX - (posGrid * 1.2);
//     posXList[1] = nodePosX;
//     posXList[2] = nodePosX + (posGrid * 1.2);
//   }
//   else{ //敵
//     posXList[0] = nodePosX + (posGrid * 1.2);
//     posXList[1] = nodePosX;
//     posXList[2] = nodePosX - (posGrid * 1.2);
//   }
//   var posYList = new Array();
//   posYList[0] = nodePosY - (posGrid * 2);
//   posYList[1] = nodePosY - posGrid;
//   posYList[2] = nodePosY;
//   posYList[3] = nodePosY + posGrid;
//   posYList[4] = nodePosY + (posGrid * 2);
//   var formationPosXList = formationData['positions'].split(',');
//   if(Array.isArray(formationPosXList)){
//     for (var i = 0; i < formationPosXList.length; i++) {
//       if(i == characterNo) {
//         resultPos['pos_x'] = posXList[parseInt(formationPosXList[i])];
//       }
//     }
//   }
//   resultPos['pos_y'] = posYList[parseInt(characterNo)];
//   return resultPos;
// }
//
// function G_BATTLE_ENEMY_DISP(parentBase, enemyScale, index, enemyMemberAvatarImage, enemyMemberAvatarData) //敵のスプライトを表示
// {
//   if(isset(enemyMemberAvatarData[index]['avatar_asset_id'])){
//     enemyMemberAvatarImage[index] = Sprite('ASSET_' + enemyMemberAvatarData[index]['avatar_asset_id'],256,256).addChildTo(BATTLE_BATTLE_SCENE_CHARA_LAYER);
//     enemyMemberAvatarImage[index].setFrameIndex(0);
//     enemyMemberAvatarImage[index].setScale(enemyScale, enemyScale);
//     enemyMemberAvatarImage[index].scaleX *= -1;
//     enemyMemberAvatarImage[index].x = parentBase.x;
//     enemyMemberAvatarImage[index].y = parentBase.y;
//     //enemyMemberAvatarImage[index].y = enemyMemberAvatarImage[index].y - (enemyMemberAvatarImage[index].height / 2);
//     enemyMemberAvatarImage[index]['after_images'] = new Array(); //残像表示用画像配列
//     enemyMemberAvatarImage[index]['select_image'] = false;
//     enemyMemberAvatarImage[index]['frame_index'] = 0;
//     enemyMemberAvatarData[index]['frame_count_now'] = 0; //現在再生されているアニメフレーム番号
//     enemyMemberAvatarData[index]['anim_category_id'] = 1; //現在再生中のアニメーションカテゴリー
//     enemyMemberAvatarData[index]['loop_flag'] = true; //アニメーションループが有効か
//     enemyMemberAvatarData[index]['anim_direction'] = 0; //再生中のアニメの進行度 0:停止 1:再生中 2:終了(ループフラグ有効時は無効)
//     enemyMemberAvatarData[index]['refrect_flag'] = true; //向きを反転させる必要があるか。
//     enemyMemberAvatarData[index]['anim_frame_controle'] = false;
//
//     //ダメージ表示用テキストを生成
//     enemyMemberAvatarImage[index]['hit_point_text'] = G_BATTLE_CREATE_HIT_POINT_TEXT(BATTLE_BATTLE_SCENE_UI_LAYER,parentBase);
//     //HPゲージを表示
//     enemyMemberAvatarImage[index]['hit_point_gauge'] = G_BATTLE_CREATE_HIT_POINT_GAUGE(BATTLE_BATTLE_SCENE_UI_LAYER,parentBase,enemyMemberAvatarImage[index]);
//
//     //敵選択用ボタンを生成
//     var enemyImageButton = Button({
//       width: 32,         // 横サイズ
//       height: 96,        // 縦サイズ
//     }).addChildTo(enemyMemberAvatarImage[index]);
//     enemyImageButton.y = enemyImageButton.y + (enemyImageButton.height);
//     enemyImageButton['button_index'] = index;
//     enemyImageButton.onpointend = function(e){
//       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//       if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//         BATTLE_USER_SELECT_ENEMY_INDEX = this['button_index']; //敵選択indexを更新
//         G_BATTLE_CHANGE_USER_SELECT_ENEMY(BATTLE_ENEMY_MEMBER_AVATAR_IMAGE,BATTLE_ENEMY_POS_ARRAY,BATTLE_USER_SELECT_ENEMY_INDEX); //選択中の敵矢印のvisibleを更新
//       }
//     };
//     enemyImageButton.visible = false;
//   }
// }
//
// function G_BATTLE_BACK_GROUND_DISP(parentBase, playerBattleInstance, assetId) //戦闘画面の背景を表示
// {
//   if(playerBattleInstance != null){ //戦闘画面背景画像の表示
//     if(isset(playerBattleInstance['map_master_data'])){
//       var battleScreenBackGround = Sprite('ASSET_' + playerBattleInstance['map_master_data']['battle_map_asset_id']).addChildTo(parentBase);
//     }
//   }
//   else if(assetId != null){ //PVPの時
//     var battleScreenBackGround = Sprite('ASSET_' + assetId).addChildTo(parentBase);
//   }
// }
//
// function G_BATTLE_CREATE_BATTLE_CONTROLE_PAD_LAYER(parentBase) //コントロールパッドを生成
// {
//   var controlePadBackGround = Sprite('ASSET_111').addChildTo(parentBase);
//   parentBase['player_name_label_bg'] = Sprite('ASSET_139').addChildTo(parentBase); //名前表示用スペース背景
//   parentBase['player_name_label_bg'].x = parentBase['player_name_label_bg'].x - (controlePadBackGround.width / 3.5);
//   parentBase['player_name_label_bg'].y = parentBase['player_name_label_bg'].y - (controlePadBackGround.height / 2.6);
//   parentBase['player_name_label_bg'].setScale(0.8,0.8);
//   parentBase['player_name_label'] =  Label({ //デッキ所有者プレイヤー名表示用ラベルを生成
//     text: "",
//     fontSize: 32,
//     fill: 'black',
//   }).addChildTo(parentBase['player_name_label_bg']);
//   parentBase['default_command_button_bg'] = Sprite('ASSET_35').addChildTo(parentBase); //デフォルドアクション実行用ボタン背景
//   parentBase['default_command_button_bg'].x = parentBase['default_command_button_bg'].x + (controlePadBackGround.width / 3.5);
//   parentBase['default_command_button_bg'].y = parentBase['default_command_button_bg'].y - (controlePadBackGround.height / 2.6);
//   parentBase['default_command_button_bg'].setScale(0.8,0.8);
//   parentBase['default_command_button_label'] = Label({ //デッキ所有者プレイヤー名表示用ラベルを生成
//     text: "通常攻撃",
//     fontSize: 32,
//     fill: 'white',
//   }).addChildTo(parentBase['default_command_button_bg']);
//   parentBase['default_command_button'] = Button({
//     width: 320,         // 横サイズ
//     height: 64,        // 縦サイズ
//   }).addChildTo(parentBase['default_command_button_bg']);
//   parentBase['default_command_button'].onpointend = function(e){
//     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//   if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true  && BATTLE_CARD_SWIPE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//     BATTLE_CONTROLE_ENABLE = false;
//     BATTLE_CARD_SWIPE_ENABLE = false;
//     G_BATTLE_SET_PLAYER_SELECT_DECK(BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id'],true);
//     G_BATTLE_SET_PLAYER_SELECT_TARGETS(BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id'],BATTLE_ENEMY_POS_ARRAY,BATTLE_PLAYER_SELECT_TARGET_NUMBERS);
//     if(BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX < (BATTLE_PARTY_MEMBER_COUNT - 1)){ //他のメンバーのカード選択が残っている場合
//       BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX = BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX + 1; //メンバーを変えてカード選択を行う
//       BATTLE_SELECT_DECK_INDEX = 0; //デッキのインデックスも初期化
//       G_BATTLE_CARD_SELECT_SCENE_RELOAD(250,BATTLE_CONTROLE_PAD_LAYER,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX],null,BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_CARD_DECK_IMAGE_POS_ARRAY,BATTLE_SELECT_DECK_INDEX,BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE);
//       G_BATTLE_CONTROLE_PAD_PLAYER_NAME_DISP(BATTLE_CONTROLE_PAD_LAYER['player_name_label'],BATTLE_PARTY_MEMBER_DATA,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id']); //デッキ所有者のプレイヤー名を更新
//     }
//     else{ //メンバーのカード選択が終了した場合
//       BATTLE_CONTROLE_ENABLE = false;
//       BATTLE_CARD_SWIPE_ENABLE = false;
//       G_BATTLE_COMMAND_SUBMIT(BATTLE_PARTY_MEMBER_DATA,BATTLE_PLAYER_SELECT_DECK_DATAS,BATTLE_PLAYER_SELECT_TARGET_NUMBERS,BATTLE_ENEMYS_DATA);
//       G_BATTLE_CARD_SELECT_SCENE_ANIM_END(250,BATTLE_CARD_DECK_IMAGE_ARRAY); //デッキ選択終了アニメーションを再生
//     }
//   }
// };
//   parentBase['default_command_button'].visible = false;
//
// }
//
// function G_GET_SORT_CARD_DECK_MAX_INDEX(CardDeckData){ //ソートしたデッキデータの最大数を取得
//   //デッキデータ検索用のデッキ配列を作成
//   return (CardDeckData['player_card_decks'].length - 1);
// }
//
// function G_BATTLE_PLAYER_CARD_DECK_DISP(parentBase,CardDeckData,playerData,deckImageArray,deckImagePosArray,index,playersPosNodeArray,partyMemberAvatarImage){ //プレイヤー(自身以外も含む)が所持しているカードデッキ一覧を表示
//   var playerIndexId = -1;
//   playerIndexId = CardDeckData['player_card_decks'][0]['player_index_id'];
//   for (var pp = 0; pp < partyMemberAvatarImage.length; pp++) { //プレイヤー選択中の矢印の表示判定
//     if(partyMemberAvatarImage[pp]['player_index_id'] == playerIndexId){
//       if(partyMemberAvatarImage[pp]['select_image'] == false){
//         partyMemberAvatarImage[pp]['select_image'] = true;
//       }
//     }
//     else{
//       if(partyMemberAvatarImage[pp]['select_image'] == true){
//         partyMemberAvatarImage[pp]['select_image'] = false;
//         partyMemberAvatarImage[pp].alpha = 1;
//       }
//     }
//   }
//
//   var maxIndex = CardDeckData['player_card_decks'].length - 1;
//   //順番変更用のデッキデータ配列
//   var replaceCardDeckData = new Array();
//   //デッキ順取得用の配列をソート
//   var targetIndex = index;
//
//   if(maxIndex < targetIndex){
//     var diff = targetIndex - maxIndex;
//     if(maxIndex == 1 && diff != 0){
//       targetIndex = 1;
//     }
//     else{
//       targetIndex = 0;
//     }
//   }
//   if(targetIndex < 0){
//     if(maxIndex == 1 && targetIndex < -1){
//       targetIndex = 0;
//     }
//     else{
//       targetIndex = maxIndex;
//     }
//   }
//   //if(CardDeckData['player_card_decks'].length < (targetIndex + 1)) replaceCardDeckData[2] = CardDeckData['player_card_decks'][CardDeckData['player_card_decks'].length - 1];
//   replaceCardDeckData[2] = CardDeckData['player_card_decks'][targetIndex];
//   var centerIndex = targetIndex;
//   targetIndex = (index - 1);
//
//   if(maxIndex < targetIndex){
//     var diff = targetIndex - maxIndex;
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 1;
//       if(centerIndex == 1) targetIndex = 0;
//     }
//     else{
//       targetIndex = 0;
//     }
//   }
//   if(targetIndex < 0){
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 1;
//       if(centerIndex == 1) targetIndex = 0;
//     }
//     else{
//       targetIndex = maxIndex;
//     }
//   }
//   //if(CardDeckData['player_card_decks'].length < (targetIndex + 1)) replaceCardDeckData[1] = CardDeckData['player_card_decks'][CardDeckData['player_card_decks'].length - 1];
//   replaceCardDeckData[1] = CardDeckData['player_card_decks'][targetIndex];
//
//   targetIndex = (index - 2);
//   if(targetIndex < 0){
//     if(targetIndex == -1) targetIndex = maxIndex;
//     else if(targetIndex == -2){
//       targetIndex = (maxIndex - 1);
//     }
//   }
//   if(maxIndex < targetIndex){
//     var diff = targetIndex - maxIndex;
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 1;
//       if(centerIndex == 1) targetIndex = 0;
//     }
//     else{
//       targetIndex = 0;
//     }
//   }
//   if(targetIndex < 0){
//     if(maxIndex == 1){
//       if(centerIndex == 1) targetIndex = 1;
//       if(centerIndex == 0) targetIndex = 0;
//     }
//     else{
//       targetIndex = maxIndex;
//     }
//   }
//   //if(CardDeckData['player_card_decks'].length < (targetIndex + 1)) replaceCardDeckData[0] = CardDeckData['player_card_decks'][CardDeckData['player_card_decks'].length - 1];
//   replaceCardDeckData[0] = CardDeckData['player_card_decks'][targetIndex];
//
//   targetIndex = (index + 1);
//   if(maxIndex < targetIndex){
//     var diff = targetIndex - maxIndex;
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 1;
//       if(centerIndex == 1) targetIndex = 0;
//     }
//     else{
//       targetIndex = 0;
//     }
//   }
//   if(targetIndex < 0){
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 1;
//       if(centerIndex == 1) targetIndex = 0;
//     }
//     else{
//       targetIndex = maxIndex;
//     }
//   }
//   //if(CardDeckData['player_card_decks'].length < (targetIndex + 1)) replaceCardDeckData[3] = CardDeckData['player_card_decks'][CardDeckData['player_card_decks'].length - 1];
//   replaceCardDeckData[3] = CardDeckData['player_card_decks'][targetIndex];
//
//   targetIndex = (index + 2);
//   if(maxIndex < targetIndex){
//     if(targetIndex == (maxIndex + 1)) targetIndex = 0;
//     else if(targetIndex == (maxIndex + 2)){
//       targetIndex = 1;
//     }
//   }
//   if(maxIndex < targetIndex){
//     var diff = targetIndex - maxIndex;
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 0;
//       if(centerIndex == 1) targetIndex = 1;
//     }
//     else{
//       targetIndex = 0;
//     }
//   }
//   if(targetIndex < 0){
//     if(maxIndex == 1){
//       if(centerIndex == 0) targetIndex = 0;
//       if(centerIndex == 1) targetIndex = 1;
//     }
//     else{
//       targetIndex = maxIndex;
//     }
//   }
//   //if(CardDeckData['player_card_decks'].length < (targetIndex + 1)) replaceCardDeckData[4] = CardDeckData['player_card_decks'][CardDeckData['player_card_decks'].length - 1];
//   replaceCardDeckData[4] = CardDeckData['player_card_decks'][targetIndex];
//
//   //配列を初期化
//   if(deckImageArray[0] != null){
//     deckImageArray[0].remove();
//   }
//   if(deckImageArray[1] != null){
//     deckImageArray[1].remove();
//   }
//   if(deckImageArray[2] != null){
//     deckImageArray[2].remove();
//   }
//   if(deckImageArray[3] != null){
//     deckImageArray[3].remove();
//   }
//   if(deckImageArray[4] != null){
//     deckImageArray[4].remove();
//   }
//   deckImageArray[0] = null;
//   deckImageArray[1] = null;
//   deckImageArray[2] = null;
//   deckImageArray[3] = null;
//   deckImageArray[4] = null;
//   console.log("デッキ名");
//   console.log(replaceCardDeckData);
//   G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,0,CardDeckData['card_master_datas']);
//   G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,4,CardDeckData['card_master_datas']);
//   G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,1,CardDeckData['card_master_datas']);
//   G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,3,CardDeckData['card_master_datas']);
//   G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,2,CardDeckData['card_master_datas']);
// }
//
// function G_BATTLE_CREATE_CARD_CONTROLE_BUTTON(parentBase)
// {
//   var cardMoveBtnLeft = Button({
//     width: 192,         // 横サイズ
//     height: 192,        // 縦サイズ
//   }).addChildTo(parentBase);
//     cardMoveBtnLeft.x = (cardMoveBtnLeft.x - (SCREEN_WIDTH / 3));
//     cardMoveBtnLeft.y = (cardMoveBtnLeft.y + (cardMoveBtnLeft.height / 3));
//     cardMoveBtnLeft.onpointend = function(e){
//       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//     if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//       BATTLE_CARD_MOVE_CONTROLE = 1; //左に移動
//     }
//   };
//   cardMoveBtnLeft.visible = false;
//
//   var cardMoveBtnRight = Button({
//     width: 192,         // 横サイズ
//     height: 192,        // 縦サイズ
//   }).addChildTo(parentBase);
//     cardMoveBtnRight.x = (cardMoveBtnRight.x + (SCREEN_WIDTH / 3));
//     cardMoveBtnRight.y = (cardMoveBtnRight.y + (cardMoveBtnRight.height / 3));
//     cardMoveBtnRight.onpointend = function(e){
//       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//     if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//       BATTLE_CARD_MOVE_CONTROLE = 2; //右に移動
//     }
//   };
//   cardMoveBtnRight.visible = false;
//
//   var cardMoveBtnCenter = Button({
//     width: 192,         // 横サイズ
//     height: 192,        // 縦サイズ
//   }).addChildTo(parentBase);
//   cardMoveBtnCenter.y = (cardMoveBtnCenter.y + (cardMoveBtnCenter.height / 3));
//   cardMoveBtnCenter.onpointmove = function(e){
//   if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && BATTLE_CARD_SWIPE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//     BATTLE_CARD_TOUCH_SWIPE_POSITION_Y = e.pointer.y;
//   }
//   };
//   cardMoveBtnCenter.onpointstart = function(e){
//   if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && BATTLE_CARD_SWIPE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//     BATTLE_CARD_TOUCH_START_POSITION_Y = e.pointer.y;
//   }
//   };
//   cardMoveBtnCenter.onpointend = function(e){
//   if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && BATTLE_CARD_SWIPE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//     if(BATTLE_CARD_TOUCH_SWIPE_POSITION_Y != 0){ //スワイプを行なった
//       if(this.hitTest(e.pointer.x,e.pointer.y)) return;
//       var swipeResult = BATTLE_CARD_TOUCH_START_POSITION_Y - BATTLE_CARD_TOUCH_SWIPE_POSITION_Y;
//       if((SCREEN_HEIGHT / 4) < swipeResult){ //立て画面サイズの3分の1以上上方向にスワイプした場合のみ、スワイプ判定とする
//         G_BATTLE_CARD_SWIPE_ANIM_START(BATTLE_CARD_DECK_IMAGE_ARRAY,BATTLE_CARD_DECK_IMAGE_POS_ARRAY,200);
//       }
//     }
//     else{ //通常タップ時の挙動
//       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//       console.log("スワイプではなく、通常タップを行いました。");
//     }
//     BATTLE_CARD_TOUCH_START_POSITION_Y = 0;
//     BATTLE_CARD_TOUCH_SWIPE_POSITION_Y = 0;
//   }
//   };
//   cardMoveBtnCenter.visible = false;
// }
//
// function G_BATTLE_START_DECK_CHANGE_ANIM(deckImageArray,deckImagePosArray,speed,direction,parentBase,CardDeckData,playerData,index,battlePlayersPos,partyMemberAvatarImage) //デッキ切り替えアニメの開始 direction 0:右 1:左
// {
//   var flag = true; //アニメーション継続フラグ false = 停止
//   if(isset(deckImageArray[0]) && isset(deckImageArray[1]) && isset(deckImageArray[2]) && isset(deckImageArray[3]) && isset(deckImageArray[4])){
//     BATTLE_CONTROLE_ENABLE = false; //アニメーション中のため、ユーザー操作を制限する。
//     if(direction == 1){ //右
//       deckImageArray[0].tweener.to({
//         x: deckImagePosArray[1]['pos_x'], y: deckImagePosArray[1]['pos_y'],
//         scaleX: deckImageArray[1].scaleX,
//         scaleY: deckImageArray[1].scaleY,
//       }, speed).play();
//
//       deckImageArray[1].tweener.to({
//         x: deckImagePosArray[2]['pos_x'], y: deckImagePosArray[2]['pos_y'],
//         scaleX: deckImageArray[2].scaleX,
//         scaleY: deckImageArray[2].scaleY,
//       }, speed).play();
//
//       deckImageArray[2].tweener.to({
//         x: deckImagePosArray[3]['pos_x'], y: deckImagePosArray[3]['pos_y'],
//         scaleX: deckImageArray[3].scaleX,
//         scaleY: deckImageArray[3].scaleY,
//       }, speed).play();
//
//       deckImageArray[3].tweener.to({
//         x: deckImagePosArray[4]['pos_x'], y: deckImagePosArray[4]['pos_y'],
//         scaleX: deckImageArray[4].scaleX,
//         scaleY: deckImageArray[4].scaleY,
//       }, speed).play();
//     }
//     else{
//       deckImageArray[4].tweener.to({
//         x: deckImagePosArray[3]['pos_x'], y: deckImagePosArray[3]['pos_y'],
//         scaleX: deckImageArray[3].scaleX,
//         scaleY: deckImageArray[3].scaleY,
//       }, speed).play();
//
//       deckImageArray[3].tweener.to({
//         x: deckImagePosArray[2]['pos_x'], y: deckImagePosArray[2]['pos_y'],
//         scaleX: deckImageArray[2].scaleX,
//         scaleY: deckImageArray[2].scaleY,
//       }, speed).play();
//
//       deckImageArray[2].tweener.to({
//         x: deckImagePosArray[1]['pos_x'], y: deckImagePosArray[1]['pos_y'],
//         scaleX: deckImageArray[1].scaleX,
//         scaleY: deckImageArray[1].scaleY,
//       }, speed).play();
//
//       deckImageArray[1].tweener.to({
//         x: deckImagePosArray[0]['pos_x'], y: deckImagePosArray[0]['pos_y'],
//         scaleX: deckImageArray[0].scaleX,
//         scaleY: deckImageArray[0].scaleY,
//       }, speed).play();
//     }
//     //アニメーションの最後にコールバック関数を呼び出す
//     deckImageArray[2].tweener.call(function(){
//       G_BATTLE_PLAYER_CARD_DECK_DISP(parentBase,CardDeckData,playerData,deckImageArray,deckImagePosArray,index,battlePlayersPos,partyMemberAvatarImage);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[2],750,0);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[1],750,0);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[3],750,0);
//       BATTLE_CONTROLE_ENABLE = true;
//     });
//   }
// }
//
// function G_BATTLE_CARD_SWIPE_ANIM_START(deckImageArray,deckImagePosArray,speed,playerData,index) //スワイプ時のアニメーションを開始する。
// {
//   if(isset(deckImageArray[2]) && isset(deckImagePosArray[2])){
//     if(isset(deckImageArray[2]['deck_denger_icon_red'])){
//       if(deckImageArray[2]['deck_denger_icon_red'].visible == true){ //デッキが使用不可だった場合
//         if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && BATTLE_CARD_SWIPE_ENABLE == true){
//           BATTLE_CONTROLE_ENABLE = false;
//           BATTLE_CARD_SWIPE_ENABLE = false;
//           //警告ウィンドウ表示処理
//           if(isset(deckImageArray[2]['deck_denger_icon_button'])){
//             G_BATTLE_CREATE_DENGER_ICON_DIALOG(deckImageArray[2]['deck_denger_icon_button']['button_index'],deckImageArray[2]['deck_denger_icon_button']);
//           }
//         }
//         return 0;
//       }
//     }
//   }
//   //アニメーション実行のため、操作を制限
//   BATTLE_CONTROLE_ENABLE = false;
//   BATTLE_CARD_SWIPE_ENABLE = false;
//   if(isset(deckImageArray[2]) && isset(deckImagePosArray[2])){
//     if(isset(deckImageArray[2]['deck_denger_icon'])){
//       deckImageArray[2]['deck_denger_icon'].visible = false;
//     }
//     if(isset(deckImageArray[2])){
//       deckImageArray[2]['deck_name_label'].text = "";
//     }
//     deckImageArray[2].tweener.to({
//       x: 0, y: deckImagePosArray[2]['pos_y'] - (SCREEN_HEIGHT / 2.3),
//     }, speed,"swing").play();
//     deckImageArray[2].tweener.wait(speed * 2).play();
//     deckImageArray[2].tweener.scaleBy(0.5, speed * 2).play();
//     deckImageArray[2].tweener.wait(speed * 2).play();
//     deckImageArray[2].tweener.to({
//       alpha: 0,
//     }, (speed * 2)).play();
//     deckImageArray[2].tweener.call(function(){
//       console.log(BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]);
//       G_BATTLE_SET_PLAYER_SELECT_DECK(deckImageArray,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id']);
//       G_BATTLE_SET_PLAYER_SELECT_TARGETS(BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id'],BATTLE_ENEMY_POS_ARRAY,BATTLE_PLAYER_SELECT_TARGET_NUMBERS);
//       if(BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX < (BATTLE_PARTY_MEMBER_COUNT - 1)){ //他のメンバーのカード選択が残っている場合
//         BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX = BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX + 1; //メンバーを変えてカード選択を行う
//         BATTLE_SELECT_DECK_INDEX = 0; //デッキのインデックスも初期化
//         G_BATTLE_CARD_SELECT_SCENE_RELOAD(250,BATTLE_CONTROLE_PAD_LAYER,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX],null,deckImageArray,deckImagePosArray,BATTLE_SELECT_DECK_INDEX,BATTLE_PLAYER_POS_ARRAY,BATTLE_PARTY_MEMBER_AVATAR_IMAGE);
//         G_BATTLE_CONTROLE_PAD_PLAYER_NAME_DISP(BATTLE_CONTROLE_PAD_LAYER['player_name_label'],BATTLE_PARTY_MEMBER_DATA,BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]['player_card_decks'][0]['player_index_id']); //デッキ所有者のプレイヤー名を更新
//       }
//       else{ //メンバーのカード選択が終了した場合
//         BATTLE_CONTROLE_ENABLE = false;
//         BATTLE_CARD_SWIPE_ENABLE = false;
//         G_BATTLE_COMMAND_SUBMIT(BATTLE_PARTY_MEMBER_DATA,BATTLE_PLAYER_SELECT_DECK_DATAS,BATTLE_PLAYER_SELECT_TARGET_NUMBERS,BATTLE_ENEMYS_DATA);
//         G_BATTLE_CARD_SELECT_SCENE_ANIM_END(250,deckImageArray); //デッキ選択終了アニメーションを再生
//       }
//     });
//   }
// }
//
// function G_BATTLE_CARD_SELECT_SCENE_ANIM_END(speed,deckImageArray) //最後のカード選択終了時のアニメーション
// {
//   if(isset(deckImageArray[1]) && isset(deckImageArray[3]) && isset(deckImageArray[0]) && isset(deckImageArray[4]) && isset(deckImageArray[2])){
//     deckImageArray[0].alpha = 0;
//     deckImageArray[4].alpha = 0;
//     deckImageArray[1].tweener.to({
//       alpha: 0,
//     }, speed).play();
//     deckImageArray[2].tweener.to({
//       alpha: 0,
//     }, speed).play();
//     deckImageArray[3].tweener.to({
//       alpha: 0,
//     }, speed).play();
//   }
// }
//
// function G_BATTLE_CARD_SELECT_SCENE_RELOAD(speed,parentBase,CardDeckData,playerData,deckImageArray,deckImagePosArray,index,playersPosNodeArray,partyMemberAvatarImage) //カード選択シーンを再初期化
// {
//   if(isset(deckImageArray[1]) && isset(deckImageArray[3]) && isset(deckImageArray[0]) && isset(deckImageArray[4]) && isset(deckImageArray[2])){
//     deckImageArray[0].alpha = 0;
//     deckImageArray[4].alpha = 0;
//     deckImageArray[1].tweener.to({
//       alpha: 0,
//     }, speed).play();
//     deckImageArray[2].tweener.to({
//       alpha: 0,
//     }, speed).play();
//     deckImageArray[3].tweener.to({
//       alpha: 0,
//     }, speed).play();
//     deckImageArray[3].tweener.call(function(){
//       G_BATTLE_PLAYER_CARD_DECK_DISP(parentBase,CardDeckData,playerData,deckImageArray,deckImagePosArray,index,playersPosNodeArray,partyMemberAvatarImage);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[2],750,0);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[1],750,0);
//       G_BATTLE_DENGER_ICON_ANIM(deckImageArray[3],750,0);
//       BATTLE_SORT_DECK_MAX_INDEX = G_GET_SORT_CARD_DECK_MAX_INDEX(BATTLE_PARTY_MEMBER_CARD_DECK[BATTLE_PARTY_MEMBER_DECK_SELECT_INDEX]); //整形後のデッキデータの最大インデックスを更新
//       if(isset(deckImageArray[1]) && isset(deckImageArray[2]) && isset(deckImageArray[3]) && isset(deckImageArray[0]) && isset(deckImageArray[4])){
//         deckImageArray[0].alpha = 0;
//         deckImageArray[1].alpha = 0;
//         deckImageArray[2].alpha = 0;
//         deckImageArray[3].alpha = 0;
//         deckImageArray[4].alpha = 0;
//
//         deckImageArray[1].tweener.to({
//           alpha: 1,
//         }, speed).play();
//         deckImageArray[2].tweener.to({
//           alpha: 1,
//         }, speed).play();
//         deckImageArray[3].tweener.to({
//           alpha: 1,
//         }, speed).play();
//         deckImageArray[3].tweener.call(function(){
//           deckImageArray[0].alpha = 1;
//           deckImageArray[4].alpha = 1;
//             BATTLE_CONTROLE_ENABLE = true;
//             BATTLE_CARD_SWIPE_ENABLE = true;
//         });
//       }
//     });
//   }
// }
//
// function G_BATTLE_CONTROLE_PAD_PLAYER_NAME_DISP(labelObj,partyMemberData,playerIndexId) //コントロールパッドにプレイヤー名を表示する。
// {
//   for (var i = 0; i < partyMemberData.length; i++) {
//     if(partyMemberData[i]['player_index_id'] == playerIndexId){ //プレイヤーIDが一致した場合
//       labelObj.text = partyMemberData[i]['player_name']; //プレイヤー名を表示
//     }
//   }
// }
//
// function G_BATTLE_SET_PLAYER_SELECT_DECK(deckImageArray,playerIndexId,defaultDeck = false) //ユーザーが選択したデッキを配列に挿入
// {
//   if(defaultDeck == false){
//     if(isset(deckImageArray[2])){
//       if(isset(deckImageArray[2]['deck_number'])){
//         var insertPlayerDeckData = new Object();
//         insertPlayerDeckData['player_index_id'] = playerIndexId;
//         insertPlayerDeckData['player_deck_number'] = deckImageArray[2]['deck_number'];
//         BATTLE_PLAYER_SELECT_DECK_DATAS[Object.keys(BATTLE_PLAYER_SELECT_DECK_DATAS).length] = insertPlayerDeckData;
//       }
//     }
//   }
//   else{ //デフォルトデッキを使用する場合
//     var insertPlayerDeckData = new Object();
//     insertPlayerDeckData['player_index_id'] = playerIndexId;
//     insertPlayerDeckData['player_deck_number'] = 0; //仮の数値
//     BATTLE_PLAYER_SELECT_DECK_DATAS[Object.keys(BATTLE_PLAYER_SELECT_DECK_DATAS).length] = insertPlayerDeckData;
//   }
// }
//
// function G_BATTLE_DENGER_ICON_ANIM(cardDeckImage,speed,alphaVal) //!アイコンのアニメーションを実行
// {
//   if(isset(cardDeckImage['deck_denger_icon'])){
//     if(cardDeckImage['deck_denger_icon'].visible == true) //アイコンが表示されている場合
//     {
//       cardDeckImage['deck_denger_icon'].tweener.to({
//         alpha: alphaVal,
//       }, speed).play();
//       if(alphaVal == 1){
//         cardDeckImage['deck_denger_icon'].tweener.call(function(){
//           G_BATTLE_DENGER_ICON_ANIM(cardDeckImage,speed,0);
//         });
//       }
//       else{
//         cardDeckImage['deck_denger_icon'].tweener.call(function(){
//           G_BATTLE_DENGER_ICON_ANIM(cardDeckImage,speed,1);
//         });
//       }
//     }
//   }
// }
//
// function G_BATTLE_CREATE_DENGER_ICON_DIALOG(buttonIndex,checkParam) //!アイコンのボタンをを押した
// {
//   var dialogText = "";
//   var dialogTitleText = "警告";
//   var cardUseCheck = true; //カードが使用出来るか
//   if(isset(checkParam['check_class'])){
//     if(checkParam['check_class'] == false){
//       dialogText = dialogText + "\n※クラスが異なるため使用出来ません。";
//       cardUseCheck = false;
//     }
//   }
//   if(isset(checkParam['check_weapon'])){
//     if(checkParam['check_weapon'] == false){
//       dialogText = dialogText + "\n※メインウェポンが異なるため、使用出来ません。";
//       cardUseCheck = false;
//     }
//   }
//   if(isset(checkParam['check_sub_weapon'])){
//     if(checkParam['check_sub_weapon'] == false){
//       dialogText = dialogText + "\n※サポートウェポンが異なるため、使用出来ません。";
//       cardUseCheck = false;
//     }
//   }
//   if(isset(checkParam['check_num'])){
//     if(checkParam['check_num'] == false){
//       dialogText = dialogText + "\n※使用出来ないカードが含まれています。";
//     }
//   }
//   if(cardUseCheck == false){
//     dialogTitleText = "デッキの使用条件を満たしていません";
//   }
//   G_NORMAL_WINDOW_CREATE(BATTLE_WINDOW_NODE,dialogTitleText,dialogText,2,"dengerWindow");
// }
//
// function G_BATTLE_CREATE_CARD_DECK_IMAGE_SPRITE(parentBase,deckImageArray,replaceCardDeckData,deckImagePosArray,idx,cardMasterDatas){ //デッキ用のスプライト画像を生成
//   console.log(replaceCardDeckData[idx]);
//   var resultCardDatas = replaceCardDeckData[idx]['card_deck'].split(',');
//   var heroCardId = resultCardDatas[0]; //このデッキの英雄カードのIDを取得
//   var heroCardMasterData = null;
//   for (var i = 0; i < cardMasterDatas.length; i++) {
//     if(cardMasterDatas[i]['id'] == heroCardId){ //指定の英雄カードのマスターデータの場合
//       heroCardMasterData = cardMasterDatas[i];
//       break;
//     }
//   }
//   deckImageArray[idx] = G_CARD_DISP(heroCardMasterData);
//   deckImageArray[idx].addChildTo(parentBase);
//   //deckImageArray[idx] = Sprite('ASSET_' + heroCardMasterData['card_asset_id']).addChildTo(parentBase);
//   deckImageArray[idx].setScale(0.2,0.2);
//   var cardScaleSize = 0;
//   var cardPosX = 0;
//   switch (idx) {
//     case 0:
//     {
//       cardScaleSize = 0.08;
//       cardPosX = (deckImageArray[idx].x - (SCREEN_WIDTH / 4));
//     }
//     break;
//     case 1:
//     {
//       cardScaleSize = 0.2;
//       cardPosX = (deckImageArray[idx].x - (SCREEN_WIDTH / 4));
//     }
//     break;
//     case 2:
//     {
//       cardScaleSize = 0.25;
//       cardPosX = 0;
//     }
//     break;
//     case 3:
//     {
//       cardScaleSize = 0.2;
//       cardPosX = (deckImageArray[idx].x + (SCREEN_WIDTH / 4));
//     }
//     break;
//     case 4:
//     {
//       cardScaleSize = 0.08;
//       cardPosX = (deckImageArray[idx].x + (SCREEN_WIDTH / 4));
//     }
//     break;
//     default:
//     break;
//   }
//   deckImageArray[idx].setScale(cardScaleSize,cardScaleSize);
//   deckImageArray[idx]['deck_number'] = replaceCardDeckData[idx]['deck_number']; //表示しているデッキナンバーを格納
//   deckImageArray[idx].x = cardPosX;
//   deckImageArray[idx]['deck_name_label'] = Label({ //デッキ名表示用ラベルを生成
//     text: replaceCardDeckData[idx]['deck_name'],
//     fontSize: 32,
//     fill: 'white',
//   }).addChildTo(deckImageArray[idx]);
//   deckImageArray[idx]['deck_name_label'].y = deckImageArray[idx]['deck_name_label'].y + (SCREEN_HEIGHT / 2);
//   //警告アイコン表示処理
//   deckImageArray[idx]['deck_denger_icon'] = Sprite('ASSET_140').addChildTo(deckImageArray[idx]);
//   deckImageArray[idx]['deck_denger_icon'].setScale(0.7,0.7);
//   deckImageArray[idx]['deck_denger_icon'].x = deckImageArray[idx]['deck_denger_icon'].x + (deckImageArray[idx].width / 2.5);
//   deckImageArray[idx]['deck_denger_icon'].y = deckImageArray[idx]['deck_denger_icon'].y - (deckImageArray[idx].height / 2.5);
//   if(replaceCardDeckData[idx]['check_num'] == true){
//     deckImageArray[idx]['deck_denger_icon'].visible = false;
//   }
//   else{
//     deckImageArray[idx]['deck_denger_icon'].visible = true;
//   }
//   deckImageArray[idx]['deck_denger_icon_button'] = Button({
//     width: 96,         // 横サイズ
//     height: 96,        // 縦サイズ
//   }).addChildTo(deckImageArray[idx]['deck_denger_icon']);
//   deckImageArray[idx]['deck_denger_icon_button'].visible = false;
//   deckImageArray[idx]['deck_denger_icon_button']['button_index'] = idx;
//   deckImageArray[idx]['deck_denger_icon_button']['check_num'] = replaceCardDeckData[idx]['check_num'];
//   deckImageArray[idx]['deck_denger_icon_button']['check_class'] = replaceCardDeckData[idx]['check_class'];
//   deckImageArray[idx]['deck_denger_icon_button']['check_weapon'] = replaceCardDeckData[idx]['check_weapon'];
//   deckImageArray[idx]['deck_denger_icon_button']['check_sub_weapon'] = replaceCardDeckData[idx]['check_sub_weapon'];
//   deckImageArray[idx]['deck_denger_icon_button'].onpointend = function(e){
//     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//     if(WINDOW_NORMAL == null && BATTLE_CARD_DECK_INIT == true && BATTLE_CONTROLE_ENABLE == true && BATTLE_CARD_SWIPE_ENABLE == true && NETWORK_IS_CONNECTING == false){
//       BATTLE_CONTROLE_ENABLE = false;
//       BATTLE_CARD_SWIPE_ENABLE = false;
//       //警告ウィンドウ表示処理
//       G_BATTLE_CREATE_DENGER_ICON_DIALOG(this['button_index'],this);
//     }
//   };
//
//   //警告アイコン(赤)表示処理
//   deckImageArray[idx]['deck_denger_icon_red'] = Sprite('ASSET_141').addChildTo(deckImageArray[idx]['deck_denger_icon']);
//   deckImageArray[idx]['deck_denger_icon_red'].visible = false;
//   if(replaceCardDeckData[idx]['check_class'] == false || replaceCardDeckData[idx]['check_weapon'] == false || replaceCardDeckData[idx]['check_sub_weapon'] == false){ //表示判定
//     deckImageArray[idx]['deck_denger_icon'].visible = true;
//     deckImageArray[idx]['deck_denger_icon_red'].visible = true;
//   }
//
//   deckImagePosArray[idx] = new Array();
//   deckImagePosArray[idx]['pos_x'] = deckImageArray[idx].x;
//   deckImagePosArray[idx]['pos_y'] = deckImageArray[idx].y;
//   deckImagePosArray[idx]['scale_x'] = deckImageArray[idx].scaleX;
//   deckImagePosArray[idx]['scale_y'] = deckImageArray[idx].scaleY;
// }
//
// function G_BATTLE_COMMAND_SUBMIT(playerDatas,playerSelectDecks,playerTargetDatas,enemyDatas) //デッキ全て選択後に内容をサーバーに送信してバトル結果をを取得する。
// {
//    var battleParamVal = new Object();
//   battleParamVal['set_battle_player_datas'] = playerDatas;
//   battleParamVal['set_battle_player_deck_datas'] = playerSelectDecks;
//   battleParamVal['set_battle_player_target_datas'] = playerTargetDatas;
//   battleParamVal['set_battle_enemy_datas'] = enemyDatas;
//   battleParamVal['select_battle_instance_data'] = PLAYER_BATTLE_INSTANCE['battle_event_data'];
//   //ストーリーデータのチェック
//   if(STORY_SELECT_MAIN_STORY_HASH != null){
//     var eventCount = 0;
//     if(isset(STORY_SELECT_MAIN_STORY_HASH['player_event_count'])){
//       eventCount = STORY_SELECT_MAIN_STORY_HASH['player_event_count'];
//     }
//     battleParamVal['check_story_id'] = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]['main_story_master_id'];
//     battleParamVal['check_player_event_count'] = (eventCount + 1);//データベース参照用のため + 1する
//   }
//   NETWORK_IS_CONNECTING = true; //通信開始フラグON
//   ajaxStart("post","json","../../client/battle/battle.php",battleParamVal); //非同期通信開始
// }
//
// function G_BATTLE_CHANGE_USER_SELECT_ENEMY(enemyMemberAvatarImage,enemyPosArray,selectIndex){ //ユーザーが違う敵を選択した場合、矢印のvisibleを更新
//   if(selectIndex == -1){ //全非表示の場合
//     for (var i = 0; i < enemyMemberAvatarImage.length; i++) {
//       if(isset(enemyMemberAvatarImage[i])){
//         if(isset(enemyMemberAvatarImage[i]['select_image'])){
//           enemyMemberAvatarImage[i]['select_image'] = false;
//           enemyPosArray[i]['select_target_bg'].visible = false;
//         }
//       }
//     }
//     return 0;
//   }
//   var selectNum = new Array(); //選択させていない選択番号
//   for (var i = 0; i <  enemyMemberAvatarImage.length; i++) {
//     if(isset(enemyMemberAvatarImage[i]['select_image'])){
//       if(isset(enemyPosArray[i]['select_target_number'])){
//         if(enemyPosArray[i]['select_target_number'].text != ""){
//           var num = parseInt(enemyPosArray[i]['select_target_number'].text);
//           selectNum[selectNum.length] = num;
//         }
//       }
//     }
//   }
//   selectNum.sort(); //配列の数値をソート
//   var minSelectNum = 1; //選択中の番号の中の最小数
//   for(var i = 1; i < 6; i++){
//     var checkNum = false;
//     for (var j = 0; j < selectNum.length; j++) {
//       if(selectNum[j] == i){
//         checkNum = true;
//         break;
//       }
//     }
//     if(checkNum == false){
//       minSelectNum = i;
//       break;
//     }
//   }
//   if(isset(enemyMemberAvatarImage[selectIndex])){
//     if(isset(enemyMemberAvatarImage[selectIndex]['select_image'])){
//       for (var i = 0; i < enemyMemberAvatarImage.length; i++) {
//         if(isset(enemyMemberAvatarImage[i])){
//           if(isset(enemyMemberAvatarImage[i]['select_image']) && isset(enemyPosArray[i]['select_target_number'])){
//             if(selectIndex == i){
//               if(enemyMemberAvatarImage[i]['select_image'] == false){
//                 enemyMemberAvatarImage[i]['select_image'] = true;
//                 enemyPosArray[i]['select_target_bg'].visible = true;
//                 enemyPosArray[i]['select_target_number'].visible = true;
//                 enemyPosArray[i]['select_target_number'].text = String(minSelectNum);
//               }
//               else{
//                 enemyMemberAvatarImage[i]['select_image'] = false;
//                 enemyPosArray[i]['select_target_bg'].visible = false;
//                 enemyMemberAvatarImage[i].alpha = 1;
//                 enemyPosArray[i]['select_target_number'].text = "";
//               }
//               break;
//             }
//           }
//         }
//       }
//     }
//   }
// }
//
// function G_BATTLE_SET_PLAYER_SELECT_TARGETS(playerIndexId,battleEnemyPosArray,playerSelectTargetNumberArray) //ユーザーが選択したデッキを配列に挿入
// {
//   for (var i = 0; i < battleEnemyPosArray.length; i++) {
//     var resultSelectTargetData = new Object();
//     if(isset(battleEnemyPosArray[i]['select_target_number'])){
//       if(battleEnemyPosArray[i]['select_target_number'].visible == true && battleEnemyPosArray[i]['select_target_number'].text != ""){ //選択番号が存在した場合
//         resultSelectTargetData['select_enemy_index'] = i;
//         resultSelectTargetData['select_target_number'] = parseInt(battleEnemyPosArray[i]['select_target_number'].text);
//         resultSelectTargetData['player_index_id'] = playerIndexId;
//         //playerSelectTargetNumberArray[playerSelectTargetNumberArray.length] = new Array();
//         playerSelectTargetNumberArray[playerSelectTargetNumberArray.length] = resultSelectTargetData;
//       }
//       else{
//         resultSelectTargetData['select_enemy_index'] = i;
//         resultSelectTargetData['select_target_number'] = 0;
//         resultSelectTargetData['player_index_id'] = playerIndexId;
//         //playerSelectTargetNumberArray[playerSelectTargetNumberArray.length] = new Array();
//         playerSelectTargetNumberArray[playerSelectTargetNumberArray.length] = resultSelectTargetData;
//       }
//     }
//   }
// }
//
// function G_BATTLE_CREATE_HIT_POINT_TEXT(parentBase,avatarPos){ //ダメージ数表示用テキストを表示
//   var label = Label({
//     text: "",
//     fontSize: 64,
//     fill: 'red',
//     align: 'center',
//     //stroke: 'black',
//     //strokeWidth: 8,
//   }).addChildTo(parentBase);
//   label.x = avatarPos.x;
//   label.y = avatarPos.y;
//   label.visible = false;
//   return label;
// }
//
// function G_BATTLE_CREATE_HIT_POINT_GAUGE(parentBase,avatarPos,avatarImage){ //HPゲージを表示
//   var gauge = Gauge({
//     x: avatarPos.x,
//     y: avatarPos.y + (avatarImage.height / 4),
//     width: 128,            // 横サイズ
//     height: 6,            // 縦サイズ
//     cornerRadius: 10,      // 角丸み
//     maxValue: 100,         // ゲージ最大値
//     value: 100,         // ゲージ初期値
//     fill: 'white',         // 後ろの色
//     gaugeColor: 'red', // ゲージ色
//     stroke: 'silver',      // 枠色
//     strokeWidth: 5,        // 枠太さ
//     }).addChildTo(parentBase);
//     gauge.visible = false;
//   return gauge;
// }
//
// function G_BATTLE_BATTLE_ANIM_START(battleAnimData,playerAvatarData,playerAvatarImage,playerPosArray,enemyAvatarData,enemyAvatarImage,enemyPosArray,battleTurn,turnEndStep){ //戦闘アニメを初期化する
//   var result = 0;
//   var frameWaitTime = 100;
//   var isTurnEndSkill = false;
//   for (var i = 0; i < battleAnimData.length; i++) {
//     console.log("戦闘アニメ再生");
//     if(i == 0) {
//       console.log(battleAnimData);
//       console.log("---------------------------------");
//       console.log(battleAnimData[i]);
//       console.log(battleTurn);
//     }
//     var atkAnimDatas = new Array(); //このターンで行われた全ての攻撃アニメデータ
//     var turnEndAnimData = new Array(); //ターン終了時に行われたアクションの全てのアニメデータ
//     var endSkillIndex = -1; //終了スキルの開始地点
//     if(battleAnimData[i]['battle_turn'] != battleTurn) continue; //進行中のターン以外は再生しない。
//     console.log("戦闘アニメ再生1");
//     //全体範囲の場合のため、ターゲットリストをチェック
//     for(var tg = (i + 1); tg < battleAnimData.length; tg++){
//       //ターン終了に発動するスキルではなく、このターンに行われたスキルの場合
//       if(battleAnimData[tg]['battle_turn'] != battleTurn || battleAnimData[tg]['is_turn_end_skill'] != 0) break;
//       atkAnimDatas[atkAnimDatas.length] = battleAnimData[tg];
//     }
//     var data = battleAnimData[i];
//     for (var te = (i + 1); te < battleAnimData.length; te++) {
//       if(battleAnimData[te]['battle_turn'] == battleTurn && battleAnimData[te]['is_turn_end_skill'] == 1){
//         console.log("戦闘アニメ再生2");
//         turnEndAnimData[turnEndAnimData.length] = battleAnimData[te];
//         if(turnEndStep != -1){ //ターン終了スキルが始まっていた場合
//           if(te + turnEndStep < battleAnimData.length && battleAnimData[te + turnEndStep]['is_turn_end_skill'] == 1){ //正常の値の場合
//             data = battleAnimData[te + turnEndStep];
//             BATTLE_BATTLE_TURN_END_STEP = BATTLE_BATTLE_TURN_END_STEP + 1;
//             isTurnEndSkill = true;
//             atkAnimDatas = new Array(); //不要な配列を空にする。
//             result = 1; //ターン終了アクションを見つけたため、ステップを更新
//           }
//           else{
//             isTurnEndSkill = false;
//             BATTLE_BATTLE_TURN_END_STEP = -1;
//             return 0; //ターンが加算されていないため、ここで終了
//           }
//           break;
//         }
//         else{ //次回から終了スキル開始
//           BATTLE_BATTLE_TURN_END_STEP = 0;
//           result = 1; //ターン終了アクションを見つけたため、ステップを更新
//           break;
//         }
//       }
//     }
//     var skillUsePos = null;
//     var skillTargetPos = null;
//     var skillUse = false; //true 味方 false 敵
//     var skillTarget = false; //true 味方 false 敵
//     if(data['use_player_pos'] != -1) {
//       skillUsePos = data['use_player_pos'];
//       skillUse = true;
//     }
//     if(data['use_enemy_pos'] != -1){
//       skillUsePos = data['use_enemy_pos'];
//       skillUse = false;
//     }
//     if(data['target_player_pos'] != -1) {
//       skillTargetPos = data['target_player_pos'];
//       skillTarget = true;
//     }
//     if(data['target_enemy_pos'] != -1) {
//       skillTargetPos = data['target_enemy_pos'];
//       skillTarget = false;
//     }
//
//     if(isTurnEndSkill == true){ //ターン終了後のスキルの場合は使用者とターゲットを同じにする
//       skillUsePos = skillTargetPos;
//       skillUse = skillTarget;
//     }
//     if(data['skill_anim_type'] == 1 || data['skill_anim_type'] == 2 || data['skill_anim_type'] == 3){ //近接攻撃アニメか遠距離攻撃アニメか詠唱のみ
//       console.log("戦闘アニメ再生3");
//       var reverseFlag = false;
//       var usePosX = null;
//       var usePosY = null;
//       var targetPosX = null;
//       var targetPosY = null;
//
//       if(skillUse == true) { //味方の攻撃だった
//         usePosX = playerPosArray[skillUsePos].x;
//         usePosY = playerPosArray[skillUsePos].y;
//         //味方攻撃のため、キャラレイヤーを反転
//         BATTLE_BATTLE_SCENE_CHARA_LAYER['children'].reverse();
//         reverseFlag = true;
//       }
//       else{ //敵の攻撃だった
//         usePosX = enemyPosArray[skillUsePos].x;
//         usePosY = enemyPosArray[skillUsePos].y;
//       }
//       if(skillTarget == true){
//         targetPosX = playerPosArray[skillTargetPos].x + (playerAvatarImage[skillTargetPos].width / 2);// - (playerAvatarImage[skillUsePos].width / 4.3);
//         targetPosY = playerPosArray[skillTargetPos].y;// + (playerAvatarImage[skillUsePos].height / 4.5);
//       }
//       else{
//         targetPosX = enemyPosArray[skillTargetPos].x - (enemyAvatarImage[skillTargetPos].width / 2);// + (enemyAvatarImage[skillUsePos].width / 4.5);
//         targetPosY = enemyPosArray[skillTargetPos].y;// + (enemyAvatarImage[skillUsePos].height / 4.5);
//       }
//
//       var useAvatarImage = null;
//       var useAvatarData = null;
//       if(skillUse == true) {
//         useAvatarImage = playerAvatarImage[skillUsePos];
//         useAvatarData = playerAvatarData[skillUsePos];
//       }
//       else {
//         useAvatarImage = enemyAvatarImage[skillUsePos];
//         useAvatarData =  enemyAvatarData[skillUsePos];
//       }
//
//       var targetAvatarImage = null;
//       var targetAvatarData = null;
//       var otherTargetAvatarImage = new Array();
//       var otherTargetAvatarData = new Array();
//       if(skillTarget == true) {
//         targetAvatarImage = playerAvatarImage[skillTargetPos];
//         targetAvatarData = playerAvatarData[skillTargetPos];
//         for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//           if(atkAnimDatas[tgp]['target_player_pos'] != -1){
//             otherTargetAvatarImage[tgp] = playerAvatarImage[atkAnimDatas[tgp]['target_player_pos']];
//             otherTargetAvatarData[tgp] = playerAvatarData[atkAnimDatas[tgp]['target_player_pos']];
//           }
//         }
//       }
//       else {
//         targetAvatarImage = enemyAvatarImage[skillTargetPos];
//         targetAvatarData = enemyAvatarData[skillTargetPos];
//         for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//           if(atkAnimDatas[tgp]['target_enemy_pos'] != -1){
//             otherTargetAvatarImage[tgp] = enemyAvatarImage[atkAnimDatas[tgp]['target_enemy_pos']];
//             otherTargetAvatarData[tgp] = enemyAvatarData[atkAnimDatas[tgp]['target_enemy_pos']];
//           }
//         }
//       }
//       targetAvatarImage['hit_point_text'].text = data['skill_power_point']; //ダメージ数値を更新
//       targetAvatarImage['hit_point_text'].fill = "red";
//       for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//         otherTargetAvatarImage[tgp]['hit_point_text'].text = atkAnimDatas[tgp]['skill_power_point']; //ダメージ数値を更新
//         otherTargetAvatarImage[tgp]['hit_point_text'].fill = "red";
//       }
//       if(data['skill_anim_type'] == 1 && isTurnEndSkill == false){ //近距離
//         console.log("戦闘アニメ再生4");
//         //走るに変更
//         console.log(useAvatarData);
//         useAvatarData['anim_category_id'] = 2;
//         useAvatarData['loop_flag'] = true;
//         var k = G_BATTLE_GET_DISTANCE(useAvatarImage.x,useAvatarImage.y,targetPosX,targetPosY);
//         var j = parseInt(k / 0.3);
//         useAvatarImage.tweener.moveTo(targetPosX, targetPosY, j).play();
//         BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//         G_BATTLE_BATTLE_SCENE_CARD_ANIM_START(data,true); //カードを表示
//       }
//       else if(data['skill_anim_type'] == 2 && isTurnEndSkill == false){ //遠距離
//         console.log("戦闘アニメ再生5");
//         //詠唱に変更
//         useAvatarData['anim_frame_controle'] = true;
//         var castingAnimId = 11;
//         var castingStartFrame = 0;
//         var castingEndFrame = 0;
//         for (var j = 0; j < useAvatarData['avatar_anim_data'].length; j++) {
//           if(useAvatarData['avatar_anim_data'][j]['anim_category_id'] == castingAnimId){ //再生するアニメID
//             castingStartFrame = parseInt(useAvatarData['avatar_anim_data'][j]['start_frame_index'],10);
//             castingEndFrame = parseInt(useAvatarData['avatar_anim_data'][j]['end_frame_index'],10);
//           }
//         }
//
//         useAvatarImage['casting_frame_index'] = castingStartFrame;
//         for (var f = castingStartFrame; f < castingEndFrame; f++) {
//           useAvatarImage.tweener.wait(frameWaitTime).play();
//           useAvatarImage.tweener.call(function(){
//             useAvatarImage['casting_frame_index']++;
//             useAvatarImage.setFrameIndex(useAvatarImage['casting_frame_index']);
//           });
//         }
//         BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//         G_BATTLE_BATTLE_SCENE_CARD_ANIM_START(data,true); //カードを表示
//         useAvatarImage.tweener.wait(500).play();
//       }
//       else if(data['skill_anim_type'] == 3 && isTurnEndSkill == false){ //詠唱のみ
//         console.log("戦闘アニメ再生6");
//         //詠唱に変更
//         useAvatarData['anim_frame_controle'] = true;
//         var castingAnimId = 11;
//         var castingStartFrame = 0;
//         var castingEndFrame = 0;
//         for (var j = 0; j < useAvatarData['avatar_anim_data'].length; j++) {
//           if(useAvatarData['avatar_anim_data'][j]['anim_category_id'] == castingAnimId){ //再生するアニメID
//             castingStartFrame = parseInt(useAvatarData['avatar_anim_data'][j]['start_frame_index'],10);
//             castingEndFrame = parseInt(useAvatarData['avatar_anim_data'][j]['end_frame_index'],10);
//           }
//         }
//
//         useAvatarImage['casting_frame_index'] = castingStartFrame;
//         for (var f = castingStartFrame; f < castingEndFrame; f++) {
//           useAvatarImage.tweener.wait(frameWaitTime).play();
//           useAvatarImage.tweener.call(function(){
//             if(useAvatarImage['casting_frame_index'] == castingStartFrame) G_BATTLE_BATTLE_LOG_AUTO_SLIDE(battleTurn,BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY,BATTLE_BATTLE_LOG_TEXT_PARENT); //ログの位置を更新
//             useAvatarImage['casting_frame_index']++;
//             useAvatarImage.setFrameIndex(useAvatarImage['casting_frame_index']);
//           });
//         }
//         BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//         G_BATTLE_BATTLE_SCENE_CARD_ANIM_START(data,true); //カードを表示
//         useAvatarImage.tweener.wait(300).play();
//       }
//       if(isTurnEndSkill == true) {
//         BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//         useAvatarImage.tweener.wait(1).play();
//       }
//       useAvatarImage.tweener.call(function(){
//         var resultAttackWaitTime = 0;
//         var animAttack1Id = -1;
//         if(data['skill_anim_type'] == 1) animAttack1Id = 3
//         else if(data['skill_anim_type'] == 2) animAttack1Id = 6;
//         var animAttack2Id = -1;
//         if(data['skill_anim_type'] == 1) animAttack2Id = 4
//         else if(data['skill_anim_type'] == 2) animAttack2Id = 7;
//         var animAttack3Id = -1;
//         if(data['skill_anim_type'] == 1) animAttack3Id = 5
//         else if(data['skill_anim_type'] == 2) animAttack3Id = 8;
//         var animDamageId = 9;
//         var animAttack1StartFrame = 0;
//         var animAttack2StartFrame = 0;
//         var animAttack3StartFrame = 0;
//         var animAttack1EndFrame = 0;
//         var animAttack2EndFrame = 0;
//         var animAttack3EndFrame = 0;
//         var animAttack1TriggerFrame = 0;
//         var animAttack2TriggerFrame = 0;
//         var animAttack3TriggerFrame = 0;
//         var animDamageStartFrame = 0;
//         var animDamageEndFrame = 0;
//         for (var j = 0; j < useAvatarData['avatar_anim_data'].length; j++) {
//           if(useAvatarData['avatar_anim_data'][j]['anim_category_id'] == animAttack1Id){ //再生するアニメID
//             animAttack1StartFrame = parseInt(useAvatarData['avatar_anim_data'][j]['start_frame_index'],10);
//             animAttack1EndFrame = parseInt(useAvatarData['avatar_anim_data'][j]['end_frame_index'],10);
//             animAttack1TriggerFrame = parseInt(useAvatarData['avatar_anim_data'][j]['trigger_frame_index'],10);
//           }
//           if(useAvatarData['avatar_anim_data'][j]['anim_category_id'] == animAttack2Id){
//             animAttack2StartFrame = parseInt(useAvatarData['avatar_anim_data'][j]['start_frame_index'],10);
//             animAttack2EndFrame = parseInt(useAvatarData['avatar_anim_data'][j]['end_frame_index'],10);
//             animAttack2TriggerFrame = parseInt(useAvatarData['avatar_anim_data'][j]['trigger_frame_index'],10);
//           }
//           if(useAvatarData['avatar_anim_data'][j]['anim_category_id'] == animAttack3Id){
//             animAttack3StartFrame = parseInt(useAvatarData['avatar_anim_data'][j]['start_frame_index'],10);
//             animAttack3EndFrame = parseInt(useAvatarData['avatar_anim_data'][j]['end_frame_index'],10);
//             animAttack3TriggerFrame = parseInt(useAvatarData['avatar_anim_data'][j]['trigger_frame_index'],10);
//           }
//         }
//         //敵のダメージアニメ設定
//         for(var e = 0; e < targetAvatarData['avatar_anim_data'].length; e++){
//           if(targetAvatarData['avatar_anim_data'][e]['anim_category_id'] == animDamageId){
//             animDamageStartFrame = parseInt(targetAvatarData['avatar_anim_data'][e]['start_frame_index'],10);
//             animDamageEndFrame = parseInt(targetAvatarData['avatar_anim_data'][e]['end_frame_index'],10);
//           }
//         }
//         useAvatarImage['anim_combo_count'] = 0; //コンボアニメ進行度を初期化
//         useAvatarData['anim_frame_controle'] = true; //フレームコントロールに移行
//         var missFlag = false;
//         var otherMissFlag = new Array();
//         if(data['combo'] == 0 && data['agi_miss'] == 1) { //攻撃ミスの場合
//           data['combo'] = 1;
//           targetAvatarImage['hit_point_text'].text = "miss!"; //ダメージ数値を更新
//           missFlag = true;
//         }
//         for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//           otherMissFlag[tgp] = false;
//           if(atkAnimDatas[tgp]['combo'] == 0 && atkAnimDatas[tgp]['agi_miss'] == 1){
//             atkAnimDatas[tgp]['combo'] = 1;
//             otherTargetAvatarImage[tgp]['hit_point_text'].text = "miss!"; //ダメージ数値を更新
//             otherMissFlag[tgp] = true;
//           }
//         }
//
//         if(data['skill_anim_type'] != 3 && isTurnEndSkill == false){ //攻撃アニメの場合
//           for (var a = 1; a < (data['combo'] + 1); a++) { //連続攻撃回数分アニメ再生
//             if(a == 1){
//               useAvatarImage['atk1_frame_index'] = animAttack1StartFrame;
//               for (var f = animAttack1StartFrame; f < animAttack1EndFrame; f++) {
//                 resultAttackWaitTime = resultAttackWaitTime + frameWaitTime;
//                 useAvatarImage.tweener.wait(frameWaitTime).play();
//                 useAvatarImage.tweener.call(function(){
//                   useAvatarImage['atk1_frame_index']++;
//                   useAvatarImage.setFrameIndex(useAvatarImage['atk1_frame_index']);
//                   if(animAttack1TriggerFrame == useAvatarImage['atk1_frame_index']){ //攻撃トリガーフレームの場合
//                     targetAvatarData['anim_frame_controle'] = true;
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       otherTargetAvatarData[tgp]['anim_frame_controle'] = true;
//                     }
//                     useAvatarImage['anim_combo_count']++;
//                     if(useAvatarImage['anim_combo_count'] == data['combo']){
//                       G_BATTLE_BATTLE_LOG_AUTO_SLIDE(battleTurn,BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY,BATTLE_BATTLE_LOG_TEXT_PARENT); //ログの位置を更新
//                       targetAvatarImage['hit_point_text'].visible = true;
//                       targetAvatarImage['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(data['now_hp_after']) / parseInt(data['max_hp'])) * 100;
//                       if(missFlag == false) targetAvatarImage['hit_point_gauge'].value = gageVal;
//                       for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                         otherTargetAvatarImage[tgp]['hit_point_text'].visible = true;
//                         otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = true;
//                         var otherGageVal = (parseInt(atkAnimDatas[tgp]['now_hp_after']) / parseInt(atkAnimDatas[tgp]['max_hp'])) * 100;
//                         if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp]['hit_point_gauge'].value = otherGageVal;
//                       }
//                     }
//                     if(missFlag == false) targetAvatarImage.setFrameIndex(animDamageStartFrame);
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp].setFrameIndex(animDamageStartFrame);
//                     }
//                   }
//                 });
//               }
//             }
//             if(a == 2){
//               useAvatarImage['atk2_frame_index'] = animAttack2StartFrame;
//               for (var f = animAttack2StartFrame; f < animAttack2EndFrame; f++) {
//                 resultAttackWaitTime = resultAttackWaitTime + frameWaitTime;
//                 useAvatarImage.tweener.wait(frameWaitTime).play();
//                 useAvatarImage.tweener.call(function(){
//                   useAvatarImage['atk2_frame_index']++;
//                   useAvatarImage.setFrameIndex(useAvatarImage['atk2_frame_index']);
//                   if(animAttack2TriggerFrame == useAvatarImage['atk2_frame_index']){ //攻撃トリガーフレームの場合
//                     targetAvatarData['anim_frame_controle'] = true;
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       otherTargetAvatarData[tgp]['anim_frame_controle'] = true;
//                     }
//                     useAvatarImage['anim_combo_count']++;
//                     if(useAvatarImage['anim_combo_count'] == data['combo']) {
//                       G_BATTLE_BATTLE_LOG_AUTO_SLIDE(battleTurn,BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY,BATTLE_BATTLE_LOG_TEXT_PARENT); //ログの位置を更新
//                       targetAvatarImage['hit_point_text'].visible = true;
//                       targetAvatarImage['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(data['now_hp_after']) / parseInt(data['max_hp'])) * 100;
//                       if(missFlag == false) targetAvatarImage['hit_point_gauge'].value = gageVal;
//                       for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                         otherTargetAvatarImage[tgp]['hit_point_text'].visible = true;
//                         otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = true;
//                         var otherGageVal = (parseInt(atkAnimDatas[tgp]['now_hp_after']) / parseInt(atkAnimDatas[tgp]['max_hp'])) * 100;
//                         if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp]['hit_point_gauge'].value = otherGageVal;
//                       }
//                     }
//                     if(missFlag == false) targetAvatarImage.setFrameIndex(animDamageStartFrame);
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp].setFrameIndex(animDamageStartFrame);
//                     }
//                   }
//                 });
//               }
//             }
//             if(3 == a){
//               useAvatarImage['atk3_frame_index'] = animAttack3StartFrame;
//               for (var f = animAttack3StartFrame; f < animAttack3EndFrame; f++) {
//                 resultAttackWaitTime = resultAttackWaitTime + frameWaitTime;
//                 useAvatarImage.tweener.wait(frameWaitTime).play();
//                 useAvatarImage.tweener.call(function(){
//                   useAvatarImage['atk3_frame_index']++;
//                   useAvatarImage.setFrameIndex(useAvatarImage['atk3_frame_index']);
//                   if(animAttack3TriggerFrame == useAvatarImage['atk3_frame_index']){ //攻撃トリガーフレームの場合
//                     targetAvatarData['anim_frame_controle'] = true;
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       otherTargetAvatarData[tgp]['anim_frame_controle'] = true;
//                     }
//                     useAvatarImage['anim_combo_count']++;
//                     if(useAvatarImage['anim_combo_count'] == data['combo']) {
//                       G_BATTLE_BATTLE_LOG_AUTO_SLIDE(battleTurn,BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY,BATTLE_BATTLE_LOG_TEXT_PARENT); //ログの位置を更新
//                       targetAvatarImage['hit_point_text'].visible = true;
//                       targetAvatarImage['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(data['now_hp_after']) / parseInt(data['max_hp'])) * 100;
//                       if(missFlag == false) targetAvatarImage['hit_point_gauge'].value = gageVal;
//                       for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                         otherTargetAvatarImage[tgp]['hit_point_text'].visible = true;
//                         otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = true;
//                         var otherGageVal = (parseInt(atkAnimDatas[tgp]['now_hp_after']) / parseInt(atkAnimDatas[tgp]['max_hp'])) * 100;
//                         if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp]['hit_point_gauge'].value = otherGageVal;
//                       }
//                     }
//                     if(missFlag == false) targetAvatarImage.setFrameIndex(animDamageStartFrame);
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp].setFrameIndex(animDamageStartFrame);
//                     }
//                   }
//                 });
//               }
//             }
//             if(4 == a){
//               useAvatarImage['atk4_frame_index'] = animAttack3StartFrame;
//               for (var f = animAttack3StartFrame; f < animAttack3EndFrame; f++) {
//                 resultAttackWaitTime = resultAttackWaitTime + frameWaitTime;
//                 useAvatarImage.tweener.wait(frameWaitTime).play();
//                 useAvatarImage.tweener.call(function(){
//                   useAvatarImage['atk4_frame_index']++;
//                   useAvatarImage.setFrameIndex(useAvatarImage['atk4_frame_index']);
//                   if(animAttack3TriggerFrame == useAvatarImage['atk4_frame_index']){ //攻撃トリガーフレームの場合
//                     targetAvatarData['anim_frame_controle'] = true;
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       otherTargetAvatarData[tgp]['anim_frame_controle'] = true;
//                     }
//                     useAvatarImage['anim_combo_count']++;
//                     if(useAvatarImage['anim_combo_count'] == data['combo']) {
//                       G_BATTLE_BATTLE_LOG_AUTO_SLIDE(battleTurn,BATTLE_BATTLE_LOG_TEXT_DATA_ARRAY,BATTLE_BATTLE_LOG_TEXT_PARENT); //ログの位置を更新
//                       targetAvatarImage['hit_point_text'].visible = true;
//                       targetAvatarImage['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(data['now_hp_after']) / parseInt(data['max_hp'])) * 100;
//                       if(missFlag == false) targetAvatarImage['hit_point_gauge'].value = gageVal;
//                       for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                         otherTargetAvatarImage[tgp]['hit_point_text'].visible = true;
//                         otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = true;
//                         var otherGageVal = (parseInt(atkAnimDatas[tgp]['now_hp_after']) / parseInt(atkAnimDatas[tgp]['max_hp'])) * 100;
//                         if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp]['hit_point_gauge'].value = otherGageVal;
//                       }
//                     }
//                     if(missFlag == false) targetAvatarImage.setFrameIndex(animDamageStartFrame);
//                     for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                       if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp].setFrameIndex(animDamageStartFrame);
//                     }
//                   }
//                 });
//               }
//             }
//           }
//         }
//         else{ //エフェクトのみの場合
//           if(useAvatarImage != null)
//           {
//             var effectName = "";
//             if(data['now_hp_befor'] != data['now_hp_after']){
//               if(data['now_hp_befor'] < data['now_hp_after']) effectName = "heal"; //回復系バフだった
//               if(data['now_hp_after'] < data['now_hp_befor']) effectName = "debuff"; //ダメージ系デバフだった。
//             }
//             else{ //固定ステータス変更バフだった
//               effectName = "buff";
//             }
//             if(skillUsePos == skillTargetPos){ //自分自身にも発動していた場合
//               useAvatarImage['effect_anim'][effectName].setFrameIndex(0);
//               useAvatarImage['effect_anim'][effectName].visible = true;
//               useAvatarImage['effect_anim']['effect_frame_index'] = 0;
//               if(effectName == "heal"){ //回復の場合
//                 useAvatarImage['hit_point_text'].text = data['skill_power_point']; //回復数値を更新
//                 useAvatarImage['hit_point_text'].fill = "green";
//               }
//               if(effectName == "debuff"){ //ダメージデバフの場合
//                 useAvatarImage['hit_point_text'].text = data['skill_power_point']; //ダメージ値を更新
//                 useAvatarImage['hit_point_text'].fill = "red";
//               }
//             }
//             for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//               otherTargetAvatarImage[tgp]['effect_anim'][effectName].setFrameIndex(0);
//               otherTargetAvatarImage[tgp]['effect_anim'][effectName].visible = true;
//               otherTargetAvatarImage[tgp]['effect_anim']['effect_frame_index'] = 0;
//               if(effectName == "heal"){ //回復バフの場合
//                 otherTargetAvatarImage[tgp]['hit_point_text'].text = atkAnimDatas[tgp]['skill_power_point']; //回復値を更新
//                 otherTargetAvatarImage[tgp]['hit_point_text'].fill = "green";
//               }
//               if(effectName == "debuff"){ //ダメージデバフの場合
//                 otherTargetAvatarImage[tgp]['hit_point_text'].text = atkAnimDatas[tgp]['skill_power_point']; //ダメージ値を更新
//                 otherTargetAvatarImage[tgp]['hit_point_text'].fill = "red";
//               }
//             }
//             for (var f = 0; f < 10; f++) {
//               useAvatarImage.tweener.wait(frameWaitTime).play();
//               useAvatarImage.tweener.call(function(){
//                 if(skillUsePos == skillTargetPos){ //自分自身にも発動していた場合
//                   //回復で初期フレームだった場合HP回復値とHPゲージを表示
//                   if(effectName == "heal" || effectName == "debuff"){
//                     if(useAvatarImage['effect_anim']['effect_frame_index'] == 0){
//                       useAvatarImage['hit_point_text'].visible = true;
//                       useAvatarImage['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(data['now_hp_after']) / parseInt(data['max_hp'])) * 100;
//                       if(100 < gageVal) gageVal = 100; //最大のHPゲージを超えていた場合
//                       useAvatarImage['hit_point_gauge'].value = gageVal;
//                     }
//                   }
//                   useAvatarImage['effect_anim']['effect_frame_index']++;
//                   if(10 <= useAvatarImage['effect_anim']['effect_frame_index']){
//                     useAvatarImage['effect_anim'][effectName].visible = false;
//                     useAvatarImage['hit_point_text'].visible = false;
//                     useAvatarImage['hit_point_gauge'].visible = false;
//                   }
//                   else useAvatarImage['effect_anim'][effectName].setFrameIndex(useAvatarImage['effect_anim']['effect_frame_index']);
//                 }
//                 for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//                   //回復で初期フレームだった場合HP回復値とHPゲージを表示
//                   if(effectName == "heal" || effectName == "debuff"){
//                     if(otherTargetAvatarImage[tgp]['effect_anim']['effect_frame_index'] == 0){
//                       otherTargetAvatarImage[tgp]['hit_point_text'].visible = true;
//                       otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = true;
//                       var gageVal = (parseInt(atkAnimDatas[tgp]['now_hp_after']) / parseInt(atkAnimDatas[tgp]['max_hp'])) * 100;
//                       if(100 < gageVal) gageVal = 100; //最大のHPゲージを超えていた場合
//                       otherTargetAvatarImage[tgp]['hit_point_gauge'].value = gageVal;
//                     }
//                   }
//                   otherTargetAvatarImage[tgp]['effect_anim']['effect_frame_index']++;
//                   if(10 <= otherTargetAvatarImage[tgp]['effect_anim']['effect_frame_index']){
//                     otherTargetAvatarImage[tgp]['effect_anim'][effectName].visible = false;
//                     otherTargetAvatarImage[tgp]['hit_point_text'].visible = false;
//                     otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = false;
//                   }
//                   else otherTargetAvatarImage[tgp]['effect_anim'][effectName].setFrameIndex(useAvatarImage['effect_anim']['effect_frame_index']);
//                 }
//               });
//             }
//           }
//         }
//         var endWaitTime = 500;
//         if(isTurnEndSkill == true) endWaitTime = 1;
//         useAvatarImage.tweener.wait(endWaitTime).play();
//         useAvatarImage.tweener.call(function(){
//           G_BATTLE_BATTLE_SCENE_CARD_ANIM_START(data,false); //カードを非表示
//           useAvatarImage['frame_index'] = 0;
//           useAvatarData['anim_category_id'] = 1;
//           useAvatarData['loop_flag'] = true;
//           useAvatarData['anim_frame_controle'] = false;
//
//           targetAvatarData['frame_index'] = 0;
//           targetAvatarData['anim_category_id'] = 1;
//           if(data['dead_anim'] == 1) targetAvatarData['anim_category_id'] = 10; //死亡時はアニメ変更
//           targetAvatarData['loop_flag'] = false;
//           targetAvatarData['anim_frame_controle'] = false;
//           targetAvatarImage['hit_point_text'].visible = false;
//           targetAvatarImage['hit_point_gauge'].visible = false;
//           for(var tgp = 0; tgp < atkAnimDatas.length; tgp++){
//             //if(otherMissFlag[tgp] == false) otherTargetAvatarImage[tgp].setFrameIndex(animDamageStartFrame);
//             otherTargetAvatarData[tgp]['frame_index'] = 0;
//             otherTargetAvatarData[tgp]['anim_category_id'] = 1;
//             if(atkAnimDatas[tgp]['dead_anim'] == 1) otherTargetAvatarData[tgp]['anim_category_id'] = 10;
//             otherTargetAvatarData[tgp]['loop_flag'] = false;
//             otherTargetAvatarData[tgp]['anim_frame_controle'] = false;
//             otherTargetAvatarImage[tgp]['hit_point_text'].visible = false;
//             otherTargetAvatarImage[tgp]['hit_point_gauge'].visible = false;
//           }
//           if(reverseFlag == true){ //味方の攻撃だった場合、反転を元に戻す
//             BATTLE_BATTLE_SCENE_CHARA_LAYER['children'].reverse();
//           }
//         });
//         useAvatarImage.tweener.wait(endWaitTime).play();
//         var comeBackSpeed = 500; //戻る時のスピード
//         useAvatarImage.tweener.call(function(){
//           //残像位置の同期
//           var afterImageSpeed = comeBackSpeed;
//           for(var chara = 0; chara < 2; chara ++){ //戻る時は残像を生成
//             afterImageSpeed = afterImageSpeed + 150;
//             var afterImage = useAvatarImage['after_images'][chara];
//             afterImage.visible = true;
//             afterImage.x = useAvatarImage.x;
//             afterImage.y = useAvatarImage.y;  //位置を同期
//             afterImage.tweener.to({
//               x: usePosX, y: usePosY,
//             }, afterImageSpeed,"easeOutCirc").play();
//           }
//         });
//         useAvatarImage.tweener.to({
//           x: usePosX, y: usePosY,
//         }, comeBackSpeed,"easeOutCirc").play();
//         useAvatarImage.tweener.call(function(){
//           BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK - 1;
//           for(var chara = 0; chara < 2; chara ++){
//             var afterImage = useAvatarImage['after_images'][chara];
//             afterImage.visible = false;
//           }
//         });
//       });
//     }
//     return result;
//   }
//   //再生可能な戦闘アニメを発見していない
//   //最終ターンの再生が完了した。
//   if((BATTLE_BATTLE_MAX_TURN + 1) == battleTurn && turnEndStep == -1) return 2; //次のステップへ
// }
//
// function G_BATTLE_BATTLE_FINISH_ANIM_START(battleAnimData,effectObj,battleType){ //戦闘終了演出を開始
//   BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//   var result = 0;
//   var battleFinishData = null;
//   for (var i = 0; i < battleAnimData.length; i++) {
//     if(isset(battleAnimData[i]['battle_finish_result'])){ //戦闘終了データを取得
//       battleFinishData = battleAnimData[i];
//     }
//   }
//   if(battleFinishData != null){
//     if(battleType == 0){ //通常戦闘
//       if(battleFinishData['battle_finish_result'] == 1){ //勝ち
//         effectObj['win'].visible = true;
//         effectObj['win'].tweener.scaleTo(1, 500).play();
//         effectObj['win'].tweener.wait(1500).play();
//         effectObj['win'].tweener.to({alpha: 0}, 500).play();
//         effectObj['win'].tweener.call(function(){
//           BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK - 1;
//         });
//       }
//       else if(battleFinishData['battle_finish_result'] == 2){ //負け
//         effectObj['lose'].visible = true;
//         effectObj['lose'].tweener.scaleTo(1, 500).play();
//         effectObj['lose'].tweener.wait(1500).play();
//         effectObj['lose'].tweener.to({alpha: 0}, 500).play();
//         effectObj['lose'].tweener.call(function(){
//           BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK - 1;
//         });
//       }
//     }
//     else if(battleType == 1){ //PVP
//       if(battleFinishData['battle_finish_result'] == 1 || battleFinishData['battle_finish_result'] == 2){ //勝負が決まった
//         effectObj['finish'].visible = true;
//         effectObj['finish'].tweener.scaleTo(1, 500).play();
//         effectObj['finish'].tweener.wait(1500).play();
//         effectObj['finish'].tweener.to({alpha: 0}, 500).play();
//         effectObj['finish'].tweener.call(function(){
//           BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK - 1;
//         });
//       }
//       else if(battleFinishData['battle_finish_result'] == 3){ //引き分け
//         effectObj['draw'].visible = true;
//         effectObj['draw'].tweener.scaleTo(1, 500).play();
//         effectObj['draw'].tweener.wait(1500).play();
//         effectObj['draw'].tweener.to({alpha: 0}, 500).play();
//         effectObj['draw'].tweener.call(function(){
//           BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK - 1;
//         });
//       }
//     }
//     result = battleFinishData['battle_finish_result'];
//   }
//   return result;
// }
//
// function G_BATTLE_PARTY_DROP_ANIM_START(parentUiLayer,battleAnimData){ //パーティドロップアニメーションを開始
//   BATTLE_ANIM_PLAY_STACK = BATTLE_ANIM_PLAY_STACK + 1;
//   var result = 0;
//   var partyDropData = null;
//   for (var i = 0; i < battleAnimData.length; i++) {
//     if(isset(battleAnimData[i]['party_drop_data'])){ //パーティドロップデータを取得
//       partyDropData = battleAnimData[i];
//     }
//   }
//   if(partyDropData != null){
//     var dropListLabel = Label({
//       text: "",
//       fontSize: 36,
//       fill: 'white',
//     });
//     var resultText = "";
//     for (var p = 0; p < BATTLE_PARTY_MEMBER_DATA.length; p++) {
//       var dropUserName = BATTLE_PARTY_MEMBER_DATA[p]['player_name'];
//       var dropInfo = "";
//       var userDropFlag = false;
//       for (var i = 0; i < partyDropData['party_drop_data'].length; i++) {
//         if(BATTLE_PARTY_MEMBER_DATA[p]['player_index_id'] == partyDropData['party_drop_data'][i]['player_index_id'])
//         {
//           if(isset(partyDropData['party_drop_data'][i]['result_drop_data'])){
//             for (var d = 0; d < partyDropData['party_drop_data'][i]['result_drop_data'].length; d++) {
//               userDropFlag = true;
//               dropInfo = dropInfo + "・" + partyDropData['party_drop_data'][i]['result_drop_data'][d]['drop_item_name'] + " × " + partyDropData['party_drop_data'][i]['result_drop_data'][d]['drop_val'] + "\n";
//             }
//           }
//         }
//       }
//       if(userDropFlag == true){
//         resultText = resultText + "\n【" + dropUserName + "】\n" + dropInfo + "\n";
//       }
//     }
//     if(resultText == "") resultText = "\n\n\n\n\n\nドロップアイテムはありません"; //1つもドロップアイテムが無い場合
//     dropListLabel.text = resultText;
//     G_UI_CREATE_LIST(parentUiLayer,dropListLabel,dropListLabel.calcCanvasHeight(),"ドロップリスト","閉じる"); //リストを表示
//   }
//   return result;
// }
//
// function G_BATTLE_BATTLE_SCENE_CARD_ANIM_START(cardMasterData,dispOrDelete){ //戦闘中に行われるカード表示演出を開始
//   if(dispOrDelete == false){ //削除の場合
//     if(BATTLE_BATTLE_SCENE_CARD_SPRITE != null){
//       BATTLE_BATTLE_SCENE_CARD_SPRITE.tweener.to({
//         alpha: 0,
//       }, 500).play();
//       BATTLE_BATTLE_SCENE_CARD_SPRITE.tweener.call(function(){
//         BATTLE_BATTLE_SCENE_CARD_SPRITE.visible = false;
//         BATTLE_BATTLE_SCENE_CARD_SPRITE.remove();
//         BATTLE_BATTLE_SCENE_CARD_SPRITE = null;
//       });
//     }
//   }
//   else{ //表示の場合
//     console.log("カードマスターデータ");
//     console.log(cardMasterData);
//     BATTLE_BATTLE_SCENE_CARD_SPRITE = G_CARD_DISP(cardMasterData);
//     BATTLE_BATTLE_SCENE_CARD_SPRITE.addChildTo(BATTLE_BATTLE_SCENE_BACK_GROUND_LAYER);
//     BATTLE_BATTLE_SCENE_CARD_SPRITE.y = BATTLE_BATTLE_SCENE_CARD_SPRITE.y - (SCREEN_HEIGHT / 4.5);
//     BATTLE_BATTLE_SCENE_CARD_SPRITE.setScale(0.2,0.2);
//     BATTLE_BATTLE_SCENE_CARD_SPRITE.alpha = 0;
//     BATTLE_BATTLE_SCENE_CARD_SPRITE.tweener.to({
//       alpha: 1,
//     }, 500).play();
//   }
// }
//
//
// function G_BATTLE_BATTLE_LOG_CREATE(parentBase,battleLogData,battleLogDataTextArray){ //戦闘ログ画面を作成する。
//   var controlePadBackGround = Sprite('ASSET_111').addChildTo(parentBase);
//   BATTLE_BATTLE_LOG_TEXT_PARENT = PlainElement({ //テキストスクロール用親ノードをを生成
//     x:0,
//     y:0,
//   }).addChildTo(controlePadBackGround);
//   //スワイプタッチ判定用の土台を生成
//   var uiBase = RectangleShape({
//     width: 640,
//     height: 320,
//     fill: '#FFFFFF',
//     strokeWidth: 0, // 外線太さ
//   }).addChildTo(controlePadBackGround);
//   uiBase.setInteractive(true);
//   uiBase.alpha = 0;
//   var posY = 0;
//   var posX = 0;
//   var startPosY = 0;
//   for (var i = 0; i < battleLogData.length; i++) {
//     var label = Label({
//       text: battleLogData[i]['result_comment'],//battleLogData[i]['result_comment'],
//       fontSize: 16,
//       fill: 'white',
//       fontFamily: "'Consolas', 'Monaco', 'ＭＳ ゴシック'",
//       align: 'left',
//     }).addChildTo(BATTLE_BATTLE_LOG_TEXT_PARENT);
//     var labelHeight = label.calcCanvasHeight(); //ラベルの実際の高さをを取得
//     labelHeight = labelHeight + 16;
//     if(i == 0){ //初回のみ位置調整
//       posY = posY - ((controlePadBackGround.height / 3) + labelHeight);
//       posX = posX - (controlePadBackGround.width / 2.2);
//     }
//     else{
//       posY = posY - labelHeight;
//     }
//     label.y = posY;
//     label.x = posX;
//     battleLogDataTextArray[i] = new Array();
//     battleLogDataTextArray[i]['label_data'] = label;
//     battleLogDataTextArray[i]['log_data'] = battleLogData[i];
//     battleLogDataTextArray[i]['label_height'] = labelHeight;
//
//     var line = Sprite('ASSET_152').addChildTo(BATTLE_BATTLE_LOG_TEXT_PARENT); //ログ仕切り線用のラインをを生成
//     line.y = label.y + (labelHeight / 2.5);
//     line.visible = false;
//     label.visible = false;
//     battleLogDataTextArray[i]['line'] = line;
//     if(i == 0) startPosY = posY;
//   }
//   //console.log("初期位置");
//   //console.log(BATTLE_BATTLE_LOG_TEXT_PARENT.y);
//   //文字を隠すためのフレームを表示
//   var logWindowFrame = Sprite('ASSET_151').addChildTo(controlePadBackGround);
//
//   uiBase.update = function() {
//     if(7 <= BATTLE_SCENE_STEP){
//       uiBase.onpointstart = function(e){
//         BATTLE_LOG_LIST_SCROLLE_START = e.pointer.y;
//       };
//       uiBase.onpointmove = function(e){
//         BATTLE_LOG_LIST_SCROLLE_MOVE = e.pointer.y;
//         if(BATTLE_LOG_LIST_SCROLLE_START < BATTLE_LOG_LIST_SCROLLE_MOVE){//下
//           BATTLE_BATTLE_LOG_TEXT_PARENT.y += e.pointer.dy;
//           if(BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] == true && BATTLE_SCENE_STEP == 9){ //ナビテキストを非表示にする
//             BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] = false;
//             BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.visible = false;
//           }
//         }
//         if(BATTLE_LOG_LIST_SCROLLE_START > BATTLE_LOG_LIST_SCROLLE_MOVE){//上
//           BATTLE_BATTLE_LOG_TEXT_PARENT.y += e.pointer.dy;
//           if(BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] == true && BATTLE_SCENE_STEP == 9) { //ナビテキストを非表示にする
//             BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] = false;
//             BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.visible = false;
//           }
//         }
//       };
//       uiBase.onpointend = function(e){
//         if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//         BATTLE_LOG_LIST_SCROLLE_START = 0;
//         BATTLE_LOG_LIST_SCROLLE_MOVE = 0;
//       };
//       if(BATTLE_BATTLE_LOG_TEXT_PARENT.y < 300){
//         BATTLE_BATTLE_LOG_TEXT_PARENT.y = 300;
//
//       }
//       if(BATTLE_LOG_SCROLLE_MAX_HEIGHT < BATTLE_BATTLE_LOG_TEXT_PARENT.y){
//         BATTLE_BATTLE_LOG_TEXT_PARENT.y = BATTLE_LOG_SCROLLE_MAX_HEIGHT;
//       }
//     }
//   }
// }
//
// function G_BATTLE_BATTLE_LOG_AUTO_SLIDE(turn,battleLogDataTextArray,logTextParent){ //戦闘ログの自動スライドを行う
//   posYMove = 0;
//   for (var i = 0; i < battleLogDataTextArray.length; i++) {
//     if(battleLogDataTextArray[i]['log_data']['battle_turn'] != turn) continue;
//     if(turn < battleLogDataTextArray[i]['log_data']['battle_turn']) break;
//     battleLogDataTextArray[i]['label_data'].visible = true;
//     battleLogDataTextArray[i]['line'].visible = true;
//     posYMove = posYMove + battleLogDataTextArray[i]['label_height'];
//     BATTLE_BATTLE_LOG_SLIDE_HEIGHT = BATTLE_BATTLE_LOG_SLIDE_HEIGHT + posYMove; //移動量の合計を加算
//   }
//   logTextParent.tweener.moveTo(logTextParent.x, (logTextParent.y + posYMove), 300).play();
// }
//
// function G_BATTLE_CREATE_CHARACTER_EFFECT(avatarImage){ //キャラクターエフェクトを作成
//   avatarImage['effect_anim'] = new Array(); //戦闘用エフェクト配列の生成
//
//   //バフ
//   avatarImage['effect_anim']['buff'] = Sprite('ASSET_147',120,120).addChildTo(avatarImage);
//   avatarImage['effect_anim']['buff'].setFrameIndex(0);
//   avatarImage['effect_anim']['buff'].visible = false;
//
//   //デバフ
//   avatarImage['effect_anim']['debuff'] = Sprite('ASSET_148',120,120).addChildTo(avatarImage);
//   avatarImage['effect_anim']['debuff'].setFrameIndex(0);
//   avatarImage['effect_anim']['debuff'].visible = false;
//
//   //回復
//   avatarImage['effect_anim']['heal'] = Sprite('ASSET_149',120,120).addChildTo(avatarImage);
//   avatarImage['effect_anim']['heal'].setFrameIndex(0);
//   avatarImage['effect_anim']['heal'].visible = false;
//
//   //毒
//   avatarImage['effect_anim']['poison'] = Sprite('ASSET_150',120,120).addChildTo(avatarImage);
//   avatarImage['effect_anim']['poison'].setFrameIndex(0);
//   avatarImage['effect_anim']['poison'].visible = false;
// }
//
// function G_BATTLE_BATTLE_RESULT_EFFECT_CREATE(parentBase,effectObj) //戦闘結果表示用エフェクトを作成
// {
//   effectObj['win'] = Sprite('ASSET_153').addChildTo(parentBase); //勝ちエフェクト
//   effectObj['win'].y = effectObj['win'].y - (SCREEN_HEIGHT / 6);
//   effectObj['win'].setScale(1,0); //縦に潰す
//   effectObj['win'].visible = false;
//
//   effectObj['lose'] = Sprite('ASSET_154').addChildTo(parentBase); //負けエフェクト
//   effectObj['lose'].y = effectObj['lose'].y - (SCREEN_HEIGHT / 6);
//   effectObj['lose'].setScale(1,0); //縦に潰す
//   effectObj['lose'].visible = false;
//
//   effectObj['finish'] = Sprite('ASSET_412').addChildTo(parentBase); //終了エフェクト(PVP)
//   effectObj['finish'].y = effectObj['finish'].y - (SCREEN_HEIGHT / 6);
//   effectObj['finish'].setScale(1,0); //縦に潰す
//   effectObj['finish'].visible = false;
//
//   effectObj['draw'] = Sprite('ASSET_413').addChildTo(parentBase); //ドローエフェクト(PVP)
//   effectObj['draw'].y = effectObj['draw'].y - (SCREEN_HEIGHT / 6);
//   effectObj['draw'].setScale(1,0); //縦に潰す
//   effectObj['draw'].visible = false;
// }
//
// function G_BATTLE_GET_BATTLE_MAX_TURN(battleAnimLog) //戦闘の最大ターン数を取得
// {
//   var result = 0;
//   for (var i = 0; i < battleAnimLog.length; i++) {
//     if(isset(battleAnimLog[i]['battle_turn'])){
//       if(result < battleAnimLog[i]['battle_turn']) result = battleAnimLog[i]['battle_turn'];
//     }
//   }
//   return result;
// }
//
// function G_BATTLE_CREATE_UI(parentBase){ //戦闘画面に必要なUIを生成
//   BATTLE_TAP_TO_BACK_TEXT = Label({ //「タップして戻る」表示テキスト
//    text: "タップして戻る",
//    fontSize: 64,
//    fill: 'white',
//    fontFamily: "'Consolas', 'Monaco', 'ＭＳ ゴシック'",
//    stroke: 'black',
//    strokeWidth: 3,
//  }).addChildTo(parentBase);
//  BATTLE_TAP_TO_BACK_TEXT.y = BATTLE_TAP_TO_BACK_TEXT.y - (SCREEN_HEIGHT / 6);
//  BATTLE_TAP_TO_BACK_TEXT['alpha_anim'] = false;
//  BATTLE_TAP_TO_BACK_TEXT.visible = false;
//
//  BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT = Label({ //スクロールしてバトルログを見る」表示テキスト
//   text: "スクロールしてログを確認",
//   fontSize: 50,
//   fill: 'white',
//   fontFamily: "'Consolas', 'Monaco', 'ＭＳ ゴシック'",
//   stroke: 'black',
//   strokeWidth: 3,
// }).addChildTo(parentBase);
// BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.y = BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.y + (SCREEN_HEIGHT / 3);
// BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT['alpha_anim'] = false;
// BATTLE_SCROLLE_TO_BATTLE_LOG_TEXT.visible = false;
//
// BATTLE_BATTLE_SCENE_EXIT_BUTTON = Button({ //戦闘画面終了ボタン
//   width: 640,         // 横サイズ
//   height: 640,        // 縦サイズ
// }).addChildTo(parentBase);
// BATTLE_BATTLE_SCENE_EXIT_BUTTON.y = BATTLE_BATTLE_SCENE_EXIT_BUTTON.y - (SCREEN_HEIGHT / 6);
//   BATTLE_BATTLE_SCENE_EXIT_BUTTON.onpointend = function(e)
//   {
//     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//     if(WINDOW_NORMAL == null && WINDOW_LIST == null && BATTLE_SCENE_STEP == 9){ //戦闘シーン終了待ちの場合のみ押せる
//       BATTLE_SCENE_STEP = 10; //シーン遷移処理に移動
//     }
//   };
//   BATTLE_BATTLE_SCENE_EXIT_BUTTON.visible = false;
// }
//
// //2点間の距離を取得
// function G_BATTLE_GET_DISTANCE(x,y,x2,y2){
//   var distance = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
//   return parseInt(distance);
// }
