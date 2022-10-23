<?php
require_once(dirname(__FILE__)."/../vitalityCount/index.php");
require_once(dirname(__FILE__)."/../item/index.php");
require_once(dirname(__FILE__)."/../levelUpController/index.php");
require_once(dirname(__FILE__)."/../party/index.php");
require_once(dirname(__FILE__)."/../enemy/index.php");
require_once(dirname(__FILE__)."/../playerStatus/index.php");
require_once(dirname(__FILE__)."/../equipItem/index.php");
require_once(dirname(__FILE__)."/../card/index.php");

//対戦者リストを取得 $partyId=参加者のparty_idかエネミーのparty_id, $creatureType=0プレイヤー,1エネミー $teamNo=割り当てるチーム番号0or1
//返し値 error error_comment
function setBattleEntryList($conn,$partyId,$teamCreatureType,$teamNo,$addCreatureDatas = null){ //敵だろうとプレイヤーだろうと、ここでデータの共通化を図りたい。
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['team_no'] = $teamNo;
  $result['team_creature_type'] = $teamCreatureType;
  $result['data'] = array();
  if($teamCreatureType == 0){ //プレイヤーの場合
    $partyPlayerDatas = getPartyMemberPlayerDatas($conn,$partyId);
    if($partyPlayerDatas != false && count($partyPlayerDatas) != 0){
      $resultData = array();
      foreach ($partyPlayerDatas as $playerInfo) {
        $addData = array(); //最終的に挿入するデータ
        $addData['name'] = $playerInfo['player_name'];
        $addData['pos'] = $playerInfo['player_pos_index'];
        $addData['status'] = null;
        $addData['asset_data_1'] = null;
        $addData['asset_data_2'] = null;
        //ステータス取得
        $entryListStatus = setEntryListStatus($conn,$teamNo,$teamCreatureType,$playerInfo['player_pos_index'],$playerInfo);
        if($entryListStatus['error'] == 0){ //エラーなし
          $addData['status'] = $entryListStatus;
        }
        else{
          $result['error'] = $entryListStatus['error'];
          $result['error_comment'] = $entryListStatus['error_comment'];
          return $result;
        }
        array_push($resultData,$addData);
      }
      $result['data'] = $resultData;
    }
    else{
      $result['error'] = 1;
      $result['error_comment'] = "プレイヤーデータの取得に失敗しました。";
      return $result;
    }
  }
  else if($teamCreatureType == 1){ //エネミーの場合
    $partyEnemyMdatas = getEnemyDatasSelectEnemyPartyIndexId($conn,$partyId);
    if(isset($partyEnemyMdatas['error']) && $partyEnemyMdatas['error'] == 0){
      $partyEnemyDatas = $partyEnemyMdatas['result'];
      $resultData = array();
      foreach ($partyEnemyDatas as $enemyMasterData) {
        $addData = array(); //最終的に挿入するデータ
        $addData['name'] = $enemyMasterData['enemy_name'];
        $addData['pos'] = $enemyMasterData['position_priority'];
        $addData['status'] = null;
        $addData['card_dack'] = null;
        $addData['asset_data_1'] = null;
        $addData['asset_data_2'] = null;
        //ステータス取得
        $entryListStatus = setEntryListStatus($conn,$teamNo,$teamCreatureType,$enemyMasterData['position_priority'],$enemyMasterData);
        if($entryListStatus['error'] == 0){ //エラーなし
          $addData['status'] = $entryListStatus;
        }
        else{
          $result['error'] = $entryListStatus['error'];
          $result['error_comment'] = $entryListStatus['error_comment'];
          return $result;
        }
        array_push($resultData,$addData);
      }
      $result['data'] = $resultData;
    }
    else {
      if(isset($partyEnemyMdatas['error'])){
        $result['error'] = $partyEnemyMdatas['error'];
        $result['error_comment'] = $partyEnemyMdatas['error_comment'];
        return $result;
      }
      else{
        $result['error'] = 1;
        $result['error_comment'] = "error enemyList";
        return $result;
      }
    }
  }
  return $result;
}

//データの共通化を行う、まずは両チームのステータスを取得
//フォーマット ['team_no'] => 1,['creature_type'] => 0,['position'] => 0,['base_status']=> array(),['status']=> array()

function setEntryListStatus($conn,$teamNo,$creatureType,$position,$data){ //戦闘開始前のステータスを取得
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['team_no'] = $teamNo;
  $result['creature_type'] = $creatureType;
  $result['position'] = $position;
  $result['status'] = array(); //バトルに使用するステータス
  $result['base_status'] = array(); //変動前の元のステータス(上書き禁止)
  $statusIds = getStatusIdsDatas($conn);
  if($creatureType == 0){ //プレイヤーの場合
    $vitalityPenalty = checkVitalityPenalty($conn,$data['player_index_id']);
    $playerEquipItems = getPlayerEquipItem($conn,$data['player_index_id']);
    $equipUpStatus = array(); //装備で上昇するステータス
    foreach ($playerEquipItems as $plEquipItem) {
      $equipItemParam = getEquipItemParam($conn,$plEquipItem['equip_item_master_id']);
      foreach ($equipItemParam as $eParam) {
        //既に配列にあるステータスIDなら加算、新規なら要素に代入
        if(isset($equipUpStatus[$eParam['status_id']])) $equipUpStatus[$eParam['status_id']] = $equipUpStatus[$eParam['status_id']] + (int)$eParam['point_val'];
        else $equipUpStatus[$eParam['status_id']] = (int)$eParam['point_val'];
      }
    }
    $baseStatus = getClassBaseStatus($conn,$data['player_level'],$data['player_class_id']);
    foreach ($statusIds as $statusRow) {
      $checkStatus = false;
      foreach ($baseStatus as $bStatus) {
        if($bStatus['status_id'] == $statusRow['id']){
          //基本ステータスを確定
          $result['base_status'][$statusRow['status_param_name']] = (int)$bStatus['status_point'];
          //更新用ステータス
          $status = (int)$bStatus['status_point'];
          //ペナルティの場合、ステータスを減少
          if($vitalityPenalty == true && $statusRow['id'] != 8){
            $status = round($status * 0.8);
          }
          //装備後のステータスを更新
          $resultEquipUpStatus = 0;
          foreach ($equipUpStatus as $key => $value) {
            if($key == $statusRow['id']){
              $resultEquipUpStatus = (int)$value;
              break;
            }
          }
          $status = ($status + (int)$resultEquipUpStatus);

          //更新用ステータスを確定
          $result['status'][$statusRow['status_param_name']] = $status;
          $checkStatus = true;
          break;
        }
      }
      if($checkStatus == false){
        $result['error'] = 1;
        $result['error_comment'] = "プレイヤーステータスの取得に失敗しました。";
        return $result;
      }
    }
  }
  else if($creatureType == 1){ //エネミーの場合
    foreach ($statusIds as $status) {
      $checkStatus = false;
      foreach ($data as $key => $value) {
        if($key == $status['status_param_name']){
          //基本ステータスを確定
          $result['base_status'][$status['status_param_name']] = (int)$value;
          //更新用ステータスを確定
          $result['status'][$status['status_param_name']] = (int)$value;
          $checkStatus = true;
        }
      }
      if($checkStatus == false){
        $result['error'] = 2;
        $result['error_comment'] = "ステータスの取得に失敗しました。";
        return $result;
      }
    }
  }

  return $result;
}
