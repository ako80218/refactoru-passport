var passport = require('passport');
var FacebookStrategy = require('passport-facebook'). Strategy;
var UserModel = require('../models/userModel');
passport.serializeUser(function(user, done){
    done(null, user._id);

});
passport.deserializeUser(function(userid, done){
    UserModel.findOne({_id: userid}, function(err, user){
        done(err,user);
    })

});
var facebookStrategy = new FacebookStrategy({
    clientID: '294298964053213',
    clientSecret: '410ef9014618dd3c452e36df2557ede8',
    callbackURL: 'http://localhost:3000/facebook/callback'
}, function(accessToken, refreshToken, profile, done){
    console.log(accessToken, refreshToken, profile);
    UserModel.findOne({userid: profile.id}, function(err, user){
        if (user){
            return done(err, user);
        }

        var newUser = new UserModel({
            userId: profile.id,
            userName: profile.username,
            profile: profile
        });
        newUser.save(function(err, doc){
            return done(err, doc);
        });
    });

});
passport.use(facebookStrategy);