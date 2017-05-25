let eventEmitter = require('events').EventEmitter,
    util = require('util');

function Timer (tick = 0) {
    this.tick = tick;

    setTimeout(updateTick.bind(this), 1000);

    function updateTick () {
        console.log('emit');
        this.emit('tick', this.tick++);
    }
}

util.inherits(Timer, eventEmitter);

module.exports = Timer;