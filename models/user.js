var mongoose = require('mongoose');

module.exports = mongoose.model('User', {
    _id: String,
    username: String,
    password: String,
    email: String
});
