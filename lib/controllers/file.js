var fs = require('fs'),
	async = require('async'),
	mongoose = require('mongoose'),
	File = mongoose.model('File'),
	path = require('path'),
	config = require('../config/config'),
	media = require('./media'),
	easyimg = require('easyimage');
var uploadDir = path.normalize(config.root + config.filesystem.upload);
var thumbdir = path.normalize(uploadDir + 'thumb/');
var imgStyles = ['thumb', 'xs', 'sm', 'md', 'lg'];
/**
 * stat( uploadDir ) exists? then 
 * Get || Create Upload Directory
 * cb(err, res)
 */
getAddDir = function(dir, cb) {
	fs.stat(dir, function(err, stats) {
		if (err) {
			if (err.code == 'ENOENT') {
				fs.mkdir(dir, 0777, function() {
					cb(null, dir);
				});
			}
		} else {
			cb(null, dir);
			return;
		}
	});
}
handleUpload = function(req, res, cb) {
	fs.readFile(req.files.file.path, function(err, data) {
		var imgName = encodeURIComponent(req.files.file.name);
		if (!imgName) {
			console.log("There was an error");
		} else {
			var newPath = path.normalize(uploadDir + imgName);
			fs.writeFile(newPath, data, function(err) {
				var split = imgName.split('.');
				var name = split.shift();
				var ext = split.pop();
				cb(null, name, ext);
			});
		}
	});
}
/**
 * Add File to DB
 */
addFile = function(name, ext, cb) {
	var newFile = new File({
		'name': name,
		'ext': ext
	});
	newFile.save(function(err, file) {
		cb(err, file);
	});
}
/**
 * Get / Make Upload Dir
 * Handle Upload
 */
exports.upload = function(req, res) {
	async.waterfall([

	function(cb) {
		getAddDir(uploadDir, cb);
	}, function(uploadDir, cb) {
		// TODO _.each( image style dir )
		//getAddDir(thumbdir, cb);
		async.eachSeries(imgStyles, function(item, _cb) {
			var dir = path.normalize(uploadDir + item + '/');
			getAddDir(dir, _cb);
		}, function(err) {
			//console.log(err);
			cb(null, imgStyles);
		});
	}, function(imgStyles, cb) {
		handleUpload(req, res, cb);
	}, function(name, ext, cb) {
		media.createThumb(name, ext, cb);
	}, function(name, ext, cb) {
		addFile(name, ext, cb);
	}], function(err, result) {
		console.log('result', result);
		res.json(result);
	});
/*
	async.series({
		uploadDir: getUploadDir,
		imgName: function(cb) {
			handleUpload(req, res, cb);
		}
	}, function(err, results) {
		var split = results.imgName.split('.');
		var name = split.shift();
		var ext = split.pop();
		media.createThumb(name, ext, cb);
		addFile(name, ext, res);
	});
*/
}
/**
 * List of Files
 */
getAll = function(cb) {
	File.find().sort('-created').exec(function(err, files) {
		cb(err, files);
	});
};
/* 
File.find({}).remove(function() {});
*/
exports.all = function(req, res) {
	async.series({
		all: getAll
	}, function(err, results) {
		res.json(results.all);
	});
};
/**
 * Delete 
 */
exports.remove = function(req, res) {
	// req.body.data = [id, id]
	async.eachSeries(req.body.data, function(id, cb) {
		File.remove({
			_id: id
		}, function(err) {
			console.log(id, 'Removed');
			cb(err);
		});
	}, function(err) {
		console.log(err);
		res.json({
			'errors': err
		});
	});
};
/**
 * Rebuild 
 */
exports.rebuild = function(req, res) {
	async.waterfall([

	function(cb) {
		getAll(cb);
	}, function(files, cb) {
		media.rebuild(files, cb);
	}], function(err, results) {
		res.json(results);
	});
};