const fs = require('fs'),
    path = require('path'),
    tagReader = require('./getTagData');

module.exports = (name) => {
    return new Promise((resolve, reject) => {
        fs.readFile(path.resolve(`src/${name}`), "utf8", (error,data) => {
            let i = 0;
            const value = [];
            while (true) {
                let id = tagReader('<SimpleData name="id">', '</SimpleData>', i, data);
                if (!id) break;

                i = id.index;
                let position = tagReader('<Point><coordinates>', '</coordinates></Point>', i, data);
                if (!position) break;

                i = position.index;
                let comma = position.line.indexOf(',');

                value.push({
                    id: +id.line,
                    x: +position.line.substring(0, comma),
                    y: +position.line.substring(comma + 1, position.line.length),
                });
            }

            resolve(value);
        });
    });
};