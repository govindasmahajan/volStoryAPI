const event = {};

var models = require('./eventSchema');
var eventSchema = models.event;

/** API to Create Event */
event.addEvent = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.name) {
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
/** API to GET list of Events */
event.getAllEvents = function (req) {
    return new Promise((resolve, reject) => {
        eventSchema.find({}).exec(function (err, events) {
            if (err) {
                reject({ success: false, status: 501, message: err });
            } else {
                resolve(events);
            }
        })
    });
}

module.exports = event
