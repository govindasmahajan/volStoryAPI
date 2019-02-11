'use strict'
var eventService = require('../services/events/eventServices');
const { msg } = require('../messages');

module.exports.addEvent = function (req, res) {
    console.log(` ******* API : addEvent `)
    eventService.addEvent(req).then(response => {
        let resObj = {
            success: true,
            status: 200,
            message: msg.msg3,
            data: response
        }
        res.send(resObj)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};


module.exports.getAllEvents = function (req, res) {
    console.log(` ******* API : getAllEvents `)
    eventService.getAllEvents(req).then(response => {
        let resObj = {
            success: true,
            status: 200,
            eventsCount: response.length,
            message: msg.msg4,
            data: response
        }
        res.send(resObj)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};
