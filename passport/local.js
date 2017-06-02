const express = require('express')
const app = express();
let passport = require('passport'),
    bodyParser = require('body-parser'),
    LocalStrategy = require('passport-local').Strategy,
    users = new Map();

app.use(passport.initialize());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

passport.use(new LocalStrategy({
        usernameField: 'name',
        passwordField: 'pass'
    },
    function(username, password, done) {
        if (users.has(username) && users.get(username) === password) {
            return  done(null, username);
        }

      return done(null, false);
    }
));

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


app.get('/login', function (req, res) {
    let html = `<form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="name"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="pass"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>`;
    res.send(html);
});

app.post('/login',  passport.authenticate('local', {
        successRedirect: '/',
        failureRedirect: '/login'
    })
);

app.get('/register', function (req, res) {
    let html = `<form action="/register" method="post">
                    <div>
                        <label>Input Username:</label>
                        <input type="text" name="name"/>
                    </div>
                    <div>
                        <label>Input Password:</label>
                        <input type="password" name="pass"/>
                    </div>
                    <div>
                        <input type="submit" value="Register"/>
                    </div>
                </form>`;

    res.send(html);
});

app.post('/register', function (req, res) {
    let name = req.body.name,
        pass = req.body.pass;

    users.set(name, pass);
    res.redirect('/login');
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!')
});

//TODO: add modules
//one server with 2 authorization