'use strict';

angular.module('angoApp').controller('ModalCtrl', ['$scope', '$http', '$modal', '$log', function($scope, $http, $modal, $log) {
  
  $scope.items = ['item1', 'item2', 'item3'];
  
  $scope.openMediaModal = function() {
    var modalInstance = $modal.open({
      templateUrl: 'partials/media-modal',
      controller: 'MediaModalCtrl',
      resolve: {
        items: function() {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (files) {
        //console.debug(files);
        $scope.files = files;
    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });
  };

}]);

