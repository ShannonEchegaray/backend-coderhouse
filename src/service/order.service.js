import OrderDao from "../model/DAO/order.mongo.js";
import CartDao from "../model/DAO/cart.mongo.js";
import UserDao from "../model/DAO/user.mongo.js";

const cartDAO = CartDao.getInstance();
const orderDAO = OrderDao.getInstance();
const userDAO = UserDao.getInstance();

class OrderService {
  async purchaseOrderByUser(user) {
    const cart = await cartDAO.getAll({ user: user.id });

    if (cart.length === 0) {
      throw new Error("No existe carrito vinculado al usuario");
    }

    if (cart[0].length === 0) {
      throw new Error("Tu carrito no tiene items para comprar");
    }

    const itemsPurchased = cart[0].items.map((el) => ({
      id: el.id,
      name: el.name,
      price: el.price,
      quantity: el.quantity,
      finalPrice: el.price * el.quantity,
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
