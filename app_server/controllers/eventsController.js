"use strict";
var eventService = require("../services/events/eventServices");
var { msg } = require("../messages");

module.exports.addEvent = function (req, res) {
	eventService.addEvent(req).then(response => {
		let resObj = {
			success: true,
			status: 200,
			message: msg.msg3,
			data: response
		};
		res.send(resObj);
	}, error => {
		console.log(error); // eslint-disable-line no-console
		res.status(error.status);
		res.send(error);
	});
};


module.exports.getAllEvents = function (req, res) {
	eventService.getAllEvents(req).then(response => {
		let resObj = {
			success: true,
			status: 200,
			eventsCount: response.length,
			message: msg.msg4,
			data: response
		};
		res.send(resObj);
	}, error => {
		console.log(error);// eslint-disable-line no-console
		res.status(error.status);
		res.send(error);
	});
};
