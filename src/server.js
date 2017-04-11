const Hapi = require('hapi');
const Inert = require('inert');
const Vision = require('vision');
const routes = require('./routes.js');
const fs = require('fs');
const jwt = require('hapi-auth-jwt2');

const server = new Hapi.Server();

const port = process.env.PORT || 3004;

const tls = { key: fs.readFileSync('./keys/key.pem'),
              cert: fs.readFileSync('./keys/cert.pem')};

server.connection({
  port,
  tls
});

server.register([Inert,Vision,jwt],(err) => {
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

const people = {

    id:18493541,
    login:"antoniotrkdz"

}

const validate = (token,request,callback) => {
  console.log('=========',token);
  console.log('people',people.id===token.user.user_id);
  if (!people.id === token.user.user_id) {
    console.log('false');
    return callback(null,false);
  }
  console.log('true');
  return callback(null,true);
};

const strategyOptions = {
  key: process.env.SECRET,
  validateFunc: validate,
  verifyOptions: {algorithms: [ 'HS256' ] }
}


server.auth.strategy('jwt', 'jwt', strategyOptions);

server.state('data', {
    ttl: null,
    isSecure: true,
    isHttpOnly: true,
    encoding: 'base64json',
    clearInvalid: false, // remove invalid cookies
    strictHeader: true // don't allow violations of RFC 6265
})
module.exports = server;
