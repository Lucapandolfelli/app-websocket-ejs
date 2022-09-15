import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/login.ejs");
});

router.post("/", (req, res) => {
  const { username } = req.body;
  if (username == "Pepe") {
    req.session.username = username;
    res.redirect("/");
  }
});

export default router;
