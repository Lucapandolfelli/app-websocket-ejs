import { Product } from "../models/index.js";

class ProductDAO {
  constructor() {}

  async getAllProducts() {
    try {
      const products = await Product.find();
      return products;
    } catch (err) {
      throw new Error(err?.message);
    }
  }

  async createProduct(product) {
    try {
      const createdProduct = await new Product(product).save();
      return createdProduct;
    } catch (err) {
      throw new Error(err?.message);
    }
  }
}

export default new ProductDAO();
