<?php
include_once '../../module/playerData/index.php';
include_once '../../module/item/index.php';
function getPointRankingMasterData($conn,$pointRankingId = -1){ //ポイントランキングのマスターデータを取得 ID指定でセレクト
  $result = false;
  if($pointRankingId != -1){ //ID指定されていれば絞り込み
    $sql = "SELECT * FROM point_ranking_master WHERE point_ranking_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($pointRankingId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  else{
    $sql = "SELECT * FROM point_ranking_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  return $result;
}

function getPointRankingDurationData($conn,$pointRankingDurationId = -1){ //ポイントランキングの期間データを取得 ID指定でセレクト
  $result = false;
  if($pointRankingDurationId != -1){ //ID指定されていれば絞り込み
    $sql = "SELECT * FROM point_ranking_duration WHERE point_ranking_duration_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($pointRankingDurationId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  else{
    $sql = "SELECT * FROM point_ranking_duration";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array());
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  return $result;
}

function getPointRankingDurationStep($pointRankingDurationData){ //期間ステップを取得 0:期間外 1:開催中&ポイント送信期間 2:結果発表&報酬獲得期間
  $result = 0;
  if(isset($pointRankingDurationData['st_dttm'])
  && isset($pointRankingDurationData['result_dttm'])
  && isset($pointRankingDurationData['ed_dttm'])){
    $stDate = new DateTime($pointRankingDurationData['st_dttm']);
    $resultDate = new DateTime($pointRankingDurationData['result_dttm']);
    $edDate = new DateTime($pointRankingDurationData['ed_dttm']);
    $now = new DateTime();
    if($stDate <= $now && $now <= $edDate){ //期間中
      if($now < $resultDate) $result = 1; //開催中&ポイント送信期間
      else $result = 2; //結果発表&報酬獲得期間
    }
  }
  return $result;
}

function getPlayerPointRankingDatas($conn,$redis,$playerIndexId,$pointRankingDurationId){ //プレイヤーの現在のポイントから、プレイヤーと他プレイヤーのランキングデータを取得
  //レディースから自分の順位を取得
  $resultRadis = null;
  $resultRankingData = array();
  $resultRankingData['ranking_data'] = array();
  $resultRankingData['option'] = 0; //-1:エラーがデータ無し 0:通常 1:最低順位に到達 2:最高順位に到達 3:両方
  $keyName = "point_ranking_duration_id_".$pointRankingDurationId;
  $playerRank = $redis->zRevRank($keyName,(int)$playerIndexId);
  $endRankCheck = $redis->zRank($keyName,(int)$playerIndexId);

  $endRank = $redis->zRange($keyName,0,0,true); //最低ランクを取得
  $endRankPlayerIndexId = -1; //最低ランクのプレイヤーID
  if($endRank != false){
    foreach ($endRank as $key => $value) {
      $endRankPlayerIndexId = (int)$key;
    }
  }
  $firstRank = $redis->zRevRange($keyName,0,0,true); //最高ランクを取得
  $firstRankPlayerIndexId = -1; //最低ランクのプレイヤーID
  if($firstRank != false){
    foreach ($firstRank as $key => $value) {
      $firstRankPlayerIndexId = (int)$key;
    }
  }

  if($playerRank === false && $endRankCheck === false){ //redisに未登録
    $resultRankingData['option'] = -1;
  }
  else if($firstRankPlayerIndexId == -1 && $endRankPlayerIndexId == -1){ //redis登録件数0
    $resultRankingData['option'] = -1;
  }
  else{
    if($endRankCheck == 0){ //最下位だった場合、最下位から5つ抜き取る
      $resultRadis = $redis->zRevRange($keyName, $playerRank - 4, $playerRank, true);
    }
    else if($endRankCheck == 1){ //最下位の次だった場合、最下位から5つ抜き取る
      $resultRadis = $redis->zRevRange($keyName, ($playerRank + 1) - 4, $playerRank + 1, true);
    }
    else if($playerRank < 5){ //順位が5以下の場合は0~4まで取る
      $resultRadis = $redis->zRevRange($keyName, 0, 4, true);
    }
    else {
      $resultRadis = $redis->zRevRange($keyName, ($playerRank - 2), ($playerRank + 2), true);
    }
  }

  if($resultRadis != null){
    $minFound = false;
    $maxFound = false;
    foreach ($resultRadis as $key => $val) {
      if((int)$key == $endRankPlayerIndexId){ $resultRankingData['option'] = 1; $minFound = true;}
      if((int)$key == $firstRankPlayerIndexId){ $resultRankingData['option'] = 2; $maxFound = true;}
      $playerData = getPlayerInfoForIndexId($conn,(int)$key,true);
      if($playerData != false){
        //$getRank = $redis->zRevRank($keyName,(int)$key);
        $getRank = $redis->zCount($keyName, (int)$val + 1, "+inf");
        if($getRank == $playerRank && (int)$key != (int)$playerIndexId){ //プレイヤーランクが違うプレイヤーデータを指していた場合
          $playerData = getPlayerInfoForIndexId($conn,$playerIndexId,true);
        }
        if($playerData != false){
          $playerData['point_ranking_score'] = $val;
          $playerData['point_ranking_rank'] = $getRank;
          array_push($resultRankingData['ranking_data'],$playerData);
        }
      }
    }
    if($endRankPlayerIndexId == $firstRankPlayerIndexId) $resultRankingData['option'] = 3;
    if($minFound == true && $maxFound == true) $resultRankingData['option'] = 3;
  }

  return $resultRankingData;
}

function getPointRankingDatas($conn,$redis,$min,$max,$pointRankingDurationId){ //順位の範囲指定でランキングデータとプレイヤーデータを取得
  $resultRadis = null;
  $resultRankingData = array();
  $resultRankingData['ranking_data'] = array();
  $resultRankingData['option'] = 0; //-1:データ無しかエラー 0:通常 1:最低順位に到達 2:最高順位に到達 3:両方
  $resultRankingData['min_player_index_id'] = -1;
  $resultRankingData['max_player_index_id'] = -1;
  $keyName = "point_ranking_duration_id_".$pointRankingDurationId;

  if($min <= 0) $resultRankingData['option'] = 1;
  $minRank = $redis->zRange($keyName, 0, 0, true); //最低ランクを取得
  $minPlayerIndexId = -1;
  if($minRank != false){
    foreach ($minRank as $key => $value) {
      $minPlayerIndexId = (int)$key;
      $resultRankingData['min_player_index_id'] = $minPlayerIndexId;
    }
  }

  $maxRank = $redis->zRevRange($keyName, 0, 0, true); //最高ランクを取得
  $maxPlayerIndexId = -1;
  if($maxRank != false){
    foreach ($maxRank as $key => $value) {
      $maxPlayerIndexId = (int)$key;
      $resultRankingData['max_player_index_id'] = $maxPlayerIndexId;
    }
  }

  $resultRadis = $redis->zRevRange($keyName, $min, $max, true);
  if($resultRadis === false){
    $resultRankingData['option'] = -1;
  }
  else if($minPlayerIndexId == -1 && $maxPlayerIndexId == -1){
    $resultRankingData['option'] = -1;
  }
  else{
    $minFound = false;
    $maxFound = false;
    foreach ($resultRadis as $key => $val) {
      if($minPlayerIndexId == (int)$key){ $resultRankingData['option'] = 1; $minFound = true;}
      if($maxPlayerIndexId == (int)$key){ $resultRankingData['option'] = 2; $maxFound = true;}
      $playerData = getPlayerInfoForIndexId($conn,(int)$key,true);
      if($playerData != false){
        $playerData['point_ranking_score'] = $val;
        $getRank = $redis->zCount($keyName, (int)$val + 1, "+inf");
        $playerData['point_ranking_rank'] = $getRank;
        array_push($resultRankingData['ranking_data'],$playerData);
      }
    }
    if($minPlayerIndexId == $maxPlayerIndexId) $resultRankingData['option'] = 3;
    if($minFound == true && $maxFound == true) $resultRankingData['option'] = 3;

  }
  return $resultRankingData;
}

//指定したプレイヤーIDだけのランキングとスコアを取得
function getPlayerPointRankingData($conn,$redis,$playerIndexId,$pointRankingDurationId){
  $result = array();
  $result['score'] = -1;
  $result['rank'] = -1;
  $keyName = "point_ranking_duration_id_".$pointRankingDurationId;
  $playerRank = $redis->zRevRank($keyName,(int)$playerIndexId);
  if($playerRank != false){
    //$result['rank'] = $playerRank;
    $resultRadis = $redis->zRevRange($keyName, $playerRank, $playerRank, true);
    foreach ($resultRadis as $key => $val) {
      $getRank = $redis->zCount($keyName, (int)$val + 1, "+inf");
      $result['score'] = $val;
      $result['rank'] = $getRank;
    }
  }
  return $result;
}

//ポイントの送信
function addRankingPoint($conn,$redis,$pointRankingDurationId,$playerIndexId,$pointItemId,$num){
  try{
    $conn->beginTransaction(); //トランザクション開始
    $sql = "SELECT * FROM player_item WHERE player_index_id=? AND item_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$pointItemId));
    $playerItemData = $stmt->fetch(PDO::FETCH_ASSOC);
    $updateCheck = false;
    if($playerItemData != false && $playerItemData['item_val'] >= $num){
      $sql = "UPDATE player_item SET item_val = item_val - ? WHERE player_index_id=? AND item_id=? AND item_val >= ?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($num,$playerIndexId,$playerItemData['item_id'],$num));
      $updateCheck = true;
    }
    //トランザクション正常終了 & 更新が行われた
    if($conn->commit() == true && $updateCheck == true){
      //redisにポイントを反映
      $playerPointRanking = getPlayerPointRankingData($conn,$redis,$playerIndexId,$pointRankingDurationId);
      $updateScore = $playerPointRanking['score'] + $num;
      //キー名
      $keyName = "point_ranking_duration_id_".$pointRankingDurationId;
      $redis->zAdd($keyName, $updateScore, $playerIndexId);
    }
  }
  catch(Exception $e){
    $conn->rollBack();
  }
}

//景品リストを取得
function getPointRankingReward($conn,$rankingRewardId){
  $result = array();
  $sql = "SELECT * FROM ranking_reward WHERE ranking_reward_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($rankingRewardId));
  $rankingRewardDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($rankingRewardDatas as $rrData) {
    //挿入データを初期化
    $addData = array();
    $addData['ranking_reward'] = $rrData;
    $addData['list'] = getDropItemList($conn,$rrData['drop_master_id']);
    //ドロップアイテムデータ取得
    array_push($result,$addData);
  }
  return $result;
}

//景品を獲得可能な状態であるかチェック
function checkGetPointRankingReward($conn,$playerIndexId,$pointRankingDurationId,$durationStep,$myRank,$rewardDatas){
  $result = array();
  $result['flag'] = false;
  $result['error'] = 0;
  $result['error_comment'] = ""; //不可能だった場合の原因
  $myRank = $myRank + 1;
  if($durationStep == 2){ //報酬受け取り期間
    $rewardFound = false;
    foreach ($rewardDatas as $rewardData) {
      if($rewardData["ranking_reward"]['rank_st'] == $myRank || $rewardData["ranking_reward"]['rank_ed'] == $myRank){ $rewardFound = true; break; }
    }
    if($rewardFound == true){ //入賞(報酬が存在するか?)チェック
      $sql = "SELECT COUNT(*) FROM player_event_duration_reward WHERE player_index_id=? AND event_duration_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$pointRankingDurationId));
      $count = $stmt->fetchColumn();
      if($count == 0) $result['flag'] = true;
      else{
        $result['error'] = 1;
        $result['error_comment'] = "既に報酬を受け取っています";
      }
    }
    else{
      $result['error'] = 2;
      $result['error_comment'] = "入賞していません。景品リストをご確認ください";
    }
  }
  else{
    $result['error'] = 3;
    $result['error_comment'] = "報酬受け取り期間外です";
  }
  return $result;
}

//報酬の獲得を実行
function getPlayerPointRankingReward($conn,$redis,$playerIndexId,$playerInfo,$pointRankingDurationId){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['drop_list'] = array();
  $pointRankingDurationData = getPointRankingDurationData($conn,$pointRankingDurationId);
  if($pointRankingDurationData != false){
    $pointRankingMasterData = getPointRankingMasterData($conn,$pointRankingDurationData['point_ranking_id']);
    if($pointRankingMasterData != false){
      $durationStep = getPointRankingDurationStep($pointRankingDurationData);
      if($durationStep == 2){ //報酬受け取り期間中かチェック
        $getPlayerPointRankingData = getPlayerPointRankingData($conn,$redis,$playerIndexId,$pointRankingDurationId);
        if($getPlayerPointRankingData['score'] != -1 && $getPlayerPointRankingData['rank'] != -1){
          $pointRankingRewadDatas = getPointRankingReward($conn,$pointRankingMasterData['ranking_reward_id']);
          $activeRewardDatas = array();
          $myRank = $getPlayerPointRankingData['rank'] + 1;
          foreach ($pointRankingRewadDatas as $rewardData) {
            if($rewardData['ranking_reward']['rank_st'] <= $myRank && $myRank <= $rewardData['ranking_reward']['rank_ed']){
              array_push($activeRewardDatas,$rewardData['ranking_reward']);
            }
          }
          //チェック完了。報酬獲得処理を開始
          try{
            $conn->beginTransaction(); //トランザクション開始
            $sql = "SELECT COUNT(*) FROM player_event_duration_reward WHERE player_index_id=? AND event_duration_id=? FOR UPDATE";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($playerIndexId,$pointRankingDurationId));
            $count = $stmt->fetchColumn();
            if($count == 0){
              $stmt = $conn -> prepare("INSERT INTO player_event_duration_reward (player_index_id, event_duration_id)
              VALUES (:player_index_id, :event_duration_id)");
              $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
              $stmt->bindParam(':event_duration_id', $pointRankingDurationId, PDO::PARAM_INT);
              $stmt->execute();
              foreach ($activeRewardDatas as $activeRewardData) {
                getDropItems($conn,$activeRewardData['drop_master_id'],$playerInfo,100,$result['drop_list']);
              }
            }
            else{
              throw new Exception("既に報酬を受け取っています");
            }
            $conn->commit(); //トランザクション終了
          }
          catch(Exception $e){
            $conn->rollBack();
            $result['error'] = 6;
            $result['error_comment'] = $e->getMessage();
          }
          if(count($activeRewardDatas) == 0) {$result['error'] = 5; $result['error_comment'] = "報酬データの取得に失敗しました";}
        } else {$result['error'] = 4; $result['error_comment'] = "プレイヤーランキングの取得に失敗しました";}
      } else {$result['error'] = 3; $result['error_comment'] = "報酬受け取り期間外です";}
    } else {$result['error'] = 2; $result['error_comment'] = "ランキングマスターデータの取得に失敗しました";}
  } else {$result['error'] = 1; $result['error_comment'] = "ランキング期間データの取得に失敗しました";}
  return $result;
}
