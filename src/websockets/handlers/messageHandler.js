import logger from "../../../logger.js";
import Message from "../../api/models/Message.js";
import User from "../../api/models/User.js";
import Conversation from "../../api/models/Conversation.js";
import WebSocket from "ws";

async function handleMessage(ws, message, authUsers) {
  let errorCount = 0;
  const MAX_ERRORS = 3;

  try {
    const data = JSON.parse(message);
    logger.debug(`Message received from ${ws.user.id}: ${message}`);

    if (data.type === "message") {
      const { conversationId, recipientId, content } = data;

      const validateObjectId = (id) => {
        const regex = /^[a-fA-F0-9]{24}$/;
        return regex.test(id);
      };

      if (!conversationId) {
        logger.warn("Missing conversationId");
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Please, select a conversation.",
          })
        );
      }

      if (!validateObjectId(conversationId)) {
        logger.warn(`Invalid conversationId format: ${conversationId}`);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Error when sending the message.",
          })
        );
        return;
      }

      if (!recipientId || !content) {
        logger.warn(
          `Invalid message format from ${ws.user.id}: missing recipientId or content`
        );
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Missing recipient or content.",
          })
        );
        return;
      }

      if (!validateObjectId(recipientId)) {
        logger.warn(`Invalid recipientId format: ${recipientId}`);
        ws.send(
          JSON.stringify({
            type: "error",
            message: "Error when sending the message.",
          })
        );
        return;
      }

      const recipient = await User.findOne({
        _id: recipientId,
      }).exec();

      if (!recipient) {
        logger.warn("No user found");
        ws.send(
          JSON.stringify({
            type: "info",
            message: "Recipient not Found",
          })
        );
      }

      const conversation = await Conversation.findOne({
        _id: conversationId,
        members: { $all: [ws.user.id, recipientId] },
      }).exec();

      if (!conversation) {
        logger.warn("Sender or recipient not part of the conversation");
        ws.send(
          JSON.stringify({
            type: "error",
            message: "You or the recipient are not part of the conversation.",
          })
        );
        return;
      }

      const newMessage = await Message.create({
        senderId: ws.user.id,
        recipientId,
        content,
        conversationId,
      });

      const recipientSocket = authUsers.get(recipientId);
      if (recipientSocket && recipientSocket.readyState === WebSocket.OPEN) {
        try {
          recipientSocket.send(
            JSON.stringify({
              type: "message",
              senderId: ws.user.id,
              content,
              timeStamp: newMessage.timestamp,
            })
          );

          newMessage.delivered = true;
          await newMessage.save();

          ws.send(
            JSON.stringify({
              type: "info",
              message: `Message delivered to ${recipientId}`,
            })
          );
        } catch (error) {
          logger.error(
            `Error sending message to ${recipientId}: ${error.message}`
          );
          ws.send(
            JSON.stringify({
              type: "error",
              message: `Failed to send message to ${recipientId}. Please try again.`,
            })
          );
        }
      } else {
        ws.send(
          JSON.stringify({
            type: "error",
            message: `Message send to ${recipientId}`,
          })
        );
      }
    }

    errorCount = 0;
  } catch (error) {
    if (error instanceof SyntaxError) {
      logger.error("JSON Syntax Error :", error.message);
      logger.warn(`JSON parsing error count for ${ws.user.id}: ${errorCount}`);
      errorCount++;

      if (errorCount >= MAX_ERRORS) {
        logger.error("Too many consecutive errors. Connection closed");
        ws.close(1008, "Too many JSON parsing errors");
        return;
      }

      ws.send(
        JSON.stringify({
          type: "error",
          message:
            "Message received incorrectly formatted. Please send a valid JSON.",
        })
      );
    } else {
      logger.error("Unexpected Error:", {
        message: error.message,
        stack: error.stack,
        errorName: error.name,
        errorType: typeof error,
      });
    }
  }
}

export default handleMessage;
