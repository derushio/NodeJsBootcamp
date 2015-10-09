var app = angular.module('HelloAngularApp', ['ngAnimate', 'ngAria', 'ngMaterial']);

app.controller('IndexController', ['$scope', '$timeout', '$location', '$anchorScroll', function($scope, $timeout, $location, $anchorScroll) {
	$scope.users = [];
	$scope.me = {
		name: "",
		message: ""
	};

	var connect = io.connect();

	// サーバから受け取るイベント
	connect.on("sendMessage", function(data) {
		// $timeout画面を更新する際はこの方法が好ましい
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

	$scope.onKeyDown = function($event) {
		if ($event.which == 13) {
			$scope.sendMessage();
		}
	}

	$scope.sendMessage = function() {
		connect.emit("sendMessage", {
			value: $scope.me
		});
		$scope.me.message = "";
	};
}]);
