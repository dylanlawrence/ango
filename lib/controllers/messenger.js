'use strict';
var mongoose = require('mongoose'),
  User = mongoose.model('User');
module.exports = function(io, auth, messages) {
  if (auth.requiresLogin) {
    io.sockets.on('connection', function(socket) {
      socket.broadcast.emit('user:connected');
      socket.emit('news', {
        hello: 'world'
      });
      socket.on('my other event', function(data) {
        //console.log(data);
      });
      socket.on('send:message', function(data) {
        console.log(messages);
        messages.push(data);
      });
      socket.on('disconnect', function() {
        socket.broadcast.emit('user:disconnected');
      });
    });
  }
};