// const xmlDataConvert = require('../modules/xmlDataConvert');
const instructTec = require('../modules/instructTec');
const xmlDataConvert = require('../modules/xmlDataConvert');


module.exports = {
    method: 'POST',
    path: '/',
    handler: instructTec(xmlDataConvert.xmlToJs(payload))
  };
