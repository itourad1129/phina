<?php
include_once '../../define/index.php';
include_once '../../dbConnect/index.php';
//15分毎に実行される定期更新バッチ

//イベント更新処理
function checkUpdateEvents($conn){ //開催中のイベントが存在しない場合、イベントを作成
  //開催中のポイントランキングがあるかチェック
  $default = 0; //再利用可能
  $sql = "SELECT * FROM point_ranking_duration WHERE NOW() BETWEEN st_dttm AND ed_dttm";
  $stmt = $conn->prepare($sql);
  $stmt->execute(array());
  $checkPointRanking = $stmt->fetch(PDO::FETCH_ASSOC);

  //他にあれば追記 damageRanking killCountRankingは現在ダミー
  $damageRanking = false;
  //討伐数ランキング
  $killCountRanking = false;

  if($checkPointRanking != false || $damageRanking != false || $killCountRanking != false){
    
  }
  else{ //開催されていない
    try{
      $conn->beginTransaction(); //トランザクション開始
      $sql = "SELECT * FROM point_ranking_master WHERE point_ranking_duration_type=? FOR UPDATE";
      $stmt = $conn->prepare($sql);
      $stmt->execute(array($default));
      $pointRanking = $stmt->fetchAll(PDO::FETCH_ASSOC);
      //ランキングの種類を抽選
      $rotRankingType = -1;
      $rotRankingType = rand(1,3);
      //現在は強制的にポイントランキング
      $rotRankingType = 1;
      $rankingDurationId = -1;
      $stDttm = null;
      $edDttm = null;
      $stDttmStr = "";
      $edDttmStr = "";
      switch ($rotRankingType) {
        case 1: //ポイントランキング
        {
          if(count($pointRanking) <= 0) break;
          //ポイントランキングの抽選
          $pointRankingIndex = rand(0,(count($pointRanking) - 1));
          $resultPointRanking = $pointRanking[$pointRankingIndex];
          if($resultPointRanking != null){
            //ポイントランキング作成処理の開始

            // $stDttm = date('Y-m-d H:i:s');
            // $resultDay = (int)$resultPointRanking['duration_day'] - (int)$resultPointRanking['result_day'];
            // $durationRsStr = $resultDay." day";
            // $rsDttm = date('Y-m-d H:i:s', strtotime($durationRsStr));
            // $durationEdStr = $resultPointRanking['duration_day']." day";
            // $edDttm = date('Y-m-d H:i:s', strtotime($durationEdStr));

            //有効な日付チェック
            if($resultPointRanking['duration_day'] <= 0){throw new Exception("ランキングデータの取得に失敗");}
            if($resultPointRanking['duration_day'] <= $resultPointRanking['result_day']){throw new Exception("ランキングデータの取得に失敗");}

            $stDttm = new DateTime();
            $rsDttm = new DateTime();
            $rsDttm->modify('+'.((int)$resultPointRanking['duration_day'] - (int)$resultPointRanking['result_day']).' days');
            $edDttm = new DateTime();
            $edDttm->modify('+'.(int)$resultPointRanking['duration_day'].' days');

            $stDttmStr = $stDttm->format('Y-m-d H:i:s');
            $rsDttmStr = $rsDttm->format('Y-m-d H:i:s');
            $edDttmStr = $edDttm->format('Y-m-d H:i:s');

            $stmt = $conn -> prepare("INSERT INTO point_ranking_duration (point_ranking_id, st_dttm, result_dttm, ed_dttm)
            VALUES (:point_ranking_id, :st_dttm, :result_dttm, :ed_dttm)");
            $stmt->bindParam(':point_ranking_id', $resultPointRanking['point_ranking_id'], PDO::PARAM_INT);
            $stmt->bindParam(':st_dttm', $stDttmStr, PDO::PARAM_STR);
            $stmt->bindParam(':result_dttm', $rsDttmStr, PDO::PARAM_STR);
            $stmt->bindParam(':ed_dttm', $edDttmStr, PDO::PARAM_STR);
            $stmt->execute();
            $aiid = $conn->lastInsertId('point_ranking_duration_id');

            //最後にポイントランキングのDurationIDを記録
            $rankingDurationId = $aiid;
          }
        }
        break;
        case 2: //ダメージランキング
        {

        }
        break;
        case 3: //討伐数ランキング
        {

        }
        break;
        default:
        break;
      }

      //開催中のイベント情報を記録
      if($stDttmStr != "" && $edDttmStr != "" && $rotRankingType != -1 && $rankingDurationId != -1){
        $stmt = $conn -> prepare("INSERT INTO event_update_table (event_type, duration_id, st_dttm, ed_dttm)
        VALUES (:event_type, :duration_id, :st_dttm, :ed_dttm)");
        $stmt->bindParam(':event_type', $rotRankingType, PDO::PARAM_INT);
        $stmt->bindParam(':duration_id', $rankingDurationId, PDO::PARAM_INT);
        $stmt->bindParam(':st_dttm', $stDttmStr, PDO::PARAM_STR);
        $stmt->bindParam(':ed_dttm', $edDttmStr, PDO::PARAM_STR);
        $stmt->execute();
      }
      else {
        throw new Exception("ランキングデータの取得に失敗");
      }
      $conn->commit(); //トランザクション終了
    }
    catch(Exception $e){
      $conn->rollBack();
    }
  }
}



//定期バッチ処理を実行
checkUpdateEvents($pdo);
