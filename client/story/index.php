<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/staminaCount/index.php';
include_once '../../module/vitalityCount/index.php';
include_once '../../module/item/index.php';
include_once '../../module/levelUpController/index.php';
include_once '../../module/statusUpController/index.php';





















 ?>

<!doctype html>

<html>
  <head>
    <meta charset='utf-8' />
    <title>メインストーリー</title>
  </head>
  <body>
  </body>
</html>

<script src='../../module/js/phina/build/phina.js'></script>
<script>

// グローバルに展開
phina.globalize();

/*
 * メインシーン
 */
phina.define('MainScene', {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    // super init
    this.superInit();

    // 背景色
    this.backgroundColor = '#444';

    // ラベルを生成
    var label = Label('Hello, phina.js!').addChildTo(this);
    label.x = this.gridX.center(); // x 軸
    label.y = this.gridY.center(); // y 軸
    label.fill = '#eee';  // 塗りつぶし色
  },
});

/*
 * メイン処理
 */
phina.main(function() {
  // アプリケーションを生成
  var app = GameApp({
    startLabel: 'main', // MainScene から開始
  });

  app.enableStats();

  // 実行
  app.run();
});

</script>
