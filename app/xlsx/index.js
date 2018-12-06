const XlsxPopulate = require('xlsx-populate');

module.exports = (name) => {
    return new Promise((resolve, reject) => {
        XlsxPopulate.fromFileAsync(`./src/${name}`)
            .then(workbook => {
                let i = 1;
                const value = [];
                while (true) {
                    let la = workbook.sheet("Лист1").cell("B" + i).value();
                    if (!la || la.indexOf('°', 0) === -1) break;
                    i++;
                    let lo = workbook.sheet("Лист1").cell("B" + i).value();
                    i += 2;

                    la = la.substring(0, la.length - 2);
                    la = +la;
                    lo = lo.substring(0, lo.length - 2);
                    lo = +lo;

                    value.push({y: la, x: lo, id: (i - 1) / 3});
                }

                resolve(value);
            });
    });
};