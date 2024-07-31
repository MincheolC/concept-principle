import dotenv from "dotenv";
dotenv.config();

import express from "express";
import { authRouter } from "./routes";

const app = express();

app.use("/auth", authRouter);

app.get("/", (req, res) => {
  res.send("Welcome to GitLab OAuth2 integration example");
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
