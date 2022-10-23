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
    this.backgroundColor = 'gray';
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
    TEST_ROOM_NODE3.width = TEST_ROOM_NODE3.width * 2;
    TEST_ROOM_NODE3.height = TEST_ROOM_NODE3.height * 2;

    //表示ノード4
    TEST_ROOM_NODE4 = Sprite('ASSET_140').addChildTo(TEST_ROOM_SCENE_BASE);
    //TEST_ROOM_NODE.x = TEST_ROOM_NODE.x + (SCREEN_WIDTH / 2)
    //TEST_ROOM_NODE4.y = TEST_ROOM_NODE4.y - (SCREEN_HEIGHT * 0.3);
    TEST_ROOM_NODE4.x = TEST_ROOM_NODE4.x + (SCREEN_WIDTH * 0.15);

    var testEquipItemMaster = new Array();
    testEquipItemMaster['card_rank'] = 3;
    testEquipItemMaster['equip_category_id'] = 1;
    testEquipItemMaster['weapon_category_id'] = 2;
    testEquipItemMaster['sub_weapon_category_id'] = 0;
    testEquipItemMaster['armor_category_id'] = 0;
    testEquipItemMaster['attribute_category_id'] = 3;

    var itemId = 1;
    var itemMasterData = G_ITEM_GET_ITEM_MASTER_DATA(itemId);
    var testIcon = G_ITEM_ICON_CREATE(0,itemMasterData,0.25,10);
    testIcon.addChildTo(TEST_ROOM_SCENE_BASE);


    //var itemInfoWindow = G_ITEM_CREATE_ITEM_INFO_WINDOW(2,itemMasterData);
    //itemInfoWindow.addChildTo(TEST_ROOM_SCENE_BASE);
    //NETWORK_IS_CONNECTING = true;
    //ajaxStart("post","json","../../client/testRoom/testRoom.php",null); //非同期通信開始
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    var colors = ['skyblue', 'black', 'gray', 'green', 'blue', 'red'];
    this.backgroundColor = colors.random();
    //テストエフェクトを表示
    G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE);
    // G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE1);
    // G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE2);
    // G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE3);
    // G_TEST_ROOM_EFFECT_1(TEST_ROOM_NODE4);
  },
  update: function() {
    // カメラと視界の座標更新
    //this.viewField.rotation = -this.count - 90;
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

function G_TEST_ROOM_EFFECT_1(parentBase,color){
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
  var maxEffectNum = 30;
  var effectNum = 0;
  var waitTime = 0;
  while(effectNum < maxEffectNum){
    var particleBase = PlainElement({ //パーティクル表示ノード
      }).addChildTo(parentBase);

    //表示座標の動く玉
    var obj = CircleShape({radius:5}).addChildTo(parentBase);
    obj.y = obj.y - (obj.height * 12);
    obj.x = obj.x - (obj.width * 6);
    obj['anim_speed'] = 25;
    obj['particle_base'] = particleBase;
    obj['add_speed'] = 0.25;
    obj['now_pos_x'] = obj.x;
    obj['now_pos_y'] = obj.y;
    obj['begin_pos_x'] = obj.x;
    obj['begin_pos_y'] = obj.y;
    obj['max_bottom'] = obj.y + (obj.height * 12);
    obj['max_right'] = obj.x + (obj.width * 6);
    obj['height_step'] = 0; //縦動作のアニメーション進行ステップ
    obj['anim_step'] = 0;
    obj['add_size'] = 0;
    obj['update_count'] = 0;
    obj['max_size'] = 10;
    obj['size_switch'] = 0;
    obj.tweener2 = phina.accessory.Tweener().attachTo(obj);
    obj.tweener.by({x:obj.width * 10},150 + waitTime,"easeInQuad").by({x:obj.width},50 + waitTime,"easeInQuad").play();
    obj.tweener2.by({y:obj.width * 15},150 + waitTime,"easeOutQuad").call(function(){this.target['size_switch'] = 1;}).by({y:-obj.width * 1.5},50 + waitTime,"easeInQuad").call(function(){
      this.target['anim_step'] = 1;
    }).play();
    obj.visible = false;
    obj.update = function() {

      if(this['size_switch'] == 0)this['add_size'] = this['add_size'] + parseInt(this['update_count'] * 1.25);
      else this['add_size'] = this['add_size'] - parseInt(this['update_count'] * 0.5);
      if(this['max_size'] < this['add_size']) this['add_size'] = this['max_size'];
      if(this['add_size'] < 0) this['add_size'] = 0;

      if(this['now_pos_x'] != this.x){
        this['begin_pos_x'] = this['now_pos_x'];
        this['now_pos_x'] = this.x;
      }
      if(this['now_pos_y'] != this.y){
        this['begin_pos_y'] = this['now_pos_y'];
        this['now_pos_y'] = this.y;
      }

      //エフェクト表示処理
      if(this['anim_step'] != 1){
        var circle = CircleShape().addChildTo(particleBase);
        var scaleRand = Math.randint(8 + this['add_size'],14 + this['add_size']);
        var scaleDownSpd = 0.1;

        scaleRand = scaleRand * 0.01;
        circle['scale_down_spd'] = scaleDownSpd;
        circle['rand_scale'] = scaleRand;
        circle.scaleX = scaleRand;
        circle.scaleY = scaleRand;

        var xPosRand = this.x;
        // if(this['begin_pos_x'] != this.x){
        //   if(this['begin_pos_x'] < this.x) xPosRand = Math.randfloat(this['begin_pos_x'],this.x);
        //   else xPosRand = Math.randfloat(this.x,this['begin_pos_x']);
        // }

        var yPosRand = this.y;
        // if(this['begin_pos_y'] != this.y){
        //   if(this['begin_pos_y'] < this.y) yPosRand = Math.randfloat(this['begin_pos_y'],this.y);
        //   else yPosRand = Math.randfloat(this.y,this['begin_pos_y']);
        // }

        circle.y = yPosRand;
        circle.x = xPosRand;
        circle.blendMode = 'lighter';
        var grad = circle.canvas.context.createRadialGradient(0, 0, 0, 0, 0, circle.radius);
        grad.addColorStop(0, 'hsla({0}, 75%, 50%, 1.0)'.format(Math.randint(particle_color_start, particle_color_end)));
        grad.addColorStop(1, 'hsla({0}, 75%, 50%, 0.0)'.format(Math.randint(particle_color_start, particle_color_end)));
        circle.fill = grad;
        circle.strokeWidth = 0;
        circle.update = function() {
          this.alpha = this.alpha - this['scale_down_spd'];
          if(this.alpha < 0){
            this.remove();
          }
        };
      }
      //アニメーション終了
      if(this['anim_step'] == 1 && this['particle_base'].children.length == 0){
        this.remove();
        this['particle_base'].remove();
      }
      this['update_count'] = this['update_count'] + 1;
    };
    effectNum = effectNum + 1;
    waitTime = waitTime + Math.randint(1,10);
  }
}
