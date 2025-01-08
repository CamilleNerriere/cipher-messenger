import Message from "../../api/models/Message.js";

const createMessage = async (
  senderId,
  recipientId,
  content,
  conversationId
) => {
  return await Message.create({
    senderId,
    recipientId,
    content,
    conversationId,
  });
};

const markAsDelivered = async (message) => {
  message.delivered = true;
  await message.save();
};

export { createMessage, markAsDelivered };
