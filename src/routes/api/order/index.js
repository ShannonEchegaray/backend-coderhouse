import { Router } from "express";
import passport from "passport";
import loginController from "../../../controller/login.controller.js";
import orderController from "../../../controller/order.controller.js";

const router = Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  orderController.purchaseOrderByUser
);
router.post(
  "/:id/delivery",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  orderController.purchaseOrderByUser
);

export default router;
