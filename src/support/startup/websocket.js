"use strict";

const socket = require('socket.io');

const waigo = global.waigo,
  _ = waigo._;




/**
 * Start websocket server
 * 
 * @param {Object} App The application.
 */
module.exports = function*(App) {
  App.logger.info('Starting socket.io');

  App.io = {};
  
  const io = App.io.server = socket();
  io.serveClient(true);
  io.path("");

  const clients = {};
 
  io.on('connection', (socket) => {    
    const id = socket.client.id;
    
    clients[id] = {
      id: id
    };
    
    App.logger.info(`New socket client connected: ${id}`);
    
    io.sockets.emit('client connect', { 
      id: id
    });

    socket.emit('clients', _.values(clients));
    
    socket.on('disconnect', () => {
      App.logger.info(`Socket client disconnected: ${id}`);      
      
      delete clients[id];
      
      io.sockets.emit('client disconnect', { 
        id: id
      });
    });
  });
  
  io.attach(App.server, {
    path: '/socket.io'
  });
};




