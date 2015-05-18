var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Airport = new Schema( {
  _id: String,
  latitude: String,
  longitude: String,
  name: String
} );

module.exports = mongoose.model('Airport', Airport, 'Airport');
