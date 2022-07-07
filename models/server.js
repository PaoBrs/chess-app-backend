/* eslint-disable global-require */
const express = require('express');
const http = require('http');
const { Server: ServerIO } = require('socket.io');
const cors = require('cors');
const Sockets = require('./sockets');
const connectDB = require('../config/database');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    connectDB();
    this.paths = {
      users: '/api/users',
      games: '/api/games',
    };

    // Http server
    this.server = http.createServer(this.app);

    // Configuraciones de sockets
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
    this.app.use(express.json());
  }

  routes() {
    this.app.use(this.paths.users, require('../routes/users.routes'));
    this.app.use(this.paths.games, require('../routes/games.routes'));
  }

  execute() {
    // Inicializar Middlewares
    this.middlewares();
    this.routes();

    // Inicializar Server
    this.server.listen(this.port, () => {
      console.log('Server corriendo en puerto:', this.port);
    });
  }
}

module.exports = Server;
