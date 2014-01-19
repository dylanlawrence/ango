'use strict';

angular.module('angoApp').controller('ChatCtrl', ['$scope', '$http', 'Global', 'Socket', 'Users', function($scope, $http, Global, Socket, Users) {

	$scope.global = Global;

	$scope.messages = [];

	socket.on('user:connected', function() {
		//alert('user:connected');
		$scope.getUsers();
	})

	socket.on('user:disconnected', function() {
		//alert('user:disconnected');;
		$scope.getUsers();
	});

	$scope.send = function() {
		socket.emit('send:message', {
			user: $scope.global.user._id,
			text: $scope.message
		});
		// add the message to our model locally
		$scope.messages.push({
			user: $scope.global.user._id,
			text: $scope.message
		});
		// clear 
		$scope.message = '';
	};


	$scope.getUsers = function() {
		Users.query({
			userId: 'all'
		}, function(users) {
			$scope.users = users;
		});
	};


}]);