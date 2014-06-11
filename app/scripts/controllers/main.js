'use strict';

angular.module('angoApp').controller('MainCtrl', ['$scope', '$http','$timeout', function($scope, $http, $timeout) {

	$http.get('/api/awesomeThings').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	});

	$scope.slideImages = [{
		template:'partials/slide1'
	}, {		
		template:'partials/slide2'
	}, {
		template:'partials/slide3'
	}];

	$scope.aceLoaded = function(_editor) {
		// Options
		//_editor.setReadOnly(true);
	};

	$scope.aceChanged = function(e) {
		//
	};

	$timeout(function(){
		picturefill({ reevaluate: true });
	},100);




}]);