// Dependencies
var mongoose = require('mongoose');

// Models
var FareClassModel = mongoose.model('FareClass');

// Routes
module.exports = function(app){
    app.get('/api/fare_classes/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            queries[key] = req.query[key];
        }

        return FareClassModel.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/fare_classes/:airline', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            queries[key] = req.query[key];
        }

        queries.airline = req.params.airline;

        return FareClassModel.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/fare_classes/:airline/:id', function(req, res) {
        FareClassModel.find({
            "airline": req.params.airline,
            "fare": req.params.id
        }, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });
};
