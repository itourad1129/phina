<?php

class BattlePartyInstance { //パーティインスタンスを生成
  public $teamNo = -1;
  public $init = false;
  public $formation = null; //隊形
  function __construct($pdo,$teamNo,$partyData){
    if(is_array($partyData)){
      if(isset($partyData['party_formation_id'])) $this->formation = getFormationMasterData($pdo,$partyData['party_formation_id']);
      if(isset($partyData['formation_id'])) $this->formation = getFormationMasterData($pdo,$partyData['formation_id']);
      $this->teamNo = $teamNo;
      if($teamNo != -1 && $this->formation != null && isset($this->formation['positions'])) $this->init = true;
    }
  }
}
