var express = require('express');
var router = express.Router();
const ctrEvent = require('./eventsController');

router.post('/addUpdateBooking', ctrEvent.addUpdateBooking);
router.post('/getUsers', ctrEvent.getUsers);

module.exports = router;
