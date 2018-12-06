const XlsxPopulate = require('xlsx-populate');

var utm = require('utm');

module.exports = (name) => {
    return new Promise((resolve, reject) => {
        XlsxPopulate.fromFileAsync(`./src/${name}`)
            .then(workbook => {
                const values = [];
                let i = 2;

                while (true) {
                    let locationX = workbook.sheet("Worksheet").cell("B" + i).value();

                    if (!locationX) break;

                    let locationY = +workbook.sheet("Worksheet").cell("C" + i).value();
                    let height = +workbook.sheet("Worksheet").cell("D" + i).value();
                    locationX = +locationX;

                    i++;
                    values.push({
                        x: locationX,
                        y: locationY,
                        height,
                    });
                }

                for (let key in values) {
                    const newPos = utm.toLatLon(values[key].x, values[key].y, 45, 'N');
                    values[key].x = newPos.longitude;
                    values[key].y = newPos.latitude;
                }

                resolve(values);
            });
    });
};


/*
x: locationX + 5354084.5619889215,
y: locationY + 20798.0649616,


{ x: 5908586.91917015, y: 5865533.960580389 }   m
{ y: 52.75001421, x: 87.80744963 }              *
{ latitude: 52.75208816087155, longitude: 87.82949706909764 }


 */