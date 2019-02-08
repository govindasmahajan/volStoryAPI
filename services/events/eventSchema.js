'use strict'

const mongoose = require('mongoose'),
    autoIncrement = require('mongoose-sequence')(mongoose);

var Schema = mongoose.Schema;

var eventSchema = new Schema({

    // "EventId": "auto generated field"
    name: String,
    title: String,
    category: String,
    locationCity: String,
    locationArea: String,
    locationZip: String,
    description: String,
    Tags: [String],
    Duration: {
        From: { type: Date, default: Date.now },
        To: { type: Date, default: Date.now }
    },
    LastDateOfJoining: { type: Date, default: Date.now },
    Volunteers: {
        Min: Number,
        Max: Number
    },
    RequiredSkills: [String],
    Facilities: [String],
    Visibility: String,
    Media: {
        Photo: [String],
        Video: [String]
    },
    CreatedBy: {
        Name: String,
        createdOn: { type: Date, default: Date.now }
    },
    Comments: [
        {
            Name: String,
            Comment: String
        }
    ],
    Interest: {
        PeopleJoined: [
            String
        ],
        PeopleInterested: [
            String
        ]
    }
})

eventSchema.plugin(autoIncrement, { inc_field: 'EventId' });

var event = mongoose.model('Event', eventSchema);

module.exports = {
    event
}