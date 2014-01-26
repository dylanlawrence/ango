var fs = require('fs'),
	async = require('async'),
	mongoose = require('mongoose'),
	File = mongoose.model('File'),
	path = require('path'),
	config = require('../config/config'),
	easyimg = require('easyimage');


var uploadDir = path.normalize(config.root + config.filesystem.upload);
var thumbdir = path.normalize(uploadDir + 'thumb/');


/**
 * stat( uploadDir ) exists? then 
 * Get || Create Upload Directory
 * cb(err, res)
 */
getUploadDir = function(cb) {
	fs.stat(uploadDir, function(err, stats) {
		if (err) {
			if (err.code == 'ENOENT') {
				fs.mkdir(uploadDir, 0777, function() {
					fs.mkdir(thumbdir, 0777, function() {
						cb(null, uploadDir);
					});
				});
			}
		} else {
			cb(null, uploadDir);
			return;
		}
	});
}


handleUpload = function(req, res, cb) {

	fs.readFile(req.files.file.path, function(err, data) {

		var imgName = req.files.file.name
		if (!imgName) {
			console.log("There was an error")
			res.redirect("/");
			res.end();
		} else {
			var newPath = path.normalize(uploadDir + imgName);
			fs.writeFile(newPath, data, function(err) {
				cb(null, imgName);
			});
		}
	});
}

createThumb = function(srcPath, name, ext) {

	var opt = {
		src: srcPath,
		dst: thumbdir + name + '.jpg',
		width: 128,
		height: 128,
		cropwidth: 100,
		cropheight: 100,
		x: 0,
		y: 0
	};

	easyimg.rescrop(opt, function(err, image) {
		if (err) throw err;
		console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
	});

}

addFile = function(name, ext, res) {

	var newFile = new File({
		'name': name,
		'ext': ext
	});
	newFile.save(function(err,file) {
		if (err) {
			console.log('errors', err);
		}
		res.json(file);
	});
}

/**
 * Get / Make Upload Dir
 * Handle Upload
 */
exports.upload = function(req, res) {
	
	async.parallel({
		uploadDir: function(cb) {
			getUploadDir(cb);
		},
		imgName: function(cb) {
			handleUpload(req, res, cb);
		}
	}, function(err, results) {
		//console.log(results);
		var newPath = path.normalize(uploadDir + results.imgName);
	
		var split = results.imgName.split('.');
		var name = split.shift();
		var ext = split.pop();
		createThumb(newPath, name, ext);
		addFile(name, ext, res);
		//results.thumb = name + '.jpg';
		//res.json(results);	
	});
}

/**
 * List of Files
 */
/* 
	File.find({}).remove(function() {});
*/
exports.all = function(req, res) {
    File.find().sort('-created').exec(function(err, files) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(files);
        }
    });
};