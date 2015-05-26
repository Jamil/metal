// Dependencies
var mongoose = require('mongoose');

var common = require('./common');

// Models
var Flight = mongoose.model('Flight');

// Routes
module.exports = function(app, passport) {
    app.get('/addflight/', common.isLoggedIn, function(req, res) {
        res.render('add_flight.ejs', {
            user : req.user // get the user out of session and pass to template
        });
    });

    app.post('/addflight/', common.isLoggedIn, function(req, res) {
        var airline = req.body.airline,
            flight_number = req.body.flight_number,
            status_account = req.body.status_account,
            origin = req.body.origin,
            destination = req.body.destination,
            fare_class = req.body.fare_class

        var newFlight = new Flight({
            user: req.user,
            airline: airline,
            flight_number: flight_number,
            origin: origin,
            destination: destination,
            fare_class: (airline + fare_class)
        });

        newFlight.save(function(err, obj) {
            if (err) {
                console.log(err);
                this.res.status(400).json({
                    "error": err
                });
            }
            else {
                this.res.json(obj);
            }
        }.bind({
            "req": req,
            "res": res
        }));
    });
};

