'use strict';
angular.module('angoApp').controller('NavbarCtrl', ['$scope', '$route', '$rootScope', '$location', 'Auth', '$timeout', function($scope, $route, $rootScope, $location, Auth, $timeout) {
  
  $scope.isCollapsed = true;
  
  $scope.menus = {};

  $scope.menus.main = [{
    'title': 'Home',
    'link': '/',
    'route': '/'
  }, {
    'title': 'About',
    'link': '/about',
    'route': '/about'
  }, {
    'title': 'Blog',
    'link': '/articles',
    'route': '/articles',
    c:[{ 
        'title': 'Articles',
        'link': '/articles',
        'route': '/articles/:articleId'
      }]
  }, {
    'title': 'Contact',
    'link': '/contact',
    'route': '/contact'
  }];

  $rootScope.$on('$routeChangeStart', function(e, curr, prev) {
    $scope.isCollapsed = true;
  });

  //$rootScope.$on('$routeChangeSuccess', function(e, curr, prev) {
    // console.log($route, $location);
   // $rootScope.$broadcast('update');
  //});

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
    $timeout(function(){
      $scope.setPointer();
    }, 700);
  });

  $scope.activePos = function() {

    var o = {left:0,top:0,w:0,h:0}
    if(jQuery('#top-nav li.active').length > 0){
      var o = jQuery('#top-nav li.active').offset();
        o.w = jQuery('#top-nav li.active').width();
        o.h = jQuery('#top-nav li.active').height();
    }
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

    if($route.routes[route]){
      var path = $scope.switchRouteMatcher($location.path(),  $route.routes[route] );
      //console.log("PATH", path);
      return path;
    }
    //console.log($route.routes[route].regexp);
    return; //

    //route === $location.path();
  };

  $scope.switchRouteMatcher = function(on, route) {
      var keys = route.keys,
          params = {};

      if (!route.regexp) return null;

      var m = route.regexp.exec(on);
      if (!m) return null;

      for (var i = 1, len = m.length; i < len; ++i) {
        var key = keys[i - 1];

        var val = 'string' == typeof m[i]
              ? decodeURIComponent(m[i])
              : m[i];

        if (key && val) {
          params[key.name] = val;
        }
      }
      return params;
    }
  
}]);