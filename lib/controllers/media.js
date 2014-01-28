var fs = require('fs'),
	async = require('async'),
	path = require('path'),
	config = require('../config/config'),
	_ = require('lodash'),
	easyimg = require('easyimage');

// 
var uploadDir = path.normalize(config.root + config.filesystem.upload);
var thumbdir = path.normalize(uploadDir + 'thumb/');


createThumb = function(name, ext, cb) {

	var problems = [];
	var src = uploadDir + name + '.' + ext;
	
	var opt = {
		src: src,
		dst: thumbdir + name + '.jpg',
		width: 128,height: 128,
		cropwidth: 64,cropheight: 64,
		x: 0,y: 0
	};

	easyimg.rescrop(opt, function(err, image) {
		cb(err, name, ext);
	});

}
exports.createThumb = createThumb;


var problems = [];
rebuildThumb = function(o,cb){

	var src = uploadDir + o.name + '.' + o.ext;
	
	fs.stat(src, function(err, stats) {
		if (err){
			problems.push({'err':err, file:o});
			cb(null);
		}else{
			createThumb(o.name, o.ext, cb);
		}
	});
}

exports.rebuild = function(files, cb) {

	problems = [];

	async.eachSeries(files, rebuildThumb, function(err){
		console.log(problems);
	    //console.log(err);
	    cb(null, problems);
	});

	/*
	_.each(files, function(o) {
		createThumb(o.name, o.ext);
	});
	*/


}