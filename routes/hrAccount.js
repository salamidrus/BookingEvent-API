// import modules
const router = require('express').Router();

// import authorization
const auth = require('../middleware/auth').isAuthenticated;

// import controllers
const hrAccountController = require('../controllers/hrAccount');
const eventController = require('../controllers/event');

// routes list
router.post('/signup', hrAccountController.Create);
router.get('/getevents', auth, eventController.GetAll);

module.exports = router;
