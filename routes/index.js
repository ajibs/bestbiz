const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');


router.get('/', (req, res) => {
  res.send('hello world');
});

/*
router.get('/signup', userController.showSignup);
router.post(
  '/signup',
  authController.validateSignup,
  authController.signup
);
*/

router.get('/login', userController.showLogin);
router.post('/login', authController.login);

router.get(
  '/profile',
  authController.isLoggedIn,
  userController.showProfile
);

router.get('/logout', authController.logout);

module.exports = router;