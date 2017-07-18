const db        = require('../services/db.service');
const validator = require('validator');

const ImageSchema = db.Schema({
  url: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        return validator.isURL(value);
      },
      msg: 'Not a valid Url'
    }
  },
  title: {
    type: String,
    required: true,
    validate: {
      validator: function(value) {
        var patt = /^[a-zA-Z0-9_-]/;
        return patt.test(value);
      },
      msg: 'Image title should not contain special characters'
    }
  },
  createdAt: {
    type: Date,
    default: new Date()
  },
  owner: {type: db.Schema.Types.ObjectId, ref: 'User'}
});

const Image = db.model('Image', ImageSchema);

module.exports = Image;