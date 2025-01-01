import mongoose from "mongoose";
const Schema = mongoose.Schema;

const messageSchema = new mongoose.Schema({
  senderId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  recipientId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  content: { type: String, required: true },
  timestamp: { type: Date, default: Date.now },
  delivered: { type: Boolean, default: false },
});

const Message = mongoose.model("Message", messageSchema);

export default Message;
