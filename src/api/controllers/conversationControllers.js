import conversationServices from "../services/conversationServices.js";

const conversationController = {
  show: async (req, res) => {
    const conversations = await conversationServices.show();
    res.status(200).json(conversations);
  },
  showConversation: async (req, res) => {
    const { members } = req.body;

    if (!members) {
      return next();
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
