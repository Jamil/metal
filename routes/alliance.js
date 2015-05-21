// Dependencies
var mongoose = require('mongoose');

// Models
var Alliance = mongoose.model('Alliance');

// Routes
module.exports = function(app){
    app.get('/api/alliances/', function(req, res) {
        var queries = {};

        for (var key in req.query) {
            if (Alliance.schema.path(key)) {
                queries[key] = req.query[key];
            }
        }

        return Alliance.find(queries, function(err, objs) {
            if (!err) {
                return res.json(objs);
            }
        });
    });

    app.get('/api/Alliance_LOWs/:id', function(req, res) {
        Alliance.findById(req.params.id, function(err, obj) {
            if (err)
                res.send(err);
            res.json(obj);
        });
    });
};
