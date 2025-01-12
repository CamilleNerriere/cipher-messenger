import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();
import logger from "../../../logger";

const connectDB = async () => {
  try {
    mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    logger.info("MongoDB connected successfully");
  } catch (error) {
    logger.error("MongoDB connection error:", error);
    process.exit(1);
  }
};

export default connectDB;
