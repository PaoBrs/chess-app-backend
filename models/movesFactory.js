const Moves = require('./moves');

class MovesFactory {
  static newMoves() {
    return new Moves();
  }
}

module.exports = MovesFactory;
