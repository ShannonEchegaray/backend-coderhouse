import { Router } from "express";
import productController from "../../../controller/products.controller.js";
import loginController from "../../../controller/login.controller.js";
import passport from "passport";

const router = Router();

router.get("/test", (req, res, next) => {
  const random = Math.random() > 0.5;
  if (random) return next(new Error("ASDASDASDASD"));
  res.send("Product");
});

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  productController.getProducts
);
router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  productController.getProductById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  productController.createProduct
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  productController.updateProductById
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  productController.deleteProductById
);

export default router;
