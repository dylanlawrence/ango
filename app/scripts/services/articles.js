'use strict';
angular.module('angoApp').factory('Articles', ['$resource', function($resource) {
	
	return $resource('/api/articles/:articleId', {
		articleId: '@_id'
	}, {
		update: {
			method: 'PUT'
		}
	});
	
}]);