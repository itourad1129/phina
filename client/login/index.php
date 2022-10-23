<?php
include '../../module/dbConnect/index.php';
include '../../module/login/index.php';
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
 <h2><center>ログイン</center></h2>
 <center>
 <form method="post" action="index.php" enctype="multipart/form-data">
   <p><font color="#ffffff">ID:</font><input type"text" id="set_id" name="set_id" value="" size="20" maxlength="100"></p>
   <font color="#ffffff">パスワード:</font><input type"password" id="set_pw" name="set_pw" value="" size="20" maxlength="100">
   <br><input type="submit" name="login" value="ログイン">
 </form>
 <br>
 <br>
 <a href="../newGame/">新規キャラクター登録</a>
 </center>
 </body>
