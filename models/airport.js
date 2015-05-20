var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var Airport = new Schema( {
    _id: String,
    loc: {
        type: [Number],
        index: '2d'
    },
    name: String
} );

module.exports = mongoose.model('Airport', Airport, 'Airport');
