import express from "express";
import asyncHandler from "express-async-handler";
import { createUser, updateUser, getUserById } from "../controllers/user.controller";

const router = express.Router();

router.post("/", asyncHandler(createUser));
router.get("/:id", asyncHandler(getUserById));
router.patch("/:id", asyncHandler(updateUser));

export default router;
