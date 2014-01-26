'use strict';

/*
angular.module('angoApp').controller('UploadCtrl', ['$scope','$fileUploader', 
  function($scope, $fileUploader) {
}]);
*/


angular.module('angoApp').controller('MediaModalCtrl', ['$scope', '$modalInstance', 'fileData', 'uploader', '$http', 
  function($scope, $modalInstance, fileData, uploader, $http) {

  $scope.files = fileData.files;
  $scope.mediaFiles = fileData.mediaFiles;

  $scope.selectedById = function(id){
    angular.forEach($scope.mediaFiles, function(value, key){
        console.debug(value._id);
        if(value._id == id){
            value.selected = true; 
        }
    });
  }

  $scope.selectFile = function(index){
    $scope.mediaFiles[index].selected = !$scope.mediaFiles[index].selected;
  }

  $scope.getSelected = function(index){
    return $scope.mediaFiles[index].selected;
  }

  $scope.ok = function() {
    var selected = {};
    angular.forEach($scope.mediaFiles, function(value, key){
        if(value.selected)
            selected[key] = value;          
    });
    $modalInstance.close(selected);
  };

  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };


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
      $scope.ok();
    }
  });

}]);