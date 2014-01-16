'use strict';

angular.module('angoApp').controller('ContactCtrl', function($scope, $http) {


	$scope.message = '';
	$scope.status = '';
	$scope.data = '';

	$scope.send = function() {

		$http({
			method: "POST",
			url: "/contact/send",
			data: $scope.message
		}).
		success(function(data, status) {
			$scope.status = status;
			$scope.data = data;
		}).
		error(function(data, status) {
			$scope.data = data || "Request failed";
			$scope.status = status;
		});

	}
});