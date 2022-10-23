<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/duel/index.php';
include_once '../../module/message/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/card/index.php';
include_once '../../module/skill/index.php';
include_once '../../module/enemy/index.php';
include_once '../../module/quest/index.php';
include_once '../../module/party/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/map/index.php';
include_once '../../module/formation/index.php';
include_once '../../module/redisConnect/index.php';
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
include_once '../../module/area/index.php';
include_once "../../module/card/cardData.php";
include_once "../../module/card/prizeCardData.php";
include_once "../../module/skill/skillData.php";
include_once "../../module/buff/buffData.php";
include_once "../../module/buff/index.php";
include_once "../../module/playerCard/PlayerCardData.php";
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['get_player_message'])){
    if($_POST['get_player_message'] == $PLAYER_INFO['player_index_id']){ //パラメーターチェックだけ
      $resultPlayerMessage = getPlayerMessage($pdo,$PLAYER_INFO['player_index_id']); //メッセージを取得
      $RESULT_JSON = $RESULT_JSON + array('result_player_message_datas' => $resultPlayerMessage);
    }
  }
  if(isset($_POST['delete_message'])){ //メッセージの削除が行われた
    $resultDeleteMsg = true;
    deleteMessage($pdo,$PLAYER_INFO['player_index_id'],$_POST['delete_message']['message_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_message' => $resultDeleteMsg);
    //メッセージログに変更があったため、更新
    $resultUpdatePlayerMessageData = getPlayerMessage($pdo,$PLAYER_INFO['player_index_id']); //メッセージを取得
    $RESULT_JSON = $RESULT_JSON + array('result_update_player_message_data' => $resultUpdatePlayerMessageData);
  }
  if(isset($_POST['delete_duel_application'])){ //決闘申請の破棄があった。
    $resultDeletePlayerApplication = array();
    $resultDeletePlayerApplication['error'] = 0;
    $resultDeletePlayerApplication['error_comment'] = "";
    //決闘申請を破棄
    deletePlayerDuel($pdo,$PLAYER_INFO['player_index_id'],$_POST['delete_duel_application']['application_player_index_id']);
    //メッセージを破棄
    deleteMessage($pdo,$PLAYER_INFO['player_index_id'],$_POST['delete_duel_application']['message_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_duel_application' => $resultDeletePlayerApplication);
    //メッセージログに変更があったため、更新
    $resultUpdatePlayerMessageData = getPlayerMessage($pdo,$PLAYER_INFO['player_index_id']); //メッセージを取得
    $RESULT_JSON = $RESULT_JSON + array('result_update_player_message_data' => $resultUpdatePlayerMessageData);
  }
  if(isset($_POST['duel_application_approval']) && isset($_POST['duel_application_approval']['message_id'])){ //申請を承認した
    $errorId = -1;
    $resultDuelApplicationApproval = array();
    $resultDuelApplicationApproval['error'] = 0;
    $resultDuelApplicationApproval['error_comment'] = "";
    $myAreaId = $_POST['duel_application_approval']['map_id'];
    $enemyPlayerIndexId = $_POST['duel_application_approval']['application_player_index_id'];
    $messageData = selectPlayerMessageForMessageId($pdo,$_POST['duel_application_approval']['message_id']);
    $enemyPlayerInfo = getPlayerInfoForIndexId($pdo,$enemyPlayerIndexId,true);
    //メッセージの正当性を確認
    if($messageData['message_type'] == 1 && $messageData['param_1'] == $enemyPlayerIndexId && $enemyPlayerInfo != false){
      //申請者と申請先のプレイヤーが同じエリアに存在するかチェックを行う。
      $myPlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
      $enemyPlayerAreaInstance = getPlayerAreaInstance($pdo,$enemyPlayerIndexId);
      if($myPlayerAreaInstance['area_id'] == $enemyPlayerAreaInstance['area_id']){
        //エリアマスターデータとマップマスターデータを取得
        $areaMasterData = getAreaMaster($pdo,$myAreaId);
        $mapMasterData = false;
        if($areaMasterData != false) $mapMasterData = getMapMasterData($pdo,$areaMasterData['map_id']);
        if($areaMasterData != false && $mapMasterData != false){ //マップとエリアの存在チェック
          $maxPartyMember = 5;
          //パーティメンバーを取得
          $myPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
          $myPartyMember = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
          $enemyPartyData = getPlayerParty($pdo,$enemyPlayerInfo['player_party_index_id']);
          $enemyPartyMember = getPartyMemberPlayerDatas($pdo,$enemyPlayerInfo['player_party_index_id']);
          if($myPartyData != false && $enemyPartyData != false && count($myPartyMember) != 0 && count($enemyPartyMember) != 0
          && count($enemyPartyMember) <= $maxPartyMember && count($myPartyMember) <= $maxPartyMember){
            //戦闘インスタンスの生成の準備
            $list = array();
            $list['host'] = $PLAYER_INFO['player_index_id'];
            $list['battle_event_id'] = $mapMasterData['battle_event_id'];
            $list['app_define'] = new AppDefine($ENV);
            $list['redis'] = $redis;
            $list['battle_result_setting'] = new BattleResultSetting(null);
            //チーム1(自分チーム)のパーティインスタンスを生成
            $list['team_one_party_instance'] = null;
            $myBattlePartyInstance = new BattlePartyInstance($pdo,0,$myPartyData);
            if(get_class($myBattlePartyInstance) == 'BattlePartyInstance' && $myBattlePartyInstance->init == true){
              $list['team_one_party_instance'] = $myBattlePartyInstance;
            }
            //チーム2(敵チーム)のパーティインスタンスを生成
            $list['team_two_party_instance'] = null;
            $enemyBattlePartyInstance = new BattlePartyInstance($pdo,1,$enemyPartyData);
            if(get_class($enemyBattlePartyInstance) == 'BattlePartyInstance' && $enemyBattlePartyInstance->init == true){
              $list['team_two_party_instance'] = $enemyBattlePartyInstance;
            }
            //チーム1(自分チーム)のエントリータイプデータ配列を生成
            $list['team_one_entry_type_datas'] = array();
            //自分パーティのメンバー追加
            foreach ($myPartyMember as $ptPlData) {
              $addEntryType = new BattleEntryType(0,$ptPlData['player_index_id'],0);
              array_push($list['team_one_entry_type_datas'],$addEntryType);
              if($maxPartyMember <= count($list['team_one_entry_type_datas'])) break;
            }
            //チーム2(敵チーム)のエントリータイプデータ配列を生成
            $list['team_two_entry_type_datas'] = array();
            //自分パーティのメンバー追加
            foreach ($enemyPartyMember as $ptPlData) {
              $addEntryType = new BattleEntryType(0,$ptPlData['player_index_id'],0);
              array_push($list['team_two_entry_type_datas'],$addEntryType);
              if($maxPartyMember <= count($list['team_two_entry_type_datas'])) break;
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
                $resultDuelApplicationApproval['battle_instance_id'] = $resultInsertBattleInstance['battle_instance_id'];
                $resultDuelApplicationApproval['error'] = $resultInsertBattleInstance['error'];
                $resultDuelApplicationApproval['error_comment'] = $resultInsertBattleInstance['error_comment'];
                //参加した全てのプレイヤーにメッセージを送信(戦闘参加用メッセージ)
                foreach ($myPartyMember as $playerInfo) {
                  $msgTitle = "決闘に参加可能";
                  $msgText = "あなたのパーティメンバーが決闘を開始しました。";
                  if($playerInfo['player_index_id'] == $PLAYER_INFO['player_index_id']){
                    $msgTitle = "決闘開始";
                    $msgText = "決闘を開始しました。";
                  }
                  insertPlayerMessage($pdo,2,$msgTitle,$msgText,$playerInfo['player_index_id'],$resultDuelApplicationApproval['battle_instance_id'],"",""); //殺害結果のメッセージを自分に送信
                }
                foreach ($enemyPartyMember as $playerInfo) {
                  $msgTitle = "決闘に参加可能";
                  $msgText = "あなたのパーティメンバーが決闘を開始しました。";
                  if($playerInfo['player_index_id'] == $enemyPlayerIndexId){
                    $msgTitle = "決闘開始";
                    $msgText = "決闘を開始しました。";
                  }
                  insertPlayerMessage($pdo,2,$msgTitle,$msgText,$playerInfo['player_index_id'],$resultDuelApplicationApproval['battle_instance_id'],"",""); //殺害結果のメッセージを自分に送信
                }
              } else $errorId = 6;
            } else $errorId = 5;
          } else $errorId = 4;
        } else $errorId = 3;
      } else $errorId = 2;
    } else $errorId = 1;
    //エラーメッセージを決定
    switch ($errorId) {
      case 0:{
        //戦闘を開始したため、メッセージを削除
        deleteMessage($pdo,$PLAYER_INFO['player_index_id'],$_POST['duel_application_approval']['message_id']);
        //戦闘を開始したため、申請情報を削除
        deletePlayerDuel($pdo,$PLAYER_INFO['player_index_id'],$_POST['duel_application_approval']['application_player_index_id']);
      }
      case 1:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "メッセージの処理に失敗しました。"; }
      break;
      case 2:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "相手と別のエリアに居るため、決闘を開始出来ません。"; }
      break;
      case 3:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "エリアデータ、またはマップデータの取得に失敗しました。"; }
      break;
      case 4:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "パーティデータの取得に失敗しました。"; }
      break;
      case 5:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "インスタンスの生成の準備に失敗しました。"; }
      break;
      case 6:{ $resultDuelApplicationApproval['error'] = $errorId; $resultDuelApplicationApproval['error_comment'] = "インスタンスの生成に失敗しました。"; }
      break;
      default:
      break;
    }

    $RESULT_JSON = $RESULT_JSON + array('duel_application_approval_response_data' => $resultDuelApplicationApproval);

    // $applicationPlayerIndexId = -1;
    // $mapMasterId = -1;
    // if(isset($_POST['duel_application_approval']['map_id'])) $mapMasterId = $_POST['duel_application_approval']['map_id'];
    // if(isset($_POST['duel_application_approval']['application_player_index_id'])) $applicationPlayerIndexId = $_POST['duel_application_approval']['application_player_index_id'];
    // $playerDuelData = getPlayerDuelData($pdo,$PLAYER_INFO['player_index_id'],$applicationPlayerIndexId);
    // $enemyInfo = getPlayerInfoForIndexId($pdo,$applicationPlayerIndexId,true);
    // $enemyName = getPlayerName($pdo,$applicationPlayerIndexId);
    // if($playerDuelData != false && $enemyInfo != false){ //申請内容をチェック
    //   //戦闘を開始
    //   $playerIndexId = $PLAYER_INFO['player_index_id'];
    //   $enemyIndexId = $enemyInfo['player_index_id'];
    //   $playerMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);//パーティメンバーを取得
    //   $enemyMemberDatas = getPartyMemberPlayerDatas($pdo,$enemyInfo['player_party_index_id']);//パーティメンバーを取得
    //   $playerPartyData = getPlayerParty($pdo,$PLAYER_INFO['player_party_index_id']);
    //   $enemyPartyData = getPlayerParty($pdo,$enemyInfo['player_party_index_id']);
    //   $mapMasterData = getMapMasterData($pdo,$mapMasterId);
    //   $getBattleResult = getPvpBattleResult($pdo,$playerIndexId,$enemyIndexId,$playerMemberDatas,$enemyMemberDatas,$STATUS_IDS,$playerPartyData,$enemyPartyData,$mapMasterData);
    //   //戦闘を開始したため、メッセージを削除
    //   deleteMessage($pdo,$PLAYER_INFO['player_index_id'],$_POST['duel_application_approval']['message_id']);
    //   //戦闘を開始したため、申請情報を削除
    //   deletePlayerDuel($pdo,$PLAYER_INFO['player_index_id'],$_POST['duel_application_approval']['application_player_index_id']);
    //   //挿入したバトルログのIDを取得
    //   if($getBattleResult != false && isset($getBattleResult['insert_pvp_battle_log_id'])){
    //     $msgText = $enemyName."と行った決闘の結果を確認出来ます";
    //     insertPlayerMessage($pdo,2,"決闘結果",$msgText,$PLAYER_INFO['player_index_id'],$getBattleResult['insert_pvp_battle_log_id'],"",""); //決闘結果のメッセージを自分に送信
    //     $msgText = $PLAYER_MASTER['player_name']."と行った決闘の結果を確認出来ます";
    //     insertPlayerMessage($pdo,2,"決闘結果",$msgText,$applicationPlayerIndexId,$getBattleResult['insert_pvp_battle_log_id'],"",""); //決闘結果のメッセージを相手に送信
    //   }
    //   $RESULT_JSON = $RESULT_JSON + array('result_battle_data' => $getBattleResult);
    // }
  }
  if(isset($_POST['duel_result_check']) && isset($_POST['duel_result_check']['pvp_battle_log_json_id'])){ //決闘の確認が行われた
    $resultCheckPvpBattleLog = array();
    $resultCheckPvpBattleLog['error'] = 0;
    $resultCheckPvpBattleLog['error_comment'] = "";
    $resultCheckPvpBattleLog['result_pvp_battle_log'] = false;
    $resultPvpBattleLog = getPvpBattleLog($pdo,$_POST['duel_result_check']['pvp_battle_log_json_id']); //戦闘ログを取得
    if($resultPvpBattleLog != false){
      $resultCheckPvpBattleLog['result_pvp_battle_log'] = $resultPvpBattleLog;
    }
    else{
      $resultCheckPvpBattleLog['error'] = 1;
      $resultCheckPvpBattleLog['error_comment'] = "データの取得に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_check_pvp_battle_log' => $resultCheckPvpBattleLog);
  }
  if(isset($_POST['player_kill_result_check']) && isset($_POST['player_kill_result_check']['pvp_battle_log_json_id'])){ //殺害の確認が行われた
    $resultCheckPlayerKillBattleLog = array();
    $resultCheckPlayerKillBattleLog['error'] = 0;
    $resultCheckPlayerKillBattleLog['error_comment'] = "";
    $resultCheckPlayerKillBattleLog['result_pvp_battle_log'] = false;
    $resultPvpBattleLog = getPvpBattleLog($pdo,$_POST['player_kill_result_check']['pvp_battle_log_json_id']); //戦闘ログを取得
    if($resultPvpBattleLog != false){
      $resultCheckPlayerKillBattleLog['result_pvp_battle_log'] = $resultPvpBattleLog;
    }
    else{
      $resultCheckPlayerKillBattleLog['error'] = 1;
      $resultCheckPlayerKillBattleLog['error_comment'] = "データの取得に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_check_pvp_battle_log' => $resultCheckPlayerKillBattleLog);
  }
  if(isset($_POST['player_join_battle']) && isset($_POST['player_join_battle']['battle_instance_id'])){ //戦闘参加が行われた
    $resultPlayerJoinBattle = array();
    $resultPlayerJoinBattle['error'] = 0;
    $resultPlayerJoinBattle['error_comment'] = "";
    $resultPlayerJoinBattle['battle_instance_id'] = -1;
    //メッセージが存在するか確認
    $selectMsg = selectPlayerMessageForMessageId($pdo,$_POST['player_join_battle']['message_id']);
    if($selectMsg == false || $selectMsg['player_index_id'] != $PLAYER_INFO['player_index_id']){
      $resultPlayerJoinBattle['error'] = 1;
      $resultPlayerJoinBattle['error_comment'] = "データが見つかりません";
    }
    else{
      if($selectMsg['message_type'] == 4 || $selectMsg['message_type'] == 5){ //索敵か救援の場合はメッセージを更新
        updatePlayerMessage($pdo,$PLAYER_INFO['player_index_id'],$selectMsg['message_id'],"","","1"); //チェック済みに更新
      }
      //バトルインスタンスが存在するかチェック
      $biControle = new BattleInstanceControle();
      $getBattleInstance = $biControle->GetBattleInstance($pdo,$redis,(int)$selectMsg['param_1']);
      if($getBattleInstance == null){
        $resultPlayerJoinBattle['error'] = 1;
        $resultPlayerJoinBattle['error_comment'] = "戦闘データが見つかりません";
      }
      else{
        $resultPlayerJoinBattle['battle_instance_id'] = $selectMsg['param_1'];
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_player_join_battle' => $resultPlayerJoinBattle);
  }
  if(isset($_POST['player_rescue_result_check']) && isset($_POST['player_rescue_result_check']['battle_instance_id'])){ //戦闘結果(救援)の確認が行われた
    $resultCheckPlayerRescueBattleLog = array();
    $resultCheckPlayerRescueBattleLog['error'] = 0;
    $resultCheckPlayerRescueBattleLog['error_comment'] = "";
    $resultCheckPlayerRescueBattleLog['result_pvp_battle_log'] = false;
    if(isset($_POST['player_rescue_result_check']['message_id']) && isset($_POST['player_rescue_result_check']['message_type'])){
      if($_POST['player_rescue_result_check']['message_type'] == 4 || $_POST['player_rescue_result_check']['message_type'] == 5){ //索敵か救援の場合はメッセージを更新
        updatePlayerMessage($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_rescue_result_check']['message_id'],"","","1"); //チェック済みに更新
      }
    }
    $resultPvpBattleLog = getPvpBattleLog($pdo,$_POST['player_rescue_result_check']['pvp_battle_log_json_id']); //戦闘ログを取得
    if($resultPvpBattleLog != false){
      $resultCheckPlayerRescueBattleLog['result_pvp_battle_log'] = $resultPvpBattleLog;
    }
    else{
      $resultCheckPlayerRescueBattleLog['error'] = 1;
      $resultCheckPlayerRescueBattleLog['error_comment'] = "データの取得に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_check_pvp_battle_log' => $resultCheckPlayerRescueBattleLog);
  }
}

echo json_encode($RESULT_JSON);
