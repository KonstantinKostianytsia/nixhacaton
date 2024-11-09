import { Response } from "express";

export const someAlgorithm = () => {
  return {
    test: "Result ",
  };
};

export const sendResponse = (res: Response, body: any) => {
  res.writeHead(200, {
    "Content-Type": "application/json",
  });
  res.write(JSON.stringify(body));
  res.end();
};
