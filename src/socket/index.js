import { Server } from "socket.io";
import socketController from "../controller/socket.controller.js";

export const initServer = (server) => new Server(server);

export const initEvents = (socket) => {
  socket.on("connection", async (io) => {
    console.log("Un usuario se ha conectado");
    io.on("foundHistoryChats", async (token) => {
      try {
        io.emit(
          "foundHistoryChats",
          await socketController.findChatByUser(token)
        );
      } catch (error) {
        io.emit("chatNotFound", error);
      }
    });

    io.on("foundAllChats", async (token) => {
      try {
        const chats = await socketController.getAllChats(token);

        console.log(chats);

        io.emit("foundAllChats", chats);
      } catch (error) {
        console.log(error);
        io.emit("error", "No se encontraron chats");
      }
    });

    io.on("createChat", async (token) => {
      try {
        const chat = await socketController.createChatByUser(token);
        io.emit("createChat", JSON.stringify(chat));
      } catch (error) {
        io.emit("error", error);
      }
    });

    io.on("newMessage", async ({ message, token }) => {
      try {
        io.emit(
          "newMessage",
          await socketController.newMessage(token, message)
        );
      } catch (error) {
        io.emit("error", error);
      }
    });

    io.on("newMessageToUser", async ({ user: { message, id }, token }) => {
      try {
        io.emit(
          "newMessage",
          await socketController.newMessageToUser(token, message, id)
        );
      } catch (error) {
        console.log(error);
        io.emit("error", error);
      }
    });

    io.on("disconnect", () => {
      console.log("Un usuario se ha desconectado");
    });
  });
};
