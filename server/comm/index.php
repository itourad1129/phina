<?php
function loadCommXml($conn,$commId,$oprionXmlPath = false){ //指定したcommIdからxmlを読み込む $OptionXmlPath:このディレクトリ以外からxmlを指定する場合true
  $result = false;
  $sql = "SELECT * FROM story_comm_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($commId));
  $searchStoryCommMaster = $stmt->fetch(PDO::FETCH_ASSOC);
  if($searchStoryCommMaster != false){ //選択したストーリが存在すれば
    if($oprionXmlPath == false){
      $xmlPath = "comm_".$commId.".xml";
    }
    else{
      $xmlPath = "../comm/comm_".$commId.".xml";
    }
    $loadXml = file_get_contents($xmlPath);
    if($loadXml != false){ //xmlが読み込めた場合
      //. <***:****> -> <***_****>
      $loadXml  = preg_replace( "/<([^>]+?):(.+?)>/", "<$1_$2>", $loadXml );
      //. プロトコルは元に戻す
      $loadXml  = preg_replace( "/_\/\//", "://", $loadXml );

      $resultCommXml = simplexml_load_string( $loadXml );
      if($resultCommXml != false){
        $resultCommData = array();
        $resultCommData['setting']['fontColor'] = (string)$resultCommXml->setting->fontColor;
        $resultCommData['setting']['fontSize'] =  (int)$resultCommXml->setting->fontSize;
        $charaDatas = array();
        $characterMasterData = getCommCharacterDatas($conn); //キャラクターマスターデータ取得
        foreach ($resultCommXml->characters->character as $character) {
          $id = ($character->id);
          $name = "";
          $assetIdFull = 0;
          $assetIdIcon = 0;
          foreach ($characterMasterData as $charaMaster) { //指定したキャラクター情データを検索
            if($charaMaster['id'] == $id){
              $name = $charaMaster['name'];
              $assetIdFull = $charaMaster['asset_id_full'];
              $assetIdIcon = $charaMaster['asset_id_icon'];
              break;
            }
          }
          $charaResult = array('id' => (int)$id, 'name' => (string)$name, 'asset_id_full' => (int)$assetIdFull, 'asset_id_icon' => $assetIdIcon);
          array_push($charaDatas,$charaResult);
        }
        $backGroundDatas = array();
        $backGroundMasterDatas = getCommBackGroundIds($conn); //背景データ取得
        foreach ($resultCommXml->backGrounds->backGround as $backGround) {
          $id = ($backGround->id);
          $backGroundName = "";
          $assetId = 0;
          foreach ($backGroundMasterDatas as $backGroundMaster) { //指定したキャラクター情データを検索
            if($backGroundMaster['id'] == $id){
              $backGroundName = $backGroundMaster['back_ground_name'];
              $assetId = $backGroundMaster['asset_id'];
              break;
            }
          }
          $backGroundResult = array('id' => (int)$id, 'back_ground_name' => (string)$backGroundName, 'asset_id' => (int)$assetId);
          array_push($backGroundDatas,$backGroundResult);
        }
        $sceneDatas = array();
        foreach ($resultCommXml->scenes->scene as $scene) { //シーンデータ
          $charaRId = $scene->charaRId;
          $charaLId = $scene->charaLId;
          $speakCharaId = $scene->speakCharaId;
          $comment = $scene->comment;
          $backGroundId = $scene->backGroundId;
          $sceneResult = array('charaRId' => (int)$charaRId, 'charaLId' => (int)$charaLId,
          'speakChara' => (int)$speakCharaId, 'backGroundId' => (int)$backGroundId, 'comment' => (string)$comment);
          array_push($sceneDatas,$sceneResult);
        }
        $resultCommData['charaDatas'] = $charaDatas;
        $resultCommData['backGroundDatas'] = $backGroundDatas;
        $resultCommData['sceneDatas'] = $sceneDatas;
        $result = $resultCommData;
      }
    }
  }
  return $result;
}

function checkPlayerOpenMainStoryCommData($conn,$playerIndexId,$commId,$mainStoryId,$playerEventCount){ //解放済みのメインストーリーのcommデータかチェックを行う 返り値 bool
  $result = false;
  $eventCategoryId = 1; //カテゴリーは会話を選択
  $playerEventCountData = getPlayerEventCount($conn,$playerIndexId,$mainStoryId);
  if($playerEventCount != false && $playerEventCountData['event_count'] == $playerEventCount){
    $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=? AND event_category_id=? AND event_target_id=? AND event_count=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($mainStoryId,$eventCategoryId,$commId,$playerEventCount));
    $searchMainStoryEventMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($searchMainStoryEventMasterData != false){
      $mainStoryMasterData = getMainStoryMasterData($conn,$mainStoryId);
      if($mainStoryMasterData != false){
        $checkOpenMainStory = checkPlayerOpenStory($conn,$playerIndexId,$mainStoryId);
        if($checkOpenMainStory != false){
           $result = true;
        }
      }
    }
  }
  return $result;
}

function getCommCharacterDatas($conn){ //キャラクターデータを全て取得する。
  $getCharacterDatas = array();
  $sql = "SELECT * FROM comm_character_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getCharacterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getCharacterDatas;
}

function getCommBackGroundIds($conn){ //背景IDデータを全て取得
  $getBackGroundDatas = array();
  $sql = "SELECT * FROM story_back_ground_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getBackGroundDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getBackGroundDatas;
}

function commClear($conn,$playerIndexId,$mainStoryId,$playerEventMasterData){ //会話シーンをクリアした時に呼び出す関数
  $result = false;
  $addCount = 1;
  $eventCategoryId = 1; //会話の関数のため、会話を指定。
  $checkFlag = false; //解放チェック
  try{
    $conn->beginTransaction(); //トランザクション開始

    $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=? AND event_count=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($mainStoryId,$playerEventMasterData['event_count']));
    $getEventMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($getEventMasterData != false){
      if($getEventMasterData['event_category_id'] == $eventCategoryId){

        $sql = "SELECT event_count FROM player_event_count WHERE player_index_id=? AND story_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$mainStoryId));
        $checkPlayerEventCount = $stmt->fetch(PDO::FETCH_ASSOC);

        if($checkPlayerEventCount['event_count'] == $getEventMasterData['event_count']){ //プレイヤーのイベントデータが正常か
          $checkFlag = true;
        }
      }
    }
    if($checkFlag == true){ //解放チェックが正常な場合

      $sql = "SELECT * FROM main_story_event_master WHERE main_story_master_id=?"; //最後のイベントではないかチェック
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($mainStoryId));
      $getEventMasterData = $stmt->fetchAll(PDO::FETCH_ASSOC);
      if((int)$checkPlayerEventCount['event_count'] < count($getEventMasterData)){
        $sql = "SELECT event_count FROM player_event_count WHERE player_index_id=? AND story_master_id=? FOR UPDATE";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$mainStoryId));

        $sql = "UPDATE player_event_count SET event_count = event_count + ? WHERE player_index_id=? AND story_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($addCount,$playerIndexId,$mainStoryId));

        $sql = "SELECT * FROM player_event_count WHERE player_index_id=? AND story_master_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($playerIndexId,$mainStoryId));
        $result = $stmt->fetch(PDO::FETCH_ASSOC);
      }
      else{
        $result = true; //ストーリーコンプリート
        storyClear($conn,$mainStoryId,$playerIndexId);
        //報酬及び、解除設定はここで行う
      }
    }
    $conn->commit(); //トランザクション終了
  }
  catch(Exception $e){
    $conn->rollBack();
    var_dump($e);
    $result = false;
  }
  return $result;
}
?>
