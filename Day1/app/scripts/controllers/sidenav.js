'use strict';

angular
	.module('day1App', ['ngMaterial'])
	.controller('AppCtrl', function($scope, $timeout, $mdSidenav, $mdUtil, $log) {
		$scope.toggleLeft = buildToggler('left');

		function buildToggler(navID) {
			var debounceFn = $mdUtil.debounce(function() {
				$mdSidenav(navID).toggle();
			}, 0);
			return debounceFn;
		}
	})
	.controller('LeftCtrl', function($scope, $timeout, $mdSidenav, $log) {
		$scope.close = function() {
			$mdSidenav('left').close();
		};
	});
