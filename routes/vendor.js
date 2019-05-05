// authorization
const auth = require('../middleware/auth').isAuthenticated;

// import modules
const router = require('express').Router();

// import controllers
const vendorController = require('../controllers/vendor');

const eventController = require('../controllers/event');

const bookingController = require('../controllers/booking');

// routes list
router.post('/signup', vendorController.Create);
router.post('/create', auth, eventController.Create);
router.get('/event/getevents', auth, eventController.GetAll);
router.get('/event/get/:id', auth, eventController.GetById);
router.get('/event/getbyid', auth, eventController.GetByIdVendor);
router.get('/booking', auth, bookingController.GetbyVendorId);

module.exports = router;
