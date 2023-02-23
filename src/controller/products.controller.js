import service from "../service/products.service.js";

class ProductsController {
  async getProducts(req, res, next) {
    try {
      await service.getProducts();

      res.send("getProducts");
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      await service.getProductById(req.params.id);

      res.send("getProductById");
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      await service.createProduct(req.body);

      res.send("createProduct");
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req, res, next) {
    try {
      await service.updateProductById(req.params.id);

      res.send("updateProductById");
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      await service.deleteProductById(req.params.id);

      res.send("deleteProductById");
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
