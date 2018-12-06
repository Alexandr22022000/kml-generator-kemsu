const calc = require('./app/calc'),
    kmlReader = require('./app/kml/pointsReader'),
    kml = require('./app/kml'),
    xlsx = require('./app/xlsx/temp'),
    xlsxTrees = require('./app/xlsx/getTrees'),
    sortById = require('./app/sort/id'),
    sortByPosition = require('./app/sort/position');

const SORT = {NONE: 0, POSITION: 1, ID: 2, ALL: 3};


const srcFilename = 'project3/points3.xlsx',
    srcTreesFilenames = ['project3/trees3-1.xlsx', 'project3/trees3-2.xlsx', 'project3/trees3-3.xlsx', 'project3/trees3-4.xlsx', 'project3/trees3-5.xlsx', 'project3/trees3-6.xlsx', 'project3/trees3-7.xlsx'],
    publicName = 'project03',
    sort = SORT.ALL;

const gotTrees = (treesAll, i, points) => {
    if (i === srcTreesFilenames.length) {
        kml(calc(points, treesAll), publicName);
    }
    else {
        xlsxTrees(srcTreesFilenames[i]).then((trees) => {
            treesAll = [...treesAll, ...trees];
            i++;
            gotTrees(treesAll, i, points);
        });
    }
};

const work = (points) => {
    if (sort === SORT.ID || sort === SORT.ALL)
        points = sortById(points);

    if (sort === SORT.POSITION || sort === SORT.ALL)
        points = sortByPosition(points);

    if (!srcTreesFilenames || srcTreesFilenames.length === 0) {
        kml(calc(points), publicName);
    }
    else {
        gotTrees([], 0, points);
    }
};

if (srcFilename.indexOf('.kml') !== -1)
    kmlReader(srcFilename).then(work);
else
    xlsx(srcFilename).then(work);