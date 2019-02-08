const event = {};

var models = require('./eventSchema');
var eventSchema = models.event;

/** API to Create Event */
event.addEvent = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.eventName) {
            var addEvent = new eventSchema(req.body);
            addEvent.save(function (error, data) {
                if (error) {
                    reject({ status: 501, message: error, success: false });
                } else {
                    resolve(data);
                }
            })
        } else {
            reject({ status: 401, message: 'Invalid Parameters', success: false });
        }
    })
};

module.exports = event
