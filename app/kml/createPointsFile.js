const fs = require('fs'),
    path = require('path');

module.exports = (polygons, name) => {
    let dataLine = "";

    for (let key in polygons) {
        key = +key;
        dataLine += `
        <Folder><name>point-${name}-${key + 1}-${key + 2}</name>
            <Placemark>
                <Point><coordinates>${polygons[key].start.x},${polygons[key].start.y}</coordinates></Point>
            </Placemark>
            <Placemark>
                <Point><coordinates>${polygons[key].end.x},${polygons[key].end.y}</coordinates></Point>
            </Placemark>
        </Folder>
        `;
    }


    dataLine = `<?xml version="1.0" encoding="utf-8" ?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document id="root_doc">
        <Schema name="${name}-points" id="${name}-points">
            <SimpleField name="id" type="float"></SimpleField>
        </Schema>
        ${dataLine}
    </Document></kml>
    `;

    fs.writeFile(path.resolve(`public/${name}/points-${name}.kml`), dataLine, () => {});
};