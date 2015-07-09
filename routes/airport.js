// Dependencies
var mongoose = require('mongoose');
var common = require('./common');

// Models
var Airport = mongoose.model('Airport');

if (typeof(Number.prototype.toRadians) === "undefined") {
    Number.prototype.toRadians = function() {
        return this * Math.PI / 180;
    };
}

function reduceDistances(res, origin, airportArray, distance, options) {
    if (airportArray.length === 0) {
        res.status(200).json({
            "distance": Number(distance.toFixed(0))
        });
    }
    else {
        Airport.findById(origin, function(err, from) {
            if (err) {
                res.send(err);
            }
            else if (!from) {
                res.status(400).json({
                    "error": "No airport with ID " + origin
                });
            }
            else {
                Airport.findById(airportArray[0], function(err, to) {
                    if (err) {
                        res.send(err);
                    }
                    else if (!to) {
                        res.status(400).json({
                            "error": "No airport with ID " + airportArray[0]
                        });
                    }
                    else {
                        var newDistance = common.calculateDistance(from.loc, to.loc);

                        if (options.min500 && newDistance < 500) {
                            newDistance = 500;
                        }

                        reduceDistances(res,
                                        airportArray[0],
                                        airportArray.splice(1),
                                        distance + newDistance,
                                        options);
                    }
                });
            }
        });
    }
}

// Routes
module.exports = function(app){
    app.get('/api/airports/', function(req, res) {
        var queries = {};

        var latitude = false;
        var longitude= false;
        for (var key in req.query) {
           if (Airport.schema.path(key)) {
                queries[key] = req.query[key];
            }
            else if (key == 'latitude') {
                latitude = true;
            }
            else if (key == 'longitude') {
                longitude = true;
            }
        }

        var location = latitude && longitude;
        if (location) {
            var limit = req.query.limit || 5;

            // get coordinates [ <longitude> , <latitude> ]
            var coords = [];
            coords[0] = req.query.longitude;
            coords[1] = req.query.latitude;

            // find a location
            Airport.find({
                loc: {
                    $near: coords,
                }
            }).limit(limit).exec(function(err, locations) {
                if (err) {
                    return res.json(500, err);
                }
                res.json(200, locations);
            });
        }
        else {
            return Airport.find(queries, function(err, objs) {
                if (!err) {
                    return res.json(objs);
                }
            });
        }
    });

    app.get('/api/airports/:id', function(req, res) {
        Airport.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });

    app.get('/api/distance/', function(req, res) {
        if (!req.query.airports) {
            console.log('Not Found');
            res.status(400).send("Request must contain at least two comma-delimited airports.");
        }
        else {
            var airportArray = req.query.airports.split(',');
            reduceDistances(res, airportArray[0], airportArray.splice(1), 0, req.query);
        }
    });
};
