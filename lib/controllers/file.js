var fs = require('fs'),
	async = require('async'),
	mongoose = require('mongoose'),
	File = mongoose.model('File'),
	path = require('path'),
	config = require('../config/config'),
	media = require('./media'),
	easyimg = require('easyimage');

var tmpDir = path.normalize(config.root + '/tmp/');
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
	//console.log(req);

	if(!req.files){
		console.log("Error : No File");
		cb('No Files');
		return;
	}		

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


exports.upstream = function(req, res) {
	
	//console.log(req);
	//console.log(req.query);
  	// The filename is simple the local directory and tacks on the requested url
  	var tmpfile = tmpDir + req.query.flowFilename;
    var destfile = uploadDir + req.query.flowFilename;

	//var rstream = fs.createReadStream(rfile, {flags:'w', bufferSize: 64 * 1024 });
    var wstream = fs.createWriteStream(tmpfile);
	
	res.writeHead(200);
	//res.write(tmpfile, wstream);

	req.pipe(wstream);
  
	var fileSize = req.headers['content-length'];
 	var ubytes = 0 ;

	req.on('data',function(d) {
		ubytes += d.length;
		var p = (ubytes/fileSize) * 100;
		rstream.pipe(wstream).pipe(res);
		res.write("Uploading " + parseInt(p)+ " %\n");
	});

	req.on('end',function(){
 		res.end("File Upload Complete");
 	});

	/*
    rstream.on('readable', function () {
		var chunk;
		while (null !== (chunk = rstream.read())) {
		    console.log('got %d bytes of data', chunk.length);
		}
	  	//rstream.pipe(wstream).pipe(res);
    });

    rstream.on('error', function (err) {
    	console.log(err);
    	rstream.close();
    	var cb = function(err, dir){
    		res.json({msg:'Creating Temp Dir'});
    	};
    	getAddDir(tmpDir,cb);
    });

*/
}



/**
 * Get / Make Upload Dir
 * Handle Upload
 */
exports.upload = function(req, res) {
	
	//console.log(req);

	async.waterfall([
		function(cb) {
			// Add dir(files) if none
			getAddDir(uploadDir, cb);
		}, function(uploadDir, cb) {
			// Add dir per image style
			async.eachSeries(imgStyles, function(item, _cb) {
				var dir = path.normalize(uploadDir + item + '/');
				getAddDir(dir, _cb);
			}, function(err) {
				cb(null, imgStyles);
			});

		}, function(imgStyles, cb) {
			// Write file
			handleUpload(req, res, cb);

		}, function(name, ext, cb) {
			// Create Thumbnail & todo image styles
			media.createThumb(name, ext, cb);
		}, function(name, ext, cb) {
			// Add DB referance of files
			addFile(name, ext, cb);
	}], function(err, result) {
		// Results 
		//console.log('result', result);
		res.json(result);
	});
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