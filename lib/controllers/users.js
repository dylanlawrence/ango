'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
    passport = require('passport'),
    _ = require('lodash');

/**
 * Create user
 */
exports.create = function (req, res, next) {
  var newUser = new User(req.body);
  newUser.provider = 'local';

  newUser.save(function(err) {
    //console.log('errors',err);
    if (err) {
      // Manually provide our own message for 'unique' validation errors, can't do it from schema
      if(err.errors.email.type === 'Value is not unique.') {
        err.errors.email.type = 'The specified email address is already in use.';
      }
      return res.json(400, err);
    }

    req.logIn(newUser, function(err) {
      if (err) return next(err);
      return res.json(req.user.userInfo);
    });
  });
};



/**
 *  Get profile of specified user
 */
exports.show = function (req, res, next) {
  var userId = req.params.id;

  if(userId == 'all'){
    console.log(userId);
    getAll(req, res);
  }else{
    User.findById(userId, function (err, user) {
      if (err) return next(err);
      if (!user) return res.send(404);
      res.send({ profile: user.profile });
    });
  }
};

/**
 * Change password
 */
exports.changePassword = function(req, res, next) {
  var userId = req.user._id;
  var oldPass = String(req.body.oldPassword);
  var newPass = String(req.body.newPassword);

  User.findById(userId, function (err, user) {
    if(user.authenticate(oldPass)) {

      user.password = newPass;

      user.save(function(err) {
        if (err) return res.send(400);
        res.send(200);
      });
    } else {
      res.send(403);
    }
  });
};

exports.signin = function(req, res) {
    res.redirect('/login');
};
/**
 * Auth callback
 */
exports.authCallback = function(req, res) {
    res.redirect('/');
};


/**
 * Get current user
 */
exports.me = function(req, res) {
  res.json(req.user || null);
};

/**
 * List of Users
 */
function getAll(req, res) {
    User.find({}).exec(function(err, users) {
        if (err) {
            res.render('error', {status: 500});
        } else {
            res.jsonp(users);
        }
    });
}