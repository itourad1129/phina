<?php

if(!isset($_SESSION)){
  session_start();
}
if(isset($_SESSION['player_id']) && isset($_SESSION['token'])){
  //print("プレイヤーID：".$_SESSION['player_id']."<br>");
  //print("トークン：".$_SESSION['token']."<br>");
  $_SESSION['login'] = hashCheck($pdo,$_SESSION['token'],$_SESSION['player_id']);
  if($_SESSION['login'] == false){
    $RESULT_JSON = $RESULT_JSON + array('session_status' => -2); //ハッシュチェックに失敗した。
  }
  else{
    $RESULT_JSON = $RESULT_JSON + array('session_status' => 0); //成功
  }
}
else{
  $RESULT_JSON = $RESULT_JSON + array('session_status' => -1);//セッションが切れていた。
}

function hashCheck($conn,$hash,$playerId){
  $result = false;
  if(isset($_SESSION['player_id']) && isset($_SESSION['token'])){
    $sql = "SELECT * FROM player WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId));
    $playerIdCheck = $stmt->fetch(PDO::FETCH_ASSOC);
    if($playerIdCheck != false){
      $result =  password_verify($playerIdCheck['player_password'],$hash);
    }
  }
  return $result;
}




















 ?>
