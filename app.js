const hapi = require('hapi');
const routes = require('./routes');

require('dotenv').config();

// server config
const init = async () => {
  const server = hapi.server({
    port: process.env.PORT,
    host: process.env.HOST
  });

  // routes
  server.route(routes);

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
