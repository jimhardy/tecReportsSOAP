const soap = require('soap-as-promised');
const convert = require('xml-js');
const Boom = require('@hapi/boom');

const instruct = async (req, h) => {
  const tecUrl = process.env.TECURL;

  try {
    const jsData = convert.xml2js(req.payload, { compact: true, spaces: 2 });

    const soapClient = await soap.createClient(tecUrl, {
      disabledCache: true
    });

    const result = await soapClient.InvokeInstructRead({
      objInstruct: jsData
    });

    console.log('call response: ', result);

    const callResponse = convert.js2xml(result, {
      compact: true,
      spaces: 2
    });

    console.log(callResponse);

    return h.response(callResponse).code(200);
  } catch (err) {
    console.log('Error: ', err);
    return Boom.badRequest(err);
  }
};

module.exports = {
  instruct
};
