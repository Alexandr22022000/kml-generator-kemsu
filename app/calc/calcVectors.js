const calcPoint = require('./calcPoint'),
    config = require('./config');

module.exports = (vector, startPoint, metrix) => {
    let leftVector = {
        x: -1 * vector.y,
        y: vector.x,
    };
    let rightVector = {
        x: vector.y,
        y: -1 * vector.x,
    };

    return {
        box: {
            left: calcPoint(leftVector, startPoint, metrix, config.size),
            right: calcPoint(rightVector, startPoint, metrix, config.size),
        },
        zone: {
            left: calcPoint(leftVector, startPoint, metrix, config.sizeZone),
            right: calcPoint(rightVector, startPoint, metrix, config.sizeZone),
        },
    };
};