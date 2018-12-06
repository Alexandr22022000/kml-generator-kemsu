const fs = require('fs'),
    path = require('path');

module.exports = (polygons, name) => {
    let dataLine = "";

    for (let key in polygons) {
        key = +key;
        dataLine += `
        <Folder><name>${name}-${key + 1}-${key + 2}</name>
            <Placemark>
                <Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
                <ExtendedData><SchemaData schemaUrl="#${name}-${key + 1}-${key + 2}">
                    <SimpleData name="id">${key * -1 - 1}</SimpleData>
                    <SimpleData name="start">${key + 1}</SimpleData>
                    <SimpleData name="end">${key + 2}</SimpleData>
                    <SimpleData name="type">1</SimpleData>
                </SchemaData></ExtendedData>
                <MultiGeometry><Polygon><outerBoundaryIs><LinearRing><coordinates>${polygons[key].line.a.x},${polygons[key].line.a.y} ${polygons[key].line.b.x},${polygons[key].line.b.y} ${polygons[key].line.c.x},${polygons[key].line.c.y} ${polygons[key].line.d.x},${polygons[key].line.d.y} ${polygons[key].line.a.x},${polygons[key].line.a.y}</coordinates></LinearRing></outerBoundaryIs></Polygon></MultiGeometry>
            </Placemark>
        
            <Placemark>
                <Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
                <ExtendedData><SchemaData schemaUrl="#${name}-${key + 1}-${key + 2}">
                    <SimpleData name="id">${key}</SimpleData>
                    <SimpleData name="start">${key + 1}</SimpleData>
                    <SimpleData name="end">${key + 2}</SimpleData>
                    <SimpleData name="S">${polygons[key].S}</SimpleData>
                    <SimpleData name="type">0</SimpleData>
                </SchemaData></ExtendedData>
                <MultiGeometry><Polygon><outerBoundaryIs><LinearRing><coordinates>${polygons[key].zone.a.x},${polygons[key].zone.a.y} ${polygons[key].zone.b.x},${polygons[key].zone.b.y} ${polygons[key].zone.c.x},${polygons[key].zone.c.y} ${polygons[key].zone.d.x},${polygons[key].zone.d.y} ${polygons[key].zone.a.x},${polygons[key].zone.a.y}</coordinates></LinearRing></outerBoundaryIs></Polygon></MultiGeometry>
            </Placemark>
        </Folder>
        `;
    }


    dataLine = `<?xml version="1.0" encoding="utf-8" ?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document id="root_doc">
        <Schema name="${name}" id="${name}">
            <SimpleField name="id" type="float"></SimpleField>
        </Schema>
        ${dataLine}
    </Document></kml>
    `;

    fs.writeFile(path.resolve(`public/${name}/${name}.kml`), dataLine, () => {});
};