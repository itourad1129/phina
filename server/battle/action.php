<?php

class Action { //行動管理クラス

  public $init = false;
  public $isMove = 0; //移動を行うか 1:行う
  public $movePos = null;
  public $myEntryData = null; //自分のエントリーデータ
  public $isUseCard = 0; //カードを発動するか 1:発動
  public $useCardId = -1; //使用するカードID 無ければ -1
  public $isChangeDirection = 0; //方向転換を行ったか。 1:行った
  public $changeDirection = -1; //変更する方向 無ければ-1
  public $uniqueNo = -1; //行動者を識別するための、ユニーク番号

  function __construct($isMove = 0, $movePos = null, $isUseCard = 0, $useCardId = -1, $isChangeDirection = 0, $changeDirection = -1){
    $this->isMove = $isMove;
    $this->movePos = $movePos;
    $this->isUseCard = $isUseCard;
    $this->useCardId = $useCardId;
    $this->isChangeDirection = $isChangeDirection;
    $this->changeDirection = $changeDirection;
    $this->init = true;
  }

  function SetMyActionData($uniqueNo,$battleInstance){ //自分のデータを作成
    $this->uniqueNo = $uniqueNo; //ユニーク番号をセット
    if($battleInstance != null){
      $this->myEntryData = $battleInstance->entryDatas[$uniqueNo];
    }
  }

  function UseCard($battleInstance){ //カードを使用
    if($battleInstance != null && $this->myEntryData != null){
      $cardMasterData = $this->GetCardMasterData($battleInstance->cardMasterDatas);
      if($cardMasterData != false){
        $cardData = new CardData($cardMasterData);
        $cardUseCheck = $battleInstance->CheckUseCard($this->useCardId,$this->myEntryData,$cardMasterData);
        if($cardUseCheck == true){ //カードの発動が可能
          //カードの発動を受ける対象のエントリーデータを取得
          $hitCheck = false; //1度でも発動したか
          $cardTargets = $battleInstance->GetCardEffectTargets($cardData,$this->myEntryData);
          foreach ($cardTargets as $targetData) { //発動対象者にカードを発動
            $battleAction = new BattleAction($this->myEntryData,$targetData['entry_data'],$targetData['back_attack'],$cardData);
            if($battleAction->init == true){
              $hitCheck = true;
              $battleAction->UseCard($battleInstance); //カードを発動
            }
            unset($battleAction);
          }
          //発動したが、1度も命中しなければ、ミス扱い。
          if($hitCheck == false){
            $list['log_type'] = 5;
            $list['turn'] = $battleInstance->battleTurn;
            $list['unique_no'] = $this->myEntryData->uniqueNo;
            $list['target_unique_no'] = $this->myEntryData->uniqueNo;
            $list['target_pos_x'] = $this->myEntryData->pos['x'];
            $list['target_pos_y'] = $this->myEntryData->pos['y'];
            $list['my_pos_x'] = $this->myEntryData->pos['x'];
            $list['my_pos_y'] = $this->myEntryData->pos['y'];
            $list['card_id'] = $cardData->id;
            $battleInstance->battleLog->AddActionMissLog($list); //行動ミスログを挿入
          }
          //使用したコストを消費
          $this->UseBp($cardData);
        }
      }
    }
  }

  function Move($battleInstance){ //移動
    if($this->movePos != null && $battleInstance != null && $this->myEntryData != null){ //チェック
      $battleAction = new BattleAction($this->myEntryData,$this->myEntryData,0,null);
      $moveResult = $battleAction->Move($this->movePos['x'],$this->movePos['y'],$battleInstance); //移動を実行
    }
  }

  function ChangeDirection(){
    if($this->isChangeDirection != 0 && $this->changeDirection != -1) $this->myEntryData->direction = $this->changeDirection;
    if($this->myEntryData->direction == 3) $this->myEntryData->directionDisp = 0;
    if($this->myEntryData->direction == 1) $this->myEntryData->directionDisp = 1;
  }

  function GetCardMasterData($cardMasterdatas){ //カードのマスターデータを取得
    foreach ($cardMasterdatas as $cardMasterData) {
      if($this->useCardId == $cardMasterData['id']){
        return $cardMasterData;
        break;
      }
    }
    return false;
  }

  //BPを消費
  function UseBp(CardData $cardData){
    $useBp = $cardData->cost;
    $updateBp = $this->myEntryData->bp - $useBp;
    if($updateBp < 0) $updateBp = 0;
    $this->myEntryData->bp = $updateBp;
  }
}
