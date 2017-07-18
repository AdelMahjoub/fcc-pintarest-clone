const passport        = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
const shortId         = require('shortid');
const util            = require('util');

const db = require('../../services/db.service');
const User = require('../../models/user.model');

module.exports = function() {
  passport.use('twitter', new TwitterStrategy({
    consumerKey: process.env.TWITTER_CONSUMER_KEY,
    consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
    callbackURL: 'http://localhost:3000/auth/twitter/callback'
  },
  function(token, tokenSecret, profile, done) {
    User.findOne({twitterId: profile['id']}, (err, user) => {
      if(err) {
        return done(err);
      }
      if(user) {
        return done(null, user);
      }
      let pass = shortId.generate();
      let newUser = new User({
        twitterId: profile['id'],
        username: profile['username'],
        password: pass
      });
      User.create(newUser, (err, doc) => {
        if(err) {
          return done(err);
        }
        return done(null, doc);
      });
    });
  }  
));
}