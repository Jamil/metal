// Dependencies
var mongoose = require('mongoose')

// Models
var Airport = mongoose.model('Airport')

// Routes
module.exports = function(app){
    app.get('/api/airports/', function(req, res) {
        var queries = {};

        for (key in req.query) {
            if (Airport.schema.path(key)) {
                queries[key] = req.query[key];
            }
        }

        return Airport.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/Airport_LOWs/:id', function(req, res) {
        Airport.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        })
    })
}