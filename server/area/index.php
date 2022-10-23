<?php
require_once(dirname(__FILE__)."/../mount/index.php");
require_once(dirname(__FILE__)."/../map/index.php");
require_once(dirname(__FILE__)."/../battle/index.php");
//require_once(dirname(__FILE__)."/../story/index.php");
function getAreaMaster($conn,$id){ //ワールドエリアのマスターデータを取得する。
  $result = false;
  $sql = "SELECT * FROM area_master WHERE area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($id));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getAreaMasterDatas($conn){
  $sql = "SELECT * FROM area_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($worldId));
  $getAreaMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getAreaMasterDatas;
}

function getAreaInstance($conn,$areaId){ //エリアインスタンスを取得
  $result = false;
  $sql = "SELECT * FROM area_instance WHERE area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($areaId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function initPlayerAreaInstance($conn,$playerIndexId){ //生成されていないプレイヤーインスタンスをマスターデータ参照して生成
  $areaMasterDatas = getAreaMasterDatas($conn);
  foreach ($areaMasterDatas as $areaMasterData) {
    $sql = "SELECT COUNT(player_index_id) FROM player_area_instance WHERE player_index_id=? AND area_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$areaMasterData['area_id']));
    $count = $stmt->fetchColumn();
    if($count == 0){ //存在しなければ生成
      $stmt = $conn -> prepare("INSERT INTO player_area_instance (player_index_id, area_id)
      VALUES (:player_index_id, :area_id)");
      $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':area_id', $areaMasterData['area_id'], PDO::PARAM_INT);
      $stmt->execute();
    }
  }
}

function getPlayerAreaInstance($conn,$playerIndexId,$checkSubArea = true){ //プレイヤーが現在居るワールドエリアを取得
  $result = false;
  $visible = 1; //「居る」を選択
  $moveVisible = 2; //「移動中」を選択
  $sql = "SELECT * FROM player_area_instance LEFT JOIN area_master
   ON player_area_instance.area_id = area_master.area_id LEFT JOIN world_master
   ON area_master.world_id = world_master.world_id WHERE player_area_instance.player_index_id=? AND player_area_instance.visible=? OR player_area_instance.visible=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$visible,$moveVisible));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if($result != false){
    $checkMapType = getMapMasterData($conn,$result['map_id']);
  }
  if($checkSubArea == true && $checkMapType != false && $result != false && $result['visible'] == 2 && $result['sub_area_id'] != 0 && $checkMapType['map_type'] != 0){ //エリア移動中で、ワールドエリアでサブエリアが確定していた場合
    $sql = "SELECT * FROM player_area_instance LEFT JOIN area_master
     ON player_area_instance.sub_area_id = area_master.area_id LEFT JOIN world_master
     ON area_master.world_id = world_master.world_id WHERE player_area_instance.player_index_id=? AND player_area_instance.visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$moveVisible));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}
//プレイヤーのワールドエリアインスタンス全てを取得
function getPlayerAreaInstanceAll($conn,$playerIndexId){
  $sql = "SELECT * FROM player_area_instance WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getGuildAreaInstance($conn,$playerIndexId,$env){ //ギルドメンバー共有エリア情報の取得
  $define = new AppDefine($env);
  $guildAreaMaster = getAreaMaster($conn,$define->GUILD_AREA_ID);
  return $guildAreaMaster;
}

//プレイヤーが解放したエリアかチェック
function checkPlayerOpenArea($conn,$playerIndexId,$areaId){ //false以外は解放していることにする
  $sql = "SELECT * FROM player_area_instance WHERE player_index_id=? AND area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$areaId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//ストーリーエリアを取得
function getPlayerStoryAreaInstance($conn,$playerIndexId,$mapId,$storyId){
  $result = false;
  //解放されているストーリーかチェック
  $checkOpenStory = checkPlayerOpenStory($conn,$playerIndexId,$storyId);
  if($checkOpenStory == true){
    //プレイヤーの現在のストーリー進行状態を取得
    $playerEventCount = getPlayerEventCount($conn,$playerIndexId,$storyId);
    if($playerEventCount != false){
      //プレイヤーのストーリー進行状況からイベントマスターデータを取得
      $selectMainStoryEventMaster = selectMainStoryEventMaster($conn,$playerEventCount['story_master_id'],$playerEventCount['event_count']);
      if($selectMainStoryEventMaster != false){
        //マップタイプのイベントカテゴリーでmap_idが正しいか
        if($selectMainStoryEventMaster['event_category_id'] == 2 && $selectMainStoryEventMaster['event_target_id'] == $mapId){
          $result = array();
          $result['map_id'] = $mapId;
          $result['story_id'] = $storyId;
        }
      }
    }
  }
  return $result;
}

function areaMoveStart($conn,$playerIndexId,$moveAreaId,$mountId=0){
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";

  $areaMasterData = getAreaMaster($conn,$moveAreaId);
  if($areaMasterData != false){ //エリアチェック
    //解放済みのエリアかチェック
    $movePlayerAreaInstance = checkPlayerOpenArea($conn,$playerIndexId,$moveAreaId); //移動先
    $playerAreaInstance = getPlayerAreaInstance($conn,$playerIndexId); //現在地
    if($movePlayerAreaInstance != false && $playerAreaInstance != false){
      if($movePlayerAreaInstance['area_id'] != $playerAreaInstance['area_id']){ //違うエリア
        $moveAreaMaster = getAreaMaster($conn,$movePlayerAreaInstance['area_id']);
        $myAreaMaster = getAreaMaster($conn,$playerAreaInstance['area_id']);
        if($moveAreaMaster != false && $myAreaMaster != false){
          //移動量の取得
          if($moveAreaMaster['world_id'] == $myAreaMaster['world_id']){ //同一ワールド内
            $movementVal = getAreaMoveMentValue($myAreaMaster['planet_pos_x'],$myAreaMaster['planet_pos_y'],$moveAreaMaster['planet_pos_x'],$moveAreaMaster['planet_pos_y']);
          }
          else{ //外部ワールド
            $movementVal = $myAreaMaster['world_id'] - $moveAreaMaster['world_id'];
            if($movementVal < 0) $movementVal = $movementVal * -1;
            $movementVal = $movementVal + 100;
          }

          if($mountId != 0){ //マウントが設定されていた場合
            $playerMountData = getPlayerMountDatas($playerIndexId,$mountId);
            if($playerMountData != false){
              $movementVal = $movementVal - $playerMountData['speed'];
              if($movementVal < 0) $movementVal = 0;
            }
          }
          //移動量取得後の処理
          updatePlayerAreaInstanceAreaMove($conn,$playerIndexId,$moveAreaMaster['area_id'],$movementVal); //移動処理を開始
        }
        else{
          $result['error'] = 4;
          $result['error_comment'] = "エリアデータの取得に失敗しました。";
        }
      }
      else{
        $result['error'] = 3;
        $result['error_comment'] = "既に移動済みのエリアです。";
      }
    }
    else{
      $result['error'] = 2;
      $result['error_comment'] = "エリアデータの取得に失敗しました。";
    }
  }
  else{
    $result['error'] = 1;
    $result['error_comment'] = "エリアデータの取得に失敗しました。";
  }

  return $result;
}

function getAreaMoveMentValue($myAreaPlanetPosX,$myAreaPlanetPosY,$moveAreaPlanetPosX,$moveAreaPlanetPosY){ //移動量を取得
  $diffX = $myAreaPlanetPosX - $moveAreaPlanetPosX;
  $diffY = $myAreaPlanetPosY - $moveAreaPlanetPosY;
  if($diffX < 0) $diffX = $diffX * -1;
  if($diffY < 0) $diffY = $diffY * -1;
  $pointX = round($diffX / 10);
  $pointY = round($diffY / 10);
  return ($pointX + $pointY);
}

function updatePlayerAreaInstanceAreaMove($conn,$playerIndexId,$moveAreaId,$movePoint){ //エリア移動のため、プレイヤーのエリアインスタンスを更新
  if($movePoint != 0){ //移動時間がある場合
    $dt = new DateTime();
    $dt2 = $dt->modify('+'.$movePoint.' minute');
    $arrivalTime = $dt2->format('Y/m/d H:i:s');

    //既に移動状態の内容があればリセット
    $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(0,$playerIndexId,2));

    $sql = "UPDATE player_area_instance SET visible=?, arrival_time=?, destination_area_id=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(2,$arrivalTime,$moveAreaId,$playerIndexId,1));

    $sql = "UPDATE player_area_instance SET visible=?, arrival_time=?, destination_area_id=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(0,$arrivalTime,$moveAreaId,$playerIndexId,1));
  }
  else{ //すぐに移動出来る場合
    $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(0,$playerIndexId,1));

    $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(0,$playerIndexId,2));

    $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND area_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(1,$playerIndexId,$moveAreaId));
  }
}

function updateAreaMoveCancel($conn,$playerIndexId){ //エリアの移動をキャンセルする
  $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND visible=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(1,$playerIndexId,2));
}

function updateAreaMoveComplete($conn,$playerIndexId,$moveCompleteAreaId){ //エリアの移動完了を行う 返し値:
  $result = array();
  $result['befor_area_id'] = -1;
  $result['after_area_id'] = -1;
  $sql = "SELECT * FROM player_area_instance WHERE player_index_id=? AND area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$moveCompleteAreaId));
  $selectPlayerAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  if($selectPlayerAreaInstance != false && $selectPlayerAreaInstance['visible'] == 2){
    //移動中のエリアをリセット
    $sql = "UPDATE player_area_instance SET visible=?, sub_area_id=? WHERE player_index_id=? AND visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(0,0,$playerIndexId,2));
    $result['befor_area_id'] = $selectPlayerAreaInstance['area_id'];
    //移動後のエリアをセット
    $sql = "UPDATE player_area_instance SET visible=? WHERE player_index_id=? AND area_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array(1,$playerIndexId,$selectPlayerAreaInstance['destination_area_id']));
    $result['after_area_id'] = $selectPlayerAreaInstance['destination_area_id'];
  }
  return $result;
}

function checkAreaMoveTime($conn,$playerIndexId){ //エリア移動中の場合、移動完了時間かチェックし、移動完了時間であれば移動処理を行う
  $reuslt = array();
  $reuslt['area_move_flag'] = false;
  $result['befor_area_id'] = -1;
  $result['after_area_id'] = -1;
  $playerAreaInstance = getPlayerAreaInstance($conn,$playerIndexId,false); //親エリア検証のため、サブエリアチェックなし
  if($playerAreaInstance != false && $playerAreaInstance['visible'] == 2){ //移動中の状態の場合
    $nowDateTime = date("Y/m/d H:i:s");
    $arrivalDateTime = strtotime($playerAreaInstance['arrival_time']);
    $finishDataTime = date('Y/m/d H:i:s',$arrivalDateTime);
    if($finishDataTime <= $nowDateTime){ //到着時間か到着時間を超えていた場合
      $reuslt['area_move_flag'] = true;
      //移動完了処理を実行
      $updateAreaMoveComp = updateAreaMoveComplete($conn,$playerIndexId,$playerAreaInstance['area_id']);
      if(isset($updateAreaMoveComp['befor_area_id'])) $result['befor_area_id'] = $updateAreaMoveComp['befor_area_id'];
      if(isset($updateAreaMoveComp['after_area_id'])) $result['after_area_id'] = $updateAreaMoveComp['after_area_id'];
    }
  }
  return $reuslt;
}

function getSubAreaMasterData($conn,$playerIndexId,$worldId,$areaId){ //サブエリアマスターデータを取得
  $result = false;
  $selectAreaMasterDatas = array();
  $sql = "SELECT * FROM area_master WHERE parent_world_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($worldId));
  $getAreaMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($getAreaMasterDatas as $areaMasterData) {
    if($areaMasterData['parent_area_id'] != "")
    {
      $areaIds = explode(",", $areaMasterData['parent_area_id']);
      for ($i=0; $i < count($areaIds); $i++) {
        if($areaIds[$i] == $areaId){ //該当するエリアだった場合、マスターデータを挿入
          array_push($selectAreaMasterDatas,$areaMasterData);
          break;
        }
      }
    }
    else{
      array_push($selectAreaMasterDatas,$areaMasterData);
    }
  }

  if($selectAreaMasterDatas != false && count($selectAreaMasterDatas) != 0){
    $nowPriority = 0;
    foreach ($selectAreaMasterDatas as &$areaMasterData) {
      $areaMasterData['start_condition'] = $nowPriority;
      $areaMasterData['end_condition'] = $nowPriority + $areaMasterData['area_priority'];
      $nowPriority = ($areaMasterData['end_condition'] + 1);
    }
    unset($areaMasterData);
    $maxCondition = $selectAreaMasterDatas[count($selectAreaMasterDatas) - 1]['end_condition'];
    $rotCondition = rand(0,$maxCondition);
    foreach ($selectAreaMasterDatas as $areaMasterData) {
      if($areaMasterData['start_condition'] <= $rotCondition && $rotCondition <= $areaMasterData['end_condition']){
        $result = $areaMasterData; //サブエリアを決定
        updatePlayerSubAreaInstance($conn,$playerIndexId,$areaMasterData['area_id']); //プレイヤーのサブエリア情報を更新
        break;
      }
    }
  }

  return $result;
}

function updatePlayerSubAreaInstance($conn,$playerIndexId,$subAreaId){ //サブエリアの移動情報を更新

  $sql = "SELECT * FROM area_instance WHERE area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($subAreaId));
  $getAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);

  $sql = "SELECT * FROM player_area_instance WHERE player_index_id=? AND visible=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,2));
  $getPlayerAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);

  if($getAreaInstance != false && $getPlayerAreaInstance != false){
    //クリア時刻が違った場合
    if($getPlayerAreaInstance['sub_area_id'] != 0 && $getAreaInstance['area_id'] != $getPlayerAreaInstance['sub_area_id']){ //新しいサブエリアが選択された場合
      $sql = "SELECT * FROM area_instance WHERE area_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($getPlayerAreaInstance['sub_area_id']));
      $getSubAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);
      //クリア時間が違った場合
      if($getSubAreaInstance != false && $getSubAreaInstance['last_clear_time'] != $getPlayerAreaInstance['last_clear_time']){
        $sql = "UPDATE player_area_instance SET sub_area_id=?,last_clear_time=? WHERE player_index_id=? AND visible=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($subAreaId,$getAreaInstance['last_clear_time'],$playerIndexId,2));
      }
    }
    else if($getPlayerAreaInstance['sub_area_id'] != 0 && $getAreaInstance['area_id'] == $getPlayerAreaInstance['sub_area_id']){
      if($getAreaInstance['last_clear_time'] != $getPlayerAreaInstance['last_clear_time']){
        $sql = "UPDATE player_area_instance SET sub_area_id=?,last_clear_time=? WHERE player_index_id=? AND visible=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($subAreaId,$getAreaInstance['last_clear_time'],$playerIndexId,2));
      }
    }
    else if($getPlayerAreaInstance['sub_area_id'] == 0){
      $sql = "UPDATE player_area_instance SET sub_area_id=?,last_clear_time=? WHERE player_index_id=? AND visible=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($subAreaId,$getAreaInstance['last_clear_time'],$playerIndexId,2));
    }
  }
}

function getStgPlayingPlayerAreaInstance($conn,$playerIndexId){ //STGプレイ中のプレイヤーエリアインスタンスを更新する。
  $sql = "SELECT * FROM player_area_instance WHERE player_index_id=? AND shooting_game_condition=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,1));
  $getPlayerAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getPlayerAreaInstance;
}

function updateClearStgPlayerAreaInstance($conn,$playerInfo,$areaMasterData,$rank,$arraivalTime,$mountId){ //STGクリア時に更新するデータを更新
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "エラーが発生しました。";
  $updateSecond = 0; //早まる到着時間

  $mountData = getMountMasterData($conn,$mountId);
  if($mountData != false){
    $updateSecond = ($mountData['skip_time'] * 60);
  }
  else{
    $result['error'] = 3;
    $result['error_comment'] = "マウントデータの取得に失敗しました。";
    return $result;
  }

  //エリアマスターデータとマウントデータからSTGIDを取得
  $resultStgId = -1;
  $stgIds = explode(",", $areaMasterData['stg_ids']);
  if(is_array($stgIds) && 3 == count($stgIds)){
    switch (intval($mountData['mount_type'])) {
      case 1:
      $resultStgId = $stgIds[0];
      break;
      case 2:
      $resultStgId = $stgIds[1];
      break;
      case 3:
      $resultStgId = $stgIds[2];
      break;
      default:
      break;
    }
  }
  else{
    $result['error'] = 4;
    $result['error_comment'] = "ステージタイプの取得に失敗しました。";
    return $result;
  }

  $dropMasterId = -1; //ドロップマスターID
  $stgMatserData = getStgMasterData($conn,$resultStgId);
  if($stgMatserData != false){
    $dropMasterId = $stgMatserData['drop_master_id'];
  }
  else{
    $result['error'] = 5;
    $result['error_comment'] = "ステージデータの取得に失敗しました。";
    return $result;
  }

  switch ($rank) {
    case 1:
    //$updateSecond = intval($updateSecond * 1.1);
    break;
    case 2:
    //$updateSecond = intval($updateSecond * 1.1);
    break;
    case 3:
    $updateSecond = intval($updateSecond * 1.1);
    break;
    case 4:
    $updateSecond = intval($updateSecond * 1.3);
    break;
    case 5:
    $updateSecond = intval($updateSecond * 1.5);
    break;
    default:
    $updateSecond = 0;
    break;
  }
  $condition = 0;

  $updateArraivalTime = strtotime($arraivalTime);
  $updateArraivalTime = $updateArraivalTime - $updateSecond;
  if($updateArraivalTime <= 0){
    $result['error'] = 2;
    $result['error_comment'] = "プレイヤーエリアデータの取得に失敗しました。";
    return $result;
  }
  $updateArraivalTime = date("Y/m/d H:i:s",$updateArraivalTime);
  $visible = 1; //居るエリアだった場合、更新不要
  $visible2 = 0; //居ないエリアだった場合、更新不要
  $sql = "UPDATE player_area_instance SET shooting_game_condition=?,arrival_time=? WHERE player_index_id=? AND area_id=? AND visible != ? AND visible != ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($condition,$updateArraivalTime,$playerInfo['player_index_id'],$areaMasterData['area_id'],$visible,$visible2));

  //ドロップ品設定
  $dropItemDatas = array();
  getDropItems($conn,$dropMasterId,$playerInfo,100,$dropItemDatas);
  if(count($dropItemDatas) != 0){
    $result['drop_datas'] = $dropItemDatas; //ドロップアイテム情報を追加
  }

  $result['error'] = 0;
  $result['error_comment'] = "";

  return $result;

}
