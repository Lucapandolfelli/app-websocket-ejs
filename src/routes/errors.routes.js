import { Router } from "express";
import logger from "../logs/logger.js";
const router = Router();

router.get("/login-error", (req, res) => {
  res.status(200).render("login-error.ejs");
  logger.info(
    `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
  );
});

router.get("/register-error", (req, res) => {
  res.status(200).render("register-error.ejs");
  logger.info(
    `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
  );
});

export default router;
