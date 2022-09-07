import { Router } from "express";
import productsRouter from "./productos.route.js";
const router = Router();

router.get("/", (req, res) => {
  res.render("index.ejs");
});
router.use("/api", productsRouter);

export default router;
