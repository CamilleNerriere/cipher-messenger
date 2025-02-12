import User from "../../api/models/User.js";

const findUserById = async (userId) => {
  return await User.findOne({
    _id: userId,
  }).exec();
};

const findUserByUsername = async (username) => {
  return await User.findOne({
    username: username,
  }).exec();
};

export { findUserById, findUserByUsername };
