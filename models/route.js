var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Route = new Schema( {
  airline: String,
  from: String,
  to: String,
  codeshare: String,
  stops: String,
  equipment: String
} );

module.exports = mongoose.model('Route', Route, 'Route');
