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


exports.showProfile = (req, res) => {
  res.render('profile', {
    title: 'Profile'
  });
};
