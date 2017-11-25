const passport = require('passport');
require('../handlers/passportConfig.js')(passport);


exports.signup = passport.authenticate('local-signup', {
  successRedirect: '/dashboard',
  failureRedirect: '/signup'
});


exports.login = passport.authenticate('local-login', {
  successRedirect: '/dashboard',
  failureRedirect: '/login'
});


exports.isLoggedIn = (req, res, next) => {
  // first check if the user is authenticated
  if (!req.isAuthenticated()) {
    req.flash('error', 'You must be logged in to do that');
    res.redirect('/login');
    return;
  }

  next(); // carry on! user is logged in
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


exports.logout = (req, res) => {
  req.logout();
  req.flash('success', 'You are now logged out');
  res.redirect('/');
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
