'use strict'
var services = require('../services/index');
const eventService = services.eventService;

module.exports.addUpdateBooking = function (req, res) {
    // API to store incomplete/complete booking details

    eventService.addUpdateBooking(req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
};

module.exports.getUsers = function (req, res) {
    // API to store incomplete/complete booking details

    eventService.getUsers(req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })

}