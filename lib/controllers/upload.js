

var fs = require('fs');


exports.file = function(req,res) {

	console.log(req.files);

	  fs.stat('/upload', function (err, stats) {
	    if (err) 
	    	console.log(err);
	    //fs.mkdir(path, [mode], callback)
	    console.log('stats: ' + JSON.stringify(stats));
	  });

}