const createDOMPurify = require('dompurify');
const { JSDOM } = require('jsdom');

const { window } = (new JSDOM(''));
const DOMPurify = createDOMPurify(window);
const Business = require('../models/Business');

exports.showSignup = (req, res) => {
  res.render('signup', {
    title: 'Signup'
  });
};


exports.showLogin = (req, res) => {
  res.render('login', {
    title: 'Login'
  });
};


exports.showProfile = async (req, res) => {
  const listings = await Business.find();
  res.render('profile', {
    title: 'Profile',
    listings
  });
};


exports.validateSignup = (req, res, next) => {
  req.checkBody('username', 'You must supply a name!').notEmpty();
  req.sanitizeBody('username');
  req.checkBody('password', 'Password cannot be blank').notEmpty();

  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('signup', {
      title: 'Signup',
      flashes: req.flash()
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};


exports.validateListing = (req, res, next) => {
  req.checkBody('name', 'You must supply a name!').notEmpty();
  req.checkBody('email', 'That Email is not valid!').isEmail();
  req.sanitizeBody('name');
  req.sanitizeBody('email').normalizeEmail({
    remove_dots: false,
    remove_extension: false,
    gmail_remove_subaddress: false
  });
  req.checkBody('description', 'Description cannot be blank!').notEmpty();
  req.checkBody('website', 'Website cannot be blank').notEmpty();
  req.checkBody('phone', 'Phone cannot be blank').notEmpty();
  req.checkBody('address', 'Address cannot be blank').notEmpty();


  const errors = req.validationErrors();
  if (errors) {
    req.flash('error', errors.map(err => err.msg));
    res.render('create-listing', {
      title: 'Create Listing',
      body: req.body,
      flashes: req.flash()
    });
    return; // stop the fn running
  }
  next(); // there were no errors
};


exports.sanitizeData = (req, res, next) => {
  if (req.query.q) {
    req.body = req.query;
  }

  Object.keys(req.body).forEach((key) => {
    req.body[key] = DOMPurify.sanitize(req.body[key]);
  });

  next();
};

exports.clean = data => DOMPurify.sanitize(data);
