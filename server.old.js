'use strict';

var express = require('express'),
    path = require('path'),
    fs = require('fs'),
    http = require('http'),
    mongoose = require('mongoose');

/**
 * Main application file
 */

// Default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Application Config
var config = require('./lib/config/config'),
	auth = require('./lib/config/authorization');

// Connect to database
var db = mongoose.connect(config.mongo.uri, config.mongo.options);

// Bootstrap models
var modelsPath = path.join(__dirname, 'lib/models');
fs.readdirSync(modelsPath).forEach(function (file) {
  require(modelsPath + '/' + file);
});

// 	Populate empty DB with sample data
require('./lib/config/dummydata');

// Passport Configuration
require('./lib/config/passport')();

var app = express(),
  server = http.createServer(app),
  io = require('socket.io').listen(server);

// messenger
var messages = [];
require('./lib/controllers/messenger')(io, messages);

// Express settings
require('./lib/config/express')(app);

// Routing
require('./lib/routes')(app, auth);

// Start server
server.listen(config.port, function () {
  console.log('Express server listening on port %d in %s mode', config.port, app.get('env'));
});

// Expose app
exports = module.exports = app;