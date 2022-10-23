<?php

include_once '../../module/item/index.php';

function playerItemEquip($conn,$playerInfo,$selectEquipItemMasterId){ //アイテムを装備する。 //装備済みの場合は外す
  $result = false;
  $equipStatus = 2;
  if($playerInfo != false){
    try{
      $conn->beginTransaction(); //トランザクション開始
      $sql = "SELECT * FROM ( SELECT * FROM player_equip_item WHERE player_equip_item.equip_item_master_id=? AND player_equip_item.player_index_id=? FOR UPDATE )
      X LEFT JOIN equip_item_master ON X.equip_item_master_id = equip_item_master.id";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($selectEquipItemMasterId,$playerInfo['player_index_id']));
      $selectEquipItem = $stmt->fetch(PDO::FETCH_ASSOC);
      if($selectEquipItem != false){
        if($selectEquipItem['equip_status'] == 2){ //装備中の場合は、装備を外す
          $removal = 1;
          $sql = "UPDATE player_equip_item SET equip_status=? WHERE equip_item_master_id=? AND player_index_id=?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($removal,$selectEquipItemMasterId,$playerInfo['player_index_id']));
          $result = true;
        }
        else if(1 <= $selectEquipItem['num']){ //装備していないアイテムの場合で1個以上所持していた場合
          if($selectEquipItem['equip_class_id'] == 1 || $selectEquipItem['equip_class_id'] == $playerInfo['player_class_id']){
            playerEquipItemRemoval($conn,$playerInfo,$selectEquipItem['equip_category_id']); //既に装備中のアイテムを外す。
            $sql = "UPDATE player_equip_item SET equip_status=? WHERE equip_item_master_id=? AND player_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($equipStatus,$selectEquipItemMasterId,$playerInfo['player_index_id']));
            $result = true;
          }
        }
      }
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      $result = false;
    }
  }
  return $result;
}

function checkPlayerEquipItem($conn,$playerInfo,$selectEquipItemMasterId){
  if($playerInfo != false && $selectEquipItemMasterId != 0){
    $sql = "SELECT * FROM player_equip_item WHERE equip_item_master_id=? AND player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($selectEquipItemMasterId,$playerInfo['player_index_id']));
    $selectPlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerItem != false){
      return $selectPlayerItem;
    }
    else{
      return false;
    }
  }
}

function playerEquipItemRemoval($conn,$playerInfo,$equipCategoryId){
  if($playerInfo != false){
    $removal = 1;
    $sql = "UPDATE player_equip_item LEFT JOIN equip_item_master ON
    player_equip_item.equip_item_master_id = equip_item_master.id
    SET player_equip_item.equip_status=?
    WHERE player_equip_item.player_index_id=?
    AND equip_item_master.equip_category_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($removal,$playerInfo['player_index_id'],$equipCategoryId));
  }
}

function playerItemSell($conn,$playerInfo,$selectEquipItemMasterId){ //アイテムを売却する。
  $itemIdGold = 1;
  $updateCheck = false;
  $addGold = 0;
  $result = false;
  try{
    $conn->beginTransaction(); //トランザクション開始
    if($playerInfo != false && $selectEquipItemMasterId != 0){
      $checkPlayerEquipItem = checkPlayerEquipItem($conn,$playerInfo,$selectEquipItemMasterId);
      if($checkPlayerEquipItem != false){
        $selectEquipItemMaster = getEquipItemMasterData($conn,$checkPlayerEquipItem['equip_item_master_id']);
        if($selectEquipItemMaster != false){
          if($checkPlayerEquipItem['num'] <= 1){ //所持数が1以下の場合
            $sql = "DELETE FROM player_equip_item WHERE player_index_id=? AND equip_item_master_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($playerInfo['player_index_id'],$selectEquipItemMasterId));
            $updateCheck = true;
          } //所持数が1以上の場合
          else{
            $updateNum = $checkPlayerEquipItem['num'] - 1;
            $sql = "UPDATE player_equip_item SET num=? WHERE player_index_id=? AND equip_item_master_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($updateNum,$playerInfo['player_index_id'],$selectEquipItemMasterId));
            if(isset($selectEquipItemMaster['price'])) $addGold = round($selectEquipItemMaster['price'] / 10);
            $updateCheck = true;
          }
        }
        else{
          $result = 3;
        }
      }
      else{
        $result = 4;
      }
    }
    else{
      $result = 5;
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }

  if($updateCheck == true && $addGold != 0){ //通過を加算
    addPlayerItem($conn,$playerInfo['player_index_id'],$itemIdGold,$addGold);
  }

  return $result;
}

function changePlayerEquipItemsForEquipItemMasterData($conn,$playerEquipItemDataRow){
  $resultArray = array();
  foreach ($playerEquipItemDataRow as $playerEquipItem) {
    $selectEquipItemMaster = getEquipItemMasterData($conn,$playerEquipItem['equip_item_master_id']);
    if($selectEquipItemMaster != false){
      $addArray = array('player_equip_item_index_id' => $playerEquipItem['id'],'equip_status' => $playerEquipItem['equip_status']);
      $selectEquipItemMaster = array_merge($selectEquipItemMaster,$addArray);
      array_push($resultArray,$selectEquipItemMaster);
    }
  }
  return $resultArray;
}

if(isset($_GET['sell_playerEquipItemIndexId'])){
  if(playerItemSell($pdo,$PLAYER_INFO,$_GET['sell_playerEquipItemIndexId'])){
    print("アイテムを売却しました。<br>" );
  }
  else{
    print("アイテムの売却に失敗しました。<br>" );
  }
}

if(isset($_GET['equip_playerEquipItemIndexId'])){
  if(playerItemEquip($pdo,$PLAYER_INFO,$_GET['equip_playerEquipItemIndexId'])){
    print("アイテムを装備しました。<br>" );
  }
  else{
    print("アイテムの装備に失敗しました。<br>" );
  }
}

if(isset($_GET['remove_playerEquipItemIndexId'])){
  if(playerEquipItemRemove($pdo,$PLAYER_INFO,$_GET['remove_playerEquipItemIndexId'])){
    print("装備を外しました。<br>" );
  }
  else{
    print("アイテムの装備解除に失敗しました。<br>" );
  }
}


































 ?>
