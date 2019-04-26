const tecReportsHandler = require('../../handlers/tecReports');

const tecReportsRoutes = [
  {
    method: 'POST',
    path: '/api/tecinstruct',
    options: {
      handler: tecReportsHandler.instruct
    }
  }
];

module.exports = tecReportsRoutes;
