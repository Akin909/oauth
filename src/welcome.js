const req = require('request');
const url = require('url');
const client_id = process.env.CLIENT_ID;
const bcrypt = require('bcrypt');
const server = require('./server.js');

console.log(server);

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    const query = url.parse(request.url, true).query;
    // const code = query.code;
    // console.log(query.code);
    const gitUrl = 'https://github.com/login/oauth/access_token' + '?client_id=' + client_id + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + query.code;
    req(gitUrl, (err, res, body) => {
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(body, salt)
      const data = { token: hash }
      console.log(hash);
      request.cookieAuth.set(data);
      reply.file('../index.html').state('data', data);
    });
  }
};
