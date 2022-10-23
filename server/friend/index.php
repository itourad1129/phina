<?php

function getPlayerFriendDatas($conn,$playerIndexId){ //フレンドのプレイヤーデータを取得
  $result = array();
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $sql = "SELECT * FROM player_friend LEFT JOIN player_info
  ON player_friend.friend_player_index_id = player_info.player_index_id WHERE player_friend.player_index_id=? ORDER BY $columnName $direction";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertFriendApplication($conn,$sendPlayerIndexId,$applicationPlayerIndexId){ //フレンド申請を行う
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  $myFriendDatas = getPlayerFriendDatas($conn,$sendPlayerIndexId);
  if($sendPlayerIndexId != $applicationPlayerIndexId){ //自分自身には送っていない
    $friendCheck = true;
    foreach ($myFriendDatas as $friendData) {
      if($friendData['player_index_id'] == $applicationPlayerIndexId){ //既にフレンドに存在した。
        $friendCheck = false;
        $result['error'] = -2;
        $result['error_comment'] = "既にフレンドになっています。";
        break;
      }
    }
    if($friendCheck == true){
      try{
        $conn->beginTransaction(); //トランザクション開始
        $stmt = $conn -> prepare("INSERT INTO player_friend_application (send_application_player_index_id, application_player_index_id)
        SELECT :send_application_player_index_id, :application_player_index_id FROM dual WHERE NOT EXISTS ( SELECT send_application_player_index_id, application_player_index_id
          FROM player_friend_application WHERE send_application_player_index_id= :send_application_player_index_id
          AND application_player_index_id = :application_player_index_id)");
        $stmt->bindParam(':send_application_player_index_id', $sendPlayerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':application_player_index_id', $applicationPlayerIndexId, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit(); //トランザクション終了
        $result['error'] = 0;
        $result['error_comment'] = "";
      }
      catch(Exception $e){
        $conn->rollBack();
        var_dump($e);
        $result['error'] = -3;
        $result['error_comment'] = "サーバーエラーが発生しました。";
      }
    }
  }
  else{ //自分自身にフレンド申請していた
    $result['error'] = -1;
    $result['error_comment'] = "自分自身にフレンド申請は行えません";
  }
  return $result;
}

function getFriendRequestDatas($conn,$playerIndexId){ //フレンド申請リストを取得する。
  $result = array();
  $sql = "SELECT * FROM player_friend_application LEFT JOIN player_info ON player_friend_application.send_application_player_index_id = player_info.player_index_id WHERE player_friend_application.application_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getSendFriendRequestDatas($conn,$playerIndexId){ //送信したフレンド申請リストを取得する
  $result = array();
  $sql = "SELECT * FROM player_friend_application LEFT JOIN player_info ON player_friend_application.application_player_index_id = player_info.player_index_id WHERE player_friend_application.send_application_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerBlackList($conn,$playerIndexId){ //フレンド申請リストを取得する。
  $result = array();
  $sql = "SELECT * FROM player_black_list LEFT JOIN player_info ON player_black_list.black_list_player_index_id = player_info.player_index_id WHERE player_black_list.player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPlayerBlackList($conn,$playerIndexId,$blackListPlayerIndexId){ //プレイヤーをブラックリストに登録する。
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  $blackListCheck = false;
  $myBlackListDatas = getPlayerBlackList($conn,$playerIndexId);
  if($playerIndexId != $blackListPlayerIndexId){ //自分自身には送っていない
    $blackListCheck = true;
    foreach ($myBlackListDatas as $blackListData) {
      if($blackListData['player_index_id'] == $blackListPlayerIndexId){ //既にフレンドに存在した。
        $blackListCheck = false;
        $result['error'] = -2;
        $result['error_comment'] = "既にブラックリストに登録されています。";
        break;
      }
    }
    if($blackListCheck == true){
      try{
        $conn->beginTransaction(); //トランザクション開始
        $stmt = $conn -> prepare("INSERT INTO player_black_list (player_index_id, black_list_player_index_id)
        SELECT :player_index_id, :black_list_player_index_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, black_list_player_index_id
          FROM player_black_list WHERE player_index_id= :player_index_id
          AND black_list_player_index_id = :black_list_player_index_id)");
        $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':black_list_player_index_id', $blackListPlayerIndexId, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit(); //トランザクション終了
        $result['error'] = 0;
        $result['error_comment'] = "";
      }
      catch(Exception $e){
        $conn->rollBack();
        var_dump($e);
        $result['error'] = -3;
        $result['error_comment'] = "サーバーエラーが発生しました。";
      }
    }
    else{
      $result['error'] = -4;
      $result['error_comment'] = "既にブラックリストに登録されています。";
    }
  }
  else{ //自分自身にフレンド申請していた
    $result['error'] = -1;
    $result['error_comment'] = "自身をブラックリストに\n登録することは出来ません";
  }
  return $result;
}

function deletePlayerBlackList($conn,$playerIndexId,$deleteBlackListPlayerIndexId){ //ブラックリストを解除する
  $result = 0;
  $sql = "DELETE FROM player_black_list WHERE player_index_id=? AND black_list_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$deleteBlackListPlayerIndexId));
  $result = $stmt->rowCount();
  return $result;
}

function deleteFriendList($conn,$playerIndexId,$deletePlayerIndexId){ //フレンドをフレンドから削除する。
  $result = 0;
  $sql = "DELETE FROM player_friend WHERE player_index_id=? AND friend_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$deletePlayerIndexId));
  $result = $stmt->rowCount();
  $sql = "DELETE FROM player_friend WHERE player_index_id=? AND friend_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($deletePlayerIndexId,$playerIndexId));
  return $result;
}

function deletePlayerFriendApplication($conn,$playerIndexId,$deletePlayerIndexId){ //フレンド申請を削除する
  $result = 0;
  $sql = "DELETE FROM player_friend_application WHERE send_application_player_index_id=? AND application_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$deletePlayerIndexId));
  $result = $stmt->rowCount();
  return $result;
}

function insertPlayerFriend($conn,$playerIndexId,$insertFriendIndexId){ //フレンド申請を承認する
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  deletePlayerFriendApplication($conn,$playerIndexId,$insertFriendIndexId); //フレンド申請があれば削除
  deletePlayerFriendApplication($conn,$insertFriendIndexId,$playerIndexId); //フレンド申請があれば削除
  try{
    $conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO player_friend (player_index_id, friend_player_index_id)
    SELECT :player_index_id, :friend_player_index_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, friend_player_index_id
      FROM player_friend WHERE player_index_id= :player_index_id
      AND friend_player_index_id = :friend_player_index_id)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':friend_player_index_id', $insertFriendIndexId, PDO::PARAM_INT);
    $stmt->execute();

    $stmt = $conn -> prepare("INSERT INTO player_friend (player_index_id, friend_player_index_id)
    SELECT :player_index_id, :friend_player_index_id FROM dual WHERE NOT EXISTS ( SELECT player_index_id, friend_player_index_id
      FROM player_friend WHERE player_index_id= :player_index_id
      AND friend_player_index_id = :friend_player_index_id)");
    $stmt->bindParam(':player_index_id', $insertFriendIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':friend_player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->execute();

    $conn->commit(); //トランザクション終了
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result['error'] = -3;
    $result['error_comment'] = "サーバーエラーが発生しました。";
  }
  return $result;
}
