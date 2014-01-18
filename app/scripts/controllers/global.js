'use strict';

angular.module('angoApp').controller('GlobalCtrl', function($scope, $http) {


	$scope.bodyClassObj = {default:'body', context:'page_', topnav:'topnav-hidden'};



	$scope.matchM = function(){

		if($window.matchMedia("(orientation: portrait)").matches ){
			$scope.bp.port = true;
			$scope.bodyClassObj.orientation = 'portrait';
		}
		if($window.matchMedia("screen and (max-width:1200px)").matches){
			$scope.bp.lg = true;
			$scope.bodyClassObj.device = 'desktop';
		}
		if($window.matchMedia("screen and (max-width:992px)").matches){
			$scope.bp.md = true;
			$scope.bodyClassObj.device = 'laptop';
		}
		if($window.matchMedia("screen and (max-width:768px)").matches){
			$scope.bp.sm = true;
			$scope.bodyClassObj.device = 'tablet';
		}
		if($window.matchMedia("screen and (max-width:480px)").matches){
			$scope.bp.xs = true;
			$scope.bodyClassObj.device = 'mobile';
		}
		if($window.matchMedia("screen and (max-height:480px) and (max-width:768px)").matches){
			$scope.bp.xs = true;
			$scope.bodyClassObj.device = 'mobile';
		}

	}



	$scope.getBodyClass = function() {

		var c = [];
		angular.forEach($scope.bodyClassObj, function(value, key){
			c.push(value);
		});

		return c;
	}




});