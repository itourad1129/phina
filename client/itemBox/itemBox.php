<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/itemBox/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/card/index.php';
include_once '../../module/item/index.php';
include_once '../../module/importantItem/index.php';
include_once '../../module/avatar/index.php';

$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $addLoadAssetTags = "";
  //装備品の更新があった
  if(isset($_POST['equip_select_equip_item_master_id'])){
    if(playerItemEquip($pdo,$PLAYER_INFO,$_POST['equip_select_equip_item_master_id'])){
      //print("アイテムを装備しました。<br>" );
    }
    else{
      //print("アイテムの装備に失敗しました。<br>" );
    }
  }
  //アバターの装備変更があった。
  if(isset($_POST['equip_select_equip_avatar_item_master_id'])){
    $avatarUid = $_POST['equip_select_equip_avatar_item_master_id'];
    $resultChangeAvatar = changePlayerAvatar($pdo,$PLAYER_INFO['player_index_id'],$avatarUid);
    $RESULT_JSON = $RESULT_JSON + array('result_change_avatar' => $resultChangeAvatar);
  }
  //装備品売却の更新があった
  if(isset($_POST['sell_select_equip_item_master_id'])){
    $sellResult = playerItemSell($pdo,$PLAYER_INFO,$_POST['sell_select_equip_item_master_id']);
    $RESULT_JSON = $RESULT_JSON + array('player_sell_result' => $sellResult);
  }
  //アイテム使用の更新があった
  if(isset($_POST['use_item_master_id'])){
    $sell_useItemResult = itemExecute($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_STATUS,$_POST['use_item_master_id'],1,$STATUS_IDS['STM'],$STATUS_IDS['VIT']);
    $RESULT_JSON = $RESULT_JSON + array('result_user_item_use' => $sell_useItemResult);
  }
  //アイテム売却の更新があった
  if(isset($_POST['sell_item_master_id'])){
    $use_useItemResult = useItemSell($pdo,$PLAYER_INFO['player_index_id'],$_POST['sell_item_master_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_user_item_sell' => $use_useItemResult);
  }
  //クラスデータを取得
  $playerClassData = getClassData($pdo,$PLAYER_INFO['player_class_id']);
  if($playerClassData != false){
    $RESULT_JSON = $RESULT_JSON + array('player_class_data' => $playerClassData);
  }
  //レベルステージデータ取得
  if(isset($PLAYER_INFO['player_level']) && isset($PLAYER_INFO['player_class_id'])){
    $playerLevelStageData = getPlayerLevelStage($pdo,$PLAYER_INFO['player_class_id'],$PLAYER_INFO['player_level']);
    if($playerLevelStageData != false){
      $RESULT_JSON = $RESULT_JSON + array('player_level_stage_data' => $playerLevelStageData);
    }
  }
  //スタミナを更新
  updatePlayerStamina($pdo,$PLAYER_INFO,$PLAYER_STATUS,$STATUS_ID_STAMINA);
  $playerStaminaVal = getPlayerStaminaData($pdo,$PLAYER_INFO['player_index_id']);
  if($playerStaminaVal != false){
    $RESULT_JSON = $RESULT_JSON + array('player_stamina_data' => $playerStaminaVal);
  }
  //生命力を更新
  updatePlayerVitality($pdo,$PLAYER_INFO,$PLAYER_STATUS,$STATUS_ID_VITALITY);
  $playerVitalityVal = getPlayerVitalityData($pdo,$PLAYER_INFO['player_index_id']);
  if($playerVitalityVal != false){
    $RESULT_JSON = $RESULT_JSON + array('player_vitality_data' => $playerVitalityVal);
  }
  //通過アイテムデータ取得
  $playerItemData = getPlayerUseItemInventory($pdo,$PLAYER_INFO['player_index_id'],1);
  if($playerItemData != false){
    $RESULT_JSON = $RESULT_JSON + array('player_money_item_data' => $playerItemData);
  }
  //ロールデータ取得
  $playerCardData = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']);
  if($playerCardData != false){
    $RESULT_JSON = $RESULT_JSON + array('player_card_data' => $playerCardData);
  }
  //消費アイテムデータ
  $playerItemData = getPlayerUseItemInventory($pdo,$PLAYER_INFO['player_index_id'],2);
  if($playerItemData != false){
    $RESULT_JSON = $RESULT_JSON + array('player_item_data' => $playerItemData);
  }
  //重要アイテムデータ
  $playerImportantItemData = getPlayerImportantItemData($pdo,$PLAYER_INFO['player_index_id']);
  if($playerImportantItemData != false){
    $RESULT_JSON = $RESULT_JSON + array('player_important_item_data' => $playerImportantItemData);
  }
  //アバターアイテムデータ
  $playerAvatarItems = getPlayerAvatarItems($pdo,$PLAYER_INFO['player_index_id']);
  if($playerAvatarItems != false){
    $RESULT_JSON = $RESULT_JSON + array('player_avatar_items' => $playerAvatarItems);
  }

  //装備品データ取得
  $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
  if($playerEquipItems != false){
    $RESULT_JSON = $RESULT_JSON + array('player_equip_item_disp' => $playerEquipItems);
    //装備アセット読み込みの為、アセットタグを生成
    foreach ($playerEquipItems as $equipItem) {
      $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
      if($equipAssetTag != ""){
        if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
      }
    }
  }
  //装備品の性能も加算させたステータスに変更
  $resultStatus = equipStatusUpdate($pdo,$PLAYER_STATUS,$PLAYER_INFO['player_index_id']);
  //ペナルティーフラグ取得
  $vitalityPenalty = getVitalityPenalty($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_STATUS,$STATUS_ID_VITALITY);
  if($vitalityPenalty != false){
    $vitalityPenaltyFlag = "1"; //ペナルティあり
    $resultStatus = updatePlayerStatusPenalty($pdo,$resultStatus,$STATUS_ID_VITALITY);
  }
  else{
    $vitalityPenaltyFlag = "0";//ペナルティなし
  }
  $RESULT_JSON = $RESULT_JSON + array('vitality_penalty' => $vitalityPenaltyFlag);
  $RESULT_JSON = $RESULT_JSON + array('player_status' => $resultStatus); //ステータスを決定

  $playerEquipItemInventory = playerEquipItemParams($pdo, $PLAYER_INFO['player_index_id']); //全ての所持している装備品を取得(アイテムパラメーター付き)
  $RESULT_JSON = $RESULT_JSON + array('player_equip_item_inventory_disp' => $playerEquipItemInventory);

  $playerAvatarData = getPlayerAvatarData($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーが所持しているアバターを取得
  
  //アセットタグを追加
  $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
  if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
  else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
  $RESULT_JSON = $RESULT_JSON + array('player_avatar_data' => $playerAvatarData);

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
































 ?>
