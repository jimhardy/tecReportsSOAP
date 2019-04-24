
// const instructTec = require('./instructTec');
const convert = require('xml-js');


// data = req.payload
const xmlToJs = (data) => {
    return convert.xml2js(data, { compact: true, spaces: 2 });
};

// data = callResponse
const jsToXml = (data) => {
    return callResponse = convert.js2xml(data, { compact: true, spaces: 2 });
};

module.exports = {
    xmlToJs,
    jsToXml
};
