<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/skill/index.php';
include_once '../../module/card/index.php';
include_once '../../module/purchase/index.php';
include_once '../../module/item/index.php';
include_once '../../module/shop/index.php';
//$purchaseInsertFlag = insertPlayerPurchaseFlag($pdo,$PLAYER_INFO,3);
//print("購入フラグ挿入ステータス：".$purchaseInsertFlag."<br>");


$SHOP_MASTER_DATA = false;
insertPlayerShopFlag($pdo,$PLAYER_INFO,1); //利用ショップを解放
if(isset($_GET['shop_master_id'])){
  $SHOP_MASTER_DATA = checkPlayerShopFlag($pdo,$PLAYER_INFO,$_GET['shop_master_id']); //利用可能な店かチェックする。
}
updatePlayerPurchaseFlag($pdo,$PLAYER_INFO);//最新の購入可能商品を取得
if($SHOP_MASTER_DATA != false){
  print($SHOP_MASTER_DATA['shop_name']);
  $shopSellEquipItems = getShopSellEquipItems($pdo,$SHOP_MASTER_DATA['id']);
  foreach ($shopSellEquipItems as $shopEquipItem) {
    $itemIdData = getItemIdData($pdo,$shopEquipItem['pay_item_id']);
    if(checkShopEquipItemMasterData($pdo,$shopEquipItem) == true && $itemIdData != false){//アイテムが販売期間中かチェックする。
      if(checkPlayerPurchaseFlag($pdo,$PLAYER_INFO,$shopEquipItem['purchase_flag_master_id']) == true){
        $equipItemMasterData = getEquipItemMasterData($pdo,$shopEquipItem['equip_item_master_id']);
        print("<br>".$equipItemMasterData['item_name']."：価格：".$shopEquipItem['price_val'].$itemIdData['item_name']."：<a href=index.php?shop_master_id=".$SHOP_MASTER_DATA['id']."&shop_equip_item_master_id=".$shopEquipItem['id'].">購入する</a>");
        $sellLimitTime = getLimitSellTimeForPurchaseFlag($pdo,$PLAYER_INFO,$shopEquipItem['purchase_flag_master_id']);
        if($sellLimitTime != -1 && $sellLimitTime != 0){
          print("：残り販売時間(".$sellLimitTime.")<br>");
        }
        else{
          print("<br>");
        }
      }
    }
  }


  // $shopSellSkillItems = getShopSellSkillItems($pdo,$SHOP_MASTER_DATA['id']);
  // foreach ($shopSellSkillItems as $shopSkillItem) {
  //   $itemIdData = getItemIdData($pdo,$shopSkillItem['pay_item_id']);
  //   if(checkShopSkillItemMasterData($pdo,$shopSkillItem) == true && $itemIdData != false){//アイテムが販売期間中かチェックする。
  //     if(checkPlayerPurchaseFlag($pdo,$PLAYER_INFO,$shopSkillItem['purchase_flag_master_id']) == true){
  //       $skillItemMasterData = getSkillMasterData($pdo,$shopSkillItem['skill_master_id']);
  //       print("<br>".$skillItemMasterData['skill_name']."：価格：".$shopSkillItem['price_val'].$itemIdData['item_name']."：<a href=index.php?shop_master_id=".$SHOP_MASTER_DATA['id']."&shop_skill_item_master_id=".$shopSkillItem['id'].">購入する</a>");
  //       $sellLimitTime = getLimitSellTimeForPurchaseFlag($pdo,$PLAYER_INFO,$shopSkillItem['purchase_flag_master_id']);
  //       if($sellLimitTime != -1 && $sellLimitTime != 0){
  //         print("：残り販売時間(".$sellLimitTime.")<br>");
  //       }
  //       else{
  //         print("<br>");
  //       }
  //     }
  //   }
  // }


  $shopSellCardItems = getShopSellCardItems($pdo,$SHOP_MASTER_DATA['id']);
  foreach ($shopSellCardItems as $shopCardItem) {
    $itemIdData = getItemIdData($pdo,$shopCardItem['pay_item_id']);
    if(checkShopCardItemMasterData($pdo,$shopCardItem) == true && $itemIdData != false){//アイテムが販売期間中かチェックする。
      if(checkPlayerPurchaseFlag($pdo,$PLAYER_INFO,$shopCardItem['purchase_flag_master_id']) == true){
        $cardItemMasterData = getCardMasterData($pdo,$shopCardItem['card_master_id']);
        print("<br>".$cardItemMasterData['card_name']."：価格：".$shopCardItem['price_val'].$itemIdData['item_name']."：<a href=index.php?shop_master_id=".$SHOP_MASTER_DATA['id']."&shop_card_item_master_id=".$shopCardItem['id'].">購入する</a>");
        $sellLimitTime = getLimitSellTimeForPurchaseFlag($pdo,$PLAYER_INFO,$shopCardItem['purchase_flag_master_id']);
        if($sellLimitTime != -1 && $sellLimitTime != 0){
          print("：残り販売時間(".$sellLimitTime.")<br>");
        }
        else{
          print("<br>");
        }
      }
    }
  }

  $shopSellItemItems = getShopSellItemItems($pdo,$SHOP_MASTER_DATA['id']);
  foreach ($shopSellItemItems as $shopItemItem) {
    $itemIdData = getItemIdData($pdo,$shopItemItem['pay_item_id']);
    if(checkShopItemItemMasterData($pdo,$shopItemItem) == true && $itemIdData != false){//アイテムが販売期間中かチェックする。
      if(checkPlayerPurchaseFlag($pdo,$PLAYER_INFO,$shopItemItem['purchase_flag_master_id']) == true){
        $itemMasterData = getItemIdData($pdo,$shopItemItem['item_master_id']);
        print("<br>".$itemMasterData['item_name']."(".$shopItemItem['item_count']."個)：価格：".$shopItemItem['price_val'].$itemIdData['item_name']."：<a href=index.php?shop_master_id=".$SHOP_MASTER_DATA['id']."&shop_item_master_id=".$shopItemItem['id'].">購入する</a>");
        $sellLimitTime = getLimitSellTimeForPurchaseFlag($pdo,$PLAYER_INFO,$shopItemItem['purchase_flag_master_id']);
        if($sellLimitTime != -1 && $sellLimitTime != 0){
          print("：残り販売時間(".$sellLimitTime.")<br>");
        }
        else{
          print("<br>");
        }
      }
    }
  }
}
else{
  print("ショップデータの取得に失敗しました。");
}

print("<br><a href=../myPage/index.php>マイページに戻る</a><br>");




































 ?>
