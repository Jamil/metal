// Dependencies
var mongoose = require('mongoose')

// Models
var StatusProgramModel = mongoose.model('StatusProgram')

// Routes
module.exports = function(app){
    app.get('/api/programs/', function(req, res) {
        return StatusProgramModel.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}
