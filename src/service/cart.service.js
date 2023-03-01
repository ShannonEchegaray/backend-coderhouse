import CartDao from "../model/DAO/cart.mongo.js";

const cartDAO = CartDao.getInstance();

class CartService {
  async getAllCarts() {
    return cartDAO.getAll();
  }

  async getCartByUser(id) {
    return cartDAO.getById(id);
  }

  async getCartById(id) {
    return cartDAO.getById(id);
  }

  async createCart(properties) {
    return cartDAO.create(properties);
  }

  async addProductByUser(item) {
    return cartDAO.updateById(item.id, { quantity: item.quantity });
  }

  async modifyCartById(id, properties) {
    return cartDAO.updateById(id, properties);
  }

  async deleteProductByUser(id) {
    return cartDAO.deleteById(id);
  }

  async deleteCartProductsById(id) {
    const cart = await cartDAO.getById(id);
    console.log(cart);
  }
}

export default new CartService();
