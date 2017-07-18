const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

module.exports = function(req, res, next) {
  Image.find()
    .populate({
      path: 'owner',
      select: {__v: 0, password: 0, email: 0}
    })
    .sort('date')
    .exec((err, images) => {
      if(err || !images) {
        return res.render('index');
      }
      return res.render('index', {images: images})
    });
}