<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/skill/index.php';
?>
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>スキル一覧</title>
  </head>
    <body>
      <center>
        <h1>スキル一覧</h1>
      <?php

      print("<br>装備中スキル<br>");
      $playerSkillDataRow = getPlayerSkillDataRow($pdo,$PLAYER_INFO['player_index_id']);
      $getPlayerEquipSkill = getPlayerEquipSkills($pdo,$PLAYER_INFO['player_index_id']);
      $skillSort = getPlayerActiveSkillDataRow($pdo,$PLAYER_INFO,$playerSkillDataRow);
      $playerActiveSkills = $skillSort;
      //var_dump($playerSkillDataRow);
      if($SKILL_SORT != -1){
        switch ($SKILL_SORT) {
          case "0":
          //デフォルト
            break;
          case "1":
          $skillSort = false;
            break;
          default:
            break;
        }
      }

      foreach ($getPlayerEquipSkill as $plEquipSkillData) {
        $equipSkillMasterData = getSkillMasterData($pdo,$plEquipSkillData['skill_master_id']);
        if($equipSkillMasterData != false){
          $weaponCategoryData = getWeaponCategoryMasterData($pdo,$equipSkillMasterData['weapon_category_id']);
          $classData = getClassData($pdo,$equipSkillMasterData['class_id']);
          if($weaponCategoryData != false && $classData != false){
            print($equipSkillMasterData['skill_name'].":".$weaponCategoryData['category_name']."スキル:威力[".$equipSkillMasterData['base_point']."]:クラス[".$classData['class_name']."]
            <a href=index.php?skill_remove=".$equipSkillMasterData['id'].">【外す】</a><br>");
          }
        }
      }

      print("<br>所持スキル<br>");
      foreach ($skillSort as $skill) {
        $activeFlag = false;
        $weaponCategoryData = getWeaponCategoryMasterData($pdo,$skill['weapon_category_id']);
        $classData = getClassData($pdo,$skill['class_id']);
        if($weaponCategoryData != false && $classData != false){
          foreach ($playerActiveSkills as $plActiveSkill){
            if($plActiveSkill['id'] == $skill['id']){
              $activeFlag = true;
              break;
            }
          }
          if($activeFlag != false){
            print($skill['skill_name'].":".$weaponCategoryData['category_name']."スキル:威力[".$skill['base_point']."]:クラス[".$classData['class_name']."]
            <a href=index.php?skill_equip=".$skill['id'].">【装備する】</a><br>");
          }
          else{
            print($skill['skill_name'].":".$weaponCategoryData['category_name']."スキル:威力[".$skill['base_point']."]:クラス[".$classData['class_name']."]<br>");
          }
        }
      }

      print("<br><a href=../myPage/index.php>戻る</a>");















































































      ?>
      </center>
    </body>
</html>
