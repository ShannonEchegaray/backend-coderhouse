import { Router } from "express";
import passport from "passport";
import userController from "../../../controller/user.controller.js";
import loginController from "../../../controller/login.controller.js";
import { validateUserProperties } from "../../../middlewares/validate.js";

const router = Router();

router.post(
  "/register",
  passport.authenticate("register", { session: false }),
  (req, res) => {
    res.json({ message: "Has registrado correctamente tu usuario" });
  }
);
router.post("/login", loginController.login);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfileByUser
);
router.get("/:id/profile", userController.getProfileById);
router.post("/", validateUserProperties(), userController.createUser);
router.put("/", userController.updateByUser);
router.put("/:id", userController.updateById);
router.delete("/:id", userController.deleteById);
router.delete("/:id", userController.deleteByUser);

export default router;
