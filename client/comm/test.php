<?php
//. XML ファイルを文字列変数へ読み込む
$txt = file_get_contents( "atom.xml" );
//. <***:****> -> <***_****>
$txt  = preg_replace( "/<([^>]+?):(.+?)>/", "<$1_$2>", $txt );
//. プロトコルは元に戻す
$txt  = preg_replace( "/_\/\//", "://", $txt );

$feed = simplexml_load_string( $txt );
echo "id: " . ( $feed->id ) . "\n";
echo "title: " . ( $feed->title ) . "\n";
foreach( $feed->entry as $entry ){
  echo "<br>";
  echo "entry_title: " . ( $entry->title ) . "\n";
  echo "<br>";
  echo "link_url: " . ( $entry->link->attributes()->href ) . "\n";
  echo "<br>";
  echo "dc:updated: " . ( $entry->dc_updated ) . "\n";
  echo "<br>";
}
?>
