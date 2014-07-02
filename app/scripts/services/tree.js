'use strict';

angular.module('angoApp').factory('Tree', ['$resource', function($resource) {
    
  return $resource('/api/trees/:id', {
    id: '@id'
    }, { //parameters default
    update: {
      method: 'PUT'
    },
    get: {
      method: 'GET'
      // ,params: { id: ''}
    }
  });
  
}]);