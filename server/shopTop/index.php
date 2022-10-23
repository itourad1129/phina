<?php

function getShopTopBannerDatas($conn){ //バナー情報を取得
  $sql = "SELECT * FROM shop_top_banner_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}
