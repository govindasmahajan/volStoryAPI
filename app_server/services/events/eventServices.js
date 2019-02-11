const event = {};

var models = require('../../models/eventSchema');
var eventSchema = models.event;
const { msg } = require('../../messages')

/** API to Create Event */
event.addEvent = function (req) {
    return new Promise((resolve, reject) => {
        let payload = req.body;
        if (payload && payload.name && payload.title && payload.locationCity) {
            if (payload.description && payload.Duration) {
                var addEvent = new eventSchema(req.body);
                addEvent.save(function (error, data) {
                    if (error) {
                        reject({ status: 501, message: error, success: false });
                    } else {
                        resolve(data);
                    }
                })
            } else {
                reject({ status: 401, message: msg.msg2, success: false });
            }
        } else {
            reject({ status: 401, message: msg.msg1, success: false });
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
