'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    http = require('http'),
    Work = mongoose.model('Work');

/**
 * Get awesome things
 */
exports.awesomeThings = function(req, res) {
  return Thing.find(function (err, things) {
    if (!err) {
      return res.json(things);
    } else {
      return res.send(err);
    }
  });
};

/**
 * Get awesome things
 */
exports.work = function(req, res) {
  return Work.find(function (err, work) {
    if (!err) {
      return res.json(work);
    } else {
      return res.send(err);
    }
  });
};



exports.hazards = function(req, res) {

  var _res = res;

  var nid = req.body.nid || 'all';


  var options = {
    host: 'drupal8.nightrecon.com',
    port: 80,
    method: 'GET',
    path: '/api/hazards/'+nid,
    headers: {
       'Accept': 'application/hal+json'
    }
  };

  var req = http.get(options, function(res) {
    
    console.log('STATUS: ' + res.statusCode);
    //console.log('HEADERS: ' + JSON.stringify(res.headers));
    res.setEncoding('utf8');

    var output = '';
    res.on('data', function (chunk) {
      output += chunk;
    });

    res.on('end', function() {
      //console.log(output);
      return _res.json(JSON.parse(output));
    });

  });

  req.on('error', function(e) {
    console.log('problem with request: ' + e.message);
  });

  req.end();

}