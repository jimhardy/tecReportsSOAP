"use strict";

const Hapi = require("hapi"),
  soap = require("soap-as-promised"),
  xml = require("xml");

// server config
const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost"
  });

  // routes
  server.route({
    method: "GET",
    path: "/",
    handler: (req, h) => {
      return instructTec(req);
    }
  });

  // message on server start
  await server.start();
  console.log("Server running on %ss", server.info.uri);
};


let instructTec = async data => {
  const tecUrl = "https://cfws.tecreports.co.uk/CFWSInstruct.asmx?WSDL";
  try {
    const soapClient = await soap.createClient(tecUrl, {
      disabledCache: true
    });

    await soapClient.InvokeInstructRead({
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
