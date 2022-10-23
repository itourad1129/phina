<?php


class EffectArea { //効果範囲管理関数
  const AREA_MAX_HEIGHT = 6; //縦マスの最大数
  const AREA_MAX_WIDTH = 6; //横マスの最大数
  public $myPos = null;
  public $myDirection = -1;
  public $effectAreaType = -1;
  public $init = false;
  function __construct($myPos,$myDirection,$effectAreaType){
    if(is_array($myPos) && isset($myPos['x']) && isset($myPos['y'])) $this->myPos = $myPos;
    $this->effectAreaType = $effectAreaType;
    $this->myDirection = $myDirection;
    if($this->myPos != null && $this->effectAreaType != -1 && $this->myDirection != -1) $this->init = true;
  }

  function GetArea(){ //※ 座標チェックは x=0,2,4,6で行う。
    $result = array();
    if($this->init == true){
      switch ((int)$this->effectAreaType) {
        case 0: //自分だけ
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y']);
        }
        break;
        case 1: //周囲1マス
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);
        }
        break;
        case 2://周囲1マス + 十字
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y']);
        }
        break;
        case 3://周囲2マス
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] - 1);

        }
        break;
        case 4: //周囲2マス + 十字
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] - 1);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 3);
          $this->AddPos($result,$this->myPos['x'] + 3,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 3);
          $this->AddPos($result,$this->myPos['x'] - 3,$this->myPos['y']);
        }
        break;
        case 5://周囲3マス
        {
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y']);

          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] - 1);

          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 3);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] + 3,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] + 3,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] + 3,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] + 3,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 3);
          $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 3);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 3);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 3,$this->myPos['y'] + 2);
          $this->AddPos($result,$this->myPos['x'] - 3,$this->myPos['y'] + 1);
          $this->AddPos($result,$this->myPos['x'] - 3,$this->myPos['y']);
          $this->AddPos($result,$this->myPos['x'] - 3,$this->myPos['y'] - 1);
          $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y'] - 2);
          $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] - 2);
        }
        break;
        case 6:
        { //向きによって変更 上下1マス 左右2マス
          switch ((int)$this->myDirection) {
            case 0: //上
            {
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
            }
            break;
            case 1: //右
            {
              $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
              $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
            }
            break;
            case 2: //下
            {
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
            }
            break;
            case 3: //左
            {
              $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
              $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);
            }
            break;
            default:
            break;
          }
        }
        break;
        case 7: //向きによって変更 上下直線2マス 左右2マス+奥の1マス
        {
          switch ((int)$this->myDirection) {
            case 0: //上
            {
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 1);
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] - 2);
            }
            break;
            case 1: //右
            {
              $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y']);
              $this->AddPos($result,$this->myPos['x'] + 1,$this->myPos['y'] + 1);
              $this->AddPos($result,$this->myPos['x'] + 2,$this->myPos['y']);
            }
            break;
            case 2: //下
            {
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 1);
              $this->AddPos($result,$this->myPos['x'],$this->myPos['y'] + 2);
            }
            break;
            case 3: //左
            {
              $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y'] + 1);
              $this->AddPos($result,$this->myPos['x'] - 1,$this->myPos['y']);
              $this->AddPos($result,$this->myPos['x'] - 2,$this->myPos['y']);
            }
            break;
            default:
            break;
          }
        }
        break;
        default:
        break;
      }
    }
    return $result;
  }

  function AddPos(&$addArray,$x,$y){
    $check = true;
    $a = $this->myPos['x'] % 2 == 0 ? true : false;
    $b = $x % 2 == 0 ? true : false;
    if($this->myPos['x'] % 2 != 0 && $a != $b) $y = $y - 1;
    if(self::AREA_MAX_HEIGHT < $y) $check = false;
    if($y < 0) $check = false;
    if(self::AREA_MAX_WIDTH < $x) $check = false;
    if($x < 0) $check = false;
    if($check == true){
      $addPos = array();
      $addPos['x'] = (int)$x;
      $addPos['y'] = (int)$y;
      array_push($addArray,$addPos);
    }
  }
}
