var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Route = new Schema({
    _id: String,
    airline: String,
    from: String,
    to: String,
    codeshare: Boolean,
    stops: Number,
    equipment: [String]
})

module.exports = mongoose.model('Route', Route, 'Route');
