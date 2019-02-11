const fs = require("fs");

let configJson = {};
try {
	let configFile = "./config.json";
	let configString = "{}";
	if (fs.existsSync(configFile)) {
		configString = fs.readFileSync(configFile);
	}
	else {
		console.log("config.json is not available"); // eslint-disable-line no-console
	}
	configJson = JSON.parse(configString);
} catch (err) {
	console.log(err); // eslint-disable-line no-console
}

function override(config) {
	Object.keys(configJson).forEach(key => config[key] = configJson[key]);
	return config;
}

module.exports = {
	override
};