import UserService from "../services/user.service.js";
import logger from "../logs/logger.js";

class UserController {
  constructor() {}

  async renderRegisterView(req, res) {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/register.ejs");
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async renderLoginView(req, res) {
    try {
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(200).render("./pages/login.ejs");
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createUser(req, res) {
    try {
      const { username, email, password } = req.body;
      const user = await UserService.getUserByUsername(username);
      if (user) {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).render("./errors/register-error.ejs");
      } else {
        await UserService.createUser(username, email, password);
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(302).redirect("/login");
      }
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new UserController();
