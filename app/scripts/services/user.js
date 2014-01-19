'use strict';

angular.module('angoApp').factory('User', function($resource) {
  return $resource('/api/users/:id', {
    id: '@id'
  }, { //parameters default
    update: {
      method: 'PUT',
      params: {}
    },
    get: {
      method: 'GET',
      params: {
        id: 'me'
      }
    },
    getAll: {
      method: 'GET',
      params: {
        id: 'all'
      }
    }

  });
});