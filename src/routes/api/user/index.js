import { Router } from "express";
import controller from "../../../controller/user.controller.js";

const router = Router();

router.get("/test", (req, res) => {
  res.send("User");
});

router.get("/profile", controller.getProfileByUser);
router.get("/:id/profile", controller.getProfileById);
router.post("/", controller.createUser);
router.put("/", controller.updateByUser);
router.put("/:id", controller.updateById);
router.delete("/:id", controller.deleteById);
router.delete("/:id", controller.deleteByUser);

export default router;