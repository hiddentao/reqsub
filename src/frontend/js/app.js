const moment = require('moment');

const socket = io();

socket.on('incoming', function(req) {
  const elem = document.getElementById("requests").getElementsByTagName("tbody")[0];
  
  const qryStr = JSON.stringify(req.query, null, 2);
  
  elem.innerHTML = `
    <tr>
      <td>${moment(req.ts).format()}</td>
      <td><pre>${req.method}</pre></td>
      <td><pre>${qryStr}</pre></td>
      <td><pre>${req.body}</pre></td>
    </tr>
  ` + elem.innerHTML;
});


socket.on('clients', (clients) => {
  const elem = document.getElementById("clients").getElementsByTagName("tbody")[0];
  
  elem.innerHTML = buildClientRows(clients);
});

socket.on('client connect', (client) => {
  const elem = document.getElementById("clients").getElementsByTagName("tbody")[0];
  
  elem.innerHTML += buildClientRows([client]);
});


socket.on('client disconnect', (client) => {
  const elem = document.getElementById(client.id);
  
  if (elem) {
    elem.remove();
  }
});


function buildClientRows(clients) {
  return clients.map((c) => {
    const isMe = (c.id === socket.id);

    let className = isMe ? "me" : '';
    
    return `
      <tr id="${c.id}" class="${className}">
        <td>${c.id}${isMe ? ' (me)' : ''}</td>
      </tr>
    `    
  }).join("");
}


console.log(socket);