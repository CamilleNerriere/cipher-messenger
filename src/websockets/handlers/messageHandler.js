import logger from "../../../logger.js";
import processMessage from "../services/messageServices.js";

const handleMessage = async (ws, message, authUsers) => {
  let errorCount = 0;
  const MAX_ERRORS = 3;

  try {
    const data = JSON.parse(message);
    logger.debug(`Message received from ${ws.user.id}: ${message}`);

    console.log("wsuser", ws.user);

    const { conversationId, recipientName, content } = data;

    const response = await processMessage(
      ws.user.id,
      conversationId,
      recipientName,
      content,
      authUsers
    );

    ws.send(JSON.stringify(response));
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

      ws.send(
        JSON.stringify({
          type: "error",
          message: error.message || "An unexpected error occurred.",
        })
      );
    }
  }
};

export default handleMessage;
