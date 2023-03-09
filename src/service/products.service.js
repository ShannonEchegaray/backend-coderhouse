import ProductsDao from "../model/DAO/products.mongo.js";
import { ProductNotFound } from "../utils/error.js";

const productsDAO = ProductsDao.getInstance();

class ProductsService {
  async getProducts() {
    return productsDAO.getAll();
  }

  async getProductById(id) {
    const product = await productsDAO.getById(id);

    if (!product) throw new ProductNotFound("Producto no encontrado");

    return product;
  }

  async createProduct(properties) {
    return productsDAO.create(properties);
  }

  async updateProductById(id, properties) {
    return productsDAO.updateById(id, properties);
  }

  async deleteProductById(id) {
    return productsDAO.deleteById(id);
  }
}

export default new ProductsService();
