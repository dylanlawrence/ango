'use strict';

var mongoose = require('mongoose'),
    Tree = mongoose.model('Tree'),
    passport = require('passport'),
    _ = require('lodash');

/**
 * Find tree by id
 */
exports.tree = function(req, res, next, id) {
    Tree.load(id, function(err, tree) {
        if (err) return next(err);
        if (!tree) return next(new Error('Failed to load tree ' + id));
        req.tree = tree;
        next();
    });
};


/**
 * Show an tree
 */
exports.get = function(req, res) {
    res.jsonp(req.tree);
};

/**
 * List of trees
 */
exports.all = function(req, res) {
    Tree.find({}).exec(function(err, trees) {
        if (err) {
            res.render('error', {
                status: 500
            });
        } else {
            res.jsonp(trees);
        }
    });    
};

/**
 * Create a tree
 */
exports.create = function(req, res) {

    var tree = new Tree(req.body);
    tree.user = req.user;

    tree.save(function(err) {
        if (err) {
            return res.send('/login', {
                errors: err.errors,
                tree: tree
            });
        } else {
            res.jsonp(tree);
        }
    });
};

/**
 * Update a tree
 */
exports.update = function(req, res) {
    var tree = req.tree;    
    tree = _.extend(tree, req.body);

    tree.save(function(err) {
        if (err) {
            return res.send('/login', {
                errors: err,
                tree: tree
            });
        } else {
            console.log("Tree Saved - " + tree);
            res.jsonp(tree);
        }
    });
};


/**
 * Chop a tree
 */
exports.destroy = function(req, res) {
    var tree = req.tree;

    tree.remove(function(err) {
        if (err) {
            return res.send('/login', {
                errors: err.errors,
                tree: tree
            });
        } else {
            res.jsonp(tree);
        }
    });
};