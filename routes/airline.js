// Dependencies
var mongoose = require('mongoose')

// Models
var Airline = mongoose.model('Airline')

// Routes
module.exports = function(app){
    app.get('/api/airlines/', function(req, res) {
        return Airline.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}
