// @ts-ignore

import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { minimax, sendResponse } from "./algorithm";
import { TicTacToeBoard } from "./types/classes/TicTacToeBoard";
import {
  CALCULATION_DEPTH,
  NEGATIVE_INFINITE,
  POSITIVE_INFINITE,
} from "./constants";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/healthz", (req: Request, res: Response) => {
  const body = {
    status: "OK",
  };
  sendResponse(res, body);
});

app.post("/test", (req: Request, res: Response) => {
  const data = req.body.data;
  const someState = new TicTacToeBoard(data);
  let amountOfX = 0;
  let amountOfO = 0;
  for (let row of someState.gameBoard) {
    for (let column of row) {
      if (column === "X") {
        amountOfX++;
      }
      if (column === "O") {
        amountOfO++;
      }
    }
  }
  const whoseTurn = amountOfO >= amountOfX ? "X" : "O";
  const result: TicTacToeBoard = minimax(
    someState,
    CALCULATION_DEPTH,
    NEGATIVE_INFINITE,
    POSITIVE_INFINITE,
    whoseTurn === "X"
  ) as TicTacToeBoard;
  result.draw();
  sendResponse(res, result.gameBoard);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
