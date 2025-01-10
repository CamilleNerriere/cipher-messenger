import sanitizeHtml from "sanitize-html";
import logger from "../../../logger.js";
import WebSocket from "ws";
import {
  createMessage,
  markAsDelivered,
} from "../repositories/messagesRepository.js";
import findConversation from "../repositories/conversationRepository.js";
import {
  findUserByUsername,
  findUserById,
} from "../repositories/userRepository.js";

const validateObjectId = (id) => {
  const regex = /^[a-fA-F0-9]{24}$/;
  return regex.test(id);
};

const processMessage = async (
  type,
  senderId,
  conversationId,
  recipientName,
  content,
  authUsers
) => {
  if (type !== "message") {
    logger.warn("Invalid Type");
    return { type: "error", message: "An error occured" };
  }

  if (!validateObjectId(senderId)) {
    return { type: "error", message: "An error occured" };
  }

  if (!conversationId || !validateObjectId(conversationId)) {
    logger.warn(`Invalid conversationId : ${conversationId}`);
    return { type: "error", message: "Conversation not found" };
  }

  if (!content) {
    logger.warn("No content send");
    return { type: "error", message: "Please, enter a message." };
  }

  const sanitizedRecipientName = sanitizeHtml(recipientName);
  const sanitizedContent = sanitizeHtml(content);

  const recipient = await findUserByUsername(sanitizedRecipientName);

  const conversation = await findConversation(
    conversationId,
    senderId,
    recipient.id
  );

  if (!conversation) {
    logger.warn(
      `Conversation not found or unothorized access for conversation ${conversationId}, senderId ${senderId}, recipientId ${recipientId}`
    );
    return { type: "error", message: "Conversation not found" };
  }

  if (!recipient) {
    logger.warn(`Recipient ${recipientId} not found`);
    return { type: "error", message: "Recipient not found" };
  }

  const newMessage = await createMessage(
    senderId,
    recipient.id,
    sanitizedContent,
    conversationId
  );

  const sender = await findUserById(senderId);

  const recipientSocket = authUsers.get(recipient.id);

  if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
    recipientSocket.send(
      JSON.stringify({
        type: "message",
        sender: sender.username,
        sanitizedContent,
        timeStamp: newMessage.timeStamp,
      })
    );
    await markAsDelivered(newMessage);
    return { type: "info", message: `Message delivered to ${recipientName}` };
  }
  return {
    type: "info",
    message: `Message saved for offline ${recipientName}`,
  };
};

export default processMessage;
