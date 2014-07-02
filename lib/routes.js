'use strict';

var api = require('./controllers/api'),
    index = require('./controllers'),
    users = require('./controllers/users'),
    session = require('./controllers/session'),
    middleware = require('./middleware'),
    contact = require('./controllers/contact'),
    articles = require('./controllers/articles'),
    file = require('./controllers/file'),
    trees = require('./controllers/trees'),
    passport = require('passport');

/**
 * Application routes
 */
module.exports = function(app) {

  app.get('/*', function(req, res, next) {
    if (req.headers.host.match(/^www\./) != null) {
      res.redirect("http://" + req.headers.host.slice(4) + req.url, 301);
    } else {
      next();
    }
  });

  // Server API Routes
  app.route('/api/awesomeThings')
    .get(api.awesomeThings);
    
  //app.get('/api/work', api.work);
  //app.get('/api/hazards/:nid', api.hazards);

  app.route('/api/users')
    .post(users.create)
    .put(users.changePassword);
  app.route('/api/users/me')
    .get(users.me);
  app.route('/api/users/:id')
    .get(users.show);


  app.route('/api/session')
    .post(session.login)
    .delete(session.logout);

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
  app.route('/contact')
    .post(contact.send);

  // Media
  app.route('/api/files')
    .get(file.all)
    .delete(file.remove);

  app.post('/api/files/rebuild', file.rebuild);

  // Upload 
  app.route('/api/upload')
    .post(file.upload);
  // Handle status checks on chunks through Flow.js

  app.route('/api/upstream')
    .get(file.upstream);



  // Trees
  app.route('/api/trees')
    .get(trees.all)
    .post(trees.create);

  app.route('/api/trees/:treeid')
    .get(trees.get)
    .put(trees.update)
    .delete(trees.destroy);

  app.param('treeid', trees.tree);




  //Article Routes CRUD
  app.route('/api/articles')
    .get(articles.all)
    .post(articles.create);

  app.route('/api/articles/:articleId')
    .get(articles.show)
    .put(articles.update)
    .delete(articles.destroy);

  app.param('articleId', articles.article);

  // All undefined api routes should return a 404
  app.route('/api/*')
    .get(function(req, res) {
      res.send(404);
    });

  // All other routes to use Angular routing in app/scripts/app.js
  app.route('/partials/*')
    .get(index.partials);
  app.route('/*')
    .get( middleware.setUserCookie, index.index);

  
};