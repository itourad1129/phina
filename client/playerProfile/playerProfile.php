<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/party/index.php';
include_once '../../module/friend/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/asset/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $addLoadAssetTags = "";
  if(isset($_POST['get_player_profile_data'])){ //プレイヤープロフィールの取得が行われた
    $selectPlayerIndexId = $_POST['get_player_profile_data'];
    $resultPlayerProfileData = array();
    $resultPlayerProfileData['error'] = 0; //0:正常 -1:エラー
    $resultPlayerProfileData['player_avatar_data'] = null;
    $resultPlayerProfileData['player_equip_item_datas'] = null;
    $selectPlayerInfo = getPlayerInfoForIndexId($pdo,$selectPlayerIndexId,true);
    if($selectPlayerInfo != false){
      $resultPlayerProfileData['player_info'] = $selectPlayerInfo;
      $playerName = getPlayerName($pdo,$selectPlayerIndexId);
      if($playerName != false) $resultPlayerProfileData['player_name'] = $playerName;
      else $resultPlayerProfileData['error'] = -5; //プレイヤーネームの取得に失敗した。
      //プレイヤーアバターデータ取得
      $playerAvatarData = getPlayerAvatarData($pdo,$selectPlayerInfo['player_index_id']);
      if($playerAvatarData != false){
        //アセットタグを追加
        $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
        if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
        else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;

        $resultPlayerProfileData['player_avatar_data'] = $playerAvatarData;
      }
      else $resultPlayerProfileData['error'] = -1; //アバターデータの取得に失敗した。
      //プレイヤー装備データを取得
      $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$selectPlayerInfo['player_index_id']);
      if($playerEquipItems != false){
        //装備アセット読み込みの為、アセットタグを生成
        foreach ($playerEquipItems as $equipItem) {
          $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
          if($equipAssetTag != ""){
            if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
          }
        }
        $resultPlayerProfileData['player_equip_item_datas'] = $playerEquipItems;
      }
      //アバターフレームデータ取得
      $resultAvataAnimData = false;
      $testAvatarAnimData = false;
      $avatarAnimDatas = getAvatarAnimMasterData($pdo,$selectPlayerInfo['player_avatar_id']);
      if($avatarAnimDatas != false && is_array($avatarAnimDatas)){
        foreach ($avatarAnimDatas as $animData) {
          if($animData['anim_category_id'] == 1){ //立ちアニメーションの場合
            $resultAvataAnimData = $animData;
            break;
          }
        }
      }
      if($resultAvataAnimData != false) $resultPlayerProfileData['avatar_anim_data'] = $resultAvataAnimData;
      if($testAvatarAnimData != false) $resultPlayerProfileData['test_avatar_anim_data'] = $testAvatarAnimData;
      else $resultPlayerProfileData['error'] = -2; //アバターアニメデータの取得に失敗した。
      //装備品情報を取得
      $resultPlayerEquipItem = getPlayerEquipItemAndMasterData($pdo,$selectPlayerInfo['player_index_id']);
      if($resultPlayerEquipItem != false && is_array($resultPlayerEquipItem)){
        $resultPlayerProfileData['player_equip_items'] = $resultPlayerEquipItem;
      }
      else { //装備品が1つもない
        $resultPlayerEquipItem = array();
        $resultPlayerProfileData['player_equip_items'] = $resultPlayerEquipItem;
      }
    }
    else $resultPlayerProfileData['error'] = -3; //プレイヤーデータの取得に失敗した。
    //フレンドを取得
    $playerFriendDatas = getPlayerFriendDatas($pdo,$selectPlayerIndexId);
    $resultPlayerProfileData['player_friend_datas'] = $playerFriendDatas;
    $resultPlayerProfileData['player_avatar_data'] = getPlayerAvatarData($pdo,$selectPlayerIndexId); //プレイヤーが所持しているアバターを取得

    $RESULT_JSON = $RESULT_JSON + array('result_player_profile_data' => $resultPlayerProfileData);
  }
  //パーティへの招待を行った。
  if(isset($_POST['set_invitation_player_index_id'])){
    $resultSendInvitationParty = array();
    $resultSendInvitationParty['error'] = -999;
    $resultSendInvitationParty['error_comment'] = "不明なエラー";
    $resultSendInvitationParty = sendInvitationParty($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_party_index_id'],$_POST['set_invitation_player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_send_invitation_party' => $resultSendInvitationParty);
  }
  //フレンド申請を行った。
  if(isset($_POST['set_friend_application_player_index_id'])){
    $resultFriendApplication = array();
    $resultFriendApplication['error'] = -999;
    $resultFriendApplication['error_comment'] = "不明なエラー";
    $resultFriendApplication = insertFriendApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_friend_application_player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_friend_application' => $resultFriendApplication);
  }
  //ブラックリストへの登録を行った
  if(isset($_POST['set_black_list_player_index_id'])){
    $resultPlayerBlackList = array();
    $resultPlayerBlackList['error'] = -999;
    $resultPlayerBlackList['error_comment'] = "不明なエラー";
    $resultPlayerBlackList = insertPlayerBlackList($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_black_list_player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_player_black_list' => $resultPlayerBlackList);
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
