<?php

function getDoorMasterData($conn,$targetId){ //ドアのマスターデータを取得
  $sql = "SELECT * FROM door_master WHERE door_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($targetId));
  $resultDoorMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultDoorMasterData;
}

function checkLockDoor($conn,$playerIndexId,$openItemType,$openItemId){ //解錠可能なドアかチェックを行う
  $result = false;
  if($openItemType == 1){ //消費アイテム
    $result = itemCountCheck($conn,$playerIndexId,$openItemId,1,2);
  } else if($openItemType == 2){ //重要アイテム
    $result = importantItemCheck($conn,$playerIndexId,$openItemId);
  } else if($openItemType == 0){ //施錠無し
    $result = true;
  }
  return $result;
}

function lockDoorOpen($conn,$playerIndexId,$openItemType,$openItemId){ //施錠されたドアを開く
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  $itemCheck = false;
  if($openItemType == 1){ //消費アイテム
    $itemCheck = itemCountCheck($conn,$playerIndexId,$openItemId,1,2);
    if($itemCheck == true){
      $useCheck = itemCountUpdate($conn,$playerIndexId,$openItemId,1); //アイテム数を更新
      if($useCheck == false){
        $result['error'] = 2;
        $result['error_comment'] = "アイテムの使用に失敗しました。";
      }
      else{
        $result['error'] = 0;
        $result['error_comment'] = "";
      }
    }
    else{
      $result['error'] = 1;
      $result['error_comment'] = "解錠に必要なアイテムがありません。";
    }
  }
  else if($openItemType == 2){ //重要アイテム
    $itemCheck = importantItemCheck($conn,$playerIndexId,$openItemId);
    if($itemCheck == true){
      $result['error'] = 0;
      $result['error_comment'] = "";
    }
    else{
      $result['error'] = 1;
      $result['error_comment'] = "解錠に必要なアイテムがありません。";
    }
  }
  return $result;
}
