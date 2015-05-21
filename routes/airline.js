// Dependencies
var mongoose = require('mongoose');

// Models
var Airline = mongoose.model('Airline');

// Routes
module.exports = function(app){
    app.get('/api/airlines/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            if (Airline.schema.path(key)) {
                queries[key] = req.query[key];
            }
        }

        return Airline.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/airlines/:id', function(req, res) {
        Airline.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });
};
