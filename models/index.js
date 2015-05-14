var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/metal');

exports.StatusProgram = require('./status_program');
