import User from "../models/User.js";
import { ServerError } from "../../utils/customErrors.js";
import jwt from "jsonwebtoken";
import sanitizeAndValidate from "../../utils/sanitizeAndValidate.js";

const authServices = {
  register: async (username, email, password) => {
    const { error } = sanitizeAndValidate.register.validate({
      username,
      password,
      email,
    });

    if (error) {
      return next(error.details[0]);
    }

    const newUser = new User({ username, email, password });
    return await newUser.save();
  },
  login: async (email, password) => {
    const { error } = sanitizeAndValidate.login.validate({ email, password });

    if (error) {
      return next(error.details[0]);
    }

    const user = await User.findOne({ email });
    if (!user) {
      throw new ServerError("Invalid email or password");
    }

    console.log("user", user);
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      throw new ServerError("Invalid email or password");
    }
    const token = jwt.sign(
      { username: user.username, id: user._id, email: user.email },
      process.env.JWT_SECRET,
      { expiresIn: "1h" }
    );
    return token;
  },
};

export default authServices;
