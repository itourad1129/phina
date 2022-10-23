<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/item/index.php';
include_once '../../module/mount/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['mount_scene_init'])){ //マウントシーンの初期化通信
    $resultMountSceneInit = array();
    $resultMountSceneInit['player_mount_datas'] = array();
    $resultMountSceneInit['player_mount_datas'] = getPlayerMountDatas($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーが解放したマウントを全て取得
    $resultMountSceneInit['player_open_flag_datas'] = array();
    $resultMountSceneInit['player_open_flag_datas'] = getPlayerOpenFlag($pdo,$PLAYER_INFO['player_index_id']);
    $resultMountSceneInit['player_item_datas'] = array();
    $resultMountSceneInit['player_item_datas'] = getPlayerUseItemInventory($pdo,$PLAYER_INFO['player_index_id']); //燃料アイテム情報を取得
    $RESULT_JSON = $RESULT_JSON + array('result_mount_scene_init' => $resultMountSceneInit);
  }
  if(isset($_POST['use_charge_fuel_num']) && isset($_POST['mount_id'])){ //燃料の補給が行われた
    $chargeMountFuelResult = chargeMountFuel($pdo,$PLAYER_INFO['player_index_id'],$_POST['mount_id'],$_POST['use_charge_fuel_num']);
    $RESULT_JSON = $RESULT_JSON + array('result_charge_mount_fuel' => $chargeMountFuelResult);
    $updatePlayerMountDatas = getPlayerMountDatas($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーが解放したマウントを全て取得
    $RESULT_JSON = $RESULT_JSON + array('update_player_mount_datas' => $updatePlayerMountDatas);
    $updatePlayerItemDatas =  getPlayerUseItemInventory($pdo,$PLAYER_INFO['player_index_id']); //燃料アイテム情報を取得
    $RESULT_JSON = $RESULT_JSON + array('update_player_item_datas' => $updatePlayerItemDatas);
  }
  if(isset($_POST['player_mount_purchase'])){ //マウントの購入が行われた
    $resultMountPurchase = playerMountPurchase($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_mount_purchase']); //マウントの購入を行った。
    $RESULT_JSON = $RESULT_JSON + array('result_mount_purchase' => $resultMountPurchase);
    $updatePlayerMountDatas = getPlayerMountDatas($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーが解放したマウントを全て取得
    $RESULT_JSON = $RESULT_JSON + array('update_player_mount_datas' => $updatePlayerMountDatas);
    $updatePlayerItemDatas =  getPlayerUseItemInventory($pdo,$PLAYER_INFO['player_index_id']); //燃料アイテム情報を取得
    $RESULT_JSON = $RESULT_JSON + array('update_player_item_datas' => $updatePlayerItemDatas);
  }
  if(isset($_POST['player_mount_select'])){ //マウントの選択を行った
    $resultPlayerMountSelect = playerMountSelect($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_mount_select']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_mount_select' => $resultPlayerMountSelect);
    $updatePlayerMountDatas = getPlayerMountDatas($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーが解放したマウントを全て取得
    $RESULT_JSON = $RESULT_JSON + array('update_player_mount_datas' => $updatePlayerMountDatas);
  }
}

echo json_encode($RESULT_JSON);
