<?php

function playerLogin($conn,$playerId,$playerPassword){
  $errorLog = "";
  if($playerId != "" && $playerPassword != ""){
    $sql = "SELECT * FROM player WHERE player_id=? AND player_password=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId,$playerPassword));
    $resultPlayerData = $stmt->fetch(PDO::FETCH_ASSOC);
    //プレイヤー情報検索
    $sql = "SELECT * FROM player_info WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($resultPlayerData['player_id']));
    $selectPlayerInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerInfo != false && isset($selectPlayerInfo['support_player_type'])){
      if($selectPlayerInfo['support_player_type'] == 1 || $selectPlayerInfo['support_player_type'] == 2) $errorLog = "使用出来ないプレイヤーが選択された\n";
    }
    if($resultPlayerData != false && $errorLog == ""){
      if(loginSessionCreate($conn,$playerId,$playerPassword) == true){
        if($errorLog == ""){
          //ログイン成功
        }
        else{
          $errorLog .= "ログインに失敗しました。";
        }
      }
      else{
        $errorLog .= "ログインに失敗しました。";
      }
    }
    else{
      $errorLog .= "またはID,パスワードが違います";
    }
  }
  else{
    if($playerId == ""){
      $errorLog .= "IDが入力されていません";
    }
    if($playerPassword == ""){
      $errorLog .= "パスワードが入力されていません";
    }
  }
  return $errorLog;
}

function loginSessionCreate($conn,$playerId,$playerPassword){
  $result = false;
  if($playerId != "" && $playerPassword != ""){
    if(!isset($_SESSION)){
      //session_save_path('/session/writable/directory/hogehoge/');
      session_start();
    }
    $hash = password_hash($playerPassword, PASSWORD_DEFAULT);
    $_SESSION['token'] = $hash;
    $_SESSION['player_id'] = $playerId;
    $result = true;
  }
  return $result;
}

if(isset($_GET['session'])){
  if($_GET['session'] == 1){
    print("セッションが切断されました。<br>");
  }
  if($_GET['session'] == 2){ //パスワードハッシュチェック失敗
    print("不正なリクエストが確認されました。<br>");
  }
}

if(isset($_POST['set_id']) && isset($_POST['set_pw'])){
  $resultLog = playerLogin($pdo,$_POST['set_id'],$_POST['set_pw']);
  if($resultLog == ""){
    header("Location: ../../client/myPage/index.php");
  }
  else{
    print($resultLog);
  }
}



















 ?>
