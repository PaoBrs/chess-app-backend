const { TileFactory } = require('./tile');
const { numberToLetter } = require('../utils/numberToLetter');
const { MovesFactory } = require('./moves');

class Board {
  constructor() {
    this.chessBoard = this.setInitialPositions();
    this.moves = MovesFactory.newMoves();
    this.turn = 'white';
  }

  // eslint-disable-next-line class-methods-use-this
  setInitialPositions() {
    const squares = Array(8).fill(null);

    for (let i = 0; i < squares.length; i += 1) {
      squares[i] = Array(8).fill(null);
    }

    squares[0][0] = TileFactory.newTilePGN('r', 0, 'a');
    squares[0][1] = TileFactory.newTilePGN('n', 0, 'b');
    squares[0][2] = TileFactory.newTilePGN('b', 0, 'c');
    squares[0][3] = TileFactory.newTilePGN('q', 0, 'd');
    squares[0][4] = TileFactory.newTilePGN('k', 0, 'e');
    squares[0][5] = TileFactory.newTilePGN('b', 0, 'f');
    squares[0][6] = TileFactory.newTilePGN('n', 0, 'g');
    squares[0][7] = TileFactory.newTilePGN('r', 0, 'h');

    for (let i = 0; i < 8; i += 1) {
      squares[1][i] = TileFactory.newTilePGN('', 1, numberToLetter[i]);
    }

    squares[7][0] = TileFactory.newTilePGN('r', 7, 'a');
    squares[7][1] = TileFactory.newTilePGN('n', 7, 'b');
    squares[7][2] = TileFactory.newTilePGN('b', 7, 'c');
    squares[7][3] = TileFactory.newTilePGN('q', 7, 'd');
    squares[7][4] = TileFactory.newTilePGN('k', 7, 'e');
    squares[7][5] = TileFactory.newTilePGN('b', 7, 'f');
    squares[7][6] = TileFactory.newTilePGN('n', 7, 'g');
    squares[7][7] = TileFactory.newTilePGN('r', 7, 'h');

    for (let i = 0; i < 8; i += 1) {
      squares[6][i] = TileFactory.newTilePGN('', 6, numberToLetter[i]);
    }

    for (let i = 2; i < 6; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        squares[i][j] = TileFactory.newTile(i, j, null);
      }
    }
    return squares;
  }

  movePiece(xFrom, yFrom, xTo, yTo, isOccupied) {
    const { type } = this.chessBoard[xFrom][yFrom].piece;
    const colorFrom = this.chessBoard[xFrom][yFrom].piece.color;
    const colorTo = this.chessBoard[xTo][yTo].piece?.color;

    if (colorFrom !== this.turn) return false;

    if (colorFrom === colorTo) return false;

    let canMove = false;

    switch (type) {
      case 'pawn':
        canMove = this.moves.pawnMoves({
          colorFrom, colorTo, xFrom, yFrom, xTo, yTo, isOccupied, chessBoard: this.chessBoard,
        });

        break;

      case 'rook':
        canMove = this.moves.rookMoves({
          xFrom, yFrom, xTo, yTo, chessBoard: this.chessBoard,
        });
        break;

      case 'knight':
        canMove = this.moves.knightMoves({
          xFrom, yFrom, xTo, yTo, chessBoard: this.chessBoard,
        });
        break;

      case 'bishop':
        canMove = this.moves.bishopMoves({
          xFrom, yFrom, xTo, yTo, chessBoard: this.chessBoard,
        });
        break;

      case 'queen':
        canMove = this.moves.queenMoves({
          xFrom, yFrom, xTo, yTo, chessBoard: this.chessBoard,
        });
        break;

      case 'king':
        canMove = this.moves.kingMoves({
          xFrom, yFrom, xTo, yTo, chessBoard: this.chessBoard,
        });
        break;

      default:
        break;
    }
    if (canMove) {
      this.chessBoard[xFrom][yFrom].piece.hasMoved = true;
      this.chessBoard[xTo][yTo].piece = this.chessBoard[xFrom][yFrom].piece;
      this.chessBoard[xFrom][yFrom].piece = null;
      this.turn = this.turn === 'white' ? 'black' : 'white';
    }
    return false;
  }
}

module.exports = Board;
