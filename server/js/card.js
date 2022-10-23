//カード関連

var CARD_INFO_WINDOW = null; //カード情報ウィンドウ
var CARD_INFO_CATEGORY = 0; //カード詳細の表示カテゴリー
var CARD_LIST_OBJ = null; //カードリストオブジェクト
var CARD_LIST_CELLS = null; //カードリストセル
var CARD_LIST_SELECT_CARD = null; //リストから選択したカード (カード決定時に使用するデータにも使用

function G_CARD_DISP(cardMasterData){ //カードを表示する cardData : card_master
  var result = null;
  var cardBgTag = "";
  var cardFrameTag = "";
  var cardEffectTag = "";
  var cardCharacterTag = "card_character_" + cardMasterData['card_asset_id'];
  //レアリティにより、切り替えるパーツ
  switch (parseInt(cardMasterData['card_rank'])) {
    case 1:
    {
      cardBgTag = "card_bg_1";
      cardFrameTag = "card_frame_1";
      cardEffectTag = "";
    }
    break;
    case 2:
    {
      cardBgTag = "card_bg_2";
      cardFrameTag = "card_frame_1";
      cardEffectTag = "";
    }
    break;
    case 3:
    {
      cardBgTag = "card_bg_3";
      cardFrameTag = "card_frame_2";
      cardEffectTag = "";
    }
    break;
    case 4:
    {
      cardBgTag = "card_bg_4";
      cardFrameTag = "card_frame_2";
      cardEffectTag = "";
    }
    break;
    case 5:
    {
      cardBgTag = "card_bg_5";
      cardFrameTag = "card_frame_3";
      cardEffectTag = "card_effect_1";
    }
    break;
    default:
    {
      cardBgTag = "card_bg_1";
      cardFrameTag = "card_frame_1";
      cardEffectTag = "";
    }
    break;
  }
  //背景表示
  result = G_ASSET_GET_SPRITE(cardBgTag);//カード背景を表示
  //エフェクト表示
  if(cardEffectTag != ""){
    result['card_effect'] = G_ASSET_GET_SPRITE_ANIM(cardEffectTag,25); //カードエフェクトを表示
    result['card_effect'].addChildTo(result);
  }
  //キャラクターイメージを表示
  result['character_image'] = G_ASSET_GET_SPRITE(cardCharacterTag);
  result['character_image'].addChildTo(result);//キャラクターイメージを表示
  //カードフレームを表示
  result['card_frame'] = G_ASSET_GET_SPRITE(cardFrameTag);
  result['card_frame'].addChildTo(result);//カードフレームを表示
  return result;
}

function G_CARD_SET_SIZE(card,sizeVal){ //スケール変更ではなく、サイズを変更した場合、カードサイズを調整する。
  if(isset(card['card_effect'])){
    for (var i = 0; i < card['card_effect']['frame_sprite'].length; i++) {
      card['card_effect']['frame_sprite'][i].width = card['card_effect']['frame_sprite'][i].width * sizeVal;
      card['card_effect']['frame_sprite'][i].height = card['card_effect']['frame_sprite'][i].height * sizeVal;
    }
  }
  if(isset(card['character_image'])){
    card['character_image'].width = card['character_image'].width * sizeVal;
    card['character_image'].height = card['character_image'].height * sizeVal;
  }
  if(isset(card['card_frame'])){
    card['card_frame'].width = card['card_frame'].width * sizeVal;
    card['card_frame'].height = card['card_frame'].height * sizeVal;
  }
}

function G_CARD_INFO_WINDOW_DISP(parentBase,cardMasterData){ //カード詳細ウィンドウを表示
  CARD_INFO_CATEGORY = 0;
  CARD_INFO_WINDOW = null;
  CARD_INFO_WINDOW = Sprite('ASSET_64').addChildTo(parentBase);//マスクを表示
  CARD_INFO_WINDOW['card_sprite'] = G_CARD_DISP(cardMasterData);
  CARD_INFO_WINDOW['card_sprite'].addChildTo(CARD_INFO_WINDOW);
  CARD_INFO_WINDOW['card_info_btn_sprite'] = Sprite('ASSET_247').addChildTo(CARD_INFO_WINDOW['card_sprite']); //カード詳細ボタンを表示
  CARD_INFO_WINDOW['card_info_btn_sprite'].x = CARD_INFO_WINDOW['card_info_btn_sprite'].x + ((SCREEN_WIDTH / 2) - (CARD_INFO_WINDOW['card_info_btn_sprite'].width / 2));
  CARD_INFO_WINDOW['card_info_btn_sprite'].y = CARD_INFO_WINDOW['card_info_btn_sprite'].y - ((SCREEN_HEIGHT / 2) - (CARD_INFO_WINDOW['card_info_btn_sprite'].height / 2));
  CARD_INFO_WINDOW['card_info'] = Sprite('ASSET_246').addChildTo(CARD_INFO_WINDOW['card_sprite']); //カード情報表示領域
  CARD_INFO_WINDOW['card_info'].y = CARD_INFO_WINDOW['card_info'].y + CARD_INFO_WINDOW['card_info'].height;
  CARD_INFO_WINDOW['card_info'].visible = false;
  CARD_INFO_WINDOW['card_info_text'] = LabelArea({ //情報表示用ラベルテキスト
    text: "",
    height: CARD_INFO_WINDOW['card_info'].height * 0.8,
    width: CARD_INFO_WINDOW['card_info'].width * 0.9,
    fontSize: 26,
    fill: 'white',
    align: 'left',
    baseline: 'top',
  }).addChildTo(CARD_INFO_WINDOW['card_info']);
  CARD_INFO_WINDOW['card_info_btn'] = Button({
    width: CARD_INFO_WINDOW['card_info_btn_sprite'].width,         // 横サイズ
    height: CARD_INFO_WINDOW['card_info_btn_sprite'].height,        // 縦サイズ
  }).addChildTo(CARD_INFO_WINDOW['card_info_btn_sprite']);
  CARD_INFO_WINDOW['card_info_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
    switch (CARD_INFO_CATEGORY) { //詳細カテゴリー表示処理
      case 0: //初期表示 -> カテゴリー1
      {
        CARD_INFO_CATEGORY = 1;
        CARD_INFO_WINDOW['card_info_btn_sprite'].setImage('ASSET_248');
        G_CARD_INFO_DISP(CARD_INFO_WINDOW['card_info'],cardMasterData,CARD_INFO_CATEGORY,CARD_INFO_WINDOW['card_info_text']);
      }
      break;
      case 1: //カテゴリー1 -> カテゴリー2
      {
        CARD_INFO_CATEGORY = 2;
        CARD_INFO_WINDOW['card_info_btn_sprite'].setImage('ASSET_249');
        G_CARD_INFO_DISP(CARD_INFO_WINDOW['card_info'],cardMasterData,CARD_INFO_CATEGORY,CARD_INFO_WINDOW['card_info_text']);
      }
      break;
      case 2: //カテゴリー2 -> カテゴリー3
      {
        CARD_INFO_CATEGORY = 3;
        CARD_INFO_WINDOW['card_info_btn_sprite'].setImage('ASSET_250');
        G_CARD_INFO_DISP(CARD_INFO_WINDOW['card_info'],cardMasterData,CARD_INFO_CATEGORY,CARD_INFO_WINDOW['card_info_text']);
      }
      break;
      case 3: //カテゴリー3 -> 初期表示
      {
        CARD_INFO_CATEGORY = 0;
        CARD_INFO_WINDOW['card_info_btn_sprite'].setImage('ASSET_247');
        G_CARD_INFO_DISP(CARD_INFO_WINDOW['card_info'],cardMasterData,CARD_INFO_CATEGORY,CARD_INFO_WINDOW['card_info_text']);
      }
      break;
      default:
      break;
    }
  };
  CARD_INFO_WINDOW['card_info_btn'].visible = false;
  //カード詳細閉じるボタン
  CARD_INFO_WINDOW['card_close_btn'] = Button({
    width: CARD_INFO_WINDOW['card_sprite'].width,         // 横サイズ
    height: CARD_INFO_WINDOW['card_sprite'].height,        // 縦サイズ
  }).addChildTo(CARD_INFO_WINDOW['card_sprite']);
  CARD_INFO_WINDOW['card_close_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(CARD_INFO_WINDOW['card_info_btn'].hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
    if(CARD_INFO_WINDOW != null) { //カード詳細ウィンドウを削除
      CARD_INFO_WINDOW.remove();
      CARD_INFO_WINDOW = null;
    }
  };
  CARD_INFO_WINDOW['card_close_btn'].visible = false;
}

function G_CARD_INFO_DISP(parentBase,cardMasterData,category,label){ //カード詳細を表示
  if(parentBase != null && label != null) parentBase.visible = true;
  else return false;
  switch (category) {
    case 0: //非表示
    {
      parentBase.visible = false;
      label.text = "";
    }
    break;
    case 1: //カード効果(概要)表示
    {
      label.text = cardMasterData['comment_effect'];
    }
    break;
    case 2: //カード効果(詳細)表示
    {
      label.text = cardMasterData['comment_effect_detail'];
    }
    break;
    case 3: //カード説明表示
    {
      label.text = cardMasterData['comment'];
    }
    break;
    default:
    break;
  }
  if(label.text != ""){ //,を改行文字に変換
    var replaceText = label.text.replace(/,/g,'\n');
    label.text = replaceText;
  }
  return true;
}

function G_CARD_GET_CARD_ICON_SPRITE(cardRank){ //カードアイコン画像を取得
  var sprite = null;
  sprite = G_ASSET_GET_SPRITE("card_icon_rank_" + cardRank);
  return sprite;
}

//プレイヤー所持のカードリストを生成する。
function G_CARD_LIST_CREATE(parentBase,playerCardData,windowName){
  //ASSET_261 リストセル
  if(CARD_LIST_OBJ != null){
    CARD_LIST_OBJ.remove();
    CARD_LIST_OBJ = null;
  }
  if(CARD_LIST_CELLS != null && CARD_LIST_CELLS.length != 0){
    for (var i = 0; i < CARD_LIST_CELLS.length; i++) {
      CARD_LIST_CELLS[i].remove();
      CARD_LIST_CELLS[i] = null;
    }
    CARD_LIST_CELLS = null;
  }
  CARD_LIST_OBJ = PlainElement({});
  CARD_LIST_CELLS = new Array();
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  for (var i = 0; i < playerCardData.length; i++) {
    //セル背景
    CARD_LIST_CELLS[i] = Sprite('ASSET_263').addChildTo(CARD_LIST_OBJ);
    CARD_LIST_CELLS[i].y = CARD_LIST_CELLS[i].y - listObjHeightSize;
    listObjHeightSize += CARD_LIST_CELLS[i].height;
    cellSizeHeight = CARD_LIST_CELLS[i].height;
    //カードアイコン
    CARD_LIST_CELLS[i]['card_icon'] = G_CARD_GET_CARD_ICON_SPRITE(playerCardData[i]['card_rank']);
    CARD_LIST_CELLS[i]['card_icon'].addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['card_icon'].setScale(0.8,0.8);
    CARD_LIST_CELLS[i]['card_icon'].x = CARD_LIST_CELLS[i]['card_icon'].x - ((CARD_LIST_CELLS[i].width / 2) - (CARD_LIST_CELLS[i]['card_icon'].width / 2));
    //テキストエリア
    CARD_LIST_CELLS[i]['card_info_label'] = LabelArea({
      width: CARD_LIST_CELLS[i].width,
      height: CARD_LIST_CELLS[i].height * 0.65,
      text: "",
      fontSize: 16,
      fill: 'black',
      align: 'left',
      verticalAlign: 'top',
    }).addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['card_info_label'].x = CARD_LIST_CELLS[i]['card_info_label'].x + (CARD_LIST_CELLS[i]['card_info_label'].width * 0.175);
    CARD_LIST_CELLS[i]['card_info_label'].text = playerCardData[i]['card_name'] + "\n" + "所持数:" + playerCardData[i]['num'];
    //矢印ボタン(左)
    CARD_LIST_CELLS[i]['arrow_btn_left_sprite'] = Sprite('ASSET_262').addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].scaleX *= -1;
    CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].y = CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].y + (CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].height / 2);
    //矢印ボタン(左)本体
    CARD_LIST_CELLS[i]['arrow_btn_left_btn'] = Button({
      width: CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].width,
      height: CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].height,
    }).addChildTo(CARD_LIST_CELLS[i]['arrow_btn_left_sprite']);
    CARD_LIST_CELLS[i]['arrow_btn_left_btn']['index'] = i;
    CARD_LIST_CELLS[i]['arrow_btn_left_btn']['hold_count'] = 0;
    CARD_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_left_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var nowCardNum = parseInt(CARD_LIST_CELLS[this['index']]['card_select_num_label'].text);
          nowCardNum --;
          if(nowCardNum < 0) nowCardNum = 0;
          G_CARD_LIST_SET_LABEL_NUM(parseInt(this['index']),nowCardNum);
        }
        this['hold_count'] ++;
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_left_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var nowCardNum = parseInt(CARD_LIST_CELLS[this['index']]['card_select_num_label'].text);
        nowCardNum --;
        if(nowCardNum < 0) nowCardNum = 0;
        G_CARD_LIST_SET_LABEL_NUM(parseInt(this['index']),nowCardNum);
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_left_btn'].visible = false;

    //矢印ボタン(右)
    CARD_LIST_CELLS[i]['arrow_btn_right_sprite'] = Sprite('ASSET_262').addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].y = CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].x = CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].x + (CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].width * 4);
    //矢印ボタン(右)本体
    CARD_LIST_CELLS[i]['arrow_btn_right_btn'] = Button({
      width: CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].width,
      height: CARD_LIST_CELLS[i]['arrow_btn_right_sprite'].height,
    }).addChildTo(CARD_LIST_CELLS[i]['arrow_btn_right_sprite']);
    CARD_LIST_CELLS[i]['arrow_btn_right_btn']['card_max_count'] = playerCardData[i]['num']; //最大アイテム数
    CARD_LIST_CELLS[i]['arrow_btn_right_btn']['index'] = i;
    CARD_LIST_CELLS[i]['arrow_btn_right_btn']['hold_count'] = 0; //ホールド中にカウントされる数値
    CARD_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null){
        this['hold_count'] = 0;
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_right_btn'].onpointstay = function(e){ //長押し
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        if(5 < this['hold_count']){
          this['hold_count'] = 0;
          var maxCardNum = parseInt(this['card_max_count']);
          var nowCardNum = G_CARD_LIST_GET_LABEL_NUM(parseInt(this['index']));
          nowCardNum ++;
          if(maxCardNum < nowCardNum) nowCardNum = maxCardNum;
          G_CARD_LIST_SET_LABEL_NUM(parseInt(this['index']),nowCardNum);
        }
        this['hold_count'] ++;
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_right_btn'].onpointend = function(e){
      this['hold_count'] = 0;
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
        var maxCardNum = parseInt(this['card_max_count']);
        var nowCardNum = G_CARD_LIST_GET_LABEL_NUM(parseInt(this['index']));
        nowCardNum ++;
        if(maxCardNum < nowCardNum) nowCardNum = maxCardNum;
        G_CARD_LIST_SET_LABEL_NUM(parseInt(this['index']),nowCardNum);
      }
    };
    CARD_LIST_CELLS[i]['arrow_btn_right_btn'].visible = false;
    //選択中の数値
    CARD_LIST_CELLS[i]['card_select_num_label'] = Label({
      text: '0',
      fontSize: 24,
      fill: 'black',
      align: 'center',
    }).addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['card_select_num_label'].y = CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].y;
    CARD_LIST_CELLS[i]['card_select_num_label'].x = CARD_LIST_CELLS[i]['card_select_num_label'].x + (CARD_LIST_CELLS[i]['arrow_btn_left_sprite'].width * 2);
    //決定ボタン
    CARD_LIST_CELLS[i]['decision_btn_sprite'] = Sprite('ASSET_264').addChildTo(CARD_LIST_CELLS[i]);
    CARD_LIST_CELLS[i]['decision_btn_sprite'].x = CARD_LIST_CELLS[i]['decision_btn_sprite'].x + ((CARD_LIST_CELLS[i].width / 2) - (CARD_LIST_CELLS[i]['decision_btn_sprite'].width / 2));
    //決定ボタンラベル
    CARD_LIST_CELLS[i]['decision_btn_label'] = Label({
      text: '決定',
      fontSize: 24,
      fill: 'white',
      align: 'center',
    }).addChildTo(CARD_LIST_CELLS[i]['decision_btn_sprite']);
    //決定ボタン本体
    CARD_LIST_CELLS[i]['decision_btn'] = Button({
      width: CARD_LIST_CELLS[i]['decision_btn_sprite'].width,
      height: CARD_LIST_CELLS[i]['decision_btn_sprite'].height,
    }).addChildTo(CARD_LIST_CELLS[i]['decision_btn_sprite']);
    CARD_LIST_CELLS[i]['decision_btn']['index'] = i;
    CARD_LIST_CELLS[i]['decision_btn']['select_card_data'] = playerCardData[i];
    CARD_LIST_CELLS[i]['decision_btn'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null){
      var selectCardNum = G_CARD_LIST_GET_LABEL_NUM(this['index']);
        var windowText = this['select_card_data']['card_name'] + "を使用します。\n使用する数:" + selectCardNum;
        G_NORMAL_WINDOW_CREATE(parentBase,"使用するカードの確認",windowText,1,windowName);
        CARD_LIST_SELECT_CARD = null;
        CARD_LIST_SELECT_CARD = this['select_card_data']; //選択中のアイテム情報を更新
        CARD_LIST_SELECT_CARD['select_card_num'] = selectCardNum; //選択中の個数を取得
      }
    };
    CARD_LIST_CELLS[i]['decision_btn'].visible = false;
  }
  CARD_LIST_OBJ.y = CARD_LIST_OBJ.y + ((listObjHeightSize / 2) - (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,CARD_LIST_OBJ,listObjHeightSize,"カードを選択","閉じる"); //リストを表示
}

function G_CARD_LIST_DELETE(){ //カードリストを削除する
  if(CARD_LIST_CELLS != null){
    if(CARD_LIST_CELLS.length != 0){
      for (var i = 0; i < CARD_LIST_CELLS.length; i++) {
        CARD_LIST_CELLS[i].remove();
      }
    }
    CARD_LIST_CELLS = null;
  }
  if(CARD_LIST_OBJ != null){
    CARD_LIST_OBJ.remove();
    CARD_LIST_OBJ = null;
  }
  CARD_LIST_SELECT_CARD = null;
  G_UI_WINDOW_LIST_DELETE();
}

//数値ラベルを更新する
function G_CARD_LIST_SET_LABEL_NUM(index,num){
  if(isset(CARD_LIST_CELLS[index]) && isset(CARD_LIST_CELLS[index]['card_select_num_label'])){
    CARD_LIST_CELLS[index]['card_select_num_label'].text = num;
  }
}
//数値ラベルの数値を取得
function G_CARD_LIST_GET_LABEL_NUM(index){
  var result = 0;
  if(isset(CARD_LIST_CELLS[index]) && isset(CARD_LIST_CELLS[index]['card_select_num_label'])){
    result = parseInt(CARD_LIST_CELLS[index]['card_select_num_label'].text);
  }
  return result;
}
