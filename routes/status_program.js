// Dependencies
var mongoose = require('mongoose');

// Models
var StatusProgramModel = mongoose.model('StatusProgram');

// Routes
module.exports = function(app){
    app.get('/api/programs/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            queries[key] = req.query[key];
        }

        return StatusProgramModel.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/programs/:id', function(req, res) {
        StatusProgramModel.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });

    app.get('/api/programs/:id/tiers/', function(req, res) {
        StatusProgramModel.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj.tiers);
        });
    });

    app.get('/api/programs/:id/tiers/:tier_id', function(req, res) {
        StatusProgramModel.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);

            var tiers = obj.tiers;
            for (var i = 0; i < tiers.length; i++) {
                if (tiers[i]._id == req.params.tier_id) {
                    res.json(tiers[i]);
                }
            }

            res.json(404, 'Tier Not Found');
        });
    });
};
