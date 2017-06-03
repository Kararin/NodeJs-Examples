let request = require('request'),
    async = require('async');

const done = (err, result) => {
    if (err) {
        console.log(err)
    } else {
        console.log(result);
    }

    console.log('I am done');
};
const square = (num, cb) => {
    request.post({
        uri: 'http://localhost:3000/square',
        body: num + '',
    }, (err, res, body) => {
        cb(err, body && JSON.parse(body))
    });
};

const series = () => {
    asyn.series([
        function (next) {
            square(2, next);
        },
        function (next) {
            square(5, next);
        }
    ], done);
};
const parallel = () => {
    async.parallel([
        function (next) {
            square(2, next);
        },
        function (next) {
            square(5, next);
        },
        function (next) {
            square(1, next);
        },
        function (next) {
            square(2, next);
        },
        function (next) {
            square(3, next);
        },
        function (next) {
            square(5, next);
        },
        function (next) {
            square(7, next);
        },
        function (next) {
            square(9, next);
        },
        function (next) {
            square(0, next);
        },
        function (next) {
            square(1, next);
        },
        function (next) {
            square(11, next);
        },
        function (next) {
            square(212, next);
        },
    ], done);
};
const waterfall = () => {
    async.waterfall([
        function (next) {
            square(2, next);
        },
        function (body, next) {
            square(body, next);
        },
        function (body, next) {
            square(body, next);
        }
    ], done);
};
const queue = () => {
    let maximumConcurreny = 5;
    let queue = async.queue(square, maximumConcurreny);

    queue.saturated = () => {
        console.log('saturated');
    };

    queue.empty = () => {
        console.log('empty');
    };

    queue.drain = () => {
        console.log('drain');
    };

    [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].forEach((item) => {
        queue.push(item, (err, result) => {
            console.log(result);
        });
    });
};
const forEachfn = () => {
    async.forEach([1, 2, 3, 4, 5], square, done);
};
const mapFn = () => {
    async.map([1, 2, 3, 4, 5], square, done);
};
const reduceFn = () => {
    let iterator = (memo, item, cb) => {
        square(item, (err, res) => {
            cb(err, memo + res);
        });
    };

    async.reduce([1, 2, 3, 4, 5], 0, iterator, done);
};
const filterFn = () => {
    async.filter([1, 2, 3, 4, 5], function (item, cb) {
        square(item, (err, res) => {
            cb(err, res > 10);
        });
    }, done);
};
const rejectFn = () => {
    async.reject([1, 2, 3, 4, 5], function (item, cb) {
        square(item, (err, res) => {
            cb(err, res > 10);
        });
    }, done);
};
const detect = () => {
    async.detect([1, 2, 3, 4, 5], function (item, cb) {
        square(item, (err, res) => {
            cb(err, res > 10);
        });
    }, done);
};

detect();