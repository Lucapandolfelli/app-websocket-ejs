import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/logout.ejs", {
    username: req.session.username,
  });
  req.session.destroy((err) => {
    if (err) {
      return res.json({ status: "Logout error", body: err });
    }
  });
});

export default router;
