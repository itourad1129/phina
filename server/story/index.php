<?php

function getMainStoryMasterData($conn,$mainStoryId){ //指定したマスターデータのみ取得。
  $sql = "SELECT * FROM main_story_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mainStoryId));
  $getMainStoryMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getMainStoryMasterData;
}

function getMainStoryMasterDatas($conn){ //全てのマスターデータを取得
  $sql = "SELECT * FROM main_story_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getMainStoryMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getMainStoryMasterDatas;
}

function getMainStoryOpenFlags($conn){ //メインストーリーの解放条件一覧を取得する
  $sql = "SELECT * FROM open_main_story_master LEFT JOIN open_flag_master ON open_main_story_master.open_flag_id = open_flag_master.id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getMainStoryOpenFlags = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getMainStoryOpenFlags;
}

function selectMainStoryOpenFlags($conn,$mainStoryId){ //指定したストーリーの解放フラグを取得する。
  $sql = "SELECT * FROM open_main_story_master WHERE main_story_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mainStoryId));
  $selectMainStoryFlags = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectMainStoryFlags;
}

function getMainStoryEventDatas($conn,$mainStoryMasterId){ //ストーリーに存在するイベントデータを取得する
  $count_number = 'event_count';
  $direction = 'ASC';
  $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=? ORDER BY $count_number $direction";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $mainStoryMasterId, PDO::PARAM_INT);
  $stmt->execute();
  $mainStoryEventdatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $mainStoryEventdatas;
}

function selectMainStoryEventMaster($conn,$mainStoryId,$eventCount){ //指定した進行状況から、該当するイベントマスターデータを取得
  $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=? AND event_count=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mainStoryId,$eventCount));
  $selectMainStoryEventMaster = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectMainStoryEventMaster;
}

function checkPlayerOpenMainStory($conn,$playerIndexId,$mainStoryId){ //ストーリー開放チェック 返り値:hashと初期ストーリーイベントマスターデータ
  $result = false;
  $mainStoryMasterData = getMainStoryMasterData($conn,$mainStoryId);
  if($mainStoryMasterData != false){
    $checkOpenMainStory = checkPlayerOpenStory($conn,$playerIndexId,$mainStoryId);
    if($checkOpenMainStory != false){
      $mainStoryEventMasterDatas = getMainStoryEventDatas($conn,$mainStoryId);
      if($mainStoryEventMasterDatas != false && isset($mainStoryEventMasterDatas[0])){
        $result = array('hash' => $mainStoryMasterData['hash'], 'start_main_story_event_master' => $mainStoryEventMasterDatas);
      }
    }
  }
  return $result;
}

function getPlayerEventCount($conn,$playerIndexId,$mainStoryId){ //プレイヤーのストーリー進行状態を取得する。
  $sql = "SELECT * FROM player_event_count WHERE player_index_id=? AND story_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mainStoryId));
  $getPlayerEventCount = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getPlayerEventCount;
}

function eventStart($conn,$playerIndexId,$mainStoryId){ //イベントを最初から開始した時に呼ぶ関数
  $result = false;
  $eventCuntInit = 1; //初期イベントカウント
  try{
    $conn->beginTransaction(); //トランザクション開始
    checkStoryResetPlayerMapInfo($conn,$playerIndexId,$mainStoryId); //継続状態のマップ情報があれば削除する。
    $stmt = $conn -> prepare("INSERT INTO player_event_count (player_index_id, story_master_id, event_count)
    VALUES (:player_index_id, :story_master_id, :event_count_init) ON DUPLICATE KEY UPDATE event_count = :event_count_init");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':story_master_id', $mainStoryId, PDO::PARAM_INT);
    $stmt->bindParam(':event_count_init', $eventCuntInit, PDO::PARAM_INT);
    $stmt->execute();
    $conn->commit(); //トランザクション終了
    $result = $eventCuntInit;
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }
  return $result;
}

function tmp_____updatePlayerEventCount($conn,$playerIndexId,$mainStoryId){ //プレイヤーのイベントを更新する。※呼び出し前に解放チェックを必ず行うこと。
  $result = false;
  $eventCuntInit = 1; //初期イベントカウント
  try{
    $conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO player_event_count (player_index_id, story_master_id, event_count)
    VALUES (:player_index_id, :story_master_id, :event_count_init) ON DUPLICATE KEY UPDATE event_count = event_count + 1");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':story_master_id', $mainStoryId, PDO::PARAM_INT);
    $stmt->bindParam(':event_count_init', $eventCuntInit, PDO::PARAM_INT);
    $stmt->execute();
    $conn->commit(); //トランザクション終了
    $result = true;
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }
  return $result;
}

function checkPlayerOpenStory($conn,$playerIndexId,$mainStoryId){ //プレイヤーが解放したストーリーかチェックを行う
  $result = false;
  $selectMainStoryFlags = selectMainStoryOpenFlags($conn,$mainStoryId);
  $getPlayerOpenFlags = getPlayerOpenFlag($conn,$playerIndexId);
  $groupFlag = false;
  foreach ($selectMainStoryFlags as $mainStoryFlag) {
    $openFlag = false;
    foreach ($getPlayerOpenFlags as $playerOpenFlag) {
      if($mainStoryFlag['open_flag_id'] == $playerOpenFlag['open_flag_id']){
        $openFlag = true;
        $result = true;
        if($mainStoryFlag['group_flag'] != 0){ //グループ化が行われていた場合
          $groupFlag = true;
        }
        else{ //グループ化ではない場合はこの地点でtrueを返す
          break 2;
        }
      }
    }
    if($groupFlag == true){
      if($openFlag == false){ //グループ化の解放で達成していない項目があった場合 false
        $result = false;
        break;
      }
    }
  }
  return $result;
}

function storyClear($conn,$mainStoryId,$playerIndexId){ //ストーリーがクリアされた場合に呼ばれる関数
  $sql = "SELECT * FROM main_story_clear_master WHERE story_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mainStoryId));
  $getMainStoryClear = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($getMainStoryClear as $storyClear) {
    $stmt = $conn -> prepare("INSERT INTO player_open_flag (player_index_id, open_flag_id)
    SELECT :player_index_id, :open_flag_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, open_flag_id FROM player_open_flag
      WHERE player_index_id= :player_index_id AND open_flag_id = :open_flag_id)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':open_flag_id', $storyClear['new_open_flag_id'], PDO::PARAM_INT);
    $stmt->execute();
  }
}

function checkStoryResetPlayerMapInfo($conn,$playerIndexId,$mainStoryId){ //継続状態のマップ情報があれば削除する。
  //メインストーリーイベントを取得
  $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mainStoryId));
  $getMainStoryEvents = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($getMainStoryEvents as $mainStoryEvent) {
    if($mainStoryEvent['event_category_id'] == 2){ //マップ戦闘のカテゴリーだった場合
      $mapId = $mainStoryEvent['event_target_id']; //マップIDを決定

      //マップとプレイヤーに紐付く戦闘情報を削除
      $sql = "DELETE FROM player_battle_instance WHERE player_index_id=? AND map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$mapId));

      //マップとプレイヤーに紐付くマップキャラクター情報を削除
      $sql = "DELETE FROM player_map_character_status WHERE player_index_id=? AND map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$mapId));

      //マップとプレイヤーに紐付くマップインスタンスを削除
      $sql = "DELETE FROM player_map_instance WHERE player_index_id=? AND map_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$mapId));
    }
  }
}






















 ?>
