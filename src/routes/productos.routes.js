import { Router } from "express";
import { createRandomProducts } from "../utils/index.js";
import logger from "../logs/logger.js";
const router = Router();

router.get("/", (req, res) => {
  const randomProducts = createRandomProducts(5);
  res.status(200).render("./pages/productos.ejs", { randomProducts });
  logger.info(
    `URL: ${req.url} - Method: ${req.method} - Status: ${req.statusCode}`
  );
});

export default router;
