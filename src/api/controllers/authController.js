import authServices from "../services/authServices.js";

const authController = {
  register: async (req, res) => {
    const { username, email, password } = req.body;
    const newUser = await authServices.register(username, email, password);
    res.status(201).json(newUser);
  },
  login: async (req, res) => {
    const { email, password } = req.body;
    const token = await authServices.login(email, password);
    res.status(200).json({ token });
  },
};

export default authController;
