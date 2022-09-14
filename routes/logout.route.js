import { Router } from "express";
const router = Router();

router.get("/", (req, res) => {
  res.render("./pages/logout.ejs");
});

export default router;
