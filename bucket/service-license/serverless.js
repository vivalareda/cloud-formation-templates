const serverless = require('serverless-http');
const server = require('./index');

module.exports.handler = serverless(server, {
  request: function (req, event, context) {
    req.event = event;
    req.context = context;
  }
});