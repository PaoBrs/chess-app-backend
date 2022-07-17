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

      socket.on('createGame', async (event) => {
        if (event === 'newGameCreated') {
          const games = await gamesModels.find({ isCompleted: false });
          this.io.emit('refreshCreatedGames', games);
        }
      });

      socket.on('playerConnected', async (roomCode, player1, player2, username) => {
        const message = `${player1 !== '' ? `${player1} connected` : `${player1} Not connected`}  |  ${player2 !== '' ? `${player2} connected` : `${player2} Not connected`} `;
        this.io.emit('playerConnectedBack', player1, player2, message);
      });
    });
  }
}

module.exports = Sockets;
