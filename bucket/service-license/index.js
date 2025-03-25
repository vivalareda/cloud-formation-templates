const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet'); // protect againts known vulnerability
const server = express();

// Load app config
const config = require("./configs/Config");

server.use(morgan('combined'));
server.use(
  express.urlencoded({
    extended: true
  })
);

server.use(express.json());
server.use(cors());
server.use(helmet());

module.exports = server;
require("./routes/MainRoute")(server);

let isLambda = process.env.IND250_SECURE_SERVER_IS_LAMBDA || 0;

if (isLambda !== 1) {
  console.log('Start as standalone on localhost:' + config.port);
  server.listen(config.port);
} else console.log('Start as serverless');
