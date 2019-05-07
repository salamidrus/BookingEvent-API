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
router.put('/event/update/:id', auth, eventController.Update);
router.delete('/event/delete/:id', auth, eventController.Delete);
router.get('/booking', auth, bookingController.GetbyVendorId);
router.put('/booking/:id', auth, bookingController.UpdateStatus);

module.exports = router;
