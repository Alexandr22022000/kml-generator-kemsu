module.exports = (vector, startPoint, metrix, size) => {
    let vectorLength = Math.sqrt(vector.x * vector.x + vector.y * vector.y);
    vectorLength /= size;

    vector.x /= vectorLength;
    vector.y /= vectorLength;

    let point = {x: startPoint.x + vector.x, y: startPoint.y + vector.y};

    point.x /= metrix.x;
    point.y /= metrix.y;

    return point;
};