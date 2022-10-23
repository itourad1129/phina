<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/itemBox/index.php';
?>

<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>アイテムボックス</title>
  </head>
    <body>
      <center>
        <h1>アイテムボックス</h1>
        <br>＜装備中＞<br>
      <?php
      $equipCategoyIds = getEquipCategoryIds($pdo);
      $playerEquipItems = getPlayerEquipItem($pdo,$PLAYER_INFO['player_index_id']);
      $resultPlayerEquipItems = changePlayerEquipItemsForEquipItemMasterData($pdo,$playerEquipItems);
      foreach ($equipCategoyIds as $equipCategoryId) {
        print("<br>【".$equipCategoryId['equip_name']."】");
        foreach ($resultPlayerEquipItems as $plEquipItem) {
          if($plEquipItem['equip_category_id'] == $equipCategoryId['id']){
            // /$plEquipItem['equip_status']
            //$plEquipItem['player_equip_item_index_id']
            print("：".$plEquipItem['item_name']."：
            <a href=index.php?remove_playerEquipItemIndexId=".$plEquipItem['player_equip_item_index_id'].">はずす</a><br>");
          }
        }
      }
      print("<br>所持品<br>");
      $equipCategoyIds = getEquipCategoryIds($pdo);
      $playerEquipItems = getPlayerItemInventory($pdo,$PLAYER_INFO['player_index_id']);
      $resultPlayerEquipItems = changePlayerEquipItemsForEquipItemMasterData($pdo,$playerEquipItems);
      foreach ($equipCategoyIds as $equipCategoryId) {
        print("<br>【".$equipCategoryId['equip_name']."】<br>");
        foreach ($resultPlayerEquipItems as $plEquipItem) {
          if($plEquipItem['equip_category_id'] == $equipCategoryId['id']){
            // /$plEquipItem['equip_status']
            //$plEquipItem['player_equip_item_index_id']
            print("<br>・".$plEquipItem['item_name']."：
            <a href=index.php?equip_playerEquipItemIndexId=".$plEquipItem['player_equip_item_index_id'].">装備
            </a>：<a href=index.php?sell_playerEquipItemIndexId=".$plEquipItem['player_equip_item_index_id'].">売却</a><br>");
          }
        }
      }
      print("<br><a href=../myPage/index.php>戻る</a><br>");

































       ?>
     </center>
    </body>
</html>
