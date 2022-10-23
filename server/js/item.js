//アイテム関連
var ITEM_LIST_OBJ = null;
var ITEM_LIST_CELLS = null;
var ITEM_LIST_SELECT_ITEM = null; //リストから選択したアイテム (アイテム決定時に使用するデータにも使用
var ITEM_INFO_WINDOW = null; //アイテム情報ウィンドウ
var ITEM_INFO_WINDOW_RESULT_DATA = null; //アイテム情報通信結果
var ITEM_CLOSE_ITEM_INFO_WINDOW = false; //アイテム詳細ウィンドウが閉じられたかチェックする時にしようする
//プレイヤー所持品のアイテムリストを生成する。
function G_ITEM_LIST_CREATE(parentBase,playerItemData,windowName){
  //ASSET_261 リストセル
  if(ITEM_LIST_OBJ != null){
    ITEM_LIST_OBJ.remove();
    ITEM_LIST_OBJ = null;
  }
  if(ITEM_LIST_CELLS != null && ITEM_LIST_CELLS.length != 0){
    for (var i = 0; i < ITEM_LIST_CELLS.length; i++) {
      ITEM_LIST_CELLS[i].remove();
      ITEM_LIST_CELLS[i] = null;
    }
    ITEM_LIST_CELLS = null;
  }
  ITEM_LIST_OBJ = PlainElement({});
  ITEM_LIST_CELLS = new Array();
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  for (var i = 0; i < playerItemData.length; i++) {
    //セル背景
    ITEM_LIST_CELLS[i] = Sprite('ASSET_263').addChildTo(ITEM_LIST_OBJ);
    ITEM_LIST_CELLS[i].y = ITEM_LIST_CELLS[i].y - listObjHeightSize;
    listObjHeightSize += ITEM_LIST_CELLS[i].height;
    cellSizeHeight = ITEM_LIST_CELLS[i].height;
    //アイテムアイコン
    ITEM_LIST_CELLS[i]['item_icon'] = Sprite('ASSET_' + playerItemData[i]['icon_asset_id']).addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['item_icon'].setScale(0.8,0.8);
    ITEM_LIST_CELLS[i]['item_icon'].x = ITEM_LIST_CELLS[i]['item_icon'].x - ((ITEM_LIST_CELLS[i].width / 2) - (ITEM_LIST_CELLS[i]['item_icon'].width / 2));
    //テキストエリア
    ITEM_LIST_CELLS[i]['item_info_label'] = LabelArea({
      width: ITEM_LIST_CELLS[i].width,
      height: ITEM_LIST_CELLS[i].height * 0.65,
      text: "",
      fontSize: 16,
      fill: 'black',
      align: 'left',
      verticalAlign: 'top',
    }).addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['item_info_label'].x = ITEM_LIST_CELLS[i]['item_info_label'].x + (ITEM_LIST_CELLS[i]['item_info_label'].width * 0.175);
    ITEM_LIST_CELLS[i]['item_info_label'].text = playerItemData[i]['item_name'] + "\n" + "所持数:" + playerItemData[i]['item_val'];
    //矢印ボタン(左)
    ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'] = Sprite('ASSET_262').addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].scaleX *= -1;
    ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y = ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y + (ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].height / 2);
    //矢印ボタン(左)本体
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn'] = Button({
      width: ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].width,
      height: ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].height,
    }).addChildTo(ITEM_LIST_CELLS[i]['arrow_btn_left_sprite']);
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn']['index'] = i;
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn']['hold_count'] = 0;
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var nowItemNum = parseInt(ITEM_LIST_CELLS[this['index']]['item_select_num_label'].text);
          nowItemNum --;
          if(nowItemNum < 0) nowItemNum = 0;
          G_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowItemNum);
          console.log("左");
        }
        this['hold_count'] ++;
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var nowItemNum = parseInt(ITEM_LIST_CELLS[this['index']]['item_select_num_label'].text);
        nowItemNum --;
        if(nowItemNum < 0) nowItemNum = 0;
        G_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowItemNum);
        console.log("左");
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_left_btn'].visible = false;

    //矢印ボタン(右)
    ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'] = Sprite('ASSET_262').addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].y = ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].x = ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].x + (ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].width * 4);
    //矢印ボタン(右)本体
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn'] = Button({
      width: ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].width,
      height: ITEM_LIST_CELLS[i]['arrow_btn_right_sprite'].height,
    }).addChildTo(ITEM_LIST_CELLS[i]['arrow_btn_right_sprite']);
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['item_max_count'] = playerItemData[i]['item_val']; //最大アイテム数
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['index'] = i;
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn']['hold_count'] = 0; //ホールド中にカウントされる数値
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var maxItemNum = parseInt(this['item_max_count']);
          var nowItemNum = G_ITEM_LIST_GET_LABEL_NUM(parseInt(this['index']));
          nowItemNum ++;
          if(maxItemNum < nowItemNum) nowItemNum = maxItemNum;
          G_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowItemNum);
        }
        this['hold_count'] ++;
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var maxItemNum = parseInt(this['item_max_count']);
        var nowItemNum = G_ITEM_LIST_GET_LABEL_NUM(parseInt(this['index']));
        nowItemNum ++;
        if(maxItemNum < nowItemNum) nowItemNum = maxItemNum;
        G_ITEM_LIST_SET_LABEL_NUM(parseInt(this['index']),nowItemNum);
        console.log("右");
      }
    };
    ITEM_LIST_CELLS[i]['arrow_btn_right_btn'].visible = false;
    //選択中の数値
    ITEM_LIST_CELLS[i]['item_select_num_label'] = Label({
      text: '0',
      fontSize: 24,
      fill: 'black',
      align: 'center',
    }).addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['item_select_num_label'].y = ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    ITEM_LIST_CELLS[i]['item_select_num_label'].x = ITEM_LIST_CELLS[i]['item_select_num_label'].x + (ITEM_LIST_CELLS[i]['arrow_btn_left_sprite'].width * 2);
    //決定ボタン
    ITEM_LIST_CELLS[i]['decision_btn_sprite'] = Sprite('ASSET_264').addChildTo(ITEM_LIST_CELLS[i]);
    ITEM_LIST_CELLS[i]['decision_btn_sprite'].x = ITEM_LIST_CELLS[i]['decision_btn_sprite'].x + ((ITEM_LIST_CELLS[i].width / 2) - (ITEM_LIST_CELLS[i]['decision_btn_sprite'].width / 2));
    //決定ボタンラベル
    ITEM_LIST_CELLS[i]['decision_btn_label'] = Label({
      text: '決定',
      fontSize: 24,
      fill: 'white',
      align: 'center',
    }).addChildTo(ITEM_LIST_CELLS[i]['decision_btn_sprite']);
    //決定ボタン本体
    ITEM_LIST_CELLS[i]['decision_btn'] = Button({
      width: ITEM_LIST_CELLS[i]['decision_btn_sprite'].width,
      height: ITEM_LIST_CELLS[i]['decision_btn_sprite'].height,
    }).addChildTo(ITEM_LIST_CELLS[i]['decision_btn_sprite']);
    ITEM_LIST_CELLS[i]['decision_btn']['index'] = i;
    ITEM_LIST_CELLS[i]['decision_btn']['select_item_data'] = playerItemData[i];
    ITEM_LIST_CELLS[i]['decision_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      var selectItemNum = G_ITEM_LIST_GET_LABEL_NUM(this['index']);
        var windowText = this['select_item_data']['item_name'] + "を使用します。\n使用する数:" + selectItemNum;
        G_NORMAL_WINDOW_CREATE(parentBase,"使用するアイテムの確認",windowText,1,windowName);
        ITEM_LIST_SELECT_ITEM = null;
        ITEM_LIST_SELECT_ITEM = this['select_item_data']; //選択中のアイテム情報を更新
        ITEM_LIST_SELECT_ITEM['select_item_num'] = selectItemNum; //選択中の個数を取得
        console.log("決定");
      }
    };
    ITEM_LIST_CELLS[i]['decision_btn'].visible = false;
  }
  ITEM_LIST_OBJ.y = ITEM_LIST_OBJ.y + ((listObjHeightSize / 2) - (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,ITEM_LIST_OBJ,listObjHeightSize,"アイテムを選択","閉じる"); //リストを表示
}

function G_ITEM_LIST_DELETE(){ //アイテムリストを削除する
  if(ITEM_LIST_CELLS != null){
    if(ITEM_LIST_CELLS.length != 0){
      for (var i = 0; i < ITEM_LIST_CELLS.length; i++) {
        ITEM_LIST_CELLS[i].remove();
      }
    }
    ITEM_LIST_CELLS = null;
  }
  if(ITEM_LIST_OBJ != null){
    ITEM_LIST_OBJ.remove();
    ITEM_LIST_OBJ = null;
  }
  ITEM_LIST_SELECT_ITEM = null;
  G_UI_WINDOW_LIST_DELETE();
}

//数値ラベルを更新する
function G_ITEM_LIST_SET_LABEL_NUM(index,num){
  if(isset(ITEM_LIST_CELLS[index]) && isset(ITEM_LIST_CELLS[index]['item_select_num_label'])){
    ITEM_LIST_CELLS[index]['item_select_num_label'].text = num;
  }
}
//数値ラベルの数値を取得
function G_ITEM_LIST_GET_LABEL_NUM(index){
  var result = 0;
  if(isset(ITEM_LIST_CELLS[index]) && isset(ITEM_LIST_CELLS[index]['item_select_num_label'])){
    result = parseInt(ITEM_LIST_CELLS[index]['item_select_num_label'].text);
  }
  return result;
}

function G_ITEM_ICON_CREATE(type,masterData,scale = 0.25,num = -1){ //アイテムアイコンを生成する type0: item_master type1: equip_item_master type2:card_master type3:exp
  var result = null;
  switch (type) {
    case 0: //アイテム
    {
      var frameImg = G_ITEM_ICON_GET_RANK_ICON_FRAME(masterData['rank']);
      if(frameImg != null){
        var iconImgTag = "item_icon_" + masterData['icon_asset_id'];
        var iconImg = G_ASSET_GET_SPRITE(iconImgTag);
        if(iconImg != null){
          iconImg.width = iconImg.width * 0.8;
          iconImg.height = iconImg.height * 0.8;
          iconImg.addChildTo(frameImg);
          result = frameImg;
        }
      }
    }
    break;
    case 1: //装備アイテム
    {
      var frameImg = G_ITEM_ICON_GET_RANK_ICON_FRAME(masterData['rank']);
      if(frameImg != null){
        var iconImgTag = null;
        var iconImg = null;
        if(masterData['equip_category_id'] == 1 || masterData['equip_category_id'] == 2){ //武器
          var weaponCategoryId = 0;
          if(masterData['weapon_category_id'] != 0) weaponCategoryId = masterData['weapon_category_id'];
          if(masterData['sub_weapon_category_id'] != 0) weaponCategoryId = masterData['sub_weapon_category_id'];
          if(weaponCategoryId != 0){
            iconImgTag = "icon_weapon_category_" + weaponCategoryId + "_attribute_" + masterData['attribute_category_id'];
            console.log("武器アイコンタグ");
            console.log(iconImgTag);
            iconImg = G_ASSET_GET_SPRITE(iconImgTag);
            if(iconImg != null){
              iconImg.width = iconImg.width * 0.8;
              iconImg.height = iconImg.height * 0.8;
              iconImg.addChildTo(frameImg);
              result = frameImg;
            }
          }
        }
        else { //防具
          var armorCategoryId = 0;
          if(masterData['armor_category_id'] != 0){
            armorCategoryId = masterData['armor_category_id'];
            iconImgTag = "icon_armor_category_" + armorCategoryId + "_attribute_" + masterData['attribute_category_id'];
            console.log("防具アイコンタグ");
            console.log(iconImgTag);
            iconImg = G_ASSET_GET_SPRITE(iconImgTag);
            if(iconImg != null){
              iconImg.width = iconImg.width * 0.8;
              iconImg.height = iconImg.height * 0.8;
              iconImg.addChildTo(frameImg);
              result = frameImg;
            }
          }
        }
      }
    }
    break;
    case 2: //カード
    {
      var frameImg = G_ITEM_ICON_GET_RANK_ICON_FRAME(masterData['card_rank']);
      if(frameImg != null){
        var iconImgTag = "icon_card_attribute_" + masterData['attribute_category_id'];
        var iconImg = G_ASSET_GET_SPRITE(iconImgTag);
        if(iconImg != null){
          iconImg.width = iconImg.width * 0.8;
          iconImg.height = iconImg.height * 0.8;
          iconImg.addChildTo(frameImg);
          result = frameImg;
        }
      }
    }
    break;
    case 3: //経験値
    {
      var frameImg = G_ITEM_ICON_GET_RANK_ICON_FRAME(1);
      if(frameImg != null){
        var iconImg = Sprite('ASSET_971');
        if(iconImg != null){
          iconImg.width = iconImg.width * 0.8;
          iconImg.height = iconImg.height * 0.8;
          iconImg.addChildTo(frameImg);
          result = frameImg;
        }
      }
    }
    break;
    default:
    break;
  }
  if(result != null){
    //個数が指定して2以上であれば、個数を表示
    if(2 <= num){
      if(9999 < num) num = 9999;
      var replaceNum = String(num);
      var numLabel = LabelArea({
        width: result.width,
        height: result.height,
        text: replaceNum,
        fontSize: 150,
        fill: 'white',
        align: 'right',
        verticalAlign: 'text-bottom',
        stroke:"black",
        strokeWidth:20,
        fontWeight:"bold",
      }).addChildTo(result);
      numLabel.y = numLabel.y + result.height * 0.15;
      numLabel.x = numLabel.x - result.width * 0.05;
    }
    //スケール変更
    result.setScale(scale);
    result['get_size_width'] = parseFloat(result.width) * scale;
    result['get_size_height'] = parseFloat(result.height) * scale;
  }

  return result;
}

function G_ITEM_ICON_GET_RANK_ICON_FRAME(rank){ //ランクによって異なるアイコンフレーム画像を取得
  var result = null;
  var tag = "icon_frame_rank_" + rank;
  result = G_ASSET_GET_SPRITE(tag);
  return result;
}

function G_ITEM_CREATE_ITEM_INFO_WINDOW(type,masterData,closeCheck = false){ //アイテム情報ウィンドウを表示する。type0: item_master type1: equip_item_master type2:card_master
  if(ITEM_INFO_WINDOW != null){ //既に表示されている場合、削除
    G_ITEM_DELETE_ITEM_INFO_WINDOW();
  }
  ITEM_INFO_WINDOW_RESULT_DATA = ""; //アイテム情報通信結果
  ITEM_INFO_WINDOW = Sprite('ASSET_64'); //背景(マスク)
  ITEM_INFO_WINDOW['header'] = Sprite('ASSET_34').addChildTo(ITEM_INFO_WINDOW); //ヘッダー
  ITEM_INFO_WINDOW['header'].y = ITEM_INFO_WINDOW['header'].y - ((ITEM_INFO_WINDOW.height / 2) - (ITEM_INFO_WINDOW['header'].height / 2));
  var name = "";
  if(type == 0) name = masterData['item_name'];
  if(type == 1) name = masterData['item_name'];
  if(type == 2) name = masterData['card_name'];
  ITEM_INFO_WINDOW['header']['label'] = Label({
    text: name,
    fontSize: 24,
    fill: 'white',
    align: 'center',
  }).addChildTo(ITEM_INFO_WINDOW['header']);
  ITEM_INFO_WINDOW['item_icon'] = G_ITEM_ICON_CREATE(type,masterData,1); //アイテムアイコン
  ITEM_INFO_WINDOW['item_icon'].addChildTo(ITEM_INFO_WINDOW);
  ITEM_INFO_WINDOW['item_icon'].y = ITEM_INFO_WINDOW['item_icon'].y - ((ITEM_INFO_WINDOW['item_icon'].height / 2) - (ITEM_INFO_WINDOW['header'].height * 2));
  //情報ウィンドウ背景
  ITEM_INFO_WINDOW['window'] = Sprite('ASSET_260').addChildTo(ITEM_INFO_WINDOW);
  ITEM_INFO_WINDOW['window'].y = ITEM_INFO_WINDOW['window'].y + ((ITEM_INFO_WINDOW.height / 2) - (ITEM_INFO_WINDOW['window'].height / 2));
  //閉じるボタン
  ITEM_INFO_WINDOW['close_button'] = Sprite('ASSET_120').addChildTo(ITEM_INFO_WINDOW['window']);
  ITEM_INFO_WINDOW['close_button'].y = ITEM_INFO_WINDOW['close_button'].y + ((ITEM_INFO_WINDOW['window'].height / 2) - (ITEM_INFO_WINDOW['close_button'].height / 2));
  ITEM_INFO_WINDOW['close_button']['label'] = Label({
    text: "閉じる",
    fontSize: 24,
    fill: 'black',
    align: 'center',
  }).addChildTo(ITEM_INFO_WINDOW['close_button']);
  ITEM_INFO_WINDOW['close_button']['button'] = Button({
    width: ITEM_INFO_WINDOW['close_button'].width,
    height: ITEM_INFO_WINDOW['close_button'].height,
  }).addChildTo(ITEM_INFO_WINDOW['close_button']);
  ITEM_INFO_WINDOW['close_button']['button']['close_check'] = closeCheck;
  ITEM_INFO_WINDOW['close_button']['button'].onpointstart = function(e){
    if(NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null){
      if(this['close_check'] == true) ITEM_CLOSE_ITEM_INFO_WINDOW = true;
      G_ITEM_DELETE_ITEM_INFO_WINDOW(); //アイテム情報ウィンドウ削除
    }
  };
  ITEM_INFO_WINDOW['close_button']['button'].visible = false;
  switch (type) {
    case 0: //アイテム
    {
      var itemMasterData = G_ITEM_GET_ITEM_MASTER_DATA(masterData['id']);
      if(itemMasterData != null){
        //コメントを表示
        var commentLabel = LabelArea({
          width: ITEM_INFO_WINDOW['window'].width * 0.95,
          height: ITEM_INFO_WINDOW['window'].height * 0.85,
          text: itemMasterData['comment'],
          fontSize: 32,
          fill: 'white',
          align: 'left',
          verticalAlign: 'top',
          stroke:"black",
          strokeWidth:20,
          fontWeight:"bold",
        }).addChildTo(ITEM_INFO_WINDOW['window']);
        ITEM_INFO_WINDOW['header']['label'].text = masterData['item_name'];
      }
    }
    break;
    case 1: //装備アイテム
    {
      //装備ステータス表示
      var equipItemMaster = G_ITEM_GET_EQUIP_ITEM_MASTER_DATA(masterData['id']);
      var equipItemParamMaster = G_ITEM_GET_EQUIP_ITEM_PARAM_MASTER_DATA(masterData['id']);
      if(equipItemMaster != null){
        ITEM_INFO_WINDOW['header']['label'].text = equipItemMaster['item_name'];
        var statusText1 = "";
        var statusText2 = "";
        var statusCount = 0;

        for (var i = 0; i < equipItemParamMaster.length; i++) {
          for (var s = 0; s < MASTER_DATA_STATUS_IDS.length; s++) {
            if(MASTER_DATA_STATUS_IDS[s]['id'] == equipItemParamMaster[i]['status_id']){
              if(parseInt(MASTER_DATA_STATUS_IDS.length / 2) <= statusCount) {
                statusText2 = statusText2 + MASTER_DATA_STATUS_IDS[s]['status_name'] + " + " + String(equipItemParamMaster[i]['point_val']) + "\n";
              }
              else{
                statusText1 = statusText1 + MASTER_DATA_STATUS_IDS[s]['status_name'] + " + " + String(equipItemParamMaster[i]['point_val']) + "\n";
              }
              statusCount = statusCount + 1;
            }
          }
        }
        var commentLabel1 = LabelArea({
          width: ITEM_INFO_WINDOW['window'].width * 0.95,
          height: ITEM_INFO_WINDOW['window'].height * 0.85,
          text: statusText1,
          fontSize: 30,
          fill: 'white',
          align: 'left',
          verticalAlign: 'top',
          stroke:"black",
          strokeWidth:20,
          fontWeight:"bold",
        }).addChildTo(ITEM_INFO_WINDOW['window']);

        var commentLabel2 = LabelArea({
          width: ITEM_INFO_WINDOW['window'].width * 0.95,
          height: ITEM_INFO_WINDOW['window'].height * 0.85,
          text: statusText2,
          fontSize: 30,
          fill: 'white',
          align: 'left',
          verticalAlign: 'top',
          stroke:"black",
          strokeWidth:20,
          fontWeight:"bold",
        }).addChildTo(ITEM_INFO_WINDOW['window']);
        commentLabel2.x = commentLabel2.x + (ITEM_INFO_WINDOW['window'].width / 2);
      }
    }
    break;
    case 2: //カード
    {
      //カード詳細を表示
      var cardMasterData = G_ITEM_GET_CARD_MASTER_DATA(masterData['id']);
      if(cardMasterData != null){
        //コメントを表示
        var commentLabel = LabelArea({
          width: ITEM_INFO_WINDOW['window'].width * 0.95,
          height: ITEM_INFO_WINDOW['window'].height * 0.85,
          text: cardMasterData['comment'],
          fontSize: 32,
          fill: 'white',
          align: 'left',
          verticalAlign: 'top',
          stroke:"black",
          strokeWidth:20,
          fontWeight:"bold",
        }).addChildTo(ITEM_INFO_WINDOW['window']);
        ITEM_INFO_WINDOW['header']['label'].text = masterData['card_name'];
        //カード詳細表示ボタン
        ITEM_INFO_WINDOW['card_info_btn'] = Sprite('ASSET_120').addChildTo(ITEM_INFO_WINDOW['window']);
        ITEM_INFO_WINDOW['card_info_btn'].y = ITEM_INFO_WINDOW['close_button'].y;
        ITEM_INFO_WINDOW['card_info_btn'].x = ITEM_INFO_WINDOW['card_info_btn'].x - ITEM_INFO_WINDOW['card_info_btn'].width * 1.25;
        ITEM_INFO_WINDOW['card_info_btn']['label'] = Label({
          text: "詳細",
          fontSize: 24,
          fill: 'black',
          align: 'center',
        }).addChildTo(ITEM_INFO_WINDOW['card_info_btn']);
        ITEM_INFO_WINDOW['card_info_btn']['button'] = Button({
          width: ITEM_INFO_WINDOW['card_info_btn'].width,
          height: ITEM_INFO_WINDOW['card_info_btn'].height,
        }).addChildTo(ITEM_INFO_WINDOW['card_info_btn']);
        ITEM_INFO_WINDOW['card_info_btn']['button']['card_asset_id'] = masterData['card_asset_id'];
        ITEM_INFO_WINDOW['card_info_btn']['button']['card_id'] = masterData['id'];
        ITEM_INFO_WINDOW['card_info_btn']['button'].onpointstart = function(e){
          if(NETWORK_IS_CONNECTING == false && CARD_INFO_WINDOW == null){
            //の前にアセット読み込む
            var postParam = new Object();
            postParam['load_asset_card_asset_id'] = this['card_asset_id']; //アセットを読み込むカードID
            postParam['open_card_info_id'] = this['card_id']; //カード詳細を表示するカードID
            NETWORK_IS_CONNECTING = true;
            ITEM_INFO_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            ajaxStart("post","json","../../client/item/item.php",postParam); //非同期通信開始
            //G_CARD_INFO_WINDOW_DISP(ITEM_INFO_WINDOW,cardMasterData); //カード詳細を表示
          }
        };
        ITEM_INFO_WINDOW['card_info_btn']['button'].visible = false;
      }
    }
    break;
    default:
    break;
  }
  ITEM_INFO_WINDOW.update = function() {
    if(ITEM_INFO_WINDOW_RESULT_DATA != -1 && ITEM_INFO_WINDOW_RESULT_DATA != "" && G_ASSET_LOADER(ITEM_INFO_WINDOW_RESULT_DATA)){
      var json = JSON.parse(ITEM_INFO_WINDOW_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(isset(json["session_status"])){
          if(isset(json['open_card_info_window_card_id'])){
            var cardId = json['open_card_info_window_card_id'];
            var cardMasterData = G_ITEM_GET_CARD_MASTER_DATA(cardId);
            if(cardMasterData != null){
              G_CARD_INFO_WINDOW_DISP(this,cardMasterData); //カード詳細を表示
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          if(KARMA_MENU_OBJ != null) {
            KARMA_MENU_OBJ.remove();
            KARMA_MENU_OBJ = null;
          }
          thisSceneObj.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        if(ITEM_INFO_WINDOW != null) {
          ITEM_INFO_WINDOW.remove();
          ITEM_INFO_WINDOW = null;
        }
        console.log(PHINA_APP);
        PHINA_APP.exit("title");
      }

      ITEM_INFO_WINDOW_RESULT_DATA = "";
      NETWORK_IS_CONNECTING = false;
    }
  }

  return ITEM_INFO_WINDOW;
}

function G_ITEM_GET_ITEM_MASTER_DATA(itemId){ //アイテムマスターデータを取得
  var result = null;
  for (var i = 0; i < MASTER_DATA_ITEM_MASTER.length; i++) {
    if(MASTER_DATA_ITEM_MASTER[i]['id'] == itemId) {result = MASTER_DATA_ITEM_MASTER[i]; break;}
  }
  return result;
}

function G_ITEM_GET_EQUIP_ITEM_MASTER_DATA(equipItemId){ //装備アイテムマスターデータを取得
  var result = null;
  for (var i = 0; i < MASTER_DATA_EQUIP_ITEM_MASTER.length; i++) {
    if(MASTER_DATA_EQUIP_ITEM_MASTER[i]['id'] == equipItemId) {result = MASTER_DATA_EQUIP_ITEM_MASTER[i]; break;}
  }
  return result;
}

function G_ITEM_GET_EQUIP_ITEM_PARAM_MASTER_DATA(equipItemId){ //装備アイテムパラメーターマスターデータを取得
  var result = new Array();
  for (var i = 0; i < MASTER_DATA_EQUIP_ITEM_PARAM_MASTER.length; i++) {
    if(MASTER_DATA_EQUIP_ITEM_PARAM_MASTER[i]['equip_item_master_id'] == equipItemId) {
      result[result.length] = MASTER_DATA_EQUIP_ITEM_PARAM_MASTER[i];
    }
  }
  return result;
}

function G_ITEM_GET_CARD_MASTER_DATA(cardId){ //カードマスターデータを取得
  var result = null;
  for (var i = 0; i < MASTER_DATA_CARD_MASTER.length; i++) {
    if(MASTER_DATA_CARD_MASTER[i]['id'] == cardId) {result = MASTER_DATA_CARD_MASTER[i]; break;}
  }
  return result;
}

function G_ITEM_DELETE_ITEM_INFO_WINDOW(){ //アイテム情報ウィンドウを削除
  if(ITEM_INFO_WINDOW['header'] != null){
    ITEM_INFO_WINDOW['header'].remove();
    ITEM_INFO_WINDOW['header'] = null;
  }
  if(ITEM_INFO_WINDOW['item_icon'] != null){
    ITEM_INFO_WINDOW['item_icon'].remove();
    ITEM_INFO_WINDOW['item_icon'] = null;
  }
  if(ITEM_INFO_WINDOW['item_icon'] != null){
    ITEM_INFO_WINDOW['item_icon'].remove();
    ITEM_INFO_WINDOW['item_icon'] = null;
  }
  if(ITEM_INFO_WINDOW['window'] != null){
    ITEM_INFO_WINDOW['window'].remove();
    ITEM_INFO_WINDOW['window'] = null;
  }
  if(isset(ITEM_INFO_WINDOW['card_info_btn']) && ITEM_INFO_WINDOW['card_info_btn'] != null){
    ITEM_INFO_WINDOW['card_info_btn'].remove();
    ITEM_INFO_WINDOW['card_info_btn'] = null;
  }
  if(ITEM_INFO_WINDOW != null){
    ITEM_INFO_WINDOW.remove();
    ITEM_INFO_WINDOW = null;
  }
}
