//============================================
// ログインシーン
//============================================
var INPUT_USER_ID = ""; //ユーザーID初期化
var SUBMIT_USER_ID = "";//送信するユーザーID
var USER_ID_DISP = null; //ID表示用
var INPUT_USER_PASSWORD = ""; //ユーザーパスワード初期化
var SUBMIT_USER_PASSWORD = ""; //送信するパスワード
var USER_PASSWORD_DISP = null; //パスワード表示用
var LOGIN_SCENE_INSTANCE = null; //ログインシーンのインスタンス
phina.define("Login", {
  // 継承
  superClass: 'DisplayScene',

  // 初期化
  init: function() {
    G_SCENE_INIT();
    SCENE_MANAGER['now_scene'] = "login";

    INPUT_USER_ID = ""; //ユーザーID初期化
    SUBMIT_USER_ID = "";//送信するユーザーID
    USER_ID_DISP = null; //ID表示用
    INPUT_USER_PASSWORD = ""; //ユーザーパスワード初期化
    SUBMIT_USER_PASSWORD = ""; //送信するパスワード
    USER_PASSWORD_DISP = null; //パスワード表示用
    LOGIN_SCENE_INSTANCE = null; //ログインシーンのインスタンス

    //console.log(RESULT_DATA);
    // 親クラス初期化
    this.superInit();
    //ASSETS["image"]["fp2"] = '../assets/character/2/fp/fp_2.png'; //アセット追加テスト
    // 背景色
    LOGIN_SCENE_INSTANCE = this;
    this.backgroundColor = 'blue';
//------- ID入力ボタン -------------------------------------------------------------------------
    var userIdInputFormButton = Button({
      x: this.gridX.center() * 1.25,             // x座標
      y: this.gridY.center() * 0.60,             // y座標
      width: 300,         // 横サイズ
      height: 50,        // 縦サイズ
    }).addChildTo(this);
    var userIdInputFormImage = Sprite('ASSET_32').addChildTo(userIdInputFormButton);

    userIdInputFormButton.onpointend = function(e){// ID入力ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        //this.userIdInput();
        INPUT_USER_ID = window.prompt("ユーザーIDを入力", "");
    };
    Label({
      text: 'ユーザーID',
      fontSize: 36,
      fill: 'white',
    }).addChildTo(this).setPosition(userIdInputFormButton.x * 0.4, userIdInputFormButton.y);
    USER_ID_DISP = Label({
      text: '',
      fontSize: 36,
      fill: 'black',
      //align: 'right',
    }).addChildTo(this).setPosition(userIdInputFormButton.x, userIdInputFormButton.y);
//--------------------------------------------------------------------------------------------

//------- パスワード入力ボタン -------------------------------------------------------------------------
    var userPasswordInputFormButton = Button({
      x: this.gridX.center() * 1.25,             // x座標
      y: this.gridY.center() * 0.85,             // y座標
      width: 300,         // 横サイズ
      height: 50,        // 縦サイズ
    }).addChildTo(this);
    var userPasswordInputFormImage = Sprite('ASSET_32').addChildTo(userPasswordInputFormButton);

    userPasswordInputFormButton.onpointend = function(e){// ID入力ボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
        //this.userPasswordInput();
        INPUT_USER_PASSWORD = window.prompt("パスワードを入力", "");
    };
    Label({
      text: 'パスワード',
      fontSize: 36,
      fill: 'white',
    }).addChildTo(this).setPosition(userPasswordInputFormButton.x * 0.4, userPasswordInputFormButton.y);
    USER_PASSWORD_DISP = Label({
      text: '',
      fontSize: 36,
      fill: 'black',
      //align: 'left',
    }).addChildTo(this).setPosition(userPasswordInputFormButton.x, userPasswordInputFormButton.y);
//--------------------------------------------------------------------------------------------

    var loginButton = Button({
      x: this.gridX.center(),             // x座標
      y: this.gridY.center() * 1.05,     　// y座標
      width: 150,         // 横サイズ
      height: 50,        // 縦サイズ
      text: "ログイン",     // 表示文字
      fontSize: 32,       // 文字サイズ
      fontColor: 'white', // 文字色
      cornerRadius: 10,   // 角丸み
      fill: 'black',    // ボタン色
      stroke: 'white',     // 枠色
      strokeWidth: 5,     // 枠太さ
    }).addChildTo(this);
    loginButton.onpointend = function(e){// ログインボタンが押されたときの処理
      if(!this.hitTest(e.pointer.x,e.pointer.y)) return;
      //this.userPasswordInput();
      if(SUBMIT_USER_PASSWORD != "" && SUBMIT_USER_ID != ""){
        var loginData = { user_id: SUBMIT_USER_ID, user_password: SUBMIT_USER_PASSWORD };
        ajaxStart("post","json","../../client/login/login.php",loginData); //非同期通信開始
      }
      else{
        alert('IDとパスワードを入力して下さい');
      }
    };
  },
  // タッチで次のシーンへ
  onpointstart: function() {
    //this.exit();
    //ajaxStart("get","json","../../client/login/loginTest.php"); //非同期通信開始
  },

  update: function() {
    if(RESULT_DATA != ""){
      console.log(RESULT_DATA);
      var json = JSON.parse(RESULT_DATA);//jsonをパース
      if(isset(json["login_result"])){
        if(json["login_result"] != ""){ //ログインエラーがある場合
          alert(json["login_result"]);
          console.log("ログイン失敗");
        }
        else{   //ログイン成功
          console.log("ログイン成功");
          //SCENE_MANAGER['prev_scene'] = "login";
          //this.exit("myPage");
          if(isset(json["result_asset_datas"])){ //追加読み込みアセットが存在した
            G_ASSET_ADD_LOAD_ASSET_DATA(LOGIN_SCENE_INSTANCE,"login","myPage",json["result_asset_datas"]); //アセットを追加読み込みする
          }
          // LOAD_NEXT_SCENE = "myPage";
          // this.exit("loadAssets"); //追加読み込みシーンのテスト中
        }
      }
      RESULT_DATA = "";//通信結果を初期化
    }

    if(INPUT_USER_ID != ""){//入力されたユーザーIDの表示更新
      SUBMIT_USER_ID = INPUT_USER_ID;
      INPUT_USER_ID = "";
      if(USER_ID_DISP != null){
        USER_ID_DISP.text = SUBMIT_USER_ID;
      }
    }

    if(INPUT_USER_PASSWORD != ""){//入力されたユーザーIDの表示更新
      SUBMIT_USER_PASSWORD = INPUT_USER_PASSWORD;
      INPUT_USER_PASSWORD = "";
      if(USER_PASSWORD_DISP != null){
        USER_PASSWORD_DISP.text = SUBMIT_USER_PASSWORD;
      }
    }
  },

  // phina.define("Scene03", {
  //   // 継承
  //   superClass: 'DisplayScene',
  //   // 初期化
  //   init: function() {
  //     // 親クラス初期化
  //     this.superInit();
  //     // 背景色
  //     this.backgroundColor = 'green';
  //     // ラベル
  //     Label({
  //       text: 'Scene03',
  //       fontSize: 48,
  //     }).addChildTo(this).setPosition(this.gridX.center(), this.gridY.center());
  //   },
  //   // タッチで次のシーンへ
  //   onpointstart: function() {
  //     this.exit();
  //   },
  // });



});
