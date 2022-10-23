//============================================
//  会話シーン
//============================================
//パブリック変数定義
var COMM_ANIM_FLAG = false; //アニメーション再生中か。
var COMM_RESULT_COMM_DATA = null; //会話データ
var COMM_DATA_LOAD_COMPLETE = false; //会話データのロードが完了したか。
var COMM_COMM_SCENE_BASE = null; //会話シーンの親ノード
var COMM_COMM_SCENE_GAME_LAYER = null; //会話シーンのゲーム用レイヤー
var COMM_COMM_SCENE_CHARA_LAYER = null; //会話シーンのゲーム用レイヤー
var COMM_COMM_SCENE_UI_LAYER = null; //会話シーンのUI用レイヤー
var COMM_BACKGROUND_SPRITE = null; //背景画像
var COMM_ANIM_MASK_SPRITE = null; //マスクアニメーション画像
var COMM_MESSAGE_WINDOW = null; //メッセージ表示用ウィンドウ
var COMM_MENU_BUTTON = null; //メユーボタン
var COMM_CHARA_RIGHT_SPRITE = null; //右側に立っているキャラクターのスプライト
var COMM_CHARA_LEFT_SPRITE = null; //右側に立っているキャラクターのスプライト
var COMM_SPEAK_CHARA_ID = null; //発言しているキャラクターID
var COMM_CHARA_RIGHT_ID = null; //右側に立っているキャラクターID
var COMM_CHARA_LEFT_ID = null; //左側に立っているキャラクターID
var COMM_MESSAGE_TEXT = null; //表示するテキスト
var COMM_START_SCENE = false; //会話シーンが開始されたか
var COMM_SCENE_NUMBER = 0; //再生する会話シーンの番号
var COMM_MASK_ANIM_RELOAD = false; //マスクアニメーションのリロード中
var COMM_MASK_ANIM_RELOAD_COMP = false; //マスクの塗り潰しが完了したか。
var COMM_SPEAK_CAHAR_NAME_TEXT = null; //会話しているキャラクター名
var COMM_SCENE_FINISH = false; //会話シーンの終了フラグ
var COMM_MASK_ANIM_FINISH = false; //終了用のマスクアニメーション開始フラグ
var COMM_PLAYER_SELECT_STORY_DATA = null; //プレイヤーが選択中の
var COMM_RESULT_COMM_CLEAR = null; //会話クリア後に発行されるイベントデータ
var COMM_WINDOW_LAYER = null; //会話シーンウィンドウ表示レイヤー
phina.define("Comm", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "comm";
    //メンバー初期化
    COMM_ANIM_FLAG = false; //アニメーション再生中か。
    COMM_RESULT_COMM_DATA = null; //会話データ
    COMM_DATA_LOAD_COMPLETE = false; //会話データのロードが完了したか。
    COMM_COMM_SCENE_BASE = null; //会話シーンの親ノード
    COMM_COMM_SCENE_GAME_LAYER = null; //会話シーンのゲーム用レイヤー
    COMM_COMM_SCENE_CHARA_LAYER = null; //会話シーンのゲーム用レイヤー
    COMM_COMM_SCENE_UI_LAYER = null; //会話シーンのUI用レイヤー
    COMM_BACKGROUND_SPRITE = null; //背景画像
    COMM_ANIM_MASK_SPRITE = null; //マスクアニメーション画像
    COMM_MESSAGE_WINDOW = null; //メッセージ表示用ウィンドウ
    COMM_MENU_BUTTON = null; //メユーボタン
    COMM_CHARA_RIGHT_SPRITE = null; //右側に立っているキャラクターのスプライト
    COMM_CHARA_LEFT_SPRITE = null; //右側に立っているキャラクターのスプライト
    COMM_SPEAK_CHARA_ID = null; //発言しているキャラクターID
    COMM_CHARA_RIGHT_ID = null; //右側に立っているキャラクターID
    COMM_CHARA_LEFT_ID = null; //左側に立っているキャラクターID
    COMM_MESSAGE_TEXT = null; //表示するテキスト
    COMM_START_SCENE = false; //会話シーンが開始されたか
    COMM_SCENE_NUMBER = 0; //再生する会話シーンの番号
    COMM_MASK_ANIM_RELOAD = false; //マスクアニメーションのリロード中
    COMM_MASK_ANIM_RELOAD_COMP = false; //マスクの塗り潰しが完了したか。
    COMM_SPEAK_CAHAR_NAME_TEXT = null; //会話しているキャラクター名
    COMM_SCENE_FINISH = false; //会話シーンの終了フラグ
    COMM_MASK_ANIM_FINISH = false; //終了用のマスクアニメーション開始フラグ
    COMM_PLAYER_SELECT_STORY_DATA = null; //プレイヤーが選択中の
    COMM_RESULT_COMM_CLEAR = null; //会話クリア後に発行されるイベントデータ
    COMM_WINDOW_LAYER = null; //会話シーンウィンドウ表示レイヤー
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'white';

    var sceneObj = this;

    COMM_COMM_SCENE_BASE = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
  }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

COMM_COMM_SCENE_GAME_LAYER = PlainElement({ //シーンのゲーム用レイヤー生成
width: this.gridX.width,
height: this.gridY.height,
}).addChildTo(COMM_COMM_SCENE_BASE);

COMM_COMM_SCENE_CHARA_LAYER = PlainElement({ //シーンのキャラ用レイヤー生成
width: this.gridX.width,
height: this.gridY.height,
}).addChildTo(COMM_COMM_SCENE_BASE);

COMM_COMM_SCENE_UI_LAYER = PlainElement({ //シーンのUI用レイヤー生成
width: this.gridX.width,
height: this.gridY.height,
}).addChildTo(COMM_COMM_SCENE_BASE);

COMM_WINDOW_LAYER = PlainElement({ //ウィンドウ表示レイヤー
}).addChildTo(this).setPosition(this.gridX.center(),this.gridY.center());

  COMM_BACKGROUND_SPRITE = Sprite('ASSET_106').addChildTo(COMM_COMM_SCENE_GAME_LAYER); //背景画像初期化
  COMM_CHARA_RIGHT_SPRITE = Sprite('ASSET_106').addChildTo(COMM_COMM_SCENE_CHARA_LAYER); //キャラクター右側の画像
  COMM_CHARA_LEFT_SPRITE = Sprite('ASSET_106').addChildTo(COMM_COMM_SCENE_CHARA_LAYER); //キャラクター左側の画像
  COMM_ANIM_MASK_SPRITE = Sprite('ASSET_102').addChildTo(COMM_COMM_SCENE_UI_LAYER); //マスクアニメーション画像
  COMM_MESSAGE_WINDOW = Sprite('ASSET_103').addChildTo(COMM_COMM_SCENE_UI_LAYER); //メッセージ表示用ウィンドウ
  //COMM_MESSAGE_WINDOW.y = this.gridY.center() * 1.5;
  COMM_MENU_BUTTON = Sprite('ASSET_104').addChildTo(COMM_COMM_SCENE_UI_LAYER); //メニューボタン
  COMM_MENU_BUTTON.x = this.gridX.center() * 0.7;
  COMM_MENU_BUTTON.y = this.gridY.center() * -0.9;
  var menuBtn = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(COMM_MENU_BUTTON);
  menuBtn.visible = false;
  menuBtn.onpointend = function(e){// メニューボタンが押された時
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null && SHORT_MENU_WINDOW == null){
      //メニューボタンの処理
      G_CREATE_SHORT_MENU_WINDOW(sceneObj,COMM_WINDOW_LAYER); //ショートメニューを表示
    }
  };

  COMM_MESSAGE_TEXT = Label({ //表示メッセージ
    text: '',
    fontSize: 27,
    fill: 'white',
    align: 'left',
  }).addChildTo(COMM_COMM_SCENE_UI_LAYER);
  COMM_MESSAGE_TEXT.x = this.gridX.center() * - 0.9;
  COMM_MESSAGE_TEXT.y = this.gridY.center() * 0.45;

  COMM_SPEAK_CAHAR_NAME_TEXT = Label({ //会話中のキャラ名
    text: '',
    fontSize: 30,
    fill: 'white',
    align: 'center',
  }).addChildTo(COMM_COMM_SCENE_UI_LAYER);
  COMM_SPEAK_CAHAR_NAME_TEXT.x = this.gridX.center() * - 0.44;
  COMM_SPEAK_CAHAR_NAME_TEXT.y = this.gridY.center() * 0.28;

  var messageBtn = Button({
    width: 640,         // 横サイズ
    height: 320,        // 縦サイズ
  }).addChildTo(COMM_COMM_SCENE_BASE);
  messageBtn.y = this.gridY.center() * 0.65;
  messageBtn.visible = false;
  messageBtn.onpointend = function(e){// メッセージボタンが押された時
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(COMM_START_SCENE == true && COMM_MASK_ANIM_RELOAD == false && NETWORK_IS_CONNECTING == false && CHAT_WINDOW == null && SHORT_MENU_WINDOW == null){
      if(COMM_SCENE_NUMBER < (COMM_RESULT_COMM_DATA['sceneDatas'].length - 1)){
        COMM_SCENE_NUMBER = COMM_SCENE_NUMBER + 1;
        var resultCommSetData = G_COMM_SET_COMM_DATA(COMM_SCENE_NUMBER,COMM_RESULT_COMM_DATA,true);
        if(resultCommSetData == 1){ //マスクアニメーション開始
          COMM_MASK_ANIM_RELOAD = true;
        }
      }
      else{ //最終ページを過ぎた場合
        if(COMM_SCENE_FINISH == false){ //シーン終了処理を開始
          COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
          COMM_MESSAGE_TEXT.text = "";
          COMM_MASK_ANIM_FINISH = true; //終了用マスクアニメーション開始
          COMM_SCENE_FINISH = true;
        }
      }
    }
  };

    var initPostParamVal = new Object();
    if(STORY_SELECT_MAIN_STORY_HASH != null){
      console.log(STORY_SELECT_MAIN_STORY_HASH);
      var eventCount = 0;
      if(isset(STORY_SELECT_MAIN_STORY_HASH['player_event_count'])){
        eventCount = STORY_SELECT_MAIN_STORY_HASH['player_event_count'];
      }
      initPostParamVal['set_comm_id'] = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]['event_target_id'];
      initPostParamVal['check_story_id'] = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]['main_story_master_id'];
      COMM_PLAYER_SELECT_STORY_DATA = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]; //進行中のストーリーデータを取得
      initPostParamVal['check_player_event_count'] = (eventCount + 1);//データベース参照用のため + 1する
    }
    else{
      initPostParamVal['set_comm_id'] = false;
    }
    NETWORK_IS_CONNECTING = true;//通信開始
    ajaxStart("post","json","../../client/comm/comm.php",initPostParamVal); //非同期通信開始
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
          if(isset(json["result_comm_data"])){
            COMM_RESULT_COMM_DATA = json["result_comm_data"];//会話データ取得
          }
          if(isset(json["result_comm_clear"])){ //会話クリア
            COMM_RESULT_COMM_CLEAR = json['result_comm_clear'];
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          SCENE_MANAGER['prev_scene'] = "comm";
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "comm";
        this.exit("title");
      }
      NETWORK_IS_CONNECTING = false;//通信終了
      RESULT_DATA = "";//通信結果を初期化
    }

    if(COMM_RESULT_COMM_CLEAR != null){ //会話クリアのデータ通信が完了した場合
      console.log("会話イベント完了");
      console.log(COMM_RESULT_COMM_CLEAR);
      if(COMM_RESULT_COMM_CLEAR != true){ //続きのイベントがある場合
        console.log("続きのイベント");
        console.log(COMM_RESULT_COMM_CLEAR);
        STORY_SELECT_MAIN_STORY_HASH['player_event_count'] = (COMM_RESULT_COMM_CLEAR['event_count'] - 1); //イベント進行度を更新
        var nextEventCategoryId = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][STORY_SELECT_MAIN_STORY_HASH['player_event_count']]['event_category_id'];
        switch (nextEventCategoryId) {
          case "1":
          SCENE_MANAGER['prev_scene'] = "comm";
          this.exit("comm");
            break;
          case "2":
          SCENE_MANAGER['prev_scene'] = "comm";
          this.exit("map");
            break;
          case "3":
            break;
          default:
          console.log("カテゴリーが見つからなかった");
            break;
        }
      }
      else{ //終了した場合、ストーリー画面に戻る。
        SCENE_MANAGER['prev_scene'] = "comm";
        this.exit("story");
      }
      COMM_RESULT_COMM_CLEAR = null;
    }

    if(COMM_DATA_LOAD_COMPLETE == false && COMM_RESULT_COMM_DATA != null){ //会話データのロードが完了した場合
      COMM_DATA_LOAD_COMPLETE = true;
      G_COMM_COMM_SCENE_INIT(COMM_RESULT_COMM_DATA,0); //会話シーン初期表示
      COMM_ANIM_FLAG = true; //アニメーション開始
    }
    if(COMM_ANIM_MASK_SPRITE != null && COMM_ANIM_FLAG == true){ //アニメーションが開始されている時

        COMM_ANIM_MASK_SPRITE.alpha -= 0.025;

      if(COMM_ANIM_MASK_SPRITE.alpha < 0){ //マスクアニメーション終了
        COMM_ANIM_MASK_SPRITE.alpha = 0;
        COMM_ANIM_FLAG = false;
        COMM_START_SCENE = true;
        G_COMM_SET_COMM_DATA(COMM_SCENE_NUMBER,COMM_RESULT_COMM_DATA,false);
      }
    }
    if(COMM_MASK_ANIM_RELOAD == true){ //マスクのリロードが再開した。
      if(COMM_MASK_ANIM_RELOAD_COMP == false){//塗り潰し中
        COMM_ANIM_MASK_SPRITE.alpha += 0.025;
        if(1 < COMM_ANIM_MASK_SPRITE.alpha){ //最大まで塗り潰したら
          G_COMM_COMM_SCENE_INIT(COMM_RESULT_COMM_DATA,COMM_SCENE_NUMBER);
          COMM_ANIM_MASK_SPRITE.alpha = 1;
          COMM_MASK_ANIM_RELOAD_COMP = true;
        }
      }
      else{ //元に戻す
        COMM_ANIM_MASK_SPRITE.alpha -= 0.025;
        if(COMM_ANIM_MASK_SPRITE.alpha < 0){//マスクアニメーション終了
          COMM_ANIM_MASK_SPRITE.alpha = 0;
          COMM_MASK_ANIM_RELOAD_COMP = false;
          COMM_MASK_ANIM_RELOAD = false;
          G_COMM_SET_COMM_DATA(COMM_SCENE_NUMBER,COMM_RESULT_COMM_DATA,false); //最初に表示する会話データをセット
        }
      }
    }
    if(COMM_SCENE_FINISH == true && COMM_MASK_ANIM_FINISH == true){ //会話シーンが終了した場合、マスクアニメーション開始
      COMM_ANIM_MASK_SPRITE.alpha += 0.025;
      if(1 < COMM_ANIM_MASK_SPRITE.alpha){ //最大まで塗り潰したら
        COMM_ANIM_MASK_SPRITE.alpha = 1;
        COMM_MASK_ANIM_FINISH = false; //マスクアニメーション終了
        var initPostParamVal = new Object();
        initPostParamVal['end_comm_scene'] = COMM_PLAYER_SELECT_STORY_DATA;
        NETWORK_IS_CONNECTING = true;//通信開始
        ajaxStart("post","json","../../client/comm/comm.php",initPostParamVal); //非同期通信開始
      }
    }
  },
});

function G_COMM_SET_COMM_DATA(pageNumber,commData,maskFlag){ //会話データをセットする。
  if(commData != null){
    if(isset(commData['sceneDatas'])){
      for(var i = 0; i < commData['sceneDatas'].length; i++){
        if(pageNumber == i){ //表示するページと一致した場合
          if(pageNumber != 0){
            var prevBgId = commData['sceneDatas'][i - 1]['backGroundId']; //前ページの背景ID
            var nowBgId = commData['sceneDatas'][i]['backGroundId']; //今のページの背景ID
            if(prevBgId != nowBgId && maskFlag == true){ //前ページから背景画像が変わった場合、マスク処理を実行する。
              COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
              COMM_MESSAGE_TEXT.text = "";
              return 1;//マスク処理の返り値
            }
          }
          COMM_MESSAGE_TEXT.text = commData['sceneDatas'][i]['comment']; //テキストを表示
          if(isset(commData['charaDatas']) && isset(commData['sceneDatas'][i]['speakChara'])){
            for(var cd = 0; cd < commData['charaDatas'].length; cd++){
              if(commData['charaDatas'][cd]['id'] == commData['sceneDatas'][i]['speakChara']){
                COMM_SPEAK_CAHAR_NAME_TEXT.text = commData['charaDatas'][cd]['name']; //キャラ名を表示
              }
            }
          }
          else{
            COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
          }
          if(pageNumber != 0){
            var prevLeftCharaId = commData['sceneDatas'][i - 1]['charaLId']; //前ページの背景ID
            var nowLeftCharaId = commData['sceneDatas'][i]['charaLId']; //今のページの背景ID
            var prevRightCharaId = commData['sceneDatas'][i - 1]['charaRId']; //前ページの背景ID
            var nowRightCharaId = commData['sceneDatas'][i]['charaRId']; //今のページの背景ID
            if(prevLeftCharaId != nowLeftCharaId){//前ページからキャラ画像が変わった場合、更新。
              if(isset(commData['charaDatas'])){
                if(nowLeftCharaId != 0){//キャラが非表示ではない場合
                  var leftCharaAssetFullId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],nowLeftCharaId);
                  if(leftCharaAssetFullId != -1){
                    COMM_CHARA_LEFT_SPRITE.remove();
                    COMM_CHARA_LEFT_SPRITE = Sprite('ASSET_' + leftCharaAssetFullId).addChildTo(COMM_COMM_SCENE_CHARA_LAYER);
                  }
                }
                else{
                  COMM_CHARA_LEFT_SPRITE.remove();
                }
              }

            }
            if(prevRightCharaId != nowRightCharaId){//前ページからキャラ画像が変わった場合、更新。
              if(isset(commData['charaDatas'])){
                if(nowRightCharaId != 0){//キャラが非表示ではない場合
                  var rightCharaAssetFullId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],nowRightCharaId);
                  if(rightCharaAssetFullId != -1){
                    COMM_CHARA_RIGHT_SPRITE.remove();
                    COMM_CHARA_RIGHT_SPRITE = Sprite('ASSET_' + rightCharaAssetFullId).addChildTo(COMM_COMM_SCENE_CHARA_LAYER);
                    COMM_CHARA_RIGHT_SPRITE.scaleX *= -1;
                  }
                }
                else{
                  COMM_CHARA_RIGHT_SPRITE.remove();
                }
              }
            }
          }
          return 0;//通常の返り値
        }
      }
    }
  }
}

function G_COMM_GET_BG_ASSET_ID(bgDatas,bgId){ //背景IDから背景のアセットIDを取得する。
  var bgAssetId = -1;
  for(var i = 0; i < bgDatas.length; i++){
    if(bgId == bgDatas[i]['id']){
      bgAssetId = bgDatas[i]['asset_id'];
    }
  }
  return bgAssetId;
}

function G_COMM_GET_CHARA_ASSET_ID_FULL(charaDatas,charaId){ //キャラIDからアセットIDを取得する(キャラ全身)。
  var charaAssetId = -1;
  for(var i = 0; i < charaDatas.length; i++){
    if(charaId == charaDatas[i]['id']){
      charaAssetId = charaDatas[i]['asset_id_full'];
    }
  }
  return charaAssetId;
}

function G_COMM_COMM_SCENE_INIT(commData,pageNumber){ //会話シーンの初期表示設定
  if(isset(commData['sceneDatas'])){
    COMM_BACKGROUND_SPRITE.remove();
    var bgAssetId = -1;
    var bgId = commData['sceneDatas'][pageNumber]['backGroundId'];
    if(isset(commData['backGroundDatas'])){
      bgAssetId = G_COMM_GET_BG_ASSET_ID(commData['backGroundDatas'],bgId);
    }
    if(bgAssetId != -1){
      COMM_BACKGROUND_SPRITE.remove();
      COMM_BACKGROUND_SPRITE = Sprite('ASSET_' + bgAssetId).addChildTo(COMM_COMM_SCENE_GAME_LAYER);
    }

    //左キャラ全身画像表示
    var charaLeftFullAssetId = -1;
    var charaLeftId = commData['sceneDatas'][pageNumber]['charaLId'];
    if(isset(commData['charaDatas'])){
      if(charaLeftId != 0){ //キャラが非表示ではない場合
        charaLeftFullAssetId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],charaLeftId);
        if(charaLeftFullAssetId != -1){
          COMM_CHARA_LEFT_SPRITE.remove();
          COMM_CHARA_LEFT_SPRITE = Sprite('ASSET_' + charaLeftFullAssetId).addChildTo(COMM_COMM_SCENE_CHARA_LAYER);
        }
      }
      else{ //キャラが非表示の場合、削除
        COMM_CHARA_LEFT_SPRITE.remove();
      }
    }

    //右キャラ全身画像表示
    var charaRightFullAssetId = -1;
    var charaRightId = commData['sceneDatas'][pageNumber]['charaRId'];
    if(isset(commData['charaDatas'])){
      if(charaRightId != 0){ //キャラが非表示ではない場合
        charaRightFullAssetId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],charaRightId);
        if(charaRightFullAssetId != -1){
          COMM_CHARA_RIGHT_SPRITE.remove();
          COMM_CHARA_RIGHT_SPRITE = Sprite('ASSET_' + charaRightFullAssetId).addChildTo(COMM_COMM_SCENE_CHARA_LAYER);
          COMM_CHARA_RIGHT_SPRITE.scaleX *= -1;
        }
      }
      else{ //キャラが非表示の場合、削除
        COMM_CHARA_RIGHT_SPRITE.remove();
      }
    }
  }
}
