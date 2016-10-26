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


socket.on('client connect', (client) => {
  const elem = document.getElementById("clients").getElementsByTagName("tbody")[0];
  
  elem.innerHTML += `
    <tr id="${client.id}">
      <td>${client.id}</td>
    </tr>
  `;
});


socket.on('client disconnect', (client) => {
  const elem = document.getElementById(client.id);
  
  if (elem) {
    elem.remove();
  }
});