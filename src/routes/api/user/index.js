import { Router } from "express";
import passport from "passport";
import userController from "../../../controller/user.controller.js";
import loginController from "../../../controller/login.controller.js";
import {
  validateUserCreateProperties,
  validateUserProperties,
} from "../../../middlewares/validate.js";

const router = Router();

router.post("/register", validateUserProperties(), (req, res, next) => {
  passport.authenticate(
    "register",
    {
      session: false,
    },
    (err, user, info) => {
      if (err) return next(err);

      if (!user) return next(info);

      res.json({ message: "Has registrado correctamente tu usuario" });
    }
  )(req, res, next);
});

router.post("/login", loginController.login);

router.get(
  "/profile",
  passport.authenticate("jwt", { session: false }),
  userController.getProfileByUser
);
router.get(
  "/:id/profile",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  userController.getProfileById
);
router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  validateUserCreateProperties(),
  loginController.isAdmin,
  userController.createUser
);
router.put(
  "/",
  passport.authenticate("jwt", { session: false }),
  userController.updateByUser
);
router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  userController.updateById
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  loginController.isAdmin,
  userController.deleteById
);
router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  userController.deleteByUser
);

export default router;
