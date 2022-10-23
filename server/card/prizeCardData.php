<?php

//プライズカード関連の処理

class PrizeCardData {
  public $init = false;
  public $cardMasterDatas = array();
  public $cardRankMasterDatas = array();
  function __construct($cardMasterDatas,$cardRankMasterDatas){ //card_master テーブルのデータ
    $this->cardMasterDatas = $cardMasterDatas;
    $this->cardRankMasterDatas = $cardRankMasterDatas;
    $this->init = true;
  }

  function Draw(BattleInstance $battleInstance,BattleEntryData $battleEntryData){ //プライズカードを引く
    $result = "";
    //運の数値により、レアカードを引き当てる確率を変更
    //敵チームの平均の運を取得
    $enemyCount = 0;
    $enemyLuck = 0;
    foreach ($battleInstance->entryDatas as $entryData) {
      if($entryData->partyInstance->teamNo == $battleEntryData->partyInstance->teamNo) continue;
      $enemyCount ++;
      $enemyLuck = $enemyLuck + $entryData->GetStatusTotal(10);
    }
    $LuckAve = round($enemyLuck / $enemyCount);

    $myLuckPoint = round(($battleEntryData->GetStatusTotal(10) / $LuckAve) * 100);

    //デフォルトドローランクテーブル
    $drawRankTable = array(1,1,1,1,1,2,2,3);
    $maxDrawRank = 5; //ドローできる最大ランク
    //ランクアップ確率
    $rankUp = 15;
    $maxRank = 50;
    $minRank = 5;

    //上昇率結果
    $resultRankUp = round($rankUp * ($myLuckPoint * 0.01));
    if($maxRank < $resultRankUp) $resultRankUp = $maxRank;
    if($resultRankUp < $minRank) $resultRankUp = $minRank;
    //各ランクを確率により上昇させる。
    for ($i=0; $i < count($drawRankTable); $i++) {
      $upFlag = true;
      while($upFlag == true){
        $rot = rand(1,100);
        if($rot <= $resultRankUp){
          $drawRankTable[$i] = $drawRankTable[$i] + 1;
          if($maxDrawRank <= $drawRankTable[$i]){
            $upFlag = false;
            break;
          }
        }
        else $upFlag = false;
      }
    }
    //現在引けるカードを取得
    $drawCardDatas = $this->GetDrawCardDatas($battleEntryData);

    //引いたカードを確定
    for ($i=0; $i < count($drawRankTable); $i++) {
      $drawTableCount = count($drawCardDatas[$drawRankTable[$i]]);
      if($drawTableCount == 0) continue;
      $drawIndex = rand(0,$drawTableCount - 1);
      $drawCardMasterData = $drawCardDatas[$drawRankTable[$i]][$drawIndex];
      if($result == "") $result = $drawCardMasterData['id'];
      else $result = $result.",".$drawCardMasterData['id'];
    }
    return $result;
  }

  function GetDrawCardDatas(BattleEntryData $battleEntryData){ //ドロー可能なカードを取得
    $result = array();
    //結果配列を初期化
    foreach ($this->cardRankMasterDatas as $cardRankMaster) {
      $result[(int)$cardRankMaster['rank']] = array();
    }
    $nowBp = $battleEntryData->bp;
    $myClassId = $battleEntryData->classId;
    foreach ($this->cardMasterDatas as $cardMasterData) {
      if($nowBp < $cardMasterData['cost']) continue;
      if($cardMasterData['prize_draw'] == 0) continue;
      if($myClassId == $cardMasterData['class_id'] || $cardMasterData['class_id'] == 1){
        if(isset($result[(int)$cardMasterData['card_rank']])){
          array_push($result[(int)$cardMasterData['card_rank']],$cardMasterData);
        }
      }
    }
    return $result;
  }

}
