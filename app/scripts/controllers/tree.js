'use strict';

angular.module('angoApp').controller('TreeCtrl', ['$scope', '$http', '$timeout', 'Tree', 'localStorageService', function($scope, $http, $timeout, Tree, localStorageService) {

	var treeData = false; //localStorageService.get('treeData');
	if (treeData) {
		$scope.allTrees = treeData || [];
	} else {
		$http.get('/api/trees').success(function(trees) {
			$scope.allTrees = trees;
		});
	}

/*
	var data = localStorageService.get('list');
	$scope.list = data || [
		{"id": 1, "title": "1. dragon-breath","items": [] }, 
		{"id": 2, "title": "2. unicorn-zapper","items": [] }, 
		{"id": 3, "title": "3. romantic-transclusion", "items": [] }
	];
*/


/*
    $scope.$watch('tree.items', function (items) {
        console.log(items);
    });

	$scope.$watch(function(){
		localStorageService.add('treeData', $scope.allTrees);
	});
*/

	$scope.selectedItem = {};


	$scope.getTree = function() {
		Tree.get({
			id: '53a5f9165f03462c1ac0d5fb'
		}, function(data) {
			console.log(data);
			$scope.openlist = data;
		});
	}

	$scope.update = function() {

		var tree = $scope.allTrees;


		if (!tree.updated) {
			tree.updated = [];
		}
		tree.$update(function() {
			$location.path('trees/' + tree._id);
		});
	};

/*
	$scope.flatten =function(){
		$scope.savelist = [];
		$scope._flatten(angular.copy($scope.list),'root');
		Tree.update($scope.savelist);
	}

	$scope._flatten = function(arr,parent){
		angular.forEach(arr, function(item,key){
			item.parent = parent;
			if(item.items.length == 0){
				delete item.items;
				$scope.savelist.push(item);
			}else{
				$scope._flatten(item.items,item.id);
				delete item.items;
				$scope.savelist.push(item);
			}
		});
	}
*/

/*
	$scope.unflatten =function(){
		$scope.openlist = Tree.get({id:'root'});
		//$scope._unflatten(angular.copy($scope.savelist));
	}
*/

/*
	$scope._unflatten = function( array, parent, tree ){
	
    	//tree = typeof tree !== 'undefined' ? tree : [];
    	//parent = typeof parent !== 'undefined' ? parent : { id: 0 };

    	var children = _.filter( array, function(child) { return child.parentid == parent.id; });
	    
	    if( !_.isEmpty( children )  ){
	        if( parent.id == 0 ){
	           tree = children;
	        }else{
	           parent['children'] = children;
	        }
	        _.each( children, function( child ){ unflatten( array, child ) } );                    
	    }
	    return tree;
		
		angular.forEach(arr, function(item,key){
			if(item.parent != 'root'){
				$scope.openlist.push(item);
			}else{
				$scope.openlist.push(item);
			}
		});
	}
*/

	$scope.options = {
		dragStart: function(event) {
			$('body').toggleClass('dragging');
			// console.log(event.elements.dragging);
		},
		dragStop: function(event) {
			$('body').removeClass('dragging');
			// console.log(event.elements.dragging);
		}
	};

	$scope.edit = function(scope) {
		var nodeData = scope.$modelValue;
		nodeData.editing = true;
		//focus();
		var el = angular.element(scope.$element);
		//el.find('input')[0].focus();
		//console.log(el.find('input'));
	};

	$scope.editdone = function(scope) {
		var nodeData = scope.$modelValue;
		delete nodeData.editing;
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