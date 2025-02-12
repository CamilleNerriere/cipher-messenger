import { Router } from "express";
import { catchServerError } from "../middlewares/catchServerError.js";
import conversationController from "../controllers/conversationControllers.js";
import { verifyToken } from "../middlewares/verifyToken.js";

const conversationRouter = Router();

conversationRouter.get(
  "/",
  verifyToken,
  catchServerError(conversationController.show)
);
conversationRouter.get(
  "/conversation",
  verifyToken,
  catchServerError(conversationController.showConversation)
);
conversationRouter.post(
  "/conversation",
  verifyToken,
  catchServerError(conversationController.store)
);

export { conversationRouter };
