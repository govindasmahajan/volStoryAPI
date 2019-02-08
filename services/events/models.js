const mongoose = require('mongoose');
// Connecting to the database

var Schema = mongoose.Schema;


var bookSchema = new Schema({
    bookingUid: String,
    mobile: String, //mandatory
    vehId: String,
    userId: String,//web chat id
    customerId: String,
    vehModel: String,
    vehMake: String,
    vehYear: String,
    bookingNum: String,
    dateOfBooking: Number, //timestamp
    flowStatus: String,
    services: Array,
    firstName: String,
    lastName: String,
    vendorId: String,
    vendorName: String,
    email: String,
    quickVisit: Boolean,
    appointmentId: String
});

var Booking = mongoose.model("Booking1", bookSchema);

var userSchema = new Schema({
    uid: String,
    status: Number,
    vendorId: String,
    vendorName: String,
    email: String,
    mobile: String,
    firstName: String,
    lastName: String,
    customerId: String,
    userId: String, //web chat id
    dateOfBooking: Number, //timestamp
    profileCreated: Boolean
});

var User = mongoose.model("User1", userSchema);


var apiSchema = new Schema({
    bookingUid: String,
    mobile: String, //mandatory
    vehId: String,
    userId: String,//web chat id
    customerId: String,
    vehModel: String,
    vehMake: String,
    vehYear: String,
    bookingNum: String,
    dateOfBooking: Number, //timestamp
    flowStatus: String,
    services: Array,
    firstName: String,
    lastName: String,
    vendorId: String,
    vendorName: String,
    email: String,
    quickVisit: Boolean,
    apiName: String,
    failureStatus: String,
    apiError: String
});

var ApiFail = mongoose.model("ApiFail1", apiSchema);

var vendorSchema = new Schema({
    "vendorName": String,
    "vendorId": String,
    "phone": String,
    "email": String,
    "address": String
});

var Vendor = mongoose.model("Vendor", vendorSchema);

module.exports = {
    Booking,
    ApiFail,
    User,
    Vendor
}