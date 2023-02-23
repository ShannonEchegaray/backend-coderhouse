import { Router } from "express";
import cartRouter from "./cart/index.js";
import productsRouter from "./products/index.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/cart", cartRouter);

export default router;
