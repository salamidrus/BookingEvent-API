// authorization
const auth = require('../middleware/auth').isAuthenticated;

// import modules
const router = require('express').Router();

// import controllers
const vendorController = require('../controllers/vendor');

const eventController = require('../controllers/event');

// routes list
router.post('/signup', vendorController.Create);
router.post('/create', auth, eventController.Create);
router.get('/getevents', auth, eventController.GetAll);
router.get('/getevents/:id', auth, eventController.GetById);

module.exports = router;
