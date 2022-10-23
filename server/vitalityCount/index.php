<?php

function getPlayerVitalityData($conn,$playerIndexId){
  $sql = "SELECT * FROM player_vitality WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerVitalityData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectPlayerVitalityData;
}

function addPlayerVitality($conn,$playerIndexId,$playerStatus,$vitalityStatusId,$vitalityVal){ //生命力を $vitalityVal 分回復する。
  $exeResult = 0; //0:失敗、1:成功、2:満タンだった。
  $playerVitalityData = getPlayerVitalityData($conn,$playerIndexId);
  if($playerVitalityData != false && $playerStatus != false){
    $addVitalityPoint = ($playerVitalityData['vitality_point'] + $vitalityVal);
    $playerStatusVitality = 0; //プレイヤーステータスの生命力
    foreach ($playerStatus as $plStatus) {
      if($plStatus['status_id'] == $vitalityStatusId){
        $playerStatusVitality = $plStatus['VIT'];
      }
    }
    if($playerStatusVitality != 0){ //正常にステータスが取れた場合
      if($playerVitalityData['vitality_point'] < $playerStatusVitality){
        if($playerStatusVitality < $addVitalityPoint){ //生命力の最大値を超えていた場合
          $addVitalityPoint = $playerStatusVitality;
        }
        $sql = "UPDATE player_vitality SET vitality_point=? WHERE player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($addVitalityPoint,$playerIndexId));
        $exeResult = 1;
      }
      else{ //生命力が最大値だった
        $exeResult = 2;
      }
    }
  }
  return $exeResult;
}


function updatePlayerVitality($conn,$playerInfo,$playerStatus,$vitalityStatusId){
  if($playerInfo != false && $playerStatus != false){
    $sql = "SELECT * FROM player_vitality WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerVitalityData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerVitalityData != false){
      $resultPlayerVitality = 0;
      foreach ($playerStatus as $plStatus) {
        if($plStatus['status_id'] == $vitalityStatusId){
          $resultPlayerVitality = $plStatus['VIT'];
        }
      }
      if($resultPlayerVitality != 0){
        if($resultPlayerVitality < $selectPlayerVitalityData['vitality_point']){
          $sql = "UPDATE player_vitality SET vitality_point=? WHERE player_index_id=?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($resultPlayerVitality,$playerInfo['player_index_id']));
        }
        else{
          if($resultPlayerVitality != $selectPlayerVitalityData['vitality_point']){
            //print("Mysql：".strtotime($selectPlayerStaminaData['last_update'])."<br>");
            //print("php：".time()."<br>");
            $timeDiff = (time() - strtotime($selectPlayerVitalityData['last_update']));
            if(60 <= $timeDiff){
              $addPoint = 0;
              $resultPoint = ($timeDiff / 60);
              $addPoint = floor($resultPoint);
              $resultAddPoint = ($selectPlayerVitalityData['vitality_point'] + $addPoint);
              if($resultPlayerVitality < $resultAddPoint){
                $resultAddPoint = $resultPlayerVitality;
              }
              $updateTime = date('Y-m-d H:i:s');
              $sql = "UPDATE player_vitality SET vitality_point=?,last_update=? WHERE player_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($resultAddPoint,$updateTime,$playerInfo['player_index_id']));
            }
          }
        }
      }
    }
  }
}

function getVitalityPenalty($conn,$playerIndexId,$playerStatus,$vitalityStatusId){ // false ペナルティー無し, true ペナルティーあり
  $resultFlag = false;
  if($playerStatus != false){
    foreach ($playerStatus as $plStatus) {
      if($plStatus['status_id'] == $vitalityStatusId){
        $statusData = getStatusDataForStatusId($conn,$plStatus['status_id']);
        if($statusData != false){
          $statusName = $statusData['status_param_name'];
          $playerBaseVitality  = $plStatus[$statusName];
          $playerVitalityData = getPlayerVitalityData($conn,$playerIndexId);
          if($playerVitalityData != false){
            $resultBaseVitality = round($playerBaseVitality / 10);
            if($playerVitalityData['vitality_point'] < $resultBaseVitality){
              $resultFlag = true;
            }
          }
        }
        break;
      }
    }
  }
  return $resultFlag;
}

function checkVitalityPenalty($conn,$playerIndexId){ //playerIndexIdからペナルティーのチェック
  $result = false;
  $playerVitalityData = getPlayerVitalityData($conn,$playerIndexId);
  $checkVit = round($playerVitalityData['max_vitality_point'] / 10);
  if((int)$playerVitalityData['vitality_point'] < $checkVit) $result = true;
  return $result;
}

function updatePlayerStatusPenalty($conn,$playerStatus,$vitalityStatusId){
  $resultStatus = $playerStatus;
  $updateStatusArray = array();
  foreach ($playerStatus as $plStatus) {
    if($vitalityStatusId != $plStatus['status_id']){
      $statusData = getStatusDataForStatusId($conn,$plStatus['status_id']);
      if($statusData != false){
        $statusName = $statusData['status_param_name'];
        $plStatus[$statusName] = (int)round($plStatus[$statusName] * 0.8);
        array_push($updateStatusArray,$plStatus);
      }
      else{
        array_push($updateStatusArray,$plStatus);
      }
    }
    else{
      array_push($updateStatusArray,$plStatus);
    }
  }
  $resultStatus = $updateStatusArray;
  return $resultStatus;
}

function updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,$updateVal){
  $playerVitalityData = getPlayerVitalityData($conn,$playerIndexId);
  if($playerVitalityData != false){

    $updatePlayerVitalityPoint = ($playerVitalityData['vitality_point'] - $updateVal);
    if($updatePlayerVitalityPoint < 0){
      $updatePlayerVitalityPoint = 0;
    }
    $sql = "UPDATE player_vitality SET vitality_point=? WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updatePlayerVitalityPoint,$playerIndexId));
  }
}

function updatePlayerOverKill($conn,$playerIndexId,$vitalityStatusId,$overkillDamage){
  if($overkillDamage <= -10000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,100);
  }
  else if($overkillDamage <= -8000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,70);
  }
  else if($overkillDamage <= -6000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,50);
  }
  else if($overkillDamage <= -4000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,30);
  }
  else if($overkillDamage <= -2000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,20);
  }
  else if($overkillDamage <= -1000){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,10);
  }
  else if($overkillDamage <= -800){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,9);
  }
  else if($overkillDamage <= -600){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,8);
  }
  else if($overkillDamage <= -400){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,6);
  }
  else if($overkillDamage <= -300){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,4);
  }
  else if($overkillDamage <= -200){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,2);
  }
  else if($overkillDamage <= -100){
    updatePlayerVitalityDown($conn,$playerIndexId,$vitalityStatusId,1);
  }
}






































 ?>
