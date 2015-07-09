var mongoose = require('mongoose');
var idValidator = require('mongoose-id-validator');

var Schema = mongoose.Schema;

var Flight = new Schema({
    user: {
        type: String,
        ref: 'User'
    },
    airline: {
        type: String,
        ref: 'Airline'
    },
    flight_number: Number,
    status_account: {
        type: String,
        ref: 'StatusAccount'
    },
    origin: {
        type: String,
        ref: 'Airport'
    },
    destination: {
        type: String,
        ref: 'Airport'
    },
    fare_class: {
        type: String,
        ref: 'FareClass'
    },
    distance: Number,
    credit: {
        miles: Number,
        segments: Number,
        points: Number,
        spend: Number
    }
});

Flight.plugin(idValidator);
module.exports = mongoose.model('Flight', Flight, 'Flight');
