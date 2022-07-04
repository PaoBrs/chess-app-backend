/* eslint-disable no-unused-vars */
class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      console.log('cliente conectado', socket.id);

      socket.on('movePiece', (xFrom, yFrom, xTo, yTo) => {
        // console.log({
        //   xFrom, yFrom, xTo, yTo,
        // });

        this.io.emit('movePieceBack', xFrom, yFrom, xTo, yTo);
      });
    });
  }
}

module.exports = Sockets;
