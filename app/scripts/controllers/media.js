'use strict';

angular.module('angoApp').controller('MediaCtrl', ['$scope', '$rootScope', 'Files', '$timeout', function($scope, $rootScope, Files, $timeout) {


  $scope.tabs = [{
    icon: 'fa-folder',
    title: 'Media Files',
    template: "partials/media-files.html"
  }, {
    icon: 'fa-upload',
    title: "Upload Media",
    template: "partials/media-upload.html"
  }, {
    icon: 'fa-code',
    title: "Embeded Sources",
    template: "partials/media-embeded.html"
  }, ];

  Files.getAll();
  $scope.mediaFiles = Files.mediaFiles || [];

  $scope.currPage = 1;
  $scope.limit = 24;
  $scope.offset = 0;

  $scope.paginate = function(page) {
    $scope.offset = (page-1) * 24;
  };
  

  $rootScope.$on('mediaUpdate', function() {
    $scope.mediaFiles = Files.mediaFiles;
    $scope.selected = Files.selected;
    $scope.selectedMedia = Files.selectedMedia;
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

}]);