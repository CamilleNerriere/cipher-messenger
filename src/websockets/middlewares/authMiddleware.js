import jwt from "jsonwebtoken";
import logger from "../../../logger.js";

const authMiddleware = (ws, req, next) => {
  const token = req.headers["authorization"]?.split(" ")[1];
  logger.info(`Received token: ${token}`);

  if (!token) {
    logger.warn("Connection attempt without token");
    ws.close(1008, "Missing token");
    return;
  }

  jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
    if (error) {
      logger.error(`Invalid token: ${error.message}`);
      ws.close(1008, "Invalid or Expired token");
      return;
    }

    ws.user = decoded;
    next();
  });
};

export default authMiddleware;
