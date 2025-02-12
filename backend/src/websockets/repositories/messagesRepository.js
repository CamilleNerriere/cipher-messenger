import Message from "../../api/models/Message.js";
import { cipher } from "../../../cipher.js";
import Conversation from "../../api/models/Conversation.js";

const createMessage = async (
  senderId,
  recipientId,
  encryptedContent,
  conversationId
) => {
  return await Message.create({
    senderId,
    recipientId,
    content: encryptedContent,
    conversationId,
  });
};

const markAsDelivered = async (message) => {
  message.delivered = true;
  await message.save();
};

export { createMessage, markAsDelivered };
