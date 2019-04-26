'use strict';

const hapi = require('hapi');
const postRoute = require('./routes/postRoute');

// server config
const init = async () => {
  const server = hapi.server({
    port: 3000,
    host: 'localhost'
  });

 // routes
  server.route(postRoute);

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
