'use strict';
angular.module('filters', ['truncate'])
	.filter('htmlText', function() {
	
	return function(text) {
		return String(text).replace(/<[^>]+>/gm, '');
	}

});