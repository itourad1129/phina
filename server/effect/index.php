<?php
//効果関連処理
//カルマからアクティブな効果データを取得する
function getKarmaEffects($conn,$karma){
  $sql = "SELECT * FROM karma_effect_master LEFT JOIN effect_master
  ON karma_effect_master.effect_id = effect_master.effect_id
  WHERE karma_effect_master.min_karma <= ? AND ? <= karma_effect_master.max_karma";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($karma,$karma));
  $getKarmaEffects = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getKarmaEffects;
}
