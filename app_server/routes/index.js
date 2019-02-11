var express = require('express');
var router = express.Router();
const ctrEvent = require('../controllers/eventsController'),
    ctrHome = require('../controllers/homeController');

const dbService = require('../services/index');

router.get('/', ctrHome.home)
router.post('/createEvent', ctrEvent.addEvent);
router.get('/allEvents', ctrEvent.getAllEvents);

module.exports = router;
