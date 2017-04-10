const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const routes = require('./routes.js');
const fs = require('fs');

const server = new Hapi.Server();

const port = process.env.PORT || 3004;

const tls = { key: fs.readFileSync('./keys/key.pem'),
              cert: fs.readFileSync('./keys/cert.pem')};

server.connection({
  port,
  tls
});

server.register([Inert,Vision],(err) => {
  if (err) {
    throw err;
  }
  server.route(routes);
});



server.start( (err) => {
  if (err) {
    throw err;
  }
  console.log(`Magic happening at port ${server.info.uri}`);
});
