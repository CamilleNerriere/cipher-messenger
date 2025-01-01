import logger from "../../../logger.js";
import handleMessage from "./messageHandler.js";
import handleClose from "./closeHandler.js";
import jwt from "jsonwebtoken";

const authUsers = new Map();

const handleConnexion = (ws, req) => {
  const userId = ws.user.id;

  logger.info(`User ${ws.user.username} connected with ID ${userId}`);

  authUsers.set(userId, ws);

  ws.send(
    JSON.stringify({
      type: "info",
      message: `Welcome on Cipher Messenger ${ws.user.username} !`,
    })
  );

  const checkTokenInterval = setInterval(() => {
    jwt.verify(req.token, process.env.JWT_SECRET, (error) => {
      if (error) {
        logger.warn(`Token expired for user ${userId}`);
        clearInterval(checkTokenInterval);
        ws.close(4000, "Token expired");
      }
    });
  }, 60000);

  ws.checkTokenInterval = checkTokenInterval;

  ws.on("message", (message) => handleMessage(ws, message, authUsers));
  ws.on("close", (code, reason) => handleClose(ws, code, reason, authUsers));
  ws.on("error", (error) => {
    logger.error(`[error] WebSocket error: ${error.message}`, {
      stack: error.stack,
    });
  });
};

export default handleConnexion;
