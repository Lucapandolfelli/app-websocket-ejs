import ProductDAO from "../dao/product.dao.js";

class ProductService {
  constructor() {}

  async getAllProducts() {
    try {
      return await ProductDAO.getAllProducts();
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      return await ProductDAO.createProduct(product);
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductService();
