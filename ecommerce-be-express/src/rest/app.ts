import express, { Request, Response } from "express";
import apiRouter from "./routes";

const app = express();
app.use(express.json());
app.use("/api", apiRouter);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Charles's Ecommerce Backend!!!");
});

export default app;
