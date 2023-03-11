class MessageDTO {
  #message;

  constructor(message) {
    if (!message) return;
    this.#message = Boolean(message);
    this.body = message.body;
    this.author = message.author;
    this.createdAt = message.createdAt;
  }

  create() {
    if (!this.#message) return;
    return this;
  }
}

export default MessageDTO;
