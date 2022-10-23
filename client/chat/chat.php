<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/area/index.php';
include_once '../../module/party/index.php';
include_once '../../module/friend/index.php';
include_once '../../module/stamp/index.php';
include_once '../../module/playerRoom/index.php';
include_once '../../module/guild/index.php';
include_once '../../module/chat/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['chat_window_init'])){ //チャットシーンの初期化が行われた
    $resultInitObject = array();
    //初期化処理があれば記載
    //プレイヤーチャットに必要な初期化を実行
    if(isset($_POST['init_chat_target_player']) && $_POST['init_chat_target_player'] == -1){ //初期化が必要な数値の場合
      $resultInitObject['set_init_chat_target_player'] = $PLAYER_INFO['player_index_id'];
      $resultInitObject['set_init_chat_target_player_name'] = $PLAYER_MASTER['player_name'];
    }
    $RESULT_JSON = $RESULT_JSON + array('result_chat_scene_init' => $resultInitObject); //初期化オブジェクトを送信
  }
  //チャットタイプの指定があった
  if(isset($_POST['chat_type'])){
    //スタンプIDが設定されてた場合
    $setStampId = 0;
    if(isset($_POST['set_chat_send_stamp_id'])){
      $stampCheck = checkPlayerStamp($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_chat_send_stamp_id']);
      if($stampCheck == true) $setStampId = $_POST['set_chat_send_stamp_id'];
    }
    switch ((int)$_POST['chat_type']) {
      case 1: //エリアチャット
      {
        $resultPlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_area_instance' => $resultPlayerAreaInstance);
        if(isset($_POST['set_chat_send_message']) && isset($resultPlayerAreaInstance['area_id'])){ //チャットメッセージの送信が行われた
          insertPlayerAreaChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$resultPlayerAreaInstance['area_id'],$_POST['set_chat_send_message'],$setStampId);
        }
        if(isset($resultPlayerAreaInstance['area_id'])){
          $areaChatLogs = getAreaChatLogs($pdo,$resultPlayerAreaInstance['area_id'],100);
          $RESULT_JSON = $RESULT_JSON + array('area_chat_logs' => $areaChatLogs);
        }
      }
      break;
      case 2: //ワールドチャット
      {
        $resultPlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('player_world_instance' => $resultPlayerAreaInstance);
        if(isset($_POST['set_chat_send_message']) && isset($resultPlayerAreaInstance['world_id'])){ //チャットメッセージの送信が行われた
          insertPlayerWorldChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$resultPlayerAreaInstance['world_id'],$_POST['set_chat_send_message'],$setStampId);
        }
        if(isset($resultPlayerAreaInstance['world_id'])){
          $worldChatLogs = getWorldChatLogs($pdo,$resultPlayerAreaInstance['world_id'],100);
          $RESULT_JSON = $RESULT_JSON + array('world_chat_logs' => $worldChatLogs);
        }
      }
      break;
      case 3: //パーティチャット
      {
        $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
        if($playerPartyData != false){
          $RESULT_JSON = $RESULT_JSON + array('result_player_party' => $playerPartyData); //パーティ情報を返す
        }
        if(isset($_POST['set_chat_send_message'])){ //チャットメッセージの送信が行われた
          insertPlayerPartyChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_party_index_id'],$_POST['set_chat_send_message'],$setStampId);
        }
        $partyChatLogs = getPartyChatLogs($pdo,$PLAYER_INFO['player_party_index_id'],100);
        $RESULT_JSON = $RESULT_JSON + array('party_chat_logs' => $partyChatLogs);
      }
      break;
      case 4: //プレイヤーチャット
      {
        $resultChatPlayerName = "";
        $resultTargetPlayerIndexId = -1;
        if(isset($_POST['set_chat_target_player'])){ //相手のプレイヤー情報が存在した。
          $resultChatPlayerName = getPlayerName($pdo,$_POST['set_chat_target_player']);
          $getTargetPlayerData = getPlayerInfoForIndexId($pdo,$_POST['set_chat_target_player'],true);
          if($getTargetPlayerData != false && isset($getTargetPlayerData['player_index_id'])){
            $resultTargetPlayerIndexId = $getTargetPlayerData['player_index_id'];
          }
        }
        else{ //自分自身
          $resultChatPlayerName = $PLAYER_MASTER['player_name'];
          $resultTargetPlayerIndexId = $PLAYER_INFO['player_index_id'];
        }
        if($resultChatPlayerName != "" && $resultTargetPlayerIndexId != -1){
          $RESULT_JSON = $RESULT_JSON + array('result_chat_player_name' => $resultChatPlayerName);
          $RESULT_JSON = $RESULT_JSON + array('result_chat_player_index_id' => $resultTargetPlayerIndexId);
          if(isset($_POST['set_chat_send_message'])){ //チャットメッセージの送信が行われた
            insertPlayerChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$resultTargetPlayerIndexId,$_POST['set_chat_send_message'],$setStampId);
          }
          $playerChatLogs = getPlayerChatLogs($pdo,$PLAYER_INFO['player_index_id'],$resultTargetPlayerIndexId,100);
          $RESULT_JSON = $RESULT_JSON + array('player_chat_logs' => $playerChatLogs);
        }
        //フレンドリストの取得が行われた
        if(isset($_POST['chat_window_get_player_friend_list'])){
          $resultFriendList = array();
          $resultFriendList = getPlayerFriendDatas($pdo,$PLAYER_INFO['player_index_id']);
          $RESULT_JSON = $RESULT_JSON + array('result_player_friend_list' => $resultFriendList);
        }
      }
      break;
      case 5: //ルームチャット
      {
        if(isset($_POST['map_event_trigger_id'])){
          $resultPlayerRoomData = checkPlayerRoomData($pdo,$PLAYER_INFO['player_index_id'],$_POST['map_event_trigger_id']); //現在居るプレイヤールームをチェック
          if($resultPlayerRoomData != false){
            $RESULT_JSON = $RESULT_JSON + array('player_room_data' => $resultPlayerRoomData);
            if(isset($_POST['set_chat_send_message'])){ //チャットメッセージの送信が行われた
              insertPlayerRoomChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$_POST['map_event_trigger_id'],$_POST['set_chat_send_message'],$setStampId);
              $resultSendChatMessage = array();
              $resultSendChatMessage['chat_text'] = $_POST['set_chat_send_message'];
              $resultSendChatMessage['stamp_id'] = $setStampId;
              $RESULT_JSON = $RESULT_JSON + array('result_send_chat_player_room' => $resultSendChatMessage);
            }
            $playerRoomChatLogs = getPlayerRoomChatLogs($pdo,$_POST['map_event_trigger_id'],100);
            $RESULT_JSON = $RESULT_JSON + array('player_room_chat_logs' => $playerRoomChatLogs);
          }
        }
      }
      break;
      case 6: //ギルドチャット
      {
        $playerGuildData = selectPlayerGuildDataForGuildId($pdo,$PLAYER_INFO['player_guild_index_id']);
        if($playerGuildData != false){
          $RESULT_JSON = $RESULT_JSON + array('result_player_guild' => $playerGuildData); //プレイヤーギルド情報を返す
        }
        if(isset($_POST['set_chat_send_message'])){ //チャットメッセージの送信が行われた
          insertGuildChat($pdo,$PLAYER_MASTER['player_name'],$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_guild_index_id'],$_POST['set_chat_send_message'],$setStampId);
          $resultSendChatMessage = array();
          $resultSendChatMessage['chat_text'] = $_POST['set_chat_send_message'];
          $resultSendChatMessage['stamp_id'] = $setStampId;
          $RESULT_JSON = $RESULT_JSON + array('result_send_chat_guild_room' => $resultSendChatMessage);
        }
        $guildChatLogs = getGuildChatLogs($pdo,$PLAYER_INFO['player_guild_index_id'],100);
        $RESULT_JSON = $RESULT_JSON + array('guild_chat_logs' => $guildChatLogs);
      }
      break;
      default:
      break;
    }
    $RESULT_JSON = $RESULT_JSON + array('result_chat_type' => $_POST['chat_type']);
  }

  //スタンプリスト表示の操作が行われた
  if(isset($_POST['get_player_stamp_list'])){
    $playerStampList = getPlayerStamp($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_stamp_list' => $playerStampList);
  }

  //チャットログの自動更新が行われた
  if(isset($_POST['chat_log_update'])){
    $resultChatLogUpdate = array();
    $resultPlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
    //エリアチャット
    $areaChatLogs = getAreaChatLogs($pdo,$resultPlayerAreaInstance['area_id'],100);
    $resultChatLogUpdate['update_area_chat'] = $areaChatLogs;
    //ワールドチャット
    $worldChatLogs = getWorldChatLogs($pdo,$resultPlayerAreaInstance['world_id'],100);
    $resultChatLogUpdate['update_world_chat'] = $worldChatLogs;
    //パーティチャット
    $partyChatLogs = getPartyChatLogs($pdo,$PLAYER_INFO['player_party_index_id'],100);
    $resultChatLogUpdate['update_party_chat'] = $partyChatLogs;
    //プレイヤーチャット
    $resultTargetPlayerIndexId = -1;
    if(isset($_POST['set_chat_target_player'])){
      $resultTargetPlayerIndexId = $_POST['set_chat_target_player'];
    }
    else{ //自分自身
      $resultTargetPlayerIndexId = $PLAYER_INFO['player_index_id'];
    }
    $playerChatLogs = getPlayerChatLogs($pdo,$PLAYER_INFO['player_index_id'],$resultTargetPlayerIndexId,100);
    $resultChatLogUpdate['update_player_chat'] = $playerChatLogs;
    //プレイヤールームチャット
    $resultPlayerRoomData = getPlayerRoomData($pdo,$PLAYER_INFO['player_index_id']); //現在居るプレイヤールームをチェック
    if($resultPlayerRoomData != false){
      $playerRoomChatLogs = getPlayerRoomChatLogs($pdo,$resultPlayerRoomData['map_event_trigger_id'],100);
      $resultChatLogUpdate['update_player_room_chat'] = $playerRoomChatLogs;
    }
    //ギルドチャット
    $guildChatLogs = getGuildChatLogs($pdo,$PLAYER_INFO['player_guild_index_id'],100);
    $resultChatLogUpdate['update_guild_chat'] = $guildChatLogs;

    $RESULT_JSON = $RESULT_JSON + array('result_update_chat_logs' => $resultChatLogUpdate);
  }
}

echo json_encode($RESULT_JSON);
