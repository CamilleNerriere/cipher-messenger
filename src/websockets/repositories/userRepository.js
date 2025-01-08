import User from "../../api/models/User.js";

const findUserById = async (userId) => {
  return await User.findOne({
    _id: userId,
  }).exec();
};

export default findUserById;
