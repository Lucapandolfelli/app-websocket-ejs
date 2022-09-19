import { Router } from "express";
const router = Router();

router.get("/login-error", (req, res) => {
  res.render("login-error.ejs");
});

router.get("/register-error", (req, res) => {
  res.render("register-error.ejs");
});

export default router;
