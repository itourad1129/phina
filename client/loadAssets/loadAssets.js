//============================================
//  アセット読み込みシーン(追加読み込み)
//============================================
//パブリック変数定義
phina.define("LoadAssets", {
  // 継承
  superClass: 'phina.game.LoadingScene',
  // 初期化
  init: function(options) {
    G_SCENE_INIT();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "loadAssets";
    //メンバー初期化

    // 親クラス初期化
    this.superInit(options);
    // 背景色
    this.backgroundColor = 'black';
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(this);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'アセット読み込み',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    // メソッド上書き
    this.gauge.onfull = function() {
      // 次のシーンへ
      console.log(LOAD_NEXT_SCENE);
      this.exit(LOAD_NEXT_SCENE);
    }.bind(this);

  },
});
