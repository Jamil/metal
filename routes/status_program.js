// Dependencies
var mongoose = require('mongoose')

// Models
var StatusProgramModel = mongoose.model('StatusProgram')

// Routes
module.exports = function(app){
    app.get('/api/programs/', function(req, res) {
        var queries = {};

        for (key in req.query) {
            if (StatusProgramModel.schema.path(key)) {
                queries[key] = req.query[key];
            }
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
        })
    })
}
