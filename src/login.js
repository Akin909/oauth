const env = require('env2');
env('config.env');

module.exports = {
  method:'GET',
  path:'/login',
  handler: (request, reply) => {
    reply.redirect('https://github.com/login/oauth/authorize');
  }
};
