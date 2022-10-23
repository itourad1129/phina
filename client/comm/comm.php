<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/story/index.php';
include_once '../../module/comm/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['set_comm_id']) && isset($_POST['check_story_id']) && isset($_POST['check_player_event_count'])){ //解放されているストーリーの会話データかチェックを行う。
    if(checkPlayerOpenMainStoryCommData($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_comm_id'],$_POST['check_story_id'],$_POST['check_player_event_count']) != false){
      //会話データ取得
      $resultCommData = loadCommXml($pdo,$_POST['set_comm_id']);
      if($resultCommData != false){
        $RESULT_JSON = $RESULT_JSON + array('result_comm_data' => $resultCommData);
      }
    }
    else{
      //エラー処理
    }
  }

  if(isset($_POST['end_comm_scene'])){ //シーン終了データがあった場合、会話コンテンツの終了処理を行う
    $resultCommClear = commClear($pdo,$PLAYER_INFO['player_index_id'],$_POST['end_comm_scene']['main_story_master_id'],$_POST['end_comm_scene']);
    $RESULT_JSON = $RESULT_JSON + array('result_comm_clear' => $resultCommClear);
  }
}

echo json_encode($RESULT_JSON);
