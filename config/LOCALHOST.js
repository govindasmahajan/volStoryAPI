'use strict'

let mongoDB = {
    host: `127.0.0.1`,
    port: `27017`,
    dbName: `local_volStory`
};

let host = {
    url: `http://localhost:${process.env.PORT || 3000}`
}

module.export = {
    mongoDB,
    host
}