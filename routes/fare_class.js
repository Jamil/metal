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
        FareClassModel.findOne({
            "airline": req.params.airline,
            "fare": req.params.id
        }, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });

    app.get('/api/fare_classes/:airline/:id/credit/', function(req, res) {
        FareClassModel.findOne({
            "airline": req.params.airline,
            "fare": req.params.id
        }, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj.credit);
        });
    });

    app.get('/api/fare_classes/:airline/:id/credit/:program/', function(req, res) {
        FareClassModel.findOne({
            "airline": req.params.airline,
            "fare": req.params.id
        }, function(err, obj) {
            if (err)
                res.send(err);
            for (var i = 0; i < obj.credit.length; i++) {
                if (obj.credit[i].status_program == req.params.program) {
                    res.json(obj.credit[i]);
                }
            }
            res.status(404).json({
                "Not Found": ("The fare class " + req.params.id + " on " + req.params.airline + " cannot be credited to " + req.params.program)
            });
        });
    });
};
