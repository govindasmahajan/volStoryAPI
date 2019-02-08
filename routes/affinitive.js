var services = require('../services/index');

const affinitivServices = services.affinitive;

function callAffinitivServices(req, res) {
    console.log(req)
    const fun = req._parsedUrl.pathname.slice(1);
    affinitivServices[fun](req).then(response => {
        res.send(response)
    }, error => {
        console.log(error);
        res.status(error.status);
        res.send(error);
    })
}

module.exports = function (router) {
    // API to store incomplete/complete booking details
    router.post('/addUpdateBooking', (req, res) => {
        affinitivServices.addUpdateBooking(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    // API to store user details
    router.post('/addUpdateUser', (req, res) => {
        affinitivServices.addUpdateUser(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/addApiFailData', (req, res) => {
        affinitivServices.addApiFailData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });


    router.post('/getBookingData', (req, res) => {
        affinitivServices.getBookingData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getUsers', (req, res) => {
        affinitivServices.getUsers(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getApiFailData', (req, res) => {
        affinitivServices.getApiFailData(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getTotalCount', (req, res) => {
        affinitivServices.getTotalCount(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/addUpdateVendor', (req, res) => {
        affinitivServices.addUpdateVendor(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getVendors', (req, res) => {
        affinitivServices.getVendors(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });

    router.post('/getVendorById', (req, res) => {
        affinitivServices.getVendorById(req).then(response => {
            res.send(response)
        }, error => {
            console.log(error);
            res.status(error.status);
            res.send(error);
        })
    });
}
