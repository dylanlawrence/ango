'use strict';

angular.module('angoApp', ['ngCookies', 'ngResource', 'ngSanitize', 'ngRoute', 
  'ui.bootstrap', 'ui.ace', 'ui.sortable', 'angularFileUpload', 'textAngular', 'angular-carousel', 'filters'])
.config(function($routeProvider, $locationProvider, $httpProvider) {
  $routeProvider.when('/', {
    templateUrl: 'partials/main',
    controller: 'MainCtrl'
  }).when('/login', {
    templateUrl: 'partials/login',
    controller: 'LoginCtrl'
  }).when('/signup', {
    templateUrl: 'partials/signup',
    controller: 'SignupCtrl'
  }).when('/settings', {
    templateUrl: 'partials/settings',
    controller: 'SettingsCtrl',
    authenticate: true
  }).when('/contact', {
    templateUrl: 'partials/contact',
    controller: 'ContactCtrl'
  }).when('/about', {
    templateUrl: 'partials/about',
    controller: 'AboutCtrl'
  }).when('/work', {
    templateUrl: 'partials/work',
    controller: 'WorkCtrl'
  }).when('/articles', {
    templateUrl: 'partials/articles-list.html',
    controller: 'ArticlesCtrl'
  }).when('/articles/create', {
    templateUrl: 'partials/articles-create.html',
    controller: 'ArticlesCtrl'
  }).when('/articles/:articleId', {
    templateUrl: 'partials/articles-view.html',
    controller: 'ArticlesCtrl'
  }).when('/articles/:articleId/edit', {
    templateUrl: 'partials/articles-edit.html',
    controller: 'ArticlesCtrl'
  }).when('/media', {
    templateUrl: 'partials/media',
    controller: 'MediaCtrl'
  }).when('/drupal', {
    templateUrl: 'partials/drupal',
    controller: 'DrupalCtrl'
  }).otherwise({
    redirectTo: '/'
  });

  $locationProvider.html5Mode(true);

  // Intercept 401s and 403s and redirect you to login
  $httpProvider.interceptors.push(['$q', '$location', function($q, $location) {
    return {
      'responseError': function(response) {
        if (response.status === 401 || response.status === 403) {
          $location.path('/login');
          return $q.reject(response);
        } else {
          return $q.reject(response);
        }
      }
    };
  }]);
}).run(function($rootScope, $location, Auth) {

  // Redirect to login if route requires auth and you're not logged in
  $rootScope.$on('$routeChangeStart', function(event, next) {
    if (next.authenticate && !Auth.isLoggedIn()) {
      $location.path('/login');
    }
  });

  $rootScope.$on('$routeChangeSuccess', function(event, next) {

    $rootScope.scrollTo(0);
  });
});