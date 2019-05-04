// passport config
require('../middleware/passport');

// import modules
const vendorController = require('../controllers/vendor');
const router = require('express').Router();
const passport = require('passport');
const passportVendor = passport.authenticate('vendor', { session: false });
const passportJWT = passport.authenticate('jwt', { session: false });

// routes list
router.post('/signup', vendorController.Create);

module.exports = router;
