//============================================
//  ストーリーシーン
//============================================
//パブリック変数定義
var STORY_WINDOW_NODE = null;
var STORY_SCENE_BASE = null;
var STORY_MAIN_STORY_MASTER_DATAS = null; //メインストーリーのマスターデータ
var STORY_PLAYER_OPEN_FLAG_DATAS = null; //プレイヤーが解放したフラグのデータ
var STORY_DATA_LOAD_COMPLETE = false; //ストーリーのデータを全て読み込めたか
var STORY_UI_BTN_NUMBER = -1; //汎用ボタンID管理用
var STORY_TITLE_CELL_SPRITE = new Array(); //ストーリーのタイトル画像
var STORY_TITLE_CELL_BUTTON = new Array(); //ストーリーのボタン
var STORY_TITLE_CELL_MASK_SPRITE = new Array(); //ストーリーのタイトル画像のマスク
var STORY_TITLE_CELL_BASE = new Array(); //タイトル画像の親
var STORY_PAGE_NUMBER = 1; //現在のページ番号
var STORY_NEXT_BUTTON_MASK_SPRITE = null; //次のページボタン用マスク
var STORY_BACK_BUTTON_MASK_SPRITE = null; //前のページボタン用マスク
var STORY_SELECT_MAIN_STORY_ID = null; //選択中のストーリーID
var STORY_SELECT_MAIN_STORY_HASH = null; //チェック後発行されたハッシュ
var STORY_START_STORY_CATEGORY_ID = 0; //開始するストーリーカテゴリー
var STORY_CONTINUE_FLAG = false;//継続中のストーリーがあった場合ONになる
var STORY_PLAYER_STORY_COUNT_DATA = new Array(); //プレイヤーのストーリー進行情報
var STORY_MAIN_STORY_OPEN_FLAG_DATAS = null; //メインストーリーの解放条件一覧
phina.define("Story", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "story";
    //メンバー初期化
    STORY_WINDOW_NODE = null;
    STORY_SCENE_BASE = null;
    STORY_MAIN_STORY_MASTER_DATAS = null; //メインストーリーのマスターデータ
    STORY_PLAYER_OPEN_FLAG_DATAS = null; //プレイヤーが解放したストーリーのデータ
    STORY_DATA_LOAD_COMPLETE = false; //ストーリーのデータを全て読み込めたか
    STORY_UI_BTN_NUMBER = -1; //汎用ボタンID管理用
    STORY_TITLE_CELL_SPRITE = new Array(); //ストーリーのタイトル画像
    STORY_TITLE_CELL_BUTTON = new Array(); //ストーリーのボタン
    STORY_TITLE_CELL_MASK_SPRITE = new Array(); //ストーリーのタイトル画像のマスク
    STORY_TITLE_CELL_BASE = new Array(); //タイトル画像の親
    STORY_PAGE_NUMBER = 1; //現在のページ番号
    STORY_NEXT_BUTTON_MASK_SPRITE = null; //次のページボタン用マスク
    STORY_BACK_BUTTON_MASK_SPRITE = null; //前のページボタン用マスク
    STORY_SELECT_MAIN_STORY_ID = null; //選択中のストーリーID
    STORY_SELECT_MAIN_STORY_HASH = null; //チェック後発行されたハッシュ
    STORY_START_STORY_CATEGORY_ID = 0; //開始するストーリーカテゴリー
    STORY_CONTINUE_FLAG = false;//継続中のストーリーがあった場合ONになる
    STORY_PLAYER_STORY_COUNT_DATA = new Array(); //プレイヤーのストーリー進行情報
    STORY_MAIN_STORY_OPEN_FLAG_DATAS = null;

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    STORY_SCENE_BASE = this;
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(STORY_SCENE_BASE);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'ストーリー',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    //戻るボタン表示
    var backBtnSprite = Sprite('ASSET_79').addChildTo(STORY_SCENE_BASE);
    backBtnSprite.x = this.gridX.center();
    backBtnSprite.y = backBtnSprite.height * 1.75;

    Label({
      text: '戻る',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(backBtnSprite);

    var backBtn = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(backBtnSprite);
    backBtn.visible = false;

    backBtn.onpointend = function(e){// 戻るボタンが押された時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        STORY_UI_BTN_NUMBER = 1;
      }
    };

    //次のページボタン表示
    var nextPageBtnSprite = Sprite('ASSET_79').addChildTo(STORY_SCENE_BASE);
    nextPageBtnSprite.x = this.gridX.center() * 1.6;
    nextPageBtnSprite.y = nextPageBtnSprite.height * 1.75;

    Label({
      text: '→',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(nextPageBtnSprite);

    var nextPageBtn = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(nextPageBtnSprite);
    nextPageBtn.visible = false;

    nextPageBtn.onpointend = function(e){// 次のページボタンが押された時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        STORY_UI_BTN_NUMBER = 2;
      }
    };
    STORY_NEXT_BUTTON_MASK_SPRITE = Sprite('ASSET_101').addChildTo(nextPageBtnSprite);//次のページボタン用マスク
    STORY_NEXT_BUTTON_MASK_SPRITE.visible = false;

    //前のページボタン表示
    var backPageBtnSprite = Sprite('ASSET_79').addChildTo(STORY_SCENE_BASE);
    backPageBtnSprite.x = this.gridX.center() * 0.4;
    backPageBtnSprite.y = backPageBtnSprite.height * 1.75;

    Label({
      text: '←',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(backPageBtnSprite);

    var backPageBtn = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(backPageBtnSprite);
    backPageBtn.visible = false;

    backPageBtn.onpointend = function(e){// 前のページボタンが押された時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        STORY_UI_BTN_NUMBER = 3;
      }
    };
    STORY_BACK_BUTTON_MASK_SPRITE = Sprite('ASSET_101').addChildTo(backPageBtnSprite);//前のページボタン用マスク
    STORY_BACK_BUTTON_MASK_SPRITE.visible = true;

    var titleSellPosY = 0.575;
    for (var i = 0; i < 3; i++) { //ストーリータイトル画像表示
      STORY_TITLE_CELL_BASE[i] = PlainElement({
      width: this.gridX.width,
      height: this.gridY.width,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center() * titleSellPosY);

      STORY_TITLE_CELL_SPRITE[i] = Sprite('ASSET_92').addChildTo(STORY_TITLE_CELL_BASE[i]); //初期画像
      // STORY_TITLE_CELL_SPRITE[i].x = this.gridX.center();
      // STORY_TITLE_CELL_SPRITE[i].y = this.gridX.center() * titleSellPosY;

      STORY_TITLE_CELL_BUTTON[i] = Button({
        width: 580,         // 横サイズ
        height: 216,        // 縦サイズ
      }).addChildTo(STORY_TITLE_CELL_BASE[i]);
      STORY_TITLE_CELL_BUTTON[i].visible = false;

      STORY_TITLE_CELL_MASK_SPRITE[i] = Sprite('ASSET_100').addChildTo(STORY_TITLE_CELL_BASE[i]); //マスク用画像

      titleSellPosY = titleSellPosY + 0.525;
    }
    STORY_TITLE_CELL_BUTTON[0].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        console.log("ボタン1");
        G_STORY_TITLE_CELL_BUTTON_PUSH(STORY_PAGE_NUMBER,1,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
      }
    };
    STORY_TITLE_CELL_BUTTON[1].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        console.log("ボタン2");
        G_STORY_TITLE_CELL_BUTTON_PUSH(STORY_PAGE_NUMBER,2,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
      }
    };
    STORY_TITLE_CELL_BUTTON[2].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null){
        console.log("ボタン3");
        G_STORY_TITLE_CELL_BUTTON_PUSH(STORY_PAGE_NUMBER,3,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
      }
    };
    //ウィンドウ表示用ノード
    STORY_WINDOW_NODE = PlainElement({
    }).addChildTo(this);
    STORY_WINDOW_NODE.x = this.gridX.center();
    STORY_WINDOW_NODE.y = this.gridY.center();
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/story/story.php",null); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != ""){
      console.log(RESULT_DATA);
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["player_master"])){
            PLAYER_MASTER = json["player_master"];//プレイヤーマスターデータを更新
          }
          if(isset(json["player_info"])){
            PLAYER_INFO = json["player_info"];//プレイヤー情報を更新
          }
          if(isset(json["player_status"])){
            PLAYER_STATUS = json["player_status"];//プレイヤーステータスを更新
          }
          if(isset(json["main_story_master_datas"])){
            STORY_MAIN_STORY_MASTER_DATAS = json["main_story_master_datas"];//メインストーリーのマスターデータ取得
          }
          if(isset(json["player_open_flags"])){
            STORY_PLAYER_OPEN_FLAG_DATAS = json["player_open_flags"];//プレイヤーが開放したフラグ
          }
          if(isset(json["check_main_story"])){ //ストーリー開放チェック用パラメーター
            STORY_SELECT_MAIN_STORY_HASH = json["check_main_story"];
            STORY_START_STORY_CATEGORY_ID = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][0]['event_category_id']; //開始のストーリーカテゴリーを更新
          }
          if(isset(json["check_main_story_continue"])){ //継続中のストーリーがあった場合だけ返す値
            STORY_PLAYER_STORY_COUNT_DATA = json["check_main_story_continue"];
            STORY_CONTINUE_FLAG = true; //継続のストーリー発見のため、フラグを更新
            G_NORMAL_WINDOW_CREATE(STORY_WINDOW_NODE,"継続中のストーリーを発見","継続中のストーリがありました。\n続きから開始しますか？",1,"windowContinueEventStanby");
          }
          if(isset(json["result_continue_player_event_count"])){ //継続ストーリー情報の結果を取得
            var resultPlayerEventCount = json["result_continue_player_event_count"];
            STORY_SELECT_MAIN_STORY_HASH['player_event_count'] = (resultPlayerEventCount - 1);
            STORY_START_STORY_CATEGORY_ID = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][resultPlayerEventCount - 1]['event_category_id']; //開始のストーリーカテゴリーを更新
            STORY_CONTINUE_FLAG = false; //継続のストーリー発見のため、フラグを更新
          }
          if(isset(json["main_story_open_flags"])){ //メインストーリーの解放条件一覧を取得
            STORY_MAIN_STORY_OPEN_FLAG_DATAS = json["main_story_open_flags"];
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          SCENE_MANAGER['prev_scene'] = "story";
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "story";
        this.exit("title");
      }
      NETWORK_IS_CONNECTING = false;
      RESULT_DATA = "";//通信結果を初期化
    }

    if(STORY_MAIN_STORY_MASTER_DATAS != null && STORY_PLAYER_OPEN_FLAG_DATAS != null &&
      STORY_DATA_LOAD_COMPLETE == false && STORY_MAIN_STORY_OPEN_FLAG_DATAS != null){ //ストーリーデータ読み込み確認
      STORY_DATA_LOAD_COMPLETE = true;
      G_STORY_MAIN_STORY_PAGE_UPDATE(1,STORY_TITLE_CELL_BASE,STORY_TITLE_CELL_SPRITE,
        STORY_TITLE_CELL_MASK_SPRITE,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
    }

    if(STORY_UI_BTN_NUMBER != -1){ //通常ボタンの何かが押された場合
      switch (STORY_UI_BTN_NUMBER) {
        case 1: //戻るボタン
        SCENE_MANAGER['prev_scene'] = "story";
        this.exit("myPage");
          break;
        case 2: //次に進むボタン
        if(STORY_DATA_LOAD_COMPLETE == true){
          STORY_PAGE_NUMBER = STORY_PAGE_NUMBER + 1;
          G_STORY_MAIN_STORY_PAGE_UPDATE(STORY_PAGE_NUMBER,STORY_TITLE_CELL_BASE,STORY_TITLE_CELL_SPRITE,
            STORY_TITLE_CELL_MASK_SPRITE,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
        }
          break;
        case 3: //前に戻るボタン
        if(STORY_DATA_LOAD_COMPLETE == true){
          STORY_PAGE_NUMBER = STORY_PAGE_NUMBER - 1;
          G_STORY_MAIN_STORY_PAGE_UPDATE(STORY_PAGE_NUMBER,STORY_TITLE_CELL_BASE,STORY_TITLE_CELL_SPRITE,
            STORY_TITLE_CELL_MASK_SPRITE,STORY_MAIN_STORY_MASTER_DATAS,STORY_PLAYER_OPEN_FLAG_DATAS,STORY_MAIN_STORY_OPEN_FLAG_DATAS);
        }
          break;
        default:

      }
      STORY_UI_BTN_NUMBER = -1;
    }

    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(isset(WINDOW_RETURN_VAL['windowMainStoryStanby'])){
        if(WINDOW_RETURN_VAL['windowMainStoryStanby'] == "yes"){ //ストーリー開始を選択した場合
          AREA_MODE = 0; //プレイヤーストーリーエリアを設定
          if(PLAYER_BATTLE_INSTANCE != null){ //マップデータがある場合は削除
            PLAYER_BATTLE_INSTANCE = null;
          }
          console.log("開始ストーリー：" + STORY_SELECT_MAIN_STORY_ID);
          var postParamVal = new Object();
          postParamVal['player_main_story_stanby'] = STORY_SELECT_MAIN_STORY_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/story/story.php",postParamVal); //非同期通信開始
        }
      }
      if(isset(WINDOW_RETURN_VAL['windowContinueEventStanby'])){
        if(WINDOW_RETURN_VAL['windowContinueEventStanby'] == "yes"){ //継続スタートを選択した場合
          var postParamVal = new Object();
          postParamVal['player_story_continue_result'] = 1;
          postParamVal['player_continue_story_id'] = STORY_SELECT_MAIN_STORY_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/story/story.php",postParamVal); //非同期通信開始
        }
        if(WINDOW_RETURN_VAL['windowContinueEventStanby'] == "no"){ //継続スタートをキャンセルした場合
          var postParamVal = new Object();
          postParamVal['player_story_continue_result'] = 0;
          postParamVal['player_continue_story_id'] = STORY_SELECT_MAIN_STORY_ID;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/story/story.php",postParamVal); //非同期通信開始
        }
      }
      WINDOW_RETURN_VAL = null;
    }

    if(STORY_START_STORY_CATEGORY_ID != 0){ //開始ストーリーのカテゴリーが決まった場合
      if(STORY_CONTINUE_FLAG == false){ //ストーリー継続チェックフラグがオフになった場合
        switch (STORY_START_STORY_CATEGORY_ID) {
          case "1":
          SCENE_MANAGER['prev_scene'] = "story";
          this.exit("comm");
            break;
          case "2":
          SCENE_MANAGER['prev_scene'] = "story";
          this.exit("map");
            break;
          case "3":
            break;
          default:
          console.log("カテゴリーが見つからなかった");
            break;
        }
      }
    }
  },
});

function G_STORY_MAIN_STORY_PAGE_UPDATE(pageNumber,storyTitleCellBase,storyTitleCellSprite,storyTitleCellMaskSprite,mainStoryDatas,playerOpenFlagDatas,mainStoryOpenFlags){ //ページの表示を更新
  var maxPage = G_GET_STORY_MAIN_STORY_MAX_PAGE(mainStoryDatas); //最大ページ数取得
  G_STORY_PAGE_BUTTON_VISIBLE_UPDATE(pageNumber,maxPage); //ページ切り替えボタンのvisibleを更新
  if(1 <= pageNumber){
    if(pageNumber <= maxPage){
      if(mainStoryDatas != null && playerOpenFlagDatas != null){
        var pageStartCountInit = ((pageNumber - 1) * 3);
        var spriteCount = 0;
        for (var i = pageStartCountInit; i < (pageStartCountInit + 3); i++) {
          if(isset(mainStoryDatas[i])){
            storyTitleCellSprite[spriteCount].remove();
            storyTitleCellMaskSprite[spriteCount].remove();
            storyTitleCellSprite[spriteCount] = Sprite('ASSET_' + mainStoryDatas[i]['asset_id_title_cell']).addChildTo(storyTitleCellBase[spriteCount]);
            storyTitleCellMaskSprite[spriteCount] = Sprite('ASSET_100').addChildTo(storyTitleCellBase[spriteCount]);
            // for(var j = 0; j < playerOpenFlagDatas.length; j++){
            //   if(playerOpenFlagDatas[j]['open_flag_id'] == mainStoryDatas[i]['open_flag_id']){//開放されたストーリーの場合
            //     storyTitleCellMaskSprite[spriteCount].visible = false;
            //     break;
            //   }
            // }
            var groupFlag = false;
            var groupOpen = false;
            for(var sf = 0; sf < mainStoryOpenFlags.length; sf++){
              var openFlag = false;
              if(mainStoryOpenFlags[sf]['main_story_id'] == mainStoryDatas[i]['id']){
                groupOpen = false;
                for(var pf = 0; pf < playerOpenFlagDatas.length; pf++){
                  if(playerOpenFlagDatas[pf]['open_flag_id'] == mainStoryOpenFlags[sf]['open_flag_id']){//開放されたストーリーの場合
                    storyTitleCellMaskSprite[spriteCount].visible = false;
                    openFlag = true;
                    if(mainStoryOpenFlags[sf]['group_flag'] != 0){ //グループ達成の場合
                      groupFlag = true;
                    }
                    groupOpen = true;
                    break;
                  }
                }
                if(openFlag == true && groupFlag == false){
                  break;
                }
              }
            }
            if(groupFlag == true){
              if(groupOpen == true){ //グループで達成していた場合
                storyTitleCellMaskSprite[spriteCount].visible = false;
              }
              else{
                storyTitleCellMaskSprite[spriteCount].visible = true;
              }
            }
          }
          else{
            storyTitleCellSprite[spriteCount].remove();
            storyTitleCellMaskSprite[spriteCount].remove();
          }
          spriteCount = spriteCount + 1;
        }
      }
    }
    else{
      STORY_PAGE_NUMBER = maxPage;
    }
  }
  else{
    STORY_PAGE_NUMBER = 1;
  }
}

function G_GET_STORY_MAIN_STORY_MAX_PAGE(mainStoryDatas){
  var resultMaxPage = 1;
  var maxColumnCount = 3;
  var count = 0;
  for (var i = 0; i < mainStoryDatas.length; i++) {
      count = count + 1;
  }
  resultMaxPage = Math.floor(count / maxColumnCount) + 1;
  return resultMaxPage;
}

function G_STORY_PAGE_BUTTON_VISIBLE_UPDATE(pageNumber,maxPage){
  if(pageNumber <= 1){
    STORY_BACK_BUTTON_MASK_SPRITE.visible = true;
  }
  else{
    STORY_BACK_BUTTON_MASK_SPRITE.visible = false;
  }
  if(maxPage <= pageNumber){
    STORY_NEXT_BUTTON_MASK_SPRITE.visible = true;
  }
  else{
    STORY_NEXT_BUTTON_MASK_SPRITE.visible = false;
  }
}

function G_STORY_TITLE_CELL_BUTTON_PUSH(pageNumber,buttonNumber,mainStoryDatas,playerOpenFlagDatas,mainStoryOpenFlags){ //タイトル見出しボタンが押された時に呼び出す。返り値 mainStoryData
  if(mainStoryDatas != null && playerOpenFlagDatas != null){
    var index = ((pageNumber - 1) * 3) + (buttonNumber - 1);
    if(isset(mainStoryDatas[index])){
      var storyOpenFlag = false;
      // for(var j = 0; j < playerOpenFlagDatas.length; j++){
      //   if(playerOpenFlagDatas[j]['open_flag_id'] == mainStoryDatas[index]['open_flag_id']){//開放されたストーリーの場合
      //     storyOpenFlag = true;
      //     break;
      //   }
      // }
      var groupFlag = false;
      var groupOpen = false;
      for(var sf = 0; sf < mainStoryOpenFlags.length; sf++){
        var openFlag = false;
        if(mainStoryOpenFlags[sf]['main_story_id'] == mainStoryDatas[index]['id']){
          groupOpen = false;
          for(var pf = 0; pf < playerOpenFlagDatas.length; pf++){
            if(playerOpenFlagDatas[pf]['open_flag_id'] == mainStoryOpenFlags[sf]['open_flag_id']){//開放されたストーリーの場合
              storyOpenFlag = true;
              openFlag = true;
              if(mainStoryOpenFlags[sf]['group_flag'] != 0){ //グループ達成の場合
                groupFlag = true;
              }
              groupOpen = true;
              break;
            }
          }
          if(openFlag == true && groupFlag == false){
            break;
          }
        }
      }
      if(groupFlag == true ){
        if(groupOpen == true){ //グループで達成していた場合
          storyOpenFlag = true;
        }
        else{
          storyOpenFlag = false;
        }
      }
      if(storyOpenFlag == true){ //開放されたストーリーの場合
        STORY_SELECT_MAIN_STORY_ID = mainStoryDatas[index]['id']; //選択中のストーリーIDを更新
        var storyStanbyDialogMainText = "「" + mainStoryDatas[index]['story_name'] + "」を開始します";
        G_NORMAL_WINDOW_CREATE(STORY_WINDOW_NODE,"ストーリー開始の確認",storyStanbyDialogMainText,1,"windowMainStoryStanby");
      }
      else{
        var resultText = "";
        var openDialogText = "";
        var openDialogMainText = "[以下のいずれかの条件を達成]";
        if(groupFlag == true){
          openDialogMainText = "[以下の全ての条件を達成]";
        }
        var match = false; //解放条件が存在したか。
        //開放条件ダイアログを表示
        for(var j = 0; j < mainStoryOpenFlags.length; j++){
          if(mainStoryDatas[index]['id'] == mainStoryOpenFlags[j]['main_story_id']){
            match = true;
            openDialogText = openDialogText + "\n・" + mainStoryOpenFlags[j]['comment']; //解放条件のコメントを更新
          }
        }
        if(match != false){ //解放条件が存在すれば
          //openDialogMainText = mainStoryDatas[index - 1]['story_name'] + "をクリアして開放";
          resultText = openDialogMainText + openDialogText;
        }
        G_NORMAL_WINDOW_CREATE(STORY_WINDOW_NODE,"ストーリー開放条件",resultText,0,"windowMainStoryOpenFlag");
      }
    }
  }
}
