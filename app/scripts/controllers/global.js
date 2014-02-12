'use strict';

angular.module('angoApp').controller('GlobalCtrl', ['$scope', '$rootScope', '$http', function($scope, $rootScope, $http) {

	$scope.scroll = 0;

	$scope.bodyClassObj = {default:'body', context:'page_', topnav:'topnav-hidden'};

	//$scope.scroll.$watch(function(){
		
	//});
	

	$rootScope.scrollTo = function(to){
		$("html, body").delay(300).animate({scrollTop:to},{easing: "easeOutExpo"}, 2000);
	}

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




}]);