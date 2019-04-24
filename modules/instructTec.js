const soap = require('soap-as-promised');
const tecUrl = require('../handlers/tecURL');
const xmlDataConvert = require('./xmlDataConvert');


let jsData = xmlDataConvert.xmlToJs(req.payload);
const instructTec = async (jsData) => {
    try {
      const soapClient = await soap.createClient(tecUrl, {
        disabledCache: true
      });
      const instruct = await soapClient.InvokeInstructRead({
        objInstruct: jsData
      });
      const response = xmlDataConvert.xmlToJs(instruct);
      return response;

    } catch (Err) {
      console.log('FAILED:');
      console.log(Err);
    }
  };

  module.exports = instructTec;

//     let callResponse;
//     try {
//       callResponse = await instructTec(jsData);
//       console.log('call response: ', callResponse);
//     } catch (error) {
//       console.log(error);
//     }
//     callResponse = convert.js2xml(callResponse, { compact: true, spaces: 2 });
//     return callResponse;
//     // return xmlResponse;


// // module.exports = xmlDataConvert;
