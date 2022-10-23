//戦闘エフェクト表示処理

//1:アローLevel1
//2:アローLevel2
//3:出血状態
//4:爆発1
//5:爆発2
//6:クロー
//7:カットLevel1
//8:カットLevel2
//9:カットLevel3
//10:ファイアーボール
//11:炎柱Level1
//12:炎柱Level2
//13:炎柱Level3
//14:回復Level1
//15:回復Level2
//16:回復Level3
//17:サンダーボール命中
//18:アイスボール命中
//19:氷柱Level1
//20:氷柱Level2
//21:氷柱Level3
//22:アイスショット
//23:毒状態
//24:パワーダウン
//25:パワーアップ
//26:斬撃
//27:サンダーボール
//28:落雷(青)
//29:落雷Level1
//30:落雷Level2
//31:落雷Level3
//32:突き刺しLevel1
//33:突き刺しLevel2
//34:FINISH(終了)エフェクト
//35:WIN(勝ち)エフェクト
//36:LOSE(負け)エフェクト



//戦闘エフェクトのアニメーションを作成
function G_BATTLE_EFFECT_CREATE_ANIM(effectImageId,list,startTime,playLog){
  var result = null;
  switch (parseInt(effectImageId)) {
    case 10: //ファイアーボール
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      if(!isset(list['battle_effect_layer'])) break;
      if(!isset(list['max_hp'])) break;
      if(!isset(list['prev_hp'])) break;
      if(!isset(list['now_hp'])) break;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,true,false,list['my_field'].width * 2,list['my_field'].width * 2,true,-1,skipFrame);
      var hitAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_4",frameRate,false,true,list['target_field'].width * 3,list['target_field'].width * 3,true,-1,skipFrame);
      if(effectAnim != null && hitAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("ファイアーボール");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.visible = false;
        effectAnim.x = list['my_field'].x;
        //effectAnim.x = effectAnim.x + (list['my_field'].width * 0.27);
        effectAnim.y = list['my_field'].y;
        effectAnim.y = effectAnim.y - (list['my_field'].height * 2);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['target_field'] = list['target_field'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['hit_anim_effect_image_id'] = 4;
        effectAnim['hit_anim'] = hitAnim;
        effectAnim['play_log'] = playLog;

        var checkHpAnim = 0;

        effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        //waitTime = waitTime + effectAnim['hp_gauge_anim_time'];
        checkHpAnim = checkHpAnim + effectAnim['hp_gauge_anim_time'];

        effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        if(parseInt(list['now_hp']) <= 0){
          //waitTime = waitTime + effectAnim['dead_anim_time'];
          checkHpAnim = checkHpAnim + effectAnim['dead_anim_time'];
        }

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        //爆発時間かHPゲージ時間か
        var addWaitTime = parseInt(effectAnim['hit_anim']['anim_time']) < checkHpAnim ? checkHpAnim : parseInt(effectAnim['hit_anim']['anim_time']);
        waitTime = waitTime + addWaitTime;
        var myPos = Vector2(list['my_field'].x, list['my_field'].y); //ベクトル取得
        var targetPos = Vector2(list['target_field'].x, list['target_field'].y); //ベクトル取得
        var distance = G_HELPER_GET_DISTANCE(myPos.x,myPos.y,targetPos.x,targetPos.y); //距離
        //移動速度時間
        effectAnim['move_time'] = parseInt(distance / G_BATTLE_CHANGE_ANIM_SPEED(0.3,0,1));
        waitTime = waitTime + effectAnim['move_time'];
        //2点の位置から角度を求める
        //effectAnim.rotation = effectAnim.rotation - 90;
        myPos.y = myPos.y - (list['my_field'].height * 2);
        effectAnim.rotation = G_HELPER_GET_DEGREE(myPos, targetPos);
        effectAnim.rotation = effectAnim.rotation - 90;
        console.log("角度2");
        console.log(effectAnim.rotation);
        effectAnim.tweener.wait(startTime).call(function(){
          this.target.visible = true;
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).to({x:this.target['pos_x'],y:this.target['pos_y']},this.target['move_time']).call(function(){
            //var hitAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + this.target['hit_anim_effect_image_id'],15,false,true,this.target['target_field'].width * 3,this.target['target_field'].width * 3,false);
            if(this.target['hit_anim'] != null){
              console.log("命中爆発");
              this.target['hit_anim'].stopFrameIndex(-1); //アニメーション開始
              this.target['hit_anim'].addChildTo(this.target['battle_effect_layer']);
              this.target['hit_anim'].x = this.target['pos_x'];
              this.target['hit_anim'].y = this.target['pos_y'];
              this.target['hit_anim'].y = this.target['hit_anim'].y - this.target['hit_anim'].height * 0.3;
            }
            var getLog = this.target['play_log'];
            G_BATTLE_HP_GAUGE_ANIM_START(getLog['target_unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],getLog['max_hp'],getLog['prev_hp'],getLog['now_hp'],this.target['hp_gauge_anim_time'],this.target['dead_anim_time']);
            G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],getLog['log_type'],this.target['pos_x'],this.target['pos_y'],0,0,getLog['back_attack'],getLog['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(getLog);
            G_BATTLE_ANIM_BATTLE_LOG();
            this.target.remove();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 14: //回復レベル1
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      if(!isset(list['battle_effect_layer'])) break;
      if(!isset(list['max_hp'])) break;
      if(!isset(list['prev_hp'])) break;
      if(!isset(list['now_hp'])) break;
      if(!isset(list['target_unique_no'])) break;
      if(!isset(list['critical'])) list['critical'] = 0;
      if(!isset(list['miss'])) list['miss'] = 0;
      if(!isset(list['hit_point'])) list['hit_point'] = 0;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 7,list['target_field'].width * 7,true,-1,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("回復レベル1");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.x = effectAnim.x + (list['target_field'].width * 0.27);
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height * 6);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['target_unique_no'] = list['target_unique_no'];
        effectAnim['max_hp'] = list['max_hp'];
        effectAnim['prev_hp'] = list['prev_hp'];
        effectAnim['now_hp'] = list['now_hp'];
        effectAnim['critical'] = list['critical'];
        effectAnim['miss'] = list['miss'];
        effectAnim['hit_point'] = list['hit_point'];
        effectAnim['log_type'] = playLog['log_type'];
        effectAnim['play_log'] = playLog;

        effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        waitTime = waitTime + effectAnim['hp_gauge_anim_time'];

        effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            G_BATTLE_HP_GAUGE_ANIM_START(this.target['target_unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],this.target['max_hp'],this.target['prev_hp'],this.target['now_hp'],this.target['hp_gauge_anim_time'],this.target['dead_anim_time']);
            G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],this.target['log_type'],this.target['pos_x'],this.target['pos_y'],this.target['critical'],this.target['miss'],0,this.target['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(playLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 15: //回復レベル2
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      if(!isset(list['battle_effect_layer'])) break;
      if(!isset(list['max_hp'])) break;
      if(!isset(list['prev_hp'])) break;
      if(!isset(list['now_hp'])) break;
      if(!isset(list['target_unique_no'])) break;
      if(!isset(list['critical'])) list['critical'] = 0;
      if(!isset(list['miss'])) list['miss'] = 0;
      if(!isset(list['hit_point'])) list['hit_point'] = 0;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 7,list['target_field'].width * 7,true,-1,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("回復レベル2");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.x = effectAnim.x + (list['target_field'].width * 0.27);
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height * 6);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['target_unique_no'] = list['target_unique_no'];
        effectAnim['max_hp'] = list['max_hp'];
        effectAnim['prev_hp'] = list['prev_hp'];
        effectAnim['now_hp'] = list['now_hp'];
        effectAnim['critical'] = list['critical'];
        effectAnim['miss'] = list['miss'];
        effectAnim['hit_point'] = list['hit_point'];
        effectAnim['log_type'] = playLog['log_type'];
        effectAnim['play_log'] = playLog;

        effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        waitTime = waitTime + effectAnim['hp_gauge_anim_time'];

        effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            G_BATTLE_HP_GAUGE_ANIM_START(this.target['target_unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],this.target['max_hp'],this.target['prev_hp'],this.target['now_hp'],this.target['hp_gauge_anim_time'],this.target['dead_anim_time']);
            G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],this.target['log_type'],this.target['pos_x'],this.target['pos_y'],this.target['critical'],this.target['miss'],0,this.target['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(playLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 23: //毒
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 7,list['target_field'].width * 7,true,-1,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("毒");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.x = effectAnim.x + (list['target_field'].width * 0.27);
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height * 6);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['play_log'] = playLog;

        effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        waitTime = waitTime + effectAnim['hp_gauge_anim_time'];

        effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            var getLog = this.target['play_log'];
            G_BATTLE_HP_GAUGE_ANIM_START(getLog['target_unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],getLog['max_hp'],getLog['prev_hp'],getLog['now_hp'],this.target['hp_gauge_anim_time'],this.target['dead_anim_time']);
            G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],getLog['log_type'],this.target['pos_x'],this.target['pos_y'],0,0,0,getLog['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(getLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 24: //パワーダウン
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 2,list['target_field'].width * 2,true,-1,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("パワーダウン");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.x = effectAnim.x + (list['target_field'].width * 0.1);
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height * 1.2);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['play_log'] = playLog;

        // effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        // waitTime = waitTime + effectAnim['hp_gauge_anim_time'];
        //
        // effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        // if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            var getLog = this.target['play_log'];
            // G_BATTLE_HP_GAUGE_ANIM_START(getLog['unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],getLog['max_hp'],getLog['prev_hp'],getLog['now_hp']);
            // G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],getLog['log_type'],this.target['pos_x'],this.target['pos_y'],0,0,0,getLog['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(getLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 25: //パワーアップ
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 2,list['target_field'].width * 2,true,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + parseInt(effectAnim['anim_time']);
        console.log("パワーアップ");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.x = effectAnim.x + (list['target_field'].width * 0.05);
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height * 1.4);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['play_log'] = playLog;

        // effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        // waitTime = waitTime + effectAnim['hp_gauge_anim_time'];
        //
        // effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        // if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            var getLog = this.target['play_log'];
            // G_BATTLE_HP_GAUGE_ANIM_START(getLog['unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],getLog['max_hp'],getLog['prev_hp'],getLog['now_hp']);
            // G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],getLog['log_type'],this.target['pos_x'],this.target['pos_y'],0,0,0,getLog['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(getLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 26: //斬撃
    {
      if(!isset(list['my_field'])) break;
      if(!isset(list['target_field'])) break;
      if(!isset(list['battle_effect_layer'])) break;
      if(!isset(list['max_hp'])) break;
      if(!isset(list['prev_hp'])) break;
      if(!isset(list['now_hp'])) break;
      if(!isset(list['target_unique_no'])) break;
      if(!isset(list['critical'])) break;
      if(!isset(list['miss'])) break;
      if(!isset(list['back_attack'])) break;
      if(!isset(list['hit_point'])) break;
      // list['my_field'] = null;
      // list['target_field'] =null;
      //反転フラグ
      var reflect = 1;
      var waitTime = 0;
      if(list['target_field']['field_x'] < list['my_field']['field_x']) reflect = -1;
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,frameRate,false,true,list['target_field'].width * 2,list['target_field'].width * 2,true,-1,skipFrame);
      if(effectAnim != null){
        waitTime = waitTime + effectAnim['anim_time'];
        console.log("斬撃");
        effectAnim.scaleX *= reflect;
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['target_field'].x;
        effectAnim.y = list['target_field'].y;
        effectAnim.y = effectAnim.y - (list['target_field'].height / 2);
        effectAnim['wait_time'] = effectAnim['anim_time'];
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim['pos_x'] = list['target_field'].x;
        effectAnim['pos_y'] = list['target_field'].y;
        effectAnim['target_unique_no'] = list['target_unique_no'];
        effectAnim['max_hp'] = list['max_hp'];
        effectAnim['prev_hp'] = list['prev_hp'];
        effectAnim['now_hp'] = list['now_hp'];
        effectAnim['critical'] = list['critical'];
        effectAnim['miss'] = list['miss'];
        effectAnim['back_attack'] = list['back_attack'];
        effectAnim['hit_point'] = list['hit_point'];
        effectAnim['log_type'] = playLog['log_type'];
        effectAnim['play_log'] = playLog;

        effectAnim['hp_gauge_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        waitTime = waitTime + effectAnim['hp_gauge_anim_time'];

        effectAnim['dead_anim_time'] = G_BATTLE_CHANGE_ANIM_SPEED(500,1,0);
        if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + effectAnim['dead_anim_time'];

        effectAnim['start_wait'] = G_BATTLE_CHANGE_ANIM_SPEED(100,1,0);
        waitTime = waitTime + effectAnim['start_wait'];

        var hpGaugeAnimTime = (parseInt(effectAnim['hp_gauge_anim_time']) * 2);
        waitTime = waitTime + hpGaugeAnimTime;
        if(parseInt(list['now_hp']) <= 0) waitTime = waitTime + parseInt(effectAnim['hp_gauge_anim_time']);
        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
          this.target.tweener.wait(this.target['start_wait']).call(function(){
            G_BATTLE_HP_GAUGE_ANIM_START(this.target['target_unique_no'],this.target['battle_effect_layer'],this.target['pos_x'],this.target['pos_y'],this.target['max_hp'],this.target['prev_hp'],this.target['now_hp'],this.target['hp_gauge_anim_time'],this.target['dead_anim_time']);
            G_BATTLE_HIT_POINT_ANIM_START(this.target['battle_effect_layer'],this.target['log_type'],this.target['pos_x'],this.target['pos_y'],this.target['critical'],this.target['miss'],this.target['back_attack'],this.target['hit_point']);
            G_BATTLE_ADD_BATTLE_LOG(playLog);
            G_BATTLE_ANIM_BATTLE_LOG();
          }).play();
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 34: //FINISH(終了)エフェクト
    {
      var spriteSize = 640;
      var effectAnim = G_ASSET_GET_SPRITE_ANIM_INDEX("battle_effect_" + effectImageId,0,spriteSize,spriteSize);
      if(effectAnim != null){
        effectAnim['is_play'] = false;
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.y = effectAnim.y - (effectAnim.height / 4);
        effectAnim.alpha = 0;
        effectAnim.scaleY = 0;
        console.log("FINISH");
        effectAnim['wait_time'] = 4000;
        effectAnim.tweener.wait(startTime + 1000).call(function(){
          this.target['is_play'] = true;
          this.target.alpha = 1;
          this.target.tweener.to({scaleY: 1},300).wait(1500).to({alpha: 0},1000).call(function(){
            this.target.remove();
          }).play();
        });
        result = effectAnim;
      }
    }
    break;
    case 35: //WIN(勝ち)エフェクト
    {
      var spriteSize = 640;
      var sprites = new Array();
      //ベース画像
      var effectAnim = Sprite('ASSET_245');
      if(effectAnim != null){
        effectAnim['is_play'] = false;
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.y = effectAnim.y - (effectAnim.height / 4);
        effectAnim['sprites'] = new Array();
        //WIN画像
        var maxIndex = 4;
        for (var i = 0; i < maxIndex; i++) {
          sprites[i] = G_ASSET_GET_SPRITE_ANIM_INDEX("battle_effect_" + effectImageId,53 + i,spriteSize,spriteSize);
        }
        if(sprites[0] != null && sprites[1] != null && sprites[2] != null && sprites[3] != null){
          var setIndex = 3;
          for (var i = 0; i < sprites.length; i++) {
            effectAnim['sprites'][setIndex] = sprites[setIndex];
            sprites[setIndex].addChildTo(effectAnim);
            sprites[setIndex].y = sprites[setIndex].y - (sprites[setIndex].height / 4);
            sprites[setIndex].alpha = 0;
            setIndex = setIndex - 1;
          }
          effectAnim['fire_flower'] = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,15,true,true,spriteSize,spriteSize,true,52);
          effectAnim['fire_flower'].addChildTo(effectAnim);
          effectAnim['fire_flower'].y = effectAnim['fire_flower'].y - (effectAnim['fire_flower'].height / 4);
          console.log("WIN");
          effectAnim['wait_time'] = 8000;
          effectAnim.tweener.wait(startTime + 1000).call(function(){
            this.target['is_play'] = true;
            var spriteWait1 = 500;
            for (var i = 0; i < this.target['sprites'].length; i++) {
              var sprite = this.target['sprites'][i];
              sprite.tweener.to({alpha: 1},500).wait(spriteWait1).scaleTo(1.4,150,"easeOutInOutBack").scaleTo(1.0,150,"easeOutInOutBack").play();
              spriteWait1 = spriteWait1 + 500;
            }
            this.target['fire_flower'].tweener.wait(1000).call(function(){
              this.target.stopFrameIndex(-1); //アニメーション開始
            }).play();
            this.target.tweener.wait(6000).to({alpha: 0},500).call(function(){
              this.target.remove();
            }).play();
          });
        }
        result = effectAnim;
      }
    }
    break;
    case 36: //LOSE(負け)エフェクト
    {
      var spriteSize = 640;
      var sprites = new Array();
      //背景画像
      var effectAnim = Sprite('ASSET_849');
      effectAnim.width = spriteSize;
      effectAnim.height = spriteSize;
      //LOSE画像
      var maxIndex = 4;
      for (var i = 0; i < maxIndex; i++) {
        sprites[i] = G_ASSET_GET_SPRITE_ANIM_INDEX("battle_effect_" + effectImageId,i,spriteSize,spriteSize);
      }
      if(effectAnim != null && sprites[0] != null && sprites[1] != null && sprites[2] != null && sprites[3] != null){
        effectAnim['is_play'] = false;
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.y = effectAnim.y - (effectAnim.height / 4);
        effectAnim['sprites'] = new Array();
        for (var i = 0; i < sprites.length; i++) {
          effectAnim['sprites'][i] = sprites[i];
          sprites[i].addChildTo(effectAnim);
          sprites[i].y = sprites[i].y - sprites[i].height;
        }
        effectAnim.alpha = 0;
        console.log("LOSE");
        effectAnim['wait_time'] = 8000;
        effectAnim.tweener.wait(startTime + 1000).to({alpha: 1},500).call(function(){
          this.target['is_play'] = true;
          var step1Wait = 350;
          for (var i = 0; i < this.target['sprites'].length; i++) {
            var lose = this.target['sprites'][i];
            lose.tweener.by({y: lose.height},step1Wait,"swing").wait(2500).by({y: lose.height},step1Wait,"easeInQuart").play();
            step1Wait = step1Wait + 350;
          }
          this.target.tweener.wait(5000).to({alpha: 0},500).call(function(){
            this.target.remove();
          });
        });
        result = effectAnim;
      }

      // var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,15,false,true,640,640,true);
      // if(effectAnim != null){
      //   effectAnim.addChildTo(list['battle_effect_layer']);
      //   effectAnim.y = effectAnim.y - (effectAnim.height / 4);
      //   console.log("LOSE");
      //   effectAnim['wait_time'] = 3000;
      //   effectAnim.tweener.wait(waitTime).call(function(){
      //     this.target.stopFrameIndex(-1); //アニメーション開始
      //   });
      //   result = effectAnim;
      // }
    }
    break;
    case 37: //アクション実行
    {
      var frameRate = G_BATTLE_CHANGE_ANIM_SPEED(15,1,0);
      var skipFrame = (G_BATTLE_CHANGE_ANIM_SPEED(0,2,0) - 1);
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,15,false,true,list['my_field'].width * 4,list['my_field'].width * 4,true,-1,skipFrame);
      if(effectAnim != null){
        var waitTime = 0;
        waitTime = waitTime + effectAnim['anim_time'];
        console.log("アクション実行");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['my_field'].x;
        //effectAnim.x = effectAnim.x + (list['my_field'].width * 0.05);
        effectAnim.y = list['my_field'].y;
        effectAnim.y = effectAnim.y - (list['my_field'].height * 2);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
        });
        effectAnim['wait_time'] = waitTime;
        result = effectAnim;
      }
    }
    break;
    case 38: //レベルアップ
    {
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,15,false,true,258,145,true);
      if(effectAnim != null){
        console.log("レベルアップアニメ実行");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = list['my_field'].x;
        //effectAnim.x = effectAnim.x + (list['my_field'].width * 0.05);
        effectAnim.y = list['my_field'].y;
        effectAnim.y = effectAnim.y - (list['my_field'].height * 2);
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
        });
        result = effectAnim;
      }
    }
    break;
    case 39: //ステージクリア
    {
      var effectAnim = G_ASSET_GET_SPRITE_ANIM("battle_effect_" + effectImageId,15,false,true,640,360,true);
      if(effectAnim != null){
        console.log("ステージクリアアニメ実行");
        effectAnim.addChildTo(list['battle_effect_layer']);
        effectAnim.x = 0;
        //effectAnim.x = effectAnim.x + (list['my_field'].width * 0.05);
        effectAnim.y = 0;
        effectAnim.y = effectAnim.y - SCREEN_HEIGHT * 0.35;
        effectAnim['battle_effect_layer'] = list['battle_effect_layer'];
        effectAnim.tweener.wait(startTime).call(function(){
          this.target.stopFrameIndex(-1); //アニメーション開始
        });
        result = effectAnim;
      }
    }
    break;
    default:
    {

    }
    break;
  }
  if(result != null && isset(result['wait_time'])){
    console.log(effectImageId);
    console.log(result['wait_time']);
    console.log("加算中" + waitTime);
    console.log("ウェイトタイム");
  }
  else{
    console.log("アニメない2");
    console.log(effectImageId);
    console.log(list);
    console.log(waitTime);
    console.log(playLog);
    console.log(result);
  }
  return result;
}

function G_BATTLE_EFFECT_SLASHING(options){ //斬撃エフェクトを生成
  var direction = 0; //エフェクトの向き
  var color = 0; //カラー
  if(isset(options['direction'])) direction = options['direction'];
  if(isset(options['color'])) color = options['color'];

}

function G_BATTLE_EFFECT_DAMAGE_DIGIT(damage,critical){ //ダメージ数表示のエフェクト

}

function G_BATTLE_EFFECT_HP_GAUGE_ANIM(gauge){ //ゲージアニメーション開始

}
