//アセット関連処理

function G_ASSET_ADD_LOAD_ASSET_DATA(sceneInstance,prevScene,nextScene,loadAssetDatas){ //アセットを追加読み込みする(ロードシーン経由)
  var loadFlag = false;
  if(isset(loadAssetDatas['assets']) && isset(loadAssetDatas['load_asset_datas'])){
    var resultAssetDatas = loadAssetDatas['assets'];
    var resultLoadAssetDatas = loadAssetDatas['load_asset_datas'];
    for (key in resultAssetDatas) {
      var loadAssetCheck = true;
      var checkLoadAssetId = key.replace( 'ASSET_', '' );
      for(var la=0; la < LOAD_ASSET.length; la++){
        if(LOAD_ASSET[la]['id'] == checkLoadAssetId){
          loadAssetCheck = false;
          break;
        }
      }
      if(loadAssetCheck == false) continue; //既にロード済みのアセットだった。
      loadFlag = true;
      ADD_LOAD_ASSETS["image"][key] = resultAssetDatas[key];
      console.log("読み込みしたアセット:" + key);
      for (var la = 0; la < resultLoadAssetDatas.length; la++) {
        if(checkLoadAssetId == resultLoadAssetDatas[la]['id']){
          LOAD_ASSET[LOAD_ASSET.length] = resultLoadAssetDatas[la];
          break;
        }
      }
    }
  }
  SCENE_MANAGER['prev_scene'] = prevScene;
  if(loadFlag == true){ //読み込みが発生した場合
    console.log("アセット読み込み発生");
    LOAD_NEXT_SCENE = nextScene;
    sceneInstance.exit("loadAssets"); //追加読み込みシーンのテスト中
  }
  else{
    console.log("アセット読み込みなし");
    sceneInstance.exit(LOAD_NEXT_SCENE); //追加読み込みシーンのテスト中
  }
}

//tagからスプライトを取得
function G_ASSET_GET_SPRITE(tag){
  var assetId = -1;
  var sprite = null;
  for (var i = 0; i < LOAD_ASSET.length; i++) {
    if(LOAD_ASSET[i]['tag'] == tag){
      assetId = LOAD_ASSET[i]['id'];
      break;
    }
  }
  if(assetId != -1){
    sprite = Sprite('ASSET_' + assetId);
  }
  return sprite;
}

//tagからアセットIDを取得
function G_ASSET_GET_ASSET_ID(tag){
  var assetId = -1;
  for (var i = 0; i < LOAD_ASSET.length; i++) {
    if(LOAD_ASSET[i]['tag'] == tag){
      assetId = LOAD_ASSET[i]['id'];
      break;
    }
  }
  return assetId;
}

//アニメーションフレームストップのプロトタイプ関数 -1でオフ -1以外で再実行
Sprite.prototype.stopFrameIndex = function(frameIndex){
  if(isset(this['stop_frame_index'])){
    this['stop_frame_index'] = frameIndex;
  }
}

//ループを開始するフレームを指定
Sprite.prototype.loopStartFrameIndex = function(frameIndex){
  if(isset(this['loop_start_frame_index'])){
    this['loop_start_frame_index'] = frameIndex;
  }
}


//スプライトアニメーションを取得
function G_ASSET_GET_SPRITE_ANIM(tag,animSpeed = 150,loop = true,deleteFlag = true,sizeX = -1,sizeY = -1,stop = false, limitIndex = -1,skipFrame = 0){
  var spriteAnim = Sprite('ASSET_245');
  spriteAnim['frame_sprite'] = new Array();
  var sizeInit = false;
  var frameIndex = 0;
  for (var i = 0; i < LOAD_ASSET.length; i++) {
    if(LOAD_ASSET[i]['tag'] == tag){
      spriteAnim['frame_sprite'][frameIndex] = Sprite('ASSET_' + LOAD_ASSET[i]['id']);
      if(sizeInit == false){
        if(sizeX == -1) spriteAnim.width = spriteAnim['frame_sprite'][frameIndex].width;
        else{
          spriteAnim.width = sizeX;
          spriteAnim['frame_sprite'][frameIndex].width = sizeX;
        }
        if(sizeY == -1)spriteAnim.height = spriteAnim['frame_sprite'][frameIndex].height;
        else{
          spriteAnim.height = sizeY;
          spriteAnim['frame_sprite'][frameIndex].height = sizeY;
        }
      }
      spriteAnim['frame_sprite'][frameIndex].addChildTo(spriteAnim);
      if(frameIndex != 0) spriteAnim['frame_sprite'][frameIndex].visible = false;
      if(limitIndex != -1 && limitIndex <= frameIndex) break;
      frameIndex ++;
    }
  }
  spriteAnim['max_frame_index'] = spriteAnim['frame_sprite'].length;
  spriteAnim['frame_index'] = 0;
  spriteAnim['frame_delta'] = 0;
  spriteAnim['anim_comp_count'] = 0; //アニメーション再生が完了したカウント
  spriteAnim['anim_loop'] = loop;
  spriteAnim['stop_frame_index'] = stop == false ? -1 : 0;
  spriteAnim['loop_start_frame_index'] = 0;
  spriteAnim['skip_frame'] = skipFrame;
  var frameCutNum = skipFrame == 0 ? 0 : parseInt(spriteAnim['max_frame_index'] / (skipFrame + 1));
  spriteAnim['anim_time'] = frameCutNum == 0 ? (parseInt(spriteAnim['max_frame_index']) * animSpeed) : parseInt(frameCutNum * animSpeed); //アニメーションが終了する時間
  spriteAnim.update = function() {
    var stopFrameCheck = true;
    if(this['stop_frame_index'] != -1){
      //フレーム停止設定がオンで指定されたフレームindexだった場合、アニメーション処理を停止
      if(this['frame_index'] == spriteAnim['stop_frame_index']) stopFrameCheck = false;
    }
    if(stopFrameCheck == true){
      this['frame_delta'] += PHINA_APP.deltaTime;
      if(animSpeed < this['frame_delta']){
        this['frame_delta'] = 0;
        this['frame_sprite'][this['frame_index']].visible = false;
        if(this['skip_frame'] == 0) this['frame_index'] ++;
        else this['frame_index'] = this['frame_index'] + (this['skip_frame'] + 1);
        if(this['max_frame_index'] <= this['frame_index']){
          if(this['anim_loop'] == true){
            this['frame_index'] = this['loop_start_frame_index'];
            this['anim_comp_count'] ++;
          }
          else{
            this['anim_comp_count'] = 1;
            this['frame_index'] = (this['max_frame_index'] - 1);
            if(deleteFlag == true) this.remove();
          }
        }
        this['frame_sprite'][this['frame_index']].visible = true;
      }
    }
  };
  return spriteAnim;
}

function G_ASSET_GET_SPRITE_ANIM_INDEX(tag,getIndex,sizeX = 1,sizeY = 1){ //アニメーションスプライトからindexを指定して1枚の画像を取得
  var result = null;
  var index = 0;
  for (var i = 0; i < LOAD_ASSET.length; i++) {
    if(LOAD_ASSET[i]['tag'] == tag){
      if(index == getIndex){
        result = Sprite('ASSET_' + LOAD_ASSET[i]['id']);
        if(sizeX != 1) result.width = sizeX;
        if(sizeY != 1) result.height = sizeY;
        break;
      }
      index = index + 1;
    }
  }
  return result;
}

//アセットの追加読み込み(非同期)
function G_ASSET_START_ASSET_LODER(loadAssetDatas){
  var loadFlag = false;
  if(isset(loadAssetDatas['assets']) && isset(loadAssetDatas['load_asset_datas'])){
    var resultAssetDatas = loadAssetDatas['assets'];
    var resultLoadAssetDatas = loadAssetDatas['load_asset_datas'];
    for (key in resultAssetDatas) {
      var loadAssetCheck = true;
      var checkLoadAssetId = key.replace( 'ASSET_', '' );
      for(var la=0; la < LOAD_ASSET.length; la++){
        if(LOAD_ASSET[la]['id'] == checkLoadAssetId){
          loadAssetCheck = false;
          break;
        }
      }
      if(loadAssetCheck == false) continue; //既にロード済みのアセットだった。
      loadFlag = true;
      ADD_LOAD_ASSETS["image"][key] = resultAssetDatas[key];
      console.log("読み込みしたアセット:" + key);
      for (var la = 0; la < resultLoadAssetDatas.length; la++) {
        if(checkLoadAssetId == resultLoadAssetDatas[la]['id']){
          LOAD_ASSET[LOAD_ASSET.length] = resultLoadAssetDatas[la];
          break;
        }
      }
    }
    if(loadFlag == true){
      ASSET_LOADING = true;
      console.log("アセット読み込み開始:非同期");
      var loader = phina.asset.AssetLoader();
      loader.load(ADD_LOAD_ASSETS);
      loader.on('load', function() { //アセット読み込み完了時に呼ばれる関数
        ASSET_LOADING = false;
        console.log("アセット読み込み完了:非同期");
      });
    }
    else{
      console.log("読み込むものがない:非同期");
    }
  }
}

//通信結果から非同期読み込みをチェックしてあれば実行し、読み込み完了かチェック
function G_ASSET_LOADER(response){
  if(ASSET_LOADING == true) return false; //読み込み中だった
  var getJson = JSON.parse(response);//jsonをパース
  if(isset(getJson['result_add_load_asset_datas'])){
    G_ASSET_START_ASSET_LODER(getJson['result_add_load_asset_datas']); //非同期読み込みを開始
    if(ASSET_LOADING == false) return true;
    else return false;
  }
  else{
    return true;
  }
}

function G_ASSET_CREATE_GUILD_EMBLEM(emblemSpriteIds,size){ //player_guildテーブルの emblem_sprite_ids からギルドエンブレムを生成
  var sprite = Sprite('ASSET_245'); //ベースのスプライトを生成
  sprite.width = size;
  sprite.height = size;
  if(emblemSpriteIds != ""){
    var spriteIds = emblemSpriteIds.split(',');
    for (var i = 0; i < array.length; i++) {
      sprite['spr_layer' + i] = Sprite('ASSET_' + emblemSpriteIds[i]).addChildTo(sprite);
      sprite['spr_layer' + i].height = size;
      sprite['spr_layer' + i].width = size;
    }
  }
  return sprite;
}

//敵アセットデータからアセットを表示(enemy_asset_masterテーブルのデータ)
function G_ASSET_ENEMY_DISP(enemyAssetMasterData){
  var result = null;
  if(enemyAssetMasterData != null && isset(enemyAssetMasterData['enemy_asset_type'])){
    result = new Array();
    result['left'] = null;
    result['right'] = null;
    switch (parseInt(enemyAssetMasterData['enemy_asset_type'])) {
      case 0: //アセットID直接指定
      {
        var tag = "enemy_image_" + enemyAssetMasterData['param_0'];
        result['left'] = G_ASSET_GET_SPRITE(tag);
        result['left'].width = (result['left'].width * parseFloat(enemyAssetMasterData['size']));
        result['left'].height = (result['left'].height * parseFloat(enemyAssetMasterData['size']));

        result['right'] = G_ASSET_GET_SPRITE(tag);
        result['right'].scaleX *= -1
        result['right'].width = (result['right'].width * parseFloat(enemyAssetMasterData['size']));
        result['right'].height = (result['right'].height * parseFloat(enemyAssetMasterData['size']));
      }
      break;
      case 1:
      {

      }
      break;
      case 2:
      {

      }
      break;
    }
  }
  return result;
}
