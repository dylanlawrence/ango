'use strict';

angular.module('angoApp').controller('GlobalCtrl', ['$scope', '$rootScope', '$http', '$route', '$timeout', '$window', '$location', '$routeParams', '$filter',
	function($scope, $rootScope, $http, $route , $timeout, $window, $location, $routeParams, $filter) {

	$scope.scroll = 0;
	var inflector = $filter('inflector');


	$scope.bodyClassObj = {default:'body', context:'page-', topnav:'topnav-hidden'};
/*
	$scope.$watch('scroll', function(){
		
	});
*/
	$($window).on('resize', function() {
		$scope.width = $(window).width();
		$scope.height = $(window).height();
	    $rootScope.$broadcast('_resize_now');

		$timeout.cancel($scope.tout);	
		$scope.tout = $timeout(function(){
			$rootScope.$broadcast('update');
		},200);
	});

	$rootScope.scrollTo = function(to){
		$("html, body").delay(300).animate({scrollTop:to},{easing: "easeOutExpo"}, 2000);
	}

	$scope.$on('update', function(){
		$scope.bp = {xs:false,sm:false,md:false,lg:false,port:false}
		$scope.bodyClassObj.orientation = 'landscape';
		$scope.bodyClassObj.device = 'desktop';
		$scope.matchM();
		$scope.device = 'fa-' + $scope.bodyClassObj.device;
		//$scope.setNavMainBtn();
	});

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

	$scope.$route = $route;
	$scope.$location = $location;
	$scope.$routeParams = $routeParams;

	//$scope.path = $location.path();
	$rootScope.$on('$routeChangeStart', function(e, curr, prev) {
		var path = $location.path();
		var context = path.replace(/\//g,'');
		$scope.bodyClassObj.context = inflector('page-'+context, 'underscore');

		$scope.title = "Ango - " + context;
	});


	$scope.getBodyClass = function() {

		var c = [];
		angular.forEach($scope.bodyClassObj, function(value, key){
			c.push(value);
		});

		return c;
	}




}]);