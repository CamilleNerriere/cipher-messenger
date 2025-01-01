import logger from "winston";
import { ServerError } from "../../utils/customErrors.js";

const catchServerError = (fn) => {
  return async (req, res, next) => {
    try {
      await fn(req, res, next);
    } catch (error) {
      logger.error(error);
      next(new ServerError(error));
    }
  };
};

export { catchServerError };
