<?php

//行動管理クラス

class BattleAction {

  const BA_ATK_RATE = 1.5; //バックアタックボーナス(物理)
  const BA_MAGIC_ATK_RATE = 1.3; //バックアタックボーナス(魔法)
  public $init = false; //初期化フラグ
  public $myBattleEntryData = null; //発動側の基本ステータス
  public $targetBattleEntryData = null; //発動される側のステータス
  public $cardData = null; //発動したカードデータ
  public $backAttack = 0; //バックアタックが可能か 1:可能

  function __construct(BattleEntryData $myBattleEntryData,
  BattleEntryData $targetBattleEntryData,
  $backAttack,
  CardData $cardData = null){
    $this->backAttack = $backAttack;
    $this->myBattleEntryData = $myBattleEntryData;
    $this->targetBattleEntryData = $targetBattleEntryData;
    $this->cardData = $cardData;
    if($this->myBattleEntryData != null && $this->targetBattleEntryData != null) {
      $this->init = true;
    }
  }

  function UseCard($battleInstance){ //カードを使用
    $result = array();
    $result['error'] = 0;
    $result['error_comment'] = "";
    if($this->cardData != null){
      $skillData = $this->cardData->skillData; //スキルデータ
      if($skillData != null){
        $this->Attack($battleInstance); //攻撃処理があれば攻撃実行
        //var_dump($battleInstance->battleTurn);
        $this->Heal($battleInstance); //回復処理があれば回復実行
        $this->Buff($battleInstance); //バフがあればバフを実行
      }
    }

    return $result;
  }

  function Attack($battleInstance){ //攻撃を実行
    $skillData = $this->cardData->skillData; //スキルデータ
    //攻撃スキップ条件
    if($this->targetBattleEntryData->isDead == true) return 0;
    if($skillData->baseDamage == 0 && $skillData->baseMagicDamage == 0) return 0;
    $commitDamage = 0; //最終的に与えた物理ダメージ
    $commitMagicDamage = 0; //最終的に与えた魔法ダメージ
    $attributeBonusDamage = 0; //属性ボーナスダメージ
    $miss = 0; //攻撃をミスしたか 1:ミス
    $critical = 0; //クリティカルか 1:クリティカル
    $kill = 0; //殺したか
    $maxHp = $this->targetBattleEntryData->GetStatusTotal(1); //現在の最大HP
    $prevHp = $this->targetBattleEntryData->hp;//変更前のHP
    $nowHp = $this->targetBattleEntryData->hp; //変更後のHP
    if(count($skillData->attributeIds) != 0){ //属性ボーナスを決定
      $attributeBonusDamage = $this->GetAttributeBonusDamage($skillData->attributeIds,$skillData->attributeDamages);
      //error_log("属性ボーナスダメージ\n", 3, './debug.txt');
      //error_log($attributeBonusDamage."\n", 3, './debug.txt');
    }
    $miss = $this->CheckAttackMiss($skillData->hitRate); //攻撃ミスチェック
    //error_log("攻撃ミス\n", 3, './debug.txt');
    //error_log($miss."\n", 3, './debug.txt');
    //error_log("スキルベースダメージ\n", 3, './debug.txt');
    //error_log($skillData->baseDamage."\n", 3, './debug.txt');
    //error_log("スキルベース魔法ダメージ\n", 3, './debug.txt');
    //error_log($skillData->baseDamage."\n", 3, './debug.txt');
    if($skillData->baseDamage != 0 && $miss == 0 && $this->targetBattleEntryData->isDead == false){ //基本物理ダメージ
      $myAtk = $this->myBattleEntryData->GetStatusTotal(2);
      //error_log("自分のATK\n", 3, './debug.txt');
      //error_log($myAtk."\n", 3, './debug.txt');
      //バックアタックが有効であれば、基本物理ダメージにバックアタックを加算
      if($this->backAttack == 1){
        $myAtk = (int)round($myAtk * BattleAction::BA_ATK_RATE);
        //error_log("バックアタック後のATK\n", 3, './debug.txt');
        //error_log($myAtk."\n", 3, './debug.txt');
      }
      $commitDamage = $myAtk + $skillData->baseDamage + $attributeBonusDamage;
      //error_log("コミットダメージ\n", 3, './debug.txt');
      //error_log($commitDamage."\n", 3, './debug.txt');
      $resultCritical = $this->SetCriticalDamage($commitDamage);
      //error_log("クリティカル結果\n", 3, './debug.txt');
      //error_log($resultCritical."\n", 3, './debug.txt');
      if($critical == 0 && $resultCritical == 1) $critical = $resultCritical;
      $cutDamage = $this->CutDamage($commitDamage,0);
      //error_log("ダメージカット値\n", 3, './debug.txt');
      //error_log($cutDamage."\n", 3, './debug.txt');
      $commitDamage = $commitDamage - $cutDamage;
      //error_log("ダメージ結果\n", 3, './debug.txt');
      //error_log($commitDamage."\n", 3, './debug.txt');
      $updateHp = $this->UpdateHp($commitDamage * -1); //ダメージを反映
      $kill = $updateHp['kill'];
      $nowHp = $updateHp['now_hp'];
    }
    if($skillData->baseMagicDamage != 0 && $miss == 0 && $this->targetBattleEntryData->isDead == false){ //基本魔法ダメージ
      $myMAtk = $this->myBattleEntryData->GetStatusTotal(4);
      //error_log("自分のMATK\n", 3, './debug.txt');
      //error_log($myMAtk."\n", 3, './debug.txt');
      //バックアタックが有効であれば、基本魔法ダメージにバックアタックを加算
      if($this->backAttack == 1) {
        $myMAtk = (int)round($myMAtk * BattleAction::BA_MAGIC_ATK_RATE);
        //error_log("バックアタック後のMATK\n", 3, './debug.txt');
        //error_log($myMAtk."\n", 3, './debug.txt');
      }
      $commitMagicDamage = $myMAtk + $skillData->baseMagicDamage + $attributeBonusDamage;
      //error_log("コミットダメージ\n", 3, './debug.txt');
      //error_log($commitMagicDamage."\n", 3, './debug.txt');
      $resultCritical = $this->SetCriticalDamage($commitMagicDamage);
      //error_log("クリティカル結果\n", 3, './debug.txt');
      //error_log($resultCritical."\n", 3, './debug.txt');
      if($critical == 0 && $resultCritical == 1) $critical = $resultCritical;
      $cutDamage = $this->CutDamage($commitMagicDamage,1);
      //error_log("ダメージカット値\n", 3, './debug.txt');
      //error_log($cutDamage."\n", 3, './debug.txt');
      $commitMagicDamage = $commitMagicDamage - $cutDamage;
      //error_log("ダメージ結果\n", 3, './debug.txt');
      //error_log($commitMagicDamage."\n", 3, './debug.txt');
      $updateHp = $this->UpdateHp($commitMagicDamage * -1); //ダメージを反映
      $kill = $updateHp['kill'];
      $nowHp = $updateHp['now_hp'];
    }
    $list = array();
    $list['log_type'] = 1;
    $list['unique_no'] = $this->myBattleEntryData->uniqueNo;
    $list['target_unique_no'] = $this->targetBattleEntryData->uniqueNo;
    $list['turn'] = $battleInstance->battleTurn;
    $list['skill_name'] = $this->cardData->skillName;
    $list['hit_point'] = ($commitDamage + $commitMagicDamage);
    $list['miss'] = $miss;
    $list['critical'] = $critical;
    $list['kill'] = $kill;
    $list['max_hp'] = $maxHp;
    $list['prev_hp'] = $prevHp;
    $list['now_hp'] = $nowHp;
    $list['effect_image_id'] = $this->cardData->effectImageId;
    $list['back_attack'] = $this->backAttack;
    $list['card_id'] = $this->cardData->id;
    $list['target_pos_x'] = $this->targetBattleEntryData->pos['x'];
    $list['target_pos_y'] = $this->targetBattleEntryData->pos['y'];
    $list['my_pos_x'] = $this->myBattleEntryData->pos['x'];
    $list['my_pos_y'] = $this->myBattleEntryData->pos['y'];
    $battleInstance->battleLog->AddAttackActionLog($list); //攻撃行動ログを挿入
  }

  function Heal($battleInstance){ //回復を発動
    $skillData = $this->cardData->skillData; //スキルデータ
    //回復スキップ条件
    //var_dump($this->myBattleEntryData->uniqueNo);
    $maxHp = $this->targetBattleEntryData->GetStatusTotal(1); //現在の最大HP
    $prevHp = $this->targetBattleEntryData->hp;//変更前のHP
    $nowHp = $this->targetBattleEntryData->hp; //変更後のHP
    $healPoint = 0; //回復量
    if($skillData->baseHealPoint == 0 || $this->targetBattleEntryData->isDead == true) return 0;
    $healPoint = $skillData->baseHealPoint + (int)round($this->targetBattleEntryData->GetStatusTotal(7) * 0.25);
    $healPoint = $healPoint + $this->myBattleEntryData->GetStatusTotal(7);
    $updateHp = $this->UpdateHp($healPoint); //回復を反映
    $nowHp = $updateHp['now_hp'];

    $list = array();
    $list['log_type'] = 2;
    $list['unique_no'] = $this->myBattleEntryData->uniqueNo;
    $list['target_unique_no'] = $this->targetBattleEntryData->uniqueNo;
    $list['turn'] = $battleInstance->battleTurn;
    $list['skill_name'] = $this->cardData->skillName;
    $list['hit_point'] = $healPoint;
    $list['miss'] = 0;
    $list['critical'] = 0;
    $list['kill'] = 0;
    $list['max_hp'] = $maxHp;
    $list['prev_hp'] = $prevHp;
    $list['now_hp'] = $nowHp;
    $list['effect_image_id'] = $this->cardData->effectImageId;
    $list['card_id'] = $this->cardData->id;
    $list['target_pos_x'] = $this->targetBattleEntryData->pos['x'];
    $list['target_pos_y'] = $this->targetBattleEntryData->pos['y'];
    $list['my_pos_x'] = $this->myBattleEntryData->pos['x'];
    $list['my_pos_y'] = $this->myBattleEntryData->pos['y'];
    $battleInstance->battleLog->AddHealActionLog($list); //回復行動ログを挿入
  }

  function Buff($battleInstance){ //バフを発動
    $skillData = $this->cardData->skillData; //スキルデータ
    if(count($skillData->buffIds) == 0) return 0;
    for ($i=0; $i < count($skillData->buffIds); $i++) {
      $battleBuff = new BattleBuff($skillData->buffIds[$i],$battleInstance->buffMasterDatas);
      $battleBuff->AddBuff($this->targetBattleEntryData);
    }
    //ログ挿入処理↑↑↑↑↑↑↑↑↑↑↑↑↑上のループには混ぜないこと↑↑↑↑↑↑↑↑↑↑↑↑↑
    $list = array();
    $list['unique_no'] = $this->myBattleEntryData->uniqueNo;
    $list['target_unique_no'] = $this->targetBattleEntryData->uniqueNo;
    $list['log_type'] = 3;
    $list['turn'] = $battleInstance->battleTurn;
    $list['effect_image_id'] = $this->cardData->effectImageId;
    $list['card_id'] = $this->cardData->id;
    $list['skill_name'] = $this->cardData->skillName;
    $list['target_pos_x'] = $this->targetBattleEntryData->pos['x'];
    $list['target_pos_y'] = $this->targetBattleEntryData->pos['y'];
    $list['my_pos_x'] = $this->myBattleEntryData->pos['x'];
    $list['my_pos_y'] = $this->myBattleEntryData->pos['y'];
    $battleInstance->battleLog->AddBuffSetLog($list); //バフ追加ログを挿入
  }

  function CutDamage($damage,$damageType){ //防御力によって防御出来たヒットポイントを取得 $damageType = 0:物理 1:魔法
    $result = 0;
    $defStatusId = 3;
    if($damageType == 1) $defStatusId = 5;
    $def = $this->targetBattleEntryData->GetStatusTotal($defStatusId);
    $cut = (int)round(($def / $damage) * 100);
    if(200 <= $cut) $result = $damage;
    else if(150 <= $cut){
      $range1 = (int)round($damage * 0.5);
      $range2 = (int)round($damage * 0.75);
      $result = rand($range1,$range2);
    }
    else {
      $range1 = (int)round($damage * ($cut * 0.001));
      $range2 = (int)round($damage * ($cut * 0.005));
      $result = rand($range1,$range2);
    }
    return $result;
  }

  function GetAttributeBonusDamage($attributeIds,$attributeDamages){ //属性ボーナスを取得
    $resultBonusDamage = 0;
    for ($i=0; $i < count($attributeIds); $i++) {
      $columnName = 'attribute_'.$attributeIds[$i];
      $myAttribute = (int)$this->myBattleEntryData->attribute[$columnName];
      $attributeDamage = (int)$attributeDamages[$i];
      $resultBonusDamage = $resultBonusDamage + (int)round($attributeDamage * round(($myAttribute * 0.01),1));
    }
    return $resultBonusDamage;
  }

  function SetCriticalDamage(&$damage){ //クリティカルダメージを設定 返し値 クリティカルしたか 1=クリティカル
    $result = 0;
    $criticalVal = 25; //クリティカル率
    $myLuck = $this->myBattleEntryData->GetStatusTotal(10);
    $targetLuck = $this->targetBattleEntryData->GetStatusTotal(10);

    $luckPercentage = (int)round(($myLuck / $targetLuck) * 100);
    if(100 < $luckPercentage){
      if(200 < $luckPercentage) $luckPercentage = 200;
      $baseCritical = $luckPercentage - 100;
      $var = (int)round((75 / 100) * $luckPercentage);
      $criticalVal = $criticalVal + $var;
    }
    else{
      $var1 = 100 - $luckPercentage;
      $var2 = (int)round((25 / 100) * $var1);
      $criticalVal = $criticalVal - $var2;
    }

    $rot1 = $criticalVal;
    $rot2 = rand(1,100);

    if($rot2 <= $rot1){ //クリティカル発動
      $result = 1;
      //最低クリティカルダメージ加算値:120
      //最大クリティカルダメージ加算値:200
      $var1 = (int)round(($luckPercentage / 200) * 100);
      $var2 = (int)round(($var1 / 100) * 80);
      $var3 = $var2 + 120;
      $damage = (int)round((float)$damage * round(($var3 * 0.01),2));
    }
    return $result;
  }

  function CheckAttackMiss($hitRate){ //攻撃をミスしたかチェック
    $result = 1;
    $checkHitRate = $hitRate['hit_min'];
    $plusHitRate = $hitRate['hit_max'] - $hitRate['hit_min'];

    $myMnd = $this->myBattleEntryData->GetStatusTotal(7); //攻撃側の精神力
    $targetAgi = $this->targetBattleEntryData->GetStatusTotal(6); //ターゲットの素早さ
    $agiPercentage = (int)round(($targetAgi / $myMnd) * 100);

    if(100 < $agiPercentage) $agiPercentage = 100;

    $resultPlusRate = ($plusHitRate * $agiPercentage) / 100;

    $checkHitRate = $checkHitRate + $resultPlusRate;

    if(100 <= $checkHitRate) $result = 0;
    else{
      $rot = rand(1,100);
      if($rot <= $checkHitRate) $result = 0;
    }

    return $result;
  }

  function UpdateHp($hpNum){ //HPを更新
    $result = array();
    $result['kill'] = 0; //倒したか 1:倒した
    $result['now_hp'] = 0; //残りのHP
    $maxHp = $this->targetBattleEntryData->GetStatusTotal(1); //最大HP
    if($this->targetBattleEntryData->isDead == true || $this->targetBattleEntryData->hp == 0) return $result; //死亡状態の場合はHP更新を中止
    $updateHp = $this->targetBattleEntryData->hp + $hpNum;
    if($maxHp < $updateHp) $updateHp = $maxHp; //最大HPを超えていた場合
    if($updateHp <= 0){ //死亡状態
      $updateHp = 0;
      $result['kill'] = 1;
      $this->targetBattleEntryData->hp = 0;
      $this->targetBattleEntryData->isDead = true;
      //生命力減少
      $var1 = $updateHp * -1;
      $var2 = (int)round(($var1 / $maxHp) * 100);
      $this->targetBattleEntryData->decVitality = $var2;
    }
    else{
      $this->targetBattleEntryData->hp = $updateHp;
    }
    $result['now_hp'] = $updateHp;
    return $result;
  }

  //移動する
  function Move($posX,$posY,$battleInstance){
    if($this->myBattleEntryData->isDead == true) return 0;
    $result['is_move'] = $battleInstance->CheckMove($posX,$posY,$this->myBattleEntryData);
    if($result['is_move'] == true){
      $this->myBattleEntryData->pos['x'] = $posX;
      $this->myBattleEntryData->pos['y'] = $posY;
      $result['move_pos']['x'] = $this->myBattleEntryData->pos['x'];
      $result['move_pos']['y'] = $this->myBattleEntryData->pos['y'];
    }
    return $result;
  }
}
