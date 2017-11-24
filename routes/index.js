const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');
const listingController = require('../controllers/listingController');
const { catchErrors } = require('../handlers/errorHandlers');


router.get('/', catchErrors(listingController.showHome));

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
  authController.isLoggedIn,
  userController.validateListing,
  userController.sanitizeData,
  catchErrors(listingController.addNewListing)
);


router.get('/listing/:id', catchErrors(listingController.showSingleListing));

router.get('/explore', listingController.showExplore);
router.post('/explore', catchErrors(listingController.searchListings));

router.get('/logout', authController.logout);

router.get('/seed', listingController.seedDB);

module.exports = router;