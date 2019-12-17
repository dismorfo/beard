const fetch = require('node-fetch');

const {
  BEARD_DISCOVERY
} = process.env;

exports.handler = async (event, context) => {
  const q = event.queryStringParameters.q || '';
  return fetch(`${BEARD_DISCOVERY}/select?q=${q}&wt=json`)
    .then(response => response.json())
    .then(data => ({
        statusCode: 200,
        body: JSON.stringify(data)
      })
    )
    .catch(error => ({ statusCode: 422, body: String(error) }));
};
