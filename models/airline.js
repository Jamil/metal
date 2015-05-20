var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Airline = new Schema( {
    _id: String,
    name: String
});

module.exports = mongoose.model('Airline', Airline, 'Airline');
