import { Router } from "express";
import passport from "passport";
import cartController from "../../../controller/cart.controller.js";
import loginController from "../../../controller/login.controller.js";

const router = Router();

router.get(
  "/all",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.getAllCarts
);
router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.getCartByUser
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.getCartById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.addProductByUser
);
router.put(
  "/:id/product",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.modifyCartProductsById
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.deleteAllProductByUser
);
router.delete(
  "/:id/product",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.deleteAllCartProductsById
);

export default router;
