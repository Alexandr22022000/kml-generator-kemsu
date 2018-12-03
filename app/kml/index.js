const createSquaresFile = require('./createSquaresFile'),
    createSquareFile = require('./createSquareFile'),
    createPointsFile = require('./createPointsFile'),
    createCirclesFile = require('./createCirclesFile'),
    path = require('path'),
    fs = require('fs');

module.exports = (polygons, name) => {
    fs.mkdir(path.resolve(`public/${name}`), () => {
        createSquaresFile(polygons, name);
        createPointsFile(polygons, name);

        if (polygons[0].trees) createCirclesFile(polygons, name);

        for (let key in polygons) {
            createSquareFile(polygons[key], +key, name);
        }
    });
};