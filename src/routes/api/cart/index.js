import { Router } from "express";
import passport from "passport";
import cartController from "../../../controller/cart.controller.js";
import loginController from "../../../controller/login.controller.js";

const router = Router();

router.get(
  "/adm",
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
  "/adm/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.getCartById
);
router.post(
  "/adm",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.createCart
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.addProductByUser
);
router.put(
  "/adm/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.modifyCartById
);
router.delete(
  "/",
  passport.authenticate("jwt", { session: false }),
  cartController.deleteProductByUser
);
router.delete(
  "/adm/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  cartController.deleteCartProductsById
);

export default router;
