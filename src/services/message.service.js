import MessageDAO from "../dao/message.dao.js";

class MessageService {
  constructor() {}

  async getAllMessages() {
    try {
      return await MessageDAO.getAllMessages();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createMessage(message) {
    try {
      return await MessageDAO.createMessage(message);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new MessageService();
