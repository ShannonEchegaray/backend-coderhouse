export const validateProperties = (object) => {
  for (const property in object) {
    if (!object?.[property]?.type)
      throw new Error("No se especifico el tipo de la propiedad");
  }

  return (req, _, next) => {
    try {
      for (const property in object) {
        if (!req.body.hasOwnProperty(property)) {
          if (!object[property].required) continue;
          throw new Error(`La siguiente propiedad: ${property} no existe.`);
        }
        if (typeof req.body[property] !== object[property].type)
          throw new Error(
            `La siguiente propiedad: ${property} no cumple el tipo especificado: ${object[property].type}`
          );
      }
      next();
    } catch (error) {
      return next(error);
    }
  };
};

export const validateUserProperties = () => {
  return validateProperties({
    name: { type: "string", required: true },
    lastname: { type: "string", required: true },
    password: { type: "string", required: true },
    email: { type: "string", required: true },
    nickname: { type: "string", required: true },
    phone_number: { type: "string" },
    profile_image: { type: "string" },
    address: { type: "string", required: true },
  });
};
