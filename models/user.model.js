const db        = require('../services/db.service');
const validator = require('validator');
const bcrypt    = require('bcrypt-nodejs');

const UserSchema = db.Schema({
  username: {
    type: String,
    required: 'The username is required',
    unique: true,
    validate: [
      {
        validator: function(value) {
          return value.length >= 4;
        },
        msg: 'The username minimum length 4 characters'
      },
      {
        validator: function(value) {
          var patt = /^[a-zA-Z0-9_-]+$/;
          return patt.test(value);
        },
        msg: `The username should not contain special characters`
      },
      {
        isAsync: true,
        validator: function(value, respond) {
          if(this.username && !this.isModified('username')) {
            respond(true);
          }
          User.findOne({username: value}, (err, doc) => {
            if(err) {
              console.log('Unexpected error while validating username: ' + err);
              respond(false);
            }
            respond(!Boolean(doc));
          });
        },
        msg: 'This username is already registred'
      }
    ]
  },
  email: {
    type: String,
    unique: true,
    validate: [
      {
        validator: function(value) {
          return validator.isEmail(value);
        },
        msg: 'Invalid email'
      },
      {
        isAsync: true,
        validator: function(value, respond) {
          if(this.email && !this.isModified('email')) {
            respond(true);
          }
          User.findOne({email: value}, (err, doc) => {
            if(err) {
              console.log('Unexpected error while validating email: ' + err);
              respond(false);
            }
            respond(!Boolean(doc));
          });
        },
        msg: `This email is already registred`
      }
    ]
  },
  password: {
    type: String,
    required: 'The Password is required',
    validate: {
      validator: function(value) {
        return value.length >= 6;
      },
      msg: 'The password should have at least 6 characters'
    }
  },
  twitterId: {
    type: String
  }
});

UserSchema.pre('save', function(next) {
  let user = this;
  if(!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(10, function(err, salt) {
    if(err) return next();
    bcrypt.hash(user.password, salt, ()=>{}, function(err, hashed) {
      if(err) return next();
      user.password = hashed;
      return next();
    });
  });
});

UserSchema.methods.comparePasswords = function(guess, password, callback) {
  bcrypt.compare(guess, password, function(err, isMatch) {
    return callback(err, isMatch);
  });
}

const User = db.model('User', UserSchema);

module.exports = User;