# プロジェクト作成

## プロジェクトに必要なライブラリを読み込む
### npmとbowerの設定
0. 適当な場所にフォルダを作成
0. Terminal.appを開く
0. `cd` で先ほど作成したフォルダへ移動
0. `npm init` を実行
	* 指示に従う
	* 名前を登録の場所から進まない時は、小文字にしたプロジェクト名を打つと良い
0. `npm install --save socket.io` を実行
0. `npm install --save express` を実行
0. `npm install --save serve-favicon` を実行
0. `bower init` を実行
	* 指示に従う
0. `bower install --save angular` を実行
0. `bower install --save angular-material` を実行

### main.jsの作成
0. プロジェクト直下にmain.jsを作成する
0. 以下の内容を入力する
	``` JavaScript
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

	// `__dirname` を静的ディレクトリとして `/` に配置する `__dirname` はこのmain.jsのディレクトリ
	app.use('/', express.static(__dirname));
	```
	それぞれの機能を説明すると  
	* express
		* server内のリクエストに対するレスポンスの内容や、serverにおいておくファイルの内容などを設定できる便利機能
	* http
		* http通信を使用
	* app
		* このサーバーの設定
	* server
		* ポートやリクエストを待ち構える機能
	* io
		* socket.io ここではまだ使わないが、端末同士の通信ができる
	* favicon
		* ページのアイコンを設定する機能

### index.htmlの作成
0. プロジェクト直下にindex.htmlを作成
	``` html
	<!DOCTYPE html>
	<html>
		<head>
			<meta charset="UTF-8">
			<title>AngularChat</title>

			<!-- css -->
			<link href="./bower_components/angular-material/angular-material.min.css" rel="stylesheet">
			<!-- css -->

			<!-- server js -->
			<script src="/socket.io/socket.io.js"></script>
			<!-- server js -->
		</head>
		<body>

			<p>HelloAngular</p>

			<!-- component js -->
			<script src="./bower_components/angular/angular.js"></script>
			<script src="./bower_components/angular-animate/angular-animate.js"></script>
			<script src="./bower_components/angular-aria/angular-aria.js"></script>
			<script src="./bower_components/angular-material/angular-material.js"></script>
			<!-- component js -->

			<!-- user js -->
			<script src="./scripts/controllers/index.js"></script>
			<!-- user js -->

		</body>
	</html>
	```

### サーバーを起動してみる
0. Terminal.appで `node main.js` を実行
	* HelloAngularが表示されれば成功
