<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/guild/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/equipItem/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
$checkPlayerGuildDataUpdate = -1; //クライアント呼び出し元のデータ更新が必要な場合ギルドIDが入る
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){

  if(isset($_POST['get_guild_member_list']) && is_numeric($_POST['get_guild_member_list'])){ //ギルドメンバーデータの取得
    //プレイヤーギルドデータ取得
    $resultPlayerGuildData = selectPlayerGuildDataForGuildId($pdo,$_POST['get_guild_member_list']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_guild_data' => $resultPlayerGuildData);

    //ギルドメンバー取得
    $resultGuildMemberDatas = getGuildMemberDatas($pdo,$_POST['get_guild_member_list']);
    $RESULT_JSON = $RESULT_JSON + array('result_guild_member_list' => $resultGuildMemberDatas);

    //ギルドメンバーのアバターデータを取得
    if(count($resultGuildMemberDatas) != 0){
      //リストに表示するアバターデータ
      $listPlayerData = array();
      foreach ($resultGuildMemberDatas as $playerData) {
        if(!isset($playerData['player_index_id'])) continue;
        $listPlayerData[$playerData['player_index_id']] = array();
        $listPlayerData[$playerData['player_index_id']]['player_avatar_data'] = null;
        $listPlayerData[$playerData['player_index_id']]['player_equip_item_data'] = null;
        $playerAvatarData = getPlayerAvatarData($pdo,$playerData['player_index_id']); //プレイヤーが所持しているアバターを取得
        $listPlayerData[$playerData['player_index_id']]['player_avatar_data'] = $playerAvatarData;
        //アバターアセットタグを追加
        $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
        if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

        //装備アバターアセットを追加
        $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$playerData['player_index_id']);
        $listPlayerData[$playerData['player_index_id']]['player_equip_item_data'] = $playerEquipItems;
        if($playerEquipItems != false){
          //装備アセット読み込みの為、アセットタグを生成
          foreach ($playerEquipItems as $equipItem) {
            $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
            if($equipAssetTag != ""){
              if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
              else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
            }
          }
        }
      }
      $RESULT_JSON = $RESULT_JSON + array('result_player_list_avatar_asset_datas' => $listPlayerData);
    }
  }
  //ギルドメンバーの昇格を行った
  if(isset($_POST['guild_member_class_up'])){
    $resultGuildMemberClassUp = guildMemberClassChange($pdo,$PLAYER_INFO['player_index_id'],$_POST['guild_member_class_up'],1);
    $RESULT_JSON = $RESULT_JSON + array('result_guild_member_class_up' => $resultGuildMemberClassUp);
  }
  //ギルドメンバーの降格を行った
  if(isset($_POST['guild_member_class_down'])){
    $resultGuildMemberClassDown = guildMemberClassChange($pdo,$PLAYER_INFO['player_index_id'],$_POST['guild_member_class_down'],-1);
    $RESULT_JSON = $RESULT_JSON + array('result_guild_member_class_down' => $resultGuildMemberClassDown);
  }
  //ギルド参加申請のリスト取得を行った
  if(isset($_POST['get_guild_join_application_player_list']) && is_numeric($_POST['get_guild_join_application_player_list'])){
    $getGuildId = $_POST['get_guild_join_application_player_list'];
    //ギルドの存在チェック
    $playerGuildData = selectPlayerGuildDataForGuildId($pdo,$getGuildId);
    if($playerGuildData != false){
      //不要な申請リストを事前に削除
      $deleteResult = deleteInvaildGuildApplicationData($pdo,$getGuildId);
      $getApplicationDatas = getGuildJoinApplications($pdo,$getGuildId);
      $RESULT_JSON = $RESULT_JSON + array('result_guild_join_application_player_list' => $getApplicationDatas);
      //プレイヤーデータの取得
      $getPlayerDatas = array();
      foreach ($getApplicationDatas as $applicationData) {
        $rowPlayerData = getPlayerInfoForIndexId($pdo,$applicationData['send_application_player_index_id'],true);
        if($rowPlayerData != false){
          array_push($getPlayerDatas,$rowPlayerData);
        }
      }
      $RESULT_JSON = $RESULT_JSON + array('result_player_datas' => $getPlayerDatas);
      $RESULT_JSON = $RESULT_JSON + array('result_player_guild_data' => $playerGuildData);
      if(count($getApplicationDatas) != 0){
        //リストに表示するアバターデータ
        $listPlayerData = array();
        foreach ($getApplicationDatas as $applicationData) {
          if(!isset($applicationData['send_application_player_index_id'])) continue;
          $getPlayerIndexId = $applicationData['send_application_player_index_id'];
          $listPlayerData[$getPlayerIndexId] = array();
          $listPlayerData[$getPlayerIndexId]['player_avatar_data'] = null;
          $listPlayerData[$getPlayerIndexId]['player_equip_item_data'] = null;
          $playerAvatarData = getPlayerAvatarData($pdo,$getPlayerIndexId); //プレイヤーが所持しているアバターを取得
          $listPlayerData[$getPlayerIndexId]['player_avatar_data'] = $playerAvatarData;
          //アバターアセットタグを追加
          $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
          if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
          else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

          //装備アバターアセットを追加
          $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$getPlayerIndexId);
          $listPlayerData[$getPlayerIndexId]['player_equip_item_data'] = $playerEquipItems;
          if($playerEquipItems != false){
            //装備アセット読み込みの為、アセットタグを生成
            foreach ($playerEquipItems as $equipItem) {
              $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
              if($equipAssetTag != ""){
                if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
                else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
              }
            }
          }
        }
        $RESULT_JSON = $RESULT_JSON + array('result_appliction_player_list_avatar_asset_datas' => $listPlayerData);
      }
    }
  }
  //ギルドメンバーを追放させた。
  if(isset($_POST['guild_member_expulsion']) && is_numeric($_POST['guild_member_expulsion'])){
    $resultGuildMemberExpulsion = guildMemberExpulsion($pdo,$PLAYER_INFO['player_index_id'],$_POST['guild_member_expulsion']);
    $RESULT_JSON = $RESULT_JSON + array('result_guild_member_expulsion' => $resultGuildMemberExpulsion);
  }
  //ギルドを離脱した
  if(isset($_POST['guild_exit']) && is_numeric($_POST['guild_exit'])){
    $resultMyGuildExit = guildMyGuildExit($pdo,$_POST['guild_exit'],$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_guild_exit' => $resultMyGuildExit);
  }
  //ギルド募集内容の変更を行った
  if(isset($_POST['setting_guild_scout_status']) && is_numeric($_POST['setting_guild_scout_status'])
  && isset($_POST['guild_id']) && is_numeric($_POST['guild_id'])){
    $resultSettingGuildScoutStatus = settingGuildScoutStatus($pdo,$PLAYER_INFO['player_index_id'],$_POST['guild_id'],$_POST['setting_guild_scout_status']);
    $RESULT_JSON = $RESULT_JSON + array('result_setting_guild_scout_status' => $resultSettingGuildScoutStatus);
    if(isset($resultSettingGuildScoutStatus['error']) && $resultSettingGuildScoutStatus['error'] == 0){
      //プレイヤーギルドデータの変更があったので、更新用データレスポンスに含めるフラグを立てる。
      $checkPlayerGuildDataUpdate = $_POST['guild_id'];
    }
  }
  //ギルドメッセージの変更
  if(isset($_POST['guild_message_update']) && isset($_POST['update_message_text'])){
    $guildId = $_POST['guild_message_update'];
    $resultGuildMessageUpdate = guildMessageUpdate($pdo,$PLAYER_INFO['player_index_id'],$guildId,$_POST['update_message_text']);
    $RESULT_JSON = $RESULT_JSON + array('result_guild_message_update' => $resultGuildMessageUpdate);
    if(isset($resultGuildMessageUpdate['error']) && $resultGuildMessageUpdate['error'] == 0){
      //プレイヤーギルドデータの変更があったので、更新用データレスポンスに含めるフラグを立てる。
      $checkPlayerGuildDataUpdate = $guildId;
    }
  }
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※
  //※実行は最後あたりで行うこと
  if($checkPlayerGuildDataUpdate != -1){ //プレイヤーギルドデータの更新用データが必要
    //プレイヤーギルドデータ取得
    $resultPlayerGuildData = selectPlayerGuildDataForGuildId($pdo,$checkPlayerGuildDataUpdate);
    $RESULT_JSON = $RESULT_JSON + array('get_update_player_guild_data' => $resultPlayerGuildData);
  }
  //メンバーリストの更新が行われた場合、メンバーデータを取得
  if(isset($_POST['update_guild_member_list']) && is_numeric($_POST['update_guild_member_list'])){
    //プレイヤーギルドデータ取得
    $resultPlayerGuildData = selectPlayerGuildDataForGuildId($pdo,$_POST['update_guild_member_list']);
    $RESULT_JSON = $RESULT_JSON + array('get_update_player_guild_data' => $resultPlayerGuildData);
    //ギルドメンバー取得
    $resultGuildMemberDatas = getGuildMemberDatas($pdo,$_POST['update_guild_member_list']);
    $RESULT_JSON = $RESULT_JSON + array('get_update_guild_member_list' => $resultGuildMemberDatas);
    //ギルドメンバーのアバターデータを取得
    if(count($resultGuildMemberDatas) != 0){
      //リストに表示するアバターデータ
      $listPlayerData = array();
      foreach ($resultGuildMemberDatas as $playerData) {
        if(!isset($playerData['player_index_id'])) continue;
        $listPlayerData[$playerData['player_index_id']] = array();
        $listPlayerData[$playerData['player_index_id']]['player_avatar_data'] = null;
        $listPlayerData[$playerData['player_index_id']]['player_equip_item_data'] = null;
        $playerAvatarData = getPlayerAvatarData($pdo,$playerData['player_index_id']); //プレイヤーが所持しているアバターを取得
        $listPlayerData[$playerData['player_index_id']]['player_avatar_data'] = $playerAvatarData;
        //アバターアセットタグを追加
        $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
        if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

        //装備アバターアセットを追加
        $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$playerData['player_index_id']);
        $listPlayerData[$playerData['player_index_id']]['player_equip_item_data'] = $playerEquipItems;
        if($playerEquipItems != false){
          //装備アセット読み込みの為、アセットタグを生成
          foreach ($playerEquipItems as $equipItem) {
            $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
            if($equipAssetTag != ""){
              if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
              else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
            }
          }
        }
      }
      $RESULT_JSON = $RESULT_JSON + array('get_update_player_list_avatar_asset_datas' => $listPlayerData);
    }
  }
  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
