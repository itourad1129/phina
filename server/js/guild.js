
//ギルド関連処理

var GUILD_INFO_WINDOW = null;
var GUILD_SETTING_WINDOW = null;
var GUILD_MEMBER_SETTING_WINDOW = null;
var GUILD_SETTING_WINDOW_RETURN_VAL = null;
var GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID = -1;
var GUILD_UPDATE_PLAYER_GUILD_DATA = null;
var GUILD_UPDATE_GUILD_MEMBER_LIST = null;
var GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS = null;
var GUILD_UPDATE_PLAYER_INDEX_ID = -1;
var GUILD_COMMENT_EDIT_WINDOW = null;
var GUILD_COMMENT_EDIT_WINDOW_MASK = null;
var GUILD_COMMENT_EDIT_WINDOW_TEXT = null;
var GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN = null;
var GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN = null;
var GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN = null;
var GUILD_COMMENT_EDIT_VALUE = "";

//プレイヤーギルドデータから対象の権限を取得 0:権限なし 1:スタップ 2:サブリーダー 3:リーダー
function G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,playerGuildData){
  var result = 0;
  if(playerGuildData != null){
    if(isset(playerGuildData['staff_player_index_ids']) && playerGuildData['staff_player_index_ids'] != ""){
      var staffList = playerGuildData['staff_player_index_ids'].split(',');
      for (var i = 0; i < staffList.length; i++) {
        if(staffList[i] == playerIndexId){
          result = 1;
          break;
        }
      }
    }
    if(isset(playerGuildData['sub_leader_player_index_ids']) && playerGuildData['sub_leader_player_index_ids'] != ""){
      var subLeaderList = playerGuildData['sub_leader_player_index_ids'].split(',');
      for (var i = 0; i < subLeaderList.length; i++) {
        if(subLeaderList[i] == playerIndexId){
          result = 2;
          break;
        }
      }
    }
    if(isset(playerGuildData['guild_leader_player_index_id']) && playerGuildData['guild_leader_player_index_id'] == playerIndexId){
      result = 3;
    }
  }
  return result;
}

//ギルド情報画面を生成
function G_GUILD_CREATE_GUILD_INFO_WINDOW(sceneObj,playerGuildData,playerGuildMemberDatas){
  if(playerGuildData == null) return null;
  result = null;
  result = Sprite('ASSET_64'); //マスクを作成;
  result['window_bg'] = Sprite('ASSET_160').addChildTo(result); //ウィンドウ背景を作成;
  result['scene_obj'] = sceneObj;
  result['guild_id'] = playerGuildData['guild_id'];

  //ギルド名
  result['title'] = Label({
    text: playerGuildData['guild_name'],
    fontSize: 42,
    fill: 'white',
    align: 'center',
  }).addChildTo(result['window_bg']);
  result['title'].y = result['title'].y - (result['window_bg'].height / 3);

  //ギルドレベル
  result['guild_level'] = Label({
    text: "ギルドレベル:",
    fontSize: 32,
    fill: 'white',
    align: 'left',
  }).addChildTo(result['window_bg']);
  result['guild_level'].y = result['title'].y;
  result['guild_level'].y = result['guild_level'].y + result['title'].height * 1.25;
  result['guild_level'].x = result['guild_level'].x - ((result['window_bg'].width / 2) - result['guild_level'].width);

  //ギルドレベル数値
  var guildLevelMasterData = G_GUILD_GET_GUILD_LEVEL_MASTER_DATA(playerGuildData['guild_exp'],MASTER_DATA_GUILD_LEVEL_MASTER);
  var guildLevel = 1;
  if(guildLevelMasterData != null){ guildLevel = guildLevelMasterData['level']; }
  result['guild_level_num'] = Label({
    text: "Lv." + guildLevel,
    fontSize: 32,
    fill: 'white',
    align: 'right',
  }).addChildTo(result['window_bg']);
  result['guild_level_num'].y = result['guild_level'].y;
  result['guild_level_num'].x = result['guild_level_num'].x + ((result['window_bg'].width / 2) - result['guild_level_num'].width);

  //レベルアップまで
  result['level_up'] = Label({
    text: "レベルアップまで:",
    fontSize: 32,
    fill: 'white',
    align: 'left',
  }).addChildTo(result['window_bg']);
  result['level_up'].y = result['guild_level'].y;
  result['level_up'].y = result['level_up'].y + result['level_up'].height * 1.25;
  result['level_up'].x = result['level_up'].x - ((result['window_bg'].width / 2) - result['level_up'].width);

  //レベルアップまで(ゲージ)
  var nowExp = parseInt(playerGuildData['guild_exp']);
  var levelUpExp = 0;
  if(guildLevelMasterData != null) levelUpExp = parseInt(guildLevelMasterData['level_up_exp']);
  var gaugeValue = parseInt((nowExp / levelUpExp) * 100);
  result['level_up_gauge'] = Gauge({ //敵勢力ゲージを表示
    width: 216,            // 横サイズ
    height: 32,            // 縦サイズ
    maxValue: 100,         // ゲージ最大値
    value: gaugeValue,     // ゲージ初期値
    fill: 'white',         // 後ろの色
    gaugeColor: 'orange', // ゲージ色
    stroke: 'gray',      // 枠色
    strokeWidth: 10,        // 枠太さ
  }).addChildTo(result['window_bg']);
  result['level_up_gauge'].y = result['level_up'].y;
  result['level_up_gauge'].x = result['level_up_gauge'].x + ((result['window_bg'].width / 2) - (result['level_up_gauge'].width * 0.8));

  //レベルアップまで(ゲージテキスト)
  result['level_up_gauge_text'] = Label({
    text: nowExp + "/" + levelUpExp,
    fontSize: 12,
    fill: 'white',
    align: 'center',
  }).addChildTo(result['level_up_gauge']);
  result['level_up_gauge_text'].y = result['level_up_gauge_text'].y + (result['level_up_gauge_text'].height / 2);

  //参加人数
  result['guild_member_count'] = Label({
    text: "参加人数:",
    fontSize: 32,
    fill: 'white',
    align: 'left',
  }).addChildTo(result['window_bg']);
  result['guild_member_count'].y = result['level_up'].y;
  result['guild_member_count'].y = result['guild_member_count'].y + result['level_up'].height * 1.25;
  result['guild_member_count'].x = result['guild_member_count'].x - ((result['window_bg'].width / 2) - result['guild_member_count'].width);

  //参加人数数値
  var maxMemberCount = "---";
  var nowMemberCount = "---";
  if(guildLevelMasterData != null){
    maxMemberCount = guildLevelMasterData['max_member'];
  }
  if(playerGuildMemberDatas != null && playerGuildMemberDatas.length != 0){
    nowMemberCount = playerGuildMemberDatas.length;
  }
  result['guild_member_count_num'] = Label({
    text: nowMemberCount + "/" + maxMemberCount,
    fontSize: 32,
    fill: 'white',
    align: 'right',
  }).addChildTo(result['window_bg']);
  result['guild_member_count_num'].y = result['guild_member_count'].y;
  result['guild_member_count_num'].x = result['guild_member_count_num'].x + ((result['window_bg'].width / 2) - result['guild_member_count_num'].width);

  //募集状態
  result['guild_scout'] = Label({
    text: "募集状態:",
    fontSize: 32,
    fill: 'white',
    align: 'left',
  }).addChildTo(result['window_bg']);
  result['guild_scout'].y = result['guild_member_count'].y;
  result['guild_scout'].y = result['guild_scout'].y + result['level_up'].height * 1.25;
  result['guild_scout'].x = result['guild_scout'].x - ((result['window_bg'].width / 2) - result['guild_scout'].width);

  //募集状態:内容
  var scountCondition = "";
  if(playerGuildData['guild_scout_status'] == 0) scountCondition = "募集中";
  if(playerGuildData['guild_scout_status'] == 1) scountCondition = "募集中(承認不要)";
  if(playerGuildData['guild_scout_status'] == 2) scountCondition = "募集締め切り";
  result['guild_scout_condition'] = Label({
    text: scountCondition,
    fontSize: 32,
    fill: 'white',
    align: 'right',
  }).addChildTo(result['window_bg']);
  result['guild_scout_condition'].y = result['guild_scout'].y;
  result['guild_scout_condition'].x = result['guild_scout_condition'].x + ((result['window_bg'].width / 2) - result['guild_scout_condition'].width);

  //メッセージウィンドウ
  result['message_window'] = Sprite('ASSET_414').addChildTo(result['window_bg']);
  result['message_window'].y = result['guild_scout'].y;
  result['message_window'].y = result['message_window'].y + result['message_window'].height * 0.75;
  var message = "[メッセージ]\n" + playerGuildData['message'];
  result['message_window']['label_area'] = LabelArea({
    height: 172,
    width: 524,
    text: message,
    fontSize: 24,
    fill: 'white',
    align: 'left',
    baseline: 'top',
  }).addChildTo(result['message_window']);

  //メンバー一覧ボタン
  result['member_list_button'] = Sprite('ASSET_163').addChildTo(result['window_bg']);
  result['member_list_button'].y = result['message_window'].y;
  result['member_list_button'].y = result['member_list_button'].y + ((result['message_window'].height / 2) * 1.5);
  result['member_list_button'].x = result['member_list_button'].x - result['member_list_button'].width * 0.6;
  //ボタンラベル
  result['member_list_button']['label'] = Label({
    text: "メンバーリスト",
    fontSize: 28,
    fill: 'white',
  }).addChildTo(result['member_list_button']);
  //ボタン本体
  result['member_list_button']['button'] = Button({
    width: result['member_list_button'].width,         // 横サイズ
    height: result['member_list_button'].height,        // 縦サイズ
  }).addChildTo(result['member_list_button']);
  result['member_list_button']['button']['guild_id'] = playerGuildData['guild_id'];
  result['member_list_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_LIST == null && WINDOW_NORMAL == null && WINDOW_LIST == null){
      var postParam = new Object();
      postParam['get_guild_member_list'] = this['guild_id'];
      GUILD_INFO_RESULT_DATA = -1; //通信待機中にする
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
    }
  };
  result['member_list_button']['button'].visible = false;

  //ギルドランキングボタン
  result['guild_ranking_button'] = Sprite('ASSET_163').addChildTo(result['window_bg']);
  result['guild_ranking_button'].y = result['member_list_button'].y;
  result['guild_ranking_button'].x = result['guild_ranking_button'].x + result['guild_ranking_button'].width * 0.6;
  //ボタンラベル
  result['guild_ranking_button']['label'] = Label({
    text: "ギルドランキング",
    fontSize: 28,
    fill: 'white',
  }).addChildTo(result['guild_ranking_button']);
  //ボタン本体
  result['guild_ranking_button']['button'] = Button({
    width: result['guild_ranking_button'].width,         // 横サイズ
    height: result['guild_ranking_button'].height,        // 縦サイズ
  }).addChildTo(result['guild_ranking_button']);
  result['guild_ranking_button']['button']['scene_obj'] = result['scene_obj'];
  result['guild_ranking_button']['button']['guild_id'] = playerGuildData['guild_id'];
  result['guild_ranking_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_LIST == null && WINDOW_NORMAL == null && WINDOW_LIST == null){
      GUILD_INFO_WINDOW.remove();
      GUILD_INFO_WINDOW = null;
      SCENE_MANAGER['prev_scene'] = "myPage";
      G_GUILD_DESTROY();
      this['scene_obj'].exit("eventTop", {start_event_category: 1, set_guild_id: this['guild_id']}); //テストでポイントランキング表示中
    }
  };
  result['guild_ranking_button']['button'].visible = false;

  //閉じるボタン
  result['close_button'] = Sprite('ASSET_79').addChildTo(result['window_bg']);
  result['close_button'].y = result['guild_ranking_button'].y;
  result['close_button'].y = result['close_button'].y + result['close_button'].height * 1.25;
  //ボタンラベル
  result['close_button']['label'] = Label({
    text: "閉じる",
    fontSize: 32,
    fill: 'white',
  }).addChildTo(result['close_button']);
  //ボタン本体
  result['close_button']['button'] = Button({
    width: result['close_button'].width,         // 横サイズ
    height: result['close_button'].height,        // 縦サイズ
  }).addChildTo(result['close_button']);
  result['close_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_LIST == null && WINDOW_NORMAL == null){
      GUILD_INFO_WINDOW.remove();
      GUILD_INFO_WINDOW = null;
    }
  };
  result['close_button']['button'].visible = false;

  result.update = function(){
    if(GUILD_INFO_RESULT_DATA != -1 && GUILD_INFO_RESULT_DATA != "" && G_ASSET_LOADER(GUILD_INFO_RESULT_DATA)){
      var json = JSON.parse(GUILD_INFO_RESULT_DATA);//jsonをパース
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          //ギルドメンバーリストのデータ更新が行われた
          if(isset(json['get_update_guild_member_list']) && isset(json['get_update_player_guild_data']) && isset(json['get_update_player_list_avatar_asset_datas'])){
            GUILD_UPDATE_PLAYER_INDEX_ID = json['player_info']['player_index_id'];
            GUILD_UPDATE_PLAYER_GUILD_DATA = json['get_update_player_guild_data'];
            GUILD_UPDATE_GUILD_MEMBER_LIST = json['get_update_guild_member_list'];
            GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS = json['get_update_player_list_avatar_asset_datas'];
          }
          //ギルドメンバーを取得
          if(isset(json['result_player_guild_data']) && isset(json["result_guild_member_list"]) && isset(json['result_player_list_avatar_asset_datas'])){
            var playerGuildData = json['result_player_guild_data'];
            var guildMemberDatas = json["result_guild_member_list"];
            var playerListAvatarAssetData = json['result_player_list_avatar_asset_datas'];
            var playerIndexId = json['player_info']['player_index_id'];
            var listObj = G_GUILD_CREATE_MEMBER_LIST(playerIndexId,playerGuildData,guildMemberDatas,playerListAvatarAssetData,false); //メンバーリストオブジェクトを生成
            if(listObj != null){
              G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"ギルドメンバー","閉じる");
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          G_GUILD_DESTROY();
          this['scene_obj'].exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        G_GUILD_DESTROY();
        this['scene_obj'].exit("title");
      }
      GUILD_INFO_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
  }
  GUILD_INFO_WINDOW = result;
  return result;
}

//経験値からレベルマスターデータを取得
function G_GUILD_GET_GUILD_LEVEL_MASTER_DATA(exp,guildLevelMasterDatas){
  var result = null;
  if(guildLevelMasterDatas != null){
    for (var i = 0; i < guildLevelMasterDatas.length; i++) {
      if(parseInt(guildLevelMasterDatas[i]['level_up_exp']) <= exp){
        result = guildLevelMasterDatas[i];
      }
    }
  }
  return result;
}

//メンバーリストを生成
function G_GUILD_CREATE_MEMBER_LIST(playerIndexId,playerGuildData,guildMemberDatas,playerListAvatarAssetData,editMember = false){
  var listObj = PlainElement({});
  var listCell = new Array();
  //権限取得
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,playerGuildData);
  if(playerGuildData == null || guildMemberDatas == null || guildMemberDatas.length == 0) return null;
  var cellSizeHeight = 0;
  var cellPosY = 0;
  for (var i = 0; i < guildMemberDatas.length; i++) {
    member = guildMemberDatas[i];
    //セル背景表示
    listCell[listCell.length] = Sprite('ASSET_159').addChildTo(listObj);
    if(i == 0){
      cellSizeHeight = listCell[i].height;
      listObj['list_height_size'] = cellSizeHeight;
      cellPosY = cellPosY + cellSizeHeight;
    }
    else{
      listCell[i].y = cellPosY;
      listObj['list_height_size'] = listObj['list_height_size'] + cellSizeHeight;
      cellPosY = cellPosY + cellSizeHeight;
    }
    //プレイヤーアバターとプレイヤープロフィールボタン表示
    if(isset(playerListAvatarAssetData[member['player_index_id']])){
      //アバター
      var avatarData = playerListAvatarAssetData[member['player_index_id']];
      var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(avatarData['player_avatar_data'],avatarData['player_equip_item_data']);
      listCell[i]['avatar'] = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.225, 0.225, avatarData['player_avatar_data']['visible_head_equip_item']);
      listCell[i]['avatar']['sprites'][0].addChildTo(listCell[i]);
      listCell[i]['avatar']['sprites'][0].x = listCell[i]['avatar']['sprites'][0].x - (listCell[i].width * 0.3);
      listCell[i]['avatar']['sprites'][0].y = listCell[i]['avatar']['sprites'][0].y - (listCell[i].height * 0.2);
      //ボタン
      listCell[i]['avatar_button'] = Button({
        width: 110,
        height: 110,
      }).addChildTo(listCell[i]);
      listCell[i]['avatar_button'].x = listCell[i]['avatar_button'].x - ((listCell[i].width / 2) - listCell[i]['avatar_button'].width);
      listCell[i]['avatar_button']['player_index_id'] = member['player_index_id'];
      listCell[i]['avatar_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
          //プレイヤープロフィール表示処理
          if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
            G_UI_CREATE_PLAYER_PROFILE(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],this['player_index_id']); //プレイヤープロフィールを生成
          }
        }
      };
      listCell[i]['avatar_button'].visible = false;
    }
    //プレイヤー名
    listCell[i]['player_name_label'] = Label({
      text: member['player_name'],
      fontSize: 24,
      fill: 'black',
      align: 'left',
    }).addChildTo(listCell[i]);
    listCell[i]['player_name_label'].x = listCell[i]['player_name_label'].x - ((listCell[i].width / 2) - (listCell[i].width * 0.125));
    listCell[i]['player_name_label'].y = listCell[i]['player_name_label'].y - (listCell[i].height * 0.3);
    //階級アイコン
    listCell[i]['guild_class_icon'] = G_GUILD_GET_MEMBER_CLASS_ICON(member['player_index_id'],playerGuildData);
    if(listCell[i]['guild_class_icon'] != null){
      listCell[i]['guild_class_icon'].addChildTo(listCell[i]);
      listCell[i]['guild_class_icon'].width = (listCell[i]['guild_class_icon'].width * 0.25);
      listCell[i]['guild_class_icon'].height = (listCell[i]['guild_class_icon'].height * 0.25);
      listCell[i]['guild_class_icon'].x = listCell[i]['guild_class_icon'].x - (listCell[i]['guild_class_icon'].width * 2);
    }
    //プレイヤーレベル
    listCell[i]['player_level_label'] = Label({
      text: "Lv." + member['player_level'],
      fontSize: 24,
      fill: 'black',
      align: 'left',
    }).addChildTo(listCell[i]);
    listCell[i]['player_level_label'].x = listCell[i]['guild_class_icon'].x;
    listCell[i]['player_level_label'].x = listCell[i]['player_level_label'].x - (listCell[i]['guild_class_icon'].width / 2);
    listCell[i]['player_level_label'].y = listCell[i]['player_level_label'].y + listCell[i]['guild_class_icon'].height;
    //プレイヤー情報ボタン
    listCell[i]['player_info_btn'] = Sprite('ASSET_79').addChildTo(listCell[i]);
    listCell[i]['player_info_btn'].x = listCell[i]['player_info_btn'].x + listCell[i]['player_info_btn'].width;
    listCell[i]['player_info_btn'].y = listCell[i]['player_info_btn'].y - (listCell[i]['player_info_btn'].height / 2);
    listCell[i]['player_info_btn']['label'] = Label({
      text: "プレイヤー情報",
      fontSize: 20,
      fill: 'white',
      align: 'center',
    }).addChildTo(listCell[i]['player_info_btn']);
    listCell[i]['player_info_btn']['button'] = Button({
      width: listCell[i]['player_info_btn'].width,
      height: listCell[i]['player_info_btn'].height,
    }).addChildTo(listCell[i]['player_info_btn']);
    listCell[i]['player_info_btn']['button']['player_index_id'] = member['player_index_id'];
    listCell[i]['player_info_btn']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
        //プレイヤープロフィール表示処理
        if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
          G_UI_CREATE_PLAYER_PROFILE(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],this['player_index_id']); //プレイヤープロフィールを生成
        }
      }
    };
    listCell[i]['player_info_btn']['button'].visible = false;
    if(editMember == true){ //メンバー編成、設定変更
      //設定変更
      listCell[i]['member_edit_btn'] = Sprite('ASSET_79').addChildTo(listCell[i]);
      listCell[i]['member_edit_btn'].x = listCell[i]['player_info_btn'].x;
      listCell[i]['member_edit_btn'].y = listCell[i]['player_info_btn'].y;
      listCell[i]['member_edit_btn'].y = listCell[i]['member_edit_btn'].y + listCell[i]['member_edit_btn'].height * 1.25;
      listCell[i]['member_edit_btn']['label'] = Label({
        text: "設定変更",
        fontSize: 20,
        fill: 'white',
        align: 'center',
      }).addChildTo(listCell[i]['member_edit_btn']);
      listCell[i]['member_edit_btn']['button'] = Button({
        width: listCell[i]['member_edit_btn'].width,
        height: listCell[i]['member_edit_btn'].height,
      }).addChildTo(listCell[i]['member_edit_btn']);
      listCell[i]['member_edit_btn']['button']['my_player_index_id'] = playerIndexId;
      listCell[i]['member_edit_btn']['button']['player_info'] = member;
      listCell[i]['member_edit_btn']['button']['guild_class_id'] = guildClassId;
      listCell[i]['member_edit_btn']['button']['player_guild_data'] = playerGuildData;
      listCell[i]['member_edit_btn']['button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(this['guild_class_id'] == 0 && this['player_info']['player_index_id'] != this['my_player_index_id']) return;
        if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PARTY_INFO == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
          //ギルドメンバー設定変更画面を表示
          GUILD_MEMBER_SETTING_WINDOW = GUILD_CREATE_GUILD_MEMMBER_SETTING_WINDOW(this['my_player_index_id'],this['player_info'],this['player_guild_data']);
          if(WINDOW_LIST != null && GUILD_MEMBER_SETTING_WINDOW != null) GUILD_MEMBER_SETTING_WINDOW.addChildTo(WINDOW_LIST);
        }
      };
      listCell[i]['member_edit_btn']['button'].visible = false;
      //権限なしで他人の設定内容を指していた場合、
      if(listCell[i]['member_edit_btn']['button']['my_player_index_id']
      != listCell[i]['member_edit_btn']['button']['player_info']['player_index_id']
      && guildClassId == 0) {listCell[i]['member_edit_btn'].alpha = 0.5;}
    }
  }
  listObj.y = listObj.y - (listObj['list_height_size'] / 2);
  listObj.y = listObj.y + (cellSizeHeight / 2);
  return listObj;
}

//メンバーの階級アイコン画像を取得
function G_GUILD_GET_MEMBER_CLASS_ICON(playerIndexId,playerGuildData){
  var result = null;
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,playerGuildData);
  resultAssetId = -1;
  switch (guildClassId) {
    case 3: //リーダー
    resultAssetId = 976;
    break;
    case 2: //サブリーダー
    resultAssetId = 975;
    break;
    case 1: //スタッフ
    resultAssetId = 974;
    break;
    default: //一般
    resultAssetId = 973;
    break;
  }
  if(resultAssetId != -1){
    result = Sprite('ASSET_' + resultAssetId); //アセット画像を取得;
  }
  return result;
}

//クラスIDからクラス名を取得
function G_GUILD_GET_CLASS_NAME(guildClassId){
  switch (guildClassId) {
    case 3: //リーダー
    result = "ギルドマスター";
    break;
    case 2: //サブリーダー
    result = "サブリーダー";
    break;
    case 1: //スタッフ
    result = "スタッフ";
    break;
    default: //一般
    result = "一般";
    break;
  }
  return result;
}

//メンバーの階級名を取得
function G_GUILD_GET_MEMBER_CLASS_NAME(playerIndexId,playerGuildData){
  var result = "一般";
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,playerGuildData);
  result = G_GUILD_GET_CLASS_NAME(guildClassId);
  return result;
}

//ギルド設定画面を生成
function G_GUILD_CREATE_GUILD_SETTING_WINDOW(sceneObj,playerIndexId,playerGuildData,playerGuildMemberDatas){
  if(playerGuildData == null) return null;
  result = null;
  result = Sprite('ASSET_64'); //マスクを作成;
  result['window_bg'] = Sprite('ASSET_160').addChildTo(result); //ウィンドウ背景を作成;
  result['scene_obj'] = sceneObj;
  result['player_guild_data'] = playerGuildData;
  //権限取得
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,result['player_guild_data']);
  //タイトル
  result['title_label'] = Label({
    text: "ギルド設定",
    fontSize: 42,
    fill: 'white',
  }).addChildTo(result['window_bg']);
  result['title_label'].y = result['title_label'].y - ((result['window_bg'].height / 2) - result['title_label'].height * 2);

  //ボタン各種の設定
  buttons = new Array();
  buttons[0] = new Array();
  buttons[0]['button_text'] = "ギルドメンバー";
  buttons[0]['button_text_size'] = 26;
  buttons[1] = new Array();
  buttons[1]['button_text'] = "参加申請一覧";
  buttons[1]['button_text_size'] = 26;
  buttons[2] = new Array();
  buttons[2]['button_text'] = "メッセージ";
  buttons[2]['button_text_size'] = 26;
  buttons[3] = new Array();
  buttons[3]['button_text'] = "募集内容変更";
  buttons[3]['button_text_size'] = 26;
  buttons[4] = new Array();
  buttons[4]['button_text'] = "コメント変更";
  buttons[4]['button_text_size'] = 26;
  buttons[5] = new Array();
  buttons[5]['button_text'] = "ギルドハウス";
  buttons[5]['button_text_size'] = 26;
  buttons[6] = new Array();
  buttons[6]['button_text'] = "管理者設定";
  buttons[6]['button_text_size'] = 26;
  //設定ボタンを生成
  result['menu_buttons'] = new Array();
  var posXSwitch = false;
  var btnPosY = result['title_label'].y;
  for (var btnIdx = 0; btnIdx < buttons.length; btnIdx++) {
    result['menu_buttons'][btnIdx] = Sprite('ASSET_818').addChildTo(result['window_bg']);
    //位置を決定
    if(btnIdx == 0){
      btnPosY = btnPosY  + result['menu_buttons'][btnIdx].height * 1.5;
    }

    btnPosX = result['menu_buttons'][btnIdx].x;
    result['menu_buttons'][btnIdx].y = btnPosY;
    if(posXSwitch == true){
      btnPosX = btnPosX + result['menu_buttons'][btnIdx].width * 0.6;
      btnPosY = btnPosY  + result['menu_buttons'][btnIdx].height * 1.5;
      posXSwitch = false;
    }
    else{
      btnPosX = btnPosX - result['menu_buttons'][btnIdx].width * 0.6;
      posXSwitch = true;
    }
    result['menu_buttons'][btnIdx].x = btnPosX;
    //ボタンラベル
    result['menu_buttons'][btnIdx]['label'] = Label({
      text: buttons[btnIdx]['button_text'],
      fontSize: buttons[btnIdx]['button_text_size'],
      fill: 'black',
    }).addChildTo(result['menu_buttons'][btnIdx]);
    //ボタン本体
    result['menu_buttons'][btnIdx]['button'] = Button({
      width: result['menu_buttons'][btnIdx].width,         // 横サイズ
      height: result['menu_buttons'][btnIdx].height,        // 縦サイズ
    }).addChildTo(result['menu_buttons'][btnIdx]);
    result['menu_buttons'][btnIdx]['button']['params'] = new Array();
    result['menu_buttons'][btnIdx]['button']['params']['guild_id'] = result['player_guild_data']['guild_id'];
    result['menu_buttons'][btnIdx]['button']['params']['my_guild_class_id'] = guildClassId;
    result['menu_buttons'][btnIdx]['button']['params']['button_idx'] = btnIdx;
    result['menu_buttons'][btnIdx]['button']['params']['guild_scout_status'] = result['player_guild_data']['guild_scout_status'];
    result['menu_buttons'][btnIdx]['button']['params']['message'] = result['player_guild_data']['message'];
    result['menu_buttons'][btnIdx]['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      this['params']['guild_scout_status'] = this.parent.parent.parent['player_guild_data']['guild_scout_status'];
      if(NETWORK_IS_CONNECTING == false && WINDOW_LIST == null && WINDOW_NORMAL == null && GUILD_COMMENT_EDIT_WINDOW == null){
        console.log("ボタン押した１２３");
        GUILD_SETTING_WINDOW_BTN_PUSH(this['params']);
        console.log(this['params']);
      }
    };
    result['menu_buttons'][btnIdx]['button'].visible = false;
  }
  //閉じるボタン
  result['close_button'] = Sprite('ASSET_79').addChildTo(result['window_bg']);
  result['close_button'].y = result['close_button'].y + ((result['window_bg'].height / 2) - (result['close_button'].height * 2));
  //ボタンラベル
  result['close_button']['label'] = Label({
    text: "閉じる",
    fontSize: 32,
    fill: 'white',
  }).addChildTo(result['close_button']);
  //ボタン本体
  result['close_button']['button'] = Button({
    width: result['close_button'].width,         // 横サイズ
    height: result['close_button'].height,        // 縦サイズ
  }).addChildTo(result['close_button']);
  result['close_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_LIST == null && WINDOW_NORMAL == null && GUILD_COMMENT_EDIT_WINDOW == null){
      GUILD_SETTING_WINDOW.remove();
      GUILD_SETTING_WINDOW = null;
    }
  };
  result['close_button']['button'].visible = false;

  result.update = function(){
    if(GUILD_SETTING_RESULT_DATA != -1 && GUILD_SETTING_RESULT_DATA != "" && G_ASSET_LOADER(GUILD_SETTING_RESULT_DATA)){
      var json = JSON.parse(GUILD_SETTING_RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          //呼び出し元のギルドデータの更新が必要
          if(isset(json['get_update_player_guild_data'])){
            var getUpdatePlayerGuildData = json['get_update_player_guild_data'];
            GUILD_UPDATE_PLAYER_GUILD_DATA = getUpdatePlayerGuildData;
            //開いているシーン別に必要なデータを更新
            if(SCENE_MANAGER['now_scene'] == "map"){ //MAPシーンの場合
              MAP_PLAYER_GUILD_DATA = getUpdatePlayerGuildData;
              console.log("ギルドデータ更新");
              console.log(MAP_PLAYER_GUILD_DATA);
            }
            //etc...
          }
          //ギルドメンバーリストのデータ更新が行われた
          if(isset(json['get_update_guild_member_list']) && isset(json['get_update_player_guild_data']) && isset(json['get_update_player_list_avatar_asset_datas'])){
            GUILD_UPDATE_PLAYER_INDEX_ID = json['player_info']['player_index_id'];
            GUILD_UPDATE_PLAYER_GUILD_DATA = json['get_update_player_guild_data'];
            GUILD_UPDATE_GUILD_MEMBER_LIST = json['get_update_guild_member_list'];
            GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS = json['get_update_player_list_avatar_asset_datas'];
          }
          //メンバーリスト表示
          if(isset(json['result_player_guild_data']) && isset(json["result_guild_member_list"]) && isset(json['result_player_list_avatar_asset_datas'])){ //ギルドメンバーを取得
            var resultPlayerGuildData = json['result_player_guild_data'];
            var resultGuildMemberDatas = json["result_guild_member_list"];
            var resultPlayerListAvatarAssetData = json['result_player_list_avatar_asset_datas'];
            var playerIndexId = json['player_info']['player_index_id'];
            var listObj = G_GUILD_CREATE_MEMBER_LIST(playerIndexId,resultPlayerGuildData,resultGuildMemberDatas,resultPlayerListAvatarAssetData,true); //メンバーリストオブジェクトを生成
            if(listObj != null){
              G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"ギルドメンバー","閉じる");
            }
          }
          //メンバーのクラスアップを実行した。
          if(isset(json['result_guild_member_class_up'])){
            var resultClassUp = json['result_guild_member_class_up'];
            if(isset(resultClassUp['error'])){
              if(resultClassUp['error'] == 0){
                G_NORMAL_WINDOW_CREATE(
                  WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                  "ギルドメンバーの昇格",
                  "メンバーを昇格させました",
                  0,
                  "classUpGuildMemberSuccessWindow"
                );
              }
              else{ //クラスアップ実行エラー
                console.log("エラーウィンドウ表示");
                G_NORMAL_WINDOW_CREATE(
                  WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                  "エラー",
                  resultClassUp['error_comment'],
                  0,
                  "classUpGuildMemberErrorWindow"
                );
              }
            }
          }
          //メンバーのクラスアップを実行した。
          if(isset(json['result_guild_member_class_down'])){
            var resultClassUp = json['result_guild_member_class_down'];
            if(isset(resultClassUp['error'])){
              if(resultClassUp['error'] == 0){
                G_NORMAL_WINDOW_CREATE(
                  WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                  "ギルドメンバーの降格",
                  "メンバーを降格させました",
                  0,
                  "classDownGuildMemberSuccessWindow"
                );
              }
              else{ //クラスアップ実行エラー
                console.log("エラーウィンドウ表示");
                G_NORMAL_WINDOW_CREATE(
                  WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                  "エラー",
                  resultClassUp['error_comment'],
                  0,
                  "classDownGuildMemberErrorWindow"
                );
              }
            }
          }
          //参加申請一覧を取得
          if(isset(json['result_guild_join_application_player_list'])){
            var applicationList = json['result_guild_join_application_player_list'];
            if(applicationList.length == 0){ //参加申請が0件
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "参加申請一覧",
                "現在参加申請は届いていません",
                0,
                "applicationListCountZeroWindow"
              );
            }else{ //リストを表示
              if(isset(json['result_appliction_player_list_avatar_asset_datas'])
              && isset(json['result_player_guild_data'])
              && isset(json['player_info']['player_index_id']) && isset(json['result_player_datas'])){
                var resultPlayerListAvatarAssetData = json['result_appliction_player_list_avatar_asset_datas'];
                var resultPlayerGuildData = json['result_player_guild_data'];
                var playerIndexId = json['player_info']['player_index_id'];
                var resultPlayerDatas = json['result_player_datas'];
                var listObj = G_GUILD_CREATE_GUILD_APPLICATION_PLAYER_LIST(playerIndexId,resultPlayerGuildData,resultPlayerDatas,applicationList,resultPlayerListAvatarAssetData);
                if(listObj != null){
                  G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"参加申請一覧","閉じる");
                }
              }
            }
          }
          //ギルドメンバーを追放した。
          if(isset(json['result_guild_member_expulsion'])){
            var resultExpulsion = json['result_guild_member_expulsion'];
            if(resultExpulsion['error'] == 0){
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "ギルドメンバーの追放",
                "メンバーを追放しました",
                0,
                "guildMemberExpulsionSuccessWindow"
              );
            }
            else{
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "エラー",
                resultExpulsion['error_comment'],
                0,
                "guildMemberExpulsionErrorWindow"
              );
            }
          }
          //所属ギルドを離脱した。
          if(isset(json['result_my_guild_exit'])){
            var resultMyGuildExit = json['result_my_guild_exit'];
            if(resultMyGuildExit['error'] == 0){
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "ギルド離脱",
                "ギルドを離脱しました",
                0,
                "guildExitSuccessWindow"
              );
            }
            else{
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "エラー",
                resultMyGuildExit['error_comment'],
                0,
                "guildExitErrorWindow"
              );
            }
          }
          //ギルド募集内容の変更を行った
          if(isset(json['result_setting_guild_scout_status'])){
            var resultScoutSetting = json['result_setting_guild_scout_status'];
            if(resultScoutSetting['error'] == 0){
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "募集内容変更",
                "募集内容を変更しました",
                0,
                "guildSettingScoutStatusSuccessWindow"
              );
              //一部の情報を変更
              if(GUILD_SETTING_WINDOW != null){
                console.log("一部の情報を変更");
                GUILD_SETTING_WINDOW['player_guild_data'] = GUILD_UPDATE_PLAYER_GUILD_DATA;
                console.log(GUILD_SETTING_WINDOW['player_guild_data']);
              }
            }
            else{
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "エラー",
                resultScoutSetting['error_comment'],
                0,
                "guildSettingScoutStatusErrorWindow"
              );
            }
          }
          //ギルドメッセージの変更があった
          if(isset(json['result_guild_message_update'])){
            var resultUpdateMsg = json['result_guild_message_update'];
            if(resultUpdateMsg['error'] == 0){
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "ギルドメッセージ更新",
                "メッセージを変更しました",
                0,
                "guildMsgUpdateSuccessWindow"
              );
              //一部の情報を変更
              if(GUILD_SETTING_WINDOW != null){
                console.log("一部の情報を変更");
                GUILD_SETTING_WINDOW['player_guild_data'] = GUILD_UPDATE_PLAYER_GUILD_DATA;
                console.log(GUILD_SETTING_WINDOW['player_guild_data']);
              }
            }
            else{
              G_NORMAL_WINDOW_CREATE(
                WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
                "エラー",
                resultUpdateMsg['error_comment'],
                0,
                "guildMsgUpdateErrorWindow"
              );
            }
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          G_GUILD_DESTROY();
          this['scene_obj'].exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        G_GUILD_DESTROY();
        this['scene_obj'].exit("title");
      }
      GUILD_SETTING_RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
    if(GUILD_SETTING_WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      //ギルドメンバー昇格の確認をした
      if(GUILD_SETTING_WINDOW_RETURN_VAL['checkClassUpGuildMemberClassWindow'] == "yes"){
        //昇格処理を開始
        var postParam = new Object();
        postParam['guild_member_class_up'] = GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID;
        postParam['update_guild_member_list'] = parseInt(this['player_guild_data']['guild_id']);
        GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
      }
      //ギルドメンバーを昇格させた
      if(GUILD_SETTING_WINDOW_RETURN_VAL['classUpGuildMemberSuccessWindow'] == "ok"){
        if(GUILD_MEMBER_SETTING_WINDOW != null){ //メンバー設定ウィンドウ削除
          GUILD_MEMBER_SETTING_WINDOW.remove();
          GUILD_MEMBER_SETTING_WINDOW = null;
        }
        G_UI_WINDOW_LIST_DELETE(); //メンバーリスト削除
        //メンバーリスト表示
        if(GUILD_UPDATE_PLAYER_INDEX_ID != -1
          && GUILD_UPDATE_PLAYER_GUILD_DATA != null
          && GUILD_UPDATE_GUILD_MEMBER_LIST != null
          && GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS != null){
          var listObj = G_GUILD_CREATE_MEMBER_LIST(GUILD_UPDATE_PLAYER_INDEX_ID,
            GUILD_UPDATE_PLAYER_GUILD_DATA,GUILD_UPDATE_GUILD_MEMBER_LIST,
            GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS,true); //メンバーリストオブジェクトを生成
          if(listObj != null){
            G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"ギルドメンバー","閉じる");
          }
        }
      }
      //ギルドメンバー降格の確認をした
      if(GUILD_SETTING_WINDOW_RETURN_VAL['checkClassDownGuildMemberClassWindow'] == "yes"){
        //降格処理を開始
        var postParam = new Object();
        postParam['guild_member_class_down'] = GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID;
        postParam['update_guild_member_list'] = parseInt(this['player_guild_data']['guild_id']);
        GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
      }
      //ギルドメンバーを昇格させた
      if(GUILD_SETTING_WINDOW_RETURN_VAL['classDownGuildMemberSuccessWindow'] == "ok"){
        if(GUILD_MEMBER_SETTING_WINDOW != null){ //メンバー設定ウィンドウ削除
          GUILD_MEMBER_SETTING_WINDOW.remove();
          GUILD_MEMBER_SETTING_WINDOW = null;
        }
        G_UI_WINDOW_LIST_DELETE(); //メンバーリスト削除
        //メンバーリスト表示
        if(GUILD_UPDATE_PLAYER_INDEX_ID != -1
          && GUILD_UPDATE_PLAYER_GUILD_DATA != null
          && GUILD_UPDATE_GUILD_MEMBER_LIST != null
          && GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS != null){
          var listObj = G_GUILD_CREATE_MEMBER_LIST(GUILD_UPDATE_PLAYER_INDEX_ID,
            GUILD_UPDATE_PLAYER_GUILD_DATA,GUILD_UPDATE_GUILD_MEMBER_LIST,
            GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS,true); //メンバーリストオブジェクトを生成
          if(listObj != null){
            G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"ギルドメンバー","閉じる");
          }
        }
      }
      //ギルドメンバー追放の確認を実行した。
      if(GUILD_SETTING_WINDOW_RETURN_VAL['checkGuildMemberExpulusionWindow'] == "yes"){
        //追放処理を実装
        var postParam = new Object();
        postParam['guild_member_expulsion'] = GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID;
        postParam['update_guild_member_list'] = parseInt(this['player_guild_data']['guild_id']);
        GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
      }
      //ギルドから離脱を確認した。
      if(GUILD_SETTING_WINDOW_RETURN_VAL['checkGuildExitWindow'] == "yes"){
        //離脱処理を実装
        var postParam = new Object();
        postParam['guild_exit'] = parseInt(this['player_guild_data']['guild_id']);
        postParam['update_guild_member_list'] = parseInt(this['player_guild_data']['guild_id']);
        GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
      }
      //ギルドメンバーを追放した
      if(GUILD_SETTING_WINDOW_RETURN_VAL['guildMemberExpulsionSuccessWindow'] == "ok"){
        //追放処理を実装
        if(GUILD_MEMBER_SETTING_WINDOW != null){ //メンバー設定ウィンドウ削除
          GUILD_MEMBER_SETTING_WINDOW.remove();
          GUILD_MEMBER_SETTING_WINDOW = null;
        }
        G_UI_WINDOW_LIST_DELETE(); //メンバーリスト削除
        //メンバーリスト表示
        if(GUILD_UPDATE_PLAYER_INDEX_ID != -1
          && GUILD_UPDATE_PLAYER_GUILD_DATA != null
          && GUILD_UPDATE_GUILD_MEMBER_LIST != null
          && GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS != null){
          var listObj = G_GUILD_CREATE_MEMBER_LIST(GUILD_UPDATE_PLAYER_INDEX_ID,
            GUILD_UPDATE_PLAYER_GUILD_DATA,GUILD_UPDATE_GUILD_MEMBER_LIST,
            GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS,true); //メンバーリストオブジェクトを生成
          if(listObj != null){
            G_UI_CREATE_LIST(this['window_bg'],listObj,listObj['list_height_size'],"ギルドメンバー","閉じる");
          }
        }
      }
      //所属ギルドを離脱した
      if(GUILD_SETTING_WINDOW_RETURN_VAL['guildExitSuccessWindow'] == "ok"){
        //追放処理を実装
        if(GUILD_MEMBER_SETTING_WINDOW != null){ //メンバー設定ウィンドウ削除
          GUILD_MEMBER_SETTING_WINDOW.remove();
          GUILD_MEMBER_SETTING_WINDOW = null;
        }
        G_UI_WINDOW_LIST_DELETE(); //メンバーリスト削除
        //マイページへ移動
        SCENE_MANAGER['prev_scene'] = "myPage";
        G_GUILD_DESTROY();
        this['scene_obj'].exit("myPage");
      }
      GUILD_SETTING_WINDOW_RETURN_VAL = null;
    }
    if(WINDOW_SELECT_RETURN_VAL != null){ //選択ウィンドウに返り値があった。
      if(isset(WINDOW_SELECT_RETURN_VAL['scoutTypeSelectWindow'])){
        console.log("募集内容選択した");
        var scoutSelectIndex = WINDOW_SELECT_RETURN_VAL['scoutTypeSelectWindow'];
        //募集条件変更処理を開始
        var postParam = new Object();
        postParam['guild_id'] = parseInt(this['player_guild_data']['guild_id']);
        postParam['setting_guild_scout_status'] = parseInt(scoutSelectIndex);
        GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
        WINDOW_SELECT_RETURN_VAL = null;
      }
      //WINDOW_SELECT_RETURN_VALは他のウィンドウで使っている値かもしれないので、消さない。
    }
  }
  GUILD_SETTING_WINDOW = result;
  return result;
}

//設定メニューボタンを押した時の処理
function GUILD_SETTING_WINDOW_BTN_PUSH(params){
  if(!isset(params['button_idx'])) return 0;
  var btnIndex = parseInt(params['button_idx']);
  switch (btnIndex) {
    case 0: //ギルドメンバー
    {
      if(!isset(params['guild_id'])) break;
      var postParam = new Object();
      postParam['get_guild_member_list'] = params['guild_id'];
      GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
    }
    break;
    case 1: //参加申請一覧
    {
      if(!isset(params['guild_id'])) break;
      var postParam = new Object();
      postParam['get_guild_join_application_player_list'] = params['guild_id'];
      GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
    }
    break;
    case 2: //メッセージ
    {

    }
    break;
    case 3: //募集内容変更
    {
      if(!isset(params['guild_scout_status'])) break;
      var selectDatas = new Array();
      selectDatas[0] = "募集中";
      selectDatas[1] = "募集中(参加申請承認不要)";
      selectDatas[2] = "締め切り";
      var subTitleText = "現在設定中の項目:" + selectDatas[parseInt(params['guild_scout_status'])];
      var defaultIndex = parseInt(params['guild_scout_status']);
      G_UI_SELECT_WINDOW(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],1,selectDatas,"募集内容設定",subTitleText,"scoutTypeSelectWindow",defaultIndex);
    }
    break;
    case 4: //コメント変更
    {
      if(!isset(params['message'])) break;
      if(!isset(params['guild_id'])) break;
      if(GUILD_COMMENT_EDIT_WINDOW != null) break;
      G_GUILD_CREATE_COMMENT_EDIT_WINDOW(params['guild_id'],WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]);
    }
    break;
    case 5: //ギルドハウス
    {

    }
    break;
    case 6: //管理者設定
    {

    }
    break;
    case 7:
    break;
    default:
    break;
  }
}

//ギルドメンバー設定画面を作成
function GUILD_CREATE_GUILD_MEMMBER_SETTING_WINDOW(myPlayerIndexId,playerInfo,playerGuildData){
  if(playerInfo == null) return null;
  //自分の権限id
  var myGuildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(myPlayerIndexId,playerGuildData);
  //対象の権限id
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerInfo['player_index_id'],playerGuildData);
  var result = null;
  //ウィンドウマスク
  result = Sprite('ASSET_64');
  //ウィンドウ背景
  result['window_bg'] = Sprite('ASSET_819').addChildTo(result);
  //名前
  result['name'] = Label({
    text: playerInfo['player_name'],
    fontSize: 38,
    fill: 'white',
  }).addChildTo(result['window_bg']);
  result['name'].y = result['name'].y - ((result['window_bg'].height / 2) - (result['name'].height * 1.5));
  //役割アイコン
  result['guild_member_class_icon'] = G_GUILD_GET_MEMBER_CLASS_ICON(playerInfo['player_index_id'],playerGuildData);
  if(result['guild_member_class_icon'] != null){
    result['guild_member_class_icon'].addChildTo(result['window_bg']);
    result['guild_member_class_icon'].width = (result['guild_member_class_icon'].width * 0.25);
    result['guild_member_class_icon'].height = (result['guild_member_class_icon'].height * 0.25);
    result['guild_member_class_icon'].y = result['name'].y;
    result['guild_member_class_icon'].y = result['guild_member_class_icon'].y + result['guild_member_class_icon'].height;
  }
  //役割
  var guildClassName = G_GUILD_GET_MEMBER_CLASS_NAME(playerInfo['player_index_id'],playerGuildData);
  result['player_guild_class_name'] = Label({
    text: "役割: " + guildClassName,
    fontSize: 26,
    fill: 'white',
  }).addChildTo(result['window_bg']);
  result['player_guild_class_name'].y = result['name'].y;
  result['player_guild_class_name'].y = result['player_guild_class_name'].y + result['name'].height * 2;
  //昇級ボタン
  result['class_up_btn'] = Sprite('ASSET_120').addChildTo(result['window_bg']);
  result['class_up_btn'].y = result['player_guild_class_name'].y
  result['class_up_btn'].y = result['class_up_btn'].y + result['class_up_btn'].height;
  result['class_up_btn'].x = result['class_up_btn'].x - result['class_up_btn'].width * 0.65;
  result['class_up_btn']['label'] = Label({
    text: "昇格",
    fontSize: 32,
    fill: 'black',
  }).addChildTo(result['class_up_btn']);
  result['class_up_btn']['button'] = Button({
    width: result['class_up_btn'].width,         // 横サイズ
    height: result['class_up_btn'].height,        // 縦サイズ
  }).addChildTo(result['class_up_btn']);
  result['class_up_btn']['button']['active'] = true;
  result['class_up_btn']['button']['guild_class_id'] = guildClassId;
  result['class_up_btn']['button']['player_index_id'] = playerInfo['player_index_id'];
  result['class_up_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(this['active'] == false) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null){
      //選択中のプレイヤーIDを設定
      GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID = this['player_index_id'];
      //昇級確認ウィンドウ表示
      if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
        var upClassName = G_GUILD_GET_CLASS_NAME(parseInt(this['guild_class_id']) + 1);
        G_NORMAL_WINDOW_CREATE(
          WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
          "昇格の確認",
          "プレイヤーを\n" + upClassName + "\nに昇格させますか？\n※同階級の場合、取り消しはできません",
          1,
          "checkClassUpGuildMemberClassWindow");
      }
    }
  };
  result['class_up_btn']['button'].visible = false;
  //昇級ボタン
  result['class_down_btn'] = Sprite('ASSET_120').addChildTo(result['window_bg']);
  result['class_down_btn'].y = result['class_up_btn'].y
  result['class_down_btn'].x = result['class_down_btn'].x + result['class_down_btn'].width * 0.65;
  result['class_down_btn']['label'] = Label({
    text: "降格",
    fontSize: 32,
    fill: 'black',
  }).addChildTo(result['class_down_btn']);
  result['class_down_btn']['button'] = Button({
    width: result['class_down_btn'].width,         // 横サイズ
    height: result['class_down_btn'].height,        // 縦サイズ
  }).addChildTo(result['class_down_btn']);
  result['class_down_btn']['button']['active'] = true;
  result['class_down_btn']['button']['guild_class_id'] = guildClassId;
  result['class_down_btn']['button']['player_index_id'] = playerInfo['player_index_id'];
  result['class_down_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(this['active'] == false) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null){
      //選択中のプレイヤーIDを設定
      GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID = this['player_index_id'];
      //降格確認ウィンドウ表示
      if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
        var downClassName = G_GUILD_GET_CLASS_NAME(parseInt(this['guild_class_id']) - 1);
        G_NORMAL_WINDOW_CREATE(
          WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
          "降格の確認",
          "プレイヤーを\n" + downClassName + "\nに降格させますか？\n※同階級の場合、取り消しはできません",
          1,
          "checkClassDownGuildMemberClassWindow");
      }
    }
  };
  result['class_down_btn']['button'].visible = false;
  //ギルドから追放ボタン or 抜ける
  result['guild_expulsion_btn'] = Sprite('ASSET_818').addChildTo(result['window_bg']);
  result['guild_expulsion_btn'].y = result['class_down_btn'].y;
  result['guild_expulsion_btn'].y = result['guild_expulsion_btn'].y + result['guild_expulsion_btn'].height * 1.5;
  result['guild_expulsion_btn']['label'] = Label({
    text: "ギルドから追放",
    fontSize: 26,
    fill: 'black',
  }).addChildTo(result['guild_expulsion_btn']);
  result['guild_expulsion_btn']['button'] = Button({
    width: result['guild_expulsion_btn'].width,         // 横サイズ
    height: result['guild_expulsion_btn'].height,        // 縦サイズ
  }).addChildTo(result['guild_expulsion_btn']);
  result['guild_expulsion_btn']['button']['active'] = true;
  result['guild_expulsion_btn']['button']['mode'] = 0; //0:他人を追放 1:ギルド離脱
  result['guild_expulsion_btn']['button']['player_index_id'] = playerInfo['player_index_id'];
  result['guild_expulsion_btn']['button']['player_name'] = playerInfo['player_name'];
  result['guild_expulsion_btn']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(this['active'] == false) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null){
      //追放 or 抜ける 確認ウィンドウ表示
      GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID = this['player_index_id'];
      if(this['mode'] == 0){ //追放
        // var postParam = new Object();
        // postParam['guild_member_expulsion'] = this['player_index_id'];
        // GUILD_INFO_RESULT_DATA = -1; //通信待機中にする
        // NETWORK_IS_CONNECTING = true;
        // ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
        G_NORMAL_WINDOW_CREATE(
          WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
          "ギルドメンバー追放の確認",
          this['player_name'] + "\nをギルドから追放しますか？",
          1,
          "checkGuildMemberExpulusionWindow");
      }
      else if(this['mode'] == 1){ //離脱
        G_NORMAL_WINDOW_CREATE(
          WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],
          "ギルド離脱の確認",
          "ギルドから離脱しますか？",
          1,
          "checkGuildExitWindow");
      }
    }
  };
  result['guild_expulsion_btn']['button'].visible = false;



  //閉じるボタン
  result['close_button'] = Sprite('ASSET_120').addChildTo(result['window_bg']);
  result['close_button'].y = result['close_button'].y + ((result['window_bg'].height / 2) - (result['close_button'].height * 1.5));
  //ボタンラベル
  result['close_button']['label'] = Label({
    text: "閉じる",
    fontSize: 32,
    fill: 'black',
  }).addChildTo(result['close_button']);
  //ボタン本体
  result['close_button']['button'] = Button({
    width: result['close_button'].width,         // 横サイズ
    height: result['close_button'].height,        // 縦サイズ
  }).addChildTo(result['close_button']);
  result['close_button']['button'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null){
      GUILD_MEMBER_SETTING_WINDOW.remove();
      GUILD_MEMBER_SETTING_WINDOW = null;
    }
  };
  result['close_button']['button'].visible = false;

  //ボタン画像のアクティブ非アクティブ設定
  if(playerInfo['player_index_id'] == myPlayerIndexId){ //選択中のプレイヤーが自分自身
    result['class_up_btn'].alpha = 0.5;
    result['class_up_btn']['button']['active'] = false;
    result['class_down_btn'].alpha = 0.5;
    result['class_down_btn']['button']['active'] = false;
    result['guild_expulsion_btn']['label'].text = "ギルドから離脱";
    result['guild_expulsion_btn']['button']['mode'] = 1;
    if(guildClassId == 3){ //ギルドマスターの場合、離脱ボタンを無効にする
      result['guild_expulsion_btn']['button']['active'] = false;
    }
  }
  else if(myGuildClassId <= guildClassId){ //自分の階級より相手と同じか階級が高い場合
    result['class_up_btn'].alpha = 0.5;
    result['class_up_btn']['button']['active'] = false;
    result['class_down_btn'].alpha = 0.5;
    result['class_down_btn']['button']['active'] = false;
    result['guild_expulsion_btn'].alpha = 0.5;
    result['guild_expulsion_btn']['button']['active'] = false;
  }
  if(2 <= guildClassId){ //相手がサブリーダー以上だった場合
    result['class_up_btn'].alpha = 0.5;
    result['class_up_btn']['button']['active'] = false;
  }
  if(guildClassId <= 0){ //相手が一般階級以下だった場合
    result['class_down_btn'].alpha = 0.5;
    result['class_down_btn']['button']['active'] = false;
  }

  return result;
}

//参加申請一覧リストを表示する
function G_GUILD_CREATE_GUILD_APPLICATION_PLAYER_LIST(playerIndexId,playerGuildData,playerDatas,applicationList,playerListAvatarAssetData){
  var listObj = PlainElement({});
  var listCell = new Array();
  //権限取得
  var guildClassId = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerIndexId,playerGuildData);
  if(playerGuildData == null) return null;
  var cellSizeHeight = 0;
  var cellPosY = 0;
  for (var i = 0; i < applicationList.length; i++) {
    var member = applicationList[i];
    var playerData = null;
    for (var pd = 0; pd < playerDatas.length; pd++) {
      if(playerDatas[pd]['player_index_id'] == member['send_application_player_index_id']){playerData = playerDatas[pd]; break;}
    }
    if(playerData == null) continue;
    //セル背景表示
    listCell[listCell.length] = Sprite('ASSET_159').addChildTo(listObj);
    if(i == 0){
      cellSizeHeight = listCell[i].height;
      listObj['list_height_size'] = cellSizeHeight;
      cellPosY = cellPosY + cellSizeHeight;
    }
    else{
      listCell[i].y = cellPosY;
      listObj['list_height_size'] = listObj['list_height_size'] + cellSizeHeight;
      cellPosY = cellPosY + cellSizeHeight;
    }
    //プレイヤーアバターとプレイヤープロフィールボタン表示
    if(isset(playerListAvatarAssetData[playerData['player_index_id']])){
      //アバター
      var avatarData = playerListAvatarAssetData[playerData['player_index_id']];
      var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(avatarData['player_avatar_data'],avatarData['player_equip_item_data']);
      listCell[i]['avatar'] = G_AVATAR_DISP(getConvertAvatarData, "use", "right", 0.225, 0.225, avatarData['player_avatar_data']['visible_head_equip_item']);
      listCell[i]['avatar']['sprites'][0].addChildTo(listCell[i]);
      listCell[i]['avatar']['sprites'][0].x = listCell[i]['avatar']['sprites'][0].x - (listCell[i].width * 0.3);
      listCell[i]['avatar']['sprites'][0].y = listCell[i]['avatar']['sprites'][0].y - (listCell[i].height * 0.2);
      //ボタン
      listCell[i]['avatar_button'] = Button({
        width: 110,
        height: 110,
      }).addChildTo(listCell[i]);
      listCell[i]['avatar_button'].x = listCell[i]['avatar_button'].x - ((listCell[i].width / 2) - listCell[i]['avatar_button'].width);
      listCell[i]['avatar_button']['player_index_id'] = playerData['player_index_id'];
      listCell[i]['avatar_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
          //プレイヤープロフィール表示処理
          if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
            G_UI_CREATE_PLAYER_PROFILE(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],this['player_index_id']); //プレイヤープロフィールを生成
          }
        }
      };
      listCell[i]['avatar_button'].visible = false;
    }
    //プレイヤー名
    listCell[i]['player_name_label'] = Label({
      text: playerData['player_name'],
      fontSize: 24,
      fill: 'black',
      align: 'left',
    }).addChildTo(listCell[i]);
    listCell[i]['player_name_label'].x = listCell[i]['player_name_label'].x - ((listCell[i].width / 2) - (listCell[i].width * 0.125));
    listCell[i]['player_name_label'].y = listCell[i]['player_name_label'].y - (listCell[i].height * 0.3);
    //プレイヤーレベル
    listCell[i]['player_level_label'] = Label({
      text: "Lv." + playerData['player_level'],
      fontSize: 24,
      fill: 'black',
      align: 'left',
    }).addChildTo(listCell[i]);
    //listCell[i]['player_level_label'].x = listCell[i]['guild_class_icon'].x;
    //listCell[i]['player_level_label'].x = listCell[i]['player_level_label'].x - (listCell[i]['guild_class_icon'].width / 2);
    //listCell[i]['player_level_label'].y = listCell[i]['player_level_label'].y + listCell[i]['guild_class_icon'].height;
    //プレイヤー情報ボタン
    listCell[i]['player_info_btn'] = Sprite('ASSET_79').addChildTo(listCell[i]);
    listCell[i]['player_info_btn'].x = listCell[i]['player_info_btn'].x + listCell[i]['player_info_btn'].width;
    listCell[i]['player_info_btn'].y = listCell[i]['player_info_btn'].y - (listCell[i]['player_info_btn'].height / 2);
    listCell[i]['player_info_btn']['label'] = Label({
      text: "プレイヤー情報",
      fontSize: 20,
      fill: 'white',
      align: 'center',
    }).addChildTo(listCell[i]['player_info_btn']);
    listCell[i]['player_info_btn']['button'] = Button({
      width: listCell[i]['player_info_btn'].width,
      height: listCell[i]['player_info_btn'].height,
    }).addChildTo(listCell[i]['player_info_btn']);
    listCell[i]['player_info_btn']['button']['player_index_id'] = playerData['player_index_id'];
    listCell[i]['player_info_btn']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){
        //プレイヤープロフィール表示処理
        if(isset(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']]) && WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] != null){
          G_UI_CREATE_PLAYER_PROFILE(WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']],this['player_index_id']); //プレイヤープロフィールを生成
        }
      }
    };
    listCell[i]['player_info_btn']['button'].visible = false;
    //設定変更
    listCell[i]['member_edit_btn'] = Sprite('ASSET_79').addChildTo(listCell[i]);
    listCell[i]['member_edit_btn'].x = listCell[i]['player_info_btn'].x;
    listCell[i]['member_edit_btn'].y = listCell[i]['player_info_btn'].y;
    listCell[i]['member_edit_btn'].y = listCell[i]['member_edit_btn'].y + listCell[i]['member_edit_btn'].height * 1.25;
    listCell[i]['member_edit_btn']['label'] = Label({
      text: "設定変更",
      fontSize: 20,
      fill: 'white',
      align: 'center',
    }).addChildTo(listCell[i]['member_edit_btn']);
    listCell[i]['member_edit_btn']['button'] = Button({
      width: listCell[i]['member_edit_btn'].width,
      height: listCell[i]['member_edit_btn'].height,
    }).addChildTo(listCell[i]['member_edit_btn']);
    listCell[i]['member_edit_btn']['button']['my_player_index_id'] = playerIndexId;
    listCell[i]['member_edit_btn']['button']['player_info'] = member;
    listCell[i]['member_edit_btn']['button']['player_guild_data'] = playerGuildData;
    listCell[i]['member_edit_btn']['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(this['guild_class_id'] == 0) return;
      if(NETWORK_IS_CONNECTING == false && WINDOW_NORMAL == null && WINDOW_PLAYER_PROFILE == null && GUILD_MEMBER_SETTING_WINDOW == null){

      }
    };
    listCell[i]['member_edit_btn']['button'].visible = false;
    if(guildClassId == 0) listCell[i]['member_edit_btn'].alpha = 0.5;
  }
  listObj.y = listObj.y - (listObj['list_height_size'] / 2);
  listObj.y = listObj.y + (cellSizeHeight / 2);
  return listObj;
}

function G_GUILD_DESTROY(){
  if(GUILD_INFO_WINDOW != null){
    GUILD_INFO_WINDOW.remove();
    GUILD_INFO_WINDOW = null;
  }
  if(GUILD_SETTING_WINDOW != null){
    GUILD_SETTING_WINDOW.remove();
    GUILD_SETTING_WINDOW = null;
  }
  if(GUILD_MEMBER_SETTING_WINDOW != null){
    GUILD_MEMBER_SETTING_WINDOW.remove();
    GUILD_MEMBER_SETTING_WINDOW = null;
  }
  GUILD_SETTING_WINDOW_RETURN_VAL = null;
  GUILD_SELECT_SETTING_GUILD_MEMBER_PLAYER_ID = -1;
  GUILD_UPDATE_PLAYER_GUILD_DATA = null;
  GUILD_UPDATE_GUILD_MEMBER_LIST = null;
  GUILD_UPDATE_PLAYER_LIST_AVATAR_ASSET_DATAS = null;
  GUILD_UPDATE_PLAYER_INDEX_ID = -1;
}

function G_GUILD_CREATE_COMMENT_EDIT_WINDOW(guildId,parentBase){ //ギルドメッセージ編集画面を表示する
  var comment = "";
  if(GUILD_SETTING_WINDOW['player_guild_data'] != null && isset(GUILD_SETTING_WINDOW['player_guild_data'])){
    comment = GUILD_SETTING_WINDOW['player_guild_data']['message'];
  }
  // //マスクを表示
  GUILD_COMMENT_EDIT_WINDOW_MASK = Sprite('ASSET_64').addChildTo(parentBase);
  //ウィンドウ本体表示
  GUILD_COMMENT_EDIT_WINDOW = Sprite('ASSET_167').addChildTo(GUILD_COMMENT_EDIT_WINDOW_MASK);
  //募集文表示
  GUILD_COMMENT_EDIT_VALUE = comment;
  GUILD_COMMENT_EDIT_WINDOW_TEXT = LabelArea({
    text: comment,
    height: 512,
    width: 512,
    fontSize: 32,
    fill: 'white',
    align: 'left',
    baseline: 'top',
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW);
  //閉じるボタン表示
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN = Sprite('ASSET_79').addChildTo(GUILD_COMMENT_EDIT_WINDOW);
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN.y = GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN.y + ((GUILD_COMMENT_EDIT_WINDOW.height / 1.85));
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN.x = GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN.x - ((GUILD_COMMENT_EDIT_WINDOW.width / 3));
  //閉じるボタンラベル
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['label'] = Label({
    text: '閉じる',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN);
  //閉じるボタン(本体)
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN);
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button']['comment'] = comment; //編集前のコメントを保存
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      GUILD_COMMENT_EDIT_VALUE = this['comment'];
      if(GUILD_COMMENT_EDIT_WINDOW_TEXT != null) GUILD_COMMENT_EDIT_WINDOW_TEXT.text = this['comment'];
      G_GUILD_CLOSE_COMMENT_EDIT_WINDOW(); //募集文編集画面を閉じる
    }
  };
  GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'].visible = false;
  //編集ボタン表示
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN = Sprite('ASSET_79').addChildTo(GUILD_COMMENT_EDIT_WINDOW);
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN.y = GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN.y + ((GUILD_COMMENT_EDIT_WINDOW.height / 1.85));
  //編集ボタン(ラベル)
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['label'] = Label({
    text: '編集',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN);
  //編集ボタン(ボタン本体)
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button']= Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN);
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button']['comment'] = comment;
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      GUILD_COMMENT_EDIT_VALUE = window.prompt("メッセージを入力",this['comment']);
    }
  };
  GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button'].visible = false;
  //決定ボタン表示
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN = Sprite('ASSET_79').addChildTo(GUILD_COMMENT_EDIT_WINDOW);
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN.y = GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN.y + ((GUILD_COMMENT_EDIT_WINDOW.height / 1.85));
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN.x = GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN.x + ((GUILD_COMMENT_EDIT_WINDOW.width / 3));
  //決定ボタンラベル
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN['label'] = Label({
    text: '決定',
    fontSize: 32,
    fill: 'white',
    align: 'center',
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN);
  //決定ボタン(本体)
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN['button'] = Button({
    width: 160,         // 横サイズ
    height: 64,        // 縦サイズ
  }).addChildTo(GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN);
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN['button']['guild_id'] = guildId;
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN['button'].onpointend = function(e){
    if(WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && WINDOW_PLAYER_PROFILE == null){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      //メッセージ変更処理を開始
      var postParam = new Object();
      postParam['guild_message_update'] = parseInt(this['guild_id']);
      postParam['update_message_text'] = GUILD_COMMENT_EDIT_VALUE;
      GUILD_SETTING_RESULT_DATA = -1; //通信待機中にする
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/guild/guild.php",postParam); //非同期通信開始
      G_GUILD_CLOSE_COMMENT_EDIT_WINDOW(); //募集文編集画面を閉じる
    }
  };
  GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN['button'].visible = false;
  if(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN != null && isset(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button']['comment'])){
    GUILD_COMMENT_EDIT_WINDOW.update = function() {
      var nowText = GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button']['comment'];
      var inputText = GUILD_COMMENT_EDIT_VALUE;
      if(nowText != inputText){ //テキストの入力があった。
        if(inputText == null || inputText == ""){ //空文字だった場合は戻す
          GUILD_COMMENT_EDIT_VALUE = nowText;
          GUILD_COMMENT_EDIT_WINDOW_TEXT.text = nowText;
        }
        else{
          if(Array.from(inputText).length <= 100){ //100文字以内か
            //GUILD_SETTING_WINDOW_GUILD_CHANGE_COMMENT_BUTTON['button']['update_guild_comment'] = inputText;
            GUILD_COMMENT_EDIT_WINDOW_TEXT.text = inputText;
            // if(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN != null && isset(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button'])){
            //   GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN['button']['comment'] = inputText;
            // }
            // if(GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN != null && isset(GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button'])){
            //   GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN['button']['comment'] = inputText;
            // }
          }
          else{
            G_NORMAL_WINDOW_CREATE(parentBase,"エラー","メッセージは100文字以内で入力してください。",0,"inputGuildCommentWindowError");
            GUILD_COMMENT_EDIT_VALUE = nowText;
            GUILD_COMMENT_EDIT_WINDOW_TEXT.text = nowText;
          }
        }
      }
    }
  }
}

function G_GUILD_CLOSE_COMMENT_EDIT_WINDOW(){ //募集文編集画面を閉じる
  if(GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN != null){
    GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN.remove();
    GUILD_COMMENT_EDIT_WINDOW_EDIT_BTN = null;
  }
  if(GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN != null){
    GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN.remove();
    GUILD_COMMENT_EDIT_WINDOW_DECISION_BTN = null;
  }
  if(GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN != null){
    GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN.remove();
    GUILD_COMMENT_EDIT_WINDOW_CLOSE_BTN = null;
  }
  if(GUILD_COMMENT_EDIT_WINDOW_TEXT != null){
    GUILD_COMMENT_EDIT_WINDOW_TEXT.remove();
    GUILD_COMMENT_EDIT_WINDOW_TEXT = null;
  }
  if(GUILD_COMMENT_EDIT_WINDOW != null){
    GUILD_COMMENT_EDIT_WINDOW.remove();
    GUILD_COMMENT_EDIT_WINDOW = null;
  }
  if(GUILD_COMMENT_EDIT_WINDOW_MASK != null){
    GUILD_COMMENT_EDIT_WINDOW_MASK.remove();
    GUILD_COMMENT_EDIT_WINDOW_MASK = null;
  }
}
