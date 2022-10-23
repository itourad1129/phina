<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/item/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/statusUpController/index.php';
include_once '../../module/talk/index.php';
include_once '../../module/asset/index.php'; //アセットの読み込み
include_once '../../module/battle/battleTest2.php'; //テスト
include_once '../../module/redisConnect/index.php'; //テスト

$partyDataSample = array();
$partyDataSample['party_formation_id'] = 1;

$partyInstance0 = new BattlePartyInstance($pdo,0,$partyDataSample);
$partyInstance1 = new BattlePartyInstance($pdo,1,$partyDataSample);

$cardMasterDatas = getCardMasterDatas($pdo);
$buffMasterDatas = getBuffMasterDatas($pdo);
$equipItemMasterDatas = getEquipItemMasterDatas($pdo);
$equipItemParamMasterDatas = getEquipItemParamMasterDatas($pdo);
$cardRankMasterDatas = getRankMasterDatas($pdo);

$masterDatas = array();
$masterDatas['card_master_datas' ] = $cardMasterDatas;
$masterDatas['buff_master_datas'] = $buffMasterDatas;
$masterDatas['equip_item_master_datas'] = $equipItemMasterDatas;
$masterDatas['equip_item_param_master_datas'] = $equipItemParamMasterDatas;
$masterDatas['card_rank_master_datas'] = $cardRankMasterDatas;

$appDefine = new AppDefine($ENV);

$battleInstance = new BattleInstance($pdo,1,$masterDatas);

$battleEntryData16 = $battleInstance->CreateBattleEntryDataForPlayerData(16,$partyInstance0);
$battleEntryData18 = $battleInstance->CreateBattleEntryDataForPlayerData(18,$partyInstance0);
$battleEntryData15 = $battleInstance->CreateBattleEntryDataForPlayerData(15,$partyInstance0);

$battleEntryEnemy1 = $battleInstance->CreateBattleEntryDataForEnemyData(1,$partyInstance1,$appDefine->STATUS_IDS);
$battleEntryEnemy2 = $battleInstance->CreateBattleEntryDataForEnemyData(2,$partyInstance1,$appDefine->STATUS_IDS);
$battleEntryEnemy3 = $battleInstance->CreateBattleEntryDataForEnemyData(3,$partyInstance1,$appDefine->STATUS_IDS);

//var_dump($battleEntryData16);
//var_dump("-----------------------------------------------------------------------------");
//var_dump($battleEntryData18);

$battleInstance->AddEntryData($battleEntryData16);
$battleInstance->AddEntryData($battleEntryData18);
$battleInstance->AddEntryData($battleEntryData15);

$battleInstance->AddEntryData($battleEntryEnemy1);
$battleInstance->AddEntryData($battleEntryEnemy2);
$battleInstance->AddEntryData($battleEntryEnemy3);

//var_dump("カウント".count($battleInstance->entryDatas));

// foreach ($battleInstance->entryDatas as $entryData) {
//   var_dump($entryData->);
// }

//ここまでで、戦闘画面初期状態を表示

$battleInstance->DrawPrizeCard();

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->prizeCards);
}

//自分と仲間のアクションを登録(テストで登録)
$movePos = array();
$movePos['x'] = 1;
$movePos['y'] = 1;
//construct($type,$id,$isMove = 0,$movePos = null,$isUseCard = 0, $useCardId = -1)
$adAction16 = new AddAction(0,16,0,$movePos,1,100);
$adAction18 = new AddAction(0,18,0,$movePos,1,100);
$adAction15 = new AddAction(0,15,0,$movePos,1,100);

$autoActionEnemy1 = new AutoAction($battleInstance,$battleEntryEnemy1,0);

$addActions = array();
$addActions[0] = $adAction16;
$addActions[1] = $adAction18;
$addActions[2] = $adAction15;
$addActions[3] = $autoActionEnemy1->addAction;

//アクションを上書き
$battleInstance->UpdateActions($addActions);

$battleInstance->BattleStart();

$biControle = new BattleInstanceControle();

$instanceId = $biControle->SaveBattleInstance($redis,$battleInstance);

unset($battleInstance);

$battleInstance = $biControle->GetBattleInstance($pdo,$redis,$instanceId);

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->name.":".$entryData->pos['x']."---".$entryData->pos['y']."<br>");
}

$effectArea = new EffectArea($battleInstance->entryDatas[0]->pos,$battleInstance->entryDatas[0]->direction,1);
$areas = $effectArea->GetArea();
var_dump("mypos:");
var_dump($battleInstance->entryDatas[0]->pos);
$testResultDirections = $battleInstance->GetMoveDirectionPos($battleInstance->entryDatas[0],$areas,'x_2','y_2');
var_dump($testResultDirections);

// foreach ($battleInstance->entryDatas as $entryData) {
//   echo "hp:".$entryData->hp." uniqNo: ".$entryData->uniqueNo."<br>";
// }

//var_dump($battleInstance);
//var_dump($battleInstance->battleLog);

$adAction16 = new AddAction(0,16,0,$movePos,1,100);
$adAction18 = new AddAction(0,18,0,$movePos,1,100);
$adAction15 = new AddAction(0,15,0,$movePos,1,101);

unset($autoActionEnemy1);
$autoActionEnemy1 = new AutoAction($battleInstance,$battleInstance->entryDatas[3],0);

$addActions = array();
$addActions[0] = $adAction16;
$addActions[1] = $adAction18;
$addActions[2] = $adAction15;
$addActions[3] = $autoActionEnemy1->addAction;

//アクションを上書き
$battleInstance->UpdateActions($addActions);

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->prizeCards);
}

$battleInstance->BattleStart();

$instanceId = $biControle->SaveBattleInstance($redis,$battleInstance);

unset($battleInstance);

$battleInstance = $biControle->GetBattleInstance($pdo,$redis,$instanceId);

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->name.":".$entryData->pos['x']."---".$entryData->pos['y']."<br>");
}

// foreach ($battleInstance->entryDatas as $entryData) {
//   echo "hp:".$entryData->hp." uniqNo: ".$entryData->uniqueNo."<br>";
// }

//var_dump($battleInstance->battleLog->battleLog[1]);


//var_dump($battleInstance->battleLog);

unset($autoActionEnemy1);
$autoActionEnemy1 = new AutoAction($battleInstance,$battleInstance->entryDatas[3],0);

$addActions = array();
$addActions[0] = $adAction16;
$addActions[1] = $adAction18;
$addActions[2] = $adAction15;
$addActions[3] = $autoActionEnemy1->addAction;

//アクションを上書き
$battleInstance->UpdateActions($addActions);

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->prizeCards);
}

$battleInstance->BattleStart();

$instanceId = $biControle->SaveBattleInstance($redis,$battleInstance);

unset($battleInstance);

$battleInstance = $biControle->GetBattleInstance($pdo,$redis,$instanceId);

foreach ($battleInstance->entryDatas as $entryData) {
  var_dump($entryData->name.":".$entryData->pos['x']."---".$entryData->pos['y']."<br>");
}

//var_dump($battleInstance->battleLog->battleLog[1]);


// foreach ($battleInstance->entryDatas as $entryData) {
//   echo "hp:".$entryData->hp." uniqNo: ".$entryData->uniqueNo."<br>";
// }

//var_dump($battleInstance->battleLog->battleLog);


//$buffMasterDatas = getBuffMasterDatas($pdo);

//$battleBuff = new BattleBuff(1,$battleInstance->entryDatas[0]);

//$battleBuff->AddBuff();

//var_dump($battleInstance->entryDatas[0]->GetBaseStatus());
//$list = array();

//$list['my_pos'] = array('x' => 2,'y' => 3);
//$list['effect_area_type'] = 4;

//$area = $effectArea->GetArea();

// foreach ($area as $row) {
//   echo "x:".$row['x']."   y:".$row['y']."<br>";
// }
//$cardMasterData = getCardMasterData($pdo,100);
//$cardData = new CardData($cardMasterData);
//var_dump($cardData->skillData);
//$battleLogData = new BattleLog($battleInstance->instanceId);
//$battleAction = new BattleAction($pdo,$battleInstance,$battleEntryData16,$battleEntryData18,$battleLogData,$cardData);
//var_dump($battleAction->init);
//$battleAction->UseCard();
//var_dump($battleInstance->entryDatas[1]->buffs[0]->nowTurn);
//$battleInstance->entryDatas[1]->buffs[0]->ExeBuff();
//$battleInstance->entryDatas[1]->buffs[1]->ExeBuff();
//$battleInstance->entryDatas[1]->buffs[2]->ExeBuff();
//$battleInstance->entryDatas[1]->buffs[3]->ExeBuff();
//var_dump($battleInstance->entryDatas[1]->buffs[0]->nowTurn);

//$battleInstance->SetActionList();
