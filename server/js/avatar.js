//アバター表示用関数

//引数1:アバターの土台になるスプライト、引数2:表示タイプ 0:通常 1:通常+武器の抜刀、2:...、 引数3:アバターの大きさ  引数4:頭装備を表示するか。 引数5:spriteタイプ2
function G_AVATAR_DISP(avatarData, type, type2, avatarScaleX = 1.0, avatarScaleY = 1.0, headVisible = 0){
  var avatarSpriteArray = new Array();
  avatarSpriteArray['sprites'] = new Array();
  avatarSpriteArray['sprites'][0] = Sprite('ASSET_30'); //アバターNull画像(ベース)
  avatarSpriteArray['sprites'][0].setScale(avatarScaleX, avatarScaleY);
  if(avatarData != null){
    //非表示設定のアバターを取得
    var hideAvatars = new Array();
    for (var i = 0; i < avatarData.length; i++) {
      if(isset(avatarData[i]['visible_option']) && avatarData[i]['visible_option'] != ""){ //非表示レイヤーが存在した場合
        var hide =  avatarData[i]['visible_option'].split(',');
        for (var ha = 0; ha < hide.length; ha++) {
          //頭装備非表示設定の場合は、特定のカテゴリーを個別に設定
          if(headVisible == 1 && hide[ha] == 103){

          }
          else{
            hideAvatars[hideAvatars.length] = hide[ha];
          }
        }
      }
    }
    if(headVisible == 1){ //頭装備非表示の場合は非表示の配列に追加
      hideAvatars[hideAvatars.length] = 3;
    }

    var equipDispPriority = new Array(); //表示順番のプライオリティー key 表示順 value equipCategoryId
    if(type == "equip"){
      equipDispPriority[1] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
      equipDispPriority[2] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
      equipDispPriority[3] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
      equipDispPriority[4] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
      equipDispPriority[5] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
      equipDispPriority[6] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
      equipDispPriority[7] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
      equipDispPriority[8] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
      equipDispPriority[9] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
      equipDispPriority[10] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
      equipDispPriority[11] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
      equipDispPriority[12] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
      equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
    }
    if(type == "use"){
      if(type2 == "left"){
        equipDispPriority[1] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
        equipDispPriority[2] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
        equipDispPriority[3] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
        equipDispPriority[4] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
        equipDispPriority[5] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
        equipDispPriority[6] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
        equipDispPriority[7] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
        equipDispPriority[8] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
        equipDispPriority[9] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
        equipDispPriority[10] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
        equipDispPriority[11] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
        equipDispPriority[12] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
        equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
      }
      if(type2 == "right"){
        equipDispPriority[1] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
        equipDispPriority[2] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
        equipDispPriority[3] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
        equipDispPriority[4] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
        equipDispPriority[5] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
        equipDispPriority[6] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
        equipDispPriority[7] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
        equipDispPriority[8] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
        equipDispPriority[9] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
        equipDispPriority[10] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
        equipDispPriority[11] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
        equipDispPriority[12] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
        equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
      }
    }
    if(type == "walk"){
      if(type2 == "back"){
        equipDispPriority[1] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
        equipDispPriority[2] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
        equipDispPriority[3] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
        equipDispPriority[4] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
        equipDispPriority[5] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
        equipDispPriority[6] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
        equipDispPriority[7] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
        equipDispPriority[8] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
        equipDispPriority[9] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
        equipDispPriority[10] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
        equipDispPriority[11] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
        equipDispPriority[12] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
        equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
      }
      if(type2 == "front"){
        equipDispPriority[1] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
        equipDispPriority[2] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
        equipDispPriority[3] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
        equipDispPriority[4] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
        equipDispPriority[5] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
        equipDispPriority[6] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
        equipDispPriority[7] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
        equipDispPriority[8] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
        equipDispPriority[9] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
        equipDispPriority[10] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
        equipDispPriority[11] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
        equipDispPriority[12] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
        equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
      }
      if(type2 == "left" || type2 == "right"){
        equipDispPriority[1] = {'avatar_category_id' : '1', 'tag_name' : 'weapon_one'};//武器1
        equipDispPriority[2] = {'avatar_category_id' : '8', 'tag_name' : 'accessary_one'};//装飾品1
        equipDispPriority[3] = {'avatar_category_id' : '100', 'tag_name' : 'body_base'};//アバター:体
        equipDispPriority[4] = {'avatar_category_id' : '6', 'tag_name' : 'pants'};//腰
        equipDispPriority[5] = {'avatar_category_id' : '4', 'tag_name' : 'body'};//胸
        equipDispPriority[6] = {'avatar_category_id' : '101', 'tag_name' : 'head_base'};//アバター:頭
        equipDispPriority[7] = {'avatar_category_id' : '102', 'tag_name' : 'face'};//アバター:顔
        equipDispPriority[8] = {'avatar_category_id' : '103', 'tag_name' : 'hair'};//アバター:髪
        equipDispPriority[9] = {'avatar_category_id' : '3', 'tag_name' : 'head'};//頭
        equipDispPriority[10] = {'avatar_category_id' : '7', 'tag_name' : 'boots'};//足
        equipDispPriority[11] = {'avatar_category_id' : '5', 'tag_name' : 'hand'};//手
        equipDispPriority[12] = {'avatar_category_id' : '2', 'tag_name' : 'weapon_two'};//武器2
        equipDispPriority[13] = {'avatar_category_id' : '9', 'tag_name' : 'accessary_two'};//装飾品2
      }
    }
    for (var i = 1; i < equipDispPriority.length; i++) {
      var avatarCheck = false;
      var hideAvatarCheck = true;
      for (key in avatarData) {
        for (var ha = 0; ha < hideAvatars.length; ha++) {
          if(hideAvatars[ha] == avatarData[key]['avatar_category_id']) hideAvatarCheck = false;
        }
        if(avatarData[key]['avatar_category_id'] == equipDispPriority[i]['avatar_category_id'] && hideAvatarCheck == true){
          if(avatarData[key]['avatar_anim_flag'] == 1 || type == "walk"){ //アニメーションの場合
            var tag = "";
            //タグを生成
            tag = "aa_" + equipDispPriority[i]['tag_name'] + "_" + type + "_" + type2 + "_" + parseInt(avatarData[key]['avatar_asset_id']);
            console.log("アニメタグ:" + tag);
            avatarSpriteArray['sprites'][i] = G_ASSET_GET_SPRITE_ANIM(tag,150,true,false,-1,-1);
            avatarSpriteArray['sprites'][i].addChildTo(avatarSpriteArray['sprites'][i - 1]);
            avatarSpriteArray['sprites'][i]['visible_option'] = avatarData[key]['visible_option'];
            avatarSpriteArray['sprites'][i]['avatar_category_id'] = equipDispPriority[i]['avatar_category_id'];
            avatarSpriteArray['sprites'][i]['tag_name'] = equipDispPriority[i]['tag_name'];
            avatarCheck = true;
          }
          else {//アニメなしの場合
            var tag = "";
            //タグを生成
            tag = "aa_" + equipDispPriority[i]['tag_name'] + "_" + type + "_" + type2 + "_" + parseInt(avatarData[key]['avatar_asset_id']);
            var assetId = G_ASSET_GET_ASSET_ID(tag);
            if(assetId == -1){
              console.log("無かったアセットタグ："+tag);
            }
            var spriteName = "ASSET_" + assetId;
            avatarSpriteArray['sprites'][i] = Sprite(spriteName).addChildTo(avatarSpriteArray['sprites'][i - 1]);
            avatarSpriteArray['sprites'][i]['visible_option'] = avatarData[key]['visible_option'];
            avatarSpriteArray['sprites'][i]['avatar_category_id'] = equipDispPriority[i]['avatar_category_id'];
            avatarSpriteArray['sprites'][i]['tag_name'] = equipDispPriority[i]['tag_name'];
            avatarCheck = true;
          }
        }
      }
      if(avatarCheck == false){ //アバターが装着されていない場合はデフォルト装着のアイテムを付ける
        if(hideAvatarCheck == false){ //隠すアバターだった場合は透明画像
          avatarSpriteArray['sprites'][i] = Sprite('ASSET_30').addChildTo(avatarSpriteArray['sprites'][i - 1]);
          avatarSpriteArray['sprites'][i]['visible_option'] = "";
          avatarSpriteArray['sprites'][i]['avatar_category_id'] = equipDispPriority[i]['avatar_category_id'];
          avatarSpriteArray['sprites'][i]['tag_name'] = equipDispPriority[i]['tag_name'];
        }
        else if(type != "walk"){ //歩き以外のタイプはアニメなし
          var tag = "";
          //タグを生成
          tag = "aa_" + equipDispPriority[i]['tag_name'] + "_" + type + "_" + type2 + "_0";
          var assetId = G_ASSET_GET_ASSET_ID(tag);
          if(assetId == -1){
            console.log("無かったアセットタグ："+tag);
          }
          var spriteName = "ASSET_" + assetId;
          avatarSpriteArray['sprites'][i] = Sprite(spriteName).addChildTo(avatarSpriteArray['sprites'][i - 1]);
          avatarSpriteArray['sprites'][i]['visible_option'] = "";
          avatarSpriteArray['sprites'][i]['avatar_category_id'] = equipDispPriority[i]['avatar_category_id'];
          avatarSpriteArray['sprites'][i]['tag_name'] = equipDispPriority[i]['tag_name'];
        }
        else{ //歩きはアニメーション
          var tag = "";
          //タグを生成
          tag = "aa_" + equipDispPriority[i]['tag_name'] + "_" + type + "_" + type2 + "_0";
          avatarSpriteArray['sprites'][i] = G_ASSET_GET_SPRITE_ANIM(tag,150,true,false,-1,-1);
          avatarSpriteArray['sprites'][i].addChildTo(avatarSpriteArray['sprites'][i - 1]);
          avatarSpriteArray['sprites'][i]['visible_option'] = "";
          avatarSpriteArray['sprites'][i]['avatar_category_id'] = equipDispPriority[i]['avatar_category_id'];
          avatarSpriteArray['sprites'][i]['tag_name'] = equipDispPriority[i]['tag_name'];
        }
      }
    }
  }

  return avatarSpriteArray;
}

//アバター歩きアニメーション停止or再生用プロトタイプ関数 visible = true 再生 false 停止
Array.prototype.stopAvatarWalkAnim = function(visible){
  if(isset(this['sprites'])){
    if(visible == true){
      for (var i = 0; i < this['sprites'].length; i++) {
        if(isset(this['sprites'][i]['stop_frame_index'])) this['sprites'][i].stopFrameIndex(1);
      }
    }
    else{ //再生(オフ)
      for (var i = 0; i < this['sprites'].length; i++) {
        if(isset(this['sprites'][i]['stop_frame_index'])) this['sprites'][i].stopFrameIndex(-1);
      }
    }
  }
}


//全アニメーションを含んだアバタースプライトを表示
function G_AVATAR_SPRITE_DISP(playerAvatarData,playerEquipItemDatas,size,defaultName = ""){
  var getConvertAvatarData = G_HELPER_CONVERT_AVATART_DATA(playerAvatarData,playerEquipItemDatas);
  var avatarBack = G_AVATAR_DISP(getConvertAvatarData,"walk", "back", size + 0.01, size - 0.02, playerAvatarData['visible_head_equip_item']);
  var avatarFront = G_AVATAR_DISP(getConvertAvatarData,"walk", "front", size + 0.01, size - 0.02, playerAvatarData['visible_head_equip_item']);
  var avatarLeft = G_AVATAR_DISP(getConvertAvatarData,"walk", "left", size -0.01, size - 0.02, playerAvatarData['visible_head_equip_item']);
  var avatarRight = G_AVATAR_DISP(getConvertAvatarData,"walk", "right", size -0.01, size - 0.02, playerAvatarData['visible_head_equip_item']);
  var avatarEquipLeft = G_AVATAR_DISP(getConvertAvatarData,"equip", "left", size, size, playerAvatarData['visible_head_equip_item']);
  var avatarEquipRight = G_AVATAR_DISP(getConvertAvatarData,"equip", "right", size, size, playerAvatarData['visible_head_equip_item']);
  var avatarUseLeft = G_AVATAR_DISP(getConvertAvatarData,"use", "left", size, size, playerAvatarData['visible_head_equip_item']);
  var avatarUseRight = G_AVATAR_DISP(getConvertAvatarData,"use", "right", size, size, playerAvatarData['visible_head_equip_item']);
  var result = Sprite('ASSET_30');
  result['active_avatar_name'] = "";
  //背後
  result['walk_back'] = avatarBack;
  result['walk_back']['sprites'][0].addChildTo(result);
  result['walk_back']['sprites'][0].visible = false;
  if(defaultName == "walk_back") result['walk_back']['sprites'][0].visible = true;
  result['walk_back'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //前方
  result['walk_front'] = avatarFront;
  result['walk_front']['sprites'][0].addChildTo(result);
  result['walk_front']['sprites'][0].visible = false;
  if(defaultName == "walk_front") result['walk_front']['sprites'][0].visible = true;
  result['walk_front'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //左
  result['walk_left'] = avatarLeft;
  result['walk_left']['sprites'][0].addChildTo(result);
  result['walk_left']['sprites'][0].visible = false;
  if(defaultName == "walk_left") result['walk_left']['sprites'][0].visible = true;
  result['walk_left'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //右
  result['walk_right'] = avatarRight;
  result['walk_right']['sprites'][0].addChildTo(result);
  result['walk_right']['sprites'][0].visible = false;
  if(defaultName == "walk_right") result['walk_right']['sprites'][0].visible = true;
  result['walk_right'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //装備(左)
  result['equip_left'] = avatarEquipLeft;
  result['equip_left']['sprites'][0].addChildTo(result);
  result['equip_left']['sprites'][0].visible = false;
  if(defaultName == "equip_left") result['equip_left']['sprites'][0].visible = true;
  result['equip_left'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //装備(右)
  result['equip_right'] = avatarEquipRight;
  result['equip_right']['sprites'][0].addChildTo(result);
  result['equip_right']['sprites'][0].visible = false;
  if(defaultName == "equip_right") result['equip_right']['sprites'][0].visible = true;
  result['equip_right'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //使用(左)
  result['use_left'] = avatarUseLeft;
  result['use_left']['sprites'][0].addChildTo(result);
  result['use_left']['sprites'][0].visible = false;
  if(defaultName == "use_left") result['use_left']['sprites'][0].visible = true;
  result['use_left'].stopAvatarWalkAnim(true); //歩行アニメを停止
  //使用(右)
  result['use_right'] = avatarUseRight;
  result['use_right']['sprites'][0].addChildTo(result);
  result['use_right']['sprites'][0].visible = false;
  if(defaultName == "use_right") result['use_right']['sprites'][0].visible = true;
  result['use_right'].stopAvatarWalkAnim(true); //歩行アニメを停止

  //デフォルト表示があればそれにする
  if(!isset(result[defaultName])) result['active_avatar_name'] = defaultName;

  return result;
}

//プロトタイプ関数(アバター表示制御) anim : アニメーションを停止させるか？ 0させない 1させる
Sprite.prototype.avatarControle = function(name,anim = 0){
  if(name != "" && !isset(this[name])) return 0; //無効の場合ここで終了
  if(isset(this['walk_back']) && isset(this['walk_front']) && isset(this['walk_left'])
  && isset(this['walk_right']) && isset(this['equip_left']) && isset(this['equip_right'])
  && isset(this['use_left']) && isset(this['use_right'])){
    //最初に全てのアバターを非表示に。
    this['walk_back']['sprites'][0].visible = false;
    this['walk_front']['sprites'][0].visible = false;
    this['walk_left']['sprites'][0].visible = false;
    this['walk_right']['sprites'][0].visible = false;
    this['equip_left']['sprites'][0].visible = false;
    this['equip_right']['sprites'][0].visible = false;
    this['use_left']['sprites'][0].visible = false;
    this['use_right']['sprites'][0].visible = false;
    if(name != ""){ //※nameが空の場合は、非表示処理だけ実装
      //表示処理
      this['active_avatar_name'] = name;
      this[name]['sprites'][0].visible = true;
      if(name != "equip_left"
      && name != "equip_right"
      && name != "use_left"
      && name != "use_right"){ //アニメーション停止の場合
        if(anim == 1) this[name].stopAvatarWalkAnim(true);
        else this[name].stopAvatarWalkAnim(false);
      }
    }
  }
}


//アニメーションアバターを表示する
function G_AVATAR_ANIM_DISP(avatarMasterData,avatarAnimMasterData,scale){
  var avatarSprite = null;
  if(avatarMasterData != null && avatarAnimMasterData != null){
    if(isset(avatarMasterData['avatar_asset_id'])){
      avatarSprite = Sprite('ASSET_' + avatarMasterData['avatar_asset_id'],256,256);
      avatarSprite.setScale(scale,scale);
      avatarSprite.setFrameIndex(0);
      if(isset(avatarAnimMasterData['start_frame_index']) && isset(avatarAnimMasterData['end_frame_index'])){
        avatarSprite['avatar_anim_data'] = avatarAnimMasterData;
        avatarSprite['frame_delta'] = 0;
        avatarSprite['frame_now'] = 0;
        //アニメーション変更用プロトタイプ関数を定義
        Sprite.prototype.changeAnimData = function(animData){
          this['avatar_anim_data'] = animData;
        }
        avatarSprite.update = function() {
          avatarSprite['frame_delta'] += PHINA_APP.deltaTime;
          if(150 < avatarSprite['frame_delta']){
            avatarSprite['frame_delta'] = 0;
            var startFrame = avatarSprite['avatar_anim_data']['start_frame_index'];
            var endFrame = avatarSprite['avatar_anim_data']['end_frame_index'];
            var playFrameNow = avatarSprite['frame_now'];
            if(startFrame <= playFrameNow && playFrameNow < endFrame){
              avatarSprite['frame_now'] = parseInt(playFrameNow) + 1;
              avatarSprite.setFrameIndex(avatarSprite['frame_now']);
            }
            else{ //最大フレームを過ぎて居た場合
              avatarSprite['frame_now'] = startFrame;
              avatarSprite.setFrameIndex(startFrame);
            }
          }
        };
      }
    }
  }
  return avatarSprite;
}
