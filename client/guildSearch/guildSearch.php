<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/guild/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  $setListPartyDatas = array(); //最終的に表示するギルドデータ
  //ここに処理を追記
  if(isset($_POST['guild_search_scene_init'])){ //初期通信を開始
    //初期表示はオススメのギルドにする。
    $resultRecommendedGuildDatas = getRecommendedGuildDatas($pdo);
    $RESULT_JSON = $RESULT_JSON + array('result_recommended_guild_datas' => $resultRecommendedGuildDatas);
  }
  if(isset($_POST['get_recommended_guild_datas'])){ //おすすめのギルドデータを取得
    $resultRecommendedGuildDatas = getRecommendedGuildDatas($pdo);
    $setListPartyDatas = $resultRecommendedGuildDatas;
    $RESULT_JSON = $RESULT_JSON + array('result_recommended_guild_datas' => $resultRecommendedGuildDatas);
  }
  if(isset($_POST['set_guild_search_name'])){ //ギルド名で検索が実行された。
    $resultSearchGuildName = getSearchGuildName($pdo,$_POST['set_guild_search_name']);
    $setListGuildDatas = $resultSearchGuildName;
    $RESULT_JSON = $RESULT_JSON + array('result_search_guild_name_guild_datas' => $resultSearchGuildName);
  }
  if(isset($_POST['get_guild_search_friend'])){ //フレンドの所属しているギルド検索を実行した。
    $resultSearchPlayerFriendGuild = getSearchGuildFriend($pdo,$PLAYER_INFO['player_index_id']);
    $setListGuildDatas = $resultSearchPlayerFriendGuild;
    $RESULT_JSON = $RESULT_JSON + array('result_search_player_friend_guild_datas' => $resultSearchPlayerFriendGuild);
  }
  if(isset($_POST['create_my_guild'])){ //自分のギルドを立てるを実行した。(ギルド設立可能かチェック)
    $resultCreateMyGuild = array();
    $resultCreateMyGuild['create_flag'] = 0;
    $resultCreateMyGuild['item_data'] = null;
    $checkCreateMyGuild = checkCreateMyGuild($pdo,$PLAYER_INFO['player_index_id'],$PLAYER_INFO['player_guild_index_id'],$ENV);
    $RESULT_JSON = $RESULT_JSON + array('result_check_create_my_guild' => $checkCreateMyGuild);
  }
  if(isset($_POST['exe_create_my_guild'])){ //ギルドの作成が実行された。
    $resultCreateMyGuild = createMyGuild($pdo,$PLAYER_INFO['player_index_id'],$ENV);
    $RESULT_JSON = $RESULT_JSON + array('result_create_my_guild' => $resultCreateMyGuild);
  }
  if(isset($_POST['exe_post_guild_join_application'])){ //ギルド加入申請を送信した
    if(is_numeric($_POST['exe_post_guild_join_application'])){
      $guildId = (int)$_POST['exe_post_guild_join_application'];
      $resultPostGuildJoinApplication = postGuildJoinApplication($pdo,$PLAYER_INFO['player_index_id'],$guildId);
      $RESULT_JSON = $RESULT_JSON + array('result_post_guild_join_application' => $resultPostGuildJoinApplication);
    }
  }

  if(isset($_POST['exe_guild_join_for_no_application_required'])){ //承認不要のギルドに加入した
    if(is_numeric($_POST['exe_guild_join_for_no_application_required'])){
      $guildId = $_POST['exe_guild_join_for_no_application_required'];
      $playerGuildData = selectPlayerGuildDataForGuildId($pdo,$guildId);
      if($playerGuildData != false && $playerGuildData['guild_scout_status'] == 1){ //ステータスが承認不要
        $resultAddGuildMemebr = addGuildMember($pdo,$PLAYER_INFO['player_index_id'],$guildId);
        if($resultAddGuildMemebr['error'] == 0){
          $resultAddGuildMemebr['join_guild_id'] = $guildId;
        }
        $RESULT_JSON = $RESULT_JSON + array('result_guild_join_for_no_application_required' => $resultAddGuildMemebr);
      }
    }
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }

  //表示するギルドデータが決まった場合、何か必要な共通処理があればここに記載
  if(count($setListPartyDatas) != 0){

  }
}

echo json_encode($RESULT_JSON);
