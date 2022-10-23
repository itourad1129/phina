<?php

function getBillingShopMasterDatas($conn,$saleNow = true){ //saleNow 販売中の商品だけを取得するか
  $sql = "SELECT * FROM billing_shop_master";
  if($saleNow == true) $sql = "SELECT * FROM billing_shop_master WHERE st_dttm <= date(now()) AND date(now()) <= ed_dttm";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function selectBillingShopMasterData($conn,$billingCode,$saleNow = true){ //billing_codeから商品データを取得。saleNow 販売中の商品だけを取得するか
  $sql = "SELECT * FROM billing_shop_master WHERE billing_code=?";
  if($saleNow == true) $sql = "SELECT * FROM billing_shop_master WHERE billing_code=? AND st_dttm <= date(now()) AND date(now()) <= ed_dttm";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($billingCode));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}
