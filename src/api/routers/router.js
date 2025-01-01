import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { messageRouter } from "./messagesRouter.js";
import { userRouter } from "./userRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/messages", messageRouter);
router.use("/users", userRouter);

export { router };
