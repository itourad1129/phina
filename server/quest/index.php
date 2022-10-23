<?php
//require_once(dirname(__FILE__)."/../battle/index.php");
//クエストのマスターデータを取得
function getQuestMasterData($conn,$questId){
  $result = false;
  $sql = "SELECT * FROM quest_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($questId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーの進行中か完了済みのクエストデータとマスターデータ取得 0:進行中 1:完了で報告待ち
function getPlayerQuestDataAndMasterData($conn,$playerIndexId,$step){
  $result = array();
  $sql = "SELECT * FROM player_quest LEFT JOIN quest_master ON player_quest.quest_master_id = quest_master.id WHERE player_quest.player_index_id=? AND player_quest.step=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$step));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーの進行中か完了済みのクエストデータを取得 0:進行中 1:完了で報告待ち
function getPlayerQuestData($conn,$playerIndexId,$step){
  $result = array();
  $sql = "SELECT * FROM player_quest WHERE player_index_id=? AND step=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$step));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーの全てのクエストデータを取得
function getPlayerQuestDataAll($conn,$playerIndexId){
  $result = array();
  $sql = "SELECT * FROM player_quest WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//討伐クエストマスターデータを取得
function getSubDueQuestMasterDatas($conn,$questTargetId){
  $sql = "SELECT * FROM sub_due_quest_master WHERE sub_due_quest_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($questTargetId));
  $getSubDueQuestMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getSubDueQuestMasterDatas;
}

//プレイヤーの進行中の討伐クエストデータを取得
function getPlayerSubDueQuestDatas($conn,$playerIndexId,$subDueQuestId,$questMasterId){
  $sql = "SELECT * FROM player_sub_due_quest WHERE player_index_id=? AND sub_due_quest_id=? AND quest_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$subDueQuestId,$questMasterId));
  $getPlayerSubDueQuestDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getPlayerSubDueQuestDatas;
}

//プレイヤーの進行中の討伐クエストデータを1つ取得
function getPlayerSubDueQuestDataOne($conn,$playerIndexId,$subDueQuestId,$questMasterId,$enemyIndexId){
  $sql = "SELECT * FROM player_sub_due_quest WHERE player_index_id=? AND sub_due_quest_id=? AND quest_master_id=? AND enemy_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$subDueQuestId,$questMasterId,$enemyIndexId));
  $getPlayerSubDueQuestData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getPlayerSubDueQuestData;
}

//プレイヤーの討伐クエスト情報を更新 killdEnemyList string $enemy = "1,1,1,2,2,3";
function updatePlayerSubDueQuest($conn,$playerIndexId,$questMasterData,$killedEnemyList){
  $result = array();
  $result['quest_clear_flag'] = false;
  $result['drop_item_data'] = false;
  //倒したエネミーを配列に変換
  $killedEnemyListArray = explode(",",$killedEnemyList);

  //クエストマスターが存在し、タイプが討伐であるかチェック
  if($questMasterData != false && $questMasterData['quest_type'] == 0){
    $getSubDueQuestMasterDatas = getSubDueQuestMasterDatas($conn,$questMasterData['quest_target_id']);
    //倒した敵がクエストに加算される敵IDかチェック
    $checkEnemy = false;
    foreach ($getSubDueQuestMasterDatas as $subDueQuest) {
      for ($i=0; $i < count($killedEnemyListArray); $i++) {
        if($killedEnemyListArray[$i] == $subDueQuest['enemy_index_id']) {
          $checkEnemy = true;
          break 2;
        }
      }
    }
    if($checkEnemy == true){ //更新対象が存在した場合
      $questClearFlag = true;
      $sql = "SELECT * FROM player_sub_due_quest WHERE player_index_id=? AND sub_due_quest_id=? AND quest_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$questMasterData['quest_target_id'],$questMasterData['id']));
      $getPlayerSubDueQuestDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if(count($getPlayerSubDueQuestDatas) != 0){
        foreach ($getSubDueQuestMasterDatas as $subDueQuest) {
          foreach ($getPlayerSubDueQuestDatas as $playerSubDueQuest) {
            if($subDueQuest['enemy_index_id'] == $playerSubDueQuest['enemy_index_id']){ //比較する敵IDが一致の場合
              $killedEnemyCount = 0;
              for ($i=0; $i < count($killedEnemyListArray); $i++) {
                if($killedEnemyListArray[$i] == $subDueQuest['enemy_index_id']) $killedEnemyCount = $killedEnemyCount + 1;
              }
              $resultKilledCount = $killedEnemyCount + $playerSubDueQuest['enemy_count'];
              //条件をを達成
              if($subDueQuest['enemy_count'] <= $resultKilledCount) {
                $resultKilledCount = $subDueQuest['enemy_count'];
              }
              else {
                $questClearFlag = false;
              }
              $sql = "UPDATE player_sub_due_quest SET enemy_count=? WHERE player_index_id=? AND sub_due_quest_id=? AND quest_master_id=? AND enemy_index_id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($resultKilledCount,$playerIndexId,$subDueQuest['sub_due_quest_id'],$questMasterData['id'],$subDueQuest['enemy_index_id']));
            }
          }
        }
      }
      else{
        $questClearFlag = false;
      }
      $result['quest_clear_flag'] = $questClearFlag; //クエストクリア結果を決定
      if($questClearFlag == true){ //全ての条件を達成した
        questFinish($conn,$questMasterData,$playerIndexId); //クエスト完了処理
      }
    }
  }
  return $result;
}

//クエスト完了処理
function questFinish($conn,$questMasterData,$playerIndexId){
  if($questMasterData != false){
    switch ((int)$questMasterData['quest_type']) {
      case 0: //討伐クエスト
      {
        $subDueQuestDatas = getSubDueQuestMasterDatas($conn,$questMasterData['quest_target_id']);
        foreach ($subDueQuestDatas as $subDueQuest) {
          $sql = "DELETE FROM player_sub_due_quest WHERE sub_due_quest_id=? AND player_index_id=? AND enemy_index_id=? AND quest_master_id=?";
          $stmt = $conn->prepare($sql);
          $stmt->execute(array($subDueQuest['sub_due_quest_id'],$playerIndexId,$subDueQuest['enemy_index_id'],$questMasterData['id']));
        }
        $setStep = 1; //完了で報告待ちの状態にする
        $sql = "UPDATE player_quest SET step=? WHERE player_index_id=? AND quest_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($setStep,$playerIndexId,$questMasterData['id']));
      }
      break;
      default:
      {

      }
      break;
    }
  }
}

//クエストの報告を行う 返し値:ドロップ報酬情報
function questReport($conn,$playerInfo,$playerAreaInstanceDatas,$questMasterData){
  $result = array();
  $result['drop_item_data'] = false;
  $result['error'] = false;
  //報告可能なエリアに居るかチェック
  if($questMasterData != false){
    $areaCheck = false;
    foreach ($playerAreaInstanceDatas as $playerAreaInstance) {
      if($playerAreaInstance['area_id'] == $questMasterData['quest_area_id']){
        if($playerAreaInstance['visible'] == 1) $areaCheck = true;
      }
    }
    if($areaCheck == true){
      //完了で報告待ちの状態かチェックを行う
      $checkStep = 1;
      $sql = "SELECT * FROM player_quest WHERE player_index_id=? AND quest_master_id=? AND step=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerInfo['player_index_id'],$questMasterData['id'],$checkStep));
      $resultPlayerQuest = $stmt->fetch(PDO::FETCH_ASSOC);
      if($resultPlayerQuest != false){
        $resultDropData = array();
        getDropItems($conn,$questMasterData['drop_master_id'],$playerInfo,100,$resultDropData); //ドロップデータを取得
        $result['drop_item_data'] = $resultDropData; //ドロップアイテムデータを更新
        //報告したため、プレイヤーのクエストデータを削除
        $sql = "DELETE FROM player_quest WHERE player_index_id=? AND quest_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerInfo['player_index_id'],$resultPlayerQuest['quest_master_id']));
        //1回だけクリアのクエストの場合はplayer_quest_clearedに挿入
        insertPlayerQuestCleared($conn,$playerInfo['player_index_id'],$questMasterData);
        //ストーリークエストであり、解放するストーリークエストがあれば解放する
        if($questMasterData['open_quest_master_id'] != 0 && $questMasterData['quest_flag_id'] == 2){
          insertPlayerOpenStoryQuest($conn,$playerInfo['player_index_id'],$questMasterData['open_quest_master_id']);
        }
      }
      else{
        $result['error'] = true; //クエスト未クリアの状態だった。
      }
    }
    else{
        $result['error'] = true; //報告可能なエリアに居なかった。
    }
  }
  else{
    $result['error'] = true; //クエストマスターデータが見つからなかった
  }
  return $result;
}

//プレイヤーが受注及び報告可能なクエストマスター一覧を取得
function getPlayerActiveQuestMasterDatas($conn,$playerInfo,$playerAreaInstanceDatas){
  $resultQuestMasterDatas = array();
  $resultPlayerActiveAreaId = -1;
  $playerFinishQuestDatas = getPlayerQuestDataAndMasterData($conn,$playerInfo['player_index_id'],1); //報告待ちのクエストデータを取得
  foreach ($playerAreaInstanceDatas as $playerAreaInstance) {
    if($playerAreaInstance['visible'] == 1){
      $resultPlayerActiveAreaId = $playerAreaInstance['area_id'];
      break;
    }
  }
  if($resultPlayerActiveAreaId != -1){
    $default = 0; //条件無効エリアID
    $sql = "SELECT * FROM quest_master WHERE quest_area_id=? OR quest_area_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($resultPlayerActiveAreaId,$default));
    $getQuestMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($getQuestMasterDatas as $questMasterData) {
      $checkQuestFlag = checkQuestFlag($conn,$questMasterData,$playerInfo);
      if($checkQuestFlag == true){
        array_push($resultQuestMasterDatas,$questMasterData);
      }
      else{ //非アクティブの場合でも、報告待ちの場合はアクティブになる
        foreach ($playerFinishQuestDatas as $playerQuestData) {
          if($playerQuestData['quest_master_id'] == $questMasterData['id']){
            array_push($resultQuestMasterDatas,$questMasterData);
          }
        }
      }
    }
  }
  return $resultQuestMasterDatas;
}

//クエストを受注する
function playerQuestOrder($conn,$playerInfo,$playerAreaInstanceDatas,$questMasterData){
  $result = true;
  if($questMasterData != false){
    $resultPlayerActiveAreaId = -1;
    foreach ($playerAreaInstanceDatas as $playerAreaInstance) {
      if($playerAreaInstance['visible'] == 1){
        $resultPlayerActiveAreaId = $playerAreaInstance['area_id'];
        break;
      }
    }
    //受注可能なエリアか 及び　受注可能な条件か
    $checkQuestFlag = checkQuestFlag($conn,$questMasterData,$playerInfo);
    if($checkQuestFlag == true){
      if($resultPlayerActiveAreaId == $questMasterData['quest_area_id'] || $questMasterData['quest_area_id'] == 0){
        try{
          $setStep = 0; //進行中状態にする
          $conn->beginTransaction(); //トランザクション開始
          $stmt = $conn -> prepare("INSERT INTO player_quest (player_index_id, quest_master_id, step)
          SELECT :player_index_id, :quest_master_id, :step FROM dual WHERE NOT EXISTS ( SELECT player_index_id, quest_master_id, step FROM player_quest
            WHERE player_index_id= :player_index_id AND quest_master_id = :quest_master_id)");
          $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
          $stmt->bindParam(':quest_master_id', $questMasterData['id'], PDO::PARAM_INT);
          $stmt->bindParam(':step', $setStep, PDO::PARAM_INT);
          $stmt->execute();

          switch ((int)$questMasterData['quest_type']) {
            case 0: //討伐クエスト
            {
              $enemyCountInit = 0;
              $subDueQuestMasterDatas = getSubDueQuestMasterDatas($conn,$questMasterData['quest_target_id']);
              if($subDueQuestMasterDatas != false && count($subDueQuestMasterDatas) != 0){
                foreach ($subDueQuestMasterDatas as $sunDueQuestasterData) {
                  //ユーザー討伐クエストデータを挿入
                  $stmt = $conn -> prepare("INSERT INTO player_sub_due_quest (player_index_id, sub_due_quest_id, quest_master_id, enemy_index_id, enemy_count)
                  SELECT :player_index_id, :sub_due_quest_id, :quest_master_id, :enemy_index_id, :enemy_count
                  FROM dual WHERE NOT EXISTS ( SELECT player_index_id, sub_due_quest_id, quest_master_id, enemy_index_id FROM player_sub_due_quest
                    WHERE player_index_id= :player_index_id AND sub_due_quest_id = :sub_due_quest_id
                    AND quest_master_id = :quest_master_id AND enemy_index_id = :enemy_index_id)");
                  $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
                  $stmt->bindParam(':sub_due_quest_id', $questMasterData['quest_target_id'], PDO::PARAM_INT);
                  $stmt->bindParam(':quest_master_id', $questMasterData['id'], PDO::PARAM_INT);
                  $stmt->bindParam(':enemy_index_id', $sunDueQuestasterData['enemy_index_id'], PDO::PARAM_INT);
                  $stmt->bindParam(':enemy_count', $enemyCountInit, PDO::PARAM_INT);
                  $stmt->execute();
                }
              }
            }
            break;
            case 1: //???
            {

            }
            break;
            default:
            {

            }
            break;
          }
          $conn->commit(); //トランザクション終了
        }
        catch(Exception $e){
          var_dump($e);
          $conn->rollBack();
          $result = false;
        }
      }
      else{
        $result = false;
      }
    }
    else {
      $result = false;
    }
  }
  return $result;
}

function getQuestDropData($conn,$questMasterData){ //クエスト報酬一覧を取得(獲得ではなくリストの取得だけ)
  $result = array();
  if($questMasterData != null && isset($questMasterData['drop_master_id'])){
    $result['quest_master_id'] = $questMasterData['id'];
    $result['drop_item_datas'] = array();
    $sql = "SELECT * FROM drop_list WHERE drop_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($questMasterData['drop_master_id']));
    $resultDropListDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    if($resultDropListDatas != 0){
      foreach ($resultDropListDatas as $dropListData) {
        $resultAddDropData = array();
        $resultAddDropData['item_name'] = "アイテム名の取得に失敗しました。";
        $resultAddDropData['item_num'] = "???";
        switch ((int)$dropListData['drop_category_id']) {
          case 1: //経験値
          {
            $sql = "SELECT * FROM drop_exp WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($dropListData['drop_abstract_id']));
            $dropExpData = $stmt->fetch(PDO::FETCH_ASSOC);
            if($dropExpData != null){
              $resultAddDropData['item_name'] = "経験値";
              $resultAddDropData['item_num'] = $dropExpData['exp_val'];
            }
          }
          break;
          case 2: //通貨
          {
            $sql = "SELECT * FROM drop_item LEFT JOIN item_master ON drop_item.item_id = item_master.id WHERE drop_item.id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($dropListData['drop_abstract_id']));
            $dropItemData = $stmt->fetch(PDO::FETCH_ASSOC);
            if($dropItemData != null){
              $resultAddDropData['item_name'] = $dropItemData['item_name'];
              $resultAddDropData['item_num'] = $dropItemData['item_val'];
            }
          }
          break;
          case 3: //カード
          {
            $sql = "SELECT * FROM drop_card LEFT JOIN card_master ON drop_card.card_id = card_master.id WHERE drop_card.id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($dropListData['drop_abstract_id']));
            $dropCardData = $stmt->fetch(PDO::FETCH_ASSOC);
            if($dropCardData != null){
              $resultAddDropData['item_name'] = $dropCardData['card_name'];
              $resultAddDropData['item_num'] = $dropCardData['card_val'];
            }
          }
          break;
          case 4: //装備品
          {
            $sql = "SELECT * FROM equip_item_master WHERE id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($dropListData['drop_abstract_id']));
            $equipItemData = $stmt->fetch(PDO::FETCH_ASSOC);
            if($equipItemData != null){
              $resultAddDropData['item_name'] = $equipItemData['item_name'];
              $resultAddDropData['item_num'] = "1";
            }
          }
          break;
          default:
          {

          }
          break;
        }
        array_push($result['drop_item_datas'],$resultAddDropData);
      }
    }
  }
  return $result;
}

function getQuestCondition($conn,$playerIndexId,$questMasterData){ //クエストの達成条件を取得(複数あれば複数取得)
  $result = array();
  switch ((int)$questMasterData['quest_type']) {
    case 0: //討伐クエスト
    {
      $subDueQuestMasterDatas = getSubDueQuestMasterDatas($conn,$questMasterData['quest_target_id']);
      if($subDueQuestMasterDatas != false && count($subDueQuestMasterDatas) != 0){
        foreach ($subDueQuestMasterDatas as &$subDueMaster) {
          $subDueMaster['enemy_master_data'] = getEnemyMasterData($conn,$subDueMaster['enemy_index_id']); //討伐対象の敵データを取得
          $subDueMaster['quest_type'] = $questMasterData['quest_type'];
          $selectPlayerSubDueQuestData = getPlayerSubDueQuestDataOne($conn,$playerIndexId,$subDueMaster['sub_due_quest_id'],$questMasterData['id'],$subDueMaster['enemy_index_id']);
          $subDueMaster['player_sub_due_quest_data'] = $selectPlayerSubDueQuestData; //プレイヤーが討伐達成条件進行中の場合にデータが入る
          array_push($result,$subDueMaster); //条件データを追加
        }
        unset($subDueMaster);
      }
    }
    break;
    case 1: //???
    {

    }
    break;
    default:
    break;
  }
  return $result;
}

function checkQuestFlag($conn,$questMasterData,$playerInfo){ //指定したクエストフラグがアクティブな状態か調べる 返し値 bool true=アクティブ false=非アクティブ
  $questFlagId = -1;
  $questFlagTargetId = -1;
  if(isset($questMasterData['quest_flag_id']) && isset($questMasterData['quest_flag_target_id']) && isset($questMasterData['id'])){
    $questFlagId = $questMasterData['quest_flag_id'];
    $questFlagTargetId = $questMasterData['quest_flag_target_id'];
  }
  else return false;

  $result = false;
  switch ((int)$questFlagId) {
    case 0: //デフォルト(無制限)
    {
      $result = true;
    }
    break;
    case 1: //デイリークエスト(1日1回限定)
    {
      $result = checkDayQuestActive($conn,$questFlagTargetId); //今が有効な日であるか取得
    }
    break;
    case 2: //ストーリークエスト
    {
      $result = checkPlayerOpenStoryQuest($conn,$playerInfo['player_index_id'],$questMasterData); //解放されているクエストかチェック
    }
    break;
    case 3: //日曜
    $result = checkDayOtTheWeekQuest("Sun");
    break;
    case 4: //月曜
    $result = checkDayOtTheWeekQuest("Mon");
    break;
    case 5: //火曜
    $result = checkDayOtTheWeekQuest("Tue");
    break;
    case 6: //水曜
    $result = checkDayOtTheWeekQuest("Wed");
    break;
    case 7: //木曜
    $result = checkDayOtTheWeekQuest("Thu");
    break;
    case 8: //金曜
    $result = checkDayOtTheWeekQuest("Fri");
    break;
    case 9: //土曜
    $result = checkDayOtTheWeekQuest("Sat");
    break;
    case 10: //イベントクエスト(期間クエスト)
    {
      $result = checkEventQuestStatus($conn,$questFlagTargetId);
    }
    break;
    case 11: //キャンペーンクエスト(1回だけクリア可能なクエスト)
    {
      $result = true;
    }
    default:
    break;
  }

  if($result == true){
    //クリア済みで受注出来ないクエストが存在すれば非アクティブにする。
    $checkPlayerQuestCleared = checkPlayerQuestCleared($conn,$playerInfo['player_index_id'],$questMasterData['id']);
    if($checkPlayerQuestCleared == true) $result = false;
    //レベル条件が一致しない場合は非アクティブにする。
    if($playerInfo['player_level'] < $questMasterData['quest_open_player_level']) $result = false;
  }

  return $result;
}

function checkPlayerOpenStoryQuest($conn,$playerIndexId,$questMasterData){ //解放されているストーリークエストかチェック true = 解放 false = 未解放
  $result = false;
  if($questMasterData != false && isset($questMasterData['quest_flag_target_id']) && isset($questMasterData['open_quest_master_id'])){
    if($questMasterData['quest_flag_target_id'] == 0){ //最初のストーリークエストは解放にする。
      return true;
    }
    else{ //以外
      $sql = "SELECT * FROM player_open_story_quest WHERE player_index_id=? AND quest_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$questMasterData['id']));
      $getPlayerOpenStoryQuest = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getPlayerOpenStoryQuest != false){
        $result = true;
      }
    }
  }
  return $result;
}

function checkPlayerQuestCleared($conn,$playerIndexId,$questMasterId){ //既にクリア済みで受注不可の場合trueを返す
  $result = false;
  $sql = "SELECT * FROM player_quest_cleared WHERE player_index_id=? AND quest_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$questMasterId));
  $getPlayerQuestCleared = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getPlayerQuestCleared != false){
    $result = true;
  }
  return $result;
}

function insertPlayerQuestCleared($conn,$playerIndexId,$questMasterData){ //クリア済みクエストを追加する(1回だけクリア可能なクエストのみ)
  if($questMasterData != false && isset($questMasterData['quest_flag_id']) && isset($questMasterData['id'])){
    $checkQuestFlag = true;
    switch ((int)$questMasterData['quest_flag_id']) {
      case 2: //ストーリークエスト
      break;
      case 11: //キャンペーンクエスト
      break;
      default:
      $checkQuestFlag = false;
      break;
    }
    if($checkQuestFlag == true){ //1回クリア限定のクエストだった
      $stmt = $conn -> prepare("INSERT INTO player_quest_cleared (player_index_id, quest_master_id)
      VALUES (:player_index_id, :quest_master_id)");
      $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
      $stmt->bindParam(':quest_master_id', $questMasterData['id'], PDO::PARAM_INT);
      $stmt->execute();
    }
  }
}

//解放するクエストを追加する
function insertPlayerOpenStoryQuest($conn,$playerIndexId,$openQuestMasterId){
  $stmt = $conn -> prepare("INSERT INTO player_open_story_quest (player_index_id, quest_master_id)
  VALUES (:player_index_id, :quest_master_id)");
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':quest_master_id', $openQuestMasterId, PDO::PARAM_INT);
  $stmt->execute();
}

function checkDayQuestActive($conn,$questFlagTargetId){ //今が有効なクエストの日か取得
  $result = false;
  $sql = "SELECT * FROM day_quest_condition WHERE quest_flag_target_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($questFlagTargetId));
  $getDayQuestData = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getDayQuestData != false){
    $nowDay = date("j");
    if((int)$nowDay == (int)$getDayQuestData['day']) $result = true;
  }
  return $result;
}

function checkDayOtTheWeekQuest($weekDay){ //今が有効なクエストの曜日か取得
  $result = false;
  $checkWeekDay = date("D");
  if((string)$checkWeekDay == (string)$weekDay) $result = true;
  return $result;
}

function checkEventQuestStatus($conn,$questFlagTargetId){ //今がイベントクエスト期間中か調べる
  $result = false;
  $sql = "SELECT * FROM event_quest_condition WHERE quest_flag_target_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($questFlagTargetId));
  $getEventQuestData = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getEventQuestData != false){
    $nowDay = date("j");
    if((int)$getEventQuestData['start_day'] <= (int)$nowDay && (int)$nowDay <= (int)$getEventQuestData['end_day']) $result = true;
  }
  return $result;
}
