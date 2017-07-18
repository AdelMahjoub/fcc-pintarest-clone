const passport      = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const db = require('../../services/db.service');
const User = require('../../models/user.model');

module.exports = function() {

  passport.use('local', new LocalStrategy(
    function(username, password, done) {
      User.findOne({username: username}, (err, user) => {
        if(err) {
          return done(err);
        }
        if(!user) {
          return done(null, false);
        }
        user.comparePasswords(password, user.password, (err, isMatch) => {
          if(err) {
            return done(err);
          }
          if(!isMatch) {
            return done(null, false);
          }
          return done(null, user);
        });
      });
    }
  ));

  passport.serializeUser(function(user, done) {
  done(null, user._id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});

}

