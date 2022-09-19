import { Router } from "express";
import passport from "passport";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/login.ejs");
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "login-error",
  }),
  (req, res) => {
    res.redirect("/");
  }
);

export default router;
