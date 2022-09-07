import { Router } from "express";
import productsRouter from "./productos.route.js";
const router = Router();

router.use("/api", productsRouter);

export default router;
