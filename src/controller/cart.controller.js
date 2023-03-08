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
      const data = await service.getCartByUser(req.user.id);
      res.json(data);
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
      const newCart = await service.createCart(req.body);

      res.status(201).json(newCart);
    } catch (error) {
      next(error);
    }
  }

  async addProductByUser(req, res, next) {
    try {
      const response = await service.addProductByUser(req.user, req.body);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async modifyCartProductsById(req, res, next) {
    try {
      const update = await service.modifyCartProductsById(
        req.params.id,
        req.body
      );

      res.status(200).json(update);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllProductByUser(req, res, next) {
    try {
      const response = await service.deleteAllProductByUser(req.user);

      res.json(response);
    } catch (error) {
      next(error);
    }
  }

  async deleteAllCartProductsById(req, res, next) {
    try {
      await service.deleteAllCartProductsById(req.params.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new CartController();
