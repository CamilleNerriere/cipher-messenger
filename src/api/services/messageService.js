import Message from "../models/Message.js";

const messageServices = {
  show: async () => {
    const messages = await Message.find();
    return messages;
  },
  showConversation: async (senderId, recipientId) => {
    const messages = await Message.find({ senderId, recipientId });
    return messages;
  },
};

export default messageServices;
