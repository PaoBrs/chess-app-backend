const Piece = require('./piece');

const pgnToName = {
  r: 'rook',
  b: 'bishop',
  q: 'queen',
  k: 'king',
  n: 'knight',
};

class PieceFactory {
  static newPiecePGN(type, x) {
    let image;
    if (type === '') {
      image = (x < 2 ? 'pawn_w.png' : 'pawn_b.png');
    } else {
      image = (x < 2 ? `${pgnToName[type]}_w.png` : `${pgnToName[type]}_b.png`);
    }

    const color = (x < 2 ? 'white' : 'black');
    if (type !== '') {
      return new Piece(color, image, pgnToName[type]);
    }
    return new Piece(color, image, 'pawn');
  }

  static newPieceByTypeAndColor(color, type) {
    const image = (color === 'white' ? `${type}_w.png` : `${type}_b.png`);
    return new Piece(color, image, type);
  }
}

module.exports = PieceFactory;
