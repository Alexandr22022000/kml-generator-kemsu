const calc = require('./app/calc'),
    kml = require('./app/kml'),
    xlsx = require('./app/xlsx'),
    xlsxTrees = require('./app/xlsx/getTrees');


const xlsxFilename = 'data',
    xlsxTreesFilename = 'trees',
    kmlFilename = 'test';


xlsx(xlsxFilename).then((points) => {
    if (!xlsxTreesFilename || xlsxTreesFilename === '') {
        kml(calc(points), kmlFilename);
    }
    else {
        xlsxTrees(xlsxTreesFilename).then((trees) => {
            kml(calc(points, trees), kmlFilename);
        });
    }
});