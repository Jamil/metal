var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var FareClass = new Schema({
    _id: String,
    name: String,
    fare: String,
    airline: {
        type: String,
        ref: 'Airline'
    },
    class_of_service: String,
    credit: [
        {
            status_program: {
                type: String,
                ref: 'StatusProgram'
            },

            // Per mile
            mile_credit: Number,
            point_credit: Number,

            // Per segment
            segment_credit: Number,

            // Per dollar
            spend_credit: Number,

            // Per dollar or per mile, depending on what `revenue_based` is in StatusProgram
            rdm_credit: Number
        }
    ]
});

module.exports = mongoose.model('FareClass', FareClass, 'FareClass');
