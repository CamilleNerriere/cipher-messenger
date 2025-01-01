import conversationServices from "../services/conversationServices.js";
import mongoose from "mongoose";

const conversationController = {
  show: async (req, res) => {
    const conversations = await conversationServices.show();
    res.status(200).json(conversations);
  },
  showConversation: async (req, res) => {
    const { members } = req.body;

    if (!Array.isArray(members) || members.length !== 2) {
      return res.status(400).json({
        error: "Invalid members format. Must be an array with 2 members.",
      });
    }

    if (!members.every((id) => mongoose.Types.ObjectId.isValid(id))) {
      return res.status(400).json({ error: "Invalid member IDs provided." });
    }

    const conversation = await conversationServices.showConversation(members);
    res.status(200).json(conversation);
  },
  store: async (req, res, next) => {
    const { members, encryptionKey } = req.body;

    if (!members || !encryptionKey) {
      return next();
    }

    const conversation = await conversationServices.store(
      members,
      encryptionKey
    );
    res.status(201).json(conversation);
  },
};

export default conversationController;
