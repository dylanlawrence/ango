'use strict';

angular.module('angoApp')
.controller('ArticlesCtrl', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 
    function ($scope, $routeParams, $location, Global, Articles) {

    $scope.global = Global;

    $scope.media = [];
    $scope.title = '';
    $scope.content = '';

    $scope.create = function() {
        console.debug(this);
        var article = new Articles({            
            title: this.title,
            content: this.content,
            media : this.media
        });

        article.$save(function(response) {
            $location.path('articles/' + response._id);
        });

        this.title = '';
        this.content = '';
        this.media = '';
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();
            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        }else {
            $scope.article.$remove();
            $location.path('article');
        }
    };

    $scope.update = function() {
        
        var article = $scope.article;
        //console.debug($scope.article);

        if (!article.updated) {
            article.updated = [];
        }

        article.user = article.user._id;
        article.updated.push(new Date().getTime());

        article.$update(function() {
            $location.path('articles/' + article._id);
        });

    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
        });
    };

    $scope.findOne = function() {

        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            $scope.article = article;
        });
    };

  }]);