const express = require('express');
const http = require('http');
const { Server: ServerIO } = require('socket.io');
const cors = require('cors');

const Sockets = require('./sockets');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
    // this.io = socketio.Server(this.server, { /* configuraciones */ });
    this.io = new ServerIO(this.server, {
      cors: {
        origin: '*',
        methods: ['GET', 'POST'],
      },
    });

    // Inicializar sockets
    this.sockets = new Sockets(this.io);
  }

  middlewares() {
    // Configurar cors
    this.app.use(cors());
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

module.exports = Server;
