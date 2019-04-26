const convert = require('xml-js');
const instructTec = require('../modules/instructTec');

module.exports = {
        method: 'POST',
        path: '/',
        handler: async (req) => {
          const jsData = convert.xml2js(req.payload, { compact: true, spaces: 2 });
          let callResponse;
          try {
            callResponse = await instructTec(jsData);
            console.log('call response: ', callResponse);
          } catch (error) {
            console.log(error);
          }
          callResponse = convert.js2xml(callResponse, { compact: true, spaces: 2 });
          return callResponse;
        }
};
