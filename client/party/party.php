<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/party/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/asset/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $addLoadAssetTags = "";
  $setListPartyDatas = array(); //最終的に表示するパーティデータ
  $recommendationPartyDatas = getRecommendationPartys($pdo,$PLAYER_INFO);
  $setListPartyDatas = $recommendationPartyDatas;
  $RESULT_JSON = $RESULT_JSON + array('recommendation_party_datas' => $recommendationPartyDatas);
  if(isset($_POST['get_invitation_party'])){ //招待中のパーティを取得
    $resultInvitationPartyDatas = getPlayerPartyInvitationData($pdo,$PLAYER_INFO['player_index_id']); //招待され中のパーティリストを取得
    $setListPartyDatas = $resultInvitationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_invitation_party_datas' => $resultInvitationPartyDatas);
  }
  if(isset($_POST['get_my_party_member'])){ //自分のパーティメンバーを取得
    if($_POST['get_my_party_member'] == $PLAYER_INFO['player_index_id']){
      $resultMyPartyMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
      $setListPartyDatas = $resultMyPartyMemberDatas;
      $RESULT_JSON = $RESULT_JSON + array('result_my_party_member_datas' => $resultMyPartyMemberDatas);
    }
  }
  if(isset($_POST['get_recommendation_party'])){ //オススメのパーティを取得
    $resultRecommendationPartyDatas = getRecommendationPartys($pdo,$PLAYER_INFO);
    $setListPartyDatas = $resultRecommendationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_recommendation_party_datas' => $resultRecommendationPartyDatas);
  }
  if(isset($_POST['get_application_party'])){ //申請受信中の申請一覧を取得
    $resultApplicationPartyDatas = getPlayerPartyApplicationData($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $resultApplicationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_application_party_datas' => $resultApplicationPartyDatas);
  }
  if(isset($_POST['set_application_party_id'])){ //パーティ参加申請を行う
    $resultPartyApplication = insertPartyApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_party_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_party_application' => $resultPartyApplication);
  }
  if(isset($_POST['set_application_cancel'])){ //パーティ参加申請を無効にする
    $resultPartyApplicationCancel = deletePlayerPartyApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_cancel']);
    $RESULT_JSON = $RESULT_JSON + array('result_party_application_cancel' => $resultPartyApplicationCancel);

    $resultApplicationPartyDatas = getPlayerPartyApplicationData($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $resultApplicationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_application_party_datas' => $resultApplicationPartyDatas);
  }
  if(isset($_POST['set_invitation_cancel'])){ //パーティ招待を無効にする
    $resultPartyInvitationCancel = deletePlayerPartyInvitation($pdo,$_POST['set_invitation_cancel'],$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_party_invitation_cancel' => $resultPartyInvitationCancel);

    $resultInvitationPartyDatas = getPlayerPartyInvitationData($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $resultInvitationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_invitation_party_datas' => $resultInvitationPartyDatas);
  }
  if(isset($_POST['set_party_check_out'])){ //パーティを抜ける
    $resultCheckOutParty = array();
    $resultCheckOutParty['error'] = -999;
    $resultCheckOutParty['error_comment'] = "不明なエラー";
    $resultCheckOutParty = checkOutPartyMember($pdo,$PLAYER_INFO['player_party_index_id'],$PLAYER_INFO['player_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_check_out_party' => $resultCheckOutParty);
  }
  if(isset($_POST['set_party_member_expulsion'])){ //パーティメンバーを追放する
    $resultPartyMemberExpulsion = array();
    $resultPartyMemberExpulsion['error'] = "-999";
    $resultPartyMemberExpulsion['error_comment'] = "不明なエラー";
    if($PLAYER_INFO['player_index_id'] == $PLAYER_INFO['player_party_index_id']){ //自分がパーティリーダー
      if($PLAYER_INFO['player_index_id'] != $_POST['set_party_member_expulsion']){ //
        $resultPartyMemberExpulsion = checkOutPartyMember($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_party_member_expulsion']);
      }
      else{
        $resultPartyMemberExpulsion['error'] = "-997";
        $resultPartyMemberExpulsion['error_comment'] = "自分を追放する事は出来ません";
      }
    }
    else{
      $resultPartyMemberExpulsion['error'] = "-998";
      $resultPartyMemberExpulsion['error_comment'] = "メンバーの追放は\nパーティリーダーだけが行えます";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_party_member_expulsion' => $resultPartyMemberExpulsion);

    $resultMyPartyMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
    $setListPartyDatas = $resultMyPartyMemberDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_my_party_member_datas' => $resultMyPartyMemberDatas);
  }
  if(isset($_POST['set_application_approval'])){ //パーティ参加申請を承認にする
    $resultPartyApplicationApproval = array();
    $resultPartyApplicationApproval['error'] = -999;
    $resultPartyApplicationApproval['error_comment'] = "不明なエラー";
    if($PLAYER_INFO['player_party_index_id'] == $PLAYER_INFO['player_index_id']){ //自分がパーティリーダー
      $checkInPlayerInfo = getPlayerInfoForIndexId($pdo,$_POST['set_application_approval'],true); //パーティに加入するプレイヤー情報をを取得
      if($checkInPlayerInfo != false){
        $resultPartyApplicationApproval = checkInPartyMember($pdo,$PLAYER_INFO['player_party_index_id'],$_POST['set_application_approval'],$checkInPlayerInfo['player_party_index_id']);
        if($resultPartyApplicationApproval['error'] == 0){ //正常な場合
          deletePlayerPartyApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_approval']); //申請承認のため、申請削除
          deletePlayerPartyApplication($pdo,$_POST['set_application_approval'],$PLAYER_INFO['player_index_id']); //申請承認のため、申請削除
          deletePlayerPartyInvitation($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_approval']); //招待承認のため、招待削除
          deletePlayerPartyInvitation($pdo,$_POST['set_application_approval'],$PLAYER_INFO['player_index_id']); //招待承認のため、招待削除
        }
      }
      else{
        $resultPartyApplicationApproval['error'] = -997;
        $resultPartyApplicationApproval['error_comment'] = "プレイヤー情報の取得に失敗しました。";
      }
    }
    else{
      $resultPartyApplicationApproval['error'] = -998;
      $resultPartyApplicationApproval['error_comment'] = "参加申請の承認はパーティリーダー\nが行う必要があります";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_party_application_approval' => $resultPartyApplicationApproval);

    $resultApplicationPartyDatas = getPlayerPartyApplicationData($pdo,$PLAYER_INFO['player_index_id']);
    $setListPartyDatas = $resultApplicationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_application_party_datas' => $resultApplicationPartyDatas);
  }
  if(isset($_POST['set_invitation_approval'])){ //パーティの招待を承認する。
    $resultPartyInvitationApproval = array();
    $resultPartyInvitationApproval['error'] = -999;
    $resultPartyInvitationApproval['error_comment'] = "不明なエラー";
    $resultPartyInvitationApproval = checkInPartyMember($pdo,$_POST['set_invitation_approval'],$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_party_index_id']);
    if($resultPartyInvitationApproval['error'] == 0){ //正常な場合
      deletePlayerPartyApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_invitation_approval']); //招待承認のため、申請削除
      deletePlayerPartyApplication($pdo,$_POST['set_invitation_approval'],$PLAYER_INFO['player_index_id']); //招待承認のため、申請削除
      deletePlayerPartyInvitation($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_invitation_approval']); //招待承認のため、招待削除
      deletePlayerPartyInvitation($pdo,$_POST['set_invitation_approval'],$PLAYER_INFO['player_index_id']); //招待承認のため、招待削除
    }
    $RESULT_JSON = $RESULT_JSON + array('result_party_invitation_approval' => $resultPartyInvitationApproval);
    $resultInvitationPartyDatas = getPlayerPartyInvitationData($pdo,$PLAYER_INFO['player_index_id']); //招待され中のパーティリストを取得
    $setListPartyDatas = $resultInvitationPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_invitation_party_datas' => $resultInvitationPartyDatas);
  }
  if(isset($_POST['set_party_search_comment'])){ //パーティ検索のコメントが指定された。
    $resultSearchCommentPartyDatas = getSearchCommentPartys($pdo,$PLAYER_INFO,$_POST['set_party_search_comment']);
    $setListPartyDatas = $resultSearchCommentPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_search_comment_party_datas' => $resultSearchCommentPartyDatas);
  }
  if(isset($_POST['set_party_search_friend'])){ //フレンドの検索が行われた
    $resultFriendPartyDatas = getFriendPartys($pdo,$PLAYER_INFO);
    $setListPartyDatas = $resultFriendPartyDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_search_friend_party_datas' => $resultFriendPartyDatas);
  }
  if(isset($_POST['get_party_setting_data'])){ //パーティ設定情報を取得
    $resultPartySettingData = array();
    $resultPartySettingData['error'] = -999;
    $resultPartySettingData['error_comment'] = "不明なエラー";
    if($PLAYER_INFO['player_index_id'] == $PLAYER_INFO['player_party_index_id']){
      $resultPartySettingData = getPartySettingData($pdo,$PLAYER_INFO['player_party_index_id']);
    }
    else{ //リーダーではない人が設定を変更しようとした
      $resultPartySettingData['error'] = -1;
      $resultPartySettingData['error_comment'] = "設定を変更できるのは\nパーティリーダーだけです。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_party_setting_data' => $resultPartySettingData);
  }
  if(isset($_POST['setting_update_party_scout']) || isset($_POST['setting_update_leader_player_index_id'])
  || isset($_POST['setting_update_min_level']) || isset($_POST['setting_update_max_level'])
  || isset($_POST['setting_update_party_comment'])){ //パーティ設定の設定変更があった
    $resultChangePartySetting = array();
    $resultChangePartySetting['error'] = 0;
    $resultChangePartySetting['error_comment'] = "";
    //共通設定
    //自分がパーティリーダー
    if($PLAYER_INFO['player_index_id'] == $PLAYER_INFO['player_party_index_id']){
      $partyLeaderIndexId = $PLAYER_INFO['player_index_id'];
      //リーダー変更があった
      if(isset($_POST['setting_update_leader_player_index_id'])){
        $resultChangePartySetting = updatePlayerPartyLeader($pdo,$partyLeaderIndexId,$_POST['setting_update_leader_player_index_id']);
        if($resultChangePartySetting['error'] == 0){
          $partyLeaderIndexId = $_POST['setting_update_leader_player_index_id'];
        }
      }
      //パーティ募集設定の変更があった。
      if(isset($_POST['setting_update_party_scout']) && $resultChangePartySetting['error'] == 0){
        $resultChangePartySetting = updatePlayerPartyScoutStatus($pdo,$partyLeaderIndexId,$_POST['setting_update_party_scout']);
      }
      //推奨最低レベルの変更があった。
      if(isset($_POST['setting_update_min_level']) && $resultChangePartySetting['error'] == 0){
        $resultChangePartySetting = updatePlayerPartyMinLevel($pdo,$partyLeaderIndexId,$_POST['setting_update_min_level']);
      }
      //推奨最低レベルの変更があった。
      if(isset($_POST['setting_update_max_level']) && $resultChangePartySetting['error'] == 0){
        $resultChangePartySetting = updatePlayerPartyMaxLevel($pdo,$partyLeaderIndexId,$_POST['setting_update_max_level']);
      }
      //募集文の変更があった。
      if(isset($_POST['setting_update_party_comment']) && $resultChangePartySetting['error'] == 0){
        $resultChangePartySetting = updatePlayerPartyComment($pdo,$partyLeaderIndexId,$_POST['setting_update_party_comment']);
      }
    }
    else{
      $resultChangePartySetting['error'] = -1;
      $resultChangePartySetting['error_comment'] = "設定を変更できるのは\nパーティリーダーだけです。";
    }
    $RESULT_JSON = $RESULT_JSON + array('result_change_party_setting' => $resultChangePartySetting);
  }


  //表示するパーティデータが決まった場合、アバターデータを取得
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
