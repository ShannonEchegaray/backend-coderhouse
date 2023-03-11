(async () => {
  const messages = document.querySelector("#messages");
  const message = document.querySelector("#message");
  const form = document.querySelector("#submit");
  const ulChats = document.querySelector("#chats");
  let chatActive;

  localStorage.setItem(
    "token",
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjQwODg5OWI1MDRkYzQzNTU0MGE5YWVmIiwiZW1haWwiOiJ0ZXN0QHRlc3QuY29tIn0sImlhdCI6MTY3ODQ5MjE4Mn0.LfuZcvZsKvlN4ZfDd8rvgTpTkLVTwHDXUiAhIhEYzds"
  );
  const token = localStorage.getItem("token");

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
