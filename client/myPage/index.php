<?php
include '../../module/dbConnect/index.php';
include '../../module/sessionCheck/index.php';
include '../../module/playerData/index.php';
include '../../module/staminaCount/index.php';
include '../../module/vitalityCount/index.php';
include '../../module/item/index.php';
include '../../module/levelUpController/index.php';
include '../../module/statusUpController/index.php';
include '../../module/card/index.php';
include '../../module/skill/index.php';
include '../../module/battle/index.php';
var_dump($PLAYER_STATUS);
print("<br>:装備時のステータス");
var_dump(equipStatusUpdate($pdo,$PLAYER_STATUS,$PLAYER_INFO['player_index_id']));
//getPlayerExp($pdo,$PLAYER_INFO,90000);
print("<br>");
var_dump(getActivePlayerCard($pdo, $PLAYER_INFO));
print("<br>");
$statusPoint = getStatusPoint($pdo,$PLAYER_INFO);
print("振り分け回数：".$statusPoint."<br>");
if($statusPoint != 0){
  //createPlayerStatusUp($pdo,$PLAYER_INFO,1);
}
print("<br>");
$skillMasterData = getSkillMasterData($pdo,1);
//$damage = getPlayerDamage($pdo,$PLAYER_STATUS,$skillMasterData,$PLAYER_INFO['player_index_id'],0);
//$def = getPlayerDef($pdo,$PLAYER_STATUS,$skillMasterData,$PLAYER_INFO['player_index_id'],$STATUS_IDS);
//$criticalFlag = getCriticalFlag($pdo,$PLAYER_STATUS,136,$STATUS_ID_LUCK);
$vitalityPenalty = getVitalityPenalty($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_STATUS,$STATUS_ID_VITALITY);
if($vitalityPenalty != false){
  $vitalityPenaltyFlag = "true";
}
else{
  $vitalityPenaltyFlag = "false";
}
//print("Def合計：".$def."<br>");
print("生命力低下ペナルティー：".$vitalityPenaltyFlag."<br>");
$penaltyStatus = updatePlayerStatusPenalty($pdo,$PLAYER_STATUS,$STATUS_ID_VITALITY);
//updatePlayerOverKill($pdo,$PLAYER_INFO['player_index_id'],$STATUS_ID_VITALITY,-100000);
$agilityBonus = getAgilityBonus($pdo,1200,1200);
print("素早さボーナス：".$agilityBonus."<br>");

var_dump($penaltyStatus);
updatePlayerStamina($pdo,$PLAYER_INFO,$PLAYER_STATUS,$STATUS_ID_STAMINA);
updatePlayerVitality($pdo,$PLAYER_INFO,$PLAYER_STATUS,$STATUS_ID_VITALITY);
print("<br>整形後のステータス");
var_dump(replaceStatus($pdo,$PLAYER_STATUS));
print("<br>");
$enemyData = getEnemyData($pdo,1);
$replacePlayerStatus = replaceStatus($pdo,$PLAYER_STATUS);
//$resultItem = itemExecute($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_STATUS,10,1,$STATUS_IDS['STM'],$STATUS_IDS['VIT']);
//print("アイテム結果:".$resultItem);
//enemyBattle($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_INFO,$PLAYER_MASTER['player_name'],$enemyData,1,$enemyData['enemy_name'],$replacePlayerStatus,1,$STATUS_IDS);
// print("プレイヤー名：".$PLAYER_MASTER['player_name']."<br>");
// print("プレイヤーID：".$PLAYER_MASTER['player_id']."<br>");
// print("性別：".$PLAYER_INFO['player_sex']."<br>");
// print("プレイヤークラスID：".$PLAYER_INFO['player_class_id']."<br>");
print("<br><a href=../shop/index.php?shop_master_id=1>ショップ</a>");
print("<br><a href=../itemBox/index.php>アイテムボックス</a>");
print("<br><a href=../skill/index.php>スキル一覧</a>");
print("<br><a href=../trainingRoom/index.php>訓練所</a>");
print("<br><a href=../story/index.php>メインストーリー</a>");



























































?>
