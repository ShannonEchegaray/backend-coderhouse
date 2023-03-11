import MessageDTO from "./messageDTO.js";

class ChatDTO {
  #chat;

  constructor(chat) {
    if (!chat) return;
    this.#chat = Boolean(chat);
    this.id = chat.id || chat._id;
    this.author = chat.author;
    this.messages = chat.messages.map((message) =>
      new MessageDTO(message).create()
    );
  }

  create() {
    if (!this.#chat) return;
    return this;
  }
}

export default ChatDTO;
