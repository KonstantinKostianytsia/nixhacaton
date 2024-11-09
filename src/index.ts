import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { sendResponse, someAlgorithm } from "./algorithm";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/healthz", (req: Request, res: Response) => {
  const body = {
    status: "OK",
  };
  sendResponse(res, body);
});

app.get("/test", (req: Request, res: Response) => {
  const result = someAlgorithm();
  sendResponse(res, result);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
