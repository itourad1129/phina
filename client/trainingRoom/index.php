<?php
include_once '../../module/dbConnect/index.php';
include_once '../../module/sessionCheck/index.php';
include_once '../../module/playerData/index.php';
include_once '../../module/equipItem/index.php';
include_once '../../module/card/index.php';
 ?>
 <!DOCTYPE html>
 <html>
   <head>
     <meta charset="UTF-8">
     <meta name="viewport" content="width=device-width, initial-scale=1">
     <title>訓練所</title>
   </head>
     <body>
       <center>
         <h1>訓練所</h1>
       <?php

       $checkPlayerTrainingPoint = playerTrainingPointCheck($pdo,$PLAYER_INFO);
       if($checkPlayerTrainingPoint == true){
         print("<a href=index.php?training=1>訓練を実行する。</a><br>");
       }
       else{
         $waitTime = getPlayerTrainingPointLimitTime($pdo,$PLAYER_INFO);
         if($waitTime != -1){
           print("訓練可能になるまで残り[".changeLimitTime($waitTime)."]<br>");
         }
       }
       print("<br><a href=../myPage/index.php>戻る</a><br>");











































       ?>
     </center>
   </body>
</html>
