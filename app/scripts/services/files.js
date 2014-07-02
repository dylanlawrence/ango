'use strict';
angular.module('angoApp').service('Files', ['$rootScope', '$http', '$fileUploader', '$q', '$timeout', 
  function($rootScope, $http, $fileUploader, $q, $timeout) {
  
  var _this = this;
  /**
   * Call for Media
   */
  this.mediaFiles = [];
  this.getAll = function() {
    if (this.mediaFiles.length == 0) {
      this._getAll();
    }
  }

  this._getAll = function() {
    $http.get('/api/files').success(function(data) {
        _this.mediaFiles = data;
        _this.setSelected(null);
        $rootScope.$broadcast('mediaUpdate');
    });
  }

  /**
   * Call for Media
   */
  this.byId = function(id) {
    // console.log(_this.mediaFiles);
    angular.forEach(_this.mediaFiles, function(value, key){
        if(value._id == id){
            return value;
        }
    });
  }

  /**
   * Set Selected media
   */
  this.selected = [];
  this.selectedMedia = [];

  this.setSelected = function(s) {

    _this.selected = s || _this.selected;
    _this.selectedMedia = [];
    angular.forEach(_this.selected, function(id, k){
        angular.forEach(_this.mediaFiles, function(value, key){
            if(value._id == id){
                _this.selectedMedia.push(value); 
            }
        });
    });

    $q.all(_this.selected).then(function () {
      $timeout(function(){
        $rootScope.$broadcast('mediaUpdate');
      },500);
      
    });

  }

  this.selectMedia = function(id) {
      _this.selected.push(id);
      _this.setSelected(_this.selected);
  }

  this.unSelectMedia = function(id){
      var e = _this.selected.indexOf(id);
      _this.selected.splice(e,1);
      _this.setSelected(_this.selected);
  }

  this.removeSelected = function(){
    $http.post('/api/files/remove',{data:_this.selected}).success(function(data) {
      _this._getAll();
    });   
  }



  /**
   * Create an uploader 
   */
  this.uploader = null;
  this.getUploader = function() {

    if (_this.uploader) return _this.uploader;

    var uploader = _this.uploader = $fileUploader.create({
      scope: $rootScope,
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
    /*
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
        $rootScope.$broadcast('uploadComplete');
      }
    });
*/
    return _this.uploader;
  }
}]);