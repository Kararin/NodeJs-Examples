const express = require('express')
const app = express();
let passport = require('passport'),
    LocalStrategy = require('passport-local').Strategy;

app.use(passport.initialize());

passport.use(new LocalStrategy(
    function(req, username, password, done) {
       return  done(null, username);
      console.log(username);
    }
));

app.get('/login', function (req, res) {
    let html = `<form action="/login" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>`;

    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write(html);
    res.end();
});

app.post('/login', function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { return next(err); }
        if (!user) { return res.redirect('/login'); }
        req.logIn(user, function(err) {
            if (err) { return next(err); }
            return res.redirect('/users/' + user.username);
        });
    })(req, res, next);
});


app.get('/register', function (req, res) {
    let html = `<form action="/register" method="post">
                    <div>
                        <label>Username:</label>
                        <input type="text" name="username"/>
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" name="password"/>
                    </div>
                    <div>
                        <input type="submit" value="Log In"/>
                    </div>
                </form>`;

    res.writeHead(200, {
        'content-type': 'text/html'
    });
    res.write(html);
    res.end();
});

app.get('/', function (req, res) {
    res.send('Hello World!');
});

app.listen(3100, function () {
    console.log('Example app listening on port 3000!')
});