const letterToNumber = require('../utils/letterToNumber');
const { PieceFactory } = require('./piece');
const Tile = require('./tile');

class TileFactory {
  static newTile(x, y, piece) {
    return new Tile(x, y, piece);
  }

  static newTilePGN(type, x, y) {
    const piece = PieceFactory.newPiecePGN(type, x, y);
    return new Tile(x, letterToNumber[y], piece);
  }

  static newTileWithPieceCoords(x, y, color, type) {
    const piece = PieceFactory.newPieceByTypeAndColor(color, type);
    return new Tile(x, y, piece);
  }
}

module.exports = TileFactory;
