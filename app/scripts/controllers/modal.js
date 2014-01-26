'use strict';

angular.module('angoApp').controller('ModalCtrl', ['$scope', '$http', '$modal', '$log','$fileUploader', function($scope, $http, $modal, $log,$fileUploader) {
  
  $scope.files = []; // previously selected
  $scope.mediaFiles = [];

  $scope.openMediaModal = function() {
    
    // Get MediaFiles;
    if(!$scope.mediaFiles){
      //console.debug("mediaFiles", $scope.mediaFiles); 
      // TODO figure out how to call this once and maybe limit offset to page
      $http.get('/api/files').success(function(mediaFiles) {
          $scope.mediaFiles = mediaFiles;
      });      
    }
    /*
      angular.forEach(files, function(value, key){
        $scope.selectedById(value._id);
      });
    */
    if(!$scope.uploader){
      //console.debug("uploader", $scope.uploader);
      $scope.uploader = $fileUploader.create({
        scope: $scope,
        url: '/api/upload'
      });
    }

    var modalInstance = $modal.open({
      templateUrl: 'partials/media-modal',
      controller: 'MediaModalCtrl',
      resolve: {
        fileData: function() {
          var fileData = {files: $scope.files, mediaFiles:$scope.mediaFiles}
          return fileData;
        },
        uploader:function(){
          return $scope.uploader;
        }
      }
    });

    modalInstance.result.then(function (files) {
        
        $scope.files = files;
        $scope.media = [];

        angular.forEach(files, function(value, key){
          $scope.media.push(value._id);
        });

    }, function () {
        $log.info('Modal dismissed at: ' + new Date());
    });

  };

}]);




