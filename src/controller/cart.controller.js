import service from "../service/cart.service.js";

class CartController {
  async getAllCarts(req, res, next) {
    try {
      const data = await service.getAllCarts();
      res.json(data);
    } catch (error) {
      next(error);
    }
  }

  async getCartByUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async getCartById(req, res, next) {
    try {
      const data = await service.getCartById(req.params.id);
      res.json(data);
    } catch (error) {
      next(error);
    }
  }
  async createCart(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async addProductByUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async modifyCartById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
  async deleteProductByUser(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }

  async deleteCartById(req, res, next) {
    try {
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
