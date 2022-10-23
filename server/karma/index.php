<?php

function getKarmaName($karma){ //プレイヤーのカルマ値からカルマ名を取得する
  $karmaName = "";
  if(0 <= $karma && $karma <= 2500) $karmaName = "悪党";
  else if(2501 <= $karma && $karma <= 5000) $karmaName = "賞金首";
  else if(5001 <= $karma && $karma <= 7500) $karmaName = "犯罪者";
  else if(7501 <= $karma && $karma <= 10000) $karmaName = "一般人";
  else if(10001 <= $karma && $karma <= 12500) $karmaName = "一般人";
  else if(12501 <= $karma && $karma <= 15000) $karmaName = "善人";
  else if(15001 <= $karma && $karma <= 17500) $karmaName = "救世主";
  else if(17501 <= $karma && $karma <= 20000) $karmaName = "英雄";
  return $karmaName;
}

function getKarmaRank($karma){ //プレイヤーのカルマ値からカルマランクを取得する
  $karmaRank = 0;
  if(0 <= $karma && $karma <= 2500) $karmaRank = -3;
  else if(2501 <= $karma && $karma <= 5000) $karmaRank = -2;
  else if(5001 <= $karma && $karma <= 7500) $karmaRank = -1;
  else if(7501 <= $karma && $karma <= 10000) $karmaRank = 0;
  else if(10001 <= $karma && $karma <= 12500) $karmaRank = 0;
  else if(12501 <= $karma && $karma <= 15000) $karmaRank = 1;
  else if(15001 <= $karma && $karma <= 17500) $karmaRank = 2;
  else if(17501 <= $karma && $karma <= 20000) $karmaRank = 3;
  return $karmaRank;
}

function getKarmaActionEffectNum($karma,$karmaActionType){ //実行したカルマアクションの効果から変動値を取得
  $result = 0;
  switch ($karmaActionType) {
    case 0: //殺人(開始)
    {
      $result = -10;
    }
    break;
    case 1: //殺人(成功)
    {
      $result = -100;
    }
    break;
    case 2: //窃盗(開始)
    {
      $result = -1;
    }
    break;
    case 3: //窃盗(成功)
    {
      $result = -2;
    }
    break;
    case 4: //救援
    {
      $result = 10;
    }
    break;
    case 5: //救援(成功)
    {
      $result = 100;
    }
    break;
    default:
    {

    }
    break;
  }
  return $result;
}
