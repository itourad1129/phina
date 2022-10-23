<?php

function getSkillMasterData($conn,$skillMasterId){
  $sql = "SELECT * FROM skill_master WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($skillMasterId));
  $resultSkillMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $resultSkillMasterData;
}

function getPlayerSkillDataRow($conn,$playerIndexId){
  $sql = "SELECT * FROM player_skill WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId));
  $selectPlayerSkillDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerSkillDataRow;
}

function getPlayerEquipSkills($conn,$playerIndexId){
  $equipStatus = 1;
  $sql = "SELECT * FROM player_skill WHERE player_index_id=? AND equip_status=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerIndexId,$equipStatus));
  $selectPlayerSkillDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $selectPlayerSkillDataRow;
}

function getPlayerEquipSkillMasterDatas($conn,$playerIndexId){
  $resultArray = array();
  $playerEquipSkills = getPlayerEquipSkills($conn,$playerIndexId);
  foreach ($playerEquipSkills as $plEquipSkill) {
    $sql = "SELECT * FROM skill_master WHERE id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($plEquipSkill['skill_master_id']));
    $skillMasterData = $stmt->fetch(PDO::FETCH_ASSOC);
    if($skillMasterData != false){
      array_push($resultArray,$skillMasterData);
    }
  }
  return $resultArray;
}

function getPlayerActiveSkillDataRow($conn,$playerInfo,$playerSkillDataRow){ //装備可能なスキルデータを返す
  $resultArray = array();
  if($playerSkillDataRow != false && $playerInfo != false){
    foreach ($playerSkillDataRow as $playerSkillData) {
      $skillMasterData = getSkillMasterData($conn,$playerSkillData['skill_master_id']);
      if($skillMasterData != false){
        if($skillMasterData['class_id'] == $playerInfo['player_class_id'] || $skillMasterData['class_id'] == 1){
          $playerWeaponDataRow = getPlayerWeaponEquipMasterDataRow($conn,$playerInfo['player_index_id']);
          foreach ($playerWeaponDataRow as $playerWeapon) {
            if($playerWeapon['weapon_category_id'] == $skillMasterData['weapon_category_id'] || $skillMasterData['weapon_category_id'] == 1){
              array_push($resultArray,$skillMasterData);
              break;
            }
          }
        }
      }
    }
  }
  return $resultArray;
}

function setPlayerClass($conn,$playerInfo,$skillMasterId){ //0:正常、1:不正、2:装備上限数を超えた
  $MAX_EQUIP_SKILL_COUNT = 5; //スキル最大装備数
  $result = 1;
  $equipStatus = 1;
  if($playerInfo != false){
    $playerEquipSkills = getPlayerEquipSkills($conn,$playerInfo['player_index_id']);
    if(count($playerEquipSkills) < $MAX_EQUIP_SKILL_COUNT){
      $sql = "SELECT * FROM player_skill WHERE player_index_id=? AND skill_master_id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($playerInfo['player_index_id'],$skillMasterId));
      $checkPlayerSkill = $stmt->fetch(PDO::FETCH_ASSOC);
      $skillMasterData = getSkillMasterData($conn,$skillMasterId);
      if($checkPlayerSkill != false && $skillMasterData != false){
        if($skillMasterData['class_id'] == $playerInfo['player_class_id'] || $skillMasterData['class_id'] == 1){
          $playerWeaponDataRow = getPlayerWeaponEquipMasterDataRow($conn,$playerInfo['player_index_id']);
          foreach ($playerWeaponDataRow as $playerWeapon) {
            if($playerWeapon['weapon_category_id'] == $skillMasterData['weapon_category_id'] || $skillMasterData['weapon_category_id'] == 1){
              $sql = "UPDATE player_skill SET equip_status=? WHERE id=?";
              $stmt = $conn->prepare($sql);
              $stmt->execute(array($equipStatus,$checkPlayerSkill['id']));
              $result = 0;
              break;
            }
          }
        }
      }
    }
    else{
      $result = 2;
    }
  }
  return $result;
}

function removePlayerSkill($conn,$playerInfo,$skillMasterId){
  $equipStatus = 0;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_skill WHERE player_index_id=? AND skill_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$skillMasterId));
    $checkPlayerSkill = $stmt->fetch(PDO::FETCH_ASSOC);
    if($checkPlayerSkill != false){
      $sql = "UPDATE player_skill SET equip_status=? WHERE id=?";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($equipStatus,$checkPlayerSkill['id']));
    }
  }
}

function insertPlayerSkill($conn,$playerInfo,$skillMasterId){
  $result = false;
  $skillMasterData = getSkillMasterData($conn,$skillMasterId);
  if($playerInfo != false && $skillMasterData != false){
    $sql = "SELECT * FROM player_skill WHERE player_index_id=? AND skill_master_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id'],$skillMasterId));
    $checkPlayerSkill = $stmt->fetch(PDO::FETCH_ASSOC);
    if($checkPlayerSkill == false){
      $newSkillStatus = 0;
      $stmt = $conn -> prepare("INSERT INTO player_skill (player_index_id, skill_master_id, equip_status)
      VALUES (:player_index_id, :skill_master_id, :equip_status)");
      $stmt->bindParam(':player_index_id', $playerInfo['player_index_id'], PDO::PARAM_INT);
      $stmt->bindParam('skill_master_id', $skillMasterData['id'], PDO::PARAM_INT);
      $stmt->bindParam(':equip_status', $newSkillStatus, PDO::PARAM_INT);
      $stmt->execute();
      $result = true;
    }
  }
  return $result;
}

function getWeaponCategoryMasterData($conn,$weaponCategoryId){
  $sql = "SELECT * FROM weapon_category_ids WHERE id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($weaponCategoryId));
  $selectWeaponCategoryData = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectWeaponCategoryData;
}

function selectClassSkillMasterDataRow($conn,$classId,$skillRank){
  $limitSkillRank = ($skillRank + 1);
  $resultSkillArray = array();
  $selectAllClassSkillDataRow = array();
  $sql = "SELECT * FROM skill_master WHERE class_id=? AND skill_rank < ?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($classId,$limitSkillRank));
  $selectSkillDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
  if($classId != 1){
    $allClassId = 1;
    $sql = "SELECT * FROM skill_master WHERE class_id=? AND skill_rank < ?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($allClassId,$limitSkillRank));
    $selectAllClassSkillDataRow = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $resultSkillArray = array_merge($selectSkillDataRow,$selectAllClassSkillDataRow);
  }
  else{
    $resultSkillArray = $selectSkillDataRow;
  }
  return $selectSkillDataRow;
}

function getPlayerOpenSkillRank($conn,$playerInfo){
  $resultRank = 1;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_skill_open_master";
    $stmt = $conn->prepare($sql);
    $stmt->execute();
    $selectSkillOpenMaster = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($selectSkillOpenMaster as $skillOpen) {
      if($skillOpen['player_level'] <= $playerInfo['player_level']){
        $resultRank = $skillOpen['skill_rank'];
      }
    }
  }
  return $resultRank;
}

function replaceUnOpenPlayerSkills($conn,$playerInfo){ //未解放のクラススキルを取得する。
  $resultSkills = array();
  if($playerInfo != false){
    $playerSkills = getPlayerSkillDataRow($conn,$playerInfo['player_index_id']);
    $skillRank = getPlayerOpenSkillRank($conn,$playerInfo);
    $matchingSkills = selectClassSkillMasterDataRow($conn,$playerInfo['player_class_id'],$skillRank);
    foreach ($matchingSkills as $mSkill) {
      $check = true;
      foreach ($playerSkills as $plSkill) {
        if($plSkill['skill_master_id'] == $mSkill['id']){
          $check = false;
        }
      }
      if($check != false){
        array_push($resultSkills,$mSkill);
      }
    }
  }
  return $resultSkills;
}

function playerSkillPointCheck($conn,$playerInfo){
  $WAIT_TIME = 21600; //回復待ち時間
  $resultSkillFlag = false;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_skill_point WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerSkillPoint = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerSkillPoint != false){
      if($selectPlayerSkillPoint['custom_open_flag'] != 0){
        $resultSkillFlag = true;
      }
      if((strtotime($selectPlayerSkillPoint['last_update']) + $WAIT_TIME) <= time()){
        $resultSkillFlag = true;
      }
    }
  }
  return $resultSkillFlag;
}

function getPlayerSkillPointLimitTime($conn,$playerInfo){
  $WAIT_TIME = 21600; //回復待ち時間
  $resultTime = -1;
  if($playerInfo != false){
    $sql = "SELECT * FROM player_skill_point WHERE player_index_id=?";
    $stmt = $conn->prepare($sql);
    $stmt->execute(array($playerInfo['player_index_id']));
    $selectPlayerSkillPoint = $stmt->fetch(PDO::FETCH_ASSOC);
    if($selectPlayerSkillPoint != false){
      $waitTime = (strtotime($selectPlayerSkillPoint['last_update']) + $WAIT_TIME);
      if(time() < $waitTime){
        $limitTime = ($waitTime - time());
        $resultTime = $limitTime;
      }
      else{
        $resultTime = 0;
      }
    }
  }
  return $resultTime;
}

function rotPlayerSkill($conn,$playerInfo){ //-1:失敗 0:取得できるスキルがない。それ以外成功
  $result = -1;
  if($playerInfo != false){
    $checkSkillPoint = playerSkillPointCheck($conn,$playerInfo);
    if($checkSkillPoint == true){
      $unOpenSkills = replaceUnOpenPlayerSkills($conn,$playerInfo);
      if(count($unOpenSkills) != 0){
        $randSkill = rand(1,count($unOpenSkills));
        $rowCount = 1;
        foreach ($unOpenSkills as $skill){
          if($rowCount == $randSkill){
            insertPlayerSkill($conn,$playerInfo,$skill['id']);
            $updateTime = date('Y-m-d H:i:s');
            $newCustomFlag = 0;
            $sql = "UPDATE player_skill_point SET custom_open_flag=?,last_update=? WHERE player_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($newCustomFlag,$updateTime,$playerInfo['player_index_id']));
            $result = $skill['id'];
            break;
          }
          $rowCount = ($rowCount + 1);
        }
      }
      else{
        $result = 0;
      }
    }
  }
  return $result;
}

// function changeLimitTime($seconds){
//   $hours = floor($seconds / 3600);
//   $minutes = floor(($seconds / 60) % 60);
//   $seconds = $seconds % 60;
//
//   $hms = sprintf("%02d時間%02d分%02d秒", $hours, $minutes, $seconds);
//
//   return $hms;
// }

function getSkillAction($getParam) //スキルを実行する
{
  $result = false;
  if(isset($getParam['skill_type'])){ //スキルタイプが含まれているかチェック
    switch ((int)$getParam['skill_type']) {
      case 0: //攻撃スキル
      {
        if(isset($getParam['skill_param_0']) && isset($getParam['skill_param_1'])
        && isset($getParam['skill_param_2']) && isset($getParam['skill_param_3'])){
          $physicsOrMagic = $getParam['skill_param_0']; //物理か魔法か 0:物理 1:魔法
          $attribute = $getParam['skill_param_1']; //属性
          $baseAtkPoint = $getParam['skill_param_2']; //基本スキル攻撃力
          $attributeAtkPoint = $getParam['skill_param_3']; //属性スキル攻撃力

          $result = array();
          $result['physics_or_magic'] = $physicsOrMagic;
          $result['skill_attribute'] = $attribute;
          $result['base_atk_point'] = $baseAtkPoint;
          $result['attribute_atk_point'] = $attributeAtkPoint;
        }
      }
      break;
      case 1: //バフスキル
      {
        if(isset($getParam['skill_param_0']) && isset($getParam['skill_param_1'])
        && isset($getParam['skill_param_2']) && isset($getParam['skill_param_3'])
        && isset($getParam['skill_param_4']) && isset($getParam['skill_param_5'])
        && isset($getParam['skill_param_6']) && isset($getParam['skill_param_7'])
        && isset($getParam['skill_param_8']) && isset($getParam['skill_param_9'])
        && isset($getParam['skill_param_10']) && isset($getParam['skill_param_11'])){
          $physicsOrMagic = $getParam['skill_param_0']; //物理か魔法か 0:物理 1:魔法
          $attribute = $getParam['skill_param_1']; //属性
          $baseBuffPoint = $getParam['skill_param_2']; //基本ステータス上昇量(直値)
          $percentBuffPoint = $getParam['skill_param_3']; //パーセントステータス上昇量
          $buffStatusId = $getParam['skill_param_4']; //バフ対象のステータスID
          $mndLevel = $getParam['skill_param_5']; //MNDレベル
          $activeTurn = $getParam['skill_param_6']; //効果継続ターン
          $buffSubStatusId = $getParam['skill_param_7']; //サブステータスID(now_hpなどに変更がある場合)
          $myMndLevelPercent = $getParam['skill_param_8']; //自分のMNDレベルに影響する%
          $targetMndLevelPercent = $getParam['skill_param_9']; //スキル付与対象のMNDレベルに影響する%
          $buffGroupId = $getParam['skill_param_10']; //バフ重複判定用に使用するグループID 0:グループ重複無制限 1:攻撃上昇系グループ
          $debuffFlag = $getParam['skill_param_11']; //デバフスキルかの判定 0:デバフではない 1:デバフ
          $buffCardMasterId = $getParam['id']; //カードのマスターID

          $result = array();
          $result['physics_or_magic'] = $physicsOrMagic;
          $result['skill_attribute'] = $attribute;
          $result['base_buff_point'] = $baseBuffPoint;
          $result['percent_buff_point'] = $percentBuffPoint;
          $result['buff_status_id'] = $buffStatusId;
          $result['mnd_level'] = $mndLevel;
          $result['active_turn'] = $activeTurn;
          $result['buff_sub_status_id'] = $buffSubStatusId;
          $result['my_mnd_level_percent'] = $myMndLevelPercent;
          $result['target_mnd_level_percent'] = $targetMndLevelPercent;
          $result['buff_skill_group_id'] = $buffGroupId;
          $result['buff_card_master_id'] = $buffCardMasterId;
          $result['debuff_flag'] = $debuffFlag;
        }
      }
      break;
      case 2: //デバフスキル
      {

      }
      break;
      default:
      break;
    }

    if($result != false){
      $result['result_card_name'] = $getParam['card_name'];
      $result['result_skill_type'] = $getParam['skill_type'];
      $result['result_skill_anim_type'] = $getParam['skill_anim_type'];
      $result['result_card_asset_id'] = $getParam['card_asset_id'];
      $result['result_card_master_id'] = $getParam['id'];
      $result['result_card_rank'] = $getParam['card_rank'];
    }
  }
  return $result;
}








































// $SKILL_SORT = -1;
// if(isset($_POST['skill_sort'])){
//   switch ($_POST['skill_sort']) {
//     case "0": //装備可能のみ
//       $SKILL_SORT = 0;
//       break;
//     case "1": //全スキル
//       $SKILL_SORT = 1;
//       break;
//     default:
//       break;
//   }
// }
//
// if(isset($_GET['skill_equip'])){
//   $skillEquipResult = setPlayerClass($pdo,$PLAYER_INFO,$_GET['skill_equip']);
//   if($skillEquipResult == 0){
//     print("スキルを装備しました。<br>");
//   }
//   else if($skillEquipResult == 2){
//     print("これ以上スキルを装備出来ません。<br>");
//   }
//   else{
//     print("スキルの装備に失敗しました。<br>");
//   }
// }
//
// if(isset($_GET['skill_remove'])){
//   removePlayerSkill($pdo,$PLAYER_INFO,$_GET['skill_remove']);
//   print("スキルを外しました。<br>");
// }
//
// if(isset($_GET['training'])){
//   if($_GET['training'] == 1){
//     $trainingResult = rotPlayerSkill($pdo,$PLAYER_INFO);
//     if($trainingResult == -1){
//       print("<br>エラー：訓練の実行に失敗しました。<br>");
//     }
//     else if($trainingResult == 0){
//       print("<br>習得可能なスキルは存在しません。<br>");
//     }
//     else{
//       $newSkill = getSkillMasterData($pdo,$trainingResult);
//       if($newSkill != false){
//         print("<br>新たなスキル【".$newSkill['skill_name']."】を習得しました。<br>");
//       }
//       else{
//         print("<br>エラー：スキルデータの取得に失敗しました。<br>");
//       }
//     }
//   }
// }
 ?>
