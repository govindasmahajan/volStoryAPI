var express = require('express');
var router = express.Router();
const ctrEvent = require('./eventsController');

router.get('/addUpdateBooking', ctrEvent.addUpdateBooking);

module.exports = router;

/*module.exports = function (router) {
    // API to store incomplete/complete booking details
    router.post('/addUpdateBooking', (req, res) => {
        eventService.addUpdateBooking(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    // API to store user details
    router.post('/addUpdateUser', (req, res) => {
        eventService.addUpdateUser(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/addApiFailData', (req, res) => {
        eventService.addApiFailData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });


    router.post('/getBookingData', (req, res) => {
        eventService.getBookingData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getUsers', (req, res) => {
        eventService.getUsers(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getApiFailData', (req, res) => {
        eventService.getApiFailData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getTotalCount', (req, res) => {
        eventService.getTotalCount(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/addUpdateVendor', (req, res) => {
        eventService.addUpdateVendor(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getVendors', (req, res) => {
        eventService.getVendors(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getVendorById', (req, res) => {
        eventService.getVendorById(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });
}*/
