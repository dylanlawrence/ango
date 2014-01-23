
var fs 		= require('fs'),
	async 	= require('async'),
	mongoose = require('mongoose'),
	File = mongoose.model('File'),
	config 	= require('../config/config'),
	easyimg = require('easyimage');


/**
 * Stat exists? then Get / Create Upload Directory
 */
uploadDir = function(callback){

	fs.stat(config.filesystem.upload, function(err, stats) {
		if (err) {
			if (err.code == 'ENOENT') {
				fs.mkdir(config.filesystem.upload, 0777, function(){

					fs.mkdir(config.filesystem.upload + 'thumb/', 0777, function(){
						callback(null, config.filesystem.upload);	
					});
				});
			}
		}else{
			callback(null, config.filesystem.upload);
			return;
		}
	});
}


handleUpload = function(req, res, cb){

	fs.readFile(req.files.file.path, function (err, data) {

		var imgName = req.files.file.name
		if(!imgName){
			console.log("There was an error")
			res.redirect("/");
			res.end();
		} else {
		  var newPath = config.filesystem.upload + imgName;

		  fs.writeFile(newPath, data, function (err) {
				cb(null, newPath);
				createThumb(newPath, imgName);
		  });
		}
	});
}

createThumb = function(srcPath,imgName){

  	var opt = { src:srcPath, 
  				dst: config.filesystem.upload + 'thumb/' + imgName,
     			width:200, height:200,
     			cropwidth:128, cropheight:128,
     			x:0, y:0 };
 
	easyimg.rescrop(opt,
		function(err, image) {
	     if (err) throw err;
	     console.log('Resized and cropped: ' + image.width + ' x ' + image.height);
	  	});

}



/**
 * Get / Make Upload Dir
 * Handle Upload 
 *
 */
 
exports.file = function(req, res) {

	async.parallel([
	    uploadDir,
		function (cb) {
        	handleUpload(req, res, cb);
	    },
	    function (cb) {
        	addFile(req, res, cb);
	    }
	],
	function(err, results){
    	res.json({'answer':'File transfer completed'});
		console.log(results);
	});

}