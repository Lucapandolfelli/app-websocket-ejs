import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).render("./pages/register.ejs");
  logger.info(
    `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
  );
});

router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) {
      console.log(err);
      logger.error(err);
    }
    if (user) {
      res.status(200).render("./errors/register-error.ejs");
      logger.info(
        `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
      );
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.status(302).redirect("/login");
      logger.info(
        `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
      );
    }
  });
});

export default router;
