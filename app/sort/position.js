const getLength = require('../calc/getLength');

module.exports = (array) => {
    let activeKey, minId = 999999;
    for (let key in array)
        if (array[key].id < minId) {
            activeKey = key;
            minId = array[key].id;
        }

    const values = [];
    while (array.length !== 0) {
        values.push(array[activeKey]);
        array.splice(activeKey, 1);

        let minLength = 99999999999999999999999;
        for (let key in array) {
            let length = getLength(values[values.length - 1], array[key]);
            if (length < minLength) {
                activeKey = key;
                minLength = length;
            }
        }
    }

    return values;
};