import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/healthz", (req: Request, res: Response) => {
  const body = {
    status: "OK",
  };
  res.status(200).type("application/json").json(body);
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
