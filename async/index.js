const getName = () => {
    "use strict";
    return new Promise(function (resolve, reject) {
        setTimeout(() => {
            resolve('Karina')
        }, 500);
    })
};

const getLastName = (name) => {
    return new Promise(function (resolve, reject) {
        if (name === 'Karina') {
            resolve('Shatokhina');
        } else {
            // reject();
            resolve('Default');
        }
    });
};

async function getData () {
    "use strict";
    var name = await getName(),
        lastName;

    try {
        lastName = await getLastName(name)
    } catch (e) {
        lastName = 'Default';
    }

    return `${name} ${lastName}`;
}

async function getAll () {
    "use strict";
    return await Promise.all([getName(), getLastName()]);
}

module.exports = {
    getData: getData(),
    getAll: getAll
};