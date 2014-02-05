'use strict';
angular.module('angoApp').controller('MediaModalCtrl', ['$scope', '$rootScope', '$modalInstance', 'Files', '$timeout', 
  function($scope, $rootScope, $modalInstance, Files, $timeout) {
  
  $scope.uploader = Files.getUploader();
  $scope.scope = "MediaModal";
  
  $scope.currPage = 1;
  $scope.limit = 12;
  $scope.offset = 0;

  $scope.paginate = function(page) {
    $scope.offset = (page-1) * 12;
  };
  
  $scope.tabs = [{
    icon: 'fa-folder',
    title: 'Media Files',
    template: "partials/media-modal-files.html"
  }, {
    icon: 'fa-upload',
    title: "Upload Media",
    template: "partials/media-modal-upload.html"
  }, {
    icon: 'fa-code',
    title: "Embeded Sources",
    template: "partials/media-modal-embeded.html"
  }, ];

  Files.getAll();
  $scope.mediaFiles = Files.mediaFiles || [];

  $rootScope.$on('mediaUpdate', function() {
    $scope.mediaFiles = Files.mediaFiles;
    $scope.selected = Files.selected;
    $scope.selectedMedia = Files.selectedMedia;
  });
  
  $scope.uploader.bind('completeall', function(event, items) {
    //console.info('Complete all', items);
    $scope.status = "Complete";
    if (this.progress > 99) {
      $timeout(function() {
        $scope.tabs[0].active = true;
        Files._getAll();
        $scope.uploader.queue = [];
      }, 700);
    }
  });
  $scope.uploader.bind('complete', function(event, xhr, item, response) {
    $scope.selectFile(response._id);
  });
  $scope.getSelected = function(id) {
    return Files.selected.indexOf(id) != -1;
  }
  $scope.selectFile = function(id) {
    if ($scope.getSelected(id)) {
      Files.unSelectMedia(id);
    } else {
      //console.log(id);
      Files.selectMedia(id);
    }
  }
  $scope.removeMedia = function() {
    Files.removeSelected();
  }
  $scope.callFileInput = function() {
    $timeout(function() {
      $("input[type='file']").trigger('click');
    }, 100);
  };
  // Send back to modalctrl
  $scope.ok = function() {
    var selected = {};
    $scope.uploader.queue = [];
    $modalInstance.close();
  };
  $scope.cancel = function() {
    $modalInstance.dismiss('cancel');
  };
}]);