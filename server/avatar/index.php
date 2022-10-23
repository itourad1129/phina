<?php
include_once '../../module/equipItem/index.php';

function getAvatarMasterData($conn,$avatarMasterId){ //アバターのマスターデータを取得
  $sql = "SELECT * FROM avatar_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($avatarMasterId));
  $selectAvatarMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectAvatarMasterData;
}

function getAvatarAnimMasterData($conn,$avatarMasterId){ //あばたーアニメーションデータを取得
  $sql = "SELECT * FROM avatar_anim_master WHERE avatar_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($avatarMasterId));
  $selectAvatarAnimMasterData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectAvatarAnimMasterData;
}

function getPlayerAvatar($conn,$playerIndexId){ //プレイヤーが所持しているアバターを取得 廃止予定
  $sql = "SELECT * FROM player_avatar LEFT JOIN avatar_master ON player_avatar.avatar_master_id = avatar_master.id WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerAvatarData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($getPlayerAvatarData == false ) $getPlayerAvatarData = array();
  return $getPlayerAvatarData;
}

function getPlayerAvatarData($conn,$playerIndexId){ //プレイヤーが装備しているアバターを取得
  $sql = "SELECT * FROM player_avatar WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerAvatarData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $getPlayerAvatarData;
}

function getPlayerAvatarItems($conn,$playerIndexId){ //プレイヤー所持しているアバターを取得
  $sql = "SELECT * FROM player_avatar_item LEFT JOIN avatar_master ON player_avatar_item.avatar_u_id = avatar_master.u_id WHERE player_avatar_item.player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $getPlayerAvatarItems = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getPlayerAvatarItems;
}

function selectPlayerAvatarItem($conn,$playerIndexId,$avatarUid){ //プレイヤーの所持しているアバターを選択
  $sql = "SELECT * FROM player_avatar_item LEFT JOIN avatar_master ON player_avatar_item.avatar_u_id = avatar_master.u_id WHERE player_avatar_item.player_index_id=? AND player_avatar_item.avatar_u_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$avatarUid));
  $selectPlayerAvatarItem = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectPlayerAvatarItem;
}

function checkPlayerAvatar($conn,$playerIndexId,$avatarMasterId){ //プレイヤーが既に所持しているアバターかチェックを行う
  $result = false;
  $sql = "SELECT * FROM player_avatar WHERE player_index_id=? AND avatar_master_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$avatarMasterId));
  $checkPlayerNewAvatar = $stmt->fetch(PDO::FETCH_ASSOC);
  if($checkPlayerNewAvatar != false) $result = true;
  return $result;
}

function checkPlayerAvatarWeapon($conn,$playerIndexId,$avatarMasterId){ //装備するアバターが装備可能か武器チェックを行う
  $result = false;
  $getAvatarMasterData = getAvatarMasterData($conn,$avatarMasterId);
  if($getAvatarMasterData != false){
    $getPlayerEquipItem = getPlayerEquipItemAndMasterData($conn,$playerIndexId);
    $mainWeaponCheck = false;
    $subWeaponCheck = false;
    if($getAvatarMasterData['avatar_weapon_category_id'] == 0) $mainWeaponCheck = true;
    if($getAvatarMasterData['avatar_sub_weapon_category_id'] == 0) $subWeaponCheck = true;
    foreach ($getPlayerEquipItem as $plEquipItem) {
      if($getAvatarMasterData['avatar_weapon_category_id'] == $plEquipItem['weapon_category_id']) $mainWeaponCheck = true;
      if($getAvatarMasterData['avatar_sub_weapon_category_id'] == $plEquipItem['sub_weapon_category_id']) $subWeaponCheck = true;
    }
    if($mainWeaponCheck == true && $subWeaponCheck == true){ //装備可能なアバターだった
      $result = true;
    }
  }
  return $result;
}

function checkPlayerAvatarSex($conn,$playerSex,$avatarMasterId){ //装備可能なアバターか性別チェックをを行う
  $result = false;
  $getAvatarMasterData = getAvatarMasterData($conn,$avatarMasterId);
  if($getAvatarMasterData != false){
    if($getAvatarMasterData['avatar_sex'] == 0 || $playerSex == $getAvatarMasterData['avatar_sex']){
      $result = true;
    }
  }
  return $result;
}

function insertPlayerAvatar($conn,$playerIndexId,$avatarMasterId){ //所持していないあばたーだった場合プレイヤーのアバターに追加する。
  $checkNewAvatar = checkPlayerAvatar($conn,$playerIndexId,$avatarMasterId);
  if($checkNewAvatar == false){ //未所持だった場合
    $stmt = $conn -> prepare("INSERT INTO player_avatar (player_index_id, avatar_master_id)
    VALUES (:player_index_id, :avatar_master_id)");
    $stmt->bindParam(':player_index_id', $playerIndexId, PDO::PARAM_INT);
    $stmt->bindParam(':avatar_master_id', $avatarMasterId, PDO::PARAM_INT);
    $stmt->execute();
  }
}

function changePlayerAvatar($conn,$playerIndexId,$avatarUid){ //プレイヤーのアバターを変更する。
  $result = array();
  $result['error'] = 0;
  $result['error_comment'] = "";
  try{
    $conn->beginTransaction(); //トランザクション開始
    $selectPlayerAvatarItem = selectPlayerAvatarItem($conn,$playerIndexId,$avatarUid);
    if($selectPlayerAvatarItem == false){
            throw new Exception("アバターアイテムの取得に失敗しました。");
    }
    else{
      $setColumn = "";
      switch ((int)$selectPlayerAvatarItem['avatar_category_id']) {
        case 100:
        $setColumn = "body_base_avatar_id";
        break;
        case 101:
        $setColumn = "head_base_avatar_id";
        break;
        case 102:
        $setColumn = "face_avatar_id";
        break;
        case 103:
        $setColumn = "hair_avatar_id";
        break;
        default:
        break;
      }
      if($setColumn == "" || $selectPlayerAvatarItem['num'] <= 0){
        throw new Exception("プレイヤーアバターの更新に失敗しました。");
      }
      else{
        //アバター入れ替え
        $sql = "UPDATE player_avatar SET {$setColumn}=? WHERE player_index_id=?";
        $stmt = $conn->prepare($sql);
        $stmt->execute(array($selectPlayerAvatarItem['avatar_asset_id'],$playerIndexId));
      }
    }
    $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
      $result['error_comment'] = $e->getMessage();
      $result['error'] = 1;
    }
  return $result;
}

function getEquipItemAssetTag($equipCategoryId,$avatarId){ //装備カテゴリーとアバターIDからアセットタグを取得
  $result = "";

  $equipAsset = array();
  $equipAsset[0] = array('equip_category_id' => '8', 'tag_name' => 'accessary_one');//装飾品1
  $equipAsset[1] = array('equip_category_id' => '100', 'tag_name' => 'body_base');//アバター:体
  $equipAsset[2] = array('equip_category_id' => '1', 'tag_name' => 'weapon_one');//武器1
  $equipAsset[3] = array('equip_category_id' => '6', 'tag_name' => 'pants');//腰
  $equipAsset[4] = array('equip_category_id' => '4', 'tag_name' => 'body');//胸
  $equipAsset[5] = array('equip_category_id' => '101', 'tag_name' => 'head_base');//アバター:頭
  $equipAsset[6] = array('equip_category_id' => '102', 'tag_name' => 'face');//アバター:顔
  $equipAsset[7] = array('equip_category_id' => '103', 'tag_name' => 'hair');//アバター:髪
  $equipAsset[8] = array('equip_category_id' => '3', 'tag_name' => 'head');//頭
  $equipAsset[9] = array('equip_category_id' => '7', 'tag_name' => 'boots');//足
  $equipAsset[10] = array('equip_category_id' => '5', 'tag_name' => 'hand');//手
  $equipAsset[11] = array('equip_category_id' => '9', 'tag_name' => 'accessary_two');//装飾品2
  $equipAsset[12] = array('equip_category_id' => '2', 'tag_name' => 'weapon_two');//武器2

  foreach ($equipAsset as $equipData) {
    if($equipData['equip_category_id'] == $equipCategoryId){ //装備カテゴリーが一致
      //use left
      $result = "aa_".$equipData['tag_name']."_use_left_".$avatarId;
      //use right
      $result = $result.",aa_".$equipData['tag_name']."_use_right_".$avatarId;
      //equip left
      $result = $result.",aa_".$equipData['tag_name']."_equip_left_".$avatarId;
      //equip right
      $result = $result.",aa_".$equipData['tag_name']."_equip_right_".$avatarId;
      //walk front
      $result = $result.",aa_".$equipData['tag_name']."_walk_front_".$avatarId;
      //walk back
      $result = $result.",aa_".$equipData['tag_name']."_walk_back_".$avatarId;
      //walk left
      $result = $result.",aa_".$equipData['tag_name']."_walk_left_".$avatarId;
      //walk right
      $result = $result.",aa_".$equipData['tag_name']."_walk_right_".$avatarId;
      break;
    }
  }

  return $result;
}

function getPlayerAvatarAssetTag($playerAvatarData){ //プレイヤーアバターデータから、アセットタグを生成
  $result = "";
  if(isset($playerAvatarData['face_avatar_id']) && isset($playerAvatarData['body_base_avatar_id']) && isset($playerAvatarData['head_base_avatar_id']) && isset($playerAvatarData['hair_avatar_id'])){
    //use left
    $result = "aa_body_base_use_left_".$playerAvatarData['body_base_avatar_id'];
    //use right
    $result = $result.",aa_body_base_use_right_".$playerAvatarData['body_base_avatar_id'];
    //equip left
    $result = $result.",aa_body_base_equip_left_".$playerAvatarData['body_base_avatar_id'];
    //equip right
    $result = $result.",aa_body_base_equip_right_".$playerAvatarData['body_base_avatar_id'];
    //walk front
    $result = $result.",aa_body_base_walk_front_".$playerAvatarData['body_base_avatar_id'];
    //walk back
    $result = $result.",aa_body_base_walk_back_".$playerAvatarData['body_base_avatar_id'];
    //walk left
    $result = $result.",aa_body_base_walk_left_".$playerAvatarData['body_base_avatar_id'];
    //walk right
    $result = $result.",aa_body_base_walk_right_".$playerAvatarData['body_base_avatar_id'];

    //use left
    $result = $result.",aa_head_base_use_left_".$playerAvatarData['head_base_avatar_id'];
    //use right
    $result = $result.",aa_head_base_use_right_".$playerAvatarData['head_base_avatar_id'];
    //equip left
    $result = $result.",aa_head_base_equip_left_".$playerAvatarData['head_base_avatar_id'];
    //equip right
    $result = $result.",aa_head_base_equip_right_".$playerAvatarData['head_base_avatar_id'];
    //walk front
    $result = $result.",aa_head_base_walk_front_".$playerAvatarData['head_base_avatar_id'];
    //walk back
    $result = $result.",aa_head_base_walk_back_".$playerAvatarData['head_base_avatar_id'];
    //walk left
    $result = $result.",aa_head_base_walk_left_".$playerAvatarData['head_base_avatar_id'];
    //walk right
    $result = $result.",aa_head_base_walk_right_".$playerAvatarData['head_base_avatar_id'];


    //use left
    $result = $result.",aa_face_use_left_".$playerAvatarData['face_avatar_id'];
    //use right
    $result = $result.",aa_face_use_right_".$playerAvatarData['face_avatar_id'];
    //equip left
    $result = $result.",aa_face_equip_left_".$playerAvatarData['face_avatar_id'];
    //equip right
    $result = $result.",aa_face_equip_right_".$playerAvatarData['face_avatar_id'];
    //walk front
    $result = $result.",aa_face_walk_front_".$playerAvatarData['face_avatar_id'];
    //walk back
    $result = $result.",aa_face_walk_back_".$playerAvatarData['face_avatar_id'];
    //walk left
    $result = $result.",aa_face_walk_left_".$playerAvatarData['face_avatar_id'];
    //walk right
    $result = $result.",aa_face_walk_right_".$playerAvatarData['face_avatar_id'];

    //use left
    $result = $result.",aa_hair_use_left_".$playerAvatarData['hair_avatar_id'];
    //use right
    $result = $result.",aa_hair_use_right_".$playerAvatarData['hair_avatar_id'];
    //equip left
    $result = $result.",aa_hair_equip_left_".$playerAvatarData['hair_avatar_id'];
    //equip right
    $result = $result.",aa_hair_equip_right_".$playerAvatarData['hair_avatar_id'];
    //walk front
    $result = $result.",aa_hair_walk_front_".$playerAvatarData['hair_avatar_id'];
    //walk back
    $result = $result.",aa_hair_walk_back_".$playerAvatarData['hair_avatar_id'];
    //walk left
    $result = $result.",aa_hair_walk_left_".$playerAvatarData['hair_avatar_id'];
    //walk right
    $result = $result.",aa_hair_walk_right_".$playerAvatarData['hair_avatar_id'];

  }
  return $result;
}
