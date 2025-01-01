import { WebSocketServer, WebSocket } from "ws";
import handleConnexion from "./handlers/connectionHandler.js";
import authMiddleware from "./middlewares/authMiddleware.js";

const setupWebSocker = (server) => {
  const wss = new WebSocketServer({ server });

  wss.on("connection", (ws, req) => {
    authMiddleware(ws, req, () => {
      handleConnexion(ws, req);
    });
  });

  return wss;
};

export default setupWebSocker;
