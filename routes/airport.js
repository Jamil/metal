// Dependencies
var mongoose = require('mongoose')

// Models
var Airport = mongoose.model('Airport')

// Routes
module.exports = function(app){
    app.get('/api/airports/', function(req, res) {
        return Airport.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}