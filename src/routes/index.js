import { Router } from "express";
import apiRouter from "./api/index.js";
import { verify } from "jsonwebtoken";
import { secretToken } from "../config/config.js";
import { NotAuthorized } from "../utils/error.js";

const router = Router();

router.post("/verify", (req, res, next) => {
  const { token } = req.body;
  if (!verify(token, secretToken)) return next(new NotAuthorized());

  res.json({ status: 200, message: "Se ha verificado con exito" });
});
router.use("/api", apiRouter);

export default router;
