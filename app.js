
/**
 * Module dependencies.
 */

var express = require('express');

var http = require('http');
var path = require('path');
var indexController = require('./controllers/indexController.js');
var authController = require('./controllers/authController.js');
var passport = require('passport');
var passportConfig = require('./config/passport');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/passport-test');
//5317684465a9609e1ea49e3a
//531768d765a9609e1ea49e3b
//531768dc65a9609e1ea49e3c

var app = express();

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(express.cookieParser());
app.use(express.session({secret: 'password'}))
app.use(passport.initialize());
app.use(passport.session());
app.use(app.router);
app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.get('/', 
    authController.ensureAuthenticated,
    indexController.index);
app.get('/login', authController.login);
app.get('/login/facebook', passport.authenticate('facebook'));
app.get(
    '/facebook/callback', 
    passport.authenticate('facebook', {failureRedirect: '/login'}),
    authController.loginSuccess
);
app.get('/logout', authController.logout);


http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
