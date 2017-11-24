const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');


router.get('/', (req, res) => {
  res.send('hello world');
});

router.get('/signup', userController.showSignup);

router.get('/login', userController.showLogin);


module.exports = router;