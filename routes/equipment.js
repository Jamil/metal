// Dependencies
var mongoose = require('mongoose');

// Models
var Equipment = mongoose.model('Equipment');

// Routes
module.exports = function(app){
    app.get('/api/equipments/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            if (Equipment.schema.path(key)) {
                queries[key] = req.query[key];
            }
        }

        return Equipment.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/Equipment_LOWs/:id', function(req, res) {
        Equipment.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });
};
