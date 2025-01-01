import { Router } from "express";
import { catchServerError } from "../middlewares/catchServerError.js";
import messageController from "../controllers/messageController.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const messageRouter = Router();

messageRouter.get("/", verifyToken, catchServerError(messageController.show));
messageRouter.get(
  "/conversation",
  verifyToken,
  catchServerError(messageController.showConversation)
);

export { messageRouter };
