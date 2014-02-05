'use strict';

angular.module('angoApp').directive('fxScroll', ['$window', function($window) {

	return {
		scope: {
			scroll: '=fxScroll'
		},
		link: function(scope, element, attrs) {

			var w = angular.element($window);
			var handler = function() {
					scope.scroll = w.scrollTop();
				}
			w.on('scroll', scope.$apply.bind(scope, handler));
			handler();
		}
	};


}]);