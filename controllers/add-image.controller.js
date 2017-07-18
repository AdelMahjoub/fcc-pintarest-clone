const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

module.exports = function(req, res, next) {
  if(!req.user) {
    req.flash('error', 'Login to add images');
    return res.redirect('/login');
  }
  let newImage = new Image({
    url: req.body['imageUrl'],
    title: req.body['imageTitle'],
    owner: req.user['_id']
  });
  Image.create(newImage, (err, image) => {
    let validationErrors = [];
    if(err) {
      Object.keys(err['errors']).forEach(key => {
        validationErrors.push(err['errors'][key]['message'])
      });
      req.flash('error', [...validationErrors]);
      return res.redirect('/dashboard');
    }
    if(!image) {
      req.flash('error', 'Unexpected error, please try again');
      return res.redirect('/dashboard');
    }
    req.flash('info', 'Images updated');
    return res.redirect('/dashboard');
  });
}