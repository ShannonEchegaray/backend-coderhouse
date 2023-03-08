import orderService from "../service/order.service.js";
import mailService from "../service/mail.service.js";

class OrderController {
  async purchaseOrderByUser(req, res, next) {
    try {
      const order = await orderService.purchaseOrderByUser(req.user);
      console.log(req.user);
      mailService.purchaseItem(req.user, order);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async deliveryOrder(req, res, next) {}
}

export default new OrderController();
