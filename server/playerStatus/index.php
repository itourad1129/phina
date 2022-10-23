<?php

function getStatusIdsDatas($conn){
  $sql = "SELECT * FROM status_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $statusIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $statusIds;
}

function getClassBaseStatus($conn,$level,$classId){ //クラスのステータスを取得
  $result = false;
  $sql = "SELECT * FROM base_status_master WHERE player_level=? AND player_class_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($level,$classId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getClassBaseStatusSelectStatusId($conn,$level,$classId,$statusId){ //クラスのステータスをステータスIDから取得
  $result = false;
  $sql = "SELECT * FROM base_status_master WHERE player_level=? AND player_class_id=? AND status_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($level,$classId,$statusId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}
