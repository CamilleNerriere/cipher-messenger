import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./src/api/data/db.js";
import { errorHandler, notFound } from "./src/api/middlewares/errorHandlers.js";
import { router } from "./src/api/routers/router.js";
import setupWebSocket from "./src/websockets/index.js";
import limiter from "./src/api/middlewares/limiter.js";

dotenv.config();

connectDB();

const app = express();
app.use(limiter);
const server = http.createServer(app);

const wss = setupWebSocket(server);

app.use(express.json());

app.use(
  cors({
    origin: [process.env.REACT_URL],
    credentials: true,
    allowedHeaders: ["Authorization", "Content-Type", "X-Requested-With"],
    exposedHeaders: ["Authorization"],
  })
);

app.use(router);

app.use(notFound);

app.use(errorHandler);

export default server;
