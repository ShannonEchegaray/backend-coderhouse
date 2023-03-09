export class BaseError extends Error {
  constructor(message, status) {
    super();
    this.message = message;
    this.status = status;
  }
}

export class NotAuthorized extends BaseError {
  constructor() {
    super("El usuario no esta autorizado", 401);
  }
}

export class UserNotFound extends BaseError {
  constructor() {
    super("El usuario no ha sido encontrado", 404);
  }
}

export class ProductNotFound extends BaseError {
  constructor() {
    super("El producto no ha sido encontrado", 404);
  }
}

export class CartNotFound extends BaseError {
  constructor() {
    super("El carrito no ha sido encontrado", 404);
  }
}

export class EmptyCart extends BaseError {
  constructor() {
    super("No se puede comprar con el carrito vacio", 500);
  }
}

export class BadRequest extends BaseError {
  constructor(message) {
    super(message, 400);
  }
}
