// setting prerequisite for passport and its strategy
const passport = require('passport'),
  jwtStrategy = require('passport-jwt').Strategy,
  { ExtractJwt } = require('passport-jwt');

// JWT Secret key
const { JWT_SECRET } = process.env;

// import Schema
const Vendor = require('../models/vendor'),
  HrAccount = require('../models/hrAccount');

// JWT Strategy
passport.use(
  new jwtStrategy(
    {
      jwtFromRequest: ExtractJwt.fromHeader('Authorization'),
      secretOrKey: JWT_SECRET
    },
    function(jwt_payload, done) {
      const vendor = jwt_payload.role === 'vendor';
      const hrAccount = jwt_payload.role === 'hrAccount';
      if (vendor) {
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
      if (hrAccount) {
        HrAccount.findOne({ id: jwt_payload.sub }, function(err, user) {
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
    }
  )
);
