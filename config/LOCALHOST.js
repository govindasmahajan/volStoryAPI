module.exports = {
	mongo: {
		"url": "mongodb://127.0.0.1:27017/VolStory",
		"options": {
			server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
			replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
			useNewUrlParser: true
		}
	},
	tenant: {
		name: "volStory",
		secret: "volStory",
		idleTime: 20
	}
};