class Piece {
  constructor(color, img, type) {
    this.color = color;
    this.img = img;
    this.type = type;
    this.hasMoved = false;
  }

  getColor() {
    return this.color;
  }
}

module.exports = Piece;
