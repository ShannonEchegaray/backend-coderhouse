import service from "../service/products.service.js";

class ProductsController {
  async getProducts(req, res, next) {
    try {
      const products = await service.getProducts();

      res.json(products);
    } catch (error) {
      next(error);
    }
  }

  async getProductById(req, res, next) {
    try {
      const product = await service.getProductById(req.params.id);

      res.json(product);
    } catch (error) {
      next(error);
    }
  }

  async createProduct(req, res, next) {
    try {
      const created = await service.createProduct(req.body);

      res.status(201).json(created);
    } catch (error) {
      next(error);
    }
  }

  async updateProductById(req, res, next) {
    try {
      const updated = await service.updateProductById(req.params.id, req.body);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteProductById(req, res, next) {
    try {
      await service.deleteProductById(req.params.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new ProductsController();
