// Dependencies
var mongoose = require('mongoose')

// Models
var Equipment = mongoose.model('Equipment')

// Routes
module.exports = function(app){
    app.get('/api/equipments/', function(req, res) {
        return Equipment.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}