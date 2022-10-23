<?php

class BattleEntryData { //戦闘参加データ

  const MAX_BP = 10; //BPの最大値
  public $battleEntryType = null; //参加者タイプ
  public $uniqueNo = -1; //参加者全てに割り振られるユニークな番号
  public $init = false; //初期化成功か
  public $partyInstance = null; //パーティインスタンス
  public $name = ""; //名前
  public $pos = null; //ポジション(自分の位置) x,y
  public $direction = -1; //向き 0:上 1:右 2:下 3:左
  public $directionDisp = 0; //表示時の向き 0:左 1:右
  public $level = -1; //レベル
  public $classId = -1; //クラスID
  public $baseStatus = null; //基本ステータス(上書き禁止)
  public $status = null; //戦闘で使用するステータス
  public $cards = ""; //戦闘に使用するカード
  public $prizeCards = ""; //ランダムに引き当てたカード
  public $equipItems = ""; //戦闘に使用する装備品
  public $equipItemParam = array(); //装備品のパラメーター
  public $attribute = null; //属性
  public $buffs = array(); //バフ
  public $isDead = false; //死亡状態
  public $hp = -1; //現在のHP
  public $vitality = -1; //現在の生命力
  public $bp = -1; //現在のBP
  public $vitalityPenalty = false; //生命力ペナルティー
  public $decVitality = 0; //減少する生命力値
  public $action = null; //行動データ
  public $playerCardData = null; //プレイヤーであれば、プレイヤーカードデータが挿入される。
  public $avatarData= null; //アバターデータがあれば挿入
  public $enemyMasterData = null; //敵データがある場合のみ、マスターデータが入る
  public $enemyAssetMaster = null; //敵データがある場合のみ、アセットマスターデータが入る
  public $host = false; //自分がホストか。
  public $moveAreas = array(); //現在の移動範囲
  public $power = 0; //倒した時に影響する敵勢値 (+-)

  function __construct($pdo,$list,BattlePartyInstance &$partyInstance,BattleInstance $battleInstance){
    if(is_array($list)){
      $this->partyInstance = $partyInstance;
      if(isset($list['battle_entry_type']) && is_array($list['battle_entry_type'])){
        $this->battleEntryType = new BattleEntryType($list['battle_entry_type']['type'],$list['battle_entry_type']['id'],$list['battle_entry_type']['team_no']);
      }
      if(isset($list['name'])) $this->name = $list['name'];
      if(isset($list['pos'])) $this->pos = $list['pos'];
      if(isset($list['direction'])) $this->direction = $list['direction'];
      if(isset($list['level'])) $this->level = $list['level'];
      if(isset($list['class_id'])) $this->classId = $list['class_id'];
      if(isset($list['base_status'])) $this->baseStatus = $list['base_status'];
      if(isset($list['status'])) $this->status = $list['status'];
      if(isset($list['cards'])) $this->cards = $list['cards'];
      if(isset($list['equip_items'])) $this->equipItems = $list['equip_items'];
      if(isset($list['attribute'])) $this->attribute = $list['attribute'];
      if(isset($list['now_hp'])) $this->hp = $list['now_hp'];
      if(isset($list['now_vitality'])) $this->vitality = $list['now_vitality'];
      if(isset($list['bp'])) $this->bp = $list['bp'];
      if(isset($list['buffs'])) $this->buffs = $list['buffs'];
      if(isset($list['avatar_data'])) $this->avatarData = $list['avatar_data'];
      if(isset($list['enemy_master_data'])) $this->enemyMasterData = $list['enemy_master_data'];
      if(isset($list['enemy_asset_master'])) $this->enemyAssetMaster = $list['enemy_asset_master'];
      if(isset($list['host'])) $this->host = $list['host'];
      if(isset($list['power'])) $this->power = $list['power'];
      if(isset($list['direction_disp'])) $this->directionDisp = $list['direction_disp'];

      if($this->battleEntryType != null && $this->battleEntryType->type == 0 && isset($list['player_card_datas'])){ //プレイヤーだった場合、プレイヤー関連のデータを生成
        //プレイヤーカードデータを生成
        $this->playerCardData = new PlayerCardData($this->battleEntryType->id,$list['player_card_datas']);
      }
      // if(isset($list['action'])){
      //     //アクションが生成可能なデータかチェック
      //     if(is_array($list['action'])
      //     && isset($list['action']['is_move'])
      //     && isset($list['action']['move_pos'])
      //     && isset($list['action']['is_use_card'])
      //     && isset($list['action']['use_card_id'])){
      //       $this->action = new Action($list['action']['is_move'],$list['action']['move_pos'],$list['action']['is_use_card'],$list['action']['use_card_id']);
      //     }
      // }

      //インスタンス生成時のデータが正常かチェック
      if($this->partyInstance != null && $this->direction != -1 && $this->baseStatus != null
      && $this->status != null && $this->attribute != null && $this->battleEntryType != null){
        $this->init = true;
        //装備品が存在すれば、装備品ステータスを更新
        $equipItemMasterIds = explode(",",$this->equipItems);
        if(count($equipItemMasterIds) != 0){
          for ($i=0; $i < count($equipItemMasterIds); $i++) {
            $getParam = $this->GetEquipItemParam($battleInstance->equipItemParamMasterDatas,$equipItemMasterIds[$i]);
            if(count($getParam) != 0){
              foreach ($getParam as $param) {
                $this->equipItemParam[count($this->equipItemParam)] = $param;
              }
            }
          }
        }
        //変動する現在のパラメーターが初期化されていない場合は初期化
        if($this->hp == -1) $this->hp = $this->GetStatusTotal(1); //最大HPの初期値を取得
        error_log("挿入時のHP", 3, "./debug.txt");
        error_log(var_export($this->hp, true), 3, "./debug.txt");
        //var_dump($this->hp);
        if($this->bp == -1) $this->bp = 3;
        //プレイヤーは基本的にこの初期化を実行しない > 現在の生命力を$list['now_vitality']に追加する
        if($this->vitality == -1) $this->vitality = $this->GetStatusTotal(8);
        else{ //プレイヤーの場合、通常はこっちで初期化
          $checkVit = round((int)$this->GetStatusTotal(8) / 10);
          if((int)$this->vitality < $checkVit) $this->vitalityPenalty = true; //ペナルティーチェック
        }
      }
    }
  }

  //合計ステータスを取得する。
  function GetStatusTotal($statusId = -1){
    $result = null;
    if($statusId == -1) $result = array();
    foreach ($this->status as $status) {
      //ステータスが指定されていた場合
      if($statusId != -1 && $status['status_id'] == $statusId){
        //基本ステータス
        $result = (int)$status['status_point'];
        //生命力ペナルティ
        if($this->vitalityPenalty == true && $statusId != 8){
          $result = (int)round($result * 0.8);
        }
        //装備品ステータス
        foreach ($this->equipItemParam as $param) {
          if($statusId == $param['status_id']){
            $result = $result + $param['point_val'];
          }
        }
        //バフの効果
        foreach ($this->buffs as $buff) {
          if($buff->nowTurn > 0){ //バフが有効
            for ($i=0; $i < count($buff->buffData->statusIds); $i++) { //ステータス加算
              if($buff->buffData->statusIds[$i] == $statusId && $buff->buffData->updateStatusTypes[$i] == 0){
                $result = $result + $buff->buffData->updateParams[$i];
              }
            }
            //加算が終わってから減算する。
            for ($i=0; $i < count($buff->buffData->statusIds); $i++) { //ステータス減算
              if($buff->buffData->statusIds[$i] == $statusId && $buff->buffData->updateStatusTypes[$i] == 1){
                $result = $result - $buff->buffData->updateParams[$i];
              }
            }
            if($result < 0) $result = 1;
          }
        }
        break;
      }
      if($statusId != -1) continue;
      $addResult = array();
      $addResult['status_id'] = (int)$status['status_id'];
      //基本ステータス
      $addResult['status_point'] = (int)$status['status_point'];
      //生命力ペナルティ
      if($this->vitalityPenalty == true && $addResult['status_id'] != 8){
        $addResult['status_point'] = (int)round($addResult['status_point'] * 0.8);
      }
      //装備品ステータス
      foreach ($this->equipItemParam as $param) {
        if($status['status_id'] == $param['status_id']) {
          $addResult['status_point'] = $addResult['status_point'] + $param['point_val'];
        }
      }
      //バフの効果
      foreach ($this->buffs as $buff) {
        if($buff->nowTurn > 0){ //バフが有効
          for ($i=0; $i < count($buff->buffData->statusIds); $i++) { //ステータス加算
            if($buff->buffData->statusIds[$i] == $statusId && $buff->buffData->updateStatusTypes[$i] == 0){
              $addResult['status_point'] = $addResult['status_point'] + $buff->buffData->updateParamss[$i];
            }
          }
          //加算が終わってから減算する。
          for ($i=0; $i < count($buff->buffData->statusIds); $i++) { //ステータス減算
            if($buff->buffData->statusIds[$i] == $statusId && $buff->buffData->updateStatusTypes[$i] == 1){
              $addResult['status_point'] = $addResult['status_point'] - $buff->buffData->updateParamss[$i];
             }
          }
          if($addResult['status_point'] < 0) $addResult['status_point'] = 1;
        }
      }
      array_push($result,$addResult);
    }
    return $result;
  }

  //基本ステータスの取得
  function GetBaseStatus($statusId = -1){
    $result = null;
    if($statusId == -1) $result = array();
    foreach ($this->status as $status) {
      if($statusId != -1 && $status['status_id'] == $statusId) $result = $status['status_point'];
      if($statusId != -1) continue;
      $addResult = array();
      $addResult['status_id'] = $status['status_id'];
      //基本ステータス
      $addResult['status_point'] = $status['status_point'];
      array_push($result,$addResult);
    }
    return $result;
  }

  //アクションを設定
  function SetAction($action){
    if(get_class($action) == 'Action'){
      $this->action = null;
      $this->action = $action;
    }
  }

  //装備カテゴリーからプレイヤーの装備品マスターデータを取得
  function SelectPlayerEquipItem($equipCategoryId,$equipItemMasterDatas){
    $result = false;
    $equipItemIds = explode(",",$this->equipItems);
    for ($i=0; $i < count($equipItemIds); $i++) {
      foreach ($equipItemMasterDatas as $equipItemMasterData) {
        if($equipItemMasterData['id'] == $equipItemIds[$i]){
          if($equipCategoryId == $equipItemMasterData['equip_category_id']){
            $result = $equipItemMasterData;
            break 2;
          }
        }
      }
    }
    return $result;
  }

  //プレイヤーの装備品を全て取得
  function GetPlayerEquipItems($equipItemMasterDatas){
    $result = array();
    $equipItemIds = explode($this->equipItems);
    for ($i=0; $i < count($equipItemIds); $i++) {
      foreach ($equipItemMasterDatas as $equipItemMasterData) {
        if($equipItemMasterData['id'] == $equipItemIds[$i]){
          array_push($result,$equipItemMasterData);
        }
      }
    }
    return $result;
  }

  //装備品IDから装備パラメーターを取得
  function GetEquipItemParam($equipItemParamMasterDatas,$equipItemMasterId){
    $result = array();
    foreach ($equipItemParamMasterDatas as $param) {
      if($param['equip_item_master_id'] == $equipItemMasterId) array_push($result,$param);
    }
    return $result;
  }
}

class BattleEntryType { //戦闘参加者のタイプ
  public $type = -1; //0:プレイヤー 1:エネミー 2:NPC ...
  public $id = -1; //player_index_id enemy_index_id npc_index_id など
  public $teamNo = -1;
  function __construct($type,$id,$teamNo){
    $this->type = $type;
    $this->id = $id;
    $this->teamNo = $teamNo;
  }
}
