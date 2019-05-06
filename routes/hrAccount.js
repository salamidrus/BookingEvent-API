// import modules
const router = require('express').Router();

// import authorization
const auth = require('../middleware/auth').isAuthenticated;

// import controllers
const hrAccountController = require('../controllers/hrAccount');
const eventController = require('../controllers/event');
const bookingController = require('../controllers/booking');

// routes list
router.post('/signup', hrAccountController.Create);
router.get('/event/getevents', auth, eventController.GetAll);
router.get('/event/getevents/:id', auth, eventController.GetById);
router.get('/event/getgroupedevents', auth, eventController.showGroupedEvents);
router.post('/booking', auth, bookingController.Create);
router.get('/booking/getall', auth, bookingController.GetAll);
router.get('/booking/get', auth, bookingController.GetbyHrId);

module.exports = router;
