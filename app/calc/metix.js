const getLength = require('./getLength');

module.exports = (point) => {
    const lengthX = getLength(point, {x: point.x + 1, y: point.y});
    return {x: lengthX, y: 111194.92664455889};
};