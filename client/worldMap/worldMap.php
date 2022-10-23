<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/area/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/mount/index.php';
include_once '../../module/masterData/index.php';
include_once '../../module/shootingGame/index.php';
include_once '../../module/effect/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['world_map_init'])){ //初期通信が行われた
    $resultInit = array();
    //プレイヤーの現在居るエリアを取得(ワールドのマスターデータを含む)
    $resultInit['player_area_instance'] = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id'],false);
    $resultInit['player_area_instance_all'] = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
    $resultInit['player_select_mount_data'] = getPlayerActiveMountData($pdo,$PLAYER_INFO['player_index_id']);
    $resultInit['player_karma_effect_datas'] = getKarmaEffects($pdo,$PLAYER_INFO['player_karma']); //カルマ効果を取得
    foreach ($resultInit['player_karma_effect_datas'] as $karmaEffect) {
      if($karmaEffect['effect_id'] == 21){ //プレイヤー索敵が解放されていた場合
        $getStgPlayerSearchData = getStgPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']); //索敵情報を取得
        if($getStgPlayerSearchData != false){
          $resultInit['player_stg_search_data'] = $getStgPlayerSearchData;
        }
        break;
      }
    }

    $RESULT_JSON = $RESULT_JSON + array('result_world_map_init' => $resultInit);
  }
  if(isset($_POST['move_start_area_id'])){ //エリアの移動を行った
    $resultStartMoveArea = areaMoveStart($pdo,$PLAYER_INFO['player_index_id'],$_POST['move_start_area_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_move_start_area' => $resultStartMoveArea);
    if(isset($resultStartMoveArea['error']) && $resultStartMoveArea['error'] == 0){
      //移動したため、更新用プレイヤーエリアインスタンスを取得
      $resultUpdatePlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id'],false);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_area_instance' => $resultUpdatePlayerAreaInstance);
      $resultUpdatePlayerAreaInstanceAll = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
      $RESULT_JSON = $RESULT_JSON + array('result_update_player_area_instance_all' => $resultUpdatePlayerAreaInstanceAll);
    }
  }
  if(isset($_POST['area_move_cancel'])){ //エリア移動の取消しを行った
    updateAreaMoveCancel($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_area_move_cancel' => 0);
    //移動状態に変更があったため、更新用プレイヤーエリアインスタンスを取得
    $resultUpdatePlayerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id'],false);
    $RESULT_JSON = $RESULT_JSON + array('result_update_player_area_instance' => $resultUpdatePlayerAreaInstance);
    $resultUpdatePlayerAreaInstanceAll = getPlayerAreaInstanceAll($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_update_player_area_instance_all' => $resultUpdatePlayerAreaInstanceAll);
  }
  if(isset($_POST['go_to_mount_scene'])){ //マウントシーン移動のため、アセットを追加読み込み
    $mountMasterDatas = getMountMasterDatas($pdo);
    //取得するアセットID配列を指定
    $mountIconAnimAssetIds = array(); //マウントアイコンアニメーションのアセットID配列
    foreach ($mountMasterDatas as $mountData) {
      $addFlag = true;
      for ($i=0; $i < count($mountIconAnimAssetIds); $i++) {
        if($mountIconAnimAssetIds[$i] == $mountData['mount_asset_id']) $addFlag = false;
      }
      if($addFlag == true){ //追加されて居ない場合、追加
        $mountIconAnimAssetIds[count($mountIconAnimAssetIds)] = $mountData['mount_asset_id'];
      }
    }
    $tags = ""; //追加読み込みアセットタグ カンマ区切り
    for ($i=0; $i < count($mountIconAnimAssetIds); $i++) {
      if($tags == "") $tags = "mount_icon_anim_".$mountIconAnimAssetIds[$i];
      else $tags = $tags.",mount_icon_anim_".$mountIconAnimAssetIds[$i];
    }
    $resultAddMountAssetDatas = getAssetDatas($pdo,$tags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_mount_asset_datas' => $resultAddMountAssetDatas);
  }
  if(isset($_POST['go_to_stg_scene'])){ //STGシーン移動のため、アセットを追加読み込み
    $resultStgSceneAddAssetDatas = array();
    $mountMasterDatas = getMdataMountMaster($pdo);
    $stgEnemyMasterDatas = getMdataStgEnemyMaster($pdo);
    $stgBgAssetDatas = getAssetDatasSearchAssetCategoryId($pdo,19); //背景スクロール画像のアセットデータを全て取得
    $stgEffectAssetDatas = getAssetDatasSearchAssetCategoryId($pdo,21); //エフェクトアニメーションのアセットデータを全て取得
    $stgBombAnimAssetDatas = getAssetDatasSearchAssetCategoryId($pdo,24); //STGボムアニメーション画像を全て取得
    $stgUiAnimAssetDatas = getStgUiAnimAssetDatas($pdo);//STGのUIアニメーションアセットデータを取得
    //取得するアセットID配列を作成
    $mountGameAnimAssetIds = array(); //マウントゲーム用アニメーションのアセットID配列
    foreach ($mountMasterDatas as $mountData) {
      $addFlag = true;
      for ($i=0; $i < count($mountGameAnimAssetIds); $i++) {
        if($mountGameAnimAssetIds[$i] == $mountData['mount_game_asset_id']) $addFlag = false;
      }
      if($addFlag == true){ //追加されて居ない場合、追加
        $mountGameAnimAssetIds[count($mountGameAnimAssetIds)] = $mountData['mount_game_asset_id'];
      }
    }
    $tags = ""; //追加読み込みアセットタグ カンマ区切り
    for ($i=0; $i < count($mountGameAnimAssetIds); $i++) {
      if($tags == "") $tags = "mount_stg_anim_".$mountGameAnimAssetIds[$i];
      else $tags = $tags.",mount_stg_anim_".$mountGameAnimAssetIds[$i];
    }

    //取得するアセットID配列を作成
    $mountEnemyAnimAssetIds = array(); //マウント敵アニメーションのアセットID配列
    foreach ($stgEnemyMasterDatas as $enemyData) {
      $addFlag = true;
      for ($i=0; $i < count($mountEnemyAnimAssetIds); $i++) {
        if($mountEnemyAnimAssetIds[$i] == $enemyData['stg_enemy_asset_id']) $addFlag = false;
      }
      if($addFlag == true){ //追加されて居ない場合、追加
        $mountEnemyAnimAssetIds[count($mountEnemyAnimAssetIds)] = $enemyData['stg_enemy_asset_id'];
      }
    }
    for ($i=0; $i < count($mountEnemyAnimAssetIds); $i++) {
      if($tags == "") $tags = "mount_stg_enemy_anim_".$mountEnemyAnimAssetIds[$i];
      else $tags = $tags.",mount_stg_enemy_anim_".$mountEnemyAnimAssetIds[$i];
    }

    //取得するアセットID配列を作成
    foreach ($stgBgAssetDatas as $assetData) {
      if($tags == "") $tags = $assetData['tag'];
      else $tags = $tags.",".$assetData['tag'];
    }

    //取得するアセットID配列を作成
    foreach ($stgEffectAssetDatas as $assetData) {
      if($tags == "") $tags = $assetData['tag'];
      else $tags = $tags.",".$assetData['tag'];
    }

    //STGUI:アニメ用アセットデータを取得
    foreach ($stgUiAnimAssetDatas as $assetData) {
      if($tags == "") $tags = $assetData['tag'];
      else $tags = $tags.",".$assetData['tag'];
    }

    //取得するアセットID配列を作成
    foreach ($stgBombAnimAssetDatas as $assetData) {
      if($tags == "") $tags = $assetData['tag'];
      else $tags = $tags.",".$assetData['tag'];
    }

    //他に追加するアセットがあれば、tag に追記させる。

    $resultStgSceneAddAssetDatas = getAssetDatas($pdo,$tags);
    $RESULT_JSON = $RESULT_JSON + array('result_stg_scene_add_asset_datas' => $resultStgSceneAddAssetDatas);
  }
  if(isset($_POST['stgStartPlayerSearch'])){ //プレイヤー索敵を開始した
    $resultStartPlayerSearch = array();
    $resultStartPlayerSearch['error'] = 1;
    $resultStartPlayerSearch['error_comment'] = "通信エラーが発生しました。";
    $playerSelectMoudData = getPlayerActiveMountData($pdo,$PLAYER_INFO['player_index_id']);
    $playerAreaInstance = getPlayerAreaInstance($pdo,$PLAYER_INFO['player_index_id']);
    if($playerSelectMoudData != false){
      if($playerAreaInstance != false){
        $resultPlayerSearch = stgPlayerSearchStart($pdo,$PLAYER_INFO['player_index_id'],$playerAreaInstance['area_id'],$playerSelectMoudData);
        if($resultPlayerSearch['error'] == 0){ //更新正常
          $resultStartPlayerSearch['error'] = 0;
          $resultStartPlayerSearch['error_comment'] = "";
        }
        else{ //更新エラー
          $resultStartPlayerSearch['error'] = $resultPlayerSearch['error'];
          $resultStartPlayerSearch['error_comment'] = $resultPlayerSearch['error_comment'];
        }
      }
      else{
        $resultStartPlayerSearch['error'] = 2;
        $resultStartPlayerSearch['error_comment'] = "プレイヤーエリアデータの取得に失敗しました。";
      }
    }
    else{
      $resultStartPlayerSearch['error'] = 2;
      $resultStartPlayerSearch['error_comment'] = "プレイヤーマウントデータの取得に失敗しました。";
    }
    //更新する必要があるデータを取得
    $getStgPlayerSearchData = getStgPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']); //索敵情報を取得
    if($getStgPlayerSearchData != false){
      $RESULT_JSON = $RESULT_JSON + array('update_start_stg_player_search' => $getStgPlayerSearchData);
    }
    $getPlayerSelectMountData = getPlayerActiveMountData($pdo,$PLAYER_INFO['player_index_id']);
    if($getPlayerSelectMountData != false){
      $RESULT_JSON = $RESULT_JSON + array('update_player_select_mount_data' => $getPlayerSelectMountData);
    }
    //索敵開始結果
    $RESULT_JSON = $RESULT_JSON + array('result_start_stg_player_search' => $resultStartPlayerSearch);
  }
  if(isset($_POST['stgCancelPlayerSearch'])){ //プレイヤーの索敵をキャンセルした。
    $cancelResult = deleteStgPlayerSearch($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('cancel_stg_player_search' => $cancelResult);
    //更新する必要があるデータを取得
    $getStgPlayerSearchData = getStgPlayerSearchData($pdo,$PLAYER_INFO['player_index_id']); //索敵情報を取得
    if($getStgPlayerSearchData != false){
      $RESULT_JSON = $RESULT_JSON + array('update_start_stg_player_search' => $getStgPlayerSearchData);
    }
  }
}

echo json_encode($RESULT_JSON);
