import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import productsRouter from "./productos.routes.js";
import logoutRouter from "./logout.routes.js";
import loginRouter from "./login.routes.js";
import registerRouter from "./register.routes.js";
import errorsRouter from "./errors.routes.js";
const router = Router();

router.get("/", isAuth, (req, res) => {
  res.render("index.ejs", {
    username: req.user.username,
  });
});
router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/api", productsRouter);
router.use(errorsRouter);

export default router;
