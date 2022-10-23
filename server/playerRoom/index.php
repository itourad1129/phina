<?php

//プレイヤールームのステータスを更新する
function updatePlayerRoom($conn,$playerIndexId,$playerName,$triggerId,$roomPosX,$roomPosY,$playerAvatarHash){
  $now = date('Y/m/d H:i:s');
  $stmt = $conn->prepare("INSERT INTO player_room (player_index_id, player_name, map_event_trigger_id, room_pos_x, room_pos_y, player_avatar_hash, update_time)
  VALUES (:player_index_id, :player_name, :map_event_trigger_id, :room_pos_x, :room_pos_y, :player_avatar_hash, :update_time)
  ON DUPLICATE KEY UPDATE player_index_id=VALUES(player_index_id),
  player_name=VALUES(player_name), map_event_trigger_id=VALUES(map_event_trigger_id),
  room_pos_x=VALUES(room_pos_x), room_pos_y=VALUES(room_pos_y), player_avatar_hash=VALUES(player_avatar_hash), update_time=VALUES(update_time)");
  $stmt->bindParam(':player_index_id',$playerIndexId);
  $stmt->bindParam(':player_name',$playerName);
  $stmt->bindParam(':map_event_trigger_id', $triggerId);
  $stmt->bindParam(':room_pos_x', $roomPosX);
  $stmt->bindParam(':room_pos_y', $roomPosY);
  $stmt->bindParam(':player_avatar_hash', $playerAvatarHash);
  $stmt->bindParam(':update_time', $now);
  $stmt->execute();
}

//プレイヤールームに居るアバターの位置を更新
function updatePlayerRoomPos($conn,$playerIndexId,$mapEventTriggerId,$posX,$posY,$avatarActionData,$playerRoomChange = false){
  $now = date('Y/m/d H:i:s');
  if(isset($avatarActionData['direction_list']) && count($avatarActionData['direction_list']) != 0
   && isset($avatarActionData['move_pos_list']) && count($avatarActionData['move_pos_list']) != 0
    && isset($avatarActionData['action_time_stamp_list']) && count($avatarActionData['action_time_stamp_list']) != 0
    && isset($avatarActionData['action_start_pos_x']) && count($avatarActionData['action_start_pos_x']) != 0
    && isset($avatarActionData['action_start_pos_y']) && count($avatarActionData['action_start_pos_y']) != 0){
     $convertActionStartTimeStamp = date( "Y-m-d H:i:s",$avatarActionData['action_time_stamp_list'][0]); //アクションの開始時刻を設定
     $timeListArray = array();
     $startTime = 0;
     for ($i=0; $i < count($avatarActionData['action_time_stamp_list']); $i++) {
       if($i == 0){
         $timeListArray[$i] = 0;
         $startTime = $avatarActionData['action_time_stamp_list'][$i];
       }
       else{
         $timeListArray[$i] = $avatarActionData['action_time_stamp_list'][$i] - $startTime; //開始時間からの差分を挿入
       }
     }
     $convertActionStartPosXList = implode(",",$avatarActionData['action_start_pos_x']);
     $convertActionStartPosYList = implode(",",$avatarActionData['action_start_pos_y']);
     $convertActionWaitTimeList = implode(",",$timeListArray);
     $convertDirectionList = implode(",",$avatarActionData['direction_list']);
     $convertMovePosList = implode(",",$avatarActionData['move_pos_list']);
     $sql = "UPDATE player_room SET room_pos_x=?, room_pos_y=?, action_start_time_stamp=?, action_direction_list=?, action_move_pos_list=?, action_wait_time_list=?, action_start_pos_x_list=?, action_start_pos_y_list=?, update_time=? WHERE player_index_id=? AND map_event_trigger_id=?";
     $stmt = $conn->prepare($sql);
     $stmt->execute(array($posX,$posY,$convertActionStartTimeStamp,$convertDirectionList,$convertMovePosList,$convertActionWaitTimeList,$convertActionStartPosXList,$convertActionStartPosYList,$now,$playerIndexId,$mapEventTriggerId));
  }
  else if($playerRoomChange == true){
    $sql = "UPDATE player_room SET room_pos_x=?, room_pos_y=?, update_time=? WHERE player_index_id=? AND map_event_trigger_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($posX,$posY,$now,$playerIndexId,$mapEventTriggerId));
  }
}

//プレイヤールームのイベントトリガー情報をチェック
function checkPlayerRoomEventTrigger($conn,$mapEventMasterId,$triggerEventType,$triggerId,$checkPointPosX,$checkPointPosY){
  $result = false;
  $sql = "SELECT * FROM map_event_trigger WHERE map_event_master_id=? AND trigger_event_type=? AND trigger_target_id=? AND check_point_pos_x=? AND check_point_pos_y=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapEventMasterId,$triggerEventType,$triggerId,$checkPointPosX,$checkPointPosY));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤールームに居るプレイヤー情報を取得
function getPlayerRoomDatas($conn,$mapEventTriggerId){
  $columnName = "player_room.update_time";
  $direction = "DESC";
  $limit = 10;
  $sql = "SELECT * FROM player_room LEFT JOIN player_info ON player_room.player_index_id = player_info.player_index_id WHERE player_room.map_event_trigger_id=? AND ? < player_room.update_time ORDER BY $columnName $direction LIMIT $limit";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapEventTriggerId,date('Y-m-d H:i:s',strtotime("-5minutes"))));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//ギルドルームに居るプレイヤー情報を取得
function getGuildRoomDatas($conn,$mapEventTriggerId,$guildId){
  $columnName = "player_room.update_time";
  $direction = "DESC";
  $limit = 10;
  $sql = "SELECT * FROM player_room LEFT JOIN player_info ON player_room.player_index_id = player_info.player_index_id WHERE player_room.map_event_trigger_id=? AND player_info.player_guild_index_id=? AND ? < player_room.update_time ORDER BY $columnName $direction LIMIT $limit";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapEventTriggerId,$guildId,date('Y-m-d H:i:s',strtotime("-5minutes"))));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーが現在居るプレイヤールームをチェック
function checkPlayerRoomData($conn,$playerIndexId,$mapEventTriggerId){
  $sql = "SELECT * FROM player_room WHERE player_index_id=? AND map_event_trigger_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapEventTriggerId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーIDだけでルームを取得
function getPlayerRoomData($conn,$playerIndexId){
  $sql = "SELECT * FROM player_room WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}
