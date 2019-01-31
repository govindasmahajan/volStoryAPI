'use strict'

let mongoDB = {
    host: `127.0.0.1`,
    port: `27017`,
    dbName: `dev_volStory`
};

let host = {
    url: `https://dev.volstory.com:${process.env.PORT || 3000}`
}

module.export = {
    mongoDB,
    host
}