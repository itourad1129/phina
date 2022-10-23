<?php

//グローバル変数を宣言
$RESULT_JSON = array();

$ENV = 0; //0:開発環境 1:本番環境

class AppDefine{
  //環境設定
  //DB接続情報
  public $DB_HOST;
  public $DB_ID;
  public $DB_PW;
  public $PAYPAL_CLIENT_ID;
  public $PAYPAL_SECRET;
  public $PAYPAL_COMPLETE_URL; //購入後のリダイレクト先
  public $PAYPAL_CANCEL_URL; //購入キャンセル後のリダイレクト先
  public $postParam;
  public $request_url;
  public $GUILD_CREATE_ITEM_ID; //ギルド作成に必要なアイテムID
  public $GUILD_AREA_ID; //ギルドエリアのID
  public $GUILD_HOME_MAP_ID; //ギルドホームのMAPID
  public $STATUS_IDS;
  //Paypal
  //http://172.20.10.2:8888/
  function __construct($env){
    $this->GUILD_CREATE_ITEM_ID = 14;
    $this->GUILD_AREA_ID = 100;
    $this->GUILD_HOME_MAP_ID = 2;
    $this->STATUS_IDS = array('HP' => 1, 'ATK' => 2, 'DEF' => 3, 'M_ATK' => 4, 'M_DEF' => 5, 'AGI' => 6, 'MND' => 7, 'VIT' => 8, 'STM' =>9, 'LUCK' => 10);

    if($env == 1){ //本番
      $this->DB_HOST = "mysql:dbname=dotArena;host=mysql;charset=utf8";
      $this->DB_ID = "root";
      $this->DB_PW = "root";
      $this->PAYPAL_CLIENT_ID = "AX0kMPXrbMwGdPfk7AMNS8yXltWm1_kg5GUdxXJ1AbRrTodc97T2b52llD57FrKc1zLiQ0cA5zValflR";
      $this->PAYPAL_SECRET = "EDTgR7RnzRifFTKgb1ST1Th2522K7p3mefc8ENXhwnDulZK65XnCVZBu1fL54mxFR0JPFt3q9EiYeWjV";
      $this->PAYPAL_COMPLETE_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/billingShop/billingResult.php";
      $this->PAYPAL_CANCEL_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/main/index.php";
      $this->PAYPAL_FINISH_REDIRECT_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/main/index.php";
    }
    else { //テスト
      $DEVELOP_DEFINE = 0;
      if($DEVELOP_DEFINE == 0){
        $this->DB_HOST = "mysql:dbname=dotArena;host=mysql;charset=utf8";
        $this->DB_ID = "master_user";
        $this->DB_PW = "password";
        $this->PAYPAL_CLIENT_ID = "AX0kMPXrbMwGdPfk7AMNS8yXltWm1_kg5GUdxXJ1AbRrTodc97T2b52llD57FrKc1zLiQ0cA5zValflR";
        $this->PAYPAL_SECRET = "EDTgR7RnzRifFTKgb1ST1Th2522K7p3mefc8ENXhwnDulZK65XnCVZBu1fL54mxFR0JPFt3q9EiYeWjV";
        $this->PAYPAL_COMPLETE_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/billingShop/billingResult.php";
        $this->PAYPAL_CANCEL_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/main/index.php";
        $this->PAYPAL_FINISH_REDIRECT_URL = "http://172.20.10.2:8888/dotArena/project_kyle/client/main/index.php";
      }
      if($DEVELOP_DEFINE == 1){
        $this->DB_HOST = "mysql:dbname=dotArena;host=mysql;charset=utf8";
        $this->DB_ID = "master_user";
        $this->DB_PW = "password";
        $this->PAYPAL_CLIENT_ID = "AX0kMPXrbMwGdPfk7AMNS8yXltWm1_kg5GUdxXJ1AbRrTodc97T2b52llD57FrKc1zLiQ0cA5zValflR";
        $this->PAYPAL_SECRET = "EDTgR7RnzRifFTKgb1ST1Th2522K7p3mefc8ENXhwnDulZK65XnCVZBu1fL54mxFR0JPFt3q9EiYeWjV";
        $this->PAYPAL_COMPLETE_URL = "http://192.168.11.144:8888/repo/game/client/billingShop/billingResult.php";
        $this->PAYPAL_CANCEL_URL = "http://192.168.11.144:8888/repo/game/client/main/index.php";
        $this->PAYPAL_FINISH_REDIRECT_URL = "http://192.168.11.144:8888/repo/game/client/main/index.php";
      }
      //使用不可？
      // if($DEVELOP_DEFINE == 2){
      //   $this->DB_HOST = "mysql:dbname=dotArena;host=localhost;charset=utf8";
      //   $this->DB_ID = "root";
      //   $this->DB_PW = "root";
      //   $this->PAYPAL_CLIENT_ID = "AX0kMPXrbMwGdPfk7AMNS8yXltWm1_kg5GUdxXJ1AbRrTodc97T2b52llD57FrKc1zLiQ0cA5zValflR";
      //   $this->PAYPAL_SECRET = "EDTgR7RnzRifFTKgb1ST1Th2522K7p3mefc8ENXhwnDulZK65XnCVZBu1fL54mxFR0JPFt3q9EiYeWjV";
      //   $this->PAYPAL_COMPLETE_URL = "localhost:8888/dotArena/project_kyle/client/billingShop/billingResult.php";
      //   $this->PAYPAL_CANCEL_URL = "localhost:8888/dotArena/project_kyle/client/main/index.php";
      //   $this->PAYPAL_FINISH_REDIRECT_URL = "localhost:8888/dotArena/project_kyle/client/main/index.php";
      // }
    }
    //キャンセルのURLにパラメーターを付与
    $this->postParam = array();
    $this->postParam['custom_start_param'] = array(
      'start_scene' => 'billingShop',
      'billing_status' => 'cancel',
    );
    $this->request_url = $this->PAYPAL_CANCEL_URL;
    //購入結果があればパラメーターを付与
    $this->request_url .= '?'.http_build_query($this->postParam);
    $this->PAYPAL_CANCEL_URL = $this->request_url;
	}
}
