<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/party/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/formation/index.php';
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['formation_scene_init'])){ //隊形画面の初期化が行われた
    $resultFormationDatas = array();
    $partyMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_party_member_datas' => $partyMemberDatas); //パーティメンバーのデータを取得
    foreach ($partyMemberDatas as $ptPlayerData) {
      $playerFormationDatas = getPlayerFormationDatas($pdo,$ptPlayerData['player_index_id']);
      if(count($playerFormationDatas) != 0){
        foreach ($playerFormationDatas as $plFormationData) {
          $found = false;
          foreach ($resultFormationDatas as $rFormationData) {
            if($rFormationData['id'] == $plFormationData['id']) $fount = true;
          }
          if($found == false) array_push($resultFormationDatas,$plFormationData);
        }
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_formation_datas' => $resultFormationDatas); //使用可能な隊形データを取得
    //自分のパーティに設定されている隊形情報を取得
    $resultMyPartyFormationData = getPlayerPartyFormationData($pdo,$PLAYER_INFO['player_party_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_my_party_formation_data' => $resultMyPartyFormationData); //自分のパーティで設定されている隊形データを取得
    //パーティが使用しているアバターデータを取得
    if(count($partyMemberDatas) != 0){
      //表示するアバターデータを取得
      $avatarDatas = array();
      foreach ($partyMemberDatas as $plPartyData) {
        if(isset($plPartyData['player_avatar_id'])){
          $avatarMasterData = getAvatarMasterData($pdo,$plPartyData['player_avatar_id']);
          if($avatarMasterData != false){
            $addAvatarDataArray = array();
            $addAvatarDataArray['avatar_master_data'] = $avatarMasterData;
            $avatarAnimData = getAvatarAnimMasterData($pdo,$avatarMasterData['id']);
            if($avatarAnimData != false && is_array($avatarAnimData) && count($avatarAnimData) != 0){
              $addAvatarDataArray['avatar_anim_datas'] = $avatarAnimData;
              array_push($avatarDatas,$addAvatarDataArray);
            }
          }
        }
      }
      $RESULT_JSON = $RESULT_JSON + array('avatar_datas' => $avatarDatas);
    }
  }
  if(isset($_POST['set_update_formation_data']) || isset($_POST['set_update_party_member_datas'])){
    $resultUpdateFormationSetting = array();
    $resultUpdateFormationSetting['error'] = 0;
    $resultUpdateFormationSetting['error_comment'] = "";
    if($PLAYER_INFO['player_party_index_id'] != $PLAYER_INFO['player_index_id']){
      $resultUpdateFormationSetting['error'] = 1;
      $resultUpdateFormationSetting['error_comment'] = "設定を変更するには\nパーティリーダーになる必要があります";
    }
    //パーティ操作共通処理
    if($resultUpdateFormationSetting['error'] == 0){
      if(isset($_POST['set_update_formation_data'])){ //隊形変更が行われた
        //隊形が使用可能か調べる
        $resultFormationDatas = array();
        $partyMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
        $RESULT_JSON = $RESULT_JSON + array('result_party_member_datas' => $partyMemberDatas); //パーティメンバーのデータを取得
        foreach ($partyMemberDatas as $ptPlayerData) {
          $playerFormationDatas = getPlayerFormationDatas($pdo,$ptPlayerData['player_index_id']);
          if(count($playerFormationDatas) != 0){
            foreach ($playerFormationDatas as $plFormationData) {
              $found = false;
              foreach ($resultFormationDatas as $rFormationData) {
                if($rFormationData['id'] == $plFormationData['id']) $fount = true;
              }
              if($found == false) array_push($resultFormationDatas,$plFormationData);
            }
          }
        }
        $useFlag = false;
        foreach ($resultFormationDatas as $ptFormationData) {
          if($ptFormationData['id'] == $_POST['set_update_formation_data']['id']) $useFlag = true;
        }
        if($useFlag == true){
          updatePlayerPartyFormationData($pdo,$PLAYER_INFO['player_party_index_id'],$_POST['set_update_formation_data']['party_formation_id']);
        }
        else{
          $resultUpdateFormationSetting['error'] = 3;
          $resultUpdateFormationSetting['error_comment'] = "使用不可能な隊形が選択されました。";
        }
      }
      if(isset($_POST['set_update_party_member_datas'])){ //パーティの配置情報が変更された
        $partyMemberDatas = getPartyMemberPlayerDatas($pdo,$PLAYER_INFO['player_party_index_id']);
        $count = 0;
        $memberCheckFlag = true;
        if(count($partyMemberDatas) != count($_POST['set_update_party_member_datas'])) $memberCheckFlag = false; //メンバー数が異なっている
        foreach ($_POST['set_update_party_member_datas'] as $ptMember) {
          $foundMember = false;
          foreach ($partyMemberDatas as $checkPtMember) {
            if($checkPtMember['player_index_id'] == $ptMember['player_index_id']){ //パーティに存在した
              $foundMember = true;
              if($ptMember['player_pos_index'] != $count) $memberCheckFlag = false;
            }
          }
          if($foundMember == false) $memberCheckFlag = false;
          $count = $count + 1;
        }
        if($memberCheckFlag == true && $resultUpdateFormationSetting['error'] == 0){ //メンバーの状態が正常な場合
          foreach ($_POST['set_update_party_member_datas'] as $updatePtMember) {
            updatePlayerPosIndex($pdo,$updatePtMember['player_index_id'],$updatePtMember['player_pos_index'],$PLAYER_INFO['player_party_index_id']);
          }
        }
        else{
          $resultUpdateFormationSetting['error'] = 2;
          $resultUpdateFormationSetting['error_comment'] = "パーティメンバー情報が\n更新されました。";
        }
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_update_formation_setting' => $resultUpdateFormationSetting);
  }
}

echo json_encode($RESULT_JSON);
