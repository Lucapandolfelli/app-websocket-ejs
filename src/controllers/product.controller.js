import ProductService from "../services/product.service.js";
import logger from "../logs/logger.js";

class ProductController {
  constructor() {}

  async getAllProducts(req, res) {
    try {
      const products = await ProductService.getAllProducts();
      if (products) {
        logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(200).json({ products });
      } else {
        logger.error(`${req.method} ${req.originalUrl} ${res.statusCode}`);
        res.status(404).json({ error: "Products not found." });
      }
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }

  async createProduct(req, res) {
    try {
      const { body } = req;
      const createdProduct = await ProductService.createProduct(body);
      logger.http(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(201).json(createdProduct);
    } catch (err) {
      logger.warn(`${req.method} ${req.originalUrl} ${res.statusCode}`);
      res.status(500).json({ error: err?.message });
    }
  }
}

export default new ProductController();
