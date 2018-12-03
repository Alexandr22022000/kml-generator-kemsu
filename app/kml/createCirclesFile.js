const fs = require('fs'),
    path = require('path');

module.exports = (zones, name) => {
    let dataLine = "";

    for (let zoneKey in zones) {
        let zoneLine = "";

        for (let key in zones[zoneKey].trees) {
            let points = "";
            for (let keyy in zones[zoneKey].trees[key].points) {
                points += zones[zoneKey].trees[key].points[keyy].x + "," + zones[zoneKey].trees[key].points[keyy].y + " ";
            }
            points = points.substring(0, points.length - 1);

            zoneLine += `
                <Placemark>
                        <Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
                        <ExtendedData><SchemaData schemaUrl="#${name}-trees">
                            <SimpleData name="id">${key}</SimpleData>
                            <SimpleData name="height">${zones[zoneKey].trees[key].height}</SimpleData>
                        </SchemaData></ExtendedData>
                        <MultiGeometry><Polygon><outerBoundaryIs><LinearRing><coordinates>${points}</coordinates></LinearRing></outerBoundaryIs></Polygon></MultiGeometry>
                </Placemark>
                
                <Placemark>
                    <Point><coordinates>${zones[zoneKey].trees[key].center.x},${zones[zoneKey].trees[key].center.y}</coordinates></Point>
                </Placemark>
            `;
        }

        if (zoneLine.length !== 0) {
            dataLine += `
                <Folder><name>${name}-${+zoneKey + 1}-${+zoneKey + 2}-trees</name>
                    ${zoneLine}
                </Folder>
            `;
        }
    }


    dataLine = `<?xml version="1.0" encoding="utf-8" ?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document id="root_doc">
        <Schema name="${name}-trees" id="${name}-trees">
            <SimpleField name="id" type="float"></SimpleField>
        </Schema>
        ${dataLine}
    </Document></kml>
    `;

    fs.writeFile(path.resolve(`public/${name}/${name}-trees.kml`), dataLine, () => {});
};