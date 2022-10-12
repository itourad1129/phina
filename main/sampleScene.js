//============================================
//  サンプルーシーン
//============================================
//パブリック変数定義
phina.define("Story", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "X-X-X-X-X-X-X-X-X-X";
    //メンバー初期化

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(this);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'サンプル',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);
    NETWORK_IS_CONNECTING = true;
    ajaxStart("post","json","../../client/myPage/myPage.php",null); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
  },
  update: function() {
    if(RESULT_DATA != "" && G_ASSET_LOADER(RESULT_DATA)){
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      if(isset(json["session_status"])){
        if(json["session_status"] == 0){ //セッションチェック完了

        }
        else{
          alert("セッションが切れました。タイトルに戻ります。");
          this.exit("title");
        }
      }
      else{
        alert("不正な通信情報が検出されました。タイトルに戻ります。");
        this.exit("title");
      }
      RESULT_DATA = "";//通信結果を初期化
      NETWORK_IS_CONNECTING = false;
    }
  },
});
