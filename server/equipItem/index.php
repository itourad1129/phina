<?php

function selectPlayerEquipItem($conn,$playerIndexId,$equipItemMasterId){ //プレイヤーが所持しているアイテムを取得
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_item_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipItemMasterId));
  $resultPlayerEquipItem = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultPlayerEquipItem;
}

function getPlayerEquipItemAll($conn,$playerIndexId){
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $resultPlayerEquipItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $resultPlayerEquipItems;
}

function getEquipItemMasterData($conn,$equipItemMasterId){
  $sql = "SELECT * FROM equip_item_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($equipItemMasterId));
  $selectEquipItemMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectEquipItemMasterData;
}

function getEquipItemMasterDatas($conn){
  $sql = "SELECT * FROM equip_item_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getEquipItemMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getEquipItemMasterDatas;
}

function getPlayerItemInventory($conn,$playerIndexId){
  $equipStatus = 1;
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipStatus));
  $resultPlayerInventory = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $resultPlayerInventory;
}

function getPlayerEquipItem($conn,$playerIndexId){ //プレイヤーが装備中のアイテムを全て取得
  $equipStatus = 2;
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipStatus));
  $selectPlayerEquipItemRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerEquipItemRow;
}

function getPlayerEquipItemAndMasterData($conn,$playerIndexId){ //プレイヤーの装備品と装備品のマスターデータを種奥する。
  $equipStatus = 2;
  $sql = "SELECT * FROM player_equip_item LEFT JOIN equip_item_master ON player_equip_item.equip_item_master_id = equip_item_master.id
   WHERE player_index_id=? and equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipStatus));
  $selectPlayerEquipItemRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($selectPlayerEquipItemRow == false) $selectPlayerEquipItemRow = array();
  return $selectPlayerEquipItemRow;
}

function insertPlayerEquipItem($conn,$playerIndexId,$equipItemMasterId,$getNum = 1){ //装備品を追加する。
  $result = false;
  $newEquipStatus = 1;//アイテムBOX
  $equipItemMaster = getEquipItemMasterData($conn,$equipItemMasterId);
  if($equipItemMaster != false){
    //既に所持しているかチェック
    $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_item_master_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$equipItemMasterId));
    $selectPlayerEquipItem = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerEquipItem == false){ //所持uしていなかったため、新規追加
      $stmt = $conn -> prepare("INSERT INTO player_equip_item (player_index_id, equip_item_master_id, equip_status, num)
      VALUES (:player_index_id, :equip_item_master_id, :equip_status, :num)");
      $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':equip_item_master_id', $equipItemMasterId, PDO::PARAM_INT);
      $stmt->bindParam(':equip_status', $newEquipStatus, PDO::PARAM_INT);
      $stmt->bindParam(':num', $getNum, PDO::PARAM_INT);
      $stmt->execute();
      $result = true;
    }
    else if(isset($selectPlayerEquipItem['num'],$selectPlayerEquipItem['equip_item_master_id'])){ //所持していたため、個数アップデート
      $resultNum = $getNum + $selectPlayerEquipItem['num'];
      $sql = "UPDATE player_equip_item SET num=? WHERE player_index_id=? AND equip_item_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($resultNum,$playerIndexId,$selectPlayerEquipItem['equip_item_master_id']));
      $result = true;
    }    
  }
  return $result;
}

function getEquipCategoryIds($conn){
  $sql = "SELECT * FROM equip_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerWeaponEquipMasterDataRow($conn,$playerIndexId){
  $resultArray = array();
  $playerEquipItem = getPlayerEquipItem($conn,$playerIndexId);
  foreach ($playerEquipItem as $plEquipItem) {
    $equipItemMasterData = getEquipItemMasterData($conn,$plEquipItem['equip_item_master_id']);
    if($equipItemMasterData != false){
      if($equipItemMasterData['weapon_category_id'] != 0 || $equipItemMasterData['sub_weapon_category_id'] != 0){
        array_push($resultArray,$equipItemMasterData);
      }
    }
  }
  return $resultArray;
}

function playerEquipItemDisp($conn,$playerIndexId){ //クライアント表示用データ(廃止)
  $resultArray = array();
  $plEquipItemMasterDatas = array();
  $playerEquipItem = getPlayerEquipItem($conn,$playerIndexId);
  $equipCategoryIds = getEquipCategoryIds($conn);
  foreach ($playerEquipItem as $plEquipItem) {
    $equipItemMasterData = getEquipItemMasterData($conn,$plEquipItem['equip_item_master_id']);
    if($equipItemMasterData != false){
      array_push($plEquipItemMasterDatas,$equipItemMasterData);
    }
  }
  foreach ($equipCategoryIds as $equipCategoryId) {
    $sarchEquipItem = false;
    foreach ($plEquipItemMasterDatas as $plEquipMaster) {
      if($plEquipMaster['equip_category_id'] == $equipCategoryId['id']){
        array_push($resultArray,array('equip_category_id' => $equipCategoryId['id'],'category_name' => $equipCategoryId['equip_name'],'item_name' => $plEquipMaster['item_name'],
      'equip_item_master_id' => $plEquipMaster['id'],'asset_id' => $plEquipMaster['asset_id']));
        $sarchEquipItem = true;
        break;
      }
    }
    if($sarchEquipItem == false){
      array_push($resultArray,array('equip_category_id' => $equipCategoryId['id'],'category_name' => $equipCategoryId['equip_name'],'item_name' => "なし",
     'equip_item_master_id' => "0",'asset_id' => "30"));
    }
  }
  return $resultArray;
}

function playerEquipItemRemove($conn,$playerInfo,$equipItemMasterId){
  $result = false;
  $newEquipStatus = 1;
  if($playerInfo != false){
    $playerEquipItem = selectPlayerEquipItem($conn,$playerInfo['player_index_id'],$equipItemMasterId);
    if($playerEquipItem != false){
      $sql = "UPDATE player_equip_item SET equip_status=? WHERE player_index_id=? AND equip_item_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($newEquipStatus,$playerInfo['player_index_id'],$equipItemMasterId));
      $result = true;
    }
  }
  return $result;
}

function getEquipItemParam($conn,$equipItemMasterId){//装備品のパラメーターを取得
  $sql = "SELECT * FROM equip_item_param_master WHERE equip_item_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($equipItemMasterId));
  $equipItemParams = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $equipItemParams;
}

function getEquipItemParamMasterDatas($conn){//装備品のパラメーターを取得
  $sql = "SELECT * FROM equip_item_param_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $equipItemParamMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $equipItemParamMasterDatas;
}

function equipStatusUpdate($conn,$statusData,$playerIndexId){ //アイテムを装備した時のステータス取得
  if($statusData != false && $playerIndexId != false){
    $playerEquipItems = getPlayerEquipItem($conn,$playerIndexId);
    foreach ($playerEquipItems as $plEquipItem) {
      $equipItemMasterData = getEquipItemMasterData($conn,$plEquipItem['equip_item_master_id']);
      if($equipItemMasterData != false){
        $equipItemParams = getEquipItemParam($conn,$equipItemMasterData['id']);
        foreach ($equipItemParams as $itemParam) {
          foreach ($statusData as &$status) {
            if($itemParam['status_id'] == $status['status_id']){
              $statusInfo = getStatusDataForStatusId($conn,$status['status_id']);
              if($statusInfo != false){
                $statusName = $statusInfo['status_param_name'];
                $updateStatusPoint = ($status[$statusName] + $itemParam['point_val']);
                $status[$statusName] = $updateStatusPoint; //ステータス配列のポイントを加算
              }
            }
          }
          unset($status);
        }
      }
    }
  }
  return $statusData;
}

function replaceEquipItemParam($conn,$equipItemMasterId){ //クライアント表示用に武器パラメーターを整形
  $result = array();
  $equipItemParams = getEquipItemParam($conn,$equipItemMasterId);
  if($equipItemParams != false){
    $sql = "SELECT * FROM status_ids";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $statusIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($statusIds as $statusData) {
      $resultParam = 0;
      foreach ($equipItemParams as $equipItemParam) {
        if($equipItemParam['status_id'] == $statusData['id']){
          $resultParam = $resultParam + $equipItemParam['point_val'];
        }
      }
      if($resultParam != 0){
        $replaseString = $statusData['status_name'].":".$resultParam;
        $pushArray = array('equip_item_param' => $replaseString);
        array_push($result,$pushArray);
      }
    }
  }
  return $result;
}

function playerEquipItemInventoryDisp($conn, $playerIndexId){//クライアント表示用 プレイヤーのインベントリーに入っている装備品を取得する
  $equipStatus = 1;
  $result = array();
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipStatus));
  $playerEquipItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($playerEquipItems as $plEquipItem) {
    $sql = "SELECT * FROM equip_item_master WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($plEquipItem['equip_item_master_id']));
    $equipItemMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($equipItemMasterData != false){
      //$pushArray = array_merge($equipItemMasterData,array('player_equip_item_id' => $plEquipItem['id']));
      $itemParams = replaceEquipItemParam($conn,$equipItemMasterData['id']);
      //$pushArray = array_merge($pushArray,$itemParams);
      $pushArray = array_merge($equipItemMasterData,$itemParams);
      array_push($result,$pushArray);
    }
  }
  return $result;
}

function playerEquipItemAllDisp($conn, $playerIndexId){//クライアント表示用 プレイヤーの全ての装備品を取得する
  $result = array();
  $sql = "SELECT * FROM player_equip_item WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $playerEquipItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($playerEquipItems as $plEquipItem) {
    $sql = "SELECT * FROM equip_item_master WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($plEquipItem['equip_item_master_id']));
    $equipItemMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($equipItemMasterData != false){
      //$pushArray = array_merge($equipItemMasterData,array('player_equip_item_id' => $plEquipItem['id']));
      $itemParams = replaceEquipItemParam($conn,$equipItemMasterData['id']);
      //$pushArray = array_merge($pushArray,$itemParams);
      $pushArray = array_merge($equipItemMasterData,$itemParams);
      array_push($result,$pushArray);
    }
  }
  return $result;
}

function playerEquipItemParams($conn,$playerIndexId){ //プレイヤーが所持しているプレイヤーアイテムデータ、アイテムマスターデータ、アイテムパラメーターデータを取得する
  $sql = "SELECT * FROM player_equip_item LEFT JOIN equip_item_master ON player_equip_item.equip_item_master_id = equip_item_master.id
   WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerEquipItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($selectPlayerEquipItems as &$plEquipItem) {
    $sql = "SELECT * FROM equip_item_param_master WHERE equip_item_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($plEquipItem['equip_item_master_id']));
    $getEquipItemParams = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $plEquipItem['equip_item_params'] = $getEquipItemParams; //アイテムパラメーターを追加
  }
  unset($plEquipItem);
  return $selectPlayerEquipItems;
}

function equipItemCountCheck($conn,$playerIndexId,$equipItemId,$equipItemCount){//使用する装備品の個数をチェックする。equipItemCount 使用回数
  $result = false;
  $equipItemData = getEquipItemMasterData($conn,$equipItemId);
  if($equipItemData != false){
    $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? AND equip_item_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$equipItemId));
    $playerEquipItemData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($playerEquipItemData != false){
      if($equipItemCount <= $playerEquipItemData['num']){ //使用する回数分所持していた場合
        $result = true;
      }
    }
  }
  return $result;
}



























 ?>
