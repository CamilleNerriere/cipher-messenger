import Conversation from "../models/Conversation.js";

const conversationServices = {
  show: async () => {
    const conversations = await Conversation.find();
    return conversations;
  },
  showConversation: async (members) => {
    const conversation = await Conversation.find(members).exec();
    return conversation;
  },
  store: async (members, encryptionKey) => {
    const conversation = await Conversation.create({ members, encryptionKey });
    return conversation;
  },
};

export default conversationServices;
