const localhost = require("./localhost.js");
const dev = require("./dev.js");
const test = require("./test.js");
const prod = require("./prod.js");

function setconfig() {
    let config = {};
    if (process.env.NODE_ENV && process.env.NODE_ENV == "PRODUCTION") {
        config = prod;
    } else if (process.env.NODE_ENV && process.env.NODE_ENV == "DEV") {
        config = dev;
    } else if (process.env.NODE_ENV && process.env.NODE_ENV == "TEST") {
        config = test;
    } else {
        config = localhost;
    }

    return config;
}

module.exports = setconfig();