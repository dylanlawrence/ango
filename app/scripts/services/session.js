'use strict';

angular.module('angoApp').factory('Session', function($resource) {
	return $resource('/api/session/');
});