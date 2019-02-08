'use strict'
var eventService = require('../services/events/eventServices');


module.exports.addEvent = function (req, res) {
    // API to store incomplete/complete booking details

    eventService.addEvent(req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};
