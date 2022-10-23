<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/playerCreate/index.php';
 ?>
 <!DOCTYPE HTML>
 <html lang="ja">
 <head>
 <meta charset="UTF-8">
 <title>test</title>
 <meta name="viewport" content="width=device-width, user-scalable=no, initial-scale=1, maximum-scale=1">
 <meta name="format-detection" content="telephone=no">
 </head>
 <body>
 <h2><center>新規キャラクター登録</center></h2>
 <form method="post" action="index.php" enctype="multipart/form-data">
   <p>キャラクター名:<input type"text" id="set_new_name" name="set_new_name" value="" size="20" maxlength="100"></p>
   <p>ID:<input type"text" id="set_new_id" name="set_new_id" value="" size="20" maxlength="100"></p>
   <p>パスワード:<input type"password" id="set_new_pw" name="set_new_pw" value="" size="20" maxlength="100">
   <br>性別
   <br><input type="radio" id="set_new_sex" name="set_new_sex" value="1">男性<input type="radio" id="set_new_sex" name="set_new_sex" value="2">女性
   <br><input type="submit" name="newGame" value="新しく始める">
 </form>
 </center>
 </body>
