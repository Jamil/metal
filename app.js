// Dependencies
var application_root = __dirname;
var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var cookieParser = require('cookie-parser');
var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session');

var models = require('./models');
var routes = require('./routes')(app);

// Configuring Express
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(path.join(application_root, "public")));

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
