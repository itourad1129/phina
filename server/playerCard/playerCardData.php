<?php

class PlayerCardData { //プレイヤーカードデータクラス
  public $playerIndexId = -1;
  public $playerCardDatas = array();
  public $init = false;
  function __construct($playerIndexId,$playerCardDatas){
    $this->playerIndexId = $playerIndexId;
    if($this->playerIndexId != -1){
      $this->CreatePlayerCardDatas($playerCardDatas);
      $this->init = true;
    }
  }

  function CreatePlayerCardDatas($playerCardDatas){ //DBから取ってきたデータから、プレイヤーカードデータを生成
    foreach ($playerCardDatas as $playerCardData) {
      $addData = array();
      $addData['card_id'] = $playerCardData['card_master_id'];
      $addData['level'] = $playerCardData['level'];
      //他に追加の必要があれば追加。numとexpは戦闘結果時に応じて変更されるので、不要だと思われる。
      array_push($this->playerCardDatas,$addData);
    }
  }
}
