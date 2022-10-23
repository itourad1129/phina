<?php
//バッチ実行用及びテスト用スクリプト
echo date("Y/m/d H:i:s");
// $start_datetime = new DateTime('today'); //today曜日 0時.
// $result = $start_datetime->modify("-1 week")->modify("next Monday");
// //var_dump($result);
//
// function beginningOfWeek($dateTime='2000-01-01 00:00:00', $sunday=false)
// {
// 		$plus = (!$sunday) ? 1 : 0;
//
// 		$dateTime = is_string($dateTime) ? new DateTime($dateTime) : $dateTime;
// 		$w = $dateTime->format('w') - $plus; //現在が日曜=0,月曜=1...土曜=6 - plus .
// 		($w < 0) and $w = $w + 7;
// 		return $dateTime->sub(new DateInterval('P'.$w.'D'));
// }

//var_dump(beginningOfWeek());

function createDayOfMonth($day=0, $month=0)
{
		$dayString = ($day==0) ? 'first' : (($day > 0) ? 'next' : 'last');
		$monthString = ($month==0) ? 'this' : (($month > 0) ? 'next' : 'last');

		return new DateTime("$dayString day of $monthString months");
}

//var_dump(createDayOfMonth());

function batchInsertDeckNumStage($conn){ //デッキ組み込み最大枚数のマスターデータ作成
  $unlockFlag = false;
  for($i = 1; $i < 501; $i++){
    $resultDeckNum = 5;
    if(100 <= $i) $resultDeckNum = 6;
    if(200 <= $i) $resultDeckNum = 7;
    if(300 <= $i) $resultDeckNum = 8;
    if(400 <= $i) $resultDeckNum = 9;
    if(500 <= $i) $resultDeckNum = 10;
    $stmt = $conn -> prepare("INSERT INTO deck_num_stage (level, deck_num)
    VALUES (:level, :deck_num)");
    $stmt->bindParam(':level', $i, PDO::PARAM_INT);
    $stmt->bindParam(':deck_num', $resultDeckNum, PDO::PARAM_INT);
    $stmt->execute();
  }
}
//batchInsertDeckNumStage($pdo);
function batchInsertCardEffectAssetDatas($conn,$effectId,$maxFrameIndex){ //カードエフェクトのアセットデータを挿入
  $assetCategoryId = 9; //カードのカテゴリーを指定
  for($i = 0; $i < $maxFrameIndex; $i++){
    $comment = "エフェクトフレーム".$effectId.":フレーム".$i;
    $imagePath = "card/effect/effect_".$effectId."/effect_".$effectId."_".$i.".png";
    $stmt = $conn -> prepare("INSERT INTO asset_ids (image_path, comment, asset_category_id)
    VALUES (:image_path, :comment, :asset_category_id)");
    $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
    $stmt->execute();
  }
}

//batchInsertDeckNumStage($pdo);
function batchInsertMountIconAnimAssetDatas($conn,$mountId,$maxFrameIndex){ //マウントアイコンアニメのアセットデータを挿入
  $assetCategoryId = 9; //カードのカテゴリーを指定
  $tagName = "mount_icon_anim_".$mountId;
  for($i = 0; $i < $maxFrameIndex; $i++){
    $comment = "マウントアイコンアニメフレーム".$mountId.":フレーム".$i;
    $imagePath = "mount/mount_icon_anim/mount_id_".$mountId."/".$i.".png";
    $stmt = $conn -> prepare("INSERT INTO asset_ids (image_path, comment, asset_category_id, tag)
    VALUES (:image_path, :comment, :asset_category_id, :tag)");
    $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
    $stmt->bindParam(':tag', $tagName, PDO::PARAM_STR);
    $stmt->execute();
  }
}
//batchInsertMountIconAnimAssetDatas($pdo,1,36);
function batchInsertFrameAnimAssetDatas($conn,$assetCategoryId,$assetPath,$tagNameText,$id,$commentText,$maxFrameIndex,$startInsertId = -1){ //フレームアニメのアセットデータを挿入
  $tagName = $tagNameText."_".$id;
  for($i = 0; $i < $maxFrameIndex; $i++){
    $comment = $commentText."_".$id.":フレーム".$i;
    $imagePath = $assetPath.$id."/".$i.".png";
    if($startInsertId != -1){
      $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
      VALUES (:id, :image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':id', $startInsertId, PDO::PARAM_INT);
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
      $stmt->bindParam(':tag', $tagName, PDO::PARAM_STR);
      $stmt->execute();
      $startInsertId = $startInsertId + 1;
    }
    else{
      $stmt = $conn -> prepare("INSERT INTO asset_ids (image_path, comment, asset_category_id, tag)
      VALUES (:image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
      $stmt->bindParam(':tag', $tagName, PDO::PARAM_STR);
      $stmt->execute();
    }
  }
}
//STGマウント(実機アニメーション)
//batchInsertFrameAnimAssetDatas($pdo,17,"mount/mount_stg/mount_id_","mount_stg_anim",1,"マウントSTGアニメフレーム",2);
//STGマウント(敵機アニメーション)
//batchInsertFrameAnimAssetDatas($pdo,18,"stg/stg_enemy/stg_enemy_id_","mount_stg_enemy_anim",2,"マウントSTG敵アニメフレーム",1);
//STGエフェクトアニメーション
//batchInsertFrameAnimAssetDatas($pdo,21,"stg/stg_effect/stg_effect_id_","stg_effect_anim",1,"STGエフェクトアニメフレーム",11);
//STG:UIアニメーション
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",1,"STG:UI画像アニメフレーム",91);
//STG:UIアニメーションA
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",2,"STG:UI画像アニメフレーム_ランクA",27);
//STG:UIアニメーションS
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",3,"STG:UI画像アニメフレーム_ランクS",26);
//STG:UIアニメーションB
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",4,"STG:UI画像アニメフレーム_ランクB",19);
//STG:UIアニメーションC
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",5,"STG:UI画像アニメフレーム_ランクC",1);
//STG:UIアニメーションD
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",6,"STG:UI画像アニメフレーム_ランクD",1);
//STG:UIアニメーション 7 ゲームオーバー
//batchInsertFrameAnimAssetDatas($pdo,23,"stg/stg_ui/anim/stg_ui_anim_","stg_ui_anim",7,"STG:UI画像アニメフレーム_GameOver",92);
//
//batchInsertFrameAnimAssetDatas($pdo,1,"card/select_effect/select_card_","select_card",1,"カード選択中アニメーション",26,821);
//batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",1,"戦闘エフェクト",23,847);
//$startIndex = 847 + 23;
//batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",2,"戦闘エフェクト",31,$startIndex);
//$startIndex = $startIndex + 31;
//batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",3,"戦闘エフェクト",11,$startIndex);
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",4,"戦闘エフェクト",37,912);
// $startIndex = 912 + 37;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",5,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",6,"戦闘エフェクト",11,$startIndex);
// $startIndex = $startIndex + 11;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",7,"戦闘エフェクト",11,$startIndex);
// $startIndex = $startIndex + 11;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",8,"戦闘エフェクト",21,$startIndex);
// $startIndex = $startIndex + 21;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",9,"戦闘エフェクト",21,$startIndex);
// $startIndex = $startIndex + 21;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",10,"戦闘エフェクト",22,$startIndex);
// $startIndex = $startIndex + 22;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",11,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",12,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",13,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",14,"戦闘エフェクト",51,$startIndex);
// $startIndex = $startIndex + 51;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",15,"戦闘エフェクト",63,$startIndex);
// $startIndex = $startIndex + 63;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",16,"戦闘エフェクト",76,$startIndex);
// $startIndex = $startIndex + 76;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",17,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",18,"戦闘エフェクト",8,$startIndex);
// $startIndex = $startIndex + 8;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",19,"戦闘エフェクト",36,$startIndex);
// $startIndex = $startIndex + 36;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",20,"戦闘エフェクト",47,$startIndex);
// $startIndex = $startIndex + 47;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",21,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",22,"戦闘エフェクト",26,$startIndex);
// $startIndex = $startIndex + 26;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",23,"戦闘エフェクト",21,$startIndex);
// $startIndex = $startIndex + 21;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",24,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",25,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",26,"戦闘エフェクト",12,$startIndex);
// $startIndex = $startIndex + 12;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",27,"戦闘エフェクト",22,$startIndex);
// $startIndex = $startIndex + 22;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",28,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",29,"戦闘エフェクト",26,$startIndex);
// $startIndex = $startIndex + 26;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",30,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",31,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",32,"戦闘エフェクト",21,$startIndex);
// $startIndex = $startIndex + 21;
// batchInsertFrameAnimAssetDatas($pdo,11,"card/battleEffect/battle_effect_","battle_effect",33,"戦闘エフェクト",31,$startIndex);
// $startIndex = $startIndex + 31;




function batchInsertEquipIconAsset($conn){ //廃止予定
  $sql = "SELECT * FROM weapon_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $weaponCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($weaponCategoryData as $weapon) {
    for ($i=1; $i < 9; $i++) {
      $imagePath = "ui/icon/weaponIcon/weapon_category_".$weapon['id']."_rarity_".$i.".png";
      $comment = "武器カテゴリー:".$weapon['id']."ランク:".$i."アイコン";
      $assetCategoryId = 1;
      $tag = "icon_weapon_category_".$weapon['id']."_rarity_".$i;
      $stmt = $conn -> prepare("INSERT INTO asset_ids (image_path, comment, asset_category_id, tag)
      VALUES (:image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
      $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
      $stmt->execute();
    }
  }
  $sql = "SELECT * FROM armor_category_id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $armorCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($armorCategoryData as $armor) {
    for ($i=1; $i < 9; $i++) {
      $imagePath = "ui/icon/armorIcon/armor_category_".$armor['id']."_rarity_".$i.".png";
      $comment = "防具カテゴリー:".$armor['id']."ランク:".$i."アイコン";
      $assetCategoryId = 1;
      $tag = "icon_armor_category_".$armor['id']."_rarity_".$i;
      $stmt = $conn -> prepare("INSERT INTO asset_ids (image_path, comment, asset_category_id, tag)
      VALUES (:image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
      $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
      $stmt->execute();
    }
  }
}
//batchInsertEquipIconAsset($pdo);

function batchInsertEquipIcon($conn,$startIndex){ //装備アイコンデータ挿入

  $assetCategoryId = 27;

  $sql = "SELECT * FROM attribute_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $attributeIds = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $sql = "SELECT * FROM weapon_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $weaponCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);

  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));

  foreach ($weaponCategoryData as $weapon) {
    foreach ($attributeIds as $attributeId) {
      $imagePath = "ui/icon/weapon_icon/".$weapon['id']."/".$attributeId['id'].".png";
      $comment = "武器カテゴリー:".$weapon['id']."属性:(".$attributeId['attribute_name'].")アイコン";
      $tag = "icon_weapon_category_".$weapon['id']."_attribute_".$attributeId['id'];
      $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
      VALUES (:id, :image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':id', $startIndex, PDO::PARAM_INT);
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_STR);
      $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
      $stmt->execute();
      $startIndex = $startIndex + 1;
    }
  }
  $sql = "SELECT * FROM armor_category_id";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $armorCategoryData = $stmt->fetchAll(PDO::FETCH_ASSOC);
  foreach ($armorCategoryData as $armor) {
    foreach ($attributeIds as $attributeId) {
      $imagePath = "ui/icon/armor_icon/".$armor['id']."/".$attributeId['id'].".png";
      $comment = "防具カテゴリー:".$armor['id']."属性(:".$attributeId['attribute_name'].")アイコン";
      $tag = "icon_armor_category_".$armor['id']."_attribute_".$attributeId['id'];
      $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
      VALUES (:id, :image_path, :comment, :asset_category_id, :tag)");
      $stmt->bindParam(':id', $startIndex, PDO::PARAM_INT);
      $stmt->bindParam(':image_path', $imagePath, PDO::PARAM_STR);
      $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
      $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
      $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
      $stmt->execute();
      $startIndex = $startIndex + 1;
    }
  }
}

//batchInsertEquipIcon($pdo,855);

function batchInsertCardIcon($conn,$startIndex){ //カードアイコンデータ挿入
  $assetCategoryId = 28;
  $sql = "SELECT * FROM attribute_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $attributeIds = $stmt->fetchAll(PDO::FETCH_ASSOC);

  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));

  foreach ($attributeIds as $attributeId) {
    $path = "ui/icon/card_icon/".$attributeId['id'].".png";
    $comment = "カードアイコン:属性(".$attributeId['attribute_name'].")";
    $tag = "icon_card_attribute_".$attributeId['id'];
    $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
    VALUES (:id, :image_path, :comment, :asset_category_id, :tag)");
    $stmt->bindParam(':id', $startIndex, PDO::PARAM_INT);
    $stmt->bindParam(':image_path', $path, PDO::PARAM_STR);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
    $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
    $stmt->execute();
    $startIndex = $startIndex + 1;
  }
}
//batchInsertCardIcon($pdo,951);

function batchInsertItemIcon($conn,$startIndex){ //アイテムアイコンデータを挿入
  //アイテムアイコンは直接DBに挿入する
}


function renameAnimImageFiles($name,$path){ //Flushでパブリッシュした画像ファイル名を一括変更
  $searchFiles = array_filter(glob($path.'/*'),'is_file');
  for ($i=0; $i < count($searchFiles); $i++) {
    $oldName = $searchFiles[$i];
    $renameStr = ltrim($searchFiles[$i],$path);
    $renameStr = ltrim($renameStr,$name);
    $renameStr = ltrim($renameStr,'0');
    rename($oldName,$renameStr);
  }
}
//renameAnimImageFiles("stg_clear_","../../client/assets/stg/stg_ui/anim/stg_ui_anim_1/");
//renameAnimImageFiles("game_over_","../../client/assets/stg/stg_ui/anim/stg_ui_anim_7/");

//フォルダ内の全てのファイル名を数字だけ残す形に変更する //afterPathは main ディレクトリからスタート
function batchRenameFiles($path,$afterPath){
  $searchFiles = array_filter(glob($path.'/*'),'is_file');
  for ($i=0; $i < count($searchFiles); $i++) {
    $oldName = $searchFiles[$i];
    $renameStr = preg_replace('/[^0-9]/', '', $searchFiles[$i]);
    rename($oldName,$afterPath.$renameStr.".png");
  }
}
//batchRenameFiles("../../client/assets/card/select_effect/select_card_1/","../assets/card/select_effect/select_card_1/");
//batchRenameFiles("../../client/assets/battleEffect/1/","../assets/battleEffect/1/");
//batchRenameFiles("../../client/assets/battleEffect/2/","../assets/battleEffect/2/");
//batchRenameFiles("../../client/assets/battleEffect/crow/","../assets/battleEffect/crow/");
//batchRenameFiles("../../client/assets/battleEffect/ice_shot/","../assets/battleEffect/ice_shot/");
//batchRenameFiles("../../client/assets/battleEffect/burn/","../assets/battleEffect/burn/");
//batchRenameFiles("../../client/assets/battleEffect/arrow_level_one/","../assets/battleEffect/arrow_level_one/");
//batchRenameFiles("../../client/assets/battleEffect/arrow_level_two/","../assets/battleEffect/arrow_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/blood/","../assets/battleEffect/blood/");
// batchRenameFiles("../../client/assets/battleEffect/burn_two/","../assets/battleEffect/burn_two/");
// batchRenameFiles("../../client/assets/battleEffect/cut_level_one/","../assets/battleEffect/cut_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/cut_level_two/","../assets/battleEffect/cut_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/cut_level_three/","../assets/battleEffect/cut_level_three/");
// batchRenameFiles("../../client/assets/battleEffect/fire_ball/","../assets/battleEffect/fire_ball/");
// batchRenameFiles("../../client/assets/battleEffect/fire_pillar_level_one/","../assets/battleEffect/fire_pillar_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/fire_pillar_level_two/","../assets/battleEffect/fire_pillar_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/fire_pillar_level_three/","../assets/battleEffect/fire_pillar_level_three/");
// batchRenameFiles("../../client/assets/battleEffect/heal_level_one/","../assets/battleEffect/heal_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/heal_level_two/","../assets/battleEffect/heal_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/heal_level_three/","../assets/battleEffect/heal_level_three/");
// batchRenameFiles("../../client/assets/battleEffect/hit_thander/","../assets/battleEffect/hit_thander/");
// batchRenameFiles("../../client/assets/battleEffect/ice_break/","../assets/battleEffect/ice_break/");
// batchRenameFiles("../../client/assets/battleEffect/ice_needle_level_one/","../assets/battleEffect/ice_needle_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/ice_needle_level_two/","../assets/battleEffect/ice_needle_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/ice_needle_level_three/","../assets/battleEffect/ice_needle_level_three/");
// batchRenameFiles("../../client/assets/battleEffect/poison/","../assets/battleEffect/poison/");
// batchRenameFiles("../../client/assets/battleEffect/power_down/","../assets/battleEffect/power_down/");
// batchRenameFiles("../../client/assets/battleEffect/power_up/","../assets/battleEffect/power_up/");
// batchRenameFiles("../../client/assets/battleEffect/thander_ball/","../assets/battleEffect/thander_ball/");
// batchRenameFiles("../../client/assets/battleEffect/thander_level_one/","../assets/battleEffect/thander_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/thander_level_two/","../assets/battleEffect/thander_level_two/");
// batchRenameFiles("../../client/assets/battleEffect/thander_level_three/","../assets/battleEffect/thander_level_three/");
// batchRenameFiles("../../client/assets/battleEffect/trust_level_one/","../assets/battleEffect/trust_level_one/");
// batchRenameFiles("../../client/assets/battleEffect/trust_level_two/","../assets/battleEffect/trust_level_two/");
//batchRenameFiles("../../client/assets/battleEffect/finish/","../assets/battleEffect/finish/");
//batchRenameFiles("../../client/assets/battleEffect/win/","../assets/battleEffect/win/");
//batchRenameFiles("../../client/assets/battleEffect/lose/","../assets/battleEffect/lose/");
//batchRenameFiles("../../client/assets/battleEffect/action/","../assets/battleEffect/action/");

//エフェクトアセットデータの挿入と更新
function setBattleEffectAssetDatas($conn){
  $assetCategoryId = 11;
  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));
  //アセットを挿入(エフェクトを追加した場合、ここに追記)
  $startIndex = 2000000;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",1,"戦闘エフェクト",23,$startIndex);
  $startIndex = $startIndex + 23;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",2,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",3,"戦闘エフェクト",11,$startIndex);
  $startIndex = $startIndex + 11;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",4,"戦闘エフェクト",37,$startIndex);
  $startIndex = $startIndex + 37;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",5,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",6,"戦闘エフェクト",11,$startIndex);
  $startIndex = $startIndex + 11;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",7,"戦闘エフェクト",11,$startIndex);
  $startIndex = $startIndex + 11;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",8,"戦闘エフェクト",21,$startIndex);
  $startIndex = $startIndex + 21;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",9,"戦闘エフェクト",21,$startIndex);
  $startIndex = $startIndex + 21;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",10,"戦闘エフェクト",22,$startIndex);
  $startIndex = $startIndex + 22;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",11,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",12,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",13,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",14,"戦闘エフェクト",51,$startIndex);
  $startIndex = $startIndex + 51;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",15,"戦闘エフェクト",63,$startIndex);
  $startIndex = $startIndex + 63;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",16,"戦闘エフェクト",76,$startIndex);
  $startIndex = $startIndex + 76;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",17,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",18,"戦闘エフェクト",8,$startIndex);
  $startIndex = $startIndex + 8;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",19,"戦闘エフェクト",36,$startIndex);
  $startIndex = $startIndex + 36;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",20,"戦闘エフェクト",47,$startIndex);
  $startIndex = $startIndex + 47;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",21,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",22,"戦闘エフェクト",26,$startIndex);
  $startIndex = $startIndex + 26;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",23,"戦闘エフェクト",21,$startIndex);
  $startIndex = $startIndex + 21;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",24,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",25,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",26,"戦闘エフェクト",12,$startIndex);
  $startIndex = $startIndex + 12;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",27,"戦闘エフェクト",22,$startIndex);
  $startIndex = $startIndex + 22;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",28,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",29,"戦闘エフェクト",26,$startIndex);
  $startIndex = $startIndex + 26;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",30,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",31,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",32,"戦闘エフェクト",21,$startIndex);
  $startIndex = $startIndex + 21;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",33,"戦闘エフェクト",31,$startIndex);
  $startIndex = $startIndex + 31;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",34,"戦闘エフェクト",1,$startIndex);
  $startIndex = $startIndex + 1;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",35,"戦闘エフェクト",57,$startIndex);
  $startIndex = $startIndex + 57;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",36,"戦闘エフェクト",4,$startIndex);
  $startIndex = $startIndex + 4;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",37,"戦闘エフェクト",26,$startIndex);
  $startIndex = $startIndex + 26;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",38,"戦闘エフェクト",76,$startIndex);
  $startIndex = $startIndex + 76;
  batchInsertFrameAnimAssetDatas($conn,11,"battleEffect/battle_effect_","battle_effect",39,"戦闘エフェクト",110,$startIndex);
  $startIndex = $startIndex + 110;
}
//setBattleEffectAssetDatas($pdo);


//レディーステストデータ作成
//ポイントランキングテストデータ
function createTestRedisDataPointRanking($conn,$pointRankingDurationId){
  // 接続
  $redis = new Redis();
  $redis->connect('redis', 6379);
  $redis->select(1);

  //キー名
  $keyName = "point_ranking_duration_id_".$pointRankingDurationId;
	//存在するプレイヤー情報のリストを取得
	$sql = "SELECT * FROM player_info";
  $stmt = $conn->prepare($sql);
  $stmt->execute();
  $playerInfos = $stmt->fetchAll(PDO::FETCH_ASSOC);
	$count = 0;
	$limit = -1;
	//$limit = 0;
	foreach ($playerInfos as $plinfo) {
		$dummyScore = (100 * $plinfo['player_index_id']);
		$redis->zAdd($keyName, $dummyScore, $plinfo['player_index_id']);
		$count = $count + 1;
		if($limit != -1 && $limit < $count) break;
	}
  // for ($i=0; $i < 100; $i++) {
  //   $dummyScore = (100 * $i);
  //   $dummyPlayerIndexId = ($i + 1);
  //   $redis->zAdd($keyName, $dummyScore, $dummyPlayerIndexId);
  // }
  // for ($i=0; $i < 100; $i++) {
  //   $dummyScore = (100 * $i);
  //   $dummyPlayerIndexId = ($i + 100);
  //   $redis->zAdd($keyName, $dummyScore, $dummyPlayerIndexId);
  // }
  // for ($i=0; $i < 100; $i++) {
  //   $dummyScore = (100 * $i);
  //   $dummyPlayerIndexId = ($i + 200);
  //   $redis->zAdd($keyName, $dummyScore, $dummyPlayerIndexId);
  // }
}
//createTestRedisDataPointRanking($pdo,13);

//ポイントランキングのデータをプレイヤーID指定でテスト更新
function updateOneTestRedisPointRanking($playerIndexId,$pointRankingDurationId,$updatePoint){
  // 接続
  $redis = new Redis();
  $redis->connect('127.0.0.1', 6379);
  $redis->select(1);

  //キー名
  $keyName = "point_ranking_duration_id_".$pointRankingDurationId;
  $dummyScore = $updatePoint;
  $dummyPlayerIndexId = $playerIndexId;
  $redis->zAdd($keyName, $dummyScore, $dummyPlayerIndexId);
}

//Redis動作チェック
function testPhpRedis(){
  // 接続
	$redis = new Redis();
	$redis->connect('redis', 6379);
	$redis->select(1);
  // $redis = new Redis();
  // $redis->connect('127.0.0.1', 6379);
  // $redis->select(1);
  //キー名
  $keyName = "point_ranking_duration_id_1";
  $playerRank = $redis->zRevRank($keyName,123456789);
  if($playerRank == 0){
    var_dump("redis ok");
  }
  var_dump($playerRank);
}

//アバターアセットデータをパスから検索してDBのasset_idsに挿入
function setAvatarAssetDatas($conn){
  $assetCategoryId = 2; //アバター
  $id = 1000000; //初期ID
  $baseFileName = '../../client/assets/avatar/';
  $addBaseFileName = 'avatar/';
  $categoryNames = array('accessary_one','accessary_two','body','body_base','boots','face','hair','hand','head','head_base','pants','weapon_one','weapon_two');
  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));
  for ($i=0; $i < count($categoryNames); $i++) {
    $categoryFileName = $baseFileName.$categoryNames[$i];
    $addCategoryFileName = $addBaseFileName.$categoryNames[$i];
    if (file_exists($categoryFileName)) {
      $dirs = scandir($categoryFileName);
      for ($d=0; $d < count($dirs); $d++) {
        if(ctype_digit($dirs[$d])){ //フォルダ名チェック
          $imageDirs = scandir($categoryFileName."/".$dirs[$d]);
          for ($wd=0; $wd < count($imageDirs); $wd++) {
            $imageDirs2 = scandir($categoryFileName."/".$dirs[$d]."/".$imageDirs[$wd]);
            for($id2=0; $id2 < count($imageDirs2); $id2++){
              //tagを生成
              $tag = "aa_".$categoryNames[$i]."_".$imageDirs[$wd]."_".$imageDirs2[$id2]."_".$dirs[$d];
              $comment = $categoryNames[$i]."_アバターアセットID:".$dirs[$d];
              $serchImagePath = $categoryFileName."/".$dirs[$d]."/".$imageDirs[$wd]."/".$imageDirs2[$id2];
              $addImagePath = $addCategoryFileName."/".$dirs[$d]."/".$imageDirs[$wd]."/".$imageDirs2[$id2];
              $resultImageFilePaths = glob($serchImagePath.'/*.png');
              var_dump($serchImagePath);
              for ($fp=0; $fp < count($resultImageFilePaths); $fp++) {
                $fileName = basename($resultImageFilePaths[$fp]);
                for ($fn=0; $fn < count($resultImageFilePaths); $fn++) {
                  $checkFileName = $dirs[$d].'_'.$fn.'.png';
                  if($checkFileName == $fileName){
                    $path = $addImagePath."/".$fileName;
                    batchInsertAssetData($conn,$assetCategoryId,$path,$tag,$comment,$id);
                    $id = $id + 1;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
}
//setAvatarAssetDatas($pdo);

function batchInsertAssetData($conn,$assetCategoryId,$path,$tag,$comment,$id){ //アセットデータを挿入
  $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
  VALUES (:id, :image_path, :comment, :asset_category_id, :tag) ON DUPLICATE KEY UPDATE tag = :tag");
  $stmt->bindParam(':id', $id, PDO::PARAM_INT);
  $stmt->bindParam(':image_path', $path, PDO::PARAM_STR);
  $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
  $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
  $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
  $stmt->execute();
}

//アイテムアイコンフレームのアセットを挿入
function batchInsertItemIconFrameAsset($conn,$startIndex){
  $maxRank = 5;
  $assetCategoryId = 7;
  $basePath = "ui/icon/item_icon_frame/";
  $defaultIconAssetId = 125;
  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=? AND id != ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId,$defaultIconAssetId));

  for ($i=0; $i < $maxRank; $i++) {
    $rank = $i + 1;
    $tag = "icon_frame_rank_".$rank;
    $fileName = "icon_frame_rank_".$rank.".png";
    $path = $basePath.$fileName;
    $comment = "アイコンフレームランク".$rank;
    $stmt = $conn -> prepare("INSERT INTO asset_ids (id, image_path, comment, asset_category_id, tag)
    VALUES (:id, :image_path, :comment, :asset_category_id, :tag) ON DUPLICATE KEY UPDATE tag = :tag");
    $stmt->bindParam(':id', $startIndex, PDO::PARAM_INT);
    $stmt->bindParam(':image_path', $path, PDO::PARAM_STR);
    $stmt->bindParam(':comment', $comment, PDO::PARAM_STR);
    $stmt->bindParam(':asset_category_id', $assetCategoryId, PDO::PARAM_INT);
    $stmt->bindParam(':tag', $tag, PDO::PARAM_STR);
    $stmt->execute();
    $startIndex = $startIndex + 1;
  }
}

//batchInsertItemIconFrameAsset($pdo,850);

//UIエフェクトアセットデータの挿入と更新
function setUiEffectAssetDatas($conn){
  $assetCategoryId = 30;
  //リセット
  $sql = "DELETE FROM asset_ids WHERE asset_category_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($assetCategoryId));
  //アセットを挿入(エフェクトを追加した場合、ここに追記)
  $startIndex = 3000000;
  batchInsertFrameAnimAssetDatas($conn,30,"ui/effect/ui_effect_","ui_effect",1,"UIエフェクト",110,$startIndex);
  $startIndex = $startIndex + 110;
}

//setUiEffectAssetDatas($pdo);

//createTestRedisDataPointRanking(1);
//updateOneTestRedisPointRanking(100,1,100000);
//testPhpRedis();
