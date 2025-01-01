import { Router } from "express";
import { catchServerError } from "../middlewares/catchServerError.js";
import userController from "../controllers/userController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const userRouter = Router();

userRouter.get("/", [verifyToken], catchServerError(userController.show));

export { userRouter };
