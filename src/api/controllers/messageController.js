import messageServices from "../services/messageService.js";

const messageController = {
  show: async (req, res) => {
    const messages = await messageServices.show();
    res.status(200).json(messages);
  },
  showConversation: async (req, res) => {
    const { senderId, recipientId } = req.params;

    const messages = await messageServices.showConversation(
      senderId,
      recipientId
    );
    res.status(200).json(messages);
  },
};
export default messageController;
