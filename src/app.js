// Imports
import express from "express";

// Routes
import router from "./routes/index.js";

const app = express();

app.use("/", router);

app.listen(8080, () => {
  console.log("Servidor corriendo en: http://localhost:8080");
});
