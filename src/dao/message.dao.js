import { Message } from "../models/index.js";

class MessageDAO {
  constructor() {}

  async getAllMessages() {
    try {
      const messages = await Message.find();
      return messages;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createMessage(message) {
    try {
      const createdMessage = await new Message(message).save();
      return createdMessage;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new MessageDAO();
