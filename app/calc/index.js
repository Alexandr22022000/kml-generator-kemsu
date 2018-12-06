const metrix = require('./metix'),
    config = require('./config'),
    calcVectors = require('./calcVectors'),
    calcTrees = require('./calcTrees');

module.exports = (points, trees) => {
    const metixValue = metrix(points[0]),
        newPoints = [];

    for (let key in points)
        newPoints.push({x: points[key].x * metixValue.x, y: points[key].y * metixValue.y});

    if (trees)
        for (let key in trees) {
            trees[key].x *=  metixValue.x;
            trees[key].y *=  metixValue.y;
        }

    const zones = [];
    for (let i = 0; i < newPoints.length - 1; i++) {
        const vector = {x: newPoints[i + 1].x - newPoints[i].x, y: newPoints[i + 1].y - newPoints[i].y},
            reversVector = {x: newPoints[i].x - newPoints[i + 1].x, y: newPoints[i].y - newPoints[i + 1].y};

        const startPoints = calcVectors(vector, newPoints[i], metixValue),
            endPoints = calcVectors(reversVector, newPoints[i + 1], metixValue);

        zones.push({
            zone: {
                a: startPoints.zone.right,
                b: startPoints.zone.left,
                c: endPoints.zone.right,
                d: endPoints.zone.left,
            },
            line: {
                a: startPoints.box.right,
                b: startPoints.box.left,
                c: endPoints.box.right,
                d: endPoints.box.left,
            },
            start: points[i],
            end: points[i + 1],
            S: config.sizeZone * 2 * Math.sqrt(vector.x * vector.x + vector.y * vector.y),
            trees: trees ? calcTrees(newPoints[i], newPoints[i + 1], trees, metixValue) : null,
        });
    }

    //PRINT_ALL_TREES TEST ONLY!!!!
    //*
    const printTrees = require('../kml/createCircleFile'),
        createCircle = require('./createCircle');
    const allTrees = [];
    for (let key in trees) allTrees.push(createCircle(trees[key], metixValue));
    printTrees([{trees: allTrees}], "ALL_TREES", 0);
    //*/

    return zones;
};