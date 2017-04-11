module.exports = {
  method:'GET',
  path: '/secure',
  config: {auth:'jwt'},
  handler: (request,reply) => {
    reply('it is secure');
  }
}
