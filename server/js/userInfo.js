//ユーザー情報表示クラス

//ユーザーステータスのオブジェクトを取得
function G_GET_PLAYER_STATUS_OBJ(playerStatus,playerStamina,playerVitality){
  //各ステータスの表示
  var dispPlayerStatus = new Object();//表示するテキストオブジェクトの配列
  for(var key in playerStatus){
    //console.log(PLAYER_STATUS[key]);
    var statusKey = "";
    var statusVal = "";
    for(var key2 in playerStatus[key]){
      if(key2 == "status_id"){
        switch (playerStatus[key][key2]) {
          case "1":
          statusKey = "体力";
            break;
          case "2":
          statusKey = "攻撃力";
            break;
          case "3":
          statusKey = "防御力";
            break;
          case "4":
          statusKey = "魔法攻撃力";
            break;
          case "5":
          statusKey = "魔法防御力";
            break;
          case "6":
          statusKey = "素早さ";
            break;
          case "7":
          statusKey = "精神力";
            break;
          case "8":
          statusKey = "生命力";
            break;
          case "9":
          statusKey = "スタミナ";
            break;
          case "10":
          statusKey = "運";
            break;
          default:
        }
      }
      else{
        statusVal = playerStatus[key][key2];
      }
    }
    if(statusKey != "" && statusVal != ""){
      if(statusKey == "スタミナ"){ //キーがスタミナだった場合、現在のスタミナも表示
        var playerStaminaVal = playerStamina["stamina_point"];
        statusVal = playerStaminaVal + "/" + statusVal;
      }
      if(statusKey == "生命力"){ //キーが生命力だった場合、現在の生命力も表示
        var playerVitalityVal = playerVitality["vitality_point"];
        statusVal = playerVitalityVal + "/" + statusVal;
      }
      dispPlayerStatus[statusKey] = statusVal;
    }
  }
  return dispPlayerStatus;
}
