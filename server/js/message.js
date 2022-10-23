//メッセージ関連
var MESSAGE_WINDOW_OBJ = null; //メッセージウィンドウオブジェクト
var MESSAGE_PLAYER_MESSAGE_DATAS = null; //プレイヤーのメッセージデータ
var MESSAGE_LIST_CELLS = new Array(); //メッセージリストのセル
var MESSAGE_WINDOW_RETURN_VAL = null; //メッセージ用のウィンドウ返し値
var MASSAGE_SELECT_MESSAGE_DATA = null; //選択中の決闘申請情報
var MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = -1; //戦闘画面遷移アニメのステップ
var MESSAGE_WINDOW_RESULT_DATA = null; //メッセージウィンドウの通信結果
function G_MESSAGE_WINDOW_CREATE(parentBase,playerIndexId,thisSceneObj){ //メッセージウィンドウを生成
  if(MESSAGE_WINDOW_OBJ != null){ //メッセージが表示されていれば削除
    MESSAGE_WINDOW_OBJ.remove();
    MESSAGE_WINDOW_OBJ = null;
  }
  MESSAGE_WINDOW_OBJ = PlainElement({}).addChildTo(parentBase);//メーッセージウィンドウの実態
  if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false || WINDOW_LIST != null) return;
  MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
  var postParam = new Object();
  postParam['get_player_message'] = playerIndexId;
  NETWORK_IS_CONNECTING = true;
  ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始

  MESSAGE_WINDOW_OBJ.update = function() {
    if(MESSAGE_WINDOW_RESULT_DATA != -1 && MESSAGE_WINDOW_RESULT_DATA != "" && G_ASSET_LOADER(MESSAGE_WINDOW_RESULT_DATA)){
      var json = JSON.parse(MESSAGE_WINDOW_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json['result_player_message_datas'])){ //プレイヤーのメッセージ一覧を取得
            MESSAGE_PLAYER_MESSAGE_DATAS = json['result_player_message_datas'];
            var list = G_MESSAGE_WINDOW_CELL_CREATE(parentBase,MESSAGE_PLAYER_MESSAGE_DATAS); //リストセルを作成
            if(isset(list['list_obj']) && isset(list['list_obj_height_size'])){ //リスト生成に必要なデータが揃っていた場合
              //リストを生成
              G_UI_CREATE_LIST(MESSAGE_WINDOW_OBJ,list['list_obj'],list['list_obj_height_size'],"メッセージ一覧","閉じる");
            }
          }
          if(isset(json['result_delete_duel_application'])){ //決闘を破棄した結果を取得
            var resultDeleteDuelApplication = json['result_delete_duel_application'];
            if(isset(resultDeleteDuelApplication['error']) && resultDeleteDuelApplication['error'] == 0){
              G_NORMAL_WINDOW_CREATE(parentBase,"メッセージの破棄","メッセージを破棄しました",0,"resultDeleteDuelApplicationWindowSuccess");
            }
            else if(isset(resultDeleteDuelApplication['error']) && resultDeleteDuelApplication['error'] != 0){ //エラーが発生した。
              var errorWindowText = "メッセージの破棄に失敗しました";
              if(isset(resultDeleteDuelApplication['error_comment'])) errorWindowText = resultDeleteDuelApplication['error_comment'];
              G_NORMAL_WINDOW_CREATE(parentBase,"エラー",errorWindowText,0,"resultDeleteDuelApplicationWindowError");
            }
          }
          if(isset(json['result_update_player_message_data'])){ //メッセージの更新が存在した。
            if(MESSAGE_PLAYER_MESSAGE_DATAS != null){
              MESSAGE_PLAYER_MESSAGE_DATAS.length = 0;
              MESSAGE_PLAYER_MESSAGE_DATAS = null;
            }
            MESSAGE_PLAYER_MESSAGE_DATAS = json['result_update_player_message_data'];
            var list = G_MESSAGE_WINDOW_CELL_CREATE(parentBase,MESSAGE_PLAYER_MESSAGE_DATAS); //リストセルを作成
            if(isset(list['list_obj']) && isset(list['list_obj_height_size'])){ //リスト生成に必要なデータが揃っていた場合
              //リストを生成
              G_UI_WINDOW_LIST_DELETE();
              G_UI_CREATE_LIST(MESSAGE_WINDOW_OBJ,list['list_obj'],list['list_obj_height_size'],"メッセージ一覧","閉じる");
            }
          }
          if(isset(json['result_battle_data'])){ //バトル結果を取得
            console.log(json['result_battle_data']);
            var battleResultData = json['result_battle_data'];
            if(isset(battleResultData['insert_pvp_battle_log_id'])){
              //PVP用のバトルインスタンスを作成
              PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
              PLAYER_BATTLE_INSTANCE = new Object();
              PLAYER_BATTLE_INSTANCE['pvp_battle_event_data'] = new Object();
              PLAYER_BATTLE_INSTANCE['pvp_battle_event_data']['id'] = battleResultData['insert_pvp_battle_log_id'];
              if(SCENE_MANAGER['now_scene'] == "map"){ //マップに居た場合、位置情報を更新
                PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
              }
              MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
            }
          }
          if(isset(json['result_delete_message'])){ //メッセージの削除が行われた
            G_NORMAL_WINDOW_CREATE(parentBase,"メッセージの破棄","メッセージを破棄しました。",0,"resultDeleteMessageWindowSuccess");
          }
          if(isset(json['result_player_join_battle'])){ //戦闘参加の確認が行われた
            var resultPlayerJoinBattleData = json['result_player_join_battle'];
            if(isset(resultPlayerJoinBattleData['error'])){
              if(resultPlayerJoinBattleData['error'] == 0){ //正常
                PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
                PLAYER_BATTLE_INSTANCE = new Object();
                PLAYER_BATTLE_INSTANCE['battle_instance_id'] = resultPlayerJoinBattleData['battle_instance_id'];
                MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
                //戦闘後の位置を更新
                if(SCENE_MANAGER['now_scene'] == "map"){ //マップに居た場合、位置情報を更新
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
                  PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
                }
              }
              else{ //エラーが発生した。
                G_NORMAL_WINDOW_CREATE(parentBase,"エラー",resultPlayerJoinBattleData['error_comment'],0,"checkPvpBattleWindowError");
              }
            }
          }
          if(isset(json['duel_application_approval_response_data'])){ //決闘の承認を行った(戦闘開始)
            var resultDuelApproval = json['duel_application_approval_response_data'];
            if(resultDuelApproval['error'] == 0){
              PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
              PLAYER_BATTLE_INSTANCE = new Object();
              PLAYER_BATTLE_INSTANCE['battle_instance_id'] = resultDuelApproval['battle_instance_id'];
              MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
              //戦闘後の位置を更新
              if(SCENE_MANAGER['now_scene'] == "map"){ //マップに居た場合、位置情報を更新
                PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
              }
            }
            else{ //エラーが発生した。
              G_NORMAL_WINDOW_CREATE(parentBase,"エラー",resultDuelApproval['error_comment'],0,"checkDuelApprovalWindowError");
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          G_MESSAGE_WINDOW_DELETE();
          thisSceneObj.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        G_MESSAGE_WINDOW_DELETE();
        thisSceneObj.exit("title");
      }
      MESSAGE_WINDOW_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    //ウィンドウに返り値があった場合
    if(MESSAGE_WINDOW_RETURN_VAL != null){
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkDuelApplicationWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkDuelApplicationWindow'] == "yes"){ //申請容認ウィンドウを閉じた場合
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 1){ //決闘申請を承認する。
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['duel_application_approval'] = new Object();
            postParam['duel_application_approval']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            postParam['duel_application_approval']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            postParam['duel_application_approval']['application_player_index_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];
            if(MAP_RESULT_MAP_MASTER_DATA != null) postParam['duel_application_approval']['map_id'] = MAP_RESULT_MAP_MASTER_DATA['id'];

            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
        if(MESSAGE_WINDOW_RETURN_VAL['checkDuelApplicationWindow'] == "no"){ //申請容認ウィンドウを閉じた場合
        }
      }
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkDuelResultWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkDuelResultWindow'] == "yes"){ //戦闘参加の確認を行った
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 2){ //戦闘結果の確認を行った
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['player_join_battle'] = new Object();
            postParam['player_join_battle']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            postParam['player_join_battle']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            postParam['player_join_battle']['battle_instance_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];

            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
      }
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkPlayerKillResultWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkPlayerKillResultWindow'] == "yes"){ //戦闘参加の確認を行った
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 3){
            //処理はは未定
            // MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            // var postParam = new Object();
            // postParam['player_join_battle'] = new Object();
            // postParam['player_join_battle']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            // postParam['player_join_battle']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            // postParam['player_join_battle']['battle_instance_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];
            //
            // NETWORK_IS_CONNECTING = true;
            // ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
      }
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkPlayerBattleEntryWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkPlayerBattleEntryWindow'] == "yes"){ //戦闘参加の確認を行った(索敵)
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 3){
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['player_join_battle'] = new Object();
            postParam['player_join_battle']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            postParam['player_join_battle']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            postParam['player_join_battle']['battle_instance_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];

            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
      }
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkPlayerAttackResultWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkPlayerAttackResultWindow'] == "yes"){ //戦闘参加の確認を行った(索敵)
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 4){
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['player_join_battle'] = new Object();
            postParam['player_join_battle']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            postParam['player_join_battle']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            postParam['player_join_battle']['battle_instance_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];

            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
      }
      if(isset(MESSAGE_WINDOW_RETURN_VAL['checkPlayerRescueResultWindow'])){
        if(MESSAGE_WINDOW_RETURN_VAL['checkPlayerRescueResultWindow'] == "yes"){ //戦闘参加の確認を行った(救援)
          if(MASSAGE_SELECT_MESSAGE_DATA != null && MASSAGE_SELECT_MESSAGE_DATA['message_type'] == 5){
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['player_rescue_result_check'] = new Object();
            postParam['player_rescue_result_check']['message_type'] = MASSAGE_SELECT_MESSAGE_DATA['message_type'];
            postParam['player_rescue_result_check']['message_id'] = MASSAGE_SELECT_MESSAGE_DATA['message_id'];
            postParam['player_rescue_result_check']['battle_instance_id'] = MASSAGE_SELECT_MESSAGE_DATA['param_1'];

            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
          }
          MASSAGE_SELECT_MESSAGE_DATA = null;
        }
      }
      MESSAGE_WINDOW_RETURN_VAL = null;
    }

    //戦闘開始の場合は戦闘シーン遷移アニメーションを再生
    if(MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP != -1) G_MESSAGE_WINDOW_CHANGE_BATTLE_SCENE_ANIM_STEP(thisSceneObj,parentBase,MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP);

  };
}

function G_MESSAGE_WINDOW_CELL_CREATE(parentBase,playerMessageDatas){ //メッセージリストのセルを作成
  if(MESSAGE_LIST_CELLS != null && MESSAGE_LIST_CELLS.length != 0){
    for (var i = 0; i < MESSAGE_LIST_CELLS.length; i++) {
      MESSAGE_LIST_CELLS[i].remove();
    }
    MESSAGE_LIST_CELLS = null;
    MESSAGE_LIST_CELLS = new Array();
  }
  resultList = new Array();
  resultList['list_obj'] = PlainElement({});
  resultList['list_obj_height_size'] = 0;
  var cellSizeHeight = 0;
  //if(playerMessageDatas != null && playerMessageDatas.length != 0){ //メッセージが存在する場合
    for (var i = 0; i < playerMessageDatas.length; i++) {
      MESSAGE_LIST_CELLS[i] = Sprite('ASSET_159').addChildTo(resultList['list_obj']); //リストセル背景画像
      MESSAGE_LIST_CELLS[i].y = MESSAGE_LIST_CELLS[i].y - resultList['list_obj_height_size'];
      resultList['list_obj_height_size'] += MESSAGE_LIST_CELLS[i].height;
      cellSizeHeight = MESSAGE_LIST_CELLS[i].height;
      var titleText = "";
      var mainText = "";
      var button1Text = "";
      var button2Text = "";
      switch (parseInt(playerMessageDatas[i]['message_type'])) {
        case 0:
        break;
        case 1: //決闘の承認
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "確認";
          button2Text = "破棄";
        }
        break;
        case 2: //決闘確認
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "戦闘に参加";
          button2Text = "破棄";
        }
        break;
        case 3: //殺害結果の確認
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "戦闘に参加";
          button2Text = "破棄";
        }
        break;
        case 4: //索敵結果の確認
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "戦闘に参加";
          button2Text = "破棄";
        }
        break;
        case 5: //救援結果の確認
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "戦闘に参加";
          button2Text = "破棄";
        }
        break;
        case 6: //STG:PVP奇襲結果通知(勝ち)
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "";
          button2Text = "破棄";
        }
        break;
        case 7: //STG:PVP奇襲通知(負け)
        {
          titleText = playerMessageDatas[i]['message_title_text'];
          mainText = playerMessageDatas[i]['message_text'];
          button1Text = "";
          button2Text = "破棄";
        }
        break;
        default:
        break;
      }

      //タイトルラベルエリア
      MESSAGE_LIST_CELLS[i]['title'] = LabelArea({ //情報表示用ラベルテキスト
        text: titleText,
        height: MESSAGE_LIST_CELLS[i].height * 0.6,
        width: MESSAGE_LIST_CELLS[i].width * 0.75,
        fontSize: 30,
        fill: 'black',
        align: 'left',
        baseline: 'top',
      }).addChildTo(MESSAGE_LIST_CELLS[i]);

      //テキストラベルエリア
      var msgText = "";
      msgText = msgText.replace(/¥n/g,'\n');
      MESSAGE_LIST_CELLS[i]['text'] = LabelArea({ //情報表示用ラベルテキスト
        text: mainText,
        height: MESSAGE_LIST_CELLS[i].height * 0.4,
        width: MESSAGE_LIST_CELLS[i].width * 0.5,
        fontSize: 25,
        fill: 'black',
        align: 'left',
        baseline: 'top',
      }).addChildTo(MESSAGE_LIST_CELLS[i]);
      MESSAGE_LIST_CELLS[i]['text'].y = MESSAGE_LIST_CELLS[i]['text'].y + (MESSAGE_LIST_CELLS[i].height / 7);
      MESSAGE_LIST_CELLS[i]['text'].x = MESSAGE_LIST_CELLS[i]['text'].x - (MESSAGE_LIST_CELLS[i].width / 8);

      //ボタン1
      MESSAGE_LIST_CELLS[i]['button_1_sprite'] = Sprite('ASSET_79').addChildTo(MESSAGE_LIST_CELLS[i]);
      MESSAGE_LIST_CELLS[i]['button_1_sprite'].x = MESSAGE_LIST_CELLS[i]['button_1_sprite'].x + ((SCREEN_WIDTH * 0.38) - (MESSAGE_LIST_CELLS[i]['button_1_sprite'].width / 2));
      MESSAGE_LIST_CELLS[i]['button_1_sprite'].y = MESSAGE_LIST_CELLS[i]['button_1_sprite'].y - (MESSAGE_LIST_CELLS[i]['button_1_sprite'].height / 1.5);
      MESSAGE_LIST_CELLS[i]['button_1_text'] = Label({
        text: button1Text,
        fontSize: 40,
        fill: 'white',
        align: 'center',
        verticalAlign: 'top',
      }).addChildTo(MESSAGE_LIST_CELLS[i]['button_1_sprite']);
      MESSAGE_LIST_CELLS[i]['button_1_btn'] = Button({
        width: MESSAGE_LIST_CELLS[i]['button_1_sprite'].width,         // 横サイズ
        height: MESSAGE_LIST_CELLS[i]['button_1_sprite'].height,        // 縦サイズ
      }).addChildTo(MESSAGE_LIST_CELLS[i]['button_1_sprite']);
      MESSAGE_LIST_CELLS[i]['button_1_btn']['index'] = i;
      MESSAGE_LIST_CELLS[i]['button_1_btn']['message_data'] = playerMessageDatas[i];
      MESSAGE_LIST_CELLS[i]['button_1_btn'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(MESSAGE_LIST_CELLS[this['index']]['button_1_sprite'].visible == false) return;
        if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
        var messageData = this['message_data'];
        MASSAGE_SELECT_MESSAGE_DATA = messageData;
        switch (parseInt(messageData['message_type'])) {
          case 0:
          break;
          case 1: //決闘申請の受け取りと確認
          {
            G_NORMAL_WINDOW_CREATE(parentBase,"決闘の承認","決闘の申請を承認しますか？\n※承認した場合、戦闘が開始されます",1,"checkDuelApplicationWindow");
          }
          break;
          case 2: //決闘戦闘参加の確認
          {
            G_NORMAL_WINDOW_CREATE(parentBase,"戦闘への参加","戦闘に参加しますか？\n※未参加の場合、自動で戦います。",1,"checkDuelResultWindow");
          }
          break;
          case 3: //戦闘参加の確認
          {
            G_NORMAL_WINDOW_CREATE(parentBase,"戦闘への参加","戦闘に参加しますか？\n※未参加の場合、自動で戦います。",1,"checkPlayerBattleEntryWindow");
          }
          break;
          case 4: //戦闘参加の確認
          {
            G_NORMAL_WINDOW_CREATE(parentBase,"戦闘への参加","戦闘に参加しますか？\n※未参加の場合、自動で戦います。",1,"checkPlayerAttackResultWindow");
          }
          break;
          case 5: //戦闘参加の確認
          {
            G_NORMAL_WINDOW_CREATE(parentBase,"戦闘への参加","戦闘に参加しますか？\n※未参加の場合、自動で戦います。",1,"checkPlayerRescueResultWindow");
          }
          break;
          default:
          break;
        }
        console.log("ボタン1");
      };
      MESSAGE_LIST_CELLS[i]['button_1_btn'].visible = false;
      //ボタンにテキストがない場合非表示
      if(MESSAGE_LIST_CELLS[i]['button_1_text'].text == "") MESSAGE_LIST_CELLS[i]['button_1_sprite'].visible = false;
      //ボタン2
      MESSAGE_LIST_CELLS[i]['button_2_sprite'] = Sprite('ASSET_79').addChildTo(MESSAGE_LIST_CELLS[i]);
      MESSAGE_LIST_CELLS[i]['button_2_sprite'].x = MESSAGE_LIST_CELLS[i]['button_2_sprite'].x + ((SCREEN_WIDTH * 0.38) - (MESSAGE_LIST_CELLS[i]['button_2_sprite'].width / 2));
      MESSAGE_LIST_CELLS[i]['button_2_sprite'].y = MESSAGE_LIST_CELLS[i]['button_2_sprite'].y + (MESSAGE_LIST_CELLS[i]['button_2_sprite'].height / 1.5);
      MESSAGE_LIST_CELLS[i]['button_2_text'] = Label({
        text: button2Text,
        fontSize: 40,
        fill: 'white',
        align: 'center',
        verticalAlign: 'top',
      }).addChildTo(MESSAGE_LIST_CELLS[i]['button_2_sprite']);
      MESSAGE_LIST_CELLS[i]['button_2_btn'] = Button({
        width: MESSAGE_LIST_CELLS[i]['button_2_sprite'].width,         // 横サイズ
        height: MESSAGE_LIST_CELLS[i]['button_2_sprite'].height,        // 縦サイズ
      }).addChildTo(MESSAGE_LIST_CELLS[i]['button_2_sprite']);
      MESSAGE_LIST_CELLS[i]['button_2_btn']['index'] = i;
      MESSAGE_LIST_CELLS[i]['button_2_btn']['message_data'] = playerMessageDatas[i];
      MESSAGE_LIST_CELLS[i]['button_2_btn'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(MESSAGE_LIST_CELLS[this['index']]['button_2_sprite'].visible == false) return;
        if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
        var messageData = this['message_data'];
        MASSAGE_SELECT_MESSAGE_DATA = messageData;
        switch (parseInt(messageData['message_type'])) {
          case 0:
          break;
          case 1: //決闘申請の破棄
          {
            console.log("申請破棄");
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_duel_application'] = new Object();
            postParam['delete_duel_application']['message_type'] = messageData['message_type'];
            postParam['delete_duel_application']['message_id'] = messageData['message_id'];
            postParam['delete_duel_application']['application_player_index_id'] = messageData['param_1'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 2: //決闘結果の破棄
          {
            console.log("決闘結果の破棄");
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 3: //殺害結果の破棄
          {
            console.log("殺害結果の破棄");
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 4: //戦闘結果の破棄(索敵)
          {
            console.log("戦闘結果の破棄");
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 5: //戦闘結果の破棄(救援)
          {
            console.log("戦闘結果の破棄");
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 6: //奇襲結果の破棄(勝ち)
          {
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          case 7: //奇襲結果の破棄(負け)
          {
            MESSAGE_WINDOW_RESULT_DATA = -1; //通信待機中に変更
            var postParam = new Object();
            postParam['delete_message'] = new Object();
            postParam['delete_message']['message_type'] = messageData['message_type'];
            postParam['delete_message']['message_id'] = messageData['message_id'];
            NETWORK_IS_CONNECTING = true;
            ajaxStart("post","json","../../client/message/message.php",postParam); //非同期通信開始
            MASSAGE_SELECT_MESSAGE_DATA = null;
          }
          break;
          default:
          break;
        }
        console.log("ボタン2");
      };
      MESSAGE_LIST_CELLS[i]['button_2_btn'].visible = false;
      //ボタンにテキストがない場合非表示
      if(MESSAGE_LIST_CELLS[i]['button_2_text'].text == "") MESSAGE_LIST_CELLS[i]['button_2_sprite'].visible = false;
    }
    resultList['list_obj'].y = resultList['list_obj'].y + ((resultList['list_obj_height_size'] / 2) - (cellSizeHeight / 2));
  //}
  return resultList;
}

function G_MESSAGE_WINDOW_CHANGE_BATTLE_SCENE_ANIM_STEP(sceneObj,parentBase,step){ //戦闘シーンに切り替える時のアニメーション制御処理
  switch (step) {
    case 0: //アニメーション開始
    {
      G_CREATE_TRANS_SCREEN_ANIM(parentBase,0);
      MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = 1; //バトルシーン切り替え演出を開始
    }
    break;
    case 1:
    {
      var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(0);
      if(transAnimFlag == false){ //アニメ再生が完了した場合
        MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = 2; //バトルシーン切り替え演出を開始
      }
    }
    break;
    case 2:
    {
      if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
      SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
      MESSAGE_WINDOW_BATTLE_SCENE_CHANGE_ANIM_STEP = -1;
      G_MESSAGE_WINDOW_DELETE();
      sceneObj.exit("battle"); //バトルシーンへ
    }
    break;
    default:
    break;
  }
}

//メッセージウィンドウを削除
function G_MESSAGE_WINDOW_DELETE(){
  if(MESSAGE_WINDOW_OBJ != null){ //メッセージが表示されていれば削除
    MESSAGE_WINDOW_OBJ.remove();
    MESSAGE_WINDOW_OBJ = null;
  }
}
