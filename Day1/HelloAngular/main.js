/**
 * サーバー設定用ファイル
 *
 *
 **/

// serverに必要な機能を定義
var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server),
	favicon = require('serve-favicon');

// 3000ポートを監視
server.listen(3000);

// `/` アクセスしてきた時の処理 `index.html` を返す
app.get('/', function(req, res) {
	res.sendFile(__dirname + '/index.html');
});

// faviconを設定
app.use(favicon(__dirname + '/images/favicon.ico'));

// `__dirname` を静的ディレクトリとして `/` に配置する `__dirname` はこのmain.jsのディレクトリ
app.use('/', express.static(__dirname));

// socket.ioの `connection` イベント時にイベントを登録
io.sockets.on("connection", function(socket) {
	// `sendMessage` イベントを登録
	socket.on("sendMessage", function(data) {
		// メッセージを自分を含めた全員へ表示
		// `sockets` を `broadcast` にすれば自分以外へ送信
		io.sockets.emit("sendMessage", {
			value: data.value
		});
	});
});
