import { Router } from "express";
import passport from "passport";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  res.status(200).render("./pages/login.ejs");
  logger.info(
    `URL: ${req.url} - Method: ${req.method}  - Status: ${req.statusCode}`
  );
});

router.post(
  "/",
  passport.authenticate("local", {
    failureRedirect: "login-error",
  }),
  (req, res) => {
    res.status(302).redirect("/");
    logger.info(
      `URL: ${req.url} - Method: ${req.method}  - Status: ${req.statusCode}`
    );
  }
);

export default router;
