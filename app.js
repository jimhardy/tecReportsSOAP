'use strict';

const hapi = require('hapi');
const postToTecReports = require('./routes/postToTecReports');

// server config
const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost'
  });

  // message on server start
  await server.start();
  console.log('Server running on ', server.info.uri);
};

// start hapi server
process.on('unhandledRejection', err => {
  console.log(err);
  process.exit(1);
});

init();
