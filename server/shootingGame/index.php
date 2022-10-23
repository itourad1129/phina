<?php
include_once '../../module/area/index.php';
include_once '../../module/map/index.php';
include_once '../../module/mount/index.php';
include_once '../../module/party/index.php';
include_once '../../module/item/index.php';

function getStgMasterData($conn,$stgId){
  $sql = "SELECT * FROM stg_master WHERE stg_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($stgId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function startShootingGame($conn,$playerIndexId){ //シューティングゲーム開始前の必要な通信処理をここで実行
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "エラーが発生しました。";
  $result['result_player_area_instance'] = null;
  $result['result_player_mount_data'] = null;
  $mountCheck = false;
  $fuelCheck = false;
  $playerAreaInstance = getPlayerAreaInstance($conn,$playerIndexId,false); //現在居るエリアインスタンスを取得
  $playerMountData = getPlayerActiveMountData($conn,$playerIndexId); //プレイヤーが選択中のマウントデータを取得
  if($playerAreaInstance != false){
    if($playerMountData != false){
      //開始可能なマウント燃料かチェック
      if($playerMountData['use_fuel'] <= $playerMountData['fuel']){
        $fuelCheck = true;
      }
      else{ //燃料不足
        $result['error'] = 5;
        $result['error_comment'] = "燃料が不足しています。";
      }

      if($playerAreaInstance['visible'] == 2){ //移動中だった → 旅
        $destinationAreaData = getAreaMaster($conn,$playerAreaInstance['destination_area_id']); //行き先のエリアマスターデータを取得
        if($destinationAreaData != false){
          //ワールド移動で「宇宙」タイプのマウントではない場合
          if($destinationAreaData['world_id'] != $playerAreaInstance['world_id'] && $playerMountData['mount_type'] != 3){
            $result['error'] = 4;
            $result['error_comment'] = "ワールド移動中は「宇宙」タイプのマウントが必要です。";
          }
          else{
            $mountCheck = true;
          }
        }
        else{ //行き先のエリアデータが存在しなかった。
          $result['error'] = 3;
          $result['error_comment'] = "エリア情報の取得に失敗しました。";
        }
      }
      else if($playerAreaInstance['visible'] == 1){ //移動中ではない → 探索
        $mountCheck = true;
      }
    }
    else{ //マウントデータが存在しなかった。
      $result['error'] = 4;
      $result['error_comment'] = "プレイヤーマウント情報の取得に失敗しました。";
    }
  }
  else{ //現在居るエリアが存在しなかった。
    $result['error'] = 2;
    $result['error_comment'] = "プレイヤーエリア情報の取得に失敗しました。";
  }

  //開始可能な状態か
  if($mountCheck == true && $fuelCheck == true){
    $resultUsePlayerMountFuel = usePlayerMountFuel($conn,$playerIndexId,$playerMountData['mount_id'],$playerMountData['use_fuel']); //燃料を使用し、player_area_instanceの shooting_game_conditionを1に更新
    if($resultUsePlayerMountFuel == true){ //燃料の使用に成功
      $result['error'] = 0;
      $result['error_comment'] = "";
      $result['result_player_area_instance'] = $playerAreaInstance;
      $result['result_player_mount_data'] = $playerMountData;
    }
  }
  return $result;
}

function clearShootingGame($conn,$playerInfo,$clearRank){ //シューティングゲームクリア時に行う処理
  $result['error'] = 1;
  $result['error_comment'] = "エラーが発生しました。";
  $playerAreaInstance = getStgPlayingPlayerAreaInstance($conn,$playerInfo['player_index_id']);
  if($playerAreaInstance != false){
    $areaMasterData = getAreaMaster($conn,$playerAreaInstance['area_id']);
    if($areaMasterData != false){
      $result = updateClearStgPlayerAreaInstance($conn,$playerInfo,$areaMasterData,$clearRank,$playerAreaInstance['arrival_time'],$playerAreaInstance['shooting_game_select_mount_id']);
    }
    else{
      $result['error'] = 3;
      $result['error_comment'] = "エリア情報の取得に失敗しました。";
    }
  }
  else{
    $result['error'] = 2;
    $result['error_comment'] = "プレイヤーエリア情報の取得に失敗しました。";
  }
  return $result;
}

function getStgUiAnimAssetDatas($conn){ //STG:UI画像アニメーションのアセットデータを取得
  $result = false;
  $categoryId = 23;
  $sql = "SELECT * FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($categoryId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getStgPlayerSearchData($conn,$playerIndexId){ //プレイヤーの索敵情報を取得
  $sql = "SELECT * FROM player_stg_search WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function stgPlayerSearchStart($conn,$playerIndexId,$areaId,$playerMountData){ //プレイヤーの索敵を開始する。
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "通信エラーが発生しました。";
  //マウントの燃料チェック
  $useFuel = intval((int)$playerMountData['max_fuel'] / 10);
  if($useFuel <= (int)$playerMountData['fuel']){

    try{
      $conn->beginTransaction(); //トランザクション開始
      //使用する燃料を更新
      $sql = "UPDATE player_mount SET fuel = fuel - ? WHERE player_index_id=? AND mount_id=? AND ? <= fuel";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($useFuel,$playerIndexId,$playerMountData['mount_id'],$useFuel));
      $updateCount = $stmt->rowCount();
      if($updateCount != 0){
        //プレイヤー索敵情報を更新
        $stmt = $conn -> prepare("INSERT INTO player_stg_search (player_index_id, area_id, mount_id, mount_type)
        VALUES (:player_index_id, :area_id, :mount_id, :mount_type) ON DUPLICATE KEY UPDATE area_id = :area_id, mount_id = :mount_id, mount_type = :mount_type");
        $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':area_id', $areaId, PDO::PARAM_INT);
        $stmt->bindParam(':mount_id', $playerMountData['mount_id'], PDO::PARAM_INT);
        $stmt->bindParam(':mount_type', $playerMountData['mount_type'], PDO::PARAM_INT);
        $stmt->execute();
        $result['error'] = 0;
        $result['error_comment'] = "";
      }
      else{ //燃料更新が行われなかった。
        $result['error'] = 4;
        $result['error_comment'] = "プレイヤーデータの更新に失敗しました。";
      }
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      $result['error'] = 3;
      $result['error_comment'] = "データの更新に失敗しました。";
    }
  }
  else{ //燃料不足
    $result['error'] = 2;
    $result['error_comment'] = "燃料が不足しています。";
  }
  return $result;
}

function deleteStgPlayerSearch($conn,$playerIndexId){ //プレイヤーの索敵情報を削除
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "索敵のキャンセルに失敗しました";
  $sql = "DELETE FROM player_stg_search WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $deleteCount = $stmt->rowCount();
  if($deleteCount != 0){
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  return $result;
}

function checkStgPvp($conn,$areaId){ //シューティングゲームのPVPが発生するか、チェックを行う。エリアの敵勢力により確率が変動 true:PVP発生
  $result = false;
  $areaInstance = getAreaInstance($conn,$areaId);
  if($areaInstance != false){
    $mapMasterData = getMapMasterData($conn,$areaInstance['map_id']);
    if($mapMasterData != false){
      $rate = intval(($areaInstance['enemy_power'] / $mapMasterData['max_enemy_power']) * 100);
      $activeValue = 0;
      if(80 <= $rate){
        $activeValue = 50;
      }
      else if(70 <= $rate){
        $activeValue = 30;
      }
      else if(60 <= $rate){
        $activeValue = 25;
      }
      else if(50 <= $rate){
        $activeValue = 20;
      }
      else {
        $activeValue = 10;
      }
      $rot = rand(1,100);
      if($activeValue <= $rot) $result = true;
    }
  }
  $result = true;//デバック
  return $result;
}

function rotStgPlayerSearch($conn,$playerIndexId,$playerPartyIndexId,$areaId,$mountType){ //対戦相手の情報をチェックし、該当する相手が見つかれば、データを取得
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "通信エラーが発生しました";
  $result['result_player_stg_search'] = null;
  $result['result_player_name'] = "";

  $getPlayerPartyMember = getPartyMemberPlayerDatas($conn,$playerPartyIndexId);
  $partyMamberIds = array();
  foreach ($getPlayerPartyMember as $plData) {
    $partyMamberIds[count($partyMamberIds)] = $plData['player_index_id'];
  }
  $selectIds = substr(str_repeat(',?', count($partyMamberIds)), 1);
  $limit = 10;
  $columnName = "create_dttm";
  $direction = "ASC";
  $sql = "SELECT * FROM player_stg_search WHERE player_index_id NOT IN ({$selectIds}) AND area_id=? AND mount_type=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $bpIndex = 1;
  for ($i=0; $i < count($partyMamberIds); $i++) {
    $stmt->bindParam( $bpIndex, $partyMamberIds[$i], PDO::PARAM_INT);
    $bpIndex = $bpIndex + 1;
  }
  $stmt->bindParam( $bpIndex, $areaId, PDO::PARAM_INT);
  $bpIndex = $bpIndex + 1;
  $stmt->bindParam( $bpIndex, $mountType, PDO::PARAM_INT);
  $bpIndex = $bpIndex + 1;
  $stmt->bindParam( $bpIndex, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $playerSearchDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if(count($playerSearchDatas) != 0){ //対戦相手の該当件数が1件以上の場合
    $rot = rand(0,(count($playerSearchDatas) - 1)); //対戦相手を決定
    if(isset($playerSearchDatas[$rot])){
      $result['error'] = 0;
      $result['error_comment'] = "";
      $result['result_player_stg_search'] = $playerSearchDatas[$rot];
      $result['result_player_name'] = getPlayerName($conn,$playerSearchDatas[$rot]['player_index_id']);
    }
  }
  else{ //対戦相手が存在しなかった。
    $result['error'] = 0;
    $result['error_comment'] = "";
  }
  return $result;
}

function stgPvpEnemyPlayerWin($conn,$playerIndexId,$enemyPlayerIndexId){ //STG敵プレイヤー勝利後の処理 (燃料の付与)
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $result['enemy_player_name'] = "";

  $enemyPlayerName = getPlayerName($conn,$enemyPlayerIndexId);
  if($enemyPlayerName != "") $result['enemy_player_name'] = $enemyPlayerName;
  $playerSearchData = getStgPlayerSearchData($conn,$enemyPlayerIndexId);
  $playerAreaInstance = getPlayerAreaInstance($conn,$playerIndexId,false); //現在居るエリアインスタンスを取得
  if($playerSearchData != false && $playerAreaInstance != false && $playerAreaInstance['shooting_game_condition'] == 1 && $playerIndexId != $enemyPlayerIndexId){ //索敵情報とプレイヤーエリア情報が取得出来た
    //使用マウントデータを取得
    $mountData = getMountMasterData($conn,$playerAreaInstance['shooting_game_select_mount_id']);
    if($mountData != false){
      try{
        $conn->beginTransaction(); //トランザクション開始
        $updateStgGameCond = 0;
        $setStgGameCond = 1;
        $sql = "UPDATE player_area_instance SET shooting_game_condition = ? WHERE player_index_id=? AND shooting_game_condition=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($updateStgGameCond,$playerIndexId,$setStgGameCond));
        $updateCount = $stmt->rowCount();
        if($updateCount != 0){ //更新が行われた
          //敵プレイヤーに燃料を付与
          $itemId = $mountData['fuel_item_id'];
          $itemVal = $mountData['use_fuel'];
          $sql = "SELECT * FROM ( SELECT * FROM player_item WHERE player_item.player_index_id=? AND player_item.item_id=? FOR UPDATE )
          X LEFT JOIN item_master ON X.item_id = item_master.id";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($enemyPlayerIndexId,$itemId));
          $selectUpdatePlayerItem = $stmt->fetch(PDO::FETCH_ASSOC);
          $itemOver = false;
          $resultNum = (int)$selectUpdatePlayerItem['item_val'] + (int)$itemVal;
          if((int)$selectUpdatePlayerItem['item_max_val'] < $resultNum) $itemOver = true;
          if($itemOver == false) {
            $sql = "UPDATE player_item SET item_val = item_val + ? WHERE player_index_id=? AND item_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($itemVal,$enemyPlayerIndexId,$itemId));
          }
          else{ //最大所持容量を超えた場合
            $sql = "UPDATE player_item SET item_val=? WHERE player_index_id=? AND item_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($selectUpdatePlayerItem['item_max_val'],$enemyPlayerIndexId,$itemId));
          }
        }
        else{
          $result['error'] = 2;
          $result['error_comment'] = "プレイヤーデータの更新に失敗しました。";
        }
        $conn->commit(); //トランザクション終了
      }
      catch(Exception $e){
        $conn->rollBack();
        var_dump($e);
        $result['error'] = 1;
        $result['error_comment'] = "データの更新に失敗しました。";
      }
    }
    else{
      $result['error'] = 2;
      $result['error_comment'] = "マウントデータの更新に失敗しました。";
    }
  }
  return $result;
}
