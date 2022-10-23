<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/asset/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){

  //ここに処理を追記
  if(isset($_POST['load_asset_card_asset_id']) && is_numeric($_POST['load_asset_card_asset_id'])){
    if($addLoadAssetTags == "") $addLoadAssetTags = "card_character_".$_POST['load_asset_card_asset_id'];
    else $addLoadAssetTags = $addLoadAssetTags.",card_character_".$_POST['load_asset_card_asset_id'];
  }
  if(isset($_POST['open_card_info_id']) && is_numeric($_POST['open_card_info_id'])){
    $RESULT_JSON = $RESULT_JSON + array('open_card_info_window_card_id' => $_POST['open_card_info_id']);
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
