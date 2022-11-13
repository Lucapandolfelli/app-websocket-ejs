import { Router } from "express";
import passport from "passport";
import logger from "../logs/logger.js";
import UserController from "../controllers/user.controller.js";

const router = Router();

router.get("/", UserController.renderLoginView);

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "login-error",
  }),
  (req, res) => {
    logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
    res.status(302).redirect("/");
  }
);

export default router;
