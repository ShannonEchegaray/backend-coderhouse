import service from "../service/order.service.js";

class OrderController {
  async purchaseOrderByUser(req, res, next) {
    try {
      const order = await service.purchaseOrderByUser(req.user);

      res.status(201).json(order);
    } catch (error) {
      next(error);
    }
  }

  async deliveryOrder(req, res, next) {}
}

export default new OrderController();
