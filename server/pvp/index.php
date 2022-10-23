<?php
require_once(dirname(__FILE__)."/../battle/index.php");


function getPvpBattleResult($conn,$playerIndexId,$enemyIndexId,$playerMemberDatas,$enemyMemberDatas,$defineStatusDataArray,$playerPartyData,$enemyPartyData,$mapMasterData) //戦闘結果を取得する
{
  $playerName = "";
  $ePlayerName = "";
  $playerPartyMember = ""; //ログ記録用
  $enemyPartyMember = ""; //ログ記録用
  $playerPartyAvatarIds = ""; //ログ記録用
  $enemyPartyAvatarIds = ""; //ログ記録用
  $playerPartyFormationId = -1; //ログ記録用
  $enemyPartyFormationId = -1; //ログ記録用
  $result = array();
  $result['error'] = 0; //エラーがあった場合 0以外の数値を返す。
  $result['battle_log'] = array(); //バトルログ
  $result['battle_anim_log'] = array(); //アニメーション再生に使用するバトルログ
  $result['battle_status'] = array(); //バトルの結果などを格納
  $result['map_stage_clear_flag'] = false; //クリア条件の敵を倒してステージをクリアした場合trueを返す
  $playerMemberStatus = array(); //プレイヤーメンバーのステータス
  $enemyMemberStatus = array(); //敵パーティのステータス
  $playerMemberAttribute = array(); //プレイヤーの属性ボーナス状態
  $enemyMemberAttribute = array(); //敵の属性ボーナス
  $playerMemberEquipItem = array(); //パーテイメンバーの装備品を取得
  $enemyMemberEquipItem = array(); //敵パーテイメンバーの装備品を取得
  $playerMemberCardDeckData = array(); //パーティーメンバーのカードデッキを取得
  $enemyMemberCardDeckData = array(); //敵が使用するカードデッキを取得
  $playerMemberDeckStatus = array(); //パーティメンバーのカードデッキの状態を格納
  $enemyMemberDeckStatus = array(); //敵パーティメンバーのカードデッキ状態を格納
  $defaultCardData = getCardMasterData($conn,1); //デフォルトのカードデータを取得
  $checkBattleResult = 0; //戦闘に勝利したかどうか
  //パーティの隊形データを取得
  $playerMemberFormationMasterData = getPlayerPartyFormationData($conn,$playerPartyData['leader_player_index_id']);
  $enemyMemberFormationMasterData = getPlayerPartyFormationData($conn,$enemyPartyData['leader_player_index_id']);
  foreach ($playerMemberDatas as &$ptPlayerInfo) {
    //パーティメンバーの装備情報を取得
    $ptPlayerEquipItem = playerEquipItemDisp($conn,$ptPlayerInfo['player_index_id']);
    $ptPlayerEquipItem['player_index_id'] = $ptPlayerInfo['player_index_id'];
    if(is_array($ptPlayerEquipItem)){
      $ptPlayerEquipItem['player_index_id'] = $ptPlayerInfo['player_index_id'];
      array_push($playerMemberEquipItem,$ptPlayerEquipItem);
    }
    //パーティメンバーのステータスを取得
    $ptTmpPlayerStatus = getPlayerStatus($conn,$ptPlayerInfo['player_index_id'],true);
    $ptPlayerStatus = equipStatusUpdate($conn,$ptTmpPlayerStatus,$ptPlayerInfo['player_index_id']);
    $ptVitalityPenalty = getVitalityPenalty($conn,$ptPlayerInfo['player_index_id'],$ptTmpPlayerStatus,$defineStatusDataArray['VIT']);
    if($ptVitalityPenalty != false){ //ステータスペナルティーが発生している
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 1; //ペナルティーあり
      }
      $ptPlayerStatus = updatePlayerStatusPenalty($conn,$ptPlayerStatus,$STATUS_ID_VITALITY);
    }
    else{
      if(is_array($ptPlayerStatus)){
        $ptPlayerStatus['status_penalty'] = 0; //ペナルティーなし
      }
    }
    if(is_array($ptPlayerStatus)){
      $ptPlayerStatus = replacePlayerStatus($ptPlayerStatus); //ステータスを整形
      $ptPlayerStatus['player_index_id'] = $ptPlayerInfo['player_index_id'];
      $ptPlayerStatus['player_pos_index'] = $ptPlayerInfo['player_pos_index'];
      $ptPlayerStatus['support_player_type'] = $ptPlayerInfo['support_player_type'];
      $ptPlayerStatus['now_hp'] = $ptPlayerStatus['HP']; //消費計算葉のHPパラメーターを追加
      $ptPlayerStatus['buff_status'] = array(); //バフ効果格納用配列
      $ptPlayerStatus['debuff_status'] = array(); //デバフ効果格納用配列
      $ptPlayerStatus['player_name'] = $ptPlayerInfo['player_name']; //プレイヤー名を取得
      if($ptPlayerStatus['player_index_id'] == $playerIndexId) $playerName = $ptPlayerStatus['player_name'];
      $playerMemberStatus[$ptPlayerInfo['player_pos_index']] = $ptPlayerStatus;
    }

    //プレイヤーの属性ボーナスを取得
    $ptPlayerAttribute = getPlayerAttribute($conn,$ptPlayerInfo['player_index_id']);
    if(is_array($ptPlayerAttribute)){
      array_push($playerMemberAttribute,$ptPlayerAttribute);
    }
  }
  unset($ptPlayerInfo);
  //プレイヤーメンバーの戦闘開始状態をチェック
  $playerIds = array();
  $playerAvatarIds = array();
  foreach ($playerMemberDatas as $ptPlayerInfo) {
    //記録用のデータを作成
    $playerIds[count($playerIds)] = $ptPlayerInfo['player_index_id'];
    $playerAvatarIds[count($playerAvatarIds)] = $ptPlayerInfo['player_avatar_id'];
    //カードが使用可能かチェック
    $deckType = 2;
    if($playerIndexId != $ptPlayerInfo['player_index_id']) $deckType = 3;
    $plDeckData = getPlayerDeckDataSelectDeckNumber($conn,$ptPlayerInfo['player_index_id'],1,$deckType);
    if(is_array($plDeckData) && isset($plDeckData['player_card_deck']) && isset($plDeckData['player_card_datas']) && isset($plDeckData['card_master_datas'])){
      $cardMasterIds = explode(",",$plDeckData['player_card_deck']['card_deck']);
      $checkPlDeck = checkPlayerCard($conn,$ptPlayerInfo,$cardMasterIds[0]);
      if($checkPlDeck == false){
        $result['error'] = 2; //使用不可能なデッキが存在した。
        return $result;
      }
      $plDeckIndex = array_push($playerMemberCardDeckData,$plDeckData); //パーティーメンバーのカードデッキデータを挿入
      $addDeckStatusParam = array();
      $addDeckStatusParam['player_index_id'] = $ptPlayerInfo['player_index_id'];
      $addDeckStatusParam['player_pos_index'] = $ptPlayerInfo['player_pos_index'];
      $addDeckStatusParam['support_player_type'] = $ptPlayerInfo['support_player_type'];
      $addDeckStatusParam['deck_array_index'] = $plDeckIndex; //デッキ検索用のindexを設定
      $addDeckStatusParam['deck_turn_count'] = 0; //使用ターンを指定する数値を格納
      array_push($playerMemberDeckStatus,$addDeckStatusParam);
    }
    else{
      $result['error'] = 1; //デッキデータの取得に失敗した。
      return $result;
    }
  }
  $playerPartyMember = implode(",", $playerIds); //記録用データを保存
  $playerPartyAvatarIds = implode(",", $playerAvatarIds); //記録用データを保存
  $playerPartyFormationId = $playerPartyData['party_formation_id'];

  foreach ($enemyMemberDatas as &$ptEnemyInfo) {
    //敵メンバーの装備情報を取得
    $ptEnemyEquipItem = playerEquipItemDisp($conn,$ptEnemyInfo['player_index_id']);
    $ptEnemyEquipItem['player_index_id'] = $ptEnemyInfo['player_index_id'];
    if(is_array($ptEnemyEquipItem)){
      $ptEnemyEquipItem['player_index_id'] = $ptEnemyInfo['player_index_id'];
      array_push($enemyMemberEquipItem,$ptEnemyEquipItem);
    }
    //敵メンバーのステータスを取得
    $ptTmpEnemyStatus = getPlayerStatus($conn,$ptEnemyInfo['player_index_id'],true);
    $ptEnemyStatus = equipStatusUpdate($conn,$ptTmpEnemyStatus,$ptEnemyInfo['player_index_id']);
    $ptVitalityPenalty = getVitalityPenalty($conn,$ptEnemyInfo['player_index_id'],$ptTmpEnemyStatus,$defineStatusDataArray['VIT']);
    if($ptVitalityPenalty != false){ //ステータスペナルティーが発生している
      if(is_array($ptEnemyStatus)){
        $ptEnemyStatus['status_penalty'] = 1; //ペナルティーあり
      }
      $ptEnemyStatus = updatePlayerStatusPenalty($conn,$ptEnemyStatus,$STATUS_ID_VITALITY);
    }
    else{
      if(is_array($ptEnemyStatus)){
        $ptEnemyStatus['status_penalty'] = 0; //ペナルティーなし
      }
    }
    if(is_array($ptEnemyStatus)){
      $ptEnemyStatus = replacePlayerStatus($ptEnemyStatus); //ステータスを整形
      $ptEnemyStatus['enemy_index_id'] = $ptEnemyInfo['player_index_id'];
      $ptEnemyStatus['enemy_pos_index'] = $ptEnemyInfo['player_pos_index'];
      $ptEnemyStatus['support_player_type'] = $ptEnemyInfo['support_player_type'];
      $ptEnemyStatus['now_hp'] = $ptEnemyStatus['HP']; //消費計算葉のHPパラメーターを追加
      $ptEnemyStatus['buff_status'] = array(); //バフ効果格納用配列
      $ptEnemyStatus['debuff_status'] = array(); //デバフ効果格納用配列
      $ptEnemyStatus['player_name'] = $ptEnemyInfo['player_name']; //プレイヤー名を取得
      if($ptEnemyStatus['enemy_index_id'] == $enemyIndexId) $ePlayerName = $ptEnemyStatus['player_name'];
      $enemyMemberStatus[$ptEnemyInfo['player_pos_index']] = $ptEnemyStatus;
    }

    //プレイヤーの属性ボーナスを取得
    $ptEnemyAttribute = getPlayerAttribute($conn,$ptEnemyInfo['player_index_id']);
    if(is_array($ptEnemyAttribute)){
      array_push($enemyMemberAttribute,$ptEnemyAttribute);
    }
  }
  unset($ptEnemyInfo);
  //敵メンバーの戦闘開始状態をチェック
  $enemyIds = array();
  $enemyAvatarIds = array();
  foreach ($enemyMemberDatas as $ptEnemyInfo) {
    //記録用のデータを作成
    $enemyIds[count($enemyIds)] = $ptEnemyInfo['player_index_id'];
    $enemyAvatarIds[count($enemyAvatarIds)] = $ptEnemyInfo['player_avatar_id'];
    //カードが使用可能かチェック
    $deckType = 2;
    if($enemyIndexId != $ptEnemyInfo['player_index_id']) $deckType = 3;
    $enDeckData = getPlayerDeckDataSelectDeckNumber($conn,$ptEnemyInfo['player_index_id'],1,$deckType);
    if(is_array($enDeckData) && isset($enDeckData['player_card_deck']) && isset($enDeckData['player_card_datas']) && isset($enDeckData['card_master_datas'])){
      $cardMasterIds = explode(",",$enDeckData['player_card_deck']['card_deck']);
      $checkEnDeck = checkPlayerCard($conn,$ptEnemyInfo,$cardMasterIds[0]);
      if($checkEnDeck == false){
        $result['error'] = 2; //使用不可能なデッキが存在した。
        return $result;
      }
      $enDeckIndex = array_push($enemyMemberCardDeckData,$enDeckData); //パーティーメンバーのカードデッキデータを挿入
      $addDeckStatusParam = array();
      $addDeckStatusParam['enemy_index_id'] = $ptEnemyInfo['player_index_id'];
      $addDeckStatusParam['enemy_pos_index'] = $ptEnemyInfo['player_pos_index'];
      $addDeckStatusParam['support_player_type'] = $ptEnemyInfo['support_player_type'];
      $addDeckStatusParam['deck_array_index'] = $enDeckIndex; //デッキ検索用のindexを設定
      $addDeckStatusParam['deck_turn_count'] = 0; //使用ターンを指定する数値を格納
      array_push($enemyMemberDeckStatus,$addDeckStatusParam);
    }
    else{
      $result['error'] = 1; //デッキデータの取得に失敗した。
      return $result;
    }
  }
  $enemyPartyMember = implode(",", $enemyIds); //記録用データを保存
  $enemyPartyAvatarIds = implode(",", $enemyAvatarIds); //記録用データを保存
  $enemyPartyFormationId = $enemyPartyData['party_formation_id'];

  $animParameterLog = array(); //アニメーション再生用のパラメーターログ
  //戦闘開始前のカードデッキデータを取得
  $tmpPlayerMemberCardDeckData = $playerMemberCardDeckData;
  $tmpEnemyMemberCardDeckData = $enemyMemberCardDeckData;
  //戦闘開始前のプレイヤーステータスを取得
  $tmpPlayerMemberStatus = $playerMemberStatus;
  $tmpEnemyMemberStatus = $enemyMemberStatus;
  //攻撃順番を決定する。
  $resultBattleOrder = getPvpBattleOrder($conn,$enemyMemberStatus,$playerMemberStatus,$defineStatusDataArray['AGI']);
  $battleTurn = 0; //バトルのターン
  for($row=0; $row < 111;$row++){
    foreach ($resultBattleOrder as $nowOrder) {
      if(isset($nowOrder['player_index_id'])){ //プレイヤーの行動
        foreach ($playerMemberDeckStatus as &$ptPlDeckStatus) {
          if($ptPlDeckStatus['player_index_id'] == $nowOrder['player_index_id']){ //デッキindexが格納されている場所を取得
            foreach ($playerMemberStatus as $ptPlayerStatus) {
              if($nowOrder['player_index_id'] == $ptPlayerStatus['player_index_id'] && $ptPlayerStatus['now_hp'] <= 0){
                break 2; //対象が死んでいた場合
              }
            }
            $playerDeck = &$playerMemberCardDeckData[$ptPlDeckStatus['deck_array_index'] - 1];
            if(is_array($playerDeck)){
              $cardMasterIds = explode(",",$playerDeck['player_card_deck']['card_deck']); //デッキに含まれるカードID配列
              $setCardMasterId = $cardMasterIds[$ptPlDeckStatus['deck_turn_count']]; //セットするカードID
              $setCardMasterData = null; //セットするカードマスターデータ
              $setPlayerCardData = null; //セットするプレイヤーカードデータ
              $plcdIndex = -1;
              foreach ($playerDeck['card_master_datas'] as $rowCardMasterData) {
                if($rowCardMasterData['id'] == $setCardMasterId){
                  $setCardMasterData = $rowCardMasterData;
                  break;
                }
              }
              for ($plcd=0; $plcd < count($playerDeck['player_card_datas']); $plcd++) {
                if($playerDeck['player_card_datas'][$plcd]['card_master_id'] == $setCardMasterId){
                  $plcdIndex = $plcd;
                  break;
                }
              }
              if($plcdIndex != -1){
                $setPlayerCardData = &$playerDeck['player_card_datas'][$plcdIndex]; //セットするプレイヤーカードデータ
              }
              else if($setCardMasterId == 1) $setPlayerCardData = createDummyPlayerCardData($nowOrder['player_index_id']); //初期カードが無い場合ダミーを挿入
              if($setCardMasterData == null || $setPlayerCardData == null){
                return $result['error'] = 7; //カードの選択に失敗した。
              }

              $numUpdate = cardUseNumUpdate($setPlayerCardData); //カード枚数を更新
              unset($setPlayerCardData);

              $exeCard = $setCardMasterData;
              if($numUpdate == false) $exeCard = $defaultCardData;
              $resultTargetEnemys = getPvpTargetObject($conn,$ptPlDeckStatus['player_index_id'],false,$enemyMemberStatus,$playerMemberStatus,$exeCard,$playerMemberFormationMasterData,$enemyMemberFormationMasterData); //攻撃対象を取得
              $playerAttribute = array(); //プレイヤーの属性ボーナス
              foreach ($playerMemberAttribute as $ptPlAttribute) {
                if($ptPlAttribute['player_index_id'] == $ptPlDeckStatus['player_index_id']){
                  $playerAttribute = $ptPlAttribute; //プレイヤーの属性ボーナスを取得
                }
              }
              $resultSkillParam = false;
              if($numUpdate == false)  $resultSkillParam = getSkillAction($defaultCardData); //デフォルトスキルを発動
              else $resultSkillParam = getSkillAction($setCardMasterData); //スキルを発動

              if($resultSkillParam != false){
                $resultSkillType = $resultSkillParam['result_skill_type'];
                $resultUseSkill = false; //スキル使用結果
                $setSkillUseStatus = false;
                foreach ($playerMemberStatus as $ptPlayerStatus) {
                  if($ptPlDeckStatus['player_index_id'] == $ptPlayerStatus['player_index_id']){
                    $setSkillUseStatus = $ptPlayerStatus;
                  }
                }
                $resultUseSkill = resultPvpUseSkill($conn,$setSkillUseStatus,$resultSkillParam,$resultTargetEnemys,$playerAttribute,false); //スキル使用結果を取得する

                if($resultUseSkill != false){ //スキル結果を取得できた場合
                  $updateData = pvpUpdateStatusForSkillEffect($resultUseSkill,$playerMemberStatus,$enemyMemberStatus); //スキル効果により、プレイヤーのステータスを更新
                  if(count($updateData['battle_anim_log_data']) != 0) $battleTurn = $battleTurn + 1; //ターンを更新
                  foreach ($updateData['battle_log_data'] as $getBattleLog) {
                    $battleLog = battleLogInit($battleTurn,$getBattleLog); //バトルログの生成
                    array_push($result['battle_log'],$battleLog); //バトルログの挿入
                  }
                  foreach ($updateData['battle_anim_log_data'] as $getBattleAnimLog) {
                    $battleAnimLog = battleAnimLogInit($battleTurn,$getBattleAnimLog);
                    array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
                  }
                }
                else{
                  return $result['error'] = 10; //スキル結果の取得に失敗した。
                }
              }
              else{
                $result['error'] = 5; //スキルの発動に失敗した。
              }
              $ptPlDeckStatus['deck_turn_count'] = $ptPlDeckStatus['deck_turn_count'] + 1; //発動後はカード番号の進行度を上げる
              if(isset($cardMasterIds[$ptPlDeckStatus['deck_turn_count']]) == false){ //最後のカードナンバーを越した場合
                $ptPlDeckStatus['deck_turn_count'] = 0;
              }
              break; //発動完了後は必ずブレイクする。(2回発動してしまう。
            }
            else{
              $result['error'] = 3; //プレイヤーのデッキカードデータの取得に失敗した。
              return $result;
            }
          }
        }
        unset($ptPlDeckStatus);
      }
      if(isset($nowOrder['enemy_index_id'])){ //プレイヤーの行動(敵チーム)
        foreach ($enemyMemberDeckStatus as &$ptEnDeckStatus) {
          if($ptEnDeckStatus['enemy_index_id'] == $nowOrder['enemy_index_id']){ //デッキindexが格納されている場所を取得
            foreach ($enemyMemberStatus as $ptEnemyStatus) {
              if($nowOrder['enemy_index_id'] == $ptEnemyStatus['enemy_index_id'] && $ptEnemyStatus['now_hp'] <= 0){
                break 2; //対象が死んでいた場合
              }
            }
            $enemyDeck = &$enemyMemberCardDeckData[$ptEnDeckStatus['deck_array_index'] - 1];
            if(is_array($enemyDeck)){
              $cardMasterIds = explode(",",$enemyDeck['player_card_deck']['card_deck']); //デッキに含まれるカードID配列
              $setCardMasterId = $cardMasterIds[$ptEnDeckStatus['deck_turn_count']]; //セットするカードID
              $setCardMasterData = null; //セットするカードマスターデータ
              $setEnemyCardData = null; //セットするプレイヤーカードデータ
              $encdIndex = -1;
              foreach ($enemyDeck['card_master_datas'] as $rowCardMasterData) {
                if($rowCardMasterData['id'] == $setCardMasterId){
                  $setCardMasterData = $rowCardMasterData;
                  break;
                }
              }
              for ($encd=0; $encd < count($enemyDeck['player_card_datas']); $encd++) {
                if($enemyDeck['player_card_datas'][$encd]['card_master_id'] == $setCardMasterId){
                  $encdIndex = $encd;
                  break;
                }
              }
              if($encdIndex != -1){
                $setEnemyCardData = &$enemyDeck['player_card_datas'][$encdIndex]; //セットするプレイヤーカードデータ
              }
              else if($setCardMasterId == 1) $setEnemyCardData = createDummyPlayerCardData($nowOrder['enemy_index_id']); //初期カードが無い場合ダミーを挿入
              if($setCardMasterData == null || $setEnemyCardData == null){
                return $result['error'] = 7; //カードの選択に失敗した。
              }

              $numUpdate = cardUseNumUpdate($setEnemyCardData); //カード枚数を更新
              unset($setEnemyCardData);

              $exeCard = $setCardMasterData;
              if($numUpdate == false) $exeCard = $defaultCardData;
              $resultTargetEnemys = getPvpTargetObject($conn,false,$ptEnDeckStatus['enemy_index_id'],$enemyMemberStatus,$playerMemberStatus,$exeCard,$playerMemberFormationMasterData,$enemyMemberFormationMasterData); //攻撃対象を取得
              $enemyAttribute = array(); //プレイヤーの属性ボーナス
              foreach ($enemyMemberAttribute as $ptEnAttribute) {
                if($ptEnAttribute['player_index_id'] == $ptEnDeckStatus['enemy_index_id']){
                  $enemyAttribute = $ptEnAttribute; //プレイヤーの属性ボーナスを取得
                }
              }
              $resultSkillParam = false;
              if($numUpdate == false)  $resultSkillParam = getSkillAction($defaultCardData); //デフォルトスキルを発動
              else $resultSkillParam = getSkillAction($setCardMasterData); //スキルを発動

              if($resultSkillParam != false){
                $resultSkillType = $resultSkillParam['result_skill_type'];
                $resultUseSkill = false; //スキル使用結果
                $setSkillUseStatus = false;
                foreach ($enemyMemberStatus as $ptEnemyStatus) {
                  if($ptEnDeckStatus['enemy_index_id'] == $ptEnemyStatus['enemy_index_id']){
                    $setSkillUseStatus = $ptEnemyStatus;
                  }
                }
                $resultUseSkill = resultPvpUseSkill($conn,$setSkillUseStatus,$resultSkillParam,$resultTargetEnemys,false,$enemyAttribute); //スキル使用結果を取得する

                if($resultUseSkill != false){ //スキル結果を取得できた場合
                  $updateData = pvpUpdateStatusForSkillEffect($resultUseSkill,$playerMemberStatus,$enemyMemberStatus); //スキル効果により、プレイヤーのステータスを更新
                  if(count($updateData['battle_anim_log_data']) != 0) $battleTurn = $battleTurn + 1; //ターンを更新
                  foreach ($updateData['battle_log_data'] as $getBattleLog) {
                    $battleLog = battleLogInit($battleTurn,$getBattleLog); //バトルログの生成
                    array_push($result['battle_log'],$battleLog); //バトルログの挿入
                  }
                  foreach ($updateData['battle_anim_log_data'] as $getBattleAnimLog) {
                    $battleAnimLog = battleAnimLogInit($battleTurn,$getBattleAnimLog);
                    array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
                  }
                }
                else{
                  return $result['error'] = 10; //スキル結果の取得に失敗した。
                }
              }
              else{
                $result['error'] = 5; //スキルの発動に失敗した。
              }
              $ptEnDeckStatus['deck_turn_count'] = $ptEnDeckStatus['deck_turn_count'] + 1; //発動後はカード番号の進行度を上げる
              if(isset($cardMasterIds[$ptEnDeckStatus['deck_turn_count']]) == false){ //最後のカードナンバーを越した場合
                $ptEnDeckStatus['deck_turn_count'] = 0;
              }
              break; //発動完了後は必ずブレイクする。(2回発動してしまう。
            }
            else{
              $result['error'] = 3; //プレイヤーのデッキカードデータの取得に失敗した。
              return $result;
            }
          }
        }
        unset($ptEnDeckStatus);
      }
      //ターン終了のため、パーティのHPチェック
      $checkPartyHitPoint =  checkPartyHitPoint($playerMemberStatus,$enemyMemberStatus);
      if($checkPartyHitPoint != 0){ //勝負が決まった場合
        $battleLogFinish = array();
        $battleAnimLogFinish = array();
        if($checkPartyHitPoint == 1){ //自分の勝ち
          $battleLogFinish['battle_finish_comment'] =  $playerName."が勝利した！";//バトルログの生成
          $battleAnimLogFinish['battle_finish_result'] = "1";
          array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
          array_push($result['battle_anim_log'],$battleAnimLogFinish); //バトルアニメログの挿入
          $result['win_player_index_id'] = $playerIndexId;
        }
        else if($checkPartyHitPoint == 2){ //敵の勝ち
          $battleLogFinish['battle_finish_comment'] =  $ePlayerName."が勝利した！";//バトルログの生成
          $battleAnimLogFinish['battle_finish_result'] = "2";
          array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
          array_push($result['battle_anim_log'],$battleAnimLogFinish); //バトルアニメログの挿入
          $result['win_player_index_id'] = $enemyIndexId;
        }
        $checkBattleResult = $checkPartyHitPoint; //戦闘結果を保存
        // else if($checkPartyHitPoint == 3){ //ドロー
        //   $battleLogFinish['battle_finish_comment'] =  "引き分け";//バトルログの生成
        //   array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
        // }
        break 2; //戦闘状態から抜け出す
      }
      else if(10 <= $row){ //10ターン終了のため引き分け
        $battleLogFinish['battle_finish_comment'] =  "引き分け";//バトルログの生成
        $battleAnimLogFinish['battle_finish_result'] = "3";
        array_push($result['battle_log'],$battleLogFinish); //バトルログの挿入
        array_push($result['battle_anim_log'],$battleAnimLogFinish); //バトルアニメログの挿入
        $result['win_player_index_id'] = -1;
        $checkBattleResult = $checkPartyHitPoint; //戦闘結果を保存
        break 2; //戦闘状態から抜け出す
      }
      else{ //戦闘継続

      }
    }
    //フェーズ終了時にバフのチェックを行う
    foreach ($playerMemberStatus as &$ptPlayerStatus) {
      $checkDeleteFlag = false;
      foreach ($ptPlayerStatus['buff_status'] as &$plBuffStatus) {
        $resultBuffStatus = updateTurnEndBuffStatus($plBuffStatus,$ptPlayerStatus); //ターン終了のため、バフのステータスを更新
        if($resultBuffStatus['battle_log_data'] != false){
          $battleLog = battleLogInit($battleTurn,$resultBuffStatus['battle_log_data']); //バトルログの生成
          array_push($result['battle_log'],$battleLog); //バトルログの挿入
        }
        if($resultBuffStatus['battle_anim_log_data'] != false){
          $battleAnimLog = battleAnimLogInit($battleTurn,$resultBuffStatus['battle_anim_log_data']); //バトルアニメログの生成
          array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
        }
        if($resultBuffStatus['buff_delete_flag'] == true){
          $checkDeleteFlag = true;
        }
      }
      unset($plBuffStatus);
      foreach ($ptPlayerStatus['buff_status'] as $key => $buffValues) {
        foreach ($buffValues as $key2 => $value2) {
          if($key2 == "active_turn" && $value2 <= 0) unset($ptPlayerStatus['buff_status'][$key]);
        }
      }
      if($checkDeleteFlag == true){ //バフの削除があった場合
        $ptPlayerStatus['buff_status'] = array_values($ptPlayerStatus['buff_status']);
      }
    }
    unset($ptPlayerStatus);
    foreach ($enemyMemberStatus as &$ptEnemyStatus) {
      $checkDeleteFlag = false;
      foreach ($ptEnemyStatus['buff_status'] as &$enemyBuffStatus) {
        $resultBuffStatus = updateTurnEndBuffStatus($enemyBuffStatus,$ptEnemyStatus); //ターン終了のため、バフのステータスを更新
        if($resultBuffStatus['battle_log_data'] != false){
          $battleLog = battleLogInit($battleTurn,$resultBuffStatus['battle_log_data']); //バトルログの生成
          array_push($result['battle_log'],$battleLog); //バトルログの挿入
        }
        if($resultBuffStatus['battle_anim_log_data'] != false){
          $battleAnimLog = battleAnimLogInit($battleTurn,$resultBuffStatus['battle_anim_log_data']); //バトルアニメログの生成
          array_push($result['battle_anim_log'],$battleAnimLog); //バトルログの挿入
        }
        if($resultBuffStatus['buff_delete_flag'] == true){
          $checkDeleteFlag = true;
        }
      }
      unset($enemyBuffStatus);
      foreach ($ptEnemyStatus['buff_status'] as $key => $buffValues) {
        foreach ($buffValues as $key2 => $value2) {
          if($key2 == "active_turn" && $value2 <= 0) unset($ptEnemyStatus['buff_status'][$key]);
        }
      }
      if($checkDeleteFlag == true){ //バフの削除があった場合
        $ptEnemyStatus['buff_status'] = array_values($ptEnemyStatus['buff_status']);
      }
    }
    unset($ptEnemyStatus);
  }
  //結果出力前の最終処理
  if($result['error'] == 0){
    //戦闘ログの記録
    $mapId = -1;
    if($mapMasterData != false && isset($mapMasterData['id'])) $mapId = $mapMasterData['id'];
    $pvpBattleLogInsertId = insertPvpBattleLog($conn,json_encode($result['battle_log']),json_encode($result['battle_anim_log']),$playerPartyMember,$enemyPartyMember,$playerPartyAvatarIds,$enemyPartyAvatarIds,$playerPartyFormationId,$enemyPartyFormationId,$mapId);
    $result['insert_pvp_battle_log_id'] = $pvpBattleLogInsertId;
    //使用したカードの更新処理
    $updatePlayerCardNumResult = updatePartyPlayersCardNum($conn,$playerMemberDeckStatus,$playerMemberCardDeckData); //使用したカードの枚数を更新
    if($updatePlayerCardNumResult != 0) $result['error'] = 6; //カードの更新処理に失敗した。
    //使用したカードの更新処理
    $updateEnemyCardNumResult = updatePartyPlayersCardNum($conn,$enemyMemberDeckStatus,$enemyMemberCardDeckData); //使用したカードの枚数を更新
    if($updateEnemyCardNumResult != 0) $result['error'] = 6; //カードの更新処理に失敗した。
    //戦闘に勝利した場合
    // if($checkBattleResult == 1){
    //   //クエスト更新処理
    //   $playerQuestData = getPlayerQuestDataAndMasterData($conn,$playerIndexId,0);
    //   if(count($playerQuestData) != 0){
    //     foreach ($playerQuestData as $plQuestData) {
    //       switch ((int)$plQuestData['quest_type']) {
    //         case 0: //討伐クエスト
    //         {
    //           $killedEnemyIdsArray = array();
    //           foreach ($enemyMemberStatus as $ptEnemyStatus) {
    //             $killedEnemyIdsArray[count($killedEnemyIdsArray)] = $ptEnemyStatus['enemy_index_id'];
    //           }
    //           $killedEnemyList = implode(",",$killedEnemyIdsArray); //更新する倒した敵ID(カンマ区切り)
    //           updatePlayerSubDueQuest($conn,$playerIndexId,$plQuestData,$killedEnemyList);
    //         }
    //         break;
    //         case 1: //???
    //         {
    //
    //         }
    //         break;
    //         default:
    //         {
    //
    //         }
    //         break;
    //       }
    //     }
    //   }
    //   //報酬獲得処理
    //   // $partyDropData = array();
    //   // foreach ($playerMemberStatus as $plStatus) {
    //   //   $addPlayerDropData = array();
    //   //   $addPlayerDropData['player_index_id'] = $plStatus['player_index_id'];
    //   //   $addPlayerDropData['result_drop_data'] = array();
    //   //   $getPlayerInfo = getPlayerInfoForIndexId($conn,$plStatus['player_index_id'],true); //ドロップ獲得処理のため、パーティメンバーのプレイヤー情報を取得
    //   //   foreach ($enemyMemberStatus as $enemyData) {
    //   //     if($enemyData['drop_master_id'] != 0){ //ドロップ情報が存在した場合
    //   //       $resultDropItem = getDropItems($conn,$enemyData['drop_master_id'],$getPlayerInfo,$playerMapInstance['enemy_power']); //ドロップを取得
    //   //       $addPlayerDropData['result_drop_data'] = $resultDropItem;
    //   //       array_push($partyDropData,$addPlayerDropData);
    //   //     }
    //   //   }
    //   // }
    //   //ドロップデータをログに挿入
    //   $resultPartyDropData = array();
    //   $resultPartyDropData['party_drop_data'] = $partyDropData;
    //   array_push($result['battle_log'],$resultPartyDropData);
    //   array_push($result['battle_anim_log'],$resultPartyDropData);
    // }
  }
  return $result;
}

function getPvpBattleOrder($conn,$enemyMemberStatus,$playerMemberStatus,$agiStatusId){ //攻撃順番の結果を取得する。
  $resultBattleOrder = array();
  $tmpPlayerAgi = array();
  $tmpEnemyAgi = array();
  foreach ($playerMemberStatus as $ptPlayerStatus) {
    if(isset($ptPlayerStatus['player_index_id']) && isset($ptPlayerStatus['AGI'])){
      $adPlayerAgi = array();
      $adPlayerAgi['player_index_id'] = $ptPlayerStatus['player_index_id'];
      $adPlayerAgi['player_pos_index'] = $ptPlayerStatus['player_pos_index'];
      $adPlayerAgi['AGI'] = (int)$ptPlayerStatus['AGI'];
      array_push($tmpPlayerAgi,$adPlayerAgi);
    }
  }
  $tmpPlayerAgi = shuffle_assoc($tmpPlayerAgi); //配列をシャッフル ※同じAGIの数値がいた場合、ランダムにソートするため。
  foreach ($enemyMemberStatus as $ptEnemyStatus) {
    if(isset($ptEnemyStatus['enemy_index_id']) && isset($ptEnemyStatus['AGI'])){
      $adPlayerAgi = array();
      $adPlayerAgi['enemy_index_id'] = $ptEnemyStatus['enemy_index_id'];
      $adPlayerAgi['enemy_pos_index'] = $ptEnemyStatus['enemy_pos_index'];
      $adPlayerAgi['AGI'] = (int)$ptEnemyStatus['AGI'];
      array_push($tmpPlayerAgi,$adPlayerAgi);
    }
  }
  $tmpEnemyAgi = shuffle_assoc($tmpEnemyAgi); //配列をシャッフル ※同じAGIの数値がいた場合、ランダムにソートするため。
  $mergeAgiData = array();
  $mergeAgiData = array_merge($tmpPlayerAgi,$tmpEnemyAgi);
  foreach ($mergeAgiData as $key => $value) {
    $agiArrayKey1[$key] = $value['AGI'];
    $agiArrayKey2[$key] = $key;
  }
  array_multisort($agiArrayKey1, SORT_DESC, $agiArrayKey2, SORT_DESC, $mergeAgiData);
  return $mergeAgiData;
}

function getPvpTargetObject($conn,$playerIndexId = false,$enemyIndexId = false,$enemyMemberStatus,$playerMemberStatus,$deckCard,$playerFormationMasterData,$enemyFormationMasterData){ //攻撃対象を決定し取得
  $resultTargetData = array(); //ターゲット対象の結果
  $resultTargetData['target_is_enemy'] = array();
  $resultTargetData['target_is_player'] = array();
  $skillTargetType = $deckCard['skill_target_type']; //スキル対象のタイプ
  switch ($skillTargetType) {
    case "0": //敵単体
    {
      $priority = 0;
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        $targetEnemyList = array();
        $positionList = explode(',',$enemyFormationMasterData['positions']);
        foreach ($enemyMemberStatus as $enStatus) { //最大のプライオリティを追加
          if($enStatus['now_hp'] <= 0) continue; //対象が死んでいた場合
          if($priority < $positionList[(int)$enStatus['enemy_pos_index']]){
            $priority = $positionList[(int)$enStatus['enemy_pos_index']];
          }
          array_push($targetEnemyList,$enStatus); //ターゲットリストに挿入
        }
        $resultPriority = 0;
        $pRot = rand(0,100);
        if($priority == 2){
          if(0 <= $pRot && $pRot <= 9) $resultPriority = 0;
          else if(10 <= $pRot && $pRot <= 29) $resultPriority = 1;
          else $resultPriority = 2;
        }
        else if($priority == 1){
          if(0 <= $pRot && $pRot <= 19) $resultPriority = 0;
          else $resultPriority = 1;
        }
        else{
          $resultPriority = 0;
        }
        $targetEnList = array(); //ターゲット候補のプレイヤー格納配列
        $targetCheck = false; //最低一人でもターゲットが存在したか
        foreach ($targetEnemyList as $enStatus) {
          if($resultPriority == $enStatus['enemy_pos_index']){
            array_push($targetEnList,$enStatus);
            $targetCheck = true;
          }
        }
        if(count($targetEnemyList) != 0 && $targetCheck == false){ //選択されたターゲットが存在せず、生存者が居た場合
          array_push($targetEnList,$targetEnemyList[0]); //先頭のプレイヤーを選択
        }
        if(count($targetEnList) != 0){
          $rotTargetEnemyIndex = rand(0,(count($targetEnList) - 1));
          array_push($resultTargetData['target_is_enemy'],$targetEnList[$rotTargetEnemyIndex]); //ターゲットのデータを追加
        }
      }
      else{ //攻撃者が敵の場合
        $targetPlayerList = array();
        $positionList = explode(',',$playerFormationMasterData['positions']);
        foreach ($playerMemberStatus as $plStatus) { //最大のプライオリティを追加
          if($plStatus['now_hp'] <= 0) continue; //対象が死んでいた場合
          if($priority < $positionList[(int)$plStatus['player_pos_index']]){
            $priority = $positionList[(int)$plStatus['player_pos_index']];
          }
          array_push($targetPlayerList,$plStatus); //ターゲットリストに挿入
        }
        $resultPriority = 0;
        $pRot = rand(0,100);
        if($priority == 2){
          if(0 <= $pRot && $pRot <= 9) $resultPriority = 0;
          else if(10 <= $pRot && $pRot <= 29) $resultPriority = 1;
          else $resultPriority = 2;
        }
        else if($priority == 1){
          if(0 <= $pRot && $pRot <= 19) $resultPriority = 0;
          else $resultPriority = 1;
        }
        else{
          $resultPriority = 0;
        }
        $targetPlList = array(); //ターゲット候補のプレイヤー格納配列
        $targetCheck = false; //最低一人でもターゲットが存在したか
        foreach ($targetPlayerList as $plStatus) {
          $checkPriority = $positionList[(int)$plStatus['player_pos_index']];
          if($resultPriority == $checkPriority){
            array_push($targetPlList,$plStatus);
            $targetCheck = true;
          }
        }
        if(count($targetPlayerList) != 0 && $targetCheck == false){ //選択されたターゲットが存在せず、生存者が居た場合
          array_push($targetPlList,$targetPlayerList[0]); //戦闘のプレイヤーを選択
        }
        if(count($targetPlList) != 0){
          $rotTargetPlayerIndex = rand(0,(count($targetPlList) - 1));
          array_push($resultTargetData['target_is_player'],$targetPlList[$rotTargetPlayerIndex]); //ターゲットのデータを追加
        }
      }
    }
    break;
    case "1": //敵全体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if(0 < $enemyStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($playerMemberStatus as $plStatus) {
          if(0 < $plStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "2": //味方(自身)単体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($playerMemberStatus as $plStatus) {
          if($plStatus['player_index_id'] == $playerIndexId){ //自分
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if($enemyStatus['enemy_index_id'] == $enemyIndexId && $enemyStatus['enemy_pos_index'] == $enemyIndexId){ //攻撃者の場合
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "3": //味方全体
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($playerMemberStatus as $plStatus) {
          if(0 < $plStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
          }
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          if(0 < $enemyStatus['now_hp']){ //対象が生きている
            array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
          }
        }
      }
    }
    break;
    case "4": //味方が死んでても有効
    {
      if($playerIndexId != false){ //攻撃者がプレイヤーの場合
        foreach ($playerMemberStatus as $plStatus) {
          array_push($resultTargetData['target_is_player'],$plStatus); //ターゲットのデータを追加
        }
      }
      else{ //攻撃者が敵の場合
        foreach ($enemyMemberStatus as $enemyStatus) {
          array_push($resultTargetData['target_is_enemy'],$enemyStatus); //ターゲットのデータを追加
        }
      }
    }
    break;
    default:
    break;
  }
  return $resultTargetData;
}

function resultPvpUseSkill($conn,$skillUseStatus,$resultSkillParam,$resultTargetEnemys,$playerAttribute,$enemyAttribute){ //スキル使用後のステータスを更新&取得 skillUse 0:player 1:enemy
  $result['card_master_id'] = $resultSkillParam['result_card_master_id']; //カードのID
  $result['card_name'] = $resultSkillParam['result_card_name']; //発動したカード名
  $result['skill_type'] = $resultSkillParam['result_skill_type']; //発動したスキルタイプ
  $result['skill_anim_type'] = $resultSkillParam['result_skill_anim_type']; //スキルアニメのタイプ
  $result['card_asset_id'] = $resultSkillParam['result_card_asset_id']; //カードのアセットID
  $result['card_rank'] = $resultSkillParam['result_card_rank']; //カードのランク
  $result['result_skill_effect'] = array(); //スキル効果結果を返すオブジェクト
  $targetEnemys = $resultTargetEnemys['target_is_enemy'];
  $targetPlayers = $resultTargetEnemys['target_is_player'];
  $playerStatus = false;
  $enemyStatus = false;
  $resultAtk = 0;
  $targetObj = false;

  if(count($targetEnemys) != 0){ //敵がターゲット
    foreach ($targetEnemys as $tgEnemy) {
      $resultAddSkillEffect = pvpSkillEffectCommit($skillUseStatus,$resultSkillParam,$tgEnemy,$playerAttribute,false); //スキル効果を発動
      array_push($result['result_skill_effect'],$resultAddSkillEffect);
    }
  }
  if(count($targetPlayers) != 0){ //プレイヤーがターゲット
    foreach ($targetPlayers as $tgPlayer) {
      $resultAddSkillEffect = pvpSkillEffectCommit($skillUseStatus,$resultSkillParam,$tgPlayer,false,$enemyAttribute); //スキル効果を発動
      array_push($result['result_skill_effect'],$resultAddSkillEffect);
    }
  }
  return $result;
}

function pvpSkillEffectCommit($skillUseStatus,$resultSkillParam,$tgObject,$playerAttribute,$enemyAttribute)
{
  $resultAddParam = 0;
  if(isset($resultSkillParam['physics_or_magic'])){
    if($resultSkillParam['result_skill_type'] == 0){ //攻撃スキル
      $baseAtkPoint = 0; //基本攻撃ポイント
      $attributeAtkPoint = 0; //属性攻撃ポイント
      $skillAttribute = -1; //属性
      $resultAttributeAtkPoint = 0; //属性ボーナスで変換された属性攻撃ポイント
      $resultAtk = 0; //プレイヤーの攻撃を行う攻撃ポイント
      if(isset($resultSkillParam['base_atk_point'])){ //基本攻撃ポイント
        $baseAtkPoint = $resultSkillParam['base_atk_point'];
        if(isset($resultSkillParam['attribute_atk_point'])){ //属性攻撃ポイント
          if(isset($resultSkillParam['skill_attribute'])){ //スキルの属性
            $selectAttribute = false;
            if($playerAttribute != false) $selectAttribute = $playerAttribute;
            else $selectAttribute = $enemyAttribute;
            foreach ($selectAttribute as $key => $value) {
              $keyName = "attribute_".$resultSkillParam['skill_attribute'];
              if($key == $keyName){
                $resultAttributeAtkPoint = round($resultSkillParam['attribute_atk_point'] * ($value * 0.01)); //属性ボーナス含めた属性攻撃ポイント確定
              }
            }
          }
        }
      }
      if($baseAtkPoint != 0){ //攻撃する数値があった場合
        $resultAtk = $resultAtk + $baseAtkPoint;
      }
      if($resultAttributeAtkPoint != 0){ //属性ボーナスがあった場合
        $resultAtk = $resultAtk + $resultAttributeAtkPoint;
      }
      //敵の防御力によってダメージを変更する。
      if($resultAtk != 0){
        $getBaseAtk = 0;
        $getBaseDef = 0;
        if($resultSkillParam['physics_or_magic'] == 0){ //物理攻撃
          $getBaseAtk = $skillUseStatus['ATK'];
          $getBaseDef= $tgObject['DEF'];
        }
        else{
          $getBaseAtk = $skillUseStatus['M_ATK'];
          $getBaseDef= $tgObject['M_DEF'];
        }
        $mergeAtk = $getBaseAtk + $resultAtk; //スキルの攻撃とステータスの攻撃を連結
        $resultAddParam = false;
        $resultAddParam = getHitPointDamage($mergeAtk,$getBaseDef,$skillUseStatus['LUCK'],$tgObject['LUCK'],$skillUseStatus['AGI'],$tgObject['AGI'],null); //攻撃に　よって与えたダメージを出す
        if(is_array($resultAddParam)){
          $resultAddParam['skill_use_status'] = $skillUseStatus;
          $resultAddParam['target_status'] = $tgObject;
        }
      }
      else{
        return 2; //攻撃スキルの設定が不正だった。
      }
    }
    else if($resultSkillParam['result_skill_type'] == 1){ //バフスキルタイプ
      $resultBuffEffectData = false; //バフ効果の結果
      $skillAttribute = $resultSkillParam['skill_attribute']; //スキルの属性
      $buffStatusId = (int)$resultSkillParam['buff_status_id']; //バフのステータス
      $parcentBuffPoint = (int)$resultSkillParam['percent_buff_point']; //パーセントのバフ
      $baseBuffPoint = (int)$resultSkillParam['base_buff_point']; //基本バフ上昇量
      $mndLevel = (int)$resultSkillParam['mnd_level']; //MNDの適正値
      $buffSubStatusId = (int)$resultSkillParam['buff_sub_status_id']; //バフに影響するサブステータスID(now_hpなど)
      $myMndLevelPercent = (int)$resultSkillParam['my_mnd_level_percent']; //自分のMNDが加算される%
      $targetMndLevelPercent = (int)$resultSkillParam['target_mnd_level_percent']; //自分のMNDが加算される%
      $buffSkillGroupId = (int)$resultSkillParam['buff_skill_group_id']; //バフのスキルグループID
      $buffCardMasterId = (int)$resultSkillParam['buff_card_master_id']; //バフのカードID
      $activeTurn = (int)$resultSkillParam['active_turn']; //バフの継続するターン
      $debuffFlag = (int)$resultSkillParam['debuff_flag']; //デバフかの判定
      if($resultSkillParam['physics_or_magic'] == 0){ //物理タイプのバフ
      }
      else{ //魔法タイプのバフ
      }
      if(!isset($STATUS_IDS)) $STATUS_IDS = array('HP' => 1, 'ATK' => 2, 'DEF' => 3, 'M_ATK' => 4, 'M_DEF' => 5, 'AGI' => 6, 'MND' => 7, 'VIT' => 8, 'STM' =>9, 'LUCK' => 10);
      $statusKeyName = ""; //ステータスネーム
      foreach ($STATUS_IDS as $key => $value) {
        if($value == $buffStatusId){ //ステータスIDが一致した場合
          $statusKeyName = $key;
        }
      }
      if($buffSubStatusId != 0){
        //現在の変動HP変更の場合
        if($buffSubStatusId == 1) $resultAddParam = getBuffEffectPoint($buffStatusId,"now_hp",$skillUseStatus,$tgObject,$mndLevel,$parcentBuffPoint,$baseBuffPoint,$myMndLevelPercent,$targetMndLevelPercent,$debuffFlag);
      }
      else if($statusKeyName != ""){
        //バフ効果の結果を取得
        $resultAddParam = getBuffEffectPoint($buffStatusId,$statusKeyName,$skillUseStatus,$tgObject,$mndLevel,$parcentBuffPoint,$baseBuffPoint,$myMndLevelPercent,$targetMndLevelPercent,$debuffFlag);
      }
      if(is_array($resultAddParam)){
        $resultAddParam['buff_skill_group_id'] = $buffSkillGroupId;
        $resultAddParam['buff_card_master_id'] = $buffCardMasterId;
        $resultAddParam['skill_use_status'] = $skillUseStatus;
        $resultAddParam['target_status'] = $tgObject;
        $resultAddParam['active_turn'] = $activeTurn;
        $resultAddParam['debuff_flag'] = $debuffFlag;
      }
      else {
        return 3; //バフスキルの設定に不正があった。
      }
    }
  }
  else{
    return 1; //属性タイプを取得できなかった
  }
  return $resultAddParam;
}

function pvpUpdateStatusForSkillEffect($resultUpdateParam,&$partyMemberStatus,&$enemyMemberStatus){
  $result = array();
  $result['battle_log_data'] = array();
  $result['battle_anim_log_data'] = array();
  $result['skill_update_error'] = 0; //0:正常
  if(isset($resultUpdateParam['result_skill_effect']) && isset($resultUpdateParam['card_name']) && isset($resultUpdateParam['skill_type'])){
    $skillType = (int)$resultUpdateParam['skill_type'];
    foreach ($resultUpdateParam['result_skill_effect'] as $updateParam) { //スキル効果分回す
      $addBattleLogData = array();
      $addBattleLogData['skill_name'] = $resultUpdateParam['card_name']; //スキル名を挿入
      $addBattleAnimLogData = array();
      $addBattleAnimLogData['skill_anim_type'] = $resultUpdateParam['skill_anim_type'];
      $addBattleAnimLogData['skill_type'] = $skillType;
      $addBattleAnimLogData['card_asset_id'] = $resultUpdateParam['card_asset_id'];
      $addBattleAnimLogData['card_rank'] = $resultUpdateParam['card_rank'];
      $addBattleAnimLogData['card_master_id'] = $resultUpdateParam['card_master_id'];
      switch ($skillType) {
        case 0: //攻撃スキル
        {
          $targetStatus = false; //ターゲット(スキルを受ける)対象のステータス
          $skillUseStatus = false; //スキル使用者のステータス
          if(isset($updateParam['target_status']) && isset($updateParam['skill_use_status'])){
            $targetStatus = $updateParam['target_status'];
            $skillUseStatus = $updateParam['skill_use_status'];
            if(isset($skillUseStatus['player_index_id'])){
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_player_pos'] = $skillUseStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_enemy_pos'] = $skillUseStatus['enemy_pos_index'];
            }
            if(isset($targetStatus['player_index_id'])){
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_player_pos'] = $targetStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_enemy_pos'] = $targetStatus['enemy_pos_index'];
            }
          }
          if($targetStatus != false && $skillUseStatus != false){
            if(isset($targetStatus['player_index_id'])) $selectPartyMemberStatus = &$partyMemberStatus;
            else $selectPartyMemberStatus = &$enemyMemberStatus;
            foreach ($selectPartyMemberStatus as &$tgStatus) {
              //対象の敵を指定。
              $matching = false;
              if(isset($targetStatus['player_index_id'])){
                if($tgStatus['player_index_id'] == $targetStatus['player_index_id']){
                  $matching = true;
                }
              }
              else{
                if($tgStatus['enemy_index_id'] == $targetStatus['enemy_index_id'] && $tgStatus['enemy_pos_index'] == $targetStatus['enemy_pos_index'])
                {
                  $matching = true;
                }
              }
              if($matching == true){
                if(isset($updateParam['agi_miss']) && $updateParam['agi_miss'] != 0){ //攻撃をミスした場合
                  $addBattleLogData['agi_miss_comment'] = "は攻撃を回避した！";
                  $addBattleAnimLogData['agi_miss'] = "1";
                }
                else if(isset($updateParam['miss']) && $updateParam['miss'] != 0){ //攻撃が効かなかった場合
                  $addBattleLogData['miss_comment'] = "の攻撃は弾かれた！";
                  $addBattleAnimLogData['miss'] = "1";
                }
                else if(isset($updateParam['damage']) && $updateParam['damage'] != 0){ //ダメージが含まれていた
                  if(isset($updateParam['parry']) && $updateParam['parry'] == 1){ //パリィをした。
                    $addBattleLogData['parry_comment'] = "にパリィの効果";
                    $addBattleAnimLogData['parry'] = "1";
                  }
                  if(isset($updateParam['combo'])){ //コンボの数値を更新
                    $addBattleAnimLogData['combo'] = $updateParam['combo'];
                  }
                  $addBattleAnimLogData['max_hp'] = $tgStatus['HP'];
                  $addBattleLogData['skill_comment_1'] = "は";
                  $addBattleLogData['skill_comment_2'] = $updateParam['damage']."のダメージを受けた!";
                  $addBattleAnimLogData['skill_power_point'] = $updateParam['damage'];
                  $addBattleAnimLogData['now_hp_befor'] = $tgStatus['now_hp'];
                  $tgStatus['now_hp'] = $tgStatus['now_hp'] - $updateParam['damage'];
                  $addBattleAnimLogData['now_hp_after'] = $tgStatus['now_hp'];
                  if($tgStatus['now_hp'] <= 0){
                    if(isset($addBattleLogData['skill_target_name'])){
                      $addBattleLogData['dead_comment'] = $addBattleLogData['skill_target_name']."は力尽きた";
                      $addBattleAnimLogData['dead_anim'] = "1";
                    }
                  }
                  if($tgStatus['now_hp'] < 0){
                    $tgStatus['over_kill_val'] = ($tgStatus['now_hp'] * -1); //オーバーキル用パラメーター追加
                    $tgStatus['now_hp'] = 0;
                  }
                }
              }
            }
            unset($tgStatus);
          }
          else{
            $result['skill_update_error'] = 2;
            return $result; //ターゲット、スキル使用者 のいずれかの結果取得に失敗した。
          }
        }
        break;
        case 1: //バフスキル
        {
          if(isset($updateParam['combo'])){ //バフの場合は現時点ではcomboは必ず1
            $addBattleAnimLogData['combo'] = $updateParam['combo'];
          }
          $addBattleLogData['skill_comment_1'] = "に";
          $addBattleLogData['skill_comment_2'] = "「".$addBattleLogData['skill_name']."」の効果";
          $debuffFlag = false;
          if(isset($updateParam['debuff_flag']))
          {
            if($updateParam['debuff_flag'] == 1) $debuffFlag = true; //デバフスキルだった
          }
          $targetStatus = false; //ターゲット(スキルを受ける)対象のステータス
          $skillUseStatus = false; //スキル使用者のステータス
          if(isset($updateParam['target_status']) && isset($updateParam['skill_use_status'])){
            $targetStatus = $updateParam['target_status'];
            $skillUseStatus = $updateParam['skill_use_status'];
            if(isset($skillUseStatus['player_index_id'])){
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_player_pos'] = $skillUseStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_use_name'] = $skillUseStatus['player_name'];
              $addBattleAnimLogData['use_enemy_pos'] = $skillUseStatus['enemy_pos_index'];
            }
            if(isset($targetStatus['player_index_id'])){
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_player_pos'] = $targetStatus['player_pos_index'];
            }
            else{
              $addBattleLogData['skill_target_name'] = $targetStatus['player_name'];
              $addBattleAnimLogData['target_enemy_pos'] = $targetStatus['enemy_pos_index'];
            }
          }
          if($targetStatus != false && $skillUseStatus != false){
            if(isset($targetStatus['player_index_id'])) $selectPartyMemberStatus = &$partyMemberStatus;
            else $selectPartyMemberStatus = &$enemyMemberStatus;
            foreach ($selectPartyMemberStatus as &$tgStatus) {
              //バフを付与する対象を取得。
              $matching = false;
              if(isset($targetStatus['player_index_id'])){
                if($tgStatus['player_index_id'] == $targetStatus['player_index_id']){
                  $matching = true;
                }
              }
              else{
                if($tgStatus['enemy_index_id'] == $targetStatus['enemy_index_id'] && $tgStatus['enemy_pos_index'] == $targetStatus['enemy_pos_index'])
                {
                  $matching = true;
                }
              }
              if($matching == true){
                if(isset($updateParam['buff_status_name']) && isset($updateParam['result_add_buff_status_point'])
                && isset($updateParam['buff_skill_group_id']) && isset($updateParam['buff_card_master_id'])){
                  $addBattleAnimLogData['skill_power_point'] = $updateParam['result_add_buff_status_point']; //スキルの威力をログに挿入
                  if($debuffFlag == false){
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_befor'] = $tgStatus[$updateParam['buff_status_name']];
                    $tgStatus[$updateParam['buff_status_name']] = $tgStatus[$updateParam['buff_status_name']] + $updateParam['result_add_buff_status_point'];
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_after'] = $tgStatus[$updateParam['buff_status_name']];
                    if($updateParam['buff_status_name'] == "HP") $addBattleAnimLogData['max_hp'] = $tgStatus[$updateParam['buff_status_name']];
                  }
                  else{ //デバフの場合
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_befor'] = $tgStatus[$updateParam['buff_status_name']];
                    $tgStatus[$updateParam['buff_status_name']] = $tgStatus[$updateParam['buff_status_name']] - $updateParam['result_add_buff_status_point'];
                    if($updateParam['buff_status_name'] == "now_hp") $addBattleAnimLogData['now_hp_after'] = $tgStatus[$updateParam['buff_status_name']];
                    if($updateParam['buff_status_name'] == "HP") $addBattleAnimLogData['max_hp'] = $tgStatus[$updateParam['buff_status_name']];
                    //固定ステータスは1より下にしない
                    if($updateParam['buff_status_name'] != "now_hp" && $tgStatus[$updateParam['buff_status_name']] <= 0) {
                      $tgStatus[$updateParam['buff_status_name']] = 1;
                    }
                  }
                  if($updateParam['buff_status_name'] == "now_hp"){ //変動HPが更新された場合
                    $addBattleAnimLogData['max_hp'] = $tgStatus['HP'];
                    //最大HPを超えていた場合
                    if($tgStatus['HP'] < $tgStatus[$updateParam['buff_status_name']]){
                      $tgStatus[$updateParam['buff_status_name']] = $tgStatus['HP'];
                    }
                    if($tgStatus['now_hp'] <= 0){
                      if(isset($addBattleLogData['skill_target_name'])){
                        $addBattleLogData['dead_comment'] = $addBattleLogData['skill_target_name']."は力尽きた";
                        $addBattleAnimLogData['dead_anim'] = "1";
                      }
                    }
                    //オーバーキルが発生した場合
                    if($tgStatus[$updateParam['buff_status_name']] < 0){
                      $overkillVal = $tgStatus[$updateParam['buff_status_name']];
                      $tgStatus[$updateParam['buff_status_name']] = 0;
                      $tgStatus['over_kill_val'] = $overkillVal; //オーバーキルを追加
                    }
                  }
                  if($updateParam['active_turn'] == 0){ //一度だけの発動だった場合はバフ配列に追加しない

                  }
                  else{
                    if(!isset($tgStatus['over_kill_val']) && $tgStatus['now_hp'] != 0){ //対象が生きている場合
                      $addBuffStatus = array(); //バフステータス格納用配列
                      $addBuffStatus['up_status_val'] = $updateParam['result_add_buff_status_point']; //ステータス上昇量
                      $addBuffStatus['buff_skill_group_id'] = $updateParam['buff_skill_group_id']; //バフスキルグループID
                      $addBuffStatus['buff_card_master_id'] = $updateParam['buff_card_master_id']; //バフのカードID
                      $addBuffStatus['buff_status_name'] = $updateParam['buff_status_name']; //バフステータスネーム
                      $addBuffStatus['buff_status_id'] = $updateParam['buff_status_id']; //バフステータスID
                      $addBuffStatus['active_turn'] = $updateParam['active_turn']; //継続ターン
                      $addBuffStatus['debuff_flag'] = $updateParam['debuff_flag']; //デバフフラグ
                      $addBuffStatus['buff_battle_log'] = $addBattleLogData; //バトルログの格納
                      $addBuffStatus['buff_battle_anim_log'] = $addBattleAnimLogData; //バトルアニメログの格納
                      //バフステータスのチェック
                      $buffDuplicateCheck = false;
                      foreach ($tgStatus['buff_status'] as &$buffStatus) {
                        //既に発動しているバフだった
                        if($buffStatus['buff_card_master_id'] == $updateParam['buff_card_master_id'])
                        {
                          $buffStatus = $addBuffStatus; //継続ターンだけ更新
                          $buffDuplicateCheck = true;
                          break;
                        }
                        //既に存在したバフステータスグループだった。
                        if($buffStatus['buff_skill_group_id'] != 0 && $buffStatus['buff_skill_group_id'] == $updateParam['buff_skill_group_id']){
                          $buffStatus = $addBuffStatus; //効果を上書き
                          $buffDuplicateCheck = true;
                          break;
                        }
                      }
                      unset($buffStatus);
                      if($buffDuplicateCheck == false){ //追加可能なバフだった場合
                        array_push($tgStatus['buff_status'],$addBuffStatus); //バフステータス配列を追加
                      }
                    }
                  }
                }
              }
            }
            unset($tgStatus);
          }
        }
        break;
        case 2: //デバフスキル
        {

        }
        break;
        default:
        break;
      }
      array_push($result['battle_log_data'],$addBattleLogData);
      array_push($result['battle_anim_log_data'],$addBattleAnimLogData);
    }
  }
  return $result; //正常
}

//PvPバトルログを挿入する
function insertPvpBattleLog($conn,$battleLog,$battleAnimLog,$playerPartyMember,$enemyPartyMember,$playerPartyAvatarIds,$enemyPartyAvatarIds,$playerPartyFormationId,$enemyPartyFormationId,$mapId){
  $resultId = -1;
  try{
    $conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO pvp_battle_log_json (battle_log, battle_anim_log, player_party_member_ids,
      enemy_party_member_ids, player_party_avatar_ids, enemy_party_avatar_ids, player_party_formation_id, enemy_party_formation_id, map_id)
    VALUES (:battle_log, :battle_anim_log, :player_party_member_ids,
      :enemy_party_member_ids, :player_party_avatar_ids, :enemy_party_avatar_ids, :player_party_formation_id, :enemy_party_formation_id, :map_id)");
    $stmt->bindParam(':battle_log', $battleLog, PDO::PARAM_STR);
    $stmt->bindParam(':battle_anim_log', $battleAnimLog, PDO::PARAM_STR);
    $stmt->bindParam(':player_party_member_ids', $playerPartyMember, PDO::PARAM_STR);
    $stmt->bindParam(':enemy_party_member_ids', $enemyPartyMember, PDO::PARAM_STR);
    $stmt->bindParam(':player_party_avatar_ids', $playerPartyAvatarIds, PDO::PARAM_STR);
    $stmt->bindParam(':enemy_party_avatar_ids', $enemyPartyAvatarIds, PDO::PARAM_STR);
    $stmt->bindParam(':player_party_formation_id', $playerPartyFormationId, PDO::PARAM_INT);
    $stmt->bindParam(':enemy_party_formation_id', $enemyPartyFormationId, PDO::PARAM_INT);
    $stmt->bindParam(':map_id', $mapId, PDO::PARAM_INT);
    $stmt->execute();
    $resultId = $conn->lastInsertId('id');
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $resultId = -1;
  }
  return $resultId;
}

//PvPログをidから検索して取得
function getPvpBattleLog($conn,$pvpBattleLogId){
  $sql = "SELECT * FROM pvp_battle_log_json WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($pvpBattleLogId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//リストから衛兵情報を取得
function getGuardPlayerDatas($conn,$guardPlayerList){
  $getGuardPlayerInfos = array();
  $columnName = "guard_master.active_condition";
  $direction = "ASC";
  $Ids = explode(",",$guardPlayerList);
  //$Ids[count($Ids)] = "1"; //衛兵を設定
  $selectIds = substr(str_repeat(',?', count($Ids)), 1);
  $sql = "SELECT * FROM player_info LEFT JOIN guard_master
  ON player_info.player_id = guard_master.player_index_id
  WHERE player_info.player_index_id IN ({$selectIds}) ORDER BY $columnName $direction";
  $stmt = $conn->prepare($sql);
  $stmt->execute($Ids);
  $getGuardPlayerInfos = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getGuardPlayerInfos;
}

//PVPマッチングを開始し、対戦相手のプレイヤーデータを取得
function startPvpMatching($conn,$playerIndexId,$playerPartyIndexId,$areaId,$searchType = 0){
  $result = false;
  $columnName = "create_dttm";
  $direction = "ASC";
  if($searchType == 0) $sql = "SELECT * FROM player_search WHERE area_id=?";
  else $sql = "SELECT * FROM player_search WHERE area_id=? AND search_type=?";
  $sql = $sql." ORDER BY $columnName $direction";
  $stmt = $conn->prepare($sql);
  if($searchType == 0)$stmt->execute(array($areaId));
  else $stmt->execute(array($areaId,$searchType));
  $selectPlayerSearchs = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if(count($selectPlayerSearchs) != 0){
    $rot = rand(0,(count($selectPlayerSearchs) - 1));
    $selectSearchPl = $selectPlayerSearchs[$rot];
    if($selectSearchPl['player_index_id'] != $playerIndexId){ //自分とは対戦出来ない
      $selectPayerData = getPlayerInfoForIndexId($conn,$selectSearchPl['player_index_id'],true);
      if($selectPayerData != false){
        if($selectPayerData['player_party_index_id'] != $playerPartyIndexId){ //自分のパーティとは戦えない
          $result = $selectPayerData;
          $result['search_type'] = $selectSearchPl['search_type'];
        }
      }
    }
  }
  else { //プレイヤー検索後、該当が0件の場合
    if($searchType == 2){ //救援が居なかった場合
      $guardSearchType = 20; //衛兵が参加可能か検索
      $sql = "SELECT * FROM player_search WHERE area_id=? AND search_type=?";
      $stmt = $conn->prepare($sql);
      if($searchType == 0)$stmt->execute(array($areaId));
      else $stmt->execute(array($areaId,$guardSearchType));
      $selectPlayerSearchs = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if(count($selectPlayerSearchs) != 0){
        $rot = rand(0,(count($selectPlayerSearchs) - 1));
        $selectSearchPl = $selectPlayerSearchs[$rot];
        if($selectSearchPl['player_index_id'] != $playerIndexId){ //自分とは対戦出来ない
          $selectPayerData = getPlayerInfoForIndexId($conn,$selectSearchPl['player_index_id'],true);
          if($selectPayerData != false){
            if($selectPayerData['player_party_index_id'] != $playerPartyIndexId){ //自分のパーティとは戦えない
              $result = $selectPayerData;
              $result['search_type'] = $selectSearchPl['search_type'];
            }
          }
        }
      }
    }
  }
  return $result;
}
