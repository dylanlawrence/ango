'use strict';

var api = require('./controllers/api'),
  index = require('./controllers'),
  users = require('./controllers/users'),
  session = require('./controllers/session'),
  contact = require('./controllers/contact'),
  articles = require('./controllers/articles'),
  upload = require('./controllers/upload'),
  passport = require('passport'),
  middleware = require('./middleware');

/**
 * Application routes
 */
module.exports = function(app, auth) {

  app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^www\./) != null) {
      res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
    } else {
      next();
    }
  });

  // Server API Routes
  app.get('/api/awesomeThings', api.awesomeThings);
  app.get('/api/work', api.work);

  app.post('/api/users', users.create);
  app.put('/api/users', users.changePassword);
  app.get('/api/users/me', users.me);
  app.get('/api/users/all', users.getAll);
  app.get('/api/users/:id', users.show);

  app.post('/api/session', session.login);
  app.del('/api/session', session.logout);

  //Setting the facebook oauth routes
  app.get('/auth/facebook', passport.authenticate('facebook', {
    scope: ['email', 'user_about_me'],
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/facebook/callback', passport.authenticate('facebook', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the twitter oauth routes
  app.get('/auth/twitter', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/twitter/callback', passport.authenticate('twitter', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the google oauth routes
  app.get('/auth/google', passport.authenticate('google', {
    failureRedirect: '/signin',
    scope: ['https://www.googleapis.com/auth/userinfo.profile', 'https://www.googleapis.com/auth/userinfo.email']
  }), users.signin);

  app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: '/signin'
  }), users.authCallback);

  //Setting the github oauth routes
  app.get('/auth/github', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.signin);

  app.get('/auth/github/callback', passport.authenticate('github', {
    failureRedirect: '/signin'
  }), users.authCallback);


  // Contact
  app.post('/contact/send', contact.send);


  app.post('/upload', upload.file);


  //Article Routes CRUD
  app.get('/api/articles', articles.all);
  app.post('/api/articles', auth.requiresLogin, articles.create);
  app.get('/api/articles/:articleId', articles.show);
  app.put('/api/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
  app.del('/api/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);
  //Finish with setting up the articleId param
  app.param('articleId', articles.article);

/*
  //Article Routes CRUD
  app.get('/api/articles', articles.all);
  app.post('/api/articles', auth.requiresLogin, articles.create);
  app.get('/api/articles/:articleId', articles.show);
  app.put('/api/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.update);
  app.del('/api/articles/:articleId', auth.requiresLogin, auth.article.hasAuthorization, articles.destroy);
  //Finish with setting up the articleId param
  app.param('articleId', articles.article);
*/





  // All other routes to use Angular routing in app/scripts/app.js
  app.get('/partials/*', index.partials);
  app.get('/*', middleware.setUserCookie, index.index);
};