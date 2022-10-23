<?php

function loadMapXml($mapId){ //指定したmapIdからxmlを読み込む
  $result = false;
  $xmlPath = "map_".$mapId.".xml";
  $loadXml = file_get_contents($xmlPath);
  if($loadXml != false){ //xmlが読み込めた場合
    //. <***:****> -> <***_****>
    $loadXml  = preg_replace( "/<([^>]+?):(.+?)>/", "<$1_$2>", $loadXml );
    //. プロトコルは元に戻す
    $loadXml  = preg_replace( "/_\/\//", "://", $loadXml );
    $resultCommXml = simplexml_load_string( $loadXml );
    if($resultCommXml != false){
      $resultCommData = array();
      $resultCommData['map_id'] = $mapId;
      //tsx情報
      $resultCommData['map_tsx_infos'] = array(); //firstgidなどの情報格納用
      foreach ($resultCommXml->tileset as $mapTsxData) {
        $tsxInfoData['tsx_info'] = array();
        $tsxInfoData['tsx_info']['tsx_start_gid'] = (string)$mapTsxData->attributes()->firstgid;
        $tsxInfoData['tsx_info']['tsx_name'] = (string)$mapTsxData->attributes()->source;
        array_push($resultCommData['map_tsx_infos'],$tsxInfoData['tsx_info']);
      }
      //マップ情報本体
      $resultCommData['mapLayers'] = array();
      foreach ($resultCommXml->layer as $mapXmlData) {
        $mapData['mapLayer'] = array();
        $mapData['mapLayer']['layerName'] = (string)$mapXmlData->attributes()->name;
        $mapIndexIds = explode(',', $mapXmlData->data);
        $mapData['mapLayer']['mapData'] = $mapIndexIds;
        array_push($resultCommData['mapLayers'],$mapData['mapLayer']);
      }
      $result = $resultCommData;
    }
  }
  return $result;
}

function getMapMasterData($conn,$mapId){
  $sql = "SELECT * FROM map_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapId));
  $getMapMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getMapMasterData;
}

function getPlayerMapInstance($conn,$playerIndexId,$mapId){ //プレイヤーのマップインスタンスを取得
  $sql = "SELECT * FROM player_map_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));
  $getPlayerMapInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getPlayerMapInstance;
}

function getAreaInstanceSelectMapId($conn,$mapId){ //エリアインスタンスを取得
  $getAreaInstance = false;
  $sql = "SELECT * FROM area_instance WHERE map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapId));
  $getAreaInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getAreaInstance;
}

function checkPlayerOpenMap($conn,$playerIndexId,$mainStoryId,$mapId){ //解放されているマップか確認する。
  $eventCategoryId = 2; //マップのため「戦闘」カテゴリーの2を選択
  $result = false;
  $checkOpenMainStory = checkPlayerOpenStory($conn,$playerIndexId,$mainStoryId);
  if($checkOpenMainStory != false){ //解放されているメインストーリーか
    $mainStoryEventDatas = getMainStoryEventDatas($conn,$mainStoryId);
    foreach ($mainStoryEventDatas as $eventData) {
      if($eventData['event_category_id'] == $eventCategoryId && $eventData['event_target_id'] == $mapId){ //マッチングした項目を見つけた場合
        $result = true;
        break;
      }
    }
  }
  return $result;
}

//ロードするマップに出現するキャラクターidを取得
function getMapActiveCharacterIds($conn,$loadMapData){
  $resultCharacterIds = array();
  $tsxStartGid = -1;
  if(isset($loadMapData['map_tsx_infos'])){
    foreach ($loadMapData['map_tsx_infos'] as $tsxInfo) {
      if($tsxInfo['tsx_name'] == "character.tsx"){ //キャラクターのtsx情報だった場合
        $tsxStartGid = $tsxInfo['tsx_start_gid'];
      }
    }
  }
  if(isset($loadMapData['mapLayers']) && $tsxStartGid != -1){
    foreach ($loadMapData['mapLayers'] as $mapLayer) {
      if($mapLayer['layerName'] == "layer_character"){
        for ($i=0; $i < count($mapLayer['mapData']) ; $i++) {
          if(0 < (int)$mapLayer['mapData'][$i]){
            $resultCharacterIds[count($resultCharacterIds)] = ($mapLayer['mapData'][$i] - $tsxStartGid);
          }
        }
        break;
      }
    }
  }
  $result = array_unique($resultCharacterIds);
  $result = array_values($result); //何故か連番にならない時がある。時間があれば調べて見て欲しい
  return $result;
}

//マップに配置されたキャラクター情報を取得
function getMapCharacterList($conn,$mapCharacterIds){
  $result = array();
  for ($i=0; $i < count($mapCharacterIds); $i++) {
    $sql = "SELECT * FROM map_character_list_master WHERE chip_index=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($mapCharacterIds[$i]));
    $getMapCahraData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($getMapCahraData != false){
      array_push($result,$getMapCahraData);
    }
  }
  return $result;
}

//マップに配置された敵情報を取得する
function getMapEnemyDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 1){ //敵のタイプだった場合
      $sql = "SELECT * FROM enemy_master WHERE enemy_index_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_target_id']));
      $getEnemyMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getEnemyMasterData != false){
        //アクションの取得
        $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($mapCharaData['character_type'],$getEnemyMasterData['enemy_index_id']));
        $getEnemyActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultActionDatas = array(); //最終決定するアクションデータ
        if($getEnemyActionDatas != false){
          foreach ($getEnemyActionDatas as $getActionData) {
            foreach ($mapEventDatas as $mapEventData) {
              if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                array_push($resultActionDatas,$getActionData);
              }
            }
          }
          $getEnemyMasterData['actions'] = $resultActionDatas;
        }
        $mergeArray = array();
        $mergeArray = array_merge($getEnemyMasterData,$mapCharaData);
        array_push($result,$mergeArray);
      }
    }
  }
  return $result;
}

//マップに配置されたNPC情報を取得する
function getMapNpcDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 2){ //NPCのタイプだった場合
      $sql = "SELECT * FROM npc_master WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_target_id']));
      $getNpcMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getNpcMasterData != false){
        //アクションの取得
        $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($mapCharaData['character_type'],$getNpcMasterData['id']));
        $getNpcActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultActionDatas = array(); //最終決定するアクションデータ
        if($getNpcActionDatas != false){
          foreach ($getNpcActionDatas as $getActionData) {
            foreach ($mapEventDatas as $mapEventData) {
              if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                array_push($resultActionDatas,$getActionData);
              }
            }
          }
          $getNpcMasterData['actions'] = $resultActionDatas;
        }
        $mergeArray = array();
        $mergeArray = array_merge($getNpcMasterData,$mapCharaData);
        array_push($result,$mergeArray);
      }
    }
  }
  return $result;
}

//マップに配置された店情報を取得する
function getMapShopDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 3){ //店のタイプだった場合
      $sql = "SELECT * FROM shop_master WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_target_id']));
      $getShopMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getShopMasterData != false){
        //アクションの取得
        $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($mapCharaData['character_type'],$getShopMasterData['id']));
        $getShopActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultActionDatas = array(); //最終決定するアクションデータ
        if($getShopActionDatas != false){
          foreach ($getShopActionDatas as $getActionData) {
            foreach ($mapEventDatas as $mapEventData) {
              if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                array_push($resultActionDatas,$getActionData);
              }
            }
          }
          $getShopMasterData['actions'] = $resultActionDatas;
        }
        $mergeArray = array();
        $mergeArray = array_merge($getShopMasterData,$mapCharaData);
        array_push($result,$mergeArray);
      }
    }
  }
  return $result;
}

//マップに配置されたアイテム情報を取得する
function getMapFropItemDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 4){ //アイテムのタイプだった場合
      $sql = "SELECT * FROM drop_item_master WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_target_id']));
      $getDropItemMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getDropItemMasterData != false){
        //アクションの取得
        $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($mapCharaData['character_type'],$getDropItemMasterData['id']));
        $getDropItemActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultActionDatas = array(); //最終決定するアクションデータ
        if($getDropItemActionDatas != false){
          foreach ($getDropItemActionDatas as $getActionData) {
            foreach ($mapEventDatas as $mapEventData) {
              if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                array_push($resultActionDatas,$getActionData);
              }
            }
          }
          $getDropItemMasterData['actions'] = $resultActionDatas;
        }
        $mergeArray = array();
        $mergeArray = array_merge($getDropItemMasterData,$mapCharaData);
        array_push($result,$mergeArray);
      }
    }
  }
  return $result;
}

//マップに配置されたクエストボード情報を取得する
function getMapQuestBoardDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 5){ //クエストボードのタイプだった場合
      //アクションの取得
      $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_type'],$mapCharaData['character_target_id']));
      $getQuestBoardActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $resultActionDatas = array(); //最終決定するアクションデータ
      if($getQuestBoardActionDatas != false){
        foreach ($getQuestBoardActionDatas as $getActionData) {
          foreach ($mapEventDatas as $mapEventData) {
            if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
              array_push($resultActionDatas,$getActionData);
            }
          }
        }
        $getQuestBoardMasterData['actions'] = $resultActionDatas;
      }
      $mergeArray = array();
      $mergeArray = array_merge($getQuestBoardMasterData,$mapCharaData);
      array_push($result,$mergeArray);
    }
  }
  return $result;
}

//マップに配置されたパーティボード情報を取得する
function getMapPartyBoardDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 6){ //パーティボードのタイプだった場合
      //アクションの取得
      $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_type'],$mapCharaData['character_target_id']));
      $getPartyBoardActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $resultActionDatas = array(); //最終決定するアクションデータ
      if($getPartyBoardActionDatas != false){
        foreach ($getPartyBoardActionDatas as $getActionData) {
          foreach ($mapEventDatas as $mapEventData) {
            if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
              array_push($resultActionDatas,$getActionData);
            }
          }
        }
        $getPartyBoardMasterData['actions'] = $resultActionDatas;
      }
      $mergeArray = array();
      $mergeArray = array_merge($getPartyBoardMasterData,$mapCharaData);
      array_push($result,$mergeArray);
    }
  }
  return $result;
}

//マップに配置されたドア情報を取得する
function getMapDoorDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 7){ //ドアのタイプだった場合
      //アクションの取得
      $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_type'],$mapCharaData['character_target_id']));
      $getPartyBoardActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $resultActionDatas = array(); //最終決定するアクションデータ
      if($getPartyBoardActionDatas != false){
        foreach ($getPartyBoardActionDatas as $getActionData) {
          if($mapEventDatas != false){
            foreach ($mapEventDatas as $mapEventData) {
              if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                array_push($resultActionDatas,$getActionData);
              }
            }
          }
        }
        $getPartyBoardMasterData['actions'] = $resultActionDatas;
      }
      $mergeArray = array();
      $mergeArray = array_merge($getPartyBoardMasterData,$mapCharaData);
      array_push($result,$mergeArray);
    }
  }
  return $result;
}

//マップに配置されたモニュメント情報を取得する
function getMapMonumentDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 8){ //モニュメントのタイプだった場合
      $sql = "SELECT * FROM monument_master WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_target_id']));
      $getMonumentMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
      if($getMonumentMasterData != false){
        //アクションの取得
        $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($mapCharaData['character_type'],$mapCharaData['character_target_id']));
        $getMonumentActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $resultActionDatas = array(); //最終決定するアクションデータ
        if($getMonumentActionDatas != false){
          foreach ($getMonumentActionDatas as $getActionData) {
            if($mapEventDatas != false){
              foreach ($mapEventDatas as $mapEventData) {
                if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
                  array_push($resultActionDatas,$getActionData);
                }
              }
            }
          }
          $getMonumentMasterData['actions'] = $resultActionDatas;
        }
        $mergeArray = array();
        $mergeArray = array_merge($getMonumentMasterData,$mapCharaData);
        array_push($result,$mergeArray);
      }
    }
  }
  return $result;
}

//マップに配置されたギルドボード情報を取得する
function getMapGuildBoardDatas($conn,$mapCharacterList,$mapEventDatas){
  $result = array();
  foreach ($mapCharacterList as $mapCharaData) {
    if($mapCharaData['character_type'] == 9){ //ギルドボードのタイプだった場合
      //アクションの取得
      $sql = "SELECT * FROM action_master WHERE action_character_type=? AND action_character_target_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mapCharaData['character_type'],$mapCharaData['character_target_id']));
      $getGuildBoardActionDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
      $resultActionDatas = array(); //最終決定するアクションデータ
      if($getGuildBoardActionDatas != false){
        foreach ($getGuildBoardActionDatas as $getActionData) {
          foreach ($mapEventDatas as $mapEventData) {
            if($getActionData['action_map_event_trigger_id'] == $mapEventData['trigger_id']){ //正しいイベントのトリガーIDか
              array_push($resultActionDatas,$getActionData);
            }
          }
        }
        $getGuildBoardMasterData['actions'] = $resultActionDatas;
      }
      $mergeArray = array();
      $mergeArray = array_merge($getGuildBoardMasterData,$mapCharaData);
      array_push($result,$mergeArray);
    }
  }
  return $result;
}

//マップのイベントデータを取得
function getMapEventData($conn,$mapEventId){
  $result = false;
  $sql = "SELECT * FROM map_event_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapEventId));
  $getMapEventMaster = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getMapEventMaster != false){
    $sql = "SELECT * FROM map_event_trigger WHERE map_event_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($getMapEventMaster['id']));
    $getMapEventDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $result = $getMapEventDatas;
  }
  return $result;
}

//マップイベントトリガーデータを取得
function getMapEventTriggerData($conn,$mapEventTriggerId){
  $sql = "SELECT * FROM map_event_trigger WHERE trigger_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($mapEventTriggerId));
  $getMapEventTriggerData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getMapEventTriggerData;
}

//クライアントから開始されたイベントデータの種類を受け取り、指定のイベントデータを生成する。
function setMapEventData($conn,$triggerEventType,$triggerTargetId){
  $result = false;
  switch ((int)$triggerEventType) {
    case 1: //会話イベント(主眼)
    {
      $result = loadCommXml($conn,$triggerTargetId,true);
    }
      break;
    case 2: //会話イベント(通常)
    {
      $result = loadCommXml($conn,$triggerTargetId,true);
    }
      break;
    default:
      break;
  }
  return $result;
}

//マップのインスタンスを生成する。
function createPlayerMapInstance($conn,$playerIndexId,$mapId,$startEnemyPower){
  try{
    $conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO player_map_instance (player_index_id, map_id, enemy_power)
    SELECT :player_index_id, :map_id, :enemy_power FROM dual WHERE NOT EXISTS ( SELECT player_index_id, map_id FROM player_map_instance
      WHERE player_index_id= :player_index_id AND map_id = :map_id)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':map_id', $mapId, PDO::PARAM_INT);
    $stmt->bindParam(':enemy_power', $startEnemyPower, PDO::PARAM_INT);
    $stmt->execute();
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    $result = false;
  }
}

function checkMapInstance($conn,$playerIndexId,$mapId){ //解放済みのマップかチェックを行う
  $result = false;
  $sql = "SELECT * FROM player_map_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));
  $getMapCharaData = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getMapCharaData != false){
    $result = true;
  }
  return $result;
}

//キャラクターの状態を作成する。
function insertPlayerMapCharacterStatus($conn,$mapCharaArrayIndex,$playerIndexId,$mapId,$statusId){
  try{
    $conn->beginTransaction(); //トランザクション開始
    $stmt = $conn -> prepare("INSERT INTO player_map_character_status (player_index_id, map_id, status_id, map_chara_array_index)
    SELECT :player_index_id, :map_id, :status_id, :map_chara_array_index FROM dual WHERE NOT EXISTS
    ( SELECT player_index_id, map_id, status_id, map_chara_array_index FROM player_map_character_status
      WHERE player_index_id= :player_index_id AND map_id= :map_id AND status_id= :status_id AND map_chara_array_index= :map_chara_array_index)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':map_id', $mapId, PDO::PARAM_INT);
    $stmt->bindParam(':status_id', $statusId, PDO::PARAM_INT);
    $stmt->bindParam(':map_chara_array_index', $mapCharaArrayIndex, PDO::PARAM_INT);
    $stmt->execute();
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }
}

//1:キャラクターがマスターデータから存在するかチェック 2:存在すれば、対象のキャラ 情報をplayer_map_character_statusから取得 3:キャラクターの状態から、指定のアクションができるか判定する。

//指定したマップに配置されたキャラクターから照合情報を取得する
function getMapCharacterCheckData($conn,$loadMapData,$characterId,$objectArrayIndex){
  $result = array();
  $tsxStartGid = -1;
  if(isset($loadMapData['map_tsx_infos'])){
    foreach ($loadMapData['map_tsx_infos'] as $tsxInfo) {
      if($tsxInfo['tsx_name'] == "character.tsx"){ //キャラクターのtsx情報だった場合
        $tsxStartGid = $tsxInfo['tsx_start_gid'];
      }
    }
  }
  if($tsxStartGid != -1){
    for($i=0; $i < count($loadMapData['mapLayers']); $i++){
      if($loadMapData['mapLayers'][$i]['layerName'] == "layer_character"){ //キャラクターレイヤーの場合
        $mapData = $loadMapData['mapLayers'][$i]['mapData'];
        for($m=0; $m < count($mapData); $m++){
          if($mapData[$m] != 0){
            $getCharacterId = ($mapData[$m] - $tsxStartGid); //キャラクターIDを取得
            if($characterId == $getCharacterId && $m == $objectArrayIndex){ //キャラクターと一致した場合
              //以下照合情報
              $result['map_id'] = $loadMapData['map_id'];
              $result['map_chara_array_index'] = $m;
              $result['charaChipIndex'] = $getCharacterId; //キャラクターのキャラセットチップのインデックス
              $result['charaPosIndex'] = $objectArrayIndex;
              $actionDataAndMapCharaData = checkCharaAction($conn,$result); //キャラクターのアクションデータとマップキャラデータをテーブルから取得
              $result = array_merge($result,$actionDataAndMapCharaData);
              break 2;
            }
          }
        }
      }
    }
  }
  return $result;
}


function checkCharaAction($conn,$character){ //クライアントから送られて来たキャラ情報がマスターデータと一致しているかチェックする。
  $result = false;
  if($character != null){
    $sql = "SELECT * FROM map_character_list_master WHERE chip_index=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($character['charaChipIndex']));
    $getMapCharaData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($getMapCharaData != false){

      $sql = "SELECT * FROM action_master LEFT JOIN map_event_trigger ON action_master.action_map_event_trigger_id = map_event_trigger.trigger_id WHERE action_character_type=? AND action_character_target_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($getMapCharaData['character_type'],$getMapCharaData['character_target_id']));
      $getActionMaster = $stmt->fetchAll(PDO::FETCH_ASSOC);

      if($getActionMaster != false){
        $result = array();
        $result['action'] = $getActionMaster;
        $result['map_chara_master'] = $getMapCharaData;
      }
    }
  }
  return $result;
}

function charaActionConroller($conn,$playerInfo,$checkCharaData,$exeActionId,$env,$redis){ //キャラクターのアクションを実行する。※必ず検証済みのキャラデータを引数に指定すること。
  $result = array();
  $result['is_error'] = false; //エラーがあるか
  $result['error_code'] = 0;
  $result['error_comment'] = "";
  //アクションチェック
  $mapEventTriggerData = false;
  for ($i=0; $i < count($checkCharaData['action']); $i++) {
    if($checkCharaData['action'][$i]['trigger_event_type'] == $exeActionId){
      $mapEventTriggerData = $checkCharaData['action'][$i];
    }
  }

  if($checkCharaData != null && $checkCharaData != false && $mapEventTriggerData != false){
    switch ((int)$exeActionId) {
      case 1://会話(主眼)
      break;
      case 2://会話(通常)
      break;
      case 3://店
      {
        $result['shop_found'] = false;
        $shopMasterId = $mapEventTriggerData['trigger_target_id'];
        $shopMasterData = checkPlayerShopFlag($conn,$playerInfo,$shopMasterId); //利用可能な店かチェックする。
        //営業時間を調べる
        if(checkEquipItemSellTime($shopMasterData) == true){
          updatePlayerPurchaseFlag($conn,$playerInfo);//最新の購入可能商品を更新
          $playerPurchaseFlags = getPlayerPurchaseFlags($conn,$playerInfo['player_index_id']); //購入可能フラグを取得
          if($shopMasterData != false){
            $result['shop_master_data'] = $shopMasterData;
            //ショップに設定されている会話データを取得
            $shopCommResult = loadCommXml($conn,$result['shop_master_data']['shop_comm_id'],true);
            $result['shop_comm_result'] = $shopCommResult;
            //販売されている装備品データを取得
            $getShopSellEquipItems = getShopSellEquipItemDatas($conn,$shopMasterId);
            $result['shop_sell_equip_items'] = replacePlayerSellItems($playerPurchaseFlags,$getShopSellEquipItems);
            //販売されているカードデータを取得
            $getShopSellCardItems = getShopSellCardItemDatas($conn,$shopMasterId);
            $result['shop_sell_card_items'] = replacePlayerSellItems($playerPurchaseFlags,$getShopSellCardItems);
            //販売されている通貨データを取得
            $getShopSellItems = getShopSellItemDatas($conn,$shopMasterId);
            $result['shop_sell_items'] = replacePlayerSellItems($playerPurchaseFlags,$getShopSellItems);
            $result['shop_found'] = true;
          }
          else{
            $result['is_error'] = true;
            $result['error_code'] = "ショップの情報取得に失敗しました。";
          }
        }
        else{
          $result['is_error'] = true;
          $result['error_code'] = "ショップの情報取得に失敗しました。";
        }
      }
      break;
      case 4://アイテム獲得
      {
        $result['item_drop_check'] = false;
        $result['drop_item_datas'] = null;
        $checkGetItem = checkGetItem($conn,$playerInfo['player_index_id'],$checkCharaData); //アイテムが取得可能かチェックする。
        if($checkGetItem == true){ //アイテム獲得可能
          if($mapEventTriggerData != false){
            $triggerEventType = $mapEventTriggerData['trigger_event_type']; //イベントタイプ
            $triggerTargetId = $mapEventTriggerData['trigger_target_id']; //イベントターゲットID
            insertPlayerMapCharacterStatus($conn,$checkCharaData['map_chara_array_index'],$playerInfo['player_index_id'],$checkCharaData['map_id'],0);
          }
          //アイテム獲得の処理
          $result['item_drop_check'] = true;
          $result['drop_item_datas'] = array();
          getDropItems($conn,$mapEventTriggerData['trigger_target_id'],$playerInfo,100,$result['drop_item_datas']);
        }
      }
      break;
      case 5://戦闘イベント
      {
        $mapId = -1;
        if(isset($checkCharaData['map_id'])) $mapId = $checkCharaData['map_id'];
        $mapMasterData = getMapMasterData($conn,$mapId);
        $mapCharaArrayIndex = -1;
        if(isset($checkCharaData['map_chara_array_index'])) $mapCharaArrayIndex = $checkCharaData['map_chara_array_index'];
        $mapCharaArrayIndex = $checkCharaData['map_chara_array_index'];
        $result['battle_event_check'] = false;
        $result['battle_event_datas'] = null;
        $enemySearchId = $mapEventTriggerData['trigger_target_id']; //敵検索IDを取得
        $getPlayerMapInstance = getPlayerMapInstance($conn,$playerInfo['player_index_id'],$mapId);
        $enemySearch = exeEnemySearch($conn,$enemySearchId,$getPlayerMapInstance['enemy_power']);
        if($enemySearch['enemy_party'] == null || $enemySearch['enemy_ids'] == ""){
          $result['is_error'] = true;
          $result['error_code'] = 3; //一致する敵が存在しなかった。
        }
        if($result['error_code'] != 3 && $getPlayerMapInstance != false){ //敵データ,マップ情報が存在した
          //インスタンスを生成
          //プレイヤーパーティデータとパーティメンバーを取得
          $getPlayerPartyData = getPlayerParty($conn,$playerInfo['player_party_index_id']);
          $getPlayerPartyMember = getPartyMemberPlayerDatas($conn,$playerInfo['player_party_index_id']);
          $partyMemberPlayerIndexIds = "";
          $playerCheck = false; //自分がパーティメンバーの中に存在しているか？。
          foreach ($getPlayerPartyMember as $playerInfoRow) {
            if($playerInfoRow['player_index_id'] == $playerInfo['player_index_id']) $playerCheck = true;
            if($partyMemberPlayerIndexIds == "") $partyMemberPlayerIndexIds = $playerInfoRow['player_index_id'];
            else $partyMemberPlayerIndexIds = $partyMemberPlayerIndexIds.",".$playerInfoRow['player_index_id'];
          }
          if($playerCheck == true && $getPlayerPartyData != false){
            $appDefine = new AppDefine($env);
            //戦闘結果設定データ作成
            $battleResultSettingParam = array();
            $battleResultSettingParam['map'] = array();
            $battleResultSettingParam['map']['enemy_character_data'] = $checkCharaData;
            $battleResultSettingParam['map']['map_master_data'] = $mapMasterData;

            $battleResultSetting = new BattleResultSetting($battleResultSettingParam);
            $resultInstance = insertPlayerBattleInstance($conn,$playerInfo['player_index_id'],$partyMemberPlayerIndexIds,$getPlayerPartyData,$enemySearch['enemy_ids'],$enemySearch['enemy_party'],$mapMasterData['battle_event_id'],$appDefine,$redis,$battleResultSetting); //バトルインスタンスを生成
            if($resultInstance['insert_id'] != -1 && $resultInstance['battle_instance_id'] != -1 && $resultInstance['error'] == 0){ //正常なインスタンスID
              $result['battle_event_check'] = true;
              $result['battle_event_datas'] = array();
              $result['battle_event_datas']['battle_instance_id'] = $resultInstance['battle_instance_id'];
              $result['battle_event_datas']['id'] = $resultInstance['insert_id'];
              //$result['battle_event_datas']['enemy_index_id'] = $enemyMasterData['enemy_party_index_id'];
              //$result['battle_event_datas']['map_chara_array_index'] = $mapCharaArrayIndex;
              //$result['battle_event_datas']['chara_map_chip_index'] = $checkCharaData['charaChipIndex'];
              //$result['battle_event_datas']['map_id'] = $mapId;
            }
            else{
              $result['is_error'] = true;
              $result['error_code'] = 1; //戦闘情報が不正だった。
              if($resultInstance['error'] != 0) $result['error_code'] = $resultInstance['error'];
              var_dump($resultInstance);
            }
          }
        }
      }
      case 6: //クエストボードイベント
      {

      }
      break;
      case 7: //パーティボードイベント
      {

      }
      break;
      case 8: //ドアイベント
      {
        $doorMasterId = $mapEventTriggerData['trigger_target_id']; //ドアのIDを取得
        $doorMasterData = getDoorMasterData($conn,$doorMasterId); //ドアのマスターデータを取得
        if($doorMasterData != false){
          $result['door_master_data'] = $doorMasterData; //ドアマスターデータを取得
          if($result['door_master_data']['open_item_type'] != 0){ //施錠されたドアの場合
            //解錠可能か確認
            $openCheck = checkLockDoor($conn,$playerInfo['player_index_id'],$result['door_master_data']['open_item_type'],$result['door_master_data']['open_item_id']);
            $result['lock_open'] = $openCheck;
          }
        }
        else{
          $result['is_error'] = true;
          $result['error_code'] = 1; //ドアのマスターデータが存在していない
        }
      }
      break;
      case 10: //モニュメント
      {
        $monumentMatserId = $mapEventTriggerData['trigger_target_id']; //モニュメントのIDを取得
        $monumentMasterData = getMonumentMasterData($conn,$monumentMatserId);
        $playerAttribute = getPlayerAttribute($conn,$playerInfo['player_index_id'],$monumentMasterData['attribute_category_id']);
        $attributeColumnName = "attribute_".$monumentMasterData['attribute_category_id'];
        if($monumentMasterData != false && $playerAttribute != false && isset($playerAttribute[$attributeColumnName])){ //正常
          $result['monument_master_data'] = $monumentMasterData;
          $result['player_attribute'] = $playerAttribute;
        }
        else{
          $result['is_error'] = true;
          $result['error_code'] = 1; //モニュメントのマスターデータが存在していないか、プレイヤーの属性情報が存在しない
        }
      }
      break;
      default:
      break;
    }
  }
  return $result;
}

//アイテム獲得によるstatusIdの振る舞い カラム無し:獲得可能 カラムあり:獲得不可能
function checkGetItem($conn,$playerIndexId,$checkCharaData){
  $result = false;
  //インスタンスチェック
  $sql = "SELECT * FROM player_map_instance WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$checkCharaData['map_id']));
  $getPlayerMapInstance = $stmt->fetch(PDO::FETCH_ASSOC);

  if($getPlayerMapInstance != false){ //インスタンスが存在した。
    $sql = "SELECT * FROM player_map_character_status WHERE map_chara_array_index=? AND player_index_id=? AND map_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($checkCharaData['map_chara_array_index'],$playerIndexId,$checkCharaData['map_id']));
    $getMapCharaStatus = $stmt->fetch(PDO::FETCH_ASSOC);
    if($getMapCharaStatus == false){ //キャラクターが居なかった場合、取得可能
      $result = true;
    }
  }
  return $result;
}

//戦闘開始可能かチェックして可能であれば指定のデータを返す
function checkBattleInfo($conn,$playerIndexId,$mapId,$mapCharaArrayIndex){
  $result = array();
  $result['is_error'] = true; //エラー
  $result['instance_id'] = 0;
  //既にバトルが開始されている敵かチェックを行う
  $sql = "SELECT * FROM player_battle_instance WHERE player_index_id=? AND map_id=? AND map_chara_array_index=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId,$mapCharaArrayIndex));
  $getPlayerBattleInstance = $stmt->fetch(PDO::FETCH_ASSOC);
  if($getPlayerBattleInstance != false){ //インスタンスは存在した。
    if($getPlayerBattleInstance['battle_step'] == 1){ //戦闘が開始された状態の場合
      $result['is_error'] = false; //正常
      $result['instance_id'] = $getPlayerBattleInstance['id']; //戦闘開始状態のため、インスタンスIDを挿入
    }
    else{ //戦闘が始まった後だった。
      $result['is_error'] = true; //エラー
    }
  }
  else{ //既存のインスタンスが無かった場合
    $result['is_error'] = false; //正常
  }
  return $result;
}

//プレイヤーのマップキャラクター情報を取得する。
function getPlayerMapCharacterStatus($conn,$playerIndexId,$mapId){
  $sql = "SELECT * FROM player_map_character_status WHERE player_index_id=? AND map_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$mapId));
  $getPlayerMapCharacterStatusDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getPlayerMapCharacterStatusDatas;
}

//エリアIDからエリアインスタンスデータを取得
function getAreaInstanceForAreaId($conn,$areaId){
  $sql = "SELECT * FROM area_instance WHERE area_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($areaId));
  $getAreaInstanceData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getAreaInstanceData;
}
