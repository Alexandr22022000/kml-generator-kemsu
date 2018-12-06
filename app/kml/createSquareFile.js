const fs = require('fs'),
    path = require('path');

module.exports = (polygon, key, name) => {
    const dataLine = `<?xml version="1.0" encoding="utf-8" ?>
<kml xmlns="http://www.opengis.net/kml/2.2">
    <Document id="root_doc">
        <Schema name="${name}-${key + 1}-${key + 2}" id="${name}-${key + 1}-${key + 2}">
            <SimpleField name="id" type="float"></SimpleField>
        </Schema>
        <Folder><name>${name}-${key + 1}-${key + 2}</name>
            <Placemark>
                <Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
                <ExtendedData><SchemaData schemaUrl="#${name}-${key + 1}-${key + 2}">
                    <SimpleData name="id">${key * -1 - 1}</SimpleData>
                    <SimpleData name="start">${key + 1}</SimpleData>
                    <SimpleData name="end">${key + 2}</SimpleData>
                    <SimpleData name="type">1</SimpleData>
                </SchemaData></ExtendedData>
                <MultiGeometry><Polygon><outerBoundaryIs><LinearRing><coordinates>${polygon.line.a.x},${polygon.line.a.y} ${polygon.line.b.x},${polygon.line.b.y} ${polygon.line.c.x},${polygon.line.c.y} ${polygon.line.d.x},${polygon.line.d.y} ${polygon.line.a.x},${polygon.line.a.y}</coordinates></LinearRing></outerBoundaryIs></Polygon></MultiGeometry>
            </Placemark>
        
            <Placemark>
                <Style><LineStyle><color>ff0000ff</color></LineStyle><PolyStyle><fill>0</fill></PolyStyle></Style>
                <ExtendedData><SchemaData schemaUrl="#${name}-${key + 1}-${key + 2}">
                    <SimpleData name="id">${key}</SimpleData>
                    <SimpleData name="start">${key + 1}</SimpleData>
                    <SimpleData name="end">${key + 2}</SimpleData>
                    <SimpleData name="S">${polygon.S}</SimpleData>
                    <SimpleData name="type">0</SimpleData>
                </SchemaData></ExtendedData>
                <MultiGeometry><Polygon><outerBoundaryIs><LinearRing><coordinates>${polygon.zone.a.x},${polygon.zone.a.y} ${polygon.zone.b.x},${polygon.zone.b.y} ${polygon.zone.c.x},${polygon.zone.c.y} ${polygon.zone.d.x},${polygon.zone.d.y} ${polygon.zone.a.x},${polygon.zone.a.y}</coordinates></LinearRing></outerBoundaryIs></Polygon></MultiGeometry>
            </Placemark>
        </Folder>
    </Document></kml>
    `;

    fs.writeFile(path.resolve(`public/${name}/${name}-${key + 1}-${key + 2}.kml`), dataLine, () => {});
};