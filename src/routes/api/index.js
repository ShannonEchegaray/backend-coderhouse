import { Router } from "express";
import cartRouter from "./cart/index.js";
import productsRouter from "./products/index.js";
import userRouter from "./user/index.js";
import orderRouter from "./order/index.js";

const router = Router();

router.use("/products", productsRouter);
router.use("/cart", cartRouter);
router.use("/user", userRouter);
router.use("/order", orderRouter);

export default router;
