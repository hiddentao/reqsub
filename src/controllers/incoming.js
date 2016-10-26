exports.hook = function*() {
  const io = this.App.io;
  
  io.server.emit('incoming', {
    ts: Date.now(),
    method: this.request.method,
    body: this.request.body,
    query: JSON.stringify(this.request.query),
  });
  
  this.body = 'ok';
};

