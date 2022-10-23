<?php

function getMasterData($conn,$clientMasterDataVersions){ //マスターデータのバージョンをチェックして必要があればマスターデータを取得
  $serverMasterDataVersions = getServerMasterDataVersion($conn);
  $result = array();
  if(is_array($clientMasterDataVersions)){
    foreach ($clientMasterDataVersions as $key => $value) {
      foreach ($serverMasterDataVersions as $serverMdata) {
        if($serverMdata['master_data_name'] == $key){
          if((int)$serverMdata['version'] <= (int)$value) break; //クライアントとバージョンが同じかそれ以上の場合
          //マスターデータ更新の必要がある場合
          switch ($key) {
            case 'equip_item_category_ids': //装備カテゴリーID
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataEquipItemCategoryIds($conn);
            }
            break;
            case 'weapon_category_ids': //武器カテゴリーID
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataWeaponCategoryIds($conn);
            }
            break;
            case 'class_ids': //クラスID
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataClassIds($conn);
            }
            break;
            case 'formation_master': //隊形
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataFormationMaster($conn);
            }
            break;
            case 'area_master': //エリア
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataAreaMaster($conn);
            }
            break;
            case 'world_master': //ワールド
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataWorldMaster($conn);
            }
            break;
            case 'chat_stamp_master': //チャットスタンプ
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataChatStampMaster($conn);
            }
            break;
            case 'mount_master': //マウント
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataMountMaster($conn);
            }
            break;
            case 'item_master': //アイテム
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataItemMaster($conn);
            }
            break;
            case 'open_flag_master': //解放条件
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataOpenFlagMaster($conn);
            }
            break;
            case 'mount_weapon_master': //マウント武器
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataMountWeaponMaster($conn);
            }
            break;
            case 'mount_bomb_master': //マウント爆弾
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataMountBombMaster($conn);
            }
            break;
            case 'stg_master': //シューティングゲーム
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataStgMaster($conn);
            }
            break;
            case 'stg_enemy_master': //シューティングゲーム、エネミー
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataStgEnemyMaster($conn);
            }
            break;
            case 'stg_enemy_set_master': //シューティングゲーム、エネミーセット
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataStgEnemySetMaster($conn);
            }
            break;
            case 'guild_level_master': //ギルドレベルマスター
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataGuildLevelMaster($conn);
            }
            break;
            case 'equip_item_master': //装備アイテムマスター
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataEquipItemMaster($conn);
            }
            break;
            case 'equip_item_param_master': //装備アイテムパラメーターマスター
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataEquipItemParamMaster($conn);
            }
            break;
            case 'card_master': //カードマスター
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataCardMaster($conn);
            }
            break;
            case 'status_ids': //ステータスIDsマスター
            {
              $result[$key] = array();
              $result[$key]['version'] = $serverMdata['version'];
              $result[$key]['m_data'] = getMdataStatusIds($conn);
            }
            break;
            default:
            break;
          }
        }
      }
    }
  }
  return $result;
}

function getServerMasterDataVersion($conn){ //データベースに保存されているマスターデータバージョンを取得
  $sql = "SELECT * FROM master_data_versions";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataEquipItemCategoryIds($conn){ //装備アイテムカテゴリーのマスターデータを取得
  $sql = "SELECT * FROM equip_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataWeaponCategoryIds($conn){ //装備アイテムカテゴリーのマスターデータを取得
  $sql = "SELECT * FROM weapon_category_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataClassIds($conn){ //クラスIDのマスターデータを取得
  $sql = "SELECT * FROM class_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataFormationMaster($conn){ //隊形のマスターデータを取得
  $sql = "SELECT * FROM formation_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataAreaMaster($conn){ //エリアのマスターデータを取得
  $sql = "SELECT * FROM area_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataWorldMaster($conn){ //ワールドのマスターデータを取得
  $sql = "SELECT * FROM world_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataChatStampMaster($conn){ //チャットスタンプのマスターデータを取得
  $sql = "SELECT * FROM chat_stamp_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataMountMaster($conn){ //マウントのマスターデータを取得
  $sql = "SELECT * FROM mount_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataItemMaster($conn){ //アイテムのマスターデータを取得
  $sql = "SELECT * FROM item_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataOpenFlagMaster($conn){ //解放フラグのマスターデータを取得
  $sql = "SELECT * FROM open_flag_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataMountWeaponMaster($conn){ //マウント武器のマスターデータを取得
  $sql = "SELECT * FROM mount_weapon_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataMountBombMaster($conn){ //マウントボムのマスターデータを取得
  $sql = "SELECT * FROM mount_bomb_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataStgMaster($conn){ //シューティングゲームのマスターデータを取得
  $sql = "SELECT * FROM stg_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataStgEnemyMaster($conn){ //シューティングゲーム:エネミーのマスターデータを取得
  $sql = "SELECT * FROM stg_enemy_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataStgEnemySetMaster($conn){ //シューティングゲーム:エネミーセットのマスターデータを取得
  $sql = "SELECT * FROM stg_enemy_set_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataGuildLevelMaster($conn){ //シューティングゲーム:エネミーセットのマスターデータを取得
  $sql = "SELECT * FROM guild_level_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataEquipItemMaster($conn){ //装備アイテムのマスターデータを取得
  $sql = "SELECT * FROM equip_item_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataEquipItemParamMaster($conn){ //装備アイテムパラメーターのマスターデータを取得
  $sql = "SELECT * FROM equip_item_param_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataCardMaster($conn){ //カードのマスターデータを取得
  $sql = "SELECT * FROM card_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getMdataStatusIds($conn){ //ステータスIDマスターデータを取得
  $sql = "SELECT * FROM status_ids";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}
