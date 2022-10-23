//============================================
//  テストルームシーン
//============================================
//パブリック変数定義
TEST_ROOM_SCENE_BASE = null;
TEST_ROOM_NODE = null;

phina.define("TestRoom", {
  // 継承
  superClass: 'DisplayScene',
  // 初期化
  init: function() {
    G_SCENE_INIT();
    var colors = ['skyblue', 'black', 'gray', 'green', 'blue', 'red'];
    this.backgroundColor = colors.random();
    //現在のシーン設定を更新
    SCENE_MANAGER['now_scene'] = "testRoom";
    //メンバー初期化
    TEST_ROOM_NODE = null;

    // 親クラス初期化
    this.superInit();
    // 背景色
    this.backgroundColor = 'black';
    //ヘッダー表示
    var headerSptite = Sprite('ASSET_34').addChildTo(this);
    headerSptite.x = this.gridX.center();
    headerSptite.y = headerSptite.height / 2;

    Label({
      text: 'テストルーム',
      fontSize: 24,
      fill: 'white',
    }).addChildTo(headerSptite);

    TEST_ROOM_SCENE_BASE = PlainElement({ //シーンの親ノード生成
      width: this.gridX.width,
      height: this.gridY.height,
    }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());

    //表示ノード
    TEST_ROOM_NODE = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    TEST_ROOM_NODE.y = TEST_ROOM_NODE.y + (SCREEN_HEIGHT * 0.3);

    //表示ノード1
    TEST_ROOM_NODE1 = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    TEST_ROOM_NODE1.y = TEST_ROOM_NODE1.y + (SCREEN_HEIGHT * 0.3);
    TEST_ROOM_NODE1.x = TEST_ROOM_NODE1.x + (SCREEN_WIDTH * 0.3);

    //表示ノード2
    TEST_ROOM_NODE2 = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    TEST_ROOM_NODE2.y = TEST_ROOM_NODE2.y + (SCREEN_HEIGHT * 0.3);
    TEST_ROOM_NODE2.x = TEST_ROOM_NODE2.x - (SCREEN_WIDTH * 0.3);

    //表示ノード3
    TEST_ROOM_NODE3 = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    //TEST_ROOM_NODE3.y = TEST_ROOM_NODE3.y - (SCREEN_HEIGHT * 0.3);
    TEST_ROOM_NODE3.x = TEST_ROOM_NODE3.x - (SCREEN_WIDTH * 0.15);

    //表示ノード4
    TEST_ROOM_NODE4 = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    //TEST_ROOM_NODE4.y = TEST_ROOM_NODE4.y - (SCREEN_HEIGHT * 0.3);
    TEST_ROOM_NODE4.x = TEST_ROOM_NODE4.x + (SCREEN_WIDTH * 0.15);
    //NETWORK_IS_CONNECTING = true;
    //ajaxStart("post","json","../../client/testRoom/testRoom.php",null); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    var colors = ['skyblue', 'black', 'gray', 'green', 'blue', 'red'];
    this.backgroundColor = colors.random();
    //テストエフェクトを表示
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE,400,1,"yellow");
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE1,400,1,"yellow");
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE2,400,1,"yellow");
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE3,400,1,"yellow");
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE4,400,1,"yellow");
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

function G_TEST_ROOM_EFFECT_1(parentBase,heightSize,num,color){
  //雷の線を生成
  var frameDelta = 0;
  var direction = 0; //進行度
  var lineNum = num; //雷の数
  var animFlag = true;
  var maxIndex = 0;
  var effectRunCount = 0;
  var particle_color_start = 120;    // color angle の開始値
  var particle_color_end = 150;   // color angle の終了値
  if(color == "red"){
    particle_color_start = 0;
    particle_color_end = 30;
  }
  else if(color == "blue"){
    particle_color_start = 220;
    particle_color_end = 250;
  }
  else if(color == "violet"){
    particle_color_start = 250;
    particle_color_end = 280;
  }
  else if(color == "yellow"){
    particle_color_start = 30;
    particle_color_end = 60;
  }
  else if(color == "rainbow"){
    particle_color_start = 0;
    particle_color_end = 360;
  }
  //プレーンエレメント生成
  var obj = PlainElement({ //シーンの親ノード生成
    }).addChildTo(parentBase);
  obj['play_index'] = 0;
  obj['anim_speed'] = 5;
  obj['effect_positions'] = new Array();

  while(direction < lineNum){
    console.log("線作成");
    var maxHeight = 400;
    var minHeight = 0;
    var widthMaxPos = 100; //雷屈折最大領域
    var lineMaxHeight = parseInt((maxHeight < 0 ? maxHeight * -1 : maxHeight) / 3); //屈折線の最大長さ
    var lineMinHeight = parseInt(lineMaxHeight / 3); //屈折線の最大短さ
    var lineAnchor = Vector2(Math.randint(obj.x - parseInt(widthMaxPos / 2),obj.x + parseInt(widthMaxPos/ 2)),-maxHeight); //ラインを引き始めるアンカー
    console.log("parentPosY:" + obj.y);
    console.log("start_anchor:" + lineAnchor.y);
    while(lineAnchor.y < 0){
      console.log(lineAnchor.y + " < " + obj.y);
      //  //線の長さを決定
        var lineHeight = Math.randint(lineMinHeight,lineMaxHeight);
      //終点のXを決定
      var lineEndPosX = obj.x;
      if(obj.x < lineAnchor.x) lineEndPosX = Math.randint(obj.x - parseInt(widthMaxPos/ 2),obj.x); //この場合マイナス
      else if(obj.x > lineAnchor.x) lineEndPosX = Math.randint(obj.x,obj.x + parseInt(widthMaxPos/ 2)); //この場合マイナス
      else lineEndPosX = Math.randint(obj.x - parseInt(widthMaxPos/ 2),obj.x + parseInt(widthMaxPos/ 2));
      //テストで線を表示
      // PathShapeを利用してロープを作成
      var yDirection = lineAnchor.y;
      while (yDirection < (lineAnchor.y + lineHeight)) {
        //交点を求める
        //縦線
        var line1 = {
            start : { x : lineAnchor.x, y : lineAnchor.y }, // 始点
            end   : { x : lineEndPosX, y : lineAnchor.y + lineHeight} // 終点
        };
        //交点を求めるための横線
        var line2 = {
             start : { x : obj.x - (SCREEN_WIDTH / 2), y : yDirection }, // 始点
             end   : { x : obj.x + (SCREEN_WIDTH / 2), y : yDirection }    // 終点
        };
        var crossPoint = G_HELPER_GET_INTERSECTION(line1,line2);
        if(crossPoint != false){
          obj['effect_positions'][obj['effect_positions'].length] = crossPoint; //表示座標を格納
        }
         yDirection = parseFloat(yDirection) + parseFloat(lineHeight / 15);
       }
       //セット完了のため、アンカーY座標更新と進行度を加算
       lineAnchor.y = lineAnchor.y + lineHeight;
       lineAnchor.x = lineEndPosX;
    }
    direction = direction + 1;
  }

  obj['max_index'] = (obj['effect_positions'].length - 1);

  obj.update = function() {
    // if(animFlag == true){
    //   animFlag = false;
    //   var circlePlayIndex = 0;
    //   var countIndex = 0;
    //   while(effectRunCount < lineNum){ //同時雷表示数
    //     console.log("線作成");
    //     var maxHeight = heightSize;
    //     var minHeight = 0;
    //     var widthMaxPos = 100; //雷屈折最大領域
    //     var lineMaxHeight = parseInt((maxHeight < 0 ? maxHeight * -1 : maxHeight) / 3); //屈折線の最大長さ
    //     var lineMinHeight = parseInt(lineMaxHeight / 3); //屈折線の最大短さ
    //     var lineAnchor = Vector2(Math.randint(obj.x - parseInt(widthMaxPos / 2),obj.x + parseInt(widthMaxPos/ 2)),-maxHeight); //ラインを引き始めるアンカー
    //     console.log("parentPosY:" + obj.y);
    //     console.log("start_anchor:" + lineAnchor.y);
    //     while(lineAnchor.y < 0){
    //       console.log(lineAnchor.y + " < " + obj.y);
    //       //  console.log("線引き実行");
    //       //  //線の長さを決定
    //         var lineHeight = Math.randint(lineMinHeight,lineMaxHeight);
    //       //終点のXを決定
    //       var lineEndPosX = obj.x;
    //       if(obj.x < lineAnchor.x) lineEndPosX = Math.randint(obj.x - parseInt(widthMaxPos/ 2),obj.x); //この場合マイナス
    //       else if(obj.x > lineAnchor.x) lineEndPosX = Math.randint(obj.x,obj.x + parseInt(widthMaxPos/ 2)); //この場合マイナス
    //       else lineEndPosX = Math.randint(obj.x - parseInt(widthMaxPos/ 2),obj.x + parseInt(widthMaxPos/ 2));
    //
    //       //テストで線を表示
    //       //PathShapeを利用してロープを作成
    //       // var rope = PathShape({
    //       //   width: 10,
    //       //   height: 10,
    //       //   stroke: 'red',
    //       //   strokeWidth: 8,
    //       //   paths: [Vector2(lineAnchor.x, lineAnchor.y), Vector2(lineEndPosX, lineAnchor.y + lineHeight)],
    //       // }).addChildTo(parentBase);
    //
    //       //テストで線を表示
    //       // PathShapeを利用してロープを作成
    //       var yDirection = lineAnchor.y;
    //       while (yDirection < (lineAnchor.y + lineHeight)) {
    //         //console.log(yDirection + "<<<" + (lineAnchor.y + lineHeight));
    //         // var rope2 = PathShape({
    //         //   width: 10,
    //         //   height: 10,
    //         //   stroke: 'blue',
    //         //   strokeWidth: 8,
    //         //   paths: [Vector2(parentBase.x - (SCREEN_WIDTH / 2), yDirection), Vector2(parentBase.x + (SCREEN_WIDTH / 2), yDirection)],
    //         // }).addChildTo(parentBase);
    //         //交点を求める
    //         //縦線
    //         var line1 = {
    //             start : { x : lineAnchor.x, y : lineAnchor.y }, // 始点
    //             end   : { x : lineEndPosX, y : lineAnchor.y + lineHeight} // 終点
    //         };
    //
    //         //交点を求めるための横線
    //         var line2 = {
    //              start : { x : obj.x - (SCREEN_WIDTH / 2), y : yDirection }, // 始点
    //              end   : { x : obj.x + (SCREEN_WIDTH / 2), y : yDirection }    // 終点
    //         };
    //         var crossPoint = G_HELPER_GET_INTERSECTION(line1,line2);
    //         if(crossPoint != false){
    //           //パーティクルを表示
    //           //var particleNum = 0;
    //           //var particleMaxNum = Math.randint(3,15); //表示するパーティクル数
    //           //while (particleNum < particleMaxNum) {
    //             var circle = CircleShape().addChildTo(obj);
    //             var scaleRand = Math.randint(30,50);
    //             var scaleDownSpd = 0.05;
    //             var scaleUpSpd = 0.05;
    //
    //             scaleRand = scaleRand * 0.01;
    //             circle['play_index'] = circlePlayIndex;
    //             circlePlayIndex = circlePlayIndex + 1;
    //             countIndex = circlePlayIndex;
    //             circle['obj'] = obj;
    //             circle['direction'] = 0; //0:拡大 1:縮小
    //             circle['set_scale'] = scaleRand;
    //             circle['scale_down_spd'] = scaleDownSpd;
    //             circle['scale_up_spd'] = scaleUpSpd;
    //             circle.scaleX = 0;
    //             circle.scaleY = 0;
    //             var xLot = Math.randint(0,100);
    //             xLot = xLot * 0.01;
    //             var yLot = Math.randint(0,100);
    //             yLot = yLot * 0.01;
    //             circle.x = crossPoint.x + (Math.randint(0,1) == 0 ? -1 * xLot : xLot);
    //             circle.y = crossPoint.y + (Math.randint(0,1) == 0 ? -1 * yLot : yLot);
    //             //circle.y = circle.y - SCREEN_HEIGHT;
    //             //circle.x = circle.x - (SCREEN_WIDTH / 2);
    //             circle.blendMode = 'lighter';
    //             var grad = circle.canvas.context.createRadialGradient(0, 0, 0, 0, 0, circle.radius);
    //             grad.addColorStop(0, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(0, 30)));
    //             grad.addColorStop(1, 'hsla({0}, 75%, 50%, 0.0)'.format(Math.randint(0, 30)));
    //             circle.fill = grad;
    //             circle.strokeWidth = 0;
    //             circle.update = function() {
    //               if(this['play_index'] <= this['obj']['play_index']){
    //                 if(this['direction'] == 0){ //拡大
    //                   this.scaleX = this.scaleX + this['scale_up_spd'];
    //                   this.scaleY = this.scaleY + this['scale_up_spd'];
    //                   if(this['set_scale'] < this.scaleX){
    //                     this['direction'] = 1;
    //                     this.scaleX = this['set_scale'];
    //                     this.scaleY = this['set_scale'];
    //                   }
    //                 }
    //                 else{ //縮小
    //                   this.scaleX = this.scaleX - this['scale_down_spd'];
    //                   this.scaleY = this.scaleY - this['scale_down_spd'];
    //                   if(this.scaleX < 0){
    //                     this.scaleX = 0;
    //                     this.scaleY = 0;
    //                     //this.flare('disappear');
    //                     this.remove();
    //                   }
    //                 }
    //               }
    //             };
    //             // circle.tweener.to({
    //             //         scaleX: scaleRand,
    //             //         scaleY: scaleRand,
    //             //       }, 100).to({
    //             //               scaleX: 0,
    //             //               scaleY: 0,
    //             //             }, 100).call(function(){
    //             //                   this.target.flare('disappear');
    //             //                 }).play();
    //             //particleNum = particleNum + 1;
    //           //}
    //         }
    //          yDirection = parseFloat(yDirection) + parseFloat(lineHeight / 10);
    //        }
    //
    //        //セット完了のため、アンカーY座標更新と進行度を加算
    //        lineAnchor.y = lineAnchor.y + lineHeight;
    //        lineAnchor.x = lineEndPosX;
    //     }
    //     effectRunCount = effectRunCount + 1;
    //   }
    //   maxIndex = countIndex;
    // }

    frameDelta += PHINA_APP.deltaTime;
    if(10 < frameDelta){
      frameDelta = 0;
      if(this['play_index'] < this['max_index']){
        for(var i = 0; i < Math.randint(10,20); i++){
          //エフェクト表示処理
          var circle = CircleShape().addChildTo(this);
          var scaleRand = Math.randint(30,50);
          var scaleDownSpd = 0.05;
          var scaleUpSpd = 0.05;

          scaleRand = scaleRand * 0.01;
          circle['direction'] = 0; //0:拡大 1:縮小
          circle['set_scale'] = scaleRand;
          circle['scale_down_spd'] = scaleDownSpd;
          circle['scale_up_spd'] = scaleUpSpd;
          circle.scaleX = (scaleRand / 2);
          circle.scaleY = (scaleRand / 2);
          var xLot = Math.randint(0,100);
          xLot = xLot * 0.01;
          var yLot = Math.randint(0,100);
          yLot = yLot * 0.01;
          circle.x = this['effect_positions'][this['play_index']].x;
          circle.y = this['effect_positions'][this['play_index']].y;
          //circle.y = circle.y - SCREEN_HEIGHT;
          //circle.x = circle.x - (SCREEN_WIDTH / 2);
          circle.blendMode = 'lighter';
          var grad = circle.canvas.context.createRadialGradient(0, 0, 0, 0, 0, circle.radius);
          grad.addColorStop(0, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(particle_color_start, particle_color_end)));
          grad.addColorStop(1, 'hsla({0}, 75%, 50%, 0.0)'.format(Math.randint(particle_color_start, particle_color_end)));
          circle.fill = grad;
          circle.strokeWidth = 0;
          circle.update = function() {
            if(this['direction'] == 0){ //拡大
              this.scaleX = this.scaleX + this['scale_up_spd'];
              this.scaleY = this.scaleY + this['scale_up_spd'];
              if(this['set_scale'] < this.scaleX){
                this['direction'] = 1;
                this.scaleX = this['set_scale'];
                this.scaleY = this['set_scale'];
              }
            }
            else{ //縮小
              this.scaleX = this.scaleX - this['scale_down_spd'];
              this.scaleY = this.scaleY - this['scale_down_spd'];
              if(this.scaleX < 0){
                this.scaleX = 0;
                this.scaleY = 0;
                this.flare('disappear');
              }
            }
          };
          this['play_index'] = this['play_index'] + 1;
          if(this['max_index'] <= this['play_index']) break;
        }
      }
    }
    if(this['max_index'] <= this['play_index'] && this.children.length == 0){
      console.log("消える");
      this.remove();
    }
  };
}
