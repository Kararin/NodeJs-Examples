const express = require('express')
const app = express();
let bodyParser = require('body-parser');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

app.post('/sum', function (req, res) {

    res.end(req.body.a + req.body.b);
});

app.post('/square', (req, res) => {
    let number = '';

    req.on('data', (data) => {
        number = number + data;
    });

    req.once('end', () => {
        res.end(Math.pow(+number, 2) + '');
    });
});

app.listen(3000, function () {
    console.log('Example app listening on port 3000!');
});