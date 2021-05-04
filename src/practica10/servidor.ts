import * as net from 'net';
import { watchFile } from 'fs';
import { Server } from 'node:http';


/**
 * 
 */
const server = net.createServer({allowHalfOpen:true} ,(connection) => {
  console.log('A client has connected.');

  server.on('data', (dataJSON) => {
    console.log(dataJSON.toString());
    const message = JSON.parse(dataJSON.toString());
  })

  server.on('close', () => {
    console.log('A client has disconnected.');
  });
}).listen(60300, () => {
  console.log('Waiting for clients to connect.');
});
