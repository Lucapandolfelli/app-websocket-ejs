import bcrypt from "bcrypt";
import UserDAO from "../dao/user.dao.js";

class UserService {
  constructor() {}

  async getUserByUsername(username) {
    try {
      return await UserDAO.getUserByUsername(username);
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(username, email, password) {
    try {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = {
        username,
        email,
        password: hashedPassword,
      };
      await UserDAO.createUser(newUser);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserService();
