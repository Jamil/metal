var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var Flight = mongoose.model('Flight');

var StatusAccount = new Schema({
    _id: String,
    user: {
        type: String,
        ref: 'User'
    },
    status_program: {
        type: String,
        ref: 'StatusProgram'
    },
    flights: [Flight]
});

module.exports = mongoose.model('StatusAccount', StatusAccount, 'StatusAccount');
