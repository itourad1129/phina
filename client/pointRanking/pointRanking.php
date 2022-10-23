<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/redisConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/pointRanking/index.php';
include_once '../../module/item/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/asset/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $pointRankingDurationId = 0;
  $pointRankingDurationData = false;
  $pointRankingMasterData = false;
  $durationStep = 0;
  //シーンに必要なアセットを追加
  if($addLoadAssetTags == "") $addLoadAssetTags = $addLoadAssetTags."ui_effect_1";
  else $addLoadAssetTags = $addLoadAssetTags.",ui_effect_1";
  //ポイントランキングに期限データが設定されているかチェック
  if(isset($_POST['point_ranking_init']) && isset($_POST['point_ranking_init']['point_ranking_duration_id'])){ //期間IDが設定されていた場合
    if($_POST['point_ranking_init']['point_ranking_duration_id'] != -1) $pointRankingDurationId = $_POST['point_ranking_init']['point_ranking_duration_id'];
  }
  if(isset($_POST['point_ranking_duration_id']) && $_POST['point_ranking_duration_id'] != 0){
    $pointRankingDurationId = (int)$_POST['point_ranking_duration_id'];
  }

  if($pointRankingDurationId != 0){
    //期限IDから期限データを取得
    $pointRankingDurationData = getPointRankingDurationData($pdo,$pointRankingDurationId);
    //ポイントランキングマスターデータを取得
    if($pointRankingDurationData != false){
      //ポイントランキングのマスターデータを取得
      $pointRankingMasterData = getPointRankingMasterData($pdo,$pointRankingDurationData['point_ranking_id']);
      //期間ステップを取得 0:期間外 1:開催中&ポイント送信期間 2:結果発表&報酬獲得期間
      $durationStep = getPointRankingDurationStep($pointRankingDurationData);
      $RESULT_JSON = $RESULT_JSON + array('result_point_ranking_duration_step' => $durationStep);
    }
  }
  if($durationStep == 0){ //イベントは期間外だった
    $RESULT_JSON = $RESULT_JSON + array('result_point_ranking_duration_error' => 0);
  }
  else if($pointRankingDurationId != 0 && $pointRankingDurationData != false && $pointRankingMasterData != false){ //期限データが正常の場合、処理を続行

    //自分のランキングデータを取得
    $playerRankingDataOne = array();
    $playerRankingDataOne['score'] = -1;
    $playerRankingDataOne['rank'] = -1;
    if($playerPointRankingDatas != null && isset($playerPointRankingDatas['ranking_data'])){ //既に自分のランキングデータを取得している場合はそこから設定
      foreach ($playerPointRankingDatas['ranking_data'] as $pptrData) {
        if((int)$pptrData['player_index_id'] == (int)$PLAYER_INFO['player_index_id']){
          $playerRankingDataOne['score'] = $pptrData['point_ranking_score'];
          $playerRankingDataOne['rank'] = $pptrData['point_ranking_rank'];
          break;
        }
      }
    }
    if($playerRankingDataOne['score'] == -1 && $playerRankingDataOne['rank'] == -1){ //取得していない場合は、レディースから取得
      $getPlayerPointRankingData = getPlayerPointRankingData($pdo,$redis,$PLAYER_INFO['player_index_id'],$pointRankingDurationData['point_ranking_duration_id']);
      if($getPlayerPointRankingData['score'] != -1 && $getPlayerPointRankingData['rank'] != -1){
        $playerRankingDataOne['score'] = $getPlayerPointRankingData['score'];
        $playerRankingDataOne['rank'] = $getPlayerPointRankingData['rank'];
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_player_point_ranking_data_one' => $playerRankingDataOne);

    //景品の獲得を実行した
    if(isset($_POST['get_point_ranking_reward'])){
      $resultGetPlayerPointRankingReward = getPlayerPointRankingReward($pdo,$redis,$PLAYER_INFO['player_index_id'],$PLAYER_INFO,$pointRankingDurationData['point_ranking_duration_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_get_player_point_ranking_reward' => $resultGetPlayerPointRankingReward);
    }

    if(isset($_POST['point_ranking_init'])){ //初期化処理を実行
      $resultPointRankingInit = array();
      $resultPointRankingInit['point_ranking_master_data'] = $pointRankingMasterData;
      $resultPointRankingInit['point_ranking_duration_data'] = $pointRankingDurationData;
      $resultPointRankingInit['point_ranking_reward_data'] = getPointRankingReward($pdo,$pointRankingMasterData['ranking_reward_id']);
      $checkGetRewardFlag = checkGetPointRankingReward($pdo,$PLAYER_INFO['player_index_id'],$pointRankingDurationData['point_ranking_duration_id'],$durationStep,$playerRankingDataOne['rank'],$resultPointRankingInit['point_ranking_reward_data']);
      $resultPointRankingInit['get_point_ranking_reward_flag'] = $checkGetRewardFlag['flag'] == true ? 1 : 0;
      $resultPointRankingInit['get_point_ranking_reward_error'] = $checkGetRewardFlag['error'];
      $resultPointRankingInit['get_point_ranking_reward_error_comment'] = $checkGetRewardFlag['error_comment'];
      $RESULT_JSON = $RESULT_JSON + array('result_point_ranking_init' => $resultPointRankingInit);
    }
    //ポイントを送信した
    if(isset($_POST['add_point_num']) && isset($_POST['point_item_id']) && is_numeric($_POST['add_point_num']) && is_numeric($_POST['point_item_id'])){
      addRankingPoint($pdo,$redis,$pointRankingDurationData['point_ranking_duration_id'],$PLAYER_INFO['player_index_id'],$_POST['point_item_id'],$_POST['add_point_num']);
      $RESULT_JSON = $RESULT_JSON + array('result_add_point' => 0);
    }

    //プレイヤーの所持ポイントを取得
    if(isset($_POST['get_player_item'])){
      $playerItemData = selectPlayerItemData($pdo,$PLAYER_INFO['player_index_id'],$pointRankingMasterData['point_item_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_player_item_data' => $playerItemData);
    }
    //Topランカーの5人を取得
    $getTopRanker = getPointRankingDatas($pdo,$redis,0,4,$pointRankingDurationData['point_ranking_duration_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_top_ranker_datas' => $getTopRanker);

    //プレイヤーの現在のランキングと他のユーザーのランキングを取得
    $playerPointRankingDatas = null;
    $playerPointRankingDatas = getPlayerPointRankingDatas($pdo,$redis,$PLAYER_INFO['player_index_id'],$pointRankingDurationData['point_ranking_duration_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_point_ranking_datas' => $playerPointRankingDatas);

    //指定した順位でランキングを取得
    if(isset($_POST['get_point_ranking_datas']) && isset($_POST['get_point_ranking_datas']['min_rank']) && isset($_POST['get_point_ranking_datas']['max_rank'])){
      $getPointRankingDatas = getPointRankingDatas($pdo,$redis,(int)$_POST['get_point_ranking_datas']['min_rank'],(int)$_POST['get_point_ranking_datas']['max_rank'],$pointRankingDurationData['point_ranking_duration_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_point_ranking_datas' => $getPointRankingDatas);
    }
  }
  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
