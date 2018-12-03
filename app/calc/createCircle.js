module.exports = (tree, metrix) => {
    const points = [], steps = 90, step = 360 / steps, rad = Math.PI / 180;
    let angle = 0;

    while (angle < 360) {
        const radAngle = angle * rad;
        let x = tree.height * Math.cos(radAngle);
        let y = tree.height * Math.sin(radAngle);

        x += tree.x;
        y += tree.y;

        points.push({
            x: x / metrix.x,
            y: y / metrix.y,
        });
        angle += step;
    }

    return {
        points,
        center: {x: tree.x / metrix.x, y: tree.y / metrix.y},
        height: tree.height,
    };
};