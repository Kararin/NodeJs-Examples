var passport = require('passport');
const express = require('express')
const app = express();
var GithubStrategy = require('passport-github').Strategy;
var session = require('express-session');
app.use(session({secret: "secret"}));
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(function(user, done) {
    // placeholder for custom user serialization
    // null is for errors
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // placeholder for custom user deserialization.
    // maybe you are going to get the user from mongo by id?
    // null is for errors
    done(null, user);
});

passport.use(new GithubStrategy({
        clientID: "51b724f62c93aa05a45c",
        clientSecret: "b9ca4eee3f959fc49d2b11625f84998678423cde",
        callbackURL: "http://localhost:30000/auth/github/callback"
    },
    function(accessToken, refreshToken, profile, done) {
        return done(null, profile);
    }
));


var server = app.listen(30000, function () {
    console.log('Example app listening at http://%s:%s',
        server.address().address, server.address().port);
});


app.get('/', function (req, res) {
    var html = "<ul>\
            <li><a href='/auth/github'>GitHub</a></li>\
            <li><a href='/logout'>logout</a></li>\
          </ul>";

    // dump the user for debugging
    if (req.isAuthenticated()) {
        html += "<p>authenticated as user:</p>"
        html += "<pre>" + JSON.stringify(req.user, null, 4) + "</pre>";
    }

    res.send(html);
});

app.get('/logout', function(req, res){
    console.log('logging out');
    req.logout();
    res.redirect('/');
});

// we will call this to start the GitHub Login process
app.get('/auth/github', passport.authenticate('github'));

// GitHub will call this URL
app.get('/auth/github/callback', passport.authenticate('github', { failureRedirect: '/' }),
    function(req, res) {
        res.redirect('/');
    }
);
