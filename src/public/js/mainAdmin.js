(async () => {
  const messages = document.querySelector("#messages");
  const message = document.querySelector("#message");
  const form = document.querySelector("#submit");
  const ulChats = document.querySelector("#chats");
  let chatActive;

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
      messages.innerHTML += `<p>User: ${message.author}| ${message.createdAt} | ${message.body}<p>`;
    });
  };
  // eslint-disable-next-line no-undef
  const socket = io();

  socket.on("connect", () => {
    socket.emit("foundAllChats", token);
  });

  socket.on("foundAllChats", (chats) => {
    console.log(chats);
    ulChats.innerHTML = "";
    chats.forEach((chat) => {
      const li = document.createElement("li");
      li.dataset.id = chat.id;
      li.classList.add("border");
      li.onclick = () => {
        drawMessages(chat);
        chatActive = li.dataset.id;
        message.removeAttribute("disabled");
      };
      li.innerText = chat.author;
      ulChats.appendChild(li);

      if (chatActive) {
        drawMessages(chats.find((el) => el.id === chatActive));
      }
    });
  });

  socket.on("error", (error) => {
    console.log(error);
  });

  socket.on("createChat", (chat) => {
    console.log("Estoy en createChat", chat);
  });

  form.onsubmit = (e) => {
    e.preventDefault();
    if (message.value === "") return;

    socket.emit("newMessageToUser", {
      token,
      user: { message: message.value, id: chatActive },
    });
    message.value = "";
  };

  socket.on("newMessage", () => {
    socket.emit("foundAllChats", token);
  });
})();
