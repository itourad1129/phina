<?php

class BattleInstance { //戦闘状況全般を管理するクラス

  public $instanceId = -1; //インスタンスID
  public $battleEventMasterData = null; //バトルイベントのマスターデータ
  public $pdo = null; //DBObject
  public $init = false; //初期化に成功したか
  public $entryDatas = array(); //戦闘参加データ
  public $resultEntryDatas = array(); //全ターンの戦闘参加データ
  public $actionList = array(); //行動リスト
  public $battleLog = null; //バトルログ
  public $battleTurn = 0; //戦闘ターン
  public $addNextActions = array(); //次回に実行するアクション
  public $cardMasterDatas = array(); //カードのマスターデータ
  public $buffMasterDatas = array(); //バフのマスターデータ
  public $equipItemMasterDatas = array(); //装備アイテムのマスターデータ
  public $equipItemParamMasterDatas = array(); //装備アイテムのパラメーター
  public $rankMasterDatas = array(); //カードランクマスターデータ
  public $battleResult = null; //戦闘結果
  public $permission = null; //パーミッション
  public $hostUniqueNo = -1; //ホスト(インスタンス生成者のユニークNo)
  public $actionListUniqueNos = array(); //行動順のユニークNoが入った配列
  public $resultActionListUniqueNos = array(); //全ターンの行動順のユニークNoが入った配列
  public $battleResultSetting = null; //戦闘結果設定
  public $multiPlayerInstance = null; //マルチプレイヤーインスタンス
  public $saveBattleResultSetting = false; //戦闘結果が適応済みか。
  public $teamCount = array(); //参加チーム数カウントのための配列
  //$cardMasterDatas = array(),$buffMasterDatas = array()
  function __construct($pdo=null,$masterDatas){
    if($pdo != null) $this->pdo = $pdo;
    //パーミッションを生成
    $this->permission = new BattleInstancePermission();
    //マルチプレイヤー用インスタンスを生成
    $this->multiPlayerInstance = new MultiPlayerInstance();
    //各マスターデータをセット
    if(isset($masterDatas['card_master_datas'])
    && is_array($masterDatas['card_master_datas'])
    && count($masterDatas['card_master_datas']) != 0) $this->cardMasterDatas = $masterDatas['card_master_datas'];

    if(isset($masterDatas['buff_master_datas'])
    && is_array($masterDatas['buff_master_datas'])
    && count($masterDatas['buff_master_datas']) != 0) $this->buffMasterDatas = $masterDatas['buff_master_datas'];

    if(isset($masterDatas['equip_item_master_datas'])
    && is_array($masterDatas['equip_item_master_datas'])
    && count($masterDatas['equip_item_master_datas']) != 0) $this->equipItemMasterDatas = $masterDatas['equip_item_master_datas'];

    if(isset($masterDatas['equip_item_param_master_datas'])
    && is_array($masterDatas['equip_item_param_master_datas'])
    && count($masterDatas['equip_item_param_master_datas']) != 0) $this->equipItemParamMasterDatas = $masterDatas['equip_item_param_master_datas'];

    if(isset($masterDatas['rank_master_datas'])
    && is_array($masterDatas['rank_master_datas'])
    && count($masterDatas['rank_master_datas']) != 0) $this->rankMasterDatas = $masterDatas['rank_master_datas'];

    if(isset($masterDatas['battle_event_master_data'])
    && is_array($masterDatas['battle_event_master_data'])
    && count($masterDatas['battle_event_master_data']) != 0) $this->battleEventMasterData = $masterDatas['battle_event_master_data'];

    //インスタンス新規作成
    $checkBattleInstanceId = $this->CreateBattleInstance($this->pdo);
    if($checkBattleInstanceId != -1){
      $this->instanceId = $checkBattleInstanceId;
      $this->battleLog = new BattleLog($this->instanceId);
    }
    if($this->instanceId != -1 && $this->battleLog != null && $this->battleEventMasterData != false) $this->init = true;
  }

  function SetPdo($pdo){
    $this->pdo = $pdo;
  }

  function AddEntryData(BattleEntryData $addEntryData){
    $teamMemberCount = 0;
    $playerCheck = true; //既に同じプレイヤーIDのプレイヤーが参加済みの場合falseになる。
    foreach ($this->entryDatas as $entryData) {
      if($entryData->partyInstance->teamNo == $addEntryData->partyInstance->teamNo) $teamMemberCount ++;
      if($entryData->battleEntryType->type == 0
      && $addEntryData->battleEntryType->type == $entryData->battleEntryType->type
      && $entryData->battleEntryType->id == $addEntryData->battleEntryType->id){ $playerCheck = false; }
    }
    if($playerCheck == false) return 0; //既に参加済みのプレイヤーだった。
    if(5 <= $teamMemberCount) return 0; //チームの最大メンバー数に到達していた。

    $index = count($this->entryDatas);
    $this->entryDatas[$index] = $addEntryData;
    $this->entryDatas[$index]->uniqueNo = $index;
    if($addEntryData->host == true) $this->hostUniqueNo = $this->entryDatas[$index]->uniqueNo; //ホストだった場合、ホストに設定
    $this->entryDatas[$index]->pos = $this->GetStartBattlePos($teamMemberCount,$addEntryData->partyInstance);
    //参加チーム加算かチェックして新しければ加算
    if(count($this->teamCount) == 0){ $this->teamCount[0] = $this->entryDatas[$index]->partyInstance->teamNo; }
    else{
      $teamFound = false;
      for ($i=0; $i < count($this->teamCount); $i++) {
        if($this->teamCount[$i] == $this->entryDatas[$index]->partyInstance->teamNo){ $teamFound = true; break; }
      }
      if($teamFound == false) $this->teamCount[count($this->teamCount)] = $this->entryDatas[$index]->partyInstance->teamNo;
    }
  }

  function CreateBattleEntryDataForPlayerData($playerIndexId,BattlePartyInstance &$partyInstance,$host = false){ //プレイヤーデータから戦闘参加データを作成
    $list = array();

    $playerInfo = getPlayerInfoForIndexId($this->pdo,$playerIndexId,true);
    if($playerInfo != false){
      $list['battle_entry_type'] = array();
      $list['battle_entry_type']['type'] = 0;
      $list['battle_entry_type']['id'] = $playerIndexId;
      $list['battle_entry_type']['team_no'] = $partyInstance->teamNo;
      $list['class_id'] = $playerInfo['player_class_id'];
      $list['name'] = $playerInfo['player_name'];
      $list['direction'] = 0 == $partyInstance->teamNo ? 1 : 3;
      if($list['direction'] == 1) $list['direction_disp'] = 1;
      if($list['direction'] == 3) $list['direction_disp'] = 0;
      $list['level'] = $playerInfo['player_level'];
      $list['base_status'] = getPlayerStatus($this->pdo,$playerIndexId,true);
      $list['status'] = $list['base_status'];
      $playerEquipItems = getPlayerEquipItem($this->pdo,$playerIndexId);
      $resultEquipItems = "";
      foreach ($playerEquipItems as $playerEquipItem) {
        if($playerEquipItem['equip_status'] == 2){
          if($resultEquipItems == "") $resultEquipItems = $playerEquipItem['equip_item_master_id'];
          else $resultEquipItems = $resultEquipItems.",".$playerEquipItem['equip_item_master_id'];
        }
      }
      $list['equip_items'] = $resultEquipItems;
      $playerCardDatas = getPlayerCard($this->pdo,$playerIndexId);
      $list['player_card_datas'] = $playerCardDatas;
      $resultCards = "";
      foreach ($playerCardDatas as $playerCardData) {
        if($resultCards == "") $resultCards = $playerCardData['card_master_id'];
        else $resultCards = $resultCards.",".$playerCardData['card_master_id'];
      }
      $list['cards'] = $resultCards;
      $list['attribute'] = getPlayerAttribute($this->pdo,$playerIndexId);
      $list['avatar_data'] = getPlayerAvatarData($this->pdo,$playerIndexId);
      $list['host'] = $host;
      $list['power'] = 0; //変更があれば追加で記載
      $list['bp'] = 0;
    }
    else return false;

    return new BattleEntryData($this->pdo,$list,$partyInstance,$this);
  }

  function CreateBattleEntryDataForEnemyData($enemyIndexId,BattlePartyInstance &$partyInstance = null,$statusIds){ //敵データから戦闘参加データを作成
    $list = array();
    $enemyMaster = getEnemyMasterData($this->pdo,$enemyIndexId);
    if($enemyMaster != false){
      $list['battle_entry_type'] = array();
      $list['battle_entry_type']['type'] = 1;
      $list['battle_entry_type']['id'] = $enemyIndexId;
      $list['battle_entry_type']['team_no'] = $partyInstance->teamNo;
      $list['class_id'] = $enemyMaster['enemy_class_id'];
      $list['name'] = $enemyMaster['enemy_name'];
      $list['direction'] = 0 == $partyInstance->teamNo ? 1 : 3;
      if($list['direction'] == 1) $list['direction_disp'] = 1;
      if($list['direction'] == 3) $list['direction_disp'] = 0;
      $list['level'] = $enemyMaster['enemy_level'];
      $list['base_status'] = getEnemyStatus($enemyMaster,$statusIds);
      $list['status'] = $list['base_status'];
      $list['equip_items'] = $enemyMaster['enemy_equip_items'];
      $list['cards'] = $enemyMaster['enemy_cards'];
      $list['attribute'] = getEnemyAttribute($this->pdo,$enemyIndexId);
      $list['enemy_master_data'] = $enemyMaster;
      $list['enemy_asset_master'] = getEnemyAssetMasterData($this->pdo,$enemyIndexId);
      $list['power'] = $enemyMaster['enemy_power'];
      $list['bp'] = 0;
    }
    else return false;

    return new BattleEntryData($this->pdo,$list,$partyInstance,$this);
  }

  function CreateBattleEntryDataForNpcData($npcIndexId,BattlePartyInstance &$partyInstance){ //NPCデータから戦闘参加データを作成
    $list = array();

    return new BattleEntryData($this->pdo,$list,$partyInstance,$this);
  }

  function GetStartBattlePos($posIndex,BattlePartyInstance $partyInstance){ //戦闘開始時の位置を決定
    $result = array();
    $result['y'] = $posIndex + 1;
    $exp = explode(',',$partyInstance->formation['positions']);
    $result['x'] = $exp[$posIndex];
    if($partyInstance->teamNo == 1){
      switch ((int)$result['x']) {
        case 0:
        $result['x'] = 6;
        break;
        case 1:
        $result['x'] = 5;
        break;
        case 2:
        $result['x'] = 4;
        break;
        default:
        break;
      }
    }
    return $result;
  }

  function CreateBattleInstance($conn){ //バトルインスタンスを生成
    $resultId = -1;
    try{
      $conn->beginTransaction(); //トランザクション開始
      $stmt = $conn -> prepare("INSERT INTO battle_instance () VALUES ()");
      $stmt->execute();
      $resultId = $conn->lastInsertId('battle_instance_id');
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      var_dump($e);
      $resultId = -1;
    }
    return $resultId;
  }

  function SetActionList(){ //ターンの開始に必要な行動リストを設定する。
    //既に行動が設定してあれば、リセット
    if(count($this->actionList) != 0){
      unset($this->actionList);
      $this->actionList = array();
    }
    //行動順を取得
    $this->actionListUniqueNos = $uniqueNos = $this->SetActionUniqueNos(); //エントリーリストを行動順に変更
    //ターン毎に行動順を記録
    $this->resultActionListUniqueNos[$this->battleTurn] = $uniqueNos;
    for ($i=0; $i < count($uniqueNos); $i++) {
      foreach ($this->entryDatas as &$entryData) {
        if($uniqueNos[$i] == $entryData->uniqueNo){ //行動するエントリーデータ
          if($entryData->action != null){ //アクションが登録されている。
            $entryData->action->SetMyActionData($entryData->uniqueNo,$this);
            array_push($this->actionList,$entryData->action);
          }
        }
      }
      unset($entryData);
    }
  }

  function SetActionUniqueNos(){ //行動順番のUniqueNoを取得
    $uniqueNos = array();
    foreach ($this->entryDatas as $entryData) { //参加者のユニークIDを配列に挿入
      $uniqueNos[count($uniqueNos)] = $entryData->uniqueNo;
    }
    shuffle($uniqueNos); //配列をシャッフル

    //素早さの配列を生成
    $agiSortArray = array();
    for ($i=0; $i < count($uniqueNos); $i++) {
      foreach ($this->entryDatas as $entryData) {
        if($uniqueNos[$i] == $entryData->uniqueNo){
          $agi = (int)$entryData->GetStatusTotal(6);
          $add = array('agi' => $agi,'unique_no' => $entryData->uniqueNo);
          array_push($agiSortArray,$add);
        }
      }
    }

    // foreachで1つずつ値を取り出す
    $agis = array();
    foreach ($agiSortArray as $key => $value) {
      $agis[$key] = $value['agi'];
    }

    //AGIでソート
    array_multisort($agis, SORT_ASC, $agiSortArray);

    //重複の値にランダム性を持たせる
    $nowAgi = -1;
    $agiRandomSort = array();
    foreach ($agiSortArray as $row) {
      if($nowAgi == $row['agi']) continue;
      else if($nowAgi < $row['agi']) $nowAgi = $row['agi'];
      $tmpArray = array();
      foreach ($agiSortArray as $row2) {
        if($row2['agi'] == $nowAgi) $tmpArray[count($tmpArray)] = $row2['unique_no'];
      }
      if(count($tmpArray) != 0){
        shuffle($tmpArray); //配列をシャッフル
        $agiRandomSort = array_merge($agiRandomSort,$tmpArray);
      }
    }

    //最終的に行動順のエントリーデータ配列を生成
    $result = array();
    for ($i=0; $i < count($agiRandomSort); $i++) {
      foreach ($this->entryDatas as $entryData) {
        if((int)$agiRandomSort[$i] == (int)$entryData->uniqueNo){
          array_push($result,(int)$entryData->uniqueNo);
        }
      }
    }
    $result = array_reverse($result);
    return $result;
  }


  function ActionExe(Action $action){ //行動クラスから行動の実行
    if($action->isChangeDirection == 1){ //方向転換した
      $action->ChangeDirection();
    }
    if($action->isMove == 1){ //移動を実行した。
      //アクションの実行に必要なデータを設定
      $action->Move($this);
    }
    if($action->isUseCard == 1){ //カードを使用した。
      //アクションの実行に必要なデータを設定
      $action->UseCard($this);
    }
  }

  function BuffExe(){ //継続実行のバフを回す
    foreach ($this->entryDatas as $entryData) {
      foreach ($entryData->buffs as &$buff) {
        $buff->ExeBuff($this,$entryData);
      }
      unset($buff);
    }
  }

  function BattleStart(){ //戦闘開始してターンを進める ※インスタンスIDを新規生成後、エントリーが確定後に呼び出す。
    //ターン開始
    if($this->battleTurn == 0) $this->AddResultEntryDatas(); //ターン毎にエントリーデータを記録
    $this->battleTurn = $this->battleTurn + 1;
    $this->SetActionList(); //行動があれば登録
    $this->BuffExe(); //バフを回す
    if($this->GameCheck() == true) {$this->AddResultEntryDatas(); return;} //ゲーム進行チェック trueだとゲーム終了
    foreach ($this->actionList as $action) { //行動決定順に回す。
      //var_dump($action->myEntryData->uniqueNo);
      $this->ActionExe($action); //アクションを実行
      if($this->GameCheck() == true){
        $this->AddResultEntryDatas();
        return; //ゲーム進行チェック trueだとゲーム終了
        break;
      }
    }
    $this->DrawPrizeCard(); //プライズカード、ドロー処理
    $this->UpdateMoveAreaLevel(); //移動範囲更新
    $this->AddResultEntryDatas(); //ターン毎にエントリーデータを記録
    //var_dump("-----------------------------------ターン終わり----------------------------------------");
  }

  function UpdateActions($addActions){ //アクションを更新する。
    $result = true; //成功判定
    if(is_array($addActions)){
      foreach ($addActions as $addAction) {
        if(get_class($addAction) == 'AddAction'){
          foreach ($this->entryDatas as $entryData) {
            //該当するエントリーデータかチェック
            if($entryData->uniqueNo == $addAction->uniqueNo){
              $entryData->SetAction($addAction->action);
            }
          }
        }
      }
    }
    else return false;
    return $result;
  }

  function ResetActions(){ //アクションの登録状態をリセットする
    foreach ($this->entryDatas as $entryData) {
      $entryData->action = null;
    }
  }

  function GetEntryData($uniqueNo){ //ユニークNoからエントリーデータを取得
    $result = null;
    foreach ($this->entryDatas as $entryData) {
      if($entryData->uniqueNo == $uniqueNo){$result = $entryData; break;}
    }
    return $result;
  }

  function GetEntryDataSelectEntryType($type,$id){ //エントリータイプからエントリーデータを取得
    $result = null;
    foreach ($this->entryDatas as $entryData) {
      if($entryData->battleEntryType->type == $type && $entryData->battleEntryType->id == $id){$result = $entryData; break;}
    }
    return $result;
  }

  function GetTeamMember($teamNo){ //チームメンバーのエントリーデータを取得
    $result = array();
    foreach ($this->entryDatas as $entryData) {
      if($entryData->partyInstance->teamNo == $teamNo){
        array_push($result,$entryData);
      }
    }
    return $result;
  }

  function CheckUseCard($cardId,$battleEntryData,$setMasterData = null){ //カードが使用可能かチェックする。マスターデータが既にあればそれを使用
    //生存チェック
    $result = true;
    if($cardId == -1) return false;
    if($battleEntryData->isDead == true) return false;
    $cardMasterData = null;
    if($setMasterData == null){
      foreach ($this->cardMasterDatas as $row) {
        if($cardId == $row['id']){
          $cardMasterData = $row;
          break;
        }
      }
    }
    else $cardMasterData = $setMasterData;
    //マスターデータチェック
    if($cardMasterData == null) return false;
    //所持チェック
    $cardFound = false;
    $myCardIds = explode(",",$battleEntryData->cards);
    for ($i=0; $i < count($myCardIds); $i++) {
      if($myCardIds[$i] == $cardMasterData['id']){
        $cardFound = true;
        break;
      }
    }
    //所持カードに無ければ、プライズカードからチェック
    if($cardFound == false){
      $myPrizeCardIds = explode(",",$battleEntryData->prizeCards);
      for ($i=0; $i < count($myPrizeCardIds); $i++) {
        if($myPrizeCardIds[$i] == $cardMasterData['id']){
          $cardFound = true;
          break;
        }
      }
    }
    //error_log("カードチェック中\n", 3, './debug.txt');
    if($cardFound == false) return false;
    //error_log("カードチェック中1\n", 3, './debug.txt');
    //コストチェック
    //error_log("コスト1:".$battleEntryData->bp."\n", 3, './debug.txt');
    //error_log("コスト2:".$cardMasterData['cost']."\n", 3, './debug.txt');
    if($battleEntryData->bp < $cardMasterData['cost']) return false;
    //error_log("カードチェック中2\n", 3, './debug.txt');
    //クラスチェック
    if($cardMasterData['class_id'] != 1){ //カードのクラスIDが指定されていればクラスチェック
      if($battleEntryData->classId != $cardMasterData['class_id']) return false;
    }
    //error_log("カードチェック中3\n", 3, './debug.txt');
    //武器種チェック
    if($cardMasterData['weapon_category_id'] != 0){ //カードに武器カテゴリーIDが指定されていればチェック
      $myWeapon = $battleEntryData->SelectPlayerEquipItem(1,$this->equipItemMasterDatas);
      if($myWeapon == false || $cardMasterData['weapon_category_id'] != $myWeapon['weapon_category_id']) return false;
    }
    //error_log("カードチェック中4\n", 3, './debug.txt');
    //サブ武器チェック
    if($cardMasterData['sub_weapon_category_id'] != 0){ //カードに武器カテゴリーIDが指定されていればチェック
      $mySubWeapon = $battleEntryData->SelectPlayerEquipItem(2,$this->equipItemMasterDatas);
      if($mySubWeapon == false || $cardMasterData['sub_weapon_category_id'] != $mySubWeapon['weapon_category_id']) return false;
    }
    //error_log("カードチェック中5\n", 3, './debug.txt');
    return $result;
  }

  function GetMoveLevel($battleEntryData){ //移動可能範囲になる、移動レベルを取得
    $result = 1;
    $enemyTeamAgi = 0;
    $enemyTeamCount = 0;
    $agiAverage = 0;
    //相手チームの平均素早さを取得
    foreach ($this->entryDatas as $entryData) {
      if($entryData->partyInstance->teamNo != $battleEntryData->partyInstance->teamNo){
        $enemyTeamAgi = $enemyTeamAgi + (int)$entryData->GetStatusTotal(6);
        $enemyTeamCount = $enemyTeamCount + 1;
      }
    }
    $agiAverage = round($enemyTeamAgi / $enemyTeamCount); //相手チーム素早さの平均

    //error_log("相手素早さ平均\n", 3, './debug.txt');
    //error_log($agiAverage."\n", 3, './debug.txt');

    $myAgi = (int)$battleEntryData->GetStatusTotal(6);

    //error_log("自分素早さ\n", 3, './debug.txt');
    //error_log($myAgi."\n", 3, './debug.txt');

    //範囲が広がるハードルの乱数
    $maxRange = 2000;
    $minRange = 1500;
    $rot = rand();

    if(($agiAverage * 2) <= $myAgi) $result = $result + 2;
    else if((int)round($agiAverage * 1.5) <= $myAgi) $result + 1;

    //error_log("比較1\n", 3, './debug.txt');
    //error_log(($agiAverage * 2)."\n", 3, './debug.txt');
    //error_log("比較2\n", 3, './debug.txt');
    //error_log(round($agiAverage * 1.5)."\n", 3, './debug.txt');
    //error_log("結果\n", 3, './debug.txt');
    //error_log($result."\n", 3, './debug.txt');

    return $result;
  }

  function GetMoveArea($moveLevel,$battleEntryData){ //移動可能範囲を取得
    $myPos = $battleEntryData->pos;
    $myDirection = $battleEntryData->direction;
    $result = array();
    switch ((int)$moveLevel) {
      case 1:
      {
        $eAreaType = 1;
        $effectArea = new EffectArea($myPos,$myDirection,$eAreaType);
        $result = $effectArea->GetArea();
      }
      break;
      case 2:
      {
        $eAreaType = 2;
        $effectArea = new EffectArea($myPos,$myDirection,$eAreaType);
        $result = $effectArea->GetArea();
      }
      break;
      case 3:
      {
        $eAreaType = 2;
        $effectArea = new EffectArea($myPos,$myDirection,$eAreaType);
        $result = $effectArea->GetArea();
      }
      break;
      case 4:
      {
        $eAreaType = 2;
        $effectArea = new EffectArea($myPos,$myDirection,$eAreaType);
        $result = $effectArea->GetArea();
      }
      break;
      default:
      {
        $eAreaType = 1;
        $effectArea = new EffectArea($myPos,$myDirection,$eAreaType);
        $result = $effectArea->GetArea();
      }
      break;
    }
    return $result;
  }

  function CheckMove($posX,$posY,$battleEntryData){ //移動先が移動可能かチェックする。
    $result = true;
    $entryDatas = $this->entryDatas;
    //移動先にキャラが存在しないか。
    foreach ($entryDatas as $entryData) {
      if($entryData->uniqueNo != $battleEntryData->uniqueNo){ //自分以外を調べる
        if($entryData->pos['x'] == $posX && $entryData->pos['y'] == $posY && $entryData->isDead == false){
          $result = false;
          break;
        }
      }
    }
    //移動可能な移動範囲か
    $areaCheck = false;
    foreach ($battleEntryData->moveAreas as $moveArea) {
      if($moveArea['x'] == $posX && $moveArea['y'] == $posY){
        $areaCheck = true;
        break;
      }
    }
    if($areaCheck == false) $result = false;

    return $result;
  }

  //移動範囲から設定した移動方向に対して、移動先の場所を取得
  function GetMoveDirectionPos($battleEntryData,$moveArea,$xDirectionKey,$yDirectionKey){
    $result = array();
    $result['x'] = -1;
    $result['y'] = -1;

    $xDirection = 1;
    if($xDirectionKey == 'x_0') $xDirection = 0;
    if($xDirectionKey == 'x_1') $xDirection = 1;
    if($xDirectionKey == 'x_2') $xDirection = 2;

    $yDirection = 1;
    if($yDirectionKey == 'y_0') $yDirection = 0;
    if($yDirectionKey == 'y_1') $yDirection = 1;
    if($yDirectionKey == 'y_2') $yDirection = 2;

    $myPos = $battleEntryData->pos;
    $nowX = $myPos['x'];
    $nowY = $myPos['y'];
    foreach ($moveArea as $area) {
      if($this->CheckMove($area['x'],$area['y'],$battleEntryData) == false) continue;
      $xFlag = false;
      $yFlag = false;
      switch ($xDirection) {
        case 0:
        {
          if($area['x'] < $nowX) $xFlag = true;
        }
        break;
        case 1:
        {
          if($area['x'] == $nowX) $xFlag = true;
        }
        break;
        case 2:
        {
          if($nowX < $area['x']) $xFlag = true;
        }
        break;
        default:
        break;
      }

      switch ($yDirection) {
        case 0:
        {
          if($area['y'] < $nowY) $yFlag = true;
        }
        break;
        case 1:
        {
          if($area['y'] == $nowY) $yFlag = true;
        }
        break;
        case 2:
        {
          if($nowY < $area['y']) $yFlag = true;
        }
        break;
        default:
        break;
      }

      if($xFlag == true && $yFlag == true){
        $result = $area;
        $nowX = $area['x'];
        $nowY = $area['y'];
      }
    }

    //移動先がまだ見つかっていない場合、片方に近い距離で調べる
    if($result['x'] == -1 && $result['y'] == -1){
      //xかyに近くかはランダム
      $rot = rand(0,1);
      $nowX = $myPos['x'];
      $nowY = $myPos['y'];
      foreach ($moveArea as $area) {
        if($this->CheckMove($area['x'],$area['y'],$battleEntryData) == false) continue;
        $xFlag = false;
        $yFlag = false;
        if($rot == 0){ //x
          switch ($xDirection) {
            case 0:
            {
              if($area['x'] < $nowX) $xFlag = true;
            }
            break;
            case 1:
            {
              if($area['x'] == $nowX) $xFlag = true;
            }
            break;
            case 2:
            {
              if($nowX < $area['x']) $xFlag = true;
            }
            break;
            default:
            break;
          }
        }
        else { //y
          switch ($yDirection) {
            case 0:
            {
              if($area['y'] < $nowY) $yFlag = true;
            }
            break;
            case 1:
            {
              if($area['y'] == $nowY) $yFlag = true;
            }
            break;
            case 2:
            {
              if($nowY < $area['y']) $yFlag = true;
            }
            break;
            default:
            break;
          }
        }

        if($rot == 0 && $xFlag == true){
          $result = $area;
          $nowX = $area['x'];
        }
        if($rot == 1 && $yFlag == true){
          $result = $area;
          $nowY = $area['y'];
        }

      }

      if($result['x'] == -1 && $result['y'] == -1){
        //片方に移動先が無ければもう片方を調べる
        $checkRot = $rot == 0 ? 1 : 0;
        $nowX = $myPos['x'];
        $nowY = $myPos['y'];
        foreach ($moveArea as $area) {
          if($this->CheckMove($area['x'],$area['y'],$battleEntryData) == false) continue;
          $xFlag = false;
          $yFlag = false;
          if($checkRot == 0){ //x
            switch ($xDirection) {
              case 0:
              {
                if($area['x'] < $nowX) $xFlag = true;
              }
              break;
              case 1:
              {
                if($area['x'] == $nowX) $xFlag = true;
              }
              break;
              case 2:
              {
                if($nowX < $area['x']) $xFlag = true;
              }
              break;
              default:
              break;
            }
          }
          else { //y
            switch ($yDirection) {
              case 0:
              {
                if($area['y'] < $nowY) $yFlag = true;
              }
              break;
              case 1:
              {
                if($area['y'] == $nowY) $yFlag = true;
              }
              break;
              case 2:
              {
                if($nowY < $area['y']) $yFlag = true;
              }
              break;
              default:
              break;
            }
          }

          if($checkRot == 0 && $xFlag == true){
            $result = $area;
            $nowX = $area['x'];
          }
          if($checkRot == 1 && $yFlag == true){
            $result = $area;
            $nowY = $area['y'];
          }
        }
      }
    }

    return $result;
  }

  //カード効果を受ける対象を取得 デフォルトでは、設定したエントリーデータの現在位置と方向
  function GetCardEffectTargets(CardData $cardData,$battleEntryData,$setPos = null,$setDirection = -1){
    $result = array();
    if($battleEntryData == null) return $result;
    if($cardData->init == true){
      $skillData = $cardData->skillData;
      $setEffectAreaPos = $battleEntryData->pos;
      $setEffectAreaDirection = $battleEntryData->direction;
      if($setPos != null && is_array($setPos) && isset($setPos['x']) && isset($setPos['y'])) $setEffectAreaPos = $setPos;
      if($setDirection != -1) $setEffectAreaDirection = $setDirection;
      $effectArea = new EffectArea($setEffectAreaPos,$setEffectAreaDirection,$cardData->effectAreaType);
      $areas = $effectArea->GetArea();
      foreach ($areas as $area) {
        $entryDatas = $this->entryDatas;
        foreach ($entryDatas as $entryData) {
          $entryDataPos = $entryData->pos;
          //$target = 0; //0:味方,1:敵,2:両方
          //味方が対象だが、敵だった場合はスキップ
          if($skillData->target == 0 && $battleEntryData->partyInstance->teamNo != $entryData->partyInstance->teamNo) continue;
          //敵が対象だが、味方だった場合はスキップ
          if($skillData->target == 1 && $battleEntryData->partyInstance->teamNo == $entryData->partyInstance->teamNo) continue;
          //効果範囲と一致しているか。
          if($area['x'] == $entryDataPos['x'] && $area['y'] == $entryDataPos['y']){
            //バックアタックかチェック
            $backAttack = $this->CheckBackAttack($battleEntryData->pos,$battleEntryData->direction,$entryDataPos,$entryData->direction);
            $addData = array('entry_data' => $entryData,'back_attack' => $backAttack);
            array_push($result,$addData); //効果範囲に居たため、発動対象に追加。
          }
        }
      }
    }
    return $result;
  }

  function DrawPrizeCard(){ //プライズカードを引く処理(毎ターン終了時に実行)
    $prizeCardData = new PrizeCardData($this->cardMasterDatas,$this->rankMasterDatas);
    foreach ($this->entryDatas as &$entryData) {
      if($entryData->isDead == false){ //生存者
        $getDrawCards = $prizeCardData->Draw($this,$entryData);
        $entryData->prizeCards = $getDrawCards;
      }
    }
    unset($entryData);
  }

  function GameCheck(){ //ゲーム進行チェック trueでゲーム終了
    $result = false;
    //ゲームオーバーチェック
    $liveTeam = array();
    $entryTeams = ""; //参加チーム
    foreach ($this->entryDatas as $entryData) {
      $teamIndex = -1;
      for ($i=0; $i < count($liveTeam); $i++) {
        if($liveTeam[$i]['team_no'] == $entryData->partyInstance->teamNo){
          $teamIndex = $i;
          break;
        }
      }
      if($teamIndex == -1) { //なければチームの状態を登録
        $addTeam = array('team_no' => $entryData->partyInstance->teamNo,'live' => $entryData->isDead == false ? true : false);
        $liveTeam[count($liveTeam)] = $addTeam;
        if($entryTeams == "") $entryTeams = $entryData->partyInstance->teamNo;
        else $entryTeams = $entryTeams.",".$entryData->partyInstance->teamNo;
      }
      else{ //生きていれば、チームの状態を更新
        if($entryData->isDead == false) $liveTeam[$teamIndex]['live'] = true;
      }
    }

    $deadTeamCount = 0; //全滅チーム数
    $liveTeamNo = -1; //生存チーム(複数居た場合は、最後に判定されたチームNo)
    for ($i=0; $i < count($liveTeam); $i++) {
      if($liveTeam[$i]['live'] == false) $deadTeamCount = $deadTeamCount + 1;
      else $liveTeamNo = $liveTeam[$i]['team_no'];
    }

    //全チームの中から全滅チームの数を引く
    $liveTeamCount = count($liveTeam) - $deadTeamCount;
    //戦闘結果データを作成
    $battleResultData = array();
    $battleResultData['win_team'] = -1; //勝利チーム
    $battleResultData['lose_teams'] = ""; //敗北チーム(カンマ区切り)
    $battleResultData['win_team_battle_entry_type'] = array(); //勝利チームの戦闘参加タイプ
    $battleResultData['lose_team_battle_entry_type'] = array(); //敗北チームの戦闘参加タイプ
    $battleResultData['next_events'] = array(); //戦闘後に繋ぐ次のイベントデータ
    if($liveTeamCount == 0){ //全チーム全滅(引き分け)
      //error_log("全チーム全滅\n", 3, './debug.txt');
      $result = true;
      //引き分けは強制全員負け扱い
      $battleResultData['lose_teams'] = $entryTeams;
    }else if($liveTeamCount == 1){ //1チーム生存(ゲーム終了)
      $result = true;
      //error_log("1チーム生存\n", 3, './debug.txt');
      for ($i=0; $i < count($liveTeam); $i++) {
        if($liveTeam[$i]['live'] == true) $battleResultData['win_team'] = $liveTeam[$i]['team_no'];
        else if($liveTeam[$i]['live'] == false) {
          if($battleResultData['lose_teams'] == "") $battleResultData['lose_teams'] = $liveTeam[$i]['team_no'];
          else $battleResultData['lose_teams'] = $battleResultData['lose_teams'].",".$liveTeam[$i]['team_no'];
        }
      }
    }
    //ゲームが終わった時の処理
    if($result == true){
      //負けたチームのバトルエントリータイプを取得
      foreach ($this->entryDatas as $entryData) {
        $isLoseTeam = false;
        $loseTeams = explode(",",$battleResultData['lose_teams']);
        for ($i=0; $i < count($loseTeams); $i++) {
          if($loseTeams[$i] == $entryData->partyInstance->teamNo){
            $isLoseTeam = true;
            break;
          }
        }
        if($isLoseTeam == true) array_push($battleResultData['lose_team_battle_entry_type'],$entryData->battleEntryType);
      }
      //勝利チームのバトルエントリータイプを取得
      if($battleResultData['win_team'] != -1){
        foreach ($this->entryDatas as $entryData) {
          if($entryData->partyInstance->teamNo == $battleResultData['win_team']) {
            array_push($battleResultData['win_team_battle_entry_type'],$entryData->battleEntryType);
            //$this->battleResultSetting->Win($this,$entryData); //勝利時に戦闘終了設定を実行
          }
        }
      }
      //戦闘結果を保存
      $this->battleResult = $battleResultData;
      //戦闘結果をログに書き込む
      $list = array();
      $list['effect_image_ids'] = "34,35,36";
      $list['log_type'] = 6;
      $list['turn'] = $this->battleTurn;
      $this->battleLog->AddGameResultLog($list);
    }
    return $result;
  }

  function AddPermission($uniqueNo,$permissionType){ //パーミッションを追加
    $result = false;
    if($this->permission != null){
      $result = $this->permission->AddPermission($uniqueNo,$permissionType);
    }
    return $result;
  }

  function CheckPermission($uniqueNo,$permissionType){ //パーミッションチェック
    $result = false;
    if($this->permission != null){
      $result = $this->permission->CheckPermission($uniqueNo,$permissionType);
    }
    return $result;
  }

  function CheckBackAttack($myPos,$myDirection,$targetPos,$targetDirection){ //バックアタック可能かチェック
    $result = 0;

    //右左
    if($myPos['x'] < $targetPos['x']){
      if($myDirection == 1 && $myDirection == $targetDirection) $result = 1;
    }
    else if($myPos['x'] > $targetPos['x']){
      if($myDirection == 3 && $myDirection == $targetDirection) $result = 1;
    }
    //上下
    if($myPos['y'] < $targetPos['y']){
      if($myDirection == 2 && $myDirection == $targetDirection) $result = 2;
    }
    else if($myPos['y'] > $targetPos['y']){
      if($myDirection == 0 && $myDirection == $targetDirection) $result = 0;
    }

    return $result;
  }

  function UpdateMoveAreaLevel(){ //移動可能範囲を更新
    //error_log("移動範囲更新\n", 3, './debug.txt');
    foreach ($this->entryDatas as $entryData) {
      $moveLevel = $this->GetMoveLevel($entryData);
      $moveAreas = $this->GetMoveArea($moveLevel,$entryData);
      $entryData->moveAreas = $moveAreas;
    }
  }

  function AddBattleResultSetting(BattleResultSetting $battleResultSetting){ //戦闘結果設定を追加
    $this->battleResultSetting = $battleResultSetting;
  }

  function AddResultEntryDatas(){ //ターン毎のエントリーデータを追加
    $battleResponse = new BattleResponse();
    $addEntryDatas = $battleResponse->GetEntryDatas($this);
    $this->resultEntryDatas[$this->battleTurn] = $addEntryDatas;
  }

  function SetEntryPlayer($playerIndexId){ //戦闘画面を見たプレイヤー (マルチプレイヤー開始判定用)
    $result = array();
    $result['update_flag'] = false; //インスタンスのアップデートが必要か
    $beforMultiMode = $this->multiPlayerInstance->GetMultiPlayerMode();
    //見たユーザーが、戦闘にエントリーしているかチェック
    $battleEntryCheck = false;
    foreach ($this->entryDatas as $entryData) {
      if($entryData->battleEntryType->type == 0 && $entryData->battleEntryType->id == $playerIndexId) {$battleEntryCheck = true; break;}
    }
    if($battleEntryCheck == true && $this->multiPlayerInstance != null){
      $playerIndexIds = $this->multiPlayerInstance->entryPlayerIndexIds;
      $idCheck = true;
      for ($i=0; $i < count($playerIndexIds); $i++) {
        if($playerIndexIds[$i] == $playerIndexId) {$idCheck = false; break;}
      }
      //リストに追加されていなければ、追加
      if($idCheck == true) {
        $result['update_flag'] = true;
        array_push($this->multiPlayerInstance->entryPlayerIndexIds,$playerIndexId);
      }
    }
    //マルチプレイヤーモードに以降した場合、開始時刻と現在のターンを取得
    if($beforMultiMode == false && $this->multiPlayerInstance->GetMultiPlayerMode()){
      $result['update_flag'] = true;
      $this->multiPlayerInstance->startDate = date('Y-m-d H:i:s');
      $this->multiPlayerInstance->startBattleTurn = $this->battleTurn;
    }
    return $result;
  }

}
