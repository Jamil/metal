// Dependencies
var mongoose = require('mongoose');

var common = require('./common');

// Models
var Flight = mongoose.model('Flight');
var Airport = mongoose.model('Airport');
var StatusProgram = mongoose.model('StatusProgram');

function calculateCredit(flight) {
    // First, calculate distance between the two airports
    Flight.findById(flight._id)
        .populate('airline status_account origin destination')
        .exec(function(err, flight) {
            var distance = common.calculateDistance(flight.origin.loc, flight.destination.loc);
            flight.distance = distance.toFixed(0);

            StatusProgram.findById(flight.status_account.status_program, function(err, prog) {
                // Let's find how this credits to the airline
                var credits = {};

                if (prog.slugs.point) {
                    var credits.point = 
                }
            });
        });

}

// Routes
module.exports = function(app){
    app.get('/add-flight/', common.isLoggedIn, function(req, res) {
        res.render('add-flight.ejs');
    });

    app.get('/api/flights/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            queries[key] = req.query[key];
        }

        queries.user = req.user;

        return Flight.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.post('/api/flights/', function(req, res) {
        var obj = {};

        obj.user = req.user._id;

        for (var key in req.body) {
            if (Flight.schema.path(key)) {
                obj[key] = req.body[key];
            }
        }

        console.log(obj);

        var newFlight = new Flight(obj);
        newFlight.validate(function(err, obj) {
            if (err) {
                this.res.status(400).json(err);
            }
            else {
                newFlight.save(function(err, obj) {
                    if (err) {
                        this.res.status(400).json(err);
                    }
                    else {
                        calculateCredit(obj);
                        this.res.json(obj);
                    }
                }.bind({
                    "res": res
                }));
            }
        }.bind({
            "res": res
        }));
    });
};
