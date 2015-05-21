// Dependencies
var mongoose = require('mongoose');

// Models
var Route = mongoose.model('Route');

// Routes
module.exports = function(app){
    app.get('/api/routes/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            if (Route.schema.path(key)) {
                queries[key] = req.query[key];
            }
        }

        return Route.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/routes/:id', function(req, res) {
        Route.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });
};
