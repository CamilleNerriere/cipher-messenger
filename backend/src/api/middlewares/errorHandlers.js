import logger from "../../../logger.js";
import { NotFoundError } from "../../utils/customErrors.js";

const notFound = (req, res, next) => {
  next(new NotFoundError());
};

const errorHandler = async (err, req, res, next) => {
  logger.error(err.stack);

  const statusCode = err.statusCode || 500;

  res.status(statusCode).json({ error: err.message });
};

export { notFound, errorHandler };
