'use strict';

angular.module('angoApp')
  .controller('NavbarCtrl', ['$scope', '$rootScope', '$location', 'Auth', '$timeout', function ($scope,$rootScope, $location, Auth, $timeout) {
    

    $scope.isCollapsed = true;

    $scope.menu = [{
      'title': 'About',
      'link': '/about'
    }, {
      'title': 'Work',
      'link': '/work'
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

    });

    $scope.toggleNav = function(){
      $scope.isCollapsed = !$scope.isCollapsed;
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
