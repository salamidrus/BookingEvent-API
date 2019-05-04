// authorization
const auth = require('../middleware/auth').isAuthenticated;

// import modules
const vendorController = require('../controllers/vendor');
const router = require('express').Router();
const eventController = require('../controllers/event');

// routes list
router.post('/signup', vendorController.Create);
router.post('/create', auth, eventController.Create);
router.get('/getall', auth, eventController.GetAll);

module.exports = router;
