const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const routes = require('./routes.js');
const fs = require('fs');
const cookieAuth = require('hapi-auth-cookie')

const server = new Hapi.Server();

const port = process.env.PORT || 3004;

const tls = { key: fs.readFileSync('./keys/key.pem'),
              cert: fs.readFileSync('./keys/cert.pem')};

server.connection({
  port,
  tls
});

server.register([Inert,Vision,cookieAuth],(err) => {
  if (err) {
    throw err;
  }

  const options = {
    password: '12345678901234567890123456789012345678901234567890123456789012345678901234567890',
    cookie: 'Success',
    isSecure: false,
    ttl: 2 * 60 * 1000,
    };


  server.auth.strategy('base','cookie','optional', options);
  //  server.auth.default('cookie');
  server.route(routes);
});



server.start( (err) => {
  if (err) {
    throw err;
  }
  console.log(`Magic happening at port ${server.info.uri}`);
});


server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
})
module.exports = server;
