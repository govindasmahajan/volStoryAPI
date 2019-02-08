var express = require('express');
var router = express.Router();
const ctrEvent = require('./eventsController'),
    ctrHome = require('./homeController');

const dbService = require('../services/index');

router.get('/', ctrHome.home)
router.post('/createEvent', ctrEvent.addEvent);

module.exports = router;
