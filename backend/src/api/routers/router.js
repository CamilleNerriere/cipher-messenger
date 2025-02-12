import { Router } from "express";
import { authRouter } from "./authRouter.js";
import { messageRouter } from "./messagesRouter.js";
import { userRouter } from "./userRouter.js";
import { conversationRouter } from "./conversationRouter.js";

const router = Router();

router.use("/auth", authRouter);
router.use("/messages", messageRouter);
router.use("/users", userRouter);
router.use("/conversations", conversationRouter);

export { router };
