const passport = require('passport');
require('../handlers/passportConfig.js')(passport);


exports.signup = passport.authenticate('local-signup', {
  successRedirect: '/profile',
  failureRedirect: '/signup'
});


exports.login = passport.authenticate('local-login', {
  successRedirect: '/profile',
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

