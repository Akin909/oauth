const req = require('request');
const url = require('url');
const client_id = process.env.CLIENT_ID;

module.exports = {
  method: 'GET',
  path: '/welcome',
  handler: (request, reply) => {
    const query = url.parse(request.url,true).query
    // const code = query.code;
    console.log(query.code);
    const gitUrl = 'https://github.com/login/oauth/access_token' + '?client_id=' + client_id + '&client_secret=' + process.env.CLIENT_SECRET + '&code=' + query.code;
    req(gitUrl, (err,res,body) => {
      reply.file('index.html');
      const access_token = body;
    });
  }
}
