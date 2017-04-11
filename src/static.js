module.exports = {
  method: 'GET',
  path: '/',
  config: {
    auth: false,
  },
    handler: function(request,reply) {
    if (request.auth.isAuthenticated) {
      console.log('jello!');
      console.log(request.auth.credentials);
      return reply.file('../index.html');
    } else {
      reply.file('../index.html')
    }
  },
}
