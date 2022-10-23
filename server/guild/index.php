<?php
include_once '../../module/item/index.php';

//ギルドレベルマスターデータを取得
function getGuildLevelMasterDatas($conn){
  $sql = "SELECT * FROM guild_level_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//ギルドレベルマスターデータを選択
function selectGuildLevelMasterDatas($conn,$level){
  $sql = "SELECT * FROM guild_level_master WHERE level=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($level));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーギルドデータをギルドIDから選択
function selectPlayerGuildDataForGuildId($conn,$guildId,$transaction = false){
  $sql = "SELECT * FROM player_guild WHERE guild_id=?";
  if($transaction == true) $sql = "SELECT * FROM player_guild WHERE guild_id=? FOR UPDATE";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($guildId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーギルドデータをギルドリーダープレイヤーIDから選択
function selectPlayerGuildDataForReaderPlayerIndexId($conn,$leaderPlayerIndexId){
  $sql = "SELECT * FROM player_guild WHERE guild_leader_player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($leaderPlayerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーIDから所属ギルド情報を取得
function getPlayerGuildData($conn,$playerIndexId,$transaction = false){
  $result = null;
  $playerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,true,$transaction);
  if(isset($playerInfo['player_guild_index_id']) && $playerInfo['player_guild_index_id'] != 0){
    $result = selectPlayerGuildDataForGuildId($conn,$playerInfo['player_guild_index_id'],$transaction);
  }
  return $result;
}

//経験値からギルドレベルマスターデータを取得する
function selectGuildLevelMasterData($conn,$exp){
  $result = false;
  $level = -1;
  $sql = "SELECT * FROM guild_level_master WHERE level_up_exp <= ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($exp));
  $guildLevels = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($guildLevels as $levelMaster) {
    if($level < $levelMaster['level']){ $level = $levelMaster['level']; $result = $levelMaster; }
  }
  return $result;
}

//ギルドメンバー数を取得
function getGuildMemberCount($conn,$guildId,$transaction = false){
  $result = 0;
  if($transaction == false){
    $sql = "SELECT COUNT(player_guild_index_id) FROM player_info WHERE player_guild_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($guildId));
    $result = $stmt->fetchColumn();
  }
  else{
    $sql = "SELECT COUNT(player_guild_index_id) FROM player_info WHERE player_guild_index_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($guildId));
    $result = $stmt->fetchColumn();
  }
  return $result;
}

//ギルドメンバーデータを取得
function getGuildMemberDatas($conn,$guildId){
  $sql = "SELECT * FROM player_info WHERE player_guild_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($guildId));
  $result = $stmt->fetchAll();
  return $result;
}

//おすすめのギルドデータを取得(現状は最終ログイン時刻から10件を取得)
function getRecommendedGuildDatas($conn){
  $columnName = "player_guild.last_login_dttm";
  $direction = "DESC";
  $guildScoutStatus = 2;
  $limit = 10;
  $sql = "SELECT * FROM player_guild WHERE guild_scout_status !=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $guildScoutStatus, PDO::PARAM_INT);
  $stmt->bindParam( 2, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getSearchGuildName($conn,$comment){ //ギルド名で検索して一致したギルドを取得
  $columnName = "last_login_dttm";
  $direction = "DESC";
  $guildScoutStatus = 2; //募集締め切り状態は除外
  $searchComment = "%".$comment."%";
  $limit = 10;
  $sql = "SELECT * FROM player_guild WHERE guild_scout_status !=?
  AND guild_name LIKE ? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $guildScoutStatus, PDO::PARAM_INT);
  $stmt->bindParam( 2, $searchComment, PDO::PARAM_STR);
  $stmt->bindParam( 3, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getSearchGuildFriend($conn,$playerIndexId){ //フレンドからギルド検索で一致したギルドを取得
  //最新ログイン順から10人のフレンドを取得
  $columnName = "player_info.last_login_dttm";
  $direction = "DESC";
  $partyOrderType = 0;
  $partyScoutStatus = 0;
  $limit = 10;
  $sql = "SELECT * FROM player_friend LEFT JOIN player_info ON player_friend.friend_player_index_id = player_info.player_index_id WHERE
  player_friend.player_index_id = ? AND player_info.player_index_id != ? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 2, $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam( 3, $limit, PDO::PARAM_INT );
  $stmt->execute();
  $friendDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $guildIds = array();
  for ($i=0; $i < count($friendDatas); $i++) {
    $guildIds[$i] = (int)$friendDatas[$i]['player_guild_index_id'];
  }

  //配列で重複している物を削除する
  $uniqueGuildIds = array_unique($guildIds);

  //キーが飛び飛びになっているので、キーを振り直す
  $resultUniqueGuildIds = array_values($uniqueGuildIds);
  //空の場合空配列を返す
  if(count($resultUniqueGuildIds) == 0) return array();

  $selectGuildIds = substr(str_repeat(',?', count($resultUniqueGuildIds)), 1);
  $sql = "SELECT * FROM player_guild WHERE guild_id IN ({$selectGuildIds})";
  $stmt = $conn->prepare($sql);
  $stmt->execute($resultUniqueGuildIds);
  $getPlayerGuildDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result = array();
  foreach ($getPlayerGuildDatas as $plGuildData) {
    if($plGuildData['guild_scout_status'] != 2){ //締め切りのギルドを除外
      $result[count($result)] = $plGuildData;
    }
  }

  return $result;
}

function checkCreateMyGuild($conn,$playerIndexId,$playerGuildIndexId,$env){ //ギルドが設立可能な状態かチェックを行う
  $result = array();
  $result['create_flag'] = false;
  $result['item_data'] = null;
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['item_data'] = null;
  $setErrorComment = "";
  $appDefine = new AppDefine($env);
  $itemData = getItemIdData($conn,$appDefine->GUILD_CREATE_ITEM_ID);
  if($itemData == false){
    $result['error'] = 1;
    $result['error_comment'] = "アイテムデータの取得に失敗しました。";
    return $result;
  }
  else{
    $result['item_data'] = $itemData;
  }
  $itemCountCheck = itemCountCheck($conn,$playerIndexId,$appDefine->GUILD_CREATE_ITEM_ID,1);
  if($itemCountCheck == false){
    $result['error'] = 2;
    $setErrorComment = $setErrorComment."ギルドの設立には「".$itemData['item_name']."」が必要です。¥n";
  }
  if($playerGuildIndexId != 0){
    $result['error'] = 3;
    $setErrorComment = $setErrorComment."ギルドを抜けてから設立して下さい。¥n";
  }
  $result['error_comment'] = $setErrorComment;
  return $result;
}

function createMyGuild($conn,$playerIndexId,$env){ //個人ギルドの作成を行う
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['my_guild_data'] = null;
  try{
    $conn->beginTransaction(); //トランザクション開始
    //更新対象のデータを取得
    $sql = "SELECT * FROM player_info WHERE player_index_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $selectUpdatePlayerInfo = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectUpdatePlayerInfo['player_guild_index_id'] == 0){ //ギルドに未所属だった。
      //アイテム消費処理を開始
      $appDefine = new AppDefine($env);
      $itemData = getItemIdData($conn,$appDefine->GUILD_CREATE_ITEM_ID);
      $resultUseItem = false; //アイテムの消費に成功したか。
      $itemCount = 1;
      if($itemData != false){
        $checkUseItem = transactionItemCountCheck($conn,$playerIndexId,$itemData['id'],$itemCount);
        if($checkUseItem == true){
          $useItem = itemCountUpdate($conn,$playerIndexId,$itemData['id'],$itemCount);
          if($useItem == true) $resultUseItem = true;
        }
      }
      if($resultUseItem == true){
        $guildType = 0;
        $guildExp = 0;
        $guildScoutStatus = 0;
        $emblemSpriteIds = "";
        $guildName = $selectUpdatePlayerInfo['player_name']."のギルド";
        $insertDttm = date('Y-m-d H:i:s');
        $stmt = $conn -> prepare("INSERT INTO player_guild (guild_id, guild_type, guild_leader_player_index_id, guild_exp, guild_name, guild_scout_status, emblem_sprite_ids, last_login_dttm)
        VALUES (:guild_id, :guild_type, :guild_leader_player_index_id, :guild_exp, :guild_name, :guild_scout_status, :emblem_sprite_ids, :last_login_dttm) ON DUPLICATE KEY UPDATE last_login_dttm = :last_login_dttm");
        $stmt->bindParam(':guild_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':guild_type', $guildType, PDO::PARAM_INT);
        $stmt->bindParam(':guild_leader_player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':guild_exp', $guildExp, PDO::PARAM_INT);
        $stmt->bindParam(':guild_name', $guildName, PDO::PARAM_STR);
        $stmt->bindParam(':guild_scout_status', $guildScoutStatus, PDO::PARAM_INT);
        $stmt->bindParam(':emblem_sprite_ids', $emblemSpriteIds, PDO::PARAM_STR);
        $stmt->bindParam(':last_login_dttm', $insertDttm, PDO::PARAM_STR);
        $stmt->execute();
        //所属する(開設した)ギルドIDに更新
        $beforGuildIndexId = 0;
        $afterGuildIndexid = $playerIndexId;
        $sql = "UPDATE player_info SET player_guild_index_id = ? WHERE player_index_id=? AND player_guild_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($afterGuildIndexid,$playerIndexId,$beforGuildIndexId));
        //設立したギルドデータを取得
        $result['my_guild_data'] = selectPlayerGuildDataForGuildId($conn,$playerIndexId);
      }
      else{
        throw new Exception("アイテムデータの処理に失敗しました。");
      }
    }
    else{
      throw new Exception("既にギルドに所属しています。");
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    //var_dump($e);
    $result['error_comment'] = $e->getMessage();
    $result['error'] = 1;
  }
  return $result;
}

//ギルド加入申請を送信する
function postGuildJoinApplication($conn,$playerIndexId,$guildId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $playerGuildData = selectPlayerGuildDataForGuildId($conn,$guildId);
  if($playerGuildData != false){
    if($playerGuildData['guild_scout_status'] != 2){
      if($playerGuildData['guild_scout_status'] == 0){ //申請送信の準備
        try{
          $conn->beginTransaction(); //トランザクション開始
          //自分がギルドに加入していないかチェック
          $getPlayerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,true);
          if($getPlayerInfo != false){
            if($getPlayerInfo['player_guild_index_id'] == 0){
              $nowDttm = new DateTime();
              $dttmStr = $nowDttm->format('Y-m-d H:i:s');
              $stmt = $conn -> prepare("INSERT INTO player_guild_application (send_application_player_index_id, application_player_guild_index_id)
              VALUES (:send_application_player_index_id, :application_player_guild_index_id) ON DUPLICATE KEY UPDATE update_dttm = :update_dttm");
              $stmt->bindParam(':send_application_player_index_id', $playerIndexId, PDO::PARAM_INT);
              $stmt->bindParam(':application_player_guild_index_id', $guildId, PDO::PARAM_INT);
              $stmt->bindParam(':update_dttm', $dttmStr, PDO::PARAM_STR);
              $stmt->execute();
            }
            else{
              throw new Exception("既にギルドに加入しています。");
            }
          } else{
            throw new Exception("プレイヤーデータの取得に失敗しました。");
          }
          $conn->commit(); //トランザクション終了
        }
        catch(Exception $e){
          $conn->rollBack();
          $result['error_comment'] = $e->getMessage();
          $result['error'] = 3;
        }
      } else if($playerGuildData['guild_scout_status'] == 1){ //承認不要の場合、ここで加入させる
        $resultAddMember = addGuildMember($conn,$playerIndexId,$guildId);
        $result['error'] = $resultAddMember['error'];
        $result['error_comment'] = $resultAddMember['error_comment'];
      }
    } else { $result['error'] = 2; $result['error_comment'] = "ギルドメンバーの募集が締め切りとなりました"; }
  } else { $result['error'] = 1; $result['error_comment'] = "ギルドデータの取得に失敗しました"; }
  return $result;
}

function selectGuildJoinApplication($conn,$sendPlayerIndexId,$guildId){ //申請者のプレイヤーIDと申請先のギルドIDから申請データを取得
  $result = false;
  $sql = "SELECT * FROM player_guild_application WHERE send_application_player_index_id=? AND application_player_guild_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($sendPlayerIndexId,$guildId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getGuildJoinApplications($conn,$guildId){ //ギルドIDから申請中のデータを取得
  $result = array();
  $sql = "SELECT * FROM player_guild_application WHERE application_player_guild_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($guildId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function deleteGuildApplictionData($conn,$id,$transaction = true){ //申請データを削除する
  $result = array();
  $result['error'] = 0;
  $result['delete_count'] = 0;
  $result['error_comment'] = "";
  if($transaction == true){
    try{
      $conn->beginTransaction(); //トランザクション開始
      $sql = "DELETE FROM player_guild_application WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($sendPlayerIndexId));
      $result['delete_count'] = $stmt->rowCount();
      $conn->commit(); //トランザクション終了
      return $result;
    }
    catch(Exception $e){
      $conn->rollBack();
      $result['error'] = -1;
      $result['error_comment'] = $e->getMessage();
      return $result;
    }
  }
  else{
    $sql = "DELETE FROM player_guild_application WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($sendPlayerIndexId));
    $result['delete_count'] = $stmt->rowCount();
    return $result;
  }
}

function deleteGuildApplictionDatas($conn,$applicationIds){ //申請データを削除する(複数指定)
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['delete_count'] = 0;
  if(!is_array($applicationIds)){
    $result['error'] = 1;
    $result['error_comment'] = "データの取得に失敗しました";
    return $result;
  }
  try{
    $conn->beginTransaction(); //トランザクション開始
    //$ids = implode(",",$applicationIds);
    $sql = sprintf('DELETE FROM player_guild_application WHERE id IN (%s)', implode(', ', array_fill(0, count($applicationIds), '?')));
    $stmt = $conn->prepare($sql);
    $stmt->execute($applicationIds);
    $result['delete_count'] = $stmt->rowCount();
    $conn->commit(); //トランザクション終了
    return $result;
  }
  catch(Exception $e){
    $conn->rollBack();
    $result['error'] = 2;
    $result['error_comment'] = $e->getMessage();
    return $result;
  }
}

function deleteInvaildGuildApplicationData($conn,$guildId){ //無効な申請データを削除する
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['delete_count'] = 0;
  $guildJoinApplicationDatas = getGuildJoinApplications($conn,$guildId);
  $deleteList = array();
  foreach ($guildJoinApplicationDatas as $guildJoinApplicationData) {
    //更新日時が1週間過ぎたものを削除リストに追加
    $nowDttm = new DateTime();
    $updateDttm = new DateTime($guildJoinApplicationData['update_dttm']);
    $updateDttm->modify('+1 weeks');
    if($updateDttm < $nowDttm){ //1週間過ぎていた
      array_push($deleteList,$guildJoinApplicationData['id']);
    }
  }
  $result = deleteGuildApplictionDatas($conn,$deleteList); //削除
  return $result;
}

function addGuildMember($conn,$playerIndexId,$guildId){ //ギルドメンバー追加
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $playerGuildData = selectPlayerGuildDataForGuildId($conn,$guildId);
  if($playerGuildData == false){
    $result['error'] = 1;
    $result['error_comment'] = "ギルドデータの取得に失敗しました";
    return $result;
  }
  try{
    $conn->beginTransaction(); //トランザクション開始
    //自分がギルドに加入していないかチェック
    $getPlayerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,true);
    if($getPlayerInfo != false){
      if($getPlayerInfo['player_guild_index_id'] == 0){
        //定員オーバーではないかチェック
        $guildLevelMaster = selectGuildLevelMasterData($conn,$playerGuildData['guild_exp']);
        if($guildLevelMaster != false){
          $memberCount = getGuildMemberCount($conn,$guildId,true);
          if($memberCount < $guildLevelMaster['max_member']){
            //申請リストにあれば、申請を削除
            $selectGuildJoinApplicationData = selectGuildJoinApplication($conn,$playerIndexId,$guildId);
            if($selectGuildJoinApplicationData != false){
              deleteGuildApplictionData($conn,$selectGuildJoinApplicationData['id'],false);
            }
            $nowDttm = new DateTime();
            $joinDttmStr = $nowDttm->format('Y-m-d H:i:s');
            $beforGuildIndexId = 0;
            $sql = "UPDATE player_info SET player_guild_index_id=?,player_guild_join_dttm=? WHERE player_index_id=? AND player_guild_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($guildId,$joinDttmStr,$playerIndexId,$beforGuildIndexId));
          }
          else{
            throw new Exception("ギルド参加人数の上限を超えています。");
          }
        }
        else{
          throw new Exception("ギルドレベルの取得に失敗しました。");
        }
      }
      else{
        throw new Exception("既にギルドに加入しています。");
      }
    }
    else{
      throw new Exception("プレイヤーデータの取得に失敗しました。");
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    $result['error_comment'] = $e->getMessage();
    $result['error'] = 2;
  }
  return $result;
}

//ギルドデータとプレイヤーIDからプレイヤーの階級を取得
function getPlayerGuildMemberClass($playerGuildData,$playerIndexId){
  $result = 0;
  if($playerIndexId == $playerGuildData['guild_leader_player_index_id']) return 3; //ギルマス
  if($playerGuildData['sub_leader_player_index_ids'] != ""){
    $subLeaders = explode(",",$playerGuildData['sub_leader_player_index_ids']);
    for ($i=0; $i < count($subLeaders); $i++) {
      if($subLeaders[$i] == $playerIndexId){ return 2; break; } //サブリーダー
    }
  }
  if($playerGuildData['staff_player_index_ids'] != ""){
    $staffs = explode(",",$playerGuildData['staff_player_index_ids']);
    for ($i=0; $i < count($staffs); $i++) {
      if($staffs[$i] == $playerIndexId){ return 1; break; } //スタッフ
    }
  }
  return $result;
}

//ギルドメンバーの階級を変更する
function guildMemberClassChange($conn,$myPlayerIndexId,$changePlayerIndexId,$changePoint){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";

  //自分と変更先のプレイヤーが同じギルドに所属しているかチェック
  $myGuild = getPlayerGuildData($conn,$myPlayerIndexId);
  $changePlayerGuild = getPlayerGuildData($conn,$changePlayerIndexId);
  if(isset($myGuild['guild_id']) && isset($changePlayerGuild['guild_id']) && $myGuild['guild_id'] == $changePlayerGuild['guild_id']){
    //階級のチェック
    $myGuildClass = 0;
    $changePlayerGuildClass = 0;
    $myGuildClass = getPlayerGuildMemberClass($myGuild,$myPlayerIndexId);
    $changePlayerGuildClass = getPlayerGuildMemberClass($myGuild,$changePlayerIndexId);
    // if($myPlayerIndexId == $myGuild['guild_leader_player_index_id']) $myGuildClass = 3;
    // if($changePlayerIndexId == $changePlayerGuild['guild_leader_player_index_id']) $changePlayerGuildClass = 3;
    // if($changePlayerGuild['sub_leader_player_index_ids'] != ""){
    //   $subLeaders = explode(",",$changePlayerGuild['sub_leader_player_index_ids']);
    //   for ($i=0; $i < count($subLeaders); $i++) {
    //     if($subLeaders[$i] == $myPlayerIndexId) $myGuildClass = 2;
    //     if($subLeaders[$i] == $changePlayerIndexId) $changePlayerGuildClass = 2;
    //   }
    // }
    // if($changePlayerGuild['staff_player_index_ids'] != ""){
    //   $staffs = explode(",",$changePlayerGuild['staff_player_index_ids']);
    //   for ($i=0; $i < count($staffs); $i++) {
    //     if($staffs[$i] == $myPlayerIndexId) $myGuildClass = 1;
    //     if($staffs[$i] == $changePlayerIndexId) $changePlayerGuildClass = 1;
    //   }
    // }
    //昇格プレイヤーがサブリーダー以上の場合は昇格不可
    if(0 < $changePoint && 2 <= $changePlayerGuildClass){
      $result['error'] = 2;
      $result['error_comment'] = "昇級不可能な階級です。";
    }
    //降格プレイヤーが一般の場合は降格不可
    if($changePoint < 0 && $changePlayerGuildClass == 0){
      $result['error'] = 2;
      $result['error_comment'] = "降格不可能な階級です。";
    }
    //自分の階級と同じかそれ以上の階級のプレイヤーは変更不可
    if($myGuildClass <= $changePlayerGuildClass){
      $result['error'] = 2;
      $result['error_comment'] = "昇級不可能な階級です。";
    }

    if($result['error'] == 0){ //エラーがなければ変更処理を実行
      $afterGuildMemberClass = $changePlayerGuildClass + $changePoint;
      $resultUpdate = updateGuildMemberClass($conn,$changePlayerGuild['guild_id'],$changePlayerIndexId,$afterGuildMemberClass);
      if($resultUpdate['error'] != 0){
        $result['error'] = $resultUpdate['error'];
        $result['error_comment'] =$resultUpdate['error_comment'];
      }
    }
  }
  else{
    $result['error'] = 1;
    $result['error_comment'] = "プレイヤーは別のギルドに所属しています。";
  }
  return $result;
}

function updateGuildMemberClass($conn,$guildId,$playerIndexId,$afterGuildMemberClass){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  //存在するギルドメンバークラスかチェック
  if($afterGuildMemberClass == 0 || $afterGuildMemberClass == 1 || $afterGuildMemberClass == 2){
    //更新処理
    try{
      $conn->beginTransaction(); //トランザクション開始
      $sql = "SELECT * FROM player_guild WHERE guild_id=? FOR UPDATE";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($guildId));
      $selectUpdateGuildData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($selectUpdateGuildData != false){
        $updateStaffColumn = $selectUpdateGuildData['staff_player_index_ids'];
        $updateSubLeaderColumn = $selectUpdateGuildData['sub_leader_player_index_ids'];
        //既に所属している階級からプレイヤーを除外
        if($selectUpdateGuildData['staff_player_index_ids'] != ""){
          $staffs = explode(",",$selectUpdateGuildData['staff_player_index_ids']);
          $updateStaffColumn = "";
          $updateStaff = array();
          for ($i=0; $i < count($staffs); $i++) {
            if($staffs[$i] != $playerIndexId){
              $updateStaff[count($updateStaff)] = $staffs[$i];
            }
          }
          if(count($updateStaff) == 0) $updateStaffColumn = "";
          else{
            $updateStaffColumn = implode(",",$updateStaff);
          }
        }
        //既に所属している階級からプレイヤーを除外
        if($selectUpdateGuildData['sub_leader_player_index_ids'] != ""){
          $subLeaders = explode(",",$selectUpdateGuildData['sub_leader_player_index_ids']);
          $updateSubLeaderColumn = "";
          $updateSubLeaders = array();
          for ($i=0; $i < count($subLeaders); $i++) {
            if($subLeaders[$i] != $playerIndexId){
              $updateSubLeaders[count($updateSubLeaders)] = $subLeaders[$i];
            }
          }
          if(count($updateSubLeaders) == 0) $updateSubLeaderColumn = "";
          else{
            $updateSubLeaderColumn = implode(",",$updateSubLeaders);
          }
        }
        //変更先階級プレイヤーIDを追加
        if($afterGuildMemberClass == 1){ //スタッフ
          if($updateStaffColumn == "") $updateStaffColumn = $playerIndexId;
          else $updateStaffColumn = $updateStaffColumn.",".$playerIndexId;
        }
        else if($afterGuildMemberClass == 2){ //サブリーダー
          if($updateSubLeaderColumn == "") $updateSubLeaderColumn = $playerIndexId;
          else $updateSubLeaderColumn = $updateSubLeaderColumn.",".$playerIndexId;
        }
        //変更情報を更新
        $sql = "UPDATE player_guild SET sub_leader_player_index_ids=?,staff_player_index_ids=? WHERE guild_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($updateSubLeaderColumn,$updateStaffColumn,$guildId));
      }
      else{
        throw new Exception("プレイヤーギルドデータの取得に失敗しました。");
      }
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      $result['error_comment'] = $e->getMessage();
      $result['error'] = 1;
    }
  }
  return $result;
}

//ギルドを抜ける or ギルマス実行の場合は解散
function guildMemberExit($conn,$guildId,$playerIndexId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  try{
    $conn->beginTransaction(); //トランザクション開始
    //自分がギルドに所属しているか確認
    $myGuild = getPlayerGuildData($conn,$playerIndexId,true);
    if($myGuild != false && $myGuild['guild_id'] == $guildId){
      //抜ける人の階級を取得
      $guildClass = getPlayerGuildMemberClass($myGuild,$playerIndexId);
      $updateStaffColumn = $selectUpdateGuildData['staff_player_index_ids'];
      $updateSubLeaderColumn = $selectUpdateGuildData['sub_leader_player_index_ids'];
      //既に所属している階級からプレイヤーを除外
      if($myGuild['staff_player_index_ids'] != ""){
        $staffs = explode(",",$myGuild['staff_player_index_ids']);
        $updateStaffColumn = "";
        $updateStaff = array();
        for ($i=0; $i < count($staffs); $i++) {
          if($staffs[$i] != $playerIndexId){
            $updateStaff[count($updateStaff)] = $staffs[$i];
          }
        }
        if(count($updateStaff) == 0) $updateStaffColumn = "";
        else{
          $updateStaffColumn = implode(",",$updateStaff);
        }
      }
      //既に所属している階級からプレイヤーを除外
      if($myGuild['sub_leader_player_index_ids'] != ""){
        $subLeaders = explode(",",$myGuild['sub_leader_player_index_ids']);
        $updateSubLeaderColumn = "";
        $updateSubLeaders = array();
        for ($i=0; $i < count($subLeaders); $i++) {
          if($subLeaders[$i] != $playerIndexId){
            $updateSubLeaders[count($updateSubLeaders)] = $subLeaders[$i];
          }
        }
        if(count($updateSubLeaders) == 0) $updateSubLeaderColumn = "";
        else{
          $updateSubLeaderColumn = implode(",",$updateSubLeaders);
        }
      }
      //ギルマスが抜ける場合は解散処理も実行
      if($guildClass == 3){
        $updateStaffColumn = "";
        $updateSubLeaderColumn = "";
      }
      //更新SQL決定
      $sql = "UPDATE player_guild SET sub_leader_player_index_ids=?,staff_player_index_ids=? WHERE guild_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($updateSubLeaderColumn,$updateStaffColumn,$guildId));
      //プレイヤー情報を更新
      $defaultGuildId = 0;
      $sql = "UPDATE player_info SET player_guild_index_id=? WHERE player_index_id=? AND player_guild_index_id=?";
      $executeParam = array($defaultGuildId,$playerIndexId,$guildId);
      //解散の場合は全員対象なのでSQL変更
      if($guildClass == 3){
        $sql = "UPDATE player_info SET player_guild_index_id=? WHERE player_guild_index_id=?";
        $executeParam = array($defaultGuildId,$guildId);
      }
      $stmt = $conn->prepare($sql);
      $stmt->execute($executeParam);
    }
    else{ throw new Exception("プレイヤーギルドデータの取得に失敗しました。"); }
    $conn->commit(); //トランザクション終了
  }catch(Exception $e){
    $conn->rollBack();
    $result['error_comment'] = $e->getMessage();
    $result['error'] = 1;
  }
  return $result;
}

//ギルドメンバーを追放
function guildMemberExpulsion($conn,$playerIndexId,$expulsionPlayerIndexId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  //追放するプレイヤーと追放させるプレイヤーが同じギルドに所属しているかチェック
  $myGuild = getPlayerGuildData($conn,$playerIndexId);
  $expulsionPlayerGuild = getPlayerGuildData($conn,$expulsionPlayerIndexId);
  if(isset($myGuild['guild_id']) && isset($expulsionPlayerGuild['guild_id']) && $myGuild['guild_id'] == $expulsionPlayerGuild['guild_id']){
    //追放か、離脱か
    if($playerIndexId != $expulsionPlayerIndexId){ //追放
      //追放可能な階級か両者の階級を比較
      $myGuildClass = getPlayerGuildMemberClass($myGuild,$playerIndexId);
      $expulsionGuildClass = getPlayerGuildMemberClass($myGuild,$expulsionPlayerIndexId);
      if($expulsionGuildClass < $myGuildClass){ //追放するプレイヤーより階級が高い場合は、追放可能
        //ギルド離脱処理 更新処理
        $result = guildMemberExit($conn,$myGuild['guild_id'],$expulsionPlayerIndexId);
      }
      else { $result['error'] = 3; $result['error_comment'] = "追放不可能な階級です";}
    }else { $result['error'] = 2; $result['error_comment'] = "自分自身を追放することはできません";}
  }else { $result['error'] = 1; $result['error_comment'] = "プレイヤーは既にギルドを離脱しています";}
  return $result;
}

//自分が所属しているギルドを離脱
function guildMyGuildExit($conn,$guildId,$playerIndexId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  //抜けるギルドが所属中のギルドか確認
  $myGuild = getPlayerGuildData($conn,$playerIndexId);
  if($myGuild != false && $myGuild['guild_id'] == $guildId){
    $result = guildMemberExit($conn,$myGuild['guild_id'],$playerIndexId);
  }
  else{
    $result['error'] = 1;
    $result['error_comment'] = "ギルドデータの取得に失敗しました";
  }
  return $result;
}

//ギルドの募集設定を変更する
function settingGuildScoutStatus($conn,$playerIndexId,$guildId,$scoutStatus){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['setting_scout_status'] = $scoutStatus;
  //設定するギルドが所属中のギルドか確認
  $myGuild = getPlayerGuildData($conn,$playerIndexId);
  if($myGuild != false && $myGuild['guild_id'] == $guildId){
    //権限があるか確認
    $guildClassId = getPlayerGuildMemberClass($myGuild,$playerIndexId);
    if(0 < $guildClassId){
      //募集内容変更
      try{
        $conn->beginTransaction(); //トランザクション開始
        $sql = "UPDATE player_guild SET guild_scout_status=? WHERE guild_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($scoutStatus,$guildId));
        $conn->commit(); //トランザクション終了
      }
      catch(Exception $e){
        $conn->rollBack();
        $result['error_comment'] = $e->getMessage();
        $result['error'] = 3;
      }
    }
    else{
      $result['error'] = 2;
      $result['error_comment'] = "募集内容変更は管理者のみが行えます";
    }
  }
  else{
    $result['error'] = 1;
    $result['error_comment'] = "ギルドデータの取得に失敗しました";
  }
  return $result;
}

//ギルドメッセージの変更する
function guildMessageUpdate($conn,$playerIndexId,$guildId,$message){
  $result = array();
  $result['error_comment'] = "";
  $result['error'] = 0;
  //設定するギルドが所属中のギルドか確認
  $myGuild = getPlayerGuildData($conn,$playerIndexId);
  if($myGuild != false && $myGuild['guild_id'] == $guildId){
    //権限があるか確認
    $guildClassId = getPlayerGuildMemberClass($myGuild,$playerIndexId);
    if(0 < $guildClassId){
      //字数制限チェック
      if(mb_strlen($message) <= 100){
        $sql = "UPDATE player_guild SET message=? WHERE guild_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->bindParam( 1, $message, PDO::PARAM_STR);
        $stmt->bindParam( 2, $guildId, PDO::PARAM_INT);
        $stmt->execute();
      }
      else{
        $result['error_comment'] = "設定可能な文字数の上限を超えています";
        $result['error'] = 1;
      }
    }
  }
  else{
    $result['error_comment'] = "ギルドデータの取得に失敗しました";
    $result['error'] = 2;
  }
  return $result;
}
