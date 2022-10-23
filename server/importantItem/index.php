<?php

//プレイヤーが所持している重要アイテムかチェックを行う
function importantItemCheck($conn,$playerIndexId,$importantItemId){
  $result = false;
  $sql = "SELECT * FROM player_important_item LEFT JOIN important_item_master
  ON player_important_item.important_item_id = important_item_master.id
  WHERE player_important_item.player_index_id=? AND important_item_master.id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$importantItemId));
  $checkItem = $stmt->fetch(PDO::FETCH_ASSOC);
  if($checkItem != false){
    $result = true;
  }
  return $result;
}

function getImportantItemMasterData($conn,$importantItemId){
  $sql = "SELECT * FROM important_item_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($importantItemId));
  $importnatItemMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $importnatItemMasterData;
}


//プレイヤーの所持品に重要アイテムを挿入
function insertNewPlayerImportantItem($conn,$playerIndexId,$importantItemId){
  $importantMasterData = getImportantItemMasterData($conn,$importantItemId);
  if($importantMasterData != false){
    $stmt = $conn -> prepare("INSERT INTO player_important_item (player_index_id, important_item_id)
    VALUES (:player_index_id, :important_item_id)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':important_item_id', $importantItemId, PDO::PARAM_INT);
    $stmt->execute();
  }
}

//クライアント表示用にプレイヤーが所持している重要アイテムを取得する
function getPlayerImportantItemData($conn,$playerIndexId){
  $sql = "SELECT * FROM player_important_item LEFT JOIN important_item_master ON player_important_item.important_item_id = important_item_master.id WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerImportantItemDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getPlayerImportantItemDatas;
}



















































 ?>
