<?php

//パーティはキャラクター登録時に生成する仕様に変更予定のため、以下の関数を廃止
// function createNewParty($conn,$playerIndexId,$partyName){ //新規のパーティーを作成する。 返し値(0:正常, -1:エラー, 1:他のパーティーに所属していた。)
//   $result = -1;
//   try{
//     $conn->beginTransaction(); //トランザクション開始
//
//     $sql = "SELECT * FROM player_info WHERE id=?";
//     $stmt = $conn->prepare($sql);
//     $stmt->execute(array($playerIndexId));
//     $playerData = $stmt->fetch(PDO::FETCH_ASSOC);
//
//     if($playerData != false){
//       if(isset($playerData['player_party_index_id']) && isset($playerIndexId)){
//         if($playerData['player_party_index_id'] == 0) //他のパーティに所属していないか確認
//         {
//           $stmt = $conn -> prepare("INSERT INTO player_party (leader_player_index_id, party_name)
//           VALUES (:leader_player_index_id, :party_name)");
//           $stmt->bindParam(':leader_player_index_id', $playerIndexId, PDO::PARAM_INT);
//           $stmt->bindParam(':party_name', $partyName, PDO::PARAM_STR);
//           $stmt->execute();
//           $conn->commit(); //トランザクション終了
//           $result = 0;
//         }
//         else{
//           $result = 1; //既に他のパーティーに所属していた。
//         }
//       }
//     }
//   }
//   catch(Exception $e){
//     $conn->rollBack();
//     var_dump($e);
//     $result = -1;
//   }
//   return $result;
// }

function getPlayerParty($conn,$leaderPlayerIndexId){ //パーティーのプレイヤーを取得
  $result = false;
  $sql = "SELECT * FROM player_party WHERE leader_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($leaderPlayerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function transactionGetPlayerParty($conn,$leaderPlayerIndexId){ //パーティーのプレイヤーを取得
  $result = false;
  $sql = "SELECT * FROM player_party WHERE leader_player_index_id=? FOR UPDATE";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($leaderPlayerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getPartyMemberPlayerDatas($conn,$playerPartyIndexId){ //パーティメンバーを取得
  $result = array();
  $columnName = "player_pos_index";
  $direction = "ASC";
  $sql = "SELECT * FROM player_info WHERE player_party_index_id=? ORDER BY $columnName $direction";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerPartyIndexId));
  $resultPlInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $resultPlInfo;
}

function transactionGetPartyMemberPlayerDatas($conn,$playerPartyIndexId){ //パーティメンバーを取得(トランザクション中)
  $result = array();
  $columnName = "player_pos_index";
  $direction = "ASC";
  $sql = "SELECT * FROM player_info WHERE player_party_index_id=? ORDER BY $columnName $direction FOR UPDATE";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerPartyIndexId));
  $resultPlInfo = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $resultPlInfo;
}

function checkInPartyMember($conn,$checkInPartyIndexId,$playerIndexId,$myPartyIndexId){ //パーティに入る 0:正常 -1:エラー -2:既にパーティに入っていた -3:定員オーバー -4:パーティの参加に失敗 -5既に解散
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $checkOutFlag = false;
  try{
    $conn->beginTransaction(); //トランザクション開始
    $playerPartyData = getPlayerParty($conn,$checkInPartyIndexId);
    if($playerPartyData != false && is_array($playerPartyData)){ //パーティデータが正常か
      $partyLeaderPlayerInfo = getPlayerInfoForIndexId($conn,$checkInPartyIndexId,true); //リーダーの情報を取得
      if($partyLeaderPlayerInfo != false && is_array($partyLeaderPlayerInfo)
      && $partyLeaderPlayerInfo['player_index_id'] == $partyLeaderPlayerInfo['player_party_index_id']
      && $playerPartyData['party_scout_status'] != 1){ //解散、締め切りになっていないか
        if($playerPartyData['leader_player_index_id'] != $playerIndexId){ //他人のパーティか
          $checkInPartyMemberData = getPartyMemberPlayerDatas($conn,$checkInPartyIndexId);
          if(is_array($checkInPartyMemberData) && count($checkInPartyMemberData) != 0){ //パーティメンバーデータが正常か
            if(count($checkInPartyMemberData) <= 4){ //定員以内か
              if($playerIndexId == $myPartyIndexId){ //自分がパーティリーダーになって居た場合
                $myPartyMemberData = getPartyMemberPlayerDatas($conn,$playerIndexId);
                if(is_array($myPartyMemberData) && 1 < count($myPartyMemberData)){ //自分以外にメンバーが居た場合
                  $checkOutFlag = true;
                }
              }
              //パーティに参加
              $sql = "UPDATE player_info SET player_party_index_id=? WHERE player_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($playerPartyData['leader_player_index_id'],$playerIndexId));
              //メンバー数に変更があったため、ポジションを更新
              replacePlayerPosIndex($conn,$playerPartyData['leader_player_index_id']);
              replacePlayerPosIndex($conn,$playerIndexId);
            }
            else{
              $result['error'] = -3;
              $result['error_comment'] = "パーティの参加人数を超えました。";
            }
          }
          else{
            $result['error'] = -4;
            $result['error_comment'] = "パーティの参加に失敗しました。";
          }
        }
        else{
          $result['error'] = -2;
          $result['error_comment'] = "既に参加しているパーティです。";
        }
      }
      else{
        $result['error'] = -5;
        $result['error_comment'] = "既に解散しているパーティです。";
      }
    }
    else{
      $result['error'] = -1;
      $result['error_comment'] = "エラーが発生しました。";
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = -1;
    $result['error_comment'] = "エラーが発生しました。";
  }
  if($checkOutFlag == true){
    //トランザクション終了後に行う
    checkOutPartyMember($conn,$playerIndexId,$playerIndexId); //自分のパーティを解散
  }
  return $result;
}

function checkOutPartyMember($conn,$checkOutPartyIndexId,$playerIndexId){ //パーティを抜ける(リーダーの場合解散) 0:正常 -1:エラー -2:パーティメンバーが居ない(既に解散済み)
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  try{
    $conn->beginTransaction(); //トランザクション開始
    $playerPartyData = transactionGetPlayerParty($conn,$checkOutPartyIndexId);
    if($playerPartyData == false || $playerPartyData['leader_player_index_id'] != $playerIndexId){ //存在しないパーティか他人のパーティに入っていた場合
      //パーティを抜ける
      $sql = "UPDATE player_info SET player_party_index_id=? WHERE player_index_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$playerIndexId));
      //メンバー数に変更があったため、ポジションを更新
      replacePlayerPosIndex($conn,$checkOutPartyIndexId);
      replacePlayerPosIndex($conn,$playerIndexId);
    }
    else if($playerPartyData['leader_player_index_id'] == $playerIndexId){ //自分のパーティだった場合
      $partyMemberData = transactionGetPartyMemberPlayerDatas($conn,$playerIndexId);
      if(is_array($partyMemberData)){
        $updateLeaderPlayerIndexId = -1;
        foreach ($partyMemberData as $ptMember) {
          //パーティを抜ける
          if($ptMember['player_index_id'] != $playerIndexId){
            $updateLeaderPlayerIndexId = $ptMember['player_index_id']; //更新するパーティリーダーIDを取得
            break;
          }
        }
        if($updateLeaderPlayerIndexId == -1){ //パーテイに自分しか居なかった
          $result['error'] = -2;
          $result['error_comment'] = "パーティは既に解散されました。";
        }
        else{ //パーティメンバーが居た
          foreach ($partyMemberData as $ptMember) {
            if($playerIndexId != $ptMember['player_index_id']){
              $sql = "UPDATE player_info SET player_party_index_id=? WHERE player_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($updateLeaderPlayerIndexId,$ptMember['player_index_id']));
              //メンバー数に変更があったため、ポジションを更新
              replacePlayerPosIndex($conn,$ptMember['player_index_id']);
            }
          }
          replacePlayerPosIndex($conn,$updateLeaderPlayerIndexId);
        }
      }
      else{ //存在しないパーティに入っていた場合
        //パーティを抜ける
        $sql = "UPDATE player_info SET player_party_index_id=? WHERE player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$playerIndexId));
        //メンバー数に変更があったため、ポジションを更新
        replacePlayerPosIndex($conn,$playerIndexId);
        replacePlayerPosIndex($conn,$checkOutPartyIndexId);
      }
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result['error'] = -1;
    $result['error_comment'] = "エラーが発生しました。";
  }
  return $result;
}

function getRecommendationPartys($conn,$playerInfo){ //オススメのパーティ一覧を取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $partyScoutStatus = 0;
  $limit = 10;
  $sql = "SELECT * FROM player_info LEFT JOIN player_party ON player_info.player_index_id = player_party.leader_player_index_id
   WHERE player_party.party_order_type =? AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_party.party_level_min <= ?
   AND ? <= player_party.party_level_max
   AND player_info.player_index_id = player_info.player_party_index_id
   AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_info.player_index_id != ? AND player_party.party_scout_status =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $partyOrderType, PDO::PARAM_INT);
  $stmt->bindParam( 2, $playerInfo['player_level'], PDO::PARAM_INT);
  $stmt->bindParam( 3, $playerInfo['player_level'], PDO::PARAM_INT);
  $stmt->bindParam( 4, $playerInfo['player_index_id'], PDO::PARAM_INT);
  $stmt->bindParam( 5, $partyScoutStatus, PDO::PARAM_INT);
  $stmt->bindParam( 6, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getFriendPartys($conn,$playerInfo){ //フレンドのパーティ一覧を取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $partyScoutStatus = 0;
  $limit = 10;
  $sql = "SELECT * FROM player_friend LEFT JOIN player_info ON player_friend.friend_player_index_id = player_info.player_index_id LEFT JOIN player_party ON player_info.player_index_id = player_party.leader_player_index_id
   WHERE player_party.party_order_type =? AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_friend.player_index_id = ?
   AND player_info.player_index_id = player_info.player_party_index_id
   AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_info.player_index_id != ? AND player_party.party_scout_status =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $partyOrderType, PDO::PARAM_INT);
  $stmt->bindParam( 2, $playerInfo['player_index_id'], PDO::PARAM_INT);
  $stmt->bindParam( 3, $playerInfo['player_index_id'], PDO::PARAM_INT);
  $stmt->bindParam( 4, $partyScoutStatus, PDO::PARAM_INT);
  $stmt->bindParam( 5, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getSearchCommentPartys($conn,$playerInfo,$comment){ //コメントで検索したパーティ一覧を取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $partyScoutStatus = 0;
  $searchComment = "%".$comment."%";
  $limit = 10;
  $sql = "SELECT * FROM player_info LEFT JOIN player_party ON player_info.player_index_id = player_party.leader_player_index_id
   WHERE player_party.party_order_type =? AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_party.party_comment LIKE ?
   AND player_info.player_index_id = player_info.player_party_index_id
   AND player_info.player_index_id = player_party.leader_player_index_id
   AND player_info.player_index_id != ? AND player_party.party_scout_status =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $partyOrderType, PDO::PARAM_INT);
  $stmt->bindParam( 2, $searchComment, PDO::PARAM_STR);
  $stmt->bindParam( 3, $playerInfo['player_index_id'], PDO::PARAM_INT);
  $stmt->bindParam( 4, $partyScoutStatus, PDO::PARAM_INT);
  $stmt->bindParam( 5, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function sendInvitationParty($conn,$playerIndexId,$invitationPartyId,$invitationPlayerIndexId){ //パーティ招待を送る $invitationPlayerIndexId:招待を受けたプレイヤーIndexID
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if($invitationPartyId != $invitationPlayerIndexId){ //自分自身に招待は送れない
    if($playerIndexId == $invitationPartyId){ //パーティリーダーである。
      try{
        $conn->beginTransaction(); //トランザクション開始
        $stmt = $conn -> prepare("INSERT INTO player_party_invitation (invitation_player_index_id, invitation_party_id)
        SELECT :invitation_player_index_id, :invitation_party_id FROM dual WHERE NOT EXISTS ( SELECT invitation_player_index_id, invitation_party_id FROM player_party_invitation
          WHERE invitation_player_index_id= :invitation_player_index_id AND invitation_party_id = :invitation_party_id)");
        $stmt->bindParam(':invitation_player_index_id', $invitationPlayerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':invitation_party_id', $invitationPartyId, PDO::PARAM_INT);
        $stmt->execute();
        $conn->commit(); //トランザクション終了
        $result['error'] = 0;
        $result['error_comment'] = "";
      }
      catch(Exception $e){
        $conn->rollBack();
      }
    }
    else{ //パーティ招待はリーダーだけが行えます。
      $result['error'] = -2;
      $result['error_comment'] = "パーティ招待はリーダーだけが行えます。";
    }
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "自分自身を招待する事は出来ません。";
  }
  return $result;
}

function getPlayerPartyInvitationData($conn,$playerIndexId){ //招待され中のパーティリストを取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $limit = 10;
  $sql = "SELECT * FROM player_party_invitation LEFT JOIN player_info ON player_party_invitation.invitation_party_id = player_info.player_index_id
   LEFT JOIN player_party ON player_info.player_index_id = player_party.leader_player_index_id
   WHERE player_party_invitation.invitation_player_index_id =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function insertPartyApplication($conn,$applicationPlayerIndexId,$applicationPartyId){ //パーティ申請を行う
  $result = false;
  if($applicationPartyId != $applicationPlayerIndexId){ //自分自身に申請は送れない
    try{
      $conn->beginTransaction(); //トランザクション開始
      $stmt = $conn -> prepare("INSERT INTO player_party_application (application_player_index_id, application_party_id)
      SELECT :application_player_index_id, :application_party_id FROM dual WHERE NOT EXISTS ( SELECT application_player_index_id, application_party_id
        FROM player_party_application WHERE application_player_index_id= :application_player_index_id
        AND application_party_id = :application_party_id)");
      $stmt->bindParam(':application_player_index_id', $applicationPlayerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':application_party_id', $applicationPartyId, PDO::PARAM_INT);
      $stmt->execute();
      $conn->commit(); //トランザクション終了
      $result = true;
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      $result = false;
    }
  }
  return $result;
}

function getPlayerPartyApplicationData($conn,$playerIndexId){ //申請受信中のパーティリストを取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $limit = 10;
  $sql = "SELECT * FROM player_party_application LEFT JOIN player_info ON player_party_application.application_player_index_id = player_info.player_index_id
   LEFT JOIN player_party ON player_info.player_index_id = player_party.leader_player_index_id
   WHERE player_party_application.application_party_id =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function deletePlayerPartyApplication($conn,$playerIndexId,$cancelPlayerIndexId){ //パーティ参加申請を無効にする。
  $result = 0;
  $sql = "DELETE FROM player_party_application WHERE application_party_id=? AND application_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$cancelPlayerIndexId));
  $result = $stmt->rowCount();
  return $result;
}

function deletePlayerPartyInvitation($conn,$playerIndexId,$cancelPlayerIndexId){ //パーティ招待を無効にする。
  $result = 0;
  $sql = "DELETE FROM player_party_invitation WHERE invitation_party_id=? AND invitation_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$cancelPlayerIndexId));
  $result = $stmt->rowCount();
  return $result;
}

function getPartySettingData($conn,$partyIndexId){ //パーティ設定データを取得する。
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  //自分のパーティデータを取得
  $result['player_party'] = getPlayerParty($conn,$partyIndexId);
  if($result['player_party'] != false){
    $result['party_member_datas'] = getPartyMemberPlayerDatas($conn,$partyIndexId);
    if(is_array($result['party_member_datas'])){
      $result['error'] = 0;
      $result['error_comment'] = "";
    }
    else{
      $result['error'] = -3;
      $result['error_comment'] = "プレイヤーデータの取得に失敗しました";
    }
  }
  else{
    $result['error'] = -2;
    $result['error_comment'] = "パーティデータの取得に失敗しました";
  }
  return $result;
}

function updatePlayerPartyScoutStatus($conn,$partyIndexId,$updatePartyScoutStatus){ //パーティ募集設定を更新する。
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if($updatePartyScoutStatus == 0 || $updatePartyScoutStatus == 1){
    $sql = "UPDATE player_party SET party_scout_status=? WHERE leader_player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updatePartyScoutStatus,$partyIndexId));
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "設定不可能なパラメーターが存在しました";
  }
  return $result;
}

function updatePlayerPartyLeader($conn,$partyIndexId,$newLeaderIndexId){ //パーティリーダーを変更する
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if($partyIndexId != $newLeaderIndexId){
    try{
      $conn->beginTransaction(); //トランザクション開始
      //現在のパーティメンバーを取得
      $getPartyMemberDatas = transactionGetPartyMemberPlayerDatas($conn,$partyIndexId);
      if(count($getPartyMemberDatas) <= 5 && count($getPartyMemberDatas) != 0){ //パーティ人数は正常か。
        $newPartyLeaderFound = false;
        foreach ($getPartyMemberDatas as $playerData) {
          if($playerData['player_index_id'] == $newLeaderIndexId){ //新しいリーダーが今のパーティに存在した
            $newPartyLeaderFound = true;
            break;
          }
        }
        if($newPartyLeaderFound == true){ //新しいパーティリーダーを変更可能
          $getNewPlayerParty = transactionGetPlayerParty($conn,$newLeaderIndexId); //変更先のパーティ情報を取得
          $getNewPartyMemberDatas = transactionGetPartyMemberPlayerDatas($conn,$newLeaderIndexId); //変更先のパーティメンバーを取得
          if($getNewPlayerParty != false && count($getNewPartyMemberDatas) == 0){
            foreach ($getPartyMemberDatas as $playerData) {
              $sql = "UPDATE player_info SET player_party_index_id=? WHERE player_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($newLeaderIndexId,$playerData['player_index_id']));
            }
            $result['error'] = 0;
            $result['error_comment'] = "";
          }
          else{
            $result['error'] = -4;
            $result['error_comment'] = "パーティデータの取得に失敗しました";
          }
        }
        else{
          $result['error'] = -2;
          $result['error_comment'] = "変更対象のプレイヤーが\nパーティから離脱しました。";
        }
      }
      else{
        $result['error'] = -3;
        $result['error_comment'] = "パーティデータの取得に失敗しました";
      }
      if($result['error'] == 0){ //正常
        $conn->commit(); //トランザクション終了
      }
      else{ //エラー
        $conn->rollBack();
      }
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      $result['error'] = -999;
      $result['error_comment'] = "不明なエラー";
    }
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "既にリーダーになっています。";
  }
  return $result;
}

function updatePlayerPartyMinLevel($conn,$partyIndexId,$updateMinLevel){ //推奨最低レベルの更新を行う
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if(1 <= $updateMinLevel && $updateMinLevel <= 999){ //設定可能な数値か
    $sql = "UPDATE player_party SET party_level_min=? WHERE leader_player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updateMinLevel,$partyIndexId));
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "設定不可能なパラメーターが存在しました";
  }
  return $result;
}

function updatePlayerPartyMaxLevel($conn,$partyIndexId,$updateMaxLevel){ //推奨最大レベルの更新を行う
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if(1 <= $updateMaxLevel && $updateMaxLevel <= 999){ //設定可能な数値か
    $sql = "UPDATE player_party SET party_level_max=? WHERE leader_player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updateMaxLevel,$partyIndexId));
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "設定不可能なパラメーターが存在しました";
  }
  return $result;
}

function updatePlayerPartyComment($conn,$partyIndexId,$updateText){ //パーティ募集文を更新する
  $result = array();
  $result['error'] = -999;
  $result['error_comment'] = "不明なエラー";
  if(mb_strlen($updateText) <= 100){
    $sql = "UPDATE player_party SET party_comment=? WHERE leader_player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->bindParam( 1, $updateText, PDO::PARAM_STR);
    $stmt->bindParam( 2, $partyIndexId, PDO::PARAM_INT);
    $stmt->execute();
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  else{
    $result['error'] = -1;
    $result['error_comment'] = "文字数がオーバーしています";
  }
  return $result;
}

function replacePlayerPosIndex($conn,$partyIndexId){ //パーティ人数に変更があった場合、順番を入れ替える
  $partyMemberDatas = getPartyMemberPlayerDatas($conn,$partyIndexId);
  $playerPosIndex = 0;
  $i = 1;
  foreach ($partyMemberDatas as $ptMemberPos) {
    $sql = "SET @i := -1;";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $sql = "UPDATE player_info SET player_pos_index=(@i := @i + ?) WHERE player_party_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($i,$partyIndexId));
    $updateFlag = $stmt->rowCount();
    if($updateFlag == 1){
      $playerPosIndex = $playerPosIndex + 1;
    }
  }
}

function updatePlayerPosIndex($conn,$playerIndexId,$newPlayerPosIndex,$playerPartyIndexId){ //プレイヤーの配置情報を更新する
  $sql = "UPDATE player_info SET player_pos_index=? WHERE player_index_id=? AND player_party_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($newPlayerPosIndex,$playerIndexId,$playerPartyIndexId));
}

function searchPvpPlayer($conn,$areaId,$role){ //対戦相手を取得 $role: 0:殺害目的を持ったプレイヤー取得 1:救援目的を持ったプレイヤーを取得
  if($role == -1) return array();
  $getGuardPlayerInfos = array();
  $columnName = "pvp_matching_list.update_dttm";
  $direction = "DESC";
  $visible = 1;
  $limit = 100;
  $sql = "SELECT * FROM pvp_matching_list LEFT JOIN player_area_instance
  ON pvp_matching_list.player_index_id = player_area_instance.player_index_id
  WHERE pvp_matching_list.role =? AND player_area_instance.visible =? AND player_area_instance.area_id =? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $role, PDO::PARAM_INT);
  $stmt->bindParam( 2, $visible, PDO::PARAM_INT);
  $stmt->bindParam( 3, $areaId, PDO::PARAM_INT);
  $stmt->bindParam( 4, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $serachList = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $serachList;
}

function setGuardMember($conn,$playerInfo,$partyMemberData,$mapMasterData){ //パーティメンバーデータに衛兵が有効な場合、衛兵メンバーを追加
  //衛兵が有効であれば、設定
  $addGuardCharaNum = 5 - count($partyMemberData);
  if(0 < $addGuardCharaNum){ //1人以上の追加枠が存在する
    $ids = explode(",",$mapMasterData['guard_player_index_id_list']); //MAPで有効なサポートプレイヤーのid配列を取得
    if(0 < count($ids)){
      //エリアインスタンスを取得
      $enemyPower = 0;
      $playerAreaInstance = getPlayerAreaInstance($conn,$playerInfo['player_index_id']); //プレイヤーの居るエリアデータを取得
      $areaMaster = getAreaMaster($conn,$playerAreaInstance['area_id']); //エリアのマスターデータ取得
      $areaInstance = getAreaInstanceSelectMapId($conn,$areaMaster['map_id']); //エリアのインスタンスデータを取得
      $nowEnemyPower = $areaInstance['enemy_power']; //現在の敵勢力
      $maxEnemyPower = $mapMasterData['max_enemy_power']; //最大の敵勢力
      $powerCondition = round(($nowEnemyPower / $maxEnemyPower) * 100); //エリア勢力の期待値
      $powerCondition = 100 - $powerCondition;
      if($powerCondition < 0) $powerCondition = 0;
      $guardPlayerMemberDatas = getGuardPlayerDatas($conn,$mapMasterData['guard_player_index_id_list']);
      if(count($guardPlayerMemberDatas) != 0){
        for ($i=0; $i < $addGuardCharaNum; $i++) {
          foreach ($guardPlayerMemberDatas as $sPlData) {
            $sPlayerCondition = round($sPlData['active_condition'] * ($powerCondition / 100));
            $rot = rand(1,100);
            if($rot <= $sPlayerCondition){ //サポートが有効
              $enemyCheck = true;
              foreach ($partyMemberData as $enemyData) { //重複チェック
                if($enemyData['player_index_id'] == $sPlData['player_index_id']) $enemyCheck = false;
              }
              if($enemyCheck == true){//重複は除外
                $sPlData['player_pos_index'] = count($partyMemberData);
                array_push($partyMemberData,$sPlData);
                break;
              }
            }
          }
        }
      }
    }
  }
  return $partyMemberData;
}

function setHeroMember($conn,$playerInfo,$partyMemberData,$mapMasterData){ //パーティメンバーデータに英雄が有効な場合、英雄メンバーを追加
  //衛兵が有効であれば、設定
  $result = array();
  $result['party_member'] = $partyMemberData;
  $result['hero_member'] = array();
  $addHeroCharaNum = 5 - count($partyMemberData);
  if(0 < $addHeroCharaNum){ //1人以上の追加枠が存在する
    $ids = explode(",",$mapMasterData['guard_player_index_id_list']); //MAPで有効なサポートプレイヤーのid配列を取得
    if(0 < count($ids)){
      //エリアインスタンスを取得
      $enemyPower = 0;
      $playerAreaInstance = getPlayerAreaInstance($conn,$playerInfo['player_index_id']); //プレイヤーの居るエリアデータを取得
      $areaMaster = getAreaMaster($conn,$playerAreaInstance['area_id']); //エリアのマスターデータ取得
      $areaInstance = getAreaInstanceSelectMapId($conn,$areaMaster['map_id']); //エリアのインスタンスデータを取得
      $nowEnemyPower = $areaInstance['enemy_power']; //現在の敵勢力
      $maxEnemyPower = $mapMasterData['max_enemy_power']; //最大の敵勢力
      $powerCondition = round(($nowEnemyPower / $maxEnemyPower) * 100); //エリア勢力の期待値
      $powerCondition = 100 - $powerCondition;
      if($powerCondition < 0) $powerCondition = 0;
      $guardPlayerMemberDatas = getGuardPlayerDatas($conn,$mapMasterData['guard_player_index_id_list']);
      $heroMemberDatas = selectPlayerSearchDatas($conn,1,2); //有効な英雄メンバーを取得
      if(count($heroMemberDatas) != 0){
        for ($i=0; $i < $addHeroCharaNum; $i++) {
          foreach ($heroMemberDatas as $sPlData) {
            $sPlayerCondition = round(50 * ($powerCondition / 100));
            $rot = rand(1,100);
            if($rot <= $sPlayerCondition){ //サポートが有効
              $enemyCheck = true;
              foreach ($partyMemberData as $enemyData) { //重複チェック
                if($enemyData['player_index_id'] == $sPlData['player_index_id']) $enemyCheck = false;
              }
              if($enemyCheck == true){//重複は除外
                $heroPlayerInfo = getPlayerInfoForIndexId($conn,$sPlData['player_index_id'],true);
                if($heroPlayerInfo != false){
                  $heroPlayerName = getPlayerName($conn,$heroPlayerInfo['player_index_id']);
                  $heroPlayerInfo['player_name'] = $heroPlayerName;
                  $heroPlayerInfo['player_pos_index'] = count($partyMemberData);
                  array_push($partyMemberData,$heroPlayerInfo);
                  array_push($result['hero_member'],$heroPlayerInfo);
                }
                break;
              }
            }
            else{
              break;
            }
          }
        }
      }
    }
  }
  $result['party_member'] = $partyMemberData;
  return $result;
}






















 ?>
