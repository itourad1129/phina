//装備アイテム関連
var EQUIP_ITEM_LIST_OBJ = null; //装備品リストオブジェクト
var EQUIP_ITEM_LIST_CELLS = null; //装備品リストセル
var EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM = null; //リストから選択した装備品 (装備品決定時に使用するデータにも使用
//プレイヤー所持の装備品リストを生成する。
function G_EQUIP_ITEM_LIST_CREATE(parentBase,playerEquipItemData,windowName){
  //ASSET_261 リストセル
  if(EQUIP_ITEM_LIST_OBJ != null){
    EQUIP_ITEM_LIST_OBJ.remove();
    EQUIP_ITEM_LIST_OBJ = null;
  }
  if(EQUIP_ITEM_LIST_CELLS != null && EQUIP_ITEM_LIST_CELLS.length != 0){
    for (var i = 0; i < EQUIP_ITEM_LIST_CELLS.length; i++) {
      EQUIP_ITEM_LIST_CELLS[i].remove();
      EQUIP_ITEM_LIST_CELLS[i] = null;
    }
    EQUIP_ITEM_LIST_CELLS = null;
  }
  EQUIP_ITEM_LIST_OBJ = PlainElement({});
  EQUIP_ITEM_LIST_CELLS = new Array();
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  for (var i = 0; i < playerEquipItemData.length; i++) {
    //セル背景
    EQUIP_ITEM_LIST_CELLS[i] = Sprite('ASSET_263').addChildTo(EQUIP_ITEM_LIST_OBJ);
    EQUIP_ITEM_LIST_CELLS[i].y = EQUIP_ITEM_LIST_CELLS[i].y - listObjHeightSize;
    listObjHeightSize += EQUIP_ITEM_LIST_CELLS[i].height;
    cellSizeHeight = EQUIP_ITEM_LIST_CELLS[i].height;
    //装備品アイコン
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'] = G_EQUIP_ITEM_GET_EQUIP_ITEM_ICON_SPRITE(playerEquipItemData[i]['rank'],playerEquipItemData[i]['weapon_category_id'],playerEquipItemData[i]['sub_weapon_category_id'],playerEquipItemData[i]['armor_category_id']);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'].addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'].setScale(0.8,0.8);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'].x = EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'].x - ((EQUIP_ITEM_LIST_CELLS[i].width / 2) - (EQUIP_ITEM_LIST_CELLS[i]['equip_item_icon'].width / 2));
    //テキストエリア
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_info_label'] = LabelArea({
      width: EQUIP_ITEM_LIST_CELLS[i].width,
      height: EQUIP_ITEM_LIST_CELLS[i].height * 0.65,
      text: "",
      fontSize: 16,
      fill: 'black',
      align: 'left',
      verticalAlign: 'top',
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_info_label'].x = EQUIP_ITEM_LIST_CELLS[i]['equip_item_info_label'].x + (EQUIP_ITEM_LIST_CELLS[i]['equip_item_info_label'].width * 0.175);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_info_label'].text = playerEquipItemData[i]['item_name'] + "\n" + "所持数:" + playerEquipItemData[i]['num'];
    //矢印ボタン(左)
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'] = Sprite('ASSET_262').addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].scaleX *= -1;
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y = EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y + (EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].height / 2);
    //矢印ボタン(左)本体
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn'] = Button({
      width: EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].width,
      height: EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].height,
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite']);
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn']['index'] = i;
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn']['hold_count'] = 0;
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var nowEquipItemNum = parseInt(EQUIP_ITEM_LIST_CELLS[this['index']]['equip_item_select_num_label'].text);
          nowEquipItemNum --;
          if(nowEquipItemNum < 0) nowEquipItemNum = 0;
          G_EQUIP_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowEquipItemNum);
          console.log("左");
        }
        this['hold_count'] ++;
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var nowEquipItemNum = parseInt(EQUIP_ITEM_LIST_CELLS[this['index']]['equip_item_select_num_label'].text);
        nowEquipItemNum --;
        if(nowEquipItemNum < 0) nowEquipItemNum = 0;
        G_EQUIP_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowEquipItemNum);
        console.log("左");
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].visible = false;

    //矢印ボタン(右)
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'] = Sprite('ASSET_262').addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].y = EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].x = EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].x + (EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].width * 4);
    //矢印ボタン(右)本体
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn'] = Button({
      width: EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].width,
      height: EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].height,
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_sprite']);
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['equip_item_max_count'] = playerEquipItemData[i]['num']; //最大アイテム数
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['index'] = i;
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['hold_count'] = 0; //ホールド中にカウントされる数値
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var maxEquipItemNum = parseInt(this['equip_item_max_count']);
          var nowEquipItemNum = G_EQUIP_ITEM_LIST_GET_LABEL_NUM(parseInt(this['index']));
          nowEquipItemNum ++;
          if(maxEquipItemNum < nowEquipItemNum) nowEquipItemNum = maxEquipItemNum;
          G_EQUIP_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowEquipItemNum);
        }
        this['hold_count'] ++;
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var maxEquipItemNum = parseInt(this['equip_item_max_count']);
        var nowEquipItemNum = G_EQUIP_ITEM_LIST_GET_LABEL_NUM(parseInt(this['index']));
        nowEquipItemNum ++;
        if(maxEquipItemNum < nowEquipItemNum) nowEquipItemNum = maxEquipItemNum;
        G_EQUIP_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowEquipItemNum);
        console.log("右");
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].visible = false;
    //選択中の数値
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_select_num_label'] = Label({
      text: '0',
      fontSize: 24,
      fill: 'black',
      align: 'center',
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_select_num_label'].y = EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    EQUIP_ITEM_LIST_CELLS[i]['equip_item_select_num_label'].x = EQUIP_ITEM_LIST_CELLS[i]['equip_item_select_num_label'].x + (EQUIP_ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].width * 2);
    //決定ボタン
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'] = Sprite('ASSET_264').addChildTo(EQUIP_ITEM_LIST_CELLS[i]);
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'].x = EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'].x + ((EQUIP_ITEM_LIST_CELLS[i].width / 2) - (EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'].width / 2));
    //決定ボタンラベル
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn_label'] = Label({
      text: '決定',
      fontSize: 24,
      fill: 'white',
      align: 'center',
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite']);
    //決定ボタン本体
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn'] = Button({
      width: EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'].width,
      height: EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite'].height,
    }).addChildTo(EQUIP_ITEM_LIST_CELLS[i]['decision_btn_sprite']);
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn']['index'] = i;
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn']['select_equip_item_data'] = playerEquipItemData[i];
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      var selectEquipItemNum = G_EQUIP_ITEM_LIST_GET_LABEL_NUM(this['index']);
        var windowText = this['select_equip_item_data']['item_name'] + "を使用します。\n使用する数:" + selectEquipItemNum;
        G_NORMAL_WINDOW_CREATE(parentBase,"使用する装備品の確認",windowText,1,windowName);
        EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM = null;
        EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM = this['select_equip_item_data']; //選択中のアイテム情報を更新
        EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM['select_equip_item_num'] = selectEquipItemNum; //選択中の個数を取得
        console.log("決定");
      }
    };
    EQUIP_ITEM_LIST_CELLS[i]['decision_btn'].visible = false;
  }
  EQUIP_ITEM_LIST_OBJ.y = EQUIP_ITEM_LIST_OBJ.y + ((listObjHeightSize / 2) - (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,EQUIP_ITEM_LIST_OBJ,listObjHeightSize,"装備品を選択","閉じる"); //リストを表示
}

function G_EQUIP_ITEM_LIST_DELETE(){ //装備品リストを削除する
  if(EQUIP_ITEM_LIST_CELLS != null){
    if(EQUIP_ITEM_LIST_CELLS.length != 0){
      for (var i = 0; i < EQUIP_ITEM_LIST_CELLS.length; i++) {
        EQUIP_ITEM_LIST_CELLS[i].remove();
      }
    }
    EQUIP_ITEM_LIST_CELLS = null;
  }
  if(EQUIP_ITEM_LIST_OBJ != null){
    EQUIP_ITEM_LIST_OBJ.remove();
    EQUIP_ITEM_LIST_OBJ = null;
  }
  EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM = null;
  G_UI_WINDOW_LIST_DELETE();
}

//数値ラベルを更新する
function G_EQUIP_ITEM_LIST_SET_LABEL_NUM(index,num){
  if(isset(EQUIP_ITEM_LIST_CELLS[index]) && isset(EQUIP_ITEM_LIST_CELLS[index]['equip_item_select_num_label'])){
    EQUIP_ITEM_LIST_CELLS[index]['equip_item_select_num_label'].text = num;
  }
}
//数値ラベルの数値を取得
function G_EQUIP_ITEM_LIST_GET_LABEL_NUM(index){
  var result = 0;
  if(isset(EQUIP_ITEM_LIST_CELLS[index]) && isset(EQUIP_ITEM_LIST_CELLS[index]['equip_item_select_num_label'])){
    result = parseInt(EQUIP_ITEM_LIST_CELLS[index]['equip_item_select_num_label'].text);
  }
  return result;
}

function G_EQUIP_ITEM_GET_EQUIP_ITEM_ICON_SPRITE(rank,weaponCategoryId,subWeaponCategoryId,armorCaregoryId){ //装備品アイコンを取得する
  var sprite = null;
  var tag = "";
  if(armorCaregoryId != 0) tag = "icon_armor_category_" + String(armorCaregoryId) + "_rarity_";
  if(subWeaponCategoryId != 0) tag = "icon_weapon_category_" + String(subWeaponCategoryId) + "_rarity_";
  if(weaponCategoryId != 0) tag = "icon_weapon_category_" + String(weaponCategoryId) + "_rarity_";
  tag = tag + String(rank);
  console.log(tag);
  sprite = G_ASSET_GET_SPRITE(tag);
  return sprite;
}
