<?php

class BattleResponse { //クライアントに返すデータを作成するクラス

  function GetEntryDatas($battleInstance){ //参加者データを取得
    $result = array();

    foreach ($battleInstance->entryDatas as $entryData) {
      $addData = array();
      $addData['unique_no'] = $entryData->uniqueNo;

      $addData['entry_type'] = array();
      $addData['entry_type']['type'] = $entryData->battleEntryType->type;
      $addData['entry_type']['id'] = $entryData->battleEntryType->id;

      $addData['pos'] = array();
      $addData['pos']['x'] = $entryData->pos['x'];
      $addData['pos']['y'] = $entryData->pos['y'];

      $addData['name'] = $entryData->name;

      $addData['party_instance'] = array();
      $addData['party_instance']['team_no'] = $entryData->partyInstance->teamNo;
      $addData['party_instance']['formation'] = $entryData->partyInstance->formation;

      $addData['direction'] = $entryData->direction;

      $addData['direction_disp'] = $entryData->directionDisp;

      $addData['level'] = $entryData->level;

      $addData['class_id'] = $entryData->classId;

      $addData['base_status'] = $entryData->baseStatus;

      $addData['status'] = $entryData->status;

      $addData['cards'] = $entryData->cards;

      $addData['prize_cards'] = $entryData->prizeCards;

      $addData['equip_items'] = $entryData->equipItems;

      $addData['equip_item_param'] = $entryData->equipItemParam;

      $addData['attribute'] = $entryData->attribute;

      $addData['avatar_data'] = $entryData->avatarData;

      $addData['enemy_master_data'] = $entryData->enemyMasterData;

      $addData['enemy_asset_master'] = $entryData->enemyAssetMaster;

      $addData['buffs'] = array();

      foreach ($entryData->buffs as $buff) {
        $addBuffData = array();
        $addBuffData['buff_id'] = $buff->buffId;
        $addBuffData['buff_master_data'] = $buff->buffData->buffMasterData;
        $addBuffData['name'] = $buff->buffData->name;
        $addBuffData['update_status_types'] = $buff->buffData->updateStatusTypes;
        $addBuffData['status_ids'] = $buff->buffData->statusIds;
        $addBuffData['update_params'] = $buff->buffData->updateParams;
        $addBuffData['turn'] = $buff->buffData->turn;
        $addBuffData['effect_image_id'] = $buff->buffData->effectImageId;
        array_push($addData['buffs'],$addBuffData);
      }

      $addData['is_dead'] = $entryData->isDead;

      $addData['hp'] = $entryData->hp;

      $addData['vitality'] = $entryData->vitality;

      $addData['bp'] = $entryData->bp;

      $addData['vitality_penalty'] = $entryData->vitalityPenalty;

      $addData['host'] = $entryData->host;

      array_push($result,$addData);
    }
    return $result;
  }

  function GetPositions($battleInstance){ //戦闘参加者の位置情報を返す
    $result = array();

    foreach ($battleInstance->entryDatas as $entryData) {
      $addData = array();
      $addData['entry_type'] = array();
      $addData['entry_type']['type'] = $entryData->battleEntryType->type;
      $addData['entry_type']['id'] = $entryData->battleEntryType->id;

      $addData['pos'] = array();
      $addData['pos']['x'] = $entryData->pos['x'];
      $addData['pos']['y'] = $entryData->pos['y'];

      array_push($result,$addData);
    }
    return $result;
  }

  function GetMasterDatas($battleInstance){ //インスタンスに登録されている、マスターデータを取得
    $result = array();
    $result['card_master_datas'] = $battleInstance->cardMasterDatas;
    $result['buff_master_datas'] = $battleInstance->buffMasterDatas;
    $result['equip_item_master_datas'] = $battleInstance->equipItemMasterDatas;
    $result['equip_item_param_master_datas'] = $battleInstance->equipItemParamMasterDatas;
    $result['rank_master_datas'] = $battleInstance->rankMasterDatas;
    $result['battle_event_master_data'] = $battleInstance->battleEventMasterData;
    return $result;
  }

  function GetPermissionDatas($battleInstance){ //パーミッションデータを取得
    $result = array();
    for ($i=0; $i < count($battleInstance->permission->permissionTypes); $i++) {
      $keyName = $battleInstance->permission->permissionTypes[$i];
      $result[$keyName] = array();
      foreach ($battleInstance->permission->registerDatas[$keyName] as $register) {
        array_push($result[$keyName],$register);
      }
    }
    return $result;
  }

  function GetHostUniqueNo($battleInstance){ //ホストのユニークNOを取得
    return $battleInstance->hostUniqueNo;
  }

  function GetMoveAreas($battleInstance){ //移動範囲を取得
    $result = array();
    foreach ($battleInstance->entryDatas as $entryData) {
      $addData = array();
      $addData['unique_no'] = $entryData->uniqueNo;
      $addData['positions'] = $entryData->moveAreas;
      array_push($result,$addData);
    }
    return $result;
  }

  function GetBattleLogs($battleInstance){ //戦闘ログを取得
    return $battleInstance->battleLog->battleLog;
  }

  function PermissionSelectMoveArea($battleInstance,$moveAreas){ //GetMoveAreaで得たデータの中から、コントロール権限のあるエントリーデータの移動範囲だけを取得
    $result = array();
    foreach ($moveAreas as $moveArea) {
      //パーミッションチェック
      if($battleInstance->permission->CheckPermission($moveArea['unique_no'],"add_action")){
        array_push($result,$moveArea);
      }
    }
    return $result;
  }

  //現在のターンを取得
  function GetBattleTurn($battleInstance){
    return $battleInstance->battleTurn;
  }

  //行動順のユニークNoを取得
  function GetActionListUniqueNos($battleInstance){
    return $battleInstance->actionListUniqueNos;
  }

  //全ターンの行動順のユニークNoを取得
  function GetResultActionListUniqueNos($battleInstance){
    return $battleInstance->resultActionListUniqueNos;
  }

  //全てのターンの参加者データを取得
  function GetResultEntryDatas($battleInstance){
    return $battleInstance->resultEntryDatas;
  }

  //1ターン前の参加者データを取得
  function GetResultBeforEntryDatas($battleInstance){
    $result = array();
    $turn = $battleInstance->battleTurn - 1;
    if(isset($battleInstance->resultEntryDatas[$turn])){
      $result = $battleInstance->resultEntryDatas[$turn];
    }
    return $result;
  }

  //ステータス値を取得
  function GetStatus($battleInstance,$statusId){
    $result = array();
    foreach ($battleInstance->entryDatas as $entryData) {
      $statusVal = $entryData->GetStatusTotal($statusId);
      $addData = array();
      $addData['unique_no'] = $entryData->uniqueNo;
      $addData['status_id'] = $statusId;
      $addData['status_val'] = $statusVal;
      array_push($result,$addData);
    }
    return $result;
  }

  //ゲーム結果を取得
  function GetGameResult($battleInstance){
    //結果が出ていない場合はnull
    if($battleInstance->battleResult == null) return null;
    $result = array();
    $result['win_team'] = $battleInstance->battleResult['win_team'];
    $result['lose_teams'] = $battleInstance->battleResult['lose_teams'];
    $result['win_team_battle_entry_type'] = array();
    $result['lose_team_battle_entry_type'] = array();
    foreach ($battleInstance->battleResult['win_team_battle_entry_type'] as $entryType) {
      $addData = array();
      $addData['type'] = $entryType->type;
      $addData['id'] = $entryType->id;
      $addData['teamNo'] = $entryType->teamNo;
      array_push($result['win_team_battle_entry_type'],$addData);
    }
    foreach ($battleInstance->battleResult['lose_team_battle_entry_type'] as $entryType) {
      $addData = array();
      $addData['type'] = $entryType->type;
      $addData['id'] = $entryType->id;
      $addData['teamNo'] = $entryType->teamNo;
      array_push($result['lose_team_battle_entry_type'],$addData);
    }
    return $result;
  }

  //ゲーム結果設定を取得
  function GetGameResultSetting($battleInstance){
    $result = array();
    //次のイベントデータ
    $result['next_events'] = $battleInstance->battleResultSetting->nextEvents;
    //ドロップデータ
    $result['drop_datas'] = $battleInstance->battleResultSetting->dropDatas;
    return $result;
  }

  //マルチプレイヤー情報
  function GetMultiPlayerInfo($battleInstance){
    $result = array();
    if($battleInstance->multiPlayerInstance == null) return array();
    if($battleInstance->multiPlayerInstance->GetMultiPlayerMode() == false) return array(); //マルチプレイが開始されていない。
    //現在のターン
    $result['now_turn'] = $battleInstance->multiPlayerInstance->GetNowTurn();
    //コマンド受付残り時間
    $result['wait_time_limit'] = $battleInstance->multiPlayerInstance->GetWaitTimeLimit();
    return $result;
  }

  //自分の設定した反映待ちの追加アクションを取得
  function GetMyStandbyAddActions($battleInstance,$playerIndexId){
    if($battleInstance->multiPlayerInstance == null) return array();
    if($battleInstance->multiPlayerInstance->GetMultiPlayerMode() == false) return array(); //マルチプレイが開始されていない。
    $result = array();
    $stanbyAddActions = $battleInstance->multiPlayerInstance->stanbyAddActions;
    if(is_array($stanbyAddActions)){
      for ($exeTurn=0; $exeTurn < $battleInstance->battleTurn + 1; $exeTurn++) {
        if(isset($stanbyAddActions[$exeTurn])){
          for ($i=0; $i < count($stanbyAddActions[$exeTurn]); $i++) {
            if($stanbyAddActions[$exeTurn][$i]->id == $playerIndexId && $stanbyAddActions[$exeTurn][$i]->type == 0){
              $addData = array();
              $addData['exe_turn'] = $exeTurn;
              $addData['unique_no'] = $stanbyAddActions[$exeTurn][$i]->uniqueNo;
              $addData['type'] = $stanbyAddActions[$exeTurn][$i]->type;
              $addData['id'] = $stanbyAddActions[$exeTurn][$i]->id;
              array_push($result,$addData);
              break;
            }
          }
        }
      }
    }
    return $result;
  }




}
