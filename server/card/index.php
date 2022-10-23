<?php

function getCardMasterData($conn,$cardMasterId){
  $sql = "SELECT * FROM card_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($cardMasterId));
  $selectCardMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectCardMasterData;
}

function getCardMasterDatas($conn){
  $sql = "SELECT * FROM card_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getCardMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getCardMasterDatas;
}

function getRankMasterDatas($conn){
  $sql = "SELECT * FROM rank_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getRankMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getRankMasterDatas;
}

function getCardSkill($conn,$cardMasterId,$skillCount){ //ロールによって発動するスキルを取得
  $sql = "SELECT * FROM card_skills WHERE card_master_id=? AND skill_count=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($cardMasterId,$skillCount));
  $selectCardSkills = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectCardSkills;
}

function getPlayerCard($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerCards = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerCards;
}

function updatePlayerCardNum($conn,$playerIndexId,$cardMasterId,$useNum){ //プレイヤーの所持しているカード枚数を更新
  $sql = "UPDATE player_card SET num = num - ? WHERE player_index_id=? AND card_master_id=? AND num >= ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($useNum,$playerIndexId,$cardMasterId,$useNum));
}

function getActivePlayerCard($conn, $playerInfo){
  $result = array();
  if($playerInfo != false){
    $playerWeapons = getPlayerWeaponEquipMasterDataRow($conn,$playerInfo['player_index_id']);
    $playerCards = getPlayerCard($conn,$playerInfo['player_index_id']);
    foreach ($playerCards as $plCard) {
      $cardMasterData = getCardMasterData($conn,$plCard['card_master_id']);
      if($cardMasterData != false && count($playerWeapons) != 0){
        if($cardMasterData['class_id'] == 0 || $playerInfo['player_class_id'] == $cardMasterData['class_id']){
          $mainWeaponFlag = false;
          $subWeaponFlag = false;
          foreach ($playerWeapons as $weaponMaster) {
            if($weaponMaster['weapon_category_id'] == $cardMasterData['weapon_category_id'] || $cardMasterData['weapon_category_id'] == 0){
              $mainWeaponFlag = true;
              break;
            }
          }
          foreach ($playerWeapons as $weaponMaster) {
            if($weaponMaster['weapon_category_id'] == $cardMasterData['sub_weapon_category_id'] || $cardMasterData['sub_weapon_category_id'] == 0){
              $subWeaponFlag = true;
              break;
            }
          }
          if($mainWeaponFlag == true && $subWeaponFlag == true){
            array_push($result,$plCard);
          }
        }
      }
    }
  }
  return $result;
}

function checkPlayerCard($conn,$playerInfo,$cardMasterId){ //発動可能なロールかチェックする。
  $result = false;
  $mainWeaponFlag = false;
  $subWeaponFlag = false;
  if($playerInfo != false){
    if($cardMasterId == 0){ //カードIDが0の場合は通常攻撃のため、trueを返す
      return true;
    }
    $cardMasterData = getCardMasterData($conn,$cardMasterId);
    if($cardMasterData != false){
      $playerWeapons = getPlayerWeaponEquipMasterDataRow($conn,$playerInfo['player_index_id']);
      if($cardMasterData['class_id'] == 1 || $playerInfo['player_class_id'] == $cardMasterData['class_id']){
        if($cardMasterData['weapon_category_id'] == 0){
          $mainWeaponFlag = true;
        }
        if($cardMasterData['sub_weapon_category_id'] == 0){
          $subWeaponFlag = true;
        }
        $checkEquipMainWeapon = true; //メイン武器をを装備しているか
        foreach ($playerWeapons as $weaponMaster) {
          if($weaponMaster['weapon_category_id'] != 0) $checkEquipMainWeapon = false;
        }
        if($cardMasterData['weapon_category_id'] == 1 && $checkEquipMainWeapon == true){
          $mainWeaponFlag = true;
        }
        $checkEquipSubWeapon = true; //サブ武器をを装備しているか
        foreach ($playerWeapons as $weaponMaster) {
          if($weaponMaster['sub_weapon_category_id'] != 0) $checkEquipSubWeapon = false;
        }
        if($cardMasterData['sub_weapon_category_id'] == 1 && $checkEquipSubWeapon == true){
          $subWeaponFlag = true;
        }
        foreach ($playerWeapons as $weaponMaster) {
          if($weaponMaster['weapon_category_id'] == $cardMasterData['weapon_category_id']){
            $mainWeaponFlag = true;
            break;
          }
        }
        foreach ($playerWeapons as $weaponMaster) {
          if($weaponMaster['sub_weapon_category_id'] == $cardMasterData['sub_weapon_category_id']){
            $subWeaponFlag = true;
            break;
          }
        }
        if($mainWeaponFlag == true && $subWeaponFlag == true){
          $result = true;
        }
      }
    }
  }
  return $result;
}

function checkPlayerActiveCardDeck($conn,$playerIndexId,$playerClassId,$cardMasterId){ //発動可能な英雄カードかチェックを行う
  $result = array();
  $result['check_class'] = false;
  $result['check_weapon'] = false;
  $result['check_sub_weapon'] = false;
  $playerWeapons = getPlayerWeaponEquipMasterDataRow($conn,$playerIndexId); //プレイヤーの装備中の武器全てを取得する。
  $cardMasterData = getCardMasterData($conn,$cardMasterId);
  if($cardMasterData != false){

    if($cardMasterData['weapon_category_id'] == 0){
      $result['check_weapon'] = true;
    }
    if($cardMasterData['sub_weapon_category_id'] == 0){
      $result['check_sub_weapon'] = true;
    }

    if($cardMasterData['class_id'] == 1 || $cardMasterData['class_id'] == $playerClassId){
      $result['check_class'] = true;
    }
    if($playerWeapons != false){
      foreach ($playerWeapons as $plWeapon) {
        if($plWeapon['weapon_category_id'] == $cardMasterData['weapon_category_id']){
          $result['check_weapon'] = true;
        }
      }
      foreach ($playerWeapons as $plWeapon) {
        if($plWeapon['weapon_category_id'] == $cardMasterData['sub_weapon_category_id']){
          $result['check_sub_weapon'] = true;
        }
      }
    }
    $checkEquipMainWeapon = true; //メイン武器を装備しているか true 装備していない
    foreach ($playerWeapons as $plWeapon) {
      if($plWeapon['weapon_category_id'] != 0) $checkEquipMainWeapon = false;
    }
    if($cardMasterData['weapon_category_id'] == 1 && $checkEquipMainWeapon == true){
      $result['check_weapon'] = true;
    }
    $checkEquipSubWeapon = true; //サブ武器を装備しているか true 装備していない
    foreach ($playerWeapons as $plWeapon) {
      if($plWeapon['sub_weapon_category_id'] != 0) $checkEquipSubWeapon = false;
    }
    if($cardMasterData['sub_weapon_category_id'] == 1 && $checkEquipSubWeapon == true){
      $result['check_sub_weapon'] = true;
    }
  }
  return $result;
}

function getPlayerCardDataRow($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerCardDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerCardDataRow;
}

function getPlayerCardDatas($conn,$playerIndexId){ //クライアント表示用 テーブル結合使用
  $sql = "SELECT * FROM player_card LEFT JOIN card_master ON player_card.card_master_id = card_master.id WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerCardDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerCardDatas;
}

function insertPlayerCard($conn,$playerIndexId,$cardMasterId,$getNum = 1){ //カードを取得する。
  $result = false;
  $cardMasterData = getCardMasterData($conn,$cardMasterId);
  if($cardMasterData != false){
    //try{
      //$conn->beginTransaction(); //トランザクション開始
      $sql = "SELECT * FROM player_card WHERE player_index_id=? AND card_master_id=? FOR UPDATE";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerIndexId,$cardMasterId));
      $checkPlayerCard = $stmt->fetch(PDO::FETCH_ASSOC);
      if($checkPlayerCard == false){ //カードを1枚も所持していなかった。
        $newCardStatus = 0;
        $stmt = $conn -> prepare("INSERT INTO player_card (player_index_id, card_master_id, equip_status, num)
        VALUES (:player_index_id, :card_master_id, :equip_status, :num)");
        $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
        $stmt->bindParam(':card_master_id', $cardMasterData['id'], PDO::PARAM_INT);
        $stmt->bindParam(':equip_status', $newCardStatus, PDO::PARAM_INT);
        $stmt->bindParam(':num', $getNum, PDO::PARAM_INT);
        $stmt->execute();
        $result = true;
      }
      else if(isset($checkPlayerCard['num']) && isset($checkPlayerCard['card_master_id'])){ //所持していて、データが正常な場合
        $resultNum = $getNum + $checkPlayerCard['num'];
        $sql = "UPDATE player_card SET num=? WHERE player_index_id=? AND card_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($resultNum,$playerIndexId,$checkPlayerCard['card_master_id']));
        $result = true;
      }
      //$conn->commit(); //トランザクション終了
    //}
    //catch(Exception $e){
    //  $conn->rollBack();
    //  var_dump($e);
    //  $result = false;
    //}
  }
  return $result;
}

function selectClassCardMasterDataRow($conn,$classId,$cardRank){
  $limitCardRank = ($cardRank + 1);
  $resultCardArray = array();
  $selectAllClassCardDataRow = array();
  $sql = "SELECT * FROM card_master WHERE class_id=? AND card_rank < ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($classId,$limitCardRank));
  $selectCardDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($classId != 1){
    $allClassId = 1;
    $sql = "SELECT * FROM card_master WHERE class_id=? AND card_rank < ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($allClassId,$limitCardRank));
    $selectAllClassCardDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $resultCardArray = array_merge($selectCardDataRow,$selectAllClassCardDataRow);
  }
  else{
    $resultCardArray = $selectCardDataRow;
  }
  return $selectCardDataRow;
}
//
function getPlayerOpenCardRank($conn,$playerInfo){
  $resultRank = 1;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_card_open_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $selectCardOpenMaster = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($selectCardOpenMaster as $cardOpen) {
      if($cardOpen['player_level'] <= $playerInfo['player_level']){
        $resultRank = $cardOpen['card_rank'];
      }
    }
  }
  return $resultRank;
}
//
function replaceUnOpenPlayerCards($conn,$playerInfo){ //未解放のクラススキルを取得する。
  $resultCards = array();
  if($playerInfo != false){
    $playerCards = getPlayerCardDataRow($conn,$playerInfo['player_index_id']);
    $cardRank = getPlayerOpenCardRank($conn,$playerInfo);
    $matchingCards = selectClassCardMasterDataRow($conn,$playerInfo['player_class_id'],$cardRank);
    foreach ($matchingCards as $mCard) {
      $check = true;
      foreach ($playerCards as $plCard) {
        if($plCard['card_master_id'] == $mCard['id']){
          $check = false;
        }
      }
      if($check != false){
        array_push($resultCards,$mCard);
      }
    }
  }
  return $resultCards;
}

function playerTrainingPointCheck($conn,$playerInfo){
  $WAIT_TIME = 21600; //回復待ち時間
  $resultTrainingFlag = false;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_training_point WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerTrainingPoint = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerTrainingPoint != false){
      if($selectPlayerTrainingPoint['custom_open_flag'] != 0){
        $resultTrainingFlag = true;
      }
      if((strtotime($selectPlayerTrainingPoint['last_update']) + $WAIT_TIME) <= time()){
        $resultTrainingFlag = true;
      }
    }
  }
  return $resultTrainingFlag;
}

function getPlayerTrainingPointLimitTime($conn,$playerInfo){
  $WAIT_TIME = 21600; //回復待ち時間
  $resultTime = -1;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_training_point WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerTrainingPoint = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerTrainingPoint != false){
      $waitTime = (strtotime($selectPlayerTrainingPoint['last_update']) + $WAIT_TIME);
      if(time() < $waitTime){
        $limitTime = ($waitTime - time());
        $resultTime = $limitTime;
      }
      else{
        $resultTime = 0;
      }
    }
  }
  return $resultTime;
}

function rotPlayerCard($conn,$playerInfo){ //-1:失敗 0:取得できるスキルがない。それ以外成功
  $result = -1;
  if($playerInfo != false){
    $checkTrainingPoint = playerTrainingPointCheck($conn,$playerInfo);
    if($checkTrainingPoint == true){
      $unOpenCards = replaceUnOpenPlayerCards($conn,$playerInfo);
      $replaceCards = replaceTrainingCards($conn,$unOpenCards);
      if(count($replaceCards) != 0){
        $randCard = rand(1,count($replaceCards));
        $rowCount = 1;
        foreach ($replaceCards as $card){
          if($rowCount == $randCard){
            insertPlayerCard($conn,$playerInfo['player_index_id'],$card['id']);
            $updateTime = date('Y-m-d H:i:s');
            $newCustomFlag = 0;
            $sql = "UPDATE player_training_point SET custom_open_flag=?,last_update=? WHERE player_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($newCustomFlag,$updateTime,$playerInfo['player_index_id']));
            $result = $card['id'];
            break;
          }
          $rowCount = ($rowCount + 1);
        }
      }
      else{
        $result = 0;
      }
    }
  }
  return $result;
}

function changeLimitTime($seconds){
  $hours = floor($seconds / 3600);
  $minutes = floor(($seconds / 60) % 60);
  $seconds = $seconds % 60;

  $hms = sprintf("%02d時間%02d分%02d秒", $hours, $minutes, $seconds);

  return $hms;
}

//ダミーデッキデータを生成(プレイヤー用)
function createPlayerDummyCardDeck($playerIndexId,$dataType = 0){ //dataType = 1:1つのデッキ選択用
  $result = array();
  $result['player_card_deck'] = array();
  $result['player_card_datas'] = array();
  $result['card_master_datas'] = array();
  //プレイヤーデッキデータを定義
  $playerDeckDatas = array();
  $playerDeckDatas['player_index_id'] = $playerIndexId;
  $playerDeckDatas['deck_number'] = 1;
  $playerDeckDatas['card_deck'] = 1;
  //プレイヤーカードデータを定義
  $playerCardData = array();
  $playerCardData['player_index_id'] = $playerIndexId;
  $playerCardData['card_master_id'] = 1;
  $playerCardData['num'] = 9999;
  //カードマスターデータを定義
  $playerCardMasterDatas = array();
  $playerCardMasterDatas['id'] = 1;
  $playerCardMasterDatas['card_category_id'] = 2;
  $playerCardMasterDatas['card_name'] = "テストスキル(通常攻撃用)";
  $playerCardMasterDatas['card_asset_id'] = 133;
  $playerCardMasterDatas['class_id'] = 1;
  $playerCardMasterDatas['weapon_category_id'] = 0;
  $playerCardMasterDatas['sub_weapon_category_id'] = 0;
  $playerCardMasterDatas['stamina_point'] = 0;
  $playerCardMasterDatas['card_rank'] = 1;
  $playerCardMasterDatas['skill_anim_type'] = 1;
  $playerCardMasterDatas['skill_type'] = 0;
  $playerCardMasterDatas['skill_target_type'] = 0;
  $playerCardMasterDatas['skill_param_0'] = 0;
  $playerCardMasterDatas['skill_param_1'] = 0;
  $playerCardMasterDatas['skill_param_2'] = 10;
  $playerCardMasterDatas['skill_param_3'] = 0;
  $playerCardMasterDatas['skill_param_4'] = 0;
  $playerCardMasterDatas['skill_param_5'] = 0;
  $playerCardMasterDatas['skill_param_6'] = 0;
  $playerCardMasterDatas['skill_param_7'] = 0;
  $playerCardMasterDatas['skill_param_8'] = 0;
  $playerCardMasterDatas['skill_param_9'] = 0;
  $playerCardMasterDatas['skill_param_10'] = 0;
  $playerCardMasterDatas['skill_param_11'] = 0;
  $playerCardMasterDatas['comment'] = "コメントテスト";
  //各要素を配列に挿入
  if($dataType == 0){
    $result['player_card_deck'][0] = $playerDeckDatas;
    $result['player_card_datas'][0] = $playerCardData;
    $result['card_master_datas'][0] = $playerCardMasterDatas;
  }
  else if($dataType == 1){
    $result['player_card_deck'] = $playerDeckDatas;
    $result['player_card_datas'] = $playerCardData;
    $result['card_master_datas'] = $playerCardMasterDatas;
  }
  return $result;
}

//プレイヤーのデッキデータを取得する。
function getPlayerDeckData($conn,$playerIndexId,$deckType = 0){ //deckType = 0:メイン 1:パーティデッキ
  $result = array();
  $result['player_card_decks'] = array();
  $result['player_card_datas'] = array();
  $result['card_master_datas'] = array();

  if($deckType == 0) $sql = "SELECT * FROM player_card_deck_main WHERE player_index_id=?";
  if($deckType == 1) $sql = "SELECT * FROM player_card_deck_party WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerCardDeck = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result['player_card_decks'] = $getPlayerCardDeck;
  if(count($getPlayerCardDeck) != 0){
    foreach ($getPlayerCardDeck as $plCardDeck) {
      //該当するカードマスターデータを取得
      $getCardMasterDatas = array();
      $cardIds = explode(",",$plCardDeck['card_deck']);
      //配列で重複している物を削除する
      $cardIds = array_unique($cardIds);
      $cardIds = array_values($cardIds);
      $selectIds = substr(str_repeat(',?', count($cardIds)), 1);
      $sql = "SELECT * FROM card_master WHERE id IN ({$selectIds})";
      $stmt = $conn->prepare($sql);
      $stmt->execute($cardIds);
      $getCardMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //該当するプレイヤーカードデータを取得
      $getPlayerCardrDatas = array();
      if(count($cardIds) != 0){
        $params = $cardIds;
        $params[count($params)] = ",".$playerIndexId;
        $sql = "SELECT * FROM player_card WHERE card_master_id IN ({$selectIds}) AND player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        $getPlayerCardrDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
      $result['player_card_datas'] = array_merge($result['player_card_datas'],$getPlayerCardrDatas);
      $result['card_master_datas'] = array_merge($result['card_master_datas'],$getCardMasterDatas);
    }
  }
  else { //デッキが一つも登録されていない場合は、ダミーデッキを配列に挿入
    $result = createPlayerDummyCardDeck($conn,$playerIndexId);
  }
  return $result;
}

//カードの使用が可能かチェックを行う
function checkPlayerCardNum($conn,$playerIndexId,$cardMasterId){
  $result = false;
  $sql = "SELECT * FROM player_card WHERE player_index_id=? AND card_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$cardMasterId));
  $playerCardData = $stmt->fetch(PDO::FETCH_ASSOC);
  if($playerCardData != false){
    if($playerCardData['num'] != 0){
      $result = true;
    }
  }
  return $result;
}

//デッキ番号からプレイヤーのデッキデータを取得 deckType = 0:メイン 1:パーティデッキ 2:PVPデッキ 3:パーティPVPデッキ
function getPlayerDeckDataSelectDeckNumber($conn,$playerIndexId,$deckNumber,$deckType = 0){
  $result = array();
  $result['player_card_deck'] = array();
  $result['player_card_datas'] = array();
  $result['card_master_datas'] = array();
  if($deckNumber == 0){ //通常攻撃の場合
    $result = createPlayerDummyCardDeck($playerIndexId,1);
  }
  else{
    if($deckType == 0) $sql = "SELECT * FROM player_card_deck_main WHERE player_index_id=? AND deck_number=?";
    if($deckType == 1) $sql = "SELECT * FROM player_card_deck_party WHERE player_index_id=? AND deck_number=?";
    if($deckType == 2) $sql = "SELECT * FROM player_card_deck_pvp WHERE player_index_id=? AND deck_number=?";
    if($deckType == 3) $sql = "SELECT * FROM player_card_deck_pvp_party WHERE player_index_id=? AND deck_number=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$deckNumber));
    $getPlayerCardDeck = $stmt->fetch(PDO::FETCH_ASSOC);
    $result['player_card_deck'] = $getPlayerCardDeck;
    if($getPlayerCardDeck != false){
      //該当するカードマスターデータを取得
      $getCardMasterDatas = array();
      $cardIds = explode(",",$result['player_card_deck']['card_deck']);
      //配列で重複している物を削除する
      $cardIds = array_unique($cardIds);
      $cardIds = array_values($cardIds);
      $selectIds = substr(str_repeat(',?', count($cardIds)), 1);
      $sql = "SELECT * FROM card_master WHERE id IN ({$selectIds})";
      $stmt = $conn->prepare($sql);
      $stmt->execute($cardIds);
      $getCardMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //該当するプレイヤーカードデータを取得
      $getPlayerCardrDatas = array();
      if(count($cardIds) != 0){
        $params = $cardIds;
        $params[count($params)] = $playerIndexId;
        $sql = "SELECT * FROM player_card WHERE card_master_id IN ({$selectIds}) AND player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute($params);
        $getPlayerCardrDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      }
      $result['player_card_datas'] = $getPlayerCardrDatas;
      $result['card_master_datas'] = $getCardMasterDatas;
    }
    else{ //使用不能なデッキの場合、ダミーデッキを挿入
      $result = createPlayerDummyCardDeck($playerIndexId,1);
    }
  }
  return $result;
}

//プレイヤーが登録した全てのデッキを取得
function getPlayerCardDecks($conn,$playerIndexId){
  $result = array();
  //メインデッキを取得
  $sql = "SELECT * FROM player_card_deck_main WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerCardDecks = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result['main_deck'] = $getPlayerCardDecks;
  //パーティデッキを取得
  $sql = "SELECT * FROM player_card_deck_party WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerCardDecks = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result['party_deck'] = $getPlayerCardDecks;
  //PVPデッキを取得
  $sql = "SELECT * FROM player_card_deck_pvp WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerCardDecks = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result['pvp_deck'] = $getPlayerCardDecks;
  //パーティPVPデッキを取得
  $sql = "SELECT * FROM player_card_deck_pvp_party WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerCardDecks = $stmt->fetchAll(PDO::FETCH_ASSOC);
  $result['pvp_party_deck'] = $getPlayerCardDecks;

  return $result;
}

//ダミープレイヤーカードデータを生成
function createDummyPlayerCardData($playerIndexId){
  $result = array();
  $result['player_index_id'] = $playerIndexId;
  $result['card_master_id'] = 1;
  $result['num'] = 9999;
  return $result;
}

function getEnemySelectDeckData($conn,$enemyId) //敵が選択したカードデッキデータを取得
{
  $result = array();
  $result['enemy_card_deck'] = array();
  $result['card_master_datas'] = array();
  $sql = "SELECT * FROM enemy_card_deck_main WHERE enemy_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($enemyId));
  $enemyDeckDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if(count($enemyDeckDatas) != 0){
    $selectDeckIndex = rand(0,(count($enemyDeckDatas) - 1)); //使用するデッキ番号を決定
    $resultEnemyDeckDatas = $enemyDeckDatas[$selectDeckIndex];
    $result['enemy_card_deck'] = $resultEnemyDeckDatas;
    if($result['enemy_card_deck'] != false){
      //該当するカードマスターデータを取得
      $getCardMasterDatas = array();
      $cardIds = explode(",",$result['enemy_card_deck']['card_deck']);
      //配列で重複している物を削除する
      $cardIds = array_unique($cardIds);
      $cardIds = array_values($cardIds);
      $selectIds = substr(str_repeat(',?', count($cardIds)), 1);
      $sql = "SELECT * FROM card_master WHERE id IN ({$selectIds})";
      $stmt = $conn->prepare($sql);
      $stmt->execute($cardIds);
      $getCardMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $result['card_master_datas'] = $getCardMasterDatas;
    }
  }
  else{ //デッキが見つからない場合はダミーデッキを挿入
    $result = createEnemyDummyCardDeck($enemyIndexId,1);
  }
  return $result;
}

//ダミーデッキデータを生成(敵用)
function createEnemyDummyCardDeck($enemyIndexId,$dataType = 0){ //dataType = 1:1つのデッキ選択用
  $result = array();
  $result['enemy_card_deck'] = array();
  $result['card_master_datas'] = array();
  //プレイヤーデッキデータを定義
  $enemyDeckDatas = array();
  $enemyDeckDatas['enemy_index_id'] = $enemyIndexId;
  $enemyDeckDatas['deck_number'] = 1;
  $enemyDeckDatas['card_deck'] = 1;
  //カードマスターデータを定義
  $enemyCardMasterDatas = array();
  $enemyCardMasterDatas['id'] = 1;
  $enemyCardMasterDatas['card_category_id'] = 2;
  $enemyCardMasterDatas['card_name'] = "テストスキル(通常攻撃用)";
  $enemyCardMasterDatas['card_asset_id'] = 133;
  $enemyCardMasterDatas['class_id'] = 1;
  $enemyCardMasterDatas['weapon_category_id'] = 0;
  $enemyCardMasterDatas['sub_weapon_category_id'] = 0;
  $enemyCardMasterDatas['stamina_point'] = 0;
  $enemyCardMasterDatas['card_rank'] = 1;
  $enemyCardMasterDatas['skill_anim_type'] = 1;
  $enemyCardMasterDatas['skill_type'] = 0;
  $enemyCardMasterDatas['skill_target_type'] = 0;
  $enemyCardMasterDatas['skill_param_0'] = 0;
  $enemyCardMasterDatas['skill_param_1'] = 0;
  $enemyCardMasterDatas['skill_param_2'] = 10;
  $enemyCardMasterDatas['skill_param_3'] = 0;
  $enemyCardMasterDatas['skill_param_4'] = 0;
  $enemyCardMasterDatas['skill_param_5'] = 0;
  $enemyCardMasterDatas['skill_param_6'] = 0;
  $enemyCardMasterDatas['skill_param_7'] = 0;
  $enemyCardMasterDatas['skill_param_8'] = 0;
  $enemyCardMasterDatas['skill_param_9'] = 0;
  $enemyCardMasterDatas['skill_param_10'] = 0;
  $enemyCardMasterDatas['skill_param_11'] = 0;
  $enemyCardMasterDatas['comment'] = "コメントテスト";
  //各要素を配列に挿入
  if($dataType == 0){
    $result['enemy_card_deck'][0] = $enemyDeckDatas;
    $result['card_master_datas'][0] = $enemyCardMasterDatas;
  }
  else if($dataType == 1){
    $result['enemy_card_deck'] = $enemyDeckDatas;
    $result['card_master_datas'] = $enemyCardMasterDatas;
  }
  return $result;
}

//プレイヤーが登録したプリセットを取得
function getPlayerCardDeckPreset($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card_deck_preset WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーのメインデッキデータを取得
function getPlayerCardDeckMain($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card_deck_main WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーのパーティデッキデータを取得
function getPlayerCardDeckParty($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card_deck_party WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーのPVPデッキデータを取得
function getPlayerCardDeckPvp($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card_deck_pvp WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーのPVPパーティデッキデータを取得
function getPlayerCardDeckPvpParty($conn,$playerIndexId){
  $sql = "SELECT * FROM player_card_deck_pvp_party WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//プレイヤーのデッキ組み込み最大枚数を取得
function getPlayerMaxDeckNum($conn,$playerLevel){
  $resultDeckNum = 5;
  $sql = "SELECT * FROM deck_num_stage WHERE level=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerLevel));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  if(isset($result['deck_num'])) $resultDeckNum = $result['deck_num'];
  return $resultDeckNum;
}

//プリセットデッキを変更
function updatePlayerPresetCardDeck($conn,$playerIndexId,$updateDeckData){
  if(!isset($updateDeckData['preset_card_deck_id']) || !isset($updateDeckData['card_deck'])) return false;
  //カードデッキを整形
  $replaceCardDeck = array();
  $cardIds = explode(",",$updateDeckData['card_deck']);
  for ($i=0; $i < count($cardIds); $i++) {
    if($cardIds[$i] != -1) array_push($replaceCardDeck,$cardIds[$i]);
  }
  if(count($replaceCardDeck) == 0) return false;
  $resultCardDeck = implode(",",$replaceCardDeck);

  if($updateDeckData['preset_card_deck_id'] != -1){ //既存のデッキを更新
    $sql = "UPDATE player_card_deck_preset SET deck_name=?, card_deck=? WHERE preset_card_deck_id=? AND player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($updateDeckData['deck_name'],$resultCardDeck,$updateDeckData['preset_card_deck_id'],$playerIndexId));
  }
  else{ //新規プリセットカードデッキ
    $stmt = $conn -> prepare("INSERT INTO player_card_deck_preset (deck_name, player_index_id, card_deck)
    VALUES (:deck_name, :player_index_id, :card_deck)");
    $stmt->bindParam(':deck_name', $updateDeckData['deck_name'], PDO::PARAM_STR);
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':card_deck', $resultCardDeck, PDO::PARAM_STR);
    $stmt->execute();
  }
  return true;
}

//メインデッキを変更
function updatePlayerMainCardDeck($conn,$playerIndexId,$updateDeckData){
  if(!isset($updateDeckData['deck_number']) || !isset($updateDeckData['card_deck'])) return false;
  if(10 < $updateDeckData['deck_number']) return false;
  //カードデッキ整形
  $replaceCardDeck = array();
  $cardIds = explode(",",$updateDeckData['card_deck']);
  for ($i=0; $i < count($cardIds); $i++) {
    if($cardIds[$i] != -1) array_push($replaceCardDeck,$cardIds[$i]);
  }
  if(count($replaceCardDeck) == 0) return false;
  $resultCardDeck = implode(",",$replaceCardDeck);
  $stmt = $conn -> prepare("INSERT INTO player_card_deck_main (deck_number, deck_name, player_index_id, card_deck)
  VALUES (:deck_number, :deck_name, :player_index_id, :card_deck) ON DUPLICATE KEY UPDATE deck_name = :deck_name, card_deck = :card_deck");
  $stmt->bindParam(':deck_number', $updateDeckData['deck_number'], PDO::PARAM_INT);
  $stmt->bindParam(':deck_name', $updateDeckData['deck_name'], PDO::PARAM_STR);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':card_deck', $resultCardDeck, PDO::PARAM_STR);
  $stmt->execute();
  return true;
}

//パーティデッキを変更
function updatePlayerPartyCardDeck($conn,$playerIndexId,$updateDeckData){
  if(!isset($updateDeckData['deck_number']) || !isset($updateDeckData['card_deck'])) return false;
  if(10 < $updateDeckData['deck_number']) return false;
  //カードデッキ整形
  $replaceCardDeck = array();
  $cardIds = explode(",",$updateDeckData['card_deck']);
  for ($i=0; $i < count($cardIds); $i++) {
    if($cardIds[$i] != -1) array_push($replaceCardDeck,$cardIds[$i]);
  }
  if(count($replaceCardDeck) == 0) return false;
  $resultCardDeck = implode(",",$replaceCardDeck);
  $stmt = $conn -> prepare("INSERT INTO player_card_deck_party (deck_number, deck_name, player_index_id, card_deck)
  VALUES (:deck_number, :deck_name, :player_index_id, :card_deck) ON DUPLICATE KEY UPDATE deck_name = :deck_name, card_deck = :card_deck");
  $stmt->bindParam(':deck_number', $updateDeckData['deck_number'], PDO::PARAM_INT);
  $stmt->bindParam(':deck_name', $updateDeckData['deck_name'], PDO::PARAM_STR);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':card_deck', $resultCardDeck, PDO::PARAM_STR);
  $stmt->execute();
  return true;
}

//PVPデッキを変更
function updatePlayerPvpCardDeck($conn,$playerIndexId,$updateDeckData){
  if(!isset($updateDeckData['deck_number']) || !isset($updateDeckData['card_deck'])) return false;
  if($updateDeckData['deck_number'] != 1) return false;
  //カードデッキ整形
  $replaceCardDeck = array();
  $cardIds = explode(",",$updateDeckData['card_deck']);
  for ($i=0; $i < count($cardIds); $i++) {
    if($cardIds[$i] != -1) array_push($replaceCardDeck,$cardIds[$i]);
  }
  if(count($replaceCardDeck) == 0) return false;
  $resultCardDeck = implode(",",$replaceCardDeck);
  $stmt = $conn -> prepare("INSERT INTO player_card_deck_pvp (deck_number, deck_name, player_index_id, card_deck)
  VALUES (:deck_number, :deck_name, :player_index_id, :card_deck) ON DUPLICATE KEY UPDATE deck_name = :deck_name, card_deck = :card_deck");
  $stmt->bindParam(':deck_number', $updateDeckData['deck_number'], PDO::PARAM_INT);
  $stmt->bindParam(':deck_name', $updateDeckData['deck_name'], PDO::PARAM_STR);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':card_deck', $resultCardDeck, PDO::PARAM_STR);
  $stmt->execute();
  return true;
}

//PVPパーティデッキを変更
function updatePlayerPvpPartyCardDeck($conn,$playerIndexId,$updateDeckData){
  if(!isset($updateDeckData['deck_number']) || !isset($updateDeckData['card_deck'])) return false;
  if($updateDeckData['deck_number'] != 1) return false;
  //カードデッキ整形
  $replaceCardDeck = array();
  $cardIds = explode(",",$updateDeckData['card_deck']);
  for ($i=0; $i < count($cardIds); $i++) {
    if($cardIds[$i] != -1) array_push($replaceCardDeck,$cardIds[$i]);
  }
  if(count($replaceCardDeck) == 0) return false;
  $resultCardDeck = implode(",",$replaceCardDeck);
  $stmt = $conn -> prepare("INSERT INTO player_card_deck_pvp_party (deck_number, deck_name, player_index_id, card_deck)
  VALUES (:deck_number, :deck_name, :player_index_id, :card_deck) ON DUPLICATE KEY UPDATE deck_name = :deck_name, card_deck = :card_deck");
  $stmt->bindParam(':deck_number', $updateDeckData['deck_number'], PDO::PARAM_INT);
  $stmt->bindParam(':deck_name', $updateDeckData['deck_name'], PDO::PARAM_STR);
  $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
  $stmt->bindParam(':card_deck', $resultCardDeck, PDO::PARAM_STR);
  $stmt->execute();
  return true;
}

function cardCountCheck($conn,$playerIndexId,$cardId,$cardCount){//使用するカードの個数をチェックする。cardCount 使用回数
  $result = false;
  $cardData = getCardMasterData($conn,$cardId);
  if($cardData != false){
    $sql = "SELECT * FROM player_card WHERE player_index_id=? AND card_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerIndexId,$cardId));
    $playerCardData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($playerCardData != false){
      if($cardCount <= $playerCardData['num']){ //使用する回数分所持していた場合
        $result = true;
      }
    }
  }
  return $result;
}

?>
