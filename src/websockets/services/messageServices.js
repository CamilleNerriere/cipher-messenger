import logger from "../../../logger.js";
import WebSocket from "ws";
import {
  createMessage,
  markAsDelivered,
} from "../repositories/messagesRepository.js";
import findConversation from "../repositories/conversationRepository.js";
import findUserById from "../repositories/userRepository.js";

const validateObjectId = (id) => {
  const regex = /^[a-fA-F0-9]{24}$/;
  return regex.test(id);
};

const processMessage = async (
  senderId,
  conversationId,
  recipientId,
  content,
  authUsers
) => {
  if (!conversationId || !validateObjectId(conversationId)) {
    logger.warn(`Invalid conversationId : ${conversationId}`);
    return { type: "error", message: "Conversation not found" };
  }

  if (!recipientId || !validateObjectId(recipientId)) {
    logger.warn(`Invalid RecipientId : ${recipientId}`);
    return { type: "error", message: "User not found" };
  }

  if (!content) {
    logger.warn("No content send");
    return { type: "error", message: "Please, enter a message." };
  }

  const conversation = await findConversation(
    conversationId,
    senderId,
    recipientId
  );

  if (!conversation) {
    logger.warn(
      `Conversation not found or unothorized access for conversation ${conversationId}, senderId ${senderId}, recipientId ${recipientId}`
    );
    return { type: "error", message: "Conversation not found" };
  }

  const recipient = await findUserById(recipientId);

  if (!recipient) {
    logger.warn(`Recipient ${recipientId} not found`);
    return { type: "error", message: "Recipient not found" };
  }

  const newMessage = await createMessage(
    senderId,
    recipientId,
    content,
    conversationId
  );

  const recipientSocket = authUsers.get(recipientId);

  if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
    recipientSocket.send(
      JSON.stringify({
        type: "message",
        senderId,
        content,
        timeStamp: newMessage.timeStamp,
      })
    );
    await markAsDelivered(newMessage);
    return { type: "info", message: `Message delivered to ${recipientId}` };
  }
  return { type: "info", message: `Message saved for offline ${recipientId}` };
};

export default processMessage;
