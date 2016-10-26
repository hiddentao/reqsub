module.exports = {
  '/incoming': {
    GET: 'incoming.hook',
    POST: 'incoming.hook',
    DELETE: 'incoming.hook',
    PUT: 'incoming.hook',
  },
  '/': {
    GET: 'index.main',
  },
};