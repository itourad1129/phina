<?php

//スキルオブジェクト管理クラス

class SkillData {
  const MAX_PARAM = 11; //最大パラメーター数
  public $init = false; //初期化
  public $skillParams = array(); //パラメーター
  //バフ関連
  public $buffIds = array(); //バフID
  //対象
  public $target = 0; //0:味方,1:敵,2:両方
  //行動回数
  public $actionCount = 1;
  //基本ダメージ関連
  public $baseDamage = 0; //基本物理ダメージ 無ければ0
  public $baseMagicDamage = 0; //基本魔法ダメージ 無ければ0
  //属性加算値関連
  public $attributeIds = array(); //加算値の影響を受ける属性ID
  public $attributeDamages = array(); //加算値の影響を受ける属性値
  //回復関連
  public $baseHealPoint = 0; //基本回復ポイント 無ければ0
  //命中率(Range)
  public $hitRate = array();

  function __construct($list){ //buff_master テーブルのデータ
    for ($i=0; $i < SkillData::MAX_PARAM; $i++) {
      $paramName = "skill_param_".$i;
      if(isset($list[$paramName])){
        $this->skillParams[$i] = $list[$paramName];
      }
    }
    $this->CreateSkillObject(); //スキルオブジェクトを生成
    $this->init = true;
  }

  //スキルオブジェクトを生成
  function CreateSkillObject(){
    //skill_param_0 ターゲット　0:味方,1:敵,2:両方
    if($this->skillParams[0] != "") $this->target = $this->skillParams[0];
    //skill_param_1 基本物理ダメージ (直値)(100)
    if($this->skillParams[1] != "") $this->baseDamage = $this->skillParams[1];
    //skill_param_2 基本魔法ダメージ (直値)(100)
    if($this->skillParams[2] != "") $this->baseMagicDamage = $this->skillParams[2];
    //skill_param_3 属性ID(カンマ区切り)
    //skill_param_4 属性補正ダメージ (直値)(カンマ区切り)
    $attributeParam = $this->SetAttributeParam($this->skillParams[3],$this->skillParams[4]);
    if($attributeParam != null){
      $this->attributeIds = $attributeParam['attribute_ids'];
      $this->attributeDamages = $attributeParam['attribute_damages'];
    }
    //skill_param_5 基本回復力 直値(100)
    if($this->skillParams[5] != "") $this->baseHealPoint = $this->skillParams[5];
    //skill_param_6 バフID(カンマ区切り) buff_master テーブルを参照
    $buffParam = $this->SetBuffParam($this->skillParams[6]);
    if($buffParam != null){
      $this->buffIds = $buffParam['buff_ids'];
    }
    //skill_param_7 命中率
    $this->hitRate = $this->SetHitRate($this->skillParams[7]);
  }

  //属性パラメーターを設定
  function SetAttributeParam($attributeIds,$attributeDamages){
    $result = null;
    if($attributeIds != "" && $attributeDamages != ""){
      //属性ID(カンマ区切り)
      $tmpAttributeIds = explode(',',$attributeIds);
      //属性値(カンマ区切り)
      $tmpAttributeDamages = explode(',',$attributeDamages);
      if(count($tmpAttributeIds) == count($tmpAttributeDamages)){
        $result = array();
        $result['attribute_ids'] = $tmpAttributeIds;
        $result['attribute_damages'] = $tmpAttributeDamages;
      }
    }
    return $result;
  }

  //バフパラメーターを設定
  function SetBuffParam($buffIds){
    $result = null;
    if($buffIds != ""){
      //バフID(カンマ区切り)
      $tmpBuffIds = explode(',',$buffIds);
      $result = array();
      $result['buff_ids'] = $tmpBuffIds;
    }
    return $result;
  }

  //命中率の範囲を設定
  function SetHitRate($param){
    $result = array();
    $result["hit_min"] = 100;
    $result["hit_max"] = 100;
    $hitRate = explode(",",$param);
    if(isset($hitRate[0]) && ctype_digit($hitRate[0]) && isset($hitRate[1]) && ctype_digit($hitRate[1])){
      $result["hit_min"] = (int)$hitRate[0];
      $result["hit_max"] = (int)$hitRate[1];
    }
    return $result;
  }
}
