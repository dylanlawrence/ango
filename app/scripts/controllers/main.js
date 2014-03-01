'use strict';

angular.module('angoApp').controller('MainCtrl', ['$scope', '$http', function($scope, $http) {

	$http.get('/api/awesomeThings').success(function(awesomeThings) {
		$scope.awesomeThings = awesomeThings;
	});

	$scope.slideImages = [{
		style: '',
		class: 'slide1',
		content: '<h1>Slide 1</h1><p class="lead"><span style="background:#FFF; border-radius:10px"><img src="images/logo-sm.png" alt=""></span> = Angular and Node Expressing with Mongo.</p><p><a class="btn btn-lg btn-success" ng-href="#">Check It!</a></p>'
	}, {
		style: 'background-image:url(http://placehold.it/1920x300/336699/6699CC);',
		class: 'slide2',
		content: '<h1>Slide 2</h1>'
	}, {
		style: 'background-image:url(http://placehold.it/1920x300/6699CC/6090C0);',
		class: 'slide3',
		content: '<h1>Slide 3</h1>'
	}];


	$scope.aceLoaded = function(_editor) {
		// Options
		_editor.setReadOnly(true);
	};

	$scope.aceChanged = function(e) {
		//
	};

}]);