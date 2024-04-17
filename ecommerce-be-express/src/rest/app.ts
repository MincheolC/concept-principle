// src/rest/server.ts
import express, { Request, Response } from "express";
// import { router } from './routes/app';

const app = express();
app.use(express.json());
// app.use('/api', router);

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Charles's Ecommerce Backend!!!");
});

export default app;
