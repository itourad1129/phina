<?php

include_once '../../module/item/index.php';

function getPurchaseFlagMasterData($conn,$purchaseFlagMasterId){
  $sql = "SELECT * FROM purchase_flag_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($purchaseFlagMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getShopMasterData($conn,$shopMasterId){
  $sql = "SELECT * FROM shop_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//販売されている装備品情報を取得
function getShopSellEquipItems($conn,$shopMasterId){
  $sql = "SELECT * FROM shop_equip_item_master WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//販売されている装備品の販売情報とマスターデータを同時に取得する。
function getShopSellEquipItemDatas($conn,$shopMasterId){
  // $sql = "SELECT shop_equip_item_master.id AS shop_equip_id, equip_item_master.id AS equip_item_master_id,
  // shop_master_id, purchase_flag_master_id, pay_item_id, price_val, equip_category_id, item_name, price,
  // equip_class_id, weapon_category_id, armor_category_id, asset_id, icon_asset_id, asset_id_option, comment FROM shop_equip_item_master LEFT JOIN equip_item_master ON shop_equip_item_master.equip_item_master_id = equip_item_master.id
  // WHERE shop_master_id=?";
  $sql = "SELECT * FROM shop_equip_item_master LEFT JOIN equip_item_master ON shop_equip_item_master.equip_item_master_id = equip_item_master.id WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//スキル販売は廃止
function getShopSellSkillItems($conn,$shopMasterId){
  $sql = "SELECT * FROM shop_skill_item_master WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}


function getShopSellCardItems($conn,$shopMasterId){
  $sql = "SELECT * FROM shop_card_item_master WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//販売されているカードの販売情報とマスターデータを同時に取得する。
function getShopSellCardItemDatas($conn,$shopMasterId){
  // $sql = "SELECT shop_card_item_master.id AS shop_card_id, card_master.id AS card_id, shop_master_id, card_master_id, purchase_flag_master_id, pay_item_id, price_val,
  // card_category_id, card_name, class_id, weapon_category_id, sub_weapon_category_id, stamina_point, card_rank, comment FROM shop_card_item_master LEFT JOIN card_master ON shop_card_item_master.card_master_id = card_master.id
  //   WHERE shop_master_id=?";

  $sql = "SELECT * FROM shop_card_item_master LEFT JOIN card_master ON shop_card_item_master.card_master_id = card_master.id WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getShopSellItemItems($conn,$shopMasterId){
  $sql = "SELECT * FROM shop_item_master WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//販売されている通貨の販売情報とマスターデータを同時に取得する。
function getShopSellItemDatas($conn,$shopMasterId){
  // $sql = "SELECT shop_item_master.id AS shop_item_id, item_master.id AS pay_item_id, shop_master_id, item_master_id, item_count, purchase_flag_master_id, pay_item_id, price_val,
  // item_name, item_flag, asset_id, icon_asset_id, item_max_val, price, comment FROM shop_item_master LEFT JOIN item_master ON shop_item_master.item_master_id = item_master.id
  // WHERE shop_master_id=?";
  $sql = "SELECT * FROM shop_item_master LEFT JOIN item_master ON shop_item_master.item_master_id = item_master.id WHERE shop_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopMasterId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId){
  $result = false;
  if($playerInfo != false){
    $purchaseFlagMasterData = getPurchaseFlagMasterData($conn,$purchaseFlagMasterId);
    if($purchaseFlagMasterData != false){
      if(checkPlayerPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId) == false){
        if($purchaseFlagMasterData['sell_time_flag'] != false){
          if(strtotime($purchaseFlagMasterData['start_time']) <= time() && time() <= strtotime($purchaseFlagMasterData['end_time'])){
            $stmt = $conn -> prepare("INSERT INTO player_purchase_flag (player_index_id, purchase_flag_master_id)
            VALUES (:player_index_id, :purchase_flag_master_id)");
            $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
            $stmt->bindParam(':purchase_flag_master_id', $purchaseFlagMasterData['id'], PDO::PARAM_INT);
            $stmt->execute();
            $result = true;
          }
        }
        else{
          $stmt = $conn -> prepare("INSERT INTO player_purchase_flag (player_index_id, purchase_flag_master_id)
          VALUES (:player_index_id, :purchase_flag_master_id)");
          $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
          $stmt->bindParam(':purchase_flag_master_id', $purchaseFlagMasterData['id'], PDO::PARAM_INT);
          $stmt->execute();
          $result = true;
        }
      }
    }
  }
  return $result;
}

function selectPlayerShopFlag($conn,$playerInfo,$shopMasterId){
  $result = false;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_shop_flag WHERE player_index_id=? AND shop_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$shopMasterId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}

//ショップを解放する。
function insertPlayerShopFlag($conn,$playerInfo,$shopMasterId){
  if($playerInfo != false){
    $getShopMaster = getShopMasterData($conn,$shopMasterId);
    if($getShopMaster != false){
      if(selectPlayerShopFlag($conn,$playerInfo,$shopMasterId) == false){
        $stmt = $conn -> prepare("INSERT INTO player_shop_flag (player_index_id, shop_master_id)
        VALUES (:player_index_id, :shop_master_id)");
        $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
        $stmt->bindParam(':shop_master_id', $shopMasterId, PDO::PARAM_INT);
        $stmt->execute();
      }
    }
  }
}

function checkPlayerShopFlag($conn,$playerInfo,$shopMasterId){ //利用可能な店かチェックする。
  $result = false;
  if($playerInfo != false){
    $check = selectPlayerShopFlag($conn,$playerInfo,$shopMasterId);
    if($check != false){
      $shopMasterData = getShopMasterData($conn,$shopMasterId);
      if($shopMasterData['open_time_flag'] != false){
        if(strtotime($shopMasterData['open_time']) <= time() && time() <= strtotime($shopMasterData['close_time'])){
          $result = $shopMasterData;
        }
      }
      else{
        $result = $shopMasterData;
      }
    }
  }
  return $result;
}

function getLimitSellTimeForPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId){ // -1：未指定 0 時間切れ
  if($playerInfo != false){
    $playerPurchaseFlagData = selectPlayerPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId);
    if($playerPurchaseFlagData != false){
      $result = -1;
      $purchaseFlagMasterData = getPurchaseFlagMasterData($conn,$purchaseFlagMasterId);
      if($purchaseFlagMasterData != false){
        if($purchaseFlagMasterData['player_limit_time'] != 0){
          $now = time();
          $limitTime = (strtotime($playerPurchaseFlagData['insert_time']) + $purchaseFlagMasterData['player_limit_time']);
          if($now < $limitTime){
            $result = ($limitTime - $now);
          }
          else{
            $result = 0;
          }
        }
      }
    }
  }
  return $result;
}

//最新の購入可能な商品をチェックする。
function updatePlayerPurchaseFlag($conn,$playerInfo){
  if($playerInfo != false){
    $sql = "SELECT * FROM player_purchase_flag WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $getPlayerPurchaseFlagRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($getPlayerPurchaseFlagRow as $plPurchaseFlag) {
      $purchaseFlagMasterData = getPurchaseFlagMasterData($conn,$plPurchaseFlag['purchase_flag_master_id']);
      if($purchaseFlagMasterData != false){
        if($purchaseFlagMasterData['sell_time_flag'] != false){
          if(strtotime($purchaseFlagMasterData['start_time']) <= time() && time() <= strtotime($purchaseFlagMasterData['end_time'])){
            if($purchaseFlagMasterData['player_limit_time'] != 0){
              $limitTime = (strtotime($plPurchaseFlag['insert_time']) + $purchaseFlagMasterData['player_limit_time']);
              if($limitTime <= time()){
                $sql = "DELETE FROM player_purchase_flag WHERE player_index_id=? AND purchase_flag_master_id=?";
                $stmt = $conn->prepare($sql);
                $deleteFlag = $stmt->execute(array($plPurchaseFlag['player_index_id'],$plPurchaseFlag['purchase_flag_master_id']));
              }
            }
          }
          else{
            $sql = "DELETE FROM player_purchase_flag WHERE player_index_id=? AND purchase_flag_master_id=?";
            $stmt = $conn->prepare($sql);
            $deleteFlag = $stmt->execute(array($plPurchaseFlag['player_index_id'],$plPurchaseFlag['purchase_flag_master_id']));
          }
        }
        else{
          if($purchaseFlagMasterData['player_limit_time'] != 0){
            $limitTime = (strtotime($plPurchaseFlag['insert_time']) + $purchaseFlagMasterData['player_limit_time']);
            if($limitTime <= time()){
              $sql = "DELETE FROM player_purchase_flag WHERE player_index_id=? AND purchase_flag_master_id=?";
              $stmt = $conn->prepare($sql);
              $deleteFlag = $stmt->execute(array($plPurchaseFlag['player_index_id'],$plPurchaseFlag['purchase_flag_master_id']));
            }
          }
        }
      }
      else{
        $sql = "DELETE FROM player_purchase_flag WHERE player_index_id=? AND purchase_flag_master_id=?";
        $stmt = $conn->prepare($sql);
        $deleteFlag = $stmt->execute(array($plPurchaseFlag['player_index_id'],$plPurchaseFlag['purchase_flag_master_id']));
      }
    }
  }
}

function getShopEquipItemMasterData($conn,$shopEquipItemMasterId){
  $sql = "SELECT * FROM shop_equip_item_master WHERE shop_equip_item_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopEquipItemMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getShopSkillItemMasterData($conn,$shopSkillItemMasterId){
  $sql = "SELECT * FROM shop_skill_item_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopSkillItemMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getShopCardItemMasterData($conn,$shopCardItemMasterId){
  $sql = "SELECT * FROM shop_card_item_master WHERE shop_card_item_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopCardItemMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getShopItemItemMasterData($conn,$shopItemItemMasterId){
  $sql = "SELECT * FROM shop_item_master WHERE shop_item_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($shopItemItemMasterId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function checkShopEquipItemMasterData($conn,$shopEquipItemMasterData){
  $result = false;
  if($shopEquipItemMasterData != false){
    $getShopMasterData = getShopMasterData($conn,$shopEquipItemMasterData['shop_master_id']);
    if($getShopMasterData != false){
      if($getShopMasterData['open_time_flag'] != false){
        if(strtotime($getShopMasterData['open_time']) <= time() && time() <= strtotime($getShopMasterData['close_time'])){
          $result = true;
        }
        else{
          $result = false;
        }
      }
      else{
        $result = true;
      }
    }
  }
  return $result;
}

//指定の店が開店中かチェックする。
function checkEquipItemSellTime($shopMasterData){
  $result = false;
  if($shopMasterData != false){
    if($shopMasterData['open_time_flag'] == 1){ //営業時間が存在した場合
      if(strtotime($shopMasterData['open_time']) <= time() && time() <= strtotime($shopMasterData['close_time'])){
        $reuslt = true;
      }
    }
    else{ //年中無休だった。
      $result = true;
    }
  }
  return $result;
}

function checkShopSkillItemMasterData($conn,$shopSkillItemMasterData){
  $result = false;
  if($shopSkillItemMasterData != false){
    $getShopMasterData = getShopMasterData($conn,$shopSkillItemMasterData['shop_master_id']);
    if($getShopMasterData != false){
      if($getShopMasterData['open_time_flag'] != false){
        if(strtotime($getShopMasterData['open_time']) <= time() && time() <= strtotime($getShopMasterData['close_time'])){
          $result = true;
        }
        else{
          $result = false;
        }
      }
      else{
        $result = true;
      }
    }
  }
  return $result;
}

function checkShopCardItemMasterData($conn,$shopCardItemMasterData){
  $result = false;
  if($shopCardItemMasterData != false){
    $getShopMasterData = getShopMasterData($conn,$shopCardItemMasterData['shop_master_id']);
    if($getShopMasterData != false){
      if($getShopMasterData['open_time_flag'] != false){
        if(strtotime($getShopMasterData['open_time']) <= time() && time() <= strtotime($getShopMasterData['close_time'])){
          $result = true;
        }
        else{
          $result = false;
        }
      }
      else{
        $result = true;
      }
    }
  }
  return $result;
}

function checkShopItemItemMasterData($conn,$shopItemItemMasterData){
  $result = false;
  if($shopItemItemMasterData != false){
    $getShopMasterData = getShopMasterData($conn,$shopItemItemMasterData['shop_master_id']);
    if($getShopMasterData != false){
      if($getShopMasterData['open_time_flag'] != false){
        if(strtotime($getShopMasterData['open_time']) <= time() && time() <= strtotime($getShopMasterData['close_time'])){
          $result = true;
        }
        else{
          $result = false;
        }
      }
      else{
        $result = true;
      }
    }
  }
  return $result;
}

function equipItemPurchase($conn,$playerInfo,$shopEquipItemMasterId,$getNum = 1){ //0:正常 1:購入失敗 2:金額不足
  $result = 1;
  if($playerInfo != false){
    updatePlayerPurchaseFlag($conn,$playerInfo);//最新の購入可能状態の取得
    $shopEquipItemMasterData = getShopEquipItemMasterData($conn,$shopEquipItemMasterId);
    if($shopEquipItemMasterData != false){
      if(checkShopEquipItemMasterData($conn,$shopEquipItemMasterData) == true){
        $equipItemMasterData = getEquipItemMasterData($conn,$shopEquipItemMasterData['equip_item_master_id']);
        $getPlayerItemForItemId = getPlayerItemDataForItemId($conn,$playerInfo,$shopEquipItemMasterData['pay_item_id']);
        if($equipItemMasterData != false && $getPlayerItemForItemId != false){
          if($shopEquipItemMasterData['price_val'] <= $getPlayerItemForItemId['item_val']){
            $newPlayerItem = ($getPlayerItemForItemId['item_val'] - $shopEquipItemMasterData['price_val']);
            if($newPlayerItem < 0){
              $newPlayerItem = 0;
            }
            try{
              $conn->beginTransaction(); //トランザクション開始
              $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($newPlayerItem,$playerInfo['player_index_id'],$getPlayerItemForItemId['item_id']));
              $sql = "SELECT * FROM player_equip_item WHERE player_index_id=? and equip_item_master_id=? FOR UPDATE";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($playerInfo['player_index_id'],$equipItemMasterData['id']));
              $checkPlayerEquipItem = $stmt->fetch(PDO::FETCH_ASSOC);
              if($checkPlayerEquipItem == false){ //所持していなかった場合
                $newEquipStatus = 1;
                $stmt = $conn -> prepare("INSERT INTO player_equip_item (player_index_id, equip_item_master_id, equip_status, num)
                VALUES (:player_index_id, :equip_item_master_id, :equip_status, :num)");
                $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
                $stmt->bindParam('equip_item_master_id', $equipItemMasterData['id'], PDO::PARAM_INT);
                $stmt->bindParam(':equip_status', $newEquipStatus, PDO::PARAM_INT);
                $stmt->bindParam(':num', $getNum, PDO::PARAM_INT);
                $stmt->execute();
              }
              else if(isset($checkPlayerEquipItem['num']) && isset($checkPlayerEquipItem['equip_item_master_id'])){ //所持していて、正しいデータの場合
                $sql = "UPDATE player_equip_item SET num=num+? WHERE player_index_id=? AND equip_item_master_id=?";
                $stmt = $conn->prepare($sql);
                $stmt->execute(array($getNum,$playerInfo['player_index_id'],$checkPlayerEquipItem['equip_item_master_id']));
              }
              $result = 0;
              $conn->commit(); //トランザクション終了
            }
            catch(Exception $e){
              $conn->rollBack();
              var_dump($e);
              $result = false;
            }
          }
          else{
            $result = 2;
          }
        }
      }
    }
  }
  return $result;
}

function skillItemPurchase($conn,$playerInfo,$shopSkillItemMasterId){ //0:正常 1:購入失敗 2:金額不足 3:既に入手済みのスキルだった。
  $result = 1;
  if($playerInfo != false){
    updatePlayerPurchaseFlag($conn,$playerInfo);//最新の購入可能状態の取得
    $shopSkillItemMasterData = getShopSkillItemMasterData($conn,$shopSkillItemMasterId);
    if($shopSkillItemMasterData != false){
      if(checkShopSkillItemMasterData($conn,$shopSkillItemMasterData) == true){
        $skillItemMasterData = getSkillMasterData($conn,$shopSkillItemMasterData['skill_master_id']);
        $getPlayerItemForItemId = getPlayerItemDataForItemId($conn,$playerInfo,$shopSkillItemMasterData['pay_item_id']);
        if($skillItemMasterData != false && $getPlayerItemForItemId != false){
          if($shopSkillItemMasterData['price_val'] <= $getPlayerItemForItemId['item_val']){
            $newPlayerItem = ($getPlayerItemForItemId['item_val'] - $shopSkillItemMasterData['price_val']);
            if($newPlayerItem < 0){
              $newPlayerItem = 0;
            }
            $sql = "SELECT * FROM player_skill WHERE player_index_id=? AND skill_master_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($playerInfo['player_index_id'],$skillItemMasterData['id']));
            $checkPlayerSkill = $stmt->fetch(PDO::FETCH_ASSOC);
            if($checkPlayerSkill == false){
              $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($newPlayerItem,$playerInfo['player_index_id'],$getPlayerItemForItemId['item_id']));
              $newSkillStatus = 0;
              $stmt = $conn -> prepare("INSERT INTO player_skill (player_index_id, skill_master_id, equip_status)
              VALUES (:player_index_id, :skill_master_id, :equip_status)");
              $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
              $stmt->bindParam('skill_master_id', $skillItemMasterData['id'], PDO::PARAM_INT);
              $stmt->bindParam(':equip_status', $newSkillStatus, PDO::PARAM_INT);
              $stmt->execute();
              $result = 0;
            }
            else{
              $result = 3;
            }
          }
          else{
            $result = 2;
          }
        }
      }
    }
  }
  return $result;
}

function cardItemPurchase($conn,$playerInfo,$shopCardItemMasterId, $getNum = 1){ //0:正常 1:購入失敗 2:金額不足
  $result = 1;
  if($playerInfo != false){
    updatePlayerPurchaseFlag($conn,$playerInfo);//最新の購入可能状態の取得
    $shopCardItemMasterData = getShopCardItemMasterData($conn,$shopCardItemMasterId);
    if($shopCardItemMasterData != false){
      if(checkShopCardItemMasterData($conn,$shopCardItemMasterData) == true){
        $cardItemMasterData = getCardMasterData($conn,$shopCardItemMasterData['card_master_id']);
        $getPlayerItemForItemId = getPlayerItemDataForItemId($conn,$playerInfo,$shopCardItemMasterData['pay_item_id']);
        if($cardItemMasterData != false && $getPlayerItemForItemId != false){
          if($shopCardItemMasterData['price_val'] <= $getPlayerItemForItemId['item_val']){
            $newPlayerItem = ($getPlayerItemForItemId['item_val'] - $shopCardItemMasterData['price_val']);
            if($newPlayerItem < 0){
              $newPlayerItem = 0;
            }
            $sql = "SELECT * FROM player_card WHERE player_index_id=? AND card_master_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($playerInfo['player_index_id'],$cardItemMasterData['id']));
            $checkPlayerCard = $stmt->fetch(PDO::FETCH_ASSOC);
            try{
              $conn->beginTransaction(); //トランザクション開始
              //通貨情報を更新
              $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=? FOR UPDATE";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($newPlayerItem,$playerInfo['player_index_id'],$getPlayerItemForItemId['item_id']));

              if($checkPlayerCard == false){ //所持していなかった場合
                $newCardStatus = 0;
                $stmt = $conn -> prepare("INSERT INTO player_card (player_index_id, card_master_id, num)
                VALUES (:player_index_id, :card_master_id, :num)");
                $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
                $stmt->bindParam(':card_master_id', $cardItemMasterData['id'], PDO::PARAM_INT);
                $stmt->bindParam(':num', $getNum, PDO::PARAM_INT);
                $stmt->execute();
                $result = 0;
              }
              else if(isset($checkPlayerCard['num']) && isset($checkPlayerCard['card_master_id'])){ //所持していて、データが正常の場合
                $sql = "UPDATE player_card SET num=num+? WHERE player_index_id=? AND card_master_id=?";
                $stmt = $conn->prepare($sql);
                $stmt->execute(array($getNum,$playerInfo['player_index_id'],$checkPlayerCard['card_master_id']));
                $result = 0;
                $conn->commit(); //トランザクション終了
              }
            }
            catch(Exception $e){
              $conn->rollBack();
              var_dump($e);
              $result = false;
            }
          }
          else{
            $result = 2;
          }
        }
      }
    }
  }
  return $result;
}

function itemItemPurchase($conn,$playerInfo,$shopItemItemMasterId){ //0:正常 1:購入失敗 2:金額不足
  $result = 1;
  if($playerInfo != false){
    updatePlayerPurchaseFlag($conn,$playerInfo);//最新の購入可能状態の取得
    $shopItemItemMasterData = getShopItemItemMasterData($conn,$shopItemItemMasterId);
    if($shopItemItemMasterData != false){
      if(checkShopItemItemMasterData($conn,$shopItemItemMasterData) == true){
        $itemItemMasterData = getItemIdData($conn,$shopItemItemMasterData['item_master_id']); //販売しているマネーID
        $getPlayerItemForItemId = getPlayerItemDataForItemId($conn,$playerInfo,$shopItemItemMasterData['pay_item_id']);
        if($itemItemMasterData != false && $getPlayerItemForItemId != false){
          if($shopItemItemMasterData['price_val'] <= $getPlayerItemForItemId['item_val']){
            $newPlayerItem = ($getPlayerItemForItemId['item_val'] - $shopItemItemMasterData['price_val']);
            if($newPlayerItem < 0){
              $newPlayerItem = 0;
            }
            try{
              $conn->beginTransaction(); //トランザクション開始
              $sql = "UPDATE player_item SET item_val=item_val - ? WHERE player_index_id=? AND item_id=? AND ? <= item_val";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($shopItemItemMasterData['price_val'],$playerInfo['player_index_id'],$getPlayerItemForItemId['item_id'],$shopItemItemMasterData['price_val']));
              $playerSellItem = transactionGetPlayerItemDataForItemId($conn,$playerInfo,$shopItemItemMasterData['item_master_id']); //販売しているマネーID
              if($playerSellItem != false){
                $newItemVal = ($shopItemItemMasterData['item_count'] + $playerSellItem['item_val']); //販売金額
                if($itemItemMasterData['item_max_val'] < $newItemVal){
                  $newItemVal = $itemItemMasterData['item_max_val'];
                  $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
                  $stmt = $conn->prepare($sql);
                  $stmt->execute(array($itemItemMasterData['item_max_val'],$playerInfo['player_index_id'],$shopItemItemMasterData['item_master_id'])); //購入した通過を更新
                }
                else{
                  $sql = "UPDATE player_item SET item_val=item_val+? WHERE player_index_id=? AND item_id=?";
                  $stmt = $conn->prepare($sql);
                  $stmt->execute(array($shopItemItemMasterData['item_count'],$playerInfo['player_index_id'],$shopItemItemMasterData['item_master_id'])); //購入した通過を更新
                }
                $result = 0;
              }
              $conn->commit(); //トランザクション終了
            }
            catch(Exception $e){
              $conn->rollBack();
              var_dump($e);
              $result = false;
            }
          }
          else{
            $result = 2;
          }
        }
      }
    }
  }
  return $result;
}

function checkPlayerPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId){
  $result = false;
  $purchaseFlagMasterData = getPurchaseFlagMasterData($conn,$purchaseFlagMasterId);
  if($purchaseFlagMasterData != false && $playerInfo != false){
    $sql = "SELECT * FROM player_purchase_flag WHERE player_index_id=? AND purchase_flag_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$purchaseFlagMasterData['id']));
    $selectPurchaseFlagMaster = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPurchaseFlagMaster != false){
      $result = true;
    }
  }
  return $result;
}

function selectPlayerPurchaseFlag($conn,$playerInfo,$purchaseFlagMasterId){
  $result = false;
  if($playerInfo != false){
    $purchaseFlagMasterData = getPurchaseFlagMasterData($conn,$purchaseFlagMasterId);
    if($purchaseFlagMasterData != false){
      $sql = "SELECT * FROM player_purchase_flag WHERE purchase_flag_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($purchaseFlagMasterData['id']));
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
    }
  }
  return $result;
}

//プレイヤーの購入可能フラグを取得する。
function getPlayerPurchaseFlags($conn,$playerIndexId){
  $sql = "SELECT * FROM player_purchase_flag WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//購入可能なアイテムだけを配列に残す
function replacePlayerSellItems($playerPurchaseFlags,$sellItems){
  $result = array();
  foreach ($sellItems as $key => $sellItem) {
    $purchaseIsOk = false; //購入フラグを発見できたかのフラグ
    foreach ($playerPurchaseFlags as $playerPurchase) {
      if(isset($sellItem['purchase_flag_master_id']) && isset($playerPurchase['purchase_flag_master_id'])){
        if((int)$sellItem['purchase_flag_master_id'] == (int)$playerPurchase['purchase_flag_master_id']){ //購入フラグに一致する内容があった。
          $purchaseIsOk = true;
        }
      }
    }
    if($purchaseIsOk == false){
      unset($sellItems[$key]);
    }
  }
  //Indexを詰める
  $result = array_values($sellItems);
  return $result;
}

//購入可能な商品かチェックする
function checkSellItem($conn,$playerInfo,$itemType,$itemId,$shopResult){
  $result = array();
  $result['purchase_result'] = 1; //購入結果 0:正常 1:購入失敗 2:お金が足りない
  $result['error_comment'] = ""; //エラーの場合に表示するコメント
  $result['result_player_item_data'] = false;
  if($shopResult != false){
    switch ($itemType) {
      case "cardItem":
      {
        if(isset($shopResult['shop_sell_card_items'])){
          foreach ($shopResult['shop_sell_card_items'] as $cardItem) {
            if($cardItem['card_master_id'] == $itemId){
              $result['purchase_result'] = cardItemPurchase($conn,$playerInfo,$cardItem['shop_card_item_id']);
              $result['error_comment'] = getResultPurchaseComment($result['purchase_result']); //エラーのコメントを設定
              if($result['purchase_result'] == 0){ //正常に購入出来た場合
                $result['result_player_item_data'] = getPlayerMoneyDatas($conn,$playerInfo['player_index_id']);
              }
            }
          }
        }
      }
        break;
      case "equipItem":
      {
        if(isset($shopResult['shop_sell_equip_items'])){
          foreach ($shopResult['shop_sell_equip_items'] as $equipItem) {
            if($equipItem['equip_item_master_id'] == $itemId){
              $result['purchase_result'] = equipItemPurchase($conn,$playerInfo,$equipItem['shop_equip_item_id']);
              $result['error_comment'] = getResultPurchaseComment($result['purchase_result']); //エラーのコメントを設定
              if($result['purchase_result'] == 0){ //正常に購入出来た場合
                $result['result_player_item_data'] = getPlayerMoneyDatas($conn,$playerInfo['player_index_id']);
              }
            }
          }
        }
      }
        break;
      case "itemItem":
      {
        if(isset($shopResult['shop_sell_items'])){
          foreach ($shopResult['shop_sell_items'] as $itemItem) {
            if($itemItem['item_master_id'] == $itemId){
              $result['purchase_result'] = itemItemPurchase($conn,$playerInfo,$itemItem['shop_item_id']);
              $result['error_comment'] = getResultPurchaseComment($result['purchase_result']); //エラーのコメントを設定
              if($result['purchase_result'] == 0){ //正常に購入出来た場合
                $result['result_player_item_data'] = getPlayerMoneyDatas($conn,$playerInfo['player_index_id']);
              }
            }
          }
        }
      }
        break;
      default:
        break;
    }
  }
  return $result;
}

function getResultPurchaseComment($resultPurchase){ //購入エラーのコメントを設定
  $result = "";
  switch ($resultPurchase) {
    case 0:
    $result = "";
      break;
    case 1:
    $result = "購入に失敗しました。";
      break;
    case 2:
    $result = "お金が足りません。";
      break;
    default:
    $result = "";
      break;
  }
  return $result;
}





































 ?>
