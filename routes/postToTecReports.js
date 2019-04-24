// const xmlDataConvert = require('../modules/xmlDataConvert');
const instructTec = require('../modules/instructTec');
  
  // routes
  const postRoute = server.route({
    method: 'POST',
    path: '/',
    handler: instructTec(req.payload)
  });

  module.exports = postRoute;
