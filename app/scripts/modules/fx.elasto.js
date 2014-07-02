var bxColors = {
	bx1: [255, 255, 255, 0.2],
	bx2: [255, 255, 255, 0.3],
	bx3: [59, 89, 152, 0.3],
	bx4: [0, 204, 255, 0.3],
	bx5: [255, 255, 255, .3],
	bx6: [255, 255, 255, .3],
}

angular.module('fx.elasto', [])
.factory('Elasto', function($rootScope) {
	return {
		update: function() {
			$rootScope.$broadcast('update');
			return;
		}
	}
})

.run(function($rootScope, $window, Elasto) {

	$rootScope.$on('$stateChangeSuccess', function(event, toState, toParams, fromState, fromParams) {
		Elasto.update();
		//console.log('end');
	});

	angular.element($window).bind('resize', function() {
		Elasto.update();
	});

	//angular.element($window).bind('scroll', function() {
	//	Elasto.update();
	//});

}).controller('ElastoCtrl', function($scope, $timeout, $window, $rootScope, Elasto) {

	$scope.c = document.getElementById('c');

	var tmo_anim;
	var udtimeout;
	var tmo_end;
	$scope.frameId = 0;

	if ($scope.c.getContext) {
		$scope.ctx = $scope.c.getContext('2d');
	}

/**
		 $watch for the screen size to change
		*/
	$scope.getViewSize = function() {
		return $window.innerWidth + $('.jumbotron').height();
	}

	$scope.$watch($scope.getViewSize, function(value, old) {
		$scope.c.width = $window.innerWidth;
		$scope.c.height = $('.jumbotron').height() + 100;
		$scope.center = {
			x: $window.innerWidth / 2,
			y: ($('.jumbotron').height() + 100) / 2
		};
		$timeout(function() {
			Elasto.update();
		}, 500);
	});

	$scope.getStatus = function() {
		return $scope.status;
	};

	var center = {
		x: 200,
		y: 200
	};
	$scope.boxes = $scope.boxes || {};

	$scope.addBox = function(el, attrs) {
		var bid = attrs.bxid;
		//console.log(el, attrs);
		var box = {}
		box[bid] = {
			bid: bid,
			to: [],
			pts: [],
			bgColor: bxColors[bid],
			siz: $.extend({
				width: {},
				height: {}
			}, {
				ofs: {},
				pos: {}
			})
		}
		for (var i = 0; i < 8; i++) {
			box[bid].to.push({
				x: center.x,
				y: center.y
			});
			box[bid].pts.push({
				x: center.x,
				y: center.y,
				vx: 0,
				vy: 0,
				k: 2.9,
				damp: 0.2 + (Math.random() * 0.2)
			});
		}
		$scope.boxes = $.extend($scope.boxes, box);
	}

	$scope.updateBox = function(el, attrs) {
		$rootScope.boxes = $scope.boxes;
		var bid = attrs.bxid;
		$scope.boxes[bid].siz = $.extend({
			width: $(el).width(),
			height: $(el).height()
		}, {
			ofs: $(el).offset(),
			pos: $(el).position()
		});
		$scope.boxes[bid].show = true;
		//console.log($scope.boxes);
	}


	$scope.$on('update', function() {
		$scope.status = "updating";
		$timeout.cancel(udtimeout);

		udtimeout = $timeout(function() {
			$scope.clearanim();
			//console.log('update');
			$scope.frameId = requestAnimationFrame($scope.anim);
			tmo_end = $timeout($scope.animEnd, 3000);
			$scope.setTo();

		}, 200);

	});

	$scope.anim = function(time) {
		tmo_anim = $timeout(function() {
			$scope.frameId = requestAnimationFrame($scope.anim);
			$scope.render();
		}, 145);
		//1000 / 15);			
	}

	$scope.clearanim = function() {
		$scope.status = "stop";
		$timeout.cancel(tmo_end);
		$timeout.cancel(tmo_anim);
		cancelAnimationFrame($scope.frameId);
		$scope.frameId = 0;
	}

	$scope.animEnd = function() {
		$scope.clearanim();
	}
	//$scope.frameId = requestAnimationFrame($scope.anim);
/**
			set the destination points
		*/
	$scope.setTo = function() {

		//console.debug($scope.boxes);
		var n = 0;
		for (var b in $scope.boxes) {
			$scope.delaySet(b, n);

			n++;
		}
	}
	$scope.delaySet = function(b, n) {
		$timeout(function() {
			$scope._setTo(b, n);
		}, n * 50);

		$timeout(function() {
			$scope.showit(b, n);
		}, n * 500);
	}
	$scope.showit = function(b, n) {
		var bx = $scope.boxes[b];
		bx.showbox = true;
	}

	$scope._setTo = function(b, n) {

		//console.debug('show',$scope.boxes[b].show);
		var bx = $scope.boxes[b];
		bx.showbox = false;

		if (!$scope.boxes[b].show) {
			bx.rnd = 1;
			for (var i = 0; i < 8; i++) {
				$scope.boxes[b].to[i] = {
					x: $scope.center.x,
					y: $scope.center.y
				}
			}
		} else {

			$timeout(function() {
				bx.rnd = 10;
				var to = $scope.boxes[b].to;

				var top = bx.siz.pos.top; // - $scope.sTop;
				to[0].x = to[3].x = to[5].x = bx.siz.ofs.left;
				to[0].y = to[1].y = to[2].y = top;
				to[1].x = to[6].x = bx.siz.ofs.left + bx.siz.width / 2;
				to[3].y = to[4].y = top + bx.siz.height / 2;
				to[2].x = to[7].x = to[4].x = bx.siz.ofs.left + bx.siz.width;
				to[5].y = to[6].y = to[7].y = top + bx.siz.height;
				$scope.boxes[b].to = to;
			}, 100 * n);
		}
	}


	$scope.render = function() {

		for (var b in $scope.boxes) {
			var bx = $scope.boxes[b];
			for (var i in bx.pts) {
				var ax = (bx.to[i].x - bx.pts[i].x) * bx.pts[i].k;
				var ay = (bx.to[i].y - bx.pts[i].y) * bx.pts[i].k;

				bx.pts[i].vx += ax;
				bx.pts[i].vy += ay;

				bx.pts[i].vx *= bx.pts[i].damp;
				bx.pts[i].vy *= bx.pts[i].damp;

				bx.pts[i].x += Math.round(bx.pts[i].vx);
				bx.pts[i].y += Math.round(bx.pts[i].vy);
			}
		}
		// clear
		this.ctx.clearRect(0, 0, $scope.c.width, $scope.c.height);
		this.drawPoints();
	}

	$scope.drawPoints = function(b) {

		for (var b in $scope.boxes) {
			var bx = $scope.boxes[b];
/*	
				for (var i = 0; i < bx.to.length; i++) {				
						$scope.ctx.beginPath();
						$scope.ctx.lineStyle = "green";
						$scope.ctx.arc(bx.to[i].x, bx.to[i].y, 3, 0, Math.PI*2, true);
						$scope.ctx.stroke();
						$scope.ctx.closePath();
				}	
				*/
			for (var i = 0; i < bx.to.length; i++) {
/*
						$scope.ctx.beginPath();
						$scope.ctx.lineStyle = "#990000";
						$scope.ctx.arc(bx.pts[i].x, bx.pts[i].y, 8, 0, Math.PI*2, true);
						$scope.ctx.stroke();
						$scope.ctx.closePath();
						*/
				$scope.draw(bx);
			}
		}
	}

	$scope.draw = function(sect) {
		var p = sect.pts;
		var rnd = sect.rnd || 10;
		var ctx = $scope.ctx;
		ctx.beginPath();
		ctx.moveTo(p[0].x + rnd, p[0].y); //1
		//corner 2
		ctx.quadraticCurveTo(p[1].x, p[1].y, p[2].x - rnd, p[2].y);
		ctx.quadraticCurveTo(p[2].x, p[2].y, p[2].x, p[2].y + rnd);
		//corner 7
		ctx.quadraticCurveTo(p[4].x, p[4].y, p[7].x, p[7].y - rnd);
		ctx.quadraticCurveTo(p[7].x, p[7].y, p[7].x - rnd, p[7].y);
		//corner 5
		ctx.quadraticCurveTo(p[6].x, p[6].y, p[5].x + rnd, p[5].y);
		ctx.quadraticCurveTo(p[5].x, p[5].y, p[5].x, p[5].y - rnd);
		//corner 0
		ctx.quadraticCurveTo(p[3].x, p[3].y, p[0].x, p[0].y + rnd);
		ctx.quadraticCurveTo(p[0].x, p[0].y, p[0].x + rnd, p[0].y);

		ctx.fillStyle = 'rgba(' + sect.bgColor + ')';
		ctx.fill();
		ctx.closePath();
	}

	$scope.geteclass = function() {
		//console.log(this.bid);
		return $scope.boxes[this.bid].showbox ? 'bounceIn' : 'fadeOut';
	}

}).directive('elasto', function($rootScope, $timeout) {

	return {
		transclude: true,
		template: '<div ng-transclude class="ebox animated" ng-class="geteclass();"></div>',
		//{{boxes[this.bid].showbox}}
		restrict: 'C',
		scope: true,
		//controller: function ($scope) {
		//}, 
		link: function postLink(scope, element, attrs) {
			console.debug(element);
			var bid = attrs.bxid;
			scope.bid = bid;

			if (!scope.boxes[bid]) {
				scope.addBox(element, attrs);
			} else {
				scope.boxes[bid].show = false;
			}

			scope.$watch(scope.getStatus, function(newv, oldv) {
				//console.log('watch');
				scope.updateBox(element, attrs);
			});

		}

	};
});