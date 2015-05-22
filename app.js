// Dependencies
var application_root = __dirname;
var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var mongoose = require('mongoose');
var passport = require('passport');

var flash = require('connect-flash');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var models = require('./models');
var routes = require('./routes')(app, passport);

// Configuring Express
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'sessionsecret' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

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
