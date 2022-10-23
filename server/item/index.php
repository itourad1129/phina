<?php
include_once '../../module/card/index.php';
include_once '../../module/equipItem/index.php';
function itemCountCheck($conn,$playerIndexId,$itemItemId,$itemCount,$checkItemType = -1){//使用するアイテムの個数をチェックする。itemCount 使用回数
  $result = false;
  $itemIdData = getItemIdData($conn,$itemItemId);
  if($itemIdData != false){
    if($checkItemType == -1 || $itemIdData['item_type'] == $checkItemType){ //チェック指定のアイテムの場合
      $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$itemItemId));
      $playerItemData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($playerItemData != false){
        if($itemCount <= $playerItemData['item_val']){ //使用する回数分所持していた場合
          $result = true;
        }
      }
    }
  }
  return $result;
}

function transactionItemCountCheck($conn,$playerIndexId,$itemItemId,$itemCount,$checkItemType = -1){//使用するアイテムの個数をチェックする。itemCount 使用回数
  $result = false;
  $itemIdData = getItemIdData($conn,$itemItemId);
  if($itemIdData != false){
    if($checkItemType == -1 || $itemIdData['item_type'] == $checkItemType){ //チェック指定のアイテムの場合
      $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=? FOR UPDATE";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$itemItemId));
      $playerItemData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($playerItemData != false){
        if($itemCount <= $playerItemData['item_val']){ //使用する回数分所持していた場合
          $result = true;
        }
      }
    }
  }
  return $result;
}

function itemExecute($conn,$playerIndexId,$playerStatus,$itemItemId,$itemCount,$staminaStatusId,$vitalityStatusId){ //アイテムを使用する、itemCount 使用回数
  $exeResult = 0; //0:失敗、1:成功、2:満タンだった
  $itemCheck = itemCountCheck($conn,$playerIndexId,$itemItemId,$itemCount,2);
  $playerStatusStamina = 0;//スタミナ最大値
  $playerStatusVitality = 0;//生命力最大値
  if($itemCheck == true){ //アイテムチェック
    foreach ($playerStatus as $plStatus) { //スタミナの最大値を取得
      if($plStatus['status_id'] == $staminaStatusId){
        $playerStatusStamina = $plStatus['STM'];
      }
    }
    foreach ($playerStatus as $plStatus) { //スタミナの最大値を取得
      if($plStatus['status_id'] == $vitalityStatusId){
        $playerStatusVitality = $plStatus['VIT'];
      }
    }
    if($playerStatusStamina != 0 && $playerStatusVitality != 0){ //正常に値が取れた場合
      if($itemCheck != false){ //アイテムが使用可能であれば
        try{
          $conn->beginTransaction(); //トランザクション開始
          switch ($itemItemId) { //各アイテムの処理を切り替える。
            case 4: //スタミナドリンク(自分用)
            $staminaVal = $playerStatusStamina;//最大値分回復
            $exeResult = addPlayerStamina($conn,$playerIndexId,$playerStatus,$staminaStatusId,$staminaVal); //スタミナを更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,1); //全回復なので1個まで
            }
              break;
            case 5: //スタミナドリンク
            $staminaVal = $playerStatusStamina;//最大値分回復
            $exeResult = addPlayerStamina($conn,$playerIndexId,$playerStatus,$staminaStatusId,$staminaVal); //スタミナを更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,1); //全回復なので1個まで
            }
              break;
            case 6: //ミニスタミナドリンク(自分用)
            $exeCount = 0;
            $staminaVal = 0;
            for ($i=1; $i < ($itemCount + 1); $i++) {
              $staminaVal = $staminaVal + round($playerStatusStamina * 0.1);//最大値の10%回復
              if($playerStatusStamina < $staminaVal){ //最大値を超えた場合
                break;
              }
              $exeCount = $i;
            }
            $exeResult = addPlayerStamina($conn,$playerIndexId,$playerStatus,$staminaStatusId,$staminaVal); //スタミナを更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,$exeCount);//全回復なので1個まで
            }
              break;
            case 7: //ミニスタミナドリンク
            $exeCount = 0;
            $staminaVal = 0;
            for ($i=1; $i < ($itemCount + 1); $i++) {
              $staminaVal = $staminaVal + round($playerStatusStamina * 0.1);//最大値の10%回復
              if($playerStatusStamina < $staminaVal){ //最大値を超えた場合
                break;
              }
              $exeCount = $i;
            }
            $exeResult = addPlayerStamina($conn,$playerIndexId,$playerStatus,$staminaStatusId,$staminaVal); //スタミナを更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,$exeCount);//全回復なので1個まで
            }
              break;
            case 8: //パワードリンク(自分用)
            $vitalityVal = $playerStatusVitality;//最大値分回復
            $exeResult = addPlayerVitality($conn,$playerIndexId,$playerStatus,$vitalityStatusId,$vitalityVal); //生命力を更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,1); //全回復なので1個まで
            }
              break;
            case 9: //パワードリンク
            $vitalityVal = $playerStatusVitality;//最大値分回復
            $exeResult = addPlayerVitality($conn,$playerIndexId,$playerStatus,$vitalityStatusId,$vitalityVal); //生命力を更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,1); //全回復なので1個まで
            }
            case 10: //ミニパワードリンク(自分用)
            $exeCount = 0;
            $vitalityVal = 0;
            for ($i=1; $i < ($itemCount + 1); $i++) {
              $vitalityVal = $vitalityVal + round($playerStatusVitality * 0.1);//最大値の10%回復
              if($playerStatusVitality < $vitalityVal){ //最大値を超えた場合
                break;
              }
              $exeCount = $i;
            }
            $exeResult = addPlayerVitality($conn,$playerIndexId,$playerStatus,$vitalityStatusId,$vitalityVal); //生命力を更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,$exeCount);//全回復なので1個まで
            }
              break;
            case 11: //ミニパワードリンク
            $exeCount = 0;
            $vitalityVal = 0;
            for ($i=1; $i < ($itemCount + 1); $i++) {
              $vitalityVal = $vitalityVal + round($playerStatusVitality * 0.1);//最大値の10%回復
              if($playerStatusVitality < $vitalityVal){ //最大値を超えた場合
                break;
              }
              $exeCount = $i;
            }
            $exeResult = addPlayerVitality($conn,$playerIndexId,$playerStatus,$vitalityStatusId,$vitalityVal); //生命力を更新
            if($exeResult == 1){//使用に成功した場合。
              itemCountUpdate($conn,$playerIndexId,$itemItemId,$exeCount);//全回復なので1個まで
            }
              break;
            default:
              break;
          }
          $conn->commit(); //トランザクション終了
        }
        catch(Exception $e){
          $conn->rollBack();
          var_dump($e);
          $exeResult = 0;
        }
      }
    }
  }
  return $exeResult;
}

function useItemSell($conn,$playerIndexId,$itemId){ //消費アイテムの売却処理
  $result = false; //売却に成功したか。
  $itemData = getItemIdData($conn,$itemId);
  if($itemData != false){
    if($itemData['price'] != 0){ //価格がoではない場合
      //try{
      //  $conn->beginTransaction(); //トランザクション開始
        $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=? FOR UPDATE";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$itemId));
        $playerItemData = $stmt->fetch(PDO::FETCH_ASSOC);
        if($playerItemData != false && 1 <= $playerItemData['item_val']){
          $num = 1;
          $sql = "UPDATE player_item SET item_val = item_val - ? WHERE player_index_id=? AND item_id=? AND item_val >= ?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($num,$playerIndexId,$itemId,$num));
          $addItemId = 1;
          $sql = "SELECT * FROM ( SELECT * FROM player_item WHERE player_item.player_index_id=? AND player_item.item_id=? FOR UPDATE )
          X LEFT JOIN item_master ON X.item_id = item_master.id";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($playerIndexId,$addItemId));
          $selectUpdatePlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
          if($selectUpdatePlayerItem != false){
            $itemOver = false;
            $resultNum = (int)$selectUpdatePlayerItem['item_val'] + (int)$itemData['price'];
            if((int)$selectUpdatePlayerItem['item_max_val'] < $resultNum) $itemOver = true;
            if($itemOver == false) {
              $sql = "UPDATE player_item SET item_val = item_val + ? WHERE player_index_id=? AND item_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($itemData['price'],$playerIndexId,$addItemId));
            }
            else{ //最大所持容量を超えた場合
              $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($selectUpdatePlayerItem['item_max_val'],$playerIndexId,$addItemId));
            }
          }
          else{ //レコードが無かった場合
            $stmt = $conn -> prepare("INSERT INTO player_item (player_index_id, item_id, item_val)
            VALUES (:player_index_id, :item_id, :item_val)");
            $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
            $stmt->bindParam(':item_id', $addItemId, PDO::PARAM_INT);
            $stmt->bindParam(':item_val', $itemData['price'], PDO::PARAM_INT);
            $stmt->execute();
          }
        }
        //$conn->commit(); //トランザクション終了
      //}
      //catch(Exception $e){
      //  $conn->rollBack();
      //  var_dump($e);
      //  $result = false;
      //}
    }
  }
  return $result;
}

function itemCountUpdate($conn,$playerIndexId,$itemItemId,$itemCount){ //使用した個数を更新する。
  $result = false; //更新に成功したか
  $sql = "UPDATE player_item SET item_val = item_val - ? WHERE player_index_id=? AND item_id=? AND ? <= item_val";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($itemCount,$playerIndexId,$itemItemId,$itemCount));
  $count = $stmt->rowCount();
  if($count != 0) $result = true;
  return $result;
}

function getPlayerUseItemInventory($conn,$playerIndexId,$itemType = 0){ //クライアント表示用に消費型アイテムの所持数データを取得 itemType:0指定なし 1:通貨 2:消費 3:燃料
  $result = array();
  $sql = "";
  if($itemType == 0){
    $sql = "SELECT * FROM player_item LEFT JOIN item_master ON player_item.item_id = item_master.id WHERE player_item.player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
  else{
    $sql = "SELECT * FROM player_item LEFT JOIN item_master ON player_item.item_id = item_master.id WHERE player_item.player_index_id=? AND item_master.item_type=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$itemType));
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  return $result;
}

function addPlayerItem($conn,$playerIndexId,$itemId,$itemVal){ //通過を加算する。
  //try{
  //  $conn->beginTransaction(); //トランザクション開始
    $sql = "SELECT * FROM ( SELECT * FROM player_item WHERE player_item.player_index_id=? AND player_item.item_id=? FOR UPDATE )
    X LEFT JOIN item_master ON X.item_id = item_master.id";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$itemId));
    $selectUpdatePlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
    $itemOver = false;
    $resultNum = $itemVal;
    if($selectUpdatePlayerItem != false && isset($selectUpdatePlayerItem['item_val'])){ //プレイヤーテーブルが作成済みの場合
      $resultNum = (int)$selectUpdatePlayerItem['item_val'] + (int)$itemVal;
      if((int)$selectUpdatePlayerItem['item_max_val'] < $resultNum) $itemOver = true;
    }
    if($itemOver == false) {
      $stmt = $conn -> prepare("INSERT INTO player_item (player_index_id, item_id, item_val)
      VALUES (:player_index_id, :item_id, :item_val) ON DUPLICATE KEY UPDATE item_val = :item_val");
      $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':item_id',  $itemId, PDO::PARAM_INT);
      $stmt->bindParam(':item_val', $resultNum, PDO::PARAM_INT);
      $stmt->execute();
    }
    else{ //最大所持容量を超えた場合
      $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($selectUpdatePlayerItem['item_max_val'],$playerIndexId,$itemId));
    }

  //  $conn->commit(); //トランザクション終了
  //}
  //catch(Exception $e){
  //  $conn->rollBack();
  //  var_dump($e);
  //  $result = false;
  //}
}

function getItemIdData($conn,$itemId){
  $result = false;
  $sql = "SELECT * FROM item_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($itemId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getItemMasterDatas($conn){
  $sql = "SELECT * FROM item_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerMoneyDatas($conn,$playerIndexId){ //クライアント表示用通過アイテムデータの取得
  $result = array();
  $itemType = 1;
  $sql = "SELECT * FROM player_item LEFT JOIN item_master ON player_item.item_id = item_master.id WHERE item_master.item_type=? AND player_item.player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($itemType,$playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerItemDataAll($conn,$playerIndexId){ //クライアント表示用通貨データの取得(通貨アイテムと通貨混在)
  $result = array();
  $sql = "SELECT * FROM player_item LEFT JOIN item_master ON player_item.item_id = item_master.id WHERE player_item.player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerItemDataRow($conn,$playerInfo){
  if($playerInfo != false){
    $sql = "SELECT * FROM player_item WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $resultPlayerItem = $stmt->fetchAll(PDO::FETCH_ASSOC);
    return $resultPlayerItem;
  }
  else{
    return false;
  }
}

function getPlayerItemDataForItemId($conn,$playerInfo,$itemId){
  if($playerInfo != false){
    $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$itemId));
    $resultPlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
    return $resultPlayerItem;
  }
  else{
    return false;
  }
}

function transactionGetPlayerItemDataForItemId($conn,$playerInfo,$itemId){
  if($playerInfo != false){
    $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$itemId));
    $resultPlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
    return $resultPlayerItem;
  }
  else{
    return false;
  }
}

function selectPlayerItemData($conn,$playerIndexId,$itemId){ //item_idからプレイヤーのアイテムデータとマスターデータを取得
  $sql = "SELECT * FROM player_item LEFT JOIN item_master ON player_item.item_id = item_master.id WHERE player_item.player_index_id=? AND player_item.item_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$itemId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getDropItems($conn,$dropMasterId,$playerInfo,$enemyPower = 100,&$list){ //ドロップ品を取得する。 dropInfo = 入手経路などのデータ(配列)
  $sql = "SELECT * FROM drop_list WHERE drop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($dropMasterId));
  $dropList = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($dropList as $dropData) {
    $dorpRand = rand(1,$dropData['drop_chance']);
    if($dorpRand == 1 && $dropData['enemy_power'] <= $enemyPower){ //ドロップ成功した場合
      switch ($dropData['drop_category_id']) {
        case 1://経験値
        $resultExp = getExpDrop($conn,$dropData['drop_abstract_id'],$playerInfo); //経験値を更新し、加算された数値を返す。
        $resultDropArray = array('drop_item_name' => "経験値", 'drop_val' => $resultExp['get_exp_val'], 'level_up_flag' => $resultExp['level_up_flag'], 'type' => "exp");
        array_push($list,$resultDropArray);//配列を追加
          break;
        case 2://通貨
        $resultItem = getItemDrop($conn,$dropData['drop_abstract_id'],$playerInfo['player_index_id']);
        $resultDropArray = array('drop_item_name' => $resultItem['item_name'], 'drop_val' => $resultItem['item_val'], 'target_id' => $resultItem['target_id'], 'type' => "item");
        array_push($list,$resultDropArray);//配列を追加
          break;
        case 3://カード
        $resultCard = getCardDrop($conn,$dropData['drop_abstract_id'],$playerInfo['player_index_id']);
        $resultDropArray = array('drop_item_name' => $resultCard['card_name'], 'drop_val' => $resultCard['card_val'], 'target_id' => $resultCard['target_id'], 'type' => "card");
        array_push($list,$resultDropArray);//配列を追加
          break;
        case 4://装備品
        $equipItemMaster = getEquipItemMasterData($conn,$dropData['drop_abstract_id']);
        if($equipItemMaster != false){
          $insertResult = insertPlayerEquipItem($conn,$playerInfo['player_index_id'],$dropData['drop_abstract_id']); //装備品を追加
          if($insertResult != false){
            $resultDropArray = array('drop_item_name' => $equipItemMaster['item_name'], 'drop_val' => 1, 'target_id' => $equipItemMaster['id'], 'type' => "equip_item");
            array_push($list,$resultDropArray);//配列を追加
          }
        }
          break;
        default:
          break;
      }
    }
  }
}

function getExpDrop($conn,$dropAbstractId,$playerInfo){ //ドロップされた経験値を獲得する。
  $resultExp = false;
  $sql = "SELECT * FROM drop_exp WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($dropAbstractId));
  $selectDropExp = $stmt->fetch(PDO::FETCH_ASSOC);
  if($selectDropExp != false){
    $resultGetPlayerExp = getPlayerExp($conn,$playerInfo,$selectDropExp['exp_val']); //経験値を加算
    $resultExp = $resultGetPlayerExp;
  }
  return $resultExp;
}

function getItemDrop($conn,$dropAbstractId,$playerIndexId){//ドロップされた消費アイテムを獲得する。
  $resultItemVal = 0;
  $resultItemName = "";
  $sql = "SELECT * FROM drop_item WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($dropAbstractId));
  $selectDropItem = $stmt->fetch(PDO::FETCH_ASSOC);
  if($selectDropItem != false){
    $resultItemVal = $selectDropItem['item_val'];
    addPlayerItem($conn,$playerIndexId,$selectDropItem['item_id'],$selectDropItem['item_val']);//プレイヤーの通貨を更新
    $itemIdData = getItemIdData($conn,$selectDropItem['item_id']);
    if($itemIdData != false){
      $resultItemName = $itemIdData['item_name']; //通貨名を取得
    }
  }
  return array('item_name' => $resultItemName, 'item_val' => $resultItemVal, 'target_id' => $itemIdData['id']);
}

function getCardDrop($conn,$dropAbstractId,$playerIndexId){ //ドロップされたカードを獲得する。
  $resultCardVal = 0;
  $resultCardName = "";
  $sql = "SELECT * FROM drop_card WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($dropAbstractId));
  $selectDropCard = $stmt->fetch(PDO::FETCH_ASSOC);
  $cardData = getCardMasterData($conn,$selectDropCard['card_id']);
  if($cardData != false){
    $resultPlayerCard = insertPlayerCard($conn,$playerIndexId,$cardData['id'],$selectDropCard['card_val']); //カードを追加
    if($resultPlayerCard != false){
      $resultCardName = $cardData['card_name'];
      $resultCardVal = $selectDropCard['card_val'];
    }
  }
  return array('card_name' => $resultCardName, 'card_val' => $resultCardVal, 'target_id' => $cardData['id']);
}

//ドロップアイテムのリストを取得
function getDropItemList($conn,$dropMasterId){
  $result = array();
  $sql = "SELECT * FROM drop_list WHERE drop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($dropMasterId));
  $dropList = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($dropList as $dropData) {
    switch ($dropData['drop_category_id']) {
      case 1://経験値
      {
        $sql = "SELECT * FROM drop_exp WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($dropData['drop_abstract_id']));
        $selectDropExp = $stmt->fetch(PDO::FETCH_ASSOC);
        if($selectDropExp != false){
          $resultDropArray = array('drop_item_name' => "経験値", 'drop_val' => $selectDropExp['exp_val'], 'type' => "exp");
          array_push($result,$resultDropArray);//配列を追加
        }
      }
      break;
      case 2://通貨
      {
        $sql = "SELECT * FROM drop_item WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($dropData['drop_abstract_id']));
        $selectDropItem = $stmt->fetch(PDO::FETCH_ASSOC);
        if($selectDropItem != false){
          $getItemMasterData = getItemIdData($conn,$selectDropItem['item_id']);
          if($getItemMasterData != false){
            $resultDropArray = array('drop_item_name' => $getItemMasterData['item_name'], 'drop_val' => $selectDropItem['item_val'], 'target_id' => $getItemMasterData['id'], 'type' => "item");
            array_push($result,$resultDropArray);//配列を追加
          }
        }
      }
      break;
      case 3://カード
      {
        $sql = "SELECT * FROM drop_card WHERE id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($dropData['drop_abstract_id']));
        $selectDropCard = $stmt->fetch(PDO::FETCH_ASSOC);
        if($selectDropCard != false){
          $cardMasterData = getCardMasterData($conn,$selectDropCard['card_id']);
          if($cardMasterData != false){
            $resultDropArray = array('drop_item_name' => $cardMasterData['card_name'], 'drop_val' => $selectDropCard['card_val'], 'target_id' => $cardMasterData['id'], 'type' => "card");
            array_push($result,$resultDropArray);//配列を追加
          }
        }
      }
      break;
      case 4://装備品
      $equipItemMaster = getEquipItemMasterData($conn,$dropData['drop_abstract_id']);
      if($equipItemMaster != false){
        $resultDropArray = array('drop_item_name' => $equipItemMaster['item_name'], 'drop_val' => 1, 'target_id' => $equipItemMaster['id'], 'type' => "equip_item");
        array_push($result,$resultDropArray);//配列を追加
      }
      break;
      default:
      break;
    }
  }
  return $result;
}
