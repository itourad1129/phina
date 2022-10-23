//移動範囲取得系

function G_EFFECT_AREA_GET_AREA(effectAreaType,myPos,myDirection){ //※ 座標チェックは x=0,2,4,6で行う。
  var result = new Array();
  myPos['x'] = parseInt(myPos['x']);
  myPos['y'] = parseInt(myPos['y']);
  switch (parseInt(effectAreaType)) {
    case 0: //自分だけ
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y']);
    }
    break;
    case 1: //周囲1マス
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);
    }
    break;
    case 2://周囲1マス + 十字
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y']);
    }
    break;
    case 3://周囲2マス
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] - 1);

    }
    break;
    case 4: //周囲2マス + 十字
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] - 1);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 3,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 3,myPos['y']);
    }
    break;
    case 5://周囲3マス
    {
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y']);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] - 1);

      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 3,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 3,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 3,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 3,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 3);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 3,myPos['y'] + 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 3,myPos['y'] + 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 3,myPos['y']);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 3,myPos['y'] - 1);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y'] - 2);
      G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] - 2);
    }
    break;
    case 6:
    { //向きによって変更 上下1マス 左右2マス
      switch (parseInt(myDirection)) {
        case 0: //上
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
        }
        break;
        case 1: //右
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
        }
        break;
        case 2: //下
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
        }
        break;
        case 3: //左
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);
        }
        break;
        default:
        break;
      }
    }
    break;
    case 7: //向きによって変更 上下直線2マス 左右2マス+奥の1マス
    {
      switch (parseInt(myDirection)) {
        case 0: //上
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 1);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] - 2);
        }
        break;
        case 1: //右
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y']);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 1,myPos['y'] + 1);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] + 2,myPos['y']);
        }
        break;
        case 2: //下
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 1);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'],myPos['y'] + 2);
        }
        break;
        case 3: //左
        {
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y'] + 1);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 1,myPos['y']);
          G_EFFECT_AREA_ADD_POS(myPos,result,myPos['x'] - 2,myPos['y']);
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
  return result;
}

function G_EFFECT_AREA_ADD_POS(myPos,addArray,x,y){
  var areaMaxHeight = 6; //縦マスの最大数
  var areaMaxWidth = 6; //横マスの最大数
  var check = true;
  var a = parseInt(myPos['x']) % 2 == 0 ? true : false;
  var b = x % 2 == 0 ? true : false;
  if(parseInt(myPos['x']) % 2 != 0 && a != b) y = y - 1;
  if(areaMaxHeight < y) check = false;
  if(y < 0) check = false;
  if(areaMaxWidth < x) check = false;
  if(x < 0) check = false;
  if(check == true){
    addPos = new Array();
    addPos['x'] = parseInt(x);
    addPos['y'] = parseInt(y);
    addArray[addArray.length] = addPos;
  }
}
