import express, { Request, Response } from "express";
import swaggerUi from "swagger-ui-express";
import apiRouter from "./routes";
import { readSwaggerFiles } from "../utils/swagger";

const app = express();

const swaggerSpec = readSwaggerFiles();

app.use(express.json());
app.use("/api", apiRouter);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.get("/", (req: Request, res: Response) => {
  res.send("Welcome to Charles's Ecommerce Backend!!!");
});

export default app;
