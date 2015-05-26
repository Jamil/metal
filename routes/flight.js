// Dependencies
var mongoose = require('mongoose');

var common = require('./common');

// Models
var Flight = mongoose.model('Flight');

// Routes
module.exports = function(app){
    app.get('/api/flights/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            queries[key] = req.query[key];
        }

        queries['user'] = req.user;

        return Flight.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.post('/api/flights/', function(req, res) {
        var obj = {};

        obj['user'] = req.user;

        for (var key in req.body) {
            if (Flight.schema.path(key)) {
                obj[key] = req.body[key];
            }
        }

        var newFlight = new Flight(obj);
        newFlight.save(function(err, obj) {
            if (err) {
                this.res.status(400).json(err);
            }
            else {
                this.res.json(obj);
            }
        }.bind({
            "res": res
        }));
    });
};
