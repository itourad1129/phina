<?php
include_once '../../module/playerStatus/index.php';
// function getPlayerExpTmp($conn,$playerInfo,$getExp){
//   if($getExp != 0 && $playerInfo != false){
//     $levelUpFlag = true;
//     $addExp = ($getExp + $playerInfo['player_exp']);
//     $playerLevelStart = $playerInfo['player_level'];
//     $levelUpCount = 0;
//     while ($levelUpFlag == true) {
//       $playerLevelInit = ($playerLevelStart + $levelUpCount);
//       $sql = "SELECT * FROM exp_stage WHERE player_class_id=? AND player_level=?";
//       $stmt = $conn->prepare($sql);
//       $stmt->execute(array($playerInfo['player_class_id'],$playerLevelInit));
//       $selectExpStage = $stmt->fetch(PDO::FETCH_ASSOC);
//       if($selectExpStage != false){
//         if($selectExpStage['level_up_exp'] <= $addExp){
//           $addExp = ($addExp - $selectExpStage['level_up_exp']);
//           $levelUpCount = ($levelUpCount + 1);
//         }
//         else{
//           $sql = "UPDATE player_info SET player_exp=?,player_level=? WHERE player_id=?";
//           $stmt = $conn->prepare($sql);
//           $stmt->execute(array($addExp,$playerLevelInit,$playerInfo['player_id']));
//           $levelUpFlag = false;
//           break;
//         }
//       }
//       else{ //最大レベル時の処理
//         if($levelUpFlag != 0){
//           $maxLevel = ($playerLevelInit - 1);
//         }
//         else{
//           $maxLevel = $playerLevelStart;
//         }
//         $sql = "UPDATE player_info SET player_exp=?,player_level=? WHERE player_id=?";
//         $stmt = $conn->prepare($sql);
//         $stmt->execute(array(0,$maxLevel,$playerInfo['player_id']));
//         $levelUpFlag = false;
//       }
//     }
//   }
// }

function getPlayerExp($conn,$playerInfo,$getExp){ //経験値獲得処理
  $result = array();
  $result['level_up_flag'] = 0;
  $result['get_exp_val'] = $getExp;
  $levelUpFlag = false;
  $sql = "SELECT * FROM player_info WHERE player_index_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerInfo['player_index_id']));
  $getPlayerInfo = $stmt->fetch(PDO::FETCH_ASSOC);

  $sql = "SELECT * FROM exp_stage WHERE player_class_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerInfo['player_class_id']));
  $getExpStage = $stmt->fetchAll(PDO::FETCH_ASSOC);

  if($getExp != 0 && $getPlayerInfo != false){
    $addExp = ($getExp + $getPlayerInfo['player_exp']);
    $playerLevel = $getPlayerInfo['player_level'];
    $playerExp = $getPlayerInfo['player_exp'];
    $addExp = $playerExp + $getExp;
    $levelUpCount = 0;
    $loop = true;
    while ($loop == true){
      $serchExpStage = false;
      foreach ($getExpStage as $expStage) {
        if($playerLevel == $expStage['player_level']){ //現在のレベルと一致した場合
          $serchExpStage = true;
          if($expStage['level_up_exp'] <= $addExp){
            $levelUpFlag = true;
            $playerLevel = $playerLevel + 1;
            $addExp = $addExp - $expStage['level_up_exp'];
            if($addExp < 0) $addExp = 0;
            break;
          }
          else{
            $loop = false; //ループ解除
            $sql = "UPDATE player_info SET player_exp=?,player_level=? WHERE player_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($addExp,$playerLevel,$getPlayerInfo['player_id']));
            //生命力を最大にする。
            $vitalityStatusData = getClassBaseStatusSelectStatusId($conn,$playerLevel,$playerInfo['player_class_id'],8);
            $sql = "UPDATE player_vitality SET vitality_point=?,max_vitality_point=? WHERE player_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($vitalityStatusData['status_point'],$vitalityStatusData['status_point'],$playerInfo['player_index_id']));
            //スタミナを最大にする。
            $vitalityStatusData = getClassBaseStatusSelectStatusId($conn,$playerLevel,$playerInfo['player_class_id'],9);
            $sql = "UPDATE player_stamina SET stamina_point=?,max_stamina_point=? WHERE player_index_id=?";
            $stmt = $conn->prepare($sql);
            $stmt->execute(array($vitalityStatusData['status_point'],$vitalityStatusData['status_point'],$playerInfo['player_index_id']));
            break 2;
          }
        }
      }
      if($serchExpStage == false) break; //レベルアップのデータが無かったため、while終了
    }
  }
  if($levelUpFlag == true) $result['level_up_flag'] = 1;
  return $result;
}


function getPlayerLevelStage($conn,$playerClassId,$playerLevel){
  $sql = "SELECT * FROM exp_stage WHERE player_class_id=? AND player_level=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($playerClassId,$playerLevel));
  $selectExpStage = $stmt->fetch(PDO::FETCH_ASSOC);
  return $selectExpStage;
}





























 ?>
