'use strict';

angular.module('angoApp').controller('ModalCtrl', ['$scope', 'Files', '$http', '$modal', '$log','$rootScope',  
  function($scope, Files, $http, $modal, $log, $rootScope) {
  
  //$scope.tabs = []; // previously selected

  $scope.unSelectMedia = function(id){
      Files.unSelectMedia(id);
  }

  $scope.openMediaModal = function() {
    
    var modalInstance = $modal.open({
      templateUrl: 'partials/media-modal',
      controller: 'MediaModalCtrl',
      scope:$rootScope,
      resolve: {
        tabs: function () {
          return $scope.tabs;
        }
      }
    });

    modalInstance.result.then(function () {

    }, function () {
        //$log.info('Modal dismissed at: ' + new Date());
    });

  };

}]);




