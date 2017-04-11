const req = require('request');
const url = require('url');
const client_id = process.env.CLIENT_ID;
const bcrypt = require('bcrypt');
const server = require('./server.js');
const querystring = require('querystring');


module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    const query = url.parse(request.url, true).query;
    // const code = query.code;
    console.log(query.code);
    const gitUrl = 'https://github.com/login/oauth/access_token' + '?client_id=' + client_id + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + query.code;
    req(gitUrl, (err, res, body) => {
      const salt = bcrypt.genSaltSync(5);
      const hash = bcrypt.hashSync(body, salt)
      const data = { token: hash }

      const gitReqUrl = `https://api.github.com/user`
      const parsedToken = querystring.parse(body).access_token;

      const headers = {
        'User-Agent': 'oauth_github_jwt',
        Authorization: `token ${parsedToken}`
      };

      console.log('token', parsedToken);
      req.get({url:gitReqUrl, headers:headers}, function (error, response, body) {
        console.log('request',body);


      })
      reply('index').state('data', data);
    });
  }
};
