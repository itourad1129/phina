//エラー表示
var ERROR_DISP_ERROR_DATAS = null; //サーバーから返された通信エラーデータ

function G_ERROR_DISP_GET_ERROR_TEXT(errorCode){
  var result = "エラーが発生しました。";
  switch (parseInt(errorCode)) {
    case 1:
    {
      result = "戦闘結果の取得に失敗しました。";
    }
    break;
    case 2:
    break;
    case 3:
    break;
    default:
    break;
  }
  result = result + "\nエラーコード:" + errorCode;
  return result;
}
