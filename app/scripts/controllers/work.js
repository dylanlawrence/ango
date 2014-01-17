'use strict';

angular.module('angoApp').controller('WorkCtrl', ['$scope', '$http', function($scope, $http) {
	
	$http.get('/api/work').success(function(work) {
		$scope.work = work;
	});

}]);