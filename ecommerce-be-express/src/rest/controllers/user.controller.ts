import { NextFunction, Request, Response } from "express";
import { convertToNumberId } from "../../utils/converter";
import userModel from "../../models/user";

export async function getUserById(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = convertToNumberId(req.params.id as string);
    const user = await userModel.getUserById(userId);
    res.json(user);
  } catch (e) {
    next(e);
  }
}

export async function createUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const { email, password } = req.body;
    const user = await userModel.createUser(email, password);
    res.status(201).json(user);
  } catch (e) {
    next(e);
  }
}

export async function updateUser(req: Request, res: Response, next: NextFunction): Promise<void> {
  try {
    const userId = convertToNumberId(req.params.id as string);
    const { email, password } = req.body;
    const user = await userModel.updateUser(userId, email, password);
    res.json(user);
  } catch (e) {
    next(e);
  }
}
