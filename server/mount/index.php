<?php
include_once '../../module/item/index.php';
//マウント処理

function getMountMasterData($conn,$mountId){ //クライアント処理では基本的にはマスターデータを参照する事
  $sql = "SELECT * FROM mount_master WHERE mount_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mountId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getMountMasterDatas($conn){ //全てのマウントマスターデータを取得
  $sql = "SELECT * FROM mount_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerMountDatas($conn,$playerIndexId,$mountId = -1){ //プレイヤーが解放したマウントデータを取得 mountId:選択した場合、設定
  $result = array();
  if($mountId == -1){
    $sql = "SELECT * FROM player_mount LEFT JOIN mount_master ON player_mount.mount_id = mount_master.mount_id WHERE player_mount.player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  else{
    $sql = "SELECT * FROM player_mount LEFT JOIN mount_master
    ON player_mount.mount_id = mount_master.mount_id WHERE player_mount.player_index_id=? AND player_mount.mount_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$mountId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}

function getPlayerActiveMountData($conn,$playerIndexId){ //プレイヤーが選択中のマウントデータを取得
  $result = false;
  $visible = 1;
  $sql = "SELECT * FROM player_mount LEFT JOIN mount_master
  ON player_mount.mount_id = mount_master.mount_id WHERE player_mount.player_index_id=? AND player_mount.visible=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$visible));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function chargeMountFuel($conn,$playerIndexId,$mountId,$chargeNum){ //マウントの燃料をチャージする
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "燃料の補給に失敗しました。";
  $playerMountData = getPlayerMountDatas($conn,$playerIndexId,$mountId);
  $mountMasterData = getMountMasterData($conn,$mountId);
  if($playerMountData != false && $mountMasterData != false){ //存在し、所持しているマウント
    $getPlayerItemData = selectPlayerItemData($conn,$playerIndexId,$playerMountData['fuel_item_id']);
    if($getPlayerItemData != false){ //所持済みのアイテムか。
      if($playerMountData['fuel'] < $mountMasterData['max_fuel']){ //最大燃料以下。
        if($chargeNum <= $getPlayerItemData['item_val']){ //所持数以下のチャージ数
          $useNum = $chargeNum;
          $updateNum = $playerMountData['fuel'] + $chargeNum;
          if($mountMasterData['max_fuel'] < $updateNum){ //最大燃料以上をチャージしようとした場合
            $diff = $updateNum - $mountMasterData['max_fuel'];
            $useNum = $useNum - $diff;
          }
          if(0 < $useNum && $useNum <= $getPlayerItemData['item_val']){
            $updateResult = updatePlayerMountFuel($conn,$playerIndexId,$mountId,$useNum,$getPlayerItemData['item_id']);
            if($updateResult == true){
              $result['error'] = 0;
              $result['error_comment'] = "";
            }
            else{
              $result['error'] = 3;
              $result['error_comment'] = "データ更新処理に失敗しました。";
            }
          }
        }
      }
      else{
        $result['error'] = 2;
        $result['error_comment'] = "燃料は既に満タンです。";
      }
    }
  }
  return $result;
}

function updatePlayerMountFuel($conn,$playerIndexId,$mountId,$useFuel,$itemId){ //マウントの燃料を更新
  $result = true;
  try{
    $conn->beginTransaction(); //トランザクション開始
    //使用分を消費
    $sql = "UPDATE player_item SET item_val=item_val-? WHERE player_index_id=? AND item_id=? AND ? <= item_val";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($useFuel,$playerIndexId,$itemId,$useFuel));
    $updateCount = $stmt->rowCount();
    if($updateCount != 0){
      //更新対象のデータを取得
      $sql = "SELECT * FROM ( SELECT * FROM player_mount WHERE player_mount.player_index_id=? AND player_mount.mount_id=? FOR UPDATE )
      X LEFT JOIN mount_master ON X.mount_id = mount_master.mount_id";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$mountId));
      $selectUpdatePlayerMount = $stmt->fetch(PDO::FETCH_ASSOC);
      if(($selectUpdatePlayerMount['fuel'] + $useFuel) <= $selectUpdatePlayerMount['max_fuel']){ //最大値以内だった
        //使用分を加算
        $sql = "UPDATE player_mount SET fuel=fuel+? WHERE player_index_id=? AND mount_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($useFuel,$playerIndexId,$mountId));
      }
      else{ //最大を超えていた。
        $sql = "UPDATE player_mount SET fuel=? WHERE player_index_id=? AND mount_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($selectUpdatePlayerMount['max_fuel'],$playerIndexId,$mountId));
      }
    }
    else{
      $result = false;
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }
  return $result;
}

function playerMountPurchase($conn,$playerIndexId,$mountId){ //マウントの購入を行った
  $result = array();
  $result['error'] = 1;
  $result['error_comment'] = "マウントの購入に失敗しました。";
  $getPlayerMount = getPlayerMountDatas($conn,$playerIndexId,$mountId);
  $getMountMasterData = getMountMasterData($conn,$mountId);
  $getPlayerOpenFlag = false;
  if($getMountMasterData != false){
    $getPlayerOpenFlag = getPlayerOpenFlag($conn,$playerIndexId,$getMountMasterData['open_flag_id']);
  }
  if($getPlayerOpenFlag == false){
    $result['error'] = 3;
    $result['error_comment'] = "未解放のマウントです。";
  }
  if($getPlayerMount != false) {
    $result['error'] = 2;
    $result['error_comment'] = "既に解放済みのマウントです。";
  }

  if($getPlayerMount == false && $getMountMasterData != false && $getPlayerOpenFlag != false){ //未解放でマスターデータに存在している場合
    try{
      $default = 0;
      $conn->beginTransaction(); //トランザクション開始
      //使用分を消費

      $sql = "UPDATE player_item SET item_val=item_val-? WHERE player_index_id=? AND item_id=? AND ? <= item_val";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($getMountMasterData['price'],$playerIndexId,$getMountMasterData['price_item_id'],$getMountMasterData['price']));

      //プレイヤーマウントデータを挿入
      $stmt = $conn -> prepare("INSERT INTO player_mount (player_index_id, mount_id, visible, fuel)
      VALUES (:player_index_id, :mount_id, :visible, :fuel)");
      $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':mount_id', $mountId, PDO::PARAM_INT);
      $stmt->bindParam(':visible', $default, PDO::PARAM_INT);
      $stmt->bindParam(':fuel', $default, PDO::PARAM_INT);
      $stmt->execute();

      $result['error'] = 0;
      $result['error_comment'] = "";

      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
    }
  }
  else{
    $result['error'] = 4;
    $result['error_comment'] = "マウントデータの取得に失敗しました。";
  }
  return $result;
}

function playerMountSelect($conn,$playerIndexId,$mountId){ //マウントの選択を行った。
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  $visible = 1;
  $sql = "UPDATE player_mount SET visible=? WHERE player_index_id=? AND mount_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($visible,$playerIndexId,$mountId));
  $visible = 0;
  $sql = "UPDATE player_mount SET visible=? WHERE player_index_id=? AND mount_id!=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($visible,$playerIndexId,$mountId));
  return $result;
}

function usePlayerMountFuel($conn,$playerIndexId,$mountId,$useFuel){ //燃料の消費を行った。 返し値:更新成功したかどうか
  $result = false;
  try{
    $conn->beginTransaction(); //トランザクション開始

    $defaultCond = 0;
    $updateCond = 1;
    //ゲーム中のデータが残っていれば、リセット
    $sql = "UPDATE player_area_instance SET shooting_game_condition=? WHERE player_index_id=? AND shooting_game_condition=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($defaultCond,$playerIndexId,$updateCond));

    //ゲーム中の状態に更新
    $stayVisible = 1;
    $moveVisible = 2;
    $sql = "UPDATE player_area_instance SET shooting_game_condition=?, shooting_game_select_mount_id=? WHERE player_index_id=? AND visible=? OR visible=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updateCond,$mountId,$playerIndexId,$stayVisible,$moveVisible));
    $playerAreaInstanceUpdateCount = $stmt->rowCount();

    if($playerAreaInstanceUpdateCount != 0){ //データの更新件数が存在した場合
      $sql = "UPDATE player_mount SET fuel=fuel - ? WHERE player_index_id=? AND mount_id=? AND ? <= fuel";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($useFuel,$playerIndexId,$mountId,$useFuel));
      $playerMountUpdateCount = $stmt->rowCount();
      if($playerMountUpdateCount != 0) $result = true;
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
  }
  return $result;
}
