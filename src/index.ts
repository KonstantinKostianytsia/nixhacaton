import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/healthz", (req: Request, res: Response) => {
  const body = {
    status: "OK",
  };
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(body));
  res.end();
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
