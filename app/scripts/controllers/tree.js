'use strict';

angular.module('angoApp')
  .controller('TreeCtrl', ['$scope', '$http','$timeout','localStorageService', function($scope, $http, $timeout, localStorageService) {
	
	var data = localStorageService.get('list');
	
	$scope.list = data || [
		{"id": 1, "title": "1. dragon-breath","items": [] }, 
		{"id": 2, "title": "2. unicorn-zapper","items": [] }, 
		{"id": 3, "title": "3. romantic-transclusion", "items": [] }
	];

	$scope.$watch(function(){
		localStorageService.add('list', $scope.list);
	});

	$scope.selectedItem = {};

	$scope.options = {
		dropped : function(event){
			console.log(event);
		}
	};

	$scope.remove = function(scope) {
		scope.remove();
	};

	$scope.toggle = function(scope) {
		scope.toggle();
	};

	$scope.newSubItem = function(scope) {
		var nodeData = scope.$modelValue;
		nodeData.items.push({
			id: nodeData.id * 10 + nodeData.items.length,
			title: nodeData.title + '.' + (nodeData.items.length + 1),
			items: []
		});
	};

 }]);