const mongoose = require('mongoose');
const dbConfig = require('../config/config').mongo;
mongoose.Promise = global.Promise;

mongoose.connect(dbConfig.url, {
    useNewUrlParser: true
}).then((res) => {
    console.log("Successfully connected to the database");
}).catch(err => {
    console.log('Could not connect to the database. Exiting now...', err);
    process.exit();
});

const eventService = require('./events/eventServices');

module.exports = {
    eventService
}