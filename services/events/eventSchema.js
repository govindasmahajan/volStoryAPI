'use strict'

const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var eventSchema = new Schema({
    eventName: String
})

eventSchema.plugin(autoIncrement, { inc_field: 'EventId' });

var event = mongoose.model('Event', eventSchema);

module.exports = {
    event
}