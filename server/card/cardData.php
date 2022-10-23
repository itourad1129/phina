<?php
//カードオブジェクト管理クラス

class CardData {
  public $id = -1;
  public $cardMasterData = null; //カードマスターデータ
  public $skillData = null;
  public $cost = 0;
  public $cardName = ""; //カード名
  public $skillName = ""; //スキル名
  public $effectAreaType = -1; //効果範囲
  public $effectImageId = -1; //効果イメージID
  public $init = false;
  function __construct($cardMasterData){ //card_master テーブルのデータ
    $this->cardMasterData = $cardMasterData;
    $this->skillData = new SkillData($this->cardMasterData);
    if(isset($this->cardMasterData['id'])) $this->id = (int)$this->cardMasterData['id'];
    if(isset($this->cardMasterData['cost'])) $this->cost = (int)$this->cardMasterData['cost'];
    if(isset($this->cardMasterData['card_name'])) $this->cardName = $this->cardMasterData['card_name'];
    if(isset($this->cardMasterData['skill_name'])) $this->skillName = $this->cardMasterData['skill_name'];
    if(isset($this->cardMasterData['effect_area_type'])) $this->effectAreaType = $this->cardMasterData['effect_area_type'];
    if(isset($this->cardMasterData['effect_image_id'])) $this->effectImageId = $this->cardMasterData['effect_image_id'];
    if($this->skillData->init == true && $this->effectAreaType != -1){
      $this->init = true;
    }
  }
}
