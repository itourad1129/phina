<?php
require_once(dirname(__FILE__)."/../vitalityCount/index.php");
require_once(dirname(__FILE__)."/../item/index.php");
require_once(dirname(__FILE__)."/../levelUpController/index.php");

//プレイヤーのバトルインスタンスを確認する。(廃止予定)
function checkPlayerBattleInstance($conn,$playerIndexId,$battleInstanceId){
  $result = false;
  $sql = "SELECT * FROM player_battle_instance WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($battleInstanceId));
  $getBattleInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getBattleInstance != false){
    if($getBattleInstance['player_index_id'] == $playerIndexId){ //本人か確認
      $result = $getBattleInstance;
    }
  }
  return $result;
}

function getStatusValue($conn,$playerStatus,$StatusId){
  $resultStatusPoint = 0;
  foreach ($playerStatus as $plStatus) {
    if($plStatus['status_id'] == $StatusId){
      $statusData = getStatusDataForStatusId($conn,$plStatus['status_id']);
      if($statusData != false){
        $statusName = $statusData['status_param_name'];
        $resultStatusPoint = $plStatus[$statusName];
      }
    }
  }
  return $resultStatusPoint;
}

function getStatusName($conn,$statusId){
  $sql = "SELECT * FROM status_ids WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($statusId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result['status_param_name'];
}

function getDamage($conn,$statusData,$skillMasterData,$criticalFlag){
  $resultDamage = 0;
  $resultSubStatusDamage = 0;
  if($statusData != false && $skillMasterData != false){
    $skillStatusName = getStatusName($conn,$skillMasterData['status_id']); //ステータス名をを取得
    $resultDamage = round(($statusData[$skillStatusName] + $skillMasterData['base_point']) * $skillMasterData['base_point_double']);
    if($criticalFlag != 0){
        switch ($criticalFlag) {
          case -1:
          $resultDamage = round($resultDamage * 0.9);
            break;
          case -2:
          $resultDamage = round($resultDamage * 0.75);
            break;
          case -3:
          $resultDamage = round($resultDamage * 0.5);
            break;
          case 1:
          $resultDamage = round($resultDamage * 1.5);
            break;
          case 2:
          $resultDamage = round($resultDamage * 2);
            break;
          case 3:
          $resultDamage = round($resultDamage * 3);
            break;
          default:
            break;
        }
    }
    if($skillMasterData['sub_status_id'] != 0){
      $subStatusName = getStatusName($conn,$skillMasterData['sub_status_id']); //ステータス名をを取得
      $subStatusPoint = $statusData[$subStatusName];
      $resultSubStatusDamage = getSubStatusDamage($conn,$subStatusPoint,$skillMasterData['sub_status_level']);
    }
  }
  return ($resultDamage + $resultSubStatusDamage);
}

function getSubStatusDamage($conn,$subStatusPoint,$subStatusLevel){
  $result = 0;
  $subStatusDiff = (0.1 * $subStatusLevel);
  $baseStatusPoint = round($subStatusPoint * $subStatusDiff);
  $randPoint = rand(1,$subStatusLevel);
  $bonusPoint = ((0.1 * $subStatusPoint) * $randPoint);
  $result = round($baseStatusPoint + $bonusPoint);
  return $result;
}

function getDef($conn,$statusData,$skillMasterData,$statusIds){ //スキルに対しての防御力を取得
  $resultDef = 0;
  if($statusData != false && $skillMasterData){
    if($skillMasterData['status_id'] == $statusIds['ATK']){
      $resultDef = $statusData['DEF'];
    }
    else if($skillMasterData['status_id'] == $statusIds['M_ATK']){
      $resultDef = $statusData['M_DEF'];
    }
    else{
      $resultDef = round($statusData['DEF'] * 0.25 + $statusData['M_DEF'] * 0.25);
    }
  }
  return $resultDef;
}

function getCriticalFlag($conn,$playerLuk,$enemyLuk){ //クリティカルの強度判定 0以下はバットクリティカル
  $resultCriticalFlag = 0;
  $criticalDiff = ($playerLuk - $enemyLuk);
  $criticalRot = rand(1,100);
  if(0 <= $criticalDiff){
    if(100 <= $criticalDiff){
      if($criticalRot <= 50){
        $resultCriticalFlag = 3;
      }
    }
    else if(50 <= $criticalDiff){
      if($criticalRot <= 25){
        $resultCriticalFlag = 2;
      }
    }
    else if(10 <= $criticalDiff){
      if($criticalRot <= 10){
        $resultCriticalFlag = 1;
      }
    }
  }
  if($criticalDiff < 0){
    if($criticalDiff <= -100){
      if($criticalRot <= 50){
        $resultCriticalFlag = -3;
      }
    }
    else if($criticalDiff <= -50){
      if($criticalRot <= 25){
        $resultCriticalFlag = -2;
      }
    }
    else if($criticalDiff <= -10){
      if($criticalRot <= 10){
        $resultCriticalFlag = -1;
      }
    }
  }
  return $resultCriticalFlag;
}

function getAgilityBonus($enemyAgility,$playerAgility){ //行動回数、また、0の場合は行動スキップ判定を返す
  $result = 1;
  $bonusRot = rand(1,100);
  $agilityDiff = round($playerAgility / $enemyAgility * 100);
  if(0 <= $agilityDiff){
    if(500 <= $agilityDiff){
      if($bonusRot <= 40){
        $result = 4;
      }
    }
    else if(300 <= $agilityDiff){
      if($bonusRot <= 30){
        $result = 3;
      }
    }
    else if(250 <= $agilityDiff){
      if($bonusRot <= 30){
        $result = 3;
      }
    }
    else if(200 <= $agilityDiff){
      if($bonusRot <= 15){
        $result = 2;
      }
    }
    else if(150 <= $agilityDiff){
      if($bonusRot <= 10){
        $result = 2;
      }
    }
    else if(120 <= $agilityDiff){
      if($bonusRot <= 5){
        $result = 2;
      }
    }
    else if(100 <= $agilityDiff){
      if($bonusRot <= 1){
        $result = 2;
      }
    }
    else if(25 <= $agilityDiff){
      if($bonusRot <= 5){
        $result = 2;
      }
    }
  }
  return $result;
}

function agilityFirstAttackCheck($conn,$playerAgilityBonus,$enemyAgilityBonus){ //先制攻撃の判定 1:自分、2:敵
  $result = 1;
  if($playerAgilityBonus == $enemyAgilityBonus){
    $rotFirstAttack = rand(1,2); //同時の場合は半々にする。
    if($rotFirstAttack == 2){
      $result = 2;
    }
    else{
      $result = 1;
    }
  }
  else{
    if($playerAgilityBonus < $enemyAgilityBonus){ //エネミーの方が有利だった場合
      $bonusDiff = ($enemyAgilityBonus - $playerAgilityBonus);
      $rotFirstAttack = rand($bonusDiff,4);
      if($rotFirstAttack == 4){
        $result = 2;
      }
      else{
        $rotFirstAttack = rand(1,2); //同時の場合は半々にする。
        if($rotFirstAttack == 2){
          $result = 2;
        }
        else{
          $result = 1;
        }
      }
    }
    else{ //自分が有利だった場合
      $bonusDiff = ($playerAgilityBonus - $enemyAgilityBonus);
      $rotFirstAttack = rand($bonusDiff,4);
      if($rotFirstAttack == 4){
        $result = 1;
      }
      else{
        $rotFirstAttack = rand(1,2); //同時の場合は半々にする。
        if($rotFirstAttack == 2){
          $result = 2;
        }
        else{
          $result = 1;
        }
      }
    }
  }
  return $result;
}

function getSkillRankSkillDatas($conn,$skillMasterDatas,$skillRank){
  $resultSkillMasterArray = array();
  foreach ($skillMasterDatas as $skillMasterData) {
    if($skillRank == $skillMasterData['skill_rank']){
      array_push($resultSkillMasterArray,$skillMasterData);
    }
  }
  return $resultSkillMasterArray;
}

function cardCheck($pdo,$cardMasterId,$playerIndexId){//ロールが装備中か true:装備中,false:解除中
  $result = false;
  $equipStatus = 1;
  $sql = "SELECT * FROM player_card WHERE player_index_id=? AND card_master_id=? AND equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$cardMasterId,$equipStatus));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if($result != false){
    $result = true;
  }
  return $result;
}

function getEnemyData($conn,$enemyMasterId){
  $sql = "SELECT * FROM enemy_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerBattleInstance($conn,$playerIndexId,$playerIds,$playerParty,$enemyIds,$enemyParty,$battleEventId,$appDefine,$redis,$battleResultSetting){ //プレイヤーの戦闘イベントのインスタンスを生成する。
  $result = array();
  $result['insert_id'] = -1;
  $result['battle_instance_id'] = -1;
  $result['battle_instance'] = null;
  $result['error'] = 0;
  $result['error_comment'] = "";
  // //インスタンス生成前にパーミッション作成
  // $permisiion = array();
  // //ゲーム進行操作資格
  // $permisiion['game_controle'] = array();
  // $permisiion['game_controle']['player_index_ids'] = $playerIndexId; //他に居ればカンマ区切りで追加
  // //報酬獲得資格
  // $permisiion['get_reward'] = array();
  // $permisiion['get_reward']['player_index_ids'] = $playerIndexId; //他に居ればカンマ区切りで追加
  // //カード使用時、経験値獲得資格
  // $permisiion['get_card_exp'] = array();
  // $permisiion['get_card_exp']['player_index_ids'] = $playerIds; //他に居ればカンマ区切りで追加
  //バトルインスタンスを生成
  $createBattleInstance = new CreateBattleInstance($conn,$battleEventId);
  if($createBattleInstance->result != false && get_class($createBattleInstance->result) == 'BattleInstance'){
    $battleInstance = $createBattleInstance->result;
    //戦闘結果設定
    $battleInstance->AddBattleResultSetting($battleResultSetting);
    $result['battle_instance_id'] = $battleInstance->instanceId;
    $result['battle_instance'] = $battleInstance;
    //自分のパーティメンバーをバトルインスタンスに挿入
    $playerBattlePartyInstance = new BattlePartyInstance($conn,0,$playerParty);
    $playerIdsArray = explode(",",$playerIds);
    for ($i=0; $i < count($playerIdsArray); $i++) {
      $host = $playerIndexId == $playerIdsArray[$i] ? true : false;
      $entryData = $battleInstance->CreateBattleEntryDataForPlayerData($playerIdsArray[$i],$playerBattlePartyInstance,$host);
      $battleInstance->AddEntryData($entryData);
      //パーミッション追加
      //報酬獲得権限、戦闘結果反映はホストだけ
      if($host == true) {
        $battleInstance->AddPermission($entryData->uniqueNo,"get_reward");
        $battleInstance->AddPermission($entryData->uniqueNo,"battle_result_setting");
      }
      //以下、仲間でも付与される権限
      $battleInstance->AddPermission($entryData->uniqueNo,"add_action");
      $battleInstance->AddPermission($entryData->uniqueNo,"get_card_exp");
    }

    //敵のパーティメンバーをバトるインスタンスに挿入
    $enemyBattlePartyInstance = new BattlePartyInstance($conn,1,$enemyParty);
    $enemyIdsArray = explode(",",$enemyIds);
    for ($i=0; $i < count($enemyIdsArray); $i++) {
      $entryData = $battleInstance->CreateBattleEntryDataForEnemyData($enemyIdsArray[$i],$enemyBattlePartyInstance,$appDefine->STATUS_IDS);
      $battleInstance->AddEntryData($entryData);
    }
    //チームメンバーチェック
    if(count($battleInstance->teamCount) < 2){
      $result['error'] = 1210;
      $result['error_comment'] = "チーム処理に失敗しました。";
      return $result;
    }
    //プライズカードをドロー
    $battleInstance->DrawPrizeCard();
    //移動範囲をアップデート
    $battleInstance->UpdateMoveAreaLevel();

    $biControle = new BattleInstanceControle();

    //生成したバトルインスタンスを保存
    $checkCreatedBi = null;
    $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
    $resultInstanceId = $resultSaveBattleInstance['battle_instance_id'];
    if($resultInstanceId != -1){
      $checkCreatedBi = $biControle->GetBattleInstance($conn,$redis,$resultInstanceId);
    }

    if($battleInstance->init == true && $checkCreatedBi != null && get_class($checkCreatedBi) == "BattleInstance"){
      try{
        $conn->beginTransaction(); //トランザクション開始
        $stmt = $conn -> prepare("INSERT INTO player_battle_instance (player_index_id, battle_instance_id)
         SELECT :player_index_id, :battle_instance_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, battle_instance_id FROM player_battle_instance
           WHERE player_index_id= :player_index_id AND battle_instance_id = :battle_instance_id)");
        $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':battle_instance_id', $battleInstance->instanceId, PDO::PARAM_INT);
        $stmt->execute();
        $result['insert_id'] = $conn->lastInsertId('id');
        $conn->commit(); //トランザクション終了
      }
      catch(Exception $e){
        $conn->rollBack();
        $result['error'] = 101;
        $result['error_comment'] = "戦闘情報の保存に失敗しました。";
      }
    }
  }
  return $result;
}

function insertBattleInstance($conn,$list){ //戦闘インスタンスを生成
  $maxPartyMember = 5; //最大パーティメンバー数
  $result = array();
  $result['battle_instance_id'] = -1;
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['battle_instance'] = null;
  $host = -1;
  $battleEventId = -1;
  $appDefine = null;
  $redis = null;
  $battleResultSetting = null;
  $teamOnePartyInstance = null;
  $teamOneEntryTypeDatas = null;
  $teamTwoPartyInstance = null;
  $teamTwoEntryTypeDatas = null;
  $permissionEntryTypeDatas = null;
  $permissionObj = new BattleInstancePermission();
  if(isset($list['host'])) $host = $list['host']; //ホストになるplayer_index_id
  if(isset($list['battle_event_id'])) $battleEventId = $list['battle_event_id']; //戦闘イベントID
  if(isset($list['app_define'])) $appDefine = $list['app_define']; //アプリ宣言
  if(isset($list['redis'])) $redis = $list['redis']; //レディース
  if(isset($list['battle_result_setting'])) $battleResultSetting = $list['battle_result_setting']; //バトルリザルトセッティング
  if(isset($list['team_one_party_instance'])) $teamOnePartyInstance = $list['team_one_party_instance']; //チーム1のパーティインスタンス
  if(isset($list['team_one_entry_type_datas'])) $teamOneEntryTypeDatas = $list['team_one_entry_type_datas']; //チーム1のエントリータイプデータ
  if(isset($list['team_two_party_instance'])) $teamTwoPartyInstance = $list['team_two_party_instance']; //チーム2のパーティインスタンス
  if(isset($list['team_two_entry_type_datas'])) $teamTwoEntryTypeDatas = $list['team_two_entry_type_datas']; //チーム2のエントリータイプデータ
  if(isset($list['permission_entry_type_datas'])) $permissionEntryTypeDatas = $list['permission_entry_type_datas']; //パーミッションエントリータイプデータ
  //listのデータチェック
  if($battleEventId == -1){$result['error'] = 1; $result['error_comment'] = "戦闘イベントデータの取得に失敗しました。"; return $result;}
  if($appDefine == null){$result['error'] = 2; $result['error_comment'] = "アプリデータの取得に失敗しました。"; return $result;}
  if($redis == null){$result['error'] = 3; $result['error_comment'] = "Redisの通信に失敗しました。"; return $result;}
  if($battleResultSetting == null){$result['error'] = 4; $result['error_comment'] = "戦闘結果設定の取得に失敗しました。"; return $result;}
  if($teamOnePartyInstance == null || get_class($teamOnePartyInstance) != 'BattlePartyInstance'){$result['error'] = 5; $result['error_comment'] = "パーティデータ1の取得に失敗しました"; return $result;}
  if($teamOneEntryTypeDatas == null){$result['error'] = 6; $result['error_comment'] = "チームデータ1の取得に失敗しました"; return $result;}
  if($teamTwoPartyInstance == null || get_class($teamTwoPartyInstance) != 'BattlePartyInstance'){$result['error'] = 7; $result['error_comment'] = "パーティデータ2の取得に失敗しました"; return $result;}
  if($teamTwoEntryTypeDatas == null){$result['error'] = 8; $result['error_comment'] = "チームデータ2の取得に失敗しました"; return $result;}
  if($permissionEntryTypeDatas == null){$result['error'] = 9; $result['error_comment'] = "パーミッションの構築に失敗しました"; return $result;}
  //戦闘インスタンスの生成
  $createBattleInstance = new CreateBattleInstance($conn,$battleEventId);
  if($createBattleInstance->result != false && get_class($createBattleInstance->result) == 'BattleInstance'){
    $battleInstance = $createBattleInstance->result;
    //戦闘結果設定
    $battleInstance->AddBattleResultSetting($battleResultSetting);
    $result['battle_instance_id'] = $battleInstance->instanceId;
    $result['battle_instance'] = $battleInstance;
    //チーム1のパーティインスタンスにメンバーを加える
    $addCount = 0;
    foreach ($teamOneEntryTypeDatas as $entryType) {
      if(get_class($entryType) != 'BattleEntryType') continue;
      if($entryType->type == 0){ //プレイヤータイプ
        $isHost = $host == $entryType->id ? true : false;
        $entryData = $battleInstance->CreateBattleEntryDataForPlayerData($entryType->id,$teamOnePartyInstance,$isHost);
        $battleInstance->AddEntryData($entryData);
        $addCount = $addCount + 1;
      }
      else if($entryType->type == 1){ //エネミー(NPC)タイプ
        $entryData = $battleInstance->CreateBattleEntryDataForEnemyData($entryType->id,$teamOnePartyInstance,$appDefine->STATUS_IDS);
        $battleInstance->AddEntryData($entryData);
        $addCount = $addCount + 1;
      }
      //パーミッション追加チェック
      for ($p=0; $p < count($permissionObj->permissionTypes); $p++) {
        $typeName = $permissionObj->permissionTypes[$p];
        if(isset($permissionEntryTypeDatas[$typeName])){
          foreach ($permissionEntryTypeDatas[$typeName] as $pEntryType) {
            if($pEntryType->type == $entryType->type && $pEntryType->id == $entryType->id){
              $battleInstance->AddPermission($entryData->uniqueNo,$typeName); //パーミッション追加
            }
          }
        }
      }
      //最大メンバー数のチェック
      if($maxPartyMember <= $addCount) break;
    }
    //チーム2のパーティインスタンスにメンバーを加える
    $addCount = 0;
    foreach ($teamTwoEntryTypeDatas as $entryType) {
      if(get_class($entryType) != 'BattleEntryType') continue;
      if($entryType->type == 0){ //プレイヤータイプ
        $isHost = $host == $entryType->id ? true : false;
        $entryData = $battleInstance->CreateBattleEntryDataForPlayerData($entryType->id,$teamTwoPartyInstance,$isHost);
        $battleInstance->AddEntryData($entryData);
        $addCount = $addCount + 1;
      }
      else if($entryType->type == 1){ //エネミー(NPC)タイプ
        $entryData = $battleInstance->CreateBattleEntryDataForEnemyData($entryType->id,$teamTwoPartyInstance,$appDefine->STATUS_IDS);
        $battleInstance->AddEntryData($entryData);
        $addCount = $addCount + 1;
      }
      //パーミッション追加チェック
      for ($p=0; $p < count($permissionObj->permissionTypes); $p++) {
        $typeName = $permissionObj->permissionTypes[$p];
        if(isset($permissionEntryTypeDatas[$typeName])){
          foreach ($permissionEntryTypeDatas[$typeName] as $pEntryType) {
            if($pEntryType->type == $entryType->type && $pEntryType->id == $entryType->id){
              $battleInstance->AddPermission($entryData->uniqueNo,$typeName); //パーミッション追加
            }
          }
        }
      }
      //最大メンバー数のチェック
      if($maxPartyMember <= $addCount) break;
    }
    //チーム数が正常かチェック
    if(count($battleInstance->teamCount) < 2) {$result['error'] = 11; $result['error_comment'] = "チームデータの処理に失敗しました。"; return $result;}
    //プライズドロー
    $battleInstance->DrawPrizeCard();
    //移動範囲をアップデート
    $battleInstance->UpdateMoveAreaLevel();
    $biControle = new BattleInstanceControle();
    //生成したバトルインスタンスをレディースに保存
    $checkCreatedBi = null;
    $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
    $resultInstanceId = $resultSaveBattleInstance['battle_instance_id'];
    if($resultInstanceId != -1){
      $checkCreatedBi = $biControle->GetBattleInstance($conn,$redis,$resultInstanceId);
    }
    else {$result['error'] = 10; $result['error_comment'] = "戦闘データの保存に失敗しました。"; return $result;}
  }
  return $result;
}

function getBattleResult($conn,$playerIndexId,$partyPlayerDatas,$partyPlayerDecks,$playerTargetDatas,$partyEnemyDatas,$defineStatusDataArray,$battleInstance,$playerMapInstance,$checkStoryId,$checkPlayerEventCount,$mapMasterData,$playerPartyData) //戦闘結果を取得する
{
  $result = array();
  $result['error'] = 0; //エラーがあった場合 0以外の数値を返す。
  $result['battle_log'] = array(); //バトルログ
  $result['battle_anim_log'] = array(); //アニメーション再生に使用するバトルログ
  $result['battle_status'] = array(); //バトルの結果などを格納
  $result['map_stage_clear_flag'] = false; //クリア条件の敵を倒してステージをクリアした場合trueを返す
  $partyMemberStatus = array(); //プレイヤーメンバーのステータス
  $partyMemberAttribute = array(); //プレイヤーの属性ボーナス状態
  $partyEnemyAttribute = array(); //敵の属性ボーナス
  $enemyMemberStatus = array(); //敵パーティのステータス
  $partyMemberEquipItem = array(); //パーテイメンバーの装備品を取得
  $partyMemberCardDeckData = array(); //パーティーメンバーのカードデッキを取得
  $enemyMemberCardDeckData = array(); //敵が使用するカードデッキを取得
  $partyPlayerDeckStatus = array(); //パーティメンバーのカードデッキの状態を格納
  $partyEnemyDeckStatus = array(); //敵パーティメンバーのカードデッキ状態を格納
  $defaultCardData = getCardMasterData($conn,1); //デフォルトのカードデータを取得
  $checkBattleResult = 0; //戦闘に勝利したかどうか
  //パーティの隊形データを取得
  $partyFormationMasterData = getPlayerPartyFormationData($conn,$playerPartyData['leader_player_index_id']);
  foreach ($partyPlayerDatas as &$ptPlayerInfo) {
    //パーティメンバーの装備情報を取得
    $ptPlayerEquipItem = playerEquipItemDisp($conn,$ptPlayerInfo['player_index_id']);
    $ptPlayerEquipItem['player_index_id'] = $ptPlayerInfo['player_index_id'];
    if(is_array($ptPlayerEquipItem)){
      $ptPlayerEquipItem['player_index_id'] = $ptPlayerInfo['player_index_id'];
      array_push($partyMemberEquipItem,$ptPlayerEquipItem);
    }
    //パーティメンバーのステータスを取得
    $ptTmpPlayerStatus = getPlayerStatus($conn,$ptPlayerInfo['player_index_id'],true);
    $ptPlayerStatus = equipStatusUpdate($conn,$ptTmpPlayerStatus,$ptPlayerInfo['player_index_id']);
    $ptVitalityPenalty = getVitalityPenalty($conn,$ptPlayerInfo['player_index_id'],$ptTmpPlayerStatus,$defineStatusDataArray['VIT']);
    if($ptVitalityPenalty != false){ //ステータスペナルティーが発生している
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 1; //ペナルティーあり
      }
      $ptPlayerStatus = updatePlayerStatusPenalty($conn,$ptPlayerStatus,$STATUS_ID_VITALITY);
    }
    else{
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 0; //ペナルティーなし
      }
    }
    if(is_array($ptPlayerStatus)){
      $ptPlayerStatus = replacePlayerStatus($ptPlayerStatus); //ステータスを整形
      $ptPlayerStatus['player_index_id'] = $ptPlayerInfo['player_index_id'];
      $ptPlayerStatus['player_pos_index'] = $ptPlayerInfo['player_pos_index'];
      $ptPlayerStatus['support_player_type'] = $ptPlayerInfo['support_player_type'];
      $ptPlayerStatus['now_hp'] = $ptPlayerStatus['HP']; //消費計算葉のHPパラメーターを追加
      $ptPlayerStatus['buff_status'] = array(); //バフ効果格納用配列
      $ptPlayerStatus['debuff_status'] = array(); //デバフ効果格納用配列
      $ptPlayerStatus['player_name'] = $ptPlayerInfo['player_name']; //プレイヤー名を取得
      $partyMemberStatus[$ptPlayerInfo['player_pos_index']] = $ptPlayerStatus;
    }

    //プレイヤーの属性ボーナスを取得
    $ptPlayerAttribute = getPlayerAttribute($conn,$ptPlayerInfo['player_index_id']);
    if(is_array($ptPlayerAttribute)){
      array_push($partyMemberAttribute,$ptPlayerAttribute);
    }
  }
  unset($ptPlayerInfo);
  //プレイヤーメンバーの戦闘開始状態をチェック
  foreach ($partyPlayerDatas as $ptPlayerInfo) {
    //カードが使用可能かチェック
    foreach ($partyPlayerDecks as $partyPlDeck) {
      if($partyPlDeck['player_index_id'] == $ptPlayerInfo['player_index_id']){
        $deckType = 0;
        if($playerIndexId != $partyPlDeck['player_index_id']) $deckType = 1;
        $plDeckData = getPlayerDeckDataSelectDeckNumber($conn,$partyPlDeck['player_index_id'],$partyPlDeck['player_deck_number'],$deckType);
        if(is_array($plDeckData) && isset($plDeckData['player_card_deck']) && isset($plDeckData['player_card_datas']) && isset($plDeckData['card_master_datas'])){
          $cardMasterIds = explode(",",$plDeckData['player_card_deck']['card_deck']);
          $checkPlDeck = checkPlayerCard($conn,$ptPlayerInfo,$cardMasterIds[0]);
          if($checkPlDeck == false){
            $result['error'] = 2; //使用不可能なデッキが存在した。
            return $result;
          }
          $plDeckIndex = array_push($partyMemberCardDeckData,$plDeckData); //パーティーメンバーのカードデッキデータを挿入
          $addDeckStatusParam = array();
          $addDeckStatusParam['player_index_id'] = $partyPlDeck['player_index_id'];
          $addDeckStatusParam['player_pos_index'] = $ptPlayerInfo['player_pos_index'];
          $addDeckStatusParam['support_player_type'] = $ptPlayerInfo['support_player_type'];
          $addDeckStatusParam['deck_array_index'] = $plDeckIndex; //デッキ検索用のindexを設定
          $addDeckStatusParam['deck_turn_count'] = 0; //使用ターンを指定する数値を格納
          array_push($partyPlayerDeckStatus,$addDeckStatusParam);
        }
        else{
          $result['error'] = 1; //デッキデータの取得に失敗した。
          return $result;
        }
      }
    }
  }
  //敵メンバーのステータスを取得
  foreach ($partyEnemyDatas as $ptEnemyData) {
    $ptEnemyData['enemy_pos_index'] = count($enemyMemberStatus); //敵の位置情報を格納
    $ptEnemyData['now_hp'] = $ptEnemyData['HP']; //消費計算用のHPパラメーターを追加
    $ptEnemyData['buff_status'] = array(); //バフ効果格納用配列
    $ptEnemyData['debuff_status'] = array(); //デバフ効果格納用配列
    //敵勢力により、敵のステータスを強化
    enemyStatusPowerUp($ptEnemyData,$playerMapInstance['enemy_power'],$mapMasterData);
    $enemyMemberStatus[count($enemyMemberStatus)] = $ptEnemyData;
    $enemyMemberCardDeckData[count($enemyMemberCardDeckData)] = getEnemySelectDeckData($conn,$ptEnemyData['enemy_index_id']); //敵が選択したデッキデータを取得
    $enemyDeckIndex = count($enemyMemberCardDeckData);
    $addDeckStatusParam = array();
    $addDeckStatusParam['enemy_index_id'] = $ptEnemyData['enemy_index_id'];
    $addDeckStatusParam['enemy_pos_index'] = $ptEnemyData['enemy_pos_index'];
    $addDeckStatusParam['deck_array_index'] = $enemyDeckIndex; //デッキ検索用のindexを設定
    $addDeckStatusParam['deck_turn_count'] = 0; //使用ターンを指定する数値を格納
    array_push($partyEnemyDeckStatus,$addDeckStatusParam);

    //プレイヤーの属性ボーナスを取得
    $ptEnemyAttribute = getEnemyAttribute($conn,$ptEnemyData['enemy_index_id']);
    if(is_array($ptEnemyAttribute)){
      array_push($partyEnemyAttribute,$ptEnemyAttribute);
    }
  }
  $animParameterLog = array(); //アニメーション再生用のパラメーターログ
  //戦闘開始前のカードデッキデータを取得
  $tmpPartyMemberCardDeckData = $partyMemberCardDeckData;
  //戦闘開始前のプレイヤーステータスを取得
  $tmpPartyMemberStatus = $partyMemberStatus;
  //戦闘開始前の敵ステータスを取得
  $tmpEnemyMemberStatus = $enemyMemberStatus;
  //攻撃順番を決定する。
  $resultBattleOrder = getBattleOrder($conn,$enemyMemberStatus,$partyMemberStatus,$defineStatusDataArray['AGI']);
  $battleTurn = 0; //バトルのターン
  for($row=0; $row < 111;$row++){
    foreach ($resultBattleOrder as $nowOrder) {
      if(isset($nowOrder['player_index_id'])){ //プレイヤーの行動
        foreach ($partyPlayerDeckStatus as &$ptPlDeckStatus) {
          if($ptPlDeckStatus['player_index_id'] == $nowOrder['player_index_id']){ //デッキindexが格納されている場所を取得
            foreach ($partyMemberStatus as $ptPlayerStatus) {
              if($nowOrder['player_index_id'] == $ptPlayerStatus['player_index_id'] && $ptPlayerStatus['now_hp'] <= 0){
                break 2; //対象が死んでいた場合
              }
            }
            $playerDeck = &$partyMemberCardDeckData[$ptPlDeckStatus['deck_array_index'] - 1];
            if(is_array($playerDeck)){
              $cardMasterIds = explode(",",$playerDeck['player_card_deck']['card_deck']); //デッキに含まれるカードID配列
              $setCardMasterId = $cardMasterIds[$ptPlDeckStatus['deck_turn_count']]; //セットするカードID
              $setCardMasterData = null; //セットするカードマスターデータ
              $setPlayerCardData = null; //セットするプレイヤーカードデータ
              $plcdIndex = -1;
              foreach ($playerDeck['card_master_datas'] as $rowCardMasterData) {
                if($rowCardMasterData['id'] == $setCardMasterId){
                  $setCardMasterData = $rowCardMasterData;
                  break;
                }
              }
              for ($plcd=0; $plcd < count($playerDeck['player_card_datas']); $plcd++) {
                if($playerDeck['player_card_datas'][$plcd]['card_master_id'] == $setCardMasterId){
                  $plcdIndex = $plcd;
                  break;
                }
              }
              if($plcdIndex != -1){
                $setPlayerCardData = &$playerDeck['player_card_datas'][$plcdIndex]; //セットするプレイヤーカードデータ
              }
              else if($setCardMasterId == 1) $setPlayerCardData = createDummyPlayerCardData($nowOrder['player_index_id']); //初期カードが無い場合ダミーを挿入
              if($setCardMasterData == null || $setPlayerCardData == null){
                return $result['error'] = 7; //カードの選択に失敗した。
              }

              $numUpdate = cardUseNumUpdate($setPlayerCardData); //カード枚数を更新
              unset($setPlayerCardData);

              $exeCard = $setCardMasterData;
              if($numUpdate == false) $exeCard = $defaultCardData;
              $resultTargetEnemys = getTargetObject($conn,$ptPlDeckStatus['player_index_id'],false,$playerTargetDatas,$enemyMemberStatus,$partyMemberStatus,$exeCard,$partyFormationMasterData); //攻撃対象を取得
              $playerAttribute = array(); //プレイヤーの属性ボーナス
              foreach ($partyMemberAttribute as $ptPlAttribute) {
                if($ptPlAttribute['player_index_id'] == $ptPlDeckStatus['player_index_id']){
                  $playerAttribute = $ptPlAttribute; //プレイヤーの属性ボーナスを取得
                }
              }
              $resultSkillParam = false;
              if($numUpdate == false)  $resultSkillParam = getSkillAction($defaultCardData); //デフォルトスキルを発動
              else $resultSkillParam = getSkillAction($setCardMasterData); //スキルを発動

              if($resultSkillParam != false){
                $resultSkillType = $resultSkillParam['result_skill_type'];
                $resultUseSkill = false; //スキル使用結果
                $setSkillUseStatus = false;
                foreach ($partyMemberStatus as $ptMemberStatus) {
                  if($ptPlDeckStatus['player_index_id'] == $ptMemberStatus['player_index_id']){
                    $setSkillUseStatus = $ptMemberStatus;
                  }
                }
                $resultUseSkill = resultUseSkill($conn,$setSkillUseStatus,$partyMemberStatus,$enemyMemberStatus,
                $resultSkillParam,$resultTargetEnemys,$playerAttribute,false); //スキル使用結果を取得する

                if($resultUseSkill != false){ //スキル結果を取得できた場合
                  $updateData = updateStatusForSkillEffect($resultUseSkill,$partyMemberStatus,$enemyMemberStatus); //スキル効果により、プレイヤーのステータスを更新
                  if(count($updateData['battle_anim_log_data']) != 0) $battleTurn = $battleTurn + 1; //ターンを更新
                  foreach ($updateData['battle_log_data'] as $getBattleLog) {
                    $battleLog = battleLogInit($battleTurn,$getBattleLog); //バトルログの生成
                    array_push($result['battle_log'],$battleLog); //バトルログの挿入
                  }
                  foreach ($updateData['battle_anim_log_data'] as $getBattleAnimLog) {
                    $battleAnimLog = battleAnimLogInit($battleTurn,$getBattleAnimLog);
                    array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
                  }
                }
                else{
                  return $result['error'] = 10; //スキル結果の取得に失敗した。
                }
              }
              else{
                $result['error'] = 5; //スキルの発動に失敗した。
              }
              $ptPlDeckStatus['deck_turn_count'] = $ptPlDeckStatus['deck_turn_count'] + 1; //発動後はカード番号の進行度を上げる
              if(isset($cardMasterIds[$ptPlDeckStatus['deck_turn_count']]) == false){ //最後のカードナンバーを越した場合
                $ptPlDeckStatus['deck_turn_count'] = 0;
              }
              break; //発動完了後は必ずブレイクする。(2回発動してしまう。
            }
            else{
              $result['error'] = 3; //プレイヤーのデッキカードデータの取得に失敗した。
              return $result;
            }
          }
        }
        unset($ptPlDeckStatus);
      }
      if(isset($nowOrder['enemy_index_id'])){ //敵の行動
        foreach ($partyEnemyDeckStatus as &$enemyDeckStatus) {
          if($nowOrder['enemy_index_id'] == $enemyDeckStatus['enemy_index_id'] && $nowOrder['enemy_pos_index'] == $enemyDeckStatus['enemy_pos_index']){ //デッキindexが格納されている場所を取得
            foreach ($enemyMemberStatus as $ptEnemyStatus) {
              if($nowOrder['enemy_index_id'] == $ptEnemyStatus['enemy_index_id'] && $nowOrder['enemy_pos_index'] == $ptEnemyStatus['enemy_pos_index'] && $ptEnemyStatus['now_hp'] <= 0){
                break 2; //対象が死んでいた場合
              }
            }
            $enemyDeck = &$enemyMemberCardDeckData[$enemyDeckStatus['deck_array_index'] - 1];
            if(is_array($enemyDeck)){
              $cardMasterIds = explode(",",$enemyDeck['enemy_card_deck']['card_deck']); //デッキに含まれるカードID配列
              $setCardMasterId = $cardMasterIds[$enemyDeckStatus['deck_turn_count']]; //セットするカードID
              $setCardMasterData = null; //セットするカードマスターデータ
              foreach ($enemyDeck['card_master_datas'] as $rowCardMasterData) {
                if($rowCardMasterData['id'] == $setCardMasterId){
                  $setCardMasterData = $rowCardMasterData;
                  break;
                }
              }
              //$deckCard = &$enemyDeck[$enemyDeckStatus['deck_turn_count']]; //実行するカード
              if($setCardMasterData == null) return $result['error'] = 8; //カードの選択に失敗した。
              $resultTargetEnemys = getTargetObject($conn,false,$enemyDeckStatus['enemy_index_id'],$playerTargetDatas,$enemyMemberStatus,$partyMemberStatus,$setCardMasterData,$partyFormationMasterData); //攻撃対象を取得
              $playerAttribute = array(); //敵の属性ボーナス
              foreach ($partyEnemyAttribute as $ptEnemyAttribute) {
                if($ptEnemyAttribute['enemy_index_id'] == $enemyDeckStatus['enemy_index_id']){
                  $enemyAttribute = $ptEnemyAttribute; //敵の属性ボーナスを取得
                }
              }
              $resultSkillParam = getSkillAction($setCardMasterData); //スキルを発動
              if($resultSkillParam != false){
                $resultSkillType = $resultSkillParam['result_skill_type'];
                $resultUseSkill = false; //スキル使用結果
                $setSkillUseStatus = false;
                foreach ($enemyMemberStatus as $ptEnemyStatus) {
                  if($enemyDeckStatus['enemy_index_id'] == $ptEnemyStatus['enemy_index_id'] && $enemyDeckStatus['enemy_pos_index'] == $ptEnemyStatus['enemy_pos_index']){
                    $setSkillUseStatus = $ptEnemyStatus;
                  }
                }
                $resultUseSkill = resultUseSkill($conn,$setSkillUseStatus,$partyMemberStatus,$enemyMemberStatus,
                $resultSkillParam,$resultTargetEnemys,false,$enemyAttribute); //スキル使用結果を取得する
                if($resultUseSkill != false){ //スキル結果を取得できた場合
                  $updateData = updateStatusForSkillEffect($resultUseSkill,$partyMemberStatus,$enemyMemberStatus); //スキル効果により、プレイヤーのステータスを更新
                  if(count($updateData['battle_anim_log_data']) != 0) $battleTurn = $battleTurn + 1; //ターンを更新
                  foreach ($updateData['battle_log_data'] as $getBattleLog) {
                    $battleLog = battleLogInit($battleTurn,$getBattleLog); //バトルログの生成
                    array_push($result['battle_log'],$battleLog); //バトルログの挿入
                  }
                  foreach ($updateData['battle_anim_log_data'] as $getBattleAnimLog) {
                    $battleAnimLog = battleAnimLogInit($battleTurn,$getBattleAnimLog);
                    array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
                  }
                }
                else{
                  return $result['error'] = 9; //スキル結果の取得に失敗した。
                }
              }
              else{
                $result['error'] = 5; //スキルの発動に失敗した。
              }
              $enemyDeckStatus['deck_turn_count'] = $enemyDeckStatus['deck_turn_count'] + 1; //発動後はカード番号の進行度を上げる
              if(isset($cardMasterIds[$enemyDeckStatus['deck_turn_count']]) == false){
                $enemyDeckStatus['deck_turn_count'] = 0;
              }

              break; //発動完了後は必ずブレイクする。(2回発動してしまう。
            }
            else {
              return $result['error'] = 4; //敵のデッキカードデータの取得に失敗した。
            }
          }
        }
        unset($enemyDeckStatus);
      }
      //ターン終了のため、パーティのHPチェック
      $checkPartyHitPoint =  checkPartyHitPoint($partyMemberStatus,$enemyMemberStatus);
      if($checkPartyHitPoint != 0){ //勝負が決まった場合
        $battleLogFinish = array();
        $battleAnimLogFinish = array();
        if($checkPartyHitPoint == 1){ //自分の勝ち
          $battleLogFinish['battle_finish_comment'] =  "戦いに勝利した！";//バトルログの生成
          $battleAnimLogFinish['battle_finish_result'] = "1";
          array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
          array_push($result['battle_anim_log'],$battleAnimLogFinish); //バトルアニメログの挿入
        }
        else if($checkPartyHitPoint == 2){ //敵の勝ち
          $battleLogFinish['battle_finish_comment'] =  "戦いに負けた";//バトルログの生成
          $battleAnimLogFinish['battle_finish_result'] = "2";
          array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
          array_push($result['battle_anim_log'],$battleAnimLogFinish); //バトルアニメログの挿入
        }
        $checkBattleResult = $checkPartyHitPoint; //戦闘結果を保存
        // else if($checkPartyHitPoint == 3){ //ドロー
        //   $battleLogFinish['battle_finish_comment'] =  "引き分け";//バトルログの生成
        //   array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
        // }
        break 2; //戦闘状態から抜け出す
      }
      else{ //戦闘継続

      }
    }
    //戦闘から長時間経過したため、サドンデス状態に突入
    if(100 <= $row){
      foreach ($partyMemberStatus as &$ptPlayerStatus) {
        if(0 < $ptPlayerStatus['now_hp']){ //生存している場合
          $ptPlayerStatus['now_hp'] = 1;
          $ptPlayerStatus['HP'] = 1;
          $ptPlayerStatus['DEF'] = 1;
          $ptPlayerStatus['M_DEF'] = 1;
          $ptPlayerStatus['buff_status'] = array(); //バフ、デバフを全て削除
        }
      }
      unset($ptPlayerStatus);
    }
    if(110 <= $row){ //強制死亡状態
      foreach ($partyMemberStatus as &$ptPlayerStatus) {
        if(0 < $ptPlayerStatus['now_hp']){ //生存している場合
          $ptPlayerStatus['now_hp'] = 0;
          $ptPlayerStatus['HP'] = 1;
          $ptPlayerStatus['DEF'] = 1;
          $ptPlayerStatus['M_DEF'] = 1;
          $ptPlayerStatus['buff_status'] = array(); //バフ、デバフを全て削除
        }
      }
      unset($ptPlayerStatus);
    }
    //フェーズ終了時にバフのチェックを行う
    foreach ($partyMemberStatus as &$ptPlayerStatus) {
      $checkDeleteFlag = false;
      foreach ($ptPlayerStatus['buff_status'] as &$plBuffStatus) {
        $resultBuffStatus = updateTurnEndBuffStatus($plBuffStatus,$ptPlayerStatus); //ターン終了のため、バフのステータスを更新
        if($resultBuffStatus['battle_log_data'] != false){
          $battleLog = battleLogInit($battleTurn,$resultBuffStatus['battle_log_data']); //バトルログの生成
          array_push($result['battle_log'],$battleLog); //バトルログの挿入
        }
        if($resultBuffStatus['battle_anim_log_data'] != false){
          $battleAnimLog = battleAnimLogInit($battleTurn,$resultBuffStatus['battle_anim_log_data']); //バトルアニメログの生成
          array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
        }
        if($resultBuffStatus['buff_delete_flag'] == true){
          $checkDeleteFlag = true;
        }
      }
      unset($plBuffStatus);
      foreach ($ptPlayerStatus['buff_status'] as $key => $buffValues) {
        foreach ($buffValues as $key2 => $value2) {
          if($key2 == "active_turn" && $value2 <= 0) unset($ptPlayerStatus['buff_status'][$key]);
        }
      }
      if($checkDeleteFlag == true){ //バフの削除があった場合
        $ptPlayerStatus['buff_status'] = array_values($ptPlayerStatus['buff_status']);
      }
    }
    unset($ptPlayerStatus);
    foreach ($enemyMemberStatus as &$ptEnemyStatus) {
      $checkDeleteFlag = false;
      foreach ($ptEnemyStatus['buff_status'] as &$enemyBuffStatus) {
        $resultBuffStatus = updateTurnEndBuffStatus($enemyBuffStatus,$ptEnemyStatus); //ターン終了のため、バフのステータスを更新
        if($resultBuffStatus['battle_log_data'] != false){
          $battleLog = battleLogInit($battleTurn,$resultBuffStatus['battle_log_data']); //バトルログの生成
          array_push($result['battle_log'],$battleLog); //バトルログの挿入
        }
        if($resultBuffStatus['battle_anim_log_data'] != false){
          $battleAnimLog = battleAnimLogInit($battleTurn,$resultBuffStatus['battle_anim_log_data']); //バトルアニメログの生成
          array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
        }
        if($resultBuffStatus['buff_delete_flag'] == true){
          $checkDeleteFlag = true;
        }
      }
      unset($enemyBuffStatus);
      foreach ($ptEnemyStatus['buff_status'] as $key => $buffValues) {
        foreach ($buffValues as $key2 => $value2) {
          if($key2 == "active_turn" && $value2 <= 0) unset($ptEnemyStatus['buff_status'][$key]);
        }
      }
      if($checkDeleteFlag == true){ //バフの削除があった場合
        $ptEnemyStatus['buff_status'] = array_values($ptEnemyStatus['buff_status']);
      }
    }
    unset($ptEnemyStatus);
  }
  //結果出力前の最終処理
  if($result['error'] == 0){
    //使用したカードの更新処理
    $updatePlayerCardNumResult = updatePartyPlayersCardNum($conn,$partyPlayerDeckStatus,$partyMemberCardDeckData); //使用したカードの枚数を更新
    if($updatePlayerCardNumResult != 0) $result['error'] = 6; //カードの更新処理に失敗した。
    //戦闘に勝利した場合
    if($checkBattleResult == 1){
      //クエスト更新処理
      $playerQuestData = getPlayerQuestDataAndMasterData($conn,$playerIndexId,0);
      if(count($playerQuestData) != 0){
        foreach ($playerQuestData as $plQuestData) {
          switch ((int)$plQuestData['quest_type']) {
            case 0: //討伐クエスト
            {
              $killedEnemyIdsArray = array();
              foreach ($enemyMemberStatus as $ptEnemyStatus) {
                $killedEnemyIdsArray[count($killedEnemyIdsArray)] = $ptEnemyStatus['enemy_index_id'];
              }
              $killedEnemyList = implode(",",$killedEnemyIdsArray); //更新する倒した敵ID(カンマ区切り)
              updatePlayerSubDueQuest($conn,$playerIndexId,$plQuestData,$killedEnemyList);
            }
            break;
            case 1: //???
            {

            }
            break;
            default:
            {

            }
            break;
          }
        }
      }
      //報酬獲得処理
      $partyDropData = array();
      foreach ($partyMemberStatus as $plStatus) {
        //衛兵と仲間は除外
        if($plStatus['support_player_type'] == 1 || $plStatus['support_player_type'] == 2) continue;
        $addPlayerDropData = array();
        $addPlayerDropData['player_index_id'] = $plStatus['player_index_id'];
        $addPlayerDropData['result_drop_data'] = array();
        $getPlayerInfo = getPlayerInfoForIndexId($conn,$plStatus['player_index_id'],true); //ドロップ獲得処理のため、パーティメンバーのプレイヤー情報を取得
        foreach ($enemyMemberStatus as $enemyData) {
          if($enemyData['drop_master_id'] != 0){ //ドロップ情報が存在した場合
            $resultDropItem = getDropItems($conn,$enemyData['drop_master_id'],$getPlayerInfo,$playerMapInstance['enemy_power']); //ドロップを取得
            $addPlayerDropData['result_drop_data'] = $resultDropItem;
            array_push($partyDropData,$addPlayerDropData);
          }
        }
      }
      //ドロップデータをログに挿入
      $resultPartyDropData = array();
      $resultPartyDropData['party_drop_data'] = $partyDropData;
      array_push($result['battle_log'],$resultPartyDropData);
      array_push($result['battle_anim_log'],$resultPartyDropData);
      //敵キャラがマップに居た場合はマップから非表示に設定する
      if($battleInstance['map_id'] != 0 && $battleInstance['map_chara_array_index'] != 0){
        if($mapMasterData != false){
          switch ((int)$mapMasterData['map_type']) { //マップタイプにより、更新処理を分岐
            case 0: //通常
            {
              //ここの処理を基本にbattleResultSettingに転移
              insertPlayerMapEnemyStatus($conn,$battleInstance['map_chara_array_index'],$playerIndexId,$battleInstance['map_id'],0);
              updateBattleInstanceBattleStep($conn,$battleInstance['id'],2); //バトルインスタンスのバトルステップを更新
              if($battleInstance['enemy_power'] != 0){ //勢力値がある場合
                $mapInstanceResult = updateBattleEndPlayerMapInstance($conn,$playerIndexId,$battleInstance['map_id'],$battleInstance['enemy_power'],$enemyMemberStatus,$mapMasterData); //マップインスタンスを更新
                if($mapInstanceResult['clear_flag'] == true){
                  $result['map_stage_clear_flag'] = true; //ステージクリアにする
                  //最終イベントかを取得
                  if($checkStoryId != -1 && $checkPlayerEventCount != -1){
                    //checkStoryId ... クライアントが持っていて、クライアントから渡ってきたデータ ↓のmapClear関数で現在のプレイヤーのplayer_event_countを見て、正しいデータかチェックしている
                    //checkPlayerEventCount ... クライアントが持っていて、クライアントから渡ってきたデータ ↓のmapClear関数で現在のプレイヤーのplayer_event_countを見て、正しいデータかチェックしている
                    //$result['main_story_clear_flag'] = mapClear($conn,$playerIndexId,$battleInstance['map_id']); //マップイベントクリア処理
                  }
                }
              }
            }
            break;
            case 1: //ワールドエリアマップ
            {
              updateBattleInstanceBattleStep($conn,$battleInstance['id'],-1); //バトルインスタンスのバトルステップを削除
              if($battleInstance['enemy_power'] != 0){ //勢力値がある場合
                $mapInstanceResult = updateAreaInstance($conn,$playerIndexId,$battleInstance['map_id'],$battleInstance['enemy_power'],$enemyMemberStatus,$mapMasterData); //マップインスタンスを更新
              }
            }
            break;
            default:
            {

            }
            break;
          }
        }
      }
    }
  }
  return $result;
}

function updatePartyPlayersCardNum($conn,$partyPlayerDeckStatus,$partyMemberCardDeckData){ //使用したカードの枚数を更新
  $result = 0;
  //カード消費チェック
  foreach ($partyPlayerDeckStatus as $plDeckStatus) {
    //仲間か衛兵の場合は除外
    if($plDeckStatus['support_player_type'] == 1 || $plDeckStatus['support_player_type'] == 2) continue;
    $getPlayerCard = false;
    if(isset($plDeckStatus['player_index_id'])) $getPlayerCard = getPlayerCard($conn,$plDeckStatus['player_index_id']);
    if(isset($plDeckStatus['enemy_index_id'])) $getPlayerCard = getPlayerCard($conn,$plDeckStatus['enemy_index_id']);
    $selectPlDeck = $partyMemberCardDeckData[$plDeckStatus['deck_array_index'] - 1];
    if(is_array($selectPlDeck)){
      foreach ($selectPlDeck['player_card_datas'] as $cardData) {
        if(isset($cardData['num_befor'])){
          $useNum = $cardData['num_befor'] - $cardData['num']; //カード使用数
          $check = false;
          if($cardData['card_master_id'] == 1) $check = true;//デフォルトカード
          foreach ($getPlayerCard as $plCard) {
            if($plCard['card_master_id'] == $cardData['card_master_id']){
              if($plCard['num'] < $useNum) $result = 2; //使用数が不足していた。
              else $check = true;
            }
          }
          if($check == false){
            $result = 3;
          } //存在しないカード(所持していない)を消費しようとした
        }
      }
    }
    else{
      $result = 1; //デッキの構造が不正だった。
    }
  }
  if($result == 0){ //チェックが正常だった場合
    foreach ($partyPlayerDeckStatus as $plDeckStatus) {
      //仲間か衛兵の場合は除外
      if($plDeckStatus['support_player_type'] == 1 || $plDeckStatus['support_player_type'] == 2) continue;
      $selectPlDeck = $partyMemberCardDeckData[$plDeckStatus['deck_array_index'] - 1];
      foreach ($selectPlDeck['player_card_datas'] as $cardData) {
        if(isset($cardData['num_befor'])){
          $useNum = $cardData['num_befor'] - $cardData['num']; //カード使用数
          if($cardData['card_master_id'] != 1){
            if(isset($plDeckStatus['player_index_id'])) updatePlayerCardNum($conn,$plDeckStatus['player_index_id'],$cardData['card_master_id'],$useNum); //カード枚数を更新
            if(isset($plDeckStatus['enemy_index_id'])) updatePlayerCardNum($conn,$plDeckStatus['enemy_index_id'],$cardData['card_master_id'],$useNum); //カード枚数を更新
          }
        }
      }
    }
  }
  return $result;
}
function battleLogInit($battleTurn,$battleLogParam){ //バトルログを生成
  $result = array();
  $result['battle_turn'] = $battleTurn; //戦闘ターン
  $result['skill_use_name'] = "";
  $result['skill_target_name'] = "";
  $result['skill_name'] = "";
  $result['skill_comment_1'] = ""; // は、に
  $result['skill_comment_2'] = ""; //○○のダメージを受けた!、○○の効果!
  $result['dead_comment'] = "";
  $result['result_comment'] = "";
  $result['battle_finish_comment'] = "";
  $result['parry_comment'] = "";
  $result['agi_miss_comment'] = "";
  $result['miss_comment'] = "";
  if(isset($battleLogParam['skill_use_name'])) $result['skill_use_name'] = $battleLogParam['skill_use_name']; //スキル使用者の名前
  if(isset($battleLogParam['skill_target_name'])) $result['skill_target_name'] = $battleLogParam['skill_target_name']; //スキル受ける側の名前
  if(isset($battleLogParam['skill_name'])) $result['skill_name'] = $battleLogParam['skill_name']; //スキルの名前
  if(isset($battleLogParam['skill_comment_1'])) $result['skill_comment_1'] = $battleLogParam['skill_comment_1']; //スキルのコメント1
  if(isset($battleLogParam['skill_comment_2'])) $result['skill_comment_2'] = $battleLogParam['skill_comment_2']; //スキルのコメント2
  if(isset($battleLogParam['dead_comment'])) $result['dead_comment'] = $battleLogParam['dead_comment']; //死亡時のコメント
  if(isset($battleLogParam['parry_comment'])) $result['parry_comment'] = "\n".$result['skill_target_name'].$battleLogParam['parry_comment']."\n"; //パリィ発動のコメント
  if(isset($battleLogParam['agi_miss_comment'])) $result['agi_miss_comment'] = "\n".$result['skill_target_name'].$battleLogParam['agi_miss_comment']; //回避時のコメント
  if(isset($battleLogParam['miss_comment'])) $result['miss_comment'] = "\n".$result['skill_use_name'].$battleLogParam['miss_comment']; //攻撃無効時のコメント
  if($result['agi_miss_comment'] == "" && $result['miss_comment'] == "" && $result['skill_use_name'] != ""){ //攻撃命中
    $result['result_comment'] = $result['skill_use_name']."の".$result['skill_name']."!\n".$result['parry_comment'].$result['skill_target_name'].$result['skill_comment_1'].$result['skill_comment_2'];
  }
  else if($result['agi_miss_comment'] != ""){ //回避
    $result['result_comment'] = $result['skill_use_name']."の".$result['skill_name']."!".$result['agi_miss_comment'];
  }
  else if($result['miss_comment'] != ""){ //攻撃無効
    $result['result_comment'] = $result['skill_use_name']."の".$result['skill_name']."!".$result['miss_comment'];
  }
  //スキル使用者の名前が無かった。
  else if($result['skill_use_name'] == ""){
    $result['result_comment'] = $result['skill_target_name'].$result['skill_comment_1'].$result['skill_comment_2'];
  }
  if($result['dead_comment'] != "") $result['result_comment'] = $result['result_comment']."\n".$result['dead_comment'];
  $result['turn'] = $battleTurn; //使用したターン
  return $result;
}

function battleAnimLogInit($battleTurn,$battleAnimLogParam){ //アニメーション再生用のログを初期化
  $result = array();
  $result['battle_turn'] = $battleTurn; //戦闘ターン
  $result['use_player_pos'] = "-1"; //スキルを発動する場所
  $result['target_player_pos'] = "-1"; //スキルを放つ場所
  $result['use_enemy_pos'] = "-1"; //スキルを発動する場所
  $result['target_enemy_pos'] = "-1"; //スキルを放つ場所
  $result['skill_power_point'] = "0"; //スキル威力のポイント
  $result['max_hp'] = "-1"; //最大HP
  $result['now_hp_befor'] = "-1"; //スキル使用前のHP
  $result['now_hp_after'] = "-1"; //スキル使用後のHP
  $result['skill_anim_type'] = ""; //スキルアニメーションのタイプ
  $result['skill_type'] = "-1"; //スキルのタイプ //攻撃系 バフ系
  $result['dead_anim'] = "0"; //死亡時のアニメ判定用 0:死んでいない 1:死んでいた
  $result['miss'] = "0"; //攻撃のミス
  $result['agi_miss'] = "0"; //回避
  $result['parry'] = "0"; //パリィ
  $result['combo'] = "0"; //コンボ回数
  $result['is_turn_end_skill'] = "0"; //ターン終了後に実行されるスキルか 0:いいえ 1:はい
  $result['card_asset_id'] = -1; //カードのアセットID
  $result['card_rank'] = -1; //カードのランク
  $result['card_master_id'] = -1; //カードのID
  if(isset($battleAnimLogParam['use_player_pos'])) $result['use_player_pos'] = $battleAnimLogParam['use_player_pos'];
  if(isset($battleAnimLogParam['target_player_pos'])) $result['target_player_pos'] = $battleAnimLogParam['target_player_pos'];
  if(isset($battleAnimLogParam['use_enemy_pos'])) $result['use_enemy_pos'] = $battleAnimLogParam['use_enemy_pos'];
  if(isset($battleAnimLogParam['target_enemy_pos'])) $result['target_enemy_pos'] = $battleAnimLogParam['target_enemy_pos'];
  if(isset($battleAnimLogParam['skill_power_point'])) $result['skill_power_point'] = $battleAnimLogParam['skill_power_point'];
  if(isset($battleAnimLogParam['max_hp'])) $result['max_hp'] = $battleAnimLogParam['max_hp'];
  if(isset($battleAnimLogParam['now_hp_befor'])) $result['now_hp_befor'] = $battleAnimLogParam['now_hp_befor'];
  if(isset($battleAnimLogParam['now_hp_after'])) $result['now_hp_after'] = $battleAnimLogParam['now_hp_after'];
  if(isset($battleAnimLogParam['skill_anim_type'])) $result['skill_anim_type'] = $battleAnimLogParam['skill_anim_type'];
  if(isset($battleAnimLogParam['skill_type'])) $result['skill_type'] = $battleAnimLogParam['skill_type'];
  if(isset($battleAnimLogParam['dead_anim'])) $result['dead_anim'] = $battleAnimLogParam['dead_anim'];
  if(isset($battleAnimLogParam['miss'])) $result['miss'] = $battleAnimLogParam['miss'];
  if(isset($battleAnimLogParam['agi_miss'])) $result['agi_miss'] = $battleAnimLogParam['agi_miss'];
  if(isset($battleAnimLogParam['parry'])) $result['parry'] = $battleAnimLogParam['parry'];
  if(isset($battleAnimLogParam['combo'])) $result['combo'] = $battleAnimLogParam['combo'];
  if(isset($battleAnimLogParam['is_turn_end_skill'])) $result['is_turn_end_skill'] = $battleAnimLogParam['is_turn_end_skill'];
  if(isset($battleAnimLogParam['card_asset_id'])) $result['card_asset_id'] = $battleAnimLogParam['card_asset_id'];
  if(isset($battleAnimLogParam['card_master_id'])) $result['card_master_id'] = $battleAnimLogParam['card_master_id'];
  if(isset($battleAnimLogParam['card_rank'])) $result['card_rank'] = $battleAnimLogParam['card_rank'];
  if((int)$result['now_hp_befor'] < 0) $result['now_hp_befor'] = "0";
  if((int)$result['now_hp_after'] < 0) $result['now_hp_after'] = "0";
  return $result;
}

function checkPartyHitPoint($partyMemberStatus,$enemyMemberStatus){ //どちらかが、全滅したかのチェック 0:戦闘継続 1:自分が勝ち 2:敵が勝ち 3:ドロー
  $result = 0;
  $partyMemberLive = false;
  $enemyMemberLive = false;
  foreach ($partyMemberStatus as $ptPlayerStatus) {
    if(1 <= $ptPlayerStatus['now_hp']){
      $partyMemberLive = true; //生きているメンバーが1でも居た
      break;
    }
  }
  foreach ($enemyMemberStatus as $ptEnemyStatus) {
    if( 1 <= $ptEnemyStatus['now_hp']){
      $enemyMemberLive = true; //生きているメンバーが1でも居た
      break;
    }
  }
  if($partyMemberLive == false && $enemyMemberLive == true) $result = 2; //敵の勝ち
  else if($partyMemberLive == true && $enemyMemberLive == false) $result = 1; //自分の勝ち
  else if($partyMemberLive == false && $enemyMemberLive == false) $result = 2; //引き分け(全滅したため敵の勝ち)
  else $result = 0; //戦闘継続
  return $result;
}

function updateStatusForSkillEffect($resultUpdateParam,&$partyMemberStatus,&$enemyMemberStatus){
  $result = array();
  $result['battle_log_data'] = array();
  $result['battle_anim_log_data'] = array();
  $result['skill_update_error'] = 0; //0:正常
  if(isset($resultUpdateParam['result_skill_effect']) && isset($resultUpdateParam['card_name']) && isset($resultUpdateParam['skill_type'])){
    $skillType = (int)$resultUpdateParam['skill_type'];
    foreach ($resultUpdateParam['result_skill_effect'] as $updateParam) { //スキル効果分回す
      $addBattleLogData = array();
      $addBattleLogData['skill_name'] = $resultUpdateParam['card_name']; //スキル名を挿入
      $addBattleAnimLogData = array();
      $addBattleAnimLogData['skill_anim_type'] = $resultUpdateParam['skill_anim_type'];
      $addBattleAnimLogData['skill_type'] = $skillType;
      $addBattleAnimLogData['card_asset_id'] = $resultUpdateParam['card_asset_id'];
      $addBattleAnimLogData['card_master_id'] = $resultUpdateParam['card_master_id'];
      $addBattleAnimLogData['card_rank'] = $resultUpdateParam['card_rank'];
      switch ($skillType) {
        case 0: //攻撃スキル
        {
          $targetStatus = false; //ターゲット(スキルを受ける)対象のステータス
          $skillUseStatus = false; //スキル使用者のステータス
          if(isset($updateParam['target_status']) && isset($updateParam['skill_use_status'])){
            $targetStatus = $updateParam['target_status'];
            $skillUseStatus = $updateParam['skill_use_status'];
            if(isset($skillUseStatus['player_index_id'])){
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_player_pos'] = $skillUseStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_use_name'] = $skillUseStatus['enemy_name'];
              $addBattleAnimLogData['use_enemy_pos'] = $skillUseStatus['enemy_pos_index'];
            }
            if(isset($targetStatus['player_index_id'])){
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_player_pos'] = $targetStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_target_name'] = $targetStatus['enemy_name'];
              $addBattleAnimLogData['target_enemy_pos'] = $targetStatus['enemy_pos_index'];
            }
          }
          if($targetStatus != false && $skillUseStatus != false){
            if(isset($targetStatus['player_index_id'])) $selectPartyMemberStatus = &$partyMemberStatus;
            else $selectPartyMemberStatus = &$enemyMemberStatus;
            foreach ($selectPartyMemberStatus as &$tgStatus) {
              //対象の敵を指定。
              $matching = false;
              if(isset($targetStatus['player_index_id'])){
                if($tgStatus['player_index_id'] == $targetStatus['player_index_id']){
                  $matching = true;
                }
              }
              else{
                if($tgStatus['enemy_index_id'] == $targetStatus['enemy_index_id'] && $tgStatus['enemy_pos_index'] == $targetStatus['enemy_pos_index'])
                {
                  $matching = true;
                }
              }
              if($matching == true){
                if(isset($updateParam['agi_miss']) && $updateParam['agi_miss'] != 0){ //攻撃をミスした場合
                  $addBattleLogData['agi_miss_comment'] = "は攻撃を回避した！";
                  $addBattleAnimLogData['agi_miss'] = "1";
                }
                else if(isset($updateParam['miss']) && $updateParam['miss'] != 0){ //攻撃が効かなかった場合
                  $addBattleLogData['miss_comment'] = "の攻撃は弾かれた！";
                  $addBattleAnimLogData['miss'] = "1";
                }
                else if(isset($updateParam['damage']) && $updateParam['damage'] != 0){ //ダメージが含まれていた
                  if(isset($updateParam['parry']) && $updateParam['parry'] == 1){ //パリィをした。
                    $addBattleLogData['parry_comment'] = "にパリィの効果";
                    $addBattleAnimLogData['parry'] = "1";
                  }
                  if(isset($updateParam['combo'])){ //コンボの数値を更新
                    $addBattleAnimLogData['combo'] = $updateParam['combo'];
                  }
                  $addBattleAnimLogData['max_hp'] = $tgStatus['HP'];
                  $addBattleLogData['skill_comment_1'] = "は";
                  $addBattleLogData['skill_comment_2'] = $updateParam['damage']."のダメージを受けた!";
                  $addBattleAnimLogData['skill_power_point'] = $updateParam['damage'];
                  $addBattleAnimLogData['now_hp_befor'] = $tgStatus['now_hp'];
                  $tgStatus['now_hp'] = $tgStatus['now_hp'] - $updateParam['damage'];
                  $addBattleAnimLogData['now_hp_after'] = $tgStatus['now_hp'];
                  if($tgStatus['now_hp'] <= 0){
                    if(isset($addBattleLogData['skill_target_name'])){
                      $addBattleLogData['dead_comment'] = $addBattleLogData['skill_target_name']."は力尽きた";
                      $addBattleAnimLogData['dead_anim'] = "1";
                    }
                  }
                  if($tgStatus['now_hp'] < 0){
                    $tgStatus['over_kill_val'] = ($tgStatus['now_hp'] * -1); //オーバーキル用パラメーター追加
                    $tgStatus['now_hp'] = 0;
                  }
                }
              }
            }
            unset($tgStatus);
          }
          else{
            $result['skill_update_error'] = 2;
            return $result; //ターゲット、スキル使用者 のいずれかの結果取得に失敗した。
          }
        }
        break;
        case 1: //バフスキル
        {
          if(isset($updateParam['combo'])){ //バフの場合は現時点ではcomboは必ず1
            $addBattleAnimLogData['combo'] = $updateParam['combo'];
          }
          $addBattleLogData['skill_comment_1'] = "に";
          $addBattleLogData['skill_comment_2'] = "「".$addBattleLogData['skill_name']."」の効果";
          $debuffFlag = false;
          if(isset($updateParam['debuff_flag']))
          {
            if($updateParam['debuff_flag'] == 1) $debuffFlag = true; //デバフスキルだった
          }
          $targetStatus = false; //ターゲット(スキルを受ける)対象のステータス
          $skillUseStatus = false; //スキル使用者のステータス
          if(isset($updateParam['target_status']) && isset($updateParam['skill_use_status'])){
            $targetStatus = $updateParam['target_status'];
            $skillUseStatus = $updateParam['skill_use_status'];
            if(isset($skillUseStatus['player_index_id'])){
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_player_pos'] = $skillUseStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_use_name'] = $skillUseStatus['enemy_name'];
              $addBattleAnimLogData['use_enemy_pos'] = $skillUseStatus['enemy_pos_index'];
            }
            if(isset($targetStatus['player_index_id'])){
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_player_pos'] = $targetStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_target_name'] = $targetStatus['enemy_name'];
              $addBattleAnimLogData['target_enemy_pos'] = $targetStatus['enemy_pos_index'];
            }
          }
          if($targetStatus != false && $skillUseStatus != false){
            if(isset($targetStatus['player_index_id'])) $selectPartyMemberStatus = &$partyMemberStatus;
            else $selectPartyMemberStatus = &$enemyMemberStatus;
            foreach ($selectPartyMemberStatus as &$tgStatus) {
              //バフを付与する対象を取得。
              $matching = false;
              if(isset($targetStatus['player_index_id'])){
                if($tgStatus['player_index_id'] == $targetStatus['player_index_id']){
                  $matching = true;
                }
              }
              else{
                if($tgStatus['enemy_index_id'] == $targetStatus['enemy_index_id'] && $tgStatus['enemy_pos_index'] == $targetStatus['enemy_pos_index'])
                {
                  $matching = true;
                }
              }
              if($matching == true){
                if(isset($updateParam['buff_status_name']) && isset($updateParam['result_add_buff_status_point'])
                && isset($updateParam['buff_skill_group_id']) && isset($updateParam['buff_card_master_id'])){
                  $addBattleAnimLogData['skill_power_point'] = $updateParam['result_add_buff_status_point']; //スキルの威力をログに挿入
                  if($debuffFlag == false){
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_befor'] = $tgStatus[$updateParam['buff_status_name']];
                    $tgStatus[$updateParam['buff_status_name']] = $tgStatus[$updateParam['buff_status_name']] + $updateParam['result_add_buff_status_point'];
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_after'] = $tgStatus[$updateParam['buff_status_name']];
                    if($updateParam['buff_status_name'] == "HP") $addBattleAnimLogData['max_hp'] = $tgStatus[$updateParam['buff_status_name']];
                  }
                  else{ //デバフの場合
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_befor'] = $tgStatus[$updateParam['buff_status_name']];
                    $tgStatus[$updateParam['buff_status_name']] = $tgStatus[$updateParam['buff_status_name']] - $updateParam['result_add_buff_status_point'];
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_after'] = $tgStatus[$updateParam['buff_status_name']];
                    if($updateParam['buff_status_name'] == "HP") $addBattleAnimLogData['max_hp'] = $tgStatus[$updateParam['buff_status_name']];
                    //固定ステータスは1より下にしない
                    if($updateParam['buff_status_name'] != "now_hp" && $tgStatus[$updateParam['buff_status_name']] <= 0) {
                      $tgStatus[$updateParam['buff_status_name']] = 1;
                    }
                  }
                  if($updateParam['buff_status_name'] == "now_hp"){ //変動HPが更新された場合
                    $addBattleAnimLogData['max_hp'] = $tgStatus['HP'];
                    //最大HPを超えていた場合
                    if($tgStatus['HP'] < $tgStatus[$updateParam['buff_status_name']]){
                      $tgStatus[$updateParam['buff_status_name']] = $tgStatus['HP'];
                    }
                    if($tgStatus['now_hp'] <= 0){
                      if(isset($addBattleLogData['skill_target_name'])){
                        $addBattleLogData['dead_comment'] = $addBattleLogData['skill_target_name']."は力尽きた";
                        $addBattleAnimLogData['dead_anim'] = "1";
                      }
                    }
                    //オーバーキルが発生した場合
                    if($tgStatus[$updateParam['buff_status_name']] < 0){
                      $overkillVal = $tgStatus[$updateParam['buff_status_name']];
                      $tgStatus[$updateParam['buff_status_name']] = 0;
                      $tgStatus['over_kill_val'] = $overkillVal; //オーバーキルを追加
                    }
                  }
                  if($updateParam['active_turn'] == 0){ //一度だけの発動だった場合はバフ配列に追加しない

                  }
                  else{
                    if(!isset($tgStatus['over_kill_val']) && $tgStatus['now_hp'] != 0){ //対象が生きている場合
                      $addBuffStatus = array(); //バフステータス格納用配列
                      $addBuffStatus['up_status_val'] = $updateParam['result_add_buff_status_point']; //ステータス上昇量
                      $addBuffStatus['buff_skill_group_id'] = $updateParam['buff_skill_group_id']; //バフスキルグループID
                      $addBuffStatus['buff_card_master_id'] = $updateParam['buff_card_master_id']; //バフのカードID
                      $addBuffStatus['buff_status_name'] = $updateParam['buff_status_name']; //バフステータスネーム
                      $addBuffStatus['buff_status_id'] = $updateParam['buff_status_id']; //バフステータスID
                      $addBuffStatus['active_turn'] = $updateParam['active_turn']; //継続ターン
                      $addBuffStatus['debuff_flag'] = $updateParam['debuff_flag']; //デバフフラグ
                      $addBuffStatus['buff_battle_log'] = $addBattleLogData; //バトルログの格納
                      $addBuffStatus['buff_battle_anim_log'] = $addBattleAnimLogData; //バトルアニメログの格納
                      //バフステータスのチェック
                      $buffDuplicateCheck = false;
                      foreach ($tgStatus['buff_status'] as &$buffStatus) {
                        //既に発動しているバフだった
                        if($buffStatus['buff_card_master_id'] == $updateParam['buff_card_master_id'])
                        {
                          $buffStatus = $addBuffStatus; //継続ターンだけ更新
                          $buffDuplicateCheck = true;
                          break;
                        }
                        //既に存在したバフステータスグループだった。
                        if($buffStatus['buff_skill_group_id'] != 0 && $buffStatus['buff_skill_group_id'] == $updateParam['buff_skill_group_id']){
                          $buffStatus = $addBuffStatus; //効果を上書き
                          $buffDuplicateCheck = true;
                          break;
                        }
                      }
                      unset($buffStatus);
                      if($buffDuplicateCheck == false){ //追加可能なバフだった場合
                        array_push($tgStatus['buff_status'],$addBuffStatus); //バフステータス配列を追加
                      }
                    }
                  }
                }
              }
            }
            unset($tgStatus);
          }
        }
        break;
        case 2: //デバフスキル
        {

        }
        break;
        default:
        break;
      }
      array_push($result['battle_log_data'],$addBattleLogData);
      array_push($result['battle_anim_log_data'],$addBattleAnimLogData);
    }
  }
  return $result; //正常
}

function updateTurnEndBuffStatus(&$buffData,&$statusData){ //ターン終了時にバフのステータスを更新する。
  $result = array();
  $result['buff_delete_flag'] = false;
  $result['battle_log_data'] = false;
  $result['battle_anim_log_data'] = false;
  $debuffFlag = false; //デバフスキルであるか
  if($statusData['now_hp'] <= 0){ //死んでいた場合
    $result['buff_delete_flag'] = true; //バフを削除
    return $result;
  }
  if($buffData['debuff_flag'] == 1) $debuffFlag = true;
  $result['buff_delete_flag'] = false; //バフを削除したか。
  $buffData['active_turn'] = $buffData['active_turn'] - 1;
  if($buffData['active_turn'] <= 0){ //バフが終了した場合
    //ステータスを元に戻す
    if($buffData['buff_status_name'] != "now_hp"){ //変動HPは除外
      if($debuffFlag == false){
        $statusData[$buffData['buff_status_name']] = $statusData[$buffData['buff_status_name']] - $buffData['up_status_val'];
      }
      else{
        $statusData[$buffData['buff_status_name']] = $statusData[$buffData['buff_status_name']] + $buffData['up_status_val'];
      }
    }
    if($buffData['buff_status_name'] != "now_hp" && $statusData[$buffData['buff_status_name']] <= 0){ //固定ステータスは1以下にしない
      $statusData[$buffData['buff_status_name']] = 1;
    }
    if($statusData['now_hp'] <= 0){ //死亡した場合
      $result['battle_log_data']['dead_comment'] = $result['battle_log_data']['skill_target_name']."は力尽きた";
      $result['battle_anim_log_data']['dead_anim'] = "1";
      $result['buff_delete_flag'] = true;
    }
    if($statusData['now_hp'] < 0){ //オーバーキルが発生した場合
      $overkillVal = $statusData['now_hp'];
      $statusData['now_hp'] = 0;
      $statusData['over_kill_val'] = $overkillVal; //オーバーキルを追加
    }
    $result['battle_anim_log_data']['max_hp'] = $statusData['HP'];
    if($statusData['HP'] < $statusData['now_hp']){ //最大HPを超えた場合
      $statusData['now_hp'] = $statusData['HP'];
    }
    $result['battle_log_data'] = $buffData['buff_battle_log']; //バトルログを挿入
    $result['battle_log_data']['skill_use_name'] = "";
    $result['battle_log_data']['skill_comment_1'] = "の";
    $result['battle_log_data']['skill_comment_2'] = $result['battle_log_data']['skill_name']."の効果が切れた";
    $result['buff_delete_flag'] = true;
  }
  else{
    if($buffData['buff_status_name'] == "now_hp"){ //定期回復系のバフだった場合
      $result['battle_log_data'] = $buffData['buff_battle_log']; //バトルログを挿入
      $result['battle_anim_log_data'] = $buffData['buff_battle_anim_log']; //バトルアニメログを挿入
      if($debuffFlag == false){
        $result['battle_anim_log_data']['skill_power_point'] = $buffData['up_status_val'];
        $result['battle_anim_log_data']['now_hp_befor'] = $statusData[$buffData['buff_status_name']];
        $statusData[$buffData['buff_status_name']] = $statusData[$buffData['buff_status_name']] + $buffData['up_status_val'];
        $result['battle_anim_log_data']['now_hp_after'] = $statusData[$buffData['buff_status_name']];
        $result['battle_log_data']['skill_comment_1'] = "は";
        $result['battle_log_data']['skill_comment_2'] = $result['battle_log_data']['skill_name']."の効果により".$buffData['buff_status_name']."が".$buffData['up_status_val']."回復した!";
      }
      else{
        $result['battle_anim_log_data']['skill_power_point'] = $buffData['up_status_val'];
        $result['battle_anim_log_data']['now_hp_befor'] = $statusData[$buffData['buff_status_name']];
        $statusData[$buffData['buff_status_name']] = $statusData[$buffData['buff_status_name']] - $buffData['up_status_val'];
        $result['battle_anim_log_data']['now_hp_after'] = $statusData[$buffData['buff_status_name']];
        $result['battle_log_data']['skill_comment_1'] = "は";
        $result['battle_log_data']['skill_comment_2'] = $result['battle_log_data']['skill_name']."の効果により".$buffData['up_status_val']."のダメージを受けた!";
      }
      $result['battle_anim_log_data']['max_hp'] = $statusData['HP'];
      if($statusData['HP'] < $statusData[$buffData['buff_status_name']]){ //最大HPを超えた場合
        $statusData[$buffData['buff_status_name']] = $statusData['HP']; //最大HPに戻す
      }
      if($statusData['now_hp'] <= 0){ //死亡した場合
        $result['battle_log_data']['dead_comment'] = $result['battle_log_data']['skill_target_name']."は力尽きた";
        $result['battle_anim_log_data']['dead_anim'] = "1";
        $result['buff_delete_flag'] = true;
      }
      if($statusData['now_hp'] < 0){ //オーバーキルが発生した場合
        $overkillVal = $statusData['now_hp'];
        $statusData['now_hp'] = 0;
        $statusData['over_kill_val'] = $overkillVal; //オーバーキルを追加
        $result['buff_delete_flag'] = true;
      }
    }
  }
  //アニメパラメーターが正常な場合
  if($result['battle_anim_log_data'] != false) $result['battle_anim_log_data']['is_turn_end_skill'] = 1;
  return $result;
}

function cardUseNumUpdate(&$playerCardData){ //カード使用時の枚数チェック 返し値 true : 通常使用 false : 使用出来ない
  $result = false;
  if(isset($playerCardData['num']) && isset($playerCardData['card_master_id'])){
    //使用前のカード枚数が記録されていない場合
    if(!isset($playerCardData['num_befor'])) $playerCardData['num_befor'] = $playerCardData['num'];
    if($playerCardData['card_master_id'] == "1"){ //デフォルトだった場合は使用できるため true
      $playerCardData['num'] = "9999";
      return true;
    }
    if(0 < $playerCardData['num']){ //カードが1枚以上あった場合
      $playerCardData['num'] = $playerCardData['num'] - 1;
      $result = true;
    }
    else{ //カードが0枚で使用出来ない場合
      $playerCardData['num'] = 0;
    }
  }
  return $result;
}

function cardDefaultChange(&$card,$defaultCardData){ //既存のカードをデフォルトのカードに変更

  $card = array_merge($card,$defaultCardData); //デフォルトカードに変更
  $card['num'] = "9999";
}

function shuffle_assoc($list) { //連想配列をシャッフルする
    if (!is_array($list)) return $list;
    $keys = array_keys($list);
    shuffle($keys);
    $random = array();
    foreach ($keys as $key) {
        $random[$key] = $list[$key];
    }
    return $random;
}

function getBattleOrder($conn,$enemyMemberStatus,$partyMemberStatus,$agiStatusId){ //攻撃順番の結果を取得する。
  $resultBattleOrder = array();
  $tmpPlayerAgi = array();
  $tmpEnemyAgi = array();
  foreach ($partyMemberStatus as $ptMemberStatus) {
    if(isset($ptMemberStatus['player_index_id']) && isset($ptMemberStatus['AGI'])){
      $adPlayerAgi = array();
      $adPlayerAgi['player_index_id'] = $ptMemberStatus['player_index_id'];
      $adPlayerAgi['player_pos_index'] = $ptMemberStatus['player_pos_index'];
      $adPlayerAgi['AGI'] = (int)$ptMemberStatus['AGI'];
      array_push($tmpPlayerAgi,$adPlayerAgi);
    }
  }
  $tmpPlayerAgi = shuffle_assoc($tmpPlayerAgi); //配列をシャッフル ※同じAGIの数値がいた場合、ランダムにソートするため。
  foreach ($enemyMemberStatus as $ptEnemyStatus) {
    if(isset($ptEnemyStatus['enemy_index_id']) && isset($ptEnemyStatus['AGI'])){
      $adEnemyAgi = array();
      $adEnemyAgi['enemy_index_id'] = $ptEnemyStatus['enemy_index_id'];
      $adEnemyAgi['enemy_pos_index'] = $ptEnemyStatus['enemy_pos_index'];
      $adEnemyAgi['AGI'] = (int)$ptEnemyStatus['AGI'];
      array_push($tmpEnemyAgi,$adEnemyAgi);
    }
  }
  $tmpEnemyAgi = shuffle_assoc($tmpEnemyAgi); //配列をシャッフル ※同じAGIの数値がいた場合、ランダムにソートするため。
  $mergeAgiData = array();
  $mergeAgiData = array_merge($tmpPlayerAgi,$tmpEnemyAgi);
  foreach ($mergeAgiData as $key => $value) {
    $agiArrayKey1[$key] = $value['AGI'];
    $agiArrayKey2[$key] = $key;
  }
  array_multisort($agiArrayKey1, SORT_DESC, $agiArrayKey2, SORT_DESC, $mergeAgiData);
  return $mergeAgiData;
}

function resultUseSkill($conn,$skillUseStatus,$partyMemberStatus,$enemyMemberStatus,$resultSkillParam,$resultTargetEnemys,$playerAttribute,$enemyAttribute){ //スキル使用後のステータスを更新&取得 skillUse 0:player 1:enemy
  $result['card_master_id'] = $resultSkillParam['result_card_master_id']; //発動したカードID
  $result['card_name'] = $resultSkillParam['result_card_name']; //発動したカード名
  $result['skill_type'] = $resultSkillParam['result_skill_type']; //発動したスキルタイプ
  $result['skill_anim_type'] = $resultSkillParam['result_skill_anim_type']; //スキルアニメのタイプ
  $result['card_asset_id'] = $resultSkillParam['result_card_asset_id']; //カードのアセットID
  $result['card_rank'] = $resultSkillParam['result_card_rank']; //カードのランク
  $result['result_skill_effect'] = array(); //スキル効果結果を返すオブジェクト
  $targetEnemys = $resultTargetEnemys['target_is_enemy'];
  $targetPlayers = $resultTargetEnemys['target_is_player'];
  $playerStatus = false;
  $enemyStatus = false;
  $resultAtk = 0;
  $targetObj = false;

  if(count($targetEnemys) != 0){ //敵がターゲット
    foreach ($targetEnemys as $tgEnemy) {
      $resultAddSkillEffect = skillEffectCommit($skillUseStatus,$resultSkillParam,$tgEnemy,$playerAttribute,$enemyAttribute); //スキル効果を発動
      array_push($result['result_skill_effect'],$resultAddSkillEffect);
    }
  }
  if(count($targetPlayers) != 0){ //プレイヤーがターゲット
    foreach ($targetPlayers as $tgPlayer) {
      $resultAddSkillEffect = skillEffectCommit($skillUseStatus,$resultSkillParam,$tgPlayer,$playerAttribute,$enemyAttribute); //スキル効果を発動
      array_push($result['result_skill_effect'],$resultAddSkillEffect);
    }
  }
  return $result;
}

function skillEffectCommit($skillUseStatus,$resultSkillParam,$tgObject,$playerAttribute,$enemyAttribute)
{
  $resultAddParam = 0;
  if(isset($resultSkillParam['physics_or_magic'])){
    if($resultSkillParam['result_skill_type'] == 0){ //攻撃スキル
      $baseAtkPoint = 0; //基本攻撃ポイント
      $attributeAtkPoint = 0; //属性攻撃ポイント
      $skillAttribute = -1; //属性
      $resultAttributeAtkPoint = 0; //属性ボーナスで変換された属性攻撃ポイント
      $resultAtk = 0; //プレイヤーの攻撃を行う攻撃ポイント
      if(isset($resultSkillParam['base_atk_point'])){ //基本攻撃ポイント
        $baseAtkPoint = $resultSkillParam['base_atk_point'];
        if(isset($resultSkillParam['attribute_atk_point'])){ //属性攻撃ポイント
          if(isset($resultSkillParam['skill_attribute'])){ //スキルの属性
            $selectAttribute = false;
            if(isset($skillUseStatus['player_index_id'])) $selectAttribute = $playerAttribute;
            else $selectAttribute = $enemyAttribute;
            foreach ($selectAttribute as $key => $value) {
              $keyName = "attribute_".$resultSkillParam['skill_attribute'];
              if($key == $keyName){
                $resultAttributeAtkPoint = round($resultSkillParam['attribute_atk_point'] * ($value * 0.01)); //属性ボーナス含めた属性攻撃ポイント確定
              }
            }
          }
        }
      }
      if($baseAtkPoint != 0){ //攻撃する数値があった場合
        $resultAtk = $resultAtk + $baseAtkPoint;
      }
      if($resultAttributeAtkPoint != 0){ //属性ボーナスがあった場合
        $resultAtk = $resultAtk + $resultAttributeAtkPoint;
      }
      //敵の防御力によってダメージを変更する。
      if($resultAtk != 0){
        $getBaseAtk = 0;
        $getBaseDef = 0;
        if($resultSkillParam['physics_or_magic'] == 0){ //物理攻撃
          $getBaseAtk = $skillUseStatus['ATK'];
          $getBaseDef= $tgObject['DEF'];
        }
        else{
          $getBaseAtk = $skillUseStatus['M_ATK'];
          $getBaseDef= $tgObject['M_DEF'];
        }
        $mergeAtk = $getBaseAtk + $resultAtk; //スキルの攻撃とステータスの攻撃を連結
        $resultAddParam = false;
        $resultAddParam = getHitPointDamage($mergeAtk,$getBaseDef,$skillUseStatus['LUCK'],$tgObject['LUCK'],$skillUseStatus['AGI'],$tgObject['AGI'],null); //攻撃に　よって与えたダメージを出す
        if(is_array($resultAddParam)){
          $resultAddParam['skill_use_status'] = $skillUseStatus;
          $resultAddParam['target_status'] = $tgObject;
        }
      }
      else{
        return 2; //攻撃スキルの設定が不正だった。
      }
    }
    else if($resultSkillParam['result_skill_type'] == 1){ //バフスキルタイプ
      $resultBuffEffectData = false; //バフ効果の結果
      $skillAttribute = $resultSkillParam['skill_attribute']; //スキルの属性
      $buffStatusId = (int)$resultSkillParam['buff_status_id']; //バフのステータス
      $parcentBuffPoint = (int)$resultSkillParam['percent_buff_point']; //パーセントのバフ
      $baseBuffPoint = (int)$resultSkillParam['base_buff_point']; //基本バフ上昇量
      $mndLevel = (int)$resultSkillParam['mnd_level']; //MNDの適正値
      $buffSubStatusId = (int)$resultSkillParam['buff_sub_status_id']; //バフに影響するサブステータスID(now_hpなど)
      $myMndLevelPercent = (int)$resultSkillParam['my_mnd_level_percent']; //自分のMNDが加算される%
      $targetMndLevelPercent = (int)$resultSkillParam['target_mnd_level_percent']; //自分のMNDが加算される%
      $buffSkillGroupId = (int)$resultSkillParam['buff_skill_group_id']; //バフのスキルグループID
      $buffCardMasterId = (int)$resultSkillParam['buff_card_master_id']; //バフのカードID
      $activeTurn = (int)$resultSkillParam['active_turn']; //バフの継続するターン
      $debuffFlag = (int)$resultSkillParam['debuff_flag']; //デバフかの判定
      if($resultSkillParam['physics_or_magic'] == 0){ //物理タイプのバフ
      }
      else{ //魔法タイプのバフ
      }
      if(!isset($STATUS_IDS)) $STATUS_IDS = array('HP' => 1, 'ATK' => 2, 'DEF' => 3, 'M_ATK' => 4, 'M_DEF' => 5, 'AGI' => 6, 'MND' => 7, 'VIT' => 8, 'STM' =>9, 'LUCK' => 10);
      $statusKeyName = ""; //ステータスネーム
      foreach ($STATUS_IDS as $key => $value) {
        if($value == $buffStatusId){ //ステータスIDが一致した場合
          $statusKeyName = $key;
        }
      }
      if($buffSubStatusId != 0){
        //現在の変動HP変更の場合
        if($buffSubStatusId == 1) $resultAddParam = getBuffEffectPoint($buffStatusId,"now_hp",$skillUseStatus,$tgObject,$mndLevel,$parcentBuffPoint,$baseBuffPoint,$myMndLevelPercent,$targetMndLevelPercent,$debuffFlag);
      }
      else if($statusKeyName != ""){
        //バフ効果の結果を取得
        $resultAddParam = getBuffEffectPoint($buffStatusId,$statusKeyName,$skillUseStatus,$tgObject,$mndLevel,$parcentBuffPoint,$baseBuffPoint,$myMndLevelPercent,$targetMndLevelPercent,$debuffFlag);
      }
      if(is_array($resultAddParam)){
        $resultAddParam['buff_skill_group_id'] = $buffSkillGroupId;
        $resultAddParam['buff_card_master_id'] = $buffCardMasterId;
        $resultAddParam['skill_use_status'] = $skillUseStatus;
        $resultAddParam['target_status'] = $tgObject;
        $resultAddParam['active_turn'] = $activeTurn;
        $resultAddParam['debuff_flag'] = $debuffFlag;
      }
      else {
        return 3; //バフスキルの設定に不正があった。
      }
    }
  }
  else{
    return 1; //属性タイプを取得できなかった
  }
  return $resultAddParam;
}

function getBuffEffectPoint($buffStatusId,$statusKeyName,$skillUseStatus,$tgObject,$mndLevel,$parcentBuffPoint,$baseBuffPoint,$myMndLevelPercent,$targetMndLevelPercent,$debuffFlag){ //バフの効果を取得する
  $result = array();
  $getParcentBuffPoint = 0;
  $getBaseBuffPoint = 0;
  //精神力ボーナス
  $changeMyMndLevelPercent = $myMndLevelPercent * 0.01;
  $changeTargetMndLevelPercent = $targetMndLevelPercent * 0.01;
  if($debuffFlag == false){
    $mndBonus = round(($skillUseStatus['MND'] * $changeMyMndLevelPercent) + ($tgObject['MND'] * $changeTargetMndLevelPercent));
  }
  else{ //デバフの場合
    $mndBonus = round(($skillUseStatus['MND'] * $changeMyMndLevelPercent) - ($tgObject['MND'] * $changeTargetMndLevelPercent));
    if($mndBonus < 0) $mndBonus = 0;
  }
  $changeMndBonus =  ($mndBonus / $mndLevel) * 100;
  if(2 < $changeMndBonus) $changeMndBonus = 2;
  //パーセント加算
  $getParcentBuffPoint = round($tgObject[$statusKeyName] * ($parcentBuffPoint / 100));
  //直値加算
  $getBaseBuffPoint = $baseBuffPoint;
  //合計加算
  $getAddStatusPoint = round($getBaseBuffPoint + $getParcentBuffPoint);
  //精神力ボーナス追加値算出
  $getAddMndBonusPoint = $getAddStatusPoint * $changeMndBonus;
  //結果加算ステータスポイント算出
  $resultAddBuffStatusPoint = $getAddStatusPoint + $getAddMndBonusPoint;
  //結果返し値配列生成
  $result['buff_status_id'] = $buffStatusId;
  $result['buff_status_name'] = $statusKeyName;
  $result['result_add_buff_status_point'] = $resultAddBuffStatusPoint;
  //以下、combo agi_misなどの変更を行う事があれば処理を追加予定
  $result['combo'] = 1;
  $result['agi_miss'] = 0;
  return $result;
}

function getHitPointDamage($atk,$def,$atkLuck,$defLuck,$atkAgi,$defAgi,$option = null){ //HPに与えたダメージ算出 $option :ダメージ判定などにオプションがある場合は指定する。
  $result = array();
  $result['damage'] = 0; //実際に与えたダメージ 0はミス扱い
  $result['critical'] = 0; //クリティカルになったかの判定 0:なっていない 1:クリティカル
  $result['parry'] = 0; //パリィが発生したかの判定 0:なっていない 1:パリィ
  $result['agi_miss'] = 0; //素早さ計算によって回避したかの判定
  $result['miss'] = 0; //攻撃が無効になったかの判定
  $result['combo'] = 0; //コンボ回数
  $defParcent = round(($def / $atk) * 100);
  if(90 < $defParcent){
    $defParcent = 90;
  }
  $changeDefPoint = round($atk * ($defParcent * 0.01));
  $damageBase = $atk - $changeDefPoint;
  $missFlag = false; //AGI計算によって回避が発動した場合true
  $agiDiff = round(($defAgi / $atkAgi) * 100);
  $agiBase = round($agiDiff * 0.1);
  if(90 < $agiBase) $agiBase = 90;
  if($agiBase < 0) $agiBase = 0;
  $rotAgi = rand(1,100);
  if($rotAgi < $agiBase) { //回避発動
    $missFlag = true;
    $result['agi_miss'] = 1;
  }
  if($missFlag == false){
    $result['damage'] = $damageBase;
    //クリティカル判定
    $creticalRand = 0; //クリティカル発生率
    $parryRand = 0; //パリィ発生率
    $luckDiff = $defLuck - $atkLuck;
    if($luckDiff < 0){ //攻撃側のLuckが上
      $changeLuckRound = round(($defLuck / $atkLuck) * 100);
      $changeLuckRandVal = 100 - $changeLuckRound;
      if($changeLuckRandVal < 0){
        $changeLuckRandVal = 0;
      }
      $creticalRand = $changeLuckRandVal;
    }//パリィ判定
    else{ //防御側のLuckが上
      $changeLuckRound = round(($atkLuck / $defLuck) * 100);
      $changeLuckRandVal = 100 - $changeLuckRound;
      if($changeLuckRandVal < 0){
        $changeLuckRandVal = 0;
      }
      $parryRand = $changeLuckRandVal;
    }

    //クリティカル判定結果
    $rotCritical = rand(1,100);
    if($rotCritical < $creticalRand){
      $result['critical'] = 1;
      $criticalDamage = 1;
      if(90 < $creticalRand) $criticalDamage = 3;
      else if(75 < $creticalRand) $criticalDamage = 2;
      else if(50 < $creticalRand) $criticalDamage = 1.5;
      else if(25 < $creticalRand) $criticalDamage = 1.4;
      else {
        $criticalDamage = 1.25;
      }
      $result['damage'] = round($result['damage'] * $criticalDamage);
    }
    //パリィ判定結果
    $rotParry = rand(1,100);
    if($rotParry < $parryRand){
      $result['parry'] = 1;
      $parryDamage = 1;
      if(90 < $parryRand) $parryDamage = 0.7;
      else if(75 < $parryRand) $parryDamage = 0.75;
      else if(50 < $parryRand) $parryDamage = 0.8;
      else if(25 < $parryRand) $parryDamage = 0.85;
      else {
        $parryDamage = 0.9;
      }
      $result['damage'] = round($result['damage'] * $parryDamage);
      if($result['damage'] <= 0) //攻撃が効かなかった場合
      {
        $result['miss'] = 1;
        $result['damage'] = 0;
      }
    }

    //連続攻撃判定
    $combo = getAgilityBonus($defAgi,$atkAgi); //攻撃回数を取得
    $result['combo'] = $combo;
    $result['damage'] = round($result['damage'] * $combo);
  }
  else{ //攻撃をミスした
    $result['damage'] = 0;
  }
  return $result;
}

function getTargetObject($conn,$playerIndexId = false,$enemyIndexId = false,$playerTargetDatas,$enemyMemberStatus,$partyMemberStatus,$deckCard,$playerFormationMasterData){ //攻撃対象を決定し取得
  $resultTargetData = array(); //ターゲット対象の結果
  $resultTargetData['target_is_enemy'] = array();
  $resultTargetData['target_is_player'] = array();
  $skillTargetType = $deckCard['skill_target_type']; //スキル対象のタイプ
  switch ($skillTargetType) {
    case "0": //敵単体
    {
      $priority = 0;
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($playerTargetDatas as $plTargetData) {
          if($plTargetData['player_index_id'] == $playerIndexId){
            if($plTargetData['select_target_number'] != 0){
              $hpCheck = true;
              foreach ($enemyMemberStatus as $enemyStatus) {
                if($enemyStatus['enemy_pos_index'] == $plTargetData['select_enemy_index']){
                  if($enemyStatus['now_hp'] <= 0){ //対象が死んでいた
                    $hpCheck = false;
                  }
                }
              }
              if($hpCheck == true){ //対象が生きていたら
                if($priority == 0){
                  $priority = $plTargetData['select_target_number'];
                }
                if($plTargetData['select_target_number'] < $priority){
                  $priority = $plTargetData['select_target_number'];
                }
              }
            }
          }
        }
        if($priority != 0){ //番号
          foreach ($playerTargetDatas as $plTargetData) {
            if($plTargetData['select_target_number'] == $priority && $plTargetData['player_index_id'] == $playerIndexId){ //攻撃対象の確定
              $targetEnemyStatus = false;
              foreach ($enemyMemberStatus as $enemyStatus) {
                if($enemyStatus['enemy_pos_index'] == $plTargetData['select_enemy_index']){
                  $targetEnemyStatus = $enemyStatus;
                }
              }
              if($targetEnemyStatus != false){
                array_push($resultTargetData['target_is_enemy'],$targetEnemyStatus); //ターゲットのデータを追加
              }
              else{
                return -1; //攻撃対象の敵が見つからなかった
              }
            }
          }
        }
        else{ //優先ターゲット番号が指定されていない場合
          $targetEnemyStatus = false;
          foreach ($enemyMemberStatus as $enemyStatus) {
            if(0 < $enemyStatus['now_hp']){
              $targetEnemyStatus = $enemyStatus;
              break;
            }
          }
          if($targetEnemyStatus != false){
            array_push($resultTargetData['target_is_enemy'],$targetEnemyStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        $targetPlayerList = array();
        $positionList = explode(',',$playerFormationMasterData['positions']);
        foreach ($partyMemberStatus as $plStatus) { //最大のプライオリティを追加
          if($plStatus['now_hp'] <= 0) continue; //対象が死んでいた場合
          if($priority < $positionList[(int)$plStatus['player_pos_index']]){
            $priority = $positionList[(int)$plStatus['player_pos_index']];
          }
          array_push($targetPlayerList,$plStatus); //ターゲットリストに挿入
        }
        $resultPriority = 0;
        $pRot = rand(0,100);
        if($priority == 2){
          if(0 <= $pRot && $pRot <= 9) $resultPriority = 0;
          else if(10 <= $pRot && $pRot <= 29) $resultPriority = 1;
          else $resultPriority = 2;
        }
        else if($priority == 1){
          if(0 <= $pRot && $pRot <= 19) $resultPriority = 0;
          else $resultPriority = 1;
        }
        else{
          $resultPriority = 0;
        }
        $targetPlList = array(); //ターゲット候補のプレイヤー格納配列
        $targetCheck = false; //最低一人でもターゲットが存在したか
        foreach ($targetPlayerList as $plStatus) {
          if($resultPriority == $plStatus['player_pos_index']){
            array_push($targetPlList,$plStatus);
            $targetCheck = true;
          }
        }
        if(count($targetPlayerList) != 0 && $targetCheck == false){ //選択されたターゲットが存在せず、生存者が居た場合
          array_push($targetPlList,$targetPlayerList[0]); //戦闘のプレイヤーを選択
        }
        if(count($targetPlList) != 0){
          $rotTargetPlayerIndex = rand(0,(count($targetPlList) - 1));
          array_push($resultTargetData['target_is_player'],$targetPlList[$rotTargetPlayerIndex]); //ターゲットのデータを追加
        }
      }
    }
    break;
    case "1": //敵全体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if(0 < $enemyStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($partyMemberStatus as $plStatus) {
          if(0 < $plStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "2": //味方(自身)単体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($partyMemberStatus as $plStatus) {
          if($plStatus['player_index_id'] == $playerIndexId){ //自分
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if($enemyStatus['enemy_index_id'] == $enemyIndexId && $enemyStatus['enemy_pos_index'] == $enemyIndexId){ //攻撃者の場合
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "3": //味方全体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($partyMemberStatus as $plStatus) {
          if(0 < $plStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if(0 < $enemyStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "4": //味方が死んでても有効
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($partyMemberStatus as $plStatus) {
          array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
        }
      }
    }
    break;
    default:
    break;
  }
  return $resultTargetData;
}

function checkIsBattleStartOk($conn,$playerIndexId,$battleInstanceId,$enemyDatas,$mapArrayIndex,$charaMapChipIndex,$mapId){ //戦闘開始可能なデータかチェックを行う 正常であればバトルインスタンスを返す
  $result = false;
  $sql = "SELECT * FROM player_battle_instance WHERE id=? AND player_index_id=? AND map_id=? AND map_chara_array_index=? AND chara_map_chip_index=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($battleInstanceId,$playerIndexId,$mapId,$mapArrayIndex,$charaMapChipIndex));
  $selectBattleInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  if($selectBattleInstance != false){
     $enemys = implode(',',$enemyDatas);
     if($enemys == $selectBattleInstance['party_enemy_index_ids'] && $selectBattleInstance['battle_step'] == 1){ //敵が一致していて、戦闘開始前の状態か
       $result = $selectBattleInstance; //正常なデータのため、戦闘インスタンスを返す
     }
  }
  return $result;
}

//キャラクターの状態を作成する。
function insertPlayerMapEnemyStatus($conn,$mapCharaArrayIndex,$playerIndexId,$mapId,$statusId){
  //try{
    //$conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO player_map_character_status (player_index_id, map_id, status_id, map_chara_array_index)
    SELECT :player_index_id, :map_id, :status_id, :map_chara_array_index FROM dual WHERE NOT EXISTS
    ( SELECT player_index_id, map_id, status_id, map_chara_array_index FROM player_map_character_status
      WHERE player_index_id= :player_index_id AND map_id= :map_id AND status_id= :status_id AND map_chara_array_index= :map_chara_array_index)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':map_id', $mapId, PDO::PARAM_INT);
    $stmt->bindParam(':status_id', $statusId, PDO::PARAM_INT);
    $stmt->bindParam(':map_chara_array_index', $mapCharaArrayIndex, PDO::PARAM_INT);
    $stmt->execute();
    //$conn->commit(); //トランザクション終了
  //}
  //catch(Exception $e){
    //$conn->rollBack();
    //var_dump($e);
    //$result = false;
  //}
}

//バトルインスタンスのステップをバトル完了に更新する。
function updateBattleInstanceBattleStep($conn,$battleInstanceId,$battleStep){ // -1以外:通常更新  -1:インスタンス削除
  if($battleStep != -1){
    $sql = "UPDATE player_battle_instance SET battle_step=? WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($battleStep,$battleInstanceId));
  }
  else{ //インスタンス削除の場合
    $sql = "DELETE FROM player_battle_instance WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($battleInstanceId));
  }
}

//ワールドエリアマップの情報を更新する。
function updateAreaInstance($conn,$playerIndexId,$mapId,$enemyPower,$enemyMemberStatus,$mapMasterData){ //通過を加算する。
  //try{
    //$conn->beginTransaction(); //トランザクション開始
    $sql = "SELECT * FROM area_instance WHERE map_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($mapId));
    $selectMapInstance = $stmt->fetch(PDO::FETCH_ASSOC);
    $updateEnemyPower = $selectMapInstance['enemy_power'] + $enemyPower; //更新後の敵勢力

    if($updateEnemyPower <= 0){ //勢力0以下
      $clearType = 0;
      $updateEnemyPower = $mapMasterData['start_enemy_power']; //0か0以下の勢力になった場合はリセット
      $updateLastClearTime = date("Y-m-d H:i:s");
      $sql = "UPDATE area_instance SET enemy_power=?, last_clear_time=?, clear_type=? WHERE map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($updateEnemyPower,$updateLastClearTime,$clearType,$mapId));
    }
    else if($mapMasterData['max_enemy_power'] <= $updateEnemyPower){ //勢力MAX
      $clearType = 1;
      $updateEnemyPower = $mapMasterData['start_enemy_power']; //勢力MAXになった場合はリセット
      $updateLastClearTime = date("Y-m-d H:i:s");
      $sql = "UPDATE area_instance SET enemy_power=?, last_clear_time=?, clear_type=? WHERE map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($updateEnemyPower,$updateLastClearTime,$clearType,$mapId));
    }
    else{
      //最大値を超えた場合は最大値にする
      $sql = "UPDATE area_instance SET enemy_power=? WHERE map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($updateEnemyPower,$mapId));
    }

    //$conn->commit(); //トランザクション終了
  //}
  //catch(Exception $e){
  //  $conn->rollBack();
  //  var_dump($e);
  //  $result = false;
  //}
}

//マップインスタンスを更新する。
function updateBattleEndPlayerMapInstance($conn,$playerIndexId,$mapId,$enemyPower,$killEnemyIdsArray,$mapMasterData){
  $result = array();
  $result['clear_flag'] = false; //ステージをクリアしたか。

  $sql = "SELECT * FROM player_map_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));
  $selectMapInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  $updateEnemyPower = $selectMapInstance['enemy_power'] + $enemyPower; //更新後の敵勢力

  $getKilledEnemy = array();
  if($selectMapInstance['killed_enemy_index_ids'] != "") $getKilledEnemy = explode(",",$selectMapInstance['killed_enemy_index_ids']);
  $killedEnemyArray = array_merge($killEnemyIdsArray,$getKilledEnemy);
  $updateKilledEnemyIndexIds = implode(",",$killedEnemyArray); //更新する倒した敵ID(カンマ区切り)

  $clearTriggerEnemys = explode(",",$mapMasterData['clear_trigger_enemy_index_ids']);
  $checkClearTriggerEnemy = array_unique($clearTriggerEnemys);
  $clearFlag = false; //ステージをクリアしたか。
  if(count($clearTriggerEnemys) != 0){
    for ($i=0; $i < count($checkClearTriggerEnemy); $i++) {
      $checkCount = 0;
      $playerCount = 0;
      for ($j=0; $j < count($clearTriggerEnemys); $j++) {
        if($checkClearTriggerEnemy[$i] == $clearTriggerEnemys[$j])$checkCount = $checkCount + 1;
      }
      for ($p=0; $p < count($killedEnemyArray); $p++) {
        if($checkClearTriggerEnemy[$i] == $killedEnemyArray[$p])$playerCount = $playerCount + 1;
      }
      if($checkCount <= $playerCount){ //クリアに必要な数以上を倒していた場合。
        $clearFlag = true;
      }
      else{
        $clearFlag = false;
        break;
      }
    }
  }

  if($clearFlag == true){ //ステージをクリアした
    $result['clear_flag'] = true;
  }
  if($updateEnemyPower < 0) $updateEnemyPower = 0;
  if((int)$mapMasterData['max_enemy_power'] < $updateEnemyPower) $updateEnemyPower = $mapMasterData['max_enemy_power'];
  $sql = "UPDATE player_map_instance SET enemy_power=?,killed_enemy_index_ids=? WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($updateEnemyPower,$updateKilledEnemyIndexIds,$playerIndexId,$mapId));

  return $result;
}

function enemyStatusPowerUp(&$enemyStatus,$enemyPower,$mapMasterData){ //敵勢力により、敵のステータスを強化する。
  $powerVal = round(($enemyPower / (int)$mapMasterData['max_enemy_power']) * 100);
  $upVal = 1;
  if(25 <= $powerVal) $upVal = 1.2;
  if(50 <= $powerVal) $upVal = 1.5;
  if(75 <= $powerVal) $upVal = 2.0;
  if(100 <= $powerVal) $upVal = 3.0;
  $enemyStatus['HP'] = round($enemyStatus['HP'] * $upVal);
  $enemyStatus['ATK'] = round($enemyStatus['ATK'] * $upVal);
  $enemyStatus['DEF'] = round($enemyStatus['DEF'] * $upVal);
  $enemyStatus['M_ATK'] = round($enemyStatus['M_ATK'] * $upVal);
  $enemyStatus['M_DEF'] = round($enemyStatus['M_DEF'] * $upVal);
  $enemyStatus['AGI'] = round($enemyStatus['AGI'] * $upVal);
  $enemyStatus['MND'] = round($enemyStatus['MND'] * $upVal);
  $enemyStatus['VIT'] = round($enemyStatus['VIT'] * $upVal);
  $enemyStatus['STM'] = round($enemyStatus['STM'] * $upVal);
  $enemyStatus['LUCK'] = round($enemyStatus['LUCK'] * $upVal);
  $enemyStatus['now_hp'] = $enemyStatus['HP'];
}


function checkStoryClearAndNextEventCheck($conn,$playerIndexId,$mapId){ //ストーリーをクリアしたかチェックして、クリアしていたら次のイベントをチェック
  $result = -1;
  $addCount = 1;
  $eventCategoryId = 2; //マップを指定。
  $checkFlag = false; //解放チェック
  //try{
    //$conn->beginTransaction(); //トランザクション開始

    $sql = "SELECT * FROM main_story_event_master WHERE event_category_id=? AND event_target_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($eventCategoryId,$mapId));
    $getEventMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    $mainStoryId = $getEventMasterData['main_story_master_id'];
    if($getEventMasterData != false){
      $sql = "SELECT event_count FROM player_event_count WHERE player_index_id=? AND story_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$mainStoryId));
      $checkPlayerEventCount = $stmt->fetch(PDO::FETCH_ASSOC);

      if($checkPlayerEventCount['event_count'] == $getEventMasterData['event_count']){ //プレイヤーのイベントデータが正常か
        $checkFlag = true;
      }
    }
    if($checkFlag == true){ //解放チェックが正常な場合
      $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=?"; //最後のイベントではないかチェック
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mainStoryId));
      $getEventMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if((int)$checkPlayerEventCount['event_count'] < count($getEventMasterDatas)){
        $sql = "SELECT event_count FROM player_event_count WHERE player_index_id=? AND story_master_id=? FOR UPDATE";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$mainStoryId));

        $sql = "UPDATE player_event_count SET event_count = event_count + ? WHERE player_index_id=? AND story_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($addCount,$playerIndexId,$mainStoryId));

        $sql = "SELECT * FROM player_event_count WHERE player_index_id=? AND story_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$mainStoryId));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
      }
      else{
        $result = 0; //ストーリーコンプリート
        storyClear($conn,$mainStoryId,$playerIndexId);
        //報酬及び、解除設定はここで行う
      }
      resetPlayerMapInfo($conn,$playerIndexId,$mapId); //マップクリアのため、プレイヤーのマップ情報をリセットする。
    }
    //$conn->commit(); //トランザクション終了
  //}
  //catch(Exception $e){
  //  $conn->rollBack();
  //  var_dump($e);
  //  $result = false;
  //}
  return $result;
}

function resetPlayerMapInfo($conn,$playerIndexId,$mapId){ //プレイヤーのマップ情報をリセットする。
  //マップとプレイヤーに紐付く戦闘情報を削除
  $sql = "DELETE FROM player_battle_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));

  //マップとプレイヤーに紐付くマップキャラクター情報を削除
  $sql = "DELETE FROM player_map_character_status WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));

  //マップとプレイヤーに紐付くマップインスタンスを削除
  $sql = "DELETE FROM player_map_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));
}

function convertActionData($playerIndexId,BattleInstance $battleInstance,$addActions){ //クライアントから渡ってきたコマンドをActionDataに変換
  $result = array();
  $checkEntryActions = array();
  //自分のエントリーデータを取得
  $myEntryData = $battleInstance->GetEntryDataSelectEntryType(0,$playerIndexId);

  if($myEntryData == null) return array(); //自分が参加していないからアクション登録は行わない。

  foreach ($addActions as $addAction) {
    //重複チェック
    $checkEntry = false;
    for ($cea=0; $cea < count($checkEntryActions); $cea++) {
      if($checkEntryActions[$cea] == $addAction['unique_no']) $checkEntry = true;
    }
    if($checkEntry == true) continue; //既に登録したユニークNoなので、スキップ
    else{ $checkEntryActions[count($checkEntryActions)] = $addAction['unique_no']; } //チェック用に登録
    $entryData = null;
    //エントリーデータを取得
    $entryData = $battleInstance->GetEntryData($addAction['unique_no']);
    if($entryData != null){
      //自分のチームに居て、アクションが登録可能だった場合、アクション登録処理を許可
      if($myEntryData->partyInstance->teamNo == $entryData->partyInstance->teamNo){
        //権限チェック
        if(true == $battleInstance->permission->CheckPermission($entryData->uniqueNo,"add_action")){
          if($addAction['is_stay'] != -1){ //待機中を選択していた場合は、待機中のコマンドを作成
            $addActionData = new AddAction($entryData->uniqueNo,$entryData->battleEntryType->type,
            $entryData->battleEntryType->id,0,null,0,
            -1,0,-1);

            if($addActionData != null && $addActionData->init == true){
              //アクションが生成されれば、追加
              array_push($result,$addActionData);
            }
          }
          else if($addAction['auto_action'] != -1){ //自動行動
            $autoActionType = 0; //本来であれば、装備武器やクラスによってタイプを変更
            $autoAction = new AutoAction($battleInstance,$entryData,$autoActionType);
            array_push($result,$autoAction->addAction);
          }
          else{
            //アクションデータを生成
            $isMove = 0;
            $movePos = null;
            if(isset($addAction['move_pos']) && $addAction['move_pos']['x'] != -1 && $addAction['move_pos']['y'] != -1){
              $isMove = 1;
              $addAction['move_pos']['x'] = (int)$addAction['move_pos']['x'];
              $addAction['move_pos']['y'] = (int)$addAction['move_pos']['y'];
              $movePos = $addAction['move_pos'];
            }
            $isUseCard = 0;
            $useCardId = -1;
            if(isset($addAction['use_card_id']) && $addAction['use_card_id'] != -1){
              $isUseCard = 1;
              $useCardId = (int)$addAction['use_card_id'];
            }
            $isChangeDirection = 0;
            $changeDirection = -1;
            if(isset($addAction['change_direction']) && $addAction['change_direction'] != -1){
              $isChangeDirection = 1;
              $changeDirection = (int)$addAction['change_direction'];
            }

            $addActionData = new AddAction($entryData->uniqueNo,$entryData->battleEntryType->type,
            $entryData->battleEntryType->id,$isMove,$movePos,$isUseCard,
            $useCardId,$isChangeDirection,$changeDirection);

            if($addActionData != null && $addActionData->init == true){
              //アクションが生成されれば、追加
              array_push($result,$addActionData);
            }
          }
        }
      }
    }
  }
  //var_dump($result);
  return $result;
}

//敵NPCアクションを登録
function addEnemyActions(&$addActions,BattleInstance $battleInstance){
  foreach ($battleInstance->entryDatas as $entryData) {
    if($entryData->battleEntryType->type != 1) continue; //敵NPC以外はスキップ
    if(checkActionEntry($addActions,$entryData->uniqueNo) == true) continue; //既にアクションが登録されていればスキップ
    if($entryData->isDead == true) continue; //死亡してたらスキップ
    $autoActionType = 0; //本来であれば、敵マスターデータによってタイプを変更
    $autoAction = new AutoAction($battleInstance,$entryData,$autoActionType);
    array_push($addActions,$autoAction->addAction);
  }
}

//敵プレイヤーアクションを登録
function addEnemyPlayerActions($playerIndexId,&$addActions,BattleInstance $battleInstance){
  //自分のエントリーデータを取得
  $myEntryData = $battleInstance->GetEntryDataSelectEntryType(0,$playerIndexId);
  foreach ($battleInstance->entryDatas as $entryData) {
    if($entryData->battleEntryType->type != 0) continue; //プレイヤー以外はスキップ
    if($entryData->isDead == true) continue; //死亡してたらスキップ
    if(checkActionEntry($addActions,$entryData->uniqueNo) == true) continue; //既にアクションが登録されていればスキップ
    if($myEntryData != null && $myEntryData->partyInstance->teamNo == $entryData->partyInstance->teamNo) continue; //味方プレイヤーはスキップ
    $autoActionType = 0; //本来であれば、敵マスターデータによってタイプを変更
    $autoAction = new AutoAction($battleInstance,$entryData,$autoActionType);
    array_push($addActions,$autoAction->addAction);
  }
}

//自動アクションを登録
function addAutoActions(&$addActions,$uniqueNos,BattleInstance $battleInstance){
  $uniqueNoArray = explode(",",$uniqueNos);
  if(count($uniqueNoArray) != 0){
    foreach ($battleInstance->entryDatas as $entryData) {
      for ($i=0; $i < count($uniqueNoArray); $i++) {
        if($uniqueNoArray[$i] == $entryData->uniqueNo){
          $autoActionType = 0; //本来であれば、条件別にアクションタイプを変更
          $autoAction = new AutoAction($battleInstance,$entryData,$autoActionType);
          array_push($addActions,$autoAction->addAction);
          break;
        }
      }
    }
  }
}

//既にアクションが登録されているかチェック(重複登録防止用)
function checkActionEntry($addActions,$uniqueNo){
  foreach ($addActions as $action) {
    if($action->uniqueNo == $uniqueNo) return true;
  }
  return false;
}

//戦闘結果が実行済みでなければ、実行
function checkBattleResultSetting($conn,$battleInstance){
  $result = array();
  $result['save_flag'] = false; //redisへの書き込みを実行するか。
  $result['error'] = 0;
  $result['error_comment'] = "";
  if($battleInstance->battleResult == null) return $result;
  if($battleInstance->saveBattleResultSetting == true) return $result;
  //トランザクション開始
  try{
    $conn->beginTransaction(); //トランザクション開始
    $exeResult = 0;
    $sql = "SELECT * FROM battle_instance WHERE battle_instance_id=? AND exe_result=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($battleInstance->instanceId,$exeResult));
    $selectBattleInstance = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectBattleInstance != false){
      //結果が実行されていなければ、更新
      $result['save_flag'] = true;
      $exeResult = 1;
      $sql = "UPDATE battle_instance SET exe_result=? WHERE battle_instance_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($exeResult,$battleInstance->instanceId));
      $battleInstance->saveBattleResultSetting = true;
      //戦闘結果処理を実行
      foreach ($battleInstance->battleResult['win_team_battle_entry_type'] as $entryType) {
        $entryData = $battleInstance->GetEntryDataSelectEntryType($entryType->type,$entryType->id);
        if($entryData != null) $battleInstance->battleResultSetting->Win($conn,$battleInstance,$entryData); //勝利時に戦闘終了設定を実行
      }
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    $result['error'] = 100;
    $result['error_comment'] = "トランザクション処理に失敗しました";
    $result['save_flag'] = false;
  }
  return $result;
}


























































 ?>
