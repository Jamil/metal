// Dependencies
var application_root = __dirname,
    express = require('express'),
    path = require('path'),
    fs = require('fs'),
    mongoose = require('mongoose');

// Express Setup
var app = express();
var models = require('./models');

app.use(express.static(path.join(application_root, "public")));

// Schema
var Schema = mongoose.Schema;
var StatusProgramModel = mongoose.model('StatusProgram');

// Routing
app.get('/', function (req, res) {
  res.send('Hello World');
});

app.get('/api/programs', function(req, res) {
	return StatusProgramModel.find(function(err, objs) {
		if (!err) {
			return res.send(objs);
		}
	});
});

// Server

var use_port;

try {
    stats = fs.lstatSync('TEST');
    if (stats.isFile()) {
        use_port = 3000;
    }
}
catch (e) {
    use_port = 80;
}

var server = app.listen(use_port, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});
