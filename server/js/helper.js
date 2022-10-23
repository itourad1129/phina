//ヘルパー関数

//カードアイコンのアセットIDを取得
function G_HELPER_GET_ICON_ASSET_ID(cardRank){
  var result = -1;
  var getRank = parseInt(cardRank);
  switch (getRank) {
    case 1:
    result = 125;
    break;
    case 2:
    result = 125;
    break;
    case 3:
    result = 125;
    break;
    case 4:
    result = 125;
    break;
    case 5:
    result = 125;
    break;
    case 6:
    result = 125;
    break;
    case 7:
    result = 125;
    break;
    case 8:
    result = 125;
    break
    default:
    result = 125;
    break;

  }
  return result;
}

//通貨IDから単位のテキストを入手する。
function G_HELPER_GET_ITEM_UNIT_TEXT(itemId){
  var result = "個";
  var getItemId = parseInt(itemId);
  switch (getItemId) {
    case 1:
    result = "ゴールド";
    break;
    case 2:
    result = "クリスタル";
    break;
    case 3:
    result = "";
    break;
    case 4:
    result = "";
    break;
    case 5:
    result = "";
    break;
    case 6:
    result = "";
    break;
    case 7:
    result = "";
    break;
    case 8:
    result = "";
    break;
    case 9:
    result = "";
    break;
    case 10:
    result = "";
    break;
    case 11:
    result = "";
    break;
    default:
    break;
  }
  return result;
}

function G_HELPER_GET_WEAPON_CATEGORY_NAME(weaponCategoryId){ //武器カテゴリーIDから武器カテゴリーネームを取得する。
  var result = "武器種類不明";
  var getWeaponCategoryId = parseInt(weaponCategoryId);
  switch (getWeaponCategoryId) {
    case 0:
    result = "指定無し";
    break;
    case 1:
    result = "無属性";
    break;
    case 2:
    result = "剣";
    break;
    case 3:
    result = "盾";
    break;
    case 4:
    result = "杖";
    break;
    case 5:
    result = "ダガー";
    break;
    case 6:
    result = "槍";
    break;
    case 7:
    result = "大剣";
    break;
    case 8:
    result = "レイピア";
    break;
    case 9:
    result = "弓";
    break;
    default:
    break;
  }
  return result;
}

function G_HELPER_GET_EQUIP_CATEGORY_NAME(equipCategoryId){ //装備カテゴリーIDからカテゴリー名を取得する。
  var result = "装備種類不明";
  var getEquipCategoryId = parseInt(equipCategoryId);
  switch (getEquipCategoryId) {
    case 0:
    result = "指定無し";
    break;
    case 1:
    result = "武器1";
    break;
    case 2:
    result = "武器2";
    break;
    case 3:
    result = "頭";
    break;
    case 4:
    result = "胸";
    break;
    case 5:
    result = "手";
    break;
    case 6:
    result = "腰";
    break;
    case 7:
    result = "足";
    break;
    case 8:
    result = "装飾品1";
    break;
    case 9:
    result = "装飾品2";
    break;
    case 10:
    result = "アバター";
    default:
    break;
  }
  return result;
}

function G_HELPER_GET_STATUS_NAME(statusId,type = 0){ //ステータスIDからステータス名を取得 引数[type]0:英語表記 引数2:日本語表記
  var result = "";
  var getStatusId = parseInt(statusId);
  switch (getStatusId) {
    case 1:
    {
      if(type == 0) result = "HP";
      else result = "体力";
    }
    break;
    case 2:
    {
      if(type == 0) result = "ATK";
      else result = "攻撃力";
    }
    break;
    case 3:
    {
      if(type == 0) result = "DEF";
      else result = "防御力";
    }
    break;
    case 4:
    {
      if(type == 0) result = "M_ATK";
      else result = "魔法攻撃力";
    }
    break;
    case 5:
    {
      if(type == 0) result = "M_DEF";
      else result = "魔法防御力";
    }
    break;
    case 6:
    {
      if(type == 0) result = "AGI";
      else result = "素早さ";
    }
    break;
    case 7:
    {
      if(type == 0) result = "MND";
      else result = "精神力";
    }
    break;
    case 8:
    {
      if(type == 0) result = "VIT";
      else result = "生命力";
    }
    break;
    case 9:
    {
      if(type == 0) result = "STM";
      else result = "スタミナ";
    }
    break;
    case 10:
    {
      if(type == 0) result = "LUCK";
      else result = "運";
    }
    break;
    default:
    {
      result = "???";
    }
    break;
  }
  return result;
}

// MySQL から返ってくる日付の値を ISO 8601 に変換
function G_HELPER_REPLACE_DATE(dateStr) {
  const regexp = /^([0-9]{2,4})-([0-1][0-9])-([0-3][0-9])(?:( [0-2][0-9]):([0-5][0-9]):([0-5][0-9]))?$/;
  return dateStr.replace(regexp, (match, year, month, day, hour, minutes, seconds) => {
    return `${year}/${month}/${ day}${hour}:${minutes}:${seconds}`;
  });
  return dateStr
}

//プレイヤーのカルマ値からカルマ名に変換する
function G_HELPER_GET_PLAYER_KARMA_NAME(karma){
  var karmaName = "";
  if(0 <= karma && karma <= 2500) karmaName = "悪党";
  else if(2501 <= karma && karma <= 5000) karmaName = "賞金首";
  else if(5001 <= karma && karma <= 7500) karmaName = "犯罪者";
  else if(7501 <= karma && karma <= 10000) karmaName = "一般人";
  else if(10001 <= karma && karma <= 12500) karmaName = "一般人";
  else if(12501 <= karma && karma <= 15000) karmaName = "善人";
  else if(15001 <= karma && karma <= 17500) karmaName = "救世主";
  else if(17501 <= karma && karma <= 20000) karmaName = "英雄";

  return karmaName;
}

//プレイヤーのカルマ値からカルマランクを取得
function G_HELPER_GET_PLAYER_KARMA_RANK(karma){
  var karmaRank = 0;
  if(0 <= karma && karma <= 2500) karmaRank = -3;
  else if(2501 <= karma && karma <= 5000) karmaRank = -2;
  else if(5001 <= karma && karma <= 7500) karmaRank = -1;
  else if(7501 <= karma && karma <= 10000) karmaRank = 0;
  else if(10001 <= karma && karma <= 12500) karmaRank = 0;
  else if(12501 <= karma && karma <= 15000) karmaRank = 1;
  else if(15001 <= karma && karma <= 17500) karmaRank = 2;
  else if(17501 <= karma && karma <= 20000) karmaRank = 3;
  return karmaRank;
}

//0埋めする。
function G_HELPER_ZERO_PADDING(num,length){
    return ('0000000000' + num).slice(-length);
}

//2点の位置から角度を求める
function G_HELPER_GET_DEGREE(from, to){
  return Math.radToDeg(Math.atan2(from.y - to.y, from.x - to.x)) - 90;
}

//プレイヤー装備データとプレイヤーアバターデータから整形したデータを取得
function G_HELPER_CONVERT_AVATART_DATA(playerAvatarData,playerEquipData){
  var resultConvertData = new Array();
  //装備データ整形
  if(playerEquipData != null){
    for (var i = 0; i < playerEquipData.length; i++) {
      var addData = new Array();
      addData['avatar_category_id'] = -1;
      addData['avatar_asset_id'] = -1;
      addData['avatar_anim_flag'] = -1;
      addData['visible_option'] = "";
      if(isset(playerEquipData[i]['avatar_category_id'])) addData['avatar_category_id'] = playerEquipData[i]['avatar_category_id'];
      if(isset(playerEquipData[i]['avatar_asset_id'])) addData['avatar_asset_id'] = playerEquipData[i]['avatar_asset_id'];
      if(isset(playerEquipData[i]['avatar_anim_flag'])) addData['avatar_anim_flag'] = playerEquipData[i]['avatar_anim_flag'];
      if(isset(playerEquipData[i]['visible_option'])) addData['visible_option'] = playerEquipData[i]['visible_option'];
      if(addData['avatar_category_id'] != -1 && addData['avatar_asset_id'] != -1 && addData['avatar_anim_flag'] != -1){
        resultConvertData[resultConvertData.length] = addData;
      }
    }
  }
  //アバターデータ整形
  if(playerAvatarData != null){
    var addData = new Array();
    addData['avatar_category_id'] = 102; //顔カテゴリーID
    if(isset(playerAvatarData['face_avatar_id'])){addData['avatar_asset_id'] = playerAvatarData['face_avatar_id'];}
    else {addData['avatar_asset_id'] = 0;}
    addData['avatar_anim_flag'] = 0;
    addData['visible_option'] = "";
    resultConvertData[resultConvertData.length] = addData;


    addData = new Array();
    addData['avatar_category_id'] = 100; //体カテゴリーID
    if(isset(playerAvatarData['body_base_avatar_id'])){addData['avatar_asset_id'] = playerAvatarData['body_base_avatar_id'];}
    else {addData['avatar_asset_id'] = 0;}
    addData['avatar_anim_flag'] = 0;
    addData['visible_option'] = "";
    resultConvertData[resultConvertData.length] = addData;

    addData = new Array();
    addData['avatar_category_id'] = 101; //頭カテゴリーID
    if(isset(playerAvatarData['head_base_avatar_id'])){addData['avatar_asset_id'] = playerAvatarData['head_base_avatar_id'];}
    else {addData['avatar_asset_id'] = 0;}
    addData['avatar_anim_flag'] = 0;
    addData['visible_option'] = "";
    resultConvertData[resultConvertData.length] = addData;


    addData = new Array();
    addData['avatar_category_id'] = 103; //髪カテゴリーID
    if(isset(playerAvatarData['hair_avatar_id'])){addData['avatar_asset_id'] = playerAvatarData['hair_avatar_id'];}
    else {addData['avatar_asset_id'] = 0;}
    addData['avatar_anim_flag'] = 0;
    addData['visible_option'] = "";
    resultConvertData[resultConvertData.length] = addData;
  }
  return resultConvertData;
}

/**
 * 2点の線分（座標）から交点を求める
 * @param {{start:{x:number,y:number},end:{x:number,y:number}}} point1 1つ目の直線
 * @param {{start:{x:number,y:number},end:{x:number,y:number}}} point2 2つ目の直線
 * @return {{x:number,y:number}|false} 交点する座標を返し、平行の場合はfalseを返す
 // ポイント1
 var point1 = {
     start : { x : 165, y : 86 }, // 始点
     end   : { x : 65, y : 1 }    // 終点
 };

 // ポイント2
 var point2 = {
     start : { x : 180, y : 15 }, // 始点
     end   : { x : 85, y : 78 }   // 終点
 };
 */
function G_HELPER_GET_INTERSECTION(point1, point2) {
    var x0 = point1.start.x,
        y0 = point1.start.y,
        x1 = point1.end.x,
        y1 = point1.end.y,
        x2 = point2.start.x,
        y2 = point2.start.y,
        x3 = point2.end.x,
        y3 = point2.end.y;

    var a0 = (y1 - y0) / (x1 - x0),
        a1 = (y3 - y2) / (x3 - x2);

    var x = (a0 * x0 - y0 - a1 * x2 + y2) / (a0 - a1),
        y = (y1 - y0) / (x1 - x0) * (x - x0) + y0;

    if (Math.abs(a0) === Math.abs(a1)) return false;

    if (x > Math.max(x0, x1) || x > Math.max(x2, x3) ||
        y > Math.max(y0, y1) || y > Math.max(y2, y3) ||
        x < Math.min(x0, x1) || x < Math.min(x2, x3) ||
        x < Math.min(x0, x1) || y < Math.min(y2, y3) ) return false;

    return { x : x, y : y };
};

//2点から距離を求める
function G_HELPER_GET_DISTANCE(x,y,x2,y2){
  var distance = Math.sqrt((x2 - x) * (x2 - x) + (y2 - y) * (y2 - y));
  return parseInt(distance);
}

//対象のphinaオブジェクトを明滅点滅させる
function G_HELPER_ADD_FLICKER_ANIM(obj,speed = 0.05){
  if(obj != null && obj.alpha != undefined){
    obj.alpha = 1;
    obj['flicker_step'] = 0; //0:減算 1:加算
    obj['flicker_stop'] = -1; //-1:稼働 0:停止した 1:停止中
    obj.update = function() {
      if(this['flicker_stop'] == -1){
        if(this['flicker_step'] == 0){ this.alpha = this.alpha + speed; if(1 <= this.alpha){ this.alpha = 1; this['flicker_step'] = 1; } }
        else if(this['flicker_step'] == 1){ this.alpha = this.alpha - speed; if(this.alpha <= 0){ this.alpha = 0; this['flicker_step'] = 0; } }
      }
      else if(this['flicker_stop'] == 0){
        this['flicker_stop'] = 1;
        this.alpha = 1;
      }
    };
  }
}
