import { Response } from "express";
import { Cell, TicTacToeBoard } from "./types/classes/TicTacToeBoard";
import _ from "lodash";
import {
  CALCULATION_DEPTH,
  MAX_MAXIMIZER_VALUE,
  MIN_MINIMIZER_VALUE,
  NEGATIVE_INFINITE,
  POSITIVE_INFINITE,
} from "./constants";

export const sendResponse = (res: Response, body: any) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(body));
  res.end();
};

export const minimax = (
  position: TicTacToeBoard,
  depth: number,
  alpha: number,
  beta: number,
  isMaximizingPlayer: boolean
) => {
  const availabelCells = position.getPossibleMoves();

  const winner = position.getWinner();

  if (winner) {
    const whatDepth = CALCULATION_DEPTH - depth + 1;
    return winner === "X"
      ? MAX_MAXIMIZER_VALUE - whatDepth
      : whatDepth + MIN_MINIMIZER_VALUE;
  }

  /// No winner, no available cells - Draw
  if (availabelCells.length === 0) {
    return 0;
  }

  /// max depth exceeded
  if (depth === 0) {
    return 0;
  }

  let bestPosition;

  const isRoot = depth === CALCULATION_DEPTH;

  if (isMaximizingPlayer) {
    let maxEval = NEGATIVE_INFINITE;

    for (let newPosition of availabelCells) {
      const newBoard = createNewBoard(position, newPosition, "X");
      const score = minimax(newBoard, depth - 1, alpha, beta, false) as number;
      if (score > maxEval) {
        maxEval = score;
        bestPosition = newBoard;
      }
      alpha = Math.max(alpha, score);
      if (beta <= alpha) {
        break;
      }
    }

    if (isRoot) {
      return bestPosition;
    }

    return maxEval;
  } else {
    let minEval = POSITIVE_INFINITE;

    for (let newPosition of availabelCells) {
      const newBoard = createNewBoard(position, newPosition, "O");
      const score = minimax(newBoard, depth - 1, alpha, beta, true) as number;
      if (score < minEval) {
        minEval = score;
        bestPosition = newBoard;
      }
      beta = Math.min(beta, score);
      if (beta <= alpha) {
        break;
      }
    }
    if (isRoot) {
      return bestPosition;
    }

    return minEval;
  }
};

const createNewBoard = (
  board: TicTacToeBoard,
  newPosition: [number, number],
  sign: Cell
) => {
  const copyCurrentPosition = _.cloneDeep(board.gameBoard);
  const [row, column] = newPosition;
  copyCurrentPosition[row][column] = sign;
  const newBoard = new TicTacToeBoard(copyCurrentPosition);

  return newBoard;
};
