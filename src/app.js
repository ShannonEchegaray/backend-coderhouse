// Imports
import express from "express";

import "./middlewares/passport.js";

// Routes
import router from "./routes/index.js";
import { BaseError } from "./utils/error.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((error, req, res, next) => {
  if (error instanceof BaseError) {
    res
      .status(error.status)
      .json({ error: { status: error.status, message: error.message } });
  } else {
    console.log(error.message);
    res.status(500).json({
      error: {
        status: 500,
        message: "Ha ocurrido un error interno del servidor",
      },
    });
  }
});

app.listen(8080, () => {
  console.log("Servidor corriendo en: http://localhost:8080");
});
