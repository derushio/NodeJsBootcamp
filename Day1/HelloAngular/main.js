/**
 * サーバー設定用ファイル
 *
 *
 **/

var express = require('express'),
	http = require('http'),
	app = express(),
	server = http.createServer(app),
	io = require('socket.io').listen(server);

// 3000ポートを監視
server.listen(3000);

// `/` アクセスしてきた時の処理 `index.html` を返す
app.get('/', function(req, res) {
	res.sendfile(__dirname + '/index.html');
});

// `__dirname` を静的ディレクトリとして `/` に配置する `__dirname` はこのmain.jsのディレクトリ
app.use('/', express.static(__dirname));

io.sockets.on("connection", function(socket) {
	socket.on("sendMessage", function(data) {
		io.sockets.emit("sendMessage", {
			value: data.value
		});
	});
});
