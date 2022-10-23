<?php
//メッセージ処理関連

//メッセージを送信する
function insertPlayerMessage($conn,$messageType,$title,$text,$sendPlayerIndexId,$param1,$param2,$param3){
  $stmt = $conn -> prepare("INSERT INTO player_message (player_index_id, message_type, message_title_text, message_text, param_1, param_2, param_3)
  VALUES (:player_index_id, :message_type, :message_title_text, :message_text, :param_1, :param_2, :param_3)");
  $stmt->bindParam(':player_index_id', $sendPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':message_type', $messageType, PDO::PARAM_INT);
  $stmt->bindParam(':message_title_text', $title, PDO::PARAM_STR);
  $stmt->bindParam(':message_text', $text, PDO::PARAM_STR);
  $stmt->bindParam(':param_1', $param1, PDO::PARAM_STR);
  $stmt->bindParam(':param_2', $param2, PDO::PARAM_STR);
  $stmt->bindParam(':param_3', $param3, PDO::PARAM_STR);
  $stmt->execute();
}

//メッセージのパラメーターを更新
function updatePlayerMessage($conn,$playerIndexId,$messageId,$param1,$param2,$param3){
  if($param1 == "" && $param2 == "" && $param3 == "") return;
  $param = array();
  $sql = "UPDATE player_message SET";
  if($param1 != ""){
    $sql = $sql." param_1=? ";
    $param[count($param)] = $param1;
  }
  if($param2 != ""){
    $sql = $sql." param_2=? ";
    $param[count($param)] = $param2;
  }
  if($param3 != ""){
    $sql = $sql." param_3=? ";
    $param[count($param)] = $param3;
  }
  $param[count($param)] = $playerIndexId;
  $param[count($param)] = $messageId;
  $sql = $sql."WHERE player_index_id=? AND message_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute($param);
}

//カルマコマンドに関連したメッセージのパラメーターを更新
function updateKarmaCommandMessage($conn,$playerIndexId){
  $sql = "UPDATE player_message SET param_3=? WHERE player_index_id=? AND (message_type=? OR message_type=?)";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(1,$playerIndexId,4,5));
}

//メッセージを取得する
function getPlayerMessage($conn,$playerIndexId,$msgType = -1){
  $columnName = "create_dttm";
  $direction = "ASC";
  $result = false;
  $sql = "SELECT * FROM player_message WHERE player_index_id=?";
  if($msgType != -1) $sql = $sql." AND message_type=?";
  $sql = $sql." ORDER BY ".$columnName." ".$direction;
  $stmt = $conn->prepare($sql);
  if($msgType == -1) $stmt->execute(array($playerIndexId));
  else $stmt->execute(array($playerIndexId,$msgType));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//メッセージを取得する(message_id)
function selectPlayerMessageForMessageId($conn,$messageId){
  $result = false;
  $sql = "SELECT * FROM player_message WHERE message_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($messageId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//メッセージを削除する
function deleteMessage($conn,$playerIndexId,$messageId){
  $sql = "DELETE FROM player_message WHERE player_index_id=? AND message_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$messageId));
}
