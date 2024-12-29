import express from "express";
import http from "http";
import { WebSocketServer, WebSocket } from "ws";
import jwt from "jsonwebtoken";
import logger from "./logger.js";
import dotenv from "dotenv";
import connectDB from "./data/db.js";
import User from "./models/User.js";
import bcrypt from "bcrypt";

dotenv.config();
connectDB();

const app = express();
const server = http.createServer(app);
const wss = new WebSocketServer({
  server,
  handleProtocols: (protocols) => {
    return protocols ? protocols[0] : null;
  },
});

app.use(express.json());

// Simulation de BDD

const usersDB = [
  { id: "1", username: "user1", password: "password1" },
  { id: "2", username: "user2", password: "password2" },
];

// POST login route

app.post("/api/login", (req, res) => {
  const { username, password } = req.body;
  const user = usersDB.find(
    (u) => u.username === username && u.password === password
  );
  if (!user) {
    return res
      .status(401)
      .json({ error: "Nom d'utilisateur ou mot de passe invalide" });
  }

  const token = jwt.sign(
    { id: user.id, username: user.username },
    process.env.JWT_SECRET,
    {
      expiresIn: "1h",
    }
  );
  console.log("Generated Token:", token);
  res.json({ token });
});

// Websocket & user gestion

const authUsers = new Map();

wss.on("connection", (ws, req) => {
  // Verify Token

  const token = req.headers["sec-websocket-protocol"];
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
    const userId = ws.user.id;

    logger.info(`User ${ws.user.username} connected with ID ${userId}`);

    authUsers.set(userId, ws);

    ws.send(
      JSON.stringify({
        type: "info",
        message: `Welcome on Cipher Messenger ${ws.user.username} !`,
      })
    );

    // check token validity every minute/ close connection if expired
    const checkTokenInterval = setInterval(() => {
      jwt.verify(token, process.env.JWT_SECRET, (error, decoded) => {
        if (error) {
          logger.warn(`Token expired for user ${userId}`);
          clearInterval(checkTokenInterval);
          ws.close(4000, "Token expired");
        }
      });
    }, 60000);

    let errorCount = 0;
    const MAX_ERRORS = 3;

    // event : message
    ws.on("message", (message) => {
      try {
        const data = JSON.parse(message);
        logger.debug(`Message received from ${userId}: ${message}`);

        if (data.type === "message") {
          const { recipientId, content } = data;
          const recipientSocket = authUsers.get(recipientId);
          if (
            recipientSocket &&
            recipientSocket.readyState === WebSocket.OPEN
          ) {
            try {
              recipientSocket.send(
                JSON.stringify({
                  type: "message",
                  senderId: userId,
                  content,
                })
              );
              ws.send(
                JSON.stringify({
                  type: "info",
                  message: `Message send to ${recipientId}`,
                })
              );
            } catch (error) {
              logger.error(
                `Error sending message to ${recipientId}: ${error.message}`
              );
              ws.send(
                JSON.stringify({
                  type: "error",
                  message: `Failed to send message to ${recipientId}. Please try again.`,
                })
              );
            }
          } else {
            ws.send(
              JSON.stringify({
                type: "error",
                message: `User ${recipientId} not found or disconnected.`,
              })
            );
          }
        }

        errorCount = 0;
      } catch (error) {
        if (error instanceof SyntaxError) {
          logger.error("JSON Syntax Error :", error.message);
          logger.warn(`JSON parsing error count for ${userId}: ${errorCount}`);
          errorCount++;

          if (errorCount >= MAX_ERRORS) {
            logger.error("Too many consecutive errors. Connection closed");
            ws.close(1008, "Too many JSON parsing errors");
            return;
          }

          // JSON syntaxe error treatment
          ws.send(
            JSON.stringify({
              type: "error",
              message:
                "Message received incorrectly formatted. Please send a valid JSON.",
            })
          );
        } else {
          logger.error("Unexpected Error:", error.message);
        }
      }
    });

    // event : close
    ws.on("close", (code, reason) => {
      clearInterval(checkTokenInterval);

      if (code === 1000) {
        logger.info(
          `[close] Connexion closed cleanly, code=${code}, reason=${reason}`
        );
      } else {
        logger.warn(`[close] Connection died, code=${code} reason=${reason}`);
      }

      if (userId) {
        authUsers.delete(userId);
        logger.info(`User ${userId} disconnected`);
      }
    });
  });

  // event : error
  ws.on("error", (error) => {
    logger.error(`[error] WebSocket error: ${error.message}`, {
      stack: error.stack,
    });
  });
});

export default server;
