var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Flight = new Schema({
    _id: String,
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
    }
});

module.exports = mongoose.model('Flight', Flight, 'Flight');
