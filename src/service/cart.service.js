import CartDao from "../model/DAO/cart.mongo.js";
import ProductsDao from "../model/DAO/products.mongo.js";
import UserDao from "../model/DAO/user.mongo.js";
import { CartNotFound, ProductNotFound, UserNotFound } from "../utils/error.js";

const cartDAO = CartDao.getInstance();
const productsDAO = ProductsDao.getInstance();
const userDAO = UserDao.getInstance();

class CartService {
  async getAllCarts() {
    return cartDAO.getAll();
  }

  async getCartByUser(id) {
    const user = await userDAO.getById(id);

    if (!user) throw new UserNotFound();

    const cart = await cartDAO.getById(user.cart.id);

    if (!cart) throw new CartNotFound();

    return cart;
  }

  async getCartById(id) {
    const cart = await cartDAO.getById(id);

    if (!cart) throw new CartNotFound();

    return cart;
  }

  async createCart(properties) {
    return cartDAO.create(properties);
  }

  async addProductByUser(user, item) {
    const product = await productsDAO.getById(item.id);

    if (!product) throw new ProductNotFound();

    const cart = await this.getCartByUser(user.id);

    if (!cart) throw new CartNotFound();

    const isItem = cart.items.find((cartItem) => cartItem.item.id === item.id);

    if (isItem) {
      isItem.quantity += item.quantity;
    } else {
      cart.items.push({ item: item.id, quantity: item.quantity });
    }

    cart.items = cart.items.map(({ item, quantity }) => ({
      item: item?.id || item,
      quantity,
    }));

    return await cartDAO.updateById(cart.id, cart);
  }

  async modifyCartProductsById(id, items) {
    const cart = await cartDAO.getById(id);

    if (!cart) throw new CartNotFound();

    const products = await productsDAO.getAll({
      _id: { $in: items.map(({ id }) => id) },
    });

    if (items.length !== products.length) {
      throw new ProductNotFound();
    }

    cart.items = products.map(({ id }) => ({
      quantity: items.find((item) => item.id === id)?.quantity,
      item: id,
    }));

    return await cartDAO.updateById(id, cart);
  }

  async deleteAllProductByUser(user) {
    const cart = await this.getCartByUser(user.id);

    cart.items = [];

    return await cartDAO.updateById(cart.id, cart);
  }

  async deleteAllCartProductsById(id) {
    const cart = await cartDAO.getById(id);

    if (!cart) {
      throw new CartNotFound();
    }

    cart.items = [];

    return cartDAO.updateById(id, cart);
  }
}

export default new CartService();
