'use strict'
var eventService = require('../services/events/eventServices');


module.exports.addEvent = function (req, res) {
    console.log(` ******* API : addEvent `)
    eventService.addEvent(req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};


module.exports.getAllEvents = function (req, res) {
    console.log(` ******* API : getAllEvents `)
    eventService.getAllEvents(req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};
