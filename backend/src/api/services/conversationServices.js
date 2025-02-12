import { ServerError } from "../../utils/customErrors.js";
import Conversation from "../models/Conversation.js";

const conversationServices = {
  show: async () => {
    const conversations = await Conversation.find();
    return conversations;
  },
  showConversation: async (members) => {
    const conversations = await Conversation.find({
      members: { $all: members },
    }).exec();

    if (!conversations || conversations.length === 0) {
      throw new ServerError({ error: "No conversations found." });
    }

    return conversations;
  },
  store: async (members, encryptionKey) => {
    const conversation = await Conversation.create({ members, encryptionKey });
    return conversation;
  },
};

export default conversationServices;
