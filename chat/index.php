<?php

function getAreaChatLogs($conn,$areaId,$count){ //ワールドエリアのチャットログを取得
  $result = array();
  $columnName = "dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM area_chat_log WHERE area_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $areaId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerAreaChat($conn,$playerName,$playerIndexId,$areaId,$chatText,$stampId = 0){ //ワールドエリアチャットにメッセージを投稿する
  //スタンプが設定されていた場合
  if($stampId != 0){

  }
  $stmt = $conn -> prepare("INSERT INTO area_chat_log (area_id, player_index_id, player_name, chat_text, stamp_id)
  VALUES (:area_id, :player_index_id, :player_name, :chat_text, :stamp_id)");
  $stmt->bindParam(':area_id', $areaId, PDO::PARAM_INT);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}

function getWorldChatLogs($conn,$worldId,$count){ //ワールドのチャットログを取得
  $result = array();
  $columnName = "dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM world_chat_log WHERE world_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $worldId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerWorldChat($conn,$playerName,$playerIndexId,$worldId,$chatText,$stampId = 0){ //ワールドチャットにメッセージを投稿する
  $stmt = $conn -> prepare("INSERT INTO world_chat_log (world_id, player_index_id, player_name, chat_text, stamp_id)
  VALUES (:world_id, :player_index_id, :player_name, :chat_text, :stamp_id)");
  $stmt->bindParam(':world_id', $worldId, PDO::PARAM_INT);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}

function getPartyChatLogs($conn,$partyIndexId,$count){ //パーティのチャットログを取得
  $result = array();
  $columnName = "dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM party_chat_log WHERE party_index_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $partyIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerPartyChat($conn,$playerName,$playerIndexId,$partyIndexId,$chatText,$stampId = 0){ //ワールドチャットにメッセージを投稿する
  $stmt = $conn -> prepare("INSERT INTO party_chat_log (party_index_id, player_index_id, player_name, chat_text, stamp_id)
  VALUES (:party_index_id, :player_index_id, :player_name, :chat_text, :stamp_id)");
  $stmt->bindParam(':party_index_id', $partyIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}

function getPlayerChatLogs($conn,$myPlayerIndexId,$sendPlayerIndexId,$count){ //プレイヤー同士のチャットログを取得
  $result = array();
  $columnName = "dttm";
  $direction = "DESC";
  //自分が発信したチャットログを取得
  $sql = "SELECT * FROM player_chat_log WHERE (player_index_id=? AND send_player_index_id=? OR player_index_id=? AND send_player_index_id=?) ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $myPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $sendPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 3, $sendPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 4, $myPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 5, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerChat($conn,$playerName,$playerIndexId,$sendPlayerIndexId,$chatText,$stampId = 0){ //プレイヤーチャットにメッセージを投稿する
  $stmt = $conn -> prepare("INSERT INTO player_chat_log (player_index_id, player_name, send_player_index_id, chat_text, stamp_id)
  VALUES (:player_index_id, :player_name, :send_player_index_id, :chat_text, :stamp_id)");
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':send_player_index_id', $sendPlayerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}

function getPlayerRoomChatLogs($conn,$mapEventTriggerId,$count){ //パーティのチャットログを取得
  $result = array();
  $columnName = "dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM player_room_chat_log WHERE map_event_trigger_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $mapEventTriggerId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getGuildChatLogs($conn,$guildId,$count){ //ギルドのチャットログを取得
  $result = array();
  if($guildId <= 0) return array();
  $columnName = "dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM guild_chat_log WHERE guild_id=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $guildId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $count, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerRoomChat($conn,$playerName,$playerIndexId,$mapEventTriggerId,$chatText,$stampId = 0){ //ワールドチャットにメッセージを投稿する
  $stmt = $conn -> prepare("INSERT INTO player_room_chat_log (map_event_trigger_id, player_index_id, player_name, chat_text, stamp_id)
  VALUES (:map_event_trigger_id, :player_index_id, :player_name, :chat_text, :stamp_id)");
  $stmt->bindParam(':map_event_trigger_id', $mapEventTriggerId, PDO::PARAM_INT);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}

function insertGuildChat($conn,$playerName,$playerIndexId,$guildId,$chatText,$stampId = 0){ //ギルドチャットにメッセージを投稿する
  if($guildId <= 0) return false;
  $stmt = $conn -> prepare("INSERT INTO guild_chat_log (guild_id, player_index_id, player_name, chat_text, stamp_id)
  VALUES (:guild_id, :player_index_id, :player_name, :chat_text, :stamp_id)");
  $stmt->bindParam(':guild_id', $guildId, PDO::PARAM_INT);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':player_name', $playerName, PDO::PARAM_STR);
  $stmt->bindParam(':chat_text', $chatText, PDO::PARAM_STR);
  $stmt->bindParam(':stamp_id', $stampId, PDO::PARAM_INT);
  $stmt->execute();
}
