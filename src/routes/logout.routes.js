import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  const username = req.user.username;
  req.logout((err) => {
    if (err) {
      console.log(err);
    }
    res.render("./pages/logout.ejs", {
      username: username,
    });
    setInterval(() => {
      res.redirect("/");
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
