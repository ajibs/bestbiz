const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const listingController = require('../controllers/listingController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', (req, res) => {
  res.send('hello world');
});

/*
router.get('/signup', userController.showSignup);
router.post(
  '/signup',
  userController.validateSignup,
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

router.get(
  '/create-listing',
  authController.isLoggedIn,
  listingController.showListingForm
);
router.post(
  '/create-listing',
  userController.validateListing,
  userController.sanitizeData,
  catchErrors(listingController.addNewListing)
);

router.get('/logout', authController.logout);


module.exports = router;