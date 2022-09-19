import { Router } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/index.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/register.ejs");
});

router.post("/", (req, res) => {
  const { username, email, password } = req.body;
  User.findOne({ username }, async (err, user) => {
    if (err) {
      console.log(err);
    }
    if (user) {
      res.render("./errors/register-error.ejs");
    }
    if (!user) {
      const hashedPassword = await bcrypt.hash(password, 8);
      const newUser = new User({
        username,
        email,
        password: hashedPassword,
      });
      await newUser.save();
      res.redirect("/login");
    }
  });
});

export default router;
