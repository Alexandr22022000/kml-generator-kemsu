module.exports = (start, end) => {
    const R = 6371000, rad = Math.PI / 180;
    let lat1 = start.y,
        lon1 = start.x,
        lat2 = end.y,
        lon2 = end.x;

    lat1 *= rad;
    lon1 *= rad;
    lat2 *= rad;
    lon2 *= rad;

    let sin1 = Math.sin((lat1-lat2)/2);
    let sin2 = Math.sin((lon1-lon2)/2);
    return 2 * R * Math.asin(Math.sqrt(sin1 * sin1 + sin2 * sin2 * Math.cos(lat1)*Math.cos(lat2)));
};