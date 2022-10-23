<?php
include_once '../../module/pointRanking/index.php';

function getEventTopBannerDatas($conn){ //バナー情報を取得
  $sql = "SELECT * FROM event_top_banner_master";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function selectEventTopBannerData($conn,$eventTopBannerId){ //IDからイベントバナー情報を取得
  $sql = "SELECT * FROM event_top_banner_master WHERE banner_id=?";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array($eventTopBannerId));
  $result = $stmt->fetch(PDO::FETCH_ASSOC);
  return $result;
}

function getActiveEventUpdateDatas(){ //開催中のイベント更新データを取得
  //開催中のイベント一覧を取得
  $sql = "SELECT * FROM event_update_table WHERE NOW() BETWEEN st_dttm AND ed_dttm";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $result = $stmt->fetchAll(PDO::FETCH_ASSOC);
  return $result;
}

function getActiveEventBannerDatas($conn){ //開催中のイベントアップデートデータとバナーをセットで取得する。
  $sql = "SELECT * FROM event_update_table WHERE NOW() BETWEEN st_dttm AND ed_dttm";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $getEventUpdateTables = $stmt->fetchAll(PDO::FETCH_ASSOC);

  $result = array();

  foreach ($getEventUpdateTables as $eventUt) {
    switch ((int)$eventUt['event_type']) { //イベントタイプから処理を分岐
      case 1: //ポイントランキング
      {
        $rankingDuration = getPointRankingDurationData($conn,$eventUt['duration_id']);
        if($rankingDuration != false){
          $pointRankingMasterData = getPointRankingMasterData($conn,$rankingDuration['point_ranking_id']);
          if($pointRankingMasterData != false){
            $eventTopBannerMaster = selectEventTopBannerData($conn,$pointRankingMasterData['event_banner_id']);
            if($eventTopBannerMaster != false){
              //連結
              $addData = array_merge($eventUt,$eventTopBannerMaster);
              array_push($result,$addData);
            }
          }
        }
      }
      break;
      case 2: //ダメージランキング
      {

      }
      break;
      default:
      break;
    }
  }
  return $result;
}
