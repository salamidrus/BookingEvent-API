// setting prerequisite for passport and its strategies
const passport = require('passport'),
  LocalStrategy = require('passport-local').Strategy,
  jwtStrategy = require('passport-jwt').Strategy,
  { ExtractJwt } = require('passport-jwt');

// JWT Secret key
const { JWT_SECRET } = process.env;

// import Schema
const Vendor = require('../models/vendor'),
  hrAccount = require('../models/hrAccount');

// JWT Strategy
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      secretOrKey: JWT_SECRET
    },
    function(jwt_payload, done) {
      Vendor.findOne({ id: jwt_payload.sub }, function(err, user) {
        if (err) {
          return done(err, false);
        }
        if (user) {
          return done(null, user);
        } else {
          return done(null, false);
        }
      });
    }
  )
);
// Vendor Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      Vendor.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.verifyPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);

// HR Account Strategy
passport.use(
  new LocalStrategy(
    {
      usernameField: 'email'
    },
    function(email, password, done) {
      hrAccount.findOne({ email: email }, function(err, user) {
        if (err) {
          return done(err);
        }
        if (!user) {
          return done(null, false, { message: 'Incorrect username.' });
        }
        if (!user.validPassword(password)) {
          return done(null, false, { message: 'Incorrect password.' });
        }
        return done(null, user);
      });
    }
  )
);
