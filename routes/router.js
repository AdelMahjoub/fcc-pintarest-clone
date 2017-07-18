const express    = require('express');
const bodyParser = require('body-parser');
const passport   = require('passport');

const db    = require('../services/db.service');
const User  = require('../models/user.model');
const Image = require('../models/image.model');

const router = express.Router();

const signup      = require('../controllers/signup.controller');
const addImage    = require('../controllers/add-image.controller');
const dashboard   = require('../controllers/dashboard.controller');
const deleteImage = require('../controllers/dashboard-delete-image.controller');
const home        = require('../controllers/home.controller');

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));

router.use((req, res, next) => {
  res.locals.images = [];
  res.locals.myApp = {
    name: 'Pintarest clone',
    user: req.user,
    errors: req.flash('error'),
    infos: req.flash('info'),
  }
  next();
});

//===========================
//         GET ROUTES 
//===========================
router.get('/', home);

router.get('/dashboard', dashboard);

router.get('/dashboard/delete/:id', deleteImage);

router.get('/login', (req, res, next) => {
  res.render('login');
});
  
router.get('/signup', (req, res, next) => {
  res.render('signup');
});

router.get('/auth/twitter' ,passport.authenticate('twitter'));

router.get('/auth/twitter/callback', passport.authenticate('twitter', {
  successRedirect: '/dashboard',
  failureFlash: 'Error while twitter auth',
  failureRedirect: '/login',
}));
  
router.get('/logout', (req, res, next) => {
  req.logout();
  res.redirect('/');
});

router.get('*', (req, res, next) => {
  res.render('page-not-found');
});

//===========================
//        POST ROUTES
//===========================
router.post('/signup', signup,
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password'
  }));

router.post('/login', 
  passport.authenticate('local', {
    successRedirect: '/dashboard',
    failureRedirect: '/login',
    failureFlash: 'Invalid username or password'
  }));

router.post('/add-image', addImage);

router.use((err, req, res, next) => {
  console.log(err);
  res.redirect('/');
});

module.exports = router;