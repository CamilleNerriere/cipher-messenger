import jwt from "jsonwebtoken";
import { AuthentificationError } from "../../utils/customErrors.js";

const verifyToken = (req, res, next) => {
  const authorization = req.headers.authorization;

  console.log("req.headers", req.headers);

  if (!authorization) {
    return next(new AuthentificationError("Missing authorization token"));
  }
  const token = authorization.split(" ")[1];

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if (err) {
      return next(new AuthentificationError("Invalid or expired token"));
    }

    req.user = user; // on assigne le payload décodé à req.user pour le réutiliser
    next();
  });
};

export { verifyToken };
