<?php

//決闘県連処理

function duelApplication($conn,$playerInfo,$playerName,$applicationPlayerIndexId){ //決闘の申請を行った。
  $playerIndexId = $playerInfo['player_index_id'];
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $applicationPlayerData = getPlayerInfoForIndexId($conn,$applicationPlayerIndexId,true);
  if($applicationPlayerData != false){ //申請先のプレイヤーデータは正常
    $checkPlayerDuelApplication = checkPlayerDuelApplication($conn,$playerIndexId,$applicationPlayerIndexId);
    if($checkPlayerDuelApplication == true){ //申請状況は正常
      $partyPlayerDatas = getPartyMemberPlayerDatas($conn,$playerInfo['player_party_index_id']);
      $checkParty = true;
      foreach ($partyPlayerDatas as $playerData) {
        if($playerData['player_index_id'] == $applicationPlayerIndexId) $checkParty = false;
      }
      if($checkParty == true){ //パーティデータは正常
        //申請内容を決定
        //申請対象にメッセージを送信
        $messageTitle = "決闘の申し込みがあります";
        $messageText = $playerName."から決闘の申し込みがありました.承認しますか?";
        $param1 = $playerIndexId;
        insertPlayerMessage($conn,1,$messageTitle,$messageText,$applicationPlayerIndexId,$param1,"","");
        $stmt = $conn -> prepare("INSERT INTO player_duel (player_index_id, application_player_index_id)
        VALUES (:player_index_id, :application_player_index_id)");
        $stmt->bindParam(':player_index_id', $applicationPlayerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':application_player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->execute();
      }
      else{
        $result['error'] = 1;
        $result['error_comment'] = "パーティメンバーとは戦えません";
      }
    }
    else{
      $result['error'] = 2;
      $result['error_comment'] = "既に申請を行っているか、プレイヤーから申請されています";
    }
  }
  else{
    $result['error'] = 3;
    $result['error_comment'] = "プレイヤーデータの取得に失敗しました";
  }
  return $result;
}

function checkPlayerDuelApplication($conn,$playerIndexId,$applicationPlayerIndexId){ //決闘の申請をお互いしていない、されていないかチェック
  $result = false;
  $sql = "SELECT * FROM player_duel WHERE (player_index_id=? AND application_player_index_id=?)
  OR (player_index_id=? AND application_player_index_id=?)";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$applicationPlayerIndexId,$applicationPlayerIndexId,$playerIndexId));
  $selectDuel = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if(count($selectDuel) == 0) $result = true; //お互いに申請をしていない、申請されていない
  return $result;
}

function deletePlayerDuel($conn,$playerIndexId,$applicationPlayerIndexId){ //決闘データを削除
  $sql = "DELETE FROM player_duel WHERE (player_index_id=? AND application_player_index_id=?)
  OR (player_index_id=? AND application_player_index_id=?)";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$applicationPlayerIndexId,$applicationPlayerIndexId,$playerIndexId));
}

function getPlayerDuelData($conn,$playerIndexId,$applicationPlayerIndexId){
  $sql = "SELECT * FROM player_duel WHERE player_index_id=? AND application_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$applicationPlayerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}
