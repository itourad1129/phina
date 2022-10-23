//============================================
// タイトルシーン
//============================================
phina.define("Title", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "title";
    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    // ラベル
    var titleYPos = this.gridY.center() * 0.8;
    Label({
      text: 'タイトル',
      fontSize: 48,
      fill: 'yellow',
    }).addChildTo(this).setPosition(this.gridX.center(), titleYPos);
    // Label({
    //   text: 'タップでスタート',
    //   fontSize: 24,
    //   fill: 'yellow',
    // }).addChildTo(this).setPosition(this.gridX.center(), titleYPos * 1.8);
    var titleBackGround = Sprite('title_titleBackGround').addChildTo(this); //タイトル背景画像
    titleBackGround.x = this.gridX.center();
    titleBackGround.y = this.gridY.center();
    var tapToStart = Sprite('title_tapToStart').addChildTo(this); //タップでゲームスタートの画像
    tapToStart.x = this.gridX.center();
    tapToStart.y = titleYPos * 1.8;
    // 徐々に透明にする
    var tapToStartAnimSwitch = true;
    var tapToStartAnimSpeed = 0.025;
    tapToStart.update = function() {
      if (tapToStart.alpha <= 0) {
        tapToStart.alpha = 0;
        tapToStartAnimSwitch = false;
      }
      if(1 <= tapToStart.alpha){
        tapToStart.alpha = 1;
        tapToStartAnimSwitch = true;
      }
      if(tapToStartAnimSwitch == true){
        tapToStart.alpha -= tapToStartAnimSpeed;
      }
      else{
        tapToStart.alpha += tapToStartAnimSpeed;
      }
    };
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    SCENE_MANAGER['prev_scene'] = "title";
    this.exit();
  },
});
