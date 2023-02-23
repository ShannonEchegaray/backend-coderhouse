import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.send("Cart");
});

router.get("/" /* , controller.getCartByUser */);
router.post("/" /* , controller.createCart */);
router.post("/" /* , controller.addProductByUser */);
router.put("/:id" /* , controller.modifyCartById */);
router.delete("/" /* , controller.deleteProductByUser */);
router.delete("/:id" /* , controller.deleteCartById */);

export default router;
