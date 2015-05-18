// Dependencies
var mongoose = require('mongoose')

// Models
var Alliance = mongoose.model('Alliance')

// Routes
module.exports = function(app){
    app.get('/api/alliances/', function(req, res) {
        return Alliance.find(function(err, objs) {
            if (!err) {
                return res.send(objs);
            }
        });
    });
}