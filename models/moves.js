/* eslint-disable class-methods-use-this */
/* eslint-disable no-param-reassign */

class Moves {
  possibleMoves(xFrom, yFrom, chessBoard) {
    const { type } = chessBoard[xFrom][yFrom].piece;
    const colorFrom = chessBoard[xFrom][yFrom].piece.color;
    const permittedMoves = [];

    for (let i = 0; i < 8; i += 1) {
      for (let j = 0; j < 8; j += 1) {
        const isOccupied = chessBoard[i][j].isOccupied();
        const colorTo = chessBoard[i][j].piece?.color;
        if (colorFrom !== colorTo) {
          let isValid = false;

          switch (type) {
            case 'pawn':
              isValid = this.pawnMoves({
                colorFrom,
                colorTo,
                xFrom,
                yFrom,
                xTo: i,
                yTo: j,
                chessBoard,
                isOccupied,
                isChecking: true,
              });

              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            case 'knight':
              isValid = this.knightMoves({
                xFrom, yFrom, xTo: i, yTo: j, chessBoard,
              });

              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            case 'bishop':
              isValid = this.bishopMoves({
                xFrom, yFrom, xTo: i, yTo: j, chessBoard,
              });

              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            case 'rook':
              isValid = this.rookMoves({
                xFrom, yFrom, xTo: i, yTo: j, chessBoard,
              });

              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            case 'queen':
              isValid = this.queenMoves({
                xFrom, yFrom, xTo: i, yTo: j, chessBoard,
              });
              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            case 'king':
              isValid = this.kingMoves({
                xFrom, yFrom, xTo: i, yTo: j, chessBoard, isChecking: true,
              });
              if (isValid) {
                permittedMoves.push({ x: i, y: j });
              }
              break;

            default:
              break;
          }
        }
      }
    }
    return permittedMoves;
  }

  // eslint-disable-next-line class-methods-use-this
  pawnMoves({
    colorFrom,
    xFrom,
    yFrom,
    xTo,
    yTo,
    isOccupied,
    chessBoard,
    isChecking = false,
  }) {
    if (!isOccupied) {
      const isSameColumn = yFrom - yTo === 0;

      if (!isSameColumn) {
        return false;
      }

      switch (colorFrom) {
        case 'black':
          if (xFrom === 6) {
            if (xFrom - xTo === 1) {
              return true;
            } if (xFrom - xTo === 2) {
              return !chessBoard[xFrom - 1][yFrom].isOccupied();
            }
          }

          if (xTo === 0 && isChecking === false) {
            chessBoard[xFrom][yFrom].piece.type = 'queen';
            chessBoard[xFrom][yFrom].piece.img = 'queen_b.png';
          }

          return xFrom - xTo === 1;

        case 'white':
          if (xFrom === 1) {
            if (xTo - xFrom === 1) {
              return true;
            } if (xTo - xFrom === 2) {
              return !chessBoard[xFrom + 1][yFrom].isOccupied();
            }
          }

          if (xTo === 7 && isChecking === false) {
            chessBoard[xFrom][yFrom].piece.type = 'queen';
            chessBoard[xFrom][yFrom].piece.img = 'queen_w.png';
          }

          return xTo - xFrom === 1;

        default:
          return false;
      }
    } else {
      switch (colorFrom) {
        case 'black':

          if (xTo === 0 && isChecking === false) {
            chessBoard[xFrom][yFrom].piece.type = 'queen';
            chessBoard[xFrom][yFrom].piece.img = 'queen_b.png';
          }

          return xFrom - xTo === 1 && Math.abs(yFrom - yTo) === 1;

        case 'white':

          if (xTo === 7 && isChecking === false) {
            chessBoard[xFrom][yFrom].piece.type = 'queen';
            chessBoard[xFrom][yFrom].piece.img = 'queen_w.png';
          }

          return xTo - xFrom === 1 && Math.abs(yFrom - yTo) === 1;

        default:
          return false;
      }
    }
  }

  // eslint-disable-next-line class-methods-use-this
  rookMoves({
    xFrom, yFrom, xTo, yTo, chessBoard,
  }) {
    if (xFrom === xTo && yFrom === yTo) return false;
    const isSameRow = (xFrom === xTo);
    const isSameColumn = (yFrom === yTo);
    let isPathFree = true;

    if (isSameRow) {
      if (yTo > yFrom) {
        for (let i = yFrom + 1; i < yTo; i += 1) {
          if (chessBoard[xFrom][i].isOccupied()) {
            isPathFree = false;
          }
        }
        return !!isPathFree;
      }
      for (let i = yTo + 1; i < yFrom; i += 1) {
        if (chessBoard[xFrom][i].isOccupied()) {
          isPathFree = false;
        }
      }
      return !!isPathFree;
    }
    if (isSameColumn) {
      if (xTo > xFrom) {
        for (let i = xFrom + 1; i < xTo; i += 1) {
          if (chessBoard[i][yFrom].isOccupied()) {
            isPathFree = false;
          }
        }
        return !!isPathFree;
      }
      for (let i = xTo + 1; i < xFrom; i += 1) {
        if (chessBoard[i][yFrom].isOccupied()) {
          isPathFree = false;
        }
      }
      return !!isPathFree;
    }
    return false;
  }

  knightMoves({
    xFrom, yFrom, xTo, yTo,
  }) {
    const xDifference = Math.abs(xFrom - xTo);
    const yDifference = Math.abs(yFrom - yTo);

    return (xDifference * yDifference === 2);
  }

  bishopMoves({
    xFrom, yFrom, xTo, yTo, chessBoard,
  }) {
    const isSameDiagonal = (Math.abs(xFrom - xTo) === Math.abs(yFrom - yTo));
    let isPathFree = true;

    if (!isSameDiagonal) {
      return false;
    }

    if (xFrom < xTo && yFrom < yTo) {
      let j = yFrom + 1;
      for (let i = xFrom + 1; i < xTo; i += 1) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j += 1;
      }
    } else if (xFrom > xTo && yFrom < yTo) {
      let j = yTo - 1;
      for (let i = xTo + 1; i < xFrom; i += 1) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j -= 1;
      }
    } else if (xTo > xFrom && yTo < yFrom) {
      let j = yTo + 1;
      for (let i = xTo - 1; i > xFrom; i -= 1) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j += 1;
      }
    } else if (xFrom > xTo && yFrom > yTo) {
      let j = yTo + 1;
      for (let i = xTo + 1; i < xFrom; i += 1) {
        if (chessBoard[i][j].isOccupied()) {
          isPathFree = false;
        }
        j += 1;
      }
    }

    return isPathFree;
  }

  queenMoves({
    xFrom, yFrom, xTo, yTo, chessBoard,
  }) {
    if (xFrom === xTo && yFrom === yTo) return false;
    const isDiagonalMoveValid = this.bishopMoves({
      xFrom, yFrom, xTo, yTo, chessBoard,
    });
    const isHVMoveValid = this.rookMoves({
      xFrom, yFrom, xTo, yTo, chessBoard,
    });
    return isDiagonalMoveValid || isHVMoveValid;
  }

  kingMoves({
    xFrom, yFrom, xTo, yTo, chessBoard, isChecking = false,
  }) {
    const xDifference = Math.abs(xFrom - xTo);
    const yDifference = Math.abs(yFrom - yTo);
    let isPathFree = true;

    if (xDifference + yDifference === 1 || xDifference * yDifference === 1) {
      return true;
    }

    const hasKingMoved = chessBoard[xFrom][yFrom].piece.hasMoved;

    if (hasKingMoved) return false;

    const hasRookRightMoved = chessBoard[xFrom][yFrom + 3].piece?.hasMoved;
    const hasRookLeftMoved = chessBoard[xFrom][yFrom - 4].piece?.hasMoved;

    // castling long
    if (yFrom > yTo && yDifference === 3 && isChecking === false) {
      if (hasRookLeftMoved || hasRookLeftMoved === undefined) return false;

      for (let i = yTo; i < yFrom; i += 1) {
        if (chessBoard[xFrom][i].isOccupied()) {
          isPathFree = false;
        }
      }

      if (isPathFree) {
        chessBoard[xFrom][yFrom - 2].piece = chessBoard[xFrom][yFrom - 4].piece;
        chessBoard[xFrom][yFrom - 4].piece = null;

        return true;
      }
      return false;
    }

    // castling short
    if (yTo > yFrom && yDifference === 2 && isChecking === false) {
      if (hasRookRightMoved || hasRookRightMoved === undefined) return false;

      for (let i = yFrom + 1; i < yTo; i += 1) {
        if (chessBoard[xFrom][i].isOccupied()) {
          isPathFree = false;
        }
      }
      if (isPathFree) {
        chessBoard[xFrom][yFrom + 1].piece = chessBoard[xFrom][yFrom + 3].piece;
        chessBoard[xFrom][yFrom + 3].piece = null;
        return true;
      }
      return false;
    }
    return false;
  }
}

module.exports = Moves;
