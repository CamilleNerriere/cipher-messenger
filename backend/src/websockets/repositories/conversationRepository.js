import Conversation from "../../api/models/Conversation.js";

const findConversation = async (conversationId, senderId, recipientId) => {
  return await Conversation.findOne({
    _id: conversationId,
    members: { $all: [senderId, recipientId] },
  }).exec();
};

export default findConversation;
