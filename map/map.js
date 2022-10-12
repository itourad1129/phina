//============================================
//  マップシーン
//============================================
//パブリック変数定義
var MAP_SCENE_OBJ = null
var MAP_SCENE_SERVER_REQUEST_DTTM = null; //マップシーンで最後に行われた通信時刻
var MAP_STORY_MASTER_ID = -1; //進行中のストーリーマスターID
var MAP_WINDOW_NODE = null; //マップ用ウィンドウ表示ノード
var MAP_PLAYER_SELECT_MAP_DATA = null; //選択中のマップデータ
var MAP_RESULT_MAP_DATA = null; //マップデータ本体
var MAP_MAP_LOAD = false; //マップが読み込まれたか
var MAP_RESULT_MAP_MASTER_DATA = null; //マップのマスターデータ
var MAP_MAP_SCENE_BASE = null; //マップシーンベース
var MAP_MAP_SCENE_MAP_LAYER = null; //マップシーン、マップレイヤー
var MAP_MAP_SCENE_UI_LAYER = null; //マップシーンUIレイヤー
var MAP_MAP_LAYER_GROUND = null; //マップの地面用レイヤー
var MAP_MAP_LAYER_OBJECT = null; //マップのオブジェクト用レイヤー
var MAP_MAP_LAYER_CHARA = null; //マップのキャラ用レイヤー
var MAP_MAP_LAYER_COLLISION = null; //マップのオブジェクト用レイヤー
var MAP_MAP_SCENE_MY_AVATAR_LAYER = null; //マップシーン　アバターレイヤー(自分)
var MAP_MAP_ANIM_DIRECTION = -1; //マップの移動方向
var MAP_NEXT_POS = 0; //移動後の距離
var MAP_MAP_MOVE_SPEED = 50; //マップの移動速度
var MAP_GROUND_CHIP_ARRAY = new Array(); //地面チップのタイル番号を格納した背景配列
var MAP_START_MAP_POS_X = 5; //開始マップ位置 (仮)
var MAP_START_MAP_POS_Y = 5; //開始マップ位置 (仮)
var MAP_ACTIVE_CHARACTER_DATA = null; //マップに表示されるキャラクターデータ
var MAP_ENEMY_MASTER_DATAS = null; //マップに配置された敵のマスターデータ
var MAP_NPC_MASTER_DATAS = null; // マップに配置されたNpcのマスターデータ
var MAP_SHOP_MASTER_DATAS = null; //マップに配置された店のマスターデータ
var MAP_DROP_ITEM_MASTER_DATAS = null; //マップに配置されたアイテムのマスターデータ
var MAP_QUEST_BOARD_MASTER_DATAS = null; //マップに配置されたクエストボードのマスターデータ
var MAP_PARTY_BOARD_MASTER_DATAS = null; //マップに配置されたパーティボードのマスターデータ
var MAP_DOOR_MASTER_DATAS = null; //マップに配置されたドアのマスターデータ
var MAP_GUILD_BOARD_MASTER_DATAS = null; //マップに配置されたギルドボードデータ
var MAP_MONUMENT_MASTER_DATAS = null; //マップに配置されたモニュメントのマスターデータ
var MAP_CHARA_ANIM_OBJECTS = new Array(); //マップに配置されたアニメーションオブジェクト配列
var MAP_MAP_ANIM_VISIBLE = false; //アニメーションのオンオフ
var MAP_ANIM_WAIT_TIME = 100; //一つのアニメが終了する時間
var MAP_ANIM_WAIT_VAL = 0; //アニメ進行中の値
var MAP_ANIM_CHIP_FLAME_CHANGE_TIME = 10; //フレーム変更が行われる時間
var MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL = 0; //フレーム変更時間の進捗
var MAP_ANIM_TARGET_FLAME_CHANGE_TIME = 2; //ターゲットマーカーのフレーム変更が行われる時間
var MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL = 0;//ターゲットマーカーのフレーム変更時間の進捗
var MAP_COLLISION_BOXS = new Array(); //当たり判定用のボックス格納用配列
var MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = null; //キャラクターウィンドウに表示させるアニメーションスプライト
var MAP_CHARACTER_INFO_WINDOW = null; //キャラクター情報ウィンドウのインスタンス
var MAP_CHARACTER_INFO_TEXT = null; //キャラクター情報のテキスト
var MAP_SEARCH_HIT_BOX = null; //マップ内検索用当たり判定Box
var MAP_SELECT_OBJECT_INDEX = -1; //選択中のオブジェクト -1は未選択
var MAP_PLAYER_MAP_POS = new Array(); //プレイヤーがマップに居る位置
var MAP_EVENT_DATAS = null; //マップで発生するイベントデータ
var MAP_IS_EVENT = false; //イベント中か
var MAP_ANIM_MASK_SPRITE = null; //マスクアニメーション画像
var MAP_MASK_ANIM_SWITCH = -1; //マスクアニメーション管理 -1:停止、0:加色 1:減色
var MAP_SET_EVENT_DATA = null; //セットされているイベントデータ
var MAP_SET_COMM_DATA = null; //イベント発生時に読み込む会話データ
var MAP_COMM_EVENT_STEP = -1; //会話データの進行状況記録 -1:未設定 0:読み込み開始 1:読み込み完了 2:表示開始
var MAP_CONTROLLER_BACK_GROUND = null; //マップコントロール画面操作ウィンドウ背景
var MAP_CONTROLE_BUTTON = null; //十字キーボタン
var MAP_COMM_CHARA_RIGHT_SPRITE = null; //会話キャラクター右
var MAP_COMM_CHARA_LEFT_SPRITE = null; //会話キャラクター左
var MAP_COMM_MESSAGE_TEXT = null; //表示するテキスト
var MAP_COMM_SPEAK_CAHAR_NAME_TEXT = null; //会話しているキャラクター名
var MAP_MESSAGE_BUTTON = null; //会話シーン用メッセージボタン
var MAP_COMM_SCENE_NUMBER = 0; //会話シーンの進行度
var MAP_COMMAND_BUTTON_ARRAY = new Array(); //コマンドボタン保管用配列
var MAP_COMMAND_TRIGGER_NUM = -1; //コマンドが押された時の番号
var MAP_SELECT_ANIM_OBJECT = null; //ユーザーが選択中のオブジェクト
var MAP_SET_DROP_ITEM_DATA = null; //アイテム獲得イベントの結果
var MAP_DROP_ITEM_EVENT_STEP = -1;  //アイテム獲得イベントの進行状況記録 -1:未設定 0:読み込み開始 1:表示中
var MAP_PLAYER_MAP_CHARACTER_DATAS; //プレイヤーのマップキャラクター情報
var MAP_SET_SHOP_DATA = null; //ショップイベント読み込み結果
var MAP_SHOP_EVENT_STEP = -1; //ショップイベントの進行状況記録 -1:未設定 0:読み込み開始 1:表示中
var MAP_SHOP_COMM_SCENE_NUMBER = 0; //ショップ会話シーン進行度
var MAP_SHOP_WINDOW = null; //ショップウィンドウ
var MAP_SHOP_SELL_ITEMS = new Array(); //ショップウィンドウに表示される、商品リスト
var MAP_SHOP_WINDOW_PAGE_NUM = 0; //商品ウィンドウで表示中のページ番号
var MAP_SHOP_SELECT_WINDOW = null; //ショップアイテム洗濯用ウィンドウ
var MAP_SHOP_SELECT_ITEM_INDEX = -1; //選択している商品のindex -1:未選択
var MAP_SHOP_CELL_ANIM_SWITCH = 1;//ショップ商品セルアニメーション管理 0:加色 1:減色
var MAP_SHOP_INFO_WINDOW_ITEM_IMAGE = null; //商品ウィンドウに表示させるスプライト
var MAP_SHOP_PLAYER_ITEM_TEXT = null; //プレイヤーの所持金を表示するテキスト
var MAP_SHOP_PLAYER_ITEM_ICON = null; //プレイヤーの所持金を表示するアイコン
var MAP_SHOP_PLAYER_ITEM_ID = -1; //プレイヤーがショップで最後に表示した通貨ID
var MAP_SHOP_COMMAND_TRIGGER_NUM = -1; //ショップのコマンドが押された時の番号
var MAP_PLAYER_ITEM_DATA = null; //プレイヤーの通貨所持情報
var MAP_PLAYER_EQUIP_ITEM_DATA = null; //プレイヤーの装備アイテム情報
var MAP_PLAYER_CARD_DATA = null; //プレイヤーのカード所持情報
var MAP_PLAYER_STAMP_DATA = null; //プレイヤーのスタンプ所持情報
var MAP_SHOP_SELECT_SELL_ITEM = null; //選択された商品
var MAP_RESULT_PURCHASE_ITEM = null; //購入結果
var MAP_SHOP_CELL_ITEM_MAX_COUNT = -1; //現在開いている商品セルの最大数
var MAP_SET_BATTLE_DATA = null; //バトルイベントデータ
var MAP_BATTLE_EVENT_STEP = -1; //バトルイベントの進行状況 -1:未設定 0:通信開始
var MAP_SET_QUEST_BOARD_DATA = null; //クエストボードデータ
var MAP_QUEST_BOARD_EVENT_STEP = -1; //クエストボードの進行状況
var MAP_SET_PARTY_BOARD_DATA = null; //パーティボードデータ
var MAP_PARTY_BOARD_EVENT_STEP = -1; //パーティボードの進行状況
var MAP_SET_DOOR_DATA = null; //ドアデータ
var MAP_DOOR_EVENT_STEP = -1; //ドアイベントの進行状況
var MAP_SET_MONUMENT_DATA = null; //モニュメントデータ
var MAP_MONUMENT_EVENT_STEP  = -1; //モニュメントイベントの進行状況
var MAP_ENEMY_POWER_GAUGE = null; //敵勢力ゲージ
var MAP_PLAYER_MAP_INSTANCE = null; //プレイヤーのマップインスタンス
var MAP_AREA_INSTANCE = null; //エリアインスタンス
var MAP_SET_QUEST_DATA = null; //クエストボード確認時に格納するクエストデータ
var MAP_SET_PARTY_DATA = null; //パーティボード確認時に格納するクエストデータ
var MAP_QUEST_CELL_ARRAY = new Array(); //クエストのセル
var MAP_QUEST_INFO_WINDOW = null; //クエスト詳細用ウィンドウ
var MAP_QUEST_LIST_START_TAP_POS_X = 0; //クエストリストを最初にタップした位置X
var MAP_QUEST_LIST_START_TAP_POS_Y = 0; //クエストリストを最初にタップした位置Y
var MAP_PLAYER_SELECT_ORDER_QUEST_ID = -1; //プレイヤーが受注選択中のクエストID
var MAP_QUEST_CLEAR_ANIM_OBJ = null; //クエストクリア時に表示されるアニメーション
var MAP_QUEST_CLEAR_ANIM_FRAME_COUNT = 0; //クエストクリア演出用フレームカウント
var MAP_PLAYER_QUEST_CLEAR_RESULT_DATA = null; //プレイヤーが報告したクエストの結果
var MAP_QUEST_ORDER_START_EVENT_DATA = null; //クエスト受注後に開始されるイベントデータ
var MAP_QUEST_REPORT_END_EVENT_DATA = null; //クエストクリア後に開始されるイベントデータ
var MAP_MENU_BUTTON = null; //メニューボタン
var MAP_CHAT_WINDOW_NODE = null; //チャットウィンドウ表示用ノード
var MAP_CHAT_WINDOW_STANBY = false; //チャットウィンドウ表示待機中か。
var MAP_AVATAR_DATAS = new Array(); //マップで使用するアバターデータが格納された配列
var MAP_MY_AVATAR = null; //ユーザーのアバター
var MAP_PLAYER_INFO = null; //マップシーンで利用するプレイヤー情報
var MAP_PLAYER_MASTER = null; //プレイヤーのマスターデータ
var MAP_PLAYER_GUILD_DATA = null; //所属ギルドデータ
var MAP_PLAYER_GUILD_MEMBER_DATAS = new Array(); //ギルドメンバーデータ
var MAP_MY_AVATAR_POS_ARRAY = new Array(); //アバターを表示するポジション
var MAP_SET_PLAYER_ROOM_DATA = null; //プレイヤールームイベント
var MAP_PLAYER_ROOM_EVENT_STEP = -1; //プレイヤールームイベント進行状態
var MAP_CONTROLE_AVATAR = null; //操作専用アバター
var MAP_IS_CONTROLE_BTN_MODE = 0; //コントロールボタンのモード 0:デフォルト 1:マップ移動 2:アバター移動
var MAP_PLAYER_ROOM_INSTANCE_ARRAY = new Array(); //プレイヤールーム情報のインスタンス格納配列
var MAP_ACTIVE_PLAYER_ROOM_INSTANCE = null; //進行中のプレイヤールームインスタンス
var MAP_CONTROLE_AVATAR_ACTION_LIST = new Object(); //プレイヤールーム内の操作アバター動作記録用
var MAP_AVATAR_CONTROLE_LAST_DIRECTION = -1; //アバター操作を最後に行った方向
var MAP_AVATAR_MOVE_POS = 0; //操作アバターの移動量保存用変数
var MAP_PLAYER_ROOM_UPDATE_COUNT = 0; //プレイヤールーム更新確認用
var MAP_CONTROLE_AVATAR_IS_MOVE = false; //操作アバター移動中か。
var MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = 0; //アバターアクションが実行された開始時刻
var MAP_AVATAR_ACTION_START_POS_X = 0; //アバター移動が行われた初期の位置X
var MAP_AVATAR_ACTION_START_POS_Y = 0; //アバター移動が行われた初期の位置Y
var MAP_PLAYER_ROOM_CHANGE = false; //プレイヤールーム同士の移動があったか。
var MAP_SCENE_SERVER_REQUEST_DTTM = null; //マップシーンで最後に行われた通信時刻
var MAP_LOAD_COMPLETE = false; //マップの読み込みが完了したか
var MAP_PLAYER_ROOM_CHAT_LOGS = new Array(); //プレイヤールームのチャットログ
var MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = ""; //プレイヤールームのクイックチャットの入力テキスト
var MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID = -1; //レイヤールームのクイックチャットの選択したスタンプ
var MAP_WINDOW_STAMP_LIST_CELL = new Array(); //スタンプリストのセル
var MAP_WINDOW_STAMP_LIST_TAP_POS_Y = 0; //スタンプリストを最初にタップした位置Y
var MAP_CENTER_BTN_HOLD = 0; //中央ボタンの長押し判定用
var MAP_CONTROLE_AVATAR_POSITION_RELOAD = false; //操作用アバターの位置を更新
var MAP_MONUMENT_WINDOW = null; //モニュメントウィンドウ本体
var MAP_OPEN_PLAYER_PROFILE = false; //プレイヤープロフィール表示中か
var MAP_MESSAGE_BTN = null; //メッセージ確認用ボタン
var MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = -1; //PVPの時に戦闘シーンに切り替えるアニメ処理
var MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID = -1; //エンカウントで発生したPバトルインスタンスID
var MAP_NOW_ENEMY_POWER_CONDITION = 0; //現在の敵勢力の%
var MAP_GILD_HOME_GILD_ID = -1; //ギルドホームに居る場合は-1以外のギルドIDになる

phina.define("Map", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function(param) {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "map";
    //メンバー初期化
    MAP_SCENE_OBJ = null; //マップシーンのシーンオブジェクト
    MAP_STORY_MASTER_ID = -1; //進行中のストーリーマスターID
    MAP_WINDOW_NODE = null; //マップ用ウィンドウ表示ノード
    MAP_PLAYER_SELECT_MAP_DATA = null; //選択中のマップデータ
    MAP_RESULT_MAP_DATA = null; //マップデータ本体
    MAP_MAP_LOAD = false; //マップが読み込まれたか
    MAP_RESULT_MAP_MASTER_DATA = null; //マップのマスターデータ
    MAP_MAP_SCENE_BASE = null; //マップシーンベース
    MAP_MAP_SCENE_MAP_LAYER = null; //マップシーン、マップレイヤー
    MAP_MAP_SCENE_UI_LAYER = null; //マップシーンUIレイヤー
    MAP_MAP_LAYER_GROUND = null; //マップの地面用レイヤー
    MAP_MAP_LAYER_OBJECT = null; //マップのオブジェクト用レイヤー
    MAP_MAP_LAYER_CHARA = null; //マップのキャラ用レイヤー
    MAP_MAP_LAYER_COLLISION = null; //マップのオブジェクト用レイヤー
    MAP_MAP_SCENE_MY_AVATAR_LAYER = null; //マップシーン　アバターレイヤー(自分)
    MAP_MAP_ANIM_DIRECTION = -1; //マップの移動方向
    MAP_NEXT_POS = 0; //移動後の距離
    MAP_MAP_MOVE_SPEED = 50; //マップの移動速度
    MAP_GROUND_CHIP_ARRAY = new Array(); //地面チップのタイル番号を格納した背景配列
    MAP_START_MAP_POS_X = 5; //開始マップ位置 (仮)
    MAP_START_MAP_POS_Y = 5; //開始マップ位置 (仮)
    MAP_ACTIVE_CHARACTER_DATA = null; //マップに表示されるキャラクターデータ
    MAP_ENEMY_MASTER_DATAS = null; //マップに配置された敵のマスターデータ
    MAP_NPC_MASTER_DATAS = null; // マップに配置されたNpcのマスターデータ
    MAP_SHOP_MASTER_DATAS = null; //マップに配置された店のマスターデータ
    MAP_DROP_ITEM_MASTER_DATAS = null; //マップに配置されたアイテムのマスターデータ
    MAP_QUEST_BOARD_MASTER_DATAS = null; //マップに配置されたクエストボードのマスターデータ
    MAP_PARTY_BOARD_MASTER_DATAS = null; //マップに配置されたパーティボードのマスターデータ
    MAP_DOOR_MASTER_DATAS = null; //マップに配置されたドアのマスターデータ
    MAP_GUILD_BOARD_MASTER_DATAS = null; //マップに配置されたギルドボードデータ
    MAP_MONUMENT_MASTER_DATAS = null; //マップに配置されたモニュメントのマスターデータ
    MAP_CHARA_ANIM_OBJECTS = new Array(); //マップに配置されたアニメーションオブジェクト配列
    MAP_MAP_ANIM_VISIBLE = false; //アニメーションのオンオフ
    MAP_ANIM_WAIT_TIME = 100; //一つのアニメが終了する時間
    MAP_ANIM_WAIT_VAL = 0; //アニメ進行中の値
    MAP_ANIM_CHIP_FLAME_CHANGE_TIME = 10; //フレーム変更が行われる時間
    MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL = 0; //フレーム変更時間の進捗
    MAP_ANIM_TARGET_FLAME_CHANGE_TIME = 2; //ターゲットマーカーのフレーム変更が行われる時間
    MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL = 0;//ターゲットマーカーのフレーム変更時間の進捗
    MAP_COLLISION_BOXS = new Array(); //当たり判定用のボックス格納用配列
    MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = null; //キャラクターウィンドウに表示させるアニメーションスプライト
    MAP_CHARACTER_INFO_WINDOW = null; //キャラクター情報ウィンドウのインスタンス
    MAP_CHARACTER_INFO_TEXT = null; //キャラクター情報のテキスト
    MAP_SEARCH_HIT_BOX = null; //マップ内検索用当たり判定Box
    MAP_SELECT_OBJECT_INDEX = -1; //選択中のオブジェクト -1は未選択
    MAP_PLAYER_MAP_POS = new Array(); //プレイヤーがマップに居る位置
    MAP_EVENT_DATAS = null; //マップで発生するイベントデータ
    MAP_IS_EVENT = false; //イベント中か
    MAP_IS_ANIMATION = false; //アニメーション再生中か
    MAP_ANIM_MASK_SPRITE = null; //マスクアニメーション画像
    MAP_MASK_ANIM_SWITCH = -1; //マスクアニメーション管理 -1:停止、0:加色 1:減色
    MAP_SET_EVENT_DATA = null; //セットされているイベントデータ
    MAP_SET_COMM_DATA = null; //イベント発生時に読み込む会話データ
    MAP_COMM_EVENT_STEP = -1; //会話データの進行状況記録 -1:未設定 0:読み込み開始 1:読み込み完了 2:表示開始
    MAP_CONTROLLER_BACK_GROUND = null; //マップコントロール画面操作ウィンドウ背景
    MAP_CONTROLE_BUTTON = null; //十字キーボタン
    MAP_COMM_CHARA_RIGHT_SPRITE = null; //会話キャラクター右
    MAP_COMM_CHARA_LEFT_SPRITE = null; //会話キャラクター左
    MAP_COMM_MESSAGE_TEXT = null; //表示するテキスト
    MAP_COMM_SPEAK_CAHAR_NAME_TEXT = null; //会話しているキャラクター名
    MAP_MESSAGE_BUTTON = null; //会話シーン用メッセージボタン
    MAP_COMM_SCENE_NUMBER = 0; //会話シーンの進行度
    MAP_COMMAND_BUTTON_ARRAY = new Array(); //コマンドボタン保管用配列
    MAP_COMMAND_TRIGGER_NUM = -1; //コマンドが押された時の番号
    MAP_SELECT_ANIM_OBJECT = null; //ユーザーが選択中のオブジェクト
    MAP_SET_DROP_ITEM_DATA = null; //アイテム獲得イベントの結果
    MAP_DROP_ITEM_EVENT_STEP = -1;  //アイテム獲得イベントの進行状況記録 -1:未設定 0:読み込み開始 1:表示中
    MAP_PLAYER_MAP_CHARACTER_DATAS; //プレイヤーのマップキャラクター情報
    MAP_SET_SHOP_DATA = null; //ショップイベント読み込み結果
    MAP_SHOP_EVENT_STEP = -1; //ショップイベントの進行状況記録 -1:未設定 0:読み込み開始 1:表示中
    MAP_SHOP_COMM_SCENE_NUMBER = 0; //ショップ会話シーン進行度
    MAP_SHOP_WINDOW = null; //ショップウィンドウ
    MAP_SHOP_SELL_ITEMS = new Array(); //ショップウィンドウに表示される、商品リスト
    MAP_SHOP_WINDOW_PAGE_NUM = 0; //商品ウィンドウで表示中のページ番号
    MAP_SHOP_SELECT_WINDOW = null; //ショップアイテム洗濯用ウィンドウ
    MAP_SHOP_SELECT_ITEM_INDEX = -1; //選択している商品のindex -1:未選択
    MAP_SHOP_CELL_ANIM_SWITCH = 1;//ショップ商品セルアニメーション管理 0:加色 1:減色
    MAP_SHOP_INFO_WINDOW_ITEM_IMAGE = null; //商品ウィンドウに表示させるスプライト
    MAP_SHOP_PLAYER_ITEM_TEXT = null; //プレイヤーの所持金を表示するテキスト
    MAP_SHOP_PLAYER_ITEM_ICON = null; //プレイヤーの所持金を表示するアイコン
    MAP_SHOP_PLAYER_ITEM_ID = -1; //プレイヤーがショップで最後に表示した通貨ID
    MAP_SHOP_COMMAND_TRIGGER_NUM = -1; //ショップのコマンドが押された時の番号
    MAP_PLAYER_ITEM_DATA = null; //プレイヤーの通貨所持情報
    MAP_PLAYER_EQUIP_ITEM_DATA = null; //プレイヤーの装備アイテム情報
    MAP_PLAYER_CARD_DATA = null; //プレイヤーのカード所持情報
    MAP_PLAYER_STAMP_DATA = null; //プレイヤーのスタンプ所持情報
    MAP_SHOP_SELECT_SELL_ITEM = null; //選択された商品
    MAP_RESULT_PURCHASE_ITEM = null; //購入結果
    MAP_SHOP_CELL_ITEM_MAX_COUNT = -1; //現在開いている商品セルの最大数
    MAP_SET_BATTLE_DATA = null; //バトルイベントデータ
    MAP_BATTLE_EVENT_STEP = -1; //バトルイベントの進行状況 -1:未設定 0:通信開始
    MAP_SET_QUEST_BOARD_DATA = null; //クエストボードデータ
    MAP_SET_PARTY_BOARD_DATA = null; //パーティボードデータ
    MAP_QUEST_BOARD_EVENT_STEP = -1; //クエストボードの進行状況
    MAP_PARTY_BOARD_EVENT_STEP = -1; //パーティボードの進行状況
    MAP_DOOR_EVENT_STEP = -1; //ドアイベントの進行状況
    MAP_MONUMENT_EVENT_STEP  = -1; //モニュメントイベントの進行状況
    MAP_ENEMY_POWER_GAUGE = null; //敵勢力ゲージ
    MAP_PLAYER_MAP_INSTANCE = null; //プレイヤーのマップインスタンス
    MAP_AREA_INSTANCE = null; //エリアマップインスタンス
    MAP_SET_QUEST_DATA = null; //クエストボード確認時に格納するクエストデータ
    MAP_SET_PARTY_DATA = null; //パーティボード確認時に格納するクエストデータ
    MAP_SET_DOOR_DATA = null; //ドアデータ
    MAP_SET_MONUMENT_DATA = null; //モニュメントデータ
    MAP_QUEST_CELL_ARRAY = new Array(); //クエストのセル
    MAP_QUEST_INFO_WINDOW = null; //クエスト詳細用ウィンドウ
    MAP_QUEST_LIST_START_TAP_POS_X = 0; //クエストリストを最初にタップした位置X
    MAP_QUEST_LIST_START_TAP_POS_Y = 0; //クエストリストを最初にタップした位置Y
    MAP_PLAYER_SELECT_ORDER_QUEST_ID = -1; //プレイヤーが受注選択中のクエストID
    MAP_QUEST_CLEAR_ANIM_OBJ = null; //クエストクリア時に表示されるアニメーション
    MAP_QUEST_CLEAR_ANIM_FRAME_COUNT = 0; //クエストクリア演出用フレームカウント
    MAP_PLAYER_QUEST_CLEAR_RESULT_DATA = null; //プレイヤーが報告したクエストの結果
    MAP_QUEST_ORDER_START_EVENT_DATA = null; //クエスト受注後に開始されるイベントデータ
    MAP_QUEST_REPORT_END_EVENT_DATA = null; //クエストクリア後に開始されるイベントデータ
    MAP_MENU_BUTTON = null; //メニューボタン
    MAP_CHAT_WINDOW_NODE = null; //チャットウィンドウ表示用ノード
    MAP_CHAT_WINDOW_STANBY = false; //チャットウィンドウ表示待機中か。
    MAP_AVATAR_DATAS = new Array(); //マップで使用するアバターデータが格納された配列
    MAP_MY_AVATAR = null; //ユーザーのアバター
    MAP_PLAYER_INFO = null; //マップシーンで利用するプレイヤー情報
    MAP_PLAYER_MASTER = null; //プレイヤーのマスターデータ
    MAP_PLAYER_GUILD_DATA = null; //所属ギルドデータ
    MAP_PLAYER_GUILD_MEMBER_DATAS = new Array(); //ギルドメンバーデータ
    MAP_CONTROLE_AVATAR = null; //操作専用アバター
    MAP_IS_CONTROLE_BTN_MODE = 0; //コントロールボタンのモード 0:デフォルト 1:マップ移動 2:アバター移動
    MAP_PLAYER_ROOM_INSTANCE_ARRAY = new Array(); //プレイヤールーム情報のインスタンス格納配列
    MAP_ACTIVE_PLAYER_ROOM_INSTANCE = null; //進行中のプレイヤールームインスタンス
    MAP_AVATAR_CONTROLE_LAST_DIRECTION = -1; //アバター操作を最後に行った方向
    MAP_AVATAR_MOVE_POS = 0; //操作アバターの移動量保存用変数
    MAP_PLAYER_ROOM_UPDATE_COUNT = 0; //プレイヤールーム更新確認用
    MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = 0; //アバターアクションが実行された開始時刻
    MAP_AVATAR_ACTION_START_POS_X = 0; //アバター移動が行われた初期の位置X
    MAP_AVATAR_ACTION_START_POS_Y = 0; //アバター移動が行われた初期の位置Y
    MAP_PLAYER_ROOM_CHANGE = false; //プレイヤールーム同士の移動があったか。
    MAP_SCENE_SERVER_REQUEST_DTTM = null; //マップシーンで最後に行われた通信時刻
    MAP_LOAD_COMPLETE = false; //マップの読み込みが完了したか
    MAP_PLAYER_ROOM_CHAT_LOGS = new Array(); //プレイヤールームのチャットログ
    MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = ""; //プレイヤールームのクイックチャットの入力テキスト
    MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID = -1; //レイヤールームのクイックチャットの選択したスタンプ
    MAP_WINDOW_STAMP_LIST_CELL = new Array(); //スタンプリストのセル
    MAP_WINDOW_STAMP_LIST_TAP_POS_Y = 0; //スタンプリストを最初にタップした位置Y
    MAP_CENTER_BTN_HOLD = 0; //中央ボタンの長押し判定用
    MAP_CONTROLE_AVATAR_POSITION_RELOAD = false; //操作用アバターの位置を更新
    MAP_MONUMENT_WINDOW = null; //モニュメントウィンドウ本体
    MAP_OPEN_PLAYER_PROFILE = false; //プレイヤープロフィール表示中か
    MAP_MESSAGE_BTN = null; //メッセージ確認用ボタン
    MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = -1; //PVPの時に戦闘シーンに切り替えるアニメ処理
    MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID = -1; //エンカウントで発生したPVPのバトルインスタンスID
    MAP_NOW_ENEMY_POWER_CONDITION = 0; //現在の敵勢力の%
    MAP_GILD_HOME_GILD_ID = -1; //ギルドホームに居る場合は-1以外のギルドIDになる

    // 親クラス初期化
    this.superInit(param);
    // 背景色
    this.backgroundColor = 'black';
    //ギルドホームへの移動か
    if(isset(param.go_to_guild_home)){
      console.log("ギルドID");
      MAP_GILD_HOME_GILD_ID = param.go_to_guild_home;
      ACTIVE_GUILD_ROOM_GUILD_ID = MAP_GILD_HOME_GILD_ID;
    }

    MAP_SCENE_OBJ = this;

    //アクションリスト配列を初期化
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_x'] = new Array();
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_y'] = new Array();
    MAP_CONTROLE_AVATAR_ACTION_LIST['direction_list'] = new Array();
    MAP_CONTROLE_AVATAR_ACTION_LIST['move_pos_list'] = new Array();
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_time_stamp_list'] = new Array();

    MAP_MAP_SCENE_BASE = PlainElement({ //シーンの親ノード生成
    width: this.gridX.width,
    height: this.gridY.height,
  }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    MAP_MAP_SCENE_MAP_LAYER = PlainElement({ //シーンのゲーム用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_BASE);

    MAP_MAP_SCENE_MY_AVATAR_LAYER = PlainElement({ //シーンのアバター表示用レイヤー
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_BASE);
    MAP_MAP_SCENE_MY_AVATAR_LAYER.y = ((MAP_MAP_SCENE_MY_AVATAR_LAYER.y - (SCREEN_HEIGHT / 2)) + (SCREEN_WIDTH / 2));
    MAP_MY_AVATAR_POS_ARRAY['top'] = PlainElement({}).addChildTo(MAP_MAP_SCENE_MY_AVATAR_LAYER);
    MAP_MY_AVATAR_POS_ARRAY['top'].y = MAP_MY_AVATAR_POS_ARRAY['top'].y - (SCREEN_WIDTH / 4);
    MAP_MY_AVATAR_POS_ARRAY['bottom'] = PlainElement({}).addChildTo(MAP_MAP_SCENE_MY_AVATAR_LAYER);
    MAP_MY_AVATAR_POS_ARRAY['bottom'].y = MAP_MY_AVATAR_POS_ARRAY['bottom'].y + (SCREEN_WIDTH / 4);
    MAP_MY_AVATAR_POS_ARRAY['left'] = PlainElement({}).addChildTo(MAP_MAP_SCENE_MY_AVATAR_LAYER);
    MAP_MY_AVATAR_POS_ARRAY['left'].x = MAP_MY_AVATAR_POS_ARRAY['left'].x + (SCREEN_WIDTH / 2.5);
    MAP_MY_AVATAR_POS_ARRAY['left'].y = MAP_MY_AVATAR_POS_ARRAY['left'].y - SCREEN_WIDTH * 0.1;
    MAP_MY_AVATAR_POS_ARRAY['right'] = PlainElement({}).addChildTo(MAP_MAP_SCENE_MY_AVATAR_LAYER);
    MAP_MY_AVATAR_POS_ARRAY['right'].x = MAP_MY_AVATAR_POS_ARRAY['right'].x - (SCREEN_WIDTH / 2.5);
    MAP_MY_AVATAR_POS_ARRAY['right'].y = MAP_MY_AVATAR_POS_ARRAY['right'].y - SCREEN_WIDTH * 0.1;

    //チャット表示用ノード
    MAP_CHAT_WINDOW_NODE = PlainElement({
    }).addChildTo(MAP_MAP_SCENE_BASE);
    //MAP_CHAT_WINDOW_NODE.x = this.gridX.center();
    //MAP_CHAT_WINDOW_NODE.y = this.gridY.center();

    MAP_MAP_SCENE_UI_LAYER = PlainElement({ //シーンのUI用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_BASE);
    WINDOW_DISP_LAYERS[SCENE_MANAGER['now_scene']] = MAP_MAP_SCENE_UI_LAYER; //共有レイヤーに登録

    MAP_MAP_LAYER_GROUND = PlainElement({ //マップサブレイヤーの地面レイヤー
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_MAP_LAYER);

    MAP_MAP_LAYER_OBJECT = PlainElement({ //マップサブレイヤーのオブジェクト用レイヤー
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_MAP_LAYER);

    MAP_MAP_LAYER_CHARA = PlainElement({ //マップサブレイヤーのキャラ用レイヤー
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_MAP_LAYER);

    MAP_MAP_LAYER_COLLISION = PlainElement({ //マップサブレイヤーの当たり判定用レイヤー
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_MAP_LAYER);

    //マップコントロール画面操作ウィンドウ背景
    MAP_CONTROLLER_BACK_GROUND = Sprite('ASSET_111').addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_CONTROLLER_BACK_GROUND.y = MAP_CONTROLLER_BACK_GROUND.y + MAP_CONTROLLER_BACK_GROUND.height;

    //ショップ用情報ウィンドウ
    MAP_SHOP_SELECT_WINDOW = Sprite('ASSET_126').addChildTo(MAP_CONTROLLER_BACK_GROUND);
    MAP_SHOP_SELECT_WINDOW.visible = false;

    //十字キーボタン
    MAP_CONTROLE_BUTTON = Sprite('ASSET_112').addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_CONTROLE_BUTTON.y = MAP_CONTROLLER_BACK_GROUND.y;
    MAP_CONTROLE_BUTTON['sprite_map_controle'] = Sprite('ASSET_178').addChildTo(MAP_CONTROLE_BUTTON);
    MAP_CONTROLE_BUTTON['sprite_map_controle'].visible = false;
    MAP_CONTROLE_BUTTON['sprite_player_controle'] = Sprite('ASSET_179').addChildTo(MAP_CONTROLE_BUTTON);
    MAP_CONTROLE_BUTTON['sprite_player_controle'].visible = false;

    //キャラクター情報ウィンドウ
    MAP_CHARACTER_INFO_WINDOW = Sprite('ASSET_119').addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_CHARACTER_INFO_WINDOW.y = MAP_CONTROLLER_BACK_GROUND.y
    MAP_CHARACTER_INFO_WINDOW.x = this.gridX.width * - 0.3;

    MAP_CHARACTER_INFO_TEXT = Label({
      text: '名称【 --- 】\nLV：\n種類：\n属性：\n勝率：',
      fontSize: 14,
      fill: 'black',
      align: 'left',
    }).addChildTo(MAP_CHARACTER_INFO_WINDOW);
    MAP_CHARACTER_INFO_TEXT.y = MAP_CHARACTER_INFO_TEXT.y + (MAP_CHARACTER_INFO_WINDOW.height / 4);
    MAP_CHARACTER_INFO_TEXT.x = MAP_CHARACTER_INFO_TEXT.x - (MAP_CHARACTER_INFO_WINDOW.width / 2.3);

    //ショップで表示するプレイヤーの所持金
    MAP_SHOP_PLAYER_ITEM_TEXT = Label({
      text: '',
      fontSize: 22,
      fill: 'black',
      align: 'right',
    }).addChildTo(MAP_CHARACTER_INFO_WINDOW);
    MAP_SHOP_PLAYER_ITEM_TEXT.y = MAP_SHOP_PLAYER_ITEM_TEXT.y - (MAP_CHARACTER_INFO_WINDOW.height / 3.45);
    MAP_SHOP_PLAYER_ITEM_TEXT.x = MAP_CHARACTER_INFO_WINDOW.x + (MAP_CHARACTER_INFO_WINDOW.width * 1.97);
    MAP_SHOP_PLAYER_ITEM_TEXT.visible = false;

    //ショップで表示する所持金のアイコン
    MAP_SHOP_PLAYER_ITEM_ICON = Sprite('ASSET_65').addChildTo(MAP_SHOP_PLAYER_ITEM_TEXT);
    MAP_SHOP_PLAYER_ITEM_ICON.x = MAP_SHOP_PLAYER_ITEM_ICON.x + (MAP_SHOP_PLAYER_ITEM_ICON.width / 5.5);
    MAP_SHOP_PLAYER_ITEM_ICON.scaleX = 0.5;
    MAP_SHOP_PLAYER_ITEM_ICON.scaleY = 0.5;



    //マップ内検索用当たり判定Box
    MAP_SEARCH_HIT_BOX = Shape({
          backgroundColor: 'blue',
          x: this.gridX.center(),
          y: this.gridY.center(),
          width: 640,
          height: 640,
    }).addChildTo(MAP_MAP_LAYER_CHARA);
    MAP_SEARCH_HIT_BOX.x = MAP_MAP_SCENE_MAP_LAYER.x;//MAP_SEARCH_HIT_BOX.x - (640 / 2);
    MAP_SEARCH_HIT_BOX.y = MAP_MAP_SCENE_MAP_LAYER.y;//(MAP_SEARCH_HIT_BOX.y - (640 / 2)) - (MAP_CHARACTER_INFO_WINDOW.height * 1.2);
    MAP_SEARCH_HIT_BOX.visible = false;




    //十字キーボタン中央
    var centerButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    centerButton.y = MAP_CONTROLE_BUTTON.y;
    centerButton.visible = false;
    centerButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        MAP_CENTER_BTN_HOLD = 0; //長押し時間初期化
      }
    };
    centerButton.onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        //スタンプリスト表示判定
        if(MAP_IS_CONTROLE_BTN_MODE == 2 && WINDOW_LIST == null){
          if(MAP_CENTER_BTN_HOLD == -1) return;
          if(MAP_CENTER_BTN_HOLD > 10){
            MAP_CENTER_BTN_HOLD = -1;
            G_MAP_WINDOW_CREATE_STAMP_LIST(MAP_WINDOW_NODE,MAP_PLAYER_STAMP_DATA);
          }
          else{
            MAP_CENTER_BTN_HOLD ++;
          }
        }
      }
    };
    centerButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_CONTROLE_BTN_MODE == 0 || MAP_IS_CONTROLE_BTN_MODE == 1){ //プレイヤールームに居ない場合
          if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false){
            G_UPDATE_SELECT_CHARACTER(); //選択中のキャラクターを更新
          }
          else{
            //ショップイベント中でショップ表示中の場合
            if(MAP_SET_SHOP_DATA != null && MAP_SHOP_EVENT_STEP == 4){
              var changeSelectItemIndex = 0;
              changeSelectItemIndex = (MAP_SHOP_SELECT_ITEM_INDEX + 1);
              if(MAP_SHOP_CELL_ITEM_MAX_COUNT < changeSelectItemIndex){
                changeSelectItemIndex = 0;
              }
              G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,changeSelectItemIndex); //商品アイテムを選択した。
            }
          }
        }
        else if(MAP_IS_CONTROLE_BTN_MODE == 2 && WINDOW_LIST == null){ //プレイヤールームに居る場合でスタンプリストを表示していない場合
          //クイックチャット入力表示処理
          MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = window.prompt("クイックチャット テキストを入力", "");
        }
      }
    };

    //左上ボタン(操作切り替え)
    var leftTopButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
      x: centerButton.x,
      y: centerButton.y,
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    leftTopButton.y = leftTopButton.y - (leftTopButton.height * 1.3);
    leftTopButton.x = leftTopButton.x + (leftTopButton.width * 1.3);
    leftTopButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID == -1) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        G_MAP_CHANGE_CONTROLE_BUTTON(MAP_CONTROLE_BUTTON,1); //コントロールボタンの変更
      }
    };
    leftTopButton.visible = false;

    //右上ボタン(操作切り替え)
    var rightTopButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
      x: centerButton.x,
      y: centerButton.y,
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    rightTopButton.y = rightTopButton.y - (rightTopButton.height * 1.3);
    rightTopButton.x = rightTopButton.x - (rightTopButton.width * 1.3);
    rightTopButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID == -1) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        G_MAP_CHANGE_CONTROLE_BUTTON(MAP_CONTROLE_BUTTON,2); //コントロールボタンの変更
      }
    };
    rightTopButton.visible = false;

    //十字キーボタン上
    var moveUpButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    moveUpButton.y = centerButton.y - centerButton.height;
    moveUpButton.visible = false;
    moveUpButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2 && MAP_CONTROLE_AVATAR != null && MAP_CONTROLE_AVATAR_IS_MOVE == false){ //走りアニメーション開始
            MAP_CONTROLE_AVATAR_IS_MOVE = true;
            var date = new Date();
            MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = Math.floor( date.getTime() / 1000 ); //アクション開始時刻を記録
            MAP_AVATAR_ACTION_START_POS_X = MAP_CONTROLE_AVATAR.x;
            MAP_AVATAR_ACTION_START_POS_Y = MAP_CONTROLE_AVATAR.y;
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['run_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_back",0);
          }
        }
      }
    };
    moveUpButton.onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2) G_MAP_AVATAR_MOVE(1); //自キャラ移動
        }
      }
    };
    moveUpButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 0 || MAP_IS_CONTROLE_BTN_MODE == 1) G_MAP_MOVE(1); //マップ移動
          else if(MAP_CONTROLE_AVATAR != null){ //立ちアニメーション開始
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['stay_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_back",1);
            MAP_CONTROLE_AVATAR_IS_MOVE = false;
            G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(); //行動ログを記録
          }
        }
      }
    };

    //十字キーボタン右
    var moveRightButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    moveRightButton.x = centerButton.x + centerButton.width;
    moveRightButton.y = centerButton.y;
    moveRightButton.visible = false;
    moveRightButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2 && MAP_CONTROLE_AVATAR != null && MAP_CONTROLE_AVATAR_IS_MOVE == false){ //走りアニメーション開始
            MAP_CONTROLE_AVATAR_IS_MOVE = true;
            var date = new Date();
            MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = Math.floor( date.getTime() / 1000 ); //アクション開始時刻を記録
            MAP_AVATAR_ACTION_START_POS_X = MAP_CONTROLE_AVATAR.x;
            MAP_AVATAR_ACTION_START_POS_Y = MAP_CONTROLE_AVATAR.y;
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['run_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_right",0);
          }
        }
      }
    };
    moveRightButton.onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2) G_MAP_AVATAR_MOVE(2); //自キャラ移動
        }
      }
    };
    moveRightButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 0 || MAP_IS_CONTROLE_BTN_MODE == 1) G_MAP_MOVE(2); //マップ移動
          else if(MAP_CONTROLE_AVATAR != null){ //立ちアニメーション開始
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['stay_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("equip_right",0);
            MAP_CONTROLE_AVATAR_IS_MOVE = false;
            G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(); //行動ログを記録
          }
        }
        else{
          //ショップイベント中でショップ表示中の場合
          if(MAP_SET_SHOP_DATA != null && MAP_SHOP_EVENT_STEP == 4 && NETWORK_IS_CONNECTING == false){
            var maxPage = Math.ceil(MAP_SHOP_SELL_ITEMS.length / 6);
            if(MAP_SHOP_WINDOW_PAGE_NUM < (maxPage - 1)){
              MAP_SHOP_WINDOW_PAGE_NUM = MAP_SHOP_WINDOW_PAGE_NUM + 1;
              G_MAP_SHOP_WINDOW_UPDATE(MAP_SET_SHOP_DATA,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW,MAP_SHOP_WINDOW_PAGE_NUM);
              G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,0); //選択中の商品アイテムを更新
            }
          }
        }
      }
    };

    //十字キーボタン下
    var moveDownButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    moveDownButton.y = centerButton.y + centerButton.height;
    moveDownButton.visible = false;
    moveDownButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2 && MAP_CONTROLE_AVATAR != null && MAP_CONTROLE_AVATAR_IS_MOVE == false){ //走りアニメーション開始
            MAP_CONTROLE_AVATAR_IS_MOVE = true;
            var date = new Date();
            MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = Math.floor( date.getTime() / 1000 ); //アクション開始時刻を記録
            MAP_AVATAR_ACTION_START_POS_X = MAP_CONTROLE_AVATAR.x;
            MAP_AVATAR_ACTION_START_POS_Y = MAP_CONTROLE_AVATAR.y;
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['run_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_front",0);
          }
        }
      }
    };
    moveDownButton.onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2) G_MAP_AVATAR_MOVE(3); //自キャラ移動
        }
      }
    };
    moveDownButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 0 || MAP_IS_CONTROLE_BTN_MODE == 1) G_MAP_MOVE(3); //マップ移動
          else if(MAP_CONTROLE_AVATAR != null){ //立ちアニメーション開始
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['stay_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_front",1);
            MAP_CONTROLE_AVATAR_IS_MOVE = false;
            G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(); //行動ログを記録
          }
        }
      }
    };

    //十字キーボタン左
    var moveLeftButton = Button({
      width: 64,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    moveLeftButton.x = centerButton.x - centerButton.width;
    moveLeftButton.y = centerButton.y;
    moveLeftButton.visible = false;
    moveLeftButton.onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2 && MAP_CONTROLE_AVATAR != null && MAP_CONTROLE_AVATAR_IS_MOVE == false){ //走りアニメーション開始
            MAP_CONTROLE_AVATAR_IS_MOVE = true;
            var date = new Date();
            MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP = Math.floor( date.getTime() / 1000 ); //アクション開始時刻を記録
            MAP_AVATAR_ACTION_START_POS_X = MAP_CONTROLE_AVATAR.x;
            MAP_AVATAR_ACTION_START_POS_Y = MAP_CONTROLE_AVATAR.y;
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['run_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("walk_left",0);
          }
        }
      }
    };
    moveLeftButton.onpointstay = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 2) G_MAP_AVATAR_MOVE(4); //自キャラ移動
        }
      }
    };
    moveLeftButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_IS_CONTROLE_BTN_MODE == 0 || MAP_IS_CONTROLE_BTN_MODE == 1) G_MAP_MOVE(4); //マップ移動
          else if(MAP_CONTROLE_AVATAR != null){ //立ちアニメーション開始
            //MAP_CONTROLE_AVATAR['avatar_anim'].changeAnimData(MAP_CONTROLE_AVATAR['avatar_anim']['stay_anim_data']);
            MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle("equip_left",0);
            MAP_CONTROLE_AVATAR_IS_MOVE = false;
            G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(); //行動ログを記録
          }
        }
        else{
          //ショップイベント中でショップ表示中の場合
          if(MAP_SET_SHOP_DATA != null && MAP_SHOP_EVENT_STEP == 4 && NETWORK_IS_CONNECTING == false){
            if(0 < MAP_SHOP_WINDOW_PAGE_NUM){
              MAP_SHOP_WINDOW_PAGE_NUM = MAP_SHOP_WINDOW_PAGE_NUM - 1;
              G_MAP_SHOP_WINDOW_UPDATE(MAP_SET_SHOP_DATA,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW,MAP_SHOP_WINDOW_PAGE_NUM);
              G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,0); //選択中の商品アイテムを更新
            }
          }
        }
      }
    };

    //コマンドボタン初期化
    var posYinit = 0;
    for(var i = 0; i < 3; i++){ //最大3つのコマンドボタン
      MAP_COMMAND_BUTTON_ARRAY[i] = Sprite('ASSET_120').addChildTo(MAP_MAP_SCENE_UI_LAYER); //ボタン画像を指定する。
      MAP_COMMAND_BUTTON_ARRAY[i].x = MAP_COMMAND_BUTTON_ARRAY[i].x + (MAP_COMMAND_BUTTON_ARRAY[i].width * 1.2);
      MAP_COMMAND_BUTTON_ARRAY[i].y = ((MAP_COMMAND_BUTTON_ARRAY[i].y + posYinit) + (SCREEN_HEIGHT / 3.25)) - MAP_COMMAND_BUTTON_ARRAY[i].height;
      posYinit = (posYinit + (MAP_COMMAND_BUTTON_ARRAY[i].height * 1.4));
      MAP_COMMAND_BUTTON_ARRAY[i]['text'] = Label({ //ボタンに表示するテキスト
        text: '',
        fontSize: 32,
        fill: 'black',
        align: 'center',
      }).addChildTo(MAP_COMMAND_BUTTON_ARRAY[i]);
      MAP_COMMAND_BUTTON_ARRAY[i]['button'] = Button({
        width: 160,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_COMMAND_BUTTON_ARRAY[i]);
      MAP_COMMAND_BUTTON_ARRAY[i]['button']['button_index'] = i;
      MAP_COMMAND_BUTTON_ARRAY[i]['button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && this.parent.visible == true && this.parent.alpha == 1 && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false && MAP_LOAD_COMPLETE == true){
          if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false){
            MAP_COMMAND_TRIGGER_NUM = this['button_index'];
          }
          else{
            if(MAP_SET_EVENT_DATA != null){
              if(MAP_SET_EVENT_DATA['trigger_event_type'] == 3){ //ショップイベントだった場合
                if(MAP_SHOP_SELECT_SELL_ITEM != null){ //商品が選択されていた場合
                  MAP_SHOP_COMMAND_TRIGGER_NUM = this['button_index'];
                }
              }
            }
          }
        }
      };
      MAP_COMMAND_BUTTON_ARRAY[i]['button'].visible = false;
      MAP_COMMAND_BUTTON_ARRAY[i].visible = false;
    }

    MAP_COMM_SCENE_CHARA_LAYER = PlainElement({ //シーンのキャラ用レイヤー生成
    width: this.gridX.width,
    height: this.gridY.height,
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);

    MAP_COMM_CHARA_RIGHT_SPRITE = Sprite('ASSET_106').addChildTo(MAP_COMM_SCENE_CHARA_LAYER); //キャラクター右側の画像
    MAP_COMM_CHARA_RIGHT_SPRITE.visible = false;
    MAP_COMM_CHARA_LEFT_SPRITE = Sprite('ASSET_106').addChildTo(MAP_COMM_SCENE_CHARA_LAYER); //キャラクター左側の画像
    MAP_COMM_CHARA_LEFT_SPRITE.visible = false;

    MAP_MESSAGE_WINDOW = Sprite('ASSET_103').addChildTo(MAP_MAP_SCENE_UI_LAYER); //メッセージ表示用ウィンドウ
    MAP_MESSAGE_WINDOW.visible = false;

    //会話シーン用メッセージボタン生成
    MAP_MESSAGE_BUTTON = Button({
      width: 640,         // 横サイズ
      height: 320,        // 縦サイズ
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_MESSAGE_BUTTON.y = this.gridY.center() * 0.65;
    MAP_MESSAGE_BUTTON.visible = false;
    MAP_MESSAGE_BUTTON.onpointend = function(e){// メッセージボタンが押された時
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        if(MAP_COMM_EVENT_STEP == 2){ //表示可能ステップの場合
          if(MAP_COMM_SCENE_NUMBER < (MAP_SET_COMM_DATA['sceneDatas'].length - 1)){
            MAP_COMM_SCENE_NUMBER = MAP_COMM_SCENE_NUMBER + 1;
            if(MAP_SET_EVENT_DATA != null && MAP_SET_EVENT_DATA['trigger_event_type'] == 1){ //会話(主眼)
              G_MAP_SET_COMM_DATA(MAP_COMM_SCENE_NUMBER,MAP_SET_COMM_DATA);
            }
            else if(MAP_SET_EVENT_DATA != null && MAP_SET_EVENT_DATA['trigger_event_type'] == 2){ //会話(通常)
              G_MAP_SET_COMM_DATA(MAP_COMM_SCENE_NUMBER,MAP_SET_COMM_DATA,false,true);
            }
          }
          else{ //最終ページを過ぎた場合
            MAP_COMM_EVENT_STEP = 3; //シーン終了ステップに変更
            MAP_MASK_ANIM_SWITCH = 0; //マスクアニメーション開始
            // if(COMM_SCENE_FINISH == false){ //シーン終了処理を開始
            //   COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
            //   COMM_MESSAGE_TEXT.text = "";
            //   COMM_MASK_ANIM_FINISH = true; //終了用マスクアニメーション開始
            //   COMM_SCENE_FINISH = true;
            // }
          }
        }
        if(MAP_SHOP_EVENT_STEP == 2){ //ショップ会話表示可能ステップの場合
          if(MAP_SHOP_COMM_SCENE_NUMBER < (MAP_SET_SHOP_DATA['shop_comm_result']['sceneDatas'].length - 1)){
            MAP_SHOP_COMM_SCENE_NUMBER = MAP_SHOP_COMM_SCENE_NUMBER + 1;
            G_MAP_SET_COMM_DATA(MAP_SHOP_COMM_SCENE_NUMBER,MAP_SET_SHOP_DATA['shop_comm_result'],false,true);
          }
          else{
            MAP_SHOP_EVENT_STEP = 3;
          }
        }
      }
    };
    MAP_MESSAGE_BUTTON.visible = false;

    MAP_COMM_MESSAGE_TEXT = Label({ //表示メッセージ
      text: '',
      fontSize: 27,
      fill: 'white',
      align: 'left',
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_COMM_MESSAGE_TEXT.x = this.gridX.center() * - 0.9;
    MAP_COMM_MESSAGE_TEXT.y = this.gridY.center() * 0.45;

    MAP_COMM_SPEAK_CAHAR_NAME_TEXT = Label({ //会話中のキャラ名
      text: '',
      fontSize: 30,
      fill: 'white',
      align: 'center',
    }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
    MAP_COMM_SPEAK_CAHAR_NAME_TEXT.x = this.gridX.center() * - 0.44;
    MAP_COMM_SPEAK_CAHAR_NAME_TEXT.y = this.gridY.center() * 0.28;

    MAP_ANIM_MASK_SPRITE = Sprite('ASSET_102').addChildTo(MAP_MAP_SCENE_UI_LAYER); //マスクアニメーション画像
    MAP_ANIM_MASK_SPRITE.alpha = 0;

    MAP_ENEMY_POWER_GAUGE = Gauge({ //敵勢力ゲージを表示
          x: 0, y: 0,// x,y座標
          width: 512,            // 横サイズ
          height: 30,            // 縦サイズ
          maxValue: 100,         // ゲージ最大値
          value: 0,         // ゲージ初期値
          fill: 'blue',         // 後ろの色
          gaugeColor: 'red', // ゲージ色
          stroke: 'black',      // 枠色
          strokeWidth: 10,        // 枠太さ
        }).addChildTo(MAP_MAP_SCENE_UI_LAYER);
        MAP_ENEMY_POWER_GAUGE.y = (MAP_ENEMY_POWER_GAUGE.y - SCREEN_HEIGHT / 2.1);
        MAP_ENEMY_POWER_GAUGE.visible = false;

    //メニューボタン表示
    MAP_MENU_BUTTON = Sprite('ASSET_175').addChildTo(MAP_MAP_SCENE_UI_LAYER); //メニューボタン画像
    MAP_MENU_BUTTON.setScale(0.8,0.8);
    MAP_MENU_BUTTON.y = MAP_MENU_BUTTON.y - ((SCREEN_HEIGHT / 2) - (MAP_MENU_BUTTON.height / 2));
    MAP_MENU_BUTTON.x = MAP_MENU_BUTTON.x + ((SCREEN_WIDTH / 2) - (MAP_MENU_BUTTON.width / 2));
    //メニューボタン本体
    MAP_MENU_BUTTON['button'] = Button({
      width: MAP_MENU_BUTTON.width,         // 横サイズ
      height: MAP_MENU_BUTTON.height,        // 縦サイズ
    }).addChildTo(MAP_MENU_BUTTON);
    MAP_MENU_BUTTON['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false){
          G_CREATE_SHORT_MENU_WINDOW(MAP_SCENE_OBJ,MAP_WINDOW_NODE);
        }
      }
    };
    MAP_MENU_BUTTON['button'].visible = false;
    //メッセージ確認ボタン
    MAP_MESSAGE_BTN = Sprite('ASSET_411').addChildTo(MAP_MAP_SCENE_UI_LAYER); //メッセージボタン画像
    MAP_MESSAGE_BTN.x = MAP_MESSAGE_BTN.x + ((SCREEN_WIDTH / 2) - (MAP_MESSAGE_BTN.width / 2));
    MAP_MESSAGE_BTN.y = MAP_MENU_BUTTON.y;
    MAP_MESSAGE_BTN.y = MAP_MESSAGE_BTN.y + MAP_MESSAGE_BTN.height;
    MAP_MESSAGE_BTN['button'] = Button({
      width: MAP_MESSAGE_BTN.width,         // 横サイズ
      height: MAP_MESSAGE_BTN.height,        // 縦サイズ
    }).addChildTo(MAP_MESSAGE_BTN);
    MAP_MESSAGE_BTN['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && WINDOW_LIST == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        if(MAP_IS_EVENT == false && MAP_IS_ANIMATION == false && MAP_MESSAGE_BTN.visible == true){
          G_MESSAGE_WINDOW_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_INFO['player_index_id'],MAP_SCENE_OBJ); //メッセージウィンドウを表示
        }
      }
    };
    MAP_MESSAGE_BTN['button'].visible = false;
    //ヘッダー表示
    // var headerSptite = Sprite('ASSET_34').addChildTo(this);
    // headerSptite.x = this.gridX.center();
    // headerSptite.y = headerSptite.height / 2;

    // Label({
    //   text: 'マップ',
    //   fontSize: 24,
    //   fill: 'white',
    // }).addChildTo(headerSptite);

    var initPostParamVal = new Object();
    if(MAP_GILD_HOME_GILD_ID == -1){ //通常処理
      if(STORY_SELECT_MAIN_STORY_HASH != null){
        var eventCount = 0;
        if(isset(STORY_SELECT_MAIN_STORY_HASH['player_event_count'])){
          eventCount = STORY_SELECT_MAIN_STORY_HASH['player_event_count'];
        }
        initPostParamVal['set_map_id'] = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]['event_target_id'];
        initPostParamVal['check_story_id'] = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]['main_story_master_id'];
        MAP_PLAYER_SELECT_MAP_DATA = STORY_SELECT_MAIN_STORY_HASH['start_main_story_event_master'][eventCount]; //進行中のストーリーデータを取得
        initPostParamVal['check_player_event_count'] = (eventCount + 1);//データベース参照用のため + 1する
        initPostParamVal['area_mode'] = AREA_MODE; //現在ゲーム(クライアントで設定されてるエリアモードを設定)
      }
      else{
        initPostParamVal['set_map_id'] = false;
      }
    }
    else{ //ギルドホーム移動処理
      initPostParamVal['go_to_guild_home'] = MAP_GILD_HOME_GILD_ID;
      initPostParamVal['set_map_id'] = GUILD_HOME_MAP_ID;
      initPostParamVal['check_story_id'] = 0;
      initPostParamVal['area_mode'] = AREA_MODE; //現在ゲーム(クライアントで設定されてるエリアモードを設定)

    }
    //ウィンドウ表示用ノード
    MAP_WINDOW_NODE = PlainElement({
    }).addChildTo(this);
    MAP_WINDOW_NODE.x = this.gridX.center();
    MAP_WINDOW_NODE.y = this.gridY.center();
    NETWORK_IS_CONNECTING = true; //通信開始フラグON
    initPostParamVal['set_my_avatar_data'] = 1; //自分のアバターデータをセット
    ajaxStart("post","json","../../client/map/map.php",initPostParamVal); //非同期通信開始


    //テスト
    //var testObject = Sprite("ASSET_65").addChildTo(MAP_MAP_SCENE_UI_LAYER);
    //G_MAP_START_FOOT_PRINT_ANIM(testObject,MAP_MAP_SCENE_UI_LAYER);
    //testObject.tweener.moveTo(testObject.x + (SCREEN_WIDTH / 2), testObject.y, 3000).play();
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      console.log(json);
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了
          if(isset(json["map_scene_error"])){ //マップシーンエラー
            var mapSceneError = json["map_scene_error"];
            if(isset(mapSceneError['error']) && mapSceneError['error'] != 0){ //エラーが存在した
              console.log(mapSceneError);
              if(isset(mapSceneError['error_comment'])){ //エラーウィンドウを表示
                G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー",mapSceneError['error_comment'],0,"mapSceneErrorWindow");
              }
            }
          }
          if(isset(json["server_request_dttm"])){ //サーバーリクエスト時刻
            SERVER_REQUEST_DTTM = json["server_request_dttm"];
            //Date型が扱えるように整形
            SERVER_REQUEST_DTTM = G_HELPER_REPLACE_DATE(SERVER_REQUEST_DTTM);
            MAP_SCENE_SERVER_REQUEST_DTTM = new Date(SERVER_REQUEST_DTTM);
          }
          if(isset(json["player_info"])){ //プレイヤー情報
            MAP_PLAYER_INFO = json["player_info"];
          }
          if(isset(json["player_master"])){ //プレイヤーマスターデータ
            MAP_PLAYER_MASTER = json["player_master"];
          }
          if(isset(json["result_story_master_id"])){ //進行中のストーリーマスターID
            MAP_STORY_MASTER_ID = json["result_story_master_id"];
          }
          if(isset(json["result_map_data"])){
            MAP_RESULT_MAP_DATA = json["result_map_data"];//マップデータ取得
          }
          if(isset(json["player_guild_data"])){ //所属ギルドデータ
            MAP_PLAYER_GUILD_DATA = json["player_guild_data"];
          }
          if(isset(json["player_guild_member_datas"])){
            MAP_PLAYER_GUILD_MEMBER_DATAS = json["player_guild_member_datas"];
          }
          if(isset(json["result_map_master_data"])){
            MAP_RESULT_MAP_MASTER_DATA = json["result_map_master_data"];//マップマスターデータ取得
            if(PLAYER_BATTLE_INSTANCE != null){ //戦闘後のマップデータが存在した場合
              if(isset(PLAYER_BATTLE_INSTANCE['map_master_data'])){ //マップデータがある場合は取得
                MAP_RESULT_MAP_MASTER_DATA['start_pos_x'] = PLAYER_BATTLE_INSTANCE['map_master_data']['start_pos_x']; //マップ開始位置を変更
                MAP_RESULT_MAP_MASTER_DATA['start_pos_y'] = PLAYER_BATTLE_INSTANCE['map_master_data']['start_pos_y']; //マップ開始位置を変更
              }
              if(isset(PLAYER_BATTLE_INSTANCE['update_map_start_pos'])){ //位置変更情報がある場合は更新
                MAP_RESULT_MAP_MASTER_DATA['start_pos_x'] = PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x']; //マップ開始位置を変更
                MAP_RESULT_MAP_MASTER_DATA['start_pos_y'] = PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y']; //マップ開始位置を変更
              }
              if(isset(PLAYER_BATTLE_INSTANCE['battle_event_data'])){ //過去の戦闘情報を削除
                PLAYER_BATTLE_INSTANCE['battle_event_data'] = null;
              }
            }
          }
          if(isset(json["result_map_active_character_ids"])){ //マップキャラクターデータ
            MAP_ACTIVE_CHARACTER_DATA = json["result_map_active_character_ids"];
          }
          if(isset(json["result_map_enemy_datas"])){ //マップに配置された敵のマスターデータ
            MAP_ENEMY_MASTER_DATAS = json["result_map_enemy_datas"];
          }
          if(isset(json["result_map_npc_datas"])){ //マップに配置されたNpcのマスターデータ
            MAP_NPC_MASTER_DATAS = json["result_map_npc_datas"];
          }
          if(isset(json["result_map_shop_datas"])){ //マップに配置された店のマスターデータ
            MAP_SHOP_MASTER_DATAS = json["result_map_shop_datas"];
          }
          if(isset(json["result_map_drop_item_datas"])){ //マップに配置されたアイテムのマスターデータ
            MAP_DROP_ITEM_MASTER_DATAS = json["result_map_drop_item_datas"];
          }
          if(isset(json["result_map_quest_board_datas"])){ //マップに配置されたクエストボードのマスターデータ
            MAP_QUEST_BOARD_MASTER_DATAS = json["result_map_quest_board_datas"];
          }
          if(isset(json["result_map_party_board_datas"])){ //マップに配置されたパーティボードのマスターデータ
            MAP_PARTY_BOARD_MASTER_DATAS = json["result_map_party_board_datas"];
          }
          if(isset(json["result_map_door_datas"])){ //マップに配置されたドアのマスターデータ
            MAP_DOOR_MASTER_DATAS = json["result_map_door_datas"];
          }
          if(isset(json["result_map_guild_board_datas"])){ //マップに配置されたギルドボードのマスターデータ
            MAP_GUILD_BOARD_MASTER_DATAS = json["result_map_guild_board_datas"];
          }
          if(isset(json["result_map_monument_datas"])){ //マップに配置されたモニュメントのマスターデータ
            MAP_MONUMENT_MASTER_DATAS = json["result_map_monument_datas"];
          }
          if(isset(json["result_map_event_datas"])){ //マップに配置されたイベントのマスターデータ
            MAP_EVENT_DATAS = json["result_map_event_datas"];
          }
          if(isset(json["result_event_comm_data"])){ //イベント会話データ
            MAP_SET_COMM_DATA = json["result_event_comm_data"];
            MAP_COMM_EVENT_STEP = 1; //ロード完了を設定
            if(MAP_SET_EVENT_DATA['trigger_event_type'] == 1){//主眼の会話の場合
              MAP_MASK_ANIM_SWITCH = 0; //会話データがセットされた他め、マスクアニメーションを開始する。
            }
          }
          if(isset(json["result_event_item_drop_data"])){ //アイテム獲得イベントの結果
            MAP_SET_DROP_ITEM_DATA = json["result_event_item_drop_data"];
            if(isset(json["result_update_player_item_data"])){ //更新用通貨データ
              MAP_PLAYER_ITEM_DATA = json["result_update_player_item_data"];
            }
            if(isset(json["result_update_player_equip_item_data"])){ //更新用装備アイテムデータ
              MAP_PLAYER_EQUIP_ITEM_DATA = json["result_update_player_equip_item_data"];
            }
            if(isset(json["result_update_player_card_data"])){ //更新用カードデータ
              MAP_PLAYER_CARD_DATA = json["result_update_player_card_data"];
            }
          }
          if(isset(json["result_event_shop_data"])){ //店イベントの読み込み結果
            MAP_SET_SHOP_DATA = json["result_event_shop_data"];
          }
          if(isset(json["result_player_map_character_datas"])){ //プレイヤーのマップキャラクター情報
            MAP_PLAYER_MAP_CHARACTER_DATAS = json["result_player_map_character_datas"];
          }
          if(isset(json["player_item_data"])){ //プレイヤーの通貨所持情報
            MAP_PLAYER_ITEM_DATA = json["player_item_data"];
          }
          if(isset(json["player_equip_item_data"])){ //プレイヤーの装備アイテム情報
            MAP_PLAYER_EQUIP_ITEM_DATA = json["player_equip_item_data"];
          }
          if(isset(json["player_card_data"])){ //プレイヤーのカード所持情報
            MAP_PLAYER_CARD_DATA = json["player_card_data"];
          }
          if(isset(json["player_card_data"])){ //プレイヤーのスタンプ所持情報
            MAP_PLAYER_STAMP_DATA = json["player_stamp_data"];
          }
          if(isset(json["result_purchase_item"])){ //購入結果
            MAP_RESULT_PURCHASE_ITEM = json["result_purchase_item"]; //購入結果を取得
            if(isset(json["result_update_player_item_data"])){ //更新用通貨データ
              MAP_PLAYER_ITEM_DATA = json["result_update_player_item_data"];
            }
            if(isset(json["result_update_player_equip_item_data"])){ //更新用装備アイテムデータ
              MAP_PLAYER_EQUIP_ITEM_DATA = json["result_update_player_equip_item_data"];
            }
            if(isset(json["result_update_player_card_data"])){ //更新用カードデータ
              MAP_PLAYER_CARD_DATA = json["result_update_player_card_data"];
            }
          }
          if(isset(json["result_battle_event_data"])){
            MAP_SET_BATTLE_DATA = json["result_battle_event_data"]; //バトルイベントデータを取得
          }
          if(isset(json["result_player_map_instance"])){ //プレイヤーのマップインスタンス
            MAP_PLAYER_MAP_INSTANCE = json["result_player_map_instance"];//プレイヤーのマップインスタンスを取得
          }
          if(isset(json["result_area_instance"])){ //プレイヤーのマップインスタンス
            MAP_AREA_INSTANCE = json["result_area_instance"];//ワールドエリアマップインスタンスを取得
          }
          if(isset(json["result_quest_datas"])){ //クエストボードの確認時に格納されるクエストデータ
            MAP_SET_QUEST_DATA = json["result_quest_datas"];
          }
          if(isset(json["result_party_datas"])){ //パーティボードの確認時に格納されるパーティデータ
            MAP_SET_PARTY_DATA = json["result_party_datas"];
          }
          if(isset(json["result_door_event_data"])){ //ドアの確認時に格納されるデータ
            MAP_SET_DOOR_DATA = json["result_door_event_data"];
            //以下格納されているデータ
            //MAP_SET_DOOR_DATA['door_master_data'];
          }
          if(isset(json["result_monument_event_data"])){ //モニュメントの確認時に格納されるデータ
            MAP_SET_MONUMENT_DATA = json["result_monument_event_data"];
            console.log("モニュメントデータの結果");
            console.log(MAP_SET_MONUMENT_DATA);
          }
          if(isset(json["result_event_player_room_data"])){ //プレイヤールームイベント開始時の通信結果
            MAP_SET_PLAYER_ROOM_DATA = json["result_event_player_room_data"];
          }
          if(isset(json["result_update_player_room_data"])){ //プレイヤールームイベント開始時の通信結果
            var getUpdatePlayerRoomData = json["result_update_player_room_data"];
            //追加で読み込まれたアバターをアバター配列に追加。
            var addAvatarDatas = getUpdatePlayerRoomData['map_add_avatar_datas'];
            //プレイヤールームチャットログを更新
            MAP_PLAYER_ROOM_CHAT_LOGS = new Array();
            MAP_PLAYER_ROOM_CHAT_LOGS = getUpdatePlayerRoomData['player_room_chat_logs'];
            for (var i = 0; i < addAvatarDatas.length; i++) {
              G_MAP_ADD_AVATAR_DATAS(addAvatarDatas[i]);
            }
            //プレイヤールームのアバターを更新
            G_MAP_PLAYER_ROOM_AVATAR_UPDATE(getUpdatePlayerRoomData,MAP_ACTIVE_PLAYER_ROOM_INSTANCE,MAP_SCENE_SERVER_REQUEST_DTTM,MAP_AVATAR_DATAS);
          }
          if(isset(json["result_player_order_quest"])){ //受注したクエスト情報が存在した。
            if(json["result_player_order_quest"] != false){
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"クエスト受注","クエストを受注しました。",2,"resultQuestOrderWindow");
              if(isset(json['update_quest_datas'])){ //更新クエスト情報
                MAP_SET_QUEST_DATA = json['update_quest_datas']; //クエスト情報を更新
              }
            }
            else{
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"クエスト受注","クエストの受注に失敗しました。",2,"resultQuestOrderWindow");
            }
          }
          if(isset(json["result_player_quest_clear"])){ //報告したクエスト情報が存在した。
            var questClearError = true;
            if(isset(json["result_player_quest_clear"]["error"])){
              if(json["result_player_quest_clear"]["error"] == false) questClearError = false;
            }
            if(questClearError == false){ //エラーがなく正常な場合
              MAP_PLAYER_QUEST_CLEAR_RESULT_DATA = json["result_player_quest_clear"];
              G_MAP_QUEST_CLEAR_ANIM_START(MAP_MAP_SCENE_UI_LAYER); //クエストクリア演出を開始する。
              if(isset(json['update_quest_datas'])){ //更新クエスト情報
                MAP_SET_QUEST_DATA = json['update_quest_datas']; //クエスト情報を更新
              }
            }
            else{ //エラーの場合
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"クエストの報告","報告結果の取得に失敗しました。",2,"questClearAlertWindow");
            }
          }
          if(isset(json["order_quest_start_map_event_trigger_data"])){ //受注後に開始するイベント情報が存在した
            MAP_QUEST_ORDER_START_EVENT_DATA = json["order_quest_start_map_event_trigger_data"];
          }
          if(isset(json["report_quest_end_map_event_trigger_data"])){ //クリア後に開始するイベント情報が存在した
            MAP_QUEST_REPORT_END_EVENT_DATA = json["report_quest_end_map_event_trigger_data"];
          }
          if(isset(json["result_door_open"])){ //ドアの解錠が行われた
            var resultDoorOpen = json["result_door_open"];
            if(MAP_SET_DOOR_DATA != null && MAP_IS_EVENT == true && MAP_DOOR_EVENT_STEP == 3){
              if(isset(resultDoorOpen['error']) && isset(resultDoorOpen['error_comment']) && resultDoorOpen['error'] == 0){
                G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"解錠成功","鍵を外しました。",2,"resultDoorOpenWindow");
              }
              else{
                if(isset(resultDoorOpen['error']) && isset(resultDoorOpen['error_comment'])){
                  G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","■エラー内容\n" + resultDoorOpen['error_comment'],2,"resultDoorOpenErrorWindow");
                  MAP_DOOR_EVENT_STEP = 5; //ドアイベント終了
                }
              }
            }
          }
          if(isset(json["set_my_avatar_data"])){
            G_MAP_ADD_AVATAR_DATAS(json["set_my_avatar_data"]);
          }
          if(isset(json["result_send_quick_chat_player_room"])){ //クイックチャットの入力が行われた。
            LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'] = json["result_send_quick_chat_player_room"]['chat_text'];
            LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id'] = json["result_send_quick_chat_player_room"]['stamp_id'];
          }
          if(isset(json["result_send_quick_chat_guild_room"])){ //クイックチャットの入力が行われた。
            LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'] = json["result_send_quick_chat_guild_room"]['chat_text'];
            LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id'] = json["result_send_quick_chat_guild_room"]['stamp_id'];
          }
          if(isset(json["result_monumet_select_item"])){ //モニュメントに使用したアイテム結果を取得
            var resultSelectItem = json["result_monumet_select_item"];
            if(isset(json['result_update_player_item_data'])){
              MAP_PLAYER_ITEM_DATA = json["result_update_player_item_data"]; //所持品情報を更新
            }
            if(isset(resultSelectItem['error'])){
              if(resultSelectItem['error'] == 0) G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"アイテムの使用","アイテムを捧げました。",2,"resultMonumentSelectItemWindowSuccess");
              else G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","アイテムの使用に失敗しました。",2,"resultMonumentSelectItemWindowError");
            }
            if(isset(json['result_update_player_attribute_bonus'])){ //更新後の属性ボーナスデータ
              var resultUpdateAttributeBonus = json['result_update_player_attribute_bonus'];
              var attributeId = MAP_MONUMENT_WINDOW['examine_button_btn']['attribute_category_id'];
              //属性ボーナスを更新後の内容にする
              MAP_MONUMENT_WINDOW['examine_button_btn']['player_attribute_val'] = resultUpdateAttributeBonus['attribute_' + attributeId];
              MAP_MONUMENT_WINDOW['monument_font_sprite']['max_alpha'] = G_MAP_GET_MONUMENT_FONT_ANIM_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //最大透明度を取得
              MAP_MONUMENT_WINDOW['monument_font_sprite']['up_alpha'] = G_MAP_GET_MONUMET_FONT_ANIM_PLUS_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //加算する透明度を取得
            }
          }
          if(isset(json["result_monumet_select_card"])){ //モニュメントに使用したカード結果を取得
            var resultSelectCard = json["result_monumet_select_card"];
            if(isset(json['result_update_player_card_data'])){
              MAP_PLAYER_CARD_DATA = json["result_update_player_card_data"]; //所持品情報を更新
            }
            if(isset(resultSelectCard['error'])){
              if(resultSelectCard['error'] == 0) G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"カードの使用","カードを捧げました。",2,"resultMonumentSelectCardWindowSuccess");
              else G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","カードの使用に失敗しました。",2,"resultMonumentSelectCardWindowError");
            }
            if(isset(json['result_update_player_attribute_bonus'])){ //更新後の属性ボーナスデータ
              var resultUpdateAttributeBonus = json['result_update_player_attribute_bonus'];
              var attributeId = MAP_MONUMENT_WINDOW['examine_button_btn']['attribute_category_id'];
              //属性ボーナスを更新後の内容にする
              MAP_MONUMENT_WINDOW['examine_button_btn']['player_attribute_val'] = resultUpdateAttributeBonus['attribute_' + attributeId];
              MAP_MONUMENT_WINDOW['monument_font_sprite']['max_alpha'] = G_MAP_GET_MONUMENT_FONT_ANIM_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //最大透明度を取得
              MAP_MONUMENT_WINDOW['monument_font_sprite']['up_alpha'] = G_MAP_GET_MONUMET_FONT_ANIM_PLUS_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //加算する透明度を取得
            }
          }
          if(isset(json["result_monumet_select_equip_item"])){ //モニュメントに使用した装備品結果を取得
            var resultSelectEquipItem = json["result_monumet_select_equip_item"];
            if(isset(json['result_update_player_equip_item_data'])){
              MAP_PLAYER_EQUIP_ITEM_DATA = json["result_update_player_equip_item_data"]; //所持品情報を更新
            }
            if(isset(resultSelectEquipItem['error'])){
              if(resultSelectEquipItem['error'] == 0) G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"装備品の使用","装備品を捧げました。",2,"resultMonumentSelectEquipItemWindowSuccess");
              else G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","装備品の使用に失敗しました。",2,"resultMonumentSelectEquipItemWindowError");
            }
            if(isset(json['result_update_player_attribute_bonus'])){ //更新後の属性ボーナスデータ
              var resultUpdateAttributeBonus = json['result_update_player_attribute_bonus'];
              var attributeId = MAP_MONUMENT_WINDOW['examine_button_btn']['attribute_category_id'];
              //属性ボーナスを更新後の内容にする
              MAP_MONUMENT_WINDOW['examine_button_btn']['player_attribute_val'] = resultUpdateAttributeBonus['attribute_' + attributeId];
              MAP_MONUMENT_WINDOW['monument_font_sprite']['max_alpha'] = G_MAP_GET_MONUMENT_FONT_ANIM_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //最大透明度を取得
              MAP_MONUMENT_WINDOW['monument_font_sprite']['up_alpha'] = G_MAP_GET_MONUMET_FONT_ANIM_PLUS_ALPHA(resultUpdateAttributeBonus['attribute_' + attributeId]); //加算する透明度を取得
            }
          }
          if(isset(json['result_player_duel_application'])){ //決闘申請の結果を取得
            var resultDuelApplication = json['result_player_duel_application'];
            if(isset(resultDuelApplication['error']) && isset(resultDuelApplication['error_comment'])){
              if(resultDuelApplication['error'] == 0) G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"決闘の申請","決闘の申請を行いました",2,"resultPlayerDuelApplicationEindowSuccess");
              else G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー",resultDuelApplication['error_comment'],2,"resultPlayerDuelApplicationEindowError");
            }
          }
          if(isset(json['result_player_kill_execute'])){ //プレイヤーの殺害結果
            var resultPlayerKillExecute = json['result_player_kill_execute'];
            if(isset(resultPlayerKillExecute['error'])){
              if(resultPlayerKillExecute['error'] == 0){ //殺害結果は正常
                //PVP用のバトルインスタンスを作成
                PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
                PLAYER_BATTLE_INSTANCE = new Object();
                PLAYER_BATTLE_INSTANCE['battle_instance_id'] = resultPlayerKillExecute['battle_instance_id'];
                MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID = -1;
                MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
                //戦闘後の位置を更新
                PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
                PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
              }
              else{ //エラー
                var errorComment = "エラーが発生しました。";
                if(isset(resultPlayerKillExecute['error_comment'])) errorComment = resultPlayerKillExecute['error_comment'];
                G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー",errorComment,2,"resultPlayerKillExecuteErrorWindow");
              }
            }
          }
          if(isset(json['encount_response_data'])){ //エンカウント戦闘が発生した
            var encountResponse = json['encount_response_data'];
            if(isset(encountResponse['error']) && encountResponse['error'] == 0){
              MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID = encountResponse['battle_instance_id'];
            }
            else{
              //エラー処理を実行する場合はここに記載
            }
          }
          if(isset(json['result_enemy_power_condition'])){ //現在のマップの敵勢力を取得
            G_MAP_ENEMY_POWER_GAUGE_UPDATE(MAP_ENEMY_POWER_GAUGE,json['result_enemy_power_condition']); //ゲージを更新
          }
        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          SCENE_MANAGER['prev_scene'] = "map";
          if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
          this.exit("title");
        }
      }
      else{
        alert("不正な通信が検出されました。タイトルに戻ります。");
        SCENE_MANAGER['prev_scene'] = "map";
        if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
        this.exit("title");
      }
      NETWORK_IS_CONNECTING = false; //通信終了
      RESULT_DATA = "";//通信結果を初期化
    }

    if(MAP_MAP_LOAD == false && MAP_RESULT_MAP_DATA != null && MAP_RESULT_MAP_MASTER_DATA &&
      MAP_ENEMY_MASTER_DATAS != null && MAP_SHOP_MASTER_DATAS != null &&
      MAP_DROP_ITEM_MASTER_DATAS != null && MAP_QUEST_BOARD_MASTER_DATAS != null && MAP_PARTY_BOARD_MASTER_DATAS != null && MAP_MONUMENT_MASTER_DATAS != null && MAP_DOOR_MASTER_DATAS != null && MAP_GUILD_BOARD_MASTER_DATAS != null && MAP_NPC_MASTER_DATAS != null && MAP_EVENT_DATAS != null && MAP_PLAYER_MAP_CHARACTER_DATAS != null &&
      MAP_PLAYER_ITEM_DATA != null && MAP_PLAYER_EQUIP_ITEM_DATA != null && MAP_PLAYER_CARD_DATA != null && MAP_PLAYER_MAP_INSTANCE != null && MAP_AREA_INSTANCE != null){
      MAP_MAP_LOAD = true;
      G_MAP_LOAD_MAP(MAP_RESULT_MAP_DATA,MAP_RESULT_MAP_MASTER_DATA);
      G_MAP_CHARA_ANIM_SET_DIRECTION(MAP_CHARA_ANIM_OBJECTS);
      G_MAP_SET_MAP_POS(MAP_RESULT_MAP_MASTER_DATA); //マップの初期位置をセット
      MAP_EVENT_DATAS = G_MAP_EVENT_INIT(MAP_EVENT_DATAS);
      G_MAP_ENEMY_POWER_GAUGE_INIT(MAP_ENEMY_POWER_GAUGE,MAP_PLAYER_MAP_INSTANCE,MAP_AREA_INSTANCE,MAP_RESULT_MAP_MASTER_DATA); //敵勢力ゲージの量を初期化
      G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS); //イベントがあれば、イベントを実行
      MAP_MAP_ANIM_VISIBLE = true;
      MAP_ENEMY_POWER_GAUGE.visible = true;
    }

    if(MAP_MAP_ANIM_VISIBLE == true){ //マップ上のアニメーション
      if(MAP_ANIM_WAIT_VAL < MAP_ANIM_WAIT_TIME){
        MAP_ANIM_WAIT_VAL = MAP_ANIM_WAIT_VAL + 1;
        MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL = MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL + 1;
        MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL = MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL + 1;
        G_MAP_CHARA_MOVE_EXE(MAP_CHARA_ANIM_OBJECTS,MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL);
      }
      else{
        G_MAP_CHARA_ANIM_SET_DIRECTION(MAP_CHARA_ANIM_OBJECTS);
        MAP_ANIM_WAIT_VAL = 0;
      }
    }

    //キャラクター情報ウィンドウのキャラアニメーションを再生
    if(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE != null && !isset(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['player_avatar_hash'])){
      if(MAP_ANIM_CHIP_FLAME_CHANGE_TIME < MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL){
        if(1 < MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index']){
          MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index'] = 0;
          MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.setFrameIndex(0);
        }
        else{
          //MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index'] = MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index'] + 1;
          //MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.setFrameIndex(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index']);
        }
      }
    }

    //キャラチップのフレーム変更時間の更新
    if(MAP_ANIM_CHIP_FLAME_CHANGE_TIME < MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL){
      MAP_ANIM_CHIP_FLAME_CHANGE_TIME_VAL = 0;
    }

    if(MAP_MAP_ANIM_DIRECTION != -1){ //マップの移動方向
      switch (MAP_MAP_ANIM_DIRECTION) {
        case 1:
        {
          if(MAP_MAP_SCENE_MAP_LAYER.y < MAP_NEXT_POS){
            var tmpPos = MAP_MAP_SCENE_MAP_LAYER.y + MAP_MAP_MOVE_SPEED;
            if(MAP_NEXT_POS < tmpPos){
              tmpPos = MAP_NEXT_POS;
            }
            MAP_MAP_SCENE_MAP_LAYER.y = tmpPos;
            MAP_MY_AVATAR.y = MAP_MY_AVATAR.y + MAP_MAP_MOVE_SPEED;
          }
          else{
            if(NETWORK_IS_CONNECTING == true) break;
            G_MAP_MOVE_AVATAR(MAP_MAP_ANIM_DIRECTION);
            MAP_MAP_ANIM_DIRECTION = -1;
            MAP_MAP_SCENE_MAP_LAYER.y = MAP_NEXT_POS;
            MAP_PLAYER_MAP_POS['pos_y'] = Number(MAP_PLAYER_MAP_POS['pos_y'])- 1;
            G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS);
            console.log("マップ位置X:" + MAP_PLAYER_MAP_POS['pos_x']);
            console.log("マップ位置Y:" + MAP_PLAYER_MAP_POS['pos_y']);
          }
        }
        break;
        case 2:
        {
          if(MAP_NEXT_POS < MAP_MAP_SCENE_MAP_LAYER.x){
            var tmpPos = MAP_MAP_SCENE_MAP_LAYER.x - MAP_MAP_MOVE_SPEED;
            if(tmpPos < MAP_NEXT_POS){
              tmpPos = MAP_NEXT_POS;
            }
            MAP_MAP_SCENE_MAP_LAYER.x = tmpPos;
            MAP_MY_AVATAR.x = MAP_MY_AVATAR.x - MAP_MAP_MOVE_SPEED;
          }
          else{
            if(NETWORK_IS_CONNECTING == true) break;
            G_MAP_MOVE_AVATAR(MAP_MAP_ANIM_DIRECTION);
            MAP_MAP_ANIM_DIRECTION = -1;
            MAP_MAP_SCENE_MAP_LAYER.x = MAP_NEXT_POS;
            MAP_PLAYER_MAP_POS['pos_x'] = Number(MAP_PLAYER_MAP_POS['pos_x']) + 1;
            G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS);
            console.log("マップ位置X:" + MAP_PLAYER_MAP_POS['pos_x']);
            console.log("マップ位置Y:" + MAP_PLAYER_MAP_POS['pos_y']);
          }
        }
        break;
        case 3:
        {
          if(MAP_NEXT_POS < MAP_MAP_SCENE_MAP_LAYER.y){
            var tmpPos = MAP_MAP_SCENE_MAP_LAYER.y - MAP_MAP_MOVE_SPEED;
            if(tmpPos < MAP_NEXT_POS){
              tmpPos = MAP_NEXT_POS;
            }
            MAP_MAP_SCENE_MAP_LAYER.y = tmpPos;
            MAP_MY_AVATAR.y = MAP_MY_AVATAR.y - MAP_MAP_MOVE_SPEED;
          }
          else{
            if(NETWORK_IS_CONNECTING == true) break;
            G_MAP_MOVE_AVATAR(MAP_MAP_ANIM_DIRECTION);
            MAP_MAP_ANIM_DIRECTION = -1;
            MAP_MAP_SCENE_MAP_LAYER.y = MAP_NEXT_POS;
            MAP_PLAYER_MAP_POS['pos_y'] = Number(MAP_PLAYER_MAP_POS['pos_y']) + 1;
            G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS);
            console.log("マップ位置X:" + MAP_PLAYER_MAP_POS['pos_x']);
            console.log("マップ位置Y:" + MAP_PLAYER_MAP_POS['pos_y']);
          }
        }
        break;
        case 4:
        {
          if(MAP_MAP_SCENE_MAP_LAYER.x < MAP_NEXT_POS){
            var tmpPos = MAP_MAP_SCENE_MAP_LAYER.x + MAP_MAP_MOVE_SPEED;
            if(MAP_NEXT_POS < tmpPos){
              tmpPos = MAP_NEXT_POS;
            }
            MAP_MAP_SCENE_MAP_LAYER.x = tmpPos;
            MAP_MY_AVATAR.x = MAP_MY_AVATAR.x + MAP_MAP_MOVE_SPEED;
          }
          else{
            if(NETWORK_IS_CONNECTING == true) break;
            G_MAP_MOVE_AVATAR(MAP_MAP_ANIM_DIRECTION);
            MAP_MAP_ANIM_DIRECTION = -1;
            MAP_MAP_SCENE_MAP_LAYER.x = MAP_NEXT_POS;
            MAP_PLAYER_MAP_POS['pos_x'] = Number(MAP_PLAYER_MAP_POS['pos_x']) - 1;
            G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS);
            console.log("マップ位置X:" + MAP_PLAYER_MAP_POS['pos_x']);
            console.log("マップ位置Y:" + MAP_PLAYER_MAP_POS['pos_y']);
          }
        }
        break;
        default:
      }
    }
    if(MAP_SEARCH_HIT_BOX != null && MAP_MAP_SCENE_MAP_LAYER != null){
      MAP_SEARCH_HIT_BOX.x = -MAP_MAP_SCENE_MAP_LAYER.x;
      MAP_SEARCH_HIT_BOX.y = -MAP_MAP_SCENE_MAP_LAYER.y - (MAP_CHARACTER_INFO_WINDOW.height * 0.6);
    }

    if(MAP_SET_EVENT_DATA != null && MAP_IS_EVENT == true){ //イベントが設定されていた場合
      switch (MAP_SET_EVENT_DATA['trigger_event_type']) {
        case "1": //会話(主眼)
        {
          if(MAP_MASK_ANIM_SWITCH != -1){ //マスクアニメーションが実行中の場合
            if(MAP_ANIM_MASK_SPRITE != null){
              if(MAP_MASK_ANIM_SWITCH == 0){ //加色
                if(MAP_ANIM_MASK_SPRITE.alpha < 1){
                  MAP_ANIM_MASK_SPRITE.alpha += 0.025;
                }
                else{
                  MAP_ANIM_MASK_SPRITE.alpha = 1;
                  MAP_MASK_ANIM_SWITCH = 1; //減色にスイッチ
                  if(MAP_COMM_EVENT_STEP == 1){ //読み込み完了していた場合、初期表示を開始
                    G_MAP_COMM_SCENE_INIT();
                    G_MAP_SET_COMM_DATA(0,MAP_SET_COMM_DATA,true);
                    MAP_COMM_EVENT_STEP = 2;

                  }
                  if(MAP_COMM_EVENT_STEP == 3){ //会話シーンが終了した場合、通常シーンに戻す処理を行う
                    G_MAP_COMM_SCENE_END();
                    MAP_COMM_EVENT_STEP = 4; //シーン終了前にする
                  }
                }
              }
              else if(MAP_MASK_ANIM_SWITCH == 1){
                if(0 < MAP_ANIM_MASK_SPRITE.alpha){
                  MAP_ANIM_MASK_SPRITE.alpha -= 0.025;
                }
                else{
                  MAP_ANIM_MASK_SPRITE.alpha = 0;
                  MAP_MASK_ANIM_SWITCH = -1; //停止にスイッチ
                  if(MAP_COMM_EVENT_STEP == 2){ //表示完了していた場合 メッセージの表示開始
                    G_MAP_SET_COMM_DATA(0,MAP_SET_COMM_DATA);
                  }
                  if(MAP_COMM_EVENT_STEP == 4){ //シーン終了前だった場合
                    MAP_IS_EVENT = false; //イベント状態をオフにする。
                    MAP_COMM_SCENE_NUMBER = 0; //ページを初期化
                    G_UPDATE_EVENT_INIT(MAP_EVENT_DATAS,MAP_SET_EVENT_DATA); //解放されたイベントがあるかチェックして更新
                    MAP_SET_EVENT_DATA = null; //イベント状態を空にする。
                    MAP_COMM_EVENT_STEP = -1; //ステップを初期化
                  }
                }
              }
            }
          }
        }
        break;
        case "2": //会話(通常)
        {
          switch (MAP_COMM_EVENT_STEP) {
            case 1: //読み込み完了した場合
            G_MAP_COMM_SCENE_INIT();
            G_MAP_SET_COMM_DATA(0,MAP_SET_COMM_DATA,false,true);
            MAP_COMM_EVENT_STEP = 2;
              break;
            case 2: //初期化完了

              break;
            case 3: //シーン終了処理
            G_MAP_COMM_SCENE_END();
            MAP_IS_EVENT = false; //イベント状態をオフにする。
            MAP_COMM_SCENE_NUMBER = 0; //ページを初期化
            G_UPDATE_EVENT_INIT(MAP_EVENT_DATAS,MAP_SET_EVENT_DATA); //解放されたイベントされたがあるかチェックして更新
            MAP_SET_EVENT_DATA = null; //イベント状態を空にする。
            MAP_COMM_EVENT_STEP = -1; //ステップを初期化
              break;
            default:

          }
        }
        break;
        case "8": //ドアイベント
        {
          //移動のため、マスクアニメが開始された場合
          if(MAP_MASK_ANIM_SWITCH != -1){ //マスクアニメーションが実行中の場合
            if(MAP_ANIM_MASK_SPRITE != null){
              if(MAP_MASK_ANIM_SWITCH == 0){ //加色
                if(MAP_ANIM_MASK_SPRITE.alpha < 1){
                  MAP_ANIM_MASK_SPRITE.alpha += 0.025;
                }
                else{
                  MAP_ANIM_MASK_SPRITE.alpha = 1;
                  MAP_MASK_ANIM_SWITCH = 1; //減色にスイッチ
                  //マップ移動処理
                  var setMovePosition = new Array();
                  setMovePosition['start_pos_x'] = MAP_SET_DOOR_DATA['door_master_data']['move_map_pos_x'];
                  setMovePosition['start_pos_y'] = MAP_SET_DOOR_DATA['door_master_data']['move_map_pos_y'];
                  G_MAP_SET_MAP_POS(setMovePosition);
                  //移動後の自キャラの位置を確定
                  // if(MAP_MY_AVATAR['avatar_reflect'] == true){
                  //   MAP_MY_AVATAR['avatar_reflect'] = false;
                  //   MAP_MY_AVATAR.scaleX *= -1;
                  // }
                  switch (parseInt(MAP_SET_DOOR_DATA['door_master_data']['move_direction'])) {
                    case 1: //下
                    MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['bottom'].x;
                    MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['bottom'].y;
                    MAP_MY_AVATAR.avatarControle("walk_front",1);
                    break;
                    case 2: //左
                    MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['right'].x;
                    MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['right'].y;
                    MAP_MY_AVATAR.avatarControle("equip_left",1);
                    break;
                    case 3: //上
                    MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['top'].x;
                    MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['top'].y;
                    MAP_MY_AVATAR.avatarControle("walk_back",1);
                    break;
                    case 4: //右
                    MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['left'].x;
                    MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['left'].y;
                    MAP_MY_AVATAR.avatarControle("equip_right",1);
                    break;
                    default:
                    break;
                  }
                  G_DELETE_CHARACTER_INFO(); //マップ移動のため、キャラクター情報を削除
                }
              }
              else if(MAP_MASK_ANIM_SWITCH == 1){
                if(0 < MAP_ANIM_MASK_SPRITE.alpha){
                  MAP_ANIM_MASK_SPRITE.alpha -= 0.025;
                }
                else{
                  MAP_ANIM_MASK_SPRITE.alpha = 0;
                  MAP_MASK_ANIM_SWITCH = -1; //停止にスイッチ
                  //ドアイベント終了処理
                  MAP_DOOR_EVENT_STEP = 5;
                }
              }
            }
          }
        }
        break;
        default:
        break;
      }
    }

    //アイテム獲得処理
    if(MAP_SET_DROP_ITEM_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_DROP_ITEM_EVENT_STEP) {
        case 0: //読み込み開始中
        {
          MAP_DROP_ITEM_EVENT_STEP = 1;//読み込み完了に変更
          var dropItemText = "";
          for (var i = 0; i < MAP_SET_DROP_ITEM_DATA.length; i++) {
            var addDropItemText = "・" + MAP_SET_DROP_ITEM_DATA[i]['drop_item_name'] + " × " + MAP_SET_DROP_ITEM_DATA[i]['drop_val'] + "\n";
            dropItemText = dropItemText + addDropItemText;
          }
          G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"以下のアイテムを入手しました",dropItemText,2,"dropItemWindow");
        }
        break;
        case 1: //表示中
        {
          if(WINDOW_NORMAL == null){ //ダイアログを閉じた
            //イベントを終了する。
            MAP_DROP_ITEM_EVENT_STEP = -1;
            MAP_IS_EVENT = false;
            MAP_SET_EVENT_DATA = null;
            MAP_SET_DROP_ITEM_DATA = null;
          }
        }
        break;
        default:
        break;
      }
    }

    //ショップイベント処理
    if(MAP_SET_SHOP_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_SHOP_EVENT_STEP) {
        case 0: //読み込み開始
        {
          MAP_SHOP_EVENT_STEP = 1; //読み込み完了に変更
        }
        break;
        case 1: //　読み込み完了 → 会話データを表示
        {
          G_MAP_COMM_SCENE_INIT();
          G_MAP_SET_COMM_DATA(0,MAP_SET_SHOP_DATA['shop_comm_result'],false,true);
          MAP_SHOP_EVENT_STEP = 2; //表示完了に変更
        }
        break;
        case 2: //会話表示中
        {

        }
        break;
        case 3: //会話表示終了 → ショップ表示
        {
          G_MAP_COMM_SCENE_END();
          G_MAP_MAP_UI_VISIBLE(false,1); //通常のUIを非表示
          MAP_SHOP_COMM_SCENE_NUMBER = 0;
          MAP_SHOP_SELL_ITEMS = null;
          //商品アイテム配列を更新
          MAP_SHOP_SELL_ITEMS = G_MAP_REPLACE_SHOP_SELL_ITEM_DATAS(MAP_SET_SHOP_DATA);
          MAP_SHOP_WINDOW = G_MAP_SHOP_WINDOW_CREATE(MAP_SHOP_WINDOW);
          G_MAP_SHOP_WINDOW_UPDATE(MAP_SET_SHOP_DATA,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW,0);
          G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,0); //選択中の商品アイテムを更新
          MAP_SHOP_EVENT_STEP = 4;
        }
        break;
        case 4: //ショップ表示中
        {
          G_MAP_SHOP_SELECT_ANIM_UPDATE(MAP_SHOP_SELECT_ITEM_INDEX,MAP_SHOP_WINDOW);
        }
        break;
        case 5: //ショップ終了処理
        {
          MAP_SHOP_SELECT_WINDOW.visible = false; //ショップセレクトウィンドウ非表示
          MAP_SHOP_PLAYER_ITEM_TEXT.visible = false; //プレイヤーの所持金を非表示
          if(MAP_SHOP_WINDOW != null){ //ショップウィンドウ削除
            MAP_SHOP_WINDOW.remove();
            MAP_SHOP_WINDOW = null;
          }
          if(MAP_CHARACTER_INFO_TEXT != null){ //テキストを初期化
            MAP_CHARACTER_INFO_TEXT.text = "";
          }
          //商品イメージをを削除
          if(MAP_SHOP_INFO_WINDOW_ITEM_IMAGE != null){
            MAP_SHOP_INFO_WINDOW_ITEM_IMAGE.remove();
          }
          G_MAP_MAP_UI_VISIBLE(false,0); //UIを非表示
          G_MAP_MAP_UI_VISIBLE(true,0); //UIを表示
          MAP_SHOP_EVENT_STEP = 6;
        }
        break;
        case 6: //ショップイベント終了
        {
          MAP_SHOP_WINDOW_PAGE_NUM = 0;
          MAP_SHOP_SELL_ITEMS = null;
          MAP_SHOP_SELECT_SELL_ITEM = null;
          MAP_SET_SHOP_DATA = null;
          MAP_IS_EVENT = false;
          MAP_SHOP_EVENT_STEP = -1;
          G_UPDATE_SELECT_CHARACTER(false); //オブジェクトを更新
        }
        break;
        default:
        break;
      }
    }

    //戦闘イベント処理
    if(MAP_SET_BATTLE_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_BATTLE_EVENT_STEP) {
        case 0: //通信開始
        {
          G_MAP_SET_BATTLE_INSTANCE(MAP_SET_BATTLE_DATA,MAP_RESULT_MAP_MASTER_DATA); //バトルインスタンスの情報をシーン共通の変数に代入する。
          MAP_BATTLE_EVENT_STEP = 1; //バトルシーン切り替え演出を開始
        }
        case 1: //シーン切り替え演出を開始
        {
          G_CREATE_TRANS_SCREEN_ANIM(MAP_WINDOW_NODE,0);
          MAP_BATTLE_EVENT_STEP = 2; //バトルシーン切り替え演出を開始
        }
        break;
        case 2: //アニメ再生中
        {
          var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(0);
          if(transAnimFlag == false){ //アニメ再生が完了した場合
            MAP_BATTLE_EVENT_STEP = 3; //バトルシーン切り替え演出を開始
          }
        }
        break;
        case 3: //
        {
          SCENE_MANAGER['prev_scene'] = "map";
          if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
          this.exit("battle"); //バトルシーンへ
          // var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(1);
          // if(transAnimFlag == false){ //アニメ再生が完了した場合
          //   MAP_BATTLE_EVENT_STEP = 4; //バトルシーン切り替え演出を開始
          // }
        }
        break;
        case 4: //
        {

        }
        break;
        default:
        break;
      }
    }

    //クエストボードイベント処理
    if(MAP_SET_QUEST_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_QUEST_BOARD_EVENT_STEP) {
        case 0: //通信開始
        {
          MAP_QUEST_BOARD_EVENT_STEP = 1; //読み込み完了
        }
        case 1: //クエストボード表示処理
        {
          MAP_QUEST_ORDER_START_EVENT_DATA = null; //受注後に発生するイベントデータを初期化
          MAP_QUEST_REPORT_END_EVENT_DATA = null; //クリア後に発生するイベントデータを初期化
          G_MAP_CREATE_QUEST_BOARD(MAP_SET_QUEST_DATA); //クエストボードを表示
          MAP_QUEST_BOARD_EVENT_STEP = 2; //表示完了
        }
        break;
        case 2: //クエストボード操作中
        {
          if(WINDOW_LIST == null){ //クエストボードが閉じられた
            MAP_QUEST_BOARD_EVENT_STEP = 3; //閉じる
          }
          //クエストクリア演出アニメーションが発生したか
          if(MAP_QUEST_CLEAR_ANIM_OBJ != null){
            if(isset(MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']) && isset(MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now']) && isset(MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['max_frame_count'])){
              MAP_QUEST_CLEAR_ANIM_FRAME_COUNT += PHINA_APP.deltaTime;
              if(MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now'] < MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['max_frame_count']){
                if(50 < MAP_QUEST_CLEAR_ANIM_FRAME_COUNT){ //(1秒 = 1000)
                  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now'] = MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now'] + 1;
                  MAP_QUEST_CLEAR_ANIM_FRAME_COUNT = 0;
                  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite'].setFrameIndex(MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now']);
                }
              }
              else{ //アニメーション終了
                MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite'].remove();
                MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite'] = null;
                MAP_QUEST_CLEAR_ANIM_OBJ.remove();
                MAP_QUEST_CLEAR_ANIM_OBJ = null;
                MAP_IS_ANIMATION  = false;
                MAP_QUEST_CLEAR_ANIM_FRAME_COUNT = 0;
                if(isset(MAP_PLAYER_QUEST_CLEAR_RESULT_DATA['drop_item_data'])){
                  //報酬リストを開く
                  G_MAP_CREATE_QUEST_REWARD_LIST(MAP_MAP_SCENE_UI_LAYER,MAP_PLAYER_QUEST_CLEAR_RESULT_DATA['drop_item_data']);
                  MAP_QUEST_BOARD_EVENT_STEP = 4; //クエスト報酬画面を開く
                }
                else{
                  MAP_QUEST_BOARD_EVENT_STEP = 3; //閉じる
                }
              }
            }
          }
        }
        break;
        case 3: //クエストイベント終了
        {
          MAP_SET_QUEST_DATA = null;
          MAP_IS_EVENT = false;
          MAP_QUEST_BOARD_EVENT_STEP = -1;
        }
        break;
        case 4: //クエスト報酬画面表示中
        {
          //リストが閉じられた
          if(WINDOW_LIST == null){
            //クリア後に発生するイベントが無い場合
            if(MAP_QUEST_REPORT_END_EVENT_DATA == null){
              MAP_QUEST_BOARD_EVENT_STEP = 1; //クエストボード表示に戻す
            }
            else{ //クリア後のイベントを開始
              G_UI_WINDOW_LIST_DELETE(); //リストを削除(クエストボードを削除)
              //クエストイベントを終了
              MAP_SET_QUEST_DATA = null;
              MAP_IS_EVENT = false;
              MAP_QUEST_BOARD_EVENT_STEP = -1;
              G_MAP_EVENT_TRIGGER_EXE(MAP_QUEST_REPORT_END_EVENT_DATA,null); //イベントを開始
            }
          }
        }
        break;
        default:
        break;
      }
    }

    //パーティボードイベント処理
    if(MAP_SET_PARTY_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_PARTY_BOARD_EVENT_STEP) {
        case 0: //通信開始
        {
          if(isset(MAP_SET_PARTY_DATA['error'])){
            if(MAP_SET_PARTY_DATA['error'] == 0){
              MAP_PARTY_BOARD_EVENT_STEP = 1; //読み込み完了
            }
            else{ //エラー発生
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","■エラー内容\n" + MAP_SET_PARTY_DATA['error_comment'],2,"partyBoardErrorWindow");
              MAP_PARTY_BOARD_EVENT_STEP = 2; //イベントを終了
            }
          }
        }
        break;
        case 1: //パーティシーンに移動
        {
          SCENE_MANAGER['prev_scene'] = "map";
          if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
          this.exit("party");
        }
        break;
        case 2: //パーティボードイベント終了
        {
          MAP_SET_PARTY_DATA = null;
          MAP_IS_EVENT = false;
          MAP_PARTY_BOARD_EVENT_STEP = -1;
        }
        break;
        default:
        break;
      }
    }

    //ドアイベント処理
    if(MAP_SET_DOOR_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_DOOR_EVENT_STEP) {
        case 0: //通信開始
        {
          if(isset(MAP_SET_DOOR_DATA['error'])){
            if(MAP_SET_DOOR_DATA['error'] == 0){
              //必要な情報が入っているか
              if(isset(MAP_SET_DOOR_DATA['door_master_data']['open_item_type']) && isset(MAP_SET_DOOR_DATA['door_master_data']['open_item_id'])){
                //施錠されていないドアの場合
                if(MAP_SET_DOOR_DATA['door_master_data']['open_item_type'] == 0 && MAP_SET_DOOR_DATA['door_master_data']['open_item_id'] == 0){
                  MAP_DOOR_EVENT_STEP = 1; //読み込み完了
                }
                else{ //施錠されている場合
                  if(isset(MAP_SET_DOOR_DATA['lock_open']) && MAP_SET_DOOR_DATA['lock_open'] == true){
                    MAP_DOOR_EVENT_STEP = 3; //解錠ダイアログ確認まち
                    G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"鍵がかかっています","アイテムを使用して解錠できます。\nアイテムを使用しますか？",1,"doorUnLockWindow");
                  }
                  else{ //解錠不可ダイアログ表示
                    G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"鍵がかかっています","解錠に必要なアイテムを所持していません。",2,"doorLockWindow");
                    MAP_DOOR_EVENT_STEP = 5;
                  }
                }
              }
            }
            else{ //エラー発生
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","■エラー内容\n" + MAP_SET_DOOR_DATA['error_comment'],2,"doorEventErrorWindow");
              MAP_DOOR_EVENT_STEP = 5; //イベントを終了
            }
          }
        }
        break;
        case 1: //マップ移動演出開始
        {
          MAP_MASK_ANIM_SWITCH = 0; //マスクアニメーション開始
          MAP_DOOR_EVENT_STEP = 2;
        }
        break;
        case 2: //切り替え演出終了待ち
        {

        }
        break;
        case 3: //解錠確認ダイアログを表示
        {

        }
        break;
        case 5: //ドアイベント終了処理
        {
          MAP_SET_DOOR_DATA = null;
          MAP_IS_EVENT = false;
          MAP_DOOR_EVENT_STEP = -1;
          G_MAP_CHECK_MAP_EVENT_TRIGGER(MAP_PLAYER_MAP_POS,MAP_EVENT_DATAS); //移動したため、移動後に発生するイベントがあればチェック
        }
        break;
        default:
        break;
      }
    }

    //モニュメントイベント
    if(MAP_SET_MONUMENT_DATA != null && MAP_IS_EVENT == true){
      switch (MAP_MONUMENT_EVENT_STEP) {
        case 0: //通信結果取得
        {
          if(isset(MAP_SET_MONUMENT_DATA['error'])){
            if(MAP_SET_MONUMENT_DATA['error'] == 0){
              //必要な情報が入っているか
              if(isset(MAP_SET_MONUMENT_DATA['monument_master_data']) && isset(MAP_SET_MONUMENT_DATA['player_attribute'])){
                console.log("取得成功");
                console.log(MAP_SET_MONUMENT_DATA['monument_master_data']);
                console.log(MAP_SET_MONUMENT_DATA['player_attribute']);
                G_MAP_CREATE_MONUMENT_WINDOW(MAP_WINDOW_NODE,MAP_SET_MONUMENT_DATA['player_attribute'],MAP_SET_MONUMENT_DATA['monument_master_data']); //モニュメントウィンドウを表示
                MAP_MONUMENT_EVENT_STEP = 1;
              }
            }
            else{ //エラー発生
              G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"エラー","■エラー内容\n" + MAP_SET_MONUMENT_DATA['error_comment'],2,"monumentEventErrorWindow");
              MAP_MONUMENT_EVENT_STEP = 5; //イベントを終了
            }
          }
        }
        break;
        case 1: //UI表示中
        {

        }
        break;
        case 5: //イベント終了
        {
          MAP_SET_EVENT_DATA = null;
          MAP_SET_MONUMENT_DATA = null;
          MAP_IS_EVENT = false;
          MAP_MONUMENT_EVENT_STEP = -1;
        }
        break;
        default:
        break;
      }
    }

    //プレイヤールームイベント
    //
    //
    if(MAP_SET_EVENT_DATA != null && MAP_SET_EVENT_DATA['trigger_event_type'] == 9 && MAP_IS_EVENT == true){
      switch (MAP_PLAYER_ROOM_EVENT_STEP) {
        case 0: //読み込み開始
        if(MAP_MY_AVATAR != null && MAP_MY_AVATAR['avatar_move'] == false){
          if(MAP_CONTROLE_AVATAR != null) MAP_CONTROLE_AVATAR.remove(); //操作用アバターを初期化
          G_MAP_CREATE_CONTROLE_AVATAR(MAP_MAP_LAYER_CHARA,MAP_MY_AVATAR,MAP_SEARCH_HIT_BOX.x + MAP_MY_AVATAR.x,(MAP_SEARCH_HIT_BOX.y + MAP_MY_AVATAR.y) +  64,MAP_PLAYER_MASTER['player_name'],MAP_MY_AVATAR['active_avatar_name']); //操作用キャラクターを生成
          MAP_MY_AVATAR.visible = false; //MAP遷移用のアバターを非表示に
          MAP_CONTROLE_AVATAR['collision_box'] = new Array();
          G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CONTROLE_AVATAR,MAP_CONTROLE_AVATAR.x,MAP_CONTROLE_AVATAR.y); //あたり判定用BOXを生成
          G_MAP_CHANGE_CONTROLE_BUTTON(MAP_CONTROLE_BUTTON,1); //コントロールボタンの変更
          //通信結果 移動処理の停止確認
          MAP_PLAYER_ROOM_EVENT_STEP = 1;
        }
        break;
        case 1:{
          MAP_SET_PLAYER_ROOM_DATA = null;
          G_MAP_LOAD_PLAYER_ROOM_EVENT(MAP_SET_EVENT_DATA);
          MAP_PLAYER_ROOM_EVENT_STEP = 2;
        }
        break;
        case 2:
        if(MAP_SET_PLAYER_ROOM_DATA != null){
          ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID = MAP_SET_PLAYER_ROOM_DATA['map_event_trigger']['trigger_id']; //プレイヤールームをアクティブな状態にする
          MAP_CONTROLE_AVATAR.visible = true;
          MAP_MY_AVATAR.visible = false;
          //追加で読み込まれたアバターをアバター配列に追加。
          var addAvatarDatas = MAP_SET_PLAYER_ROOM_DATA['map_add_avatar_datas'];
          for (var i = 0; i < addAvatarDatas.length; i++) {
            G_MAP_ADD_AVATAR_DATAS(addAvatarDatas[i]);
          }
          //チャットログを取得
          MAP_PLAYER_ROOM_CHAT_LOGS = new Array();
          MAP_PLAYER_ROOM_CHAT_LOGS = MAP_SET_PLAYER_ROOM_DATA['player_room_chat_logs'];
          //プレイヤールームの初期化を実行
          G_MAP_PLAYER_ROOM_INIT(MAP_SET_PLAYER_ROOM_DATA,MAP_AVATAR_DATAS,MAP_PLAYER_INFO['player_index_id']);
          //プレイヤールーム情報のインスタンスを設定
          MAP_ACTIVE_PLAYER_ROOM_INSTANCE = MAP_SET_PLAYER_ROOM_DATA; //進行中のインスタンスを設定
          MAP_PLAYER_ROOM_INSTANCE_ARRAY[MAP_PLAYER_ROOM_INSTANCE_ARRAY.length] = MAP_SET_PLAYER_ROOM_DATA;
          MAP_SET_PLAYER_ROOM_DATA = null;
          MAP_IS_EVENT = false;
          MAP_PLAYER_ROOM_EVENT_STEP = -1;
          MAP_SET_EVENT_DATA = null; //イベント状態を空にする。
        }
        break;
        default:
        break;
      }
    }

    if(MAP_COMMAND_TRIGGER_NUM != -1){ //コマンドボタンを押した時
      G_MAP_ACTION_COMMAND(MAP_COMMAND_TRIGGER_NUM,MAP_SELECT_ANIM_OBJECT,MAP_EVENT_DATAS);//コマンドを実行
      MAP_COMMAND_TRIGGER_NUM = -1;
    }
    if(MAP_SHOP_COMMAND_TRIGGER_NUM != -1){ //ショップのコマンドボタンを押した時
      G_MAP_SHOP_ACTION_COMMAND(MAP_SHOP_COMMAND_TRIGGER_NUM,MAP_SHOP_SELECT_SELL_ITEM);//ショップコマンドを実行
      MAP_SHOP_COMMAND_TRIGGER_NUM = -1;
    }

    if(MAP_RESULT_PURCHASE_ITEM != null){ //購入結果が存在した場合
      G_DELETE_LOADING_MASK(); //読み込み用マスクを削除
      if(isset(MAP_RESULT_PURCHASE_ITEM['purchase_result'])){
        if(MAP_RESULT_PURCHASE_ITEM['purchase_result'] == 0){ //正常に購入出来た場合。
          G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"ショップ","購入しました",2,"shopPurchaseResult");
        }
        else{ //購入エラーの場合
          if(isset(MAP_RESULT_PURCHASE_ITEM['error_comment'])){
            G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"ショップ",MAP_RESULT_PURCHASE_ITEM['error_comment'],2,"shopPurchaseResult");
          }
          else{
            G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"ショップ","購入に失敗しました",2,"shopPurchaseResult");
          }
        }
      }
      if(isset(MAP_RESULT_PURCHASE_ITEM['result_player_item_data'])){ //購入後の通貨の更新
        for(var mr = 0; mr < MAP_RESULT_PURCHASE_ITEM['result_player_item_data'].length; mr++){
          if(MAP_RESULT_PURCHASE_ITEM['result_player_item_data'][mr]['item_id'] == MAP_SHOP_PLAYER_ITEM_ID){ //通貨IDが一致した場合
            if(MAP_SHOP_PLAYER_ITEM_TEXT != null){
              var resultAfterItem = MAP_RESULT_PURCHASE_ITEM['result_player_item_data'][mr]['item_val']; //変更後の通貨を決定
              MAP_SHOP_PLAYER_ITEM_TEXT.text = resultAfterItem;
              for(var mr2 = 0; mr2 < MAP_PLAYER_ITEM_DATA.length; mr2++){
                if(MAP_SHOP_PLAYER_ITEM_ID == MAP_PLAYER_ITEM_DATA[mr2]['item_id']){ //通貨IDが一致した場合
                  MAP_PLAYER_ITEM_DATA[mr2]['item_val'] = resultAfterItem; //通貨データを更新
                }
              }
            }
            break;
          }
        }
      }
      MAP_RESULT_PURCHASE_ITEM = null;
    }

    if(WINDOW_RETURN_VAL != null){ //ウィンドウに返り値があった場合
      if(isset(WINDOW_RETURN_VAL['sellItemWindow'])){
        if(WINDOW_RETURN_VAL['sellItemWindow'] == "yes"){ //購入決定
          // var postParamVal = new Object();
          // postParamVal['player_story_continue_result'] = 1;
          // postParamVal['player_continue_story_id'] = STORY_SELECT_MAIN_STORY_ID;
          // ajaxStart("post","json","../../client/story/story.php",postParamVal); //非同期通信開始
          var sellItemMasterId = -1; //購入するアイテムのマスターID
          if(MAP_SHOP_SELECT_SELL_ITEM != null){
            switch (MAP_SHOP_SELECT_SELL_ITEM['sell_item_type']) {
              case "cardItem":
                sellItemMasterId = MAP_SHOP_SELECT_SELL_ITEM['card_master_id'];
                break;
              case "equipItem":
                sellItemMasterId = MAP_SHOP_SELECT_SELL_ITEM['equip_item_master_id'];
                break;
              case "itemItem":
                sellItemMasterId = MAP_SHOP_SELECT_SELL_ITEM['item_master_id'];
                break;
              default:
                break;
            }
          }
          G_MAP_PLAYER_PURCHASE_ITEM(MAP_SET_EVENT_DATA,MAP_SELECT_ANIM_OBJECT,MAP_SHOP_SELECT_SELL_ITEM['sell_item_type'],sellItemMasterId);
        }
        if(WINDOW_RETURN_VAL['sellItemWindow'] == "no"){ //購入キャンセル

        }
      }
      if(WINDOW_RETURN_VAL['shopPurchaseResult'] == "ok"){ //購入完了のウィンドウを閉じた
        G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,MAP_SHOP_SELECT_ITEM_INDEX); //選択中の商品アイテムを更新
      }
      if(WINDOW_RETURN_VAL['questOrderWindow'] == "yes"){ //クエストの受注を確定した。
        if(MAP_PLAYER_SELECT_ORDER_QUEST_ID != -1){
          var questOrderPostParam = new Object();
          questOrderPostParam['set_player_order_quest_id'] = MAP_PLAYER_SELECT_ORDER_QUEST_ID; //選択中の受注クエストIDを設定
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/map/map.php",questOrderPostParam); //非同期通信開始
          MAP_PLAYER_SELECT_ORDER_QUEST_ID = -1;
        }
      }
      if(WINDOW_RETURN_VAL['resultQuestOrderWindow'] == "ok"){ //受注結果ウィンドウを閉じた
        if(MAP_QUEST_ORDER_START_EVENT_DATA == null){ //受注後に発生するイベントが無かった場合
          G_MAP_UPDATE_QUEST_BOARD(MAP_SET_QUEST_DATA); //クエストボードを更新
        }
        else{ //受注後にイベント発生
          G_UI_WINDOW_LIST_DELETE(); //リストを削除(クエストボードを削除)
          //クエストイベントを終了
          MAP_SET_QUEST_DATA = null;
          MAP_IS_EVENT = false;
          MAP_QUEST_BOARD_EVENT_STEP = -1;
          G_MAP_EVENT_TRIGGER_EXE(MAP_QUEST_ORDER_START_EVENT_DATA,null); //イベントを開始
        }
      }
      if(WINDOW_RETURN_VAL['doorUnLockWindow'] == "yes"){ //ドアを解錠した
        var doorOpenPostParam = new Object();
        doorOpenPostParam['set_door_open_param'] = new Object();
        doorOpenPostParam['set_door_open_param']['open_item_id'] = MAP_SET_DOOR_DATA['door_master_data']['open_item_id'];
        doorOpenPostParam['set_door_open_param']['open_item_type'] = MAP_SET_DOOR_DATA['door_master_data']['open_item_type'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",doorOpenPostParam); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['doorUnLockWindow'] == "no"){ //ドアを解錠しなかった
        if(MAP_SET_DOOR_DATA != null && MAP_IS_EVENT == true) MAP_DOOR_EVENT_STEP = 5; //ドアイベント終了
      }
      if(WINDOW_RETURN_VAL['resultDoorOpenWindow'] == "ok"){ //ドアの解錠に成功した
        if(MAP_SET_DOOR_DATA != null && MAP_IS_EVENT == true) MAP_DOOR_EVENT_STEP = 1; //マップ移動開始
      }
      if(WINDOW_RETURN_VAL['itemListMonumentWindow'] == "yes" && isset(ITEM_LIST_SELECT_ITEM['item_id']) && isset(ITEM_LIST_SELECT_ITEM['select_item_num'])){ //モニュメントで使用するアイテムを選択した
        var setMonumentItem = new Object();
        setMonumentItem['set_monument_select_item_id'] = ITEM_LIST_SELECT_ITEM['item_id'];
        setMonumentItem['set_monument_select_item_num'] = ITEM_LIST_SELECT_ITEM['select_item_num'];
        setMonumentItem['set_monument_select_item_attribute_id'] = MAP_SET_MONUMENT_DATA['monument_master_data']['attribute_category_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",setMonumentItem); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['resultMonumentSelectItemWindowSuccess'] == "ok"){ //モニュメントアイテム使用結果が正常終了した
        //アイテムリストを再表示
        G_ITEM_LIST_DELETE(); //アイテムリストを削除
        G_ITEM_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_ITEM_DATA,"itemListMonumentWindow"); //アイテムリストを再生成
      }
      if(WINDOW_RETURN_VAL['cardListMonumentWindow'] == "yes" && isset(CARD_LIST_SELECT_CARD['card_master_id']) && isset(CARD_LIST_SELECT_CARD['select_card_num'])){ //モニュメントで使用するカードを選択した
        var setMonumentCard = new Object();
        setMonumentCard['set_monument_select_card_id'] = CARD_LIST_SELECT_CARD['card_master_id'];
        setMonumentCard['set_monument_select_card_num'] = CARD_LIST_SELECT_CARD['select_card_num'];
        setMonumentCard['set_monument_select_card_attribute_id'] = MAP_SET_MONUMENT_DATA['monument_master_data']['attribute_category_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",setMonumentCard); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['resultMonumentSelectCardWindowSuccess'] == "ok"){ //モニュメントアイテム使用結果が正常終了した
        //アイテムリストを再表示
        G_CARD_LIST_DELETE(); //アイテムリストを削除
        G_CARD_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_CARD_DATA,"cardListMonumentWindow"); //カードリストを再生成
      }
      if(WINDOW_RETURN_VAL['equipItemListMonumentWindow'] == "yes" && isset(EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM['equip_item_master_id']) && isset(EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM['select_equip_item_num'])){ //モニュメントで使用する装備品を選択した
        var setMonumentEquipItem = new Object();
        setMonumentEquipItem['set_monument_select_equip_item_id'] = EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM['equip_item_master_id'];
        setMonumentEquipItem['set_monument_select_equip_item_num'] = EQUIP_ITEM_LIST_SELECT_EQUIP_ITEM['select_equip_item_num'];
        setMonumentEquipItem['set_monument_select_equip_item_attribute_id'] = MAP_SET_MONUMENT_DATA['monument_master_data']['attribute_category_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",setMonumentEquipItem); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['resultMonumentSelectEquipItemWindowSuccess'] == "ok"){ //モニュメントアイテム使用結果が正常終了した
        //アイテムリストを再表示
        G_EQUIP_ITEM_LIST_DELETE(); //アイテムリストを削除
        G_EQUIP_ITEM_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_EQUIP_ITEM_DATA,"equipItemListMonumentWindow"); //カードリストを再生成
      }
      if(WINDOW_RETURN_VAL['duelApplicationWindow'] == "yes" && isset(MAP_SELECT_ANIM_OBJECT['player_avatar'])){ //決闘の申請を行った
        var setDuelApplication = new Object();
        setDuelApplication['set_duel_application_player_index_id'] = MAP_SELECT_ANIM_OBJECT['player_avatar']['avatar_anim']['player_info']['player_index_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",setDuelApplication); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['checkPlayerKillExecuteWindow'] == "yes" && isset(MAP_SELECT_ANIM_OBJECT['player_avatar'])){ //プレイヤーの殺害を行った
        var setPlayerKillExecute = new Object();
        setPlayerKillExecute['set_player_kill_execute'] = new Object();
        setPlayerKillExecute['set_player_kill_execute']['kill_player_index_id'] = MAP_SELECT_ANIM_OBJECT['player_avatar']['avatar_anim']['player_info']['player_index_id'];
        setPlayerKillExecute['set_player_kill_execute']['area_id'] = MAP_AREA_INSTANCE['area_id'];
        NETWORK_IS_CONNECTING = true;
        ajaxStart("post","json","../../client/map/map.php",setPlayerKillExecute); //非同期通信開始
      }
      if(WINDOW_RETURN_VAL['mapSceneErrorWindow']){ //エラーウィンドウを閉じた
        SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
        MAP_SCENE_OBJ.exit("myPage"); //マイページに戻る
      }
      WINDOW_RETURN_VAL = null;
    }
    //チャット表示待機中だった場合
    if(MAP_CHAT_WINDOW_STANBY == true && MAP_IS_EVENT == false){
      MAP_CHAT_WINDOW_STANBY =false;
      G_CHAT_CREATE_CHAT_WINDOW(MAP_WINDOW_NODE,MAP_CHAT_WINDOW_NODE,1,ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID,MAP_GILD_HOME_GILD_ID); //チャットウィンドウを生成
    }
    //プレイヤールームが有効な場合
    if(ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID != -1){
      if(MAP_IS_CONTROLE_BTN_MODE == 0) G_MAP_CHANGE_CONTROLE_BUTTON(MAP_CONTROLE_BUTTON,1); //コントロールボタンの変更
      MAP_PLAYER_ROOM_UPDATE_COUNT += PHINA_APP.deltaTime;
      if(5000 < MAP_PLAYER_ROOM_UPDATE_COUNT){ //5秒経過後に更新
        MAP_PLAYER_ROOM_UPDATE_COUNT = 0;
        G_MAP_PLAYER_ROOM_UPDATE(MAP_ACTIVE_PLAYER_ROOM_INSTANCE); //プレイヤールーム更新処理
      }
      if(MAP_MAP_LAYER_CHARA != null){
        MAP_MAP_LAYER_CHARA.children.sort(function(a,b){
          if(a.position.y < b.position.y) return -1;
          if(a.position.y > b.position.y) return 1;
          return 0;
        });
      }
      //チャットのテキストが入力された
      if(MAP_QUICK_CHAT_WINDOW_INPUT_TEXT != "" && MAP_QUICK_CHAT_WINDOW_INPUT_TEXT != null){
        if(String(MAP_QUICK_CHAT_WINDOW_INPUT_TEXT).length < 31){
          MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID = -1;
          var commPostParamVal = new Object();
          commPostParamVal['set_quick_chat_text'] = MAP_QUICK_CHAT_WINDOW_INPUT_TEXT; //イベントタイプを設定
          //ギルドルームの場合はギルドチャット
          if(MAP_GILD_HOME_GILD_ID != -1){
            commPostParamVal['set_quick_chat_guild_room_guild_id'] = MAP_GILD_HOME_GILD_ID;
          }
          else{ //通常はプレイヤールームのチャット送信
            commPostParamVal['set_quick_chat_player_room_event_trigger_id'] = ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID; //イベントのターゲットを設定
          }
          NETWORK_IS_CONNECTING = true;
          ajaxStart("post","json","../../client/map/map.php",commPostParamVal); //非同期通信開始
          MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = "";
        }
        else{ //文字数オーバー
          G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"テキスト入力エラー","文字数制限を超えました",0,"inputQuickChatMessageErrorWIndow");
          MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = "";
        }
      }
    }
    else{
      if(MAP_IS_CONTROLE_BTN_MODE != 0) G_MAP_CHANGE_CONTROLE_BUTTON(MAP_CONTROLE_BUTTON,0); //コントロールボタンの変更
    }

    //操作アバターの位置更新判定処理
    if(MAP_CONTROLE_AVATAR_POSITION_RELOAD == true){
      if(MAP_MY_AVATAR != null && MAP_MY_AVATAR['avatar_move'] == false){
        MAP_CONTROLE_AVATAR_POSITION_RELOAD = false;
        MAP_CONTROLE_AVATAR.visible = true;
        MAP_CONTROLE_AVATAR.x = MAP_SEARCH_HIT_BOX.x + MAP_MY_AVATAR.x;
        MAP_CONTROLE_AVATAR.y = (MAP_SEARCH_HIT_BOX.y + MAP_MY_AVATAR.y) +  64;
        MAP_MY_AVATAR.visible = false; //MAP遷移用のアバターを非表示に
        // if(MAP_MY_AVATAR['avatar_reflect'] == true && MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] == false){
        //   MAP_CONTROLE_AVATAR['avatar_anim'].scaleX *= -1;
        //   MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].scaleX *= -1;
        //   MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].scaleX *= -1;
        // }
        // if(MAP_MY_AVATAR['avatar_reflect'] == false && MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] == true){
        //   MAP_CONTROLE_AVATAR['avatar_anim'].scaleX *= -1;
        //   MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].scaleX *= -1;
        //   MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].scaleX *= -1;
        // }
        MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] = MAP_MY_AVATAR['avatar_reflect'];
      }
    }

    //特殊な条件でイベント状態管理
    if(MAP_OPEN_PLAYER_PROFILE == true && WINDOW_PLAYER_PROFILE == null){ //プレイヤープロフィールが閉じられたか
      MAP_IS_EVENT = false;
      MAP_OPEN_PLAYER_PROFILE = false;
    }

    //戦闘開始の場合は戦闘シーン遷移アニメーションを再生
    if(MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP != -1) G_MAP_CHANGE_PVP_BATTLE_SCENE_ANIM_STEP(MAP_SCENE_OBJ,MAP_WINDOW_NODE,MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP);
  },
});

function G_MAP_LOAD_MAP(mapData,mapMasterData){ //マップを読み込み、表示する
  var collisionChip = Sprite('ASSET_110');
  var chipSizeHeight = collisionChip.height; //チップの高さを取得
  var chipSizeWidth = collisionChip.width; //チップの横幅を取得
  var mapChipCount = 0;
  var mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
  var mapChipPosY = 0 - (MAP_MAP_SCENE_MAP_LAYER.height * 7.5);
  var mapLayers = mapData['mapLayers'];
  var mapTsxInfos = mapData['map_tsx_infos'];
  var charaStartIndex = -1;
  //マップ情報取得
  for(var mt = 0; mt < mapTsxInfos.length; mt++){
    if(mapTsxInfos[mt]['tsx_name'] == "character.tsx"){//キャラクターマップ情報だった場合
      charaStartIndex = mapTsxInfos[mt]['tsx_start_gid']; //キャラクターの開始インデックスを取得
    }
  }
  //地面マップ生成
  for(var i = 0; i < mapLayers.length; i++){
    if(mapLayers[i]['layerName'] == "layer_ground"){ //レイヤー名が地面の時
      var mapGroundData = mapLayers[i]['mapData'];
      for(var groundIndex = 0; groundIndex < mapGroundData.length; groundIndex++){
        MAP_GROUND_CHIP_ARRAY[groundIndex] = mapGroundData[groundIndex]; //マップ番号を保存
        if(mapGroundData[groundIndex] != 0){ //空マップではない場合
          var mapChip = Sprite('ASSET_' + mapMasterData['asset_id'],64,64).addChildTo(MAP_MAP_LAYER_GROUND);
          mapChip.setFrameIndex((mapGroundData[groundIndex] - 1));
          mapChip.x = mapChipPosX;
          mapChip.y = mapChipPosY;
        }
        if(mapChipCount < 109){
          mapChipPosX = mapChipPosX + chipSizeWidth;
        }
        else{
          mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
          mapChipPosY = mapChipPosY + chipSizeHeight;
          mapChipCount = -1;
        }
        mapChipCount = mapChipCount + 1;
      }
    }
    if(mapLayers[i]['layerName'] == "layer_object"){ //レイヤー名がオブジェクトの時
      mapChipCount = 0;
      mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
      mapChipPosY = 0 - (MAP_MAP_SCENE_MAP_LAYER.height * 7.5);
      var mapObjectData = mapLayers[i]['mapData'];
      for(var objectIndex = 0; objectIndex < mapObjectData.length; objectIndex++){
        if(mapObjectData[objectIndex] != 0){ //空マップではない場合
          var mapChip = Sprite('ASSET_' + mapMasterData['asset_id'],64,64).addChildTo(MAP_MAP_LAYER_OBJECT);
          mapChip.setFrameIndex((mapObjectData[objectIndex] - 1));
          mapChip.x = mapChipPosX;
          mapChip.y = mapChipPosY;
        }
        if(mapChipCount < 109){
          mapChipPosX = mapChipPosX + chipSizeWidth;
        }
        else{
          mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
          mapChipPosY = mapChipPosY + chipSizeHeight;
          mapChipCount = -1;
        }
        mapChipCount = mapChipCount + 1;
      }
    }
    if(mapLayers[i]['layerName'] == "layer_collision"){ //レイヤー名が当たり判定の時
      mapChipCount = 0;
      mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
      mapChipPosY = 0 - (MAP_MAP_SCENE_MAP_LAYER.height * 7.5);
      var mapCollisionData = mapLayers[i]['mapData'];
      for(var collisionIndex = 0; collisionIndex < mapCollisionData.length; collisionIndex++){
        if(mapCollisionData[collisionIndex] != 0){ //空マップではない場合
          var collisionBox = Shape({
            backgroundColor: 'white',
            width: 64,
            height: 64,
          }).addChildTo(MAP_MAP_LAYER_COLLISION);
          collisionBox.x = mapChipPosX;
          collisionBox.y = mapChipPosY;
          collisionBox.visible = false;
          MAP_COLLISION_BOXS[MAP_COLLISION_BOXS.length] = collisionBox;
        }
        if(mapChipCount < 109){
          mapChipPosX = mapChipPosX + chipSizeWidth;
        }
        else{
          mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
          mapChipPosY = mapChipPosY + chipSizeHeight;
          mapChipCount = -1;
        }
        mapChipCount = mapChipCount + 1;
      }
    }
    if(mapLayers[i]['layerName'] == "layer_character" && charaStartIndex != -1){ //マップに配置されたキャラクター情報
      mapChipCount = 0;
      mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
      mapChipPosY = 0 - (MAP_MAP_SCENE_MAP_LAYER.height * 7.5);
      var mapCharaData = mapLayers[i]['mapData'];
      for(var charaIndex = 0; charaIndex < mapObjectData.length; charaIndex++){
        if(mapCharaData[charaIndex] != 0){ //空マップではない場合
          var chipIndex = (mapCharaData[charaIndex] - charaStartIndex);

          G_CREATE_CHARA_ANIM_OBJ(chipIndex,mapChipPosX,mapChipPosY,charaIndex); //アニメーションオブジェクトを生成
          // var mapChip = Sprite('ASSET_' + CHARA_CHIP_SHEET_ASSET_ID,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
          // mapChip.setFrameIndex(chipIndex);
          // mapChip.x = mapChipPosX;
          // mapChip.y = mapChipPosY;
        }
        if(mapChipCount < 109){
          mapChipPosX = mapChipPosX + chipSizeWidth;
        }
        else{
          mapChipPosX = 0 - (MAP_MAP_SCENE_MAP_LAYER.width / 2);
          mapChipPosY = mapChipPosY + chipSizeHeight;
          mapChipCount = -1;
        }
        mapChipCount = mapChipCount + 1;
      }
    }
  }
  //プレイヤーアバター生成
  var playerAvatarData = new Array();
  var playerEquipItemDatas = new Array();
  var avatarAnimRunMasterData = null;
  var playerIndexId = MAP_PLAYER_INFO['player_index_id'];
  for (var i = 0; i < MAP_AVATAR_DATAS.length; i++) {
    if(MAP_AVATAR_DATAS[i]['player_avatar_data']['player_index_id'] == playerIndexId){
      playerAvatarData = MAP_AVATAR_DATAS[i]['player_avatar_data'];
      playerEquipItemDatas = MAP_AVATAR_DATAS[i]['player_equip_item_datas'];
      break;
    }
  }
  if(playerAvatarData != null){
    console.log("アバターある");
    console.log(playerAvatarData);
    MAP_MY_AVATAR = G_AVATAR_SPRITE_DISP(playerAvatarData,playerEquipItemDatas,0.2);
    MAP_MY_AVATAR.addChildTo(MAP_MAP_SCENE_MY_AVATAR_LAYER);
    MAP_MY_AVATAR.avatarControle("walk_back",1);
    MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['bottom'].x;
    MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['bottom'].y;
    MAP_MY_AVATAR['avatar_reflect'] = false;
    MAP_MY_AVATAR['avatar_move'] = false;
  }
  G_MAP_CHECK_PLAYER_MAP_CHARACTER(MAP_CHARA_ANIM_OBJECTS,MAP_PLAYER_MAP_CHARACTER_DATAS); //プレイヤーのマップキャラ情報をチェック
  MAP_LOAD_COMPLETE = true; //マップのロード完了
}

//マップを動かす
function G_MAP_MOVE(direction){
  G_DELETE_CHARACTER_INFO(); //マップ移動のため、キャラクター情報を削除
  var mapPosX = MAP_MAP_SCENE_MAP_LAYER.x;
  var mapPosY = MAP_MAP_SCENE_MAP_LAYER.y;
  if(MAP_MAP_ANIM_DIRECTION == -1 && NETWORK_IS_CONNECTING == false){
    if(G_MAP_MOVE_COLLISION(direction) == true){ //移動可能かの判定
      var playerKarmaRank = G_HELPER_GET_PLAYER_KARMA_RANK(MAP_PLAYER_INFO['player_karma']);
      G_MAP_CHECK_ENEMY_ENCOUNT(MAP_AREA_INSTANCE,MAP_NOW_ENEMY_POWER_CONDITION,playerKarmaRank); //敵とのエンカウントが発生したか
      MAP_MAP_ANIM_DIRECTION = direction;
      switch (direction) {
        case 1:
        {
          MAP_NEXT_POS = (MAP_MAP_SCENE_MAP_LAYER.y + (64 * 11));
        }
        break;
        case 2:
        {
          MAP_NEXT_POS = (MAP_MAP_SCENE_MAP_LAYER.x - (64 * 11));
        }
        break;
        case 3:
        {
          MAP_NEXT_POS = (MAP_MAP_SCENE_MAP_LAYER.y - (64 * 11));
        }
        break;
        case 4:
        {
          MAP_NEXT_POS = (MAP_MAP_SCENE_MAP_LAYER.x + (64 * 11));
        }
        break;
        default:
        break;
      }
    }
  }
}

//マップの位置をセットする。(瞬間移動)
function G_MAP_SET_MAP_POS(mapMasterData){
  if(isset(mapMasterData['start_pos_x']) && isset(mapMasterData['start_pos_y'])){
    MAP_MAP_SCENE_MAP_LAYER.x = 0;
    MAP_MAP_SCENE_MAP_LAYER.y = 0;
    MAP_PLAYER_MAP_POS['pos_x'] = mapMasterData['start_pos_x'];
    MAP_PLAYER_MAP_POS['pos_y'] = mapMasterData['start_pos_y'];
    MAP_START_MAP_POS_X = 5 + (11 * (mapMasterData['start_pos_x'] - 1));
    if(MAP_START_MAP_POS_X <= 0){
      MAP_START_MAP_POS_X = 5;
    }
    MAP_START_MAP_POS_Y = 5 + (11 * (mapMasterData['start_pos_y'] - 1));
    if(MAP_START_MAP_POS_Y <= 0){
      MAP_START_MAP_POS_Y = 5;
    }
    var moveX = (64 * 11);
    var resultMoveX = moveX * (mapMasterData['start_pos_x'] - 1);
    if(1 <= (mapMasterData['start_pos_x'] -1)){
      MAP_MAP_SCENE_MAP_LAYER.x = MAP_MAP_SCENE_MAP_LAYER.x - resultMoveX;
    }
    var moveY = (64 * 11);
    var resultMoveY = moveY * (mapMasterData['start_pos_y'] - 1);
    if(1 <= (mapMasterData['start_pos_y'] - 1)){
      MAP_MAP_SCENE_MAP_LAYER.y = MAP_MAP_SCENE_MAP_LAYER.y - resultMoveY;
    }
  }
}

function G_MAP_MOVE_COLLISION(direction){ //マップ移動が可能なエリアかの判定 返り値 bool
  result = false;
  var tmpPosX = MAP_START_MAP_POS_X;
  var tmpPosY = MAP_START_MAP_POS_Y;
  switch (direction) {
    case 1:
    {
      tmpPosY = MAP_START_MAP_POS_Y - 11;
    }
    break;
    case 2:
    {
      tmpPosX = MAP_START_MAP_POS_X + 11;
    }
    break;
    case 3:
    {
      tmpPosY = MAP_START_MAP_POS_Y + 11;
    }
    break;
    case 4:
    {
      tmpPosX = MAP_START_MAP_POS_X - 11;
    }
    break;
    default:
  }
  if(G_MAP_POS_IS_ACTIVE(tmpPosX,tmpPosY) == true){
    MAP_START_MAP_POS_X = tmpPosX;
    MAP_START_MAP_POS_Y = tmpPosY;
    result = true;
  }
  return result;
}

function G_MAP_POS_IS_ACTIVE(posX,posY){ //指定の位置が有効かチェックを行う 返り値 bool
  var result = false;
  var mapChipArray = (posY * 110) + posX;
  if(isset(MAP_GROUND_CHIP_ARRAY[mapChipArray])){
    if(MAP_GROUND_CHIP_ARRAY[mapChipArray] != 0){
      result = true;
    }
  }
  return result;
}

function G_CREATE_CHARA_ANIM_OBJ(chipIndex,posX,posY,mapCharaIndex){ //アニメーションオブジェクトを生成
  //敵情報からヒットする項目が存在するか検索
  for(var e = 0; e < MAP_ENEMY_MASTER_DATAS.length; e++){
    if(MAP_ENEMY_MASTER_DATAS[e]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_ENEMY_MASTER_DATAS[e]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = MAP_ENEMY_MASTER_DATAS[e]['enemy_name'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_ENEMY_MASTER_DATAS[e]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_ENEMY_MASTER_DATAS[e]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_ENEMY_MASTER_DATAS[e]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_ENEMY_MASTER_DATAS[e]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }

  //NPC情報からヒットする項目が存在するか検索
  for(var n = 0; n < MAP_NPC_MASTER_DATAS.length; n++){
    if(MAP_NPC_MASTER_DATAS[n]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_NPC_MASTER_DATAS[n]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = MAP_NPC_MASTER_DATAS[n]['npc_name'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_NPC_MASTER_DATAS[n]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_NPC_MASTER_DATAS[n]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_NPC_MASTER_DATAS[n]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_NPC_MASTER_DATAS[n]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }

  //店情報からヒットする項目が存在するか検索
  for(var b = 0; b < MAP_SHOP_MASTER_DATAS.length; b++){
    if(MAP_SHOP_MASTER_DATAS[b]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_SHOP_MASTER_DATAS[b]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = MAP_SHOP_MASTER_DATAS[b]['shop_name'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_SHOP_MASTER_DATAS[b]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_SHOP_MASTER_DATAS[b]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_SHOP_MASTER_DATAS[b]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_SHOP_MASTER_DATAS[b]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }

  //アイテム情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_DROP_ITEM_MASTER_DATAS.length; d++){
    if(MAP_DROP_ITEM_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_DROP_ITEM_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = MAP_DROP_ITEM_MASTER_DATAS[d]['drop_item_name'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_DROP_ITEM_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_DROP_ITEM_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_DROP_ITEM_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_DROP_ITEM_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }

  //クエストボード情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_QUEST_BOARD_MASTER_DATAS.length; d++){
    if(MAP_QUEST_BOARD_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_QUEST_BOARD_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = "クエストボード";
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_QUEST_BOARD_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_QUEST_BOARD_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_QUEST_BOARD_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_QUEST_BOARD_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }

  //パティボード情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_PARTY_BOARD_MASTER_DATAS.length; d++){
    if(MAP_PARTY_BOARD_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_PARTY_BOARD_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = "パーティボード";
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_PARTY_BOARD_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_PARTY_BOARD_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_PARTY_BOARD_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_PARTY_BOARD_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }
  //ドア情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_DOOR_MASTER_DATAS.length; d++){
    if(MAP_DOOR_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_DOOR_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] = "入り口";
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_DOOR_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_DOOR_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_DOOR_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_DOOR_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }
  //モニュメント情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_MONUMENT_MASTER_DATAS.length; d++){
    if(MAP_MONUMENT_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_MONUMENT_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] =  MAP_MONUMENT_MASTER_DATAS[d]['monument_name'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_MONUMENT_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_MONUMENT_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_MONUMENT_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_MONUMENT_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }
  //ギルドボード情報からヒットする項目が存在するか検索
  for(var d = 0; d < MAP_GUILD_BOARD_MASTER_DATAS.length; d++){
    if(MAP_GUILD_BOARD_MASTER_DATAS[d]['chip_index'] == chipIndex){
      var idx = MAP_CHARA_ANIM_OBJECTS.length;
      var assetId = MAP_GUILD_BOARD_MASTER_DATAS[d]['character_chip_asset_id'];
      MAP_CHARA_ANIM_OBJECTS[idx] = Sprite('ASSET_' + assetId,64,64).addChildTo(MAP_MAP_LAYER_CHARA);
      MAP_CHARA_ANIM_OBJECTS[idx].setFrameIndex(0);//初期の向き
      MAP_CHARA_ANIM_OBJECTS[idx].x = posX;
      MAP_CHARA_ANIM_OBJECTS[idx].y = posY;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_id'] = idx;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_array_index'] = mapCharaIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_map_chip_index'] = chipIndex;
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info'] = new Array();
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_name'] =  "ギルドボード";
      MAP_CHARA_ANIM_OBJECTS[idx]['object_info']['object_type'] = MAP_GUILD_BOARD_MASTER_DATAS[d]['character_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['object_actions'] = MAP_GUILD_BOARD_MASTER_DATAS[d]['actions'];
      MAP_CHARA_ANIM_OBJECTS[idx]['moveInfo'] = MAP_GUILD_BOARD_MASTER_DATAS[d]['character_move_type'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_move_speed'] = MAP_GUILD_BOARD_MASTER_DATAS[d]['character_move_speed'];
      MAP_CHARA_ANIM_OBJECTS[idx]['character_chip_asset_id'] = assetId;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionX'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['directionY'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['chip_index'] = 0;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_anim'] = null;
      MAP_CHARA_ANIM_OBJECTS[idx]['collision_box'] = new Array();
      G_CREATE_ANIM_OBJECT_COLLISION_BOX(MAP_CHARA_ANIM_OBJECTS[idx],posX,posY); //当たり判定用のボックスを生成
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'] = Button({
        text: '',
        width: 64,         // 横サイズ
        height: 64,        // 縦サイズ
      }).addChildTo(MAP_CHARA_ANIM_OBJECTS[idx]);
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].visible = false;
      MAP_CHARA_ANIM_OBJECTS[idx]['target_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_IS_EVENT == false && WINDOW_NORMAL == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_OPEN_OBJECT_DIALOG(MAP_CHARA_ANIM_OBJECTS[idx],MAP_CHARA_ANIM_OBJECTS);
        }
      };
    }
  }
}

function G_MAP_CHARA_ANIM_SET_DIRECTION(animObjects){ //アニメーションオブジェクトの進行方向を決定
  for(var i = 0; i < animObjects.length; i++){
    if(isset(animObjects[i])){
      if(isset(animObjects[i]['moveInfo']) && isset(animObjects[i]['character_chip_asset_id'])){ //インスタンスチェック
        //行動パターンチェック
        movePosArray = new Array();
        movePosArray = G_MAP_CHARA_MOVE_TYPE_EXE(animObjects[i]['moveInfo']);
        //進行方向を更新
        animObjects[i]['directionX'] = movePosArray['moveX'];
        animObjects[i]['directionY'] = movePosArray['moveY'];
      }
    }
  }
}

function G_MAP_CHARA_MOVE_TYPE_EXE(moveType){ //行動パターンから移動先を返す 返し値:x,yの配列
  var resultMovePos = new Array();
  var moveX = 0;
  var moveY = 0;
  switch (moveType) {
    case "0": //不動
    moveX = 0;
    moveY = 0;
    break;
    case "1":
    moveX = Math.floor(Math.random() * 3);
    moveY = Math.floor(Math.random() * 3);
    moveX = moveX - 1;
    moveY = moveY - 1;
    break;
    case "2":
    moveX = Math.floor(Math.random() * 3);
    moveY = Math.floor(Math.random() * 3);
    moveX = moveX - 1;
    moveY = moveY - 1;
    break;
    default:
    break;
  }
  resultMovePos['moveX'] = moveX;
  resultMovePos['moveY'] = moveY;
  return resultMovePos;
}

function G_MAP_CHARA_MOVE_EXE(animObjects,animFlame){ //マップ上のキャラクターのアニメ実行
  for(var i = 0; i < animObjects.length; i++){
    if(isset(animObjects[i])){
      var moveX = animObjects[i]['directionX'];
      var moveY = animObjects[i]['directionY'];
      G_MAP_CHARA_CHIP_DIRECTION_CHANGE(animObjects[i],animObjects,animFlame,moveX,moveY);
      //ターゲットマーカー処理
      if(animObjects[i]['target_anim'] != null && isset(animObjects[i]['target_anim']['frame_index'])){
        if(MAP_ANIM_TARGET_FLAME_CHANGE_TIME < MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL){
          if(animObjects[i]['target_anim']['frame_index'] < 9){
            animObjects[i]['target_anim']['frame_index'] = animObjects[i]['target_anim']['frame_index'] + 1; //フレームを加算
          }
          else{
            animObjects[i]['target_anim']['frame_index'] = 0;
          }
          MAP_ANIM_TARGET_FLAME_CHANGE_TIME_VAL = 0;
          animObjects[i]['target_anim'].setFrameIndex(animObjects[i]['target_anim']['frame_index']);
        }
      }
    }
  }
}

function G_MAP_CHARA_CHIP_DIRECTION_CHANGE(animObject,animObjects,animFlame,directionX,directionY){ //進行方向によってキャラチップのインデックスを変更する。
  var collisionResult = G_MAP_COLLISION_CHECK(animObject,MAP_COLLISION_BOXS);
  var collisionResultObj = G_MAP_OBJECT_COLLISION_CHECK(animObject,animObjects);
  if(collisionResult['checkTop'] == false || collisionResultObj['checkTop'] == false){
    if(directionY == -1){
      directionY = 0;
    }
  }
  if(collisionResult['checkLeft'] == false || collisionResultObj['checkLeft'] == false){
    if(directionX == -1){
      directionX = 0;
    }
  }
  if(collisionResult['checkBottom'] == false || collisionResultObj['checkBottom'] == false){
    if(directionY == 1){
      directionY = 0;
    }
  }
  if(collisionResult['checkRight'] == false || collisionResultObj['checkRight'] == false){
    if(directionX == 1){
      directionX = 0;
    }
  }

  var getChipIndex = animObject['chip_index'];
  var resultChipIndex = 0;
  if(directionX == 0 && directionY == 0){ //止まっている場合
    resultChipIndex = getChipIndex;
  }
  else if(directionX == 1 && directionY == 0){
    if(6 <= getChipIndex && getChipIndex <= 8){
      resultChipIndex = getChipIndex;
    }
    else{
      resultChipIndex = 6;
    }
  }
  else if(directionX == 0 && directionY == 1){
    if(0 <= getChipIndex && getChipIndex <= 2){
      resultChipIndex = getChipIndex;
    }
    else{
      resultChipIndex = 0;
    }
  }
  else if(directionX == -1 && directionY == 0){
    if(3 <= getChipIndex && getChipIndex <= 5){
      resultChipIndex = getChipIndex;
    }
    else{
      resultChipIndex = 3;
    }
  }
  else if(directionX == 0 && directionY == -1){
    if(9 <= getChipIndex && getChipIndex <= 11){
      resultChipIndex = getChipIndex;
    }
    else{
      resultChipIndex = 9;
    }
  }
  else{
    if(directionY == 1){
      if(0 <= getChipIndex && getChipIndex <= 2){
        resultChipIndex = getChipIndex;
      }
      else{
        resultChipIndex = 0;
      }
    }
    else{
      if(9 <= getChipIndex && getChipIndex <= 11){
        resultChipIndex = getChipIndex;
      }
      else{
        resultChipIndex = 9;
      }
    }
  }


  if(MAP_ANIM_CHIP_FLAME_CHANGE_TIME < animFlame){ //チップインデックスの変更判定だった場合
    //フレームインデックスのセット
    if(0 <= getChipIndex && getChipIndex <= 2){
      if(getChipIndex == 2){
        resultChipIndex = 0;
      }
      else{
        resultChipIndex = getChipIndex = getChipIndex + 1;
      }
    }
    else if(3 <= getChipIndex && getChipIndex <= 5){
      if(getChipIndex == 5){
        resultChipIndex = 3;
      }
      else{
        resultChipIndex = getChipIndex = getChipIndex + 1;
      }
    }
    else if(6 <= getChipIndex && getChipIndex <= 8){
      if(getChipIndex == 8){
        resultChipIndex = 6;
      }
      else{
        resultChipIndex = getChipIndex = getChipIndex + 1;
      }
    }
    else if(9 <= getChipIndex && getChipIndex <= 11){
      if(getChipIndex == 11){
        resultChipIndex = 9;
      }
      else{
        resultChipIndex = getChipIndex = getChipIndex + 1;
      }
    }
  }
  animObject['chip_index'] = resultChipIndex;
  animObject.setFrameIndex(resultChipIndex);//初期の向き

  var reusltMoveX = (animObject['character_move_speed'] * directionX);
  var reusltMoveY = (animObject['character_move_speed'] * directionY);
  animObject.moveBy(reusltMoveX, reusltMoveY);
}

function G_CREATE_ANIM_OBJECT_COLLISION_BOX(animObject,posX,posY){ //当たり判定用のボックスをアニメーションオブジェクト用に生成
  animObject['collision_box']['top'] = Shape({
      backgroundColor: 'blue',
      width: 64,
      height: 64,
    }).addChildTo(animObject);
    animObject['collision_box']['top'].y = animObject['collision_box']['top'].y - 16;
    animObject['collision_box']['top'].visible = false;

  animObject['collision_box']['right'] = Shape({
      backgroundColor: 'blue',
      width: 64,
      height: 64,
    }).addChildTo(animObject);
    animObject['collision_box']['right'].x = animObject['collision_box']['right'].x + 16;
    animObject['collision_box']['right'].visible = false;

  animObject['collision_box']['bottom'] = Shape({
      backgroundColor: 'blue',
      width: 64,
      height: 64,
    }).addChildTo(animObject);
    animObject['collision_box']['bottom'].y = animObject['collision_box']['bottom'].y + 16;
    animObject['collision_box']['bottom'].visible = false;

  animObject['collision_box']['left'] = Shape({
      backgroundColor: 'blue',
      width: 64,
      height: 64,
    }).addChildTo(animObject);
    animObject['collision_box']['left'].x = animObject['collision_box']['left'].x - 16;
    animObject['collision_box']['left'].visible = false;

  animObject['collision_box']['center'] = Shape({
      backgroundColor: 'black',
      width: 64,
      height: 64,
    }).addChildTo(animObject);
    animObject['collision_box']['center'].visible = false;
}

function G_MAP_COLLISION_CHECK(animObject,collisionBoxs){ //マップの当たり判定チェックを行う
  var checkResult = new Array();
  checkResult['checkTop'] = true;
  checkResult['checkLeft'] = true;
  checkResult['checkBottom'] = true;
  checkResult['checkRight'] = true;
  for(var b = 0; b < collisionBoxs.length; b++){
    var rectAnimObj = null;
    var rectCollisionBox = null;

    rectCollisionBox = Rect(MAP_MAP_LAYER_COLLISION.x + collisionBoxs[b].x, MAP_MAP_LAYER_COLLISION.y + collisionBoxs[b].y,
    collisionBoxs[b].width, collisionBoxs[b].height);
    //console.log(animObject);
    //console.log(animObject.x);
    //console.log(animObject['collision_box']['top'].x);
    rectAnimObj = Rect(animObject.x + animObject['collision_box']['top'].x, animObject.y + animObject['collision_box']['top'].y,
    animObject['collision_box']['top'].width, animObject['collision_box']['top'].height);
    if(Collision.testRectRect(rectCollisionBox, rectAnimObj)){
      checkResult['checkTop'] = false;
    }

    rectAnimObj = Rect(animObject.x + animObject['collision_box']['left'].x, animObject.y + animObject['collision_box']['left'].y,
    animObject['collision_box']['left'].width, animObject['collision_box']['left'].height);
    if(Collision.testRectRect(rectCollisionBox, rectAnimObj)){
      checkResult['checkLeft'] = false;
    }

    rectAnimObj = Rect(animObject.x + animObject['collision_box']['bottom'].x, animObject.y + animObject['collision_box']['bottom'].y,
    animObject['collision_box']['bottom'].width, animObject['collision_box']['bottom'].height);
    if(Collision.testRectRect(rectCollisionBox, rectAnimObj)){
      checkResult['checkBottom'] = false;
    }

    rectAnimObj = Rect(animObject.x + animObject['collision_box']['right'].x, animObject.y + animObject['collision_box']['right'].y,
    animObject['collision_box']['right'].width, animObject['collision_box']['right'].height);
    if(Collision.testRectRect(rectCollisionBox, rectAnimObj)){
      checkResult['checkRight'] = false;
    }
  }
  return checkResult;
}

function G_MAP_OBJECT_COLLISION_CHECK(animObject,animObjects){ //オブジェクト同士の当たり判定をチェックする。
  var checkResult = new Array();
  checkResult['checkTop'] = true;
  checkResult['checkLeft'] = true;
  checkResult['checkBottom'] = true;
  checkResult['checkRight'] = true;
  for(var i = 0; i < animObjects.length; i++){
    if(isset(animObjects[i])){
      if(animObjects[i]['object_id'] != animObject['object_id']){ //自分自身との判定は除く
        var rectAnimObj = null;
        var rectCollisionAnimObjCenter = null;
        rectCollisionAnimObjCenter = Rect(animObjects[i].x + animObjects[i]['collision_box']['center'].x, animObjects[i].y + animObjects[i]['collision_box']['center'].y,
        animObjects[i]['collision_box']['center'].width, animObjects[i]['collision_box']['center'].height);

        rectAnimObj = Rect(animObject.x + animObject['collision_box']['top'].x, animObject.y + animObject['collision_box']['top'].y,
        animObject['collision_box']['top'].width, animObject['collision_box']['top'].height);
        if(Collision.testRectRect(rectCollisionAnimObjCenter, rectAnimObj)){
          checkResult['checkTop'] = false;
        }

        rectAnimObj = Rect(animObject.x + animObject['collision_box']['left'].x, animObject.y + animObject['collision_box']['left'].y,
        animObject['collision_box']['left'].width, animObject['collision_box']['left'].height);
        if(Collision.testRectRect(rectCollisionAnimObjCenter, rectAnimObj)){
          checkResult['checkLeft'] = false;
        }

        rectAnimObj = Rect(animObject.x + animObject['collision_box']['bottom'].x, animObject.y + animObject['collision_box']['bottom'].y,
        animObject['collision_box']['bottom'].width, animObject['collision_box']['bottom'].height);
        if(Collision.testRectRect(rectCollisionAnimObjCenter, rectAnimObj)){
          checkResult['checkBottom'] = false;
        }

        rectAnimObj = Rect(animObject.x + animObject['collision_box']['right'].x, animObject.y + animObject['collision_box']['right'].y,
        animObject['collision_box']['right'].width, animObject['collision_box']['right'].height);
        if(Collision.testRectRect(rectCollisionAnimObjCenter, rectAnimObj)){
          checkResult['checkRight'] = false;
        }
      }
    }
  }
  return checkResult;
}

function G_MAP_OPEN_OBJECT_DIALOG(animObject,animObjects){ //アニメーションオブジェウト情報のダイアログを開く
  var searchAnimObjects = G_MAP_SEARCH_ANIMOBJECT(animObjects);
  var searchCheck = false;

  for(var i = 0; i < searchAnimObjects.length; i++){
    if(isset(searchAnimObjects[i])){
      if(searchAnimObjects[i]['object_id'] == animObject['object_id']){ //画面内に居るキャラクターか
        searchCheck = true;
        break;
      }
    }
  }

  if(searchCheck == true){
    var playerAvatarObjects = null;
    if(MAP_ACTIVE_PLAYER_ROOM_INSTANCE != null && isset(MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'])) playerAvatarObjects = MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'];
    G_MAP_CREATE_TARGET_ANIM(animObject,animObjects,playerAvatarObjects); //ターゲットマーカーを生成
    G_MAP_CREATE_CHARACTER_IMAGE(animObject); //キャラクターウィンドウに表示するアニメーションするを表示
    G_MAP_CREATE_CHARACTER_INFO(animObject); //キャラクター情報を生成
    G_MAP_COMMAND_BUTTON_UPDATE(MAP_PLAYER_INFO,animObject,MAP_COMMAND_BUTTON_ARRAY); //コマンドボタンを更新
    MAP_SELECT_ANIM_OBJECT = animObject;//選択中のオブジェクトを更新
  }
}

function G_MAP_CREATE_TARGET_ANIM(animObject,animObjects,playerAvatarObjects){ //指定のアニメーションオブジェクトにターゲットマーカーのアニメーションを生成
  console.log("配列");
  if(playerAvatarObjects != null){
    console.log("オブジェクト発見");
    console.log(playerAvatarObjects);
  }
  console.log(animObjects);
  for(var i = 0; i < animObjects.length; i++){
    if(isset(animObjects[i])){
      if(animObjects[i]['target_anim'] != null){ //他にターゲットがあれば削除処理を実行
        animObjects[i]['target_anim'].remove();
        animObjects[i]['target_anim'] = null;
      }
    }
  }
  if(playerAvatarObjects != null){
    for (var i = 0; i < playerAvatarObjects.length; i++) {
      playerAvatarObjects[i]['avatar_anim']['target_anim'].visible = false;
    }
  }
  if(animObject != null && !isset(animObject['player_avatar'])){
    if(animObject['target_anim'] == null){ //空の時のみ生成
      animObject['target_anim'] = Sprite('ASSET_118',64,64).addChildTo(animObject);
      animObject['target_anim'].setFrameIndex(0);
      animObject['target_anim']['frame_index'] = 0;
    }
  }
  else if(animObject != null && isset(animObject['player_avatar'])){ //他プレイヤーのアバターの場合
    animObject['player_avatar']['avatar_anim']['target_anim'].visible = true;
  }
}

function G_MAP_CREATE_CHARACTER_IMAGE(animObject){ //キャラクター情報に表示するキャラクターアニメーションを生成
  var createFlag = true; //新規にアニメーションの作成する必要があるか。
  if(animObject != null && !isset(animObject['player_avatar']) && MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE != null){
    if(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['character_chip_asset_id'] == animObject['character_chip_asset_id']){
      createFlag = false; //既に再生中のため、作成の必要なし。
    }
  }
  else if(animObject != null && isset(animObject['player_avatar']) && MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE != null && isset(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['player_avatar_hash'])){ //プレイヤーアバター
    console.log("プレイヤーアバターイメージ表示処理");
    if(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['player_avatar_hash'] == animObject['player_avatar']['avatar_anim']['player_avatar_data']['avatar_hash']){
      createFlag = false; //既に再生中のため、作成の必要なし。
    }
  }
  if(createFlag == true){ //新規アニメーション作成
    if(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE != null){
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.remove();
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = null;
    }
    if(animObject != null && !isset(animObject['player_avatar'])){
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = Sprite('ASSET_' + animObject['character_chip_asset_id'],64,64).addChildTo(MAP_CHARACTER_INFO_WINDOW);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y = MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y - (MAP_CHARACTER_INFO_WINDOW.height / 3.8);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.setFrameIndex(0);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.scaleX =  2.0;
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.scaleY =  2.0;
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['character_chip_asset_id'] =  animObject['character_chip_asset_id'];
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['frame_index'] = 0;
    }
    else if(animObject != null && isset(animObject['player_avatar'])){ //プレイヤーアバター表示
      //MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = G_AVATAR_ANIM_DISP(animObject['player_avatar']['avatar_anim']['avatar_master_data'],animObject['player_avatar']['avatar_anim']['avatar_anim_stay_data'],1);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE = G_AVATAR_SPRITE_DISP(animObject['player_avatar']['avatar_anim']['player_avatar_data'],animObject['player_avatar']['avatar_anim']['player_equip_item_datas'],0.2);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.addChildTo(MAP_CHARACTER_INFO_WINDOW);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y = MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y - 64;
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.avatarControle("equip_right",0);
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['player_avatar_hash'] = animObject['player_avatar']['avatar_anim']['player_avatar_data']['avatar_hash'];
      MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y = MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.y - (MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.height / 2);
    }
  }
}

function G_MAP_CREATE_CHARACTER_INFO(animObject){ //キャラクター情報を生成
  var objectName = "???";
  var objectLevel = "???";
  var objectCategory = "???";
  var objectAttribute = "???";
  var objectWp = "???";
  if(animObject != null && !isset(animObject['player_avatar'])){
    objectName = animObject['object_info']['object_name'];
    if(animObject['object_info']['object_type'] == 1){ //敵
      objectCategory = "敵";
    }
    else if(animObject['object_info']['object_type'] == 2){ //NPC
      objectCategory = "NPC";
    }
    else if(animObject['object_info']['object_type'] == 3){ //店
      objectCategory = "店";
    }
    else if(animObject['object_info']['object_type'] == 4){ //アイテム
      objectCategory = "アイテム";
    }
    else{
      objectCategory = "???";
    }
  }
  else if(animObject != null && isset(animObject['player_avatar'])){ //プレイヤーアバター
    console.log("プレイヤーアバターキャラクター情報を表示する");
    console.log(animObject['player_avatar']['avatar_anim']);
    objectName = animObject['player_avatar']['avatar_anim']['player_name_label'].text;
    objectLevel = animObject['player_avatar']['avatar_anim']['player_info']['player_level'];
    objectCategory = "プレイヤー";
    objectAttribute = "???";
    objectWp = "???";
  }
  else if(animObject == null){ //nullの場合は表示しない
    objectName = "";
    objectLevel = "";
    objectCategory = "";
    objectAttribute = "";
    objectWp = "";
  }
  MAP_CHARACTER_INFO_TEXT.text = "名称【" + objectName + "】\nLV：" + objectLevel + "\n種類：" + objectCategory + "\n属性：" + objectAttribute + "\n勝率：" + objectWp;
}

function G_MAP_SEARCH_ANIMOBJECT(animObjects){ //画面内にいるキャラクターを探す。
  var resultAnimObjects = new Array();
  var rectHitDraw = Rect((MAP_SEARCH_HIT_BOX.x - MAP_SEARCH_HIT_BOX.width / 2),(MAP_SEARCH_HIT_BOX.y - MAP_SEARCH_HIT_BOX.height / 2),MAP_SEARCH_HIT_BOX.width,MAP_SEARCH_HIT_BOX.height); //11マスだけど704じゃない639
  for(var i = 0; i < animObjects.length; i++){
    if(isset(animObjects[i])){
      var rectAnimObj = Rect(animObjects[i].x + animObjects[i]['collision_box']['center'].x, animObjects[i].y + animObjects[i]['collision_box']['center'].y,
      animObjects[i]['collision_box']['center'].width, animObjects[i]['collision_box']['center'].height);
      if(Collision.testRectRect(rectHitDraw,rectAnimObj)){
        var index = resultAnimObjects.length;
        resultAnimObjects[index] = animObjects[i];
      }
    }
  }
  //他プレイヤーがいるか探す
  if(ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID != -1 && MAP_ACTIVE_PLAYER_ROOM_INSTANCE != null && isset(MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'])){ //プレイヤールームが有効な場合
    var playerAvatarDatas = MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'];
    for (var i = 0; i < playerAvatarDatas.length; i++) {
      var index = resultAnimObjects.length;
      resultAnimObjects[index] = new Array();
      resultAnimObjects[index]['player_avatar'] = playerAvatarDatas[i]; //プレイヤーIDを挿入
    }
  }
  return resultAnimObjects;
}

function G_MAP_SELECT_OBJECT_TARGET_CHANGE(searchAnimObjects,selectIndex){ //選択するオブジェクトを変更する。 -1 : 選択無効
  var resultIndex = -1;
  if(searchAnimObjects.length != 0){ //選択できるオブジェクトが1つ以上あるか
    if(searchAnimObjects.length < (selectIndex + 2)){
      resultIndex = 0;
    }
    else{
      resultIndex = selectIndex + 1;
    }
  }
  return resultIndex;
}

function G_MAP_EVENT_INIT(mapEventDatas){ //マップイベントデータの初期化
  var resultEventMasterDatas = new Array();
  for(var i = 0; i < mapEventDatas.length; i++){
    if(mapEventDatas[i]['key_event_trigger_id'] == 0){
      mapEventDatas[i]['step'] = 0; //イベントの進行度を初期化
    }
    else{
      mapEventDatas[i]['step'] = -1; //条件付きイベントの進行度を初期化
    }
    resultEventMasterDatas[i] = mapEventDatas[i];
  }
  return resultEventMasterDatas;
}

function G_UPDATE_EVENT_INIT(mapEventDatas,selectEventData){ //マップイベントデータを更新 selectEventData : 現在進行中のイベント
  for(var i = 0; i < mapEventDatas.length; i++){
    if(mapEventDatas[i]['step'] == -1){ //解放されていないイベントの場合
      if(mapEventDatas[i]['key_event_trigger_id'] == selectEventData['trigger_id']){ //キーとIDが一致した場合、イベントを解放する。
        mapEventDatas[i]['step'] = 0;
      }
    }
  }
}

function G_MAP_CHECK_MAP_EVENT_TRIGGER(playerMapPos,mapEventDatas){ //マップのイベントが存在するかチェック
  var checkMapEvent = false;
  for(var i = 0; i < mapEventDatas.length; i++){
    //イベント発生箇所に居た場合
    if(mapEventDatas[i]['check_point_pos_x'] == playerMapPos['pos_x'] && mapEventDatas[i]['check_point_pos_y'] == playerMapPos['pos_y']){
      if(mapEventDatas[i]['step'] == 0){ //未発見のイベントの場合
        mapEventDatas[i]['step'] = 1;
        G_MAP_EVENT_TRIGGER_EXE(mapEventDatas[i],null);//イベントを実行
        checkMapEvent = true;
        break;
      }
    }
  }

  //イベント初期化済みのプレイヤールームに居るかチェック
  var checkPlayerRoom = false;
  for (var i = 0; i < MAP_PLAYER_ROOM_INSTANCE_ARRAY.length; i++) {
    var checkPointX = MAP_PLAYER_ROOM_INSTANCE_ARRAY[i]['map_event_trigger']['check_point_pos_x'];
    var checkPointY = MAP_PLAYER_ROOM_INSTANCE_ARRAY[i]['map_event_trigger']['check_point_pos_y'];
    if(playerMapPos['pos_x'] == checkPointX && playerMapPos['pos_y'] == checkPointY){ //プレイヤールームに居た
      var prevMapInstance = MAP_ACTIVE_PLAYER_ROOM_INSTANCE; //プレイヤールーム移動前に居たプレイヤールーム
      if(prevMapInstance != null){
        if(prevMapInstance['map_event_trigger']['trigger_id'] != MAP_PLAYER_ROOM_INSTANCE_ARRAY[i]['map_event_trigger']['trigger_id']) MAP_PLAYER_ROOM_CHANGE = true;
        else MAP_PLAYER_ROOM_CHANGE = false;
      }
      else MAP_PLAYER_ROOM_CHANGE = false;
      MAP_ACTIVE_PLAYER_ROOM_INSTANCE = MAP_PLAYER_ROOM_INSTANCE_ARRAY[i];
      checkPlayerRoom = true;
      break;
    }
  }
  if(checkPlayerRoom == true){ //プレイヤールームに居た
    ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID = MAP_ACTIVE_PLAYER_ROOM_INSTANCE['map_event_trigger']['trigger_id'];
    MAP_CONTROLE_AVATAR_POSITION_RELOAD = true; //操作用アバターの位置を更新
  }
  else{
    ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID = -1;
    if(MAP_CONTROLE_AVATAR != null) {
      MAP_CONTROLE_AVATAR.visible = false; //操作用のアバターを非表示に
    }

    MAP_MY_AVATAR.visible = true; //MAP遷移用のアバターを表示に
  }

  //プレイヤールームに居ない&イベントが発生していない。
  if(checkMapEvent == false && checkPlayerRoom == false){
    if(MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID != -1){ //エンカウントが発生した。
      PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
      PLAYER_BATTLE_INSTANCE = new Object();
      PLAYER_BATTLE_INSTANCE['battle_instance_id'] = MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID;
      MAP_RESULT_ENCOUNT_BATTLE_INSTANCE_ID = -1;
      MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = 0; //遷移アニメを開始
      //戦闘後の位置を更新
      PLAYER_BATTLE_INSTANCE['update_map_start_pos'] = new Object();
      PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x'];
      PLAYER_BATTLE_INSTANCE['update_map_start_pos']['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y'];
    }
  }
}

//会話イベントを読み込む
function G_MAP_LOAD_COMM_EVENT(setEventData){
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 1 || setEventData['trigger_event_type'] == 2){ //会話イベントだった場合
      var commPostParamVal = new Object();
      commPostParamVal['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      commPostParamVal['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",commPostParamVal); //非同期通信開始
    }
  }
}

//プレイヤールームイベントを読み込む
function G_MAP_LOAD_PLAYER_ROOM_EVENT(setEventData){
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 9){ //プレイヤールームイベントだった場合
      var playerRoomPostParam = new Object();
      playerRoomPostParam['check_point'] = new Object(); //プレイヤールーム位置検出用
      playerRoomPostParam['check_point']['check_point_pos_x'] = setEventData['check_point_pos_x'];
      playerRoomPostParam['check_point']['check_point_pos_y'] = setEventData['check_point_pos_y'];
      playerRoomPostParam['room_pos'] = new Object();
      playerRoomPostParam['room_pos']['room_pos_x'] = MAP_CONTROLE_AVATAR.x;
      playerRoomPostParam['room_pos']['room_pos_y'] = MAP_CONTROLE_AVATAR.y;
      playerRoomPostParam['map_event_master_id'] = setEventData['map_event_master_id'];
      playerRoomPostParam['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      playerRoomPostParam['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      playerRoomPostParam['check_avatar_datas'] = MAP_AVATAR_DATAS;
      if(MAP_GILD_HOME_GILD_ID != -1) playerRoomPostParam['player_room_is_guild_room'] = 0;
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",playerRoomPostParam); //非同期通信開始
    }
  }
}

function G_MAP_COMM_SCENE_INIT(){ //マップ会話シーンの初期化
  MAP_MESSAGE_WINDOW.visible = true; //メッセージUIを表示
  //以下、会話中は非表示にするUI
  G_MAP_MAP_UI_VISIBLE(false);
  MAP_COMM_SPEAK_CAHAR_NAME_TEXT.visible = true;
  MAP_COMM_MESSAGE_TEXT.visible = true;
}

function G_MAP_COMM_SCENE_END(){ //マップ会話シーンの終了処理
  MAP_MESSAGE_WINDOW.visible = false; //メッセージUIを表示
  //以下、会話中は非表示にするUI
  G_MAP_MAP_UI_VISIBLE(true);
  MAP_COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
  MAP_COMM_SPEAK_CAHAR_NAME_TEXT.visible = false;
  MAP_COMM_MESSAGE_TEXT.text = "";
  MAP_COMM_MESSAGE_TEXT.visible = false;
  if(MAP_COMM_CHARA_LEFT_SPRITE != null){
    MAP_COMM_CHARA_LEFT_SPRITE.remove();
  }
  if(MAP_COMM_CHARA_RIGHT_SPRITE != null){
    MAP_COMM_CHARA_RIGHT_SPRITE.remove();
  }
}

function G_MAP_SET_COMM_DATA(pageNumber,commData,imageOnly = false,textOnly = false){ //会話データをセットする。
  if(commData != null){
    if(isset(commData['sceneDatas'])){
      for(var i = 0; i < commData['sceneDatas'].length; i++){
        if(pageNumber == i){ //表示するページと一致した場合
          if(imageOnly == false){ //画像だけの表示か
            MAP_COMM_MESSAGE_TEXT.text = commData['sceneDatas'][i]['comment']; //テキストを表示
            if(isset(commData['charaDatas']) && isset(commData['sceneDatas'][i]['speakChara'])){
              for(var cd = 0; cd < commData['charaDatas'].length; cd++){
                if(commData['charaDatas'][cd]['id'] == commData['sceneDatas'][i]['speakChara']){
                  MAP_COMM_SPEAK_CAHAR_NAME_TEXT.text = commData['charaDatas'][cd]['name']; //キャラ名を表示
                }
              }
            }
            else{
              MAP_COMM_SPEAK_CAHAR_NAME_TEXT.text = "";
            }
          }
          var prevLeftCharaId = -1;
          var prevRightCharaId = -1;
          if(pageNumber != 0){
            prevLeftCharaId = commData['sceneDatas'][i - 1]['charaLId']; //前ページの背景ID
            prevRightCharaId = commData['sceneDatas'][i - 1]['charaRId']; //前ページの背景ID
          }
          var nowLeftCharaId = commData['sceneDatas'][i]['charaLId']; //今のページの背景ID
          var nowRightCharaId = commData['sceneDatas'][i]['charaRId']; //今のページの背景ID
          if(prevLeftCharaId != nowLeftCharaId){//前ページからキャラ画像が変わった場合、更新。
            if(isset(commData['charaDatas'])){
              if(textOnly == false){
                if(nowLeftCharaId != 0){//キャラが非表示ではない場合
                  var leftCharaAssetFullId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],nowLeftCharaId);
                  if(leftCharaAssetFullId != -1){
                    if(MAP_COMM_CHARA_LEFT_SPRITE != null){
                      MAP_COMM_CHARA_LEFT_SPRITE.remove();
                    }
                    MAP_COMM_CHARA_LEFT_SPRITE = Sprite('ASSET_' + leftCharaAssetFullId).addChildTo(MAP_COMM_SCENE_CHARA_LAYER);
                  }
                }
                else{
                  if(MAP_COMM_CHARA_LEFT_SPRITE){
                    MAP_COMM_CHARA_LEFT_SPRITE.remove();
                  }
                }
              }
              else{
                if(MAP_COMM_CHARA_LEFT_SPRITE != null){
                  MAP_COMM_CHARA_LEFT_SPRITE.remove();
                }
              }
            }
          }
          if(prevRightCharaId != nowRightCharaId){//前ページからキャラ画像が変わった場合、更新。
            if(isset(commData['charaDatas'])){
              if(textOnly == false){
                if(nowRightCharaId != 0){//キャラが非表示ではない場合
                  var rightCharaAssetFullId = G_COMM_GET_CHARA_ASSET_ID_FULL(commData['charaDatas'],nowRightCharaId);
                  if(rightCharaAssetFullId != -1){
                    if(MAP_COMM_CHARA_RIGHT_SPRITE != null){
                      MAP_COMM_CHARA_RIGHT_SPRITE.remove();
                    }
                    MAP_COMM_CHARA_RIGHT_SPRITE = Sprite('ASSET_' + rightCharaAssetFullId).addChildTo(MAP_COMM_SCENE_CHARA_LAYER);
                    MAP_COMM_CHARA_RIGHT_SPRITE.scaleX *= -1;
                  }
                }
                else{
                  if(MAP_COMM_CHARA_RIGHT_SPRITE != null){
                    MAP_COMM_CHARA_RIGHT_SPRITE.remove();
                  }
                }
              }
              else{
                if(MAP_COMM_CHARA_RIGHT_SPRITE != null){
                  MAP_COMM_CHARA_RIGHT_SPRITE.remove();
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

function G_MAP_COMMAND_BUTTON_UPDATE(playerInfo,animObject,buttonArray){ //コマンドボタンの状態を更新する
  for (var b = 0; b < buttonArray.length; b++) {
    buttonArray[b]['button'].parent.visible = false;
  }
  if(animObject != null && !isset(animObject['player_avatar'])){
    if(isset(animObject['object_actions'])){
      for (var i = 0; i < animObject['object_actions'].length; i++) {
        console.log("ボタン表示");
        buttonArray[i]['button'].parent.visible = true;
        buttonArray[i]['button'].parent.alpha = 1;
        var buttonText = animObject['object_actions'][i]['action_menu_text'];
        buttonArray[i]['text'].text = buttonText;
        if(isset(animObject['object_info']) && animObject['object_info']['object_type'] == 9){ //ギルドボードか
           if(MAP_EVENT_DATAS != null){
             for (var me = 0; me < MAP_EVENT_DATAS.length; me++) {
               if(MAP_EVENT_DATAS[me]['trigger_id'] == animObject['object_actions'][i]['action_map_event_trigger_id']){
                 if(MAP_EVENT_DATAS[me]['trigger_event_type'] == 12){//ギルド設定カテゴリーの場合、権限持ち以外半透明にする。
                   // var myGuildPermission = G_GUILD_GET_GUILD_MEMBER_PERMISSION(playerInfo['player_index_id'],MAP_PLAYER_GUILD_DATA);
                   // if(myGuildPermission <= 0){
                   //   buttonArray[i]['button'].parent.alpha = 0.5;
                   // }
                 }
               }
             }
           }
        }
      }
    }
  }
  else if(animObject != null && isset(animObject['player_avatar'])){ //プレイヤーアバターの場合
    console.log("プレイヤーアバター:メニューボタン表示処理");
    buttonArray[0]['button'].parent.visible = true;
    buttonArray[0]['button'].parent.alpha = 1;
    buttonArray[0]['text'].text = "調べる";
    buttonArray[1]['button'].parent.visible = true;
    buttonArray[1]['button'].parent.alpha = 1;
    buttonArray[1]['text'].text = "決闘";
    buttonArray[2]['button'].parent.visible = true;
    buttonArray[2]['button'].parent.alpha = 1;
    buttonArray[2]['text'].text = "殺害";
    if(7500 < playerInfo['player_karma']) buttonArray[2]['button'].parent.visible = false; //カルマが一般人以上の場合は非表示
  }
}

function G_MAP_ACTION_COMMAND(commandNum,animObject,mapEventDatas){
  if(commandNum != -1 && animObject != null){ //実行可能なコマンドか
    if(animObject != null && !isset(animObject['player_avatar']) && isset(animObject['object_actions']) && isset(animObject['object_actions'][commandNum])){
      var actionData = animObject['object_actions'][commandNum];
      for (var i = 0; i < mapEventDatas.length; i++) {
        if(mapEventDatas[i]['trigger_id'] == actionData['action_map_event_trigger_id']){ //指定のイベントだった場合
          G_MAP_EVENT_TRIGGER_EXE(mapEventDatas[i],animObject); //イベントを実行
          break;
        }
      }
    }
    else if(animObject != null && isset(animObject['player_avatar'])){ //プレイヤーアバターの場合
      if(commandNum == 0){ //調べる(プレイヤープロフィールを表示)
        console.log("イベント0を開始");
        G_UI_CREATE_PLAYER_PROFILE(MAP_WINDOW_NODE,animObject['player_avatar']['avatar_anim']['player_index_id']);
        MAP_OPEN_PLAYER_PROFILE = true;
        MAP_IS_EVENT = true; //プレイヤープロフィール表示のため、イベントを開始
      }
      if(commandNum == 1){ //決闘
        console.log("イベント1を開始");
        var playerName = animObject['player_avatar']['avatar_anim']['player_info']['player_name'];
        var windowText = playerName + "に決闘を申し込みます\nよろしいですか？";
        G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"決闘する",windowText,1,"duelApplicationWindow");
      }
      if(commandNum == 2){ //殺害
        console.log("イベント2を開始");
        var playerName = animObject['player_avatar']['avatar_anim']['player_info']['player_name'];
        var windowText = playerName + "を殺害します\nよろしいですか？\n※実行した場合、戦闘が開始され、カルマが減少します。";
        G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"殺害する",windowText,1,"checkPlayerKillExecuteWindow");
      }
    }
  }
}

function G_MAP_EVENT_TRIGGER_EXE(mapEventData,animObject){ //指定したイベントを実行する。
  if(CHAT_WINDOW != null){ //チャットウィンドウが表示されていれば、削除
    G_CHAT_WINDOW_DELETE();
    MAP_CHAT_WINDOW_STANBY = true;
  }
  //mapEventData = map_event_triggerのテーブルカラム
  switch (mapEventData['trigger_event_type']) {
    case "1": //会話イベント(主眼)
    {
      MAP_IS_EVENT = true; //イベントモードをオン
      MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
      MAP_SET_COMM_DATA = null;
      G_MAP_LOAD_COMM_EVENT(MAP_SET_EVENT_DATA); //会話データを読み込み
      MAP_COMM_EVENT_STEP = 0; //進行度に読み込み開始を設定
    }
    break;
    case "2": //会話イベント(通常)
    {
      MAP_IS_EVENT = true; //イベントモードをオン
      MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
      MAP_SET_COMM_DATA = null;
      G_MAP_LOAD_COMM_EVENT(MAP_SET_EVENT_DATA); //会話データを読み込み
      MAP_COMM_EVENT_STEP = 0; //進行度に読み込み開始を設定
    }
    break;
    case "3": //店イベント
    {
      MAP_IS_EVENT = true; //イベントモードをオン
      MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
      MAP_SET_SHOP_DATA = null;
      G_MAP_LOAD_SHOP_EVENT(MAP_SET_EVENT_DATA,animObject); //ショップデータを読み込み開始する。
      MAP_SHOP_EVENT_STEP = 0; //進行度に読み込み開始を設定
    }
    break;
    case "4": //アイテム獲得
    {
      if(animObject != null){
        MAP_IS_EVENT = true; //イベントモードをオン
        MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
        MAP_SET_DROP_ITEM_DATA = null;
        G_MAP_EXE_DROP_ITEM_EVENT(MAP_SET_EVENT_DATA,animObject);
        MAP_DROP_ITEM_EVENT_STEP = 0; //進行度に読み込み開始を設定
      }
    }
    break;
    case "5": //戦闘
    {
      if(animObject != null){
        MAP_IS_EVENT = true; //イベントモードをオン
        MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
        MAP_SET_BATTLE_DATA = null;
        G_MAP_LOAD_BATTLE_EVENT(MAP_SET_EVENT_DATA,animObject);
        MAP_BATTLE_EVENT_STEP = 0; //通信開始
      }
    }
    break;
    case "6": //クエストボード
    {
      if(animObject != null){
        MAP_IS_EVENT = true; //イベントモードをオン
        MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
        MAP_SET_QUEST_BOARD_DATA = null;
        G_MAP_LOAD_QUEST_BOARD_EVENT(MAP_SET_EVENT_DATA,animObject);
        MAP_QUEST_BOARD_EVENT_STEP = 0; //通信開始
      }
    }
    break;
    case "7": //パーティボード
    {
      if(animObject != null){
        MAP_IS_EVENT = true; //イベントモードをオン
        MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
        MAP_SET_PARTY_BOARD_DATA = null;
        G_MAP_LOAD_PARTY_BOARD_EVENT(MAP_SET_EVENT_DATA,animObject);
        MAP_PARTY_BOARD_EVENT_STEP = 0; //通信開始
      }
    }
    break;
    case "8": //ドア
    {
      if(animObject != null){
        MAP_IS_EVENT = true; //イベントモードをオン
        MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
        MAP_SET_DOOR_DATA = null;
        G_MAP_LOAD_DOOR_EVENT(MAP_SET_EVENT_DATA,animObject);
        MAP_DOOR_EVENT_STEP = 0; //通信開始
      }
    }
    break;
    case "9": //プレイヤールーム
    {
      MAP_IS_EVENT = true; //イベントモードをオン
      MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
      MAP_PLAYER_ROOM_EVENT_STEP = 0; //進行度に読み込み開始を設定
    }
    break;
    case "10": //モニュメント
    {
      console.log("モニュメントイベント");
      MAP_IS_EVENT = true; //イベントモードをオン
      MAP_SET_EVENT_DATA = mapEventData; //指定のイベントをセット
      G_MAP_LOAD_MONUMENT_EVENT(MAP_SET_EVENT_DATA,animObject);
      MAP_MONUMENT_EVENT_STEP = 0; //通信開始
    }
    break;
    case "11": //ギルド情報
    {
      console.log("ギルド情報イベント");
      GUILD_INFO_WINDOW = G_GUILD_CREATE_GUILD_INFO_WINDOW(MAP_SCENE_OBJ,MAP_PLAYER_GUILD_DATA,MAP_PLAYER_GUILD_MEMBER_DATAS);
      if(GUILD_INFO_WINDOW != null){
        GUILD_INFO_WINDOW.addChildTo(MAP_MAP_SCENE_UI_LAYER);
      }
    }
    break;
    case "12": //ギルド設定
    {
      console.log("ギルド設定イベント");
      GUILD_SETTING_WINDOW = G_GUILD_CREATE_GUILD_SETTING_WINDOW(MAP_SCENE_OBJ,MAP_PLAYER_INFO['player_index_id'],MAP_PLAYER_GUILD_DATA,MAP_PLAYER_GUILD_MEMBER_DATAS);
      if(GUILD_SETTING_WINDOW != null){
        GUILD_SETTING_WINDOW.addChildTo(MAP_MAP_SCENE_UI_LAYER);
      }
    }
    break;
    default:
    {

    }
    break;
  }
}

function G_MAP_EXE_DROP_ITEM_EVENT(setEventData,animObject){ //アイテム獲得イベントを実行する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 4){ //アイテム獲得イベントだった場合
      var itemDropPostParamVal = new Object();
      itemDropPostParamVal['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      itemDropPostParamVal['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      itemDropPostParamVal['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      itemDropPostParamVal['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      itemDropPostParamVal['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      G_ANIM_OBJECT_REMOVE(animObject,false); //アイテム取得を行ったため、オブジェクトを削除
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",itemDropPostParamVal); //非同期通信開始
    }
  }
}

function G_ANIM_OBJECT_REMOVE(animObject,charaInfoVisible = true){ //指定のアニメオブジェクトを削除(マップ外移動で動き停止)させる
  if(animObject != null){
    animObject['character_move_speed'] = 0;
    animObject.x = 99999;
    animObject.y = 99999;
    if(charaInfoVisible == false){ //キャラクター情報の表示もリセットするか。
      G_DELETE_CHARACTER_INFO();
    }
  }
}

function G_MAP_CHECK_PLAYER_MAP_CHARACTER(animObjects,mapPlayerCharacterDatas){ //プレイヤーの行動によって変更されたキャラクター情報をチェックする。
  for (var i = 0; i < animObjects.length; i++) {
    for (var j = 0; j < mapPlayerCharacterDatas.length; j++) {
      if(animObjects[i]['object_array_index'] == mapPlayerCharacterDatas[j]['map_chara_array_index']){ //対象のオブジェクトだった場合
        var statusId = parseInt(mapPlayerCharacterDatas[j]['status_id']);
        switch (statusId) {
          case 0: //非表示
          {
            G_ANIM_OBJECT_REMOVE(animObjects[i]); //オブジェクトを削除(非表示)
          }
          break;
          case 1: //???
          {

          }
          break;
          default:
          break;
        }
      }
    }
  }
}

function G_MAP_LOAD_SHOP_EVENT(setEventData,animObject){ //ショップの読み込みを開始する。
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 3){ //店イベントだった場合
      var shopPostParamVal = new Object();
      shopPostParamVal['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      shopPostParamVal['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      shopPostParamVal['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      shopPostParamVal['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      shopPostParamVal['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",shopPostParamVal); //非同期通信開始
    }
  }
}

function G_MAP_PLAYER_PURCHASE_ITEM(setEventData,animObject,sellItemType,itemMasterId){ //ショップでアイテムを購入した時に実行する通信
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 3){ //店イベントだった場合
      var shopPostParamVal = new Object();
      shopPostParamVal['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      shopPostParamVal['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      shopPostParamVal['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      shopPostParamVal['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      shopPostParamVal['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      shopPostParamVal['player_purchase_item_type'] = sellItemType; //購入を行うアイテム
      shopPostParamVal['player_purchase_item_master_id'] = itemMasterId; //購入を行うアイテムマスターID
      ajaxStart("post","json","../../client/map/map.php",shopPostParamVal); //非同期通信開始
      NETWORK_IS_CONNECTING = true;
      G_LOADING_MASK_CREATE(MAP_WINDOW_NODE); //通信開始のため、マスクを作成
    }
  }
}

function G_MAP_SHOP_WINDOW_CREATE(shopWindow){ //ショップウィンドウを作成する
  MAP_SHOP_SELECT_WINDOW.visible = true; //ショップセレクトウィンドウ表示
  MAP_SHOP_PLAYER_ITEM_TEXT.visible = true; //プレイヤーの所持金を表示
  if(shopWindow == null){
    var shopItemCellArray = new Array();
    //ウィンドウ本体生成
    shopWindow = Sprite('ASSET_123').addChildTo(MAP_MAP_SCENE_UI_LAYER);
    shopWindow.y = shopWindow.y - (shopWindow.height / 4);
    var itemCellMaxCount = 6;
    var itemCellDispCount = 0; //アイテムセルを表示した回数
    var cellPosX = shopWindow.x - (shopWindow.width / 3.55);
    var cellPosY = shopWindow.y + (shopWindow.height / 9.5);

    //店舗名
    var shopNameLabel = Label({
      text: 'テストテストテスト',
      fontSize: 24,
      fill: 'black',
      align: 'center',
    }).addChildTo(shopWindow);
    shopNameLabel.x = shopNameLabel.x - (shopWindow.width / 7.5);
    shopNameLabel.y = shopNameLabel.y - (shopWindow.height / 2.85);
    shopNameLabel.text = "";
    shopWindow['shopNameLabel'] = shopNameLabel;

    //ページ数表示
    var shopPageNumLabel = Label({
      text: 'テストテストテスト',
      fontSize: 46,
      fill: 'white',
      align: 'center',
    }).addChildTo(shopWindow);
    shopPageNumLabel.x = shopPageNumLabel.x + (shopWindow.width / 3.5);
    shopPageNumLabel.y = shopPageNumLabel.y - (shopWindow.height / 2.8);
    shopPageNumLabel.text = "0/0";
    shopWindow['shopPageNumLabel'] = shopPageNumLabel;

    //ページ戻るボタン
    var shopPagePrevButton = Button({
      width: 128,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(shopWindow);
    shopPagePrevButton.x = shopPagePrevButton.x - (shopWindow.width / 3.5);
    shopPagePrevButton.y = shopPagePrevButton.y + (shopWindow.height / 2.9);
    shopPagePrevButton.visible = false;
    shopPagePrevButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        if(0 < MAP_SHOP_WINDOW_PAGE_NUM){
          MAP_SHOP_WINDOW_PAGE_NUM = MAP_SHOP_WINDOW_PAGE_NUM - 1;
          G_MAP_SHOP_WINDOW_UPDATE(MAP_SET_SHOP_DATA,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW,MAP_SHOP_WINDOW_PAGE_NUM);
          G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,0); //選択中の商品アイテムを更新
        }
      }
    };

    //ページ進むボタン
    var shopPageNextButton = Button({
      width: 128,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(shopWindow);
    shopPageNextButton.x = shopPageNextButton.x + (shopWindow.width / 3.5);
    shopPageNextButton.y = shopPageNextButton.y + (shopWindow.height / 2.9);
    shopPageNextButton.visible = false;
    shopPageNextButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        var maxPage = Math.ceil(MAP_SHOP_SELL_ITEMS.length / 6);
        if(MAP_SHOP_WINDOW_PAGE_NUM < (maxPage - 1)){
          MAP_SHOP_WINDOW_PAGE_NUM = MAP_SHOP_WINDOW_PAGE_NUM + 1;
          G_MAP_SHOP_WINDOW_UPDATE(MAP_SET_SHOP_DATA,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW,MAP_SHOP_WINDOW_PAGE_NUM);
          G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,0); //選択中の商品アイテムを更新
        }
      }
    };

    //戻るボタン
    var shopBackButton = Button({
      width: 160,         // 横サイズ
      height: 64,        // 縦サイズ
    }).addChildTo(shopWindow);
    shopBackButton.y = shopBackButton.y + (shopWindow.height / 2.9);
    shopBackButton.visible = false;
    shopBackButton.onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        MAP_SHOP_EVENT_STEP = 5; //ショップ終了シーンへ
      }
    };

    for(var i = 0; i < itemCellMaxCount; i++){
      //アイコンアセットIDを初期化
      var iconAssetId = -1;
      //アイテム名初期化
      var sellItemName = "";
      //商品価格
      var sellItemPrice = "";

      //商品セル表示
      var sellItemCell = Sprite('ASSET_124').addChildTo(shopWindow);
      sellItemCell.x = cellPosX;
      sellItemCell.y = cellPosY;

      //商品セルのボタン
      var sellItemCellButton = Button({
        width: 160,         // 横サイズ
        height: 160,        // 縦サイズ
      }).addChildTo(sellItemCell);
      sellItemCellButton['button_index'] = i;
      sellItemCellButton['button_visible'] = true;
      sellItemCellButton.visible = false;

      //選択時に発生するエフェクト
      var sellItemSelectCell = Sprite('ASSET_127').addChildTo(sellItemCell);
      sellItemSelectCell.visible = false;

      //商品名
      var sellItemNameLabel = Label({
        text: 'テストテストテスト',
        fontSize: 14,
        fill: 'black',
        align: 'left',
      }).addChildTo(sellItemCell);
      sellItemNameLabel.x = sellItemNameLabel.x - (sellItemCell.width / 2.3);
      sellItemNameLabel.y = sellItemNameLabel.y - (sellItemCell.height / 2.5);
      sellItemNameLabel.text = sellItemName;

      //商品アイコン
      var sellItemIcon = Sprite("ASSET_125").addChildTo(sellItemCell);

      //商品価格ラベル
      var sellItemPriceLabel = Label({
        text: 'テストテストテスト',
        fontSize: 14,
        fill: 'black',
        align: 'right',
      }).addChildTo(sellItemCell);
      sellItemPriceLabel.x = sellItemPriceLabel.x + (sellItemCell.width / 2.3);
      sellItemPriceLabel.y = sellItemPriceLabel.y + (sellItemCell.height / 2.5);
      sellItemPriceLabel.text = sellItemPrice;

      //商品セルの位置を更新
      cellPosX = cellPosX + (sellItemCell.width * 1.13);
      if(i == 2){
        cellPosX = shopWindow.x - (shopWindow.width / 3.55);
        cellPosY = cellPosY + (sellItemCell.height * 1.13);
      }

      //各パーツを登録
      var shopItemCell = new Array();
      shopItemCell['sellItemCell'] = sellItemCell;
      shopItemCell['sellItemCellButton'] = sellItemCellButton;
      shopItemCell['sellItemSelectCell'] = sellItemSelectCell;
      shopItemCell['sellItemNameLabel'] = sellItemNameLabel;
      shopItemCell['sellItemIcon'] = sellItemIcon;
      shopItemCell['sellItemPriceLabel'] = sellItemPriceLabel;
      shopItemCellArray[i] = shopItemCell;
    }
    shopWindow['itemCellObj'] = shopItemCellArray;
  }
  for(var j = 0; j < shopItemCellArray.length; j++){
    shopWindow['itemCellObj'][j]['sellItemCellButton'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && this['button_visible'] == true && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
        G_MAP_SHOP_SELECT_ITEM(MAP_SHOP_WINDOW,MAP_SHOP_SELL_ITEMS,MAP_SHOP_WINDOW_PAGE_NUM,this['button_index']); //商品アイテムを選択した。
      }
    };
  }
  return shopWindow;
}

//ページが更新された場合、商品リストの表示状態を更新する。
function G_MAP_SHOP_WINDOW_UPDATE(shopData,shopSellItems,shopWindow,pageNumber){
  MAP_SHOP_CELL_ITEM_MAX_COUNT = 0;
  if(shopWindow != null && shopData != null){
    if(isset(shopData['shop_master_data']['shop_name']) && isset(shopWindow['shopNameLabel'])){
      shopWindow['shopNameLabel'].text = shopData['shop_master_data']['shop_name'];
    }
    if(isset(shopWindow['shopPageNumLabel'])){
      var maxPage = Math.ceil(shopSellItems.length / 6);
      shopWindow['shopPageNumLabel'].text = (pageNumber + 1) + "/" + maxPage;
    }
    //現在表示されている商品セル内を全て削除
    for(var j=0; j < shopWindow['itemCellObj'].length; j++){
      var shopItemCell = shopWindow['itemCellObj'][j];
      shopItemCell['sellItemCell'].visible = false;
      //ボタンを無効化
      shopItemCell['sellItemCellButton']['button_visible'] = false;
    }
    var startIndex = (pageNumber * 6);
    var sellIndex = 0;
    for(var i = startIndex; i < shopSellItems.length; i++){
      //アイコンアセットIDを初期化
      var iconAssetId = -1;
      //アイテム名初期化
      var sellItemName = "";
      //商品価格
      var sellItemPrice = "";

      switch (shopSellItems[i]['sell_item_type']) {
        case "cardItem": //カード
        {
          sellItemName = shopSellItems[i]['card_name'];
          iconAssetId = G_HELPER_GET_ICON_ASSET_ID(shopSellItems[i]['card_rank']);
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
        }
        break;
        case "equipItem": //装備品
        {
          sellItemName = shopSellItems[i]['item_name'];
          iconAssetId = shopSellItems[i]['icon_asset_id'];
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
        }
        break;
        case "itemItem": //通貨アイテム
        {
          sellItemName = shopSellItems[i]['item_name'];
          iconAssetId = shopSellItems[i]['icon_asset_id'];
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
        }
        break;
        default:
        break;
      }

      //更新中のベースとなるセルを取得
      var shopItemCell = shopWindow['itemCellObj'][sellIndex];
      var sellItemCell = shopItemCell['sellItemCell'];
      var sellItemCellButton = shopItemCell['sellItemCellButton'];

      //商品セル表示オン
      sellItemCell.visible = true;

      //ボタンを有効化
      sellItemCellButton['button_visible'] = true;
      MAP_SHOP_CELL_ITEM_MAX_COUNT = sellIndex;

      //商品名更新
      shopItemCell['sellItemNameLabel'].text = sellItemName;

      //商品アイコン変更
      shopItemCell['sellItemIcon'].remove();
      shopItemCell['sellItemIcon'] = Sprite("ASSET_" + iconAssetId).addChildTo(sellItemCell);

      //商品価格ラベル更新
      shopItemCell['sellItemPriceLabel'].text = sellItemPrice;

      if(5 <= sellIndex){
        break;
      }
      sellIndex++;
    }
    MAP_SHOP_SELECT_ITEM_INDEX = 0; //選択中のindexを初期化
  }
}

function G_MAP_REPLACE_SHOP_SELL_ITEM_DATAS(shopData){ //販売データの整形を行う
  var result = new Array();
  var sellCardItemArray = new Array();
  var sellEquipItemArray = new Array();
  var sellItemItemArray = new Array();
  //カードアイテムの配列
  if(isset(shopData['shop_sell_card_items'])){
    for (var i = 0; i < shopData['shop_sell_card_items'].length; i++) {
      shopData['shop_sell_card_items'][i]['sell_item_type'] = "cardItem";
    }
    sellCardItemArray = shopData['shop_sell_card_items'];
  }
  if(isset(shopData['shop_sell_equip_items'])){
    for (var i = 0; i < shopData['shop_sell_equip_items'].length; i++) {
      shopData['shop_sell_equip_items'][i]['sell_item_type'] = "equipItem";
    }
    sellEquipItemArray = shopData['shop_sell_equip_items'];
  }
  if(isset(shopData['shop_sell_items'])){
    for (var i = 0; i < shopData['shop_sell_items'].length; i++) {
      shopData['shop_sell_items'][i]['sell_item_type'] = "itemItem";
    }
    sellItemItemArray = shopData['shop_sell_items'];
  }
  var addArray1 = sellCardItemArray.concat(sellEquipItemArray);
  var result = addArray1.concat(sellItemItemArray);

  return result;
}

function G_MAP_MAP_UI_VISIBLE(visible,option = 0){ //マップのUI表示を切り替える
  MAP_CHARACTER_INFO_WINDOW.visible = visible;
  MAP_CONTROLLER_BACK_GROUND.visible = visible;
  MAP_CONTROLE_BUTTON.visible = visible;
  if(visible == false){
    G_MAP_COMMAND_BUTTON_UPDATE(MAP_PLAYER_INFO,null,MAP_COMMAND_BUTTON_ARRAY);
  }
  else{
    G_MAP_COMMAND_BUTTON_UPDATE(MAP_PLAYER_INFO,MAP_SELECT_ANIM_OBJECT,MAP_COMMAND_BUTTON_ARRAY);
  }
  if(visible == false){
    switch (option) { //オブションで残す物を指定する
      case 0://デフォルト
        break;
      case 1: //ショップウィンドウ
        MAP_CONTROLLER_BACK_GROUND.visible = true;
        MAP_CHARACTER_INFO_WINDOW.visible = true;
        break;
      case 2:
        break;
      case 3:
        break;
      case 4:
        break;
      default:
    }
  }
}

function G_MAP_SHOP_SELECT_ANIM_UPDATE(selectIndex,shopWindow){ //選択中の商品セルのアニメーションを更新
  if(selectIndex != -1 && shopWindow != null){
    var itemCellObjs = shopWindow['itemCellObj'];
    for (var i = 0; i < itemCellObjs.length; i++) {
      if(selectIndex != i){
        itemCellObjs[i]['sellItemSelectCell'].visible = false;
      }
      else{
        if(itemCellObjs[i]['sellItemSelectCell'].visible == false){
          itemCellObjs[i]['sellItemSelectCell'].visible = true;
        }

        if(MAP_SHOP_CELL_ANIM_SWITCH == 0){ //加色
          if(itemCellObjs[i]['sellItemSelectCell'].alpha < 1){
            itemCellObjs[i]['sellItemSelectCell'].alpha += 0.025;
          }
          else{
            itemCellObjs[i]['sellItemSelectCell'].alpha = 1;
            MAP_SHOP_CELL_ANIM_SWITCH = 1; //減色にスイッチ
          }
        }
        else if(MAP_SHOP_CELL_ANIM_SWITCH == 1){
          if(0 < itemCellObjs[i]['sellItemSelectCell'].alpha){
            itemCellObjs[i]['sellItemSelectCell'].alpha -= 0.025;
          }
          else{
            itemCellObjs[i]['sellItemSelectCell'].alpha = 0;
            MAP_SHOP_CELL_ANIM_SWITCH = 0; //加色にスイッチ
          }
        }

      }
    }
  }
}

function G_MAP_SHOP_SELECT_ITEM(shopWindow,shopSellItems,pageNumber,selectIndex){ //商品リストから商品を選択した時に呼び出される関数
  MAP_SHOP_SELECT_ITEM_INDEX = selectIndex; //選択中のセルを更新
  var startIndex = (pageNumber * 6);
  var sellIndex = 0;
  for(var i = startIndex; i < shopSellItems.length; i++){
    if((selectIndex + startIndex)  == i){
      //アイコンアセットIDを初期化
      var iconAssetId = -1;
      //アイテム名初期化
      var sellItemName = "";
      //商品価格
      var sellItemPrice = "";
      //所持数
      var num = "";

      switch (shopSellItems[i]['sell_item_type']) {
        case "cardItem": //カード
        {
          sellItemName = shopSellItems[i]['card_name'];
          iconAssetId = G_HELPER_GET_ICON_ASSET_ID(shopSellItems[i]['card_rank']);
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
          //所持数取得
          for(var j=0; j < MAP_PLAYER_CARD_DATA.length; j++){
            if(MAP_PLAYER_CARD_DATA[j]['card_master_id'] == shopSellItems[i]['card_master_id']){
              num = MAP_PLAYER_CARD_DATA[j]['num'];
            }
          }
        }
        break;
        case "equipItem": //装備品
        {
          sellItemName = shopSellItems[i]['item_name'];
          iconAssetId = shopSellItems[i]['icon_asset_id'];
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
          //所持数取得
          for(var j=0; j < MAP_PLAYER_EQUIP_ITEM_DATA.length; j++){
            if(MAP_PLAYER_EQUIP_ITEM_DATA[j]['equip_item_master_id'] == shopSellItems[i]['equip_item_master_id']){
              num = MAP_PLAYER_EQUIP_ITEM_DATA[j]['num'];
            }
          }
        }
        break;
        case "itemItem": //消費アイテム
        {
          sellItemName = shopSellItems[i]['item_name'];
          iconAssetId = shopSellItems[i]['icon_asset_id'];
          sellItemPrice = shopSellItems[i]['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItems[i]['pay_item_id']);
          //所持数取得
          for(var j=0; j < MAP_PLAYER_ITEM_DATA.length; j++){
            if(MAP_PLAYER_ITEM_DATA[j]['item_id'] == shopSellItems[i]['item_master_id']){
              num = MAP_PLAYER_ITEM_DATA[j]['item_val'];
            }
          }
        }
        break;
        default:
        break;
      }

      //キャラ情報ウィンドウに商品アイコンを表示させる。
      if(MAP_CHARACTER_INFO_WINDOW != null)
      {
        //キャラが表示していた場合非表示にする。
        if(MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE != null){
          MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE['character_chip_asset_id'] = -1;
          MAP_CHARACTER_INFO_WINDOW_CHARA_IMAGE.visible = false;
        }
        //既に表示されている商品アイコンがあった場合、削除
        if(MAP_SHOP_INFO_WINDOW_ITEM_IMAGE != null){
          MAP_SHOP_INFO_WINDOW_ITEM_IMAGE.remove();
        }
        MAP_SHOP_INFO_WINDOW_ITEM_IMAGE = Sprite('ASSET_' + iconAssetId).addChildTo(MAP_CHARACTER_INFO_WINDOW);
        MAP_SHOP_INFO_WINDOW_ITEM_IMAGE.y = MAP_SHOP_INFO_WINDOW_ITEM_IMAGE.y - (MAP_CHARACTER_INFO_WINDOW.height / 3.8);
      }

      //キャラ情報ウィンドウの説明文を商品の情報に書き換える
      if(MAP_CHARACTER_INFO_TEXT != null){
        MAP_CHARACTER_INFO_TEXT.text = "【" + sellItemName + "】\n【価格】" + sellItemPrice + "\n【所持数】" + num;
      }

      //プレイヤーの所持金を更新
      if(MAP_SHOP_PLAYER_ITEM_TEXT != null && MAP_PLAYER_ITEM_DATA != null){
        for(var j=0; j < MAP_PLAYER_ITEM_DATA.length; j++){
          if(MAP_PLAYER_ITEM_DATA[j]['item_id'] == shopSellItems[i]['pay_item_id']){ //価格の通貨と自分の所持通貨の種類が一致したら
            MAP_SHOP_PLAYER_ITEM_ID = shopSellItems[i]['pay_item_id'];
            MAP_SHOP_PLAYER_ITEM_TEXT.text = MAP_PLAYER_ITEM_DATA[j]['item_val'];
            if(MAP_SHOP_PLAYER_ITEM_ICON != null){
              MAP_SHOP_PLAYER_ITEM_ICON.remove();
              //ショップで表示する所持金のアイコン
              MAP_SHOP_PLAYER_ITEM_ICON = Sprite('ASSET_' + MAP_PLAYER_ITEM_DATA[j]['asset_id']).addChildTo(MAP_SHOP_PLAYER_ITEM_TEXT);
              MAP_SHOP_PLAYER_ITEM_ICON.x = MAP_SHOP_PLAYER_ITEM_ICON.x + (MAP_SHOP_PLAYER_ITEM_ICON.width / 5.5);
              MAP_SHOP_PLAYER_ITEM_ICON.scaleX = 0.5;
              MAP_SHOP_PLAYER_ITEM_ICON.scaleY = 0.5;
            }
          }
        }
      }
      MAP_SHOP_SELECT_SELL_ITEM = shopSellItems[i]; //選択した商品を更新
      G_MAP_SHOP_COMMAND_BUTTON_UPDATE(shopSellItems[i],MAP_COMMAND_BUTTON_ARRAY); //コマンドボタンを更新
      break;
    }
    sellIndex++;
  }
}

function G_MAP_SHOP_COMMAND_BUTTON_UPDATE(shopSellItem,buttonArray){ //ショップで使用するコマンドボタンの状態を更新する
  for (var b = 0; b < buttonArray.length; b++) {
    buttonArray[b]['button'].visible = false;
  }
  if(shopSellItem != null){
    buttonArray[0]['button'].visible = true;
    buttonArray[0]['text'].text = "買う";
    buttonArray[1]['button'].visible = true;
    buttonArray[1]['text'].text = "調べる";
    buttonArray[2]['button'].visible = true;
    buttonArray[2]['text'].text = "戻る";
  }
}

function G_MAP_SHOP_ACTION_COMMAND(commandButtonIndex,shopSellItem){ //ショップでコマンドボタンを押した時に実行
  if(commandButtonIndex != -1 && shopSellItem != null){

    //アイコンアセットIDを初期化
    var iconAssetId = -1;
    //アイテム名初期化
    var sellItemName = "";
    //商品価格
    var sellItemPrice = "";
    //所持数
    var num = "";

    switch (shopSellItem['sell_item_type']) {
      case "cardItem": //カード
      {
        sellItemName = shopSellItem['card_name'];
        iconAssetId = G_HELPER_GET_ICON_ASSET_ID(shopSellItem['card_rank']);
        sellItemPrice = shopSellItem['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItem['pay_item_id']);
        //所持数取得
        for(var i=0; i < MAP_PLAYER_CARD_DATA.length; i++){
          if(MAP_PLAYER_CARD_DATA[i]['card_master_id'] == shopSellItem['card_master_id']){
            num = MAP_PLAYER_CARD_DATA[i]['num'];
          }
        }
      }
      break;
      case "equipItem": //装備品
      {
        sellItemName = shopSellItem['item_name'];
        iconAssetId = shopSellItem['icon_asset_id'];
        sellItemPrice = shopSellItem['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItem['pay_item_id']);
        //所持数取得
        for(var i=0; i < MAP_PLAYER_EQUIP_ITEM_DATA.length; i++){
          if(MAP_PLAYER_EQUIP_ITEM_DATA[i]['equip_item_master_id'] == shopSellItem['equip_item_master_id']){
            num = MAP_PLAYER_EQUIP_ITEM_DATA[i]['num'];
          }
        }
      }
      break;
      case "itemItem": //通貨アイテム
      {
        sellItemName = shopSellItem['item_name'];
        iconAssetId = shopSellItem['icon_asset_id'];
        sellItemPrice = shopSellItem['price_val'] + G_HELPER_GET_ITEM_UNIT_TEXT(shopSellItem['pay_item_id']);
        //所持数取得
        for(var i=0; i < MAP_PLAYER_ITEM_DATA.length; i++){
          if(MAP_PLAYER_ITEM_DATA[i]['item_id'] == shopSellItem['item_master_id']){
            num = MAP_PLAYER_ITEM_DATA[i]['item_val'];
          }
        }
      }
      break;
      default:
      break;
    }

    switch (commandButtonIndex) {
      case 0: //買うボタン
      {
        var windowText = "【" + sellItemName + "】\n価格：" + sellItemPrice + "\n所持数：" + num;
        G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"以下のアイテムを購入しますか？",windowText,1,"sellItemWindow");
      }
      break;
      case 1: //調べるボタン
      {
        if(MAP_SHOP_SELECT_SELL_ITEM != null){
          var itemCategory = -1;
          switch (shopSellItem['sell_item_type']) {
            case "cardItem": //カード
            {
              itemCategory = 0;
            }
            break;
            case "equipItem": //装備アイテム
            {
              itemCategory = 1;
            }
            break;
            case "itemItem": //通貨アイテム
            {
              itemCategory = 2;
            }
            break;
            default:
            break;
          }
          G_ITEM_INFO_WINDOW_CREATE(MAP_WINDOW_NODE,MAP_SHOP_SELECT_SELL_ITEM,itemCategory);
        }
      }
      break;
      case 2: //戻るボタン
      {
        MAP_SHOP_EVENT_STEP = 5; //ショップ終了シーンへ
      }
      break;
      default:
      break;
    }
  }
}

function G_UPDATE_SELECT_CHARACTER(nextTarget = true){ //選択中のキャラクターを更新 :nextTarget ターゲットを進めるか
  var searchAnimObjects = G_MAP_SEARCH_ANIMOBJECT(MAP_CHARA_ANIM_OBJECTS);
  var resultSelectIndex = G_MAP_SELECT_OBJECT_TARGET_CHANGE(searchAnimObjects,MAP_SELECT_OBJECT_INDEX);
  if(resultSelectIndex != -1){
    if(nextTarget == true){
      MAP_SELECT_OBJECT_INDEX = resultSelectIndex;
    }
    var playerAvatarObjects = null;
    if(MAP_ACTIVE_PLAYER_ROOM_INSTANCE != null && isset(MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'])) playerAvatarObjects = MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'];
    G_MAP_CREATE_TARGET_ANIM(searchAnimObjects[MAP_SELECT_OBJECT_INDEX],MAP_CHARA_ANIM_OBJECTS,playerAvatarObjects); //ターゲットマーカーを生成
    G_MAP_CREATE_CHARACTER_INFO(searchAnimObjects[MAP_SELECT_OBJECT_INDEX]);
    G_MAP_CREATE_CHARACTER_IMAGE(searchAnimObjects[MAP_SELECT_OBJECT_INDEX]);
    G_MAP_COMMAND_BUTTON_UPDATE(MAP_PLAYER_INFO,searchAnimObjects[MAP_SELECT_OBJECT_INDEX],MAP_COMMAND_BUTTON_ARRAY);
    MAP_SELECT_ANIM_OBJECT = searchAnimObjects[MAP_SELECT_OBJECT_INDEX]; //選択中のオブジェクトを更新
  }
}

//キャラクター情報を削除
function G_DELETE_CHARACTER_INFO(){
  MAP_SELECT_OBJECT_INDEX = -1; //セレクト状態をリセット
  var playerAvatarObjects = null;
  if(MAP_ACTIVE_PLAYER_ROOM_INSTANCE != null && isset(MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'])) playerAvatarObjects = MAP_ACTIVE_PLAYER_ROOM_INSTANCE['player_avatar_datas'];
  G_MAP_CREATE_TARGET_ANIM(null,MAP_CHARA_ANIM_OBJECTS,playerAvatarObjects); //ターゲットマーカーを非表示
  G_MAP_CREATE_CHARACTER_IMAGE(null); //キャラクター情報のイメージを非表示
  G_MAP_CREATE_CHARACTER_INFO(null); //キャラクター情報を非表示
  G_MAP_COMMAND_BUTTON_UPDATE(MAP_PLAYER_INFO,null,MAP_COMMAND_BUTTON_ARRAY); //コマンドボタンを非表示
}

function G_MAP_LOAD_BATTLE_EVENT(setEventData,animObject){ //バトルイベントを開始する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 5){ //戦闘イベントだった場合
      var battleEventPostParamVal = new Object();
      battleEventPostParamVal['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      battleEventPostParamVal['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      battleEventPostParamVal['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      battleEventPostParamVal['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      battleEventPostParamVal['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      // G_ANIM_OBJECT_REMOVE(animObject,false); //アイテム取得を行ったため、オブジェクトを削除
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",battleEventPostParamVal); //非同期通信開始
    }
  }
}

function G_MAP_LOAD_QUEST_BOARD_EVENT(setEventData,animObject){ //クエストボードイベントを開始する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 6){ //クエストボードイベントだった
      var questBoardEventPostParam = new Object();
      questBoardEventPostParam['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      questBoardEventPostParam['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      questBoardEventPostParam['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      questBoardEventPostParam['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      questBoardEventPostParam['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",questBoardEventPostParam); //非同期通信開始
    }
  }
}

function G_MAP_LOAD_PARTY_BOARD_EVENT(setEventData,animObject){ //パーティボードイベントを開始する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 7){ //クエストボードイベントだった
      var questBoardEventPostParam = new Object();
      questBoardEventPostParam['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      questBoardEventPostParam['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      questBoardEventPostParam['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      questBoardEventPostParam['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      questBoardEventPostParam['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",questBoardEventPostParam); //非同期通信開始
    }
  }
}

function G_MAP_LOAD_DOOR_EVENT(setEventData,animObject){ //ドアイベントを開始する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 8){ //ドアイベントだった
      var doorEventPostParam = new Object();
      doorEventPostParam['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      doorEventPostParam['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      doorEventPostParam['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      doorEventPostParam['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      doorEventPostParam['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",doorEventPostParam); //非同期通信開始
    }
  }
}

function G_MAP_LOAD_MONUMENT_EVENT(setEventData,animObject){ //モニュメントイベントを開始する
  if(setEventData != null){
    if(setEventData['trigger_event_type'] == 10){ //モニュメントイベントだった
      var monumentEventPostParam = new Object();
      monumentEventPostParam['set_trigger_event_type'] = setEventData['trigger_event_type']; //イベントタイプを設定
      monumentEventPostParam['set_trigger_target_id'] = setEventData['trigger_target_id']; //イベントのターゲットを設定
      monumentEventPostParam['set_trigger_character_map_array_index'] = animObject['object_array_index']; //対象のキャラクター情報を設定
      monumentEventPostParam['set_trigger_character_map_chip_index'] = animObject['object_map_chip_index']; //対象のキャラクター情報を設定
      monumentEventPostParam['check_map_id'] = MAP_RESULT_MAP_DATA['map_id']; //マップIDを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",monumentEventPostParam); //非同期通信開始
    }
  }
}

function G_MAP_SET_BATTLE_INSTANCE(battleEventData,mapMasterData){
  mapMasterData['start_pos_x'] = MAP_PLAYER_MAP_POS['pos_x']; //スタート位置を更新
  mapMasterData['start_pos_y'] = MAP_PLAYER_MAP_POS['pos_y']; //スタート位置を更新
  PLAYER_BATTLE_INSTANCE = null; //バトルインスタンス情報を初期化
  PLAYER_BATTLE_INSTANCE = new Object();
  // PLAYER_BATTLE_INSTANCE['battle_event_data'] = new Object(); //バトルイベント情報をセット
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['id'] = battleEventData['id'];
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['battle_instance_id'] = battleEventData['battle_instance_id'];
  PLAYER_BATTLE_INSTANCE['battle_instance_id'] = battleEventData['battle_instance_id'];
  PLAYER_BATTLE_INSTANCE['player_battle_instance_id'] = battleEventData['id'];
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['enemy_index_id'] = battleEventData['enemy_index_id'];
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['map_chara_array_index'] = battleEventData['map_chara_array_index'];
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['chara_map_chip_index'] = battleEventData['chara_map_chip_index'];
  // PLAYER_BATTLE_INSTANCE['battle_event_data']['map_id'] = battleEventData['map_id'];
  PLAYER_BATTLE_INSTANCE['story_info'] = new Object();
  PLAYER_BATTLE_INSTANCE['story_info']['story_master_id'] = MAP_STORY_MASTER_ID; //進行中のストーリーマスターIDをセット
  PLAYER_BATTLE_INSTANCE['map_master_data'] = mapMasterData;
}

function G_MAP_ENEMY_POWER_GAUGE_INIT(gauge,playerMapInstance,areaInstance,mapMasterData){ //敵勢力ゲージの量を初期化
  var resultGaugeVal = parseInt(playerMapInstance['enemy_power']) / parseInt(mapMasterData['max_enemy_power']) * 100;
  if(areaInstance != false) resultGaugeVal = parseInt(areaInstance['enemy_power']) / parseInt(mapMasterData['max_enemy_power']) * 100;
  MAP_NOW_ENEMY_POWER_CONDITION = resultGaugeVal; //現在の敵勢力の%を設定
  gauge.value = resultGaugeVal;
}

function G_MAP_ENEMY_POWER_GAUGE_UPDATE(gauge,enemyPowerCondition){ //敵勢力ゲージを更新
  if(gauge != null && gauge.visible == true){
    MAP_NOW_ENEMY_POWER_CONDITION = enemyPowerCondition;
    gauge.value = enemyPowerCondition;
  }
}

//クエストボードを表示する。
function G_MAP_CREATE_QUEST_BOARD(questData){
  MAP_QUEST_CELL_ARRAY = new Array();
  var listObj = Sprite('ASSET_159');
  //listObj.alpha = 1;
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  if(isset(questData['player_active_quest_master_datas']) && Array.isArray(questData['player_active_quest_master_datas'])){
    for(var i=0; i < questData['player_active_quest_master_datas'].length; i++){
      var questStatus = -1;
      var questMasterData = questData['player_active_quest_master_datas'][i];
      if(isset(questData['player_quest_datas']) && Array.isArray(questData['player_quest_datas'])) questStatus = G_MAP_GET_PLAYER_ORDER_STATUS(questMasterData['id'],questData['player_quest_datas']); //クエストの状態を調べる
      MAP_QUEST_CELL_ARRAY[i] = Sprite('ASSET_159').addChildTo(listObj);
      MAP_QUEST_CELL_ARRAY[i].y = MAP_QUEST_CELL_ARRAY[i].y - listObjHeightSize;
      listObjHeightSize += MAP_QUEST_CELL_ARRAY[i].height;
      cellSizeHeight = MAP_QUEST_CELL_ARRAY[i].height;
      //クエスト名
      MAP_QUEST_CELL_ARRAY[i]['quest_name_label'] = Label({
        text: 'クエスト名の取得に失敗しました。',
        fontSize: 40,
        fill: 'black',
        align: 'left',
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]);
      MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].x = MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].x - (MAP_QUEST_CELL_ARRAY[i].width / 2.8);
      MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].y = MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].y - (MAP_QUEST_CELL_ARRAY[i].height / 4);
      if(isset(questMasterData['quest_name'])){
        MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].text = questMasterData['quest_name'];
      }
      //クエスト情報
      MAP_QUEST_CELL_ARRAY[i]['quest_info_label'] = Label({
        text: 'クエスト情報の取得に失敗しました。',
        fontSize: 18,
        fill: 'black',
        align: 'left',
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]);
      MAP_QUEST_CELL_ARRAY[i]['quest_info_label'].x = MAP_QUEST_CELL_ARRAY[i]['quest_name_label'].x;
      MAP_QUEST_CELL_ARRAY[i]['quest_info_label'].y = MAP_QUEST_CELL_ARRAY[i]['quest_info_label'].y;
      if(isset(questMasterData['quest_info'])){
        //クエスト情報がある場合、クエスト情報のテキスト。ない場合は条件文を自動生成できれば自動せ生成
        if(questMasterData['quest_info'] != "") MAP_QUEST_CELL_ARRAY[i]['quest_info_label'].text = questMasterData['quest_info'];
        else if(isset(questMasterData['quest_condition']))MAP_QUEST_CELL_ARRAY[i]['quest_info_label'].text = G_MAP_GET_QUEST_CONDITION_TEXT(1,questMasterData['quest_condition'],questMasterData,questStatus);
      }
      //詳細ボタン
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'] = Sprite('ASSET_79').addChildTo(MAP_QUEST_CELL_ARRAY[i]);
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].y = MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].y + (MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].height / 1.2);
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button_text'] = Label({
        text: '詳細',
        fontSize: 50,
        fill: 'white',
        align: 'center',
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image']);
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button'] = Button({
        width: MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].width,         // 横サイズ
        height: MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].height,        // 縦サイズ
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image']);
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button']['player_active_quest_master_data'] = questMasterData; //クエストデータを追加
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button']['quest_status'] = questStatus; //クエストステータスを追加
      if(isset(questData['quest_drop_datas']) && Array.isArray(questData['quest_drop_datas'])){
        for(var qd = 0; qd < questData['quest_drop_datas'].length; qd++){
          if(questData['quest_drop_datas'][qd]['quest_master_id'] == questMasterData['id']){ //クエストIDが一致した場合
            MAP_QUEST_CELL_ARRAY[i]['quest_info_button']['quest_drop_data'] = questData['quest_drop_datas'][qd];//クエストドロップデータを追加
          }
        }
      }
      //タップ開始位置を記録
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button'].onpointstart = function(e){
        MAP_QUEST_LIST_START_TAP_POS_X = e.pointer.x;
        MAP_QUEST_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(MAP_QUEST_LIST_START_TAP_POS_X != e.pointer.x || MAP_QUEST_LIST_START_TAP_POS_Y != e.pointer.y) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_QUEST_INFO_WINDOW == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          G_MAP_CREATE_QUEST_INFO(MAP_MAP_SCENE_UI_LAYER,this['player_active_quest_master_data'],this['quest_drop_data'],this['quest_status']); //クエスト詳細画面を表示
        }
      };
      MAP_QUEST_CELL_ARRAY[i]['quest_info_button'].visible = false;

      //受注 or 報告ボタン
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'] = Sprite('ASSET_79').addChildTo(MAP_QUEST_CELL_ARRAY[i]);
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].y = MAP_QUEST_CELL_ARRAY[i]['quest_info_button_image'].y;
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].x = MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].x + MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].width * 1.05;
      if(questStatus == 0) MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].alpha = 0.5; //クエスト進行中だった(受注不可)
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button_text'] = Label({
        text: '受注',
        fontSize: 50,
        fill: 'white',
        align: 'center',
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image']);
      if(questStatus == 1) MAP_QUEST_CELL_ARRAY[i]['quest_order_button_text'].text = "報告"; //完了状態だった
      if(questStatus == 0) MAP_QUEST_CELL_ARRAY[i]['quest_order_button_text'].alpha = 0.5; //クエスト進行中だった(受注不可)
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button'] = Button({
        width: MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].width,         // 横サイズ
        height: MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image'].height,        // 縦サイズ
      }).addChildTo(MAP_QUEST_CELL_ARRAY[i]['quest_order_button_image']);
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button']['player_active_quest_master_data'] = questMasterData; //クエストデータを追加
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button']['quest_status'] = questStatus; //クエスト状態を追加
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button'].onpointstart = function(e){
        MAP_QUEST_LIST_START_TAP_POS_X = e.pointer.x;
        MAP_QUEST_LIST_START_TAP_POS_Y = e.pointer.y;
      };
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button'].onpointend = function(e){
        if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        if(MAP_QUEST_LIST_START_TAP_POS_X != e.pointer.x || MAP_QUEST_LIST_START_TAP_POS_Y != e.pointer.y) return;
        if(G_MAP_BUTTON_ACTIVE_CHECK() == true && MAP_QUEST_INFO_WINDOW == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
          if(this['quest_status'] != 0 && this['quest_status'] != 1){ //進行中でも完了でもない
            G_MAP_CREATE_QUEST_ORDER_WINDOW(MAP_WINDOW_NODE,this['player_active_quest_master_data']); //クエスト受注ウィンドウを表示
          }
          else{
            if(this['quest_status'] == 0) G_NORMAL_WINDOW_CREATE(MAP_WINDOW_NODE,"クエスト受注","既に受注済みです。",2,"questOrderAlertWindow");
            if(this['quest_status'] == 1) {
              G_MAP_GET_QUEST_CLEAR_INFO(this['player_active_quest_master_data']['id']); //報告結果をサーバーから取得する。
            }
          }
        }
      };
      MAP_QUEST_CELL_ARRAY[i]['quest_order_button'].visible = false;
    }
  }
  listObj.y = listObj.y + ((listObjHeightSize / 2) - (cellSizeHeight / 2));
  G_UI_CREATE_LIST(MAP_MAP_SCENE_UI_LAYER,listObj,listObjHeightSize,"クエスト一覧","閉じる"); //リストを表示
}

function G_MAP_GET_PLAYER_ORDER_STATUS(checkQuestId,playerQuestDatas){ //指定のクエストが進行中(受注中)かチェックを行う -1 = 該当無し 0 = 受注中(進行中) 1 = 完了(報告待ち)
  var result = -1;
  if(Array.isArray(playerQuestDatas)){
    for (var i = 0; i < playerQuestDatas.length; i++) {
      if(parseInt(playerQuestDatas[i]['quest_master_id']) == parseInt(checkQuestId)){ //クエストIDが一致した
        result = parseInt(playerQuestDatas[i]['step']);
      }
    }
  }
  return result;
}

function G_MAP_UPDATE_QUEST_BOARD(updateQuestData){ //クエストボードを更新する
  if(MAP_QUEST_CELL_ARRAY != null && Array.isArray(MAP_QUEST_CELL_ARRAY)){
    for (var i = 0; i < MAP_QUEST_CELL_ARRAY.length; i++) {
      if(MAP_QUEST_CELL_ARRAY[i] != null){
        MAP_QUEST_CELL_ARRAY[i].remove();
        MAP_QUEST_CELL_ARRAY[i] = null;
        G_UI_WINDOW_LIST_DELETE(); //リストを削除
        G_MAP_CREATE_QUEST_BOARD(updateQuestData); //クエストボードを作成
      }
    }
  }
}

function G_MAP_CREATE_QUEST_INFO(parentBase,playerActiveQuestMasterData,questDropData,questStatus){ //クエスト詳細画面を表示
  //マスク
  MAP_QUEST_INFO_WINDOW = Sprite('ASSET_64').addChildTo(parentBase);
  //ウィンドウ本体
  MAP_QUEST_INFO_WINDOW['window'] = Sprite('ASSET_160').addChildTo(MAP_QUEST_INFO_WINDOW);
  //クエスト名(ウィンドウタイトル)
  MAP_QUEST_INFO_WINDOW['window_title'] = Label({
    text: playerActiveQuestMasterData['quest_name'],
    fontSize: 55,
    fill: 'white',
    align: 'center',
  }).addChildTo(MAP_QUEST_INFO_WINDOW['window']);
  MAP_QUEST_INFO_WINDOW['window_title'].y = MAP_QUEST_INFO_WINDOW['window_title'].y - (MAP_QUEST_INFO_WINDOW['window'].height / 2.75);
  //依頼人名、クエスト説明、クエスト報酬
  MAP_QUEST_INFO_WINDOW['window_quest_text'] = LabelArea({
    width: 512,
    height: 576,
    text: "",
    fontSize: 20,
    fill: 'white',
    align: 'left',
    verticalAlign: 'top',
  }).addChildTo(MAP_QUEST_INFO_WINDOW['window']);
  //MAP_QUEST_INFO_WINDOW['window_quest_text'].x = MAP_QUEST_INFO_WINDOW['window_quest_text'].x + (MAP_QUEST_INFO_WINDOW['window'].width / 2.35);
  //MAP_QUEST_INFO_WINDOW['window_quest_text'].y = MAP_QUEST_INFO_WINDOW['window_quest_text'].y - (MAP_QUEST_INFO_WINDOW['window'].height / 10);
  var questDropText = "";
  for (var i = 0; i < questDropData['drop_item_datas'].length; i++) {
    var addText = questDropData['drop_item_datas'][i]['item_name'] + " × " + questDropData['drop_item_datas'][i]['item_num'] + "\n";
    questDropText = questDropText + addText;
  }
  var replaceQuestText = playerActiveQuestMasterData['quest_text'];
  var questConditionText = G_MAP_GET_QUEST_CONDITION_TEXT(2,playerActiveQuestMasterData['quest_condition'],playerActiveQuestMasterData,questStatus);
  var resultQuestText = "依頼人:" + playerActiveQuestMasterData['quest_order_name'] + "\n" + questConditionText + replaceQuestText.replace(/¥n/g,'\n') + "\n■クエスト報酬\n" + questDropText + "\n※確率で出現する報酬内容となります";
  MAP_QUEST_INFO_WINDOW['window_quest_text'].text = resultQuestText;
  //閉じるボタン画像
  MAP_QUEST_INFO_WINDOW['close_btn_spr'] = Sprite('ASSET_120').addChildTo(MAP_QUEST_INFO_WINDOW['window']);
  MAP_QUEST_INFO_WINDOW['close_btn_spr'].y = MAP_QUEST_INFO_WINDOW['close_btn_spr'].y + (MAP_QUEST_INFO_WINDOW['window'].height / 2.75);
  //閉じるボタンテキスト
  MAP_QUEST_INFO_WINDOW['close_btn_text'] = Label({
    text: "閉じる",
    fontSize: 40,
    fill: 'black',
    align: 'center',
    verticalAlign: 'top',
  }).addChildTo(MAP_QUEST_INFO_WINDOW['close_btn_spr']);
  //閉じるボタン本体
  MAP_QUEST_INFO_WINDOW['close_btn'] = Button({
    width: MAP_QUEST_INFO_WINDOW['close_btn_spr'].width,         // 横サイズ
    height: MAP_QUEST_INFO_WINDOW['close_btn_spr'].height,        // 縦サイズ
  }).addChildTo(MAP_QUEST_INFO_WINDOW['close_btn_spr']);
  MAP_QUEST_INFO_WINDOW['close_btn'].visible = false;
  MAP_QUEST_INFO_WINDOW['close_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
      //詳細ウィンドウを削除
      if(MAP_QUEST_INFO_WINDOW != null) {
        MAP_QUEST_INFO_WINDOW.remove();
        MAP_QUEST_INFO_WINDOW = null;
      }
    }
  };
}

function G_MAP_CREATE_QUEST_ORDER_WINDOW(parentBase,playerActiveQuestMasterData){ //クエスト受注ウィンドウを生成する。
  MAP_PLAYER_SELECT_ORDER_QUEST_ID = playerActiveQuestMasterData['id'];
  G_NORMAL_WINDOW_CREATE(parentBase,"クエスト受注","以下のクエストを開始します。\nよろしいですか？\n" + playerActiveQuestMasterData['quest_name'],1,"questOrderWindow");
}

function G_MAP_GET_QUEST_CONDITION_TEXT(getType,questConditionData,questMasterData,questStatus){ //クエスト条件のテキストを生成する getType = 1:クエストボード用 2:詳細画面用
  var resultText = "";
  if(getType == 1) resultText = "達成条件:";
  if(getType == 2) resultText = "■達成条件\n";
  if(Array.isArray(questConditionData)){
    for (var i = 0; i < questConditionData.length; i++) {
      if(isset(questConditionData[i]['enemy_master_data']) && questConditionData[i]['enemy_master_data'] != false){
        var playerKillCount = 0; //プレイヤーが倒したエネミーの数
        var conditionKillCount = questConditionData[i]['enemy_count']; //達成条件の討伐数
        //プレイヤーの進行中クエスト情報があった場合
        if(isset(questConditionData[i]['player_sub_due_quest_data']) && questConditionData[i]['player_sub_due_quest_data'] != false){
          playerKillCount = questConditionData[i]['player_sub_due_quest_data']['enemy_count'];
        }
        //既にクエストが完了していた場合
        if(questStatus == 1) playerKillCount = conditionKillCount;
        var killCountText = "(" + playerKillCount + "/" + conditionKillCount + ")";
        var enemyMasterData = questConditionData[i]['enemy_master_data'];
        resultText = resultText + enemyMasterData['enemy_name'] + " " + questConditionData[i]['enemy_count'] + "体の討伐" + killCountText;
        if(getType == 2) resultText = resultText + "\n";
        if(getType == 1) break; //クエストボード用は1行だけ
      }
    }
  }
  return resultText;
}

function G_MAP_QUEST_CLEAR_ANIM_START(parentBase){ //クエストクリア演出を開始する。
  MAP_IS_ANIMATION  = true; //アニメーションをオンに
  //マスクを生成
  MAP_QUEST_CLEAR_ANIM_OBJ = Sprite('ASSET_64').addChildTo(parentBase);
  //アニメーション画像を表示
  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite'] = Sprite('ASSET_161',640,640).addChildTo(MAP_QUEST_CLEAR_ANIM_OBJ);
  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite'].setFrameIndex(0);
  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['max_frame_count'] = 40;
  MAP_QUEST_CLEAR_ANIM_OBJ['anim_sprite']['frame_count_now'] = 0; //現在再生中のフレームカウント
}

function G_MAP_GET_QUEST_CLEAR_INFO(questMasterId){ //報告結果をサーバーから取得する。
  var questClearPostParam = new Object();
  questClearPostParam['set_clear_quest_master_id'] = questMasterId; //選択中のクエストIDを設定
  NETWORK_IS_CONNECTING = true;
  ajaxStart("post","json","../../client/map/map.php",questClearPostParam); //非同期通信開始
}

function G_MAP_CREATE_QUEST_REWARD_LIST(parentBase,dropItemData){ //クエスト報酬のリストを生成する。
  G_UI_WINDOW_LIST_DELETE(); //既に表示冴えているリストを削除
  if(Array.isArray(dropItemData)){
    var resultText = "";
    for (var i = 0; i < dropItemData.length; i++) {
      var addText = dropItemData[i]['drop_item_name'] + " × " + dropItemData[i]['drop_val'] + "\n";
      resultText = resultText + addText;
    }
    var rewardListLabel = Label({
      text: "",
      fontSize: 36,
      fill: 'white',
    });
    rewardListLabel.text = resultText;
    if(resultText == "") resultText = "\n\n\n\n\n\n獲得した報酬はありません";
    G_UI_CREATE_LIST(parentBase,rewardListLabel,rewardListLabel.calcCanvasHeight(),"クエスト報酬","閉じる"); //リストを表示
  }
}

function G_MAP_ADD_AVATAR_DATAS(addAvatarData){ //アバターデータを配列に追加する
  //正常な値か検証
  if(isset(addAvatarData['player_avatar_data'])){
    var addCheckFlag = true;
    for (var i = 0; i < MAP_AVATAR_DATAS.length; i++) {
      if(MAP_AVATAR_DATAS[i]['player_avatar_data']['avatar_hash'] == addAvatarData['player_avatar_data']['avatar_hash']){
        addCheckFlag = false;
      }
    }
    if(addCheckFlag == true){ //追加の必要があった場合
      MAP_AVATAR_DATAS[MAP_AVATAR_DATAS.length] = addAvatarData;
      //MAP_AVATAR_DATAS = MAP_AVATAR_DATAS.concat(addAvatarData);
    }
    console.log("追加したアバター");
    console.log(MAP_AVATAR_DATAS);
  }
}

function G_MAP_MOVE_AVATAR(moveScreenDirection){ //アバターを移動させる
  //MAP_MY_AVATAR.alpha = 0;
  G_MAP_START_FOOT_PRINT_ANIM(MAP_MY_AVATAR,MAP_MAP_SCENE_MY_AVATAR_LAYER); //足跡アニメーション開始
  var moveX = MAP_MY_AVATAR.x;
  var moveY = MAP_MY_AVATAR.y;
  // if(MAP_MY_AVATAR['avatar_reflect'] == true){
  //   MAP_MY_AVATAR['avatar_reflect'] = false;
  //   MAP_MY_AVATAR.scaleX *= -1;
  // }
  switch (parseInt(moveScreenDirection)) {
    case 1: //上
    {
      moveX = MAP_MY_AVATAR_POS_ARRAY['bottom'].x;
      moveY = MAP_MY_AVATAR_POS_ARRAY['bottom'].y;
      MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['bottom'].x;
      MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['bottom'].y + MAP_MY_AVATAR.height;
      MAP_MY_AVATAR.avatarControle("walk_back",0);
    }
    break;
    case 2: //右
    {
      moveX = MAP_MY_AVATAR_POS_ARRAY['right'].x;
      moveY = MAP_MY_AVATAR_POS_ARRAY['right'].y;
      MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['right'].x - MAP_MY_AVATAR.width;
      MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['right'].y;
      MAP_MY_AVATAR.avatarControle("walk_right",0);
    }
    break;
    case 3: //下
    {
      moveX = MAP_MY_AVATAR_POS_ARRAY['top'].x;
      moveY = MAP_MY_AVATAR_POS_ARRAY['top'].y;
      MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['top'].x;
      MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['top'].y - MAP_MY_AVATAR.height;
      MAP_MY_AVATAR.avatarControle("walk_front",0);
    }
    break;
    case 4: //左
    {
      moveX = MAP_MY_AVATAR_POS_ARRAY['left'].x;
      moveY = MAP_MY_AVATAR_POS_ARRAY['left'].y;
      MAP_MY_AVATAR.x = MAP_MY_AVATAR_POS_ARRAY['left'].x + MAP_MY_AVATAR.width;
      MAP_MY_AVATAR.y = MAP_MY_AVATAR_POS_ARRAY['left'].y;
      MAP_MY_AVATAR.avatarControle("walk_left",0);
    }
    break;
    default:
    break;
  }
  MAP_MY_AVATAR['avatar_move'] = true;
  MAP_MY_AVATAR.tweener.moveTo(moveX, moveY, 500).play();
  MAP_MY_AVATAR.tweener.call(function(){
    MAP_MY_AVATAR['avatar_move'] = false;
    if(isset(MAP_MY_AVATAR['foot_print_anim_base']) && isset(MAP_MY_AVATAR['foot_print_anim_base']['foot_print_anim_visible'])){
      MAP_MY_AVATAR['foot_print_anim_base']['foot_print_anim_visible'] = false;
      if(MAP_MY_AVATAR['active_avatar_name'] == "walk_left") MAP_MY_AVATAR.avatarControle("equip_left",1);
      else if(MAP_MY_AVATAR['active_avatar_name'] == "walk_right") MAP_MY_AVATAR.avatarControle("equip_right",1);
      else MAP_MY_AVATAR.avatarControle(MAP_MY_AVATAR['active_avatar_name'],1);
    }
  });
}

function G_MAP_CREATE_CONTROLE_AVATAR(parentBase,playerAvatar,posX,posY,playerName,activeAvatarName){ //操作用のアバターを生成する
  //当たり判定用の土台を生成
  MAP_CONTROLE_AVATAR = Sprite('ASSET_180').addChildTo(parentBase);
  MAP_CONTROLE_AVATAR.x = posX;
  MAP_CONTROLE_AVATAR.y = posY;
  //プレイヤーアバター生成
  var playerAvatarData = null;
  var playerEquipItemDatas = null;
  var avatarAnimRunMasterData = null;
  var playerIndexId = MAP_PLAYER_INFO['player_index_id'];
  for (var i = 0; i < MAP_AVATAR_DATAS.length; i++) {
    if(MAP_AVATAR_DATAS[i]['player_avatar_data']['player_index_id'] == playerIndexId){
      playerAvatarData = MAP_AVATAR_DATAS[i]['player_avatar_data'];
      playerEquipItemDatas = MAP_AVATAR_DATAS[i]['player_equip_item_datas'];
      break;
    }
  }
  if(playerAvatarData != null){
    MAP_CONTROLE_AVATAR['avatar_anim'] = G_AVATAR_SPRITE_DISP(playerAvatarData,playerEquipItemDatas,0.2);
    MAP_CONTROLE_AVATAR['avatar_anim'].addChildTo(MAP_CONTROLE_AVATAR);
    MAP_CONTROLE_AVATAR['avatar_anim'].avatarControle(activeAvatarName,1);
    MAP_CONTROLE_AVATAR['avatar_anim'].y = MAP_CONTROLE_AVATAR['avatar_anim'].y - MAP_CONTROLE_AVATAR.height;
    //各種必要なアバターアニメ情報を設定
    // MAP_CONTROLE_AVATAR['avatar_anim']['avatar_master_data'] = playerAvatar['avatar_master_data'];
    // MAP_CONTROLE_AVATAR['avatar_anim']['stay_anim_data'] = playerAvatar['stay_anim_data'];
    // MAP_CONTROLE_AVATAR['avatar_anim']['run_anim_data'] = playerAvatar['run_anim_data'];
    //MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] = avatarReflect;
    MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'] = G_MAP_CREATE_AVATAR_NAME_FRAME(playerName);
    MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].addChildTo(MAP_CONTROLE_AVATAR['avatar_anim']);
    MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].y = MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].y - 48;
    MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'] = G_UI_CREATE_MESSAGE_WINDOW(" ");
    MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].addChildTo(MAP_CONTROLE_AVATAR['avatar_anim']);
    MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].y = MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].y - 48;
    MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].visible = false;
    MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_active_count'] = 0;
    // if(MAP_CONTROLE_AVATAR['avatar_anim']['active_avatar_name'] == "equip_left"){
    //   MAP_CONTROLE_AVATAR['avatar_anim'].scaleX *= -1;
    //   MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].scaleX *= -1;
    //   MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].scaleX *= -1;
    // }
    //操作アバターupdate処理
    MAP_CONTROLE_AVATAR.update = function() {
      //チャットウィンドウ削除確認
      if(0 < this['avatar_anim']['chat_message_active_count']) this['avatar_anim']['chat_message_active_count'] -= PHINA_APP.deltaTime;
      if(this['avatar_anim']['chat_message_active_count'] <= 0){
        this['avatar_anim']['chat_message_active_count'] = 0;
        this['avatar_anim']['chat_message_window'].visible = false;
      }
      //ルームチャットの発言が発生した。
      if(LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'] != "" || LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id'] != 0){
        G_UI_UPDATE_MESSAGE_WINDOW(this['avatar_anim']['chat_message_window'],LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'],LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id']);
        this['avatar_anim']['chat_message_window'].visible = true;
        LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['chat_text'] = "";
        LAST_SEND_PLAYER_ROOM_CHAT_MESSAGE['stamp_id'] = 0;
        this['avatar_anim']['chat_message_active_count'] = 5000; //5秒間表示
      }
      //ギルドチャットの発言が発生した。
      if(LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'] != "" || LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id'] != 0){
        G_UI_UPDATE_MESSAGE_WINDOW(this['avatar_anim']['chat_message_window'],LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'],LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id']);
        this['avatar_anim']['chat_message_window'].visible = true;
        LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['chat_text'] = "";
        LAST_SEND_GUILD_ROOM_CHAT_MESSAGE['stamp_id'] = 0;
        this['avatar_anim']['chat_message_active_count'] = 5000; //5秒間表示
      }
    };
  }
}

function G_MAP_CHANGE_CONTROLE_BUTTON(controleBtn,mode){ //操作モードを変更する mode:0 デフォルト mode:1 マップ操作 mode:2 キャラクター操作
  if(controleBtn != null){
    MAP_IS_CONTROLE_BTN_MODE = mode; //モードを設定
    switch (mode) {
      case 0: //デフォルト
      {
        controleBtn['sprite_map_controle'].visible = false;
        controleBtn['sprite_player_controle'].visible = false;
      }
      break;
      case 1: //マップ移動モード
      {
        controleBtn['sprite_map_controle'].visible = false;
        controleBtn['sprite_player_controle'].visible = true;
      }
      break;
      case 2: //プレイヤーコントロール
      {
        controleBtn['sprite_map_controle'].visible = true;
        controleBtn['sprite_player_controle'].visible = false;
      }
      break;
      default:
      break;
    }
  }
}

function G_MAP_AVATAR_MOVE(direction){ //操作自キャラアバター移動
  var speed = 7; //移動量
  var collisionResult = G_MAP_COLLISION_CHECK(MAP_CONTROLE_AVATAR,MAP_COLLISION_BOXS);
  var isMove = false;//移動が行われたか
  switch (direction) {
    case 1: //上
    {
      if(collisionResult['checkTop'] == false) break;
      MAP_CONTROLE_AVATAR.y = MAP_CONTROLE_AVATAR.y - speed;
      isMove = true;
    }
    break;
    case 2: //右
    {
      if(collisionResult['checkRight'] == false) break;
      // if(MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] == true) {
      //   MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] = false;
      //   MAP_CONTROLE_AVATAR['avatar_anim'].scaleX *= -1;
      //   MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].scaleX *= -1;
      //   MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].scaleX *= -1;
      // }
      MAP_CONTROLE_AVATAR.x = MAP_CONTROLE_AVATAR.x + speed;
      isMove = true;
    }
    break;
    case 3: //下
    {
      if(collisionResult['checkBottom'] == false) break;
      MAP_CONTROLE_AVATAR.y = MAP_CONTROLE_AVATAR.y + speed;
      isMove = true;
    }
    break;
    case 4: //左
    {
      if(collisionResult['checkLeft'] == false) break;
      // if(MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] == false) {
      //   MAP_CONTROLE_AVATAR['avatar_anim']['avatar_reflect'] = true;
      //   MAP_CONTROLE_AVATAR['avatar_anim'].scaleX *= -1;
      //   MAP_CONTROLE_AVATAR['avatar_anim']['chat_message_window'].scaleX *= -1;
      //   MAP_CONTROLE_AVATAR['avatar_anim']['player_name_label'].scaleX *= -1;
      // }
      MAP_CONTROLE_AVATAR.x = MAP_CONTROLE_AVATAR.x - speed;
      isMove = true;
    }
    break;
    default:
    break;
  }
  if(isMove == true){ //移動が行われた場合
    MAP_AVATAR_CONTROLE_LAST_DIRECTION = direction;
    MAP_AVATAR_MOVE_POS = MAP_AVATAR_MOVE_POS + speed;
  }
  else if(MAP_AVATAR_MOVE_POS != 0){ //ぶつかった場合
    G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(); //操作ログを記録
  }
}

function G_MAP_ADD_CONTROLE_AVATAR_ACTION_LIST(){ //操作ログを記録する
  var direcitonLength = MAP_CONTROLE_AVATAR_ACTION_LIST['direction_list'].length;
  var movePosLenght = MAP_CONTROLE_AVATAR_ACTION_LIST['move_pos_list'].length;
  var actionTimeStampLength = MAP_CONTROLE_AVATAR_ACTION_LIST['action_time_stamp_list'].length;
  var actionStartPosXLength = MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_x'].length;
  var actionStartPosYLength = MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_y'].length;
  if(MAP_AVATAR_MOVE_POS != 0){ //移動が行われていた場合
    MAP_CONTROLE_AVATAR_ACTION_LIST['direction_list'][direcitonLength] = MAP_AVATAR_CONTROLE_LAST_DIRECTION;
    MAP_CONTROLE_AVATAR_ACTION_LIST['move_pos_list'][movePosLenght] = MAP_AVATAR_MOVE_POS;
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_time_stamp_list'][actionTimeStampLength] = MAP_CONTROLE_AVATAR_ACTION_START_TIME_STAMP;
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_x'][actionStartPosXLength] = MAP_AVATAR_ACTION_START_POS_X;
    MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_y'][actionStartPosYLength] = MAP_AVATAR_ACTION_START_POS_Y;
    MAP_AVATAR_MOVE_POS = 0; //進行量を初期化
  }
}

function G_MAP_PLAYER_ROOM_INIT(playerRoomData,mapAvatarDatas,myPlayerIndexId){ //プレイヤールームの初期化を行う
  playerRoomData['player_avatar_datas'] = new Array(); //アバター情報格納配列生成
  for (var i = 0; i < playerRoomData['player_room_datas'].length; i++) {
    var rowPlRoomData = playerRoomData['player_room_datas'][i];
    if(rowPlRoomData['player_index_id'] != myPlayerIndexId){ //自分自身ではない
      var playerAvatarData = null;
      var playerEquipItemDatas = null;
      for (var ad = 0; ad < mapAvatarDatas.length; ad++) {
        if(mapAvatarDatas[ad]['player_avatar_data']['avatar_hash'] == rowPlRoomData['player_avatar_hash']){ //プレイヤーのアバターと一致した場合
          playerAvatarData = mapAvatarDatas[ad]['player_avatar_data'];
          playerEquipItemDatas = mapAvatarDatas[ad]['player_equip_item_datas'];
          break;
        }
      }
      if(playerAvatarData != null){ //アバターデータ正常
        playerRoomData['player_avatar_datas'][playerRoomData['player_avatar_datas'].length] = Sprite('ASSET_180').addChildTo(MAP_MAP_LAYER_CHARA);
        var setAvatar = playerRoomData['player_avatar_datas'][playerRoomData['player_avatar_datas'].length - 1];
        setAvatar.x = parseInt(rowPlRoomData['room_pos_x']);
        setAvatar.y = parseInt(rowPlRoomData['room_pos_y']);
        G_MAP_CREATE_OTHER_PLAYER_AVATAR(setAvatar,playerAvatarData,playerEquipItemDatas,rowPlRoomData); //他者のアバターを表示
      }
    }
  }
}

function G_MAP_PLAYER_ROOM_UPDATE(playerRoomInstance){ //プレイヤールームを更新する。
  if(NETWORK_IS_CONNECTING == true) return;
  if(playerRoomInstance == null) return;
  var playerRoomPostParam = new Object();
  playerRoomPostParam['player_room_update'] = new Object();
  playerRoomPostParam['player_room_update']['room_pos'] = new Object();
  playerRoomPostParam['player_room_update']['room_pos']['room_pos_x'] = MAP_CONTROLE_AVATAR.x;
  playerRoomPostParam['player_room_update']['room_pos']['room_pos_y'] = MAP_CONTROLE_AVATAR.y;
  playerRoomPostParam['player_room_update']['map_event_trigger_id'] = playerRoomInstance['map_event_trigger']['trigger_id']; //進行中のプレイヤールームのトリガーIDを設定
  playerRoomPostParam['player_room_update']['check_avatar_datas'] = MAP_AVATAR_DATAS;
  playerRoomPostParam['player_room_update']['avatar_action_data'] = MAP_CONTROLE_AVATAR_ACTION_LIST; //アバター行動ログを設定
  playerRoomPostParam['player_room_update']['player_room_change'] = MAP_PLAYER_ROOM_CHANGE; //プレイヤールーム同士の移動があったか
  if(MAP_GILD_HOME_GILD_ID != -1) playerRoomPostParam['player_room_is_guild_room'] = 0;
  NETWORK_IS_CONNECTING = true;
  ajaxStart("post","json","../../client/map/map.php",playerRoomPostParam); //非同期通信開始
  //アクションリスト配列を初期化
  //MAP_CONTROLE_AVATAR_ACTION_LIST = new Object();
  MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_x'] = new Array();
  MAP_CONTROLE_AVATAR_ACTION_LIST['action_start_pos_y'] = new Array();
  MAP_CONTROLE_AVATAR_ACTION_LIST['direction_list'] = new Array();
  MAP_CONTROLE_AVATAR_ACTION_LIST['move_pos_list'] = new Array();
  MAP_CONTROLE_AVATAR_ACTION_LIST['action_time_stamp_list'] = new Array();
}

function G_MAP_PLAYER_ROOM_AVATAR_UPDATE(resultUpdatePlayerRoomData,activePlayerRoomInstance,serverRequestDttm,mapAvatarDatas){ //プレイヤールームに居るアバターを更新する
  //ログアウトしたプレイヤーが存在するかチェック
  if(serverRequestDttm != null){
    var nowTimeStamp = moment().unix();
    var tmpMapActivePlayerRoomInstance = activePlayerRoomInstance['player_room_datas'].concat(); //削除更新後の表示されているプレイヤーデータ配列
    var tmpMapActivePlayerAvatarDatas = activePlayerRoomInstance['player_avatar_datas'].concat(); //削除更新後の表示されているアバターデータ配列
    var newMapActivePlayerRoomInstance = new Array();
    var newMapActivePlayerAvatarDatas = new Array();
    for (var i = 0; i < tmpMapActivePlayerRoomInstance.length; i++) {
      var playerIndexId = tmpMapActivePlayerRoomInstance[i]['player_index_id'];
      var updateTime = tmpMapActivePlayerRoomInstance[i]['update_time'];
      //Data型が扱えるように整形
      updateTime = moment(updateTime).unix();
      var resultWaitTime = nowTimeStamp - updateTime;
       console.log("離脱時間");

       console.log(String(resultWaitTime));
      if(180 < resultWaitTime){ //3分以上を離脱時間とする
        //除外
        for (var pla = 0; pla < tmpMapActivePlayerAvatarDatas.length; pla++) {
          var avatarAnim = tmpMapActivePlayerAvatarDatas[pla]['avatar_anim'];
          if(avatarAnim['player_index_id'] == playerIndexId){ //削除対象のアバターだった
            avatarAnim.remove(); //アバター削除
            console.log("削除したplayer_index_id:" + avatarAnim['player_index_id']);
            avatarAnim = null;
            break;
          }
        }
      }
      else{ //そのまま
        //残すプレイヤーアバター取得
        for (var pla = 0; pla < tmpMapActivePlayerAvatarDatas.length; pla++) {
          if(tmpMapActivePlayerRoomInstance[i]['player_index_id'] == tmpMapActivePlayerAvatarDatas[pla]['avatar_anim']['player_index_id']){
            newMapActivePlayerAvatarDatas[newMapActivePlayerAvatarDatas.length] = tmpMapActivePlayerAvatarDatas[pla];
            break;
          }
        }
        newMapActivePlayerRoomInstance[newMapActivePlayerRoomInstance.length] = tmpMapActivePlayerRoomInstance[i];
      }
    }
    activePlayerRoomInstance['player_room_datas'] = new Array();
    activePlayerRoomInstance['player_avatar_datas'] = new Array();
    activePlayerRoomInstance['player_room_datas'] = newMapActivePlayerRoomInstance;
    activePlayerRoomInstance['player_avatar_datas'] = newMapActivePlayerAvatarDatas;

    var addPlayerRoomDataArray = new Array();
    //レスポンスが現在のプレイヤールームに居るかチェック
    if(activePlayerRoomInstance['map_event_trigger']['trigger_id'] != resultUpdatePlayerRoomData['map_event_trigger_id']) return;
    for (var i = 0; i < resultUpdatePlayerRoomData['player_room_datas'].length; i++) {
      var addPlayerRoomData = null; //追加するプレイヤールームデータ
      var resultPlRoomData = resultUpdatePlayerRoomData['player_room_datas'][i];
      var activeInstancePlRoom = null; //インスタンスに存在するプレイヤールームデータ
      if(resultPlRoomData['player_index_id'] == MAP_PLAYER_INFO['player_index_id']) continue; //自分の場合は実行禁止
      for (var plr = 0; plr < activePlayerRoomInstance['player_room_datas'].length; plr++) {
        var activePlRoom = activePlayerRoomInstance['player_room_datas'][plr];
        if(activePlRoom['player_index_id'] == resultPlRoomData['player_index_id']){
          activeInstancePlRoom = activePlRoom;
          break;
        }
      }
      var playerCheck = false; //既に表示しているプレイヤーがチェック
      var avatarCheck = true; //既に表示されているプレイヤーでアバターが変更されていないかチェックを行う
      for (var pla = 0; pla < activePlayerRoomInstance['player_avatar_datas'].length; pla++) {
        var playerAvatar = activePlayerRoomInstance['player_avatar_datas'][pla];
        if(playerAvatar['avatar_anim'] != null && playerAvatar['avatar_anim']['player_index_id'] == resultPlRoomData['player_index_id']){
          if(playerAvatar['avatar_anim']['player_avatar_data']['avatar_hash'] != resultPlRoomData['player_avatar_hash']){
            avatarCheck = false;
          }
          playerCheck = true; //アクティブインスタンスにプレイヤーが存在した
          break;
        }
      }
      //時間チェック
      var updateTimeCheck = true;
      var updateTime = resultPlRoomData['update_time'];
      var updateTimeStamp = moment(resultPlRoomData['update_time']).unix();
      var resultWaitTime = nowTimeStamp - updateTimeStamp;
      if(180 < resultWaitTime){ //時間切れ
        updateTimeCheck = false;
      }
      if(avatarCheck == false){ //アバターの変更があった。

      }
      if(updateTimeCheck == true){ //時間チェックが正常
        if(playerCheck == false){ //プレイヤーを新しく表示する必要がある
          addPlayerRoomDataArray[addPlayerRoomDataArray.length] = resultPlRoomData; //プレイヤールームデータを追加
          actionFlag = true;
          var playerAvatarData = null;
          var playerEquipItemDatas = null;
          var avatarAnimMasterDatas = null;
          var avatarAnimStayData = null;
          var avatarAnimRunData = null;
          for (var mad = 0; i < mapAvatarDatas.length; mad++) {
            if(mapAvatarDatas[mad]['player_avatar_data']['avatar_hash'] == resultPlRoomData['player_avatar_hash']){ //アバターが一致した
              playerAvatarData = mapAvatarDatas[mad]['player_avatar_data'];
              playerEquipItemDatas = mapAvatarDatas[mad]['player_equip_item_datas'];
              break;
            }
          }
          if(playerAvatarData != null){ //アバターデータ正常
            activePlayerRoomInstance['player_avatar_datas'][activePlayerRoomInstance['player_avatar_datas'].length] = Sprite('ASSET_180').addChildTo(MAP_MAP_LAYER_CHARA);
            var setAvatar = activePlayerRoomInstance['player_avatar_datas'][activePlayerRoomInstance['player_avatar_datas'].length - 1];
            setAvatar.x = parseInt(resultPlRoomData['room_pos_x']);
            setAvatar.y = parseInt(resultPlRoomData['room_pos_y']);
            console.log("表示した他者アバター：" + playerAvatarData['player_index_id']);
            G_MAP_CREATE_OTHER_PLAYER_AVATAR(setAvatar,playerAvatarData,playerEquipItemDatas,resultPlRoomData); //他者のアバターを表示
          }
        }
        if(playerCheck == true){ //プレイヤーアクションの登録
          var actionFlag = true; //アクション実行か
          if(activeInstancePlRoom != null){
            //前回実行したアクションとは異なっているか。

            if(activeInstancePlRoom['action_start_time_stamp'] == resultPlRoomData['action_start_time_stamp']) actionFlag = false;
            else{
              activeInstancePlRoom['action_start_time_stamp'] = resultPlRoomData['action_start_time_stamp'];
            }
          }
          if(actionFlag == true){ //アクション実行可能
            var plAvatar = null; //プレイヤーのアバターデータ
            for (var abd = 0; abd < activePlayerRoomInstance['player_avatar_datas'].length; abd++) {
              var rowAvatar = activePlayerRoomInstance['player_avatar_datas'][abd];
              if(rowAvatar['avatar_anim']['player_avatar_data']['avatar_hash'] == resultPlRoomData['player_avatar_hash']){
                plAvatar = rowAvatar;
                break;
              }
            }
            if(plAvatar != null){ //アバターデータが取得出来た
              var actionStartPosXList = resultPlRoomData['action_start_pos_x_list'].split(',');
              var actionStartPosYList = resultPlRoomData['action_start_pos_y_list'].split(',');
              var actionDirectionList = resultPlRoomData['action_direction_list'].split(',');
              var actionMovePosList = resultPlRoomData['action_move_pos_list'].split(',');
              var actionWaitTimeList = resultPlRoomData['action_wait_time_list'].split(',');
              var reflectFlag = false;
              for (var a = 0; a < actionWaitTimeList.length; a++) {
                var moveX = 0;
                var moveY = 0;
                var movePos = parseInt(actionMovePosList[a]);
                switch (parseInt(actionDirectionList[a])) { //方向によって移動量を決定
                  case 1:
                  moveY = (movePos * -1);
                  break;
                  case 2:
                  moveX = movePos;
                  break;
                  case 3:
                  moveY = movePos;
                  break;
                  case 4:
                  moveX = (movePos * -1);
                  break;
                  default:
                  break;
                }
                //初期位置を設定
                if(a == 0){
                  plAvatar['avatar_anim']['animation_list'] = new Array();
                  plAvatar['avatar_anim']['animation_list_index'] = 0;
                }
                var time = (parseInt(actionMovePosList[a]) / 200) * 1000;
                var animStatusList = new Array();
                animStatusList['move_wait_time'] = time;
                animStatusList['move_pos_x'] = moveX;
                animStatusList['move_pos_y'] = moveY;
                animStatusList['action_start_pos_x'] = actionStartPosXList[a];
                animStatusList['action_start_pos_y'] = actionStartPosYList[a];
                plAvatar['avatar_anim']['animation_list'][a] = animStatusList; //アニメーションリストを生成
                var actionWaitTime = parseInt(actionWaitTimeList[a]) * 100;
                if(a == 0){
                  plAvatar.x = parseInt(animStatusList['action_start_pos_x']);
                  plAvatar.y = parseInt(animStatusList['action_start_pos_y']);
                }
                plAvatar.tweener.wait(actionWaitTime);
                plAvatar.tweener.call(function(){
                  this.target.x = parseInt(this.target.x);
                  this.target.y = parseInt(this.target.y);
                });
                plAvatar.tweener.moveTo(parseInt(animStatusList['action_start_pos_x']),parseInt(animStatusList['action_start_pos_y']),0);
                plAvatar.tweener.call(function(){
                  this.target.x = parseInt(this.target.x);
                  this.target.y = parseInt(this.target.y);
                  this.target['avatar_is_move'] = true;
                  //this.target['avatar_anim'].changeAnimData(this.target['avatar_anim']['avatar_anim_run_data']);
                });
                plAvatar.tweener.moveBy(parseInt(animStatusList['move_pos_x']),parseInt(animStatusList['move_pos_y']),animStatusList['move_wait_time']).play();
                plAvatar.tweener.call(function(){
                  this.target.x = parseInt(this.target.x);
                  this.target.y = parseInt(this.target.y);
                  this.target['avatar_is_move'] = false;
                  //this.target['avatar_anim'].changeAnimData(this.target['avatar_anim']['avatar_anim_stay_data']);
                });
              }
            }
          }
        }
      }
    }
    //追加するプレイヤールームデータ
    for (var i = 0; i < addPlayerRoomDataArray.length; i++) {
      activePlayerRoomInstance['player_room_datas'][activePlayerRoomInstance['player_room_datas'].length] = addPlayerRoomDataArray[i];
    }
  }
}

//プレイヤールームに表示する自分以外のアバターを表示する
//function G_MAP_CREATE_OTHER_PLAYER_AVATAR(setAvatar,avatarMasterData,avatarAnimMasterDatas,avatarAnimStayData,avatarAnimRunData,playerRoomData){
function G_MAP_CREATE_OTHER_PLAYER_AVATAR(setAvatar,playerAvatarData,playerEquipItemDatas,playerRoomData){
  //setAvatar['avatar_anim'] = G_AVATAR_ANIM_DISP(avatarMasterData,avatarAnimStayData,0.75);
  setAvatar['avatar_anim'] = G_AVATAR_SPRITE_DISP(playerAvatarData,playerEquipItemDatas,0.2);
  if(setAvatar['avatar_anim'] != null){ //アバター生成完了
    setAvatar['avatar_anim'].avatarControle("equip_right",1);
    setAvatar['avatar_anim'].addChildTo(setAvatar);
    setAvatar['avatar_anim'].y = setAvatar['avatar_anim'].y - setAvatar.height;
    setAvatar['avatar_anim']['player_index_id'] = playerRoomData['player_index_id'];
    setAvatar['avatar_anim']['player_info'] = playerRoomData;
    setAvatar['avatar_anim']['player_avatar_data'] = playerAvatarData;
    setAvatar['avatar_anim']['player_equip_item_datas'] = playerEquipItemDatas;
    // setAvatar['avatar_anim']['avatar_anim_master_datas'] = avatarAnimMasterDatas;
    // setAvatar['avatar_anim']['avatar_anim_stay_data'] = avatarAnimStayData;
    // setAvatar['avatar_anim']['avatar_anim_run_data'] = avatarAnimRunData;
    //setAvatar['avatar_anim']['avatar_reflect'] = false;
    setAvatar['avatar_anim']['player_name_label'] = G_MAP_CREATE_AVATAR_NAME_FRAME(playerRoomData['player_name']);
    setAvatar['avatar_anim']['player_name_label'].addChildTo(setAvatar['avatar_anim']);
    setAvatar['avatar_anim']['player_name_label'].y = setAvatar['avatar_anim']['player_name_label'].y - 48;
    setAvatar['avatar_anim']['chat_message_window'] = G_UI_CREATE_MESSAGE_WINDOW(" ");
    setAvatar['avatar_anim']['chat_message_window'].addChildTo(setAvatar['avatar_anim']);
    setAvatar['avatar_anim']['chat_message_window'].y = setAvatar['avatar_anim']['chat_message_window'].y - 48;
    setAvatar['avatar_anim']['chat_message_window'].visible = false;
    setAvatar['avatar_anim']['chat_message_active_count'] = 0;
    setAvatar['avatar_anim']['last_chat_message'] = "";
    setAvatar['avatar_anim']['last_chat_stamp_id'] = 0;
    setAvatar['avatar_anim']['last_chat_dttm'] = "";
    setAvatar['avatar_anim']['target_anim'] = Sprite('ASSET_118',64,64).addChildTo(setAvatar);
    setAvatar['avatar_anim']['target_anim'].setFrameIndex(0);
    setAvatar['avatar_anim']['target_anim']['frame_index'] = 0;
    setAvatar['avatar_anim']['target_anim']['frame_count'] = 0;
    setAvatar['avatar_anim']['target_anim'].visible = false;

    //アバターUPDATE関数
    setAvatar['avatar_is_move'] = false;
    setAvatar['avatar_move_start_pos_x'] = 0;
    setAvatar['avatar_move_start_pos_y'] = 0;
    setAvatar['avatar_stop_anim'] = false;
    setAvatar['avatar_direction'] = -1; //0:上 1:右 2:下 3:左
    setAvatar['frame_count'] = 0;
    setAvatar.update = function() {
      //チャットメッセージ表示削除確認処理
      if(0 < this['avatar_anim']['chat_message_active_count']) this['avatar_anim']['chat_message_active_count'] -= PHINA_APP.deltaTime;
      if(this['avatar_anim']['chat_message_active_count'] <= 0){
        this['avatar_anim']['chat_message_active_count'] = 0;
        this['avatar_anim']['chat_message_window'].visible = false;
      }
      if(this['avatar_anim']['target_anim'].visible == true){
         this['avatar_anim']['target_anim']['frame_count'] += PHINA_APP.deltaTime;
         if(100 < this['avatar_anim']['target_anim']['frame_count']){
           this['avatar_anim']['target_anim']['frame_count'] = 0;
           this['avatar_anim']['target_anim']['frame_index'] ++;
           if(8 < setAvatar['avatar_anim']['target_anim']['frame_index']) setAvatar['avatar_anim']['target_anim']['frame_index'] = 0;
           this['avatar_anim']['target_anim'].setFrameIndex(setAvatar['avatar_anim']['target_anim']['frame_index']);
         }
      }
      //フレームカウント
      if(1000 < this['frame_count']){
        this['frame_count'] = 0;
        //チャット発言処理
        var resultChatData = G_MAP_CHECK_PLAYER_ROOM_CHAT(this['avatar_anim']['player_index_id'],MAP_PLAYER_ROOM_CHAT_LOGS,this['avatar_anim']['last_chat_message'],this['avatar_anim']['last_chat_dttm']);
        if(resultChatData['chat_text'] != "" || resultChatData['stamp_id']){ //チャットの発言が存在した。
          if(this['avatar_anim']['last_chat_message'] == resultChatData['chat_text'] && this['avatar_anim']['last_chat_dttm'] == resultChatData['chat_dttm']){
          }
          else{
            this['avatar_anim']['last_chat_message'] = resultChatData['chat_text'];
            this['avatar_anim']['last_chat_stamp_id'] = resultChatData['stamp_id'];
            this['avatar_anim']['last_chat_dttm'] = resultChatData['chat_dttm'];
            G_UI_UPDATE_MESSAGE_WINDOW(this['avatar_anim']['chat_message_window'],this['avatar_anim']['last_chat_message'],this['avatar_anim']['last_chat_stamp_id']);
            this['avatar_anim']['chat_message_window'].visible = true;
            this['avatar_anim']['chat_message_active_count'] = 5000; //5秒間表示
          }
        }
      }
      if(this['avatar_is_move'] == true){
        if(this['avatar_move_start_pos_x'] == 0 || this['avatar_move_start_pos_y'] == 0) {
          this['avatar_move_start_pos_x'] = this.x;
          this['avatar_move_start_pos_y'] = this.y;
        }
        else{
          this['avatar_stop_anim'] = true; //アニメーション停止フラグをオン
          if(this['avatar_move_start_pos_x'] != this.x){
            if(this['avatar_move_start_pos_x'] < this.x){ //右
              this['avatar_direction'] = 1;
              this['avatar_anim'].avatarControle("walk_right",0);
            }
            if(this['avatar_move_start_pos_x'] > this.x){ //左
              this['avatar_direction'] = 3;
              this['avatar_anim'].avatarControle("walk_left",0);
            }
          }
          else if(this['avatar_move_start_pos_y'] != this.y){ //下
            if(this['avatar_move_start_pos_y'] < this.y){
              this['avatar_direction'] = 2;
              this['avatar_anim'].avatarControle("walk_front",0);
            }
            if(this['avatar_move_start_pos_y'] > this.y){ //上
              this['avatar_direction'] = 0;
              this['avatar_anim'].avatarControle("walk_back",0);
            }
          }
        }
      }
      else{
        if(this['avatar_stop_anim'] == true){
          this['avatar_stop_anim'] = false;
          //歩行アニメ終了後の処理
          switch (parseInt(this['avatar_direction'])) {
            case 0: //上
            this['avatar_anim'].avatarControle("walk_back",1);
            break;
            case 1: //右
            this['avatar_anim'].avatarControle("equip_right",1);
            break;
            case 2: //下
            this['avatar_anim'].avatarControle("walk_front",1);
            break;
            case 3: //左
            this['avatar_anim'].avatarControle("equip_left",1);
            break;
            default:
            break;
          }
        }
        this['avatar_move_start_pos_x'] = 0;
        this['avatar_move_start_pos_y'] = 0;
      }
      this['frame_count'] += PHINA_APP.deltaTime;
    };
  }
  else{
    console.log("アバターなし1");
  }
}

//プレイヤールームチャットのチャット発言が行われるかチェックを行う
function G_MAP_CHECK_PLAYER_ROOM_CHAT(playerIndexId,chatLogs,lastChatMessage,lastChatDttm){
  var resultChatData = new Array();
  resultChatData['chat_text'] = "";
  resultChatData['chat_dttm'] = "";
  chatLogs.sort(function(a,b){
    if(a.dttm>b.dttm) return -1;
    if(a.dttm < b.dttm) return 1;
    return 0;
  });
  for (var i = 0; i < chatLogs.length; i++) {
    if(chatLogs[i]['player_index_id'] == playerIndexId){
      //Date型を整形
      chatLogs[i]['dttm'] = G_HELPER_REPLACE_DATE(chatLogs[i]['dttm']);
      var chatDttm = new Date(chatLogs[i]['dttm']);
      var chatTimeStamp = Math.floor( chatDttm.getTime() / 1000 );
      var nowTimeStamp = Math.floor( MAP_SCENE_SERVER_REQUEST_DTTM.getTime() / 1000);
      var resultTimeDiff = parseInt(nowTimeStamp - chatTimeStamp);
      //現在時刻から10秒以内なら発言する。
      if(resultTimeDiff < 30){
        if(lastChatDttm != "" ){
        }
        else if(lastChatDttm ==  chatLogs[i]['dttm'] && lastChatMessage == chatLogs[i]['chat_text']){
          continue; //前回の発言と同じ内容と時間だった。
        }
        resultChatData['chat_text'] = chatLogs[i]['chat_text'];
        resultChatData['stamp_id'] = chatLogs[i]['stamp_id'];
        resultChatData['chat_dttm'] = chatLogs[i]['dttm'];
        break;
      }
    }
  }
  return resultChatData;
}

function G_MAP_WINDOW_CREATE_STAMP_LIST(parentBase,playerStampDatas){ //スタンプリストを表示(クイックチャット)
  for (var i = 0; i < MAP_WINDOW_STAMP_LIST_CELL.length; i++) {
    MAP_WINDOW_STAMP_LIST_CELL[i].remove();
  }
  MAP_WINDOW_STAMP_LIST_CELL = new Array(); //セル情報をを初期化
  var listObj = PlainElement({});
  var listObjHeightSize = 0;
  var cellSizeHeight = 0;
  var countColumn = 0;
  var nowPosY = 0;
  for (var i = 0; i < playerStampDatas.length; i++) {
    MAP_WINDOW_STAMP_LIST_CELL[i] = PlainElement({
      height: 146,
      width: 440,
    }).addChildTo(listObj);//セル画像
    var updateYFlag = false;
    if(i % 3 == 0) updateYFlag = true;
    if(updateYFlag == true){
      listObjHeightSize += MAP_WINDOW_STAMP_LIST_CELL[i].height;
      nowPosY = MAP_WINDOW_STAMP_LIST_CELL[i].y - listObjHeightSize;
    }
    MAP_WINDOW_STAMP_LIST_CELL[i].y = nowPosY;
    cellSizeHeight = MAP_WINDOW_STAMP_LIST_CELL[i].height;
    //スタンプ画像表示
    MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'] = Sprite('ASSET_' + playerStampDatas[i]['stamp_asset_id']).addChildTo(MAP_WINDOW_STAMP_LIST_CELL[i]);//セル画像
    MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].width = MAP_WINDOW_STAMP_LIST_CELL[i].height;
    MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].height = MAP_WINDOW_STAMP_LIST_CELL[i].height;
    //スタンプボタンをを生成
    MAP_WINDOW_STAMP_LIST_CELL[i]['button'] = Button({
      width: MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].width,   // 横サイズ
      height: MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].height, // 縦サイズ
    }).addChildTo(MAP_WINDOW_STAMP_LIST_CELL[i]['stamp']);
    MAP_WINDOW_STAMP_LIST_CELL[i]['button']['stamp_id'] = playerStampDatas[i]['stamp_id'];
    MAP_WINDOW_STAMP_LIST_CELL[i]['button']['stamp_name'] = playerStampDatas[i]['stamp_name'];
    MAP_WINDOW_STAMP_LIST_CELL[i]['button'].onpointstart = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
      MAP_WINDOW_STAMP_LIST_TAP_POS_Y = e.pointer.y;
    };
    MAP_WINDOW_STAMP_LIST_CELL[i]['button'].onpointend = function(e){
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      if(WINDOW_LIST_CLOSE_BUTTON.hitTest(e.pointer.x,e.pointer.y)) return; //閉じるボタンと重なって居た場合反応させない
      if(WINDOW_NORMAL != null || NETWORK_IS_CONNECTING != false) return;
      if(MAP_WINDOW_STAMP_LIST_TAP_POS_Y != e.pointer.y) return;
      MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID = this['stamp_id'];
      MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = this['stamp_name'];
      //スタンプ投稿通信処理開始
      var commPostParamVal = new Object();
      commPostParamVal['set_quick_chat_text'] = MAP_QUICK_CHAT_WINDOW_INPUT_TEXT;
      commPostParamVal['set_quick_chat_stamp_id'] = MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID;
      commPostParamVal['set_quick_chat_player_room_event_trigger_id'] = ACTIVE_PLAYER_ROOM_EVENT_TRIGGER_ID; //イベントのターゲットを設定
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",commPostParamVal); //非同期通信開始
      MAP_QUICK_CHAT_WINDOW_INPUT_TEXT = "";
      MAP_QUICK_CHAT_WINDOW_SELECT_STAMP_ID = -1;

      for (var i = 0; i < MAP_WINDOW_STAMP_LIST_CELL.length; i++) {
        MAP_WINDOW_STAMP_LIST_CELL[i].remove();
      }
      MAP_WINDOW_STAMP_LIST_CELL = new Array(); //セル情報をを初期化
      G_UI_WINDOW_LIST_DELETE();
    };
    MAP_WINDOW_STAMP_LIST_CELL[i]['button'].visible = false;
    switch (countColumn) {
      case 0:
      MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].x = MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].x - MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].width;
      break;
      case 1:
      break;
      case 2:
      MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].x = MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].x + MAP_WINDOW_STAMP_LIST_CELL[i]['stamp'].width;
      break;
      default:
      break;
    }
    countColumn = countColumn + 1;
    if(2 < countColumn){
      countColumn = 0;
    }
  }
  listObj.y = listObj.y + ((listObjHeightSize / 2) + (cellSizeHeight / 2));
  G_UI_CREATE_LIST(parentBase,listObj,listObjHeightSize,"スタンプを選択","閉じる"); //リストを表示
}

function G_MAP_CREATE_AVATAR_NAME_FRAME(playerName){ //アバターに表示するプレイヤー名を作成
  var playerNameLabel = Label({
   text: playerName,
   fontSize: 22,
   fill: 'white',
   align: 'center',
   backgroundColor: 'black',
  });
  return playerNameLabel;
}

function G_MAP_CREATE_MONUMENT_WINDOW(parentBase,playerAttribute,monumentMasterData){ //モニュメントウィンドウを表示する
  if(MAP_MONUMENT_WINDOW == null){
    MAP_MONUMENT_WINDOW = Sprite('ASSET_64').addChildTo(parentBase); //マスク表示
    MAP_MONUMENT_WINDOW['monument_sprite'] = Sprite('ASSET_253').addChildTo(MAP_MONUMENT_WINDOW); //石碑
    MAP_MONUMENT_WINDOW['monument_sprite'].y = MAP_MONUMENT_WINDOW['monument_sprite'].y - (MAP_MONUMENT_WINDOW['monument_sprite'].height / 4);
    MAP_MONUMENT_WINDOW['monument_menu_window'] = Sprite('ASSET_111').addChildTo(MAP_MONUMENT_WINDOW); //メニューウィンドウ
    MAP_MONUMENT_WINDOW['monument_menu_window'].y = MAP_MONUMENT_WINDOW['monument_menu_window'].y + (MAP_MONUMENT_WINDOW['monument_menu_window'].height);
    var fontSpriteTag = "monument_font_" + monumentMasterData['attribute_category_id'];
    MAP_MONUMENT_WINDOW['monument_font_sprite'] = G_ASSET_GET_SPRITE(fontSpriteTag);
    MAP_MONUMENT_WINDOW['monument_font_sprite']['max_alpha'] = G_MAP_GET_MONUMENT_FONT_ANIM_ALPHA(playerAttribute['attribute_' + monumentMasterData['attribute_category_id']]); //最大透明度を取得
    MAP_MONUMENT_WINDOW['monument_font_sprite']['alpha_direction'] = 0; //0:加算 1:減算
    MAP_MONUMENT_WINDOW['monument_font_sprite']['frame_count'] = 0;
    MAP_MONUMENT_WINDOW['monument_font_sprite']['up_alpha'] = G_MAP_GET_MONUMET_FONT_ANIM_PLUS_ALPHA(playerAttribute['attribute_' + monumentMasterData['attribute_category_id']]); //加算する透明度を取得
    MAP_MONUMENT_WINDOW['monument_font_sprite'].alpha = 0;
    MAP_MONUMENT_WINDOW['monument_font_sprite'].update = function() { //フォントアニメーション処理
       this['frame_count'] += PHINA_APP.deltaTime;
       if(10 < this['frame_count']){
         this['frame_count'] = 0;
         console.log(this['up_alpha']);
         if(this['alpha_direction'] == 0){ //加算
           this.alpha = this.alpha + this['up_alpha'];
           if(this['max_alpha'] < this.alpha){
             this.alpha = this['max_alpha'];
             this['alpha_direction'] = 1;
           }
         }
         else{ //減算
           this.alpha = this.alpha - this['up_alpha'];
           if(this.alpha < 0){
             this.alpha = 0;
             this['alpha_direction'] = 0;
           }
         }
       }
    };
    MAP_MONUMENT_WINDOW['monument_font_sprite'].addChildTo(MAP_MONUMENT_WINDOW['monument_sprite']);
    //ボタン1
    MAP_MONUMENT_WINDOW['monument_menu_button_1'] = Sprite('ASSET_252').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
    MAP_MONUMENT_WINDOW['monument_menu_button_1'].y = MAP_MONUMENT_WINDOW['monument_menu_button_1'].y - (MAP_MONUMENT_WINDOW['monument_menu_button_1'].height * 1.25);
    //ボタン1ラベル
    MAP_MONUMENT_WINDOW['monument_menu_button_1_label'] = Label({
     text: "アイテムを捧げる",
     fontSize: 32,
     fill: 'black',
     align: 'center',
   }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_1']);
   //ボタン1本体
   MAP_MONUMENT_WINDOW['monument_menu_button_1_btn'] = Button({
     width: MAP_MONUMENT_WINDOW['monument_menu_button_1'].width,   // 横サイズ
     height: MAP_MONUMENT_WINDOW['monument_menu_button_1'].height, // 縦サイズ
   }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_1']);
   MAP_MONUMENT_WINDOW['monument_menu_button_1_btn'].onpointend = function(e){
     if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
     if(MAP_MONUMENT_WINDOW['monument_comment_window'].visible == true) return;
     if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
       G_ITEM_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_ITEM_DATA,"itemListMonumentWindow");
       console.log("アイテムを捧げる");
      }
   };
    MAP_MONUMENT_WINDOW['monument_menu_button_1_btn'].visible = false;
   //ボタン2
   MAP_MONUMENT_WINDOW['monument_menu_button_2'] = Sprite('ASSET_252').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
   //ボタン2ラベル
   MAP_MONUMENT_WINDOW['monument_menu_button_2_label'] = Label({
    text: "カードを捧げる",
    fontSize: 32,
    fill: 'black',
    align: 'center',
   }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_2']);
   //ボタン2本体
   MAP_MONUMENT_WINDOW['monument_menu_button_2_btn'] = Button({
    width: MAP_MONUMENT_WINDOW['monument_menu_button_2'].width,   // 横サイズ
    height: MAP_MONUMENT_WINDOW['monument_menu_button_2'].height, // 縦サイズ
   }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_2']);
   MAP_MONUMENT_WINDOW['monument_menu_button_2_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(MAP_MONUMENT_WINDOW['monument_comment_window'].visible == true) return;
    if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
      G_CARD_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_CARD_DATA,"cardListMonumentWindow");
      console.log("カードを捧げる");
    }
   };
    MAP_MONUMENT_WINDOW['monument_menu_button_2_btn'].visible = false;
   //ボタン3
   MAP_MONUMENT_WINDOW['monument_menu_button_3'] = Sprite('ASSET_252').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
   MAP_MONUMENT_WINDOW['monument_menu_button_3'].y = MAP_MONUMENT_WINDOW['monument_menu_button_3'].y + (MAP_MONUMENT_WINDOW['monument_menu_button_3'].height * 1.25);
   //ボタン3ラベル
   MAP_MONUMENT_WINDOW['monument_menu_button_3_label'] = Label({
    text: "装備品を捧げる",
    fontSize: 32,
    fill: 'black',
    align: 'center',
  }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_3']);
   //ボタン3本体
   MAP_MONUMENT_WINDOW['monument_menu_button_3_btn'] = Button({
    width: MAP_MONUMENT_WINDOW['monument_menu_button_3'].width,   // 横サイズ
    height: MAP_MONUMENT_WINDOW['monument_menu_button_3'].height, // 縦サイズ
  }).addChildTo(MAP_MONUMENT_WINDOW['monument_menu_button_3']);
   MAP_MONUMENT_WINDOW['monument_menu_button_3_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(MAP_MONUMENT_WINDOW['monument_comment_window'].visible == true) return;
    if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
      G_EQUIP_ITEM_LIST_CREATE(MAP_WINDOW_NODE,MAP_PLAYER_EQUIP_ITEM_DATA,"equipItemListMonumentWindow");
      console.log("装備品を捧げる");
    }
   };
   MAP_MONUMENT_WINDOW['monument_menu_button_3_btn'].visible = false;
  }
  //戻るボタン
  MAP_MONUMENT_WINDOW['back_button'] = Sprite('ASSET_120').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
  MAP_MONUMENT_WINDOW['back_button'].y = MAP_MONUMENT_WINDOW['back_button'].y - ((MAP_MONUMENT_WINDOW['monument_menu_window'].height / 2) + (MAP_MONUMENT_WINDOW['back_button'].height / 2));
  MAP_MONUMENT_WINDOW['back_button'].x = MAP_MONUMENT_WINDOW['back_button'].x + ((MAP_MONUMENT_WINDOW['monument_menu_window'].width / 2) - (MAP_MONUMENT_WINDOW['back_button'].width / 2));
  //戻るボタンラベル
  MAP_MONUMENT_WINDOW['back_button_label'] = Label({
   text: "戻る",
   fontSize: 32,
   fill: 'black',
   align: 'center',
  }).addChildTo(MAP_MONUMENT_WINDOW['back_button']);
  //戻るボタン本体
  MAP_MONUMENT_WINDOW['back_button_btn'] = Button({
   width: MAP_MONUMENT_WINDOW['back_button'].width,   // 横サイズ
   height: MAP_MONUMENT_WINDOW['back_button'].height, // 縦サイズ
  }).addChildTo(MAP_MONUMENT_WINDOW['back_button']);
  MAP_MONUMENT_WINDOW['back_button_btn'].onpointend = function(e){
   if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
   if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
     console.log("戻る");
     MAP_MONUMENT_EVENT_STEP = 5; //モニュメントイベントの終了
     if(MAP_MONUMENT_WINDOW != null){
       MAP_MONUMENT_WINDOW.remove();
       MAP_MONUMENT_WINDOW = null;
     }
   }
  };
  MAP_MONUMENT_WINDOW['back_button_btn'].visible = false;
  //調べるボタン
  MAP_MONUMENT_WINDOW['examine_button'] = Sprite('ASSET_120').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
  MAP_MONUMENT_WINDOW['examine_button'].y = MAP_MONUMENT_WINDOW['examine_button'].y - ((MAP_MONUMENT_WINDOW['monument_menu_window'].height / 2) + (MAP_MONUMENT_WINDOW['examine_button'].height / 2));
  MAP_MONUMENT_WINDOW['examine_button'].x = MAP_MONUMENT_WINDOW['examine_button'].x - ((MAP_MONUMENT_WINDOW['monument_menu_window'].width / 2) - (MAP_MONUMENT_WINDOW['examine_button'].width / 2));
  //調べるボタンラベル
  MAP_MONUMENT_WINDOW['examine_button_label'] = Label({
   text: "調べる",
   fontSize: 32,
   fill: 'black',
   align: 'center',
  }).addChildTo(MAP_MONUMENT_WINDOW['examine_button']);
  //戻るボタン本体
  MAP_MONUMENT_WINDOW['examine_button_btn'] = Button({
   width: MAP_MONUMENT_WINDOW['examine_button'].width,   // 横サイズ
   height: MAP_MONUMENT_WINDOW['examine_button'].height, // 縦サイズ
  }).addChildTo(MAP_MONUMENT_WINDOW['examine_button']);
  MAP_MONUMENT_WINDOW['examine_button_btn']['player_attribute_val'] = playerAttribute['attribute_' + monumentMasterData['attribute_category_id']];
  MAP_MONUMENT_WINDOW['examine_button_btn']['attribute_category_id'] = monumentMasterData['attribute_category_id'];
  MAP_MONUMENT_WINDOW['examine_button_btn'].onpointend = function(e){
   if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
   if(G_MAP_BUTTON_ACTIVE_CHECK() == true && WINDOW_LIST == null && WINDOW_NORMAL == null && LOADING_MASK == null && NETWORK_IS_CONNECTING == false && MAP_IS_ANIMATION == false){
     console.log("調べる");
     var attributeComment = G_MAP_GET_MONUMENT_COMMENT(this['player_attribute_val'],this['attribute_category_id']);
     MAP_MONUMENT_WINDOW['monument_comment_window'].visible = true;
     MAP_MONUMENT_WINDOW['monument_comment_label'].visible = true;
     MAP_MONUMENT_WINDOW['monument_comment_label'].text = attributeComment;
   }
  };
  MAP_MONUMENT_WINDOW['examine_button_btn'].visible = false;
  //モニュメントコメント
  MAP_MONUMENT_WINDOW['monument_comment_window'] = Sprite('ASSET_260').addChildTo(MAP_MONUMENT_WINDOW['monument_menu_window']);
  //モニュメントコメントラベル
  MAP_MONUMENT_WINDOW['monument_comment_label'] = LabelArea({
    width: MAP_MONUMENT_WINDOW['monument_comment_window'].width * 0.9,
    height: MAP_MONUMENT_WINDOW['monument_comment_window'].height * 0.8,
    text: "",
    fontSize: 26,
    fill: 'white',
    align: 'left',
    verticalAlign: 'top',
  }).addChildTo(MAP_MONUMENT_WINDOW['monument_comment_window']);
  MAP_MONUMENT_WINDOW['monument_comment_window'].visible = false;
  //モニュメントコメントボタン
  MAP_MONUMENT_WINDOW['monument_comment_btn'] = Button({
   width: MAP_MONUMENT_WINDOW['monument_comment_window'].width,   // 横サイズ
   height: MAP_MONUMENT_WINDOW['monument_comment_window'].height, // 縦サイズ
  }).addChildTo(MAP_MONUMENT_WINDOW['monument_comment_window']);
  MAP_MONUMENT_WINDOW['monument_comment_btn'].onpointend = function(e){
    if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
    if(MAP_MONUMENT_WINDOW['monument_comment_window'].visible == false) return;
    MAP_MONUMENT_WINDOW['monument_comment_window'].visible = false;
    MAP_MONUMENT_WINDOW['monument_comment_label'].visible = false;
  };
  MAP_MONUMENT_WINDOW['monument_comment_btn'].visible = false;
}

function G_MAP_GET_MONUMENT_COMMENT(attributeVal,attributeCategoryId){ //モニュメントを調べた時のコメントを取得する。
  var result = "";
  var attributeName = "";
  switch (parseInt(attributeCategoryId)) {
    case 0:
    {
      attributeName = "精霊";
    }
    break;
    case 1:
    {
      attributeName = "火の精霊";
    }
    break;
    case 2:
    {
      attributeName = "水の精霊";
    }
    break;
    case 3:
    {
      attributeName = "雷の精霊";
    }
    break;
    case 4:
    {
      attributeName = "闇の精霊";
    }
    break;
    case 5:
    {
      attributeName = "光の精霊";
    }
    break;
    default:
    break;
  }
  //コメント設定
  var baseText = "石碑を調べた。\n" + attributeName + "の気配を感じ取った。\n";
  var power = parseInt(attributeVal);
  if(0 <= power && power <= 50){
    result = baseText + attributeName + "から酷く嫌われているようだ。";
  }
  else if(51 <= power && power <= 99){
    result = baseText + attributeName + "から嫌われているようだ。";
  }
  else if(100 <= power && power <= 150){
    result = baseText + attributeName + "から加護を受けているようだ。";
  }
  else if(151 <= power && power <= 199){
    result = baseText + attributeName + "から強い加護を受けているようだ。";
  }
  else if(200 <= power){
    result = baseText + attributeName + "からとても強い加護を受けているようだ。";
  }
  return result;
}

function G_MAP_GET_MONUMENT_FONT_ANIM_ALPHA(power){ //モニュメントのフォントアニメーションの最大透明度を取得
  var resultAlpha = 0;
  if(0 <= power && power <= 50){
    resultAlpha = 0;
  }
  else if(51 <= power && power <= 99){
    resultAlpha = 0.25;
  }
  else if(100 <= power && power <= 150){
    resultAlpha = 0.5;
  }
  else if(151 <= power && power <= 199){
    resultAlpha = 0.75;
  }
  else if(200 <= power){
    resultAlpha = 1;
  }
  return resultAlpha;
}

function G_MAP_GET_MONUMET_FONT_ANIM_PLUS_ALPHA(power){ //モニュメントのフォントアニメーションの加算透明度を取得
  var resultPlusAlpha = 0;
  if(0 <= power && power <= 50){
    resultPlusAlpha = 0;
  }
  else if(51 <= power && power <= 99){
    resultPlusAlpha = 0.01;
  }
  else if(100 <= power && power <= 150){
    resultPlusAlpha = 0.015;
  }
  else if(151 <= power && power <= 199){
    resultPlusAlpha = 0.02;
  }
  else if(200 <= power){
    resultPlusAlpha = 0.025;
  }
  return resultPlusAlpha;
}

function G_MAP_CHANGE_PVP_BATTLE_SCENE_ANIM_STEP(sceneObj,parentBase,step){ //戦闘シーンに切り替える時のアニメーション制御処理(PVPの時)
  switch (step) {
    case 0: //アニメーション開始
    {
      G_CREATE_TRANS_SCREEN_ANIM(parentBase,0);
      MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = 1; //バトルシーン切り替え演出を開始
    }
    break;
    case 1:
    {
      var transAnimFlag = G_TRANS_SCREEN_ANIM_PLAY(0);
      if(transAnimFlag == false){ //アニメ再生が完了した場合
        MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = 2; //バトルシーン切り替え演出を開始
      }
    }
    break;
    case 2:
    {
      if(CHAT_WINDOW != null) G_CHAT_WINDOW_DELETE(); //消えていなければ初期化
      SCENE_MANAGER['prev_scene'] = SCENE_MANAGER['now_scene'];
      MAP_PVP_BATTLE_SCENE_CHANGE_ANIM_STEP = -1;
      MAP_SCENE_OBJ.exit("battle"); //バトルシーンへ
    }
    break;
    default:
    break;
  }
}

function G_MAP_CHECK_ENEMY_ENCOUNT(areaInstance,enemyPowerCondition,playerKarmaRank){ //敵とのエンカウントが発生したかチェック(移動中)
  if(areaInstance != null && isset(areaInstance['area_id']) && NETWORK_IS_CONNECTING == false){
    //敵勢力とカルマからエンカウント発生率を取得
    var hitCondition = 50; //発生率
    if(playerKarmaRank < 0){ //犯罪者以下
      if(60 <= enemyPowerCondition){
        hitCondition = hitCondition + 10;
        if(75 <= enemyPowerCondition){
          hitCondition = hitCondition + 10;
          if(90 <= enemyPowerCondition){
            hitCondition = hitCondition + 10;
          }
        }
      }
    }
    else{ //一般以上
      if(enemyPowerCondition <= 40){
        hitCondition = hitCondition + 10;
        if(enemyPowerCondition <= 30){
          hitCondition = hitCondition + 10;
          if(enemyPowerCondition <= 15){
            hitCondition = hitCondition + 10;
          }
        }
      }
    }
    var min = 1;
    var max = 100;
    var rot = Math.floor( Math.random() * (max + 1 - min) ) + min ;
    if(rot <= hitCondition) { //エンカウント判定
      var commPostParamVal = new Object();
      commPostParamVal['check_encount'] = new Object();
      commPostParamVal['check_encount']['area_id'] = areaInstance['area_id'];
      NETWORK_IS_CONNECTING = true;
      ajaxStart("post","json","../../client/map/map.php",commPostParamVal); //非同期通信開始
    }
  }
}

//ボタンがアクティブな状態かチェックを行う
function G_MAP_BUTTON_ACTIVE_CHECK(){
  var resultActive = true;
  if(KARMA_MENU_OBJ != null) resultActive = false;
  if(MESSAGE_WINDOW_OBJ != null) resultActive = false;
  if(SHORT_MENU_WINDOW != null) resultActive = false;
  if(WINDOW_LIST != null) resultActive = false;
  if(GUILD_INFO_WINDOW != null) resultActive = false;
  if(GUILD_SETTING_WINDOW != null) resultActive = false;
  return resultActive;
}

//足跡アニメーション
function G_MAP_START_FOOT_PRINT_ANIM(parentBase,footBase){
  if(isset(parentBase['foot_print_anim_base'])){ //既に足跡アニメーションがあれば、リセット
    parentBase['foot_print_anim_base']['foot_print_anim_visible'] = false;
    if(parentBase['foot_print_anim_base']['foot_print_anim_left'] != null){
      parentBase['foot_print_anim_base']['foot_print_anim_left'].remove();
      parentBase['foot_print_anim_base']['foot_print_anim_left'] = null;
    }
    if(parentBase['foot_print_anim_base']['foot_print_anim_right'] != null){
      parentBase['foot_print_anim_base']['foot_print_anim_right'].remove();
      parentBase['foot_print_anim_base']['foot_print_anim_right'] = null;
    }
    if(parentBase['foot_print_anim_base'] != null){
      parentBase['foot_print_anim_base'].remove();
      parentBase['foot_print_anim_base'] = null;
    }
  }
  parentBase['foot_print_anim_base'] = Sprite('ASSET_245').addChildTo(parentBase);
  parentBase['foot_print_anim_base']['move_parent_x'] = parentBase.x;
  parentBase['foot_print_anim_base']['move_parent_y'] = parentBase.y;
  console.log("初期値"+parentBase.y);

  parentBase['foot_print_anim_base']['foot_print_anim_visible'] = true;
  parentBase['foot_print_anim_base']['foot_print_anim_switch'] = 0; //0:左 1:右
  parentBase['foot_print_anim_base']['foot_print_anim_left'] = Sprite('ASSET_794').addChildTo(parentBase['foot_print_anim_base']);
  parentBase['foot_print_anim_base']['foot_print_anim_left'].x = parentBase['foot_print_anim_base']['foot_print_anim_left'].x - (parentBase['foot_print_anim_base']['foot_print_anim_left'].width / 2);
  parentBase['foot_print_anim_base']['foot_print_anim_left'].alpha = 0;

  parentBase['foot_print_anim_base']['foot_print_anim_right'] = Sprite('ASSET_794').addChildTo(parentBase['foot_print_anim_base']);
  parentBase['foot_print_anim_base']['foot_print_anim_right'].x = parentBase['foot_print_anim_base']['foot_print_anim_right'].x - (parentBase['foot_print_anim_base']['foot_print_anim_right'].width / 2);
  parentBase['foot_print_anim_base']['foot_print_anim_right'].alpha = 0;

  parentBase['foot_print_anim_base'].update = function() {
    var avatarMoveCheck = true;
    if(isset(parentBase['avatar_move']) && parentBase['avatar_move'] == false) avatarMoveCheck = false;
    if(this['foot_print_anim_visible'] == true && avatarMoveCheck == true){
      //→
      if(this['move_parent_x'] < parentBase.x){
        var diffX = parentBase.x - this['move_parent_x'];
        if(16 <= diffX){
          var footPrint = Sprite('ASSET_794').addChildTo(footBase);
          footPrint.setScale(0.25);
          footPrint.x = parentBase.x;
          footPrint.y = parentBase.y + footPrint.height * 1.5;
          //位置調整 左
          if(this['foot_print_anim_switch'] == 0){
            footPrint.y = footPrint.y - (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 1;
          }
          //位置調整 右
          else {
            footPrint.y = footPrint.y + (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 0;
          }

          footPrint.setRotation(90);
          G_MAP_CREATE_TWEENER_FOOT_ANIM(footPrint);
          this['move_parent_x'] = parentBase.x;
        }
      }
      //←
      if(parentBase.x < this['move_parent_x']){
        var diffX = this['move_parent_x'] - parentBase.x;
        if(16 <= diffX){
          var footPrint = Sprite('ASSET_794').addChildTo(footBase);
          footPrint.setScale(0.25);
          footPrint.x = parentBase.x;
          footPrint.y = parentBase.y + footPrint.height * 1.5;
          //位置調整 左
          if(this['foot_print_anim_switch'] == 0){
            footPrint.y = footPrint.y + (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 1;
          }
          //位置調整 右
          else {
            footPrint.y = footPrint.y - (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 0;
          }

          footPrint.setRotation(-90);
          G_MAP_CREATE_TWEENER_FOOT_ANIM(footPrint);
          this['move_parent_x'] = parentBase.x;
        }
      }
      //↑
      if(parentBase.y < this['move_parent_y']){
        var diffY = this['move_parent_y'] - parentBase.y;
        if(16 <= diffY){
          console.log("diff"+diffY);
          var footPrint = Sprite('ASSET_794').addChildTo(footBase);
          footPrint.setScale(0.25);
          footPrint.x = parentBase.x;
          footPrint.y = parentBase.y + footPrint.height * 1.5;
          //位置調整 左
          if(this['foot_print_anim_switch'] == 0){
            footPrint.x = footPrint.x - (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 1;
          }
          //位置調整 右
          else {
            footPrint.x = footPrint.x + (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 0;
          }

          G_MAP_CREATE_TWEENER_FOOT_ANIM(footPrint);
          this['move_parent_y'] = parentBase.y;
          console.log("変更後1:"+this['move_parent_y']);
          console.log("変更後2:"+parentBase.y);
        }
      }
      //↓
      if(this['move_parent_y'] < parentBase.y){
        var diffY = parentBase.y - this['move_parent_y'];
        console.log("diff"+diffY);
        if(16 <= diffY){
          var footPrint = Sprite('ASSET_794').addChildTo(footBase);
          footPrint.setScale(0.25);
          footPrint.x = parentBase.x;
          footPrint.y = parentBase.y;
          //位置調整 左
          if(this['foot_print_anim_switch'] == 0){
            footPrint.x = footPrint.x + (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 1;
          }
          //位置調整 右
          else {
            footPrint.x = footPrint.x - (footPrint.height * 0.2);
            this['foot_print_anim_switch'] = 0;
          }

          footPrint.setRotation(180);
          G_MAP_CREATE_TWEENER_FOOT_ANIM(footPrint);
          this['move_parent_y'] = parentBase.y;
          console.log("変更後1:"+this['move_parent_y']);
          console.log("変更後2:"+parentBase.y);
        }
      }

      //console.log("足跡移動");
      //console.log(parentBase.y);
      //console.log(parentBase.x);
    }
    else if(this['foot_print_anim_visible'] == false){ //アニメーション終了
      this['foot_print_anim_left'].remove();
      this['foot_print_anim_left'] = null;
      this['foot_print_anim_right'].remove();
      this['foot_print_anim_right'] = null;
      this.remove();
    }
  };
}

function G_MAP_CREATE_TWEENER_FOOT_ANIM(footPrint){ //足跡アニメーションを作成
  console.log("フェードアウト開始");
  footPrint.tweener.fadeOut(1000).call(function(){
    footPrint.remove();
    footPrint = null;
    console.log("フェードアウト終了");
  }).play();
}
