const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

module.exports = function(req, res, next) {
  if(!req.user) {
    req.flash('error', 'Login to access your dashboard');
    return res.redirect('/login');
  }
  Image.find({owner: req.user['_id']})
    .populate({
      path: 'owner',
      select: {__v: 0, password: 0, email: 0}
    })
    .exec((err, images) => {
      if(err) {
        req.flash('error', 'Unexpected errors, please try again');
        return res.render('dashboard', { images: [] });
      }
      if(!images) {
        req.flash('info', 'Let\'s add some images !');
        return res.render('dashboard', { images: [] });
      }
      res.render('dashboard', { images: images });  
    });
}