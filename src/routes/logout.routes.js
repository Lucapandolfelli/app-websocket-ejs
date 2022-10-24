import { Router } from "express";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  const username = req.user.username;
  req.logout((err) => {
    if (err) {
      console.log(err);
      logger.error(err);
    }
    res.status(200).render("./pages/logout.ejs", {
      username: username,
    });
    logger.info(
      `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
    );
    setInterval(() => {
      res.status(302).redirect("/");
    }, 2000);
  });
  /* res.render("./pages/logout.ejs", {
    username: req.session.username,
  });
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
  }); */
});

export default router;
