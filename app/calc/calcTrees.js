const config = require('./config'),
    createCircle = require('./createCircle');

module.exports = (start, end, trees, metrix) => {
    const nearTrees = [], zone = {
        maxX: (start.x > end.x ? start.x : end.x) + 50,
        maxY: (start.y > end.y ? start.y : end.y) + 50,
        minX: (start.x < end.x ? start.x : end.x) - 50,
        minY: (start.y < end.y ? start.y : end.y) - 50,
    };
    for (let key in trees) {
        if (trees[key].x > zone.minX && trees[key].x < zone.maxX && trees[key].y > zone.minY && trees[key].y < zone.maxY)
            nearTrees.push(trees[key]);
    }


    const AB = Math.sqrt((start.x - end.x) * (start.x - end.x) + (start.y - end.y) * (start.y - end.y)), notOkTree = [];
    const vector = {x: end.x - start.x, y: end.y - start.y};
    zone.maxX -= 50;
    zone.maxY -= 50;
    zone.minX += 50;
    zone.minY += 50;

    for (let key in nearTrees) {
        const AC = Math.sqrt((start.x - nearTrees[key].x) * (start.x - nearTrees[key].x) + (start.y - nearTrees[key].y) * (start.y - nearTrees[key].y)),
            CB = Math.sqrt((nearTrees[key].x - end.x) * (nearTrees[key].x - end.x) + (nearTrees[key].y - end.y) * (nearTrees[key].y - end.y));

        const p = (AB + AC + CB) / 2;
        const S = Math.sqrt(p * (p - AB) * (p - AC) * (p - CB));
        const h = 2 * S / AB;

        if (h <= nearTrees[key].height + config.size && h > config.sizeZone) {
            const length = AB / h,
                leftVector = {x: -1 * vector.y, y: vector.x},
                rightVector = {x: vector.y, y: -1 * vector.x};

            leftVector.x /= length;
            leftVector.y /= length;
            rightVector.x /= length;
            rightVector.y /= length;

            leftVector.x += nearTrees[key].x;
            leftVector.y += nearTrees[key].y;
            rightVector.x += nearTrees[key].x;
            rightVector.y += nearTrees[key].y;

            if ((leftVector.x > zone.minX && leftVector.x < zone.maxX && leftVector.y > zone.minY && leftVector.y < zone.maxY) ||
                (rightVector.x > zone.minX && rightVector.x < zone.maxX && rightVector.y > zone.minY && rightVector.y < zone.maxY))
                notOkTree.push(nearTrees[key]);
        }
    }

    for (let key in notOkTree) notOkTree[key] = createCircle(notOkTree[key], metrix);
    return notOkTree;
};