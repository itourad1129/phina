<?php

class MultiPlayerInstance { //マルチプレイヤー管理クラス

  public $entryPlayerIndexIds = array(); //マルチプレイヤーに参加したプレイヤーIDの配列
  public $stanbyAddActions = array(); //反映待ちの追加アクションクラスの配列(index == ターン数)
  public $waitTime = 60; //コマンド受付待ち時間 デフォルトで60秒
  public $startDate = ""; //マルチプレイモードがアクティブになった時刻
  public $startBattleTurn = -1; //マルチプレイモードがアクティブになったターン
  public $isMultiPlayerMode = false; //マルチプレイ中か

  function __construct(){

  }

  function GetMultiPlayerMode(){ //マルチプレイヤーモード中か true:マルチプレイ中 false 通常モード
    if(1 < count($this->entryPlayerIndexIds)) return true; //参加人数が2人以上でマルチプレイヤーモード
    return false;
  }

  function GetNowTurn(){ //マルチプレイ開始日時から、現在のターン数を取得
    $result = -1;
    if($this->startBattleTurn != -1) $result = $result + $this->startBattleTurn;
    $now = new DateTime(date('Y-m-d H:i:s'));
    if($this->startDate == "") return -1;
    $startDttm = new DateTime($this->startDate);
    if($now < $startDttm) return -1;
    while($startDttm <= $now){
      $now->modify('-'.$this->waitTime.' second');
      $result = $result + 1;
      //var_dump("get-now-turn");
      //var_dump($now);
      //var_dump($startDttm);
      if(10000 <= $result){ return -1;} //流石に1万ターンも戦闘続かねえだろう。
    }
    return $result;
  }

  function GetWaitTimeLimit(){ //現在時刻からコマンド受付残り時間を取得
    $nowTurn = $this->GetNowTurn();
    if($nowTurn == -1) return -1;
    if($this->startBattleTurn != -1) $nowTurn = $nowTurn - $this->startBattleTurn;
    $addSecond = ($nowTurn * $this->waitTime) + $this->waitTime; //1ターン先の未来の秒数を取得
    if($this->startDate == "") return -1;
    $startDttm = new DateTime($this->startDate);
    //var_dump($this->startDate);
    //var_dump($startDttm);
    $startDttm->modify('+'.$addSecond.' second'); //1ターン先の更新日時を取得
    $nowDttm = new DateTime(date('Y-m-d H:i:s'));
    //var_dump("get-wait-time-limit");
    //var_dump($startDttm);
    //var_dump($nowDttm);
    $limit = (int)$startDttm->format('U') - (int)$nowDttm->format('U');
    if($limit < 0) return -1;
    return $limit;
  }

  function AddStanbyAddAction(AddAction $addAction,$exeTurn){ //反映待ちアクションを追加
    if(get_class($addAction) != 'AddAction') return 0;
    if(!isset($this->stanbyAddActions[$exeTurn])) $this->stanbyAddActions[$exeTurn] = array();
    $update = false;
    for ($i=0; $i < count($this->stanbyAddActions[$exeTurn]); $i++) {
      if($addAction->uniqueNo == $this->stanbyAddActions[$exeTurn][$i]->uniqueNo){ //既に登録されていたアクションであれば上書き
      //   $this->stanbyAddActions[$exeTurn][$i] = null;
      //   $this->stanbyAddActions[$exeTurn][$i] = $addAction;
        $update = true;
        break;
      }
    }
    //更新ではない場合は挿入
    if($update == false) array_push($this->stanbyAddActions[$exeTurn],$addAction);
    //error_log(var_export($this->stanbyAddActions, true), 3, "./debug.txt");
    if($this->CheckStanbyAddActionReady() == true){ //待機中のアクションの準備ができたら、待ち時間を更新
      $sec = $this->GetWaitTimeLimit();
      //error_log($this->startDate, 3, "./debug.txt");
      $dttm = new DateTime($this->startDate);
      $dttm->modify('-'.$sec.' second');
      $this->startDate = date('Y-m-d H:i:s',$dttm->format('U'));
      //error_log($this->startDate, 3, "./debug.txt");
    }
  }

  function CheckStanbyAddActionReady(){ //参加者全員が待機中アクションを登録したか確認
    if(false == $this->GetMultiPlayerMode()) return false;
    $result = false;
    $nowTurn = $this->GetNowTurn();
    if(isset($this->stanbyAddActions[$nowTurn])){
      $getStanbyAddActions = $this->stanbyAddActions[$nowTurn];
      for ($j=0; $j < count($this->entryPlayerIndexIds); $j++) {
        $check = false;
        for ($i=0; $i < count($getStanbyAddActions); $i++) {
          if($getStanbyAddActions[$i]->type == 0 && $getStanbyAddActions[$i]->id == $this->entryPlayerIndexIds[$j]){
            $check = true;
          }
        }
        if($check == false) return false;
      }
      $result = true;
    }
    return $result;
  }

}
