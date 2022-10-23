<?php

class PlayerData { //プレイヤーデータクラス
  public $playerIndexId = -1;
  //何か他に必要あれば、以下に追加
  function __construct($playerIndexId,$playerData = null){ //card_master テーブルのデータ
    // $this->$playerIndexId;
    // if($playerData == null){ // プレイヤーデータが無い場合、DBから取得
    //
    // }
    // else{
    //
    // }
  }

  function GetPlayerData($playerIndexId){
    $sql = "SELECT * FROM player_info WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
    return $result;
  }
}
