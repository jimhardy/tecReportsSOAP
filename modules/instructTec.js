const soap = require('soap-as-promised');
const tecUrl = require('../handlers/tecUrl');

const instructTec = async data => {
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

module.exports = instructTec;
