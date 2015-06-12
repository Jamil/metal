// Dependencies
var application_root = __dirname;
var express = require('express');
var app = express();

var path = require('path');
var fs = require('fs');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var morgan = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var passport = require('passport');

var models = require('./models');

// Configuring Express
app.set('view engine', 'ejs'); // set up ejs for templating

app.use(morgan('dev')); // log every request to the console
app.use(cookieParser('secret')); // read cookies (needed for auth)
app.use(bodyParser.json());

// required for passport
app.use(session({
    secret: 'sessionsecret',
    resave: true,
    saveUninitialized: true,
    cookie : {
        maxAge: 3600000
    }
}));
app.use(flash()); // use connect-flash for flash messages stored in session

require('./config/passport')(passport);
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

app.use("/public", express.static(path.join(__dirname, 'public')));

var routes = require('./routes')(app, passport);

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
