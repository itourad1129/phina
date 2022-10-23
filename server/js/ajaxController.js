//$(function() {
//$('.trackimg').hide();
//updatePartyChat();
//updateSystemLog();
//check = setInterval("updatePartyChat()",10000);
//check = setInterval("updateSystemLog()",10000);
//});

function ajaxStart(optionType,optionDataType,optionUrl,optionData){
  RESULT_DATA = "";//結果を初期化
  $.ajax({
   type: optionType,
   datatype: optionDataType,
   url: optionUrl,
   data: optionData,
   success: function(response){
     //通常の通信結果より優先する通信結果があれば、それだけを返す
     if(PLAYER_PROFILE_RESULT_DATA == -1) PLAYER_PROFILE_RESULT_DATA = response;
     else if(PARTY_INFO_RESULT_DATA == -1) PARTY_INFO_RESULT_DATA = response;
     else if(CHAT_WINDOW_RESULT_DATA == -1) CHAT_WINDOW_RESULT_DATA = response;
     else if(MESSAGE_WINDOW_RESULT_DATA == -1) MESSAGE_WINDOW_RESULT_DATA = response;
     else if(KARMA_MENU_RESULT_DATA == -1) KARMA_MENU_RESULT_DATA = response;
     else if(ITEM_INFO_WINDOW_RESULT_DATA == -1) ITEM_INFO_WINDOW_RESULT_DATA = response;
     else if(GUILD_INFO_RESULT_DATA == -1) GUILD_INFO_RESULT_DATA = response;
     else if(GUILD_SETTING_RESULT_DATA == -1) GUILD_SETTING_RESULT_DATA = response;
     else RESULT_DATA = response; // レスポンスを受け取った後の処理。引数resultには受け取ったデータが入る。
   }
  });
// $.ajax( {
//     url: '../../client/login/loginTest.php',
//     dataType : 'json',
// }).done(function(data){
//         //$('#loadLoginScene').html( data );
//         result = data;
//         //console.log(data);
// }).fail(function(data){
//     $("#sample-result").html('<font color="red">読込NG(Chromeでは確認できません)</font>');
// });
}

// function updatePartyChat(){
// $.ajax( {
//     url: '../../module/chat/partyChat.php',
//     dataType : 'html',
// }).done(function(data){
//         $('#printPartyChat').html( data );
// }).fail(function(data){
//     $("#sample-result").html('<font color="red">読込NG(Chromeでは確認できません)</font>');
// });
// }
//
// function updateSystemLog(){
// $.ajax( {
//     url: '../../module/chat/systemLog.php',
//     dataType : 'html',
// }).done(function(data){
//         $('#printSystemLog').html( data );
// }).fail(function(data){
//     $("#sample-result").html('<font color="red">読込NG(Chromeでは確認できません)</font>');
// });
// }
