import { Router } from "express";
import controller from "../../../controller/cart.controller.js";

const router = Router();

router.get("/adm", controller.getAllCarts);
router.get("/", controller.getCartByUser);
router.get("/adm/:id", controller.getCartById);
router.post("/adm", controller.createCart);
router.post("/", controller.addProductByUser);
router.put("/adm/:id", controller.modifyCartById);
router.delete("/", controller.deleteProductByUser);
router.delete("/adm/:id", controller.deleteCartProductsById);

export default router;
