<?php

if(isset($_GET['shop_equip_item_master_id'])){
  if(getShopEquipItemMasterData($pdo,$_GET['shop_equip_item_master_id']) != false){
    $PURCHASE_RESULT = equipItemPurchase($pdo,$PLAYER_INFO,$_GET['shop_equip_item_master_id']);
    if($PURCHASE_RESULT == 0){
      print("アイテムを購入しました。<br>");
    }
    else if($PURCHASE_RESULT == 2){
      print("お金が足りません。<br>");
    }
    else{
      print("アイテムの購入に失敗しました。<br>");
    }
  }
}

if(isset($_GET['shop_skill_item_master_id'])){
  if(getShopSkillItemMasterData($pdo,$_GET['shop_skill_item_master_id']) != false){
    $PURCHASE_RESULT = skillItemPurchase($pdo,$PLAYER_INFO,$_GET['shop_skill_item_master_id']);
    if($PURCHASE_RESULT == 0){
      print("スキルを購入しました。<br>");
    }
    else if($PURCHASE_RESULT == 2){
      print("お金が足りません。<br>");
    }
    else if($PURCHASE_RESULT == 3){
      print("既に入手済みのスキルです。<br>");
    }
    else{
      print("スキルの購入に失敗しました。<br>");
    }
  }
}

if(isset($_GET['shop_card_item_master_id'])){
  if(getShopCardItemMasterData($pdo,$_GET['shop_card_item_master_id']) != false){
    $PURCHASE_RESULT = cardItemPurchase($pdo,$PLAYER_INFO,$_GET['shop_card_item_master_id']);
    if($PURCHASE_RESULT == 0){
      print("ロールを購入しました。<br>");
    }
    else if($PURCHASE_RESULT == 2){
      print("お金が足りません。<br>");
    }
    else if($PURCHASE_RESULT == 3){
      print("既に入手済みのスキルです。<br>");
    }
    else{
      print("ロールの購入に失敗しました。<br>");
    }
  }
}

if(isset($_GET['shop_item_master_id'])){
  if(getShopItemItemMasterData($pdo,$_GET['shop_item_master_id']) != false){
    $PURCHASE_RESULT = itemItemPurchase($pdo,$PLAYER_INFO,$_GET['shop_item_master_id']);
    if($PURCHASE_RESULT == 0){
      print("通貨を購入しました。<br>");
    }
    else if($PURCHASE_RESULT == 2){
      print("お金が足りません。<br>");
    }
    else{
      print("通貨の購入に失敗しました。<br>");
    }
  }
}
































































































 ?>
