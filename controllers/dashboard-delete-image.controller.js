const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

module.exports = function(req, res, next) {
  if(!req.user) {
    req.flash('error', 'Login to delete images');
    return res.redirect('/login');
  }
  let id = req.params['id'];
  Image.findById(id, (err, doc) => {
    if(err) {
      req.flash('error', 'Unexpected error, please try again');
      return res.redirect('/dashboard');
    }
    if(!doc) {
      req.flash('info', 'Image not found');
      return res.redirect('/dashboard');
    }
    Image.remove({_id: id}, (err, removed) => {
      if(err || !removed) {
        req.flash('error', 'Unexpected error, please try again');
        return res.redirect('/dashboard');
      }
      req.flash('info', 'Images updated');
      return res.redirect('/dashboard');
    });
  });
}