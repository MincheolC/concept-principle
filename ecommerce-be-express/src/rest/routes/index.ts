import { Router } from "express";
import userRouter from "./user.route";

const apiRouter = Router();

apiRouter.use("/users", userRouter);

export default apiRouter;
