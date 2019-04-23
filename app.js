'use strict';

const hapi = require('hapi');
const soap = require('soap-as-promised');
  // const xml = require('xml');
  // const bodyParser = require('body-parser');
const convert = require('xml-js');

// server config
const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // routes
  server.route({
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
      // return xmlResponse;
    }
  });

  // message on server start
  await server.start();
  console.log('Server running on ', server.info.uri);
};

const instructTec = async data => {
  const tecUrl = 'https://cfws.tecreports.co.uk/CFWSInstruct.asmx?WSDL';
  try {
    const soapClient = await soap.createClient(tecUrl, {
      disabledCache: true
    });

    const instruct = await soapClient.InvokeInstructRead({
      objInstruct: data
    });
    return instruct;
  } catch (Err) {
    console.log('FAILED:');
    console.log(Err);
  }
};

// start hapi server
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
