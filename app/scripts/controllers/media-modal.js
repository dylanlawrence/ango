'use strict';

/*
angular.module('angoApp').controller('UploadCtrl', ['$scope','$fileUploader', 
  function($scope, $fileUploader) {
}]);
*/


angular.module('angoApp').controller('MediaModalCtrl', ['$scope', '$modalInstance', 'items', '$fileUploader', '$http', 
  function($scope, $modalInstance, items, $fileUploader, $http) {

  $scope.mediafiles = {};

  $http.get('/api/files').success(function(files) {
      $scope.mediafiles = files;
  });

  $scope.selectFile = function(f){
    //$scope.selected =
  }

  $scope.ok = function() {
    $modalInstance.close($scope.selected.item);
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };

  // Creates an uploader
  var uploader = $scope.uploader = $fileUploader.create({
    scope: $scope,
    url: '/api/upload'
  });

  // ADDING FILTERS
  // Images only
  uploader.filters.push(function(item /*{File|HTMLInputElement}*/ ) {
    var type = uploader.isHTML5 ? item.type : '/' + item.value.slice(item.value.lastIndexOf('.') + 1);
    type = '|' + type.toLowerCase().slice(type.lastIndexOf('/') + 1) + '|';
    return '|jpg|png|jpeg|bmp|gif|'.indexOf(type) !== -1;
  });
  // REGISTER HANDLERS
  uploader.bind('afteraddingfile', function(event, item) {
    console.info('After adding a file', item);
  });
  uploader.bind('afteraddingall', function(event, items) {
    console.info('After adding all files', items);
  });
  uploader.bind('beforeupload', function(event, item) {
    console.info('Before upload', item);
  });
  uploader.bind('progress', function(event, item, progress) {
    console.info('Progress: ' + progress, item);
  });
  uploader.bind('success', function(event, xhr, item, response) {
    console.info('Success', xhr, item, response);
  });
  uploader.bind('cancel', function(event, xhr, item) {
    console.info('Cancel', xhr, item);
  });
  uploader.bind('error', function(event, xhr, item, response) {
    console.info('Error', xhr, item, response);
  });
  uploader.bind('complete', function(event, xhr, item, response) {
    console.info('Complete', xhr, item, response);
  });
  uploader.bind('progressall', function(event, progress) {
    console.info('Total progress: ' + progress);
  });
  uploader.bind('completeall', function(event, items) {
    //console.info('Complete all', items);
    if (this.progress > 99) {
      $modalInstance.close(items);
    }
  });

}]);