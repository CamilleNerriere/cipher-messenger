import User from "../models/User.js";

const userServices = {
  show: async () => {
    const users = await User.find();
    return users;
  },
};

export default userServices;
