<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/card/index.php';
include_once '../../module/skill/index.php';
include_once '../../module/enemy/index.php';
include_once '../../module/quest/index.php';
include_once '../../module/battle/index.php';
include_once '../../module/party/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/map/index.php';
include_once '../../module/formation/index.php';
include_once '../../module/pvp/index.php';
include_once '../../module/asset/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
$ERROR_DATA = array();
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
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
  $playerEquipItems = playerEquipItemDisp($pdo,$PLAYER_INFO['player_index_id']);
  if($playerEquipItems != false){
    $RESULT_JSON = $RESULT_JSON + array('player_equip_item_disp' => $playerEquipItems);
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
  //パーティ情報を取得
  $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
  $RESULT_JSON = $RESULT_JSON + array('player_party_data' => $playerPartyData);
  //パーティで設定されている隊形データを取得
  $playerPartyFormationData = getPlayerPartyFormationData($pdo,$PLAYER_INFO['player_party_index_id']);
  $RESULT_JSON = $RESULT_JSON + array('player_party_formation_data' => $playerPartyFormationData);
  //パーティメンバーを取得
  $playerPartyMember = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
  $RESULT_JSON = $RESULT_JSON + array('player_party_member' => $playerPartyMember);
  //パーティメンバーのカード、装備品、ステータスを取得
  $partyMemberCardDeck = array(); //パーテイメンバーのカードデッキ情報
  $partyMemberStatus = array(); //パーテイメンバーのステータスを取得
  $partyMemberAvatarData = array(); //パーティメンバーのアバターデータを取得
  foreach ($playerPartyMember as $ptPlayerInfo) {
    //パーティメンバーのカード情報を取得
    $deckType = 0;
    if($ptPlayerInfo['player_index_id'] != $PLAYER_INFO['player_index_id']) $deckType = 1; //自分以外のメンバーはパーティデッキに切り替える
    $ptPlayerCardDeck = getPlayerDeckData($pdo,$ptPlayerInfo['player_index_id'],$deckType);
    //読み込むカードのアセットデータを追加
    foreach ($ptPlayerCardDeck['card_master_datas'] as $plCard) {
      if($addLoadAssetTags == "") $addLoadAssetTags = "card_character_".$plCard['card_asset_id'];
      else $addLoadAssetTags = $addLoadAssetTags.",card_character_".$plCard['card_asset_id'];
    }
    $resultCheckDeckNumber = array();
    if(is_array($ptPlayerCardDeck)){
      $checkCardNum = false;
      //使用可能なカードかチェっクを行う
      foreach ($ptPlayerCardDeck['player_card_decks'] as &$plMemberDeckData) {
        $cardMasterIds = explode(",",$plMemberDeckData['card_deck']);
        $plMemberDeckData['check_class'] = true;
        $plMemberDeckData['check_weapon'] = true;
        $plMemberDeckData['check_sub_weapon'] = true;
        $plMemberDeckData['check_num'] = true;
        for($cmi = 0; $cmi < count($cardMasterIds); $cmi++){
          $checkCardNum = checkPlayerCardNum($pdo,$plMemberDeckData['player_index_id'],$cardMasterIds[$cmi]);
          $checkPlayerActiveDeck = checkPlayerActiveCardDeck($pdo,$ptPlayerInfo['player_index_id'],$ptPlayerInfo['player_class_id'],$cardMasterIds[$cmi]);
          //発動可能なデッキか、結果の配列を返す
          if($checkCardNum == false) $plMemberDeckData['check_num'] = false;
          if($checkPlayerActiveDeck['check_class'] == false) $plMemberDeckData['check_class'] = false;
          if($checkPlayerActiveDeck['check_weapon'] == false) $plMemberDeckData['check_weapon'] = false;
          if($checkPlayerActiveDeck['check_sub_weapon'] == false) $plMemberDeckData['check_sub_weapon'] = false;
        }
      }
      unset($plMemberDeckData);
      array_push($partyMemberCardDeck,$ptPlayerCardDeck);
    }
    //パーティメンバーのステータスを取得
    $ptTmpPlayerStatus = getPlayerStatus($pdo,$ptPlayerInfo['player_index_id'],true);
    $ptPlayerStatus = equipStatusUpdate($pdo,$ptTmpPlayerStatus,$ptPlayerInfo['player_index_id']);
    $ptVitalityPenalty = getVitalityPenalty($pdo,$ptPlayerInfo['player_index_id'],$ptTmpPlayerStatus,$STATUS_ID_VITALITY);
    if($ptVitalityPenalty != false){ //ステータスペナルティーが発生している
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 1; //ペナルティーあり
      }
      $ptPlayerStatus = updatePlayerStatusPenalty($pdo,$ptPlayerStatus,$STATUS_ID_VITALITY);
    }
    else{
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 0; //ペナルティーなし
      }
    }
    if(is_array($ptPlayerStatus)){
      $ptPlayerStatus['player_index_id'] = $ptPlayerInfo['player_index_id'];
      array_push($partyMemberStatus,$ptPlayerStatus);
    }
    //パーティメンバーのアバターデータを取得
    $ptPlayerAvatarData = getAvatarMasterData($pdo,$ptPlayerInfo['player_avatar_id']);
    if(is_array($ptPlayerAvatarData)){
      $ptPlayerAvatarData['player_index_id'] = $ptPlayerInfo['player_index_id'];
      $ptPlayerAvatarAnimData = getAvatarAnimMasterData($pdo,$ptPlayerInfo['player_avatar_id']);
      $ptPlayerAvatarData['avatar_anim_data'] = $ptPlayerAvatarAnimData;
      array_push($partyMemberAvatarData,$ptPlayerAvatarData);
    }
  }
  $RESULT_JSON = $RESULT_JSON + array('player_member_card_deck' => $partyMemberCardDeck);
  $RESULT_JSON = $RESULT_JSON + array('player_member_status' => $partyMemberStatus);
  $RESULT_JSON = $RESULT_JSON + array('player_member_avatar_data' => $partyMemberAvatarData);
  //バトル情報があった場合
  if(isset($_POST['battle_event_data']['id'])){
    $getAndCheckPlayerBattleInstance = checkPlayerBattleInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['battle_event_data']['id']);
    if($getAndCheckPlayerBattleInstance != false){ //正しいデータか
      //敵マスターデータを取得
      $enemyMasterData = getEnemyMasterData($pdo,$getAndCheckPlayerBattleInstance['enemy_index_id']);
      $enemyIndexIdsArray = explode(',',$getAndCheckPlayerBattleInstance['party_enemy_index_ids']);
      $partyEnemyMasterDatas = array();
      $enemyMemberAvatarData = array(); //パーティメンバーのアバターデータを取得
      //敵隊形データを取得
      if(count($enemyIndexIdsArray) != 0){
        $enemyFormationData = getFormationMasterData($pdo,$enemyIndexIdsArray[0]);
        $RESULT_JSON = $RESULT_JSON + array('enemy_party_formation_data' => $enemyFormationData);
      }
      for ($e=0; $e < count($enemyIndexIdsArray); $e++) {
        $getEnemyMasterData = getEnemyMasterData($pdo,$enemyIndexIdsArray[$e]);
        array_push($partyEnemyMasterDatas,$getEnemyMasterData);
        //敵メンバーのアバターデータを取得
        $enemyAvatarData = getAvatarMasterData($pdo,$getEnemyMasterData['enemy_avatar_id']);
        if(is_array($enemyAvatarData)){
          $enemyAvatarData['enemy_index_id'] = $getEnemyMasterData['enemy_index_id'];
          $enemyAvatarAnimData = getAvatarAnimMasterData($pdo,$getEnemyMasterData['enemy_avatar_id']);
          $enemyAvatarData['avatar_anim_data'] =   $enemyAvatarAnimData;
          array_push($enemyMemberAvatarData,$enemyAvatarData);
        }
      }
      $RESULT_JSON = $RESULT_JSON + array('enemy_party_master_datas' => $partyEnemyMasterDatas);
      $RESULT_JSON = $RESULT_JSON + array('enemy_master_data' => $enemyMasterData);
      $RESULT_JSON = $RESULT_JSON + array('enemy_member_avatar_datas' => $enemyMemberAvatarData);
    }
  }
  //PVPバトルを開始した
  if(isset($_POST['pvp_battle_event_data']) && isset($_POST['pvp_battle_event_data']['id'])){
    $resultBattleLogData = array();
    $resultBattleLogData['pvp_battle_log_data'] = false;
    $resultBattleLogData['error'] = 0;
    $resultBattleLogData['error_comment'] = "";
    $partyMemberAvatarData = array();
    $enemyMemberAvatarData = array();
    $partyPlayerMasterDatas = array();
    $partyEnemyMasterDatas = array();
    $mapMasterData = false;
    $resultPvpBattleLog = getPvpBattleLog($pdo,$_POST['pvp_battle_event_data']['id']);
    $decodePvpBattleAnimLog = json_decode($resultPvpBattleLog['battle_anim_log']);
    foreach ($decodePvpBattleAnimLog as $animLog) {
      if(array_key_exists('card_asset_id',$animLog)) {
        if($addLoadAssetTags == "") $addLoadAssetTags = "card_character_".$animLog->card_asset_id;
        else $addLoadAssetTags = $addLoadAssetTags.",card_character_".$animLog->card_asset_id;
      }
    }
    if($resultPvpBattleLog != false){
      $resultBattleLogData['pvp_battle_log_data'] = $resultPvpBattleLog;
      //味方情報
      $playerIndexIds = explode(",",$resultPvpBattleLog['player_party_member_ids']);
      $playerAvatarIds = explode(",",$resultPvpBattleLog['player_party_avatar_ids']);
      //パーティで設定されている隊形データを取得
      $playerPartyFormationData = getFormationMasterData($pdo,$resultPvpBattleLog['player_party_formation_id']);
      for ($i=0; $i < count($playerIndexIds); $i++) {
        $playerInfo = getPlayerInfoForIndexId($pdo,$playerIndexIds[$i],true);
        if($playerInfo != false){
          $playerInfo['player_name'] = getPlayerName($pdo,$playerIndexIds[$i]);
          array_push($partyPlayerMasterDatas,$playerInfo);//クライアントではplayer_index_id,enemy_index_idしか使っていない
          //パーティメンバーのアバターデータを取得
          $ptPlayerAvatarData = getAvatarMasterData($pdo,$playerAvatarIds[$i]);
          if(is_array($ptPlayerAvatarData)){
            $ptPlayerAvatarData['player_index_id'] = $playerIndexIds[$i];
            $ptPlayerAvatarAnimData = getAvatarAnimMasterData($pdo,$playerAvatarIds[$i]);
            $ptPlayerAvatarData['avatar_anim_data'] = $ptPlayerAvatarAnimData;
            array_push($partyMemberAvatarData,$ptPlayerAvatarData);
          }
        }
        else{
          $resultBattleLogData['error'] = 2;
          $resultBattleLogData['error_comment'] = "プレイヤーデータの取得に失敗しました";
          break;
        }
      }

      //敵情報
      $enemyIndexIds = explode(",",$resultPvpBattleLog['enemy_party_member_ids']);
      $enemyAvatarIds = explode(",",$resultPvpBattleLog['enemy_party_avatar_ids']);
      //敵隊形データを取得
      $enemyFormationData = getFormationMasterData($pdo,$resultPvpBattleLog['enemy_party_formation_id']);
      for ($i=0; $i < count($enemyIndexIds); $i++) {
        $enemyInfo = getPlayerInfoForIndexId($pdo,$enemyIndexIds[$i],true);
        if($enemyInfo != false){
          array_push($partyEnemyMasterDatas,$enemyInfo);//クライアントではplayer_index_id,enemy_index_idしか使っていない
          //パーティメンバーのアバターデータを取得
          $ptEnemyAvatarData = getAvatarMasterData($pdo,$enemyAvatarIds[$i]);
          if(is_array($ptEnemyAvatarData)){
            $ptEnemyAvatarData['player_index_id'] = $enemyInfo['player_index_id'];
            $ptEnemyAvatarAnimData = getAvatarAnimMasterData($pdo,$enemyAvatarIds[$i]);
            $ptEnemyAvatarData['avatar_anim_data'] = $ptEnemyAvatarAnimData;
            array_push($enemyMemberAvatarData,$ptEnemyAvatarData);
          }
        }
        else{
          $resultBattleLogData['error'] = 2;
          $resultBattleLogData['error_comment'] = "プレイヤーデータの取得に失敗しました";
          break;
        }
      }
      $mapMasterData = getMapMasterData($pdo,$resultPvpBattleLog['map_id']);
      if($mapMasterData != false){
        $RESULT_JSON = $RESULT_JSON + array('result_map_master_data' => $mapMasterData); //戦闘画面の背景表示のため、マップ情報を取得
      }
    }
    else{
      $resultBattleLogData['error'] = 1;
      $resultBattleLogData['error_comment'] = "戦闘結果の取得に失敗しました";
    }
    if(isset($RESULT_JSON['player_member_avatar_data'])) $RESULT_JSON['player_member_avatar_data'] = $partyMemberAvatarData;
    else $RESULT_JSON = $RESULT_JSON + array('player_member_avatar_data' => $partyMemberAvatarData);
    $RESULT_JSON = $RESULT_JSON + array('enemy_member_avatar_datas' => $enemyMemberAvatarData);
    $RESULT_JSON = $RESULT_JSON + array('player_party_formation_data' => $playerPartyFormationData);
    $RESULT_JSON = $RESULT_JSON + array('enemy_party_formation_data' => $enemyFormationData);
    $RESULT_JSON = $RESULT_JSON + array('player_party_master_datas' => $partyPlayerMasterDatas);
    $RESULT_JSON = $RESULT_JSON + array('enemy_party_master_datas' => $partyEnemyMasterDatas);
    $RESULT_JSON = $RESULT_JSON + array('result_pvp_battle_data' => $resultBattleLogData);
  }

  //バトル開始情報があった。
  if(isset($_POST['set_battle_player_datas']) && isset($_POST['set_battle_player_deck_datas']) && isset($_POST['set_battle_enemy_datas']) && isset($_POST['select_battle_instance_data'])){
    $checkMapId = -1;
    $checkCharaMapArrayIndex = -1;
    $checkCharaMapChipIndex = -1;
    $checkBattleInstanceId = -1;
    $checkStoryId = -1;
    $checkPlayerEventCount = -1;
    if(isset($_POST['select_battle_instance_data']['map_id'])) $checkMapId = $_POST['select_battle_instance_data']['map_id'];
    if(isset($_POST['select_battle_instance_data']['map_chara_array_index'])) $checkCharaMapArrayIndex = $_POST['select_battle_instance_data']['map_chara_array_index'];
    if(isset($_POST['select_battle_instance_data']['chara_map_chip_index'])) $checkCharaMapChipIndex = $_POST['select_battle_instance_data']['chara_map_chip_index'];
    if(isset($_POST['select_battle_instance_data']['id'])) $checkBattleInstanceId = $_POST['select_battle_instance_data']['id'];

    if(isset($_POST['check_story_id'])) $checkStoryId = $_POST['check_story_id'];
    if(isset($_POST['check_player_event_count'])) $checkPlayerEventCount = $_POST['check_player_event_count'];

    $checkEnemyDatas = array();
    if(is_array($_POST['set_battle_enemy_datas'])){
      foreach ($_POST['set_battle_enemy_datas'] as $enemyData) {
        if(isset($enemyData['enemy_index_id'])){
          $checkEnemyDatas[count($checkEnemyDatas)] = $enemyData['enemy_index_id'];
        }
      }
    }
    $checkBattleInstance = checkIsBattleStartOk($pdo,$PLAYER_INFO['player_index_id'],$checkBattleInstanceId,$checkEnemyDatas,$checkCharaMapArrayIndex,$checkCharaMapChipIndex,$checkMapId); //戦闘開始可能なデータがあるかチェックを行う
    $checkPlayerParty = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
    $resultCheckPartyMember = false;
    if($checkPlayerParty != false && isset($checkPlayerParty['leader_player_index_id'])){
      $checkPartyMemberDatas = getPartyMemberPlayerDatas($pdo,$checkPlayerParty['leader_player_index_id']);
      if(is_array($checkPartyMemberDatas) && is_array($_POST['set_battle_player_datas'])){
        $resultCheckPartyMember = true;
        //メンバーのチェックを行う
        foreach ($checkPartyMemberDatas as $ptMemberData)  {
          $found = false;
          foreach ($_POST['set_battle_player_datas'] as $selectPtMember) {
            if($selectPtMember['player_index_id'] == $ptMemberData['player_index_id']){
              $found = true;
              break;
            }
          }
          if($found == false) $resultCheckPartyMember = false;
        }
      }
    }
    $areaCheck = true;
    // var_dump($checkMapId);
    // var_dump($checkCharaMapArrayIndex);
    // var_dump($checkCharaMapChipIndex);
    // var_dump($checkBattleInstanceId);
    //戦闘結果を取得
    if($checkBattleInstance != false && $resultCheckPartyMember != false && $areaCheck != false){
      $mapMasterData = getMapMasterData($pdo,$checkBattleInstance['map_id']);
      $playerMapInstance = false;
      switch ((int)$mapMasterData['map_type']) {
        case 0: //通常マップ
        {
          $playerMapInstance = getPlayerMapInstance($pdo,$PLAYER_INFO['player_index_id'],$checkBattleInstance['map_id']);
        }
        break;
        case 1: //ワールドエリアマップ
        {
          $playerMapInstance = getAreaInstanceSelectMapId($pdo,$checkBattleInstance['map_id']);
        }
        break;
        default:
        {

        }
        break;
      }
      $getBattleResult = getBattleResult($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_battle_player_datas'],
      $_POST['set_battle_player_deck_datas'],$_POST['set_battle_player_target_datas'],
      $_POST['set_battle_enemy_datas'],$STATUS_IDS,$checkBattleInstance,$playerMapInstance,
      $checkStoryId,$checkPlayerEventCount,$mapMasterData,$checkPlayerParty);
      $RESULT_JSON = $RESULT_JSON + array('result_battle_data' => $getBattleResult);
    }
    else{
      $ERROR_DATA[count($ERROR_DATA)] = 1; //エラーコードを挿入
    }
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}
$RESULT_JSON = $RESULT_JSON + array('error' => $ERROR_DATA);
echo json_encode($RESULT_JSON);




























 ?>
