// Dependencies
var mongoose = require('mongoose')

// Models
var Route = mongoose.model('Route')

// Routes
module.exports = function(app){
    app.get('/api/routes/', function(req, res) {
        return Route.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}