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
	}
]);
