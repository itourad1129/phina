<?php

function getPlayerStaminaData($conn,$playerIndexId){ //プレイヤーのスタミナテーブルのレコードを取得
  $sql = "SELECT * FROM player_stamina WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerStaminaData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectPlayerStaminaData;
}

function addPlayerStamina($conn,$playerIndexId,$playerStatus,$staminaStatusId,$staminaVal){ //スタミナを $staminaVal 分回復する。
  $exeResult = 0; //0:失敗、1:成功、2:満タンだった。
  $playerStaminaData = getPlayerStaminaData($conn,$playerIndexId);
  if($playerStaminaData != false && $playerStatus != false){
    $addStaminaPoint = ($playerStaminaData['stamina_point'] + $staminaVal);
    $playerStatusStamina = 0; //プレイヤーステータスのスタミナ
    foreach ($playerStatus as $plStatus) {
      if($plStatus['status_id'] == $staminaStatusId){
        $playerStatusStamina = $plStatus['STM'];
      }
    }
    if($playerStatusStamina != 0){ //正常にステータスが取れた場合
      if($playerStaminaData['stamina_point'] < $playerStatusStamina){
        if($playerStatusStamina < $addStaminaPoint){ //スタミナ最大値を超えていた場合
          $addStaminaPoint = $playerStatusStamina;
        }
        $sql = "UPDATE player_stamina SET stamina_point=? WHERE player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($addStaminaPoint,$playerIndexId));
        $exeResult = 1;
      }
      else{ //スタミナが最大値だった
        $exeResult = 2;
      }
    }
  }
  return $exeResult;
}

function updatePlayerStamina($conn,$playerInfo,$playerStatus,$staminaStatusId){
  if($playerInfo != false && $playerStatus != false){
    $sql = "SELECT * FROM player_stamina WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerStaminaData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerStaminaData != false){
      $resultPlayerStamina = 0;
      foreach ($playerStatus as $plStatus) {
        if($plStatus['status_id'] == $staminaStatusId){
          $resultPlayerStamina = $plStatus['STM'];
        }
      }
      if($resultPlayerStamina != 0){
        if($resultPlayerStamina < $selectPlayerStaminaData['stamina_point']){
          $sql = "UPDATE player_stamina SET stamina_point=? WHERE player_index_id=?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($resultPlayerStamina,$playerInfo['player_index_id']));
        }
        else{
          if($resultPlayerStamina != $selectPlayerStaminaData['stamina_point']){
            //print("Mysql：".strtotime($selectPlayerStaminaData['last_update'])."<br>");
            //print("php：".time()."<br>");
            $timeDiff = (time() - strtotime($selectPlayerStaminaData['last_update']));
            if(60 <= $timeDiff){
              $addPoint = 0;
              $resultPoint = ($timeDiff / 60);
              $addPoint = floor($resultPoint);
              $resultAddPoint = ($selectPlayerStaminaData['stamina_point'] + $addPoint);
              if($resultPlayerStamina < $resultAddPoint){
                $resultAddPoint = $resultPlayerStamina;
              }
              $updateTime = date('Y-m-d H:i:s');
              $sql = "UPDATE player_stamina SET stamina_point=?,last_update=? WHERE player_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($resultAddPoint,$updateTime,$playerInfo['player_index_id']));
            }
          }
        }
      }
    }
  }
}









































 ?>
