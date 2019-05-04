const vendorController = require('../controllers/vendor');
const router = require('express').Router();

// routes list
router.post('/signup', vendorController.Create);

module.exports = router;
