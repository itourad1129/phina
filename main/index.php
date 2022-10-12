<?php
include '../../module/define/index.php';
include '../../module/dbConnect/index.php';
include '../../module/sessionCheck/index.php';
include '../../module/playerData/index.php';
include '../../module/staminaCount/index.php';
include '../../module/vitalityCount/index.php';
include '../../module/item/index.php';
include '../../module/levelUpController/index.php';
include '../../module/statusUpController/index.php';
include '../../module/talk/index.php';
include '../../module/asset/index.php'; //アセットの読み込み
//以下の画像パスをアセットに追加する想定
//$imagePassTest['ui_status_cell'] = "../assets/ui/cell/status_cell.png";
//$imagePassTest['ui_input_form'] = "../assets/ui/form/input_form.png";
//$imagePassTest['a'] = "a";
$LOAD_ASSETS = getAssetDatas($pdo,"");//読み込み素材のパスを取得
$CUSTOM_START_GAME = null;
//カスタムスタートパラメーター
if(isset($_GET['custom_start_param'])) $CUSTOM_START_GAME = $_GET['custom_start_param'];
//バッチ実行テスト
include '../../module/batch/index.php'; //バッチスクリプト
?>
<!doctype html>
<html>
  <head>
    <meta charset='utf-8' />
    <title>タイトル</title>
  </head>
  <body>
  </body>
</html>

<script src='../../module/js/phina/build/phina.js'></script>
<script>
// グローバルに展開
phina.globalize();
var ASSETS = { //キャラクター用アセット
  image: {
    'title_tapToStart':'../assets/title/tapToStart.png',
    'title_titleBackGround':'../assets/title/titleBackGround.png',
  },
};
//読み込み済みのアセットID
var LOAD_ASSET = null;
//追加読み込み用
var ADD_LOAD_ASSETS = { //キャラクター用アセット
  image: {
  },
};
var ASSET_LOADING = false; //アセットロード中か
//読み込みシーン後に移動するシーンを設定
var LOAD_NEXT_SCENE = '';
//カスタムスタート設定
var CUSTOM_START_GAME = <?php echo json_encode($CUSTOM_START_GAME, JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
//アセット初期化
//アセットの読み込み
var addAssetImage = <?php echo json_encode($LOAD_ASSETS['assets'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
    Object.keys(addAssetImage).forEach(function (key) {
      ASSETS["image"][key] = addAssetImage[key]; //アセット追加
    });
    console.log(ASSETS["image"]);
//読み込み済みのアセットを追加
LOAD_ASSET = <?php echo json_encode($LOAD_ASSETS['load_asset_datas'], JSON_HEX_TAG | JSON_HEX_AMP | JSON_HEX_APOS | JSON_HEX_QUOT); ?>;
console.log("ロード1");
console.log(LOAD_ASSET);
var RESULT_DATA = ""; //通信結果
var PLAYER_PROFILE_RESULT_DATA = ""; //プレイヤープロフィールのリザルト
var PARTY_INFO_RESULT_DATA = ""; //パーティ情報ウィンドウのリザルト
var CHAT_WINDOW_RESULT_DATA = ""; //チャットウィンドウのリザルト
var GUILD_INFO_RESULT_DATA = ""; //ギルド情報のリザルト
var GUILD_SETTING_RESULT_DATA = ""; //ギルド設定のリザルト
var MESSAGE_WINDOW_RESULT_DATA = ""; //メッセージウィンドウのリザルト
var NETWORK_IS_CONNECTING = false; //通信中か
var PLAYER_INFO = null; //プレイヤー情報
var PLAYER_STATUS = null; //プレイヤーステータス
var PLAYER_MASTER = null; //プレイヤーのマスターデータ
var PLAYER_BATTLE_INSTANCE = null; //プレイヤーのバトルインスタンス情報
var PLAYER_SCENE_INSTANCE = null; //プレイヤーのシーン情報
var SCENE_MANAGER = new Array();
SCENE_MANAGER['prev_scene'] = "";
SCENE_MANAGER['now_scene'] = "";
SCENE_MANAGER['point_ranking_duration_id'] = -1;
var CHARA_CHIP_SHEET_ASSET_ID = 116; //キャラチップシートのアセットID
var SCREEN_HEIGHT = 960; //画面サイズ高さ
var SCREEN_WIDTH = 640; //画面サイズ横幅
var PHINA_APP = null; //phina.jsのインスタンス
var SERVER_REQUEST_DTTM = null; //サーバーリクエスト時間
var ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID = -1; //プレイヤールームに居るか
var LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE = new Array(); //最後に発言したルームチャットメッセージの内容
LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'] = "";
LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id'] = 0;
var ACTIVE_GUILD_ROOM_GUILD_ID = -1; //ギルドルームに居るか
var LAST_SEND_GUILD_ROOM_CHAT_MESSAGE = new Array(); //最後に発言したギルドチャットメッセージの内容
LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'] = "";
LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id'] = 0;
var AREA_MODE = 0; //ストーリーかオープンエリアか 0:ストーリー専用エリア 1:オープンエリア
var GUILD_HOME_MAP_ID = 2; //ギルドホームのマップID
//ASSETS["image"]["fp2"] = '../assets/character/2/fp/fp_2.png'; //アセット追加テスト
</script>
<script src="jquery190.min.js" type="text/javascript" ></script>
<script src="jquery-ui-192.min.js" type="text/javascript"></script>
<script src="../../module/js/ajaxController.js" type="text/javascript"></script>
<script src="../../module/js/moment.js" type="text/javascript"></script>
<script src='../../module/js/errorDisp.js'></script>
<script src='../../module/js/userInfo.js'></script>
<script src='../../module/js/avatar.js'></script>
<script src='../../module/js/userInfo.js'></script>
<script src='../../module/js/ui.js'></script>
<script src='../../module/js/shortMenu.js'></script>
<script src='../../module/js/chat.js'></script>
<script src='../../module/js/helper.js'></script>
<script src='../../module/js/asset.js'></script>
<script src='../../module/js/card.js'></script>
<script src='../../module/js/equipItem.js'></script>
<script src='../../module/js/message.js'></script>
<script src='../../module/masterData/masterData.js'></script>
<script src='../../module/js/item.js'></script>
<script src='../../module/js/scene.js'></script>
<script src='../../module/js/karmaMenu.js'></script>
<script src='../../module/js/date.js'></script>
<script src='../../module/js/effectArea.js'></script>
<script src='../../module/js/battleEffect.js'></script>
<script src='../../module/js/guild.js'></script>
<script src='../login/login.js'></script>
<script src='../title/title.js'></script>
<script src='../myPage/myPage.js'></script>
<script src='../itemBox/itemBox.js'></script>
<script src='../story/story.js'></script>
<script src='../comm/comm.js'></script>
<script src='../map/map.js'></script>
<script src='../battle/battle.js'></script>
<script src='../party/party.js'></script>
<script src='../formation/formation.js'></script>
<script src='../friend/friend.js'></script>
<script src='../deckEdit/deckEdit.js'></script>
<script src='../loadAssets/loadAssets.js'></script>
<script src='../worldMap/worldMap.js'></script>
<script src='../mount/mount.js'></script>
<script src='../shootingGame/shootingGame.js'></script>
<script src='../billingShop/billingShop.js'></script>
<script src='../shopTop/shopTop.js'></script>
<script src='../eventTop/eventTop.js'></script>
<script src='../guildSearch/guildSearch.js'></script>
<script src='../pointRanking/pointRanking.js'></script>

<script src='../testRoom/testRoom.js'></script>

<script>
function isset( data ){ //値チェック用
    return ( typeof( data ) != 'undefined' );
}
/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var startSceneLabelName = 'title';
  console.log(CUSTOM_START_GAME);
  if(CUSTOM_START_GAME != null){ //スタート設定に変更がある場合
    if(isset(CUSTOM_START_GAME['start_scene'])){
      startSceneLabelName = CUSTOM_START_GAME['start_scene'];
    }
  }

  PHINA_APP = GameApp({
    startLabel: startSceneLabelName,
    // 使用するアセットを決定
    assets: ASSETS,
    //assets: ASSETS_TITLE,
    // シーンのリストを引数で渡す
    scenes: [
      {
        className: 'Title',
        label: 'title',
        nextLabel: 'login',
      },
      {
        className: 'Login',
        label: 'login',
        nextLabel: 'myPage',
      },
      {
        className: 'MyPage',
        label: 'myPage',
      },
      {
        className: 'ItemBox',
        label: 'itemBox',
      },
      {
        className: 'Story',
        label: 'story',
      },
      {
        className: 'Comm',
        label: 'comm',
      },
      {
        className: 'Map',
        label: 'map',
      },
      {
        className: 'Battle',
        label: 'battle',
      },
      {
        className: 'Party',
        label: 'party',
      },
      {
        className: 'Formation',
        label: 'formation',
      },
      {
        className: 'Friend',
        label: 'friend',
      },
      {
        className: 'DeckEdit',
        label: 'deckEdit',
      },
      { //追加アセット読み込み用
        className: 'LoadAssets',
        arguments: { assets: ADD_LOAD_ASSETS },
        label: 'loadAssets',
      },
      {
        className: 'WorldMap',
        label: 'worldMap',
      },
      {
        className: 'Mount',
        label: 'mount',
      },
      {
        className: 'ShootingGame',
        label: 'shootingGame',
      },
      {
        className: 'BillingShop',
        label: 'billingShop',
      },
      {
        className: 'ShopTop',
        label: 'shopTop',
      },
      {
        className: 'EventTop',
        label: 'eventTop',
      },
      {
        className: 'GuildSearch',
        label: 'guildSearch',
      },
      {
        className: 'PointRanking',
        label: 'pointRanking',
      },
      {
        className: 'TestRoom',
        label: 'testRoom',
      },
    ]
  });
  //console.log(ASSETS);
  // 実行
  //ASSETS["image"]["fp2"] = '../assets/character/2/fp/fp_2.png'; //アセット追加テスト
  PHINA_APP.run();
});
</script>
