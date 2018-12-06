module.exports = (start, end, i, data) => {
    let startIndex = data.indexOf(start, i + 1);
    if (startIndex === -1) return null;

    startIndex += start.length;
    let endIndex = data.indexOf(end, startIndex - 1);

    return {line: data.substring(startIndex, endIndex), index: endIndex + end.length};
};