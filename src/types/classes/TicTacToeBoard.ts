import { IGameBoard } from "../IGameBoard";

export type Cell = "X" | "O" | ".";

type TicTacToeBoardArray = Array<Array<Cell>>;

export class TicTacToeBoard implements IGameBoard {
  gameBoard: TicTacToeBoardArray = [
    [".", ".", "."],
    [".", ".", "."],
    [".", ".", "."],
  ];
  constructor(initialState?: TicTacToeBoardArray) {
    if (initialState) {
      this.gameBoard = initialState;
    }
  }

  draw() {
    for (let row of this.gameBoard) {
      for (let column of row) {
        process.stdout.write(`${column} `);
      }
      console.log("\n");
    }
  }

  getPossibleMoves(): [number, number][] {
    const availableMoves: [number, number][] = [];

    for (let i = 0; i < this.gameBoard.length; ++i) {
      for (let j = 0; j < this.gameBoard[i].length; ++j) {
        if (this.gameBoard[i][j] === ".") {
          availableMoves.push([i, j]);
        }
      }
    }

    return availableMoves;
  }

  getWinner(): Cell | undefined {
    /// horizontal
    for (let row of this.gameBoard) {
      if (row[0] === row[1] && row[0] === row[2] && row[0] !== ".") {
        return row[0];
      }
    }

    /// vertical
    for (let column = 0; column < this.gameBoard[0].length; ++column) {
      if (
        this.gameBoard[0][column] === this.gameBoard[1][column] &&
        this.gameBoard[0][column] === this.gameBoard[2][column] &&
        this.gameBoard[0][column] !== "."
      ) {
        return this.gameBoard[0][column];
      }
    }

    // diagonal
    if (
      this.gameBoard[0][0] === this.gameBoard[1][1] &&
      this.gameBoard[0][0] === this.gameBoard[2][2] &&
      this.gameBoard[0][0] !== "."
    ) {
      return this.gameBoard[0][0];
    }
    if (
      this.gameBoard[0][2] === this.gameBoard[1][1] &&
      this.gameBoard[0][2] === this.gameBoard[2][0] &&
      this.gameBoard[0][2] !== "."
    ) {
      return this.gameBoard[0][2];
    }
    return undefined;
  }
}
