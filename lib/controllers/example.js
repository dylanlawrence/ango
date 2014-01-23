'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
    Example = mongoose.model('Example'),
    _ = require('lodash'),
    upload = require('./upload');


/**
 * Find example by id
 */
exports.example = function(req, res, next, id) {

    Example.load(id, function(err, example) {
        if (err) return next(err);
        if (!example) return next(new Error('Failed to load example ' + id));
        req.example = example;
        next();
    });

};

/**
 * Create a example
 */
exports.create = function(req, res) {

    var example = new Example(req.body);
    example.user = req.user;

    example.save(function(err) {
        if (err) {
            return res.send('/login', {
                errors: err.errors,
                example: example
            });
        } else {
            res.jsonp(example);
        }
    });
};

/**
 * Update a example
 */
exports.update = function(req, res) {
      
    var example = req.example;    
    example = _.extend(example, req.body);
    
    example.save(function(err) {
        if (err) {
            console.log("Error -" + err);
            return res.send('/login', {
                errors: err,
                example: example
            });
        } else {
            console.log("Example Saved - " + example);
            res.jsonp(example);
        }
    });

};

/**
 * Delete an example
 */
exports.destroy = function(req, res) {
    var example = req.example;

    example.remove(function(err) {
        if (err) {
            return res.send('/login', {
                errors: err.errors,
                example: example
            });
        } else {
            res.jsonp(example);
        }
    });
};

/**
 * Show an example
 */
exports.show = function(req, res) {
    res.jsonp(req.example);
};

/**
 * List of Examples
 */
exports.all = function(req, res) {

    Example.find().sort('-created').populate('user', 'name username').exec(function(err, examples) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(examples);
        }
    });
    
};