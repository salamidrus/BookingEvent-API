// import modules
const hrAccountController = require('../controllers/hrAccount');
const router = require('express').Router();

// routes list
router.post('/signup', hrAccountController.Create);

module.exports = router;
