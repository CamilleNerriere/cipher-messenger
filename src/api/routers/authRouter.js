import { Router } from "express";
import { catchServerError } from "../middlewares/catchServerError.js";
import authController from "../controllers/authController.js";

const authRouter = Router();

authRouter.post("/register", catchServerError(authController.register));
authRouter.post("/login", catchServerError(authController.login));

export { authRouter };
