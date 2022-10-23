<?php
require_once(dirname(__FILE__)."/../equipItem/index.php");

$PLAYER_MASTER = false;
$PLAYER_INFO = false;
$PLAYER_STATUS = false;
$PLAYER_BASE_STATUS_ROW = false;

$STATUS_ID_HP = 1;
$STATUS_ID_ATK = 2;
$STATUS_ID_DEF = 3;
$STATUS_ID_MAGIC_ATK = 4;
$STATUS_ID_MAGIC_DEF = 5;
$STATUS_ID_AGI = 6;
$STATUS_ID_MND = 7;
$STATUS_ID_VITALITY = 8;
$STATUS_ID_STAMINA = 9;
$STATUS_ID_LUCK = 10;

$STATUS_IDS = array('HP' => 1, 'ATK' => 2, 'DEF' => 3, 'M_ATK' => 4, 'M_DEF' => 5, 'AGI' => 6, 'MND' => 7, 'VIT' => 8, 'STM' =>9, 'LUCK' => 10);


//プレイヤーデータを取得
function getPlayerInfoForIndexId($conn,$playerIndexId,$sessionCheck,$transaction = false){
  $result = false;
  if($sessionCheck == true){
    $sql = "SELECT * FROM player_info WHERE player_index_id=?";
    if($transaction == true) $sql = "SELECT * FROM player_info WHERE player_index_id=? FOR UPDATE";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}

//配列からプレイヤーデータを取得
function getPlayerInfoForArray($conn,$playerIndexIds){
  $result = array();
  if(!is_array($playerIndexIds)) return $result;
  //$ids = implode(",",$playerIndexIds);
  $sql = sprintf('SELECT * FROM player_info WHERE player_index_id IN (%s)', implode(', ', array_fill(0, count($playerIndexIds), '?')));
  $stmt = $conn->prepare($sql);
  $stmt->execute($playerIndexIds);
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getPlayerBaseStatusRow($conn,$playerIndexId,$sessionCheck){
  $result = false;
  if($sessionCheck == true){
    $getPlayerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,$sessionCheck);
    if($getPlayerInfo != false){
      $sql = "SELECT * FROM base_status_master WHERE player_level=? AND player_class_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($getPlayerInfo['player_level'],$getPlayerInfo['player_class_id']));
      $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
    }
  }
  return $result;
}

function getPlayerStatusUpPoint($conn,$playerInfo,$statusId){
  $result = 0;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_status_up WHERE player_index_id=? AND player_class_id=? AND status_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$playerInfo['player_class_id'],$statusId));
    $playerStatusUpRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($playerStatusUpRow as $statusPoint) {
      $result = ($result + $statusPoint['status_point']);
    }
  }
  return $result;
}

function getPlayerStatus($conn,$playerIndexId,$sessionCheck,$option = 0){ //$option : ステータスの取得形式の変更 0デフォルト 1:ステータスパラメーターシンプル化
  $resultStatusArray = array();
  if($sessionCheck == true){
    $getPlayerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,$sessionCheck);
    if($getPlayerInfo != false){
      $sql = "SELECT * FROM status_ids";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $statusIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($statusIds as $statusId) {
        $mergeStatusPoint = 0;
        $sql = "SELECT * FROM base_status_master WHERE status_id=? AND player_level=? AND player_class_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($statusId['id'],$getPlayerInfo['player_level'],$getPlayerInfo['player_class_id']));
        $baseStatus = $stmt->fetch(PDO::FETCH_ASSOC);
        //$equipItemBase = getPlayerEquipItemBaseStatus($conn,$playerIndexId,$statusId['id']);
        $statusPoint = getPlayerStatusUpPoint($conn,$getPlayerInfo,$statusId['id']);
        if($baseStatus != false){
          if($option == 0){
            $mergeStatusPoint = ($statusPoint + $baseStatus['status_point']);
            $mergeArray = array('status_id' => $statusId['id'], $statusId['status_param_name'] => $mergeStatusPoint, 'status_point' => $mergeStatusPoint, 'status_name' => $statusId['status_param_name']);
            array_push($resultStatusArray,$mergeArray);
          }
          else if($option == 1){ //ステータスパラメーターシンプル化
            $mergeStatusPoint = ($statusPoint + $baseStatus['status_point']);
            $resultStatusArray[$statusId['status_param_name']] = $mergeStatusPoint;
          }
        }
      }
    }
  }
  return $resultStatusArray;
}

function getPlayerAttribute($conn,$playerIndexId,$attributeCategoryId = -1){ //プレイヤーの属性ボーナスを取得
  $playerAttribute = false;
  if($attributeCategoryId == -1){
    $playerAttribute = false;
    $sql = "SELECT * FROM player_attribute WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $playerAttribute = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  else{
    $columnName = "attribute_".$attributeCategoryId;
    $sql = "SELECT {$columnName} FROM player_attribute WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $playerAttribute = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $playerAttribute;
}

function replaceStatus($conn,$statusData){
  $resultStatus = array();
  foreach ($statusData as $status) {
    $resultStatus = ($resultStatus + $status);
  }
  unset($resultStatus['status_id']);
  return $resultStatus;
}

function updatePlayerAttribute($conn,$playerIndexId,$updateBonus,$attributeId){ //プレイヤーの属性ボーナスを更新
  $columnName = "attribute_".$attributeId;
  $sql = "UPDATE player_attribute SET {$columnName}=? WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($updateBonus,$playerIndexId));
}

function replacePlayerStatus($playerStatus){ //ユーザーのステータスを整形
  $resultStatus = array();
  foreach ($playerStatus as $plStatus) {
    if(is_array($plStatus)){
      foreach ($plStatus as $key => $value) {
        if($key != "status_id"){
          $resultStatus[$key] = $value;
        }
      }
    }
  }
  return $resultStatus;
}

function getPlayerName($conn,$playerIndexId){ //プレイヤー名を取得
  $result = "";
  $sql = "SELECT player_name FROM player_info WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $playerData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $playerData['player_name'];
}

function getPlayerBattleStatus($conn,$playerIndexId,$sessionCheck){
  $resultStatusArray = array();
  if($sessionCheck == true){
    $getPlayerInfo = getPlayerInfoForIndexId($conn,$playerIndexId,$sessionCheck);
    if($getPlayerInfo != false){
      $sql = "SELECT * FROM status_ids";
      $stmt = $conn->prepare($sql);
      $stmt->execute();
      $statusIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
      foreach ($statusIds as $statusId) {
        $mergeStatusPoint = 0;
        $sql = "SELECT * FROM base_status_master WHERE status_id=? AND player_level=? AND player_class_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($statusId['id'],$getPlayerInfo['player_level'],$getPlayerInfo['player_class_id']));
        $baseStatus = $stmt->fetch(PDO::FETCH_ASSOC);
        $equipItemBase = getPlayerEquipItemBaseStatus($conn,$playerIndexId,$statusId['id']);
        $statusPoint = getPlayerStatusUpPoint($conn,$getPlayerInfo,$statusId['id']);
        if($baseStatus != false){
          $mergeStatusPoint = (($statusPoint + $equipItemBase) + $baseStatus['status_point']);
          $mergeArray = array('status_id' => $statusId['id'],$statusId['status_param_name'] => $mergeStatusPoint);
          array_push($resultStatusArray,$mergeArray);
        }
      }
    }
  }
  return $resultStatusArray;
}

function getStatusDataForStatusId($conn,$statusId){
  $sql = "SELECT * FROM status_ids WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($statusId));
  $resultStatusData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultStatusData;
}

function getClassData($conn,$classId){
  $sql = "SELECT * FROM class_ids WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($classId));
  $resultClassData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultClassData;
}

function getPlayerOpenFlag($conn,$playerIndexId,$openFlagId = -1){ //プレイヤーが解放したフラグを取得
  $result = false;
  if($openFlagId != -1){ //フラグIDが指定されていた場合
    $sql = "SELECT * FROM player_open_flag WHERE player_index_id=? AND open_flag_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$openFlagId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  else{
    $sql = "SELECT * FROM player_open_flag WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId));
    $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  }
  return $result;
}

function updatePlayerLastLogin($conn,$playerIndexId){ //プレイヤーの最終ログイン時間を更新する。
  $sql = "UPDATE player_info SET last_login_dttm=? WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(date('Y-m-d H:i:s'),$playerIndexId));
}

function updatePlayerGuildLastLogin($conn,$guildId){ //プレイヤーの最終ログイン時間を更新する。
  $sql = "UPDATE player_guild SET last_login_dttm=? WHERE guild_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array(date('Y-m-d H:i:s'),$guildId));
}

function updatePlayerKarma($conn,$playerIndexId,$addKarma){ //プレイヤーのカルマを更新する
  $sql = "SELECT player_karma FROM player_info WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerKarma = $stmt->fetch(PDO::FETCH_ASSOC);
  if(isset($selectPlayerKarma['player_karma'])){
    $resultUpdateKarma = $selectPlayerKarma['player_karma'] + $addKarma;
    if($resultUpdateKarma < 0) $resultUpdateKarma = 0;
    if(20000 < $resultUpdateKarma) $resultUpdateKarma = 20000;
    $sql = "UPDATE player_info SET player_karma=? WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($resultUpdateKarma,$playerIndexId));
  }
}

function selectPlayerSearchData($conn,$playerIndexId){ //プレイヤーの検索状態を取得する
  $sql = "SELECT * FROM pvp_matching_list WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerSearch = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectPlayerSearch;
}

function selectPlayerSearchDatas($conn,$role,$limit){ //検索対象のプレイヤーリストを取得
  $columnName = "update_dttm";
  $direction = "ASC";
  $sql = "SELECT * FROM pvp_matching_list WHERE role=? ORDER BY $columnName $direction LIMIT ?";
  $stmt = $conn->prepare($sql);
  $stmt->bindParam( 1, $role, PDO::PARAM_INT);
  $stmt->bindParam( 2, $limit, PDO::PARAM_INT);
  $stmt->execute();
  $selectPlayerSearchs = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerSearchs;
}

function insertAndUpdatePlayerSearchData($conn,$playerIndexId,$role){ //プレイヤーの検索状態を更新、なければ挿入
  $now = date('Y-m-d H:i:s');
  $stmt = $conn -> prepare("INSERT INTO pvp_matching_list (player_index_id, role, update_dttm)
  VALUES (:player_index_id, :role, :update_dttm) ON DUPLICATE KEY UPDATE role = :role, update_dttm = :update_dttm");
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':role', $role, PDO::PARAM_INT);
  $stmt->bindParam(':update_dttm', $now, PDO::PARAM_STR);
  $stmt->execute();
}

function deletePlayerSearchData($conn,$playerIndexId){ //プレイヤーの検索状態を削除する。
  $deleteFlag = false;
  if(is_array($playerIndexId)){ //複数指定時
    if(count($playerIndexId) == 0) return false; //リストが空の場合は処理させない
    $selectIds = substr(str_repeat(',?', count($playerIndexId)), 1);
    $sql = "DELETE FROM pvp_matching_list WHERE player_index_id IN ({$selectIds})";
    $stmt = $conn->prepare($sql);
    $deleteFlag = $stmt->execute($playerIndexId);
  }
  else{
    $sql = "DELETE FROM pvp_matching_list WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $deleteFlag = $stmt->execute(array($playerIndexId));
  }
  return $deleteFlag;
}

function getPlayerSearchType($karma){ //カルマランクから検索タイプを取得 制限無しの場合 0を返す
  $karmaRank = getKarmaRank($karma);
  $result = 0;
  if(0 <= $karmaRank) $result = 1;
  return $result;
}

function getSessionCheckPlayerInfo($conn,$playerId,$sessionCheck){
  $result = false;
  if($sessionCheck == true){
    $sql = "SELECT * FROM player_info WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}

function getSessionCheckPlayerData($conn,$playerId,$sessionCheck){
  $result = false;
  if($sessionCheck == true){
    $sql = "SELECT * FROM player WHERE player_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerId));
    $result = $stmt->fetch(PDO::FETCH_ASSOC);
  }
  return $result;
}

if(isset($_SESSION['login']) && isset($_SESSION['player_id'])){
  $PLAYER_INFO = getSessionCheckPlayerInfo($pdo,$_SESSION['player_id'],$_SESSION['login']);
  $PLAYER_MASTER = getSessionCheckPlayerData($pdo,$_SESSION['player_id'],$_SESSION['login']);
  $PLAYER_BASE_STATUS_ROW = getPlayerBaseStatusRow($pdo,$_SESSION['player_id'],$_SESSION['login']);
  $PLAYER_STATUS = getPlayerStatus($pdo,$PLAYER_INFO['player_index_id'],$_SESSION['login']);
}































 ?>
