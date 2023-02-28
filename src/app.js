// Imports
import express from "express";

// Routes
import router from "./routes/index.js";

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", router);

app.use((error, req, res, next) => {
  res.send(error.message);
});

app.listen(8080, () => {
  console.log("Servidor corriendo en: http://localhost:8080");
});
