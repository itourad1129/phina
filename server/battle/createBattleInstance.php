<?php

class CreateBattleInstance { //バトルインスタンス生成クラス
  public $init = false;
  public $result = false; //作成したバトルインスタンス
  public $masterDatas = array();
  function __construct($pdo,$battleEventId){
    $this->SetMasterDatas($pdo,$battleEventId); //マスターデータをセット
    $this->result = new BattleInstance($pdo,$this->masterDatas);
    $this->init = true;
  }

  //作成したバトルインスタンスを取得
  function GetInstance(){
    return $this->result;
  }

  //マスターデータをセット
  function SetMasterDatas($conn,$battleEventId){
    //カードマスターデータ
    $sql = "SELECT * FROM card_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $this->masterDatas['card_master_datas' ] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //カードランクマスターデータ
    $sql = "SELECT * FROM rank_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $this->masterDatas['rank_master_datas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //バフマスターデータ
    $sql = "SELECT * FROM buff_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $this->masterDatas['buff_master_datas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //装備アイテムマスターデータ
    $sql = "SELECT * FROM equip_item_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $this->masterDatas['equip_item_master_datas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //装備アイテムパラメーターマスターデータ
    $sql = "SELECT * FROM equip_item_param_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $this->masterDatas['equip_item_param_master_datas'] = $stmt->fetchAll(PDO::FETCH_ASSOC);
    //戦闘イベントデータ
    $month = date('n');
    $defaultMonth = 0;
    $sql = "SELECT * FROM battle_event_master WHERE battle_event_id=? AND event_month=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($battleEventId,$month));
    $this->masterDatas['battle_event_master_data'] = $stmt->fetch(PDO::FETCH_ASSOC);
    if($this->masterDatas['battle_event_master_data'] == false){
      $sql = "SELECT * FROM battle_event_master WHERE battle_event_id=? AND event_month=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($battleEventId,$defaultMonth));
      $this->masterDatas['battle_event_master_data'] = $stmt->fetch(PDO::FETCH_ASSOC);
    }
  }
}
