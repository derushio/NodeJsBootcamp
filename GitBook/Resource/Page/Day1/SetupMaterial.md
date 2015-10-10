# マテリアルデザインの設定
0. scripts/controllers/index.jsを作成
0. index.jsに以下を記述
	``` JavaScript
	// AppModuleを定義
	var app = angular.module('AngularChatApp', ['ngAnimate', 'ngAria', 'ngMaterial']);

	// AppModuleにControllerを定義
	// $scopeはViewと同期する要素、$timeoutはViewを更新するタイミング
	// $locationはViewの位置、 $anchorScrollは$locationで指定した位置へスクロールする機能を持つ
	app.controller('IndexController', ['$scope', '$timeout', '$location', '$anchorScroll',
		function($scope, $timeout, $location, $anchorScroll) {
			// $scope.変数名とすることでViewと関連づける変数を定義できる
			$scope.users = [];
			$scope.me = {
				name: "",
				message: ""
			};
		}
	]);
	```
0. index.htmlの編集
	* `<p>HelloAngular</p>` を削除
0. index.htmlの編集
	``` html
	<!-- user js -->
	<!-- user js -->
	```
	の位置を
	``` html
	<!-- user js -->
	<script src="./scripts/controllers/index.js"></script>
	<!-- user js -->
	```
	に変更
0. index.htmlの編集
	``` html
	<body>
	```
	を
	``` html
	<!-- layout="column"は縦並び layout="row"は横並びを表す -->
	<!-- ng-app このセクションで用いるAppModuleを指定する -->
	<!-- ng-controller このセクションで用いるControllerを指定する -->
	<body layout="column" ng-app="AngularChatApp" ng-controller="IndexController">
	```
	に変更
0. index.htmlの編集
	``` html
	<!-- layout="column"は縦並び layout="row"は横並びを表す -->
	<!-- ng-app このセクションで用いるAppModuleを指定する -->
	<!-- ng-controller このセクションで用いるControllerを指定する -->
	<body layout="column" ng-app="AngularChatApp" ng-controller="IndexController">
	```
	の下に
	``` html
	{% raw %}
		<!-- flex="90" layoutの中身で90%の大きさにする -->
		<md-content flex="90">
			<!-- ng-repeat="a in b" このセクションをbの要素数だけ繰り返す。その間はaに対応する要素が代入される -->
			<md-card ng-repeat="user in users">
				<md-card-content>
					<!-- angular.jsは {{}} でcontroller内の$scope要素を呼び出すことができる -->
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
	を追加
0. index.jsの変更
	``` JavaScript
	$scope.users = [];
	$scope.me = {
		name: "",
		message: ""
	};
	```
	の下に
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
	を追加
0. nodeでmain.jsを実行して[http://localhost:3000](http://localhost:3000)を確認
