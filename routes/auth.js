// Dependencies
var passport = require('passport');

var isAuthenticated = function (req, res, next) {
    // if user is authenticated in the session, call the next() to call the next request handler
    // Passport adds this method to request object. A middleware is allowed to add properties to
    // request and response objects
    if (req.isAuthenticated())
        return next();
    // if the user is not authenticated then redirect him to the login page
    res.redirect('/');
};

// Routes
module.exports = function(app) {
    /* GET login page. */
    app.get('/login', function(req, res) {
        res.render('index');
    });

    /* Handle Login POST */
    app.post('/login', passport.authenticate('login', {
        successRedirect: '/home',
        failureRedirect: '/',
    }));

    /* GET Registration Page */
    app.get('/signup', function(req, res){
        res.render('register');
    });

    /* Handle Registration POST */
    app.post('/signup', passport.authenticate('signup', {
        successRedirect: '/home',
        failureRedirect: '/signup',
    }));

    /* Handle Logout */
    app.get('/signout', function(req, res) {
        req.logout();
        res.redirect('/');
    });
};
