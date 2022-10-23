<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/card/index.php';
include_once '../../module/asset/index.php';
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){
  if(isset($_POST['deck_edit_scene_init'])){ //デッキ編成画面の初期化が行われた
    $resultDeckEditInit = array();
    $playerCardDatas = getPlayerCardDatas($pdo,$PLAYER_INFO['player_index_id']); //プレイヤーのカード所持情報をセット
    //カードアセットを追加読み込み
    foreach ($playerCardDatas as $plCardData) {
      if($addLoadAssetTags == "") $addLoadAssetTags = "card_character_".$plCardData['card_asset_id'];
      else $addLoadAssetTags = $addLoadAssetTags.",card_character_".$plCardData['card_asset_id'];
    }
    $resultDeckEditInit['player_card_datas'] = $playerCardDatas;
    $playerCardDeckPreset = getPlayerCardDeckPreset($pdo,$PLAYER_INFO['player_index_id']);
    $resultDeckEditInit['player_card_deck_preset'] = $playerCardDeckPreset;
    $playerCardDeckMain = getPlayerCardDeckMain($pdo,$PLAYER_INFO['player_index_id']);
    $resultDeckEditInit['player_card_deck_main'] = $playerCardDeckMain;
    $playerCardDeckParty = getPlayerCardDeckParty($pdo,$PLAYER_INFO['player_index_id']);
    $resultDeckEditInit['player_card_deck_party'] = $playerCardDeckParty;
    $playerCardDeckPvp = getPlayerCardDeckPvp($pdo,$PLAYER_INFO['player_index_id']);
    $resultDeckEditInit['player_card_deck_pvp'] = $playerCardDeckPvp;
    $playerCardDeckPvpParty = getPlayerCardDeckPvpParty($pdo,$PLAYER_INFO['player_index_id']);
    $resultDeckEditInit['player_card_deck_pvp_party'] = $playerCardDeckPvpParty;
    $playerMaxDeckNum = getPlayerMaxDeckNum($pdo,$PLAYER_INFO['player_level']); //プレイヤーの最大デッキカード組み込み枚数を取得
    $resultDeckEditInit['player_max_deck_num'] = $playerMaxDeckNum;
    $RESULT_JSON = $RESULT_JSON + array('result_deck_edit_init' => $resultDeckEditInit);
  }
  if(isset($_POST['preset_card_deck_update'])){ //プリセットデッキ変更処理
    $postParam = $_POST['preset_card_deck_update'];
    if(isset($postParam['preset_card_deck_id']) && isset($postParam['deck_name']) && isset($postParam['card_deck'])){ //パラメーターチェック
      $resultUpdate = array();
      $resultUpdate['check_update'] = updatePlayerPresetCardDeck($pdo,$PLAYER_INFO['player_index_id'],$postParam);
      $playerCardDeckPreset = getPlayerCardDeckPreset($pdo,$PLAYER_INFO['player_index_id']);
      $resultUpdate['player_card_deck_preset'] = $playerCardDeckPreset;
      $RESULT_JSON = $RESULT_JSON + array('result_update_preset_card_deck' => $resultUpdate);
    }
  }
  if(isset($_POST['main_card_deck_update'])){ //メインカードデッキ変更処理
    $postParam = $_POST['main_card_deck_update'];
    if(isset($postParam['deck_number']) && isset($postParam['card_deck']) && isset($postParam['deck_name'])){ //パラメーターチェック
      $resultUpdate = array();
      $resultUpdate['check_update'] = updatePlayerMainCardDeck($pdo,$PLAYER_INFO['player_index_id'],$postParam);
      $playerCardDeckMain = getPlayerCardDeckMain($pdo,$PLAYER_INFO['player_index_id']);
      $resultUpdate['player_card_deck_main'] = $playerCardDeckMain;
      $RESULT_JSON = $RESULT_JSON + array('result_update_main_card_deck' => $resultUpdate);
    }
  }
  if(isset($_POST['party_card_deck_update'])){ //パーティカードデッキ変更処理
    $postParam = $_POST['party_card_deck_update'];
    if(isset($postParam['deck_number']) && isset($postParam['card_deck']) && isset($postParam['deck_name'])){ //パラメーターチェック
      $resultUpdate = array();
      $resultUpdate['check_update'] = updatePlayerPartyCardDeck($pdo,$PLAYER_INFO['player_index_id'],$postParam);
      $playerCardDeckParty = getPlayerCardDeckParty($pdo,$PLAYER_INFO['player_index_id']);
      $resultUpdate['player_card_deck_party'] = $playerCardDeckParty;
      $RESULT_JSON = $RESULT_JSON + array('result_update_party_card_deck' => $resultUpdate);
    }
  }
  if(isset($_POST['pvp_card_deck_update'])){ //PVPカードデッキ変更処理
    $postParam = $_POST['pvp_card_deck_update'];
    if(isset($postParam['deck_number']) && isset($postParam['card_deck']) && isset($postParam['deck_name'])){ //パラメーターチェック
      $resultUpdate = array();
      $resultUpdate['check_update'] = updatePlayerPvpCardDeck($pdo,$PLAYER_INFO['player_index_id'],$postParam);
      $playerCardDeckPvp = getPlayerCardDeckPvp($pdo,$PLAYER_INFO['player_index_id']);
      $resultUpdate['player_card_deck_pvp'] = $playerCardDeckPvp;
      $RESULT_JSON = $RESULT_JSON + array('result_update_pvp_card_deck' => $resultUpdate);
    }
  }
  if(isset($_POST['pvp_party_card_deck_update'])){ //PVPパーティカードデッキ変更処理
    $postParam = $_POST['pvp_party_card_deck_update'];
    if(isset($postParam['deck_number']) && isset($postParam['card_deck']) && isset($postParam['deck_name'])){ //パラメーターチェック
      $resultUpdate = array();
      $resultUpdate['check_update'] = updatePlayerPvpPartyCardDeck($pdo,$PLAYER_INFO['player_index_id'],$postParam);
      $playerCardDeckPvpParty = getPlayerCardDeckPvpParty($pdo,$PLAYER_INFO['player_index_id']);
      $resultUpdate['player_card_deck_pvp_party'] = $playerCardDeckPvpParty;
      $RESULT_JSON = $RESULT_JSON + array('result_update_pvp_party_card_deck' => $resultUpdate);
    }
  }
  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
