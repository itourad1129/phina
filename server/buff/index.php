<?php

function getBuffMasterDatas($conn){ //バフのマスターデータを取得
  $sql = "SELECT * FROM buff_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getBuffDatas = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $getBuffDatas;
}
