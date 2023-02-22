import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hola mundo");
});

app.listen(8080, () => {
  console.log("Servidor corriendo en: http://localhost:8080");
});
