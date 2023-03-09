import { Server } from "socket.io";

export const initServer = (server) => new Server(server);

export const initEvents = (socket) => {
  socket.on("connection", (io) => {
    console.log("Un usuario se ha conectado");
    io.emit("message", "asdasdasd");

    io.on("disconnect", () => {
      console.log("Un usuario se ha desconectado");
    });
  });
};
