<?php

function getEnemyMasterData($conn,$enemyMasterId){
  $sql = "SELECT * FROM enemy_master WHERE enemy_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyMasterId));
  $resultEnemyMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultEnemyMasterData;
}

function getEnemySkills($conn,$enemyMasterId){
  $sql = "SELECT * FROM enemy_skill WHERE enemy_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyMasterId));
  $resultEnemySkillDatas = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultEnemySkillDatas;
}

function getEnemySkillMasterDatas($conn,$enemySkills){
  $resultArray = array();
  foreach ($enemySkills as $enemySkill) {
    $sql = "SELECT * FROM skill_master WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($enemySkill['skill_master_id']));
    $skillMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($skillMasterData != false){
      array_push($resultArray,$skillMasterData);
    }
  }
  return $resultArray;
}

function getEnemyPartyData($conn,$id){ //敵パーティデータを取得
  $result = null;
  $sql = "SELECT * FROM enemy_party WHERE u_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($id));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//廃止予定パーティに入っているエネミーを決定する。
function getPartyEnemyIndexIds($conn,$enemyIndexId,$enemyPartyIndexId,$enemyPower)
{
  $addCount = 1;
  $columnName = 'position_priority';
  $direction = 'ASC';
  $resultEnemyPartyDatas = (string)$enemyIndexId;
  $sql = "SELECT * FROM enemy_party WHERE enemy_party_index_id=? ORDER BY $columnName $direction";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyPartyIndexId));
  $resultEnemyPartyDataAll = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($resultEnemyPartyDataAll != false){
    if(count($resultEnemyPartyDataAll) != 0){
      foreach ($resultEnemyPartyDataAll as $partyEnemyData) {
        $randEnemyActive = rand(1,$partyEnemyData['active_level_base']);
        if($randEnemyActive <= $partyEnemyData['active_level']){
          if($resultEnemyPartyDatas == ""){
            $resultEnemyPartyDatas = (string)$enemyIndexId;
          }
          else{
            if($addCount < 5){ //パーティの最大人数以内の場合
              if($partyEnemyData['active_enemy_power'] <= $enemyPower){ //敵勢力内に入っているか
                $resultEnemyPartyDatas = $resultEnemyPartyDatas.",".(string)$partyEnemyData['enemy_index_id'];
                $addCount = $addCount + 1;
              }
            }
          }
        }
      }
    }
  }
  return $resultEnemyPartyDatas;
}

//エネミーのenemy_party_index_idからエネミーマスターデータを取得
function getEnemyDatasSelectEnemyPartyIndexId($conn,$enemyPartyIndexId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['result'] = array();
  $columnName = 'position_priority';
  $direction = 'ASC';
  $limit = 5;
  $sql = "SELECT * FROM enemy_party WHERE enemy_party_index_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $enemyPartyIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $getEnemyPartyDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($getEnemyPartyDatas as $enemyPt) {
    $enemyMdata = getEnemyMasterData($conn,$enemyPt['enemy_index_id']);
    if($enemyMdata != false){
      $enemyMdata['position_priority'] = $enemyPt['position_priority'];
      array_push($result['result'],$enemyMdata);
    }
    else{
      $result['error'] = 1;
      $result['error_comment'] = "エネミーデータの取得に失敗しました。";
      break;
    }
  }
  return $result;
}

function getEnemyAttribute($conn,$enemyIndexId){ //敵の属性ボーナスを取得
  $enemyAttribute = false;
  $sql = "SELECT * FROM enemy_attribute WHERE enemy_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyIndexId));
  $enemyAttribute = $stmt->fetch(PDO::FETCH_ASSOC);
  return $enemyAttribute;
}

function getEnemyStatus($enemyMasterData,$statusIds){ //マスターデータからステータスだけ抜き出す。(戦闘処理で使用する基本ステータスのフォーマット)
  $result = array();
  foreach ($statusIds as $key => $value) {
    if(isset($enemyMasterData[$key])){
      $mergeArray = array('status_id' => $value, $key => $enemyMasterData[$key], 'status_point' => $enemyMasterData[$key], 'status_name' => $key);
      array_push($result,$mergeArray);
    }
  }
  return $result;
}

//戦闘対象のエネミーを検索して、パーティデータとエネミーデータを取得
function exeEnemySearch($conn,$enemySearchId,$power){
  $result = array();
  $result['enemy_party'] = null;
  $result['enemy_ids'] = "";

  $sql = "SELECT * FROM enemy_search_master WHERE enemy_search_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemySearchId));
  $enemySearchMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  if($enemySearchMasterData != false){
    $groupIds = explode(",",$enemySearchMasterData['group_ids']);
    //勢力により、グループIDを決定
    $powerLevel = (int)round($power / 10);
    if(isset($groupIds[$powerLevel])){
      $groupId = $groupIds[$powerLevel];
      $sql = "SELECT * FROM enemy_group_master WHERE group_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($groupId));
      $enemyGroupMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if(count($enemyGroupMasterDatas) != 0){
        $rot = rand(0,count($enemyGroupMasterDatas) - 1);
        //エネミーIdsを確定
        $result['enemy_ids'] = $enemyGroupMasterDatas[$rot]['enemy_index_ids'];
        //戦闘のエネミーのパーティデータを取得
        $enemyIds = explode(",",$result['enemy_ids']);
        $enemyMasterData = getEnemyMasterData($conn,$enemyIds[0]);
        if($enemyMasterData != false){
          $sql = "SELECT * FROM enemy_party WHERE u_id=?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($enemyMasterData['enemy_party_id']));
          $result['enemy_party'] = $stmt->fetch(PDO::FETCH_ASSOC);
        }
      }
    }
  }

  return $result;
}

//エネミーアセットマスターIDからエネミーアセットマスターデータを取得
function getEnemyAssetMasterData($conn,$id){
  $result = null;
  $sql = "SELECT * FROM enemy_asset_master WHERE enemy_asset_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($id));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//エネミーアセットマスターからアセットタグを抽出
function getEnemyAssetTag($enemyAssetMaster){
  $result = "";
  if($enemyAssetMaster != null){
    switch ((int)$enemyAssetMaster['enemy_asset_type']) {
      case 0: //アセットタグID直接指定。
      {
        $result = "enemy_image_".$enemyAssetMaster['param_0'];
      }
      break;
      case 1: //右アセットタグID左アセットタグIDを指定
      {

      }
      break;
      case 2: //敵アバター&敵装備アセットタグを指定
      {

      }
      break;
    }
  }
  return $result;
}

//マッチングするエネミーを検索
function searchSupportEnemyMathingList($conn,$areaId,$getCount = 0){ //getCount = 0;全権取得
  $result = array();
  $addUniqueList = array();
  $sql = "SELECT * FROM support_enemy_matching_list WHERE area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($areaId));
  $getAll = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($getCount = 0) $result = $getAll;
  else{
    for ($i=0; $i < count($getAll); $i++) {
      $randIndex = rand(0,(count($getAll) - 1));
      if(isset($getAll[$randIndex])) {
        $addData = $getAll[$randIndex];
        if($addData['is_unique'] == 1){ //ユニークサポートエネミーの場合
          $uniqueCheck = true;
          foreach ($addUniqueList as $uList) {
            if($uList['enemy_index_id'] == $addData['enemy_index_id']){ $uniqueCheck = true; break;}
          }
          if($uniqueCheck == true){
            array_push($result,$addData);
            array_push($addUniqueList,$addData);
          }
        }
        else{
          array_push($result,$addData);
        }
      }
      if($getCount <= count($result)) break;
    }
  }
  return $result;
}


















































 ?>
