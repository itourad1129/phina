<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/shootingGame/index.php';
include_once '../../module/message/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['shooting_game_init'])){ //初期通信が行われた
    $resultInit = array();
    $resultInit['result_start_shooting_game'] = startShootingGame($pdo,$PLAYER_INFO['player_index_id']); //シューティングゲーム開始前に必要な通信処理
    $resultInit['result_stg_pvp_matching'] = null;
    //敵プレイヤーとマッチングが成立したか。
    if(isset($resultInit['result_start_shooting_game']['result_player_area_instance'])
    && $resultInit['result_start_shooting_game']['result_player_area_instance'] != null
    && isset($resultInit['result_start_shooting_game']['result_player_mount_data'])
    && $resultInit['result_start_shooting_game']['result_player_mount_data'] != null){
      $playerAreaInstnace = $resultInit['result_start_shooting_game']['result_player_area_instance'];
      $playerMount = $resultInit['result_start_shooting_game']['result_player_mount_data'];
      $checkStgPvp = checkStgPvp($pdo,$playerAreaInstnace['area_id']);
      if($checkStgPvp == true){ //マッチング開始
        $resultMatching = rotStgPlayerSearch($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_party_index_id'],$playerAreaInstnace['area_id'],$playerMount['mount_type']);
        $resultInit['result_stg_pvp_matching'] = $resultMatching;
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_shooting_game_init' => $resultInit);
  }
  if(isset($_POST['shooting_game_clear']) && isset($_POST['shooting_game_clear']['rank'])){ //STGクリア確認の通信が行われた。
    $resultClearShootingGame = clearShootingGame($pdo,$PLAYER_INFO,$_POST['shooting_game_clear']['rank']);
    $RESULT_JSON = $RESULT_JSON + array('result_shooting_game_clear' => $resultClearShootingGame);
    if(isset($_POST['shooting_game_clear']['pvp_clear_flag']) && isset($_POST['shooting_game_clear']['enemy_player_index_id'])){ //PVPクリアフラグ
      if($_POST['shooting_game_clear']['pvp_clear_flag'] == 1){ //PVPもクリアした
        insertPlayerMessage($pdo,7,"移動中の敵の奇襲に失敗しました。","奇襲に失敗しました。索敵状態を解除しました。",$_POST['shooting_game_clear']['enemy_player_index_id'],"","","");
        deleteStgPlayerSearch($pdo,$_POST['shooting_game_clear']['enemy_player_index_id']);
      }
      //クリアしてない処理は不要 pvp_win_enemy_playerで敵の勝利処理があるため
    }
  }
  if(isset($_POST['pvp_win_enemy_player']) && isset($_POST['pvp_win_enemy_player']['player_index_id'])){ //PVPで敵プレイヤーが勝利した
    $resultStgPvpEnemyPlayerWin = stgPvpEnemyPlayerWin($pdo,$PLAYER_INFO['player_index_id'],$_POST['pvp_win_enemy_player']['player_index_id']); //敵プレイヤー勝利処理を実行
    if($resultStgPvpEnemyPlayerWin['error'] == 0){ //更新が正常の場合、メッセージを送信
      insertPlayerMessage($pdo,6,"移動中の敵の奇襲に成功しました。","敵の奇襲に成功し、燃料を奪いました。",$_POST['pvp_win_enemy_player']['player_index_id'],"","","");
    }
    $RESULT_JSON = $RESULT_JSON + array('result_stg_pvp_enemy_player_win' => $resultStgPvpEnemyPlayerWin);
  }
}

echo json_encode($RESULT_JSON);
