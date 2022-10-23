<?php

function playerCreate($conn, $playerId, $playerPassword, $playerName, $playerSex){
  $errorLog = "";
  if($playerId != "" && $playerPassword != "" && $playerName != "" && $playerSex != ""){
    $sql = "SELECT * FROM player WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId));
    $playerIdCheck = $stmt->fetch(PDO::FETCH_ASSOC);

    $sql = "SELECT * FROM player_info WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId));
    $playerInfoCheck = $stmt->fetch(PDO::FETCH_ASSOC);

    if($playerIdCheck == false && $playerInfoCheck == false){
      $fontCountCheck = true;
      $userIdCount = mb_strlen($playerId);
      $passwordCount = mb_strlen($playerPassword);
      $playerNameCount = mb_strlen($playerName);
      if(4 <= $userIdCount && $userIdCount <= 20){

      }
      else{
        $fontCountCheck = false;
        $errorLog .= "IDは4文字以上20文字以下にする必要があります<br>";
      }
      if(4 <= $passwordCount && $passwordCount <= 20){

      }
      else{
        $fontCountCheck = false;
        $errorLog .= "パスワードは4文字以上20文字以下にする必要があります<br>";
      }
      if(2 <= $playerNameCount && $playerNameCount <= 14){

      }
      else{
        $fontCountCheck = false;
        $errorLog .= "名前は2文字以上14文字以下にする必要があります<br>";
      }
      if($playerId == $playerPassword){
        $fontCountCheck = false;
        $errorLog .= "IDとパスワードは別々の文字を入れる必要があります<br>";
      }

      if($fontCountCheck == true && $errorLog == ""){
        if(sessionCreate($conn,$playerId,$playerPassword) == true){
          $stmt = $conn -> prepare("INSERT INTO player (player_id, player_password, player_name)
          VALUES (:player_id, :player_password, :player_name)");
          $stmt->bindParam(':player_id', $playerId, PDO::PARAM_STR);
          $stmt->bindParam(':player_password', $playerPassword, PDO::PARAM_STR);
          $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
          $stmt->execute();
          $aiid = $conn->lastInsertId('id');
          $newPlayerIndexId = $aiid;

          $newPlayerLevel = 1;
          $newPlayerClass = 1;
          $newPlayerStory = 1;
          $newPlayerExp = 0;

          $stmt = $conn -> prepare("INSERT INTO player_info (player_index_id ,player_id, player_level, player_class_id, player_sex, player_story, player_exp)
          VALUES (:player_index_id, :player_id, :player_level, :player_class_id, :player_sex, :player_story, :player_exp)");
          $stmt->bindParam(':player_index_id', $newPlayerIndexId, PDO::PARAM_INT);
          $stmt->bindParam(':player_id', $playerId, PDO::PARAM_STR);
          $stmt->bindParam(':player_level', $newPlayerLevel, PDO::PARAM_INT);
          $stmt->bindParam(':player_class_id', $newPlayerClass, PDO::PARAM_INT);
          $stmt->bindParam(':player_sex', $playerSex, PDO::PARAM_INT);
          $stmt->bindParam(':player_story', $newPlayerStory, PDO::PARAM_INT);
          $stmt->bindParam(':player_exp', $newPlayerExp, PDO::PARAM_INT);
          $stmt->execute();

          $newStaminaPoint = 100;
          $stmt = $conn -> prepare("INSERT INTO player_stamina (player_index_id, stamina_point)
          VALUES (:player_index_id, :stamina_point)");
          $stmt->bindParam(':player_index_id', $newPlayerIndexId, PDO::PARAM_INT);
          $stmt->bindParam(':stamina_point', $newStaminaPoint, PDO::PARAM_INT);
          $stmt->execute();

          $newVitalityPoint = 11;
          $stmt = $conn -> prepare("INSERT INTO player_vitality (player_index_id, vitality_point)
          VALUES (:player_index_id, :vitality_point)");
          $stmt->bindParam(':player_index_id', $newPlayerIndexId, PDO::PARAM_INT);
          $stmt->bindParam(':vitality_point', $newVitalityPoint, PDO::PARAM_INT);
          $stmt->execute();

          $newCustomOpenFlag = 1;
          $newLastUpdate = date('Y-m-d H:i:s');
          $stmt = $conn -> prepare("INSERT INTO player_training_point (player_index_id, custom_open_flag, last_update)
          VALUES (:player_index_id, :custom_open_flag, :last_update)");
          $stmt->bindParam(':player_index_id', $newPlayerIndexId, PDO::PARAM_INT);
          $stmt->bindParam(':custom_open_flag', $newCustomOpenFlag, PDO::PARAM_INT);
          $stmt->bindParam(':last_update', $newLastUpdate, PDO::PARAM_INT);
          $stmt->execute();

          $sql = "SELECT * FROM item_master";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($playerId));
          $itemIdData = $stmt->fetchAll(PDO::FETCH_ASSOC);

          foreach ($itemIdData as $itemData) {
            $newItemId = $itemData['id'];
            $newItemVal = 0;
            $stmt = $conn -> prepare("INSERT INTO player_item (player_index_id, item_id, item_val)
            VALUES (:player_index_id, :item_id, :item_val)");
            $stmt->bindParam(':player_index_id', $newPlayerIndexId, PDO::PARAM_INT);
            $stmt->bindParam(':item_id', $newItemId, PDO::PARAM_INT);
            $stmt->bindParam(':item_val', $newItemVal, PDO::PARAM_INT);
            $stmt->execute();
          }
        }
      }
    }
    else{
      $errorLog .= "既に使用されているIDです<br>";
    }
  }
  else{
    if($playerId == ""){
      $errorLog .= "IDが入力されていません<br>";
    }
    if($playerPassword == ""){
      $errorLog .= "パスワードが入力されていません<br>";
    }
    if($playerName == ""){
      $errorLog .= "キャラクター名が入力されていません<br>";
    }
    if($playerSex == ""){
      $errorLog .= "性別が選択されていません<br>";
    }
  }
  return $errorLog;
}

function sessionCreate($conn,$playerId,$playerPassword){
  $result = false;
  if($playerId != "" && $playerPassword != ""){
    //$_SESSION = array();
    if(!isset($_SESSION)){
      session_start();
    }
    $hash = password_hash($playerPassword, PASSWORD_DEFAULT);
    $_SESSION['token'] = $hash;
    $_SESSION['player_id'] = $playerId;
    $result = true;
  }
  return $result;
}


if(isset($_POST['set_new_id']) && isset($_POST['set_new_pw']) && isset($_POST['set_new_name']) && isset($_POST['set_new_sex'])){
  $resultLog = playerCreate($pdo, $_POST['set_new_id'], $_POST['set_new_pw'], $_POST['set_new_name'], $_POST['set_new_sex']);
  if($resultLog == ""){
    header( "Location: ../../client/myPage/index.php" ) ;
  }
  else{
    print($resultLog);
  }
}





























 ?>
