import { Router } from "express";
import controller from "../../../controller/products.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("Product");
});

router.get("/", controller.getProducts);
router.get("/:id", controller.getProductById);
router.post("/", controller.createProduct);
router.put("/:id", controller.updateProductById);
router.delete("/:id", controller.deleteProductById);

export default router;