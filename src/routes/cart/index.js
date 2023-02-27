import { Router } from "express";
import controller from "../../controller/cart.controller.js";

const router = Router();

router.get("/", controller.getAllCarts);
router.get("/", controller.getCartByUser);
router.get("/:id", controller.getCartById);
router.post("/", controller.createCart);
router.post("/", controller.addProductByUser);
router.put("/:id", controller.modifyCartById);
router.delete("/", controller.deleteProductByUser);
router.delete("/:id", controller.deleteCartById);

export default router;
