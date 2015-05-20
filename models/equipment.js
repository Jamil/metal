var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Equipment = new Schema( {
    _id: String,
    name: String
});

module.exports = mongoose.model('Equipment', Equipment, 'Equipment');
