const gamesModels = require('../modelsDB/games.models');

/* eslint-disable no-unused-vars */
class Sockets {
  constructor(io) {
    this.io = io;

    this.socketEvents();
  }

  socketEvents() {
    // On connection
    this.io.on('connection', (socket) => {
      socket.on('movePiece', (xFrom, yFrom, xTo, yTo) => {
        this.io.emit('movePieceBack', xFrom, yFrom, xTo, yTo);
      });

      socket.on('boardChange', async (board, roomCode, turn) => {
        const game = await gamesModels.findOne({ roomCode });
        game.positions = board;
        game.turn = turn;
        game.save();

        this.io.emit('boardChangedBack', board, turn);
      });

      socket.on('requestBoard', async (getBoard, roomCode) => {
        if (getBoard === 'getBoard') {
          const game = await gamesModels.findOne({ roomCode });
          socket.emit('savedBoard', game.positions, game.turn);
        }
      });
    });
  }
}

module.exports = Sockets;
