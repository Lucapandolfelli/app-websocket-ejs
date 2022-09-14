/* import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import productsRouter from "./productos.route.js";
import logoutRouter from "./logout.route.js";
import loginRouter from "./login.route.js";
const router = Router();

router.get("/", isAuth, (req, res) => {
  res.render("index.ejs", {
    username: req.session.username,
  });
});
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/api", productsRouter);

export default router; */
