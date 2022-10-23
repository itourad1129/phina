<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/masterData/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/area/index.php';
include_once '../../module/story/index.php';
include_once '../../module/paypal/index.php';
include_once '../../module/item/index.php';
include_once '../../module/billingShop/index.php';
include_once '../../module/guild/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
if($PLAYER_INFO['player_guild_index_id'] != 0){
  updatePlayerGuildLastLogin($pdo,$PLAYER_INFO['player_guild_index_id']); //ギルドに所属している場合は、ギルドの最終ログイン時刻も更新
}
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if(isset($_POST['paypal_billing_check'])){ //購入状態のチェック(リカバリー)
  $appDefine = new AppDefine($ENV);
  $mode = $ENV == 1 ? 'live' : 'sandbox';
  // PayPalを宣言する
  //ペイパル決済処理を開始
  $paypal = new PayPalOrder(array(
    'client_id' => $appDefine->PAYPAL_CLIENT_ID,
    'secret'    => $appDefine->PAYPAL_SECRET,
    'mode'      => $mode,
    'lang'      => 'ja-JP',
  ));
  $resultPaypalBillingCheck = $paypal->playerPaypalBillingCheck($pdo,$PLAYER_INFO['player_index_id'],(empty($_SESSION['paypal']['access_token']) ? null : $_SESSION['paypal']['access_token']));
  //リカバリーの課金アイテムがあった場合、不足分を付与。
  if(isset($resultPaypalBillingCheck['billing_codes']) && count($resultPaypalBillingCheck['billing_codes']) != 0){
    $billingShopMasterDatas = getBillingShopMasterDatas($pdo,false);
    $itemMasterDatas = getItemMasterDatas($pdo);
    for ($i=0; $i < count($resultPaypalBillingCheck['billing_codes']); $i++) {
      foreach ($billingShopMasterDatas as $billingShop) {
        if($resultPaypalBillingCheck['billing_codes'][$i] == $billingShop['billing_code']){ //リカバリー対象の商品コードが一致
          foreach ($itemMasterDatas as $itemMaster) {
            if($itemMaster['id'] == $billingShop['item_id']){ //アイテムIDが一致
              //課金アイテム付与を実行
              addPlayerItem($pdo,$PLAYER_INFO['player_index_id'],$billingShop['item_id'],$billingShop['num']);
            }
          }
        }
      }
    }
  }
  $RESULT_JSON = $RESULT_JSON + array('result_paypal_billing_check' => $resultPaypalBillingCheck);
}
if(isset($_POST['client_master_data_versions'])){ //クライアントで所持しているマスターデータバージョン情報
  $masterDatas = getMasterData($pdo,$_POST['client_master_data_versions']); //更新するマスターデータがあれば取得
  //更新対象のマスターデータを取得
  $RESULT_JSON = $RESULT_JSON + array('sever_master_datas' => $masterDatas);
}
if(isset($_POST['area_move_check'])){ //エリアの移動が完了したか確認
  $areaMoveCheckResult = checkAreaMoveTime($pdo,$PLAYER_INFO['player_index_id']);
}
if(isset($_POST['player_area_instance']) && isset($_POST['player_area_instance']['story_id'])){
  $getStoryId = $_POST['player_area_instance']['story_id'];
  //エリアアップデートチェック
  $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
  if($playerAreaInstance['area_id'] != $_POST['player_area_instance']['area_id']) $getStoryId = $playerAreaInstance['story_id'];//エリアに変更があった

  if($playerAreaInstance['visible'] == 2) {//移動中だった
    $subAreaMasterData = getSubAreaMasterData($pdo,$PLAYER_INFO['player_index_id'],$playerAreaInstance['world_id'],$playerAreaInstance['area_id']);
    if($subAreaMasterData['story_id'] != $getStoryId) $getStoryId = $subAreaMasterData['story_id'];
  }

  $setHash = checkPlayerOpenMainStory($pdo,$PLAYER_INFO['player_index_id'],$getStoryId); //正常であればハッシュを取得
  if($setHash != false){ //開放されたステージかチェック
    $getEventData = getPlayerEventCount($pdo,$PLAYER_INFO['player_index_id'],$getStoryId);
    $resultStoryEventCount = $getEventData['event_count'];
    if($resultStoryEventCount == false){ //プレイヤーイベントが存在しない場合、新たに発行する。
      $resultStoryEventCount = eventStart($pdo,$PLAYER_INFO['player_index_id'],$getStoryId);
    }
    $RESULT_JSON = $RESULT_JSON + array('check_main_story' => $setHash);
    $RESULT_JSON = $RESULT_JSON + array('result_continue_player_event_count' => $resultStoryEventCount);
  }
  else{
    $setHash = false;
    //エラー処理
    $RESULT_JSON = $RESULT_JSON + array('check_main_story' => $setHash);
  }
}
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $addLoadAssetTags = "";
  //プレイヤーエリアデータの不足チェック
  initPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
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
  //装備品データ取得
  $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
  if($playerEquipItems != false){
    $RESULT_JSON = $RESULT_JSON + array('player_equip_item_disp' => $playerEquipItems);
    //アバター読み込みの為、アセットタグを生成
    foreach ($playerEquipItems as $equipItem) {
      $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
      if($equipAssetTag != ""){
        if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
      }
    }
  }
  //プレイヤーアバターデータ
  $playerAvatarData = getPlayerAvatarData($pdo,$PLAYER_INFO['player_index_id']);
  //アセットタグを追加
  $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
  if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
  else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
  $RESULT_JSON = $RESULT_JSON + array('player_avatar_data' => $playerAvatarData);

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
  //ワールドエリア情報を取得
  $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
  if($playerAreaInstance != false){
    $areaMaster = getAreaMaster($pdo,$playerAreaInstance['area_id']); //プレイヤーが現在居る、ワールドエリアマスターデータを取得
    $RESULT_JSON = $RESULT_JSON + array('player_area_master' => $areaMaster);
  }

  if(isset($_POST['my_page_init'])){ //マイページの初期化が実行された
    $RESULT_JSON = $RESULT_JSON + array('result_my_page_init' => "1");
    //ギルドデータ取得
    if($PLAYER_INFO['player_guild_index_id'] != 0){
      $myGuildData = selectPlayerGuildDataForGuildId($pdo,$PLAYER_INFO['player_guild_index_id']);
      if($myGuildData != false){
        $RESULT_JSON = $RESULT_JSON + array('result_my_guild_data' => $myGuildData);
      }
    }
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);




























 ?>
