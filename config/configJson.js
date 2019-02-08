const fs = require('fs');

let configJson = {};
try {
    let configFile = './config.json';
    let configString = "{}";
    if (fs.existsSync(configFile)) {
        console.log('config.json is available');
        configString = fs.readFileSync(configFile);
    }
    else {
        console.log('config.json is not available');
    }
    configJson = JSON.parse(configString);
} catch (err) {
    console.log('Error occurred while reading/parsing config.json');
    console.log(err);
}

function override(config) {
    Object.keys(configJson).forEach(key => config[key] = configJson[key]);
    return config;
}

module.exports = {
    override
};