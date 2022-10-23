<?php

//クラス無し
//体力

function createBaseStatus($conn,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax){
  $maxLevel = 500 + 1;
  $levelCount = 1;
  $plusParam = 0;
  $sql = "DELETE FROM base_status_master WHERE player_class_id=? AND status_id=?";
  $stmt = $conn->prepare($sql);
  $deleteFlag = $stmt->execute(array($classId,$statusId));

  for ($i=1; $i < $maxLevel; $i++) {
    $plusParam = ($plusParam + rand($plusParamMin,$plusParamMax));
    $addParam = ($startStatus + $plusParam);
    $stmt = $conn -> prepare("INSERT INTO base_status_master (status_id, player_level, player_class_id, status_point)
    VALUES (:status_id, :player_level, :player_class_id, :status_point)");
    $stmt->bindParam(':status_id', $statusId, PDO::PARAM_INT);
    $stmt->bindParam(':player_level', $i, PDO::PARAM_INT);
    $stmt->bindParam(':player_class_id', $classId, PDO::PARAM_INT);
    $stmt->bindParam(':status_point', $addParam, PDO::PARAM_INT);
    $stmt->execute();
  }
}

//クラス無し 体力
// $classId = 1;
// $statusId = 1;
// $startStatus = 200;
// $plusParamMin = 20;
// $plusParamMax = 40;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 攻撃力
// $classId = 1;
// $statusId = 2;
// $startStatus = 30;
// $plusParamMin = 10;
// $plusParamMax = 25;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 防御力
// $classId = 1;
// $statusId = 3;
// $startStatus = 10;
// $plusParamMin = 4;
// $plusParamMax = 14;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 魔法攻撃力
// $classId = 1;
// $statusId = 4;
// $startStatus = 25;
// $plusParamMin = 7;
// $plusParamMax = 20;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 魔法防御力
// $classId = 1;
// $statusId = 5;
// $startStatus = 7;
// $plusParamMin = 3;
// $plusParamMax = 11;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 素早さ
// $classId = 1;
// $statusId = 6;
// $startStatus = 27;
// $plusParamMin = 9;
// $plusParamMax = 23;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 精神力
// $classId = 1;
// $statusId = 7;
// $startStatus = 15;
// $plusParamMin = 8;
// $plusParamMax = 14;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 生命力
// $classId = 1;
// $statusId = 8;
// $startStatus = 10;
// $plusParamMin = 1;
// $plusParamMax = 2;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し スタミナ
// $classId = 1;
// $statusId = 9;
// $startStatus = 100;
// $plusParamMin = 5;
// $plusParamMax = 10;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);

//クラス無し 運
// $classId = 1;
// $statusId = 10;
// $startStatus = 10;
// $plusParamMin = 2;
// $plusParamMax = 6;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);













// //戦士 体力
//  $classId = 2;
//  $statusId = 1;
//  $startStatus = 500;
//  $plusParamMin = 60;
//  $plusParamMax = 90;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 攻撃力
//  $classId = 2;
//  $statusId = 2;
//  $startStatus = 80;
//  $plusParamMin = 40;
//  $plusParamMax = 80;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 防御力
//  $classId = 2;
//  $statusId = 3;
//  $startStatus = 30;
//  $plusParamMin = 22;
//  $plusParamMax = 38;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 魔法攻撃力
//  $classId = 2;
//  $statusId = 4;
//  $startStatus = 35;
//  $plusParamMin = 15;
//  $plusParamMax = 23;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 魔法防御力
//  $classId = 2;
//  $statusId = 5;
//  $startStatus = 15;
//  $plusParamMin = 9;
//  $plusParamMax = 20;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 素早さ
//  $classId = 2;
//  $statusId = 6;
//  $startStatus = 39;
//  $plusParamMin = 26;
//  $plusParamMax = 38;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 精神力
//  $classId = 2;
//  $statusId = 7;
//  $startStatus = 28;
//  $plusParamMin = 12;
//  $plusParamMax = 25;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 生命力
//  $classId = 2;
//  $statusId = 8;
//  $startStatus = 30;
//  $plusParamMin = 4;
//  $plusParamMax = 8;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 スタミナ
//  $classId = 2;
//  $statusId = 9;
//  $startStatus = 250;
//  $plusParamMin = 15;
//  $plusParamMax = 30;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //戦士 運
//  $classId = 2;
//  $statusId = 10;
//  $startStatus = 15;
//  $plusParamMin = 4;
//  $plusParamMax = 9;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);










// //魔術師 体力
// $classId = 3;
// $statusId = 1;
// $startStatus = 350;
// $plusParamMin = 45;
// $plusParamMax = 65;
// createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 攻撃力
//  $classId = 3;
//  $statusId = 2;
//  $startStatus = 40;
//  $plusParamMin = 23;
//  $plusParamMax = 37;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 防御力
//  $classId = 3;
//  $statusId = 3;
//  $startStatus = 17;
//  $plusParamMin = 12;
//  $plusParamMax = 19;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 魔法攻撃力
//  $classId = 3;
//  $statusId = 4;
//  $startStatus = 100;
//  $plusParamMin = 65;
//  $plusParamMax = 110;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 魔法防御力
//  $classId = 3;
//  $statusId = 5;
//  $startStatus = 35;
//  $plusParamMin = 26;
//  $plusParamMax = 38;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 素早さ
//  $classId = 3;
//  $statusId = 6;
//  $startStatus = 29;
//  $plusParamMin = 11;
//  $plusParamMax = 25;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 精神力
//  $classId = 3;
//  $statusId = 7;
//  $startStatus = 35;
//  $plusParamMin = 18;
//  $plusParamMax = 36;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 生命力
//  $classId = 3;
//  $statusId = 8;
//  $startStatus = 22;
//  $plusParamMin = 3;
//  $plusParamMax = 6;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 スタミナ
//  $classId = 3;
//  $statusId = 9;
//  $startStatus = 200;
//  $plusParamMin = 11;
//  $plusParamMax = 26;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);
//
// //魔術師 運
//  $classId = 3;
//  $statusId = 10;
//  $startStatus = 18;
//  $plusParamMin = 5;
//  $plusParamMax = 10;
//  createBaseStatus($pdo,$classId,$statusId,$startStatus,$plusParamMin,$plusParamMax);


function createStatusUp($conn,$statusId,$classId,$statusMin,$statusMax){
  $sql = "DELETE FROM status_up_master WHERE player_class_id=? AND status_id=?";
  $stmt = $conn->prepare($sql);
  $deleteFlag = $stmt->execute(array($classId,$statusId));

  $stmt = $conn -> prepare("INSERT INTO status_up_master (status_id, player_class_id, point_min, point_max)
  VALUES (:status_id, :player_class_id, :point_min, :point_max)");
  $stmt->bindParam(':status_id', $statusId, PDO::PARAM_INT);
  $stmt->bindParam(':player_class_id', $classId, PDO::PARAM_INT);
  $stmt->bindParam(':point_min', $statusMin, PDO::PARAM_INT);
  $stmt->bindParam(':point_max', $statusMax, PDO::PARAM_INT);
  $stmt->execute();
}


// //クラス無し体力
// $statusId = 1;
// $classId = 1;
// $statusMin = 20;
// $statusMax = 40;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し攻撃力
// $statusId = 2;
// $classId = 1;
// $statusMin = 10;
// $statusMax = 25;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し防御力
// $statusId = 3;
// $classId = 1;
// $statusMin = 4;
// $statusMax = 14;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し魔法攻撃力
// $statusId = 4;
// $classId = 1;
// $statusMin = 7;
// $statusMax = 20;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し魔法防御力
// $statusId = 5;
// $classId = 1;
// $statusMin = 3;
// $statusMax = 11;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し素早さ
// $statusId = 6;
// $classId = 1;
// $statusMin = 9;
// $statusMax = 23;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し精神力
// $statusId = 7;
// $classId = 1;
// $statusMin = 8;
// $statusMax = 14;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し生命力
// $statusId = 8;
// $classId = 1;
// $statusMin = 1;
// $statusMax = 2;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無しスタミナ
// $statusId = 9;
// $classId = 1;
// $statusMin = 5;
// $statusMax = 10;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
//
// //クラス無し運
// $statusId = 10;
// $classId = 1;
// $statusMin = 2;
// $statusMax = 6;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);













// // //戦士体力
// $statusId = 1;
// $classId = 2;
// $statusMin = 60;
// $statusMax = 90;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士攻撃力
// $statusId = 2;
// $classId = 2;
// $statusMin = 40;
// $statusMax = 80;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士防御力
// $statusId = 3;
// $classId = 2;
// $statusMin = 22;
// $statusMax = 38;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士魔法攻撃力
// $statusId = 4;
// $classId = 2;
// $statusMin = 15;
// $statusMax = 23;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士魔法防御力
// $statusId = 5;
// $classId = 2;
// $statusMin = 9;
// $statusMax = 20;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士素早さ
// $statusId = 6;
// $classId = 2;
// $statusMin = 26;
// $statusMax = 38;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士精神力
// $statusId = 7;
// $classId = 2;
// $statusMin = 12;
// $statusMax = 25;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士生命力
// $statusId = 8;
// $classId = 2;
// $statusMin = 4;
// $statusMax = 8;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士スタミナ
// $statusId = 9;
// $classId = 2;
// $statusMin = 15;
// $statusMax = 30;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //戦士運
// $statusId = 10;
// $classId = 2;
// $statusMin = 4;
// $statusMax = 9;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);









// // //魔術師体力
// $statusId = 1;
// $classId = 3;
// $statusMin = 45;
// $statusMax = 65;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師攻撃力
// $statusId = 2;
// $classId = 3;
// $statusMin = 23;
// $statusMax = 37;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師防御力
// $statusId = 3;
// $classId = 3;
// $statusMin = 12;
// $statusMax = 19;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師魔法攻撃力
// $statusId = 4;
// $classId = 3;
// $statusMin = 65;
// $statusMax = 110;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師魔法防御力
// $statusId = 5;
// $classId = 3;
// $statusMin = 26;
// $statusMax = 38;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師素早さ
// $statusId = 6;
// $classId = 3;
// $statusMin = 11;
// $statusMax = 25;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師精神力
// $statusId = 7;
// $classId = 3;
// $statusMin = 18;
// $statusMax = 36;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師生命力
// $statusId = 8;
// $classId = 3;
// $statusMin = 3;
// $statusMax = 6;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師スタミナ
// $statusId = 9;
// $classId = 3;
// $statusMin = 11;
// $statusMax = 26;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);
// //
// // //魔術師運
// $statusId = 10;
// $classId = 3;
// $statusMin = 5;
// $statusMax = 10;
// createStatusUp($pdo,$statusId,$classId,$statusMin,$statusMax);

function createLevelUpExp($conn,$classId,$addExp){
  $maxLevel = 500 + 1;
  $levelCount = 1;
  $plusParam = 0;
  $startExp = $addExp;
  $sql = "DELETE FROM exp_stage WHERE player_class_id=?";
  $stmt = $conn->prepare($sql);
  $deleteFlag = $stmt->execute(array($classId));

  for ($i=1; $i < $maxLevel; $i++) {
    $addExp = ($addExp + $startExp);
    $stmt = $conn -> prepare("INSERT INTO exp_stage (player_class_id, player_level, level_up_exp)
    VALUES (:player_class_id, :player_level, :level_up_exp)");
    $stmt->bindParam(':player_class_id', $classId, PDO::PARAM_INT);
    $stmt->bindParam(':player_level', $i, PDO::PARAM_INT);
    $stmt->bindParam(':level_up_exp', $addExp, PDO::PARAM_INT);
    $stmt->execute();
  }
}

//クラス無し expStage
//createLevelUpExp($pdo,1,200);
//戦士
//createLevelUpExp($pdo,2,500);
//魔術師
//createLevelUpExp($pdo,3,500);

 ?>
