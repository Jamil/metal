var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Alliance = new Schema( {
  _id: String,
  name: String,
  airlines: String
} );

module.exports = mongoose.model('Alliance', Alliance, 'Alliance');
