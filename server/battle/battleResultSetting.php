<?php

class BattleResultSetting { //戦闘結果処理の設定等を行うクラス
  public $init = false;
  public $dropItemData = null; //ドロップアイテム
  public $getExp = 0; //取得した経験値
  public $nextEvents = array(); //エントリーデータ毎に挿入。次のイベントに移動する場合、次のイベントの player_event_countテーブルのデータが入る 終わりの場合は「0」が入る
  public $dropDatas = array(); //エントリーデータ毎に挿入。
  public $mapSettingData = null;
  public $dropSettingData = null;

  function __construct($param){ //キー名別で実行する初期化処理を決定

    if(isset($param['map'])){ //マップ系の処理
      $this->mapSettingData = $param['map'];
    }

    $this->init = true;
  }

  //勝利した時に実行する関数
  function Win($pdo,$battleInstance,$entryData){
    if($entryData->battleEntryType->type != 0) return 0; //プレイヤータイプ以外は実行禁止

    //ドロップアイテムの抽選と付与
    if($this->SelectExePlayer($battleInstance,$entryData,"get_reward")){ //パーミッションチェック
      $this->CreateDropSettingData($pdo,$battleInstance,$entryData);
    }

    if(!$this->SelectExePlayer($battleInstance,$entryData,"battle_result_setting")) return 0; //以下の処理は権限が無ければ実行禁止
    $playerIndexId = $entryData->battleEntryType->id;
    //マップ処理
    if($this->mapSettingData != null){
      $mapMasterData = $this->mapSettingData['map_master_data'];
      if(isset($this->mapSettingData['enemy_character_data']) && isset($this->mapSettingData['enemy_character_data'])){
        //MAP上の敵を非表示にする
        $enemy = $this->mapSettingData['enemy_character_data'];
        $statusId = 0; //0は非表示のステータス
        if($mapMasterData['map_type'] == 0){ //通常MAP(個人MAP)の場合
          insertPlayerMapEnemyStatus($pdo,$enemy['map_chara_array_index'],$playerIndexId,$enemy['map_id'],$statusId);
          $killEnemyIdsArray = $this->GetEnemyIds($battleInstance,$entryData); //倒した敵のID配列
          $updatePower = $this->GetEnemyPower($battleInstance); //更新する勢力値(+-)
          $mapInstanceResult = updateBattleEndPlayerMapInstance($pdo,$playerIndexId,$enemy['map_id'],$updatePower,$killEnemyIdsArray,$mapMasterData); //マップインスタンスを更新
          if($mapInstanceResult['clear_flag'] == true){ //マップクリア
            //$result['map_stage_clear_flag'] = true; //ステージクリアにする
            //最終イベントかを取得
            //checkStoryId ... クライアントが持っていて、クライアントから渡ってきたデータ ↓のmapClear関数で現在のプレイヤーのplayer_event_countを見て、正しいデータかチェックしている
            //checkPlayerEventCount ... クライアントが持っていて、クライアントから渡ってきたデータ ↓のmapClear関数で現在のプレイヤーのplayer_event_countを見て、正しいデータかチェックしている
            $this->nextEvents[$entryData->uniqueNo] = checkStoryClearAndNextEventCheck($pdo,$playerIndexId,$mapMasterData['id']); //マップイベントクリア処理
          }
        }
        else if($mapMasterData['map_type'] == 1){ //ワールドマップの場合
          $killEnemyIdsArray = $this->GetEnemyIds($battleInstance,$entryData); //倒した敵のID配列
          $updatePower = $this->GetEnemyPower($battleInstance); //更新する勢力値(+-)
          $mapInstanceResult = updateAreaInstance($pdo,$playerIndexId,$mapMasterData['id'],$updatePower,$killEnemyIdsArray,$mapMasterData); //マップインスタンスを更新
        }
      }
    }
  }
  //負けた時に実行する関数
  function Lose(){

  }
  //観戦していた時に実行する関数
  function Finish(){

  }

  //パーミッションから、実行するエントリーデータを特定
  function SelectExePlayer($battleInstance,$entryData,$permisiion){
    $result = false;
    //パーミッションチェック
    if($battleInstance->permission->CheckPermission($entryData->uniqueNo,$permisiion)){
      $result = true;
    }
    return $result;
  }

  //敵チームのBattleEntryType エネミーのIDだけを取得
  function GetEnemyIds($battleInstance,$myEntryData){
    $result = array();
    foreach ($battleInstance->entryDatas as $entryData) {
      if($entryData->battleEntryType->type == 1 && $myEntryData->partyInstance->teamNo != $entryData->partyInstance->teamNo){
        $result[count($result)] = $entryData->battleEntryType->id;
      }
    }
    return $result;
  }

  //敵チームのBattleEntryType エネミーのマスターデータ取得
  function GetEnemyMasterDatas($battleInstance,$myEntryData){
    $result = array();
    foreach ($battleInstance->entryDatas as $entryData) {
      if($entryData->battleEntryType->type == 1 && $myEntryData->partyInstance->teamNo != $entryData->partyInstance->teamNo){
        //マスターデータ存在チェック
        if($entryData->enemyMasterData != null){
          $result[count($result)] = $entryData->enemyMasterData;
        }
      }
    }
    return $result;
  }

  //影響する敵勢力値を取得
  function GetEnemyPower($battleInstance){
    $result = 0;
    foreach ($battleInstance->entryDatas as $entryData) {
      $result = $result + $entryData->power;
    }
    return $result;
  }

  //ドロップデータを作成
  function CreateDropSettingData($conn,$battleInstance,$entryData){
    $battleEventId = $battleInstance->battleEventMasterData['battle_event_id'];
    if($entryData->battleEntryType->type != 0) return false; //プレイヤー以外実行禁止
    $this->dropDatas[$entryData->uniqueNo] = array();
    $enemyPower = -1;
    $mapMasterData = $this->mapSettingData['map_master_data'];
    if($mapMasterData['map_type'] == 0){ //個人MAP
      $sql = "SELECT enemy_power FROM player_map_instance WHERE map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapMasterData['id']));
      $resultPlayerMapInstance = $stmt->fetch(PDO::FETCH_ASSOC);
      $enemyPower = $resultPlayerMapInstance['enemy_power'];
    }
    if($mapMasterData['map_type'] == 1){ //ワールドMAP
      $sql = "SELECT enemy_power FROM area_instance WHERE map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapMasterData['id']));
      $resultAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);
      $enemyPower = $resultAreaInstance['enemy_power'];
    }

    if($enemyPower == -1) return false; //勢力値が取れなければ、実行停止

    //敵ドロップ
    //倒した敵のIDを取得
    $killedEnemyMasterDatas = $this->GetEnemyMasterDatas($battleInstance,$entryData);
    $playerInfo = getPlayerInfoForIndexId($conn,$entryData->battleEntryType->id,true);
    if($playerInfo != null){
      foreach ($killedEnemyMasterDatas as $enemyData) {
        if($enemyData['drop_master_ids'] != ""){ //ドロップ情報が存在した場合
          $dropMasterIds = explode(",",$enemyData['drop_master_ids']);
          for ($d=0; $d < count($dropMasterIds); $d++) {
            getDropItems($battleInstance->pdo,$dropMasterIds[$d],$playerInfo,$enemyPower,$this->dropDatas[$entryData->uniqueNo]); //ドロップを取得
            //array_push($this->dropDatas[$entryData->uniqueNo],$resultDropItem);
          }
        }
      }
    }
    //バトルイベントドロップ
    $eventMasterData = $this->GetBattleEventMasterData($conn,$battleEventId);
    if($eventMasterData != false){
      if($eventMasterData['drop_ids'] != ""){
        $dropMasterIds = explode(",",$eventMasterData['drop_ids']);
        for ($i=0; $i < count($dropMasterIds); $i++) {
          getDropItems($conn,$dropMasterIds[$i],$playerInfo,$enemyPower,$this->dropDatas[$entryData->uniqueNo]); //ドロップを取得
          //array_push($this->dropDatas[$entryData->uniqueNo],$resultDropItem);
        }
      }
    }

    return true;
  }

  //現在の月から、バトルイベントマスターデータを取得する
  function GetBattleEventMasterData($conn,$battleEventId){
    $result = array();
    $month = date('n');
    $defaultMonth = 0;
    $sql = "SELECT * FROM battle_event_master WHERE battle_event_id=? AND event_month=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($battleEventId,$month));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    if($result == false){ //イベントが見つからなければ、デフォルトのイベントデータを取得
      $sql = "SELECT * FROM battle_event_master WHERE battle_event_id=? AND event_month=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($battleEventId,$defaultMonth));
      $result = $stmt->fetch(PDO::FETCH_ASSOC);
    }
    return $result;
  }

}
