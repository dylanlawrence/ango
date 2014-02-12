'use strict';

angular.module('angoApp')
  .controller('DrupalCtrl', ['$scope', '$http', function ($scope, $http) {
	
	$http.get('/api/hazards').success(function(hazards) {
		$scope.hazards = hazards;
	});
	
  }]);