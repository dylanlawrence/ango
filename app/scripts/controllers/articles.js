'use strict';

angular.module('angoApp')
.controller('ArticlesCtrl', ['$scope', '$routeParams', '$location', 'Global', 'Articles', 'Files', '$timeout', '$q', 
    function($scope, $routeParams, $location, Global, Articles, Files, $timeout, $q) {

    $scope.global = Global;
    $scope.article = {
        'media': []
    };

    $scope.open = function($event) {
        $event.preventDefault();
        $event.stopPropagation();
        $scope.opened = true;
    };

    $scope.dateOptions = {
        'year-format': "'yy'",
        'starting-day': 1
    };

    $scope.newArticle = function() {
        $scope.media = '';
        $scope.mediaDisplay = '';
        $scope.title = '';
        $scope.content = '';
        Files.setSelected([]);
    }

    $scope.$on('mediaUpdate', function() {
        $scope.media = Files.selected;
        $scope.mediaDisplay = Files.selectedMedia;
        $scope.article.media = Files.selected;
    });

    $scope.create = function() {
        var article = new Articles({
            title: this.title,
            content: this.content,
            media: this.media
        });
        article.$save(function(response) {
            $location.path('articles/' + response._id);
        });
        this.title = '';
        this.content = '';
        this.media = '';
    };

    $scope.findOne = function() {
        $scope.article = {
            'media': []
        };
        Articles.get({
            articleId: $routeParams.articleId
        }, function(article) {
            //console.debug(article);
            article.mediaDisplay = article.media;
            Files.getAll();
            var selected = [];
            angular.forEach(article.media, function(item, k) {
                selected.push(item._id);
            });
            $q.all(article.media).then(function() {
                Files.setSelected(selected);
                article.media = selected;
                $scope.article = article;
            });
        });
    };

    $scope.update = function() {
        console.debug($scope.article);
        var article = $scope.article;
        if (!article.updated) {
            article.updated = [];
        }
        article.user = article.user._id;
        article.updated.push(new Date().getTime());
        article.$update(function() {
            $location.path('articles/' + article._id);
        });
    };

    $scope.remove = function(article) {
        if (article) {
            article.$remove();
            for (var i in $scope.articles) {
                if ($scope.articles[i] === article) {
                    $scope.articles.splice(i, 1);
                }
            }
        } else {
            $scope.article.$remove();
            $location.path('article');
        }
    };

    $scope.find = function() {
        Articles.query(function(articles) {
            $scope.articles = articles;
        });
    };

}]);