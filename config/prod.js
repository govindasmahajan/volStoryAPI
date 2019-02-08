module.exports = {
    mongo: {
        'url': 'mongodb://govidasmahajan:Incorrect@123@ds227255.mlab.com:27255/volstory',
        'options': {
            server: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            replset: { socketOptions: { keepAlive: 1, connectTimeoutMS: 30000 } },
            useNewUrlParser: true
        }
    },
    tenant: {
        name: 'volStory',
        secret: 'volStory',
        idleTime: 20
    }
};