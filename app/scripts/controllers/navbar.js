'use strict';
angular.module('angoApp').controller('NavbarCtrl', ['$scope', '$rootScope', '$location', 'Auth', '$timeout', function($scope, $rootScope, $location, Auth, $timeout) {
  
  $scope.isCollapsed = true;
  
  $scope.menu = [{
    'title': 'Home',
    'link': '/'
  }, {
    'title': 'About',
    'link': '/about'
  }, {
    'title': 'Blog',
    'link': '/articles'
  }, {
    'title': 'Contact',
    'link': '/contact'
  }];

  $rootScope.$on('$routeChangeStart', function(e, curr, prev) {
    $scope.isCollapsed = true;
  });

  $rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
    $rootScope.$broadcast('update');
  });

  $scope.toggleNav = function() {
    $scope.isCollapsed = !$scope.isCollapsed;
  }

  $scope.toggleAside = function() {
    
    var m = $scope.isCollapsed ? 0 : 300;
    if (!$scope.isCollapsed) {
      var w = $(window).width() - 20;
      $('.container').width(w);
    }

    $('body').animate({
      'margin-left': m
    }, 700, function() {
      if ($scope.isCollapsed) {
        $('.container').width('');
      }
    });

  }

  $scope.$on('update', function() {
    $scope.setPointer();
  });

  $scope.activePos = function(){
    var o = jQuery('#top-nav li.active').offset();
      o.w = jQuery('#top-nav li.active').width();
      o.h = jQuery('#top-nav li.active').height();
    return o;
  }

  $scope.setPointer = function() {

    var o = $scope.activePos();
    jQuery('#top-nav .pointer').css({top:58, width:o.w, left:o.left, height:24, 'font-size':'3em'});

    $timeout(function(){
      o = $scope.activePos();
      jQuery('#top-nav .pointer').css({top:(o.h + 1), left: o.left, width:o.w, height:16, 'font-size':'1em'});
    }, 700);   
  }


  $scope.logout = function() {
    Auth.logout().then(function() {
      $location.path('/login');
    });
  };

  $scope.isActive = function(route) {
    return route === $location.path();
  };
}]);