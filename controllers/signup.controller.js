const db        = require('../services/db.service');
const User      = require('../models/user.model');
const validator = require('validator');

module.exports = function(req, res, next) {

  let newUser = new User({
    username: validator.escape(req.body['username']),
    email: validator.escape(req.body['email']),
    password: validator.escape(req.body['password'])
  });

  let validationErrors = [];

  User.create(newUser, (err, user) => {
    if(err) {
      Object.keys(err['errors']).forEach(key => {
        validationErrors.push(err['errors'][key]['message'])
      });
      req.flash('error', [...validationErrors]);
      return res.redirect('/signup');
    }
    return next();
  });
}