<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/party/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/friend/index.php';
include_once '../../module/asset/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
$setListPartyDatas = array(); //最終的に表示するフレンドデータ
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $addLoadAssetTags = "";
  //シーン初期化の通信
  if(isset($_POST['friend_scene_init'])){
    $friendSceneInit = array();
    $friendSceneInit['my_friend_datas'] = getPlayerFriendDatas($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $friendSceneInit['my_friend_datas'];
    $RESULT_JSON = $RESULT_JSON + array('result_friend_scene_init' => $friendSceneInit);
  }
  //フレンドリストを取得
  if(isset($_POST['get_my_friend_datas'])){
    $myFriendDatas = getPlayerFriendDatas($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $myFriendDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $myFriendDatas);
  }
  //フレンド申請を取得
  if(isset($_POST['get_friend_request_datas'])){
    $getFriendRequestDatas = getFriendRequestDatas($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $getFriendRequestDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_friend_request_datas' => $getFriendRequestDatas);
  }
  //送信したフレンド申請一覧を取得
  if(isset($_POST['get_send_friend_request_datas'])){
    $getSendFriendRequestDatas = getSendFriendRequestDatas($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $getSendFriendRequestDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_send_friend_request_datas' => $getSendFriendRequestDatas);
  }
  //ブラックリストを取得
  if(isset($_POST['get_player_black_list'])){
    $getPlayerBlackList = getPlayerBlackList($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $getPlayerBlackList;
    $RESULT_JSON = $RESULT_JSON + array('result_player_black_list' => $getPlayerBlackList);
  }
  //フレンドを解除する
  if(isset($_POST['set_delete_friend_list'])){
    $resultDeleteFriend = deleteFriendList($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_delete_friend_list']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_friend_list' => $resultDeleteFriend);
    $setListPartyDatas = getPlayerFriendDatas($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $setListPartyDatas);
  }
  //フレンド申請を承認する
  if(isset($_POST['set_application_friend_id'])){
    $resultFriendApplication = insertPlayerFriend($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_friend_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_friend_application' => $resultFriendApplication);
    $setListPartyDatas = getFriendRequestDatas($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $setListPartyDatas);
  }
  //フレンド申請を削除する
  if(isset($_POST['set_delete_friend_application'])){
    $resultFriendApplicationDelete = deletePlayerFriendApplication($pdo,$_POST['set_delete_friend_application'],$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_friend_application' => $resultFriendApplicationDelete);
    $setListPartyDatas = getFriendRequestDatas($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $setListPartyDatas);
  }
  //フレンド申請を取り消す
  if(isset($_POST['set_delete_send_friend_application'])){
    $resultDeleteSendFriendApplication = deletePlayerFriendApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_delete_send_friend_application']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_send_friend_application' => $resultDeleteSendFriendApplication);
    $setListPartyDatas = getSendFriendRequestDatas($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $setListPartyDatas);
  }
  //ブラックリストを解除する
  if(isset($_POST['set_delete_black_list'])){
    $resultDeleteBlackList = deletePlayerBlackList($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_delete_black_list']);
    $RESULT_JSON = $RESULT_JSON + array('result_delete_black_list' => $resultDeleteBlackList);
    $setListPartyDatas = getPlayerBlackList($pdo,$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_friend_datas' => $setListPartyDatas);
  }

  //表示するフレンドデータが決まった場合、アバターアセットタグと装備アセットタグを作成
  $avatarDatas = array();
  if(count($setListPartyDatas) != 0){
    //リストに表示するアバターデータ
    $listPlayerData = array();
    foreach ($setListPartyDatas as $plPartyData) {
      if(!isset($plPartyData['player_index_id'])) continue;
      $listPlayerData[$plPartyData['player_index_id']] = array();
      $listPlayerData[$plPartyData['player_index_id']]['player_avatar_data'] = null;
      $listPlayerData[$plPartyData['player_index_id']]['player_equip_item_data'] = null;
      $playerAvatarData = getPlayerAvatarData($pdo,$plPartyData['player_index_id']); //プレイヤーが所持しているアバターを取得
      $listPlayerData[$plPartyData['player_index_id']]['player_avatar_data'] = $playerAvatarData;
      //アバターアセットタグを追加
      $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
      if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
      else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

      //装備アバターアセットを追加
      $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$plPartyData['player_index_id']);
      $listPlayerData[$plPartyData['player_index_id']]['player_equip_item_data'] = $playerEquipItems;
      if($playerEquipItems != false){
        $RESULT_JSON = $RESULT_JSON + array('player_equip_item_disp' => $playerEquipItems);
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

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
