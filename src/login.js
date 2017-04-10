const env = require('env2');
env('config.env');
const client_id = process.env.CLIENT_ID;

module.exports = {
  method:'GET',
  path:'/login',
  handler: (request, reply) => {
    reply.redirect('https://github.com/login/oauth/authorize' +'?client_id=' + client_id + '&redirect_uri=' + process.env.BASE_URL + 'welcome');
  }
};
