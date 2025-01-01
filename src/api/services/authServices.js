import User from "../models/User.js";
import { ServerError } from "../../utils/customErrors.js";
import jwt from "jsonwebtoken";

const authServices = {
  register: async (username, email, password) => {
    const newUser = new User({ username, email, password });
    return await newUser.save();
  },
  login: async (email, password) => {
    const user = await User.findOne({ email });
    if (!user) {
      throw new ServerError("Invalid email or password");
    }
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
