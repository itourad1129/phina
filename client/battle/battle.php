<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/avatar/index.php';
include_once '../../module/asset/index.php';
include_once '../../module/battle/battleTest.php';
include_once '../../module/battle/index.php';
include_once '../../module/battle/battleAction.php';
include_once '../../module/battle/battleBuff.php';
include_once '../../module/battle/battleEntryData.php';
include_once '../../module/battle/battleInstance.php';
include_once '../../module/battle/battleLog.php';
include_once '../../module/battle/battlePartyInstance.php';
include_once '../../module/battle/effectArea.php';
include_once '../../module/battle/action.php';
include_once '../../module/battle/addAction.php';
include_once '../../module/battle/battleInstanceControle.php';
include_once '../../module/battle/autoAction.php';
include_once '../../module/battle/createBattleInstance.php';
include_once '../../module/battle/battleInstancePermission.php';
include_once '../../module/battle/battleResponse.php';
include_once '../../module/battle/battleResultSetting.php';
include_once '../../module/battle/multiPlayerInstance.php';
include_once '../../module/redisConnect/index.php';
include_once '../../module/enemy/index.php';
include_once "../../module/card/cardData.php";
include_once "../../module/card/prizeCardData.php";
include_once "../../module/skill/skillData.php";
include_once "../../module/buff/buffData.php";
include_once "../../module/buff/index.php";
include_once "../../module/playerCard/PlayerCardData.php";
$addLoadAssetTags = ""; //追加読み込みアセットタグ カンマ区切り
updatePlayerLastLogin($pdo,$PLAYER_INFO['player_index_id']); //最終ログイン時刻を更新
$RESULT_JSON = $RESULT_JSON + array('player_info' => $PLAYER_INFO);
//$RESULT_JSON = $RESULT_JSON + array('player_status' => $PLAYER_STATUS);
$RESULT_JSON = $RESULT_JSON + array('player_master' => $PLAYER_MASTER);
$RESULT_JSON = $RESULT_JSON + array('player_base_status' => $PLAYER_BASE_STATUS_ROW);
if($PLAYER_INFO != false && $PLAYER_STATUS != false){

  if(isset($_POST['battle_scene_init'])){ //シーン初期化通信処理
    //初期化で読み込むアセットをロード
    $loadAssetTag = "battle_effect_37,battle_effect_38,battle_effect_39"; //アクション実行アニメーション レベルアップアニメーション ステージクリアアニメーション
    if($addLoadAssetTags == "") $addLoadAssetTags = $loadAssetTag;
    else $addLoadAssetTags = $addLoadAssetTags.",".$loadAssetTag;
    //初期化が行われたことをクライアントに通知
    $RESULT_JSON = $RESULT_JSON + array('battle_scene_init' => true);
  }

  if(isset($_POST['battle_instance_id']) && is_numeric($_POST['battle_instance_id'])){
    $result = array();
    $result['error'] = 0;
    $result['error_comment'] = "";
    $result['battle_direction'] = -1;
    $result['entry_datas'] = array();
    $result['deck_datas'] = array();
    //インスタンス生存チェック
    $biControle = new BattleInstanceControle();
    $battleInstanceId = (int)$_POST['battle_instance_id'];
    $battleInstance = $biControle->GetBattleInstance($pdo,$redis,$battleInstanceId);
    $turnCheck = false;
    if($battleInstance != null){
      $multiPlayerMode = false; //マルチプレイヤーモードか
      if($battleInstance->multiPlayerInstance != null && $battleInstance->multiPlayerInstance->GetMultiPlayerMode() == true){
        $multiPlayerMode = true;
      }
      $redisKey = "battle_instance_".$battleInstanceId;
      //redisトランザクション開始 キーの変更を監視
      $redis->watch($redisKey);
      //ターンチェックが必要な場合はチェックを実行
      if(isset($_POST['turn_check']) && (int)$_POST['turn_check'] == (int)$battleInstance->battleTurn) $turnCheck = true;
      //エントリーor閲覧チェック更新
      $resultSetEntryPlayer = $battleInstance->SetEntryPlayer($PLAYER_INFO['player_index_id']);
      if($resultSetEntryPlayer['update_flag'] == false){
        $redis->unwatch();
      }
      else{ //インスタンスのアップデートが必要
        //インスタンスを一旦保存
        $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
        if($resultSaveBattleInstance['transaction'] === FALSE){
          $result['error'] = 100;
          $result['error_comment'] = "Redis(※MySQLではない)トランザクションの処理に失敗しました。";
        }
      }
      $battleInstance = $biControle->GetBattleInstance($pdo,$redis,$battleInstanceId);
      if($result['error'] == 0 && $battleInstance != null){
        //redisトランザクション開始 キーの変更を監視
        $redis->watch($redisKey);
        $battleDirection = -1; //戦闘進行状態
        if($battleInstance->battleTurn == 0){ //戦闘開始前の状態
          $battleDirection = 0; //0:戦闘開始前 1:戦闘中 2:戦闘終了
        }
        else if($battleInstance->battleResult == null){ //戦闘中の状態
          $battleDirection = 1;
        }
        if($battleDirection != 2){ //戦闘が終了していない場合
          //アクションの登録があった
          if(isset($_POST['add_actions']) && $turnCheck == true){ //挿入しようとしていたアクションの実行ターンかチェックも行う
            $addActions = convertActionData($PLAYER_INFO['player_index_id'],$battleInstance,$_POST['add_actions']); //クライアントから渡ってきたアクションをアクションデータに変
            if($multiPlayerMode == false){ //ソロモード
              //敵アクションを追加
              addEnemyActions($addActions,$battleInstance);
              //敵プレイヤーアクションを追加
              addEnemyPlayerActions($PLAYER_INFO['player_index_id'],$addActions,$battleInstance);
              $battleInstance->ResetActions();
              $battleInstance->UpdateActions($addActions);
              $battleInstance->BattleStart();
            }
            else{ //マルチプレイヤーモード
              foreach ($addActions as $addAction) { //待機中アクションを追加
                $battleInstance->multiPlayerInstance->AddStanbyAddAction($addAction,$battleInstance->battleTurn);
              }
            }
            $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
            $checkTransaction = $resultSaveBattleInstance['transaction'];
            $instanceId = $resultSaveBattleInstance['battle_instance_id'];
            if($instanceId != -1){
              if($checkTransaction !== FALSE){
                unset($battleInstance);
                $battleInstance = $biControle->GetBattleInstance($pdo,$redis,$instanceId);
                if($battleInstance != null){
                  if($battleDirection == 0 && $battleInstance->battleTurn != 0) $battleDirection = 1;
                }
                else{
                  $result['error'] = 1;
                  $result['error_comment'] = "インスタンスの取得に失敗しました。";
                }
              }
              else{
                $result['error'] = 100;
                $result['error_comment'] = "Redis(※MySQLではない)トランザクションの処理に失敗しました。";
              }
            }
            else{
              $result['error'] = 2;
              $result['error_comment'] = "インスタンスの更新に失敗しました。";
            }
          }
        }
        else{ //戦闘終了後

        }
        //マルチプレイヤー更新処理
        if($multiPlayerMode == true){ //マルチプレイ中
          unset($battleInstance);
          $battleInstance = $biControle->GetBattleInstance($pdo,$redis,$battleInstanceId);
          if($battleInstance != null){
            $redis->watch($redisKey); //redisトランザクション開始 キーの変更を監視
            if($battleInstance->multiPlayerInstance->GetNowTurn() != -1
            && $battleInstance->multiPlayerInstance->GetNowTurn() != $battleInstance->battleTurn){ //経過時間が現在のターンと違った場合
              $updateTurn = $battleInstance->multiPlayerInstance->GetNowTurn();
              $loop = true;
              $loopCount = 0;
              //勝負がつくか、現在の更新ターンになるまで戦闘を進める
              while($loop){
                //待機中のアクションを実行アクションに登録
                $addActions = array();
                $rowAddActions = $battleInstance->multiPlayerInstance->stanbyAddActions;
                if(isset($rowAddActions[$battleInstance->battleTurn])){ //実行ターンの待機中アクションが存在するか
                  foreach ($rowAddActions[$battleInstance->battleTurn] as $addAction) {
                    if(get_class($addAction) == 'AddAction'){
                      array_push($addActions,$addAction);
                    }
                  }
                }
                //AddActionしていないユニークNoはAutoActionでAddActionを追加
                $autoActionUniqueNoList = array();
                foreach ($battleInstance->entryDatas as $entryData) {
                  if(false == checkActionEntry($addActions,$entryData->uniqueNo)){
                    array_push($autoActionUniqueNoList,$entryData->uniqueNo);
                  }
                }
                for ($aa=0; $aa < count($autoActionUniqueNoList); $aa++) {
                  addAutoActions($addActions,$autoActionUniqueNoList[$aa],$battleInstance);
                }
                $battleInstance->ResetActions();
                $battleInstance->UpdateActions($addActions);
                $battleInstance->BattleStart();
                if($battleInstance->battleTurn == $updateTurn || $battleInstance->battleResult != null) $loop = false;
                $loopCount = $loopCount + 1;
                if(10000 < $loopCount) break;
              }
              if($battleInstance->battleTurn == 0){ //戦闘開始前の状態
                $battleDirection = 0; //0:戦闘開始前 1:戦闘中 2:戦闘終了
              }
              else if($battleInstance->battleResult == null){ //戦闘中の状態
                $battleDirection = 1;
              }
              $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
              $checkTransaction = $resultSaveBattleInstance['transaction'];
              if($checkTransaction === FALSE){
                $result['error'] = 100;
                $result['error_comment'] = "Redis(※MySQLではない)トランザクションの処理に失敗しました。";
              }
            }
          }
        }
      }
      //トランザクションが継続中であれば、解除
      $redis->unwatch();
    }
    else{
      $result['error'] = 1;
      $result['error_comment'] = "インスタンスの取得に失敗しました。";
    }
    //戦闘結果が出ていて、結果処理が行われていなければ実行※(redisへの書き込みは禁止、MySQLのトランザクションだけで完結させること)
    if($result['error'] == 0) {
      $resultCheckBattleResultSetting = checkBattleResultSetting($pdo,$battleInstance);
      if($resultCheckBattleResultSetting['save_flag'] == true){
        $resultSaveBattleInstance = $biControle->SaveBattleInstance($redis,$battleInstance);
      }
      if($resultCheckBattleResultSetting['error'] != 0){
        $result['error'] = $resultCheckBattleResultSetting['error'];
        $result['error_comment'] = $resultCheckBattleResultSetting['error_comment'];
      }
    }

    if($result['error'] == 0){ //エラーなし、再生なし
      //クライアントに送信するデータを作成
      $battleResponse = new BattleResponse();
      $result['entry_datas'] = $battleResponse->GetEntryDatas($battleInstance);
      $result['master_datas'] = $battleResponse->GetMasterDatas($battleInstance);
      $result['permission_datas'] = $battleResponse->GetPermissionDatas($battleInstance);
      $result['host_unique_no'] = $battleResponse->GetHostUniqueNo($battleInstance);
      $result['move_areas'] = $battleResponse->PermissionSelectMoveArea($battleInstance,$battleResponse->GetMoveAreas($battleInstance));
      $result['battle_log'] = $battleResponse->GetBattleLogs($battleInstance);
      $result['battle_turn'] = $battleResponse->GetBattleTurn($battleInstance);
      $result['action_list_unique_nos'] = $battleResponse->GetActionListUniqueNos($battleInstance);
      $result['status_hp'] = $battleResponse->GetStatus($battleInstance,1);
      $result['game_result'] = $battleResponse->GetGameResult($battleInstance); //戦闘が終了していた場合、結果を取得
      $result['multi_player_instance'] = $battleResponse->GetMultiPlayerInfo($battleInstance);
      $result['result_befor_entry_datas'] = $battleResponse->GetResultBeforEntryDatas($battleInstance);
      $result['my_standby_add_actions'] = $battleResponse->GetMyStandbyAddActions($battleInstance,$PLAYER_INFO['player_index_id']);
      if($result['game_result'] != null){
        $battleDirection = 2; //ゲーム結果があれば、ゲームは終了している
        $result['game_result_setting'] = $battleResponse->GetGameResultSetting($battleInstance); //戦闘結果設定を取得
      }
      $result['battle_direction'] = $battleDirection;

      if(isset($_POST['battle_replay'])){ //戦闘シーンを再度再生
        $result['battle_replay'] = 1;
        //戦闘シーン再生用のレスポンスを取得
        $result['result_entry_datas'] = $battleResponse->GetResultEntryDatas($battleInstance);
        $result['result_action_list_unique_nos'] = $battleResponse->GetResultActionListUniqueNos($battleInstance);
      }

      //共通処理(アセット読み込み、データ取得など)
      //戦闘エフェクトアセットデータを取得
      $effectImageIds = array();
      if(isset($result['battle_log']) && count($result['battle_log']) != 0){
        foreach ($result['battle_log'] as $battleLog) {
          if(isset($battleLog['effect_image_id'])){
            $effectImageIds[count($effectImageIds)] = $battleLog['effect_image_id'];
          }
          if(isset($battleLog['effect_image_ids']) && $battleLog['effect_image_ids'] != -1){
            $ids = explode(',',$battleLog['effect_image_ids']);
            for ($eii=0; $eii < count($ids); $eii++) {
              $effectImageIds[count($effectImageIds)] = $ids[$eii];
            }
          }
        }
        //ユニーク
        $effectImageIdsUnique = array_unique($effectImageIds);
        $resultEffectImageIds = array_values($effectImageIdsUnique);
        //読み込みアセットを追加
        for ($i=0; $i < count($resultEffectImageIds); $i++) {
          $battleEffectAssetTag = "battle_effect_".$resultEffectImageIds[$i];
          if($addLoadAssetTags == "") $addLoadAssetTags = $battleEffectAssetTag;
          else $addLoadAssetTags = $addLoadAssetTags.",".$battleEffectAssetTag;

          $subEffectImageId = -1;
          //サブエフェクトIDが存在するか
          switch ((int)$resultEffectImageIds[$i]) {
            case 10: //ファイアーボール
            {
              $subEffectImageId = 4;
            }
            break;
            case 22: //アイスショット
            {
              $subEffectImageId = 17;
            }
            break;
            case 27: //サンダーボール
            {
              $subEffectImageId = 18;
            }
            break;
            default:
            break;
          }
          if($subEffectImageId != -1){
            $subBattleEffectAssetTag = "battle_effect_".$subEffectImageId;
            if($addLoadAssetTags == "") $addLoadAssetTags = $subBattleEffectAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$subBattleEffectAssetTag;
          }
        }
      }
      if(isset($result['entry_datas'])){
        foreach ($result['entry_datas'] as $entryData) {
          //カードアセット取得処理
          $cardsArray = explode(",",$entryData['cards']);
          for ($i=0; $i < count($cardsArray); $i++) {
            foreach ($result['master_datas']['card_master_datas'] as $cardMasterData) {
              if($cardMasterData['id'] == $cardsArray[$i]){
                if($addLoadAssetTags == "") $addLoadAssetTags = "card_character_".$cardMasterData['card_asset_id'];
                else $addLoadAssetTags = $addLoadAssetTags.",card_character_".$cardMasterData['card_asset_id'];
                break;
              }
            }
          }
          if($entryData['entry_type']['type'] == 0){ //プレイヤーおよび、敵プレイヤー限定処理
            //アバター読み込みの為、アセットタグを生成
            $equipItemMaster = null;
            $equipItemsArray = explode(",",$entryData['equip_items']);
            for ($i=0; $i < count($equipItemsArray); $i++) {
              foreach ($result['master_datas']['equip_item_master_datas'] as $row) {
                if($row['id'] == $equipItemsArray[$i]) $equipItemMaster = $row;
              }
              if($equipItemMaster != null){
                $equipAssetTag = getEquipItemAssetTag($equipItemMaster['equip_category_id'],$equipItemMaster['avatar_asset_id']);
                if($equipAssetTag != ""){
                  if($addLoadAssetTags == "") $addLoadAssetTags = $equipAssetTag;
                  else $addLoadAssetTags = $addLoadAssetTags.",".$equipAssetTag;
                }
              }
            }
            //プレイヤーアバターデータ
            $playerAvatarData = getPlayerAvatarData($pdo,$entryData['entry_type']['id']);
            //アセットタグを追加
            $playerAvatarAssetTag = getPlayerAvatarAssetTag($playerAvatarData);
            if($addLoadAssetTags == "") $addLoadAssetTags = $playerAvatarAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$playerAvatarAssetTag;
          }
          else if($entryData['entry_type']['type'] == 1){ //エネミー限定処理
            //敵アセットデータを取得
            $enemyAssetMaster = $entryData['enemy_asset_master'];
            //アセットデータからアセットタグを取得
            $enemyAssetTag = getEnemyAssetTag($enemyAssetMaster);
            if($addLoadAssetTags == "") $addLoadAssetTags = $enemyAssetTag;
            else $addLoadAssetTags = $addLoadAssetTags.",".$enemyAssetTag;
          }
          //パーミッション別に必要な処理
          $flagAddAction = false;
          if(isset($result['permission_datas'])){
            //アクション追加権限があるエントリーデータ限定
            if(isset($result['permission_datas']['add_action'])){
              for ($pd=0; $pd < count($result['permission_datas']['add_action']); $pd++) {
                if($result['permission_datas']['add_action'][$pd] == $entryData['unique_no']){
                  $flagAddAction = true;
                  //デッキデータの取得
                  $addData = array();
                  $addData['unique_no'] = $entryData['unique_no'];
                  $addData['deck_datas'] = array();
                  if($entryData['entry_type']['type'] == 0) $addData['deck_datas'] = getPlayerCardDecks($pdo,$entryData['entry_type']['id']);
                  array_push($result['deck_datas'],$addData);
                  break;
                }
              }
            }
          }
          //操作権限ONのデータが存在
          if($flagAddAction == true){
            //カード選択アニメーションアセットを取得
            if($addLoadAssetTags == "") $addLoadAssetTags = "select_card_1";
            else $addLoadAssetTags = $addLoadAssetTags.",select_card_1";
          }
        }
      }
    }
    $RESULT_JSON = $RESULT_JSON + array('result_battle' => $result);
  }

  if($addLoadAssetTags != ""){ //追加読み込みアセットがあればレスポンスに追加
    $resultAddLoadAssetDatas = getAssetDatas($pdo,$addLoadAssetTags);
    $RESULT_JSON = $RESULT_JSON + array('result_add_load_asset_datas' => $resultAddLoadAssetDatas);
  }
}

echo json_encode($RESULT_JSON);
