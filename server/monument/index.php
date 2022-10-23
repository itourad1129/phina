<?php

function getMonumentMasterData($conn,$monumentId){ //モニュメントのマスターデータを取得
  $sql = "SELECT * FROM monument_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($monumentId));
  $getMonumentMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getMonumentMasterData;
}

function addMonumentSelectItem($conn,$playerIndexId,$itemId,$itemNum,$attributeId){ //モニュメントにアイテムを食わせる
  $playerAttribute = getPlayerAttribute($conn,$playerIndexId,$attributeId);
  if($playerAttribute == false || !isset($playerAttribute['attribute_'.$attributeId])) return false;
  $checkItemNum = itemCountCheck($conn,$playerIndexId,$itemId,$itemNum);
  $getItemMasterData = getItemIdData($conn,$itemId);
  if($checkItemNum == true && $getItemMasterData != false){ //アイテムデータと所持数は正常
    try{
      $addNum = intval($getItemMasterData['value'] * $itemNum);
      $conn->beginTransaction(); //トランザクション開始
      itemCountUpdate($conn,$playerIndexId,$itemId,$itemNum); //使用したアイテム数を更新
      $upPower = resultMonumetRank($playerAttribute['attribute_'.$attributeId],$addNum); //上昇値を取得
      //属性ボーナス上昇値を更新
      $updateBonus = $playerAttribute['attribute_'.$attributeId] + $upPower;
      if(200 < $updateBonus) $updateBonus = 200; //上限値を超えていた場合修正
      updatePlayerAttribute($conn,$playerIndexId,$updateBonus,$attributeId);
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      return false;
    }
  }
  else{
    return false;
  }
  return true;
}

function addMonumentSelectCard($conn,$playerIndexId,$cardId,$cardNum,$attributeId){ //モニュメントにカードを食わせる
  $playerAttribute = getPlayerAttribute($conn,$playerIndexId,$attributeId);
  if($playerAttribute == false || !isset($playerAttribute['attribute_'.$attributeId])) return false;
  $checkCardNum = cardCountCheck($conn,$playerIndexId,$cardId,$cardNum);
  $getCardMasterData = getCardMasterData($conn,$cardId);
  if($checkCardNum == true && $getCardMasterData != false){ //アイテムデータと所持数は正常
    try{
      $addNum = intval($getCardMasterData['value'] * $cardNum);
      $conn->beginTransaction(); //トランザクション開始
      updatePlayerCardNum($conn,$playerIndexId,$cardId,$cardNum);//使用したカード数を更新
      $upPower = resultMonumetRank($playerAttribute['attribute_'.$attributeId],$addNum); //上昇値を取得
      //属性ボーナス上昇値を更新
      $updateBonus = $playerAttribute['attribute_'.$attributeId] + $upPower;
      if(200 < $updateBonus) $updateBonus = 200; //上限値を超えていた場合修正
      updatePlayerAttribute($conn,$playerIndexId,$updateBonus,$attributeId);
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      return false;
    }
  }
  else{
    return false;
  }
  return true;
}

function addMonumentSelectEquipItem($conn,$playerIndexId,$equipItemId,$equipItemNum,$attributeId){ //モニュメントに装備品を食わせる
  $playerAttribute = getPlayerAttribute($conn,$playerIndexId,$attributeId);
  if($playerAttribute == false || !isset($playerAttribute['attribute_'.$attributeId])) return false;
  $checkEquipItemNum = equipItemCountCheck($conn,$playerIndexId,$equipItemId,$equipItemNum);
  $getEquipItemMasterData = getEquipItemMasterData($conn,$equipItemId);
  if($checkEquipItemNum == true && $getEquipItemMasterData != false){ //アイテムデータと所持数は正常
    try{
      $addNum = intval($getEquipItemMasterData['value'] * $equipItemNum);
      $conn->beginTransaction(); //トランザクション開始
      $sql = "UPDATE player_equip_item SET num = num - ? WHERE player_index_id=? AND equip_item_master_id=? AND num >= ?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($equipItemNum,$playerIndexId,$equipItemId,$equipItemNum));
      $updateCount = $stmt->rowCount();
      if($updateCount != 0){ //アップデートが実行されたか
        $upPower = resultMonumetRank($playerAttribute['attribute_'.$attributeId],$addNum); //上昇値を取得
        //属性ボーナス上昇値を更新
        $updateBonus = $playerAttribute['attribute_'.$attributeId] + $upPower;
        if(200 < $updateBonus) $updateBonus = 200; //上限値を超えていた場合修正
        updatePlayerAttribute($conn,$playerIndexId,$updateBonus,$attributeId);
      }
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      return false;
    }
  }
  else{
    return false;
  }
  return true;
}

function resultMonumetRank($nowAttribute,$addValue){ //捧げた結果の上昇値を返す
  $upPower = 0;
  if(0 <= $nowAttribute && $nowAttribute <= 50){
    for ($i=0; $i < $addValue; $i++) {
      $rot = rand(1,1000);
      if($rot == 1) $upPower ++;
      if(51 <= ($nowAttribute + $upPower)) break;
    }
  }
  if(51 <= $nowAttribute && $nowAttribute <= 99){
    for ($i=0; $i < $addValue; $i++) {
      $rot = rand(1,1000);
      if($rot == 1) $upPower ++;
      if(100 <= ($nowAttribute + $upPower)) break;
    }
  }
  if(100 <= $nowAttribute && $nowAttribute <= 150){
    for ($i=0; $i < $addValue; $i++) {
      $rot = rand(1,500);
      if($rot == 1) $upPower ++;
      if(151 <= ($nowAttribute + $upPower)) break;
    }
  }
  if(151 <= $nowAttribute && $nowAttribute <= 200){
    for ($i=0; $i < $addValue; $i++) {
      $rot = rand(1,10000);
      if($rot == 1) $upPower ++;
      if(200 <= ($nowAttribute + $upPower)) break;
    }
  }
  return $upPower;
}
