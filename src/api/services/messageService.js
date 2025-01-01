import { ServerError } from "../../utils/customErrors.js";
import Message from "../models/Message.js";

const messageServices = {
  show: async () => {
    const messages = await Message.find();
    return messages;
  },
  showMessagesByUsers: async (senderId, recipientId) => {
    const messages = await Message.find({ senderId, recipientId }).exec();
    return messages;
  },
};

export default messageServices;
