const Board = require('./board');

class BoardFactory {
  static newBoard() {
    return new Board();
  }
}

module.exports = BoardFactory;
