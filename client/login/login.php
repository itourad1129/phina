<?php
include_once '../../module/define/index.php';
include_once '../../module/dbConnect/index.php';
include_once '../../module/login/index.php';
include_once '../../module/asset/index.php';

if(isset($_POST['user_id']) && isset($_POST['user_password'])){
  $result = playerLogin($pdo,$_POST['user_id'],$_POST['user_password']);
  $RESULT_JSON = $RESULT_JSON + array('login_result' => $result);
  //ロードするアセット情報を取得
  //カンマ区切りで追加
  $tags = getInitLoadAssetTags($pdo);
  $resultAssetDatas = getAssetDatas($pdo,$tags);
  $RESULT_JSON = $RESULT_JSON +  array('result_asset_datas' => $resultAssetDatas);
}
else{
  $RESULT_JSON = $RESULT_JSON +  array('login_result' => "ログインに失敗しました。");
}
echo json_encode($RESULT_JSON);
