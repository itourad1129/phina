<?php

class BattleInstancePermission { //インスタンス操作権限管理クラス
  public $permissionTypes = null;
  public $registerDatas = null; //パーミッションに登録されたデータ

  function __construct(){
    //add_action => アクションの登録権限 get_reward => 報酬獲得権限 get_card_exp => カード使用時、カード経験値獲得権限
    $this->permissionTypes = array('0' => 'add_action','1' => 'get_reward', '2' => 'get_card_exp', '3' => 'battle_result_setting');
    //以下の配列には、エントリータイプのデータで挿入する。
    $this->registerDatas['add_action'] = array();
    $this->registerDatas['get_reward'] = array();
    $this->registerDatas['get_card_exp'] = array();
    $this->registerDatas['battle_result_setting'] = array();
  }

  function AddPermission($uniqueNo,$permissionType){ //引数 $permissionTypeにはvalueを指定
    //引数チェック
    foreach ($this->permissionTypes as $key => $value) {
      $typeName = "";
      if($permissionType == $value){
        $typeName = $value;
        if($typeName != "" && isset($this->registerDatas[$typeName])){
          //既に登録されていないエントリータイプデータかチェック
          for ($i=0; $i < count($this->registerDatas[$typeName]); $i++) {
            $checkUniqueNo = $this->registerDatas[$typeName][$i];
            if($checkUniqueNo == $uniqueNo) return false;
          }
          //パーミッションに登録
          array_push($this->registerDatas[$typeName],$uniqueNo);
        }
      }
    }
    return true;
  }

  //指定したパーミッションに、引数に設定したユニークNoが登録されているかチェックを実行
  function CheckPermission($uniqueNo,$permissionType){
    //引数チェック
    foreach ($this->permissionTypes as $key => $value) {
      $typeName = "";
      if($permissionType == $value){
        $typeName = $value;
        if($typeName != "" && isset($this->registerDatas[$typeName])){
          //既に登録されていないエントリータイプデータかチェック
          for ($i=0; $i < count($this->registerDatas[$typeName]); $i++) {
            $checkUniqueNo = $this->registerDatas[$typeName][$i];
            if($checkUniqueNo == $uniqueNo) return true;
          }
        }
        break;
      }
    }
    return false;
  }
}
