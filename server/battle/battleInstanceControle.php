<?php

class BattleInstanceControle { //インスタンスをコントロールするクラス
  function SaveBattleInstance($redis,$instance){ //インスタンスをシリアライズしてレディースにぶち込む
    $result = array();
    $result['transaction'] = FALSE;
    $result['battle_instance_id'] = -1;
    if($redis != null && get_class($instance) == 'BattleInstance'){
      //pdoを消す
      $instance->pdo = null;
      //$instance->entryDatas = null;
      //$instance->actionList = null;
      //$instance->battleLog = null;
      //$instance->addNextActions = null;
      $key = "battle_instance_".$instance->instanceId;
      $obj = serialize($instance);
      $result['transaction'] = $redis->multi()->set($key,$obj)->exec();
      $result['battle_instance_id'] = $instance->instanceId;
      return $result;
    }
    return $result;
  }

  function GetBattleInstance($pdo,$redis,$instanceId){ //シリアライズされたバトルインスタンスを変数に戻す
    if($redis != null){
      $key = "battle_instance_".$instanceId;
      $serialize = $redis->get($key);
      if($serialize != false){
        $instance = unserialize($serialize);
        $instance->pdo = null;
        $instance->SetPdo($pdo);
        if(get_class($instance) == 'BattleInstance'){
          return $instance;
        }
      }
    }
    return null;
  }
}
