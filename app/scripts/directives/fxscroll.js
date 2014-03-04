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

angular.module('angoApp').directive('fxScrollTop', ['$window', function($window) {

	return {
		scope: {
			scroll: '=fxScrollTop',
			percent: '=fxPercent'
		},
		link: function(scope, element, attrs) {
			var w = angular.element($window);

			var handler = function() {
					var h = w.height();
					var eh = element.offset();
					scope.scroll = eh.top - w.scrollTop();
					scope.percent =  ( scope.scroll / h ) * 100;
				}

			w.on('scroll', scope.$apply.bind(scope, handler));
			handler();
			scope.$on('update', handler);

		}
	};
}]);