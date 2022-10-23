<?php

function getAssetDatas($conn,$tag = ""){//ロードするアセットのパスを配列を返す tag カンマ区切りでタグを指定
  $selectAssets = array();
  $result = array();
  $result['assets'] = array();
  $result['load_asset_datas'] = array();
  if($tag == ""){ //タグが指定されていない場合
    $sql = "SELECT * FROM asset_ids WHERE tag=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($tag));
  }
  else{ //タグが指定されていた場合
    $tags = explode(",",$tag);
    $tags = array_unique($tags);
    $tags = array_values($tags);
    $selectTags = substr(str_repeat(',?', count($tags)), 1);
    $sql = "SELECT * FROM asset_ids WHERE tag IN ({$selectTags})";
    $stmt = $conn->prepare($sql);
    $stmt->execute($tags);
  }
  $selectAssets = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if(count($selectAssets) != 0){
    foreach ($selectAssets as $asset) {
      $keyName = "ASSET_".$asset['id'];
      $resultPath = "../assets/".$asset['image_path'];
      $result['assets'][$keyName] = $resultPath;
      array_push($result['load_asset_datas'],$asset); //読み込みしたアセットを追加
    }
  }
  return $result;
}

function getEquipItemIconAssetTag($conn){ //装備品のアイコン画像タグを取得する
  $tag = "";

  $sql = "SELECT * FROM weapon_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $weaponCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $sql = "SELECT * FROM armor_category_id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $armorCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

  //↓は廃止予定
  foreach ($weaponCategoryData as $weapon) {
    for ($i=1; $i < 9; $i++) {
      $tag = $tag."icon_weapon_category_".$weapon['id']."_rarity_".$i.",";
    }
  }
  foreach ($armorCategoryData as $armor) {
    for ($i=1; $i < 9; $i++) {
      $tag = $tag."icon_armor_category_".$armor['id']."_rarity_".$i.",";
    }
  }

  //↑は廃止予定
  $sql = "SELECT * FROM attribute_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $attributeCategoryIds = $stmt->fetchAll(PDO::FETCH_ASSOC);

  foreach ($weaponCategoryData as $weapon) {
    foreach ($attributeCategoryIds as $attribute) {
      $tag = $tag."icon_weapon_category_".$weapon['id']."_attribute_".$attribute['id'].",";
    }
  }
  foreach ($armorCategoryData as $armor) {
    foreach ($attributeCategoryIds as $attribute) {
      $tag = $tag."icon_armor_category_".$armor['id']."_attribute_".$attribute['id'].",";
    }
  }

  return $tag;
}

function getItemIconAssetTag($conn){ //アイテムのアイコン画像タグを取得する
  $tag = "";
  $sql = "SELECT * FROM attribute_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $attributeCategoryIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($attributeCategoryIds as $attribute) {
    $tag = $tag."item_icon_".$attribute['id'].",";
  }
  return $tag;
}

function getCardIconAssetTag($conn){ //アイテムアイコンフレーム画像のタグを取得する
  $tag = "";
  $sql = "SELECT * FROM attribute_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $attributeCategoryIds = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($attributeCategoryIds as $attribute) {
    $tag = $tag."icon_card_attribute_".$attribute['id'].",";
  }
  return $tag;
}

function getItemIconFrameAssetTag($conn){ //アイテムアイコンフレーム画像のタグを取得する
  $tag = "";
  $sql = "SELECT * FROM rank_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $rankMasterDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($rankMasterDatas as $rankMaster) {
    $tag = $tag."icon_frame_rank_".$rankMaster['rank'].",";
  }
  return $tag;
}

function getAssetDatasSearchAssetCategoryId($conn,$assetCategoryId){ //アセットのカテゴリーIDから該当するアセットデータを取得
  $sql = "SELECT * FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

//ゲームの開始時に必要なアセットタグを取得

function getInitLoadAssetTags($conn){
  $tag1 = getEquipItemIconAssetTag($conn); //装備品アイコンのタグを取得
  $tag2 = getItemIconFrameAssetTag($conn);
  $tag3 = getCardIconAssetTag($conn);
  $tag4 = getItemIconAssetTag($conn);
  $tags = $tag1.$tag2.$tag3.$tag4."card_effect_1,".
  "card_bg_1,card_bg_2,".
  "card_bg_3,card_bg_4,".
  "card_bg_5,card_frame_1,".
  "card_frame_2,card_frame_3,".
  // "card_character_1,".
  // "card_character_2,".
  // "card_character_3,".
  // "card_character_4,".
  // "card_character_5,".
  // "card_character_6,".
  // "card_character_7,".
  "monument_font_0,".
  "monument_font_1,".
  "monument_font_2,".
  "monument_font_3,".
  "monument_font_4,".
  "monument_font_5,".
  "card_icon_rank_1,".
  "card_icon_rank_2,".
  "card_icon_rank_3,".
  "card_icon_rank_4,".
  "card_icon_rank_5,".
  "card_icon_rank_6,".
  "card_icon_rank_7,".
  "card_icon_rank_8,".
  "aa_accessary_one_equip_left_0,".
  "aa_accessary_one_equip_right_0,".
  "aa_accessary_one_use_left_0,".
  "aa_accessary_one_use_right_0,".
  "aa_accessary_one_walk_front_0,".
  "aa_accessary_one_walk_back_0,".
  "aa_accessary_one_walk_left_0,".
  "aa_accessary_one_walk_right_0,".
  "aa_accessary_two_equip_left_0,".
  "aa_accessary_two_equip_right_0,".
  "aa_accessary_two_use_left_0,".
  "aa_accessary_two_use_right_0,".
  "aa_accessary_two_walk_front_0,".
  "aa_accessary_two_walk_back_0,".
  "aa_accessary_two_walk_left_0,".
  "aa_accessary_two_walk_right_0,".
  "aa_body_equip_left_0,".
  "aa_body_equip_right_0,".
  "aa_body_use_left_0,".
  "aa_body_use_right_0,".
  "aa_body_walk_front_0,".
  "aa_body_walk_back_0,".
  "aa_body_walk_left_0,".
  "aa_body_walk_right_0,".
  "aa_body_base_equip_left_0,".
  "aa_body_base_equip_right_0,".
  "aa_body_base_use_left_0,".
  "aa_body_base_use_right_0,".
  "aa_body_base_walk_front_0,".
  "aa_body_base_walk_back_0,".
  "aa_body_base_walk_left_0,".
  "aa_body_base_walk_right_0,".
  "aa_boots_equip_left_0,".
  "aa_boots_equip_right_0,".
  "aa_boots_use_left_0,".
  "aa_boots_use_right_0,".
  "aa_boots_walk_front_0,".
  "aa_boots_walk_back_0,".
  "aa_boots_walk_left_0,".
  "aa_boots_walk_right_0,".
  "aa_face_equip_left_0,".
  "aa_face_equip_right_0,".
  "aa_face_use_left_0,".
  "aa_face_use_right_0,".
  "aa_face_walk_front_0,".
  "aa_face_walk_back_0,".
  "aa_face_walk_left_0,".
  "aa_face_walk_right_0,".
  "aa_hair_equip_left_0,".
  "aa_hair_equip_right_0,".
  "aa_hair_use_left_0,".
  "aa_hair_use_right_0,".
  "aa_hair_walk_front_0,".
  "aa_hair_walk_back_0,".
  "aa_hair_walk_left_0,".
  "aa_hair_walk_right_0,".
  "aa_hand_equip_left_0,".
  "aa_hand_equip_right_0,".
  "aa_hand_use_left_0,".
  "aa_hand_use_right_0,".
  "aa_hand_walk_front_0,".
  "aa_hand_walk_back_0,".
  "aa_hand_walk_left_0,".
  "aa_hand_walk_right_0,".
  "aa_head_equip_left_0,".
  "aa_head_equip_right_0,".
  "aa_head_use_left_0,".
  "aa_head_use_right_0,".
  "aa_head_walk_front_0,".
  "aa_head_walk_back_0,".
  "aa_head_walk_left_0,".
  "aa_head_walk_right_0,".
  "aa_head_base_equip_left_0,".
  "aa_head_base_equip_right_0,".
  "aa_head_base_use_left_0,".
  "aa_head_base_use_right_0,".
  "aa_head_base_walk_front_0,".
  "aa_head_base_walk_back_0,".
  "aa_head_base_walk_left_0,".
  "aa_head_base_walk_right_0,".
  "aa_pants_equip_left_0,".
  "aa_pants_equip_right_0,".
  "aa_pants_use_left_0,".
  "aa_pants_use_right_0,".
  "aa_pants_walk_front_0,".
  "aa_pants_walk_back_0,".
  "aa_pants_walk_left_0,".
  "aa_pants_walk_right_0,".
  "aa_weapon_one_equip_left_0,".
  "aa_weapon_one_equip_right_0,".
  "aa_weapon_one_use_left_0,".
  "aa_weapon_one_use_right_0,".
  "aa_weapon_one_walk_front_0,".
  "aa_weapon_one_walk_back_0,".
  "aa_weapon_one_walk_left_0,".
  "aa_weapon_one_walk_right_0,".
  "aa_weapon_two_equip_left_0,".
  "aa_weapon_two_equip_right_0,".
  "aa_weapon_two_use_left_0,".
  "aa_weapon_two_use_right_0,".
  "aa_weapon_two_walk_front_0,".
  "aa_weapon_two_walk_back_0,".
  "aa_weapon_two_walk_left_0,".
  "aa_weapon_two_walk_right_0,";
  return $tags;
}






























 ?>
