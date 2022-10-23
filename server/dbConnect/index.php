<?php
try {
  $appDefine = new AppDefine($ENV);
    /* リクエストから得たスーパーグローバル変数をチェックするなどの処理 */

    // データベースに接続
    $pdo = new PDO(
        $appDefine->DB_HOST,
        $appDefine->DB_ID,
        $appDefine->DB_PW,
        [
            PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        ]
    );

    /* データベースから値を取ってきたり， データを挿入したりする処理 */

} catch (PDOException $e) {

    // エラーが発生した場合は「500 Internal Server Error」でテキストとして表示して終了する
    // - もし手抜きしたくない場合は普通にHTMLの表示を継続する
    // - ここではエラー内容を表示しているが， 実際の商用環境ではログファイルに記録して， Webブラウザには出さないほうが望ましい
    header('Content-Type: text/plain; charset=UTF-8', true, 500);
    exit($e->getMessage());

}

// Webブラウザにこれから表示するものがUTF-8で書かれたHTMLであることを伝える
// (これか <meta charset="utf-8"> の最低限どちらか1つがあればいい． 両方あっても良い．)
// 以下、テーブルセレクトの接続テスト
// header('Content-Type: text/html; charset=utf-8');
// function getTest($conn) {
//     $sql = 'SELECT a, b, c, d FROM test_table';
//     foreach ($conn->query($sql) as $row) {
//         print $row['a'] . "\t";
//         print $row['b'] . "\t";
//         print $row['c'] . "\t";
//         print $row['d'] . "\n";
//     }
// }
// getTest($pdo);
?>
