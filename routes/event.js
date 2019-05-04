const router = require('express').Router();
const eventController = require('../controllers/event');

router.post('/create', eventController.Create);

module.exports = router;
