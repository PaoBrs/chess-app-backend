class Tile {
  constructor(x, y, piece) {
    this.x = x;
    this.y = y;
    this.piece = piece;
  }

  isOccupied() {
    return !!this.piece;
  }
}

module.exports = Tile;
