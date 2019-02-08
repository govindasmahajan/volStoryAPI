const services = {};
//const config = require('../../config/config');
var models = require('./models');
var Booking = models.Booking;
var ApiFail = models.ApiFail;
var User = models.User;
var Vendor = models.Vendor;

// API to store incomplete/complete booking details
services.addUpdateBooking = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.mobile && req.body.flowStatus && req.body.dateOfBooking && (req.body.flowStatus === 'Pending' || req.body.flowStatus === 'Complete' || req.body.flowStatus === 'Cancelled') && req.body.bookingUid) {
            let obj = {
                bookingUid: req.body.bookingUid
            }
            Booking.findOne(obj, function (err, bookingData) {
                if (bookingData) {
                    Booking.findOneAndUpdate(obj, {
                        $set: req.body
                    }, { new: true }, function (error, resp) {
                        if (error) {
                            reject({ status: 501, message: error, success: false });
                        } else {
                            resolve(resp);
                        }
                    })
                } else {
                    var newBooking = new Booking(req.body);
                    newBooking.save(function (error, data) {
                        if (error) {
                            reject({ status: 501, message: error, success: false });
                        } else {
                            resolve(data);
                        }
                    })
                }
            });

            /* let myStartDate = new Date(req.body.dateOfBooking - config.tenant.idleTime * 60000).getTime();
             let obj = {
                 mobile: req.body.mobile,
                 flowStatus: 'Pending',
                 dateOfBooking: { $gte: myStartDate }
             }
             Booking.findOne(obj, function (err, bookingData) {
                 if (bookingData) {
 
                     if (req.body.flowStatus && req.body.flowStatus === 'Complete') {
                         Booking.findOneAndUpdate(obj, {
                             $set: req.body
                         }, { new: true }, function (error, resp) {
                             if (error) {
                                 reject({ status: 501, message: error, success: false });
                             } else {
                                 resolve(resp);
                             }
                         })
                     } else {
                         Booking.findOneAndUpdate(obj, {
                             $set: {
                                 dateOfBooking: req.body.dateOfBooking,
                             }
                         }, { new: true }, function (error, resp) {
                             if (error) {
                                 reject({ status: 501, message: error, success: false });
                             } else {
                                 resolve({ success: true, message: 'No action' });
                             }
                         })
                     }
 
 
                } else {
                     var NewBooking = new Booking(req.body)
                     NewBooking.save(function (error, data) {
                         if (error) {
 
                             reject({ status: 501, message: error, success: false });
                         } else {
                             resolve(data);
                         }
                     })
                 }
             })*/
        } else {
            reject({ status: 401, message: 'Invalid Parameters', success: false });
        }
    })
};

// API to get bookings data
services.getBookingData = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.fromDate && req.body.toDate) {
            let obj = { dateOfBooking: { $gte: req.body.fromDate, $lte: req.body.toDate } };
            if (req.body.quickVisit === true) {
                obj.quickVisit = { $eq: true };
            } else if (req.body.flowStatus === 'Pending') {
                obj.flowStatus = 'Pending';
            } else if (req.body.flowStatus === 'Cancelled') {
                obj.flowStatus = 'Cancelled';
            } else if (req.body.flowStatus === 'Complete') {
                obj.flowStatus = 'Complete';
            }
            if (req.body.vendors && Array.isArray(req.body.vendors)) {
                obj.vendorId = { $in: req.body.vendors }
            }

            if (req.body.services && Array.isArray(req.body.services)) {
                obj.services = { "$elemMatch": { "ServiceId": { "$in": req.body.services } } }
            }

            if (req.body.paging && req.body.pageNo && req.body.pageSize) {
                let skips = parseInt(req.body.pageSize) * (parseInt(req.body.pageNo) - 1);
                Booking.find(obj)
                    .sort('dateOfBooking')
                    .skip(skips)
                    .limit(parseInt(req.body.pageSize))
                    .exec(function (error, bookings) {
                        if (error) {
                            reject({ success: false, status: 501, message: error })
                        } else {
                            Booking.countDocuments(obj, function (err, count) {
                                if (err) {
                                    reject({ success: false, status: 501, message: err })
                                } else {
                                    resolve({ data: bookings, total: count, success: true });
                                }
                            })

                        }
                    })
            } else {
                Booking.find(obj)
                    .sort('dateOfBooking')
                    .exec(function (err, bookings) {
                        if (err) {
                            reject({ success: false, status: 501, message: err })
                        } else {
                            //let chartData = util.formatChartData(bookings);
                            let resp = {
                                success: true,
                                data: bookings
                                // chartData: chartData
                            }
                            resolve(resp);
                        }
                    })
            }
        } else {
            reject({ success: false, status: 401, message: 'Invalid Parameters' });
        }
    });
}

services.addUpdateUser = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.mobile && ([0, 1].indexOf(req.body.status) > -1)) {
            let obj = { uid: req.body.uid };
            User.findOneAndUpdate(obj, {
                $set: req.body
            }, { new: true, upsert: true }, function (error, resp) {
                if (error) {
                    reject({ status: 501, message: error, success: false });
                } else {
                    resolve(resp);
                }
            })
        } else {
            reject({ status: 401, message: 'Invalid Parameters', success: false });
        }
    });
}

// API to get data for failed bookings due to API issue
services.getUsers = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.fromDate && req.body.toDate && (req.body.repeatedUser || req.body.newUser || req.body.newProfileUser)) {
            let obj = {
                dateOfBooking: {
                    $gte: req.body.fromDate.toString(),
                    $lte: req.body.toDate.toString()
                }
            }
            if (req.body.repeatedUser) {
                obj.status = { $eq: 0 };
            } else if (req.body.newUser) {
                obj.status = 1;
                obj.profileCreated = { $ne: true };
            } else if (req.body.newProfileUser) {
                obj.profileCreated = { $eq: true };
            }
            if (req.body.vendors && Array.isArray(req.body.vendors)) {
                obj.vendorId = { $in: req.body.vendors }
            }

            if (req.body.paging && req.body.pageNo && req.body.pageSize) {
                let skips = parseInt(req.body.pageSize) * (parseInt(req.body.pageNo) - 1);
                User.find(obj)
                    .sort('dateOfBooking')
                    .skip(skips)
                    .limit(parseInt(req.body.pageSize))
                    .exec(function (err, bookings) {
                        if (err) {
                            reject({ success: false, status: 501, message: err })
                        } else {
                            User.countDocuments(obj, function (err, count) {
                                if (err) {
                                    reject({ success: false, status: 501, message: err })
                                } else {
                                    resolve({ data: bookings, total: count, success: true });
                                }
                            })
                        }
                    })
            } else {
                User.find(obj).sort('dateOfBooking').exec(function (err, bookings) {
                    if (err) {
                        reject({ success: false, status: 501, message: err });
                    } else {
                        // let chartData = util.formatChartData(bookings);
                        let resp = {
                            success: true,
                            data: bookings
                            // chartData: chartData
                        }
                        resolve(resp);
                    }
                })
            }
        } else {
            reject({ success: false, status: 401, message: 'Invalid Parameters' });
        }
    });
}


// API to get save API fail data
services.addApiFailData = function (req) {
    return new Promise((resolve, reject) => {
        var failure = new ApiFail(req.body)
        failure.save(function (error, data) {
            if (error) {
                reject({ status: 501, message: error, success: false });
            } else {
                resolve(data);
            }
        })
    });
};


// API to get data for failed bookings due to API issue
services.getApiFailData = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.fromDate && req.body.toDate) {
            let obj = { dateOfBooking: { $gte: req.body.fromDate.toString(), $lte: req.body.toDate.toString() } };
            if (req.body.vendors && Array.isArray(req.body.vendors)) {
                obj.vendorId = { $in: req.body.vendors }
            }
            if (req.body.services && Array.isArray(req.body.services)) {
                obj.services = { "$elemMatch": { "ServiceId": { "$in": req.body.services } } }
            }
            if (req.body.paging && req.body.pageNo && req.body.pageSize) {
                let skips = parseInt(req.body.pageSize) * (parseInt(req.body.pageNo) - 1);
                ApiFail.find(obj)
                    .sort('dateOfBooking')
                    .skip(skips)
                    .limit(parseInt(req.body.pageSize))
                    .exec(function (err, bookings) {
                        if (err) {
                            reject({ success: false, status: 501, message: err })
                        } else {
                            ApiFail.countDocuments(obj, function (err, count) {
                                if (err) {
                                    reject({ success: false, status: 501, message: err })
                                } else {
                                    resolve({ data: bookings, total: count, success: true });
                                }
                            })
                        }
                    })
            } else {
                ApiFail.find(obj).sort('dateOfBooking').exec(function (err, bookings) {
                    if (err) {
                        reject({ success: false, status: 501, message: err });
                    } else {
                        //  let chartData = util.formatChartData(bookings);
                        let resp = {
                            success: true,
                            data: bookings
                            //   chartData: chartData
                        }
                        resolve(resp);
                    }
                })
            }
        } else {
            reject({ success: false, status: 401, message: 'Invalid Parameters' });
        }
    });
}

services.getTotalCount = function (req) {
    return new Promise((resolve, reject) => {
        let promises = [];
        const temp = [{
            key: 'totalBookings',
            collection: Booking,
            obj: {}
        },
        {
            key: 'totalCompletedBookings',
            collection: Booking,
            obj: { flowStatus: 'Complete' }
        },
        {
            key: 'totalIncompleteBookings',
            collection: Booking,
            obj: { flowStatus: 'Pending' }
        },
        {
            key: 'totalCancelledBookings',
            collection: Booking,
            obj: { flowStatus: 'Cancelled' }
        },
        {
            key: 'totalFailedBookings',
            collection: ApiFail,
            obj: {}
        },
        {
            key: 'totalQuickVisits',
            collection: Booking,
            obj: { quickVisit: true }
        },
        {
            key: 'totalNewUsers',
            collection: User,
            obj: { status: 1, profileCreated: { $ne: true } }
        },
        {
            key: 'totalNewProfileUsers',
            collection: User,
            obj: { profileCreated: true }
        },
        {
            key: 'totalRepeatUsers',
            collection: User,
            obj: { status: 0 }
        }];

        temp.forEach((ele) => {
            if (req.body.vendors && Array.isArray(req.body.vendors)) {
                ele.obj.vendorId = { $in: req.body.vendors }
            }
            promises.push(getCount(ele.collection, ele.obj, ele.key))
        })
        Promise.all(promises).then(function (values) {
            resolve({ success: true, data: values });
        }).catch((err) => {
            reject({ success: false, status: 501, message: err });
        })
    })
}

function getCount(collection, obj, key) {
    return new Promise((resolve, reject) => {
        collection.countDocuments(obj, function (err, count) {
            if (err) {
                reject(err)
            } else {
                resolve({
                    count: count,
                    id: key
                });
            }
        })
    })
}


services.addUpdateVendor = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.vendorId && req.body.vendorName) {
            let obj = { vendorId: req.body.vendorId };
            Vendor.findOneAndUpdate(obj, {
                $set: req.body
            }, { new: true, upsert: true }, function (error, resp) {
                if (error) {
                    reject({ status: 501, message: error, success: false });
                } else {
                    resolve(resp);
                }
            })
        } else {
            reject({ status: 401, message: 'Invalid Parameters', success: false });
        }
    });
}

services.getVendors = function (req) {
    return new Promise((resolve, reject) => {
        Vendor.find({}).exec(function (err, bookings) {
            if (err) {
                reject({ success: false, status: 501, message: err });
            } else {
                resolve(bookings);
            }
        })
    });
}

services.getVendorById = function (req) {
    return new Promise((resolve, reject) => {
        if (req.body && req.body.vendorId) {
            Vendor.find({ vendorId: req.body.vendorId }).exec(function (err, vendor) {
                if (err) {
                    reject({ success: false, status: 501, message: err });
                } else {
                    resolve({ success: true, data: vendor.length > 0 ? vendor[0] : {} });
                }
            })
        } else {
            reject({ status: 401, message: 'Invalid Parameters', success: false });
        }
    });
}



module.exports = services;
