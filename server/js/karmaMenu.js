//カルマメニュー関連処理
var KARMA_MENU_OBJ = null; //カルマメニューの実体
var KARMA_MENU_RESULT_DATA = null; //カルマメニューの通信結果
var KARMA_MENU_PLAYER_KARMA = null; //プレイヤーの現在のカルマ
var KARMA_MENU_PLAYER_KARMA_RANK = null; //プレイヤーの現在のカルマランク
var KARMA_MENU_PLAYER_KARMA_NAME = ""; //プレイヤーのカルマ名
var KARMA_MENU_PLAYER_NAME = ""; //プレイヤー情報
var KARMA_MENU_EFFECT_DATAS = new Array(); //カルマデータ
var KARMA_MENU_PLAYER_MESSAGE = new Array(); //プレイヤーのメッセージ
var KARMA_MENU_EFFECT_TEXT_LIST = new Array(); //カルマの発動効果のテキストリスト
var KARMA_MENU_PLAYER_SEARCH_DATA = false; //プレイヤーの検索状態を取得
var KARMA_MENU_WINDOW_RETURN_VAL = null; //ウィンドウの返し値
var KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP = -1; //シーン遷移アニメーション
var KARMA_MENU_SELECT_MESSAGE_ID = -1; //洗濯中のメッセージID
function G_KARMA_MENU_CREATE(parentBase,thisSceneObj){ //カルマメニューを作成する
  if(KARMA_MENU_OBJ != null){ //メッセージが表示されていれば削除
    KARMA_MENU_OBJ.remove();
    KARMA_MENU_OBJ = null;
  }
  if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
  KARMA_MENU_OBJ = Sprite('ASSET_64').addChildTo(parentBase);//カルマメニューの実体を作成
  KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
  var postParam = new Object();
  postParam['karma_menu_init'] = 0;
  NETWORK_IS_CONNECTING = true;
  ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始

  KARMA_MENU_OBJ.update = function() {
    if(KARMA_MENU_RESULT_DATA != -1 && KARMA_MENU_RESULT_DATA != "" && G_ASSET_LOADER(KARMA_MENU_RESULT_DATA)){
      var json = JSON.parse(KARMA_MENU_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          var changeKarmaFlag = false;//カルマに変更があった場合
          if(isset(json['player_info']) && isset(json['player_master'])){
            KARMA_MENU_PLAYER_NAME = json['player_master']['player_name']; //プレイヤー情報を更新
            if(KARMA_MENU_PLAYER_KARMA != json['player_info']['player_karma']) changeKarmaFlag = true;
            KARMA_MENU_PLAYER_KARMA = json['player_info']['player_karma']; //プレイヤーの現在のカラム
            var newKarmaRank = G_HELPER_GET_PLAYER_KARMA_RANK(KARMA_MENU_PLAYER_KARMA);
            //ランクに変動があった場合の処理
            if(KARMA_MENU_PLAYER_KARMA_RANK != newKarmaRank){
              //*******************************************************************************************************************
              //*******************************************************************************************************************
              //*******************************************************************************************************************
              //*******************************************************************************************************************
            }
            KARMA_MENU_PLAYER_KARMA_RANK = newKarmaRank;//最新のカルマランクに変更
            KARMA_MENU_PLAYER_KARMA_NAME = G_HELPER_GET_PLAYER_KARMA_NAME(KARMA_MENU_PLAYER_KARMA); //最新のカルマ名に変更
          }
          if(isset(json['karma_effect_datas'])){ //カルマによって発動中の効果データ
            var karmaEffectDatas = json['karma_effect_datas'];
            if(Array.isArray(karmaEffectDatas)) KARMA_MENU_EFFECT_DATAS = karmaEffectDatas;
            else KARMA_MENU_EFFECT_DATAS = new Array();
          }
          if(isset(json['player_message'])){ //メッセージを取得
            var playerMessage = json['player_message'];
            if(Array.isArray(playerMessage)) KARMA_MENU_PLAYER_MESSAGE = playerMessage;
            else KARMA_MENU_PLAYER_MESSAGE = new Array();
          }
          if(isset(json['player_search_data'])){ //プレイヤーの検索状態を取得
            KARMA_MENU_PLAYER_SEARCH_DATA = json['player_search_data'];
          }
          //初期通信が完了した
          if(isset(json['karma_menu_init']) && KARMA_MENU_OBJ != null){
            G_KARMA_MENU_CREATE_UI(KARMA_MENU_OBJ,parentBase,thisSceneObj,KARMA_MENU_PLAYER_NAME,
              KARMA_MENU_PLAYER_KARMA,KARMA_MENU_PLAYER_KARMA_RANK,
              KARMA_MENU_PLAYER_KARMA_NAME,KARMA_MENU_EFFECT_DATAS,
              KARMA_MENU_EFFECT_TEXT_LIST,KARMA_MENU_PLAYER_MESSAGE,KARMA_MENU_PLAYER_SEARCH_DATA);
          }
          //カルマコマンドを実行した。
          if(isset(json['result_karma_command_start'])){
            console.log("検索結果表示");
            var resultCommandStart = json['result_karma_command_start'];
            changeKarmaFlag = true; //テストコード
            if(changeKarmaFlag == true){
              G_KARMA_MENU_DELETE(KARMA_MENU_OBJ);
              G_KARMA_MENU_CREATE_UI(KARMA_MENU_OBJ,parentBase,thisSceneObj,KARMA_MENU_PLAYER_NAME,
                KARMA_MENU_PLAYER_KARMA,KARMA_MENU_PLAYER_KARMA_RANK,
                KARMA_MENU_PLAYER_KARMA_NAME,KARMA_MENU_EFFECT_DATAS,
                KARMA_MENU_EFFECT_TEXT_LIST,KARMA_MENU_PLAYER_MESSAGE,KARMA_MENU_PLAYER_SEARCH_DATA);
            }
            if(isset(resultCommandStart['error']) && isset(resultCommandStart['error_comment'])){
              if(resultCommandStart['error'] == 0 && isset(resultCommandStart['effect_id'])){
                if(resultCommandStart['effect_id'] == 21){ //殺害するプレイヤーの検索を行った
                  G_NORMAL_WINDOW_CREATE(parentBase,"プレイヤーの探索を開始","プレイヤーの探索を開始しました。",0,"karmaCommandSuccessWindow");
                }
                if(resultCommandStart['effect_id'] == 22){ //救援するプレイヤーの検索を行った
                  G_NORMAL_WINDOW_CREATE(parentBase,"プレイヤーの探索を開始","プレイヤーの探索を開始しました。",0,"karmaCommandSuccessWindow");
                }
                G_NORMAL_WINDOW_CREATE(parentBase,"",resultCommandStart['error_comment'],0,"karmaCommandErrorWindow");
              }
              else{
                G_NORMAL_WINDOW_CREATE(parentBase,"エラー",resultCommandStart['error_comment'],0,"karmaCommandErrorWindow");
              }
            }
          }

          //カルマコマンドを取り消した
          if(isset(json['result_karma_command_cancel'])){
            var resultKarmaCommandCancel = json['result_karma_command_cancel'];
            if(isset(resultKarmaCommandCancel['error']) && isset(resultKarmaCommandCancel['error_comment'])){
              var windowTitleText = "検索を取り消し";
              var windowMainText = "検索を取り消しました";
              if(resultKarmaCommandCancel['error'] != 0){
                windowTitleText = "エラー";
                windowMainText = resultKarmaCommandCancel['error_comment'];
              }
              G_NORMAL_WINDOW_CREATE(parentBase,windowTitleText,windowMainText,0,"karmaCommandCancelResultWindow");
              //検索状態に変更があったためリロード
              G_KARMA_MENU_DELETE(KARMA_MENU_OBJ);
              G_KARMA_MENU_CREATE_UI(KARMA_MENU_OBJ,parentBase,thisSceneObj,KARMA_MENU_PLAYER_NAME,
                KARMA_MENU_PLAYER_KARMA,KARMA_MENU_PLAYER_KARMA_RANK,
                KARMA_MENU_PLAYER_KARMA_NAME,KARMA_MENU_EFFECT_DATAS,
                KARMA_MENU_EFFECT_TEXT_LIST,KARMA_MENU_PLAYER_MESSAGE,KARMA_MENU_PLAYER_SEARCH_DATA);
            }
          }

          if(isset(json['result_check_battle'])){ //戦闘結果の確認が行われた
            var resultCheckPvpBattleData = json['result_check_battle'];
            if(isset(resultCheckPvpBattleData['error'])){
              if(resultCheckPvpBattleData['error'] == 0){ //正常
                //PVP用のバトルインスタンスを作成
                PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
                PLAYER_BATTLE_INSTANCE = new Object();
                PLAYER_BATTLE_INSTANCE['pvp_battle_event_data'] = new Object();
                PLAYER_BATTLE_INSTANCE['pvp_battle_event_data']['id'] = resultCheckPvpBattleData['result_pvp_battle_log']['id'];
                if(SCENE_MANAGER['now_scene'] == "map"){ //マップに居た場合、位置情報を更新
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
                }
                KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
              }
              else{ //エラーが発生した。
                G_NORMAL_WINDOW_CREATE(parentBase,"エラー",resultCheckPvpBattleData['error_comment'],0,"checkPvpBattleWindowError");
              }
            }
          }


          changeKarmaFlag = false;
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
        if(KARMA_MENU_OBJ != null) {
          KARMA_MENU_OBJ.remove();
          KARMA_MENU_OBJ = null;
        }
        thisSceneObj.exit("title");
      }

      KARMA_MENU_RESULT_DATA = "";
      NETWORK_IS_CONNECTING = false;
    }
    if(KARMA_MENU_WINDOW_RETURN_VAL != null){ //ウィンドウの返し値が存在した
      console.log("返し値があった");
      console.log(KARMA_MENU_WINDOW_RETURN_VAL);
      if(isset(KARMA_MENU_WINDOW_RETURN_VAL['checkPlayerSearchPlayerKill'])){
        if(KARMA_MENU_WINDOW_RETURN_VAL['checkPlayerSearchPlayerKill'] == "yes"){ //殺害するプレイヤー検索を開始
          KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
          var postParam = new Object();
          postParam['karma_command_start'] = 1; //プレイヤー検索タイプを設定
          NETWORK_IS_CONNECTING = true;
          console.log("通信開始");
          ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始
        }
      }

      if(isset(KARMA_MENU_WINDOW_RETURN_VAL['checkPlayerSearchPlayerRescue'])){
        if(KARMA_MENU_WINDOW_RETURN_VAL['checkPlayerSearchPlayerRescue'] == "yes"){ //救援するプレイヤー検索を開始
          KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
          var postParam = new Object();
          postParam['karma_command_start'] = 2; //プレイヤー検索タイプを設定
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始
        }
      }

      if(isset(KARMA_MENU_WINDOW_RETURN_VAL['cancelPlayerSearchPlayerKill'])){
        console.log("ウィンドウ反応");
        if(KARMA_MENU_WINDOW_RETURN_VAL['cancelPlayerSearchPlayerKill'] == "yes"){ //殺害するプレイヤー検索を取り消し
          KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
          var postParam = new Object();
          postParam['karma_command_cancel'] = 1; //プレイヤー検索タイプを設定
          NETWORK_IS_CONNECTING = true;
          console.log("取り消し通信開始");
          ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始
        }
      }

      if(isset(KARMA_MENU_WINDOW_RETURN_VAL['cancelPlayerSearchPlayerRescue'])){
        if(KARMA_MENU_WINDOW_RETURN_VAL['cancelPlayerSearchPlayerRescue'] == "yes"){ //救援するプレイヤー検索を取り消し
          KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
          var postParam = new Object();
          postParam['karma_command_cancel'] = 2; //プレイヤー検索タイプを設定
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始
        }
      }

      if(isset(KARMA_MENU_WINDOW_RETURN_VAL['checkBattleResult'])){
        if(KARMA_MENU_WINDOW_RETURN_VAL['checkBattleResult'] == "yes"){ //戦闘結果の確認を行った
          KARMA_MENU_RESULT_DATA = -1; //通信待機中に変更
          var postParam = new Object();
          postParam['check_battle_result'] = new Object();
          postParam['check_battle_result']['message_id'] = KARMA_MENU_SELECT_MESSAGE_ID;
          KARMA_MENU_SELECT_MESSAGE_ID = -1;
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/karmaMenu/karmaMenu.php",postParam); //非同期通信開始
        }
      }
      KARMA_MENU_WINDOW_RETURN_VAL = null;
    }
    if(KARMA_MENU_WINDOW_RETURN_VAL != null){
      console.log(KARMA_MENU_WINDOW_RETURN_VAL);
    }

    //戦闘開始の場合は戦闘シーン遷移アニメーションを再生
    if(KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP != -1) G_KARMA_MENU_CHANGE_BATTLE_SCENE_ANIM_STEP(thisSceneObj,parentBase,KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP);
  };
}

function G_KARMA_MENU_CREATE_UI(parentBase,windowNode,thisSceneObj,playerName,playerKarma,playerKarmaRank,playerKaramName,karmaEffectDatas,karmaEffectTextList,playerMessage,playerSearchData){ //UIを作成
  //背景を表示
  if(isset(parentBase['window_bg'])){
    parentBase['window_bg'] = null;
  }
  parentBase['window_bg'] = Sprite('ASSET_160').addChildTo(parentBase);//ウィンドウ本体を表示
  //タイトルを表示
  parentBase['window_title'] = Label({
    text: 'カルマ',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(parentBase);
  parentBase['window_title'].y = parentBase['window_title'].y - (SCREEN_HEIGHT * 0.4);
  //自分のカルマ表示
  var playerKarmaText = playerName + "\n【 " + playerKaramName + " 】";
  parentBase['player_karma'] = Label({
    text: playerKarmaText,
    fontSize: 28,
    fill: 'white',
    align: 'center',
  }).addChildTo(parentBase);
  parentBase['player_karma'].y = parentBase['player_karma'].y - (SCREEN_HEIGHT * 0.3);

  //カルマボーナスウィンドウ背景表示
  parentBase['karma_bonus_window'] = Sprite('ASSET_414').addChildTo(parentBase);
  parentBase['karma_bonus_window'].y = parentBase['karma_bonus_window'].y - (SCREEN_HEIGHT * 0.15);
  //カルマエフェクトをテキストに出力
  var karmaEffectText = "";
  karmaEffectTextList = new Array();
  if(!Array.isArray(karmaEffectDatas) || karmaEffectDatas.length == 0) karmaEffectText = "ボーナスなし";
  else{
    var arrayIndex = 0;
    for (var i = 0; i < karmaEffectDatas.length; i++) {
      var sec = i % 6;
      if(i != 0 && sec == 0){
        arrayIndex ++;
        karmaEffectText = "";
      }
      karmaEffectText = karmaEffectText + "・" + karmaEffectDatas[i]['effect_name'] + "\n";
      karmaEffectTextList[arrayIndex] = karmaEffectText;
    }
  }

  //2以上のリストがあれば、ページ切り替え処理を追加
  if(2 <= karmaEffectTextList.length){
    parentBase['page_count_label'] = Label({
      text: "ページ:1/" + karmaEffectTextList.length,
      fontSize: 20,
      fill: 'white',
      align: 'right',
    }).addChildTo(parentBase['karma_bonus_window']);
    parentBase['page_count_label'].y = parentBase['page_count_label'].y - ((parentBase['karma_bonus_window'].height / 2) - (parentBase['page_count_label'].height / 2));
    parentBase['page_count_label'].x =  parentBase['page_count_label'].x + ((parentBase['karma_bonus_window'].width / 1.9) - (parentBase['page_count_label'].width / 2));
    //ページ切り替えボタン
    parentBase['page_change_btn'] = Button({
     width: parentBase['karma_bonus_window'].width,
     height: parentBase['karma_bonus_window'].height,
    }).addChildTo(parentBase['karma_bonus_window']);
    parentBase['page_change_btn']['page_index'] = 0;
    parentBase['page_change_btn']['page_max_index'] = (karmaEffectTextList.length - 1);
    parentBase['page_change_btn'].onpointstart = function(e){
      if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && WINDOW_LIST == null){
        this['page_index'] ++;
        if(this['page_max_index'] < this['page_index']) this['page_index'] = 0;
        parentBase['page_count_label'].text = "ページ:" + (this['page_index'] + 1) + "/" + (this['page_max_index'] + 1);
        parentBase['karma_bonus_label'].text = karmaEffectTextList[this['page_index']];
      }
    };
    parentBase['page_change_btn'].visible = false;
  }

  //カルマボーナステキスト
  parentBase['karma_bonus_label'] = LabelArea({
   text: karmaEffectTextList[0],
   height: 155,
   width: 540,
   fontSize: 22,
   fill: 'white',
   align: 'left',
   baseline: 'top',
 }).addChildTo(parentBase['karma_bonus_window']);

  //プレイヤー救援、プレイヤー索敵
  var command_1_text = "";
  //コマンドが解除されているか検索
  var command_1_effect_id = -1;
  for (var i = 0; i < karmaEffectDatas.length; i++) {
    if(karmaEffectDatas[i]['effect_id'] == 21){ //プレイヤー索敵コマンド解除
      command_1_text = "プレイヤー索敵";
      command_1_effect_id = 21;
    }
    else if(karmaEffectDatas[i]['effect_id'] == 22){ //プレイヤー救援コマンド解除
      command_1_text = "プレイヤー救援";
      command_1_effect_id = 22;
    }
  }
  parentBase['label_1'] = Label({
    text: command_1_text,
    fontSize: 26,
    fill: 'white',
    align: 'center',
  }).addChildTo(parentBase);
  //parentBase['label_1'].y = parentBase['label_1'].y + (SCREEN_HEIGHT * 0.05);
  parentBase['label_1'].x = parentBase['label_1'].x - (SCREEN_WIDTH * 0.25);
  var selectMsg = null;
  for (var i = 0; i < playerMessage.length; i++) {
    if(command_1_effect_id == 21 && playerMessage[i]['message_type'] == 4 && playerMessage[i]['player_index_id'] == playerMessage[i]['param_2'] && playerMessage[i]['param_3'] == ""){ //未確認の索敵結果が存在した。
      selectMsg = playerMessage[i];
      break;
    }
    if(command_1_effect_id == 22 && playerMessage[i]['message_type'] == 5 && playerMessage[i]['player_index_id'] == playerMessage[i]['param_2'] && playerMessage[i]['param_3'] == ""){ //未確認の救援結果が存在した
      selectMsg = playerMessage[i];
      break;
    }
  }

  //ボタン1(画像)
  parentBase['button_1'] = Sprite('ASSET_139').addChildTo(parentBase);
  parentBase['button_1'].y = parentBase['label_1'].y;
  parentBase['button_1'].x = parentBase['label_1'].x;
  parentBase['button_1'].x = parentBase['button_1'].x + (parentBase['button_1'].width / 1.25);
  //ボタン1(本体)
  parentBase['button_1']['btn'] = Button({
   width: parentBase['button_1'].width,
   height: parentBase['button_1'].height,
  }).addChildTo(parentBase['button_1']);
  parentBase['button_1']['btn']['effect_id'] = command_1_effect_id;
  var msgId = -1;
  if(selectMsg != null) msgId = selectMsg['message_id'];
  parentBase['button_1']['btn']['message_id'] = msgId;
  if(isset(playerSearchData['role'])) parentBase['button_1']['btn']['role'] = playerSearchData['role'];
  else parentBase['button_1']['btn']['role'] = -1;
  parentBase['button_1']['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && WINDOW_LIST == null){
      if(this['effect_id'] != -1){ //エフェクトが有効な場合
        if(this['role'] != -1){ //プレイヤーの検索状態が存在した時
          if(this['role'] == 0){ //殺害対象検索中
            G_NORMAL_WINDOW_CREATE(windowNode,"プレイヤーの検索を取り消し","プレイヤーの検索を取り消します",1,"cancelPlayerSearchPlayerKill");
          }
          if(this['role'] == 1){ //救援対象検索中
            G_NORMAL_WINDOW_CREATE(windowNode,"プレイヤーの検索を取り消し","プレイヤーの検索を取り消します",1,"cancelPlayerSearchPlayerRescue");
          }
        }
        else if(this['message_id'] != -1){ //殺害か救援のメッセージが存在した場合
          if(this['effect_id'] == 21){ //プレイヤー殺害の結果を見る
            KARMA_MENU_SELECT_MESSAGE_ID = this['message_id'];
            G_NORMAL_WINDOW_CREATE(windowNode,"戦闘結果の確認","戦闘結果の確認を行います",1,"checkBattleResult");
          }
          if(this['effect_id'] == 22){ //プレイヤー救援の結果を見る
            KARMA_MENU_SELECT_MESSAGE_ID = this['message_id'];
            G_NORMAL_WINDOW_CREATE(windowNode,"戦闘結果の確認","戦闘結果の確認を行います",1,"checkBattleResult");
          }
        }
        else{ //メッセージが無い場合はカルマコマンドを実行
          if(this['effect_id'] == 21){ //殺害するプレイヤーの検索
            G_NORMAL_WINDOW_CREATE(windowNode,"プレイヤーの検索を開始","プレイヤーの検索を開始します",1,"checkPlayerSearchPlayerKill");
          }
          if(this['effect_id'] == 22){ //救援するプレイヤーの検索
            G_NORMAL_WINDOW_CREATE(windowNode,"プレイヤーの検索を開始","プレイヤーの検索を開始します",1,"checkPlayerSearchPlayerRescue");
          }
        }
      }
    }
  };
  parentBase['button_1']['btn'].visible = false;
  //ボタン1ラベル
  var button_1_text = "";
  if(playerSearchData != false){ //プレイヤー検索状態が存在した
    if(playerSearchData['role'] == 0) button_1_text = "殺害対象を探しています";
    if(playerSearchData['role'] == 1) button_1_text = "救援対象を探しています";
  }
  else if(selectMsg != null){
    if(selectMsg['message_type'] == 4 && selectMsg['player_index_id'] == selectMsg['param_2']) button_1_text = "プレイヤー殺害結果を見る";
    if(selectMsg['message_type'] == 5 && selectMsg['player_index_id'] == selectMsg['param_2']) button_1_text = "プレイヤー救援結果を見る";
  }
  else{
    if(command_1_effect_id == 21) button_1_text = "プレイヤーを殺害する";
    if(command_1_effect_id == 22) button_1_text = "プレイヤーを救援する";
  }
  parentBase['button_1']['label'] = Label({
    text: button_1_text,
    fontSize: 26,
    fill: 'black',
    align: 'center',
  }).addChildTo(parentBase['button_1']);
  if(command_1_effect_id == -1) parentBase['button_1'].visible = false;
  //閉じるボタン
  parentBase['close_btn'] = Sprite('ASSET_120').addChildTo(parentBase);
  parentBase['close_btn'].y = parentBase['close_btn'].y + ((SCREEN_HEIGHT / 2) - ((parentBase['close_btn'].height / 2) + (parentBase['close_btn'].height)));
  parentBase['close_btn']['btn'] = Button({
   width: parentBase['close_btn'].width,
   height: parentBase['close_btn'].height,
  }).addChildTo(parentBase['close_btn']);
  parentBase['close_btn']['btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && WINDOW_LIST == null){
      if(KARMA_MENU_OBJ != null) {
        KARMA_MENU_OBJ.remove();
        KARMA_MENU_OBJ = null;
      }
    }
  };
  parentBase['close_btn']['btn'].visible = false;
  parentBase['close_btn']['label'] = Label({
    text: "閉じる",
    fontSize: 26,
    fill: 'black',
    align: 'center',
  }).addChildTo(parentBase['close_btn']);
}

function G_KARMA_MENU_DELETE(parentBase){
  if(isset(parentBase['window_bg'])){
    parentBase['window_bg'].remove();
    parentBase['window_bg'] = null;
  }
  if(isset(parentBase['window_title'])){
    parentBase['window_title'].remove();
    parentBase['window_title'] = null;
  }
  if(isset(parentBase['player_karma'])){
    parentBase['player_karma'].remove();
    parentBase['player_karma'] = null;
  }
  if(isset(parentBase['karma_bonus_window'])){
    parentBase['karma_bonus_window'].remove();
    parentBase['karma_bonus_window'] = null;
  }
  if(isset(parentBase['page_count_label'])){
    parentBase['page_count_label'].remove();
    parentBase['page_count_label'] = null;
  }
  if(isset(parentBase['page_change_btn'])){
    parentBase['page_change_btn'].remove();
    parentBase['page_change_btn'] = null;
  }
  if(isset(parentBase['karma_bonus_label'])){
    parentBase['karma_bonus_label'].remove();
    parentBase['karma_bonus_label'] = null;
  }
  if(isset(parentBase['label_1'])){
    parentBase['label_1'].remove();
    parentBase['label_1'] = null;
  }
  if(isset(parentBase['button_1'])){
    parentBase['button_1'].remove();
    parentBase['button_1'] = null;
  }
}

function G_KARMA_MENU_CHANGE_BATTLE_SCENE_ANIM_STEP(sceneObj,parentBase,step){ //戦闘シーンに切り替える時のアニメーション制御処理
  switch (step) {
    case 0: //アニメーション開始
    {
      G_CREATE_TRANS_SCREEN_ANIM(parentBase,0);
      KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP = 1; //バトルシーン切り替え演出を開始
    }
    break;
    case 1:
    {
      var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(0);
      if(transAnimFlag == false){ //アニメ再生が完了した場合
        KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP = 2; //バトルシーン切り替え演出を開始
      }
    }
    break;
    case 2:
    {
      if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
      SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
      KARMA_MENU_BATTLE_SCENE_CHANGE_ANIM_STEP = -1;
      if(KARMA_MENU_OBJ != null) {
        KARMA_MENU_OBJ.remove();
        KARMA_MENU_OBJ = null;
      }
      sceneObj.exit("battle"); //バトルシーンへ
    }
    break;
    default:
    break;
  }
}
