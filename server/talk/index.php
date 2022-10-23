<?php


function getTalkEventMasterData($conn,$talkEventMasterId){ //トークイベントのマスターデータを取得する。
  $sql = "SELECT * FROM talk_event_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($talkEventMasterId));
  $talkEventMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $talkEventMasterData;
}

function getTalkCommentDatas($conn,$talkEventMasterId){ //トークイベントマスターデータに紐づくコメント全てを取得
  $sql = "SELECT * FROM talk_comments WHERE talk_event_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($talkEventMasterId));
  $talkComments = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $talkComments;
}



























 ?>
