// //============================================
// //  アニメーションリスト雛形に使用
// //============================================
// //パブリック変数定義
// var WORLD_MAP_SCENE_INSTANCE = null;//ワールドマップのシーンインスタンス
// var WORLD_MAP_SCENE_BASE = null; //ワールドマップの親
// var WORLD_MAP_UI_LAYER = null; //UIレイヤー
// var WORLD_MAP_PLANET_LAYER = null; //惑星表示レイヤー
// var WORLD_MAP_SWIPE_START_POS = 0; //スワイプスタート位置
// var WORLD_MAP_SWIPE_MOVE_POS = 0; //スワイプ中の位置
// var WORLD_MAP_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
// var WORLD_MAP_SELECT_PLANET_INDEX = 0; //選択中の惑星のindex
// var WORLD_MAP_PLANET_IMAGE_LIST = new Array(); //惑星のイメージリスト
// var WORLD_MAP_PLANET_ANIM_FLAG = false; //惑星選択のアニメーション中か
//
// phina.define("WorldMap", {
//   // 継承
//   superClass: 'DisplayScene',
//   // 初期化
//   init: function() {
//     G_SCENE_INIT();
//     //現在のシーン設定を更新
//     SCENE_MANAGER['now_scene'] = "worldMap";
//     //メンバー初期化
//     WORLD_MAP_SCENE_INSTANCE = null;//ワールドマップのシーンインスタンス
//     WORLD_MAP_UI_LAYER = null; //UIレイヤー
//     WORLD_MAP_SCENE_BASE = null; //ワールドマップのベース
//     WORLD_MAP_PLANET_LAYER = null; //惑星表示レイヤー
//     WORLD_MAP_SWIPE_START_POS = 0; //スワイプスタート位置
//     WORLD_MAP_SWIPE_MOVE_POS = 0; //スワイプ中の位置
//     WORLD_MAP_SWIPE_CHECK = 0; //スワイプ判定 0:判定なし 1:左 2:右
//     WORLD_MAP_SELECT_PLANET_INDEX = 0; //選択中の惑星のindex
//     WORLD_MAP_PLANET_IMAGE_LIST = new Array(); //惑星のイメージリスト
//     WORLD_MAP_PLANET_ANIM_FLAG = false; //惑星選択のアニメーション中か
//
//     // 親クラス初期化
//     this.superInit();
//     // 背景色
//     this.backgroundColor = 'black';
//
//     WORLD_MAP_SCENE_INSTANCE = this;
//
//     WORLD_MAP_SCENE_BASE = PlainElement({ //シーンの親ノード生成
//       width: this.gridX.width,
//       height: this.gridY.height,
//     }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
//     //UIレイヤー
//     WORLD_MAP_UI_LAYER = PlainElement({ //シーンの親ノード生成
//       width: this.gridX.width,
//       height: this.gridY.height,
//     }).addChildTo(WORLD_MAP_SCENE_BASE);
//     //惑星レイヤー
//     WORLD_MAP_PLANET_LAYER = PlainElement({ //シーンの親ノード生成
//       width: this.gridX.width,
//       height: this.gridY.height,
//     }).addChildTo(WORLD_MAP_SCENE_BASE);
//
//     //ヘッダー表示
//     var headerSptite = Sprite('ASSET_34').addChildTo(WORLD_MAP_UI_LAYER);
//     //headerSptite.x = this.gridX.center();
//     headerSptite.y = headerSptite.y - ((SCREEN_HEIGHT / 2) - (headerSptite.height / 2));
//
//     var headerLabel = Label({
//       text: 'ワールドマップ',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(headerSptite);
//     NETWORK_IS_CONNECTING = true;
//
//     //移動時間ラベル
//     var moveTimeLabel = Label({
//       text: '移動時間',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(WORLD_MAP_UI_LAYER);
//     moveTimeLabel.y = moveTimeLabel.y + (moveTimeLabel.height / 2);
//
//     //移動時間表示背景
//     var moveTimeBgImage = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
//     moveTimeBgImage.setPosition(moveTimeLabel.x,moveTimeLabel.y);
//     moveTimeBgImage.y = moveTimeBgImage.y + moveTimeBgImage.height;
//
//     //移動時間の時間ラベル
//     var moveTimeValLabel = Label({
//       text: '00時間00分00秒',
//       fontSize: 24,
//       fill: 'black',
//     }).addChildTo(moveTimeBgImage);
//
//     //移動ボタン
//     var worldMoveBtn = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
//     worldMoveBtn.setPosition(moveTimeBgImage.x,moveTimeBgImage.y);
//     worldMoveBtn.y = worldMoveBtn.y + (moveTimeBgImage.height * 1.25);
//     worldMoveBtn['label'] = Label({
//       text: '移動',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(worldMoveBtn);
//     worldMoveBtn['btn'] = Button({
//       width: 160,         // 横サイズ
//       height: 64,        // 縦サイズ
//     }).addChildTo(worldMoveBtn);
//     worldMoveBtn['btn'].onpointend = function(e){
//       console.log("移動ボタン");
//     };
//     worldMoveBtn['btn'].visible = false;
//
//     //選択変更ボタン←前
//     var selectChangeBtnPrev = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
//     selectChangeBtnPrev.setPosition(worldMoveBtn.x,worldMoveBtn.y);
//     selectChangeBtnPrev.x = selectChangeBtnPrev.x - (selectChangeBtnPrev.width * 1.5);
//     selectChangeBtnPrev['label'] = Label({
//       text: '←前',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(selectChangeBtnPrev);
//     selectChangeBtnPrev['btn'] = Button({
//       width: 160,         // 横サイズ
//       height: 64,        // 縦サイズ
//     }).addChildTo(selectChangeBtnPrev);
//     selectChangeBtnPrev['btn'].onpointend = function(e){
//       console.log("←前ボタン");
//     };
//     selectChangeBtnPrev['btn'].visible = false;
//
//     //選択変更ボタン次→
//     var selectChangeBtnNext = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
//     selectChangeBtnNext.setPosition(worldMoveBtn.x,worldMoveBtn.y);
//     selectChangeBtnNext.x = selectChangeBtnNext.x + (selectChangeBtnNext.width * 1.5);
//     selectChangeBtnNext['label'] = Label({
//       text: '次→',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(selectChangeBtnNext);
//     selectChangeBtnNext['btn'] = Button({
//       width: 160,         // 横サイズ
//       height: 64,        // 縦サイズ
//     }).addChildTo(selectChangeBtnNext);
//     selectChangeBtnNext['btn'].onpointend = function(e){
//       console.log("次→ボタン");
//     };
//     selectChangeBtnNext['btn'].visible = false;
//
//     //現在地のエリア名表示背景
//     var myAreaNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
//     myAreaNameDispBg.width = myAreaNameDispBg.width * 0.9;
//     myAreaNameDispBg.height = myAreaNameDispBg.height * 0.9;
//     myAreaNameDispBg.y = myAreaNameDispBg.y + ((SCREEN_HEIGHT / 2) - (myAreaNameDispBg.height / 2));
//     myAreaNameDispBg.x = myAreaNameDispBg.x - ((SCREEN_WIDTH / 2) - (myAreaNameDispBg.width / 2));
//
//     //現在地のエリア名ラベル
//     var myAreaNameLabel = Label({
//       text: '・・・',
//       fontSize: 24,
//       fill: 'black',
//     }).addChildTo(myAreaNameDispBg);
//
//     //移動先のエリア名表示背景
//     var moveAreaNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
//     moveAreaNameDispBg.width = moveAreaNameDispBg.width * 0.9;
//     moveAreaNameDispBg.height = moveAreaNameDispBg.height * 0.9;
//     moveAreaNameDispBg.y = myAreaNameDispBg.y
//     moveAreaNameDispBg.x = moveAreaNameDispBg.x + ((SCREEN_WIDTH / 2) - (moveAreaNameDispBg.width / 2));
//
//     //移動先のエリア名ラベル
//     var moveAreaNameLabel = Label({
//       text: '・・・',
//       fontSize: 24,
//       fill: 'black',
//     }).addChildTo(moveAreaNameDispBg);
//
//     //黄色三角(左)
//     var yellowTriangleLeft = Sprite('ASSET_415').addChildTo(WORLD_MAP_UI_LAYER);
//     yellowTriangleLeft.setPosition(myAreaNameDispBg.x,myAreaNameDispBg.y);
//     yellowTriangleLeft.y = yellowTriangleLeft.y - (myAreaNameDispBg.height * 1.1);
//
//     //黄色三角(右)
//     var yellowTriangleRight = Sprite('ASSET_415').addChildTo(WORLD_MAP_UI_LAYER);
//     yellowTriangleRight.setPosition(moveAreaNameDispBg.x,moveAreaNameDispBg.y);
//     yellowTriangleRight.y = yellowTriangleRight.y - (moveAreaNameDispBg.height * 1.1);
//
//     //現在地のワールド名表示背景
//     var myWorldNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
//     myWorldNameDispBg.width = myWorldNameDispBg.width * 0.9;
//     myWorldNameDispBg.height = myWorldNameDispBg.height * 0.9;
//     myWorldNameDispBg.setPosition(yellowTriangleLeft.x,yellowTriangleLeft.y);
//     myWorldNameDispBg.y = myWorldNameDispBg.y - (myWorldNameDispBg.height * 1.1);
//
//     //現在地のワールド名ラベル
//     var myWorldNameLabel = Label({
//       text: '・・・',
//       fontSize: 24,
//       fill: 'black',
//     }).addChildTo(myWorldNameDispBg);
//
//     //移動先のワールド名表示背景
//     var moveWorldNameDispBg = Sprite('ASSET_139').addChildTo(WORLD_MAP_UI_LAYER);
//     moveWorldNameDispBg.width = moveWorldNameDispBg.width * 0.9;
//     moveWorldNameDispBg.height = moveWorldNameDispBg.height * 0.9;
//     moveWorldNameDispBg.setPosition(yellowTriangleRight.x,yellowTriangleRight.y);
//     moveWorldNameDispBg.y = moveWorldNameDispBg.y - (moveWorldNameDispBg.height * 1.1);
//
//     //移動先のワールド名ラベル
//     var moveWorldNameLabel = Label({
//       text: '・・・',
//       fontSize: 24,
//       fill: 'black',
//     }).addChildTo(moveWorldNameDispBg);
//
//     //現在地ラベル
//     var myPositionLabel = Label({
//       text: '現在地',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(WORLD_MAP_UI_LAYER);
//     myPositionLabel.setPosition(myWorldNameDispBg.x,myWorldNameDispBg.y);
//     myPositionLabel.y = myPositionLabel.y - myWorldNameDispBg.height * 1.1;
//
//     //移動先ラベル
//     var movePositionLabel = Label({
//       text: '移動先',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(WORLD_MAP_UI_LAYER);
//     movePositionLabel.setPosition(moveWorldNameDispBg.x,moveWorldNameDispBg.y);
//     movePositionLabel.y = movePositionLabel.y - moveWorldNameDispBg.height * 1.1;
//
//     //惑星表示(テスト)
//     var planetList = new Array();
//     for (var i = 0; i < 3; i++) {
//       planetList[i] = new Array();
//       planetList[i]['id'] = i;
//       planetList[i]['name'] = "ワールド(テスト表示)" + i;
//       if(i == 0){
//         planetList[i]['asset_id'] = "416";
//         planetList[i]['world_id'] = "1";
//       }
//       if(i == 1){
//         planetList[i]['asset_id'] = "417";
//         planetList[i]['world_id'] = "1";
//       }
//       if(i == 2){
//         planetList[i]['asset_id'] = "418";
//         planetList[i]['world_id'] = "1";
//       }
//     }
//
//     //スワイプ領域
//
//     var swipeAreaButton = Button({
//       width: 640,         // 横サイズ
//       height: 640,        // 縦サイズ
//     }).addChildTo(WORLD_MAP_UI_LAYER);
//     swipeAreaButton.y = swipeAreaButton.y - (swipeAreaButton.height / 2);
//     swipeAreaButton.onpointstart = function(e){
//       if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
//       WORLD_MAP_SWIPE_START_POS = e.pointer.x;
//     };
//     swipeAreaButton.onpointmove = function(e){
//       if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
//       WORLD_MAP_SWIPE_MOVE_POS = e.pointer.x;
//       var diffPos = WORLD_MAP_SWIPE_START_POS - WORLD_MAP_SWIPE_MOVE_POS;
//       if(150 < diffPos) WORLD_MAP_SWIPE_CHECK = 1;
//       if(diffPos < -150) WORLD_MAP_SWIPE_CHECK = 2;
//     };
//     swipeAreaButton.onpointend = function(e){
//       if(WORLD_MAP_PLANET_ANIM_FLAG == true) return;
//       WORLD_MAP_SWIPE_START_POS = 0;
//       WORLD_MAP_SWIPE_MOVE_POS = 0;
//       if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
//       if(WORLD_MAP_SWIPE_CHECK != 0){
//         if(WORLD_MAP_SWIPE_CHECK == 1){//左
//           console.log("左");
//           //G_WORLD_MAP_PLANET_CHANGE_ANIM_START(WORLD_MAP_SWIPE_CHECK,planetList,WORLD_MAP_PLANET_IMAGE_LIST,index);
//           WORLD_MAP_SELECT_PLANET_INDEX ++;
//           G_WORLD_MAP_PLANET_CHANGE_ANIM_START(2,planetList,WORLD_MAP_PLANET_IMAGE_LIST);
//           //G_WRLD_MAP_PLANET_DISP_INIT(planetList,WORLD_MAP_PLANET_IMAGE_LIST);
//         }
//         if(WORLD_MAP_SWIPE_CHECK == 2){//右
//           console.log("右");
//           WORLD_MAP_SELECT_PLANET_INDEX --;
//           G_WORLD_MAP_PLANET_CHANGE_ANIM_START(1,planetList,WORLD_MAP_PLANET_IMAGE_LIST);
//           //G_WRLD_MAP_PLANET_DISP_INIT(planetList,WORLD_MAP_PLANET_IMAGE_LIST);
//           //G_WORLD_MAP_PLANET_CHANGE_ANIM_START(WORLD_MAP_SWIPE_CHECK,planetList,WORLD_MAP_PLANET_IMAGE_LIST,index);
//         }
//         WORLD_MAP_SWIPE_CHECK = 0;
//       }
//     };
//     swipeAreaButton.visible = false;
//
//     G_WRLD_MAP_PLANET_DISP_INIT(planetList,WORLD_MAP_PLANET_IMAGE_LIST);
//
//     //戻るボタン
//     var backButton = Sprite('ASSET_79').addChildTo(WORLD_MAP_UI_LAYER);
//     backButton.y = backButton.y - ((SCREEN_HEIGHT / 2) - ((backButton.height / 2) + headerSptite.height));
//     backButton.x = backButton.x + ((SCREEN_WIDTH / 2) - (backButton.width / 2));
//     backButton['label'] = Label({
//       text: '戻る',
//       fontSize: 24,
//       fill: 'white',
//     }).addChildTo(backButton);
//     backButton['btn'] = Button({
//       width: 160,         // 横サイズ
//       height: 64,        // 縦サイズ
//     }).addChildTo(backButton);
//     backButton['btn'].onpointend = function(e){
//       var prevSceneName = SCENE_MANAGER['prev_scene'];
//       SCENE_MANAGER['prev_scene'] = "worldMap";
//       WORLD_MAP_SCENE_INSTANCE.exit(prevSceneName);
//     };
//     backButton['btn'].visible = false;
//
//     ajaxStart("post","json","../../client/worldMap/worldMap.php",null); //非同期通信開始
//   },
//   // タッチで次のシーンへ
//   onpointstart: function() {
//     //this.exit();
//   },
//   update: function() {
//     if(RESULT_DATA != ""){
//       var json = JSON.parse(RESULT_DATA);//jsonをパース
//       if(isset(json["session_status"])){
//         if(json["session_status"] == 0){ //セッションチェック完了
//
//         }
//         else{
//           alert("セッションが切れました。タイトルに戻ります。");
//           this.exit("title");
//         }
//       }
//       else{
//         alert("不正な通信情報が検出されました。タイトルに戻ります。");
//         this.exit("title");
//       }
//       RESULT_DATA = "";//通信結果を初期化
//       NETWORK_IS_CONNECTING = false;
//     }
//   },
// });
//
// //1アニメ開始(visible trueのやつだけアニメ移動)
// //2アニメ終了時に以下の関数を呼ぶ
// function G_WRLD_MAP_PLANET_DISP_INIT(planetList,planetImageList){ //惑星の初期表示
//   for (var i = 0; i < 5; i++) {
//     if(isset(planetImageList[i]) && planetImageList[i] != null) planetImageList[i].remove();
//   }
//   var maxIndex = (planetList.length - 1);
//
//   if(WORLD_MAP_SELECT_PLANET_INDEX < 0) WORLD_MAP_SELECT_PLANET_INDEX = maxIndex;
//   if(maxIndex < WORLD_MAP_SELECT_PLANET_INDEX) WORLD_MAP_SELECT_PLANET_INDEX = 0;
//   var planetData = planetList[WORLD_MAP_SELECT_PLANET_INDEX];
//   planetImageList[2] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
//   planetImageList[2].y = planetImageList[2].y - (planetImageList[2].height / 2.25);
//   planetImageList[2].setScale(0.9,0.9);
//   planetImageList[2]['world_id'] = planetData['world_id'];
//   planetImageList[2]['index'] = 2;
//   planetImageList[2].visible = true;
//
//   var right1Index = WORLD_MAP_SELECT_PLANET_INDEX + 1;
//   if(maxIndex < right1Index) right1Index = 0;
//   planetData = planetList[right1Index];
//   planetImageList[3] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
//   planetImageList[3].y = planetImageList[3].y - (planetImageList[3].height / 2.25);
//   planetImageList[3].x = planetImageList[3].x + (planetImageList[3].width * 1.1);
//   planetImageList[3].setScale(0.8,0.8);
//   planetImageList[3]['world_id'] = planetData['world_id'];
//   planetImageList[3]['index'] = 3;
//   planetImageList[3].visible = true;
//
//   var right2Index = WORLD_MAP_SELECT_PLANET_INDEX + 2;
//   if((maxIndex + 1) < right2Index){
//     if(maxIndex < 1) right2Index = 0;
//     else right2Index = 1;
//   }
//   else if(maxIndex < right2Index) right2Index = 0;
//   planetData = planetList[right2Index];
//   planetImageList[4] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
//   planetImageList[4].y = planetImageList[4].y - (planetImageList[4].height / 2.25);
//   planetImageList[4].x = planetImageList[3].x;
//   planetImageList[4].x = planetImageList[4].x + (planetImageList[4].width * 1.1);
//   planetImageList[4].setScale(0.8,0.8);
//   planetImageList[4]['world_id'] = planetData['world_id'];
//   planetImageList[4]['index'] = 4;
//   planetImageList[4].visible = true;
//
//   var left1Index = WORLD_MAP_SELECT_PLANET_INDEX - 1;
//   if(left1Index < 0) left1Index = maxIndex;
//   planetData = planetList[left1Index];
//   planetImageList[1] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
//   planetImageList[1].y = planetImageList[1].y - (planetImageList[1].height / 2.25);
//   planetImageList[1].x = planetImageList[1].x - (planetImageList[1].width * 1.1);
//   planetImageList[1].setScale(0.8,0.8);
//   planetImageList[1]['world_id'] = planetData['world_id'];
//   planetImageList[1]['index'] = 1;
//   planetImageList[1].visible = true;
//
//   var left2Index = WORLD_MAP_SELECT_PLANET_INDEX - 2;
//   if(left2Index < 0) left2Index = maxIndex - 1;
//   if(left2Index < 0) left2Index = maxIndex;
//   planetData = planetList[left2Index];
//   planetImageList[0] = Sprite('ASSET_' + planetData['asset_id']).addChildTo(WORLD_MAP_PLANET_LAYER);
//   planetImageList[0].y = planetImageList[0].y - (planetImageList[0].height / 2.25);
//   planetImageList[0].x = planetImageList[1].x;
//   planetImageList[0].x = planetImageList[1].x - (planetImageList[0].width * 1.1);
//   planetImageList[0].setScale(0.8,0.8);
//   planetImageList[0]['world_id'] = planetData['world_id'];
//   planetImageList[0]['index'] = 0;
//   planetImageList[0].visible = true;
//
//   console.log("index");
//   console.log(WORLD_MAP_SELECT_PLANET_INDEX);
// }
//
// function G_WORLD_MAP_PLANET_CHANGE_ANIM_START(direction,planetList,planetImageList){ //惑星変更アニメーションを開始 direction 1:左 2:右
//   WORLD_MAP_PLANET_ANIM_FLAG = true;
//   var movePosX = planetImageList[0].width * 1.1;
//   if(direction == 2) movePosX = movePosX * -1;
//   for (var i = 0; i < planetImageList.length; i++) {
//     var planetScale = 1.0;
//     if(direction == 1){
//       if(i == 0) planetScale = 0.8;
//       if(i == 1) planetScale = 0.9;
//       if(i == 2) planetScale = 0.8;
//       if(i == 3) planetScale = 0.8;
//       if(i == 4) planetScale = 0.8;
//     }
//     else if(direction == 2){
//       if(i == 0) planetScale = 0.8;
//       if(i == 1) planetScale = 0.8;
//       if(i == 2) planetScale = 0.8;
//       if(i == 3) planetScale = 0.9;
//       if(i == 4) planetScale = 0.8;
//     }
//
//     planetImageList[i].tweener.to({
//       x: (planetImageList[i].x + movePosX), y: planetImageList[i].y,
//       scaleX: planetScale,
//       scaleY: planetScale,
//     }, 500).play();
//     planetImageList[i].tweener.call(function(){
//       if(this.target['index'] == (planetImageList.length - 1)){
//         console.log("リストイメージ初期化");
//         G_WRLD_MAP_PLANET_DISP_INIT(planetList,planetImageList);
//         WORLD_MAP_PLANET_ANIM_FLAG = false;
//       }
//       this.target.remove();
//       this.target = null;
//     });
//   }
// }
