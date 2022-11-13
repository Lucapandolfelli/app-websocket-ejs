import MessageService from "../services/message.service.js";
import logger from "../logs/logger.js";

class MessageController {
  constructor() {}

  async getAllMessages(req, res) {
    try {
      const messages = await MessageService.getAllMessages();
      if (messages) {
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(200).json({ messages });
      } else {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Messages not found." });
      }
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createMessage(req, res) {
    try {
      const { body } = req;
      const createdMessage = await MessageService.createMessage(body);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(201).json({ createdMessage });
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new MessageController();
