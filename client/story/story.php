<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/story/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  //ステージ開始の操作が行われた
  if(isset($_POST['player_main_story_stanby'])){
    $setHash = checkPlayerOpenMainStory($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_main_story_stanby']); //正常であればハッシュを取得
    if($setHash != false){ //開放されたステージかチェック
      $playerEventCount = getPlayerEventCount($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_main_story_stanby']);
      if($playerEventCount != false){
        if($playerEventCount['event_count'] != 0){ //ストーリーに進行があった場合
          $RESULT_JSON = $RESULT_JSON + array('check_main_story_continue' => $playerEventCount); //ストーリー進行状態を取得
        }
      }
      else{ //プレイヤーイベントが存在しない場合、新たに発行する。
        eventStart($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_main_story_stanby']);
      }
      $RESULT_JSON = $RESULT_JSON + array('check_main_story' => $setHash);
    }
    else{
      $setHash = -1;
      //エラー処理
      $RESULT_JSON = $RESULT_JSON + array('check_main_story' => $setHash);
    }
  }
  //ストーリー継続からの応答があった
  if(isset($_POST['player_story_continue_result']) && isset($_POST['player_continue_story_id'])){
    $resultStoryEventCount = 0;
    if($_POST['player_story_continue_result'] == 1){
      $playerEventCount = getPlayerEventCount($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_continue_story_id']);
      $resultStoryEventCount = $playerEventCount['event_count'];
    }
    if($_POST['player_story_continue_result'] == 0){
      $resultStoryEventCount = eventStart($pdo,$PLAYER_INFO['player_index_id'],$_POST['player_continue_story_id']);
    }
    $RESULT_JSON = $RESULT_JSON + array('result_continue_player_event_count' => $resultStoryEventCount);
  }
  //メインストーリーマスターデータ取得
  $mainStoryMasterDatas = getMainStoryMasterDatas($pdo);
  if($mainStoryMasterDatas != false){
    $RESULT_JSON = $RESULT_JSON + array('main_story_master_datas' => $mainStoryMasterDatas);
  }
  //プレイヤーが解放したフラグを取得
  $playerOpenFlags = getPlayerOpenFlag($pdo,$PLAYER_INFO['player_index_id']);
  if($playerOpenFlags != false){
    $RESULT_JSON = $RESULT_JSON + array('player_open_flags' => $playerOpenFlags);
  }
  //ストーリーの解放条件一覧を取得
  $mainStoryOpenFlags = getMainStoryOpenFlags($pdo);
  if($mainStoryOpenFlags != false){
    $RESULT_JSON = $RESULT_JSON + array('main_story_open_flags' => $mainStoryOpenFlags);
  }
}

echo json_encode($RESULT_JSON);



































 ?>
