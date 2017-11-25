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
  userController.sanitizeData,
  authController.signup
);
*/
router.get('/login', userController.showLogin);
router.post(
  '/login',
  userController.sanitizeData,
  authController.login
);

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
router.get(
  '/listing/:id/edit',
  authController.isLoggedIn,
  catchErrors(listingController.editListing)
);
router.post(
  '/create-listing/:id',
  authController.isLoggedIn,
  userController.validateListing,
  userController.sanitizeData,
  catchErrors(listingController.updateListing)
);


router.get('/explore', catchErrors(listingController.showExplore));
router.post(
  '/explore',
  userController.sanitizeData,
  catchErrors(listingController.getListingsByNameOrDescription)
);


// TODO: Change to POST request for enhanced security
router.post(
  '/delete-listing',
  authController.isLoggedIn,
  userController.sanitizeData,
  catchErrors(listingController.deleteListing)
);

// search API
// http://localhost:3000/api/search/?q=
router.get(
  '/api/search/',
  userController.sanitizeData,
  catchErrors(listingController.searchListings)
);

router.get('/logout', authController.logout);

// TODO: comment out route
router.get('/seed', catchErrors(listingController.seedDB));

module.exports = router;