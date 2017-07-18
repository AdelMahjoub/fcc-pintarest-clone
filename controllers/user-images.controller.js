const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

module.exports = function(req, res, next) {
  let userId = req.params['id'];
  Image.find({owner: userId})
    .populate({
      path: 'owner',
      select: {__v: 0, password: 0, email: 0}
    })
    .exec((err, images) => {
      if(err) {
        req.flash('error', 'Unexpected errors, please try again');
        return res.render('user-wall', { images: [] });
      }
      if(!images) {
        req.flash('info', 'No images');
        return res.render('user-wall', { images: [] });
      }
      res.render('user-wall', { images: images });  
    });
}