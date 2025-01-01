import messageServices from "../services/messageService.js";

const messageController = {
  show: async (req, res) => {
    const messages = await messageServices.show();
    res.status(200).json(messages);
  },
  showMessagesByUsers: async (req, res, next) => {
    const { senderId, recipientId } = req.body;

    if (!senderId || !recipientId) {
      return next();
    }

    const messages = await messageServices.showMessagesByUsers(
      senderId,
      recipientId
    );
    res.status(200).json(messages);
  },
};
export default messageController;
