<?php

function getStatusPoint($conn,$playerInfo){ //ステータスに振り分け可能な個数を返す
  $result = 0;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_status_up WHERE player_index_id=? AND player_class_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$playerInfo['player_class_id']));
    $playerStatusUpRow = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $result = ($playerInfo['player_level'] - count($playerStatusUpRow));
    if($result < 0){
      $result = 0;
    }
  }
  return $result;
}

function createPlayerStatusUp($conn,$playerInfo,$statusId){
  if($playerInfo != false && $statusId != 0){
    $resultMaxLevelStatus = false;
    $count_number = 'player_level';
    $direction = 'DESC';
    $limit = 1;
    $sql = "SELECT * FROM player_status_up WHERE player_index_id=? AND player_class_id=? ORDER BY $count_number $direction LIMIT ?";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam( 1, $playerInfo['player_index_id'], PDO::PARAM_INT);
    $stmt->bindParam( 2, $playerInfo['player_class_id'], PDO::PARAM_INT);
    $stmt->bindParam( 3, $limit, PDO::PARAM_INT );
    $stmt->execute();
    $selectMaxLevelStatusUp = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectMaxLevelStatusUp != false){
      $resultMaxLevelStatus = $selectMaxLevelStatusUp['player_level'];
    }
    else{
      $resultMaxLevelStatus = 0; //初期レベルの場合
    }
    $insertLevel = ($resultMaxLevelStatus + 1);
    $sql = "SELECT * FROM status_up_master WHERE status_id=? AND player_class_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($statusId,$playerInfo['player_class_id']));
    $selectStatusUpMaster = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectStatusUpMaster != false){
      $pointRand = rand($selectStatusUpMaster['point_min'],$selectStatusUpMaster['point_max']);
      $stmt = $conn -> prepare("INSERT INTO player_status_up (player_index_id, player_level, player_class_id, status_id, status_point)
      VALUES (:player_index_id, :player_level, :player_class_id, :status_id, :status_point)");
      $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
      $stmt->bindParam(':player_level', $insertLevel, PDO::PARAM_INT);
      $stmt->bindParam(':player_class_id', $playerInfo['player_class_id'], PDO::PARAM_INT);
      $stmt->bindParam(':status_id', $statusId, PDO::PARAM_INT);
      $stmt->bindParam(':status_point', $pointRand, PDO::PARAM_INT);
      $stmt->execute();
    }
  }
}

function playerStatusUp($conn,$playerInfo,$statusId){
  if($playerInfo != false){
    if(getStatusPoint($conn,$playerInfo) != 0){
      createPlayerStatusUp($conn,$playerInfo,$statusId);
    }
  }
}

































 ?>
