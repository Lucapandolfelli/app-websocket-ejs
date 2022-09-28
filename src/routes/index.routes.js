import { Router } from "express";
import { isAuth } from "../middleware/index.js";
import productsRouter from "./productos.routes.js";
import logoutRouter from "./logout.routes.js";
import loginRouter from "./login.routes.js";
import registerRouter from "./register.routes.js";
import errorsRouter from "./errors.routes.js";
import randomsRouter from "./randoms.routes.js";
const router = Router();

router.get("/", isAuth, (req, res) => {
  res.render("index.ejs", {
    username: req.user.username,
  });
});

router.get("/info", (req, res) => {
  res.render("pages/info.ejs", {
    argumentosDeEntrada: process.argv.slice(2),
    nombrePlataforma: process.platform,
    versionNode: process.version,
    mtr: process.memoryUsage(),
    pathEjecucion: process.execPath,
    processId: process.pid,
    carpetaProyecto: process.cwd(),
  });
});

router.use("/register", registerRouter);
router.use("/login", loginRouter);
router.use("/logout", logoutRouter);
router.use("/api", randomsRouter);
router.use("/api/productos-test", productsRouter);
router.use(errorsRouter);

export default router;
