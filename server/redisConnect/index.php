<?php

// 接続
$redis = new Redis();
$redis->connect('redis', 6379);
$redis->select(1);
