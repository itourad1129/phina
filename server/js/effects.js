//エフェクト(アニメーション)

function G_EFFECTS_PLAY_THUNDER_PILLAR(parentBase,heightSize,num,color){
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
      this.remove();
    }
  };
}
