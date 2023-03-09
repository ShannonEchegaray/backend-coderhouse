(async () => {
  const socket = io();

  socket.on("connect", () => {
    console.log("Hola mundo");
  });

  socket.on("message", (message) => {
    console.log(message);
  });
})();
