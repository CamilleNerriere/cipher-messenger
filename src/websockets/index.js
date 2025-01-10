import { WebSocketServer, WebSocket } from "ws";
import handleConnexion from "./handlers/connectionHandler.js";
import authMiddleware from "./middlewares/authMiddleware.js";
import websocketLimiter from "./middlewares/websocketLimiter.js";
import messageLimiter from "./middlewares/messagesLimiter.js";

const limiter = websocketLimiter(5);
const setupWebSocker = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    limiter(ws, req, () => {
      authMiddleware(ws, req, () => {
        const canSendMessage = messageLimiter(ws, req);
        if (canSendMessage()) {
          handleConnexion(ws, req);
        }
      });
    });
  });

  return wss;
};

export default setupWebSocker;
