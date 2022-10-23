<?php

//行動自動決定クラス

class AutoAction {
  public $init = false;
  public $autoActionType = -1; //行動タイプ
  public $addAction = null; //最終的に追加される、アクションデータ
  public $uniqueNo = -1;
  function __construct($battleInstance,$battleEntryData,$autoActionType){
    $this->uniqueNo = $battleEntryData->uniqueNo;
    $resultAutoAction = $this->AutoActionController($battleInstance,$battleEntryData,$autoActionType);
    $this->addAction = $this->ChangeAddAction($battleEntryData,$resultAutoAction);
    $init = true;
  }

  //居ますぐ発動出来て一番ダメージの出るカードマスターデータを取得
  function ActionPolicyType0($battleInstance,$battleEntryData){
    $result['result_card_master_data'] = false; //発動するカードマスターデータ
    $result['result_change_direction'] = -1; //方向転換する
    $result['result_move_pos'] = null; //移動する場合は移動先の座標情報
    $selectCard = false;
    //発動可能なカードを取得
    $activeCards = $this->GetActiveCardMasterDatas($battleInstance,$battleEntryData);
    //移動なし向き変更で発動可能なカードを取得
    $editActiveCards = array();
    foreach ($activeCards as $cardMasterData) {
      $resultTargets = $battleInstance->GetCardEffectTargets(new CardData($cardMasterData),$battleEntryData);
      if(count($resultTargets) != 0) array_push($editActiveCards,$cardMasterData);
    }

    //方向転換なしで有効なカード無ければ、方向転換して、ターゲットを調査
    if(count($editActiveCards) == 0){
      for ($i=0; $i < 3; $i++) {
        $setDirection = $i;
        if($battleEntryData->direction != $setDirection) {
          foreach ($activeCards as $cardMasterData) {
            $resultTargets = $battleInstance->GetCardEffectTargets(new CardData($cardMasterData),$battleEntryData,$battleEntryData->pos,$setDirection);
            if(count($resultTargets) != 0){
              $addCardMasterData = $cardMasterData;
              $addCardMasterData['change_direction'] = $setDirection;
              array_push($editActiveCards,$addCardMasterData);
            }
          }
        }
      }
    }

    //方向転換でもターゲットが見つからなければ,移動範囲で移動+方向転換でターゲットを調査
    foreach ($battleEntryData->moveAreas as $area) {
      if($area['x'] == $battleEntryData->pos['x'] && $area['y'] == $battleEntryData->pos['y']) continue;
      for ($i=0; $i < 3; $i++) {
        $setDirection = $i;
        foreach ($activeCards as $cardMasterData) {
          $resultTargets = $battleInstance->GetCardEffectTargets(new CardData($cardMasterData),$battleEntryData,$area,$setDirection);
          if(count($resultTargets) != 0){
            $addCardMasterData = $cardMasterData;
            if($setDirection != $battleEntryData->direction) $addCardMasterData['change_direction'] = $setDirection;
            $addCardMasterData['move_pos'] = $area;
            array_push($editActiveCards,$addCardMasterData);
          }
        }
      }
    }


    //魔法と物理、どちらの方が高いか。
    $atk = $battleEntryData->GetStatusTotal(2); //物理攻撃力
    $mAtk = $battleEntryData->GetStatusTotal(4); //魔法攻撃力
    if($mAtk <= $atk){ //物理優先
      //攻撃力の最も高いカードを取得
      foreach ($editActiveCards as $card) {
        if($selectCard == false) $selectCard = $card;
        else {
          $selectSkillData = new SkillData($selectCard);
          $nowSkillData = new SkillData($card);
          if($selectSkillData->baseDamage < $nowSkillData->baseDamage) $selectCard = $card;
        }
      }
      $result['result_card_master_data'] = $selectCard;
    }
    else{ //魔法攻撃優先
      //攻撃力の最も高いカードを取得
      foreach ($editActiveCards as $card) {
        if($selectCard == false) $selectCard = $card;
        else {
          $selectSkillData = new SkillData($selectCard);
          $nowSkillData = new SkillData($card);
          if($selectSkillData->baseMagicDamage < $nowSkillData->baseMagicDamage) $selectCard = $card;
        }
      }
      $result['result_card_master_data'] = $selectCard;
    }

    //後処理
    if($result['result_card_master_data'] != false){
      if(isset($result['result_card_master_data']['change_direction'])) $result['result_change_direction'] = $result['result_card_master_data']['change_direction'];
      if(isset($result['result_card_master_data']['move_pos'])) $result['result_move_pos'] = $result['result_card_master_data']['move_pos'];
    }
    //error_log("決定したカード\n", 3, './debug.txt');
    //error_log(var_export($result, true), 3, "./debug.txt");
    return $result;
  }

  function GetActiveCardMasterDatas($battleInstance,$battleEntryData){ //発動可能なカードのマスターデータ配列を取得
    $activeCards = array();
    $cardIds = explode(",",$battleEntryData->cards);
    //error_log("所持カード\n", 3, './debug.txt');
    //error_log(var_export($cardIds, true), 3, "./debug.txt");
    for ($i=0; $i < count($cardIds); $i++) {
      foreach ($battleInstance->cardMasterDatas as $cardMasterData) {
        if($cardMasterData['id'] == $cardIds[$i]){
          //error_log("カードチェック\n", 3, './debug.txt');
          $check = $battleInstance->CheckUseCard($cardIds[$i],$battleEntryData,$cardMasterData);
          if($check == true) array_push($activeCards,$cardMasterData);
          break;
        }
      }
    }
    //error_log("発動可能なカード\n", 3, './debug.txt');
    //error_log(var_export($activeCards, true), 3, "./debug.txt");
    return $activeCards;
  }

  function GetCardEffectTargets(CardData $cardData,$battleInstance,$battleEntryData,$myPos,$myDirection){ //カード効果を受ける対象を取得
    $result = array();
    if($cardData->init == true){
      $skillData = $cardData->skillData;
      $effectArea = new EffectArea($myPos,$myDirection,$cardData->effectAreaType);
      $areas = $effectArea->GetArea();
      foreach ($areas as $area) {
        $entryDatas = $battleInstance->entryDatas;
        foreach ($entryDatas as $entryData) {
          $entryDataPos = $entryData->pos;
          //$target = 0; //0:味方,1:敵,2:両方
          //味方が対象だが、敵だった場合はスキップ
          if($skillData->target == 0 && $battleEntryData->partyInstance->teamNo != $entryData->partyInstance->teamNo) continue;
          //敵が対象だが、味方だった場合はスキップ
          if($skillData->target == 1 && $battleEntryData->partyInstance->teamNo == $entryData->partyInstance->teamNo) continue;
          //効果範囲と一致しているか。
          if($area['x'] == $entryDataPos['x'] && $area['y'] == $entryDataPos['y']){
            array_push($result,$entryData); //効果範囲に居たため、発動対象に追加。
          }
        }
      }
    }
    return $result;
  }

  function MovePolicyType0($battleInstance,$battleEntryData){ //移動方針:一番近い敵に接近
    $result = array();
    $result['x'] = -1;
    $result['y'] = -1;
    //自分の右側、左側、中央、に敵が多いか。
    $myPos = $battleEntryData->pos;

    $enemyCount = 0;//敵の数
    foreach ($battleInstance->entryDatas as $entryData) {
      if($entryData->partyInstance->teamNo != $battleEntryData->partyInstance->teamNo && $entryData->isDead == false) $enemyCount++;
    }

    $xDirections = array();
    $xDirections['x_0'] = 0;
    $xDirections['x_1'] = 0;
    $xDirections['x_2'] = 0;

    $yDirections = array();
    $yDirections['y_0'] = 0;
    $yDirections['y_1'] = 0;
    $yDirections['y_2'] = 0;

    foreach ($battleInstance->entryDatas as $entryData) {
      //自分と味方を除外
      if($entryData->partyInstance->teamNo == $battleEntryData->partyInstance->teamNo) continue;
      //自分から見て右位置に居る
      if($myPos['x'] < $entryData->pos['x']) $xDirections['x_2']++;
      //自分の縦位置に居る
      if($myPos['x'] == $entryData->pos['x']) $xDirections['x_1']++;
      //自分から見て左位置に居る
      if($myPos['x'] > $entryData->pos['x']) $xDirections['x_0']++;
      //自分から見て上に居る
      if($myPos['y'] > $entryData->pos['y']) $yDirections['y_0']++;
      //自分の高さに居る
      if($myPos['y'] == $entryData->pos['y']) $yDirections['y_1']++;
      //自分から見て下に居る
      if($myPos['y'] < $entryData->pos['y']) $yDirections['y_2']++;
    }

    //敵の多い方向値を確定
    $resultXdirectionKey = 'x_1';
    $maxXdirectionVal = 0;

    foreach ($xDirections as $key => $value) {
      if($maxXdirectionVal < $value){
        $maxXdirectionVal = $value;
        $resultXdirectionKey = $key;
      }
    }

    $resultYdirectionKey = 'y_1';
    $maxYdirectionVal = 0;

    foreach ($yDirections as $key => $value) {
      if($maxYdirectionVal < $value){
        $maxYdirectionVal = $value;
        $resultYdirectionKey = $key;
      }
    }

    $result = $battleInstance->GetMoveDirectionPos($battleEntryData,$battleEntryData->moveAreas,$resultXdirectionKey,$resultYdirectionKey); //移動先の中で、一番近くまで行ける移動先を取得
    return $result;
  }

  function AutoActionController($battleInstance,$battleEntryData,$type){ //自動行動タイプにより、行動情報を取得
    $result = array();
    $result['result_card_master_data'] = false; //発動するカードマスターデータ
    $result['result_change_direction'] = -1; //方向転換する
    $result['result_move_pos'] = null; //移動する場合は移動先の座標情報
    switch ((int)$type) {
      //使用カード:現在発動出来て、一番威力があるもの
      //狙う対象:一番近くに居る敵
      //移動パターン:一番近くに居る敵の場所に移動
      case 0:
      {
        $ap = $this->ActionPolicyType0($battleInstance,$battleEntryData);
        if(isset($ap['result_card_master_data'])) $result['result_card_master_data'] = $ap['result_card_master_data'];
        if(isset($ap['result_change_direction'])) $result['result_change_direction'] = $ap['result_change_direction'];
        if(isset($ap['result_move_pos'])) $result['result_move_pos'] = $ap['result_move_pos'];
        //攻撃していない場合は移動。
        if($result['result_card_master_data'] == false){
          $mp = $this->MovePolicyType0($battleInstance,$battleEntryData);
          if($mp['x'] != -1 && $mp['y'] != -1) $result['result_move_pos'] = $mp;
          //向きを変更していない場合
          if($result['result_change_direction'] == -1){
            //向きの調整(弱点守るため、敵の多い方向か、近い方向に向く)
            $directionAdjustment = $this->DirectionAdjustment($battleInstance,$battleEntryData);
            if($directionAdjustment != -1) $result['result_change_direction'] = $directionAdjustment;
          }
        }
      }
      break;
      //使用カード:
      //狙う対象:
      //移動パターン:
      case 1:
      {

      }
      break;
      //使用カード:
      //狙う対象:
      //移動パターン:
      case 2:
      {

      }
      break;
      //使用カード:
      //狙う対象:
      //移動パターン:
      case 3:
      {

      }
      break;
      default:
      break;
    }
    return $result;
  }

  function ChangeAddAction($battleEntryData,$resultAutoAction){ //自動行動データをAddActionクラスのオブジェクトに変更
    $type = $battleEntryData->battleEntryType->type;
    $id = $battleEntryData->battleEntryType->id;
    $isMove = 0;
    $movePos = null;
    $isUseCard = 0;
    $useCardId = -1;
    $isChangeDirection = 0;
    $changeDirection = -1;
    if(is_array($resultAutoAction)){
      if(isset($resultAutoAction['result_card_master_data']) && isset($resultAutoAction['result_card_master_data']['id'])){
        $isUseCard = 1;
        $useCardId = $resultAutoAction['result_card_master_data']['id'];
      }
      if(isset($resultAutoAction['result_move_pos'])
      && is_array($resultAutoAction['result_move_pos'])
      && isset($resultAutoAction['result_move_pos']['x'])
      && isset($resultAutoAction['result_move_pos']['y'])){
        $isMove = 1;
        $movePos = $resultAutoAction['result_move_pos'];
      }
      if(isset($resultAutoAction['result_change_direction']) && $resultAutoAction['result_change_direction'] != -1){
        $isChangeDirection = 1;
        $changeDirection = $resultAutoAction['result_change_direction'];
      }
    }
    return new AddAction($battleEntryData->uniqueNo,$type,$id,$isMove,$movePos,$isUseCard,$useCardId,$isChangeDirection,$changeDirection); //まだ途中だよ！
  }

  function DirectionAdjustment($battleInstance,$battleEntryData){ //方向調整
    //近くに居る敵を調べる
    $myPos = $battleEntryData->pos;
    $hitEnemyPositions = array(); //付近に居た敵の現在地
    $effectArea = new EffectArea($battleEntryData->pos,$battleEntryData->direction,1);
    $areas = $effectArea->GetArea();
    foreach ($areas as $area) {
      foreach ($battleInstance->entryDatas as $entryData) {
        if($entryData->partyInstance->teamNo == $battleEntryData->partyInstance->teamNo) continue;
        if($entryData->pos['x'] == $area['x'] && $entryData->pos['y'] == $area['y']){
          $addPos = array('x' => $area['x'],'y' => $area['y']);
          array_push($hitEnemyPositions,$addPos);
        }
      }
    }

    if(count($hitEnemyPositions) != 0){
      $resultDirection = -1;
      $rot = rand(1,count($hitEnemyPositions));
      $selectPos = $hitEnemyPositions[$rot - 1];
      $x = 1;
      $y = 1;
      //x
      if($myPos['x'] < $selectPos['x']) $x = 2;
      else if($myPos['x'] == $selectPos['x']) $x = 1;
      else $x = 0;
      //y
      if($myPos['y'] < $selectPos['y']) $y = 2;
      else if($myPos['y'] == $selectPos['y']) $y = 1;
      else $y = 0;

      $rot2 = rand(0,1);
      if($rot2 == 0){ //x方向優先
        if($x != 1 && $y == 1){
          if($x == 0) $resultDirection = 3;
          else $resultDirection = 1;
        }
        else if($y != 1 && $x == 1){
          if($y == 0) $resultDirection = 0;
          else $resultDirection = 2;
        }
      }
      else{ //y方向優先
        if($y != 1 && $x == 1){
          if($y == 0) $resultDirection = 0;
          else $resultDirection = 2;
        }
        else if($x != 1 && $y == 1){
          if($x == 0) $resultDirection = 3;
          else $resultDirection = 1;
        }
      }
    }
    else{ //敵の多い位置を中心に向く
      $xDirections = array();
      $xDirections['x_0'] = 0;
      $xDirections['x_1'] = 0;
      $xDirections['x_2'] = 0;

      $yDirections = array();
      $yDirections['y_0'] = 0;
      $yDirections['y_1'] = 0;
      $yDirections['y_2'] = 0;

      foreach ($battleInstance->entryDatas as $entryData) {
        //自分と味方を除外
        if($entryData->partyInstance->teamNo == $battleEntryData->partyInstance->teamNo) continue;
        //自分から見て右位置に居る
        if($myPos['x'] < $entryData->pos['x']) $xDirections['x_2']++;
        //自分の縦位置に居る
        if($myPos['x'] == $entryData->pos['x']) $xDirections['x_1']++;
        //自分から見て左位置に居る
        if($myPos['x'] > $entryData->pos['x']) $xDirections['x_0']++;
        //自分から見て上に居る
        if($myPos['y'] > $entryData->pos['y']) $yDirections['y_0']++;
        //自分の高さに居る
        if($myPos['y'] == $entryData->pos['y']) $yDirections['y_1']++;
        //自分から見て下に居る
        if($myPos['y'] < $entryData->pos['y']) $yDirections['y_2']++;
      }

      //敵の多い方向値を確定
      $resultXdirectionKey = 'x_1';
      $maxXdirectionVal = 0;

      foreach ($xDirections as $key => $value) {
        if($maxXdirectionVal < $value){
          $maxXdirectionVal = $value;
          $resultXdirectionKey = $key;
        }
      }

      $resultYdirectionKey = 'y_1';
      $maxYdirectionVal = 0;

      foreach ($yDirections as $key => $value) {
        if($maxYdirectionVal < $value){
          $maxYdirectionVal = $value;
          $resultYdirectionKey = $key;
        }
      }

      $rot2 = rand(0,1);
      if($rot2 == 0){ //x優先
        if($resultXdirectionKey != 'x_1'){
          if($resultXdirectionKey == 'x_0') $resultDirection = 3;
          else $resultDirection = 1;
        }
        else if($resultYdirectionKey != 'y_1'){
          if($resultYdirectionKey == 'y_0') $resultDirection = 0;
          else $resultDirection = 2;
        }
      }
      else{ //y優先
        if($resultYdirectionKey != 'y_1'){
          if($resultYdirectionKey == 'y_0') $resultDirection = 0;
          else $resultDirection = 2;
        }
        else if($resultXdirectionKey != 'x_1'){
          if($resultXdirectionKey == 'x_0') $resultDirection = 3;
          else $resultDirection = 1;
        }
      }
    }
    return $resultDirection;
  }

}
