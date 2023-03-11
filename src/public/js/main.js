(async () => {
  const messages = document.querySelector("#messages");
  const message = document.querySelector("#message");
  const form = document.querySelector("#submit");
  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwYmQ2ZjU5ODgyZmZkZTk0YzZkNWUzIiwiZW1haWwiOiJtZWxvY290b25AbWVsb2FzZGFzZGNvdG9uLmNvbSJ9LCJpYXQiOjE2Nzg0OTc1NDN9.u84NqStoTn5wZO5M4ovQ9jIkzpOJi3JLP3mpJIdJL8M"
  );
  const token = localStorage.getItem("token");

  const drawMessages = (chat) => {
    messages.innerHTML = "";
    chat?.messages.forEach((message) => {
      console.log(message);
      messages.innerHTML += `<p>User: ${message.author}| ${message.createdAt} | ${message.body}<p>`;
    });
  };
  // eslint-disable-next-line no-undef
  const socket = io();

  socket.on("connect", () => {
    socket.emit("foundHistoryChats", token);
  });

  socket.on("message", (message) => {
    console.log(message);
  });

  socket.on("foundHistoryChats", (chat) => {
    drawMessages(chat);
  });

  socket.on("chatNotFound", (error) => {
    console.log(error);
    socket.emit("createChat", token);
  });

  socket.on("createChat", (chat) => {
    console.log("Estoy en createChat", chat);
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    if (message.value === "") return;

    socket.emit("newMessage", { token, message: message.value });
    message.value = "";
  };

  socket.on("newMessage", (chat) => {
    drawMessages(chat);
  });
})();
