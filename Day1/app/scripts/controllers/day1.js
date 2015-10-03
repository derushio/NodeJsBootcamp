'use strict';

angular.module('day1App')
 .controller('day1Controller', function ($scope) {
	 $scope.users = [
		{name: "narumi", score: 234},
   		{name: "yoshika", score: 534},
   		{name: "michito", score: 546},
   		{name: "yukari", score: 432}
	 ];
});
