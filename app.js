"use strict";

const hapi = require("hapi"),
  soap = require("soap-as-promised"),
  xml = require("xml"),
  bodyParser = require("body-parser"),
  convert = require("xml-js");

// server config
const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: "localhost"
  });

  // routes
  server.route({
    method: "POST",
    path: "/",
    handler: (req, h) => {
      //  console.log(req.payload);
      let jsData = convert.xml2js(req.payload, { compact: true, spaces: 2 });
      //  console.log( jsData);
      instructTec(jsData);
      return null;
    }
  });

  // message on server start
  await server.start();
  console.log("Server running on ", server.info.uri);
};

let instructTec = async data => {
  const tecUrl = "https://cfws.tecreports.co.uk/CFWSInstruct.asmx?WSDL";
  try {
    const soapClient = await soap.createClient(tecUrl, {
      disabledCache: true
    });

    await soapClient.InvokeInstructRead({
      SESSIONCODE: "?",
      ERRCODE: 0,
      ERRMSG: "?",
      objInstruct: data
    });
  } catch (Err) {
    console.log("FAILED:");
    console.log(Err);
  }
};

// start hapi server
process.on("unhandledRejection", err => {
  console.log(err);
  process.exit(1);
});

init();
