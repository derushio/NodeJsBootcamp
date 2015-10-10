# Socket.ioの設定
0. main.jsの変更
	``` JavaScript
	// `__dirname` を静的ディレクトリとして `/` に配置する `__dirname` はこのmain.jsのディレクトリ
	app.use('/', express.static(__dirname));
	```
	以下に
	``` JavaScript
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
	```
	を追加
0. scripts/controller/index.jsの変更
	``` JavaScript
	function createDummyData() {
		for (var i = 0; i < 10; i++) {
			$timeout(function() {
				$scope.users.push({
					name: "derushio",
					message: "おはよう"
				});
			})
		}
	}
	createDummyData();
	```
	を以下に差し替える
	``` JavaScript
	// main.jsで定義したsocket.ioのconnectionイベントを取得
	var connect = io.connect();

	// main.jsで定義したsocket.ioのsendMessageイベントを取得
	connect.on("sendMessage", function(data) {
		// $timeout 画面を更新する際はこの方法が好ましい
		$timeout(function() {
			$scope.users.push({
				name: data.value.name,
				message: data.value.message
			});
		});

		// 画面更新後でないとスクローラーの一番下のロケーションがとれない
		$timeout(function() {
			$location.hash("chatBottom");
			$anchorScroll();
		});
	});

	// $scope.変数名 = function() {};でViewに関連付ける動作を定義できる
	$scope.onKeyDown = function($event) {
		if ($event.which == 13) {
			$scope.sendMessage();
		}
	}

	$scope.sendMessage = function() {
		// connectに対して送信
		connect.emit("sendMessage", {
			// 自分の入力データを送信
			value: $scope.me
		});
		
		$timout( function() {
			// メッセージは送信されたので空白へ戻す
			$scope.me.message = "";
		});
	};
	```
0. index.htmlの設定
	``` html
	{% raw %}<!-- flex="90" layoutの中身で90%の大きさにする -->
	<md-content flex="90">
		<!-- ng-repeat="a in b" このセクションをbの要素数だけ繰り返す。その間はaに対応する要素が代入される -->
		<md-card ng-repeat="user in users">
			<md-card-content>
				<!-- angular.jsは{{}}でcontroller内の$scope要素を呼び出すことができる -->
				<!-- その要素は常にViewとModelが同期している -->
				<h2>{{user.name}}</h2>
				<p>{{user.message}}</p>
			</md-card-content>
		</md-card>
		<!-- $locationが認識するためのid用タグ -->
		<a id="chatBottom"></a>
	</md-content>
	{% endraw %}
	```
	以下に
	``` html
	{% raw %}
	<md-content flex="10" layout="row">
		<md-input-container flex="20">
			<label>Name</label>
			<!-- 入力された要素はme.nameと同期する -->
			<input ng-model="me.name">
		</md-input-container>
		<!-- flexは何も入力しないと 残りの幅で等幅になる -->
		<md-input-container flex>
			<label>Message</label>
			<!-- enterキーを押した時に送信するためにng-keydownを
			IndexController内のonKeyDown($event);で監視している -->
			<!-- 入力された要素はme.nameと同期する -->
			<input ng-keydown="onKeyDown($event);" ng-model="me.message">
		</md-input-container>
		<md-button class="md-raised" ng-click="sendMessage();">Send</md-button>
	</md-content>
	{% endraw %}
	```
	を追加
0. nodeでmain.jsを実行して[http://localhost:3000](http://localhost:3000)を確認
