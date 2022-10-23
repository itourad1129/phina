<?php //バフクラス

class BuffData {
  public $init = false; //初期化
  public $buffId = -1;
  public $buffMasterData = null; //バフのマスターデータ
  public $name = ""; //バフの名前
  public $updateStatusTypes = -1; //変動ステータスタイプ
  public $statusIds = array(); //変動ステータスID
  public $updateParams = array(); //変動値
  public $turn = 0; //継続ターン
  public $effectImageId = 0; //効果イメージ
  function __construct($buffId,$buffMasterDatas){ //buff_master テーブルのデータ
    $this->buffId = $buffId;
    $this->buffMasterData = $this->GetBuffMasterDatas($buffId,$buffMasterDatas);
    if($this->buffMasterData != null){
      $this->init = $this->CreateBuffObject(); //バフオブジェクトを生成
    }
  }

  function CreateBuffObject(){ //バフオブジェクトを生成する。
    $init = false; //オブジェクトの生成に成功したか。
    if(isset($this->buffMasterData['buff_name'])) $this->name = $this->buffMasterData['buff_name'];
    if(isset($this->buffMasterData['turn'])) $this->turn = $this->buffMasterData['turn'];
    if(isset($this->buffMasterData['effect_image_id'])) $this->effectImageId = $this->buffMasterData['effect_image_id'];
    if(isset($this->buffMasterData['update_status_types'])){
      $this->updateStatusTypes = explode(',',$this->buffMasterData['update_status_types']);
    }
    if(isset($this->buffMasterData['status_ids'])){
      $this->statusIds = explode(',',$this->buffMasterData['status_ids']);
    }
    if(isset($this->buffMasterData['update_params'])){
      $this->updateParams = explode(',',$this->buffMasterData['update_params']);
    }
    $init = true;
    return $init;
  }

  function GetBuffMasterDatas($buffId,$buffMasterDatas){ //バフのマスターデータを取得
    $result = false;
    foreach ($buffMasterDatas as $buffMasterData) {
      if($buffId == $buffMasterData['buff_id']){
        $result = $buffMasterData;
        break;
      }
    }
    return $result;
  }

}
