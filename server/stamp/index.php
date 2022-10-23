<?php
//スタンプ処理

function getPlayerStamp($conn,$playerIndexId){ //プレイヤーが所持しているスタンプを取得する
  $sql = "SELECT * FROM player_stamp LEFT JOIN chat_stamp_master ON player_stamp.stamp_id = chat_stamp_master.stamp_id WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function unlockPlayerStamp($conn,$playerIndexId,$unlockStampId){ //スタンプのロックを解除する。
  $unlockFlag = false;
  $stmt = $conn -> prepare("INSERT INTO player_stamp (player_index_id, stamp_id)
  SELECT :player_index_id, :stamp_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, stamp_id
    FROM player_friend_application WHERE player_index_id= :player_index_id
    AND stamp_id = :stamp_id)");
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':stamp_id', $unlockStampId, PDO::PARAM_INT);
  $stmt->execute();
  $count = $stmt->rowCount();
  if($count != 0) $unlockFlag = true; //挿入に成功した
  return $unlockFlag;
}

function checkPlayerStamp($conn,$playerIndexId,$stampId){ //プレイヤーが使用可能なスタンプかチェックする
  $visible = false;
  $sql = "SELECT * FROM player_stamp WHERE player_index_id=? AND stamp_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$stampId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if($result != false){
    $visible = true;
  }
  return $visible;
}
