//マスターデータ定義
var MASTER_DATA_VERSION_EQUIP_ITEM_CATEGORY_IDS = -1; //装備アイテムカテゴリーのマスターデータバージョン
var MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS = null; //装備アイテムカテゴリー
var MASTER_DATA_VERSION_WEAPON_CATEGORY_IDS = -1; //武器カテゴリーのマスターデータバージョン
var MASTER_DATA_WEAPON_CATEGORY_IDS = null; //武器カテゴリー
var MASTER_DATA_VERSION_CLASS_IDS = -1; //クラスIDのマスターデータバージョン
var MASTER_DATA_CLASS_IDS = null; //クラスID
var MASTER_DATA_VERSION_FORMATION_MASTER  = -1; //隊形のマスターデータバージョン
var MASTER_DATA_FORMATION_MASTER = null; //隊形
var MASTER_DATA_VERSION_AREA_MASTER  = -1; //エリアのマスターデータバージョン
var MASTER_DATA_AREA_MASTER = null; //エリア
var MASTER_DATA_VERSION_WORLD_MASTER  = -1; //ワールドのマスターデータバージョン
var MASTER_DATA_WORLD_MASTER = null; //ワールド
var MASTER_DATA_VARSION_CHAT_STAMP_MASTER = -1; //チャットスタンプのマスターデータバージョン
var MASTER_DATA_CHAT_STAMP_MASTER = null; //チャットスタンプ
var MASTER_DATA_VARSION_MOUNT_MASTER = -1; //マウントのマスターデータバージョン
var MASTER_DATA_MOUNT_MASTER = null; //マウント
var MASTER_DATA_VARSION_ITEM_MASTER = -1; //アイテムのマスターデータバージョン
var MASTER_DATA_ITEM_MASTER = null; //アイテム
var MASTER_DATA_VARSION_OPEN_FLAG_MASTER = -1; //解放フラグのマスターデータバージョン
var MASTER_DATA_OPEN_FLAG_MASTER = null; //解放フラグ
var MASTER_DATA_VARSION_MOUNT_WEAPON_MASTER = -1; //マウント武器のマスターデータバージョン
var MASTER_DATA_MOUNT_WEAPON_MASTER = null; //マウント武器
var MASTER_DATA_VARSION_MOUNT_BOMB_MASTER = -1; //マウントボムのマスターデータバージョン
var MASTER_DATA_MOUNT_BOMB_MASTER = null; //マウントボム
var MASTER_DATA_VARSION_STG_MASTER = -1; //シューティングゲームのマスターデータバージョン
var MASTER_DATA_STG_MASTER = null; //シューティングゲーム
var MASTER_DATA_VARSION_STG_ENEMY_MASTER = -1; //シューティングゲームエネミーのマスターデータバージョン
var MASTER_DATA_STG_ENEMY_MASTER = null; //シューティングゲームエネミー
var MASTER_DATA_VARSION_STG_ENEMY_SET_MASTER = -1; //シューティングゲームエネミーセットのマスターデータバージョン
var MASTER_DATA_STG_ENEMY_SET_MASTER = null; //シューティングゲームエネミーセット
var MASTER_DATA_VARSION_GUILD_LEVEL_MASTER = -1; //ギルドレベルマスターのデータバージョン
var MASTER_DATA_GUILD_LEVEL_MASTER = null; //ギルドレベルマスター
var MASTER_DATA_VARSION_EQUIP_ITEM_MASTER = -1; //装備アイテムのマスターのデータバージョン
var MASTER_DATA_EQUIP_ITEM_MASTER = null; //装備アイテムマスター
var MASTER_DATA_VARSION_EQUIP_ITEM_PARAM_MASTER = -1; //装備アイテムパラメータのマスターのデータバージョン
var MASTER_DATA_EQUIP_ITEM_PARAM_MASTER = null; //装備アイテムパラメータマスター
var MASTER_DATA_VARSION_CARD_MASTER = -1; //カードのマスターのデータバージョン
var MASTER_DATA_CARD_MASTER = null; //カードマスター
var MASTER_DATA_VARSION_STATUS_IDS = -1; //ステータスIDのマスターのデータバージョン
var MASTER_DATA_STATUS_IDS = null; //ステータスIDs



function G_MASTER_DATA_SET_CLIENT_MASTER_DATA(serverMasterDatas){ //サーバーからのマスターデータをクライアントに保管
  for (key in serverMasterDatas) {
    switch (key) {
      case 'equip_item_category_ids':
      {
        MASTER_DATA_VERSION_EQUIP_ITEM_CATEGORY_IDS = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_EQUIP_ITEM_CATEGORY_IDS = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'weapon_category_ids':
      {
        MASTER_DATA_VERSION_WEAPON_CATEGORY_IDS = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_WEAPON_CATEGORY_IDS = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'class_ids':
      {
        MASTER_DATA_VERSION_CLASS_IDS = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_CLASS_IDS = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'formation_master':
      {
        MASTER_DATA_VERSION_FORMATION_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_FORMATION_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'area_master':
      {
        MASTER_DATA_VERSION_AREA_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_AREA_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'world_master':
      {
        MASTER_DATA_VERSION_WORLD_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_WORLD_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'chat_stamp_master':
      {
        MASTER_DATA_VARSION_CHAT_STAMP_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_CHAT_STAMP_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'mount_master':
      {
        MASTER_DATA_VARSION_MOUNT_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_MOUNT_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'item_master':
      {
        MASTER_DATA_VARSION_ITEM_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_ITEM_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'open_flag_master':
      {
        MASTER_DATA_VARSION_OPEN_FLAG_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_OPEN_FLAG_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'mount_weapon_master':
      {
        MASTER_DATA_VARSION_MOUNT_WEAPON_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_MOUNT_WEAPON_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'mount_bomb_master':
      {
        MASTER_DATA_VARSION_MOUNT_BOMB_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_MOUNT_BOMB_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'stg_master':
      {
        MASTER_DATA_VARSION_STG_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_STG_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'stg_enemy_master':
      {
        MASTER_DATA_VARSION_STG_ENEMY_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_STG_ENEMY_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'stg_enemy_set_master':
      {
        MASTER_DATA_VARSION_STG_ENEMY_SET_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_STG_ENEMY_SET_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'guild_level_master':
      {
        MASTER_DATA_VARSION_GUILD_LEVEL_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_GUILD_LEVEL_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'equip_item_master':
      {
        MASTER_DATA_VARSION_EQUIP_ITEM_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_EQUIP_ITEM_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'equip_item_param_master':
      {
        MASTER_DATA_VARSION_EQUIP_PARAM_ITEM_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_EQUIP_ITEM_PARAM_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'card_master':
      {
        MASTER_DATA_VARSION_CARD_MASTER = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_CARD_MASTER = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      case 'status_ids':
      {
        MASTER_DATA_VARSION_STATUS_IDS = serverMasterDatas[key]['version']; //バージョンを更新
        MASTER_DATA_STATUS_IDS = serverMasterDatas[key]['m_data']; //マスターデータをを更新
      }
      break;
      default:
      {

      }
      break;
    }
  }
}

function G_MASTER_DATA_GET_CLIENT_MASTER_DATA_VERSIONS(){ //クライアントが現在所持しているマスターデータバージョンを取得する。
  var result = new Object();
  result['equip_item_category_ids'] = MASTER_DATA_VERSION_EQUIP_ITEM_CATEGORY_IDS;
  result['weapon_category_ids'] = MASTER_DATA_VERSION_WEAPON_CATEGORY_IDS;
  result['class_ids'] = MASTER_DATA_VERSION_CLASS_IDS;
  result['formation_master'] = MASTER_DATA_VERSION_FORMATION_MASTER;
  result['area_master'] = MASTER_DATA_VERSION_AREA_MASTER;
  result['world_master'] = MASTER_DATA_VERSION_WORLD_MASTER;
  result['chat_stamp_master'] = MASTER_DATA_VARSION_CHAT_STAMP_MASTER;
  result['mount_master'] = MASTER_DATA_VARSION_MOUNT_MASTER;
  result['item_master'] = MASTER_DATA_VARSION_ITEM_MASTER;
  result['open_flag_master'] = MASTER_DATA_VARSION_OPEN_FLAG_MASTER;
  result['mount_weapon_master'] = MASTER_DATA_VARSION_MOUNT_WEAPON_MASTER;
  result['mount_bomb_master'] = MASTER_DATA_VARSION_MOUNT_BOMB_MASTER;
  result['stg_master'] = MASTER_DATA_VARSION_STG_MASTER;
  result['stg_enemy_master'] = MASTER_DATA_VARSION_STG_ENEMY_MASTER;
  result['stg_enemy_set_master'] = MASTER_DATA_VARSION_STG_ENEMY_SET_MASTER;
  result['guild_level_master'] = MASTER_DATA_VARSION_GUILD_LEVEL_MASTER;
  result['equip_item_master'] = MASTER_DATA_VARSION_EQUIP_ITEM_MASTER;
  result['equip_item_param_master'] = MASTER_DATA_VARSION_EQUIP_ITEM_PARAM_MASTER;
  result['card_master'] = MASTER_DATA_VARSION_CARD_MASTER;
  result['status_ids'] = MASTER_DATA_VARSION_STATUS_IDS;
  return result;
}
