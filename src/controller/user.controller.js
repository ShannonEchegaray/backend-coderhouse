import UserService from "../service/user.service.js";
import CartService from "../service/cart.service.js";

class UserController {
  async getProfileByUser(req, res, next) {
    try {
      const profile = await UserService.getProfileByUser(req.user);

      console.log(req.user);

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async getProfileById(req, res, next) {
    try {
      const profile = await UserService.getProfileById(req.params.id);

      res.json(profile);
    } catch (error) {
      next(error);
    }
  }

  async createUser(req, res, next) {
    try {
      const user = await UserService.createUser(req.body);
      const cart = await CartService.createCart({ user: user.id });
      await UserService.updateById(user._id, { ...user._doc, cart: cart.id });

      res.status(201).json(user);
    } catch (error) {
      next(error);
    }
  }

  async updateByUser(req, res, next) {
    try {
      const updated = await UserService.updateByUser(req.user._id, req.body);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async updateById(req, res, next) {
    try {
      const updated = await UserService.updateById(req.params.id, req.body);

      res.json(updated);
    } catch (error) {
      next(error);
    }
  }

  async deleteById(req, res, next) {
    try {
      await UserService.deleteById(req.params.id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }

  async deleteByUser(req, res, next) {
    try {
      await UserService.deleteByUser(req.user._id);

      res.status(204).end();
    } catch (error) {
      next(error);
    }
  }
}

export default new UserController();
