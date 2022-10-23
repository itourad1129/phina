<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/effect/index.php';
include_once '../../module/message/index.php';
include_once '../../module/area/index.php';
include_once '../../module/pvp/index.php';

updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['karma_menu_init'])){ //カルマメニューの初期化を行った
    $RESULT_JSON = $RESULT_JSON + array('karma_menu_init' => true);
    //カルマ効果を取得
    $karmaEffects = getKarmaEffects($pdo,$PLAYER_INFO['player_karma']);
    $RESULT_JSON = $RESULT_JSON + array('karma_effect_datas' => $karmaEffects);
    //メッセージ一覧を取得
    $playerMessage = getPlayerMessage($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('player_message' => $playerMessage);
    //プレイヤーの検索状態を取得
    $playerSearchData = selectPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('player_search_data' => $playerSearchData);
  }
  if(isset($_POST['karma_command_start'])){ //カルマアクションが実行された
    $karmaEffects = getKarmaEffects($pdo,$PLAYER_INFO['player_karma']);
    $resultStartCommand = array();
    $resultStartCommand['error'] = 0;
    $resultStartCommand['error_comment'] = "";
    $resultStartCommand['effect_id'] = -1;
    $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーのエリアIDを取得
    if($_POST['karma_command_start'] == 1){ //殺害プレイヤーの検索を開始した
      $commandCheck = false;
      foreach ($karmaEffects as $effect) {
        if($effect['effect_id'] == 21) { //プレイヤー索敵コマンドが解除されていた。
          $commandCheck = true;
        }
      }
      if($commandCheck == true){ //コマンド発動可能
        insertAndUpdatePlayerSearchData($pdo,$PLAYER_INFO['player_index_id'],0); //殺害対象検索を登録
        $resultStartCommand['effect_id'] = 21;
      }
      else{
        $resultStartCommand['error'] = 1;
        $resultStartCommand['error_comment'] = "カルマスキルが解放されていません";
      }
    }
    if($_POST['karma_command_start'] == 2){ //救援プレイヤーの検索を開始した
      $commandCheck = false;
      foreach ($karmaEffects as $effect) {
        if($effect['effect_id'] == 22) { //プレイヤー救援コマンドが解除されていた。
          $commandCheck = true;
        }
      }
      if($commandCheck == true){ //コマンド発動可能
        insertAndUpdatePlayerSearchData($pdo,$PLAYER_INFO['player_index_id'],1); //救援対象検索を登録
        $resultStartCommand['effect_id'] = 22;
      }
      else{
        $resultStartCommand['error'] = 1;
        $resultStartCommand['error_comment'] = "カルマスキルが解放されていません";
      }
    }
    if($resultStartCommand['effect_id'] == -1){ //コマンドが実行出来ていない場合
      $resultStartCommand['error'] = 2;
      $resultStartCommand['error_comment'] = "実行に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_karma_command_start' => $resultStartCommand); //コマンド実行結果
    //プレイヤーの検索状態を取得
    $playerSearchData = selectPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('player_search_data' => $playerSearchData);
  }

  if(isset($_POST['karma_command_cancel'])){ //カルマコマンドのキャンセルを行った
    $resultCommandCancel = array();
    $resultCommandCancel['error'] = 0;
    $resultCommandCancel['error_comment'] = "";
    $resultPlSearchDelete = deletePlayerSearchData($pdo,$PLAYER_INFO['player_index_id']);
    if($resultPlSearchDelete === false){
      $resultCommandCancel['error'] = 1;
      $resultCommandCancel['error_comment'] = "取り消しに失敗しました。";
    }
    else{
      //プレイヤーの検索状態を取得
      $playerSearchData = selectPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']);
      $RESULT_JSON = $RESULT_JSON + array('player_search_data' => $playerSearchData);
    }
    $RESULT_JSON = $RESULT_JSON + array('result_karma_command_cancel' => $resultCommandCancel);
  }

  if(isset($_POST['check_battle_result']) && isset($_POST['check_battle_result']['message_id'])){ //戦闘結果の確認を行った
    $resultCheckBattle = array();
    $resultCheckBattle['error'] = 0;
    $resultCheckBattle['error_comment'] = "";
    $selectPlayerMsg = selectPlayerMessageForMessageId($pdo,$_POST['check_battle_result']['message_id']);
    if($selectPlayerMsg != false && $selectPlayerMsg['player_index_id'] == $PLAYER_INFO['player_index_id']){
      if($selectPlayerMsg['message_type'] == 4 || $selectPlayerMsg['message_type'] == 5){ //索敵か救援である
        $resultPvpBattleLog = getPvpBattleLog($pdo,$selectPlayerMsg['param_1']); //戦闘ログを取得
        if($resultPvpBattleLog != false){
          $resultCheckBattle['result_pvp_battle_log'] = $resultPvpBattleLog;
          //戦闘の確認を行ったため、メッセージのフラグを全て1にする
          updateKarmaCommandMessage($pdo,$PLAYER_INFO['player_index_id']);
        }
        else{
          $resultCheckBattle['error'] = 1;
          $resultCheckBattle['error_comment'] = "データの取得に失敗しました。";
        }
      }
      else{
        $resultCheckBattle['error'] = 2;
        $resultCheckBattle['error_comment'] = "メッセージの取得に失敗しました。";
      }
    }
    else{
      $resultCheckBattle['error'] = 3;
      $resultCheckBattle['error_comment'] = "メッセージの取得に失敗しました。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_check_battle' => $resultCheckBattle);
  }
}

echo json_encode($RESULT_JSON);
