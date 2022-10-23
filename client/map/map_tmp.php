<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/message/index.php';
include_once '../../module/story/index.php';
include_once '../../module/comm/index.php';
include_once '../../module/battle/index.php';
include_once '../../module/battle/battleAction.php';
include_once '../../module/battle/battleBuff.php';
include_once '../../module/battle/battleEntryData.php';
include_once '../../module/battle/battleInstance.php';
include_once '../../module/battle/battleLog.php';
include_once '../../module/battle/battlePartyInstance.php';
include_once '../../module/battle/effectArea.php';
include_once '../../module/battle/action.php';
include_once '../../module/battle/addAction.php';
include_once '../../module/battle/battleInstanceControle.php';
include_once '../../module/battle/autoAction.php';
include_once '../../module/battle/createBattleInstance.php';
include_once '../../module/battle/battleInstancePermission.php';
include_once '../../module/battle/battleResultSetting.php';
include_once '../../module/battle/multiPlayerInstance.php';
include_once '../../module/pvp/index.php';
include_once '../../module/shop/index.php';
include_once '../../module/card/index.php';
include_once '../../module/purchase/index.php';
include_once '../../module/enemy/index.php';
include_once '../../module/map/index.php';
include_once '../../module/party/index.php';
include_once '../../module/area/index.php';
include_once '../../module/quest/index.php';
include_once '../../module/door/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/chat/index.php';
include_once '../../module/playerRoom/index.php';
include_once '../../module/stamp/index.php';
include_once '../../module/monument/index.php';
include_once '../../module/duel/index.php';
include_once '../../module/formation/index.php';
include_once '../../module/skill/index.php';
include_once '../../module/karma/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/redisConnect/index.php';
include_once "../../module/card/cardData.php";
include_once "../../module/card/prizeCardData.php";
include_once "../../module/skill/skillData.php";
include_once "../../module/buff/buffData.php";
include_once "../../module/buff/index.php";
include_once "../../module/playerCard/PlayerCardData.php";


$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り

updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('server_request_dttm' => date("Y/m/d H:i:s"));
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
$MAP_SCENE_ERROR = array();
$MAP_SCENE_ERROR['error'] = 0;
$MAP_SCENE_ERROR['error_comment'] = "";
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['set_map_id']) && isset($_POST['check_story_id'])){ //選択されたマップ
    if(isset($_POST['area_mode']) && $_POST['area_mode'] == 0){ //プレイヤーストーリー専用エリア
      $playerAreaInstance = getPlayerStoryAreaInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_map_id'],$_POST['check_story_id']);
    }
    else if(isset($_POST['area_mode']) && $_POST['area_mode'] == 1){ //オープンワールドエリア
      $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
    }
    else{
      //エラー
      $MAP_SCENE_ERROR['error'] = 3;
      $MAP_SCENE_ERROR['error_comment'] = "エリアモードの選択に失敗しました。";
    }
    if($playerAreaInstance != false)
    { //現在居るエリアか
      $storyId = $playerAreaInstance['story_id'];
      $mapId = $playerAreaInstance['map_id'];
      $checkOpenMap = checkPlayerOpenMap($pdo,$PLAYER_INFO['player_index_id'],$storyId,$mapId);
      if($checkOpenMap == true){
        $getMapMasterData = getMapMasterData($pdo,$mapId);
        $RESULT_JSON = $RESULT_JSON + array('result_map_master_data' => $getMapMasterData); //マップマスターデータ
        $RESULT_JSON = $RESULT_JSON + array('result_story_master_id' => $storyId); //ストーリーマスターID
        $getPlayerMapInstance = getPlayerMapInstance($pdo,$PLAYER_INFO['player_index_id'],$mapId);
        if($getPlayerMapInstance == false){ //プレイヤーのマップインスタンスが無ければ生成
          createPlayerMapInstance($pdo,$PLAYER_INFO['player_index_id'],$mapId,$getMapMasterData['start_enemy_power']);
          $getPlayerMapInstance = getPlayerMapInstance($pdo,$PLAYER_INFO['player_index_id'],$mapId);
        }
        $mapEventDatas = false; //マップイベントデータ
        if($getMapMasterData != false){
          $mapEventDatas = getMapEventData($pdo,$getMapMasterData['map_event_id']);
          $RESULT_JSON = $RESULT_JSON + array('result_map_event_datas' => $mapEventDatas); //マップで発生するイベントデータ
        }
        $RESULT_JSON = $RESULT_JSON + array('result_player_map_instance' => $getPlayerMapInstance); //プレイヤーマップインスタンス
        $getAreaInstance = getAreaInstanceSelectMapId($pdo,$mapId); //エリアインスタンスがあれば取得
        $RESULT_JSON = $RESULT_JSON + array('result_area_instance' => $getAreaInstance); //ワールドエリアマップインスタンス
        $resultMapData = loadMapXml($mapId);
        $RESULT_JSON = $RESULT_JSON + array('result_map_data' => $resultMapData); //ロードするマップ情報
        $resultMapActiveCharacterIds = getMapActiveCharacterIds($pdo,$resultMapData);
        $RESULT_JSON = $RESULT_JSON + array('result_map_active_character_ids' => $resultMapActiveCharacterIds);//マップに出現するキャラクターID
        $mapCharacterList = getMapCharacterList($pdo,$resultMapActiveCharacterIds); //マップに配置されたキャラクター情報を取得
        $mapEnemyDatas = getMapEnemyDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_enemy_datas' => $mapEnemyDatas); //マップに配置された敵のマスターデータ
        $mapNpcDatas = getMapNpcDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_npc_datas' => $mapNpcDatas); //マップに配置されたNpcのマスターデータ
        $mapShopDatas = getMapShopDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_shop_datas' => $mapShopDatas); //マップに配置された店のマスターデータ
        $mapDropItemDatas = getMapFropItemDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_drop_item_datas' => $mapDropItemDatas); //マップに配置されたアイテムのマスターデータ
        $mapQuestBoardDatas = getMapQuestBoardDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_quest_board_datas' => $mapQuestBoardDatas); //マップに配置されたクエストボードのマスターデータ
        $mapPartyBoardDatas = getMapPartyBoardDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_party_board_datas' => $mapPartyBoardDatas); //マップに配置されたパーティボードのマスターデータ
        $mapMonumentDatas = getMapMonumentDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_monument_datas' => $mapMonumentDatas); //マップに配置されたモニュメントのマスターデータ
        $mapDoorDatas = getMapDoorDatas($pdo,$mapCharacterList,$mapEventDatas);
        $RESULT_JSON = $RESULT_JSON + array('result_map_door_datas' => $mapDoorDatas); //マップに配置されたドアのマスターデータ
        $playerItemData = getPlayerItemDataAll($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_item_data' => $playerItemData); //通貨情報を取得
        $playerEquipItemData = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_equip_item_data' => $playerEquipItemData); //装備アイテム情報を取得
        $playerCardData = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_card_data' => $playerCardData); //カード情報を取得
        $playerMapCharacterDatas = getPlayerMapCharacterStatus($pdo,$PLAYER_INFO['player_index_id'],$mapId);
        $RESULT_JSON = $RESULT_JSON + array('result_player_map_character_datas' => $playerMapCharacterDatas); //プレイヤーのマップキャラクター情報
        $playerStampData = getPlayerStamp($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_stamp_data' => $playerStampData); //所持スタンプデータを取得
      }
      else{ //エラー マップが解放されていない
        $MAP_SCENE_ERROR['error'] = 1;
        $MAP_SCENE_ERROR['error_comment'] = "未解放のマップが選択されました。";
      }
    }
    else{ //エラー現在居ないマップ
      $MAP_SCENE_ERROR['error'] = 2;
      $MAP_SCENE_ERROR['error_comment'] = "現在地ではないエリアが選択されました。";
    }
  }
  else{ //初期通信ではない場合
    if(isset($_POST['now_map_id'])){ //現在居るMAPのIDが設定されていた
      $mapMasterData = getMapMasterData($pdo,$_POST['now_map_id']);
      $getPlayerMapInstance = getPlayerMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['now_map_id']);
      $getAreaInstance = getAreaInstanceSelectMapId($pdo,$_POST['now_map_id']); //エリアインスタンスがあれば取得
      $resultNowEnemyPower = 0;
      if($mapMasterData != false && $getPlayerMapInstance != false && isset($getPlayerMapInstance['enemy_power'])){
        $resultNowEnemyPower = $getPlayerMapInstance['enemy_power'];
        if($getAreaInstance != false && isset($getAreaInstance['enemy_power'])){
          $maxEnemyPower = $mapMasterData['max_enemy_power'];
          $resultNowEnemyPower = $getAreaInstance['enemy_power'];
          $resultEnemyPowerCondition = round(($resultNowEnemyPower / $maxEnemyPower) * 100);
          $RESULT_JSON = $RESULT_JSON + array('result_enemy_power_condition' => $resultEnemyPowerCondition); //現在の敵勢力の%を取得
        }
      }
    }
  }
  if(isset($_POST['set_trigger_event_type']) && isset($_POST['set_trigger_target_id'])){
    switch ((int)$_POST['set_trigger_event_type']) {
      case 1: //会話イベント(主眼)
      {
        $commResult = setMapEventData($pdo,$_POST['set_trigger_event_type'],$_POST['set_trigger_target_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_event_comm_data' => $commResult); //イベント会話データ
      }
      break;
      case 2: //会話イベント(通常)
      {
        $commResult = setMapEventData($pdo,$_POST['set_trigger_event_type'],$_POST['set_trigger_target_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_event_comm_data' => $commResult); //イベント会話データ
      }
      break;
      case 3: //店イベント
      {
        $shopResult = false;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $resultShopCheck = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $resultShopCheck = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
            }
            if($resultShopCheck['shop_found'] == true){ //店が存在した。
              $shopResult = $resultShopCheck;
            }
            else{
              $shopClose = array();
              $shopClose['shop_found'] = false;
              $shopResult = $shopClose;
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_event_shop_data' => $shopResult); //店データ
        if(isset($_POST['player_purchase_item_type']) && isset($_POST['player_purchase_item_master_id'])){ //何か購入した場合
          $purchaseCheck = false;
          if($shopResult != false){ //購入可能な状態かチェック
            $purchaseCheck = checkSellItem($pdo,$PLAYER_INFO,$_POST['player_purchase_item_type'],$_POST['player_purchase_item_master_id'],$shopResult); //購入可能な商品かチェック
            //通貨に変更があった場合のために、インベントリの最新情報を取得する。
            $updatePlayerItemData = getPlayerItemDataAll($pdo,$PLAYER_INFO['player_index_id']);
            $RESULT_JSON = $RESULT_JSON + array('result_update_player_item_data' => $updatePlayerItemData); //通貨の最新データ
            //装備アイテムに変更があった場合のため、インベントリの最新情報を取得する。
            $updatePlayerEquipItem = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
            $RESULT_JSON = $RESULT_JSON + array('result_update_player_equip_item_data' => $updatePlayerEquipItem); //装備アイテムの最新データ
            //カードインベントリーに変更があった場合のため、インベントリの最新情報を取得する。
            $updatePlayerCardData = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']);
            $RESULT_JSON = $RESULT_JSON + array('result_update_player_card_data' => $updatePlayerCardData); //カードの最新データ
          }
          $RESULT_JSON = $RESULT_JSON + array('result_purchase_item' => $purchaseCheck); //アイテム獲得イベントデータ
        }
      }
      break;
      case 4: //アイテム獲得イベント
      {
        $itemDropResult = "アイテム獲得失敗";
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $dropItem = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
            }
            if($dropItem['item_drop_check'] == true){
              $itemDropResult = $dropItem['drop_item_datas'];
            }
            else{
              $itemDropResult = "アイテム獲得失敗";
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_event_item_drop_data' => $itemDropResult); //アイテム獲得イベントデータ
        //通貨に変更があった場合のために、インベントリの最新情報を取得する。
        $updatePlayerItemData = getPlayerItemDataAll($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_update_player_item_data' => $updatePlayerItemData); //通貨の最新データ
        //装備アイテムに変更があった場合のため、インベントリの最新情報を取得する。
        $updatePlayerEquipItem = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_update_player_equip_item_data' => $updatePlayerEquipItem); //装備アイテムの最新データ
        //カードインベントリーに変更があった場合のため、インベントリの最新情報を取得する。
        $updatePlayerCardData = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_update_player_card_data' => $updatePlayerCardData); //カードの最新データ
      }
      break;
      case 5: //バトルイベント
      {
        $battleEventResult = "通信エラーが発生しました";
        $errorCode = -1;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $battleEvent = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
              if($battleEvent['battle_event_check'] == true && $battleEvent['is_error'] == false){ //正常
                $battleEventResult = $battleEvent['battle_event_datas'];
              }
              else{
                $errorCode = $battleEvent['error_code'];
                $battleEventResult = "通信エラーが発生しました：エラーコード：".$errorCode;
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_battle_event_data' => $battleEventResult); //バトルイベントデータ
      }
      break;
      case 6: //クエストボード
      {
        $questDataResult = "通信エラーが発生しました";
        $errorCode = -1;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $questBoardEvent = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
              if($questBoardEvent['is_error'] == false){ //正常
                $playerAreaInstanceDatas = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
                $playerActiveQuestMasterDatas = getPlayerActiveQuestMasterDatas($pdo,$PLAYER_INFO,$playerAreaInstanceDatas);
                $questDropDatas = array();
                if($playerActiveQuestMasterDatas != null && count($playerActiveQuestMasterDatas) != 0){
                  foreach ($playerActiveQuestMasterDatas as &$questMasterData) {
                    //ドロップデータを挿入
                    $addQuestDrop = getQuestDropData($pdo,$questMasterData);
                    array_push($questDropDatas,$addQuestDrop);
                    //クエスト達成条件を追加
                    $questMasterData['quest_condition'] = array();
                    $questMasterData['quest_condition'] = getQuestCondition($pdo,$PLAYER_INFO['player_index_id'],$questMasterData);
                  }
                  unset($questMasterData);
                }
                $playerQuestDatas = getPlayerQuestDataAll($pdo,$PLAYER_INFO['player_index_id']);
                $questDataResult = array(); //通信結果用のリザルトを表示
                $questDataResult['player_area_instance'] = $playerAreaInstanceDatas;
                $questDataResult['player_active_quest_master_datas'] = $playerActiveQuestMasterDatas;
                $questDataResult['player_quest_datas'] = $playerQuestDatas;
                $questDataResult['quest_drop_datas'] = $questDropDatas;
              }
              else{
                $errorCode = $questBoardEvent['error_code'];
                $questDataResult = "通信エラーが発生しました：エラーコード：".$errorCode;
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_quest_datas' => $questDataResult); //プレイヤーのクエストデータを取得
      }
      break;
      case 7: //パーティボード
      {
        $partyDataResult = array();
        $partyDataResult['error'] = -999;
        $partyDataResult['error_comment'] = "不明なエラー";
        $errorCode = -1;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $partyBoardEvent = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
              if($partyBoardEvent['is_error'] == false){ //正常
                $partyDataResult['error'] = 0;
                $partyDataResult['error_comment'] = "";
              }
              else{
                $errorCode = $questBoardEvent['error_code'];
                $partyDataResult['error'] = $errorCode;
                $partyDataResult['error_comment'] = "マップデータの取得に失敗しました";
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_party_datas' => $partyDataResult); //プレイヤーのクエストデータを取得
      }
      break;
      case 8: //ドア
      {
        $doorDataEventResult = array();
        $doorDataEventResult['error'] = -999;
        $doorDataEventResult['error_comment'] = "不明なエラー";
        $errorCode = -1;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $doorEvent = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
              if($doorEvent['is_error'] == false && isset($doorEvent['door_master_data'])){ //正常
                $doorDataEventResult['error'] = 0;
                $doorDataEventResult['error_comment'] = "";
                $doorDataEventResult['door_master_data'] = $doorEvent['door_master_data']; //ドアのマスターデータを取得
                if(isset($doorEvent['lock_open'])) $doorDataEventResult['lock_open'] = $doorEvent['lock_open']; //ドアのマスターデータを取得
              }
              else{
                $errorCode = $questBoardEvent['error_code'];
                $doorDataEventResult['error'] = $errorCode;
                $doorDataEventResult['error_comment'] = "マップデータの取得に失敗しました";
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_door_event_data' => $doorDataEventResult); //プレイヤーのクエストデータを取得
      }
      break;
      case 9: //プレイヤールームイベント
      {
        //$commResult = setMapEventData($pdo,$_POST['set_trigger_event_type'],$_POST['set_trigger_target_id']);
        if(isset($_POST['check_point']) && isset($_POST['map_event_master_id']) && isset($_POST['room_pos']) && isset($_POST['check_avatar_datas'])){
          $checkEventTriggerData = checkPlayerRoomEventTrigger($pdo,$_POST['map_event_master_id'],$_POST['set_trigger_event_type'],$_POST['set_trigger_target_id'],$_POST['check_point']['check_point_pos_x'],$_POST['check_point']['check_point_pos_y']);
          if($checkEventTriggerData != false){ //正しいイベントデータが存在した場合
            $getMyAvatarData = getPlayerAvatarData($pdo,$PLAYER_INFO['player_index_id']);
            updatePlayerRoom($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_MASTER['player_name'],$checkEventTriggerData['trigger_id'],$_POST['room_pos']['room_pos_x'],$_POST['room_pos']['room_pos_y'],$getMyAvatarData['avatar_hash']);
            $resultEventPlayerRoomData = array();
            $resultEventPlayerRoomData['map_event_trigger'] = $checkEventTriggerData;
            $playerRoomDatas = getPlayerRoomDatas($pdo,$checkEventTriggerData['trigger_id']);
            $resultEventPlayerRoomData['player_room_datas'] = $playerRoomDatas;
            //プレイヤールームのチャットログを取得
            $playerRoomChatLogs = getPlayerRoomChatLogs($pdo,$checkEventTriggerData['trigger_id'],30);
            $resultEventPlayerRoomData['player_room_chat_logs'] = $playerRoomChatLogs;
            //クライアント側で読み込まれていないアバターデータを取得
            $checkAvatarDatas = false;
            $addAvatarDatas = array();
            if(is_array($_POST['check_avatar_datas'])) $checkAvatarDatas = $_POST['check_avatar_datas']; //検証可能なデータかチェック
            if($checkAvatarDatas != false){
              foreach ($playerRoomDatas as $plRoomData) {
                $checkAvatar = false;
                foreach ($checkAvatarDatas as $checkPlAvatar) {
                  if($plRoomData['player_avatar_hash'] == $checkPlAvatar['player_avatar_data']['avatar_hash']){
                    $checkAvatar = true;
                    break;
                  }
                }
                if($checkAvatar == false){ //一致するアバターが存在しなかった場合
                  $getPlayerAvatarData = getPlayerAvatarData($pdo,$plRoomData['player_index_id']);
                  $getPlayerEquipItemDatas = getPlayerEquipItemAndMasterData($pdo,$plRoomData['player_index_id']);
                  if($getPlayerAvatarData != false && $getPlayerEquipItemDatas != false){
                    $resultAvatarData = array();
                    $resultAvatarData['player_avatar_data'] = $getPlayerAvatarData;
                    $resultAvatarData['player_equip_item_datas'] = $getPlayerEquipItemDatas;
                    array_push($addAvatarDatas,$resultAvatarData); //読み込むアバターを追加
                    //装備アセット読み込みの為、アセットタグを生成
                    foreach ($getPlayerEquipItemDatas as $equipItem) {
                      $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
                      if($equipAssetTag != ""){
                        if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
                        else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
                      }
                    }
                    //プレイヤーアバターアセットタグを追加
                    $playerAvatarAssetTag = getPlayerAvatarAssetTag($getPlayerAvatarData);
                    if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
                    else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
                  }
                }
              }
            }
            $resultEventPlayerRoomData['map_add_avatar_datas'] = $addAvatarDatas;
            $RESULT_JSON = $RESULT_JSON + array('result_event_player_room_data' => $resultEventPlayerRoomData); //プレイヤールームデータの結果
          }
        }
      }
      break;
      case 10: //モニュメント
      {
        $monumentDataResult = array();
        $monumentDataResult['error'] = -999;
        $monumentDataResult['error_comment'] = "不明なエラー";
        $errorCode = -1;
        if(isset($_POST['set_trigger_character_map_array_index']) && isset($_POST['set_trigger_character_map_chip_index']) && isset($_POST['check_map_id'])){ //アイテムとなるキャラクター情報
          $characterChipIndex = -1;
          $characterMapArrayIndex = -1;
          $characterMapArrayIndex = $_POST['set_trigger_character_map_array_index'];
          $characterChipIndex = $_POST['set_trigger_character_map_chip_index'];
          $dropItem = false;
          if($characterChipIndex != -1 && $characterMapArrayIndex != -1){
            $checkMapInstance = checkMapInstance($pdo,$PLAYER_INFO['player_index_id'],$_POST['check_map_id']);
            if($checkMapInstance == true){ //既に解放済みのマップかチェックを行う
              $resultMapData = loadMapXml($_POST['check_map_id']);
              $checkCharacter = getMapCharacterCheckData($pdo,$resultMapData,$characterChipIndex,$characterMapArrayIndex); //キャラクターチェック
              $monumentEvent = charaActionConroller($pdo,$PLAYER_INFO,$checkCharacter,$_POST['set_trigger_event_type'],$ENV,$redis);
              if($monumentEvent['is_error'] == false && isset($monumentEvent['monument_master_data']) && isset($monumentEvent['player_attribute'])){ //正常
                $monumentDataResult['monument_master_data'] = $monumentEvent['monument_master_data'];
                $monumentDataResult['player_attribute'] = $monumentEvent['player_attribute'];
                $monumentDataResult['error'] = 0;
                $monumentDataResult['error_comment'] = "";
              }
              else{
                $errorCode = $monumentEvent['error_code'];
                $monumentDataResult['error'] = $errorCode;
                $monumentDataResult['error_comment'] = "モニュメントデータの取得に失敗しました";
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_monument_event_data' => $monumentDataResult); //モニュメントデータを取得
      }
      break;
      default:
      break;
    }
  }
  if(isset($_POST['set_player_order_quest_id'])){ //受注クエスト情報が存在した。
    $resultQuestOrder = false; //クエストの受注に成功したか。
    $getQuestMasterData = getQuestMasterData($pdo,$_POST['set_player_order_quest_id']);
    if($getQuestMasterData != false){
      $playerAreaInstanceDatas = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
      $playerActiveQuestMasterDatas = getPlayerActiveQuestMasterDatas($pdo,$PLAYER_INFO,$playerAreaInstanceDatas);
      $resultQuestOrder = playerQuestOrder($pdo,$PLAYER_INFO,$playerAreaInstanceDatas,$getQuestMasterData);
      if($resultQuestOrder != false){
        $playerActiveQuestMasterDatas = getPlayerActiveQuestMasterDatas($pdo,$PLAYER_INFO,$playerAreaInstanceDatas);
        $questDropDatas = array();
        if($playerActiveQuestMasterDatas != null && count($playerActiveQuestMasterDatas) != 0){
          foreach ($playerActiveQuestMasterDatas as &$questMasterData) {
            //ドロップデータを挿入
            $addQuestDrop = getQuestDropData($pdo,$questMasterData);
            array_push($questDropDatas,$addQuestDrop);
            //クエスト達成条件を追加
            $questMasterData['quest_condition'] = array();
            $questMasterData['quest_condition'] = getQuestCondition($pdo,$PLAYER_INFO['player_index_id'],$questMasterData);
          }
          unset($questMasterData);
        }
        $playerQuestDatas = getPlayerQuestDataAll($pdo,$PLAYER_INFO['player_index_id']);
        $questDataResult = array(); //通信結果用のリザルトを表示
        $questDataResult['player_area_instance'] = $playerAreaInstanceDatas;
        $questDataResult['player_active_quest_master_datas'] = $playerActiveQuestMasterDatas;
        $questDataResult['player_quest_datas'] = $playerQuestDatas;
        $questDataResult['quest_drop_datas'] = $questDropDatas;
        $RESULT_JSON = $RESULT_JSON + array('update_quest_datas' => $questDataResult); //プレイヤーのアップデート用クエストデータを取得('result_quest_datas'と同じ)
        //受注後に開始されるイベントがあれば取得
        if(isset($getQuestMasterData['start_map_event_trigger_id']) && $getQuestMasterData['start_map_event_trigger_id'] != 0){
          $mapEventTriggerData = getMapEventTriggerData($pdo,$getQuestMasterData['start_map_event_trigger_id']);
          if($mapEventTriggerData != false) $RESULT_JSON = $RESULT_JSON + array('order_quest_start_map_event_trigger_data' => $mapEventTriggerData);
        }
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_player_order_quest' => $resultQuestOrder); //プレイヤーのクエストデータを取得
  }
  if(isset($_POST['set_clear_quest_master_id'])){ //クエスト報告が行われた
    $resultQuestClear = array();
    $resultQuestClear['drop_item_data'] = array();
    $resultQuestClear['error'] = true;
    $getQuestMasterData = getQuestMasterData($pdo,$_POST['set_clear_quest_master_id']);
    if($getQuestMasterData != false){
      $playerAreaInstanceDatas = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
      $resultQuestClear = questReport($pdo,$PLAYER_INFO,$playerAreaInstanceDatas,$getQuestMasterData);
    }
    $RESULT_JSON = $RESULT_JSON + array('result_player_quest_clear' => $resultQuestClear); //プレイヤーのクエスト報告結果を取得

    $playerActiveQuestMasterDatas = getPlayerActiveQuestMasterDatas($pdo,$PLAYER_INFO,$playerAreaInstanceDatas);
    $playerQuestDatas = getPlayerQuestDataAll($pdo,$PLAYER_INFO['player_index_id']);
    $questDropDatas = array();
    if($playerActiveQuestMasterDatas != null && count($playerActiveQuestMasterDatas) != 0){
      foreach ($playerActiveQuestMasterDatas as &$questMasterData) {
        //ドロップデータを挿入
        $addQuestDrop = getQuestDropData($pdo,$questMasterData);
        array_push($questDropDatas,$addQuestDrop);
        //クエスト達成条件を追加
        $questMasterData['quest_condition'] = array();
        $questMasterData['quest_condition'] = getQuestCondition($pdo,$PLAYER_INFO['player_index_id'],$questMasterData);
      }
      unset($questMasterData);
    }
    $questDataResult = array(); //通信結果用のリザルトを表示
    $questDataResult['player_area_instance'] = $playerAreaInstanceDatas;
    $questDataResult['player_active_quest_master_datas'] = $playerActiveQuestMasterDatas;
    $questDataResult['player_quest_datas'] = $playerQuestDatas;
    $questDataResult['quest_drop_datas'] = $questDropDatas;
    $RESULT_JSON = $RESULT_JSON + array('update_quest_datas' => $questDataResult); //プレイヤーのアップデート用クエストデータを取得('result_quest_datas'と同じ)
    //クリア後に開始されるイベントがあれば取得
    if(isset($getQuestMasterData['end_map_event_trigger_id']) && $getQuestMasterData['end_map_event_trigger_id'] != 0){
      $mapEventTriggerData = getMapEventTriggerData($pdo,$getQuestMasterData['end_map_event_trigger_id']);
      if($mapEventTriggerData != false) $RESULT_JSON = $RESULT_JSON + array('report_quest_end_map_event_trigger_data' => $mapEventTriggerData);
    }
  }
  if(isset($_POST['set_door_open_param'])){ //ドアの解錠が行われた
    $resultDoorOpen = array();
    if(isset($_POST['set_door_open_param']['open_item_type']) && isset($_POST['set_door_open_param']['open_item_id'])){
      $resultDoorOpen = lockDoorOpen($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_door_open_param']['open_item_type'],$_POST['set_door_open_param']['open_item_id']);
    }
    $RESULT_JSON = $RESULT_JSON + array('result_door_open' => $resultDoorOpen);
  }
  if(isset($_POST['set_my_avatar_data'])){ //自分のアバターデータを取得した。
    $getPlayerAvatarData = getPlayerAvatarData($pdo,$PLAYER_INFO['player_index_id']);
    $getPlayerEquipItemDatas = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
    if($getPlayerAvatarData != false){
      $resultAvatarData = array();
      $resultAvatarData['player_avatar_data'] = $getPlayerAvatarData;
      $resultAvatarData['player_equip_item_datas'] = array();
      if($getPlayerEquipItemDatas != false){
        $resultAvatarData['player_equip_item_datas'] = $getPlayerEquipItemDatas;

        //装備アセット読み込みの為、アセットタグを生成
        foreach ($getPlayerEquipItemDatas as $equipItem) {
          $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
          if($equipAssetTag != ""){
            if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
          }
        }
        //プレイヤーアバターアセットタグを追加
        $playerAvatarAssetTag = getPlayerAvatarAssetTag($getPlayerAvatarData);
        if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

      }
      $RESULT_JSON = $RESULT_JSON + array('set_my_avatar_data' => $resultAvatarData);
    }
  }
  if(isset($_POST['player_room_update'])){ //プレイヤールームの更新が行われた
    //ルームの位置を更新
    if(isset($_POST['player_room_update']['room_pos']) && isset($_POST['player_room_update']['map_event_trigger_id'])){
      $resultPlayerRoomUpdate = array();
      $mapEventTriggerId = $_POST['player_room_update']['map_event_trigger_id'];
      $setRoomPosX = $_POST['player_room_update']['room_pos']['room_pos_x'];
      $setRoomPosY = $_POST['player_room_update']['room_pos']['room_pos_y'];
      $setPlayerRoomChange = $_POST['player_room_update']['player_room_change'];
      $setAvatarActionData = false;
      if(isset($_POST['player_room_update']['avatar_action_data'])) $setAvatarActionData = $_POST['player_room_update']['avatar_action_data'];
      updatePlayerRoomPos($pdo,$PLAYER_INFO['player_index_id'],$mapEventTriggerId,$setRoomPosX,$setRoomPosY,$setAvatarActionData,$setPlayerRoomChange);
      //ルームに居るプレイヤーを取得
      $playerRoomDatas = getPlayerRoomDatas($pdo,$mapEventTriggerId);
      $resultPlayerRoomUpdate['player_room_datas'] = $playerRoomDatas;
      //プレイヤールームのチャットログをを取得
      $playerRoomChatLogs = getPlayerRoomChatLogs($pdo,$mapEventTriggerId,30);
      $resultPlayerRoomUpdate['player_room_chat_logs'] = $playerRoomChatLogs;
      //クライアント側で読み込まれていないアバターデータを取得
      $checkAvatarDatas = false;
      $addAvatarDatas = array();
      if(is_array($_POST['player_room_update']['check_avatar_datas'])) $checkAvatarDatas = $_POST['player_room_update']['check_avatar_datas']; //検証可能なデータかチェック
      if($checkAvatarDatas != false){
        foreach ($playerRoomDatas as $plRoomData) {
          $checkAvatar = false;
          foreach ($checkAvatarDatas as $checkPlAvatar) {
            if($plRoomData['player_avatar_hash'] == $checkPlAvatar['player_avatar_data']['avatar_hash']){
              $checkAvatar = true;
              break;
            }
          }
          if($checkAvatar == false){ //一致するアバターが存在しなかった場合
            $getPlayerAvatarData = getPlayerAvatarData($pdo,$plRoomData['player_index_id']);
            $getPlayerEquipItemDatas = getPlayerEquipItemAndMasterData($pdo,$plRoomData['player_index_id']);
            if($getPlayerAvatarData != false && $getPlayerEquipItemDatas != false){
              $resultAvatarData = array();
              $resultAvatarData['player_avatar_data'] = $getPlayerAvatarData;
              $resultAvatarData['player_equip_item_datas'] = $getPlayerEquipItemDatas;
              array_push($addAvatarDatas,$resultAvatarData); //読み込むアバターを追加

              //装備アセット読み込みの為、アセットタグを生成
              foreach ($getPlayerEquipItemDatas as $equipItem) {
                $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
                if($equipAssetTag != ""){
                  if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
                  else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
                }
              }
              //プレイヤーアバターアセットタグを追加
              $playerAvatarAssetTag = getPlayerAvatarAssetTag($getPlayerAvatarData);
              if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
              else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
            }
          }
        }
        $resultPlayerRoomUpdate['map_add_avatar_datas'] = $addAvatarDatas;
      }
      $resultPlayerRoomUpdate['map_event_trigger_id'] = $_POST['player_room_update']['map_event_trigger_id'];
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_room_data' => $resultPlayerRoomUpdate); //プレイヤールームデータの結果
    }
  }
  if(isset($_POST['set_quick_chat_text']) && isset($_POST['set_quick_chat_player_room_event_trigger_id'])){ //プレイヤールームのクイックチャットの入力が行われた
    $resultPlayerRoomData = checkPlayerRoomData($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_quick_chat_player_room_event_trigger_id']); //現在居るプレイヤールームをチェック
    if($resultPlayerRoomData != false){
      //$RESULT_JSON = $RESULT_JSON + array('player_room_data' => $resultPlayerRoomData);
      if($_POST['set_quick_chat_text'] != ""){ //チャットメッセージの送信が行われた
        $quickChatStampId = 0;
        if(isset($_POST['set_quick_chat_stamp_id'])) $quickChatStampId = $_POST['set_quick_chat_stamp_id'];
        insertPlayerRoomChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$_POST['set_quick_chat_player_room_event_trigger_id'],$_POST['set_quick_chat_text'],$quickChatStampId);
        $resultSendChatMessage = array();
        $resultSendChatMessage['chat_text'] = $_POST['set_quick_chat_text'];
        $resultSendChatMessage['stamp_id'] = $quickChatStampId;
        $RESULT_JSON = $RESULT_JSON + array('result_send_quick_chat_player_room' => $resultSendChatMessage);
      }
      $playerRoomChatLogs = getPlayerRoomChatLogs($pdo,$_POST['set_quick_chat_player_room_event_trigger_id'],30);
      $RESULT_JSON = $RESULT_JSON + array('player_room_chat_logs' => $playerRoomChatLogs);
    }
  }
  if(isset($_POST['set_monument_select_item_id']) && isset($_POST['set_monument_select_item_num']) && isset($_POST['set_monument_select_item_attribute_id'])){ //モニュメントのアイテムが選択された
    $resultMonumentSelectItem = array();
    $resultAddItem = addMonumentSelectItem($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_monument_select_item_id'],$_POST['set_monument_select_item_num'],$_POST['set_monument_select_item_attribute_id']);
    if($resultAddItem == true){ //正常終了
      $resultMonumentSelectItem['error'] = 0;
      $resultMonumentSelectItem['error_comment'] = "";
      //所持アイテムに変更があったために、インベントリの最新情報を取得する。
      $updatePlayerItemData = getPlayerItemDataAll($pdo,$PLAYER_INFO['player_index_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_item_data' => $updatePlayerItemData); //アイテムの最新データ
      //更新後のプレイヤーの属性ボーナスデータ
      $resultUpdatePlayerAttributeBonus = getPlayerAttribute($pdo,$PLAYER_INFO['player_index_id'],(int)$_POST['set_monument_select_item_attribute_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_attribute_bonus' => $resultUpdatePlayerAttributeBonus); //更新後の属性ボーナス
    }
    else{
      $resultMonumentSelectItem['error'] = 1;
      $resultMonumentSelectItem['error_comment'] = "アイテムの使用に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_monumet_select_item' => $resultMonumentSelectItem); //モニュメントに使用したアイテムの結果
  }
  if(isset($_POST['set_monument_select_card_id']) && isset($_POST['set_monument_select_card_num']) && isset($_POST['set_monument_select_card_attribute_id'])){ //モニュメントのカードが選択された
    $resultMonumentSelectCard = array();
    $resultAddCard = addMonumentSelectCard($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_monument_select_card_id'],$_POST['set_monument_select_card_num'],$_POST['set_monument_select_card_attribute_id']);
    if($resultAddCard == true){ //正常終了
      $resultMonumentSelectCard['error'] = 0;
      $resultMonumentSelectCard['error_comment'] = "";
      //所持アイテムに変更があったために、インベントリの最新情報を取得する。
      $updatePlayerCardData = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_card_data' => $updatePlayerCardData); //アイテムの最新データ
      //更新後のプレイヤーの属性ボーナスデータ
      $resultUpdatePlayerAttributeBonus = getPlayerAttribute($pdo,$PLAYER_INFO['player_index_id'],(int)$_POST['set_monument_select_card_attribute_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_attribute_bonus' => $resultUpdatePlayerAttributeBonus); //更新後の属性ボーナス
    }
    else{
      $resultMonumentSelectCard['error'] = 1;
      $resultMonumentSelectCard['error_comment'] = "カードの使用に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_monumet_select_card' => $resultMonumentSelectCard); //モニュメントに使用したアイテムの結果
  }
  if(isset($_POST['set_monument_select_equip_item_id']) && isset($_POST['set_monument_select_equip_item_num']) && isset($_POST['set_monument_select_equip_item_attribute_id'])){ //モニュメントのカードが選択された
    $resultMonumentSelectEquipItem = array();
    $resultAddEquipItem = addMonumentSelectEquipItem($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_monument_select_equip_item_id'],$_POST['set_monument_select_equip_item_num'],$_POST['set_monument_select_equip_item_attribute_id']);
    if($resultAddEquipItem == true){ //正常終了
      $resultMonumentSelectEquipItem['error'] = 0;
      $resultMonumentSelectEquipItem['error_comment'] = "";
      //所持装備品に変更があったために、インベントリの最新情報を取得する。
      $updatePlayerEquipItemData = getPlayerEquipItemAndMasterData($pdo,$PLAYER_INFO['player_index_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_equip_item_data' => $updatePlayerEquipItemData); //装備品の最新データ
      //更新後のプレイヤーの属性ボーナスデータ
      $resultUpdatePlayerAttributeBonus = getPlayerAttribute($pdo,$PLAYER_INFO['player_index_id'],(int)$_POST['set_monument_select_equip_item_attribute_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_attribute_bonus' => $resultUpdatePlayerAttributeBonus); //更新後の属性ボーナス
    }
    else{
      $resultMonumentSelectEquipItem['error'] = 1;
      $resultMonumentSelectEquipItem['error_comment'] = "装備品の使用に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_monumet_select_equip_item' => $resultMonumentSelectEquipItem); //モニュメントに使用した装備品の結果
  }
  if(isset($_POST['set_duel_application_player_index_id'])){ //決闘の申請を行った
    $resultPlayerDuelApplication = duelApplication($pdo,$PLAYER_INFO,$PLAYER_MASTER['player_name'],$_POST['set_duel_application_player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_duel_application' => $resultPlayerDuelApplication);
  }
  if(isset($_POST['set_player_kill_execute'])){ //プレイヤーの殺害を行った
    $resultPlayerKillExecute = array();
    $resultPlayerKillExecute['error'] = 0;
    $resultPlayerKillExecute['error_comment'] = "";
    $enemyIndexId = -1;
    $mapMasterId = -1;
    if(isset($_POST['set_player_kill_execute']['map_id'])) $mapMasterId = $_POST['set_player_kill_execute']['map_id'];
    if(isset($_POST['set_player_kill_execute']['kill_player_index_id'])) $enemyIndexId = $_POST['set_player_kill_execute']['kill_player_index_id'];
    if($enemyIndexId != $PLAYER_INFO['player_index_id']){ //自分自身ではない
      if($PLAYER_INFO['player_karma'] <= 7500){
        $enemyInfo = getPlayerInfoForIndexId($pdo,$enemyIndexId,true);
        $enemyName = getPlayerName($pdo,$enemyIndexId);
        if($enemyInfo != false && $mapMasterId != -1){
          if($enemyInfo['player_party_index_id'] != $PLAYER_INFO['player_party_index_id']){
            $playerMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);//パーティメンバーを取得
            $enemyMemberDatas = getPartyMemberPlayerDatas($pdo,$enemyInfo['player_party_index_id']);//パーティメンバーを取得
            $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
            $enemyPartyData = getPlayerParty($pdo,$enemyInfo['player_party_index_id']);
            $mapMasterData = getMapMasterData($pdo,$mapMasterId);
            if($mapMasterData != false && count($playerMemberDatas) != 0 && count($enemyMemberDatas) != 0 && $playerPartyData != false && $enemyPartyData != false){
              //敵プレイヤーメンバーのチェック
              $partyCheckEnemyPlayerData = true;
              foreach ($enemyMemberDatas as $enPlData) {
                if($enPlData['player_index_id'] == $PLAYER_INFO['player_index_id']) $partyCheckEnemyPlayerData = false;
              }
              //英雄が有効であれば、設定
              $resultSetHero = setHeroMember($pdo,$PLAYER_INFO,$enemyMemberDatas,$mapMasterData);
              $enemyMemberDatas = $resultSetHero['party_member'];
              $heroMemberDatas = $resultSetHero['hero_member'];
              //衛兵が有効であれば、設定
              $enemyMemberDatas = setGuardMember($pdo,$PLAYER_INFO,$enemyMemberDatas,$mapMasterData);
              if($partyCheckEnemyPlayerData == true){ //敵パーティのプレイヤー情報は正常
                $getBattleResult = getPvpBattleResult($pdo,$PLAYER_INFO['player_index_id'],$enemyIndexId,$playerMemberDatas,$enemyMemberDatas,$STATUS_IDS,$playerPartyData,$enemyPartyData,$mapMasterData);
                if($getBattleResult != false && isset($getBattleResult['error'])){
                  if($getBattleResult['error'] == 0){ //戦闘結果は正常
                    $updatePlayerActionKarmaNum = 0;
                    $updateEnemyKarma = 0;
                    $updatePlayerActionKarmaNum = $updatePlayerActionKarmaNum + getKarmaActionEffectNum($PLAYER_INFO['player_karma'],0); //殺人によるカルマ変動値を取得
                    $resultPlayerKillExecute['result_battle_data'] = $getBattleResult;
                    //自分と相手にメッセージを送信
                    if($getBattleResult['win_player_index_id'] == $PLAYER_INFO['player_index_id']){ //自分が勝利
                      $updatePlayerActionKarmaNum = $updatePlayerActionKarmaNum + getKarmaActionEffectNum($PLAYER_INFO['player_karma'],0); //殺人によるカルマ変動値を取得
                      $msgTitle = "殺害に成功した";
                      $msgText = $enemyName."の殺害に成功しました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$PLAYER_INFO['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを自分に送信
                      $msgTitle = "殺害された";
                      $msgText = $PLAYER_MASTER['player_name']."に殺害されました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$enemyIndexId,$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを相手に送信
                      //英雄が参戦していた場合、メッセージを送信
                      if(count($resultSetHero['hero_member']) != 0){
                        $msgTitle = "プレイヤーの救出に失敗しました";
                        $msgText = $enemyName."の救出に失敗しました。戦闘結果を確認出来ます";
                        foreach ($resultSetHero['hero_member'] as $hPldata) {
                          insertPlayerMessage($pdo,5,$msgTitle,$msgText,$hPldata['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$hPldata['player_index_id'],""); //殺害結果のメッセージを自分に送信
                          deletePlayerSearchData($pdo,$hPldata['player_index_id']); //プレイヤー検索情報を削除
                        }
                      }
                    }
                    else if($getBattleResult['win_player_index_id'] == $enemyIndexId){ //敵が勝利
                      $msgTitle = "殺害に失敗した";
                      $msgText = $enemyName."の殺害に失敗しました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$PLAYER_INFO['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを自分に送信
                      $msgTitle = "殺害を阻止した";
                      $msgText = $PLAYER_MASTER['player_name']."の殺害を阻止しました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$enemyIndexId,$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを相手に送信
                      //英雄が参戦していた場合、メッセージを送信
                      if(count($resultSetHero['hero_member']) != 0){
                        $msgTitle = "プレイヤーの救出に成功しました";
                        $msgText = $enemyName."の救出に成功しました。戦闘結果を確認出来ます";
                        foreach ($resultSetHero['hero_member'] as $hPldata) {
                          insertPlayerMessage($pdo,5,$msgTitle,$msgText,$hPldata['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$hPldata['player_index_id'],""); //殺害結果のメッセージを自分に送信
                          deletePlayerSearchData($pdo,$hPldata['player_index_id']); //プレイヤー検索情報を削除
                        }
                      }
                    }
                    else{ //引き分け
                      $msgTitle = "殺害に失敗した";
                      $msgText = $enemyName."の殺害に失敗しました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$PLAYER_INFO['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを自分に送信
                      $msgTitle = "殺害を阻止した";
                      $msgText = $PLAYER_MASTER['player_name']."の殺害を阻止しました。戦闘結果を確認出来ます";
                      insertPlayerMessage($pdo,3,$msgTitle,$msgText,$enemyIndexId,$getBattleResult['insert_pvp_battle_log_id'],"",""); //殺害結果のメッセージを相手に送信
                      //英雄が参戦していた場合、メッセージを送信
                      if(count($resultSetHero['hero_member']) != 0){
                        $msgTitle = "プレイヤーの救出に失敗しました";
                        $msgText = $enemyName."の救出に失敗しました。戦闘結果を確認出来ます";
                        foreach ($resultSetHero['hero_member'] as $hPldata) {
                          insertPlayerMessage($pdo,5,$msgTitle,$msgText,$hPldata['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$hPldata['player_index_id'],""); //殺害結果のメッセージを自分に送信
                          deletePlayerSearchData($pdo,$hPldata['player_index_id']); //プレイヤー検索情報を削除
                        }
                      }
                    }
                  }
                  else{ //戦闘結果のエラー
                    $resultPlayerKillExecute['error'] = 5;
                    $resultPlayerKillExecute['error_comment'] = "戦闘結果のエラーが発生しました";
                  }
                }
                else{
                  $resultPlayerKillExecute['error'] = 4;
                  $resultPlayerKillExecute['error_comment'] = "戦闘結果の取得に失敗しました";
                }
              }
              else{ //敵のパーティに自分が居た
                $resultPlayerKillExecute['error'] = 8;
                $resultPlayerKillExecute['error_comment'] = "敵パーティ内の自分自身の殺害は行えません。";
              }
            }
            else{ //データの取得に失敗した
              $resultPlayerKillExecute['error'] = 1;
              $resultPlayerKillExecute['error_comment'] = "データの取得に失敗しました";
            }
          }
          else{ //味方チームとの対決だった。
            $resultPlayerKillExecute['error'] = 7;
            $resultPlayerKillExecute['error_comment'] = "自身が所属するパーティの殺害は行えません";
          }
        }
        else{ //プレイヤーデータの取得に失敗した
          $resultPlayerKillExecute['error'] = 2;
          $resultPlayerKillExecute['error_comment'] = "プレイヤーデータの取得に失敗しました";
        }
      }
      else{ //カルマが一般人以上だった。
        $resultPlayerKillExecute['error'] = 3;
        $resultPlayerKillExecute['error_comment'] = "犯罪者ではないため、殺害を行えませんでした。";
      }
    }
    else{ //自分自身と対決だった。
      $resultPlayerKillExecute['error'] = 6;
      $resultPlayerKillExecute['error_comment'] = "自分自身の殺害は行えません";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_player_kill_execute' => $resultPlayerKillExecute);
  }
  if(isset($_POST['check_encount']) && isset($_POST['check_encount']['area_id'])){ //エンカウントのチェックが行われた
    $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
    $areaMasterData = getAreaMaster($pdo,$_POST['check_encount']['area_id']);
    $mapMasterData = false;
    if($areaMasterData != false) $mapMasterData = getMapMasterData($pdo,$areaMasterData['map_id']);
    if($playerAreaInstance != false
    && $playerAreaInstance['area_id'] == $_POST['check_encount']['area_id']
    && $areaMasterData != false
    && $mapMasterData != false){ //現在居るエリアだった エリアマスター、マップマスターが存在した
      $maxPartyMember = 5;
      $myKarmaRank = getKarmaRank($PLAYER_INFO['player_karma']);
      $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
      $playerPartyMember = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
      $memberCount = count($playerPartyMember); //現在のパーティメンバー数
      $addSupportMemberNum = $maxPartyMember - $memberCount; //パーティに追加可能なメンバー数
      //$searchType = getPlayerSearchType($PLAYER_INFO['player_karma']);
      $matchingListEnemyPlayer = array(); //敵プレイヤーのid配列
      $matchingListSupportPlayer = array(); //仲間(救援)プレイヤーのid配列
      $matchingListEnemyNpc = array(); //敵NPCのid配列
      $matchingListSupportNpc = array(); //仲間(救援)NPCのid配列
      $enemyRole = -1;
      $supportRole = -1;
      if(0 <= $myKarmaRank){ //一般(中立) And 善以上のカルマ
        $enemyRole = 0;
        $supportRole = 1;
      }
      else{ //犯罪者以下のカルマ
        $enemyRole = 1;
        $supportRole = -1;
      }
      $matchingList = searchPvpPlayer($pdo,$playerAreaInstance['area_id'],$enemyRole); //対戦相手を検索
      $randMemberCount = rand(1,$maxPartyMember);
      foreach ($matchingList as $matching) { //対戦相手を決定
        array_push($matchingListEnemyPlayer,$matching['player_index_id']);
        if($randMemberCount <= count($matchingListEnemyPlayer)) break;
      }
      $randMemberCount = rand(1,$maxPartyMember);
      $matchingList = searchPvpPlayer($pdo,$playerAreaInstance['area_id'],$supportRole); //救援仲間を検索
      foreach ($matchingList as $matching) { //救援相手を決定
        array_push($matchingListSupportPlayer,$matching['player_index_id']);
        if($addSupportMemberNum <= count($matchingListSupportPlayer)) break;
      }
      if($maxPartyMember < count($matchingListSupportPlayer) && $supportRole != -1){ //救援プレイヤー追加で5人以下の場合は、救援NPC追加
        $randMemberCount = rand(1,$maxPartyMember);
        $matchingList = searchSupportEnemyMathingList($pdo,$playerAreaInstance['area_id'],$randMemberCount);
        foreach ($matchingList as $matching) { //救援相手を決定
          array_push($matchingListSupportNpc,$matching['enemy_index_id']);
        }
      }
      $myTeamMemberCount = count($playerPartyMember) + count($matchingListSupportNpc);
      if($maxPartyMember < $myTeamMemberCount) $myTeamMemberCount = $maxPartyMember;
      $enemyTeamCount = count($matchingListEnemyPlayer);
      if($maxPartyMember < $enemyTeamCount) $enemyTeamCount = $maxPartyMember;
      if(0 < $myTeamMemberCount && 0 < $enemyTeamCount){ //両チーム最低1人以上、参加者が存在すれば戦闘可能
        //戦闘インスタンスの生成の準備
        $list = array();
        $list['host'] = $PLAYER_INFO['player_index_id'];
        $list['battle_event_id'] = $mapMasterData['battle_event_id'];
        $list['app_define'] = new AppDefine($ENV);
        $list['redis'] = $redis;
        $list['battle_result_setting'] = new BattleResultSetting(null);
        //チーム1(自分チーム)のパーティインスタンスを生成
        $list['team_one_party_instance'] = null;
        $myBattlePartyInstance = new BattlePartyInstance($pdo,0,$playerPartyData);
        if(get_class($myBattlePartyInstance) == 'BattlePartyInstance' && $myBattlePartyInstance->init == true){
          $list['team_one_party_instance'] = $myBattlePartyInstance;
        }
        //チーム1(自分チーム)のエントリータイプデータ配列を生成
        $list['team_one_entry_type_datas'] = array();
        //自分パーティのメンバー追加
        foreach ($playerPartyMember as $ptPlData) {
          $addEntryType = new BattleEntryType(0,$ptPlData['player_index_id'],0);
          array_push($list['team_one_entry_type_datas'],$addEntryType);
          if($maxPartyMember <= count($list['team_one_entry_type_datas'])) break;
        }
        if(count($list['team_one_entry_type_datas']) < $maxPartyMember){
          //救援プレイヤーを追加
          for ($i=0; $i < count($matchingListSupportPlayer); $i++) {
            $addEntryType = new BattleEntryType(0,$matchingListSupportPlayer[$i],0);
            array_push($list['team_one_entry_type_datas'],$addEntryType);
            if($maxPartyMember <= count($list['team_one_entry_type_datas'])) break;
          }
          if(count($list['team_one_entry_type_datas']) < $maxPartyMember){
            //救援NPCを追加
            for ($i=0; $i < count($matchingListSupportNpc); $i++) {
              $addEntryType = new BattleEntryType(1,$matchingListSupportNpc[$i],0);
              array_push($list['team_one_entry_type_datas'],$addEntryType);
              if($maxPartyMember <= count($list['team_one_entry_type_datas'])) break;
            }
          }
        }
        //チーム2(敵チーム)のパーティインスタンスを生成
        $list['team_two_party_instance'] = null;
        $enemyPartyData = null;
        if(count($matchingListEnemyPlayer) != 0) $enemyPartyData = getPlayerParty($pdo,$matchingListEnemyPlayer[0]);
        else if(count($matchingListEnemyNpc) != 0){
          $enemyMasterData = getEnemyMasterData($pdo,$matchingListEnemyNpc[0]);
          if($enemyMasterData != false) $enemyPartyData = getEnemyPartyData($pdo,$enemyMasterData['enemy_party_id']);
        }
        $enemyBattlePartyInstance = null;
        if($enemyPartyData != null) $enemyBattlePartyInstance = new BattlePartyInstance($pdo,1,$enemyPartyData);
        if($enemyBattlePartyInstance != null && get_class($enemyBattlePartyInstance) == 'BattlePartyInstance' && $enemyBattlePartyInstance->init == true){
          $list['team_two_party_instance'] = $enemyBattlePartyInstance;
        }
        //チーム2(敵チーム)のエントリータイプデータ配列を生成
        $list['team_two_entry_type_datas'] = array();
        //敵プレイヤーメンバーを追加
        for ($i=0; $i < count($matchingListEnemyPlayer); $i++) {
          $addEntryType = new BattleEntryType(0,$matchingListEnemyPlayer[$i],1);
          array_push($list['team_two_entry_type_datas'],$addEntryType);
          if($maxPartyMember <= count($list['team_two_entry_type_datas'])) break;
        }
        if(count($list['team_two_entry_type_datas']) < $maxPartyMember){
          for ($i=0; $i < count($matchingListEnemyNpc); $i++) {
            $addEntryType = new BattleEntryType(1,$matchingListEnemyNpc[$i],1);
            array_push($list['team_two_entry_type_datas'],$addEntryType);
            if($maxPartyMember <= count($list['team_two_entry_type_datas'])) break;
          }
        }

        if($list['team_one_party_instance'] != null
        && $list['team_two_party_instance'] != null
        && count($list['team_one_entry_type_datas']) != 0
        && count($list['team_two_entry_type_datas']) != 0){ //インスタンス生成可能かのチェック
          //パーミッションの設定
          $list['permission_entry_type_datas'] = array();
          $battleInstancePermission = new BattleInstancePermission();
          for ($bp=0; $bp < count($battleInstancePermission->permissionTypes); $bp++) {
            $typeName = $battleInstancePermission->permissionTypes[$bp];
            $list['permission_entry_type_datas'][$typeName] = array();
            //以下、プレイヤーに追加するパーミッション
            if($typeName == "add_action"){
              foreach ($list['team_one_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
              foreach ($list['team_two_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
            }
            if($typeName == "get_reward"){
              foreach ($list['team_one_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
              foreach ($list['team_two_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
            }
            if($typeName == "get_card_exp"){
              foreach ($list['team_one_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
              foreach ($list['team_two_entry_type_datas'] as $entryType) {
                if($entryType->type == 0) array_push($list['permission_entry_type_datas'][$typeName],$entryType);
              }
            }
          }
          //バトルインスタンスを生成
          $resultInsertBattleInstance = insertBattleInstance($pdo,$list);
          if($resultInsertBattleInstance['error'] == 0){ //エラーなし
            $encountResponseData = array();
            $encountResponseData['battle_instance_id'] = $resultInsertBattleInstance['battle_instance_id'];
            $encountResponseData['error'] = $resultInsertBattleInstance['error'];
            $encountResponseData['error_comment'] = $resultInsertBattleInstance['error_comment'];
            $RESULT_JSON = $RESULT_JSON + array('encount_response_data' => $encountResponseData); //インスタンス生成エラー情報を取得
            //該当するマッチングリストを削除
            deletePlayerSearchData($pdo,$matchingListEnemyPlayer);
            deletePlayerSearchData($pdo,$matchingListSupportPlayer);
            //参加した全てのプレイヤーにメッセージを送信(戦闘参加用メッセージ)
            $msgTitle = "戦闘開始";
            $msgText = "プレイヤーから攻撃を受けました";
            insertPlayerMessage($pdo,3,$msgTitle,$msgText,$PLAYER_INFO['player_index_id'],$resultInsertBattleInstance['battle_instance_id'],"",""); //殺害結果のメッセージを自分に送信
            for ($i=0; $i < count($matchingListEnemyPlayer); $i++) {
              $msgTitle = "殺害対象発見";
              $msgText = "プレイヤーに攻撃を開始しました。";
              insertPlayerMessage($pdo,4,$msgTitle,$msgText,$matchingListEnemyPlayer[$i],$resultInsertBattleInstance['battle_instance_id'],"",""); //殺害結果のメッセージを自分に送信
            }
            for ($i=0; $i < count($matchingListSupportPlayer); $i++) {
              $msgTitle = "救援対象発見";
              $msgText = "プレイヤーの救援を開始しました。";
              insertPlayerMessage($pdo,5,$msgTitle,$msgText,$matchingListSupportPlayer[$i],$resultInsertBattleInstance['battle_instance_id'],"",""); //殺害結果のメッセージを自分に送信
            }
          }
          else{
            $errorData = array();
            $errorData['error'] = $resultInsertBattleInstance['error'];
            $errorData['error_comment'] = $resultInsertBattleInstance['error_comment'];
            $RESULT_JSON = $RESULT_JSON + array('encount_response_data' => $errorData); //インスタンス生成エラー情報を取得
          }
        }
      }
      //$getEnemyPlayerData = startPvpMatching($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_party_index_id'],$_POST['check_encount']['area_id'],$searchType);
      // if($getEnemyPlayerData != false){ //対戦相手を取得出来た
      //   $enemyName = getPlayerName($pdo,$getEnemyPlayerData['player_index_id']);
      //   $playerMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);//パーティメンバーを取得
      //   $enemyMemberDatas = getPartyMemberPlayerDatas($pdo,$getEnemyPlayerData['player_party_index_id']);//パーティメンバーを取得
      //   $myKarmaRank = getKarmaRank($PLAYER_INFO['player_karma']);
      //   $heroMemberDatas = false;
      //   if($myKarmaRank < 0){ //自分が犯罪者以上のカルマだった場合
      //     $mapMasterData = getMapMasterData($pdo,$playerAreaInstance['map_id']);
      //     if($mapMasterData != false) $enemyMemberDatas = setGuardMember($pdo,$PLAYER_INFO,$enemyMemberDatas,$mapMasterData); //衛兵を検索
      //     //英雄を検索
      //     //英雄が有効であれば、設定
      //     $resultSetHero = setHeroMember($pdo,$PLAYER_INFO,$enemyMemberDatas,$mapMasterData);
      //     $enemyMemberDatas = $resultSetHero['party_member'];
      //     $heroMemberDatas = $resultSetHero['hero_member'];
      //   }
      //   $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
      //   $enemyPartyData = getPlayerParty($pdo,$getEnemyPlayerData['player_party_index_id']);
      //   $areaInstanceData = getAreaInstanceForAreaId($pdo,$_POST['check_encount']['area_id']);
      //   $mapMasterData = getMapMasterData($pdo,$areaInstanceData['map_id']);
      //   $getBattleResult = getPvpBattleResult($pdo,$PLAYER_INFO['player_index_id'],$getEnemyPlayerData['player_index_id'],$playerMemberDatas,$enemyMemberDatas,$STATUS_IDS,$playerPartyData,$enemyPartyData,$mapMasterData);
      //   if(isset($getBattleResult['insert_pvp_battle_log_id']) && isset($getBattleResult['error']) && $getBattleResult['error'] == 0 && $getBattleResult['insert_pvp_battle_log_id'] != -1){ //バトルログが挿入された
      //     $RESULT_JSON = $RESULT_JSON + array('result_encount_pvp_battle_log_id' => $getBattleResult['insert_pvp_battle_log_id']); //バトルログのIDを返す
      //     //対戦相手のプレイヤー検索情報を削除
      //     deletePlayerSearchData($pdo,$getEnemyPlayerData['player_index_id']);
      //     //戦闘ログのメッセージを作成
      //     $msgType = 4;
      //     if($getEnemyPlayerData['search_type'] == 1) $msgType = 4; //索敵
      //     if($getEnemyPlayerData['search_type'] == 2) $msgType = 5; //救援
      //     $msgText = $enemyName."から攻撃されました";
      //     insertPlayerMessage($pdo,$msgType,"戦闘結果",$msgText,$PLAYER_INFO['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$getEnemyPlayerData['player_index_id'],""); //決闘結果のメッセージを自分に送信
      //     $msgText = $PLAYER_MASTER['player_name']."に攻撃を開始しました";
      //     //NPC以外の場合には送信
      //     if($getEnemyPlayerData['support_player_type'] != 1 && $getEnemyPlayerData['support_player_type'] != 2){
      //       insertPlayerMessage($pdo,$msgType,"戦闘結果",$msgText,$getEnemyPlayerData['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$getEnemyPlayerData['player_index_id'],""); //決闘結果のメッセージを相手に送信
      //     }
      //     //英雄が参戦していた場合、メッセージを送信
      //     if(count($heroMemberDatas) != 0){
      //       if($getBattleResult['win_player_index_id'] == $PLAYER_INFO['player_index_id']){ //自分が勝利
      //         $msgTitle = "プレイヤーの救出に失敗しました";
      //         $msgText = $enemyName."の救出に失敗しました。戦闘結果を確認出来ます";
      //       }
      //       else if($getBattleResult['win_player_index_id'] == $getEnemyPlayerData['player_index_id']){ //敵が勝利
      //         $msgTitle = "プレイヤーの救出に成功しました";
      //         $msgText = $enemyName."の救出に成功しました。戦闘結果を確認出来ます";
      //       }
      //       else{ //引き分け
      //         $msgTitle = "プレイヤーの救出に失敗しました";
      //         $msgText = $enemyName."の救出に失敗しました。戦闘結果を確認出来ます";
      //       }
      //       foreach ($heroMemberDatas as $hPldata) {
      //         insertPlayerMessage($pdo,5,$msgTitle,$msgText,$hPldata['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],$hPldata['player_index_id'],""); //殺害結果のメッセージを自分に送信
      //         deletePlayerSearchData($pdo,$hPldata['player_index_id']); //プレイヤー検索情報を削除
      //       }
      //     }
      //   }
      // }
    }
  }
  $RESULT_JSON = $RESULT_JSON + array('map_scene_error' => $MAP_SCENE_ERROR); //マップシーンのエラー情報を取得

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}
echo json_encode($RESULT_JSON);
