/**
 * config file for passport.js
 */

// load dependencies
const User = require('../models/User');
const LocalStrategy = require('passport-local').Strategy;


module.exports = (passport) => {
  /**
   * for persistent login sessions
   * passport needs ability to serialize and unserialize users out of session
   */

  // serialize user for the session
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  // deserialize user
  passport.deserializeUser((id, done) => {
    User.findById(id, (err, user) => {
      done(err, user);
    });
  });

  // strategy for local signup
  passport.use('local-signup', new LocalStrategy({
    passReqToCallback: true
  }, async (req, username, password, done) => {
    // User.findOne wont fire unless data is sent back
    process.nextTick(() => {
      // check if user username already exists in DB
      User.findOne({ 'local.username': username }, async (err, existingUser) => {
        if (err) {
          return done(err);
        }

        if (existingUser) {
          // username exists in DB
          return done(null, false, req.flash('signupMessage', 'That username already exists'));
        }

        /**
         * check if the user is already logged in
         * user is logged in; use exisiting account details
         * else create entirely new user
         */
        const localUser = req.user ? req.user : new User();
        localUser.local.username = username;
        localUser.local.password = localUser.generateHash(password);
        try {
          await localUser.save();
          return done(null, localUser, req.flash('message', 'Local account signup successful'));
        } catch (e) {
          console.error(e);
        }

        // function gets here means local signup failed
        return done(null, false, req.flash('message', 'local account signup failed'));
      });
    });
  }));


  // local strategy for login
  passport.use('local-login', new LocalStrategy({
    passReqToCallback: true
  }, (req, username, password, done) => {
    process.nextTick(() => {
      // check if username exists
      User.findOne({ 'local.username': username }, (err, user) => {
        if (err) {
          return done(err);
        }

        // wrong username
        if (!user) {
          return done(null, false, req.flash('loginMessage', 'Username is incorrect'));
        }

        // wrong password
        if (!user.validPassword(password)) {
          return done(null, false, req.flash('loginMessage', 'Password is incorrect'));
        }

        // login successful
        return done(null, user, req.flash('success', 'You are now logged in'));
      });
    });
  }));
};
