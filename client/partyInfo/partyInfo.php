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
  if(isset($_POST['get_player_party_info_data'])){ //パーティ情報データを取得
    $leaderPlayerIndexId = $_POST['get_player_party_info_data'];
    $resultPartyInfoData = array();
    $resultPartyInfoData['player_party'] = null; //パーティ情報
    $resultPartyInfoData['party_member'] = null; //パーティメンバー
    $resultPartyInfoData['player_avatar_data'] = null; //プレイヤーアバター
    $resultPartyInfoData['player_equip_item_datas'] = null; //プレイヤー装備アイテムデータ
    $resultPartyInfoData['my_player_info'] = $PLAYER_INFO; //自分のプレイヤー情報
    $resultPartyInfoData['error'] = -999;
    $resultPartyInfoData['error_comment'] = "不明なエラー";
    //パーティデータを取得
    $resultPartyInfoData['player_party'] = getPlayerParty($pdo,$leaderPlayerIndexId);
    if($resultPartyInfoData['player_party'] != false && isset($resultPartyInfoData['player_party']['leader_player_index_id'])){
      //パーティメンバーを取得
      $resultPartyInfoData['party_member'] = getPartyMemberPlayerDatas($pdo,$resultPartyInfoData['player_party']['leader_player_index_id']);
      if(is_array($resultPartyInfoData['party_member'])){
        $leaderPlayerData = getPlayerInfoForIndexId($pdo,$leaderPlayerIndexId,true);
        if($leaderPlayerData != false){ //パーティリーダーのプレイヤーデータを取得
          $playerAvatarData = getPlayerAvatarData($pdo,$leaderPlayerData['player_index_id']); //プレイヤーが所持しているアバターを取得
          if($playerAvatarData != false){ //アバターデータ取得
            //アセットタグを追加
            $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
            if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
          }
          $resultPartyInfoData['player_avatar_data'] = $playerAvatarData;
          //装備データを取得
          $playerEquipItems = getPlayerEquipItemAndMasterData($pdo,$leaderPlayerData['player_index_id']);
          if($playerEquipItems != false){
            //装備アセット読み込みの為、アセットタグを生成
            foreach ($playerEquipItems as $equipItem) {
              $equipAssetTag = getEquipItemAssetTag($equipItem['equip_category_id'],$equipItem['avatar_asset_id']);
              if($equipAssetTag != ""){
                if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
                else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
              }
            }
            $resultPartyInfoData['player_equip_item_datas'] = $playerEquipItems;
          }
        }
        else{
          $resultPartyInfoData['error'] = -2;
          $resultPartyInfoData['error_comment'] = "ユーザーデータの取得に失敗しました";
        }
      }
      else{
        $resultPartyInfoData['error'] = -2;
        $resultPartyInfoData['error_comment'] = "ユーザーデータの取得に失敗しました";
      }
    }
    else{
      $resultPartyInfoData['error'] = -1;
      $resultPartyInfoData['error_comment'] = "パーティデータの取得に失敗しました";
    }

    $RESULT_JSON = $RESULT_JSON + array('result_party_info_datas' => $resultPartyInfoData);
  }
  if(isset($_POST['set_application_party_index_id'])){ //パーティ参加申請が行われた
    $resultPartyApplication = insertPartyApplication($pdo,$PLAYER_INFO['player_index_id'],$_POST['set_application_party_index_id']);
    $RESULT_JSON = $RESULT_JSON + array('result_party_application' => $resultPartyApplication);
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
