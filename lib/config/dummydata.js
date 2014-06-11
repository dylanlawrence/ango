'use strict';

var mongoose = require('mongoose'),
  User = mongoose.model('User'),
  Work = mongoose.model('Work'),
  Thing = mongoose.model('Thing'),
  _ = require('lodash');

/**
 * Populate database with sample application data
 */

//Clear old things, then add things in
Thing.find({}).remove(function() {
  Thing.create({
    name : 'HTML5 Boilerplate',
    info : 'HTML5 Boilerplate is a professional front-end template for building fast, robust, and adaptable web apps or sites.',
    awesomeness: 10
  }, {
    name : 'AngularJS',
    info : 'AngularJS is a toolset for building the framework most suited to your application development.',
    awesomeness: 10
  }, {
    name : 'Karma',
    info : 'Spectacular Test Runner for JavaScript.',
    awesomeness: 10
  }, {
    name : 'Express',
    info : 'Flexible and minimalist web application framework for node.js.',
    awesomeness: 10
  }, {
    name : 'MongoDB + Mongoose',
    info : 'An excellent document database. Combined with Mongoose to simplify adding validation and business logic.',
    awesomeness: 10
  }, function() {
      console.log('finished populating things');
    }
  );
});

Work.find({}).remove(function() {
  Work.create({
    title : 'Portfolio item 01',
    content : ''
    }, {
    title : 'Portfolio item 02',
    content : 'Proin sapien ipsum, porta a, auctor quis, euismod ut, mi. Fusce convallis metus id felis luctus adipiscing.'
    }, function() {
      console.log('finished populating work items.');
    }
  );
});


// Clear old users, then add a default user
/*
User.find({}).remove(function() {
  User.create({
    provider: 'local',
    name: 'Test User',
    email: 'test@test.com',
    password: 'test'
  }, function() {
      console.log('finished populating users');
    }
  );
});
*/


User.find({admin:true}).exec(function(err, users) {
    console.log(users);
    if(_.some(users)){
      console.log(users);
    }else{
      console.log("Creating Admin");
      User.create({
        provider: 'local',
        name: 'Admin',
        email: 'admin@admin.com',
        password: 'password',
        admin:true,
        role:["administrator"]
      }, function() {
          console.log("Created Admin");
        }
      );
    }
});