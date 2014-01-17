'use strict';

angular.module('angoApp')
  .controller('WorkCtrl', ['$scope', '$http', function ($scope, $http) {
    $http.get('/api/awesomeThings').success(function(awesomeThings) {
      $scope.awesomeThings = awesomeThings;
    });
  }]);