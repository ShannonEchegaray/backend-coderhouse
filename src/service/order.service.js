import OrderDao from "../model/DAO/order.mongo.js";
import UserDao from "../model/DAO/user.mongo.js";
import { CartNotFound, EmptyCart } from "../utils/error.js";
import userService from "./cart.service.js";

const orderDAO = OrderDao.getInstance();
const userDAO = UserDao.getInstance();

class OrderService {
  async purchaseOrderByUser(user) {
    const cart = await userService.getCartByUser(user.id);

    if (!cart) {
      throw new CartNotFound("No existe carrito vinculado al usuario");
    }

    if (cart.items.length === 0) {
      throw new EmptyCart("Tu carrito no tiene items para comprar");
    }

    const itemsPurchased = cart.items.map(({ item: el, quantity }) => ({
      id: el.id,
      name: el.name,
      description: el.description,
      price: el.price,
      quantity,
      finalPrice: el.price * quantity,
    }));

    const orderCreated = await orderDAO.create({
      items: itemsPurchased,
      email: user.email,
      user: user.id,
    });

    const userBackend = await userDAO.getById(user.id);
    userBackend.order.push(orderCreated.id);

    await userDAO.updateById(user.id, userBackend.doc);

    return orderCreated;
  }
}

export default new OrderService();
