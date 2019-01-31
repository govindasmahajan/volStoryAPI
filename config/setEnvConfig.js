'use strict'

const env = process.env.NODE_ENV || 'LOCALHOST';
const config = require(`./${env}`);

export default config;