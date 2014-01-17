'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
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