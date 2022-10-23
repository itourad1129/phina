<?php

class BattleBuff { //バフを生成
  public $buffData = null;
  public $buffId = -1;
  public $nowTurn = 0; //現在の残り継続可能ターン数
  public $init = false;
  function __construct($addBuffId,$buffMasterDatas){ //buff_master テーブルのデータ
    $this->buffId = $addBuffId;
    if($this->buffId != -1){
       $this->buffData = new BuffData($this->buffId,$buffMasterDatas);
      if($this->buffData->init == true) $this->init = true;
    }
  }

  function AddBuff($battleEntryData){ //バフを付与
    if($this->init == false) return false;
    $updateFlag = false;
    foreach ($battleEntryData->buffs as &$buff) {
      if($buff->buffId == $this->buffId){ //既に付与されたバフだった場合
        $buff->turn = $this->buffData->turn; //継続ターンを更新
        $updateFlag = true;
        break;
      }
    }
    //unset($buff);
    if($updateFlag == false){ //新規追加のバフ
      $index = count($battleEntryData->buffs);
      $battleEntryData->buffs[$index] = $this;
      $battleEntryData->buffs[$index]->nowTurn = $this->buffData->turn;
    }
  }

  function ExeBuff($battleInstance,$battleEntryData){ //バフを実行
    $this->nowTurn = $this->nowTurn - 1; //バフを実行したため、残り継続ターン数を更新
    $buff = $this->buffData;
    for ($i=0; $i < count($buff->updateStatusTypes); $i++) { //ステータス変動タイプ分回す
      $type = (int)$buff->updateStatusTypes[$i];
      $statusId = (int)$buff->statusIds[$i];
      $param = (int)$buff->updateParams[$i];
      switch ($type) {
        case 0: //通常上昇
        {
          //ステータス取得時に処理されるため、必要な処理は特になし。
        }
        break;
        case 1: //通常下降
        {
          //ステータス取得時に処理されるため、必要な処理は特になし。
        }
        break;
        case 2: //継続上昇
        {
          if($statusId == 1) $this->HpUpdate($battleInstance,$battleEntryData,$param,$type);
        }
        break;
        case 3: //継続下降
        {
          if($statusId == 1) $this->HpUpdate($battleInstance,$battleEntryData,$param * -1,$type);
        }
        break;
        default:
        break;
      }
    }
  }

  function HpUpdate($battleInstance,$battleEntryData,$hpNum,$updateStatusType){ //HPを更新
    $kill= 0; //倒したか 1:倒した
    $prevHp = $battleEntryData->hp;//変更前のHP
    $nowHp = $battleEntryData->hp;//変更後のHP
    $maxHp = $battleEntryData->GetStatusTotal(1); //最大HP
    if($battleEntryData->isDead == true || $battleEntryData->hp == 0) return 0; //死亡状態の場合はHP更新を中止
    $updateHp = $battleEntryData->hp + $hpNum;
    if($maxHp < $updateHp) $updateHp = $maxHp; //最大HPを超えていた場合
    if($updateHp <= 0){ //死亡状態
      $updateHp = 0;
      $kill = 1;
      $battleEntryData->hp = 0;
      $battleEntryData->isDead = true;
      //生命力減少
      $var1 = $updateHp * -1;
      $var2 = (int)round(($var1 / $maxHp) * 100);
      $battleEntryData->decVitality = $var2;
    }
    else{
      $battleEntryData->hp = $updateHp;
    }
    $nowHp = $updateHp;
    //ログを挿入
    $list = array();
    $list['log_type'] = 4;
    $list['unique_no'] = $battleEntryData->uniqueNo;
    $list['target_unique_no'] = $battleEntryData->uniqueNo;
    $list['turn'] = $battleInstance->battleTurn;
    $list['buff_name'] = $this->buffData->name;
    $list['hit_point'] = $hpNum;
    $list['kill'] = $kill;
    $list['max_hp'] = $maxHp;
    $list['prev_hp'] = $prevHp;
    $list['now_hp'] = $nowHp;
    $list['update_status_type'] = $updateStatusType;
    $list['effect_image_id'] = $this->buffData->effectImageId;
    $list['target_pos_x'] = $battleEntryData->pos['x'];
    $list['target_pos_y'] = $battleEntryData->pos['y'];
    $list['my_pos_x'] = $battleEntryData->pos['x'];
    $list['my_pos_y'] = $battleEntryData->pos['y'];
    $battleInstance->battleLog->AddBuffExeLog($list);
  }

}
