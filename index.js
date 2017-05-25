var getAsyncData = require('./async').getAll;

async function dataFn () {
    "use strict";
    var [name, lastName] = await getAsyncData();

    console.log(name);
    console.log(lastName);
}

dataFn()

