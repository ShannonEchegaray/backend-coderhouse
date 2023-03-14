(async () => {
  const messages = document.querySelector("#messages");
  const message = document.querySelector("#message");
  const form = document.querySelector("#submit");

  const token = localStorage.getItem("token");

  if (!token) {
    document.body.innerHTML = "";
    const input = document.createElement("input");
    const button = document.createElement("button");

    input.type = "text";
    button.innerHTML = "Enviar";

    button.onclick = async () => {
      if (input.value === "") return;

      try {
        const response = await fetch("/verify", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: input.value }),
        });

        if (response.status === 200) {
          localStorage.setItem("token", input.value);
          window.location.reload();
        }
      } catch (error) {
        console.error(error);
      }
    };
    document.body.appendChild(input);
    document.body.appendChild(button);
    return console.warn("POR FAVOR SETEAR TOKEN Y REINICIAR LA PAGINA");
  }

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
