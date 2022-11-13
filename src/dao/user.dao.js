import { User } from "../models/index.js";

class UserDAO {
  constructor() {}

  async getUserByUsername(username) {
    try {
      const user = await User.findOne({ username: username });
      return user;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createUser(user) {
    try {
      await new User(user).save();
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new UserDAO();
