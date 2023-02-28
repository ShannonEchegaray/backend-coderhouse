import ProductsDao from "../model/DAO/products.mongo.js";

const productsDAO = ProductsDao.getInstance();

class ProductsService {
  async getProducts() {
    return productsDAO.getAll();
  }

  async getProductById(id) {
    return productsDAO.getById(id);
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
