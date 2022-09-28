import { Router } from "express";
import { createRandomProducts } from "../utils/index.js";
const router = Router();

router.get("/", (req, res) => {
  const randomProducts = createRandomProducts(5);
  res.render("./pages/productos.ejs", { randomProducts });
});

export default router;
