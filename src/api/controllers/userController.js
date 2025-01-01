import userServices from "../services/userServices.js";

const userController = {
  show: async (req, res) => {
    const users = await userServices.show();
    res.status(200).json(users);
  },
};

export default userController;
